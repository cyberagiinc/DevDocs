# Feature: Create Crawl Status API Route

**Objective:** Create a Next.js API route (`/api/crawl-status/[job_id]`) to proxy crawl status requests from the frontend to the backend service.

**Tasks:**

1.  [ ] **Create File:** Create the file `app/api/crawl-status/[job_id]/route.ts`.
2.  [ ] **Implement GET Handler:**
    *   Import `NextResponse`.
    *   Define `GET` function with `request: Request` and `params: { job_id: string }`.
    *   Extract `job_id`.
    *   Define `INTERNAL_BACKEND_URL` using `process.env.BACKEND_URL` or a default.
    *   Add logging for incoming request and backend URL.
    *   Implement `fetch` call to `${INTERNAL_BACKEND_URL}/api/crawl-status/${job_id}`.
    *   Add `cache: 'no-store'` to the fetch options.
    *   Implement robust error handling for the fetch call (check `response.ok`, log errors).
    *   Parse successful JSON response.
    *   Return parsed data using `NextResponse.json(data)`.
    *   Return error response using `NextResponse.json({ error: '...' }, { status: ... })` on fetch failure.
    *   Wrap fetch logic in `try...catch` for network/other errors, returning 500 status.
3.  [ ] **Verify Implementation:** Ensure code adheres to Next.js API route conventions and instructions.
4.  [ ] **Seal Task:** Mark tasks as complete upon user confirmation.

**Status:** Pending