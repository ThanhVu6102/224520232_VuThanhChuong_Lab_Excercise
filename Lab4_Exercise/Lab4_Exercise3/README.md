# Exercise 1.3: Context form engine

## Exercise behaviour

SimpleForm owns values, touched flags, submission attempt and the last valid submitted snapshot. Field changes are checked by the form action handler; the form stores the resulting field errors and readiness status. InputField consumes Context, uses a unique useId per field, and connects label/error with aria-invalid and aria-describedby. Confirm password validates against password immediately. Invalid submission focuses the first invalid field. ShowData uses semantic dl/dt/dd after successful submit; sensitive password fields are excluded. Reset clears form and output.

## Run

From this folder: npm install, npm run dev. Checks: npm test and npm run build.

## Manual checks

Use keyboard only. Submit empty fields, fix them, change Password after Confirm password, submit valid values and reset. Check screen-reader error announcements and layout at 375px.

The PPTX does not specify exact field names/rules; name, email and password confirmation are explicit implementation choices. This exercise does not require server persistence.

Component references: Lab 4 slides 15, 23 and 24.

## Quality gate

Run `npm run check` to perform lint, formatting, tests and build in order. Use `npm ci` for a clean install from the lockfile. Run `npm run format` to apply formatting. Node ^20.19.0 or >=22.12.0 is required.

Review results and known tooling limitations are recorded in VERIFICATION.md.
