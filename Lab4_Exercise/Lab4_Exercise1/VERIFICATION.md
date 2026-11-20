# Verification — Exercise 1.1

Date: 2026-11-20 (Asia/Saigon). Review scope: Lab 4 exercises 1.1–1.3.

## Automated quality checks

- ESLint with React Hooks, JSX and accessibility rules: PASS, zero warnings.
- Prettier: PASS.
- Vitest: PASS, 8 tests.
- Production build: PASS.
- The original regressions failed before correction: persistent error fallback and missing route focus/title in Exercise 1.1; duplicate inspector IDs in Exercise 1.3.
- Exercise 1.2 uses the same corrected route focus and keyed boundary, with its own recovery test.

## Real browser checks

Headless Microsoft Edge, production preview builds:

- Direct detail URL, refresh, person navigation, Back/Forward, invalid ID and skip-link keyboard focus: PASS.
- Viewports 1280px, 375px and 320px: no horizontal document overflow.
- axe-core WCAG A/AA rule sets: no detected violations on the checked detail/submitted-form states. The earlier error-state check also had no detected violations.
- Exercise 1.1 deferred production chunk: skeleton and loaded panel both 360px, same y coordinate, observed CLS 0 in that desktop scenario.
- Mobile screenshots and desktop skeleton screenshot visually inspected.

## Limits

These results apply to the tested states and viewport sizes. They do not certify full WCAG compliance, all browser engines, all zoom levels or a universal CLS score. Manual screen-reader checks remain pending.

Dependency audit of Exercise 1.1's locked dependency tree: npm reported zero known vulnerabilities. This is a point-in-time result, not a guarantee.

ESLint 9 is currently retained because the installed React/a11y plugins declare support through ESLint 9. An attempted upgrade to ESLint 10 was rejected by npm peer-dependency compatibility checks; no forced install was used. Plan a coordinated tooling upgrade when plugin support is available.

Initial tests ran in the preparation workspace. Before Git submission, dependencies were freshly installed from the lockfile in the target repository and the full check was repeated there. Submission hashes are recorded in Lab4_Exercise/GIT_SUBMISSION.md.

## Submission environment correction

The previous dependency copy excluded folders named dist, including some dependency runtime files. This caused ESLint module-resolution failures in the target folder. Running npm ci from the lockfile restored the dependencies. node_modules and generated builds are ignored by Git.
