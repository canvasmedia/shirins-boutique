import { Product, Category } from './types';

export const categories: Category[] = [
  {
    id: 'sarees',
    slug: 'sarees',
    name: 'Sarees',
    image: 'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    subcategories: [
      { id: 'silk-sarees', slug: 'silk-sarees', name: 'Silk Sarees' },
      { id: 'cotton-sarees', slug: 'cotton-sarees', name: 'Cotton Sarees' },
      { id: 'designer-sarees', slug: 'designer-sarees', name: 'Designer Sarees' },
      { id: 'banarasi-sarees', slug: 'banarasi-sarees', name: 'Banarasi Sarees' },
      { id: 'organza-sarees', slug: 'organza-sarees', name: 'Organza Sarees' },
      { id: 'bridal-sarees', slug: 'bridal-sarees', name: 'Bridal Sarees' },
      { id: 'party-wear-sarees', slug: 'party-wear-sarees', name: 'Party Wear' },
    ],
  },
  {
    id: 'suits',
    slug: 'suits',
    name: 'Suits',
    image: 'https://images.pexels.com/photos/7275701/pexels-photo-7275701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    subcategories: [
      { id: 'anarkali-suits', slug: 'anarkali-suits', name: 'Anarkali Suits' },
      { id: 'straight-suits', slug: 'straight-suits', name: 'Straight Suits' },
      { id: 'palazzo-suits', slug: 'palazzo-suits', name: 'Palazzo Suits' },
      { id: 'embroidered-sets', slug: 'embroidered-sets', name: 'Embroidered Sets' },
      { id: 'party-wear-sets', slug: 'party-wear-sets', name: 'Party Wear Sets' },
      { id: 'unstitched', slug: 'unstitched', name: 'Unstitched' },
    ],
  },
  {
    id: 'lehengas',
    slug: 'lehengas',
    name: 'Lehengas',
    image: 'https://images.pexels.com/photos/12062663/pexels-photo-12062663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    subcategories: [],
  },
  {
    id: 'kurtis-tunics',
    slug: 'kurtis-tunics',
    name: 'Kurtis & Tunics',
    image: 'https://images.pexels.com/photos/18194539/pexels-photo-18194539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    subcategories: [],
  },
  {
    id: 'new-arrivals',
    slug: 'new-arrivals',
    name: 'New Arrivals',
    image: 'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    subcategories: [],
  },
  {
    id: 'sale',
    slug: 'sale',
    name: 'Sale',
    image: 'https://images.pexels.com/photos/17876038/pexels-photo-17876038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    subcategories: [],
  },
  {
    id: 'indo-western',
    slug: 'indo-western',
    name: 'Indo-Western',
    image: 'https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    subcategories: [],
  },
  {
    id: 'blouses',
    slug: 'blouses',
    name: 'Designer Blouses',
    image: 'https://images.pexels.com/photos/18194533/pexels-photo-18194533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    subcategories: [],
  },
  {
    id: 'jewellery-accessories',
    slug: 'jewellery-accessories',
    name: 'Jewellery & Accessories',
    image: 'https://images.pexels.com/photos/7742859/pexels-photo-7742859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    subcategories: [],
  },
];

