'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { categories } from '@/lib/mockData';

const displayCategories = [
  { id: 'sarees', name: 'Sarees', href: '/collections/sarees', image: 'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 'suits', name: 'Suits', href: '/collections/suits', image: 'https://images.pexels.com/photos/7275701/pexels-photo-7275701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 'lehengas', name: 'Lehengas', href: '/collections/lehengas', image: 'https://images.pexels.com/photos/12062663/pexels-photo-12062663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800' },
  { id: 'kurtis-tunics', name: 'Kurtis & Tunics', href: '/collections/kurtis-tunics', image: 'https://images.pexels.com/photos/18194539/pexels-photo-18194539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 'new-arrivals', name: 'New Arrivals', href: '/collections/new-arrivals', image: 'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { id: 'sale', name: 'Sale', href: '/collections/sale', image: 'https://images.pexels.com/photos/17876038/pexels-photo-17876038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
];

export default function ShopByCategory() {
  return (
    <section className="py-20 lg:py-24" style={{ background: '#F7F2EA' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-3">
            Explore Our World
          </p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-ink mb-4">
            Shop by Category
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
          </div>
        </motion.div>

        {/* Category circles */}
        <div className="flex flex-wrap items-start justify-center gap-6 lg:gap-10">
          {displayCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center gap-3 group"
            >
              <Link href={cat.href}>
                <div className="relative cursor-pointer">
                  {/* Circle */}
                  <div
                    className="relative overflow-hidden transition-all duration-400 group-hover:shadow-xl"
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      border: '3px solid transparent',
                      background: 'linear-gradient(#F7F2EA, #F7F2EA) padding-box, linear-gradient(135deg, #D4AF37, #A89E94) border-box',
                    }}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                      sizes="140px"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-full bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Gold ring animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-gold opacity-0 group-hover:opacity-100"
                    style={{ margin: -6 }}
                    initial={false}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                <p className="text-center text-[12px] font-montserrat tracking-[0.08em] uppercase font-semibold text-ink group-hover:text-gold transition-colors duration-200 mt-1">
                  {cat.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
