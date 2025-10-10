'use client';

import { useState, use, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Heart, Truck, Shield } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { useCartStore } from '@/store/cartStore';
import generatedCategoriesData from '@/data/generated-categories.json';

const generatedCategories: any = generatedCategoriesData;

const categoriesData = Object.values(generatedCategories).map((cat: any) => ({
  slug: cat.slug,
  name: cat.name,
  price: cat.price,
  images: cat.images.map((img: any) => img.image),
  count: cat.count
}));

const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

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

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const category = categoriesData.find(c => c.slug === slug);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!category) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/" className="text-[#2C5326] font-semibold hover:underline">Return Home</Link>
        </div>
      </main>
    );
  }

  const displayImages = isMobile ? category.images.slice(0, 6) : category.images;

  const handleAddToCart = () => {
    addToCart({
      id: `${category.slug}-${selectedSize}`,
      name: `${category.name} (${selectedSize})`,
      price: category.price,
      image: displayImages[selectedImage],
      quantity: quantity,
      size: selectedSize,
    });
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'd like to order:\n\n${category.name}\nSize: ${selectedSize}\nDesign: Image ${selectedImage + 1}\nQuantity: ${quantity}\nTotal: KSh ${(category.price * quantity).toLocaleString()}\n\nProduct Link: ${window.location.href}`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[\s+]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({
        left: direction === 'left' ? -100 : 100,
        behavior: 'smooth'
      });
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <>
      <main className="bg-gray-50 pb-28 md:pb-20">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 md:hidden">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-700 font-medium">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="md:pt-8 lg:pt-12">
          <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-0">
            <Link href="/" className="hidden md:inline-flex items-center gap-2 text-[#2C5326] font-semibold hover:gap-3 transition-all mb-6">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>

            <div className="grid md:grid-cols-2 gap-6 md:gap-12 pb-16">
              <div className="md:sticky md:top-24 md:h-fit">
                <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden border border-gray-200">
                  <div className="relative w-full bg-gray-50" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src={displayImages[selectedImage] || '/images/placeholder-category.jpg'}
                      alt={`${category.name} - Design ${selectedImage + 1}`}
                      fill
                      className="object-contain p-3 md:p-4"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <button className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md z-10">
                      <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                    </button>
                    {displayImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 md:p-2.5 rounded-full shadow-md hover:bg-white active:scale-90 transition-all z-10"
                        >
                          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 md:p-2.5 rounded-full shadow-md hover:bg-white active:scale-90 transition-all z-10"
                        >
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                        </button>
                      </>
                    )}
                    <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium z-10">
                      {selectedImage + 1} / {displayImages.length}
                    </div>
                  </div>

                  {displayImages.length > 1 && (
                    <div className="p-2.5 md:p-3 bg-gray-50 border-t border-gray-100">
                      <div className="relative flex items-center gap-1.5 md:gap-2">
                        <button
                          onClick={() => scrollThumbnails('left')}
                          className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-white shadow-sm rounded-full flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-all z-10"
                        >
                          <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                        <div
                          ref={thumbnailRef}
                          className="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                        >
                          {displayImages.map((img: string, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedImage(idx)}
                              className={`relative flex-shrink-0 w-12 h-14 md:w-14 md:h-16 rounded-md md:rounded-lg overflow-hidden border-2 transition-all ${
                                idx === selectedImage ? 'border-[#2C5326] scale-105' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Image 
                                src={img || '/images/placeholder-category.jpg'} 
                                alt={`Design ${idx + 1}`} 
                                fill 
                                className="object-cover" 
                                sizes="56px"
                              />
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => scrollThumbnails('right')}
                          className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-white shadow-sm rounded-full flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-all z-10"
                        >
                          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-1 md:px-0 pt-0 md:pt-0">
                <div className="inline-block px-3 py-1 bg-[#2C5326]/10 text-[#2C5326] rounded-full text-xs font-semibold mb-3">
                  {isMobile ? `${displayImages.length} Designs Shown` : `${category.count} Available Designs`}
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {category.name}
                </h1>
                <p className="text-3xl font-bold text-gray-900 mb-6">
                  KSh {category.price.toLocaleString()}
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

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Select Size</label>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3.5 md:px-4 py-2 md:py-2.5 rounded-lg font-semibold text-sm transition-all ${
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-all active:scale-95"
                      >
                        −
                      </button>
                      <span className="text-lg md:text-xl font-semibold min-w-[2rem] text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-all active:scale-95"
                      >
                        +
                      </button>
                    </div>
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
                  <Accordion title="About This Collection" defaultOpen>
                    Choose from {isMobile ? displayImages.length : category.count} unique designs crafted with premium African fabrics. Each piece celebrates authentic Ankara patterns and modern fashion.
                  </Accordion>
                  <Accordion title="Shipping & Returns">
                    Free delivery on orders within Nairobi. Country-wide delivery available. 7-day return policy for unworn items with tags attached.
                  </Accordion>
                  <Accordion title="Care Instructions">
                    Hand wash or gentle machine wash in cold water. Hang dry in shade. Iron on low heat if needed. Do not bleach.
                  </Accordion>
                  <Accordion title="Size Guide">
                    We offer sizes S, M, L, XL, and XXL for most items. Contact us via WhatsApp for custom sizing and measurements.
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-4 py-4 pb-safe">
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#2C5326] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-5 h-5" />
            Add
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
