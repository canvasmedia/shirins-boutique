'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { useSite } from '@/lib/context';
import { formatPrice } from '@/lib/mockData';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BackButton from '@/components/ui/BackButton';

export default function CartPage() {
  const {
    cartLines,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartLoading,
    checkoutUrl,
    applyDiscountCode,
    discountCodes,
    mode,
  } = useSite();

  const isWholesale = mode === 'wholesale';
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart' },
  ];

  const handleCheckout = () => {
    if (checkoutUrl) {
      // Redirect to Shopify hosted checkout — Shopify handles payment, tax, etc.
      window.location.href = checkoutUrl;
    }
  };

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    await applyDiscountCode(promoInput.trim());
    setPromoApplied(true);
  };

  const appliedCode = discountCodes.find((d) => d.applicable);

  // Shipping & tax estimates (Shopify calculates the real values at checkout)
  const shippingCost = cartTotal >= 999 ? 0 : 149;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + shippingCost + tax;

  if (cartLines.length === 0 && !cartLoading) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-16 text-center">
        <div className="text-left mb-3">
          <BackButton />
        </div>
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-16">
          <ShoppingBag size={64} className="mx-auto text-taupe/40 mb-6" />
          <h1 className="font-playfair text-3xl text-ink mb-3">Your Cart is Empty</h1>
          <p className="text-[14px] font-montserrat text-taupe mb-8">
            Discover our beautiful collection of Indian ethnic wear.
          </p>
          <Link
            href="/collections/sarees"
            className="inline-flex items-center gap-2 bg-ink text-gold font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 rounded hover:bg-ink/90 transition-all"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-10">
      <div className="mb-3">
        <BackButton />
      </div>
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-playfair text-3xl text-ink">
          {isWholesale ? 'Wholesale Cart' : 'Shopping Cart'}
        </h1>
        <span className="text-[12px] font-montserrat text-taupe">({cartLines.length} items)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Cart items */}
        <div>
          <AnimatePresence>
            {cartLines.map((line) => (
              <motion.div
                key={line.lineId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                className="flex gap-5 p-5 bg-surface rounded-2xl mb-4 shadow-sm border border-taupe/10"
              >
                {/* Image */}
                <Link href={`/products/${line.productHandle}`} className="relative flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden bg-ivory">
                  <Image
                    src={line.image}
                    alt={line.productTitle}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${line.productHandle}`}>
                    <h3 className="font-playfair text-[15px] text-ink hover:text-gold transition-colors leading-snug mb-1">
                      {line.productTitle}
                    </h3>
                  </Link>
                  {/* Selected options e.g. Size: M */}
                  {line.selectedOptions.filter(o => o.name !== 'Title').map(opt => (
                    <p key={opt.name} className="text-[11px] font-montserrat text-taupe mb-1">
                      {opt.name}: {opt.value}
                    </p>
                  ))}

                  <div className="flex items-center justify-between flex-wrap gap-3 mt-3">
                    {/* Qty control */}
                    {isWholesale ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-montserrat text-taupe">
                          Qty: {line.quantity}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center border border-taupe/25 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(line.lineId, line.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gold/10 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-[13px] font-montserrat font-semibold">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(line.lineId, line.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gold/10 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    )}

                    {/* Price */}
                    <span
                      className="font-montserrat font-bold text-[15px]"
                      style={{ color: isWholesale ? '#1B2A6B' : '#D4AF37' }}
                    >
                      {formatPrice(line.totalAmount)}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(line.lineId)}
                      className="text-taupe hover:text-rose transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Continue shopping */}
          <Link
            href="/collections/sarees"
            className="inline-flex items-center gap-2 text-[12px] font-montserrat text-taupe hover:text-gold transition-colors mt-4"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="bg-surface rounded-2xl p-6 shadow-sm border border-taupe/10 h-fit sticky top-28">
          <h2 className="font-playfair text-xl text-ink mb-5">Order Summary</h2>

          <div className="space-y-3 mb-5 pb-5 border-b border-taupe/15">
            <div className="flex justify-between text-[13px] font-montserrat">
              <span className="text-taupe">Subtotal</span>
              <span className="text-ink font-semibold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-[13px] font-montserrat">
              <span className="text-taupe">Shipping</span>
              <span className={shippingCost === 0 ? 'text-green-600 font-semibold' : 'text-ink font-semibold'}>
                {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-[13px] font-montserrat">
              <span className="text-taupe">GST (5%)</span>
              <span className="text-ink font-semibold">{formatPrice(tax)}</span>
            </div>
            {appliedCode && (
              <div className="flex justify-between text-[13px] font-montserrat">
                <span className="text-green-600">Discount ({appliedCode.code})</span>
                <span className="text-green-600 font-semibold">Applied ✓</span>
              </div>
            )}
          </div>

          <div className="flex justify-between mb-6">
            <span className="font-playfair text-lg text-ink">Total</span>
            <span className="font-playfair text-xl" style={{ color: isWholesale ? '#1B2A6B' : '#D4AF37' }}>
              {formatPrice(total)}
            </span>
          </div>

          {/* Promo code */}
          <form onSubmit={handleApplyPromo} className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="flex-1 bg-ivory border border-taupe/25 rounded px-3 py-2.5 text-[12px] font-montserrat outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="px-3 py-2.5 border-2 border-gold text-gold text-[11px] font-montserrat font-bold uppercase rounded hover:bg-gold hover:text-ink transition-all"
            >
              Apply
            </button>
          </form>

          {/* Checkout button — redirects to Shopify hosted checkout */}
          <button
            onClick={handleCheckout}
            disabled={cartLoading || !checkoutUrl}
            className="w-full flex items-center justify-center gap-2 bg-ink text-gold font-montserrat font-bold text-[13px] tracking-[0.1em] uppercase py-4 rounded-xl hover:bg-ink/90 transition-all mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {cartLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              isWholesale ? 'Place Wholesale Order' : 'Proceed to Checkout'
            )}
          </button>

          <p className="text-center text-[10px] font-montserrat text-taupe">
            🔒 Secure checkout via Shopify · Free returns · COD available
          </p>

          {/* Payment icons */}
          <div className="flex justify-center flex-wrap gap-2 mt-4">
            {['VISA', 'MC', 'UPI', 'COD'].map(icon => (
              <div key={icon} className="px-2 py-1 border border-taupe/20 rounded text-[9px] font-montserrat text-taupe">
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
