'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const announcements = [
  'Free Shipping Across India · COD Available · Easy Returns · Secure Payments',
  'New Collection Arrived! Up to 30% Off on Select Sarees',
  'Wholesale Inquiries Welcome · Contact Us for Bulk Pricing',
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="w-full text-center relative overflow-hidden"
      style={{ background: '#1A1A1A', color: '#F7F2EA' }}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex-1" />
        <div className="flex items-center gap-6 text-[11px] font-montserrat tracking-[0.08em] uppercase">
          {announcements[current]}
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setDismissed(true)}
            className="text-taupe hover:text-ivory transition-colors p-1"
            aria-label="Dismiss announcement"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Announcement nav dots */}
      {announcements.length > 1 && (
        <div className="flex justify-center gap-1 pb-1.5">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all"
              style={{
                width: i === current ? '16px' : '4px',
                height: '4px',
                background: i === current ? '#D4AF37' : 'rgba(247,242,234,0.3)',
              }}
              aria-label={`Announcement ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
