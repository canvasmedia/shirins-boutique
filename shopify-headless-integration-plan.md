# Shopify Headless Integration Plan
### Custom Frontend + Shopify Backend (Storefront API, Cart, India Payments)

---

## 0. Reality Check — What Indian D2C Brands Actually Run

Before locking in the architecture, worth knowing what's actually out there:

- **Most growing Indian D2C brands (e.g. Rezoni-style stores) run a customized Shopify Online Store 2.0 theme**, not a fully headless frontend. It's faster to ship, cheaper to maintain, and Shopify's native checkout already handles COD/UPI well.
- **True headless (custom React/Next.js frontend + Shopify backend)** is the path bigger, funded D2C brands take once they hit a design/performance ceiling the theme can't solve, or once they need a single backend powering web + app + kiosk.
- You said you want the second one. That's a legitimate and increasingly common choice — this plan is built for it. Just go in knowing it's more engineering work than a theme, and budget accordingly (see Section 9).

---

## 1. Architecture Overview

```
┌─────────────────────────┐        GraphQL (Storefront API)        ┌──────────────────────┐
│   Custom Frontend        │ ─────────────────────────────────────▶ │   Shopify Backend      │
│   (Next.js / React)      │ ◀───────────────────────────────────── │   (Products, Cart,     │
│   Hosted: Cloudflare      │        Product/Collection/Cart data    │   Customers, Orders,   │
│   Pages/Workers           │                                        │   Inventory)           │
└───────────┬──────────────┘                                        └──────────┬─────────────┘
            │                                                                    │
            │  Cart → checkoutUrl redirect                                      │
            ▼                                                                    │
┌─────────────────────────┐                                                     │
│  Shopify Hosted Checkout  │ ◀── Razorpay / PayU / Cashfree plugged in as ──────┘
│  (secure, PCI compliant)  │      the payment provider (Shopify Payments
│  UPI / Cards / COD        │      is NOT available in India)
└───────────┬──────────────┘
            │  Order created + webhook fired
            ▼
┌─────────────────────────┐
│  Order fulfillment layer  │  Admin API + Shipway/Delhivery/Shiprocket
│  (Shopify Admin + apps)   │  for tracking, synced back to frontend
└───────────────────────────┘
```

**Core principle:** Shopify owns products, inventory, customers, cart, checkout, payments, and orders. Your custom frontend owns *only* presentation — it reads data via the **Storefront API** and never touches sensitive payment data directly. This is what keeps PCI-DSS compliance, fraud protection, and RBI payment compliance entirely on Shopify + the gateway's shoulders instead of yours.

---

## 2. Shopify Backend Setup

### 2.1 Plan requirement
- Any paid Shopify plan (Basic and above) supports the Storefront API and the **Headless** sales channel.
- You do **not** need Shopify Plus for this. Plus only matters if you later want Checkout Extensibility (custom checkout UI branding) or B2B features.

