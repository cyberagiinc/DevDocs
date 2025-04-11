# Task List: Fix Stale API Call in Frontend API Route (`/api/memory-files`)

**Feature:** Bug Fix - Stale API Call
**Status:** In Progress
**File:** `docs/bugs/fix_stale_api_call_task_list.md`

## Subtasks

1.  [X] **Verify Replacement Endpoint:**
    *   [X] Read `app/api/all-files/route.ts` to understand current data usage from the `/api/memory-files` call.
    *   [X] Read `backend/app/main.py` to confirm the existence and response structure of the `/api/storage` endpoint.
    *   [X] Determine if `/api/storage` is the correct replacement and if its data structure is compatible. *(Conclusion: No suitable replacement endpoint exists in the backend for listing all files.)*
2.  [X] **Propose Solutions:**
    *   [X] Option 1: Simple URL replacement in `fetch` call. *(Revised to: Remove fetch call entirely)*
    *   [X] Option 2: URL replacement and adjustment of subsequent data handling logic if structures differ. *(Revised to: Create new backend endpoint - Out of scope)*
    *   [X] Present options, pros/cons, and confidence score to the user.
3.  [X] **Get Expert Opinion:**
    *   [X] Switched to Expert Opinion mode.
    *   [X] Received feedback: Strongly recommended removing the fetch call (Option 1) as the most appropriate fix given the constraints and backend reality.
4.  [X] **Get User Approval for Final Plan:**
    *   [X] Presented Expert Opinion's recommendation (Option 1: Remove fetch call).
    *   [X] User approved Option 1.
5.  [ ] **Implement Approved Solution (Option 1):**
    *   [ ] Use `apply_diff` to remove lines 90-114 (fetch call, try/catch block, and processing logic) from `app/api/all-files/route.ts`.
    *   [ ] Add a comment explaining the removal due to the defunct backend endpoint.
6.  [ ] **Attempt Completion:**
    *   [ ] Use `attempt_completion` tool to report the fix.
7.  [ ] **Seal Task:**
    *   [ ] Get user confirmation that the fix is working correctly.
    *   [ ] Mark all subtasks and the main feature as complete.