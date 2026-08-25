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

function CanonicalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeMode: 'light' | 'dark' = isDark ? 'dark' : 'light';

  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('biopharma');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  // Modal / Canvas state
  const [activeTemplate, setActiveTemplate] = useState<CanonicalTemplate | null>(null);
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

  // Open Template in Canvas Viewer & sync URL
  const handleOpenCanvas = useCallback((tpl: CanonicalTemplate, updateHistory = true) => {
    setActiveTemplate(tpl);
    const xml = tpl.generateXml(selectedDomain, themeMode);
    setCurrentXml(xml);
    setIsViewerOpen(true);
    if (updateHistory && typeof window !== 'undefined') {
      window.history.pushState({ templateId: tpl.id }, '', `/canonical?id=${tpl.id}`);
    }
  }, [selectedDomain, themeMode]);

  // Close Viewer & sync URL
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
      const matchLevel = selectedLevel === 'All' || tpl.level.includes(selectedLevel);
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

  // Execute Domain Adaptation & Self-Healing
  const handleRunAdaptation = () => {
    if (!activeTemplate) return;
    setIsGenerating(true);
    setTimeout(() => {
      const effectiveDomain = customPrompt.trim() ? customPrompt : selectedDomain;
      const healedXml = activeTemplate.generateXml(effectiveDomain, themeMode);
      setCurrentXml(healedXml);
      setIsGenerating(false);
      setIsAdaptModalOpen(false);
      setIsViewerOpen(true);
      if (typeof window !== 'undefined') {
        window.history.pushState({ templateId: activeTemplate.id }, '', `/canonical?id=${activeTemplate.id}`);
      }
    }, 600);
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
        <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors ${
          isDark ? 'bg-[#0B111E]/90 border-slate-800/80' : 'bg-white/90 border-slate-200/80'
        }`}>
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
            {/* Left: Breadcrumbs & Catalog Context */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Link href="/" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" title="Home">
                  PromptCanvas
                </Link>
                <span className="text-slate-400">/</span>
                <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5 truncate">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>Canonical Blueprints Hub</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
                  {CANONICAL_TEMPLATES.length} Grammars
                </span>
              </div>
            </div>

            {/* Right: Controls & Hub Quick Links */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Domain Preset Selector */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <Sliders className="w-3.5 h-3.5 text-sky-500" />
                <span className="text-slate-500 dark:text-slate-400 hidden lg:inline">Domain:</span>
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

              {/* Quick Links */}
              <Link
                href="/docgen"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-600/10 to-indigo-600/10 hover:from-sky-600/20 hover:to-indigo-600/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 transition-all shadow-xs"
                title="DocGen Studio & Master Specifications"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">DocGen Hub</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-500/20 font-mono font-bold">17</span>
              </Link>

              <Link
                href="/workspace"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Design Canvas Workspace"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Workspace</span>
              </Link>

              {/* Standardized Theme Toggle */}
              <ThemeToggleBtn id="canonical-theme-toggle-btn" />
            </div>
          </div>
        </header>

      {/* HERO SECTION */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              <Zap className="w-3.5 h-3.5" />
              The {CANONICAL_TEMPLATES.length} Canonical Diagram Grammars
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Architectural Grammar for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400">
                Self-Healing AI Blueprints
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Fully editable, self-healing, and domain-adaptable Draw.io XML architecture templates.
              Every template is collision-free, geometrically aligned (140px column pitch, 80px row pitch), and ready for 1-click execution.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-center px-4 py-2">
              <div className="text-2xl md:text-3xl font-black text-sky-500">{CANONICAL_TEMPLATES.length}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Canonical Schemas</div>
            </div>
            <div className="text-center px-4 py-2 border-x border-slate-200 dark:border-slate-800">
              <div className="text-2xl md:text-3xl font-black text-indigo-500">{CANONICAL_FAMILIES.filter((f) => f !== 'All').length}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Visual Families</div>
            </div>
            <div className="text-center px-4 py-2">
              <div className="text-2xl md:text-3xl font-black text-emerald-500">100%</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">XML Compatible</div>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR: SEARCH, FAMILIES & LEVEL FILTERS */}
        <div className="py-8 space-y-5">
          {/* Top Row: Search & Level Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates (e.g. System Context, RAG, Threat Model)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Abstraction Level Filters */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-stretch sm:self-auto">
              {['All', 'L1', 'L2', 'L3'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === lvl
                      ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {lvl === 'All' ? 'All Levels' : `${lvl} Level`}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: 8 Visual Families Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CANONICAL_FAMILIES.map((family) => {
              const count =
                family === 'All'
                  ? CANONICAL_TEMPLATES.length
                  : CANONICAL_TEMPLATES.filter((t) => t.family === family).length;
              return (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(family)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedFamily === family
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/20'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <span>{family}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] ${
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

        {/* 34 TEMPLATES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredTemplates.map((template) => {
            const isHighlighted = ['01', '02', '03', '04'].includes(template.id);

            return (
              <div
                key={template.id}
                className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${cardClass} ${
                  isHighlighted ? 'ring-2 ring-sky-500/30' : ''
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Live 1:1 Replica Ready
                  </div>
                )}

                <div className="space-y-4">
                  {/* Top Row: Template ID & Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-black text-sm flex items-center justify-center">
                        {template.id}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {template.family}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-sky-500 transition-colors">
                          {template.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {template.level}
                      </span>
                      {template.certificationStatus === 'certified' ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Certified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                          In Review
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Primary Purpose */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {template.primaryPurpose}
                  </p>

                  {/* Architecture Diagram Preview Thumbnail */}
                  {template.previewImage && (
                    <div
                      onClick={() => handleOpenCanvas(template)}
                      className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 cursor-pointer group-hover:border-sky-500/50 transition-all shadow-inner flex items-center justify-center"
                    >
                      <img
                        src={template.previewImage}
                        alt={template.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                        <span className="text-[11px] font-bold text-white flex items-center gap-1.5 drop-shadow-md">
                          <Eye className="w-3.5 h-3.5 text-sky-400" /> Click to Open Live Canvas
                        </span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-500 text-white shadow">
                          1:1 XML Ready
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Key Component Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {template.keyComponents.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>

                  {/* Examples */}
                  <div className="text-[11px] text-slate-400 pt-1">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Typical: </span>
                    {template.examples}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleOpenCanvas(template)}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02]"
                    title="Open live interactive canvas"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Canvas</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTemplate(template);
                      setCurrentXml(template.generateXml(selectedDomain, themeMode));
                      setIsComposeOpen(true);
                    }}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02]"
                    title="Generate BRD, PRD, SDD (HLD), FDD, TDD (LLD) from this blueprint"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Docs</span>
                  </button>

                  <button
                    onClick={() => handleOpenAdapt(template)}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                    title="Adapt blueprint for your custom prompt"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Adapt</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* FULL-FEATURED LIVE DRAW.IO CANVAS VIEWER MODAL WITH URL SYNC & PREV/NEXT NAVIGATION */}
      {isViewerOpen && activeTemplate && (
        <div
          onClick={() => handleCloseViewer()}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 md:p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1680px] h-[92vh] rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden cursor-default"
          >
            {/* Modal Header */}
            <div className="px-4 md:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              {/* Left: Template ID & Title */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  {activeTemplate.id}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                      {activeTemplate.name} &bull; Live Draw.io Architecture
                    </h2>
                    <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Self-Healed &bull; Zero Collisions
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Domain: {DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name || selectedDomain}
                  </p>
                </div>
              </div>

              {/* Center: Prev / Next Navigation Arrows */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  disabled={!prevTemplate}
                  onClick={() => prevTemplate && handleOpenCanvas(prevTemplate)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    prevTemplate
                      ? 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer'
                      : 'opacity-30 cursor-not-allowed text-slate-400'
                  }`}
                  title={prevTemplate ? `Previous: ${prevTemplate.id} - ${prevTemplate.name}` : 'No previous template'}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev {prevTemplate ? `(${prevTemplate.id})` : ''}</span>
                </button>

                <span className="text-[11px] font-mono font-bold px-2 text-slate-500">
                  {currentIndex + 1} / {CANONICAL_TEMPLATES.length}
                </span>

                <button
                  disabled={!nextTemplate}
                  onClick={() => nextTemplate && handleOpenCanvas(nextTemplate)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    nextTemplate
                      ? 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer'
                      : 'opacity-30 cursor-not-allowed text-slate-400'
                  }`}
                  title={nextTemplate ? `Next: ${nextTemplate.id} - ${nextTemplate.name}` : 'No next template'}
                >
                  <span>Next {nextTemplate ? `(${nextTemplate.id})` : ''}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-1.5 md:gap-2">
                {/* Generate Docs Button */}
                <button
                  onClick={() => setIsComposeOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02]"
                  title="Generate BRD, PRD, SDD (HLD), FDD, TDD (LLD) from this diagram"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Generate Docs (BRD / PRD / SDD)</span>
                  <span className="sm:hidden">Docs</span>
                </button>

                {/* Full Page Link */}
                <Link
                  href={`/canonical/${activeTemplate.id}`}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Open in dedicated full page"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Full Page</span>
                </Link>

                {/* Share URL */}
                <button
                  onClick={handleCopyShareUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Copy Direct Link to this Template"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-sky-500" />}
                  <span className="hidden lg:inline">{copiedUrl ? 'Copied Link!' : 'Share'}</span>
                </button>

                {/* Reload Master */}
                <button
                  onClick={() => {
                    if (activeTemplate) {
                      setCurrentXml(activeTemplate.generateXml(selectedDomain, themeMode));
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Reload 1:1 clean master geometry"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-500" />
                  <span className="hidden lg:inline">Reload Master</span>
                </button>

                {/* Copy XML */}
                <button
                  onClick={handleCopyXml}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copied ? 'Copied XML!' : 'Copy XML'}</span>
                </button>

                {/* Download */}
                <button
                  onClick={handleDownloadXml}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download .drawio</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => handleCloseViewer()}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Live Draw.io Viewer Viewport with Floating Prev/Next Buttons */}
            <div className="flex-1 w-full h-full min-h-[550px] bg-[#F8FAFC] dark:bg-[#0B111E] relative overflow-hidden flex items-center justify-center p-2 md:p-4">
              {/* Floating Prev Button */}
              {prevTemplate && (
                <button
                  onClick={() => handleOpenCanvas(prevTemplate)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center hover:scale-110 hover:bg-sky-500 hover:text-white transition-all text-slate-700 dark:text-slate-200"
                  title={`Previous (Left Arrow): ${prevTemplate.id} - ${prevTemplate.name}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Floating Next Button */}
              {nextTemplate && (
                <button
                  onClick={() => handleOpenCanvas(nextTemplate)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center hover:scale-110 hover:bg-sky-500 hover:text-white transition-all text-slate-700 dark:text-slate-200"
                  title={`Next (Right Arrow): ${nextTemplate.id} - ${nextTemplate.name}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              <DiagramViewerRenderSafe
                xml={currentXml}
                bgTheme={themeMode}
                diagramId={`canonical_${activeTemplate.id}`}
                diagramType={`canonical_${activeTemplate.id}`}
                aspectRatioId="16:9"
              />
            </div>
          </div>
        </div>
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
