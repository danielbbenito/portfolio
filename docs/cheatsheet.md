# Cheat sheet

My reference while building this site. Using it is fine; it's mine.

**Rule:** each entry starts as a draft from Claude (marked ✎). I rewrite it in my own words once I've used the idea, and remove the ✎. A rewritten entry beats a correct one I don't understand.

---

## Core ideas (the ones worth really knowing)

### A component is a function that returns UI ✎
```tsx
export default function Home() {
  return <h1>Daniel B. Benito</h1>;
}
```
- Unity: like a prefab, but written as code. Small ones combine into bigger ones.
- `export default` = "this is the main thing this file offers".

### A folder in `app/` becomes a page URL ✎
| File | URL |
|---|---|
| `src/app/page.tsx` | `/` |
| `src/app/voidauto/page.tsx` | `/voidauto` |
- Unity: like scenes, where the folder structure is the list of scenes.
- `layout.tsx` wraps every page (header, fonts), like a persistent canvas.

---

## Reading a tag ✎
```tsx
<h1 className="text-3xl font-semibold">   ← opening tag + styling
  Daniel B. Benito                         ← content: what shows on screen
</h1>                                      ← closing tag
```
- `className` holds Tailwind classes: small styling words (`text-3xl` = big text).

---

## Commands I use (run from the repo root)

| I want to… | Command |
|---|---|
| install everything | `npm install` |
| run the site while editing | `npm run dev:web` → open http://localhost:3000 |
| check for mistakes | `npm run lint:web` |
| make the production version | `npm run build:web` |
| run the API while editing | `npm run dev:api` → http://localhost:3001 |
| run the API's tests | `npm run test:api` |
| see what changed | `git status` |
| see history | `git log --oneline` |

- **Dev vs build:** dev = Play mode (updates live as I save). Build = player build (optimised, what visitors get).

---

## Words that come up

| Word | Plain meaning | Unity-ish comparison |
|---|---|---|
| repo | a folder git tracks the history of | project under version control |
| commit | a saved snapshot + message | changeset |
| branch | a line of work, separate until merged | branch in Unity Version Control |
| monorepo | one repo holding several apps | one solution, several assemblies |
| package.json | an app's manifest: name, dependencies, scripts | `Packages/manifest.json` |
| lockfile | exact versions of everything installed | pinned package versions |
| .gitignore | files git never tracks | ignoring `Library/`, `Temp/` |
