import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

interface ComplexityStats {
  depth: number;
  totalKeys: number;
  totalArrays: number;
  maxArrayLength: number;
  maxArrayPath: string;
  widestObjectKeys: number;
  widestObjectPath: string;
  sizeBytes: number;
}

function walk(value: unknown, path: string, depth: number, stats: ComplexityStats): number {
  if (Array.isArray(value)) {
    stats.totalArrays++;
    if (value.length > stats.maxArrayLength) {
      stats.maxArrayLength = value.length;
      stats.maxArrayPath = path || "(root)";
    }
    let maxChildDepth = depth;
    value.forEach((item, i) => {
      maxChildDepth = Math.max(maxChildDepth, walk(item, `${path}[${i}]`, depth + 1, stats));
    });
    return maxChildDepth;
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    stats.totalKeys += entries.length;
    if (entries.length > stats.widestObjectKeys) {
      stats.widestObjectKeys = entries.length;
      stats.widestObjectPath = path || "(root)";
    }
    let maxChildDepth = depth;
    entries.forEach(([k, v]) => {
      maxChildDepth = Math.max(maxChildDepth, walk(v, path ? `${path}.${k}` : k, depth + 1, stats));
    });
    return maxChildDepth;
  }
  return depth;
}

/** Analyzes a JSON document's structural complexity and flags potential issues. */
export function analyzeComplexity(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const stats: ComplexityStats = {
    depth: 0,
    totalKeys: 0,
    totalArrays: 0,
    maxArrayLength: 0,
    maxArrayPath: "",
    widestObjectKeys: 0,
    widestObjectPath: "",
    sizeBytes: new TextEncoder().encode(input).length,
  };
  stats.depth = walk(result.parsed, "", 0, stats);

  const warnings: string[] = [];
  if (stats.depth > 8) warnings.push(`Deep nesting: ${stats.depth} levels deep — deeply nested JSON is slower to parse and harder to consume.`);
  if (stats.maxArrayLength > 1000) warnings.push(`Large array: ${stats.maxArrayLength} items at "${stats.maxArrayPath}" — consider pagination.`);
  if (stats.widestObjectKeys > 50) warnings.push(`Wide object: ${stats.widestObjectKeys} keys at "${stats.widestObjectPath}" — consider splitting into sub-resources.`);
  if (stats.sizeBytes > 1024 * 1024) warnings.push(`Large payload: ${(stats.sizeBytes / (1024 * 1024)).toFixed(2)} MB — consider compression or streaming.`);
  if (warnings.length === 0) warnings.push("No structural concerns found — this document looks reasonably sized and shaped.");

  const lines = [
    "Structure:",
    `  Max depth: ${stats.depth}`,
    `  Total object keys: ${stats.totalKeys}`,
    `  Total arrays: ${stats.totalArrays}`,
    `  Largest array: ${stats.maxArrayLength} items${stats.maxArrayPath ? ` (at ${stats.maxArrayPath})` : ""}`,
    `  Widest object: ${stats.widestObjectKeys} keys${stats.widestObjectPath ? ` (at ${stats.widestObjectPath})` : ""}`,
    `  Payload size: ${(stats.sizeBytes / 1024).toFixed(2)} KB`,
    "",
    "Advice:",
    ...warnings.map((w) => `  • ${w}`),
  ];

  return { success: true, output: lines.join("\n"), durationMs: performance.now() - start };
}
