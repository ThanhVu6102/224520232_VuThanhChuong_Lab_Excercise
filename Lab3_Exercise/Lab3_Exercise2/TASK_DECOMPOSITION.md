# TASK DECOMPOSITION & WORK BREAKDOWN STRUCTURE (WBS)

**Course:** Web Application Development
**Lab:** Lab 03 - Modern React 19 Component Architecture (Vite)
**Exercise:** In-Class Sprint 2 - Interactive Scientist & Pioneer Directory
**Student Name:** Tran Vinh Khiem
**Student ID:** [Your MSSV]
**Estimated Time:** 45 - 120 minutes (In-Class Sprint 2 | 45 minutes)

---

## 1. Objective

Transform Slide 20's static `smartPeople` array (Goethe, Einstein, da Vinci, Newton, etc.)
into a **reactive data explorer**, using Lab 2's Reconciliation & Derived State principles.

## 2. The 4-Stage AI Decomposition Pipeline

- **Stage 1: Functional Slicing** - isolate the data schema, the derived pipeline, the mutation API.
- **Stage 2: Contract-First Specification** - define state + derived contracts before rendering code.
- **Stage 3: Atomic Generation** - one commit per isolated capability.
- **Stage 4: Independent Verification** - `Select-String` checkpoints, SSR markup audit, React DevTools Profiler.

## 3. Work Breakdown Structure (WBS)

| Task ID | Task Name | Description | Git Commit Message (Atomic) |
| :--- | :--- | :--- | :--- |
| **2.1** | **Normalize Data Schema** | Slide 20's `smartPeople` becomes `SMART_PEOPLE` with stable IDs (`sp-1`..`sp-6`). | `feat(ex2): normalize smartPeople schema with stable IDs` |
| **2.2** | **Derived Pipeline** | `useState` raw inputs (people/query/minIq/sortBy) + single-pass derived `visiblePeople`: case-insensitive name `includes`, `valueAsNumber` IQ filter `p.iq >= minIq`, ES2023 `toSorted` by IQ/age. `useId()` for label/input wiring. | `feat(ex2): add search, IQ filter & toSorted` |
| **2.3** | **Mutation & Live Status** | Immutable `handleDelete` (`prev.filter`), `handleReset` snapshot restore to `SMART_PEOPLE`, `<output role="status" aria-live="polite">` counter, empty-state message. | `feat(ex2): add delete/reset & live status` |

## 4. Mandatory Constraints Checklist

- [x] **Strict Derived-State Contract:** ZERO `useEffect` - all filtering/sorting computed on the fly in render.
- [x] **Single Source of Truth:** only raw independent inputs live in `useState`; `visiblePeople` computed on the fly.
- [x] **Type-Safe Numeric Filtering:** `e.target.valueAsNumber` keeps minIq numeric (never `<string> >= <number>`).
- [x] **Immutable Deletion & Restoration:** `setPeople(prev => prev.filter(...))`; reset restores `SMART_PEOPLE` snapshot.
- [x] **Accessibility:** `<label htmlFor>` + `useId()` bound to every input; count announced via `role="status"` + `aria-live="polite"`; delete buttons carry `aria-label="Delete <name>"`.
- [x] **React DevTools Profiler:** typing 1 search char triggers EXACTLY 1 render pass (no state-jump loops via useEffect).

## 5. Verification Log (Stage 4) - ex2-checkpoint2-verify.jsx

| # | Checkpoint | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `Select-String -Pattern "useEffect" src\components\ScientistDirectory.jsx` | 0 matches | 0 matches | Pass |
| 2 | SSR markup: default `SMART_PEOPLE` | "Found 6 pioneers", IQ-desc order: Goethe, Einstein, Sidis, Newton, Maxwell, da Vinci | Verified via SSR render | Pass |
| 3 | SSR markup: `initialData` with iq `< 160` | Filtered out: "Found 0 pioneers" + empty-state message | Verified via SSR render | Pass |
| 4 | SSR markup: `htmlFor` bound to `useId()` inputs | Every label/input pair shares an id | Verified via SSR render | Pass |
| 5 | React DevTools Profiler (manual) | 1 char typed = 1 render pass; focus preserved after delete | Manual step for student | Pending |
