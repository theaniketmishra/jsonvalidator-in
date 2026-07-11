import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { pricingPlans, TRIAL_DAYS, type PlanId } from "@/config/pricing";

export const runtime = "edge";

export async function POST(request: Request) {
  const { plan } = (await request.json()) as { plan?: PlanId };

  const planConfig = pricingPlans.find((p) => p.id === plan);
  if (!planConfig || !planConfig.stripePriceEnvVar) {
    return NextResponse.json({ error: "Unknown or non-purchasable plan." }, { status: 400 });
  }

  const priceId = process.env[planConfig.stripePriceEnvVar];
  if (!priceId) {
    return NextResponse.json(
      { error: `${planConfig.stripePriceEnvVar} is not set on the server. See README-DEPLOY.md, Part 5.` },
      { status: 500 }
    );
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "You must be logged in to start a subscription." }, { status: 401 });
  }

  const stripe = getStripeClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: TRIAL_DAYS,
      metadata: { supabase_user_id: user.id, plan: planConfig.id },
    },
    client_reference_id: user.id,
    customer_email: user.email,
    metadata: { supabase_user_id: user.id, plan: planConfig.id },
    success_url: `${siteUrl}/account?checkout=success`,
    cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
