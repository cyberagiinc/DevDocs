from typing import List, Optional, Set
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

def normalize_url(url: str) -> str:
    """Normalize URL by removing trailing slashes and fragments"""
    parsed = urlparse(url)
    path = parsed.path.rstrip('/')
    if not path:
        path = '/'
    return f"{parsed.scheme}://{parsed.netloc}{path}"

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

# In-memory storage for individual files
# Structure: {filename: {'content': str, 'metadata': dict, 'timestamp': str}}
in_memory_files = {}

class MemoryFileObject:
    """A file-like object that stores content in memory instead of writing to disk"""
    def __init__(self, filename):
        self.filename = filename
        self.buffer = []
        
    def write(self, content):
        self.buffer.append(content)
        return len(content)
        
    def close(self):
        # Store the content in memory
        in_memory_files[self.filename] = {
            'content': ''.join(self.buffer),
            'timestamp': datetime.now().isoformat()
        }
        
        # If this is a JSON file, parse and store metadata
        if self.filename.endswith('.json'):
            try:
                metadata = json.loads(''.join(self.buffer))
                in_memory_files[self.filename]['metadata'] = metadata
            except Exception as e:
                logger.error(f"Error parsing JSON for in-memory file {self.filename}: {str(e)}")
        
        logger.info(f"Stored file in memory: {self.filename}")
                
    def __enter__(self):
        return self
        
    def __exit__(self, *args):
        self.close()
        
    def read(self):
        if self.filename in in_memory_files:
            return in_memory_files[self.filename]['content']
        return ""

def is_individual_file(path: str) -> bool:
    """
    Determine if a file is an individual file (not a consolidated file).
    Individual files are those that have UUIDs as filenames.
    """
    filename = os.path.basename(path)
    # Check if the filename looks like a UUID
    uuid_pattern = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(json|md)$'
    return bool(re.match(uuid_pattern, filename))

def is_consolidated_file(path: str) -> bool:
    """
    Determine if a file is a consolidated file.
    Consolidated files are those in storage/markdown that are not UUIDs.
    """
    if "storage/markdown" not in path:
        return False
        
    return not is_individual_file(path)

# Create a function to redirect writes from crawl_results to storage/markdown
def redirect_file_writes(path: str, content=None, task_id=None, root_url=None) -> str:
    """
    If a file is being written to crawl_results, redirect it to storage/markdown or memory.
    Returns the original path for non-crawl_results files, or the redirected path for crawl_results files.
    
    If content and task_id are provided, this function will also handle consolidation.
    """
    if "crawl_results" in path:
        # Extract the filename from the path
        filename = os.path.basename(path)
        
        # Check if this is an individual file (UUID pattern)
        if is_individual_file(path):
            # Keep individual files in memory
            logger.info(f"Keeping individual file in memory: {path}")
            # We'll return the original path, but the redirecting_open function will intercept it
            # and use a MemoryFileObject instead of writing to disk
            return path
        
        # If this is a markdown file and we have content and task_id, we'll consolidate it
        if filename.endswith('.md') and content and task_id:
            # Generate a consistent file ID based on the root URL
            if root_url:
                file_id = url_to_filename(root_url)
                logger.info(f"Using file ID {file_id} for consolidation based on root URL: {root_url}")
            else:
                # If no root_url is provided, use the task_id
                file_id = task_id
                logger.info(f"Using task ID {task_id} as file ID for consolidation (no root URL provided)")
            
            # Create the consolidated file path
            consolidated_path = os.path.join("storage/markdown", f"{file_id}.md")
            
            # We'll return the consolidated path, but the actual consolidation will be handled elsewhere
            logger.info(f"Redirecting markdown file from {path} to consolidated file: {consolidated_path}")
            return consolidated_path
        
        # For other files, just redirect to storage/markdown
        redirected_path = os.path.join("storage/markdown", filename)
        logger.info(f"Redirecting file from {path} to {redirected_path}")
        return redirected_path
    
    return path

# Store task context for file redirection
_task_context = {
    'current_task_id': None,
    'current_root_url': None,
    'current_content': None
}

def set_task_context(task_id=None, root_url=None, content=None):
    """Set the current task context for file redirection"""
    if task_id:
        _task_context['current_task_id'] = task_id
    if root_url:
        _task_context['current_root_url'] = root_url
    if content:
        _task_context['current_content'] = content
    logger.info(f"Task context set: task_id={task_id}, root_url={root_url}, content_length={len(content) if content else 0}")

