'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const desktopSlides = [
  '/images/hero/slide1.png',
  '/images/hero/slide2.png',
];

const mobileSlides = [
  '/images/products/patched-snoodies/snoody7.jpg',
  '/images/products/patched-snoodies/snoody6.jpg',
  '/images/products/patched-snoodies/snoody11.jpg',
  '/images/products/patched-snoodies/snoody8.jpg',
  '/images/products/bomber-jackets/bomber1.jpg',
  '/images/products/bomber-jackets/bomber2.jpg',
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full -mt-24 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide}
            alt={`Lamafrican Fashion ${index + 1}`}
            fill
            className={`${
              isMobile 
                ? 'object-cover object-center' 
                : 'object-cover'
            }`}
            priority={index === 0}
            quality={90}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

      <div className="relative z-10 h-full flex items-end md:items-center justify-center pb-32 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
          <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 md:mb-4 animate-fade-in">
            Welcome to
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight leading-none text-white animate-slide-up">
            Lamafrican Fashion
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-6 md:mb-10 tracking-wide animate-fade-in-delay">
            Life isn't perfect but your outfit can be
          </p>
          <p className="text-sm sm:text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed opacity-95 animate-fade-in-delay-2 hidden sm:block">
            Discover authentic African fashion. Handcrafted designs, premium fabrics, timeless style.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#2C5326] text-white px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-[#1f3a1a] transition-all transform hover:scale-105 shadow-2xl animate-fade-in-delay-3 active:scale-95"
          >
            Shop All Collections
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white w-8 md:w-12' 
                : 'bg-white/50 w-6 md:w-8'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
