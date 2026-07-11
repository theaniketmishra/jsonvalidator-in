"use client";

import * as React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { JsonEditor } from "@/components/tools/json-editor";
import { EditorToolbar } from "@/components/tools/editor-toolbar";
import { Button } from "@/components/ui/button";
import { createJsonStore } from "@/hooks/create-json-store";
import { useFileActions } from "@/hooks/use-file-actions";
import { validateJson } from "@/lib/json/validate";
import { validateJsonAgainstSchema } from "@/lib/json/schema";

const useDataStore = createJsonStore();
const useSchemaStore = createJsonStore();

export function SchemaValidatorWorkspace({ sample, sampleSchema }: { sample: string; sampleSchema: string }) {
  const data = useDataStore();
  const schema = useSchemaStore();
  const [result, setResult] = React.useState<ReturnType<typeof validateJsonAgainstSchema> | null>(null);

  const dataValidation = React.useMemo(() => validateJson(data.input), [data.input]);
  const schemaValidation = React.useMemo(() => validateJson(schema.input), [schema.input]);

  const { inputRef: dataFileRef, triggerUpload: triggerDataUpload, handleFileInput: handleDataFile } = useFileActions({
    onLoad: (c) => data.setInput(c),
  });
  const { inputRef: schemaFileRef, triggerUpload: triggerSchemaUpload, handleFileInput: handleSchemaFile } = useFileActions({
    onLoad: (c) => schema.setInput(c),
  });

  const runValidation = () => {
    if (!data.input.trim() || !schema.input.trim()) return;
    setResult(validateJsonAgainstSchema(data.input, schema.input));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="border-b border-border bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground">JSON data</div>
          <EditorToolbar
            onPaste={data.setInput}
            onUpload={triggerDataUpload}
            onSample={() => data.loadSample(sample)}
            onClear={data.clear}
            onUndo={data.undo}
            onRedo={data.redo}
            canUndo={data.canUndo()}
            canRedo={data.canRedo()}
            fileInputRef={dataFileRef}
            onFileInputChange={handleDataFile}
          />
          <JsonEditor
            value={data.input}
            onChange={data.setInput}
            ariaLabel="JSON data"
            height={340}
            errorMarker={
              !dataValidation.valid && dataValidation.error && data.input.trim()
                ? { line: dataValidation.error.position.line, column: dataValidation.error.position.column, message: dataValidation.error.message }
                : null
            }
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="border-b border-border bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground">JSON Schema</div>
          <EditorToolbar
            onPaste={schema.setInput}
            onUpload={triggerSchemaUpload}
            onSample={() => schema.loadSample(sampleSchema)}
            onClear={schema.clear}
            onUndo={schema.undo}
            onRedo={schema.redo}
            canUndo={schema.canUndo()}
            canRedo={schema.canRedo()}
            fileInputRef={schemaFileRef}
            onFileInputChange={handleSchemaFile}
          />
          <JsonEditor
            value={schema.input}
            onChange={schema.setInput}
            ariaLabel="JSON Schema"
            height={340}
            errorMarker={
              !schemaValidation.valid && schemaValidation.error && schema.input.trim()
                ? { line: schemaValidation.error.position.line, column: schemaValidation.error.position.column, message: schemaValidation.error.message }
                : null
            }
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={runValidation} disabled={!data.input.trim() || !schema.input.trim()}>
          Validate against schema
        </Button>
      </div>

      {result && !result.success && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {result.side === "schema" ? "JSON Schema: " : "JSON data: "}
            Line {result.error?.position.line}, column {result.error?.position.column}: {result.error?.message}
          </span>
        </div>
      )}

      {result && result.success && result.valid && (
        <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/5 p-4 text-sm text-success">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Valid — the JSON matches the schema.
        </div>
      )}

      {result && result.success && !result.valid && (
        <div className="overflow-hidden rounded-xl border border-destructive/30">
          <div className="bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive">
            {result.errors?.length} validation error{result.errors?.length === 1 ? "" : "s"}
          </div>
          <div className="divide-y divide-border">
            {result.errors?.map((msg, i) => (
              <div key={i} className="px-4 py-2.5 text-sm text-muted-foreground">
                {msg}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
