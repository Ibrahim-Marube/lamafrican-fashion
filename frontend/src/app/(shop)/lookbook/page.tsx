'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// All available product images
const ALL_IMAGES = [
  '/images/products/patched-tshirts/ptshirt1.jpg',
  '/images/products/patched-tshirts/ptshirt2.jpg',
  '/images/products/patched-tshirts/ptshirt3.jpg',
  '/images/products/patched-tshirts/ptshirt4.jpg',
  '/images/products/free-ankara/free1.jpg',
  '/images/products/free-ankara/free2.jpg',
  '/images/products/free-ankara/free3.jpg',
  '/images/products/free-ankara/free4.jpg',
  '/images/products/free-ankara/free5.jpg',
  '/images/products/free-ankara/free6.jpg',
  '/images/products/free-ankara/free7.jpg',
  '/images/products/free-ankara/free8.jpg',
  '/images/products/free-ankara/free9.jpg',
  '/images/products/patched-hoodies/hoodie1.jpg',
  '/images/products/patched-hoodies/hoodie2.jpg',
  '/images/products/patched-hoodies/hoodie3.jpg',
  '/images/products/patched-hoodies/hoodie4.jpg',
  '/images/products/smookie/smookie1.jpg',
  '/images/products/smookie/smookie2.jpg',
  '/images/products/smookie/smookie3.jpg',
  '/images/products/smookie/smookie4.jpg',
  '/images/products/smookie/smookie5.jpg',
  '/images/products/smookie/smookie6.jpg',
  '/images/products/smookie/smookie7.jpg',
  '/images/products/smookie/smookie10.jpg',
  '/images/products/smookie/smookie11.jpg',
  '/images/products/smookie/smookie12.jpg',
  '/images/products/smookie/smookie13.jpg',
  '/images/products/smookie/smookie14.jpg',
];

// Shuffle images based on day of year (changes daily)
function getDailyImages() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Seed random with day of year
  let seed = dayOfYear;
  const shuffled = [...ALL_IMAGES].sort(() => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x) - 0.5;
  });
  
  return shuffled.slice(0, 24);
}

export default function LookBookPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setImages(getDailyImages());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
            Look Book
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            Today&apos;s curated collection of African-inspired fashion
          </p>
        </div>
      </div>

      {/* Gallery Grid - Apple Style */}
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group bg-gray-100"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Look ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Daily Refresh Note */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Our collection refreshes daily with new inspirations</p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-4xl font-light hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative w-full max-w-5xl aspect-square">
            <Image
              src={selectedImage}
              alt="Look preview"
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
