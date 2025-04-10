# Feature: Fix URL Status Update Consistency

**Goal:** Ensure the UI correctly reflects the 'completed' status for crawled URLs by fixing inconsistent URL normalization.

**Tasks:**

1.  [x] **Identify Root Cause:** Analyze why URL statuses aren't updating correctly. (Completed in Architect mode: Inconsistent normalization between adding URLs and updating their status).
2.  [ ] **Propose Solution:** Determine the best way to ensure consistent URL normalization.
3.  [ ] **Implement Fix:** Modify `backend/app/crawler.py` to normalize URLs *before* calling `update_url_status`.
4.  [ ] **Verify Fix:** (Manual) Test the crawl process and observe if UI statuses update correctly.
5.  [ ] **Seal Task:** Confirm with the user that the fix is working and seal this task list.