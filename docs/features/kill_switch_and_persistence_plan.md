# Feature Implementation Plan & Task List: Crawl Kill Switch & Frontend State Persistence (Refined)

This document outlines the plan and actionable tasks for implementing two features, incorporating expert critique feedback.

1.  A "kill switch" to cancel ongoing backend crawl jobs.
2.  Frontend state persistence to preserve UI state across browser refreshes.

---

## Feature 1: Backend Crawl Kill Switch

### 1.1. Backend API Endpoint (`backend/app/main.py`)

*   **Task:** Define and implement a new API endpoint for cancelling crawl jobs.
    *   **Endpoint:** `POST /api/crawl-cancel/{job_id}`
    *   **Method:** `POST`
    *   **Path Parameter:** `job_id` (string): The ID of the crawl job to cancel.
    *   **Request Body:** None required.
    *   **Response:**
        *   **Success (200 OK):** `{"message": "Cancellation request received for job {job_id}"}`
        *   **Not Found (404 Not Found):** `{"detail": "Job {job_id} not found or already completed."}`
        *   **Error (500 Internal Server Error):** `{"detail": "Failed to initiate cancellation."}`
    *   **Implementation Tasks:**
        *   [X] Add a new FastAPI route handler function (e.g., `cancel_crawl_job`).
        *   [X] Inject the `StatusManager` instance.
        *   [X] Call `status_manager.request_cancellation(job_id)` to signal cancellation.
        *   [X] Implement standard success (200) and error handling (404 Job Not Found, 500 Internal Server Error).
    *   **Refinements & Considerations:**
        *   [X] **(Logging):** Add detailed logging for request received, successful cancellation request initiation, and errors encountered within the endpoint.
        *   [X] **(Idempotency):** Ensure the `request_cancellation` call within the endpoint handles repeated calls for the same *active* job gracefully (e.g., returns success without error if already requested/cancelled). Document this behavior.
        *   [ ] **(Auth - Check Needed):** Evaluate if authentication/authorization is necessary for this endpoint based on deployment strategy. If required, implement appropriate checks.

### 1.2. Backend Cancellation Logic (`backend/app/status_manager.py`)

*   **Task:** Modify `StatusManager` to track cancellation requests using the simple flag mechanism.
    *   **Implementation Tasks (Simple Flag Approach):**
        *   [X] **(Thread Safety Review):** Review `StatusManager` implementation for potential thread-safety issues if using threads (less likely with FastAPI async). Ensure dictionary updates are safe.
        *   [X] Add a dictionary `_cancellation_requests: Dict[str, bool]` to store cancellation flags per `job_id`.
        *   [X] Implement `request_cancellation(self, job_id: str)`:
            *   [X] Check if `job_id` exists and is in a cancellable state (e.g., 'processing', 'discovering'). Raise/return error if not found or already final.
            *   [X] Set `_cancellation_requests[job_id] = True`.
            *   [X] Update the job status to `cancelling`.
            *   [X] **(Atomicity):** Ensure the status update and flag setting happen logically together.
            *   [X] Return success indication.
        *   [X] Implement `is_cancellation_requested(self, job_id: str) -> bool`:
            *   [X] Return `self._cancellation_requests.get(job_id, False)`.
        *   [X] Modify `update_status` or relevant methods to clear the `_cancellation_requests` entry when a job reaches a final state (completed, failed, cancelled).
    *   **Refinements & Considerations:**
        *   [X] **(Status Transitions):** Clearly document the allowed status transitions, including `-> cancelling -> cancelled`.
        *   [ ] **(Persistence - Consideration):** Evaluate if the `_cancellation_requests` flag needs to persist across backend restarts. *Decision: Assume not needed for now unless crawls can resume (YAGNI).*

### 1.3. Backend Crawler Modification (`backend/app/crawler.py`)

