# a11y-form-tester

**a11y-form-tester** is a command-line tool for automated accessibility (a11y) testing of web forms using Playwright and axe-core. It focuses on detecting WCAG issues that impact form interaction and understanding, supporting both static and interactive scenarios.

---

## Features

- **Opinionated Form Testing**: Targets accessibility issues specific to forms.
- **Zero-config**: Works out-of-the-box with a single command.
- **Interactive Scenarios**: Simulates user actions (e.g., submitting forms, toggling checkboxes).
- **Multiple Reporters**: Outputs results to the console and optionally as a beautiful HTML report.
- **Extensible**: Add new reporters, scenarios, or rule packs as plugins.
- **Automated**: Designed for CI/CD and local development workflows.

---

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** (or npm)

### Installation

You can use `npx` (no install required):

```sh
npx a11y-form-tester <glob>
```

Or clone and run locally:

```sh
git clone https://github.com/your-org/a11y-form-tester.git
cd a11y-form-tester
pnpm install
pnpm dev
```

---

## Usage

```sh
pnpm exec tsx src/cli.ts <glob> [options]
```

- `<glob>`: One or more file globs or URLs to audit (e.g., `test/fixtures/*.html`)
- `-r, --report <html>`: Generate an HTML report at the given path

**Example:**

```sh
pnpm exec tsx src/cli.ts test/fixtures/*.html --report report.html
```

---

## Project Structure

```
src/
  runner/         # Playwright & Axe orchestration
  reporters/      # Console / HTML / ... plugins
  utils/          # Stateless helpers
template/         # Handlebars templates for HTML reports
test/             # Unit and fixture tests
```

---

## Development

- **Run Dev**: `pnpm dev`
- **Run Tests**: `pnpm test`
- **HTML Report**: Generated with `--report <path>`, uses Handlebars templates and custom CSS.

---

## Contributing

See [Project Rules & Conventions](./Project%20Rules%20%26%20Conventions.md) for coding standards, branching, and commit guidelines.

- PRs should pass all tests and CI.
- Add or update unit tests for new features or bug fixes.
- Keep the codebase focused on form-related accessibility.

---

## License

MIT

---

## Maintainers

| GitHub handle       | Role            |
| ------------------- | --------------- |
| **@your‑name‑here** | Lead maintainer |

---

## Acknowledgements

- [axe-core](https://github.com/dequelabs/axe-core)
- [Playwright](https://github.com/microsoft/playwright)
- [Commander](https://github.com/tj/commander.js)
- [Handlebars](https://handlebarsjs.com/)

---
