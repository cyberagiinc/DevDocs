# Feature: Fix Checkbox Disabling Logic in CrawlStatusMonitor

**Objective:** Correct the logic in `CrawlStatusMonitor.tsx` so that checkboxes for individual URLs are disabled *only* when that specific URL's crawl status is 'completed', while checkboxes for 'pending' URLs remain enabled. Ensure the main "Crawl" button is enabled only if at least one *pending* URL is selected.

**Tasks:**

1.  [x] **Create Task List:** Define the steps needed to fix the bug.
2.  [ ] **Analyze Component:** Read the contents of `components/CrawlStatusMonitor.tsx` to understand the current implementation.
3.  [ ] **Identify Faulty Logic:** Pinpoint the exact code causing the incorrect disabling of checkboxes and potentially the "Crawl" button enabling logic.
4.  [ ] **Propose Solutions:** Outline different ways to fix the logic.
5.  [ ] **Implement Fix:** Apply the chosen solution using `apply_diff`.
6.  [ ] **Verify Button Logic:** Ensure the "Crawl" button's enabled state correctly depends on selected *pending* URLs. (Will be checked during implementation).
7.  [ ] **Attempt Completion:** Report the fix completion.
8.  [ ] **Seal Task:** Mark the task as complete upon user confirmation.