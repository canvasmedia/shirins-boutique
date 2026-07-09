import HeroSection from '@/components/home/HeroSection';
import TrustBadges from '@/components/home/TrustBadges';
import ShopByCategory from '@/components/home/ShopByCategory';
import FeaturedBanner from '@/components/home/FeaturedBanner';
import ProductCarousel from '@/components/home/ProductCarousel';
import WholesaleTeaser from '@/components/home/WholesaleTeaser';
import BrandStory from '@/components/home/BrandStory';
import NewsletterBand from '@/components/home/NewsletterBand';
import { products, getProductsByTag } from '@/lib/mockData';

export default function HomePage() {
  const bestSellers = getProductsByTag('bestseller');
  const newArrivals = getProductsByTag('new');

  return (
    <>
      <HeroSection />
      <TrustBadges />
      <ShopByCategory />
      <FeaturedBanner />
      <ProductCarousel
        title="Best Sellers"
        subtitle="Our Most Loved"
        products={bestSellers}
        viewAllHref="/collections/best-sellers"
      />
      <ProductCarousel
        title="New Arrivals"
        subtitle="Just In"
        products={newArrivals}
        viewAllHref="/collections/new-arrivals"
      />
      <WholesaleTeaser />
      <BrandStory />
      <NewsletterBand />
    </>
  );
}
