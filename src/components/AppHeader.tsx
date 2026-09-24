'use client';

/**
 * AppHeader — the single consolidated application header bar.
 *
 * WHY THIS EXISTS
 * Before consolidation every route hand-rolled its own `<header>`. An audit of
 * all 18 page files found the intent was identical everywhere but every
 * geometric property had drifted:
 *
 *   height    7 distinct  (h-11, h-14, h-16, h-16 md:h-18, py-2.5, py-3.5, none)
 *   z-index   4 distinct  (z-30, z-40, z-50, none)
 *   position  2 distinct  (sticky top-0 vs. bare flex shrink-0)
 *   padding  12 distinct  (px-1..px-6 x md:px-4..md:px-12 x sm: variants)
 *   blur      3 distinct  (backdrop-blur-md, backdrop-blur-xl, none)
 *   shadow    3 distinct  (shadow-md, shadow-xs, none)
 *   max-w     6 distinct  (none, max-w-none, max-w-8xl, 1600px, 1680px, ...)
 *
 * This component fixes the shell chrome (height / z / position / padding /
 * surface / dark-scoping) and exposes only the parts that legitimately differ
 * per route as slots. Pages keep their own distinct controls; they no longer
 * own the geometry.
 *
 * DESIGN LAWS ENFORCED HERE (see AGENTS.md)
 *  - Dark Shell + Light Workspace: the `dark` class is scoped to THIS element.
 *    It must never be lifted onto <html>/<body>, which would activate
 *    `dark:` variants across the light-mode content workspaces below.
 *  - Sticky Full-Width Navbars: the background wrapper bleeds edge-to-edge.
 *  - Zero Surrounding Empty Space: full-bleed by default, no centered gutter.
 */

import React from 'react';
import Link from 'next/link';
import ByokHeaderButton from './ByokHeaderButton';

/** Canonical geometry. Change it here and every route moves together. */
export const APP_HEADER_HEIGHT_PX = 56;

const SHELL =
  'dark sticky top-0 w-full h-14 shrink-0 border-b flex items-center justify-between gap-3 ' +
  'px-4 md:px-8 bg-[#0B111E]/95 backdrop-blur-md border-slate-800 text-white shadow-md ' +
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
 *  from each other but internally consistent. */
const TONES: Record<HeaderTone, { tile: string; badge: string }> = {
  blue: {
    tile: 'bg-blue-600/20 border-blue-500/30 text-blue-400',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  teal: {
    tile: 'bg-teal-500/15 border-teal-500/30 text-teal-400',
    badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  },
  indigo: {
    tile: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  },
  sky: {
    tile: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  },
  emerald: {
    tile: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  },
  violet: {
    tile: 'bg-violet-500/15 border-violet-500/30 text-violet-400',
    badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  },
  amber: {
    tile: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  },
  slate: {
    tile: 'bg-slate-700/40 border-slate-600/50 text-slate-300',
    badge: 'bg-slate-700/50 text-slate-300 border-slate-600/50',
  },
};

/** Shared action-button recipes. The right-hand controls had drifted too
 *  (px-3 py-1.5 text-xs on /gcp vs px-2.5 py-1 text-[11px] on /vision). */
export const headerBtn = {
  base:
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ' +
    'transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  neutral: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700',
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500',
  ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 border-transparent',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
} as const;

/** Compose a header action button className: `btnClass('neutral')`. */
export function btnClass(variant: keyof Omit<typeof headerBtn, 'base'> = 'neutral', extra = '') {
  return `${headerBtn.base} ${headerBtn[variant]} ${extra}`.trim();
}

export interface AppHeaderProps {
  /**
   * Raw content mode. When supplied, `children` are rendered directly inside
   * the canonical shell and the identity/actions scaffold is skipped.
   *
   * This exists because the headers on /studio (385 lines), /workspace (227)
   * and /vision (151) carry multi-cluster layouts — inline tab strips,
   * editable breadcrumbs, version pickers — that do not reduce to
   * "identity on the left, buttons on the right". Forcing them through the
   * slot API would mangle them. They still share this element, so the
   * geometry and dark-scoping stay centralised, which is the whole point.
   */
  children?: React.ReactNode;
  /** lucide icon rendered in the left identity tile */
  icon?: React.ElementType;
  /** accent used by the icon tile and the title badge */
  tone?: HeaderTone;
  /** page title, rendered as the document <h1>. Omit in raw `children` mode. */
  title?: React.ReactNode;
  /** short uppercase pill next to the title */
  badge?: React.ReactNode;
  /** if set, the icon+title identity cluster becomes a link */
  href?: string;
  /** rendered before the identity cluster — sidebar toggles, back buttons */
  leading?: React.ReactNode;
  /** rendered after the badge — status dots, breadcrumbs, tabs */
  meta?: React.ReactNode;
  /** right-hand controls; each page keeps its own */
  actions?: React.ReactNode;
  /** hide from print output (used by /docgen) */
  noPrint?: boolean;
  /** escape hatch for stacking contexts, e.g. the /workspace guided tour
   *  needs to out-rank the spotlight mask. Defaults to `z-40`. */
  zIndexClass?: string;
  /** extra classes appended to the header element */
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
  zIndexClass = 'z-40',
  className = '',
}: AppHeaderProps) {
  const t = TONES[tone] ?? TONES.blue;

  const shell = [SHELL, zIndexClass, noPrint ? 'no-print' : '', className]
    .filter(Boolean)
    .join(' ');

  // Raw mode: the page owns the internal layout, the shell owns the geometry.
  if (children) {
    return (
      <header className={shell}>
        <div className="flex items-center justify-between flex-1 min-w-0 gap-3">
          {children}
        </div>
        <div className="flex items-center shrink-0 pl-2 border-l border-slate-800/80">
          <ByokHeaderButton compact />
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
      <div className="flex items-center gap-2.5 min-w-0">
        <h1 className="text-sm font-black tracking-tight truncate text-white">{title}</h1>
        {badge && (
          <span
            className={`hidden sm:inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border shrink-0 ${t.badge}`}
          >
            {badge}
          </span>
        )}
      </div>
    </>
  );

  return (
    <header className={shell}>
      <div className="flex items-center gap-3 min-w-0">
        {leading}
        {href ? (
          <Link
            href={href}
            className="flex items-center gap-3 min-w-0 hover:opacity-80 transition-opacity"
          >
            {identity}
          </Link>
        ) : (
          identity
        )}
        {meta}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <ByokHeaderButton compact />
        {actions}
      </div>
    </header>
  );
}

export default AppHeader;
