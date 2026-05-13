# Plant facts

A small React + Vite app: plant search, kid-friendly Wikipedia summaries, examples, and topic pages.

## Publish on Vercel

1. Push this repo to GitHub (if it is not already).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repository.
3. Vercel should detect **Vite**. Defaults:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm ci` (set in `vercel.json`)
4. Click **Deploy**. You get a `*.vercel.app` URL.

`vercel.json` includes SPA routing, long cache for `/assets/*`, and basic security headers.

### CLI (optional)

```bash
npm install
npm run build
npx vercel@latest login
npm run deploy:vercel
```

Requires a GitHub account with access to the repo, or deploy from a machine logged in as the repo owner.

### Requirements

- **Node** 20+ (see `package.json` → `engines`)

No API keys are required; Wikipedia calls run in the browser.

## Local dev

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).
