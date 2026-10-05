'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useHydratedState } from '@/lib/hooks/useHydrationSafeState';
import {
  Layers,
  Bot,
  Send,
  FileText,
  CheckCircle2,
  Copy,
  ChevronDown,
  RefreshCw,
  Zap,
  History,
  Sparkles,
  ExternalLink,
  Code2,
  Check,
  Download,
  Volume2,
  Cpu,
  ArrowRight,
  Sliders,
  Shield,
  Server,
  Share2,
  Users,
  Plus,
  Bookmark,
  MoreHorizontal,
  Eye,
  HelpCircle,
  Tag,
  Lightbulb,
  Play,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { generateGcpNativeArchitectureXml } from '@/lib/gcpNativeArchitecture';
import { generateGoogleMultiagentArchitectureXml } from '@/lib/masterBuilders/build_master_google_multiagent_ai_system';
import { createDefaultFintechAst, ArchitectureAst, AstComponent, inferServiceAndTierFromLabel } from '@/lib/ast/architectureAst';
import { formatResilienceReply } from '@/lib/ast/resilienceAnalysis';
import { buildDomainExpansionPack, resolveExpansionDomain } from '@/lib/ast/domainExpansionPacks';
import { generateAll10LivingSpecs, summarizeSpecGrounding, LivingSpecDocument } from '@/lib/spec/livingSpecsGenerator';
import { ComponentInspectorDrawer } from '@/components/studio/ComponentInspectorDrawer';
import { BrainGroundingModal } from '@/components/studio/BrainGroundingModal';
import { AudioBriefingModal } from '@/components/studio/AudioBriefingModal';
import { LivingSpecsViewer } from '@/components/studio/LivingSpecsViewer';
import { HierarchicalSyncCard } from '@/components/studio/HierarchicalSyncCard';
import { BlueprintCatalogModal } from '@/components/studio/BlueprintCatalogModal';
import {
  CANONICAL_TEMPLATES,
  CanonicalTemplate,
  DOMAIN_PRESETS
} from '@/lib/canonical/canonicalTemplates';
import { ObjectShareModal } from '@/components/studio/ObjectShareModal';
import { SaveToLibraryModal } from '@/components/studio/SaveToLibraryModal';
import { NewProjectModal, NewProjectConfig } from '@/components/studio/NewProjectModal';
import { MajorVersionModal } from '@/components/studio/MajorVersionModal';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { classifyChatIntent } from '@/lib/router/chatIntentClassifier';
import { AppHeader } from '@/components/AppHeader';
import GoogleWorkspaceDirectOpenModal from '@/components/GoogleWorkspaceDirectOpenModal';
import { generateOpenKnowledgeInfographicXml } from '@/lib/canonical/openKnowledgeInfographic';
import { generateDynamicTieredInfographicXml } from '@/lib/canonical/dynamicTieredInfographic';
import { INFOGRAPHIC_BLUEPRINTS_LIST, generateInfographicBlueprintXmlById } from '@/lib/canonical/infographicBlueprints52to66';
import { FLOW_DIAGRAM_BLUEPRINTS_67_TO_74, generateFlowDiagramBlueprintXmlById } from '@/lib/canonical/flowDiagramBlueprints67to74';
import { synthesizePromptDrivenDiagramXml, generateLogicalFlowchartDrawioXml } from '@/lib/promptDrivenDiagramSynthesizer';
import { getGcpArchitectureById } from '@/lib/gcpDialectA';

export interface StudioVersionSnapshot {
  id: string;
  versionTag: string;
  timestamp: string;
  author: string;
  actionSummary: string;
  ast: ArchitectureAst;
  xml: string;
}

export interface StudioChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionSummary?: {
    versionTag: string;
    canvasDiff: string;
    specDiff: string;
  };
}

// Version Arithmetic Helpers
function getNextMicroVersion(currentVersion: string): string {
  if (/^v?0\.0|\bdraft\b/i.test(currentVersion.trim())) {
    return 'v1.0';
  }
  const match = currentVersion.match(/^v?(\d+)\.(\d+)/);
  if (match) {
    const major = parseInt(match[1], 10);
    const minor = parseInt(match[2], 10);
    if (major === 0) return 'v1.0';
    return `v${major}.${minor + 1}`;
  }
  return 'v1.1';
}

function getNextMajorVersion(currentVersion: string): string {
  const match = currentVersion.match(/^v?(\d+)\.(\d+)$/);
  if (match) {
    const major = parseInt(match[1], 10);
    return `v${major + 1}.0`;
  }
  return 'v2.0';
}

// Concierge Architectural Knowledge Engine
function getConciergeResponse(query: string): string {
  const intentResult = classifyChatIntent(query);
  if (intentResult.intent === 'greeting') {
    return `👋 Hello! Welcome to PromptCanvas Studio. I'm your Architecture Concierge.

Here you can explore this certified Google Cloud Reference Architecture in read-only mode, inspect components, and view synchronized Living Specs (HLD, STRIDE threat models, Spanner DDL).

Feel free to ask me about:
• Cloud security patterns & Zero-Trust
• Multi-region HA & Cloud Spanner DR
• Living Specifications (DOC-01 to DOC-16)
• Or click "+ New Canvas" above to build your own custom topology with AI Co-Pilot!`;
  }

  if (intentResult.intent === 'identity') {
    return `🤖 I am the PromptCanvas Architecture Concierge. I guide you through Google Cloud reference topologies, explain architectural patterns and living specifications, and help you transition to Editor Mode to design and mutate architectures with AI Co-Pilot.`;
  }

  if (intentResult.intent === 'conversational') {
    return `You're very welcome! Let me know if you have any questions about this architecture or click "+ New Canvas" to start your own design.`;
  }

  const lower = query.toLowerCase();

  if (lower.includes('what can this tool do') || lower.includes('what can you do') || lower.includes('capabilities') || lower.includes('features')) {
    return `**PromptCanvas Studio** is an AI-powered Enterprise Cloud Architecture Suite:

1. **Dual-Sync Living Architecture**: Compiles high-contrast, certified Draw.io diagrams that stay 100% bidirectionally synchronized with 16 comprehensive Living Specifications (PRD, HLD, STRIDE Threat Model, Spanner DDL, BCDR Plan, and FinOps runbooks).
2. **Multi-Persona AI Co-Pilot**: Simulate inputs from Product Managers, Lead Architects, CISOs, and FinOps engineers to refine both visual topology and technical specs simultaneously.
3. **${CANONICAL_TEMPLATES.length} Canonical Certified Blueprints**: Pre-engineered Google Cloud reference topologies covering event streaming, multi-region lakehouses, Vertex AI RAG hubs, Whiteboard/Paper sketches, and Zero-Trust perimeters.
4. **Draw.io Native Interop**: Fully compatible with diagrams.net. Download standard \`.drawio\` XML, export high-res diagrams, or open directly in the web editor.
5. **Auditory Briefings**: Generate 2-minute executive audio briefings summarizing architecture tradeoffs and SLAs.

To build your own project, click **"+ New Canvas"** in the top navigation!`;
  }

  if (lower.includes('how to use') || lower.includes('how do i create') || lower.includes('how does it work') || lower.includes('get started') || lower.includes('new diagram') || lower.includes('version')) {
    return `Here is how to get started with PromptCanvas Studio:

1. **Start a Project**: Click the **"+ New Canvas"** button at the top. Describe your application use case, choose an industry domain, and select a starter blueprint (or Blank Canvas).
2. **Dedicated Sandbox**: You'll receive a dedicated Canvas with a unique Session ID, initialized at baseline **v1.0**.
3. **Iterate with AI Co-Pilot**: Tell ArcAssist what you want to add or modify (e.g. *"Add Cloud Armor WAF and BigQuery streaming buffer"*). The diagram updates and micro-versions automatically increment (**v1.0 → v1.1 → v1.2**).
4. **Save Major Milestones**: When your team completes an architecture review, click **"Tag Major Release"** to promote your changes to **v2.0** with custom release notes.
5. **Inspect & Export**: Click on any node to view Terraform HCL, SLA targets, and latency budgets, or export full Living Specs and Draw.io bundles.`;
  }

  if (lower.includes('zero trust') || lower.includes('security') || lower.includes('cmek') || lower.includes('ciso') || lower.includes('armor') || lower.includes('vpc')) {
    return `**Google Cloud Zero-Trust & Security Architecture Patterns**:

- **Perimeter Defense**: Google Cloud Armor provides Layer 7 WAF inspection, DDoS mitigation, and OWASP Top 10 rule enforcement at the global edge.
- **Identity-Aware Proxy (IAP)**: Replaces traditional VPNs with context-aware access control based on user identity and device health.
- **Envelope Encryption with Cloud KMS HSM**: Customer-Managed Encryption Keys (CMEK) backed by FIPS 140-2 Level 3 Hardware Security Modules guard Cloud Spanner databases, BigQuery datasets, and Cloud Storage buckets.
- **VPC Service Controls (VPC-SC)**: Creates cryptographic boundaries preventing data exfiltration between Google Cloud services and untrusted networks.
- **STRIDE Threat Modeling**: Synchronized automatically in **DOC-06** of the Living Specifications.`;
  }

  if (lower.includes('multi-region') || lower.includes('dr') || lower.includes('spanner') || lower.includes('rpo') || lower.includes('rto') || lower.includes('sla') || lower.includes('failover')) {
    return `**High Availability & Multi-Region DR Architecture**:

- **Cloud Spanner Multi-Region (\`nam3\`)**: Uses synchronous Paxos consensus with dual read-write leaders across primary regions (e.g. \`us-central1\`, \`us-east4\`) and a witness replica in \`europe-west1\`.
- **Target RPO < 1 Second**: Synchronous multi-region Paxos guarantees zero data loss across regional network partitions.
- **Target RTO < 15 Seconds**: Automated leader election and health checking without manual human intervention.
- **Active-Active Routing**: Global Cloud Load Balancing (GCLB) routes traffic to the nearest healthy region with sub-30ms failover.
- **Live Governance**: All DR parameters and SLA commitments (99.999%) are continuously audited in **DOC-09 (BCDR Plan)**.`;
  }

  if (lower.includes('living spec') || lower.includes('specs') || lower.includes('prd') || lower.includes('hld') || lower.includes('document')) {
    return `**Living Specifications Engine**:

Unlike static documentation that quickly becomes obsolete, PromptCanvas Studio generates **16 synchronized Living Specifications** directly from the Architecture AST (Abstract Syntax Tree):

- **DOC-01 to DOC-04**: Product Requirements (PRD), Stakeholder Personas, System Architecture (HLD), and API Protocols.
- **DOC-05 to DOC-07**: Infrastructure & Database DDL, STRIDE Threat Model, and SRE/Observability Runbooks.
- **DOC-08 to DOC-10**: Disaster Recovery (BCDR), FinOps Cost Optimization, and Compliance/Audit Matrices.
- **DOC-11 to DOC-16**: Data Governance, Integration Protocols, Deployment Topologies, and Performance Budgets.

Whenever the diagram is modified by the AI Co-Pilot, all 16 documents update in real-time. Switch to the **"Living Specs"** tab above to read them!`;
  }

  if (lower.includes('draw.io') || lower.includes('save') || lower.includes('export') || lower.includes('download')) {
    return `**Draw.io & Export Guidance**:

- **Open in diagrams.net**: Click **"Open in draw.io"** to open this topology in the diagrams.net web editor. Note that external edits in diagrams.net are a client-side scratchpad and won't sync back to PromptCanvas unless saved as a new project.
- **Download XML**: Export the raw \`.drawio\` XML file to version-control in Git or import into enterprise repositories.
- **Save to Library**: Click **"Save to Library"** to promote your canvas into a permanent company blueprint visible in your organization's Architecture Library.
- **Living Spec Markdown Bundle**: Download all 16 specification documents as a clean Markdown bundle for distribution.`;
  }

  return `I can help you explore this Google Cloud reference architecture or get started with your own design:

- **What can this tool do?**: Ask about PromptCanvas Studio features and living specifications.
- **How to use**: Learn how to launch a new canvas and collaborate with AI.
- **Security & Zero-Trust**: Learn how Cloud Armor, CMEK, and VPC-SC are structured.
- **Multi-Region DR**: Understand Cloud Spanner Paxos consensus and 99.999% SLA topologies.

To start designing your own architecture, click **"+ New Canvas"** above!`;
}

export interface StudioTabItem {
  id: string;
  title: string;
  mode: 'launchpad' | 'canvas';
  intentEngine: 'auto' | 'cloud' | 'sequence' | 'erd' | 'vision';
  blueprintId: string;
  domain: string;
  versionTag: string;
  isLocked: boolean;
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-mono text-xs">Loading Architecture Studio...</div>}>
      <StudioMain />
    </Suspense>
  );
}

