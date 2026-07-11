"use client";
import { DualWorkspace } from "@/components/tools/dual-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { diffJson } from "@/lib/json/diff";

const useStoreA = createJsonStore();
const useStoreB = createJsonStore();

export function DiffWorkspace({ sampleA, sampleB }: { sampleA: string; sampleB: string }) {
  return (
    <DualWorkspace
      useStoreA={useStoreA}
      useStoreB={useStoreB}
      labelA="Original"
      labelB="Changed"
      sampleA={sampleA}
      sampleB={sampleB}
      outputLabel="Differences"
      downloadFilename="diff.txt"
      run={diffJson}
    />
  );
}
