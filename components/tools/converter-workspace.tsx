"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar, OutputActionButtons } from "@/components/tools/editor-toolbar";
import { OutputToolbar } from "@/components/tools/output-toolbar";
import { LoadFromUrlBar } from "@/components/tools/load-from-url-bar";
import { useFileActions } from "@/hooks/use-file-actions";
import { useLoadFromUrl } from "@/hooks/use-load-from-url";
import { validateJson } from "@/lib/json/validate";
import type { JsonFormatResult } from "@/lib/json/types";
import type { JsonStore } from "@/hooks/create-json-store";

interface ConverterWorkspaceProps {
  useStore: JsonStore;
  sample: string;
  convert: (input: string) => JsonFormatResult;
  outputLanguage: string;
  outputLabel: string;
  downloadFilename: string;
  /** Language for the input editor. Defaults to "json"; set to "plaintext" for tools like Escape whose input isn't JSON. */
  inputLanguage?: string;
  /** When false, skips JSON validation/error-marking on the input (for non-JSON input tools). */
  validateInput?: boolean;
  inputLabel?: string;
  errorPrefix?: string;
  hideLoadFromUrl?: boolean;
}

/**
 * Shared two-panel workspace for every "JSON to X" converter: JSON goes in
 * on the left, the converted output renders read-only on the right. Each
 * converter tool only needs to supply its own `convert` function.
 */
export function ConverterWorkspace({
  useStore,
  sample,
  convert,
  outputLanguage,
  outputLabel,
  downloadFilename,
  inputLanguage = "json",
  validateInput = true,
  inputLabel = "JSON input editor",
  errorPrefix = "Can't convert invalid JSON",
  hideLoadFromUrl = false,
}: ConverterWorkspaceProps) {
  const { input, setInput, loadSample, clear, undo, redo, canUndo, canRedo } = useStore();

  const validation = React.useMemo(() => (validateInput ? validateJson(input) : { valid: true as const, parsed: undefined, durationMs: 0 }), [input, validateInput]);
  const result = React.useMemo<JsonFormatResult>(() => {
    if (!input.trim()) return { success: true, output: "", durationMs: 0 };
    return convert(input);
  }, [input, convert]);

  const { inputRef, triggerUpload, handleFileInput, copy, download } = useFileActions({
    onLoad: (contents) => setInput(contents),
    downloadFilename,
  });

  const { url, setUrl, load: loadFromUrl, isLoading: isLoadingUrl } = useLoadFromUrl((contents) =>
    setInput(contents)
  );

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      {!hideLoadFromUrl && <LoadFromUrlBar url={url} onUrlChange={setUrl} onLoad={loadFromUrl} isLoading={isLoadingUrl} />}

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
            ariaLabel={inputLabel}
            language={inputLanguage}
            errorMarker={
              validateInput && !validation.valid && "error" in validation && validation.error && input.trim()
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
            label={outputLabel}
            actions={
              <OutputActionButtons
                onCopy={() => copy(result.output ?? "")}
                onDownload={() => download(result.output ?? "")}
              />
            }
          />
          <JsonEditor
            value={result.output ?? ""}
            readOnly
            ariaLabel={outputLabel}
            language={outputLanguage}
            height={420}
          />
        </div>
      </div>

      {!result.success && input.trim() && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {errorPrefix} — line {result.error?.position.line}, column{" "}
            {result.error?.position.column}: {result.error?.message}
          </span>
        </div>
      )}
    </div>
  );
}
