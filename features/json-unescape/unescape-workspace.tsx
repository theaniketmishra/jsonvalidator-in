"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { unescapeJsonString } from "@/lib/json/escape";

const useStore = createJsonStore();

export function UnescapeWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={unescapeJsonString}
      outputLanguage="plaintext"
      outputLabel="Unescaped text"
      downloadFilename="unescaped.txt"
      inputLanguage="plaintext"
      validateInput={false}
      inputLabel="Escaped JSON string"
      errorPrefix="Couldn't unescape this string"
      hideLoadFromUrl
    />
  );
}
