import logging
from pydantic import BaseModel, Field # Removed Dict import
from typing import Optional, Dict # Keep Dict from typing for clarity if preferred, or remove if using dict[]
from datetime import datetime
# Import normalize_url from crawler
from .utils import normalize_url # Import from utils

logger = logging.getLogger(__name__)

class CrawlJobStatus(BaseModel):
    """Represents the status of a discovery and crawl job."""
    job_id: str
    overall_status: str = Field(default='initializing', description="Overall status: initializing, discovering, discovery_complete, crawling, completed, error")
    urls: dict[str, str] = Field(default_factory=dict, description="Dictionary mapping URL to its status") # Use modern dict type hint
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    error: Optional[str] = None
    root_url: Optional[str] = None # Store the root URL for reference
    data_extracted: Optional[str] = None # Total data extracted size (e.g., "11.02 KB")

# In-memory storage for job statuses
# NOTE: This is ephemeral and will be lost on server restart.
# Consider a more persistent store (e.g., Redis, DB) for production.
crawl_jobs: dict[str, CrawlJobStatus] = {} # Use modern dict type hint

def initialize_job(job_id: str, root_url: str):
    """Initializes a new job status."""
    if job_id in crawl_jobs:
        logger.warning(f"Job ID {job_id} already exists. Re-initializing.")
    normalized_root_url = normalize_url(root_url) # Normalize before use
    crawl_jobs[job_id] = CrawlJobStatus(
        job_id=job_id,
        overall_status='initializing',
        urls={normalized_root_url: 'pending_discovery'}, # Use normalized URL as key
        start_time=datetime.now(),
        root_url=normalized_root_url # Store normalized URL
    )
    logger.info(f"Initialized job {job_id} for root URL {root_url}")

def update_overall_status(job_id: str, status: str, error_message: Optional[str] = None, data_extracted: Optional[str] = None):
    """Updates the overall status of a job, optionally including extracted data size."""
    if job_id in crawl_jobs:
        crawl_jobs[job_id].overall_status = status
        if status in ['completed', 'completed_with_errors', 'error']: # Added completed_with_errors
            crawl_jobs[job_id].end_time = datetime.now()
        if error_message:
            crawl_jobs[job_id].error = error_message
        if data_extracted is not None: # Added check and update for data_extracted
            crawl_jobs[job_id].data_extracted = data_extracted
            logger.info(f"Job {job_id} data extracted size updated to: {data_extracted}")
        logger.info(f"Job {job_id} overall status updated to: {status}")
    else:
        logger.error(f"Attempted to update overall status for non-existent job ID: {job_id}")

def update_url_status(job_id: str, url: str, status: str):
    """Updates the status of a specific URL within a job."""
    if job_id in crawl_jobs:
        normalized_url = normalize_url(url) # Normalize before use
        # Ensure the URL dictionary exists
        if crawl_jobs[job_id].urls is None:
             crawl_jobs[job_id].urls = {}
        crawl_jobs[job_id].urls[normalized_url] = status # Use normalized URL as key
        logger.debug(f"Job {job_id} URL status updated: {normalized_url} -> {status}")
    else:
        logger.error(f"Attempted to update URL status for non-existent job ID: {job_id}")

def add_pending_crawl_urls(job_id: str, urls: list[str]):
    """Adds multiple URLs with 'pending_crawl' status."""
    if job_id in crawl_jobs:
        if crawl_jobs[job_id].urls is None:
             crawl_jobs[job_id].urls = {}
        for url in urls:
             normalized_url = normalize_url(url) # Normalize before use
             # Only add if not already present with a final status (using normalized key)
             if normalized_url not in crawl_jobs[job_id].urls or crawl_jobs[job_id].urls[normalized_url] not in ['completed', 'crawl_error', 'discovery_error']:
                crawl_jobs[job_id].urls[normalized_url] = 'pending_crawl' # Use normalized URL as key
        logger.info(f"Added {len(urls)} URLs as pending_crawl for job {job_id}")
    else:
         logger.error(f"Attempted to add pending URLs for non-existent job ID: {job_id}")


def get_job_status(job_id: str) -> Optional[CrawlJobStatus]:
    """Retrieves the status of a specific job."""
    return crawl_jobs.get(job_id)