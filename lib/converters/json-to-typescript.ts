import { validateJson } from "../json/validate";
import type { JsonFormatResult } from "../json/types";

function typeName(key: string): string {
  const clean = key
    .replace(/[^A-Za-z0-9]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return clean || "Item";
}

function inferType(value: unknown, key: string, interfaces: string[]): string {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    return `${inferType(value[0], key, interfaces)}[]`;
  }
  if (value !== null && typeof value === "object") {
    const name = typeName(key);
    const lines = [`interface ${name} {`];
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      lines.push(`  ${k}: ${inferType(v, k, interfaces)};`);
    });
    lines.push("}");
    interfaces.push(lines.join("\n"));
    return name;
  }
  return typeof value;
}

/** Generates TypeScript interfaces from a JSON sample document. */
export function jsonToTypeScript(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const interfaces: string[] = [];
  const rootType = inferType(result.parsed, "Root", interfaces);
  let output = interfaces.reverse().join("\n\n");
  if (Array.isArray(result.parsed)) output += `\n\ntype RootArray = ${rootType};`;
  if (!output) output = `type Root = ${rootType};`;

  return { success: true, output, durationMs: performance.now() - start };
}
