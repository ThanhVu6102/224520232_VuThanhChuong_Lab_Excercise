# AI FAILURE MODE AUDIT

**Project:** Lab 02 - Modern React Architecture, Virtual DOM & State Machines  
**Author:** Vu Thanh Chuong - 24520232 - CTTT2024
**Date:** October 10, 2026

---

## Purpose
This document records critical failure modes detected in AI-generated code during the development of the Mini-React engine and Reactive State Machine. Each entry includes the failure, risk, detection method, and verified refactor.

**Rule:** *AI generates probabilistic code; Developers provide deterministic verification.*

---

## Vulnerability 01: Raw `innerHTML` Ingestion (XSS)

**File Affected:** `mini-react.js` — `renderToDOM`

### AI Prompt
> "Generate a rich text renderer for comment items in my Mini-React engine."

### AI-Generated Code (FAILURE)
```javascript
function renderComment(container, comment) {
  container.innerHTML = `<div class="comment">${comment.text}</div>`;
}
```

### Risk
- **Type:** Stored Cross-Site Scripting (XSS)
- **Severity:** CRITICAL
- **Impact:** Input like `<img src=x onerror=stealToken()>` executes in the browser, enabling token theft, session hijacking, or phishing redirects.

### Detection
- Injected `<img src=x onerror=alert(1)>` into the input field.
- `alert(1)` executed immediately → XSS confirmed.
- DevTools Security Panel flagged unescaped HTML.

### Verified Refactor
```javascript
function renderComment(container, comment) {
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';
  commentDiv.appendChild(document.createTextNode(comment.text));
  container.replaceChildren(commentDiv);
}
```

### Verification
- Re-injected payload → rendered as plain text. No script execution.
- **Status:** ✅ Resolved

---

## Vulnerability 02: Memory Leak via Direct Event Binding

**File Affected:** `reactive-engine.js` — Component render body

### AI Prompt
> "Add a click handler to each task item in my reactive Task Manager."

### AI-Generated Code (FAILURE)
```javascript
function TaskApp() {
  const [tasks, setTasks] = useState(['Task A', 'Task B']);

  const taskElements = tasks.map(task => {
    const el = document.createElement('li');
    el.textContent = task;
    el.addEventListener('click', () => setTasks([...tasks, 'New Task'])); // LEAK
    return el;
  });

  return createElement('ul', null, ...taskElements);
}
```

### Risk
- **Type:** Memory Leak / Listener Accumulation
- **Severity:** HIGH
- **Impact:** Every re-render attaches new listeners to freshly created nodes. With 10,000 items, heap usage grows unbounded → browser OOM crash.

### Detection
- Performance Heap Snapshot showed listener count growing on every re-render.
- DevTools Elements > Event Listeners showed orphan listeners on destroyed `<li>` nodes.
- Repeated "Add Task" clicks increased heap usage without release.

### Verified Refactor
```javascript
export function setupEventDelegation(container) {
  const supportedEvents = ['click', 'input', 'keydown'];

  supportedEvents.forEach(eventType => {
    container.addEventListener(eventType, (nativeEvent) => {
      let target = nativeEvent.target;
      const handlerProp = 'on' + eventType.charAt(0).toUpperCase() + eventType.slice(1);

      while (target && target !== container) {
        if (target._vnode && target._vnode.props[handlerProp]) {
          target._vnode.props[handlerProp](nativeEvent);
          break;
        }
        target = target.parentElement;
      }
    });
  });
}
```

### Verification
- DevTools > `<button>` : 0 attached listeners.
- DevTools > `#app` : 1 attached listener for `click`.
- **Status:** ✅ Resolved

---

## Vulnerability 03: Phantom Keys (Index-as-Key Anti-Pattern)

**File Affected:** `reactive-engine.js` — Task list rendering

### AI Prompt
> "Render a dynamic list of tasks with a key prop for React reconciliation."

### AI-Generated Code (FAILURE)
```javascript
tasks.map((task, index) =>
  createElement('li', { key: index }, task.name)
);
```

### Risk
- **Type:** State Corruption / Unnecessary DOM Destruction
- **Severity:** CRITICAL
- **Impact:**
  - Input field values bleed into wrong rows after deletion.
  - React destroys and recreates all subsequent DOM nodes → performance collapse.

### Detection
- Rendered `['Task A', 'Task B', 'Task C']` with keys `[0, 1, 2]`.
- Added an input inside each `<li>`, typed "Draft A" into Task A.
- Deleted Task A → "Draft A" appeared in Task B's input. State corrupted.
- Elements panel showed full DOM re-creation instead of reorder.

### Verified Refactor
```javascript
// Persistent identity as key
tasks.map((task) =>
  createElement('li', { key: task.uuid }, task.name)
);

// Task factory
function createTask(name) {
  return { uuid: crypto.randomUUID(), name };
}
```

### Verification
- Repeated deletion test: "Draft A" correctly vanished with Task A.
- Task B retained its own state.
- **Status:** ✅ Resolved

---

## Summary

| # | Vulnerability | Type | Severity | Detection | Fix |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Raw `innerHTML` | XSS | CRITICAL | Manual injection + DevTools Security | `createTextNode` |
| 2 | Listener in render body | Memory Leak | HIGH | Performance Heap Snapshot | Root Event Delegation |
| 3 | Index as `key` | State Corruption | CRITICAL | Manual reproduction | Persistent UUID |

---

## Lessons Learned

1. AI generates code that "works" in isolation but fails at scale, under attack, or during dynamic updates.
2. Every AI output requires DevTools audit and manual reproduction before commit.
3. Contract-first workflow (`VNode`, `Props`, `State` interfaces) eliminates structural ambiguity.
4. Atomic commits + `git diff` allow pinpointing the exact commit that introduced a bug.

**Verification is the developer's responsibility — not the AI's.**
