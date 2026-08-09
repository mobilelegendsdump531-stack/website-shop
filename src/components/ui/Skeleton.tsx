'use client';

import React from 'react';
import { cn } from '@/utils/helpers';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700', className)}
      {...props}
    />
  )
);

Skeleton.displayName = 'Skeleton';
export default Skeleton;
