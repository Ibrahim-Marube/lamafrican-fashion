'use client';

import HeroSlider from '@/components/HeroSlider';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import generatedCategoriesData from '@/data/generated-categories.json';

const allProducts = [
  { id: 1, name: 'Ankara Maxi Dress - Royal Blue', price: 8500, image: '/images/products/maxi-dress/maxi1.jpg', category: 'Maxi Dress', badge: 'Trending' },
  { id: 2, name: 'Ankara Bomber Jacket - Sunset', price: 12000, image: '/images/products/bomber-jackets/bomber1.jpg', category: 'Bomber Jackets', badge: 'Featured' },
  { id: 3, name: 'African Men Shirt - Classic', price: 6500, image: '/images/products/men-shirts/men-shirt-1.jpg', category: 'Men Shirts', badge: 'Trending' },
  { id: 4, name: 'Ankara Ladies Top - Elegant', price: 5500, image: '/images/products/ladies-tops/top1.jpg', category: 'Ladies Tops', badge: 'Featured' },
  { id: 5, name: 'Sun Hat - Safari', price: 2500, image: '/images/products/sun-hats/sun1.JPG', category: 'Sun Hats', badge: 'Trending' },
  { id: 6, name: 'Ankara Maxi Dress - Emerald', price: 8800, image: '/images/products/maxi-dress/maxi2.jpg', category: 'Maxi Dress', badge: 'Featured' },
  { id: 7, name: 'Ankara Bomber Jacket - Urban', price: 11500, image: '/images/products/bomber-jackets/bomber2.jpg', category: 'Bomber Jackets', badge: 'Trending' },
  { id: 8, name: 'African Men Shirt - Premium', price: 7000, image: '/images/products/men-shirts/men-shirt-2.jpg', category: 'Men Shirts', badge: 'Featured' },
  { id: 9, name: 'Ankara Ladies Top - Chic', price: 5800, image: '/images/products/ladies-tops/top2.jpg', category: 'Ladies Tops', badge: 'Trending' },
  { id: 10, name: 'Ankara Maxi Dress - Golden', price: 9200, image: '/images/products/maxi-dress/maxi3.jpg', category: 'Maxi Dress', badge: 'Featured' },
  { id: 11, name: 'Ankara Bomber Jacket - Classic', price: 12500, image: '/images/products/bomber-jackets/bomber3.jpg', category: 'Bomber Jackets', badge: 'Trending' },
  { id: 12, name: 'Sun Hat - Beach', price: 2800, image: '/images/products/sun-hats/sun2.JPG', category: 'Sun Hats', badge: 'Featured' },
  { id: 13, name: 'African Men Shirt - Modern', price: 6800, image: '/images/products/men-shirts/men-shirt-3.jpg', category: 'Men Shirts', badge: 'Trending' },
  { id: 14, name: 'Ankara Ladies Top - Vibrant', price: 6000, image: '/images/products/ladies-tops/top3.jpg', category: 'Ladies Tops', badge: 'Featured' },
  { id: 15, name: 'Ankara Maxi Dress - Sunset', price: 8700, image: '/images/products/maxi-dress/maxi4.jpg', category: 'Maxi Dress', badge: 'Trending' },
  { id: 16, name: 'Ankara Bomber Jacket - Bold', price: 11800, image: '/images/products/bomber-jackets/bomber4.jpg', category: 'Bomber Jackets', badge: 'Featured' },
  { id: 17, name: 'Sun Hat - Garden', price: 2600, image: '/images/products/sun-hats/sun3.JPG', category: 'Sun Hats', badge: 'Trending' },
  { id: 18, name: 'African Men Shirt - Executive', price: 7200, image: '/images/products/men-shirts/men-shirt-4.jpg', category: 'Men Shirts', badge: 'Featured' },
  { id: 19, name: 'Ankara Ladies Top - Deluxe', price: 6200, image: '/images/products/ladies-tops/top4.jpg', category: 'Ladies Tops', badge: 'Trending' },
  { id: 20, name: 'Ankara Maxi Dress - Royal', price: 9500, image: '/images/products/maxi-dress/maxi5.jpg', category: 'Maxi Dress', badge: 'Featured' },
];

const trendingProducts = allProducts.filter(p => p.badge === 'Trending');
const featuredProducts = allProducts.filter(p => p.badge === 'Featured');

const generatedCategories: any = generatedCategoriesData;

const categories = Object.keys(generatedCategories).map((key, idx) => {
  const cat = generatedCategories[key];
  return {
    id: idx + 1,
    name: cat.name,
    slug: cat.slug,
    count: cat.count,
    images: cat.images?.map((img: any) => img.image) || [],
    price: cat.price
  };
}).filter(cat => cat.count > 0);

function CategoryCard({ category, index }: { category: any; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (category.images.length <= 1) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % category.images.length);
        setIsTransitioning(false);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, [category.images.length]);

  if (category.count === 0) return null;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 active:scale-95 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={category.images?.[currentImageIndex] || '/images/placeholder-category.jpg'}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={index < 4}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {category.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
            {currentImageIndex + 1} / {category.images.length}
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#2C5326] transition-colors leading-tight">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 sm:mb-4">{category.count} Items</p>
        <div className="flex items-center text-[#2C5326] font-medium group-hover:gap-3 transition-all text-sm sm:text-base">
          View Collection <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function ProductCard({ product }: { product: typeof allProducts[0] }) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="relative aspect-[3/4] bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1 ${
            product.badge === 'Trending' ? 'bg-orange-500/90 text-white' : 'bg-blue-500/90 text-white'
          }`}>
            {product.badge === 'Trending' ? <><TrendingUp className="w-3 h-3" /> Trending</> : <><Star className="w-3 h-3" /> Featured</>}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-semibold text-[#2C5326] uppercase tracking-wider">{product.category}</p>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#2C5326] transition-colors line-clamp-2 leading-tight">{product.name}</h3>
        <p className="text-base sm:text-lg font-bold text-gray-900">KSh {product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSlider />

      <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 px-4 sm:px-6 bg-gray-50 animate-slide-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight">Shop by Category</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">Explore our curated collections of African fashion</p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-6xl mx-auto mb-8 sm:mb-12">
              {categories.filter(cat => cat.count > 0).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="px-3 sm:px-5 py-2 sm:py-2.5 bg-white border-2 border-gray-200 rounded-full text-xs sm:text-sm font-semibold text-gray-700 hover:border-[#2C5326] hover:text-[#2C5326] hover:bg-[#2C5326]/5 transition-all active:scale-95"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, idx) => (
              <CategoryCard key={category.id} category={category} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-orange-50 to-white animate-fade-in-delay">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
              Trending Now
            </h2>
            <Link href="/products" className="text-[#2C5326] font-semibold flex items-center gap-2 hover:gap-3 transition-all active:scale-95 text-sm sm:text-base">
              View All <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {trendingProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="pt-12 pb-24 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white animate-fade-in-delay-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              Featured For You
            </h2>
            <Link href="/products" className="text-[#2C5326] font-semibold flex items-center gap-2 hover:gap-3 transition-all active:scale-95 text-sm sm:text-base">
              View All <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {featuredProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
