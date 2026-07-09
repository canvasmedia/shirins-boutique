'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';
import { Product } from '@/lib/types';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}

export default function ProductCarousel({ title, subtitle, products, viewAllHref }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.75;
    container.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  return (
    <section className="py-16 lg:py-20" style={{ background: '#F7F2EA' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {subtitle && (
              <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-2">
                {subtitle}
              </p>
            )}
            <h2 className="font-playfair text-3xl lg:text-4xl text-ink">{title}</h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="h-px w-12" style={{ background: '#D4AF37' }} />
              <div className="w-1 h-1 rounded-full bg-gold" />
              <div className="h-px w-6 bg-taupe/30" />
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            {/* Arrow buttons */}
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-taupe/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all disabled:opacity-30"
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-taupe/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all disabled:opacity-30"
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
            {viewAllHref && (
              <a
                href={viewAllHref}
                className="hidden md:block text-[11px] font-montserrat tracking-[0.15em] uppercase text-gold hover:text-ink transition-colors border-b border-gold pb-0.5"
              >
                View All
              </a>
            )}
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-5 overflow-x-auto carousel-container pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: 240, scrollSnapAlign: 'start' }}
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        {viewAllHref && (
          <div className="text-center mt-6 md:hidden">
            <a
              href={viewAllHref}
              className="text-[12px] font-montserrat tracking-[0.15em] uppercase text-gold border-b border-gold pb-0.5"
            >
              View All
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
