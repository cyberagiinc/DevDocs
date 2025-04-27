# FEATURE: Display HTTP Status Code in Crawl Queue UI

**Goal:** Modify the backend and frontend to display the HTTP status code (e.g., 200, 404) for each URL in the "Crawl Queue" table.

**Subtasks:**
1.  [x] Create implementation plan (Code Mode)
2.  [x] Review implementation plan (Expert Opinion Mode)
3.  [x] Update plan based on review (Code Mode, if needed)
4.  [x] User Approval of final plan
5.  [x] Implement backend changes (Code Mode)
6.  [x] Implement shared type changes (Code Mode)
7.  [x] Implement frontend changes (Code Mode)
8.  [ ] Verify changes

**Initial Plan (from Code Mode):**
*(See below for Expert Opinion feedback and Revised Plan)*

**I. Backend Changes**

1.  **Status Storage (`backend/app/status_manager.py`):**
    *   Modify `CrawlJobStatus` model: Change `urls: dict[str, str]` to `urls: dict[str, dict[str, str | int | None]]` to store both descriptive status (`status`) and numerical code (`statusCode`).
    *   Update `update_url_status`: Accept an optional `statusCode: Optional[int]` and store both values in the nested dictionary for the URL.
    *   Update `get_job_status`: Ensure it reconstructs the model with the new nested `urls` structure.
    *   Update `add_pending_crawl_urls`: Initialize URL entries with `{'status': 'pending_crawl', 'statusCode': None}`.

2.  **Crawler Logic (`backend/app/crawler.py`):**
    *   Modify `crawl_pages` (and potentially `discover_pages`): Capture the actual HTTP status code of the target URL.
        *   *Primary Method:* Check if the `CRAWL4AI` service response includes the target URL's status code and extract it.
        *   *Alternative:* If `CRAWL4AI` doesn't provide the code, implement a HEAD request *before* calling `CRAWL4AI` to get the status (adds overhead).
    *   Update calls to `update_url_status` to pass the captured `statusCode` (e.g., `statusCode=200`, `statusCode=404`, or `None`).

3.  **API Endpoint (`backend/app/main.py`):**
    *   Likely no changes needed, as FastAPI should serialize the updated `CrawlJobStatus` model returned by `get_job_status`. Verify response structure after other backend changes.

**II. Shared Type Changes (`lib/types.ts`)**

1.  **`CrawlJobStatus` Interface:** Change `urls: Record<string, UrlStatus>` to `urls: Record<string, { status: UrlStatus; statusCode: number | null; }>`.
2.  **`CrawlUrlsProps` Interface:** Update the `urls` prop type to match the new structure: `urls: Record<string, { status: UrlStatus; statusCode: number | null; }>;`.

**III. Frontend Changes (`components/CrawlUrls.tsx`)**

1.  **Data Handling:** Update component logic to access descriptive status via `urls[url].status` and numerical code via `urls[url].statusCode`.
2.  **Helper Functions:** Ensure `getStatusBadgeStyle` and `getStatusTooltip` still receive the `UrlStatus` string (from `urls[url].status`).
3.  **State/Memoization:** Update calculations for `pendingUrls` and `selectedPendingCount` to use `urls[url].status`.
4.  **Table Header:** Add a new `<TableHead>` for "Status Code" (e.g., `Code`).
5.  **Table Body:** Add a new `<TableCell>` in each row to display `urls[url].statusCode`. Show a placeholder (e.g., '-') if the code is `null` or `undefined`.

---

**Expert Opinion Feedback (Confidence: 8/10):**

*   **Critical Assumption:** Plan relies on unverified assumption that `CRAWL4AI` provides status codes. **Must verify first.**
*   **Performance Risk:** Fallback HEAD requests could severely slow down crawls. Consider alternatives or fetching status *after* crawl if needed.
*   **Scope:** Status retrieval should likely be limited to `crawl_pages`, not `discover_pages`.
*   **Backend Structure:** Recommend using a Pydantic `UrlDetails` model instead of nested dicts for better type safety.
*   **Frontend Nulls:** Explicitly define the placeholder (e.g., '-').

**Revised Plan Outline (incorporating feedback):**

**Phase 1: Investigation (Completed)**

1.  **Verify `CRAWL4AI` Behavior:**
    *   **Finding:** Code Mode analysis of `backend/app/crawler.py` confirmed the current code *does not* extract or use the target URL's HTTP status code from the `CRAWL4AI` response.
    *   **Unknown:** It remains unconfirmed if `CRAWL4AI` *provides* this status code in its response payload.

**Phase 2: Implementation Path Decision**
*   **Decision:** Proceed with implementation assuming status code is unavailable from `CRAWL4AI` (Scenario B), but attempt extraction if possible during implementation. Focus status retrieval within `crawl_pages`.

**Phase 2: Implementation (Contingent on Phase 1 Results)**

**I. Backend Changes**

1.  **Status Storage (`backend/app/status_manager.py`):**
    *   Define `class UrlDetails(BaseModel): status: str; statusCode: Optional[int] = None`.
    *   Modify `CrawlJobStatus` model: `urls: dict[str, UrlDetails]`.
    *   Update `update_url_status`, `get_job_status`, `add_pending_crawl_urls` to use `UrlDetails`.

2.  **Crawler Logic (`backend/app/crawler.py` - Focus on `crawl_pages`):**
    *   **Scenario A (If `CRAWL4AI` provides code):** Extract `statusCode` from response.
    *   **Scenario B (If `CRAWL4AI` doesn't provide code):** Decide if needed. If yes, fetch status *after* crawl or only for specific outcomes if possible. Handle fetch errors.
    *   Update calls to `status_manager.update_url_status` with `statusCode`.

3.  **API Endpoint (`backend/app/main.py`):**
    *   Verify serialization of `UrlDetails`.

**II. Shared Type Changes (`lib/types.ts`)**

1.  **`UrlDetails` Interface (New):** `interface UrlDetails { status: UrlStatus; statusCode: number | null; }`.
2.  **`CrawlJobStatus` Interface:** Update `urls: Record<string, UrlDetails>`.
3.  **`CrawlUrlsProps` Interface:** Update `urls` prop type to `Record<string, UrlDetails>`.

**III. Frontend Changes (`components/CrawlUrls.tsx`)**

1.  **Data Handling:** Access via `urls[url].status` and `urls[url].statusCode`.
2.  **Helper Functions:** Use `urls[url].status`.
3.  **State/Memoization:** Use `urls[url].status`.
4.  **Table:** Add "Code" header and cell displaying `urls[url].statusCode`.
5.  **Null Display:** Render '-' or 'N/A' for null `statusCode`.