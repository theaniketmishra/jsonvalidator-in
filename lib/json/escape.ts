import type { JsonFormatResult } from "./types";

/** Escapes plain text into a valid JSON string literal (including surrounding quotes). */
export function escapeJsonString(input: string): JsonFormatResult {
  const start = performance.now();
  if (input.length === 0) return { success: true, output: "", durationMs: performance.now() - start };
  return { success: true, output: JSON.stringify(input), durationMs: performance.now() - start };
}

/** Unescapes a JSON string literal (with or without surrounding quotes) back into plain text. */
export function unescapeJsonString(input: string): JsonFormatResult {
  const start = performance.now();
  const trimmed = input.trim();
  try {
    const wrapped = trimmed.charAt(0) === '"' ? trimmed : `"${trimmed}"`;
    const output = JSON.parse(wrapped);
    return { success: true, output, durationMs: performance.now() - start };
  } catch {
    return {
      success: false,
      error: { message: "That doesn't look like an escaped JSON string.", position: { line: 1, column: 1, offset: 0 } },
      durationMs: performance.now() - start,
    };
  }
}
