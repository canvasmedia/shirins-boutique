'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { occasions } from '@/lib/mockData';

export default function ShopByOccasion() {
  return (
    <section className="py-16 lg:py-20" style={{ background: '#F7F2EA' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-2">
            Dressed for the Moment
          </p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-ink">Shop by Occasion</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {occasions.map((occ, i) => (
            <motion.div
              key={occ.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link href={`/collections/occasion-${occ.slug}`} className="group block relative overflow-hidden rounded-2xl aspect-[3/4]">
                <Image
                  src={occ.image}
                  alt={occ.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-playfair text-xl text-ivory">{occ.name}</h3>
                  <p className="text-[11px] font-montserrat text-ivory/70 mt-0.5">{occ.tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
