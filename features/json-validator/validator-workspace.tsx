"use client";

import * as React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar, OutputActionButtons } from "@/components/tools/editor-toolbar";
import { StatsBar } from "@/components/tools/stats-bar";
import { Badge } from "@/components/ui/badge";
import { createJsonStore } from "@/hooks/create-json-store";
import { useFileActions } from "@/hooks/use-file-actions";
import { validateJson } from "@/lib/json/validate";
import { formatJson } from "@/lib/json/format";
import { computeJsonStats } from "@/lib/json/stats";

const useValidatorStore = createJsonStore();

export function ValidatorWorkspace({ sample }: { sample: string }) {
  const { input, setInput, loadSample, clear, undo, redo, canUndo, canRedo } = useValidatorStore();

  const result = React.useMemo(() => validateJson(input), [input]);
  const stats = React.useMemo(
    () => computeJsonStats(input, result.valid ? result.parsed : undefined),
    [input, result]
  );

  const { inputRef, triggerUpload, handleFileInput, copy, download } = useFileActions({
    onLoad: (contents) => setInput(contents),
    downloadFilename: "validated.json",
  });

  const handleCopyFormatted = () => {
    if (!result.valid) return;
    const formatted = formatJson(input, "2");
    copy(formatted.output ?? input);
  };

  const handleDownload = () => download(input, "validated.json");

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">JSON input</span>
        {input.trim() && (
          <Badge variant={result.valid ? "success" : "destructive"} className="text-xs">
            {result.valid ? (
              <>
                <CheckCircle2 className="h-3 w-3" /> Valid JSON
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3" /> Invalid — line {result.error?.position.line}, col{" "}
                {result.error?.position.column}
              </>
            )}
          </Badge>
        )}
      </div>

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
          outputActions={
            <OutputActionButtons onCopy={handleCopyFormatted} onDownload={handleDownload} />
          }
        />
        <JsonEditor
          value={input}
          onChange={setInput}
          ariaLabel="JSON input editor"
          errorMarker={
            !result.valid && result.error
              ? {
                  line: result.error.position.line,
                  column: result.error.position.column,
                  message: result.error.message,
                }
              : null
          }
        />
        <StatsBar stats={stats} />
      </div>

      {!result.valid && result.error && input.trim() && (
        <div className="animate-fade-up rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm font-semibold text-destructive">
            Line {result.error.position.line}, column {result.error.position.column}: {result.error.message}
          </p>
          {result.error.hint && <p className="mt-1 text-sm text-muted-foreground">{result.error.hint}</p>}
        </div>
      )}

      {result.valid && input.trim() && (
        <div className="animate-fade-up flex items-center gap-2 rounded-xl border border-success/30 bg-success/5 p-4 text-sm text-success">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          This document is valid JSON
          {stats.keys !== undefined && (
            <span className="text-muted-foreground">
              — {stats.keys} key{stats.keys === 1 ? "" : "s"}, depth {stats.depth}
            </span>
          )}
          .
        </div>
      )}
    </div>
  );
}
