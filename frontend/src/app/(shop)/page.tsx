'use client';

import HeroSlider from '@/components/HeroSlider';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

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

const categories = [
  { id: 1, name: 'Accessories - Sun Hats', slug: 'sun-hats', images: ['/images/products/sun-hats/sun1.JPG', '/images/products/sun-hats/sun2.JPG', '/images/products/sun-hats/sun3.JPG', '/images/products/sun-hats/sun4.JPG', '/images/products/sun-hats/sun5.JPG', '/images/products/sun-hats/sun6.JPG'] },
  { id: 2, name: 'African Men Shirts', slug: 'men-shirts', images: Array.from({ length: 13 }, (_, i) => `/images/products/men-shirts/men-shirt-${i + 1}.jpg`) },
  { id: 3, name: 'Ankara Bomber Jackets', slug: 'bomber-jackets', images: Array.from({ length: 30 }, (_, i) => `/images/products/bomber-jackets/bomber${i + 1}.jpg`) },
  { id: 4, name: 'Ankara Kitenge Prints', slug: 'kitenge-prints', images: Array.from({ length: 31 }, (_, i) => `/images/products/kitenge-prints/ankaraprint${i + 1}.jpeg`) },
  { id: 5, name: 'Ankara Ladies Tops', slug: 'ladies-tops', images: Array.from({ length: 19 }, (_, i) => `/images/products/ladies-tops/top${i + 1}.jpg`) },
  { id: 6, name: 'Ankara Maxi Dress', slug: 'maxi-dress', images: Array.from({ length: 25 }, (_, i) => `/images/products/maxi-dress/maxi${i + 1}.jpg`) },
  { id: 7, name: 'Ankara Patched Dresses', slug: 'patched-dresses', images: ['/images/products/patched-dresses/pdress1.jpg'] },
  { id: 8, name: 'Ankara Patched Hoodies', slug: 'patched-hoodies', images: ['/images/products/patched-hoodies/hoodie1.jpg'] },
  { id: 9, name: 'Ankara Patched Snoodies', slug: 'patched-snoodies', images: ['/images/products/patched-snoodies/snoody1.jpg'] },
  { id: 10, name: 'Ankara Skarters', slug: 'skarters', images: ['/images/products/skarters/skarter1.jpg'] },
  { id: 11, name: 'Blazers', slug: 'blazers', images: ['/images/products/blazers/blazer1.jpg'] },
  { id: 12, name: 'Bridesmaids Dresses', slug: 'bridesmaids', images: ['/images/products/bridesmaids/bride1.jpg'] },
  { id: 13, name: 'Free Ankara Dresses', slug: 'free-ankara', images: ['/images/products/free-ankara/free1.jpg'] },
  { id: 14, name: 'His and Hers', slug: 'his-hers', images: ['/images/products/his-hers/couple1.jpg'] },
  { id: 15, name: 'Ladies Top and Skirt', slug: 'top-skirt', images: ['/images/products/top-skirt/topskirt1.jpg'] },
  { id: 16, name: 'Men Ankara Patched T-shirts', slug: 'patched-tshirts', images: ['/images/products/patched-tshirts/tshirt1.jpg'] },
  { id: 17, name: 'Men Senator Suits', slug: 'senator-suits', images: ['/images/products/senator-suits/senator1.jpg'] },
  { id: 18, name: 'Smookie Thread Dress', slug: 'smookie', images: ['/images/products/smookie/smookie1.jpg'] },
  { id: 19, name: 'Traditional Wedding Dresses', slug: 'traditional-wedding', images: ['/images/products/traditional-wedding/wedding1.jpg'] },
];

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

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-72 bg-gray-100 overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={category.images[currentImageIndex]}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {category.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {currentImageIndex + 1} / {category.images.length}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#2C5326] transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{category.images.length}+ Items</p>
        <div className="flex items-center text-[#2C5326] font-medium group-hover:gap-3 transition-all">
          View Collection <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function ProductCard({ product }: { product: typeof allProducts[0] }) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1 ${
            product.badge === 'Trending' ? 'bg-orange-500/90 text-white' : 'bg-blue-500/90 text-white'
          }`}>
            {product.badge === 'Trending' ? <><TrendingUp className="w-3 h-3" /> Trending</> : <><Star className="w-3 h-3" /> Featured</>}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-semibold text-[#2C5326] uppercase tracking-wider">{product.category}</p>
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#2C5326] transition-colors line-clamp-2">{product.name}</h3>
        <p className="text-lg font-bold text-gray-900">KSh {product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white">
      <HeroSlider />

      <section className="py-16 px-6 bg-gradient-to-b from-orange-50 to-white fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              Trending Now
            </h2>
            <Link href="/products" className="text-[#2C5326] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trendingProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Star className="w-8 h-8 text-blue-500" />
              Featured For You
            </h2>
            <Link href="/products" className="text-[#2C5326] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Explore our curated collections of African fashion</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <CategoryCard key={category.id} category={category} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
