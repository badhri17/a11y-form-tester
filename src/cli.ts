import { program } from "commander";
import { runAll } from "./runner/runPage.js";
import { ConsoleReporter } from "./reporters/console.js";

program
  .name("a11y-form-tester")
  .description("Scan forms with Playwright + aXe and interactive scenarios")
  .argument("<glob...>", "Files or URLs to audit")
  .option("-r, --report <html>", "Generate HTML report at given path")
  .parse();

const opts = program.opts();
const files: string[] = program.args;

runAll(files, opts)
  .then(async(result) => {
    const reporter = new ConsoleReporter();
    reporter.output(result);
    if (opts.report) {
      const { HtmlReporter } = await import("./reporters/html.js");
      await new HtmlReporter(opts.report).output(result);
    }
    if (result.violationCount > 0) process.exit(1);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
