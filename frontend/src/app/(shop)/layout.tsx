import Header from '@/components/shop/Header';
import Footer from '@/components/shop/Footer';
import '../globals.css';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
