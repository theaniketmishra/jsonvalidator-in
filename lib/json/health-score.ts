import { validateJson } from "./validate";
import { scanForSecrets } from "./secret-scanner";
import { analyzeComplexity } from "./complexity";

export interface HealthDeduction {
  category: "syntax" | "structure" | "security" | "maintainability" | "performance";
  points: number;
  reason: string;
}

export interface HealthSuggestion {
  category: HealthDeduction["category"];
  suggestion: string;
}

export interface HealthScoreResult {
  success: boolean;
  error?: { message: string; position: { line: number; column: number } };
  overallScore?: number;
  rating?: "Excellent" | "Good" | "Fair" | "Needs work" | "Poor";
  categoryScores?: Record<HealthDeduction["category"], number>;
  deductions?: HealthDeduction[];
  suggestions?: HealthSuggestion[];
}

const CATEGORY_MAX = 20;

function ratingFor(score: number): HealthScoreResult["rating"] {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs work";
  return "Poor";
}

function typeOf(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

/** Structure checks: consistent array item shapes and consistent key-naming style. */
function checkStructure(parsed: unknown, deductions: HealthDeduction[], suggestions: HealthSuggestion[]): void {
  let inconsistentArrays = 0;
  const seenKeyStyles = new Set<string>();

  function keyStyle(key: string): string {
    if (/^[a-z][a-zA-Z0-9]*$/.test(key)) return "camelCase";
    if (/^[a-z][a-z0-9_]*$/.test(key) && key.includes("_")) return "snake_case";
    if (/^[A-Z][a-zA-Z0-9]*$/.test(key)) return "PascalCase";
    return "other";
  }

  function walk(value: unknown): void {
    if (Array.isArray(value)) {
      if (value.length > 1) {
        const types = new Set(value.map(typeOf));
        if (types.size > 1) inconsistentArrays++;
      }
      value.forEach(walk);
      return;
    }
    if (value !== null && typeof value === "object") {
      Object.keys(value as Record<string, unknown>).forEach((k) => {
        const style = keyStyle(k);
        if (style !== "other") seenKeyStyles.add(style);
      });
      Object.values(value as Record<string, unknown>).forEach(walk);
    }
  }
  walk(parsed);

  if (inconsistentArrays > 0) {
    deductions.push({
      category: "structure",
      points: Math.min(10, inconsistentArrays * 4),
      reason: `${inconsistentArrays} array${inconsistentArrays === 1 ? "" : "s"} mix different item types, making them harder to consume predictably.`,
    });
    suggestions.push({ category: "structure", suggestion: "Keep each array's items the same shape/type throughout." });
  }

  if (seenKeyStyles.size > 1) {
    deductions.push({
      category: "structure",
      points: 6,
      reason: `Inconsistent key naming styles found (${Array.from(seenKeyStyles).join(", ")}).`,
    });
    suggestions.push({ category: "structure", suggestion: "Pick one key-naming convention (camelCase or snake_case) and use it throughout." });
  }
}

/** Maintainability checks: excessively long property names, very wide objects. */
function checkMaintainability(parsed: unknown, deductions: HealthDeduction[], suggestions: HealthSuggestion[]): void {
  let longKeyNames = 0;
  let maxObjectKeys = 0;

  function walk(value: unknown): void {
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (value !== null && typeof value === "object") {
      const keys = Object.keys(value as Record<string, unknown>);
      maxObjectKeys = Math.max(maxObjectKeys, keys.length);
      keys.forEach((k) => {
        if (k.length > 40) longKeyNames++;
      });
      Object.values(value as Record<string, unknown>).forEach(walk);
    }
  }
  walk(parsed);

  if (longKeyNames > 0) {
    deductions.push({
      category: "maintainability",
      points: Math.min(8, longKeyNames * 2),
      reason: `${longKeyNames} property name${longKeyNames === 1 ? "" : "s"} longer than 40 characters.`,
    });
    suggestions.push({ category: "maintainability", suggestion: "Shorten overly long property names for readability." });
  }

  if (maxObjectKeys > 40) {
    deductions.push({
      category: "maintainability",
      points: 6,
      reason: `An object with ${maxObjectKeys} keys was found — very wide objects are hard to maintain.`,
    });
    suggestions.push({ category: "maintainability", suggestion: "Split very wide objects into smaller, named sub-objects." });
  }
}

/** Security checks: reuses the Secret Scanner's pattern detection. */
function checkSecurity(input: string, deductions: HealthDeduction[], suggestions: HealthSuggestion[]): void {
  const secretScan = scanForSecrets(input);
  if (!secretScan.success || !secretScan.output) return;

  const matchCount = (secretScan.output.match(/⚠/g) || []).length;
  if (matchCount === 0) return;

  deductions.push({
    category: "security",
    points: Math.min(20, matchCount * 7),
    reason: `${matchCount} potential secret/sensitive value${matchCount === 1 ? "" : "s"} found (API keys, tokens, emails, or similarly-named fields).`,
  });
  suggestions.push({ category: "security", suggestion: "Run this through the Sanitizer or Secret Scanner before sharing or committing this JSON." });
}

/** Performance checks: reuses the Complexity Analyzer's structural warnings. */
function checkPerformance(input: string, deductions: HealthDeduction[], suggestions: HealthSuggestion[]): void {
  const complexity = analyzeComplexity(input);
  if (!complexity.success || !complexity.output) return;

  if (complexity.output.includes("Deep nesting")) {
    deductions.push({ category: "performance", points: 8, reason: "Deeply nested structure (>8 levels) — slower to parse and harder to consume." });
    suggestions.push({ category: "performance", suggestion: "Flatten deeply nested structures where possible." });
  }
  if (complexity.output.includes("Large array")) {
    deductions.push({ category: "performance", points: 6, reason: "A very large array (1000+ items) was found." });
    suggestions.push({ category: "performance", suggestion: "Consider paginating large arrays instead of returning them all at once." });
  }
  if (complexity.output.includes("Large payload")) {
    deductions.push({ category: "performance", points: 6, reason: "Payload is over 1 MB." });
    suggestions.push({ category: "performance", suggestion: "Consider compression (gzip/Brotli) or trimming unused fields." });
  }
}

/**
 * Computes a 0-100 JSON Health Score across five 20-point categories:
 * syntax, structure, security, maintainability, and performance. Reuses
 * the Secret Scanner and Complexity Analyzer under the hood so the score
 * stays consistent with what those standalone tools report.
 */
export function calculateHealthScore(input: string): HealthScoreResult {
  const validation = validateJson(input);
  if (!validation.valid) {
    return {
      success: false,
      error: {
        message: validation.error!.message,
        position: { line: validation.error!.position.line, column: validation.error!.position.column },
      },
    };
  }

  const deductions: HealthDeduction[] = [];
  const suggestions: HealthSuggestion[] = [];

  const serialized = JSON.stringify(validation.parsed);
  if (serialized === "{}" || serialized === "[]") {
    deductions.push({ category: "syntax", points: 4, reason: "Document is empty — nothing to validate meaningfully." });
  }

  checkStructure(validation.parsed, deductions, suggestions);
  checkSecurity(input, deductions, suggestions);
  checkMaintainability(validation.parsed, deductions, suggestions);
  checkPerformance(input, deductions, suggestions);

  const categoryDeductionSums: Record<HealthDeduction["category"], number> = {
    syntax: 0,
    structure: 0,
    security: 0,
    maintainability: 0,
    performance: 0,
  };
  deductions.forEach((d) => {
    categoryDeductionSums[d.category] += d.points;
  });

  const categoryScores = Object.fromEntries(
    Object.entries(categoryDeductionSums).map(([category, deducted]) => [category, Math.max(0, CATEGORY_MAX - deducted)])
  ) as Record<HealthDeduction["category"], number>;

  const overallScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);

  return {
    success: true,
    overallScore,
    rating: ratingFor(overallScore),
    categoryScores,
    deductions,
    suggestions,
  };
}