export const occasions = [
  { slug: 'bridal', name: 'Bridal', tagline: 'For your big day', image: 'https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800' },
  { slug: 'party', name: 'Party', tagline: 'Cocktails & receptions', image: 'https://images.pexels.com/photos/17876038/pexels-photo-17876038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { slug: 'festive', name: 'Festive', tagline: 'Diwali, pujas & celebrations', image: 'https://images.pexels.com/photos/9398389/pexels-photo-9398389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { slug: 'work', name: 'Work', tagline: 'Office-to-evening ease', image: 'https://images.pexels.com/photos/20790059/pexels-photo-20790059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800' },
];

export const fabricTypes = [
  { slug: 'silk', name: 'Silk', image: 'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { slug: 'cotton', name: 'Cotton', image: 'https://images.pexels.com/photos/26969898/pexels-photo-26969898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { slug: 'georgette', name: 'Georgette', image: 'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { slug: 'organza', name: 'Organza', image: 'https://images.pexels.com/photos/17468605/pexels-photo-17468605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { slug: 'velvet', name: 'Velvet', image: 'https://images.pexels.com/photos/7742859/pexels-photo-7742859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { slug: 'chiffon', name: 'Chiffon', image: 'https://images.pexels.com/photos/18194539/pexels-photo-18194539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
];

const OCCASION_KEYWORDS: Record<string, string[]> = {
  bridal: ['bridal', 'wedding', 'heirloom'],
  party: ['party', 'cocktail', 'reception', 'sequin', 'glamorous'],
  festive: ['festive', 'puja', 'celebration', 'zardozi'],
  work: ['office', 'everyday', 'casual', 'daytime'],
};

export function matchesOccasion(product: Product, occasionSlug: string): boolean {
  const haystack = `${product.name} ${product.description} ${product.subcategory}`.toLowerCase();
  const keywords = OCCASION_KEYWORDS[occasionSlug] || [];
  return keywords.some(k => haystack.includes(k));
}

export function matchesFabric(product: Product, fabricSlug: string): boolean {
  return product.fabric.toLowerCase().includes(fabricSlug.toLowerCase());
}

export const instagramPosts = [
  { image: 'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', likes: 842, href: '/collections/sarees' },
  { image: 'https://images.pexels.com/photos/12062663/pexels-photo-12062663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800', likes: 1204, href: '/collections/lehengas' },
  { image: 'https://images.pexels.com/photos/18194539/pexels-photo-18194539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', likes: 673, href: '/collections/suits' },
  { image: 'https://images.pexels.com/photos/26969898/pexels-photo-26969898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', likes: 519, href: '/collections/kurtis-tunics' },
  { image: 'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', likes: 967, href: '/collections/new-arrivals' },
  { image: 'https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800', likes: 1088, href: '/collections/indo-western' },
];

const WHOLESALE_TIERS = [
  { minQty: 6, maxQty: 11, pricePerPiece: 0, label: '6–11 pcs' },
  { minQty: 12, maxQty: 23, pricePerPiece: 0, label: '12–23 pcs' },
  { minQty: 24, pricePerPiece: 0, label: '24+ pcs' },
];

function makeTiers(base: number): typeof WHOLESALE_TIERS {
  return [
    { minQty: 6, maxQty: 11, pricePerPiece: Math.round(base * 0.78), label: '6–11 pcs' },
    { minQty: 12, maxQty: 23, pricePerPiece: Math.round(base * 0.70), label: '12–23 pcs' },
    { minQty: 24, pricePerPiece: Math.round(base * 0.62), label: '24+ pcs' },
  ];
}

export const products: Product[] = [
  // SAREES
  {
    id: 'p1',
    slug: 'royal-banarasi-silk-saree',
    name: 'Royal Banarasi Silk Saree',
    category: 'sarees',
    subcategory: 'banarasi-sarees',
    images: [
      'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/20790059/pexels-photo-20790059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Pure Katan Silk',
    careInstructions: 'Dry clean only. Store in a muslin cloth.',
    tags: ['bestseller', 'new'],
    description: 'A timeless Banarasi silk saree woven with intricate zari work. Perfect for weddings, pujas, and festive celebrations. Blouse piece included.',
    retailPrice: 8499,
    compareAtPrice: 10999,
    wholesalePricePerPiece: 6200,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(6200),
  },
  {
    id: 'p2',
    slug: 'organza-floral-embroidery-saree',
    name: 'Organza Floral Embroidery Saree',
    category: 'sarees',
    subcategory: 'organza-sarees',
    images: [
      'https://images.pexels.com/photos/17468605/pexels-photo-17468605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/5872667/pexels-photo-5872667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Organza with silk lining',
    careInstructions: 'Dry clean only. Avoid direct sunlight.',
    tags: ['new'],
    description: 'Ethereal organza saree adorned with hand-embroidered floral motifs in gold thread. Light, breathable, and effortlessly elegant for cocktail evenings.',
    retailPrice: 5999,
    wholesalePricePerPiece: 4200,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(4200),
  },
  {
    id: 'p3',
    slug: 'pure-cotton-block-print-saree',
    name: 'Pure Cotton Block Print Saree',
    category: 'sarees',
    subcategory: 'cotton-sarees',
    images: [
      'https://images.pexels.com/photos/26969898/pexels-photo-26969898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/37442997/pexels-photo-37442997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: '100% Handloom Cotton',
    careInstructions: 'Hand wash in cold water. Do not wring.',
    tags: ['bestseller'],
    description: 'Authentic hand block-printed cotton saree from Rajasthan. Breathable, comfortable, and perfect for everyday elegance or casual gatherings.',
    retailPrice: 2499,
    compareAtPrice: 3199,
    wholesalePricePerPiece: 1750,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1750),
  },
  {
    id: 'p4',
    slug: 'bridal-silk-embroidered-saree',
    name: 'Bridal Embroidered Silk Saree',
    category: 'sarees',
    subcategory: 'bridal-sarees',
    images: [
      'https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/9398389/pexels-photo-9398389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    fabric: 'Pure Silk with Zardozi',
    careInstructions: 'Dry clean only. Store flat.',
    tags: ['new'],
    description: 'Opulent bridal silk saree with heavy zardozi embroidery along the border and pallu. A celebration of tradition and luxury for your most special day.',
    retailPrice: 18999,
    wholesalePricePerPiece: 14500,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(14500),
  },
  {
    id: 'p5',
    slug: 'designer-georgette-saree',
    name: 'Designer Georgette Party Saree',
    category: 'sarees',
    subcategory: 'designer-sarees',
    images: [
      'https://images.pexels.com/photos/17876038/pexels-photo-17876038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Georgette with Sequin Work',
    careInstructions: 'Dry clean only.',
    tags: ['sale'],
    description: 'Glamorous georgette saree with all-over sequin embroidery. Perfect for parties, receptions, and cocktail dinners. Comes with matching blouse piece.',
    retailPrice: 4299,
    compareAtPrice: 6499,
    wholesalePricePerPiece: 2999,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(2999),
  },
  // SUITS
  {
    id: 'p6',
    slug: 'anarkali-silk-suit-set',
    name: 'Anarkali Silk Suit Set',
    category: 'suits',
    subcategory: 'anarkali-suits',
    images: [
      'https://images.pexels.com/photos/18194533/pexels-photo-18194533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/18194539/pexels-photo-18194539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    fabric: 'Art Silk',
    careInstructions: 'Dry clean recommended.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['bestseller'],
    description: 'Floor-length anarkali suit in lustrous art silk with thread embroidery at the neckline. Paired with churidar and dupatta. Regal and effortlessly graceful.',
    retailPrice: 3799,
    wholesalePricePerPiece: 2650,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(2650),
  },
  {
    id: 'p7',
    slug: 'palazzo-embroidered-suit',
    name: 'Palazzo Embroidered Suit',
    category: 'suits',
    subcategory: 'palazzo-suits',
    images: [
      'https://images.pexels.com/photos/7742859/pexels-photo-7742859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/7275701/pexels-photo-7275701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    fabric: 'Chiffon',
    careInstructions: 'Hand wash cold or dry clean.',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['new'],
    description: 'Breezy chiffon palazzo suit with floral threadwork on the kurta. Wide-leg palazzo pants and printed dupatta included. Perfect for casual festivities.',
    retailPrice: 2899,
    compareAtPrice: 3499,
    wholesalePricePerPiece: 1999,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1999),
  },
  {
    id: 'p8',
    slug: 'straight-cut-embroidered-suit',
    name: 'Straight Cut Embroidered Suit',
    category: 'suits',
    subcategory: 'straight-suits',
    images: [
      'https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/20790059/pexels-photo-20790059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Cotton Silk Blend',
    careInstructions: 'Machine wash gentle or dry clean.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['sale'],
    description: 'Elegant straight-cut suit with phulkari-inspired embroidery at the hem and cuffs. A timeless silhouette ideal for office-to-dinner transitions.',
    retailPrice: 2199,
    compareAtPrice: 2999,
    wholesalePricePerPiece: 1499,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1499),
  },
  {
    id: 'p9',
    slug: 'party-wear-embroidered-set',
    name: 'Party Wear Embroidered Set',
    category: 'suits',
    subcategory: 'party-wear-sets',
    images: [
      'https://images.pexels.com/photos/9398389/pexels-photo-9398389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Velvet & Net',
    careInstructions: 'Dry clean only.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['new', 'bestseller'],
    description: 'Luxurious velvet kurta with net palazzo and heavily embellished dupatta. This three-piece party set commands attention at every festive occasion.',
    retailPrice: 5499,
    wholesalePricePerPiece: 3900,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(3900),
  },
  // LEHENGAS
  {
    id: 'p10',
    slug: 'bridal-lehenga-choli',
    name: 'Bridal Lehenga Choli Set',
    category: 'lehengas',
    subcategory: 'lehengas',
    images: [
      'https://images.pexels.com/photos/12062663/pexels-photo-12062663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    fabric: 'Raw Silk with Zardozi',
    careInstructions: 'Dry clean only. Store in a breathable bag.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    tags: ['new', 'bestseller'],
    description: 'Exquisite bridal lehenga with dense zardozi embroidery on raw silk. The sweeping silhouette and intricate handwork make this a once-in-a-lifetime heirloom piece.',
    retailPrice: 24999,
    wholesalePricePerPiece: 19500,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(19500),
  },
  {
    id: 'p11',
    slug: 'festive-mirror-work-lehenga',
    name: 'Festive Mirror Work Lehenga',
    category: 'lehengas',
    subcategory: 'lehengas',
    images: [
      'https://images.pexels.com/photos/18194533/pexels-photo-18194533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/7742859/pexels-photo-7742859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    fabric: 'Chaniya Silk',
    careInstructions: 'Dry clean only.',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['sale'],
    description: 'Vibrant mirror-work lehenga with intricate hand-stitched shisha embellishments. Comes with a matching choli and embroidered dupatta for a complete festive look.',
    retailPrice: 8999,
    compareAtPrice: 12999,
    wholesalePricePerPiece: 6500,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(6500),
  },
  // KURTIS & TUNICS
  {
    id: 'p12',
    slug: 'lucknowi-chikankari-kurti',
    name: 'Lucknowi Chikankari Kurti',
    category: 'kurtis-tunics',
    subcategory: 'kurtis-tunics',
    images: [
      'https://images.pexels.com/photos/37442997/pexels-photo-37442997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/26969898/pexels-photo-26969898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Pure Cotton',
    careInstructions: 'Hand wash in cold water.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['bestseller'],
    description: 'Authentic Lucknowi chikankari kurti crafted by master artisans. The delicate shadow embroidery on pure cotton makes this a wardrobe essential for the discerning woman.',
    retailPrice: 1699,
    wholesalePricePerPiece: 1100,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1100),
  },
  {
    id: 'p13',
    slug: 'printed-rayon-tunic',
    name: 'Printed Rayon Tunic',
    category: 'kurtis-tunics',
    subcategory: 'kurtis-tunics',
    images: [
      'https://images.pexels.com/photos/17876038/pexels-photo-17876038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Rayon',
    careInstructions: 'Machine wash cold, gentle cycle.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['new', 'sale'],
    description: 'Breezy rayon tunic with vibrant jaipuri floral print. Versatile enough to pair with leggings, palazzos, or jeans. A must-have everyday essential.',
    retailPrice: 899,
    compareAtPrice: 1299,
    wholesalePricePerPiece: 580,
    minOrderQty: 12,
    wholesaleTiers: makeTiers(580),
  },
  {
    id: 'p14',
    slug: 'embroidered-long-kurti',
    name: 'Embroidered Long Kurti',
    category: 'kurtis-tunics',
    subcategory: 'kurtis-tunics',
    images: [
      'https://images.pexels.com/photos/5872667/pexels-photo-5872667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/17468605/pexels-photo-17468605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Cotton Blend',
    careInstructions: 'Hand wash recommended.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['new'],
    description: 'Long A-line kurti with intricate threadwork at the yoke and hem. The straight silhouette flatters all body types. Perfect for festivals and formal events.',
    retailPrice: 1299,
    wholesalePricePerPiece: 850,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(850),
  },
  {
    id: 'p15',
    slug: 'silk-blend-anarkali-kurti',
    name: 'Silk Blend Anarkali Kurti',
    category: 'kurtis-tunics',
    subcategory: 'kurtis-tunics',
    images: [
      'https://images.pexels.com/photos/7275701/pexels-photo-7275701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/18194539/pexels-photo-18194539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    fabric: 'Silk Blend',
    careInstructions: 'Dry clean or hand wash cold.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['bestseller'],
    description: 'Flared anarkali-style kurti in rich silk blend with subtle shimmer. The flared hem adds drama and elegance, ideal for festive occasions paired with churidar.',
    retailPrice: 2199,
    compareAtPrice: 2799,
    wholesalePricePerPiece: 1550,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1550),
  },
  {
    id: 'p16',
    slug: 'designer-banarasi-party-saree',
    name: 'Designer Banarasi Party Saree',
    category: 'sarees',
    subcategory: 'party-wear-sarees',
    images: [
      'https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/12062663/pexels-photo-12062663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Banarasi Brocade',
    careInstructions: 'Dry clean only.',
    tags: ['new', 'sale'],
    description: 'Stunning Banarasi brocade saree in deep jewel tones with a broad golden border. The signature woven motifs make each drape a work of art.',
    retailPrice: 6799,
    compareAtPrice: 8999,
    wholesalePricePerPiece: 4999,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(4999),
  },
  {
    id: 'p17',
    slug: 'royal-velvet-lehenga',
    name: 'Royal Velvet Lehenga',
    category: 'lehengas',
    subcategory: 'lehengas',
    images: [
      'https://images.pexels.com/photos/9398389/pexels-photo-9398389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/20790059/pexels-photo-20790059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Velvet with Net',
    careInstructions: 'Dry clean only.',
    sizes: ['S', 'M', 'L', 'XL', 'Custom'],
    tags: ['new'],
    description: 'Rich royal blue velvet lehenga with gold sequin embroidery throughout. The heavily embellished choli and sheer dupatta complete a look fit for royalty.',
    retailPrice: 15999,
    wholesalePricePerPiece: 12500,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(12500),
  },
  {
    id: 'p18',
    slug: 'chanderi-silk-saree',
    name: 'Chanderi Silk Saree',
    category: 'sarees',
    subcategory: 'silk-sarees',
    images: [
      'https://images.pexels.com/photos/5872667/pexels-photo-5872667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/26969898/pexels-photo-26969898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Chanderi Silk',
    careInstructions: 'Dry clean only.',
    tags: ['bestseller'],
    description: 'Lightweight Chanderi silk saree with subtle zari buti across the body and a contrast border. Perfect for daytime events, pujas, and office parties.',
    retailPrice: 3999,
    wholesalePricePerPiece: 2800,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(2800),
  },
  // INDO-WESTERN
  {
    id: 'p19',
    slug: 'cape-sleeve-indo-western-gown',
    name: 'Cape Sleeve Indo-Western Gown',
    category: 'indo-western',
    subcategory: 'indo-western',
    images: [
      'https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Georgette with Sequin Cape',
    careInstructions: 'Dry clean only.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['new'],
    description: 'A fusion gown pairing a fitted bodice with a flowing cape sleeve, finished in hand-sequinned georgette. Reception-ready, halfway between a saree drape and a Western silhouette.',
    retailPrice: 6499,
    wholesalePricePerPiece: 4600,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(4600),
  },
  {
    id: 'p20',
    slug: 'dhoti-jumpsuit-fusion-set',
    name: 'Dhoti-Style Jumpsuit',
    category: 'indo-western',
    subcategory: 'indo-western',
    images: [
      'https://images.pexels.com/photos/7742859/pexels-photo-7742859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/20790059/pexels-photo-20790059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Crepe',
    careInstructions: 'Dry clean recommended.',
    sizes: ['XS', 'S', 'M', 'L'],
    tags: ['bestseller'],
    description: 'A one-piece jumpsuit with a draped dhoti-style leg and a fitted crepe bodice. Effortlessly modern for sundowners, cocktail parties, and destination functions.',
    retailPrice: 3899,
    compareAtPrice: 4699,
    wholesalePricePerPiece: 2750,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(2750),
  },
  {
    id: 'p21',
    slug: 'asymmetric-kurta-palazzo-set',
    name: 'Asymmetric Kurta Palazzo Set',
    category: 'indo-western',
    subcategory: 'indo-western',
    images: [
      'https://images.pexels.com/photos/18194533/pexels-photo-18194533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/37442997/pexels-photo-37442997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Cotton Silk Blend',
    careInstructions: 'Hand wash cold or dry clean.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['new'],
    description: 'A high-low asymmetric kurta with clean tailoring, styled over wide-leg palazzos. Everyday Indo-Western wear for the office or a casual evening out.',
    retailPrice: 2599,
    wholesalePricePerPiece: 1800,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1800),
  },
  // DESIGNER BLOUSES
  {
    id: 'p22',
    slug: 'mirror-work-saree-blouse',
    name: 'Mirror Work Saree Blouse',
    category: 'blouses',
    subcategory: 'blouses',
    images: [
      'https://images.pexels.com/photos/18194533/pexels-photo-18194533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/7742859/pexels-photo-7742859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    fabric: 'Raw Silk with Mirror Work',
    careInstructions: 'Dry clean only.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['bestseller'],
    description: 'A structured saree blouse hand-embellished with shisha mirror work across the yoke. Pairs beautifully with plain silk or chiffon sarees for instant festive impact.',
    retailPrice: 1899,
    wholesalePricePerPiece: 1250,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1250),
  },
  {
    id: 'p23',
    slug: 'zardozi-collar-blouse',
    name: 'Zardozi Collar Blouse',
    category: 'blouses',
    subcategory: 'blouses',
    images: [
      'https://images.pexels.com/photos/9398389/pexels-photo-9398389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Silk with Zardozi',
    careInstructions: 'Dry clean only.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['new'],
    description: 'A high-collar bridal blouse with dense zardozi embroidery, designed to be the statement piece under a plain drape saree.',
    retailPrice: 2799,
    wholesalePricePerPiece: 1950,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1950),
  },
  {
    id: 'p24',
    slug: 'backless-tasseled-blouse',
    name: 'Backless Tasseled Blouse',
    category: 'blouses',
    subcategory: 'blouses',
    images: [
      'https://images.pexels.com/photos/20790059/pexels-photo-20790059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Silk Blend',
    careInstructions: 'Dry clean only.',
    sizes: ['XS', 'S', 'M', 'L'],
    tags: ['sale'],
    description: 'A deep-back blouse finished with hand-tied tassels at the closure. A party-ready pick that turns any saree into a statement look.',
    retailPrice: 1599,
    compareAtPrice: 2099,
    wholesalePricePerPiece: 1050,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1050),
  },
  // JEWELLERY & ACCESSORIES
  {
    id: 'p25',
    slug: 'kundan-choker-necklace-set',
    name: 'Kundan Choker Necklace Set',
    category: 'jewellery-accessories',
    subcategory: 'jewellery-accessories',
    images: [
      'https://images.pexels.com/photos/7275701/pexels-photo-7275701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/17468605/pexels-photo-17468605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Kundan & Pearl',
    careInstructions: 'Store in a dry pouch, away from perfume.',
    tags: ['bestseller'],
    description: 'A bridal-weight Kundan choker with hanging pearl strings and matching jhumka earrings. The finishing touch for a heavy lehenga or Banarasi saree.',
    retailPrice: 2999,
    wholesalePricePerPiece: 1950,
    minOrderQty: 6,
    wholesaleTiers: makeTiers(1950),
  },
  {
    id: 'p26',
    slug: 'oxidised-jhumka-earrings',
    name: 'Oxidised Silver Jhumka Earrings',
    category: 'jewellery-accessories',
    subcategory: 'jewellery-accessories',
    images: [
      'https://images.pexels.com/photos/5872667/pexels-photo-5872667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/26969898/pexels-photo-26969898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Oxidised Silver',
    careInstructions: 'Wipe clean with a soft cloth.',
    tags: ['new'],
    description: 'Everyday oxidised jhumkas with a light bell drop. Pairs equally well with cotton sarees and casual kurtis.',
    retailPrice: 699,
    wholesalePricePerPiece: 420,
    minOrderQty: 12,
    wholesaleTiers: makeTiers(420),
  },
  {
    id: 'p27',
    slug: 'embroidered-potli-clutch',
    name: 'Embroidered Potli Clutch',
    category: 'jewellery-accessories',
    subcategory: 'jewellery-accessories',
    images: [
      'https://images.pexels.com/photos/17876038/pexels-photo-17876038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/37442997/pexels-photo-37442997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    fabric: 'Silk with Zari Embroidery',
    careInstructions: 'Spot clean only.',
    tags: ['sale'],
    description: 'A hand-embroidered potli clutch on a drawstring, sized for essentials at a wedding or festive evening.',
    retailPrice: 899,
    compareAtPrice: 1199,
    wholesalePricePerPiece: 560,
    minOrderQty: 12,
    wholesaleTiers: makeTiers(560),
  },
  {
    id: 'p28',
    slug: 'kundan-maang-tikka',
    name: 'Kundan Maang Tikka',
    category: 'jewellery-accessories',
    subcategory: 'jewellery-accessories',
    images: [
      'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/12062663/pexels-photo-12062663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ],
    fabric: 'Kundan & Beads',
    careInstructions: 'Store flat in a jewellery box.',
    tags: ['new', 'bestseller'],
    description: 'A classic Kundan maang tikka with a delicate hairpin chain — the essential bridal and festive hair accessory.',
    retailPrice: 549,
    wholesalePricePerPiece: 340,
    minOrderQty: 12,
    wholesaleTiers: makeTiers(340),
  },
];

export const heroImages = [
  {
    url: 'https://images.pexels.com/photos/9398390/pexels-photo-9398390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    headline: 'Sarees, Suits &',
    subheadline: 'Indo-Western. Always.',
    cta: 'Explore Sarees',
    ctaLink: '/collections/sarees',
  },
  {
    url: 'https://images.pexels.com/photos/34211603/pexels-photo-34211603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    headline: 'Timeless Ethnic.',
    subheadline: 'Timeless You.',
    cta: 'Shop Designer Suits',
    ctaLink: '/collections/suits',
  },
  {
    url: 'https://images.pexels.com/photos/12062663/pexels-photo-12062663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    headline: 'Crafted for',
    subheadline: 'Every Celebration.',
    cta: 'Shop Lehengas',
    ctaLink: '/collections/lehengas',
  },
  {
    url: 'https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    headline: 'Where Drape Meets',
    subheadline: 'Modern Silhouette.',
    cta: 'Shop Indo-Western',
    ctaLink: '/collections/indo-western',
  },
  {
    url: 'https://images.pexels.com/photos/26969898/pexels-photo-26969898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    headline: 'Elegance in',
    subheadline: 'Every Thread.',
    cta: 'New Arrivals',
    ctaLink: '/collections/new-arrivals',
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter(p => p.tags.includes(tag as 'new' | 'bestseller' | 'sale'));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.fabric.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

const URGENCY_MESSAGES = [
  'Only 2 left in stock',
  'Only 3 left in stock',
  'Dispatch in 48 Hrs',
  'Only 4 left in stock',
  'Selling fast',
  'Dispatch in 48 Hrs',
];

export function getUrgencyMessage(productId: string): string {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash * 31 + productId.charCodeAt(i)) >>> 0;
  }
  return URGENCY_MESSAGES[hash % URGENCY_MESSAGES.length];
}
