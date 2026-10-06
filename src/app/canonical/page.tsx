'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
} from '@/lib/canonical/canonicalTemplates';
import { executeGcpPromptModification } from '@/lib/gcpCoPilotModifier';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  Layers,
  LayoutGrid,
  Search,
  Filter,
  Sparkles,
  Code,
  Copy,
  Check,
  ExternalLink,
  Eye,
  Download,
  RefreshCw,
  Sliders,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sun,
  Moon,
  ArrowRight,
  BookOpen,
  Share2,
  X,
  FileText,
  History,
  Network,
  ShieldCheck,
  Settings,
  User,
  Compass,
  Menu,
  Plus,
  BarChart3
} from 'lucide-react';
import { ComposeModal } from '@/components/workspace/ComposeModal';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { useTheme } from '@/lib/themeContext';
import { AppHeader } from '@/components/AppHeader';

function CanonicalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeMode: 'light' | 'dark' = theme;

  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('biopharma');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  // Full-page viewer / hover state
  const [activeTemplate, setActiveTemplate] = useState<CanonicalTemplate | null>(null);
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const [isAdaptModalOpen, setIsAdaptModalOpen] = useState<boolean>(false);
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);
  const [currentXml, setCurrentXml] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Compute navigation indices
  const currentIndex = useMemo(() => {
    if (!activeTemplate) return -1;
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

  // Open Template as a Full-Screen Page (NO popup modal)
  const handleOpenCanvas = useCallback((tpl: CanonicalTemplate, navigateToRoute = true) => {
    if (navigateToRoute) {
      router.push(`/canonical/${tpl.id}?domain=${selectedDomain}`);
      return;
    }
    setActiveTemplate(tpl);
    const xml = tpl.generateXml(selectedDomain, themeMode);
    setCurrentXml(xml);
    setIsViewerOpen(true);
  }, [router, selectedDomain, themeMode]);

  // Close Full-Page Viewer & return to catalog grid
  const handleCloseViewer = useCallback((updateHistory = true) => {
    setIsViewerOpen(false);
    setActiveTemplate(null);
    if (updateHistory && typeof window !== 'undefined') {
      window.history.pushState(null, '', '/canonical');
    }
  }, []);

  // Check URL on mount & query param changes
  useEffect(() => {
    const idParam = searchParams.get('id') || searchParams.get('template');
    if (idParam) {
      const formattedId = idParam.padStart(2, '0');
      const matched = CANONICAL_TEMPLATES.find((t) => t.id === formattedId || t.id === idParam);
      if (matched) {
        handleOpenCanvas(matched, false);
      }
    } else {
      setIsViewerOpen(false);
      setActiveTemplate(null);
    }
  }, [searchParams, handleOpenCanvas]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get('id') || urlParams.get('template');
      if (idParam) {
        const formattedId = idParam.padStart(2, '0');
        const matched = CANONICAL_TEMPLATES.find((t) => t.id === formattedId || t.id === idParam);
        if (matched) {
          handleOpenCanvas(matched, false);
          return;
        }
      }
      setIsViewerOpen(false);
      setActiveTemplate(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleOpenCanvas]);

  // Keyboard navigation for Escape, Left and Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.key === 'Escape') {
        handleCloseViewer();
        setIsAdaptModalOpen(false);
      } else if (isViewerOpen) {
        if (e.key === 'ArrowLeft' && prevTemplate) {
          handleOpenCanvas(prevTemplate);
        } else if (e.key === 'ArrowRight' && nextTemplate) {
          handleOpenCanvas(nextTemplate);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewerOpen, prevTemplate, nextTemplate, handleOpenCanvas, handleCloseViewer]);

  // Re-generate current XML when domain or theme changes while viewing
  useEffect(() => {
    if (isViewerOpen && activeTemplate) {
      setCurrentXml(activeTemplate.generateXml(selectedDomain, themeMode));
    }
  }, [selectedDomain, themeMode, isViewerOpen, activeTemplate]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return CANONICAL_TEMPLATES.filter((tpl) => {
      const matchFamily = selectedFamily === 'All' || tpl.family === selectedFamily;
      const matchLevel = selectedLevel === 'All' || tpl.level === selectedLevel;
      const matchSearch =
        tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.id.includes(searchQuery) ||
        tpl.primaryPurpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.examples.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFamily && matchLevel && matchSearch;
    });
  }, [selectedFamily, selectedLevel, searchQuery]);

  // Open Adapt Modal
  const handleOpenAdapt = (tpl: CanonicalTemplate) => {
    setActiveTemplate(tpl);
    setIsAdaptModalOpen(true);
  };

  // Execute Domain Adaptation & Self-Healing (and persist to Saved Architectures Library)
  const handleRunAdaptation = async () => {
    if (!activeTemplate) return;
    setIsGenerating(true);
    const domainLabel = DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name || selectedDomain;
    let healedXml = activeTemplate.generateXml(selectedDomain, themeMode);
    if (customPrompt.trim()) {
      const modRes = executeGcpPromptModification(healedXml, customPrompt.trim(), 0, activeTemplate.id, false);
      if (modRes.updatedXml) {
        healedXml = modRes.updatedXml;
      }
    }
    try {
      await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${activeTemplate.name} — ${customPrompt.trim() ? customPrompt.trim().slice(0, 48) : domainLabel}`,
          architecture_type: `canonical_${activeTemplate.id}`,
          created_studio: 'studio',
          xml_content: healedXml,
          prompt: customPrompt.trim() || `Adapted Blueprint #${activeTemplate.id} (${activeTemplate.name}) for ${domainLabel}`,
        }),
      });
    } catch {}
    setTimeout(() => {
      setCurrentXml(healedXml);
      setIsGenerating(false);
      setIsAdaptModalOpen(false);
      setIsViewerOpen(true);
      if (typeof window !== 'undefined') {
        window.history.pushState({ templateId: activeTemplate.id }, '', `/canonical?id=${activeTemplate.id}`);
      }
    }, 450);
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(currentXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyShareUrl = () => {
    if (typeof window !== 'undefined' && activeTemplate) {
      const fullUrl = `${window.location.origin}/canonical/${activeTemplate.id}`;
      navigator.clipboard.writeText(fullUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleDownloadXml = () => {
    const blob = new Blob([currentXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canonical_template_${activeTemplate?.id || '01'}_${selectedDomain}.drawio.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Background & theme colors
  const bgClass = isDark ? 'bg-[#0B111E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900';
  const cardClass = isDark
    ? 'bg-[#0F172A] border-slate-800 hover:border-sky-500/50 shadow-slate-950/50'
    : 'bg-white border-slate-200/90 hover:border-sky-400/60 shadow-slate-200/40';

  return (
    <div className={`flex min-h-screen transition-colors duration-200 ${bgClass} font-sans`}>
      {/* Collapsible Left Navigation Menu */}
      <UnifiedAppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* STICKY FULL-WIDTH TOP NAVIGATION */}
        <AppHeader>
 <div className="w-full max-w-none flex items-center justify-between gap-3 min-w-0">
            {/* Left: Breadcrumbs & Catalog Context */}
            <div className="flex items-center gap-2.5 min-w-0 shrink truncate">
              <div className="flex items-center gap-1.5 text-xs font-semibold truncate">
                <Link href="/" className="text-slate-400 hover:text-white transition-colors shrink-0" title="Home">
                  PromptCanvas
                </Link>
                <span className="text-slate-600 shrink-0">/</span>
                <span className="font-bold text-sky-400 flex items-center gap-1.5 truncate">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">Blueprint Catalog</span>
                </span>
                <span className="hidden md:inline-flex text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                  {CANONICAL_TEMPLATES.length} Grammars
                </span>
              </div>
            </div>

            {/* Right: Controls & Hub Quick Links */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Domain Preset Selector */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-medium bg-slate-900 border-slate-700 text-slate-200">
                <Sliders className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-slate-400 hidden xl:inline text-[11px]">Domain:</span>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-transparent font-semibold text-sky-400 outline-none cursor-pointer text-xs max-w-[170px] truncate"
                >
                  {DOMAIN_PRESETS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-slate-900 text-slate-100">
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Links & Saved Architectures Library CTA */}
              <Link
                href="/library"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20 transition-all cursor-pointer shrink-0"
                title="View all created and saved architectures using these blueprints"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Saved Architectures</span>
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition-all cursor-pointer shrink-0"
                title="Open in Home Dashboard"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Open in Dashboard</span>
              </Link>

              <Link
                href="/docgen"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shadow-xs shrink-0"
                title="DocGen Studio & Master Specifications"
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">DocGen Hub</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-500/20 font-mono font-bold text-sky-300">17</span>
              </Link>

              {/* Standardized Theme Toggle */}
              <ThemeToggleBtn id="canonical-theme-toggle-btn" />
            </div>
          </div>
        </AppHeader>

      {isViewerOpen && activeTemplate ? (
        /* FULL-SCREEN STABLE PAGE VIEW (NO POPUP MODAL) */
        <main className="flex-1 w-full max-w-none flex flex-col px-4 sm:px-6 lg:px-8 py-4 gap-3 bg-[#F8FAFC]">
          {/* Top Full-Page Control Bar */}
          <div className="w-full rounded-2xl bg-white border border-slate-200 px-4 md:px-6 py-3 shadow-sm flex flex-wrap items-center justify-between gap-4">
            {/* Left: Back to Catalog & Template Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => handleCloseViewer()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4 text-sky-400" />
                <span>Back to Catalog</span>
              </button>
              <span className="w-9 h-9 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shadow-sm shrink-0">
                #{activeTemplate.id}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base md:text-lg font-black text-slate-900 truncate">
                    {activeTemplate.name}
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                    {activeTemplate.family} • {activeTemplate.level}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Full-Screen Stable Blueprint
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  {activeTemplate.primaryPurpose}
                </p>
              </div>
            </div>

            {/* Center: Prev / Next Navigation Arrows */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                disabled={!prevTemplate}
                onClick={() => prevTemplate && handleOpenCanvas(prevTemplate, false)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  prevTemplate
                    ? 'hover:bg-white text-slate-700 shadow-xs cursor-pointer'
                    : 'opacity-30 cursor-not-allowed text-slate-400'
                }`}
                title={prevTemplate ? `Previous: ${prevTemplate.id} - ${prevTemplate.name}` : 'No previous template'}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev {prevTemplate ? `(${prevTemplate.id})` : ''}</span>
              </button>

              <span className="text-[11px] font-mono font-bold px-2 text-slate-600">
                {currentIndex + 1} / {CANONICAL_TEMPLATES.length}
              </span>

              <button
                disabled={!nextTemplate}
                onClick={() => nextTemplate && handleOpenCanvas(nextTemplate, false)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  nextTemplate
                    ? 'hover:bg-white text-slate-700 shadow-xs cursor-pointer'
                    : 'opacity-30 cursor-not-allowed text-slate-400'
                }`}
                title={nextTemplate ? `Next: ${nextTemplate.id} - ${nextTemplate.name}` : 'No next template'}
              >
                <span>Next {nextTemplate ? `(${nextTemplate.id})` : ''}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/dashboard?blueprint=${activeTemplate.id}&domain=${selectedDomain}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Open in Dashboard</span>
              </Link>

              <button
                onClick={() => setIsComposeOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sm transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Docs</span>
              </button>

              <button
                onClick={handleCopyShareUrl}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-sky-600" />}
                <span>{copiedUrl ? 'Copied Link!' : 'Share'}</span>
              </button>

              <button
                onClick={handleCopyXml}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied XML!' : 'Copy XML'}</span>
              </button>

              <button
                onClick={handleDownloadXml}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .drawio</span>
              </button>
            </div>
          </div>

          {/* Full-Screen Stable Diagram Canvas */}
          <div className="flex-1 w-full h-[calc(100vh-150px)] min-h-[700px] rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden flex items-center justify-center p-2 md:p-4">
            <DiagramViewerRenderSafe
              xml={currentXml}
              bgTheme={themeMode}
              diagramId={`canonical_${activeTemplate.id}`}
              diagramType={`canonical_${activeTemplate.id}`}
              aspectRatioId="16:9"
            />
          </div>
        </main>
      ) : (
        /* COMPACT HERO SECTION & CATALOG GRID */
        <main className="w-full max-w-none px-4 sm:px-6 lg:px-8 pt-3 pb-16">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-3.5 border-b border-slate-200 dark:border-slate-800 min-w-0">
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  <Zap className="w-3 h-3" />
                  {CANONICAL_TEMPLATES.length} Canonical Diagram Grammars
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                Architectural Grammar for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400">
                  Self-Healing AI Blueprints
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-normal max-w-2xl line-clamp-1">
                Hover over any tile for an enlarged diagram preview, or click any tile to open the full-screen blueprint page.
              </p>
            </div>

            {/* Compact Stats Pill Strip */}
            <div className="flex items-center gap-3 sm:gap-4 p-2 px-3.5 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
              <div className="text-center px-1.5">
                <div className="text-base sm:text-lg font-black text-sky-500">{CANONICAL_TEMPLATES.length}</div>
                <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Schemas</div>
              </div>
              <div className="h-6 w-[1px] bg-slate-200 dark:border-slate-800" />
              <div className="text-center px-1.5">
                <div className="text-base sm:text-lg font-black text-indigo-500">{CANONICAL_FAMILIES.filter((f) => f !== 'All').length}</div>
                <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Families</div>
              </div>
              <div className="h-6 w-[1px] bg-slate-200 dark:border-slate-800" />
              <div className="text-center px-1.5">
                <div className="text-base sm:text-lg font-black text-emerald-500">100%</div>
                <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Full-Page</div>
              </div>
            </div>
          </div>

          {/* COMPACT CONTROLS BAR: SEARCH, FAMILIES & LEVEL FILTERS */}
          <div className="py-3 space-y-2.5">
            {/* Top Row: Search & Level Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search templates (e.g. System Context, RAG, Threat Model)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Abstraction Level Filters */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
                {[
                  { id: 'All', label: 'All Levels', count: CANONICAL_TEMPLATES.length },
                  { id: 'L1', label: 'L1 Conceptual', count: CANONICAL_TEMPLATES.filter((t) => t.level === 'L1').length },
                  { id: 'L2', label: 'L2 Logical', count: CANONICAL_TEMPLATES.filter((t) => t.level === 'L2').length },
                  { id: 'L3', label: 'L3 Physical / Technical', count: CANONICAL_TEMPLATES.filter((t) => t.level === 'L3').length }
                ].map(({ id, label, count }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedLevel(id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                      selectedLevel === id
                        ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                      selectedLevel === id
                        ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300'
                        : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Row: Visual Families Category Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin max-w-full">
              {CANONICAL_FAMILIES.map((family) => {
                const count =
                  family === 'All'
                    ? CANONICAL_TEMPLATES.length
                    : CANONICAL_TEMPLATES.filter((t) => t.family === family).length;
                return (
                  <button
                    key={family}
                    onClick={() => setSelectedFamily(family)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border shrink-0 ${
                      selectedFamily === family
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <span>{family}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] ${
                        selectedFamily === family
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 75 TEMPLATES GRID WITH REAL THUMBNAILS BEHIND TILES & BIGGER HOVER CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-2">
            {filteredTemplates.map((template, idx) => {
              const isHighlighted = ['00', '01', '02', '03', '04'].includes(template.id);
              const thumbSrc = template.previewImage || `/templates/canonical_${template.id.padStart(2, '0')}.png`;
              const isHovered = hoveredTemplateId === template.id;
              // Determine horizontal alignment of the bigger hover card so edge columns never clip
              const colMod4 = idx % 4;
              const hoverAlignClass =
                colMod4 === 0
                  ? 'left-0 origin-left'
                  : colMod4 === 3
                  ? 'right-0 origin-right'
                  : 'left-1/2 -translate-x-1/2 origin-center';

              return (
                <div
                  key={template.id}
                  data-testid={`canonical-tile-${template.id}`}
                  onMouseEnter={() => setHoveredTemplateId(template.id)}
                  onMouseLeave={() => setHoveredTemplateId(null)}
                  onClick={() => handleOpenCanvas(template, true)}
                  className={`group relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${cardClass} ${
                    isHighlighted ? 'ring-2 ring-sky-500/30' : ''
                  } ${isHovered ? 'z-40 border-sky-500 shadow-2xl' : 'z-10 hover:shadow-xl'}`}
                >
                  {/* REAL THUMBNAIL BEHIND THE TILE (SUBTLE FULL-BLEED LAYER) */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
                    <img
                      src={thumbSrc}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover opacity-[0.18] group-hover:opacity-[0.28] group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/82 to-white/94" />
                  </div>

                  {isHighlighted && (
                    <div className="absolute -top-3 right-6 z-20 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Live 1:1 Replica Ready
                    </div>
                  )}

                  <div className="relative z-10 space-y-3.5">
                    {/* Top Row: Template ID & Badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-9 h-9 rounded-xl bg-sky-600 text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                          {template.id}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block">
                            {template.family}
                          </span>
                          <h3 className="text-base font-extrabold text-slate-900 leading-tight group-hover:text-sky-600 transition-colors truncate">
                            {template.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-white/90 text-slate-700 border border-slate-200 shadow-2xs">
                          {template.level === 'L1' ? 'L1 Conceptual' :
                           template.level === 'L2' ? 'L2 Logical' :
                           template.level === 'L3' ? 'L3 Physical' :
                           template.level}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Certified
                        </span>
                      </div>
                    </div>

                    {/* Primary Purpose */}
                    <p className="text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed">
                      {template.primaryPurpose}
                    </p>

                    {/* Real Architecture Diagram Thumbnail Preview Box */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-white border border-slate-200/90 group-hover:border-sky-500/60 transition-all shadow-sm flex items-center justify-center">
                      <img
                        src={thumbSrc}
                        alt={template.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold flex items-center gap-1">
                        <Maximize2 className="w-2.5 h-2.5 text-sky-400" /> Full Page
                      </div>
                    </div>

                    {/* Key Component Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {template.keyComponents.map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-slate-600 border border-slate-200/90 shadow-2xs"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>

                    {/* Examples */}
                    <div className="text-[11px] text-slate-500 pt-0.5 truncate">
                      <span className="font-bold text-slate-700">Typical: </span>
                      {template.examples}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div
                    className="relative z-10 pt-3.5 mt-3.5 border-t border-slate-200/80 grid grid-cols-3 gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      href={`/canonical/${template.id}?domain=${selectedDomain}`}
                      className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02]"
                      title="Open full-screen blueprint template page"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Page</span>
                    </Link>

                    <button
                      onClick={() => {
                        setActiveTemplate(template);
                        setCurrentXml(template.generateXml(selectedDomain, themeMode));
                        setIsComposeOpen(true);
                      }}
                      className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                      title="Generate BRD, PRD, SDD (HLD), FDD, TDD (LLD) from this blueprint"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Docs</span>
                    </button>

                    <button
                      onClick={() => handleOpenAdapt(template)}
                      className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                      title="Adapt blueprint for your custom prompt"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Adapt</span>
                    </button>
                  </div>

                  {/* BIGGER FLOATING CARD ON HOVER */}
                  {isHovered && (
                    <div
                      data-testid={`canonical-hover-card-${template.id}`}
                      onClick={() => handleOpenCanvas(template, true)}
                      className={`hidden md:flex flex-col justify-between absolute -top-4 ${hoverAlignClass} w-[480px] xl:w-[540px] z-50 rounded-3xl bg-white border-2 border-sky-500 shadow-[0_28px_80px_-12px_rgba(2,132,199,0.45)] p-5 transition-all duration-200 cursor-pointer`}
                    >
                      {/* Subtle Real Thumbnail Behind Hover Card */}
                      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
                        <img
                          src={thumbSrc}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-cover opacity-[0.12] scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-white/92 to-white/96" />
                      </div>

                      <div className="relative z-10 space-y-3">
                        {/* Hover Card Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-black text-base flex items-center justify-center shadow-md shrink-0">
                              #{template.id}
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-black uppercase tracking-wider text-sky-600">
                                  {template.family}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-[10px] font-extrabold text-indigo-600">
                                  {template.level} Blueprint
                                </span>
                              </div>
                              <h4 className="text-lg font-black text-slate-900 leading-snug">
                                {template.name}
                              </h4>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-sky-500 text-white shadow-xs shrink-0 flex items-center gap-1">
                            <Maximize2 className="w-3 h-3" /> Click for Full Page
                          </span>
                        </div>

                        {/* Enlarged High-Resolution Real Diagram Preview */}
                        <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-white border-2 border-sky-200 shadow-inner flex items-center justify-center p-2">
                          <img
                            src={thumbSrc}
                            alt={template.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Full Purpose & Key Components */}
                        <p className="text-xs font-medium text-slate-700 leading-relaxed">
                          {template.primaryPurpose}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {template.keyComponents.map((comp, idx2) => (
                            <span
                              key={idx2}
                              className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover Card Footer CTA */}
                      <div
                        className="relative z-10 pt-3 mt-3 border-t border-slate-200 flex items-center justify-between gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={`/canonical/${template.id}?domain=${selectedDomain}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition-all"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Open Full-Screen Stable Page</span>
                        </Link>
                        <Link
                          href={`/dashboard?blueprint=${template.id}&domain=${selectedDomain}`}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-extrabold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all"
                        >
                          Open in Dashboard
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* DOMAIN ADAPTATION & SELF-HEALING MODAL */}
      {isAdaptModalOpen && activeTemplate && (
        <div
          onClick={() => setIsAdaptModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 cursor-default"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Adapt Template {activeTemplate.id}: {activeTemplate.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Self-healing geometric compiler will adapt this grammar to your use case
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAdaptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Domain Preset Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Choose Enterprise Domain Preset
              </label>
              <div className="grid grid-cols-1 gap-2">
                {DOMAIN_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedDomain(preset.id);
                      setCustomPrompt('');
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      selectedDomain === preset.id && !customPrompt
                        ? 'bg-sky-500/10 border-sky-500 text-sky-600 dark:text-sky-400'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{preset.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                      {preset.prefix}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Natural Language Business Prompt */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Or Enter Custom Business Prompt
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Adapt this system context for a Decentralized Clinical Genomics Laboratory with automated FDA electronic signature audits and Spanner Knowledge Graph..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full p-3 rounded-xl border text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsAdaptModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleRunAdaptation}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling & Self-Healing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Compile Draw.io XML</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

        {/* DOCUMENT GENERATION MODAL (BRD, PRD, SDD, FDD, TDD, THREAT MODEL) */}
        {activeTemplate && (
          <ComposeModal
            isOpen={isComposeOpen}
            onClose={() => setIsComposeOpen(false)}
            currentXml={currentXml || activeTemplate.generateXml(selectedDomain, themeMode)}
            currentTitle={activeTemplate.name}
            currentDomain={DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name || selectedDomain}
          />
        )}
      </div>
    </div>
  );
}

export default function CanonicalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B111E] flex items-center justify-center text-white">
        <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Loading Canonical Hub...</span>
        </div>
      </div>
    }>
      <CanonicalContent />
    </Suspense>
  );
}
