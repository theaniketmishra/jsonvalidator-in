import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

type Severity = "critical" | "high" | "medium" | "low";

interface PatternRule {
  label: string;
  pattern: RegExp;
  severity: Severity;
}

const VALUE_PATTERNS: PatternRule[] = [
  { label: "AWS Access Key ID", pattern: /\bAKIA[0-9A-Z]{16}\b/, severity: "critical" },
  { label: "AWS Secret Access Key (heuristic)", pattern: /\b(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z0-9/+]{40}\b/, severity: "high" },
  { label: "Azure Storage Account Key", pattern: /\b[A-Za-z0-9+/]{86}==\b/, severity: "critical" },
  { label: "Azure/GCP service account credential field", pattern: /"type"\s*:\s*"service_account"/, severity: "critical" },
  { label: "Stripe live secret key", pattern: /\bsk_live_[0-9a-zA-Z]{20,}\b/, severity: "critical" },
  { label: "Stripe live publishable key", pattern: /\bpk_live_[0-9a-zA-Z]{20,}\b/, severity: "medium" },
  { label: "GitHub personal access token", pattern: /\bgh[pousr]_[0-9a-zA-Z]{30,}\b/, severity: "critical" },
  { label: "Slack token", pattern: /\bxox[baprs]-[0-9a-zA-Z-]{10,}\b/, severity: "high" },
  { label: "JSON Web Token (JWT)", pattern: /\beyJ[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\b/, severity: "high" },
  { label: "PEM private key block", pattern: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, severity: "critical" },
  { label: "Google API key", pattern: /\bAIza[0-9A-Za-z_-]{35}\b/, severity: "high" },
  { label: "Aadhaar-like identifier (12 digits)", pattern: /\b\d{4}\s?\d{4}\s?\d{4}\b/, severity: "high" },
  { label: "PAN-like identifier (India tax ID)", pattern: /\b[A-Z]{5}\d{4}[A-Z]\b/, severity: "high" },
  { label: "Email address", pattern: /\b[\w.+-]+@[\w-]+\.[A-Za-z]{2,}\b/, severity: "low" },
  { label: "Possible credit card number", pattern: /\b(?:\d[ -]?){13,16}\b/, severity: "high" },
  { label: "Generic bearer token", pattern: /\bBearer\s+[A-Za-z0-9._-]{20,}\b/, severity: "medium" },
];

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
];

export interface SecretFinding {
  path: string;
  label: string;
  preview: string;
  severity: Severity;
}

const SEVERITY_WEIGHT: Record<Severity, number> = { critical: 40, high: 20, medium: 10, low: 4 };
const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low"];

function maskValue(value: string): string {
  if (value.length <= 8) return "*".repeat(value.length);
  return `${value.slice(0, 4)}${"*".repeat(Math.min(value.length - 8, 20))}${value.slice(-4)}`;
}

function isSensitiveKeyName(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[^a-z]/g, "");
  return SENSITIVE_KEY_NAMES.some((name) => normalized.includes(name.replace(/[^a-z]/g, "")));
}

function scanValue(value: unknown, key: string | null, path: string, findings: SecretFinding[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => scanValue(item, null, `${path}[${i}]`, findings));
    return;
  }
  if (value !== null && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      const p = path ? `${path}.${k}` : k;
      scanValue(v, k, p, findings);
    });
    return;
  }
  if (typeof value !== "string") return;

  if (key && isSensitiveKeyName(key) && value.trim().length > 0) {
    findings.push({ path, label: `Sensitive field name ("${key}")`, preview: maskValue(value), severity: "high" });
    return; // don't double-report the same value against value-patterns below
  }

  for (const rule of VALUE_PATTERNS) {
    if (rule.pattern.test(value)) {
      findings.push({ path: path || "(root)", label: rule.label, preview: maskValue(value), severity: rule.severity });
      break;
    }
  }
}

/** Computes a 0-100 risk score from findings — more/severer findings push the score higher. */
function computeRiskScore(findings: SecretFinding[]): number {
  const raw = findings.reduce((sum, f) => sum + SEVERITY_WEIGHT[f.severity], 0);
  return Math.min(100, raw);
}

function riskLabel(score: number): string {
  if (score === 0) return "None";
  if (score < 20) return "Low";
  if (score < 50) return "Medium";
  if (score < 80) return "High";
  return "Critical";
}

/** Scans a JSON document for likely secrets, credentials, and sensitive data. */
export function scanForSecrets(input: string): JsonFormatResult {
  const start = performance.now();
  const result = validateJson(input);
  if (!result.valid) return { success: false, error: result.error, durationMs: performance.now() - start };

  const findings: SecretFinding[] = [];
  scanValue(result.parsed, null, "", findings);

  if (findings.length === 0) {
    return {
      success: true,
      output: "Risk Score: 0/100 (None)\n\nNo obvious secrets or sensitive data found.",
      durationMs: performance.now() - start,
    };
  }

  const riskScore = computeRiskScore(findings);
  const severityCounts = SEVERITY_ORDER.map((sev) => ({ sev, count: findings.filter((f) => f.severity === sev).length })).filter(
    (s) => s.count > 0
  );

  const lines = [
    `Risk Score: ${riskScore}/100 (${riskLabel(riskScore)})`,
    "",
    `Severity breakdown: ${severityCounts.map((s) => `${s.sev} × ${s.count}`).join(", ")}`,
    "",
    `Found ${findings.length} potential issue${findings.length === 1 ? "" : "s"}:`,
    "",
    ...findings.map((f) => `⚠ [${f.severity.toUpperCase()}] ${f.path || "(root)"} — ${f.label}: ${f.preview}`),
    "",
    "Recommendations:",
    "  • Move any real secrets out of JSON files and into environment variables or a secrets manager.",
    "  • Rotate any credential that may have already been committed or shared.",
    "  • Redact sensitive fields with the JSON Sanitizer before sharing this document.",
    "",
    "This is a heuristic pattern scan, not a guarantee — always review manually before sharing JSON containing real credentials.",
  ];
  return { success: true, output: lines.join("\n"), durationMs: performance.now() - start };
}
