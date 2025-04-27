import logging
from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime
from multiprocessing import Manager # Import Manager
# Import normalize_url from crawler
from .utils import normalize_url # Import from utils

logger = logging.getLogger(__name__)
# --- Custom Exceptions ---
class JobNotFoundException(Exception):
    """Raised when a job ID is not found or is in a final state."""
    pass

class JobStatusException(Exception):
    """Raised when an operation cannot be performed due to the job's current status."""
    pass

# --- Multiprocessing Manager Setup ---
# Initialize a multiprocessing Manager and create managed dictionaries
# This needs to be at the module level to be accessible by different processes/workers
try:
    manager = Manager()
    crawl_jobs_managed = manager.dict()
    _cancellation_requests_managed = manager.dict() # Added for cancellation flags
    logger.info("Initialized multiprocessing Manager and managed dictionaries for crawl_jobs and cancellation_requests.")
except Exception as e:
    logger.error(f"Failed to initialize multiprocessing Manager: {e}. Falling back to regular dicts (STATE WILL NOT BE SHARED BETWEEN PROCESSES).", exc_info=True)
    # Fallback to regular dicts if Manager fails
    crawl_jobs_managed = {}
    _cancellation_requests_managed = {}

class CrawlJobStatus(BaseModel):
    """Represents the status of a discovery and crawl job."""
    job_id: str
    overall_status: str = Field(default='initializing', description="Overall status: initializing, discovering, discovery_complete, crawling, cancelling, cancelled, completed, completed_with_errors, error") # Added cancelling/cancelled
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
# --- Pydantic Models ---

class UrlDetails(BaseModel):
    """Represents the status and details of a specific URL within a job."""
    status: str
    statusCode: Optional[int] = None
    errorMessage: Optional[str] = None # Added field for specific URL errors

class CrawlJobStatus(BaseModel):
    """Represents the status of a discovery and crawl job."""
    job_id: str
    overall_status: str = Field(default='initializing', description="Overall status: initializing, discovering, discovery_complete, crawling, cancelling, cancelled, completed, completed_with_errors, error") # Added cancelling/cancelled
    urls: dict[str, UrlDetails] = Field(default_factory=dict, description="Dictionary mapping URL to its status and details") # Updated type hint
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    error: Optional[str] = None
    root_url: Optional[str] = None # Store the root URL for reference
    data_extracted: Optional[str] = None # Total data extracted size (e.g., "11.02 KB")

# --- End Pydantic Models ---


# In-memory storage for job statuses
# NOTE: This is ephemeral and will be lost on server restart.
# Consider a more persistent store (e.g., Redis, DB) for production.
# Use the managed dictionary instead of the global one
crawl_jobs: Dict[str, CrawlJobStatus] = crawl_jobs_managed # Type hint remains Dict for compatibility
_cancellation_requests: Dict[str, bool] = _cancellation_requests_managed # Added for cancellation flags

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
            urls={normalized_root_url: UrlDetails(status='pending_discovery')}, # Initialize with UrlDetails
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

            # --- Cancellation Cleanup ---
            # If the job has reached a final state, remove any cancellation request flag
            if status in ['completed', 'completed_with_errors', 'error', 'cancelled']:
                removed_flag = _cancellation_requests.pop(job_id, None)
                if removed_flag is not None:
                    logger.info(f"Removed cancellation flag for job {job_id} as it reached final state: {status}")
            # --- End Cancellation Cleanup ---

        except Exception as e:
             logger.error(f"Error updating overall status in managed dict for job {job_id}: {e}", exc_info=True)
    else:
        logger.error(f"Attempted to update overall status for non-existent job ID: {job_id}")

def update_url_status(job_id: str, url: str, status: str, statusCode: Optional[int] = None, error_message: Optional[str] = None): # Added statusCode and error_message parameters
    """Updates the status, optionally the HTTP status code, and optionally an error message of a specific URL within a job."""
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
            current_status.urls[normalized_url] = UrlDetails(status=status, statusCode=statusCode, errorMessage=error_message) # Store UrlDetails object including error message

            # Convert back to dict
            try:
                 updated_status_data = current_status.dict() # Pydantic v1
            except AttributeError:
                 updated_status_data = current_status.model_dump() # Pydantic v2

            # Reassign dict
            crawl_jobs[job_id] = updated_status_data

            log_extra = f", error='{error_message}'" if error_message else ""
            logger.debug(f"Job {job_id} URL status updated: {normalized_url} -> status={status}, statusCode={statusCode}{log_extra}") # Updated log message
        except Exception as e:
             logger.error(f"Error updating URL status ({normalized_url}) in managed dict for job {job_id}: {e}", exc_info=True)
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
                 # Check if URL exists and if its status is final before overwriting
                 existing_details = current_status.urls.get(normalized_url)
                 if not existing_details or existing_details.status not in ['completed', 'crawl_error', 'discovery_error']:
                    current_status.urls[normalized_url] = UrlDetails(status='pending_crawl') # Initialize with UrlDetails
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

