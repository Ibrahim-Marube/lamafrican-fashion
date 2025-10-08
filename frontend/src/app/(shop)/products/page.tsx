'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';

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
            product.badge === 'Trending' 
              ? 'bg-orange-500/90 text-white' 
              : 'bg-blue-500/90 text-white'
          }`}>
            {product.badge === 'Trending' ? (
              <>
                <TrendingUp className="w-3 h-3" /> Trending
              </>
            ) : (
              <>
                <Star className="w-3 h-3" /> Featured
              </>
            )}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-semibold text-[#2C5326] uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#2C5326] transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-gray-900">
          KSh {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'featured'>('all');

  const displayProducts = activeTab === 'all' ? allProducts : activeTab === 'trending' ? trendingProducts : featuredProducts;

  return (
    <main className="bg-white min-h-screen pt-8 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Shop All Products
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Discover our handcrafted African fashion collection
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all text-sm ${
              activeTab === 'all'
                ? 'bg-[#2C5326] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products ({allProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 text-sm ${
              activeTab === 'trending'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending ({trendingProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 text-sm ${
              activeTab === 'featured'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Star className="w-4 h-4" />
            Featured ({featuredProducts.length})
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#2C5326] font-semibold hover:gap-4 transition-all"
          >
            Explore Categories <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
