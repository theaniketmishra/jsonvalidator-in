import { validateJson } from "../json/validate";
import type { JsonFormatResult } from "../json/types";

function yamlScalar(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  const str = String(value);
  if (str === "" || /^\s|\s$|[:#[\]{}|>*&!%@`"']/.test(str) || /^(true|false|null|~|\d)/i.test(str)) {
    return `"${str.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return str;
}

function toYaml(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) return `${pad}[]\n`;
    return value
      .map((item) => {
        if (item !== null && typeof item === "object") {
          const nested = toYaml(item, indent + 1).replace(/^\s+/, "");
          return `${pad}- ${nested}`;
        }
        return `${pad}- ${yamlScalar(item)}\n`;
      })
      .join("");
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${pad}{}\n`;
    return entries
      .map(([k, child]) => {
        if (child !== null && typeof child === "object" && Object.keys(child).length > 0) {
          return `${pad}${k}:\n${toYaml(child, indent + 1)}`;
        }
        if (Array.isArray(child) && child.length > 0) {
          return `${pad}${k}:\n${toYaml(child, indent)}`;
        }
        return `${pad}${k}: ${yamlScalar(child)}\n`;
      })
      .join("");
  }

  return `${pad}${yamlScalar(value)}\n`;
}

/** Converts JSON into YAML (covers the common cases; not a full YAML 1.2 implementation). */
export function jsonToYaml(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const output = toYaml(result.parsed, 0).replace(/\n$/, "");
  return { success: true, output, durationMs: performance.now() - start };
}
