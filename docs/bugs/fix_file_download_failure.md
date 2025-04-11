# BUG: File Download Failure from UI

**Goal:** Investigate and fix the issue causing `.md` and `.json` file downloads initiated from the UI (likely the Consolidated Files Browser) to fail.

**Status:** Completed

**Symptoms:**
*   User clicks download button for a `.md` or `.json` file in the UI.
*   Browser attempts download, but it fails, showing "Failed to Download" in the downloads list (as per user screenshot).

**Root Cause:**
*   The frontend component (`ConsolidatedFiles.tsx`) was sending the file identifier using the query parameter `file_path`.
*   The backend API route handler (`app/api/storage/download/route.ts`) was incorrectly expecting the query parameter to be named `path`. This mismatch caused the backend to fail in retrieving the correct file path from the request URL.

**Fix:**
*   Modified the backend API route handler (`app/api/storage/download/route.ts`) to correctly read the query parameter named `file_path` instead of `path`.

**Verification:**
*   Debug mode confirmed that after applying the fix and rebuilding the Docker image, file downloads initiated from the UI are now working successfully.

**History:**
*   **[Timestamp]**: User reported file download failures with screenshot. Bug tracking file created.
*   **[Timestamp]**: Delegated investigation and fix to Debug mode.
*   **[Timestamp]**: Debug mode identified query parameter mismatch (`path` vs `file_path`) in `app/api/storage/download/route.ts` as the root cause.
*   **[Timestamp]**: Debug mode corrected the parameter name in the route handler. Fix verified.