import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

function diffValues(a: unknown, b: unknown, path: string, lines: string[]): void {
  const aIsObj = a !== null && typeof a === "object";
  const bIsObj = b !== null && typeof b === "object";

  if (aIsObj && bIsObj && Array.isArray(a) === Array.isArray(b)) {
    if (Array.isArray(a) && Array.isArray(b)) {
      const maxLen = Math.max(a.length, b.length);
      for (let i = 0; i < maxLen; i++) {
        const p = `${path}[${i}]`;
        if (i >= a.length) lines.push(`+ ${p} = ${JSON.stringify(b[i])}`);
        else if (i >= b.length) lines.push(`- ${p} = ${JSON.stringify(a[i])}`);
        else diffValues(a[i], b[i], p, lines);
      }
      return;
    }
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keys = Object.keys({ ...objA, ...objB });
    keys.forEach((k) => {
      const p = path ? `${path}.${k}` : k;
      const hasA = Object.prototype.hasOwnProperty.call(objA, k);
      const hasB = Object.prototype.hasOwnProperty.call(objB, k);
      if (hasA && !hasB) lines.push(`- ${p} (removed, was ${JSON.stringify(objA[k])})`);
      else if (!hasA && hasB) lines.push(`+ ${p} (added: ${JSON.stringify(objB[k])})`);
      else diffValues(objA[k], objB[k], p, lines);
    });
    return;
  }

  if (JSON.stringify(a) !== JSON.stringify(b)) {
    lines.push(`~ ${path || "(root)"}: ${JSON.stringify(a)}  →  ${JSON.stringify(b)}`);
  }
}

/** Compares two JSON documents and returns a plain-text report of what changed. */
export function diffJson(leftInput: string, rightInput: string): JsonFormatResult {
  const start = performance.now();
  const left = validateJson(leftInput);
  if (!left.valid) return { success: false, error: left.error, side: "left", durationMs: performance.now() - start };
  const right = validateJson(rightInput);
  if (!right.valid) return { success: false, error: right.error, side: "right", durationMs: performance.now() - start };

  const lines: string[] = [];
  diffValues(left.parsed, right.parsed, "", lines);
  const output = lines.length === 0 ? "No differences — the two documents are identical." : lines.join("\n");
  return { success: true, output, durationMs: performance.now() - start };
}
