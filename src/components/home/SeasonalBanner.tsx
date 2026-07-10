'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function SeasonalBanner() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '50svh' }}>
      <Image
        src="https://images.pexels.com/photos/26969898/pexels-photo-26969898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
        alt="Summer cotton edit"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/40 to-ink/10" />
      <div className="relative z-10 flex items-center min-h-[50svh] px-6 lg:px-16">
        <motion.div
          className="max-w-md py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-montserrat tracking-[0.35em] uppercase text-gold/90 mb-3">
            Summer Edit 2026
          </p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-ivory leading-tight mb-4">
            Breathable Cottons for
            <br />
            the Season Ahead
          </h2>
          <p className="text-[13px] font-montserrat text-ivory/70 leading-relaxed mb-7">
            Hand block-printed cottons, Chanderi silks and Lucknowi chikankari — light fabrics that keep the drape and the comfort in equal measure.
          </p>
          <Link
            href="/collections/fabric-cotton"
            className="inline-flex items-center gap-2 border-2 border-gold text-gold px-7 py-3.5 text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase hover:bg-gold hover:text-ink transition-all duration-300 rounded"
          >
            Shop the Summer Edit
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