*   **Task:** Modify the core crawling logic to check for cancellation signals.
    *   **Implementation Tasks:**
        *   [X] Ensure the `discover_and_process_url` function (or equivalent) has access to the `StatusManager` instance or the `is_cancellation_requested` method for the relevant `job_id`.
        *   [X] **(Checkpoints):** Add multiple checkpoints within the main crawling loops (link iteration, content processing, external calls like `Crawl4AI`) to periodically call `status_manager.is_cancellation_requested(job_id)`. More frequent checks improve responsiveness.
        *   [X] Implement cancellation logic at checkpoints:
            *   [X] If cancellation requested: Log the cancellation event.
            *   [X] Break/exit the current processing loop/stage.
            *   [X] **(Resource Cleanup):** Perform necessary cleanup (e.g., close any specific connections opened for this job, release locks if any).
            *   [X] **(Partial Results):** Determine and implement strategy for handling partial results (e.g., save what was completed, discard, mark as partial). Ensure status reflects this if needed. Document the chosen strategy.
            *   [X] Update job status via `StatusManager` to `cancelled`.
            *   [X] Ensure the crawl function/task exits gracefully for the cancelled `job_id`.
        *   [X] Modify logic to prevent sending *new* tasks to `Crawl4AI` if cancellation is requested for the `job_id`.
    *   **Refinements & Considerations:**
        *   [ ] **(Documentation):** Clearly document the limitation that *already submitted* `Crawl4AI` tasks might not be stoppable via this mechanism.
        *   [X] Emphasize that cancellation should *not* terminate the FastAPI process or Docker container, only the specific background task.

### 1.4. Frontend API Route (`app/api/crawl-cancel/[job_id]/route.ts`) - *New File*

*   **Task:** Create a Next.js API route to proxy the cancellation request to the backend.
    *   **Path:** `app/api/crawl-cancel/[job_id]/route.ts`
    *   **Method:** `POST`
    *   **Implementation Tasks:**
        *   [X] Create the new file and route structure.
        *   [X] Extract `job_id` from the dynamic route segment.
        *   [X] Get the backend API URL (e.g., from environment variables, reusing existing logic).
        *   [X] Make a `POST` request to `BACKEND_URL/api/crawl-cancel/{job_id}`.
        *   [X] Forward the response (status code and body) from the backend to the frontend client.
        *   [X] Include error handling for network issues or backend errors.
    *   **Refinements & Considerations:**
        *   [X] **(Error Propagation):** Ensure that network errors originating in the proxy route are clearly distinguishable from errors forwarded from the backend API.
        *   [X] **(Backend URL):** Reuse or reference existing robust backend URL resolution logic (e.g., from `lib/config.ts` or similar) to avoid duplication (DRY).

---

## Feature 2: Frontend State Persistence

### 2.1. Identify State to Persist & Mechanism

*   **Task:** Confirm critical UI state pieces and choose `localStorage`.
    *   **State Variables:**
        *   [X] `jobId`: `string | null`
        *   [X] `crawlStatus`: `string | null`
        *   [X] `discoveredUrls`: `DiscoveredPage[]`
        *   [X] `selectedUrls`: `Set<string>` or `string[]`
        *   [X] `stats`: `CrawlStats | null`
        *   [X] `mcpInfo`: `MCPInfo | null`
        *   [X] `urlInputValue`: `string`
        *   [X] `consolidatedContent`: `string`
        *   [X] `debugOutput`: `string`
    *   **Mechanism:** Use `localStorage`.
    *   **Refinements & Considerations:**
        *   [X] **(Sensitive Data Check):** Double-check that no sensitive data (tokens, secrets) is being inadvertently stored in `localStorage`.

### 2.2. Implement State Saving (to `localStorage`)

*   **Task:** Save relevant state pieces to `localStorage` whenever they change.
    *   **Approach:** Use `useEffect` hooks in the components or custom hooks where the state is managed.
    *   **Implementation Tasks:**
        *   [X] Implement `useEffect` hooks for each state piece identified in 2.1.
        *   [X] Define and use consistent keys for `localStorage` items (e.g., `crawlJobId`, `crawlStatus`, `discoveredUrls`, etc.).
        *   [X] Use `JSON.stringify` for non-string data (arrays, objects).
        *   [X] **(Versioning):** Add a version key to the stored data structure (e.g., `{ version: 1, data: {...} }`). Store data under this structure.
        *   [X] **(Error Handling):** Wrap `localStorage.setItem` calls in `try...catch` blocks, especially for potentially large data, to handle potential quota errors. Log errors if they occur.
    *   **Refinements & Considerations:**
        *   [ ] **(Debouncing - Optional):** Consider debouncing `setItem` for rapidly changing state like `urlInputValue` if performance becomes an issue (YAGNI for now).

### 2.3. Implement State Loading (Hydration from `localStorage`)

