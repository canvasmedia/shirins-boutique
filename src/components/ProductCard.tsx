'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/mockData';
import { useSite } from '@/lib/context';
import Badge from './ui/Badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { mode, addToCart, toggleWishlist, isWishlisted } = useSite();
  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const isWholesale = mode === 'wholesale';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, isWholesale ? product.minOrderQty : 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const displayPrice = isWholesale ? product.wholesalePricePerPiece : product.retailPrice;
  const comparePrice = !isWholesale ? product.compareAtPrice : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className="group product-card bg-surface rounded-xl overflow-hidden"
          style={{ boxShadow: '0 2px 16px rgba(26,26,26,0.06)' }}
          onMouseEnter={() => {
            setIsHovered(true);
            if (product.images[1]) setImgIndex(1);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setImgIndex(0);
          }}
        >
          {/* Image area */}
          <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
            <Image
              src={product.images[imgIndex] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.tags.includes('new') && <Badge type="new" />}
              {product.tags.includes('bestseller') && <Badge type="bestseller" />}
              {product.tags.includes('sale') && <Badge type="sale" />}
              {isWholesale && (
                <Badge type="moq" label={`MOQ ${product.minOrderQty}`} />
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <motion.button
                onClick={handleWishlist}
                className="w-8 h-8 rounded-full bg-surface/90 flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={14}
                  className={`transition-all ${wishlisted ? 'fill-rose text-rose' : 'text-taupe'}`}
                />
              </motion.button>
              <motion.button
                className="w-8 h-8 rounded-full bg-surface/90 flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Quick view"
              >
                <Eye size={14} className="text-taupe" />
              </motion.button>
            </div>

            {/* Add to cart overlay */}
            <motion.div
              className="absolute inset-x-3 bottom-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-ink text-gold text-[11px] font-montserrat tracking-[0.08em] uppercase font-semibold py-2.5 rounded-md hover:bg-ink/90 transition-colors"
              >
                <ShoppingBag size={12} />
                {addedToCart ? '✓ Added!' : isWholesale ? `Add Lot (${product.minOrderQty} pcs)` : 'Add to Cart'}
              </button>
            </motion.div>
          </div>

          {/* Product info */}
          <div className="p-3.5">
            {/* Category */}
            <p className="text-[10px] font-montserrat tracking-[0.15em] uppercase text-taupe mb-1">
              {product.category.replace(/-/g, ' ')}
            </p>

            {/* Name */}
            <h3 className="font-playfair text-[14px] text-ink leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[15px] font-montserrat font-bold"
                style={{ color: isWholesale ? '#1B2A6B' : '#D4AF37' }}
              >
                {formatPrice(displayPrice)}
              </span>
              {comparePrice && (
                <span className="text-[12px] font-montserrat text-taupe line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
              {comparePrice && (
                <span className="text-[10px] font-montserrat text-rose font-semibold">
                  {Math.round((1 - product.retailPrice / comparePrice) * 100)}% off
                </span>
              )}
            </div>

            {/* Wholesale details */}
            {isWholesale && (
              <p className="text-[10px] font-montserrat text-taupe mt-1">
                per piece · min. order {product.minOrderQty} pcs
              </p>
            )}

            {/* Fabric */}
            <p className="text-[10px] font-montserrat text-taupe/80 mt-1 truncate">
              {product.fabric}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
