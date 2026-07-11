"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar } from "@/components/tools/editor-toolbar";
import { OutputToolbar } from "@/components/tools/output-toolbar";
import { OutputActionButtons } from "@/components/tools/editor-toolbar";
import { createJsonStore } from "@/hooks/create-json-store";
import { useFileActions } from "@/hooks/use-file-actions";
import { validateJson } from "@/lib/json/validate";
import { searchJson } from "@/lib/json/search";

const useSearchStore = createJsonStore();

export function SearchWorkspace({ sample }: { sample: string }) {
  const { input, setInput, loadSample, clear, undo, redo, canUndo, canRedo } = useSearchStore();
  const [query, setQuery] = React.useState("");

  const validation = React.useMemo(() => validateJson(input), [input]);
  const result = React.useMemo(() => {
    if (!input.trim()) return { success: true as const, output: "", durationMs: 0 };
    return searchJson(input, query);
  }, [input, query]);

  const { inputRef, triggerUpload, handleFileInput, copy, download } = useFileActions({
    onLoad: (contents) => setInput(contents),
    downloadFilename: "search-results.txt",
  });

  return (
    <div className="mx-auto max-w-4xl space-y-4">
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
              ? { line: validation.error.position.line, column: validation.error.position.column, message: validation.error.message }
              : null
          }
        />
        <div className="border-t border-border bg-muted/20 p-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a key or value…"
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <OutputToolbar
          label="Matches"
          actions={<OutputActionButtons onCopy={() => copy(result.output ?? "")} onDownload={() => download(result.output ?? "")} />}
        />
        <JsonEditor value={result.output ?? ""} readOnly ariaLabel="Search results" language="plaintext" height={260} />
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
