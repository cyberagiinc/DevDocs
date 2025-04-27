# Task List: Fix Consolidated Files Display (Backend First)

**Feature:** Resolve discrepancy between UI display and actual `storage/markdown` contents by ensuring the API only lists complete `.md`/`.json` pairs and that `.json` files are created correctly.

**Bug:** `docs/bugs/fix_consolidated_files_display.md`

**Approved Plan:**
1.  Investigate backend crawler (`backend/app/crawler.py`, `backend/app/main.py`) to confirm or implement correct `.json` metadata file creation *after* `.md` file saving and metadata extraction.
2.  Modify frontend API (`app/api/all-files/route.ts`) to:
    *   Remove `.json` file creation logic (side effect).
    *   Filter results to only include pairs where both `.md` and `.json` files exist.
    *   Add logging for skipped `.md` files (missing `.json`).
3.  Test the complete fix.
4.  Seal this task list upon user confirmation.

**Subtasks:**

*   [X] **1. Backend Investigation:**
    *   [X] 1.1. Read `backend/app/crawler.py`.
    *   [X] 1.2. Read `backend/app/main.py` (to see how crawler is invoked).
    *   [X] 1.3. Analyze code to locate `.md` saving, metadata extraction, and `.json` saving logic.
    *   [X] 1.4. Determine if `.json` creation exists and is correctly placed.
    *   [X] 1.5. Report findings to the user. (Done - No backend changes needed)
*   [X] **2. Backend Implementation (If Necessary):** (Skipped - Not necessary)
    *   [X] 2.1. Propose code changes to `backend/app/crawler.py` (or relevant module) to add/fix `.json` creation.
    *   [X] 2.2. Get user approval for backend changes.
    *   [X] 2.3. Apply approved backend changes.
*   [X] **3. Frontend API Modification:**
    *   [X] 3.1. Read `app/api/all-files/route.ts`.
    *   [X] 3.2. Propose code changes to filter results, remove `.json` creation, and add logging.
    *   [X] 3.3. Get user approval for frontend changes.
    *   [X] 3.4. Apply approved frontend changes.
*   [X] **4. Testing:**
    *   [X] 4.1. Guide user on testing steps (e.g., clear storage, run crawl, check UI, check API response).
*   [X] **5. Seal Task:**
    *   [X] 5.1. Mark all subtasks as complete.
    *   [ ] 5.2. Seal this markdown file.