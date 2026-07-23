'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, MessageCircle, Truck, RefreshCw, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/mockData';
import { useSite } from '@/lib/context';
import { getProductByHandle } from '@/lib/shopify';
import { normalizeProduct } from '@/lib/shopifyTypes';
import type { Product } from '@/lib/types';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BackButton from '@/components/ui/BackButton';
import Badge from '@/components/ui/Badge';
import { AccordionItem } from '@/components/ui/Accordion';
import ProductCard from '@/components/ProductCard';
import WholesaleEnquiryForm from '@/components/WholesaleEnquiryForm';

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { mode, addToCart, toggleWishlist, isWishlisted } = useSite();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [lotSize, setLotSize] = useState<number>(6);
  const [addedToCart, setAddedToCart] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const isWholesale = mode === 'wholesale';

  // ── Resolve the real slug from the URL ───────────────────────────────────
  // When Cloudflare serves the shell HTML (slug prop = '_'), we read the
  // actual product handle from window.location.pathname, e.g.:
  //   /products/banarasi-silk-saree → 'banarasi-silk-saree'
  const resolvedSlug =
    typeof window !== 'undefined' && slug === '_'
      ? window.location.pathname.split('/products/')[1]?.split('/')[0] ?? slug
      : slug;

  // Fetch product from Shopify
  useEffect(() => {
    if (!resolvedSlug || resolvedSlug === '_') return;
    setLoading(true);
    getProductByHandle(resolvedSlug).then((shopifyProduct) => {
      if (shopifyProduct) {
        const normalized = normalizeProduct(shopifyProduct);
        setProduct(normalized);
        // Set default variant ID to the first variant
        const firstVariant = shopifyProduct.variants.edges[0]?.node;
        if (firstVariant) {
          setSelectedVariantId(firstVariant.id);
          setLotSize(normalized.minOrderQty);
        }
        // Fetch related products from same category collection
        import('@/lib/shopify').then(({ getProductsByCollectionHandle }) => {
          getProductsByCollectionHandle(normalized.category, 8).then((shopifyRelated) => {
            const related = shopifyRelated
              .map(normalizeProduct)
              .filter((p) => p.id !== normalized.id)
              .slice(0, 4);
            setRelatedProducts(related);
          });
        });
      }
      setLoading(false);
    });
  }, [resolvedSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[13px] font-montserrat text-taupe">Loading product…</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-3xl text-ink mb-3">Product Not Found</h1>
          <p className="text-[13px] font-montserrat text-taupe mb-6">This product doesn&apos;t seem to exist.</p>
          <Link href="/" className="text-gold border-b border-gold text-[12px] font-montserrat uppercase tracking-wide">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const displayPrice = isWholesale ? product.wholesalePricePerPiece : product.retailPrice;
  const comparePrice = !isWholesale ? product.compareAtPrice : undefined;
  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);
  const stock = selectedVariant?.quantityAvailable ?? null;

  const handleAddToCart = () => {
    // Use selected variant ID if available, otherwise fall back to product ID
    const idToAdd = selectedVariantId ?? product.id;
    addToCart(idToAdd, isWholesale ? lotSize : quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: product.category.replace(/-/g, ' '), href: `/collections/${product.category}` },
    { label: product.name },
  ];

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-8">
        {/* Back + Breadcrumbs */}
        <div className="mb-3">
          <BackButton />
        </div>
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 mb-16">
          {/* Image gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="hidden sm:flex flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === i ? 'border-gold' : 'border-taupe/20 hover:border-taupe/50'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ivory img-zoom">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={product.images[activeImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.tags.map(tag => <Badge key={tag} type={tag} />)}
                  {isWholesale && <Badge type="moq" label={`MOQ ${product.minOrderQty}`} />}
                </div>

                {/* Nav arrows for mobile */}
                {product.images.length > 1 && (
                  <div className="sm:hidden">
                    <button
                      onClick={() => setActiveImage((activeImage - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-surface/80 rounded-full flex items-center justify-center"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setActiveImage((activeImage + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-surface/80 rounded-full flex items-center justify-center"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile thumbnail dots */}
              {product.images.length > 1 && (
                <div className="sm:hidden flex justify-center gap-2 mt-3">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`rounded-full transition-all ${activeImage === i ? 'bg-gold' : 'bg-taupe/30'}`}
                      style={{ width: i === activeImage ? 20 : 6, height: 6 }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {/* Category tag */}
            <p className="text-[10px] font-montserrat tracking-[0.2em] uppercase text-taupe mb-2">
              {product.category.replace(/-/g, ' ')} {product.subcategory && `· ${product.subcategory.replace(/-/g, ' ')}`}
            </p>

            {/* Name */}
            <h1 className="font-playfair text-2xl lg:text-3xl text-ink mb-4 leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-5 pb-5 border-b border-taupe/20">
              {isWholesale ? (
                <>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-playfair text-3xl font-semibold" style={{ color: '#1B2A6B' }}>
                      {formatPrice(displayPrice)}
                    </span>
                    <span className="text-[12px] font-montserrat text-taupe">per piece</span>
                  </div>
                  {/* Tier table */}
                  <div className="rounded-xl overflow-hidden border border-taupe/20">
                    <div className="grid grid-cols-2 bg-ink/5 px-4 py-2">
                      <span className="text-[10px] font-montserrat tracking-wide uppercase text-taupe">Qty</span>
                      <span className="text-[10px] font-montserrat tracking-wide uppercase text-taupe">Price/pc</span>
                    </div>
                    {product.wholesaleTiers.map((tier) => (
                      <div key={tier.minQty} className="grid grid-cols-2 px-4 py-2 border-t border-taupe/10 hover:bg-gold/5 transition-colors">
                        <span className="text-[12px] font-montserrat text-ink">{tier.label}</span>
                        <span className="text-[12px] font-montserrat font-bold" style={{ color: '#1B2A6B' }}>
                          {formatPrice(tier.pricePerPiece)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="font-playfair text-3xl font-semibold text-gold">
                    {formatPrice(displayPrice)}
                  </span>
                  {comparePrice && (
                    <>
                      <span className="text-[14px] font-montserrat text-taupe line-through">
                        {formatPrice(comparePrice)}
                      </span>
                      <span className="text-[12px] font-montserrat text-rose font-bold">
                        {Math.round((1 - product.retailPrice / comparePrice) * 100)}% off
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Fabric */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-montserrat tracking-wide uppercase text-taupe">Fabric:</span>
              <span className="text-[12px] font-montserrat font-medium text-ink">{product.fabric}</span>
            </div>

            {/* Size selector (retail) */}
            {!isWholesale && product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-montserrat tracking-wide uppercase text-taupe">Size</span>
                  <button className="text-[10px] font-montserrat text-gold underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        const match = product.variants?.find((v) => v.size === size);
                        if (match) setSelectedVariantId(match.id);
                      }}
                      className={`w-12 h-10 text-[12px] font-montserrat rounded border-2 transition-all ${
                        selectedSize === size
                          ? 'border-gold bg-gold/10 text-ink font-bold'
                          : 'border-taupe/25 text-taupe hover:border-gold hover:text-ink'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lot size selector (wholesale) */}
            {isWholesale && (
              <div className="mb-5">
                <span className="text-[11px] font-montserrat tracking-wide uppercase text-taupe block mb-2">
                  Lot Size (min. {product.minOrderQty} pcs)
                </span>
                <div className="flex gap-2">
                  {[product.minOrderQty, product.minOrderQty * 2, product.minOrderQty * 4].map(qty => (
                    <button
                      key={qty}
                      onClick={() => setLotSize(qty)}
                      className={`px-4 py-2 text-[12px] font-montserrat rounded-lg border-2 transition-all ${
                        lotSize === qty
                          ? 'border-wholesale bg-wholesale/10 text-wholesale font-bold'
                          : 'border-taupe/25 text-taupe hover:border-wholesale hover:text-ink'
                      }`}
                      style={lotSize === qty ? { borderColor: '#1B2A6B', color: '#1B2A6B' } : undefined}
                    >
                      {qty} pcs
                    </button>
                  ))}
                </div>
                {isWholesale && (
                  <p className="text-[11px] font-montserrat text-taupe mt-2">
                    Total: {formatPrice(displayPrice * lotSize)}
                  </p>
                )}
              </div>
            )}

            {/* Stock status (retail only) */}
            {!isWholesale && stock !== null && (
              <p className={`text-[12px] font-montserrat font-semibold mb-4 ${stock <= 5 ? 'text-rose' : 'text-taupe'}`}>
                {stock === 0
                  ? 'Out of stock'
                  : stock <= 5
                  ? `Only ${stock} left in stock`
                  : 'In stock'}
              </p>
            )}

            {/* Quantity (retail only) */}
            {!isWholesale && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-montserrat tracking-wide uppercase text-taupe">Qty:</span>
                <div className="flex items-center border border-taupe/25 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-ink hover:bg-gold/10 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-[14px] font-montserrat font-semibold text-ink">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-ink hover:bg-gold/10 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-nowrap gap-2 sm:gap-3 mb-6">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className="flex-1 min-w-0 flex items-center justify-center gap-1.5 sm:gap-2 bg-ink text-gold text-[11px] sm:text-[12px] font-montserrat font-bold tracking-[0.04em] sm:tracking-[0.08em] uppercase px-2 py-4 rounded-lg hover:bg-ink/90 transition-all"
              >
                <ShoppingBag size={16} className="flex-shrink-0" />
                <span className="truncate">
                  {addedToCart ? '✓ Added!' : isWholesale ? `Add Lot (${lotSize} pcs)` : 'Add to Cart'}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setEnquiryOpen(true)}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 border-2 border-gold text-gold px-3 sm:px-4 py-4 text-[11px] sm:text-[12px] font-montserrat font-bold tracking-[0.04em] sm:tracking-[0.08em] uppercase rounded-lg hover:bg-gold hover:text-ink transition-all whitespace-nowrap"
              >
                <MessageCircle size={16} className="flex-shrink-0" />
                {isWholesale ? 'Request Quote' : 'WhatsApp'}
              </motion.button>

              <motion.button
                onClick={() => toggleWishlist(product.id)}
                whileTap={{ scale: 0.9 }}
                className={`w-12 sm:w-14 flex-shrink-0 flex items-center justify-center border-2 rounded-lg transition-all ${
                  wishlisted ? 'border-rose bg-rose/10' : 'border-taupe/30 hover:border-rose'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={18} className={wishlisted ? 'fill-rose text-rose' : 'text-taupe'} />
              </motion.button>
            </div>

            {/* Delivery */}
            <div className="flex flex-col gap-2.5 p-4 bg-ivory rounded-xl mb-6">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-gold flex-shrink-0" />
                <p className="text-[12px] font-montserrat text-ink">
                  <span className="font-semibold">Estimated delivery:</span> 5–7 business days across India
                </p>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-gold flex-shrink-0" />
                <p className="text-[12px] font-montserrat text-ink">15-day easy returns &amp; exchanges</p>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-gold flex-shrink-0" />
                <p className="text-[12px] font-montserrat text-ink">100% authentic, quality-verified products</p>
              </div>
            </div>

            {/* Accordion info */}
            <div>
              <AccordionItem title="Fabric &amp; Care" defaultOpen>
                <p><strong>Fabric:</strong> {product.fabric}</p>
                <p className="mt-1"><strong>Care:</strong> {product.careInstructions}</p>
                {product.category === 'sarees' && (
                  <p className="mt-1">Blouse piece included with matching fabric.</p>
                )}
              </AccordionItem>
              <AccordionItem title={isWholesale ? 'Bulk Order Terms' : 'Shipping &amp; Returns'}>
                {isWholesale ? (
                  <>
                    <p>Minimum order quantity: {product.minOrderQty} pieces per style.</p>
                    <p className="mt-1">Custom packaging available for orders of 24+ pieces.</p>
                    <p className="mt-1">Dispatch within 7–10 business days from order confirmation.</p>
                    <p className="mt-1">Payment: 50% advance, 50% before dispatch.</p>
                  </>
                ) : (
                  <>
                    <p>Free shipping on orders above ₹999. Standard delivery 5–7 days.</p>
                    <p className="mt-1">15-day hassle-free return policy. Item must be unused and in original packaging.</p>
                    <p className="mt-1">Cash on delivery available across India.</p>
                  </>
                )}
              </AccordionItem>
              <AccordionItem title="Product Description">
                {product.description}
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-taupe/20 pt-12">
            <h2 className="font-playfair text-2xl lg:text-3xl text-ink mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Wholesale enquiry modal */}
      <WholesaleEnquiryForm
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        productName={product.name}
      />
    </>
  );
}
