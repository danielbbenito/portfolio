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
