# Feature: Fix Data Extracted Display in JobStatsSummary

**Objective:** Ensure the "Data Extracted" statistic in the `JobStatsSummary` component correctly displays the value (e.g., "11.02 KB") from the job status object when the job is completed, instead of showing "N/A".

**Tasks:**

1.  [ ] **Analyze Data Flow & Component Logic:**
    *   [ ] Read `components/JobStatsSummary.tsx` to understand how it receives and renders the `jobStatus` prop.
    *   [ ] Read `lib/types.ts` to check the `JobStatus` type definition, specifically for `data_extracted` or a similar field.
    *   [ ] (Optional) Read `components/CrawlStatusMonitor.tsx` or `app/page.tsx` if needed to trace the prop origin.
2.  [ ] **Identify Root Cause:** Determine why `data_extracted` is not being displayed (e.g., incorrect prop access, type mismatch, conditional rendering issue).
3.  [ ] **Propose Solutions:** Outline 1-2 ways to fix the issue based on the findings. Evaluate pros/cons and adherence to principles (YAGNI, KISS, etc.).
4.  [ ] **Implement Fix:**
    *   [ ] Apply the chosen fix to `components/JobStatsSummary.tsx`.
    *   [ ] (If necessary) Update type definitions in `lib/types.ts`.
5.  [ ] **Verify Fix (User):** User confirms the "Data Extracted" statistic displays correctly.
6.  [ ] **Seal Task:** Mark all tasks as complete and seal the feature upon user confirmation.

**Files Potentially Involved:**

*   `components/JobStatsSummary.tsx`
*   `lib/types.ts`
*   `components/CrawlStatusMonitor.tsx`
*   `app/page.tsx`