# Feature: Fix Frontend Build Environment Variable for Docker

**Objective:** Resolve the `net::ERR_NAME_NOT_RESOLVED` error for `http://backend:24125` by ensuring the `NEXT_PUBLIC_BACKEND_URL` environment variable is correctly passed during the Docker build process for the frontend service.

**Tasks:**

1.  [ ] **Read `docker-compose.yml`:** Examine the `frontend` service definition, specifically the `build.args` section.
    *   Tool: `read_file`
    *   Path: `docker-compose.yml`
2.  [ ] **Read `Dockerfile.frontend`:** Examine the Dockerfile used to build the frontend image.
    *   Tool: `read_file`
    *   Path: `Dockerfile.frontend`
3.  [ ] **Analyze Configuration:**
    *   Verify `docker-compose.yml` passes `NEXT_PUBLIC_BACKEND_URL` via `build.args` (e.g., `args: - NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}`).
    *   Verify `Dockerfile.frontend` declares `ARG NEXT_PUBLIC_BACKEND_URL` *before* the `RUN ... build` command.
    *   Verify `Dockerfile.frontend` correctly uses the ARG (Next.js usually handles `NEXT_PUBLIC_` automatically if declared).
4.  [ ] **Propose Solutions (if necessary):** Based on the analysis, determine the required changes.
    *   **Option 1:** Modify `docker-compose.yml` to correctly define the build argument.
    *   **Option 2:** Modify `Dockerfile.frontend` to correctly declare and/or use the build argument.
5.  [ ] **Apply Changes (if necessary):** Modify the relevant file(s) using the chosen solution.
    *   Tool: `apply_diff`
6.  [ ] **Final Report:** Summarize findings and actions taken. If changes were made, remind the user to rebuild the frontend container.
    *   Tool: `attempt_completion`

**Sealed:** No