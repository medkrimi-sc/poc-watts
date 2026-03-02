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

## Build & deploy (Vercel)

- **Build:** `npm run build` → static export in `out/`
- **Deploy:** Push to GitHub and connect the repo in [Vercel](https://vercel.com); or run `npx vercel` in this folder.

Vercel will detect Next.js and use the static export automatically.
