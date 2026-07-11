import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

type ChangeKind = "added" | "removed" | "renamed" | "type-changed" | "value-changed";
type Impact = "breaking" | "non-breaking" | "info";

interface SemanticChange {
  kind: ChangeKind;
  path: string;
  impact: Impact;
  detail: string;
}

function typeOf(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Heuristic rename detection: a key that disappeared and a key that
 * appeared in the same object, whose values are the exact same type (and,
 * for primitives, the exact same value) are treated as a likely rename
 * rather than an unrelated add+remove.
 */
function detectRenames(
  removedKeys: string[],
  addedKeys: string[],
  before: Record<string, unknown>,
  after: Record<string, unknown>
): Map<string, string> {
  const renames = new Map<string, string>();
  const usedAdded = new Set<string>();

  removedKeys.forEach((removedKey) => {
    const removedValue = before[removedKey];
    const removedType = typeOf(removedValue);

    const match = addedKeys.find((addedKey) => {
      if (usedAdded.has(addedKey)) return false;
      const addedValue = after[addedKey];
      if (typeOf(addedValue) !== removedType) return false;
      if (removedType !== "object" && removedType !== "array") {
        return JSON.stringify(addedValue) === JSON.stringify(removedValue);
      }
      if (removedType === "array") return Array.isArray(addedValue) && addedValue.length === (removedValue as unknown[]).length;
      if (removedType === "object") {
        return JSON.stringify(Object.keys(addedValue as object).sort()) === JSON.stringify(Object.keys(removedValue as object).sort());
      }
      return false;
    });

    if (match) {
      renames.set(removedKey, match);
      usedAdded.add(match);
    }
  });

  return renames;
}

function compareObjects(before: Record<string, unknown>, after: Record<string, unknown>, path: string, changes: SemanticChange[]): void {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  const removedKeys = beforeKeys.filter((k) => !afterKeys.includes(k));
  const addedKeys = afterKeys.filter((k) => !beforeKeys.includes(k));
  const sharedKeys = beforeKeys.filter((k) => afterKeys.includes(k));

  const renames = detectRenames(removedKeys, addedKeys, before, after);

  renames.forEach((newKey, oldKey) => {
    const p = path ? `${path}.${oldKey}` : oldKey;
    changes.push({
      kind: "renamed",
      path: p,
      impact: "breaking",
      detail: `Field renamed from "${oldKey}" to "${newKey}" — consumers reading the old name will break.`,
    });
  });

  removedKeys
    .filter((k) => !renames.has(k))
    .forEach((k) => {
      const p = path ? `${path}.${k}` : k;
      changes.push({ kind: "removed", path: p, impact: "breaking", detail: `Field "${k}" was removed.` });
    });

  addedKeys
    .filter((k) => !Array.from(renames.values()).includes(k))
    .forEach((k) => {
      const p = path ? `${path}.${k}` : k;
      changes.push({ kind: "added", path: p, impact: "non-breaking", detail: `New field "${k}" was added.` });
    });

  sharedKeys.forEach((k) => {
    compareValues(before[k], after[k], path ? `${path}.${k}` : k, changes);
  });
}

function compareValues(before: unknown, after: unknown, path: string, changes: SemanticChange[]): void {
  const beforeType = typeOf(before);
  const afterType = typeOf(after);

  if (beforeType !== afterType) {
    changes.push({ kind: "type-changed", path, impact: "breaking", detail: `Type changed from ${beforeType} to ${afterType}.` });
    return;
  }

  if (isPlainObject(before) && isPlainObject(after)) {
    compareObjects(before, after, path, changes);
    return;
  }

  if (Array.isArray(before) && Array.isArray(after)) {
    if (before.length > 0 && after.length > 0) {
      compareValues(before[0], after[0], `${path}[]`, changes);
    }
    return;
  }

  if (JSON.stringify(before) !== JSON.stringify(after)) {
    changes.push({ kind: "value-changed", path, impact: "info", detail: `Default/example value changed from ${JSON.stringify(before)} to ${JSON.stringify(after)}.` });
  }
}

function riskLevel(changes: SemanticChange[]): "None" | "Low" | "Medium" | "High" {
  const breaking = changes.filter((c) => c.impact === "breaking").length;
  if (breaking === 0) return "None";
  if (breaking <= 2) return "Low";
  if (breaking <= 5) return "Medium";
  return "High";
}

function migrationSuggestion(change: SemanticChange): string {
  switch (change.kind) {
    case "removed":
      return `Add a fallback for "${change.path}" on the consumer side, or keep the field temporarily deprecated instead of removing it outright.`;
    case "renamed":
      return `Update consumers to read the new field name at "${change.path}", or emit both the old and new field names during a transition period.`;
    case "type-changed":
      return `Coerce or validate "${change.path}" on the consumer side, or version the API so old and new types don't collide.`;
    case "added":
      return `No action needed — new fields are safe to ignore for existing consumers.`;
    case "value-changed":
      return `Confirm this value change is intentional; update tests/fixtures that assert on "${change.path}".`;
  }
}

/**
 * Compares two JSON samples semantically: added/removed/renamed fields,
 * type changes, and value changes, each classified as breaking,
 * non-breaking, or informational, with an overall compatibility risk level.
 */
export function semanticDiff(beforeInput: string, afterInput: string): JsonFormatResult {
  const start = performance.now();
  const before = validateJson(beforeInput);
  if (!before.valid) return { success: false, error: before.error, side: "left", durationMs: performance.now() - start };
  const after = validateJson(afterInput);
  if (!after.valid) return { success: false, error: after.error, side: "right", durationMs: performance.now() - start };

  const changes: SemanticChange[] = [];
  compareValues(before.parsed, after.parsed, "", changes);

  const risk = riskLevel(changes);
  const breaking = changes.filter((c) => c.impact === "breaking");
  const nonBreaking = changes.filter((c) => c.impact === "non-breaking");
  const info = changes.filter((c) => c.impact === "info");

  if (changes.length === 0) {
    return {
      success: true,
      output: "Compatibility Report\n\nRisk Level: None\n\nNo semantic differences — the two versions are structurally identical.",
      durationMs: performance.now() - start,
    };
  }

  const lines = [
    "Compatibility Report",
    "",
    `Risk Level: ${risk}`,
    `${breaking.length} breaking change${breaking.length === 1 ? "" : "s"}, ${nonBreaking.length} non-breaking, ${info.length} informational.`,
    "",
  ];

  if (breaking.length > 0) {
    lines.push("BREAKING CHANGES:");
    breaking.forEach((c) => lines.push(`  ⚠ [${c.kind}] ${c.path || "(root)"} — ${c.detail}`));
    lines.push("");
  }
  if (nonBreaking.length > 0) {
    lines.push("Non-breaking changes:");
    nonBreaking.forEach((c) => lines.push(`  + [${c.kind}] ${c.path || "(root)"} — ${c.detail}`));
    lines.push("");
  }
  if (info.length > 0) {
    lines.push("Informational:");
    info.forEach((c) => lines.push(`  · [${c.kind}] ${c.path || "(root)"} — ${c.detail}`));
    lines.push("");
  }

  if (breaking.length > 0) {
    lines.push("Migration suggestions:");
    breaking.forEach((c) => lines.push(`  - ${migrationSuggestion(c)}`));
  }

  return { success: true, output: lines.join("\n"), durationMs: performance.now() - start };
}
