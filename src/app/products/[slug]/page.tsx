'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Share2, ShoppingCart } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatPrice, calculateDiscount } from '@/utils/helpers';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Product } from '@/types';
import { useState } from 'react';

// Mock product - would be fetched from API
const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'Premium Web Development Course',
  slug: 'premium-web-dev-course',
  description: 'Comprehensive course covering modern web development with React, Node.js, TypeScript, and more. Perfect for beginners and intermediate developers looking to master full-stack development.',
  shortDescription: 'Learn modern web development with React and Node.js',
  price: 2999,
  discountPrice: 1999,
  category: { id: '1', name: 'Courses', slug: 'courses', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  categoryId: '1',
  status: 'ACTIVE',
  stock: 0,
  sku: 'COURSE-001',
  isDigital: true,
  isFeatured: true,
  rating: 4.8,
  reviewCount: 234,
  images: [
    {
      id: '1',
      productId: '1',
      url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop',
      order: 0,
      createdAt: new Date(),
    },
    {
      id: '2',
      productId: '1',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      order: 1,
      createdAt: new Date(),
    },
  ],
  variants: [],
  orders: [],
  wishlists: [],
  reviews: [],
  cartItems: [],
  digitalFiles: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const product = MOCK_PRODUCT;
  const addToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const discount = product.discountPrice ? calculateDiscount(product.price, product.discountPrice) : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/shop" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan">
            Shop
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-medium">{product.category?.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <Card variant="glass" className="overflow-hidden">
              <div className="relative h-96 w-full bg-gray-200 dark:bg-gray-700">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[selectedImage].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                )}
                {discount > 0 && (
                  <Badge variant="neon" size="lg" className="absolute top-4 right-4">
                    Save {discount}%
                  </Badge>
                )}
              </div>
            </Card>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-neon-cyan'
                        : 'border-gray-300 dark:border-gray-600 hover:border-neon-cyan/50'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">
                {product.category?.name}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {product.discountPrice ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-neon-cyan">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
              )}
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                Digital product - Instant delivery after purchase
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <Card variant="glass" className="p-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-16 text-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  +
                </button>
              </div>
            </Card>

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={handleWishlistToggle}
                className={inWishlist ? 'text-neon-magenta' : ''}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </Button>
            </div>

            {/* Share */}
            <Button
              variant="ghost"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <Share2 size={20} />
              Share Product
            </Button>

            {/* Additional Info */}
            <Card variant="glass" className="p-4 space-y-3">
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Product Type</p>
                <p className="text-gray-600 dark:text-gray-400">Digital Product</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Delivery</p>
                <p className="text-gray-600 dark:text-gray-400">Instant access to download links</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Support</p>
                <p className="text-gray-600 dark:text-gray-400">30-day money-back guarantee</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
