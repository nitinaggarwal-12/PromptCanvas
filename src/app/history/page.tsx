'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Search,
  Layers,
  Calendar,
  Clock,
  ExternalLink,
  Eye,
  History,
  ChevronLeft,
  ChevronRight,
  X,
  Copy,
  Check,
  Download,
  Filter,
  ArrowUpDown,
  FileCode,
  ShieldCheck,
  Cpu,
  Database,
  BarChart3,
  Network,
  Lock,
  Globe,
  SlidersHorizontal,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { getArchitectureTypeById, getDefaultXmlForArchitecture } from '@/lib/architectureTypes';

interface DiagramVersionItem {
  id: string;
  diagram_id: string;
  version_number: number;
  xml_content: string;
  comment: string | null;
  created_by: string;
  created_at: string;
  prompt?: string | null;
  architecture_type?: string | null;
}

interface CanvasDiagramItem {
  id: string;
  name: string;
  architecture_type?: string | null;
  is_private?: boolean | number | null;
  created_at: string;
  updated_at: string;
  versions?: DiagramVersionItem[];
  version_count?: number;
  max_version?: number;
  latest_prompt?: string;
  xml_content?: string;
}

export default function CanvasHistoryPage() {
  const router = useRouter();

  // State
  const [diagrams, setDiagrams] = useState<CanvasDiagramItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedArchFilter, setSelectedArchFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'versions' | 'oldest' | 'name'>('recent');

  // Preview Modal State
  const [activeModalCanvas, setActiveModalCanvas] = useState<CanvasDiagramItem | null>(null);
  const [modalVersions, setModalVersions] = useState<DiagramVersionItem[]>([]);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>(0);
  const [isLoadingVersions, setIsLoadingVersions] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  // Fetch all diagrams on load
  const fetchAllCanvases = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/diagrams');
      if (!res.ok) throw new Error('Failed to fetch diagrams');
      const data: CanvasDiagramItem[] = await res.json();
      setDiagrams(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching historical canvases:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCanvases();
  }, [fetchAllCanvases]);

  // Open Preview Modal and fetch full version history for the selected canvas
  const handleOpenPreviewModal = async (diagram: CanvasDiagramItem) => {
    setActiveModalCanvas(diagram);
    setIsLoadingVersions(true);
    try {
      const res = await fetch(`/api/diagrams/${diagram.id}`);
      if (res.ok) {
        const fullData = await res.json();
        const vers: DiagramVersionItem[] = fullData.versions || [];
        if (vers.length > 0) {
          // Sort descending (latest version first)
          const sorted = [...vers].sort((a, b) => b.version_number - a.version_number);
          setModalVersions(sorted);
          setSelectedVersionIndex(0);
        } else {
          // Fallback if no version records exist
          const fallbackVer: DiagramVersionItem = {
            id: `ver_${diagram.id}_1`,
            diagram_id: diagram.id,
            version_number: 1,
            xml_content: diagram.xml_content || getDefaultXmlForArchitecture(diagram.architecture_type || 'conceptual_diagram') || '',
            comment: 'Initial Master Reference Blueprint',
            created_by: 'system',
            created_at: diagram.created_at,
            architecture_type: diagram.architecture_type
          };
          setModalVersions([fallbackVer]);
          setSelectedVersionIndex(0);
        }
      } else {
        // Fallback
        const fallbackVer: DiagramVersionItem = {
          id: `ver_${diagram.id}_1`,
          diagram_id: diagram.id,
          version_number: 1,
          xml_content: diagram.xml_content || getDefaultXmlForArchitecture(diagram.architecture_type || 'conceptual_diagram') || '',
          comment: 'Loaded Master Blueprint',
          created_by: 'system',
          created_at: diagram.created_at,
          architecture_type: diagram.architecture_type
        };
        setModalVersions([fallbackVer]);
        setSelectedVersionIndex(0);
      }
    } catch (err) {
      console.error('Failed to load version details:', err);
    } finally {
      setIsLoadingVersions(false);
    }
  };

  const handleCloseModal = () => {
    setActiveModalCanvas(null);
    setModalVersions([]);
    setSelectedVersionIndex(0);
  };

  // Keyboard navigation for modal versions (ArrowLeft / ArrowRight)
  useEffect(() => {
    if (!activeModalCanvas || modalVersions.length === 0) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedVersionIndex(prev => (prev < modalVersions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedVersionIndex(prev => (prev > 0 ? prev - 1 : modalVersions.length - 1));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalCanvas, modalVersions]);

  // Copy XML to clipboard
  const handleCopyXml = (xml: string) => {
    navigator.clipboard.writeText(xml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  // Download .drawio.xml
  const handleDownloadXml = (name: string, verNum: number, xml: string) => {
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_').toLowerCase()}_v${verNum}.drawio.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Open Canvas in workspace
  const handleLaunchWorkspace = (diagramId: string, archType?: string | null) => {
    if (archType && archType.startsWith('P')) {
      router.push(`/workspace?blueprint=${archType}`);
    } else {
      router.push(`/workspace?diagram=${diagramId}`);
    }
  };

  // Filtered and Sorted Canvases
  const filteredDiagrams = useMemo(() => {
    let list = [...diagrams];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(d => {
        const name = (d.name || '').toLowerCase();
        const arch = (d.architecture_type || '').toLowerCase();
        const prompt = (d.latest_prompt || '').toLowerCase();
        return name.includes(q) || arch.includes(q) || prompt.includes(q) || d.id.includes(q);
      });
    }

    // Phase Filter
    if (selectedPhase !== 'all') {
      list = list.filter(d => {
        const arch = (d.architecture_type || '').toLowerCase();
        if (selectedPhase === 'P1') return arch.includes('p1') || arch.includes('hybrid') || arch.includes('vsm');
        if (selectedPhase === 'P2') return arch.includes('p2') || arch.includes('finops');
        if (selectedPhase === 'P3') return arch.includes('p3') || arch.includes('rag') || arch.includes('lakehouse') || arch.includes('erd') || arch.includes('sequence');
        if (selectedPhase === 'P4') return arch.includes('p4') || arch.includes('secure') || arch.includes('devsecops') || arch.includes('multiflow');
        if (selectedPhase === 'P5') return arch.includes('p5') || arch.includes('golive') || arch.includes('sre') || arch.includes('coe');
        if (selectedPhase === 'IND') return arch.includes('ind') || arch.includes('fintech') || arch.includes('pharma') || arch.includes('mfg') || arch.includes('retail');
        return true;
      });
    }

    // Architecture Type Filter
    if (selectedArchFilter !== 'all') {
      list = list.filter(d => (d.architecture_type || '') === selectedArchFilter);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === 'versions') {
        const aCount = a.version_count || a.versions?.length || 1;
        const bCount = b.version_count || b.versions?.length || 1;
        return bCount - aCount;
      }
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      return 0;
    });

    return list;
  }, [diagrams, searchQuery, selectedPhase, selectedArchFilter, sortBy]);

  // Summary Metrics
  const totalCanvases = diagrams.length;
  const totalVersions = useMemo(() => {
    return diagrams.reduce((sum, d) => sum + (d.version_count || d.versions?.length || 1), 0);
  }, [diagrams]);

  const maxVersionDepth = useMemo(() => {
    return diagrams.reduce((max, d) => Math.max(max, d.max_version || d.versions?.length || 1), 1);
  }, [diagrams]);

  const activeVersion = modalVersions[selectedVersionIndex] || null;

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* ========================================================================= */}
      {/* 1. STICKY FULL-WIDTH NAVIGATION HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
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

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            <Link
              href="/workspace"
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-2"
            >
              <Network className="w-3.5 h-3.5 text-teal-400" />
              <span>Canvas Workspace</span>
            </Link>
            <Link
              href="/history"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 transition flex items-center gap-2 shadow-sm"
            >
              <History className="w-3.5 h-3.5 text-teal-400" />
              <span>Historical Canvases</span>
            </Link>
            <Link
              href="/templates"
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Master Blueprints</span>
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-2"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Operations Dashboard</span>
            </Link>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllCanvases}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-teal-300 transition cursor-pointer"
              title="Refresh Historical Canvases"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
            </button>
            <Link
              href="/workspace"
              className="px-5 py-2.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-[#070a13] font-black text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] flex items-center gap-2 shrink-0"
            >
              <span>+ New Canvas</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO & KPI METRIC BANNER */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-800/80 bg-gradient-to-b from-[#0B0F19] to-[#07090E] py-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <History className="w-3.5 h-3.5" />
                <span>Historical Canvases &amp; Version Snapshots</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Canvas Version <span className="bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Archive &amp; Tiles</span>
              </h1>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Browse and inspect every historical canvas, architecture blueprint, and iterative snapshot created since project inception with instant vector preview and version time-travel.
              </p>
            </div>

            {/* KPI Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 shrink-0">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-center shadow-lg">
                <span className="text-xs font-semibold text-slate-400">Total Canvases</span>
                <span className="text-2xl md:text-3xl font-black text-teal-400 mt-1">{totalCanvases}</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-center shadow-lg">
                <span className="text-xs font-semibold text-slate-400">Saved Versions</span>
                <span className="text-2xl md:text-3xl font-black text-indigo-400 mt-1">{totalVersions}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-center shadow-lg">
                <span className="text-xs font-semibold text-slate-400">Max Version Depth</span>
                <span className="text-2xl md:text-3xl font-black text-amber-400 mt-1">v{maxVersionDepth}</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SEARCH & FILTERS BAR */}
          {/* ========================================================================= */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by canvas name, prompt, architecture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Chips & Sort Controls */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              {/* Phase Filters */}
              <div className="inline-flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'P1', label: 'Phase 1' },
                  { id: 'P2', label: 'Phase 2' },
                  { id: 'P3', label: 'Phase 3' },
                  { id: 'P4', label: 'Phase 4' },
                  { id: 'P5', label: 'Phase 5' },
                  { id: 'IND', label: 'Industry' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPhase(p.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      selectedPhase === p.id
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Sort By Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-teal-400"
                >
                  <option value="recent">⚡ Most Recent</option>
                  <option value="versions">🏆 Most Versions</option>
                  <option value="oldest">📅 Oldest First</option>
                  <option value="name">🔤 Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HISTORICAL CANVAS TILES GRID */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 md:px-12 py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
            <span className="text-sm font-semibold">Loading historical canvases from database...</span>
          </div>
        ) : filteredDiagrams.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No historical canvases found</h3>
            <p className="text-xs text-slate-400">
              No diagrams matched your search filter &quot;{searchQuery}&quot;. Try resetting your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPhase('all');
                setSelectedArchFilter('all');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDiagrams.map((diagram, idx) => {
              const archMeta = getArchitectureTypeById(diagram.architecture_type || '');
              const verCount = diagram.version_count || diagram.versions?.length || 1;
              const dateStr = diagram.updated_at || diagram.created_at;

              return (
                <div
                  key={diagram.id}
                  className="bg-slate-900/70 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/5 group relative overflow-hidden"
                >
                  {/* Top Header Strip */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-md bg-teal-950/80 text-teal-300 border border-teal-800/80 truncate max-w-[200px]">
                        {archMeta?.name || diagram.architecture_type || 'Custom Canvas'}
                      </span>
                      <div className="flex items-center gap-2">
                        {diagram.is_private ? (
                          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Private
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Public
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-500">#{idx + 1}</span>
                      </div>
                    </div>

                    {/* Canvas Title */}
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-2 mb-2">
                      {diagram.name}
                    </h3>

                    {/* Description or Prompt Snippet */}
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 italic">
                      &quot;{diagram.latest_prompt || archMeta?.whenToUse || 'Pristine architectural canvas with continuous version history.'}&quot;
                    </p>

                    {/* Version & Date Metadata */}
                    <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 mb-5 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-indigo-300">
                        <History className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-bold">{verCount} Version{verCount > 1 ? 's' : ''}</span>
                        {diagram.max_version && diagram.max_version > 1 && (
                          <span className="text-[10px] text-slate-500">(Max v{diagram.max_version})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{new Date(dateStr).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenPreviewModal(diagram)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-teal-400" />
                      <span>Preview All Versions</span>
                    </button>

                    <button
                      onClick={() => handleLaunchWorkspace(diagram.id, diagram.architecture_type)}
                      className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#070a13] text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/20"
                      title="Open full editable canvas in workspace"
                    >
                      <span>Open Canvas</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE VERSION EXPLORER & PREVIEW MODAL */}
      {/* ========================================================================= */}
      {activeModalCanvas && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="bg-[#0B0F19] border border-slate-700 rounded-2xl w-full max-w-[1500px] h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Top Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 font-bold shrink-0">
                  🎨
                </div>
                <div className="min-w-0">
                  <h2 className="text-base md:text-lg font-black text-white truncate">
                    {activeModalCanvas.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                    <span>ID: {activeModalCanvas.id.slice(0, 16)}...</span>
                    <span>•</span>
                    <span className="text-teal-400 font-bold">{modalVersions.length} Total Snapshots</span>
                  </p>
                </div>
              </div>

              {/* Actions Right */}
              <div className="flex items-center gap-3 shrink-0">
                {activeVersion && (
                  <>
                    <button
                      onClick={() => handleCopyXml(activeVersion.xml_content)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5"
                      title="Copy raw Draw.io XML"
                    >
                      {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedXml ? 'Copied!' : 'Copy XML'}</span>
                    </button>

                    <button
                      onClick={() => handleDownloadXml(activeModalCanvas.name, activeVersion.version_number, activeVersion.xml_content)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5"
                      title="Download .drawio.xml file"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Download XML</span>
                    </button>

                    <button
                      onClick={() => handleLaunchWorkspace(activeModalCanvas.id, activeModalCanvas.architecture_type)}
                      className="px-4 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-lg shadow-teal-500/20"
                    >
                      <span>Open in Workspace</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition text-lg font-bold"
                  title="Close modal (Escape)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Split Pane */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
              
              {/* Left Pane: Version Selector & Timeline */}
              <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-slate-800 bg-[#090D16] p-4 flex flex-col shrink-0 overflow-y-auto">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Version Snapshots ({modalVersions.length})
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Use ← / → keys</span>
                </div>

                {isLoadingVersions ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-2 text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
                    <span className="text-xs">Loading versions...</span>
                  </div>
                ) : (
                  <div className="space-y-2 flex-1 overflow-y-auto">
                    {modalVersions.map((ver, vIdx) => {
                      const isSelected = vIdx === selectedVersionIndex;
                      return (
                        <button
                          key={ver.id || vIdx}
                          onClick={() => setSelectedVersionIndex(vIdx)}
                          className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg shadow-teal-500/10'
                              : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className={`text-xs font-black px-2 py-0.5 rounded ${
                              isSelected ? 'bg-teal-400 text-slate-950' : 'bg-slate-800 text-teal-300 font-mono'
                            }`}>
                              v{ver.version_number}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {new Date(ver.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <p className="text-xs font-semibold line-clamp-2 mb-1 text-slate-200">
                            {ver.comment || ver.prompt || 'Architectural Refinement'}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                            <span>Author: {ver.created_by || 'system'}</span>
                            {ver.architecture_type && (
                              <span className="text-indigo-400 truncate max-w-[120px]">{ver.architecture_type}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Pane: Live Vector Canvas Viewport */}
              <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
                {activeVersion ? (
                  <>
                    {/* Viewport Control Bar */}
                    <div className="px-6 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-teal-400">
                          Active View: Version {activeVersion.version_number}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 truncate max-w-md">
                          {activeVersion.comment || 'Master Layout Spec'}
                        </span>
                      </div>

                      {/* Version Step Arrow Buttons */}
                      <div className="inline-flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                        <button
                          onClick={() => setSelectedVersionIndex(prev => (prev < modalVersions.length - 1 ? prev + 1 : prev))}
                          disabled={selectedVersionIndex >= modalVersions.length - 1}
                          className="p-1 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                          title="Previous Version (Older)"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[11px] font-mono px-2 text-slate-400">
                          {modalVersions.length - selectedVersionIndex} / {modalVersions.length}
                        </span>
                        <button
                          onClick={() => setSelectedVersionIndex(prev => (prev > 0 ? prev - 1 : prev))}
                          disabled={selectedVersionIndex <= 0}
                          className="p-1 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                          title="Next Version (Newer)"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Canvas Iframe Viewport */}
                    <div className="flex-1 relative bg-white overflow-hidden">
                      <iframe
                        key={`${activeModalCanvas.id}_v${activeVersion.version_number}`}
                        src={`/workspace?blueprint=${activeModalCanvas.architecture_type || 'conceptual_diagram'}`}
                        className="w-full h-full border-none"
                        title={`Canvas Version v${activeVersion.version_number}`}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                    Select a version from the left panel to inspect.
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