*   **Task:** Load state from `localStorage` when the application/component mounts.
    *   **Approach:** Use `useState` initializer functions or `useEffect` hooks that run only on mount.
    *   **Implementation Tasks:**
        *   [X] Implement loading logic for each state piece using `useState` initializers or mount `useEffect`.
        *   [X] Include `typeof window !== 'undefined'` checks for SSR compatibility.
        *   [X] Use `JSON.parse` with `try...catch` blocks for deserialization. Provide default values on error or if data is missing.
        *   [X] **(Versioning Check):** Check the version key on load. If the version doesn't match the current expected version, discard the stored data and use defaults to avoid errors from structure changes.
    *   **Refinements & Considerations:**
        *   [X] **(Revalidation):** Upon loading state for an *ongoing* `jobId` (e.g., status was 'processing'), immediately trigger a fetch to `/api/crawl-status/{job_id}` to get the *current* authoritative status from the backend, overriding the potentially stale stored status.
        *   [X] **(Hydration Warnings):** Be mindful of potential React hydration mismatch warnings. Ensure server defaults align with initial client state where possible, or manage state updates carefully post-hydration.

### 2.4. State Clearing and Transitions

*   **Task:** Define when persisted state should be cleared or ignored, using the "Clear on New Discovery" strategy.
    *   **Implementation Tasks:**
        *   [X] Add logic to the `handleDiscover` function (or equivalent) to remove relevant items (`jobId`, `crawlStatus`, `discoveredUrls`, `selectedUrls`, `stats`, `consolidatedContent`, `debugOutput`) from `localStorage` before starting the new discovery API call.
        *   [X] Ensure `CrawlStatusMonitor` correctly handles initializing with a non-idle status loaded from storage (consider the revalidation step in 2.3).
    *   **Refinements & Considerations:**
        *   [ ] **(Multi-Tab Sync Limitation):** Acknowledge and document that this `localStorage` approach does not automatically sync state across multiple open tabs. This is acceptable for the initial implementation (YAGNI).

---

## Feature 3: Frontend Kill Switch UI

### 3.1. Button Placement and Visibility

*   **Task:** Add a "Cancel Crawl" button to the UI.
    *   **Location:** In `components/CrawlUrls.tsx` or parent component managing crawl actions. Place near "Crawl Selected".
    *   **Implementation Tasks:**
        *   [X] Add a `Button` component.
        *   [X] Apply a distinct style (e.g., `variant="destructive"`).
        *   [X] Implement conditional rendering/disabling logic: Button visible/enabled only when `jobId` exists AND `crawlStatus` is 'processing' or 'discovering'.
        *   [X] **(Accessibility):** Add appropriate ARIA attributes (e.g., `aria-label="Cancel crawl job"`).

### 3.2. Button Click Handler

*   **Task:** Implement the logic to call the cancellation API.
    *   **Implementation Tasks:**
        *   [X] Create an `async function handleCancelCrawl`.
        *   [X] Get the current `jobId`.
        *   [X] **(Race Condition/Double Submit):** Implement a state flag (e.g., `isCancelling`) set to `true` at the start of the handler and `false` in a `finally` block. Disable the button based on this flag.
        *   [X] If `jobId` exists and not already `isCancelling`:
            *   [X] Make a `POST` request to the frontend API route `/api/crawl-cancel/${jobId}`.
            *   [X] Handle API response within a `try...catch...finally` block:
                *   [X] **On Success:**
                    *   [X] Immediately update local `crawlStatus` state to 'cancelling' for quick UI feedback.
                    *   [X] **(Toast Management):** Show a success toast (e.g., "Cancellation request sent"). Ensure toasts are managed effectively.
                    *   [X] Keep the cancel button disabled (via `isCancelling` flag and status checks).
                    *   [ ] **(Polling Frequency):** *Optional:* Consider temporarily increasing the polling frequency of `CrawlStatusMonitor` after sending a cancel request.
                *   [X] **On Failure (e.g., 404, 500):**
                    *   [X] Show an informative error toast (e.g., "Failed to cancel: Job already finished or server error").
                    *   [X] Button remains disabled if the error is final (404), potentially re-enabled if temporary (network).
                *   [X] **Network Error (`catch`):** Show an error toast.
                *   [X] **`finally` block:** Set `isCancelling` back to `false`.

### 3.3. UI Feedback

*   **Task:** Update the UI to reflect the cancellation process.
    *   **Implementation Tasks:**
        *   [X] Ensure `CrawlStatusMonitor` correctly displays 'cancelling' and 'cancelled' statuses polled from the backend.
        *   [X] **(Visual Indicator):** Add a specific visual indicator (e.g., text "Cancelling...", spinner next to status) when the local or polled status is 'cancelling'.
        *   [X] Ensure other UI elements (e.g., progress indicators, action buttons) appropriately reflect the 'cancelling' and 'cancelled' states (e.g., disable crawl/discover buttons when cancelling/cancelled).

