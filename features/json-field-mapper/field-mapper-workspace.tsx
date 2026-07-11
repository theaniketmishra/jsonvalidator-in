"use client";
import { DualWorkspace } from "@/components/tools/dual-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { mapFields } from "@/lib/json/field-mapper";

const useStoreA = createJsonStore();
const useStoreB = createJsonStore();

export function FieldMapperWorkspace({ sampleA, sampleB }: { sampleA: string; sampleB: string }) {
  return (
    <DualWorkspace
      useStoreA={useStoreA}
      useStoreB={useStoreB}
      labelA="JSON data"
      labelB='Key mapping (e.g. { "oldKey": "newKey" })'
      sampleA={sampleA}
      sampleB={sampleB}
      outputLabel="Remapped JSON"
      downloadFilename="remapped.json"
      run={mapFields}
    />
  );
}
