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
import {
  PRECOMPILED_SAMPLE_BLUEPRINTS,
  getCustomVisionBlueprints,
  deleteCustomVisionBlueprint,
  batchDeleteCustomVisionBlueprints,
  getDeletedVisionBlueprintIds,
  getSelfHealedGeminiEnterpriseBlueprint,
  getSelfHealedAzureLandingZoneBlueprint,
  getSelfHealedAgenticAiBlueprint,
} from '@/lib/visionBlueprintStore';
import DiagramViewer from '@/components/DiagramViewer';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import { generateUpgradedGcpGeBankingArchitectureXml } from '@/lib/canonical/upgradedGcpGeBankingAgentTemplate';

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

type StudioTabKey = 'all' | 'studio' | 'studio1' | 'canonical' | 'vision';

function ArchitectureLibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  // Content locked to light theme (white cards, clean grids) while top header is dark
  const isLight = true;

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
  const [rightFilterTag, setRightFilterTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'versions' | 'oldest' | 'name' | 'starred'>('recent');

  // Multi-Select, Single-Delete Guardrail & Cloning State
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedDiagramIds, setSelectedDiagramIds] = useState<Set<string>>(new Set());
  const [isBatchDeleting, setIsBatchDeleting] = useState<boolean>(false);
  const [showBatchDeleteModal, setShowBatchDeleteModal] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [cloningId, setCloningId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Full-Page Preview / Hover State
  const [activeModalCanvas, setActiveModalCanvas] = useState<CanvasDiagramItem | null>(null);
  const [hoveredDiagramId, setHoveredDiagramId] = useState<string | null>(null);
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

  // Initialize active studio, filter tag, search, phase, and sort from URL query (UX-09)
  useEffect(() => {
    const studioParam = searchParams.get('studio');
    if (studioParam === 'all' || studioParam === 'studio' || studioParam === 'studio1' || studioParam === 'canonical' || studioParam === 'vision') {
      setActiveStudioTab(studioParam as StudioTabKey);
    }
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      setRightFilterTag(filterParam);
    }
    const qParam = searchParams.get('q');
    if (qParam !== null) {
      setSearchQuery(qParam);
    }
    const phaseParam = searchParams.get('phase');
    if (phaseParam) {
      setSelectedPhase(phaseParam);
    }
    const sortParam = searchParams.get('sort');
    if (sortParam === 'recent' || sortParam === 'versions' || sortParam === 'oldest' || sortParam === 'name' || sortParam === 'starred') {
      setSortBy(sortParam);
    }
  }, [searchParams]);

  // Persist filter/search/sort state into URL query string without navigation reload (UX-09)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (activeStudioTab !== 'all') params.set('studio', activeStudioTab);
    else params.delete('studio');
    if (rightFilterTag !== 'all') params.set('filter', rightFilterTag);
    else params.delete('filter');
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    else params.delete('q');
    if (selectedPhase !== 'all') params.set('phase', selectedPhase);
    else params.delete('phase');
    if (sortBy !== 'recent') params.set('sort', sortBy);
    else params.delete('sort');

    const qs = params.toString();
    const nextUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    if (nextUrl !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [activeStudioTab, rightFilterTag, searchQuery, selectedPhase, sortBy]);

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

  // Build Vision Saved Library items (Google Multiagent AI System 87, VIS-1787, VIS-3093, etc.)
  const buildVisionSavedLibraryItems = useCallback((): CanvasDiagramItem[] => {
    const deletedSet = new Set(getDeletedVisionBlueprintIds().map(id => id.toUpperCase()));
    const items: CanvasDiagramItem[] = [];
    const seen = new Set<string>();

    const BASELINE_REF_TIMESTAMP = '2026-08-15T12:00:00.000Z';

    // 0. 2026 Upgraded GCP & Gemini Enterprise Multi-Agent Banking Architecture (L2/L3 Uncluttered Blueprint)
    if (!deletedSet.has('GCP-GE-BANKING-2026')) {
      seen.add('GCP-GE-BANKING-2026');
      items.push({
        id: 'GCP-GE-BANKING-2026',
        name: '2026 Upgraded GCP & Gemini Enterprise Multi-Agent Banking Architecture',
        architecture_type: 'vision_gcp_multiagent',
        created_studio: 'vision',
        created_at: '2026-09-30T12:00:00.000Z',
        updated_at: '2026-09-30T12:00:00.000Z',
        version_count: 1,
        latest_prompt: 'Upgraded L2/L3 Multi-Agent Banking Architecture using Gemini Enterprise, Vertex AI Agent Engine, Google ADK, LangGraph, A2A & MCP Protocols, Gemini 3.1 Pro / 2.5 Flash, vLLM on GKE, Model Armor & SDP, Vector Search 2.0 + Valkey, and OTel GenAI FinOps.',
        xml_content: generateUpgradedGcpGeBankingArchitectureXml(),
      });
    }

    // 1. Official Precompiled Sample Blueprints (e.g. GCP-MULTIAGENT-01: Google Multiagent AI System)
    for (const sample of PRECOMPILED_SAMPLE_BLUEPRINTS) {
      if (deletedSet.has(sample.id.toUpperCase())) continue;
      seen.add(sample.id.toUpperCase());
      items.push({
        id: sample.id,
        name: `${sample.title} (87 Objects)`,
        architecture_type: 'vision_gcp_multiagent',
        created_studio: 'vision',
        created_at: BASELINE_REF_TIMESTAMP,
        updated_at: BASELINE_REF_TIMESTAMP,
        version_count: 1,
        latest_prompt: sample.desc,
        xml_content: sample.getPrecompiledXml(),
      });
    }

    // 2. Custom & Certified Vision Blueprints (VIS-1787, VIS-9745, VIS-AGENTIC-01, etc.)
    seen.add('VIS-3093');
    seen.add('VIS-5965');
    const presetVisionItems = [
      getSelfHealedGeminiEnterpriseBlueprint('VIS-1787'),
      getSelfHealedAzureLandingZoneBlueprint('VIS-9745'),
      getSelfHealedAgenticAiBlueprint('VIS-AGENTIC-01'),
      ...getCustomVisionBlueprints(),
    ];

    for (const v of presetVisionItems) {
      const upperId = v.id.toUpperCase();
      if (deletedSet.has(upperId) || seen.has(upperId)) continue;
      seen.add(upperId);
      const isBuiltInPreset = ['VIS-1787', 'VIS-3093', 'VIS-9745', 'VIS-5965', 'VIS-AGENTIC-01'].includes(upperId);
      const itemTs = !isBuiltInPreset && v.timestamp ? new Date(v.timestamp).toISOString() : BASELINE_REF_TIMESTAMP;
      items.push({
        id: v.id,
        name: v.title.startsWith(v.id) ? v.title : `${v.id} ${v.title}`,
        architecture_type: v.id.startsWith('VIS-1787') || v.id.startsWith('VIS-3093')
          ? 'vision_gemini_enterprise'
          : 'vision_decompiled',
        created_studio: 'vision',
        created_at: itemTs,
        updated_at: itemTs,
        version_count: 1,
        latest_prompt: v.summaryText || v.desc || v.category,
        xml_content: v.xml,
      });
    }

    return items;
  }, []);

  // Fetch all diagrams
  const fetchAllCanvases = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/diagrams', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      const apiData: CanvasDiagramItem[] = res.ok ? await res.json() : [];
      const dbList: CanvasDiagramItem[] = (Array.isArray(apiData) ? apiData : []).map((d: any) => ({
        ...d,
        latest_prompt: d.latest_prompt || d.prompt || d.technical_usecase || d.business_usecase || '',
      }));

      // Read user-saved projects from localStorage (saved from Dashboard Session Copy or Studio)
      let localSavedItems: CanvasDiagramItem[] = [];
      if (typeof window !== 'undefined') {
        try {
          const rawSaved = JSON.parse(localStorage.getItem('promptcanvas_saved_blueprints') || '[]');
          if (Array.isArray(rawSaved)) {
            localSavedItems = rawSaved.map((item: any) => {
              let fullPayload: any = null;
              try {
                fullPayload = JSON.parse(localStorage.getItem(`promptcanvas_studio_${item.id}`) || 'null');
              } catch {}
              return {
                id: item.id,
                name: item.name || 'Saved Project',
                architecture_type: item.architecture_type || 'gcp_enterprise_reference',
                created_studio: item.created_studio || 'studio',
                created_at: item.createdAt || item.updatedAt || new Date().toISOString(),
                updated_at: item.updatedAt || new Date().toISOString(),
                version_count: fullPayload?.versions?.length || item.versionCount || 1,
                latest_prompt: item.description || fullPayload?.description || 'Saved from User Session Copy',
                xml_content: item.xml || fullPayload?.xml || '',
              };
            });
          }
        } catch {}
      }

      const visionSavedItems = buildVisionSavedLibraryItems();

      const canonicalFallbackItems: CanvasDiagramItem[] = CANONICAL_TEMPLATES.map((tpl) => ({
        id: `bp_${tpl.id}`,
        name: `#${tpl.id} • ${tpl.name}`,
        architecture_type: `canonical_${tpl.id}`,
        created_studio: 'canonical',
        created_at: '2026-08-10T12:00:00.000Z',
        updated_at: '2026-08-10T12:00:00.000Z',
        version_count: 1,
        latest_prompt: tpl.primaryPurpose || tpl.examples,
        xml_content: tpl.generateXml('biopharma', 'light'),
      }));

      const existingIds = new Set(dbList.map(d => d.id.toUpperCase()));
      const existingNames = new Set(dbList.map(d => (d.name || '').toLowerCase().trim()));
      const uniqueLocalSaved = localSavedItems.filter(
        l => !existingIds.has(l.id.toUpperCase()) && !existingNames.has((l.name || '').toLowerCase().trim())
      );

      const merged = [
        ...uniqueLocalSaved,
        ...dbList,
        ...visionSavedItems.filter(v => !existingIds.has(v.id.toUpperCase())),
      ];
      const mergedIds = new Set(merged.map(d => d.id.toUpperCase()));
      for (const c of canonicalFallbackItems) {
        if (!mergedIds.has(c.id.toUpperCase())) {
          merged.push(c);
          mergedIds.add(c.id.toUpperCase());
        }
      }
      setDiagrams(merged);
    } catch (err) {
      console.error('Error fetching library canvases:', err);
      setDiagrams(buildVisionSavedLibraryItems());
    } finally {
      setIsLoading(false);
    }
  }, [buildVisionSavedLibraryItems]);

  useEffect(() => {
    checkAuth();
    fetchAllCanvases();
  }, [fetchAllCanvases]);

  // Single Item Delete (with two-step inline confirmation guardrail UX-12)
  const handleDeleteSingle = async (diagram: CanvasDiagramItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      if (diagram.id.startsWith('VIS-') || diagram.id.startsWith('GCP-') || diagram.created_studio === 'vision') {
        deleteCustomVisionBlueprint(diagram.id);
      }
      if (typeof window !== 'undefined') {
        try {
          const rawSaved = JSON.parse(localStorage.getItem('promptcanvas_saved_blueprints') || '[]');
          if (Array.isArray(rawSaved)) {
            const nextSaved = rawSaved.filter((item: any) => item.id !== diagram.id && item.name !== diagram.name);
            localStorage.setItem('promptcanvas_saved_blueprints', JSON.stringify(nextSaved));
          }
          localStorage.removeItem(`promptcanvas_studio_${diagram.id}`);
        } catch {}
      }
      await fetch(`/api/diagrams/${diagram.id}`, { method: 'DELETE' }).catch(() => {});
      setDiagrams(prev => prev.filter(d => d.id !== diagram.id));
      setSelectedDiagramIds(prev => {
        const next = new Set(prev);
        next.delete(diagram.id);
        return next;
      });
      if (activeModalCanvas?.id === diagram.id) {
        setActiveModalCanvas(null);
      }
      setConfirmDeleteId(null);
      showToast(`🗑️ Deleted "${diagram.name}"`);
    } catch (err) {
      console.error('Failed to delete diagram:', err);
      showToast(err instanceof Error ? err.message : 'Failed to delete diagram');
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
      const visionIds = idsToDelete.filter(id => id.startsWith('VIS-') || id.startsWith('GCP-') || id.startsWith('vision_'));
      if (visionIds.length > 0) {
        batchDeleteCustomVisionBlueprints(visionIds);
      }

      if (typeof window !== 'undefined') {
        try {
          const deleteSet = new Set(idsToDelete);
          for (const id of idsToDelete) {
            localStorage.removeItem(`promptcanvas_studio_${id}`);
          }
          const rawSaved = localStorage.getItem('promptcanvas_saved_blueprints');
          if (rawSaved) {
            const parsedSaved = JSON.parse(rawSaved);
            if (Array.isArray(parsedSaved)) {
              localStorage.setItem(
                'promptcanvas_saved_blueprints',
                JSON.stringify(parsedSaved.filter((item: any) => !deleteSet.has(item?.id)))
              );
            }
          }
        } catch {}
      }

      const res = await fetch('/api/diagrams/batch-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsToDelete })
      });

      const result = res.ok ? await res.json().catch(() => ({})) : {};
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
      showToast(err instanceof Error ? err.message : 'Batch delete failed');
    } finally {
      setIsBatchDeleting(false);
    }
  };

  // Clone / Duplicate Diagram (with double-submit disabled lock UX-10 / UX-28)
  const handleCloneDiagram = async (diagram: CanvasDiagramItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (cloningId === diagram.id) return;
    setCloningId(diagram.id);
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
    } finally {
      setCloningId(null);
    }
  };

  // Open Preview Modal
  const handleOpenPreviewModal = async (diagram: CanvasDiagramItem) => {
    setActiveModalCanvas(diagram);
    setIsLoadingVersions(true);
    try {
      // 1. Check localStorage studio/dashboard project payload first for rich multi-version history
      if (typeof window !== 'undefined') {
        try {
          const localRaw = localStorage.getItem(`promptcanvas_studio_${diagram.id}`);
          if (localRaw) {
            const parsedLocal = JSON.parse(localRaw);
            if (Array.isArray(parsedLocal?.versions) && parsedLocal.versions.length > 0) {
              const total = parsedLocal.versions.length;
              const mappedLocalVersions: DiagramVersionItem[] = parsedLocal.versions.map((v: any, idx: number) => ({
                id: v.id || `ver_${diagram.id}_${total - idx}`,
                diagram_id: diagram.id,
                version_number: total - idx,
                xml_content: v.xml || diagram.xml_content || '',
                comment: `${v.versionTag || `v1.${total - idx - 1}`} — ${v.diffSummary || v.actionSummary || v.prompt || 'Session Snapshot'}`,
                created_by: v.persona || v.author || v.sourceLabel || 'Session Copy',
                created_at: parsedLocal.updatedAt || diagram.created_at,
                architecture_type: diagram.architecture_type
              }));
              setModalVersions(mappedLocalVersions);
              setSelectedVersionIndex(0);
              return;
            }
          }
        } catch {}
      }

      const res = await fetch(`/api/diagrams/${diagram.id}`);
      if (res.ok) {
        const fullData = await res.json();
        const vers: DiagramVersionItem[] = fullData.versions || [];
        if (vers.length > 0) {
          const sorted = [...vers].sort((a, b) => b.version_number - a.version_number);
          setModalVersions(sorted);
          setSelectedVersionIndex(0);
          return;
        }
      }
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
    } catch (err) {
      console.error('Failed to load version details:', err);
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
    if (
      raw === 'vision' ||
      d.id.startsWith('vision_') ||
      d.id.startsWith('VIS-') ||
      d.id.startsWith('GCP-') ||
      (d.architecture_type && d.architecture_type.includes('vision'))
    ) {
      return 'vision';
    }
    const archLower = (d.architecture_type || '').toLowerCase();
    if (
      raw === 'prompt_lab' ||
      /^p[1-7](_|$)/i.test(d.id) ||
      /^p[1-7](_|$)/i.test(archLower) ||
      archLower.startsWith('matrix_')
    ) {
      return 'studio1';
    }
    return 'studio';
  };

  // Resolve real rendered diagram thumbnail for any Library tile
  const getDiagramThumbnail = (d: CanvasDiagramItem): string => {
    const idStr = d.id || '';
    const archStr = (d.architecture_type || '').toLowerCase();
    const nameStr = (d.name || '').toLowerCase();
    const promptStr = (d.latest_prompt || '').toLowerCase();
    const combined = `${nameStr} ${archStr} ${promptStr}`;

    if (idStr.startsWith('bp_') || idStr.startsWith('canonical_') || archStr.startsWith('canonical_')) {
      const rawNum = idStr.replace(/^(bp_|canonical_)/i, '') || archStr.replace(/^canonical_/i, '');
      const num = parseInt(rawNum, 10);
      if (!isNaN(num) && num >= 0 && num <= 74) {
        return `/templates/canonical_${String(num).padStart(2, '0')}.png`;
      }
    }
    if (idStr === 'GCP-GE-BANKING-2026' || idStr === 'GCP-MULTIAGENT-01' || combined.includes('2026 upgraded gcp') || combined.includes('multi-agent banking')) {
      return '/templates/canonical_00.png';
    }
    if (combined.includes('clinical') || combined.includes('fhir') || combined.includes('healthcare')) {
      return d.created_studio === 'canonical' ? '/templates/canonical_01.png' : '/templates/canonical_68.png';
    }
    if (idStr.includes('1787') || idStr.includes('3093') || combined.includes('gemini enterprise')) {
      return '/templates/canonical_53.png';
    }
    if (idStr.includes('9745') || combined.includes('landing zone')) {
      return '/templates/canonical_15.png';
    }
    if (idStr.includes('AGENTIC') || combined.includes('agentic')) {
      return '/templates/canonical_39.png';
    }
    if (combined.includes('rag')) return '/templates/canonical_38.png';
    if (combined.includes('lakehouse') || combined.includes('medallion')) return '/templates/canonical_22.png';
    if (combined.includes('erd') || combined.includes('schema')) return '/templates/canonical_14.png';
    if (combined.includes('sequence')) return '/templates/canonical_11.png';
    if (combined.includes('swimlane')) return '/templates/canonical_03.png';
    if (combined.includes('security') || combined.includes('threat') || combined.includes('zero-trust')) return '/templates/canonical_28.png';
    if (combined.includes('finops')) return '/templates/canonical_48.png';

    // Deterministic hash fallback across all 75 real canonical thumbnails so every custom tile gets a rich diagram preview
    let hash = 0;
    const seed = `${idStr}:${nameStr}`;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const idx = hash % 75;
    return `/templates/canonical_${String(idx).padStart(2, '0')}.png`;
  };

  // Studio Counts
  const studioCounts = useMemo(() => {
    const counts = {
      all: diagrams.length,
      studio: 0,
      studio1: 0,
      canonical: 0,
      vision: 0
    };
    diagrams.forEach(d => {
      const cat = getStudioCategory(d);
      if (cat in counts) {
        counts[cat as keyof typeof counts] = (counts[cat as keyof typeof counts] || 0) + 1;
      }
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

    // Right Filter Dropdown Tag
    if (rightFilterTag !== 'all') {
      list = list.filter(d => {
        const cat = getStudioCategory(d);
        const upperId = (d.id || '').toUpperCase();
        const nameLower = (d.name || '').toLowerCase();
        const archLower = (d.architecture_type || '').toLowerCase();
        if (rightFilterTag === 'vision_saved') return cat === 'vision';
        if (rightFilterTag === 'gcp_multiagent') return upperId.includes('MULTIAGENT') || nameLower.includes('multiagent');
        if (rightFilterTag === 'gemini_enterprise') return upperId.includes('1787') || upperId.includes('3093') || nameLower.includes('gemini enterprise') || archLower.includes('gemini_enterprise');
        if (rightFilterTag === 'vision_landing_agentic') return upperId.includes('9745') || upperId.includes('AGENTIC') || nameLower.includes('landing zone') || nameLower.includes('agentic ai architecture');
        if (rightFilterTag === 'studio_pro') return cat === 'studio';
        if (rightFilterTag === 'studio1_lab') return cat === 'studio1';
        if (rightFilterTag === 'canonical_50') return cat === 'canonical';
        return true;
      });
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
  }, [diagrams, activeStudioTab, rightFilterTag, searchQuery, selectedPhase, sortBy, starredIds]);

  // Modal Prev / Next Navigation across filteredDiagrams
  const currentModalIndex = useMemo(() => {
    if (!activeModalCanvas) return -1;
    return filteredDiagrams.findIndex(d => d.id === activeModalCanvas.id);
  }, [activeModalCanvas, filteredDiagrams]);

  const prevModalDiagram = useMemo(() => {
    if (filteredDiagrams.length <= 1 || currentModalIndex < 0) return null;
    const prevIdx = currentModalIndex > 0 ? currentModalIndex - 1 : filteredDiagrams.length - 1;
    return filteredDiagrams[prevIdx] || null;
  }, [currentModalIndex, filteredDiagrams]);

  const nextModalDiagram = useMemo(() => {
    if (filteredDiagrams.length <= 1 || currentModalIndex < 0) return null;
    const nextIdx = currentModalIndex < filteredDiagrams.length - 1 ? currentModalIndex + 1 : 0;
    return filteredDiagrams[nextIdx] || null;
  }, [currentModalIndex, filteredDiagrams]);

  // Keyboard & Iframe Key Navigation for Preview Modal (Escape to close, ArrowLeft / ArrowRight for Prev/Next)
  useEffect(() => {
    if (!showBatchDeleteModal && !activeModalCanvas) return;
    const handleKeyAction = (key: string, e?: KeyboardEvent) => {
      if (key === 'Escape') {
        e?.preventDefault();
        if (showBatchDeleteModal) {
          setShowBatchDeleteModal(false);
        } else if (activeModalCanvas) {
          setActiveModalCanvas(null);
        }
      } else if (activeModalCanvas && !showBatchDeleteModal) {
        if (e && (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement)) {
          return;
        }
        if (key === 'ArrowLeft' && prevModalDiagram) {
          e?.preventDefault();
          handleOpenPreviewModal(prevModalDiagram);
        } else if (key === 'ArrowRight' && nextModalDiagram) {
          e?.preventDefault();
          handleOpenPreviewModal(nextModalDiagram);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyAction(e.key, e);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PROMPTCANVAS_IFRAME_KEY' && typeof event.data.key === 'string') {
        handleKeyAction(event.data.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('message', handleMessage);
    };
  }, [showBatchDeleteModal, activeModalCanvas, prevModalDiagram, nextModalDiagram]);

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
        <AppHeader>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3 shrink-0 min-w-0">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(true);
                window.dispatchEvent(new CustomEvent('promptcanvas_toggle_sidebar'));
              }}
              aria-label="Open navigation menu"
              className="lg:hidden min-w-[40px] min-h-[40px] flex items-center justify-center p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Link href="/" className="font-extrabold flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
                <span>PromptCanvas</span>
              </Link>
              <span className="text-slate-500" aria-hidden="true">/</span>
              <span className="text-teal-400 font-bold flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
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
              aria-pressed={isSelectMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                isSelectMode
                  ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
              title="Toggle multi-select mode for batch deletion"
            >
              {isSelectMode ? <CheckSquare className="w-3.5 h-3.5 text-white" /> : <Square className="w-3.5 h-3.5" />}
              <span>{isSelectMode ? 'Exit Selection' : 'Select Canvases'}</span>
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={fetchAllCanvases}
              disabled={isLoading}
              aria-busy={isLoading}
              aria-label="Refresh Architecture Library"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center p-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              title="Refresh Architecture Library"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
            </button>

            <ThemeToggleBtn id="library-theme-toggle-btn" />

            <Link
              href="/canonical"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              title={`Open Full-Width ${CANONICAL_TEMPLATES.length} Blueprint Catalog View`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-sky-400" />
              <span>Blueprint Catalog ({CANONICAL_TEMPLATES.length})</span>
            </Link>

            <Link
              href="/studio"
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              title="Launch Multi-Diagram AI Studio"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open in Studio</span>
            </Link>
          </div>
        </AppHeader>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed top-16 right-6 z-50 bg-slate-900 text-white border border-teal-500/50 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2"
          >
            <Sparkles className="w-4 h-4 text-teal-400" aria-hidden="true" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Content: Either Full-Screen Stable Page View (when tile clicked) or Library Grid */}
        {activeModalCanvas ? (
          <main
            data-testid="library-fullpage-view"
            className={`flex-1 w-full overflow-hidden flex flex-col relative z-10 ${
              isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#070A13] text-white'
            }`}
          >
            {/* Full-Page Top Action Header */}
            <div className="px-6 py-3.5 border-b border-slate-800 bg-[#0B111E] text-white flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  id="library-preview-close-btn"
                  type="button"
                  onClick={() => setActiveModalCanvas(null)}
                  aria-label="Back to Library (Escape)"
                  title="Return to Architecture Library Grid (Esc)"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-black flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 text-teal-400" />
                  <span>Back to Library</span>
                </button>

                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0 hidden sm:flex">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      FULL-PAGE TEMPLATE VIEW
                    </span>
                    <h2 id="library-preview-modal-title" className="text-base md:text-lg font-black truncate max-w-2xl text-white">
                      {activeModalCanvas.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                    <span>{getArchitectureTypeById(activeModalCanvas.architecture_type || '')?.name || activeModalCanvas.architecture_type}</span>
                    <span>&bull;</span>
                    <span>{modalVersions.length} Version{modalVersions.length > 1 ? 's' : ''}</span>
                    {(activeVersion?.prompt || activeModalCanvas.latest_prompt) && (
                      <>
                        <span>&bull;</span>
                        <span className="text-teal-300 truncate max-w-xl" title={activeVersion?.prompt || activeModalCanvas.latest_prompt}>
                          &ldquo;{activeVersion?.prompt || activeModalCanvas.latest_prompt}&rdquo;
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Center: Backward / Forward Saved Architecture Navigation */}
              <div
                id="library-preview-nav-bar"
                className="flex items-center gap-1.5 bg-slate-900/95 px-2 py-1.5 rounded-2xl border border-slate-700/90 shadow-inner shrink-0"
              >
                <button
                  id="library-preview-prev-btn"
                  type="button"
                  disabled={!prevModalDiagram}
                  onClick={() => prevModalDiagram && handleOpenPreviewModal(prevModalDiagram)}
                  aria-label="Previous saved architecture"
                  title={prevModalDiagram ? `Previous (←): ${prevModalDiagram.name}` : 'No previous architecture'}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    prevModalDiagram
                      ? 'bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-100 border border-slate-700 cursor-pointer shadow-sm'
                      : 'opacity-35 cursor-not-allowed text-slate-500'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <span
                  id="library-preview-position-badge"
                  className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-slate-950 text-teal-400 border border-slate-800 tabular-nums"
                >
                  {currentModalIndex >= 0 ? `${currentModalIndex + 1} / ${filteredDiagrams.length}` : `1 / ${filteredDiagrams.length}`}
                </span>

                <button
                  id="library-preview-next-btn"
                  type="button"
                  disabled={!nextModalDiagram}
                  onClick={() => nextModalDiagram && handleOpenPreviewModal(nextModalDiagram)}
                  aria-label="Next saved architecture"
                  title={nextModalDiagram ? `Next (→): ${nextModalDiagram.name}` : 'No next architecture'}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    nextModalDiagram
                      ? 'bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-100 border border-slate-700 cursor-pointer shadow-sm'
                      : 'opacity-35 cursor-not-allowed text-slate-500'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeVersion && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCopyXml(activeVersion.xml_content)}
                      className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-200 hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedXml ? 'Copied!' : 'Copy XML'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadXml(activeModalCanvas.name, activeVersion.version_number, activeVersion.xml_content)}
                      className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-200 hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-400" />
                      <span>Download .drawio</span>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const cleanCanonicalId = activeModalCanvas.id.replace(/^(bp_|canonical_)/i, '');
                    if (getStudioCategory(activeModalCanvas) === 'canonical') {
                      router.push(`/studio?blueprint=${encodeURIComponent(cleanCanonicalId)}`);
                    } else {
                      router.push(`/studio?diagram=${encodeURIComponent(activeModalCanvas.id)}`);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Editor in Studio</span>
                </button>
              </div>
            </div>

            {/* Full-Page Body Viewport with Floating Left/Right Navigation Paddles */}
            <div className="flex-1 overflow-hidden relative bg-white">
              {/* Floating Backward (Previous) Paddle */}
              {prevModalDiagram && (
                <button
                  id="library-preview-float-prev"
                  type="button"
                  onClick={() => handleOpenPreviewModal(prevModalDiagram)}
                  aria-label={`Previous architecture: ${prevModalDiagram.name}`}
                  title={`Previous (← Left Arrow): ${prevModalDiagram.name}`}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-slate-900/90 hover:bg-teal-500 text-white hover:text-slate-950 border border-slate-700 shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Floating Forward (Next) Paddle */}
              {nextModalDiagram && (
                <button
                  id="library-preview-float-next"
                  type="button"
                  onClick={() => handleOpenPreviewModal(nextModalDiagram)}
                  aria-label={`Next architecture: ${nextModalDiagram.name}`}
                  title={`Next (→ Right Arrow): ${nextModalDiagram.name}`}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-slate-900/90 hover:bg-teal-500 text-white hover:text-slate-950 border border-slate-700 shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {isLoadingVersions ? (
                <div role="status" aria-live="polite" className="h-full flex items-center justify-center gap-3 text-slate-600 bg-slate-50">
                  <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                  <span className="text-sm font-bold">Loading full-screen architecture canvas...</span>
                </div>
              ) : activeVersion ? (
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <DiagramViewer
                    xml={activeVersion.xml_content}
                    aspectRatioId="16:9"
                    bgTheme="light"
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                  No XML content available for this canvas.
                </div>
              )}
            </div>

            {/* Full-Page Footer: Version Selector & Quick Prev/Next Hints */}
            <div className="px-6 py-3 border-t border-slate-800 bg-[#0B111E] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300 shrink-0">
              <div className="flex items-center gap-3">
                <label htmlFor="library-modal-version-select" className="font-bold text-slate-300">Active Version:</label>
                <select
                  id="library-modal-version-select"
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
                <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-400 ml-2">
                  Use <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono text-[10px]">→</kbd> to switch architectures &bull; <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono text-[10px]">Esc</kbd> to return to Library
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalCanvas(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  ← Back to All Tiles
                </button>
              </div>
            </div>
          </main>
        ) : (
        <main className="flex-1 w-full overflow-y-auto relative z-10 custom-scrollbar pb-24">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 pt-3 pb-6 space-y-3">
            
            {/* Title Block & KPI Strip (Consolidated Compact) */}
            <div className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <h1 className={`text-base sm:text-lg font-black tracking-tight leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Saved Architectures &amp; <span className="bg-gradient-to-r from-teal-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Enterprise Library</span>
                  </h1>
                  <p className={`text-[11px] leading-tight mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Unified repository for My Created &amp; Saved Architectures, Adapted Blueprints, Guided Lifecycle Matrix, Vision Decompilations, and Official Canonical Blueprints ({CANONICAL_TEMPLATES.length}).
                  </p>
                </div>
              </div>

              {/* KPI Strip (Compact Inline Chips) */}
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xs shrink-0 text-xs tabular-nums">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-teal-600 dark:text-teal-400">{diagrams.length}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Total</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">{studioCounts.canonical}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Canonical</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{studioCounts.studio}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Custom/Forked</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{studioCounts.studio1}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Matrix Lab</span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* STUDIO TABS (PROMINENT STUDIO SWITCHER) */}
            {/* ========================================================================= */}
            <div
              role="tablist"
              aria-label="Architecture Studio Categories"
              className="flex flex-wrap items-center gap-2 border-b pb-4 border-slate-200 dark:border-slate-800"
            >
              {[
                { id: 'all', label: '🌐 All Architectures', count: studioCounts.all, color: 'teal' },
                { id: 'studio', label: '💎 My Created & Saved (Studio)', count: studioCounts.studio, color: 'indigo' },
                { id: 'vision', label: '👁️ Vision Decompiled & Upgraded', count: studioCounts.vision, color: 'teal' },
                { id: 'studio1', label: '🧭 Guided Matrix & Lab', count: studioCounts.studio1, color: 'emerald' },
                { id: 'canonical', label: `📚 Official Canonical (${CANONICAL_TEMPLATES.length})`, count: studioCounts.canonical, color: 'sky' }
              ].map((tab) => {
                const isActive = activeStudioTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveStudioTab(tab.id as StudioTabKey);
                      setSelectedDiagramIds(new Set());
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
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
                    <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold tabular-nums ${
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
                  <label htmlFor="library-search-input" className="sr-only">
                    Search architectures by canvas title, prompt, or keywords
                  </label>
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                  <input
                    id="library-search-input"
                    type="search"
                    placeholder="Search by canvas title, prompt, keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full border rounded-xl pl-10 pr-12 py-2.5 text-xs transition font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-500'
                        : 'bg-slate-950 border-slate-700/80 text-slate-100 placeholder-slate-500 focus:border-teal-400'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                      className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                  {/* Phase Chips */}
                  <div
                    role="group"
                    aria-label="Filter by architecture lifecycle phase"
                    className={`inline-flex items-center p-1 rounded-xl border text-xs font-bold ${
                      isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
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
                        type="button"
                        aria-pressed={selectedPhase === p.id}
                        onClick={() => setSelectedPhase(p.id)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                          selectedPhase === p.id
                            ? isLight ? 'bg-white text-teal-700 font-extrabold shadow-sm border border-slate-200' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                            : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Right Filter Dropdown (Saved Library & Blueprint Tags) */}
                  <select
                    data-testid="library-right-filter-dropdown"
                    aria-label="Filter by saved library or blueprint category"
                    value={rightFilterTag}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRightFilterTag(val);
                      if (val === 'vision_saved' || val === 'gcp_multiagent' || val === 'gemini_enterprise' || val === 'vision_landing_agentic') {
                        setActiveStudioTab('vision');
                      }
                    }}
                    className={`border text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-500 ${
                      isLight
                        ? 'bg-teal-50/70 border-teal-300 text-teal-900 focus:border-teal-600'
                        : 'bg-slate-950 border-teal-500/40 text-teal-200 focus:border-teal-400'
                    }`}
                  >
                    <option value="all">📖 All Saved Library &amp; Categories</option>
                    <option value="vision_saved">👁️ Saved Library (Vision Decompiler All)</option>
                    <option value="gcp_multiagent">🤖 Google Multiagent AI System (87)</option>
                    <option value="gemini_enterprise">✨ VIS-1787 / VIS-3093 Gemini Enterprise Agent Platform</option>
                    <option value="vision_landing_agentic">☁️ VIS-9745 Landing Zone &amp; Agentic AI Core</option>
                    <option value="studio_pro">💎 Architecture Studio (Pro)</option>
                    <option value="studio1_lab">🧪 Prompt Lab (Studio 1)</option>
                    <option value="canonical_50">📚 Canonical Reference Blueprints (50)</option>
                  </select>

                  {/* Sort By Dropdown */}
                  <select
                    aria-label="Sort architectures by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={`border text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-500 ${
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
                  <Sparkles className="w-3 h-3 text-teal-500" aria-hidden="true" />
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
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSearchQuery(chip.query)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
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
                <div
                  role="status"
                  aria-live="polite"
                  aria-busy="true"
                  className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-teal-500" aria-hidden="true" />
                  <span className="text-sm font-semibold">Loading architecture library from database...</span>
                </div>
              ) : filteredDiagrams.length === 0 ? (
                <div className={`border rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12 ${
                  isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900/40 border-slate-800'
                }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${isLight ? 'bg-teal-50 text-teal-600' : 'bg-teal-500/15 text-teal-400'}`}>
                    <Layers className="w-7 h-7" />
                  </div>
                  <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    No architectures found in this tab
                  </h2>
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
                        setRightFilterTag('all');
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
                    const isCloning = cloningId === diagram.id;
                    const isConfirmingDelete = confirmDeleteId === diagram.id;
                    const thumbSrc = getDiagramThumbnail(diagram);
                    const isHovered = hoveredDiagramId === diagram.id && !isSelectMode;

                    // Studio Category & Badging
                    const studioCategory = getStudioCategory(diagram);
                    
                    const cleanCanonicalId = diagram.id.replace(/^(bp_|canonical_)/i, '');
                    const studioBadgeConfigMap: Record<string, { label: string; style: string; btnStyle: string; actionLabel: string; route: string }> = {
                      studio: {
                        label: 'My Custom & Forked',
                        style: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
                        btnStyle: 'bg-indigo-600 hover:bg-indigo-500 text-white',
                        actionLabel: 'Open in Studio',
                        route: `/studio?id=${encodeURIComponent(diagram.id)}`
                      },
                      studio1: {
                        label: 'Guided Matrix',
                        style: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
                        btnStyle: 'bg-teal-600 hover:bg-teal-500 text-white',
                        actionLabel: 'Open in Studio',
                        route: `/studio?id=${encodeURIComponent(diagram.id)}`
                      },
                      canonical: {
                        label: 'Canonical Blueprint',
                        style: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
                        btnStyle: 'bg-sky-600 hover:bg-sky-500 text-white',
                        actionLabel: 'Open Blueprint',
                        route: `/canonical/${encodeURIComponent(cleanCanonicalId)}`
                      },
                      vision: {
                        label: 'Vision Decompiler',
                        style: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
                        btnStyle: 'bg-teal-600 hover:bg-teal-500 text-white',
                        actionLabel: 'Open in Vision AI',
                        route: `/vision?id=${encodeURIComponent(diagram.id)}`
                      }
                    };

                    const studioBadgeConfig = studioBadgeConfigMap[studioCategory] || studioBadgeConfigMap.studio1;

                    return (
                      <div
                        key={diagram.id}
                        data-testid={`library-tile-${diagram.id}`}
                        onMouseEnter={() => setHoveredDiagramId(diagram.id)}
                        onMouseLeave={() => setHoveredDiagramId((prev) => (prev === diagram.id ? null : prev))}
                        onClick={() => {
                          if (isSelectMode) {
                            toggleSelectDiagram(diagram.id);
                          } else {
                            handleOpenPreviewModal(diagram);
                          }
                        }}
                        className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group relative cursor-pointer ${
                          isHovered ? 'z-40 ring-2 ring-teal-500 shadow-2xl scale-[1.01]' : 'z-10'
                        } ${
                          isSelected
                            ? 'ring-2 ring-teal-500 bg-teal-500/10 border-teal-500 shadow-md'
                            : isLight
                            ? isStarred
                              ? 'border-amber-400 bg-amber-50/20 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-teal-400 shadow-sm'
                            : isStarred
                            ? 'border-amber-500/50 bg-slate-900/90 hover:shadow-teal-500/5'
                            : 'border-slate-800 bg-slate-900/70 hover:border-teal-500/50 hover:shadow-teal-500/5'
                        }`}
                      >
                        {/* Real Thumbnail Behind the Tile */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
                          <img
                            src={thumbSrc}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
                              isLight ? 'opacity-[0.16] group-hover:opacity-[0.26]' : 'opacity-[0.14] group-hover:opacity-[0.24]'
                            }`}
                          />
                          <div
                            className={`absolute inset-0 ${
                              isLight
                                ? 'bg-gradient-to-b from-white/75 via-white/90 to-white/95'
                                : 'bg-gradient-to-b from-slate-950/75 via-slate-900/90 to-slate-950/95'
                            }`}
                          />
                        </div>

                        <div className="relative z-10">
                          {/* Top Strip: Checkbox (Select Mode), Studio Badge, Arch Type, Privacy & Star */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                              {/* Selection Checkbox */}
                              {(isSelectMode || selectedDiagramIds.size > 0) && (
                                <button
                                  type="button"
                                  onClick={(e) => toggleSelectDiagram(diagram.id, e)}
                                  aria-label={isSelected ? `Deselect ${diagram.name}` : `Select ${diagram.name}`}
                                  aria-pressed={isSelected}
                                  className="p-1.5 rounded-lg text-teal-600 dark:text-teal-400 hover:scale-110 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
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
                                <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                                  <Lock className="w-3 h-3" aria-hidden="true" /> Private
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                                  <Globe className="w-3 h-3" aria-hidden="true" /> Public
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={(e) => toggleStar(diagram.id, e)}
                                aria-label={isStarred ? `Unstar ${diagram.name}` : `Star ${diagram.name}`}
                                aria-pressed={isStarred}
                                className="min-w-[32px] min-h-[32px] flex items-center justify-center p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                title={isStarred ? 'Unstar Canvas' : 'Star Canvas'}
                              >
                                <Star className={`w-4 h-4 transition-all ${
                                  isStarred ? 'fill-amber-400 text-amber-400 scale-110' : 'text-slate-400 hover:text-amber-300'
                                }`} />
                              </button>
                            </div>
                          </div>

                          {/* Crisp Real Diagram Thumbnail Preview Box inside Tile */}
                          <div
                            data-testid={`library-tile-thumb-${diagram.id}`}
                            className={`relative w-full h-44 mb-3 rounded-xl overflow-hidden border transition-all ${
                              isLight
                                ? 'bg-white border-slate-200/90 group-hover:border-teal-400 shadow-xs'
                                : 'bg-slate-950 border-slate-800 group-hover:border-teal-500/50'
                            }`}
                          >
                            <img
                              src={thumbSrc}
                              alt={diagram.name}
                              loading="lazy"
                              className="w-full h-full object-contain p-1.5 bg-white transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/85 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs opacity-90 group-hover:bg-teal-600 transition-colors">
                              <Eye className="w-3 h-3" />
                              <span>Click for Full Page</span>
                            </div>
                          </div>

                          {/* Canvas Title */}
                          <h2 className={`text-base md:text-lg font-bold transition-colors line-clamp-2 mb-2 ${
                            isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'
                          }`}>
                            {diagram.name}
                          </h2>

                          {/* Prompt / Description Snippet */}
                          <p className={`text-xs line-clamp-2 mb-4 italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            &quot;{diagram.latest_prompt || archMeta?.whenToUse || 'Pristine architectural canvas with continuous version history.'}&quot;
                          </p>

                          {/* Version Count & Last Modified Timestamp */}
                          <div className={`rounded-xl p-3 border mb-4 flex items-center justify-between text-xs font-mono tabular-nums ${
                            isLight ? 'bg-slate-50/90 border-slate-200' : 'bg-slate-950/60 border-slate-800/60'
                          }`}>
                            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300">
                              <History className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
                              <span className="font-bold">{verCount} Version{verCount > 1 ? 's' : ''}</span>
                              {diagram.max_version && diagram.max_version > 1 && (
                                <span className="text-[10px] text-slate-500">(Max v{diagram.max_version})</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                              <Clock className="w-3 h-3 text-slate-400" aria-hidden="true" />
                              <span>{new Date(dateStr).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Toolbar */}
                        <div className={`relative z-10 pt-3.5 border-t flex flex-col gap-2 ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
                          <div className="flex items-center gap-2">
                            {/* Launch Native Studio */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(studioBadgeConfig.route);
                              }}
                              aria-label={`${studioBadgeConfig.actionLabel}: ${diagram.name}`}
                              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${studioBadgeConfig.btnStyle}`}
                              title={studioBadgeConfig.actionLabel}
                            >
                              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{studioBadgeConfig.actionLabel}</span>
                            </button>

                            {/* Full Page View */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPreviewModal(diagram);
                              }}
                              aria-label={`Preview ${diagram.name}`}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                                isLight
                                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                              }`}
                              title="Open full-screen template page"
                            >
                              <Eye className="w-3.5 h-3.5 text-teal-500" aria-hidden="true" />
                              <span>Full Page</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Studio */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (studioCategory === 'canonical') {
                                  router.push(`/studio?blueprint=${encodeURIComponent(cleanCanonicalId)}`);
                                } else {
                                  router.push(`/studio?id=${encodeURIComponent(diagram.id)}`);
                                }
                              }}
                              aria-label={`Edit ${diagram.name} in Studio`}
                              className={`flex-1 py-1.5 px-2.5 rounded-lg border text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                                isLight ? 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800' : 'bg-teal-950/50 hover:bg-teal-900 border-teal-800 text-teal-300'
                              }`}
                              title="Open full editable canvas in Architecture Studio"
                            >
                              <ExternalLink className="w-3 h-3" aria-hidden="true" />
                              <span>Studio</span>
                            </button>

                            {/* Clone (with double-submit disabled lock UX-10 / UX-28) */}
                            <button
                              type="button"
                              disabled={isCloning}
                              aria-busy={isCloning}
                              aria-label={`Clone ${diagram.name}`}
                              onClick={(e) => handleCloneDiagram(diagram, e)}
                              className={`py-1.5 px-2.5 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                                isLight ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800' : 'bg-amber-950/50 hover:bg-amber-900 border-amber-800 text-amber-300'
                              }`}
                              title="Clone / Duplicate this Canvas"
                            >
                              {isCloning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CopyPlus className="w-3.5 h-3.5" />}
                              <span>{isCloning ? 'Cloning...' : 'Clone'}</span>
                            </button>

                            {/* Single Delete (with two-step inline confirmation guardrail UX-12 / UX-28) */}
                            {isConfirmingDelete ? (
                              <div
                                role="alertdialog"
                                aria-label={`Confirm deletion of ${diagram.name}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 bg-red-50 border border-red-300 rounded-lg px-1.5 py-0.5"
                              >
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteSingle(diagram, e)}
                                  className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-black cursor-pointer"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmDeleteId(null);
                                  }}
                                  className="px-1.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmDeleteId(diagram.id);
                                }}
                                aria-label={`Delete ${diagram.name}`}
                                className={`p-1.5 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                                  isLight ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-800' : 'bg-red-950/50 hover:bg-red-900 border-red-800 text-red-300'
                                }`}
                                title="Delete Canvas"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Bigger Floating Card on Hover */}
                        {isHovered && (
                          <div
                            data-testid={`library-hover-card-${diagram.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPreviewModal(diagram);
                            }}
                            className={`hidden md:flex flex-col justify-between absolute left-1/2 -translate-x-1/2 -top-4 w-[460px] xl:w-[520px] rounded-3xl p-5 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] border-2 z-50 transition-all duration-200 cursor-pointer ${
                              isLight
                                ? 'bg-white border-teal-500 text-slate-900'
                                : 'bg-[#0B111E] border-teal-400 text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-md border ${studioBadgeConfig.style}`}>
                                  {studioBadgeConfig.label}
                                </span>
                                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                                  {archMeta?.name || diagram.architecture_type || 'Architecture'}
                                </span>
                              </div>
                              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/30">
                                Click to Open Full Page →
                              </span>
                            </div>

                            {/* Large 16:9 Diagram Preview */}
                            <div className="w-full h-60 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white mb-3 shadow-inner flex items-center justify-center">
                              <img
                                src={thumbSrc}
                                alt={diagram.name}
                                className="w-full h-full object-contain p-2 bg-white"
                              />
                            </div>

                            <h3 className="text-base font-black leading-snug mb-1">
                              {diagram.name}
                            </h3>
                            <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                              {diagram.latest_prompt || archMeta?.whenToUse || 'Production-ready enterprise architecture blueprint.'}
                            </p>

                            <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-slate-200 dark:border-slate-800">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenPreviewModal(diagram);
                                }}
                                className="flex-1 py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                                <span>Open Full-Screen Page</span>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(studioBadgeConfig.route);
                                }}
                                className={`py-2 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${studioBadgeConfig.btnStyle}`}
                              >
                                <Sparkles className="w-4 h-4" />
                                <span>{studioBadgeConfig.actionLabel}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </main>
        )}

        {/* ========================================================================= */}
        {/* STICKY BOTTOM BATCH ACTION BAR (WHEN ITEMS ARE SELECTED) */}
        {/* ========================================================================= */}
        {selectedDiagramIds.size > 0 && (
          <div
            role="region"
            aria-label="Batch selection actions"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-teal-500/40 text-white px-6 py-3.5 rounded-3xl shadow-2xl backdrop-blur-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4"
          >
            <div className="flex items-center gap-2 pr-2 border-r border-slate-700">
              <CheckSquare className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-black tabular-nums">
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
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowBatchDeleteModal(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="batch-delete-modal-title"
            aria-describedby="batch-delete-modal-desc"
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0B111E] border border-red-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-white"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30">
                <AlertTriangle className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h2 id="batch-delete-modal-title" className="text-lg font-black">Confirm Batch Deletion</h2>
                <p className="text-xs text-slate-300">This action permanently deletes diagrams from database</p>
              </div>
            </div>

            <p id="batch-delete-modal-desc" className="text-xs text-slate-300 leading-relaxed">
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
                aria-busy={isBatchDeleting}
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
