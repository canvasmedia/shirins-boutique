'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search as SearchIcon, ShoppingBag } from 'lucide-react';
import { searchProducts as shopifySearch } from '@/lib/shopify';
import { normalizeProduct } from '@/lib/shopifyTypes';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BackButton from '@/components/ui/BackButton';

export default function SearchPageClient() {
  const params = useSearchParams();
  const router = useRouter();
  const initialQuery = params.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!initialQuery) {
      setResults([]);
      return;
    }
    setSearching(true);
    shopifySearch(initialQuery, 24).then((shopifyProducts) => {
      setResults(shopifyProducts.map(normalizeProduct));
      setSearching(false);
    });
  }, [initialQuery]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Search' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-10">
      <div className="mb-3">
        <BackButton />
      </div>
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mb-8">
        <label htmlFor="search-input" className="sr-only">Search products</label>
        <div className="flex items-center gap-2 bg-surface border border-taupe/25 rounded-xl px-4 py-3.5 focus-within:border-gold transition-colors">
          <SearchIcon size={16} className="text-taupe flex-shrink-0" />
          <input
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for sarees, suits, fabric, occasion..."
            className="flex-1 bg-transparent text-[14px] font-montserrat text-ink outline-none"
          />
          <button type="submit" className="text-[11px] font-montserrat font-bold uppercase tracking-wide text-gold hover:text-ink transition-colors">
            Search
          </button>
        </div>
      </form>

      {initialQuery ? (
        <>
          <p className="text-[13px] font-montserrat text-taupe mb-6">
            {searching ? 'Searching…' : `${results.length} result${results.length !== 1 ? 's' : ''} for "${initialQuery}"`}
          </p>
          {searching ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-surface rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-[3/4] bg-taupe/10" />
                  <div className="p-3.5 space-y-2">
                    <div className="h-3 bg-taupe/10 rounded w-1/2" />
                    <div className="h-4 bg-taupe/10 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={56} className="mx-auto text-taupe/40 mb-5" />
              <h2 className="font-playfair text-2xl text-ink mb-2">No products found</h2>
              <p className="text-[13px] font-montserrat text-taupe mb-6">Try a different fabric, category, or occasion.</p>
              <Link
                href="/collections/sarees"
                className="inline-flex items-center gap-2 bg-ink text-gold font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 rounded hover:bg-ink/90 transition-all"
              >
                Browse Sarees
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-[13px] font-montserrat text-taupe">Try searching for &ldquo;silk saree&rdquo;, &ldquo;bridal&rdquo;, or &ldquo;indo-western&rdquo;.</p>
      )}
    </div>
  );
}
