'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  isLight: boolean;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isLight: true,
  isDark: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

function applyThemeToDocument(newTheme: ThemeMode) {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('promptcanvas_theme') as ThemeMode;
        if (savedTheme === 'light' || savedTheme === 'dark') {
          return savedTheme;
        }
      } catch {}
    }
    return 'light';
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
