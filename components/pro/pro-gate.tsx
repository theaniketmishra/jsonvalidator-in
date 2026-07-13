import Link from "next/link";
import { Lock } from "lucide-react";
import { getCurrentSubscription, isSubscriptionUsable } from "@/lib/subscription";
import { planSatisfies, pricingPlans } from "@/config/pricing";
import { CheckoutButton } from "@/features/billing/checkout-button";
import type { ToolConfig } from "@/types/tool";

interface ProGateProps {
  tool: ToolConfig;
  children: React.ReactNode;
}

const linkButtonOutline =
  "inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium hover:bg-muted";

/**
 * Server-side gate for Pro/Business-tier tool pages. Checks the signed-in
 * user's subscription and either renders the tool or an upgrade prompt with
 * tool-specific value copy and a direct one-click path to checkout. This
 * check happens on the server — it is not something client JS can bypass by
 * editing local state.
 */
export async function ProGate({ tool, children }: ProGateProps) {
  const requiredPlan = tool.proTier ?? "starter";
  const subscription = await getCurrentSubscription();
  const hasAccess = isSubscriptionUsable(subscription) && planSatisfies(subscription.plan, requiredPlan);

  if (hasAccess) return <>{children}</>;

  const requiredPlanConfig = pricingPlans.find((p) => p.id === requiredPlan);
  const loggedIn = subscription.userId !== null;

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card/60 p-8 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Lock className="h-5 w-5" />
      </span>
      <h2 className="mt-4 font-display text-xl font-bold">{tool.name} is a {requiredPlanConfig?.name ?? "Pro"} feature</h2>

      {tool.proBenefit && (
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{tool.proBenefit}</p>
      )}

      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-primary">
        {requiredPlanConfig?.name ?? "Pro"} · ${requiredPlanConfig?.priceMonthly}/mo · 7-day free trial
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="w-full max-w-xs">
          <CheckoutButton
            plan={requiredPlan}
            label={loggedIn ? "Start 7-day free trial" : "Sign up & start free trial"}
            loggedIn={loggedIn}
          />
        </div>
        {!loggedIn && (
          <Link href="/login" className={linkButtonOutline}>
            Already have an account? Log in
          </Link>
        )}
        <Link href="/pricing" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
          Compare all plans →
        </Link>
      </div>
    </div>
  );
}
