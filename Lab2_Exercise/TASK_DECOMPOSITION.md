# TASK DECOMPOSITION & WORK BREAKDOWN STRUCTURE (WBS)

**Course:** Web Application Development  
**Lab:** Lab 02 - Modern React Architecture, Virtual DOM & State Machines  
**Exercise:** In-Class Sprint 1 - Building Mini-React VNode & Mounting Engine  
**Student Name:** [Your Name]  
**Student ID:** [Your MSSV]  

---

## 1. Objective
Build a Mini-React engine from scratch, including `createTextElement`, `createElement`, and `renderToDOM`, adhering to strict security, semantic, and engineering constraints.

## 2. The 4-Stage AI Decomposition Pipeline
To prevent monolithic "vibe coding" and ensure deterministic verification, this task is decomposed into the following stages:

- **Stage 1: Functional Slicing** → Break into isolated sub-problems (Contract, Text Node, Element Factory, Renderer, Test).
- **Stage 2: Contract-First Specification** → Define TypeScript/JavaScript interfaces and VNode structures before writing logic.
- **Stage 3: Atomic Generation** → Prompt AI for exactly one isolated function at a time (No multi-task prompting).
- **Stage 4: Independent Verification** → Validate output via manual testing, DevTools, and XSS injection checks.

---

## 3. Work Breakdown Structure (WBS)

| Task ID | Task Name | Description | Dependencies | Git Commit Message (Atomic) |
| :--- | :--- | :--- | :--- | :--- |
| **1.1** | **Define VNode Contracts** | Define `TEXT_ELEMENT` constant and document the POJO structure for `VNode` (`type`, `props`, `children`). | None | `docs(core): define vnode type contracts` |
| **1.2** | **Implement `createTextElement`** | Create a factory function to normalize primitive values (string/number) into a uniform `TEXT_ELEMENT` VNode. | Task 1.1 | `feat(core): implement createTextElement factory` |
| **1.3** | **Implement `createElement`** | Create the main VNode factory. Must handle variadic children, flatten nested arrays (`flat(Infinity)`), filter falsy values, and map primitives. | Task 1.2 | `feat(core): implement createElement factory` |
| **1.4** | **Implement `renderToDOM`** | Create a recursive renderer. Must use `document.createTextNode` for XSS safety, assign attributes safely, and attach event listeners via `addEventListener`. | Task 1.3 | `feat(core): implement renderToDOM` |
| **1.5** | **Build Test Runner & Verification** | Create `test-runner.js` and `index.html`. Verify semantic HTML, XSS resistance (`<img onerror=alert(1)>`), and event delegation (`console.log('Ping')`). | Task 1.4 | `test(core): add verification test suite` |

---

## 4. Mandatory Constraints Checklist (Slide 15)

- [ ] **Semantic Constraint:** Output must produce semantic tags (`<main>`, `<header>`, `<h1>`, `<p>`, `<button>`). **Zero div-soup.**
- [ ] **Security Checkpoint:** Verify XSS resistance when passing `<img src=x onerror=alert(1)> Safe Text` string as a child. (Must render as plain text, no alert popup).
- [ ] **DevOps Audit:** Inspect Elements panel to ensure DOM nodes match the VNode tree without orphan nodes.
- [ ] **Deprecation Audit (Slide 3):** 
  - [ ] NO `var` (use `const`/`let`).
  - [ ] NO `innerHTML` (use DOM APIs/text nodes).
  - [ ] NO inline event handlers (`onclick=...`) (use centralized `addEventListener`).
- [ ] **Git Requirement:** Atomic commits following Conventional Commits specification.

---

## 5. Verification Log (Stage 4)

| Test Case | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- |
| **Mount Test** | `document.querySelector('button') !== null` | Button is mounted in DOM. | ✅ Pass |
| **XSS Test** | `<img src=x onerror=alert(1)>` renders as text. | Rendered as pure text. No alert triggered. | ✅ Pass |
| **Event Test** | Clicking button logs `Ping! Event Delegation works!` | Logged in Console. | ✅ Pass |
| **Semantic Test** | No `<div>` tags in the rendered output. | Only `<main>`, `<header>`, `<h1>`, `<p>`, `<button>`. | ✅ Pass |