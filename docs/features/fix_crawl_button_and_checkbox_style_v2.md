# Feature: Fix Crawl Button Enablement and Checkbox Style (Attempt 2)

**Objective:** Correct the logic that enables the "Crawl Selected" button when pending URLs are checked and fix the visual styling of enabled checkboxes to make them clearly interactive.

**Tasks:**

1.  [ ] **Analyze `CrawlStatusMonitor.tsx`:** Read the current content of the file to understand the existing state management and rendering logic for the button and checkboxes.
2.  [ ] **Identify Button Logic Flaw:** Pinpoint the exact code responsible for calculating whether any *selected* URL has the status 'pending_crawl'. Verify how the `isAnyPendingSelected` state (or equivalent) is updated and used by the button.
3.  [ ] **Identify Checkbox Style Flaw:** Examine the CSS/Tailwind classes applied to enabled checkboxes (for 'pending_crawl' status) and identify why they appear gray instead of white/interactive. Check for conflicting or overriding styles.
4.  [ ] **Propose Solutions:** Define at least two potential approaches to fix both the button logic and checkbox style.
5.  [ ] **Select and Implement Solution:** Choose the most appropriate solution based on simplicity and robustness (YAGNI, KISS, SOLID, DRY). Use `apply_diff` to implement the necessary code changes.
6.  [ ] **Verify Fixes:** (Manual step by user) Confirm that the button now enables correctly when pending URLs are selected and that the enabled checkboxes have the correct visual appearance.
7.  [ ] **Seal Task:** (After user confirmation) Mark this task list as complete.

**File:** `docs/features/fix_crawl_button_and_checkbox_style_v2.md`