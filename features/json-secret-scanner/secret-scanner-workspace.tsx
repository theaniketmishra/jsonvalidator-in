"use client";
import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { scanForSecrets } from "@/lib/json/secret-scanner";

const useStore = createJsonStore();

export function SecretScannerWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useStore}
      sample={sample}
      convert={scanForSecrets}
      outputLanguage="plaintext"
      outputLabel="Scan report"
      downloadFilename="secret-scan-report.txt"
    />
  );
}
