'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some amazing African fashion items to get started!</p>
          <Link href="/products" className="bg-[#2C5326] text-white px-8 py-3 rounded-lg hover:bg-[#2C5326]/90 transition font-semibold inline-block">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#2C5326] mb-8">Shopping Cart 🛒</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md flex gap-4">
                <div className="relative w-24 h-24 bg-gray-200 rounded">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🧵</div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-[#2C5326] font-bold text-xl mb-4">
                    KShs {item.price.toLocaleString()}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 ml-auto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>KShs {getTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>FREE 🎉</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span className="text-[#2C5326]">KShs {getTotal().toLocaleString()}</span>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="block w-full bg-[#2C5326] text-white text-center py-3 rounded-lg hover:bg-[#2C5326]/90 transition font-semibold mb-3"
              >
                Proceed to Checkout
              </Link>
              
              <button
                onClick={clearCart}
                className="block w-full bg-gray-200 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
