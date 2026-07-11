import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

const MOCK_WORDS = ["alpha", "bravo", "cascade", "delta", "ember", "falcon", "granite", "harbor", "indigo", "juniper", "kepler", "lumen", "meridian", "nova", "orbit", "pixel", "quartz", "raven", "solace", "tundra"];

function mockWord(): string {
  return MOCK_WORDS[Math.floor(Math.random() * MOCK_WORDS.length)] ?? "sample";
}
function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function mockName(): string {
  return `${capitalize(mockWord())} ${capitalize(mockWord())}`;
}
function mockEmailFrom(name: string): string {
  return `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
}

let idCounter = 0;
function nextId(): number {
  idCounter += 1;
  return idCounter;
}

function mockForKeyAndSample(key: string, sample: unknown): unknown {
  const k = key.toLowerCase();
  if (k === "id" || /_?id$/.test(k)) return typeof sample === "string" ? `id_${Math.random().toString(36).slice(2, 10)}` : nextId();
  if (k.includes("email")) return mockEmailFrom(mockName());
  if (k.includes("name")) return mockName();
  if (k.includes("date") || k.includes("_at")) return new Date(Date.now() - Math.floor(Math.random() * 1e10)).toISOString();
  if (k.includes("url") || k.includes("link")) return `https://example.com/${mockWord()}`;
  if (k.includes("phone")) return `+1-555-${1000 + Math.floor(Math.random() * 9000)}`;
  if (k.includes("city")) return capitalize(mockWord());
  if (k.includes("price") || k.includes("amount") || k.includes("cost")) return Math.round(Math.random() * 10000) / 100;
  return undefined;
}

function generateMockValue(sample: unknown, key: string): unknown {
  const byKey = key ? mockForKeyAndSample(key, sample) : undefined;
  if (byKey !== undefined) return byKey;

  if (sample === null) return null;
  if (Array.isArray(sample)) {
    const count = Math.max(1, Math.min(sample.length || 2, 5));
    const template = sample.length ? sample[0] : "item";
    return Array.from({ length: count }, () => generateMockValue(template, key));
  }
  if (sample !== null && typeof sample === "object") {
    const out: Record<string, unknown> = {};
    Object.entries(sample as Record<string, unknown>).forEach(([k, v]) => {
      out[k] = generateMockValue(v, k);
    });
    return out;
  }
  if (typeof sample === "number") return Number.isInteger(sample) ? Math.floor(Math.random() * 1000) : Math.round(Math.random() * 10000) / 100;
  if (typeof sample === "boolean") return Math.random() > 0.5;
  return mockWord();
}

/** Generates N realistic fake records matching a sample JSON document's shape. */
export function generateApiMock(input: string, count: number): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  idCounter = 0;
  const n = Math.max(1, Math.min(Math.floor(count) || 5, 50));
  const template = Array.isArray(result.parsed) ? (result.parsed[0] ?? {}) : result.parsed;
  const records = Array.from({ length: n }, () => generateMockValue(template, ""));

  return { success: true, output: JSON.stringify(records, null, 2), durationMs: performance.now() - start };
}
