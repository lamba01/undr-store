"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/images/hero-1.jpg",
    tag: "New Season · Summer 2025",
    title: ["Dress for every", "moment that matters"],
    subtitle:
      "Curated styles for the modern woman. From everyday elegance to occasion wear.",
    cta: "Shop Now",
  },
  {
    image: "/images/hero-2.jpg",
    tag: "Just Dropped · New Arrivals",
    title: ["Effortless style,", "redefined"],
    subtitle:
      "Fresh pieces added weekly. Be the first to wear what everyone will be talking about.",
    cta: "Shop New In",
  },
  {
    image: "/images/hero-3.jpg",
    tag: "Limited Offer · This Week Only",
    title: ["Your next favourite", "outfit awaits"],
    subtitle: "Shop the latest collection. Style made simple.",
    cta: "Shop the Collection",
  },
];

export default function Hero() {
  const [cur, setCur] = useState(0);

  const goTo = (n) => setCur((n + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => goTo(cur + 1), 5000);
    return () => clearInterval(timer);
  }, [cur]);

  return (
    <section className="relative h-[90vh] min-h-140 overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${cur * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative min-w-full h-full shrink-0">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-black/30" />

            {/* Content */}
            <div className="absolute bottom-20 left-0 px-7 sm:left-14 sm:right-14 text-white">
              <p className="text-xs tracking-[0.14em] uppercase text-white/70 mb-3">
                {slide.tag}
              </p>
              <h1 className="sm:text-5xl text-3xl font-normal leading-tight mb-3 tracking-tight">
                {slide.title[0]}
                <br />
                <em className="text-[#e8d5b8] italic">{slide.title[1]}</em>
              </h1>
              <p className="text-sm text-white/75 mb-6 max-w-md leading-relaxed">
                {slide.subtitle}
              </p>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#f0ebe4] transition-colors"
              >
                {slide.cta}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {/* <button
        onClick={() => goTo(cur - 1)}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/30 bg-white/15 text-white hover:bg-white/25 transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => goTo(cur + 1)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/30 bg-white/15 text-white hover:bg-white/25 transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button> */}

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === cur ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
