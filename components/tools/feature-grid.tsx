import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ToolFeature } from "@/types/tool";

export function FeatureGrid({ features }: { features: ToolFeature[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <Card key={feature.title} className="bg-card/60">
          <CardContent className="pt-5">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <h3 className="font-display text-sm font-semibold">{feature.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
