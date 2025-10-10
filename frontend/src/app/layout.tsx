export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};
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
    <html lang="en" className="h-full">
      <body className="h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
