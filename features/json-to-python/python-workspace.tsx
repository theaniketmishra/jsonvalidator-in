"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { jsonToPython } from "@/lib/converters/json-to-python";

const useStore = createJsonStore();

export function PythonWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={jsonToPython}
      outputLanguage="python"
      outputLabel="Python dict"
      downloadFilename="data.py"
    />
  );
}
