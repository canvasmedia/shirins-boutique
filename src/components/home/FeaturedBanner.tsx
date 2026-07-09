'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FeaturedBanner() {
  return (
    <section className="py-0" style={{ background: '#1A1A1A' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Image */}
          <motion.div
            className="relative overflow-hidden order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <Image
              src="https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
              alt="Bridal Collection"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/60" />
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex flex-col justify-center px-8 lg:px-16 py-16 order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-[10px] font-montserrat tracking-[0.35em] uppercase text-gold mb-4">
              Featured Collection
            </p>

            <h2 className="font-playfair text-3xl lg:text-5xl text-ivory leading-tight mb-6">
              The Bridal
              <br />
              <span style={{ color: '#D4AF37' }}>Heritage Edit</span>
            </h2>

            <p className="text-[13px] font-montserrat text-ivory/60 leading-relaxed mb-4">
              Woven from the finest silks and adorned with centuries-old zardozi techniques, our bridal collection is a love letter to Indian craftsmanship.
            </p>
            <p className="text-[13px] font-montserrat text-ivory/60 leading-relaxed mb-8">
              Every piece is a heirloom — crafted to be passed down through generations, carrying stories of celebration and culture.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { value: '200+', label: 'Bridal Designs' },
                { value: '15+', label: 'Craft Traditions' },
                { value: '100%', label: 'Handcrafted' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-playfair text-2xl text-gold">{stat.value}</p>
                  <p className="text-[10px] font-montserrat tracking-[0.12em] uppercase text-ivory/50">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/collections/sarees"
              className="inline-flex items-center gap-2 w-fit border-2 border-gold text-gold px-8 py-4 text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase hover:bg-gold hover:text-ink transition-all duration-300 rounded"
            >
              Explore Bridal
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
