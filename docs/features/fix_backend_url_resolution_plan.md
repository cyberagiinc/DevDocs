# Feature: Fix Backend URL Resolution Error

**Goal:** Provide the user with commands and explanations to perform a comprehensive cleanup and rebuild process to resolve the `net::ERR_NAME_NOT_RESOLVED` error by ensuring the correct backend URL is used in the frontend build.

**Tasks:**

1.  [X] Create this markdown task list file (`docs/features/fix_backend_url_resolution_plan.md`).
2.  [ ] Formulate the sequence of commands and explanations as requested by the user.
    *   `docker-compose down` (Stop/remove containers)
    *   `rm -rf .next` (Remove Next.js cache)
    *   `docker-compose build --no-cache frontend` (Force rebuild frontend without Docker cache)
    *   `docker-compose up -d` (Restart services)
    *   Instruction to clear browser cache (hard refresh + clear site data) *after* containers are running.
    *   Explanation linking these steps to resolving the caching issue and using the correct `.env` variable.
3.  [ ] Use the `attempt_completion` tool to present the final instructions to the user.
4.  [ ] (User Confirmation Required) Seal this task list once the user confirms the instructions are clear and the issue is potentially resolved.