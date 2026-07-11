# HANDOFF.md — JSONValidator.in / "Project Atlas"

**Read this first in a new chat.** Upload this file along with the project
zip, and tell Claude: "Continue this project — read HANDOFF.md first."

Last verified: full `npm run build` succeeded, 55 routes, zero TypeScript
errors, zero ESLint errors. Verification commands are at the bottom of this
file — run them first in any new session before trusting anything below.

---

## 1. What this project is

A Next.js 14 (App Router, TypeScript, Tailwind) JSON tools website:
- 34 JSON tools — validator, formatter, repair, 8 converters, schema tools,
  diff/merge/search, analysis tools, plus Health Score and Semantic Diff —
  all client-side except Health Score and Semantic Diff, which are Pro-gated.
- A SaaS billing layer in progress: Supabase auth + Stripe subscriptions,
  gating some tools behind paid plans ($10/$35/$100 per month, 7-day trial).
- SEO infrastructure: sitemap, robots.txt (explicit AI-crawler allowlist),
  `llms.txt`, JSON-LD structured data on every tool page.

## 2. Status: what's actually done vs. in progress

### Fully built and verified
- All 33 tool pages, each with real working logic (not stubs) — see
  `config/tools.ts` for the full list and `lib/json/*` / `lib/converters/*`
  for the engines.
- Design system, navbar (categorized mega menu), footer, dark theme.
- Legal pages: About, Contact, Privacy Policy, Terms.
- Blog scaffold with 5 articles (`content/blog/index.ts`) — **not yet 15+
  as originally requested**.
- `what-is-json` long-form SEO guide page.
- **Auth**: Supabase email/password sign-up + login + session middleware.
  Code is written and typechecks/builds, but **has never been tested against
  a real Supabase project** because none exists yet — you'll need to create
  one and run the migration (see README-DEPLOY.md).
