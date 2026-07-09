import { products } from '@/lib/mockData';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
