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
import { getProductsByTag, getProductsByCategory } from '@/lib/mockData';

export default function HomePage() {
  const bestSellers = getProductsByTag('bestseller');
  const newArrivals = getProductsByTag('new');
  const blouses = getProductsByCategory('blouses');
  const jewellery = getProductsByCategory('jewellery-accessories');

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
        products={bestSellers}
        viewAllHref="/collections/best-sellers"
      />
      <ShopByOccasion />
      <ProductCarousel
        title="New Arrivals"
        subtitle="Just In"
        products={newArrivals}
        viewAllHref="/collections/new-arrivals"
      />
      <SeasonalBanner />
      <ProductCarousel
        title="Designer Blouses"
        subtitle="Finish the Look"
        products={blouses}
        viewAllHref="/collections/blouses"
      />
      <ShopByFabric />
      <ProductCarousel
        title="Jewellery & Accessories"
        subtitle="Complete the Drape"
        products={jewellery}
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
