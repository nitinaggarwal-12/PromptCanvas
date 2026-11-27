'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  RotateCcw,
  Lock,
  CheckCircle2,
  Loader2,
  Layers,
  Eye,
  Code,
  ExternalLink,
  Share2,
  Check,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/lib/themeContext';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CERTIFIED_ARCHITECTURE_TEMPLATES,
  ARCHITECTURE_TEMPLATE_TIERS,
  ARCHITECTURE_TEMPLATE_LEVELS,
  ARCHITECTURE_TEMPLATE_TYPES,
  ARCHITECTURE_TEMPLATE_KINDS,
  ARCHITECTURE_TEMPLATE_USE_CASES,
  ARCHITECTURE_TEMPLATE_COLLECTIONS,
  ARCHITECTURE_TEMPLATE_LAYOUT_ARCHETYPES,
  CertifiedArchitectureTemplate,
  ArchitectureTemplateTier,
  ArchitectureTemplateLevel,
  ArchitectureTemplateType,
  ArchitectureTemplateKind,
  ArchitectureTemplateUseCase,
  ArchitectureTemplateCollection,
  ArchitectureTemplateLayoutArchetype,
  TemplateFilterSelection,
  filterCertifiedArchitectureTemplates,
  computeDynamicFacetCounts,
  fetchImmutableTemplateXml,
  cloneArchitectureTemplateInstance,
} from '@/lib/templates/certifiedArchitectureTemplates';

export interface ArchitectureTemplateCloneResult {
  instanceId: string;
  xml: string;
  template: CertifiedArchitectureTemplate;
}

interface ArchitectureTemplateBrowserProps {
  mode?: 'page' | 'picker';
  initialLevel?: 'All' | ArchitectureTemplateLevel;
  initialType?: 'All' | ArchitectureTemplateType;
  initialKind?: 'All' | ArchitectureTemplateKind;
  initialUseCase?: 'All' | ArchitectureTemplateUseCase;
  initialExpandedTemplateId?: string | null;
  onLockedInClone?: (result: ArchitectureTemplateCloneResult) => void;
}

const LEVEL_BADGE_STYLES: Record<ArchitectureTemplateLevel, string> = {
  L200: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30',
  L300: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30',
  L400: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30',
};

const TYPE_BADGE_STYLES: Record<ArchitectureTemplateType, string> = {
  Conceptual:
    'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
  Logical:
    'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30',
  Technical:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30',
  Process:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
};

