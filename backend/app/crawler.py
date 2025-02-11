from typing import List, Optional
import logging
from datetime import datetime
from pydantic import BaseModel
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.content_filter_strategy import PruningContentFilter
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator

# Configure logging
logger = logging.getLogger(__name__)

class InternalLink(BaseModel):
    href: str
    text: str

class DiscoveredPage(BaseModel):
    url: str
    title: Optional[str] = None
    status: str = "pending"
    internalLinks: Optional[List[InternalLink]] = None

class CrawlStats(BaseModel):
    subdomains_parsed: int = 0
    pages_crawled: int = 0
    data_extracted: str = "0 KB"
    errors_encountered: int = 0

class CrawlResult(BaseModel):
    markdown: str
    stats: CrawlStats

def get_browser_config() -> BrowserConfig:
    """Get browser configuration that launches a local instance"""
    return BrowserConfig(
        browser_type="chromium",
        headless=True,
        viewport_width=1920,
        viewport_height=1080,
        verbose=True,
        text_mode=True,
        light_mode=True,
        extra_args=[
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]
    )

def get_crawler_config(session_id: str = None) -> CrawlerRunConfig:
    """Get crawler configuration for content extraction"""
    markdown_generator = DefaultMarkdownGenerator(
        content_filter=PruningContentFilter(
            threshold=0.2,  # Lower threshold to keep more content
            threshold_type="dynamic",
            min_word_threshold=5  # Lower word threshold
        ),
        options={
            "body_width": 80,
            "ignore_images": True,
            "escape_html": True
        }
    )
    
    return CrawlerRunConfig(
        # Content extraction settings
        word_count_threshold=5,  # Lower threshold to match content filter
        markdown_generator=markdown_generator,
        
        # Cache and performance
        cache_mode=CacheMode.ENABLED,
        verbose=True,
        
        # Page loading and lazy content
        wait_until='domcontentloaded',  # Less strict than 'networkidle'
        wait_for_images=True,  # Wait for images to fully load
        scan_full_page=True,  # Scroll entire page to trigger lazy loading
        scroll_delay=0.5,  # Delay between scroll steps
        page_timeout=120000,  # 2 minutes timeout
        
        # Media and output settings
        screenshot=False,
        pdf=False,
        
        # Bot detection avoidance
        magic=True  # Enable magic mode for better bot detection avoidance
    )

async def discover_pages(url: str, max_depth: int = 3, current_depth: int = 1, seen_urls: set = None) -> List[DiscoveredPage]:
    """
    Discover all related pages under a given URL using Crawl4AI's link analysis.
    
    Args:
        url: The starting URL to crawl
        max_depth: Maximum depth of crawling (default: 3)
        current_depth: Current depth in the crawl (default: 1)
        seen_urls: Set of already seen URLs (default: None)
    """
    if seen_urls is None:
        seen_urls = set()
    
    discovered_pages = []
    logger.info(f"Starting discovery for URL: {url} at depth {current_depth}/{max_depth}")
    
    if current_depth > max_depth:
        return discovered_pages
    
    try:
        browser_config = get_browser_config()
        crawler_config = get_crawler_config()
        seen_urls.add(url)
        
        async with AsyncWebCrawler(config=browser_config) as crawler:
            try:
                result = await crawler.arun(url=url, config=crawler_config)
                
                # Extract title and add current page
                title = "Untitled Page"
                if result.markdown_v2 and result.markdown_v2.fit_markdown:
                    content_lines = result.markdown_v2.fit_markdown.split('\n')
                    if content_lines:
                        potential_title = content_lines[0].strip('# ').strip()
                        if potential_title:
                            title = potential_title

                # Process internal links
                internal_links = []
                if hasattr(result, 'links') and isinstance(result.links, dict):
                    internal_links = [
                        InternalLink(href=link.get("href", ""), text=link.get("text", "").strip())
                        for link in result.links.get("internal", [])
                        if link.get("href") and not any(excluded in link.get("href", "").lower() for excluded in [
                            "login", "signup", "register", "logout",
                            "account", "profile", "admin"
                        ])
                    ]
                    logger.info(f"Found {len(internal_links)} internal links at depth {current_depth}")

                primary_page = DiscoveredPage(
                    url=url,
                    title=title,
                    status="crawled" if result.success else "pending",
                    internalLinks=internal_links
                )
                discovered_pages.append(primary_page)

                # Recursively discover pages from internal links
                if current_depth < max_depth:
                    for link in internal_links:
                        try:
                            href = link.href
                            if href in seen_urls:
                                continue
                            
                            # Ensure the URL is absolute
                            if not href.startswith(('http://', 'https://')):
                                from urllib.parse import urljoin
                                href = urljoin(url, href)
                            
                            # Ensure the URL is from the same domain
                            from urllib.parse import urlparse
                            base_domain = urlparse(url).netloc
                            link_domain = urlparse(href).netloc
                            if base_domain != link_domain:
                                continue

                            # Recursively discover pages from this URL
                            sub_pages = await discover_pages(
                                url=href,
                                max_depth=max_depth,
                                current_depth=current_depth + 1,
                                seen_urls=seen_urls
                            )
                            discovered_pages.extend(sub_pages)

                        except Exception as e:
                            logger.error(f"Error processing link {link}: {str(e)}")
                            continue

            except Exception as e:
                logger.error(f"Error crawling {url}: {str(e)}")
                # Don't fail the whole crawl for one page
                discovered_pages.append(
                    DiscoveredPage(
                        url=url,
                        title="Error Page",
                        status="error"
                    )
                )

            return discovered_pages

    except Exception as e:
        logger.error(f"Error discovering pages: {str(e)}")
        return [DiscoveredPage(url=url, title="Main Page", status="error")]

