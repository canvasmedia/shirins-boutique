# Shirin's Boutique — How to Add Products (Beginner Guide)

This is your everyday manual. Your website is **headless**: the design lives on
Cloudflare, but **all product data comes from Shopify**. You never touch code to
add a product — you add it in Shopify Admin, and it appears on the site within
~30 seconds. No rebuild, no developer.

But your site reads Shopify data using a few **naming rules**. If you follow
them, products land in the right category, show the right fabric, and appear in
the right carousels automatically. This guide is those rules.

---

## 1. The one big idea: Collections drive the pages

Every page that shows a list of products is powered by a **Shopify Collection
with a specific handle** (the URL-name of the collection). If the collection
doesn't exist, the page is empty.

**Create these collections once** (Shopify Admin → Products → Collections → Create).
Make them **Automated** (smart) so products join by themselves:

| Collection to create | Handle (must be exact) | Auto-condition to set | Powers |
|---|---|---|---|
| Sarees | `sarees` | Product type = `Sarees` | /collections/sarees + saree product "related" |
| Salwar Suits | `suits` | Product type = `Suits` | /collections/suits |
| Lehenga | `lehengas` | Product type = `Lehengas` | /collections/lehengas |
| Western Wear | `western-wear` | Product type = `Western Wear` | /collections/western-wear |
| Jewellery & Accessories | `jewellery-accessories` | Product type = `Accessories` | Home carousel + page |
| New Arrivals | `new-arrivals` | Tag = `new` | Home "New Arrivals" carousel |
| Best Sellers | `best-sellers` | Tag = `bestseller` | Home "Best Sellers" carousel |
| Sale | `sale` | Tag = `sale` | /collections/sale |
| Designer Blouses | `blouses` | Product type = `Blouses` | Home "Designer Blouses" carousel |

> **How to check the handle:** when creating a collection, scroll to the bottom
> → "Search engine listing" → the URL ends in `/collections/HANDLE`. Edit it to
> match the table exactly (lowercase, hyphens, no spaces).

If a home carousel looks empty, it's because that collection doesn't exist yet
or has no products matching its condition.

---

## 2. The naming rules for a single product

When you add a product, these fields matter to the website:

### a) Product Type → decides the top-level category
Set **Product type** to exactly one of:
- `Sarees`
- `Suits`
- `Lehengas`
- `Western Wear`
- `Accessories`
- `Blouses`

⚠️ Use these exact words. "Salwar Suits" or "Saree" (singular) will NOT match
your category pages. Top-level is always the plural form above.

### b) Tags → decide subcategory, fabric, care, and badges
Tags are how the site knows the finer details. Use these **prefixed** tags:

| Tag format | Example | What it does |
|---|---|---|
| `sub:xxx` | `sub:silk-sarees` | Subcategory (see the tree in §3) |
| `fabric:xxx` | `fabric:silk` | Shows "Fabric: Silk" + powers the fabric filter |
| `care:xxx` | `care:Dry clean only` | Shows care instructions on the page |
| `new` | `new` | Adds a "New" badge + joins New Arrivals |
| `bestseller` | `bestseller` | Adds a "Bestseller" badge + joins Best Sellers |
| `sale` | `sale` | Adds a "Sale" badge + joins Sale |

Optional (only if you sell wholesale on this product):
| `wholesale:850` | Per-piece wholesale price in ₹ (else defaults to 60% of retail) |
| `moq:6` | Minimum order quantity for wholesale (else 6) |

### c) Price & Compare-at-price → the discount
- **Price** = what the customer pays (e.g. ₹2,499).
- **Compare-at price** = the higher "original" price (e.g. ₹3,499). The site
  auto-shows the strikethrough and calculates "29% off". Leave blank for no discount.

### d) Inventory → the "Only N left" stock line
- Turn ON **"Track quantity"** and enter the real stock count.
- The product page shows **"Only 3 left in stock"** (red) when 5 or fewer,
  otherwise "In stock". This is now live and real — it reads your Shopify count.

### e) Sizes → use Variants
- If a product has sizes, add a **Variant option named exactly `Size`** (S, M, L,
  or Free Size). Each size gets its own stock count. The site shows size buttons
  and the stock updates per size.
- Sarees usually don't need sizes — skip variants, just set one inventory count.

### f) Images
- Upload to the product in Shopify. First image = main thumbnail.
- They serve from Shopify's CDN automatically — no upload to the website needed.

---

## 3. Your category tree → exact tags to use

Top-level = **Product type**. Second level = **`sub:` tag**. The specific
weave/style goes in the **product title** (and optionally a plain tag so search
finds it).

