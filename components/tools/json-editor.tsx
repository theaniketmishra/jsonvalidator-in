"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full animate-pulse items-center justify-center bg-muted/30 text-xs text-muted-foreground">
      Loading editor…
    </div>
  ),
});

export interface JsonEditorErrorMarker {
  line: number;
  column: number;
  message: string;
}

interface JsonEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  height?: number | string;
  className?: string;
  errorMarker?: JsonEditorErrorMarker | null;
  ariaLabel: string;
  /** Monaco language id for the output, e.g. "json" (default), "xml", "plaintext". */
  language?: string;
}

export function JsonEditor({
  value,
  onChange,
  readOnly = false,
  height = 420,
  className,
  errorMarker,
  ariaLabel,
  language = "json",
}: JsonEditorProps) {
  const { resolvedTheme } = useTheme();
  const editorRef = React.useRef<any>(null);
  const monacoRef = React.useRef<any>(null);

  const applyMarkers = React.useCallback(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;
    const model = editor.getModel();
    if (!model) return;

    if (errorMarker) {
      monaco.editor.setModelMarkers(model, "json-validator", [
        {
          startLineNumber: errorMarker.line,
          startColumn: errorMarker.column,
          endLineNumber: errorMarker.line,
          endColumn: errorMarker.column + 1,
          message: errorMarker.message,
          severity: monaco.MarkerSeverity.Error,
        },
      ]);
    } else {
      monaco.editor.setModelMarkers(model, "json-validator", []);
    }
  }, [errorMarker]);

  React.useEffect(() => {
    applyMarkers();
  }, [applyMarkers]);

  return (
    <div
      className={cn("overflow-hidden rounded-lg border border-border bg-[#0a0b0d]", className)}
      role="group"
      aria-label={ariaLabel}
    >
      <MonacoEditor
        height={height}
        defaultLanguage={language}
        language={language}
        value={value}
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
        onChange={(v) => onChange?.(v ?? "")}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          monacoRef.current = monaco;
          applyMarkers();

          // Monaco's hidden input textarea inherits the browser's native
          // spellcheck/autocorrect, which draws a stray red squiggle under
          // the cursor that has nothing to do with JSON validity. Disable it.
          const textarea = editor.getDomNode()?.querySelector("textarea");
          if (textarea) {
            textarea.setAttribute("spellcheck", "false");
            textarea.setAttribute("autocomplete", "off");
            textarea.setAttribute("autocorrect", "off");
            textarea.setAttribute("autocapitalize", "off");
          }
        }}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13.5,
          fontFamily: "var(--font-mono)",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: "gutter",
          smoothScrolling: true,
          cursorBlinking: "smooth",
          accessibilitySupport: "auto",
        }}
      />
    </div>
  );
}
