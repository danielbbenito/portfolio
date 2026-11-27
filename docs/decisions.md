# Decision log

Format: problem → options → trade-offs → decision → result.

---

## 2026-11-25 — Repo shape: monorepo

Recorded in CLAUDE.md (Architecture). One public repo holding `apps/web` (Next.js) and `apps/api` (NestJS).

---

## 2026-11-26 — Monorepo tooling: npm workspaces

**Problem:** Two apps in one repo need a way to install and run them together without two separate setups.

**Options:**
1. npm workspaces (built into npm, already installed)
2. pnpm workspaces (faster installs, stricter dependency isolation; extra tool to install)
3. Turborepo / Nx on top of either (task caching and pipelines)

**Trade-offs:** With only two apps and a beginner owner, fewer tools beats speed. pnpm's stricter isolation and Turborepo's caching only pay off with more packages or slow builds. Switching later is cheap.

**Decision:** npm workspaces, no build orchestrator.

**Result:** _to fill in after the apps are scaffolded and running._

---

## 2026-11-26 — Web app scaffold options

**Problem:** `create-next-app` asks several setup questions; the answers shape every file after it.

**Options taken / trade-offs:**
- **TypeScript** over JavaScript: types catch mistakes before runtime, closest to C#, and the target role asks for it.
- **App Router** over the older Pages Router: the current default; layouts and server components are where Next.js is heading.
- **Tailwind CSS v4** over CSS Modules: utility classes are fast to iterate with and widely used in Next.js teams. The visual style's colours and fonts become Tailwind theme tokens in one place. Cost: long `className` strings; mitigated by extracting components.
- **`src/` directory, `@/*` import alias, ESLint**: the defaults; keep app code apart from config files.
- Kept the scaffold's **Cache Components** and **Partial Prefetching** flags (Next 16 defaults); revisit if they get in the way.

**Decision:** as above, Next.js 16.4.6, installed through the root workspace (`--skip-install`, then `npm install` at the root, so there is one lockfile).

**Result:** `npm run lint:web` and `npm run build:web` pass; the default page runs at localhost:3000.

---

## 2026-11-27 — Fast-track to a complete v1

**Problem:** Hiring for the target role is moving quickly; the original learn-by-typing pace would take too long. But a site without the contact API and analytics wouldn't show the full-stack skills the role asks for.

**Options:**
1. Ship a static v1 now; add contact API + analytics after it's live.
2. Build everything (incl. NestJS contact API, PostgreSQL, PostHog/GA4) at full speed, then share the link once, complete.
3. Keep the slow teaching pace.

**Trade-offs:** Option 1 gets a link out sooner but the first impression shows little web/back-end work. Option 3 teaches more deeply but misses the hiring window. Option 2 delays the link by roughly a week but the first impression is the full story; teaching becomes breadth-first.

