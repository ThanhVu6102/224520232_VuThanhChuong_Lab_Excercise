# AI failure audit — Exercise 1.2

Student: Vu Thanh Chuong — 24520232. Review date: 2026-11-20.

Only observed findings are recorded. No invented historical prompts, fix hashes or manual results.

| Finding                                                        | Correction                                                                | Evidence                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Error boundary retained failed state after changing person ID. | Key the boundary by pathname so each route starts with a fresh boundary.  | recovery.test.jsx reproduces failure before correction and passes afterwards. |
| Route changes did not move focus or update the browser title.  | usePageFocus synchronizes DOM focus and title after route content mounts. | App.test.jsx plus browser detail navigation and keyboard skip-link checks.    |
| Exercise 1.2 imported lazy without using it.                   | Removed unused lazy/Suspense scaffolding from the eager-routing exercise. | ESLint zero-warning check.                                                    |
| No repeatable lint/format gate.                                | Add ESLint, Prettier and npm run check.                                   | All three projects pass the full gate.                                        |

See VERIFICATION.md for scope and limitations. These fixes were made during the assistant review. See Lab4_Exercise/GIT_SUBMISSION.md for the subsequent submission commits.
