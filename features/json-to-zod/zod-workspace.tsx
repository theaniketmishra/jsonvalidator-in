"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { jsonToZod } from "@/lib/converters/json-to-zod";

const useStore = createJsonStore();

export function ZodWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={(input) => jsonToZod(input, "Schema")}
      outputLanguage="typescript"
      outputLabel="Zod schema"
      downloadFilename="schema.ts"
    />
  );
}
