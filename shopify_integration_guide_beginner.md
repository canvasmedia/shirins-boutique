# Shirin's Boutique — Shopify Backend Integration Guide
### (Written for a beginner — every step explained)

---

## Part 1: Architecture Overview

Think of it like this: **Shopify is your warehouse and cashier.** Your website is the beautiful shop front. Customers browse your shop front, but when they buy something, Shopify handles the money, the receipt, and keeps track of stock.

*   **Custom Frontend**: Your current Next.js application, which handles the user interface.
*   **Shopify Backend**: Where products, inventory, customers, cart, checkout, payments, and orders are managed.

## Part 2: Step-by-Step Shopify Integration

### STEP 1 — Create Your Shopify Store (5 minutes)

1. Go to **shopify.com** → click **Start free trial**
2. Choose any plan (Basic = ₹1,499/month is enough to start)
3. Your store will have a URL like: `shirins-boutique.myshopify.com` — **save this, you'll need it**

---

### STEP 2 — Add Your Products in Shopify (30–60 minutes)

1. In Shopify Admin → click **Products** → **Add product**
2. For each product, fill in:
   - **Title** (product name)
   - **Description**
   - **Price** (in ₹)
   - **Images** (upload your product photos here)
   - **Variants** (e.g., sizes like S, M, L, XL)
   - **Inventory** (how many in stock)
   - **Handle** — this is the URL slug. Example: `banarasi-silk-saree-red` → Your product page will be `/products/banarasi-silk-saree-red`

> **Tip:** The "Handle" in Shopify must match the URL slugs in your frontend. For example, if Shopify handle is `banarasi-silk-saree`, your frontend URL should also be `/products/banarasi-silk-saree`.

3. Also create **Collections** (like "Sarees", "Suits", "New Arrivals") — these become your category pages

---

### STEP 3 — Get Your Shopify API Keys (10 minutes)

This is how your website talks to Shopify. Think of it like getting a password to access the warehouse.

1. In Shopify Admin → **Settings** (bottom left) → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Name it something like `Shirins Boutique Frontend`
4. Click **Configure Storefront API scopes** and check these boxes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_collections`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
5. Click **Save** → then **Install app**
6. You'll see a **Storefront API access token** — copy it and save it somewhere safe

---

### STEP 4 — Create a `.env.local` File in Your Project (5 minutes)

In your project folder, create a new file called `.env.local`:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=shirins-boutique.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_storefront_token_here
```

> **Caution:** Never upload `.env.local` to GitHub. It should be in your `.gitignore`.

---

### STEP 5 — Create the Shopify API Helper File (15 minutes)

Create a new file: `src/lib/shopify.ts`

This file is the "phone line" between your website and Shopify:

```typescript
// src/lib/shopify.ts

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

// This function sends questions to Shopify and gets answers back
export async function shopifyFetch(query: string, variables = {}) {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Cache for 60 seconds, then re-fetch
  });
  
  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  
  return json.data;
}
```

---

### STEP 6 — Replace Mock Product Data with Shopify Data (1–2 hours)

Create `src/lib/shopifyQueries.ts`:

```typescript
// src/lib/shopifyQueries.ts
import { shopifyFetch } from './shopify';

// --- GET ALL PRODUCTS IN A COLLECTION ---
export async function getCollection(handle: string) {
  const data = await shopifyFetch(`
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        title
        description
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice { amount currencyCode }
              }
              images(first: 1) {
                edges { node { url altText } }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price { amount }
                  }
                }
              }
              tags
            }
          }
        }
      }
    }
  `, { handle });
  
  return data.collection;
}

// --- GET A SINGLE PRODUCT ---
export async function getProduct(handle: string) {
  const data = await shopifyFetch(`
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 10) {
          edges { node { url altText } }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount }
            }
          }
        }
        tags
      }
    }
  `, { handle });
  
  return data.product;
}

// --- CREATE A CART ---
export async function createCart(variantId: string, quantity: number) {
  const data = await shopifyFetch(`
    mutation CreateCart($variantId: ID!, $quantity: Int!) {
      cartCreate(input: {
        lines: [{ merchandiseId: $variantId, quantity: $quantity }]
      }) {
        cart {
          id
          checkoutUrl
          cost {
            totalAmount { amount currencyCode }
          }
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount }
                    product { title handle images(first:1) { edges { node { url } } } }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { variantId, quantity });
  
  return data.cartCreate.cart;
}

// --- ADD ITEM TO EXISTING CART ---
export async function addToCart(cartId: string, variantId: string, quantity: number) {
  const data = await shopifyFetch(`
    mutation AddToCart($cartId: ID!, $variantId: ID!, $quantity: Int!) {
      cartLinesAdd(cartId: $cartId, lines: [{ merchandiseId: $variantId, quantity: $quantity }]) {
        cart {
          id
          checkoutUrl
          cost { totalAmount { amount currencyCode } }
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount }
                    product { title handle images(first:1) { edges { node { url } } } }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { cartId, variantId, quantity });
  
  return data.cartLinesAdd.cart;
}
```

---

### STEP 7 — Update Your Product Pages to Use Real Data

In `src/app/products/[slug]/page.tsx`, change how you get product data:

```typescript
// BEFORE (using fake mock data):
import { getProductBySlug } from '@/lib/mockData';
const product = getProductBySlug(params.slug);

// AFTER (using real Shopify data):
import { getProduct } from '@/lib/shopifyQueries';
const product = await getProduct(params.slug);
```

Do the same for your collection pages (`/collections/[slug]/page.tsx`).

---

### STEP 8 — Update the Cart Context to Use Shopify Cart

Update `src/lib/context.tsx`:

The cart ID from Shopify needs to be saved in the browser's `localStorage` so it persists even if the customer closes the browser. When they click "Checkout", you redirect them to `cart.checkoutUrl` — which takes them to Shopify's secure payment page.

Key changes to make:
1. Store `cartId` in `localStorage`
2. `addToCart` → calls Shopify's `cartCreate` or `cartLinesAdd` mutation
3. The cart `checkoutUrl` from Shopify → used when "Proceed to Checkout" is clicked

---

### STEP 9 — Set Up Razorpay for Indian Payments (30 minutes)

**This is done entirely inside Shopify Admin — your website code doesn't need to change at all for this step!**

1. Go to **Shopify App Store** → search **"Razorpay"**
2. Install the app called **"All-in-one Razorpay Payment Gateway"**
3. It will ask you to create a Razorpay account (free to create, they charge ~2% per transaction)
4. Complete Razorpay's KYC (business documents, bank account, PAN/GSTIN)
5. Once approved, go to Shopify Admin → **Settings → Payments** → you'll see Razorpay listed
6. Enable it, and also enable **Cash on Delivery** (Manual payment method — very important for Indian customers!)

That's it — Shopify handles the entire payment flow. Your website just redirects to `checkoutUrl`.

---

### STEP 10 — Deploy and Connect Domain

1. Push your code to **GitHub**
2. Deploy to **Vercel** (free for small stores — easiest option):
   - Go to vercel.com → **New Project** → connect your GitHub repo
   - Add your environment variables (the `.env.local` values) in Vercel's dashboard
   - Vercel gives you a URL like `shirins-boutique.vercel.app`
3. Buy a domain (e.g., `shirinsboutique.in` from GoDaddy/Hostinger)
4. Connect domain to Vercel (they have a guide for this)
5. In Shopify Admin → **Settings → Domains** → add your domain here too (for checkout branding)
