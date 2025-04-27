# BUG: URLs from Previous Job Appear in New Crawl

**Issue:** After starting a new discovery/crawl (e.g., for `docs.crawl4ai.com`), URLs from a completely different, previously stopped job (e.g., `clerk.com`) are appearing in the Crawl Queue and potentially being processed.

**Observed Behavior:** (See user-provided image) The Crawl Queue shows a mix of URLs from the new target (`docs.crawl4ai.com`, status 'pending crawl') and the old target (`clerk.com`, status 'completed').

**Expected Behavior:** Starting a new discovery should completely clear the state (Job ID, URL list, statuses) associated with any previous job, showing only the URLs relevant to the *new* discovery and crawl process.

**Affected Components:**
*   `app/page.tsx` (State management, localStorage clearing, `handleSubmit` logic)
*   `backend/app/status_manager.py` (Potentially, if job states are not isolated)
*   LocalStorage persistence logic

**Potential Causes:**
*   Incomplete clearing of `localStorage` keys (`crawlJobId`, `crawlJobStatus`) when starting a new job.
*   Frontend state (`currentJobId`, `jobStatus`) not being reset correctly in `handleSubmit`.
*   Backend issue mixing job data (less likely).

**Subtasks:**
1.  [x] **Analyze State Reset Logic:** Examined `handleSubmit` in `app/page.tsx`. Found that `currentJobId` and `localStorage` are cleared, but the `selectedUrls` state variable is *not* reset.
2.  [ ] **Analyze Polling Logic:** Verify the `useEffect` hook responsible for polling (`/api/crawl-status/[job_id]`) correctly stops polling for the old job ID and uses the new one.
3.  [x] **Propose Fix:** Add `setSelectedUrls(new Set());` to the state resets within `handleSubmit` in `app/page.tsx`.
4.  [x] **Implement Fix:** Added `setJobStatus(null)` and `setSelectedUrls(new Set())` to `handleSubmit` in `app/page.tsx`.
5.  [ ] **Verify Fix:** Test by stopping a crawl, starting a new one for a different domain, and confirming only the new URLs appear.
6.  [ ] **Seal Task List:** Mark as complete once verified by the user.