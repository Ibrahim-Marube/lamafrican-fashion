'use client';

import { useState, use, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, MessageCircle, ChevronLeft, ChevronDown, ChevronUp, TrendingUp, Sparkles, ArrowLeft, Truck, Shield, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const allProducts = [
  { id: 1, name: 'Ankara Maxi Dress - Royal Blue', price: 8500, image: '/images/products/maxi-dress/maxi1.jpg', category: 'Maxi Dress', description: 'Elegant royal blue Ankara maxi dress. Perfect for special occasions.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/maxi-dress/maxi1.jpg', '/images/products/maxi-dress/maxi2.jpg', '/images/products/maxi-dress/maxi3.jpg'] },
  { id: 2, name: 'Ankara Bomber Jacket - Sunset', price: 12000, image: '/images/products/bomber-jackets/bomber1.jpg', category: 'Bomber Jackets', description: 'Stylish bomber jacket with sunset Ankara print.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/bomber-jackets/bomber1.jpg', '/images/products/bomber-jackets/bomber2.jpg'] },
  { id: 3, name: 'African Men Shirt - Classic', price: 6500, image: '/images/products/men-shirts/men-shirt-1.jpg', category: 'Men Shirts', description: 'Classic African print shirt for men.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], images: ['/images/products/men-shirts/men-shirt-1.jpg', '/images/products/men-shirts/men-shirt-2.jpg'] },
  { id: 4, name: 'Ankara Ladies Top - Elegant', price: 5500, image: '/images/products/ladies-tops/top1.jpg', category: 'Ladies Tops', description: 'Elegant Ankara ladies top with modern design.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/ladies-tops/top1.jpg', '/images/products/ladies-tops/top2.jpg'] },
  { id: 5, name: 'Sun Hat - Safari', price: 2500, image: '/images/products/sun-hats/sun1.JPG', category: 'Sun Hats', description: 'Comfortable sun hat with African print.', sizes: ['One Size'], images: ['/images/products/sun-hats/sun1.JPG', '/images/products/sun-hats/sun2.JPG'] },
  { id: 6, name: 'Ankara Maxi Dress - Emerald', price: 8800, image: '/images/products/maxi-dress/maxi2.jpg', category: 'Maxi Dress', description: 'Beautiful emerald Ankara maxi dress.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/maxi-dress/maxi2.jpg', '/images/products/maxi-dress/maxi3.jpg'] },
  { id: 7, name: 'Ankara Bomber Jacket - Urban', price: 11500, image: '/images/products/bomber-jackets/bomber2.jpg', category: 'Bomber Jackets', description: 'Urban style bomber jacket with Ankara design.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/bomber-jackets/bomber2.jpg', '/images/products/bomber-jackets/bomber3.jpg'] },
  { id: 8, name: 'African Men Shirt - Premium', price: 7000, image: '/images/products/men-shirts/men-shirt-2.jpg', category: 'Men Shirts', description: 'Premium quality African print shirt.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], images: ['/images/products/men-shirts/men-shirt-2.jpg', '/images/products/men-shirts/men-shirt-3.jpg'] },
  { id: 9, name: 'Ankara Ladies Top - Chic', price: 5800, image: '/images/products/ladies-tops/top2.jpg', category: 'Ladies Tops', description: 'Chic Ankara top for everyday wear.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/ladies-tops/top2.jpg', '/images/products/ladies-tops/top3.jpg'] },
  { id: 10, name: 'Ankara Maxi Dress - Golden', price: 9200, image: '/images/products/maxi-dress/maxi3.jpg', category: 'Maxi Dress', description: 'Stunning golden Ankara maxi dress.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/maxi-dress/maxi3.jpg', '/images/products/maxi-dress/maxi4.jpg'] },
  { id: 11, name: 'Ankara Bomber Jacket - Classic', price: 12500, image: '/images/products/bomber-jackets/bomber3.jpg', category: 'Bomber Jackets', description: 'Classic bomber with bold Ankara patterns.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/bomber-jackets/bomber3.jpg', '/images/products/bomber-jackets/bomber4.jpg'] },
  { id: 12, name: 'Sun Hat - Beach', price: 2800, image: '/images/products/sun-hats/sun2.JPG', category: 'Sun Hats', description: 'Perfect beach companion with style.', sizes: ['One Size'], images: ['/images/products/sun-hats/sun2.JPG', '/images/products/sun-hats/sun3.JPG'] },
  { id: 13, name: 'African Men Shirt - Modern', price: 6800, image: '/images/products/men-shirts/men-shirt-3.jpg', category: 'Men Shirts', description: 'Modern cut with traditional patterns.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], images: ['/images/products/men-shirts/men-shirt-3.jpg', '/images/products/men-shirts/men-shirt-4.jpg'] },
  { id: 14, name: 'Ankara Ladies Top - Vibrant', price: 6000, image: '/images/products/ladies-tops/top3.jpg', category: 'Ladies Tops', description: 'Vibrant colors for everyday elegance.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/ladies-tops/top3.jpg', '/images/products/ladies-tops/top4.jpg'] },
  { id: 15, name: 'Ankara Maxi Dress - Sunset', price: 8700, image: '/images/products/maxi-dress/maxi4.jpg', category: 'Maxi Dress', description: 'Sunset inspired maxi dress design.', sizes: ['S', 'M', 'L', 'XL'], images: ['/images/products/maxi-dress/maxi4.jpg', '/images/products/maxi-dress/maxi5.jpg'] },
];

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left font-semibold text-gray-900 hover:text-[#2C5326] transition-colors"
      >
        {title}
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && <div className="pb-4 text-gray-600 leading-relaxed">{children}</div>}
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const productId = parseInt(slug);
  const product = allProducts.find(p => p.id === productId) || allProducts[0];
  
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    window.open(`https://wa.me/254703129084?text=${encodeURIComponent(message)}`, '_blank');
  };

  const productImages = product.images || [product.image];

  return (
    <>
      <main className="bg-white min-h-screen pb-32 md:pb-20">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 md:hidden">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-700 font-medium">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="md:pt-8 lg:pt-12">
          <div className="max-w-7xl mx-auto px-0 md:px-6">
            <Link href="/" className="hidden md:inline-flex items-center gap-2 text-[#2C5326] font-semibold hover:gap-3 transition-all mb-6">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>

            <div className="grid md:grid-cols-2 gap-0 md:gap-12">
              <div className="md:sticky md:top-24 md:h-fit">
                <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden md:rounded-2xl">
                  <Image
                    src={productImages[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {productImages.length > 1 && (
                  <div className="flex gap-2 mt-3 px-4 md:px-0 overflow-x-auto scrollbar-hide">
                    {productImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === selectedImage ? 'border-[#2C5326]' : 'border-gray-200'
                        }`}
                      >
                        <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-4 md:px-0 pt-6 md:pt-0">
                <div className="inline-block px-3 py-1 bg-[#2C5326]/10 text-[#2C5326] rounded-full text-xs font-semibold mb-3">
                  {product.category}
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-gray-900 mb-6">
                  KSh {product.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    Free Delivery
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    Secure Payment
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Select Size</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                          selectedSize === size
                            ? 'bg-[#2C5326] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
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
                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-all active:scale-95"
                    >
                      −
                    </button>
                    <span className="text-xl font-semibold min-w-[2rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-all active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="hidden md:block space-y-3 mb-8">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#2C5326] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#234219] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Order via WhatsApp
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Accordion title="Description" defaultOpen>
                    {product.description}
                  </Accordion>
                  <Accordion title="Shipping & Returns">
                    Free delivery on orders within Nairobi. Country-wide delivery available. 7-day return policy for unworn items with tags attached.
                  </Accordion>
                  <Accordion title="Care Instructions">
                    Hand wash or gentle machine wash in cold water. Hang dry in shade. Iron on low heat if needed. Do not bleach.
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 transition-transform duration-200 ${
        showStickyBar ? 'translate-y-0' : 'translate-y-0'
      }`}>
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#2C5326] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="flex-1 bg-[#25D366] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
