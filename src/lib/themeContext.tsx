'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHydratedState } from '@/lib/hooks/useHydrationSafeState';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  isLight: boolean;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isLight: false,
  isDark: true,
  setTheme: () => {},
  toggleTheme: () => {},
});

function applyThemeToDocument(newTheme: ThemeMode) {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    // The design specification mandates:
    // Only the left menu and topmost header are dark. All pages and tabs are light theme (matching Image 2).
    // We avoid applying global `.dark` to <html> so child content cards retain crisp light styling.
    root.classList.remove('dark');
    root.classList.add('light');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Hydration-safe: 'dark' is rendered on the server and during hydration, then the
  // persisted preference is applied in a pre-paint layout effect.
  const [theme, setThemeState] = useHydratedState<ThemeMode>('dark', () => {
    try {
      const savedTheme = localStorage.getItem('promptcanvas_theme') as ThemeMode;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {}
    return 'dark';
  });

  useEffect(() => {
    applyThemeToDocument(theme);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'promptcanvas_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
        applyThemeToDocument(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyThemeToDocument(newTheme);
    try {
      localStorage.setItem('promptcanvas_theme', newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, isLight: theme === 'light', isDark: theme === 'dark', setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