### 2.2 Enable headless access
1. Shopify Admin → **Sales channels → Headless** (install if not present).
2. Create a new **Storefront API access token** scoped to:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_collections`
   - `unauthenticated_write_checkouts` / `unauthenticated_read_checkouts`
   - `unauthenticated_read_customer_tags` (if using customer accounts)
3. Note your storefront domain: `your-store.myshopify.com`.

### 2.3 Separate Admin API access (private, backend-only)
For order sync, inventory writes, webhook handling — create a **custom app** under Settings → Apps → Develop apps, with Admin API scopes:
- `read_orders`, `write_orders`
- `read_products`, `write_products` (only if you sync/manage products programmatically)
- `read_fulfillments`, `write_fulfillments`
- `read_customers` (if managing loyalty/accounts)

**This Admin API token must never reach the browser.** It lives only in your server/edge function environment variables.

---

## 3. Frontend Data Layer — Storefront API

### 3.1 What the frontend fetches
| Data | Storefront API query | Notes |
|---|---|---|
| Product catalog | `products`, `product(handle:)` | Includes variants, images, price |
| Collections | `collections`, `collection(handle:)` | For category/PLP pages |
| Search | `search` or `predictiveSearch` | Autocomplete-ready |
| Cart | `cartCreate`, `cartLinesAdd`, `cartLinesUpdate` | Cart persists via a cart ID (store in cookie/localStorage) |
| Customer (optional) | Customer Account API | For login, order history, saved addresses |

### 3.2 Example: creating a cart
```graphql
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      lines(first: 10) {
        edges { node { id quantity merchandise { ... on ProductVariant { id title } } } }
      }
    }
  }
}
```
The `checkoutUrl` returned here is what you redirect the customer to when they click "Checkout" — this hands off to Shopify's secure, hosted checkout page (still branded to match your store, but hosted on Shopify's domain/infrastructure).

### 3.3 Caching & freshness strategy
Given your earlier Cloudflare Pages decision — **use ISR (Incremental Static Regeneration) with webhook-triggered tag revalidation**, not a full static export:
- Pre-render product/collection pages at build and serve from CDN edge.
- Subscribe to Shopify webhooks (`products/update`, `inventory_levels/update`, `collections/update`).
- On webhook fire, call your revalidation endpoint to purge only the affected page's cache tag.
- Result: near-instant price/stock updates without full rebuilds, while still getting static-speed page loads.

---

## 4. Checkout & Payment — India Specifics (Critical Section)

### 4.1 The one thing every India-based Shopify plan gets wrong
**Shopify Payments is not available in India.** Every Indian merchant must connect a third-party payment gateway. Skipping this step or assuming Shopify Payments will "just work" is the most common launch-blocking mistake.

### 4.2 Recommended payment architecture: Checkout Redirect (safe, standard, fastest to ship)
```
Custom Frontend Cart → cart.checkoutUrl → Shopify Hosted Checkout
                                              │
                                    Razorpay/PayU/Cashfree configured
                                    as the payment provider in
                                    Shopify Admin → Settings → Payments
