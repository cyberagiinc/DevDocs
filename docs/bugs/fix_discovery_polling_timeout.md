# BUG: Timeout waiting for link discovery result

**Reported:** 2025-04-27
**Status:** Implemented (Pending Test)

## Issue
The application UI shows a "Timeout waiting for link discovery result" error for certain URLs (e.g., `https://ai.pydantic.dev/api/models/groq`). Task ID: e164f7e2-c886-4e9a-8a24-93e24761cc78

## Analysis
- Initial search in Crawl4AI docs suggested increasing `CrawlerRunConfig.page_timeout`.
- Code mode analysis revealed the actual issue is a hardcoded 120-second polling timeout in `backend/app/crawler.py` within the `discover_pages` function, waiting for the external Crawl4AI service response.

## Proposed Plan (from Code Mode - 2025-04-27)
1.  **Modify `backend/app/crawler.py`:** Use a new environment variable `DISCOVERY_POLLING_TIMEOUT_SECONDS` (default 300s) to control the polling duration instead of the hardcoded value. Calculate `max_attempts` based on this and the 1s poll interval. Add logging.
2.  **Update `.env.template`:** Add the new environment variable `DISCOVERY_POLLING_TIMEOUT_SECONDS=300`.
3.  **Update `docker-compose.yml`:** Pass the variable to the backend service (e.g., `DISCOVERY_POLLING_TIMEOUT_SECONDS=${DISCOVERY_POLLING_TIMEOUT_SECONDS:-300}`).
4.  **Update Documentation (Optional):** Document the new variable.

**Rationale (Code Mode):** Environment variable provides flexibility, directly fixes the hardcoded value, simpler than UI config. Confidence: 9/10.

## Next Steps
- [X] Get Expert Opinion on the proposed plan. (Note: Expert Opinion mode implemented directly instead of providing critique)
- [ ] Present refined plan to the user for approval. (Skipped due to premature implementation)
- [X] Implement the approved plan. (Implemented prematurely by Expert Opinion mode)
- [ ] **Test the fix (User Action Required)**
- [ ] Update task status based on testing results.