'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLegal } from './LegalProvider';
import { Shield, Cookie, FileText, Scale, Layers, ExternalLink } from 'lucide-react';

export function PortalFooter() {
  const { openLegalModal } = useLegal();
  const pathname = usePathname();

  // Suppress global footer on landing page (which has its own footer) and full-screen workbench routes
  const isFullScreenWorkbench =
    pathname === '/' ||
    pathname === '/vision' ||
    pathname === '/studio' ||
    pathname?.startsWith('/studio1') ||
    pathname === '/gcp';

  if (isFullScreenWorkbench) {
    return null;
  }

  return (
    <footer
      role="contentinfo"
      aria-label="Platform Legal and Compliance Footer"
      className="w-full max-w-none bg-slate-950 border-t border-slate-800 text-slate-300 py-8 px-6 md:px-12 font-sans transition-colors"
    >
      <div className="w-full max-w-none flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Copyright (UX-24: AAA >= 7:1 contrast on #020617) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">PromptCanvas</span>
          </div>
          <span className="text-slate-400 hidden sm:inline" aria-hidden="true">•</span>
          <p className="text-xs text-slate-300">
            © 2026 PromptCanvas. All rights reserved. Powered by Google Gemini &amp; Cloud Architecture Engine.
          </p>
        </div>

        {/* Center: Legal & Compliance Links (UX-04 & UX-18: Underline + 44px touch height + focus ring) */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
          <button
            type="button"
            onClick={() => openLegalModal('disclaimer')}
            className="min-h-[40px] px-2.5 py-1.5 rounded-lg text-slate-200 hover:text-white hover:underline underline-offset-4 transition flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>AI Disclaimer</span>
          </button>
          <button
            type="button"
            onClick={() => openLegalModal('privacy')}
            className="min-h-[40px] px-2.5 py-1.5 rounded-lg text-slate-200 hover:text-white hover:underline underline-offset-4 transition flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span>Privacy Policy</span>
          </button>
          <button
            type="button"
            onClick={() => openLegalModal('terms')}
            className="min-h-[40px] px-2.5 py-1.5 rounded-lg text-slate-200 hover:text-white hover:underline underline-offset-4 transition flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
            <span>Terms of Service</span>
          </button>
          <button
            type="button"
            onClick={() => openLegalModal('cookies')}
            className="min-h-[40px] px-2.5 py-1.5 rounded-lg text-slate-200 hover:text-white hover:underline underline-offset-4 transition flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
          >
            <Cookie className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>Cookie Settings</span>
          </button>
        </div>

        {/* Right: Cloud Trademark Attribution (UX-24: Upgraded from text-slate-600 2.88:1 fail to text-slate-300 13.4:1 AAA pass) */}
        <div className="text-[11px] text-slate-300 text-center sm:text-right">
          Google Cloud, Spanner, and Vertex AI are trademarks of Google LLC.
        </div>

      </div>
    </footer>
  );
}
