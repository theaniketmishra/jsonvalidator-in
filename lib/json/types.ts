export interface JsonPosition {
  /** 1-indexed line number */
  line: number;
  /** 1-indexed column number */
  column: number;
  /** 0-indexed character offset into the source string */
  offset: number;
}

export interface JsonValidationError {
  message: string;
  position: JsonPosition;
  /** A short human-readable hint about how to fix the error, when known. */
  hint?: string;
}

export interface JsonValidationResult {
  valid: boolean;
  error?: JsonValidationError;
  parsed?: unknown;
  /** Wall-clock time the validation took, in milliseconds. */
  durationMs: number;
}

export type IndentOption = "2" | "4" | "tab" | "minified";

export interface JsonFormatResult {
  success: boolean;
  output?: string;
  error?: JsonValidationError;
  /** For dual-input tools (diff, merge, schema validate), which side the error came from. */
  side?: "left" | "right" | "data" | "schema";
  durationMs: number;
}

export interface JsonRepairStep {
  id: string;
  label: string;
  description: string;
  /** Number of occurrences fixed by this step. */
  count: number;
}

export interface JsonRepairResult {
  success: boolean;
  output?: string;
  steps: JsonRepairStep[];
  /** Present when repair was attempted but the result still doesn't parse. */
  remainingError?: JsonValidationError;
  durationMs: number;
}

export interface JsonStats {
  characters: number;
  lines: number;
  words: number;
  bytes: number;
  /** Only computed when the input parses successfully. */
  keys?: number;
  depth?: number;
}
