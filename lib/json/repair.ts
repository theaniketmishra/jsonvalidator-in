import { offsetToPosition, validateJson } from "./validate";
import type { JsonRepairResult, JsonRepairStep } from "./types";

interface Transform {
  id: string;
  label: string;
  description: string;
  apply: (input: string) => { output: string; count: number };
}

/** Strips // line comments and /* block comments *\/ that aren't valid JSON but are common in hand-edited files. */
function stripComments(input: string): { output: string; count: number } {
  let count = 0;
  // Block comments
  let output = input.replace(/\/\*[\s\S]*?\*\//g, () => {
    count++;
    return "";
  });
  // Line comments — avoid stripping "//" that appears inside a string by
  // only matching ones preceded by whitespace/start-of-line and not inside quotes.
  output = output.replace(/^([^"\n]*?)\/\/.*$/gm, (match, prefix: string) => {
    const quoteCount = (prefix.match(/"/g) || []).length;
    if (quoteCount % 2 !== 0) return match; // looks like "//" is inside a string
    count++;
    return prefix.trimEnd();
  });
  return { output, count };
}

/** Converts single-quoted strings to double-quoted strings. */
function fixSingleQuotes(input: string): { output: string; count: number } {
  let count = 0;
  const output = input.replace(/'((?:[^'\\]|\\.)*)'/g, (_match, inner: string) => {
    count++;
    const escaped = inner.replace(/\\'/g, "'").replace(/"/g, '\\"');
    return `"${escaped}"`;
  });
  return { output, count };
}

/** Wraps bare/unquoted object keys in double quotes. */
function fixUnquotedKeys(input: string): { output: string; count: number } {
  let count = 0;
  const output = input.replace(
    /([{,]\s*)([A-Za-z_$][A-Za-z0-9_$]*)(\s*:)/g,
    (_match, before: string, key: string, after: string) => {
      count++;
      return `${before}"${key}"${after}`;
    }
  );
  return { output, count };
}

/** Removes trailing commas immediately before a closing } or ]. */
function fixTrailingCommas(input: string): { output: string; count: number } {
  let count = 0;
  const output = input.replace(/,(\s*[}\]])/g, (_match, closer: string) => {
    count++;
    return closer;
  });
  return { output, count };
}

/** Collapses accidental double commas (",,") into one. */
function fixDoubleCommas(input: string): { output: string; count: number } {
  let count = 0;
  const output = input.replace(/,\s*,+/g, () => {
    count++;
    return ",";
  });
  return { output, count };
}

/**
 * Inserts a missing comma between two sibling values that are separated
 * only by whitespace/newlines — e.g. a closing quote followed by a new key,
 * or "}" directly followed by "{".
 */
function fixMissingCommas(input: string): { output: string; count: number } {
  let count = 0;
  let output = input;

  const patterns: Array<[RegExp, string]> = [
    // "}"  followed by "{"  ->  "},{"
    [/([}\]])(\s*)([{[])/g, "$1,$2$3"],
    // closing quote followed by newline + opening quote of a new key: "a"\n"b" -> "a",\n"b"
    [/("(?:[^"\\]|\\.)*")(\s*\n\s*)(")/g, "$1,$2$3"],
    // a number/boolean/null value followed by newline + a quoted key
    [/(-?\d+(?:\.\d+)?|true|false|null)(\s*\n\s*)(")/g, "$1,$2$3"],
    // closing quote/brace/bracket followed directly by a quoted key on the same construct
    [/([}\]"](?:\d)?)(\s*\n\s*)("[A-Za-z0-9_$]+"\s*:)/g, "$1,$2$3"],
  ];

  for (const [pattern, replacement] of patterns) {
    output = output.replace(pattern, (...args) => {
      count++;
      // rebuild using the replacement template manually since we need the count side-effect
      const matchArgs = args.slice(0, -2) as string[];
      return replacement.replace(/\$(\d)/g, (_m, idx: string) => matchArgs[parseInt(idx, 10)] ?? "");
    });
  }

  return { output, count };
}

/** Balances unmatched braces/brackets by appending the missing closers. */
function fixBracketBalance(input: string): { output: string; count: number } {
  let depthCurly = 0;
  let depthSquare = 0;
  let inString = false;
  let escapeNext = false;

  for (const char of input) {
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === "\\" && inString) {
      escapeNext = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (char === "{") depthCurly++;
    else if (char === "}") depthCurly--;
    else if (char === "[") depthSquare++;
    else if (char === "]") depthSquare--;
  }

  let output = input;
  let count = 0;
  if (depthCurly > 0) {
    output += "}".repeat(depthCurly);
    count += depthCurly;
  }
  if (depthSquare > 0) {
    output += "]".repeat(depthSquare);
    count += depthSquare;
  }
  return { output, count };
}

const TRANSFORMS: Transform[] = [
  {
    id: "strip-comments",
    label: "Removed comments",
    description: "JSON doesn't support // or /* */ comments, so they were stripped.",
    apply: stripComments,
  },
  {
    id: "single-quotes",
    label: "Converted single quotes to double quotes",
    description: 'JSON strings must use double quotes. Converted \'text\' to "text".',
    apply: fixSingleQuotes,
  },
  {
    id: "unquoted-keys",
    label: "Quoted unquoted object keys",
    description: 'Object keys must be double-quoted. Converted key: value to "key": value.',
    apply: fixUnquotedKeys,
  },
  {
    id: "double-commas",
    label: "Collapsed duplicate commas",
    description: "Found two or more commas in a row and collapsed them into one.",
    apply: fixDoubleCommas,
  },
  {
    id: "missing-commas",
    label: "Inserted missing commas",
    description: "Added commas between values that were missing a separator.",
    apply: fixMissingCommas,
  },
  {
    id: "trailing-commas",
    label: "Removed trailing commas",
    description: "JSON doesn't allow a comma right before a closing } or ]. Removed the extra comma(s).",
    apply: fixTrailingCommas,
  },
  {
    id: "bracket-balance",
    label: "Balanced braces and brackets",
    description: "The document was missing closing } or ] characters. Appended the ones needed to balance it.",
    apply: fixBracketBalance,
  },
];

/**
 * Attempts to repair common hand-editing mistakes in a broken JSON document.
 * Runs a fixed pipeline of safe, explainable transforms and stops as soon as
 * the result parses successfully, returning a log of every step that changed
 * the document.
 */
export function repairJson(input: string): JsonRepairResult {
  const start = performance.now();
  const steps: JsonRepairStep[] = [];
  let current = input;

  // If it's already valid, there's nothing to repair.
  const initialCheck = validateJson(current);
  if (initialCheck.valid) {
    return { success: true, output: current, steps: [], durationMs: performance.now() - start };
  }

  for (const transform of TRANSFORMS) {
    const { output, count } = transform.apply(current);
    if (count > 0 && output !== current) {
      current = output;
      steps.push({
        id: transform.id,
        label: transform.label,
        description: transform.description,
        count,
      });

      const check = validateJson(current);
      if (check.valid) {
        return { success: true, output: current, steps, durationMs: performance.now() - start };
      }
    }
  }

  const finalCheck = validateJson(current);
  if (finalCheck.valid) {
    return { success: true, output: current, steps, durationMs: performance.now() - start };
  }

  return {
    success: false,
    output: current,
    steps,
    remainingError: finalCheck.error,
    durationMs: performance.now() - start,
  };
}

export { offsetToPosition };
