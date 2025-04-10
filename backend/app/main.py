from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List
import uvicorn
import logging
import psutil
import os
import requests
import json
import asyncio
from pathlib import Path
from datetime import datetime
from .crawler import discover_pages, crawl_pages, DiscoveredPage, CrawlResult, url_to_filename, in_memory_files, is_individual_file

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Crawl4AI Backend")

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

@app.get("/api/memory-files")
async def list_memory_files():
    """List all files stored in memory"""
    try:
        logger.info("Listing in-memory files")
        
        # Convert the in-memory files to a list of file details
        file_details = []
        for filename, file_data in in_memory_files.items():
            # Extract the file ID (without extension)
            file_id = os.path.basename(filename)
            if file_id.endswith('.md'):
                file_id = file_id[:-3]
            elif file_id.endswith('.json'):
                file_id = file_id[:-5]
                
            # Get the content and metadata
            content = file_data.get('content', '')
            metadata = file_data.get('metadata', {})
            timestamp = file_data.get('timestamp', datetime.now().isoformat())
            
            # Check if this is a JSON file
            is_json = filename.endswith('.json')
            
            # Add the file details
            file_details.append({
                'name': file_id,
                'path': filename,
                'timestamp': timestamp,
                'size': len(content),
                'wordCount': len(content.split()) if not is_json else 0,
                'charCount': len(content),
                'isInMemory': True,
                'isJson': is_json,
                'metadata': metadata
            })
        
        logger.info(f"Found {len(file_details)} in-memory files")
        return {
            'success': True,
            'files': file_details
        }
    except Exception as e:
        logger.error(f"Error listing in-memory files: {str(e)}", exc_info=True)
        return {
            'success': False,
            'error': str(e),
            'files': []
        }

@app.get("/api/memory-files/{file_id}")
async def get_memory_file(file_id: str):
    """Get the content of a file stored in memory"""
    try:
        logger.info(f"Retrieving in-memory file: {file_id}")
        
        # Check if the file exists in memory
        for filename, file_data in in_memory_files.items():
            if filename.endswith(file_id) or os.path.basename(filename).startswith(file_id):
                content = file_data.get('content', '')
                logger.info(f"Found in-memory file: {filename}")
                return {
                    'success': True,
                    'content': content,
                    'metadata': file_data.get('metadata', {})
                }
        
        # If we get here, the file wasn't found
        logger.warning(f"In-memory file not found: {file_id}")
        return {
            'success': False,
            'error': f"File not found: {file_id}"
        }
    except Exception as e:
        logger.error(f"Error retrieving in-memory file: {str(e)}", exc_info=True)
        return {
            'success': False,
            'error': str(e)
        }

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
async def discover_endpoint(request: DiscoverRequest):
    """Discover pages related to the provided URL"""
    try:
        logger.info(f"Received discover request for URL: {request.url} with depth: {request.depth}")
        
        # Log environment variables for debugging
        logger.info(f"CRAWL4AI_URL: {os.environ.get('CRAWL4AI_URL', 'Not set')}")
        logger.info(f"CRAWL4AI_API_TOKEN: {'Set' if os.environ.get('CRAWL4AI_API_TOKEN') else 'Not set'}")
        
        # Check if Crawl4AI service is reachable
        try:
            crawl4ai_url = os.environ.get("CRAWL4AI_URL", "http://crawl4ai:11235")
            logger.info(f"Testing connection to Crawl4AI service at {crawl4ai_url}")
            
            # Try to ping the Crawl4AI service
            import socket
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(2)
            crawl4ai_host = crawl4ai_url.split('//')[1].split(':')[0]
            crawl4ai_port = int(crawl4ai_url.split(':')[-1])
            logger.info(f"Attempting to connect to {crawl4ai_host}:{crawl4ai_port}")
            result = s.connect_ex((crawl4ai_host, crawl4ai_port))
            s.close()
            
            if result == 0:
                logger.info(f"Successfully connected to Crawl4AI service at {crawl4ai_host}:{crawl4ai_port}")
            else:
                logger.error(f"Could not connect to Crawl4AI service at {crawl4ai_host}:{crawl4ai_port}, error code: {result}")
                # Continue anyway, as the discover_pages function will handle connection errors
        except Exception as conn_error:
            logger.error(f"Error checking Crawl4AI service connection: {str(conn_error)}")
            # Continue anyway, as the discover_pages function will handle connection errors
        
        # The root URL is the URL provided in the request
        root_url = request.url
        logger.info(f"Using root URL for consolidated files: {root_url}")
        
        # Call discover_pages with detailed logging
        logger.info(f"Calling discover_pages with URL: {request.url}, depth: {request.depth}, root_url: {root_url}")
        pages = await discover_pages(request.url, max_depth=request.depth, root_url=root_url)
        
        # Log the results
        if pages:
            logger.info(f"Successfully discovered {len(pages)} pages")
            for i, page in enumerate(pages[:5]):  # Log first 5 pages to avoid excessive logging
                logger.info(f"Discovered page {i+1}: {page.url} ({page.status})")
                if page.internalLinks:
                    logger.info(f"  Page {i+1} has {len(page.internalLinks)} internal links")
            if len(pages) > 5:
                logger.info(f"... and {len(pages) - 5} more pages")
        else:
            logger.warning("No pages discovered - this might indicate an issue with the crawler")
            
        # Always return a valid response, even if no pages were found
        response_data = {
            "pages": pages or [],  # Ensure we always return an array
            "message": f"Found {len(pages)} pages" if pages else "No pages discovered",
            "success": True
        }
        logger.info(f"Returning response with {len(response_data['pages'])} pages")
        return response_data
    except Exception as e:
        logger.error(f"Error discovering pages: {str(e)}", exc_info=True)
        
        # Log more detailed error information
        if isinstance(e, requests.exceptions.RequestException):
            logger.error(f"Request exception details: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response status: {e.response.status_code}")
                logger.error(f"Response body: {e.response.text[:500]}")
        
        # Return a structured error response
        error_response = {
            "pages": [],
            "message": f"Error discovering pages: {str(e)}",
            "success": False,
            "error": str(e),
            "error_type": type(e).__name__
        }
        logger.info(f"Returning error response: {error_response}")
        return error_response

