import Link from 'next/link';
import { getProducts } from '@/lib/products';

export default function HomePage() {
  const products = getProducts();
  return (
    <main>
      <h1>Watts Shop</h1>
      <p style={{ marginBottom: '1.5rem' }}>Snow melting & floor heating products</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
        {products.map((p) => (
          <li key={p.slug}>
            <Link href={`/products/${p.slug}/`} style={{ display: 'block' }}>
              {p.thumbnail && (
                <img
                  src={p.thumbnail}
                  alt=""
                  width={180}
                  height={180}
                  style={{ objectFit: 'cover', borderRadius: 4, marginBottom: '0.5rem' }}
                />
              )}
              <strong>{p.name}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
