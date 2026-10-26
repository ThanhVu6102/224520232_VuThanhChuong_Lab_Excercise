# TASK DECOMPOSITION & WORK BREAKDOWN STRUCTURE (WBS)

**Course:** Web Application Development
**Lab:** Lab 03 - Modern React 19 Component Architecture (Vite)
**Exercise:** In-Class Sprint 2 - Pioneer Directory (Search, Filter & Sort)
**Student Name:** Vu Thanh Chuong
**Student ID:** 24520232
**Estimated Time:** 75 - 120 minutes (In-Class Sprint 2 | 30 minutes)

---

## 1. Objective

Build `<ScientistDirectory />` — a searchable, filterable, sortable pioneer
directory over the `SMART_PEOPLE` dataset — enforcing **Single Source of Truth**
raw inputs, **Pure Derived State** computed in one render pass (zero effect
hooks), the **Single-Source-of-Truth render cascade rule**, and Lab's
**100% `<label>` bindings** accessibility contract.

## 2. The 4-Stage AI Decomposition Pipeline

- **Stage 1: Functional Slicing** — Isolate the raw filter bar (search / min IQ /
  sort) from the derived list renderer.
- **Stage 2: Contract-First Specification** — Define state shape
  (`{ people, query, minIq, sortBy }`) and the derivation contract
  `raw inputs -> visiblePeople` BEFORE code.
- **Stage 3: Atomic Generation** — Prompt AI for exactly one unit at a time
  (directory component → bindings → empty state).
- **Stage 4: Independent Verification** — Validate via Chrome DevTools
  (label bindings, Profiler single-commit render, 375px layout).

## 3. Work Breakdown Structure (WBS)

| Task ID | Task Name | Description | Git Commit Message (Atomic) |
| :--- | :--- | :--- | :--- |
| **2.1** | **Dataset & State Contract** | `SMART_PEOPLE` schema (`id`/`name`/`age`/`iq`), single source of truth `useState` inputs (`people`, `query`, `minIq`, `sortBy`), `initialData` prop default for immutable Reset. | `feat(ex2): implement scientist directory with single source of truth` |
| **2.2** | **Pure Derived State Pipeline** | `visiblePeople` computed inline in 1 render pass: name `includes(query.trim().toLowerCase())` filter → `iq >= minIq` filter → `.toSorted()` sort variants (`iq-desc`, `iq-asc`, `age-asc`), with ZERO effect hooks. | `feat(ex2): add pure derived filter and sort pipeline` |
| **2.3** | **Accessible Filter Bar** | `useId()`-generated ids with **100% `<label>` htmlFor bindings**, `<form role="search">` landmark, type-safe `valueAsNumber` IQ handler, `type="button"` Reset. | `feat(ex2): add accessible filter bar with useId labels` |
| **2.4** | **Live Counter & List Rendering** | `<output role="status" aria-live="polite">` "Found N pioneers" counter, stable `key={p.id}` rows, immutable delete via `prev.filter`, dynamic `aria-label` delete buttons, empty-state message. | `feat(ex2): add live counter and immutable delete/restore` |
| **2.5** | **App Shell Integration** | `src/main.jsx` + `src/App.jsx` (renders `<ScientistDirectory />`). | `feat(ex2): integrate directory into app shell` |
| **2.6** | **Documentation & Audit** | `PROJECT_RULES.md`, `TASK_DECOMPOSITION.md`, `AI_FAILURE_AUDIT.md` with minimum 3 documented AI-generated bugs. | `docs(ex2): add project rules, WBS and AI failure audit` |

Final `git log --oneline --graph` must contain **6–8 atomic commits** matching this WBS.

## 4. Mandatory Constraints Checklist

- [x] **Strict Render Cascade Rule:** filtering + sorting computed during render,
      ONE pass, ZERO `useEffect` for derived state.
- [x] **Single Source of Truth:** only 4 raw-input `useState` declarations.
- [x] **100% `<label>` Bindings:** all 3 controls bound via `useId()`-based `htmlFor`.
- [x] **A11y:** `role="search"` form, `<output aria-live="polite">` counter,
      dynamic `aria-label` delete buttons, explicit empty-state message.
- [x] **Immutable Updates:** delete = `prev => prev.filter(...)`; Reset restores
      `initialData` and clears controls; never mutating state arrays.
- [x] **Type-Safe Numeric Input:** `valueAsNumber` + `Number.isNaN` guard.
- [x] **Deprecation Audit (Lab 2 rules):** NO `var`, NO `innerHTML`, NO inline `onclick` handlers.

## 5. Verification Log (Stage 4) - DevTools Audit

| # | Checkpoint | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | DevTools → Elements: `<label for>` ≠ empty | 100% bindings on search/IQ/sort | 3/3 bound via `useId()` | Pass |
| 2 | React DevTools Profiler: retype query | 1 commit per keystroke (derived state, no cascade) | 1 commit per keystroke | Pass |
| 3 | DevTools → Accessibility Tree | `role="search"` form + live `<output>` status | search + status announced | Pass |
| 4 | Delete then Reset | Row removed immutably; Reset restores 6 pioneers + clears filters | Works as expected | Pass |
| 5 | Min IQ = string-coercion trap | `valueAsNumber` keeps `minIq` a number | Numeric compare correct | Pass |
| 6 | 375px layout (iPhone SE) | Zero horizontal scroll | Layout fits 375px | Pass |
| 7 | `npm run build` | Build passes, zero warnings | 0 errors | Pass |
| 8 | `git log` (atomic commits matching WBS) | 6–8 atomic commits | Commits match Tasks 2.1–2.6 | Pass |
