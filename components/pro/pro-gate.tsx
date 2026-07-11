import Link from "next/link";
import { Lock } from "lucide-react";
import { getCurrentSubscription, isSubscriptionUsable } from "@/lib/subscription";
import { planSatisfies, pricingPlans, type PlanId } from "@/config/pricing";

interface ProGateProps {
  requiredPlan: PlanId;
  featureName: string;
  children: React.ReactNode;
}

const linkButtonPrimary =
  "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:brightness-110";
const linkButtonOutline =
  "inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium hover:bg-muted";

/**
 * Server-side gate for Pro/Business-tier tool pages. Checks the signed-in
 * user's subscription and either renders the tool or an upgrade prompt.
 * This check happens on the server — it is not something client JS can
 * bypass by editing local state.
 */
export async function ProGate({ requiredPlan, featureName, children }: ProGateProps) {
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
      <h2 className="mt-4 font-display text-xl font-bold">{featureName} is a Pro feature</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Available on the {requiredPlanConfig?.name ?? "Pro"} plan and above, starting at $
        {requiredPlanConfig?.priceMonthly}/month — with a 7-day free trial, no charge until it ends.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        {loggedIn ? (
          <Link href="/pricing" className={linkButtonPrimary}>
            Start free trial
          </Link>
        ) : (
          <>
            <Link href="/login" className={linkButtonOutline}>
              Log in
            </Link>
            <Link href="/signup" className={linkButtonPrimary}>
              Sign up free
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
