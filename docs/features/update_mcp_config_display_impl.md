# Feature: Update MCP Configuration Display Implementation

**Objective:** Implement the approved plan to update the backend API and frontend UI for displaying the correct MCP server configuration, replacing the popover with a dialog, and relocating the trigger.

**Tasks:**

-   [ ] **1. Backend API Update (`backend/app/main.py`)**
    -   [ ] Read `backend/app/main.py`.
    -   [ ] Modify the `/api/mcp/config` endpoint to return the new JSON structure.
    -   [ ] Add the comment about hardcoding.
    -   [ ] Apply changes using `apply_diff`.
-   [ ] **2. Shared Types Update (`lib/types.ts`)**
    -   [ ] Read `lib/types.ts`.
    -   [ ] Define `MCPConfigResponse` and `MCPServerConfig` interfaces.
    -   [ ] Apply changes using `apply_diff` or `write_to_file`.
-   [ ] **3. Frontend Component Rename & Refactor (`components/MCPSettingsPopover.tsx` -> `components/MCPConfigDialog.tsx`)**
    -   [ ] Rename file using `execute_command`: `mv components/MCPSettingsPopover.tsx components/MCPConfigDialog.tsx`.
    -   [ ] Read the renamed file `components/MCPConfigDialog.tsx`.
    -   [ ] Replace `Popover` components/imports with `Dialog` equivalents.
    -   [ ] Update component to use `MCPConfigResponse` type.
    -   [ ] Display config JSON in `<pre>` tag.
    -   [ ] Implement error handling display.
    -   [ ] Apply changes using `apply_diff` or `write_to_file`.
-   [ ] **4. Frontend Hook Update (`hooks/useMCPInfo.ts`)**
    -   [ ] Read `hooks/useMCPInfo.ts`.
    -   [ ] Update fetch function for `/api/mcp/config` to use `MCPConfigResponse` type.
    -   [ ] Adjust logic relying on the old structure.
    -   [ ] Apply changes using `apply_diff`.
-   [ ] **5. Frontend Page Update (`app/page.tsx`)**
    -   [ ] Read `app/page.tsx`.
    -   [ ] Update import from `MCPSettingsPopover` to `MCPConfigDialog`.
    -   [ ] Relocate the `DialogTrigger` inside the "Statistics" container near the `<h2>` title.
    -   [ ] Apply necessary styling changes for relocation (e.g., flexbox).
    -   [ ] Apply changes using `apply_diff`.
-   [ ] **6. Verification**
    -   [ ] Confirm all changes are implemented correctly.
    -   [ ] Verify the UI displays the dialog with the correct config and the trigger is in the new location.
-   [ ] **7. Completion**
    -   [ ] Use `attempt_completion` tool.
-   [ ] **8. Seal Task**
    -   [ ] Mark feature as complete and seal the task list upon user confirmation.