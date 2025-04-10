# Feature: Create Crawl URLs Component

**Objective:** Refactor the URL list display and selection logic from `CrawlStatusMonitor` into a new, dedicated component `CrawlUrls` to improve clarity and address UI state issues.

**Status:** `Completed`

**Tasks:**

1.  [x] **Create Task List:** Define the steps required for implementation in this markdown file.
2.  [x] **Propose Solution & Alternatives:** Outline the plan for the new component and its integration, considering alternatives. (Provided in previous response, awaiting confirmation)
3.  [x] **Create `components/CrawlUrls.tsx`:**
    *   [x] Define component props (`urls`, `selectedUrls`, `onSelectionChange`, `onCrawlSelected`, `isCrawlingSelected`).
    *   [x] Implement UI using Shadcn `Table`, `Checkbox`, `Badge`, `Button`.
    *   [x] Render URL rows with status badges and conditional checkboxes.
    *   [x] Implement checkbox logic (`checked`, `onCheckedChange`).
    *   [x] Implement "Select All" functionality for 'pending_crawl' URLs.
    *   [x] Implement "Crawl Selected" button with count and disabled state logic.
4.  [x] **Read `app/page.tsx`:** Examine the current state management and where `CrawlStatusMonitor` is used.
5.  [x] **Integrate `CrawlUrls` into `app/page.tsx`:**
    *   [x] Import `CrawlUrls`.
    *   [x] Render `CrawlUrls` in the appropriate location.
    *   [x] Pass required props (`jobStatus.urls`, `selectedUrls`, handlers, `isCrawlingSelected`).
    *   [x] Ensure `handleSelectionChange` exists or create/update it.
6.  [x] **Read `components/CrawlStatusMonitor.tsx`:** Identify the code sections responsible for rendering the URL list, checkboxes, and status icons.
7.  [x] **Refactor `components/CrawlStatusMonitor.tsx`:**
    *   [x] Remove the identified URL list rendering logic.
    *   [x] Keep or adjust logic for displaying overall job status if needed.
8.  [x] **Verification:** Confirm the new component displays data correctly, selection works, the button triggers the action, and statuses update based on `jobStatus` polling.
9.  [x] **Seal Task:** Mark all tasks as complete and seal the feature upon user confirmation.

**Resolution:** The `CrawlUrls` component was successfully created in `components/CrawlUrls.tsx` and integrated into `app/page.tsx`. The URL list rendering logic was removed from `CrawlStatusMonitor.tsx`. This refactor resolved the UI state issues for checkboxes and status icons.