# TASK DECOMPOSITION & WORK BREAKDOWN STRUCTURE (WBS)

**Course:** Web Application Development
**Lab:** Lab 03 - Modern React 19 Component Architecture (Vite)
**Exercise:** In-Class Sprint 1 - Semantic Engineer & Pro-Gamer Profile Card
**Student Name:** Vu Thanh Chuong
**Student ID:** 24520232
**Estimated Time:** 35 - 75 minutes (In-Class Sprint | 35 minutes)

---

## 1. Objective

Build `<DeveloperCard />` and `<SkillBadge />` as **pure functional React 19 components**
(Vite), synthesizing the legacy **Elon Musk Card (Ex 4.4)** and **User Profile (Ex 4.5)**,
while enforcing Lab 2's **Zero Div-Soup Mandate**.

## 2. The 4-Stage AI Decomposition Pipeline

- **Stage 1: Functional Slicing** - Isolate SkillBadge (leaf) from DeveloperCard (composite).
- **Stage 2: Contract-First Specification** - Define props contract + semantic tag set before code.
- **Stage 3: Atomic Generation** - Prompt AI for exactly one component at a time.
- **Stage 4: Independent Verification** - Validate via `ex1-verification-audit.sh`, Chrome DevTools.

## 3. Work Breakdown Structure (WBS)

| Task ID | Task Name | Description | Git Commit Message (Atomic) |
| :--- | :--- | :--- | :--- |
| **1.1** | **Semantic Components** | `<DeveloperCard />` (article/header/hgroup/dl/ul) + `<SkillBadge />` (li), ES6 default params, keyed `<Fragment>` dt/dd pairs, `useState` fallback initials. | `feat(ex1): implement semantic DeveloperCard and SkillBadge` |
| **1.2** | **Responsive 375px CSS Module** | `DeveloperCard.module.css` + CSS Custom Properties (replace Slide 18's inline `style={{ background: '#d0f0c0' }}`), 375px responsive contract (no horizontal scroll on iPhone SE). | `style(ex1): add responsive 375px CSS module` |

## 4. Mandatory Constraints Checklist

- [x] **Strict Zero Div-Soup:** ZERO `<div>` tags inside `DeveloperCard.jsx`.
      Use `<article>`, `<header>`, `<hgroup>`, `<dl>`, `<dt>`, `<dd>`, `<ul>`, `<li>`, `<Fragment>`.
- [x] **CSS Modules & 375px:** Legacy inline styling replaced with
      `DeveloperCard.module.css` + CSS Custom Properties; layout verified at 375px (no overflow).
- [x] **HTTPS Security & Image Dimensions:** HTTPS-only media origin, explicit
      `width="64" height="64"` (zero CLS), `onError` fallback to initials.
- [x] **React 19 idioms:** ES6 default parameters, keyed `<Fragment>` for `Object.entries(metrics)`,
      stable `key={s.id}` for `<SkillBadge />`, `useState` for the image-fallback flag.
- [x] **Deprecation Audit (Lab 2 rules):** NO `var`, NO `innerHTML`, NO inline `onclick` handlers.

## 5. Verification Log (Stage 4) - ex1-verification-audit.sh

| # | Checkpoint | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `grep -n '<div' src/components/DeveloperCard.jsx` | 0 matches (Empty) | 0 matches | Pass |
| 2 | `grep -n 'http://' src/components/DeveloperCard.jsx` | 0 matches (Empty) | 0 matches | Pass |
| 3 | DevTools \u2192 Accessibility Tree | article \u2192 header + dl + list | article \u2192 header (hgroup) + dl + ul | Pass |
| 3b | DevTools \u2192 Device Toolbar iPhone SE (375px) | Zero horizontal scroll | No overflow at 375px | Pass |
| 4 | `git log` (atomic commits matching WBS) | 2 atomic commits | Commit 1 `feat(ex1):...`, Commit 2 `style(ex1):...` | Pass |
