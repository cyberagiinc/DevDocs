#!/usr/bin/env python3
import sys
import logging
import signal
import json
import re
import asyncio
import math
from pathlib import Path
from typing import Optional, Dict, List, Tuple, Any
import mcp.types as types
from mcp.server import Server
from mcp.server.stdio import stdio_server
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from difflib import SequenceMatcher

logger = logging.getLogger(__name__)

from .document_structure import DocumentStructure, Section

class MarkdownStore:
    """Manages markdown content and metadata."""
    
    def __init__(self, storage_path: str):
        self.base_path = Path(storage_path)
        self.content_cache = {}
        self.metadata_cache = {}
        self.structure_cache = {}  # Cache for parsed document structures
        
    def _calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate text similarity using SequenceMatcher."""
        return SequenceMatcher(None, text1.lower(), text2.lower()).ratio()
    
    def _calculate_confidence(self, similarity: float, match_type: str) -> float:
        """Calculate confidence score based on similarity and match type."""
        # Base confidence from similarity score
        confidence = similarity
        
        # Adjust based on match type
        if match_type == "exact":
            confidence = min(1.0, confidence * 1.2)  # Boost exact matches
        elif match_type == "fuzzy":
            confidence = confidence * 0.9  # Slightly reduce fuzzy matches
        elif match_type == "regex":
            confidence = confidence * 0.95  # Slightly reduce regex matches
            
        return round(confidence, 2)
        
    async def sync_all_files(self):
        """Initial sync of all files in the storage directory."""
        logger.info("Starting initial sync of all files...")
        try:
            for md_file in self.base_path.glob("*.md"):
                file_id = md_file.stem
                await self.sync_file(file_id)
            logger.info("Initial sync completed successfully")
        except Exception as e:
            logger.error(f"Error during initial sync: {e}")
            raise
        
    async def get_content(self, file_id: str) -> str:
        """Get markdown content."""
        file_path = self.base_path / f"{file_id}.md"
        try:
            content = file_path.read_text(encoding='utf-8')
            # Parse and cache document structure
            if file_id not in self.structure_cache:
                structure = DocumentStructure()
                structure.parse_document(content)
                self.structure_cache[file_id] = structure
            return content
        except Exception as e:
            logger.error(f"Error reading content for {file_id}: {e}")
            return f"Error reading content: {str(e)}"

    async def get_section(self, file_id: str, section_id: str) -> str:
        """Get a specific section from a markdown file."""
        try:
            if file_id not in self.structure_cache:
                await self.get_content(file_id)  # This will parse and cache the structure
            
            structure = self.structure_cache[file_id]
            section = structure.get_section_by_id(section_id)
            
            if not section:
                return f"Section '{section_id}' not found in {file_id}"
                
            return f"Section: {section.title}\n\n{section.content}"
        except Exception as e:
            logger.error(f"Error getting section {section_id} from {file_id}: {e}")
            return f"Error getting section: {str(e)}"

    async def get_table_of_contents(self, file_id: str) -> str:
        """Get table of contents for a markdown file."""
        try:
            if file_id not in self.structure_cache:
                await self.get_content(file_id)  # This will parse and cache the structure
            
            structure = self.structure_cache[file_id]
            toc = structure.get_table_of_contents()
            
            result = [f"Table of Contents for {file_id}:"]
            for level, title, section_id in toc:
                indent = "  " * level
                result.append(f"{indent}- {title} [{section_id}]")
            
            return "\n".join(result)
        except Exception as e:
            logger.error(f"Error getting table of contents for {file_id}: {e}")
            return f"Error getting table of contents: {str(e)}"
        
    async def get_metadata(self, file_id: str) -> dict:
        """Get metadata as a dictionary."""
        file_path = self.base_path / f"{file_id}.json"
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error reading metadata for {file_id}: {e}")
            return {}
        
    async def get_index(self) -> str:
        """Get list of available files."""
        try:
            files = []
            for md_file in self.base_path.glob("*.md"):
                files.append(md_file.stem)
            return "\n".join(files)
        except Exception as e:
            logger.error(f"Error getting index: {e}")
            return f"Error getting index: {str(e)}"
        
    async def sync_file(self, file_id: str) -> str:
        """Force sync a file."""
        try:
            # Clear caches for this file
            self.content_cache.pop(file_id, None)
            self.metadata_cache.pop(file_id, None)
            self.structure_cache.pop(file_id, None)
            
            # Reload content and metadata
            content = await self.get_content(file_id)
            metadata = await self.get_metadata(file_id)
            self.content_cache[file_id] = content
            self.metadata_cache[file_id] = metadata
            logger.info(f"Successfully synced {file_id}")
            return f"Successfully synced {file_id}"
        except Exception as e:
            logger.error(f"Error syncing {file_id}: {e}")
            return f"Error syncing file: {str(e)}"

    async def list_files(self) -> str:
        """List all available markdown files."""
        try:
            files = []
            for md_file in self.base_path.glob("*.md"):
                files.append(f"- {md_file.stem}")
            if not files:
                return "No markdown files found"
            return "Available markdown files:\n" + "\n".join(files)
        except Exception as e:
            logger.error(f"Error listing files: {e}")
            return f"Error listing files: {str(e)}"

    async def read_file(self, file_id: str) -> str:
        """Read and return the content of a markdown file."""
        try:
            content = await self.get_content(file_id)
            metadata = await self.get_metadata(file_id)
            return f"""Content of {file_id}.md:

