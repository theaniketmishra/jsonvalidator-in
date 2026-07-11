"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar, OutputActionButtons } from "@/components/tools/editor-toolbar";
import { OutputToolbar } from "@/components/tools/output-toolbar";
import { StatsBar } from "@/components/tools/stats-bar";
import { LoadFromUrlBar } from "@/components/tools/load-from-url-bar";
import { createJsonStore } from "@/hooks/create-json-store";
import { useFileActions } from "@/hooks/use-file-actions";
import { useLoadFromUrl } from "@/hooks/use-load-from-url";
import { formatJson, sortJsonKeys } from "@/lib/json/format";
import { validateJson } from "@/lib/json/validate";
import { computeJsonStats } from "@/lib/json/stats";
import type { IndentOption } from "@/lib/json/types";
import { cn } from "@/lib/utils/cn";

const useFormatterStore = createJsonStore();

const indentOptions: { value: IndentOption; label: string }[] = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "tab", label: "Tabs" },
  { value: "minified", label: "Minify" },
];

export function FormatterWorkspace({ sample }: { sample: string }) {
  const { input, setInput, loadSample, clear, undo, redo, canUndo, canRedo } = useFormatterStore();
  const [indent, setIndent] = React.useState<IndentOption>("2");
  const [sortKeys, setSortKeys] = React.useState(false);

  const validation = React.useMemo(() => validateJson(input), [input]);

  const formatted = React.useMemo(() => {
    if (input.trim().length === 0) return { success: true as const, output: "", durationMs: 0 };
    return sortKeys ? sortJsonKeys(input, indent) : formatJson(input, indent);
  }, [input, indent, sortKeys]);

  const outputStats = React.useMemo(
    () => computeJsonStats(formatted.output ?? "", validation.valid ? validation.parsed : undefined),
    [formatted.output, validation]
  );

  const { inputRef, triggerUpload, handleFileInput, copy, download } = useFileActions({
    onLoad: (contents) => setInput(contents),
    downloadFilename: indent === "minified" ? "minified.json" : "formatted.json",
  });

  const { url, setUrl, load: loadFromUrl, isLoading: isLoadingUrl } = useLoadFromUrl((contents) =>
    setInput(contents)
  );

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
          {indentOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setIndent(opt.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                indent === opt.value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Sort keys alphabetically
        </label>
      </div>

      <LoadFromUrlBar url={url} onUrlChange={setUrl} onLoad={loadFromUrl} isLoading={isLoadingUrl} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border">
          <EditorToolbar
            onPaste={setInput}
            onUpload={triggerUpload}
            onSample={() => loadSample(sample)}
            onClear={clear}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo()}
            canRedo={canRedo()}
            fileInputRef={inputRef}
            onFileInputChange={handleFileInput}
          />
          <JsonEditor
            value={input}
            onChange={setInput}
            ariaLabel="JSON input editor"
            errorMarker={
              !validation.valid && validation.error && input.trim()
                ? {
                    line: validation.error.position.line,
                    column: validation.error.position.column,
                    message: validation.error.message,
                  }
                : null
            }
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <OutputToolbar
            label="Output"
            actions={
              <OutputActionButtons
                onCopy={() => copy(formatted.output ?? "")}
                onDownload={() => download(formatted.output ?? "")}
              />
            }
          />
          <JsonEditor value={formatted.output ?? ""} readOnly ariaLabel="Formatted JSON output" height={420} />
          <StatsBar stats={outputStats} />
        </div>
      </div>

      {!formatted.success && input.trim() && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Can't format invalid JSON — line {formatted.error?.position.line}, column {formatted.error?.position.column}:{" "}
            {formatted.error?.message}
          </span>
        </div>
      )}
    </div>
  );
}
