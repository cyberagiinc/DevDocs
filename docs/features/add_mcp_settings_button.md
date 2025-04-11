# Feature: Add MCP Settings Button and Display

**Objective:** Add a visible "Settings" button to the main UI (`app/page.tsx`) that, when clicked, displays the MCP server configuration and status fetched from `/api/mcp/config` and `/api/mcp/status` within a popover, incorporating best practices for data fetching, error handling, and accessibility.

**Plan:** `docs/features/add_mcp_settings_button_plan.md` (Approved)

## Tasks

-   [ ] **1. Define Types:**
    -   [ ] 1.1. Define TypeScript interfaces (`MCPConfig`, `MCPStatus`) for the expected API responses from `/api/mcp/config` and `/api/mcp/status` in `lib/types.ts`.
-   [ ] **2. Create Custom Hook (`useMCPInfo`):**
    -   [ ] 2.1. Create a new file `hooks/useMCPInfo.ts`.
    -   [ ] 2.2. Implement the hook to manage state for `configData` (type `MCPConfig | null`), `statusData` (type `MCPStatus | null`), `isLoading` (boolean), and `error` (type `Error | null`).
    -   [ ] 2.3. Implement a fetch function within the hook that:
        -   Sets `isLoading` to true.
        -   Fetches `/api/mcp/config` and `/api/mcp/status` concurrently using `Promise.all`.
        -   Uses the defined TypeScript types (`MCPConfig`, `MCPStatus`) for response handling.
        -   Updates `configData` and `statusData` on success.
        -   Handles errors, updating the `error` state. Differentiate between network errors and API errors if possible.
        -   Sets `isLoading` to false on completion (success or error).
    -   [ ] 2.4. Expose the state variables (`configData`, `statusData`, `isLoading`, `error`) and the fetch function (e.g., `fetchMCPInfo`) from the hook.
-   [ ] **3. Create Settings Popover Component (`MCPSettingsPopover.tsx`):**
    -   [ ] 3.1. Create the basic component structure using Shadcn UI `Popover`, `PopoverTrigger`, `PopoverContent`.
    -   [ ] 3.2. Use the `useMCPInfo` hook to get data, loading state, error state, and the fetch function.
    -   [ ] 3.3. Implement `onOpenChange` for the `Popover` to call `fetchMCPInfo` *only* when the popover is opening (`open === true`).
    -   [ ] 3.4. Display loading indicators (`isLoading`).
    -   [ ] 3.5. Implement enhanced error display:
        -   Show a clear error message based on the `error` state.
        -   Include a "Retry" button that calls `fetchMCPInfo` again.
        -   Consider using `useToast` (from `components/ui/use-toast`) to show non-blocking error notifications.
    -   [ ] 3.6. Display fetched configuration data (`configData`) clearly. Format JSON nicely (e.g., using `<pre><code>{JSON.stringify(configData, null, 2)}</code></pre>`). Use `ScrollArea` if content might overflow.
    -   [ ] 3.7. Display fetched status data (`statusData`) clearly. Reuse logic/styling from `components/MCPServerStatus.tsx` if applicable and sensible.
    -   [ ] 3.8. Implement Accessibility improvements:
        -   Add appropriate `aria-label` or `aria-labelledby` to the popover content.
        -   Ensure keyboard navigation works (trigger, content, close).
        -   Ensure focus is managed correctly (trapped within the popover when open, returned to trigger on close).
-   [ ] **4. Integrate Button and Popover Component:**
    -   [ ] 4.1. Import `MCPSettingsPopover` into `app/page.tsx`.
    -   [ ] 4.2. Add a Shadcn UI `Button` labeled "Settings" (or use an icon button) near `JobStatsSummary` or another suitable location in `app/page.tsx`.
    -   [ ] 4.3. Wrap the button with `<PopoverTrigger asChild>` and place the `<PopoverContent>` correctly within the `MCPSettingsPopover` structure.
-   [ ] **5. Styling and Refinement:**
    -   [ ] 5.1. Ensure the button's placement and style are consistent with the existing UI.
    -   [ ] 5.2. Verify the popover's appearance, content formatting (especially JSON), and responsiveness. Ensure content fits well or scrolls appropriately.
-   [ ] **6. Review and Testing:** (User Task)
    -   [ ] 6.1. Test button click functionality opens the popover.
    -   [ ] 6.2. Verify data is fetched *only* when the popover opens.
    -   [ ] 6.3. Verify correct display for both config and status data.
    -   [ ] 6.4. Test loading state indicator visibility.
    -   [ ] 6.5. Test error state:
        -   Verify error message display (e.g., by stopping the backend or mocking API failure).
        -   Verify the "Retry" button functionality.
        -   Verify toast notifications appear on error (if implemented).
    -   [ ] 6.6. Test popover dismissal (clicking outside, pressing Esc).
    -   [ ] 6.7. Test keyboard navigation and focus management.
    -   [ ] 6.8. Test responsiveness on different screen sizes (including mobile view if applicable using `useMobile` hook).
-   [ ] **7. Final Approval:** (User Task) Get user confirmation that the feature is implemented correctly and works as expected according to the revised plan.
-   [ ] **8. Seal Task:** Mark this feature as complete and seal all related tasks in the tracking file.