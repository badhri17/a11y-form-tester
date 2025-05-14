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

export async function axeScan(page: Page) {
  const results = await new AxeBuilder({ page })
    .withRules(formRelatedRules)
    .analyze();
  
  return results;
}
