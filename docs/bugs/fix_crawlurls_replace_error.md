# BUG: TypeError in CrawlUrls Component

**Issue:** A runtime error `TypeError: Cannot read properties of undefined (reading 'replace')` occurs in `components/CrawlUrls.tsx`.

**Error Log:**
```
TypeError: Cannot read properties of undefined (reading 'replace')
    at page-3057107e4dd0d228.js:1:29700
    ... (stack trace) ...
```

**Analysis:** The error likely occurs on line 290 (`details.status.replace(/_/g, ' ')`) when trying to format the status badge text. This implies that for some URL entry, `details` or `details.status` is `undefined` during rendering.

**Affected Component:** `components/CrawlUrls.tsx`

**Subtasks:**
1.  [x] **Implement Fix:** Add defensive coding (e.g., optional chaining `?.`) before calling `.replace()` on `details.status` to handle cases where it might be undefined. Provide a fallback display value (e.g., 'unknown').
2.  [ ] **Verify Fix:** Test the UI to ensure the error is resolved and statuses display correctly or with the fallback.
3.  [ ] **Seal Task List:** Mark as complete once verified by the user.