# FEATURE: Update MCP Configuration Display

**Goal:** Modify the backend API and frontend UI to accurately display the correct MCP server configuration (using `docker exec` / stdin/stdout) within a modal dialog, and adjust the UI layout for the statistics section.

**Status:** Completed

**Plan & Progress:**

1.  **Backend (`backend/app/main.py`):** ✅ Completed
    *   **Summary:** Modified the `/api/mcp/config` endpoint. Removed the old logic returning `{"host": "mcp", "port": 8765}`. Implemented logic to return the correct JSON structure representing the `docker exec` command, arguments, and allowed tools for the `fast-markdown` server, matching the configuration needed by external clients. Added a comment about future refactoring if more servers are needed.

2.  **Shared Types (`lib/types.ts`):** ✅ Completed
    *   **Summary:** Defined new TypeScript interfaces (`MCPServerConfig`, `MCPConfigResponse`) to accurately type the structure returned by the updated backend API endpoint, ensuring type safety in the frontend.

3.  **Frontend Component (`components/MCPSettingsPopover.tsx` -> `components/MCPConfigDialog.tsx`):** ✅ Completed
    *   **Summary:** Renamed file to `MCPConfigDialog.tsx`. Replaced Shadcn `Popover` components with `Dialog` components. Updated the component to use the new `MCPConfigResponse` type. Implemented conditional rendering to show loading state, error message, or fetched data. Added a `<pre>` tag to display the `configData` JSON. Fixed a bug in the `useEffect` hook that caused an infinite data fetching loop, ensuring data is fetched only when the dialog opens and data isn't already present.

4.  **Frontend Hook (`hooks/useMCPInfo.ts`):** ✅ Completed
    *   **Summary:** Updated the `fetchMCPInfo` function within the hook. Modified the expected response type for the `/api/mcp/config` call to use the new `MCPConfigResponse` interface. Ensured the hook correctly processes and returns the new data structure.

5.  **Frontend Page (`app/page.tsx`):** ✅ Completed
    *   Import and render the new `MCPConfigDialog` component. ✅ Completed
    *   Remove the old `MCPSettingsPopover` rendering logic. ✅ Completed
    *   Remove the outer "Statistics" title and the surrounding card `div`. ✅ Completed
    *   Create a new header `div` before `JobStatsSummary` using `flex justify-between items-center` to contain the implicit "Data" label (from `JobStatsSummary`) and the `<MCPConfigDialog>` trigger icon, aligning the icon to the right. ✅ Completed
    *   Comment out the old `<ConfigSettings />` component rendering (which included the old bottom-right icon). ✅ Completed

**History:**

*   **[Timestamp]**: Initial plan generated by Code mode.
*   **[Timestamp]**: Plan reviewed by Expert Opinion mode. Minor improvements suggested and incorporated.
*   **[Timestamp]**: Plan presented to user for approval.
*   **[Timestamp]**: Plan approved by user.
*   **[Timestamp]**: Implementation completed by Code mode (Backend, Types, Component Rename/Refactor, Hook, Page Import/Render).
*   **[Timestamp]**: User feedback indicates implementation failed: icon not moved, modal shows no data. Delegating to Debug mode.
*   **[Timestamp]**: Debug mode fixed data fetching logic in `MCPConfigDialog.tsx`.
*   **[Timestamp]**: User feedback shows data is fetched but modal UI stuck on "Loading...". Delegating back to Debug mode.
*   **[Timestamp]**: Debug mode fixed rendering logic (`useEffect` loop) in `MCPConfigDialog.tsx`.
*   **[Timestamp]**: User confirms modal content is now displaying correctly. Updated plan details.
*   **[Timestamp]**: User clarified desired icon location (next to "Data" label).
*   **[Timestamp]**: Applied changes to `app/page.tsx` to move `<MCPConfigDialog>` trigger and comment out `<ConfigSettings />`. Attempt 1 had partial failure.
*   **[Timestamp]**: Re-read `app/page.tsx` and applied corrected diff to remove "Statistics" title and place icon trigger in a new flex header before `JobStatsSummary`.
*   **[Timestamp]**: User feedback indicated icon placement still incorrect and requested removal of the outer statistics card.
*   **[Timestamp]**: Applied changes to `app/page.tsx` to remove the outer card `div` for the statistics section.