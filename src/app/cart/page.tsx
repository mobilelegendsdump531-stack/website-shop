'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatPrice } from '@/utils/helpers';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
            Shopping Cart
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <Card variant="glass" className="p-12 text-center">
                <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400 mb-6">Your cart is empty</p>
                <Link href="/shop">
                  <Button variant="primary">Continue Shopping</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} variant="glass" className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      {item.product?.images && item.product.images.length > 0 && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product?.slug}`}>
                          <h3 className="font-semibold text-gray-900 dark:text-white hover:text-neon-cyan transition-colors truncate">
                            {item.product?.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                            className="w-12 text-center px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                          />
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <p className="font-bold text-gray-900 dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card variant="neon" className="p-6 space-y-4 sticky top-20">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>

                <div className="space-y-2 border-t border-neon-cyan/20 pt-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (0%):</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="border-t border-neon-cyan/20 pt-4">
                  <div className="flex justify-between text-lg font-bold text-neon-cyan">
                    <span>Total:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/shop" className="block">
                  <Button variant="ghost" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
