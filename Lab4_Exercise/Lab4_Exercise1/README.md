# Exercise 1.1: Lazy loading and Suspense

## Contract

PersonDetail is dynamically imported at module scope with React.lazy. Suspense displays an accessible skeleton; the shared 360px detail slot reserves the same space for loading and content. An error boundary handles failed chunk loading.

## Run

From this folder: npm install, then npm run dev. Run npm test and npm run build for checks.

## Manual checks

- Open /people/sp-2 directly, refresh, use Back/Forward, and try /people/missing.
- Check keyboard focus and layout at 375px.
- Use npm run build then npm run preview. Disable browser cache and throttle Network; enter People then select a person for the first time. Verify a separate PersonDetail chunk, loading announcement and unchanged detail-slot size. Measure CLS in the browser; a score of zero is not assumed.
- Production hosting must rewrite unknown frontend paths to index.html.

Reference: Lab 4 slides 9–12 and 22. Exercise numbering on the slides is inconsistent.
Official references: https://react.dev/reference/react/lazy and https://reactrouter.com/7.18.6/start/declarative/routing

## Quality gate

Run `npm run check` to perform lint, formatting, tests and build in order. Use `npm ci` for a clean install from the lockfile. Run `npm run format` to apply formatting. Node ^20.19.0 or >=22.12.0 is required.

Review results and known tooling limitations are recorded in VERIFICATION.md.
