import fs from "node:fs/promises";
import path from "node:path";
import Handlebars from "handlebars";
import type { ScanResult } from "../runner/runPage.js";
import { fileURLToPath } from 'node:url'; 


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class HtmlReporter {
  constructor(private out: string) {}

  async output(data: { pages: ScanResult[] }) {
    const tplPath = path.resolve(__dirname, "../../template/htmlReport.hbs"); // Use __dirname
    // console.log(`[HtmlReporter] Attempting to read template from: ${tplPath}`); // Optional: for debugging template path
    const tplStr = await fs.readFile(
      tplPath, // Use the resolved tplPath
      "utf8"
    );
    const template = Handlebars.compile(tplStr);
    const html = template(data);
    await fs.mkdir(path.dirname(this.out), { recursive: true });
    await fs.writeFile(this.out, html, "utf8");
    console.log("HTML report saved to", this.out); // This log should now appear if successful
  }
}