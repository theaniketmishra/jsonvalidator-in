"use client";

import { ConverterWorkspace } from "@/components/tools/converter-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { jsonToXml } from "@/lib/converters/json-to-xml";

const useXmlStore = createJsonStore();

export function XmlWorkspace({ sample }: { sample: string }) {
  return (
    <ConverterWorkspace
      useStore={useXmlStore}
      sample={sample}
      convert={(input) => jsonToXml(input, "root")}
      outputLanguage="xml"
      outputLabel="XML output"
      downloadFilename="converted.xml"
    />
  );
}
