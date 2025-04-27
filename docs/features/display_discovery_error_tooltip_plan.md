# FEATURE: Display Discovery Error Tooltip

**Objective:** Enhance the Crawl Queue UI to show specific error messages for URLs with a 'discovery_error' status via tooltips on hover.

**Status:** Completed (Functionality Verified)

**Initial Plan (from Code Mode):**

1.  **Update Types (`lib/types.ts`):** Add optional `errorMessage?: string;` to the relevant URL status type.
2.  **Backend Modification (`backend/app/status_manager.py`):** Capture and store specific error messages when setting `discovery_error` status.
3.  **API Endpoint Update (`app/api/discover/route.ts` or status endpoint):** Include `errorMessage` in the API response for relevant URLs.
4.  **Frontend Data Fetching:** Ensure frontend correctly receives and processes the `errorMessage`.
5.  **Modify `CrawlUrls.tsx`:**
    *   Import and use Shadcn `Tooltip` components.
    *   Conditionally wrap the status `<Badge>` with `Tooltip` components only if `status === 'discovery_error'` and `errorMessage` exists.
    *   Pass `errorMessage` to `TooltipContent`.
    *   Ensure `TooltipProvider` wraps the component tree.
6.  **Styling (Optional):** Adjust if needed.
7.  **Testing:** Verify tooltip display for errors and absence for other statuses.

**Expert Opinion Feedback:**
The plan is sound, however, upon review of the current codebase (`lib/types.ts`, `backend/app/status_manager.py`, relevant API routes, and `components/CrawlUrls.tsx`), it was determined that this functionality (capturing specific error messages in the backend, passing them via API, and displaying them in a tooltip on hover over the status badge in `CrawlUrls.tsx`) is **already implemented**.

**Refined Plan:**
No implementation needed. Verification confirmed existing functionality.

**Implementation Notes:**
The existing implementation handles displaying specific error messages (if available) in tooltips for both `discovery_error` and `crawl_error` statuses. If no specific message is available, a generic description is shown.