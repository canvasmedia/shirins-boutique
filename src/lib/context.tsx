'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { SiteMode, CartItem, Product } from './types';

interface SiteContextType {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, size?: string, lotSize?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
}

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<SiteMode>('retail');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const setMode = useCallback((newMode: SiteMode) => {
    setModeState(newMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState(prev => prev === 'retail' ? 'wholesale' : 'retail');
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1, size?: string, lotSize?: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size, lotSize }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const price = mode === 'wholesale'
      ? item.product.wholesalePricePerPiece * (item.lotSize || item.product.minOrderQty)
      : item.product.retailPrice * item.quantity;
    return sum + price;
  }, 0);

  return (
    <SiteContext.Provider value={{
      mode,
      setMode,
      toggleMode,
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      cartCount,
      cartTotal,
      toggleWishlist,
      isWishlisted,
      wishlistCount: wishlist.length,
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
