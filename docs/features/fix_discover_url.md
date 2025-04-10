# Feature: Fix Discover API Connection Refused Error

**Objective:** Correct the backend URL used by the frontend for the `POST /api/discover` request to resolve the `net::ERR_CONNECTION_REFUSED` error within the Docker environment. The URL should be changed from `http://localhost:24125` to `http://backend:24125`.

**Tasks:**

-   [x] **Task 1:** Locate the frontend code making the `POST /api/discover` request (in `lib/crawl-service.ts`).
-   [x] **Task 2:** Identify how the base URL (`http://localhost:24125`) is determined (via `NEXT_PUBLIC_BACKEND_URL` env var with fallback).
-   [x] **Task 3:** Propose solutions to use the correct URL (`http://backend:24125`).
    -   [x] Option 1: Modify environment variable configuration (Chosen).
    -   [ ] Option 2: Update hardcoded URL directly.
-   [x] **Task 4:** Implement the chosen solution (Updated `docker-compose.yml`).
-   [ ] **Task 5:** Verify the fix resolves the connection issue (User verification needed).
-   [ ] **Task 6:** Seal the feature upon user confirmation.

**Status:** In Progress