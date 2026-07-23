/**
 * Shopify Storefront API — TypeScript Types
 *
 * These mirror Shopify's GraphQL response shapes.
 * The `normalizeProduct` helper converts them into the site's
 * existing `Product` type so all existing UI components work
 * without any changes.
 */

import type { Product, WholesaleTier } from './types';

// ─── Raw Shopify API shapes ───────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: ShopifySelectedOption[];
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
  image: ShopifyImage | null;
  sku: string | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  tags: string[];
  vendor: string;
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoneyV2;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ShopifyVariant }[];
  };
  metafields?: {
    key: string;
    value: string;
    namespace: string;
  }[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: { node: ShopifyProduct }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

// ─── Cart types ───────────────────────────────────────────────────────────────

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: ShopifySelectedOption[];
    product: {
      id: string;
      handle: string;
      title: string;
      images: { edges: { node: ShopifyImage }[] };
    };
    price: ShopifyMoneyV2;
    compareAtPrice: ShopifyMoneyV2 | null;
  };
  cost: {
    totalAmount: ShopifyMoneyV2;
    subtotalAmount: ShopifyMoneyV2;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: { node: ShopifyCartLine }[];
  };
  cost: {
    subtotalAmount: ShopifyMoneyV2;
    totalAmount: ShopifyMoneyV2;
    totalTaxAmount: ShopifyMoneyV2 | null;
  };
  discountCodes: {
    code: string;
    applicable: boolean;
  }[];
}

// ─── Normaliser — Shopify → existing Product type ─────────────────────────────

/**
 * Converts a Shopify product into the site's internal `Product` type.
 * This lets all existing UI components (ProductCard, ProductDetail, etc.)
 * work with Shopify data without any structural changes.
 */
export function normalizeProduct(p: ShopifyProduct): Product {
  const images = p.images.edges.map((e) => e.node.url);
  const variants = p.variants.edges.map((e) => e.node);

  // Collect unique size option values from variants
  const sizes = Array.from(
    new Set(
      variants.flatMap((v) =>
        v.selectedOptions
          .filter((o) => o.name.toLowerCase() === 'size')
          .map((o) => o.value)
      )
    )
  );

  const retailPrice = parseFloat(p.priceRange.minVariantPrice.amount);
  const compareAtRaw = parseFloat(p.compareAtPriceRange.minVariantPrice.amount);
  const compareAtPrice = compareAtRaw > retailPrice ? compareAtRaw : undefined;

  // Derive category from productType (matches collection slug convention)
  const category = p.productType
    ? p.productType.toLowerCase().replace(/\s+/g, '-')
    : 'all';

  // Derive subcategory from tags prefixed with "sub:" e.g. "sub:silk-sarees"
  const subTag = p.tags.find((t) => t.startsWith('sub:'));
  const subcategory = subTag ? subTag.replace('sub:', '') : '';

  // Fabric from tags prefixed with "fabric:" e.g. "fabric:silk"
  const fabricTag = p.tags.find((t) => t.startsWith('fabric:'));
  const fabric = fabricTag ? fabricTag.replace('fabric:', '') : (p.vendor || 'Handcrafted');

  // Care instructions from tags prefixed with "care:"
  const careTag = p.tags.find((t) => t.startsWith('care:'));
  const careInstructions = careTag ? careTag.replace('care:', '') : 'Dry clean recommended';

  // Product tags (new / bestseller / sale)
  const productTags: ('new' | 'bestseller' | 'sale')[] = [];
  if (p.tags.includes('new') || p.tags.includes('new-arrival')) productTags.push('new');
  if (p.tags.includes('bestseller') || p.tags.includes('best-seller')) productTags.push('bestseller');
  if (p.tags.includes('sale') || p.tags.includes('on-sale')) productTags.push('sale');

  // Wholesale pricing — read from tags: "wholesale:X" for per-piece price
  const wholesaleTag = p.tags.find((t) => t.startsWith('wholesale:'));
  const wholesalePricePerPiece = wholesaleTag
    ? parseFloat(wholesaleTag.replace('wholesale:', ''))
    : Math.round(retailPrice * 0.6); // default: 60% of retail

  // MOQ from tag "moq:X"
  const moqTag = p.tags.find((t) => t.startsWith('moq:'));
  const minOrderQty = moqTag ? parseInt(moqTag.replace('moq:', ''), 10) : 6;

  // Standard wholesale tiers
  const wholesaleTiers: WholesaleTier[] = [
    { minQty: minOrderQty, maxQty: minOrderQty * 2 - 1, pricePerPiece: wholesalePricePerPiece, label: `${minOrderQty}–${minOrderQty * 2 - 1} pcs` },
    { minQty: minOrderQty * 2, maxQty: minOrderQty * 4 - 1, pricePerPiece: Math.round(wholesalePricePerPiece * 0.95), label: `${minOrderQty * 2}–${minOrderQty * 4 - 1} pcs` },
    { minQty: minOrderQty * 4, pricePerPiece: Math.round(wholesalePricePerPiece * 0.9), label: `${minOrderQty * 4}+ pcs` },
  ];

  return {
    id: p.id,
    slug: p.handle,
    name: p.title,
    category,
    subcategory,
    images: images.length > 0 ? images : ['/placeholder-product.jpg'],
    fabric,
    careInstructions,
    sizes: sizes.length > 0 ? sizes : undefined,
    tags: productTags,
    description: p.description,
    retailPrice,
    compareAtPrice,
    wholesalePricePerPiece,
    minOrderQty,
    wholesaleTiers,
    variants: variants.map((v) => ({
      id: v.id,
      size: v.selectedOptions.find((o) => o.name.toLowerCase() === 'size')?.value,
      quantityAvailable: v.quantityAvailable,
      availableForSale: v.availableForSale,
    })),
  };
}

/**
 * Normalizes a Shopify cart line for the site's CartItem format.
 * Returns just the variant ID and product handle for Shopify mutations.
 */
export interface NormalizedCartLine {
  lineId: string;           // Shopify cart line ID (for mutations)
  variantId: string;        // Shopify variant ID (merchandise.id)
  productHandle: string;    // For linking to /products/[handle]
  productTitle: string;
  variantTitle: string;
  selectedOptions: ShopifySelectedOption[];
  image: string;
  price: number;
  compareAtPrice: number | null;
  quantity: number;
  totalAmount: number;
}

export function normalizeCartLine(line: ShopifyCartLine): NormalizedCartLine {
  return {
    lineId: line.id,
    variantId: line.merchandise.id,
    productHandle: line.merchandise.product.handle,
    productTitle: line.merchandise.product.title,
    variantTitle: line.merchandise.title,
    selectedOptions: line.merchandise.selectedOptions,
    image: line.merchandise.product.images.edges[0]?.node.url ?? '/placeholder-product.jpg',
    price: parseFloat(line.merchandise.price.amount),
    compareAtPrice: line.merchandise.compareAtPrice
      ? parseFloat(line.merchandise.compareAtPrice.amount)
      : null,
    quantity: line.quantity,
    totalAmount: parseFloat(line.cost.totalAmount.amount),
  };
}
