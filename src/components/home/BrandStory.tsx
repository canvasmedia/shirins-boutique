'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BrandStory() {
  return (
    <section className="py-20 lg:py-24" style={{ background: '#F7F2EA' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with decorative frame */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                alt="Our Story — Indian Craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
            </div>
            {/* Decorative accent box */}
            <div
              className="absolute -bottom-6 -right-6 w-40 h-40 rounded-xl flex flex-col items-center justify-center text-center p-4 shadow-xl"
              style={{ background: '#1A1A1A' }}
            >
              <p className="font-playfair text-3xl text-gold">25+</p>
              <p className="text-[10px] font-montserrat tracking-[0.12em] uppercase text-ivory/60 mt-1">
                Years of<br />Craft Heritage
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-4">
              Our Story
            </p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-ink mb-6 leading-tight">
              Weaving Tradition
              <br />
              Into Every Thread
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <p className="text-[14px] font-montserrat text-taupe leading-relaxed mb-4">
              Shirin&apos;s Boutique was born from a deep reverence for India&apos;s textile heritage. Founded by Shirin Kapoor in 1999, our journey began in a small workshop in Jaipur, where master weavers and artisans had been practicing their craft for generations.
            </p>
            <p className="text-[14px] font-montserrat text-taupe leading-relaxed mb-8">
              Today, we partner with over 120 artisan families across Varanasi, Kanchipuram, Lucknow, and Rajasthan — ensuring that every saree, lehenga, and suit you receive carries a legacy of authentic craftsmanship and fair trade practices.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Authentic Craft', desc: 'Direct from artisan clusters' },
                { label: 'Ethical Sourcing', desc: 'Fair wages, fair trade' },
                { label: 'Premium Fabrics', desc: 'Only finest textiles' },
                { label: 'Custom Orders', desc: 'Bespoke for you' },
              ].map((v) => (
                <div key={v.label} className="flex items-start gap-2">
                  <div className="w-1 h-4 mt-1 rounded-full flex-shrink-0" style={{ background: '#D4AF37' }} />
                  <div>
                    <p className="text-[12px] font-montserrat font-semibold text-ink">{v.label}</p>
                    <p className="text-[11px] font-montserrat text-taupe">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase text-gold hover:text-ink transition-colors border-b border-gold pb-0.5"
            >
              Read Our Full Story →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
