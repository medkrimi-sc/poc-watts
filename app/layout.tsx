import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Watts Shop',
  description: 'Snow melting & floor heating products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
