import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

function searchValue(value: unknown, path: string, query: string, results: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => searchValue(item, `${path}[${i}]`, query, results));
    return;
  }
  if (value !== null && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      const p = path ? `${path}.${k}` : k;
      if (k.toLowerCase().includes(query)) results.push(`${p} = ${JSON.stringify(v)}`);
      searchValue(v, p, query, results);
    });
    return;
  }
  const str = String(value).toLowerCase();
  if (str.includes(query) && path) {
    const already = results.some((r) => r.startsWith(`${path} = `));
    if (!already) results.push(`${path} = ${JSON.stringify(value)}`);
  }
}

/** Searches a JSON document for a key or value substring, returning matching paths. */
export function searchJson(input: string, query: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };
  if (!query || !query.trim()) {
    return { success: true, output: "Enter a key or value to search for.", durationMs: performance.now() - start };
  }

  const results: string[] = [];
  searchValue(result.parsed, "", query.trim().toLowerCase(), results);
  const output = results.length === 0 ? `No matches for "${query}".` : results.join("\n");
  return { success: true, output, durationMs: performance.now() - start };
}
