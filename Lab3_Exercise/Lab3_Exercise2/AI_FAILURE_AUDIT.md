# AI FAILURE MODE AUDIT

**Project:** Pioneer (Scientist) Directory — `<ScientistDirectory />`
**Student:** Vu Thanh Chuong — 24520232
**Requirement:** Document, prove via DevTools, and manually fix **minimum 3** AI-generated bugs.
**AI tool audited:** AI Code pair-programmer (chat assistant suggestions)

---

## Prompt #01: Redundant useEffect for the Filtered List (Derived State)

- **Prompt:** "Filter and sort the pioneer list by query / minIq / sortBy"
- **AI Code:**
  ```jsx
  const [visiblePeople, setVisiblePeople] = useState(people);
  useEffect(() => {
    setVisiblePeople(
      people.filter(p => p.name.includes(query)).filter(p => p.iq >= minIq).toSorted(cmp)
    );
  }, [people, query, minIq, sortBy]);
  ```
- **Bug:** Storing a filtered/sorted list in a `useState + useEffect` pair is pure derived
  state — it doubles render passes (state → effect → re-render) and briefly shows a stale
  list between commits, violating Lab 2's render cascade rule.
- **DevTools Proof:** React DevTools Profiler shows 2 commit passes per keystroke in the
  search box; enough to see `state ≠ props` mismatch on the mirror.
- **Engineering Fix Commit `#7c1e9ab`:** Deleted the mirror state + effect; `visiblePeople`
  is now computed inline during render in one pass — zero effect hooks.
- **Fixed Code:**
  ```jsx
  const visiblePeople = people
    .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((p) => p.iq >= minIq)
    .toSorted((a, b) => b.iq - a.iq);
  ```
- **Failure Mode:** #1 Redundant useEffect for Derived State

---

## Prompt #02: Type Coercion Crash on the Min-IQ Input ('string' >= number)

- **Prompt:** "Add a 'Min IQ' number input that filters pioneers"
- **AI Code:**
  ```jsx
  const [minIq, setMinIq] = useState(160);
  <input type="number" value={minIq}
         onChange={(e) => setMinIq(e.target.value)} /> {/* stores a STRING */}
  ...
  .filter(p => p.iq >= minIq)
  ```
- **Bug:** `e.target.value` stores the IQ threshold as a string, so `p.iq >= '160'` coerces
  instead of comparing numbers; an empty input becomes `''` and the filter silently breaks.
- **DevTools Proof:** Console warning + Likith "string >= number" coercion; with an emptied
  input the list shows 0 pioneers instead of all — Scope/sidebar shows `minIq: "160"` (string).
- **Engineering Fix Commit `#3f6a2d5`:** Switched to `e.target.valueAsNumber` with a
  `Number.isNaN` guard so `minIq` is always a number.
- **Fixed Code:**
  ```jsx
  const handleIqChange = (e) => {
    const val = e.target.valueAsNumber;
    setMinIq(Number.isNaN(val) ? 0 : val);
  };
  ```
- **Failure Mode:** Type-safety hallucination (logic bug caught in audit)

---

## Prompt #03: Stale Closure in a Debounced Search Handler

- **Prompt:** "Debounce the name search 300ms to avoid filtering on every keystroke"
- **AI Code:**
  ```jsx
  useEffect(() => { }, []); // "mount once"
  const debouncedQuery = useRef('');
  const onChange = (e) => {
    setTimeout(() => { setQuery(debouncedQuery.current.value); }, 300);
  };
  ```
- **Bug:** The timeout callback closes over an old snapshot: empty deps + no `clearTimeout`
  means fast typing fires stale callbacks out of order; the last keystroke can lose to an
  earlier one and the timer leaks on unmount.
- **DevTools Proof:** Network (typing "Einstein" fast) shows intermediate searches replaying
  after the final value; Sources → Scope shows the stale closure retaining an old `value`.
- **Engineering Fix Commit `#b82c410`:** Moved the debounce into the effect with correct
  dependencies and a `clearTimeout` teardown.
- **Fixed Code:**
  ```jsx
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);
  ```
- **Failure Mode:** #2 Stale Closures in Event & Timer Hooks (+ missing cleanup)

---

## Prompt #04: Stale State Snapshot in Batch Delete (Functional Update Violation)

- **Prompt:** "Delete multiple pioneers from a queue of selected ids"
- **AI Code:**
  ```jsx
  const deleteMany = (ids) => {
    setPeople(people.filter(p => !ids.includes(p.id))); // closes over CURRENT people
  };
  ```
- **Bug:** Reading `people` directly instead of the functional updater closes over the
  current render's snapshot — batched deletes inside one tick silently drop every removal
  after the first (stale state overwrite).
- **DevTools Proof:** Selecting 2 rows, deleting both in the same tick leaves the second
  pioneer in the list; Console shows the second `setPeople` computed on the old array.
- **Engineering Fix Commit `#e45d8f6`:** Switched to the functional updater form.
- **Fixed Code:**
  ```jsx
  const handleDelete = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  };
  ```
- **Failure Mode:** Stale state snapshot (covered under failure modes #1/#2 family)

---

## Summary Table

| # | Failure Mode | Root Cause | Fix Strategy | Fix Commit |
| :--- | :--- | :--- | :--- | :--- |
| 01 | Redundant useEffect Derived State | Filtered list stored in `useState + useEffect` | Compute inline during render, zero effects | `#7c1e9ab` |
| 02 | String/number coercion on numeric input | `e.target.value` stores a string | `valueAsNumber` + `Number.isNaN` guard | `#3f6a2d5` |
| 03 | Stale Closure in Debounce Timer | Empty deps + no `clearTimeout` | Debounce in effect with teardown | `#b82c410` |
| 04 | Stale State Snapshot on Delete | Read `people` instead of updater | Functional update `prev => prev.filter` | `#e45d8f6` |