async def crawl_pages(pages: List[DiscoveredPage]) -> CrawlResult:
    """
    Crawl multiple pages and combine their content into a single markdown document.
    """
    all_markdown = []
    total_size = 0
    errors = 0
    
    try:
        browser_config = get_browser_config()
        crawler_config = get_crawler_config()
        logger.info("Initializing crawler with browser config: %s", browser_config)
        logger.info("Using crawler config: %s", crawler_config)
        
        async with AsyncWebCrawler(config=browser_config) as crawler:
            for page in pages:
                try:
                    logger.info(f"Crawling page: {page.url}")
                    result = await crawler.arun(url=page.url, config=crawler_config)
                    
                    if result and hasattr(result, 'markdown_v2') and result.markdown_v2:
                        page_markdown = f"# {page.title or 'Untitled Page'}\n"
                        page_markdown += f"URL: {page.url}\n\n"
                        
                        # Try fit_markdown first, fall back to raw_markdown
                        content = None
                        if hasattr(result.markdown_v2, 'fit_markdown') and result.markdown_v2.fit_markdown:
                            content = result.markdown_v2.fit_markdown
                            logger.info(f"Using fit_markdown for {page.url}")
                        elif hasattr(result.markdown_v2, 'raw_markdown') and result.markdown_v2.raw_markdown:
                            content = result.markdown_v2.raw_markdown
                            logger.info(f"Falling back to raw_markdown for {page.url}")
                        
                        if content:
                            # Filter out navigation instructions
                            filtered_lines = []
                            skip_next = False
                            for line in content.split('\n'):
                                if skip_next:
                                    skip_next = False
                                    continue
                                    
                                # Skip navigation instructions and their following lines
                                if 'To navigate the symbols, press' in line:
                                    skip_next = True
                                    continue
                                    
                                # Skip other navigation elements
                                if any(x in line for x in [
                                    'Skip Navigation',
                                    'Search...',
                                    '⌘K',
                                    'symbols inside <root>'
                                ]):
                                    continue
                                    
                                filtered_lines.append(line)
                            
                            filtered_content = '\n'.join(filtered_lines).strip()
                            if filtered_content:
                                page_markdown += filtered_content
                                page_markdown += "\n\n---\n\n"
                                all_markdown.append(page_markdown)
                                total_size += len(page_markdown.encode('utf-8'))
                                logger.info(f"Successfully extracted content from {page.url}")
                            else:
                                logger.warning(f"Skipping {page.url} - filtered content was empty")
                                errors += 1
                        else:
                            logger.warning(f"Skipping {page.url} - no markdown content available")
                            errors += 1
                    else:
                        logger.warning(f"Skipping {page.url} - no valid result")
                        errors += 1
                        
                except Exception as e:
                    logger.error(f"Error crawling page {page.url}: {str(e)}")
                    errors += 1

            combined_markdown = "".join(all_markdown)
            
            # Calculate human-readable size
            size_str = f"{total_size} B"
            if total_size > 1024:
                size_str = f"{total_size/1024:.2f} KB"
            if total_size > 1024*1024:
                size_str = f"{total_size/(1024*1024):.2f} MB"
            
            stats = CrawlStats(
                subdomains_parsed=len(pages),
                pages_crawled=len(pages) - errors,
                data_extracted=size_str,
                errors_encountered=errors
            )
            
            logger.info(f"Completed crawling with stats: {stats}")
            return CrawlResult(
                markdown=combined_markdown,
                stats=stats
            )
            
    except Exception as e:
        logger.error(f"Error in crawl_pages: {str(e)}")
        return CrawlResult(
            markdown="",
            stats=CrawlStats(
                subdomains_parsed=len(pages),
                pages_crawled=0,
                data_extracted="0 KB",
                errors_encountered=1
            )
        )