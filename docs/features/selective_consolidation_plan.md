# Feature Plan: Selective URL Consolidation

**Objective:** Implement a two-step process where users first discover URLs and then selectively choose which URLs to crawl and consolidate into a single file per job.

**Workflow:**

1.  **Discovery:** User enters a URL and depth, clicks "Discover".
    *   Backend (`/api/discover` -> `discover_pages`) finds all reachable internal URLs within the specified depth.
    *   Backend updates job status with discovered URLs, marking them as `pending_crawl`.
    *   **Important:** Backend `discover_pages` function will *not* fetch content or perform consolidation during this phase.
    *   Frontend (`CrawlStatusMonitor`) polls for job status and displays the list of discovered URLs once the status is `discovery_complete`.
2.  **Selection:**
    *   Frontend displays checkboxes next to each discovered URL in the `CrawlStatusMonitor` (or a similar component).
    *   Frontend provides a "Select All" checkbox.
    *   Frontend enables a "Crawl Selected" button when at least one URL is checked.
3.  **Selective Crawl & Consolidation:**
    *   User clicks "Crawl Selected".
    *   Frontend sends the `jobId` and the list of selected URLs to the backend (`/api/crawl`).
    *   Backend (`/api/crawl` -> `crawl_pages`) receives the request.
    *   Backend `crawl_pages` function iterates *only* through the selected URLs:
        *   Updates the URL status to `crawling`.
        *   Calls the `crawl4ai` service to fetch content for the URL.
        *   Polls for the result.
        *   If successful, appends the fetched markdown content to the job's consolidated file (`storage/markdown/<root_url_filename>.md`).
        *   Updates the job's consolidated metadata file (`storage/markdown/<root_url_filename>.json`).
        *   Updates the URL status to `completed`.
        *   If fetching/processing fails, updates the URL status to `crawl_error`.
    *   Backend updates the overall job status (`completed` or `completed_with_errors`) when all selected URLs are processed.
4.  **Display Results:**
    *   Frontend implements a `ConsolidatedFiles` component (similar to the provided image).
    *   This component appears when a job is finished.
    *   It reads the metadata (`.json`) for the job's consolidated file.
    *   It displays details: filename (derived from root URL), number of pages consolidated, total size, last updated time.
    *   It provides buttons to view the raw markdown and JSON metadata. (Download functionality can be added later).
    *   Frontend implements a statistics display area showing "Subdomains Parsed", "Pages Crawled" (updated after selective crawl), "Data Extracted" (updated after selective crawl), and "Errors Encountered".

---

**Implementation Steps & Subtasks:**

**1. Backend Refinement (`backend/app/crawler.py`)**
    *   **Modify `discover_pages` function:**
        *   [x] Remove `requests.post` call to `/crawl` endpoint (lines ~221-230).
            > Changes: `backend/app/crawler.py`, Lines [185-213] (Removed call and related logic)
        *   [x] Remove polling loop (`for attempt in range(max_attempts):`) (lines ~249-373).
            > Changes: `backend/app/crawler.py`, Lines [185-213] (Removed call and related logic)
        *   [x] Remove file writing logic (saving `.md` and `.json`) (lines ~270-358).
            > Changes: `backend/app/crawler.py`, Lines [215-219] (Removed placeholder comment block), Line [233] (Removed syntax error)
        *   [x] Ensure URL status is updated to `pending_crawl` after successful discovery (modify line ~267).
            > Changes: `backend/app/crawler.py`, Line [212] (Status update confirmed)
        *   [x] Ensure overall status is updated to `discovery_complete` at the end of the root call (line ~460).
            > Changes: `backend/app/crawler.py`, Line [312] (Status update confirmed)
        *   [x] Add logging to confirm content fetching is skipped.
            > Changes: `backend/app/crawler.py`, Line [188] (Added log message)
    *   **Modify `crawl_pages` function:**
        *   [x] Verify function iterates *only* over URLs passed in the `pages` argument. (Check loop starting line ~357).
            > Changes: `backend/app/crawler.py`, Lines [357] (Verification only - OK)
        *   [x] Confirm `requests.post` call to `/crawl` is present and correct (lines ~388-396).
            > Changes: `backend/app/crawler.py`, Lines [388-396] (Verification only - OK)
        *   [x] Confirm polling loop is present and correct (lines ~402-527).
            > Changes: `backend/app/crawler.py`, Lines [402-527] (Verification only - OK)
        *   [x] Confirm logic for appending to `.md` file exists and uses `root_task_id` (lines ~450-471).
            > Changes: `backend/app/crawler.py`, Lines [450-471] (Verification only - OK)
        *   [x] Confirm logic for updating `.json` metadata exists and uses `root_task_id` (lines ~473-510).
            > Changes: `backend/app/crawler.py`, Lines [473-510] (Verification only - OK)
        *   [x] Confirm URL status updates (`crawling`, `completed`, `crawl_error`) are correct (lines ~364, ~572, ~519, ~532, ~582, ~588, ~596).
            > Changes: `backend/app/crawler.py`, Lines [...] (Verification only - OK)
        *   [x] Confirm overall job status update (`completed` or `completed_with_errors`) is correct (lines ~615-616).
            > Changes: `backend/app/crawler.py`, Lines [615-616] (Verification only - OK)
        *   [x] Add robust `try...except` blocks around file I/O operations (appending `.md`, writing `.json`) with specific logging.
            > Changes: `backend/app/crawler.py`, Lines [467-471], [477-484], [507-512] (Added try/except blocks)

