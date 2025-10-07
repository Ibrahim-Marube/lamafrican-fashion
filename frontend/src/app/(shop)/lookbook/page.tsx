'use client';
import Image from 'next/image';

const lookbookImages = [
  { id: 1, title: 'Spring Collection', category: 'Maxi Dresses', image: '/lookbook/1.jpg' },
  { id: 2, title: 'Urban Chic', category: 'Bomber Jackets', image: '/lookbook/2.jpg' },
  { id: 3, title: 'Elegant Evening', category: 'Ladies Tops', image: '/lookbook/3.jpg' },
  { id: 4, title: 'Summer Vibes', category: 'Sun Hats', image: '/lookbook/4.jpg' },
  { id: 5, title: 'Classic Comfort', category: 'Men Shirts', image: '/lookbook/5.jpg' },
  { id: 6, title: 'Bold Patterns', category: 'Maxi Dresses', image: '/lookbook/6.jpg' },
];

export default function LookBookPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh] bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-7xl font-bold tracking-tight text-gray-900 mb-4">Look Book</h1>
          <p className="text-xl text-gray-600 font-light">Timeless elegance meets African heritage</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lookbookImages.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-[3/4] hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm font-light mb-1">{item.category}</p>
                <h3 className="text-2xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
