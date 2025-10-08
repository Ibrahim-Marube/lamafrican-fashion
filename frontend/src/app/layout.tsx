export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Lamafrican Fashion | Authentic African Fashion',
  description: 'Life isn\'t perfect but your outfit can be',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="pt-40">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