**2. Frontend UI (`components/CrawlStatusMonitor.tsx`)**
    *   [x] Add state variable for selected URLs (e.g., `useState<Set<string>>(new Set())`).
        > Changes: `components/CrawlStatusMonitor.tsx`, Line [27]
    *   [x] Add state variable for "Select All" checkbox status (e.g., `useState<boolean>(false)`).
        > Changes: `components/CrawlStatusMonitor.tsx`, Line [28]
    *   [x] Modify the URL list rendering (`.map` function around line ~175):
        *   [x] Add a checkbox input before each URL. Its `checked` state should depend on the selected URLs state. Its `onChange` should call `handleCheckboxChange`.
            > Changes: `components/CrawlStatusMonitor.tsx`, Lines [249-255]
        *   [x] Conditionally render checkboxes only when `status.overall_status === 'discovery_complete'`.
            > Changes: `components/CrawlStatusMonitor.tsx`, Line [248] (Uses `isCrawlable` flag)
    *   [x] Add a "Select All" checkbox above the URL list. Its `checked` state depends on the select all state. Its `onChange` should call `handleSelectAllChange`. Conditionally render only when `status.overall_status === 'discovery_complete'`.
        > Changes: `components/CrawlStatusMonitor.tsx`, Lines [218-230]
    *   [x] Add a "Crawl Selected (`selectedCount`/`totalCount`)" button below the URL list. It should be disabled if `selectedCount === 0`. Its `onClick` should call `handleCrawlSelectedClick`. Conditionally render only when `status.overall_status === 'discovery_complete'`.
        > Changes: `components/CrawlStatusMonitor.tsx`, Lines [218-238]

**3. Frontend Logic (`components/CrawlStatusMonitor.tsx`)**
    *   [x] Implement `handleCheckboxChange(url: string)` function: Update the selected URLs state (add/remove URL). Update "Select All" state based on whether all URLs are now selected.
        > Changes: `components/CrawlStatusMonitor.tsx`, Lines [113-127]
    *   [x] Implement `handleSelectAllChange(isChecked: boolean)` function: Update selected URLs state (add all or clear all). Update "Select All" state.
        > Changes: `components/CrawlStatusMonitor.tsx`, Lines [129-138]
    *   [x] Implement `handleCrawlSelectedClick()` function:
        *   [x] Get the array of selected URLs from the state.
            > Changes: `components/CrawlStatusMonitor.tsx`, Line [154]
        *   [x] Get the current `jobId`.
            > Changes: `components/CrawlStatusMonitor.tsx`, Line [141]
        *   [x] Call `crawlPages({ jobId, pages: selectedUrlsAsDiscoveredPageObjects })` from `lib/crawl-service.ts`. (Note: May need to format URLs into `DiscoveredPage` objects if required by the service function).
            > Changes: `components/CrawlStatusMonitor.tsx`, Lines [154-158], [163]
        *   [x] Add basic logging or toast notification for crawl initiation request.
            > Changes: `components/CrawlStatusMonitor.tsx`, Lines [146-150], [166-170], [179-183]
        *   [x] Consider disabling the button after clicking to prevent multiple submissions.
            > Changes: `components/CrawlStatusMonitor.tsx`, Lines [145], [185], [233], [236]

