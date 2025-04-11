# FEATURE: Multi-Part UI & Bug Fixes (2025-04-10)

**Requested:** 2025-04-10
**Status:** In Progress

## Description

This document tracks several related fixes and UI adjustments requested after resolving the initial "Discover" button and "Crawl Selected" bugs.

**Tasks:**

1.  **[DONE] Fix MCP Settings Popover Error:**
    *   **Problem:** Popover failed with `net::ERR_NAME_NOT_RESOLVED` and then `404 Not Found`.
    *   **Fix 1:** Updated `hooks/useMCPInfo.ts` to use relative paths (`/api/mcp/config`, `/api/mcp/status`).
    *   **Fix 2:** Created missing API routes `app/api/mcp/config/route.ts` and `app/api/mcp/status/route.ts` to proxy requests to the backend service.
    *   **Status:** Resolved

2.  **[In Progress] Adjust Settings Button Placement:**
    *   **Request:** Move the "Settings" button inside the "Statistics" container, top-right corner.
    *   **Plan:** Delegate to `Code` mode to modify layout in `app/page.tsx`.
    *   **Status:** Pending Delegation

3.  **[Pending] Fix URL Crawl Status Update:**
    *   **Problem:** URLs in the "Crawl Queue" UI do not update their status to "completed" after being crawled successfully.
    *   **Plan:** Delegate to `Debug` mode to diagnose (check backend status updates, frontend polling/rendering).
    *   **Status:** Not Started

4.  **[Pending] Verify Consolidated Files Browser:**
    *   **Request:** Ensure the component correctly polls and displays files from `storage/markdown`.
    *   **Plan:** Delegate to `Code` mode to review `components/ConsolidatedFiles.tsx` and its API interaction.
    *   **Status:** Not Started

5.  **[Pending] Consolidate Documentation:**
    *   **Request:** Combine documentation for all recent bug fixes and features into this master file.
    *   **Plan:** Update this file upon completion of all tasks.
    *   **Status:** Not Started

## Execution Log

-   (Log entries will be added here as steps are taken)

## Completion

-   (Details of the completed features/fixes will be added here)