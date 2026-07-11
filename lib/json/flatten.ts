import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

function flattenValue(value: unknown, prefix: string, out: Record<string, unknown>): void {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      out[prefix || "value"] = [];
      return;
    }
    value.forEach((item, i) => flattenValue(item, prefix ? `${prefix}[${i}]` : `[${i}]`, out));
    return;
  }
  if (value !== null && typeof value === "object") {
    const keys = Object.keys(value as Record<string, unknown>);
    if (keys.length === 0) {
      out[prefix || "value"] = {};
      return;
    }
    keys.forEach((k) => flattenValue((value as Record<string, unknown>)[k], prefix ? `${prefix}.${k}` : k, out));
    return;
  }
  out[prefix || "value"] = value;
}

/** Flattens nested JSON into a single-level object using dot/bracket-notation keys. */
export function flattenJson(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const out: Record<string, unknown> = {};
  flattenValue(result.parsed, "", out);
  return { success: true, output: JSON.stringify(out, null, 2), durationMs: performance.now() - start };
}

interface PathToken {
  key?: string;
  index?: number;
}

function parsePath(path: string): PathToken[] {
  const tokens: PathToken[] = [];
  path.replace(/([^.\[\]]+)|\[(\d+)\]/g, (_match, key: string | undefined, idx: string | undefined) => {
    tokens.push(idx !== undefined ? { index: parseInt(idx, 10) } : { key });
    return "";
  });
  return tokens;
}

type Indexable = Record<string | number, unknown>;

function setDeep(target: Record<string, unknown>, path: string, value: unknown): void {
  const tokens = parsePath(path);
  let node: Indexable = target;

  tokens.forEach((token, i) => {
    const isLast = i === tokens.length - 1;
    const nextToken = tokens[i + 1];

    if (token.key !== undefined) {
      if (isLast) {
        node[token.key] = value;
      } else {
        if (node[token.key] === undefined) node[token.key] = nextToken?.index !== undefined ? [] : {};
        node = node[token.key] as Indexable;
      }
    } else if (token.index !== undefined) {
      if (isLast) {
        node[token.index] = value;
      } else {
        if (node[token.index] === undefined) node[token.index] = nextToken?.index !== undefined ? [] : {};
        node = node[token.index] as Indexable;
      }
    }
  });
}

/** Rebuilds a nested JSON structure from a flat object with dot/bracket-notation keys. */
export function unflattenJson(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  if (result.parsed === null || typeof result.parsed !== "object" || Array.isArray(result.parsed)) {
    return {
      success: false,
      error: { message: "Input must be a flat JSON object.", position: { line: 1, column: 1, offset: 0 } },
      durationMs: performance.now() - start,
    };
  }

  const out: Record<string, unknown> = {};
  Object.entries(result.parsed as Record<string, unknown>).forEach(([key, value]) => setDeep(out, key, value));
  return { success: true, output: JSON.stringify(out, null, 2), durationMs: performance.now() - start };
}
