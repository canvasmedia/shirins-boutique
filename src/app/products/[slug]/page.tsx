import ProductDetailClient from './ProductDetailClient';

/**
 * Product detail page — static export compatible.
 *
 * Strategy for Cloudflare Pages + output: "export":
 *
 * 1. We generate one placeholder route (`/products/_`) as a static HTML shell.
 * 2. A `public/_redirects` file tells Cloudflare to serve that same shell
 *    for ANY `/products/*` URL.
 * 3. ProductDetailClient reads the actual slug from `window.location.pathname`
 *    and fetches the real product from Shopify — so every product page works
 *    dynamically without rebuilding.
 *
 * Once Shopify is configured, you can also pre-render real product slugs here
 * for faster first paint (optional):
 *   import { getAllProducts } from '@/lib/shopify';
 *   const ps = await getAllProducts();
 *   return ps.map(p => ({ slug: p.handle }));
 */
export async function generateStaticParams() {
  // '_' is our universal shell route.
  // Cloudflare's _redirects will route all /products/* here.
  return [{ slug: '_' }];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
