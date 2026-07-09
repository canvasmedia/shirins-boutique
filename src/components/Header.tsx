'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/lib/context';
import BookFlipToggle from './BookFlipToggle';
import MegaMenu from './MegaMenu';
import MobileNavDrawer from './MobileNavDrawer';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Sarees', href: '/collections/sarees', hasDropdown: true, key: 'sarees' },
  { label: 'Suits', href: '/collections/suits', hasDropdown: true, key: 'suits' },
  { label: 'Lehengas', href: '/collections/lehengas' },
  { label: 'Kurtis & Tunics', href: '/collections/kurtis-tunics' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Sale', href: '/collections/sale', isRed: true },
];

const secondaryNavItems = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Track Order', href: '/contact' },
  { label: 'Wholesale Program', href: '/wholesale', isGold: true },
];

export default function Header() {
  const { mode, cartCount, wishlistCount } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<'sarees' | 'suits' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const handleNavEnter = (key?: string) => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    if (key === 'sarees' || key === 'suits') {
      setActiveMega(key as 'sarees' | 'suits');
    }
  };

  const handleNavLeave = () => {
    megaTimerRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  const isWholesale = mode === 'wholesale';

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-400 ${
          scrolled ? 'glass-header-solid' : 'glass-header'
        } ${isWholesale ? 'wholesale-accent-line' : ''}`}
      >
        {/* Main header row */}
        <div className="max-w-[1280px] mx-auto px-4 lg:px-16">
          <div className="flex items-center py-3 gap-4">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-ink hover:text-gold transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={24} />
            </button>

            {/* Logo — Center */}
            <div className="flex-1 flex justify-center lg:justify-start items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
                  <Image
                    src="/logo.png"
                    alt="Shirin's Boutique Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-playfair text-xl tracking-[0.06em] text-ink leading-none"
                    >
                      SHIRIN&apos;S BOUTIQUE
                    </span>
                    {isWholesale && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-montserrat tracking-[0.15em] uppercase px-2 py-0.5 rounded-full text-white"
                        style={{ background: '#1B2A6B' }}
                      >
                        WHOLESALE
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="h-px flex-1" style={{ background: '#D4AF37', maxWidth: 20 }} />
                    <p className="text-[9px] font-montserrat tracking-[0.22em] uppercase text-taupe">
                      Elegance · Ethnic · You
                    </p>
                    <div className="h-px flex-1" style={{ background: '#D4AF37', maxWidth: 20 }} />
                  </div>
                </div>
              </Link>
            </div>

            {/* Search bar — desktop */}
            <div className="hidden lg:flex flex-1 max-w-md relative">
              <div className="flex items-center w-full bg-ivory border border-taupe/30 rounded-md px-3 py-2 gap-2 focus-within:border-gold transition-colors">
                <Search size={14} className="text-taupe flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for Sarees, Suits, Lehengas..."
                  className="flex-1 bg-transparent text-[13px] font-montserrat text-ink placeholder-taupe outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Mobile search */}
              <button
                className="lg:hidden text-ink hover:text-gold transition-colors p-1"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Book flip toggle */}
              <BookFlipToggle />

              {/* Wishlist */}
              <Link href="/cart" className="relative p-1 text-ink hover:text-gold transition-colors">
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose text-white text-[9px] flex items-center justify-center font-montserrat font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-1 text-ink hover:text-gold transition-colors">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-ink text-[9px] flex items-center justify-center font-montserrat font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                className="lg:hidden pb-3 flex items-center gap-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="flex items-center flex-1 bg-ivory border border-taupe/30 rounded-md px-3 py-2 gap-2 focus-within:border-gold transition-colors">
                  <Search size={14} className="text-taupe flex-shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search for Sarees, Suits..."
                    className="flex-1 bg-transparent text-[13px] font-montserrat text-ink placeholder-taupe outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => setSearchOpen(false)}>
                    <X size={14} className="text-taupe hover:text-ink" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full horizontal nav — desktop only */}
          <nav
            className="hidden lg:block border-t border-taupe/15 relative"
            onMouseLeave={handleNavLeave}
          >
            <ul className="flex items-center justify-center gap-6 py-3">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleNavEnter(item.key)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-[12px] font-montserrat tracking-[0.1em] uppercase font-medium transition-colors duration-200 relative group ${
                      item.isRed ? 'text-rose hover:text-rose/80' : 'text-ink hover:text-gold'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown size={11} className="opacity-60" />}
                    {/* Active underline */}
                    <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mega menus */}
            {(activeMega === 'sarees' || activeMega === 'suits') && (
              <MegaMenu
                isOpen={!!activeMega}
                category={activeMega}
                onClose={() => setActiveMega(null)}
              />
            )}

            {/* Secondary nav row */}
            <div
              className={`border-t py-1.5 flex items-center justify-center gap-6 ${
                isWholesale ? 'border-wholesale/20' : 'border-taupe/10'
              }`}
            >
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[10px] font-montserrat tracking-[0.1em] uppercase transition-colors relative ${
                    item.isGold
                      ? 'text-gold font-semibold border-b border-gold pb-0.5'
                      : 'text-taupe hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <MobileNavDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
