'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  CANONICAL_TEMPLATES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
} from '@/lib/canonical/canonicalTemplates';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Download,
  RefreshCw,
  Sliders,
  Sun,
  Moon,
  Sparkles,
  ArrowLeft,
  Maximize2,
  Minimize2,
  Share2
} from 'lucide-react';

export default function CanonicalTemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const templateId = String(rawId || '01').padStart(2, '0');

  const [selectedDomain, setSelectedDomain] = useState<string>('biopharma');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Find template by ID
  const activeTemplate = useMemo(() => {
    return CANONICAL_TEMPLATES.find((t) => t.id === templateId) || CANONICAL_TEMPLATES[0];
  }, [templateId]);

  // Find currentIndex, prev and next templates
  const currentIndex = useMemo(() => {
    return CANONICAL_TEMPLATES.findIndex((t) => t.id === activeTemplate.id);
  }, [activeTemplate]);

  const prevTemplate = useMemo(() => {
    if (currentIndex <= 0) return null;
    return CANONICAL_TEMPLATES[currentIndex - 1];
  }, [currentIndex]);

  const nextTemplate = useMemo(() => {
    if (currentIndex < 0 || currentIndex >= CANONICAL_TEMPLATES.length - 1) return null;
    return CANONICAL_TEMPLATES[currentIndex + 1];
  }, [currentIndex]);

  // Generate XML
  const currentXml = useMemo(() => {
    if (!activeTemplate) return '';
    return activeTemplate.generateXml(selectedDomain, themeMode);
  }, [activeTemplate, selectedDomain, themeMode]);

  // Keyboard navigation for Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.key === 'ArrowLeft' && prevTemplate) {
        router.push(`/canonical/${prevTemplate.id}`);
      } else if (e.key === 'ArrowRight' && nextTemplate) {
        router.push(`/canonical/${nextTemplate.id}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevTemplate, nextTemplate, router]);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(currentXml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleCopyShareUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleDownloadXml = () => {
    const blob = new Blob([currentXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canonical_template_${activeTemplate.id}_${selectedDomain}.drawio.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isDark = themeMode === 'dark';
  const bgClass = isDark ? 'bg-[#0B111E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${bgClass} font-sans`}>
      {/* TOP NAVIGATION BAR */}
      {!isFullScreen && (
        <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors ${
          isDark ? 'bg-[#0B111E]/95 border-slate-800/80' : 'bg-white/95 border-slate-200/80'
        }`}>
          <div className="max-w-[1680px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            {/* Left: Back to Catalog & Template Title */}
            <div className="flex items-center gap-3">
              <Link
                href="/canonical"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4 text-sky-500" />
                <span className="hidden sm:inline">All Templates</span>
              </Link>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-sky-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  {activeTemplate.id}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm md:text-base font-extrabold tracking-tight">
                      {activeTemplate.name}
                    </h1>
                    <span className="hidden md:inline-flex text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      1:1 Ground-Truth Master
                    </span>
                  </div>
                  <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                    {activeTemplate.primaryPurpose}
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Prev / Next Navigation Arrows */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                disabled={!prevTemplate}
                onClick={() => prevTemplate && router.push(`/canonical/${prevTemplate.id}`)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  prevTemplate
                    ? 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm'
                    : 'opacity-30 cursor-not-allowed text-slate-400'
                }`}
                title={prevTemplate ? `Previous: ${prevTemplate.id} - ${prevTemplate.name}` : 'No previous template'}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev {prevTemplate ? `(${prevTemplate.id})` : ''}</span>
              </button>

              <span className="text-[11px] font-mono font-bold px-2 text-slate-500">
                {currentIndex + 1} / {CANONICAL_TEMPLATES.length}
              </span>

              <button
                disabled={!nextTemplate}
                onClick={() => nextTemplate && router.push(`/canonical/${nextTemplate.id}`)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  nextTemplate
                    ? 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm'
                    : 'opacity-30 cursor-not-allowed text-slate-400'
                }`}
                title={nextTemplate ? `Next: ${nextTemplate.id} - ${nextTemplate.name}` : 'No next template'}
              >
                <span className="hidden sm:inline">Next {nextTemplate ? `(${nextTemplate.id})` : ''}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Actions, Domain Selector & Theme */}
            <div className="flex items-center gap-2">
              {/* Domain Preset Selector */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <Sliders className="w-3.5 h-3.5 text-sky-500" />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-transparent font-semibold text-sky-600 dark:text-sky-400 outline-none cursor-pointer text-xs"
                >
                  {DOMAIN_PRESETS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Share URL */}
              <button
                onClick={handleCopyShareUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Copy Direct Shareable Link"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-sky-500" />}
                <span className="hidden md:inline">{copiedUrl ? 'Copied Link!' : 'Share'}</span>
              </button>

              {/* Copy XML */}
              <button
                onClick={handleCopyXml}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{copiedXml ? 'Copied XML!' : 'Copy XML'}</span>
              </button>

              {/* Download */}
              <button
                onClick={handleDownloadXml}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Download .drawio</span>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                title="Toggle Executive Light / Deep Slate Midnight"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* FULL PAGE DIAGRAM VIEWPORT */}
      <main className="flex-1 w-full relative flex flex-col p-2 md:p-6">
        {/* Floating Quick Prev / Next Arrows for Immersive Browsing */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
          <button
            disabled={!prevTemplate}
            onClick={() => prevTemplate && router.push(`/canonical/${prevTemplate.id}`)}
            className={`w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center transition-all ${
              prevTemplate
                ? 'hover:scale-110 hover:bg-sky-500 hover:text-white text-slate-700 dark:text-slate-200 cursor-pointer'
                : 'opacity-20 cursor-not-allowed text-slate-400'
            }`}
            title={prevTemplate ? `Previous (Left Arrow): ${prevTemplate.id} - ${prevTemplate.name}` : 'No previous template'}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
          <button
            disabled={!nextTemplate}
            onClick={() => nextTemplate && router.push(`/canonical/${nextTemplate.id}`)}
            className={`w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center transition-all ${
              nextTemplate
                ? 'hover:scale-110 hover:bg-sky-500 hover:text-white text-slate-700 dark:text-slate-200 cursor-pointer'
                : 'opacity-20 cursor-not-allowed text-slate-400'
            }`}
            title={nextTemplate ? `Next (Right Arrow): ${nextTemplate.id} - ${nextTemplate.name}` : 'No next template'}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Viewport Frame */}
        <div className="flex-1 w-full h-[calc(100vh-90px)] rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden flex items-center justify-center p-2 md:p-6">
          <DiagramViewerRenderSafe
            xml={currentXml}
            bgTheme={themeMode}
            diagramId={`canonical_${activeTemplate.id}`}
            diagramType={`canonical_${activeTemplate.id}`}
            aspectRatioId="16:9"
          />
        </div>
      </main>
    </div>
  );
}
