export type PlanId = "free" | "starter" | "pro" | "business";

export interface PricingPlan {
  id: PlanId;
  name: string;
  priceMonthly: number | null;
  /** Env var name holding the Stripe Price ID for this plan (set after creating the product in Stripe). */
  stripePriceEnvVar: string | null;
  tagline: string;
  features: string[];
  trialDays: number;
  highlighted?: boolean;
}

export const TRIAL_DAYS = 7;

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    stripePriceEnvVar: null,
    tagline: "Every validator, formatter, and converter — free, forever.",
    features: [
      "All 32 core JSON tools",
      "Unlimited use, no account needed",
      "Nothing you paste ever leaves your browser",
    ],
    trialDays: 0,
  },
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 10,
    stripePriceEnvVar: "STRIPE_PRICE_STARTER",
    tagline: "For solo developers who want the advanced analysis tools.",
    features: [
      "Everything in Free",
      "JSON Health Score",
      "Sensitive Data Scanner",
      "Payload Optimizer",
      "Semantic Diff",
      "Exportable reports (PDF/HTML)",
      "7-day free trial",
    ],
    trialDays: TRIAL_DAYS,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 35,
    stripePriceEnvVar: "STRIPE_PRICE_PRO",
    tagline: "For small teams shipping APIs who need this in their workflow.",
    features: [
      "Everything in Starter",
      "Higher usage limits",
      "AI-powered tools (when enabled)",
      "Priority email support",
      "7-day free trial",
    ],
    trialDays: TRIAL_DAYS,
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 100,
    stripePriceEnvVar: "STRIPE_PRICE_BUSINESS",
    tagline: "For larger teams standardizing on JSON quality tooling.",
    features: [
      "Everything in Pro",
      "Highest usage limits",
      "Multiple team members",
      "Priority support with faster SLA",
      "7-day free trial",
    ],
    trialDays: TRIAL_DAYS,
  },
];

/** Features 10 (Organization Policies) and 11 (Quality Gates/CI-CD) live here — custom pricing, not part of the fixed $10-$100 self-serve tiers. */
export const enterpriseContact = {
  name: "Enterprise",
  tagline: "Organization-wide policies and CI/CD quality gates.",
  features: [
    "Everything in Business",
    "Organization Policies (naming conventions, nesting limits, required fields)",
    "Quality Gates for GitHub Actions, GitLab CI, Azure DevOps, Jenkins, Bitbucket",
    "Custom SLA and onboarding",
  ],
  contactEmail: "aniketmishra@jsonvalidator.in",
};

export function planRank(plan: PlanId): number {
  return { free: 0, starter: 1, pro: 2, business: 3 }[plan];
}

/** True if `current` grants access to something gated at `required`. */
export function planSatisfies(current: PlanId, required: PlanId): boolean {
  return planRank(current) >= planRank(required);
}
