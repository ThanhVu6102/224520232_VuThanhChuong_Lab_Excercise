// ============================================================
// ex2-checkpoint2-verify.jsx
// CHECKPOINT 2 : VERIFICATION SUITE
// Exercise 2  : Interactive Scientist & Pioneer Directory
// ============================================================
// 1. Zero useEffect (Strict Derived-State Contract):
//    Select-String -Path "src\components\ScientistDirectory.jsx" -Pattern "useEffect"
//    -> 0 matches = PASS.
//
// 2. React DevTools Profiler (manual):
//    - Install React Developer Tools (Chrome/Edge).
//    - Profiler tab -> Record (red circle).
//    - Type 1 char into "Search Name" -> Stop.
//    - ScientistDirectory must render EXACTLY 1 pass (no useEffect loops).
//    - Deleting 'Johann Goethe' preserves focus + remaining item keys (sp-*).
//
// 3. DATA SCHEMA CONTRACT (stable IDs, must not be regenerated per render):
//    SMART_PEOPLE: sp-1..sp-6 with name/age/iq (see src/components/ScientistDirectory.jsx)
//
// 4. DERIVED PIPELINE CONTRACT (verified via SSR markup audit):
//    - Case-insensitive `includes` name filter.
//    - p.iq >= minIq (valueAsNumber, type-safe, default 160).
//    - ES2023 .toSorted (stable): iq-desc | iq-asc | age-asc.
//    - <output role="status" aria-live="polite"> announces "Found N pioneers".
//    - Empty result -> "No pioneers match your criteria."
// ============================================================

// Expected IQ-desc default order at minIq=160 (all people pass, tied 190s keep source order):
export const EXPECTED_DEFAULT_ORDER = [
  'Johann Goethe',     // iq 210
  'Albert Einstein',   // iq 205
  'William Sidis',     // iq 200
  'Isaac Newton',      // iq 190 (stable tie -> source order kept)
  'James Maxwell',     // iq 190
  'Leonardo da Vinci', // iq 180
];

// Filtering below iq 160 -> everyone pruned -> empty state + "Found 0 pioneers".
export const EXPECTED_EMPTY_STATE = 'No pioneers match your criteria.';

export default function verifyContract() {
  return {
    zeroUseEffect: 'manual: Select-String "useEffect" must return 0 matches',
    profiler: 'manual: 1 keystroke must produce EXACTLY 1 Profiler render pass',
    expectedDefaultOrder: EXPECTED_DEFAULT_ORDER,
    expectedEmptyState: EXPECTED_EMPTY_STATE,
  };
}
