'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600">Checkout functionality coming soon...</p>
        </div>
      </div>
    </div>
  );
}
