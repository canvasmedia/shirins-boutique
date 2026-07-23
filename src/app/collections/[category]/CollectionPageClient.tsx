'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { categories, matchesFabric, matchesOccasion, occasions, fabricTypes } from '@/lib/mockData';
import { normalizeProduct } from '@/lib/shopifyTypes';
import { getProductsByCollectionHandle } from '@/lib/shopify';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/collections/FilterSidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BackButton from '@/components/ui/BackButton';
import { useSite } from '@/lib/context';

const categoryHeroes: Record<string, string> = {
  sarees: 'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  suits: 'https://images.pexels.com/photos/18194533/pexels-photo-18194533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  lehengas: 'https://images.pexels.com/photos/12062663/pexels-photo-12062663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  'kurtis-tunics': 'https://images.pexels.com/photos/18194539/pexels-photo-18194539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'new-arrivals': 'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'best-sellers': 'https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  sale: 'https://images.pexels.com/photos/17876038/pexels-photo-17876038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'indo-western': 'https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  blouses: 'https://images.pexels.com/photos/18194533/pexels-photo-18194533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'jewellery-accessories': 'https://images.pexels.com/photos/7742859/pexels-photo-7742859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};

const categoryTitles: Record<string, string> = {
  sarees: 'Sarees',
  suits: 'Suits',
  lehengas: 'Lehengas',
  'kurtis-tunics': 'Kurtis & Tunics',
  'new-arrivals': 'New Arrivals',
  'best-sellers': 'Best Sellers',
  sale: 'Sale',
  'indo-western': 'Indo-Western',
  blouses: 'Designer Blouses',
  'jewellery-accessories': 'Jewellery & Accessories',
};

for (const occ of occasions) {
  categoryTitles[`occasion-${occ.slug}`] = `${occ.name} Edit`;
  categoryHeroes[`occasion-${occ.slug}`] = occ.image;
}
for (const fab of fabricTypes) {
  categoryTitles[`fabric-${fab.slug}`] = `${fab.name} Collection`;
  categoryHeroes[`fabric-${fab.slug}`] = fab.image;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'new';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const PAGE_SIZE = 8;

export default function CollectionPageClient({ category }: { category: string }) {
  const { mode } = useSite();
  const [sort, setSort] = useState<SortOption>('featured');
  const [filters, setFilters] = useState({
    fabric: [] as string[],
    occasion: [] as string[],
    priceRange: [0, 50000] as [number, number],
    tags: [] as string[],
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const title = categoryTitles[category] || category.replace(/-/g, ' ');
  const heroImg = categoryHeroes[category] || categoryHeroes.sarees;

  // ── Fetch from Shopify ────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setPage(1);

    getProductsByCollectionHandle(category, 100).then((shopifyProducts) => {
      const normalized = shopifyProducts.map(normalizeProduct);
      setAllProducts(normalized);
      setLoading(false);
    });
  }, [category]);

  // ── Client-side filtering & sorting ───────────────────────────────────────
  const categoryProducts = useMemo(() => {
    let filtered = allProducts;

    // Apply tag filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(p =>
        filters.tags.some(t => p.tags.includes(t as 'new' | 'bestseller' | 'sale'))
      );
    }

    // Apply fabric filter (sidebar refinement)
    if (filters.fabric.length > 0) {
      filtered = filtered.filter(p =>
        filters.fabric.some(f => matchesFabric(p, f))
      );
    }

    // Apply occasion filter (sidebar refinement)
    if (filters.occasion.length > 0) {
      filtered = filtered.filter(p =>
        filters.occasion.some(o => matchesOccasion(p, o.toLowerCase().replace(' wear', '')))
      );
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) =>
          mode === 'wholesale'
            ? a.wholesalePricePerPiece - b.wholesalePricePerPiece
            : a.retailPrice - b.retailPrice
        );
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) =>
          mode === 'wholesale'
            ? b.wholesalePricePerPiece - a.wholesalePricePerPiece
            : b.retailPrice - a.retailPrice
        );
        break;
      case 'new':
        filtered = filtered.filter(p => p.tags.includes('new')).concat(
          filtered.filter(p => !p.tags.includes('new'))
        );
        break;
    }

    return filtered;
  }, [allProducts, filters, sort, mode]);

  const paginatedProducts = categoryProducts.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedProducts.length < categoryProducts.length;

  const cat = categories.find(c => c.slug === category);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: title },
  ];

  return (
    <>
      {/* Hero banner */}
      <div className="relative h-48 lg:h-64 overflow-hidden">
        <Image
          src={heroImg}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            className="text-[10px] font-montserrat tracking-[0.3em] uppercase text-gold/80 mb-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shirin&apos;s Boutique
          </motion.p>
          <motion.h1
            className="font-playfair text-3xl lg:text-5xl text-ivory"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {title}
          </motion.h1>
          {!loading && categoryProducts.length > 0 && (
            <motion.p
              className="text-[12px] font-montserrat text-ivory/60 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {categoryProducts.length} products
            </motion.p>
          )}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-8">
        {/* Back + Breadcrumbs */}
        <div className="mb-3">
          <BackButton />
        </div>
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="flex gap-8">
          {/* Filter sidebar — desktop */}
          <FilterSidebar filters={filters} onChange={setFilters} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-taupe/20">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden flex items-center gap-2 text-[12px] font-montserrat text-ink border border-taupe/30 rounded-md px-3 py-2 hover:border-gold transition-colors"
                  onClick={() => setFilterOpen(true)}
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {(filters.fabric.length + filters.occasion.length + filters.tags.length) > 0 && (
                    <span className="w-4 h-4 rounded-full bg-gold text-ink text-[9px] flex items-center justify-center">
                      {filters.fabric.length + filters.occasion.length + filters.tags.length}
                    </span>
                  )}
                </button>
                <p className="text-[12px] font-montserrat text-taupe">
                  {loading ? 'Loading…' : `${categoryProducts.length} results`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-taupe" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="text-[12px] font-montserrat text-ink bg-transparent outline-none border border-taupe/20 rounded px-2 py-1.5 hover:border-gold transition-colors cursor-pointer"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subcategory pills (if applicable) */}
            {cat && cat.subcategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button className="px-3 py-1 text-[11px] font-montserrat rounded-full bg-gold text-ink">All</button>
                {cat.subcategories.map(sub => (
                  <button
                    key={sub.id}
                    className="px-3 py-1 text-[11px] font-montserrat rounded-full border border-taupe/30 text-taupe hover:border-gold hover:text-ink transition-colors"
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}

            {/* Loading skeleton */}
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-surface rounded-xl overflow-hidden animate-pulse">
                    <div className="aspect-[3/4] bg-taupe/10" />
                    <div className="p-3.5 space-y-2">
                      <div className="h-3 bg-taupe/10 rounded w-1/2" />
                      <div className="h-4 bg-taupe/10 rounded w-3/4" />
                      <div className="h-4 bg-taupe/10 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-playfair text-2xl text-taupe mb-2">No products found</p>
                <p className="text-[13px] font-montserrat text-taupe/70">
                  Products will appear here once they are added to this collection in Shopify.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                  {paginatedProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setPage(p => p + 1)}
                      className="inline-flex items-center gap-2 border-2 border-gold text-gold px-8 py-3 text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase rounded hover:bg-gold hover:text-ink transition-all"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <FilterSidebar
        filters={filters}
        onChange={setFilters}
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        isMobile
      />
    </>
  );
}
