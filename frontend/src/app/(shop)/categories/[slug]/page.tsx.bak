'use client';

import { useState, useRef, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import generatedCategoriesData from '@/data/generated-categories.json';

const generatedCategories: any = generatedCategoriesData;

const categoriesData = Object.values(generatedCategories).map((cat: any) => ({
  slug: cat.slug,
  name: cat.name,
  price: cat.price,
  images: cat.images.map((img: any) => img.image)
}));

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const category = categoriesData.find(c => c.slug === slug);
  const otherCategories = categoriesData.filter(c => c.slug !== slug).slice(0, 8);

  if (!category) {
    return (
      <main className="min-h-screen pt-8 pb-16 px-6 bg-white">
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
    <main className="min-h-screen pt-8 pb-16 px-6 bg-white">
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
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {category.images.length}
                  </div>
                </>
              )}
            </div>

            {category.images.length > 1 && (
              <div className="relative">
                {category.images.length > 1 && (
                  <button
                    onClick={() => scrollThumbnails('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div
                  ref={thumbnailRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {category.images.map((img: string, idx: number) => (
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
                {category.images.length > 1 && (
                  <button
                    onClick={() => scrollThumbnails('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-3xl font-bold text-[#2C5326] mb-6">KSh {category.price.toLocaleString()}</p>
            <p className="text-gray-600 mb-8">Authentic African fashion. Handcrafted with premium fabrics. Choose from {category.images.length} available designs.</p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#2C5326] transition-all"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#2C5326] transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-[#2C5326] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-[#1f3d1a] transition-all">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - KSh {(category.price * quantity).toLocaleString()}
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Explore More Categories</h2>
            <Link href="/" className="text-[#2C5326] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {otherCategories.map((cat) => (
              <Link key={cat.slug} href={`/categories/${cat.slug}`} className="group">
                <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={cat.images[0]}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#2C5326] transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-600">From KSh {cat.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