# Monkey patch the open function to redirect writes from crawl_results to storage/markdown
original_open = open
def redirecting_open(file, mode='r', *args, **kwargs):
    if 'w' in mode:
        # Check if this is an individual file that should be kept in memory
        if "crawl_results" in str(file) and is_individual_file(file):
            logger.info(f"Using MemoryFileObject for {file}")
            return MemoryFileObject(file)
        
        # For other files, redirect the path if needed
        file = redirect_file_writes(
            file,
            content=_task_context.get('current_content'),
            task_id=_task_context.get('current_task_id'),
            root_url=_task_context.get('current_root_url')
        )
    elif 'r' in mode:
        # For read operations, check if the file exists in memory first
        if is_individual_file(file) and file in in_memory_files:
            logger.info(f"Reading from in-memory file: {file}")
            return MemoryFileObject(file)
    
    # For all other cases, use the original open function
    return original_open(file, mode, *args, **kwargs)

# Replace the built-in open function with our redirecting version
import builtins
builtins.open = redirecting_open

# Ensure storage/markdown directory exists
os.makedirs("storage/markdown", exist_ok=True)

# Log that we're redirecting files
logger.info("File redirection active: All files from crawl_results will be redirected to storage/markdown")

async def discover_pages(
    url: str,
    max_depth: int = 3,
    current_depth: int = 1,
    seen_urls: Set[str] = None,
    parent_urls: Set[str] = None,
    all_internal_links: Set[str] = None,
    root_url: str = None,
    root_task_id: str = None
) -> List[DiscoveredPage]:
    if seen_urls is None:
        seen_urls = set()
    if parent_urls is None:
        parent_urls = set()
    if all_internal_links is None:
        all_internal_links = set()
    
    # If this is the root URL (first call), set root_url and generate a root_task_id
    if root_url is None:
        root_url = url
        # Use a human-readable filename based on the URL
        root_task_id = url_to_filename(root_url)
        logger.info(f"Starting crawl for root URL: {root_url} with filename: {root_task_id}")
    
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
        # Simplify the request for testing
        # The error in the logs shows that there's an issue with the 'magic' parameter
        # Let's remove any extra parameters and keep it simple
        simple_request = {
            "urls": url
        }
        
        # Submit crawl job to Crawl4AI
        logger.info(f"Submitting crawl job for {url} to Crawl4AI API with auth headers")
        
        # Log the full request for debugging
        logger.info(f"Request URL: {CRAWL4AI_URL}/crawl")
        logger.info(f"Headers: {headers}")
        logger.info(f"Request data: {json.dumps(simple_request)}")
        
        # Log environment variables for debugging
        logger.info(f"CRAWL4AI_URL environment variable: {os.environ.get('CRAWL4AI_URL', 'Not set')}")
        logger.info(f"CRAWL4AI_API_TOKEN environment variable: {'Set' if os.environ.get('CRAWL4AI_API_TOKEN') else 'Not set'}")
        
        # Make the request with explicit timeout and error handling
        try:
            # Try to ping the Crawl4AI service first
            import socket
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(2)
            crawl4ai_host = CRAWL4AI_URL.split('//')[1].split(':')[0]
            crawl4ai_port = int(CRAWL4AI_URL.split(':')[-1])
            logger.info(f"Attempting to connect to {crawl4ai_host}:{crawl4ai_port}")
            result = s.connect_ex((crawl4ai_host, crawl4ai_port))
            s.close()
            
            if result == 0:
                logger.info(f"Successfully connected to {crawl4ai_host}:{crawl4ai_port}")
            else:
                logger.error(f"Could not connect to {crawl4ai_host}:{crawl4ai_port}, error code: {result}")
                # Instead of raising an exception, return a page with error status
                # This allows the frontend to display the error instead of failing silently
                return [DiscoveredPage(
                    url=url,
                    title=f"Connection Error: Could not connect to Crawl4AI service at {crawl4ai_host}:{crawl4ai_port}",
                    status="error",
                    internalLinks=[]
                )]
            
            # Now make the actual request
            logger.info(f"Sending POST request to {CRAWL4AI_URL}/crawl")
            response = requests.post(
                f"{CRAWL4AI_URL}/crawl",
                headers=headers,
                json=simple_request,
                timeout=30
            )
            
            # Log the response status and headers
            logger.info(f"Response status code: {response.status_code}")
            logger.info(f"Response headers: {response.headers}")
            
            # Check if the response is valid JSON
            try:
                response_json = response.json()
                logger.info(f"Response JSON: {response_json}")
            except Exception as json_error:
                logger.error(f"Response is not valid JSON: {str(json_error)}")
                logger.error(f"Response text: {response.text[:500]}")
                # Return a page with error status
                return [DiscoveredPage(
                    url=url,
                    title=f"Invalid Response: Crawl4AI service returned invalid JSON",
                    status="error",
                    internalLinks=[]
                )]
            
            response.raise_for_status()
            task_id = response_json.get("task_id")
            
            if not task_id:
                logger.error(f"No task_id in response: {response_json}")
                # Return a page with error status
                return [DiscoveredPage(
                    url=url,
                    title=f"Invalid Response: No task_id in Crawl4AI response",
                    status="error",
                    internalLinks=[]
                )]
                
            logger.info(f"Submitted crawl job for {url}, task ID: {task_id}")
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response status: {e.response.status_code}")
                logger.error(f"Response body: {e.response.text[:500]}")
            
            # Return a page with error status instead of raising an exception
            return [DiscoveredPage(
                url=url,
                title=f"Request Error: {str(e)}",
                status="error",
                internalLinks=[]
            )]
        except Exception as e:
            logger.error(f"Connection error: {str(e)}")
            
            # Return a page with error status instead of raising an exception
            return [DiscoveredPage(
                url=url,
                title=f"Connection Error: {str(e)}",
                status="error",
                internalLinks=[]
            )]
        
        # Poll for result with increased frequency and longer total timeout
        result = None
        max_attempts = 120  # Increased from 60 to 120 for complex URLs
        poll_interval = 1  # Keep at 1 second
        polling_errors = 0  # Track consecutive polling errors
        
        logger.info(f"Starting to poll for task {task_id} result (max attempts: {max_attempts})")
        for attempt in range(max_attempts):
            logger.info(f"Polling for task {task_id} result (attempt {attempt+1}/{max_attempts})")
            try:
                # Log the polling request details
                poll_url = f"{CRAWL4AI_URL}/task/{task_id}"
                logger.info(f"Sending GET request to {poll_url}")
                
                status_response = requests.get(
                    poll_url,
                    headers=headers,
                    timeout=10
                )
                
                # Log the response status and headers
                logger.info(f"Poll response status code: {status_response.status_code}")
                
                # Check if the response is valid JSON
                try:
                    status = status_response.json()
                    logger.info(f"Poll response JSON: {status}")
                except Exception as json_error:
                    logger.error(f"Poll response is not valid JSON: {str(json_error)}")
                    logger.error(f"Poll response text: {status_response.text[:500]}")
                    polling_errors += 1
                    
                    # If we've had too many consecutive errors, return an error page
                    if polling_errors >= 5:
                        logger.error(f"Too many consecutive polling errors ({polling_errors}), giving up")
                        return [DiscoveredPage(
                            url=url,
                            title=f"Polling Error: Invalid JSON response from Crawl4AI service",
                            status="error",
                            internalLinks=[]
                        )]
                    
                    # Otherwise, wait and try again
                    await asyncio.sleep(poll_interval)
                    continue
                
                status_response.raise_for_status()
                
                # Reset the error counter on successful response
                polling_errors = 0
                
                # Check if status field exists
                if "status" not in status:
                    logger.error(f"No 'status' field in response: {status}")
                    continue
                
                logger.info(f"Task {task_id} status: {status['status']}")
                
                if status["status"] == "completed":
                    # Check if result field exists
                    if "result" not in status:
                        logger.error(f"Task completed but no 'result' field in response: {status}")
                        return [DiscoveredPage(
                            url=url,
                            title=f"Invalid Response: No result in completed task response",
                            status="error",
                            internalLinks=[]
                        )]
                    
                    result = status["result"]
                    logger.info(f"Task {task_id} completed successfully")
                    
                    # Save the result to files
                    try:
                        # Only create the storage directory for consolidated files
                        # Disable creation of crawl_results directory to prevent individual files
                        # os.makedirs("crawl_results", exist_ok=True)
                        os.makedirs("storage/markdown", exist_ok=True)
                        
                        # Skip any code that might try to write to crawl_results
                        if "crawl_results" in str(task_id):
                            logger.warning(f"Attempted to create file in crawl_results directory - skipping")
                            return [DiscoveredPage(
                                url=url,
                                title="Configuration Error",
                                status="error",
                                internalLinks=[]
                            )]
                        
                        # Use the root_task_id for file naming to consolidate all related content
                        file_id = root_task_id if root_task_id else task_id
                        
                        # We no longer save individual files, only consolidated ones
                        logger.info(f"Skipping individual file creation for task {task_id} - using consolidated approach only")
                        
                        # Set the task context for file redirection
                        set_task_context(
                            task_id=task_id,
                            root_url=root_url,
                            content=result.get("markdown", "")
                        )
                        
                        # Extract the markdown content if available
                        if "markdown" in result and result["markdown"]:
                            # Log that we're using the consolidated approach
                            logger.info(f"Using consolidated approach for task {task_id}")
                            
                            # For the consolidated file, we'll append to the root file
                            storage_file = f"storage/markdown/{file_id}.md"
                            
                            # Create a section header for this page
                            page_section = f"\n\n## {result.get('title', 'Untitled Page')}\n"
                            page_section += f"URL: {url}\n\n"
                            page_section += result["markdown"]
                            page_section += "\n\n---\n\n"
                            
                            # If this is the first write to the file, add a header
                            if not os.path.exists(storage_file):
                                header = f"# Consolidated Documentation for {root_url}\n\n"
                                header += f"This file contains content from multiple pages related to {root_url}.\n"
                                header += f"Each section represents a different page that was crawled.\n\n"
                                header += "---\n"
                                page_section = header + page_section
                            
                            # Append to the file if it exists, otherwise create it
                            mode = 'a' if os.path.exists(storage_file) else 'w'
                            with open(storage_file, mode) as f:
                                f.write(page_section)
                            logger.info(f"{'Appended to' if mode == 'a' else 'Created'} consolidated markdown file: {storage_file}")
                            
                            # Update the metadata file with this page's info
                            metadata_file = f"storage/markdown/{file_id}.json"
                            
                            # Read existing metadata if it exists
                            metadata = {}
                            if os.path.exists(metadata_file):
                                try:
                                    with open(metadata_file, 'r') as f:
                                        metadata = json.load(f)
                                except json.JSONDecodeError:
                                    logger.error(f"Error reading metadata file: {metadata_file}")
                            
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
                            
                            # Write the updated metadata
                            with open(metadata_file, 'w') as f:
                                json.dump(metadata, f, indent=2)
                            logger.info(f"Updated metadata in {metadata_file}")
                        else:
                            logger.warning(f"No markdown content in result for task {task_id}")
                    except Exception as e:
                        logger.error(f"Error saving result to files: {str(e)}")
                        logger.error(f"Error details: {str(e)}", exc_info=True)
                    
                    break
                elif status["status"] == "failed":
                    error_message = status.get('error', 'Unknown error')
                    logger.error(f"Task {task_id} failed: {error_message}")
                    return [DiscoveredPage(
                        url=url,
                        title=f"Task Failed: {error_message}",
                        status="error",
                        internalLinks=[]
                    )]
                elif status["status"] == "running":
                    logger.info(f"Task {task_id} is still running")
                else:
                    logger.warning(f"Unknown task status: {status['status']}")
            except requests.exceptions.RequestException as e:
                logger.error(f"Request error polling task {task_id}: {str(e)}")
                polling_errors += 1
                
                # If we've had too many consecutive errors, return an error page
                if polling_errors >= 5:
                    logger.error(f"Too many consecutive polling errors ({polling_errors}), giving up")
                    return [DiscoveredPage(
                        url=url,
                        title=f"Polling Error: {str(e)}",
                        status="error",
                        internalLinks=[]
                    )]
            except Exception as e:
                logger.error(f"Error polling task {task_id}: {str(e)}")
                polling_errors += 1
                
                # If we've had too many consecutive errors, return an error page
                if polling_errors >= 5:
                    logger.error(f"Too many consecutive polling errors ({polling_errors}), giving up")
                    return [DiscoveredPage(
                        url=url,
                        title=f"Polling Error: {str(e)}",
                        status="error",
                        internalLinks=[]
                    )]
                
            await asyncio.sleep(poll_interval)
        
        if not result:
            logger.warning(f"Timeout waiting for crawl result for {url} after {max_attempts} attempts")
            # Return a basic page with error status
            return [DiscoveredPage(
                url=url,
                title="Timeout Error: Crawl4AI service did not complete the task in time",
                status="error",
                internalLinks=[]
            )]
            
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
                    root_task_id=root_task_id
                )
                discovered_pages.extend(sub_pages)
        
        return discovered_pages
        
    except Exception as e:
        logger.error(f"Error discovering pages: {str(e)}")
        return [DiscoveredPage(url=url, title="Main Page", status="error")]

