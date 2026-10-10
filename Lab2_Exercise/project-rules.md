# PROJECT RULES & ENGINEERING STANDARDS
**Project:** Lab 02 - Modern React Architecture, Virtual DOM & State Machines  
**Scope:** Mini-React Engine, Reactive State Machine, Event Delegation Hub  
**Enforcement Level:** STRICT (Zero Tolerance for Violations)

---

## 1. Foundational Principles (The AI Era Manifesto)
- **HTML** is the semantic foundation; **CSS** handles presentation.
- **JavaScript** governs reactive state & computational behavior.
- **AI** enhances developer velocity, NOT replaces foundational comprehension.
- **Zero Monolithic Vibe Coding:** Enforce atomic task decomposition and contract-first workflows.

## 2. Deprecation Audit (Strictly Forbidden Anti-Patterns)
| Forbidden Pattern | Mandatory Replacement | Reason |
| :--- | :--- | :--- |
| `var` scoping & implicit globals | `const` & `let` | Block-scoping, predictability |
| `keypress` & `e.keyCode` | `keydown` & `e.key` / `e.code` | Deprecated APIs |
| Raw `innerHTML` injection | `document.createTextNode` | **XSS Prevention** |
| Inline event handlers (`onclick="..."`) | Centralized `addEventListener` / Event Delegation | Memory leaks, CSP violations |
| Outdated Babel standalones | Modern bundlers (Vite/ESBuild) & JSX Transform | Performance |

## 3. Virtual DOM & Architecture Constraints
- **VNode Contract:** Must be a **POJO**. No prototype chains, no heavy EventTarget properties.
- **Structural Uniformity:** All raw strings/numbers MUST be wrapped in `TEXT_ELEMENT`.
- **Array Flattening:** Use `Array.prototype.flat(Infinity)` for nested JSX arrays.
- **DOM Safety:** Use `document.createElement` for HTML tags and `document.createTextNode` for text. NEVER use `innerHTML`.
- **DOM-VNode Link:** Each real DOM node MUST store a reference to its VNode (`dom._vnode = vNode`) to enable Event Delegation.

## 4. Reactive State Machine & Hooks Rules
- **External State Store:** State is stored in an external linear array (`stateStore`), NOT inside the component.
- **Cursor Index:** A global integer pointer (`cursor`) MUST track which hook is currently requesting state during render.
- **Closure Power:** `setState` MUST close over the `currentCursor` index allocated during that pass.
- **Initialization:** If `stateStore[currentCursor]` is undefined, assign the `initialValue`.
- **Invariant Protection:** If `setState` receives a function, execute it with the previous state: `typeof nextValue === 'function' ? nextValue(prev) : nextValue`.
- **Re-render Trigger:** Only trigger re-render if `!Object.is(stateStore[currentCursor], resolvedValue)`.
- **Rules of Hooks (Invariable):**
  - Only call hooks at the top level.
  - NEVER call hooks inside conditions (`if`), loops (`for/while`), or nested functions.
  - **Failure Mode:** Skipping a hook shifts subsequent cursor indices, corrupting downstream state.
- **Unidirectional Data Flow:** Props flow strictly downward. Children must never mutate received props.

## 5. Event Architecture & Performance
- **Event Delegation Hub:** DO NOT attach `addEventListener` to individual buttons. Attach a single listener to the `root` container for each event type (`click`, `input`, `keydown`).
- **Bubbling Protocol:** Root listener inspects `event.target` and traverses up (`parentElement`) to find the DOM node with `_vnode` containing the corresponding `onClick`, `onInput`, or `onKeydown` handler.
- **Zero Orphan Listeners:** Ensure `button` children have 0 attached listeners in DevTools. All handling occurs at the root.
- **Reflow Prevention:** NEVER interleave DOM reads and DOM writes in a loop. Batch updates in memory first.

## 6. Security & Quality Checkpoints
- **XSS Resistance:** When passing `<img src=x onerror=alert(1)>` as a child, it MUST render as plain text. No script execution.
- **Semantic Constraint:** Output MUST produce semantic tags (`<main>`, `<header>`, `<section>`, `<button>`). **Zero div-soup.**
- **Accessibility (WCAG 2.2 AA):** All interactive elements must have appropriate ARIA roles and keyboard navigation.
- **Memory Safety:** Explicit cleanup of event listeners, AudioBufferSourceNodes, and cancellation tokens via `AbortController`.

## 7. AI Workflow & Verification Protocol
- **Stage 1: Functional Slicing** → Break requirements into isolated sub-problems.
- **Stage 2: Contract-First Specification** → Define interfaces before generating code.
- **Stage 3: Atomic Generation** → Prompt AI for EXACTLY ONE isolated function/module at a time.
- **Stage 4: Independent Verification** → Validate output via DevOps Profiler, test cases, and `git diff`.
- **Mandatory AI Failure Audit:** Document at least 3 detected AI hallucinations/security holes in `AI_FAILURE_AUDIT.md`.

## 8. Git & Commit Standards
- **Atomic Commits:** Each commit must represent exactly one logical change.
- **Conventional Commits:** Format: `<type>(<scope>): <description>`.
  - Example: `feat(state): implement stateStore and resetCursor engine`
  - Example: `feat(events): attach root event delegation listener`
- **No Verified Code, No Commit:** NEVER commit unverified AI outputs.
