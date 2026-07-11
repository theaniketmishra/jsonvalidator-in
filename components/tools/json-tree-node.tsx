"use client";

import * as React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

type JsonValueType = "object" | "array" | "string" | "number" | "boolean" | "null" | "undefined";

function typeOf(value: unknown): JsonValueType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value as JsonValueType;
}

function valueColorClass(type: JsonValueType): string {
  switch (type) {
    case "string":
      return "text-success";
    case "number":
      return "text-primary";
    case "boolean":
      return "text-warning";
    case "null":
    case "undefined":
      return "text-muted-foreground";
    default:
      return "text-foreground";
  }
}

function formatPrimitive(value: unknown, type: JsonValueType): string {
  if (type === "string") return `"${value}"`;
  if (type === "null") return "null";
  if (type === "undefined") return "undefined";
  return String(value);
}

interface JsonTreeNodeProps {
  label?: string;
  value: unknown;
  depth?: number;
  defaultExpanded?: boolean;
  isLast?: boolean;
}

export function JsonTreeNode({ label, value, depth = 0, defaultExpanded = true }: JsonTreeNodeProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const type = typeOf(value);
  const isContainer = type === "object" || type === "array";
  const indent = { paddingLeft: depth * 16 };

  if (!isContainer) {
    return (
      <div className="flex gap-1.5 py-0.5 pl-5 font-mono text-[13px] leading-relaxed" style={indent}>
        {label !== undefined && <span className="shrink-0 text-foreground/70">&quot;{label}&quot;:</span>}
        <span className={valueColorClass(type)}>{formatPrimitive(value, type)}</span>
      </div>
    );
  }

  const entries: [string, unknown][] =
    type === "array"
      ? (value as unknown[]).map((v, i) => [String(i), v])
      : Object.entries(value as Record<string, unknown>);
  const [openBracket, closeBracket] = type === "array" ? ["[", "]"] : ["{", "}"];
  const count = entries.length;

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center gap-1 rounded py-0.5 pl-1 text-left font-mono text-[13px] hover:bg-muted/40"
        style={indent}
        aria-expanded={expanded}
      >
        {count > 0 ? (
          expanded ? (
            <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
          )
        ) : (
          <span className="w-3" />
        )}
        {label !== undefined && <span className="text-foreground/70">&quot;{label}&quot;:</span>}
        <span className="text-muted-foreground">
          {openBracket}
          {!expanded && count > 0 && (
            <span className="text-muted-foreground/70"> {count} {count === 1 ? "item" : "items"} </span>
          )}
          {!expanded && closeBracket}
        </span>
      </button>
      {expanded && count > 0 && (
        <div>
          {entries.map(([key, child]) => (
            <JsonTreeNode
              key={key}
              label={type === "array" ? undefined : key}
              value={child}
              depth={depth + 1}
              defaultExpanded={defaultExpanded}
            />
          ))}
          <div className="font-mono text-[13px] text-muted-foreground" style={indent}>
            {closeBracket}
          </div>
        </div>
      )}
    </div>
  );
}
