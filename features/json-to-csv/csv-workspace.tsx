"use client";

import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { jsonToCsv } from "@/lib/converters/json-to-csv";

const useCsvStore = createJsonStore();

export function CsvWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useCsvStore}
      sample={sample}
      convert={jsonToCsv}
      outputLanguage="plaintext"
      outputLabel="CSV output"
      downloadFilename="converted.csv"
    />
  );
}
