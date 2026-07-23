import ProductDetailClient from './ProductDetailClient';
import { getAllProducts } from '@/lib/shopify';

/**
 * Product detail page — static export compatible.
 *
 * Strategy for Cloudflare Pages + output: "export":
 *
 * 1. At build time, fetch all products from Shopify and pre-render each one.
 * 2. A `public/_redirects` fallback serves the product shell for any new products
 *    added after deployment (so they still work without a rebuild).
 * 3. ProductDetailClient reads the actual slug from `window.location.pathname`
 *    and fetches the real product from Shopify.
 */
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map(p => ({ slug: p.handle }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