{content}

Metadata:
- Last modified: {metadata.get('timestamp', 'Unknown')}
- Word count: {metadata.get('stats', {}).get('wordCount', 'Unknown')}
- Character count: {metadata.get('stats', {}).get('charCount', 'Unknown')}
"""
        except Exception as e:
            logger.error(f"Error reading file {file_id}: {e}")
            return f"Error reading file: {str(e)}"

    async def search_files(self, query: str) -> str:
        """Search content across all markdown files."""
        try:
            results = []
            for md_file in self.base_path.glob("*.md"):
                file_id = md_file.stem
                content = await self.get_content(file_id)
                metadata = await self.get_metadata(file_id)
                
                if query.lower() in content.lower():
                    # Find the context around the match
                    lines = content.split('\n')
                    for i, line in enumerate(lines):
                        if query.lower() in line.lower():
                            context_start = max(0, i - 2)
                            context_end = min(len(lines), i + 3)
                            context = '\n'.join(lines[context_start:context_end])
                            
                            results.append(f"""Match in {file_id}.md:
Context:
{context}
---""")
            
            if not results:
                return f"No matches found for query: {query}"
            return "\n\n".join(results)
        except Exception as e:
            logger.error(f"Error searching files: {e}")
            return f"Error searching files: {str(e)}"
            
    async def smart_section_search(self, query: str, max_results: int = 10,
                                  use_fuzzy: bool = True, use_regex: bool = True) -> str:
        """
        Advanced search for sections across all markdown files with ranking and confidence scores.
        
        Args:
            query: The search query
            max_results: Maximum number of results to return
            use_fuzzy: Whether to use fuzzy matching
            use_regex: Whether to use regex matching
            
        Returns:
            Formatted search results with rankings, confidence scores, and citations
        """
        try:
            all_matches = []
            
            # Process all markdown files
            for md_file in self.base_path.glob("*.md"):
                file_id = md_file.stem
                
                # Ensure the document structure is loaded
                if file_id not in self.structure_cache:
                    await self.get_content(file_id)
                
                structure = self.structure_cache[file_id]
                
                # Get all sections from the document
                sections = []
                
                def collect_sections(section_list):
                    for section in section_list:
                        sections.append(section)
                        collect_sections(section.subsections)
                
                collect_sections(structure.sections)
                
                # Search through each section
                for section in sections:
                    matches = []
                    
                    # Exact match in title
                    if query.lower() in section.title.lower():
                        similarity = self._calculate_similarity(query, section.title)
                        confidence = self._calculate_confidence(similarity, "exact")
                        matches.append({
                            "match_type": "exact_title",
                            "similarity": similarity,
                            "confidence": confidence,
                            "score": confidence * 1.2  # Boost title matches
                        })
                    
                    # Exact match in content
                    if query.lower() in section.content.lower():
                        similarity = self._calculate_similarity(query,
                                                              section.content[:min(len(section.content),
                                                                                 len(query) * 10)])
                        confidence = self._calculate_confidence(similarity, "exact")
                        matches.append({
                            "match_type": "exact_content",
                            "similarity": similarity,
                            "confidence": confidence,
                            "score": confidence
                        })
                    
                    # Fuzzy match
                    if use_fuzzy:
                        # Fuzzy match in title
                        title_similarity = self._calculate_similarity(query, section.title)
                        if title_similarity > 0.6:  # Threshold for fuzzy matches
                            confidence = self._calculate_confidence(title_similarity, "fuzzy")
                            matches.append({
                                "match_type": "fuzzy_title",
                                "similarity": title_similarity,
                                "confidence": confidence,
                                "score": confidence * 1.1  # Slightly boost title matches
                            })
                        
                        # Fuzzy match in content (first 1000 chars to avoid performance issues)
                        content_sample = section.content[:min(len(section.content), 1000)]
                        # Split content into chunks to find best matching segment
                        chunks = [content_sample[i:i+len(query)*3]
                                 for i in range(0, len(content_sample), len(query)*2)
                                 if i+len(query)*3 <= len(content_sample)]
                        
                        if chunks:
                            best_chunk_similarity = max(self._calculate_similarity(query, chunk)
                                                      for chunk in chunks)
                            if best_chunk_similarity > 0.6:
                                confidence = self._calculate_confidence(best_chunk_similarity, "fuzzy")
                                matches.append({
                                    "match_type": "fuzzy_content",
                                    "similarity": best_chunk_similarity,
                                    "confidence": confidence,
                                    "score": confidence
                                })
                    
                    # Regex match
                    if use_regex:
                        try:
                            pattern = re.compile(query, re.IGNORECASE)
                            
                            # Regex match in title
                            if pattern.search(section.title):
                                # Calculate how much of the title matches the pattern
                                match_length = sum(len(m.group(0)) for m in pattern.finditer(section.title))
                                similarity = match_length / len(section.title)
                                confidence = self._calculate_confidence(similarity, "regex")
                                matches.append({
                                    "match_type": "regex_title",
                                    "similarity": similarity,
                                    "confidence": confidence,
                                    "score": confidence * 1.1  # Slightly boost title matches
                                })
                            
                            # Regex match in content
                            if pattern.search(section.content):
                                # Calculate how much of the content matches the pattern
                                match_length = sum(len(m.group(0)) for m in pattern.finditer(section.content[:1000]))
                                similarity = match_length / min(len(section.content), 1000)
                                confidence = self._calculate_confidence(similarity, "regex")
                                matches.append({
                                    "match_type": "regex_content",
                                    "similarity": similarity,
                                    "confidence": confidence,
                                    "score": confidence
                                })
                        except re.error:
                            # If the query isn't a valid regex, just skip regex matching
                            pass
                    
                    # If we have any matches, add this section to the results
                    if matches:
                        # Get the best match
                        best_match = max(matches, key=lambda x: x["score"])
                        
                        # Extract a relevant snippet from the content
                        snippet = section.content
                        if len(snippet) > 300:
                            # Try to find the query in the content
                            query_pos = section.content.lower().find(query.lower())
                            if query_pos >= 0:
                                # Extract content around the query
                                start = max(0, query_pos - 100)
                                end = min(len(section.content), query_pos + len(query) + 100)
                                snippet = "..." + section.content[start:end] + "..."
                            else:
                                # Just take the first part of the content
                                snippet = section.content[:300] + "..."
                        
                        # Create a section ID if needed
                        section_id = structure._make_section_id(section.title)
                        
                        all_matches.append({
                            "file_id": file_id,
                            "section_title": section.title,
                            "section_id": section_id,
                            "snippet": snippet,
                            "match_type": best_match["match_type"],
                            "confidence": best_match["confidence"],
                            "score": best_match["score"]
                        })
            
            # Sort results by score (descending)
            all_matches.sort(key=lambda x: x["score"], reverse=True)
            
            # Limit to max_results
            all_matches = all_matches[:max_results]
            
            # Format results
            if not all_matches:
                return f"No matches found for query: {query}"
            
            results = [f"# Smart Section Search Results for: '{query}'"]
            
            for i, match in enumerate(all_matches, 1):
                confidence_percent = int(match["confidence"] * 100)
                match_type_display = match["match_type"].replace("_", " ").title()
                
                results.append(f"""
