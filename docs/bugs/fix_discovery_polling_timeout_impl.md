# Task List: Fix Discovery Polling Timeout (Implementation)

**Task ID:** `e164f7e2-c886-4e9a-8a24-93e24761cc78`
**Status:** `Pending`
**Mode:** `Code`
**Revised Plan Approved:** Yes

This plan implements the fix for the discovery polling timeout based on the review and approval from Expert Opinion mode.

## Subtasks

1.  **[X] Modify `backend/app/crawler.py` (`discover_pages` function):**
    *   Define `poll_interval = 1`.
    *   Read the environment variable `DISCOVERY_POLLING_TIMEOUT_SECONDS`, parse as integer, default to `300`.
    *   Calculate `max_attempts = int(discovery_timeout / poll_interval)`.
    *   Add logging: `log.info(f"Using discovery polling timeout: {discovery_timeout} seconds ({max_attempts} attempts at {poll_interval}s interval)")`.
    *   Use `max_attempts` in the polling loop condition.
2.  **[X] Update `.env.template`:**
    *   Add `DISCOVERY_POLLING_TIMEOUT_SECONDS=300 # Max time in seconds to wait for Crawl4AI discovery results`.
3.  **[X] Update Docker Configuration (`docker/compose/docker-compose.yml`):**
    *   Add `DISCOVERY_POLLING_TIMEOUT_SECONDS=${DISCOVERY_POLLING_TIMEOUT_SECONDS:-300}` to the `environment` section of the `backend` service.
4.  **[ ] (Recommended) Update Documentation:**
    *   Mention the new `DISCOVERY_POLLING_TIMEOUT_SECONDS` environment variable, its purpose, and default value in relevant documentation sections. (Skipping for now unless requested).
5.  **[ ] Seal Task:** Mark this task list as complete once all steps are verified.