function StudioMain() {
  const searchParams = useSearchParams();

  // 1. Session Mode & v2.2 Single-Surface Paradigm State
  const [isEditorMode, setIsEditorMode] = useHydratedState<boolean>(true, () => {
    const urlMode = new URLSearchParams(window.location.search).get('mode');
    return urlMode !== 'showcase';
  });

  const [sessionId, setSessionId] = useHydratedState<string>('ses_studio_v22', () => {
    return new URLSearchParams(window.location.search).get('id') || 'ses_studio_v22';
  });

  // v2.2 Multi-Tab & Single-Surface Launchpad Mode State
  // By default, Tab 1 starts in Active Canvas Mode (v1.0) so active canvas workflows and non-mutating queries work immediately,
  // while clicking '+' (New Tab) or launching with ?mode=launchpad opens a tab in Inline Launchpad Mode with 0px sidebars!
  const [studioTabs, setStudioTabs] = useState<StudioTabItem[]>([
    {
      id: 'tab_1',
      title: 'Cloud Infra',
      mode: 'canvas',
      intentEngine: 'cloud',
      blueprintId: '00',
      domain: 'biopharma',
      versionTag: 'v1.0',
      isLocked: false
    }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab_1');
  const [isLaunchpadMode, setIsLaunchpadMode] = useState<boolean>(false);
  const [isLeftDrawerCollapsed, setIsLeftDrawerCollapsed] = useState<boolean>(false);
  const [isRightGovernanceOpen, setIsRightGovernanceOpen] = useState<boolean>(false);
  const [isCanvasLocked, setIsCanvasLocked] = useState<boolean>(false);
  const [selectedIntentChip, setSelectedIntentChip] = useState<'auto' | 'cloud' | 'sequence' | 'erd' | 'vision'>('auto');
  const [launchpadPromptInput, setLaunchpadPromptInput] = useState<string>('');
  const [launchpadIndustry, setLaunchpadIndustry] = useState<string>('all');
  const [launchpadSearch, setLaunchpadSearch] = useState<string>('');
  const [isSpotlightOpen, setIsSpotlightOpen] = useState<boolean>(false);
  const [spotlightInput, setSpotlightInput] = useState<string>('');

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get('id');
    const urlMode = params.get('mode');
    if (urlMode === 'launchpad') {
      setIsLaunchpadMode(true);
      setIsLeftDrawerCollapsed(true);
      setIsRightGovernanceOpen(false);
    } else if (urlId && urlId !== 'reference_showcase') {
      setSessionId(urlId);
      setIsEditorMode(true);
    }
  }, []);

  // Keyboard shortcuts: Cmd/Ctrl + K (Spotlight AI Command Bar) and Cmd/Ctrl + [ (Toggle Left AI Drawer)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key === '[') {
        e.preventDefault();
        if (!isLaunchpadMode) {
          setIsLeftDrawerCollapsed((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLaunchpadMode]);

  const [ast, setAst] = useState<ArchitectureAst>(() => createDefaultFintechAst());
  const [activeView, setActiveView] = useState<'diagram' | 'specs'>('diagram');
  const [activeDocId, setActiveDocId] = useState<string>('DOC-01');
  const [xml, setXml] = useState<string>(() => generateGcpNativeArchitectureXml());
  
  // 2. Modals & Micro-Drawers
  const [selectedComponent, setSelectedComponent] = useState<AstComponent | null>(null);
  const [isBrainModalOpen, setIsBrainModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isMajorVersionModalOpen, setIsMajorVersionModalOpen] = useState(false);
  const [cloudViewerModalMode, setCloudViewerModalMode] = useState<'slides' | 'docs' | 'pdf' | null>(null);

  useEffect(() => {
    if (!isExportDropdownOpen && !isVersionDropdownOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExportDropdownOpen(false);
        setIsVersionDropdownOpen(false);
      }
    };
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        !target.closest('#studio-export-dropdown-container') &&
        !target.closest('#studio-version-dropdown-container')
      ) {
        setIsExportDropdownOpen(false);
        setIsVersionDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isExportDropdownOpen, isVersionDropdownOpen]);

  // 3. Version History Snapshots
  const [versions, setVersions] = useState<StudioVersionSnapshot[]>([
    {
      id: 'v_ref_1_0',
      versionTag: 'v1.0',
      timestamp: '10:00 AM',
      author: 'AI Assistant',
      actionSummary: 'Google Cloud Enterprise Reference Blueprint (Certified)',
      ast: createDefaultFintechAst(),
      xml: generateGcpNativeArchitectureXml()
    }
  ]);
  const [activeVersionTag, setActiveVersionTag] = useState('v1.0');
  const latestPromptRequestIdRef = useRef<number>(0);

  // Canonical Blueprint Catalog State
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('00');
  const [selectedDomain, setSelectedDomain] = useState<string>('biopharma');

  // Object-Level Granular Sharing & Collaboration State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareTargetType, setShareTargetType] = useState<'project' | 'doc' | 'node' | 'version'>('project');
  const [shareTargetId, setShareTargetId] = useState('proj_root');
  const [shareTargetTitle, setShareTargetTitle] = useState(ast.metadata.projectTitle);

  // Save to Library Promotion State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSavedInLibrary, setIsSavedInLibrary] = useState(() => sessionId.startsWith('proj_'));

  // Concierge Messages Stream (Showcase Mode)
  const [conciergeMessages, setConciergeMessages] = useState<StudioChatMessage[]>([
    {
      id: 'concierge_welcome',
      sender: 'assistant',
      text: "Welcome to PromptCanvas Studio! I'm your Architecture Concierge.\n\nHere you can explore this certified Google Cloud Reference Architecture in read-only mode. You can inspect components, view synchronized Living Specs (HLD, STRIDE threat models, Spanner DDL), or open the diagram in draw.io to test changes.\n\nAsk me anything about this architecture, cloud best practices, or click \"+ New Canvas\" above to build your own custom topology with AI Co-Pilot!",
      timestamp: 'Just now'
    }
  ]);
  const [conciergeInput, setConciergeInput] = useState('');

  // Co-Pilot Messages Stream (Editor Mode)
  const [messages, setMessages] = useState<StudioChatMessage[]>([
    {
      id: 'msg_init',
      sender: 'assistant',
      text: 'Baseline version v1.0 initialized. Your diagram is ready for customization. Tell me your project requirements or click any suggestion chip below to start evolving your architecture.',
      timestamp: '10:00 AM',
      actionSummary: {
        versionTag: 'v1.0',
        canvasDiff: 'Synthesized baseline Google Cloud enterprise nodes across 6 architectural tiers.',
        specDiff: 'Generated 16 living specification documents (DOC-01 through DOC-16).'
      }
    }
  ]);
  const [promptInput, setPromptInput] = useState('');

  // Persist Studio Co-Pilot prompt draft in sessionStorage (UX-26)
  useEffect(() => {
    try {
      const savedDraft = sessionStorage.getItem(`promptcanvas_studio_prompt_draft_${sessionId}`);
      if (savedDraft) setPromptInput(savedDraft);
    } catch {}
  }, [sessionId]);

  useEffect(() => {
    try {
      if (promptInput) {
        sessionStorage.setItem(`promptcanvas_studio_prompt_draft_${sessionId}`, promptInput);
      } else {
        sessionStorage.removeItem(`promptcanvas_studio_prompt_draft_${sessionId}`);
      }
    } catch {}
  }, [promptInput, sessionId]);

  // Auto-scroll refs for message streams (scoped to chat container, avoids scrolling parent window)
  const conciergeScrollRef = useRef<HTMLDivElement>(null);
  const editorScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conciergeScrollRef.current) {
      conciergeScrollRef.current.scrollTop = conciergeScrollRef.current.scrollHeight;
    }
  }, [conciergeMessages]);

  useEffect(() => {
    if (editorScrollRef.current) {
      editorScrollRef.current.scrollTop = editorScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Canvas Viewport Zoom Controls
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(2.5, +(prev + 0.15).toFixed(2)));
  }, []);
  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(0.5, +(prev - 0.15).toFixed(2)));
  }, []);
  const handleResetZoom = useCallback(() => {
    setZoomLevel(1.0);
  }, []);

  // Keyboard Zoom Shortcuts (Ctrl/Cmd + '+', '-', '0')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        handleZoomIn();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        handleZoomOut();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        handleResetZoom();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handleResetZoom]);

  const [selectedDiagramMode, setSelectedDiagramMode] = useState<'blueprint' | 'flowchart' | 'infographic' | 'architecture'>('blueprint');
  const [selectedAbstractionLevel, setSelectedAbstractionLevel] = useState<'L1' | 'L2' | 'L3' | 'L4'>('L2');
  const [selectedFlowDirection, setSelectedFlowDirection] = useState<'TD' | 'LR'>('LR');
  const [selectedInfographicBlueprintId, setSelectedInfographicBlueprintId] = useState<string>('52');
  const [isFlowTreeOpen, setIsFlowTreeOpen] = useState<boolean>(false);
  const [isFlowTreeTier2Open, setIsFlowTreeTier2Open] = useState<boolean>(false);
  const [isFlowTreeTier3Open, setIsFlowTreeTier3Open] = useState<boolean>(false);
  const [flowTreeSearchQuery, setFlowTreeSearchQuery] = useState<string>('');
  const flowTreeCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isFlowTreeOpen) return;
    const handleEscapeTree = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFlowTreeOpen(false);
        setIsFlowTreeTier2Open(false);
        setIsFlowTreeTier3Open(false);
      }
    };
    window.addEventListener('keydown', handleEscapeTree);
    return () => window.removeEventListener('keydown', handleEscapeTree);
  }, [isFlowTreeOpen]);
  const [isNewDiagramDraft, setIsNewDiagramDraft] = useState<boolean>(false);
  const [pendingPlan, setPendingPlan] = useState<{
    prompt: string;
    sanitizedPrompt: string;
    diagramMode: 'blueprint' | 'flowchart' | 'infographic' | 'architecture';
    level: 'L1' | 'L2' | 'L3' | 'L4';
    direction: 'LR' | 'TD';
    blueprintId: string;
    infographicBlueprintId?: string;
    plannedSteps: string[];
    targetVersionTag: string;
  } | null>(null);
  const [isInlineDrawioEdit, setIsInlineDrawioEdit] = useState<boolean>(false);
  const [isSideBySideCompare, setIsSideBySideCompare] = useState<boolean>(false);
  const inlineDrawioIframeRef = useRef<HTMLIFrameElement | null>(null);
  const latestInlineXmlRef = useRef<string>('');

  // Commit manual Draw.io edits (from either Inline Editor or Fullscreen /drawio-editor Tab)
  // into active canvas AND append a new Version Snapshot (maintaining full Prompt + Diagram XML history)
  const commitDrawioEditToCanvasAndHistory = useCallback(
    (savedXml: string, editSourceLabel: string) => {
      if (!savedXml || !savedXml.includes('<mxGraphModel')) return;
      setXml(savedXml);
      latestInlineXmlRef.current = savedXml;
      setIsInlineDrawioEdit(false);

      setVersions((prev) => {
        const nextMinor = prev.length;
        const nextTag = nextMinor === 0 ? 'v1.0' : `v1.${nextMinor}`;
        setActiveVersionTag(nextTag);
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((mPrev) => [
          ...mPrev,
          {
            id: `msg_drawio_sync_${Date.now()}`,
            sender: 'assistant',
            text: `🔄 [${nextTag} • ${editSourceLabel}]: Diagram XML synced back to Studio Canvas. Full prompt & diagram version history updated (${prev.length + 1} versions stored).`,
            timestamp: nowStr,
          },
        ]);
        return [
          {
            id: `v_drawio_${Date.now()}`,
            versionTag: nextTag,
            timestamp: nowStr,
            author: editSourceLabel,
            actionSummary: `[${editSourceLabel}] • ${selectedDiagramMode.toUpperCase()} (${selectedAbstractionLevel}${selectedDiagramMode === 'flowchart' ? ' • ' + selectedFlowDirection : ''})`,
            ast,
            xml: savedXml,
          },
          ...prev,
        ];
      });
    },
    [ast, selectedDiagramMode, selectedAbstractionLevel, selectedFlowDirection]
  );

  // Listen for live saves from the New Tab Draw.io Editor (/drawio-editor) AND Inline Draw.io iframe
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('promptcanvas_drawio_sync');
      bc.onmessage = (ev) => {
        if (ev.data?.xml) {
          commitDrawioEditToCanvasAndHistory(ev.data.xml, ev.data.note || 'Saved from Draw.io Tab');
        }
      };
    }
    const handleStorage = (ev: StorageEvent) => {
      if (ev.key === 'promptcanvas_drawio_saved_payload' && ev.newValue) {
        try {
          const parsed = JSON.parse(ev.newValue);
          if (parsed?.xml) {
            commitDrawioEditToCanvasAndHistory(parsed.xml, parsed.note || 'Saved from Draw.io Tab');
          }
        } catch {
          // ignore
        }
      }
    };
    const sanitizeXmlAttributeValues = (raw: string): string =>
      String(raw || '').replace(/value="([^"]*)"/g, (_m, val: string) => {
        if (!val.includes('<') && !val.includes('>')) return _m;
        return `value="${val.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`;
      });

    const handleInlineMessage = (ev: MessageEvent) => {
      if (!isInlineDrawioEdit || !ev.data || typeof ev.data !== 'string') return;
      try {
        const msg = JSON.parse(ev.data);
        if (msg.event === 'init') {
          const safeInlineXml = sanitizeXmlAttributeValues(latestInlineXmlRef.current || xml);
          inlineDrawioIframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'load',
              autosave: 1,
              xml: safeInlineXml,
            }),
            '*'
          );
        } else if (msg.event === 'autosave' && typeof msg.xml === 'string') {
          latestInlineXmlRef.current = msg.xml;
        } else if ((msg.event === 'save' || msg.event === 'exit') && typeof msg.xml === 'string') {
          commitDrawioEditToCanvasAndHistory(msg.xml, 'Saved from Inline Draw.io Editor');
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('message', handleInlineMessage);
    return () => {
      bc?.close();
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('message', handleInlineMessage);
    };
  }, [commitDrawioEditToCanvasAndHistory, isInlineDrawioEdit, xml]);

  // Handle Concierge Question Submit
  const handleConciergeSubmit = (queryText: string) => {
    if (!queryText.trim()) return;
    const qLower = queryText.toLowerCase();
    const isOpenKnowledge =
      qLower.includes('open knowledge format infographic') ||
      (qLower.includes('open knowledge') && qLower.includes('infographic'));

    if (isOpenKnowledge) {
      setConciergeInput('');
      const okXml = generateOpenKnowledgeInfographicXml(selectedDomain, 'light');
      setXml(okXml);
      setSelectedBlueprintId('custom');
      setAst(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          projectTitle: 'Open Knowledge Format Infographic (Formats + Schema + Validation + Graph)'
        }
      }));
      const userMsg: StudioChatMessage = {
        id: `c_user_${Date.now()}`,
        sender: 'user',
        text: queryText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const aiMsg: StudioChatMessage = {
        id: `c_ai_${Date.now() + 1}`,
        sender: 'assistant',
        text: `Generated **Open Knowledge Format Infographic** (*Formats + Schema + Validation + Knowledge Graph*) using the 4-Tier Architectural Infographic engine.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConciergeMessages(prev => [...prev, userMsg, aiMsg]);
      return;
    }

    const isCharlieHillsHarness =
      (qLower.includes('harness') && qLower.includes('loop') && qLower.includes('context')) ||
      qLower.includes('context + harness') ||
      qLower.includes('charlie hills');

    if (isCharlieHillsHarness) {
      const bp52 = CANONICAL_TEMPLATES.find(t => t.id === '52');
      if (bp52) {
        setConciergeInput('');
        handleSelectBlueprint(bp52, selectedDomain);
        return;
      }
    }

    if (qLower.includes('infographic')) {
      setConciergeInput('');
      const userMsg: StudioChatMessage = {
        id: `c_user_${Date.now()}`,
        sender: 'user',
        text: queryText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConciergeMessages(prev => [...prev, userMsg]);
      setIsHealing(true);

      fetch('/api/research-infographic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: queryText })
      })
        .then(res => res.json())
        .then(data => {
          const finalXml = data?.xml || generateDynamicTieredInfographicXml(queryText);
          setXml(finalXml);
          setSelectedBlueprintId('custom');
          setAst(prev => ({
            ...prev,
            metadata: {
              ...prev.metadata,
              projectTitle: `${queryText} — 6-Dimension Researched Infographic`
            }
          }));
          const aiMsg: StudioChatMessage = {
            id: `c_ai_${Date.now() + 1}`,
            sender: 'assistant',
            text: data?.researchBriefMarkdown || `Synthesized bespoke **4-Tier Architectural Infographic** for **${queryText}**.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setConciergeMessages(prev => [...prev, aiMsg]);
        })
        .catch(() => {
          const dynXml = generateDynamicTieredInfographicXml(queryText);
          setXml(dynXml);
          setSelectedBlueprintId('custom');
        })
        .finally(() => {
          setIsHealing(false);
        });
      return;
    }

    const userMsg: StudioChatMessage = {
      id: `c_user_${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const responseText = getConciergeResponse(queryText);
    const aiMsg: StudioChatMessage = {
      id: `c_ai_${Date.now() + 1}`,
      sender: 'assistant',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setConciergeMessages(prev => [...prev, userMsg, aiMsg]);
    setConciergeInput('');
  };

  // Canonical Blueprint Selection Handler
  const handleSelectBlueprint = useCallback((blueprint: CanonicalTemplate, domainPresetId: string) => {
    setSelectedBlueprintId(blueprint.id);
    setSelectedDomain(domainPresetId);

    const domainPreset = DOMAIN_PRESETS.find(d => d.id === domainPresetId) || DOMAIN_PRESETS[0];
    const newXml = blueprint.generateXml(domainPresetId, 'light');
    setXml(newXml);

    const components: AstComponent[] = (blueprint.keyComponents || []).map((compName, idx) => {
      let tier: AstComponent['tier'] = 'compute';
      const lower = compName.toLowerCase();
      if (lower.includes('armor') || lower.includes('ingress') || lower.includes('gateway') || lower.includes('load balancer') || lower.includes('cdn') || lower.includes('apigee') || lower.includes('dns')) {
        tier = 'ingress';
      } else if (lower.includes('spanner') || lower.includes('bigquery') || lower.includes('database') || lower.includes('storage') || lower.includes('lake') || lower.includes('sql') || lower.includes('redis')) {
        tier = 'data';
      } else if (lower.includes('iam') || lower.includes('kms') || lower.includes('security') || lower.includes('vault') || lower.includes('dlp') || lower.includes('scc') || lower.includes('shield')) {
        tier = 'security';
      } else if (lower.includes('dr') || lower.includes('failover') || lower.includes('backup') || lower.includes('resilience')) {
        tier = 'dr';
      } else if (lower.includes('sre') || lower.includes('logging') || lower.includes('monitoring') || lower.includes('telemetry') || lower.includes('trace') || lower.includes('observability')) {
        tier = 'observability';
      }

      return {
        id: `comp_${blueprint.id}_${idx}`,
        name: compName,
        service: compName,
        tier,
        region: idx % 2 === 0 ? 'us-central1' : 'global',
        role: `${blueprint.family} Architecture Component`,
        description: `${compName} participating in ${blueprint.name} (${blueprint.level} Certified Blueprint).`,
        sla: '99.99%',
        protocols: ['HTTPS', 'gRPC', 'TLS 1.3']
      };
    });

    const newAst: ArchitectureAst = {
      metadata: {
        projectTitle: `${domainPreset.prefix} - ${blueprint.name}`,
        projectId: `bp-${blueprint.id}`,
        version: `#${blueprint.id}`,
        domain: domainPreset.name,
        slaTarget: '99.99%',
        targetRpo: '< 5 Seconds',
        targetRto: '< 30 Seconds',
        primaryRegion: 'us-central1',
        drRegions: ['europe-west1'],
        compliance: ['SOC2 Type II', 'ISO 27001', 'PCI-DSS 4.0'],
        latencyBudgetMs: 45,
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      components: components.length > 0 ? components : ast.components,
      connections: []
    };

    setAst(newAst);
    setIsEditorMode(true);
    setIsLaunchpadMode(false);
    setIsLeftDrawerCollapsed(false);
    setActiveVersionTag('v1.0');
    setStudioTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? {
              ...t,
              title: blueprint.name.slice(0, 24),
              mode: 'canvas',
              blueprintId: blueprint.id,
              domain: domainPresetId,
              versionTag: 'v1.0'
            }
          : t
      )
    );

    setVersions(prev => [
      {
        id: `bp_${blueprint.id}_${Date.now()}`,
        versionTag: 'v1.0',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        author: 'AI Assistant',
        actionSummary: `Loaded Canonical Blueprint #${blueprint.id}: ${blueprint.name}`,
        ast: newAst,
        xml: newXml
      },
      ...prev
    ]);
    setMessages(prev => [
      ...prev,
      {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        text: `Loaded Canonical Blueprint #${blueprint.id}: ${blueprint.name} (${blueprint.family} Family, ${blueprint.level} Certified). Synchronized 16 Living Specifications with ${domainPreset.name} industry domain flavor.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionSummary: {
          versionTag: 'v1.0',
          canvasDiff: `Rendered ${blueprint.keyComponents?.length || 12} components across ${blueprint.family} architecture.`,
          specDiff: `Reconciled DOC-01 through DOC-16 for ${domainPreset.prefix}.`
        }
      }
    ]);
  }, [ast.components, activeTabId]);

  const handleOpenBlueprintInNewTab = useCallback((blueprint: CanonicalTemplate, domainPresetId: string) => {
    const newTabId = `tab_${Date.now()}`;
    const newTab: StudioTabItem = {
      id: newTabId,
      title: blueprint.name.slice(0, 22),
      mode: 'canvas',
      intentEngine: 'cloud',
      blueprintId: blueprint.id,
      domain: domainPresetId,
      versionTag: 'v1.0',
      isLocked: false
    };
    setStudioTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTabId);
    handleSelectBlueprint(blueprint, domainPresetId);
  }, [handleSelectBlueprint]);

  const handleOpenNewTab = useCallback(() => {
    const nextNum = studioTabs.length + 1;
    const newTabId = `tab_${nextNum}`;
    const newTab: StudioTabItem = {
      id: newTabId,
      title: `Tab ${nextNum}: New Diagram`,
      mode: 'launchpad',
      intentEngine: 'auto',
      blueprintId: '00',
      domain: 'enterprise',
      versionTag: 'v0.0 (Draft)',
      isLocked: false
    };
    setStudioTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTabId);
    setSelectedBlueprintId('00');
    setXml(generateGcpNativeArchitectureXml());
    setIsLaunchpadMode(true);
    setIsLeftDrawerCollapsed(false);
    setIsRightGovernanceOpen(false);
    setIsInlineDrawioEdit(false);
    setIsSideBySideCompare(false);
    setSelectedComponent(null);
    setIsNewDiagramDraft(true);
    setPendingPlan(null);
    setSelectedDiagramMode('blueprint');
    setSelectedAbstractionLevel('L3');
    setSelectedFlowDirection('LR');
    setActiveVersionTag('v0.0 (Draft)');
    if (promptInput.trim()) {
      setLaunchpadPromptInput(promptInput.trim());
    }
    setMessages([
      {
        id: `msg_new_${Date.now()}`,
        sender: 'assistant',
        text: `✨ **New Diagram Workspace Ready (Default: 2026 GCP & Gemini Enterprise Native Technical Architecture)**.\n\nEnter your architecture prompt in the canvas composer or below (e.g., *"Design a GCP native technical architecture with Gemini Enterprise, ADK, A2A, MCP & Cloud Spanner"*), or click any of the ${CANONICAL_TEMPLATES.length} certified blueprints on the canvas to generate **v1.0**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [studioTabs.length, promptInput]);

  const handleApprovePendingPlan = useCallback(() => {
    if (!pendingPlan) return;
    const { prompt: planPrompt, diagramMode, level, direction, blueprintId, infographicBlueprintId } = pendingPlan;
    const nextTag = isNewDiagramDraft ? 'v1.0' : `v1.${versions.length}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const rawPlanTitle = String(planPrompt || '')
      .trim()
      .replace(/^(please\s+)?(design|architect|build|create|deploy|synthesize|flowchart\s+for|infographic\s+for)\s+(a\s+|an\s+|the\s+)?(full\s+|complete\s+)?/i, '')
      .replace(/\s+(architecture|diagram|flowchart|blueprint|topology)\.?$/i, '')
      .replace(/\.$/, '')
      .trim();
    const wordSafePlanTitle =
      rawPlanTitle.length > 96
        ? rawPlanTitle.slice(0, 96).replace(/\s+\S*$/, '')
        : rawPlanTitle;
    const title =
      wordSafePlanTitle.length > 8
        ? wordSafePlanTitle.charAt(0).toUpperCase() + wordSafePlanTitle.slice(1)
        : ast.metadata.projectTitle || 'Enterprise Architecture';

    setAst((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, projectTitle: title },
    }));

    const isZeroTemplateInfographic =
      /4-tier\s+infographic|zero-template\s+infographic|dynamic\s+tiered\s+infographic/i.test(planPrompt) ||
      infographicBlueprintId === 'blank';
    const activeInfoId = isZeroTemplateInfographic
      ? 'blank'
      : diagramMode === 'infographic'
      ? infographicBlueprintId || selectedInfographicBlueprintId || '52'
      : INFOGRAPHIC_BLUEPRINTS_LIST.some((b) => b.id === blueprintId)
      ? blueprintId
      : null;

    let generatedXml = xml;
    if (isZeroTemplateInfographic) {
      generatedXml = generateDynamicTieredInfographicXml(planPrompt);
    } else if (activeInfoId) {
      generatedXml = generateInfographicBlueprintXmlById(activeInfoId, planPrompt, undefined, level);
    } else if (diagramMode === 'flowchart' || /\bflowchart\b/i.test(planPrompt)) {
      generatedXml = generateLogicalFlowchartDrawioXml(planPrompt, title, direction, level);
    } else if (diagramMode === 'blueprint' && (!planPrompt || planPrompt.trim().length < 16)) {
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === blueprintId) || CANONICAL_TEMPLATES[0];
      generatedXml = bp.generateXml(selectedDomain, 'light');
    } else {
      generatedXml = synthesizePromptDrivenDiagramXml(planPrompt, title, selectedDomain || 'Enterprise Cloud');
    }

    setXml(generatedXml);
    setIsNewDiagramDraft(false);
    setActiveVersionTag(nextTag);
    setPendingPlan(null);

    setStudioTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, versionTag: nextTag } : t))
    );

    const snapId = `v_plan_${Date.now()}`;
    const newSnap: StudioVersionSnapshot = {
      id: snapId,
      versionTag: nextTag,
      timestamp: nowStr,
      author: 'Approved Plan',
      actionSummary: `[${diagramMode.toUpperCase()}${activeInfoId ? ' #' + activeInfoId : ''} • ${level}${diagramMode === 'flowchart' ? ' • ' + direction : ''}] Prompt: "${planPrompt}"`,
      ast,
      xml: generatedXml,
    };
    setVersions((prev) => [newSnap, ...prev]);

    setMessages((prev) => [
      ...prev,
      {
        id: `msg_approved_${Date.now()}`,
        sender: 'assistant',
        text: `✅ Plan Approved → Created ${nextTag} (${diagramMode.toUpperCase()}${activeInfoId ? ' Blueprint #' + activeInfoId : ''} • ${level}${diagramMode === 'flowchart' ? ' • ' + direction : ''}).${activeInfoId ? ' Calling Gemini Live API to dynamically tailor all stages & metrics to your prompt...' : ''}`,
        timestamp: nowStr,
      },
    ]);

    if (activeInfoId) {
      setIsHealing(true);
      fetch('/api/infographic-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blueprintId: activeInfoId,
          noTemplate: isZeroTemplateInfographic,
          prompt: planPrompt,
          level,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data?.xml) {
            setXml(data.xml);
            setVersions((prev) =>
              prev.map((v) =>
                v.id === snapId
                  ? {
                      ...v,
                      actionSummary: `[GEMINI LIVE • #${activeInfoId} ${data.shortType || ''} • ${level}] "${planPrompt}"`,
                      xml: data.xml,
                    }
                  : v
              )
            );
            setMessages((prev) => [
              ...prev,
              {
                id: `msg_gemini_live_${Date.now()}`,
                sender: 'assistant',
                text: `✨ **Gemini Live API (${data.engineUsed} • ${data.latencyMs}ms)** updated Infographic Blueprint **#${activeInfoId} (${data.shortType})** for *"${planPrompt}"*:\n• **Title**: ${data.title}\n• **Takeaway**: ${data.takeaway || 'Validated across all stages.'}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
          }
        })
        .catch(() => {})
        .finally(() => setIsHealing(false));
    }
  }, [pendingPlan, isNewDiagramDraft, versions.length, ast, xml, selectedDomain, activeTabId, selectedInfographicBlueprintId]);

  const handleSelectTab = useCallback((tab: StudioTabItem) => {
    setActiveTabId(tab.id);
    if (tab.mode === 'launchpad') {
      setIsLaunchpadMode(true);
      setIsLeftDrawerCollapsed(true);
      setIsRightGovernanceOpen(false);
      setSelectedComponent(null);
    } else {
      setIsLaunchpadMode(false);
      setIsLeftDrawerCollapsed(false);
      setIsCanvasLocked(tab.isLocked);
    }
  }, []);

  const handleBranchCloneProject = useCallback(() => {
    const nextNum = studioTabs.length + 1;
    const newTabId = `tab_branch_${nextNum}`;
    const branchedTitle = `${ast.metadata.projectTitle.slice(0, 18)} (Branch)`;
    const newTab: StudioTabItem = {
      id: newTabId,
      title: branchedTitle,
      mode: 'canvas',
      intentEngine: selectedIntentChip,
      blueprintId: selectedBlueprintId,
      domain: selectedDomain,
      versionTag: 'v1.0',
      isLocked: false
    };
    setStudioTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTabId);
    setIsLaunchpadMode(false);
    setIsLeftDrawerCollapsed(false);
    setIsCanvasLocked(false);
    setActiveVersionTag('v1.0');
    setMessages((prev) => [
      ...prev,
      {
        id: `msg_branch_${Date.now()}`,
        sender: 'assistant',
        text: `🔀 Branched working copy **${branchedTitle}** into a new tab at baseline **v1.0** with full AI context preserved.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [studioTabs.length, ast.metadata.projectTitle, selectedIntentChip, selectedBlueprintId, selectedDomain]);

  const handleSelectBlueprintById = useCallback((templateId: string) => {
    const norm = templateId.padStart(2, '0');
    const bp = CANONICAL_TEMPLATES.find(t => t.id === norm || t.id === templateId) || CANONICAL_TEMPLATES[0];
    handleSelectBlueprint(bp, selectedDomain);
  }, [handleSelectBlueprint, selectedDomain]);

  const closeAllOverlayRightPanels = useCallback(() => {
    setIsShareModalOpen(false);
    setIsNewProjectModalOpen(false);
    setIsSaveModalOpen(false);
    setIsMajorVersionModalOpen(false);
    setIsBrainModalOpen(false);
    setIsAudioModalOpen(false);
    setIsExportDropdownOpen(false);
    setIsVersionDropdownOpen(false);
  }, []);

  const handleOpenShare = useCallback((type: 'project' | 'doc' | 'node' | 'version', id: string, title: string) => {
    closeAllOverlayRightPanels();
    setSelectedComponent(null);
    setShareTargetType(type);
    setShareTargetId(id);
    setShareTargetTitle(title);
    setIsShareModalOpen(true);
  }, [closeAllOverlayRightPanels]);

  const handleToggleRightCompanionPanel = useCallback(
    (panel: 'share' | 'new' | 'save' | 'major' | 'brain' | 'audio' | 'governance') => {
      setIsExportDropdownOpen(false);
      setIsVersionDropdownOpen(false);
      if (panel === 'governance') {
        setIsLaunchpadMode(false);
        setIsRightGovernanceOpen((prev) => !prev);
        return;
      }
      setSelectedComponent(null);
      if (panel === 'share') {
        const next = !isShareModalOpen;
        closeAllOverlayRightPanels();
        if (next) {
          if (activeView === 'specs') {
            const doc = generateAll10LivingSpecs(ast, xml).find((d) => d.id === activeDocId);
            setShareTargetType('doc');
            setShareTargetId(activeDocId);
            setShareTargetTitle(doc ? `${doc.id}: ${doc.title}` : activeDocId);
          } else {
            setShareTargetType('project');
            setShareTargetId(sessionId);
            setShareTargetTitle(ast.metadata.projectTitle);
          }
          setIsShareModalOpen(true);
        }
      } else if (panel === 'new') {
        const next = !isNewProjectModalOpen;
        closeAllOverlayRightPanels();
        setIsNewProjectModalOpen(next);
      } else if (panel === 'save') {
        const next = !isSaveModalOpen;
        closeAllOverlayRightPanels();
        setIsSaveModalOpen(next);
      } else if (panel === 'major') {
        const next = !isMajorVersionModalOpen;
        closeAllOverlayRightPanels();
        setIsMajorVersionModalOpen(next);
      } else if (panel === 'brain') {
        const next = !isBrainModalOpen;
        closeAllOverlayRightPanels();
        setIsBrainModalOpen(next);
      } else if (panel === 'audio') {
        const next = !isAudioModalOpen;
        closeAllOverlayRightPanels();
        setIsAudioModalOpen(next);
      }
    },
    [
      isShareModalOpen,
      isNewProjectModalOpen,
      isSaveModalOpen,
      isMajorVersionModalOpen,
      isBrainModalOpen,
      isAudioModalOpen,
      closeAllOverlayRightPanels,
      activeView,
      ast,
      xml,
      activeDocId,
      sessionId,
    ]
  );

  const hasLoadedUrlBlueprintRef = useRef(false);

  // Hydrate State from URL Deep-Link parameters and localStorage on initial mount
  useEffect(() => {
    if (!searchParams) return;
    const urlId = searchParams.get('id') || searchParams.get('diagram');
    const viewParam = searchParams.get('view');
    const docParam = searchParams.get('doc');
    const nodeParam = searchParams.get('node');
    const vParam = searchParams.get('v');

    if (urlId && urlId !== 'reference_showcase') {
      // 1. Check if urlId is a Canonical Blueprint ID (e.g., bp_02, canonical_02, or 02)
      const cleanBpMatch = urlId.replace(/^(bp_|canonical_)/i, '');
      const matchedCanonical = CANONICAL_TEMPLATES.find(
        t => t.id === cleanBpMatch || t.id === cleanBpMatch.padStart(2, '0')
      );
      if (matchedCanonical && (urlId.startsWith('bp_') || urlId.startsWith('canonical_') || /^\d{1,2}$/.test(urlId))) {
        handleSelectBlueprint(matchedCanonical, searchParams.get('domain') || 'enterprise');
        return;
      }

      setSessionId(urlId);
      setIsEditorMode(true);
      let loadedFromLocal = false;
      try {
        const saved = localStorage.getItem(`promptcanvas_studio_${urlId}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          const resolvedTitle = parsed.projectTitle || parsed.name || parsed.ast?.metadata?.projectTitle || searchParams.get('project') || '';
          const projTitle = resolvedTitle.toLowerCase();
          let restoredXml: string = parsed.xml || '';

          // Extract Target Use Case from saved messages if present (e.g., "*Target Use Case:* AWS Cloud Architecture on Bedrock and Sagemaker...")
          const savedMsgText = Array.isArray(parsed.messages)
            ? parsed.messages.map((m: any) => m?.text || '').join('\n')
            : '';
          const targetUseCaseMatch = savedMsgText.match(/\*Target Use Case:\*\s*([^\n]+)/i);
          const awsUserMsgMatch = savedMsgText.match(/create\s+an?\s+aws\s+[^\n]+/i);
          const isAwsProjectWithGcpXml =
            (projTitle.includes('aws') || Boolean(awsUserMsgMatch)) &&
            (restoredXml.includes('id="z1_bg"') ||
              restoredXml.includes('id="z1"') ||
              restoredXml.includes('id="spatial_gcp_reference_arch"'));
          const extractedUseCasePrompt = targetUseCaseMatch
            ? targetUseCaseMatch[1].trim()
            : isAwsProjectWithGcpXml
            ? awsUserMsgMatch?.[0]?.trim() || 'AWS Cloud AI Architecture on Amazon Bedrock, SageMaker, Redshift & Claude'
            : '';

          if (extractedUseCasePrompt && (restoredXml.includes('id="z1_bg"') || restoredXml.includes('id="z1"') || restoredXml.includes('id="spatial_gcp_reference_arch"') || !restoredXml.includes('Generative Prompt:') || !restoredXml.includes('AWS CLOUD ARCHITECTURE'))) {
            const displayTitle = 'AWS Cloud AI Architecture — Amazon Bedrock, SageMaker, OpenSearch & Redshift';
            restoredXml = synthesizePromptDrivenDiagramXml(
              extractedUseCasePrompt,
              displayTitle,
              parsed.ast?.metadata?.domain || 'Enterprise Cloud'
            );
            try {
              localStorage.setItem(
                `promptcanvas_studio_${urlId}`,
                JSON.stringify({
                  ...parsed,
                  projectTitle: displayTitle,
                  xml: restoredXml,
                  selectedBlueprintId: 'custom'
                })
              );
            } catch {
              // ignore storage quota
            }
          } else if (
            (projTitle.includes('google multiagent') || urlId.includes('GCP-MULTIAGENT-01')) &&
            (!restoredXml.includes('google_multiagent_system_architecture') ||
              restoredXml.includes('serverless_eda_architecture') ||
              restoredXml.includes('id="z1_bg"'))
          ) {
            restoredXml = generateGoogleMultiagentArchitectureXml();
          }

          if (parsed.ast) {
            setAst(parsed.ast);
          } else if (resolvedTitle) {
            setAst((prev) => ({
              ...prev,
              metadata: {
                ...prev.metadata,
                projectTitle: resolvedTitle,
                domain: parsed.domain || prev.metadata.domain
              }
            }));
          }
          if (restoredXml) {
            setXml(restoredXml);
            const inferredBp =
              extractedUseCasePrompt
                ? 'custom'
                : parsed.selectedBlueprintId && parsed.selectedBlueprintId !== '00'
                ? parsed.selectedBlueprintId
                : restoredXml.includes('id="z1_bg"')
                ? 'gcp_enterprise_6zone'
                : 'custom';
            setSelectedBlueprintId(inferredBp);
            loadedFromLocal = true;
          }
          if (Array.isArray(parsed.versions)) {
            setVersions(
              parsed.versions.map((v: any) => ({
                ...v,
                author: v.author || v.persona || v.sourceLabel || 'Lead Cloud Architect',
                actionSummary: v.actionSummary || v.diffSummary || v.prompt || 'Snapshot',
                canvasDiff: v.canvasDiff || v.diffSummary || '',
                specDiff: v.specDiff || v.aiReasoning || v.prompt || ''
              }))
            );
          }
          if (parsed.messages) setMessages(parsed.messages);
          if (parsed.activeVersionTag) setActiveVersionTag(parsed.activeVersionTag);
        }

      } catch {
        // storage fallback
      }

      // 2. Always fetch from /api/diagrams/:id so Library & Audit deep links load the latest DB diagram XML AND restore its Generative Prompt
      fetch(`/api/diagrams/${encodeURIComponent(urlId)}`)
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (!data) return;
          const fetchedXml = data.xml_content || data.versions?.[0]?.xml_content || '';
          const fetchedName = data.name || `Architecture ${urlId}`;
          const fetchedPrompt = data.prompt || data.versions?.[0]?.prompt || data.latest_prompt || '';
          if (fetchedXml && fetchedXml.includes('<mxCell')) {
            setXml(fetchedXml);
            setSelectedBlueprintId('custom');
            setAst(prev => ({
              ...prev,
              metadata: {
                ...prev.metadata,
                projectTitle: fetchedName,
                version: 'v1.0',
                lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            }));
          }
          if (fetchedPrompt) {
            setPromptInput(fetchedPrompt);
            setMessages([
              {
                id: `msg_restored_user_${Date.now()}`,
                sender: 'user',
                text: fetchedPrompt,
                timestamp: 'Original Prompt'
              },
              {
                id: `msg_restored_ai_${Date.now() + 1}`,
                sender: 'assistant',
                text: `✅ Loaded **${fetchedName}** from Library.\n\n**Generative Prompt:** "${fetchedPrompt}"\n\nAll tiers, components, and connectors on the canvas are grounded directly in this prompt. You can continue evolving this topology below.`,
                timestamp: 'Verified'
              }
            ]);
          }
        })
        .catch(() => {});
    }

    if (viewParam === 'specs' || viewParam === 'diagram') {
      setActiveView(viewParam);
    }
    if (docParam) {
      setActiveDocId(docParam);
      setActiveView('specs');
    }
    if (nodeParam) {
      const paramLower = nodeParam.toLowerCase();
      const matched = ast.components.find(
        c => c.id.toLowerCase() === paramLower ||
             c.name.toLowerCase().includes(paramLower) ||
             c.service.toLowerCase().includes(paramLower) ||
             paramLower.includes(c.id.toLowerCase())
      );
      if (matched) {
        setSelectedComponent(matched);
        setActiveView('diagram');
      }
    }
    const blueprintParam = searchParams.get('blueprint') || searchParams.get('templateId');
    const domainParam = searchParams.get('domain') || 'enterprise';
    const promptParam = searchParams.get('prompt');
    const perspectiveParam = searchParams.get('perspective') as any;
    const levelParam = searchParams.get('level') as any;
    const directionParam = searchParams.get('direction') as any;
    const autoGenerateParam = searchParams.get('autoGenerate');
    if ((blueprintParam || promptParam) && !hasLoadedUrlBlueprintRef.current) {
      const bp =
        blueprintParam &&
        blueprintParam !== 'custom' &&
        blueprintParam !== 'process_flow' &&
        blueprintParam !== 'stratum_l4'
          ? CANONICAL_TEMPLATES.find(t => t.id === blueprintParam || t.id === blueprintParam.padStart(2, '0'))
          : undefined;

      if (
        promptParam &&
        promptParam.trim().length > 0 &&
        (autoGenerateParam === '1' ||
          blueprintParam === 'custom' ||
          blueprintParam === 'process_flow' ||
          blueprintParam === 'stratum_l4')
      ) {
        hasLoadedUrlBlueprintRef.current = true;
        const cleanPrompt = promptParam.trim();
        const domainPreset = DOMAIN_PRESETS.find(d => d.id === domainParam) || DOMAIN_PRESETS[0];

        // Check if Dashboard stored a pre-rendered XML + Gemini Architect Decision in sessionStorage
        let pendingLaunch: any = null;
        try {
          const rawPending = sessionStorage.getItem('promptcanvas_pending_studio_launch');
          if (rawPending) {
            const parsed = JSON.parse(rawPending);
            if (parsed && parsed.prompt === cleanPrompt) {
              pendingLaunch = parsed;
            }
          }
        } catch {
          // ignore
        }

        const effPerspective = perspectiveParam || pendingLaunch?.perspective || 'Logical';
        const effLevel = levelParam || pendingLaunch?.level || 'L3';
        const effDirection = directionParam || pendingLaunch?.direction || 'LR';
        if (effLevel && ['L1', 'L2', 'L3', 'L4'].includes(effLevel)) {
          setSelectedAbstractionLevel(effLevel);
        }
        if (effDirection && ['LR', 'TD'].includes(effDirection)) {
          setSelectedFlowDirection(effDirection);
        }

        const rawTitle = cleanPrompt
          .replace(/^(please\s+)?(design|architect|build|create|deploy|synthesize|generate|draw|flowchart\s+for|infographic\s+for)\s+(a\s+|an\s+|the\s+)?(full\s+|complete\s+|new\s+)?/i, '')
          .replace(/\s+(architecture|diagram|flowchart|blueprint|topology)\.?$/i, '')
          .replace(/\.$/, '')
          .trim();
        const derivedTitle = rawTitle.length > 72 ? rawTitle.slice(0, 72).replace(/\s+\S*$/, '') : rawTitle;
        const projectTitle = bp
          ? `#${bp.id} [${effPerspective} · ${effLevel}] • ${derivedTitle || bp.name}`
          : blueprintParam === 'process_flow'
          ? `Process Flowchart [${effLevel} · ${effDirection}] • ${derivedTitle}`
          : blueprintParam === 'stratum_l4'
          ? `L4 Technical 4-Stratum • ${derivedTitle}`
          : derivedTitle
          ? `${derivedTitle} (${effPerspective} · ${effLevel})`
          : 'Custom Synthesized Architecture';

        const isInfographicBp = bp && INFOGRAPHIC_BLUEPRINTS_LIST.some(b => b.id === bp.id);
        const isFlowchartPrompt =
          blueprintParam === 'process_flow' ||
          effPerspective === 'Process' ||
          /\bflowchart\b/i.test(cleanPrompt) ||
          (bp && Number(bp.id) >= 67 && Number(bp.id) <= 74);

        let synthesizedXml = '';
        if (pendingLaunch?.preRenderedXml && pendingLaunch.blueprintId === blueprintParam) {
          synthesizedXml = pendingLaunch.preRenderedXml;
          if (blueprintParam === 'process_flow' || effPerspective === 'Process') {
            setSelectedDiagramMode('flowchart');
          } else if (isInfographicBp && bp) {
            setSelectedDiagramMode('infographic');
            setSelectedInfographicBlueprintId(bp.id);
          } else {
            setSelectedDiagramMode('blueprint');
          }
        } else if (isInfographicBp && bp) {
          setSelectedDiagramMode('infographic');
          setSelectedInfographicBlueprintId(bp.id);
          synthesizedXml = generateInfographicBlueprintXmlById(bp.id, cleanPrompt, undefined, effLevel);
        } else if (isFlowchartPrompt && (!bp || blueprintParam === 'process_flow')) {
          setSelectedDiagramMode('flowchart');
          synthesizedXml = synthesizePromptDrivenDiagramXml(cleanPrompt, projectTitle, domainPreset.name, {
            blueprintId: 'process_flow',
            perspective: 'Process',
            level: effLevel,
            direction: effDirection,
            geminiDecision: pendingLaunch?.geminiDecision,
          });
        } else {
          setSelectedDiagramMode('blueprint');
          synthesizedXml = synthesizePromptDrivenDiagramXml(cleanPrompt, projectTitle, domainPreset.name, {
            noTemplate: blueprintParam === 'custom',
            blueprintId: blueprintParam || '40',
            perspective: effPerspective,
            level: effLevel,
            direction: effDirection,
            geminiDecision: pendingLaunch?.geminiDecision,
          });
        }

        setSelectedBlueprintId(bp ? bp.id : 'custom');
        setSelectedDomain(domainParam);
        setXml(synthesizedXml);
        setIsEditorMode(true);
        setIsLaunchpadMode(false);
        setIsLeftDrawerCollapsed(false);
        setIsNewDiagramDraft(false);
        setActiveVersionTag('v1.0');
        setPromptInput('');

        const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedAst: ArchitectureAst = {
          ...ast,
          metadata: {
            ...ast.metadata,
            projectTitle,
            projectId: bp ? `bp-${bp.id}-custom` : `custom-${Date.now()}`,
            version: 'v1.0',
            domain: domainPreset.name,
            lastSyncTimestamp: nowTime
          }
        };
        setAst(updatedAst);

        setStudioTabs(prev =>
          prev.map(t =>
            t.id === activeTabId
              ? {
                  ...t,
                  title: projectTitle.slice(0, 24),
                  mode: 'canvas',
                  blueprintId: bp ? bp.id : 'custom',
                  domain: domainParam,
                  versionTag: 'v1.0'
                }
              : t
          )
        );

        setVersions([
          {
            id: `v_home_${Date.now()}`,
            versionTag: 'v1.0',
            timestamp: nowTime,
            author: 'Gemini Architect Engine',
            actionSummary: `[${effPerspective} · ${effLevel}] ${
              bp
                ? `Tailored Template #${bp.id} (${bp.name})`
                : blueprintParam === 'process_flow'
                ? `Synthesized Process Flowchart (${effDirection})`
                : blueprintParam === 'stratum_l4'
                ? 'Synthesized L4 Technical 4-Stratum Stack'
                : 'Synthesized Custom 4-Tier AST'
            } for: "${cleanPrompt}"`,
            ast: updatedAst,
            xml: synthesizedXml
          }
        ]);

        const gemDec = pendingLaunch?.geminiDecision;
        const modLines = Array.isArray(gemDec?.plannedModificationsSummary)
          ? gemDec.plannedModificationsSummary.map((m: string) => `- ${m}`).join('\n')
          : `- Customized subsystem nodes and headers for "${cleanPrompt}"`;

        setMessages([
          {
            id: `msg_home_user_${Date.now()}`,
            sender: 'user',
            text: cleanPrompt,
            timestamp: nowTime
          },
          {
            id: `msg_home_ai_${Date.now() + 1}`,
            sender: 'assistant',
            text: `✨ **Synthesized v1.0 Architecture (${effPerspective} Perspective • ${effLevel} Detail Level)**\n\n- **Selected Blueprint**: ${
              bp
                ? `#${bp.id} — ${bp.name}`
                : blueprintParam === 'process_flow'
                ? 'Custom Process Flowchart (6 Steps + 2 Diamond Decision Gates)'
                : blueprintParam === 'stratum_l4'
                ? 'L4 Technical 4-Stratum Deep Cross-Section'
                : 'Zero-Template Custom 4-Tier AST'
            }\n- **Gemini Perspective Reasoning**: ${
              gemDec?.perspectiveReasoning || `Selected ${effPerspective} (${effLevel}) view.`
            }\n\n**Planned Modifications Applied:**\n${modLines}`,
            timestamp: nowTime,
            actionSummary: {
              versionTag: 'v1.0',
              canvasDiff: `Rendered ${effPerspective} (${effLevel}) diagram tailored to prompt requirements.`,
              specDiff: `Synchronized DOC-01 through DOC-16 for ${projectTitle}.`
            }
          }
        ]);
      } else if (bp) {
        hasLoadedUrlBlueprintRef.current = true;
        const resolvedBp =
          perspectiveParam === 'Whiteboard' && bp.id === '00'
            ? CANONICAL_TEMPLATES.find((t) => t.id === '76') || bp
            : perspectiveParam === 'Paper' && bp.id === '00'
            ? CANONICAL_TEMPLATES.find((t) => t.id === '77') || bp
            : bp;
        handleSelectBlueprint(resolvedBp, domainParam);
        try {
          const rawPending = sessionStorage.getItem('promptcanvas_pending_studio_launch');
          if (rawPending) {
            const parsed = JSON.parse(rawPending);
            if (
              parsed?.preRenderedXml &&
              (parsed.blueprintId === resolvedBp.id || parsed.blueprintId === bp.id)
            ) {
              setXml(parsed.preRenderedXml);
            }
          }
        } catch {}
      }
    }

    const archParam = searchParams.get('arch');
    if (archParam && !hasLoadedUrlBlueprintRef.current) {
      const gcpArch = getGcpArchitectureById(archParam);
      if (gcpArch) {
        hasLoadedUrlBlueprintRef.current = true;
        setXml(gcpArch.generateXml());
        setSelectedBlueprintId('custom');
        setAst(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            projectTitle: gcpArch.title,
            version: 'v1.0',
            lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        }));
      }
    }

    if (vParam) {
      setActiveVersionTag(vParam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Synchronize browser URL & LocalStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isEditorMode) {
      const params = new URLSearchParams();
      if (selectedBlueprintId && selectedBlueprintId !== '00') params.set('blueprint', selectedBlueprintId);
      if (activeView !== 'diagram') params.set('view', activeView);
      if (activeView === 'specs' && activeDocId) params.set('doc', activeDocId);
      const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
      return;
    }

    const params = new URLSearchParams();
    params.set('id', sessionId);
    if (ast.metadata.projectTitle) params.set('project', ast.metadata.projectTitle);
    params.set('v', activeVersionTag);
    params.set('view', activeView);
    if (activeView === 'specs' && activeDocId) {
      params.set('doc', activeDocId);
    } else if (activeView === 'diagram' && selectedComponent) {
      params.set('node', selectedComponent.id);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

    try {
      localStorage.setItem(`promptcanvas_studio_${sessionId}`, JSON.stringify({
        id: sessionId,
        projectTitle: ast.metadata.projectTitle,
        selectedBlueprintId,
        activeVersionTag,
        activeView,
        activeDocId,
        ast,
        xml,
        versions,
        messages,
        lastSaved: new Date().toISOString()
      }));
    } catch {
      // storage safeguard
    }
  }, [isEditorMode, sessionId, selectedBlueprintId, activeView, activeDocId, selectedComponent, activeVersionTag, ast, xml, versions, messages]);

  // Living Specs derived from AST + Active Canvas XML
  const livingSpecs = useMemo(() => generateAll10LivingSpecs(ast, xml), [ast, xml]);
  const specGrounding = useMemo(() => summarizeSpecGrounding(ast, xml), [ast, xml]);

  // Handle Co-Pilot Prompt Execution with Dynamic Micro-Versioning (v1.0 -> v1.1 -> v1.2)
  const handleExecutePrompt = useCallback((promptText: string, explicitPersona?: string) => {
    if (!promptText.trim()) return;

    if (!isEditorMode) {
      setIsEditorMode(true);
    }
    // v2.2 Single-Surface Transition: Submitting any prompt transitions Launchpad Mode -> Active Canvas Mode
    // and smoothly expands the Left AI Drawer to 320px with session history initialized.
    setIsLaunchpadMode(false);
    setIsLeftDrawerCollapsed(false);
    setLaunchpadPromptInput('');
    setSpotlightInput('');
    setIsSpotlightOpen(false);
    setStudioTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? {
              ...t,
              mode: 'canvas',
              title: t.title.includes('New Diagram') ? promptText.trim().slice(0, 22) : t.title
            }
          : t
      )
    );

    let detectedPersona = explicitPersona || 'User';
    if (!explicitPersona) {
      if (promptText.includes('[Product Manager]') || promptText.toLowerCase().includes('product manager')) {
        detectedPersona = 'Product Manager';
      } else if (promptText.includes('[Lead Architect]') || promptText.toLowerCase().includes('lead architect') || promptText.toLowerCase().includes('spanner') || promptText.toLowerCase().includes('multi-region')) {
        detectedPersona = 'Lead Cloud Architect';
      } else if (promptText.includes('[CISO') || promptText.toLowerCase().includes('security') || promptText.toLowerCase().includes('cmek') || promptText.toLowerCase().includes('waf')) {
        detectedPersona = 'CISO / Security Architect';
      } else if (promptText.includes('[FinOps') || promptText.toLowerCase().includes('finops') || promptText.toLowerCase().includes('cost') || promptText.toLowerCase().includes('sre')) {
        detectedPersona = 'FinOps & SRE Lead';
      }
    }

    const cleanPrompt = promptText.replace(/^\[.*?\]\s*/, '');
    const promptLower = cleanPrompt.toLowerCase();

    const userMsg: StudioChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setPromptInput('');

    const isOpenKnowledgePrompt =
      promptLower.includes('open knowledge format infographic') ||
      (promptLower.includes('open knowledge') && promptLower.includes('infographic'));

    if (isOpenKnowledgePrompt) {
      const okXml = generateOpenKnowledgeInfographicXml(selectedDomain, 'light');
      setXml(okXml);
      setSelectedBlueprintId('custom');
      setAst(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          projectTitle: 'Open Knowledge Format Infographic (Formats + Schema + Validation + Graph)'
        }
      }));
      const aiMsg: StudioChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: `Generated **Open Knowledge Format Infographic** (*Formats + Schema + Validation + Knowledge Graph*) using the 4-Tier Architectural Infographic engine.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      return;
    }

    const isCharlieHillsPrompt =
      (promptLower.includes('harness') && promptLower.includes('loop') && promptLower.includes('context')) ||
      promptLower.includes('context + harness') ||
      promptLower.includes('charlie hills');

    if (isCharlieHillsPrompt) {
      const bp52 = CANONICAL_TEMPLATES.find(t => t.id === '52');
      if (bp52) {
        handleSelectBlueprint(bp52, selectedDomain);
        return;
      }
    }

    if (promptLower.includes('6-dimension research infographic')) {
      setIsHealing(true);
      fetch('/api/research-infographic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: cleanPrompt })
      })
        .then(res => res.json())
        .then(data => {
          const finalXml = data?.xml || generateDynamicTieredInfographicXml(cleanPrompt);
          setXml(finalXml);
          setIsNewDiagramDraft(false);
          setActiveVersionTag('v1.0');
          setSelectedBlueprintId('custom');
          setAst(prev => ({
            ...prev,
            metadata: {
              ...prev.metadata,
              projectTitle: `${cleanPrompt} — 6-Dimension Researched Infographic`
            }
          }));
          const aiMsg: StudioChatMessage = {
            id: `msg_${Date.now() + 1}`,
            sender: 'assistant',
            text: data?.researchBriefMarkdown || `Synthesized bespoke **4-Tier Architectural Infographic** for **${cleanPrompt}**.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMsg]);
        })
        .catch(() => {
          const dynXml = generateDynamicTieredInfographicXml(cleanPrompt);
          setXml(dynXml);
          setIsNewDiagramDraft(false);
          setActiveVersionTag('v1.0');
          setSelectedBlueprintId('custom');
        })
        .finally(() => {
          setIsHealing(false);
        });
      return;
    }

    // v2.2 Non-Mutating Conversational & Analytical Guardrail (Section 5.2)
    // Prompts seeking analysis or explanations (e.g. "What is the disaster recovery capability of this design?", "What is the SPOF in this architecture?")
    // MUST generate inline text responses in the Chatbot WITHOUT mutating the canvas or bumping the diagram version!
    const isInterrogativeAnalysis =
      (/^(what|why|how|where|who|when|which|explain|analyze|audit|describe\s+the|is\s+there|does\s+this|are\s+there)\b/i.test(cleanPrompt.trim()) ||
        /\?\s*$/.test(cleanPrompt.trim())) &&
      !/^(add|insert|create|build|design|deploy|connect|remove|delete|upgrade|replace)\b/i.test(cleanPrompt.trim());

    const intentResult = classifyChatIntent(cleanPrompt);

    const isArchitectureSynthesisPrompt =
      !isInterrogativeAnalysis &&
      (cleanPrompt.trim().length >= 24 ||
        /^(design|architect|build|create|deploy|synthesize|aws|gcp|google|azure|cloud|enterprise|sovereign|multi-region|zero-trust|real-time|serverless|hybrid|a\s+tiered|tiered|\[p[1-7]\]|\[vision\])/i.test(cleanPrompt.trim()) ||
        /\b(architecture|stratum|strata|cross-section|diagram|stack|tier|pods|cluster|gateway|mesh|bedrock|sagemaker|redshift|claude|vertex|spanner|bigquery|gke|eks|kubernetes|lakehouse|streaming|kafka|pub\/sub|secops|chronicle|fhir|hl7|sap|finops|landing\s+zone|rag|agentic)\b/i.test(cleanPrompt));

    if (isInterrogativeAnalysis || (intentResult.intent !== 'mutation' && !isArchitectureSynthesisPrompt)) {
      let replyText = '';
      if (intentResult.intent === 'greeting') {
        replyText = `👋 Hello! I'm ArcAssist, your Studio Enterprise Architecture Co-Pilot. I can help evolve your architecture diagram, reconcile DOC-01 through DOC-16 living specifications, and synthesize Google Cloud topologies across all 6 tiers.\n\nTry asking me to:\n• "Add Redis cache layer between API and database"\n• "Enforce Multi-Region HA with Spanner and Cloud Armor"\n• "Add Cloud CDN and Kafka Event Mesh"`;
      } else if (intentResult.intent === 'identity') {
        replyText = `🤖 I am ArcAssist, the AI Co-Pilot in PromptCanvas Studio. I specialize in bidirectional synchronization between visual Draw.io diagrams and living engineering specifications (PRDs, ADRs, Threat Models, DDL). I support 4 architectural personas: Product Manager, Lead Cloud Architect, CISO / Security Architect, and FinOps & SRE Lead.`;
      } else if (intentResult.intent === 'conversational') {
        replyText = `You're welcome! Let me know when you'd like to evolve this architecture or run an audit.`;
      } else if (/\b(disaster recovery|dr|rpo|rto|spof|single point|failover|resilien\w*)\b/i.test(cleanPrompt)) {
        replyText = formatResilienceReply(ast, activeVersionTag);
      } else {
        const securityComps = ast.components.filter((c) => c.tier === 'security').map((c) => c.name);
        const securityLine = securityComps.length > 0
          ? `Security-tier components on canvas: ${securityComps.slice(0, 4).join(', ')}${securityComps.length > 4 ? ` (+${securityComps.length - 4})` : ''}.`
          : 'No security-tier component (WAF / KMS / IAM) is present on the canvas yet — ask me to "Add Cloud Armor WAF" or "Enforce CMEK".';
        const slaLine = specGrounding.compositeAvailabilityPct !== null
          ? `Declared SLA target **${ast.metadata.slaTarget}**; serial composite of ${specGrounding.compositeSampleSize} in-path component SLAs ≈ **${specGrounding.compositeAvailabilityPct.toFixed(3)}%**${specGrounding.compositeAvailabilityPct < (parseFloat(ast.metadata.slaTarget) || 0) ? ' (⚠ below declared target)' : ''}.`
          : `Declared SLA target **${ast.metadata.slaTarget}** (no per-component SLAs available to compute a composite).`;
        replyText = `📊 **Inline Architectural Analysis (${ast.metadata.projectTitle} • ${activeVersionTag} Unchanged)**:\n\n• ${ast.components.length} components / ${ast.connections.length} connections across ${Array.from(new Set(ast.components.map((c) => c.region).filter(Boolean))).length || 0} region(s); grounding source: ${specGrounding.source}.\n• ${slaLine}\n• ${securityLine}\n\nTo mutate the diagram or bump micro-versions, provide an instruction such as *"Add Redis cache layer"*, *"Connect Cloud Armor to Load Balancer"*, or *"Upgrade Spanner to multi-region"*.`;
      }

      const aiMsg: StudioChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      return;
    }

    // Version Tag: v1.0 for brand-new diagram drafts, or micro-version bump (v1.0 -> v1.1) for active canvas iterations
    const newVersionTag = isNewDiagramDraft ? 'v1.0' : getNextMicroVersion(activeVersionTag);
    const updated: ArchitectureAst = {
      ...ast,
      metadata: { ...ast.metadata },
      components: [...ast.components],
      connections: [...ast.connections],
    };

    const prevCompCount = updated.components.length;
    let canvasDiff = 'Updated component topology and connector routing in Draw.io XML.';
    let specDiff = 'Reconciled DOC-01 through DOC-16 with updated parameters.';
    const lower = cleanPrompt.toLowerCase();

    const isExplicitFlowchartPrompt = /\bflowchart\b/i.test(promptText);
    const isExplicitInfographicPrompt = /\binfographic\b/i.test(promptText);
    const isArchitectureRequest = /\b(architecture|gcp|google\s+cloud|gemini|vertex|multi-agent|adk|a2a|mcp|spanner|gke|cloud\s+run|technical|topology|blueprint)\b/i.test(promptText);
    const effectiveDiagramMode = isExplicitFlowchartPrompt
      ? 'flowchart'
      : isExplicitInfographicPrompt
      ? 'infographic'
      : isArchitectureRequest && selectedDiagramMode === 'flowchart'
      ? 'blueprint'
      : selectedDiagramMode;
    if (effectiveDiagramMode !== selectedDiagramMode) {
      setSelectedDiagramMode(effectiveDiagramMode);
    }

    const isInitialProjectTurn = versions.length <= 1 && (activeVersionTag === 'v1.0' || activeVersionTag === 'v0.0');
    const isIncrementalVerb =
      /^(?:please\s+)?(?:add|insert|include|attach|connect|group|upgrade|configure|scale|secure|enable|remove|delete|update)\b/i.test(
        cleanPrompt.trim()
      ) ||
      Boolean(explicitPersona) ||
      lower.includes('4 more') ||
      lower.includes('4 component');

    const isAwsPrompt =
      /\b(aws|amazon\s+web\s+services|amazon\s+bedrock|bedrock|sagemaker|redshift|eks|dynamodb|aurora|cloudfront)\b/i.test(
        cleanPrompt
      );
    const isAzurePrompt = /\b(azure|microsoft\s+azure|cosmos\s*db|aks)\b/i.test(cleanPrompt);
    const isCurrentCanvasGcp =
      xml.includes('id="spatial_gcp_reference_arch"') ||
      xml.includes('id="z1_bg"') ||
      xml.includes('id="z1"') ||
      updated.components.some((c) => /Cloud Armor|Spanner|Vertex AI|BigQuery/i.test(c.service));

    const isExplicitFullResetPrompt =
      !isIncrementalVerb &&
      (/^(reset\s+canvas|start\s+over|\[p[1-7]\]|\[vision\]|(?:please\s+)?(?:design|architect|build|create|synthesize|generate|draw)\b|flowchart\s+for\b|infographic\s+for\b)/i.test(
        promptText.trim()
      ) ||
        ((isAwsPrompt || isAzurePrompt) && isCurrentCanvasGcp));

    const isBespokeInitialDesignPrompt =
      !isIncrementalVerb && (isNewDiagramDraft || (isInitialProjectTurn && cleanPrompt.length >= 20));

    const isGenerativeDesignPrompt = isExplicitFullResetPrompt || isBespokeInitialDesignPrompt;

    const isAwsContext =
      isAwsPrompt ||
      /\b(aws|amazon|bedrock|sagemaker)\b/i.test(updated.metadata.projectTitle) ||
      updated.components.some((c) => /AWS|Amazon|Bedrock|SageMaker|Aurora|Redshift/i.test(c.service));

    const synthesizeComponentFromPrompt = (rawPrompt: string, turnNumber: number): AstComponent => {
      const cleanedSubject = rawPrompt
        .replace(/^(please\s+)?(design|architect|build|create|deploy|synthesize|add|insert|include|attach|integrate|provision|enable|upgrade|configure|scale|secure)\s+(a\s+|an\s+|the\s+|new\s+)?/i, '')
        .replace(/\.$/, '')
        .trim();
      const titleCaseSubject = (cleanedSubject || rawPrompt)
        .split(/\s+/)
        .slice(0, 5)
        .map(w =>
          w.length <= 4 && /^(waf|lb|cdn|dns|hsm|kms|vpc|api|sql|gke|iam|dlp|dr|rpo|rto|etl|rag|llm|sre|aks|eks|aws|s3|alb|nlb)$/i.test(w)
            ? w.toUpperCase()
            : w.charAt(0).toUpperCase() + w.slice(1)
        )
        .join(' ');

      const l = rawPrompt.toLowerCase();
      const isWaf = l.includes('waf') || l.includes('firewall') || l.includes('armor') || l.includes('shield') || l.includes('ddos');
      const isLb = l.includes('load balancer') || l.includes('load-balancer') || /\b(lb|alb|nlb)\b/.test(l) || l.includes('apigee') || l.includes('gateway');
      const isCache = l.includes('redis') || l.includes('cache') || l.includes('memorystore') || l.includes('elasticache');
      const isQueue = l.includes('kafka') || l.includes('pubsub') || l.includes('pub/sub') || l.includes('kinesis') || l.includes('eventbridge') || l.includes('sqs') || l.includes('queue') || l.includes('stream') || l.includes('dataflow');
      const isDb = l.includes('database') || l.includes('postgres') || l.includes('alloydb') || l.includes('aurora') || l.includes('dynamodb') || l.includes('redshift') || l.includes('sql') || l.includes('spanner') || l.includes('bigquery') || l.includes('lakehouse');
      const isAi = l.includes('vertex') || l.includes('gemini') || l.includes('bedrock') || l.includes('sagemaker') || l.includes('claude') || l.includes('agent') || l.includes('rag') || l.includes('vector') || l.includes('ai');
      const isSec = l.includes('kms') || l.includes('hsm') || l.includes('cmek') || l.includes('guardduty') || l.includes('vpc') || l.includes('iam') || l.includes('security') || l.includes('zero-trust');

      const inferredService = isAwsContext
        ? isWaf
          ? 'AWS WAF & Shield Advanced'
          : isLb
          ? 'Amazon API Gateway & Application Load Balancer'
          : isCache
          ? 'Amazon ElastiCache for Redis'
          : isQueue
          ? 'Amazon Kinesis Data Streams & EventBridge'
          : isDb
          ? l.includes('redshift') || l.includes('lakehouse')
            ? 'Amazon Redshift Serverless & S3 Lakehouse'
            : l.includes('dynamodb')
            ? 'Amazon DynamoDB Global Tables'
            : 'Amazon Aurora PostgreSQL (pgvector)'
          : isAi
          ? 'Amazon Bedrock & SageMaker AI Hub'
          : isSec
          ? 'AWS KMS HSM, IAM & GuardDuty'
          : 'AWS Managed Cloud Service'
        : isWaf
        ? 'Cloud Armor L7 WAF'
        : isLb
        ? l.includes('apigee')
          ? 'Apigee X API Gateway'
          : 'Global External HTTPS Load Balancer'
        : isCache
        ? 'Memorystore for Redis Cluster'
        : isQueue
        ? l.includes('dataflow')
          ? 'Cloud Dataflow Streaming Engine'
          : 'Cloud Pub/Sub Event Stream'
        : isDb
        ? l.includes('spanner')
          ? 'Cloud Spanner Multi-Region (nam3)'
          : l.includes('bigquery') || l.includes('lakehouse')
          ? 'BigQuery Serverless Lakehouse'
          : 'AlloyDB for PostgreSQL'
        : isAi
        ? 'Vertex AI & Gemini Agent Hub'
        : isSec
        ? 'Cloud KMS HSM & VPC-SC Enclave'
        : 'Google Cloud Managed Service';

      const inferredTier: AstComponent['tier'] = isWaf || isSec
        ? 'security'
        : isLb
        ? 'ingress'
        : isCache || isDb || isQueue
        ? 'data'
        : 'compute';

      return {
        id: `comp_user_${Date.now()}_${turnNumber}`,
        name: titleCaseSubject,
        service: inferredService,
        tier: inferredTier,
        region: inferredTier === 'ingress' || inferredTier === 'security' ? 'global' : isAwsContext ? 'us-east-1' : 'us-central1',
        role: `Prompt #${turnNumber} Synthesized Node`,
        description: `Provisioned via Studio Prompt #${turnNumber} ("${rawPrompt}").`,
        sla: inferServiceAndTierFromLabel(`${titleCaseSubject} ${inferredService}`).sla,
        protocols: isWaf || isLb ? ['HTTPS', 'TLS 1.3', 'HTTP/3'] : ['gRPC mTLS', 'HTTPS']
      };
    };

    if (lower.includes('4 more') || lower.includes('4 component') || (lower.includes('cdn') && (lower.includes('vault') || lower.includes('kafka') || lower.includes('doc')))) {
      const existingIds = new Set(updated.components.map((c) => c.id));
      const newComps: AstComponent[] = buildDomainExpansionPack(
        updated.metadata.projectTitle,
        updated.metadata.domain,
        updated.metadata.primaryRegion || 'us-central1'
      ).filter((c) => !existingIds.has(c.id));

      updated.components = [...updated.components, ...newComps];
      const packDomain = resolveExpansionDomain(updated.metadata.projectTitle, updated.metadata.domain);
      canvasDiff = newComps.length > 0
        ? `+ Added ${newComps.map((c) => c.name).join(', ')} (${newComps.length} new ${packDomain} node${newComps.length === 1 ? '' : 's'}).`
        : '• The expansion pack components (CDN, vault, event mesh, document extractor) are already present on this canvas — no nodes added.';
      specDiff = 'Reconciled DOC-03 (HLD), DOC-04 (LLD), and DOC-06 (Threat Model).';
    } else if (explicitPersona === 'Product Manager') {
      // Keep the project's own domain/title/SLA — the previous behaviour silently rewrote every
      // project into a healthcare "Emergency Patient Ingress & Care Mesh".
      const pmDomain = resolveExpansionDomain(updated.metadata.projectTitle, updated.metadata.domain);
      const portalByDomain: Record<string, { name: string; role: string; description: string; protocols: string[] }> = {
        healthcare: { name: 'Patient & Clinician Ingress Portal', role: 'Priority Admission & Triage Gateway', description: 'Fast-track triage ingress with FHIR R4 intake and consent capture.', protocols: ['HTTPS', 'FHIR R4', 'TLS 1.3'] },
        fintech: { name: 'Customer Onboarding & Payments Portal', role: 'Primary Customer Journey Gateway', description: 'Account onboarding, KYC hand-off and payment initiation entry point.', protocols: ['HTTPS', 'OpenID Connect', 'TLS 1.3'] },
        robotics: { name: 'Fleet Operator Console', role: 'Mission Planning & Live Telemetry Gateway', description: 'Operator-facing console for mission dispatch, geofence management and live telemetry.', protocols: ['HTTPS', 'WebSocket', 'TLS 1.3'] },
        manufacturing: { name: 'Plant Operations Portal', role: 'Shop-Floor & Planner Gateway', description: 'Planner and operator entry point for work orders, quality holds and OEE dashboards.', protocols: ['HTTPS', 'OPC-UA Bridge', 'TLS 1.3'] },
        secops: { name: 'Analyst Triage Console', role: 'SOC Analyst Case Gateway', description: 'Analyst-facing console for detections, case management and playbook approvals.', protocols: ['HTTPS', 'OpenID Connect', 'TLS 1.3'] },
        agentic: { name: 'Assistant Experience Portal', role: 'End-User Conversational Gateway', description: 'Tenant-aware chat and document upload entry point feeding the agent runtime.', protocols: ['HTTPS', 'Server-Sent Events', 'TLS 1.3'] },
        enterprise: { name: 'Primary User Ingress Portal', role: 'Primary User Journey Gateway', description: 'Authenticated entry point for the primary user journey defined in DOC-01.', protocols: ['HTTPS', 'OpenID Connect', 'TLS 1.3'] },
      };
      const portal = portalByDomain[pmDomain] || portalByDomain.enterprise;
      updated.metadata = {
        ...updated.metadata,
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const portalAdded = !updated.components.some(c => c.id === 'comp_user_portal');
      if (portalAdded) {
        updated.components = [
          ...updated.components,
          {
            id: 'comp_user_portal',
            name: portal.name,
            service: 'Cloud Run',
            tier: 'ingress',
            region: updated.metadata.primaryRegion || 'us-central1',
            role: portal.role,
            description: portal.description,
            sla: inferServiceAndTierFromLabel('Cloud Run').sla,
            protocols: portal.protocols
          }
        ];
      }
      canvasDiff = portalAdded
        ? `+ Added ${portal.name} (Cloud Run, ${pmDomain} persona journey).`
        : `• ${portal.name} already exists on this canvas — no nodes added.`;
      specDiff = 'Reconciled DOC-01 (PRD), DOC-02 (FDD), and DOC-03 (HLD).';
    } else if (explicitPersona === 'Lead Cloud Architect' || (!isGenerativeDesignPrompt && (lower.includes('spanner') || lower.includes('multi-region') || /\b(dr|rpo)\b/.test(lower)))) {
      // Spanner `nam3` = read-write us-east4 + us-central1 with a witness in us-central2 (North America only).
      // A Europe DR region requires a different config (e.g. nam-eur-asia1 read-only replicas), so we do
      // not claim a europe-west1 witness.
      const spannerNodes = updated.components.filter(c => c.service.includes('Spanner') || c.id.includes('spanner'));
      updated.metadata = {
        ...updated.metadata,
        drRegions: ['us-east4'],
        targetRpo: '< 1 Second (synchronous multi-region commit)',
        targetRto: '< 15 Seconds (automated leader failover)',
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      updated.components = updated.components.map(c => {
        if (c.service.includes('Spanner') || c.id.includes('spanner')) {
          return {
            ...c,
            role: 'Multi-Region nam3 (RW us-east4 + us-central1, witness us-central2)',
            description: 'Synchronous Paxos replication across us-east4 and us-central1 with a us-central2 witness; 99.999% multi-region SLA.',
            sla: '99.999%'
          };
        }
        return c;
      });
      canvasDiff = spannerNodes.length > 0
        ? `⚡ Upgraded ${spannerNodes.length} Cloud Spanner node${spannerNodes.length === 1 ? '' : 's'} to multi-region nam3 (RW us-east4 + us-central1, witness us-central2); DR region set to us-east4.`
        : '• No Cloud Spanner node exists on this canvas — set DR region metadata to us-east4 only. Ask me to "Add Cloud Spanner" first to apply a multi-region configuration.';
      specDiff = 'Reconciled DOC-03 (HLD), DOC-05 (Data Model), DOC-08 (Terraform IaC), and DOC-09 (BCDR Plan).';
    } else if (explicitPersona === 'CISO / Security Architect') {
      updated.metadata = {
        ...updated.metadata,
        compliance: ['PCI-DSS 4.0', 'HIPAA', 'SOC2 Type II', 'FedRAMP High', 'ISO 27001'],
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      if (!updated.components.some(c => c.id === 'comp_hsm_cmek')) {
        updated.components = [
          ...updated.components,
          {
            id: 'comp_hsm_cmek',
            name: 'Cloud KMS HSM CMEK Envelope',
            service: 'Cloud Key Management Service',
            tier: 'security',
            region: 'global',
            role: 'Hardware Security Module Key Hierarchy',
            description: 'FIPS 140-2 Level 3 hardware security module keys protecting Spanner, BigQuery, and GCS buckets.',
            sla: '99.999%',
            protocols: ['Cloud KMS API', 'gRPC mTLS']
          }
        ];
      }
      canvasDiff = '🔒 Enforced Cloud KMS HSM CMEK envelope encryption and VPC-SC perimeter controls.';
      specDiff = 'Reconciled DOC-06 (Threat Model) and DOC-15 (Compliance Pack).';
    } else if (explicitPersona === 'FinOps & SRE Lead' || (!isGenerativeDesignPrompt && (lower.includes('finops') || lower.includes('cost') || lower.includes('autoscaling') || lower.includes('sre')))) {
      const previousBudget = updated.metadata.latencyBudgetMs;
      updated.metadata = {
        ...updated.metadata,
        latencyBudgetMs: 35,
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      canvasDiff = `💰 Set the end-to-end latency budget to 35 ms (was ${previousBudget ?? 'unset'} ms) in architecture metadata — no topology nodes were added or removed. Open DOC-14 (FinOps Model) for the catalog-based cost breakdown.`;
      specDiff = 'Reconciled DOC-11 (SRE & Telemetry) and DOC-14 (FinOps Model).';
    } else if (/^connect\b/i.test(cleanPrompt)) {
      updated.metadata.lastSyncTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      canvasDiff = `🔗 Connected topology endpoints (${cleanPrompt.replace(/^connect\s+/i, '')}) via orthogonal zero-trust corridor.`;
      specDiff = `Synchronized TLS 1.3 / mTLS link protocol across DOC-04 (LLD) and DOC-06 (Threat Model).`;
    } else if (/^group\b/i.test(cleanPrompt)) {
      updated.metadata.lastSyncTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      canvasDiff = `🛡️ Grouped ingress & extension nodes into a Zero-Trust DMZ Enclave (${cleanPrompt}).`;
      specDiff = `Synchronized enclave boundary across DOC-03 (HLD) and DOC-06 (Threat Model).`;
    }

    const BASELINE_DEFAULT_IDS = new Set([
      'comp_armor',
      'comp_glb',
      'comp_gke',
      'comp_vertex',
      'comp_spanner_leader',
      'comp_bigquery',
      'comp_spanner_dr',
      'comp_gcs_backup',
      'comp_stratum_s1',
      'comp_stratum_s2',
      'comp_stratum_s3',
      'comp_stratum_s4',
      'comp_aws_waf',
      'comp_aws_apigw',
      'comp_aws_eks',
      'comp_aws_bedrock',
      'comp_aws_opensearch',
      'comp_aws_aurora',
      'comp_aws_s3_redshift',
      'comp_aws_kms',
    ]);

    const isVerticalStratumPrompt =
      isInitialProjectTurn &&
      /\b(vllm|h100|honeycomb)\b/i.test(promptText) &&
      /\b(stratum|vertical\s+cross-section|speculative\s+decoding)\b/i.test(promptText);

    if (
      !isVerticalStratumPrompt &&
      (!updated.metadata.projectTitle ||
        updated.metadata.projectTitle === 'Global Cloud Payment & Settlement Mesh' ||
        updated.metadata.projectTitle === 'Global Real-Time Payments Mesh & Settlement Engine' ||
        updated.metadata.projectTitle === 'Emergency Patient Ingress & Care Mesh' ||
        updated.metadata.projectTitle.startsWith('#00') ||
        isGenerativeDesignPrompt ||
        /^(please\s+)?(design|architect|build|create|deploy|synthesize|generate|draw|flowchart|infographic|a\s+tiered|\[p[1-7]\]|\[fork\]|\[vision\])/i.test(promptText.trim()))
    ) {
      const rawTitle = promptText
        .trim()
        .replace(/^(please\s+)?(design|architect|build|create|deploy|synthesize|generate|draw|flowchart\s+for|infographic\s+for)\s+(a\s+|an\s+|the\s+)?(full\s+|complete\s+|new\s+)?/i, '')
        .replace(/\s+(architecture|diagram|flowchart|blueprint|topology)\.?$/i, '')
        .replace(/\.$/, '')
        .trim();
      const derivedTitle = rawTitle.length > 96 ? rawTitle.slice(0, 96).replace(/\s+\S*$/, '') : rawTitle;
      if (derivedTitle.length > 3) {
        const formattedTitle = derivedTitle
          .split(/\s+/)
          .map((w) => (/^(aws|gcp|ai|ml|rag|llm|eks|gke|aks|vpc|kms|waf|api|iot|bi)$/i.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
          .join(' ');
        updated.metadata.projectTitle = `${formattedTitle} Architecture`;
      }
    }

    if (isVerticalStratumPrompt) {
      updated.metadata.projectTitle = 'High-Performance Cloud AI Stack — 4-Stratum Vertical Cross-Section';
      updated.components = [
        {
          id: 'comp_stratum_s1',
          name: 'Top Stratum: Multi-Modal Client Apps & API Mesh',
          service: 'Floating Glass Landing Pads & Telemetry HUD',
          tier: 'ingress',
          region: 'global',
          role: 'Top Stratum (Application Tier)',
          description: 'Sleek floating glass landing pads for Multi-modal Client Apps, Global API Mesh, and Isometric UI Telemetry Wireframes.',
          sla: '99.999%',
          protocols: ['HTTP/3', 'QUIC', 'WebRTC', 'TLS 1.3']
        },
        {
          id: 'comp_stratum_s2',
          name: 'Second Stratum: vLLM & Speculative Decoding Pods',
          service: 'Floating Hexagonal Pods + High-Speed Laser Bridges',
          tier: 'compute',
          region: 'us-central1',
          role: 'Second Stratum (Inference & Routing Tier)',
          description: 'Floating hexagonal pods running containerized vLLM inference and speculative decoding engines connected by 800G optical laser bridges.',
          sla: '99.999%',
          protocols: ['800G Optical Laser Bridge', 'gRPC', 'FP8 Tensor Stream']
        },
        {
          id: 'comp_stratum_s3',
          name: 'Third Stratum: Honeycomb Semantic Memory Cells',
          service: 'Redis Prefix Cache, Vector DB & Document Store',
          tier: 'data',
          region: 'us-central1',
          role: 'Third Stratum (Context & Memory Tier)',
          description: 'Suspended honeycomb storage cells glowing with semantic memory caches (Redis KV Cache, HNSW/ScaNN Vector DBs, and Document Stores).',
          sla: '99.999%',
          protocols: ['RESP3', 'GPUDirect Storage', 'gRPC']
        },
        {
          id: 'comp_stratum_s4',
          name: 'Foundation Bedrock: Liquid-Cooled H100 GPU Monolith',
          service: 'H100 SXM5 Server Racks & NVLink 4.0 Bedrock',
          tier: 'compute',
          region: 'us-central1',
          role: 'Foundation Bedrock (Compute Cluster Tier)',
          description: 'Dense subterranean monolith of liquid-cooled H100/GPU server racks anchored to heavy cloud infrastructure bedrock.',
          sla: '99.999%',
          protocols: ['NVLink 4.0 (900GB/s)', 'InfiniBand RDMA', 'PCIe Gen5']
        }
      ];
      canvasDiff = '✨ Synthesized 4-Stratum Vertical Cross-Section (12 Pods across Top Stratum, Hexagonal vLLM + Laser Bridges, Honeycomb Memory & H100 Bedrock).';
      specDiff = 'Synchronized 4-Stratum Cloud AI Stack across DOC-01 through DOC-16 in Slate Gray & Vibrant Emerald-Green aesthetic.';
    } else if (isGenerativeDesignPrompt && isAwsPrompt) {
      updated.metadata.lastSyncTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      updated.components = [
        {
          id: 'comp_aws_waf',
          name: 'AWS WAF, Shield Advanced & CloudFront',
          service: 'AWS WAF & CloudFront',
          tier: 'security',
          region: 'global',
          role: 'Global Edge Protection & Anycast CDN Ingress',
          description: 'L7 OWASP rule enforcement, DDoS mitigation, and TLS 1.3 termination at 600+ CloudFront Edge POPs.',
          sla: '99.99%',
          protocols: ['HTTPS', 'TLS 1.3', 'HTTP/3']
        },
        {
          id: 'comp_aws_apigw',
          name: 'Amazon API Gateway & Application Load Balancer',
          service: 'Amazon API Gateway & ALB',
          tier: 'ingress',
          region: 'us-east-1',
          role: 'Zero-Trust Cognito OIDC & REST/WebSocket Ingress',
          description: 'Rate-limited token-bucket ingress with AWS Cognito JWT validation and VPC PrivateLink routing.',
          sla: '99.99%',
          protocols: ['HTTPS REST', 'WSS', 'gRPC']
        },
        {
          id: 'comp_aws_eks',
          name: 'Amazon EKS & AWS Lambda Agent Orchestrator',
          service: 'Amazon EKS & AWS Lambda',
          tier: 'compute',
          region: 'us-east-1',
          role: 'Agentic Workflow Router & LangGraph Compute Mesh',
          description: 'Multi-AZ Kubernetes pods and Step Functions orchestrating multi-agent reasoning, tool calls, and RAG retrieval.',
          sla: '99.99%',
          protocols: ['gRPC mTLS', 'AWS PrivateLink']
        },
        {
          id: 'comp_aws_bedrock',
          name: 'Amazon Bedrock & SageMaker AI Hub',
          service: 'Amazon Bedrock (Claude 3.7 Sonnet) & SageMaker',
          tier: 'compute',
          region: 'us-east-1',
          role: 'Foundation Model Inference, Guardrails & Fine-Tuning',
          description: 'Managed Claude 3.7 Sonnet, Titan Embeddings v2, Bedrock Guardrails PII redaction, and SageMaker custom endpoints.',
          sla: '99.99%',
          protocols: ['Bedrock Runtime API', 'HTTPS TLS 1.3']
        },
        {
          id: 'comp_aws_opensearch',
          name: 'Amazon OpenSearch Serverless & ElastiCache Redis',
          service: 'Amazon OpenSearch Vector Engine & ElastiCache',
          tier: 'data',
          region: 'us-east-1',
          role: 'HNSW Hybrid Vector Search & Semantic KV Cache',
          description: 'Sub-10ms ANN vector similarity search paired with ElastiCache for Redis semantic prompt caching.',
          sla: '99.99%',
          protocols: ['HTTPS', 'RESP3 TLS']
        },
        {
          id: 'comp_aws_aurora',
          name: 'Amazon Aurora PostgreSQL (pgvector) & DynamoDB',
          service: 'Amazon Aurora Global DB & DynamoDB',
          tier: 'data',
          region: 'us-east-1',
          role: 'Transactional State, Session Memory & Metadata Store',
          description: 'Multi-AZ ACID relational ledger with pgvector embeddings and DynamoDB Global Tables for sub-5ms agent session state.',
          sla: '99.999%',
          protocols: ['PostgreSQL Wire TLS', 'DynamoDB HTTPS']
        },
        {
          id: 'comp_aws_s3_redshift',
          name: 'Amazon S3 Lakehouse, Kinesis & Redshift Serverless',
          service: 'Amazon S3, Kinesis Data Streams & Redshift',
          tier: 'data',
          region: 'us-east-1',
          role: 'Enterprise Corpus Lakehouse, CDC Streaming & Eval Warehouse',
          description: 'Encrypted S3 document corpus feeding Bedrock Knowledge Bases, Kinesis telemetry streams, and Redshift analytics.',
          sla: '99.999%',
          protocols: ['S3 HTTPS', 'Kinesis gRPC']
        },
        {
          id: 'comp_aws_kms',
          name: 'AWS KMS HSM, IAM Roles Anywhere & CloudWatch',
          service: 'AWS KMS, GuardDuty, CloudTrail & CloudWatch',
          tier: 'security',
          region: 'global',
          role: 'FIPS 140-3 KMS CMK Encryption, Threat Detection & Observability',
          description: 'Customer-managed KMS envelope encryption, GuardDuty AI runtime monitoring, and X-Ray distributed tracing.',
          sla: '99.999%',
          protocols: ['AWS KMS API', 'OTLP gRPC']
        }
      ];
      canvasDiff = `✨ Synthesized 7-Tier AWS Cloud AI Reference Architecture (${updated.components.length} AWS Native Nodes: Amazon Bedrock, SageMaker, OpenSearch Vector DB, Aurora pgvector, S3 & Redshift).`;
      specDiff = 'Synchronized AWS Well-Architected Cloud AI Stack across DOC-01 through DOC-16 (IAM Roles, KMS CMK, Bedrock Guardrails & Multi-AZ Resilience).';
    } else if (isGenerativeDesignPrompt) {
      updated.metadata.lastSyncTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      canvasDiff = `✨ Synthesized ${effectiveDiagramMode.toUpperCase()} Architecture for "${updated.metadata.projectTitle}" (${selectedAbstractionLevel}).`;
      specDiff = `Synchronized DOC-01 through DOC-16 Living Specifications and Governance Baseline for ${updated.metadata.projectTitle}.`;
    } else if (updated.components.length === prevCompCount && !/^(connect|group)\b/i.test(cleanPrompt)) {
      const currentTurnNumber = updated.components.filter(c => !BASELINE_DEFAULT_IDS.has(c.id)).length + 1;
      const newComp = synthesizeComponentFromPrompt(cleanPrompt, currentTurnNumber);
      updated.components = [...updated.components, newComp];
      updated.metadata.lastSyncTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setIsSavedInLibrary(false);
      canvasDiff = `+ Added P${currentTurnNumber}: ${newComp.name} (${newComp.service}) into project topology (${updated.components.length} Nodes total).`;
      specDiff = `Synchronized ${newComp.name} across DOC-03 (HLD), DOC-06 (Threat Model), and DOC-15 (Compliance Pack).`;
    }

    // Clear any stale pendingPlan and transition out of New Diagram Draft immediately on prompt execution
    setPendingPlan(null);
    if (isNewDiagramDraft) {
      setIsNewDiagramDraft(false);
    }

    let activeBaseXml = xml;
    if (isGenerativeDesignPrompt || effectiveDiagramMode === 'flowchart' || effectiveDiagramMode === 'infographic') {
      const synthesizedTitle = updated.metadata.projectTitle && updated.metadata.projectTitle !== 'ABC'
        ? updated.metadata.projectTitle
        : cleanPrompt.slice(0, 76);
      updated.metadata.projectTitle = synthesizedTitle;
      if (effectiveDiagramMode === 'flowchart') {
        activeBaseXml = generateLogicalFlowchartDrawioXml(
          promptText,
          synthesizedTitle,
          selectedFlowDirection,
          selectedAbstractionLevel
        );
      } else if (effectiveDiagramMode === 'infographic') {
        const isZeroTplInfo =
          /4-tier\s+infographic|zero-template\s+infographic|dynamic\s+tiered\s+infographic/i.test(cleanPrompt);
        activeBaseXml = isZeroTplInfo
          ? generateDynamicTieredInfographicXml(cleanPrompt)
          : generateInfographicBlueprintXmlById(
              selectedInfographicBlueprintId,
              cleanPrompt,
              undefined,
              selectedAbstractionLevel
            );
        fetch('/api/infographic-blueprint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blueprintId: isZeroTplInfo ? 'blank' : selectedInfographicBlueprintId,
            noTemplate: isZeroTplInfo,
            prompt: cleanPrompt,
            level: selectedAbstractionLevel,
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data?.xml) {
              setXml(data.xml);
              setVersions((prev) =>
                prev.map((v, i) => (i === 0 ? { ...v, xml: data.xml, actionSummary: `[${isZeroTplInfo ? 'ZERO-TEMPLATE 4-TIER' : 'GEMINI LIVE • #' + selectedInfographicBlueprintId} ${data.shortType}] "${cleanPrompt}"` } : v))
              );
            }
          })
          .catch(() => {});
      } else {
        activeBaseXml = synthesizePromptDrivenDiagramXml(
          promptText,
          synthesizedTitle,
          selectedDomain || 'Enterprise Cloud'
        );
      }
      setSelectedBlueprintId(effectiveDiagramMode === 'infographic' ? selectedInfographicBlueprintId : 'custom');

      // Auto-persist to Library (/api/diagrams) so it is immediately available in /library
      fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: synthesizedTitle,
          xml: activeBaseXml,
          comment: `Synthesized from Studio UI Prompt (${newVersionTag})`,
          prompt: promptText,
          aiReasoning: `Synthesized Reference Architecture for: ${promptText}`,
          businessUsecase: selectedDomain || 'Enterprise Cloud',
          technicalUsecase: canvasDiff,
          architectureType: isVerticalStratumPrompt
            ? 'vertical_stratum_cross_section'
            : isAwsPrompt
            ? 'aws_cloud_ai_reference'
            : 'canonical_google_cloud_ref_v2',
          createdStudio: 'studio',
          isPrivate: false
        })
      }).catch(() => {});
    }

    // Check if the current active XML is the Default GCP Native Architecture
    const isSixZoneNativeCanvas =
      activeBaseXml.includes('id="upgraded-gcp-ge-multi-agent-banking-2026"') ||
      activeBaseXml.includes('id="spatial_gcp_reference_arch"') ||
      (activeBaseXml.includes('id="z1"') && activeBaseXml.includes('id="z2"')) ||
      (activeBaseXml.includes('id="z1_bg"') && activeBaseXml.includes('id="z2_bg"'));
    let baseUpdatedXml: string;

    if (isGenerativeDesignPrompt || effectiveDiagramMode === 'flowchart' || effectiveDiagramMode === 'infographic') {
      baseUpdatedXml = activeBaseXml;
    } else if (isSixZoneNativeCanvas && !isGenerativeDesignPrompt) {
      // Regenerates the 6-Zone GCP Native Architecture + Zone 7 Cumulative Extensions Grid (P1..P10+ in 5-col multi-row grid)
      baseUpdatedXml = generateGcpNativeArchitectureXml(
        { projectTitle: updated.metadata.projectTitle, domain: updated.metadata.domain },
        updated
      );
    } else {
      // Surgically update ANY active XML diagram (Canonical templates, Bespoke Reference Architectures, Vision decompilations)
      // with cumulative multi-row grid geometry for Prompts 1..10+
      const customComps = updated.components.filter(c => !BASELINE_DEFAULT_IDS.has(c.id));
      let mutatedXml = activeBaseXml;

      if (mutatedXml.includes('</root>')) {
        // Remove previous studio_ext / studio_edge / studio_conn / studio_group cells to re-render all cumulative nodes cleanly
        mutatedXml = mutatedXml.replace(/<mxCell id="studio_(?:ext|edge|conn|group)_[\s\S]*?<\/mxCell>/g, '');

        let maxY = 720;
        const geoRegex = /<mxGeometry\s+[^>]*?y="(\d+)"\s+[^>]*?height="(\d+)"/gi;
        let m;
        while ((m = geoRegex.exec(mutatedXml)) !== null) {
          const bottom = parseInt(m[1], 10) + parseInt(m[2], 10);
          if (bottom > maxY && bottom < 1800) maxY = bottom;
        }
        const extY = maxY + 38;
        const numRows = Math.max(1, Math.ceil(customComps.length / 5));
        const groupW = Math.max(440, Math.min(5, Math.max(1, customComps.length)) * 292 + 28);
        const groupH = 38 + numRows * 82;

        // Find a safe anchor node in the diagram
        const anchorId = mutatedXml.includes('id="gcp_container"')
          ? 'gcp_container'
          : mutatedXml.includes('id="card_frontend"')
          ? 'card_frontend'
          : '1';

        const injectedCells: string[] = [];

        if (customComps.length > 0 || /^group\b/i.test(cleanPrompt)) {
          injectedCells.push(
            `<mxCell id="studio_group_dmz" value="CUMULATIVE PROJECT EXTENSIONS (${customComps.length} ${customComps.length === 1 ? 'NODE' : 'NODES'} ADDED ACROSS PROMPTS)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;spacingLeft=12;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#0369A1;" vertex="1" parent="1"><mxGeometry x="48" y="${extY - 26}" width="${groupW}" height="${groupH}" as="geometry"/></mxCell>`
          );
        }

        customComps.forEach((comp, idx) => {
          const colIdx = idx % 5;
          const rowIdx = Math.floor(idx / 5);
          const xPos = 60 + colIdx * 292;
          const yPos = extY + rowIdx * 82;
          const safeName = `P${idx + 1}: ${comp.name}`.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          const safeSvc = comp.service.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          const labelHtml = `&lt;div style=&quot;padding:6px 10px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;&quot;&gt;&lt;div style=&quot;font-size:11px;font-weight:800;color:#0F172A;&quot;&gt;${safeName}&lt;/div&gt;&lt;div style=&quot;font-size:9px;font-weight:600;color:#2563EB;margin-top:2px;&quot;&gt;${safeSvc} • ${comp.sla || '99.99%'}&lt;/div&gt;&lt;/div&gt;`;
          injectedCells.push(
            `<mxCell id="studio_ext_${comp.id}" value="${labelHtml}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;shadow=0;arcSize=10;" vertex="1" parent="1"><mxGeometry x="${xPos}" y="${yPos}" width="272" height="62" as="geometry"/></mxCell>`
          );

          if (rowIdx === 0 && anchorId !== '1') {
            injectedCells.push(
              `<mxCell id="studio_edge_${comp.id}" value="+${idx + 1} ${(comp.protocols || ['TLS 1.3'])[0]}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;fontSize=10;fontStyle=1;fontColor=#1E40AF;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;exitX=0.5;exitY=0;entryX=0;entryY=0.85;" edge="1" parent="1" source="studio_ext_${comp.id}" target="${anchorId}"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="${xPos + 136}" y="${extY - 12}"/><mxPoint x="22" y="${extY - 12}"/><mxPoint x="22" y="960"/></Array></mxGeometry></mxCell>`
            );
          } else if (rowIdx > 0) {
            const parentComp = customComps[(rowIdx - 1) * 5 + colIdx];
            if (parentComp) {
              injectedCells.push(
                `<mxCell id="studio_edge_${comp.id}" value="+${idx + 1}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;fontSize=9;fontStyle=1;fontColor=#1E40AF;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="studio_ext_${parentComp.id}" target="studio_ext_${comp.id}"><mxGeometry relative="1" as="geometry"/></mxCell>`
              );
            }
          }
        });

        if (/^connect\b/i.test(cleanPrompt) && customComps.length >= 2) {
          const cA = customComps[customComps.length - 2];
          const cB = customComps[customComps.length - 1];
          injectedCells.push(
            `<mxCell id="studio_conn_${Date.now()}" value="TLS 1.3 / mTLS" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;endArrow=block;endFill=1;fontSize=10;fontStyle=1;fontColor=#065F46;labelBackgroundColor=#FFFFFF;labelBorderColor=#6EE7B7;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="studio_ext_${cA.id}" target="studio_ext_${cB.id}"><mxGeometry relative="1" as="geometry"/></mxCell>`
          );
        }

        if (injectedCells.length > 0) {
          mutatedXml = mutatedXml.replace('</root>', `${injectedCells.join('\n')}\n</root>`);
        }
      }
      baseUpdatedXml = mutatedXml;
    }

    // Immediately and atomically update AST, Canvas XML, Active Version Tag, Chat History, and Version Snapshots
    // so sequential prompts (Prompt 1 through Prompt 10+) never suffer from out-of-order async race conditions
    const currentRequestId = ++latestPromptRequestIdRef.current;
    setAst(updated);
    setXml(baseUpdatedXml);
    setActiveVersionTag(newVersionTag);
    setStudioTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? {
              ...t,
              mode: 'canvas',
              title: updated.metadata.projectTitle || t.title,
              versionTag: newVersionTag,
            }
          : t
      )
    );

    const aiMsg: StudioChatMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'assistant',
      text: `[${detectedPersona} Persona Refinement • ${newVersionTag}]: ${canvasDiff}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionSummary: {
        versionTag: newVersionTag,
        canvasDiff,
        specDiff,
      },
    };
    setMessages(prev => [...prev, aiMsg]);

    const newSnapshot: StudioVersionSnapshot = {
      id: `v_${Date.now()}`,
      versionTag: newVersionTag,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: detectedPersona,
      actionSummary: `${detectedPersona}: ${cleanPrompt}`,
      ast: updated,
      xml: baseUpdatedXml,
    };
    setVersions(prev => (isNewDiagramDraft ? [newSnapshot] : [...prev, newSnapshot]));

    // Auto-persist newly generated/evolved prompt diagram to /api/diagrams so it is immediately visible in Architecture Library
    const isMatrix = /^\[p[1-7]\]|guided matrix/i.test(promptText.trim()) || /^\[p[1-7]\]|guided matrix/i.test(updated.metadata.projectTitle);
    const isVision = /^\[vision\]|vision decompil/i.test(promptText.trim()) || /^\[vision\]/i.test(updated.metadata.projectTitle);
    fetch('/api/diagrams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: updated.metadata.projectTitle,
        xml: baseUpdatedXml,
        comment: `Synthesized via Studio Prompt (${newVersionTag})`,
        prompt: promptText.trim(),
        businessUsecase: updated.metadata.domain,
        technicalUsecase: canvasDiff,
        architectureType: isMatrix
          ? 'matrix_lifecycle_blueprint'
          : isVision
          ? 'vision_decompiled'
          : isAwsPrompt
          ? 'aws_cloud_ai_reference'
          : 'gcp_enterprise_reference',
        createdStudio: isMatrix ? 'prompt_lab' : isVision ? 'vision' : 'studio',
      }),
    })
      .then(() => setIsSavedInLibrary(true))
      .catch(() => {});

    // Optional background Gemini refinement: only for incremental in-place iterations
    if (!isGenerativeDesignPrompt) {
      const allCustomIds = updated.components.filter(c => !BASELINE_DEFAULT_IDS.has(c.id)).map(c => c.id);
      setIsHealing(true);
      fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: cleanPrompt,
          existingXml: baseUpdatedXml,
          currentXml: baseUpdatedXml,
          architectureType: isSixZoneNativeCanvas ? 'gcp_enterprise_6zone' : 'vision_decompiled',
          isIteration: true,
        }),
      })
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (latestPromptRequestIdRef.current !== currentRequestId) {
            return;
          }
          const returnedXml = data?.xml;
          const preservesAllCustomNodes =
            typeof returnedXml === 'string' &&
            allCustomIds.every(cid => returnedXml.includes(cid));
          const isSafeInPlaceEdit =
            returnedXml &&
            typeof returnedXml === 'string' &&
            returnedXml.includes('<mxGraphModel') &&
            !returnedXml.includes('serverless_eda_architecture') &&
            preservesAllCustomNodes &&
            (isSixZoneNativeCanvas
              ? (returnedXml.includes('id="z1"') || returnedXml.includes('id="z1_bg"')) &&
                (returnedXml.includes('z7_custom') || !baseUpdatedXml.includes('z7_custom'))
              : (returnedXml.includes('studio_ext_') || returnedXml.includes('studio_conn_') || returnedXml.includes('studio_group_')));

          if (isSafeInPlaceEdit) {
            setXml(returnedXml);
          }
        })
        .catch(() => {})
        .finally(() => {
          if (latestPromptRequestIdRef.current === currentRequestId) {
            setIsHealing(false);
          }
        });
    }
  }, [
    activeVersionTag,
    isEditorMode,
    ast,
    xml,
    selectedBlueprintId,
    versions.length,
    selectedDiagramMode,
    selectedAbstractionLevel,
    selectedFlowDirection,
    isNewDiagramDraft,
    specGrounding,
  ]);

  // 1-Click Starter Chips
  const handleStarterChip = (prompt: string, title: string) => {
    if (!isEditorMode) {
      const newId = 'ses_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      setSessionId(newId);
      setIsEditorMode(true);
    }
    setAst(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        projectTitle: title,
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    }));
    handleExecutePrompt(prompt);
  };

  // Re-Ground Architecture Brain
  const handleAutoHeal = () => {
    setIsHealing(true);
    setTimeout(() => {
      setXml(generateGcpNativeArchitectureXml());
      setIsHealing(false);
      setIsBrainModalOpen(false);
    }, 1000);
  };

  // Open in Full-Screen Bidirectional Draw.io Editor Tab (/drawio-editor)
  // Edits saved in this tab automatically sync back to the Studio Canvas and append a new Version Snapshot!
  const handleOpenDiagramsNet = () => {
    try {
      localStorage.setItem(
        'promptcanvas_drawio_active_session',
        JSON.stringify({
          xml,
          projectTitle: ast.metadata.projectTitle || 'Enterprise Architecture',
          versionTag: activeVersionTag,
        })
      );
    } catch {
      // ignore storage errors
    }
    window.open('/drawio-editor', '_blank');
  };

  // Export 10-Spec Markdown Bundle
  const handleExportMarkdownBundle = () => {
    const separator = '\n\n' + '='.repeat(80) + '\n\n';
    const fullText = livingSpecs.map(doc => `=== ${doc.id}: ${doc.title} ===\n\n${doc.markdownContent}`).join(separator);
    const blob = new Blob([fullText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ast.metadata.projectId}-living-specifications.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Create Brand New Architecture Canvas (+ New button handler)
  const handleCreateNewProject = (config: NewProjectConfig) => {
    const newId = 'ses_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
    setSessionId(newId);
    setIsEditorMode(true);
    setIsNewProjectModalOpen(false);

    let newAst = createDefaultFintechAst();
    newAst.metadata = {
      ...newAst.metadata,
      projectTitle: config.title,
      domain: config.domain,
      projectId: `proj-${config.domain.slice(0, 3)}-${Date.now().toString(36)}`,
      version: 'v1.0',
      lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let newXml = generateGcpNativeArchitectureXml({ projectTitle: config.title, domain: config.domain }, newAst);

    const combinedInput = `${config.title || ''} ${config.description || ''}`.toLowerCase();
    const isOpenKnowledge =
      combinedInput.includes('open knowledge format infographic') ||
      (combinedInput.includes('open knowledge') && combinedInput.includes('infographic'));

    const isCharlieHills =
      (combinedInput.includes('harness') && combinedInput.includes('loop') && combinedInput.includes('context')) ||
      combinedInput.includes('context + harness') ||
      combinedInput.includes('charlie hills');

    if (config.customXml) {
      newXml = config.customXml;
      setSelectedBlueprintId('custom');
    } else if (isOpenKnowledge) {
      setSelectedBlueprintId('custom');
      newXml = generateOpenKnowledgeInfographicXml(config.domain, 'light');
    } else if (isCharlieHills) {
      const bp52 = CANONICAL_TEMPLATES.find(t => t.id === '52');
      if (bp52) {
        setSelectedBlueprintId('52');
        newXml = bp52.generateXml(config.domain, 'light');
      }
    } else if (combinedInput.includes('infographic')) {
      setSelectedBlueprintId('custom');
      const fullTitle = config.title && config.title.toUpperCase() !== 'ABC'
        ? config.title
        : (config.description || 'Enterprise Infographic Blueprint').trim().slice(0, 72);
      newAst.metadata.projectTitle = fullTitle;
      const infoTopic = `${config.title || ''} ${config.description || ''}`.trim();
      newXml = generateDynamicTieredInfographicXml(infoTopic);
      fetch('/api/infographic-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: infoTopic, theme: 'light' }),
      })
        .then(r => (r.ok ? r.json() : null))
        .then(data => {
          if (data?.xml) setXml(data.xml);
        })
        .catch(() => {});
    } else if (
      config.description &&
      config.description.trim().length > 4 &&
      (config.blueprintId === 'blank' || config.blueprintId === 'custom' || !config.blueprintId)
    ) {
      setSelectedBlueprintId('custom');
      const fullTitle = config.title && config.title.toUpperCase() !== 'ABC'
        ? `${config.title} • ${config.description.trim().slice(0, 64)}`
        : config.description.trim().slice(0, 78);
      newAst.metadata.projectTitle = fullTitle;
      newXml = synthesizePromptDrivenDiagramXml(
        config.description.trim(),
        fullTitle,
        config.domain || 'Enterprise Cloud',
        { noTemplate: true }
      );
      setPromptInput(config.description.trim());
      fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullTitle,
          xml: newXml,
          comment: `Created via Studio New Project Modal (Zero-Template v1.0)`,
          prompt: config.description.trim(),
          aiReasoning: `Zero-Template 100% Prompt-Driven Synthesis for: ${config.description.trim()}`,
          businessUsecase: config.domain || 'Enterprise Cloud',
          technicalUsecase: 'Zero-Template Custom Synthesis v2.0',
          architectureType: 'zero_template_custom_v1',
          createdStudio: 'studio',
          isPrivate: false
        })
      }).catch(() => {});
    } else if (config.blueprintId !== 'blank' && config.blueprintId !== '00') {
      const bp = CANONICAL_TEMPLATES.find(t => t.id === config.blueprintId);
      if (bp) {
        setSelectedBlueprintId(bp.id);
        newXml = bp.generateXml(config.domain, 'light');
        if (config.description && config.description.trim().length > 4) {
          setPromptInput(config.description.trim());
        }
      }
    } else if (config.blueprintId === '00') {
      setSelectedBlueprintId('00');
    }

    setAst(newAst);
    setXml(newXml);
    setActiveVersionTag('v1.0');

    const baselineSnapshot: StudioVersionSnapshot = {
      id: `v_init_${Date.now()}`,
      versionTag: 'v1.0',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: 'User',
      actionSummary: `Baseline: ${config.title}`,
      ast: newAst,
      xml: newXml
    };
    setVersions([baselineSnapshot]);

    const initMsg: StudioChatMessage = {
      id: `msg_init_${Date.now()}`,
      sender: 'assistant',
      text: config.customXml
        ? `🚀 Loaded decompiled architecture canvas: **${config.title}** via DeepMind Vision!\n\nBaseline version **v1.0** is initialized. Your diagram is ready for prompt-based enhancements, node inspections, or versioning.`
        : `🚀 Created new project canvas: **${config.title}** (${config.domain.toUpperCase()}).\n\nBaseline version **v1.0** is initialized. Your diagram is ready for customization.${config.description ? `\n\n*Target Use Case:* ${config.description}` : ''}\n\nType your architecture requirements or click any suggestion below to start refining.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initMsg]);
    setActiveView('diagram');
  };

  // Auto-import diagram if navigated from Vision AI Studio (/vision)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rawImport = sessionStorage.getItem('promptcanvas_imported_diagram');
      if (rawImport) {
        try {
          const imported = JSON.parse(rawImport);
          sessionStorage.removeItem('promptcanvas_imported_diagram');
          if (imported.xml) {
            handleCreateNewProject({
              title: imported.title || 'Decompiled Architecture',
              domain: imported.domain || 'fintech',
              description: 'Imported from Vision AI Studio',
              blueprintId: 'custom',
              customXml: imported.xml
            });
          }
        } catch (e) {
          console.error('Failed to import diagram from vision:', e);
        }
      }
    }
  }, []);

  // Fork Current Reference Blueprint into an Active Session
  const handleForkBlueprint = () => {
    const newId = 'ses_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
    setSessionId(newId);
    setIsEditorMode(true);

    const forkedTitle = `Custom ${ast.metadata.projectTitle}`;
    const forkedAst: ArchitectureAst = {
      ...ast,
      metadata: {
        ...ast.metadata,
        projectTitle: forkedTitle,
        version: 'v1.0',
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };

    setAst(forkedAst);
    setActiveVersionTag('v1.0');

    const baselineSnapshot: StudioVersionSnapshot = {
      id: `v_fork_${Date.now()}`,
      versionTag: 'v1.0',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: 'User',
      actionSummary: `Forked Reference: ${forkedTitle}`,
      ast: forkedAst,
      xml
    };
    setVersions([baselineSnapshot]);

    const forkMsg: StudioChatMessage = {
      id: `msg_fork_${Date.now()}`,
      sender: 'assistant',
      text: `Forked blueprint into a new personal canvas session: **${forkedTitle}**.\n\nBaseline version **v1.0** established. You can now use ArcAssist Co-Pilot to customize components, security, and DR topologies.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([forkMsg]);
    setActiveView('diagram');
  };

  // Major Version Promotion Handler (v1.x -> v2.0)
  const handleConfirmMajorVersion = (releaseName: string, releaseNotes: string) => {
    const nextMajor = getNextMajorVersion(activeVersionTag);
    setActiveVersionTag(nextMajor);
    setIsMajorVersionModalOpen(false);

    const updatedAst: ArchitectureAst = {
      ...ast,
      metadata: {
        ...ast.metadata,
        version: nextMajor,
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };
    setAst(updatedAst);

    const milestoneSnapshot: StudioVersionSnapshot = {
      id: `v_major_${Date.now()}`,
      versionTag: nextMajor,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: 'User',
      actionSummary: `Major Milestone ${nextMajor}: ${releaseName}`,
      ast: updatedAst,
      xml
    };
    setVersions(prev => [...prev, milestoneSnapshot]);

    const milestoneMsg: StudioChatMessage = {
      id: `msg_major_${Date.now()}`,
      sender: 'assistant',
      text: `🎉 **Major Release Tagged: ${nextMajor} — ${releaseName}**\n\n${releaseNotes ? `*Milestone Notes:* ${releaseNotes}\n\n` : ''}This architecture milestone has been locked and snapshotted. Subsequent edits will increment as micro-versions (${nextMajor.replace('.0', '.1')}, etc.).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionSummary: {
        versionTag: nextMajor,
        canvasDiff: `Tagged major release milestone ${nextMajor}.`,
        specDiff: `Reconciled release notes across all 16 Living Specifications.`
      }
    };
    setMessages(prev => [...prev, milestoneMsg]);
  };

  return (
    <div className="h-screen max-h-screen w-screen bg-[#F8FAFC] text-slate-900 flex flex-row antialiased selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* 0. Collapsible Unified Navigation Sidebar */}
      <UnifiedAppSidebar />

      {/* Main Studio Viewport Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* 1. TOP WORKSPACE HEADER (v2.2 Single-Surface Multi-Tab & Consolidated Actions) */}
        <AppHeader>
          {/* Left: Brand + Multi-Tab Bar ([ Tab 1: Cloud Infra ] [ + ]) */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/"
              className="lg:hidden w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/20 hover:scale-105 transition shrink-0"
              title="Return to PromptCanvas Home"
            >
              PC
            </Link>

            <span className="hidden xl:inline-flex items-center gap-1.5 text-xs font-extrabold text-white tracking-tight shrink-0">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Architecture Studio</span>
            </span>

            <div className="h-4 w-px bg-slate-800 hidden xl:block shrink-0" />

            {/* v2.2 Multi-Tab Bar: [ Tab 1: ... ] [ + New Diagram ] */}
            <div className="flex items-center gap-1.5 bg-slate-950/90 p-1 rounded-xl border border-slate-800">
              {studioTabs.map((tab, idx) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    id={`studio-tab-${idx + 1}`}
                    onClick={() => handleSelectTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        tab.mode === 'launchpad' ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />
                    <span className="truncate max-w-[200px]">
                      {tab.title.startsWith('Tab ') ? tab.title : `Tab ${idx + 1}: ${tab.title}`}
                    </span>
                  </button>
                );
              })}

              {/* (+ New Diagram) Button — Opens Launchpad / Blank Project Tab */}
              <button
                id="studio-new-tab-btn"
                data-testid="studio-new-tab-btn"
                onClick={handleOpenNewTab}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
                title="Create New Diagram (Flowchart, Cloud Architecture, or Blueprint)"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Diagram</span>
              </button>
            </div>

            {/* Version Snapshot Pill */}
            <div id="studio-version-dropdown-container" className="relative shrink-0 hidden md:block">
              <button
                onClick={() => {
                  setIsExportDropdownOpen(false);
                  setIsVersionDropdownOpen(!isVersionDropdownOpen);
                }}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs text-slate-200 transition font-mono font-bold cursor-pointer"
                title="View Version History Snapshots"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span id="studio-active-version-tag">{activeVersionTag}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isVersionDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-[130] text-xs space-y-1.5 animate-in fade-in duration-100">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">Version History</span>
                    <button
                      onClick={() => {
                        setIsMajorVersionModalOpen(true);
                        setIsVersionDropdownOpen(false);
                      }}
                      className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-md hover:bg-emerald-900/60 transition cursor-pointer"
                    >
                      <Tag className="w-3 h-3" />
                      <span>Tag Major {getNextMajorVersion(activeVersionTag)}</span>
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                    {versions.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setActiveVersionTag(v.versionTag);
                          if (v.ast) setAst(v.ast);
                          if (v.xml) setXml(v.xml);
                          setIsVersionDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition flex items-start gap-2 ${
                          v.versionTag === activeVersionTag
                            ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="font-mono font-bold text-[10px] bg-slate-800 text-slate-200 border border-slate-700 px-1 py-0.2 rounded mt-0.5">
                          {v.versionTag}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="truncate text-[11px] text-white font-medium">{v.actionSummary}</div>
                          <div className="text-[9px] text-slate-400 font-mono">
                            {v.timestamp} • {v.author}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: 2-Way View Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner shrink-0 mx-1">
            <button
              onClick={() => setActiveView('diagram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeView === 'diagram'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white font-medium'
              }`}
            >
              <span>Architecture Diagram</span>
            </button>

            <button
              onClick={() => {
                setIsLaunchpadMode(false);
                setActiveView('specs');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeView === 'specs'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white font-medium'
              }`}
            >
              <span>Living Specs ({livingSpecs.length})</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </button>
          </div>

          {/* Right: Clean Non-Redundant Action Controls ([ Share ] & [ Cloud Viewer ] & [ Export ▾ ]) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Share & Comments Right-Side Panel Toggle (Google Docs / Slides style) */}
            <button
              id="studio-header-share-btn"
              data-testid="studio-header-share-btn"
              onClick={() => handleToggleRightCompanionPanel('share')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                isShareModalOpen
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Toggle non-blocking right-side Share & Comments panel"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{isShareModalOpen ? 'Close Share ►' : '◄ Share & Comment'}</span>
            </button>

            {/* Same-Screen Gmail-Style Cloud Viewer Button (Slides / Docs / PDF) */}
            <button
              id="studio-cloud-viewer-btn"
              data-testid="studio-cloud-viewer-btn"
              onClick={() => {
                setIsExportDropdownOpen(false);
                setIsVersionDropdownOpen(false);
                setCloudViewerModalMode('slides');
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              title="Open Gmail-Style Same-Screen Cloud Viewer with Open with Google Slides, Google Docs, or PDF dropdown"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Cloud Viewer</span>
            </button>

            {/* Primary: Export & Cloud Viewer Dropdown */}
            <div id="studio-export-dropdown-container" className="relative">
              <button
                id="studio-export-dropdown-btn"
                onClick={() => {
                  setIsVersionDropdownOpen(false);
                  setIsExportDropdownOpen(!isExportDropdownOpen);
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Export</span>
                <ChevronDown className="w-3 h-3 text-white/80" />
              </button>

              {isExportDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-[130] text-xs space-y-1 animate-in fade-in duration-100">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-bold px-2 py-1">
                    Gmail-Style Same-Screen Cloud Viewer (Zero Download)
                  </div>
                  <button
                    onClick={() => {
                      setIsExportDropdownOpen(false);
                      setCloudViewerModalMode('slides');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open with Google Slides (Cloud Viewer)</span>
                    </span>
                    <span className="text-[9px] font-mono text-amber-300 bg-amber-950/80 border border-amber-500/30 px-1.5 py-0.5 rounded">Preview</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsExportDropdownOpen(false);
                      setCloudViewerModalMode('docs');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>Open with Google Docs (Cloud Viewer)</span>
                    </span>
                    <span className="text-[9px] font-mono text-blue-300 bg-blue-950/80 border border-blue-500/30 px-1.5 py-0.5 rounded">Preview</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsExportDropdownOpen(false);
                      setCloudViewerModalMode('pdf');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-rose-400" />
                      <span>Open as Executive PDF (Cloud Viewer)</span>
                    </span>
                    <span className="text-[9px] font-mono text-rose-300 bg-rose-950/80 border border-rose-500/30 px-1.5 py-0.5 rounded">Preview</span>
                  </button>

                  <div className="my-1 border-t border-slate-800" />
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-bold px-2 py-1">
                    Direct Editor &amp; Bundle Exports
                  </div>
                  <button
                    onClick={() => {
                      handleOpenDiagramsNet();
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                      <span>Open in Draw.io Editor Tab</span>
                    </span>
                    <span className="text-[9px] font-mono text-purple-400 bg-purple-950 px-1.5 py-0.5 rounded">Live Sync</span>
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([xml], { type: 'application/xml' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${ast.metadata.projectId}-architecture.drawio`;
                      a.click();
                      URL.revokeObjectURL(url);
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Draw.io Native XML (.drawio)</span>
                    </span>
                    <span className="text-[9px] font-mono text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded">mxGraph</span>
                  </button>
                  <button
                    onClick={() => {
                      handleExportMarkdownBundle();
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Terraform (.tf) &amp; 16-Spec Bundle</span>
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">IaC</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </AppHeader>

        {/* 2. MAIN SINGLE-SURFACE 3-PANEL WORKSPACE */}
        <main className="flex-1 min-h-0 w-full flex overflow-hidden relative">
          {/* LEFT PANEL (AI CHATBOT DRAWER — 320px in Active Canvas Mode, Auto-Collapsed 0px in Inline Launchpad Mode) */}
          <aside
            id="studio-left-ai-drawer"
            data-testid="studio-left-ai-drawer"
            style={{
              width: isLaunchpadMode || isLeftDrawerCollapsed ? 0 : 320,
              minWidth: isLaunchpadMode || isLeftDrawerCollapsed ? 0 : 320,
              maxWidth: isLaunchpadMode || isLeftDrawerCollapsed ? 0 : 320
            }}
            className={`bg-white flex flex-col h-full min-h-0 transition-all duration-200 ${
              isLaunchpadMode || isLeftDrawerCollapsed
                ? 'w-0 border-r-0 opacity-0 pointer-events-none overflow-hidden z-20'
                : 'w-[320px] border-r border-slate-200 shadow-sm opacity-100 overflow-visible z-40'
            }`}
          >
            {!isLaunchpadMode && !isLeftDrawerCollapsed && (
              <>
                {/* Drawer Header with Collapse Button */}
                <div className="px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50 flex-shrink-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span>ArcAssist AI Chatbot</span>
                    <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                      {activeVersionTag}
                    </span>
                  </div>
                  <button
                    id="left-drawer-collapse-btn"
                    onClick={() => setIsLeftDrawerCollapsed(true)}
                    className="px-2 py-1 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
                    title="Collapse Left AI Drawer (Cmd + [)"
                  >
                    ◄ Collapse
                  </button>
                </div>

                {/* Compact Single-Row Trigger + Progressive Hover Top-Down (TD) Flowchart Tree */}
                <div
                  className="px-2.5 py-1.5 border-b border-slate-200 bg-slate-50/95 flex items-center justify-between gap-1.5 flex-shrink-0 relative"
                  onMouseEnter={() => {
                    if (flowTreeCloseTimerRef.current) {
                      clearTimeout(flowTreeCloseTimerRef.current);
                      flowTreeCloseTimerRef.current = null;
                    }
                    if (!isFlowTreeOpen) {
                      setIsFlowTreeOpen(true);
                      setIsFlowTreeTier2Open(false);
                      setIsFlowTreeTier3Open(false);
                    }
                  }}
                  onMouseLeave={() => {
                    flowTreeCloseTimerRef.current = setTimeout(() => {
                      setIsFlowTreeOpen(false);
                      setIsFlowTreeTier2Open(false);
                      setIsFlowTreeTier3Open(false);
                    }, 320);
                  }}
                >
                  <button
                    id="lr-flow-tree-trigger"
                    type="button"
                    aria-expanded={isFlowTreeOpen}
                    aria-controls="lr-flow-tree-popover"
                    aria-haspopup="dialog"
                    onClick={() => {
                      setIsFlowTreeOpen((prev) => !prev);
                    }}
                    onFocus={() => {
                      if (flowTreeCloseTimerRef.current) {
                        clearTimeout(flowTreeCloseTimerRef.current);
                        flowTreeCloseTimerRef.current = null;
                      }
                    }}
                    className={`flex-1 min-w-0 px-2.5 py-1.5 rounded-lg border text-left transition cursor-pointer flex items-center justify-between gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isFlowTreeOpen
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white hover:bg-blue-50/80 text-slate-800 border-slate-300 shadow-2xs'
                    }`}
                    title="Hover or click to progressively expand Top-Down (TD) Diagram Flowchart Tree"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[11px] font-extrabold tracking-tight shrink-0">
                        {selectedDiagramMode === 'blueprint'
                          ? '📚 Blueprint'
                          : selectedDiagramMode === 'infographic'
                          ? '📊 Infographic'
                          : '🔀 Flowchart'}
                      </span>
                      <span className="text-[10px] opacity-60 shrink-0" aria-hidden="true">──▼</span>
                      <span className="text-[10px] font-mono font-bold truncate px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-300">
                        {selectedDiagramMode === 'blueprint'
                          ? `#${selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId}`
                          : selectedDiagramMode === 'infographic'
                          ? `#${selectedInfographicBlueprintId} • ${selectedAbstractionLevel}`
                          : `${selectedAbstractionLevel} • ${selectedFlowDirection}`}
                      </span>
                    </div>
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 shrink-0">
                      Tree ▾
                    </span>
                  </button>

                  <button
                    id="drawer-new-diagram-btn"
                    type="button"
                    onClick={handleOpenNewTab}
                    className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
                    title="Start a Brand-New Diagram (Resets to Draft -> Plan Approval -> v1.0)"
                  >
                    <Plus className="w-3 h-3" aria-hidden="true" />
                    <span>New</span>
                  </button>

                  {/* Top-Down (TD) Progressive 3-Tier Vertical Flowchart Flyout (Root ▼ Branch ▼ Leaf Preview & Actions) */}
                  {isFlowTreeOpen && (
                    <div
                      id="lr-flow-tree-popover"
                      role="dialog"
                      aria-label="Top-Down Diagram Flowchart Tree"
                      onMouseEnter={() => {
                        if (flowTreeCloseTimerRef.current) {
                          clearTimeout(flowTreeCloseTimerRef.current);
                          flowTreeCloseTimerRef.current = null;
                        }
                        setIsFlowTreeOpen(true);
                      }}
                      onMouseLeave={() => {
                        flowTreeCloseTimerRef.current = setTimeout(() => {
                          setIsFlowTreeOpen(false);
                          setIsFlowTreeTier2Open(false);
                          setIsFlowTreeTier3Open(false);
                        }, 320);
                      }}
                      className="absolute left-2 top-full mt-1.5 z-[9999] bg-white/98 backdrop-blur-2xl border border-slate-200/95 ring-1 ring-slate-900/10 rounded-2xl shadow-[0_24px_60px_-12px_rgba(15,23,42,0.34)] overflow-x-hidden overflow-y-auto max-h-[calc(100vh-125px)] text-slate-900 w-[368px] animate-in fade-in zoom-in-95 duration-150"
                    >
                      {/* Top Header: TD Path & Search Filter */}
                      <div className="px-3 py-2 bg-slate-900 text-white flex items-center justify-between gap-2 sticky top-0 z-10">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[9.5px] font-extrabold uppercase tracking-wider shrink-0">
                            TD Flow Tree
                          </span>
                          <span className="text-[10px] text-slate-300 font-bold whitespace-nowrap">
                            1. Root {isFlowTreeTier2Open ? '▼ 2. Branch' : '▸ Hover'} {isFlowTreeTier3Open ? '▼ 3. Leaf' : ''}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {isFlowTreeTier2Open && selectedDiagramMode !== 'flowchart' && (
                            <input
                              type="text"
                              aria-label="Filter diagram tree items"
                              value={flowTreeSearchQuery}
                              onChange={(e) => setFlowTreeSearchQuery(e.target.value)}
                              placeholder="🔍 Filter..."
                              className="w-[82px] bg-slate-800/90 border border-slate-700 rounded-md px-1.5 py-0.5 text-[9.5px] text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400"
                            />
                          )}
                          <button
                            type="button"
                            aria-label="Close Top-Down Flowchart"
                            onClick={() => {
                              setIsFlowTreeOpen(false);
                              setIsFlowTreeTier2Open(false);
                              setIsFlowTreeTier3Open(false);
                            }}
                            className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded-md hover:bg-slate-800 cursor-pointer text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            title="Close Top-Down Flowchart"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Top-Down (TD) Vertical Flowchart Stack with Progressive Hover Expansion */}
                      <div className="p-3 space-y-1.5 bg-slate-50/60">
                        {/* TIER 1 (TOP): 1. ROOT FAMILY */}
                        <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                          <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                            <span>1. Root Family (Hover, Focus, or Click to Expand)</span>
                            <span className="text-[8.5px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">Tier 1</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5">
                            {(
                              [
                                { id: 'blueprint', icon: '📚', title: 'Blueprint', badge: '51' },
                                { id: 'flowchart', icon: '🔀', title: 'Flowchart', badge: 'L1–L4' },
                                { id: 'infographic', icon: '📊', title: 'Infographic', badge: '15' },
                              ] as const
                            ).map((mode) => {
                              const isActive = selectedDiagramMode === mode.id && isFlowTreeTier2Open;
                              const activateRootMode = () => {
                                const modeChanged = selectedDiagramMode !== mode.id;
                                setSelectedDiagramMode(mode.id);
                                setIsFlowTreeTier2Open(true);
                                if (modeChanged) {
                                  setIsFlowTreeTier3Open(false);
                                }
                                if (mode.id === 'blueprint') {
                                  const bpId =
                                    selectedBlueprintId === 'custom' || Number(selectedBlueprintId) >= 52
                                      ? '01'
                                      : selectedBlueprintId;
                                  const bp = CANONICAL_TEMPLATES.find((t) => t.id === bpId) || CANONICAL_TEMPLATES[0];
                                  handleSelectBlueprint(bp, selectedDomain);
                                } else if (mode.id === 'infographic') {
                                  setXml(
                                    generateInfographicBlueprintXmlById(
                                      selectedInfographicBlueprintId,
                                      promptInput.trim() || undefined,
                                      undefined,
                                      selectedAbstractionLevel
                                    )
                                  );
                                  setSelectedBlueprintId(selectedInfographicBlueprintId);
                                } else {
                                  setXml(
                                    generateLogicalFlowchartDrawioXml(
                                      promptInput.trim(),
                                      promptInput.trim() || undefined,
                                      selectedFlowDirection,
                                      selectedAbstractionLevel
                                    )
                                  );
                                  setSelectedBlueprintId('custom');
                                }
                              };
                              return (
                                <button
                                  key={mode.id}
                                  id={`mode-btn-${mode.id}`}
                                  type="button"
                                  aria-pressed={selectedDiagramMode === mode.id}
                                  onMouseEnter={activateRootMode}
                                  onFocus={activateRootMode}
                                  onClick={activateRootMode}
                                  className={`px-2 py-2 rounded-lg border text-center transition cursor-pointer relative flex flex-col items-center justify-center gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                    selectedDiagramMode === mode.id
                                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                      : 'bg-slate-50/80 hover:bg-blue-50/70 text-slate-800 border-slate-200'
                                  }`}
                                >
                                  <span className="text-[11px] font-extrabold flex items-center gap-1">
                                    <span aria-hidden="true">{mode.icon}</span>
                                    <span>{mode.title}</span>
                                  </span>
                                  <span
                                    className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded font-bold ${
                                      selectedDiagramMode === mode.id ? 'bg-blue-500 text-white' : 'bg-slate-200/80 text-slate-600'
                                    }`}
                                  >
                                    {mode.badge}
                                  </span>
                                  {isActive && (
                                    <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white shadow-2xs" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {!isFlowTreeTier2Open && (
                            <div
                              id="flow-tree-tier1-hint"
                              className="mt-2 pt-1.5 border-t border-dashed border-slate-200 text-center text-[9.5px] font-bold text-blue-600 flex items-center justify-center gap-1"
                            >
                              <span>Hover any Root Family above to expand Tier 2 Selection</span>
                              <span>▾</span>
                            </div>
                          )}
                        </div>

                        {/* TIER 2 (MIDDLE): Progressive Expansion on Tier 1 Hover */}
                        {isFlowTreeTier2Open && (
                          <>
                            {/* VERTICAL TOP-DOWN CONNECTOR ARROW 1 (Tier 1 ▼ Tier 2) */}
                            <div className="flex flex-col items-center justify-center py-0.5 select-none animate-in fade-in duration-150">
                              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1V14M8 14L4 10M8 14L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>

                            <div
                              id="flow-tree-tier-2"
                              className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs animate-in fade-in slide-in-from-top-1 duration-150"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400">
                                  {selectedDiagramMode === 'blueprint'
                                    ? '2. Select Reference Blueprint (59)'
                                    : selectedDiagramMode === 'infographic'
                                    ? '2. Select Infographic Template (15)'
                                    : '2. Abstraction Level & Saved Flow Blueprints (#67–#74)'}
                                </span>
                                {selectedDiagramMode !== 'flowchart' ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsFlowTreeOpen(false);
                                      setIsCatalogOpen(true);
                                    }}
                                    className="text-[9.5px] font-bold text-blue-600 hover:underline cursor-pointer"
                                  >
                                    Full Gallery (74) ↗
                                  </button>
                                ) : (
                                  <span className="text-[8.5px] font-mono px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-bold">
                                    Tier 2 • #67–#74
                                  </span>
                                )}
                              </div>

                              {/* Segmented Pill Bar for Abstraction Level (L1..L4) + LR/TD */}
                              {(selectedDiagramMode === 'flowchart' || selectedDiagramMode === 'infographic') && (
                                <div className="flex items-center justify-between gap-1 bg-slate-100 p-1 rounded-lg mb-2">
                                  <div className="flex items-center gap-0.5">
                                    {(['L1', 'L2', 'L3', 'L4'] as const).map((lvl) => {
                                      const selectLevel = () => {
                                        setSelectedAbstractionLevel(lvl);
                                        setIsFlowTreeTier3Open(true);
                                        if (selectedDiagramMode === 'infographic') {
                                          setXml(
                                            generateInfographicBlueprintXmlById(
                                              selectedInfographicBlueprintId,
                                              promptInput.trim() || undefined,
                                              undefined,
                                              lvl
                                            )
                                          );
                                        } else if (selectedDiagramMode === 'flowchart') {
                                          setXml(
                                            generateLogicalFlowchartDrawioXml(
                                              promptInput.trim(),
                                              promptInput.trim() || undefined,
                                              selectedFlowDirection,
                                              lvl
                                            )
                                          );
                                        }
                                      };
                                      return (
                                        <button
                                          key={lvl}
                                          id={`level-btn-${lvl}`}
                                          type="button"
                                          onMouseEnter={selectLevel}
                                          onClick={selectLevel}
                                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold transition cursor-pointer ${
                                            selectedAbstractionLevel === lvl
                                              ? 'bg-slate-900 text-white shadow-2xs'
                                              : 'text-slate-600 hover:text-slate-900'
                                          }`}
                                          title={`Switch to ${lvl} progressive technical detail`}
                                        >
                                          {lvl}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {selectedDiagramMode === 'flowchart' && (
                                    <div className="flex items-center gap-0.5 border-l border-slate-300 pl-1.5">
                                      <button
                                        id="direction-btn-lr"
                                        type="button"
                                        onMouseEnter={() => {
                                          setSelectedFlowDirection('LR');
                                          setIsFlowTreeTier3Open(true);
                                          setXml(
                                            generateLogicalFlowchartDrawioXml(
                                              promptInput.trim(),
                                              promptInput.trim() || undefined,
                                              'LR',
                                              selectedAbstractionLevel
                                            )
                                          );
                                        }}
                                        onClick={() => {
                                          setSelectedFlowDirection('LR');
                                          setIsFlowTreeTier3Open(true);
                                          setXml(
                                            generateLogicalFlowchartDrawioXml(
                                              promptInput.trim(),
                                              promptInput.trim() || undefined,
                                              'LR',
                                              selectedAbstractionLevel
                                            )
                                          );
                                        }}
                                        className={`px-2 py-0.5 rounded-md text-[9.5px] font-extrabold transition cursor-pointer ${
                                          selectedFlowDirection === 'LR'
                                            ? 'bg-blue-600 text-white shadow-2xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                      >
                                        ➡️ LR
                                      </button>
                                      <button
                                        id="direction-btn-td"
                                        type="button"
                                        onMouseEnter={() => {
                                          setSelectedFlowDirection('TD');
                                          setIsFlowTreeTier3Open(true);
                                          setXml(
                                            generateLogicalFlowchartDrawioXml(
                                              promptInput.trim(),
                                              promptInput.trim() || undefined,
                                              'TD',
                                              selectedAbstractionLevel
                                            )
                                          );
                                        }}
                                        onClick={() => {
                                          setSelectedFlowDirection('TD');
                                          setIsFlowTreeTier3Open(true);
                                          setXml(
                                            generateLogicalFlowchartDrawioXml(
                                              promptInput.trim(),
                                              promptInput.trim() || undefined,
                                              'TD',
                                              selectedAbstractionLevel
                                            )
                                          );
                                        }}
                                        className={`px-2 py-0.5 rounded-md text-[9.5px] font-extrabold transition cursor-pointer ${
                                          selectedFlowDirection === 'TD'
                                            ? 'bg-blue-600 text-white shadow-2xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                      >
                                        ⬇️ TD
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Compact Scrollable Branch List */}
                              <div className="max-h-[185px] overflow-y-auto space-y-1 pr-1">
                                {selectedDiagramMode === 'infographic' &&
                                  INFOGRAPHIC_BLUEPRINTS_LIST.filter((ib) =>
                                    !flowTreeSearchQuery.trim()
                                      ? true
                                      : `${ib.id} ${ib.shortType} ${ib.name}`
                                          .toLowerCase()
                                          .includes(flowTreeSearchQuery.toLowerCase())
                                  ).map((ib, idx) => {
                                    const isSelected = selectedInfographicBlueprintId === ib.id;
                                    const activateInfographicItem = () => {
                                      setSelectedInfographicBlueprintId(ib.id);
                                      setSelectedBlueprintId(ib.id);
                                      setIsFlowTreeTier3Open(true);
                                      setXml(
                                        generateInfographicBlueprintXmlById(
                                          ib.id,
                                          promptInput.trim() || undefined,
                                          undefined,
                                          selectedAbstractionLevel
                                        )
                                      );
                                    };
                                    return (
                                      <button
                                        key={ib.id}
                                        id={`infographic-tier2-${ib.id}`}
                                        type="button"
                                        onMouseEnter={activateInfographicItem}
                                        onClick={activateInfographicItem}
                                        className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition cursor-pointer flex items-center justify-between gap-1.5 ${
                                          isSelected
                                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                                            : 'bg-slate-50/70 hover:bg-blue-50/60 text-slate-800 border-slate-200/80 font-semibold'
                                        }`}
                                      >
                                        <span className="text-[10.5px] truncate">
                                          {idx + 1}. {ib.shortType}
                                        </span>
                                        <span
                                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                                            isSelected ? 'bg-blue-700 text-blue-100' : 'bg-white text-slate-500'
                                          }`}
                                        >
                                          #{ib.id} • {selectedAbstractionLevel}
                                        </span>
                                      </button>
                                    );
                                  })}

                                {selectedDiagramMode === 'blueprint' &&
                                  CANONICAL_TEMPLATES.filter((bp) => bp.family !== 'Infographic')
                                    .filter((bp) =>
                                      !flowTreeSearchQuery.trim()
                                        ? true
                                        : `${bp.id} ${bp.name} ${bp.family}`
                                            .toLowerCase()
                                            .includes(flowTreeSearchQuery.toLowerCase())
                                    )
                                    .map((bp) => {
                                      const activeBpId = selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId;
                                      const isSelected = activeBpId === bp.id;
                                      return (
                                        <button
                                          key={bp.id}
                                          id={`blueprint-tier2-${bp.id}`}
                                          type="button"
                                          onMouseEnter={() => {
                                            setSelectedBlueprintId(bp.id);
                                            setIsFlowTreeTier3Open(true);
                                            handleSelectBlueprint(bp, selectedDomain);
                                          }}
                                          onClick={() => {
                                            setSelectedBlueprintId(bp.id);
                                            setIsFlowTreeTier3Open(true);
                                            handleSelectBlueprint(bp, selectedDomain);
                                          }}
                                          className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition cursor-pointer flex items-center justify-between gap-1.5 ${
                                            isSelected
                                              ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                                              : 'bg-slate-50/70 hover:bg-blue-50/60 text-slate-800 border-slate-200/80 font-semibold'
                                          }`}
                                        >
                                          <span className="text-[10.5px] truncate">{bp.name}</span>
                                          <span
                                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                                              isSelected ? 'bg-blue-700 text-blue-100' : 'bg-white text-slate-500'
                                            }`}
                                          >
                                            #{bp.id}
                                          </span>
                                        </button>
                                      );
                                    })}

                                {selectedDiagramMode === 'flowchart' && (
                                  <>
                                    {(
                                      [
                                        {
                                          id: 'L1',
                                          title: 'L1 • Google Cloud Executive Value Stream',
                                          desc: '3 Swimlanes • Gemini App • Apigee • Vertex AI & Cylinder Stores',
                                          badge: '5 Nodes',
                                        },
                                        {
                                          id: 'L2',
                                          title: 'L2 • Google Cloud Policy Gate & ADK Mesh',
                                          desc: '5 Swimlanes • ◇ Apigee Rhombus • SIEM • Redis & Pub/Sub DLQ',
                                          badge: '10 Nodes',
                                        },
                                        {
                                          id: 'L3',
                                          title: 'L3 • Google Cloud 7-Layer Operational Flow',
                                          desc: '7 Swimlanes • DNS/WAF/GSLB • KMS • Chunking/Embedding • BigQuery',
                                          badge: '15 Nodes',
                                        },
                                        {
                                          id: 'L4',
                                          title: 'L4 • Google Cloud Agentic AI Mesh (#67)',
                                          desc: '7 Swimlanes • 20 Product Icons • Agent Designer • ADK 2.0 • Deep Research',
                                          badge: '20 Nodes',
                                        },
                                      ] as const
                                    ).map((item) => {
                                      const isSelected = selectedAbstractionLevel === item.id && selectedBlueprintId === 'custom';
                                      const activateFlowchartLevel = () => {
                                        setSelectedAbstractionLevel(item.id);
                                        setIsFlowTreeTier3Open(true);
                                        setXml(
                                          generateLogicalFlowchartDrawioXml(
                                            promptInput.trim(),
                                            promptInput.trim() || undefined,
                                            selectedFlowDirection,
                                            item.id
                                          )
                                        );
                                        setSelectedBlueprintId('custom');
                                      };
                                      return (
                                        <button
                                          key={item.id}
                                          id={`flowchart-tier2-${item.id}`}
                                          type="button"
                                          onMouseEnter={activateFlowchartLevel}
                                          onClick={activateFlowchartLevel}
                                          className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                                            isSelected
                                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                              : 'bg-slate-50/70 hover:bg-blue-50/60 text-slate-800 border-slate-200'
                                          }`}
                                        >
                                          <div className="flex items-center justify-between gap-1">
                                            <span className="text-[10.5px] font-extrabold">{item.title}</span>
                                            <span
                                              className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ${
                                                isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-200/80 text-slate-600'
                                              }`}
                                            >
                                              {item.badge}
                                            </span>
                                          </div>
                                          <div className={`text-[9px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                                            {item.desc}
                                          </div>
                                        </button>
                                      );
                                    })}

                                    <div className="pt-1 pb-0.5 px-1 text-[8.5px] font-extrabold uppercase tracking-wider text-slate-400">
                                      Saved Flow Diagram Blueprints (#67–#74)
                                    </div>
                                    {FLOW_DIAGRAM_BLUEPRINTS_67_TO_74.map((fb) => {
                                      const isSelected = selectedBlueprintId === fb.id;
                                      const activateFlowBlueprint = () => {
                                        setSelectedBlueprintId(fb.id);
                                        setIsFlowTreeTier3Open(true);
                                        setXml(generateFlowDiagramBlueprintXmlById(fb.id));
                                      };
                                      return (
                                        <button
                                          key={fb.id}
                                          id={`flowchart-blueprint-${fb.id}`}
                                          type="button"
                                          onMouseEnter={activateFlowBlueprint}
                                          onClick={activateFlowBlueprint}
                                          className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition cursor-pointer flex items-center justify-between gap-1.5 ${
                                            isSelected
                                              ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                                              : 'bg-slate-50/70 hover:bg-blue-50/60 text-slate-800 border-slate-200/80 font-semibold'
                                          }`}
                                        >
                                          <span className="text-[10px] truncate">{fb.shortType}</span>
                                          <span
                                            className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                                              isSelected
                                                ? 'bg-blue-700 text-blue-100'
                                                : fb.theme === 'dark'
                                                ? 'bg-slate-800 text-slate-100'
                                                : 'bg-white text-slate-500'
                                            }`}
                                          >
                                            #{fb.id} • {fb.theme === 'dark' ? 'Dark' : 'Light'}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </>
                                )}
                              </div>

                              {!isFlowTreeTier3Open && (
                                <div
                                  id="flow-tree-tier2-hint"
                                  className="mt-2 pt-1.5 border-t border-dashed border-slate-200 text-center text-[9.5px] font-bold text-emerald-700 flex items-center justify-center gap-1"
                                >
                                  <span>Hover any option above to expand Tier 3 Leaf Preview</span>
                                  <span>▾</span>
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        {/* TIER 3 (BOTTOM): Progressive Expansion on Tier 2 Hover */}
                        {isFlowTreeTier2Open && isFlowTreeTier3Open && (
                          <>
                            {/* VERTICAL TOP-DOWN CONNECTOR ARROW 2 (Tier 2 ▼ Tier 3 Leaf) */}
                            <div className="flex flex-col items-center justify-center py-0.5 select-none animate-in fade-in duration-150">
                              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1V14M8 14L4 10M8 14L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>

                            <div
                              id="flow-tree-tier-3"
                              className="rounded-xl border-2 border-emerald-500/80 bg-gradient-to-b from-white to-emerald-50/40 p-2.5 shadow-xs animate-in fade-in slide-in-from-top-1 duration-150"
                            >
                              <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center justify-between">
                                <span>3. Leaf Preview & Initiate Action</span>
                                <span className="text-[8.5px] px-1.5 py-0.2 bg-emerald-600 text-white rounded font-mono">
                                  Synced Live ✓
                                </span>
                              </div>

                              {/* Compact Horizontal Thumbnail + Progressive Technical Metadata Row */}
                              <div className="flex items-center gap-2.5 p-1.5 rounded-lg border border-slate-200 bg-white mb-2">
                                <div className="relative w-[116px] h-[66px] rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center">
                                  {selectedDiagramMode === 'infographic' ? (
                                    <img
                                      src={`/templates/${selectedInfographicBlueprintId}.png`}
                                      alt={`Infographic #${selectedInfographicBlueprintId}`}
                                      className="w-full h-full object-cover object-top"
                                    />
                                  ) : selectedDiagramMode === 'blueprint' ? (
                                    <img
                                      src={`/images/${selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId}.png`}
                                      alt={`Blueprint #${selectedBlueprintId}`}
                                      className="w-full h-full object-cover object-top"
                                      onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = '/templates/52.png';
                                      }}
                                    />
                                  ) : selectedAbstractionLevel === 'L1' ? (
                                    <div className="flex flex-col items-center justify-center gap-1 w-full h-full bg-blue-50/90 px-1.5 py-1 text-[8px] font-mono font-bold text-blue-900">
                                      <div className="text-[7.5px] uppercase tracking-wider text-blue-600">L1 • 4 Linear Stages</div>
                                      <div className="flex items-center gap-0.5">
                                        <span className="px-1 py-0.5 bg-white rounded border border-blue-300">01</span>
                                        <span>→</span>
                                        <span className="px-1 py-0.5 bg-white rounded border border-indigo-300">02</span>
                                        <span>→</span>
                                        <span className="px-1 py-0.5 bg-white rounded border border-purple-300">03</span>
                                        <span>→</span>
                                        <span className="px-1 py-0.5 bg-emerald-100 rounded border border-emerald-400">04</span>
                                      </div>
                                    </div>
                                  ) : selectedAbstractionLevel === 'L2' ? (
                                    <div className="flex flex-col items-center justify-center gap-0.5 w-full h-full bg-amber-50/80 px-1.5 py-1 text-[8px] font-mono font-bold text-slate-800">
                                      <div className="text-[7.5px] uppercase tracking-wider text-amber-800">L2 • 2 Lanes + ◇ Gates</div>
                                      <div className="flex items-center gap-0.5">
                                        <span className="px-1 bg-white rounded border border-blue-300">In</span>
                                        <span>→</span>
                                        <span className="px-1 bg-amber-100 rounded border border-amber-400 text-amber-900">◇1</span>
                                        <span>→</span>
                                        <span className="px-1 bg-amber-100 rounded border border-amber-400 text-amber-900">◇2</span>
                                        <span>→</span>
                                        <span className="px-1 bg-emerald-100 rounded border border-emerald-400">✓</span>
                                      </div>
                                      <div className="text-[7px] text-rose-700 bg-rose-100/80 px-1 rounded">↻ DLQ Retry Loop</div>
                                    </div>
                                  ) : selectedAbstractionLevel === 'L3' ? (
                                    <div className="flex flex-col items-center justify-center gap-0.5 w-full h-full bg-indigo-50/90 px-1 py-1 text-[7.5px] font-mono font-bold text-indigo-950">
                                      <div className="text-[7px] uppercase tracking-wider text-indigo-700">L3 • API + Redis + CDC</div>
                                      <div className="flex items-center gap-0.5">
                                        <span className="px-1 bg-white rounded border border-blue-300">GW</span>
                                        <span>→</span>
                                        <span className="px-1 bg-purple-100 rounded border border-purple-300">GKE</span>
                                        <span>↔</span>
                                        <span className="px-1 bg-emerald-100 rounded border border-emerald-400">Redis</span>
                                      </div>
                                      <div className="text-[7px] text-amber-800 bg-amber-100 px-1 rounded">Pub/Sub CDC → OTel</div>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center gap-0.5 w-full h-full bg-slate-900 px-1 py-1 text-[7.5px] font-mono font-bold text-white">
                                      <div className="text-[7px] uppercase tracking-wider text-emerald-300">L4 • Multi-Region HA</div>
                                      <div className="flex items-center gap-0.5">
                                        <span className="px-1 bg-blue-900 rounded border border-blue-400">us-c1</span>
                                        <span>⇄</span>
                                        <span className="px-1 bg-purple-900 rounded border border-purple-400">nam3</span>
                                        <span>⇄</span>
                                        <span className="px-1 bg-amber-900 rounded border border-amber-400">us-e4</span>
                                      </div>
                                      <div className="text-[7px] text-sky-300">VPC-SC • KMS HSM • &lt;3s RTO</div>
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-[11px] font-extrabold text-slate-900 truncate">
                                    {selectedDiagramMode === 'blueprint'
                                      ? `📚 Blueprint #${selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId}`
                                      : selectedDiagramMode === 'infographic'
                                      ? `📊 #${selectedInfographicBlueprintId} • ${
                                          INFOGRAPHIC_BLUEPRINTS_LIST.find((i) => i.id === selectedInfographicBlueprintId)?.shortType || 'Infographic'
                                        }`
                                      : `🔀 Flowchart • ${selectedAbstractionLevel} (${selectedFlowDirection})`}
                                  </div>
                                  <div className="text-[9.5px] text-slate-500 truncate mt-0.5">
                                    {selectedDiagramMode === 'blueprint'
                                      ? CANONICAL_TEMPLATES.find((t) => t.id === (selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId))?.name
                                      : selectedAbstractionLevel === 'L1'
                                      ? 'L1 Executive: 4 Value Stages + 3 KPI/ROI Cards'
                                      : selectedAbstractionLevel === 'L2'
                                      ? 'L2 Logical: 2 Swimlanes, 2 ◇ Gates & Retry Loop'
                                      : selectedAbstractionLevel === 'L3'
                                      ? 'L3 Technical: 3 Tiers, Redis Cache, Spanner & CDC'
                                      : 'L4 Production HA: 4 Strata, Multi-Region & KMS'}
                                  </div>
                                  <div className="mt-1 flex items-center gap-1">
                                    <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                      16:9 Draw.io XML
                                    </span>
                                    <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                                      {selectedAbstractionLevel}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* 3 Clickable Leaf Action Buttons */}
                              <div className="space-y-1.5">
                                <div className="grid grid-cols-2 gap-1.5">
                                  <button
                                    id="leaf-action-view-btn"
                                    type="button"
                                    onClick={() => {
                                      if (selectedDiagramMode === 'blueprint') {
                                        const bpId = selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId;
                                        const bp = CANONICAL_TEMPLATES.find((t) => t.id === bpId) || CANONICAL_TEMPLATES[0];
                                        handleSelectBlueprint(bp, selectedDomain);
                                      } else if (selectedDiagramMode === 'infographic') {
                                        setXml(
                                          generateInfographicBlueprintXmlById(
                                            selectedInfographicBlueprintId,
                                            promptInput.trim() || undefined,
                                            undefined,
                                            selectedAbstractionLevel
                                          )
                                        );
                                        setSelectedBlueprintId(selectedInfographicBlueprintId);
                                      } else if (Number(selectedBlueprintId) >= 67 && Number(selectedBlueprintId) <= 74) {
                                        setXml(generateFlowDiagramBlueprintXmlById(selectedBlueprintId));
                                      } else {
                                        setXml(
                                          generateLogicalFlowchartDrawioXml(
                                            promptInput.trim(),
                                            promptInput.trim() || undefined,
                                            selectedFlowDirection,
                                            selectedAbstractionLevel
                                          )
                                        );
                                        setSelectedBlueprintId('custom');
                                      }
                                      setIsNewDiagramDraft(false);
                                      setIsInlineDrawioEdit(false);
                                      setIsFlowTreeOpen(false);
                                    }}
                                    className="px-2.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[10.5px] shadow-xs transition cursor-pointer flex items-center justify-center gap-1"
                                  >
                                    <span>👁️ View Canvas</span>
                                  </button>

                                  <button
                                    id="leaf-action-edit-btn"
                                    type="button"
                                    onClick={() => {
                                      let nextXml = xml;
                                      if (selectedDiagramMode === 'blueprint') {
                                        const bpId = selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId;
                                        const bp = CANONICAL_TEMPLATES.find((t) => t.id === bpId) || CANONICAL_TEMPLATES[0];
                                        handleSelectBlueprint(bp, selectedDomain);
                                      } else if (selectedDiagramMode === 'infographic') {
                                        nextXml = generateInfographicBlueprintXmlById(
                                          selectedInfographicBlueprintId,
                                          promptInput.trim() || undefined,
                                          undefined,
                                          selectedAbstractionLevel
                                        );
                                        setXml(nextXml);
                                        setSelectedBlueprintId(selectedInfographicBlueprintId);
                                      } else if (Number(selectedBlueprintId) >= 67 && Number(selectedBlueprintId) <= 74) {
                                        nextXml = generateFlowDiagramBlueprintXmlById(selectedBlueprintId);
                                        setXml(nextXml);
                                      } else {
                                        nextXml = generateLogicalFlowchartDrawioXml(
                                          promptInput.trim(),
                                          promptInput.trim() || undefined,
                                          selectedFlowDirection,
                                          selectedAbstractionLevel
                                        );
                                        setXml(nextXml);
                                        setSelectedBlueprintId('custom');
                                      }
                                      latestInlineXmlRef.current = nextXml;
                                      setIsNewDiagramDraft(false);
                                      setIsInlineDrawioEdit(true);
                                      setIsFlowTreeOpen(false);
                                    }}
                                    className="px-2.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[10.5px] shadow-xs transition cursor-pointer flex items-center justify-center gap-1"
                                  >
                                    <span>✎ Edit Draw.io</span>
                                  </button>
                                </div>

                                <button
                                  id="leaf-action-create-new-btn"
                                  type="button"
                                  onClick={() => {
                                    handleOpenNewTab();
                                    setIsFlowTreeOpen(false);
                                    setTimeout(() => {
                                      const el = document.getElementById('studio-copilot-prompt-input') as HTMLTextAreaElement | null;
                                      if (el) el.focus();
                                    }, 120);
                                  }}
                                  className="w-full px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] shadow-xs transition cursor-pointer flex items-center justify-between"
                                >
                                  <span>➕ Create New Diagram from Leaf</span>
                                  <span className="text-[9px] font-mono bg-emerald-700/80 px-1.5 py-0.5 rounded">Draft → v1.0</span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* System Prompt & Analysis History Stream */}
                <div
                  ref={editorScrollRef}
                  role="log"
                  aria-live="polite"
                  aria-relevant="additions"
                  aria-label="Architecture Co-Pilot Conversation History"
                  className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3 text-xs"
                >
                  {/* Full Version History of Prompt + Diagram XML */}
                  {versions.length > 0 && (
                    <details open className="rounded-xl border border-slate-200 bg-slate-50/80 p-2 text-[10.5px]">
                      <summary className="font-bold text-slate-800 cursor-pointer flex items-center justify-between select-none">
                        <span className="flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                          <span>Version History (Prompt + Diagram)</span>
                        </span>
                        <span className="font-mono text-[9.5px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold tabular-nums">
                          {versions.length} Saved
                        </span>
                      </summary>
                      <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {versions.map((v) => (
                          <div
                            key={v.id}
                            className={`p-2 rounded-lg border flex items-center justify-between gap-2 ${
                              v.versionTag === activeVersionTag
                                ? 'bg-blue-50 border-blue-300'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-black text-blue-700 text-[10px] tabular-nums">
                                  {v.versionTag}
                                </span>
                                <span className="text-[9px] text-slate-500 font-mono tabular-nums">{v.timestamp}</span>
                              </div>
                              <div className="text-[9.5px] text-slate-700 truncate font-medium mt-0.5">
                                {v.actionSummary}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (v.xml) setXml(v.xml);
                                if (v.ast) setAst(v.ast);
                                setActiveVersionTag(v.versionTag);
                              }}
                              aria-label={`Restore version ${v.versionTag}`}
                              className="px-2 py-1 rounded bg-slate-900 hover:bg-blue-600 text-white text-[9px] font-bold shrink-0 cursor-pointer transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                              Restore
                            </button>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}

                  {messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`rounded-xl p-3 space-y-1.5 ${
                          isUser
                            ? 'bg-blue-50/90 border border-blue-300'
                            : 'bg-white border border-slate-200 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className={`font-bold ${isUser ? 'text-blue-900' : 'text-slate-900'}`}>
                            {isUser ? 'You:' : 'ArcAssist AI:'}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500 font-semibold tabular-nums">{msg.timestamp}</span>
                        </div>
                        <p
                          className={`text-[11.5px] leading-relaxed whitespace-pre-line ${
                            isUser ? 'text-slate-900 font-semibold' : 'text-slate-800'
                          }`}
                        >
                          {msg.text}
                        </p>
                        {msg.actionSummary && (
                          <HierarchicalSyncCard
                            versionTag={msg.actionSummary.versionTag}
                            canvasDiff={msg.actionSummary.canvasDiff}
                            specDiff={msg.actionSummary.specDiff}
                            projectTitle={ast.metadata.projectTitle}
                            domain={ast.metadata.domain}
                            livingSpecs={livingSpecs}
                            components={ast.components}
                            onSelectDoc={(docId) => {
                              setActiveView('specs');
                              setActiveDocId(docId);
                            }}
                            onSelectNode={(comp) => {
                              setActiveView('diagram');
                              setSelectedComponent(comp);
                            }}
                            onSwitchToDiagram={() => setActiveView('diagram')}
                            onShareObject={(type, id, title) => handleOpenShare(type, id, title)}
                          />
                        )}
                      </div>
                    );
                  })}

                  {selectedBlueprintId === 'custom' && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-2.5 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-emerald-900">
                        <span>⚡ Prompt-Driven Topology Active</span>
                        <span className="font-mono text-[9px] bg-emerald-200/80 text-emerald-950 px-1.5 py-0.5 rounded">
                          Gemini 3.1 Pro + 2.5 Flash
                        </span>
                      </div>
                      <div className="rounded-lg border border-emerald-200/90 bg-white px-2.5 py-2 text-[10px] text-slate-700 space-y-1">
                        <div className="font-bold text-slate-900 truncate">
                          {ast.metadata.projectTitle}
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-emerald-700 font-semibold">
                          <span>✓ Multi-Tier Draw.io XML Compiled</span>
                          <span>✓ 16 Living Specs Synced</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-600 leading-tight">
                        Synthesized directly from custom prompt clauses into collision-free Draw.io XML and synchronized across all 16 Living Specs.
                      </div>
                    </div>
                  )}
                </div>

                {/* Sticky Prompt Validation & Sanity Check + Plan Approval Card (Docked directly above Send Box) */}
                {pendingPlan && (
                  <div
                    id="prompt-validation-plan-card"
                    role="region"
                    aria-label="Prompt Validation and Sanity Check"
                    className="mx-2.5 mb-2 rounded-xl border-2 border-emerald-500 bg-emerald-50/95 p-2.5 shadow-lg space-y-2 flex-shrink-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                        <span>Prompt Validation &amp; Sanity Check</span>
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-emerald-200 text-emerald-950 px-1.5 py-0.5 rounded">
                        ✓ PASSED
                      </span>
                    </div>

                    <div className="text-[10.5px] font-bold text-slate-800 bg-white border border-emerald-200 rounded-lg px-2 py-1">
                      <div>
                        Target:{' '}
                        <span className="text-blue-700 font-mono">
                          {pendingPlan.diagramMode.toUpperCase()} • {pendingPlan.level}
                          {pendingPlan.diagramMode === 'flowchart' ? ` • ${pendingPlan.direction}` : ''}
                        </span>
                      </div>
                      <div className="text-[9.5px] text-slate-600 font-normal truncate">
                        Sanitized: &ldquo;{pendingPlan.sanitizedPrompt}&rdquo;
                      </div>
                    </div>

                    <div className="bg-white/90 border border-slate-200 rounded-lg p-1.5 space-y-0.5 font-mono text-[9px] text-slate-700">
                      {pendingPlan.plannedSteps.slice(0, 3).map((step, i) => (
                        <div key={i} className="truncate">
                          {step}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        id="approve-plan-create-v1-btn"
                        onClick={handleApprovePendingPlan}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold shadow-xs transition cursor-pointer flex items-center justify-center gap-1 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                      >
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Approve Plan &amp; Create {pendingPlan.targetVersionTag}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingPlan(null)}
                        aria-label="Cancel pending architecture plan"
                        className="px-2 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-600 text-[10px] font-bold cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* Sticky Co-Pilot Prompt Box */}
                <div className="p-3 border-t border-slate-200 bg-slate-50/80 space-y-1.5 flex-shrink-0">
                  <div className="relative">
                    <label htmlFor="studio-copilot-prompt-input" className="sr-only">
                      Ask AI to analyze architecture or mutate canvas
                    </label>
                    <textarea
                      id="studio-copilot-prompt-input"
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      enterKeyHint="send"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleExecutePrompt(promptInput);
                        }
                      }}
                      rows={2}
                      placeholder="Ask AI to analyze architecture or mutate canvas..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-none shadow-2xs"
                    />
                    <button
                      type="button"
                      id="studio-copilot-submit-btn"
                      onClick={() => handleExecutePrompt(promptInput)}
                      aria-label="Send prompt to Architecture Co-Pilot"
                      className="absolute bottom-2.5 right-2 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow transition flex items-center gap-1 cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <span>Send</span>
                      <Send className="w-2.5 h-2.5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span>Questions = Non-Mutating</span>
                    <span>Edits bump {activeVersionTag} ↵</span>
                  </div>
                </div>
              </>
            )}
          </aside>

          {/* CENTER PANEL: INLINE LAUNCHPAD (when isLaunchpadMode === true) OR ACTIVE INTERACTIVE CANVAS */}
          {isLaunchpadMode ? (
            <section
              id="studio-inline-launchpad"
              data-testid="studio-inline-launchpad"
              className="flex-1 min-h-0 h-full overflow-y-auto bg-[#F8FAFC] px-6 md:px-12 py-8"
            >
              <div className="w-full max-w-[1600px] mx-auto space-y-8">
                {/* 1. SINGLE HERO AI PROMPT INPUT (Unmistakable Primary Entry) */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 md:p-8 space-y-5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold font-mono">
                        v2.2 Single-Surface Workspace
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Left &amp; Right Drawers Auto-Hidden (0px) • Transitions to Active Canvas on Submit
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsLaunchpadMode(false);
                        setIsLeftDrawerCollapsed(false);
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Resume Active Diagram ({activeVersionTag})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                      What architecture, sequence, or data model are we building?
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Describe your system in plain English, pick an engine intent chip below, or launch directly from 53 certified Google Cloud blueprints.
                    </p>
                  </div>

                  {/* Single Hero Prompt Box */}
                  <div className="relative">
                    <textarea
                      id="launchpad-hero-prompt-input"
                      data-testid="launchpad-hero-prompt-input"
                      value={launchpadPromptInput}
                      onChange={(e) => setLaunchpadPromptInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleExecutePrompt(
                            launchpadPromptInput || 'Design a Multi-Region GKE & Cloud Spanner Zero-Trust Topology'
                          );
                        }
                      }}
                      rows={3}
                      placeholder="Describe architecture, sequence, or BPMN flow to generate..."
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border-2 border-slate-200 focus:border-blue-600 rounded-2xl px-5 py-4 pr-36 text-base text-slate-900 placeholder-slate-400 focus:outline-none shadow-inner transition resize-none"
                    />
                    <button
                      id="launchpad-hero-submit-btn"
                      onClick={() =>
                        handleExecutePrompt(
                          launchpadPromptInput || 'Design a Multi-Region GKE & Cloud Spanner Zero-Trust Topology'
                        )
                      }
                      className="absolute bottom-4 right-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate</span>
                    </button>
                  </div>

                  {/* 5 Intent Routing Chips (Section 2.1) */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                      Intent Engine:
                    </span>
                    {[
                      { id: 'auto', label: '✨ Auto-Detect', desc: 'AI infers diagram type & layout engine' },
                      { id: 'cloud', label: '☁️ Cloud Architecture', desc: 'Forces Directed Graph (Dagre/ELK)' },
                      { id: 'sequence', label: '🔄 Sequence / BPMN', desc: 'Forces Timeline/Swimlane Grid' },
                      { id: 'erd', label: '🗄️ ERD / Data Model', desc: 'Forces Entity-Relationship Schema' },
                      { id: 'vision', label: '📸 Decompile Image', desc: 'Parses uploaded PNG into Draw.io XML' }
                    ].map((chip) => {
                      const isSelected = selectedIntentChip === chip.id;
                      return (
                        <button
                          key={chip.id}
                          onClick={() => {
                            if (chip.id === 'vision') {
                              window.location.href = '/vision';
                              return;
                            }
                            setSelectedIntentChip(chip.id as any);
                          }}
                          title={chip.desc}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                        >
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. CANONICAL BLUEPRINT CATALOG (Full-Width 3-Column Visual Grid — Zero Dead-Ends) */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-lg font-extrabold text-slate-900">
                          Canonical Blueprint Catalog ({CANONICAL_TEMPLATES.length} Certified Topologies)
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Zero Dead-Ends
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Click any blueprint card to immediately initialize the Draw.io mxGraph editor and slide open the 320px AI Chatbot Drawer.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Industry Single-Tier Filter */}
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                        <span className="text-xs font-bold text-slate-500">Industry:</span>
                        <select
                          value={launchpadIndustry}
                          onChange={(e) => {
                            setLaunchpadIndustry(e.target.value);
                            if (e.target.value !== 'all') setSelectedDomain(e.target.value);
                          }}
                          className="text-xs font-bold text-slate-800 bg-transparent outline-hidden cursor-pointer"
                        >
                          <option value="all">All Industries ({DOMAIN_PRESETS.length})</option>
                          {DOMAIN_PRESETS.map((dp) => (
                            <option key={dp.id} value={dp.id}>
                              {dp.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Search Input */}
                      <input
                        type="text"
                        value={launchpadSearch}
                        onChange={(e) => setLaunchpadSearch(e.target.value)}
                        placeholder="Search 53 Certified Blueprints..."
                        className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-64"
                      />

                      <button
                        onClick={() => setIsCatalogOpen(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition cursor-pointer"
                      >
                        View All {CANONICAL_TEMPLATES.length} →
                      </button>
                    </div>
                  </div>

                  {/* Full-Width 3-Column Visual Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CANONICAL_TEMPLATES.filter((t) => {
                      const q = launchpadSearch.toLowerCase().trim();
                      if (!q) return true;
                      return (
                        t.name.toLowerCase().includes(q) ||
                        t.family.toLowerCase().includes(q) ||
                        t.primaryPurpose.toLowerCase().includes(q)
                      );
                    })
                      .slice(0, 6)
                      .map((bp) => {
                        const levelBadge =
                          bp.level === 'L1'
                            ? 'L1 Conceptual'
                            : bp.level === 'L2'
                            ? 'L2 Logical'
                            : 'L3 Physical';
                        return (
                          <div
                            key={bp.id}
                            data-testid={`launchpad-blueprint-card-${bp.id}`}
                            onClick={() =>
                              handleSelectBlueprint(
                                bp,
                                launchpadIndustry === 'all' ? selectedDomain : launchpadIndustry
                              )
                            }
                            className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 bg-slate-50/40 hover:bg-white hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                                  #{bp.id}
                                </span>
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                                  {levelBadge}
                                </span>
                              </div>

                              {/* High-Res Schematic Preview */}
                              <div className="w-full h-28 rounded-xl bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 border border-slate-200 p-3 flex flex-col justify-between group-hover:border-blue-300 transition">
                                <div className="flex items-center justify-between gap-2">
                                  {(bp.keyComponents || ['Cloud Armor', 'GKE Mesh', 'Cloud Spanner'])
                                    .slice(0, 3)
                                    .map((node, i) => (
                                      <div
                                        key={i}
                                        className="flex-1 bg-white border border-blue-200 rounded-lg px-2 py-1.5 shadow-2xs flex items-center gap-1.5 min-w-0"
                                      >
                                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                        <span className="text-[10px] font-mono font-bold text-slate-800 truncate">
                                          {node}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                                  <span>{bp.family}</span>
                                  <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition">
                                    Open in Canvas →
                                  </span>
                                </div>
                              </div>

                              <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition">
                                {bp.name}
                              </h4>
                              <p className="text-xs text-slate-600 line-clamp-2">{bp.primaryPurpose}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* 3. RECENT PROJECTS & TEAM REPOS (1-Click Direct Open) */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider font-mono">
                      Recent Projects &amp; Team Repos (1-Click Direct Open)
                    </h3>
                    <Link href="/library" className="text-xs font-bold text-blue-600 hover:underline">
                      Open Full Library →
                    </Link>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {[
                      {
                        title: 'Multi-Region GKE Topology Architecture',
                        meta: 'Edited 2h ago by You • Cloud Architecture (L3 Physical)',
                        bpId: '01'
                      },
                      {
                        title: 'OAuth 2.0 Auth & Payments Sequence Flow',
                        meta: 'Edited yesterday by DevSecOps • Sequence & Zero-Trust (L2 Logical)',
                        bpId: '04'
                      },
                      {
                        title: 'Bio-Pharma Precision Oncology Lakehouse & Vertex RAG',
                        meta: 'Edited 2d ago by Principal Architect • Bio-Pharma (L2 Logical)',
                        bpId: '02'
                      }
                    ].map((proj, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          const bp =
                            CANONICAL_TEMPLATES.find((t) => t.id === proj.bpId) || CANONICAL_TEMPLATES[0];
                          handleSelectBlueprint(bp, selectedDomain);
                        }}
                        className="py-3.5 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer transition group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                            #{proj.bpId}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition truncate">
                              {proj.title}
                            </div>
                            <div className="text-xs text-slate-500 font-mono truncate">{proj.meta}</div>
                          </div>
                        </div>
                        <button className="px-3.5 py-1.5 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-700 group-hover:text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer">
                          <span>Open</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : activeView === 'diagram' ? (
            // ACTIVE CANVAS STATE: INTERACTIVE DRAW.IO NATIVE MXGRAPH EDITOR + PARENT Z-100 ESCAPE CONTROLS
            <section className="flex-1 min-h-0 h-full bg-[#F1F5F9] flex flex-col relative overflow-hidden">
              {/* Inset Canvas Toolbar (Section 3 & 3.1) */}
              <div className="px-4 py-2 border-b border-slate-200 bg-white flex items-center justify-between gap-2 text-xs flex-shrink-0 overflow-x-auto z-20">
                <div className="flex items-center gap-2 shrink-0">
                  {isLeftDrawerCollapsed && (
                    <button
                      id="expand-left-ai-drawer-btn"
                      onClick={() => setIsLeftDrawerCollapsed(false)}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                      title="Expand Left AI Chatbot Drawer (320px)"
                    >
                      <Bot className="w-3.5 h-3.5 text-purple-600" />
                      <span>Expand AI (320px) ►</span>
                    </button>
                  )}

                  {/* Quick Diagram Type Switcher (Blueprint / Flowchart LR / Flowchart TD / Infographic) */}
                  <div className="flex items-center gap-1 bg-slate-100 border border-slate-300 p-1 rounded-lg text-slate-800 font-medium whitespace-nowrap shrink-0">
                    <button
                      onClick={() => {
                        setSelectedDiagramMode('blueprint');
                        const bpId =
                          selectedBlueprintId === 'custom' || Number(selectedBlueprintId) >= 52
                            ? '01'
                            : selectedBlueprintId;
                        const bp = CANONICAL_TEMPLATES.find((t) => t.id === bpId) || CANONICAL_TEMPLATES[0];
                        handleSelectBlueprint(bp, selectedDomain);
                      }}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        selectedDiagramMode === 'blueprint' || selectedDiagramMode === 'architecture'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'hover:bg-white text-slate-700'
                      }`}
                    >
                      📚 Blueprint
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDiagramMode('flowchart');
                        setSelectedFlowDirection('LR');
                        setXml(
                          generateLogicalFlowchartDrawioXml(
                            promptInput.trim(),
                            promptInput.trim() || undefined,
                            'LR',
                            selectedAbstractionLevel
                          )
                        );
                        setSelectedBlueprintId('custom');
                      }}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        selectedDiagramMode === 'flowchart' && selectedFlowDirection === 'LR'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'hover:bg-white text-slate-700'
                      }`}
                    >
                      🔀 Flowchart (LR)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDiagramMode('flowchart');
                        setSelectedFlowDirection('TD');
                        setXml(
                          generateLogicalFlowchartDrawioXml(
                            promptInput.trim(),
                            promptInput.trim() || undefined,
                            'TD',
                            selectedAbstractionLevel
                          )
                        );
                        setSelectedBlueprintId('custom');
                      }}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        selectedDiagramMode === 'flowchart' && selectedFlowDirection === 'TD'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'hover:bg-white text-slate-700'
                      }`}
                    >
                      🔀 Flowchart (TD)
                    </button>
                    <button
                      id="toolbar-mode-infographic-btn"
                      onClick={() => {
                        setSelectedDiagramMode('infographic');
                        setIsSideBySideCompare(true);
                        setXml(
                          generateInfographicBlueprintXmlById(
                            selectedInfographicBlueprintId,
                            promptInput.trim() || undefined,
                            undefined,
                            selectedAbstractionLevel
                          )
                        );
                        setSelectedBlueprintId(selectedInfographicBlueprintId);
                      }}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        selectedDiagramMode === 'infographic'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'hover:bg-white text-slate-700'
                      }`}
                    >
                      📊 Infographic
                    </button>
                  </div>

                  {/* Quick L1 -> L2 -> L3 -> L4 Progressive Technical Detail Switcher */}
                  {(selectedDiagramMode === 'flowchart' || selectedDiagramMode === 'infographic') && (
                    <div
                      id="canvas-toolbar-level-switcher"
                      className="flex items-center gap-0.5 bg-slate-100 border border-slate-300 p-1 rounded-lg text-slate-800 font-bold whitespace-nowrap shrink-0"
                      title="Progressive Technical Detail Level (L1 Conceptual -> L2 Logical -> L3 Technical -> L4 Production HA)"
                    >
                      {(['L1', 'L2', 'L3', 'L4'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          id={`toolbar-level-btn-${lvl}`}
                          type="button"
                          onClick={() => {
                            setSelectedAbstractionLevel(lvl);
                            if (selectedDiagramMode === 'infographic') {
                              setXml(
                                generateInfographicBlueprintXmlById(
                                  selectedInfographicBlueprintId,
                                  promptInput.trim() || undefined,
                                  undefined,
                                  lvl
                                )
                              );
                            } else {
                              setXml(
                                generateLogicalFlowchartDrawioXml(
                                  promptInput.trim(),
                                  promptInput.trim() || undefined,
                                  selectedFlowDirection,
                                  lvl
                                )
                              );
                            }
                          }}
                          className={`px-2 py-0.5 rounded-md text-[10.5px] font-extrabold transition cursor-pointer ${
                            selectedAbstractionLevel === lvl
                              ? 'bg-slate-900 text-white shadow-2xs'
                              : 'hover:bg-white text-slate-600'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Section 3.1: Explicit [ 📚 Blueprints (75) ] Mid-Session Slide-Over Drawer Button */}
                  <button
                    id="canvas-toolbar-blueprints-btn"
                    data-testid="canvas-toolbar-blueprints-btn"
                    onClick={() => setIsCatalogOpen(true)}
                    className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-800 text-xs font-extrabold transition shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    title="Open Visual Blueprint Catalog Slide-Over Drawer (75 Certified Blueprints)"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>📚 Blueprints ({CANONICAL_TEMPLATES.length})</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-slate-700 shrink-0">
                  {/* Side-by-Side (PNG + Draw.io XML) Toggle Button */}
                  <button
                    id="toggle-side-by-side-compare-btn"
                    onClick={() => {
                      setIsInlineDrawioEdit(false);
                      setIsSideBySideCompare((prev) => !prev);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-extrabold transition shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                      isSideBySideCompare
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800'
                    }`}
                    title="Compare Reference PNG Image and Editable Draw.io XML Vector Version Side-by-Side"
                  >
                    <span>{isSideBySideCompare ? '✓ PNG + XML Side-by-Side' : '🖼️ PNG + XML Side-by-Side'}</span>
                  </button>

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-slate-100 border border-slate-300 px-1.5 py-1 rounded-lg text-[11px] shadow-2xs whitespace-nowrap shrink-0">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 0.5}
                      className="p-0.5 rounded hover:bg-white text-slate-700 disabled:opacity-30 transition cursor-pointer"
                      aria-label="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-black text-slate-900 px-1 min-w-[38px] text-center select-none">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 2.5}
                      className="p-0.5 rounded hover:bg-white text-slate-700 disabled:opacity-30 transition cursor-pointer"
                      aria-label="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-slate-300 mx-0.5">|</span>
                    <button
                      onClick={handleResetZoom}
                      className="px-1.5 py-0.5 rounded text-[11px] font-bold text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                    >
                      Fit (16:9)
                    </button>
                  </div>

                  <button
                    id="toggle-inline-drawio-edit-btn"
                    onClick={() => {
                      latestInlineXmlRef.current = xml;
                      setIsInlineDrawioEdit((prev) => !prev);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition shadow-2xs flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                      isInlineDrawioEdit
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white hover:bg-emerald-50 border-slate-300 text-slate-800'
                    }`}
                    title="Edit Draw.io diagram inline directly on this canvas and save back to Version History"
                  >
                    <span>{isInlineDrawioEdit ? '✓ Editing Inline' : '✎ Edit Inline'}</span>
                  </button>

                  <button
                    id="open-in-drawio-tab-btn"
                    onClick={handleOpenDiagramsNet}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-[11px] font-bold transition shadow-2xs flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                    title="Open in Full-Screen Draw.io Editor Tab (Saving syncs back to this canvas & Version History)"
                  >
                    <ExternalLink className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>↗ Edit in Draw.io Tab</span>
                  </button>

                  {/* Toggle Right Governance Panel (280px) */}
                  <button
                    id="toggle-right-governance-btn"
                    onClick={() => setIsRightGovernanceOpen((prev) => !prev)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                      isRightGovernanceOpen
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                    }`}
                  >
                    <Shield className="w-3 h-3 text-emerald-600" />
                    <span>{isRightGovernanceOpen ? 'Hide Governance ►' : '◄ Governance (280px)'}</span>
                  </button>
                </div>
              </div>

              {/* Section 3.3: Parent-Layer Floating [ ✨ Ask AI (Cmd+K) ] Escape Pill — only visible when Left AI Drawer is collapsed */}
              {isLeftDrawerCollapsed && (
                <div className="absolute top-14 right-6 z-[100] flex items-center gap-2 pointer-events-auto">
                  <button
                    id="floating-ask-ai-pill"
                    data-testid="floating-ask-ai-pill"
                    onClick={() => setIsSpotlightOpen((prev) => !prev)}
                    className="px-3.5 py-1.5 rounded-full bg-slate-900/95 hover:bg-blue-600 text-white border border-slate-700 shadow-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                    title="Open Spotlight AI Command Bar over canvas (Escapes Iframe Focus)"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>✨ Ask AI (Cmd+K)</span>
                  </button>
                </div>
              )}

              {/* Spotlight AI Command Bar Modal Overlay (z-index: 110 above iframe) */}
              {isSpotlightOpen && (
                <div
                  id="spotlight-ai-command-bar"
                  data-testid="spotlight-ai-command-bar"
                  className="absolute top-24 left-1/2 -translate-x-1/2 z-[110] w-full max-w-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-4 text-white animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                      <Sparkles className="w-4 h-4" />
                      <span>Spotlight AI Command Bar (Parent Layer Escape • Version {activeVersionTag})</span>
                    </div>
                    <button
                      onClick={() => setIsSpotlightOpen(false)}
                      className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded cursor-pointer"
                    >
                      ESC ✕
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="spotlight-ai-input"
                      type="text"
                      autoFocus
                      value={spotlightInput}
                      onChange={(e) => setSpotlightInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleExecutePrompt(spotlightInput);
                        } else if (e.key === 'Escape') {
                          setIsSpotlightOpen(false);
                        }
                      }}
                      placeholder="Ask a non-mutating question (e.g., What is the SPOF?) or command a diagram edit..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
                    />
                    <button
                      id="spotlight-ai-submit-btn"
                      onClick={() => handleExecutePrompt(spotlightInput)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Run ↵
                    </button>
                  </div>
                </div>
              )}

              {/* Canvas Viewport */}
              <div
                onWheel={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    if (e.deltaY < 0) handleZoomIn();
                    else handleZoomOut();
                  }
                }}
                className="flex-1 min-h-0 p-3 md:p-5 flex items-center justify-center overflow-auto bg-slate-50/50"
              >
                {isInlineDrawioEdit ? (
                  <div className="w-full max-w-[1440px] h-full min-h-[560px] m-auto bg-white rounded-2xl border-2 border-emerald-500 shadow-2xl flex flex-col overflow-hidden">
                    <div className="px-4 py-2 bg-[#0B111E] text-white flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px]">
                          INLINE DRAW.IO EDITOR ({activeVersionTag})
                        </span>
                        <span className="text-slate-300">
                          Edit nodes, labels, or connectors below. Click Save to reflect back on canvas &amp; bump Version History.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          id="save-inline-drawio-btn"
                          onClick={() =>
                            commitDrawioEditToCanvasAndHistory(
                              latestInlineXmlRef.current || xml,
                              'Inline Draw.io Canvas Edit'
                            )
                          }
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold cursor-pointer transition"
                        >
                          💾 Save &amp; Commit Version
                        </button>
                        <button
                          onClick={() => setIsInlineDrawioEdit(false)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <iframe
                      ref={inlineDrawioIframeRef}
                      title="Inline Draw.io Editor"
                      src="https://embed.diagrams.net/?embed=1&proto=json&spin=1&ui=kennedy&saveAndExit=1"
                      className="w-full flex-1 border-0"
                    />
                  </div>
                ) : isSideBySideCompare ? (
                  <div
                    id="studio-side-by-side-compare-viewport"
                    className="w-full max-w-[1680px] h-full min-h-[560px] m-auto flex flex-col gap-3 overflow-hidden"
                  >
                    {/* Quick Infographic Blueprint Strip (#52 - #66) */}
                    <div className="bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-xs flex items-center justify-between gap-2 overflow-x-auto shrink-0">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-wider">
                          Side-by-Side Audit
                        </span>
                        <span className="text-xs font-extrabold text-slate-800">
                          Infographic Blueprints (#52–#66):
                        </span>
                      </div>
                      <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                        {INFOGRAPHIC_BLUEPRINTS_LIST.map((info) => {
                          const isActiveInfo =
                            selectedDiagramMode === 'infographic'
                              ? selectedInfographicBlueprintId === info.id
                              : selectedBlueprintId === info.id;
                          return (
                            <button
                              key={info.id}
                              id={`sbs-infographic-pill-${info.id}`}
                              type="button"
                              onClick={() => {
                                setSelectedDiagramMode('infographic');
                                setSelectedInfographicBlueprintId(info.id);
                                setSelectedBlueprintId(info.id);
                                setXml(
                                  generateInfographicBlueprintXmlById(
                                    info.id,
                                    promptInput.trim() || undefined,
                                    undefined,
                                    selectedAbstractionLevel
                                  )
                                );
                              }}
                              title={`${info.name} (${info.shortType})`}
                              className={`px-2 py-1 rounded-lg text-[10.5px] font-mono font-extrabold transition cursor-pointer shrink-0 border ${
                                isActiveInfo
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                  : 'bg-slate-50 hover:bg-indigo-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              #{info.id}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSideBySideCompare(false)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10.5px] font-bold shrink-0 cursor-pointer"
                      >
                        Single Canvas ✕
                      </button>
                    </div>

                    {/* 50 / 50 Split Screen: Left = Reference PNG, Right = Editable Draw.io XML Vector Version */}
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
                      {/* LEFT COLUMN: Original Reference PNG Blueprint */}
                      <div className="bg-white rounded-2xl border border-slate-300/90 shadow-xl flex flex-col overflow-hidden min-h-0">
                        <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between gap-2 shrink-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 font-mono text-[10px] font-extrabold shrink-0">
                              1. REFERENCE PNG
                            </span>
                            <span className="text-xs font-bold truncate">
                              {selectedDiagramMode === 'infographic'
                                ? INFOGRAPHIC_BLUEPRINTS_LIST.find((i) => i.id === selectedInfographicBlueprintId)?.name ||
                                  `Infographic #${selectedInfographicBlueprintId}`
                                : `Blueprint #${selectedBlueprintId === 'custom' ? '52' : selectedBlueprintId}`}
                            </span>
                          </div>
                          <a
                            href={
                              selectedDiagramMode === 'infographic' || Number(selectedBlueprintId) >= 52
                                ? `/templates/${
                                    selectedDiagramMode === 'infographic'
                                      ? selectedInfographicBlueprintId
                                      : selectedBlueprintId
                                  }.png`
                                : `/images/${selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId}.png`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10.5px] font-mono font-bold text-sky-300 hover:text-sky-200 shrink-0"
                          >
                            ↗ Open Raw PNG
                          </a>
                        </div>
                        <div className="flex-1 min-h-0 relative overflow-hidden bg-slate-100/70">
                          <img
                            id="sbs-reference-png-img"
                            src={
                              selectedDiagramMode === 'infographic' || Number(selectedBlueprintId) >= 52
                                ? `/templates/${
                                    selectedDiagramMode === 'infographic'
                                      ? selectedInfographicBlueprintId
                                      : selectedBlueprintId
                                  }.png`
                                : `/images/${selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId}.png`
                            }
                            alt="Reference Infographic PNG"
                            className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-contain rounded-xl border border-slate-200 bg-white shadow-md"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/templates/52.png';
                            }}
                          />
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Editable Draw.io XML Vector Version */}
                      <div className="bg-white rounded-2xl border-2 border-indigo-500/80 shadow-xl flex flex-col overflow-hidden min-h-0">
                        <div className="px-4 py-2.5 bg-[#0B111E] text-white flex items-center justify-between gap-2 shrink-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono text-[10px] font-extrabold shrink-0">
                              2. DRAW.IO XML VECTOR ({selectedAbstractionLevel})
                            </span>
                            <span className="text-xs font-bold text-slate-200 truncate">
                              100% Editable mxGraphModel • Google Cloud Branded
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                latestInlineXmlRef.current = xml;
                                setIsInlineDrawioEdit(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10.5px] font-extrabold cursor-pointer transition"
                            >
                              ✎ Edit XML Inline
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 min-h-0 relative overflow-hidden bg-white">
                          <DiagramViewerRenderSafe
                            key={`sbs_canvas_${selectedBlueprintId}_${selectedInfographicBlueprintId}_${selectedAbstractionLevel}_${xml.length}`}
                            xml={xml}
                            minHeight={0}
                            bgTheme="light"
                            useCaseName={ast.metadata.projectTitle}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: zoomLevel > 1 ? 'top center' : 'center center',
                      transition: 'transform 0.15s ease-out'
                    }}
                    onClick={() => {
                      const spanner =
                        ast.components.find((c) => c.service === 'Cloud Spanner') || ast.components[0];
                      setSelectedComponent(spanner);
                      setIsRightGovernanceOpen(true);
                    }}
                    className="w-full max-w-[1440px] h-full min-h-[520px] m-auto bg-white rounded-2xl border border-slate-300/80 shadow-2xl relative overflow-hidden cursor-pointer flex-shrink-0"
                  >
                    <DiagramViewerRenderSafe
                      key={`studio_canvas_${selectedBlueprintId}_${activeVersionTag}_${xml.length}`}
                      xml={xml}
                      minHeight={0}
                      bgTheme="light"
                      useCaseName={ast.metadata.projectTitle}
                    />
                  </div>
                )}
              </div>
            </section>
          ) : (
            // VIEW 2: FULL LIVING SPECIFICATIONS WORKSPACE
            <LivingSpecsViewer
              specs={livingSpecs}
              activeDocId={activeDocId}
              onSelectDoc={(id) => setActiveDocId(id)}
              onSwitchToDiagramView={() => setActiveView('diagram')}
              onShareDoc={(doc) => handleOpenShare('doc', doc.id, `${doc.id}: ${doc.title}`)}
              currentXml={xml}
              projectName={ast.metadata.projectTitle}
              useCaseName={ast.metadata.domain}
              versionName={activeVersionTag}
              onSelectBlueprintById={handleSelectBlueprintById}
              grounding={specGrounding}
            />
          )}

          {/* RIGHT PANEL: GOVERNANCE INSPECTOR (Fixed 280px when open, Auto-Collapsed 0px in Launchpad Mode or when closed) */}
          <aside
            id="studio-right-governance-panel"
            data-testid="studio-right-governance-panel"
            style={{
              width: !isLaunchpadMode && isRightGovernanceOpen ? 280 : 0,
              minWidth: !isLaunchpadMode && isRightGovernanceOpen ? 280 : 0,
              maxWidth: !isLaunchpadMode && isRightGovernanceOpen ? 280 : 0
            }}
            className={`bg-white flex flex-col h-full min-h-0 overflow-hidden transition-all duration-200 z-20 ${
              !isLaunchpadMode && isRightGovernanceOpen
                ? 'w-[280px] border-l border-slate-200 shadow-sm opacity-100'
                : 'w-0 border-l-0 opacity-0 pointer-events-none'
            }`}
          >
            {!isLaunchpadMode && isRightGovernanceOpen && (
              <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span>Governance Inspector</span>
                  </div>
                  <button
                    onClick={() => setIsRightGovernanceOpen(false)}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Compliance Audit Score */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-800">
                      Compliance Audit Score
                    </span>
                    <span className="text-sm font-black font-mono text-emerald-700">98 / 100</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-snug">
                    Zero-Trust mTLS, Cloud KMS HSM CMEK, and Multi-Region Paxos DR verified.
                  </p>
                </div>

                {/* Selected Node Metadata */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    Active Node Metadata
                  </span>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900">
                      {selectedComponent?.name || ast.components[0]?.name || 'Cloud Spanner Primary'}
                    </div>
                    <div className="text-[11px] text-blue-600 font-mono font-semibold">
                      {selectedComponent?.service || ast.components[0]?.service || 'Cloud Spanner nam3'}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      SLA Target: <strong>{ast.metadata.slaTarget || '99.999%'}</strong> • RPO: &lt; 1s
                    </div>
                  </div>
                </div>

                {/* Living Spec Sync Docs */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    Living Spec Sync Docs ({livingSpecs.length})
                  </span>
                  <div className="space-y-1">
                    {livingSpecs.slice(0, 6).map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          setActiveDocId(doc.id);
                          setActiveView('specs');
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200 flex items-center justify-between transition cursor-pointer"
                      >
                        <span className="font-mono font-bold text-blue-600 text-[11px]">{doc.id}</span>
                        <span className="truncate text-slate-700 text-[11px] ml-2 flex-1">{doc.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* INLINE EXPANDABLE RIGHT-SIDE PANELS (Google Docs / Slides style — pushes center workspace without overlapping toolbars or documents) */}
          <ComponentInspectorDrawer
            component={selectedComponent}
            onClose={() => setSelectedComponent(null)}
            onAiRefinePrompt={(prompt) => handleExecutePrompt(prompt)}
            onShareNode={(node) => handleOpenShare('node', node.id, node.name)}
          />

          <BrainGroundingModal
            isOpen={isBrainModalOpen}
            onClose={() => setIsBrainModalOpen(false)}
            onAutoHeal={handleAutoHeal}
            isHealing={isHealing}
            currentXml={xml}
          />

          <AudioBriefingModal
            isOpen={isAudioModalOpen}
            onClose={() => setIsAudioModalOpen(false)}
            title={ast.metadata.projectTitle}
            ast={ast}
            currentXml={xml}
          />

          <ObjectShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            targetType={shareTargetType}
            targetId={shareTargetId}
            targetTitle={shareTargetTitle}
            projectTitle={ast.metadata.projectTitle}
            domain={ast.metadata.domain}
            activeVersionTag={activeVersionTag}
            activeDoc={livingSpecs.find((d) => d.id === activeDocId)}
            activeNode={selectedComponent}
          />

          <SaveToLibraryModal
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            onSaveSuccess={({ id, name, domain }) => {
              setIsSavedInLibrary(true);
              setSessionId(id);
              setAst((prev) => ({
                ...prev,
                metadata: {
                  ...prev.metadata,
                  projectTitle: name,
                  domain: domain
                }
              }));
            }}
            initialProjectTitle={ast.metadata.projectTitle}
            initialDomain={ast.metadata.domain}
            ast={ast}
            xml={xml}
            versions={versions}
            messages={messages}
            activeVersionTag={activeVersionTag}
          />

          <NewProjectModal
            isOpen={isNewProjectModalOpen}
            onClose={() => setIsNewProjectModalOpen(false)}
            onCreateProject={handleCreateNewProject}
          />

          <MajorVersionModal
            isOpen={isMajorVersionModalOpen}
            onClose={() => setIsMajorVersionModalOpen(false)}
            currentVersion={activeVersionTag}
            nextMajorVersion={getNextMajorVersion(activeVersionTag)}
            onConfirmMajorVersion={handleConfirmMajorVersion}
          />

          {/* GOOGLE DOCS / SLIDES-STYLE RIGHT-EDGE COMPANION ACTION RAIL (w-11, non-blocking input panels) */}
          <aside
            id="studio-right-companion-rail"
            data-testid="studio-right-companion-rail"
            aria-label="Workspace Right Companion Rail"
            className="w-11 shrink-0 bg-white border-l border-slate-200 flex flex-col items-center py-3 gap-2 z-50 select-none shadow-2xs"
          >
            <button
              id="right-rail-share-btn"
              data-testid="right-rail-share-btn"
              onClick={() => handleToggleRightCompanionPanel('share')}
              title="Share & Comments Panel (Right Slide-Out)"
              aria-label="Toggle Share & Comments Right Panel"
              aria-expanded={isShareModalOpen}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer ${
                isShareModalOpen
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              id="right-rail-new-project-btn"
              data-testid="right-rail-new-project-btn"
              onClick={() => handleToggleRightCompanionPanel('new')}
              title="Create Project / Vision Decompile Panel (Right Slide-Out)"
              aria-label="Toggle Create Project Right Panel"
              aria-expanded={isNewProjectModalOpen}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer ${
                isNewProjectModalOpen
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-200'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              id="right-rail-save-btn"
              data-testid="right-rail-save-btn"
              onClick={() => handleToggleRightCompanionPanel('save')}
              title="Save Blueprint to Library Panel (Right Slide-Out)"
              aria-label="Toggle Save to Library Right Panel"
              aria-expanded={isSaveModalOpen}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer ${
                isSaveModalOpen
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-200'
                  : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              id="right-rail-major-version-btn"
              data-testid="right-rail-major-version-btn"
              onClick={() => handleToggleRightCompanionPanel('major')}
              title="Tag Major Version Milestone Panel (Right Slide-Out)"
              aria-label="Toggle Tag Major Version Right Panel"
              aria-expanded={isMajorVersionModalOpen}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer ${
                isMajorVersionModalOpen
                  ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-200'
                  : 'text-slate-600 hover:bg-teal-50 hover:text-teal-600'
              }`}
            >
              <Tag className="w-4 h-4" />
            </button>

            <div className="w-6 h-px bg-slate-200 my-1" />

            <button
              id="right-rail-brain-btn"
              data-testid="right-rail-brain-btn"
              onClick={() => handleToggleRightCompanionPanel('brain')}
              title="Architecture Brain Grounding Panel (Right Slide-Out)"
              aria-label="Toggle Architecture Brain Right Panel"
              aria-expanded={isBrainModalOpen}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer ${
                isBrainModalOpen
                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-200'
                  : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <Cpu className="w-4 h-4" />
            </button>

            <button
              id="right-rail-audio-btn"
              data-testid="right-rail-audio-btn"
              onClick={() => handleToggleRightCompanionPanel('audio')}
              title="Executive Audio Briefing Panel (Right Slide-Out)"
              aria-label="Toggle Audio Briefing Right Panel"
              aria-expanded={isAudioModalOpen}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer ${
                isAudioModalOpen
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-200'
                  : 'text-slate-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              id="right-rail-governance-btn"
              data-testid="right-rail-governance-btn"
              onClick={() => handleToggleRightCompanionPanel('governance')}
              title="Governance & Compliance Inspector (280px Inline Right Panel)"
              aria-label="Toggle Governance Inspector Right Panel"
              aria-expanded={!isLaunchpadMode && isRightGovernanceOpen}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer mt-auto ${
                !isLaunchpadMode && isRightGovernanceOpen
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-200'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <Shield className="w-4 h-4" />
            </button>
          </aside>
        </main>

        {/* 3. FOOTER STATUS BAR (v2.2 Section 3) */}
        <footer className="h-7 px-4 bg-[#0B111E] border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <span>
              Engine: <strong className="text-slate-200">Draw.io mxGraph</strong>
            </span>
            <span>|</span>
            <span>
              Intent: <strong className="text-blue-400 uppercase">{selectedIntentChip}</strong>
            </span>
            <span>|</span>
            <span>
              Layout: <strong className="text-slate-200">Top-Down (16:9)</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              Mode:{' '}
              <strong className="text-emerald-400">
                {isLaunchpadMode
                  ? 'Inline Launchpad (Drawers 0px)'
                  : isCanvasLocked
                  ? 'Locked (Read-Only)'
                  : 'Active Canvas'}
              </strong>
            </span>
            <span>|</span>
            <span>
              Version: <strong className="text-white">{activeVersionTag} (Saved)</strong>
            </span>
          </div>
        </footer>
      </div>

      {/* 4. BLUEPRINT CATALOG SLIDE-OVER DRAWER */}
      <BlueprintCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectBlueprint={handleSelectBlueprint}
        onOpenInNewTab={handleOpenBlueprintInNewTab}
        currentBlueprintId={selectedBlueprintId}
        currentDomainPresetId={selectedDomain}
        theme="light"
      />

      {/* 5. GMAIL-STYLE SAME-SCREEN CLOUD VIEWER MODAL (SLIDES / DOCS / PDF) */}
      {cloudViewerModalMode && (
        <GoogleWorkspaceDirectOpenModal
          isOpen={Boolean(cloudViewerModalMode)}
          onClose={() => setCloudViewerModalMode(null)}
          mode={cloudViewerModalMode}
          xmlContent={xml}
          diagramName={ast.metadata.projectTitle || 'Enterprise Architecture'}
          blueprintId={`#${selectedBlueprintId === 'custom' ? '01' : selectedBlueprintId}`}
        />
      )}
    </div>
  );
}
