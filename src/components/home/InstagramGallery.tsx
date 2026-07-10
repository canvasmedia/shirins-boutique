'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { instagramPosts } from '@/lib/mockData';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function InstagramGallery() {
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
          <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-2 flex items-center justify-center gap-2">
            <InstagramIcon size={13} />
            @shirinsboutique
          </p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-ink">Shop the Look</h2>
        </motion.div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {instagramPosts.map((post, i) => (
            <motion.div
              key={post.image + i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link href={post.href} className="group relative block aspect-square overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt="Shirin's Boutique on Instagram"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 text-ivory text-[12px] font-montserrat font-semibold">
                    <Heart size={13} className="fill-ivory" />
                    {post.likes}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
