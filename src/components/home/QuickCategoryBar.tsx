'use client';

import Link from 'next/link';
import { Shirt, Layers, Sparkles, Gem, Tag, Flower2 } from 'lucide-react';

const shortcuts = [
  { label: 'Sarees', href: '/collections/sarees', Icon: Layers },
  { label: 'Suits', href: '/collections/suits', Icon: Shirt },
  { label: 'Indo-Western', href: '/collections/indo-western', Icon: Sparkles },
  { label: 'Lehengas', href: '/collections/lehengas', Icon: Flower2 },
  { label: 'Jewellery', href: '/collections/jewellery-accessories', Icon: Gem },
  { label: 'Sale', href: '/collections/sale', Icon: Tag },
];

export default function QuickCategoryBar() {
  return (
    <nav aria-label="Quick category shortcuts" className="border-b border-taupe/15" style={{ background: '#F7F2EA' }}>
      <div className="max-w-[1280px] mx-auto px-4 lg:px-16">
        <ul className="flex overflow-x-auto gap-6 lg:gap-10 lg:justify-center py-4 carousel-container">
          {shortcuts.map(({ label, href, Icon }) => (
            <li key={label} className="flex-shrink-0">
              <Link
                href={href}
                className="flex flex-col items-center gap-1.5 min-w-[64px] min-h-[44px] group"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-taupe/25 group-hover:border-gold transition-colors">
                  <Icon size={16} className="text-ink group-hover:text-gold transition-colors" />
                </div>
                <span className="text-[10px] font-montserrat tracking-[0.06em] uppercase text-taupe group-hover:text-ink transition-colors whitespace-nowrap">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
