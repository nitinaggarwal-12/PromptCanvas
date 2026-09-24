'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Filter,
  FileText,
  Compass,
  Cpu,
  Shield,
  Zap,
  Tag
} from 'lucide-react';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
  ARCHITECTURE_DOCUMENT_BINDINGS
} from '@/lib/canonical/canonicalTemplates';

interface BlueprintCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBlueprint: (blueprint: CanonicalTemplate, domainPresetId: string) => void;
  onOpenInNewTab?: (blueprint: CanonicalTemplate, domainPresetId: string) => void;
  currentBlueprintId?: string;
  currentDomainPresetId?: string;
  theme?: 'light' | 'dark';
}

function getLevelFullLabel(level: string): string {
  if (level === 'L1') return 'L1 Conceptual';
  if (level === 'L2') return 'L2 Logical';
  if (level === 'L3') return 'L3 Physical';
  return level;
}

export function BlueprintCatalogModal({
  isOpen,
  onClose,
  onSelectBlueprint,
  onOpenInNewTab,
  currentBlueprintId,
  currentDomainPresetId = 'biopharma',
  theme = 'light'
}: BlueprintCatalogModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>(currentDomainPresetId);

  const isDark = theme === 'dark';

  const matchesQuery = (t: CanonicalTemplate, qRaw: string) => {
    const q = qRaw.toLowerCase().trim();
    if (!q) return true;
    return (
      t.id.toLowerCase().includes(q) ||
      t.name.toLowerCase().includes(q) ||
      t.family.toLowerCase().includes(q) ||
      t.primaryPurpose.toLowerCase().includes(q) ||
      t.keyComponents.some((c) => c.toLowerCase().includes(q))
    );
  };

  // Dynamic Facet Counts to enforce Zero-Dead-End Rule (hide 0-result facets)
  const familyCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const fam of CANONICAL_FAMILIES) {
      map[fam] = CANONICAL_TEMPLATES.filter((t) => {
        const matchFam = fam === 'All' || t.family === fam;
        const matchLvl = selectedLevel === 'All' || t.level === selectedLevel;
        return matchFam && matchLvl && matchesQuery(t, searchQuery);
      }).length;
    }
    return map;
  }, [selectedLevel, searchQuery]);

  const levelCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const lvl of ['All', 'L1', 'L2', 'L3']) {
      map[lvl] = CANONICAL_TEMPLATES.filter((t) => {
        const matchFam = selectedFamily === 'All' || t.family === selectedFamily;
        const matchLvl = lvl === 'All' || t.level === lvl;
        return matchFam && matchLvl && matchesQuery(t, searchQuery);
      }).length;
    }
    return map;
  }, [selectedFamily, searchQuery]);

  // Filter templates with automatic fallback so 0-result dead-ends never occur on facet combinations
  const filteredTemplates = useMemo(() => {
    const exact = CANONICAL_TEMPLATES.filter((t) => {
      const matchFamily = selectedFamily === 'All' || t.family === selectedFamily;
      const matchLevel = selectedLevel === 'All' || t.level === selectedLevel;
      return matchFamily && matchLevel && matchesQuery(t, searchQuery);
    });
    if (exact.length > 0) return exact;
    // Zero-Dead-End auto-recovery if a combination yields 0
    return CANONICAL_TEMPLATES.filter((t) => matchesQuery(t, searchQuery));
  }, [searchQuery, selectedFamily, selectedLevel]);

  // Map each template to bound Living Spec docs
  const getBoundDocs = (templateId: string) => {
    const norm = templateId.padStart(2, '0');
    return ARCHITECTURE_DOCUMENT_BINDINGS.filter((b) =>
      b.requiredDiagramViews.some((v) => v.startsWith(norm))
    );
  };

  if (!isOpen) return null;

  return (
    <div
      id="blueprint-catalog-modal"
      data-testid="blueprint-catalog-drawer"
      className="fixed inset-0 z-[120] flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="blueprint-catalog-card"
        className={`h-full w-full max-w-5xl border-l shadow-2xl flex flex-col overflow-hidden transition-all ${
          isDark
            ? 'bg-[#0B111E] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Slide-Over Drawer Header */}
        <div
          className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 shrink-0 ${
            isDark ? 'border-slate-800/80 bg-slate-900/50' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-bold text-base tracking-tight">Visual Blueprint Catalog Drawer</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                  {CANONICAL_TEMPLATES.length} Certified Blueprints
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Zero-Dead-End Industry &amp; Level Filtering • 1-Click Switch or Open in New Tab
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Industry Single-Tier Selector */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Industry:</span>
              <select
                aria-label="Select Industry Vertical"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className={`text-xs font-bold outline-hidden transition cursor-pointer ${
                  isDark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'
                }`}
              >
                {DOMAIN_PRESETS.map((dp) => (
                  <option key={dp.id} value={dp.id}>
                    {dp.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Blueprint Catalog Drawer"
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isDark
                  ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar / Search & Dynamic Facet Hiding Filters */}
        <div
          className={`px-6 py-3.5 border-b space-y-3 shrink-0 ${
            isDark ? 'border-slate-800/80 bg-slate-900/30' : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${CANONICAL_TEMPLATES.length} Certified Blueprints...`}
                className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border outline-hidden transition ${
                  isDark
                    ? 'bg-slate-950/70 border-slate-800 text-slate-200 focus:border-blue-500 placeholder-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Level Filter with Dynamic Facet Hiding (0-result levels hidden) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Level:</span>
              {(['All', 'L1', 'L2', 'L3'] as const)
                .filter((lvl) => lvl === 'All' || (levelCounts[lvl] ?? 0) > 0)
                .map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                      selectedLevel === lvl
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{lvl === 'All' ? 'All Levels' : getLevelFullLabel(lvl)}</span>
                    <span className="text-[10px] opacity-80 font-mono">({levelCounts[lvl] ?? 0})</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Family Category Pills — Flex-Wrap + Dynamic Facet Hiding (Zero Clipping & Zero Dead-Ends) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CANONICAL_FAMILIES.filter((fam) => fam === 'All' || (familyCounts[fam] ?? 0) > 0).map((fam) => {
              const count = familyCounts[fam] ?? 0;
              return (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    selectedFamily === fam
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDark
                      ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  <span>{fam}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      selectedFamily === fam
                        ? 'bg-blue-700 text-blue-100'
                        : isDark
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog 3-Column Visual Grid View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Showing {filteredTemplates.length} of {CANONICAL_TEMPLATES.length} Certified Blueprints
            </span>
            <span className="text-xs text-slate-500">
              Industry Flavor:{' '}
              <strong className="text-blue-600 font-mono">
                {DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name}
              </strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTemplates.map((template) => {
              const isCurrent = currentBlueprintId === template.id;
              const boundDocs = getBoundDocs(template.id);
              const levelBadgeLabel = getLevelFullLabel(template.level);

              return (
                <div
                  key={template.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between group bg-white ${
                    isCurrent
                      ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                      : 'border-slate-200 hover:border-blue-400 hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: ID, Explicit Level Badge (L1 Conceptual / L2 Logical / L3 Physical), Family */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                          #{template.id}
                        </span>
                        <span
                          className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md font-mono border ${
                            template.level === 'L1'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : template.level === 'L2'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {levelBadgeLabel}
                        </span>
                      </div>
                      <span className="text-[10.5px] font-semibold text-slate-400 truncate max-w-[120px]">
                        {template.family}
                      </span>
                    </div>

                    {/* High-Res Schematic Preview Thumbnail */}
                    <div
                      onClick={() => {
                        onSelectBlueprint(template, selectedDomain);
                        onClose();
                      }}
                      className="w-full h-24 rounded-xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 border border-slate-200/80 p-2.5 flex flex-col justify-between cursor-pointer group-hover:border-blue-300 transition overflow-hidden relative"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        {(template.keyComponents || ['Ingress', 'Compute', 'Data']).slice(0, 3).map((node, idx) => (
                          <div
                            key={idx}
                            className="flex-1 bg-white border border-blue-200 rounded-md px-1.5 py-1 shadow-2xs flex items-center gap-1 min-w-0"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-indigo-600' : 'bg-emerald-600'
                              }`}
                            />
                            <span className="text-[9px] font-mono font-bold text-slate-700 truncate">{node}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <div className="h-0.5 flex-1 bg-blue-300" />
                        <span className="text-[8px] font-mono font-bold text-blue-700 bg-white px-1.5 rounded border border-blue-200 mx-1">
                          mTLS / Draw.io XML
                        </span>
                        <div className="h-0.5 flex-1 bg-emerald-300" />
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                        <span>16:9 Vector Graph</span>
                        <span className="text-blue-600 font-bold group-hover:underline">Preview &amp; Load →</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-blue-600 transition">
                      {template.name}
                    </h3>

                    {/* Purpose Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {template.primaryPurpose}
                    </p>

                    {/* Bound Living Specs */}
                    {boundDocs.length > 0 && (
                      <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                        <FileText className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="text-[10px] text-slate-400 font-semibold">Specs:</span>
                        {boundDocs.map((doc) => (
                          <span
                            key={doc.docId}
                            className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200"
                            title={doc.title}
                          >
                            {doc.docId}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: Load in Current Canvas OR + New Tab */}
                  <div className="pt-3 mt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectBlueprint(template, selectedDomain);
                        onClose();
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      }`}
                    >
                      <span>{isCurrent ? 'Reload Canvas' : 'Load in Canvas'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {onOpenInNewTab && (
                      <button
                        onClick={() => {
                          onOpenInNewTab(template, selectedDomain);
                          onClose();
                        }}
                        className="py-2 px-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer whitespace-nowrap"
                        title="Open this blueprint in a new Studio tab"
                      >
                        + New Tab
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between text-xs text-slate-500 shrink-0 ${
            isDark ? 'border-slate-800/80 bg-slate-900/50' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>100% Native Draw.io mxGraph XML • Zero Dead-End Catalog</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-300 font-semibold hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
