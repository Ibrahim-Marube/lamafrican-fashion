'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, MessageCircle, CreditCard, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const allProducts = [
  { id: 1, name: 'Ankara Maxi Dress - Royal Blue', price: 8500, image: '/images/products/maxi-dress/maxi1.jpg', category: 'Maxi Dress', description: 'Elegant royal blue Ankara maxi dress. Perfect for special occasions.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 2, name: 'Ankara Bomber Jacket - Sunset', price: 12000, image: '/images/products/bomber-jackets/bomber1.jpg', category: 'Bomber Jackets', description: 'Stylish bomber jacket with sunset Ankara print.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 3, name: 'African Men Shirt - Classic', price: 6500, image: '/images/products/men-shirts/men-shirt-1.jpg', category: 'Men Shirts', description: 'Classic African print shirt for men.', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 4, name: 'Ankara Ladies Top - Elegant', price: 5500, image: '/images/products/ladies-tops/top1.jpg', category: 'Ladies Tops', description: 'Elegant Ankara ladies top with modern design.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 5, name: 'Sun Hat - Safari', price: 2500, image: '/images/products/sun-hats/sun1.JPG', category: 'Sun Hats', description: 'Comfortable sun hat with African print.', sizes: ['One Size'] },
  { id: 6, name: 'Ankara Maxi Dress - Emerald', price: 8800, image: '/images/products/maxi-dress/maxi2.jpg', category: 'Maxi Dress', description: 'Beautiful emerald Ankara maxi dress.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 7, name: 'Ankara Bomber Jacket - Urban', price: 11500, image: '/images/products/bomber-jackets/bomber2.jpg', category: 'Bomber Jackets', description: 'Urban style bomber jacket with Ankara design.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 8, name: 'African Men Shirt - Premium', price: 7000, image: '/images/products/men-shirts/men-shirt-2.jpg', category: 'Men Shirts', description: 'Premium quality African print shirt.', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 9, name: 'Ankara Ladies Top - Chic', price: 5800, image: '/images/products/ladies-tops/top2.jpg', category: 'Ladies Tops', description: 'Chic Ankara top for everyday wear.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 10, name: 'Ankara Maxi Dress - Golden', price: 9200, image: '/images/products/maxi-dress/maxi3.jpg', category: 'Maxi Dress', description: 'Stunning golden Ankara maxi dress.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 11, name: 'Ankara Bomber Jacket - Classic', price: 12500, image: '/images/products/bomber-jackets/bomber3.jpg', category: 'Bomber Jackets', description: 'Classic bomber with bold Ankara patterns.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 12, name: 'Sun Hat - Beach', price: 2800, image: '/images/products/sun-hats/sun2.JPG', category: 'Sun Hats', description: 'Perfect beach companion with style.', sizes: ['One Size'] },
  { id: 13, name: 'African Men Shirt - Modern', price: 6800, image: '/images/products/men-shirts/men-shirt-3.jpg', category: 'Men Shirts', description: 'Modern cut with traditional patterns.', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 14, name: 'Ankara Ladies Top - Vibrant', price: 6000, image: '/images/products/ladies-tops/top3.jpg', category: 'Ladies Tops', description: 'Vibrant colors for everyday elegance.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 15, name: 'Ankara Maxi Dress - Sunset', price: 8700, image: '/images/products/maxi-dress/maxi4.jpg', category: 'Maxi Dress', description: 'Sunset inspired maxi dress design.', sizes: ['S', 'M', 'L', 'XL'] },
];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const productId = parseInt(slug);
  const product = allProducts.find(p => p.id === productId) || allProducts[0];
  
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const moreProducts = allProducts.filter(p => p.id !== product.id && !relatedProducts.find(r => r.id === p.id)).slice(0, 4);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'd like to order:\n\n${product.name}\nSize: ${selectedSize}\nQuantity: ${quantity}\nTotal: KSh ${(product.price * quantity).toLocaleString()}\n\nProduct Link: ${window.location.href}`;
    window.open(`https://wa.me/254700000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="inline-block px-3 py-1 bg-[#2C5326]/10 text-[#2C5326] rounded-full text-sm font-semibold mb-4 w-fit">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900 mb-6">
                KSh {product.price.toLocaleString()}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Select Size</label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-[#2C5326] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

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
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#2C5326] text-white py-4 rounded-full font-bold text-lg hover:bg-[#234219] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 text-white py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order via WhatsApp
                </button>

                <Link
                  href="/checkout"
                  className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay with M-Pesa
                </Link>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-7 h-7 text-[#2C5326]" />
                  Perfect Match for You
                </h2>
                <Link href="/products" className="text-[#2C5326] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  View All <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link key={item.id} href={`/products/${item.id}`} className="group">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#2C5326] transition-colors line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {moreProducts.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-7 h-7 text-orange-500" />
                  Keep Exploring
                </h2>
                <Link href="/products" className="text-[#2C5326] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  View All <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {moreProducts.map((item) => (
                  <Link key={item.id} href={`/products/${item.id}`} className="group">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#2C5326] transition-colors line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-[#2C5326] to-[#3d6e33] rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover More Styles</h2>
            <p className="text-lg mb-8 opacity-90">Explore our full collection of handcrafted African fashion</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-[#2C5326] px-8 py-4 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Browse All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
