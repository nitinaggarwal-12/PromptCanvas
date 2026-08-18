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
  Menu
} from 'lucide-react';
import { getArchitectureTypeById, getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import { sanitizeDrawioXmlAttributes } from '@/lib/diagramCleaner';
import DiagramViewer from '@/components/DiagramViewer';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { UseCaseIntakeModal } from '@/components/UseCaseIntakeModal';
import { AccessRequestsInbox } from '@/components/AccessRequestsInbox';
import { BlueprintCatalogModal } from '@/components/workspace/BlueprintCatalogModal';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';

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
  is_starred?: boolean;
}

export default function CanvasHistoryPage() {
  const router = useRouter();

  // Layout & Navigation State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
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

  // State
  const [diagrams, setDiagrams] = useState<CanvasDiagramItem[]>([]);
  const [scopeTab, setScopeTab] = useState<'my_canvases' | 'community'>('my_canvases');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedArchFilter, setSelectedArchFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'versions' | 'oldest' | 'name' | 'starred'>('recent');

  // Starred Canvases Set (Local state persisted across session)
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

  // Executive Playbook Modal State (Moved from Workspace to History Page)
  const [isPlaybookModalOpen, setIsPlaybookModalOpen] = useState<boolean>(false);

  // Preview Modal State
  const [activeModalCanvas, setActiveModalCanvas] = useState<CanvasDiagramItem | null>(null);
  const [modalVersions, setModalVersions] = useState<DiagramVersionItem[]>([]);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>(0);
  const [isLoadingVersions, setIsLoadingVersions] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  // Check Auth State
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
      fetchAllCanvases();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

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
    checkAuth();
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
    if (diagramId) {
      router.push(`/workspace?diagram=${diagramId}&tab=editor`);
    } else if (archType) {
      router.push(`/workspace?blueprint=${archType}&tab=editor`);
    } else {
      router.push(`/workspace?tab=editor`);
    }
  };

  // User's own diagrams
  const myCanvasesList = useMemo(() => {
    return diagrams.filter(d => {
      if (user?.id && (d as any).user_id === user.id) return true;
      if (user?.email && (d as any).created_by === user.email) return true;
      if (starredIds.has(d.id)) return true;
      return false;
    });
  }, [diagrams, user, starredIds]);

  // Filtered and Sorted Canvases
  const filteredDiagrams = useMemo(() => {
    const baseSource = scopeTab === 'my_canvases' ? myCanvasesList : diagrams;
    let list = [...baseSource];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(d => {
        const name = (d.name || '').toLowerCase();
        const arch = (d.architecture_type || '').toLowerCase();
        const prompt = (d.latest_prompt || '').toLowerCase();
        const id = (d.id || '').toLowerCase();

        // Intelligent semantic matching for common architecture concepts
        if (q === 'prompt' || q === 'canvas' || q === 'diagram' || q === 'architecture') return true;
        if (q === 'ai' || q === 'ml') return name.includes('ai') || name.includes('ml') || arch.includes('ai') || arch.includes('rag') || arch.includes('llm') || prompt.includes('ai') || prompt.includes('model');
        if (q === 'rag') return name.includes('rag') || arch.includes('rag') || prompt.includes('rag') || name.includes('agentic');
        if (q === 'lakehouse' || q === 'lake') return name.includes('lake') || arch.includes('lake') || prompt.includes('lake') || arch.includes('medallion');
        if (q === 'erd' || q === 'database' || q === 'db' || q === 'schema') return name.includes('erd') || arch.includes('erd') || name.includes('schema') || arch.includes('data') || prompt.includes('database');
        if (q === 'sequence' || q === 'flow') return name.includes('sequence') || arch.includes('sequence') || prompt.includes('step') || prompt.includes('flow');
        if (q === 'aws') return name.includes('aws') || arch.includes('aws') || prompt.includes('aws') || arch.includes('ind');
        if (q === 'gcp' || q === 'google') return name.includes('gcp') || arch.includes('gcp') || prompt.includes('gcp') || name.includes('google') || !name.toLowerCase().includes('aws');
        if (q === 'security' || q === 'pci' || q === 'pci-dss' || q === 'soc2') return name.includes('secur') || arch.includes('secur') || prompt.includes('pci') || prompt.includes('security') || arch.includes('p4');

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

    // Architecture Type Filter
    if (selectedArchFilter !== 'all') {
      list = list.filter(d => (d.architecture_type || '') === selectedArchFilter);
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
  }, [diagrams, myCanvasesList, scopeTab, searchQuery, selectedPhase, selectedArchFilter, sortBy, starredIds]);

  // Summary Metrics
  const totalCanvases = diagrams.length;
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const totalVersions = useMemo(() => {
    return diagrams.reduce((sum, d) => sum + (d.version_count || d.versions?.length || 1), 0);
  }, [diagrams]);

  const maxVersionDepth = useMemo(() => {
    return diagrams.reduce((max, d) => Math.max(max, d.max_version || d.versions?.length || 1), 1);
  }, [diagrams]);

  const activeVersion = modalVersions[selectedVersionIndex] || null;

  return (
    <div className={`flex h-screen w-screen font-sans overflow-hidden select-none selection:bg-teal-500/30 selection:text-teal-200 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#070a13] text-slate-100'
    }`}>
      
      {/* ========================================================================= */}
      {/* 1. UNIFIED APP COLLAPSIBLE LEFT SIDEBAR (Desktop) */}
      {/* ========================================================================= */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } hidden lg:flex border-r transition-all duration-300 flex-col justify-between z-40 shrink-0 relative select-none ${
          isLight ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-[#090d16]/95 border-panel-border/80 text-slate-100'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className={`h-14 border-b flex items-center justify-between px-4 shrink-0 ${isLight ? 'border-slate-200' : 'border-panel-border/40'}`}>
            {isSidebarOpen ? (
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-400 to-indigo-500 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center">
                  <div className={`w-full h-full rounded-[6px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#070a13]'}`}>
                    <Sparkles className="w-4 h-4 text-teal-accent" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`font-extrabold tracking-wider text-xs uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>Prompt Canvas</span>
                  <span className="text-[9px] text-teal-600 dark:text-teal-accent font-semibold tracking-wider">Enterprise AI</span>
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
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-hover text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Zone: Primary Creation CTA */}
          <div className={`p-3 border-b relative shrink-0 ${isLight ? 'border-slate-200' : 'border-panel-border/30'}`}>
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
              { id: 'templates', name: 'Templates Gallery', icon: LayoutGrid, href: '/workspace?tab=templates' },
              { id: 'history', name: 'Historical Canvases', icon: History, href: '/history' },
              { id: 'dashboard', name: 'Operations Dashboard', icon: BarChart3, href: '/dashboard' },
              { id: 'audit', name: 'Security Audit', icon: ShieldCheck, href: '/workspace?tab=audit' },
              { id: 'guide', name: 'User Guide & Playbooks', icon: BookOpen, href: '/guide', badge: 'NEW' },
              { id: 'walkthrough', name: 'Interactive Tour', icon: Compass, href: '/workspace?tour=true' },
              { id: 'settings', name: 'Settings & AI Tier Config', icon: Settings, href: '/workspace?tab=settings' }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = item.id === 'history';

              return (
                <Link key={item.id} href={item.href} className="block">
                  <div className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-teal-accent text-bg-dark font-extrabold shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-bg-dark' : 'text-slate-400'}`} />
                      {isSidebarOpen && <span className="truncate">{item.name}</span>}
                    </div>
                    {isSidebarOpen && (item as any).badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-400 border border-teal-500/30">
                        {(item as any).badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Sidebar: User Profile & Expand Toggle */}
        <div className={`p-3 border-t ${isLight ? 'border-slate-200 bg-slate-50' : 'border-panel-border/30 bg-slate-950/40'}`}>
          {!isSidebarOpen ? (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-full flex justify-center p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : user ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition cursor-pointer ${
                isLight ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-900' : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-xs shrink-0">
                  {(user.name || user.email)[0].toUpperCase()}
                </div>
                <div className="truncate">
                  <p className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{user.name || user.email}</p>
                  <p className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">{user.is_guest ? 'Guest Session' : 'Verified Pro'}</p>
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className={`w-full py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-teal-800' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-teal-300'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Profile</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile/Tablet Slide-Out Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-72 max-w-[85vw] bg-[#090d16] border-r border-panel-border h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div>
              {/* Header */}
              <div className="h-16 flex items-center justify-between px-4 border-b border-panel-border shrink-0">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-accent" />
                  <span className="font-bold text-base tracking-wider bg-gradient-to-r from-teal-accent to-cyan-400 bg-clip-text text-transparent">
                    PROMPT CANVAS
                  </span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  title="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Button */}
              <div className="p-3 border-b border-panel-border/30">
                <Link
                  href="/workspace?new=true"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-black text-xs cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>New Architecture</span>
                </Link>
              </div>

              {/* Nav Links */}
              <div className="p-3 space-y-1">
                {[
                  { id: 'editor', name: 'Design Canvas', icon: Network, href: '/workspace' },
                  { id: 'templates', name: 'Templates Gallery', icon: LayoutGrid, href: '/workspace?tab=templates' },
                  { id: 'history', name: 'Historical Canvases', icon: History, href: '/history' },
                  { id: 'dashboard', name: 'Operations Dashboard', icon: BarChart3, href: '/dashboard' },
                  { id: 'audit', name: 'Security Audit', icon: ShieldCheck, href: '/workspace?tab=audit' },
                  { id: 'guide', name: 'User Guide & Playbooks', icon: BookOpen, href: '/guide', badge: 'NEW' },
                  { id: 'walkthrough', name: 'Interactive Tour', icon: Compass, href: '/workspace?tour=true' },
                  { id: 'settings', name: 'Settings & AI Tier Config', icon: Settings, href: '/workspace?tab=settings' }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === 'history';

                  return (
                    <Link 
                      key={item.id} 
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive 
                          ? 'bg-teal-accent text-bg-dark font-extrabold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-bg-dark' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Profile / User */}
            <div className="p-3 border-t border-panel-border/30 bg-slate-950/60">
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsProfileModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-left cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">
                    {(user.name || user.email)[0].toUpperCase()}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-200 truncate">{user.name || user.email}</p>
                    <p className="text-[10px] text-teal-400 font-mono">{user.is_guest ? 'Guest Session' : 'Verified Pro'}</p>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-teal-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In / Profile</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN APPLICATION CONTAINER */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        
        {/* ========================================================================= */}
        {/* TOP NAVBAR HEADER */}
        {/* ========================================================================= */}
        <header className={`h-14 border-b flex items-center justify-between px-3 sm:px-4 md:px-8 backdrop-blur-md gap-3 relative shrink-0 z-30 transition-colors ${
          isLight ? 'border-slate-200 bg-white/95 text-slate-900 shadow-sm' : 'border-panel-border/80 bg-[#090d16]/90 text-white'
        }`}>
          {/* Left: Breadcrumbs & Sidebar Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-1.5 rounded-lg border shrink-0 cursor-pointer ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-panel-border text-slate-300 hover:text-teal-400'
              }`}
              title="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className={`hidden lg:flex p-1.5 rounded-lg text-slate-400 cursor-pointer ${
                  isLight ? 'hover:bg-slate-100 hover:text-slate-900' : 'hover:bg-slate-800 hover:text-white'
                }`}
                title="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            
            <div className={`flex items-center gap-2 text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <Link href="/" className={`font-extrabold transition-colors flex items-center gap-1.5 ${isLight ? 'text-slate-900 hover:text-teal-600' : 'text-white hover:text-teal-300'}`} title="Return to Home Landing Page">
                <span>PromptCanvas</span>
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Historical Canvases &amp; Snapshots</span>
                <span className="sm:hidden">History</span>
              </span>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2.5">
            <ThemeToggleBtn id="history-theme-toggle-btn" />

            {/* User Guide & GIFs Button */}
            <Link
              href="/guide"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-600 dark:text-teal-300 font-bold text-xs transition-all shadow-sm cursor-pointer hover:scale-[1.02]"
              title="Watch Interactive Persona Workflows & Video Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-500 dark:text-teal-400" />
              <span>User Guide &amp; GIFs</span>
            </Link>

            {/* Blueprint Matrix Button */}
            <button
              onClick={() => setIsPlaybookModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-600 dark:text-amber-300 font-bold text-xs transition-all shadow-sm cursor-pointer hover:scale-[1.02]"
              title="Open Strategic Blueprint Catalog & Matrix"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Blueprint Matrix</span>
            </button>

            {/* Guided Architecture Wizard Button */}
            <button
              type="button"
              onClick={() => setIsUseCaseModalOpen(true)}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-xs transition-all cursor-pointer shadow-sm ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-teal-800 border-slate-300'
                  : 'bg-slate-900 hover:bg-slate-800 text-teal-300 border-teal-500/30 hover:border-teal-400'
              }`}
              title="Open Guided Architecture Intake Wizard"
            >
              <ClipboardList className="w-3.5 h-3.5 text-teal-500 dark:text-teal-400" />
              <span>Architecture Wizard</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={fetchAllCanvases}
              disabled={isLoading}
              className={`p-1.5 rounded-xl border transition cursor-pointer ${
                isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-teal-300'
              }`}
              title="Refresh Historical Canvases"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
            </button>

            {/* + New Architecture Button */}
            <Link
              href="/workspace?new=true"
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-[#070a13] font-black text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] flex items-center gap-1.5 shrink-0"
              title="Create a New Architecture from AI Prompt"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>New Architecture</span>
            </Link>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* DISMISSIBLE GUEST MODE WARNING DISCLAIMER BANNER WITH X BUTTON */}
        {/* ========================================================================= */}
        {user?.is_guest && !isGuestDisclaimerDismissed && (
          <div className={`w-full border-b py-2.5 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm backdrop-blur-md z-40 shrink-0 animate-fade-in ${
            isLight
              ? 'bg-amber-50/95 border-amber-300 text-amber-950 shadow-sm'
              : 'bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-indigo-500/15 border-amber-500/30 text-amber-200'
          }`}>
            <div className="flex items-center gap-2 font-medium min-w-0">
              <ShieldAlert className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
              <span className="truncate sm:whitespace-normal">
                <strong className={`font-bold ${isLight ? 'text-amber-950 font-black' : 'text-amber-300'}`}>Guest Mode Disclaimer:</strong>{' '}
                <span className={isLight ? 'text-amber-900 font-medium' : 'text-amber-200'}>
                  Content created as a Guest is visible to all users unless deleted.
                </span>
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
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  isLight
                    ? 'hover:bg-amber-200/60 text-amber-800 hover:text-amber-950'
                    : 'hover:bg-amber-500/20 text-amber-300 hover:text-white'
                }`}
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
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none z-0" />

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-10 space-y-6 sm:space-y-8 relative z-10">
            
            {/* KPI & Title Header */}
            <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold">
                  <History className="w-3.5 h-3.5" />
                  <span>Historical Canvases &amp; Version Snapshots</span>
                </div>
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Canvas Version <span className="bg-gradient-to-r from-teal-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Archive &amp; Tiles</span>
                </h1>
                <p className={`text-xs md:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Browse and inspect every historical canvas, architecture blueprint, and iterative snapshot created since project inception with instant vector preview, version time-travel, and star bookmarks.
                </p>
              </div>

              {/* KPI Stats Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 shrink-0">
                <div className={`p-4 rounded-2xl flex flex-col justify-center shadow-lg border ${
                  isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/80 border-slate-800 text-white'
                }`}>
                  <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Total Canvases</span>
                  <span className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-0.5">{totalCanvases}</span>
                </div>
                <div className={`p-4 rounded-2xl flex flex-col justify-center shadow-lg border ${
                  isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/80 border-slate-800 text-white'
                }`}>
                  <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Saved Versions</span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">{totalVersions}</span>
                </div>
                <div className={`p-4 rounded-2xl flex flex-col justify-center shadow-lg border ${
                  isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/80 border-slate-800 text-white'
                }`}>
                  <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Max Version Depth</span>
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">v{maxVersionDepth}</span>
                </div>
              </div>
            </div>

            {/* PRIMARY SCOPE TAB SWITCHER */}
            <div className="flex flex-wrap items-center gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
              <button
                type="button"
                id="scope-my-canvases-btn"
                onClick={() => setScopeTab('my_canvases')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  scopeTab === 'my_canvases'
                    ? isLight
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                      : 'bg-teal-500 text-[#070A13] border-teal-400 shadow-lg shadow-teal-500/20'
                    : isLight
                    ? 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700'
                }`}
              >
                <User className="w-4 h-4" />
                <span>My Workspace Canvases ({myCanvasesList.length})</span>
              </button>

              <button
                type="button"
                id="scope-community-btn"
                onClick={() => setScopeTab('community')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  scopeTab === 'community'
                    ? isLight
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                    : isLight
                    ? 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Community Showcase &amp; 50 Blueprints ({diagrams.length})</span>
              </button>
            </div>

            {/* Search & Filter Toolbar */}
            <div className={`space-y-3 p-4 rounded-2xl border backdrop-blur-sm ${
              isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900/60 border-slate-800/80'
            }`}>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative w-full lg:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by canvas name, prompt, architecture..."
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

                {/* Filter Chips & Sort Controls */}
                <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                  {/* Phase Filters */}
                  <div className={`inline-flex items-center p-1 rounded-xl border text-xs font-bold ${
                    isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
                  }`}>
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
                            ? isLight ? 'bg-white text-teal-700 font-extrabold shadow-sm border border-slate-200' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                            : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
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
              </div>

              {/* Quick Search Chips Strip */}
              <div className={`flex flex-wrap items-center gap-1.5 pt-1 border-t ${isLight ? 'border-slate-200' : 'border-slate-800/60'}`}>
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

          {/* Historical Canvas Tiles Grid */}
          <div>
            {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
            <span className="text-sm font-semibold">Loading historical canvases from database...</span>
          </div>
        ) : filteredDiagrams.length === 0 ? (
          <div className={`border rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12 ${
            isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900/40 border-slate-800'
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${isLight ? 'bg-teal-50 text-teal-600' : 'bg-teal-500/15 text-teal-400'}`}>
              <Layers className="w-7 h-7" />
            </div>
            <h3 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {scopeTab === 'my_canvases' ? 'No Canvases in Your Workspace Yet' : 'No matching canvases found'}
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {scopeTab === 'my_canvases'
                ? "You haven't generated or saved any custom diagrams in this workspace yet. Start with an AI prompt or explore the 50 enterprise reference blueprints."
                : `No diagrams matched your search filter "${searchQuery}". Try resetting your filters.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/workspace?new=true"
                className="px-5 py-2.5 bg-teal-accent hover:bg-teal-hover text-bg-dark font-black text-xs rounded-xl transition shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Create First Architecture</span>
              </Link>
              {scopeTab === 'my_canvases' ? (
                <button
                  type="button"
                  onClick={() => setScopeTab('community')}
                  className={`px-5 py-2.5 rounded-xl border font-bold text-xs transition cursor-pointer ${
                    isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  Browse 50 Blueprints ({diagrams.length})
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPhase('all');
                    setSelectedArchFilter('all');
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDiagrams.map((diagram, idx) => {
              const archMeta = getArchitectureTypeById(diagram.architecture_type || '');
              const verCount = diagram.version_count || diagram.versions?.length || 1;
              const dateStr = diagram.updated_at || diagram.created_at;
              const isStarred = starredIds.has(diagram.id);

              return (
                <div
                  key={diagram.id}
                  className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group relative overflow-hidden ${
                    isLight
                      ? isStarred
                        ? 'border-amber-400 bg-amber-50/20 shadow-md'
                        : 'border-slate-200 bg-white hover:border-teal-400 shadow-sm'
                      : isStarred
                      ? 'border-amber-500/50 bg-slate-900/90 hover:shadow-teal-500/5'
                      : 'border-slate-800 bg-slate-900/70 hover:border-teal-500/50 hover:shadow-teal-500/5'
                  }`}
                >
                  {/* Top Header Strip with Star Icon */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-md border truncate max-w-[180px] ${
                        isLight
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-teal-950/80 text-teal-300 border border-teal-800/80'
                      }`}>
                        {archMeta?.name || diagram.architecture_type || 'Custom Canvas'}
                      </span>
                      
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
                        
                        {/* ONLY STAR ICON BUTTON */}
                        <button
                          type="button"
                          onClick={(e) => toggleStar(diagram.id, e)}
                          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                          title={isStarred ? "Starred Master Blueprint (Click to Unstar)" : "Star as Master Template"}
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

                    {/* Description or Prompt Snippet */}
                    <p className={`text-xs line-clamp-2 mb-4 italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      &quot;{diagram.latest_prompt || archMeta?.whenToUse || 'Pristine architectural canvas with continuous version history.'}&quot;
                    </p>

                    {/* Version & Date Metadata */}
                    <div className={`rounded-xl p-3 border mb-5 flex items-center justify-between text-xs font-mono ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800/60'
                    }`}>
                      <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300">
                        <History className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="font-bold">{verCount} Version{verCount > 1 ? 's' : ''}</span>
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

                  {/* Action Buttons */}
                  <div className={`pt-4 border-t flex items-center justify-between gap-3 ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
                    <button
                      onClick={() => handleOpenPreviewModal(diagram)}
                      className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-teal-500" />
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
          </div>

        </div>
      </main>
    </div>

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

                    {/* Interactive Vector Canvas Viewport */}
                    <div className="flex-1 relative bg-white overflow-hidden">
                      <DiagramViewer
                        key={`${activeModalCanvas.id}_v${activeVersion.version_number}`}
                        xml={activeVersion.xml_content || getDefaultXmlForArchitecture(activeModalCanvas.architecture_type || 'unified_system_view') || ''}
                        diagramId={activeModalCanvas.id}
                        versionId={activeVersion.id}
                        bgTheme="light"
                        diagramType={activeModalCanvas.architecture_type || 'unified_system_view'}
                        useCaseName={activeModalCanvas.name}
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

      {/* ========================================================================= */}
      {/* 5. STRATEGIC BLUEPRINT MATRIX & GOVERNANCE CATALOG MODAL */}
      <BlueprintCatalogModal
        isOpen={isPlaybookModalOpen}
        onClose={() => setIsPlaybookModalOpen(false)}
        onSelectBlueprint={(blueprintId) => {
          setIsPlaybookModalOpen(false);
          router.push(`/workspace?blueprint=${blueprintId}&tab=editor`);
        }}
        isLight={isLight}
      />

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
            fetchAllCanvases();
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

    </div>
  );
}
