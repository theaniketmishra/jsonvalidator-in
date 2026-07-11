import type { ReactNode } from "react";

export function OutputToolbar({ label, actions }: { label: string; actions: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-3 py-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex flex-wrap items-center gap-1.5">{actions}</div>
    </div>
  );
}