```
- Your custom frontend never touches card/UPI details.
- Shopify's checkout handles tax, shipping calculation, discount codes, fraud protection, and abandoned cart recovery automatically.
- This is the pattern used by the overwhelming majority of Shopify headless builds, Indian or otherwise — full custom checkout UIs are rare and add significant compliance/engineering overhead for little conversion gain.

### 4.3 Gateway selection for India
| Gateway | Best for | Notes |
|---|---|---|
| **Razorpay** (recommended default) | New/growing stores | Native Shopify app, best UPI Intent flow support, RTO Intelligence for COD risk scoring |
| **Cashfree** | High volume (₹50L+/month) | Slightly lower fees at scale |
| **PayU / CCAvenue** | Existing merchant accounts | Mature but webhook setup differs — check gateway-specific docs |

### 4.4 Payment methods to enable (non-negotiable for India)
- **UPI — Intent flow preferred** (one-tap app launch) over Collect flow (manual VPA entry) to reduce drop-off. UPI is the majority of Indian transaction volume.
- **Cards & Net Banking** via the gateway.
- **COD (Cash on Delivery)** — configured directly in Shopify (Settings → Payments → Manual payment methods), not through the gateway. Typically 20–40% of Indian ecommerce orders; skipping it meaningfully hurts conversion for fashion/accessories categories.
- **Wallets** (PhonePe, Paytm, GPay) — bundled through Razorpay/Cashfree, not natively supported by Shopify alone.

### 4.5 Setup checklist
1. Complete RBI-mandated KYC with your chosen gateway: PAN, GSTIN, verified business bank account.
2. Install the gateway's official Shopify app (e.g. "All-in-one Razorpay Payment Gateway") from the Shopify App Store.
3. Connect via OAuth (no manual API key entry needed for the standard plugin).
4. **Configure webhooks** for: payment success, payment failure, refund. This is the single most common failure point — a misconfigured webhook silently loses orders (customer pays, but the order never appears in Shopify). Test this explicitly before launch.
5. Enable COD with **order value limits and pincode restrictions** to control Return-to-Origin (RTO) risk — Razorpay's RTO Intelligence or similar tools can flag high-risk COD orders before dispatch.
6. Test in sandbox mode end-to-end: place order → payment → Shopify order created → confirmation email sent → refund flow.
7. Only then switch to live mode.

### 4.6 Advanced option (optional, not recommended for launch): fully custom checkout
If you eventually want checkout UI embedded entirely in your own frontend (no redirect to Shopify's checkout domain):
- You'd integrate Razorpay's Orders API directly, collect payment client-side, then create the order in Shopify via the **Admin API** (`orderCreate` mutation) on payment confirmation.
- This means **you** now own tax calculation, discount logic, fraud checks, and reconciliation — all things Shopify's checkout gives you for free.
- Only worth it on Shopify Plus with Checkout Extensibility, or if branding continuity through checkout is a proven, measured conversion lever for your audience. Treat this as a v2 optimization, not a v1 requirement.

---

## 5. Order Management & Fulfillment

- **Order sync:** Admin API webhook `orders/create` → update your own order-tracking DB/dashboard if you keep one, or simply rely on Shopify Admin as the single source of truth.
- **Shipping/tracking:** Indian brands commonly use Shipway, Shiprocket, or Delhivery apps (integrate via their Shopify app, which listens to `fulfillments/create` webhooks) to auto-generate tracking pages/SMS updates.
- **Order tracking page on your custom frontend:** call Shopify's Order Status page URL (returned after checkout) or build your own tracking lookup via the Storefront/Customer Account API if you want it fully custom-branded.

---

## 6. Hosting & Deployment (Cloudflare)

Given your existing Cloudflare Pages setup:

- **Frontend:** Next.js via OpenNext on Cloudflare Workers (or Cloudflare Pages), with ISR + tag-based revalidation as described in Section 3.3 — not a pure static export, since price/stock freshness matters once payments are live.
- **Environment variables (never commit to git):**
  ```
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=xxxxx        # public, read-only, safe client-side
  SHOPIFY_ADMIN_API_TOKEN=xxxxx                     # private, server/edge only
  SHOPIFY_WEBHOOK_SECRET=xxxxx                      # for verifying webhook signatures
  RAZORPAY_KEY_ID=xxxxx                             # only needed if doing advanced custom checkout
  RAZORPAY_KEY_SECRET=xxxxx
  REVALIDATE_SECRET=xxxxx                           # protects your ISR revalidation endpoint
  ```
- **Webhook endpoints to build:**
  - `/api/webhooks/shopify/products-update` → triggers ISR revalidation
  - `/api/webhooks/shopify/inventory-update` → triggers ISR revalidation
  - `/api/webhooks/shopify/orders-create` → optional, only if syncing orders elsewhere

---

## 7. Security Checklist

- [ ] Storefront token is public-scoped and read-only — safe to expose client-side, but still keep it in env vars, not hardcoded.
- [ ] Admin API token is **never** sent to the browser — server/edge function use only.
- [ ] All incoming Shopify webhooks verify the `X-Shopify-Hmac-SHA256` signature against your webhook secret before processing.
- [ ] Payment gateway keys (if doing advanced custom checkout) are stored server-side only, never in client bundles.
- [ ] HTTPS enforced everywhere; checkout redirect domain is Shopify's own (already HTTPS + PCI compliant).
- [ ] Rate-limit your revalidation endpoint so it can't be spammed/abused.

---

## 8. Implementation Phases

| Phase | What you build | Outcome |
|---|---|---|
| **1. Shopify backend setup** | Headless channel, Storefront token, Admin custom app | Backend ready to serve data |
| **2. Catalog integration** | Product/collection pages via Storefront API, ISR caching | Fast, fresh product pages live |
| **3. Cart** | Cart create/update/remove via Cart API | Working cart UI |
| **4. Checkout handoff** | Redirect to `checkoutUrl` | Customers can complete purchase |
| **5. India payment gateway** | Razorpay setup, UPI/COD/cards, webhook testing | Store can legally and reliably accept Indian payments |
| **6. Order & fulfillment sync** | Shipway/Shiprocket app, order webhooks | Order tracking works end-to-end |
| **7. Hosting hardening** | Cloudflare deploy, env vars, webhook revalidation live | Production-ready |

---

## 9. Rough Cost & Timeline Reference (India context)

- Custom Storefront API + Next.js build
- Ongoing: Shopify plan fee + gateway transaction fees (Razorpay ≈ 2% per domestic transaction) + Cloudflare hosting (often free tier–sufficient for small/mid traffic).
- Timeline for a lean single-developer build: **4–8 weeks** for Phases 1–6 above, assuming design/content are ready in parallel.

---

## 10. Reference Docs
- Shopify Storefront API: https://shopify.dev/docs/api/storefront
- Shopify Admin API: https://shopify.dev/docs/api/admin-graphql
- Shopify Headless channel: https://shopify.dev/docs/storefronts/headless
- Razorpay Shopify integration: https://razorpay.com/docs/payments/payment-gateway/ecommerce-plugins/shopify/
- Shopify webhooks reference: https://shopify.dev/docs/api/admin-rest/webhooks
