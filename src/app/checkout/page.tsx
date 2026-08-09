'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatPrice } from '@/utils/helpers';
import { CreditCard, MapPin, AlertCircle } from 'lucide-react';

interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'GCASH' | 'MAYA' | 'BANK_TRANSFER' | '';
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: session?.user?.name || '',
    email: session?.user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <Card variant="glass" className="p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
          <Link href="/shop">
            <Button variant="primary">Back to Shop</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.paymentMethod) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: `${formData.address}, ${formData.city} ${formData.postalCode}`,
          paymentMethod: formData.paymentMethod,
          subtotal: getTotalPrice(),
          tax: 0,
          total: getTotalPrice(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
            Checkout
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 flex gap-2">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {/* Shipping Address */}
              <Card variant="glass" className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={20} className="text-neon-cyan" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Address</h2>
                </div>

                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={isLoading}
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />

                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  disabled={isLoading}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Manila"
                    disabled={isLoading}
                  />
                  <Input
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="1000"
                    disabled={isLoading}
                  />
                </div>
              </Card>

              {/* Payment Method */}
              <Card variant="glass" className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={20} className="text-neon-cyan" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'GCASH', label: 'GCash' },
                    { value: 'MAYA', label: 'Maya' },
                    { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
                  ].map((method) => (
                    <label key={method.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleChange}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      <div
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          formData.paymentMethod === method.value
                            ? 'border-neon-cyan bg-neon-cyan/10'
                            : 'border-gray-300 dark:border-gray-600 hover:border-neon-cyan/50'
                        }`}
                      >
                        <p className="font-semibold text-gray-900 dark:text-white">{method.label}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Complete Order
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card variant="neon" className="p-6 space-y-4 sticky top-20">
              <h2 className="text-xl font-bold text-white">Order Summary</h2>

              <div className="space-y-3 border-t border-neon-cyan/20 pt-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-300">
                    <span>{item.product?.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neon-cyan/20 pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax:</span>
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
