# Watts Shop Microsite

Minimal product microsite with PDP (Product Detail) pages, ready for Vercel.

## Data source

Product data is loaded from `data/products.json`, generated from the Excel file. To refresh data:

1. Extract the `.xlsx` as zip to `xlsx_extract/` (e.g. copy the file to `data.zip`, then unzip to `xlsx_extract`).
2. Run: `node scripts/extract-products.js`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sitemap

`/sitemap.xml` lists the homepage and all product PDP URLs. On Vercel it uses the **root production domain** (e.g. `https://watts-shop.vercel.app`) via `VERCEL_PROJECT_PRODUCTION_URL`. Enable *Automatically expose System Environment Variables* in your Vercel project (Settings → Environment Variables) so that variable is available. For a custom domain, set `NEXT_PUBLIC_SITE_URL` in Vercel.

## Build & deploy (Vercel)

- **Build:** `npm run build` → static export in `out/`
- **Deploy:** Push to GitHub and connect the repo in [Vercel](https://vercel.com); or run `npx vercel` in this folder.

Vercel will detect Next.js and use the static export automatically.
