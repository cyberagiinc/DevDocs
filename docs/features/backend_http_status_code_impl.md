# Feature: Implement Backend Changes for Displaying HTTP Status Codes

**Phase:** 2, Part 1 (Backend Implementation)

**Context:** This task implements the backend portion of the approved revised plan in `docs/features/display_http_status_code_plan.md`. The goal is to store and retrieve the HTTP status code associated with each crawled URL.

**Task List:**

1.  **Create Task List File:**
    *   [X] Create `docs/features/backend_http_status_code_impl.md` with this task list. (This step)

2.  **Modify `backend/app/status_manager.py`:**
    *   [ ] Define `UrlDetails` Pydantic model: `class UrlDetails(BaseModel): status: str; statusCode: Optional[int] = None`.
    *   [ ] Update `CrawlJobStatus` model: Change `urls: dict[str, str]` to `urls: dict[str, UrlDetails]`.
    *   [ ] Update `update_url_status` function:
        *   Add `statusCode: Optional[int] = None` parameter.
        *   Modify storage logic to use `UrlDetails(status=status, statusCode=statusCode)`.
    *   [ ] Update `get_job_status` function:
        *   Ensure correct reconstruction/serialization of `CrawlJobStatus` with nested `UrlDetails`. (Verify loading logic if custom serialization/deserialization exists, otherwise Pydantic handles it).
    *   [ ] Update `add_pending_crawl_urls` function:
        *   Initialize URL entries with `UrlDetails(status='pending_crawl')`.

3.  **Modify `backend/app/crawler.py` (`crawl_pages` function):**
    *   [ ] **Read Existing Code:** Read the current implementation of `crawl_pages` to understand how the `CRAWL4AI` response is processed.
    *   [ ] **Attempt Scenario A (Extract from CRAWL4AI):**
        *   Inspect the structure of the data received from the `CRAWL4AI` `/task/{task_id}` endpoint.
        *   Attempt to identify and extract a field representing the target URL's HTTP status code.
        *   If found, store this value in a variable (e.g., `extracted_status_code`).
    *   [ ] **Implement Scenario B (Fallback - Fetch Separately):**
        *   If Scenario A is not feasible:
            *   Add `httpx` to `backend/requirements.txt`.
            *   Import `httpx` and `Optional` from `typing`.
            *   Implement a helper function (e.g., `_fetch_status_code(url: str) -> Optional[int]`) that:
                *   Uses `httpx.AsyncClient()` to make a HEAD request to the `url`.
                *   Includes appropriate timeouts (e.g., `timeout=10.0`).
                *   Handles potential exceptions (`httpx.RequestError`, `httpx.TimeoutException`, etc.) and returns `None` on failure.
                *   Returns the `response.status_code` on success.
            *   Call this helper function within `crawl_pages` *after* confirming the URL was processed by `CRAWL4AI` (or based on its reported status).
            *   Store the result in a variable (e.g., `fetched_status_code`).
    *   [ ] **Update Status Manager Call:**
        *   Determine the final `statusCode` to pass (prefer `extracted_status_code` if Scenario A worked, otherwise `fetched_status_code`, falling back to `None`).
        *   Modify the call(s) to `status_manager.update_url_status` within `crawl_pages` to include the `statusCode` argument.

4.  **Verify `backend/app/main.py`:**
    *   [ ] Briefly review the API endpoint definition(s) that return `CrawlJobStatus` (e.g., `/crawl-status/{job_id}`).
    *   [ ] Confirm that standard FastAPI Pydantic model serialization is used, which should automatically handle the nested `UrlDetails`. No code changes expected here unless custom serialization logic exists.

5.  **Final Review & Completion:**
    *   [ ] Review all changes for correctness and adherence to the plan.
    *   [ ] Use `attempt_completion` tool, summarizing changes and specifying if Scenario A or B was implemented.

**Sealed:** [ ] (Mark as sealed only after user confirms successful implementation and functionality)