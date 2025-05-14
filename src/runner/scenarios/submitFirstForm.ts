import type { Page } from "playwright";

export async function submitFirstForm(page: Page) {
  const firstForm = await page.$("form");
  if (firstForm) {
    await firstForm.evaluate((form) =>
      (form as HTMLFormElement).requestSubmit()
    );
    await page.waitForTimeout(100); // allow DOM updates
  }
}
