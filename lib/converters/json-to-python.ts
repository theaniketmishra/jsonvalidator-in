import { validateJson } from "../json/validate";
import type { JsonFormatResult } from "../json/types";

function toPython(value: unknown, indent: number): string {
  const pad = "    ".repeat(indent);
  const nextPad = "    ".repeat(indent + 1);

  if (value === null) return "None";
  if (typeof value === "boolean") return value ? "True" : "False";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value.map((v) => `${nextPad}${toPython(v, indent + 1)}`).join(",\n")}\n${pad}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) return "{}";
  return `{\n${entries.map(([k, v]) => `${nextPad}'${k}': ${toPython(v, indent + 1)}`).join(",\n")}\n${pad}}`;
}

/** Converts JSON into a Python dict/list literal (True/False/None substitutions). */
export function jsonToPython(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  return { success: true, output: toPython(result.parsed, 0), durationMs: performance.now() - start };
}
