'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuProps {
  isOpen: boolean;
  category: 'sarees' | 'suits' | 'lehenga';
  onClose: () => void;
}

interface SubItem {
  name: string;
  slug: string;
}

interface CategoryGroup {
  title: string;
  items: SubItem[];
}

const sareeGroups: CategoryGroup[] = [
  {
    title: 'Silk Sarees',
    items: [
      { name: 'Gadwal Silk', slug: 'sarees-silk-gadwal' },
      { name: 'Kanchipuram Silk', slug: 'sarees-silk-kanchipuram' },
      { name: 'Sico', slug: 'sarees-silk-sico' },
      { name: 'Jamdani', slug: 'sarees-silk-jamdani' },
      { name: 'Modal Silk', slug: 'sarees-silk-modal' },
      { name: 'Tasar Silk', slug: 'sarees-silk-tasar' },
      { name: 'Bishnupuri Silk', slug: 'sarees-silk-bishnupuri' },
      { name: 'Katan Banarasi', slug: 'sarees-silk-katan-banarasi' },
    ],
  },
  {
    title: 'Cotton & Linen Sarees',
    items: [
      { name: 'Donekhali Tant', slug: 'sarees-cotton-donekhali-tant' },
      { name: 'Linen Sarees', slug: 'sarees-cotton-linen' },
    ],
  },
  {
    title: 'Designer Sarees',
    items: [
      { name: 'Zardosi Work Collection', slug: 'sarees-designer-zardosi' },
    ],
  },
];

const suitGroups: CategoryGroup[] = [
  {
    title: 'Salwar Suits',
    items: [
      { name: 'Cotton Suits', slug: 'suits-cotton' },
      { name: 'Tissue Suits', slug: 'suits-tissue' },
      { name: 'Modal Suits', slug: 'suits-modal' },
      { name: 'Chiffon/Chinon Suits', slug: 'suits-chiffon-chinon' },
      { name: 'Crepe Suits', slug: 'suits-crepe' },
      { name: 'Designer Suits', slug: 'suits-designer' },
      { name: 'Indo-Western Collection', slug: 'suits-indo-western' },
    ],
  },
];

const lehengaGroups: CategoryGroup[] = [
  {
    title: 'Lehenga',
    items: [
      { name: 'Bridal & Festive Lehenga', slug: 'lehengas-bridal-festive' },
    ],
  },
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
  lehenga: {
    url: 'https://images.pexels.com/photos/2814808/pexels-photo-2814808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'Bridal Collection',
    link: '/collections/lehengas',
  },
};

export default function MegaMenu({ isOpen, category, onClose }: MegaMenuProps) {
  const groups =
    category === 'sarees'
      ? sareeGroups
      : category === 'suits'
      ? suitGroups
      : lehengaGroups;
  const featured = featuredImages[category];

  const viewAllHref =
    category === 'sarees' ? '/collections/sarees' :
    category === 'suits' ? '/collections/suits' :
    '/collections/lehengas';

  const viewAllLabel =
    category === 'sarees' ? 'Sarees' :
    category === 'suits' ? 'Suits' :
    'Lehengas';

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
            {/* Grouped columns */}
            <div className="flex gap-10 flex-1 flex-wrap">
              {groups.map((group, gi) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.06, duration: 0.22 }}
                  className="min-w-[160px]"
                >
                  <p className="text-[10px] font-montserrat tracking-[0.2em] uppercase text-gold mb-3 border-b border-gold/25 pb-1.5 font-semibold">
                    {group.title}
                  </p>
                  <ul className="space-y-2.5">
                    {group.items.map((item, i) => (
                      <motion.li
                        key={item.slug}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: gi * 0.06 + i * 0.03, duration: 0.18 }}
                      >
                        <Link
                          href={`/collections/${item.slug}`}
                          onClick={onClose}
                          className="text-[12.5px] font-montserrat text-ink hover:text-gold transition-colors gold-underline py-0.5 leading-snug block"
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Right: View All + Featured tile */}
            <div className="flex flex-col justify-between flex-shrink-0">
              <div className="mb-4">
                <Link
                  href={viewAllHref}
                  onClick={onClose}
                  className="text-[11px] font-montserrat tracking-[0.12em] uppercase text-gold hover:text-ink transition-colors"
                >
                  View All {viewAllLabel} →
                </Link>
              </div>

              <motion.div
                className="w-[180px]"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.25 }}
              >
                <Link href={featured.link} onClick={onClose}>
                  <div className="relative overflow-hidden rounded-xl group">
                    <Image
                      src={featured.url}
                      alt={featured.label}
                      width={180}
                      height={220}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
