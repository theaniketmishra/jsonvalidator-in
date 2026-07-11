"use client";

import * as React from "react";
import { ChevronsDown, ChevronsUp, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonTreeNode } from "./json-tree-node";

export function JsonTreeView({ data }: { data: unknown }) {
  const [version, setVersion] = React.useState(0);
  const [defaultExpanded, setDefaultExpanded] = React.useState(true);

  const expandAll = () => {
    setDefaultExpanded(true);
    setVersion((v) => v + 1);
  };
  const collapseAll = () => {
    setDefaultExpanded(false);
    setVersion((v) => v + 1);
  };

  if (data === undefined) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-10 text-center text-sm text-muted-foreground">
        <FileJson className="h-6 w-6" />
        Paste valid JSON to see it rendered as a tree.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/30 px-2 py-1.5">
        <Button variant="ghost" size="sm" onClick={expandAll}>
          <ChevronsDown className="h-3.5 w-3.5" /> Expand all
        </Button>
        <Button variant="ghost" size="sm" onClick={collapseAll}>
          <ChevronsUp className="h-3.5 w-3.5" /> Collapse all
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-2" key={version}>
        <JsonTreeNode value={data} defaultExpanded={defaultExpanded} />
      </div>
    </div>
  );
}
