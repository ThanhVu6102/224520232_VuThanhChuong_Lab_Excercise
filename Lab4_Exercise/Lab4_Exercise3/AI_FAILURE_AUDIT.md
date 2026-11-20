# AI failure audit — Exercise 1.3

Student: Vu Thanh Chuong — 24520232. Review date: 2026-11-20.

Only observed findings are recorded. No invented historical prompts, fix hashes or manual results.

| Finding                                                                  | Correction                                                       | Evidence                                                                  |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ShowData used a hardcoded heading ID, producing duplicate IDs if reused. | Generate the heading ID with useId before conditional rendering. | ShowData.test.jsx failed before correction and passes afterwards.         |
| Error live-region role was inserted only when an error already existed.  | Keep role=alert mounted, update its text.                        | JSX source review; screen-reader behaviour still requires a manual check. |
| Standalone form loaded an unused BrowserRouter.                          | Remove router provider and routing dependency from Exercise 1.3. | Successful tests/build; smaller JavaScript output.                        |
| No repeatable lint/format gate.                                          | Add ESLint, Prettier and npm run check.                          | All three projects pass the full gate.                                    |

See VERIFICATION.md for scope and limitations. These fixes were made during the assistant review. See Lab4_Exercise/GIT_SUBMISSION.md for the subsequent submission commits.
