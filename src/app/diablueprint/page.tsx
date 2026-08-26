'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutGrid,
  Sparkles,
  Search,
  Filter,
  Layers,
  ArrowRight,
  Download,
  Copy,
  Check,
  ExternalLink,
  Eye,
  Sliders,
  Shield,
  Zap,
  BookOpen,
  Plus
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
} from '@/lib/canonical/canonicalTemplates';

function DiaBluePrintContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return CANONICAL_TEMPLATES.filter((tmpl) => {
      const matchesFamily = selectedFamily === 'All' || tmpl.family === selectedFamily;
      const matchesSearch =
        searchQuery.trim() === '' ||
        tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.primaryPurpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.id.includes(searchQuery);
      return matchesFamily && matchesSearch;
    });
  }, [searchQuery, selectedFamily]);

  const handleCopyXml = (e: React.MouseEvent, tmpl: CanonicalTemplate) => {
    e.stopPropagation();
    const xml = tmpl.generateXml('NOVACURA', theme as any);
    navigator.clipboard.writeText(xml);
    setCopiedId(tmpl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-screen flex ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060913] text-slate-100'}`}>
      {/* Sidebar */}
      <UnifiedAppSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* Sticky Top Header */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md px-6 md:px-12 py-3.5 flex items-center justify-between transition-colors ${
          isLight ? 'bg-white/90 border-slate-200 shadow-xs' : 'bg-[#070B16]/90 border-slate-800/80 shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 p-0.5 shadow-md flex items-center justify-center">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#090D18]'}`}>
                <LayoutGrid className="w-4 h-4 text-sky-500" />
              </div>
            </div>
            <div>
              <h1 className={`font-black text-sm md:text-base tracking-tight flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span>DiaBluePrint Catalog</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                  {CANONICAL_TEMPLATES.length} MASTER BLUEPRINTS
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Pristine 16:9 Canonical Ground-Truth Architecture Blueprints
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/diagen?new=true"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Launch Studio</span>
            </Link>
            <ThemeToggleBtn />
          </div>
        </header>

        {/* Blueprint Catalog Body */}
        <div className="w-full max-w-8xl mx-auto px-6 md:px-12 py-8 space-y-8">
          {/* Header Description & Search Filter Bar */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blueprints by name, category, or number (#01-#50)..."
                  className={`w-full text-xs rounded-xl pl-10 pr-4 py-2.5 border outline-none font-medium transition ${
                    isLight
                      ? 'bg-white border-slate-200 focus:border-sky-500 text-slate-900 placeholder-slate-400'
                      : 'bg-[#090D18] border-slate-800 focus:border-sky-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>

              {/* Family Filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                {CANONICAL_FAMILIES.map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setSelectedFamily(fam)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      selectedFamily === fam
                        ? 'bg-sky-600 text-white shadow-xs'
                        : isLight
                        ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {fam}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blueprint Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all duration-200 group ${
                  isLight
                    ? 'bg-white hover:bg-sky-50/40 border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-xl hover:shadow-sky-500/10'
                    : 'bg-[#090D18] hover:bg-[#0c1222] border-slate-800 hover:border-sky-500/40 shadow-md hover:shadow-xl hover:shadow-sky-500/10'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                      BLUEPRINT #{tmpl.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {tmpl.level}
                    </span>
                  </div>

                  <h3 className={`text-base font-black group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {tmpl.name}
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-3 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {tmpl.primaryPurpose}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      🏛️ {tmpl.family}
                    </span>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      ⭐ 100% Certified
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/80 gap-2">
                  <Link
                    href={`/diagen?arch=canonical_${tmpl.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Open in DiaGen</span>
                  </Link>

                  <button
                    onClick={(e) => handleCopyXml(e, tmpl)}
                    className="p-2 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition border-slate-200 dark:border-slate-800"
                    title="Copy Raw Draw.io XML"
                  >
                    {copiedId === tmpl.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DiaBluePrintPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060913]" />}>
      <DiaBluePrintContent />
    </Suspense>
  );
}
