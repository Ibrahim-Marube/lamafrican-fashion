'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const lookbookImages = [
  { id: 1, src: '/images/lookbook/look1.jpg', title: 'Ankara Elegance', category: 'Maxi Dress' },
  { id: 2, src: '/images/lookbook/look2.jpg', title: 'Bold Patterns', category: 'Bomber Jacket' },
  { id: 3, src: '/images/lookbook/look3.jpg', title: 'Traditional Grace', category: 'Wedding Dress' },
  { id: 4, src: '/images/lookbook/look4.jpg', title: 'Modern Fusion', category: 'Ladies Top' },
  { id: 5, src: '/images/lookbook/look5.jpg', title: 'Statement Style', category: 'Men Shirt' },
  { id: 6, src: '/images/lookbook/look6.jpg', title: 'Vibrant Collection', category: 'Skarter' },
];

export default function LookbookPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5326] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#2C5326]/10 text-[#2C5326] rounded-full text-sm font-medium mb-6 tracking-wide">
            LOOKBOOK 2025
          </span>
          <h1 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}>
            Our Latest Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-normal" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}>
            Explore our curated selection of African-inspired fashion. Each piece tells a story of tradition, craftsmanship, and contemporary elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lookbookImages.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium mb-1 opacity-90">{item.category}</p>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
              </div>

              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-sm mb-2">{item.category}</p>
                  <p className="text-xs">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-[#2C5326] to-[#3d6e33] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-normal mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}>
            Love What You See?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get your own custom piece tailored to perfection. Our artisans are ready to bring your vision to life.
          </p>
          <Link
            href="/custom-order"
            className="inline-block bg-white text-[#2C5326] px-10 py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-2xl"
          >
            Order Custom Design
          </Link>
        </div>
      </div>
    </main>
  );
}
