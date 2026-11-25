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
