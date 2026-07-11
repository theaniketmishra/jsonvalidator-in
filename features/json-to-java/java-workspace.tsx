"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { jsonToJava } from "@/lib/converters/json-to-java";

const useStore = createJsonStore();

export function JavaWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={(input) => jsonToJava(input, "GeneratedClass")}
      outputLanguage="java"
      outputLabel="Java class"
      downloadFilename="GeneratedClass.java"
    />
  );
}
