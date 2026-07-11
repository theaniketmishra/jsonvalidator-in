"use client";
import { DualWorkspace } from "@/components/tools/dual-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { semanticDiff } from "@/lib/json/semantic-diff";

const useStoreA = createJsonStore();
const useStoreB = createJsonStore();

export function SemanticDiffWorkspace({ sampleA, sampleB }: { sampleA: string; sampleB: string }) {
  return (
    <DualWorkspace
      useStoreA={useStoreA}
      useStoreB={useStoreB}
      labelA="Before (contract/previous version)"
      labelB="After (new version)"
      sampleA={sampleA}
      sampleB={sampleB}
      outputLabel="Compatibility report"
      downloadFilename="semantic-diff-report.txt"
      run={semanticDiff}
    />
  );
}
