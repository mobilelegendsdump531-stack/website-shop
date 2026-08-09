'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, addItem, removeItem } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const discount = product.discountPrice
    ? calculateDiscount(product.price, product.discountPrice)
    : 0;

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <Card variant="glass" className="group overflow-hidden hover:shadow-lg hover:shadow-neon-cyan/30 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onLoadingComplete={() => setImageLoading(false)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700" />
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <Badge variant="neon" size="sm" className="absolute top-2 right-2">
            -{discount}%
          </Badge>
        )}

        {/* Featured Badge */}
        {product.isFeatured && (
          <Badge variant="success" size="sm" className="absolute top-2 left-2">
            Featured
          </Badge>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <Heart
            size={20}
            className={inWishlist ? 'fill-neon-magenta text-neon-magenta' : 'text-gray-600 dark:text-gray-400'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase font-semibold">
          {product.category?.name}
        </p>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white hover:text-neon-cyan transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-neon-cyan">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <p className={`text-xs font-semibold mb-4 ${
          product.stock > 0
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          size="md"
          className="w-full flex items-center justify-center gap-2"
          disabled={product.stock <= 0}
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
