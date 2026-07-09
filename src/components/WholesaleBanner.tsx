'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSite } from '@/lib/context';

export default function WholesaleBanner() {
  const { mode } = useSite();
  const [dismissed, setDismissed] = useState(false);

  if (mode !== 'wholesale' || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="wholesale-banner text-white relative overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0 animate-pulse" />
            <p className="text-[12px] font-montserrat text-white/90 truncate">
              Wholesale pricing is available to registered boutiques and retailers.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/wholesale"
              className="text-[11px] font-montserrat font-bold tracking-[0.08em] uppercase text-white border-b border-white/50 hover:border-white transition-colors whitespace-nowrap"
            >
              Apply for Account
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/50 hover:text-white transition-colors p-0.5"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
