"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { jsonToYaml } from "@/lib/converters/json-to-yaml";

const useStore = createJsonStore();

export function YamlWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={jsonToYaml}
      outputLanguage="yaml"
      outputLabel="YAML output"
      downloadFilename="converted.yaml"
    />
  );
}
