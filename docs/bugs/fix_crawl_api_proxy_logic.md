# Task List: Fix /api/crawl Next.js API Route Proxy Logic

**Feature:** Correct the proxy behavior of the `/api/crawl` Next.js API route.

**Objective:** Modify the `app/api/crawl/route.ts` handler to correctly forward requests to the backend service (`http://backend:24125/api/crawl`) and return the backend's exact JSON acknowledgment response to the frontend.

**Tasks:**

1.  [ ] **Read File:** Read the current content of `app/api/crawl/route.ts`.
2.  [ ] **Analyze Code:** Identify the incorrect response handling logic within the `POST` function.
3.  [ ] **Propose Fix:** Define the corrected `POST` function logic according to the requirements (fetch backend, parse response, return backend response).
4.  [ ] **Apply Fix:** Use `apply_diff` to update `app/api/crawl/route.ts` with the corrected logic.
5.  [ ] **Attempt Completion:** Report the successful fix and remind the user to rebuild/restart the frontend service.
6.  [ ] **Seal Task:** Mark task as complete upon user confirmation.

**Status:** Pending