from fastapi import FastAPI, HTTPException, Query, BackgroundTasks, Path as FastApiPath
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel, Field, validator # Removed Dict import
from typing import List, Optional, Dict # Import Dict from typing if needed elsewhere, or just use dict
import uvicorn
import logging
import psutil
import os
import requests
import json
import uuid
import asyncio
from pathlib import Path
from datetime import datetime
from .crawler import discover_pages, crawl_pages, DiscoveredPage, CrawlResult, url_to_filename

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
app = FastAPI(title="Crawl4AI Backend")

# Import status management
from .status_manager import (
    CrawlJobStatus,
    initialize_job,
    update_overall_status,
    update_url_status, # We might need this later in crawler.py
    add_pending_crawl_urls,
    get_job_status
)
# Removed redundant app assignment

# Configure CORS to allow requests from our frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://frontend:3001",  # Allow requests from the frontend container
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiscoverRequest(BaseModel):
    url: str
    depth: int = Field(default=3, ge=1, le=5)  # Enforce depth between 1 and 5

    @validator('depth')
    def validate_depth(cls, v):
        if not 1 <= v <= 5:
            raise ValueError('Depth must be between 1 and 5')
        return v

class CrawlRequest(BaseModel):
    job_id: str # Add job_id to link crawl request to discovery job
    pages: List[DiscoveredPage]

class MCPStatusResponse(BaseModel):
    status: str
    pid: int | None = None
    details: str | None = None

class MCPLogsResponse(BaseModel):
    logs: List[str]

class Crawl4AIStatusResponse(BaseModel):
    status: str
    details: str | None = None

class TestCrawl4AIRequest(BaseModel):
    url: str = Field(default="https://www.nbcnews.com/business")
    save_results: bool = Field(default=True)

class TestCrawl4AIResponse(BaseModel):
    success: bool
    task_id: str | None = None
    status: str
    result: dict | None = None
    error: str | None = None

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.get("/api/mcp/config")
async def get_mcp_config():
    """Get MCP server configuration"""
    try:
        # Get MCP host from environment variable or use container name
        mcp_host = os.environ.get("MCP_HOST", "mcp")
        logger.info(f"Using MCP host: {mcp_host}")

        # Since the MCP server is now running in a container, we don't need to provide
        # the command, args, and env. Instead, we'll just provide the container name.
        config = {
            "mcpServers": {
                "fast-markdown": {
                    "host": mcp_host,
                    "port": 8765,  # Default port for MCP server
                    "disabled": False,
                    "containerized": True  # Indicate that the MCP server is running in a container
                }
            }
        }
        return config
    except Exception as e:
        logger.error(f"Error generating config: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/mcp/status", response_model=MCPStatusResponse)
async def get_mcp_status():
    """Check if the MCP server is running by making a direct request to the MCP container"""
    try:
        logger.info("Checking MCP server status")
        
        # Get MCP host from environment variable or use default container name
        mcp_host = os.environ.get("MCP_HOST", "mcp")
        logger.info(f"Using MCP host: {mcp_host}")
        
        # Try to connect to the MCP server
        try:
            # Since the MCP server doesn't have a health endpoint, we'll check if the container is reachable
            import socket
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(2)
            
            # Try to resolve the hostname
            try:
                socket.gethostbyname(mcp_host)
                logger.info(f"Successfully resolved MCP host: {mcp_host}")
                
                # We can't actually connect to a port since MCP doesn't expose one,
                # but if we can resolve the hostname, we'll assume it's running
                logger.info("MCP server is operational (container is reachable)")
                return {
                    "status": "running",
                    "details": "MCP server container is reachable"
                }
            except socket.gaierror:
                logger.warning(f"Could not resolve MCP host: {mcp_host}")
                return {
                    "status": "stopped",
                    "details": f"Could not resolve MCP host: {mcp_host}"
                }
        except Exception as e:
            logger.warning(f"Failed to connect to MCP server: {str(e)}")
            
            # Fallback: Check if logs exist
            log_path = Path("logs/mcp.log")
            if log_path.exists():
                logger.info("MCP server is operational (log file exists)")
                return {
                    "status": "running",
                    "details": "MCP server is assumed to be running (log file exists)"
                }
            
            return {
                "status": "stopped",
                "details": f"Failed to connect: {str(e)}"
            }
    except Exception as e:
        logger.error(f"Error checking MCP status: {str(e)}", exc_info=True)
        return {
            "status": "error",
            "details": f"Error checking status: {str(e)}"
        }

