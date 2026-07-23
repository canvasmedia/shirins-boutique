'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/lib/context';
import MegaMenu from './MegaMenu';
import SimpleMegaMenu from './SimpleMegaMenu';
import MobileNavDrawer from './MobileNavDrawer';
import { occasions, fabricTypes } from '@/lib/mockData';
import { SHOPIFY_ACCOUNT_URL } from '@/lib/shopify';

type MegaKey = 'sarees' | 'suits' | 'lehenga' | 'occasion' | 'fabric';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  key?: MegaKey;
  isRed?: boolean;
  isGold?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Sarees', href: '/collections/sarees', hasDropdown: true, key: 'sarees' },
  { label: 'Salwar Suits', href: '/collections/suits', hasDropdown: true, key: 'suits' },
  { label: 'Lehenga', href: '/collections/lehengas', hasDropdown: true, key: 'lehenga' },
  { label: 'Shop by Fabric', href: '/collections/fabric-silk', hasDropdown: true, key: 'fabric' },
  { label: 'Shop by Occasion', href: '/collections/occasion-bridal', hasDropdown: true, key: 'occasion' },
  { label: 'Jewellery & Accessories', href: '/collections/jewellery-accessories' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Sale', href: '/collections/sale', isRed: true },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Wholesale Platform', href: '/wholesale', isGold: true },
];

