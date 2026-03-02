import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/products';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main>
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/">← Back to products</Link>
      </p>
      <article>
        {product.thumbnail && (
          <img
            src={product.thumbnail}
            alt=""
            width={320}
            height={320}
            style={{ objectFit: 'cover', borderRadius: 4, marginBottom: '1rem' }}
          />
        )}
        <h1>{product.name}</h1>
        <p style={{ color: '#666', marginBottom: '1rem' }}>{product.title}</p>
        <section>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</h2>
          <p>{LOREM}</p>
        </section>
      </article>
    </main>
  );
}
