# Task List: Fix MCP Docker Build Error (Missing Readme)

This plan outlines the steps to resolve the Docker build failure for the `mcp` service caused by a missing readme file specified in `fast-markdown-mcp/pyproject.toml`.

## Feature: MCP Build Configuration Fix

### Task 1: Identify Cause
- **Goal:** Determine why the `pip install -e .` command fails during the `mcp` service build.
- **Action:** Analyze build logs.
- **Result:** Error `OSError: Readme file does not exist: README_MCP.md` indicates `pyproject.toml` points to a non-existent file.
- **Status:** Done

### Task 2: Analyze `pyproject.toml` and Directory Contents
- **Goal:** Confirm the `readme` field setting and check for the actual file.
- **Action:** Read `fast-markdown-mcp/pyproject.toml` and list files in `fast-markdown-mcp/`.
- **Result:** `pyproject.toml` specifies `readme = "README_MCP.md"`, but the file is missing from the directory.
- **Status:** Done

### Task 3: Apply Fix
- **Goal:** Correct the `pyproject.toml` configuration.
- **Action:** Remove the optional `readme = "README_MCP.md"` line from `fast-markdown-mcp/pyproject.toml`.
- **Status:** Pending

### Task 4: Verify Fix
- **Goal:** Confirm the Docker build for the `mcp` service now succeeds.
- **Action:** Instruct the user to re-run the Docker build process (e.g., `./docker-start.sh` or `docker-compose build mcp`).
- **Status:** Pending