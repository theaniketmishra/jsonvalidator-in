import type { JsonStats } from "./types";

function countKeysAndDepth(value: unknown, depth = 0): { keys: number; maxDepth: number } {
  if (Array.isArray(value)) {
    let keys = 0;
    let maxDepth = depth;
    for (const item of value) {
      const child = countKeysAndDepth(item, depth + 1);
      keys += child.keys;
      maxDepth = Math.max(maxDepth, child.maxDepth);
    }
    return { keys, maxDepth };
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    let keys = entries.length;
    let maxDepth = depth;
    for (const [, child] of entries) {
      const result = countKeysAndDepth(child, depth + 1);
      keys += result.keys;
      maxDepth = Math.max(maxDepth, result.maxDepth);
    }
    return { keys, maxDepth };
  }
  return { keys: 0, maxDepth: depth };
}

export function computeJsonStats(input: string, parsed?: unknown): JsonStats {
  const characters = input.length;
  const lines = input.length === 0 ? 0 : input.split("\n").length;
  const words = input.trim().length === 0 ? 0 : input.trim().split(/\s+/).length;
  const bytes = new TextEncoder().encode(input).length;

  if (parsed === undefined) {
    return { characters, lines, words, bytes };
  }

  const { keys, maxDepth } = countKeysAndDepth(parsed);
  return { characters, lines, words, bytes, keys, depth: maxDepth };
}
