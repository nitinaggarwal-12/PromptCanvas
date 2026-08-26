'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Sparkles,
  Search,
  Filter,
  FileText,
  ArrowRight,
  Download,
  Copy,
  Check,
  Eye,
  Shield,
  Zap,
  LayoutGrid,
  Plus
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { DOC_ARCHETYPES_META, DocArchetypeMeta } from '@/lib/compose/archetypes';

function DocBluePrintContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All 17 Specifications' },
    { id: 'Executive', name: 'Executive & Business' },
    { id: 'Architecture', name: 'Core Architecture' },
    { id: 'Engineering', name: 'Engineering & Design' },
    { id: 'Security', name: 'Security & Governance' },
    { id: 'AI', name: 'AI & Safety' },
    { id: 'Operations', name: 'Operations & SRE' },
  ];

  const archetypesList = useMemo(() => {
    return Object.values(DOC_ARCHETYPES_META);
  }, []);

  const filteredArchetypes = useMemo(() => {
    return archetypesList.filter((arch) => {
      let matchesCategory = true;
      if (selectedCategory === 'Executive') {
        matchesCategory = arch.badge.includes('Business') || arch.badge.includes('C-Suite') || arch.badge.includes('Procurement') || arch.badge.includes('FinOps');
      } else if (selectedCategory === 'Architecture') {
        matchesCategory = arch.badge.includes('Architecture') || arch.badge.includes('Product') || arch.badge.includes('Modernization') || arch.badge.includes('Technical Defense');
      } else if (selectedCategory === 'Engineering') {
        matchesCategory = arch.badge.includes('Engineering') || arch.badge.includes('API') || arch.badge.includes('Design');
      } else if (selectedCategory === 'Security') {
        matchesCategory = arch.badge.includes('Security') || arch.badge.includes('Governance') || arch.badge.includes('Cybersecurity');
      } else if (selectedCategory === 'AI') {
        matchesCategory = arch.badge.includes('AI') || arch.name.includes('AI') || arch.name.includes('LLM');
      } else if (selectedCategory === 'Operations') {
        matchesCategory = arch.badge.includes('Operations') || arch.badge.includes('Resilience') || arch.badge.includes('Go-Live');
      }

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        arch.name.toLowerCase().includes(q) ||
        arch.shortName.toLowerCase().includes(q) ||
        arch.primaryPurpose.toLowerCase().includes(q) ||
        arch.badge.toLowerCase().includes(q) ||
        arch.audience.toLowerCase().includes(q) ||
        arch.id.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [archetypesList, searchQuery, selectedCategory]);

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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-md flex items-center justify-center">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#090D18]'}`}>
                <BookOpen className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
            <div>
              <h1 className={`font-black text-sm md:text-base tracking-tight flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span>DocBluePrint Archetypes</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  17 SPECIFICATIONS
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Comprehensive Engineering Specification Archetypes &amp; Master Documents
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/docgen"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Launch DocGen</span>
            </Link>
            <ThemeToggleBtn />
          </div>
        </header>

        {/* Catalog Body */}
        <div className="w-full max-w-8xl mx-auto px-6 md:px-12 py-8 space-y-8">
          {/* Header Search & Category Filter */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search archetypes (e.g. BRD, PRD, SDD, Threat Model, Runbook)..."
                  className={`w-full text-xs rounded-xl pl-10 pr-4 py-2.5 border outline-none font-medium transition ${
                    isLight
                      ? 'bg-white border-slate-200 focus:border-emerald-500 text-slate-900 placeholder-slate-400'
                      : 'bg-[#090D18] border-slate-800 focus:border-emerald-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isLight
                        ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Archetypes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArchetypes.map((arch) => (
              <div
                key={arch.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all duration-200 group ${
                  isLight
                    ? 'bg-white hover:bg-emerald-50/40 border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10'
                    : 'bg-[#090D18] hover:bg-[#0c1222] border-slate-800 hover:border-emerald-500/40 shadow-md hover:shadow-xl hover:shadow-emerald-500/10'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 uppercase">
                        {arch.shortName}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-gradient-to-r ${arch.badgeColor}`}>
                        {arch.badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {arch.sectionsCount || 8} Chapters
                    </span>
                  </div>

                  <h3 className={`text-base font-black group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {arch.name}
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-3 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {arch.primaryPurpose}
                  </p>

                  <div className="pt-2">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1.5 flex items-center justify-between">
                      <span>Attached Blueprints ({arch.blueprintPack.length})</span>
                    </div>
                    <div className="space-y-1">
                      {arch.blueprintPack.slice(0, 3).map((bp, bpIdx) => (
                        <div key={bpIdx} className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                          <span className="text-emerald-500 font-bold font-mono">#{bp.recommendedTemplateId}</span>
                          <span className="truncate">{bp.slotTitle}</span>
                        </div>
                      ))}
                      {arch.blueprintPack.length > 3 && (
                        <div className="text-[10px] text-slate-400 italic">
                          + {arch.blueprintPack.length - 3} more blueprint slots
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      📊 16:9 Slides Included
                    </span>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      💻 Terraform IaC Ready
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <Link
                    href={`/docgen?archetype=${arch.id}`}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate in DocGen</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DocBluePrintPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060913]" />}>
      <DocBluePrintContent />
    </Suspense>
  );
}
