'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductCard from '@/components/shop/ProductCard';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  primaryImage: string;
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#2C5326]">Loading products... ⏳</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#2C5326] mb-8">All Products 🛍️</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 mb-4">No products available yet</p>
            <p className="text-gray-500">Check back soon for amazing African fashion items!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
