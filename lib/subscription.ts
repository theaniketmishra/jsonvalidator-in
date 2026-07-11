import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PlanId } from "@/config/pricing";

export interface SubscriptionInfo {
  userId: string | null;
  email: string | null;
  plan: PlanId;
  status: "inactive" | "trialing" | "active" | "past_due" | "canceled";
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
}

const DEFAULT_SUBSCRIPTION: SubscriptionInfo = {
  userId: null,
  email: null,
  plan: "free",
  status: "inactive",
  trialEndsAt: null,
  currentPeriodEnd: null,
};

/**
 * Fetches the logged-in user's plan/status. Returns the "free, logged out"
 * default if nobody is logged in, rather than throwing — every page can
 * call this unconditionally.
 */
export async function getCurrentSubscription(): Promise<SubscriptionInfo> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return DEFAULT_SUBSCRIPTION;

  const { data } = await supabase
    .from("subscriptions")
    .select("plan, status, trial_ends_at, current_period_end")
    .eq("user_id", user.id)
    .single();

  if (!data) return { ...DEFAULT_SUBSCRIPTION, userId: user.id, email: user.email ?? null };

  return {
    userId: user.id,
    email: user.email ?? null,
    plan: data.plan as PlanId,
    status: data.status,
    trialEndsAt: data.trial_ends_at,
    currentPeriodEnd: data.current_period_end,
  };
}

/** True if the subscription is currently usable (active or still in trial). */
export function isSubscriptionUsable(sub: SubscriptionInfo): boolean {
  return sub.status === "active" || sub.status === "trialing";
}
