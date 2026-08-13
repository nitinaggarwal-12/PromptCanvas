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
  ShieldCheck,
  History,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  ShieldAlert,
  Settings,
  BookOpen,
  ClipboardList,
  Network,
  BarChart3
} from 'lucide-react';
import { TEMPLATE_CATEGORIES, TEMPLATE_CATALOG_ITEMS, TemplateCatalogItem } from '@/lib/templateCategories';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { UseCaseIntakeModal } from '@/components/UseCaseIntakeModal';

export default function TemplatesPage() {
  const router = useRouter();

  // Layout & Navigation State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null; is_guest?: boolean } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isUseCaseModalOpen, setIsUseCaseModalOpen] = useState<boolean>(false);

  // Warning Banner Dismiss State
  const [isGuestDisclaimerDismissed, setIsGuestDisclaimerDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('promptcanvas_dismiss_guest_disclaimer') === 'true';
      } catch (e) {}
    }
    return false;
  });

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsProfileModalOpen(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

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
    <div className="flex h-screen w-screen bg-[#070a13] text-slate-100 font-sans overflow-hidden select-none selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* ========================================================================= */}
      {/* 1. UNIFIED APP COLLAPSIBLE LEFT SIDEBAR */}
      {/* ========================================================================= */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-[#090d16]/95 border-r border-panel-border/80 transition-all duration-300 flex flex-col justify-between z-40 shrink-0 relative select-none`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-14 border-b border-panel-border/40 flex items-center justify-between px-4 shrink-0">
            {isSidebarOpen ? (
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-400 to-indigo-500 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center">
                  <div className="w-full h-full bg-[#070a13] rounded-[6px] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-teal-accent" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold tracking-wider text-xs text-white uppercase">Prompt Canvas</span>
                  <span className="text-[9px] text-teal-accent font-semibold tracking-wider">Enterprise AI</span>
                </div>
              </Link>
            ) : (
              <Link href="/">
                <Sparkles className="w-5 h-5 text-teal-accent mx-auto hover:opacity-90 transition-opacity" />
              </Link>
            )}
            {isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white cursor-pointer"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Zone: Primary Creation CTA */}
          <div className="p-3 border-b border-panel-border/30 relative shrink-0">
            <Link
              href="/workspace?new=true"
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-black transition-all shadow-md hover:shadow-teal-500/20 text-xs cursor-pointer ${
                !isSidebarOpen && 'p-2'
              }`}
              title="Create New Architecture with AI Prompt"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              {isSidebarOpen && <span>New Architecture</span>}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            {[
              { id: 'editor', name: 'Design Canvas', icon: Network, href: '/workspace' },
              { id: 'templates', name: 'Templates Gallery', icon: LayoutGrid, href: '/templates' },
              { id: 'history', name: 'Historical Canvases', icon: History, href: '/history' },
              { id: 'dashboard', name: 'Operations Dashboard', icon: BarChart3, href: '/dashboard' },
              { id: 'audit', name: 'Security Audit', icon: ShieldCheck, href: '/workspace?tab=audit' },
              { id: 'walkthrough', name: 'Interactive Tour', icon: BookOpen, href: '/workspace?tour=true' },
              { id: 'settings', name: 'Settings & AI Tier Config', icon: Settings, href: '/workspace?tab=settings' }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = item.id === 'templates';

              return (
                <Link key={item.id} href={item.href} className="block">
                  <div className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-teal-accent text-bg-dark font-extrabold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-bg-dark' : 'text-slate-400'}`} />
                      {isSidebarOpen && <span className="truncate">{item.name}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Sidebar: User Profile & Expand Toggle */}
        <div className="p-3 border-t border-panel-border/30 bg-slate-950/40">
          {!isSidebarOpen ? (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-full flex justify-center p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : user ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs shrink-0">
                  {(user.name || user.email)[0].toUpperCase()}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-200 truncate">{user.name || user.email}</p>
                  <p className="text-[10px] text-teal-400 font-mono">{user.is_guest ? 'Guest Session' : 'Verified Pro'}</p>
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-teal-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Profile</span>
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN APPLICATION CONTAINER */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        
        {/* ========================================================================= */}
        {/* TOP NAVBAR HEADER */}
        {/* ========================================================================= */}
        <header className="h-14 border-b border-panel-border/80 flex items-center justify-between px-4 md:px-8 bg-[#090d16]/90 backdrop-blur-md gap-3 relative shrink-0 z-30">
          {/* Left: Breadcrumbs & Sidebar Toggle */}
          <div className="flex items-center gap-3 shrink-0 min-w-0">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="font-extrabold text-white">PromptCanvas</span>
              <span className="text-slate-600">/</span>
              <span className="text-teal-400 font-bold flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Templates &amp; Master Blueprint Matrix</span>
              </span>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/history"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-teal-300 font-bold text-xs transition cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-teal-400" />
              <span>Historical Canvases</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsUseCaseModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 hover:border-teal-400 font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              <ClipboardList className="w-3.5 h-3.5 text-teal-400" />
              <span>Intake Form</span>
            </button>

            {/* + New Canvas Button */}
            <Link
              href="/workspace?new=true"
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-[#070a13] font-black text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>New Canvas</span>
            </Link>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* DISMISSIBLE GUEST MODE WARNING DISCLAIMER BANNER WITH X BUTTON */}
        {/* ========================================================================= */}
        {user?.is_guest && !isGuestDisclaimerDismissed && (
          <div className="w-full bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-indigo-500/15 border-b border-amber-500/30 py-2.5 px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-200 text-xs md:text-sm backdrop-blur-md z-40 shrink-0 animate-fade-in">
            <div className="flex items-center gap-2 font-medium min-w-0">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate sm:whitespace-normal">
                <strong className="text-amber-300 font-bold">Guest Mode Disclaimer:</strong> Content created as a Guest is visible to all users unless deleted.
              </span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  setIsAuthOpen(true);
                }}
                className="px-3.5 py-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-[#070a13] font-black rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-1.5 text-xs hover:scale-[1.02]"
              >
                <User className="w-3.5 h-3.5" />
                <span>Create Login Profile to Keep Private</span>
              </button>
              <button
                onClick={() => {
                  setIsGuestDisclaimerDismissed(true);
                  if (typeof window !== 'undefined') {
                    try {
                      sessionStorage.setItem('promptcanvas_dismiss_guest_disclaimer', 'true');
                    } catch (e) {}
                  }
                }}
                className="p-1 rounded-lg hover:bg-amber-500/20 text-amber-300 hover:text-white transition-colors cursor-pointer"
                title="Dismiss warning"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN SCROLLABLE CONTENT BODY */}
        {/* ========================================================================= */}
        <main className="flex-1 w-full overflow-y-auto relative z-10 custom-scrollbar">

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
                Browse all {TEMPLATE_CATALOG_ITEMS.length} verified publication-grade architecture blueprints categorized across {TEMPLATE_CATEGORIES.length} enterprise domains. Compare decision heuristics, view high-res visual thumbnails, and launch directly into the interactive editor.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-md">
                <div className="text-2xl font-black text-teal-400">{TEMPLATE_CATALOG_ITEMS.length}</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Production Templates</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-md">
                <div className="text-2xl font-black text-indigo-400">{TEMPLATE_CATEGORIES.length}</div>
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
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 py-10 space-y-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 border-dashed space-y-4">
            <Search className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No architecture templates match your search</h3>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              Try adjusting your query or resetting the category filter to view all {TEMPLATE_CATALOG_ITEMS.length} blueprints.
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
        </div>
      </main>
      </div>

      {/* Global Modals */}
      {user && isProfileModalOpen && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          onUpdateUser={(updatedUser) => setUser(updatedUser)}
          onLogout={handleLogout}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(u) => {
            setUser(u);
            setIsAuthOpen(false);
          }}
        />
      )}

      {isUseCaseModalOpen && (
        <UseCaseIntakeModal
          isOpen={isUseCaseModalOpen}
          onClose={() => setIsUseCaseModalOpen(false)}
          onSubmitUseCase={(useCaseData) => {
            setIsUseCaseModalOpen(false);
            if (useCaseData.archType && useCaseData.archType !== 'auto') {
              router.push(`/workspace?blueprint=${useCaseData.archType}`);
            } else {
              router.push(`/workspace?new=true`);
            }
          }}
        />
      )}

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
