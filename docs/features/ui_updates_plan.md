# Feature: UI Updates (Data Display, Titles, Component Removal)

This plan outlines the steps to address specific UI update requests: fixing the "Data Extracted" display, renaming component titles, and removing the Markdown output section.

## Task List

1.  **[ ] Fix "Data Extracted" Display in `JobStatsSummary.tsx`**
    *   [ ] Read `lib/types.ts` to verify `CrawlJobStatus` structure.
    *   [ ] Read `components/JobStatsSummary.tsx` to analyze current prop access for `data_extracted_size`.
    *   [ ] Propose and apply fix to correctly display `status.data_extracted_size`.
2.  **[ ] Rename Component Titles**
    *   [ ] Read `components/CrawlStatusMonitor.tsx` to locate "Job Status" title.
    *   [ ] Propose and apply change to "Discovered Pages" in `components/CrawlStatusMonitor.tsx`.
    *   [ ] Read `components/JobStatsSummary.tsx` to locate "Processing Summary" title.
    *   [ ] Propose and apply change to "Statistics" in `components/JobStatsSummary.tsx`.
3.  **[ ] Remove "Extracted Content" Section (`MarkdownOutput`)**
    *   [ ] Read `app/page.tsx` to locate the `<MarkdownOutput ... />` component usage.
    *   [ ] Propose and apply change to remove the `MarkdownOutput` component instance from `app/page.tsx`.
4.  **[ ] Seal Tasks**
    *   [ ] Confirm all changes are working as expected with the user.
    *   [ ] Mark all tasks as complete and seal the feature.

## Files to Modify

*   `components/JobStatsSummary.tsx`
*   `components/CrawlStatusMonitor.tsx`
*   `app/page.tsx`
*   `docs/features/ui_updates_plan.md` (This file)

## Verification

*   Check the UI after changes to confirm:
    *   "Data Extracted" shows a value like '11.02 KB' when available.
    *   The timeline component title is "Discovered Pages".
    *   The statistics component title is "Statistics".
    *   The markdown output section is no longer visible.