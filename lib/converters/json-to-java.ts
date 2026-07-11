import { validateJson } from "../json/validate";
import type { JsonFormatResult } from "../json/types";

function javaFieldType(value: unknown): string {
  if (value === null) return "Object";
  if (Array.isArray(value)) return `List<${value.length ? javaFieldType(value[0]) : "Object"}>`;
  if (typeof value === "object") return "Map<String, Object>";
  if (typeof value === "number") return Number.isInteger(value) ? "int" : "double";
  if (typeof value === "boolean") return "boolean";
  return "String";
}

/** Generates a simple Java POJO class with getters/setters from a JSON sample. */
export function jsonToJava(input: string, className = "GeneratedClass"): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const root = Array.isArray(result.parsed) ? (result.parsed[0] ?? {}) : result.parsed;
  if (root === null || typeof root !== "object") {
    return {
      success: false,
      error: {
        message: "Top-level value must be an object (or array of objects) to generate a Java class.",
        position: { line: 1, column: 1, offset: 0 },
      },
      durationMs: performance.now() - start,
    };
  }

  const fields = Object.entries(root as Record<string, unknown>);
  const lines = [`public class ${className} {`];
  fields.forEach(([f, v]) => lines.push(`    private ${javaFieldType(v)} ${f};`));
  lines.push("");
  fields.forEach(([f, v]) => {
    const type = javaFieldType(v);
    const cap = f.charAt(0).toUpperCase() + f.slice(1);
    lines.push(`    public ${type} get${cap}() { return ${f}; }`);
    lines.push(`    public void set${cap}(${type} ${f}) { this.${f} = ${f}; }`);
  });
  lines.push("}");

  return { success: true, output: lines.join("\n"), durationMs: performance.now() - start };
}
