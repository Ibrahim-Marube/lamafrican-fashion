'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';

export default function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* LOGO: put the file at public/logo.png */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <Image src="/logo.png" alt="Lamafrican Fashion" width={36} height={36} priority />
            <span className="font-semibold text-[15px] text-gray-900">Lamafrican Fashion</span>
          </Link>

          {/* QUICK MENU on the right */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/" className="text-sm text-gray-700 hover:text-[#2C5326]">Home</Link>
            <Link href="/products" className="text-sm text-gray-700 hover:text-[#2C5326]">Shop</Link>
            <Link href="/custom" className="text-sm text-gray-700 hover:text-[#2C5326]">Custom Order</Link>
            <Link href="/lookbook" className="text-sm text-gray-700 hover:text-[#2C5326]">Look Book</Link>
            <Link href="/contact" className="text-sm text-gray-700 hover:text-[#2C5326]">Contact</Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <Link href="/auth/login" className="text-gray-700 hover:text-[#2C5326]"><User className="w-5 h-5" /></Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-[#2C5326]">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2C5326] text-white text-xs font-bold rounded-full w-5 h-5 grid place-items-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