## Result {i} - {match["section_title"]} (Confidence: {confidence_percent}%)

**File:** {match["file_id"]}.md
**Section:** {match["section_title"]}
**Match Type:** {match_type_display}
**Confidence:** {confidence_percent}%

**Snippet:**
{match["snippet"]}

**Citation:** `{match["file_id"]}#{match["section_id"]}`

---""")
            
            return "\n".join(results)
        except Exception as e:
            logger.error(f"Error in smart section search: {e}")
            return f"Error performing smart section search: {str(e)}"

    async def search_by_tag(self, tag: str) -> str:
        """Search files by metadata tags."""
        try:
            results = []
            for json_file in self.base_path.glob("*.json"):
                file_id = json_file.stem
                metadata = await self.get_metadata(file_id)
                
                # Check both metadata.tags and top-level tags
                tags = metadata.get('metadata', {}).get('tags', []) + metadata.get('tags', [])
                
                if tag.lower() in [t.lower() for t in tags]:
                    results.append(f"""File: {file_id}.md
Tags: {', '.join(tags)}
Last modified: {metadata.get('timestamp', 'Unknown')}
---""")
            
            if not results:
                return f"No files found with tag: {tag}"
            return "\n\n".join(results)
        except Exception as e:
            logger.error(f"Error searching by tag: {e}")
            return f"Error searching by tag: {str(e)}"

    async def get_stats(self) -> str:
        """Get statistics about all markdown files."""
        try:
            total_files = 0
            total_words = 0
            total_chars = 0
            files_by_month = {}
            all_tags = set()
            
            for json_file in self.base_path.glob("*.json"):
                file_id = json_file.stem
                metadata = await self.get_metadata(file_id)
                
                total_files += 1
                total_words += metadata.get('stats', {}).get('wordCount', 0)
                total_chars += metadata.get('stats', {}).get('charCount', 0)
                
                # Extract month from timestamp
                timestamp = metadata.get('timestamp', '')
                if timestamp:
                    month = timestamp[:7]  # YYYY-MM
                    files_by_month[month] = files_by_month.get(month, 0) + 1
                
                # Collect all tags
                tags = metadata.get('metadata', {}).get('tags', []) + metadata.get('tags', [])
                all_tags.update(tags)
            
            stats = f"""Markdown Files Statistics:

