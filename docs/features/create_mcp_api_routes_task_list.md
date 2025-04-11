# Feature: Create Missing MCP API Routes

**Task ID:** `create_mcp_api_routes`
**Parent Task:** `fix_mcp_settings_popover_fetches` (from `docs/features/multi_part_updates_20250410.md` - Task 1)
**Status:** To Do

## Description

Create the missing Next.js API routes (`/api/mcp/config` and `/api/mcp/status`) required by the MCP Settings popover in the frontend. These routes will proxy requests to the corresponding backend endpoints.

## Subtasks

1.  [ ] **Create Config Route (`/api/mcp/config/route.ts`)**
    *   Define `INTERNAL_BACKEND_URL`.
    *   Implement `GET` handler.
    *   Proxy request to `${INTERNAL_BACKEND_URL}/api/mcp/config`.
    *   Include logging for request start and success/failure.
    *   Implement error handling using `try...catch`.
    *   Return backend response using `NextResponse.json()`.
    *   Return appropriate error response (e.g., 500) on failure.
2.  [ ] **Create Status Route (`/api/mcp/status/route.ts`)**
    *   Define `INTERNAL_BACKEND_URL`.
    *   Implement `GET` handler.
    *   Proxy request to `${INTERNAL_BACKEND_URL}/api/mcp/status`.
    *   Include logging for request start and success/failure.
    *   Implement error handling using `try...catch`.
    *   Return backend response using `NextResponse.json()`.
    *   Return appropriate error response (e.g., 500) on failure.
3.  [ ] **Seal Task:** Mark this task list as complete upon user confirmation.

## Files to Create

*   `docs/features/create_mcp_api_routes_task_list.md`
*   `app/api/mcp/config/route.ts`
*   `app/api/mcp/status/route.ts`

## Status Log

*   **[Timestamp]** - Task initiated.