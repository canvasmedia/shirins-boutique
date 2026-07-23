import CollectionPageClient from './CollectionPageClient';

/**
 * Collections page — products are fetched client-side from Shopify.
 *
 * Static export (output: "export") requires generateStaticParams to know
 * which paths to pre-render. We keep the known category slugs here.
 * Any Shopify collection whose handle matches one of these slugs will work.
 * New collections just need their slug added to this list.
 */
export async function generateStaticParams() {
  return [
    { category: 'sarees' },
    { category: 'suits' },
    { category: 'lehengas' },
    { category: 'western-wear' },
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
