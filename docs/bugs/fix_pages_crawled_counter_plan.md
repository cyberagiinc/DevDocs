# Feature: Fix Pages Crawled Counter Bug

**Objective:** Investigate and create a plan to fix the "Pages Crawled" counter incorrectly displaying 0 in `JobStatsSummary.tsx`.

**Tasks:**

1.  [x] **Create Task List:** Create this markdown file (`docs/bugs/fix_pages_crawled_counter_plan.md`).
2.  [x] **Read Bug Report:** Read the existing bug report `docs/bugs/fix_pages_crawled_counter.md` for context.
3.  [x] **Analyze `JobStatsSummary.tsx`:**
    *   Read `components/JobStatsSummary.tsx`.
    *   Examined how the `jobStatus` prop is received.
    *   Located and verified the logic calculating "Pages Crawled" and "Errors". Identified issue in `countUrlsByStatus` helper comparing object (`UrlDetails`) to status string.
4.  [x] **Analyze `lib/types.ts`:** Read type definitions (`CrawlJobStatus`, `UrlDetails`, `UrlStatus`) to confirm structure of `jobStatus.urls`.
5.  [x] **Analyze `app/page.tsx`:**
    *   Read `app/page.tsx`.
    *   Confirmed `jobStatus` state updates correctly via polling (`handleStatusUpdate`, `fetchStatus`).
    *   Verified the up-to-date `jobStatus` is passed to `JobStatsSummary`.
6.  [x] **Identify Root Cause:** Determined the issue is solely in the `countUrlsByStatus` calculation logic within `JobStatsSummary.tsx` due to incorrect property access (`details` vs `details.status`). This affects both "Pages Crawled" and "Errors" counts.
7.  [x] **Propose Fix Plan:**
    *   **Recommended Fix:** Modify `countUrlsByStatus` in `components/JobStatsSummary.tsx`:
        *   Change the filter condition to access the nested status: `details.status`.
        *   Update the type hint for the `urls` parameter to `Record<string, UrlDetails> | undefined` for clarity and type safety.
    *   **Rationale:** Directly fixes the bug in the shared helper, correcting both "Pages Crawled" and "Errors" counts simultaneously (DRY principle). Simple and aligns code with types (KISS).
    *   **Confidence:** 10/10.
8.  [x] **Seek Expert Opinion:** Reviewed plan; analysis and recommended fix are sound. Emphasized fixing the helper corrects both stats and improves type safety.
9.  [x] **Get User Approval:** Confirmed the revised plan with the user.
10. [x] **Implement Fix:** Applied the approved code changes (Modified `countUrlsByStatus`, updated type hint, added `UrlDetails` import, removed duplicate import).
11. [ ] **Verify Fix:** Test the application to ensure both "Pages Crawled" and "Errors" counters work correctly.
12. [ ] **Seal Task:** Mark the feature as complete after user confirmation.