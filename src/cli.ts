import { program } from "commander";
import { runAll } from "./runner/runPage.js";
import { ConsoleReporter } from "./reporters/console.js";

program
  .name("a11y-form-tester")
  .description("Scan forms with Playwright + aXe and interactive scenarios")
  .argument("<glob...>", "Files or URLs to audit")
  .option("-r, --report <html>", "Generate HTML report at given path")
  .option("-m, --max <number>", "Fail only when more than <number> violations", "0")
  .option("--rules <list>", "Comma-separated axe rule IDs to run")
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
    
    // Check against the max threshold
    const maxViolations = parseInt(opts.max, 10);
    if (result.violationCount > maxViolations) {
      console.log(`Found ${result.violationCount} violations, which exceeds your threshold of ${maxViolations}`);
      process.exit(1);
    }
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
