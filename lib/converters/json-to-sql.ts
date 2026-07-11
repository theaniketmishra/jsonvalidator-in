import { validateJson } from "../json/validate";
import type { JsonFormatResult } from "../json/types";

function sqlType(value: unknown): string {
  if (value === null) return "TEXT";
  if (typeof value === "boolean") return "BOOLEAN";
  if (typeof value === "number") return Number.isInteger(value) ? "INTEGER" : "REAL";
  return "TEXT";
}

function sqlLiteral(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "number") return String(value);
  return `'${String(value).replace(/'/g, "''")}'`;
}

/** Generates a CREATE TABLE statement plus one INSERT per record. */
export function jsonToSql(input: string, tableName = "data"): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const records = Array.isArray(result.parsed) ? result.parsed : [result.parsed];
  const first = records[0];
  if (!first || typeof first !== "object") {
    return {
      success: false,
      error: { message: "Input must be an object or an array of objects.", position: { line: 1, column: 1, offset: 0 } },
      durationMs: performance.now() - start,
    };
  }

  const columns = Object.keys(first as Record<string, unknown>);
  const createLines = columns.map((c) => `  ${c} ${sqlType((first as Record<string, unknown>)[c])}`);
  let sql = `CREATE TABLE ${tableName} (\n${createLines.join(",\n")}\n);\n\n`;

  records.forEach((record) => {
    const values = columns.map((c) => sqlLiteral((record as Record<string, unknown>)[c]));
    sql += `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values.join(", ")});\n`;
  });

  return { success: true, output: sql.trim(), durationMs: performance.now() - start };
}
