import { ProductTag } from '@/lib/types';

interface BadgeProps {
  type: ProductTag | 'moq' | string;
  label?: string;
  className?: string;
}

export default function Badge({ type, label, className = '' }: BadgeProps) {
  const configs: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: '#D4AF37', text: '#1A1A1A', label: 'New' },
    bestseller: { bg: '#1A1A1A', text: '#D4AF37', label: 'Bestseller' },
    sale: { bg: '#C08A8A', text: 'white', label: 'Sale' },
    moq: { bg: '#1B2A6B', text: 'white', label: label || 'MOQ 6+' },
  };

  const config = configs[type] || { bg: '#A89E94', text: 'white', label: type };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-montserrat font-bold tracking-[0.1em] uppercase ${className}`}
      style={{ background: config.bg, color: config.text }}
    >
      {label || config.label}
    </span>
  );
}
