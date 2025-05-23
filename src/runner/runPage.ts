import fg from "fast-glob";
import { axeScan } from "./axe.js";
import { getBrowser, closeBrowser } from "./browser.js";
import { submitFirstForm } from "./scenarios/submitFirstForm.js";
import { tabLoop } from "./scenarios/tabLoop.js";
import { autofill } from "./scenarios/autofill.js";
import { clickModalOpeners } from "./scenarios/clickModalOpeners.js";

import type { Result as AxeViolation } from "axe-core";
import { dedupe } from "../utils/dedupe.js";

// Register scenarios here – order matters
const scenarios = [
  submitFirstForm, 
  autofill,
  clickModalOpeners,
  submitFirstForm,
  tabLoop,
];

export interface ScanResult {
  file: string;
  violations: AxeViolation[];
}

export async function runAll(files: string[], options: {
  report?: string;
  max?: string;
  rules?: string;
}) {
  // Parse the rules if provided
  const runOptions: any = {};
  
  if (options.rules) {
    const rulesList = options.rules.split(',').map(rule => rule.trim());
    runOptions.runOnly = {
      type: 'rule',
      values: rulesList
    };
  }
  
  const targets = await fg(files, { onlyFiles: false });
  const browser = await getBrowser();
  const context = await browser.newContext();

  const results: ScanResult[] = [];
  for (const t of targets) {
    const page = await context.newPage();
    await page.goto(
      t.startsWith("http") ? t : "file://" + process.cwd() + "/" + t
    );

    const merged: AxeViolation[] = [];

    // 1. Static pass
    const staticRes = await axeScan(page, { rules: options.rules });
    merged.push(...staticRes.violations);

    // 2. Interactive passes (each scenario may mutate DOM)
    for (const scenario of scenarios) {
      await scenario(page);
      const res = await axeScan(page, { rules: options.rules });
      merged.push(...res.violations);
    }

    results.push({ file: t, violations: dedupe(merged) });
    await page.close();
  }

  await closeBrowser();

  return {
    pages: results,
    violationCount: results.reduce((c, r) => c + r.violations.length, 0),
  };
}
