'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

interface FilterState {
  fabric: string[];
  occasion: string[];
  priceRange: [number, number];
  tags: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const fabricOptions = ['Silk', 'Cotton', 'Chiffon', 'Georgette', 'Banarasi', 'Organza', 'Velvet', 'Rayon'];
const occasionOptions = ['Bridal', 'Party Wear', 'Festive', 'Casual', 'Office'];
const tagOptions = ['New', 'Bestseller', 'Sale'];

function FilterGroup({ title, options, selected, onToggle }: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-taupe/20 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-1 mb-3"
      >
        <span className="text-[11px] font-montserrat tracking-[0.15em] uppercase font-semibold text-ink">{title}</span>
        <ChevronDown size={13} className={`text-taupe transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onToggle(opt)}
                  className={`px-3 py-1 text-[11px] font-montserrat rounded-full border transition-all ${
                    selected.includes(opt)
                      ? 'border-gold bg-gold text-ink'
                      : 'border-taupe/30 text-taupe hover:border-gold hover:text-ink'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, isOpen, onClose, isMobile }: FilterSidebarProps) {
  const toggle = (key: 'fabric' | 'occasion' | 'tags', val: string) => {
    const arr = filters[key];
    onChange({
      ...filters,
      [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val],
    });
  };

  const hasActiveFilters =
    filters.fabric.length > 0 ||
    filters.occasion.length > 0 ||
    filters.tags.length > 0;

  const clearAll = () => onChange({ fabric: [], occasion: [], priceRange: [0, 50000], tags: [] });

  const content = (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-playfair text-lg text-ink">Filters</h3>
          {hasActiveFilters && (
            <button onClick={clearAll} className="text-[10px] font-montserrat text-rose hover:text-rose/70 transition-colors mt-0.5">
              Clear all
            </button>
          )}
        </div>
        {isMobile && onClose && (
          <button onClick={onClose} className="text-taupe hover:text-ink transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      <FilterGroup
        title="Fabric"
        options={fabricOptions}
        selected={filters.fabric}
        onToggle={(v) => toggle('fabric', v)}
      />
      <FilterGroup
        title="Occasion"
        options={occasionOptions}
        selected={filters.occasion}
        onToggle={(v) => toggle('occasion', v)}
      />
      <FilterGroup
        title="Tags"
        options={tagOptions}
        selected={filters.tags}
        onToggle={(v) => toggle('tags', v.toLowerCase())}
      />

      {/* Price range */}
      <div>
        <p className="text-[11px] font-montserrat tracking-[0.15em] uppercase font-semibold text-ink mb-3">
          Price Range
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0] || ''}
            onChange={e => onChange({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
            className="w-20 bg-ivory border border-taupe/30 rounded px-2 py-1.5 text-[12px] font-montserrat text-ink outline-none focus:border-gold"
          />
          <span className="text-taupe text-sm">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1] || ''}
            onChange={e => onChange({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
            className="w-20 bg-ivory border border-taupe/30 rounded px-2 py-1.5 text-[12px] font-montserrat text-ink outline-none focus:border-gold"
          />
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-ink/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[90vw] bg-surface z-50 overflow-y-auto shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="hidden lg:block w-56 flex-shrink-0 bg-surface rounded-xl shadow-sm border border-taupe/15 h-fit sticky top-28">
      {content}
    </div>
  );
}
