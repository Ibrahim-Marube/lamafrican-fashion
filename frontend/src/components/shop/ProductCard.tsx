'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  primaryImage: string;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.primaryImage,
      quantity: 1,
    });
    alert('Added to cart! 🛒');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 bg-gray-200">
          {product.primaryImage ? (
            <Image
              src={product.primaryImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🧵
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-[#2C5326] line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#2C5326]">
            KShs {product.price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-[#FFD700] text-gray-900 p-3 rounded-lg hover:bg-[#FFD700]/90 transition"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