@app.post("/api/crawl")
async def crawl_endpoint(request: CrawlRequest):
    """Crawl the provided pages and generate markdown content"""
    try:
        logger.info(f"Received crawl request for {len(request.pages)} pages")
        
        # Use the first page's URL as the root URL for consolidated file naming
        root_url = request.pages[0].url if request.pages else None
        logger.info(f"Using root URL for consolidated files: {root_url}")
        
        # Generate a consistent file ID based on the root URL
        if root_url:
            file_id = url_to_filename(root_url)
            logger.info(f"Generated file ID for consolidated content: {file_id}")
        else:
            file_id = None
            logger.warning("No root URL provided, consolidated file will not be created")
        
        result = await crawl_pages(request.pages, root_url=root_url)
        
        # Log the results
        logger.info(f"Successfully crawled pages. Stats: {result.stats}")
        
        # Add information about the consolidated file to the response
        consolidated_info = None
        if file_id:
            storage_file = f"storage/markdown/{file_id}.md"
            metadata_file = f"storage/markdown/{file_id}.json"
            
            if os.path.exists(storage_file) and os.path.exists(metadata_file):
                try:
                    with open(metadata_file, 'r') as f:
                        metadata = json.load(f)
                    
                    consolidated_info = {
                        "file_id": file_id,
                        "markdown_path": storage_file,
                        "metadata_path": metadata_file,
                        "pages_count": len(metadata.get("pages", [])),
                        "last_updated": metadata.get("last_updated")
                    }
                    logger.info(f"Consolidated file info: {consolidated_info}")
                except Exception as e:
                    logger.error(f"Error reading consolidated file metadata: {str(e)}")
        
        return {
            "markdown": result.markdown,
            "stats": result.stats.dict(),
            "success": True,
            "consolidated_file": consolidated_info
        }
    except Exception as e:
        logger.error(f"Error crawling pages: {str(e)}", exc_info=True)
        # Return a structured error response
        return {
            "markdown": "",
            "stats": {
                "subdomains_parsed": 0,
                "pages_crawled": 0,
                "data_extracted": "0 KB",
                "errors_encountered": 1
            },
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=24125,
        reload=True,
        log_level="info"
    )