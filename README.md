# Portfolio

Portfolio site of Daniel B. Benito, a Unity/C# systems developer moving into full-stack product engineering.

## Structure

```
apps/
  web/   Next.js + TypeScript front end (hosted on Vercel)
  api/   NestJS + TypeScript API: POST /contact
docs/
  decisions.md        why things are the way they are
  interview-notes.md  what I can explain, and what I can't yet
```

This is a monorepo using **npm workspaces**: one `npm install` at the root installs every app's dependencies.

_Setup and run instructions will be added as the apps are scaffolded._
