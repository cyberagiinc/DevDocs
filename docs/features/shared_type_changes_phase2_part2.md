# Feature: Implement Shared Type Changes for HTTP Status Codes (Phase 2, Part 2)

**Objective:** Update shared TypeScript types in `lib/types.ts` to match the backend `UrlDetails` structure.

**Context:** Follows the approved plan in `docs/features/display_http_status_code_plan.md`. Backend changes are complete.

**Tasks:**

*   [ ] **Subtask 1: Define `UrlDetails` Interface:** Add the new `UrlDetails` interface to `lib/types.ts`.
    *   `interface UrlDetails { status: UrlStatus; statusCode: number | null; }`
*   [ ] **Subtask 2: Update `CrawlJobStatus` Interface:** Modify the `urls` property in the `CrawlJobStatus` interface in `lib/types.ts` to use `Record<string, UrlDetails>`.
*   [ ] **Subtask 3: Update `CrawlUrlsProps` Interface:** Modify the `urls` property in the `CrawlUrlsProps` interface in `lib/types.ts` to use `Record<string, UrlDetails>`.
*   [ ] **Subtask 4: Verify Changes:** Ensure only the specified type changes are made in `lib/types.ts`.
*   [ ] **Subtask 5: Seal Task:** Mark task as complete after user confirmation.

**Status:** Pending