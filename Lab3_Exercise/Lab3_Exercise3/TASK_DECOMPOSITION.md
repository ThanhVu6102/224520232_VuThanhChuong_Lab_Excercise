# TASK DECOMPOSITION & WORK BREAKDOWN STRUCTURE (WBS)

**Course:** Web Application Development
**Lab:** Lab 03 - Modern React 19 Component Architecture (Vite)
**Exercise:** In-Class Sprint 3 - KRAFTON PUBG Vietnam Series (PVS) Live Telemetry
**Student Name:** Vu Thanh Chuong
**Student ID:** 24520232
**Estimated Time:** 120 - 155 minutes (In-Class Sprint 3 | 35 minutes)

---

## 1. Objective

Build `<PubgMatchTelemetry />` — a fault-tolerant live esports radar tracking
Vietnam's top PUBG pro squads (Cerberus Esports, The Expendables, Genius Esports) —
using a **4-state finite state machine (`IDLE | LOADING | SUCCESS | ERROR`)**, an
**`AbortController`-based cleanup pipeline**, and a **retry recovery flow**, all
under Lab 2's Zero Div-Soup Mandate.

## 2. The 4-Stage AI Decomposition Pipeline

- **Stage 1: Functional Slicing** — Isolate the FSM contract, the mock Telemetry
  API (`pubgApi.js`), the Skeleton renderer, and the Telemetry view component.
- **Stage 2: Contract-First Specification** — Define the 4-state machine shape
  `{ status, data, error }` and the fetch contract `(squadId, { signal })` before code.
- **Stage 3: Atomic Generation** — Prompt AI for exactly one unit at a time
  (contract → service → skeleton → component → styles).
- **Stage 4: Independent Verification** — Validate via Chrome DevTools
  (Slow 3G throttling, Network cancellation log, 375px layout).

## 3. Work Breakdown Structure (WBS)

| Task ID | Task Name | Description | Git Commit Message (Atomic) |
| :--- | :--- | :--- | :--- |
| **3.0** | **Config & Shell** | Vite project scaffolding for Ex 3: `package.json` (React 19.3.1 + lockfile), `vite.config.js`, `index.html` (`<section id="root">` mount), `.gitignore`, `main.jsx` (StrictMode entry), `App.jsx`, `global.css`. | `chore: scaffold Vite React 19 project shell for PVS telemetry` |
| **3.1** | **4-State FSM Contract** | `src/types/telemetryMachine.js`: TypeScript-compatible JSDoc typedefs (`TelemetryStatus: 'IDLE' \| 'LOADING' \| 'SUCCESS' \| 'ERROR'`, `TelemetryView`, `SquadTelemetry`), frozen `FSM_STATES`, frozen `initialView`, `makeView` builder. | `feat(state): define 4-state finite state machine contract` |
| **3.2** | **Mock Telemetry API** | `src/services/pubgApi.js`: `PUBG_VN_SQUADS` dataset (CES / TE / GE) + `fetchKraftonPubgTelemetry(squadId, { signal })` simulating 1.5s latency via `setTimeout` + `Promise`, 35% packet-loss rejection, and `AbortSignal` listener raising `AbortError`. | `feat(api): implement mock async fetch with error handling` |
| **3.3** | **Skeleton Loading Screen** | `src/components/TelemetrySkeleton.jsx` (220px pulsing card, `aria-busy="true"`) + module-scoped `pulse` keyframes in `PubgMatchTelemetry.module.css`. | `feat(ui): implement skeleton loading screen` |
| **3.4** | **Multi-State Data Component** | `src/components/PubgMatchTelemetry.jsx`: FSM wiring — selector click → `setView({ status: 'LOADING' })` → `<TelemetrySkeleton />`; SUCCESS → data card (`aria-live="polite"`); ERROR → retry alert (`role="alert"`); `AbortController` cleanup (`return () => controller.abort()`); safe `err.name === 'AbortError'` guard; `retryTick` counter re-entry. Full CSS module (selector, success card, error alert). | `feat(ui): implement multi-state data component with skeleton feedback` |
| **3.5** | **Smooth State Transitions** | `fadeIn 0.35s` animation on success/error cards (skeleton → data swap), `transition` polish on selector buttons. | `style(ui): add CSS transitions for smooth state changes` |
| **3.6** | **Documentation & Audit** | `PROJECT_RULES.md`, `TASK_DECOMPOSITION.md` (this file), `AI_FAILURE_AUDIT.md` with 4 documented AI-generated bugs. | `docs(ex3): add project rules, WBS and AI failure audit` |

Final `git log --oneline --graph` contains **7–8 atomic commits** matching this WBS
(one scaffold commit + one commit per task above).

## 4. Mandatory Constraints Checklist

- [x] **Strict Zero Div-Soup:** semantic tags only — `<section>`, `<header>`, `<nav>`,
      `<article>`; skeleton state uses `<div aria-busy="true">` (as specified by the slide contract).
- [x] **4-State Machine:** `view = { status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR', data, error }`,
      whole-object replacement per transition; contract typed via JSDoc typedefs in
      `src/types/telemetryMachine.js`; no extra derived-state `useState + useEffect` pairs.
- [x] **AbortController Cleanup:** `useEffect` cleanup aborts in-flight requests on squad switch
      and unmount; `.catch` guard skips `AbortError` so no false error flash.
- [x] **Retry Recovery:** `retryTick` in the dependency array re-runs the clean fetch pipeline.
- [x] **A11y:** `aria-busy` skeleton, `role="alert"` error, `aria-live="polite"` success,
      `type="button"` on every button.
- [x] **Deprecation Audit (Lab 2 rules):** NO `var`, NO `innerHTML`, NO inline `onclick` handlers.

## 5. Verification Log (Stage 4) - DevTools Audit (Minute 155)

| # | Checkpoint | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | DevTools → Network → Slow 3G | 0.0s → pulsing 220px skeleton card | Skeleton renders during 1.5s latency | Pass |
| 2 | Rapid switching CES → TE → GE | Stale requests shown as `(canceled)` in Network tab; never a false error flash | Requests cancelled; AbortError guard suppresses flash | Pass |
| 3 | 35% packet loss simulation | `role="alert"` shows "Blue-Zone Link Lost: Packet timeout..." + functional Retry button | ERROR state renders; retry re-runs pipeline via `retryTick` | Pass |
| 4 | Skeleton → Data swap in Elements panel | Fade-in transition applied to success card | `fadeIn 0.35s` animation attached | Pass |
| 5 | 375px layout (iPhone SE) | Zero horizontal scroll | Layout fits 375px | Pass |
| 6 | `npm run build` | Build passes, zero warnings | 21 modules transformed, 0 errors | Pass |
| 7 | `git log` (atomic commits matching WBS) | 6–8 atomic commits | 7 commits match Tasks 3.0–3.6 | Pass |
