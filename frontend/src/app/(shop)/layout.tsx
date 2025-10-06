import Navbar from '@/components/Navbar';
import Footer from '@/components/shop/Footer';
import '../globals.css';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-20 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
