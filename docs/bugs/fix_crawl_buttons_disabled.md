# BUG: Crawl Selected / Cancel Crawl Buttons Incorrectly Disabled

**Issue:** The "Crawl Selected" and "Cancel Crawl" buttons in the Crawl Queue UI remain disabled even when URLs are selected via checkboxes.

**Observed Behavior:** (See user-provided image) Checkboxes are selected, but buttons are greyed out/disabled.

**Expected Behavior:**
*   "Crawl Selected" button should be enabled when at least one URL with status 'pending_crawl' is selected.
*   "Cancel Crawl" button should be enabled when a crawl job is currently running (`isCrawling` is true). (Need to verify exact condition).

**Affected Component:** `components/CrawlUrls.tsx`

**Subtasks:**
1.  [x] Create implementation plan (Code Mode)
2.  [x] Review implementation plan (Expert Opinion Mode)
3.  [x] Update plan based on review (Code Mode, if needed) - *No changes needed*
4.  [ ] User Approval of final plan
5.  [x] Implement fix (Code Mode)
6.  [ ] Verify fix

---

**Proposed Fix Plan (from Code Mode):**

*   **Confidence:** 9/10
*   **Rationale:** Simplest, most direct fix targeting the specific logical errors in button enablement/visibility conditions.
*   **Plan:**
    1.  In `components/CrawlUrls.tsx`, remove `|| !canCancel` from the `disabled` condition of the "Crawl Selected" button (approx. line 197).
    2.  Change the conditional rendering for the "Cancel Crawl" button (approx. line 204) from `showCancelButton && (` to `canCancel && (`.
    3.  Remove the now unused `showCancelButton` variable definition (approx. line 159).