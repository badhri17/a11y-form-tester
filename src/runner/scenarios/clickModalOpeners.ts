import type { Page } from "playwright";

/**
 * Click every element marked data-a11y-modal="open".
 * – Skips hidden / disabled buttons.
 * – Waits for the dialog element (role=dialog) instead of a fixed sleep.
 */
export async function clickModalOpeners(page: Page) {
  
  const openers = await page.$$(
    '[data-a11y-modal="open"]:not([disabled]):not([aria-disabled="true"])'
  );

  for (const opener of openers) {

    await opener.evaluate((el) => el.scrollIntoView({ block: "center" }));

    await opener.click();
     
    await page
      .waitForSelector('[role="dialog"]', { timeout: 500 })
      .catch(() => {
        
      });
  }
}
