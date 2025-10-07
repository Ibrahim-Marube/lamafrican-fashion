'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  '/images/hero/slide1.png',
  '/images/hero/slide2.png',
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full -mt-24 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide}
            alt={`Lamafrican Fashion Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <p className="text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-fade-in">
            Welcome to
          </p>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-none text-white animate-slide-up">
            Lamafrican Fashion
          </h1>
          <p className="text-xl md:text-3xl font-light mb-10 tracking-wide animate-fade-in-delay">
            Life isn't perfect but your outfit can be
          </p>
          <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed opacity-95 animate-fade-in-delay-2">
            Discover authentic African fashion. Handcrafted designs, premium fabrics, timeless style.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#2C5326] text-white px-12 py-5 rounded-full text-base md:text-lg font-semibold hover:bg-[#1f3a1a] transition-all transform hover:scale-105 shadow-2xl animate-fade-in-delay-3"
          >
            Shop All Collections
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-12' : 'bg-white/50 w-8'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
