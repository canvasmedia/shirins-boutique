'use client';

/**
 * Wishlist page — shows products that have been hearted.
 * Wishlist IDs are Shopify product GIDs. We look up each one
 * from getAllProducts (cached in memory during the session).
 * Since this is client-side, we store what we can from context.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useSite } from '@/lib/context';
import { getAllProducts } from '@/lib/shopify';
import { normalizeProduct } from '@/lib/shopifyTypes';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BackButton from '@/components/ui/BackButton';

export default function WishlistPage() {
  const { wishlist } = useSite();
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (wishlist.length === 0) {
      setWishlistedProducts([]);
      return;
    }
    // Fetch all products and filter by wishlisted IDs
    getAllProducts(250).then((shopifyProducts) => {
      const all = shopifyProducts.map(normalizeProduct);
      setWishlistedProducts(all.filter((p) => wishlist.includes(p.id)));
    });
  }, [wishlist]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Wishlist' },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-10">
      <div className="mb-3">
        <BackButton />
      </div>
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-playfair text-3xl text-ink">My Wishlist</h1>
        <span className="text-[12px] font-montserrat text-taupe">({wishlistedProducts.length} items)</span>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={64} className="mx-auto text-taupe/40 mb-6" />
          <h2 className="font-playfair text-2xl text-ink mb-3">Your Wishlist is Empty</h2>
          <p className="text-[14px] font-montserrat text-taupe mb-8">
            Tap the heart on any product to save it here for later.
          </p>
          <Link
            href="/collections/sarees"
            className="inline-flex items-center gap-2 bg-ink text-gold font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 rounded hover:bg-ink/90 transition-all"
          >
            <ShoppingBag size={16} />
            Start Browsing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {wishlistedProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
