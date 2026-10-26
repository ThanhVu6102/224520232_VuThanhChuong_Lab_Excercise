# AI FAILURE MODE AUDIT

**Project:** Semantic Engineer & Pro-Gamer Profile Card — `<DeveloperCard />` + `<SkillBadge />`
**Student:** Vu Thanh Chuong — 24520232
**Requirement:** Document, prove via DevTools, and manually fix **minimum 3** AI-generated bugs.
**AI tool audited:** AI Code pair-programmer (chat assistant suggestions)

---

## Prompt #01: Redundant useEffect Mirroring Derived Initials

- **Prompt:** "Add fallback initials shown while the avatar image loads"
- **AI Code:**
  ```jsx
  const [initials, setInitials] = useState('');
  useEffect(() => {
    setInitials(fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase());
  }, [fullName]);
  ```
- **Bug:** Extra `useState + useEffect` pair mirrors a value derivable straight from props during
  render — doubles render passes and violates Lab 2's render cascade rule. On first paint the
  initials flash as empty string before the effect fires.
- **DevTools Proof:** React DevTools Profiler shows 2 commit passes per `fullName` change;
  first frame renders an empty avatar-fallback `<span>`.
- **Engineering Fix Commit `#a13f4c2`:** Deleted the mirror state; initials are computed inline
  in the render body from the `fullName` prop.
- **Fixed Code:**
  ```jsx
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  ```
- **Failure Mode:** #1 Redundant useEffect for Derived State

---

## Prompt #02: Stale Closure in a Global keydown Listener

- **Prompt:** "Add an accessible Ctrl+K shortcut that highlights the next skill badge"
- **AI Code:**
  ```jsx
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        setActiveSkill((i) => (i + 1) % skills.length); // skills snapshot
      }
    };
    window.addEventListener('keydown', onKey, []);
    return undefined;
  }, []);
  ```
- **Bug:** Empty `[]` dependency array freezes the `skills` prop snapshot; the listener also
  never calls `removeEventListener`, so it can leak across remounts and loop over a stale array.
- **DevTools Proof:** After the instructor swaps `skills` at runtime, Ctrl+K still cycles the
  old badge list (Sources → Event Listener breakpoints shows the old closure retained in memory).
- **Engineering Fix Commit `#5b8e1d7`:** Added `[skills]` dependencies and returned a proper
  `() => window.removeEventListener('keydown', onKey)` teardown.
- **Fixed Code:**
  ```jsx
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === 'k') setActiveSkill((i) => (i + 1) % skills.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [skills]);
  ```
- **Failure Mode:** #2 Stale Closures in Event & Timer Hooks (+ missing cleanup)

---

## Prompt #03: Naive setInterval Stat Ticker Drift

- **Prompt:** "Show a live 'commits today' ticker that increments every second"
- **AI Code:**
  ```jsx
  useEffect(() => { setInterval(() => setCommits(c => c + 1), 1000); }, []);
  ```
- **Bug:** Naive increment drifts against wall-clock time when the browser tab is backgrounded
  (throttled timers), and the interval is never cleared on unmount — leaking after navigation.
- **DevTools Proof:** After 5 minutes in a background tab and refocusing, the ticker lags the
  wall clock by ~2 minutes; Performance monitor shows an ever-growing detached listener count.
- **Engineering Fix Commit `#9f2c603`:** Wall-clock deadline (`Date.now()` baseline) recomputed
  on `visibilitychange`, plus `clearInterval` teardown on cleanup.
- **Fixed Code:**
  ```jsx
  useEffect(() => {
    const start = Date.now();
    const tick = () => setCommits(512 + Math.floor((Date.now() - start) / 1000));
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

## Prompt #04: Redundant useEffect for Filtered Skills List

- **Prompt:** "Only show skills of the selected tier under the metrics list"
- **AI Code:**
  ```jsx
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(skills.filter(s => s.tier === tier));
  }, [skills, tier]);
  ```
- **Bug:** A `useState + useEffect` pair computing a filtered list is pure derived state —
  it doubles render passes and can go stale during the gap between renders.
- **DevTools Proof:** React DevTools Profiler records 2 commits per tier selection; Elements
  panel briefly shows the stale full skill list between commits.
- **Engineering Fix Commit `#d4b78ae`:** Replaced the mirror state with a `.filter()` computed
  inline during render.
- **Fixed Code:**
  ```jsx
  const filteredSkills = skills.filter((s) => s.tier === tier);
  ```
- **Failure Mode:** #1 Redundant useEffect for Derived State

---

## Summary Table

| # | Failure Mode | Root Cause | Fix Strategy | Fix Commit |
| :--- | :--- | :--- | :--- | :--- |
| 01 | Redundant useEffect Derived State | Mirroring derivable initials into state | Compute inline during render | `#a13f4c2` |
| 02 | Stale Closure in Event Hook | Empty `[]` deps + no teardown | `[skills]` deps + `removeEventListener` | `#5b8e1d7` |
| 03 | setInterval Ticker Drift | Naive increment, no drift compensation | Wall-clock baseline + `visibilitychange` | `#9f2c603` |
| 04 | Redundant useEffect Derived State | `useState + useEffect` filtered list | Inline `.filter()` during render | `#d4b78ae` |
