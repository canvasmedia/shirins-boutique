/**
 * Shopify Storefront API — GraphQL Client
 *
 * This file is the single point of contact between the Next.js app
 * and the Shopify Storefront API. It runs entirely client-side
 * (because the site uses `output: "export"` / static export for
 * Cloudflare Pages), so we use NEXT_PUBLIC_ env vars.
 *
 * All functions return typed data or null — they never throw.
 * The UI handles the null case by showing empty/loading states.
 */

import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
} from './shopifyTypes';

// ─── Config ───────────────────────────────────────────────────────────────────

const SHOPIFY_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? '';

const STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '';

const SHOPIFY_CONFIGURED = Boolean(SHOPIFY_DOMAIN && STOREFRONT_TOKEN);

const STOREFRONT_API_URL = SHOPIFY_CONFIGURED
  ? `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`
  : '';

// ─── In-memory cache ──────────────────────────────────────────────────────────
// Caches Shopify responses for 30 seconds in the browser session.
// This means:
//   - First visit to a collection → fresh fetch from Shopify
//   - Revisit within 30 seconds → instant from cache (no API call)
//   - After 30 seconds → fresh fetch (picks up any Shopify Admin changes)
//   - You update a product price → reflected for all visitors within 30 seconds
//   - NO frontend rebuild or redeploy needed for product data changes
//   - Cart/checkout mutations are NEVER cached — they always hit Shopify live,
//     so a customer can never actually check out at a stale cached price.

const CACHE_TTL_MS = 30 * 1000; // 30 seconds

interface CacheEntry {
  data: unknown;
  expiresAt: number;
}

const responseCache = new Map<string, CacheEntry>();

// ─── Base fetcher ─────────────────────────────────────────────────────────────

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  if (!SHOPIFY_CONFIGURED) {
    // Credentials not set yet — return null gracefully
    return null;
  }

  // Build a cache key from the query + variables
  const cacheKey = query.trim().slice(0, 80) + JSON.stringify(variables ?? {});
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data as T;
  }

  try {
    const res = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      console.error(`[Shopify] HTTP ${res.status}: ${res.statusText}`);
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.error('[Shopify] GraphQL errors:', json.errors);
      return null;
    }

    const data = json.data as T;

    // Store in cache — mutations (cart) should NOT be cached (they have no variables pattern)
    // We only cache GET-style queries by checking if the query contains 'mutation'
    if (!query.trim().toLowerCase().startsWith('mutation') && !query.includes('mutation ')) {
      responseCache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS });
    }

    return data;
  } catch (err) {
    console.error('[Shopify] Fetch error:', err);
    return null;
  }
}

// ─── GraphQL fragments ────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    productType
    tags
    vendor
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges { node { url altText width height } }
    }
    variants(first: 30) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          sku
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image { url altText width height }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions { name value }
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              product {
                id
                handle
                title
                images(first: 1) {
                  edges { node { url altText width height } }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
      }
    }
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    discountCodes { code applicable }
  }
`;

// ─── Product queries ───────────────────────────────────────────────────────────

/** Fetch a single product by its handle (URL slug) */
export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }
    `,
    { handle }
  );
  return data?.product ?? null;
}

/** Fetch up to 250 products from a collection by its handle */
export async function getProductsByCollectionHandle(
  handle: string,
  first = 50
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>(
    `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id handle title
        products(first: $first) {
          edges { node { ...ProductFields } }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
    `,
    { handle, first }
  );
  return data?.collection?.products.edges.map((e) => e.node) ?? [];
}

/** Fetch all products site-wide (used for related products, search, etc.) */
export async function getAllProducts(first = 250): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(
    `
    ${PRODUCT_FRAGMENT}
    query GetAllProducts($first: Int!) {
      products(first: $first) {
        edges { node { ...ProductFields } }
      }
    }
    `,
    { first }
  );
  return data?.products.edges.map((e) => e.node) ?? [];
}

/** Fetch products from multiple collections at once (for home page carousels) */
export async function getProductsFromCollections(
  handles: string[],
  firstPerCollection = 12
): Promise<Record<string, ShopifyProduct[]>> {
  // Build a dynamic multi-collection query with aliases
  const queries = handles
    .map(
      (handle, i) => `
      col${i}: collection(handle: "${handle}") {
        products(first: ${firstPerCollection}) {
          edges { node { ...ProductFields } }
        }
      }
    `
    )
    .join('\n');

  const data = await shopifyFetch<Record<string, { products: { edges: { node: ShopifyProduct }[] } } | null>>(
    `
    ${PRODUCT_FRAGMENT}
    query GetMultipleCollections {
      ${queries}
    }
    `
  );

  if (!data) return Object.fromEntries(handles.map((h) => [h, []]));

  return Object.fromEntries(
    handles.map((handle, i) => [
      handle,
      data[`col${i}`]?.products.edges.map((e) => e.node) ?? [],
    ])
  );
}

/** Search products by a text query */
export async function searchProducts(
  query: string,
  first = 20
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(
    `
    ${PRODUCT_FRAGMENT}
    query SearchProducts($query: String!, $first: Int!) {
      products(query: $query, first: $first) {
        edges { node { ...ProductFields } }
      }
    }
    `,
    { query, first }
  );
  return data?.products.edges.map((e) => e.node) ?? [];
}

// ─── Cart mutations ────────────────────────────────────────────────────────────

/** Create a new cart (called on first "Add to Cart") */
export async function cartCreate(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] } }>(
    `
    ${CART_FRAGMENT}
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    `,
    { lines }
  );

  if (data?.cartCreate.userErrors.length) {
    console.error('[Shopify] cartCreate errors:', data.cartCreate.userErrors);
  }
  return data?.cartCreate.cart ?? null;
}

/** Add lines to an existing cart */
export async function cartLinesAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart; userErrors: { message: string }[] } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    `,
    { cartId, lines }
  );
  return data?.cartLinesAdd.cart ?? null;
}

/** Update line quantities in an existing cart */
export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
    `,
    { cartId, lines }
  );
  return data?.cartLinesUpdate.cart ?? null;
}

/** Remove lines from a cart */
export async function cartLinesRemove(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }
    `,
    { cartId, lineIds }
  );
  return data?.cartLinesRemove.cart ?? null;
}

/** Fetch an existing cart by ID (for restoring state on page load) */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
    `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    `,
    { cartId }
  );
  return data?.cart ?? null;
}

/** Apply or remove a discount code on a cart */
export async function cartDiscountCodesUpdate(
  cartId: string,
  discountCodes: string[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartDiscountCodesUpdate: { cart: ShopifyCart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
      cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
        cart { ...CartFields }
      }
    }
    `,
    { cartId, discountCodes }
  );
  return data?.cartDiscountCodesUpdate.cart ?? null;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/** True when Shopify credentials are configured */
export function isShopifyConfigured(): boolean {
  return SHOPIFY_CONFIGURED;
}
