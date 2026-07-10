'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '25+', label: 'Years of Craft Heritage' },
  { value: '120+', label: 'Artisan Families' },
  { value: '50,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Wholesale Partners' },
];

export default function BrandStatBar() {
  return (
    <section className="py-8 lg:py-7" style={{ background: '#1A1A1A' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 lg:flex lg:flex-nowrap lg:justify-center lg:gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className={`text-center lg:px-8 ${i > 0 ? 'lg:border-l lg:border-ivory/10' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <p className="font-playfair text-2xl lg:text-3xl text-gold leading-none mb-1">{s.value}</p>
              <p className="text-[10px] lg:text-[11px] font-montserrat tracking-[0.08em] uppercase text-ivory/60 leading-snug">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
