'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navStructure = [
  { label: 'Home', href: '/' },
  {
    label: 'Sarees', href: '/collections/sarees',
    sub: [
      '— Silk Sarees —',
      'Gadwal Silk', 'Kanchipuram Silk', 'Sico', 'Jamdani',
      'Modal Silk', 'Tasar Silk', 'Bishnupuri Silk', 'Katan Banarasi',
      '— Cotton & Linen Sarees —',
      'Donekhali Tant', 'Linen Sarees',
      '— Designer Sarees —',
      'Zardosi Work Collection',
    ],
    subHrefs: [
      null,
      '/collections/sarees-silk-gadwal', '/collections/sarees-silk-kanchipuram',
      '/collections/sarees-silk-sico', '/collections/sarees-silk-jamdani',
      '/collections/sarees-silk-modal', '/collections/sarees-silk-tasar',
      '/collections/sarees-silk-bishnupuri', '/collections/sarees-silk-katan-banarasi',
      null,
      '/collections/sarees-cotton-donekhali-tant', '/collections/sarees-cotton-linen',
      null,
      '/collections/sarees-designer-zardosi',
    ],
  },
  {
    label: 'Salwar Suits', href: '/collections/suits',
    sub: [
      'Cotton Suits', 'Tissue Suits', 'Modal Suits',
      'Chiffon/Chinon Suits', 'Crepe Suits', 'Designer Suits',
      'Indo-Western Collection',
    ],
    subHrefs: [
      '/collections/suits-cotton', '/collections/suits-tissue', '/collections/suits-modal',
      '/collections/suits-chiffon-chinon', '/collections/suits-crepe',
      '/collections/suits-designer', '/collections/suits-indo-western',
    ],
  },
  {
    label: 'Lehenga', href: '/collections/lehengas',
    sub: ['Bridal & Festive Lehenga'],
    subHrefs: ['/collections/lehengas-bridal-festive'],
  },
  {
    label: 'Shop by Fabric', href: '/collections/fabric-silk',
    sub: ['Silk', 'Cotton', 'Georgette', 'Organza', 'Velvet', 'Chiffon'],
    subHrefs: ['/collections/fabric-silk', '/collections/fabric-cotton', '/collections/fabric-georgette', '/collections/fabric-organza', '/collections/fabric-velvet', '/collections/fabric-chiffon'],
  },
  {
    label: 'Shop by Occasion', href: '/collections/occasion-bridal',
    sub: ['Bridal', 'Party', 'Festive', 'Work'],
    subHrefs: ['/collections/occasion-bridal', '/collections/occasion-party', '/collections/occasion-festive', '/collections/occasion-work'],
  },
  { label: 'Jewellery & Accessories', href: '/collections/jewellery-accessories' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Sale', href: '/collections/sale', isRed: true },
];

const helpLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Wholesale Platform', href: '/wholesale' },
];

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink/40 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[90vw] bg-ivory z-50 lg:hidden flex flex-col shadow-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-taupe/20">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5 group">
                <div className="relative flex-shrink-0" style={{ width: 44, height: 44 }}>
                  <Image src="/shirins_bout_logonew-removebg-preview.png" alt="Shirin's Boutique Logo" fill className="object-contain" />
                </div>
                <div>
                  <p className="font-playfair text-sm text-ink">SHIRIN&apos;S BOUTIQUE</p>
                  <p className="text-[8px] font-montserrat tracking-[0.2em] uppercase text-taupe">Elegance · Ethnic · You</p>
                </div>
              </Link>
              <button onClick={onClose} className="text-ink hover:text-gold transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="px-2">
                {navStructure.map((item) => (
                  <li key={item.label}>
                    {item.sub ? (
                      <div>
                        <button
                          onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-montserrat tracking-[0.06em] uppercase text-ink hover:text-gold transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${expanded === item.label ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {expanded === item.label && (
                            <motion.ul
                              className="ml-4 border-l-2 border-gold/30 pl-4 pb-2"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              {item.sub.map((sub, i) => {
                                const href = item.subHrefs?.[i];
                                const isHeading = href === null || (href === undefined && sub.startsWith('—'));
                                if (isHeading) {
                                  return (
                                    <li key={sub}>
                                      <p className="pt-3 pb-1 text-[9px] font-montserrat tracking-[0.18em] uppercase text-gold font-semibold">
                                        {sub.replace(/^—\s*/, '').replace(/\s*—$/, '')}
                                      </p>
                                    </li>
                                  );
                                }
                                return (
                                  <li key={sub}>
                                    <Link
                                      href={href || item.href}
                                      onClick={onClose}
                                      className="flex items-center gap-1 py-2 text-[12px] font-montserrat text-taupe hover:text-gold transition-colors"
                                    >
                                      <ChevronRight size={10} />
                                      {sub}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`block px-4 py-3 text-[13px] font-montserrat tracking-[0.06em] uppercase transition-colors ${
                          item.isRed ? 'text-rose hover:text-rose/70' : 'text-ink hover:text-gold'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                    <div className="mx-4 h-px bg-taupe/15" />
                  </li>
                ))}
              </ul>

              {/* Help links */}
              <div className="px-6 mt-4 pt-4 border-t border-taupe/20">
                <p className="text-[10px] font-montserrat tracking-[0.18em] uppercase text-taupe mb-3">
                  Help & Info
                </p>
                <ul className="space-y-2">
                  {helpLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="text-[12px] font-montserrat text-ink hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer strip */}
            <div className="px-5 py-3 border-t border-taupe/20 bg-ink/5">
              <p className="text-[10px] font-montserrat tracking-[0.08em] text-taupe text-center">
                Free Shipping · COD Available · Easy Returns
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
