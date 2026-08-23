'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
  generateSystemContextXml
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
  Database,
  Network,
  GitBranch,
  Activity,
  Cpu,
  FileText,
  Globe,
  ChevronRight,
  Maximize2,
  Sun,
  Moon,
  ArrowRight,
  BookOpen,
  X
} from 'lucide-react';

export default function CanonicalPage() {
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('biopharma');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Modal / Canvas state
  const [activeTemplate, setActiveTemplate] = useState<CanonicalTemplate | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const [isAdaptModalOpen, setIsAdaptModalOpen] = useState<boolean>(false);
  const [currentXml, setCurrentXml] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

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

  // Open Template in Canvas Viewer
  const handleOpenCanvas = (tpl: CanonicalTemplate) => {
    setActiveTemplate(tpl);
    const xml = tpl.generateXml(selectedDomain, themeMode);
    setCurrentXml(xml);
    setIsViewerOpen(true);
  };

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
    }, 600);
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(currentXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
  const isDark = themeMode === 'dark';
  const bgClass = isDark ? 'bg-[#0B111E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900';
  const cardClass = isDark
    ? 'bg-[#0F172A] border-slate-800 hover:border-sky-500/50 shadow-slate-950/50'
    : 'bg-white border-slate-200/90 hover:border-sky-400/60 shadow-slate-200/40';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${bgClass} font-sans`}>
      {/* STICKY FULL-WIDTH TOP NAVIGATION */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors ${
        isDark ? 'bg-[#0B111E]/90 border-slate-800/80' : 'bg-white/90 border-slate-200/80'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight">PromptCanvas</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 uppercase tracking-wider">
                    Canonical Hub v1.0
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">34 Canonical Diagram Grammars &bull; 8 Visual Families</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Domain Preset Selector */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <Sliders className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-slate-500 dark:text-slate-400">Domain Flavor:</span>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="bg-transparent font-semibold text-sky-600 dark:text-sky-400 outline-none cursor-pointer"
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
              href="/workspace"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>

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

      {/* HERO SECTION */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              <Zap className="w-3.5 h-3.5" />
              The 34 Canonical Diagram Grammars
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
              <div className="text-2xl md:text-3xl font-black text-sky-500">34</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Canonical Schemas</div>
            </div>
            <div className="text-center px-4 py-2 border-x border-slate-200 dark:border-slate-800">
              <div className="text-2xl md:text-3xl font-black text-indigo-500">8</div>
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
            const isFirst = template.id === '01';

            return (
              <div
                key={template.id}
                className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${cardClass} ${
                  isFirst ? 'ring-2 ring-sky-500/40' : ''
                }`}
              >
                {isFirst && (
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
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {template.level}
                    </span>
                  </div>

                  {/* Primary Purpose */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {template.primaryPurpose}
                  </p>

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
                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenCanvas(template)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Canvas</span>
                  </button>

                  <button
                    onClick={() => handleOpenAdapt(template)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Adapt Domain</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* FULL-FEATURED LIVE DRAW.IO CANVAS VIEWER MODAL */}
      {isViewerOpen && activeTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-8">
          <div className="relative w-full max-w-7xl h-[90vh] rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500 text-white font-black text-xs flex items-center justify-center">
                  {activeTemplate.id}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {activeTemplate.name} &bull; Live Draw.io Architecture
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Self-Healed &bull; Zero Collisions
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Domain: {DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name || selectedDomain}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyXml}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied XML!' : 'Copy XML'}</span>
                </button>

                <button
                  onClick={handleDownloadXml}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .drawio</span>
                </button>

                <button
                  onClick={() => setIsViewerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Live Draw.io Viewer Viewport */}
            <div className="flex-1 w-full h-full min-h-[550px] bg-[#F8FAFC] dark:bg-[#0B111E] relative overflow-hidden flex items-center justify-center p-2 md:p-4">
              <DiagramViewerRenderSafe
                xml={currentXml}
                bgTheme={themeMode}
                diagramId={activeTemplate.id}
                diagramType="canonical_system_context"
                aspectRatioId="21:9"
              />
            </div>
          </div>
        </div>
      )}

      {/* DOMAIN ADAPTATION & SELF-HEALING MODAL */}
      {isAdaptModalOpen && activeTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6">
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
    </div>
  );
}
