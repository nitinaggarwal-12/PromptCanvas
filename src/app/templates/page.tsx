'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Cloud,
  Database,
  Cpu,
  GitBranch,
  Building2,
  Search,
  ArrowRight,
  Sparkles,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Eye,
  X,
  Compass,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { TEMPLATE_CATEGORIES, TEMPLATE_CATALOG_ITEMS, TemplateCatalogItem } from '@/lib/templateCategories';

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [previewItem, setPreviewItem] = useState<TemplateCatalogItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-4 h-4" />;
      case 'Cloud': return <Cloud className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4" />;
      case 'Building2': return <Building2 className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const filteredItems = useMemo(() => {
    return TEMPLATE_CATALOG_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.name.toLowerCase().includes(q) ||
        item.whenToUse.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q) ||
        item.keyTech.some(t => t.toLowerCase().includes(q)) ||
        item.bestFor.some(b => b.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyPrompt = (item: TemplateCatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.promptSummary);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenWorkspace = (item: TemplateCatalogItem) => {
    router.push(`/workspace?arch=${item.id}`);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* ========================================================================= */}
      {/* STICKY FULL-WIDTH NAVIGATION HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-6">
          {/* Logo & Breadcrumb */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 p-[1.5px] shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white flex items-center gap-1.5">
                  Prompt<span className="text-teal-400">Canvas</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400">
                  Enterprise AI Architect
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500 border-l border-slate-800 pl-6">
              <Link href="/dashboard" className="text-slate-400 hover:text-slate-200 transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-teal-400 font-bold">Template Decision Matrix</span>
            </div>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-300 hover:text-white transition-all shadow-sm"
            >
              <LayoutGrid className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-200"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Launch Blank Canvas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SECTION & METRIC HIGHLIGHTS */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-10 border-b border-slate-800/60 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold tracking-wide">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>ARCHITECTURE SELECTION GUIDE &amp; DECISION MATRIX</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Zero Confusion. <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-400">Choose the Right Blueprint</span> for Every System.
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                Browse all 22 verified publication-grade architecture blueprints categorized across 6 enterprise domains. Compare decision heuristics, view high-res visual thumbnails, and launch directly into the interactive editor.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-md">
                <div className="text-2xl font-black text-teal-400">22</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Production Templates</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-md">
                <div className="text-2xl font-black text-indigo-400">6</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Enterprise Domains</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-md col-span-2 sm:col-span-1">
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Collision-Free XML</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FILTER CONTROLS & SEARCH BAR */}
      {/* ========================================================================= */}
      <section className="sticky top-20 z-40 bg-[#07090E]/95 backdrop-blur-md border-b border-slate-800/80 py-4 shadow-xl">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Templates ({TEMPLATE_CATALOG_ITEMS.length})</span>
            </button>

            {TEMPLATE_CATEGORIES.map((cat) => {
              const count = TEMPLATE_CATALOG_ITEMS.filter((i) => i.categoryId === cat.id).length;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.shortName}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                    isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and View Mode Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <div className="relative flex-1 md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates, tech stack, use cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 focus:border-teal-400 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-slate-800 text-teal-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Visual Card Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-slate-800 text-teal-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Comparison Matrix Table"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 md:px-12 py-10 space-y-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 border-dashed space-y-4">
            <Search className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No architecture templates match your search</h3>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              Try adjusting your query or resetting the category filter to view all 22 blueprints.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 text-xs font-bold transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ===================================================================== */
          /* 1. VISUAL DECISION GRID VIEW                                          */
          /* ===================================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#0D121F] rounded-2xl border border-slate-800/90 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Thumbnail Header with Quick Actions */}
                <div className="relative aspect-[16/10] bg-slate-950 border-b border-slate-800 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-transparent to-transparent opacity-80" />

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[11px] font-bold text-teal-300 shadow-md">
                      {item.categoryName}
                    </span>
                    {item.isNew && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-md shadow-emerald-500/20">
                        ⚡ NEW
                      </span>
                    )}
                    {item.isFlagship && (
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/90 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase shadow-md">
                        ★ FLAGSHIP
                      </span>
                    )}
                  </div>

                  {/* Quick Zoom Button */}
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white backdrop-blur-md border border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
                    title="Zoom & Inspect Blueprint"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="text-base font-black text-white group-hover:text-teal-300 transition-colors leading-snug line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Decision Heuristic Callout (When To Use) */}
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>When to Choose This:</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {item.whenToUse}
                      </p>
                    </div>

                    {/* Best For Bullet Highlights */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Capabilities:
                      </div>
                      <ul className="space-y-1">
                        {item.bestFor.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.keyTech.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/60 text-[10px] font-semibold text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.keyTech.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-800/50 text-[10px] font-semibold text-slate-500">
                          +{item.keyTech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={(e) => handleCopyPrompt(item, e)}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-all"
                      title="Copy Architecture Specification"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-400" />
                          <span className="text-teal-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleOpenWorkspace(item)}
                      className="flex-1 px-4 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-950 border border-teal-500/30 hover:border-teal-500 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                    >
                      <span>Open in Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ===================================================================== */
          /* 2. COMPREHENSIVE COMPARISON MATRIX TABLE VIEW                         */
          /* ===================================================================== */
          <div className="bg-[#0D121F] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider font-bold">
                    <th className="py-4 px-6 w-36">Thumbnail</th>
                    <th className="py-4 px-6 w-64">Architecture Blueprint</th>
                    <th className="py-4 px-6">When to Choose This (Decision Heuristic)</th>
                    <th className="py-4 px-6 w-64">Key Capabilities</th>
                    <th className="py-4 px-6 w-52">Tech Stack</th>
                    <th className="py-4 px-6 text-right w-44">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-900/50 transition-colors group cursor-pointer"
                      onClick={() => setPreviewItem(item)}
                    >
                      {/* Thumbnail */}
                      <td className="py-4 px-6 align-top">
                        <div className="w-28 aspect-[16/10] rounded-lg bg-slate-950 border border-slate-800 overflow-hidden relative group-hover:border-teal-500/50 transition-all">
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </td>

                      {/* Architecture Blueprint & Badge */}
                      <td className="py-4 px-6 align-top space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-teal-400">
                            {item.categoryName}
                          </span>
                          {item.isNew && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black">
                              NEW
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-white text-sm group-hover:text-teal-300 transition-colors">
                          {item.name}
                        </h4>
                        <div className="text-[10px] text-slate-500 font-mono">{item.id}</div>
                      </td>

                      {/* When to Choose */}
                      <td className="py-4 px-6 align-top">
                        <p className="text-slate-300 leading-relaxed max-w-lg">
                          {item.whenToUse}
                        </p>
                      </td>

                      {/* Key Capabilities */}
                      <td className="py-4 px-6 align-top">
                        <ul className="space-y-1 text-slate-400">
                          {item.bestFor.slice(0, 3).map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                              <span className="line-clamp-1">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </td>

                      {/* Tech Stack */}
                      <td className="py-4 px-6 align-top">
                        <div className="flex flex-wrap gap-1">
                          {item.keyTech.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-medium text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 align-top text-right space-y-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenWorkspace(item);
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                        >
                          <span>Use Blueprint</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* QUICK PREVIEW & INSPECTION MODAL */}
      {/* ========================================================================= */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-[#0D121F] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">
                    {previewItem.categoryName}
                  </span>
                  {previewItem.isNew && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">
                      ⚡ NEW BLUEPRINT
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black text-white">{previewItem.name}</h2>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* High-Res Image Preview */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner max-h-[450px] flex items-center justify-center">
                <img
                  src={previewItem.thumbnail}
                  alt={previewItem.name}
                  className="w-full h-auto max-h-[450px] object-contain"
                />
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    When To Use (Decision Heuristic)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {previewItem.whenToUse}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Key Capabilities &amp; Design Decisions
                  </h4>
                  <ul className="space-y-1.5">
                    {previewItem.bestFor.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Tech Tags */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Associated Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {previewItem.keyTech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
              <button
                onClick={(e) => handleCopyPrompt(previewItem, e)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-all"
              >
                {copiedId === previewItem.id ? (
                  <>
                    <Check className="w-4 h-4 text-teal-400" />
                    <span className="text-teal-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Architecture Prompt</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleOpenWorkspace(previewItem)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
              >
                <span>Launch in Interactive Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
