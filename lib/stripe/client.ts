import Stripe from "stripe";

/**
 * Stripe's default HTTP client uses Node's `https` module, which doesn't
 * exist in the Edge Runtime (required for Cloudflare Pages). The fetch-based
 * client below works in both Node and Edge runtimes.
 */
export function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment variables (see README-DEPLOY.md)."
    );
  }
  return new Stripe(secretKey, {
    apiVersion: "2024-06-20",
    httpClient: Stripe.createFetchHttpClient(),
  });
}
