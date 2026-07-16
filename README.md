# Uma-Picker QA

Manual and automated testing suite for [Uma-Picker](https://uma-picker.onrender.com) —
a wheel spin game that picks your next Umamusume career, faithfully replicating
the wheel mini-game from the Umamusume mobile game.

## Project Overview

Uma-Picker is a React frontend application featuring an animated spinning wheel
with character selection. Users can filter which characters appear on the wheel
and spin to get a random result.

## Test Coverage

### Manual Testing

- 20 test cases across 3 feature areas
- Executed in Qase with full pass/fail documentation
- 2 bugs found and documented

### Automated Testing

- 20 Playwright + TypeScript automated tests
- Covers Spin Feature, Filter Feature, UI & Visuals, and bug regression coverage
- Tests run against live production environment
- Cross-browser CI on every push/PR (Chromium + Firefox + WebKit, run in a parallel matrix)

### Feature Areas Tested

Spin Feature → TAP/STOP button, wheel behavior, result overlay
Filter Feature → character selection, search, confirm, counter
UI & Visuals → page title, console errors, mobile layout, music toggle
Bug Regression → winner modal dismiss behavior, filter button lockout during spin

## Bugs Found

| ID      | Title                                                         | Severity | Priority | Status |
| ------- | ---------------------------------------------------------------- | -------- | -------- | ------ |
| BUG-001 | Results overlay not dismissed when clicking winner avatar div    | Medium   | High     | Fixed  |
| BUG-002 | Filter button remains active while wheel is spinning             | High     | High     | Fixed  |

Both fixes shipped with a Playwright regression test that failed against the bug and passes against the fix, verified live on production.

### BUG-001 Detail

Steps:

Open uma-picker.onrender.com
Click TAP to start spin
Wait for result or click STOP
Click inside the winner avatar and text div

Actual: Overlay does not dismiss
Expected: Clicking anywhere dismisses the overlay

Root cause: the winner modal's content wrapper called `e.stopPropagation()` on click, blocking the outer overlay's dismiss handler from ever firing when the click landed on the result text or image.

### BUG-002 Detail

Steps:

Open uma-picker.onrender.com
Click TAP to start spin
Click Filter button while wheel is spinning

Actual: Filter modal opens during active spin
Expected: Filter button disabled during spin

Root cause: the filter-open button was never wired to the app's `isSpinning` state, despite the underlying `Button` component already fully supporting a `disabled` prop.

## CI Performance

Migrated GitHub Actions from a single sequential job (all 3 browsers in one runner) to a parallel matrix (one job per browser). Measured wall-clock CI time dropped from ~330s to 168s (~49% faster).

## Tools Used

| Tool                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| Playwright + TypeScript | Test automation                                      |
| Qase                    | Test case management and execution                   |
| Jira                    | Bug tracking                                         |
| Browser DevTools        | Console monitoring, DOM inspection, mobile emulation |

## How to Run Automated Tests

```bash
# Install dependencies
npm install

# Run all tests with UI
npx playwright test --ui

# Run specific feature file
npx playwright test filter-feature.spec.ts --ui

# Run headless and view report
npx playwright test
npx playwright show-report
```

## Test Structure

tests/
├── filter-feature.spec.ts → character filter and selection
├── spin-feature.spec.ts → wheel spin and result behavior
├── ui-visuals.spec.ts → UI, layout, and visual checks
└── bug-regression.spec.ts → BUG-001 and BUG-002 regression coverage

## Notes

- Hosted on Render free tier — first load may take 30+ seconds (cold start)
- Animation behavior tested manually — not automatable with Playwright
- Character sprite animations verified manually
- Audio tested manually — app uses Web Audio API not automatable
- Mobile layout verified via Playwright device emulation (iPhone 14)
