'use client';

import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { cn } from '@/utils/helpers';

interface ProductFiltersProps {
  categories: Array<{ id: string; name: string }>;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  category: string | null;
  priceMin: number;
  priceMax: number;
  inStock: boolean;
  rating: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ categories, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: null,
    priceMin: 0,
    priceMax: 10000,
    inStock: false,
    rating: 0,
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      search: '',
      category: null,
      priceMin: 0,
      priceMax: 10000,
      inStock: false,
      rating: 0,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden flex gap-2 mb-4">
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="flex-1"
        />
        <Button
          variant="ghost"
          size="md"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter size={20} />
        </Button>
      </div>

      {/* Filter Panel */}
      <Card
        variant="glass"
        className={cn(
          'p-6 space-y-6 transition-all duration-300',
          isOpen ? 'block' : 'hidden md:block'
        )}
      >
        {/* Search */}
        <div className="hidden md:block">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Search
          </label>
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            icon={<Search size={16} />}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Category
          </label>
          <div className="space-y-2">
            <button
              onClick={() => handleFilterChange({ category: null })}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg transition-colors',
                filters.category === null
                  ? 'bg-neon-cyan/20 text-neon-cyan'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange({ category: category.id })}
                className={cn(
                  'block w-full text-left px-3 py-2 rounded-lg transition-colors',
                  filters.category === category.id
                    ? 'bg-neon-cyan/20 text-neon-cyan'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Price Range
          </label>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Min: ₱{filters.priceMin}</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange({ priceMin: Number(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Max: ₱{filters.priceMax}</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange({ priceMax: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* In Stock */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange({ inStock: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">In Stock Only</span>
          </label>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange({ rating: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="0">All Ratings</option>
            <option value="4">4★ & up</option>
            <option value="3">3★ & up</option>
            <option value="2">2★ & up</option>
            <option value="1">1★ & up</option>
          </select>
        </div>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="md"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleReset}
        >
          <X size={16} />
          Reset Filters
        </Button>
      </Card>
    </>
  );
};

export default ProductFilters;
