# FEATURE: UI Refinements & Consolidated Files Display

**Goal:** Improve the UI layout by cleaning up the old monitor, adjusting styles in the new queue, and ensuring crawled files appear in the Consolidated Files Browser.

**Tasks:**

1.  [ ] **Refactor `CrawlStatusMonitor`:**
    *   [ ] Modify `CrawlStatusMonitor.tsx` to remove the URL list rendering logic (checkboxes, status icons, etc.) and the associated props (`selectedUrls`, `isCrawlingSelected`, `onSelectionChange`, `onCrawlSelected`). Keep only the display for overall job status (ID, status string, times, error).
    *   [ ] Modify `app/page.tsx` to remove the now-unused props being passed to `CrawlStatusMonitor`.
2.  [ ] **Implement Popup/Overlay for Old Monitor:**
    *   [ ] Choose a suitable Shadcn UI component for a popup/overlay (e.g., `Dialog`, `Popover`, or `Sheet`). Install if necessary.
    *   [ ] Modify `app/page.tsx`:
        *   Wrap the rendering of the refactored `CrawlStatusMonitor` within the chosen popup component.
        *   Add a trigger button (e.g., Shadcn `Button` with an icon like `Info` or `History`) near the "Crawl Queue" section to open the popup.
        *   Remove the temporary heading and container div for the old monitor.
3.  [ ] **Style `CrawlUrls` Component:**
    *   [ ] Modify `components/CrawlUrls.tsx`: Add Tailwind CSS classes (`text-white` or similar) to the `TableCell` containing the URL string and potentially adjust checkbox styles for better visibility against the dark background. Also change the color of Pending Crawl to Yellow black text and Crawl completed to Green with white text. 
4.  [ ] **Integrate with `ConsolidatedFiles`:**
    *   [ ] Analyze `components/ConsolidatedFiles.tsx` to understand how it fetches and displays files.
    *   [ ] Ensure the polling mechanism or trigger that updates `ConsolidatedFiles.tsx` is working correctly after crawls complete. (This might already be functional based on the existing polling in `DiscoveredFiles.tsx` which `ConsolidatedFiles` likely mirrors).
    *   [ ] If necessary, modify `ConsolidatedFiles.tsx` or the relevant API endpoint (`/api/all-files`?) to ensure newly created consolidated files (like the `.md` file mentioned) are included in the list.
5.  [ ] **Testing & Verification:**
    *   [ ] Test the UI changes: Check popup behavior, text colors, and overall layout.
    *   [ ] Test file display: Run a crawl and verify the resulting `.md` file appears in the "Consolidated Files Browser".
6.  [ ] **Final Cleanup (Optional - Requires User Confirmation):**
    *   [ ] Once the new UI is confirmed working, potentially remove the now-redundant `CrawlStatusMonitor` component entirely if `JobStatsSummary` and `CrawlUrls` cover all needed info.
7.  [ ] **Seal Task (Requires User Confirmation):**
    *   [ ] Mark all tasks as complete and seal the feature upon user confirmation.