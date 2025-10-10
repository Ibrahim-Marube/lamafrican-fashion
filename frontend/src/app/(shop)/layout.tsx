import Navbar from '@/components/Navbar';
import Footer from '@/components/shop/Footer';
import '../globals.css';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-16">{children}</main>
      <Footer />
    </div>
  );
}
