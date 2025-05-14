import chalk from "chalk";
import type { ScanResult } from "../runner/runPage.js";

export class ConsoleReporter {
  output(data: { pages: ScanResult[]; violationCount: number }) {
    console.log();
    for (const p of data.pages) {
      const count = p.violations.length;
      const colour = count === 0 ? chalk.green : chalk.red;
      console.log(
        `${colour(count === 0 ? "✓" : "✖")} ${p.file} – ${count} violations`
      );
    }
    console.log();
    console.log(
      `${
        data.violationCount === 0
          ? chalk.green("All good!")
          : chalk.red.bold(data.violationCount + " total violations")
      }`
    );
  }
}
