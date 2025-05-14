import type { Result as AxeViolation } from "axe-core";

/**
 * Remove duplicates across multiple scans.
 * Uniqueness key: ruleId + joined target selector(s).
 */
export function dedupe(violations: AxeViolation[]): AxeViolation[] {
  const map = new Map<string, AxeViolation>();
  for (const v of violations) {
    for (const node of v.nodes) {
      const key = `${v.id}|${node.target.join("<")}`;
      if (!map.has(key)) {
        map.set(key, { ...v, nodes: [node] });
      }
    }
  }
  return Array.from(map.values());
}
