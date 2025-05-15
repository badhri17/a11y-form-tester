import { AxeBuilder } from "@axe-core/playwright";
import type { Page } from "playwright";

const formRelatedRules = [
  "label",
  "aria-input-field-name",
  "aria-required-attr",
  "color-contrast",
  "form-field-multiple-labels",
  "focus-order-semantics",
  "aria-input-field-name",
  "autocomplete-valid",
  "label-title-only",
  "select-name",
  "aria-dialog-name",
  "duplicate-id",
  "button-name",
];

export async function axeScan(page: Page, options?: { rules?: string }) {
  const axeBuilder = new AxeBuilder({ page });
  
  // If custom rules are provided via CLI, use those
  // Otherwise use our curated form-related rules
  if (options?.rules) {
    const customRules = options.rules.split(',').map(rule => rule.trim());
    axeBuilder.withRules(customRules);
  } else {
    axeBuilder.withRules(formRelatedRules);
  }
  
  const results = await axeBuilder.analyze();
  return results;
}
