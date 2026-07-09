'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSite } from '@/lib/context';
import { Package2, TrendingUp, Users } from 'lucide-react';

export default function WholesaleTeaser() {
  const { setMode } = useSite();

  return (
    <section
      className="py-14 lg:py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #2a3d8f 50%, #1B2A6B 100%)' }}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="text-[10px] font-montserrat tracking-[0.3em] uppercase text-white/60 mb-2">
              For Boutique Owners & Retailers
            </p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-white mb-3">
              Own a Boutique?
              <br />
              <span style={{ color: '#a8c0ff' }}>Explore Wholesale Pricing</span>
            </h2>
            <p className="text-[13px] font-montserrat text-white/60 leading-relaxed max-w-md">
              Join 500+ boutiques across India sourcing premium ethnic wear at exclusive wholesale rates. MOQ as low as 6 pieces.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex gap-8 lg:gap-12"
          >
            {[
              { Icon: Users, value: '500+', label: 'Partner Boutiques' },
              { Icon: TrendingUp, value: '30%', label: 'Avg. Savings' },
              { Icon: Package2, value: '6 pcs', label: 'Min. Order' },
            ].map(({ Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon size={20} className="mx-auto mb-2" style={{ color: '#a8c0ff' }} />
                <p className="font-playfair text-2xl text-white">{value}</p>
                <p className="text-[10px] font-montserrat tracking-wide text-white/50 uppercase">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/wholesale"
              onClick={() => setMode('wholesale')}
              className="inline-flex items-center justify-center gap-2 bg-white text-wholesale font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 rounded hover:bg-white/90 transition-all"
            >
              Explore Wholesale →
            </Link>
            <Link
              href="/wholesale"
              className="text-center text-[11px] font-montserrat tracking-wide text-white/50 hover:text-white/80 transition-colors underline underline-offset-2"
            >
              Apply for a Wholesale Account
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
