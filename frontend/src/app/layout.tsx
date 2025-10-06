import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import './globals.css';

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
        <Navbar />
        <main className="pt-40">  {/* Increased from pt-20 to pt-24 */}
          {children}
        </main>
      </body>
    </html>
  );
}