```
SAREES                         → Product type: Sarees
├── Silk Sarees                → sub:silk-sarees   + fabric:silk
│     ├── Gadwal Silk          → title "... Gadwal Silk Saree"
│     ├── Kanchipuram Silk     → title "... Kanchipuram Silk Saree"
│     ├── Sico                 → title "... Sico Silk Saree"
│     ├── Jamdani              → title "... Jamdani Saree"
│     ├── Modal Silk           → title "... Modal Silk Saree"
│     ├── Tasar Silk           → title "... Tasar Silk Saree"
│     ├── Bishnupuri Silk      → title "... Bishnupuri Silk Saree"
│     └── Katan Banarasi       → title "... Katan Banarasi Saree"
├── Cotton & Linen Sarees      → sub:cotton-linen-sarees
│     ├── Donekhali Tant       → title "... Donekhali Tant Saree" + fabric:cotton
│     └── Linen Sarees         → title "... Linen Saree" + fabric:linen
└── Designer Sarees            → sub:designer-sarees
      └── Zardosi Work          → title "... Zardosi Work Saree"

SALWAR SUITS                   → Product type: Suits
├── Cotton Suits               → sub:cotton-suits      + fabric:cotton
├── Tissue Suits               → sub:tissue-suits
├── Modal Suits                → sub:modal-suits
├── Chiffon/Chinon Suits       → sub:chiffon-suits     + fabric:chiffon
├── Crepe Suits                → sub:crepe-suits
└── Designer Suits             → sub:designer-suits

LEHENGA                        → Product type: Lehengas
└── Bridal & Festive Lehenga   → sub:bridal-festive-lehenga

WESTERN WEAR                   → Product type: Western Wear
├── Western Dresses            → sub:western-dresses
├── Cord Sets                  → sub:cord-sets
└── Indo-Western Collection    → sub:indo-western
```

> The `fabric:` values that also power the fabric filter are:
> `silk`, `cotton`, `georgette`, `organza`, `velvet`, `chiffon`.
> Use the closest one; for linen/tissue etc. the fabric name still displays,
> it just won't have a dedicated filter chip (fine for now).

---

## 4. Worked example — adding one product

**Adding: a Tasar Silk saree, ₹2,499 (was ₹3,499), 3 in stock, a new arrival.**

In Shopify Admin → Products → Add product:

| Field | What to enter |
|---|---|
| Title | `Handwoven Tasar Silk Saree — Rust Gold` |
| Description | Your marketing text (fabric, weave, blouse included, etc.) |
| Media | Upload 3–5 photos |
| Product type | `Sarees` |
| Tags | `sub:silk-sarees`, `fabric:silk`, `care:Dry clean only`, `new` |
| Price | `2499` |
| Compare-at price | `3499` |
| Track quantity | ON, quantity `3` |
| SKU | `SAR-TASAR-001` (see §5) |
| Status | Active |

Save. Within ~30 seconds it appears at `/collections/sarees`, in the "New
Arrivals" home carousel, with a "29% off" badge and "Only 3 left in stock".

---

## 5. SKU convention (your internal product code)

SKU is your private code for tracking stock — customers rarely see it. Keep it
consistent so you can find things fast:

```
CATEGORY-TYPE-NUMBER
```

| Category prefix | Example SKU | For |
|---|---|---|
| `SAR-` | `SAR-TASAR-001` | Sarees (add weave: TASAR, KANCH, GADWAL…) |
| `SUIT-` | `SUIT-COTTON-001` | Salwar suits |
| `LEH-` | `LEH-BRIDAL-001` | Lehengas |
| `ACC-` | `ACC-JHUMKA-001` | Accessories / jewellery |

Increment the number for each new item (001, 002…). If a product has sizes,
Shopify auto-suffixes per variant, or you can do `SUIT-COTTON-001-M`.

---

## 6. Quick checklist for every new product

- [ ] Product type set to the exact plural (`Sarees` / `Suits` / `Lehengas` / `Accessories` / `Blouses`)
- [ ] `sub:` tag added
- [ ] `fabric:` tag added (if it maps to a known fabric)
- [ ] `care:` tag added
- [ ] Price + Compare-at price (if on offer)
- [ ] Track quantity ON with real stock number
- [ ] `Size` variant added (only if sized)
- [ ] SKU set
- [ ] 3+ photos
- [ ] Status = Active
- [ ] Add `new` / `bestseller` / `sale` tag if applicable

Follow this and the site stays correct forever without touching code.
```
