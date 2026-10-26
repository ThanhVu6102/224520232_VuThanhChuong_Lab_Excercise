# AI FAILURE MODE AUDIT

**Project:** KRAFTON PUBG Vietnam Series (PVS) Live Telemetry — `<PubgMatchTelemetry />`
**Student:** Vu Thanh Chuong — 24520232
**Requirement:** Document, prove via DevTools, and manually fix **minimum 3** AI-generated bugs.
**AI tool audited:** AI Code pair-programmer (chat assistant suggestions)

---

## Prompt #01: Stale Closure in PUBG Live Auto-Polling (Ex 3 Mutation Challenge B)

- **Prompt:** "Add 3s auto-refresh to PubgMatchTelemetry"
- **AI Code:**
  ```jsx
  useEffect(() => { setInterval(() => fetch(squadId), 3000); }, []);
  ```
- **Bug:** Empty `[]` dependency array freezes the initial `squadId` ('ces') forever — it keeps
  fetching the same squad on every switch.
- **DevTools Proof:** Network tab shows `ces` still polling after switching UI to "The Expendables" (te).
- **Engineering Fix Commit `#41c02ff`:** Added `[squadId, isPaused]` dependencies and returned
  `() => clearInterval(timer)` teardown.
- **Fixed Code:**
  ```jsx
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => triggerFetch(), 3000);
    return () => clearInterval(timer);
  }, [squadId, isPaused]);
  ```
- **Failure Mode:** #2 Stale Closures in Event & Timer Hooks (+ missing cleanup)

---

## Prompt #02: Redundant useEffect for Derived State

- **Prompt:** "Show a derived summary line: 'SQUAD: {name} — {kills} KILLS' under the radar card"
- **AI Code:**
  ```jsx
  const [summary, setSummary] = useState('');
  useEffect(() => {
    if (view.data) setSummary(`SQUAD: ${view.data.name} — ${view.data.kills} KILLS`);
  }, [view.data]);
  ```
- **Bug:** Extra `useState + useEffect` pair mirrors derivable state, doubling render passes
  and violating Lab 2's render cascade rule. The summary string can also go stale between
  state transitions.
- **DevTools Proof:** React DevTools Profiler shows 2 commit passes per squad switch instead of 1.
- **Engineering Fix Commit `#8d31b2a`:** Removed the mirror state; the summary is computed
  inline during render from `view.data`.
- **Fixed Code:**
  ```jsx
  {view.data && (
    <p>SQUAD: {view.data.name} — {view.data.kills} KILLS</p>
  )}
  ```
- **Failure Mode:** #1 Redundant useEffect for Derived State

---

## Prompt #03: Naive setInterval Countdown Drift

- **Prompt:** "Show a 'Next zone shrink in Ns' countdown above the radar"
- **AI Code:**
  ```jsx
  const [seconds, setSeconds] = useState(60);
  useEffect(() => { setInterval(() => setSeconds(s => s - 1), 1000); }, []);
  ```
- **Bug:** Naive `setSeconds(s => s - 1)` drifts by minutes when the browser tab is backgrounded
  (timers are throttled), and the interval is never cleared on unmount.
- **DevTools Proof:** After 5 minutes in a background tab then refocusing, the displayed
  countdown is ~230s off the wall-clock expected value.
- **Engineering Fix Commit `#c74e019`:** Timestamp-based countdown (`Date.now()` deadline
  recomputed on visibilitychange) plus `clearInterval` teardown.
- **Fixed Code:**
  ```jsx
  useEffect(() => {
    const deadline = Date.now() + 60_000;
    const tick = () => setSeconds(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    const timer = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);
  ```
- **Failure Mode:** #4 Naive setInterval Countdown Drift

---

## Prompt #04: Missing AbortController on Telemetry Fetch

- **Prompt:** "Fetch squad telemetry when the selector changes"
- **AI Code:**
  ```jsx
  useEffect(() => {
    fetchKraftonPubgTelemetry(squadId).then(setView).catch(console.error);
  }, [squadId]);
  ```
- **Bug:** No `AbortController` — rapid squad switching (CES → TE → GE) lets stale responses
  resolve late and overwrite the newer squad's view; no guard for the intentional cancellation path.
- **DevTools Proof:** Network tab shows completed (not cancelled) duplicate `ces`/`ge` requests
  after fast switching; a stale `ge` payload briefly replaces the `te` card.
- **Engineering Fix Commit `#e09f7d4`:** Created `AbortController` per effect run, passed
  `{ signal }` to the fetch, returned `() => controller.abort()`, and added the
  `if (err.name === 'AbortError') return;` safe guard.
- **Fixed Code:**
  ```jsx
  useEffect(() => {
    const controller = new AbortController();
    setView({ status: 'LOADING', data: null, error: null });
    fetchKraftonPubgTelemetry(squadId, { signal: controller.signal })
      .then((payload) => setView({ status: 'SUCCESS', data: payload, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setView({ status: 'ERROR', data: null, error: err.message });
      });
    return () => controller.abort();
  }, [squadId, retryTick]);
  ```
- **Failure Mode:** #3 Missing AbortController / Audio Cleanup

---

## Summary Table

| # | Failure Mode | Root Cause | Fix Strategy | Fix Commit |
| :--- | :--- | :--- | :--- | :--- |
| 01 | Stale Closure in Timer Hook | Empty `[]` deps + no teardown | `[squadId, isPaused]` deps + `clearInterval` | `#41c02ff` |
| 02 | Redundant useEffect Derived State | Mirroring derivable data into state | Compute inline during render | `#8d31b2a` |
| 03 | setInterval Countdown Drift | Naive decrement, no drift compensation | Wall-clock deadline + visibilitychange | `#c74e019` |
| 04 | Missing AbortController | Fetch without abort/teardown | `AbortController` + cleanup + AbortError guard | `#e09f7d4` |
