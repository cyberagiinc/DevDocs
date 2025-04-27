# Task List: Fix Disabled Crawl Buttons

**Feature:** Bug Fix - Correct Disabled State for "Crawl Selected" and "Cancel Crawl" Buttons

**Objective:** Investigate why the "Crawl Selected" and "Cancel Crawl" buttons in `components/CrawlUrls.tsx` remain disabled incorrectly and create a plan to fix the logic.

**Tasks:**

1.  [x] **Analyze `components/CrawlUrls.tsx`:**
    *   [x] Read the contents of `components/CrawlUrls.tsx`.
    *   [x] Identify relevant state variables (`selectedUrls`, `isCrawling`, `urls`).
    *   [x] Locate the `disabled` logic for the "Crawl Selected" button.
    *   [x] Analyze how the "Crawl Selected" button logic counts selected URLs and filters them by status (expecting `pending_crawl`).
    *   [x] Locate the `disabled` logic for the "Cancel Crawl" button.
    *   [x] Analyze how the "Cancel Crawl" button logic uses the crawling state.
2.  [x] **Identify Root Cause:**
    *   [x] Determine why the button disabled states are not updating correctly.
    *   [x] Confirm if the issue stems from the recent change of the `urls` state structure (from `string` status to `UrlDetails` object).
3.  [x] **Propose Fix Plan:**
    *   [x] Outline Option 1: Direct modification of the existing `disabled` logic in the JSX to correctly access `urls[url].status`.
    *   [x] Outline Option 2: Refactoring the disabled logic using `useMemo` hooks for potentially cleaner calculation, still ensuring correct access to `urls[url].status`.
    *   [x] Compare the pros and cons of each option based on simplicity, readability, and performance.
4.  [x] **Present Findings:**
    *   [x] Use `attempt_completion` to report the analysis, root cause, and the proposed fix plan options.
5.  [ ] **Await Feedback:**
    *   [ ] Wait for user approval or feedback on the proposed plan.
6.  [ ] **(Optional) Switch to Expert Opinion:**
    *   [ ] If requested, switch to Expert Opinion mode for plan review.
    *   [ ] Create updated task list incorporating feedback.
    *   [ ] Get approval for the updated plan.
7.  [ ] **Implement Approved Fix:** (To be done *after* plan approval)
    *   [ ] Apply the chosen fix using the `apply_diff` tool on `components/CrawlUrls.tsx`.
8.  [ ] **Verify Fix:** (Requires user interaction/testing)
    *   [ ] Confirm with the user that the buttons now enable/disable correctly based on selection and crawling status.
9.  [ ] **Seal Task:**
    *   [ ] Mark all tasks as complete and seal the feature upon user confirmation.

**File:** `docs/bugs/fix_crawl_buttons_disabled_plan.md`