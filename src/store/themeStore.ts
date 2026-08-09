import { create } from 'zustand';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
  const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  const initialDark = savedTheme ? savedTheme === 'dark' : true; // Default to dark

  return {
    isDark: initialDark,
    toggleTheme: () => {
      set((state) => {
        const newIsDark = !state.isDark;
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
          document.documentElement.classList.toggle('dark', newIsDark);
        }
        return { isDark: newIsDark };
      });
    },
    setTheme: (isDark: boolean) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDark);
      }
      set({ isDark });
    },
  };
});
