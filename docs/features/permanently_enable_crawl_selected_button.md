# Feature: Permanently Enable "Crawl Selected" Button

**Objective:** Modify the `CrawlStatusMonitor.tsx` component to ensure the "Crawl Selected" button is always visible, regardless of the `canCrawl` state.

**Tasks:**

1.  [ ] **Locate Button:** Identify the JSX code for the "Crawl Selected" button in `components/CrawlStatusMonitor.tsx`.
2.  [ ] **Identify Condition:** Find the `canCrawl &&` conditional rendering logic wrapping the button.
3.  [ ] **Read File:** Use `read_file` to confirm the structure and line numbers.
4.  [ ] **Remove Condition:** Use `apply_diff` to remove the `canCrawl &&` wrapper.
5.  [ ] **Verify:** Ensure the button and its container `div` are rendered unconditionally.
6.  [ ] **Seal Task:** Mark task as complete after user confirmation.