# The Clearance Geeks — Waste Removals

Next.js (App Router, TypeScript, Tailwind) marketing site for **The Clearance Geeks** across Greater Manchester.

## Develop

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run check:forbidden
npm run check:similarity
npm run build
npm run test:e2e
```

## Configuration

- Company placeholders: `src/lib/company.ts`
- Production indexing: `VERCEL_ENV=production` (see `src/app/robots.ts` and `src/app/sitemap.ts`)
- Logo slot: replace `public/logo-clearance-geeks.svg` with final artwork

## Deploy

Deploy to Vercel; set `NEXT_PUBLIC_SITE_URL` to the live domain.
