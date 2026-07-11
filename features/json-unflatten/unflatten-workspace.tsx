"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { unflattenJson } from "@/lib/json/flatten";

const useStore = createJsonStore();

export function UnflattenWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={unflattenJson}
      outputLanguage="json"
      outputLabel="Unflattened JSON"
      downloadFilename="unflattened.json"
    />
  );
}
