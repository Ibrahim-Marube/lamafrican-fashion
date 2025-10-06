'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Using logo@2x for all screens */}
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* Desktop: Large logo */}
            <Image
              src="/logo@2x.png"
              alt="Lamafrican Fashion"
              width={800}
              height={220}
              priority
              className="hidden lg:block h-16 w-auto hover:opacity-80 transition-opacity"
            />
            {/* Tablet: Medium logo */}
            <Image
              src="/logo@2x.png"
              alt="Lamafrican Fashion"
              width={800}
              height={220}
              priority
              className="hidden md:block lg:hidden h-14 w-auto hover:opacity-80 transition-opacity"
            />
            {/* Mobile: Smaller but crisp */}
            <Image
              src="/logo@2x.png"
              alt="Lamafrican Fashion"
              width={800}
              height={220}
              priority
              className="block md:hidden h-12 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-gray-700 hover:text-[#2C5326] transition-colors font-medium text-base">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-[#2C5326] transition-colors font-medium text-base">
              Shop
            </Link>
            <Link href="/custom" className="text-gray-700 hover:text-[#2C5326] transition-colors font-medium text-base">
              Custom Order
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#2C5326] transition-colors font-medium text-base">
              Contact
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-[#2C5326] text-white px-6 py-2.5 rounded-full hover:bg-[#234219] transition-all font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              Cart
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t pt-4">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-[#2C5326] transition-colors font-medium text-base py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block text-gray-700 hover:text-[#2C5326] transition-colors font-medium text-base py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/custom" 
              className="block text-gray-700 hover:text-[#2C5326] transition-colors font-medium text-base py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Order
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-700 hover:text-[#2C5326] transition-colors font-medium text-base py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 bg-[#2C5326] text-white px-6 py-2.5 rounded-full hover:bg-[#234219] transition-all font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="w-5 h-5" />
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
