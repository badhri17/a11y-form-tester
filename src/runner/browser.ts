import { chromium, Browser } from "playwright";

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (!browser) browser = await chromium.launch();
  return browser;
}

export async function closeBrowser() {
  if (browser) await browser.close();
}