export default function Header() {
  const { mode, cartCount, wishlistCount } = useSite();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navScrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const handleNavEnter = (key?: MegaKey) => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    if (key) setActiveMega(key);
  };

  const handleNavLeave = () => {
    megaTimerRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  const isWholesale = mode === 'wholesale';

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const scrollNav = (dir: 'left' | 'right') => {
    const el = navScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 200 : -200, behavior: 'smooth' });
  };

  const onNavScroll = () => {
    const el = navScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const isItemActive = (item: NavItem) => {
    if (item.key === 'occasion') return pathname.startsWith('/collections/occasion-');
    if (item.key === 'fabric') return pathname.startsWith('/collections/fabric-');
    if (item.href === '/') return pathname === '/';
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-400 ${
          scrolled ? 'glass-header-solid' : 'glass-header'
        } ${isWholesale ? 'wholesale-accent-line' : ''}`}
      >
        {/* Main header row */}
        <div className="max-w-[1280px] mx-auto px-4 lg:px-16">
          <div className="relative flex items-center justify-between gap-2 py-3 lg:justify-start lg:gap-4">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-ink hover:text-gold transition-colors p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center relative"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Logo — absolutely centered on mobile (regardless of side icon widths), left-aligned on desktop */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:left-auto lg:top-auto lg:translate-x-0 lg:translate-y-0 lg:flex-1 flex items-center justify-start gap-3">
              <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 group" aria-label="Shirin's Boutique — go to homepage">
                <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
                  <Image
                    src="/shirins_bout_logonew-removebg-preview.png"
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
              <form onSubmit={submitSearch} className="flex items-center w-full bg-ivory border border-taupe/30 rounded-md px-3 py-2 gap-2 focus-within:border-gold transition-colors">
                <label htmlFor="site-search-desktop" className="sr-only">Search products</label>
                <button type="submit" aria-label="Search" className="text-taupe flex-shrink-0 hover:text-gold transition-colors">
                  <Search size={14} />
                </button>
                <input
                  id="site-search-desktop"
                  type="text"
                  placeholder="Search for Sarees, Suits, Indo-Western..."
                  className="flex-1 bg-transparent text-[13px] font-montserrat text-ink placeholder-taupe outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Right icons */}
            <div className="flex items-center justify-end gap-1 lg:gap-3">
              {/* Mobile search */}
              <button
                className="lg:hidden text-ink hover:text-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                <Search size={20} />
              </button>

              {/* Account — Shopify-hosted login */}
              <a href={SHOPIFY_ACCOUNT_URL} className="hidden lg:flex relative p-1 text-ink hover:text-gold transition-colors min-w-[44px] min-h-[44px] items-center justify-center" aria-label="Account">
                <User size={22} />
              </a>

              {/* Wishlist — hidden on mobile so the logo stays centered */}
              <Link href="/wishlist" className="hidden lg:flex relative p-1 text-ink hover:text-gold transition-colors min-w-[44px] min-h-[44px] items-center justify-center" aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}>
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose text-white text-[9px] flex items-center justify-center font-montserrat font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account — mobile, Shopify-hosted login */}
              <a href={SHOPIFY_ACCOUNT_URL} className="lg:hidden relative p-1 text-ink hover:text-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Account">
                <User size={20} />
              </a>

              {/* Cart */}
              <Link href="/cart" className="relative p-1 text-ink hover:text-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label={`Cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}>
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
                className="lg:hidden pb-3"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <form onSubmit={submitSearch} className="flex items-center flex-1 bg-ivory border border-taupe/30 rounded-md px-3 py-2 gap-2 focus-within:border-gold transition-colors">
                  <label htmlFor="site-search-mobile" className="sr-only">Search products</label>
                  <button type="submit" aria-label="Search" className="text-taupe flex-shrink-0">
                    <Search size={14} />
                  </button>
                  <input
                    id="site-search-mobile"
                    ref={searchRef}
                    type="text"
                    placeholder="Search for Sarees, Suits..."
                    className="flex-1 bg-transparent text-[13px] font-montserrat text-ink placeholder-taupe outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="p-1">
                    <X size={14} className="text-taupe hover:text-ink" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full horizontal nav — desktop only, single scrollable row */}
          <nav
            className="hidden lg:block border-t border-taupe/15 relative"
            onMouseLeave={handleNavLeave}
          >
            <div className="flex items-center">
              <button
                onClick={() => scrollNav('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll navigation left"
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-taupe hover:text-gold transition-colors disabled:opacity-0 disabled:pointer-events-none"
              >
                <ChevronLeft size={16} />
              </button>

              <ul
                ref={navScrollRef}
                onScroll={onNavScroll}
                className="flex items-center gap-6 py-3 flex-1 overflow-x-auto carousel-container"
                style={{ scrollbarWidth: 'none' }}
              >
                {navItems.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <li
                      key={item.label}
                      className="relative flex-shrink-0"
                      onMouseEnter={() => handleNavEnter(item.key)}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-1 text-[12px] font-montserrat tracking-[0.1em] uppercase font-medium transition-colors duration-200 relative group whitespace-nowrap ${
                          item.isRed ? 'text-rose hover:text-rose/80' : item.isGold ? 'text-gold font-semibold' : 'text-ink hover:text-gold'
                        }`}
                      >
                        {item.label}
                        {item.hasDropdown && <ChevronDown size={11} className="opacity-60" />}
                        {/* Underline: persistent on active page, on hover otherwise */}
                        <span
                          className={`absolute -bottom-3 left-0 right-0 h-0.5 bg-gold origin-left transition-transform duration-300 ${
                            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={() => scrollNav('right')}
                disabled={!canScrollRight}
                aria-label="Scroll navigation right"
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-taupe hover:text-gold transition-colors disabled:opacity-0 disabled:pointer-events-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Mega menus */}
            {(activeMega === 'sarees' || activeMega === 'suits' || activeMega === 'lehenga') && (
              <MegaMenu
                isOpen={!!activeMega}
                category={activeMega as 'sarees' | 'suits' | 'lehenga'}
                onClose={() => setActiveMega(null)}
              />
            )}
            {activeMega === 'occasion' && (
              <SimpleMegaMenu
                title="Shop by Occasion"
                hrefPrefix="/collections/occasion-"
                items={occasions}
                onClose={() => setActiveMega(null)}
              />
            )}
            {activeMega === 'fabric' && (
              <SimpleMegaMenu
                title="Shop by Fabric"
                hrefPrefix="/collections/fabric-"
                items={fabricTypes}
                onClose={() => setActiveMega(null)}
              />
            )}
          </nav>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <MobileNavDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
