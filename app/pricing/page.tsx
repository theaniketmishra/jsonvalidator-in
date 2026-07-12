import type { Metadata } from "next";
import { Check } from "lucide-react";
import { pricingPlans, enterpriseContact } from "@/config/pricing";
import { getCurrentSubscription } from "@/lib/subscription";
import { CheckoutButton } from "@/features/billing/checkout-button";
import { cn } from "@/lib/utils/cn";
import { ProValueSection } from "@/components/pricing/pro-value-section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free JSON tools for everyone. Pro plans starting at $10/month with a 7-day free trial.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const subscription = await getCurrentSubscription();
  const loggedIn = subscription.userId !== null;

  return (
    <div className="container max-w-6xl py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          All 32 core tools are free forever. Advanced analysis tools are a Pro upgrade, with a 7-day free trial —
          no charge until it ends.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-4">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "flex flex-col rounded-2xl border p-6",
              plan.highlighted ? "border-primary bg-primary/5" : "border-border bg-card/60"
            )}
          >
            {plan.highlighted && (
              <span className="mb-3 inline-block w-fit rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                Most popular
              </span>
            )}
            <h2 className="font-display text-lg font-bold">{plan.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
            <p className="mt-4">
              <span className="font-display text-3xl font-bold">
                {plan.priceMonthly === 0 ? "Free" : `$${plan.priceMonthly}`}
              </span>
              {plan.priceMonthly !== 0 && <span className="text-sm text-muted-foreground">/month</span>}
            </p>

            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {plan.id === "free" ? (
                <div className="rounded-md border border-border py-2.5 text-center text-sm font-medium text-muted-foreground">
                  {loggedIn ? "Included" : "No account needed"}
                </div>
              ) : (
                <CheckoutButton plan={plan.id} label="Start 7-day trial" loggedIn={loggedIn} />
              )}
            </div>
          </div>
        ))}
      </div>

      <ProValueSection />

      <div className="mt-8 rounded-2xl border border-dashed border-border p-6 text-center">
        <h2 className="font-display text-lg font-bold">{enterpriseContact.name}</h2>
        <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">{enterpriseContact.tagline}</p>
        <ul className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
          {enterpriseContact.features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>

        <a
          href={`mailto:${enterpriseContact.contactEmail}`}
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Contact us →
        </a>
      </div>
    </div>
  );
}
