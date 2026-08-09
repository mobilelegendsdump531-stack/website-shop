'use client';

import React from 'react';
import { cn } from '@/utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'neon';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
      glass: 'bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-white/20 dark:border-gray-700/20',
      neon: 'bg-gradient-to-br from-gray-900 to-black border-2 border-neon-cyan/30 shadow-lg shadow-neon-cyan/20',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl overflow-hidden transition-all duration-300',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
export default Card;
