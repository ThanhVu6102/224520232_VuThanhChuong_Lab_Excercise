# PROJECT RULES — Lab 03 Exercise 1

**Project:** Semantic Engineer & Pro-Gamer Profile Card
**Components:** `<DeveloperCard />` + `<SkillBadge />` (React 19 + Vite)
**Scope:** These rules are enforced during the in-class sprint, the AI audit, and the live defense.

---

## 1. Sprint 1 Code Contract

| # | Rule | Implementation Requirement |
| :--- | :--- | :--- |
| 1 | **Strict Zero Div-Soup** | ZERO `<div>` tags inside `DeveloperCard.jsx`. Tag set = `<article>`, `<header>`, `<hgroup>`, `<dl>`, `<dt>`, `<dd>`, `<ul>`, `<li>`, `<Fragment>`. `<SkillBadge />` renders `<li>` only. |
| 2 | **ES6 Default Parameters** | Replace legacy `defaultProps` (React 19 deprecation) with ES6 default parameters in the function signature. |
| 3 | **Derived State in Render** | Fallback initials (first letters of `fullName` → 2 uppercase chars) are computed during render, never mirrored into extra state. |
| 4 | **Image Contract** | HTTPS-only media origin, explicit `width="64" height="64"` (zero CLS), `onError` fallback swaps `<img>` for the initials `<span aria-hidden="true">` via `useState(false)` flag. |
| 5 | **Key-Value Metadata** | `Object.entries(metrics)` mapped into keyed `<Fragment key={k}>` with `<dt>` / `<dd>` pairs — no triple `<h1>` bug. |
| 6 | **Stable Keys** | `key={s.id}` for every `<SkillBadge />`; `key={k}` for every metadata `<Fragment>`. |
| 7 | **CSS Modules Only** | Scoped `DeveloperCard.module.css` + CSS Custom Properties — zero legacy global CSS imports (no Ant Design v4 runtime CSS). |
| 8 | **Responsive 375px** | Verified on iPhone SE viewport: zero horizontal scroll, layout fits 375px. |
| 9 | **Deprecation Audit (Lab 2 rules)** | NO `var`, NO `innerHTML`, NO inline `onclick` HTML attributes. |

## 2. Anti-Hallucination Rules (AI Failure Mode Audit constraints)

1. **No Redundant `useEffect` for Derived State** — never mirror props (like `fullName`, `metrics`) into an extra `useState + useEffect` pair; derive values during render.
2. **No Stale Closures** — every `addEventListener` / `setInterval` callback must be covered by correct `useEffect` dependencies plus a teardown function.
3. **No Missing Cleanup** — every timer, listener, or audio resource must be cleared / removed / disconnected on unmount.
4. **No Naive Drift Timers** — countdown logic must not use plain `setSeconds(s => s - 1)` without drift compensation.

## 3. Live Defense Protocol (25% of Lab Grade)

| Step | Duration | Requirement |
| :--- | :--- | :--- |
| 0 | Before defense | All AI assistants strictly closed: ChatGPT, Claude, Cursor Composer, GitHub Copilot. |
| 1 | 30s | Git history audit: `git log --oneline --graph` must show **6–8 atomic commits** matching `TASK_DECOMPOSITION.md`. |
| 2 | 30s | DevTools 375px inspection: **zero** console warnings, **zero** `<div>` soup, **100% `<label>` bindings**. |
| 3 | 60–180s | Live architectural mutation: the instructor modifies one requirement; the student must refactor and verify it in the browser within 180 seconds. |

**Known mutation challenges triggered on this exercise (Challenge C):**
- "Lift selected r up to `<App />` so clicking a row in Exercise 2 updates the featured `<DeveloperCard />` in Exercise 1."
- Generic dice: change the metrics object shape, add a new skill tier badge style, swap the avatar origin (must stay HTTPS).

## 4. Pre-Defense Checklist

- [ ] Atomic commits made and matching the WBS table in `TASK_DECOMPOSITION.md`.
- [ ] `AI_FAILURE_AUDIT.md` documents **at least 3** AI-generated bugs with DevTools proofs and fix commits.
- [ ] `npm run audit:ex1` (ex1-verification-audit.sh) passes all checkpoints.
- [ ] DevTools → Accessibility Tree shows `article → header (hgroup) + dl + ul` structure.
- [ ] 375px proof captured: no horizontal scroll on iPhone SE.
- [ ] `npm run build` passes with zero warnings.
