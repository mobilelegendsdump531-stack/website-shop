'use client';

import React from 'react';
import { cn } from '@/utils/helpers';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'neon';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      success: 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200',
      warning: 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      error: 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200',
      neon: 'bg-gradient-to-r from-neon-cyan/30 to-neon-magenta/30 text-neon-cyan border border-neon-cyan/50',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;
