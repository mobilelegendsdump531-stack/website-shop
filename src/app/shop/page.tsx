'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import Pagination from '@/components/Pagination';
import { Product, ProductCategory } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const MOCK_CATEGORIES: ProductCategory[] = [
  { id: '1', name: 'Courses', slug: 'courses', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Music', slug: 'music', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Design', slug: 'design', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: '4', name: 'Software', slug: 'software', isActive: true, createdAt: new Date(), updatedAt: new Date() },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Web Development Course',
    slug: 'premium-web-dev-course',
    description: 'Learn modern web development with React, Node.js, and more',
    price: 2999,
    discountPrice: 1999,
    category: MOCK_CATEGORIES[0],
    categoryId: '1',
    status: 'ACTIVE',
    stock: 0,
    isDigital: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 234,
    images: [{ id: '1', productId: '1', url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop', order: 0, createdAt: new Date() }],
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
    description: 'High-quality royalty-free music for creators',
    price: 4999,
    discountPrice: 2999,
    category: MOCK_CATEGORIES[1],
    categoryId: '2',
    status: 'ACTIVE',
    stock: 0,
    isDigital: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 512,
    images: [{ id: '2', productId: '2', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop', order: 0, createdAt: new Date() }],
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
    price: 3499,
    discountPrice: 1999,
    category: MOCK_CATEGORIES[2],
    categoryId: '3',
    status: 'ACTIVE',
    stock: 0,
    isDigital: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 189,
    images: [{ id: '3', productId: '3', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', order: 0, createdAt: new Date() }],
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
    id: '4',
    name: 'Advanced JavaScript Mastery',
    slug: 'advanced-javascript-mastery',
    description: 'Master advanced JavaScript concepts and patterns',
    price: 1999,
    category: MOCK_CATEGORIES[0],
    categoryId: '1',
    status: 'ACTIVE',
    stock: 0,
    isDigital: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 178,
    images: [{ id: '4', productId: '4', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop', order: 0, createdAt: new Date() }],
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
    id: '5',
    name: 'UI/UX Design System',
    slug: 'ui-ux-design-system',
    description: 'Complete design system for modern applications',
    price: 2499,
    discountPrice: 1499,
    category: MOCK_CATEGORIES[2],
    categoryId: '3',
    status: 'ACTIVE',
    stock: 0,
    isDigital: true,
    isFeatured: false,
    rating: 4.9,
    reviewCount: 342,
    images: [{ id: '5', productId: '5', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', order: 0, createdAt: new Date() }],
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
    id: '6',
    name: 'Productivity Software Suite',
    slug: 'productivity-software-suite',
    description: 'Complete suite of productivity tools',
    price: 5999,
    category: MOCK_CATEGORIES[3],
    categoryId: '4',
    status: 'ACTIVE',
    stock: 0,
    isDigital: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 95,
    images: [{ id: '6', productId: '6', url: 'https://images.unsplash.com/photo-1516321318423-f06f70674e90?w=400&h=300&fit=crop', order: 0, createdAt: new Date() }],
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

interface FilterState {
  search: string;
  category: string | null;
  priceMin: number;
  priceMax: number;
  inStock: boolean;
  rating: number;
}

const ITEMS_PER_PAGE = 12;

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || null,
    priceMin: 0,
    priceMax: 10000,
    inStock: false,
    rating: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = MOCK_PRODUCTS;

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
      }

      // Category filter
      if (filters.category) {
        result = result.filter((p) => p.categoryId === filters.category);
      }

      // Price filter
      result = result.filter(
        (p) =>
          (p.discountPrice || p.price) >= filters.priceMin &&
          (p.discountPrice || p.price) <= filters.priceMax
      );

      // Rating filter
      if (filters.rating > 0) {
        result = result.filter((p) => p.rating >= filters.rating);
      }

      setFilteredProducts(result);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
            Shop Our Collection
          </h1>
          <p className="text-gray-300 text-lg">
            Browse our premium selection of digital products and resources
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              categories={MOCK_CATEGORIES}
              onFilterChange={setFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {paginatedProducts.length > 0 ? startIndex + 1 : 0} to{' '}
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of{' '}
                {filteredProducts.length} products
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} variant="glass" className="h-80 animate-pulse" />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Card variant="glass" className="p-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    No products found matching your filters.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() =>
                      setFilters({
                        search: '',
                        category: null,
                        priceMin: 0,
                        priceMax: 10000,
                        inStock: false,
                        rating: 0,
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
