const fs = require('fs');
const path = require('path');

// Use deployment URL: custom domain, then Vercel URL (set at build on Vercel), never example.com in production
const vercelUrl =
  process.env.VERCEL_URL && process.env.VERCEL_URL.trim()
    ? `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
    : '';
const baseUrl =
  (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim()) ||
  vercelUrl ||
  'https://example.com';

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
