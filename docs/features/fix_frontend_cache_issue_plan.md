# Task List: Fix Frontend Docker Cache Issue

**Feature:** Ensure a clean Next.js build cache in the frontend Docker image.

**Objective:** Modify `Dockerfile.frontend` to explicitly remove the `.next` directory before the build step to prevent stale configuration issues.

**Tasks:**

-   [ ] 1. Read the current content of `docker/dockerfiles/Dockerfile.frontend`.
-   [ ] 2. Propose solutions for clearing the cache.
-   [ ] 3. Apply the chosen fix using `apply_diff` to insert `RUN rm -rf .next` before `RUN npm run build`.
-   [ ] 4. Confirm the change with the user.
-   [ ] 5. Use `attempt_completion` to finalize the task and provide instructions for rebuilding/restarting.
-   [ ] 6. Seal the task upon user confirmation of completion.