'use client';

import { motion } from 'framer-motion';
import { Shield, Star, CreditCard, RefreshCw, Truck } from 'lucide-react';

const badges = [
  { icon: Star, label: 'Premium Quality', desc: 'Handpicked fabrics & craftsmanship' },
  { icon: Shield, label: 'Trusted by Thousands', desc: '50,000+ happy customers' },
  { icon: CreditCard, label: 'Secure Payments', desc: '100% safe & encrypted' },
  { icon: RefreshCw, label: 'Easy Returns', desc: '15-day hassle-free returns' },
  { icon: Truck, label: 'Free Shipping', desc: 'On orders above ₹999' },
];

export default function TrustBadges() {
  return (
    <section className="w-full py-8" style={{ background: '#1A1A1A' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:flex lg:flex-nowrap lg:items-center lg:justify-between lg:gap-0">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              className={`flex items-center gap-3 group min-w-0 ${
                i === badges.length - 1 ? 'col-span-2 justify-center' : ''
              } lg:col-span-1 lg:justify-start lg:flex-1 ${i > 0 ? 'lg:border-l lg:border-ivory/10 lg:pl-6' : ''}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
              >
                <badge.icon size={16} style={{ color: '#D4AF37' }} />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-montserrat font-bold tracking-[0.05em] text-ivory truncate">
                  {badge.label}
                </p>
                <p className="text-[10px] font-montserrat text-taupe truncate">
                  {badge.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
