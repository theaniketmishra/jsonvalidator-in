import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Code2 } from "lucide-react";
import { ValidatorWorkspace } from "@/features/json-validator/validator-workspace";
import { FeatureGrid } from "@/components/tools/feature-grid";
import { FaqSection } from "@/components/tools/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { toolBySlug, tools } from "@/config/tools";
import { softwareApplicationSchema, faqSchema } from "@/lib/seo/schema";
import { ProBadge } from "@/components/pro/pro-badge";
import { pricingPlans } from "@/config/pricing";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const trustPoints = [
  { icon: ShieldCheck, label: "Nothing leaves your browser" },
  { icon: Zap, label: "Instant, no sign-up required" },
  { icon: Code2, label: "Built for developers, by developers" },
];

export default function HomePage() {
  const validator = toolBySlug("json-validator")!;

  return (
    <div className="bg-grid-fade">
      <JsonLd data={softwareApplicationSchema(validator)} />
      <JsonLd data={faqSchema(validator.faqs)} />

      <section className="container pb-8 pt-16 text-center sm:pt-24">
        <Badge variant="outline" className="mb-5 animate-fade-up">
          The JSON Intelligence Platform
        </Badge>
        <h1 className="animate-fade-up text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Every JSON problem, <span className="text-primary">one platform</span>
        </h1>
        <p
          className="mx-auto mt-5 max-w-2xl animate-fade-up text-balance text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "80ms" }}
        >
          Validate, repair, diff, secure, and document JSON — 32 tools free forever, with Pro-grade analysis for
          teams shipping APIs at scale. Start free, no card required.
        </p>
        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground animate-fade-up"
          style={{ animationDelay: "140ms" }}
        >
          {trustPoints.map((point) => (
            <span key={point.label} className="flex items-center gap-1.5">
              <point.icon className="h-3.5 w-3.5 text-primary" />
              {point.label}
            </span>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <ValidatorWorkspace sample={validator.sampleInput} />
      </section>

      <section id="all-tools" className="container scroll-mt-20 pb-16">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">Every tool, live</h2>
          <p className="mt-1.5 max-w-2xl text-muted-foreground">
            32 JSON tools, all free, all running entirely in your browser.
          </p>
        </div>
        {(["core", "convert", "schema"] as const).map((cat) => {
          const catTools = tools.filter((t) => t.category === cat && t.slug !== "json-validator");
          if (catTools.length === 0) return null;
          const catLabel = cat === "core" ? "Core tools" : cat === "convert" ? "Converters" : "Schema tools";
          return (
            <div key={cat} className="mb-8 last:mb-0">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{catLabel}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {catTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="group rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="flex items-center gap-1.5 font-display text-sm font-semibold">
                        {tool.name}
                        {tool.isPro && <ProBadge />}
                      </h4>
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{tool.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="container pb-16">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Why developers use JSONValidator.in</h2>
        <FeatureGrid features={validator.features} />
      </section>

      <section className="container pb-20">
        <h2 className="mb-6 text-center font-display text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <div className="mx-auto max-w-2xl">
          <FaqSection faqs={validator.faqs} />
        </div>
      </section>

      <section className="container pb-20">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight">Free forever. Pro when you need it.</h2>
          <p className="mx-auto mt-1.5 max-w-2xl text-muted-foreground">
            All 32 core tools are free, no account needed. Pro unlocks advanced analysis — 7-day free trial, no
            card required.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border p-5 ${plan.highlighted ? "border-primary/60 bg-primary/[0.04]" : "border-border bg-card/60"
                }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold">{plan.name}</h3>
                {plan.highlighted && <ProBadge />}
              </div>
              <p className="mt-2 font-display text-2xl font-bold">
                {plan.priceMonthly === 0 ? "Free" : `$${plan.priceMonthly}`}
                {plan.priceMonthly !== null && plan.priceMonthly > 0 && (
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                )}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{plan.tagline}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:brightness-110"
          >
            See full plan comparison
          </Link>
        </div>
      </section>
    </div>
  );
}