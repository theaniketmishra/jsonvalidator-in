import type { ReactNode } from "react";
import { ToolHero } from "./tool-hero";
import { FeatureGrid } from "./feature-grid";
import { FaqSection } from "./faq-section";
import { RelatedTools } from "./related-tools";
import type { ToolConfig } from "@/types/tool";

const PLAN_LABEL: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  business: "Business",
};

export function ToolPageShell({ tool, children }: { tool: ToolConfig; children: ReactNode }) {
  const eyebrow = tool.isPro
    ? `${PLAN_LABEL[tool.proTier ?? "starter"]} plan · 7-day free trial`
    : "Free · No signup · Runs in your browser";

  return (
    <div className="bg-grid-fade">
      <section className="container pb-10 pt-14 sm:pt-20">
        <ToolHero eyebrow={eyebrow} title={tool.name} tagline={tool.tagline} isPro={tool.isPro} />
      </section>

      <section className="container pb-16">{children}</section>

      <section className="container space-y-6 pb-16">
        <h2 className="font-display text-2xl font-bold tracking-tight">Why use this {tool.shortName.toLowerCase()}</h2>
        <FeatureGrid features={tool.features} />
      </section>

      <section className="container pb-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight">About the {tool.name}</h2>
          <p className="text-balance leading-relaxed text-muted-foreground">{tool.description}</p>
        </div>
      </section>

      <section className="container pb-16">
        <h2 className="mb-6 text-center font-display text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <div className="mx-auto max-w-2xl">
          <FaqSection faqs={tool.faqs} />
        </div>
      </section>

      <section className="container pb-20">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Related tools</h2>
        <RelatedTools currentSlug={tool.slug} />
      </section>
    </div>
  );
}