'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterBand() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F7F2EA 0%, #ede5d8 100%)' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #C08A8A, transparent)' }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-3">
            Stay In The Loop
          </p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-ink mb-4">
            New Arrivals, Festive Edits
            <br />
            & Exclusive Offers
          </h2>
          <p className="text-[14px] font-montserrat text-taupe mb-8 max-w-md mx-auto">
            Be the first to know about our latest collections, artisan stories, and members-only sales.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-gold/10 border border-gold/30 px-8 py-4 rounded-lg"
            >
              <span className="text-gold text-lg">✓</span>
              <p className="text-[14px] font-montserrat font-semibold text-ink">
                Welcome! You&apos;re now part of Shirin&apos;s circle.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-surface border-2 border-taupe/20 rounded-md px-5 py-3.5 text-[13px] font-montserrat text-ink placeholder-taupe outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-ink text-gold text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase px-8 py-3.5 rounded-md hover:bg-ink/90 transition-colors whitespace-nowrap"
              >
                Subscribe →
              </button>
            </form>
          )}

          <p className="text-[10px] font-montserrat text-taupe mt-4">
            No spam. Unsubscribe anytime. Your privacy is respected.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
