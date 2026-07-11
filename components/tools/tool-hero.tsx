import { Badge } from "@/components/ui/badge";

export function ToolHero({
  eyebrow,
  title,
  tagline,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
}) {
  return (
    <div className="animate-fade-up text-center">
      <Badge variant="outline" className="mb-4">
        {eyebrow}
      </Badge>
      <h1 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">{tagline}</p>
    </div>
  );
}
