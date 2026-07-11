import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tools } from "@/config/tools";
import { Card } from "@/components/ui/card";

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = tools.filter((t) => t.slug !== currentSlug);
  if (related.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {related.map((tool) => (
        <Link key={tool.slug} href={`/${tool.slug}`}>
          <Card className="group h-full bg-card/60 p-5 transition-colors hover:border-primary/40">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold">{tool.name}</h3>
              <ArrowRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{tool.tagline}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
