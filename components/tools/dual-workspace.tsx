"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar } from "@/components/tools/editor-toolbar";
import { OutputToolbar } from "@/components/tools/output-toolbar";
import { OutputActionButtons } from "@/components/tools/editor-toolbar";
import { useFileActions } from "@/hooks/use-file-actions";
import { validateJson } from "@/lib/json/validate";
import type { JsonFormatResult } from "@/lib/json/types";
import type { JsonStore } from "@/hooks/create-json-store";

interface DualWorkspaceProps {
  useStoreA: JsonStore;
  useStoreB: JsonStore;
  labelA: string;
  labelB: string;
  sampleA: string;
  sampleB: string;
  outputLabel: string;
  downloadFilename: string;
  run: (a: string, b: string) => JsonFormatResult;
}

function InputColumn({
  label,
  useStore,
  sample,
}: {
  label: string;
  useStore: JsonStore;
  sample: string;
}) {
  const { input, setInput, loadSample, clear, undo, redo, canUndo, canRedo } = useStore();
  const validation = React.useMemo(() => validateJson(input), [input]);
  const { inputRef, triggerUpload, handleFileInput } = useFileActions({ onLoad: (c) => setInput(c) });

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="border-b border-border bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground">
        {label}
      </div>
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
        ariaLabel={label}
        height={340}
        errorMarker={
          !validation.valid && validation.error && input.trim()
            ? { line: validation.error.position.line, column: validation.error.position.column, message: validation.error.message }
            : null
        }
      />
    </div>
  );
}

export function DualWorkspace({
  useStoreA,
  useStoreB,
  labelA,
  labelB,
  sampleA,
  sampleB,
  outputLabel,
  downloadFilename,
  run,
}: DualWorkspaceProps) {
  const a = useStoreA((s) => s.input);
  const b = useStoreB((s) => s.input);

  const result = React.useMemo<JsonFormatResult>(() => {
    if (!a.trim() || !b.trim()) return { success: true, output: "", durationMs: 0 };
    return run(a, b);
  }, [a, b, run]);

  const { copy, download } = useFileActions({ onLoad: () => {}, downloadFilename });

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <InputColumn label={labelA} useStore={useStoreA} sample={sampleA} />
        <InputColumn label={labelB} useStore={useStoreB} sample={sampleB} />
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <OutputToolbar
          label={outputLabel}
          actions={<OutputActionButtons onCopy={() => copy(result.output ?? "")} onDownload={() => download(result.output ?? "")} />}
        />
        <JsonEditor value={result.output ?? ""} readOnly ariaLabel={outputLabel} language="plaintext" height={220} />
      </div>

      {!result.success && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {result.side === "left" ? `${labelA}: ` : result.side === "right" ? `${labelB}: ` : ""}
            Line {result.error?.position.line}, column {result.error?.position.column}: {result.error?.message}
          </span>
        </div>
      )}
    </div>
  );
}
