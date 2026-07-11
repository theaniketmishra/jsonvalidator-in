"use client";

import * as React from "react";
import { Wrench, CheckCircle2 } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar, OutputActionButtons } from "@/components/tools/editor-toolbar";
import { OutputToolbar } from "@/components/tools/output-toolbar";
import { RepairLog } from "@/components/tools/repair-log";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createJsonStore } from "@/hooks/create-json-store";
import { useFileActions } from "@/hooks/use-file-actions";
import { repairJson } from "@/lib/json/repair";
import { validateJson } from "@/lib/json/validate";
import type { JsonRepairResult } from "@/lib/json/types";

const useRepairStore = createJsonStore();

export function RepairWorkspace({ sample }: { sample: string }) {
  const { input, setInput, loadSample, clear, undo, redo, canUndo, canRedo } = useRepairStore();
  const [result, setResult] = React.useState<JsonRepairResult | null>(null);

  const preValidation = React.useMemo(() => validateJson(input), [input]);

  const { inputRef, triggerUpload, handleFileInput, copy, download } = useFileActions({
    onLoad: (contents) => {
      setInput(contents);
      setResult(null);
    },
    downloadFilename: "repaired.json",
  });

  const runRepair = () => {
    if (!input.trim()) return;
    setResult(repairJson(input));
  };

  React.useEffect(() => {
    setResult(null);
  }, [input]);

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border">
          <EditorToolbar
            onPaste={setInput}
            onUpload={triggerUpload}
            onSample={() => loadSample(sample)}
            onClear={() => {
              clear();
              setResult(null);
            }}
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
            ariaLabel="Broken JSON input editor"
            errorMarker={
              !preValidation.valid && preValidation.error && input.trim()
                ? {
                    line: preValidation.error.position.line,
                    column: preValidation.error.position.column,
                    message: preValidation.error.message,
                  }
                : null
            }
          />
          <div className="flex items-center justify-between border-t border-border bg-muted/20 px-3.5 py-2.5">
            <span className="text-xs text-muted-foreground">
              {preValidation.valid && input.trim() ? "This JSON is already valid." : "Paste broken JSON to repair."}
            </span>
            <Button size="sm" onClick={runRepair} disabled={!input.trim()}>
              <Wrench className="h-3.5 w-3.5" /> Repair JSON
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <OutputToolbar
            label="Repaired output"
            actions={
              <OutputActionButtons
                onCopy={() => copy(result?.output ?? "")}
                onDownload={() => download(result?.output ?? "")}
              />
            }
          />
          <JsonEditor value={result?.output ?? ""} readOnly ariaLabel="Repaired JSON output" height={280} />
          <div className="border-t border-border">
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Repair log</span>
              {result && (
                <Badge variant={result.success ? "success" : "warning"} className="text-xs">
                  {result.success ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" /> Fixed
                    </>
                  ) : (
                    "Partially fixed"
                  )}
                </Badge>
              )}
            </div>
            <RepairLog steps={result?.steps ?? []} remainingError={result?.remainingError} />
          </div>
        </div>
      </div>
    </div>
  );
}
