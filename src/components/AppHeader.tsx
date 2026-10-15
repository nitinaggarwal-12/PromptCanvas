'use client';

/**
 * AppHeader — the single consolidated application header bar.
 * Adapts to active Light and Dark themes via useTheme().
 */

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import ByokHeaderButton from './ByokHeaderButton';

/** Canonical geometry. Change it here and every route moves together. */
export const APP_HEADER_HEIGHT_PX = 56;

const SHELL_DARK =
  'dark sticky top-0 w-full min-h-14 py-1.5 shrink-0 border-b flex items-center justify-between gap-3 flex-wrap ' +
  'px-4 md:px-6 bg-[#0B111E]/95 backdrop-blur-md border-slate-800 text-white shadow-md ' +
  'transition-colors';

const SHELL_LIGHT =
  'sticky top-0 w-full min-h-14 py-1.5 shrink-0 border-b flex items-center justify-between gap-3 flex-wrap ' +
  'px-4 md:px-6 bg-white/95 backdrop-blur-md border-slate-200 text-slate-900 shadow-xs ' +
  'transition-colors';

export type HeaderTone =
  | 'blue'
  | 'teal'
  | 'indigo'
  | 'sky'
  | 'emerald'
  | 'violet'
  | 'amber'
  | 'slate';

/** Icon-tile + badge tints, kept in one place so routes stay visually distinct
 *  from each other but internally consistent across Light and Dark themes. */
const TONES: Record<HeaderTone, { tile: string; badge: string }> = {
  blue: {
    tile: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-600/20 dark:border-blue-500/30 dark:text-blue-400',
    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/30',
  },
  teal: {
    tile: 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-500/15 dark:border-teal-500/30 dark:text-teal-400',
    badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30',
  },
  indigo: {
    tile: 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/15 dark:border-indigo-500/30 dark:text-indigo-400',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30',
  },
  sky: {
    tile: 'bg-sky-50 border-sky-200 text-sky-600 dark:bg-sky-500/15 dark:border-sky-500/30 dark:text-sky-400',
    badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30',
  },
  emerald: {
    tile: 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
  },
  violet: {
    tile: 'bg-violet-50 border-violet-200 text-violet-600 dark:bg-violet-500/15 dark:border-violet-500/30 dark:text-violet-400',
    badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30',
  },
  amber: {
    tile: 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-400',
    badge: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
  },
  slate: {
    tile: 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-700/40 dark:border-slate-600/50 dark:text-slate-300',
    badge: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600/50',
  },
};

/** Shared action-button recipes with Light & Dark support. */
export const headerBtn = {
  base:
    'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border ' +
    'transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95',
  neutral:
    'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 ' +
    'dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700',
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-600 border-transparent ' +
    'dark:hover:bg-slate-800 dark:text-slate-300',
  success:
    'bg-emerald-50 text-emerald-700 border-emerald-200 ' +
    'dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30',
} as const;

/** Compose a header action button className: `btnClass('neutral')`. */
export function btnClass(variant: keyof Omit<typeof headerBtn, 'base'> = 'neutral', extra = '') {
  return `${headerBtn.base} ${headerBtn[variant]} ${extra}`.trim();
}

export interface AppHeaderProps {
  children?: React.ReactNode;
  icon?: React.ElementType;
  tone?: HeaderTone;
  title?: React.ReactNode;
  badge?: React.ReactNode;
  href?: string;
  leading?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  noPrint?: boolean;
  zIndexClass?: string;
  className?: string;
}

export function AppHeader({
  icon: Icon,
  tone = 'blue',
  title,
  badge,
  href,
  leading,
  meta,
  actions,
  children,
  noPrint = false,
  zIndexClass = 'z-[120]',
  className = '',
}: AppHeaderProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const t = TONES[tone] ?? TONES.blue;

  const shell = [isLight ? SHELL_LIGHT : SHELL_DARK, zIndexClass, noPrint ? 'no-print' : '', className]
    .filter(Boolean)
    .join(' ');

  const defaultMobileToggle = (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('promptcanvas_toggle_sidebar'))}
      aria-label="Open navigation menu"
      title="Open navigation menu"
      className={`lg:hidden min-w-[38px] min-h-[38px] p-2 rounded-lg border transition cursor-pointer shrink-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95 ${
        isLight
          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
          : 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/80'
      }`}
    >
      <Menu className="w-4 h-4" />
    </button>
  );

  // Raw mode: the page owns the internal layout, the shell owns the geometry.
  if (children) {
    return (
      <header className={shell}>
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {leading ?? defaultMobileToggle}
          <div className="flex items-center justify-between flex-1 min-w-0 gap-3">
            {children}
          </div>
        </div>
      </header>
    );
  }

  const identity = (
    <>
      {Icon && (
        <div
          className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${t.tile}`}
        >
          <Icon className="w-4 h-4" />
        </div>
      )}
      <div className="flex items-center gap-2 min-w-0 overflow-hidden">
        <h1 className={`text-sm font-black tracking-tight block truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {title}
        </h1>
        {badge && (
          <span
            className={`hidden 2xl:inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border shrink-0 ${t.badge}`}
          >
            {badge}
          </span>
        )}
      </div>
    </>
  );

  return (
    <header className={shell}>
      <div className="flex items-center gap-2.5 min-w-0 overflow-hidden shrink-0">
        {leading ?? defaultMobileToggle}
        {href ? (
          <Link
            href={href}
            className="flex items-center gap-2.5 min-w-0 overflow-hidden hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
          >
            {identity}
          </Link>
        ) : (
          identity
        )}
        {meta}
      </div>

      <div className="flex items-center justify-end gap-1.5 flex-wrap min-w-0">
        {actions}
      </div>
    </header>
  );
}

export default AppHeader;
