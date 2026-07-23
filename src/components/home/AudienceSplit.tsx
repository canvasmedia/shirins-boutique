'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShoppingBag,
  Briefcase,
  Package,
  TrendingUp,
  RefreshCw,
  Truck,
  Star,
  Users,
} from 'lucide-react';

const WHATSAPP_NUMBER = '919836380078';

const RETAIL_BADGES = [
  { icon: <RefreshCw size={13} />, label: '15-Day Returns' },
  { icon: <Truck size={13} />, label: 'Free Ship ₹2,999+' },
  { icon: <Star size={13} />, label: 'COD Available' },
];

const WHOLESALE_BADGES = [
  { icon: <Package size={13} />, label: 'MOQ from 6 pcs' },
  { icon: <TrendingUp size={13} />, label: 'Factory Pricing' },
  { icon: <Truck size={13} />, label: 'Pan-India Dispatch' },
];

export default function AudienceSplit() {
  const [hovered, setHovered] = useState<'retail' | 'wholesale' | null>(null);

  const retailFlex = hovered === 'retail' ? '65' : hovered === 'wholesale' ? '35' : '50';
  const wholesaleFlex = hovered === 'wholesale' ? '65' : hovered === 'retail' ? '35' : '50';

  return (
    <section aria-label="Shop for yourself or buy wholesale" className="relative">
      {/* Section header */}
      <div className="bg-ivory text-center px-4 pt-10 pb-6 sm:pt-12 sm:pb-8">
        <p className="font-montserrat text-[11px] tracking-[0.3em] uppercase text-gold font-bold mb-2">
          Who Are You Shopping For?
        </p>
        <h2 className="font-playfair text-3xl lg:text-5xl text-ink leading-tight">
          Choose Your Path
        </h2>
        <div
          className="w-12 h-0.5 mx-auto mt-4"
          style={{ background: 'linear-gradient(90deg, #D4AF37, #e5c158)' }}
        />
      </div>

      {/* Split panels */}
      <div
        className="audience-split-wrapper relative flex overflow-hidden"
        style={{ minHeight: '75vh' }}
      >
        {/* RETAIL PANEL */}
        <div
          className="audience-panel relative overflow-hidden cursor-pointer min-w-0"
          style={{ flex: retailFlex, transition: 'flex 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          onMouseEnter={() => setHovered('retail')}
          onMouseLeave={() => setHovered(null)}
        >
          <Image
            src="https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Retail shopper browsing ethnic wear"
            fill
            className="object-cover"
            style={{
              transform: hovered === 'retail' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)',
            }}
            sizes="50vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.55) 50%, rgba(26,26,26,0.20) 100%)',
            }}
          />

          {/* Pill badge */}
          <div className="absolute top-6 lg:top-8 left-6 lg:left-8 flex items-center gap-2 bg-gold/15 border border-gold px-4 py-1.5 backdrop-blur-sm">
            <ShoppingBag size={13} className="text-gold" />
            <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold font-bold">
              Retail Shoppers
            </span>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
            <div
              style={{
                opacity: hovered === 'wholesale' ? 0.7 : 1,
                transform: hovered === 'retail' ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.5s ease',
              }}
            >
              <h3 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight">
                SHOP FOR
                <br />
                <span className="text-gold">YOURSELF</span>
              </h3>
              <div
                className="w-14 h-0.5 my-4"
                style={{ background: 'linear-gradient(90deg, #D4AF37, #e5c158)' }}
              />
              <p className="text-ivory/80 font-montserrat text-[13px] sm:text-sm font-light max-w-[340px] leading-relaxed mb-7">
                Browse our full catalog of premium sarees, suits, lehengas &amp; kurtis. Order
                online, by call, or WhatsApp — with easy returns and doorstep delivery.
              </p>
              <Link
                href="/collections/new-arrivals"
                className="inline-flex items-center gap-2 bg-gold text-ink font-montserrat font-semibold px-7 py-3.5 hover:bg-gold/90 transition-colors"
              >
                Shop the Collection
                <ArrowRight size={16} />
              </Link>

              {/* Badges */}
              <div
                className="flex flex-wrap gap-2.5 mt-6"
                style={{ opacity: hovered === 'retail' ? 1 : 0.7, transition: 'opacity 0.4s ease' }}
              >
                {RETAIL_BADGES.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 backdrop-blur-sm"
                  >
                    <span className="text-gold">{b.icon}</span>
                    <span className="text-ivory/85 font-montserrat text-[11px] tracking-wide font-medium">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER DIVIDER */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[3px] pointer-events-none z-10 hidden md:block"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.6) 30%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.6) 70%, transparent 100%)',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full"
            style={{
              width: 48,
              height: 48,
              transform: 'translate(-50%, -50%)',
              background: '#D4AF37',
              boxShadow: '0 0 0 4px rgba(212,175,55,0.3), 0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            <span className="font-playfair text-ink text-lg" style={{ letterSpacing: '-0.05em' }}>
              S
            </span>
          </div>
        </div>

        {/* WHOLESALE PANEL */}
        <div
          className="audience-panel relative overflow-hidden cursor-pointer min-w-0"
          style={{ flex: wholesaleFlex, transition: 'flex 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          onMouseEnter={() => setHovered('wholesale')}
          onMouseLeave={() => setHovered(null)}
        >
          <Image
            src="https://images.pexels.com/photos/5872667/pexels-photo-5872667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt="Wholesale bulk fashion buying"
            fill
            className="object-cover"
            style={{
              transform: hovered === 'wholesale' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)',
            }}
            sizes="50vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(11,17,45,0.92) 0%, rgba(27,42,107,0.72) 50%, rgba(27,42,107,0.28) 100%)',
            }}
          />

          {/* Pill badge */}
          <div className="absolute top-6 lg:top-8 right-6 lg:right-8 flex items-center gap-2 bg-[#8fa3c0]/15 border border-[#8fa3c0]/60 px-4 py-1.5 backdrop-blur-sm">
            <Briefcase size={13} className="text-[#8fa3c0]" />
            <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#8fa3c0] font-bold">
              Wholesale Buyers
            </span>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
            <div
              style={{
                opacity: hovered === 'retail' ? 0.7 : 1,
                transform: hovered === 'wholesale' ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.5s ease',
              }}
            >
              <h3 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight">
                BUY TO
                <br />
                <span className="text-[#8fa3c0]">SELL</span>
              </h3>
              <div
                className="w-14 h-0.5 my-4"
                style={{ background: 'linear-gradient(135deg, #8fa3c0 0%, #c8d8f0 50%, #6b8ab0 100%)' }}
              />
              <p className="text-ivory/80 font-montserrat text-[13px] sm:text-sm font-light max-w-[340px] leading-relaxed mb-7">
                Grow your boutique with Shirin&apos;s bulk catalog. Factory-direct pricing,
                flexible MOQs, and seasonal lookbooks for retailers across India.
              </p>
              <div className="flex flex-nowrap gap-2 sm:gap-3">
                <Link
                  href="/wholesale"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 border border-[#8fa3c0]/70 text-[#c8d8f0] font-montserrat font-semibold text-[11px] sm:text-[13px] tracking-[0.04em] sm:tracking-[0.08em] uppercase px-4 sm:px-7 py-3 sm:py-3.5 transition-colors hover:bg-[#8fa3c0]/15 hover:border-[#c8d8f0] whitespace-nowrap min-w-0"
                >
                  <span className="sm:hidden">Wholesale Portal</span>
                  <span className="hidden sm:inline">View Wholesale Portal</span>
                  <ArrowRight size={15} className="flex-shrink-0" />
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Shirin%27s%20Boutique%2C%20I%20am%20interested%20in%20wholesale%20buying`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#25D366]/15 border border-[#25D366]/50 text-[#25D366] font-montserrat font-semibold text-[11px] sm:text-[13px] tracking-[0.04em] sm:tracking-[0.08em] uppercase px-4 sm:px-6 py-3 sm:py-3.5 transition-colors hover:bg-[#25D366]/25 whitespace-nowrap min-w-0"
                >
                  <span className="sm:hidden">WhatsApp</span>
                  <span className="hidden sm:inline">WhatsApp Enquiry</span>
                </a>
              </div>

              {/* Badges */}
              <div
                className="flex flex-wrap gap-2.5 mt-6"
                style={{ opacity: hovered === 'wholesale' ? 1 : 0.7, transition: 'opacity 0.4s ease' }}
              >
                {WHOLESALE_BADGES.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-1.5 bg-[#8fa3c0]/10 border border-[#8fa3c0]/25 px-3 py-1.5 backdrop-blur-sm"
                  >
                    <span className="text-[#8fa3c0]">{b.icon}</span>
                    <span className="text-ivory/85 font-montserrat text-[11px] tracking-wide font-medium">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="bg-ink px-4 sm:px-6 py-4 sm:py-5 flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-gold" />
          <span className="text-ivory/60 font-montserrat text-[11px] tracking-[0.12em] uppercase">
            <strong className="text-gold">10,000+</strong> happy customers
          </span>
        </div>
        <div className="w-px h-4 bg-gold/20" />
        <div className="flex items-center gap-2">
          <Package size={14} className="text-gold" />
          <span className="text-ivory/60 font-montserrat text-[11px] tracking-[0.12em] uppercase">
            <strong className="text-gold">500+</strong> wholesale partners
          </span>
        </div>
        <div className="w-px h-4 bg-gold/20" />
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-gold" />
          <span className="text-ivory/60 font-montserrat text-[11px] tracking-[0.12em] uppercase">
            Delivering across <strong className="text-gold">India</strong>
          </span>
        </div>
      </div>

      {/* Mobile: stack panels, disable flex-ratio shifting */}
      <style>{`
        @media (max-width: 767px) {
          .audience-split-wrapper {
            flex-direction: column !important;
            min-height: unset !important;
          }
          .audience-panel {
            flex: none !important;
            min-height: 55vh;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
