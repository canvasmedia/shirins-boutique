'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Package2, TrendingUp, Users, Star, CheckCircle, Truck, Award } from 'lucide-react';
import WholesaleEnquiryForm from '@/components/WholesaleEnquiryForm';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Competitive Margins',
    desc: 'Earn up to 35% margin on every piece you sell. Our wholesale prices are structured to ensure profitability for your boutique at every tier.',
  },
  {
    icon: Package2,
    title: 'Low MOQ',
    desc: 'Start small with a minimum order of just 6 pieces per style. We believe in removing barriers for boutique owners at every stage.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    desc: 'Every wholesale partner gets a dedicated relationship manager who helps with styling, trend insights, and order management.',
  },
  {
    icon: Truck,
    title: 'Pan-India Shipping',
    desc: 'Reliable, tracked B2B shipping across all 28 states and 8 union territories. Bulk packaging with your brand labels available.',
  },
  {
    icon: Star,
    title: 'Exclusive Styles',
    desc: 'Wholesale partners get first access to new collections and exclusive designs not available in our retail catalogue.',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    desc: 'Every batch is quality-inspected before dispatch. We stand behind our craftsmanship with a no-questions-asked replacement policy.',
  },
];

const tiers = [
  {
    label: 'Starter',
    range: '6–11 pcs',
    discount: '22%',
    features: ['Access to full catalogue', 'Standard packaging', 'Email support', '7-day dispatch'],
    color: '#A89E94',
    popular: false,
  },
  {
    label: 'Partner',
    range: '12–23 pcs',
    discount: '30%',
    features: ['Access to full catalogue', 'Custom packaging', 'Priority support', '5-day dispatch', 'Exclusive styles preview'],
    color: '#D4AF37',
    popular: true,
  },
  {
    label: 'Premium',
    range: '24+ pcs',
    discount: '38%',
    features: ['Access to full catalogue', 'Branded packaging', 'Dedicated manager', '3-day dispatch', 'Exclusive styles preview', 'Custom label options'],
    color: '#1B2A6B',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Priya Malhotra',
    business: 'Priya\'s Fashion, Delhi',
    text: 'Shirin\'s Boutique transformed my business. The quality is unmatched and my customers keep coming back for more. Sales have increased by 40% since I switched.',
    rating: 5,
  },
  {
    name: 'Meena Krishnan',
    business: 'Silk Route, Chennai',
    text: 'The wholesale program is genuinely boutique-friendly. Low MOQ, excellent packaging, and the team is always responsive. Couldn\'t ask for a better supplier.',
    rating: 5,
  },
  {
    name: 'Anjali Shah',
    business: 'Rang Boutique, Ahmedabad',
    text: 'The Banarasi and organza collections are absolutely stunning. My premium customers love the exclusivity. The Partner tier is worth every rupee.',
    rating: 5,
  },
];

export default function WholesalePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <div className="relative h-72 lg:h-96 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Wholesale Program"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,42,107,0.85) 0%, rgba(27,42,107,0.6) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-montserrat tracking-[0.35em] uppercase text-white/60 mb-3"
          >
            B2B · Boutiques & Retailers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-playfair text-4xl lg:text-6xl text-white mb-4"
          >
            Wholesale Program
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[14px] font-montserrat text-white/70 max-w-lg"
          >
            Partner with India&apos;s most trusted ethnic wear brand. Premium margins, low MOQ, and dedicated support for your boutique.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setEnquiryOpen(true)}
            className="mt-6 bg-white font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 rounded hover:bg-white/90 transition-all"
            style={{ color: '#1B2A6B' }}
          >
            Apply Now — It&apos;s Free
          </motion.button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: '#1B2A6B' }} className="py-8">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Partner Boutiques' },
              { value: '₹2Cr+', label: 'Wholesale Orders Monthly' },
              { value: '120+', label: 'Artisan Families' },
              { value: '28', label: 'States Served' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-playfair text-3xl lg:text-4xl text-white mb-1">{stat.value}</p>
                <p className="text-[11px] font-montserrat tracking-[0.12em] uppercase text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-20 lg:py-24" style={{ background: '#F7F2EA' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-3">
              Why Partner With Us
            </p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-ink">
              Everything Your Boutique Needs
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="bg-surface rounded-2xl p-6 shadow-sm border border-taupe/10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}
                >
                  <b.icon size={18} style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="font-playfair text-lg text-ink mb-2">{b.title}</h3>
                <p className="text-[13px] font-montserrat text-taupe leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-20 lg:py-24" style={{ background: '#1A1A1A' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-3">
              Bulk Pricing
            </p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-ivory">
              Pricing Tiers
            </h2>
            <p className="text-[13px] font-montserrat text-ivory/50 mt-3 max-w-md mx-auto">
              Illustrative discount percentages off retail price. Contact us for exact product pricing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.label}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: `2px solid ${tier.popular ? tier.color : 'rgba(168,158,148,0.2)'}`,
                  background: tier.popular ? 'rgba(212,175,55,0.05)' : 'rgba(247,242,234,0.04)',
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {tier.popular && (
                  <div
                    className="absolute top-0 inset-x-0 py-1.5 text-center text-[10px] font-montserrat font-bold tracking-[0.15em] uppercase"
                    style={{ background: '#D4AF37', color: '#1A1A1A' }}
                  >
                    Most Popular
                  </div>
                )}
                <div className={`p-8 ${tier.popular ? 'pt-10' : ''}`}>
                  <p className="text-[11px] font-montserrat tracking-[0.2em] uppercase mb-1" style={{ color: tier.color }}>
                    {tier.label}
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-playfair text-5xl text-ivory">{tier.discount}</span>
                    <span className="text-[12px] font-montserrat text-ivory/50">off retail</span>
                  </div>
                  <p className="text-[12px] font-montserrat text-ivory/50 mb-6">{tier.range} per style</p>
                  <ul className="space-y-2.5 mb-8">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                        <span className="text-[12px] font-montserrat text-ivory/70">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="w-full py-3 text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase rounded-lg transition-all"
                    style={{
                      background: tier.popular ? '#D4AF37' : 'transparent',
                      color: tier.popular ? '#1A1A1A' : tier.color,
                      border: `2px solid ${tier.color}`,
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24" style={{ background: '#F7F2EA' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl lg:text-4xl text-ink">
              What Our Partners Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-surface rounded-2xl p-6 shadow-sm border border-taupe/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="#D4AF37" className="text-gold" />
                  ))}
                </div>
                <p className="text-[13px] font-montserrat text-taupe leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-[13px] font-montserrat font-semibold text-ink">{t.name}</p>
                  <p className="text-[11px] font-montserrat text-taupe">{t.business}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section with enquiry form */}
      <section className="py-20 lg:py-24" style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #2a3d8f 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl lg:text-5xl text-white mb-4">
              Ready to Partner?
            </h2>
            <p className="text-[14px] font-montserrat text-white/60 max-w-lg mx-auto mb-8">
              Join 500+ boutiques already growing their business with Shirin&apos;s Boutique. Application review within 24 hours.
            </p>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="inline-flex items-center gap-2 bg-gold text-ink font-montserrat font-bold text-[13px] tracking-[0.1em] uppercase px-10 py-5 rounded-lg hover:bg-gold/90 transition-all shadow-lg shadow-gold/20"
            >
              Apply for Wholesale Account →
            </button>
          </motion.div>
        </div>
      </section>

      <WholesaleEnquiryForm isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
