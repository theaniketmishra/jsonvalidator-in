import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

/* ------------------------------------------------------------------ *
 * Schema generation
 * ------------------------------------------------------------------ */

interface JsonSchemaLike {
  type: string;
  properties?: Record<string, JsonSchemaLike>;
  required?: string[];
  items?: JsonSchemaLike;
}

function inferSchema(value: unknown): JsonSchemaLike {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    const schema: JsonSchemaLike = { type: "array" };
    if (value.length > 0) schema.items = inferSchema(value[0]);
    return schema;
  }
  if (typeof value === "object") {
    const properties: Record<string, JsonSchemaLike> = {};
    const required: string[] = [];
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      properties[k] = inferSchema(v);
      required.push(k);
    });
    return { type: "object", properties, required };
  }
  if (typeof value === "number") return { type: Number.isInteger(value) ? "integer" : "number" };
  if (typeof value === "boolean") return { type: "boolean" };
  return { type: "string" };
}

/** Infers a draft-07-style JSON Schema from a sample JSON document. */
export function generateJsonSchema(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const schema = { $schema: "http://json-schema.org/draft-07/schema#", ...inferSchema(result.parsed) };
  return { success: true, output: JSON.stringify(schema, null, 2), durationMs: performance.now() - start };
}

/* ------------------------------------------------------------------ *
 * Schema validation — a small, self-contained validator supporting the
 * common keywords (type, properties, required, items, enum, min/max,
 * minLength/maxLength, pattern). Deliberately not a full JSON Schema
 * implementation, but covers the everyday cases without a dependency.
 * ------------------------------------------------------------------ */

interface SchemaNode {
  type?: string | string[];
  properties?: Record<string, SchemaNode>;
  required?: string[];
  items?: SchemaNode;
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

function validateAgainstSchema(data: unknown, schema: SchemaNode, path: string, errors: string[]): void {
  if (!schema || typeof schema !== "object") return;

  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actual =
      data === null ? "null" : Array.isArray(data) ? "array" : typeof data === "number" ? (Number.isInteger(data) ? "integer" : "number") : typeof data;
    const matches = types.some((t) => t === actual || (t === "number" && actual === "integer"));
    if (!matches) {
      errors.push(`${path}: expected type ${types.join(" or ")}, got ${actual}`);
      return;
    }
  }

  if (schema.enum && Array.isArray(schema.enum)) {
    const inEnum = schema.enum.some((v) => JSON.stringify(v) === JSON.stringify(data));
    if (!inEnum) errors.push(`${path}: value must be one of ${JSON.stringify(schema.enum)}`);
  }

  if (typeof data === "string") {
    if (schema.minLength !== undefined && data.length < schema.minLength) errors.push(`${path}: shorter than minLength ${schema.minLength}`);
    if (schema.maxLength !== undefined && data.length > schema.maxLength) errors.push(`${path}: longer than maxLength ${schema.maxLength}`);
    if (schema.pattern) {
      try {
        if (!new RegExp(schema.pattern).test(data)) errors.push(`${path}: does not match pattern "${schema.pattern}"`);
      } catch {
        /* invalid pattern in the schema itself; skip */
      }
    }
  }

  if (typeof data === "number") {
    if (schema.minimum !== undefined && data < schema.minimum) errors.push(`${path}: below minimum ${schema.minimum}`);
    if (schema.maximum !== undefined && data > schema.maximum) errors.push(`${path}: above maximum ${schema.maximum}`);
  }

  if (data !== null && typeof data === "object" && !Array.isArray(data) && schema.properties) {
    const obj = data as Record<string, unknown>;
    (schema.required || []).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) errors.push(`${path}: missing required property "${key}"`);
    });
    Object.entries(schema.properties).forEach(([key, childSchema]) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        validateAgainstSchema(obj[key], childSchema, path === "(root)" ? key : `${path}.${key}`, errors);
      }
    });
  }

  if (Array.isArray(data) && schema.items) {
    data.forEach((item, i) => validateAgainstSchema(item, schema.items as SchemaNode, `${path}[${i}]`, errors));
  }
}

export interface SchemaValidationResult {
  success: boolean;
  valid?: boolean;
  errors?: string[];
  error?: JsonFormatResult["error"];
  side?: "data" | "schema";
}

/** Validates a JSON document against a JSON Schema using a small built-in checker. */
export function validateJsonAgainstSchema(dataInput: string, schemaInput: string): SchemaValidationResult {
  const dataResult = validateJson(dataInput);
  if (!dataResult.valid) return { success: false, error: dataResult.error, side: "data" };
  const schemaResult = validateJson(schemaInput);
  if (!schemaResult.valid) return { success: false, error: schemaResult.error, side: "schema" };

  const errors: string[] = [];
  validateAgainstSchema(dataResult.parsed, schemaResult.parsed as SchemaNode, "(root)", errors);
  return { success: true, valid: errors.length === 0, errors };
}
