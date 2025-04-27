# Task List: Implement Discovery Error Tooltip

**Feature:** Display specific error messages for URLs with 'discovery_error' status using tooltips in the Crawl Queue UI.

**Approved Plan:** (Based on Expert Opinion review)

1.  **[X] Update Types (`lib/types.ts`):** (Already exists in `UrlDetails`)
    *   Locate the primary type definition used for URL status data (e.g., `DiscoveredUrl`).
    *   Add an optional `errorMessage?: string;` field.
2.  **[X] Backend Error Capturing (`backend/app/crawler.py`):** (Already implemented)
    *   Modify error handling during discovery to capture a concise error message.
    *   Pass the message to `status_manager.set_url_status`.
3.  **[X] Backend Error Storage (`backend/app/status_manager.py`):** (Already implemented)
    *   Update `set_url_status` function signature to accept `error_message: Optional[str] = None`.
    *   Store the `error_message` in Redis (or dict) if provided.
4.  **[X] API Endpoint Update (`app/api/crawl-status/[job_id]/route.ts`):** (Proxy passes through backend data)
    *   Modify the status API endpoint to retrieve and include the `errorMessage` field in the response.
5.  **[X] Frontend Component (`components/CrawlUrls.tsx`):** (Already implemented)
    *   Import `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`.
    *   Wrap the table/list with `<TooltipProvider>`.
    *   Conditionally render the `Tooltip` around the status `Badge` for `discovery_error` status with an existing `errorMessage`.
6.  **[X] Testing:** (Verified by user)
    *   (Manual/Mocking) Verify tooltip appears correctly for errors and not for other statuses.
7.  **[X] Seal Task:** (Feature confirmed working)
    *   Confirm feature works as expected with the user.
    *   Mark all tasks as complete and seal the feature.