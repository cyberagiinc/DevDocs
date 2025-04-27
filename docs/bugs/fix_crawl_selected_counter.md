# BUG: "Crawl Selected" Button Counter Incorrect

**Issue:** The counter displayed on the "Crawl Selected" button (e.g., "Crawl Selected (8)") does not accurately reflect the number of *selected* URLs that are in the 'pending_crawl' state. It appears to be showing an incorrect count.

**Observed Behavior:** (See user-provided image) Button shows a count (e.g., 8) even when no URLs are visibly selected.

**Expected Behavior:** The counter within the "Crawl Selected" button text should dynamically update to show the exact number of URLs that are both currently checked *and* have the status 'pending_crawl'. If 0 such URLs are selected, it should show "(0)".

**Affected Component:** `components/CrawlUrls.tsx`

**Potential Cause:** The logic calculating `selectedPendingCount` or the way this count is displayed in the button text might be incorrect.

**Subtasks:**
1.  [x] **Analyze Code:** Re-examined calculation. Added `console.log` statements to `selectedPendingCount` `useMemo` hook for further diagnosis.
2.  [ ] **Propose Fix:** Outline the necessary changes to ensure the button counter accurately reflects the count of selected pending URLs.
3.  [ ] **Implement Fix:** Apply the necessary code changes.
4.  [ ] **Verify Fix:** Test the UI by selecting/deselecting pending URLs and confirming the button counter updates correctly.
5.  [ ] **Seal Task List:** Mark as complete once verified by the user.