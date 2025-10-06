'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

// Import category data - COPY ALL YOUR CATEGORIES HERE
const categoryData: Record<string, { name: string; products: any[] }> = {
  'sun-hats': {
    name: 'Accessories - Sun Hats',
    products: [
      {
        id: 'ankara-sun-hat',
        name: 'Ankara Sun Hat - Premium Collection',
        slug: 'ankara-sun-hat',
        price: 1500,
        image: '/images/products/sun-hats/sun1.JPG',
        gallery: [
          '/images/products/sun-hats/sun1.JPG',
          '/images/products/sun-hats/sun2.JPG',
          '/images/products/sun-hats/sun3.JPG',
          '/images/products/sun-hats/sun4.JPG',
          '/images/products/sun-hats/sun5.JPG',
        ],
        description: 'Premium Ankara sun hat with beautiful African prints. Perfect for outdoor events, beach trips, and sunny days.',
      },
    ],
  },
  'bomber-jackets': {
    name: 'Ankara Bomber Jackets',
    products: [
      {
        id: 'ankara-bomber-jacket',
        name: 'Ankara Bomber Jacket - Premium Collection',
        slug: 'ankara-bomber-jacket',
        price: 6500,
        image: '/images/products/bomber-jackets/bomber1.jpg',
        gallery: [
          '/images/products/bomber-jackets/bomber1.jpg',
          '/images/products/bomber-jackets/bomber2.jpg',
          '/images/products/bomber-jackets/bomber3.jpg',
          '/images/products/bomber-jackets/bomber4.jpg',
          '/images/products/bomber-jackets/bomber5.jpg',
          '/images/products/bomber-jackets/bomber6.jpg',
          '/images/products/bomber-jackets/bomber7.jpg',
          '/images/products/bomber-jackets/bomber8.jpg',
          '/images/products/bomber-jackets/bomber9.jpg',
          '/images/products/bomber-jackets/bomber10.jpg',
          '/images/products/bomber-jackets/bomber11.jpg',
          '/images/products/bomber-jackets/bomber12.jpg',
          '/images/products/bomber-jackets/bomber13.jpg',
          '/images/products/bomber-jackets/bomber14.jpg',
          '/images/products/bomber-jackets/bomber15.jpg',
          '/images/products/bomber-jackets/bomber16.jpg',
          '/images/products/bomber-jackets/bomber17.jpg',
          '/images/products/bomber-jackets/bomber18.jpg',
          '/images/products/bomber-jackets/bomber19.jpg',
          '/images/products/bomber-jackets/bomber20.jpg',
          '/images/products/bomber-jackets/bomber21.jpg',
          '/images/products/bomber-jackets/bomber22.jpg',
          '/images/products/bomber-jackets/bomber23.jpg',
          '/images/products/bomber-jackets/bomber24.jpg',
          '/images/products/bomber-jackets/bomber25.jpg',
          '/images/products/bomber-jackets/bomber26.jpg',
          '/images/products/bomber-jackets/bomber27.jpg',
          '/images/products/bomber-jackets/bomber28.jpg',
          '/images/products/bomber-jackets/bomber29.jpg',
          '/images/products/bomber-jackets/bomber30.jpg',
        ],
        description: 'Premium Ankara bomber jacket with authentic African prints. Perfect for casual wear and street style.',
      },
    ],
  },
  
  'kitenge-prints': {
  name: 'Ankara Kitenge Prints',
  products: [
    {
      id: 'ankara-kitenge-prints',
      name: 'Ankara Kitenge Print Fabrics - Premium Collection',
      slug: 'ankara-kitenge-prints',
      price: 2800,
      image: '/images/products/kitenge-prints/ankaraprint1.jpeg',
      gallery: [
        '/images/products/kitenge-prints/ankaraprint1.jpeg',
        '/images/products/kitenge-prints/ankaraprint2.jpeg',
        '/images/products/kitenge-prints/ankaraprint3.jpeg',
        '/images/products/kitenge-prints/ankaraprint4.jpeg',
        '/images/products/kitenge-prints/ankaraprint5.jpeg',
        '/images/products/kitenge-prints/ankaraprint6.jpeg',
        '/images/products/kitenge-prints/ankaraprint7.jpeg',
        '/images/products/kitenge-prints/ankaraprint8.jpeg',
        '/images/products/kitenge-prints/ankaraprint9.jpeg',
        '/images/products/kitenge-prints/ankaraprint10.jpeg',
        '/images/products/kitenge-prints/ankaraprint11.jpeg',
        '/images/products/kitenge-prints/ankaraprint12.jpeg',
        '/images/products/kitenge-prints/ankaraprint13.jpeg',
        '/images/products/kitenge-prints/ankaraprint14.jpeg',
        '/images/products/kitenge-prints/ankaraprint15.jpeg',
        '/images/products/kitenge-prints/ankaraprint16.jpeg',
        '/images/products/kitenge-prints/ankaraprint17.jpeg',
        '/images/products/kitenge-prints/ankaraprint18.jpeg',
        '/images/products/kitenge-prints/ankaraprint19.jpeg',
        '/images/products/kitenge-prints/ankaraprint20.jpeg',
        '/images/products/kitenge-prints/ankaraprint21.jpeg',
        '/images/products/kitenge-prints/ankaraprint22.jpeg',
        '/images/products/kitenge-prints/ankaraprint23.jpeg',
        '/images/products/kitenge-prints/ankaraprint24.jpeg',
        '/images/products/kitenge-prints/ankaraprint25.jpeg',
        '/images/products/kitenge-prints/ankaraprint26.jpeg',
        '/images/products/kitenge-prints/ankaraprint27.jpeg',
        '/images/products/kitenge-prints/ankaraprint28.jpeg',
        '/images/products/kitenge-prints/ankaraprint29.jpeg',
        '/images/products/kitenge-prints/ankaraprint30.jpeg',
        '/images/products/kitenge-prints/ankaraprint31.jpeg',
      ],
      description: 'Premium Ankara Kitenge print fabrics. Authentic African designs, vibrant colors, high-quality material. Perfect for dresses, shirts, and custom tailoring.',
    },
  ],
},
'maxi-dress': {
  name: 'Ankara Maxi Dress',
  products: [
    {
      id: 'ankara-maxi-dress',
      name: 'Ankara Maxi Dress - Premium Collection',
      slug: 'ankara-maxi-dress',
      price: 4500,
      image: '/images/products/maxi-dress/maxi1.jpg',
      gallery: [
        '/images/products/maxi-dress/maxi1.jpg',
        '/images/products/maxi-dress/maxi2.jpg',
        '/images/products/maxi-dress/maxi3.jpg',
        '/images/products/maxi-dress/maxi4.jpg',
        '/images/products/maxi-dress/maxi5.jpg',
        '/images/products/maxi-dress/maxi6.jpg',
        '/images/products/maxi-dress/maxi7.jpg',
        '/images/products/maxi-dress/maxi8.jpg',
        '/images/products/maxi-dress/maxi9.jpg',
        '/images/products/maxi-dress/maxi10.jpg',
        '/images/products/maxi-dress/maxi11.jpg',
        '/images/products/maxi-dress/maxi12.jpg',
        '/images/products/maxi-dress/maxi13.jpg',
        '/images/products/maxi-dress/maxi14.jpg',
        '/images/products/maxi-dress/maxi15.jpg',
        '/images/products/maxi-dress/maxi16.jpg',
        '/images/products/maxi-dress/maxi17.jpg',
        '/images/products/maxi-dress/maxi18.jpg',
        '/images/products/maxi-dress/maxi19.jpg',
        '/images/products/maxi-dress/maxi20.jpg',
        '/images/products/maxi-dress/maxi21.jpg',
        '/images/products/maxi-dress/maxi22.jpg',
        '/images/products/maxi-dress/maxi23.jpg',
        '/images/products/maxi-dress/maxi24.jpg',
        '/images/products/maxi-dress/maxi25.jpg',
      ],
      description: 'Stunning Ankara maxi dresses with elegant African prints. Perfect for weddings, parties, or special occasions. Flowing silhouette, comfortable fit, premium quality fabric.',
    },
  ],
},

// Add all other categories here...
};