async def crawl_pages(pages: List[DiscoveredPage], root_url: str = None) -> CrawlResult:
    """
    Crawl multiple pages and combine their content into a single markdown document.
    
    Args:
        pages: List of pages to crawl
        root_url: The root URL that initiated the crawl. Used for file naming.
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
                logger.info(f"Crawling page: {page.url}")
                
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
                logger.info(f"Submitting crawl job for {url} to Crawl4AI API")
                
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
                logger.info(f"Submitted crawl job for {url}, task ID: {task_id}")
                
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
                            logger.info(f"Task {task_id} completed successfully")
                            
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
                                
                                # Set the task context for file redirection
                                set_task_context(
                                    task_id=task_id,
                                    root_url=root_url,
                                    content=result.get("markdown", "")
                                )
                                
                                # Extract the markdown content if available
                                if "markdown" in result and result["markdown"]:
                                    # Log that we're using the consolidated approach
                                    logger.info(f"Using consolidated approach for task {task_id}")
                                    
                                    # For the consolidated file, we'll append to the root file
                                    storage_file = f"storage/markdown/{file_id}.md"
                                    
                                    # Create a section header for this page
                                    page_section = f"\n\n## {result.get('title', 'Untitled Page')}\n"
                                    page_section += f"URL: {url}\n\n"
                                    page_section += result["markdown"]
                                    page_section += "\n\n---\n\n"
                                    
                                    # If this is the first write to the file, add a header
                                    if not os.path.exists(storage_file):
                                        header = f"# Consolidated Documentation for {root_url}\n\n"
                                        header += f"This file contains content from multiple pages related to {root_url}.\n"
                                        header += f"Each section represents a different page that was crawled.\n\n"
                                        header += "---\n"
                                        page_section = header + page_section
                                    
                                    # Append to the file if it exists, otherwise create it
                                    mode = 'a' if os.path.exists(storage_file) else 'w'
                                    with open(storage_file, mode) as f:
                                        f.write(page_section)
                                    logger.info(f"{'Appended to' if mode == 'a' else 'Created'} consolidated markdown file: {storage_file}")
                                    
                                    # Update the metadata file with this page's info
                                    metadata_file = f"storage/markdown/{file_id}.json"
                                    
                                    # Read existing metadata if it exists
                                    metadata = {}
                                    if os.path.exists(metadata_file):
                                        try:
                                            with open(metadata_file, 'r') as f:
                                                metadata = json.load(f)
                                        except json.JSONDecodeError:
                                            logger.error(f"Error reading metadata file: {metadata_file}")
                                    
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
                                    
                                    # Write the updated metadata
                                    with open(metadata_file, 'w') as f:
                                        json.dump(metadata, f, indent=2)
                                    logger.info(f"Updated metadata in {metadata_file}")
                            except Exception as e:
                                logger.error(f"Error saving result to files: {str(e)}")
                            
                            break
                        elif status["status"] == "failed":
                            logger.error(f"Task {task_id} failed: {status.get('error', 'Unknown error')}")
                            break
                        elif status["status"] == "running":
                            logger.info(f"Task {task_id} is still running")
                    except Exception as e:
                        logger.error(f"Error polling task {task_id}: {str(e)}")
                        
                    await asyncio.sleep(poll_interval)
                
                if not result:
                    logger.warning(f"Timeout waiting for crawl result for {url} after {max_attempts} attempts")
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
                        logger.info(f"Successfully extracted content from {url}")
                        
                        # Mark URL as crawled
                        crawled_urls.add(page.url)
                        page.status = "crawled"
                    else:
                        logger.warning(f"Skipping {url} - filtered content was empty")
                        errors += 1
                        page.status = "error"
                else:
                    logger.warning(f"Skipping {url} - no markdown content available")
                    errors += 1
                    page.status = "error"
                    
            except Exception as e:
                logger.error(f"Error crawling page {page.url}: {str(e)}")
                errors += 1
                page.status = "error"
        
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