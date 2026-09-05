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
  currentBlueprintId?: string;
  currentDomainPresetId?: string;
  theme?: 'light' | 'dark';
}

export function BlueprintCatalogModal({
  isOpen,
  onClose,
  onSelectBlueprint,
  currentBlueprintId,
  currentDomainPresetId = 'biopharma',
  theme = 'light'
}: BlueprintCatalogModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>(currentDomainPresetId);

  const isDark = theme === 'dark';

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return CANONICAL_TEMPLATES.filter((t) => {
      const matchFamily = selectedFamily === 'All' || t.family === selectedFamily;
      const matchLevel = selectedLevel === 'All' || t.level === selectedLevel;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.family.toLowerCase().includes(q) ||
        t.primaryPurpose.toLowerCase().includes(q) ||
        t.keyComponents.some((c) => c.toLowerCase().includes(q));
      return matchFamily && matchLevel && matchQuery;
    });
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
    <div id="blueprint-catalog-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        id="blueprint-catalog-card"
        className={`rounded-3xl border shadow-2xl flex flex-col w-full max-w-6xl max-h-[90vh] overflow-hidden transition-all ${
          isDark
            ? 'bg-[#0B111E] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'border-slate-800/80 bg-slate-900/50' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-bold text-base tracking-tight">Canonical Blueprint Catalog</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                  52 Certified Blueprints
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Production Google Cloud architectures • 9 families • 16-Doc Living Spec synchronized
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Domain Flavor Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Industry:</span>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className={`text-xs font-medium rounded-xl px-2.5 py-1.5 border outline-hidden transition cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500'
                    : 'bg-white border-slate-200 text-slate-700 focus:border-blue-500'
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
              className={`p-2 rounded-xl transition cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar / Search & Filters */}
        <div
          className={`px-6 py-3.5 border-b space-y-3 shrink-0 ${
            isDark ? 'border-slate-800/80 bg-slate-900/30' : 'border-slate-100 bg-white'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 52 blueprints, services, or keywords..."
                className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border outline-hidden transition ${
                  isDark
                    ? 'bg-slate-950/70 border-slate-800 text-slate-200 focus:border-blue-500 placeholder-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-[11px] font-semibold text-slate-400">Level:</span>
              {(['All', 'L1', 'L2', 'L3'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl === 'All' ? 'All Levels' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Family Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CANONICAL_FAMILIES.map((fam) => {
              const count =
                fam === 'All'
                  ? CANONICAL_TEMPLATES.length
                  : CANONICAL_TEMPLATES.filter((t) => t.family === fam).length;
              return (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    selectedFamily === fam
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDark
                      ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
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

        {/* Catalog Grid View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Showing {filteredTemplates.length} of {CANONICAL_TEMPLATES.length} Blueprints
            </span>
            <span className="text-[11px] text-slate-400">
              Active Industry Flavor:{' '}
              <strong className="text-blue-500 font-mono">
                {DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name}
              </strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const isCurrent = currentBlueprintId === template.id;
              const boundDocs = getBoundDocs(template.id);

              return (
                <div
                  key={template.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between group ${
                    isCurrent
                      ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                      : isDark
                      ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Top Row: ID, Level, Family */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20">
                          #{template.id}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                          {template.level}
                        </span>
                        {isCurrent && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-md">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        )}
                      </div>
                      <span className="text-[10.5px] font-medium text-slate-400 font-sans">
                        {template.family}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm leading-snug group-hover:text-blue-600 transition">
                      {template.name}
                    </h3>

                    {/* Purpose Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {template.primaryPurpose}
                    </p>

                    {/* Key Cloud Components */}
                    {template.keyComponents && template.keyComponents.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {template.keyComponents.slice(0, 3).map((comp, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {comp}
                          </span>
                        ))}
                        {template.keyComponents.length > 3 && (
                          <span className="text-[9.5px] font-mono text-slate-400 self-center">
                            +{template.keyComponents.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bound Living Specs */}
                    {boundDocs.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 flex-wrap">
                        <FileText className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="text-[10px] text-slate-400 font-semibold">Living Specs:</span>
                        {boundDocs.map((doc) => (
                          <span
                            key={doc.docId}
                            className="text-[9.5px] font-mono font-bold px-1 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                            title={doc.title}
                          >
                            {doc.docId}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Load Action Button */}
                  <div className="pt-4 mt-2">
                    <button
                      onClick={() => {
                        onSelectBlueprint(template, selectedDomain);
                        onClose();
                      }}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 shadow-2xs'
                      }`}
                    >
                      <span>{isCurrent ? 'Reload Blueprint' : 'Load into Canvas'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between text-xs text-slate-400 shrink-0 ${
            isDark ? 'border-slate-800/80 bg-slate-900/50' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>100% Vector SVG &amp; Offline Compatible • Zero CDN dependencies</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
          >
            Close Catalog
          </button>
        </div>
      </div>
    </div>
  );
}