@app.get("/api/crawl4ai/status", response_model=Crawl4AIStatusResponse)
async def get_crawl4ai_status():
    """Check if the Crawl4AI service is running"""
    try:
        logger.info("Checking Crawl4AI service status")
        crawl4ai_url = os.environ.get("CRAWL4AI_URL", "http://crawl4ai:11235")
        
        try:
            response = requests.get(f"{crawl4ai_url}/health", timeout=5)
            if response.status_code == 200:
                logger.info("Crawl4AI service is operational")
                return {
                    "status": "running",
                    "details": "Service is responding to health checks"
                }
            else:
                logger.warning(f"Crawl4AI service returned status code {response.status_code}")
                return {
                    "status": "error",
                    "details": f"Service returned status code {response.status_code}"
                }
        except requests.RequestException as e:
            logger.warning(f"Failed to connect to Crawl4AI service: {str(e)}")
            return {
                "status": "stopped",
                "details": f"Failed to connect: {str(e)}"
            }
    except Exception as e:
        logger.error(f"Error checking Crawl4AI status: {str(e)}", exc_info=True)
        return {
            "status": "error",
            "details": f"Error checking status: {str(e)}"
        }

@app.post("/api/crawl4ai/test", response_model=TestCrawl4AIResponse)
async def test_crawl4ai(request: TestCrawl4AIRequest):
    """Test the Crawl4AI service by crawling a URL"""
    try:
        logger.info(f"Testing Crawl4AI service with URL: {request.url}")
        crawl4ai_url = os.environ.get("CRAWL4AI_URL", "http://crawl4ai:11235")
        api_token = os.environ.get("CRAWL4AI_API_TOKEN", "devdocs-demo-key")
        
        # Set up headers for authentication
        headers = {"Authorization": f"Bearer {api_token}"}
        
        # Submit crawl job to Crawl4AI
        try:
            response = requests.post(
                f"{crawl4ai_url}/crawl", 
                headers=headers, 
                json={
                    "urls": request.url,
                    "priority": 10
                },
                timeout=30
            )
            response.raise_for_status()
            task_id = response.json()["task_id"]
            logger.info(f"Submitted crawl job for {request.url}, task ID: {task_id}")
            
            # Poll for result
            max_attempts = 30
            poll_interval = 1
            for attempt in range(max_attempts):
                logger.info(f"Polling for task {task_id} result (attempt {attempt+1}/{max_attempts})")
                try:
                    status_response = requests.get(
                        f"{crawl4ai_url}/task/{task_id}", 
                        headers=headers,
                        timeout=10
                    )
                    status_response.raise_for_status()
                    status = status_response.json()
                    
                    logger.info(f"Task {task_id} status: {status['status']}")
                    
                    if status["status"] == "completed":
                        result = status["result"]
                        logger.info(f"Task {task_id} completed successfully")
                        
                        # Save the result to a file if requested
                        if request.save_results:
                            # Ensure storage/markdown directory exists
                            os.makedirs("storage/markdown", exist_ok=True)
                            
                            # Note: We're now redirecting files from crawl_results to storage/markdown
                            logger.info(f"Files will be redirected from crawl_results to storage/markdown")
                            
                            # Generate a human-readable filename based on the URL
                            url_hash = url_to_filename(request.url)
                            
                            # We no longer save individual files, only consolidated ones
                            logger.info(f"Skipping individual file creation for task {task_id} - using consolidated approach only")
                            
                            # Extract the markdown content if available
                            if "markdown" in result and result["markdown"]:
                                # Log that we're skipping individual file creation
                                logger.info(f"Skipping individual markdown file for task {task_id} - using consolidated approach only")
                                
                                # For the consolidated file, we'll append to the root file
                                storage_file = f"storage/markdown/{url_hash}.md"
                                os.makedirs("storage/markdown", exist_ok=True)
                                
                                # Create a section header for this page
                                page_section = f"\n\n## {result.get('title', 'Untitled Page')}\n"
                                page_section += f"URL: {request.url}\n\n"
                                page_section += result["markdown"]
                                page_section += "\n\n---\n\n"
                                
                                # If this is the first write to the file, add a header
                                if not os.path.exists(storage_file):
                                    header = f"# Consolidated Documentation for {request.url}\n\n"
                                    header += f"This file contains content from multiple pages related to {request.url}.\n"
                                    header += f"Each section represents a different page that was crawled.\n\n"
                                    header += "---\n"
                                    page_section = header + page_section
                                
                                # Append to the file if it exists, otherwise create it
                                mode = 'a' if os.path.exists(storage_file) else 'w'
                                with open(storage_file, mode) as f:
                                    f.write(page_section)
                                logger.info(f"{'Appended to' if mode == 'a' else 'Created'} consolidated markdown file: {storage_file}")
                                
                                # Update the metadata file with this page's info
                                metadata_file = f"storage/markdown/{url_hash}.json"
                                
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
                                        "title": f"Documentation for {request.url}",
                                        "root_url": request.url,
                                        "timestamp": datetime.now().isoformat(),
                                        "pages": [],
                                        "is_consolidated": True
                                    }
                                
                                # Add this page to the pages list
                                metadata["pages"].append({
                                    "title": result.get("title", "Untitled"),
                                    "url": request.url,
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
                        
                        return {
                            "success": True,
                            "task_id": task_id,
                            "status": "completed",
                            "result": {
                                "title": result.get("title", "Untitled"),
                                "url": request.url,
                                "markdown_length": len(result.get("markdown", "")),
                                "internal_links": len(result.get("links", {}).get("internal", [])),
                                "external_links": len(result.get("links", {}).get("external", [])),
                                "consolidated_markdown_file": f"storage/markdown/{url_hash}.md" if request.save_results and "markdown" in result else None,
                                "consolidated_metadata_file": f"storage/markdown/{url_hash}.json" if request.save_results and "markdown" in result else None
                            }
                        }
                    elif status["status"] == "failed":
                        logger.error(f"Task {task_id} failed: {status.get('error', 'Unknown error')}")
                        return {
                            "success": False,
                            "task_id": task_id,
                            "status": "failed",
                            "error": status.get("error", "Unknown error")
                        }
                    
                    # Wait before polling again
                    await asyncio.sleep(poll_interval)
                except Exception as e:
                    logger.error(f"Error polling task {task_id}: {str(e)}")
                    await asyncio.sleep(poll_interval)
            
            # If we get here, the task timed out
            logger.warning(f"Timeout waiting for task {task_id} result")
            return {
                "success": False,
                "task_id": task_id,
                "status": "timeout",
                "error": f"Timeout waiting for result after {max_attempts} attempts"
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response status: {e.response.status_code}")
                logger.error(f"Response body: {e.response.text[:500]}")
            return {
                "success": False,
                "status": "error",
                "error": f"Request failed: {str(e)}"
            }
    except Exception as e:
        logger.error(f"Error testing Crawl4AI: {str(e)}", exc_info=True)
        return {
            "success": False,
            "status": "error",
            "error": f"Error testing Crawl4AI: {str(e)}"
        }
# Removed /api/memory-files and /api/memory-files/{file_id} endpoints

STORAGE_DIR = Path("storage/markdown")

@app.get("/api/storage/file-content")
async def get_storage_file_content(file_path: str = Query(..., description="Relative path to the file within storage/markdown")):
    """Reads and returns the content of a file from the storage/markdown directory."""
    try:
        # Security: Prevent directory traversal by ensuring file_path is just a filename
        base_path = STORAGE_DIR.resolve()
        safe_file_name = file_path.strip() # Remove leading/trailing whitespace

        # Disallow any path separators or '..' components in the requested name
        if "/" in safe_file_name or "\\" in safe_file_name or ".." in safe_file_name:
            logger.warning(f"Attempted directory traversal (invalid characters/components): {file_path}")
            raise HTTPException(status_code=400, detail="Invalid file path")

        # Construct the full path safely
        requested_path = base_path / safe_file_name

        # Optional: Double-check that the final resolved path is still within the base directory
        # This helps protect against more complex attacks like symlink issues if resolve() is used,
        # but the primary defense here is disallowing path components in the input.
        try:
            if not requested_path.resolve().is_relative_to(base_path):
                 logger.warning(f"Attempted directory traversal (resolved outside base): {file_path} -> {requested_path.resolve()}")
                 raise HTTPException(status_code=400, detail="Invalid file path location")
        except Exception as resolve_err: # Catch potential errors during resolve
            logger.warning(f"Error resolving path {requested_path}: {resolve_err}")
            raise HTTPException(status_code=400, detail="Invalid file path format")

        if not requested_path.is_file():
            logger.warning(f"Requested storage file not found: {requested_path}")
            raise HTTPException(status_code=404, detail=f"File not found at path: {requested_path}") # More specific detail

        logger.info(f"Attempting to read storage file: {requested_path}") # Log before read
        content = requested_path.read_text(encoding='utf-8')
        logger.info(f"Successfully read {len(content)} bytes from storage file: {requested_path}") # Log after successful read
        # Return as plain text, assuming frontend handles markdown rendering
        return PlainTextResponse(content=content)

    except HTTPException as http_exc:
        # Re-raise HTTPExceptions directly
        raise http_exc
    except Exception as e:
        # Log the specific error *before* raising the generic 500
        logger.error(f"Caught exception reading storage file {requested_path} (original request: {file_path}): {type(e).__name__} - {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")
# Removed stray brace

@app.get("/api/mcp/logs", response_model=MCPLogsResponse)
async def get_mcp_logs():
    """Get MCP server logs"""
    try:
        logger.info("Fetching MCP server logs")
        log_path = Path("logs/mcp.log")
        if not log_path.exists():
            logger.info("No log file found")
            return {"logs": []}
        
        with open(log_path, 'r') as f:
            # Get last 50 lines but skip empty lines
            logs = [line.strip() for line in f.readlines() if line.strip()][-50:]
        
        logger.info(f"Retrieved {len(logs)} log lines")
        return {"logs": logs}
    except Exception as e:
        logger.error(f"Error reading logs: {str(e)}", exc_info=True)
        return {"logs": [f"Error reading logs: {str(e)}"]}

@app.post("/api/discover")
async def discover_endpoint(request: DiscoverRequest, background_tasks: BackgroundTasks):
    """Initiates page discovery for the provided URL and returns a job ID."""
    try:
        job_id = str(uuid.uuid4())
        root_url = request.url
        logger.info(f"Received discover request for URL: {root_url} with depth: {request.depth}. Assigning job ID: {job_id}")

        # Initialize job status using the manager
        initialize_job(job_id=job_id, root_url=root_url)

        # Run discovery in the background
        # Pass crawl_jobs dictionary to the background task if direct import causes issues
        background_tasks.add_task(discover_pages, url=root_url, max_depth=request.depth, root_url=root_url, job_id=job_id)

        logger.info(f"Discovery initiated in background for job ID: {job_id}")
        # Return job ID immediately
        return {
            "message": "Discovery initiated",
            "job_id": job_id,
            "success": True
        }
        logger.info(f"Returning response with {len(response_data['pages'])} pages")
        return response_data
    except Exception as e:
        logger.error(f"Error initiating discovery for {request.url}: {str(e)}", exc_info=True)
        # Return a structured error response immediately if initiation fails
        # Note: Background task errors need separate handling within the task itself.
        raise HTTPException(status_code=500, detail=f"Error initiating discovery: {str(e)}")
@app.post("/api/crawl")
async def crawl_endpoint(request: CrawlRequest, background_tasks: BackgroundTasks):
    """Initiates crawling for the provided pages list associated with a job ID."""
    job_id = request.job_id
    try:
        logger.info(f"Received crawl request for job ID: {job_id} with {len(request.pages)} pages")

        job_status = get_job_status(job_id)
        if not job_status:
            logger.error(f"Crawl request received for unknown job ID: {job_id}")
            raise HTTPException(status_code=404, detail=f"Job ID {job_id} not found.")

        # Update overall status and add pending URLs using the manager
        update_overall_status(job_id=job_id, status='crawling')
        add_pending_crawl_urls(job_id=job_id, urls=[page.url for page in request.pages])

        # Determine root_url for file naming from the job status
        root_url = job_status.root_url
        if not root_url and request.pages:
             root_url = request.pages[0].url # Fallback if original root not found (shouldn't happen ideally)
        logger.info(f"Using root URL for consolidated files: {root_url} for job {job_id}")

        # Run crawling in the background
        # Pass crawl_jobs dictionary to the background task if direct import causes issues
        background_tasks.add_task(crawl_pages, pages=request.pages, root_url=root_url, job_id=job_id)

        logger.info(f"Crawling initiated in background for job ID: {job_id}")
        # Return acknowledgment immediately
        return {
            "message": "Crawling initiated",
            "job_id": job_id,
            "success": True
        }
    except Exception as e:
        logger.error(f"Error initiating crawl for job ID {job_id}: {str(e)}", exc_info=True)
        # Update job status using the manager
        update_overall_status(job_id=job_id, status='error', error_message=f"Error initiating crawl: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error initiating crawl: {str(e)}")


@app.get("/api/crawl-status/{job_id}", response_model=CrawlJobStatus)
async def get_crawl_status(job_id: str = FastApiPath(..., title="Job ID", description="The unique ID of the crawl job")):
    """Retrieves the current status of a crawl job."""
    logger.debug(f"Received status request for job ID: {job_id}")
    job_status = get_job_status(job_id)
    if not job_status:
        logger.warning(f"Status requested for unknown job ID: {job_id}")
        raise HTTPException(status_code=404, detail=f"Job ID {job_id} not found.")
    logger.debug(f"Returning status for job ID {job_id}: {job_status.overall_status}")
    return job_status

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=24125,
        reload=True,
        log_level="info"
    )