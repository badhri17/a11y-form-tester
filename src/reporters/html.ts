import templateStr from "../../template/htmlReport.hbs"; // no ?raw once loader is set
import Handlebars from "handlebars";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ScanResult } from "../runner/runPage.js";

const tpl = Handlebars.compile(templateStr);

export class HtmlReporter {
  constructor(private out: string) {}

  async output(data: { pages: ScanResult[] }) {
    const html = tpl(data);
    await mkdir(path.dirname(this.out), { recursive: true });
    await writeFile(this.out, html, "utf8");
    console.log("HTML report saved to", this.out);
  }
}
