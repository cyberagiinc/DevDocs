# BUG: Crawl Selected - Invalid Acknowledgment Error

**Reported:** 2025-04-10 (During testing of other fixes)
**Status:** Resolved (2025-04-10)

## Description

After selecting discovered URLs and clicking the "Crawl Selected" button, the frontend displayed console errors:
- `Invalid crawl initiation response: {markdown: '...', stats: {...}}`
- `Error initiating crawl: Error: Backend did not return a valid acknowledgment for crawl initiation.`

This indicated that the frontend (`lib/crawl-service.ts`) was expecting a response like `{ job_id: "...", success: true }` from the `/api/crawl` endpoint, but was receiving a different structure containing markdown and stats instead.

## Investigation

1.  **Frontend Code (`lib/crawl-service.ts`):** Confirmed the `crawlPages` function correctly calls the Next.js API route `/api/crawl` and expects a specific acknowledgment response format (`{ job_id, success }`).
2.  **API Route (`app/api/crawl/route.ts`):** Examined the `POST` handler for this route. Found that while it likely called the backend service, it was incorrectly processing the backend's response and returning a different data structure (containing markdown/stats) to the frontend, instead of simply forwarding the backend's acknowledgment.

## Root Cause

The Next.js API route handler at `app/api/crawl/route.ts` was not correctly acting as a proxy for the `/api/crawl` endpoint. It intercepted the request from the browser but failed to return the actual acknowledgment response it received from the backend service (`http://backend:24125/api/crawl`).

## Resolution

1.  **Modified `app/api/crawl/route.ts`:**
    *   Updated the `POST` handler to fetch the response from the internal backend service (`${INTERNAL_BACKEND_URL}/api/crawl`).
    *   Ensured the handler parses the JSON response from the backend.
    *   **Crucially, changed the return statement to forward the *parsed JSON response from the backend* directly back to the frontend** using `NextResponse.json(backendData)`, ensuring the expected `{ job_id, success }` structure is passed through.
2.  **Type Consistency:** Corrected related TypeScript type definitions (`CrawlRequest` in `lib/types.ts`) and updated usage in `lib/crawl-service.ts` and `app/page.tsx` to use the consistent `job_id` property name (handled by Code mode during the fix).

**Files Modified:**

-   `app/api/crawl/route.ts`
-   `lib/types.ts` (Related type update)
-   `lib/crawl-service.ts` (Related type usage update)
-   `app/page.tsx` (Related type usage update)

**Required Action (Completed by User):** Rebuild frontend Docker image and restart services. Clear browser cache.