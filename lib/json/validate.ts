import type { JsonPosition, JsonValidationError, JsonValidationResult } from "./types";

/**
 * Converts a 0-indexed character offset into a 1-indexed line/column pair.
 */
export function offsetToPosition(source: string, offset: number): JsonPosition {
  const clamped = Math.max(0, Math.min(offset, source.length));
  const upToOffset = source.slice(0, clamped);
  const lines = upToOffset.split("\n");
  const line = lines.length;
  const column = (lines[lines.length - 1]?.length ?? 0) + 1;
  return { line, column, offset: clamped };
}

/**
 * Extracts the character offset a native JSON.parse error refers to, across
 * the differing message formats used by V8, JavaScriptCore, and SpiderMonkey.
 */
function extractOffset(message: string, source: string): number {
  const positionMatch = message.match(/position (\d+)/i);
  if (positionMatch?.[1]) return parseInt(positionMatch[1], 10);

  // Safari/JSC style: "Unexpected token '}', ... line 3 column 5"
  const lineColMatch = message.match(/line (\d+) column (\d+)/i);
  if (lineColMatch?.[1] && lineColMatch[2]) {
    const targetLine = parseInt(lineColMatch[1], 10);
    const targetColumn = parseInt(lineColMatch[2], 10);
    const lines = source.split("\n");
    let offset = 0;
    for (let i = 0; i < targetLine - 1 && i < lines.length; i++) {
      offset += (lines[i]?.length ?? 0) + 1;
    }
    return offset + (targetColumn - 1);
  }

  return 0;
}

function humanizeMessage(message: string): { message: string; hint?: string } {
  const lower = message.toLowerCase();

  if (lower.includes("unexpected end of json input")) {
    return {
      message: "Unexpected end of input — the JSON is incomplete.",
      hint: "Check for a missing closing } or ] at the end of the document.",
    };
  }
  if (lower.includes("unexpected token") && lower.includes("in json")) {
    const tokenMatch = message.match(/unexpected token (.+?) in json/i);
    const token = tokenMatch?.[1]?.trim();
    return {
      message: token ? `Unexpected character ${token} found.` : "Unexpected character found.",
      hint: "This is often caused by a trailing comma, a missing quote, or a stray character.",
    };
  }
  if (lower.includes("unexpected non-whitespace character")) {
    return {
      message: "Unexpected extra content after the JSON value.",
      hint: "There may be more than one JSON value, or an extra closing bracket.",
    };
  }
  if (lower.includes("double-quoted") || lower.includes("expected double-quoted property name")) {
    return {
      message: "Expected a double-quoted property name.",
      hint: "Object keys must be wrapped in double quotes, e.g. \"key\": value.",
    };
  }

  return { message };
}

/**
 * Validates a JSON string and, when invalid, resolves the exact line and
 * column of the syntax error along with a plain-language explanation.
 */
export function validateJson(input: string): JsonValidationResult {
  const start = performance.now();

  if (input.trim().length === 0) {
    return {
      valid: false,
      durationMs: performance.now() - start,
      error: {
        message: "The input is empty.",
        hint: "Paste or type JSON into the editor to validate it.",
        position: { line: 1, column: 1, offset: 0 },
      },
    };
  }

  try {
    const parsed = JSON.parse(input);
    return { valid: true, parsed, durationMs: performance.now() - start };
  } catch (err) {
    const rawMessage = err instanceof Error ? err.message : "Invalid JSON";
    const offset = extractOffset(rawMessage, input);
    const position = offsetToPosition(input, offset);
    const { message, hint } = humanizeMessage(rawMessage);

    const error: JsonValidationError = { message, hint, position };
    return { valid: false, error, durationMs: performance.now() - start };
  }
}
