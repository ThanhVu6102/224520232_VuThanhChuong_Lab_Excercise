#!/usr/bin/env bash
# ============================================================
# ex1-verification-audit.sh
# CHECKPOINT 1 : VERIFICATION SUITE (Minute 75)
# Exercise 1 : Semantic Engineer & Pro-Gamer Profile Card
# ============================================================
# 3. Chrome DevTools Inspection (manual step):
#    - Elements -> Accessibility Tree: article -> header + dl + list
#    - Device Toolbar: iPhone SE (375px) -> Zero horizontal scroll
# Git Log: 2 atomic commits matching TASK_DECOMPOSITION.md
# ============================================================

set -u
cd "$(dirname "$0")"

FAILURES=0

audit() {
  local label="$1"; shift
  echo ""
  echo "== ${label} =="
  if "$@" > /tmp/ex1_audit_out.txt 2>&1; then
    echo "FAIL:"; cat /tmp/ex1_audit_out.txt
    FAILURES=$((FAILURES + 1))
  else
    echo "PASS: 0 matches (Empty)"
  fi
}

echo "CHECKPOINT 1 : VERIFICATION SUITE (Minute 75)"
echo "--------------------------------------------"

# 1. Verify ZERO <div> soup inside component:
#    grep -n '<div' src/components/DeveloperCard.jsx
#    Expected output: 0 matches (Empty)
audit "1. Zero <div> soup in DeveloperCard.jsx" grep -n '<div' src/components/DeveloperCard.jsx

# 2. Verify HTTPS-only media origins:
#    grep -n 'http://' src/components/DeveloperCard.jsx
#    Expected output: 0 matches
audit "2. HTTPS-only media origins" grep -n 'http://' src/components/DeveloperCard.jsx

# 3. Chrome DevTools Inspection (manual - instructions only)
echo ""
echo "== 3. Chrome DevTools Inspection (MANUAL) =="
echo "   - npm run dev"
echo "   - Elements -> Accessibility Tree: article -> header + dl + list"
echo "   - Device Toolbar (Ctrl+Shift+M): iPhone SE (375px) -> Zero horizontal scroll"
echo "   - Network: block images -> fallback initials must appear"

# 4. Git Log: 2 atomic commits matching TASK_DECOMPOSITION.md
echo ""
echo "== 4. Git atomic commits (expected 2 matching WBS) =="
COMMITS=$(git log --oneline -100 -- . | grep -cE 'feat\(ex1\): implement semantic DeveloperCard and SkillBadge|style\(ex1\): add responsive 375px CSS module')
echo "   Found: ${COMMITS} / 2 matching commits"
if [ "${COMMITS}" -lt 2 ]; then
  FAILURES=$((FAILURES + 1))
fi
git log --oneline -5 -- .

echo ""
echo "--------------------------------------------"
if [ "${FAILURES}" -eq 0 ]; then
  echo "AUDIT RESULT: ALL CHECKS PASSED"
else
  echo "AUDIT RESULT: ${FAILURES} check(s) FAILED"
  exit 1
fi
