# README-DEPLOY.md — Deploying JSONValidator.in

Written for someone who has never deployed a website before. Every step
tells you exactly what to click and what to type. Do them in order —
later steps depend on earlier ones.

**Time estimate:** 60-90 minutes the first time.

---

## Part 0 — What you need before starting

Create free accounts on these four sites (you can do this now, in any order):

1. **GitHub** — [github.com](https://github.com) — where your code lives
2. **Supabase** — [supabase.com](https://supabase.com) — handles login/accounts
3. **Stripe** — [stripe.com](https://stripe.com) — handles payments
4. **Cloudflare** — [cloudflare.com](https://cloudflare.com) — hosts the website

You'll also need **Node.js** installed on your computer to test things
locally. Download it from [nodejs.org](https://nodejs.org) — pick the
button that says **LTS**. Install it like any other program (click Next
through the installer).

---

## Part 1 — Get the code onto GitHub

GitHub stores your code online so Cloudflare can find it.

1. Unzip the project file I gave you somewhere on your computer, e.g. your Desktop.
2. Go to [github.com/new](https://github.com/new).
3. Repository name: `jsonvalidator-in`. Leave everything else default. Click **Create repository**.
4. On the next page, find the section "…or push an existing repository from the command line". Open a terminal (Windows: search "Command Prompt"; Mac: search "Terminal") **inside the unzipped folder** and run these one at a time, pressing Enter after each:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/theaniketmishra/jsonvalidator-in.git
git push -u origin main
```

(Replace `YOUR-USERNAME` with your actual GitHub username — GitHub shows you the exact URL to copy on that same page.)

If `git` isn't recognized, install it from [git-scm.com](https://git-scm.com) first, then repeat.

---

## Part 2 — Set up Supabase (handles sign-up/login)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and click **New project**.
2. Pick an organization (create one if asked), name the project `jsonvalidator`, generate/save a database password somewhere safe, pick the region closest to you, click **Create new project**. Wait ~2 minutes while it sets up.
3. Once it's ready, click **SQL Editor** in the left sidebar, then **New query**.
4. Open the file `supabase/migrations/0001_init.sql` from the project (in a text editor), copy everything in it, paste it into the Supabase SQL Editor, and click **Run** (bottom right). You should see "Success. No rows returned."
5. Click **Settings** (gear icon, bottom of the left sidebar) → **API**.
6. You'll see three values you need — keep this tab open, you'll copy these into a file in Part 5:
   - **Project URL** → this is 
   Agent
   Validator`NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (click "Reveal" to see it) → this is `SUPABASE_SERVICE_ROLE_KEY` — **never share this one publicly, it bypasses all security rules**
7. Still in Settings, click **Authentication** → **URL Configuration**. Set **Site URL** to `http://localhost:3000` for now — you'll change it once you have a real domain in Part 6.

---

## Part 3 — Set up Stripe (handles payments) — start in Test Mode

Everything in this part uses **Test Mode** first, so no real money moves. There's a toggle labeled "Test mode" near the top-right of the Stripe dashboard — make sure it's ON (orange) for all of this part.

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) and finish sign-up (you can skip business details for now — test mode doesn't need them).
2. Click **Product catalog** in the left sidebar → **Add product**. Create three products, one at a time:
   - Name: `Starter`, Price: `$10.00`, Billing period: `Monthly` → Save
   - Name: `Pro`, Price: `$35.00`, Billing period: `Monthly` → Save
   - Name: `Business`, Price: `$100.00`, Billing period: `Monthly` → Save
3. For each product, click into it and copy its **Price ID** (starts with `price_...`). You'll need all three in Part 5.
4. Click **Developers** → **API keys**. Copy the **Secret key** (starts with `sk_test_...`) — this is `STRIPE_SECRET_KEY`.
5. Click **Developers** → **Webhooks** → **Add endpoint**. Endpoint URL: type a placeholder for now, e.g. `https://example.com/api/stripe/webhook` (you'll fix this in Part 6). Under "Select events", check:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   Click **Add endpoint**, then **Reveal** the "Signing secret" and copy it (starts with `whsec_...`) — this is `STRIPE_WEBHOOK_SECRET`.

---

## Part 4 — Google login (optional, skip for now)

Not required to get the site running. Email/password login already works
on its own. Come back to this later if you want "Sign in with Google" too.

---

## Part 5 — Fill in your environment variables

Environment variables are secret settings the website reads when it
starts — this is how it knows your Supabase and Stripe accounts without
that information being visible in your code.

1. In the unzipped project folder, copy `.env.example` and rename the copy `.env.local`.
2. Open `.env.local` in a text editor and fill in every blank using the values from Parts 2 and 3:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=<from Part 2, step 6>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from Part 2, step 6>
SUPABASE_SERVICE_ROLE_KEY=<from Part 2, step 6>
STRIPE_SECRET_KEY=<from Part 3, step 4>
STRIPE_WEBHOOK_SECRET=<from Part 3, step 5>
STRIPE_PRICE_STARTER=<Starter price ID from Part 3, step 3>
STRIPE_PRICE_PRO=<Pro price ID from Part 3, step 3>
STRIPE_PRICE_BUSINESS=<Business price ID from Part 3, step 3>
```

3. Save. **Never commit `.env.local` to GitHub** — it's already excluded via `.gitignore`. This file only lives on your computer (you'll paste the same values into Cloudflare's dashboard separately, in Part 6).

### Test it locally before deploying anywhere

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Sign up with a real email you can check —
Supabase sends a confirmation link. Click it, log in, go to `/pricing`,
start a trial using test card **4242 4242 4242 4242**, any future expiry,
any 3-digit CVC. If your account page shows "Free trial active"
afterward, Parts 2-5 are wired correctly.

---

## Part 6 — Deploy to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare on GitHub, pick the `jsonvalidator-in` repository.
3. Build settings:
   - Framework preset: **Next.js**
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Build output directory: `.vercel/output/static`
4. Under **Environment variables (advanced)**, add every variable from `.env.local` — same names, same values, except set `NEXT_PUBLIC_SITE_URL` to the `pages.dev` address Cloudflare is about to give you (fix this after the first deploy once you see the real URL).
5. Click **Save and Deploy**.

**If the build fails here**: this project uses Supabase, which has a known
compatibility warning with Cloudflare's Edge Runtime (documented in
`HANDOFF.md`). If you hit this and can't resolve it, the reliable fallback
is deploying to **Vercel** instead — [vercel.com/new](https://vercel.com/new),
import the same GitHub repo, add the same environment variables, click
Deploy. Vercel has zero compatibility issues with this stack since
Next.js is made by the same company — Supabase and Stripe work
identically either way.

6. Once deployed, Cloudflare gives you a URL like `jsonvalidator-in.pages.dev`. Update `NEXT_PUBLIC_SITE_URL` to this exact address, then **Deployments** → **Retry deployment**.
7. Back in Supabase → Authentication → URL Configuration (Part 2, step 7), update the Site URL to this same address.
8. Back in Stripe → Developers → Webhooks, click your webhook → **⋮** → **Update details**, fix the endpoint URL to `https://YOUR-REAL-URL/api/stripe/webhook`.

### Connect your own domain (optional but recommended)

Cloudflare Pages → your project → **Custom domains** → **Set up a
domain**, follow the on-screen steps (you need to own the domain and
point its DNS to Cloudflare). Once connected, repeat steps 6-8 above using
your real domain instead of the `.pages.dev` one.

---

## Part 7 — Go live (real payments)

Only do this once Part 5 (local) and Part 6 (deployed) both work fully
with **test** Stripe keys.

1. In Stripe, toggle **Test mode OFF**.
2. Repeat Part 3 for real: create the same three Products/Prices in live
   mode (test-mode products don't carry over), get a live **Secret key**
   (`sk_live_...`), create a new webhook endpoint in live mode pointing at
   your real domain.
3. Stripe will likely ask you to finish business verification (bank
   details, tax info) before accepting real payments — it walks you
   through exactly what's needed.
4. Update the environment variables in Cloudflare (or Vercel) with the new
   live-mode values, and redeploy.
5. Make one real purchase yourself, then refund it from the Stripe
   dashboard, to confirm the whole flow works with real money before
   telling anyone the site is open.

---

## Troubleshooting

- **"Invalid signature" on the webhook**: `STRIPE_WEBHOOK_SECRET` doesn't
  match the one Stripe shows for that specific endpoint — test and live
  mode each have their own secret, and each endpoint you create has its
  own too.
- **Sign-up email never arrives**: check spam, and check Supabase →
  Authentication → Email Templates to confirm sending is enabled (it is
  by default, with sending limits on the free tier — fine for testing).
- **"Unknown or non-purchasable plan" on checkout**: one of the
  `STRIPE_PRICE_*` variables doesn't match a real Price ID — double-check
  you copied the Price ID (`price_...`), not the Product ID (`prod_...`).
