import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function POST() {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: "No billing account found for this user yet." }, { status: 400 });
    }

    const stripe = getStripeClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${siteUrl}/account`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("Stripe portal error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong opening billing portal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}