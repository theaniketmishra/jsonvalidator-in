"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar } from "@/components/tools/editor-toolbar";
import { OutputToolbar } from "@/components/tools/output-toolbar";
import { JsonTreeView } from "@/components/tools/json-tree-view";
import { StatsBar } from "@/components/tools/stats-bar";
import { createJsonStore } from "@/hooks/create-json-store";
import { useFileActions } from "@/hooks/use-file-actions";
import { useLoadFromUrl } from "@/hooks/use-load-from-url";
import { LoadFromUrlBar } from "@/components/tools/load-from-url-bar";
import { validateJson } from "@/lib/json/validate";
import { computeJsonStats } from "@/lib/json/stats";

const useViewerStore = createJsonStore();

export function ViewerWorkspace({ sample }: { sample: string }) {
  const { input, setInput, loadSample, clear, undo, redo, canUndo, canRedo } = useViewerStore();

  const validation = React.useMemo(() => validateJson(input), [input]);
  const stats = React.useMemo(
    () => computeJsonStats(input, validation.valid ? validation.parsed : undefined),
    [input, validation]
  );

  const { inputRef, triggerUpload, handleFileInput } = useFileActions({
    onLoad: (contents) => setInput(contents),
  });
  const { url, setUrl, load: loadFromUrl, isLoading: isLoadingUrl } = useLoadFromUrl((contents) =>
    setInput(contents)
  );

  return (
    <div className="mx-auto max-w-6xl space-y-4">
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
          <StatsBar stats={stats} />
        </div>

        <div className="flex h-[420px] flex-col overflow-hidden rounded-xl border border-border lg:h-auto">
          <OutputToolbar label="Tree view" actions={null} />
          <div className="flex-1 overflow-hidden bg-[#0a0b0d]">
            <JsonTreeView data={validation.valid ? validation.parsed : undefined} />
          </div>
        </div>
      </div>

      {!validation.valid && validation.error && input.trim() && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Line {validation.error.position.line}, column {validation.error.position.column}:{" "}
            {validation.error.message}
          </span>
        </div>
      )}
    </div>
  );
}
