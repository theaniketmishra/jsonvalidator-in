import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

interface FieldRow {
  path: string;
  type: string;
  example: string;
}

function typeOf(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
  return typeof value;
}

function exampleOf(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string") return `"${value.length > 40 ? `${value.slice(0, 40)}…` : value}"`;
  if (Array.isArray(value)) return `[ ${value.length} item${value.length === 1 ? "" : "s"} ]`;
  if (typeof value === "object") return "{ … }";
  return String(value);
}

function walk(value: unknown, path: string, rows: FieldRow[]): void {
  if (Array.isArray(value)) {
    if (value.length > 0) walk(value[0], `${path}[]`, rows);
    return;
  }
  if (value !== null && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      const p = path ? `${path}.${k}` : k;
      rows.push({ path: p, type: typeOf(v), example: exampleOf(v) });
      walk(v, p, rows);
    });
  }
}

/** Generates a Markdown field reference table from a sample JSON document. */
export function generateJsonDocs(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const rows: FieldRow[] = [];
  walk(result.parsed, "", rows);

  const lines = [
    "# JSON Field Reference",
    "",
    "| Field | Type | Example |",
    "|---|---|---|",
    ...rows.map((r) => `| \`${r.path}\` | ${r.type} | ${r.example} |`),
  ];

  if (rows.length === 0) {
    lines.push("", `_(Top-level value is a single ${typeOf(result.parsed)}: ${exampleOf(result.parsed)})_`);
  }

  return { success: true, output: lines.join("\n"), durationMs: performance.now() - start };
}
