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
  Plus,
  X,
  Maximize2
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
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
  const [selectedDomain, setSelectedDomain] = useState<string>('Biopharma');
  const [activePreviewBlueprint, setActivePreviewBlueprint] = useState<CanonicalTemplate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return CANONICAL_TEMPLATES.filter((tmpl) => {
      const matchesFamily = selectedFamily === 'All' || tmpl.family === selectedFamily;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.primaryPurpose.toLowerCase().includes(q) ||
        tmpl.family.toLowerCase().includes(q) ||
        tmpl.examples.toLowerCase().includes(q) ||
        tmpl.id.includes(q);
      return matchesFamily && matchesSearch;
    });
  }, [searchQuery, selectedFamily]);

  const handleCopyXml = (tmpl: CanonicalTemplate) => {
    const xml = tmpl.generateXml(selectedDomain, theme as any);
    navigator.clipboard.writeText(xml);
    setCopiedId(tmpl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadXml = (tmpl: CanonicalTemplate) => {
    const xml = tmpl.generateXml(selectedDomain, theme as any);
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blueprint_${tmpl.id}_${tmpl.name.toLowerCase().replace(/\s+/g, '_')}.drawio.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                Pristine 16:9 Canonical Ground-Truth Architecture Blueprints &amp; Component Tiers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/diagen?new=true"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Launch DiaGen Studio</span>
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
                  placeholder="Search 50 blueprints (e.g. C4, Data Flow, Sequence, IAM, Network, DR)..."
                  className={`w-full text-xs rounded-xl pl-10 pr-4 py-2.5 border outline-none font-medium transition ${
                    isLight
                      ? 'bg-white border-slate-200 focus:border-sky-500 text-slate-900 placeholder-slate-400'
                      : 'bg-[#090D18] border-slate-800 focus:border-sky-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>

              {/* Domain Preset Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap">Domain Flavor:</span>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className={`rounded-xl px-3 py-2 text-xs font-bold border outline-none cursor-pointer ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#090D18] border-slate-800 text-white'
                  }`}
                >
                  {DOMAIN_PRESETS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Family Category Pills */}
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

          {/* Blueprint Cards Grid (Spacious Master Card Format) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className={`border rounded-3xl p-6 flex flex-col justify-between space-y-4 transition-all duration-200 group ${
                  isLight
                    ? 'bg-white hover:bg-slate-50/50 border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-xl hover:shadow-sky-500/10'
                    : 'bg-[#090D18] hover:bg-[#0c1222] border-slate-800 hover:border-sky-500/40 shadow-md hover:shadow-xl hover:shadow-sky-500/10'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Header Strip with Number Circle */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-black text-sm shrink-0 ${
                        isLight
                          ? 'border-sky-200 bg-sky-50 text-sky-700'
                          : 'border-sky-500/30 bg-sky-500/10 text-sky-300'
                      }`}>
                        {tmpl.id}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                          ARCH {tmpl.id} • {tmpl.level}
                        </div>
                        <h3 className={`text-base font-black truncate transition-colors ${
                          isLight ? 'text-slate-900 group-hover:text-sky-700' : 'text-white group-hover:text-sky-300'
                        }`}>
                          {tmpl.name}
                        </h3>
                      </div>
                    </div>

                    <span className={`text-[9.5px] font-mono font-extrabold px-2.5 py-1 rounded-full border uppercase shrink-0 ${
                      isLight
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}>
                      {tmpl.family}
                    </span>
                  </div>

                  {/* Purpose Description */}
                  <p className={`text-xs leading-relaxed line-clamp-3 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {tmpl.primaryPurpose}
                  </p>

                  {/* Target Scope / Examples */}
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <strong className={isLight ? 'text-slate-700' : 'text-slate-300'}>Target Systems:</strong> {tmpl.examples}
                  </div>

                  {/* KEY ARCHITECTURAL TIERS & COMPONENT PODS */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      <span>KEY ARCHITECTURAL TIERS &amp; PODS ({tmpl.keyComponents.length})</span>
                      <span className="text-emerald-500 font-extrabold">100% CERTIFIED</span>
                    </div>

                    <div className="space-y-1.5">
                      {tmpl.keyComponents.slice(0, 4).map((comp, cIdx) => (
                        <div
                          key={cIdx}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold ${
                            isLight
                              ? 'bg-slate-50/80 border-slate-100 text-slate-700'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`w-5 h-5 rounded-md font-mono font-bold text-[10px] flex items-center justify-center shrink-0 ${
                              isLight ? 'bg-sky-100 text-sky-800' : 'bg-sky-500/20 text-sky-300'
                            }`}>
                              0{cIdx + 1}
                            </span>
                            <span className="truncate">{comp}</span>
                          </div>
                          <span className={`text-[9.5px] font-mono shrink-0 px-2 py-0.5 rounded border ${
                            isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}>
                            Tier {cIdx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dual Action Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2.5">
                  <button
                    onClick={() => setActivePreviewBlueprint(tmpl)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-500" />
                    <span>Preview Blueprint</span>
                  </button>

                  <Link
                    href={`/diagen?arch=canonical_${tmpl.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-md shadow-sky-500/20 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate in DiaGen</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE FULL BLUEPRINT VECTOR PREVIEW MODAL */}
        {/* ========================================================================= */}
        {activePreviewBlueprint && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#090D18] border border-slate-800 rounded-3xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-black text-white truncate">
                        {activePreviewBlueprint.name}
                      </h2>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                        #{activePreviewBlueprint.id}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {activePreviewBlueprint.family} ({activePreviewBlueprint.level})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {activePreviewBlueprint.primaryPurpose}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyXml(activePreviewBlueprint)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === activePreviewBlueprint.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copiedId === activePreviewBlueprint.id ? 'Copied Draw.io XML!' : 'Copy XML'}</span>
                  </button>

                  <button
                    onClick={() => handleDownloadXml(activePreviewBlueprint)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Download</span>
                  </button>

                  <Link
                    href={`/diagen?arch=canonical_${activePreviewBlueprint.id}`}
                    className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-sky-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open in DiaGen Studio</span>
                  </Link>

                  <button
                    onClick={() => setActivePreviewBlueprint(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer text-lg font-bold"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Live High-DPI Vector Canvas Preview */}
              <div className="flex-1 overflow-hidden bg-white relative">
                <DiagramViewerRenderSafe
                  xml={activePreviewBlueprint.generateXml(selectedDomain)}
                  theme={theme as any}
                  zoomLevel={100}
                />
              </div>
            </div>
          </div>
        )}
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
