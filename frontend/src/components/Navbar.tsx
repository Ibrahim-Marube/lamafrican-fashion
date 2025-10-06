'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* LOGO - Larger Size */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image 
              src="/logo@2x.png" 
              alt="Lamafrican Fashion" 
              width={180} 
              height={50} 
              priority 
              className="h-12 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#2C5326] transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-[#2C5326] transition-colors">
              Shop
            </Link>
            <Link href="/custom" className="text-sm font-medium text-gray-700 hover:text-[#2C5326] transition-colors">
              Custom Order
            </Link>
            <Link href="/lookbook" className="text-sm font-medium text-gray-700 hover:text-[#2C5326] transition-colors">
              Look Book
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-[#2C5326] transition-colors">
              Contact
            </Link>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-5">
            {/* User Icon */}
            <Link 
              href="/auth/login" 
              className="hidden md:flex text-gray-700 hover:text-[#2C5326] transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart with Badge */}
            <Link 
              href="/cart" 
              className="relative text-gray-700 hover:text-[#2C5326] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2C5326] text-white text-xs font-bold rounded-full w-5 h-5 grid place-items-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            <Link 
              href="/" 
              className="block text-sm font-medium text-gray-700 hover:text-[#2C5326] py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block text-sm font-medium text-gray-700 hover:text-[#2C5326] py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/custom" 
              className="block text-sm font-medium text-gray-700 hover:text-[#2C5326] py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Order
            </Link>
            <Link 
              href="/lookbook" 
              className="block text-sm font-medium text-gray-700 hover:text-[#2C5326] py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Look Book
            </Link>
            <Link 
              href="/contact" 
              className="block text-sm font-medium text-gray-700 hover:text-[#2C5326] py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/auth/login" 
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#2C5326] py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-4 h-4" />
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
