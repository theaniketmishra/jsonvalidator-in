"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { sortJsonKeys } from "@/lib/json/format";

const useStore = createJsonStore();

export function SortKeysWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={(input) => sortJsonKeys(input, "2")}
      outputLanguage="json"
      outputLabel="Sorted JSON"
      downloadFilename="sorted.json"
    />
  );
}