Total Files: {total_files}
Total Words: {total_words}
Total Characters: {total_chars}

Files by Month:
{chr(10).join(f'- {month}: {count} files' for month, count in sorted(files_by_month.items()))}

All Tags:
{chr(10).join(f'- {tag}' for tag in sorted(all_tags))}
"""
            return stats
        except Exception as e:
            logger.error(f"Error getting stats: {e}")
            return f"Error getting statistics: {str(e)}"

class MarkdownEventHandler(FileSystemEventHandler):
    """Handles file system events for markdown files."""
    
    def __init__(self, store: MarkdownStore, loop: asyncio.AbstractEventLoop):
        self.store = store
        self.loop = loop
        
    def sync_file(self, path: str):
        """Sync a file when it's created or modified."""
        if path.endswith(('.md', '.json')):
            file_id = Path(path).stem
            asyncio.run_coroutine_threadsafe(
                self.store.sync_file(file_id),
                self.loop
            )
            
    def on_created(self, event):
        """Handle file creation."""
        if not event.is_directory:
            self.sync_file(event.src_path)
            
    def on_modified(self, event):
        """Handle file modification."""
        if not event.is_directory:
            self.sync_file(event.src_path)

class FastMarkdownServer:
    """MCP server for markdown content management."""
    
    def __init__(self, storage_path: str):
        self.server = Server("fast-markdown", version="1.0.0")  # Set default version
        self.store = MarkdownStore(storage_path)
        self.loop = asyncio.get_event_loop()
        self.event_handler = MarkdownEventHandler(self.store, self.loop)
        self.observer = Observer()
        self.observer.schedule(self.event_handler, storage_path, recursive=False)
        self.setup_handlers()
        
    def setup_handlers(self):
        """Set up request handlers."""
        @self.server.list_resources()
        async def list_resources() -> list[types.Resource]:
            """List available resources."""
            files = []
            for md_file in self.store.base_path.glob("*.md"):
                file_id = md_file.stem
                files.append(
                    types.Resource(
                        uri=f"markdown://{file_id}/content",
                        name=f"Markdown content for {file_id}",
                        mimeType="text/markdown"
                    )
                )
            return files

        @self.server.read_resource()
        async def read_resource(uri: str) -> str:
            """Read resource content."""
            if not uri.startswith("markdown://"):
                raise ValueError(f"Invalid resource URI: {uri}")
            
            parts = uri.split("/")
            if len(parts) != 4 or parts[3] not in ["content", "metadata"]:
                raise ValueError(f"Invalid resource URI format: {uri}")
            
            file_id = parts[2]
            resource_type = parts[3]
            
            if resource_type == "content":
                return await self.store.get_content(file_id)
            else:
                return json.dumps(await self.store.get_metadata(file_id), indent=2)

        @self.server.list_tools()
        async def list_tools() -> list[types.Tool]:
            """List available tools."""
            return [
                types.Tool(
                    name="sync_file",
                    description="Force sync a specific file",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "file_id": {
                                "type": "string",
                                "description": "ID of the file to sync (without .md extension)"
                            }
                        },
                        "required": ["file_id"]
                    }
                ),
                types.Tool(
                    name="get_status",
                    description="Get server status",
                    inputSchema={
                        "type": "object",
                        "properties": {}
                    }
                ),
                types.Tool(
                    name="list_files",
                    description="List all available markdown files",
                    inputSchema={
                        "type": "object",
                        "properties": {}
                    }
                ),
                types.Tool(
                    name="read_file",
                    description="Read the content of a markdown file",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "file_id": {
                                "type": "string",
                                "description": "ID of the file to read (without .md extension)"
                            }
                        },
                        "required": ["file_id"]
                    }
                ),
                types.Tool(
                    name="search_files",
                    description="Search content across all markdown files",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "Search query to find in markdown content"
                            }
                        },
                        "required": ["query"]
                    }
                ),
                types.Tool(
                    name="search_by_tag",
                    description="Search files by metadata tags",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "tag": {
                                "type": "string",
                                "description": "Tag to search for in file metadata"
                            }
                        },
                        "required": ["tag"]
                    }
                ),
                types.Tool(
                    name="get_stats",
                    description="Get statistics about all markdown files",
                    inputSchema={
                        "type": "object",
                        "properties": {}
                    }
                ),
                types.Tool(
                    name="get_section",
                    description="Get a specific section from a markdown file",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "file_id": {
                                "type": "string",
                                "description": "ID of the file (without .md extension)"
                            },
                            "section_id": {
                                "type": "string",
                                "description": "ID of the section to retrieve"
                            }
                        },
                        "required": ["file_id", "section_id"]
                    }
                ),
                types.Tool(
                    name="get_table_of_contents",
                    description="Get table of contents for a markdown file",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "file_id": {
                                "type": "string",
                                "description": "ID of the file (without .md extension)"
                            }
                        },
                        "required": ["file_id"]
                    }
                ),
                types.Tool(
                    name="smart_section_search",
                    description="Advanced search for sections with ranking and confidence scores",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "Search query to find in sections"
                            },
                            "max_results": {
                                "type": "number",
                                "description": "Maximum number of results to return (default: 10)"
                            },
                            "use_fuzzy": {
                                "type": "boolean",
                                "description": "Whether to use fuzzy matching (default: true)"
                            },
                            "use_regex": {
                                "type": "boolean",
                                "description": "Whether to use regex matching (default: true)"
                            }
                        },
                        "required": ["query"]
                    }
                )
            ]

        @self.server.call_tool()
        async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:
            """Execute tool."""
            if name == "sync_file":
                file_id = arguments.get("file_id")
                if not file_id:
                    raise ValueError("file_id is required")
                result = await self.store.sync_file(file_id)
                return [types.TextContent(type="text", text=result)]
            elif name == "get_status":
                return [types.TextContent(type="text", text="Server is running and monitoring markdown files")]
            elif name == "list_files":
                result = await self.store.list_files()
                return [types.TextContent(type="text", text=result)]
            elif name == "read_file":
                file_id = arguments.get("file_id")
                if not file_id:
                    raise ValueError("file_id is required")
                result = await self.store.read_file(file_id)
                return [types.TextContent(type="text", text=result)]
            elif name == "search_files":
                query = arguments.get("query")
                if not query:
                    raise ValueError("query is required")
                result = await self.store.search_files(query)
                return [types.TextContent(type="text", text=result)]
            elif name == "search_by_tag":
                tag = arguments.get("tag")
                if not tag:
                    raise ValueError("tag is required")
                result = await self.store.search_by_tag(tag)
                return [types.TextContent(type="text", text=result)]
            elif name == "get_stats":
                result = await self.store.get_stats()
                return [types.TextContent(type="text", text=result)]
            elif name == "get_section":
                file_id = arguments.get("file_id")
                section_id = arguments.get("section_id")
                if not file_id or not section_id:
                    raise ValueError("file_id and section_id are required")
                result = await self.store.get_section(file_id, section_id)
                return [types.TextContent(type="text", text=result)]
            elif name == "get_table_of_contents":
                file_id = arguments.get("file_id")
                if not file_id:
                    raise ValueError("file_id is required")
                result = await self.store.get_table_of_contents(file_id)
                return [types.TextContent(type="text", text=result)]
            elif name == "smart_section_search":
                query = arguments.get("query")
                if not query:
                    raise ValueError("query is required")
                
                # Get optional parameters with defaults
                max_results = arguments.get("max_results", 10)
                use_fuzzy = arguments.get("use_fuzzy", True)
                use_regex = arguments.get("use_regex", True)
                
                # Ensure max_results is an integer
                try:
                    max_results = int(max_results)
                except (ValueError, TypeError):
                    max_results = 10
                
                # Ensure boolean parameters are actually booleans
                use_fuzzy = bool(use_fuzzy)
                use_regex = bool(use_regex)
                
                result = await self.store.smart_section_search(
                    query,
                    max_results=max_results,
                    use_fuzzy=use_fuzzy,
                    use_regex=use_regex
                )
                return [types.TextContent(type="text", text=result)]
            else:
                raise ValueError(f"Unknown tool: {name}")

    async def run(self):
        """Run the server."""
        logger.info("Starting server...")
        # Start the file observer
        self.observer.start()
        
        # Initial sync of all files
        await self.store.sync_all_files()
        
        try:
            # Keep the server running
            while True:
                try:
                    async with stdio_server() as streams:
                        await self.server.run(
                            streams[0],
                            streams[1],
                            self.server.create_initialization_options()
                        )
                except Exception as e:
                    logger.error(f"Server error: {e}")
                    # Wait before retrying
                    await asyncio.sleep(1)
        finally:
            self.observer.stop()
            self.observer.join()
            logger.info("Server shutdown complete")

