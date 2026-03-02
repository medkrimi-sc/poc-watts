const fs = require('fs');
const path = require('path');

// Base URL = production/root domain (not deployment-specific). See https://vercel.com/docs/projects/environment-variables/system-environment-variables
const custom = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim(); // e.g. watts-shop.vercel.app (always the root domain)
const vercelUrl = process.env.VERCEL_URL?.trim(); // fallback: deployment URL
const port = process.env.PORT || 3000;
const normalize = (host) => `https://${host.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;
const baseUrl =
  custom ||
  (productionUrl ? normalize(productionUrl) : null) ||
  (process.env.VERCEL && vercelUrl ? normalize(vercelUrl) : null) ||
  `http://localhost:${port}`;

const productsPath = path.join(process.cwd(), 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const urls = [
  { loc: baseUrl + '/', priority: '1', changefreq: 'weekly' },
  ...products.map((p) => ({
    loc: `${baseUrl}/products/${p.slug}/`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
];

const lastmod = new Date().toISOString();
const urlEntries = urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log('Generated public/sitemap.xml');
