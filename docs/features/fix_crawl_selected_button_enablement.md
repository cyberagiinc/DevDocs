# Feature: Fix Crawl Selected Button Enablement

**Objective:** Correct the logic in `CrawlStatusMonitor.tsx` so the "Crawl Selected" button correctly enables *only* when at least one selected URL has the status 'pending_crawl' and disables otherwise or when a crawl is in progress.

**Tasks:**

1.  [x] **Analyze Code:** Read `components/CrawlStatusMonitor.tsx` to identify:
    *   State variable for selected URLs.
    *   State variable/prop for discovered pages and their statuses.
    *   Code calculating if any selected URL is pending (`isAnyPendingSelected` or equivalent).
    *   Code rendering the "Crawl Selected" button and setting its `disabled` prop.
2.  [x] **Propose Solutions:** Define alternative approaches to fix the calculation/update logic.
3.  [x] **Implement Fix:** Apply the chosen correction using `apply_diff`. (Applied `useMemo` with `Array.some` and correct dependencies).
4.  [ ] **Report:** Use `attempt_completion` with the required code snippets.
5.  [ ] **Seal Task:** (Requires user confirmation) Mark task as complete once the user verifies the fix.

**Status:** Fix Implemented