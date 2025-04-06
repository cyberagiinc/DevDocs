from typing import List, Optional, Set, Dict
import logging
import sys
import asyncio
import os
import requests
import json
from datetime import datetime
from pydantic import BaseModel
from urllib.parse import urljoin, urlparse, urlsplit
import re
# Import status management functions
from .status_manager import update_overall_status, update_url_status # Removed set_task_context import
from .utils import normalize_url # Import from utils


# Configure logging
logger = logging.getLogger(__name__)

# Increase recursion limit for complex pages
sys.setrecursionlimit(10000)

# Get Crawl4AI API URL and token from environment variables
# Note: In Docker, we should use the container name, not localhost
CRAWL4AI_URL = os.environ.get("CRAWL4AI_URL", "http://crawl4ai:11235")
logger.info(f"Using Crawl4AI URL: {CRAWL4AI_URL}")

# Hard-code a default API key for testing
# This is a temporary solution for development/testing only
DEFAULT_API_KEY = "devdocs-demo-key"
CRAWL4AI_API_TOKEN = os.environ.get("CRAWL4AI_API_TOKEN", DEFAULT_API_KEY)

# Set up headers for API requests
headers = {"Authorization": f"Bearer {CRAWL4AI_API_TOKEN}"}
logger.info(f"API token is {'set' if CRAWL4AI_API_TOKEN else 'not set'}")

class InternalLink(BaseModel):
    href: str
    text: str
    status: str = 'pending'  # Default status for internal links

class DiscoveredPage(BaseModel):
    url: str
    title: Optional[str] = None
    status: str = "pending"  # Default status for parent pages
    internalLinks: Optional[List[InternalLink]] = None

class CrawlStats(BaseModel):
    subdomains_parsed: int = 0
    pages_crawled: int = 0
    data_extracted: str = "0 KB"
    errors_encountered: int = 0

class CrawlResult(BaseModel):
    markdown: str
    stats: CrawlStats

# normalize_url function moved to utils.py

def url_to_filename(url: str) -> str:
    """
    Convert a URL to a valid filename.
    
    This function extracts the domain and path from a URL and converts it to a valid
    filename by replacing invalid characters with underscores.
    
    Args:
        url: The URL to convert
        
    Returns:
        A valid filename based on the URL
    """
    # Parse the URL
    parsed = urlsplit(url)
    
    # Extract domain and path
    domain = parsed.netloc
    path = parsed.path
    
    # Remove www. prefix if present
    if domain.startswith('www.'):
        domain = domain[4:]
    
    # Replace dots and slashes with underscores
    domain = domain.replace('.', '_')
    
    # Clean up the path
    if path == '/' or not path:
        # If path is empty or just '/', use only the domain
        filename = domain
    else:
        # Remove leading and trailing slashes
        path = path.strip('/')
        # Replace slashes and other invalid characters with underscores
        path = re.sub(r'[\\/:*?"<>|]', '_', path)
        # Combine domain and path
        filename = f"{domain}_{path}"
    
    # Ensure the filename is not too long (max 255 characters)
    if len(filename) > 255:
        # If too long, truncate and add a hash of the original URL
        from hashlib import md5
        url_hash = md5(url.encode()).hexdigest()[:8]
        filename = filename[:240] + '_' + url_hash
    
    # Convert to lowercase for consistency
    filename = filename.lower()
    
    logger.info(f"Converted URL '{url}' to filename '{filename}'")
    return filename

# In-memory storage removed

# MemoryFileObject class removed

# is_individual_file function removed

# is_consolidated_file function removed

# redirect_file_writes function removed

# _task_context removed

# set_task_context function removed

# Monkey patch for open function removed

# Ensure storage/markdown directory exists
os.makedirs("storage/markdown", exist_ok=True)

# File redirection logging removed