**4. Consolidated File Display Component (`components/ConsolidatedFiles.tsx`)**
    *   [x] Create the new file `components/ConsolidatedFiles.tsx`.
        > Changes: New file `components/ConsolidatedFiles.tsx`
    *   [x] Define component props (e.g., `jobId: string | null`, `rootUrl: string | null`, `jobStatus: OverallStatus | null`).
        > Changes: `components/ConsolidatedFiles.tsx`, Lines [19-23]
    *   [x] Add state for metadata (e.g., `useState<Metadata | null>(null)`).
        > Changes: `components/ConsolidatedFiles.tsx`, Line [25]
    *   [x] Add `useEffect` hook that triggers when `jobStatus` is `completed` or `completed_with_errors`.
        > Changes: `components/ConsolidatedFiles.tsx`, Lines [32-70]
    *   [x] Inside `useEffect`:
        *   [x] Check if `jobId` and `rootUrl` are available.
            > Changes: `components/ConsolidatedFiles.tsx`, Line [34]
        *   [x] Derive the expected filename using a helper function (needs `url_to_filename` logic ported or called via API).
            > Changes: `components/ConsolidatedFiles.tsx`, Line [44] (Imported from `lib/utils.ts`)
        *   [x] Fetch the `.json` metadata content using `/api/storage/file-content?file_path=<filename>.json`.
            > Changes: `components/ConsolidatedFiles.tsx`, Lines [48-51]
        *   [x] Parse the JSON and update the metadata state.
            > Changes: `components/ConsolidatedFiles.tsx`, Lines [58-63]
        *   [x] Handle fetch errors.
            > Changes: `components/ConsolidatedFiles.tsx`, Lines [52-56], [64-67]
    *   [x] Render the component structure based on the provided image.
        > Changes: `components/ConsolidatedFiles.tsx`, Lines [118-168]
    *   [x] Display data from the metadata state (filename/project name, pages count, size, last updated). Size might need separate calculation or be added to metadata.
        > Changes: `components/ConsolidatedFiles.tsx`, Lines [110-113], [136-146]
    *   [x] Implement view buttons linking to `/api/storage/file-content?file_path=<filename>.md` and `.json`.
        > Changes: `components/ConsolidatedFiles.tsx`, Lines [114-116], [148-154]

**5. Integrate `ConsolidatedFiles` (`app/page.tsx`)**
    *   [x] Import the `ConsolidatedFiles` component.
        > Changes: `app/page.tsx`, Line [15]
    *   [x] Pass necessary props (`jobId`, `rootUrl`, `jobStatus`) from the main page state to `ConsolidatedFiles`.
        > Changes: `app/page.tsx`, Lines [393-395]
    *   [x] Conditionally render `ConsolidatedFiles` when a job is finished (`completed` or `completed_with_errors`).
        > Changes: `app/page.tsx`, Line [392] (Implicit via props)

**6. Stats Display Component**
    *   [x] Identify or create a component for the stats display (e.g., `components/JobStatsSummary.tsx`).
        > Changes: New file `components/JobStatsSummary.tsx`
    *   [x] Pass `jobStatus` and potentially the consolidated file metadata as props.
        > Changes: `components/JobStatsSummary.tsx`, Lines [15-18]
    *   [x] Display "Subdomains Parsed" (count of URLs in `jobStatus.urls`).
        > Changes: `components/JobStatsSummary.tsx`, Line [25], [41-46]
    *   [x] Display "Pages Crawled" (count of URLs with status `completed` in `jobStatus.urls` *after* crawl).
        > Changes: `components/JobStatsSummary.tsx`, Line [26], [49-55]
    *   [x] Display "Data Extracted" (fetch size from metadata or calculate from `.md` file).
        > Changes: `components/JobStatsSummary.tsx`, Line [31], [58-64] (Placeholder 'N/A' used)
    *   [x] Display "Errors Encountered" (count of URLs with `discovery_error` or `crawl_error` status).
        > Changes: `components/JobStatsSummary.tsx`, Line [27], [67-73]
    *   [x] Integrate this component into `app/page.tsx`.
        > Changes: `app/page.tsx`, Line [6], [347] (Replaced `ProcessingBlock`)

---