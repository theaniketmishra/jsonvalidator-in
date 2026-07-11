import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

function deepMerge(a: unknown, b: unknown): unknown {
  if (Array.isArray(a) && Array.isArray(b)) return b;
  if (a !== null && typeof a === "object" && !Array.isArray(a) && b !== null && typeof b === "object" && !Array.isArray(b)) {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const out: Record<string, unknown> = { ...objA };
    Object.keys(objB).forEach((k) => {
      out[k] = Object.prototype.hasOwnProperty.call(objA, k) ? deepMerge(objA[k], objB[k]) : objB[k];
    });
    return out;
  }
  return b;
}

/** Deep-merges two JSON documents; values from the second document win on conflict. */
export function mergeJson(leftInput: string, rightInput: string): JsonFormatResult {
  const start = performance.now();
  const left = validateJson(leftInput);
  if (!left.valid) return { success: false, error: left.error, side: "left", durationMs: performance.now() - start };
  const right = validateJson(rightInput);
  if (!right.valid) return { success: false, error: right.error, side: "right", durationMs: performance.now() - start };

  const merged = deepMerge(left.parsed, right.parsed);
  return { success: true, output: JSON.stringify(merged, null, 2), durationMs: performance.now() - start };
}
