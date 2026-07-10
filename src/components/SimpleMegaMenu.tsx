'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface SimpleMegaMenuItem {
  slug: string;
  name: string;
  image: string;
  tagline?: string;
}

interface SimpleMegaMenuProps {
  title: string;
  hrefPrefix: string;
  items: SimpleMegaMenuItem[];
  onClose: () => void;
}

export default function SimpleMegaMenu({ title, hrefPrefix, items, onClose }: SimpleMegaMenuProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-full left-0 right-0 bg-surface shadow-lg z-50 mega-menu border-t border-gold/20"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        onMouseLeave={onClose}
      >
        <div className="max-w-[1280px] mx-auto px-16 py-8">
          <p className="text-[10px] font-montserrat tracking-[0.2em] uppercase text-taupe mb-5 border-b border-taupe/20 pb-2">
            {title}
          </p>
          <div className="grid grid-cols-4 gap-5">
            {items.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <Link href={`${hrefPrefix}${item.slug}`} onClick={onClose} className="group block">
                  <div className="relative overflow-hidden rounded-xl mb-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={140}
                      className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  </div>
                  <p className="text-[13px] font-montserrat font-semibold text-ink group-hover:text-gold transition-colors">
                    {item.name}
                  </p>
                  {item.tagline && (
                    <p className="text-[11px] font-montserrat text-taupe">{item.tagline}</p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
