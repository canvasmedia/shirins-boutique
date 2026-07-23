'use client';

/**
 * Home Page
 *
 * Product carousels (Best Sellers, New Arrivals, Designer Blouses,
 * Jewellery & Accessories) now fetch live data from Shopify.
 * All banners and static sections remain exactly as they are.
 */

import { useState, useEffect } from 'react';
import QuickCategoryBar from '@/components/home/QuickCategoryBar';
import HeroSection from '@/components/home/HeroSection';
import BrandStatBar from '@/components/home/BrandStatBar';
import TrustBadges from '@/components/home/TrustBadges';
import ShopByCategory from '@/components/home/ShopByCategory';
import FeaturedBanner from '@/components/home/FeaturedBanner';
import ProductCarousel from '@/components/home/ProductCarousel';
import ShopByOccasion from '@/components/home/ShopByOccasion';
import SeasonalBanner from '@/components/home/SeasonalBanner';
import ShopByFabric from '@/components/home/ShopByFabric';
import AudienceSplit from '@/components/home/AudienceSplit';
import InstagramGallery from '@/components/home/InstagramGallery';
import BrandStory from '@/components/home/BrandStory';
import WhoWeAre from '@/components/home/WhoWeAre';
import NewsletterBand from '@/components/home/NewsletterBand';
import { getProductsFromCollections } from '@/lib/shopify';
import { normalizeProduct } from '@/lib/shopifyTypes';
import type { Product } from '@/lib/types';

const CAROUSEL_COLLECTIONS = ['best-sellers', 'new-arrivals', 'blouses', 'jewellery-accessories'];

export default function HomePage() {
  const [carouselData, setCarouselData] = useState<Record<string, Product[]>>({
    'best-sellers': [],
    'new-arrivals': [],
    'blouses': [],
    'jewellery-accessories': [],
  });

  useEffect(() => {
    getProductsFromCollections(CAROUSEL_COLLECTIONS, 12).then((raw) => {
      const normalized: Record<string, Product[]> = {};
      for (const handle of CAROUSEL_COLLECTIONS) {
        normalized[handle] = (raw[handle] ?? []).map(normalizeProduct);
      }
      setCarouselData(normalized);
    });
  }, []);

  return (
    <>
      <QuickCategoryBar />
      <HeroSection />
      <BrandStatBar />
      <TrustBadges />
      <ShopByCategory />
      <FeaturedBanner />
      <ProductCarousel
        title="Best Sellers"
        subtitle="Our Most Loved"
        products={carouselData['best-sellers']}
        viewAllHref="/collections/best-sellers"
      />
      <ShopByOccasion />
      <ProductCarousel
        title="New Arrivals"
        subtitle="Just In"
        products={carouselData['new-arrivals']}
        viewAllHref="/collections/new-arrivals"
      />
      <SeasonalBanner />
      <ProductCarousel
        title="Designer Blouses"
        subtitle="Finish the Look"
        products={carouselData['blouses']}
        viewAllHref="/collections/blouses"
      />
      <ShopByFabric />
      <ProductCarousel
        title="Jewellery & Accessories"
        subtitle="Complete the Drape"
        products={carouselData['jewellery-accessories']}
        viewAllHref="/collections/jewellery-accessories"
      />
      <AudienceSplit />
      <InstagramGallery />
      <BrandStory />
      <WhoWeAre />
      <NewsletterBand />
    </>
  );
}
