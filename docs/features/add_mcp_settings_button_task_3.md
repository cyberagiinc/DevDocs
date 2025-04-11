# Feature: Add MCP Settings Button - Task 3: Create MCPSettingsPopover Component

This task focuses on creating the `MCPSettingsPopover.tsx` component based on the approved plan.

## Sub-Tasks

-   [ ] **3.1: Create File:** Create the file `components/MCPSettingsPopover.tsx`.
-   [ ] **3.2: Add Imports:** Import React, hooks (`useState`, `useCallback`), Shadcn UI components (`Popover`, `PopoverTrigger`, `PopoverContent`, `Button`, `ScrollArea`, `Loader2`, `AlertCircle`), the `useMCPInfo` hook, and necessary types (`MCPConfig`, `MCPStatus`).
-   [ ] **3.3: Define Component:** Define the `MCPSettingsPopover` functional component accepting `children`.
-   [ ] **3.4: Use Hook:** Integrate the `useMCPInfo` hook to get `configData`, `statusData`, `isLoading`, `error`, and `fetchMCPInfo`.
-   [ ] **3.5: Implement `onOpenChange` Handler:** Create a `useCallback` memoized handler for the `Popover`'s `onOpenChange` prop to fetch data when opened.
-   [ ] **3.6: Structure JSX:** Implement the JSX structure using `Popover`, `PopoverTrigger`, and `PopoverContent`.
-   [ ] **3.7: Implement Conditional Rendering:** Inside `PopoverContent`, add logic to display:
    -   Loading state (`Loader2`).
    -   Error state (`AlertCircle`, error message, Retry button).
    -   Success state (Status and Config data, using `ScrollArea` for config).
-   [ ] **3.8: Add Accessibility:** Include `aria-label` on `PopoverContent`.
-   [ ] **3.9: Verify Implementation:** Ensure all parts of the plan for this component are included in the file content.

## Status

-   Pending

## Notes

-   This component solely defines the popover; integration happens in Task 4.
-   Follows plan from `docs/features/add_mcp_settings_button_plan.md`.