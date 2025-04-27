# Task List: Debug Discovery Timeout on Page Refresh

**Bug:** During the discovery phase, refreshing the browser page causes the backend to log timeout errors for link discovery tasks (e.g., `Timeout waiting for link discovery result...`) and mark URLs with `discovery_error`. This indicates a problem with state persistence or backend task handling across frontend refreshes.

**Reference:** `docs/features/kill_switch_and_persistence_plan.md` (Sections 2.3, 1.3)

**Status:** Pending Investigation

**Subtasks:**

1.  [ ] **Analyze Persistence/Backend Logic:** Review `docs/features/kill_switch_and_persistence_plan.md`, `backend/app/crawler.py` (specifically the discovery task waiting logic), and `backend/app/status_manager.py` to understand how ongoing tasks and frontend refreshes are intended to be handled.
2.  [ ] **Hypothesize Cause:** Formulate specific hypotheses based on the analysis (e.g., frontend polling issue, backend task timeout handling, external service interaction).
3.  [ ] **Propose Debugging Steps:** Suggest concrete actions to verify hypotheses (e.g., add backend logging, review specific code sections).
4.  [ ] **Get User Approval:** Present findings and proposed debugging steps.
5.  [ ] **Implement Debugging Step:** Execute the approved step (e.g., add logs using `apply_diff`).
6.  [ ] **User Testing & Feedback:** Request user to reproduce the issue and provide logs/observations.
7.  [ ] **Analyze Results & Iterate:** Based on feedback, refine hypotheses and continue debugging until the root cause is found.
8.  [ ] **Propose Fix:** Once the cause is identified, propose a code fix.
9.  [ ] **Implement Fix:** Apply the approved fix.
10. [ ] **Confirm Fix:** User confirms the issue is resolved.
11. [ ] **Seal Task:** Mark this task as complete.