export type ProductTag = 'new' | 'bestseller' | 'sale';

export interface WholesaleTier {
  minQty: number;
  maxQty?: number;
  pricePerPiece: number;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  images: string[];
  fabric: string;
  careInstructions: string;
  sizes?: string[];
  tags: ProductTag[];
  description: string;
  retailPrice: number;
  compareAtPrice?: number;
  wholesalePricePerPiece: number;
  minOrderQty: number;
  wholesaleTiers: WholesaleTier[];
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  subcategories: Subcategory[];
}

export type SiteMode = 'retail' | 'wholesale';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  lotSize?: number;
}
