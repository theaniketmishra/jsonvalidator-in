"use client";

import { Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadFromUrlBarProps {
  url: string;
  onUrlChange: (value: string) => void;
  onLoad: () => void;
  isLoading: boolean;
}

export function LoadFromUrlBar({ url, onUrlChange, onLoad, isLoading }: LoadFromUrlBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-1.5">
      <Link2 className="ml-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <input
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onLoad()}
        placeholder="Load JSON from a URL, e.g. https://api.example.com/data.json"
        aria-label="JSON source URL"
        className="h-7 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <Button variant="secondary" size="sm" onClick={onLoad} disabled={isLoading || !url.trim()}>
        {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Load"}
      </Button>
    </div>
  );
}
