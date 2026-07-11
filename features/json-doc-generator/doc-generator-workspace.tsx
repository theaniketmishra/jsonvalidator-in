"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { generateJsonDocs } from "@/lib/json/doc-generator";

const useStore = createJsonStore();

export function DocGeneratorWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={generateJsonDocs}
      outputLanguage="markdown"
      outputLabel="Documentation (Markdown)"
      downloadFilename="json-docs.md"
    />
  );
}