---

## Feature 4: General Tasks

### 4.1. Testing

*   [ ] **Backend:** Add unit tests for `StatusManager` cancellation logic (flag setting, status updates, checking).
*   [ ] **Backend:** Add integration tests for the `POST /api/crawl-cancel/{job_id}` endpoint (success, 404, idempotency).
*   [ ] **Frontend:** Add basic component/hook tests for the state persistence logic (saving/loading/clearing/versioning).
*   [ ] **Frontend:** Add tests for the Cancel button visibility, click handler (including disabling logic), and UI feedback based on state changes.
*   [ ] Perform end-to-end manual testing of the cancellation flow (during discovery, during processing) and state persistence across browser refreshes and closing/reopening tabs.

### 4.2. Documentation

*   [ ] Update relevant READMEs or technical documentation (if any) to include the new cancellation API endpoint details and behavior (idempotency).
*   [ ] Add comments in the code explaining the state persistence logic, `localStorage` keys used, and the versioning strategy.
*   [ ] Document the `Crawl4AI` cancellation limitation clearly where the interaction occurs.
*   [ ] Document the lack of multi-tab sync for persisted state as a known limitation.

---

*************

# FEATURE: Crawl Kill Switch & Frontend State Persistence Implementation Tracking

## Summary (Completed on 2025-04-11)

The core implementation for both the kill switch and frontend state persistence features was completed based on the refined plan incorporating expert feedback.

- **Kill Switch:** Backend API (`/api/crawl-cancel/{job_id}`), cancellation logic (`StatusManager`), crawler checks, and frontend proxy route implemented. Refinements for logging, idempotency, and error handling were included.
- **Persistence:** Key frontend states persisted to `localStorage` with versioning, error handling (`try...catch`), and revalidation on load. State cleared on new discovery.
- **UI:** "Cancel Crawl" button added to `CrawlUrls`, conditionally visible/enabled, calls cancellation API, provides feedback (toasts, status update), includes accessibility attributes and double-submit prevention.

## Next Steps (Remaining Tasks from Plan)

- **Testing:**
    - [ ] Backend unit tests for `StatusManager` cancellation logic.
    - [ ] Backend integration tests for the cancellation API endpoint.
    - [ ] Frontend tests for state persistence logic (saving/loading/clearing/versioning).
    - [ ] Frontend tests for the Cancel button UI/logic.
    - [ ] End-to-end manual testing of cancellation and persistence scenarios.
- **Documentation:**
    - [ ] Update API documentation for the new endpoint.
    - [ ] Add code comments explaining persistence logic/versioning.
    - [ ] Document `Crawl4AI` cancellation limitation.
    - [ ] Document lack of multi-tab sync for persistence.

---

## Bug Fixes

### Bug: "Cancel Crawl" Button Not Visible (Reported 2025-04-11)

**Issue:** The "Cancel Crawl" button is not appearing in the UI even when `jobId` exists and `crawlStatus` is 'processing' or 'discovering'.

**Tasks:**

1.  [ ] **Investigate Code:**
    *   Read `components/CrawlUrls.tsx`.
    *   Read `app/page.tsx` (if necessary, to check state management).
2.  [ ] **Analyze Logic:**
    *   Identify the conditional rendering logic for the "Cancel Crawl" button.
    *   Verify the conditions: `jobId` exists AND (`crawlStatus === 'processing'` OR `crawlStatus === 'discovering'`).
    *   Check how `jobId` and `crawlStatus` are accessed or passed to the component.
3.  [ ] **Propose Solutions:**
    *   Based on the analysis, outline potential fixes.
    *   Consider state propagation, logical operators, and variable access.
    *   Provide options if multiple fixes are viable.
4.  [ ] **Get User Approval:**
    *   Present findings and proposed solution(s) with confidence score and rationale.
    *   Wait for user confirmation before proceeding.
5.  [ ] **Implement Fix:**
    *   Apply the approved code changes using `apply_diff`.
6.  [ ] **User Confirmation:**
    *   Request user to rebuild (`docker compose up --build -d`) and test the application.
    *   Wait for user confirmation that the button is now visible when expected.
7.  [ ] **Seal Bug Fix:**
    *   Mark all bug fix tasks as complete within this section upon successful user confirmation.
