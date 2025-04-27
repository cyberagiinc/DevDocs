# Feature: Implement Frontend HTTP Status Code Display

**Phase:** 2, Part 3

**Objective:** Modify the `CrawlUrls` component to display the numerical HTTP status code alongside the descriptive status for each crawled URL.

**Context:**
*   This follows the approved plan in `docs/features/display_http_status_code_plan.md`.
*   Backend changes (adding `statusCode` to data) are complete.
*   Shared type `UrlDetails` in `lib/types.ts` has been updated.

**Tasks:**

1.  [ ] **Analyze `components/CrawlUrls.tsx`:**
    *   Read the component file to understand the current structure for displaying URL data, particularly the status.
    *   Identify the `<TableHeader>` and `<TableBody>` sections.
    *   Locate the mapping function that renders each URL row.
    *   Verify how `urls[url].status` (descriptive status) is currently used (e.g., for badges, tooltips, filtering).
2.  [ ] **Propose Implementation Options:**
    *   **Option 1:** Direct modification of the existing table structure.
    *   **Option 2:** Refactor row rendering into a sub-component (consider if necessary).
    *   Evaluate pros/cons based on KISS, DRY, YAGNI principles.
3.  [ ] **Get User Approval:**
    *   Present options and confidence score.
    *   Confirm the chosen approach with the user.
4.  [ ] **Implement Changes in `components/CrawlUrls.tsx`:**
    *   Add a new `<TableHead>` for the "Code" or "Status Code" column.
    *   Modify the row rendering logic within the `.map()` function:
        *   Add a new `<TableCell>` to display `urls[url].statusCode`.
        *   Implement conditional rendering to show '-' or 'N/A' if `statusCode` is `null` or `undefined`.
        *   Ensure existing logic using `urls[url].status` (descriptive) remains unchanged.
        *   Verify derived state calculations (`pendingUrls`, `selectedPendingCount`, etc.) still correctly use `urls[url].status`.
5.  [ ] **Verify Implementation:**
    *   Mentally review the changes against the requirements.
    *   (Optional: If a local dev environment is running, visually inspect the changes).
6.  [ ] **Attempt Completion:**
    *   Use the `attempt_completion` tool to summarize the changes made.
7.  [ ] **Seal Task (Upon User Confirmation):**
    *   Mark all tasks as complete once the user confirms the feature works as expected.