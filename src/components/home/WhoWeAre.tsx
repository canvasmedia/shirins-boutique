'use client';

import { motion } from 'framer-motion';
import { Palette, Users, Globe2, Sparkles } from 'lucide-react';

const stats = [
  { Icon: Palette, value: '15,000+', label: 'Curated Designs' },
  { Icon: Users, value: '50,000+', label: 'Happy Customers' },
  { Icon: Sparkles, value: '120+', label: 'Artisan Families' },
  { Icon: Globe2, value: 'Worldwide', label: 'Shipping to 12+ Countries' },
];

export default function WhoWeAre() {
  return (
    <section className="py-16 lg:py-20" style={{ background: '#1A1A1A' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-2">
            Who We Are
          </p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-ivory">
            A Boutique Built on Craft, at Scale
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div
                className="w-11 h-11 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}
              >
                <s.Icon size={18} className="text-gold" />
              </div>
              <p className="font-playfair text-2xl lg:text-3xl text-ivory">{s.value}</p>
              <p className="text-[11px] font-montserrat tracking-[0.1em] uppercase text-ivory/50 mt-1">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
