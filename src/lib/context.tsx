'use client';

/**
 * SiteContext — Global state for Shirin's Boutique
 *
 * Cart is now backed by Shopify's Storefront API.
 * - cartId is persisted in localStorage so the cart survives page refreshes.
 * - checkoutUrl from Shopify is exposed so the cart page can redirect.
 * - Wishlist remains local (no Shopify equivalent needed).
 * - Retail / wholesale mode toggle is kept intact.
 *
 * Graceful fallback: if Shopify credentials are not yet configured,
 * all cart calls no-op silently and the UI shows an empty cart.
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { SiteMode } from './types';
import type { NormalizedCartLine } from './shopifyTypes';
import { normalizeCartLine } from './shopifyTypes';
import {
  cartCreate,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  getCart,
  cartDiscountCodesUpdate,
} from './shopify';
import type { ShopifyCart } from './shopifyTypes';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SiteContextType {
  // Mode
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;

  // Cart (Shopify-backed)
  cartLines: NormalizedCartLine[];
  cartId: string | null;
  checkoutUrl: string | null;
  cartCount: number;
  cartTotal: number;
  cartLoading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateCartQuantity: (lineId: string, quantity: number) => Promise<void>;
  applyDiscountCode: (code: string) => Promise<void>;
  discountCodes: { code: string; applicable: boolean }[];

  // Wishlist (local)
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
}

const SiteContext = createContext<SiteContextType | null>(null);

const CART_ID_KEY = 'shirins_boutique_cart_id';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SiteProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<SiteMode>('retail');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [shopifyCart, setShopifyCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartLoading, setCartLoading] = useState(false);

  // ── Restore cart from localStorage on mount ──────────────────────────────
  useEffect(() => {
    const savedId = typeof window !== 'undefined'
      ? localStorage.getItem(CART_ID_KEY)
      : null;

    if (savedId) {
      setCartId(savedId);
      getCart(savedId).then((cart) => {
        if (cart) {
          setShopifyCart(cart);
        } else {
          // Cart expired or invalid — clear it
          localStorage.removeItem(CART_ID_KEY);
          setCartId(null);
        }
      });
    }
  }, []);

  // ── Persist cartId when it changes ─────────────────────────────────────
  useEffect(() => {
    if (cartId) {
      localStorage.setItem(CART_ID_KEY, cartId);
    }
  }, [cartId]);

  // ── Derived cart data ──────────────────────────────────────────────────
  const cartLines: NormalizedCartLine[] =
    shopifyCart?.lines.edges.map((e) => normalizeCartLine(e.node)) ?? [];

  const cartCount = shopifyCart?.totalQuantity ?? 0;

  const cartTotal = shopifyCart
    ? parseFloat(shopifyCart.cost.subtotalAmount.amount)
    : 0;

  const checkoutUrl = shopifyCart?.checkoutUrl ?? null;

  const discountCodes = shopifyCart?.discountCodes ?? [];

  // ── Cart helpers ───────────────────────────────────────────────────────

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setCartLoading(true);
    try {
      let updatedCart: ShopifyCart | null = null;

      if (!cartId) {
        // First item — create a new cart
        updatedCart = await cartCreate([{ merchandiseId: variantId, quantity }]);
      } else {
        // Check if this variant is already in the cart
        const existingLine = cartLines.find((l) => l.variantId === variantId);
        if (existingLine) {
          updatedCart = await cartLinesUpdate(cartId, [
            { id: existingLine.lineId, quantity: existingLine.quantity + quantity },
          ]);
        } else {
          updatedCart = await cartLinesAdd(cartId, [{ merchandiseId: variantId, quantity }]);
        }
      }

      if (updatedCart) {
        setShopifyCart(updatedCart);
        if (!cartId) setCartId(updatedCart.id);
      }
    } finally {
      setCartLoading(false);
    }
  }, [cartId, cartLines]);

  const removeFromCart = useCallback(async (lineId: string) => {
    if (!cartId) return;
    setCartLoading(true);
    try {
      const updatedCart = await cartLinesRemove(cartId, [lineId]);
      if (updatedCart) setShopifyCart(updatedCart);
    } finally {
      setCartLoading(false);
    }
  }, [cartId]);

  const updateCartQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cartId) return;
    if (quantity <= 0) {
      await removeFromCart(lineId);
      return;
    }
    setCartLoading(true);
    try {
      const updatedCart = await cartLinesUpdate(cartId, [{ id: lineId, quantity }]);
      if (updatedCart) setShopifyCart(updatedCart);
    } finally {
      setCartLoading(false);
    }
  }, [cartId, removeFromCart]);

  const applyDiscountCode = useCallback(async (code: string) => {
    if (!cartId) return;
    setCartLoading(true);
    try {
      const codes = [
        ...discountCodes.map((d) => d.code).filter((c) => c !== code),
        code,
      ];
      const updatedCart = await cartDiscountCodesUpdate(cartId, codes);
      if (updatedCart) setShopifyCart(updatedCart);
    } finally {
      setCartLoading(false);
    }
  }, [cartId, discountCodes]);

  // ── Mode ────────────────────────────────────────────────────────────────
  const setMode = useCallback((newMode: SiteMode) => setModeState(newMode), []);
  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'retail' ? 'wholesale' : 'retail'));
  }, []);

  // ── Wishlist ────────────────────────────────────────────────────────────
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  return (
    <SiteContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        cartLines,
        cartId,
        checkoutUrl,
        cartCount,
        cartTotal,
        cartLoading,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        applyDiscountCode,
        discountCodes,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
