# PROJECT RULES — Lab 03 Exercise 3

**Project:** KRAFTON PUBG Vietnam Series (PVS) Live Telemetry
**Component:** `<PubgMatchTelemetry />` (React 19 + Vite)
**Scope:** These rules are enforced during the in-class sprint, the AI audit, and the live defense.

---

## 1. Sprint 3 Code Contract (from exam spec)

| # | Rule | Implementation Requirement |
| :--- | :--- | :--- |
| 1 | **4-State Machine** | `view` must be exactly one of `IDLE | LOADING | SUCCESS | ERROR`. Each state transition replaces the whole view object (no partial patching). |
| 2 | **Squad Selector Effect Cleanup** | Rapid switching (CES → TE → GE) must abort the previous in-flight request. The `useEffect` cleanup returns `() => controller.abort()`. |
| 3 | **Safe AbortError Guard** | Every `.catch` must check `if (err.name === 'AbortError') return;` BEFORE falling through to the ERROR state, so intentional cancellation never flashes a false error banner. |
| 4 | **Retry Counter Trigger** | The "Reconnect Satellite (Retry)" button increments `retryTick`, which is listed in the `useEffect` dependency array — re-running the full fetch pipeline cleanly. |
| 5 | **Skeleton Loader Contract** | LOADING renders a **220px pulsing skeleton card** ("Syncing KRAFTON Radar...") with `aria-busy="true"` (verified at Slow 3G throttling). |
| 6 | **Accessible Error Alert** | ERROR renders inside `<section role="alert">` with the message "Blue-Zone Link Lost: …" and a retry button. SUCCESS renders inside `<article aria-live="polite">`. |
| 7 | **Button Semantics** | All interactive `<button>` elements must explicitly declare `type="button"`. |
| 8 | **Stale Request Mandate** | A stale response must NEVER overwrite the view of a newer request (guaranteed by abort-on-cleanup + the AbortError guard). |
| 9 | **FSM Contract File** | The 4-state machine contract lives in `src/types/telemetryMachine.js` (TypeScript-compatible JSDoc typedefs: `TelemetryStatus`, `TelemetryView`, `SquadTelemetry`); every state transition obeys `makeView`'s `{ status, data, error }` shape. |
| 10 | **Dedicated Skeleton Renderer** | `<TelemetrySkeleton />` is the ONLY renderer of the LOADING state — no inline skeleton JSX. |

## 2. Anti-Hallucination Rules (AI Failure Mode Audit constraints)

1. **No Redundant `useEffect` for Derived State** — never mirror props/state into an extra `useState + useEffect` pair; derive values during render instead.
2. **No Stale Closures** — every `setInterval` / `addEventListener` callback must be covered by correct `useEffect` dependencies plus a teardown function (`clearInterval` / `removeEventListener`).
3. **No Missing Cleanup** — every `fetch()`, timer, or audio resource must be aborted / disconnected / cleared on unmount.
4. **No Naive Drift Timers** — countdown logic must not use plain `setSeconds(s => s - 1)` without drift compensation.

## 3. Live Defense Protocol (25% of Lab Grade)

| Step | Duration | Requirement |
| :--- | :--- | :--- |
| 0 | Before defense | All AI assistants strictly closed: ChatGPT, Claude, Cursor Composer, GitHub Copilot. |
| 1 | 30s | Git history audit: `git log --oneline --graph` must show **6–8 atomic commits** matching `TASK_DECOMPOSITION.md`. |
| 2 | 30s | DevTools 375px inspection: **zero** console warnings, **zero** `<div>` soup, **100% `<label>` bindings** (checklist from Exercise 2). |
| 3 | 60–180s | Live architectural mutation: the instructor modifies one requirement; the student must refactor and verify it in the browser within 180 seconds. |

**Known mutation challenges triggered on this project (Challenge B):**
- "Add a 3-second auto-polling `setInterval` to `<PubgMatchTelemetry />` with a Pause Radar toggle button, and proper cleanup."

## 4. Pre-Defense Checklist

- [ ] All 6–8 atomic commits made and matching the WBS table in `TASK_DECOMPOSITION.md`.
- [ ] `AI_FAILURE_AUDIT.md` documents **at least 3** AI-generated bugs with DevTools proofs and fix commits.
- [ ] DevTools Network tab proof captured: rapid squad switching shows cancelled requests and no false error flash.
- [ ] Slow 3G throttling proof captured: 0.0s → pulsing 220px skeleton card.
- [ ] `npm run build` passes with zero warnings.
