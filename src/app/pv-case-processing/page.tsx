'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FileText,
  Network,
  Table2,
  BookOpen,
  Search,
  Filter,
  ExternalLink,
  Copy,
  Check,
  Download,
  Eye,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  Layers,
  X,
  CheckCircle2,
  Cpu,
  Database,
  Lock,
} from 'lucide-react';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  PV_USE_CASE_OVERVIEW,
  PV_MASTER_DIAGRAM_MATRIX,
  PV_DOCUMENTS,
  compilePvRowDrawioXml,
  getPvDocById,
  getPvRowById,
  getPvRowsForDoc,
  exportPvDocToMarkdown,
  type PvMatrixRow,
  type PvAssociatedDocument,
} from '@/lib/pvCaseProcessing';

type ActiveTab = 'matrix' | 'docs' | 'overview';

function getProjectTypeBadgeStyle(projectType: PvMatrixRow['projectType']): string {
  switch (projectType) {
    case 'AI':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Regulated':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'All (if UI)':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    default:
      return 'bg-blue-50 text-blue-700 border-blue-200';
  }
}

function getLevelBadgeStyle(level: string): string {
  if (level.includes('Business') || level.includes('User')) {
    return 'bg-sky-50 text-sky-700 border-sky-200';
  }
  if (level.includes('Physical') || level.includes('Exact')) {
    return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }
  if (level.includes('Low') || level.includes('Contract')) {
    return 'bg-teal-50 text-teal-700 border-teal-200';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

function PvCaseProcessingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = (searchParams.get('tab') as ActiveTab) || 'matrix';
  const initialDocId = searchParams.get('doc') || 'doc-01';
  const initialRowParam = Number(searchParams.get('row') || '0');

  const [activeTab, setActiveTab] = useState<ActiveTab>(
    ['matrix', 'docs', 'overview'].includes(initialTab) ? initialTab : 'matrix'
  );
  const [selectedDocId, setSelectedDocId] = useState<string>(initialDocId);
  const [inspectedRowId, setInspectedRowId] = useState<number | null>(
    initialRowParam >= 1 && initialRowParam <= 39 ? initialRowParam : null
  );

  // Matrix Filters
  const [docFilter, setDocFilter] = useState<string>('ALL');
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>('ALL');
  const [ownerFilter, setOwnerFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get('tab') as ActiveTab | null;
    const d = searchParams.get('doc');
    const r = Number(searchParams.get('row') || '0');
    if (t && ['matrix', 'docs', 'overview'].includes(t)) {
      setActiveTab(t);
    }
    if (d && PV_DOCUMENTS.some((doc) => doc.docId === d)) {
      setSelectedDocId(d);
    }
    if (r >= 1 && r <= 39) {
      setInspectedRowId(r);
    }
  }, [searchParams]);

  const activeDocument: PvAssociatedDocument = useMemo(
    () => getPvDocById(selectedDocId),
    [selectedDocId]
  );

  const activeDocRows = useMemo(
    () => getPvRowsForDoc(activeDocument.docId),
    [activeDocument.docId]
  );

  const inspectedRow: PvMatrixRow | null = useMemo(
    () => (inspectedRowId ? getPvRowById(inspectedRowId) : null),
    [inspectedRowId]
  );

  const inspectedRowXml = useMemo(
    () => (inspectedRow ? compilePvRowDrawioXml(inspectedRow) : ''),
    [inspectedRow]
  );

  const uniqueOwners = useMemo(
    () => Array.from(new Set(PV_MASTER_DIAGRAM_MATRIX.map((r) => r.owner))),
    []
  );

  const filteredMatrixRows = useMemo(() => {
    return PV_MASTER_DIAGRAM_MATRIX.filter((row) => {
      if (docFilter !== 'ALL' && row.docId !== docFilter) return false;
      if (projectTypeFilter !== 'ALL' && row.projectType !== projectTypeFilter) return false;
      if (ownerFilter !== 'ALL' && row.owner !== ownerFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${row.docNum} ${row.document} ${row.diagram} ${row.level} ${row.owner} ${row.projectType} ${row.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [docFilter, projectTypeFilter, ownerFilter, searchQuery]);

  const handleOpenDocument = (docId: string, scrollAnchor?: string) => {
    setSelectedDocId(docId);
    setActiveTab('docs');
    const url = `/pv-case-processing?tab=docs&doc=${docId}${scrollAnchor ? `#${scrollAnchor}` : ''}`;
    router.replace(url, { scroll: false });
    if (scrollAnchor) {
      setTimeout(() => {
        const el = document.getElementById(scrollAnchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenInStudio = (row: PvMatrixRow) => {
    const xml = compilePvRowDrawioXml(row);
    try {
      localStorage.setItem('promptcanvas_active_xml', xml);
      localStorage.setItem(
        'promptcanvas_active_title',
        `Doc #${row.docNum} (${row.document}) — ${row.diagram}`
      );
    } catch {
      // ignore storage quota errors
    }
    router.push('/dashboard');
  };

  const handleDownloadDrawio = (row: PvMatrixRow) => {
    const xml = compilePvRowDrawioXml(row);
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pv-doc${String(row.docNum).padStart(2, '0')}-row${String(row.rowId).padStart(2, '0')}-${row.sectionAnchor}.drawio`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyDocMarkdown = (doc: PvAssociatedDocument) => {
    const md = exportPvDocToMarkdown(doc);
    navigator.clipboard?.writeText(md);
    setCopiedId(doc.docId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadDocMarkdown = (doc: PvAssociatedDocument) => {
    const md = exportPvDocToMarkdown(doc);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.docId}-${doc.shortCode.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <UnifiedAppSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Executive Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3.5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  GxP · 21 CFR Part 11 · ICH E2B(R3) Reference Pack
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600">10 Associated Documents · 39 Linked Diagrams · 8 ADK Agents</span>
              </div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5 truncate">
                Agentic Pharmacovigilance (PV) Case Processing — Document &amp; Diagram Architecture Matrix
              </h1>
            </div>

            {/* Primary View Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                data-testid="tab-btn-matrix"
                onClick={() => {
                  setActiveTab('matrix');
                  router.replace('/pv-case-processing?tab=matrix', { scroll: false });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'matrix'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Table2 className="w-3.5 h-3.5" />
                39-Row Document &amp; Diagram Matrix
                <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 text-[10px]">39</span>
              </button>

              <button
                type="button"
                data-testid="tab-btn-docs"
                onClick={() => {
                  setActiveTab('docs');
                  router.replace(`/pv-case-processing?tab=docs&doc=${selectedDocId}`, { scroll: false });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'docs'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                10 Associated Documents (Doc 1–10)
                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[10px]">10</span>
              </button>

              <button
                type="button"
                data-testid="tab-btn-overview"
                onClick={() => {
                  setActiveTab('overview');
                  router.replace('/pv-case-processing?tab=overview', { scroll: false });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Use Case &amp; 8-Agent GCP Blueprint
              </button>
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 px-6 py-5 max-w-full">
          {/* ===============================================================
              TAB 1: 39-ROW MASTER DOCUMENT & DIAGRAM MATRIX
             =============================================================== */}
          {activeTab === 'matrix' && (
            <div className="space-y-5" data-testid="pv-matrix-view">
              {/* 10 Associated Documents Quick-Jump Strip */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      10 Associated Lifecycle Documents — Click any Document Card to Read Full Spec or Filter the 39-Row Table
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {docFilter !== 'ALL' && (
                      <button
                        type="button"
                        onClick={() => setDocFilter('ALL')}
                        className="text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Reset Document Filter (Show All 39)
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                  {PV_DOCUMENTS.map((doc) => {
                    const isSelected = docFilter === doc.docId;
                    return (
                      <div
                        key={doc.docId}
                        className={`rounded-lg border p-2.5 flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-400 ring-1 ring-blue-300'
                            : 'bg-slate-50/70 border-slate-200 hover:border-blue-300 hover:bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                              #{doc.docNum}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500">
                              {doc.diagramRowIds.length} {doc.diagramRowIds.length === 1 ? 'diag' : 'diags'}
                            </span>
                          </div>
                          <div className="mt-1.5 text-xs font-bold text-slate-900 leading-snug">
                            {doc.shortCode}
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                            {doc.owner}
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between gap-1">
                          <button
                            type="button"
                            onClick={() => setDocFilter(isSelected ? 'ALL' : doc.docId)}
                            className="text-[10px] font-semibold text-slate-600 hover:text-blue-700"
                          >
                            {isSelected ? 'Showing' : 'Filter'}
                          </button>
                          <button
                            type="button"
                            data-testid={`open-doc-card-${doc.docNum}`}
                            onClick={() => handleOpenDocument(doc.docId)}
                            className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-700 hover:text-blue-800"
                          >
                            Open Doc <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Filter & Search Toolbar */}
              <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
                  <div className="relative flex-1 min-w-[220px] max-w-sm">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search 39 rows by document, diagram, level, owner..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <select
                    aria-label="Filter by Document"
                    value={docFilter}
                    onChange={(e) => setDocFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700"
                  >
                    <option value="ALL">All 10 Documents (39 rows)</option>
                    {PV_DOCUMENTS.map((d) => (
                      <option key={d.docId} value={d.docId}>
                        #{d.docNum} — {d.shortCode} ({d.diagramRowIds.length} rows)
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Filter by Project Type"
                    value={projectTypeFilter}
                    onChange={(e) => setProjectTypeFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700"
                  >
                    <option value="ALL">All Project Types</option>
                    <option value="All">All (28)</option>
                    <option value="AI">AI (7)</option>
                    <option value="Regulated">Regulated (3)</option>
                    <option value="All (if UI)">All (if UI) (1)</option>
                  </select>

                  <select
                    aria-label="Filter by Owner"
                    value={ownerFilter}
                    onChange={(e) => setOwnerFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700"
                  >
                    <option value="ALL">All Owners ({uniqueOwners.length})</option>
                    {uniqueOwners.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <span>
                    Showing <strong className="text-slate-900">{filteredMatrixRows.length}</strong> of{' '}
                    <strong className="text-slate-900">39</strong> Matrix Entries
                  </span>
                </div>
              </div>

              {/* 39-Row Document & Diagram Matrix Table (Rule 26 Rigid Cell Containment) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table
                    data-testid="pv-master-matrix-table"
                    className="w-full table-fixed border-collapse text-left"
                  >
                    <thead>
                      <tr className="bg-slate-100/90 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                        <th className="w-[52px] py-3 px-3 text-center">#</th>
                        <th className="w-[180px] py-3 px-3">Document</th>
                        <th className="w-[250px] py-3 px-3">Diagram</th>
                        <th className="w-[135px] py-3 px-3">Level</th>
                        <th className="w-[145px] py-3 px-3">Owner</th>
                        <th className="w-[110px] py-3 px-3">Project type</th>
                        <th className=" py-3 px-3">PV Case Processing Summary &amp; Invariant</th>
                        <th className="w-[215px] py-3 px-3 text-right">Linked Doc &amp; Diagram</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {filteredMatrixRows.map((row) => {
                        const docObj = getPvDocById(row.docId);
                        return (
                          <tr
                            key={row.rowId}
                            data-testid={`pv-matrix-row-${row.rowId}`}
                            className="hover:bg-blue-50/40 transition-colors align-top"
                          >
                            {/* # Column */}
                            <td className="py-3 px-3 text-center font-extrabold text-slate-800">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-300 text-xs font-extrabold text-slate-900">
                                {row.docNum}
                              </span>
                            </td>

                            {/* Document Column (Linked to Associated Doc) */}
                            <td className="py-3 px-3 overflow-hidden">
                              <button
                                type="button"
                                data-testid={`matrix-doc-link-${row.rowId}`}
                                onClick={() => handleOpenDocument(row.docId)}
                                className="group text-left focus:outline-none"
                              >
                                <div className="font-bold text-blue-700 group-hover:text-blue-900 group-hover:underline flex items-center gap-1">
                                  <span>{row.document}</span>
                                  <ArrowRight className="w-3 h-3 shrink-0 opacity-75 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                                <div className="text-[10.5px] text-slate-500 mt-0.5 leading-snug break-words">
                                  Doc #{row.docNum}: {docObj.title.replace('Agentic PV Case Processing — ', '')}
                                </div>
                              </button>
                            </td>

                            {/* Diagram Column (Linked to Interactive Diagram & Doc Section) */}
                            <td className="py-3 px-3 overflow-hidden">
                              <button
                                type="button"
                                data-testid={`matrix-diagram-link-${row.rowId}`}
                                onClick={() => setInspectedRowId(row.rowId)}
                                className="text-left group focus:outline-none"
                              >
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 group-hover:underline leading-snug break-words">
                                  {row.diagram}
                                </div>
                                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                                  Row #{String(row.rowId).padStart(2, '0')} · Click to preview diagram
                                </div>
                              </button>
                            </td>

                            {/* Level Column */}
                            <td className="py-3 px-3 overflow-hidden">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-md border text-[11px] font-semibold leading-tight break-words ${getLevelBadgeStyle(
                                  row.level
                                )}`}
                              >
                                {row.level}
                              </span>
                            </td>

                            {/* Owner Column */}
                            <td className="py-3 px-3 font-semibold text-slate-700 leading-snug break-words">
                              {row.owner}
                            </td>

                            {/* Project type Column */}
                            <td className="py-3 px-3 overflow-hidden">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-md border text-[11px] font-bold leading-tight break-words ${getProjectTypeBadgeStyle(
                                  row.projectType
                                )}`}
                              >
                                {row.projectType}
                              </span>
                            </td>

                            {/* Summary Column */}
                            <td className="py-3 px-3 text-slate-600 leading-relaxed break-words">
                              <div className="text-slate-800 font-medium">{row.summary}</div>
                              <div className="text-[11px] text-emerald-800 bg-emerald-50/70 border border-emerald-200/80 rounded px-2 py-0.5 mt-1">
                                <strong>Invariant:</strong> {row.keyTakeaway}
                              </div>
                            </td>

                            {/* Actions Column */}
                            <td className="py-3 px-3 text-right">
                              <div className="flex flex-col items-end gap-1.5">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    data-testid={`btn-open-doc-row-${row.rowId}`}
                                    onClick={() => handleOpenDocument(row.docId, `diagram-row-${row.rowId}`)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-bold transition-colors"
                                  >
                                    <FileText className="w-3 h-3" />
                                    Doc #{row.docNum}
                                  </button>
                                  <button
                                    type="button"
                                    data-testid={`btn-view-diagram-row-${row.rowId}`}
                                    onClick={() => setInspectedRowId(row.rowId)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-colors"
                                  >
                                    <Eye className="w-3 h-3" />
                                    Diagram #{row.rowId}
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleOpenInStudio(row)}
                                  className="text-[10.5px] font-semibold text-slate-500 hover:text-blue-700 hover:underline"
                                >
                                  Open in Studio Canvas ↗
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 2: 10 ASSOCIATED DOCUMENTS READER (DOC 1 – DOC 10)
             =============================================================== */}
          {activeTab === 'docs' && (
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              data-testid="pv-associated-docs-reader"
            >
              {/* Left Rail: 10 Associated Documents Selector */}
              <aside className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs lg:sticky lg:top-20">
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                    10 Associated Documents
                  </span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    39 Diagrams
                  </span>
                </div>

                <div className="space-y-1.5">
                  {PV_DOCUMENTS.map((doc) => {
                    const isCurrent = doc.docId === activeDocument.docId;
                    return (
                      <button
                        key={doc.docId}
                        type="button"
                        data-testid={`doc-selector-btn-${doc.docNum}`}
                        onClick={() => handleOpenDocument(doc.docId)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between gap-2 ${
                          isCurrent
                            ? 'bg-blue-50/90 border-blue-400 text-blue-950 shadow-2xs'
                            : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                                isCurrent ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              Doc {doc.docNum}
                            </span>
                            <span className="text-xs font-extrabold truncate">{doc.shortCode}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                            {doc.owner} · {doc.level}
                          </div>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {doc.diagramRowIds.length} diags
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setDocFilter(activeDocument.docId);
                      setActiveTab('matrix');
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Table2 className="w-3.5 h-3.5" />
                    Filter Matrix to Doc #{activeDocument.docNum} ({activeDocument.diagramRowIds.length} Rows)
                  </button>
                </div>
              </aside>

              {/* Right Main Document Reader */}
              <article className="lg:col-span-9 space-y-6 min-w-0">
                {/* Document Hero Banner */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-extrabold">
                        DOC #{activeDocument.docNum} OF 10
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                        {activeDocument.shortCode}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                        {activeDocument.status} · v{activeDocument.version}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Owner: <strong className="text-slate-800">{activeDocument.owner}</strong> · Level:{' '}
                        <strong className="text-slate-800">{activeDocument.level}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyDocMarkdown(activeDocument)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200"
                      >
                        {copiedId === activeDocument.docId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Copied Markdown
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy Markdown
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadDocMarkdown(activeDocument)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download .md
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 mt-4">
                    {activeDocument.title}
                  </h2>
                  <p className="text-sm font-semibold text-slate-600 mt-1">
                    {activeDocument.subtitle}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed mt-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    {activeDocument.executiveSummary}
                  </p>

                  {/* Linked Matrix Diagrams Strip inside this Document */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                      Embedded Matrix Diagrams in Doc #{activeDocument.docNum} ({activeDocRows.length} of 39):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeDocRows.map((r) => (
                        <a
                          key={r.rowId}
                          href={`#diagram-row-${r.rowId}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-colors"
                        >
                          <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[10px]">
                            Row #{r.rowId}
                          </span>
                          <span>{r.diagram}</span>
                          <span className="text-[10px] text-blue-600">({r.level})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Document Sections & Inline Interactive Diagrams */}
                {activeDocument.sections.map((sec) => (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4"
                  >
                    <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs font-extrabold">
                        §{sec.number}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">{sec.title}</h3>
                    </div>

                    {sec.paragraphs?.map((p, idx) => (
                      <p key={idx} className="text-sm text-slate-700 leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                        {sec.bullets.map((b, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {sec.callout && (
                      <div className="p-4 rounded-lg bg-blue-50/80 border border-blue-200 text-sm text-slate-800">
                        <div className="font-extrabold text-blue-900 mb-1">{sec.callout.title}</div>
                        <div className="leading-relaxed">{sec.callout.body}</div>
                      </div>
                    )}

                    {/* Inline Rendered Diagrams for this Section */}
                    {sec.diagramRowIds && sec.diagramRowIds.length > 0 && (
                      <div className="space-y-5 pt-2">
                        {sec.diagramRowIds.map((rId) => {
                          const row = getPvRowById(rId);
                          const xml = compilePvRowDrawioXml(row);
                          return (
                            <div
                              key={rId}
                              id={`diagram-row-${row.rowId}`}
                              data-testid={`inline-diagram-card-${row.rowId}`}
                              className="rounded-xl border-2 border-slate-200 bg-slate-50/60 overflow-hidden"
                            >
                              <div className="bg-white px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[11px] font-extrabold">
                                      Matrix Row #{row.rowId} · Doc #{row.docNum}
                                    </span>
                                    <span className="text-sm font-extrabold text-slate-900">
                                      {row.document} — {row.diagram}
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded border text-[10.5px] font-bold ${getLevelBadgeStyle(
                                        row.level
                                      )}`}
                                    >
                                      Level: {row.level}
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded border text-[10.5px] font-bold ${getProjectTypeBadgeStyle(
                                        row.projectType
                                      )}`}
                                    >
                                      {row.projectType}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-600 mt-1">{row.summary}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setInspectedRowId(row.rowId)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    Inspect Fullscreen
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDownloadDrawio(row)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    .drawio
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenInStudio(row)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                                  >
                                    Edit in Studio ↗
                                  </button>
                                </div>
                              </div>

                              <div className="bg-white p-2">
                                <DiagramViewerRenderSafe
                                  xml={xml}
                                  diagramId={`pv-inline-${row.rowId}`}
                                  bgTheme="light"
                                  aspectRatioId="16:9"
                                  fitToWidth={false}
                                  minHeight={515}
                                />
                              </div>

                              <div className="px-4 py-2.5 bg-slate-100/80 border-t border-slate-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                  <span>
                                    <strong className="text-slate-900">4-Stage Topology:</strong>{' '}
                                    {row.lanes.map((c) => c.laneTitle).join(' → ')}
                                  </span>
                                  <span className="text-slate-400">|</span>
                                  <span>
                                    <strong className="text-slate-900">Inter-Stage Protocols:</strong>{' '}
                                    {row.edgeLabels.join(' · ')}
                                  </span>
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 shrink-0">
                                  Owner: {row.owner}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Structured Tables */}
                    {sec.tables?.map((tbl, tIdx) => (
                      <div key={tIdx} className="space-y-1.5 pt-2">
                        {tbl.caption && (
                          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                            {tbl.caption}
                          </div>
                        )}
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                          <table className="w-full table-fixed border-collapse text-left text-xs">
                            <thead>
                              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-extrabold">
                                {tbl.headers.map((h, hIdx) => {
                                  const hClean = h.trim().toLowerCase();
                                  const colWidthClass =
                                    hClean === '#'
                                      ? 'w-[52px] text-center'
                                      : hClean === 'id' ||
                                        hClean === 'req id' ||
                                        hClean === 'adr id' ||
                                        hClean === 'priority' ||
                                        hClean === 'severity' ||
                                        hClean === 'stride' ||
                                        hClean === 'status' ||
                                        hClean === 'residual risk' ||
                                        hClean === 'retryable?'
                                      ? 'w-[105px]'
                                      : hIdx === 0
                                      ? 'w-[190px]'
                                      : '';
                                  return (
                                    <th key={hIdx} className={`py-2.5 px-3 break-words ${colWidthClass}`}>
                                      {h}
                                    </th>
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {tbl.rows.map((r, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-50/80 align-top">
                                  {r.map((cell, cIdx) => {
                                    const isHashCol = tbl.headers[cIdx]?.trim() === '#';
                                    return (
                                      <td
                                        key={cIdx}
                                        className={`py-2.5 px-3 leading-relaxed break-words ${
                                          isHashCol
                                            ? 'text-center font-extrabold text-slate-900'
                                            : cIdx === 0
                                            ? 'font-bold text-slate-900'
                                            : 'text-slate-700'
                                        }`}
                                      >
                                        {cell}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    {/* Code / Schema Blocks */}
                    {sec.codeBlocks?.map((cb, cIdx) => (
                      <div key={cIdx} className="rounded-lg border border-slate-200 overflow-hidden">
                        <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>{cb.title}</span>
                          <span className="text-[10px] font-mono uppercase text-slate-500">
                            {cb.language}
                          </span>
                        </div>
                        <pre className="p-4 bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed">
                          <code>{cb.code}</code>
                        </pre>
                      </div>
                    ))}
                  </section>
                ))}

                {/* Cross-Document Footer Navigation */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {activeDocument.docNum > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenDocument(
                            `doc-${String(activeDocument.docNum - 1).padStart(2, '0')}`
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Prev: Doc #{activeDocument.docNum - 1}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-500 mr-1">Related Docs:</span>
                    {activeDocument.relatedDocIds.map((relId) => {
                      const relDoc = getPvDocById(relId);
                      return (
                        <button
                          key={relId}
                          type="button"
                          onClick={() => handleOpenDocument(relId)}
                          className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold"
                        >
                          Doc #{relDoc.docNum}: {relDoc.shortCode}
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    {activeDocument.docNum < 10 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenDocument(
                            `doc-${String(activeDocument.docNum + 1).padStart(2, '0')}`
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                      >
                        Next: Doc #{activeDocument.docNum + 1}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* ===============================================================
              TAB 3: USE CASE & 8-AGENT GCP BLUEPRINT OVERVIEW
             =============================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6" data-testid="pv-use-case-overview">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
                  Healthcare &amp; Life Sciences Reference Use Case · {PV_USE_CASE_OVERVIEW.date}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {PV_USE_CASE_OVERVIEW.title}
                </h2>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">
                  {PV_USE_CASE_OVERVIEW.subtitle}
                </p>
                <div className="mt-4 space-y-3">
                  {PV_USE_CASE_OVERVIEW.summaryParagraphs.map((p, i) => (
                    <p key={i} className="text-sm text-slate-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 8 Agents Roster Table */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <h3 className="text-base font-extrabold text-slate-900 mb-3">
                    The 8 Specialist Agents (ADK on Vertex AI Agent Engine)
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full table-fixed border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 font-extrabold text-slate-700">
                          <th className="w-10 py-2.5 px-2.5 text-center">#</th>
                          <th className="w-36 py-2.5 px-2.5">Agent</th>
                          <th className="py-2.5 px-2.5">Primary Job</th>
                          <th className="w-36 py-2.5 px-2.5">Tier &amp; Tools</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {PV_USE_CASE_OVERVIEW.agents.map((ag) => (
                          <tr key={ag.number} className="hover:bg-slate-50 align-top">
                            <td className="py-2.5 px-2.5 text-center font-extrabold text-blue-700">
                              {ag.number}
                            </td>
                            <td className="py-2.5 px-2.5 font-bold text-slate-900">{ag.agent}</td>
                            <td className="py-2.5 px-2.5 text-slate-700 leading-relaxed">
                              {ag.job}
                            </td>
                            <td className="py-2.5 px-2.5 text-[11px] text-slate-600">
                              <div className="font-bold text-slate-800">{ag.tier}</div>
                              <div>{ag.keyTools}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 6-Layer GCP Stack & Complexity Drivers */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                    <h3 className="text-base font-extrabold text-slate-900 mb-3">
                      Google Cloud Reference Stack (6 Architectural Layers)
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full table-fixed border-collapse text-left text-xs">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200 font-extrabold text-slate-700">
                            <th className="w-40 py-2.5 px-3">Layer</th>
                            <th className="py-2.5 px-3">Google Cloud Services</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {PV_USE_CASE_OVERVIEW.gcpStack.map((st, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 align-top">
                              <td className="py-2.5 px-3 font-bold text-slate-900">{st.layer}</td>
                              <td className="py-2.5 px-3 text-slate-700 leading-relaxed">
                                {st.gcpServices}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                    <h3 className="text-base font-extrabold text-slate-900 mb-2.5">
                      Why This System Requires All 10 Documents &amp; 39 Diagrams
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {PV_USE_CASE_OVERVIEW.complexityDrivers.map((cd, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{cd}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =====================================================================
          INTERACTIVE DIAGRAM INSPECTOR MODAL (FOR ALL 39 MATRIX DIAGRAMS)
         ===================================================================== */}
      {inspectedRow && (
        <div
          data-testid="pv-diagram-inspector-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-7xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-xs font-extrabold">
                    Matrix Row #{inspectedRow.rowId} of 39
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-xs font-bold">
                    Doc #{inspectedRow.docNum}: {inspectedRow.document}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded border text-xs font-bold ${getLevelBadgeStyle(
                      inspectedRow.level
                    )}`}
                  >
                    Level: {inspectedRow.level}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded border text-xs font-bold ${getProjectTypeBadgeStyle(
                      inspectedRow.projectType
                    )}`}
                  >
                    {inspectedRow.projectType}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                  {inspectedRow.document} — {inspectedRow.diagram}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const targetDocId = inspectedRow.docId;
                    const targetRowId = inspectedRow.rowId;
                    setInspectedRowId(null);
                    handleOpenDocument(targetDocId, `diagram-row-${targetRowId}`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Open Doc #{inspectedRow.docNum} ({inspectedRow.document})
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadDrawio(inspectedRow)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .drawio
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenInStudio(inspectedRow)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  Open in Studio Canvas ↗
                </button>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setInspectedRowId(null)}
                  className="p-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rendered Draw.io Vector Canvas */}
            <div className="p-3 bg-white">
              <DiagramViewerRenderSafe
                xml={inspectedRowXml}
                diagramId={`pv-modal-${inspectedRow.rowId}`}
                bgTheme="light"
                aspectRatioId="16:9"
                fitToWidth={false}
                minHeight={610}
              />
            </div>

            {/* Modal Footer: Prev / Next Row Navigation */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-700 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  <strong className="text-slate-900">Owner:</strong> {inspectedRow.owner}
                </span>
                <span className="text-slate-400">|</span>
                <span>
                  <strong className="text-slate-900">4-Stage Topology:</strong>{' '}
                  {inspectedRow.lanes.map((c) => c.laneTitle).join(' → ')}
                </span>
                <span className="text-slate-400">|</span>
                <span>
                  <strong className="text-slate-900">Protocols:</strong>{' '}
                  {inspectedRow.edgeLabels.join(' · ')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={inspectedRow.rowId <= 1}
                  onClick={() => setInspectedRowId(Math.max(1, inspectedRow.rowId - 1))}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40"
                >
                  ← Prev Row (#{Math.max(1, inspectedRow.rowId - 1)})
                </button>
                <button
                  type="button"
                  disabled={inspectedRow.rowId >= 39}
                  onClick={() => setInspectedRowId(Math.min(39, inspectedRow.rowId + 1))}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40"
                >
                  Next Row (#{Math.min(39, inspectedRow.rowId + 1)}) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PvCaseProcessingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-semibold text-slate-600">
          Loading PV Case Processing 10-Document &amp; 39-Diagram Reference Matrix...
        </div>
      }
    >
      <PvCaseProcessingPageInner />
    </Suspense>
  );
}
