'use client';

import React from 'react';
import Link from 'next/link';
import { useLegal } from './LegalProvider';
import { Shield, Cookie, FileText, Scale, Layers, ExternalLink } from 'lucide-react';

export function PortalFooter() {
  const { openLegalModal } = useLegal();

  return (
    <footer className="w-full max-w-none bg-slate-950 border-t border-slate-800 text-slate-400 py-8 px-6 md:px-12 font-sans transition-colors">
      <div className="w-full max-w-none flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">PromptCanvas</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <p className="text-xs text-slate-500">
            © 2026 PromptCanvas. All rights reserved. Powered by Google Cloud & Vertex AI.
          </p>
        </div>

        {/* Center: Legal & Compliance Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
          <button
            onClick={() => openLegalModal('disclaimer')}
            className="hover:text-slate-200 transition flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            AI Disclaimer
          </button>
          <button
            onClick={() => openLegalModal('privacy')}
            className="hover:text-slate-200 transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            Privacy Policy
          </button>
          <button
            onClick={() => openLegalModal('terms')}
            className="hover:text-slate-200 transition flex items-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            Terms of Service
          </button>
          <button
            onClick={() => openLegalModal('cookies')}
            className="hover:text-slate-200 transition flex items-center gap-1.5"
          >
            <Cookie className="w-3.5 h-3.5 text-emerald-400" />
            Cookie Settings
          </button>
        </div>

        {/* Right: Cloud Trademark Attribution */}
        <div className="text-[11px] text-slate-600 text-center sm:text-right">
          Google Cloud, Spanner, and Vertex AI are trademarks of Google LLC.
        </div>

      </div>
    </footer>
  );
}
