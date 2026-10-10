# TASK DECOMPOSITION & WORK BREAKDOWN STRUCTURE (WBS)

**Course:** Web Application Development  
**Lab:** Lab 02 - Modern React Architecture, Virtual DOM & State Machines  
**Exercises:** Sprint 1 (Mini-React Engine) & Sprint 2 (Reactive State Machine)  
**Student Name:** [Your Name]  
**Student ID:** [Your MSSV]  

---

## 1. Objective
- **Sprint 1:** Build a Mini-React engine from scratch (`createElement`, `renderToDOM`), adhering to security and semantic constraints.
- **Sprint 2:** Build a custom `useState` closure engine and integrate a root Event Delegation hub for a reactive Task Manager application.

## 2. The 4-Stage AI Decomposition Pipeline
- **Stage 1: Functional Slicing** → Break into isolated sub-problems.
- **Stage 2: Contract-First Specification** → Define interfaces/VNode structures before code.
- **Stage 3: Atomic Generation** → Prompt AI for exactly one isolated function at a time.
- **Stage 4: Independent Verification** → Validate via manual testing, DevTools, and XSS injection.

---

## 3. Work Breakdown Structure (WBS)

### Sprint 1: Mini-React Engine
| Task ID | Task Name | Description | Git Commit Message (Atomic) |
| :--- | :--- | :--- | :--- |
| **1.1** | **Define VNode Contracts** | Define `TEXT_ELEMENT` constant and POJO structure for `VNode`. | `docs(core): define vnode type contracts` |
| **1.2** | **Implement `createTextElement`** | Factory to normalize primitives into `TEXT_ELEMENT` VNodes. | `feat(core): implement createTextElement factory` |
| **1.3** | **Implement `createElement`** | Main VNode factory. Handles variadic children, flattening, filtering. | `feat(core): implement createElement factory` |
| **1.4** | **Implement `renderToDOM`** | Recursive renderer. Uses `createTextNode` for XSS safety. | `feat(core): implement renderToDOM` |

### Sprint 2: Reactive State Machine & Delegation Hub
| Task ID | Task Name | Description | Git Commit Message (Atomic) |
| :--- | :--- | :--- | :--- |
| **2.1** | **State Store Engine** | Implement `stateStore` array, `cursor` index, and `resetCursor` function. | `feat(state): implement stateStore and resetCursor engine` |
| **2.2** | **Reactive `useState`** | Implement closure-based `useState` dispatcher with `Object.is` comparison and function updater support. | `feat(state): implement reactive useState dispatcher` |
| **2.3** | **Event Delegation Hub** | Attach single root listener for `click`, `input`, `keydown`. Traverse `_vnode` for handlers. | `feat(events): attach root event delegation listener` |
| **2.4** | **UI Assembly** | Assemble `TaskApp` component with dynamic state updates and mount to DOM. | `feat(ui): assemble reactive todo application` |

---

## 4. Mandatory Constraints Checklist

### Sprint 1 Constraints
- [ ] **Semantic Constraint:** Output must produce semantic tags. **Zero div-soup.**
- [ ] **Security Checkpoint:** XSS resistance to `<img src=x onerror=alert(1)>`. Render as plain text.
- [ ] **DevOps Audit:** DOM nodes match VNode tree without orphan nodes.

### Sprint 2 Constraints
- [ ] **Zero Orphan Event Listeners:** No `addEventListener` attached to button children. Only root delegation.
- [ ] **Unidirectional Data Flow:** Props flow down, events flow up.
- [ ] **Rules of Hooks:** Hooks called at top-level. No `if`/loop wrapping.
- [ ] **State Immutability:** `setState` checks `Object.is(prev, next)` before re-rendering.

### Global Constraints (Deprecation Audit)
- [ ] NO `var` (use `const`/`let`).
- [ ] NO `innerHTML` (use DOM APIs/text nodes).
- [ ] NO inline event handlers (`onclick=...`) (use centralized `addEventListener`).
- [ ] Atomic commits following Conventional Commits.

---

## 5. Verification Log (Stage 4)

| Test Case | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- |
| **Mount Test** | `document.querySelector('button') !== null` | Button is mounted in DOM. | ✅ Pass |
| **XSS Test** | `<img src=x onerror=alert(1)>` renders as text. | Rendered as pure text. No alert triggered. | ✅ Pass |
| **Sprint 2: Add Task** | Clicking "Add Task" appends a new item to the list. | Task count increases by 1. UI updates. | ✅ Pass |
| **Sprint 2: Event Delegation** | DevTools Event Listeners shows 1 listener on `#app`, 0 on `<button>`. | Verified via DevTools. | ✅ Pass |
| **Sprint 2: State Isolation** | Clicking one button does not mutate state of another. | Independent state variables preserved. | ✅ Pass |
