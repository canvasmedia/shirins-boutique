'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 3.9v2.9H7.8V15h2.4v6h3.3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3l7.3 9.6L4.4 21h2l6-6.9 5 6.9h3l-7.6-10 6.4-8.5h-2l-5.5 6.3L9.5 3H4z" />
    </svg>
  );
}

const shopLinks = [
  { label: 'Sarees', href: '/collections/sarees' },
  { label: 'Suits', href: '/collections/suits' },
  { label: 'Indo-Western', href: '/collections/indo-western' },
  { label: 'Lehengas', href: '/collections/lehengas' },
  { label: 'Kurtis & Tunics', href: '/collections/kurtis-tunics' },
  { label: 'Jewellery & Accessories', href: '/collections/jewellery-accessories' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Sale', href: '/collections/sale' },
];

const socialLinks = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
  { label: 'X (Twitter)', Icon: XIcon },
];

const helpLinks = [
  { label: 'Track Order', href: '/contact' },
  { label: 'Returns & Exchanges', href: '/contact' },
  { label: 'Shipping Policy', href: '/contact' },
  { label: 'FAQs', href: '/contact' },
];

const aboutLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Wholesale Program', href: '/wholesale' },
];

const paymentIcons = ['VISA', 'MC', 'UPI', 'GPay', 'PayTM', 'RazorPay'];

function FooterAccordion({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ivory/10 md:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 md:py-0 md:pointer-events-none"
      >
        <p className="text-[11px] font-montserrat tracking-[0.2em] uppercase text-gold font-semibold">{title}</p>
        <ChevronDown
          size={14}
          className={`text-taupe transition-transform duration-200 md:hidden ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {(open || true) && (
          <motion.ul
            className="space-y-2.5 mt-4 hidden md:block"
          >
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[12px] font-montserrat text-ivory/60 hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {/* Mobile accordion */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="space-y-2.5 pb-4 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[12px] font-montserrat text-ivory/60 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: '#1A1A1A' }} className="text-ivory">
      {/* Main footer */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
                <Image src="/shirins_bout_logonew-removebg-preview.png" alt="Shirin's Boutique Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="font-playfair text-base tracking-[0.06em] text-ivory">SHIRIN&apos;S BOUTIQUE</p>
                <p className="text-[8px] font-montserrat tracking-[0.2em] uppercase text-taupe mt-0.5">
                  Elegance · Ethnic · You
                </p>
              </div>
            </Link>
            <p className="text-[12px] font-montserrat text-ivory/50 leading-relaxed mb-5">
              Curating the finest Indian ethnic wear — from heirloom silks to everyday elegance. Rooted in tradition, crafted for today.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full border border-ivory/20 flex items-center justify-center text-ivory/60 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <FooterAccordion title="Shop" links={shopLinks} />
          </div>

          {/* Help links */}
          <div>
            <FooterAccordion title="Help" links={helpLinks} />
          </div>

          {/* About + Newsletter */}
          <div>
            <FooterAccordion title="About" links={aboutLinks} />

            {/* Newsletter */}
            <div className="mt-6 pt-4 border-t border-ivory/10">
              <p className="text-[11px] font-montserrat tracking-[0.2em] uppercase text-gold font-semibold mb-2">
                Newsletter
              </p>
              <p className="text-[11px] font-montserrat text-ivory/50 mb-3">
                New arrivals, festive edits, and exclusive offers.
              </p>
              {submitted ? (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[12px] font-montserrat text-gold"
                >
                  ✓ Thank you for subscribing!
                </motion.p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-ivory/10 border border-ivory/20 rounded px-3 py-2 text-[12px] font-montserrat text-ivory placeholder-ivory/30 outline-none focus:border-gold transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gold text-ink text-[11px] font-montserrat font-semibold tracking-wide rounded hover:bg-gold/90 transition-colors"
                  >
                    →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-montserrat text-ivory/40">
            {`© ${new Date().getFullYear()} Shirin's Boutique. All rights reserved.`}
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {paymentIcons.map((icon) => (
              <div
                key={icon}
                className="px-2 py-1 border border-ivory/15 rounded text-[9px] font-montserrat tracking-wide text-ivory/40"
              >
                {icon}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Link href="/contact" className="text-[10px] font-montserrat text-ivory/30 hover:text-ivory/60 transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-[10px] font-montserrat text-ivory/30 hover:text-ivory/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