- **Billing**: Stripe Checkout (with 7-day trial), webhook handler (Edge
  Runtime compatible, verifies signatures via Stripe's Web Crypto provider),
  Customer Portal for self-service cancellation. Also **never tested against
  a real Stripe account** — same reason.
- **JSON Health Score** (Feature 4, the requested flagship): fully built,
  Pro-gated, reuses the Secret Scanner and Complexity Analyzer internally.
- **Secret Scanner extensions** (Feature 6): added Azure/GCP/Aadhaar/PAN
  patterns, severity levels, and a 0-100 risk score.
- **Payload Optimizer extensions** (Feature 7): duplicate object detection,
  constant-value-across-array-items detection, long property names, and
  nesting depth — all reported with concrete recommendations.
- **Semantic Diff** (Feature 8): fully built and Pro-gated. Detects added/
  removed/renamed fields (heuristic rename detection) and type changes,
  classifies each as breaking/non-breaking/info, computes a risk level, and
  gives a migration suggestion per breaking change.

### Not built yet (in original request order)
- **Feature 5 — AI Error Explainer**: on hold by your earlier decision
  (needs an LLM API key + rate limiting + a privacy-policy rewrite for that
  specific tool, since it would send data to a third party).
- **Feature 9 — AI Documentation Generator**: on hold, same reason as
  Feature 5. A **non-AI** doc generator already exists (`json-doc-generator`).
- **Feature 10 — Organization Policies**: not started. Deliberately —
  this is a genuinely large, separate data model (orgs, teams, policy rules)
  and UI, priced as custom Enterprise, not part of tonight's scope.
- **Feature 11 — Quality Gates / CI-CD integrations**: not started, same
  reason — five separate platform integrations (GitHub Actions, GitLab CI,
  Azure DevOps, Jenkins, Bitbucket) is its own multi-week project.
- **Feature 12 — Reports**: partially done. Health Score exports a text
  report. PDF/HTML export and the other report types (security findings,
  version comparison, technical debt summary) aren't built.
- **Pro-gating is only wired up on Health Score and Semantic Diff.** The
  other "Pro" features mentioned in pricing copy (Sensitive Data Scanner,
  Payload Optimizer) exist as free tools right now — nobody has actually
  restricted access to them yet. Decide whether that's the behavior you
  want before launch (see `components/pro/pro-gate.tsx` for the pattern —
  wrapping any tool page takes about 3 lines).

## 3. Known issues to fix before this goes live

1. **Cloudflare Edge Runtime warning**: the build emits a warning that
   `@supabase/supabase-js` uses a Node API (`process.version`) not
   supported in the Edge Runtime. It didn't break the build, but Cloudflare
   Pages deployment specifically requires the Edge Runtime for every route
   using Supabase (middleware, auth pages, API routes) — **this needs to be
   tested on an actual Cloudflare Pages deployment**, not just a local
   build, before you trust it works there. If it fails, the fallback is
   deploying to Vercel instead (native Next.js support, no adapter needed),
   which is the lower-risk option if Cloudflare gives you trouble.
2. **Zero end-to-end testing of auth or billing.** Every file typechecks
   and the build succeeds, but nobody has ever actually signed up a user,
   completed a Stripe Checkout, or received a webhook. Do this in Stripe
   **test mode** before anything touches real money.
3. **`config/site.ts`** still has a placeholder domain (`jsonvalidator.in`)
   — the contact email (`aniketmishra@jsonvalidator.in`) is real, but
   confirm the domain itself is what you'll actually launch on before
   launch, since it's baked into metadata, JSON-LD, and canonical URLs.
4. I found and fixed two real bugs tonight that automated tests (there are
   none for the TS/React side — only the earlier vanilla-JS engine had
   tests) didn't catch: a double-escaped-backslash bug in two tool
   descriptions, and a missing tool registry entry that only surfaced
   during `next build`, not `tsc --noEmit`. **Always run a full `npm run
   build`, not just typecheck, before trusting a change** — this codebase
   has already shown that typecheck alone isn't sufficient.

## 4. Immediate next steps, in priority order

1. Follow README-DEPLOY.md to stand up a real Supabase project and Stripe
   test-mode account, and actually test sign-up, trial, paid checkout,
   webhook, and the account page showing "active" end to end.
2. Decide which tools are actually meant to be Pro-gated (right now only
   Health Score and Semantic Diff enforce it), and wrap the rest in
   `<ProGate requiredPlan="starter">` the same way those two pages do.
3. Grow the blog from 5 to 15+ posts.
4. Decide on the AI features (5 and 9) — needs an Anthropic/OpenAI API key
   and a rate-limiting plan before building.
5. Features 10 and 11 (Enterprise) — only start these once the self-serve
   product actually has paying users; they're too large to build
   speculatively.

## 5. How to verify this project's state in a new session

Run these before doing anything else — they're the ground truth, not this
document:

```bash
cd jsonvalidator-in
npm install
npx tsc --noEmit          # must print nothing
npm run build              # must succeed (fonts will fail — see below)
```

**About the font build failure**: this sandbox cannot reach
`fonts.googleapis.com` (network allowlist), so every build in this
environment required temporarily stubbing `app/layout.tsx`'s Google Fonts
import to verify the rest of the app compiles, then restoring it
afterward. **The delivered zip has the real font imports intact** — this
is only a sandbox limitation, not a bug. A new session with normal internet
access shouldn't need this workaround at all.

## 6. File map (what to read to understand the codebase)

```
config/tools.ts             Every tool's metadata, SEO copy, FAQs -- the source of truth
config/pricing.ts           The 3 pricing tiers + Enterprise contact info
lib/json/*.ts                Core JSON engines (validate, format, repair, diff, etc.)
lib/converters/*.ts          JSON-to-X converters
lib/supabase/*.ts            Auth clients (browser + server + service role)
lib/stripe/client.ts         Stripe client (Edge-Runtime-safe fetch client)
lib/subscription.ts          Server-side "what plan is this user on" helper
middleware.ts                 Refreshes the Supabase session on every request
app/api/stripe/*/route.ts     Checkout, webhook, billing portal endpoints
components/pro/pro-gate.tsx   The wrapper that gates a page behind a plan
features/*/                   One folder per tool's UI, thin wrappers around lib/
supabase/migrations/0001_init.sql   Run this in Supabase's SQL Editor
.env.example                   Every environment variable this app needs
```
