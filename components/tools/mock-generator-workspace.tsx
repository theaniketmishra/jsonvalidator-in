"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar, OutputActionButtons } from "@/components/tools/editor-toolbar";
import { OutputToolbar } from "@/components/tools/output-toolbar";
import { createJsonStore } from "@/hooks/create-json-store";
import { useFileActions } from "@/hooks/use-file-actions";
import { validateJson } from "@/lib/json/validate";
import { generateApiMock } from "@/lib/json/mock-generator";

const useStore = createJsonStore();

export function MockGeneratorWorkspace({ sample }: { sample: string }) {
  const { input, setInput, loadSample, clear, undo, redo, canUndo, canRedo } = useStore();
  const [count, setCount] = React.useState(5);

  const validation = React.useMemo(() => validateJson(input), [input]);
  const result = React.useMemo(() => {
    if (!input.trim()) return { success: true as const, output: "", durationMs: 0 };
    return generateApiMock(input, count);
  }, [input, count]);

  const { inputRef, triggerUpload, handleFileInput, copy, download } = useFileActions({
    onLoad: (contents) => setInput(contents),
    downloadFilename: "mock-data.json",
  });

  return (
    <div className="mx-auto max-w-6xl space-y-4">
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
            ariaLabel="Sample JSON"
            errorMarker={
              !validation.valid && validation.error && input.trim()
                ? { line: validation.error.position.line, column: validation.error.position.column, message: validation.error.message }
                : null
            }
          />
          <div className="flex items-center gap-2 border-t border-border bg-muted/20 px-3.5 py-2.5">
            <label htmlFor="mock-count" className="text-xs text-muted-foreground">
              Records to generate:
            </label>
            <input
              id="mock-count"
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value, 10) || 1)))}
              className="h-8 w-20 rounded-md border border-border bg-background px-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <OutputToolbar
            label="Mock data"
            actions={<OutputActionButtons onCopy={() => copy(result.output ?? "")} onDownload={() => download(result.output ?? "")} />}
          />
          <JsonEditor value={result.output ?? ""} readOnly ariaLabel="Mock data" height={420} />
        </div>
      </div>

      {!result.success && "error" in result && result.error && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Line {result.error.position.line}, column {result.error.position.column}: {result.error.message}
          </span>
        </div>
      )}
    </div>
  );
}
