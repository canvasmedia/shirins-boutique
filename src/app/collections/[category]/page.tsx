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
    { category: 'indo-western' },
    { category: 'blouses' },
    { category: 'jewellery-accessories' },
    { category: 'occasion-bridal' },
    { category: 'occasion-party' },
    { category: 'occasion-festive' },
    { category: 'occasion-work' },
    { category: 'fabric-silk' },
    { category: 'fabric-cotton' },
    { category: 'fabric-georgette' },
    { category: 'fabric-organza' },
    { category: 'fabric-velvet' },
    { category: 'fabric-chiffon' },
  ];
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CollectionPage({ params }: PageProps) {
  const { category } = await params;
  return <CollectionPageClient category={category} />;
}
