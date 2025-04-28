# Feature: Adjust Link Discovery Timeout

**Objective:** Increase the timeout for the link discovery process initiated from the UI to resolve the "Timeout waiting for link discovery result" error.

**Tasks:**

1.  [ ] **Analyze Codebase:**
    *   [ ] Identify the frontend API route handler for link discovery (likely `app/api/discover/route.ts`).
    *   [ ] Identify the backend API endpoint called by the frontend handler (likely `/discover` in `backend/app/main.py`).
    *   [ ] Trace the flow from the backend endpoint to the core crawling/discovery logic (likely involving `backend/app/crawler.py`).
    *   [ ] Determine how the `CrawlerRunConfig` or specifically the `page_timeout` parameter is currently set or defaulted for the discovery process initiated via the API.
    *   [ ] Check configuration files (e.g., `backend/app/config.py`) for existing timeout settings.
2.  [ ] **Propose Implementation Plan Options:**
    *   [ ] Option 1: Hardcoded Increase.
    *   [ ] Option 2: Environment Variable.
    *   [ ] Option 3: UI Configuration (Lower priority unless requested).
    *   [ ] Detail Pros & Cons for each relevant option.
3.  [ ] **Recommend and Detail Preferred Plan:**
    *   [ ] State the recommended approach (likely Environment Variable).
    *   [ ] Specify files to be modified.
    *   [ ] Describe how the timeout value will be adjusted (env var name, default value, integration into config and crawler logic).
    *   [ ] List potential side effects and considerations.
4.  [X] **Create Markdown Task List File:** `docs/features/adjust_discovery_timeout_plan.md` (This task).
5.  [ ] **Get Plan Approval:** Present the plan to the user for approval before implementation.
6.  [ ] **Implement Approved Plan:** (Future step, requires user confirmation)
7.  [ ] **Seal Task List:** (Future step, after successful implementation and user confirmation)