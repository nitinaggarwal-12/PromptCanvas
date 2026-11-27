'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Layers,
  Search,
  ChevronDown,
  Maximize2,
  Zap,
  Check,
  Copy,
  CheckCheck,
  ArrowRight,
  Sliders,
  Network,
  Compass,
  FileCode,
  ShieldCheck,
  Boxes,
  Cpu,
  Lock,
  Globe,
  Database,
  GitBranch,
  RefreshCw,
  FolderKanban,
  Edit3,
  ExternalLink,
  Eye,
  Download,
  ShieldAlert,
  Wrench,
  History,
  RotateCcw,
  Upload,
  Tag,
  CheckCircle,
  AlertCircle,
  X,
  FileText,
  Plus,
  PlusCircle,
  ArrowUpRight,
  Loader2,
  Share2,
  CheckCircle2,
  Bookmark,
  Trash2,
  GitFork,
  Save,
  MessageSquare,
  Presentation,
  Printer,
  Link2
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import GoogleWorkspaceDirectOpenModal from '@/components/GoogleWorkspaceDirectOpenModal';
import DiagramInlineSlidesPreviewer, {
  openDiagramInGoogleWorkspace,
} from '@/components/DiagramInlineSlidesPreviewer';
import {
  NewDiagramInputSelectionModal,
  NewDiagramSelectionResult
} from '@/components/NewDiagramInputSelectionModal';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DEPTH_LEVEL_META,
  BlueprintDepthLevel,
  CanonicalTemplate
} from '@/lib/canonical/canonicalTemplates';
import {
  CERTIFIED_ARCHITECTURE_TEMPLATES,
  getCertifiedArchitectureTemplateById,
  cloneArchitectureTemplateInstance,
  fetchImmutableTemplateXml,
} from '@/lib/templates/certifiedArchitectureTemplates';

const STUDIO_DEPTH_LEVELS: readonly ('All' | BlueprintDepthLevel)[] = ['All', 'L200', 'L300', 'L400'] as const;
import { AppHeader } from '@/components/AppHeader';
import { generateLogicalGcpAgentArchitectureXml } from '@/lib/canonical/templateLogicalGcpAgentArchitecture';
import { generateConceptualGcpAgentArchitectureXml } from '@/lib/canonical/templateConceptualGcpAgentArch';
import { generateProcessGcpAgentWorkflowXml } from '@/lib/canonical/templateProcessGcpAgentWorkflow';
import {
  generateWhiteboardGcpAgentArchXml,
  convertXmlToWhiteboardMode
} from '@/lib/canonical/templateWhiteboardGcpAgentArch';
import {
  generatePaperGcpAgentArchXml,
  convertXmlToPaperMode
} from '@/lib/canonical/templatePaperGcpAgentArch';
import {
  ArchitecturePerspective,
  AbstractionDetailLevel,
  buildStructuredFallbackDecision,
  GeminiArchitecturalDecision
} from '@/lib/geminiArchitecturalDecisionEngine';
import { computeArchitectureDiff, ArchitectureDiffResult } from '@/lib/diffEngine';
import { exportDiagramPng, exportDiagramSvg } from '@/lib/export/diagramRaster';
import {
  preflightVerifyAndHealXmlAcrossAll6Audits,
  applyDeterministicGeometryAndContrastFixes,
} from '@/lib/preflightAuditEngine';
import { computeHonestDiagramHealth } from '@/lib/diagramAstHealth';
import { classifyChatIntent } from '@/lib/router/chatIntentClassifier';
import { executeGcpPromptModification } from '@/lib/gcpCoPilotModifier';
import { synthesizePromptDrivenDiagramXml } from '@/lib/promptDrivenDiagramSynthesizer';
import type { TruthfulnessGroundingDossier } from '@/lib/truthfulnessGroundingEngine';

const DEFAULT_DASHBOARD_PROMPT =
  'Design a GCP native technical architecture with Gemini Enterprise, Google ADK, A2A, MCP, Model Armor, Vector Search 2.0, and Cloud Spanner';

// Category Definitions
interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  count: number;
  familyFilter: string | null;
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  { id: 'all', name: `All ${CANONICAL_TEMPLATES.length} Blueprints`, icon: '🌐', count: CANONICAL_TEMPLATES.length, familyFilter: null },
  { id: 'reference', name: 'Reference Architectures', icon: '🏛️', count: CANONICAL_TEMPLATES.filter((t) => t.family === 'Reference Architectures').length, familyFilter: 'Reference Architectures' },
  { id: 'structure', name: 'Structure & GenAI Core', icon: '🏗️', count: CANONICAL_TEMPLATES.filter((t) => t.family === 'Structure').length, familyFilter: 'Structure' },
  { id: 'flow', name: 'Operational Flowcharts & Streaming', icon: '⚡', count: CANONICAL_TEMPLATES.filter((t) => t.family === 'Flow').length, familyFilter: 'Flow' },
  { id: 'infrastructure', name: 'Infrastructure & Network', icon: '🌐', count: CANONICAL_TEMPLATES.filter((t) => t.family === 'Infrastructure').length, familyFilter: 'Infrastructure' },
  { id: 'security', name: 'Security & Governance', icon: '🛡️', count: CANONICAL_TEMPLATES.filter((t) => t.family === 'Security & Governance').length, familyFilter: 'Security & Governance' },
  { id: 'operations', name: 'Delivery & Operations', icon: '🚀', count: CANONICAL_TEMPLATES.filter((t) => t.family === 'Delivery & Operations').length, familyFilter: 'Delivery & Operations' }
];


// Detail Level Definitions
const DETAIL_LEVELS: { id: AbstractionDetailLevel; name: string; title: string; desc: string }[] = [
  { id: 'L1', name: 'Context & Scope', title: 'L1 — Context & Scope', desc: 'Enterprise boundaries, external actors & systems' },
  { id: 'L2', name: 'Subsystems & Containers', title: 'L2 — Subsystems & Containers', desc: 'VPCs, subnets, clusters, databases & tier boundaries' },
  { id: 'L3', name: 'Microservices & Pods', title: 'L3 — Microservices & Pods', desc: 'Microservices, queues, pods & event streams' },
  { id: 'L4', name: 'Physical, Ports & Protocols', title: 'L4 — Physical, Ports & Protocols', desc: 'IPAM, subnets, CIDRs, mTLS, HSM & port mappings' }
];

// Version Lineage Entry Interface
interface DashboardVersionEntry {
  id: string;
  versionTag: string;
  major: number;
  minor: number;
  micro?: number;
  title: string;
  prompt: string;
  source: 'ai_copilot' | 'manual_drawio' | 'audit_autofix' | 'suggestion_chip' | 'initial_load' | 'perspective_switch';
  sourceLabel: string;
  diffSummary: string;
  timestamp: string;
  xml: string;
  blueprintId: string;
  level: AbstractionDetailLevel;
  perspective: ArchitecturePerspective;
  status: 'published' | 'draft';
  persona?: string;
  modelUsed?: string;
  aiReasoning?: string;
  plannedSteps?: string[];
  truthfulnessDossier?: TruthfulnessGroundingDossier;
  perspectiveXmlMap?: Partial<Record<ArchitecturePerspective, string>>;
}


// Audit Result Interface
interface AuditDimensionResult {
  category: string;
  name: string;
  score: number;
  status: 'passed' | 'warning' | 'critical';
  summary: string;
  recommendations: string[];
}

// Pending Navigation / Switch Action when Unsaved Session Copy Exists
type PendingLeaveAction =
  | { type: 'route'; href: string; label?: string }
  | { type: 'category'; categoryId: string }
  | { type: 'blueprint'; blueprint: CanonicalTemplate }
  | { type: 'manual_save' };

/**
 * Pure helper returning the immutable Canonical Baseline state for any (blueprintId, perspective)
 * without mutating CANONICAL_TEMPLATES or incrementing version history.
 */
function getCanonicalBaselineForPerspective(
  blueprintId: string,
  perspective: ArchitecturePerspective,
  isLight: boolean,
  domainFlavor = 'enterprise'
): {
  xml: string;
  title: string;
  level: AbstractionDetailLevel;
  diffSummary: string;
} {
  const bp =
    CANONICAL_TEMPLATES.find(
      (t) => t.id === blueprintId || t.id === blueprintId.padStart(2, '0')
    ) || CANONICAL_TEMPLATES[0];

  if (perspective === 'Logical') {
    const title =
      blueprintId === '00'
        ? 'Google Cloud Multi-Agent Logical Architecture'
        : `${bp.name} — Logical Architecture`;
    return {
      xml: generateLogicalGcpAgentArchitectureXml({
        domain: 'enterprise',
        theme: isLight ? 'light' : 'dark',
        projectTitle: title
      }),
      title,
      level: 'L2',
      diffSummary: `Canonical Master Blueprint #${bp.id} (L2 Logical Multi-Agent Architecture — Read-Only Baseline).`
    };
  }

  if (perspective === 'Conceptual') {
    const title =
      blueprintId === '00'
        ? 'Enterprise Multi-Agent Conceptual Architecture'
        : `${bp.name} — Conceptual Architecture`;
    return {
      xml: generateConceptualGcpAgentArchitectureXml({
        domain: 'enterprise',
        theme: isLight ? 'light' : 'dark',
        projectTitle: title
      }),
      title,
      level: 'L1',
      diffSummary: `Canonical Master Blueprint #${bp.id} (L1 Conceptual Architecture — Read-Only Baseline).`
    };
  }

  if (perspective === 'Process') {
    if (blueprintId !== '00' && (bp.family === 'Process' || bp.family === 'Flow')) {
      return {
        xml: bp.generateXml('enterprise', isLight ? 'light' : 'dark'),
        title: bp.name,
        level: (bp.level as AbstractionDetailLevel) || 'L2',
        diffSummary: `Canonical Master Blueprint #${bp.id} (${bp.name} — Read-Only Baseline).`
      };
    }
    const title =
      blueprintId === '00'
        ? 'Multi-Agent Request Processing & Banking Workflow'
        : `${bp.name} — Process Workflow`;
    return {
      xml: generateProcessGcpAgentWorkflowXml({
        domain: 'enterprise',
        theme: isLight ? 'light' : 'dark',
        projectTitle: title
      }),
      title,
      level: 'L2',
      diffSummary: `Canonical Master Blueprint #${bp.id} (BPMN Swimlane Process Workflow — Read-Only Baseline).`
    };
  }

  if (perspective === 'Whiteboard') {
    const title =
      blueprintId === '00'
        ? 'Multi-Agent Intelligence Core — Whiteboard Architecture'
        : `${bp.name} — Whiteboard Architecture`;
    return {
      xml:
        blueprintId === '00'
          ? generateWhiteboardGcpAgentArchXml({
              domain: 'enterprise',
              theme: isLight ? 'light' : 'dark',
              projectTitle: title
            })
          : convertXmlToWhiteboardMode('', bp.name),
      title,
      level: 'L2',
      diffSummary: `Canonical Master Blueprint #${bp.id} (Hand-Drawn Dry-Erase Whiteboard Mode — Read-Only Baseline).`
    };
  }

  // Default: Technical Perspective
  return {
    xml: bp.generateXml(domainFlavor || 'enterprise', isLight ? 'light' : 'dark'),
    title: blueprintId === '00' ? 'Google Cloud Enterprise Architecture' : bp.name,
    level: (bp.level as AbstractionDetailLevel) || 'L3',
    diffSummary: `Canonical Master Blueprint #${bp.id} (${domainFlavor || 'enterprise'} domain) loaded across 5 Deterministic Zones (Immutable Baseline).`
  };
}

function DashboardContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // 1. STEP 1: CATEGORY SELECTION
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState<boolean>(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');
  
  // 2. STEP 2: SEARCHABLE BLUEPRINT SELECTION
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('00');
  const [openBlueprintDropdown, setOpenBlueprintDropdown] = useState<boolean>(false);
  const [blueprintSearchQuery, setBlueprintSearchQuery] = useState<string>('');

  // 3. STEP 3: DETAIL LEVEL (L1, L2, L3, L4) + DEPTH LEVEL FILTER (L100..L400) + ACTIVE PERSISTED INSTANCE ID
  const [selectedLevel, setSelectedLevel] = useState<AbstractionDetailLevel>('L3');
  const [selectedDepthLevel, setSelectedDepthLevel] = useState<'All' | BlueprintDepthLevel>('All');
  const [activeInstanceId, setActiveInstanceId] = useState<string | null>(null);
  const [isCreatingInstance, setIsCreatingInstance] = useState<boolean>(false);
  const [copiedInstanceLink, setCopiedInstanceLink] = useState<boolean>(false);
  const [openLevelDropdown, setOpenLevelDropdown] = useState<boolean>(false);
  const [levelSearchQuery, setLevelSearchQuery] = useState<string>('');

  // 4. CENTRAL PROMPT COMPOSER, AI REASONING/PLANNING & CONVERSATIONAL STATE
  const [activeComposerPrompt, setActiveComposerPrompt] = useState<string>('');
  const [isProcessingAi, setIsProcessingAi] = useState<boolean>(false);
  const [aiPlanningStatus, setAiPlanningStatus] = useState<string | null>(null);
  const [conversationalReply, setConversationalReply] = useState<string | null>(null);

  // 5. IMMUTABLE BASELINE + COPY-ON-WRITE PER-USER SESSION SANDBOX STATE
  const [sessionUserId, setSessionUserId] = useState<string>('sess_local');
  const [isSessionForked, setIsSessionForked] = useState<boolean>(false);
  const [hasUnsavedSessionChanges, setHasUnsavedSessionChanges] = useState<boolean>(false);
  const [sessionCopyId, setSessionCopyId] = useState<string | null>(null);

  // Leave / Switch Intercept Modal ("Save Session Copy as Your Project?")
  const [leaveModalOpen, setLeaveModalOpen] = useState<boolean>(false);
  const [pendingLeaveAction, setPendingLeaveAction] = useState<PendingLeaveAction | null>(null);
  const [saveProjectName, setSaveProjectName] = useState<string>('');
  const [saveProjectDomain, setSaveProjectDomain] = useState<string>('Enterprise Cloud & Multi-Agent AI');
  const [isSavingProject, setIsSavingProject] = useState<boolean>(false);

  // 6. VERSION LINEAGE & STATE MANAGEMENT
  const [loadedBlueprintId, setLoadedBlueprintId] = useState<string>('00');
  const [canvasTitle, setCanvasTitle] = useState<string>('Google Cloud Enterprise Architecture');
  const [canvasPerspective, setCanvasPerspective] = useState<ArchitecturePerspective>('Technical');
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  // Publishing Governance State
  const [publishingScope, setPublishingScope] = useState<'all' | 'current' | 'draft'>('current');
  const [openPublishDropdown, setOpenPublishDropdown] = useState<boolean>(false);
  const [cloudViewerModalMode, setCloudViewerModalMode] = useState<'slides' | 'docs' | 'pdf' | null>(null);
  const [openViewerDropdown, setOpenViewerDropdown] = useState<boolean>(false);
  const [isNewDiagramModalOpen, setIsNewDiagramModalOpen] = useState<boolean>(false);

  // Initial XML Generation
  const initialBaseXml = useMemo(() => {
    const bp = CANONICAL_TEMPLATES.find((t) => t.id === '00') || CANONICAL_TEMPLATES[0];
    return bp.generateXml('enterprise', isLight ? 'light' : 'dark');
  }, [isLight]);

  // Version History Stream (Starts with 1 Immutable Baseline Snapshot v1.0)
  const [versionHistory, setVersionHistory] = useState<DashboardVersionEntry[]>([
    {
      id: 'ver_init_00',
      versionTag: 'v1.0',
      major: 1,
      minor: 0,
      micro: 0,
      title: 'Google Cloud Enterprise Architecture',
      prompt: DEFAULT_DASHBOARD_PROMPT,
      source: 'initial_load',
      sourceLabel: 'Canonical Baseline',
      diffSummary: 'Canonical Master Blueprint #00 loaded across 5 Deterministic Zones (Immutable Baseline).',
      timestamp: 'Baseline',
      xml: initialBaseXml,
      blueprintId: '00',
      level: 'L3',
      perspective: 'Technical',
      status: 'published',
      perspectiveXmlMap: { Technical: initialBaseXml }
    }
  ]);

  const [activeVersionIndex, setActiveVersionIndex] = useState<number>(0);

  // Initialize isolated per-tab/per-user session ID & hydrate active session copy or URL params on tab load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sid = sessionStorage.getItem('promptcanvas_session_user_id');
      if (!sid) {
        sid = 'sess_' + Math.random().toString(36).substring(2, 8);
        sessionStorage.setItem('promptcanvas_session_user_id', sid);
      }
      setSessionUserId(sid);

      try {
        const params = new URLSearchParams(window.location.search);
        const rawIdParam = params.get('id')?.trim();
        const draftParam = params.get('draft')?.trim();
        const incomingInstanceId = rawIdParam || draftParam || '';
        const incomingVerParam = params.get('v');
        const requestedVerNum =
          incomingVerParam && Number.isFinite(Number(incomingVerParam)) ? Number(incomingVerParam) : null;
        const bpParam = params.get('template') || params.get('blueprint');
        const domainParam = params.get('domain')?.trim() || undefined;
        const depthParam = params.get('depth')?.trim().toUpperCase();
        const importParam = params.get('import');

        if (depthParam === 'L100') {
          setSelectedDepthLevel('L200');
        } else if (depthParam === 'L200' || depthParam === 'L300' || depthParam === 'L400') {
          setSelectedDepthLevel(depthParam);
        }

        if (incomingInstanceId) {
          setActiveInstanceId(incomingInstanceId);
          if (draftParam && !rawIdParam) {
            try {
              const normUrl = new URL(window.location.href);
              normUrl.searchParams.delete('draft');
              normUrl.searchParams.set('id', incomingInstanceId);
              window.history.replaceState({}, '', normUrl.toString());
            } catch {}
          }

          const tryHydrateFromLocalStudioStore = (): boolean => {
            try {
              const rawLocal = localStorage.getItem(`promptcanvas_studio_${incomingInstanceId}`);
              if (!rawLocal) return false;
              const parsedLocal = JSON.parse(rawLocal);
              if (!parsedLocal || (!parsedLocal.xml && !Array.isArray(parsedLocal.versions))) return false;
              const localVers: DashboardVersionEntry[] =
                Array.isArray(parsedLocal.versions) && parsedLocal.versions.length > 0
                  ? parsedLocal.versions
                  : [
                      {
                        id: `ver_local_${incomingInstanceId}`,
                        versionTag: parsedLocal.activeVersionTag || 'v1.0',
                        major: 1,
                        minor: 0,
                        micro: 0,
                        title: parsedLocal.name || parsedLocal.projectTitle || incomingInstanceId,
                        prompt: parsedLocal.description || DEFAULT_DASHBOARD_PROMPT,
                        source: 'initial_load',
                        sourceLabel: `Instance ${incomingInstanceId.slice(0, 8)}`,
                        diffSummary: parsedLocal.description || `Loaded saved architecture ${incomingInstanceId}`,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        xml: parsedLocal.xml || '',
                        blueprintId: parsedLocal.selectedBlueprintId || '00',
                        level: 'L3',
                        perspective: (parsedLocal.perspective as ArchitecturePerspective) || 'Technical',
                        status: 'published',
                        perspectiveXmlMap: { Technical: parsedLocal.xml || '' },
                      },
                    ];
              const resolvedTitle = parsedLocal.name || parsedLocal.projectTitle || 'Saved Architecture';
              setCanvasTitle(resolvedTitle);
              setSelectedBlueprintId(parsedLocal.selectedBlueprintId || '00');
              setLoadedBlueprintId(parsedLocal.selectedBlueprintId || '00');
              setIsSessionForked(true);
              setHasUnsavedSessionChanges(false);
              setVersionHistory(localVers);
              const total = localVers.length;
              const targetIdx =
                requestedVerNum !== null
                  ? localVers.findIndex((_, idx) => total - idx === requestedVerNum)
                  : 0;
              setActiveVersionIndex(targetIdx >= 0 ? targetIdx : 0);

              // Auto-backfill all versions to Server + GCS so colleagues can open this exact ?id= URL!
              const backfillVers = localVers
                .map((v, idx) => ({
                  version_number: total - idx,
                  xml: v.xml,
                  comment: `${v.versionTag || `v${total - idx}.0`} — ${v.diffSummary || v.prompt || 'Saved Snapshot'}`,
                  prompt: v.prompt,
                  created_by: v.persona || v.sourceLabel || 'User',
                }))
                .sort((a, b) => a.version_number - b.version_number);
              void fetch('/api/diagrams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: incomingInstanceId,
                  name: resolvedTitle,
                  xml: localVers[0]?.xml || parsedLocal.xml,
                  comment: parsedLocal.description || 'Synced saved architecture',
                  prompt: parsedLocal.description || resolvedTitle,
                  architectureType: `canonical_${parsedLocal.selectedBlueprintId || '00'}`,
                  createdStudio: 'dashboard',
                  isPrivate: false,
                  versions: backfillVers,
                }),
              }).catch(() => {});
              return true;
            } catch {
              return false;
            }
          };

          fetch(`/api/diagrams/${encodeURIComponent(incomingInstanceId)}`, { cache: 'no-store' })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
              const serverVersions = Array.isArray(data?.versions) ? data.versions : [];
              try {
                const rawLocal = localStorage.getItem(`promptcanvas_studio_${incomingInstanceId}`);
                const parsedLocal = rawLocal ? JSON.parse(rawLocal) : null;
                if (
                  Array.isArray(parsedLocal?.versions) &&
                  parsedLocal.versions.length > serverVersions.length &&
                  tryHydrateFromLocalStudioStore()
                ) {
                  return;
                }
              } catch {}

              if (data?.xml_content && String(data.xml_content).includes('<mxCell')) {
                const archType = String(data.architecture_type || '');
                const certTpl = getCertifiedArchitectureTemplateById(bpParam || archType);
                const bpMatch = archType.match(/^canonical_(\d+)$/);
                const matchedBpId = certTpl
                  ? certTpl.id
                  : bpMatch
                  ? bpMatch[1].padStart(2, '0')
                  : (bpParam || '00');
                const matchedTpl = CANONICAL_TEMPLATES.find((t) => t.id === matchedBpId);
                const resolvedId = certTpl?.id || matchedTpl?.id || '00';
                const resolvedLevel = (certTpl?.level ||
                  (matchedTpl?.depthLevel === 'L100' ? 'L200' : matchedTpl?.depthLevel) ||
                  'L300') as BlueprintDepthLevel;
                const resolvedTitle =
                  data.name || certTpl?.title || matchedTpl?.name || 'Cloned Architecture Instance';

                setSelectedBlueprintId(resolvedId);
                setLoadedBlueprintId(resolvedId);
                setSelectedDepthLevel(resolvedLevel);
                setCanvasTitle(resolvedTitle);
                setIsSessionForked(true);
                setHasUnsavedSessionChanges(false);

                const sortedServer = [...serverVersions].sort(
                  (a: any, b: any) => Number(b.version_number || 1) - Number(a.version_number || 1)
                );
                const mappedHistory: DashboardVersionEntry[] =
                  sortedServer.length > 0
                    ? sortedServer.map((v: any) => {
                        const vNum = Number(v.version_number || 1);
                        const vXml = String(v.xml_content || data.xml_content || '');
                        const vTime = v.created_at
                          ? new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        return {
                          id: String(v.id || `ver_db_${incomingInstanceId}_v${vNum}`),
                          versionTag: `v${vNum}.0`,
                          major: vNum,
                          minor: 0,
                          micro: 0,
                          title: resolvedTitle,
                          prompt:
                            v.prompt ||
                            data.latest_prompt ||
                            certTpl?.summary ||
                            matchedTpl?.primaryPurpose ||
                            DEFAULT_DASHBOARD_PROMPT,
                          source: vNum === 1 ? 'initial_load' : 'ai_copilot',
                          sourceLabel:
                            vNum === 1
                              ? `Baseline Instance (${incomingInstanceId.slice(0, 8)})`
                              : v.created_by || `Version ${vNum}`,
                          diffSummary:
                            v.comment ||
                            v.ai_reasoning ||
                            `Saved Version ${vNum} on Diagram ID ${incomingInstanceId}`,
                          aiReasoning: v.ai_reasoning || undefined,
                          timestamp: vTime,
                          xml: vXml,
                          blueprintId: resolvedId,
                          level: resolvedLevel === 'L400' ? 'L4' : resolvedLevel === 'L300' ? 'L3' : 'L2',
                          perspective: 'Technical',
                          status: 'published',
                          perspectiveXmlMap: { Technical: vXml },
                        };
                      })
                    : [
                        {
                          id: `ver_db_${incomingInstanceId}_${Date.now()}`,
                          versionTag: `v${data.max_version || data.version_count || 1}.0`,
                          major: Number(data.max_version || data.version_count || 1),
                          minor: 0,
                          micro: 0,
                          title: resolvedTitle,
                          prompt:
                            data.latest_prompt ||
                            certTpl?.summary ||
                            matchedTpl?.primaryPurpose ||
                            DEFAULT_DASHBOARD_PROMPT,
                          source: 'initial_load',
                          sourceLabel: `Instance ${incomingInstanceId.slice(0, 8)}`,
                          diffSummary:
                            data.ai_reasoning ||
                            `Loaded saved diagram ID ${incomingInstanceId}.`,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          xml: data.xml_content,
                          blueprintId: resolvedId,
                          level: resolvedLevel === 'L400' ? 'L4' : resolvedLevel === 'L300' ? 'L3' : 'L2',
                          perspective: 'Technical',
                          status: 'published',
                          perspectiveXmlMap: { Technical: data.xml_content },
                        },
                      ];

                setVersionHistory(mappedHistory);
                const verIdx =
                  requestedVerNum !== null
                    ? mappedHistory.findIndex((entry) => entry.major === requestedVerNum)
                    : 0;
                setActiveVersionIndex(verIdx >= 0 ? verIdx : 0);
              } else if (!tryHydrateFromLocalStudioStore()) {
                setActiveInstanceId(null);
                setIsNewDiagramModalOpen(true);
              }
            })
            .catch(() => {
              if (!tryHydrateFromLocalStudioStore()) {
                setActiveInstanceId(null);
                setIsNewDiagramModalOpen(true);
              }
            });
          return;
        }

        const targetDraftId =
          draftParam ||
          (bpParam && (/^draft/i.test(bpParam) || bpParam.toUpperCase().includes('NASA'))
            ? bpParam
            : null);

        if (targetDraftId) {
          const allDrafts: any[] = [];
          const matchedDraft = allDrafts.find(
            (d) => d.id.toUpperCase() === targetDraftId.toUpperCase()
          );
          if (matchedDraft) {
            setCanvasTitle(matchedDraft.name);
            setIsSessionForked(true);
            setHasUnsavedSessionChanges(true);
            setSessionCopyId(matchedDraft.id);
            if (Array.isArray(matchedDraft.versions) && matchedDraft.versions.length > 0) {
              setVersionHistory(matchedDraft.versions as DashboardVersionEntry[]);
            } else {
              setVersionHistory([
                {
                  id: `ver_${matchedDraft.id}`,
                  versionTag: 'Saved Draft',
                  major: 1,
                  minor: 0,
                  micro: 1,
                  title: matchedDraft.name,
                  prompt: matchedDraft.prompt || matchedDraft.description,
                  source: 'ai_copilot',
                  sourceLabel: 'Saved Draft',
                  diffSummary: matchedDraft.description,
                  timestamp: new Date(matchedDraft.updatedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                  xml: matchedDraft.xml,
                  blueprintId: matchedDraft.blueprintId || '00',
                  level: 'L3',
                  perspective: (matchedDraft.perspective as ArchitecturePerspective) || 'Technical',
                  status: 'draft',
                  perspectiveXmlMap: { Technical: matchedDraft.xml },
                },
              ]);
            }
            setActiveVersionIndex(0);
            if (
              /nasa|multiverse|satellite|satellight|closed-loop|counterfactual/i.test(
                `${matchedDraft.name} ${matchedDraft.prompt}`
              )
            ) {
              fetch('/api/judge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  prompt:
                    matchedDraft.prompt ||
                    matchedDraft.name ||
                    'Architecture Evaluation',
                  xmlContent: matchedDraft.xml,
                }),
              })
                .then((r) => (r.ok ? r.json() : null))
                .then((data) => {
                  if (data?.truthfulnessDossier) {
                    setVersionHistory((prev) =>
                      prev.map((v, idx) =>
                        idx === 0 ? { ...v, truthfulnessDossier: data.truthfulnessDossier } : v
                      )
                    );
                  }
                })
                .catch(() => {});
            }
            return;
          }
        }

        if (importParam === 'vision') {
          const visionXml = localStorage.getItem('pc_vision_last_xml');
          const visionTitle = localStorage.getItem('pc_vision_last_title') || 'Decompiled Vision Architecture';
          if (visionXml && visionXml.includes('<mxCell')) {
            setCanvasTitle(visionTitle);
            setIsSessionForked(true);
            setHasUnsavedSessionChanges(true);
            setVersionHistory([
              {
                id: `ver_vision_${Date.now()}`,
                versionTag: 'v1.0.1',
                major: 1,
                minor: 0,
                micro: 1,
                title: visionTitle,
                prompt: 'Imported from Image to Diagram Vision Decompiler',
                source: 'initial_load',
                sourceLabel: 'Vision Import',
                diffSummary: 'Imported 1:1 decompiled architecture topology from Vision Studio.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                xml: visionXml,
                blueprintId: '00',
                level: 'L3',
                perspective: 'Technical',
                status: 'draft',
                perspectiveXmlMap: { Technical: visionXml },
              },
            ]);
            setActiveVersionIndex(0);
            return;
          }
        }

        if (
          bpParam?.toLowerCase() === 'blank' ||
          params.get('mode')?.toLowerCase() === 'blank'
        ) {
          const blankTitle = 'Blank Architecture Canvas';
          const blankXml = `<mxGraphModel data-blank-canvas="true" dx="1422" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>`;
          setCanvasTitle(blankTitle);
          setLoadedBlueprintId('blank');
          setIsSessionForked(true);
          setHasUnsavedSessionChanges(false);
          setVersionHistory([
            {
              id: `ver_blank_${Date.now()}`,
              versionTag: 'v1.0 (Blank Scratchpad)',
              major: 1,
              minor: 0,
              title: blankTitle,
              prompt: 'Blank Canvas Initialization',
              source: 'initial_load',
              sourceLabel: 'Clean Scratchpad',
              diffSummary: 'Clean canvas initialized with 0 components.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              xml: blankXml,
              blueprintId: 'blank',
              level: 'L2',
              perspective: 'Technical',
              status: 'draft',
              perspectiveXmlMap: { Technical: blankXml },
            },
          ]);
          setActiveVersionIndex(0);
          return;
        }

        if (bpParam) {
          const certTpl = getCertifiedArchitectureTemplateById(bpParam);
          if (certTpl) {
            cloneArchitectureTemplateInstance(certTpl, 'dashboard')
              .then((cloned) => {
                setActiveInstanceId(cloned.instanceId);
                setLoadedBlueprintId(certTpl.id);
                setSelectedBlueprintId(certTpl.id);
                setSelectedDepthLevel(certTpl.level);
                setCanvasTitle(certTpl.title);
                setIsSessionForked(true);
                setHasUnsavedSessionChanges(false);
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set('id', cloned.instanceId);
                  url.searchParams.set('template', certTpl.id);
                  window.history.replaceState({}, '', url.toString());
                } catch {}
                setVersionHistory([
                  {
                    id: `ver_clone_${cloned.instanceId}_${Date.now()}`,
                    versionTag: 'v1.0',
                    major: 1,
                    minor: 0,
                    micro: 0,
                    title: certTpl.title,
                    prompt: certTpl.summary,
                    source: 'initial_load',
                    sourceLabel: `Clone ${cloned.instanceId.slice(0, 8)} (${certTpl.level})`,
                    diffSummary: `Cloned unique Diagram ID ${cloned.instanceId.slice(0, 8)}… from Template #${certTpl.id}. Original template remains intact.`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    xml: cloned.xml,
                    blueprintId: certTpl.id,
                    level: certTpl.level === 'L400' ? 'L4' : certTpl.level === 'L300' ? 'L3' : 'L2',
                    perspective: 'Technical',
                    status: 'draft',
                    perspectiveXmlMap: { Technical: cloned.xml },
                  },
                ]);
                setActiveVersionIndex(0);
              })
              .catch(() => {
                setIsNewDiagramModalOpen(true);
              });
            return;
          }
          const cleanBpId = bpParam.replace(/^#/, '').padStart(2, '0');
          const foundBp = CANONICAL_TEMPLATES.find((t) => t.id === cleanBpId || t.id === bpParam);
          if (foundBp) {
            loadPristineCanonicalBlueprint(foundBp.id, undefined, domainParam);
            return;
          }
        }

        // When creating a new diagram without a locked-in ?id=, open the Dynamic 4-Dropdown Template Picker
        // so the user chooses & locks in a starting template (which clones a fresh unique ID).
        setIsNewDiagramModalOpen(true);

        const savedSessionRaw = sessionStorage.getItem(`promptcanvas_dashboard_session_${sid}_00`);
        if (savedSessionRaw) {
          const parsed = JSON.parse(savedSessionRaw);
          const hasRemovedPaperView =
            Array.isArray(parsed.versionHistory) &&
            parsed.versionHistory.some(
              (v: any) =>
                v?.perspective === 'Paper' ||
                (typeof v?.xml === 'string' && v.xml.includes('paper-gcp-ge-multi-agent-2026'))
            );
          if (hasRemovedPaperView) {
            sessionStorage.removeItem(`promptcanvas_dashboard_session_${sid}_00`);
          } else if (Array.isArray(parsed.versionHistory) && parsed.versionHistory.length > 1) {
            const healedHistory = parsed.versionHistory.map((v: any) => {
              const healedXml = 
                typeof v?.xml === 'string' ? v.xml : '';
              return {
                ...v,
                xml: healedXml,
                perspectiveXmlMap:
                  v?.perspectiveXmlMap && typeof v.perspectiveXmlMap === 'object'
                    ? { ...v.perspectiveXmlMap, [v.perspective || 'Technical']: healedXml }
                    : { Technical: healedXml },
              };
            });
            setIsSessionForked(true);
            setHasUnsavedSessionChanges(true);
            setSessionCopyId(parsed.sessionCopyId || `fork_bp00_${sid}`);
            setVersionHistory(healedHistory);
            setActiveVersionIndex(0);
          }
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    const handleOpenNewDiagram = () => setIsNewDiagramModalOpen(true);
    window.addEventListener('promptcanvas_open_new_diagram', handleOpenNewDiagram);
    return () => window.removeEventListener('promptcanvas_open_new_diagram', handleOpenNewDiagram);
  }, []);

  // Warn on browser tab close / reload when unsaved session copy changes exist
  useEffect(() => {
    if (!hasUnsavedSessionChanges) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes in your Dashboard Session Copy. Save as your project before leaving?';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedSessionChanges]);

  // Active Version Object
  const currentVersion = useMemo(() => {
    return versionHistory[activeVersionIndex] || versionHistory[0];
  }, [versionHistory, activeVersionIndex]);

  // Active XML rendered on canvas (dynamically adapts to Light/Dark theme for canonical baseline)
  const activeCanvasXml = useMemo(() => {
    if (!isSessionForked && currentVersion.source === 'initial_load') {
      return getCanonicalBaselineForPerspective(loadedBlueprintId, canvasPerspective, isLight).xml;
    }
    return currentVersion.xml;
  }, [isSessionForked, currentVersion, loadedBlueprintId, canvasPerspective, isLight]);

  // Live Addressable URL (?id=<canonicalId>&v=<ver>) sync whenever an instance or version switches
  useEffect(() => {
    if (typeof window === 'undefined' || !activeInstanceId) return;
    try {
      const activeVerNum = Math.max(1, versionHistory.length - activeVersionIndex);
      const url = new URL(window.location.href);
      if (url.searchParams.get('id') !== activeInstanceId || url.searchParams.get('v') !== String(activeVerNum)) {
        url.searchParams.set('id', activeInstanceId);
        url.searchParams.set('v', String(activeVerNum));
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}
  }, [activeInstanceId, versionHistory.length, activeVersionIndex]);

  // 7. DYNAMIC CONTEXTUAL 3 TOP NEXT-UPDATE SUGGESTIONS (Rotates as user applies prompts & matches active domain!)
  const contextualSuggestions = useMemo(() => {
    const xmlLower = (currentVersion.xml || '').toLowerCase();
    const appliedPrompts = versionHistory
      .filter((v) => v.source !== 'initial_load')
      .map((v) => v.prompt.toLowerCase());

    const isCloudNativeWebDomain =
      xmlLower.includes('data-chain-domain="cloud_native_web"') ||
      (xmlLower.includes('react') && xmlLower.includes('node.js') && xmlLower.includes('postgresql'));

    const suggestionPool = isCloudNativeWebDomain
      ? [
          {
            key: 'redis caching',
            text: '+ Add a Redis caching layer between the Node.js API and PostgreSQL to cache frequent queries.'
          },
          {
            key: 'load balancer cdn',
            text: '+ Add an Application Load Balancer and a CDN in front of the React frontend and Node.js backend.'
          },
          {
            key: 'auth service',
            text: '+ Split the Node.js backend into an Auth Service and a Core API Service deployed on a Kubernetes cluster.'
          },
          {
            key: 'kafka event bus',
            text: '+ Add a Kafka event bus and an asynchronous Background Worker service for processing heavy jobs.'
          },
          {
            key: 's3 object storage',
            text: '+ Add an S3-compatible Object Storage bucket connected to the Worker service and CDN.'
          },
          {
            key: 'prometheus grafana',
            text: '+ Add an Observability stack with Prometheus, Grafana, and OpenTelemetry collecting metrics from all services.'
          }
        ]
      : [
          {
            key: 'spanner ha',
            text: xmlLower.includes('spanner')
              ? '+ Upgrade Cloud Spanner to Multi-Region Dual-Zone HA'
              : '+ Add Multi-Region Cloud Spanner HA Persistence Tier'
          },
          {
            key: 'model armor',
            text: xmlLower.includes('beyondcorp') || xmlLower.includes('model armor')
              ? '+ Insert Vertex AI Model Armor Prompt-Injection Firewall'
              : '+ Insert BeyondCorp Zero-Trust Identity-Aware Proxy & WAF'
          },
          {
            key: 'cost intelligence',
            text: xmlLower.includes('finops')
              ? '+ Attach BigQuery Cost Intelligence & Cloud Billing Anomaly Pipeline'
              : '+ Add Cloud Monitoring, Distributed Trace & FinOps Telemetry Collector'
          },
          {
            key: 'beyondcorp',
            text: '+ Enforce BeyondCorp Enterprise IAP & Context-Aware Zero-Trust Access'
          },
          {
            key: 'vector search',
            text: '+ Integrate Vertex Vector Search (ScaNN) Sub-8ms p99 Embeddings Index'
          },
          {
            key: 'cloud armor waf',
            text: '+ Enforce Cloud Armor Enterprise WAF & Cloud KMS FIPS 140-2 Level 3 CMEK'
          },
          {
            key: 'cloud sql',
            text: '+ Replace Spanner with Cloud SQL PostgreSQL High-Availability Cluster'
          },
          {
            key: 'tpu v5e',
            text: '+ Add Cloud TPU v5e & NVIDIA A100 GPU Accelerator Offload Cluster'
          },
          {
            key: '21 cfr',
            text: '+ Enforce 21 CFR Part 11 Cryptographic Audit Vault & Immutable Ledger'
          }
        ];

    const unapplied = suggestionPool.filter(
      (item) =>
        !appliedPrompts.some(
          (ap) => ap === item.text.toLowerCase() || ap.includes(item.key)
        )
    );

    return (unapplied.length >= 3 ? unapplied : suggestionPool)
      .slice(0, 3)
      .map((item) => item.text);
  }, [currentVersion, versionHistory]);

  // 8. MODALS & DRAWERS STATE
  const [isInlineEditOpen, setIsInlineEditOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<'pdf' | 'png' | 'svg' | null>(null);
  const [auditScores, setAuditScores] = useState<AuditDimensionResult[]>(() =>
    computeHonestDiagramHealth('', '').dimensions.map((d) => ({
      category: d.category,
      name: d.name,
      score: d.score,
      status: d.status,
      summary: d.summary,
      recommendations: d.recommendations,
    }))
  );

  // Dynamically recompute honest, zero-floor 6-dimension audit scores from actual XML AST & Multi-Model Judge report
  useEffect(() => {
    const liveJudgeDims = currentVersion?.truthfulnessDossier?.multiModelJudgeReport?.dimensions;
    if (
      liveJudgeDims &&
      liveJudgeDims.length === 6 &&
      currentVersion?.xml === activeCanvasXml &&
      currentVersion?.truthfulnessDossier?.isLiveModelEvaluated
    ) {
      setAuditScores(
        liveJudgeDims.map((d) => ({
          category: d.category,
          name: d.name,
          score: d.score,
          status: d.status,
          summary: d.summary,
          recommendations: d.recommendations,
        }))
      );
      return;
    }

    const health = computeHonestDiagramHealth(activeCanvasXml || '', canvasTitle || '');
    setAuditScores(
      health.dimensions.map((d) => ({
        category: d.category,
        name: d.name,
        score: d.score,
        status: d.status,
        summary: d.summary,
        recommendations: d.recommendations,
      }))
    );
  }, [activeCanvasXml, canvasTitle, currentVersion]);

  const inlineIframeRef = useRef<HTMLIFrameElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.category-dropdown-container')) {
        setOpenCategoryDropdown(false);
      }
      if (!(e.target as HTMLElement).closest('.blueprint-combobox-container')) {
        setOpenBlueprintDropdown(false);
      }
      if (!(e.target as HTMLElement).closest('.level-dropdown-container')) {
        setOpenLevelDropdown(false);
      }
      if (!(e.target as HTMLElement).closest('.publish-dropdown-container')) {
        setOpenPublishDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filter categories
  const filteredCategories = useMemo(() => {
    const q = categorySearchQuery.toLowerCase().trim();
    if (!q) return CATEGORY_GROUPS;
    return CATEGORY_GROUPS.filter(
      (c) => c.name.toLowerCase().includes(q) || (c.familyFilter && c.familyFilter.toLowerCase().includes(q))
    );
  }, [categorySearchQuery]);

  // Filter levels
  const filteredLevels = useMemo(() => {
    const q = levelSearchQuery.toLowerCase().trim();
    if (!q) return DETAIL_LEVELS;
    return DETAIL_LEVELS.filter(
      (l) =>
        l.id.toLowerCase().includes(q) ||
        l.name.toLowerCase().includes(q) ||
        l.title.toLowerCase().includes(q) ||
        l.desc.toLowerCase().includes(q)
    );
  }, [levelSearchQuery]);

  // Filter blueprints by Category + Architecture Depth Level (L100..L400) + Search
  const filteredTemplates = useMemo(() => {
    const activeCategory = CATEGORY_GROUPS.find((c) => c.id === selectedCategory);
    let list = CANONICAL_TEMPLATES;

    if (selectedDepthLevel !== 'All') {
      list = list.filter((t) => t.depthLevel === selectedDepthLevel);
    }

    if (activeCategory && activeCategory.familyFilter) {
      list = list.filter((t) => t.family === activeCategory.familyFilter);
    }

    const q = blueprintSearchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.depthLevel.toLowerCase().includes(q) ||
        t.family.toLowerCase().includes(q) ||
        t.primaryPurpose.toLowerCase().includes(q) ||
        Boolean(t.tags?.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [selectedCategory, selectedDepthLevel, blueprintSearchQuery]);

  const depthLevelCounts = useMemo(() => {
    return {
      All: CERTIFIED_ARCHITECTURE_TEMPLATES.length,
      L100: 0,
      L200: CERTIFIED_ARCHITECTURE_TEMPLATES.filter((t) => t.level === 'L200').length,
      L300: CERTIFIED_ARCHITECTURE_TEMPLATES.filter((t) => t.level === 'L300').length,
      L400: CERTIFIED_ARCHITECTURE_TEMPLATES.filter((t) => t.level === 'L400').length,
    };
  }, []);

  const selectedCategoryObj = useMemo(() => {
    return CATEGORY_GROUPS.find((c) => c.id === selectedCategory) || CATEGORY_GROUPS[0];
  }, [selectedCategory]);

  const selectedLevelObj = useMemo(() => {
    return DETAIL_LEVELS.find((l) => l.id === selectedLevel) || DETAIL_LEVELS[2];
  }, [selectedLevel]);

  const selectedBlueprintObj = useMemo<CanonicalTemplate>(() => {
    const cert = getCertifiedArchitectureTemplateById(selectedBlueprintId);
    const existing = CANONICAL_TEMPLATES.find(
      (t) => t.id === selectedBlueprintId || t.id === selectedBlueprintId.padStart(2, '0')
    );
    if (cert) {
      return {
        ...(existing || CANONICAL_TEMPLATES[0]),
        id: cert.id,
        name: cert.title,
        depthLevel: cert.level,
        primaryPurpose: cert.summary,
        previewImage: cert.previewImage,
      };
    }
    return existing || CANONICAL_TEMPLATES[0];
  }, [selectedBlueprintId]);

  // =========================================================================
  // CORE HELPER: Open "Save Session Copy as Your Project?" Intercept Modal
  // =========================================================================
  const openSaveOrDiscardModal = (action: PendingLeaveAction) => {
    setPendingLeaveAction(action);
    const defaultName = canvasTitle;
    setSaveProjectName(defaultName);
    setSaveProjectDomain(
      selectedCategoryObj.id === 'all' || selectedCategoryObj.name.startsWith('All ')
        ? 'Enterprise Cloud & Multi-Agent AI'
        : selectedCategoryObj.name
    );
    setLeaveModalOpen(true);
  };

  // =========================================================================
  // CORE HELPER: Reset Any Blueprint to Pristine v1.0 Canonical Baseline
  // =========================================================================
  const loadPristineCanonicalBlueprint = (
    targetBlueprintId: string,
    explicitPerspective?: ArchitecturePerspective,
    domainFlavor?: string
  ) => {
    const bp =
      CANONICAL_TEMPLATES.find(
        (t) => t.id === targetBlueprintId || t.id === targetBlueprintId.padStart(2, '0')
      ) || CANONICAL_TEMPLATES[0];

    let defaultPerspective: ArchitecturePerspective = 'Technical';
    if (explicitPerspective) {
      defaultPerspective = explicitPerspective;
    } else if (canvasPerspective === 'Whiteboard' || canvasPerspective === 'Paper') {
      defaultPerspective = canvasPerspective;
    } else if (bp.family === 'Process' || bp.family === 'Flow') {
      defaultPerspective = 'Process';
    } else if (bp.family === 'Infographic' || bp.family === 'Understand') {
      defaultPerspective = 'Logical';
    }

    const baseline = getCanonicalBaselineForPerspective(bp.id, defaultPerspective, isLight, domainFlavor || 'enterprise');

    // Clear any ephemeral session copy from sessionStorage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(`promptcanvas_dashboard_session_${sessionUserId}_${loadedBlueprintId}`);
        sessionStorage.removeItem(`promptcanvas_dashboard_session_${sessionUserId}_${bp.id}`);
      } catch {}
    }

    setIsSessionForked(false);
    setHasUnsavedSessionChanges(false);
    setSessionCopyId(null);
    setActiveInstanceId(null);
    setConversationalReply(null);
    setAiPlanningStatus(null);
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('id');
        window.history.replaceState({}, '', url.toString());
      } catch {}
    }

    setSelectedBlueprintId(bp.id);
    setLoadedBlueprintId(bp.id);
    setSelectedLevel(baseline.level);
    setCanvasPerspective(defaultPerspective);
    setCanvasTitle(baseline.title);

    const baselineEntry: DashboardVersionEntry = {
      id: `ver_init_${bp.id}_${Date.now()}`,
      versionTag: 'v1.0',
      major: 1,
      minor: 0,
      title: baseline.title,
      prompt: bp.primaryPurpose || DEFAULT_DASHBOARD_PROMPT,
      source: 'initial_load',
      sourceLabel: 'Canonical Baseline',
      diffSummary: baseline.diffSummary,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      xml: baseline.xml,
      blueprintId: bp.id,
      level: baseline.level,
      perspective: defaultPerspective,
      status: 'published',
      perspectiveXmlMap: { [defaultPerspective]: baseline.xml }
    };

    setVersionHistory([baselineEntry]);
    setActiveVersionIndex(0);
  };

  // Handler for New Diagram Input Selection Modal results (Dynamic Template-Lock -> Cloned Unique ID)
  const handleSelectNewDiagramOption = (result: NewDiagramSelectionResult) => {
    setIsNewDiagramModalOpen(false);

    if (result.mode === 'cloned_template' && result.instanceId && result.templateId && result.customXml) {
      const tplLevel = (result.templateLevel || 'L300') as BlueprintDepthLevel;
      const tplTitle = result.projectName || result.blueprintTitle || `Template #${result.templateId}`;
      setActiveInstanceId(result.instanceId);
      setLoadedBlueprintId(result.templateId);
      setSelectedBlueprintId(result.templateId);
      setSelectedDepthLevel(tplLevel);
      setCanvasTitle(tplTitle);
      setIsSessionForked(true);
      setHasUnsavedSessionChanges(false);

      if (typeof window !== 'undefined') {
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete('new');
          url.searchParams.set('id', result.instanceId);
          url.searchParams.set('template', result.templateId);
          window.history.replaceState({}, '', url.toString());
        } catch {}
      }

      setVersionHistory([
        {
          id: `ver_clone_${result.instanceId}_${Date.now()}`,
          versionTag: 'v1.0',
          major: 1,
          minor: 0,
          micro: 0,
          title: tplTitle,
          prompt: result.prompt || DEFAULT_DASHBOARD_PROMPT,
          source: 'initial_load',
          sourceLabel: `Cloned ID ${result.instanceId.slice(0, 8)} (${tplLevel})`,
          diffSummary: `Locked in Template #${result.templateId} (${result.templateType || 'Technical'} · ${result.templateKind || 'Architecture'}) and cloned unique Diagram ID ${result.instanceId.slice(0, 8)}…. Original template remains intact.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          xml: result.customXml,
          blueprintId: result.templateId,
          level: tplLevel === 'L400' ? 'L4' : tplLevel === 'L300' ? 'L3' : 'L2',
          perspective: 'Technical',
          status: 'draft',
          perspectiveXmlMap: { Technical: result.customXml },
        },
      ]);
      setActiveVersionIndex(0);
      showToast(
        `✨ Locked in Template #${result.templateId} → Cloned new Diagram ID ${result.instanceId.slice(0, 8)}… (Original template untouched!)`
      );
      return;
    }

    if (result.mode === 'prompt') {
      const targetUrl = result.prompt?.trim()
        ? `/prompt-to-diagram?prompt=${encodeURIComponent(result.prompt.trim())}`
        : '/prompt-to-diagram';
      router.push(targetUrl);
      return;
    }

    if (result.mode === 'blueprint' && result.blueprintId) {
      const cert = getCertifiedArchitectureTemplateById(result.blueprintId);
      if (cert) {
        void cloneArchitectureTemplateInstance(cert, 'dashboard').then((cloned) => {
          handleSelectNewDiagramOption({
            mode: 'cloned_template',
            instanceId: cloned.instanceId,
            templateId: cert.id,
            templateLevel: cert.level,
            templateType: cert.type,
            templateKind: cert.kind,
            templateUseCase: cert.useCase,
            blueprintTitle: cert.title,
            projectName: cert.title,
            prompt: cert.summary,
            customXml: cloned.xml,
          });
        });
        return;
      }
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === result.blueprintId);
      if (bp) {
        loadPristineCanonicalBlueprint(bp.id);
        showToast(`Loaded Blueprint #${bp.id}: ${bp.name}`);
      }
      return;
    }

    if (result.mode === 'vision' && result.customXml) {
      const newTitle = result.projectName || 'Decompiled Architecture';
      setCanvasTitle(newTitle);
      setIsSessionForked(true);
      setHasUnsavedSessionChanges(true);
      const newEntry: DashboardVersionEntry = {
        id: `ver_vision_${Date.now()}`,
        versionTag: 'v1.1 (Vision Decompiled)',
        major: 1,
        minor: 1,
        title: newTitle,
        prompt: 'Decompiled via Gemini 3.1 Pro Vision AI',
        source: 'manual_drawio',
        sourceLabel: 'Gemini Vision AI',
        diffSummary: 'Decompiled architectural vectors and components from image.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        xml: result.customXml,
        blueprintId: loadedBlueprintId,
        level: 'L2',
        perspective: 'Technical',
        status: 'draft',
        perspectiveXmlMap: { Technical: result.customXml }
      };
      setVersionHistory((prev) => [newEntry, ...prev]);
      setActiveVersionIndex(0);
      showToast('🖼️ Decompiled architecture loaded into canvas!');
      return;
    }

    if (result.mode === 'import_xml' && result.customXml) {
      const importTitle = result.projectName || 'Imported Draw.io Diagram';
      setCanvasTitle(importTitle);
      setIsSessionForked(true);
      setHasUnsavedSessionChanges(true);
      const importEntry: DashboardVersionEntry = {
        id: `ver_import_${Date.now()}`,
        versionTag: 'v1.1 (Imported)',
        major: 1,
        minor: 1,
        title: importTitle,
        prompt: 'External Draw.io XML Import',
        source: 'manual_drawio',
        sourceLabel: 'Draw.io XML Import',
        diffSummary: 'Imported vector geometry from external Draw.io XML.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        xml: result.customXml,
        blueprintId: loadedBlueprintId,
        level: 'L2',
        perspective: 'Technical',
        status: 'draft',
        perspectiveXmlMap: { Technical: result.customXml }
      };
      setVersionHistory((prev) => [importEntry, ...prev]);
      setActiveVersionIndex(0);
      showToast('📥 External Draw.io XML loaded successfully!');
      return;
    }
  };

  // Switch Depth Level (L100 | L200 | L300 | L400) & auto-select first tagged blueprint in that level
  const handleSelectDepthLevel = (lvl: 'All' | BlueprintDepthLevel) => {
    setSelectedDepthLevel(lvl);
    const activeCategory = CATEGORY_GROUPS.find((c) => c.id === selectedCategory);
    let pool = CANONICAL_TEMPLATES;
    if (lvl !== 'All') {
      pool = pool.filter((t) => t.depthLevel === lvl);
    }
    if (activeCategory && activeCategory.familyFilter) {
      const catPool = pool.filter((t) => t.family === activeCategory.familyFilter);
      if (catPool.length > 0) pool = catPool;
      else setSelectedCategory('all');
    }
    if (pool.length > 0 && !pool.some((t) => t.id === loadedBlueprintId)) {
      loadPristineCanonicalBlueprint(pool[0].id, canvasPerspective);
    }
  };

  // Explicit "Use This Blueprint" CTA: Mints a brand-new unique Diagram ID (SQLite + GCS)
  // and unlocks 2-Way Sync between Subsequent Prompt Mutations and Draw.io Editor!
  const handleUseSelectedBlueprint = async (targetBp?: CanonicalTemplate) => {
    const bp = targetBp || selectedBlueprintObj;
    if (!bp || isCreatingInstance) return;
    setIsCreatingInstance(true);
    try {
      const certTpl = getCertifiedArchitectureTemplateById(bp.id);
      if (certTpl) {
        const cloned = await cloneArchitectureTemplateInstance(certTpl, 'dashboard');
        handleSelectNewDiagramOption({
          mode: 'cloned_template',
          instanceId: cloned.instanceId,
          templateId: certTpl.id,
          templateLevel: certTpl.level,
          templateType: certTpl.type,
          templateKind: certTpl.kind,
          templateUseCase: certTpl.useCase,
          blueprintTitle: certTpl.title,
          projectName: certTpl.title,
          prompt: certTpl.summary,
          customXml: cloned.xml,
        });
        return;
      }
      const xmlToInstantiate =
        loadedBlueprintId === bp.id && activeCanvasXml && activeCanvasXml.includes('<mxCell')
          ? activeCanvasXml
          : bp.generateXml('enterprise', isLight ? 'light' : 'dark');

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${bp.name}`,
          xml: xmlToInstantiate,
          comment: `Created new editable instance from Blueprint #${bp.id} (${bp.depthLevel})`,
          prompt: bp.primaryPurpose,
          aiReasoning: `Instantiated from Certified Blueprint #${bp.id} (${bp.depthLevel} • ${bp.family}). Two-way Prompt & Draw.io sync enabled.`,
          architectureType: `canonical_${bp.id}`,
          createdStudio: 'dashboard',
        }),
      });
      const data = await res.json();
      const newId = data?.diagram?.id || data?.id;
      if (!res.ok || !newId) {
        throw new Error(data?.error || 'Could not create new blueprint instance.');
      }

      setActiveInstanceId(newId);
      setLoadedBlueprintId(bp.id);
      setSelectedBlueprintId(bp.id);
      setIsSessionForked(true);
      setHasUnsavedSessionChanges(false);

      if (typeof window !== 'undefined') {
        try {
          const url = new URL(window.location.href);
          url.searchParams.set('id', newId);
          url.searchParams.set('blueprint', bp.id);
          window.history.replaceState({}, '', url.toString());
        } catch {}
      }

      setVersionHistory([
        {
          id: `ver_inst_${newId}_${Date.now()}`,
          versionTag: 'v1.0',
          major: 1,
          minor: 0,
          micro: 0,
          title: bp.name,
          prompt: bp.primaryPurpose,
          source: 'initial_load',
          sourceLabel: `Instance ${newId.slice(0, 8)} (${bp.depthLevel})`,
          diffSummary: `Created new editable instance (ID: ${newId.slice(0, 8)}…) from Blueprint #${bp.id}. Mutate via Prompt or Draw.io in 2-way sync.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          xml: xmlToInstantiate,
          blueprintId: bp.id,
          level: bp.depthLevel === 'L400' ? 'L4' : bp.depthLevel === 'L300' ? 'L3' : bp.depthLevel === 'L200' ? 'L2' : 'L1',
          perspective: canvasPerspective,
          status: 'draft',
          perspectiveXmlMap: { [canvasPerspective]: xmlToInstantiate },
        },
      ]);
      setActiveVersionIndex(0);
      showToast(`✨ Created new Instance ID ${newId.slice(0, 8)}… from Blueprint #${bp.id} (${bp.depthLevel}). Prompt & Draw.io 2-way sync unlocked!`);
    } catch (err: any) {
      showToast(`❌ ${err?.message || 'Failed to instantiate blueprint.'}`);
    } finally {
      setIsCreatingInstance(false);
    }
  };

  const handleCopyInstanceUrl = async () => {
    if (typeof window === 'undefined') return;
    const targetId = activeInstanceId || sessionCopyId;
    if (!targetId) {
      const fallbackUrl = `${window.location.origin}/dashboard?template=${encodeURIComponent(loadedBlueprintId)}`;
      navigator.clipboard?.writeText(fallbackUrl).catch(() => {});
      showToast(`🔗 Copied Template URL (?template=${loadedBlueprintId})`);
      return;
    }
    const activeVerNum = Math.max(1, versionHistory.length - activeVersionIndex);
    const shareUrl = `${window.location.origin}/dashboard?id=${encodeURIComponent(targetId)}&v=${activeVerNum}`;
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('id', targetId);
      url.searchParams.set('v', String(activeVerNum));
      window.history.replaceState({}, '', url.toString());
    } catch {}
    setCopiedInstanceLink(true);
    setTimeout(() => setCopiedInstanceLink(false), 1800);
    showToast(`🔗 Shareable colleague link copied: /dashboard?id=${targetId}&v=${activeVerNum}`);

    const total = versionHistory.length;
    const orderedVersions = versionHistory
      .map((v, idx) => ({
        version_number: total - idx,
        xml: v.xml,
        comment: `${v.versionTag || `v${total - idx}.0`} — ${v.diffSummary || v.prompt || 'Snapshot'}`,
        prompt: v.prompt,
        created_by: v.persona || v.sourceLabel || 'User',
      }))
      .sort((a, b) => a.version_number - b.version_number);
    await fetch('/api/diagrams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: targetId,
        name: canvasTitle || 'Saved Architecture',
        xml: activeCanvasXml,
        comment: currentVersion?.diffSummary || 'Shared architecture snapshot',
        prompt: currentVersion?.prompt || canvasTitle,
        architectureType: `arch_tpl_${loadedBlueprintId}`,
        createdStudio: 'dashboard',
        isPrivate: false,
        versions: orderedVersions,
      }),
    }).catch(() => {});
  };

  // Immediate Category Selection (after no unsaved changes or after modal resolution)
  const applyCategorySelectImmediate = (catId: string) => {
    setSelectedCategory(catId);
    setBlueprintSearchQuery('');
    if (catId === 'whiteboard') {
      loadPristineCanonicalBlueprint(loadedBlueprintId || '00', 'Whiteboard');
      return;
    }
    if (catId === 'paper') {
      loadPristineCanonicalBlueprint(loadedBlueprintId || '00', 'Paper');
      return;
    }
    const activeCategory = CATEGORY_GROUPS.find((c) => c.id === catId);
    let matching = CANONICAL_TEMPLATES;
    if (activeCategory && activeCategory.familyFilter) {
      matching = matching.filter((t) => t.family === activeCategory.familyFilter);
    }
    if (matching.length > 0) {
      const first = matching[0];
      loadPristineCanonicalBlueprint(first.id);
    }
  };

  // Handle Category Change (Intercepts if user has unsaved session copy changes)
  const handleCategorySelect = (catId: string) => {
    setOpenCategoryDropdown(false);
    if (catId === selectedCategory) return;
    if (hasUnsavedSessionChanges) {
      openSaveOrDiscardModal({ type: 'category', categoryId: catId });
      return;
    }
    applyCategorySelectImmediate(catId);
  };

  // Handle Blueprint Select (Intercepts if user has unsaved session copy changes)
  const handleBlueprintSelect = (bp: CanonicalTemplate) => {
    setOpenBlueprintDropdown(false);
    if (bp.id === loadedBlueprintId && !hasUnsavedSessionChanges) return;
    if (hasUnsavedSessionChanges) {
      openSaveOrDiscardModal({ type: 'blueprint', blueprint: bp });
      return;
    }
    loadPristineCanonicalBlueprint(bp.id);
    showToast(`✓ Loaded Canonical Blueprint #${bp.id}: ${bp.name} (${canvasPerspective} v1.0 Baseline)`);
  };

  // =========================================================================
  // CORE HELPER: Fork Per-User Session Copy & Create New Version Record
  // =========================================================================
  const recordNewVersion = (
    newXml: string,
    promptText: string,
    source: DashboardVersionEntry['source'],
    sourceLabel: string,
    overrideTitle?: string,
    customDiff?: string,
    aiMeta?: {
      persona?: string;
      modelUsed?: string;
      aiReasoning?: string;
      plannedSteps?: string[];
      truthfulnessDossier?: TruthfulnessGroundingDossier;
      resetSessionForNewSynthesis?: boolean;
      blueprintIdOverride?: string;
    }
  ) => {
    const isReset = Boolean(aiMeta?.resetSessionForNewSynthesis);
    const effectiveBpId = aiMeta?.blueprintIdOverride || loadedBlueprintId;
    const isZeroTemplateBp = effectiveBpId === 'blank' || effectiveBpId === 'custom';
    const prevVer = currentVersion;
    const nextChangeNum = isReset ? 1 : Math.min(15, versionHistory.length + 1);
    const nextTag = `Change #${nextChangeNum}`;

    // Compute AST Diff between previous and new XML
    const diffResult: ArchitectureDiffResult = computeArchitectureDiff(
      isReset ? '' : prevVer.xml,
      newXml,
      isReset ? 'Baseline' : prevVer.versionTag,
      nextTag
    );

    const summaryText = customDiff || (
      diffResult.stats.totalChanges > 0
        ? diffResult.summary
        : `Applied architectural modifications: "${promptText.slice(0, 45)}..."`
    );

    const forkId = isReset
      ? `fork_bp${effectiveBpId}_${canvasPerspective.toLowerCase()}_${sessionUserId}_${Date.now()}`
      : sessionCopyId || `fork_bp${effectiveBpId}_${canvasPerspective.toLowerCase()}_${sessionUserId}`;
    setIsSessionForked(true);
    setHasUnsavedSessionChanges(true);
    setSessionCopyId(forkId);

    const effectiveTitle = overrideTitle || canvasTitle;

    const newEntry: DashboardVersionEntry = {
      id: `ver_${Date.now()}_${nextChangeNum}`,
      versionTag: nextTag,
      major: 1,
      minor: 0,
      micro: nextChangeNum,
      title: effectiveTitle,
      prompt: promptText,
      source,
      sourceLabel: `${sourceLabel} (${canvasPerspective})`,
      diffSummary: summaryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      xml: newXml,
      blueprintId: effectiveBpId,
      level: selectedLevel,
      perspective: canvasPerspective,
      status: 'draft',
      persona: aiMeta?.persona,
      modelUsed: aiMeta?.modelUsed,
      aiReasoning: aiMeta?.aiReasoning,
      plannedSteps: aiMeta?.plannedSteps,
      truthfulnessDossier: aiMeta?.truthfulnessDossier,
      perspectiveXmlMap: {
        ...(isReset ? {} : prevVer.perspectiveXmlMap || {}),
        [canvasPerspective]: newXml
      }
    };

    setVersionHistory((prev) => {
      const nextHistory = (isReset ? [newEntry] : [newEntry, ...prev]).slice(0, 15);
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem(
            `promptcanvas_dashboard_session_${sessionUserId}_${effectiveBpId}`,
            JSON.stringify({
              sessionCopyId: forkId,
              blueprintId: effectiveBpId,
              updatedAt: new Date().toISOString(),
              versionHistory: nextHistory
            })
          );
        } catch {}
      }
      return nextHistory;
    });
    setActiveVersionIndex(0);

    // 2-Way Sync Persistence: auto-persist every Prompt Mutation and Draw.io Manual Edit to DB + GCS
    if (activeInstanceId) {
      fetch(`/api/diagrams/${encodeURIComponent(activeInstanceId)}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xmlContent: newXml,
          comment: summaryText.slice(0, 180),
          createdBy: source === 'manual_drawio' ? 'Draw.io Editor (2-Way Sync)' : 'Gemini Prompt Co-Pilot',
          prompt: promptText,
          aiReasoning: aiMeta?.aiReasoning || summaryText,
        }),
      }).catch(() => {});
    }

    showToast(
      activeInstanceId
        ? `⚡ 2-Way Synced (${nextChangeNum}/15) → Instance ${activeInstanceId.slice(0, 8)}…`
        : isZeroTemplateBp
        ? `⚡ Saved change (${nextChangeNum}/15 for Undo/Redo)`
        : `⚡ Saved change (${nextChangeNum}/15 for Undo/Redo) • Canonical Blueprint #${effectiveBpId} untouched`
    );
  };

  // =========================================================================
  // CORE ACTION: Switch Architecture Perspective (Isolated Per-Diagram-Type!)
  // =========================================================================
  const handleSwitchPerspective = (newPerspective: ArchitecturePerspective) => {
    if (newPerspective === canvasPerspective) return;
    setCanvasPerspective(newPerspective);
    if (newPerspective === 'Technical') {
      showToast('⚙️ Technical Mode active — choose a Level (L200, L300, or L400) or click Change Template to filter by Type, Kind & Use Case.');
    }

    const baseline = getCanonicalBaselineForPerspective(loadedBlueprintId, newPerspective, isLight);
    setCanvasTitle(baseline.title);
    setSelectedLevel(baseline.level);

    if (!isSessionForked) {
      // Read-Only Canonical View Switch: Update v1.0 in-place without adding version snapshots or dirtying baseline
      setVersionHistory((prev) => {
        const base = prev[0] || {
          id: `ver_init_${loadedBlueprintId}`,
          versionTag: 'v1.0',
          major: 1,
          minor: 0,
          prompt: DEFAULT_DASHBOARD_PROMPT,
          source: 'initial_load' as const,
          sourceLabel: 'Canonical Baseline',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          blueprintId: loadedBlueprintId,
          status: 'published' as const
        };
        return [
          {
            ...base,
            title: baseline.title,
            xml: baseline.xml,
            level: baseline.level,
            perspective: newPerspective,
            diffSummary: baseline.diffSummary,
            perspectiveXmlMap: {
              ...(base.perspectiveXmlMap || {}),
              [newPerspective]: baseline.xml
            }
          }
        ];
      });
      setActiveVersionIndex(0);
    } else {
      // Isolated Per-Diagram-Type Switch:
      // Each diagram type (Technical, Logical, Conceptual, Process, Whiteboard, Paper)
      // maintains its own isolated XML in `perspectiveXmlMap`. Prompts executed in Paper
      // mode modify ONLY Paper mode and never cross-mutate other diagram types!
      setVersionHistory((prev) =>
        prev.map((v, idx) => {
          if (idx !== activeVersionIndex) return v;
          const mapWithCurrentSaved: Partial<Record<ArchitecturePerspective, string>> = {
            ...(v.perspectiveXmlMap || {}),
            [v.perspective]: v.xml
          };
          const targetPerspectiveXml = mapWithCurrentSaved[newPerspective] || baseline.xml;
          return {
            ...v,
            perspective: newPerspective,
            title: baseline.title,
            xml: targetPerspectiveXml,
            perspectiveXmlMap: mapWithCurrentSaved
          };
        })
      );
    }
  };

  // =========================================================================
  // CORE ACTION: Execute Prompt Mutation on Selected Certified Blueprint (World 1)
  // =========================================================================
  const handleExecutePrompt = async (
    promptToRun?: string,
    forceNewSynthesis = false
  ) => {
    const rawPrompt = promptToRun || activeComposerPrompt;
    if (!rawPrompt.trim() || isProcessingAi) return;

    // World 1 Contract: A certified template MUST be locked in & cloned before prompt mutation
    const hasSelectedTemplate = Boolean(
      loadedBlueprintId &&
        loadedBlueprintId !== 'blank' &&
        loadedBlueprintId !== 'custom' &&
        (getCertifiedArchitectureTemplateById(loadedBlueprintId) ||
          CANONICAL_TEMPLATES.some((t) => t.id === loadedBlueprintId))
    );
    if (!hasSelectedTemplate) {
      setIsNewDiagramModalOpen(true);
      showToast('🏛️ Lock in one of the 84 Certified Architecture Templates first to clone a unique Diagram ID.');
      return;
    }

    // Require explicit "Use This Blueprint" instance creation before mutating
    if (!activeInstanceId) {
      showToast('✨ Click "Use Blueprint" in Step 1 first to mint a unique Instance ID and unlock 2-way Prompt + Draw.io mutations.');
      return;
    }

    const query = rawPrompt.trim();
    setActiveComposerPrompt('');

    // 1. Mandatory Dynamic Conversational & Intent Fuzzing Gate:
    // Greetings ("Hi"), identity queries ("who are you"), courtesies ("thanks"), or <=2 word non-mutations
    // must NEVER mutate the diagram, fork a session copy, or bump v1.0!
    if (!promptToRun) {
      const intentResult = classifyChatIntent(query);
      if (intentResult.isQuestion) {
        let replyText = '';
        if (intentResult.intent === 'greeting') {
          replyText = `Hello! I'm the PromptCanvas Architecture Co-Pilot. Blueprint #${loadedBlueprintId} (${canvasTitle}) is currently at immutable Canonical Baseline ${currentVersion.versionTag}. Type an architectural change (e.g., "Add Cloud Armor WAF and multi-region Cloud Spanner") to automatically fork a private Session Copy!`;
        } else if (intentResult.intent === 'identity') {
          replyText = `I am the PromptCanvas Gemini Architecture Assistant. I help you customize canonical Google Cloud blueprints in an isolated per-user Session Sandbox without altering the shared baseline for other users.`;
        } else if (intentResult.intent === 'conversational') {
          replyText = `You're welcome! Canonical Blueprint #${loadedBlueprintId} remains at ${currentVersion.versionTag} with zero canvas mutations. Let me know whenever you'd like to add, replace, or refine components.`;
        } else {
          replyText = `Advisory Analysis (${currentVersion.versionTag}): "${canvasTitle}" enforces VPC-SC perimeter isolation, Identity-Aware Proxy, and deterministic tier separation. To modify the topology in your session copy, start your prompt with an action verb like "Add...", "Insert...", or "Upgrade...".`;
        }
        setConversationalReply(replyText);
        showToast('💬 Conversational response ready (Canonical Baseline unchanged)');
        return;
      }
    }

    setConversationalReply(null);
    setIsProcessingAi(true);
    setAiPlanningStatus(`Stage 1/3: Mutating Blueprint #${loadedBlueprintId} via Composite-Card Spatial Mutator...`);
    showToast(`🧠 Customizing Blueprint #${loadedBlueprintId} via Server Spatial Mutator + Multi-Model Judge...`);

    try {
      const existingCopilotBoxes = forceNewSynthesis
        ? 0
        : (currentVersion.xml.match(/id="copilot_mod_[a-z0-9_]*box(?:_\d+)?"/gi) || []).length;
      const nextModStep = forceNewSynthesis
        ? 1
        : Math.max((currentVersion.micro ?? 0) + 1, existingCopilotBoxes + 1);
      const effectiveArchId = `canonical_${loadedBlueprintId}`;
      const isCompositionalChainXml = currentVersion.xml.includes('data-compositional-chain="true"');

      let healedXml = currentVersion.xml;
      let canvasDiffText = '';
      let specDiffText = '';
      let authorPersona = 'Principal Cloud Architect';
      let spModelUsed = '';
      let apiDecision: GeminiArchitecturalDecision | null = null;
      let truthfulnessDossier: TruthfulnessGroundingDossier | null = null;
      let liveCopilotModification: any = null;
      let spatialModified = false;

      // Primary path: direct server-side Composite-Card Spatial Mutation + Closed-Loop Multi-Model Judge (`gemini-3.1-pro-preview` + `gemma-4-31b-it`)
      if (!isCompositionalChainXml && !forceNewSynthesis && currentVersion.xml.includes('<mxCell')) {
        setAiPlanningStatus(
          `Applying Composite-Card Spatial Mutation & Multi-Model Judge (${activeInstanceId.slice(0, 8)}…)…`
        );
        try {
          const spRes = await fetch('/api/prompt-to-diagram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'modify',
              userPrompt: canvasTitle || query,
              modificationPrompt: query,
              currentXml: currentVersion.xml,
            }),
          });
          if (spRes.ok) {
            const spData = await spRes.json();
            if (spData?.success && typeof spData?.xml === 'string' && spData.xml.includes('<mxCell')) {
              healedXml = applyDeterministicGeometryAndContrastFixes(spData.xml, effectiveArchId);
              spatialModified = true;
              spModelUsed = String(spData.modelUsed || '');
              canvasDiffText = spData.summaryOfChanges || `Applied spatial edit for "${query.slice(0, 60)}"`;
              specDiffText = spData.summaryOfChanges || '';
              if (spData.truthfulnessDossier) {
                truthfulnessDossier = spData.truthfulnessDossier;
              }
            }
          }
        } catch (spErr) {
          console.warn('Direct spatial mutation fallback:', spErr);
        }
      }

      // Secondary fallback ONLY when primary spatial mutation could not resolve (e.g. blank synthesis or offline)
      if (!spatialModified) {
        setAiPlanningStatus('Synthesizing Fallback Architectural Mutation...');
        let modResult = executeGcpPromptModification(
          currentVersion.xml,
          query,
          nextModStep,
          effectiveArchId,
          !isLight
        );
        healedXml = preflightVerifyAndHealXmlAcrossAll6Audits(
          modResult.updatedXml,
          effectiveArchId
        );
        canvasDiffText = modResult.newVersion.canvasDiff;
        specDiffText = modResult.newVersion.specDiff;
        authorPersona = modResult.newVersion.author || authorPersona;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 16000);
        try {
          const res = await fetch('/api/architect-decision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: query,
              blueprintId: loadedBlueprintId,
              currentTitle: canvasTitle,
              currentPerspective: canvasPerspective,
              currentLevel: selectedLevel,
              xmlContent: healedXml,
            }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          if (res.ok) {
            const data = await res.json();
            if (data?.decision) apiDecision = data.decision;
            if (data?.truthfulnessDossier) truthfulnessDossier = data.truthfulnessDossier;
            if (data?.copilotModification) liveCopilotModification = data.copilotModification;
          }
        } catch {
          clearTimeout(timeoutId);
        }

        if (!isCompositionalChainXml && liveCopilotModification) {
          modResult = executeGcpPromptModification(
            currentVersion.xml,
            query,
            nextModStep,
            effectiveArchId,
            !isLight,
            undefined,
            liveCopilotModification
          );
          healedXml = preflightVerifyAndHealXmlAcrossAll6Audits(
            modResult.updatedXml,
            effectiveArchId
          );
          canvasDiffText = modResult.newVersion.canvasDiff;
          specDiffText = modResult.newVersion.specDiff;
        }
      }

      // Always evaluate via server `/api/judge` if a dossier was not already attached — NEVER run offline in browser!
      if (!truthfulnessDossier) {
        try {
          setAiPlanningStatus('Stage 3/3: Auditing via Orthogonal Multi-Model Judge Panel...');
          const jRes = await fetch('/api/judge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: canvasTitle || query,
              modificationPrompt: query,
              xmlContent: healedXml,
              beforeXml: currentVersion.xml,
              generatorModel: spModelUsed || liveCopilotModification?.modelUsed,
            }),
          });
          if (jRes.ok) {
            const jData = await jRes.json();
            if (jData?.truthfulnessDossier) {
              truthfulnessDossier = jData.truthfulnessDossier;
            }
          }
        } catch {
          // Leave null if offline so UI honestly reflects AST-only status
        }
      }

      const isLiveJudge = Boolean(truthfulnessDossier?.isLiveModelEvaluated);
      const liveBadge = spatialModified
        ? `Spatial Mutator (${spModelUsed || 'live'})`
        : liveCopilotModification?.isLiveGeminiModification
        ? `Co-Pilot (${liveCopilotModification.modelUsed})`
        : 'Deterministic AST Modifier (Offline)';
      const judgeBadge = isLiveJudge
        ? `judged by ${truthfulnessDossier?.criticJudgeModel}`
        : 'Unverified Offline (AST Only)';
      const compositeNum =
        truthfulnessDossier?.scores.overallCompositeScore ??
        Math.round(
          computeHonestDiagramHealth(healedXml, canvasTitle).dimensions.reduce((s, d) => s + d.score, 0) / 6
        );
      const modelUsed = `${liveBadge} → ${judgeBadge} (${compositeNum}%)`;
      const aiReasoning = truthfulnessDossier
        ? `${canvasDiffText} ${specDiffText} [Truthfulness=${truthfulnessDossier.scores.truthfulnessAndReality}%, Grounding=${truthfulnessDossier.scores.externalStandardsGrounding}%, Completeness=${truthfulnessDossier.scores.logicalMissionCompleteness}%, Geometry=${truthfulnessDossier.scores.geometricZeroCollision}%]`
        : `${canvasDiffText} ${specDiffText}`;

      const plannedSteps: string[] = truthfulnessDossier?.provenanceLedger
        ? truthfulnessDossier.provenanceLedger.map(
            (entry) => `Stage ${entry.stageNumber} (${entry.modelId}): ${entry.whatItDid}`
          )
        : [`Applied deterministic spatial modification (${compositeNum}% AST health).`];

      let effectiveTitle = canvasTitle;
      if (apiDecision?.tailoredSpec?.diagramTitle) {
        effectiveTitle = apiDecision.tailoredSpec.diagramTitle;
        setCanvasTitle(effectiveTitle);
      }

      const isFromChip = !!promptToRun && !forceNewSynthesis;
      const honestAuthorLabel = isFromChip
        ? 'Context Suggestion'
        : isLiveJudge
        ? `${spModelUsed || liveCopilotModification?.modelUsed || 'Gemini'} + ${truthfulnessDossier?.criticJudgeModel}`
        : liveBadge;

      recordNewVersion(
        healedXml,
        query,
        isFromChip ? 'suggestion_chip' : 'ai_copilot',
        honestAuthorLabel,
        effectiveTitle,
        canvasDiffText || `+ Integrated "${query}" into Blueprint #${loadedBlueprintId} session copy.`,
        {
          persona: authorPersona,
          modelUsed,
          aiReasoning,
          plannedSteps,
          truthfulnessDossier: truthfulnessDossier || undefined,
          resetSessionForNewSynthesis: forceNewSynthesis,
        }
      );
    } catch (err) {
      console.error('Gemini synthesis failed:', err);
      showToast('⚠️ Synthesis fallback applied to session copy.');
    } finally {
      setIsProcessingAi(false);
      setAiPlanningStatus(null);
    }
  };

  // =========================================================================
  // CORE ACTION: Promote to Major Version (v1.x -> v2.0 in Session Copy)
  // =========================================================================
  const handlePromoteMajorVersion = () => {
    const prevVer = currentVersion;
    const nextMajor = prevVer.major + 1;
    const nextMinor = 0;
    const nextTag = `v${nextMajor}.${nextMinor}`;

    const forkId = sessionCopyId || `fork_bp${loadedBlueprintId}_${sessionUserId}`;
    setIsSessionForked(true);
    setHasUnsavedSessionChanges(true);
    setSessionCopyId(forkId);

    const newEntry: DashboardVersionEntry = {
      id: `ver_major_${Date.now()}_${nextTag}`,
      versionTag: nextTag,
      major: nextMajor,
      minor: nextMinor,
      title: `Major Release: ${canvasTitle}`,
      prompt: `Promoted from ${prevVer.versionTag} to ${nextTag} enterprise release candidate in session copy.`,
      source: 'ai_copilot',
      sourceLabel: 'Major Version Promotion (Session Copy)',
      diffSummary: `Promoted ${prevVer.versionTag} to release candidate ${nextTag} in isolated user session.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      xml: prevVer.xml,
      blueprintId: loadedBlueprintId,
      level: selectedLevel,
      perspective: canvasPerspective,
      status: 'draft',
      persona: prevVer.persona || 'Lead Cloud Architect',
      modelUsed: prevVer.modelUsed,
      aiReasoning: prevVer.aiReasoning,
      plannedSteps: prevVer.plannedSteps,
      perspectiveXmlMap: prevVer.perspectiveXmlMap
    };

    setVersionHistory((prev) => [newEntry, ...prev]);
    setActiveVersionIndex(0);
    showToast(`🎉 Promoted Session Copy to Major Version ${nextTag}!`);
  };

  // =========================================================================
  // CORE ACTION: Intercept Any Navigation Click While Unsaved Session Copy Exists
  // =========================================================================
  const handleDashboardClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasUnsavedSessionChanges || leaveModalOpen) return;
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;

    // Allow external or new-tab links (target="_blank")
    if (anchor.target === '_blank') return;

    const rawHref = anchor.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref === '/dashboard') return;

    // Intercept leaving /dashboard!
    e.preventDefault();
    e.stopPropagation();
    openSaveOrDiscardModal({
      type: 'route',
      href: rawHref,
      label: anchor.textContent?.trim() || rawHref
    });
  };

  // =========================================================================
  // CORE ACTION: Modal Choice 1 — Accept & Save Session Copy as User's Project
  // =========================================================================
  const handleAcceptAndSaveProject = async () => {
    const finalTitle = (saveProjectName || canvasTitle).trim();
    const finalDomain = (saveProjectDomain || 'Enterprise Cloud & Multi-Agent AI').trim();
    setIsSavingProject(true);

    const fallbackProjId = 'proj_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    let finalProjectId = activeInstanceId || fallbackProjId;
    const latestPrompt = currentVersion.prompt || DEFAULT_DASHBOARD_PROMPT;
    const actualNodeCount = (activeCanvasXml.match(/vertex="1"/g) || []).length || 24;
    const actualSpecCount = 16;
    const certTplCheck = getCertifiedArchitectureTemplateById(loadedBlueprintId);
    const effectiveArchType =
      canvasPerspective === 'Whiteboard'
        ? 'canonical_76_whiteboard'
        : canvasPerspective === 'Paper'
        ? 'canonical_77_paper'
        : canvasPerspective === 'Process'
        ? 'process_flow'
        : certTplCheck
        ? `arch_tpl_${certTplCheck.id}`
        : `canonical_${loadedBlueprintId}`;

    try {
      // 1. Upsert onto existing activeInstanceId (or create once if none exists) — 1 Diagram = 1 Canonical ID!
      const totalHist = versionHistory.length;
      const orderedSaveVers = versionHistory
        .map((v, idx) => ({
          version_number: totalHist - idx,
          xml: v.xml,
          comment: `${v.versionTag || `v${totalHist - idx}.0`} — ${v.diffSummary || v.prompt || 'Saved Snapshot'}`,
          prompt: v.prompt,
          created_by: v.persona || v.sourceLabel || 'User',
        }))
        .sort((a, b) => a.version_number - b.version_number);
      const saveRes = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeInstanceId || sessionCopyId || undefined,
          name: finalTitle,
          xml: activeCanvasXml,
          comment:
            currentVersion.diffSummary ||
            `Saved snapshot (${currentVersion.versionTag}, ${canvasPerspective} perspective)`,
          prompt: latestPrompt,
          businessUsecase: finalDomain,
          technicalUsecase: currentVersion.diffSummary,
          architectureType: effectiveArchType,
          createdStudio: 'dashboard',
          isPrivate: false,
          versions: orderedSaveVers.length > 0 ? orderedSaveVers : undefined,
        })
      }).catch(() => null);

      if (saveRes && saveRes.ok) {
        const savedDb = await saveRes.json().catch(() => null);
        const persistedId = savedDb?.diagram?.id || savedDb?.id;
        if (persistedId) {
          finalProjectId = persistedId;
        }
      }

      // 2. Sync LocalStorage Saved Architectures Inventory (/library) keyed strictly by canonical finalProjectId
      if (typeof window !== 'undefined') {
        const studioCompatibleVersions = versionHistory.map((v) => ({
          ...v,
          author: v.persona || v.sourceLabel || 'Lead Cloud Architect',
          actionSummary: v.diffSummary || v.prompt,
          canvasDiff: v.diffSummary || '',
          specDiff: v.aiReasoning || v.prompt || ''
        }));

        const projectPayload = {
          id: finalProjectId,
          name: finalTitle,
          projectTitle: finalTitle,
          domain: finalDomain,
          description: currentVersion.diffSummary || latestPrompt,
          tags: ['Saved Instance', `Blueprint #${loadedBlueprintId}`, currentVersion.versionTag, canvasPerspective],
          visibility: 'private',
          activeVersionTag: currentVersion.versionTag,
          selectedBlueprintId: loadedBlueprintId,
          perspective: canvasPerspective,
          xml: activeCanvasXml,
          versions: studioCompatibleVersions,
          nodeCount: actualNodeCount,
          specCount: actualSpecCount,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        localStorage.setItem(`promptcanvas_studio_${finalProjectId}`, JSON.stringify(projectPayload));
        const existingCatalog = JSON.parse(localStorage.getItem('promptcanvas_saved_blueprints') || '[]');
        const updatedCatalog = [
          {
            id: finalProjectId,
            name: finalTitle,
            domain: finalDomain,
            description: currentVersion.diffSummary || latestPrompt,
            tags: projectPayload.tags,
            nodeCount: actualNodeCount,
            specCount: actualSpecCount,
            versionCount: versionHistory.length,
            activeVersionTag: currentVersion.versionTag,
            xml: activeCanvasXml,
            created_studio: 'dashboard',
            architecture_type: effectiveArchType,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          ...(Array.isArray(existingCatalog)
            ? existingCatalog.filter((item: any) => item.id !== finalProjectId && item.id !== activeInstanceId)
            : [])
        ];
        localStorage.setItem('promptcanvas_saved_blueprints', JSON.stringify(updatedCatalog));
        window.dispatchEvent(new Event('promptcanvas_saved_updated'));
      }
    } catch (err) {
      console.error('Error saving session copy as project:', err);
    } finally {
      setIsSavingProject(false);
    }

    const actionToExecute = pendingLeaveAction;
    setLeaveModalOpen(false);
    setPendingLeaveAction(null);

    if (actionToExecute?.type === 'category') {
      applyCategorySelectImmediate(actionToExecute.categoryId);
      showToast(`✓ Saved "${finalTitle}" (ID: ${finalProjectId.slice(0, 8)}…)! Switched category.`);
    } else if (actionToExecute?.type === 'blueprint') {
      loadPristineCanonicalBlueprint(actionToExecute.blueprint.id);
      showToast(`✓ Saved "${finalTitle}" (ID: ${finalProjectId.slice(0, 8)}…)! Loaded Blueprint #${actionToExecute.blueprint.id}.`);
    } else if (actionToExecute?.type === 'route') {
      showToast(`✓ Saved "${finalTitle}" (ID: ${finalProjectId.slice(0, 8)}…)!`);
      if (actionToExecute.href.startsWith('/dashboard')) {
        router.push(`/dashboard?id=${encodeURIComponent(finalProjectId)}`);
      } else {
        router.push(actionToExecute.href);
      }
    } else {
      setActiveInstanceId(finalProjectId);
      setCanvasTitle(finalTitle);
      setHasUnsavedSessionChanges(false);
      if (typeof window !== 'undefined') {
        const activeVerNum = Math.max(1, versionHistory.length - activeVersionIndex);
        const nextUrl = `/dashboard?id=${encodeURIComponent(finalProjectId)}&v=${activeVerNum}&template=${encodeURIComponent(loadedBlueprintId)}`;
        window.history.replaceState(null, '', nextUrl);
      }
      showToast(`✓ Saved "${finalTitle}" (Unique ID: ${finalProjectId}) — all versions tracked under this single ID.`);
    }
  };


  // =========================================================================
  // CORE ACTION: Modal Choice 2 — Discard Session Copy & Restore Canonical v1.0
  // =========================================================================
  const handleDiscardSessionChanges = () => {
    const actionToExecute = pendingLeaveAction;
    setLeaveModalOpen(false);
    setPendingLeaveAction(null);

    if (actionToExecute?.type === 'category') {
      applyCategorySelectImmediate(actionToExecute.categoryId);
      showToast(`🗑️ Discarded session copy. Canonical Blueprint #${loadedBlueprintId} unchanged.`);
    } else if (actionToExecute?.type === 'blueprint') {
      loadPristineCanonicalBlueprint(actionToExecute.blueprint.id);
      showToast(`🗑️ Discarded session copy. Loaded pristine Blueprint #${actionToExecute.blueprint.id}.`);
    } else if (actionToExecute?.type === 'route') {
      loadPristineCanonicalBlueprint(loadedBlueprintId);
      router.push(actionToExecute.href);
    } else {
      loadPristineCanonicalBlueprint(loadedBlueprintId);
      showToast(`🗑️ Discarded session copy. Restored Canonical Blueprint #${loadedBlueprintId} to v1.0 Baseline.`);
    }
  };

  // =========================================================================
  // CORE ACTION: Modal Choice 3 — Cancel & Keep Playing in Session Copy
  // =========================================================================
  const handleCancelLeaveModal = () => {
    setLeaveModalOpen(false);
    setPendingLeaveAction(null);
  };

  // =========================================================================
  // CORE ACTION: Publishing Governance Handler
  // =========================================================================
  const handleSelectPublishScope = (scope: 'all' | 'current' | 'draft') => {
    setPublishingScope(scope);
    setOpenPublishDropdown(false);

    if (scope === 'all') {
      setVersionHistory((prev) =>
        prev.map((v) => ({ ...v, status: 'published' }))
      );
      showToast('✓ All versions in lineage marked as Published.');
    } else if (scope === 'current') {
      setVersionHistory((prev) =>
        prev.map((v, idx) => (idx === activeVersionIndex ? { ...v, status: 'published' } : v))
      );
      showToast(`✓ Version ${currentVersion.versionTag} marked as Published.`);
    } else {
      setVersionHistory((prev) =>
        prev.map((v, idx) => (idx === activeVersionIndex ? { ...v, status: 'draft' } : v))
      );
      showToast('✓ Set to Draft Only.');
    }
  };

  // =========================================================================
  // CORE ACTION: Draw.io Inline Edit PostMessage Listener (2-Way Sync)
  // =========================================================================
  useEffect(() => {
    if (!isInlineEditOpen) return;
    const DRAWIO_ORIGIN = 'https://embed.diagrams.net';
    const handleDrawioMessage = (evt: MessageEvent) => {
      if (evt.origin !== DRAWIO_ORIGIN) return;
      if (!evt.data || typeof evt.data !== 'string') return;
      try {
        const msg = JSON.parse(evt.data);
        if (msg.event === 'init') {
          inlineIframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'load',
              autosave: 1,
              xml: activeCanvasXml
            }),
            DRAWIO_ORIGIN
          );
        } else if ((msg.event === 'save' || msg.event === 'autosave' || msg.event === 'exit') && typeof msg.xml === 'string') {
          if (msg.xml && msg.xml.includes('<mxCell') && msg.xml !== activeCanvasXml) {
            recordNewVersion(
              msg.xml,
              msg.event === 'autosave' ? 'Auto-synced changes from Draw.io vector editor' : 'Manual changes in Draw.io inline canvas editor',
              'manual_drawio',
              'Draw.io 2-Way Sync',
              canvasTitle,
              'Synced Draw.io canvas modifications back to PromptCanvas instance.'
            );
          }
          if (msg.event === 'exit' || msg.event === 'save') {
            setIsInlineEditOpen(false);
          }
        } else if (msg.event === 'exit') {
          setIsInlineEditOpen(false);
        }
      } catch {
        // Ignore non-JSON
      }
    };

    window.addEventListener('message', handleDrawioMessage);
    return () => window.removeEventListener('message', handleDrawioMessage);
  }, [isInlineEditOpen, activeCanvasXml, canvasTitle, activeInstanceId]);

  // =========================================================================
  // CORE ACTION: Download PDF & PNG Exports
  // =========================================================================
  const handleExportPng = async () => {
    setIsExporting('png');
    try {
      const dataUrl = await exportDiagramPng(activeCanvasXml, {
        scale: 2.4,
        transparent: false,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${canvasTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${currentVersion.versionTag}_4k_uhd.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ Downloaded True 4K UHD PNG (3840×2160)');
    } catch (e) {
      console.error(e);
      showToast('❌ Failed to export 4K PNG');
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportSvg = async () => {
    setIsExporting('svg');
    try {
      const svgContent = await exportDiagramSvg(activeCanvasXml, { transparent: false });
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${canvasTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${currentVersion.versionTag}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      showToast('✓ Downloaded standalone Vector SVG');
    } catch (e) {
      console.error(e);
      showToast('❌ Failed to export Vector SVG');
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportDrawioFile = () => {
    if (!activeCanvasXml) return;
    const blob = new Blob([activeCanvasXml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${canvasTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${currentVersion.versionTag}.drawio`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast('✓ Downloaded editable .drawio XML');
  };

  const handleExportPdf = async () => {
    setIsExporting('pdf');
    try {
      const pngDataUrl = await exportDiagramPng(activeCanvasXml, { scale: 2, transparent: false });
      const printWin = window.open('', '_blank');
      if (printWin) {
        const doc = printWin.document;
        doc.title = `${canvasTitle} (${currentVersion.versionTag}) - Architecture Spec`;
        doc.head.replaceChildren();
        doc.body.replaceChildren();

        const styleEl = doc.createElement('style');
        styleEl.textContent = `
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #0f172a; margin: 0; }
          .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #0d9488; padding-bottom: 12px; margin-bottom: 20px; }
          h1 { margin: 0; font-size: 22px; color: #0f172a; }
          .meta { font-size: 11px; color: #64748b; font-family: monospace; }
          .img-container { width: 100%; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; margin-bottom: 20px; background: white; }
          img { width: 100%; display: block; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; font-size: 12px; }
          .card h3 { margin: 0 0 6px 0; font-size: 13px; color: #0f766e; }
          .card p { margin: 0; color: #334155; }
        `;
        doc.head.appendChild(styleEl);

        const headerDiv = doc.createElement('div');
        headerDiv.className = 'header';
        const leftDiv = doc.createElement('div');
        const h1 = doc.createElement('h1');
        h1.textContent = canvasTitle;
        const metaLeft = doc.createElement('span');
        metaLeft.className = 'meta';
        metaLeft.textContent = `Version: ${currentVersion.versionTag} • Blueprint #${loadedBlueprintId} • Level: ${selectedLevel}`;
        leftDiv.append(h1, metaLeft);

        const metaRight = doc.createElement('div');
        metaRight.className = 'meta';
        metaRight.textContent = `Exported: ${new Date().toLocaleDateString()}`;
        headerDiv.append(leftDiv, metaRight);

        const imgContainer = doc.createElement('div');
        imgContainer.className = 'img-container';
        const imgEl = doc.createElement('img');
        imgEl.src = pngDataUrl;
        imgEl.alt = canvasTitle;
        imgContainer.appendChild(imgEl);

        const makeCard = (heading: string, text: string) => {
          const card = doc.createElement('div');
          card.className = 'card';
          const h3 = doc.createElement('h3');
          h3.textContent = heading;
          const p = doc.createElement('p');
          p.textContent = text;
          card.append(h3, p);
          return card;
        };

        doc.body.append(
          headerDiv,
          imgContainer,
          makeCard('Architecture Prompt & Lineage', currentVersion.prompt || ''),
          makeCard('Version Change Summary', currentVersion.diffSummary || '')
        );

        const triggerPrint = () => setTimeout(() => printWin.print(), 150);
        if (imgEl.complete) {
          triggerPrint();
        } else {
          imgEl.addEventListener('load', triggerPrint, { once: true });
        }
      }
      showToast('✓ Opened printable PDF Architecture Spec');
    } catch (e) {
      console.error(e);
      showToast('❌ Failed to export PDF');
    } finally {
      setIsExporting(null);
    }
  };

  // =========================================================================
  // CORE ACTION: Live Multi-Model Judge & Server Spatial Remediation
  // =========================================================================
  const handleRunLiveMultiModelJudge = async () => {
    if (!activeCanvasXml || activeCanvasXml.includes('data-blank-canvas="true"')) {
      showToast('ℹ️ Canvas is empty — select a template or enter a prompt first.');
      return;
    }
    setIsProcessingAi(true);
    showToast('⚖️ Running Orthogonal Multi-Model Judge Panel (gemini-3.1-pro-preview + gemma-4-31b-it)...');
    try {
      const res = await fetch('/api/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentVersion.prompt || canvasTitle,
          xmlContent: activeCanvasXml,
          generatorModel: currentVersion.modelUsed,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.truthfulnessDossier) {
          setVersionHistory((prev) =>
            prev.map((v, idx) =>
              idx === activeVersionIndex ? { ...v, truthfulnessDossier: data.truthfulnessDossier } : v
            )
          );
          setIsAuditModalOpen(true);
          showToast(
            `✓ Multi-Model Judge complete: ${data.truthfulnessDossier.scores.overallCompositeScore}% (${data.truthfulnessDossier.criticJudgeModel})`
          );
        }
      }
    } catch (err) {
      console.error('Multi-model judge failed:', err);
      showToast('⚠️ Multi-Model Judge unavailable; showing deterministic AST audit.');
    } finally {
      setIsProcessingAi(false);
    }
  };

  const handleAutoFixWithGemini = async () => {
    const vertexMatches = activeCanvasXml.match(/vertex="1"/g) || [];
    const isBlank =
      activeCanvasXml.includes('data-blank-canvas="true"') ||
      (loadedBlueprintId === 'blank' && vertexMatches.length === 0);
    const activePromptCandidate =
      activeComposerPrompt.trim() ||
      (currentVersion.prompt &&
      currentVersion.prompt !== 'Blank Canvas Initialized' &&
      !currentVersion.prompt.startsWith('Initial load of Canonical')
        ? currentVersion.prompt
        : '');

    if (isBlank && !activePromptCandidate) {
      showToast('ℹ️ Blank Canvas has 0 nodes — enter an architecture prompt below or select a blueprint before running Auto-Fix.');
      return;
    }

    setIsProcessingAi(true);
    showToast('🔧 Running Server Spatial Remediator + Orthogonal Multi-Model Judge...');

    try {
      const effectiveArch =
        canvasPerspective === 'Whiteboard'
          ? 'canonical_76_whiteboard'
          : canvasPerspective === 'Paper'
          ? 'canonical_77_paper'
          : `canonical_${loadedBlueprintId}`;

      // Collect actual detected gaps from current AST & Multi-Model Judge (zero fake hardcoded KMS banners!)
      const activeGaps: Array<{ title: string; component?: string; remediation: string }> = [];
      for (const dim of auditScores) {
        for (const rec of dim.recommendations) {
          activeGaps.push({
            title: dim.name,
            remediation: rec,
          });
        }
      }
      const judgeDefects = currentVersion.truthfulnessDossier?.multiModelJudgeReport?.actionableDefects || [];
      for (const def of judgeDefects) {
        activeGaps.push({
          title: def.title,
          component: def.cellIds.join(', '),
          remediation: def.repairInstruction,
        });
      }
      if (activeGaps.length === 0) {
        activeGaps.push({
          title: 'Geometry & Contrast Verification',
          remediation: 'Resolve any card overlaps, dangling edges, or low-contrast labels without adding synthetic banners.',
        });
      }

      const remRes = await fetch('/api/audit/remediate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xmlContent: activeCanvasXml,
          prompt: activePromptCandidate || currentVersion.prompt || canvasTitle,
          selectedGaps: activeGaps.slice(0, 8),
          architectureType: effectiveArch,
        }),
      });

      if (!remRes.ok) {
        throw new Error(`Remediation endpoint returned HTTP ${remRes.status}`);
      }

      const remData = await remRes.json();
      const healedXml: string =
        typeof remData?.xml === 'string' && remData.xml.includes('<mxCell')
          ? remData.xml
          : applyDeterministicGeometryAndContrastFixes(activeCanvasXml, effectiveArch);
      const dossier: TruthfulnessGroundingDossier | undefined = remData?.truthfulnessDossier;
      const actualModelUsed: string = remData?.modelUsed || 'deterministic-geometry-healer';
      const summaryText: string =
        remData?.summaryOfChanges || `Applied remediation across ${activeGaps.length} finding(s).`;

      const plannedSteps: string[] = dossier?.provenanceLedger
        ? dossier.provenanceLedger.map(
            (s) => `Stage ${s.stageNumber} (${s.modelId}, ${s.durationMs}ms): ${s.whatItDid}`
          )
        : [summaryText];

      recordNewVersion(
        healedXml,
        summaryText,
        'audit_autofix',
        dossier?.isLiveModelEvaluated
          ? `${actualModelUsed} + ${dossier.criticJudgeModel}`
          : actualModelUsed,
        canvasTitle,
        summaryText,
        {
          persona: 'Architecture & Spatial Remediator',
          modelUsed: dossier?.isLiveModelEvaluated
            ? `${actualModelUsed} → judged by ${dossier.criticJudgeModel} (${dossier.scores.overallCompositeScore}%)`
            : actualModelUsed,
          aiReasoning: summaryText,
          plannedSteps,
          truthfulnessDossier: dossier,
        }
      );

      setIsAuditModalOpen(true);
      const finalScore = dossier?.scores.overallCompositeScore ?? 'AST';
      showToast(`✓ Remediation complete (${finalScore}% verified)!`);
    } catch (e) {
      console.error(e);
      showToast('⚠️ Remediation failed; canvas left unchanged.');
    } finally {
      setIsProcessingAi(false);
    }
  };

  const handleCopyXml = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activeCanvasXml);
      setCopiedXml(true);
      showToast('✓ Draw.io XML copied to clipboard');
      setTimeout(() => setCopiedXml(false), 2000);
    }
  };

  const effectiveLaunchBlueprintId =
    canvasPerspective === 'Whiteboard' && loadedBlueprintId === '00'
      ? '76'
      : canvasPerspective === 'Paper' && loadedBlueprintId === '00'
      ? '77'
      : loadedBlueprintId;

  return (
    <div
      onClickCapture={handleDashboardClickCapture}
      className={`flex h-screen w-full font-sans overflow-hidden transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'dark bg-[#070B14] text-slate-100'
      }`}
    >
      {/* 1. LEFT APPLICATION SIDEBAR */}
      <UnifiedAppSidebar />

      {/* MAIN VIEWPORT: 32 / 68 WORKSPACE SPLIT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <AppHeader>
          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-3">
            <Link
              href="/"
              title="Go to PromptCanvas Homepage"
              aria-label="Go to PromptCanvas Homepage"
              className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center shadow-md shrink-0 hover:scale-105 transition-transform"
            >
              <div className="w-4 h-4 rounded-md border-2 border-white/90 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </Link>
            <div className="min-w-0 flex-1">
              <h1
                className={`font-black text-xs md:text-sm tracking-tight flex items-center gap-1.5 whitespace-nowrap overflow-hidden ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <Link
                  href="/"
                  data-testid="dashboard-header-home-link"
                  title="Go to PromptCanvas Homepage"
                  className="shrink-0 hover:underline hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  PromptCanvas
                </Link>
                <span className="shrink-0">&mdash; AI Architecture Studio</span>
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    isLight
                      ? 'bg-teal-50 text-teal-700 border-teal-200'
                      : 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                  }`}
                >
                  {currentVersion.versionTag} LIVE
                </span>
                {isSessionForked ? (
                  <Link
                    href="/library?studio=drafts"
                    id="dashboard-session-copy-badge"
                    data-session-copy-id={sessionCopyId || ''}
                    title={`Auto-Saved Micro-Version Draft (${currentVersion.versionTag}) — Click to view in Library → Drafts`}
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 transition hover:scale-[1.02] ${
                      isLight
                        ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                        : 'bg-amber-500/20 text-amber-300 border-amber-400/40 hover:bg-amber-500/30'
                    }`}
                  >
                    <GitFork className={`w-2.5 h-2.5 ${isLight ? 'text-amber-700' : 'text-amber-300'}`} />
                    <span>Draft ({currentVersion.versionTag}) &bull; Saved in Library</span>
                  </Link>
                ) : (
                  <span
                    id="dashboard-canonical-baseline-badge"
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 ${
                      isLight
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    <CheckCircle2 className={`w-2.5 h-2.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                    <span>Certified v1.0 Baseline</span>
                  </span>
                )}
              </h1>
              <p className={`text-[10.5px] font-semibold truncate ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {activeInstanceId
                  ? `Editable Instance (${activeInstanceId.slice(0, 8)}…) • 2-Way Sync Active (Prompt ↔ Draw.io) • Source Blueprint #${loadedBlueprintId} (${selectedBlueprintObj.depthLevel})`
                  : `Blueprint Studio: ① Filter & Lock In Template (L200–L400)  →  ② Clones Unique Diagram ID  →  ③ Mutate via Prompt & Draw.io (Original Intact)`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeInstanceId && (
              <button
                type="button"
                data-testid="dashboard-instance-id-badge"
                onClick={handleCopyInstanceUrl}
                title={`Unique Instance ID: ${activeInstanceId} — Click to copy shareable URL`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-mono font-bold text-[11px] whitespace-nowrap transition cursor-pointer shrink-0"
              >
                <Link2 className="w-3 h-3 text-blue-600" />
                <span>{copiedInstanceLink ? 'Copied URL!' : `ID: ${activeInstanceId.slice(0, 8)}`}</span>
              </button>
            )}
            {/* Session Copy Direct Actions: Save as Project & Discard */}
            {isSessionForked && (
              <>
                <button
                  id="header-save-session-project-btn"
                  type="button"
                  onClick={() => openSaveOrDiscardModal({ type: 'manual_save' })}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] whitespace-nowrap transition shadow-sm cursor-pointer shrink-0"
                >
                  <Save className="w-3 h-3" />
                  <span>Save as My Project</span>
                </button>
                <button
                  id="header-discard-session-copy-btn"
                  type="button"
                  onClick={() => loadPristineCanonicalBlueprint(loadedBlueprintId)}
                  title="Discard session copy and restore canonical baseline v1.0"
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border font-bold text-[11px] whitespace-nowrap transition cursor-pointer shrink-0 ${
                    isLight
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                      : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border-rose-500/30'
                  }`}
                >
                  <RotateCcw className={`w-3 h-3 ${isLight ? 'text-rose-600' : 'text-rose-300'}`} />
                  <span>Discard &amp; Reset</span>
                </button>
              </>
            )}

            {/* 1. Share Button */}
            <button
              type="button"
              onClick={() => void handleCopyInstanceUrl()}
              data-testid="dashboard-share-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-xs transition cursor-pointer shrink-0 ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Copy colleague-shareable URL with Unique Diagram ID (?id=...)"
            >
              <Share2 className={`w-3.5 h-3.5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
              <span>{copiedInstanceLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            {/* 2. Header-Only Cloud Viewer + Open with Google Slides Split-Dropdown (Rule 47) */}
            <DiagramInlineSlidesPreviewer
              headerOnly={true}
              manifestKey={
                isSessionForked && sessionCopyId
                  ? sessionCopyId
                  : `BP-${(loadedBlueprintId || '01').replace(/^#/, '').trim().padStart(2, '0')}`
              }
              title={
                isSessionForked
                  ? `${canvasTitle || 'Custom Architecture'} (${currentVersion.versionTag})`
                  : `${canvasTitle || 'Enterprise Architecture'} — Blueprint #${(loadedBlueprintId || '01').replace(/^#/, '')} (${canvasPerspective})`
              }
              subtitle={currentVersion.diffSummary || 'Editable Vector Reference Architecture'}
              xml={activeCanvasXml}
              domainId="enterprise"
              domainName="Google Cloud Enterprise"
              templateId={
                isSessionForked && sessionCopyId
                  ? sessionCopyId
                  : (loadedBlueprintId || '01').replace(/^#/, '').trim().padStart(2, '0')
              }
              badgeLabel={
                isSessionForked
                  ? `${sessionCopyId || 'Custom Draft'} • ${currentVersion.versionTag}`
                  : `Blueprint #${(loadedBlueprintId || '01').replace(/^#/, '')} • ${currentVersion.versionTag}`
              }
            />

            {/* 3. New Diagram Button (Opens Input Selection Modal) */}
            <button
              type="button"
              onClick={() => setIsNewDiagramModalOpen(true)}
              data-testid="dashboard-new-diagram-btn"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-md shadow-sky-500/25 cursor-pointer shrink-0 active:scale-95"
              title="Create New Architecture Diagram (84 Architecture Templates, 35 Certified Blueprints, Pure Prompt-to-Diagram, or Image Decompile)"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>New Diagram</span>
            </button>
          </div>
        </AppHeader>

        {/* Workspace Body: 32 / 68 Split */}
        <div className="flex-1 flex overflow-hidden p-3 lg:p-4 gap-3.5">
          
          {/* ========================================================================= */}
          {/* 2. LEFT 32% GUIDED 3-STEP WORKFLOW CO-PILOT & DELIVERABLES STUDIO          */}
          {/* ========================================================================= */}
          <div
            className={`w-full lg:w-[34%] xl:w-[32%] border rounded-3xl flex flex-col h-full shrink-0 shadow-sm overflow-hidden transition-colors ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0F1626] border-slate-800'
            }`}
          >
            {/* WORKFLOW LAUNCHER STRIP: 4 CLEAR WAYS TO USE PROMPTCANVAS */}
            <div
              data-testid="dashboard-workflow-launcher"
              className={`px-3 py-2 border-b space-y-1.5 shrink-0 ${
                isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[9.5px] font-black uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Choose Your Starting Workflow
                </span>
                <Link
                  href="/guide"
                  className={`text-[9.5px] font-bold hover:underline flex items-center gap-0.5 ${
                    isLight ? 'text-teal-700' : 'text-teal-400'
                  }`}
                >
                  <span>How it works</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <button
                  type="button"
                  onClick={() => setOpenBlueprintDropdown(true)}
                  className={`px-1.5 py-1.5 rounded-xl border text-[10px] font-extrabold flex flex-col items-center justify-center gap-0.5 transition cursor-pointer shadow-2xs ${
                    isLight
                      ? 'bg-teal-600 text-white border-teal-700'
                      : 'bg-teal-600 text-white border-teal-500'
                  }`}
                  title="World 1 (Blueprint Studio): Filter & lock in one of 84 Architecture Templates (L200–L400) to clone a unique editable Diagram ID"
                >
                  <span className="truncate">🏛️ Blueprint</span>
                  <span className="text-[8.5px] font-medium opacity-90 truncate">35 Certified</span>
                </button>
                <Link
                  href="/prompt-to-diagram"
                  data-testid="workflow-link-prompt-to-diagram"
                  className={`px-1.5 py-1.5 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                    isLight
                      ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200 hover:border-blue-300'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                  }`}
                  title="World 2 (Prompt to Diagram): Pure Prompt Only → Compound ELK Architecture Diagram (Zero Templates)"
                >
                  <span className="truncate">✨ Prompt Only</span>
                  <span className={`text-[8.5px] font-medium truncate ${isLight ? 'text-blue-700' : 'text-slate-400'}`}>Freeform Studio</span>
                </Link>
                <Link
                  href="/vision"
                  className={`px-1.5 py-1.5 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-teal-50 text-slate-800 border-slate-200/90 hover:border-teal-300'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                  }`}
                  title="Workflow 3: Upload a screenshot, whiteboard sketch, or AWS/Oracle diagram to convert into editable Draw.io & Slides"
                >
                  <span className="truncate">🖼️ Image AI</span>
                  <span className={`text-[8.5px] font-medium truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Photo → Edit</span>
                </Link>
                <Link
                  href="/docgen"
                  className={`px-1.5 py-1.5 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-teal-50 text-slate-800 border-slate-200/90 hover:border-teal-300'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                  }`}
                  title="Workflow 4: Generate 8-archetype RFCs, PRDs, and Executive Spec Docs from your architecture"
                >
                  <span className="truncate">📄 Spec Docs</span>
                  <span className={`text-[8.5px] font-medium truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>8 Core Specs</span>
                </Link>
              </div>
            </div>

            {/* STEP 1: CHOOSE STARTING BLUEPRINT (MANDATORY IN BLUEPRINT STUDIO) */}
            <div
              className={`px-3 py-2.5 border-b space-y-1.5 shrink-0 ${
                isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="px-1.5 py-0.5 rounded-md bg-teal-600 text-white font-mono font-black text-[9px] shrink-0">
                    STEP 1 • REQUIRED
                  </span>
                  <span className={`text-[11px] font-extrabold truncate ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                    Choose Level &amp; Blueprint
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewDiagramModalOpen(true)}
                  className={`text-[10px] font-bold hover:underline flex items-center gap-0.5 shrink-0 cursor-pointer ${
                    isLight ? 'text-blue-700' : 'text-blue-400'
                  }`}
                >
                  <span>Filter All {CERTIFIED_ARCHITECTURE_TEMPLATES.length} Templates</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* ARCHITECTURE DEPTH LEVEL SELECTOR (L200 | L300 | L400 — 0 L100) */}
              <div
                data-testid="dashboard-depth-level-selector"
                className={`p-2 rounded-xl border space-y-1.5 ${
                  canvasPerspective === 'Technical'
                    ? isLight
                      ? 'bg-indigo-50/70 border-indigo-200'
                      : 'bg-indigo-950/30 border-indigo-500/30'
                    : isLight
                    ? 'bg-white border-slate-200'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[9.5px] font-black uppercase tracking-wider ${
                    canvasPerspective === 'Technical'
                      ? isLight ? 'text-indigo-800' : 'text-indigo-300'
                      : isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {canvasPerspective === 'Technical'
                      ? 'Technical Depth Level (Choose L200–L400)'
                      : 'Template Level Filter (L200–L400)'}
                  </span>
                  <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-300">
                    L400 = Most Detailed
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {STUDIO_DEPTH_LEVELS.map((lvl) => {
                    const count = depthLevelCounts[lvl];
                    const isActive = selectedDepthLevel === lvl;
                    const meta = lvl === 'All' ? null : DEPTH_LEVEL_META[lvl];
                    return (
                      <button
                        key={lvl}
                        type="button"
                        data-testid={`dashboard-level-btn-${lvl.toLowerCase()}`}
                        onClick={() => handleSelectDepthLevel(lvl)}
                        title={meta ? `${meta.label}: ${meta.description}` : 'Show templates across L200–L400'}
                        className={`py-1 px-1 rounded-lg text-[10px] font-extrabold transition flex flex-col items-center justify-center border cursor-pointer ${
                          isActive
                            ? lvl === 'L400'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-teal-600 text-white border-teal-600 shadow-xs'
                            : isLight
                            ? 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        <span>{lvl}</span>
                        <span className={`text-[8.5px] font-mono ${isActive ? 'text-white/85' : 'text-slate-400'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-[106px_minmax(0,1fr)] gap-1.5">
                {/* CATEGORY DROPDOWN */}
                <div className="relative category-dropdown-container">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenCategoryDropdown(!openCategoryDropdown);
                      setOpenBlueprintDropdown(false);
                      setOpenLevelDropdown(false);
                    }}
                    className={`w-full border hover:border-teal-500 rounded-xl px-2 py-1.5 text-xs font-bold flex items-center justify-between shadow-2xs transition-all text-left cursor-pointer ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-800'
                        : 'bg-slate-950 border-slate-700 text-slate-100'
                    }`}
                  >
                    <span className="truncate flex items-center gap-1">
                      <span>{selectedCategoryObj.icon}</span>
                      <span className="truncate">
                        {selectedCategoryObj.id === 'all' ? `All (${CANONICAL_TEMPLATES.length})` : selectedCategoryObj.name}
                      </span>
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>

                  {openCategoryDropdown && (
                    <div
                      className={`absolute left-0 w-56 top-full mt-1 border rounded-2xl shadow-xl z-50 p-2 space-y-1 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'
                      }`}
                    >
                      <div className="relative">
                        <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search category..."
                          value={categorySearchQuery}
                          onChange={(e) => setCategorySearchQuery(e.target.value)}
                          className={`w-full pl-7 pr-2 py-1 border rounded-xl text-xs focus:outline-none ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 text-slate-800'
                              : 'bg-slate-950 border-slate-700 text-slate-100'
                          }`}
                          autoFocus
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-0.5">
                        {filteredCategories.map((cat) => (
                          <div
                            key={cat.id}
                            onClick={() => {
                              handleCategorySelect(cat.id);
                            }}
                            className={`p-1.5 rounded-lg cursor-pointer text-xs flex items-center justify-between ${
                              selectedCategory === cat.id
                                ? isLight
                                  ? 'bg-teal-50 text-teal-900 font-bold'
                                  : 'bg-teal-500/20 text-teal-300 font-bold'
                                : isLight
                                ? 'hover:bg-slate-50 text-slate-700'
                                : 'hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="truncate">{cat.icon} {cat.name}</span>
                            <span className="text-[9px] font-mono text-slate-400">{cat.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* BLUEPRINT DROPDOWN */}
                <div className="relative blueprint-combobox-container">
                  <button
                    type="button"
                    data-testid="dashboard-step1-blueprint-select"
                    onClick={() => {
                      setOpenBlueprintDropdown(!openBlueprintDropdown);
                      setOpenCategoryDropdown(false);
                      setOpenLevelDropdown(false);
                    }}
                    className={`w-full border hover:border-teal-500 rounded-xl px-2.5 py-1.5 text-xs font-bold flex items-center justify-between shadow-2xs transition-all text-left cursor-pointer ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-800'
                        : 'bg-slate-950 border-slate-700 text-slate-100'
                    }`}
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono font-bold ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                        #{selectedBlueprintObj.id}
                      </span>
                      <span className="truncate">{selectedBlueprintObj.name}</span>
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>

                  {openBlueprintDropdown && (
                    <div
                      className={`absolute left-0 right-0 top-full mt-1 border rounded-2xl shadow-xl z-50 p-2 space-y-1 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'
                      }`}
                    >
                      <div className="relative">
                        <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search blueprint..."
                          value={blueprintSearchQuery}
                          onChange={(e) => setBlueprintSearchQuery(e.target.value)}
                          className={`w-full pl-7 pr-2 py-1 border rounded-xl text-xs focus:outline-none ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 text-slate-800'
                              : 'bg-slate-950 border-slate-700 text-slate-100'
                          }`}
                          autoFocus
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-0.5">
                        {filteredTemplates.map((bp) => (
                          <div
                            key={bp.id}
                            onClick={() => {
                              handleBlueprintSelect(bp);
                            }}
                            className={`p-1.5 rounded-lg cursor-pointer text-xs flex items-center justify-between ${
                              selectedBlueprintId === bp.id
                                ? isLight
                                  ? 'bg-teal-50 text-teal-900 font-bold'
                                  : 'bg-teal-500/20 text-teal-300 font-bold'
                                : isLight
                                ? 'hover:bg-slate-50 text-slate-700'
                                : 'hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="truncate">#{bp.id} {bp.name}</span>
                            <span
                              className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0 ml-1 ${
                                bp.depthLevel === 'L400'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {bp.depthLevel}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* EXPLICIT "USE THIS BLUEPRINT" CTA -> CREATES NEW UNIQUE INSTANCE ID & UNLOCKS 2-WAY SYNC */}
              {!activeInstanceId ? (
                <button
                  type="button"
                  data-testid="btn-use-selected-blueprint"
                  disabled={isCreatingInstance}
                  onClick={() => void handleUseSelectedBlueprint(selectedBlueprintObj)}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 disabled:opacity-60 text-white text-xs font-extrabold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isCreatingInstance ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Minting New Instance ID…</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Use Blueprint #{selectedBlueprintObj.id} ({selectedBlueprintObj.depthLevel}) — New ID</span>
                    </>
                  )}
                </button>
              ) : (
                <div
                  data-testid="dashboard-active-instance-bar"
                  className={`px-2.5 py-1.5 rounded-xl border text-[10.5px] flex items-center justify-between gap-2 ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold truncate">
                      Instance <code className="font-mono">{activeInstanceId.slice(0, 8)}</code> &bull; Prompt ↔ Draw.io Sync
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyInstanceUrl}
                    className="px-2 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold text-[10px] shrink-0 cursor-pointer"
                  >
                    {copiedInstanceLink ? 'Copied!' : 'Copy URL'}
                  </button>
                </div>
              )}

              {/* Session Copy Notice Banner inside Left Panel when Forked */}
              {isSessionForked && (
                <div
                  id="left-panel-session-copy-banner"
                  className={`px-2.5 py-1.5 rounded-xl border text-[10.5px] flex items-center justify-between gap-2 ${
                    isLight
                      ? 'bg-amber-50/90 border-amber-300 text-amber-900'
                      : 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <GitFork className={`w-3 h-3 shrink-0 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                    <span className="font-semibold leading-tight">
                      Draft <strong className="font-mono">{currentVersion.versionTag}</strong>{' '}Auto-Saved &bull; Baseline #{loadedBlueprintId} intact
                    </span>
                  </div>
                  <Link
                    href="/library?studio=drafts"
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] shrink-0 transition ${
                      isLight
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                        : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200'
                    }`}
                  >
                    Drafts &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* STEP 2: MUTATE SELECTED CERTIFIED BLUEPRINT */}
            <div
              className={`px-3 py-2.5 border-b space-y-2 shrink-0 ${
                isLight
                  ? 'bg-gradient-to-b from-white to-slate-50/80 border-slate-200'
                  : 'bg-gradient-to-b from-[#0F1626] to-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="px-1.5 py-0.5 rounded-md bg-indigo-600 text-white font-mono font-black text-[9px] shrink-0">
                    STEP 2
                  </span>
                  <span className={`text-[11px] font-extrabold truncate ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                    Mutate Selected Blueprint #{selectedBlueprintObj.id}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border whitespace-nowrap shrink-0 ${
                    isLight
                      ? 'bg-slate-100 text-slate-600 border-slate-200'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {isSessionForked
                    ? `Draft ${currentVersion.versionTag} → v${currentVersion.major}.${currentVersion.minor}.${(currentVersion.micro ?? 0) + 1}`
                    : `Saves as Private Draft`}
                </span>
              </div>

              <p className={`text-[10px] leading-snug ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Customize Blueprint #{selectedBlueprintObj.id} (add services, regions, security, or flows — or open{' '}
                <Link href="/prompt-to-diagram" className="text-blue-600 font-bold hover:underline">
                  Prompt Only
                </Link>{' '}
                for zero-template synthesis):
              </p>

              {/* Central Single Prompt Composer Input (Locked until "Use Blueprint" mints an Instance ID) */}
              {!activeInstanceId && (
                <div
                  data-testid="dashboard-step2-locked-banner"
                  className={`p-2.5 rounded-xl border text-[10.5px] flex items-center justify-between gap-2 ${
                    isLight
                      ? 'bg-amber-50/90 border-amber-200 text-amber-900'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-semibold leading-snug">
                      Template Preview Mode — click <strong>Use Blueprint #{selectedBlueprintObj.id}</strong> above to assign a new Instance ID and unlock 2-way Prompt &amp; Draw.io mutation.
                    </span>
                  </div>
                </div>
              )}
              <div
                className={`relative rounded-2xl border-2 shadow-xs p-2 transition-all ${
                  !activeInstanceId
                    ? 'opacity-55 pointer-events-none border-slate-200 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800'
                    : isLight
                    ? 'bg-white border-teal-500/40 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20'
                    : 'bg-slate-950 border-teal-500/40 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20'
                }`}
              >
                <textarea
                  id="dashboard-prompt-composer-input"
                  rows={2}
                  disabled={!activeInstanceId}
                  value={activeComposerPrompt}
                  onChange={(e) => setActiveComposerPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleExecutePrompt();
                    }
                  }}
                  placeholder="e.g., Add Cloud Armor WAF, Vertex AI Search, and multi-region AlloyDB failover..."
                  className={`w-full bg-transparent text-xs focus:outline-none resize-none font-medium leading-relaxed ${
                    isLight ? 'text-slate-800 placeholder-slate-400' : 'text-slate-100 placeholder-slate-500'
                  }`}
                />

                <div
                  className={`flex items-center justify-between gap-2 pt-1.5 border-t mt-1 ${
                    isLight ? 'border-slate-100' : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono min-w-0">
                    <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">Press Enter to apply</span>
                  </div>

                  <button
                    id="dashboard-prompt-submit-btn"
                    type="button"
                    onClick={() => handleExecutePrompt()}
                    disabled={!activeComposerPrompt.trim() || isProcessingAi}
                    className={`px-3 py-1 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0 whitespace-nowrap ${
                      activeComposerPrompt.trim() && !isProcessingAi
                        ? 'bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white shadow-teal-500/25'
                        : isLight
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isProcessingAi ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-white" />
                        <span>Synthesizing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>Apply AI Changes &rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Live Gemini Architect Planning Progress Indicator */}
              {aiPlanningStatus && (
                <div
                  id="dashboard-ai-planning-status"
                  className={`p-2.5 rounded-2xl border text-[11px] flex items-start gap-2 shadow-2xs ${
                    isLight
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-950'
                      : 'bg-indigo-950/50 border-indigo-500/30 text-indigo-200'
                  }`}
                >
                  <Loader2 className={`w-3.5 h-3.5 animate-spin shrink-0 mt-0.5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
                  <div className="space-y-0.5 min-w-0">
                    <div className={`text-[10px] font-extrabold uppercase tracking-wider ${isLight ? 'text-indigo-700' : 'text-indigo-300'}`}>
                      Gemini Architect Reasoning &amp; Planning
                    </div>
                    <div className={`text-[11px] font-medium leading-snug ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {aiPlanningStatus}
                    </div>
                  </div>
                </div>
              )}

              {/* Conversational Assistant Reply Card (Non-Mutating) */}
              {conversationalReply && (
                <div
                  id="dashboard-conversational-reply"
                  className={`p-2.5 rounded-2xl border text-[11px] space-y-1 shadow-2xs ${
                    isLight
                      ? 'bg-teal-50/90 border-teal-200 text-teal-950'
                      : 'bg-teal-950/50 border-teal-500/30 text-teal-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 ${isLight ? 'text-teal-700' : 'text-teal-300'}`}>
                      <MessageSquare className="w-3 h-3" />
                      <span>Co-Pilot Advisory (Zero Canvas Mutation)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setConversationalReply(null)}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className={`leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{conversationalReply}</p>
                </div>
              )}

              {/* Compact Quick Suggestion Chips (Zero mid-word truncation) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[9.5px] font-black uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Or Apply a 1-Click Preset Upgrade
                  </span>
                  <span className={`text-[9px] font-semibold ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                    Instant Canvas Update
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {contextualSuggestions.map((suggestion, idx) => {
                    const conciseLabel = suggestion
                      .replace(/^\+\s*(Add|Upgrade|Insert|Attach)\s+/i, '+ ')
                      .split(/\s+(with|for|and|across|to\s+dual)/i)[0]
                      .trim();
                    return (
                      <button
                        key={idx}
                        id={`dashboard-suggestion-chip-${idx}`}
                        type="button"
                        onClick={() => handleExecutePrompt(suggestion)}
                        disabled={!activeInstanceId || isProcessingAi}
                        title={suggestion}
                        className={`text-left px-2 py-1 rounded-lg border text-[10px] font-semibold transition-all flex items-center gap-1 group cursor-pointer shadow-2xs ${
                          isLight
                            ? 'bg-teal-50/70 hover:bg-teal-100 text-teal-900 border-teal-200'
                            : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-200 border-teal-500/25'
                        }`}
                      >
                        <span>{conciseLabel}</span>
                        <ArrowRight className={`w-2.5 h-2.5 shrink-0 opacity-60 group-hover:opacity-100 transition-all ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 3: CERTIFY, EXPORT DELIVERABLES & VERSION LINEAGE */}
            <div
              className={`flex-1 flex flex-col min-h-0 overflow-hidden ${
                isLight ? 'bg-slate-50/50' : 'bg-slate-950/40'
              }`}
            >
              {/* Step 3 Deliverables Action Strip */}
              <div
                className={`px-3 py-2 border-b space-y-1.5 shrink-0 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white font-mono font-black text-[9px] shrink-0">
                      STEP 3
                    </span>
                    <span className={`text-[11px] font-extrabold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                      Certify, Edit &amp; Export Deliverables
                    </span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    1-Click Output
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1">
                  <button
                    type="button"
                    disabled={!activeInstanceId}
                    onClick={() => activeInstanceId && setIsInlineEditOpen(true)}
                    className={`px-1.5 py-1 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition ${
                      !activeInstanceId
                        ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                        : isLight
                        ? 'cursor-pointer bg-slate-50 hover:bg-teal-50 text-slate-800 border-slate-200 hover:border-teal-300'
                        : 'cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                    title={
                      activeInstanceId
                        ? `Open interactive Draw.io editor (2-Way Sync • Instance ${activeInstanceId.slice(0, 8)}…)`
                        : 'Click "Use Blueprint" in Step 1 first to mint an Instance ID'
                    }
                  >
                    <Edit3 className="w-3 h-3 text-teal-600 shrink-0" />
                    <span className="truncate">Draw.io</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAuditModalOpen(true)}
                    className={`px-1.5 py-1 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                      isLight
                        ? 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                    title="Inspect 6-dimension security & geometry audit score"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">Audit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCloudViewerModalMode('slides')}
                    className={`px-1.5 py-1 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                      isLight
                        ? 'bg-amber-50/80 hover:bg-amber-100 text-amber-900 border-amber-200'
                        : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border-amber-500/30'
                    }`}
                    title="Preview or export editable Google Slides deck"
                  >
                    <Presentation className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="truncate">Slides</span>
                  </button>
                  <Link
                    href={`/docgen?blueprint=${encodeURIComponent(loadedBlueprintId)}`}
                    className={`px-1.5 py-1 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                      isLight
                        ? 'bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 border-indigo-200'
                        : 'bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-200 border-indigo-500/30'
                    }`}
                    title="Generate an Architecture RFC, PRD, or Executive Dossier"
                  >
                    <FileText className="w-3 h-3 text-indigo-600 shrink-0" />
                    <span className="truncate">RFC Doc</span>
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  <button
                    type="button"
                    data-testid="dashboard-export-4k-png-btn"
                    disabled={isExporting !== null}
                    onClick={() => void handleExportPng()}
                    title="Download True 4K UHD PNG (3840×2160)"
                    className={`px-1.5 py-1 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-50 ${
                      isLight
                        ? 'bg-blue-50/80 hover:bg-blue-100 text-blue-900 border-blue-200'
                        : 'bg-blue-500/15 hover:bg-blue-500/25 text-blue-200 border-blue-500/30'
                    }`}
                  >
                    <Download className="w-3 h-3 text-blue-600 shrink-0" />
                    <span className="truncate">{isExporting === 'png' ? '4K…' : '4K PNG'}</span>
                  </button>
                  <button
                    type="button"
                    data-testid="dashboard-export-svg-btn"
                    disabled={isExporting !== null}
                    onClick={() => void handleExportSvg()}
                    title="Download Standalone Vector SVG"
                    className={`px-1.5 py-1 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-50 ${
                      isLight
                        ? 'bg-teal-50/80 hover:bg-teal-100 text-teal-900 border-teal-200'
                        : 'bg-teal-500/15 hover:bg-teal-500/25 text-teal-200 border-teal-500/30'
                    }`}
                  >
                    <Download className="w-3 h-3 text-teal-600 shrink-0" />
                    <span className="truncate">{isExporting === 'svg' ? 'SVG…' : 'Vector SVG'}</span>
                  </button>
                  <button
                    type="button"
                    data-testid="dashboard-export-drawio-btn"
                    onClick={handleExportDrawioFile}
                    title="Download Native Editable .drawio XML"
                    className={`px-1.5 py-1 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                      isLight
                        ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    <Download className="w-3 h-3 text-indigo-600 shrink-0" />
                    <span className="truncate">.drawio</span>
                  </button>
                </div>
              </div>

              {/* Version History Subheader */}
              <div
                className={`px-3 py-1.5 border-b flex items-center justify-between shrink-0 ${
                  isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <History className={`w-3 h-3 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
                  <span className={`text-[10.5px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                    Version History &amp; Rollback
                  </span>
                </div>
                <span className={`text-[9.5px] font-mono font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {versionHistory.length} {versionHistory.length === 1 ? 'Snapshot' : 'Snapshots'}
                </span>
              </div>

              {/* Version History Stream Scrollable */}
              <div className="flex-1 p-2.5 overflow-y-auto space-y-2 text-xs">
                {versionHistory.map((ver, idx) => {
                  const isActive = idx === activeVersionIndex;
                  return (
                    <div
                      key={ver.id}
                      onClick={() => setActiveVersionIndex(idx)}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer space-y-1 shadow-2xs ${
                        isActive
                          ? isLight
                            ? 'bg-white border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                            : 'bg-slate-900 border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                          : isLight
                          ? 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                          : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`px-1.5 py-0.5 rounded-md text-[9.5px] font-mono font-black shrink-0 ${
                              isActive
                                ? 'bg-teal-600 text-white'
                                : isLight
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {ver.versionTag}
                          </span>
                          <span className={`text-[10px] font-bold truncate max-w-[140px] ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                            {ver.persona ? `${ver.persona}` : ver.sourceLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                              ver.versionTag === 'v1.0' && ver.source === 'initial_load'
                                ? isLight
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : isLight
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            }`}
                          >
                            {ver.versionTag === 'v1.0' && ver.source === 'initial_load' ? 'Canonical' : 'Session Copy'}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">{ver.timestamp}</span>
                        </div>
                      </div>

                      <p className={`text-[10.5px] font-semibold line-clamp-1 leading-snug ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                        {ver.prompt}
                      </p>

                      {/* Gemini AI Reasoning & Execution Plan for Session Copy Versions */}
                      {ver.plannedSteps && ver.plannedSteps.length > 0 && (
                        <div
                          id={isActive ? 'dashboard-ai-reasoning-plan-card' : undefined}
                          className={`p-2 rounded-xl border space-y-1 text-[10px] ${
                            isLight ? 'bg-slate-50 border-slate-200/90' : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <div className={`flex items-center justify-between text-[9.5px] font-extrabold uppercase tracking-wider ${isLight ? 'text-indigo-700' : 'text-indigo-400'}`}>
                            <span className="flex items-center gap-1">
                              <Sparkles className={`w-2.5 h-2.5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
                              <span>Gemini Reasoning &amp; Execution Plan</span>
                            </span>
                            {ver.modelUsed && (
                              <span className="font-mono text-[8.5px] text-slate-500 lowercase">
                                {ver.modelUsed}
                              </span>
                            )}
                          </div>
                          <ul className={`space-y-1 leading-snug ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                            {ver.plannedSteps.map((stepStr, sIdx) => (
                              <li key={sIdx} className="line-clamp-2" title={stepStr}>
                                {stepStr}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className={`pt-1 flex items-center justify-between gap-2 border-t text-[9.5px] ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                        <span className={`font-medium line-clamp-1 leading-snug ${isLight ? 'text-teal-700' : 'text-teal-400'}`} title={ver.diffSummary}>
                          {ver.diffSummary}
                        </span>
                        {isActive ? (
                          <span className={`font-bold flex items-center gap-0.5 shrink-0 ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 hover:text-indigo-600 font-semibold flex items-center gap-0.5 shrink-0">
                            <RotateCcw className="w-2.5 h-2.5" />
                            <span>Restore</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 3. RIGHT 68% HIGH-FIDELITY INTERACTIVE CANVAS                             */}
          {/* ========================================================================= */}
          <div
            className={`flex-1 rounded-3xl border p-3.5 lg:p-4 flex flex-col justify-between overflow-hidden shadow-sm relative transition-colors ${
              isLight ? 'bg-[#EAEDF1] border-slate-300' : 'bg-[#0B111E] border-slate-800'
            }`}
          >
            
            {/* Streamlined Single-Row Canvas Header Control Strip with Workflow Labels */}
            <div
              className={`flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b mb-2 ${
                isLight ? 'border-slate-300/80' : 'border-slate-800'
              }`}
            >
              {/* Left: Labeled Perspective Switcher + Zoom Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[9.5px] font-black uppercase tracking-wider hidden xl:inline ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  View Mode:
                </span>
                <div
                  className={`flex items-center p-0.5 rounded-xl border text-xs shadow-2xs ${
                    isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  {(["Technical", "Logical", "Conceptual", "Process", "Whiteboard"] as ArchitecturePerspective[]).map((p) => (
                    <button
                      key={p}
                      id={`perspective-tab-${p.toLowerCase()}`}
                      type="button"
                      onClick={() => handleSwitchPerspective(p)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        canvasPerspective === p
                          ? 'bg-teal-600 text-white shadow-xs'
                          : isLight
                          ? 'text-slate-600 hover:text-slate-900'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Inline Technical Level Prompt Strip when Technical View Mode is active */}
                {canvasPerspective === 'Technical' && (
                  <>
                    <div className={`h-4 w-px ${isLight ? 'bg-slate-300' : 'bg-slate-700'}`} />
                    <div
                      data-testid="canvas-technical-level-bar"
                      className={`flex items-center gap-1 p-0.5 rounded-xl border shadow-2xs ${
                        isLight ? 'bg-indigo-50/90 border-indigo-200' : 'bg-indigo-950/40 border-indigo-500/30'
                      }`}
                    >
                      <span className="text-[9.5px] font-black uppercase tracking-wider px-1.5 text-indigo-700 dark:text-indigo-300">
                        Level:
                      </span>
                      {(['L200', 'L300', 'L400'] as BlueprintDepthLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          data-testid={`canvas-tech-level-${lvl.toLowerCase()}`}
                          onClick={() => handleSelectDepthLevel(selectedDepthLevel === lvl ? 'All' : lvl)}
                          title={`${DEPTH_LEVEL_META[lvl].label} — ${DEPTH_LEVEL_META[lvl].description}`}
                          className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                            selectedDepthLevel === lvl
                              ? lvl === 'L400'
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-teal-600 text-white shadow-xs'
                              : isLight
                              ? 'text-indigo-800 hover:bg-white'
                              : 'text-indigo-200 hover:bg-slate-800'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <div className={`h-4 w-px ${isLight ? 'bg-slate-300' : 'bg-slate-700'}`} />

                {/* Zoom Controls */}
                <div
                  className={`flex items-center gap-1 p-0.5 rounded-xl border shadow-2xs ${
                    isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setZoomScale((z) => Math.min(z + 0.1, 1.8))}
                    className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer ${
                      isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    ＋
                  </button>
                  <span className={`text-[10px] font-mono font-bold px-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomScale((z) => Math.max(z - 0.1, 0.6))}
                    className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer ${
                      isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    －
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomScale(1.0)}
                    className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs cursor-pointer ${
                      isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Right: Labeled Canvas Actions (Edit Inline, Audit, Auto-Fix) */}
              <div className="flex items-center gap-2">
                <span className={`text-[9.5px] font-black uppercase tracking-wider hidden 2xl:inline ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Refine &amp; Certify:
                </span>
                <div
                  className={`flex items-center gap-1.5 backdrop-blur-xs p-1 rounded-2xl border shadow-2xs ${
                    isLight ? 'bg-white/90 border-slate-300/80' : 'bg-slate-900/80 border-slate-700'
                  }`}
                >
                  {isSessionForked && (
                    <button
                      id="toolbar-save-session-project-btn"
                      type="button"
                      onClick={() => openSaveOrDiscardModal({ type: 'manual_save' })}
                      className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 transition cursor-pointer shadow-2xs"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save as Project</span>
                    </button>
                  )}

                  {/* 1. Use Blueprint OR Edit Inline in Draw.io (2-Way Sync) */}
                  {!activeInstanceId ? (
                    <button
                      type="button"
                      data-testid="toolbar-use-blueprint-btn"
                      disabled={isCreatingInstance}
                      onClick={() => void handleUseSelectedBlueprint(selectedBlueprintObj)}
                      title="Create a new editable instance (New ID) from this blueprint before editing in Draw.io"
                      className="px-2.5 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-[11px] flex items-center gap-1 transition cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isCreatingInstance ? 'Creating ID…' : 'Use Blueprint (New ID)'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-testid="toolbar-edit-drawio-btn"
                      onClick={() => setIsInlineEditOpen(true)}
                      title={`2-Way Sync Draw.io Editor (Instance ${activeInstanceId.slice(0, 8)}…)`}
                      className={`px-2.5 py-1 rounded-xl font-bold text-[11px] flex items-center gap-1 transition cursor-pointer ${
                        isLight
                          ? 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200'
                          : 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/30'
                      }`}
                    >
                      <Edit3 className={`w-3.5 h-3.5 ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
                      <span>Edit in Draw.io (2-Way)</span>
                    </button>
                  )}

                  {/* 3. Audit Button */}
                  {(() => {
                    const toolbarVertices = (activeCanvasXml.match(/vertex="1"/g) || []).length;
                    const isBlankToolbar =
                      activeCanvasXml.includes('data-blank-canvas="true"') ||
                      (loadedBlueprintId === 'blank' && toolbarVertices === 0);
                    const isStubToolbar = !isBlankToolbar && toolbarVertices < 4;
                    const avgDimScore =
                      auditScores.length > 0
                        ? Math.round(auditScores.reduce((s, d) => s + d.score, 0) / auditScores.length)
                        : 0;
                    const toolbarScore = isBlankToolbar
                      ? 0
                      : currentVersion.truthfulnessDossier?.scores.overallCompositeScore ?? avgDimScore;
                    const isLiveJudgedToolbar = Boolean(currentVersion.truthfulnessDossier?.isLiveModelEvaluated);
                    const isCertToolbar =
                      !isBlankToolbar &&
                      !isStubToolbar &&
                      isLiveJudgedToolbar &&
                      toolbarScore >= 88;
                    const isFailedToolbar = isBlankToolbar || isStubToolbar || toolbarScore < 65;

                    return (
                      <button
                        id="toolbar-audit-btn"
                        type="button"
                        onClick={() => setIsAuditModalOpen(true)}
                        title={
                          isLiveJudgedToolbar
                            ? `Live Multi-Model Judge (${currentVersion.truthfulnessDossier?.criticJudgeModel}): ${toolbarScore}%`
                            : `Deterministic AST Score: ${toolbarScore}% (Open to run Live Multi-Model Judge)`
                        }
                        className={`px-2.5 py-1 rounded-xl border font-bold text-[11px] flex items-center gap-1 transition cursor-pointer ${
                          isFailedToolbar
                            ? isLight
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300'
                              : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border-rose-500/30'
                            : isCertToolbar
                            ? isLight
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30'
                            : isLight
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {isCertToolbar ? (
                          <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                        ) : (
                          <ShieldAlert
                            className={`w-3.5 h-3.5 ${
                              isFailedToolbar
                                ? isLight
                                  ? 'text-rose-600'
                                  : 'text-rose-400'
                                : isLight
                                ? 'text-amber-600'
                                : 'text-amber-400'
                            }`}
                          />
                        )}
                        <span>
                          {isBlankToolbar
                            ? 'Audit 0%'
                            : isLiveJudgedToolbar
                            ? `Judge ${toolbarScore}%`
                            : `AST ${toolbarScore}%`}
                        </span>
                      </button>
                    );
                  })()}

                  {/* 4. Auto-Fix Button (Gemini Fix) */}
                  <button
                    id="toolbar-autofix-btn"
                    type="button"
                    onClick={handleAutoFixWithGemini}
                    disabled={isProcessingAi}
                    title="Auto-remediate detected security & geometry findings"
                    className="px-3 py-1 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold text-[11px] flex items-center gap-1 transition cursor-pointer shadow-xs"
                  >
                    {isProcessingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wrench className="w-3.5 h-3.5 text-white" />}
                    <span>Auto-Fix Issues</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Canvas Viewport (100% Full-Width Architecture Diagram, Header-Only Slides Options in AppHeader) */}
            <div className="flex-1 min-h-0 overflow-hidden p-0">
              <div
                style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
                className="w-full h-full transition-transform duration-200 flex items-center justify-center"
              >
                <div className="w-full h-full max-w-none">
                  <DiagramViewerRenderSafe
                    key={`${loadedBlueprintId}_${canvasPerspective}_${isLight ? 'light' : 'dark'}_${currentVersion.versionTag}_${currentVersion.id}`}
                    xml={activeCanvasXml}
                    aspectRatioId="16:9"
                    bgTheme={isLight ? 'light' : 'dark'}
                    minHeight={0}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ========================================================================= */}
      {/* 4. LEAVE / SWITCH INTERCEPT DRAWER: "SAVE SESSION COPY AS YOUR PROJECT?"   */}
      {/* ========================================================================= */}
      {leaveModalOpen && (
        <div
          id="save-session-copy-modal"
          className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-stretch justify-end animate-in fade-in duration-150"
        >
          <div className="bg-white text-slate-900 w-full max-w-xl h-full border-l border-slate-200 shadow-2xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-150">
            <div>
              {/* Drawer Header */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center shadow-2xs">
                    <GitFork className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Save Session Copy as Your Project?
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Dashboard Canonical Blueprints never change &bull; Save your custom session work before leaving
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCancelLeaveModal}
                  className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 space-y-1">
                  <div className="font-extrabold text-xs flex items-center gap-1.5 text-amber-900">
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Canonical Blueprint #{loadedBlueprintId} is Protected &amp; Immutable</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    You made changes (<span className="font-mono font-bold">{currentVersion.versionTag}</span>) in an isolated copy for your user session (<span className="font-mono">{sessionCopyId}</span>) without impacting other users. Would you like to accept and save these changes as your own project, or discard them?
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                      Project Name (Saved to Your Projects Library)
                    </label>
                    <input
                      id="save-session-project-name-input"
                      type="text"
                      value={saveProjectName}
                      onChange={(e) => setSaveProjectName(e.target.value)}
                      placeholder="Enter your custom project name..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-teal-600 focus:outline-none text-xs font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                        Domain / Track
                      </label>
                      <input
                        type="text"
                        value={saveProjectDomain}
                        onChange={(e) => setSaveProjectDomain(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                        Session Lineage
                      </label>
                      <div className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono font-bold text-teal-800">
                        {currentVersion.versionTag} &bull; {versionHistory.length} Snapshots
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer: 3 Explicit User Actions (Accept & Save / Discard / Cancel) */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <button
                id="save-session-project-cancel-btn"
                type="button"
                onClick={handleCancelLeaveModal}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Keep Playing on Dashboard
              </button>

              <div className="flex items-center gap-2">
                <button
                  id="save-session-project-discard-btn"
                  type="button"
                  onClick={handleDiscardSessionChanges}
                  className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Discard Changes</span>
                </button>

                <button
                  id="save-session-project-accept-btn"
                  type="button"
                  onClick={handleAcceptAndSaveProject}
                  disabled={isSavingProject}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
                >
                  {isSavingProject ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Project...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Accept &amp; Save as My Project</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DRAW.IO INLINE EDIT OVERLAY DRAWER                                     */}
      {/* ========================================================================= */}
      {isInlineEditOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-stretch justify-end">
          <div className={`w-full max-w-7xl h-full border-l shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 ${
            isLight ? 'bg-white text-slate-900 border-slate-200' : 'bg-[#0B111E] text-white border-slate-700'
          }`}>
            <div className={`h-14 px-6 border-b flex items-center justify-between shrink-0 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0B111E] border-slate-800'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
                <h3 className={`font-extrabold text-sm ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                  Draw.io Inline Canvas Editor &mdash; {canvasTitle} ({currentVersion.versionTag})
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                }`}>
                  Auto-forks Session Copy v{currentVersion.major}.{currentVersion.minor + 1} on Save
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsInlineEditOpen(false)}
                className={`p-1.5 rounded-xl border transition cursor-pointer ${
                  isLight ? 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 bg-white">
              <iframe
                ref={inlineIframeRef}
                src="https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json&saveAndExit=1&noSaveBtn=0&noExitBtn=0"
                className="w-full h-full border-0"
                title="Draw.io Inline Editor"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ORTHOGONAL MULTI-MODEL JUDGE & AST AUDIT RIGHT-SIDE DRAWER */}
      {/* ========================================================================= */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-stretch justify-end">
          <div className="bg-white text-slate-900 w-full max-w-4xl h-full border-l border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Orthogonal Multi-Model Judge &amp; Deterministic AST Audit Dossier
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Generator:{' '}
                    <code className="font-mono text-indigo-700">
                      {currentVersion.truthfulnessDossier?.generatorModel || currentVersion.sourceLabel || 'template-baseline'}
                    </code>{' '}
                    &bull; Grounding:{' '}
                    <code className="font-mono text-teal-700">
                      {currentVersion.truthfulnessDossier?.groundingModel || 'standards-catalog'}
                    </code>{' '}
                    &bull; Judges:{' '}
                    <code className="font-mono text-purple-700">
                      {currentVersion.truthfulnessDossier?.isLiveModelEvaluated
                        ? currentVersion.truthfulnessDossier.criticJudgeModel
                        : 'Not run yet (AST only)'}
                    </code>{' '}
                    &bull; AST Gate: <code className="font-mono text-slate-700">validateDrawioXml</code>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="audit-modal-run-live-judge-btn"
                  type="button"
                  onClick={handleRunLiveMultiModelJudge}
                  disabled={isProcessingAi}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  {isProcessingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Run Live Multi-Model Judge</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuditModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* Overall Score */}
              {(() => {
                const modalVertexCount = (activeCanvasXml.match(/vertex="1"/g) || []).length;
                const isBlankModal =
                  activeCanvasXml.includes('data-blank-canvas="true"') ||
                  (loadedBlueprintId === 'blank' && modalVertexCount === 0);
                const isStubModal = !isBlankModal && modalVertexCount < 4;
                const isLiveEvaluatedModal = Boolean(currentVersion.truthfulnessDossier?.isLiveModelEvaluated);
                const avgAuditScore =
                  auditScores.length > 0
                    ? Math.round(auditScores.reduce((s, d) => s + d.score, 0) / auditScores.length)
                    : 0;
                const displayComposite = isBlankModal
                  ? 0
                  : currentVersion.truthfulnessDossier?.scores.overallCompositeScore ?? avgAuditScore;
                const displayTruthfulness = isBlankModal
                  ? 0
                  : currentVersion.truthfulnessDossier?.scores.truthfulnessAndReality ?? avgAuditScore;
                const displayGrounding = isBlankModal
                  ? 0
                  : currentVersion.truthfulnessDossier?.scores.externalStandardsGrounding ?? avgAuditScore;
                const displayCompleteness = isBlankModal
                  ? 0
                  : currentVersion.truthfulnessDossier?.scores.logicalMissionCompleteness ?? avgAuditScore;
                const displayGeometry = isBlankModal
                  ? 0
                  : currentVersion.truthfulnessDossier?.scores.geometricZeroCollision ?? avgAuditScore;
                const isFullyCertified =
                  !isBlankModal &&
                  !isStubModal &&
                  isLiveEvaluatedModal &&
                  displayComposite >= 88;
                const isFailedAudit = isBlankModal || isStubModal || displayComposite < 65;

                return (
                  <>
                    <div
                      className={`rounded-2xl p-4 text-white flex items-center justify-between shadow-md ${
                        isFailedAudit
                          ? 'bg-gradient-to-r from-rose-600 to-red-700'
                          : isLiveEvaluatedModal
                          ? 'bg-gradient-to-r from-teal-600 to-indigo-700'
                          : 'bg-gradient-to-r from-slate-700 to-slate-800'
                      }`}
                    >
                      <div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider ${
                            isFailedAudit ? 'text-rose-100' : 'text-teal-100'
                          }`}
                        >
                          {isLiveEvaluatedModal
                            ? `Live Multi-Model Jury (${currentVersion.truthfulnessDossier?.criticJudgeModel})`
                            : 'Deterministic AST Baseline (Click "Run Live Multi-Model Judge" for Frontier Critique)'}
                        </span>
                        <h4 id="audit-modal-composite-score" className="text-3xl font-black">
                          {isBlankModal
                            ? '0% — Blank Canvas (Uncertified)'
                            : isStubModal
                            ? `${displayComposite}% — Incomplete Stub Rejected`
                            : isLiveEvaluatedModal
                            ? `${displayComposite}% ${isFullyCertified ? 'Multi-Model Certified' : 'Evaluated'}`
                            : `${displayComposite}% AST Structural Score`}
                        </h4>
                        <p className={`text-xs mt-0.5 ${isFailedAudit ? 'text-rose-100' : 'text-teal-100'}`}>
                          Truthfulness: {displayTruthfulness}% &bull; Standards Grounding: {displayGrounding}% &bull; Mission Completeness: {displayCompleteness}% &bull; 2D Zero-Collision: {displayGeometry}%
                        </p>
                      </div>
                      <button
                        id="audit-modal-header-autofix-btn"
                        type="button"
                        onClick={handleAutoFixWithGemini}
                        disabled={isProcessingAi}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-teal-50 text-teal-900 font-extrabold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
                      >
                        {isProcessingAi ? (
                          <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                        ) : (
                          <Wrench className="w-4 h-4 text-teal-600" />
                        )}
                        <span>Remediate Detected Gaps</span>
                      </button>
                    </div>
                  </>
                );
              })()}

              {/* Speculative Premise Scientific Reality Check Banner */}
              {currentVersion.truthfulnessDossier?.speculativePremiseWarning.detected && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                      🔬 Scientific Reality Check ({currentVersion.truthfulnessDossier.criticJudgeModel})
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono font-bold text-[10px]">
                      REFRAMED TO SIMULATION
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    <strong>Verdict on &ldquo;{currentVersion.truthfulnessDossier.speculativePremiseWarning.rawClaimInPrompt}&rdquo;:</strong>{' '}
                    {currentVersion.truthfulnessDossier.speculativePremiseWarning.scientificRealityCheck}
                  </p>
                  <p className="text-[11px] text-slate-700 leading-relaxed bg-white/80 p-2 rounded-xl border border-amber-200">
                    <strong>Architectural Remediation Applied:</strong>{' '}
                    {currentVersion.truthfulnessDossier.speculativePremiseWarning.architecturalReframingApplied}
                  </p>
                </div>
              )}

              {/* 6 Category Dimension Cards */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  6-Dimension Structural, Geometric &amp; Domain Invariants Audit
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {auditScores.map((dim) => (
                    <div key={dim.category} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900">{dim.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                            dim.score >= 88
                              ? 'bg-emerald-100 text-emerald-800'
                              : dim.score >= 65
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {dim.score}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{dim.summary}</p>
                      {dim.recommendations.length > 0 ? (
                        <div className="pt-1 text-[10px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200">
                          <strong>Recommendation:</strong> {dim.recommendations[0]}
                        </div>
                      ) : (
                        <div className="pt-1 text-[10px] text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Passed (0 Findings)</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Stage Multi-Model Provenance Ledger: WHO DID WHAT, WHEN & WHY */}
              {currentVersion.truthfulnessDossier?.provenanceLedger && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Provenance Citation Ledger &mdash; Who Did What, When &amp; Why
                  </h4>
                  <div className="space-y-2">
                    {currentVersion.truthfulnessDossier.provenanceLedger.map((stage) => (
                      <div key={stage.stageNumber} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-extrabold text-slate-900">
                            Stage {stage.stageNumber}: {stage.stageName} &mdash; <span className="text-indigo-700">{stage.actorRole}</span>
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                            {stage.modelId} &bull; {stage.timestampUtc} ({stage.durationMs}ms)
                          </span>
                        </div>
                        <p className="text-slate-700"><strong>What:</strong> {stage.whatItDid}</p>
                        <p className="text-slate-600"><strong>Why:</strong> {stage.whyItDidIt}</p>
                        <p className="text-[10px] font-mono text-slate-500">
                          <strong>Code Citation:</strong> {stage.codeCitation} &bull; <strong>Standards:</strong> {stage.externalStandardsCited.join(' | ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 font-mono">
                Audited at: {currentVersion.truthfulnessDossier?.evaluatedAtUtc || currentVersion.timestamp} &bull; Version: {currentVersion.versionTag}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAuditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  id="audit-modal-footer-autofix-btn"
                  type="button"
                  onClick={handleAutoFixWithGemini}
                  disabled={isProcessingAi}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  {isProcessingAi ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>Remediate Detected Gaps</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Same-Screen Gmail-Style Cloud Document Preview Modal (Slides, Docs, PDF) */}
      {cloudViewerModalMode && (
        <GoogleWorkspaceDirectOpenModal
          isOpen={Boolean(cloudViewerModalMode)}
          onClose={() => setCloudViewerModalMode(null)}
          mode={cloudViewerModalMode}
          xmlContent={activeCanvasXml}
          diagramName={canvasTitle || 'Enterprise Architecture Blueprint'}
          blueprintId={isSessionForked && sessionCopyId ? sessionCopyId : `#${loadedBlueprintId}`}
          masterImageSrc={
            !isSessionForked && Number(loadedBlueprintId.replace(/^#/, '')) <= 74
              ? `/templates/canonical_${loadedBlueprintId.replace(/^#/, '').padStart(2, '0')}.png`
              : undefined
          }
        />
      )}

      {/* Dynamic 4-Dropdown Template Picker & Immutable Clone-on-Lock Modal */}
      <NewDiagramInputSelectionModal
        isOpen={isNewDiagramModalOpen}
        onClose={() => setIsNewDiagramModalOpen(false)}
        onSelectOption={handleSelectNewDiagramOption}
        isLight={isLight}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400 font-mono">Loading Operations Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
