import CollectionPageClient from './CollectionPageClient';

export async function generateStaticParams() {
  return [
    { category: 'sarees' },
    { category: 'suits' },
    { category: 'lehengas' },
    { category: 'kurtis-tunics' },
    { category: 'new-arrivals' },
    { category: 'best-sellers' },
    { category: 'sale' },
  ];
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CollectionPage({ params }: PageProps) {
  const { category } = await params;
  return <CollectionPageClient category={category} />;
}
