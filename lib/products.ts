import fs from 'fs';
import path from 'path';

export interface Product {
  slug: string;
  title: string;
  name: string;
  link: string;
  thumbnail: string;
}

export function getProducts(): Product[] {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}