async def discover_pages(
    url: str,
    max_depth: int = 3,
    current_depth: int = 1,
    seen_urls: Set[str] = None,
    parent_urls: Set[str] = None,
    all_internal_links: Set[str] = None,
    root_url: str = None,
    root_task_id: str = None, # Keep for file naming consistency if needed, though job_id is primary now
    job_id: Optional[str] = None # Add job_id parameter
) -> List[DiscoveredPage]:
    """Recursively discovers internal links starting from a given URL."""
    if seen_urls is None:
        seen_urls = set()
    if parent_urls is None:
        parent_urls = set()
    if all_internal_links is None:
        all_internal_links = set()
    
    # If this is the root URL (first call), set root_url, generate root_task_id, and update status
    if root_url is None:
        root_url = url
        # Use a human-readable filename based on the URL
        root_task_id = url_to_filename(root_url)
        logger.info(f"Starting discovery for root URL: {root_url} with filename: {root_task_id} (Job ID: {job_id})")
        if job_id:
            update_overall_status(job_id, 'discovering')
    
    # No longer replacing docs.crawl4ai.com URLs
    logger.info(f"Processing URL: {url} without replacement")
    
    url = normalize_url(url)
    discovered_pages = []
    logger.info(f"Starting discovery for URL: {url} at depth {current_depth}/{max_depth}")
    
    if url in seen_urls or current_depth > max_depth:
        logger.info(f"Skipping URL: {url} (seen: {url in seen_urls}, depth: {current_depth})")
        return discovered_pages
        
    seen_urls.add(url)
    parent_urls.add(url)
    
    try:
        # Update status for the current URL being discovered
        if job_id:
            update_url_status(job_id, url, 'discovering')

        # --- Start: Re-added crawl4ai call for link discovery ONLY ---
        logger.info(f"Requesting link discovery for {url} from Crawl4AI (Job ID: {job_id})")
        simple_request = {"urls": url}
        task_id = None
        result = None

        try:
            # Submit job to Crawl4AI
            response = requests.post(
                f"{CRAWL4AI_URL}/crawl",
                headers=headers,
                json=simple_request,
                timeout=30
            )
            response.raise_for_status()
            task_id = response.json()["task_id"]
            logger.info(f"Submitted link discovery task for {url}, task ID: {task_id} (Job ID: {job_id})")

            # Poll for result
            max_attempts = 120
            poll_interval = 1
            for attempt in range(max_attempts):
                await asyncio.sleep(poll_interval) # Use await for asyncio.sleep
                logger.debug(f"Polling link discovery task {task_id} (attempt {attempt+1}/{max_attempts})")
                status_response = requests.get(
                    f"{CRAWL4AI_URL}/task/{task_id}",
                    headers=headers,
                    timeout=10
                )
                status_response.raise_for_status()
                status = status_response.json()

                if status["status"] == "completed":
                    result = status["result"]
                    logger.info(f"Link discovery task {task_id} for {url} completed successfully (Job ID: {job_id})")
                    # Mark URL as pending crawl, ready for the next phase
                    if job_id:
                        update_url_status(job_id, url, 'pending_crawl')
                    break # Exit polling loop on completion
                elif status["status"] == "failed":
                    error_msg = status.get('error', 'Unknown error')
                    logger.error(f"Link discovery task {task_id} for {url} failed: {error_msg} (Job ID: {job_id})")
                    if job_id:
                        update_url_status(job_id, url, 'discovery_error')
                    result = None # Ensure result is None on failure
                    break # Exit polling loop on failure
                # Continue polling if status is 'running' or other non-terminal state

            if result is None and status["status"] != "failed": # Check if loop finished without success or explicit failure
                 logger.warning(f"Timeout waiting for link discovery result for {url} (Task ID: {task_id}, Job ID: {job_id})")
                 if job_id:
                     update_url_status(job_id, url, 'discovery_error') # Mark as error on timeout

        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed during link discovery for {url}: {str(e)}", exc_info=True)
            if job_id:
                update_url_status(job_id, url, 'discovery_error')
            result = None # Ensure result is None on request error
        except Exception as e:
            logger.error(f"Unexpected error during link discovery for {url}: {str(e)}", exc_info=True)
            if job_id:
                update_url_status(job_id, url, 'discovery_error')
            result = None # Ensure result is None on other errors
        # --- End: Re-added crawl4ai call for link discovery ONLY ---

        # If discovery failed (result is None), return minimal error page for this branch
        if result is None:
             logger.warning(f"Skipping further processing for {url} due to discovery failure/timeout (Job ID: {job_id})")
             # Return minimal info indicating error for this branch
             return [DiscoveredPage(url=url, title="Error During Discovery", status="error")]
            
        # Extract title and links from result
        title = "Untitled Page"
        if "title" in result:
            title = result["title"]
        elif "markdown" in result and result["markdown"]:
            content_lines = result["markdown"].split('\n')
            if content_lines:
                potential_title = content_lines[0].strip('# ').strip()
                if potential_title:
                    title = potential_title
        
        internal_links = []
        if "links" in result and isinstance(result["links"], dict):
            seen_internal_links = set()
            
            for link in result["links"].get("internal", []):
                href = link.get("href", "")
                if not href:
                    continue
                    
                if not href.startswith(('http://', 'https://')):
                    href = urljoin(url, href)
                href = normalize_url(href)
                    
                if (href in parent_urls or 
                    href in all_internal_links or 
                    href in seen_internal_links):
                    continue
                    
                if any(excluded in href.lower() for excluded in [
                    "login", "signup", "register", "logout",
                    "account", "profile", "admin"
                ]):
                    continue
                    
                base_domain = urlparse(url).netloc
                link_domain = urlparse(href).netloc
                if base_domain != link_domain:
                    continue
                    
                seen_internal_links.add(href)
                all_internal_links.add(href)
                
                internal_links.append(InternalLink(
                    href=href,
                    text=link.get("text", "").strip()
                ))
            
            logger.info(f"Found {len(internal_links)} unique internal links at depth {current_depth}")
        
        primary_page = DiscoveredPage(
            url=url,
            title=title,
            internalLinks=internal_links
        )
        discovered_pages.append(primary_page)
        
        if current_depth < max_depth:
            for link in internal_links:
                sub_pages = await discover_pages(
                    url=link.href,
                    max_depth=max_depth,
                    current_depth=current_depth + 1,
                    seen_urls=seen_urls,
                    parent_urls=parent_urls,
                    all_internal_links=all_internal_links,
                    root_url=root_url,
                    root_task_id=root_task_id,
                    job_id=job_id # Pass job_id in recursive call
                )
                discovered_pages.extend(sub_pages)
        
        # If this was the initial call (depth 1), mark discovery as complete
        # This signifies that all reachable URLs within the depth limit have been found
        # and marked as 'pending_crawl'.
        if current_depth == 1 and job_id:
            logger.info(f"Initial discovery call complete for job {job_id}. Marking overall status as discovery_complete.")
            update_overall_status(job_id, 'discovery_complete')
        return discovered_pages
        
    except Exception as e:
        error_message = f"Error discovering pages starting from {url}: {str(e)}"
        logger.error(error_message, exc_info=True)
        if job_id:
            # Mark current URL as error
            update_url_status(job_id, url, 'discovery_error')
            # Mark overall job as error only if it's the root call failing
            if current_depth == 1:
                 update_overall_status(job_id, 'error', error_message)
        # Return minimal info indicating error for this branch
        return [DiscoveredPage(url=url, title="Error During Discovery", status="error")]

