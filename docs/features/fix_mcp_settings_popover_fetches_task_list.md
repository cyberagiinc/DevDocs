# Feature: Fix MCP Settings Popover Fetch Calls (Task 1)

**Task ID:** `fix_mcp_settings_popover_fetches_20250410`

**Status:** In Progress

**Description:** Correct the fetch calls within the `useMCPInfo` hook to use relative paths instead of absolute URLs, resolving `net::ERR_NAME_NOT_RESOLVED` errors when accessing `/api/mcp/config` and `/api/mcp/status`. This corresponds to Task 1 in `docs/features/multi_part_updates_20250410.md`.

**Subtasks:**

*   [X] 1. Create a markdown task list file for this feature. (`fix_mcp_settings_popover_fetches_task_list.md`)
*   [X] 2. Read the content of `hooks/useMCPInfo.ts`.
*   [X] 3. Identify fetch calls and any absolute URL definitions.
*   [X] 4. Prepare `apply_diff` block to use relative paths (`/api/mcp/config`, `/api/mcp/status`) and remove absolute URL usage.
*   [X] 5. Propose the solution and `apply_diff` block to the user.
*   [X] 6. Apply the changes using `apply_diff` upon user approval.
*   [ ] 7. Use `attempt_completion` to finalize the task.
*   [ ] 8. Mark task as complete and seal the file upon user confirmation.

**Files Involved:**

*   `hooks/useMCPInfo.ts`
*   `docs/features/fix_mcp_settings_popover_fetches_task_list.md` (This file)
*   `docs/features/multi_part_updates_20250410.md` (Master tracking file)