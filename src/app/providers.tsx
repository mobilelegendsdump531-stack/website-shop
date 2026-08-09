'use client';

import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { isDark, setTheme } = useThemeStore.getState();
    // Apply theme on mount
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
