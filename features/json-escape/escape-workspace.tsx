"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { escapeJsonString } from "@/lib/json/escape";

const useStore = createJsonStore();

export function EscapeWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={escapeJsonString}
      outputLanguage="json"
      outputLabel="Escaped string"
      downloadFilename="escaped.txt"
      inputLanguage="plaintext"
      validateInput={false}
      inputLabel="Text to escape"
      errorPrefix="Couldn't escape this text"
      hideLoadFromUrl
    />
  );
}
