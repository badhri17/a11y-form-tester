import type { Page } from "playwright";

export async function tabLoop(page: Page) {
  const visited = new Set<string>();
  for (let i = 0; i < 150; i++) {
    await page.keyboard.press("Tab");
    const active = await page.evaluate(() =>
      document.activeElement ? document.activeElement.outerHTML : null
    );
    if (!active) break;
    if (visited.has(active)) break; // focus cycled
    visited.add(active);
  }
}
