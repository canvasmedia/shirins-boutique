'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuProps {
  isOpen: boolean;
  category: 'sarees' | 'suits';
  onClose: () => void;
}

const sareeItems = [
  { name: 'Silk Sarees', slug: 'silk-sarees' },
  { name: 'Cotton Sarees', slug: 'cotton-sarees' },
  { name: 'Designer Sarees', slug: 'designer-sarees' },
  { name: 'Banarasi Sarees', slug: 'banarasi-sarees' },
  { name: 'Organza Sarees', slug: 'organza-sarees' },
  { name: 'Bridal Sarees', slug: 'bridal-sarees' },
  { name: 'Party Wear', slug: 'party-wear-sarees' },
];

const suitItems = [
  { name: 'Anarkali Suits', slug: 'anarkali-suits' },
  { name: 'Straight Suits', slug: 'straight-suits' },
  { name: 'Palazzo Suits', slug: 'palazzo-suits' },
  { name: 'Embroidered Sets', slug: 'embroidered-sets' },
  { name: 'Party Wear Sets', slug: 'party-wear-sets' },
  { name: 'Unstitched', slug: 'unstitched' },
];

const featuredImages = {
  sarees: {
    url: 'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'New Arrivals',
    link: '/collections/new-arrivals',
  },
  suits: {
    url: 'https://images.pexels.com/photos/18194539/pexels-photo-18194539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'Party Collection',
    link: '/collections/suits',
  },
};

export default function MegaMenu({ isOpen, category, onClose }: MegaMenuProps) {
  const items = category === 'sarees' ? sareeItems : suitItems;
  const featured = featuredImages[category];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 bg-surface shadow-lg z-50 mega-menu border-t border-gold/20"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          onMouseLeave={onClose}
        >
          <div className="max-w-[1280px] mx-auto px-16 py-8 flex gap-12">
            {/* Links columns */}
            <div className="flex gap-12 flex-1">
              <div>
                <p className="text-[10px] font-montserrat tracking-[0.2em] uppercase text-taupe mb-4 border-b border-taupe/20 pb-2">
                  {category === 'sarees' ? 'Browse Sarees' : 'Browse Suits'}
                </p>
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <motion.li
                      key={item.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={`/collections/${category}`}
                        onClick={onClose}
                        className="text-[13px] font-montserrat text-ink hover:text-gold transition-colors gold-underline py-0.5"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-taupe/20">
                  <Link
                    href={`/collections/${category}`}
                    onClick={onClose}
                    className="text-[11px] font-montserrat tracking-[0.12em] uppercase text-gold hover:text-ink transition-colors"
                  >
                    View All {category === 'sarees' ? 'Sarees' : 'Suits'} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured tile */}
            <motion.div
              className="flex-shrink-0 w-[200px]"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.25 }}
            >
              <Link href={featured.link} onClick={onClose}>
                <div className="relative overflow-hidden rounded-xl group">
                  <Image
                    src={featured.url}
                    alt={featured.label}
                    width={200}
                    height={240}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-ivory text-[11px] font-montserrat tracking-[0.12em] uppercase">{featured.label}</p>
                    <p className="text-gold text-[10px] font-montserrat mt-0.5">Shop Now →</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
