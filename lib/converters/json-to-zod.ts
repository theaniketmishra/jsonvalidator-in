import { validateJson } from "../json/validate";
import type { JsonFormatResult } from "../json/types";

function inferZod(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  const nextPad = "  ".repeat(indent + 1);

  if (value === null) return "z.null()";
  if (Array.isArray(value)) {
    if (value.length === 0) return "z.array(z.unknown())";
    return `z.array(${inferZod(value[0], indent)})`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "z.object({})";
    const lines = entries.map(([k, v]) => `${nextPad}${JSON.stringify(k)}: ${inferZod(v, indent + 1)}`);
    return `z.object({\n${lines.join(",\n")}\n${pad}})`;
  }
  if (typeof value === "number") return Number.isInteger(value) ? "z.number().int()" : "z.number()";
  if (typeof value === "boolean") return "z.boolean()";
  return "z.string()";
}

/** Generates a Zod validation schema (TypeScript) from a JSON sample. */
export function jsonToZod(input: string, schemaName = "Schema"): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const body = inferZod(result.parsed, 0);
  const output = `import { z } from "zod";\n\nexport const ${schemaName} = ${body};\n\nexport type ${schemaName}Type = z.infer<typeof ${schemaName}>;`;

  return { success: true, output, durationMs: performance.now() - start };
}
