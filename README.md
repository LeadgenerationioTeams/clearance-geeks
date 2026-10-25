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

### Home hero variant

The default home page uses the dark full-bleed hero. An alternate **light van** hero (white layout, box-side photo) is available:

| Context | How to enable |
| --- | --- |
| Vercel preview on branch `cursor/cg-light-van-hero-2b91` | Automatic (uses `VERCEL_GIT_COMMIT_REF`) |
| Other deployments / local dev | `NEXT_PUBLIC_HOME_HERO=light-van` at build time |
| Restore dark hero | `NEXT_PUBLIC_HOME_HERO=default` |

Implementation: `src/lib/home-hero.ts`, `HomeHeroSection`, `HomeHeroLightVan`. Regenerate box-side assets with `npm run brand:light-van`.

## Deploy

Deploy to Vercel; set `NEXT_PUBLIC_SITE_URL` to the live domain.
