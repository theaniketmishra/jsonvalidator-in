"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { generateJsonSchema } from "@/lib/json/schema";

const useStore = createJsonStore();

export function SchemaGeneratorWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={generateJsonSchema}
      outputLanguage="json"
      outputLabel="JSON Schema"
      downloadFilename="schema.json"
    />
  );
}
