"use client";
import { DualWorkspace } from "@/components/tools/dual-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { mergeJson } from "@/lib/json/merge";

const useStoreA = createJsonStore();
const useStoreB = createJsonStore();

export function MergeWorkspace({ sampleA, sampleB }: { sampleA: string; sampleB: string }) {
  return (
    <DualWorkspace
      useStoreA={useStoreA}
      useStoreB={useStoreB}
      labelA="Base"
      labelB="Overrides"
      sampleA={sampleA}
      sampleB={sampleB}
      outputLabel="Merged JSON"
      downloadFilename="merged.json"
      run={mergeJson}
    />
  );
}
