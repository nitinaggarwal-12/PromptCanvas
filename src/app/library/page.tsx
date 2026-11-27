'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react';
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
  Share2,
  Link2,
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
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import { generateUpgradedGcpGeBankingArchitectureXml } from '@/lib/canonical/upgradedGcpGeBankingAgentTemplate';
import GoogleWorkspaceDirectOpenModal from '@/components/GoogleWorkspaceDirectOpenModal';
import DiagramInlineSlidesPreviewer, {
  openDiagramInGoogleWorkspace,
} from '@/components/DiagramInlineSlidesPreviewer';

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
  micro_version?: string;
  latest_prompt?: string;
  xml_content?: string;
  is_starred?: boolean;
}

type StudioTabKey = 'all' | 'drafts' | 'studio' | 'prompt_to_diagram' | 'canonical' | 'vision';

function ArchitectureLibraryContent({ initialDiagramId }: { initialDiagramId?: string }) {
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
  const [copiedDiagramId, setCopiedDiagramId] = useState<string | null>(null);
  const [copiedShareLinkId, setCopiedShareLinkId] = useState<string | null>(null);
  const deepLinkHandledRef = useRef<string | null>(null);
  const syncedBackfillIdsRef = useRef<Set<string>>(new Set());

  const handleCopyDiagramId = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(id).catch(() => {});
    }
    setCopiedDiagramId(id);
    showToast(`📋 Copied Unique Diagram ID: ${id}`);
    setTimeout(() => setCopiedDiagramId((prev) => (prev === id ? null : prev)), 2200);
  };

  // Backfills any localStorage-saved diagram (including full multi-version history) to Server + GCS
  // under its exact canonical Unique ID so any colleague opening the shared URL receives 100% of versions.
  const syncDiagramToServerForSharing = useCallback(async (diagram: CanvasDiagramItem): Promise<boolean> => {
    if (!diagram?.id || typeof window === 'undefined') return false;
    try {
      let versionsPayload: Array<{
        version_number: number;
        xml: string;
        comment?: string;
        prompt?: string;
        created_by?: string;
        created_at?: string;
      }> | undefined;

      try {
        const localRaw = localStorage.getItem(`promptcanvas_studio_${diagram.id}`);
        if (localRaw) {
          const parsedLocal = JSON.parse(localRaw);
          if (Array.isArray(parsedLocal?.versions) && parsedLocal.versions.length > 0) {
            const total = parsedLocal.versions.length;
            versionsPayload = parsedLocal.versions
              .map((v: any, idx: number) => ({
                version_number: total - idx,
                xml: String(v?.xml || diagram.xml_content || ''),
                comment: `${v?.versionTag || `v1.${total - idx - 1}`} — ${
                  v?.diffSummary || v?.actionSummary || v?.prompt || 'Saved Snapshot'
                }`,
                prompt: v?.prompt || diagram.latest_prompt || undefined,
                created_by: v?.persona || v?.author || v?.sourceLabel || 'Saved Instance',
                created_at: parsedLocal.updatedAt || diagram.updated_at || diagram.created_at,
              }))
              .filter((v: any) => v.xml && v.xml.includes('<mxCell'))
              .sort((a: any, b: any) => a.version_number - b.version_number);
          }
        }
      } catch {}

      const effectiveXml =
        diagram.xml_content ||
        (versionsPayload && versionsPayload.length > 0 ? versionsPayload[versionsPayload.length - 1].xml : '');
      if (!effectiveXml || !effectiveXml.includes('<mxCell')) {
        return false;
      }

      try {
        const checkRes = await fetch(`/api/diagrams/${encodeURIComponent(diagram.id)}`, { cache: 'no-store' });
        if (checkRes.ok) {
          const checkJson = await checkRes.json();
          const serverVerCount = Array.isArray(checkJson?.versions) ? checkJson.versions.length : 0;
          const localVerCount = versionsPayload?.length || 1;
          if (serverVerCount >= localVerCount) {
            return true;
          }
        }
      } catch {}

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: diagram.id,
          name: diagram.name || 'Saved Architecture',
          xml: effectiveXml,
          comment: diagram.latest_prompt || 'Synced saved architecture for colleague sharing',
          prompt: diagram.latest_prompt || diagram.name,
          architectureType: diagram.architecture_type || 'gcp_enterprise_reference',
          createdStudio: diagram.created_studio || 'dashboard',
          isPrivate: Boolean(diagram.is_private),
          versions: versionsPayload && versionsPayload.length > 0 ? versionsPayload : undefined,
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  const handleShareColleagueLink = useCallback(
    async (diagram: CanvasDiagramItem, explicitVersionNum?: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (typeof window === 'undefined' || !diagram?.id) return;
      const verNum = explicitVersionNum || diagram.max_version || diagram.version_count || 1;
      const shareUrl = `${window.location.origin}/library?id=${encodeURIComponent(diagram.id)}&v=${verNum}`;
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).catch(() => {});
      }
      setCopiedShareLinkId(diagram.id);
      showToast(`🔗 Shareable colleague link copied: /library?id=${diagram.id}&v=${verNum}`);
      setTimeout(() => setCopiedShareLinkId((prev) => (prev === diagram.id ? null : prev)), 2500);
      await syncDiagramToServerForSharing(diagram);
    },
    [syncDiagramToServerForSharing]
  );

  const handleClosePreviewModal = useCallback(() => {
    deepLinkHandledRef.current = '__closed__';
    setActiveModalCanvas(null);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.delete('id');
      params.delete('v');
      const qs = params.toString();
      const nextUrl = qs ? `/library?${qs}` : '/library';
      window.history.replaceState(null, '', nextUrl);
    }
  }, []);
  const [cloudViewerTarget, setCloudViewerTarget] = useState<{
    isOpen: boolean;
    targetApp: 'slides' | 'docs' | 'pdf';
  }>({ isOpen: false, targetApp: 'slides' });

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
    if (studioParam === 'draft') {
      setActiveStudioTab('drafts');
    } else if (studioParam === 'studio1') {
      setActiveStudioTab('studio');
    } else if (
      studioParam === 'all' ||
      studioParam === 'drafts' ||
      studioParam === 'studio' ||
      studioParam === 'prompt_to_diagram' ||
      studioParam === 'canonical' ||
      studioParam === 'vision'
    ) {
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

  // Persist active diagram Unique ID (?id=<id>&v=<ver>) AND filter/search/sort state into browser URL bar
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

    if (activeModalCanvas?.id) {
      const currentVerNum = modalVersions[selectedVersionIndex]?.version_number || 1;
      params.set('id', activeModalCanvas.id);
      params.set('v', String(currentVerNum));
    } else if (deepLinkHandledRef.current === '__closed__') {
      params.delete('id');
      params.delete('v');
    } else if (initialDiagramId && !params.get('id')) {
      params.set('id', initialDiagramId);
    }

    const basePath = '/library';
    const qs = params.toString();
    const nextUrl = qs ? `${basePath}?${qs}` : basePath;
    if (nextUrl !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [
    activeStudioTab,
    rightFilterTag,
    searchQuery,
    selectedPhase,
    sortBy,
    activeModalCanvas,
    modalVersions,
    selectedVersionIndex,
    initialDiagramId,
  ]);

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

  // Build ONLY user-saved custom Vision items (zero hardcoded sample/template padding in Saved Architectures)
  const buildVisionSavedLibraryItems = useCallback((): CanvasDiagramItem[] => {
    const deletedSet = new Set(getDeletedVisionBlueprintIds().map((id) => id.toUpperCase()));
    const builtInPresetIds = new Set([
      'GCP-GE-BANKING-2026',
      'GCP-MULTIAGENT-01',
      'VIS-1787',
      'VIS-3093',
      'VIS-5965',
      'VIS-9745',
      'VIS-AGENTIC-01',
    ]);
    const items: CanvasDiagramItem[] = [];
    const seen = new Set<string>();

    for (const v of getCustomVisionBlueprints()) {
      const upperId = String(v.id || '').trim().toUpperCase();
      if (!upperId || builtInPresetIds.has(upperId) || deletedSet.has(upperId) || seen.has(upperId)) {
        continue;
      }
      seen.add(upperId);
      const itemTs = v.timestamp ? new Date(v.timestamp).toISOString() : new Date().toISOString();
      items.push({
        id: v.id,
        name: v.title || `Vision Diagram (${v.id})`,
        architecture_type: 'vision_decompiled',
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
      const dbList: CanvasDiagramItem[] = (Array.isArray(apiData) ? apiData : []).map((d: any) => {
        const promptText = d.latest_prompt || d.prompt || d.technical_usecase || d.business_usecase || '';
        const healed = ({ xml: d.xml_content, healed: false, canonicalTitle: undefined });
        return {
          ...d,
          name: healed.canonicalTitle || d.name,
          latest_prompt: promptText,
          xml_content: healed.xml || d.xml_content,
        };
      });

      // Read auto-saved micro-version drafts (including NASA Closed-Loop Multi-Universe Harness v1.0.1 and sessionStorage drafts)
      const autoDraftItems: CanvasDiagramItem[] = ([] as any[]).map((draft) => ({
        id: draft.id,
        name: draft.name,
        architecture_type: draft.architecture_type || 'draft_canonical_00',
        created_studio: 'draft',
        is_private: true,
        created_at: draft.createdAt,
        updated_at: draft.updatedAt,
        version_count: draft.versionCount || (Array.isArray(draft.versions) ? draft.versions.length : 1),
        latest_prompt: draft.prompt || draft.description,
        xml_content: draft.xml,
        versions: draft.versions as any,
      }));

      // Read user-saved projects from localStorage (saved from Dashboard Session Copy or Studio) and self-heal any 1-box stubs
      let localSavedItems: CanvasDiagramItem[] = [];
      if (typeof window !== 'undefined') {
        try {
          const rawSaved = JSON.parse(localStorage.getItem('promptcanvas_saved_blueprints') || '[]');
          let savedMutated = false;
          const healedSavedList: any[] = [];
          if (Array.isArray(rawSaved)) {
            localSavedItems = rawSaved
              .map((item: any) => {
                let fullPayload: any = null;
                try {
                  fullPayload = JSON.parse(localStorage.getItem(`promptcanvas_studio_${item.id}`) || 'null');
                } catch {}
                const isDraftItem =
                  item.created_studio === 'draft' ||
                  item.status === 'draft' ||
                  String(item.id || '').startsWith('DRAFT-') ||
                  String(item.id || '').startsWith('draft_');
                const promptText =
                  item.prompt || item.description || fullPayload?.description || 'Saved from User Session Copy';
                const rawXml = item.xml || fullPayload?.xml || '';
                const healed = ({ xml: rawXml, healed: false, canonicalTitle: undefined });

                if (healed.healed) {
                  savedMutated = true;
                  if (fullPayload && Array.isArray(fullPayload.versions)) {
                    fullPayload.versions = fullPayload.versions.map((v: any, idx: number) => {
                      const hv = ({ xml: v?.xml, healed: false, canonicalTitle: undefined });
                      return idx === 0 || hv.healed
                        ? { ...v, xml: idx === 0 ? healed.xml : hv.xml, title: healed.canonicalTitle || v?.title }
                        : v;
                    });
                    fullPayload.xml = healed.xml;
                    try {
                      localStorage.setItem(`promptcanvas_studio_${item.id}`, JSON.stringify(fullPayload));
                    } catch {}
                  }
                }

                healedSavedList.push({
                  ...item,
                  name: healed.canonicalTitle || item.name,
                  xml: healed.xml || rawXml,
                });

                return {
                  id: item.id,
                  name: healed.canonicalTitle || item.name || 'Saved Project',
                  architecture_type: item.architecture_type || 'gcp_enterprise_reference',
                  created_studio: isDraftItem ? 'draft' : item.created_studio || 'studio',
                  created_at: item.createdAt || item.updatedAt || new Date().toISOString(),
                  updated_at: item.updatedAt || new Date().toISOString(),
                  version_count: fullPayload?.versions?.length || item.versionCount || 1,
                  latest_prompt: promptText,
                  xml_content: healed.xml || rawXml,
                };
              });
            if (savedMutated) {
              try {
                localStorage.setItem('promptcanvas_saved_blueprints', JSON.stringify(healedSavedList));
              } catch {}
            }
          }
        } catch {}
      }

      const visionSavedItems = buildVisionSavedLibraryItems();

      const isPurgedLegacyItem = (d: { id?: string; name?: string; latest_prompt?: string }) =>
        /novacura|omnicommerce|voltgrid|nexusfin|^add\s+\d+\s+more\s+components|clinical\s+ai\s+-|vis-9745|vis-agentic-01|^custom\s+diagram\s+#|^unified\s+cloud\s+architecture\s+#/i.test(
          `${d.id || ''} ${d.name || ''} ${d.latest_prompt || ''}`
        );

      // Strict 1-Diagram = 1-Canonical-ID merge (DB is authoritative; localSavedItems enrich version_count & auto-backfill to GCS!)
      const byCanonicalId = new Map<string, CanvasDiagramItem>();
      const dbVersionCountById = new Map<string, number>();
      for (const d of dbList) {
        const key = String(d.id || '').trim();
        if (!key || isPurgedLegacyItem(d)) continue;
        const upper = key.toUpperCase();
        const dbVerCount = Number(d.version_count || d.versions?.length || 1);
        dbVersionCountById.set(upper, dbVerCount);
        byCanonicalId.set(upper, {
          ...d,
          version_count: dbVerCount,
          max_version: Number(d.max_version || dbVerCount || 1),
        });
      }
      const itemsNeedingCloudBackfill: CanvasDiagramItem[] = [];
      for (const l of [...localSavedItems, ...autoDraftItems, ...visionSavedItems]) {
        const key = String(l.id || '').trim();
        if (!key || isPurgedLegacyItem(l)) continue;
        const upper = key.toUpperCase();
        const existing = byCanonicalId.get(upper);
        const localVerCount = Number(l.version_count || 1);
        if (existing) {
          existing.version_count = Math.max(Number(existing.version_count || 1), localVerCount);
          if (localVerCount > (dbVersionCountById.get(upper) || 0) && !syncedBackfillIdsRef.current.has(upper)) {
            syncedBackfillIdsRef.current.add(upper);
            itemsNeedingCloudBackfill.push(l);
          }
        } else {
          byCanonicalId.set(upper, l);
          if (!syncedBackfillIdsRef.current.has(upper)) {
            syncedBackfillIdsRef.current.add(upper);
            itemsNeedingCloudBackfill.push(l);
          }
        }
      }

      if (itemsNeedingCloudBackfill.length > 0) {
        void Promise.all(itemsNeedingCloudBackfill.map((item) => syncDiagramToServerForSharing(item)));
      }

      const merged = Array.from(byCanonicalId.values());
      setDiagrams(merged);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('promptcanvas_saved_updated'));
      }
    } catch (err) {
      console.error('Error fetching library canvases:', err);
      setDiagrams([
        ...([] as any[]).map((draft) => ({
          id: draft.id,
          name: draft.name,
          architecture_type: draft.architecture_type || 'draft_canonical_00',
          created_studio: 'draft',
          is_private: true,
          created_at: draft.createdAt,
          updated_at: draft.updatedAt,
          version_count: draft.versionCount || 1,
          latest_prompt: draft.prompt || draft.description,
          xml_content: draft.xml,
        })),
        ...buildVisionSavedLibraryItems(),
      ]);
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
      if (diagram.created_studio === 'draft' || diagram.id.startsWith('DRAFT-') || diagram.id.startsWith('draft_')) {
        
      }
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
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('promptcanvas_saved_updated'));
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
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('promptcanvas_saved_updated'));
      
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
          created_studio: diagram.created_studio || 'dashboard',
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

  // Open Preview Modal (with URL sync, version-pin selection, and automatic cloud backfill of local-only projects)
  const handleOpenPreviewModal = useCallback(
    async (diagram: CanvasDiagramItem, preferredVersionNumber?: number | null) => {
      const healedDiagramMain = ({ xml: diagram.xml_content, healed: false, canonicalTitle: undefined });
      const resolvedDiagram: CanvasDiagramItem = {
        ...diagram,
        name: healedDiagramMain.canonicalTitle || diagram.name,
        xml_content: healedDiagramMain.xml || diagram.xml_content,
      };
      deepLinkHandledRef.current = resolvedDiagram.id;
      setActiveModalCanvas(resolvedDiagram);
      setIsLoadingVersions(true);

      const pickVersionIdx = (list: DiagramVersionItem[]) => {
        if (preferredVersionNumber && Number.isFinite(Number(preferredVersionNumber))) {
          const found = list.findIndex((v) => Number(v.version_number) === Number(preferredVersionNumber));
          if (found >= 0) return found;
        }
        return 0;
      };

      try {
        // 0. Check auto-saved drafts store first
        const matchedAutoDraft = ([] as any[]).find(
          (d) => d.id.toUpperCase() === resolvedDiagram.id.toUpperCase()
        );
        if (matchedAutoDraft && Array.isArray(matchedAutoDraft.versions) && matchedAutoDraft.versions.length > 0) {
          const total = matchedAutoDraft.versions.length;
          const mappedDraftVersions: DiagramVersionItem[] = matchedAutoDraft.versions.map((v: any, idx: number) => {
            const hv = ({ xml: v.xml, healed: false, canonicalTitle: undefined });
            return {
              id: v.id || `ver_${matchedAutoDraft.id}_${total - idx}`,
              diagram_id: resolvedDiagram.id,
              version_number: total - idx,
              xml_content: idx === 0 ? matchedAutoDraft.xml : hv.xml || v.xml || matchedAutoDraft.xml,
              comment: `${v.versionTag || `v1.${total - idx - 1}`} — ${v.diffSummary || v.actionSummary || v.prompt || 'Session Snapshot'}`,
              created_by: v.persona || v.author || v.sourceLabel || 'Auto-Saved Draft',
              created_at: matchedAutoDraft.updatedAt || resolvedDiagram.created_at,
              prompt: v.prompt || matchedAutoDraft.prompt,
              architecture_type: resolvedDiagram.architecture_type,
            };
          });
          setModalVersions(mappedDraftVersions);
          setSelectedVersionIndex(pickVersionIdx(mappedDraftVersions));
          return;
        }

        // Check if localStorage has a richer multi-version history than server (and backfill if needed)
        let localMappedVersions: DiagramVersionItem[] | null = null;
        if (typeof window !== 'undefined') {
          try {
            const localRaw = localStorage.getItem(`promptcanvas_studio_${resolvedDiagram.id}`);
            if (localRaw) {
              const parsedLocal = JSON.parse(localRaw);
              if (Array.isArray(parsedLocal?.versions) && parsedLocal.versions.length > 0) {
                const total = parsedLocal.versions.length;
                localMappedVersions = parsedLocal.versions.map((v: any, idx: number) => ({
                  id: v.id || `ver_${resolvedDiagram.id}_${total - idx}`,
                  diagram_id: resolvedDiagram.id,
                  version_number: total - idx,
                  xml_content: v.xml || resolvedDiagram.xml_content || '',
                  comment: `${v.versionTag || `v1.${total - idx - 1}`} — ${v.diffSummary || v.actionSummary || v.prompt || 'Session Snapshot'}`,
                  created_by: v.persona || v.author || v.sourceLabel || 'Saved Instance',
                  created_at: parsedLocal.updatedAt || resolvedDiagram.created_at,
                  prompt: v.prompt || resolvedDiagram.latest_prompt,
                  architecture_type: resolvedDiagram.architecture_type,
                }));
              }
            }
          } catch {}
        }

        // 1. Authoritative Database/GCS version history first (keyed by exact unique diagram ID)
        const res = await fetch(`/api/diagrams/${encodeURIComponent(resolvedDiagram.id)}`, { cache: 'no-store' });
        if (res.ok) {
          const fullData = await res.json();
          const vers: DiagramVersionItem[] = fullData.versions || [];
          if (localMappedVersions && localMappedVersions.length > vers.length) {
            setModalVersions(localMappedVersions);
            setSelectedVersionIndex(pickVersionIdx(localMappedVersions));
            void syncDiagramToServerForSharing(resolvedDiagram);
            return;
          }
          if (vers.length > 0) {
            const sorted = [...vers]
              .sort((a, b) => b.version_number - a.version_number)
              .map((v) => ({
                ...v,
                xml_content: v.xml_content,
              }));
            setModalVersions(sorted);
            setSelectedVersionIndex(pickVersionIdx(sorted));
            return;
          }
        }

        // 2. Fallback to localStorage studio payload for local projects & immediately backfill to Server/GCS
        if (localMappedVersions && localMappedVersions.length > 0) {
          setModalVersions(localMappedVersions);
          setSelectedVersionIndex(pickVersionIdx(localMappedVersions));
          void syncDiagramToServerForSharing(resolvedDiagram);
          return;
        }

        const fallbackVer: DiagramVersionItem = {
          id: `ver_${resolvedDiagram.id}_1`,
          diagram_id: resolvedDiagram.id,
          version_number: 1,
          xml_content:
            resolvedDiagram.xml_content ||
            getDefaultXmlForArchitecture(resolvedDiagram.architecture_type || 'conceptual_diagram') ||
            '',
          comment: 'Initial Master Reference Blueprint',
          created_by: 'system',
          created_at: resolvedDiagram.created_at,
          prompt: resolvedDiagram.latest_prompt,
          architecture_type: resolvedDiagram.architecture_type,
        };
        setModalVersions([fallbackVer]);
        setSelectedVersionIndex(0);
        void syncDiagramToServerForSharing(resolvedDiagram);
      } catch (err) {
        console.error('Failed to load version details:', err);
        const fallbackVer: DiagramVersionItem = {
          id: `ver_${resolvedDiagram.id}_1`,
          diagram_id: resolvedDiagram.id,
          version_number: 1,
          xml_content:
            resolvedDiagram.xml_content ||
            getDefaultXmlForArchitecture(resolvedDiagram.architecture_type || 'conceptual_diagram') ||
            '',
          comment: 'Initial Master Reference Blueprint',
          created_by: 'system',
          created_at: resolvedDiagram.created_at,
          prompt: resolvedDiagram.latest_prompt,
          architecture_type: resolvedDiagram.architecture_type,
        };
        setModalVersions([fallbackVer]);
        setSelectedVersionIndex(0);
      } finally {
        setIsLoadingVersions(false);
      }
    },
    [syncDiagramToServerForSharing]
  );

  // Direct Colleague Deep-Link Loader: opens /library?id=<diagramId>&v=<ver> or /library/<diagramId>
  // even when opened by a colleague in a fresh browser with zero localStorage or cookies!
  const openSharedDiagramById = useCallback(
    async (rawId: string, preferredVersion?: number | null) => {
      const targetId = String(rawId || '').trim();
      if (!targetId) return;
      const existingLocal = diagrams.find((d) => d.id.toUpperCase() === targetId.toUpperCase());
      if (existingLocal) {
        await handleOpenPreviewModal(existingLocal, preferredVersion);
        return;
      }
      try {
        const res = await fetch(`/api/diagrams/${encodeURIComponent(targetId)}`, { cache: 'no-store' });
        if (res.ok) {
          const fullData = await res.json();
          const vers: DiagramVersionItem[] = Array.isArray(fullData.versions)
            ? [...fullData.versions].sort((a, b) => b.version_number - a.version_number)
            : [];
          const sharedItem: CanvasDiagramItem = {
            id: fullData.id || targetId,
            name: fullData.name || `Shared Architecture (${targetId.slice(0, 8)})`,
            architecture_type: fullData.architecture_type || 'gcp_enterprise_reference',
            created_studio: fullData.created_studio || 'dashboard',
            is_private: fullData.is_private ?? false,
            created_at: fullData.created_at || new Date().toISOString(),
            updated_at: fullData.updated_at || new Date().toISOString(),
            versions: vers,
            version_count: vers.length || 1,
            max_version: vers[0]?.version_number || vers.length || 1,
            latest_prompt: vers[0]?.prompt || fullData.latest_prompt || fullData.prompt || '',
            xml_content: fullData.xml_content || vers[0]?.xml_content || '',
          };
          setDiagrams((prev) =>
            prev.some((p) => p.id.toUpperCase() === sharedItem.id.toUpperCase())
              ? prev
              : [sharedItem, ...prev]
          );
          deepLinkHandledRef.current = sharedItem.id;
          setActiveModalCanvas(sharedItem);
          setModalVersions(
            vers.length > 0
              ? vers
              : [
                  {
                    id: `ver_${sharedItem.id}_1`,
                    diagram_id: sharedItem.id,
                    version_number: 1,
                    xml_content: sharedItem.xml_content || '',
                    comment: 'Shared Architecture Snapshot',
                    created_by: 'Shared Link',
                    created_at: sharedItem.created_at,
                    prompt: sharedItem.latest_prompt,
                    architecture_type: sharedItem.architecture_type,
                  },
                ]
          );
          const targetIdx =
            preferredVersion && vers.length > 0
              ? vers.findIndex((v) => Number(v.version_number) === Number(preferredVersion))
              : 0;
          setSelectedVersionIndex(targetIdx >= 0 ? targetIdx : 0);
          setIsLoadingVersions(false);
          return;
        }
      } catch {}

      // Fallback if local studio key exists directly in author's browser before list finishes
      if (typeof window !== 'undefined') {
        try {
          const localStudioRaw = localStorage.getItem(`promptcanvas_studio_${targetId}`);
          if (localStudioRaw) {
            const parsed = JSON.parse(localStudioRaw);
            const fallbackLocalItem: CanvasDiagramItem = {
              id: targetId,
              name: parsed.name || parsed.projectTitle || targetId,
              architecture_type: 'gcp_enterprise_reference',
              created_studio: 'dashboard',
              created_at: parsed.createdAt || new Date().toISOString(),
              updated_at: parsed.updatedAt || new Date().toISOString(),
              version_count: Array.isArray(parsed.versions) ? parsed.versions.length : 1,
              latest_prompt: parsed.description || '',
              xml_content: parsed.xml || '',
            };
            await handleOpenPreviewModal(fallbackLocalItem, preferredVersion);
            return;
          }
        } catch {}
      }
      showToast(`⚠️ Shared diagram "${targetId}" could not be found on server.`);
    },
    [diagrams, handleOpenPreviewModal]
  );

  useEffect(() => {
    if (isLoading) return;
    const urlId = (initialDiagramId || searchParams.get('id') || '').trim();
    if (!urlId) return;
    if (deepLinkHandledRef.current === '__closed__') return;
    if (activeModalCanvas?.id.toUpperCase() === urlId.toUpperCase()) return;
    if (deepLinkHandledRef.current?.toUpperCase() === urlId.toUpperCase()) return;
    const rawV = searchParams.get('v');
    const parsedV = rawV && Number.isFinite(Number(rawV)) ? Number(rawV) : null;
    void openSharedDiagramById(urlId, parsedV);
  }, [isLoading, initialDiagramId, searchParams, activeModalCanvas, openSharedDiagramById]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onPopState = () => {
      const p = new URLSearchParams(window.location.search);
      const nextId = p.get('id')?.trim();
      const nextV = p.get('v');
      if (!nextId) {
        deepLinkHandledRef.current = '__closed__';
        setActiveModalCanvas(null);
      } else {
        deepLinkHandledRef.current = null;
        void openSharedDiagramById(nextId, nextV ? Number(nextV) : null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [openSharedDiagramById]);


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
    const raw = (d.created_studio || '').toLowerCase();
    if (
      raw === 'draft' ||
      raw === 'drafts' ||
      d.id.startsWith('DRAFT-') ||
      d.id.startsWith('draft_') ||
      Boolean(d.micro_version)
    ) {
      return 'drafts';
    }
    if (raw === 'prompt_to_diagram' || raw === 'prompt-to-diagram' || (d.architecture_type && d.architecture_type.includes('nlp_blueprint'))) {
      return 'prompt_to_diagram';
    }
    if (
      raw === 'studio' ||
      raw === 'dashboard' ||
      raw === 'studio1' ||
      d.id.startsWith('proj_') ||
      (d.architecture_type && (d.architecture_type.startsWith('arch_tpl_') || d.architecture_type.startsWith('canonical_')))
    ) {
      return 'studio';
    }
    if (
      raw === 'vision' ||
      d.id.startsWith('vision_') ||
      d.id.startsWith('VIS-') ||
      d.id.startsWith('GCP-') ||
      (d.architecture_type && d.architecture_type.includes('vision'))
    ) {
      return 'vision';
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

    if (idStr.includes('NASA') || combined.includes('nasa') || combined.includes('multiverse') || combined.includes('ccsds')) {
      return '/templates/canonical_00.png';
    }
    if (idStr.startsWith('bp_') || idStr.startsWith('canonical_') || archStr.startsWith('canonical_')) {
      const rawNum = idStr.replace(/^(bp_|canonical_)/i, '') || archStr.replace(/^canonical_/i, '');
      const num = parseInt(rawNum, 10);
      const validNums = new Set([0, 3, 12, 14, 29, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 69, 78, 79, 81, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]);
      if (!isNaN(num) && validNums.has(num)) {
        return `/templates/canonical_${String(num).padStart(2, '0')}.png`;
      }
    }
    if (idStr === 'GCP-GE-BANKING-2026' || idStr === 'GCP-MULTIAGENT-01' || combined.includes('2026 upgraded gcp') || combined.includes('multi-agent banking')) {
      return '/templates/canonical_00.png';
    }
    if (combined.includes('clinical') || combined.includes('fhir') || combined.includes('healthcare') || combined.includes('pv') || combined.includes('adverse')) {
      return '/templates/canonical_85.png';
    }
    if (idStr.includes('1787') || idStr.includes('3093') || combined.includes('gemini enterprise')) {
      return '/templates/canonical_78.png';
    }
    if (idStr.includes('9745') || combined.includes('landing zone')) {
      return '/templates/canonical_79.png';
    }
    if (idStr.includes('AGENTIC') || combined.includes('agentic') || combined.includes('mcp')) {
      return '/templates/canonical_67.png';
    }
    if (combined.includes('rag')) return '/templates/canonical_81.png';
    if (combined.includes('lakehouse') || combined.includes('medallion')) return '/templates/canonical_84.png';
    if (combined.includes('erd') || combined.includes('schema')) return '/templates/canonical_14.png';
    if (combined.includes('sequence') || combined.includes('state')) return '/templates/canonical_12.png';
    if (combined.includes('swimlane') || combined.includes('bpmn')) return '/templates/canonical_03.png';
    if (combined.includes('security') || combined.includes('threat') || combined.includes('zero-trust') || combined.includes('iam')) return '/templates/canonical_88.png';
    if (combined.includes('finops') || combined.includes('cutover') || combined.includes('runbook')) return '/templates/canonical_29.png';

    // Deterministic hash fallback across active certified canonical thumbnails (zero 404s)
    const activeNums = ['00', '03', '12', '14', '29', '67', '78', '79', '81', '84'];
    let hash = 0;
    const seed = `${idStr}:${nameStr}`;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const chosen = activeNums[hash % activeNums.length] || '00';
    return `/templates/canonical_${chosen}.png`;
  };

  // Studio Counts
  const studioCounts = useMemo(() => {
    const counts = {
      all: diagrams.length,
      drafts: 0,
      studio: 0,
      prompt_to_diagram: 0,
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
        if (rightFilterTag === 'drafts_auto') return cat === 'drafts';
        if (rightFilterTag === 'vision_saved') return cat === 'vision';
        if (rightFilterTag === 'gcp_multiagent') return upperId.includes('MULTIAGENT') || nameLower.includes('multiagent');
        if (rightFilterTag === 'gemini_enterprise') return upperId.includes('1787') || upperId.includes('3093') || nameLower.includes('gemini enterprise') || archLower.includes('gemini_enterprise');
        if (rightFilterTag === 'vision_landing_agentic') return upperId.includes('9745') || upperId.includes('AGENTIC') || nameLower.includes('landing zone') || nameLower.includes('agentic ai architecture');
        if (rightFilterTag === 'studio_pro') return cat === 'studio';
        if (rightFilterTag === 'prompt_to_diagram') return cat === 'prompt_to_diagram';
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
          handleClosePreviewModal();
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
            <div className={`flex items-center gap-2 text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              <Link href="/" className={`font-extrabold flex items-center gap-1.5 transition-colors ${isLight ? 'text-slate-800 hover:text-teal-700' : 'text-slate-300 hover:text-white'}`}>
                <span>PromptCanvas</span>
              </Link>
              <span className={isLight ? 'text-slate-400' : 'text-slate-500'} aria-hidden="true">/</span>
              <span className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Saved Architectures</span>
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
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
              title="Toggle multi-select mode for batch deletion"
            >
              {isSelectMode ? <CheckSquare className="w-3.5 h-3.5 text-white" /> : <Square className="w-3.5 h-3.5" />}
              <span>{isSelectMode ? 'Exit Selection' : 'Select Canvases'}</span>
            </button>

            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              title="Open Home Dashboard"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Home Dashboard</span>
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
            {/* Full-Page Top Action Header (Clean 2-Row Zero-Collision Layout) */}
            <div className={`px-6 py-3 border-b flex flex-col gap-2.5 shrink-0 ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-2xs' : 'bg-[#0B111E] border-slate-800 text-white'
            }`}>
              {/* Row 1: Back CTA + Saved Badge + Full Copyable Unique ID + Title + Prev/Next */}
              <div className="flex items-center justify-between gap-4 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <button
                    id="library-preview-close-btn"
                    type="button"
                    onClick={handleClosePreviewModal}
                    aria-label="Back to Library (Escape)"
                    title="Return to Saved Architectures Grid (Esc)"
                    className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-2xs ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                    }`}
                  >
                    <ChevronLeft className={`w-4 h-4 ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
                    <span>Back to Library</span>
                  </button>

                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${
                    isLight
                      ? 'bg-teal-50 text-teal-700 border-teal-300'
                      : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                  }`}>
                    SAVED ARCHITECTURE
                  </span>

                  <button
                    type="button"
                    data-testid="library-fullpage-id-badge"
                    data-full-id={activeModalCanvas.id}
                    onClick={(e) => handleCopyDiagramId(activeModalCanvas.id, e)}
                    title={`Saved Unique Diagram ID: ${activeModalCanvas.id} (Click to copy full ID)`}
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 cursor-pointer transition whitespace-nowrap shrink-0 ${
                      isLight
                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border-blue-500/30'
                    }`}
                  >
                    <span>ID: {activeModalCanvas.id}</span>
                    {copiedDiagramId === activeModalCanvas.id ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-75" />
                    )}
                  </button>

                  <button
                    type="button"
                    data-testid="library-fullpage-url-pill"
                    onClick={(e) => void handleShareColleagueLink(activeModalCanvas, activeVersion?.version_number || 1, e)}
                    title="Direct colleague-shareable URL — click to copy full link"
                    className={`hidden xl:inline-flex text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border items-center gap-1.5 cursor-pointer transition whitespace-nowrap shrink-0 ${
                      isLight
                        ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    <Link2 className="w-3 h-3 shrink-0" />
                    <span>/library?id={activeModalCanvas.id}&amp;v={activeVersion?.version_number || 1}</span>
                  </button>

                  <h2 id="library-preview-modal-title" className={`text-sm md:text-base font-black truncate min-w-0 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`} title={activeModalCanvas.name}>
                    {activeModalCanvas.name}
                  </h2>
                </div>

                {/* Prev / Next Navigation */}
                <div
                  id="library-preview-nav-bar"
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border shrink-0 ${
                    isLight ? 'bg-slate-50 border-slate-200 shadow-2xs' : 'bg-slate-900/95 border-slate-700/90 shadow-inner'
                  }`}
                >
                  <button
                    id="library-preview-prev-btn"
                    type="button"
                    disabled={!prevModalDiagram}
                    onClick={() => prevModalDiagram && handleOpenPreviewModal(prevModalDiagram)}
                    aria-label="Previous saved architecture"
                    title={prevModalDiagram ? `Previous (←): ${prevModalDiagram.name}` : 'No previous architecture'}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      prevModalDiagram
                        ? isLight
                          ? 'bg-white hover:bg-teal-600 hover:text-white text-slate-800 border border-slate-300 cursor-pointer shadow-2xs'
                          : 'bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-100 border border-slate-700 cursor-pointer shadow-sm'
                        : 'opacity-35 cursor-not-allowed text-slate-400'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <span
                    id="library-preview-position-badge"
                    className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-md border tabular-nums ${
                      isLight ? 'bg-white text-teal-700 border-slate-200' : 'bg-slate-950 text-teal-400 border-slate-800'
                    }`}
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
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      nextModalDiagram
                        ? isLight
                          ? 'bg-white hover:bg-teal-600 hover:text-white text-slate-800 border border-slate-300 cursor-pointer shadow-2xs'
                          : 'bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-100 border border-slate-700 cursor-pointer shadow-sm'
                        : 'opacity-35 cursor-not-allowed text-slate-400'
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Row 2: Metadata Subtitle + Export / Open in Studio Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 min-w-0">
                <div className={`flex items-center gap-2 text-xs min-w-0 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  <span className="font-semibold shrink-0">{getArchitectureTypeById(activeModalCanvas.architecture_type || '')?.name || activeModalCanvas.architecture_type}</span>
                  <span>&bull;</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">{modalVersions.length} Version{modalVersions.length > 1 ? 's' : ''}</span>
                  {(activeVersion?.prompt || activeModalCanvas.latest_prompt) && (
                    <>
                      <span>&bull;</span>
                      <span className={`truncate max-w-lg font-medium ${isLight ? 'text-teal-700' : 'text-teal-300'}`} title={activeVersion?.prompt || activeModalCanvas.latest_prompt}>
                        &ldquo;{activeVersion?.prompt || activeModalCanvas.latest_prompt}&rdquo;
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    data-testid="library-fullpage-share-btn"
                    onClick={(e) => void handleShareColleagueLink(activeModalCanvas, activeVersion?.version_number || 1, e)}
                    title="Copy colleague-shareable URL with Unique ID & active version (cloud-synced)"
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    {copiedShareLinkId === activeModalCanvas.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Share Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Link</span>
                      </>
                    )}
                  </button>
                  {activeVersion && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCopyXml(activeVersion.xml_content)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                            : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedXml ? 'Copied!' : 'Copy XML'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadXml(activeModalCanvas.name, activeVersion.version_number, activeVersion.xml_content)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                            : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5 text-sky-500" />
                        <span>Download .drawio</span>
                      </button>
                      <DiagramInlineSlidesPreviewer
                        headerOnly={true}
                        manifestKey={
                          /^\d+$/.test(activeModalCanvas.id.replace(/^(bp_|canonical_)/i, '').trim())
                            ? `BP-${activeModalCanvas.id.replace(/^(bp_|canonical_)/i, '').trim().padStart(2, '0')}`
                            : activeModalCanvas.id
                        }
                        title={activeModalCanvas.name}
                        subtitle={activeVersion.comment || activeModalCanvas.latest_prompt || 'Enterprise Reference Architecture'}
                        xml={activeVersion.xml_content}
                        templateId={activeModalCanvas.id.replace(/^(bp_|canonical_)/i, '').trim().padStart(2, '0')}
                        badgeLabel={`Library • v${activeVersion.version_number}`}
                      />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const cat = getStudioCategory(activeModalCanvas);
                      const vParam = activeVersion?.version_number ? `&v=${activeVersion.version_number}` : '';
                      if (cat === 'prompt_to_diagram') {
                        router.push(`/prompt-to-diagram?id=${encodeURIComponent(activeModalCanvas.id)}${vParam}`);
                      } else if (cat === 'vision') {
                        router.push(`/vision?id=${encodeURIComponent(activeModalCanvas.id)}`);
                      } else {
                        router.push(`/dashboard?id=${encodeURIComponent(activeModalCanvas.id)}${vParam}`);
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Studio (ID: {activeModalCanvas.id.slice(0, 8)})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Full-Page Body Viewport with Floating Left/Right Navigation Paddles */}
            <div className={`flex-1 overflow-y-auto relative p-4 ${isLight ? 'bg-slate-50' : 'bg-[#0B111E]'}`}>
              {/* Floating Backward (Previous) Paddle */}
              {prevModalDiagram && (
                <button
                  id="library-preview-float-prev"
                  type="button"
                  onClick={() => handleOpenPreviewModal(prevModalDiagram)}
                  aria-label={`Previous architecture: ${prevModalDiagram.name}`}
                  title={`Previous (← Left Arrow): ${prevModalDiagram.name}`}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl border shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
                    isLight
                      ? 'bg-white/95 hover:bg-teal-600 text-slate-800 hover:text-white border-slate-300'
                      : 'bg-slate-900/90 hover:bg-teal-500 text-white hover:text-slate-950 border-slate-700'
                  }`}
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
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl border shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
                    isLight
                      ? 'bg-white/95 hover:bg-teal-600 text-slate-800 hover:text-white border-slate-300'
                      : 'bg-slate-900/90 hover:bg-teal-500 text-white hover:text-slate-950 border-slate-700'
                  }`}
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
                <div className="w-full h-full max-w-none mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 flex items-center justify-center">
                  <DiagramViewerRenderSafe
                    xml={activeVersion.xml_content}
                    diagramId={activeModalCanvas.id}
                    versionId={String(activeVersion.id)}
                    useCaseName={activeModalCanvas.name}
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
            <div className={`px-6 py-3 border-t flex flex-wrap items-center justify-between gap-4 text-xs shrink-0 ${
              isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#0B111E] border-slate-800 text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <label htmlFor="library-modal-version-select" className={`font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Active Version:</label>
                <select
                  id="library-modal-version-select"
                  value={selectedVersionIndex}
                  onChange={(e) => setSelectedVersionIndex(Number(e.target.value))}
                  className={`border rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  {modalVersions.map((v, idx) => (
                    <option key={v.id} value={idx}>
                      Version {v.version_number} &bull; {v.comment || 'Snapshot'} ({new Date(v.created_at).toLocaleDateString()})
                    </option>
                  ))}
                </select>
                <span className={`hidden md:inline-flex items-center gap-1.5 text-[11px] ml-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Use <kbd className={`px-1.5 py-0.5 rounded border font-mono text-[10px] ${isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-700 text-slate-200'}`}>←</kbd> <kbd className={`px-1.5 py-0.5 rounded border font-mono text-[10px] ${isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-700 text-slate-200'}`}>→</kbd> to switch architectures &bull; <kbd className={`px-1.5 py-0.5 rounded border font-mono text-[10px] ${isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-700 text-slate-200'}`}>Esc</kbd> to return to Library
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClosePreviewModal}
                  className={`px-3.5 py-1.5 rounded-xl border font-bold text-xs transition cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
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
                    Saved <span className="bg-gradient-to-r from-teal-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Architectures</span>
                  </h1>
                  <p className={`text-[11px] leading-tight mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Every saved diagram is tracked under a single permanent Unique ID with full version history (1 diagram = 1 tile).
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
                  <span className="font-extrabold text-orange-600 dark:text-orange-400">{studioCounts.drafts}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Drafts</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sky-600 dark:text-sky-400">{studioCounts.vision}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Vision AI</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{studioCounts.studio}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Blueprint Studio</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{studioCounts.prompt_to_diagram}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Prompt to Diagram</span>
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
                { id: 'all', label: '🌐 All Saved Architectures', count: studioCounts.all, color: 'teal' },
                { id: 'studio', label: '💎 Blueprint Studio Instances', count: studioCounts.studio, color: 'indigo' },
                { id: 'prompt_to_diagram', label: '✨ Prompt to Diagram', count: studioCounts.prompt_to_diagram, color: 'emerald' },
                { id: 'vision', label: '👁️ Vision AI Saved', count: studioCounts.vision, color: 'teal' },
                { id: 'drafts', label: '📝 Saved Drafts', count: studioCounts.drafts, color: 'amber' }
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
                    placeholder="Search by Unique Diagram ID, title, prompt, keywords..."
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
                      if (val === 'drafts_auto') {
                        setActiveStudioTab('drafts');
                      } else if (val === 'vision_saved' || val === 'gcp_multiagent' || val === 'gemini_enterprise' || val === 'vision_landing_agentic') {
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
                    <option value="drafts_auto">📝 Saved Drafts</option>
                    <option value="vision_saved">👁️ Vision Decompiled Diagrams</option>
                    <option value="studio_pro">💎 Blueprint Studio Saved Instances</option>
                    <option value="prompt_to_diagram">✨ Prompt to Diagram (NLP) Instances</option>

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
                  { label: '🚀 NASA Digital-Twin', query: 'nasa' },
                  { label: '🤖 Agentic RAG', query: 'rag' },
                  { label: '🌊 Lakehouse', query: 'lakehouse' },
                  { label: '🗄️ Dimensional ERD', query: 'erd' },
                  { label: '🔄 Sequence Flow', query: 'sequence' },
                  { label: '🔒 Zero-Trust ADK', query: 'adk' },
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
                      drafts: {
                        label: '📝 Saved Draft',
                        style: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40',
                        btnStyle: 'bg-amber-600 hover:bg-amber-500 text-white',
                        actionLabel: 'Open Draft in Studio',
                        route: `/dashboard?id=${encodeURIComponent(diagram.id)}`
                      },
                      studio: {
                        label: 'Blueprint Studio Instance',
                        style: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
                        btnStyle: 'bg-indigo-600 hover:bg-indigo-500 text-white',
                        actionLabel: 'Open Instance in Studio',
                        route: `/dashboard?id=${encodeURIComponent(diagram.id)}`
                      },
                      prompt_to_diagram: {
                        label: 'Prompt to Diagram (NLP)',
                        style: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
                        btnStyle: 'bg-emerald-600 hover:bg-emerald-500 text-white',
                        actionLabel: 'Open in Prompt to Diagram',
                        route: `/prompt-to-diagram?id=${encodeURIComponent(diagram.id)}`
                      },
                      canonical: {
                        label: 'Certified Blueprint',
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

                    const studioBadgeConfig = studioBadgeConfigMap[studioCategory] || studioBadgeConfigMap.studio;

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

                          {/* Crisp Live Vector Diagram Thumbnail Preview Box inside Every Tile */}
                          <div
                            data-testid={`library-tile-thumb-${diagram.id}`}
                            className={`relative w-full h-44 mb-3 rounded-xl overflow-hidden border transition-all ${
                              isLight
                                ? 'bg-white border-slate-200/90 group-hover:border-teal-400 shadow-xs'
                                : 'bg-slate-950 border-slate-800 group-hover:border-teal-500/50'
                            }`}
                          >
                            {diagram.xml_content && diagram.xml_content.includes('<mxGraphModel') ? (
                              <div className="w-full h-full bg-white pointer-events-none overflow-hidden flex items-center justify-center">
                                <div className="w-[1520px] h-[880px] scale-[0.26] origin-center shrink-0">
                                  <DiagramViewer
                                    xml={diagram.xml_content}
                                    diagramId={diagram.id}
                                    diagramType={diagram.architecture_type || 'gcp_enterprise_reference'}
                                    useCaseName={diagram.name}
                                    description={diagram.latest_prompt}
                                    bgTheme="light"
                                  />
                                </div>
                              </div>
                            ) : (
                              <img
                                src={thumbSrc}
                                alt={diagram.name}
                                loading="lazy"
                                className="w-full h-full object-contain p-1.5 bg-white transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            )}
                            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/85 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs opacity-90 group-hover:bg-teal-600 transition-colors">
                              <Eye className="w-3 h-3" />
                              <span>Click for Full Page</span>
                            </div>
                          </div>

                          {/* Canvas Title + Canonical Unique Diagram ID Badge */}
                          <h2 className={`text-base md:text-lg font-bold transition-colors line-clamp-2 min-h-[2.5rem] mb-1.5 ${
                            isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'
                          }`}>
                            {diagram.name}
                          </h2>
                          <div className="mb-2 flex items-center gap-1.5">
                            <button
                              type="button"
                              data-testid={`library-tile-id-${diagram.id}`}
                              onClick={(e) => handleCopyDiagramId(diagram.id, e)}
                              title={`Unique Saved Diagram ID: ${diagram.id} (Click to copy)`}
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border font-mono text-[10px] font-bold transition cursor-pointer max-w-full truncate ${
                                isLight
                                  ? 'bg-blue-50/90 hover:bg-blue-100 text-blue-800 border-blue-200'
                                  : 'bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border-blue-500/30'
                              }`}
                            >
                              <span className="truncate">ID: {diagram.id}</span>
                              {copiedDiagramId === diagram.id ? (
                                <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                              ) : (
                                <Copy className="w-3 h-3 opacity-70 shrink-0" />
                              )}
                            </button>
                          </div>

                          {/* Prompt / Description Snippet */}
                          <p className={`text-xs line-clamp-2 min-h-[2rem] mb-4 italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
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
                            {/* Launch Native Dashboard */}
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
                              data-testid={`library-tile-fullpage-${diagram.id}`}
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
                              title="Open full-screen template page with Inline Slides Previewer"
                            >
                              <Eye className="w-3.5 h-3.5 text-teal-500" aria-hidden="true" />
                              <span>Full Page</span>
                            </button>

                            {/* 1-Click Open with Google Slides */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const rawId = diagram.id.replace(/^(bp_|canonical_)/i, '').trim();
                                const manifestKey = /^\d+$/.test(rawId) ? `BP-${rawId.padStart(2, '0')}` : rawId;
                                const fallbackXml =
                                  diagram.xml_content ||
                                  diagram.versions?.[0]?.xml_content ||
                                  getDefaultXmlForArchitecture(diagram.architecture_type || 'cloud_microservices');
                                void openDiagramInGoogleWorkspace(
                                  manifestKey,
                                  'slides',
                                  diagram.name,
                                  fallbackXml || undefined
                                );
                              }}
                              aria-label={`Open ${diagram.name} in Google Slides`}
                              className={`py-2 px-2.5 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                                isLight
                                  ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                                  : 'bg-[#202124] hover:bg-[#303134] text-white border-white/15'
                              }`}
                              title="Open directly in Google Slides via Server-Side Drive Conversion Bridge"
                            >
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#fbbc04] text-[#202124] font-black text-[10px]">
                                S
                              </span>
                              <span>Slides ↗</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* 1-Click Share Link with Colleague */}
                            <button
                              type="button"
                              data-testid={`library-tile-share-${diagram.id}`}
                              onClick={(e) => void handleShareColleagueLink(diagram, diagram.max_version || verCount, e)}
                              aria-label={`Copy colleague share link for ${diagram.name}`}
                              className={`flex-1 py-1.5 px-2.5 rounded-lg border text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                isLight
                                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800'
                                  : 'bg-blue-950/50 hover:bg-blue-900 border-blue-800 text-blue-300'
                              }`}
                              title="Copy colleague-shareable URL (?id=...) synced to cloud"
                            >
                              {copiedShareLinkId === diagram.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Share2 className="w-3.5 h-3.5" />
                                  <span>Share Link</span>
                                </>
                              )}
                            </button>

                            {/* Dashboard (only shown when primary CTA targets /studio or /vision rather than /dashboard) */}
                            {!studioBadgeConfig.route.startsWith('/dashboard') && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/dashboard?id=${encodeURIComponent(diagram.id)}`);
                                }}
                                aria-label={`Edit ${diagram.name} in Dashboard`}
                                className={`flex-1 py-1.5 px-2.5 rounded-lg border text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                                  isLight ? 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800' : 'bg-teal-950/50 hover:bg-teal-900 border-teal-800 text-teal-300'
                                }`}
                                title="Open full editable canvas in Architecture Dashboard"
                              >
                                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                <span>Dashboard</span>
                              </button>
                            )}

                            {/* Clone (with double-submit disabled lock UX-10 / UX-28) */}
                            <button
                              type="button"
                              disabled={isCloning}
                              aria-busy={isCloning}
                              aria-label={`Clone ${diagram.name}`}
                              onClick={(e) => handleCloneDiagram(diagram, e)}
                              className={`flex-1 py-1.5 px-2.5 rounded-lg border text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
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

                            {/* Large 16:9 Live Vector Diagram Preview */}
                            <div className="w-full h-60 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white mb-3 shadow-inner flex items-center justify-center">
                              {diagram.xml_content && diagram.xml_content.includes('<mxGraphModel') ? (
                                <div className="w-full h-full bg-white pointer-events-none overflow-hidden flex items-center justify-center">
                                  <div className="w-[1520px] h-[880px] scale-[0.31] origin-center shrink-0">
                                    <DiagramViewer
                                      xml={diagram.xml_content}
                                      diagramId={diagram.id}
                                      diagramType={diagram.architecture_type || 'gcp_enterprise_reference'}
                                      useCaseName={diagram.name}
                                      description={diagram.latest_prompt}
                                      bgTheme="light"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <img
                                  src={thumbSrc}
                                  alt={diagram.name}
                                  className="w-full h-full object-contain p-2 bg-white"
                                />
                              )}
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
      {/* BATCH DELETE CONFIRMATION DRAWER (RULE 25F) */}
      {/* ========================================================================= */}
      {showBatchDeleteModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-stretch justify-end animate-in fade-in"
          onClick={() => setShowBatchDeleteModal(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="batch-delete-modal-title"
            aria-describedby="batch-delete-modal-desc"
            onClick={(e) => e.stopPropagation()}
            className={`border-l max-w-md w-full h-full p-6 space-y-4 shadow-2xl flex flex-col justify-between ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0B111E] border-red-500/40 text-white'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                  <AlertTriangle className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="batch-delete-modal-title" className="text-lg font-black">Confirm Batch Deletion</h2>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>This action permanently deletes diagrams from database</p>
                </div>
              </div>

              <p id="batch-delete-modal-desc" className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Are you sure you want to permanently delete <strong className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedDiagramIds.size}</strong> selected architecture canvas{selectedDiagramIds.size > 1 ? 'es' : ''}? All version snapshots and XML models will be removed.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowBatchDeleteModal(false)}
                disabled={isBatchDeleting}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
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

      {/* Same-Screen Cloud Viewer Modal (Google Slides / Google Docs / PDF) */}
      {activeModalCanvas && activeVersion && (
        <GoogleWorkspaceDirectOpenModal
          isOpen={cloudViewerTarget.isOpen}
          onClose={() => setCloudViewerTarget((prev) => ({ ...prev, isOpen: false }))}
          mode={cloudViewerTarget.targetApp}
          xmlContent={activeVersion.xml_content}
          diagramName={activeModalCanvas.name}
          blueprintId={activeModalCanvas.id}
        />
      )}

    </div>
  );
}

export default function ArchitectureLibraryPage({ initialDiagramId }: { initialDiagramId?: string } = {}) {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex items-center justify-center bg-[#070A13] text-teal-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <ArchitectureLibraryContent initialDiagramId={initialDiagramId} />
    </Suspense>
  );
}
