import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

function remapKeys(value: unknown, mapping: Record<string, string | undefined>): unknown {
  if (Array.isArray(value)) return value.map((item) => remapKeys(item, mapping));
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      const newKey = Object.prototype.hasOwnProperty.call(mapping, k) ? mapping[k] ?? k : k;
      out[newKey] = remapKeys(v, mapping);
    });
    return out;
  }
  return value;
}

/**
 * Renames keys throughout a JSON document according to a { "oldKey": "newKey" }
 * mapping document. The same rename is applied wherever that key appears,
 * at any depth.
 */
export function mapFields(dataInput: string, mappingInput: string): JsonFormatResult {
  const start = performance.now();
  const data = validateJson(dataInput);
  if (!data.valid) return { success: false, error: data.error, side: "left", durationMs: performance.now() - start };

  const mapping = validateJson(mappingInput);
  if (!mapping.valid) return { success: false, error: mapping.error, side: "right", durationMs: performance.now() - start };

  if (mapping.parsed === null || typeof mapping.parsed !== "object" || Array.isArray(mapping.parsed)) {
    return {
      success: false,
      error: { message: 'Mapping must be a flat object like { "oldKey": "newKey" }.', position: { line: 1, column: 1, offset: 0 } },
      side: "right",
      durationMs: performance.now() - start,
    };
  }

  const remapped = remapKeys(data.parsed, mapping.parsed as Record<string, string>);
  return { success: true, output: JSON.stringify(remapped, null, 2), durationMs: performance.now() - start };
}
