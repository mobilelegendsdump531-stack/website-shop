'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseClickOutsideOptions {
  onClickOutside: () => void;
  enabled?: boolean;
}

export function useClickOutside(
  { onClickOutside, enabled = true }: UseClickOutsideOptions
) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    },
    [onClickOutside]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside, enabled]);

  return ref;
}
