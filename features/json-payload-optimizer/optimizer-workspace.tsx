"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { optimizePayload } from "@/lib/json/optimizer";

const useStore = createJsonStore();

export function OptimizerWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={optimizePayload}
      outputLanguage="plaintext"
      outputLabel="Optimization report"
      downloadFilename="optimization-report.txt"
    />
  );
}
