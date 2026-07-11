import { validateJson } from "./validate";
import type { IndentOption, JsonFormatResult } from "./types";

function resolveIndent(indent: IndentOption): string | number {
  switch (indent) {
    case "2":
      return 2;
    case "4":
      return 4;
    case "tab":
      return "\t";
    case "minified":
      return 0;
    default:
      return 2;
  }
}

/**
 * Pretty-prints (or minifies, via indent="minified") a JSON string.
 * Key order is preserved; only whitespace changes.
 */
export function formatJson(input: string, indent: IndentOption = "2"): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);

  if (!result.valid) {
    return { success: false, error: result.error, durationMs: performance.now() - start };
  }

  const output =
    indent === "minified"
      ? JSON.stringify(result.parsed)
      : JSON.stringify(result.parsed, null, resolveIndent(indent));

  return { success: true, output, durationMs: performance.now() - start };
}

export function minifyJson(input: string): JsonFormatResult {
  return formatJson(input, "minified");
}

/** Sorts object keys alphabetically at every depth of the document. */
export function sortJsonKeys(input: string, indent: IndentOption = "2"): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);

  if (!result.valid) {
    return { success: false, error: result.error, durationMs: performance.now() - start };
  }

  const sortDeep = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(sortDeep);
    if (value && typeof value === "object") {
      return Object.keys(value as Record<string, unknown>)
        .sort((a, b) => a.localeCompare(b))
        .reduce<Record<string, unknown>>((acc, key) => {
          acc[key] = sortDeep((value as Record<string, unknown>)[key]);
          return acc;
        }, {});
    }
    return value;
  };

  const sorted = sortDeep(result.parsed);
  const output =
    indent === "minified" ? JSON.stringify(sorted) : JSON.stringify(sorted, null, resolveIndent(indent));

  return { success: true, output, durationMs: performance.now() - start };
}
