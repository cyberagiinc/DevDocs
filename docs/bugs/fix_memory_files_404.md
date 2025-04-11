# BUG: Fix /api/memory-files 404 Error

## Problem Description

After merging the `patch-fix` branch into `main`, the application stopped working correctly. Backend logs show repeated `404 Not Found` errors for the `GET /api/memory-files` endpoint, indicating the frontend cannot access this resource.

**Backend Logs Snippet:**
```
2025-04-10 16:11:04 INFO:     172.18.0.5:53304 - "GET /api/memory-files HTTP/1.1" 404 Not Found
```

**Frontend Logs Snippet:**
```
2025-04-10 16:11:01 Using backend URL: http://backend:24125
```

## Investigation Plan (Delegated to Debug Mode)

1.  Analyze backend routing (`backend/app/main.py` and related files) to verify the existence and definition of the `/api/memory-files` endpoint.
2.  Analyze frontend code (components making API calls, e.g., `components/StoredFiles.tsx`, `lib/crawl-service.ts`) to confirm where `/api/memory-files` is called.
3.  Compare current code in `main` with the pre-merge state (using git history if possible) to identify changes related to this endpoint in both frontend and backend.
4.  Identify the specific code change(s) causing the 404 error.
5.  Propose a detailed implementation plan to fix the issue.

## Refined Implementation Plan (Incorporating Expert Opinion)

1.  **Enhanced Backend Diagnostics:** Modify backend to catch `/api/memory-files` requests, log detailed info (full path, method, headers, IP, timestamp, frequency).
2.  **Deep Frontend Code Audit:** Based on logs (`user_agent: node`), the issue is within the running Next.js application. Perform a thorough search across the *entire* frontend codebase (`app/`, `components/`, `lib/`, `hooks/`, server components, API routes, etc.) for any remaining references to `/api/memory-files`.
3.  **Build/Deployment Verification & Remediation:** If the code audit finds no references, investigate the frontend build process (`Dockerfile.frontend`, build scripts, `next build` output) and deployment for potential issues (e.g., stale build caches, incorrect artifact deployment). If references are found in code, remove/update them. Redeploy the frontend after fixing code or build issues.
4.  **(Recommended) Implement Deprecation Endpoint:** Add temporary backend route for `GET /api/memory-files` returning **HTTP 410 Gone** with JSON error message, `Deprecation`/`Sunset` headers. Set removal deadline. Continue logging hits.
5.  **Documentation & Communication:** Update this file, add API changelog entry with migration instructions (`/api/storage`), broadcast internally.
6.  **Monitoring & Cleanup:** Monitor 410 hits. Remove temporary endpoint after hits cease or deadline passes.

## Resolution Steps

*   **Step 1 (Enhanced Backend Diagnostics): Completed.** Added middleware in `backend/app/main.py` to log detailed info for requests hitting `/api/memory-files` before returning 404. (Code Mode Task)
*   **Log Analysis:** Logs confirm stale requests originate from the frontend container's Node.js process (`client_host: 172.18.0.5`, `user_agent: node`). This points to an issue within the running Next.js application or its build/deployment, not external clients or simple browser cache.
*   **Step 2 (Deep Frontend Code Audit): Completed.** Found active reference to `/api/memory-files` in `app/api/all-files/route.ts` line 93. (Debug Mode Task)
*   **Step 3 (Remediation): Completed.** Removed the stale `fetch` call to `/api/memory-files` from `app/api/all-files/route.ts`. (Code Mode Task)
*   **Verification:** Confirmed that after redeploying the frontend with the fix, the WARNING logs for `/api/memory-files` are no longer appearing in the backend.
*   *Original bug resolved. Skipping optional Step 4 (410 endpoint). Proceeding to completion.*