# --- Cancellation Functions ---

def request_cancellation(job_id: str) -> bool:
    """
    Requests cancellation for a given job_id.
    Sets the cancellation flag and updates the job status to 'cancelling'.
    Handles idempotency and raises exceptions for invalid states or IDs.

    Returns:
        bool: True if cancellation was successfully requested or already in progress/done.
    Raises:
        JobNotFoundException: If the job_id does not exist or is already in a final completed/error state.
        JobStatusException: If the job is in a state that cannot be cancelled (e.g., 'initializing').
    """
    logger.info(f"Processing cancellation request for job ID: {job_id}")

    # Check if job exists using the managed dict
    if job_id not in crawl_jobs:
        logger.warning(f"Cancellation requested for non-existent job ID: {job_id}")
        raise JobNotFoundException(f"Job ID {job_id} not found.")

    try:
        # Get/modify/set pattern for crawl_jobs
        current_status_data = crawl_jobs[job_id]
        try:
            current_status = CrawlJobStatus(**current_status_data)
        except Exception as model_err:
            logger.error(f"Error recreating CrawlJobStatus model for job {job_id} during cancellation request: {model_err}", exc_info=True)
            # Treat as internal error if model cannot be recreated
            raise RuntimeError(f"Failed to process cancellation due to internal state error for job {job_id}") from model_err

        # Check current status
        if current_status.overall_status in ['cancelling', 'cancelled']:
            logger.warning(f"Cancellation already requested or completed for job ID: {job_id}. Status: {current_status.overall_status}")
            return True # Idempotent: Already cancelling or cancelled
        elif current_status.overall_status in ['completed', 'completed_with_errors', 'error']:
            logger.warning(f"Cancellation requested for job ID {job_id} which is already in a final state: {current_status.overall_status}")
            raise JobNotFoundException(f"Job {job_id} is already in a final state ({current_status.overall_status}).")
        elif current_status.overall_status not in ['discovering', 'crawling']:
             # e.g., 'initializing', 'discovery_complete' are not typically cancellable this way
             logger.warning(f"Cancellation requested for job ID {job_id} in non-cancellable state: {current_status.overall_status}")
             raise JobStatusException(f"Job {job_id} cannot be cancelled from state: {current_status.overall_status}")

        # --- Proceed with cancellation ---
        logger.info(f"Setting cancellation flag for job ID: {job_id}")
        _cancellation_requests[job_id] = True # Set flag in the separate managed dict

        # Update job status to 'cancelling'
        current_status.overall_status = 'cancelling'
        current_status.end_time = None # Reset end time if it was somehow set

        # Convert back to dict
        try:
            updated_status_data = current_status.dict() # Pydantic v1
        except AttributeError:
            updated_status_data = current_status.model_dump() # Pydantic v2

        # Reassign dict back to crawl_jobs
        crawl_jobs[job_id] = updated_status_data
        logger.info(f"Job {job_id} overall status updated to: cancelling")

        return True

    except (JobNotFoundException, JobStatusException) as e:
        # Re-raise specific exceptions
        raise e
    except Exception as e:
        logger.error(f"Unexpected error processing cancellation request for job {job_id}: {e}", exc_info=True)
        # Raise a generic runtime error for unexpected issues
        raise RuntimeError(f"Unexpected error processing cancellation for job {job_id}") from e


def is_cancellation_requested(job_id: str) -> bool:
    """Checks if cancellation has been requested for a specific job ID."""
    # Simple check against the cancellation flags dictionary
    requested = _cancellation_requests.get(job_id, False)
    if requested:
        logger.debug(f"Cancellation check for job {job_id}: Requested=True")
    return requested

# --- End Cancellation Functions ---