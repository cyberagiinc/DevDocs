import logging
from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime
from multiprocessing import Manager # Import Manager
# Import normalize_url from crawler
from .utils import normalize_url # Import from utils

logger = logging.getLogger(__name__)

# Initialize a multiprocessing Manager and create a managed dictionary
# This needs to be at the module level to be accessible by different processes/workers
try:
    manager = Manager()
    crawl_jobs_managed = manager.dict()
    logger.info("Initialized multiprocessing Manager and managed dictionary for crawl_jobs.")
except Exception as e:
    logger.error(f"Failed to initialize multiprocessing Manager: {e}. Falling back to regular dict (STATE WILL NOT BE SHARED BETWEEN PROCESSES).", exc_info=True)
    # Fallback to regular dict if Manager fails (e.g., in environments where it's not supported/needed)
    crawl_jobs_managed = {}


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
# Use the managed dictionary instead of the global one
crawl_jobs: Dict[str, CrawlJobStatus] = crawl_jobs_managed # Type hint remains Dict for compatibility

def initialize_job(job_id: str, root_url: str):
    """Initializes a new job status."""
    # Use the managed dict for checking existence and assignment
    if job_id in crawl_jobs:
        logger.warning(f"Job ID {job_id} already exists. Re-initializing.")
    normalized_root_url = normalize_url(root_url) # Normalize before use
    # Assign the new status object to the managed dict
    # Note: Pydantic models might need special handling with Manager dicts.
    # If direct assignment fails, we might need to convert to a regular dict first.
    try:
        new_status = CrawlJobStatus(
            job_id=job_id,
            overall_status='initializing',
            urls={normalized_root_url: 'pending_discovery'},
            start_time=datetime.now(),
            root_url=normalized_root_url
        )
        # Store the Pydantic model directly if possible, otherwise convert to dict
        # Direct assignment is often problematic with complex objects in managed dicts
        try:
             crawl_jobs[job_id] = new_status.dict() # Use .dict() for Pydantic v1
        except AttributeError: # Handle potential Pydantic v2
             crawl_jobs[job_id] = new_status.model_dump()

    except Exception as e:
        logger.critical(f"CRITICAL: Failed to store initial job status for {job_id}: {e}", exc_info=True)
        # Re-raise or handle appropriately - job cannot be tracked
        raise RuntimeError(f"Failed to initialize job status for {job_id}") from e

    logger.info(f"Initialized job {job_id} for root URL {root_url}")

def update_overall_status(job_id: str, status: str, error_message: Optional[str] = None, data_extracted: Optional[str] = None):
    """Updates the overall status of a job, optionally including extracted data size."""
    # Use the managed dict
    if job_id in crawl_jobs:
        try:
            # IMPORTANT: Modifications to nested objects in managed dicts require get/modify/set.
            current_status_data = crawl_jobs[job_id] # Get current data (likely a dict)

            # Recreate the Pydantic model from the dictionary data
            try:
                current_status = CrawlJobStatus(**current_status_data)
            except Exception as model_err:
                 logger.error(f"Error recreating CrawlJobStatus model for job {job_id} during overall status update: {model_err}", exc_info=True)
                 # Cannot proceed if model cannot be recreated
                 return

            # Modify the Pydantic model instance
            current_status.overall_status = status
            if status in ['completed', 'completed_with_errors', 'error']:
                current_status.end_time = datetime.now()
            if error_message:
                current_status.error = error_message
            if data_extracted is not None:
                current_status.data_extracted = data_extracted
                logger.info(f"Job {job_id} data extracted size updated to: {data_extracted}")

            # Convert the modified Pydantic model back to a dictionary
            try:
                 updated_status_data = current_status.dict() # Pydantic v1
            except AttributeError:
                 updated_status_data = current_status.model_dump() # Pydantic v2

            # Reassign the updated dictionary back to the managed dict
            crawl_jobs[job_id] = updated_status_data

            logger.info(f"Job {job_id} overall status updated to: {status}")
        except Exception as e:
             logger.error(f"Error updating overall status in managed dict for job {job_id}: {e}", exc_info=True)
    else:
        logger.error(f"Attempted to update overall status for non-existent job ID: {job_id}")

def update_url_status(job_id: str, url: str, status: str):
    """Updates the status of a specific URL within a job."""
    # Use the managed dict
    if job_id in crawl_jobs:
        try:
            # Get/modify/set pattern
            current_status_data = crawl_jobs[job_id] # Get dict

            # Recreate model
            try:
                current_status = CrawlJobStatus(**current_status_data)
            except Exception as model_err:
                 logger.error(f"Error recreating CrawlJobStatus model for job {job_id} during URL status update: {model_err}", exc_info=True)
                 return

            # Modify model
            normalized_url = normalize_url(url)
            if current_status.urls is None: # Should not happen with default_factory
                 current_status.urls = {}
            current_status.urls[normalized_url] = status

            # Convert back to dict
            try:
                 updated_status_data = current_status.dict() # Pydantic v1
            except AttributeError:
                 updated_status_data = current_status.model_dump() # Pydantic v2

            # Reassign dict
            crawl_jobs[job_id] = updated_status_data

            logger.debug(f"Job {job_id} URL status updated: {normalized_url} -> {status}")
        except Exception as e:
             logger.error(f"Error updating URL status in managed dict for job {job_id}: {e}", exc_info=True)
    else:
        logger.error(f"Attempted to update URL status for non-existent job ID: {job_id}")

def add_pending_crawl_urls(job_id: str, urls: list[str]):
    """Adds multiple URLs with 'pending_crawl' status."""
    # Use the managed dict
    if job_id in crawl_jobs:
        try:
            # Get/modify/set pattern
            current_status_data = crawl_jobs[job_id] # Get dict

            # Recreate model
            try:
                current_status = CrawlJobStatus(**current_status_data)
            except Exception as model_err:
                 logger.error(f"Error recreating CrawlJobStatus model for job {job_id} during add pending URLs: {model_err}", exc_info=True)
                 return

            # Modify model
            if current_status.urls is None:
                 current_status.urls = {}

            added_count = 0
            for url in urls:
                 normalized_url = normalize_url(url)
                 if normalized_url not in current_status.urls or current_status.urls[normalized_url] not in ['completed', 'crawl_error', 'discovery_error']:
                    current_status.urls[normalized_url] = 'pending_crawl'
                    added_count += 1

            # Reassign if changes were made
            if added_count > 0:
                 # Convert back to dict
                 try:
                     updated_status_data = current_status.dict() # Pydantic v1
                 except AttributeError:
                     updated_status_data = current_status.model_dump() # Pydantic v2
                 # Reassign dict
                 crawl_jobs[job_id] = updated_status_data

            logger.info(f"Added {added_count} URLs as pending_crawl for job {job_id}")
        except Exception as e:
             logger.error(f"Error adding pending URLs in managed dict for job {job_id}: {e}", exc_info=True)
    else:
         logger.error(f"Attempted to add pending URLs for non-existent job ID: {job_id}")


def get_job_status(job_id: str) -> Optional[CrawlJobStatus]:
    """Retrieves the status of a specific job."""
    # Retrieve from the managed dict
    status_data = crawl_jobs.get(job_id)
    if status_data is None:
        return None
    # Data is stored as dict, so reconstruct the Pydantic model before returning
    try:
        return CrawlJobStatus(**status_data)
    except Exception as e:
        logger.error(f"Error reconstructing CrawlJobStatus from managed dict data for job {job_id}: {e}", exc_info=True)
        # Return None or raise an error if reconstruction fails
        return None