**Decision:** Option 2 (Daniel's call). Claude implements; Daniel directs content/design, reviews, and runs all git operations in Sourcetree. Daniel applies/expresses interest in parallel rather than waiting on the site. The CLAUDE.md fallback (Next.js route handler instead of NestJS) stays available if the API slice slips.

**Result:** _to fill in at launch._

---

## 2026-11-27 — Contact API: how it's built

**Problem:** The contact form needs an API that validates input, keeps spam out, limits abuse and stores messages in PostgreSQL, built fast, by a beginner, with no PostgreSQL or Docker installed locally.

**Options and trade-offs:**
- **Validation: Zod schema** through NestJS 12's built-in `StandardSchemaValidationPipe`, over `class-validator` DTO classes. One schema gives both the runtime check and the TypeScript type; fewer decorators to learn.
- **Database access: Drizzle ORM** over TypeORM/Prisma. The schema is plain TypeScript, queries read like SQL, and `drizzle-kit` writes plain `.sql` migrations that are easy to review. Used stable `drizzle-orm` 0.45 rather than the 1.0 release candidate.
- **Wiring: a small `DatabaseModule` of my own** instead of the first-party `@nestjs/drizzle` (version 0.0.2, very new). About 40 lines, and it shows how Nest dependency injection works.
- **Local database: PGlite** (PostgreSQL compiled to WebAssembly, running inside Node) when `DATABASE_URL` is unset; real PostgreSQL when it is set. No local install, and tests get a fresh in-memory database each run. Cost: two driver paths. Both run the same migrations, so the schema can't drift.
- **Migrations run on startup.** Fine for one API instance; with several instances, move them to a separate release step.
- **Spam: honeypot field + minimum fill time (3 s)**, answering "ok" either way so bots learn nothing. No CAPTCHA (friction for real visitors, extra third-party script). Can be added later if spam gets through.
- **Rate limiting: `@nestjs/throttler`**, 60 requests/min per IP for the API, 5 per 10 min for `POST /contact`. In-memory storage is fine for one instance.

**Decision:** as above.

**Result:** 9 tests pass (3 unit, 6 end-to-end, incl. validation, both spam checks and the 429). A message sent from the local site lands in the database.

---

## 2026-11-27 — Hosting for the API and database

**Problem:** The API and database need a free or very cheap home. Tiers change often, so they were checked at setup time.

**Options (checked 2026-11-27):**
- **API:** Render free web service (no card; sleeps after ~15 idle min, ~1 min to wake). Railway (trial credit, then ~$1/month credit, runs out when always on). Koyeb (free tier unclear for new accounts in 2026).
- **Database:** Neon free plan (1 GB storage per project, no card, compute sleeps when idle). Render's free Postgres expires after 30 days, so it's not an option for data.

**Trade-offs:** Render's cold start would make the first message after a quiet spell slow. Mitigation: the form pings `GET /health` when the page loads, so the API is waking while the visitor types. A paid always-on instance is the fix if it still feels slow.

**Decision:** Web on Vercel, API on Render (free), database on Neon (free). Daniel creates the accounts.

**Result (2026-11-27):** All three live, all in Singapore except Vercel's global CDN. Site at `danielbbenito.vercel.app` (the first generated domain redirects there); API at `portfolio-api-m8my.onrender.com`. Render's first deploy took 1 min 21 s; the API connected to Neon and ran the migration on startup. Checked from outside: both pages 200, `/health` ok, an empty body gets 400, and CORS allows only the site's domain. The database driver warned that `sslmode=require` will mean weaker checks in its next major version; the fix is `sslmode=verify-full` in `DATABASE_URL`. Every merge to `main` redeploys both apps automatically.

---

## 2026-11-27 — Email alert for new messages

**Problem:** Messages were stored but nothing told me they'd arrived.

**Options:**
1. Resend (email API; free plan 100 emails/day; its shared test sender can email the account's own address with no domain setup).
2. Gmail SMTP with an app password (no new account, but needs Google 2FA, an SMTP library, and a Google password stored on the host).
3. A daily check of the database (no setup, but easy to forget; slow replies).

**Trade-offs:** Resend is one HTTP call with `fetch`, no extra library, and the key can be revoked without touching my Google account. The test sender only emails me, which is all this needs. A custom domain would be needed to email anyone else.

**Decision:** Resend. The alert is sent after the message is saved and never fails the request: if email is down, the message is still in the database. Reply-to is the visitor's address, so replying answers them directly.

**Result:** _to fill in after the first real alert arrives._

---

## 2026-11-27 — Analytics: one wrapper, two tools, consent only where needed

**Problem:** The site should show which projects people read and whether they get in touch, using PostHog and GA4 (both named in the target role), without a cookie wall in front of a portfolio.

**Options:**
1. Both tools with cookies, behind a consent banner that blocks both until accepted.
2. PostHog cookieless (memory persistence) for everyone; GA4 only after consent.
3. No consent banner, GA4 in "consent mode" sending cookieless pings by default.

**Trade-offs:** Option 1 loses most data (many people ignore banners) and puts a banner on every first visit. Option 3's cookieless pings only become usable data at traffic levels a portfolio won't reach, and the legal position is unclear. Option 2 keeps PostHog's funnels working for every visitor (each visit counts on its own, so no returning-visitor counts) and asks only about GA, which is the tool that sets cookies.

**Decision:** Option 2. A single `track(event, props)` with a typed event schema (`apps/web/src/lib/analytics.ts`, documented in `docs/analytics.md`) sends to both. Analytics starts in `instrumentation-client.ts`, which runs before the page becomes interactive. Both tools switch off cleanly when their env vars are missing, so local dev and previews send nothing.

**Result:** Checked locally with dummy IDs: the consent bar appears; "Allow" loads GA and sets `_ga` cookies; clicking the case-study link pushed `case_study_opened` to GA and attempted a PostHog send; PostHog stored nothing in cookies or localStorage. Live numbers: _to fill in once real traffic arrives._
