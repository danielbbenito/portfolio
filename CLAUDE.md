# CLAUDE.md — Daniel B. Benito Portfolio

Read this at the start of every session. The full context lives in the claude.ai project "New Portfolio Website" (docs: status-and-decision-log, full-stack-learning-brief, projects-context, target-role, about-me-and-goals). Where this file and those docs disagree, the status-and-decision-log wins.

## What this is
A portfolio site for Daniel, a systems-oriented Unity/C# developer (nearly 5 years professional) expanding into full-stack product engineering. Built for a growth-focused, AI-native Full Stack Engineer application (Next.js, NestJS, PostgreSQL, AWS, GA4/PostHog). The site is both (1) a showcase of three Unity prototypes and (2) honest evidence of newly learned web skills.

## Working agreement
- Daniel is creative director/product owner; Claude is mentor + implementation partner.
- Daniel is a beginner at web dev. Teach concepts when first used: plain definition → Unity/C# comparison → why we need it → small example → use it. Short.
- Occasionally ask Daniel to write small snippets himself. Correct misconceptions before moving on.
- Pacing (added 2026-11-26, after Day 2 overload): at most 1–2 new concepts per step, introduced only when Daniel is about to touch them. Give exact step-by-step instructions (which file, which line, what before/after looks like). Daniel types the small changes; Claude does the bulk.
- Start each session with a 3-question warm-up on the previous session's core ideas.
- docs/cheatsheet.md is Daniel's reference; Claude drafts entries marked ✎, Daniel rewrites them in his own words. Looking things up is fine; interview goal is explaining the ~10 core ideas behind this project, not memorising.
- Per-slice routine: goal → concepts → files involved → implement → explain important code → how to run/test → verify → record metric → add interview knowledge.
- Small, logical commits with readable messages. Never one giant commit.
- Compiling ≠ done: run, screenshot, critique (hierarchy, spacing, alignment, type, crops, mobile), fix.
- Measure before optimizing. Never invent numbers.
- Never claim experience Daniel doesn't have. Never invent project details; the projects-context doc is the source of truth.
- Keep two lists in docs/interview-notes.md: "Things I Can Now Explain" (only once understood + used) and "Things I Used But Cannot Yet Explain" (must not silently grow).
- Log consequential decisions in docs/decisions.md (problem → options → trade-offs → decision → result).

## Architecture (decided 2026-11-25)
- **Monorepo**, one public GitHub repo (the only pinned repo):
  - `apps/web`: Next.js + TypeScript, hosted on Vercel.
  - `apps/api`: NestJS + TypeScript, one feature: `POST /contact` (DTO validation, spam protection, rate limiting, PostgreSQL persistence). Hosted separately (choose a current free/cheap host at setup; verify tiers then).
  - PostgreSQL: managed host chosen at setup.
- **Analytics:** one `track(event, props)` wrapper sends every event to PostHog (funnels, flags) and GA4 (page views + 2–3 key events). Event schema defined once, in code + docs.
- **Fallback:** if behind schedule on Day 3, replace NestJS with a Next.js route handler (log it).
- Out of scope for v1: CMS, blog, theme toggle, auth/admin, queues, AWS migration, making game repos public.

## Site map (v1)
- Home: intro → VoidAuto feature (in-game world-graph image dominant) → VoidFarm (compact) → Fatanis (compact) → "How this site was built" teaser → About & experience → Contact (form + juamibenito8@gmail.com + GitHub). No phone number.
- /voidauto: quick-facts header + video; 3 stories (World Graph tool; constrained encounter generation; automation + acceptance pipeline); lessons; "code available to walk through on request".
- /how-this-site-was-built: stack, decisions, event schema, before/after performance, AI-assisted workflow, AWS mapping.
- Résumé PDF download.

## Visual style (board C "Hybrid", canvas "Portfolio — Visual Direction Boards")
- Near-black #0A0B0D, bone text #ECE8DF, mute #8B909A, rules #262930; faint 48 px background grid.
- Archivo: condensed 900 uppercase for slanted section title blocks; regular for body. JetBrains Mono for labels, metadata and figure captions.
- One accent per project, used for its title block, rules and annotations: VoidAuto #E9B949 (gold), VoidFarm #3FD9B4 (teal-green), Fatanis #8C7BFF (violet).
- Leader-line annotations on key images; figure captions ("FIG 1 — …").
- Motion only at moments (title blocks wipe in, page transitions, hover/focus). Body still. Respect prefers-reduced-motion; animate transform/opacity only.
- Avoid: gradient blobs, neon, glassmorphism, cards everywhere, generic dark SaaS, fake terminals, skill bars, custom cursors, "passionate developer" copy.

## Media
Source folder: C:\Users\User\Desktop\NewPortfolio (originals; never edit in place). Known issues: VoidAuto captures show a capture-tools panel (accepted for v1); Fatanis shot has a debug overlay (crop); the summon-wave clip ends with ~5 s of OBS (trim); the 430 MB Fatanis recording needs trimming/compression.
