# Task: Fix Frontend Dockerfile NEXT_PUBLIC_BACKEND_URL Configuration

**Feature:** Docker Configuration Fix
**Status:** Open

**Description:** The `Dockerfile.frontend` incorrectly overrides the `NEXT_PUBLIC_BACKEND_URL` build argument (`ARG`) with a hardcoded `ENV` instruction, causing the frontend to use the wrong backend URL. This task aims to remove the incorrect `ENV` instruction(s) so the `ARG` value is correctly used during the build.

**Subtasks:**

-   [x] 1. Create a markdown task list file (`docs/features/fix_frontend_build_env_var_plan.md`).
-   [x] 2. Read the content of `docker/dockerfiles/Dockerfile.frontend`.
-   [x] 3. Identify the specific `ENV NEXT_PUBLIC_BACKEND_URL` line(s) causing the override.
-   [x] 4. Propose solution options (using `apply_diff` vs. `write_to_file`).
-   [x] 5. Get user approval for the chosen solution (`apply_diff`).
-   [x] 6. Apply the fix using `apply_diff` to remove the incorrect `ENV` line(s).
-   [x] 7. Mark the task as complete and notify the user about rebuilding the image.
-   [ ] 8. Seal the task upon user confirmation.

**File:** `docs/features/fix_frontend_build_env_var_plan.md`