'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Music, Zap, Lock, Gift } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProductCard from '@/components/ProductCard';
import MusicPlayer from '@/components/MusicPlayer';
import { Product } from '@/types';

// Mock data - will be replaced with actual API calls
const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Digital Course',
    slug: 'premium-digital-course',
    description: 'Comprehensive course on web development',
    shortDescription: 'Learn web dev from scratch',
    price: 2999,
    discountPrice: 1999,
    category: { id: '1', name: 'Courses', slug: 'courses', isActive: true, createdAt: new Date(), updatedAt: new Date() },
    categoryId: '1',
    status: 'ACTIVE',
    stock: 0, // Digital product
    sku: 'COURSE-001',
    isDigital: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 234,
    images: [
      {
        id: '1',
        productId: '1',
        url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
        altText: 'Premium Course',
        order: 0,
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
  },
  {
    id: '2',
    name: 'Professional Music Pack',
    slug: 'professional-music-pack',
    description: 'High-quality royalty-free music collection',
    shortDescription: 'Premium music for creators',
    price: 4999,
    discountPrice: 2999,
    category: { id: '2', name: 'Music', slug: 'music', isActive: true, createdAt: new Date(), updatedAt: new Date() },
    categoryId: '2',
    status: 'ACTIVE',
    stock: 0,
    sku: 'MUSIC-001',
    isDigital: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 512,
    images: [
      {
        id: '2',
        productId: '2',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
        altText: 'Music Pack',
        order: 0,
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
  },
  {
    id: '3',
    name: 'Design Template Bundle',
    slug: 'design-template-bundle',
    description: 'Collection of modern design templates',
    shortDescription: 'Professional design resources',
    price: 3499,
    discountPrice: 1999,
    category: { id: '3', name: 'Design', slug: 'design', isActive: true, createdAt: new Date(), updatedAt: new Date() },
    categoryId: '3',
    status: 'ACTIVE',
    stock: 0,
    sku: 'DESIGN-001',
    isDigital: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 189,
    images: [
      {
        id: '3',
        productId: '3',
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        altText: 'Design Templates',
        order: 0,
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
  },
];

const HOME_ANNOUNCEMENTS = [
  {
    id: '1',
    title: '🎉 Summer Sale',
    message: 'Get up to 50% off on all digital products',
    type: 'PROMOTION' as const,
    isActive: true,
    priority: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: '⚡ Flash Deal',
    message: 'Limited time offers ending soon!',
    type: 'PROMOTION' as const,
    isActive: true,
    priority: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate data fetching
    setIsLoading(true);
    const timer = setTimeout(() => {
      setFeaturedProducts(FEATURED_PRODUCTS);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-magenta/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-purple bg-clip-text text-transparent animate-glow">
            Welcome to Shop
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your premium destination for digital products, music, courses, and more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button variant="primary" size="lg" className="flex items-center gap-2">
                Start Shopping
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="#featured">
              <Button variant="ghost" size="lg">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements */}
      {HOME_ANNOUNCEMENTS.length > 0 && (
        <section className="bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 border-y border-neon-cyan/20 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {HOME_ANNOUNCEMENTS.map((announcement) => (
                <div key={announcement.id} className="text-center">
                  <p className="text-neon-cyan font-semibold">
                    {announcement.title} - {announcement.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Delivery',
                description: 'Get digital products instantly after purchase',
              },
              {
                icon: Lock,
                title: 'Secure Payments',
                description: 'Multiple payment methods and secure checkout',
              },
              {
                icon: Gift,
                title: 'Special Offers',
                description: 'Regular promotions and discount codes',
              },
              {
                icon: Music,
                title: 'Music Player',
                description: 'Built-in music player for audio content',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} variant="glass" className="p-6 text-center hover:shadow-lg hover:shadow-neon-cyan/20 transition-all">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-neon-cyan" />
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <Link href="/shop">
              <Button variant="neon" className="flex items-center gap-2">
                View All
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} variant="glass" className="h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Music Player Showcase */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Enjoy Built-in Music Player
          </h2>
          <div className="max-w-md mx-auto">
            <MusicPlayer
              songs={[
                {
                  id: '1',
                  title: 'Electronic Dreams',
                  artist: 'Neon Lights',
                  album: 'Synthwave Collection',
                  duration: 245,
                  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                  createdAt: new Date(),
                },
                {
                  id: '2',
                  title: 'Digital Horizon',
                  artist: 'Cyber Wave',
                  album: 'Future Sounds',
                  duration: 198,
                  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                  createdAt: new Date(),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Browse our collection of premium digital products and start enjoying instant downloads today.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
              Browse Shop
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
