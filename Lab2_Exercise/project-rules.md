# PROJECT RULES & ENGINEERING STANDARDS
**Project:** Lab 02 - Modern React Architecture, Virtual DOM & State Machines  
**Scope:** Mini-React Engine, Reactive State Machine, Event Delegation Hub  
**Author:** [Your Name / MSSV]  
**Enforcement Level:** STRICT (Zero Tolerance for Violations)

---

## 1. Foundational Principles (The AI Era Manifesto)
- **HTML** is the semantic foundation; **CSS** handles presentation.
- **JavaScript** governs reactive state & computational behavior.
- **AI** enhances developer velocity, NOT replaces foundational comprehension.
- AI generates probabilistic code; Developers provide deterministic verification.
- **Zero Monolithic Vibe Coding:** Enforce atomic task decomposition and contract-first workflows.

## 2. Deprecation Audit (Strictly Forbidden Anti-Patterns)
The following legacy patterns are **BANNED**. Any code containing these will be rejected during code review.

| Forbidden Pattern | Mandatory Replacement | Reason |
| :--- | :--- | :--- |
| `var` scoping & implicit globals | `const` & `let` | Block-scoping, predictability |
| `keypress` & `e.keyCode` | `keydown` & `e.key` / `e.code` | Deprecated APIs |
| Raw `innerHTML` injection | DOM APIs or `document.createTextNode` | **XSS Prevention** |
| Inline event handlers (`onclick="..."`) | Centralized `addEventListener` / Event Delegation | Memory leaks, CSP violations |
| Outdated Babel standalones | Modern bundlers (Vite/ESBuild) & JSX Transform | Performance, modern standards |

## 3. Virtual DOM & Architecture Constraints
- **VNode Contract:** Must be a **POJO** (Plain Old JavaScript Object). No prototype chains, no heavy EventTarget properties.
- **Structural Uniformity:** All raw strings/numbers MUST be wrapped in `TEXT_ELEMENT` VNodes.
- **Array Flattening:** Use `Array.prototype.flat(Infinity)` to handle nested JSX arrays seamlessly.
- **Immutability:** `createElement` and `createTextElement` MUST return newly constructed frozen objects to avoid shared state mutations.
- **Recursive Rendering:** `renderToDOM` MUST recursively traverse children and append them to parent nodes.
- **DOM Safety:** Use `document.createElement` for HTML tags and `document.createTextNode` for text. NEVER use `innerHTML`.

## 4. Reactive State Machine & Hooks Rules
- **External State Store:** State is stored in an external linear array (`stateStore`), NOT inside the component function.
- **Cursor Index:** A global integer pointer (`cursor`) MUST track which hook is currently requesting state during render.
- **Closure Power:** The returned `setState` function MUST close over the specific cursor index allocated during that pass.
- **Rules of Hooks (Invariable):**
  - **Rule 1:** Only call hooks at the top level of your component or custom hook.
  - **Rule 2:** NEVER call hooks inside conditions (`if`), loops (`for/while`), or nested functions.
  - **Failure Mode:** Skipping a hook shifts subsequent cursor indices, corrupting all downstream state variables.
- **State Updates:** `setState` MUST check `Object.is(prev, next)` before triggering a re-render.

## 5. Event Architecture & Performance
- **Event Delegation Hub:** DO NOT attach 10,000 `addEventListener` instances. Attach a single listener to the `document` or root container for each event type.
- **Bubbling Protocol:** Root listener inspects `event.target` and traverses up to find the virtual event handler.
- **Reflow Prevention:** NEVER interleave DOM reads (e.g., `offsetHeight`) and DOM writes (e.g., `style.width`) in a loop. Batch updates in memory first.
- **Memoization:** Use `memo(Component)` for shallow comparison and `useMemo`/`useCallback` to preserve reference stability and prevent cascading re-renders.

## 6. Security & Quality Checkpoints
- **XSS Resistance:** When passing `<img src=x onerror=alert(1)>` or `<script>alert(1)</script>` as a child, it MUST render as plain text. No script execution.
- **Semantic Constraint:** Output MUST produce semantic tags (`<main>`, `<header>`, `<section>`, `<button>`). **Zero div-soup.**
- **Accessibility (WCAG 2.2 AA):** All interactive elements must have appropriate ARIA roles and keyboard navigation (Arrow keys, Enter, Space).
- **Memory Safety:** Explicit cleanup of event listeners, AudioBufferSourceNodes, and cancellation tokens via `AbortController`.

## 7. AI Workflow & Verification Protocol
- **Stage 1: Functional Slicing** → Break requirements into isolated sub-problems.
- **Stage 2: Contract-First Specification** → Define interfaces/schemas before generating code.
- **Stage 3: Atomic Generation** → Prompt AI for EXACTLY ONE isolated function/module at a time. Never prompt with >1 sub-task simultaneously.
- **Stage 4: Independent Verification** → Validate output via DevOps Profiler, test cases, and `git diff`.
- **Mandatory AI Failure Audit:** Document at least 3 detected AI hallucinations/security holes (e.g., raw `innerHTML`, phantom keys, memory leaks) in `AI_FAILURE_AUDIT.md` with DevTools proof and manual fixes.

## 8. Git & Commit Standards
- **Atomic Commits:** Each commit must represent exactly one logical change.
- **Conventional Commits:** Format: `<type>(<scope>): <description>`.
  - Example: `feat(core): implement createElement factory`
  - Example: `test(core): add verification test suite`
- **No Verified Code, No Commit:** NEVER commit unverified AI outputs into production.

---
**By adhering to these rules, we ensure deterministic engineering, robust architecture, and professional accountability in the AI era.**