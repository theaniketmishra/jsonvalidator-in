"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { jsonToSql } from "@/lib/converters/json-to-sql";

const useStore = createJsonStore();

export function SqlWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={(input) => jsonToSql(input, "data")}
      outputLanguage="sql"
      outputLabel="SQL statements"
      downloadFilename="data.sql"
    />
  );
}
