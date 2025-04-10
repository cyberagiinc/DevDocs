# Feature: Fix Crawl Button Enablement and Checkbox Style (v3)

**User Story:** As a user, I need the "Crawl Selected" button to be enabled when I select pending URLs, and the corresponding checkboxes should look clearly interactive (not grayed out), so I can confidently initiate crawls for selected items.

**Tasks:**

1.  [ ] **Analyze `CrawlStatusMonitor.tsx`:** Read the latest version of the component file.
2.  [ ] **Fix Button Enablement Logic:**
    *   [ ] Identify the state variable(s) controlling the button's `disabled` attribute (`selectedUrls`, `isCrawlingSelected`, potentially derived state).
    *   [ ] Modify the logic (likely using `useMemo` for derived state) to ensure the button is disabled *only* if `selectedUrls` contains no URLs with status 'pending_crawl' OR if `isCrawlingSelected` is true.
    *   [ ] Verify the state update handler (`handleSelectUrl`) correctly triggers re-renders affecting the button state.
3.  [ ] **Fix Checkbox Styling:**
    *   [ ] Identify the `Checkbox` component rendering within the URL list.
    *   [ ] Modify the `className` prop (using `clsx` or similar) to conditionally apply visually "enabled" styles (e.g., `bg-white dark:bg-slate-100`) when `item.status === 'pending_crawl'`.
    *   [ ] Ensure no conflicting styles (e.g., unconditional `bg-gray-XXX`) override the desired appearance for enabled checkboxes.
4.  [ ] **Apply Changes:** Use `apply_diff` to implement both the logic and style fixes.
5.  [ ] **Attempt Completion:** Report the fixes to the user.
6.  [ ] **Seal Task (Pending User Confirmation):** Mark tasks as complete and seal the feature upon user confirmation.