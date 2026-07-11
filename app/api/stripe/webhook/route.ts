import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/client";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { pricingPlans, type PlanId } from "@/config/pricing";

export const runtime = "edge";

function priceIdToPlan(priceId: string | undefined): PlanId | null {
  if (!priceId) return null;
  for (const plan of pricingPlans) {
    if (plan.stripePriceEnvVar && process.env[plan.stripePriceEnvVar] === priceId) {
      return plan.id;
    }
  }
  return null;
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret." }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = getStripeClient();

  // Edge Runtime has no Node `crypto` module, so signature verification uses
  // Stripe's Web Crypto (SubtleCrypto) provider instead of the Node default.
  const cryptoProvider = Stripe.createSubtleCryptoProvider();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret, undefined, cryptoProvider);
  } catch (err) {
    return NextResponse.json({ error: `Invalid signature: ${(err as Error).message}` }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id ?? session.client_reference_id;
      if (!userId || !session.subscription) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const plan = priceIdToPlan(subscription.items.data[0]?.price.id) ?? "free";

      await supabase
        .from("subscriptions")
        .update({
          plan,
          status: subscription.status,
          stripe_customer_id: subscription.customer as string,
          stripe_subscription_id: subscription.id,
          trial_ends_at: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.supabase_user_id;
      if (!userId) break;

      const plan = priceIdToPlan(subscription.items.data[0]?.price.id) ?? "free";

      await supabase
        .from("subscriptions")
        .update({
          plan,
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.supabase_user_id;
      if (!userId) break;

      await supabase
        .from("subscriptions")
        .update({
          plan: "free",
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
