# Task List: Apply Global Fix for Crawl4ai Browser Crash

This plan outlines the steps to apply a configuration change directly to the main `docker-compose.yml` file to potentially fix the browser crashing issue within the `crawl4ai` service container. This change will affect all users of this configuration file.

## Feature: Global Crawl4ai Configuration Change

### Task 1: Modify `docker-compose.yml`
- **Goal:** Add the necessary environment variable to the `crawl4ai` service definition.
- **Action:** Edit `docker-compose.yml` to add the following under `services.crawl4ai.environment`:
  ```diff
  +      # Attempt to pass browser arguments via environment variables
  +      # Add --disable-gpu to address potential GPU-related crashes in headless mode
  +      - PLAYWRIGHT_CHROMIUM_LAUNCH_ARGS=--disable-gpu --no-sandbox
  ```
- **Status:** Pending

### Task 2: Apply Changes and Verify
- **Goal:** Instruct the user on how to apply the change and test the fix.
- **Action:** Provide instructions to restart Docker Compose and re-run the crawl operation.
- **Status:** Pending