# Task List: Modify Cancel Button Visibility Logic

**Feature:** Change the "Cancel Crawl" button visibility to be tied to the activation state of the "Crawl Selected" button, rather than the specific 'discovering' or 'crawling' overall status. The button should appear whenever "Crawl Selected" is active, but only be *enabled* when a crawl is actually in progress and cancellable.

**Status:** In Progress

**Subtasks:**

1.  [X] **Analyze Current Logic:** Reviewed the conditions for "Crawl Selected" button enablement (`selectedPendingCount > 0`) and "Cancel Crawl" button visibility/enablement (`overallStatus`, `jobId`, `isCancelling`) in `components/CrawlUrls.tsx`.
2.  [ ] **Update `showCancelButton` Logic:** Modify the `showCancelButton` variable calculation in `components/CrawlUrls.tsx`. Tie its visibility to the condition `selectedPendingCount > 0`.
3.  [ ] **Verify Cancel Button `disabled` State:** Confirm the "Cancel Crawl" button's `disabled` prop correctly reflects whether a crawl is actually in progress and cancellable (i.e., check for `jobId` and appropriate `overallStatus` like 'discovering', 'crawling'). *No change needed here based on current analysis.*
4.  [ ] **Apply Changes:** Use `apply_diff` to implement the logic change for `showCancelButton`.
5.  [ ] **Testing:** User to test the UI to confirm the "Cancel Crawl" button appears alongside the "Crawl Selected" button when URLs are selected, and that it becomes enabled/disabled correctly based on the actual crawl state.
6.  [ ] **(Optional) Remove Debug Logs:** If this change works, remove the `console.log` statements related to the cancel button status.
7.  [ ] **Seal Task:** Mark this task as complete upon user confirmation.