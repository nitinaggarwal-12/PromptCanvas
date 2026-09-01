'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Loader2,
  Star,
  Trophy,
  Award,
  Plus,
  User,
  LayoutGrid,
  ShieldAlert,
  Settings,
  BookOpen,
  ClipboardList,
  Compass,
  Menu,
  Trash2,
  CopyPlus,
  CheckSquare,
  Square,
  AlertTriangle
} from 'lucide-react';
import { getArchitectureTypeById, getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import { sanitizeDrawioXmlAttributes } from '@/lib/diagramCleaner';
import DiagramViewer from '@/components/DiagramViewer';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';

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
  created_studio?: string | null;
  is_private?: boolean | number | null;
  created_at: string;
  updated_at: string;
  versions?: DiagramVersionItem[];
  version_count?: number;
  max_version?: number;
  latest_prompt?: string;
  xml_content?: string;
  is_starred?: boolean;
}

type StudioTabKey = 'all' | 'studio' | 'studio1' | 'studio2' | 'studio3' | 'canonical';

function ArchitectureLibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Navigation State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null; is_guest?: boolean } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Core Data State
  const [diagrams, setDiagrams] = useState<CanvasDiagramItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTabKey>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'versions' | 'oldest' | 'name' | 'starred'>('recent');

  // Multi-Select & Batch Deletion State
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedDiagramIds, setSelectedDiagramIds] = useState<Set<string>>(new Set());
  const [isBatchDeleting, setIsBatchDeleting] = useState<boolean>(false);
  const [showBatchDeleteModal, setShowBatchDeleteModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Preview Modal State
  const [activeModalCanvas, setActiveModalCanvas] = useState<CanvasDiagramItem | null>(null);
  const [modalVersions, setModalVersions] = useState<DiagramVersionItem[]>([]);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>(0);
  const [isLoadingVersions, setIsLoadingVersions] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  // Starred Canvases
  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('promptcanvas_starred_canvases');
        if (saved) return new Set(JSON.parse(saved));
      } catch (e) {}
    }
    return new Set<string>();
  });

  const toggleStar = (diagramId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredIds(prev => {
      const next = new Set(prev);
      if (next.has(diagramId)) {
        next.delete(diagramId);
      } else {
        next.add(diagramId);
      }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('promptcanvas_starred_canvases', JSON.stringify(Array.from(next)));
        } catch (e) {}
      }
      return next;
    });
  };

  // Initialize active studio from URL query
  useEffect(() => {
    const studioParam = searchParams.get('studio');
    if (studioParam === 'studio' || studioParam === 'studio1' || studioParam === 'studio2' || studioParam === 'studio3' || studioParam === 'canonical') {
      setActiveStudioTab(studioParam as StudioTabKey);
    }
  }, [searchParams]);

  // Auth Fetch
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

  // Fetch all diagrams
  const fetchAllCanvases = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/diagrams', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) throw new Error('Failed to fetch diagrams');
      const data: CanvasDiagramItem[] = await res.json();
      setDiagrams(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching library canvases:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    fetchAllCanvases();
  }, [fetchAllCanvases]);

  // Single Item Delete
  const handleDeleteSingle = async (diagram: CanvasDiagramItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm(`Are you sure you want to delete "${diagram.name}"? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/diagrams/${diagram.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Delete failed');
      }
      setDiagrams(prev => prev.filter(d => d.id !== diagram.id));
      setSelectedDiagramIds(prev => {
        const next = new Set(prev);
        next.delete(diagram.id);
        return next;
      });
      if (activeModalCanvas?.id === diagram.id) {
        setActiveModalCanvas(null);
      }
      showToast(`🗑️ Deleted "${diagram.name}"`);
    } catch (err) {
      console.error('Failed to delete diagram:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete diagram');
    }
  };

  // Batch Selection Helpers
  const toggleSelectDiagram = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDiagramIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAllFiltered = () => {
    const allIds = new Set(filteredDiagrams.map(d => d.id));
    setSelectedDiagramIds(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedDiagramIds(new Set());
  };

  // Execute Batch Delete
  const handleExecuteBatchDelete = async () => {
    const idsToDelete = Array.from(selectedDiagramIds);
    if (idsToDelete.length === 0) return;

    setIsBatchDeleting(true);
    try {
      const res = await fetch('/api/diagrams/batch-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsToDelete })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Batch delete failed');
      }

      const result = await res.json();
      const count = result.deletedCount || idsToDelete.length;

      setDiagrams(prev => prev.filter(d => !selectedDiagramIds.has(d.id)));
      setSelectedDiagramIds(new Set());
      setShowBatchDeleteModal(false);
      setIsSelectMode(false);
      showToast(`🗑️ Successfully deleted ${count} architecture diagram(s)!`);
      
      // Re-fetch to ensure 100% database synchronicity
      await fetchAllCanvases();
    } catch (err) {
      console.error('Failed batch delete:', err);
      alert(err instanceof Error ? err.message : 'Batch delete failed');
    } finally {
      setIsBatchDeleting(false);
    }
  };

  // Clone / Duplicate Diagram
  const handleCloneDiagram = async (diagram: CanvasDiagramItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      let xmlToClone = diagram.xml_content;
      if (!xmlToClone) {
        const fullRes = await fetch(`/api/diagrams/${diagram.id}`);
        const fullData = await fullRes.json();
        xmlToClone = fullData.xml_content || fullData.versions?.[0]?.xml_content || '';
      }

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${diagram.name || 'Architecture'} (Clone)`,
          architecture_type: diagram.architecture_type || 'custom',
          created_studio: diagram.created_studio || 'studio1',
          xml_content: xmlToClone
        })
      });
      const newDiag = await res.json();
      if (newDiag && (newDiag.id || newDiag.diagram?.id)) {
        showToast(`📋 Cloned "${diagram.name}"`);
        await fetchAllCanvases();
      }
    } catch (err) {
      console.error('Failed to clone diagram:', err);
    }
  };

  // Open Preview Modal
  const handleOpenPreviewModal = async (diagram: CanvasDiagramItem) => {
    setActiveModalCanvas(diagram);
    setIsLoadingVersions(true);
    try {
      const res = await fetch(`/api/diagrams/${diagram.id}`);
      if (res.ok) {
        const fullData = await res.json();
        const vers: DiagramVersionItem[] = fullData.versions || [];
        if (vers.length > 0) {
          const sorted = [...vers].sort((a, b) => b.version_number - a.version_number);
          setModalVersions(sorted);
          setSelectedVersionIndex(0);
        } else {
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
      }
    } catch (err) {
      console.error('Failed to load version details:', err);
    } finally {
      setIsLoadingVersions(false);
    }
  };

  const handleCopyXml = (xml: string) => {
    navigator.clipboard.writeText(xml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

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

  // Categorize Diagrams by Studio
  const getStudioCategory = (d: CanvasDiagramItem): StudioTabKey => {
    if (d.id.startsWith('bp_') || (d.architecture_type && d.architecture_type.startsWith('canonical_'))) {
      return 'canonical';
    }
    const raw = (d.created_studio || '').toLowerCase();
    if (raw === 'studio' || raw === 'studio_pro' || raw === 'launch_studio') return 'studio';
    if (raw === 'studio2') return 'studio2';
    if (raw === 'studio3') return 'studio3';
    if (d.architecture_type && d.architecture_type.includes('studio3')) return 'studio3';
    if (d.name && d.name.toLowerCase().includes('studio 2')) return 'studio2';
    if (d.name && d.name.toLowerCase().includes('studio 3')) return 'studio3';
    return 'studio1';
  };

  // Studio Counts
  const studioCounts = useMemo(() => {
    const counts = {
      all: diagrams.length,
      studio: 0,
      studio1: 0,
      studio2: 0,
      studio3: 0,
      canonical: 0
    };
    diagrams.forEach(d => {
      const cat = getStudioCategory(d);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [diagrams]);

  // Filtered and Sorted Diagrams
  const filteredDiagrams = useMemo(() => {
    let list = [...diagrams];

    // Studio Tab Filter
    if (activeStudioTab !== 'all') {
      list = list.filter(d => getStudioCategory(d) === activeStudioTab);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(d => {
        const name = (d.name || '').toLowerCase();
        const arch = (d.architecture_type || '').toLowerCase();
        const prompt = (d.latest_prompt || '').toLowerCase();
        const id = (d.id || '').toLowerCase();

        if (q === 'prompt' || q === 'canvas' || q === 'diagram' || q === 'architecture') return true;
        if (q === 'ai' || q === 'ml') return name.includes('ai') || name.includes('ml') || arch.includes('ai') || arch.includes('rag') || arch.includes('llm') || prompt.includes('ai');
        if (q === 'rag') return name.includes('rag') || arch.includes('rag') || prompt.includes('rag') || name.includes('agentic');
        if (q === 'lakehouse' || q === 'lake') return name.includes('lake') || arch.includes('lake') || prompt.includes('lake') || arch.includes('medallion');
        if (q === 'erd' || q === 'database' || q === 'db') return name.includes('erd') || arch.includes('erd') || name.includes('schema') || arch.includes('data');
        if (q === 'sequence' || q === 'flow') return name.includes('sequence') || arch.includes('sequence') || prompt.includes('step');
        if (q === 'aws') return name.includes('aws') || arch.includes('aws') || prompt.includes('aws');
        if (q === 'gcp' || q === 'google') return name.includes('gcp') || arch.includes('gcp') || prompt.includes('gcp');
        if (q === 'security') return name.includes('secur') || arch.includes('secur') || prompt.includes('security');

        return name.includes(q) || arch.includes(q) || prompt.includes(q) || id.includes(q);
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

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'starred') {
        const aStarred = starredIds.has(a.id) ? 1 : 0;
        const bStarred = starredIds.has(b.id) ? 1 : 0;
        return bStarred - aStarred;
      }
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
  }, [diagrams, activeStudioTab, searchQuery, selectedPhase, sortBy, starredIds]);

  const activeVersion = modalVersions[selectedVersionIndex] || null;

  return (
    <div className={`flex h-screen w-screen font-sans overflow-hidden select-none transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#070A13] text-slate-100'
    }`}>
      
      {/* Sidebar Navigation */}
      <UnifiedAppSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        
        {/* Top Navbar */}
        <header className={`h-14 border-b flex items-center justify-between px-4 md:px-8 backdrop-blur-md gap-3 shrink-0 z-30 transition-colors ${
          isLight ? 'border-slate-200 bg-white/95 text-slate-900 shadow-sm' : 'border-slate-800/80 bg-[#090D16]/90 text-white'
        }`}>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3 shrink-0 min-w-0">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className={`flex items-center gap-2 text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <Link href="/" className={`font-extrabold flex items-center gap-1.5 ${isLight ? 'text-slate-900 hover:text-teal-600' : 'text-white hover:text-teal-300'}`}>
                <span>PromptCanvas</span>
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Architecture Library</span>
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* Multi-Select Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                if (isSelectMode) setSelectedDiagramIds(new Set());
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelectMode
                  ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
              title="Toggle multi-select mode for batch deletion"
            >
              {isSelectMode ? <CheckSquare className="w-3.5 h-3.5 text-white" /> : <Square className="w-3.5 h-3.5" />}
              <span>{isSelectMode ? 'Exit Selection' : 'Select Canvases'}</span>
            </button>

            {/* Refresh */}
            <button
              onClick={fetchAllCanvases}
              disabled={isLoading}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
              title="Refresh Architecture Library"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
            </button>

            <ThemeToggleBtn id="library-theme-toggle-btn" />

            <Link
              href="/studio"
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5 shrink-0"
              title="Launch Multi-Diagram AI Studio"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Studio</span>
            </Link>
          </div>
        </header>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 right-6 z-50 bg-slate-900 text-white border border-teal-500/50 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Scrollable Content */}
        <main className="flex-1 w-full overflow-y-auto relative z-10 custom-scrollbar pb-24">
          <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-8 space-y-5">
            
            {/* Title Block & KPI Strip */}
            <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
              <div className="space-y-1 flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                  <LayoutGrid className="w-3 h-3" />
                  <span>Architecture Library &amp; Repositories</span>
                </div>
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Enterprise Architecture <span className="bg-gradient-to-r from-teal-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Library</span>
                </h1>
                <p className={`text-xs sm:text-sm leading-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Browse, filter, preview, and batch-manage architectures across all studios with zero confusion and instant vector rendering.
                </p>
              </div>

              {/* KPI Strip */}
              <div className="flex items-center gap-4 p-2 px-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                <div className="text-center px-1.5">
                  <div className="text-lg font-black text-teal-600 dark:text-teal-400">{diagrams.length}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Total Canvases</div>
                </div>
                <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="text-center px-1.5">
                  <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">{studioCounts.studio}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Studio Pro</div>
                </div>
                <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="text-center px-1.5">
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{studioCounts.studio1}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Studio 1 Lab</div>
                </div>
                <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="text-center px-1.5">
                  <div className="text-lg font-black text-amber-600 dark:text-amber-400">{studioCounts.canonical}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Blueprints</div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* STUDIO TABS (PROMINENT STUDIO SWITCHER) */}
            {/* ========================================================================= */}
            <div className="flex flex-wrap items-center gap-2 border-b pb-4 border-slate-200 dark:border-slate-800">
              {[
                { id: 'all', label: '🌐 All Architecture', count: studioCounts.all, color: 'teal' },
                { id: 'studio', label: '💎 Studio (Pro Multi-Diagram)', count: studioCounts.studio, color: 'indigo' },
                { id: 'studio1', label: '🧪 Studio 1 (Lab & Single)', count: studioCounts.studio1, color: 'emerald' },
                { id: 'studio2', label: '🤖 Studio 2 (Multi-Agent)', count: studioCounts.studio2, color: 'purple' },
                { id: 'studio3', label: '📐 Studio 3 (First-Principles)', count: studioCounts.studio3, color: 'amber' },
                { id: 'canonical', label: '📚 52 Canonical Blueprints', count: studioCounts.canonical, color: 'sky' }
              ].map((tab) => {
                const isActive = activeStudioTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveStudioTab(tab.id as StudioTabKey);
                      setSelectedDiagramIds(new Set());
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      isActive
                        ? isLight
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                          : 'bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/20 scale-[1.02]'
                        : isLight
                        ? 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border-slate-800'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold ${
                      isActive
                        ? isLight ? 'bg-white/20 text-white' : 'bg-black/20 text-slate-950'
                        : isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ========================================================================= */}
            {/* SEARCH & REFINEMENT TOOLBAR */}
            {/* ========================================================================= */}
            <div className={`space-y-3 p-4 rounded-2xl border backdrop-blur-sm ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800/80'
            }`}>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Search Box */}
                <div className="relative w-full lg:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by canvas title, prompt, keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full border rounded-xl pl-10 pr-12 py-2.5 text-xs transition font-medium focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-500'
                        : 'bg-slate-950 border-slate-700/80 text-slate-100 placeholder-slate-500 focus:border-teal-400'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                  {/* Phase Chips */}
                  <div className={`inline-flex items-center p-1 rounded-xl border text-xs font-bold ${
                    isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
                  }`}>
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'P1', label: 'P1' },
                      { id: 'P2', label: 'P2' },
                      { id: 'P3', label: 'P3' },
                      { id: 'P4', label: 'P4' },
                      { id: 'P5', label: 'P5' },
                      { id: 'IND', label: 'Industry' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPhase(p.id)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          selectedPhase === p.id
                            ? isLight ? 'bg-white text-teal-700 font-extrabold shadow-sm border border-slate-200' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                            : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Sort By Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={`border text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-teal-500'
                        : 'bg-slate-950 border-slate-700/80 text-slate-200 focus:border-teal-400'
                    }`}
                  >
                    <option value="recent">⚡ Most Recent</option>
                    <option value="starred">⭐ Starred First</option>
                    <option value="versions">🏆 Most Versions</option>
                    <option value="oldest">📅 Oldest First</option>
                    <option value="name">🔤 Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Popular Topics */}
              <div className={`flex flex-wrap items-center gap-1.5 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800/60'}`}>
                <span className={`text-[11px] font-bold flex items-center gap-1 mr-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  <Sparkles className="w-3 h-3 text-teal-500" />
                  <span>Popular Topics:</span>
                </span>
                {[
                  { label: 'All', query: '' },
                  { label: '🤖 Agentic RAG', query: 'rag' },
                  { label: '🌊 Lakehouse', query: 'lakehouse' },
                  { label: '🗄️ Dimensional ERD', query: 'erd' },
                  { label: '🔄 Sequence Flow', query: 'sequence' },
                  { label: '☁️ AWS', query: 'aws' },
                  { label: '🌐 GCP', query: 'gcp' },
                  { label: '🛡️ PCI-DSS Security', query: 'security' },
                  { label: '💳 FinTech', query: 'fintech' },
                  { label: '🛒 Retail', query: 'retail' }
                ].map((chip) => {
                  const isSelected = searchQuery.toLowerCase() === chip.query.toLowerCase();
                  return (
                    <button
                      key={chip.label}
                      onClick={() => setSearchQuery(chip.query)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer border ${
                        isSelected 
                          ? isLight ? 'bg-teal-50 text-teal-800 border-teal-300 font-bold' : 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold' 
                          : isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* CARDS GRID */}
            {/* ========================================================================= */}
            <div>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
                  <span className="text-sm font-semibold">Loading architecture library from database...</span>
                </div>
              ) : filteredDiagrams.length === 0 ? (
                <div className={`border rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12 ${
                  isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900/40 border-slate-800'
                }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${isLight ? 'bg-teal-50 text-teal-600' : 'bg-teal-500/15 text-teal-400'}`}>
                    <Layers className="w-7 h-7" />
                  </div>
                  <h3 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    No architectures found in this tab
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    No diagrams match your current filter or studio selection.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStudioTab('all');
                        setSearchQuery('');
                        setSelectedPhase('all');
                      }}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      View All Architecture ({diagrams.length})
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredDiagrams.map((diagram) => {
                    const archMeta = getArchitectureTypeById(diagram.architecture_type || '');
                    const verCount = diagram.version_count || diagram.versions?.length || 1;
                    const dateStr = diagram.updated_at || diagram.created_at;
                    const isStarred = starredIds.has(diagram.id);
                    const isSelected = selectedDiagramIds.has(diagram.id);

                    // Studio Category & Badging
                    const studioCategory = getStudioCategory(diagram);
                    
                    const studioBadgeConfigMap: Record<string, { label: string; style: string; btnStyle: string; actionLabel: string; route: string }> = {
                      studio: {
                        label: 'Studio (Pro)',
                        style: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
                        btnStyle: 'bg-indigo-600 hover:bg-indigo-500 text-white',
                        actionLabel: 'Open in Studio',
                        route: `/studio?diagram=${diagram.id}`
                      },
                      studio1: {
                        label: 'Studio 1 (Lab)',
                        style: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
                        btnStyle: 'bg-teal-600 hover:bg-teal-500 text-white',
                        actionLabel: 'Open in Studio 1',
                        route: `/studio1?diagram=${diagram.id}`
                      },
                      studio2: {
                        label: 'Studio 2 (Agents)',
                        style: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
                        btnStyle: 'bg-purple-600 hover:bg-purple-500 text-white',
                        actionLabel: 'Open in Studio 2',
                        route: `/studio2?diagram=${diagram.id}`
                      },
                      studio3: {
                        label: 'Studio 3 (Graph)',
                        style: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
                        btnStyle: 'bg-amber-600 hover:bg-amber-500 text-white',
                        actionLabel: 'Open in Studio 3',
                        route: `/workspace?diagram=${diagram.id}&tab=editor`
                      },
                      canonical: {
                        label: 'Canonical Blueprint',
                        style: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
                        btnStyle: 'bg-sky-600 hover:bg-sky-500 text-white',
                        actionLabel: 'Open Blueprint',
                        route: `/canonical`
                      }
                    };

                    const studioBadgeConfig = studioBadgeConfigMap[studioCategory] || studioBadgeConfigMap.studio1;

                    return (
                      <div
                        key={diagram.id}
                        onClick={() => {
                          if (isSelectMode) {
                            toggleSelectDiagram(diagram.id);
                          }
                        }}
                        className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group relative overflow-hidden ${
                          isSelected
                            ? 'ring-2 ring-teal-500 bg-teal-500/10 border-teal-500 shadow-md'
                            : isLight
                            ? isStarred
                              ? 'border-amber-400 bg-amber-50/20 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-teal-400 shadow-sm'
                            : isStarred
                            ? 'border-amber-500/50 bg-slate-900/90 hover:shadow-teal-500/5'
                            : 'border-slate-800 bg-slate-900/70 hover:border-teal-500/50 hover:shadow-teal-500/5'
                        } ${isSelectMode ? 'cursor-pointer' : ''}`}
                      >
                        <div>
                          {/* Top Strip: Checkbox (Select Mode), Studio Badge, Arch Type, Privacy & Star */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                              {/* Selection Checkbox */}
                              {(isSelectMode || selectedDiagramIds.size > 0) && (
                                <button
                                  type="button"
                                  onClick={(e) => toggleSelectDiagram(diagram.id, e)}
                                  className="p-1 rounded-lg text-teal-600 dark:text-teal-400 hover:scale-110 transition-transform cursor-pointer"
                                >
                                  {isSelected ? (
                                    <CheckSquare className="w-4 h-4 fill-teal-500 text-white dark:text-slate-950" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-400" />
                                  )}
                                </button>
                              )}

                              {/* Studio Origin Pill */}
                              <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-md border ${studioBadgeConfig.style}`}>
                                {studioBadgeConfig.label}
                              </span>

                              {/* Architecture Type Pill */}
                              <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md border truncate max-w-[130px] ${
                                isLight
                                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                                  : 'bg-slate-800 text-slate-300 border-slate-700'
                              }`}>
                                {archMeta?.name || diagram.architecture_type || 'Custom Canvas'}
                              </span>
                            </div>

                            {/* Privacy & Star Toggle */}
                            <div className="flex items-center gap-2">
                              {diagram.is_private ? (
                                <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                                  <Lock className="w-3 h-3" /> Private
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                  <Globe className="w-3 h-3" /> Public
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={(e) => toggleStar(diagram.id, e)}
                                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                                title={isStarred ? 'Unstar Canvas' : 'Star Canvas'}
                              >
                                <Star className={`w-4 h-4 transition-all ${
                                  isStarred ? 'fill-amber-400 text-amber-400 scale-110' : 'text-slate-400 hover:text-amber-300'
                                }`} />
                              </button>
                            </div>
                          </div>

                          {/* Canvas Title */}
                          <h3 className={`text-base md:text-lg font-bold transition-colors line-clamp-2 mb-2 ${
                            isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'
                          }`}>
                            {diagram.name}
                          </h3>

                          {/* Prompt / Description Snippet */}
                          <p className={`text-xs line-clamp-2 mb-4 italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            &quot;{diagram.latest_prompt || archMeta?.whenToUse || 'Pristine architectural canvas with continuous version history.'}&quot;
                          </p>

                          {/* Version Count & Last Modified Timestamp */}
                          <div className={`rounded-xl p-3 border mb-4 flex items-center justify-between text-xs font-mono ${
                            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800/60'
                          }`}>
                            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300">
                              <History className="w-3.5 h-3.5 text-indigo-500" />
                              <span className="font-bold">{verCount} Version{verCount > 1 ? '' : ''}</span>
                              {diagram.max_version && diagram.max_version > 1 && (
                                <span className="text-[10px] text-slate-400">(Max v{diagram.max_version})</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{new Date(dateStr).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Toolbar */}
                        <div className={`pt-3.5 border-t flex flex-col gap-2 ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
                          <div className="flex items-center gap-2">
                            {/* Launch Native Studio */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(studioBadgeConfig.route);
                              }}
                              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 ${studioBadgeConfig.btnStyle}`}
                              title={studioBadgeConfig.actionLabel}
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{studioBadgeConfig.actionLabel}</span>
                            </button>

                            {/* Preview Modal */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPreviewModal(diagram);
                              }}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                                isLight
                                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                              }`}
                              title="Preview all version snapshots"
                            >
                              <Eye className="w-3.5 h-3.5 text-teal-500" />
                              <span>Preview</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Workspace */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/workspace?diagram=${diagram.id}&tab=editor`);
                              }}
                              className={`flex-1 py-1.5 px-2.5 rounded-lg border text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                                isLight ? 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800' : 'bg-teal-950/50 hover:bg-teal-900 border-teal-800 text-teal-300'
                              }`}
                              title="Open full editable canvas in Draw.io workspace"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Workspace</span>
                            </button>

                            {/* Clone */}
                            <button
                              type="button"
                              onClick={(e) => handleCloneDiagram(diagram, e)}
                              className={`p-1.5 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                                isLight ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800' : 'bg-amber-950/50 hover:bg-amber-900 border-amber-800 text-amber-300'
                              }`}
                              title="Clone / Duplicate this Canvas"
                            >
                              <CopyPlus className="w-3.5 h-3.5" />
                              <span>Clone</span>
                            </button>

                            {/* Single Delete */}
                            <button
                              type="button"
                              onClick={(e) => handleDeleteSingle(diagram, e)}
                              className={`p-1.5 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                                isLight ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-800' : 'bg-red-950/50 hover:bg-red-900 border-red-800 text-red-300'
                              }`}
                              title="Delete Canvas"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </main>

        {/* ========================================================================= */}
        {/* STICKY BOTTOM BATCH ACTION BAR (WHEN ITEMS ARE SELECTED) */}
        {/* ========================================================================= */}
        {selectedDiagramIds.size > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-teal-500/40 text-white px-6 py-3.5 rounded-3xl shadow-2xl backdrop-blur-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 pr-2 border-r border-slate-700">
              <CheckSquare className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-black">
                {selectedDiagramIds.size} Canvas{selectedDiagramIds.size > 1 ? 'es' : ''} Selected
              </span>
            </div>

            <button
              type="button"
              onClick={handleSelectAllFiltered}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
            >
              Select All ({filteredDiagrams.length})
            </button>

            <button
              type="button"
              onClick={handleDeselectAll}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              Deselect All
            </button>

            <button
              type="button"
              onClick={() => setShowBatchDeleteModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected ({selectedDiagramIds.size})</span>
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* BATCH DELETE CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {showBatchDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#0B111E] border border-red-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-white">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black">Confirm Batch Deletion</h3>
                <p className="text-xs text-slate-400">This action permanently deletes diagrams from database</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white font-bold">{selectedDiagramIds.size}</strong> selected architecture canvas{selectedDiagramIds.size > 1 ? 'es' : ''}? All version snapshots and XML models will be removed.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowBatchDeleteModal(false)}
                disabled={isBatchDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteBatchDelete}
                disabled={isBatchDeleting}
                className="px-5 py-2 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                {isBatchDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Permanently Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE PREVIEW MODAL */}
      {/* ========================================================================= */}
      {activeModalCanvas && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in">
          <div className="bg-[#0B0F19] border border-slate-700 rounded-3xl w-full max-w-[1500px] h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black truncate max-w-xl text-white">
                    {activeModalCanvas.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{getArchitectureTypeById(activeModalCanvas.architecture_type || '')?.name || activeModalCanvas.architecture_type}</span>
                    <span>&bull;</span>
                    <span>{modalVersions.length} Version{modalVersions.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeVersion && (
                  <>
                    <button
                      onClick={() => handleCopyXml(activeVersion.xml_content)}
                      className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-200 hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedXml ? 'Copied!' : 'Copy XML'}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadXml(activeModalCanvas.name, activeVersion.version_number, activeVersion.xml_content)}
                      className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-200 hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-400" />
                      <span>Download .drawio</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => setActiveModalCanvas(null)}
                  className="p-1.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Viewport */}
            <div className="flex-1 overflow-hidden relative bg-[#070A13]">
              {isLoadingVersions ? (
                <div className="h-full flex items-center justify-center gap-3 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
                  <span className="text-xs">Loading version XML...</span>
                </div>
              ) : activeVersion ? (
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <DiagramViewer
                    xml={activeVersion.xml_content}
                    aspectRatioId="16:9"
                    bgTheme="dark"
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                  No XML content available for this canvas.
                </div>
              )}
            </div>

            {/* Modal Footer: Version Selector */}
            <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-300">Active Version:</span>
                <select
                  value={selectedVersionIndex}
                  onChange={(e) => setSelectedVersionIndex(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer"
                >
                  {modalVersions.map((v, idx) => (
                    <option key={v.id} value={idx}>
                      Version {v.version_number} &bull; {v.comment || 'Snapshot'} ({new Date(v.created_at).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    router.push(`/workspace?diagram=${activeModalCanvas.id}&tab=editor`);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Editor in Workspace</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function ArchitectureLibraryPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex items-center justify-center bg-[#070A13] text-teal-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <ArchitectureLibraryContent />
    </Suspense>
  );
}
