'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { heroImages } from '@/lib/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setCurrent(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length);
    }, 5000);
  };

  const slide = heroImages[current];

  return (
    <section className="relative w-full h-[85vh] min-h-[520px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src={slide.url}
            alt={slide.headline}
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: prefersReduced ? 0 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: prefersReduced ? 0 : 40 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-xl"
            >
              {/* Pre-heading */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold/90 mb-4"
              >
                New Collection · 2025
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-playfair text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.05] mb-2"
              >
                {slide.headline}
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-playfair text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6"
                style={{ color: '#D4AF37' }}
              >
                {slide.subheadline}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-[14px] font-montserrat text-ivory/80 leading-relaxed mb-8 max-w-sm"
              >
                Discover handcrafted Indian ethnic wear — where every weave tells a story of tradition and artistry.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href={slide.ctaLink}
                  className="group inline-flex items-center gap-2 bg-gold text-ink px-8 py-4 text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase rounded hover:bg-gold/90 transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
                >
                  {slide.cta}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/collections/new-arrivals"
                  className="inline-flex items-center gap-2 border-2 border-ivory/50 text-ivory px-8 py-4 text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase rounded hover:border-ivory hover:bg-ivory/10 transition-all duration-200"
                >
                  New Arrivals
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              background: i === current ? '#D4AF37' : 'rgba(247,242,234,0.5)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={() => goTo((current - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-ivory/20 backdrop-blur-sm flex items-center justify-center text-ivory hover:bg-ivory/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo((current + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-ivory/20 backdrop-blur-sm flex items-center justify-center text-ivory hover:bg-ivory/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
}
