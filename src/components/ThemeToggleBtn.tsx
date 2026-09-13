'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

interface ThemeToggleBtnProps {
  id?: string;
  className?: string;
  /**
   * Drop the "Light"/"Dark" text label and render a square icon-only button.
   * Used by the collapsed 64px sidebar rail, where the labelled button is 71px
   * wide and paints over page content. Default stays labelled for headers.
   */
  iconOnly?: boolean;
}

export function ThemeToggleBtn({ id = "global-theme-toggle-btn", className = "", iconOnly = false }: ThemeToggleBtnProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      id={id}
      onClick={toggleTheme}
      className={`flex items-center justify-center rounded-lg border font-extrabold text-xs transition-all shadow-sm cursor-pointer shrink-0 ${
        iconOnly ? 'p-1.5' : 'gap-1.5 px-2.5 py-1.5'
      } ${
        isLight
          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
          : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-amber-300'
      } ${className}`}
      title={isLight ? "Switch to Dark Theme" : "Switch to Light Theme"}
    >
      {isLight ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          {!iconOnly && <span>Light</span>}
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          {!iconOnly && <span>Dark</span>}
        </>
      )}
    </button>
  );
}
