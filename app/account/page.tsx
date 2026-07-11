import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSubscription, isSubscriptionUsable } from "@/lib/subscription";
import { pricingPlans } from "@/config/pricing";
import { signOutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { ManageBillingButton } from "@/features/billing/manage-billing-button";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const subscription = await getCurrentSubscription();
  if (!subscription.userId) redirect("/login");

  const planConfig = pricingPlans.find((p) => p.id === subscription.plan);
  const usable = isSubscriptionUsable(subscription);

  return (
    <div className="container max-w-lg py-16 sm:py-24">
      <h1 className="font-display text-2xl font-bold">Your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">{subscription.email}</p>

      <div className="mt-8 rounded-xl border border-border p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Current plan</p>
        <p className="mt-1 font-display text-xl font-bold">{planConfig?.name ?? "Free"}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Status:{" "}
          <span className={usable ? "text-success" : "text-muted-foreground"}>
            {subscription.status === "trialing" ? "Free trial active" : subscription.status}
          </span>
        </p>
        {subscription.trialEndsAt && subscription.status === "trialing" && (
          <p className="mt-1 text-xs text-muted-foreground">
            Trial ends {new Date(subscription.trialEndsAt).toLocaleDateString()}
          </p>
        )}

        <div className="mt-5 flex gap-3">
          {subscription.plan !== "free" ? (
            <ManageBillingButton />
          ) : (
            <Link
              href="/pricing"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:brightness-110"
            >
              Upgrade to Pro
            </Link>
          )}
        </div>
      </div>

      <form action={signOutAction} className="mt-6">
        <Button type="submit" variant="outline">
          Log out
        </Button>
      </form>
    </div>
  );
}
