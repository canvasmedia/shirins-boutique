'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label = 'Back', fallbackHref = '/' }: { label?: string; fallbackHref?: string }) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-[12px] font-montserrat font-semibold tracking-[0.06em] uppercase text-taupe hover:text-gold transition-colors py-2 px-1 -ml-1 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold rounded"
      aria-label={label}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
