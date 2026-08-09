'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, Bell, Menu, X, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/helpers';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
            Shop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
              Contact
            </Link>
          </div>

          {/* Icons & Auth */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Link href="/notifications" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
              <Bell size={20} />
              {/* Badge would go here */}
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
              <Heart size={20} />
              {wishlistItems > 0 && (
                <span className="absolute top-0 right-0 bg-neon-magenta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
              <ShoppingCart size={20} />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 bg-neon-cyan text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {session ? (
              <div className="flex items-center gap-2">
                <Link href="/account" className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
                  Account
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => signOut()}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm" variant="ghost">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" variant="primary">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-4">
              <Link href="/shop" className="text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
