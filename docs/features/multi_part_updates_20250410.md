# FEATURE: Multi-Part UI & Bug Fixes (2025-04-10)

**Requested:** 2025-04-10
**Status:** In Progress

## Description

This document tracks several related fixes and UI adjustments requested after resolving the initial "Discover" button and "Crawl Selected" bugs.

**Tasks:**

1.  **[In Progress] Fix MCP Settings Popover Error:**
    *   **Problem:** Popover fails with `net::ERR_NAME_NOT_RESOLVED` when fetching `/api/mcp/config` and `/api/mcp/status`.
    *   **Likely Cause:** The `useMCPInfo` hook is likely making direct calls using an internal backend URL instead of relative Next.js API paths.
    *   **Plan:** Delegate to `Code` mode to fix fetch calls in `hooks/useMCPInfo.ts`.
    *   **Status:** Pending Delegation

2.  **[Pending] Adjust Settings Button Placement:**
    *   **Request:** Move the "Settings" button inside the "Statistics" container, top-right corner.
    *   **Plan:** Delegate to `Code` mode to modify layout in `app/page.tsx`.
    *   **Status:** Not Started

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