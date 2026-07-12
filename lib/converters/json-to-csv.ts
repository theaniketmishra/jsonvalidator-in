import { validateJson } from "../json/validate";
import type { JsonFormatResult } from "../json/types";

/** Flattens a nested value into a single-level record using dot/bracket notation keys. */
function flatten(value: unknown, prefix = ""): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    if (Array.isArray(value)) {
        if (value.length === 0) {
            result[prefix || "value"] = "[]";
            return result;
        }
        value.forEach((item, index) => {
            const key = prefix ? `${prefix}[${index}]` : `[${index}]`;
            if (item !== null && typeof item === "object") {
                Object.assign(result, flatten(item, key));
            } else {
                result[key] = item;
            }
        });
        return result;
    }

    if (value !== null && typeof value === "object") {
        const entries = Object.entries(value as Record<string, unknown>);
        if (entries.length === 0) {
            result[prefix || "value"] = "{}";
            return result;
        }
        for (const [key, child] of entries) {
            const nextKey = prefix ? `${prefix}.${key}` : key;
            if (child !== null && typeof child === "object") {
                Object.assign(result, flatten(child, nextKey));
            } else {
                result[nextKey] = child;
            }
        }
        return result;
    }

    result[prefix || "value"] = value;
    return result;
}

function toCsvCell(value: unknown): string {
    if (value === null || value === undefined) return "";
    const str = typeof value === "string" ? value : JSON.stringify(value);
    if (/[",\n\r]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

/**
 * Converts a JSON document (array of objects, single object, or array of
 * primitives) into CSV. Nested objects/arrays are flattened using dot and
 * bracket notation, mirroring the behavior of most JSON-to-CSV tools.
 */
export function jsonToCsv(input: string): JsonFormatResult {
    const start = performance.now();
    const validation = validateJson(input);

    if (!validation.valid) {
        return { success: false, error: validation.error, durationMs: performance.now() - start };
    }

    const parsed = validation.parsed;
    const records: Record<string, unknown>[] = Array.isArray(parsed)
        ? parsed.map((item) => flatten(item))
        : [flatten(parsed)];

    const headers: string[] = [];
    const seen = new Set<string>();
    for (const record of records) {
        for (const key of Object.keys(record)) {
            if (!seen.has(key)) {
                seen.add(key);
                headers.push(key);
            }
        }
    }

    const headerRow = headers.map(toCsvCell).join(",");
    const rows = records.map((record) => headers.map((h) => toCsvCell(record[h])).join(","));
    const output = [headerRow, ...rows].join("\r\n");

    return { success: true, output, durationMs: performance.now() - start };
}
