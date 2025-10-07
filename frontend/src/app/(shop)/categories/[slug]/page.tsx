'use client';

import { useState, useRef, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

const categoriesData = [
  { slug: 'sun-hats', name: 'Accessories - Sun Hats', price: 2500, images: Array.from({ length: 6 }, (_, i) => `/images/products/sun-hats/sun${i + 1}.JPG`) },
  { slug: 'men-shirts', name: 'African Men Shirts', price: 6500, images: Array.from({ length: 13 }, (_, i) => `/images/products/men-shirts/men-shirt-${i + 1}.jpg`) },
  { slug: 'bomber-jackets', name: 'Ankara Bomber Jackets', price: 11500, images: Array.from({ length: 30 }, (_, i) => `/images/products/bomber-jackets/bomber${i + 1}.jpg`) },
  { slug: 'kitenge-prints', name: 'Ankara Kitenge Prints', price: 3500, images: Array.from({ length: 31 }, (_, i) => `/images/products/kitenge-prints/ankaraprint${i + 1}.jpeg`) },
  { slug: 'ladies-tops', name: 'Ankara Ladies Tops', price: 5500, images: Array.from({ length: 9 }, (_, i) => `/images/products/ladies-tops/top${i + 1}.jpg`) },
  { slug: 'maxi-dress', name: 'Ankara Maxi Dress', price: 8500, images: Array.from({ length: 25 }, (_, i) => `/images/products/maxi-dress/maxi${i + 1}.jpg`) },
  { slug: 'patched-dresses', name: 'Ankara Patched Dresses', price: 7500, images: Array.from({ length: 16 }, (_, i) => `/images/products/patched-dresses/pdress${i + 1}.jpg`) },
  { slug: 'patched-hoodies', name: 'Ankara Patched Hoodies', price: 6500, images: Array.from({ length: 12 }, (_, i) => `/images/products/patched-hoodies/hoodie${i + 1}.jpg`) },
  { slug: 'patched-snoodies', name: 'Ankara Patched Snoodies', price: 5500, images: Array.from({ length: 10 }, (_, i) => `/images/products/patched-snoodies/snoody${i + 1}.jpg`) },
  { slug: 'skarters', name: 'Ankara Skarters', price: 6000, images: Array.from({ length: 9 }, (_, i) => `/images/products/skarters/skarter${i + 1}.jpg`) },
  { slug: 'blazers', name: 'Blazers', price: 12000, images: Array.from({ length: 7 }, (_, i) => `/images/products/blazers/blazer${i + 1}.jpg`) },
  { slug: 'bridesmaids', name: 'Bridesmaids Dresses', price: 9500, images: Array.from({ length: 7 }, (_, i) => `/images/products/bridesmaids/bridesmaid${i + 1}.jpg`) },
  { slug: 'free-ankara', name: 'Free Ankara Dresses', price: 7000, images: Array.from({ length: 6 }, (_, i) => `/images/products/free-ankara/free${i + 1}.jpg`) },
  // { slug: 'his-hers', name: 'His and Hers', price: 15000, images: Array.from({ length: 4 }, (_, i) => `/images/products/his-hers/hh${i + 1}.jpg`) },
  { slug: 'top-skirt', name: 'Ladies Top and Skirt', price: 8500, images: Array.from({ length: 8 }, (_, i) => `/images/products/top-skirt/topskirt${i + 1}.jpg`) },
  // { slug: 'patched-tshirts', name: 'Men Ankara Patched T-shirts', price: 4500, images: Array.from({ length: 4 }, (_, i) => `/images/products/patched-tshirts/ptshirt${i + 1}.jpg`) },
  { slug: 'senator-suits', name: 'Men Senator Suits', price: 18000, images: Array.from({ length: 9 }, (_, i) => `/images/products/senator-suits/senator${i + 1}.jpg`) },
  { slug: 'smookie', name: 'Smookie Thread Dress', price: 7500, images: Array.from({ length: 6 }, (_, i) => `/images/products/smookie/smookie${i + 1}.jpg`) },
  { slug: 'traditional-wedding', name: 'Traditional Wedding Dresses', price: 25000, images: Array.from({ length: 8 }, (_, i) => `/images/products/traditional-wedding/wedding${i + 1}.jpg`) },
];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const category = categoriesData.find(c => c.slug === slug);
  const otherCategories = categoriesData.filter(c => c.slug !== slug).slice(0, 8);

  if (!category) {
    return (
      <main className="min-h-screen pt-28 pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/" className="text-[#2C5326] font-semibold hover:underline">Return Home</Link>
        </div>
      </main>
    );
  }

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'd like to order:\n\n${category.name}\nQuantity: ${quantity}\nPrice: KSh ${(category.price * quantity).toLocaleString()}\n\nProduct Link: ${window.location.href}`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % category.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + category.images.length) % category.images.length);

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailRef.current) {
      const scrollAmount = 200;
      thumbnailRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#2C5326] font-semibold hover:gap-3 transition-all mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="relative aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden mb-6">
              <Image
                src={category.images[currentImageIndex]}
                alt={category.name}
                fill
                className="object-cover"
                priority
              />
              {category.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {currentImageIndex + 1} / {category.images.length}
                  </div>
                </>
              )}
            </div>

            {category.images.length > 1 && (
              <div className="relative">
                {category.images.length > 6 && (
                  <button
                    onClick={() => scrollThumbnails('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-900" />
                  </button>
                )}
                
                <div
                  ref={thumbnailRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {category.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex ? 'border-[#2C5326] scale-95' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <Image src={img} alt={`${category.name} ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>

                {category.images.length > 6 && (
                  <button
                    onClick={() => scrollThumbnails('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-900" />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-3xl font-bold text-gray-900 mb-6">KSh {category.price.toLocaleString()}</p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Authentic African fashion. Handcrafted with premium fabrics. Choose from {category.images.length} available design{category.images.length > 1 ? 's' : ''}.
            </p>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-xl transition-all"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-xl transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-[#2C5326] text-white py-4 rounded-full font-bold text-lg hover:bg-[#234219] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - KSh {(category.price * quantity).toLocaleString()}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 text-white py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>

        {otherCategories.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Explore More Categories</h2>
              <Link href="/" className="text-[#2C5326] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                View All <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {otherCategories.map((cat) => (
                <Link key={cat.slug} href={`/categories/${cat.slug}`} className="group">
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                    <Image src={cat.images[0]} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#2C5326] transition-colors line-clamp-2 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">KSh {cat.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
