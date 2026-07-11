import type { JsonStats } from "@/lib/json/types";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function StatsBar({ stats }: { stats: JsonStats }) {
  const items: { label: string; value: string }[] = [
    { label: "Characters", value: stats.characters.toLocaleString() },
    { label: "Lines", value: stats.lines.toLocaleString() },
    { label: "Words", value: stats.words.toLocaleString() },
    { label: "Size", value: formatBytes(stats.bytes) },
  ];

  if (stats.keys !== undefined) items.push({ label: "Keys", value: stats.keys.toLocaleString() });
  if (stats.depth !== undefined) items.push({ label: "Depth", value: stats.depth.toLocaleString() });

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border bg-muted/20 px-3.5 py-2 font-mono text-[11px] text-muted-foreground mono-tabular">
      {items.map((item) => (
        <span key={item.label}>
          {item.label}: <span className="text-foreground/80">{item.value}</span>
        </span>
      ))}
    </div>
  );
}
