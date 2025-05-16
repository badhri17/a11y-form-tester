# a11y-form-tester

![CI](https://github.com/badhri17/a11-form-tester/actions/workflows/ci.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/a11y-form-tester)](https://www.npmjs.com/package/a11y-form-tester)

> **Interactive accessibility testing for real-world forms**  
> Runs axe-core *after* the clicks, key-presses and dynamic DOM changes your users actually make.

---

## Why not just run a static linter?

| Static axe / Lighthouse | a11y-form-tester |
|-------------------------|------------------|
| Scans the HTML that exists on first paint | Re-runs axe **after each scenario** (fill, submit, tab-loop, open-modal…) |
| Misses fields that are revealed later | Catches missing labels, duplicate IDs, modal issues, bad autocomplete tokens, etc. |
| No keyboard interaction | Simulates Tab navigation to surface focus-order defects |

---

## Key features

* **Plug-and-play CLI** – `npx a11y-form-tester "dist/**/*.html"`
* **Scenario engine**  
  * static scan → *submit form* → dynamic scan  
  * auto-fill required fields  
  * tab-loop for focus-trap checks  
  * open modals / dialogs
* **Deduplicated report** – one line per unique rule + element
* **Zero config CI** – exits `1` when violations are found
* **Type-safe** – written in TypeScript, published with `.d.ts`

---

## CLI usage

```bash
a11y-form-tester "<glob/of/pages/**/*.html>" [options]

Options
  --report <file>   Save pretty HTML report to the given path
  --max <n>         Fail only when more than <n> violations (default: 0)
  --rules <list>    Comma-separated axe rule IDs to run (defaults to smart subset)
```

Example:

```bash
npx a11y-form-tester "build/**/*.html" --report a11y.html
```

The CLI prints a coloured table and writes `a11y.html` next to your artefacts.

---

## Real-world bugs it finds

| Scenario (ships in repo)                                         | Rule triggered       | Why static scan misses it           |
| ---------------------------------------------------------------- | -------------------- | ----------------------------------- |
| **Coupon code** `<select>` appears after checkbox – has no label | `select-name`        | Field not in initial DOM            |
| **Dialog** injected by JavaScript lacks accessible name          | `aria-dialog-name`   | Dialog exists only after click      |
| **VAT ID** field revealed with invalid `autocomplete="tax-id"`   | `autocomplete-valid` | Attribute not validated until shown |
| **Clone phone field** duplicates `id="phone"`                    | `duplicate-id`       | Clone added after checkbox          |
| **Icon-only "help" button** injected later                       | `button-name`        | No accessible name                  |
| **Referral input** relies only on `title`                        | `label-title-only`   | Field hidden until user action      |
| **Error message** with poor color contrast                       | `color-contrast`     | Error shown only after validation   |
| **Password field** missing label                                 | `label`              | Basic but common oversight          |

All eight fixtures live under `test/fixtures/` for you to try.

---

## Add to CI in 15 seconds (GitHub Actions)

```yaml
# .github/workflows/a11y.yml
name: a11y
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 8 }
      - run: pnpm install --frozen-lockfile
      - run: pnpx a11y-form-tester "dist/**/*.html"
```

Green build = zero violations.

---

## Configuration

Create **`a11y-form-tester.config.json`** in project root (optional):

```jsonc
{
  "rules": ["label", "select-name", "autocomplete-valid"],
  "max": 5,
}
```

---

## Contributing

PRs & issues are welcome! Here are some areas and suggestions I am looking to improve:

* **Unit Tests** - Help us reach better coverage for:
  * CLI argument processing
  * HTML report generation
  * Axe rule configuration

* **New Scenarios** - Add more test scenarios in `src/runner/scenarios/`:
  * Current scenarios include form submission, tab navigation, autofill, and modal opening
  * We need scenarios for hover interactions, drag-and-drop, custom form controls, etc.
  * Each scenario should be a simple async function that manipulates the page

* **New Features** - Priority items:
  * Config file support for project-specific settings
  * Additional reporter formats (JUnit XML, JSON)
  * Support for more axe rules (custom rule packs)
 
## License

MIT

---

## ☕ Buy me a coffee

[![Buy Me A Coffee](https://img.shields.io/badge/-buy%20me%20a%20coffee-FFDD00?logo=buy-me-a-coffee\&logoColor=black\&style=for-the-badge)](https://www.buymeacoffee.com/badhri)
