import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

function byteSize(text: string): number {
  return new TextEncoder().encode(text).length;
}

function findEmptyOrNullFields(value: unknown, path: string, findings: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => findEmptyOrNullFields(item, `${path}[${i}]`, findings));
    return;
  }
  if (value !== null && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      const p = path ? `${path}.${k}` : k;
      const isEmptyArray = Array.isArray(v) && v.length === 0;
      const isEmptyObject = v !== null && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0;
      const isEmptyString = typeof v === "string" && v.length === 0;
      if (v === null || isEmptyArray || isEmptyObject || isEmptyString) {
        findings.push(p);
      } else {
        findEmptyOrNullFields(v, p, findings);
      }
    });
  }
}

interface DuplicateGroup {
  path: string;
  count: number;
}

function findDuplicateArrayItems(value: unknown, path: string, findings: DuplicateGroup[]): void {
  if (Array.isArray(value)) {
    if (value.length > 1) {
      const seen = new Map<string, number>();
      value.forEach((item) => {
        if (item === null || typeof item !== "object") return;
        const key = JSON.stringify(item);
        seen.set(key, (seen.get(key) ?? 0) + 1);
      });
      const dupes = Array.from(seen.values()).filter((c) => c > 1);
      if (dupes.length > 0) {
        findings.push({ path: path || "(root)", count: dupes.reduce((a, b) => a + b, 0) });
      }
    }
    value.forEach((item, i) => findDuplicateArrayItems(item, `${path}[${i}]`, findings));
    return;
  }
  if (value !== null && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => findDuplicateArrayItems(v, path ? `${path}.${k}` : k, findings));
  }
}

interface ConstantKeyFinding {
  arrayPath: string;
  key: string;
  value: string;
}

function findConstantKeysAcrossArray(value: unknown, path: string, findings: ConstantKeyFinding[]): void {
  if (Array.isArray(value)) {
    if (value.length > 2 && value.every((item) => item !== null && typeof item === "object" && !Array.isArray(item))) {
      const items = value as Record<string, unknown>[];
      const first = items[0];
      if (first) {
        const firstKeys = Object.keys(first);
        firstKeys.forEach((key) => {
          const firstValueStr = JSON.stringify(first[key]);
          const allSame = items.every((item) => JSON.stringify(item[key]) === firstValueStr);
          if (allSame && firstValueStr !== undefined) {
            findings.push({ arrayPath: path || "(root)", key, value: firstValueStr.length > 40 ? `${firstValueStr.slice(0, 40)}…` : firstValueStr });
          }
        });
      }
    }
    value.forEach((item, i) => findConstantKeysAcrossArray(item, `${path}[${i}]`, findings));
    return;
  }
  if (value !== null && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => findConstantKeysAcrossArray(v, path ? `${path}.${k}` : k, findings));
  }
}

function maxDepth(value: unknown, depth: number): number {
  if (Array.isArray(value)) return value.reduce((max: number, item) => Math.max(max, maxDepth(item, depth + 1)), depth);
  if (value !== null && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).reduce((max: number, v) => Math.max(max, maxDepth(v, depth + 1)), depth);
  }
  return depth;
}

function findLongPropertyNames(value: unknown, path: string, findings: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => findLongPropertyNames(item, `${path}[${i}]`, findings));
    return;
  }
  if (value !== null && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      if (k.length > 30) findings.push(path ? `${path}.${k}` : k);
      findLongPropertyNames(v, path ? `${path}.${k}` : k, findings);
    });
  }
}

/**
 * Reports how much smaller a payload could get from minifying alone, plus
 * deeper structural opportunities: duplicate objects in arrays, keys with
 * the same value repeated across every array item, long property names,
 * and null/empty fields.
 */
export function optimizePayload(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const originalSize = byteSize(input);
  const minified = JSON.stringify(result.parsed);
  const minifiedSize = byteSize(minified);
  const savingsPct = originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;
  const depth = maxDepth(result.parsed, 0);

  const emptyFields: string[] = [];
  findEmptyOrNullFields(result.parsed, "", emptyFields);

  const duplicateGroups: DuplicateGroup[] = [];
  findDuplicateArrayItems(result.parsed, "", duplicateGroups);

  const constantKeys: ConstantKeyFinding[] = [];
  findConstantKeysAcrossArray(result.parsed, "", constantKeys);

  const longNames: string[] = [];
  findLongPropertyNames(result.parsed, "", longNames);

  const lines = [
    "Size:",
    `  Original: ${(originalSize / 1024).toFixed(2)} KB`,
    `  Minified: ${(minifiedSize / 1024).toFixed(2)} KB (${savingsPct}% smaller)`,
    `  Max nesting depth: ${depth}`,
    "",
  ];

  if (duplicateGroups.length > 0) {
    lines.push(`Duplicate objects found in ${duplicateGroups.length} array(s):`);
    duplicateGroups.forEach((d) => lines.push(`  • ${d.path} — ${d.count} duplicate items`));
    lines.push("  → Recommendation: deduplicate and reference by ID instead of repeating the full object.");
    lines.push("");
  }

  if (constantKeys.length > 0) {
    lines.push(`Keys with the same value repeated across every item in an array (${constantKeys.length}):`);
    constantKeys.slice(0, 15).forEach((c) => lines.push(`  • "${c.key}" in ${c.arrayPath} — always ${c.value}`));
    if (constantKeys.length > 15) lines.push(`  …and ${constantKeys.length - 15} more`);
    lines.push("  → Recommendation: hoist this field out to a parent object instead of repeating it per item.");
    lines.push("");
  }

  if (longNames.length > 0) {
    lines.push(`Long property names (${longNames.length}, over 30 characters):`);
    longNames.slice(0, 15).forEach((p) => lines.push(`  • ${p}`));
    lines.push("  → Recommendation: shorten property names — this adds up across large arrays.");
    lines.push("");
  }

  if (emptyFields.length > 0) {
    lines.push(`Null/empty fields (${emptyFields.length}) — omitting these if the client treats "missing" the same as "empty" saves further bytes:`);
    emptyFields.slice(0, 15).forEach((p) => lines.push(`  • ${p}`));
    if (emptyFields.length > 15) lines.push(`  …and ${emptyFields.length - 15} more`);
    lines.push("  → Recommendation: omit null/empty fields rather than sending them explicitly.");
    lines.push("");
  }

  if (duplicateGroups.length === 0 && constantKeys.length === 0 && longNames.length === 0 && emptyFields.length === 0) {
    lines.push("No obvious structural waste found — this payload is already fairly efficient.", "");
  }

  lines.push(
    "Other options worth considering: gzip/Brotli compression at the transport layer (usually a bigger win than any JSON-level change)."
  );

  return { success: true, output: lines.join("\n"), durationMs: performance.now() - start };
}
