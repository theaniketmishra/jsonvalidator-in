import { validateJson } from "../json/validate";
import type { JsonFormatResult } from "../json/types";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** XML element names must start with a letter/underscore and contain no whitespace or colons. */
function sanitizeTagName(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9_.-]/g, "_");
  return /^[A-Za-z_]/.test(cleaned) ? cleaned : `_${cleaned || "item"}`;
}

function nodeToXml(tag: string, value: unknown, indent: string): string {
  const safeTag = sanitizeTagName(tag);

  if (value === null || value === undefined) {
    return `${indent}<${safeTag} />`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return `${indent}<${safeTag} />`;
    return value.map((item) => nodeToXml(safeTag, item, indent)).join("\n");
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${indent}<${safeTag} />`;
    const inner = entries.map(([key, child]) => nodeToXml(key, child, indent + "  ")).join("\n");
    return `${indent}<${safeTag}>\n${inner}\n${indent}</${safeTag}>`;
  }

  return `${indent}<${safeTag}>${escapeXml(String(value))}</${safeTag}>`;
}

/**
 * Converts a JSON document into indented XML. Object keys become element
 * names; arrays repeat the parent element once per item; primitives become
 * text content. Keys that aren't valid XML element names are sanitized.
 */
export function jsonToXml(input: string, rootName = "root"): JsonFormatResult {
  const start = performance.now();
  const validation = validateJson(input);

  if (!validation.valid) {
    return { success: false, error: validation.error, durationMs: performance.now() - start };
  }

  const parsed = validation.parsed;
  let body: string;

  if (Array.isArray(parsed)) {
    body = parsed.length ? parsed.map((item) => nodeToXml("item", item, "  ")).join("\n") : "";
  } else if (parsed !== null && typeof parsed === "object") {
    const entries = Object.entries(parsed as Record<string, unknown>);
    body = entries.map(([key, value]) => nodeToXml(key, value, "  ")).join("\n");
  } else {
    body = nodeToXml("value", parsed, "  ");
  }

  const output = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${body}\n</${rootName}>`;
  return { success: true, output, durationMs: performance.now() - start };
}
