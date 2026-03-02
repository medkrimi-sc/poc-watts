import productsData from '@/data/products.json';

export interface Product {
  slug: string;
  title: string;
  name: string;
  link: string;
  thumbnail: string;
}

const products = productsData as Product[];

export function getProducts(): Product[] {
  return Array.isArray(products) ? products : [];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}