export function ArchitectureTemplateBrowser({
  mode = 'page',
  initialLevel = 'All',
  initialType = 'All',
  initialKind = 'All',
  initialUseCase = 'All',
  initialExpandedTemplateId = null,
  onLockedInClone,
}: ArchitectureTemplateBrowserProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [selectedTier, setSelectedTier] = useState<'All' | ArchitectureTemplateTier>('All');
  const [selectedLevel, setSelectedLevel] = useState<'All' | ArchitectureTemplateLevel>(initialLevel);
  const [selectedType, setSelectedType] = useState<'All' | ArchitectureTemplateType>(initialType);
  const [selectedKind, setSelectedKind] = useState<'All' | ArchitectureTemplateKind>(initialKind);
  const [selectedUseCase, setSelectedUseCase] = useState<'All' | ArchitectureTemplateUseCase>(initialUseCase);
  const [selectedCollection, setSelectedCollection] = useState<'All' | ArchitectureTemplateCollection>('All');
  const [selectedLayoutArchetype, setSelectedLayoutArchetype] = useState<'All' | ArchitectureTemplateLayoutArchetype>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(initialExpandedTemplateId);
  const [expandedViewMode, setExpandedViewMode] = useState<'png' | 'vector'>('png');
  const [expandedVectorXml, setExpandedVectorXml] = useState<string>('');
  const [isLoadingVector, setIsLoadingVector] = useState<boolean>(false);
  const [cloningTemplateId, setCloningTemplateId] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  // Sync Expanded Template ID (?id=<id>) into browser URL on /templates page
  useEffect(() => {
    if (mode !== 'page' || typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      if (expandedTemplateId) {
        if (url.searchParams.get('id') !== expandedTemplateId) {
          url.searchParams.set('id', expandedTemplateId);
          url.searchParams.delete('template');
          window.history.replaceState(null, '', url.toString());
        }
      } else if (url.searchParams.has('id') || url.searchParams.has('template')) {
        url.searchParams.delete('id');
        url.searchParams.delete('template');
        window.history.replaceState(null, '', url.toString());
      }
    } catch {}
  }, [expandedTemplateId, mode]);

  useEffect(() => {
    if (mode !== 'page' || typeof window === 'undefined') return;
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setExpandedTemplateId(params.get('id') || params.get('template') || null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [mode]);

  const triggerAssetDownload = (href: string, filename: string) => {
    if (typeof document === 'undefined') return;
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyTemplateShareLink = (tplId: string) => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/templates?id=${encodeURIComponent(tplId)}`;
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopiedShareId(tplId);
    setTimeout(() => setCopiedShareId((prev) => (prev === tplId ? null : prev)), 2200);
  };

  const filterState: TemplateFilterSelection = useMemo(
    () => ({
      tier: selectedTier,
      level: selectedLevel,
      type: selectedType,
      kind: selectedKind,
      useCase: selectedUseCase,
      collection: selectedCollection,
      layoutArchetype: selectedLayoutArchetype,
      search: searchQuery,
    }),
    [selectedTier, selectedLevel, selectedType, selectedKind, selectedUseCase, selectedCollection, selectedLayoutArchetype, searchQuery]
  );

  const filteredTemplates = useMemo(
    () => filterCertifiedArchitectureTemplates(filterState),
    [filterState]
  );

  const dynamicCounts = useMemo(
    () => computeDynamicFacetCounts(filterState),
    [filterState]
  );

  const hasActiveFilters =
    selectedTier !== 'All' ||
    selectedLevel !== 'All' ||
    selectedType !== 'All' ||
    selectedKind !== 'All' ||
    selectedUseCase !== 'All' ||
    selectedCollection !== 'All' ||
    selectedLayoutArchetype !== 'All' ||
    Boolean(searchQuery.trim());

  const handleResetFilters = () => {
    setSelectedTier('All');
    setSelectedLevel('All');
    setSelectedType('All');
    setSelectedKind('All');
    setSelectedUseCase('All');
    setSelectedCollection('All');
    setSelectedLayoutArchetype('All');
    setSearchQuery('');
  };

  // Expanded Mode navigation across the active filtered template list (fallback to full certified list if filtered out)
  const navigationPool = useMemo(() => {
    if (!expandedTemplateId) return filteredTemplates;
    const inFiltered = filteredTemplates.some((t) => t.id === expandedTemplateId);
    return inFiltered ? filteredTemplates : CERTIFIED_ARCHITECTURE_TEMPLATES;
  }, [expandedTemplateId, filteredTemplates]);

  const expandedIndex = useMemo(() => {
    if (!expandedTemplateId) return -1;
    return navigationPool.findIndex((t) => t.id === expandedTemplateId);
  }, [expandedTemplateId, navigationPool]);

  const expandedTemplate = useMemo(() => {
    if (expandedIndex < 0) return null;
    return navigationPool[expandedIndex] || null;
  }, [expandedIndex, navigationPool]);

  const handleStepExpanded = useCallback(
    (delta: -1 | 1) => {
      if (navigationPool.length === 0 || expandedIndex < 0) return;
      const nextIdx = (expandedIndex + delta + navigationPool.length) % navigationPool.length;
      const nextTpl = navigationPool[nextIdx];
      if (nextTpl) {
        setExpandedTemplateId(nextTpl.id);
      }
    },
    [navigationPool, expandedIndex]
  );

  // Load vector XML only when user toggles interactive vector inspection in Expanded Mode
  useEffect(() => {
    if (!expandedTemplate || expandedViewMode !== 'vector') {
      setExpandedVectorXml('');
      return;
    }
    let cancelled = false;
    setIsLoadingVector(true);
    fetchImmutableTemplateXml(expandedTemplate)
      .then((xml) => {
        if (!cancelled) setExpandedVectorXml(xml);
      })
      .catch(() => {
        if (!cancelled) setExpandedViewMode('png');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingVector(false);
      });
    return () => {
      cancelled = true;
    };
  }, [expandedTemplate, expandedViewMode]);

  // Keyboard support in Expanded Mode: ArrowLeft (Back), ArrowRight (Forward), Escape (Close)
  useEffect(() => {
    if (!expandedTemplate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === 'Escape') {
        setExpandedTemplateId(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleStepExpanded(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleStepExpanded(1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expandedTemplate, handleStepExpanded]);

  const handleLockInAndClone = async (tpl: CertifiedArchitectureTemplate) => {
    if (cloningTemplateId) return;
    setErrorBanner(null);
    setCloningTemplateId(tpl.id);
    try {
      const cloned = await cloneArchitectureTemplateInstance(tpl, 'dashboard');
      setExpandedTemplateId(null);
      if (onLockedInClone) {
        onLockedInClone(cloned);
        return;
      }
      window.location.assign(
        `/dashboard?id=${encodeURIComponent(cloned.instanceId)}&template=${encodeURIComponent(tpl.id)}`
      );
    } catch (err) {
      setErrorBanner(
        err instanceof Error ? err.message : 'Could not clone template into a new diagram instance.'
      );
    } finally {
      setCloningTemplateId(null);
    }
  };

  const selectClass = `w-full rounded-xl border px-3 py-2 text-xs font-semibold outline-none transition cursor-pointer focus:ring-2 focus:ring-blue-500/30 ${
    isLight
      ? 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
      : 'bg-slate-900 border-slate-700 text-slate-100 hover:border-slate-600'
  }`;

  return (
    <div className="space-y-4">
      {/* DYNAMIC 4-DROPDOWN FILTER BAR + SEARCH */}
      <section
        aria-label="Dynamic Architecture Template Filters"
        data-testid="templates-dynamic-filter-bar"
        className={`rounded-2xl border p-4 shadow-xs space-y-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold border ${
                isLight
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>
                Showing {filteredTemplates.length} of {CERTIFIED_ARCHITECTURE_TEMPLATES.length} Architecture Templates
              </span>
            </span>
            <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Original templates are read-only; locking in any option clones a new unique Diagram ID.
            </span>
          </div>

          <div className="flex items-center gap-2">
            {mode === 'page' && (
              <Link
                href="/infographics"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                  isLight
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
                }`}
              >
                <span>Executive Infographics (Separate Page)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
            {hasActiveFilters && (
              <button
                type="button"
                data-testid="templates-reset-filters-btn"
                onClick={handleResetFilters}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Top Tier 1 vs. Tier 2 Segmented Filter Bar */}
        <div
          data-testid="templates-tier-pills"
          className="flex flex-wrap items-center gap-1.5 pt-0.5"
        >
          <span
            className={`text-[11px] font-extrabold uppercase tracking-wider mr-1 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Catalog Tier:
          </span>
          <button
            type="button"
            data-testid="tpl-tier-pill-all"
            onClick={() => setSelectedTier('All')}
            className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
              selectedTier === 'All'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs dark:bg-blue-600 dark:border-blue-600'
                : isLight
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            All Tiers ({dynamicCounts.tiers?.All ?? CERTIFIED_ARCHITECTURE_TEMPLATES.length})
          </button>
          {ARCHITECTURE_TEMPLATE_TIERS.map((tr) => {
            const cnt = dynamicCounts.tiers?.[tr] ?? 0;
            const isActive = selectedTier === tr;
            const isTier1 = tr.startsWith('Tier 1');
            return (
              <button
                key={tr}
                type="button"
                data-testid={`tpl-tier-pill-${isTier1 ? 'tier1' : 'tier2'}`}
                disabled={cnt === 0 && !isActive}
                onClick={() => setSelectedTier(isActive ? 'All' : tr)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition cursor-pointer disabled:opacity-40 ${
                  isActive
                    ? isTier1
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : isLight
                      ? isTier1
                        ? 'bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-amber-50/70 hover:bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                {isTier1 ? `⭐ ${tr}` : `🗂️ ${tr} (Restyled)`} ({cnt})
              </button>
            );
          })}
        </div>

        {/* Top Quick-Filter Collection / Design Paradigm Segmented Bar */}
        <div
          data-testid="templates-collection-pills"
          className="flex flex-wrap items-center gap-1.5 pt-0.5"
        >
          <span
            className={`text-[11px] font-extrabold uppercase tracking-wider mr-1 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Design Paradigm / Collection:
          </span>
          <button
            type="button"
            data-testid="tpl-collection-pill-all"
            onClick={() => setSelectedCollection('All')}
            className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
              selectedCollection === 'All'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : isLight
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            All Collections ({dynamicCounts.collections?.All ?? CERTIFIED_ARCHITECTURE_TEMPLATES.length})
          </button>
          {ARCHITECTURE_TEMPLATE_COLLECTIONS.map((col) => {
            const cnt = dynamicCounts.collections?.[col] ?? 0;
            const isActive = selectedCollection === col;
            return (
              <button
                key={col}
                type="button"
                data-testid={`tpl-collection-pill-${col}`}
                disabled={cnt === 0 && !isActive}
                onClick={() => setSelectedCollection(isActive ? 'All' : col)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition cursor-pointer disabled:opacity-40 ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : isLight
                      ? 'bg-white hover:bg-indigo-50 text-slate-800 border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                {col} ({cnt})
              </button>
            );
          })}
        </div>

        {/* 5 Dynamic Cascading Dropdowns: Levels, Type, Kind, Usecase, Style & Layout + Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* 1. LEVEL DROPDOWN (L200, L300, L400 — 0 L100) */}
          <div>
            <label
              htmlFor="tpl-filter-level"
              className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
            >
              1. Level
            </label>
            <select
              id="tpl-filter-level"
              data-testid="tpl-filter-level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as 'All' | ArchitectureTemplateLevel)}
              className={selectClass}
            >
              <option value="All">All Levels ({dynamicCounts.levels.All ?? 0})</option>
              {ARCHITECTURE_TEMPLATE_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl} disabled={(dynamicCounts.levels[lvl] ?? 0) === 0}>
                  {lvl} ({dynamicCounts.levels[lvl] ?? 0})
                </option>
              ))}
            </select>
          </div>

          {/* 2. TYPE DROPDOWN */}
          <div>
            <label
              htmlFor="tpl-filter-type"
              className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
            >
              2. Type
            </label>
            <select
              id="tpl-filter-type"
              data-testid="tpl-filter-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'All' | ArchitectureTemplateType)}
              className={selectClass}
            >
              <option value="All">All Types ({dynamicCounts.types.All ?? 0})</option>
              {ARCHITECTURE_TEMPLATE_TYPES.map((tp) => (
                <option key={tp} value={tp} disabled={(dynamicCounts.types[tp] ?? 0) === 0}>
                  {tp} ({dynamicCounts.types[tp] ?? 0})
                </option>
              ))}
            </select>
          </div>

          {/* 3. VISUAL DIAGRAM KIND DROPDOWN (Flowchart, Topology, Sequence, BPMN, ERD...) */}
          <div>
            <label
              htmlFor="tpl-filter-kind"
              className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
            >
              3. Kind (Notation)
            </label>
            <select
              id="tpl-filter-kind"
              data-testid="tpl-filter-kind"
              value={selectedKind}
              onChange={(e) => setSelectedKind(e.target.value as 'All' | ArchitectureTemplateKind)}
              className={selectClass}
            >
              <option value="All">All Diagram Kinds ({dynamicCounts.kinds.All ?? 0})</option>
              {ARCHITECTURE_TEMPLATE_KINDS.map((kd) => (
                <option key={kd} value={kd} disabled={(dynamicCounts.kinds[kd] ?? 0) === 0}>
                  {kd} ({dynamicCounts.kinds[kd] ?? 0})
                </option>
              ))}
            </select>
          </div>

          {/* 4. USECASE DROPDOWN */}
          <div>
            <label
              htmlFor="tpl-filter-usecase"
              className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
            >
              4. Use Case
            </label>
            <select
              id="tpl-filter-usecase"
              data-testid="tpl-filter-usecase"
              value={selectedUseCase}
              onChange={(e) => setSelectedUseCase(e.target.value as 'All' | ArchitectureTemplateUseCase)}
              className={selectClass}
            >
              <option value="All">All Use Cases ({dynamicCounts.useCases.All ?? 0})</option>
              {ARCHITECTURE_TEMPLATE_USE_CASES.map((uc) => (
                <option key={uc} value={uc} disabled={(dynamicCounts.useCases[uc] ?? 0) === 0}>
                  {uc} ({dynamicCounts.useCases[uc] ?? 0})
                </option>
              ))}
            </select>
          </div>

          {/* 5. STYLE & LAYOUT ARCHETYPE DROPDOWN */}
          <div>
            <label
              htmlFor="tpl-filter-layout-archetype"
              className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
            >
              5. Style &amp; Layout
            </label>
            <select
              id="tpl-filter-layout-archetype"
              data-testid="tpl-filter-layout-archetype"
              value={selectedLayoutArchetype}
              onChange={(e) =>
                setSelectedLayoutArchetype(e.target.value as 'All' | ArchitectureTemplateLayoutArchetype)
              }
              className={selectClass}
            >
              <option value="All">
                All Styles &amp; Layouts ({dynamicCounts.layoutArchetypes?.All ?? 0})
              </option>
              {ARCHITECTURE_TEMPLATE_LAYOUT_ARCHETYPES.map((la) => (
                <option
                  key={la}
                  value={la}
                  disabled={(dynamicCounts.layoutArchetypes?.[la] ?? 0) === 0}
                >
                  {la} ({dynamicCounts.layoutArchetypes?.[la] ?? 0})
                </option>
              ))}
            </select>
          </div>

          {/* 6. KEYWORD SEARCH */}
          <div>
            <label
              htmlFor="tpl-filter-search"
              className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
            >
              6. Search Keyword
            </label>
            <div className="relative">
              <Search
                className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isLight ? 'text-slate-400' : 'text-slate-500'
                }`}
              />
              <input
                id="tpl-filter-search"
                data-testid="tpl-filter-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SN-01..76, #118..157, T-NET-01-CALM, ARCH-01..25, SIL-01, RAG..."
                className={`w-full rounded-xl border pl-8 pr-3 py-2 text-xs font-medium outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    : 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {errorBanner && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-800 dark:border-red-500/40 dark:bg-red-500/15 dark:text-red-200"
        >
          {errorBanner}
        </div>
      )}

      {/* TEMPLATE CARDS GRID */}
      {filteredTemplates.length === 0 ? (
        <div
          className={`rounded-2xl border p-10 text-center space-y-3 ${
            isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'
          }`}
        >
          <p className="text-sm font-bold">No templates match this exact combination of filters.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Show All {CERTIFIED_ARCHITECTURE_TEMPLATES.length} Templates</span>
          </button>
        </div>
      ) : (
        <div
          data-testid="templates-cards-grid"
          className={
            mode === 'picker'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
              : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
          }
        >
          {filteredTemplates.map((tpl) => {
            const isCloning = cloningTemplateId === tpl.id;
            return (
              <article
                key={tpl.id}
                data-testid={`template-card-${tpl.id}`}
                className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
                  isLight
                    ? 'bg-white border-slate-200 hover:border-blue-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50'
                }`}
              >
                <div>
                  {/* 16:9 Crisp Retina Thumbnail + Expand Trigger */}
                  <div
                    onClick={() => {
                      setExpandedViewMode('png');
                      setExpandedTemplateId(tpl.id);
                    }}
                    className={`relative aspect-video w-full overflow-hidden border-b cursor-pointer ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-800'
                    }`}
                  >
                    <img
                      src={tpl.thumbnailImage || tpl.previewImage}
                      alt={tpl.headerTag}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.015]"
                    />
                    <button
                      type="button"
                      data-testid={`template-expand-btn-${tpl.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedViewMode('png');
                        setExpandedTemplateId(tpl.id);
                      }}
                      className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold shadow-md backdrop-blur-xs cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Expand</span>
                    </button>
                    <span
                      data-testid={`tag-serial-id-${tpl.id}`}
                      className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900/85 text-white font-mono text-xs font-bold shadow-sm backdrop-blur-xs"
                    >
                      <span className="text-amber-300">{tpl.serialTag}</span>
                      <span className="text-slate-400">·</span>
                      <span>ID #{tpl.id}</span>
                      {tpl.suiteSerial && (
                        <>
                          <span className="text-slate-400">·</span>
                          <span className="text-sky-300">{tpl.suiteSerial}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Card Body + All 4 Mandatory Tags (Levels, Type, Kind, Usecase) */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        data-testid={`tag-tier-${tpl.id}`}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold border ${
                          tpl.tier.startsWith('Tier 1')
                            ? isLight
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : isLight
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {tpl.tier.startsWith('Tier 1') ? '⭐ Tier 1' : '🗂️ Tier 2 Alt'}
                      </span>
                      <span
                        data-testid={`tag-canonical-${tpl.id}`}
                        className={`px-2 py-0.5 rounded-md font-mono text-xs font-extrabold border ${
                          isLight
                            ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                            : "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                        }`}
                      >
                        {tpl.canonicalTag}
                      </span>
                      <span
                        data-testid={`tag-level-${tpl.id}`}
                        className={`px-2 py-0.5 rounded-md text-xs font-extrabold border ${LEVEL_BADGE_STYLES[tpl.level]}`}
                      >
                        {tpl.level}
                      </span>
                      <span
                        data-testid={`tag-type-${tpl.id}`}
                        className={`px-2 py-0.5 rounded-md text-xs font-extrabold border ${TYPE_BADGE_STYLES[tpl.type]}`}
                      >
                        {tpl.type}
                      </span>
                      <span
                        data-testid={`tag-kind-${tpl.id}`}
                        className={`px-2 py-0.5 rounded-md text-xs font-bold border ${
                          isLight
                            ? 'bg-slate-100 text-slate-700 border-slate-300'
                            : 'bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        {tpl.kind}
                      </span>
                    </div>

                    {(tpl.silhouetteTag || tpl.categoryTag || tpl.publicationStatus) && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {tpl.silhouetteTag && (
                          <span
                            data-testid={`tag-silhouette-${tpl.id}`}
                            className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border ${
                              isLight
                                ? "bg-amber-50 text-amber-900 border-amber-300"
                                : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                            }`}
                          >
                            {tpl.silhouetteTag}
                          </span>
                        )}
                        {tpl.categoryTag && (
                          <span
                            data-testid={`tag-category-${tpl.id}`}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                              isLight
                                ? "bg-sky-50 text-sky-800 border-sky-200"
                                : "bg-sky-500/15 text-sky-300 border-sky-500/30"
                            }`}
                          >
                            {tpl.categoryTag}
                          </span>
                        )}
                        {tpl.publicationStatus && (
                          <span
                            data-testid={`tag-pub-${tpl.id}`}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                              isLight
                                ? "bg-teal-50 text-teal-800 border-teal-200"
                                : "bg-teal-500/15 text-teal-300 border-teal-500/30"
                            }`}
                          >
                            {tpl.publicationStatus}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        data-testid={`tag-collection-${tpl.id}`}
                        className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-extrabold border ${
                          tpl.collection.includes("Calm Planar")
                            ? isLight
                              ? "bg-violet-50 text-violet-900 border-violet-300"
                              : "bg-violet-500/15 text-violet-300 border-violet-500/30"
                            : tpl.collection.includes("Executive Visual")
                              ? isLight
                                ? "bg-blue-50 text-blue-900 border-blue-300"
                                : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                              : isLight
                                ? "bg-slate-100 text-slate-800 border-slate-300"
                                : "bg-slate-800 text-slate-200 border-slate-700"
                        }`}
                      >
                        {tpl.collection}
                      </span>
                      <span
                        data-testid={`tag-usecase-${tpl.id}`}
                        className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold border ${
                          isLight
                            ? 'bg-emerald-50/70 text-emerald-800 border-emerald-200'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        Use Case: {tpl.useCase}
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-extrabold leading-snug ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {tpl.title}
                    </h3>
                    <p
                      className={`text-xs font-mono truncate ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}
                      title={tpl.headerTag}
                    >
                      {tpl.headerTag}
                    </p>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      {tpl.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div
                  className={`px-4 py-3 border-t space-y-2 ${
                    isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/50 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className={`text-[10px] font-mono font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      1-Click Assets:
                    </span>
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        data-testid={`template-dl-4k-${tpl.id}`}
                        onClick={() => triggerAssetDownload(tpl.previewImage, `${tpl.slug}_4k_uhd.png`)}
                        title="Download True 4K UHD PNG (3840×2160)"
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition cursor-pointer inline-flex items-center gap-1 ${
                          isLight
                            ? 'bg-white hover:bg-blue-50 text-blue-700 border-slate-300 hover:border-blue-300'
                            : 'bg-slate-900 hover:bg-slate-800 text-blue-300 border-slate-700'
                        }`}
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>4K PNG</span>
                      </button>
                      <button
                        type="button"
                        data-testid={`template-dl-svg-${tpl.id}`}
                        onClick={() => triggerAssetDownload(tpl.svgUrl, `${tpl.slug}.svg`)}
                        title="Download Standalone Vector SVG"
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition cursor-pointer inline-flex items-center gap-1 ${
                          isLight
                            ? 'bg-white hover:bg-teal-50 text-teal-700 border-slate-300 hover:border-teal-300'
                            : 'bg-slate-900 hover:bg-slate-800 text-teal-300 border-slate-700'
                        }`}
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>SVG</span>
                      </button>
                      <button
                        type="button"
                        data-testid={`template-dl-drawio-${tpl.id}`}
                        onClick={() => triggerAssetDownload(tpl.drawioUrl, `${tpl.slug}.drawio`)}
                        title="Download Native Editable .drawio XML"
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition cursor-pointer inline-flex items-center gap-1 ${
                          isLight
                            ? 'bg-white hover:bg-indigo-50 text-indigo-700 border-slate-300 hover:border-indigo-300'
                            : 'bg-slate-900 hover:bg-slate-800 text-indigo-300 border-slate-700'
                        }`}
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>.drawio</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedViewMode('png');
                      setExpandedTemplateId(tpl.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer inline-flex items-center gap-1.5 ${
                      isLight
                        ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect 4K</span>
                  </button>

                  <button
                    type="button"
                    data-testid={`template-lock-clone-btn-${tpl.id}`}
                    disabled={Boolean(cloningTemplateId)}
                    onClick={() => void handleLockInAndClone(tpl)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white text-xs font-extrabold shadow-xs transition inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isCloning ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Cloning Unique ID…</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Lock In &amp; Clone New ID</span>
                      </>
                    )}
                  </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* EXPANDED INSPECTOR MODAL WITH BACK & FORWARD NAVIGATION */}
      {expandedTemplate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded preview for ${expandedTemplate.title}`}
          data-testid="template-expanded-modal"
          className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-sm flex flex-col p-3 sm:p-6"
          onClick={() => setExpandedTemplateId(null)}
        >
          <div
            className={`relative w-full max-w-[1520px] mx-auto flex-1 rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-slate-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Expanded Top Header with Back & Forward Buttons */}
            <div
              className={`px-4 sm:px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-xs font-bold">
                    <span className="text-amber-300">{expandedTemplate.serialTag}</span>
                    <span className="text-slate-400">·</span>
                    <span>ID #{expandedTemplate.id}</span>
                    {expandedTemplate.suiteSerial && (
                      <>
                        <span className="text-slate-400">·</span>
                        <span className="text-sky-300">{expandedTemplate.suiteSerial}</span>
                      </>
                    )}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono text-xs font-extrabold border ${
                      isLight
                        ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                        : "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                    }`}
                  >
                    {expandedTemplate.canonicalTag}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-extrabold border ${
                      LEVEL_BADGE_STYLES[expandedTemplate.level]
                    }`}
                  >
                    {expandedTemplate.level}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-extrabold border ${
                      TYPE_BADGE_STYLES[expandedTemplate.type]
                    }`}
                  >
                    {expandedTemplate.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-bold border ${
                      isLight
                        ? 'bg-slate-100 text-slate-700 border-slate-300'
                        : 'bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    {expandedTemplate.kind}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${
                      isLight
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {expandedTemplate.useCase}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-extrabold truncate">
                  {expandedTemplate.headerTag}
                </h2>
              </div>

              {/* Back / Counter / Forward + View Toggle + Lock-In Clone + Close */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div
                  className={`inline-flex items-center rounded-xl border p-0.5 ${
                    isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    data-testid="expanded-prev-template-btn"
                    onClick={() => handleStepExpanded(-1)}
                    disabled={navigationPool.length <= 1}
                    title="Previous template (Left Arrow)"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer disabled:opacity-40 ${
                      isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-800 text-slate-100'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <span
                    data-testid="expanded-template-position"
                    className={`px-2.5 text-xs font-mono font-bold ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {expandedIndex + 1} / {navigationPool.length}
                  </span>
                  <button
                    type="button"
                    data-testid="expanded-next-template-btn"
                    onClick={() => handleStepExpanded(1)}
                    disabled={navigationPool.length <= 1}
                    title="Next template (Right Arrow)"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer disabled:opacity-40 ${
                      isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-800 text-slate-100'
                    }`}
                  >
                    <span>Forward</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  data-testid="expanded-share-link-btn"
                  onClick={() => handleCopyTemplateShareLink(expandedTemplate.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    copiedShareId === expandedTemplate.id
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : isLight
                        ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                  title="Copy canonical shareable template link (?id=...)"
                >
                  {copiedShareId === expandedTemplate.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Share Link</span>
                    </>
                  )}
                </button>

                <div
                  className={`inline-flex items-center rounded-xl border p-0.5 gap-0.5 ${
                    isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    data-testid="expanded-dl-4k-btn"
                    onClick={() =>
                      triggerAssetDownload(expandedTemplate.previewImage, `${expandedTemplate.slug}_4k_uhd.png`)
                    }
                    title="Download True 4K UHD PNG (3840×2160)"
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      isLight ? 'hover:bg-blue-50 text-blue-700' : 'hover:bg-slate-800 text-blue-300'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>4K PNG</span>
                  </button>
                  <button
                    type="button"
                    data-testid="expanded-dl-svg-btn"
                    onClick={() => triggerAssetDownload(expandedTemplate.svgUrl, `${expandedTemplate.slug}.svg`)}
                    title="Download Standalone Vector SVG"
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      isLight ? 'hover:bg-teal-50 text-teal-700' : 'hover:bg-slate-800 text-teal-300'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Vector SVG</span>
                  </button>
                  <button
                    type="button"
                    data-testid="expanded-dl-drawio-btn"
                    onClick={() =>
                      triggerAssetDownload(expandedTemplate.drawioUrl, `${expandedTemplate.slug}.drawio`)
                    }
                    title="Download Native Editable .drawio XML"
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      isLight ? 'hover:bg-indigo-50 text-indigo-700' : 'hover:bg-slate-800 text-indigo-300'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.drawio</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedViewMode(expandedViewMode === 'png' ? 'vector' : 'png')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{expandedViewMode === 'png' ? 'Interactive Vector View' : '4K UHD PNG View'}</span>
                </button>

                <button
                  type="button"
                  data-testid="expanded-lock-clone-btn"
                  disabled={Boolean(cloningTemplateId)}
                  onClick={() => void handleLockInAndClone(expandedTemplate)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white text-xs font-extrabold shadow-sm cursor-pointer"
                >
                  {cloningTemplateId === expandedTemplate.id ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Cloning Unique ID…</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Lock In &amp; Clone Template (New ID)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  data-testid="expanded-close-btn"
                  onClick={() => setExpandedTemplateId(null)}
                  aria-label="Close expanded preview"
                  className={`p-2 rounded-xl border transition cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Expanded Canvas */}
            <div className="relative flex-1 min-h-0 bg-white flex items-center justify-center overflow-auto p-4">
              {/* Side Floating Back / Forward Quick Buttons */}
              {navigationPool.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous template"
                    onClick={() => handleStepExpanded(-1)}
                    className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-[210] w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white items-center justify-center shadow-lg cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next template"
                    onClick={() => handleStepExpanded(1)}
                    className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-[210] w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white items-center justify-center shadow-lg cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {expandedViewMode === 'png' ? (
                <img
                  src={expandedTemplate.previewImage}
                  alt={expandedTemplate.headerTag}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : isLoadingVector ? (
                <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading Draw.io vector XML…</span>
                </div>
              ) : (
                <div className="w-full h-full">
                  <DiagramViewerRenderSafe
                    xml={expandedVectorXml}
                    useCaseName={expandedTemplate.title}
                    diagramType={expandedTemplate.kind}
                    bgTheme="light"
                    fitToWidth
                  />
                </div>
              )}
            </div>

            {/* Bottom Immutability Guarantee Bar */}
            <div
              className={`px-6 py-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs shrink-0 ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Immutable Master Baseline: clicking <strong>Lock In &amp; Clone Template</strong> creates an isolated copy with a new UUID while Template #{expandedTemplate.id} stays untouched.
                </span>
              </div>
              <span className="font-mono">Tip: Use ← / → arrow keys to browse templates</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArchitectureTemplateBrowser;
