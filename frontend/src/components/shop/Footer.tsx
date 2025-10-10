'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Mail, Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

// Helpers: sanitize numbers for tel:/wa links and clean display text
const tel = (v: string) => (v || '').replace(/[^+\d]/g, '');
const show = (v: string) => (v || '').replace(/[#]/g, '');

export default function Footer() {
  const phone = CONTACT_INFO?.phone ?? '';
  const altPhone = CONTACT_INFO?.alternatePhone ?? '';
  const whatsapp = CONTACT_INFO?.whatsapp ?? '';
  const email = CONTACT_INFO?.email ?? '';
  const instagram = CONTACT_INFO?.instagram ?? '#';
  const facebook = CONTACT_INFO?.facebook ?? '#';
  const tiktok = CONTACT_INFO?.tiktok ?? '#';

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          <div>
            <Image
              src="/logo@2x.png"
              alt="Lamafrican Fashion"
              width={180}
              height={50}
              className="h-10 sm:h-12 w-auto mb-4 sm:mb-6 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
              Authentic African fashion. Handcrafted designs, premium fabrics, timeless style.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-all" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/custom-order" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Custom Order</Link></li>
              <li><Link href="/lookbook" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Look Book</Link></li>
              <li><Link href="/contact" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Categories</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/categories/maxi-dress" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Maxi Dresses</Link></li>
              <li><Link href="/categories/bomber-jackets" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Bomber Jackets</Link></li>
              <li><Link href="/categories/men-shirts" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Men Shirts</Link></li>
              <li><Link href="/categories/ladies-tops" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Ladies Tops</Link></li>
              <li><Link href="/categories/sun-hats" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Sun Hats</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="break-all">{email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${tel(phone)}`} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  {show(phone)}
                </a>
              </li>
              <li>
                <a href={`tel:${tel(altPhone)}`} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  {show(altPhone)}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${tel(whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-green-400 hover:text-green-300 transition-colors font-semibold"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  WhatsApp Orders
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Lamafrican Fashion. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
