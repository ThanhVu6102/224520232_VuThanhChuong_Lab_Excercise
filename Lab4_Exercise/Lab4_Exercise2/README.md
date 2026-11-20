# Exercise 1.2: React Router v7 master-detail

## Exercise behaviour

Nested /people routes use PeopleLayout, Outlet and useParams. NavLink marks the active person. Invalid IDs and unmatched URLs show explicit 404 UI. A responsive CSS Grid switches to one column below 700px.

## Run

From this folder: npm install, then npm run dev. Run npm test and npm run build for checks.

## Manual checks

- Open /people/sp-2 directly, refresh, use Back/Forward, and try /people/missing.
- Check keyboard focus and layout at 375px.

- Production hosting must rewrite unknown frontend paths to index.html.

Reference: Lab 4 slides 9–12 and 22. Exercise numbering on the slides is inconsistent.
Official references: https://react.dev/reference/react/lazy and https://reactrouter.com/7.18.6/start/declarative/routing

## Quality gate

Run `npm run check` to perform lint, formatting, tests and build in order. Use `npm ci` for a clean install from the lockfile. Run `npm run format` to apply formatting. Node ^20.19.0 or >=22.12.0 is required.

Review results and known tooling limitations are recorded in VERIFICATION.md.
