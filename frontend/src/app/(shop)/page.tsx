'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

// Category thumbnails with ALL gallery images for rotation
const categories = [
  { 
    id: 1, 
    name: 'Accessories - Sun Hats', 
    slug: 'sun-hats',
    images: [
      '/images/products/sun-hats/sun1.JPG',
      '/images/products/sun-hats/sun2.JPG',
      '/images/products/sun-hats/sun3.JPG',
      '/images/products/sun-hats/sun4.JPG',
      '/images/products/sun-hats/sun5.JPG',
      '/images/products/sun-hats/sun6.JPG',
    ],
  },
  { 
    id: 2, 
    name: 'African Men Shirts', 
    slug: 'men-shirts',
    images: Array.from({ length: 13 }, (_, i) => `/images/products/men-shirts/men-shirt-${i + 1}.jpg`),
  },
  { 
    id: 3, 
    name: 'Ankara Bomber Jackets', 
    slug: 'bomber-jackets',
    images: Array.from({ length: 30 }, (_, i) => `/images/products/bomber-jackets/bomber${i + 1}.jpg`),
  },
  { 
    id: 4, 
    name: 'Ankara Kitenge Prints', 
    slug: 'kitenge-prints',
    images: Array.from({ length: 31 }, (_, i) => `/images/products/kitenge-prints/ankaraprint${i + 1}.jpeg`),
  },
  { 
    id: 5, 
    name: 'Ankara Ladies Tops', 
    slug: 'ladies-tops',
    images: Array.from({ length: 19 }, (_, i) => `/images/products/ladies-tops/top${i + 1}.jpg`),
  },
  { 
    id: 6, 
    name: 'Ankara Maxi Dress', 
    slug: 'maxi-dress',
    images: Array.from({ length: 25 }, (_, i) => `/images/products/maxi-dress/maxi${i + 1}.jpg`),
  },
  { 
    id: 7, 
    name: 'Ankara Patched Dresses', 
    slug: 'patched-dresses',
    images: ['/images/products/patched-dresses/pdress1.jpg'],
  },
  { 
    id: 8, 
    name: 'Ankara Patched Hoodies', 
    slug: 'patched-hoodies',
    images: ['/images/products/patched-hoodies/hoodie1.jpg'],
  },
  { 
    id: 9, 
    name: 'Ankara Patched Snoodies', 
    slug: 'patched-snoodies',
    images: ['/images/products/patched-snoodies/snoody1.jpg'],
  },
  { 
    id: 10, 
    name: 'Ankara Skarters', 
    slug: 'skarters',
    images: ['/images/products/skarters/skarter1.jpg'],
  },
  { 
    id: 11, 
    name: 'Blazers', 
    slug: 'blazers',
    images: ['/images/products/blazers/blazer1.jpg'],
  },
  { 
    id: 12, 
    name: 'Bridesmaids Dresses', 
    slug: 'bridesmaids',
    images: ['/images/products/bridesmaids/bride1.jpg'],
  },
  { 
    id: 13, 
    name: 'Free Ankara Dresses', 
    slug: 'free-ankara',
    images: ['/images/products/free-ankara/free1.jpg'],
  },
  { 
    id: 14, 
    name: 'His and Hers', 
    slug: 'his-hers',
    images: ['/images/products/his-hers/couple1.jpg'],
  },
  { 
    id: 15, 
    name: 'Ladies Top and Skirt', 
    slug: 'top-skirt',
    images: ['/images/products/top-skirt/topskirt1.jpg'],
  },
  { 
    id: 16, 
    name: 'Men Ankara Patched T-shirts', 
    slug: 'patched-tshirts',
    images: ['/images/products/patched-tshirts/tshirt1.jpg'],
  },
  { 
    id: 17, 
    name: 'Men Senator Suits', 
    slug: 'senator-suits',
    images: ['/images/products/senator-suits/senator1.jpg'],
  },
  { 
    id: 18, 
    name: 'Smookie Thread Dress', 
    slug: 'smookie',
    images: ['/images/products/smookie/smookie1.jpg'],
  },
  { 
    id: 19, 
    name: 'Traditional Wedding Dresses', 
    slug: 'traditional-wedding',
    images: ['/images/products/traditional-wedding/wedding1.jpg'],
  },
];

// Category Card Component with Apple-Style Crossfade Animation
function CategoryCard({ category, index }: { category: any; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (category.images.length <= 1) return;

    // Change image every 2 seconds with smooth crossfade
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % category.images.length);
        setIsTransitioning(false);
      }, 300);
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, [category.images.length]);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-72 bg-gray-100 overflow-hidden">
        {/* Current Image with Crossfade */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={category.images[currentImageIndex]}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image Counter Badge */}
        {category.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {currentImageIndex + 1} / {category.images.length}
          </div>
        )}

        {/* Apple-style Indicator Dots */}
        {category.images.length > 1 && category.images.length <= 10 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {category.images.map((_: string, idx: number) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex 
                    ? 'w-6 bg-white' 
                    : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#2C5326] transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{category.images.length}+ Items Available</p>
        <div className="flex items-center text-[#2C5326] font-medium group-hover:gap-3 transition-all">
          View Collection <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-6 leading-tight">
            Welcome to<br />
            <span className="text-[#2C5326]">Lamafrican Fashion</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Life isn't perfect but your outfit can be
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Discover authentic African fashion. Handcrafted designs, premium fabrics, timeless style.
          </p>
          
          {/* Call to Action Button - Centered */}
          <div className="flex justify-center">
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center gap-2 bg-[#2C5326] text-white px-10 py-5 rounded-full hover:bg-[#234219] transition-all duration-300 font-semibold text-xl hover:scale-105 transform shadow-lg"
            >
              <ShoppingBag className="w-6 h-6" />
              Shop All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-6 fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Explore our curated collections of African fashion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <CategoryCard key={category.id} category={category} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20 px-6 bg-gray-50 fade-in">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-12 text-gray-900">
            Easy & Secure Payment
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-semibold mb-3">M-Pesa Payment</h3>
              <p className="text-gray-600 mb-4">
                Fast, secure mobile money payments. Pay directly from your phone.
              </p>
              <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                Instant Processing
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-2xl font-semibold mb-3">Card Payment</h3>
              <p className="text-gray-600 mb-4">
                Pay with Visa, Mastercard, or any major credit/debit card.
              </p>
              <div className="flex gap-2">
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  Visa
                </div>
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  Mastercard
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