// Find product across all categories
function findProduct(slug: string) {
  for (const category of Object.values(categoryData)) {
    const product = category.products.find(p => p.slug === slug);
    if (product) return product;
  }
  return null;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = findProduct(slug);
  
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-[#2C5326] hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const images = product.gallery || [product.image];
  const totalImages = images.length;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div className="bg-white py-12 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5326] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT: Scrollable Image Gallery */}
          <div>
            {/* Main Image with Navigation Arrows */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 group">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Navigation Arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                {selectedImage + 1} / {totalImages}
              </div>
            </div>

            {/* Thumbnail Gallery - Horizontal Scroll */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-[#2C5326] scale-95' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Swipe Hint */}
            {totalImages > 1 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                ← Swipe or click arrows to view all {totalImages} photos →
              </p>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="text-4xl font-bold text-[#2C5326] mb-6">
              KSh {product.price.toLocaleString()}
            </div>

            {product.description && (
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-[#2C5326] text-white py-4 rounded-full hover:bg-[#234219] transition-all font-semibold text-lg flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>

              <a
                href={`https://wa.me/254712345678?text=Hello%20Lamafrican!%20I%20want%20to%20order:%0A%0A${encodeURIComponent(product.name)}%0APrice:%20KSh%20${product.price.toLocaleString()}`}
                target="_blank"
                className="block w-full bg-green-500 text-white py-4 rounded-full hover:bg-green-600 transition-all font-semibold text-lg text-center"
              >
                Order via WhatsApp 💬
              </a>
            </div>

            {/* Product Features */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="font-semibold text-lg mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#2C5326]">✓</span> 100% Premium Ankara Fabric
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2C5326]">✓</span> Handcrafted by Local Artisans
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2C5326]">✓</span> Authentic African Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2C5326]">✓</span> Fast Delivery Nationwide
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="font-semibold text-lg mb-4">Payment Options</h3>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  M-Pesa
                </div>
                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  Visa / Mastercard
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
