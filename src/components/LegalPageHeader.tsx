'use client';

/**
 * LegalPageHeader — shared header for the public legal pages.
 *
 * /privacy and /terms carried a byte-identical 19-line header block. They are
 * deliberately NOT on `AppHeader`: that component is the dark application
 * shell chrome, whereas these are public pages with no sidebar, a constrained
 * `max-w-7xl` reading column, and a light/dark surface driven by the user's
 * theme preference. Consolidating them into the app shell would have been the
 * wrong kind of uniformity, so they get their own single source of truth.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Network } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

export function LegalPageHeader() {
  const { isLight } = useTheme();

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md ${
        isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-900/80 border-slate-800'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-wider text-sm hover:opacity-80 transition-opacity"
        >
          <Network className="w-5 h-5 text-teal-500" />
          <span className={isLight ? 'text-slate-900' : 'text-white'}>PROMPT CANVAS</span>
        </Link>
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Canvas
        </Link>
      </div>
    </header>
  );
}

export default LegalPageHeader;