async def crawl_pages(pages: List[DiscoveredPage], root_url: str = None, job_id: Optional[str] = None) -> CrawlResult:
    """
    Crawl multiple pages, combine content, save to disk, and update job status.

    Args:
        pages: List of pages to crawl (should have status 'pending_crawl').
        root_url: The root URL that initiated the crawl. Used for file naming.
        job_id: The ID of the overall job for status updates.
    """
    all_markdown = []
    total_size = 0
    errors = 0
    crawled_urls = set()
    
    # Generate a consistent file ID based on the root URL
    if root_url:
        root_task_id = url_to_filename(root_url)
        logger.info(f"Using filename: {root_task_id} for root URL: {root_url}")
    else:
        # If no root_url is provided, use the first page's URL
        if pages and len(pages) > 0:
            root_url = pages[0].url
            root_task_id = url_to_filename(root_url)
            logger.info(f"Generated filename: {root_task_id} from first page URL: {root_url}")
        else:
            # Fallback if no pages are provided
            root_task_id = None
            logger.warning("No root URL or pages provided, will use individual task IDs")
    
    try:
        for page in pages:
            if page.url in crawled_urls:
                continue
                
            try:
                logger.info(f"Crawling page: {page.url} (Job ID: {job_id})")
                if job_id:
                    update_url_status(job_id, page.url, 'crawling')
                
                # No longer replacing docs.crawl4ai.com URLs
                url = page.url
                logger.info(f"Processing URL: {url} without replacement")
                
                # Simplify the request for testing
                # The error in the logs shows that there's an issue with the 'magic' parameter
                # Let's remove any extra parameters and keep it simple
                simple_request = {
                    "urls": url
                }
                
                # Submit crawl job to Crawl4AI
                logger.info(f"Submitting content crawl task for {url} to Crawl4AI API (Job ID: {job_id})")
                
                # Log the full request for debugging
                logger.info(f"Request URL: {CRAWL4AI_URL}/crawl")
                logger.info(f"Headers: {headers}")
                logger.info(f"Request data: {json.dumps(simple_request)}")
                
                # Log environment variables for debugging
                logger.info(f"CRAWL4AI_URL environment variable: {os.environ.get('CRAWL4AI_URL', 'Not set')}")
                logger.info(f"CRAWL4AI_API_TOKEN environment variable: {'Set' if os.environ.get('CRAWL4AI_API_TOKEN') else 'Not set'}")
                response = requests.post(
                    f"{CRAWL4AI_URL}/crawl", 
                    headers=headers, 
                    json=simple_request,
                    timeout=30
                )
                response.raise_for_status()
                task_id = response.json()["task_id"]
                logger.info(f"Submitted content crawl task for {url}, task ID: {task_id} (Job ID: {job_id})")
                
                # Poll for result with increased frequency and longer total timeout
                result = None
                max_attempts = 120  # Increased from 60 to 120 for complex URLs
                poll_interval = 1  # Keep at 1 second
                for attempt in range(max_attempts):
                    logger.info(f"Polling for task {task_id} result (attempt {attempt+1}/{max_attempts})")
                    try:
                        status_response = requests.get(
                            f"{CRAWL4AI_URL}/task/{task_id}",
                            headers=headers,
                            timeout=10
                        )
                        status_response.raise_for_status()
                        status = status_response.json()
                        
                        logger.info(f"Task {task_id} status: {status['status']}")
                        
                        if status["status"] == "completed":
                            result = status["result"]
                            logger.info(f"Content crawl task {task_id} for {url} completed successfully (Job ID: {job_id})")
                            # Status updated later based on content extraction
                            
                            # Save the result to files
                            try:
                                # Only create the storage directory for consolidated files
                                # Disable creation of crawl_results directory to prevent individual files
                                # os.makedirs("crawl_results", exist_ok=True)
                                os.makedirs("storage/markdown", exist_ok=True)
                                
                                # Skip any code that might try to write to crawl_results
                                if "crawl_results" in str(task_id):
                                    logger.warning(f"Attempted to create file in crawl_results directory - skipping")
                                    return
                                
                                # Use the root_task_id for file naming to consolidate all related content
                                file_id = root_task_id if root_task_id else task_id
                                
                                # We no longer save individual files, only consolidated ones
                                logger.info(f"Skipping individual file creation for task {task_id} - using consolidated approach only")
                                
                                # set_task_context call removed as it's obsolete
                                
                                # Extract the markdown content if available
                                if "markdown" in result and result["markdown"]:
                                    # Log that we're using the consolidated approach
                                    logger.info(f"Using consolidated approach for task {task_id}")
                                    
                                    # For the consolidated file, we'll append to the root file
                                    storage_file = f"storage/markdown/{file_id}.md"

                                    # Determine if it's a new file before opening
                                    is_new_file = not os.path.exists(storage_file)

                                    # Construct the header only if it's a new file
                                    header = ""
                                    if is_new_file:
                                        header = f"# Consolidated Documentation for {root_url}\n\n"
                                        header += f"This file contains content from multiple pages related to {root_url}.\n"
                                        header += f"Each section represents a different page that was crawled.\n\n"
                                        header += "---\n"

                                    # Construct the section for the current page
                                    page_section = f"\n\n## {result.get('title', 'Untitled Page')}\n"
                                    page_section += f"URL: {url}\n\n"
                                    page_section += result["markdown"]
                                    page_section += "\n\n---\n\n"

                                    # Append to the file (mode 'a' creates if not exists)
                                    try:
                                        with open(storage_file, 'a', encoding='utf-8') as f: # Added encoding
                                            if is_new_file:
                                                f.write(header) # Write header only once for new files
                                            f.write(page_section) # Always append the current page section
                                        logger.info(f"{'Appended to' if not is_new_file else 'Created'} consolidated markdown file: {storage_file}")
                                    except IOError as io_err:
                                        logger.error(f"IOError writing to markdown file {storage_file}: {io_err}", exc_info=True)
                                        # Consider how to handle this - maybe mark URL as error?
                                    except Exception as e:
                                        logger.error(f"Unexpected error writing to markdown file {storage_file}: {e}", exc_info=True)
                                        # Consider how to handle this
                                    
                                    # Update the metadata file with this page's info
                                    metadata_file = f"storage/markdown/{file_id}.json"
                                    # Read existing metadata if it exists, with error handling
                                    metadata = {}
                                    if os.path.exists(metadata_file):
                                        try:
                                            with open(metadata_file, 'r', encoding='utf-8') as f: # Added encoding
                                                metadata = json.load(f)
                                        except json.JSONDecodeError:
                                            logger.error(f"JSONDecodeError reading metadata file {metadata_file}. Will overwrite.", exc_info=True)
                                            metadata = {} # Reset metadata if file is corrupt
                                        except IOError as io_err:
                                            logger.error(f"IOError reading metadata file {metadata_file}: {io_err}. Proceeding with empty metadata.", exc_info=True)
                                            metadata = {} # Reset metadata if file is unreadable
                                        except Exception as e:
                                             logger.error(f"Unexpected error reading metadata file {metadata_file}: {e}. Proceeding with empty metadata.", exc_info=True)
                                             metadata = {} # Reset metadata on other errors
                                    
                                    # Initialize or update the pages list
                                    if "pages" not in metadata:
                                        metadata = {
                                            "title": f"Documentation for {root_url}",
                                            "root_url": root_url,
                                            "timestamp": datetime.now().isoformat(),
                                            "pages": [],
                                            "is_consolidated": True
                                        }
                                    
                                    # Add this page to the pages list
                                    metadata["pages"].append({
                                        "title": result.get("title", "Untitled"),
                                        "url": url,
                                        "timestamp": datetime.now().isoformat(),
                                        "internal_links": len(result.get("links", {}).get("internal", [])),
                                        "external_links": len(result.get("links", {}).get("external", []))
                                    })
                                    
                                    # Update the last_updated timestamp
                                    metadata["last_updated"] = datetime.now().isoformat()
                                    # Write the updated metadata, with error handling
                                    try:
                                        with open(metadata_file, 'w', encoding='utf-8') as f: # Added encoding
                                            json.dump(metadata, f, indent=2)
                                        logger.info(f"Updated metadata in {metadata_file}")
                                    except IOError as io_err:
                                        logger.error(f"IOError writing metadata file {metadata_file}: {io_err}", exc_info=True)
                                    except Exception as e:
                                        logger.error(f"Unexpected error writing metadata file {metadata_file}: {e}", exc_info=True)
                                    logger.info(f"Updated metadata in {metadata_file}")
                            except Exception as e:
                                logger.error(f"Error saving result to files: {str(e)}")
                            
                            break
                        elif status["status"] == "failed":
                            error_msg = status.get('error', 'Unknown error')
                            logger.error(f"Content crawl task {task_id} for {url} failed: {error_msg} (Job ID: {job_id})")
                            if job_id:
                                update_url_status(job_id, url, 'crawl_error')
                            break
                        elif status["status"] == "running":
                            logger.info(f"Task {task_id} is still running")
                    except Exception as e:
                        logger.error(f"Error polling content crawl task {task_id} for {url}: {str(e)} (Job ID: {job_id})")
                        # Potentially mark as error here too, or rely on timeout
                        
                    await asyncio.sleep(poll_interval)
                
                if not result:
                    logger.warning(f"Timeout waiting for content crawl result for {url} after {max_attempts} attempts (Job ID: {job_id})")
                    if job_id:
                        update_url_status(job_id, url, 'crawl_error') # Mark as error on timeout
                    errors += 1
                    page.status = "error"
                    continue
                
                if "markdown" in result and result["markdown"]:
                    page_markdown = f"# {page.title or 'Untitled Page'}\n"
                    page_markdown += f"URL: {page.url}\n\n"
                    
                    content = result["markdown"]
                    
                    filtered_lines = []
                    skip_next = False
                    for line in content.split('\n'):
                        if skip_next:
                            skip_next = False
                            continue
                            
                        if 'To navigate the symbols, press' in line:
                            skip_next = True
                            continue
                            
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
                        logger.info(f"Successfully extracted content from {url} (Job ID: {job_id})")
                        if job_id:
                            update_url_status(job_id, url, 'completed')
                        
                        # Mark URL as crawled
                        crawled_urls.add(page.url)
                        page.status = "crawled"
                    else:
                        logger.warning(f"Skipping {url} - filtered content was empty (Job ID: {job_id})")
                        errors += 1
                        page.status = "error" # Keep local status for stats
                        if job_id:
                            update_url_status(job_id, url, 'crawl_error') # Mark as error in global status
                else:
                    logger.warning(f"Skipping {url} - no markdown content available (Job ID: {job_id})")
                    errors += 1
                    page.status = "error" # Keep local status for stats
                    if job_id:
                        update_url_status(job_id, url, 'crawl_error') # Mark as error in global status
                    
            except Exception as e:
                error_message = f"Error crawling page {page.url}: {str(e)}"
                logger.error(error_message, exc_info=True)
                errors += 1
                page.status = "error" # Keep local status for stats
                if job_id:
                    update_url_status(job_id, page.url, 'crawl_error') # Mark as error in global status
        
        combined_markdown = "".join(all_markdown)
        
        size_str = f"{total_size} B"
        if total_size > 1024:
            size_str = f"{total_size/1024:.2f} KB"
        if total_size > 1024*1024:
            size_str = f"{total_size/(1024*1024):.2f} MB"
        
        stats = CrawlStats(
            subdomains_parsed=len(pages),
            pages_crawled=len(crawled_urls),
            data_extracted=size_str,
            errors_encountered=errors
        )
        
        logger.info(f"Completed crawling for job {job_id} with stats: {stats}")
        if job_id:
            final_status = 'completed' if errors == 0 else 'completed_with_errors'
            # Pass the calculated size_str to update_overall_status
            update_overall_status(job_id, final_status, data_extracted=size_str) 
        return CrawlResult(
            markdown=combined_markdown,
            stats=stats
        )
        
    except Exception as e:
        error_message = f"Error in crawl_pages for job {job_id}: {str(e)}"
        logger.error(error_message, exc_info=True)
        if job_id:
            update_overall_status(job_id, 'error', error_message)
        return CrawlResult(
            markdown="",
            stats=CrawlStats(
                subdomains_parsed=len(pages),
                pages_crawled=0,
                data_extracted="0 KB",
                errors_encountered=1
            )
        )