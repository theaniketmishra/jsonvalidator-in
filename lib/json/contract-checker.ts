import { validateJson } from "./validate";
import type { JsonFormatResult } from "./types";

function typeOf(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function compareShape(expected: unknown, actual: unknown, path: string, lines: string[]): void {
  const expectedType = typeOf(expected);
  const actualType = typeOf(actual);

  if (expectedType !== actualType) {
    lines.push(`~ ${path || "(root)"}: expected type "${expectedType}", got "${actualType}"`);
    return;
  }

  if (expectedType === "object") {
    const expectedObj = expected as Record<string, unknown>;
    const actualObj = actual as Record<string, unknown>;
    Object.keys(expectedObj).forEach((k) => {
      const p = path ? `${path}.${k}` : k;
      if (!Object.prototype.hasOwnProperty.call(actualObj, k)) {
        lines.push(`- ${p}: present in contract, missing from response`);
      } else {
        compareShape(expectedObj[k], actualObj[k], p, lines);
      }
    });
    Object.keys(actualObj).forEach((k) => {
      if (!Object.prototype.hasOwnProperty.call(expectedObj, k)) {
        const p = path ? `${path}.${k}` : k;
        lines.push(`+ ${p}: present in response, not in contract`);
      }
    });
    return;
  }

  if (expectedType === "array") {
    const expectedArr = expected as unknown[];
    const actualArr = actual as unknown[];
    if (expectedArr.length > 0 && actualArr.length > 0) {
      compareShape(expectedArr[0], actualArr[0], `${path}[]`, lines);
    }
  }
}

/**
 * Compares a "contract" JSON sample (the expected shape) against an actual
 * response sample, reporting structural/type differences only — literal
 * values are ignored, this checks shape compatibility, not equality.
 */
export function checkApiContract(contractInput: string, responseInput: string): JsonFormatResult {
  const start = performance.now();
  const contract = validateJson(contractInput);
  if (!contract.valid) return { success: false, error: contract.error, side: "left", durationMs: performance.now() - start };
  const response = validateJson(responseInput);
  if (!response.valid) return { success: false, error: response.error, side: "right", durationMs: performance.now() - start };

  const lines: string[] = [];
  compareShape(contract.parsed, response.parsed, "", lines);

  const output = lines.length === 0 ? "The response matches the contract's shape — no structural differences found." : lines.join("\n");
  return { success: true, output, durationMs: performance.now() - start };
}
