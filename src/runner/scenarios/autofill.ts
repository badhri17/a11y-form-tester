import type { Page } from "playwright";

/**
 * Heuristically fills inputs, textareas, selects, checkboxes and radios so
 * native HTML validation passes.  Useful before submit scenarios so JS
 * validators and error UIs can render.
 *
 * Fields can opt‑out by adding  data-a11y-autofill="off".
 */
export async function autofill(page: Page) {
  // Fill <input> elements
  await page.$$eval(
    'input:not([type=hidden]):not([data-a11y-autofill="off"])',
    (els) => {
      els.forEach((element) => {
        const el = element as HTMLInputElement;
        const type = (el.getAttribute("type") || "text").toLowerCase();
        switch (type) {
          case "email":
            el.value = "test@example.com";
            break;
          case "number":
            el.value = "42";
            break;
          case "tel":
            el.value = "+1234567890";
            break;
          case "url":
            el.value = "https://example.com";
            break;
          case "checkbox":
            (el as HTMLInputElement).checked = true;
            el.dispatchEvent(new Event("change", { bubbles: true })); // NEW
            break;
          case "radio":
            if (!(el as HTMLInputElement).checked)
              (el as HTMLInputElement).checked = true;
                el.dispatchEvent(new Event("change", { bubbles: true })); // NEW
            break;
          case "password":
            el.value = "Aa123456!";
            break;
          default:
            el.value = "x";
        }
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
  );

  // Fill <textarea>
  await page.$$eval('textarea:not([data-a11y-autofill="off"])', (areas) => {
    areas.forEach((element) => {
     const ta = element as HTMLTextAreaElement;
      ta.value = "sample text";
      ta.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  // Select first non-disabled option for <select>
  await page.$$eval('select:not([data-a11y-autofill="off"])', (sels) => {
    sels.forEach((element) => {
      const sel = element as HTMLSelectElement;
      const idx = Array.from(sel.options).findIndex((o) => !o.disabled);
      if (idx >= 0) sel.selectedIndex = idx;
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}
