import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

function typeOf(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function collectPaths(value: unknown, path: string, into: Map<string, Set<string>>): void {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      const p = path ? `${path}.${k}` : k;
      if (!into.has(p)) into.set(p, new Set());
      into.get(p)!.add(typeOf(v));
      if (v !== null && typeof v === "object" && !Array.isArray(v)) collectPaths(v, p, into);
    });
  }
}

/**
 * Given a JSON array of records, reports how consistently each field
 * appears across the array and whether its type is consistent.
 */
export function generateFieldHeatmap(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  if (!Array.isArray(result.parsed) || result.parsed.length === 0) {
    return {
      success: false,
      error: { message: "Input must be a non-empty JSON array of objects.", position: { line: 1, column: 1, offset: 0 } },
      durationMs: performance.now() - start,
    };
  }

  const records = result.parsed as unknown[];
  const fieldTypes = new Map<string, Set<string>>();
  const fieldPresence = new Map<string, number>();

  records.forEach((record) => {
    const seen = new Map<string, Set<string>>();
    collectPaths(record, "", seen);
    seen.forEach((types, path) => {
      fieldPresence.set(path, (fieldPresence.get(path) ?? 0) + 1);
      if (!fieldTypes.has(path)) fieldTypes.set(path, new Set());
      types.forEach((t) => fieldTypes.get(path)!.add(t));
    });
  });

  const total = records.length;
  const rows = Array.from(fieldPresence.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([path, count]) => {
      const pct = Math.round((count / total) * 100);
      const types = Array.from(fieldTypes.get(path) ?? []);
      const typeNote = types.length > 1 ? `⚠ inconsistent (${types.join(", ")})` : types[0];
      return `| \`${path}\` | ${count}/${total} (${pct}%) | ${typeNote} |`;
    });

  const lines = [
    `# Field Usage Heatmap (${total} record${total === 1 ? "" : "s"})`,
    "",
    "| Field | Present in | Type(s) |",
    "|---|---|---|",
    ...rows,
  ];

  return { success: true, output: lines.join("\n"), durationMs: performance.now() - start };
}
