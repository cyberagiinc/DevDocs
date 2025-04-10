# Feature: Fix Crawl Button Enablement and Checkbox Styling

## Objective
Correct two UI issues in `CrawlStatusMonitor.tsx`:
1.  Enable the "Crawl" button only when at least one *selectable* (pending) URL is checked.
2.  Ensure enabled checkboxes for pending URLs are visually distinct (e.g., white background) from disabled ones.

## Tasks

-   [ ] **Analyze `CrawlStatusMonitor.tsx`:** Read the component code to understand state management (`selectedUrls`, pending URLs), button disable logic, and checkbox styling.
-   [ ] **Propose Solutions:** Define options for fixing the button logic and checkbox styles.
-   [ ] **Implement Button Logic Fix:** Modify the `disabled` prop calculation for the "Crawl" button.
-   [ ] **Implement Checkbox Style Fix:** Adjust Tailwind CSS classes for enabled checkboxes in the pending URL list.
-   [ ] **Verify Fixes:** (Manual step after deployment/testing) Confirm the button enables correctly and checkboxes look distinct.
-   [ ] **Seal Task:** Mark this task list as complete once user confirms the fixes are working.

## Affected Files
-   `components/CrawlStatusMonitor.tsx`