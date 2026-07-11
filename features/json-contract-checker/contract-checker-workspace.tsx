"use client";
import { DualWorkspace } from "@/components/tools/dual-workspace";
import { createJsonStore } from "@/hooks/create-json-store";
import { checkApiContract } from "@/lib/json/contract-checker";

const useStoreA = createJsonStore();
const useStoreB = createJsonStore();

export function ContractCheckerWorkspace({ sampleA, sampleB }: { sampleA: string; sampleB: string }) {
  return (
    <DualWorkspace
      useStoreA={useStoreA}
      useStoreB={useStoreB}
      labelA="Expected contract"
      labelB="Actual response"
      sampleA={sampleA}
      sampleB={sampleB}
      outputLabel="Structural differences"
      downloadFilename="contract-check.txt"
      run={checkApiContract}
    />
  );
}
