'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fabricTypes } from '@/lib/mockData';

export default function ShopByFabric() {
  return (
    <section className="py-16 lg:py-20" style={{ background: '#ffffff' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-2">
            Know Your Fabric
          </p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-ink">Shop by Fabric</h2>
        </motion.div>

        <div className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-6 gap-4 lg:gap-5 carousel-container pb-2">
          {fabricTypes.map((fab, i) => (
            <motion.div
              key={fab.slug}
              className="flex-shrink-0 lg:flex-shrink"
              style={{ width: 128 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link href={`/collections/fabric-${fab.slug}`} className="group block text-center">
                <div className="relative w-full aspect-square rounded-full overflow-hidden mb-2 border-2 border-transparent group-hover:border-gold transition-colors">
                  <Image
                    src={fab.image}
                    alt={fab.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="128px"
                  />
                  <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors" />
                </div>
                <p className="text-[12px] font-montserrat font-semibold uppercase tracking-[0.06em] text-ink group-hover:text-gold transition-colors">
                  {fab.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
