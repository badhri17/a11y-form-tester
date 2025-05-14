import { describe, it, expect } from "vitest";
import { dedupe } from "../../src/utils/dedupe";
import type {
  Result as AxeViolation,
  NodeResult,
  ImpactValue,
  CheckResult,
} from "axe-core";

/** ---------- helpers ---------- */

const emptyChecks: CheckResult[] = [];

const makeNode = (selector: string): NodeResult => ({
  html: "<input>",
  target: [selector],
  impact: "critical" as ImpactValue,
  any: emptyChecks,
  all: emptyChecks,
  none: emptyChecks,
});

const makeViolation = (id: string, selector: string): AxeViolation =>
  ({
    id,
    impact: "critical",
    description: "",
    help: "",
    helpUrl: "",
    tags: [],
    nodes: [makeNode(selector)],
  } as unknown as AxeViolation); // cast to satisfy the full type

/** ---------- tests ---------- */

describe("dedupe()", () => {
  it("removes duplicate rule + target pairs", () => {
    const list = [
      makeViolation("label", "#foo"),
      makeViolation("label", "#foo"), // duplicate
      makeViolation("select-name", "#bar"),
    ];

    const unique = dedupe(list);

    expect(unique).toHaveLength(2);
    expect(unique.map((v) => v.id).sort()).toEqual(["label", "select-name"]);
  });
});