def setup_logging():
    """Configure logging."""
    # Get the project root directory
    root_dir = Path(__file__).parents[3].resolve()
    log_dir = root_dir / "logs"
    log_dir.mkdir(exist_ok=True)
    
    # Use absolute path for log file
    log_path = log_dir / "mcp.log"
    
    # Configure file handler for all logs
    file_handler = logging.FileHandler(str(log_path))
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
    
    # Configure console handler with higher log level to reduce noise
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.WARNING)  # Only show WARNING and above in console
    console_handler.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))
    
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    root_logger.addHandler(file_handler)
    root_logger.addHandler(console_handler)
    
    # Specifically set higher log level for MCP SDK's internal logging
    mcp_logger = logging.getLogger('mcp.server.lowlevel')
    mcp_logger.setLevel(logging.WARNING)

def handle_sigterm(signum, frame):
    """Handle SIGTERM signal."""
    logger.info("Received shutdown signal")
    sys.exit(0)

async def main() -> None:
    """Main entry point."""
    if len(sys.argv) != 2:
        print("Usage: fast-markdown-mcp <storage_path>")
        sys.exit(1)
    
    setup_logging()
    signal.signal(signal.SIGTERM, handle_sigterm)
    storage_path = sys.argv[1]
    
    try:
        server = FastMarkdownServer(storage_path)
        logger.info(f"Starting server with storage path: {storage_path}")
        await server.run()
    except KeyboardInterrupt:
        logger.info("Server shutdown requested")
    except Exception as e:
        logger.error(f"Server error: {e}")
        raise
    finally:
        logger.info("Server shutdown complete")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())