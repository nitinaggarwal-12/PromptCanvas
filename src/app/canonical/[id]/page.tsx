'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  CANONICAL_TEMPLATES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
  injectDomainFlavorXml,
} from '@/lib/canonical/canonicalTemplates';
import { injectUseCaseFlavor } from '@/lib/diagramCleaner';
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
  Share2,
  FileText,
  Boxes,
  Edit3,
} from 'lucide-react';
import { ComposeModal } from '@/components/workspace/ComposeModal';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';

export default function CanonicalTemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainParam = searchParams.get('domain');
  const titleParam = searchParams.get('title');
  const promptParam = searchParams.get('prompt');

  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const templateId = String(rawId || '01').padStart(2, '0');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeMode: 'light' | 'dark' = isDark ? 'dark' : 'light';

  const [selectedDomain, setSelectedDomain] = useState<string>(domainParam || 'biopharma');
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);

  useEffect(() => {
    if (domainParam) {
      setSelectedDomain(domainParam);
    }
  }, [domainParam]);

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
    const rawXml = activeTemplate.generateXml(selectedDomain, themeMode);
    const domainCleaned = injectDomainFlavorXml(rawXml, selectedDomain);
    if (titleParam || promptParam) {
      return injectUseCaseFlavor(domainCleaned, titleParam || activeTemplate.name, promptParam);
    }
    return domainCleaned;
  }, [activeTemplate, selectedDomain, themeMode, titleParam, promptParam]);

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

  const bgClass = isDark ? 'bg-[#0B111E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900';

  return (
    <div className={`flex min-h-screen transition-colors duration-200 ${bgClass} font-sans`}>
      {/* Collapsible Left Navigation Menu */}
      <UnifiedAppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* TOP NAVIGATION BAR */}
        {!isFullScreen && (
          <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors ${
            isDark ? 'bg-[#0B111E]/95 border-slate-800/80' : 'bg-white/95 border-slate-200/80'
          }`}>
          <div className="max-w-[1680px] mx-auto px-3 md:px-6 h-16 flex items-center justify-between gap-3 min-w-0">
            {/* Left: Back to Catalog & Template Title */}
            <div className="flex items-center gap-2.5 min-w-0 shrink">
              <Link
                href="/canonical"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-sky-500" />
                <span className="hidden sm:inline">All Templates</span>
              </Link>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />

              <div className="flex items-center gap-2 min-w-0 truncate">
                <span className="w-7 h-7 rounded-lg bg-sky-500 text-white font-black text-xs flex items-center justify-center shadow-sm shrink-0">
                  {activeTemplate.id}
                </span>
                <div className="min-w-0 truncate">
                  <div className="flex items-center gap-1.5 truncate">
                    <h1 className="text-sm md:text-base font-extrabold tracking-tight truncate">
                      {activeTemplate.name}
                    </h1>
                    <span className="hidden xl:inline-flex text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
                      {activeTemplate.level === 'L1' ? 'L1 Conceptual' :
                       activeTemplate.level === 'L2' ? 'L2 Logical' :
                       activeTemplate.level === 'L3' ? 'L3 Physical / Technical' :
                       activeTemplate.level}
                    </span>
                    <span className="hidden xl:inline-flex text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                      Master
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Prev / Next Navigation Arrows */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
              <button
                disabled={!prevTemplate}
                onClick={() => prevTemplate && router.push(`/canonical/${prevTemplate.id}`)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  prevTemplate
                    ? 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer'
                    : 'opacity-30 cursor-not-allowed text-slate-400'
                }`}
                title={prevTemplate ? `Previous: ${prevTemplate.id} - ${prevTemplate.name}` : 'No previous template'}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Prev</span>
              </button>

              <span className="text-[11px] font-mono font-bold px-1.5 text-slate-500">
                {currentIndex + 1} / {CANONICAL_TEMPLATES.length}
              </span>

              <button
                disabled={!nextTemplate}
                onClick={() => nextTemplate && router.push(`/canonical/${nextTemplate.id}`)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  nextTemplate
                    ? 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer'
                    : 'opacity-30 cursor-not-allowed text-slate-400'
                }`}
                title={nextTemplate ? `Next: ${nextTemplate.id} - ${nextTemplate.name}` : 'No next template'}
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Actions, Domain Selector & Theme */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Domain Preset Selector */}
              <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-xl border text-xs font-medium bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <Sliders className="w-3.5 h-3.5 text-sky-500" />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-transparent font-semibold text-sky-600 dark:text-sky-400 outline-none cursor-pointer text-xs max-w-[180px] truncate"
                >
                  {DOMAIN_PRESETS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Launch Studio Button */}
              <Link
                href={`/docgen?tab=studio&mode=diagrams&blueprint=${activeTemplate.id}&domain=${selectedDomain}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-sm shadow-teal-500/20 transition-all hover:scale-[1.02] shrink-0"
                title="Launch in Multi-Blueprint Studio & DocGen"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Launch Studio</span>
                <span className="sm:hidden">Studio</span>
              </Link>



              {/* Generate Docs Button */}
              <button
                onClick={() => setIsComposeOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02] shrink-0"
                title="Generate BRD, PRD, SDD (HLD), FDD, TDD (LLD) from this diagram"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Docs</span>
              </button>

              {/* Secondary Actions Cluster */}
              <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
                {/* Share URL */}
                <button
                  onClick={handleCopyShareUrl}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
                  title="Copy Direct Shareable Link"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-sky-500" />}
                  <span className="hidden xl:inline">{copiedUrl ? 'Copied' : 'Share'}</span>
                </button>

                {/* Copy XML */}
                <button
                  onClick={handleCopyXml}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
                  title="Copy Raw Draw.io XML"
                >
                  {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span className="hidden xl:inline">{copiedXml ? 'Copied' : 'XML'}</span>
                </button>

                {/* Download */}
                <button
                  onClick={handleDownloadXml}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
                  title="Download .drawio file"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden xl:inline">Download</span>
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                  title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
                >
                  {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Theme Toggle */}
              <ThemeToggleBtn id="canonical-detail-theme-toggle-btn" />
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

        {/* DOCUMENT GENERATION MODAL (BRD, PRD, SDD, FDD, TDD, THREAT MODEL) */}
        <ComposeModal
          isOpen={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
          currentXml={currentXml}
          currentTitle={activeTemplate.name}
          currentDomain={DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name || selectedDomain}
        />
      </div>
    </div>
  );
}
