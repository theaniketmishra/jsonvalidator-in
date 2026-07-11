"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { flattenJson } from "@/lib/json/flatten";

const useStore = createJsonStore();

export function FlattenWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={flattenJson}
      outputLanguage="json"
      outputLabel="Flattened JSON"
      downloadFilename="flattened.json"
    />
  );
}
