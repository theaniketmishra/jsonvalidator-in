import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

const SENSITIVE_KEY_NAMES = [
  "password",
  "passwd",
  "secret",
  "apikey",
  "api_key",
  "token",
  "accesstoken",
  "access_token",
  "refreshtoken",
  "refresh_token",
  "privatekey",
  "private_key",
  "clientsecret",
  "client_secret",
  "authorization",
  "ssn",
  "socialsecuritynumber",
  "creditcard",
  "credit_card",
  "cvv",
  "email",
];

function isSensitiveKeyName(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[^a-z]/g, "");
  return SENSITIVE_KEY_NAMES.some((name) => normalized.includes(name.replace(/[^a-z]/g, "")));
}

function sanitizeValue(value: unknown, key: string | null): unknown {
  if (Array.isArray(value)) return value.map((item) => sanitizeValue(item, null));
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      out[k] = isSensitiveKeyName(k) && v !== null && v !== undefined ? "***REDACTED***" : sanitizeValue(v, k);
    });
    return out;
  }
  return value;
}

/** Redacts values of commonly-sensitive fields (passwords, tokens, emails, etc.) by key name. */
export function sanitizeJson(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const sanitized = sanitizeValue(result.parsed, null);
  return { success: true, output: JSON.stringify(sanitized, null, 2), durationMs: performance.now() - start };
}
