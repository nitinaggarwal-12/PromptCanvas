'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
import { createDefaultFintechAst, ArchitectureAst, AstComponent } from '@/lib/ast/architectureAst';
import { generateAll10LivingSpecs, LivingSpecDocument } from '@/lib/spec/livingSpecsGenerator';
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
  const match = currentVersion.match(/^v?(\d+)\.(\d+)$/);
  if (match) {
    const major = parseInt(match[1], 10);
    const minor = parseInt(match[2], 10);
    return `v${major}.${minor + 1}`;
  }
  return `${currentVersion}.1`;
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
3. **52 Canonical Certified Blueprints**: Pre-engineered Google Cloud reference topologies covering event streaming, multi-region lakehouses, Vertex AI RAG hubs, and Zero-Trust perimeters.
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
- **Live Governance**: All DR parameters and SLA commitments (99.999%) are continuously audited in **DOC-08 (Disaster Recovery & BCDR Plan)**.`;
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

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-mono text-xs">Loading Architecture Studio...</div>}>
      <StudioMain />
    </Suspense>
  );
}

function StudioMain() {
  const searchParams = useSearchParams();

  // 1. Session Mode: Showcase Mode (Default) vs Active Canvas Editor Mode
  const [isEditorMode, setIsEditorMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const urlId = new URLSearchParams(window.location.search).get('id');
    return Boolean(urlId && urlId !== 'reference_showcase');
  });

  const [sessionId, setSessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'reference_showcase';
    return new URLSearchParams(window.location.search).get('id') || 'reference_showcase';
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const urlId = new URLSearchParams(window.location.search).get('id');
    if (urlId && urlId !== 'reference_showcase') {
      setSessionId(urlId);
      setIsEditorMode(true);
    } else {
      setSessionId('reference_showcase');
      setIsEditorMode(false);
    }
  }, []);

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

  // Handle Concierge Question Submit
  const handleConciergeSubmit = (queryText: string) => {
    if (!queryText.trim()) return;
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

    if (isEditorMode) {
      setActiveVersionTag(`#${blueprint.id}`);
      setVersions(prev => [
        {
          id: `bp_${blueprint.id}_${Date.now()}`,
          versionTag: `#${blueprint.id}`,
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
            versionTag: `#${blueprint.id}`,
            canvasDiff: `Rendered ${blueprint.keyComponents?.length || 12} components across ${blueprint.family} architecture.`,
            specDiff: `Reconciled DOC-01 through DOC-16 for ${domainPreset.prefix}.`
          }
        }
      ]);
    } else {
      setConciergeMessages(prev => [
        ...prev,
        {
          id: `c_bp_${Date.now()}`,
          sender: 'assistant',
          text: `Switched reference showcase to **Canonical Blueprint #${blueprint.id}: ${blueprint.name}** (${blueprint.family} Family). Synchronized 16 Living Specifications. To edit or customize this topology, click **"+ New Canvas"** or **"Fork & Edit"** above.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [ast.components, isEditorMode]);

  const handleSelectBlueprintById = useCallback((templateId: string) => {
    const norm = templateId.padStart(2, '0');
    const bp = CANONICAL_TEMPLATES.find(t => t.id === norm || t.id === templateId) || CANONICAL_TEMPLATES[0];
    handleSelectBlueprint(bp, selectedDomain);
  }, [handleSelectBlueprint, selectedDomain]);

  const handleOpenShare = useCallback((type: 'project' | 'doc' | 'node' | 'version', id: string, title: string) => {
    setShareTargetType(type);
    setShareTargetId(id);
    setShareTargetTitle(title);
    setIsShareModalOpen(true);
  }, []);

  // Hydrate State from URL Deep-Link parameters and localStorage on initial mount
  useEffect(() => {
    if (!searchParams) return;
    const urlId = searchParams.get('id');
    const viewParam = searchParams.get('view');
    const docParam = searchParams.get('doc');
    const nodeParam = searchParams.get('node');
    const vParam = searchParams.get('v');

    if (urlId && urlId !== 'reference_showcase') {
      setSessionId(urlId);
      setIsEditorMode(true);
      try {
        const saved = localStorage.getItem(`promptcanvas_studio_${urlId}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.ast) setAst(parsed.ast);
          if (parsed.xml) setXml(parsed.xml);
          if (parsed.versions) setVersions(parsed.versions);
          if (parsed.messages) setMessages(parsed.messages);
          if (parsed.activeVersionTag) setActiveVersionTag(parsed.activeVersionTag);
        }
      } catch {
        // storage fallback
      }
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
    if (vParam) {
      setActiveVersionTag(vParam);
    }
  }, [searchParams]);

  // Synchronize browser URL & LocalStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isEditorMode) {
      const params = new URLSearchParams();
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
  }, [isEditorMode, sessionId, activeView, activeDocId, selectedComponent, activeVersionTag, ast, xml, versions, messages]);

  // Living Specs derived from AST
  const livingSpecs = useMemo(() => generateAll10LivingSpecs(ast), [ast]);

  // Handle Co-Pilot Prompt Execution with Dynamic Micro-Versioning (v1.0 -> v1.1 -> v1.2)
  const handleExecutePrompt = useCallback((promptText: string, explicitPersona?: string) => {
    if (!promptText.trim()) return;

    if (!isEditorMode) {
      setIsEditorMode(true);
    }

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

    const userMsg: StudioChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setPromptInput('');

    const intentResult = classifyChatIntent(cleanPrompt);

    if (intentResult.intent !== 'mutation') {
      let replyText = '';
      if (intentResult.intent === 'greeting') {
        replyText = `👋 Hello! I'm ArcAssist, your Studio Enterprise Architecture Co-Pilot. I can help evolve your architecture diagram, reconcile DOC-01 through DOC-10 living specifications, and synthesize Google Cloud topologies across all 6 tiers.\n\nTry asking me to:\n• "Add Redis cache layer between API and database"\n• "Enforce Multi-Region HA with Spanner and Cloud Armor"\n• "Add Cloud CDN and Kafka Event Mesh"`;
      } else if (intentResult.intent === 'identity') {
        replyText = `🤖 I am ArcAssist, the AI Co-Pilot in PromptCanvas Studio. I specialize in bidirectional synchronization between visual Draw.io diagrams and living engineering specifications (PRDs, ADRs, Threat Models, DDL). I support 4 architectural personas: Product Manager, Lead Cloud Architect, CISO / Security Architect, and FinOps & SRE Lead.`;
      } else if (intentResult.intent === 'conversational') {
        replyText = `You're welcome! Let me know when you'd like to evolve this architecture or run an audit.`;
      } else {
        replyText = `I can answer architectural questions about ${ast.metadata.projectTitle || 'this cloud topology'}. To mutate the diagram or bump versions, provide an architectural instruction like "Add Cloud Run service", "Configure multi-region failover", or "Enforce CMEK encryption".`;
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

    // Micro-Version Bump: v1.0 -> v1.1, v1.1 -> v1.2, or v2.0 -> v2.1
    setTimeout(() => {
      const newVersionTag = getNextMicroVersion(activeVersionTag);
      
      let canvasDiff = 'Updated component topology and connector routing in Draw.io XML.';
      let specDiff = 'Reconciled DOC-01 through DOC-10 with updated parameters.';

      setAst(prevAst => {
        const updated = { ...prevAst };
        const lower = cleanPrompt.toLowerCase();

        if (lower.includes('4 more') || lower.includes('4 component') || (lower.includes('cdn') && (lower.includes('vault') || lower.includes('kafka') || lower.includes('doc')))) {
          const newComps: AstComponent[] = [
            {
              id: 'comp_cdn',
              name: 'Cloud CDN & Media Edge',
              service: 'Cloud CDN',
              tier: 'ingress',
              region: 'global',
              role: 'Global Anycast Edge Cache & HTTP/3 Ingress',
              description: 'Low-latency static and dynamic media caching with sub-8ms p99 cache hits.',
              sla: '99.99%',
              protocols: ['HTTP/3', 'QUIC', 'TLS 1.3']
            },
            {
              id: 'comp_token_vault',
              name: 'Payment Token Vault',
              service: 'Cloud Run',
              tier: 'compute',
              region: 'us-central1',
              role: 'Confidential Computing Tokenization Enclave',
              description: 'Hardware-isolated microservice for PCI-DSS Level 1 tokenization.',
              sla: '99.999%',
              protocols: ['gRPC mTLS', 'Cloud KMS API']
            },
            {
              id: 'comp_event_bus',
              name: 'Kafka Event Mesh Buffer',
              service: 'Pub/Sub',
              tier: 'data',
              region: 'us-central1',
              role: 'Asynchronous Financial Event Distribution Engine',
              description: 'Partitioned event stream handling 250,000 tx/sec burst throughput.',
              sla: '99.999%',
              protocols: ['Kafka Protocol', 'Pub/Sub gRPC']
            },
            {
              id: 'comp_doc_ai',
              name: 'Document AI OCR Extractor',
              service: 'Document AI',
              tier: 'compute',
              region: 'us-central1',
              role: 'Multimodal Identity & Document Parsing',
              description: 'Automated KYC extraction pipeline converting image payloads to structured JSON.',
              sla: '99.9%',
              protocols: ['HTTPS REST', 'gRPC']
            }
          ];

          updated.components = [...updated.components, ...newComps];
          canvasDiff = '+ Added Cloud CDN, Payment Token Vault, Kafka Event Mesh, and Document AI OCR Extractor (4 new nodes).';
          specDiff = 'Reconciled DOC-03 (System Architecture), DOC-04 (API Protocols), and DOC-06 (Security Model).';
        } else if (detectedPersona === 'Product Manager' || lower.includes('patient') || lower.includes('engagement') || lower.includes('admission')) {
          updated.metadata = {
            ...updated.metadata,
            domain: 'Healthcare & Life Sciences',
            projectTitle: 'Emergency Patient Ingress & Care Mesh',
            slaTarget: '99.999%',
            lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          if (!updated.components.some(c => c.id === 'comp_patient_portal')) {
            updated.components = [
              ...updated.components,
              {
                id: 'comp_patient_portal',
                name: 'Emergency Patient Ingress Portal',
                service: 'Cloud Run',
                tier: 'ingress',
                region: 'us-central1',
                role: 'High-Priority Emergency Admission Gateway',
                description: 'Fast-track triage ingress with zero cold-starts and 99.999% SLA.',
                sla: '99.999%',
                protocols: ['HTTPS', 'FHIR API', 'TLS 1.3']
              }
            ];
          }
          canvasDiff = '+ Added Emergency Patient Ingress Portal (Cloud Run) with 99.999% SLA gateway.';
          specDiff = 'Reconciled DOC-01 (Product Vision), DOC-02 (Personas), and DOC-04 (Architecture Overview).';
        } else if (detectedPersona === 'Lead Cloud Architect' || lower.includes('spanner') || lower.includes('multi-region') || lower.includes('dr') || lower.includes('rpo')) {
          updated.metadata = {
            ...updated.metadata,
            drRegions: ['europe-west1', 'us-east4'],
            targetRpo: '< 1 Second (Zero Data Loss)',
            targetRto: '< 15 Seconds (Automated Failover)',
            lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          updated.components = updated.components.map(c => {
            if (c.service.includes('Spanner') || c.id.includes('spanner')) {
              return {
                ...c,
                role: 'Active-Active Multi-Region nam3 Leader with Witness in europe-west1',
                description: 'Synchronous Paxos replication across us-central1 and europe-west1 with 99.999% SLA.'
              };
            }
            return c;
          });
          canvasDiff = '⚡ Upgraded Cloud Spanner to Active-Active Multi-Region nam3 with Witness in europe-west1.';
          specDiff = 'Reconciled DOC-03 (System Architecture), DOC-05 (Infrastructure & DDL), and DOC-08 (Disaster Recovery).';
        } else if (detectedPersona === 'CISO / Security Architect' || lower.includes('security') || lower.includes('ciso') || lower.includes('hsm') || lower.includes('cmek') || lower.includes('vpc')) {
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
          specDiff = 'Reconciled DOC-06 (Security & Threat Model) and DOC-10 (Compliance & Audit Matrix).';
        } else if (detectedPersona === 'FinOps & SRE Lead' || lower.includes('finops') || lower.includes('cost') || lower.includes('autoscaling') || lower.includes('sre')) {
          updated.metadata = {
            ...updated.metadata,
            latencyBudgetMs: 35,
            lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          canvasDiff = '💰 Configured Cloud Run scale-to-zero off-peak policies & BigQuery BI Engine 50GB cache.';
          specDiff = 'Reconciled DOC-07 (SRE & Observability Runbook) and DOC-09 (FinOps & Cost Optimization).';
        }

        const updatedXml = generateGcpNativeArchitectureXml(
          { projectTitle: updated.metadata.projectTitle, domain: updated.metadata.domain },
          updated
        );
        setXml(updatedXml);

        const aiMsg: StudioChatMessage = {
          id: `msg_${Date.now() + 1}`,
          sender: 'assistant',
          text: `[${detectedPersona} Persona Refinement]: Applied updates for "${cleanPrompt.slice(0, 75)}..."`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionSummary: {
            versionTag: newVersionTag,
            canvasDiff,
            specDiff
          }
        };

        setMessages(prev => [...prev, aiMsg]);
        setActiveVersionTag(newVersionTag);

        const newSnapshot: StudioVersionSnapshot = {
          id: `v_${Date.now()}`,
          versionTag: newVersionTag,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          author: detectedPersona,
          actionSummary: `${detectedPersona}: ${cleanPrompt}`,
          ast: updated,
          xml: updatedXml
        };

        setVersions(prev => [...prev, newSnapshot]);
        return updated;
      });
    }, 600);
  }, [activeVersionTag, isEditorMode]);

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

  // Open in diagrams.net Web Editor
  const handleOpenDiagramsNet = () => {
    const encoded = encodeURIComponent(xml);
    window.open(`https://app.diagrams.net/#R${encoded}`, '_blank');
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

    if (config.customXml) {
      newXml = config.customXml;
      setSelectedBlueprintId('custom');
    } else if (config.blueprintId !== 'blank' && config.blueprintId !== '00') {
      const bp = CANONICAL_TEMPLATES.find(t => t.id === config.blueprintId);
      if (bp) {
        setSelectedBlueprintId(bp.id);
        newXml = bp.generateXml(config.domain, 'light');
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
        {/* 1. CONSOLIDATED HIGH-CONTRAST HEADER (56px) */}
        <header className="dark w-full h-14 flex-shrink-0 bg-[#0B111E] border-b border-slate-800 px-4 md:px-6 flex items-center justify-between z-40 shadow-md">
        
        {/* Left: Brand, Project Title, Mode Badge, Blueprint & Version */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 shrink-0">
            {/* Small screen home link only (desktop has UnifiedAppSidebar) */}
            <Link 
              href="/" 
              className="lg:hidden w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/20 hover:scale-105 transition shrink-0"
              title="Return to PromptCanvas Home"
            >
              PC
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm text-white tracking-tight leading-none truncate max-w-[130px] sm:max-w-[180px] lg:max-w-[230px]">
                {ast.metadata.projectTitle}
              </h1>

              {/* Mode Badge: Showcase vs Active Editor */}
              {!isEditorMode ? (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-sky-300 bg-sky-950/80 border border-sky-500/40 px-2 py-0.5 rounded-full font-bold">
                  <Eye className="w-3 h-3 text-sky-400" />
                  <span>Showcase (Read-Only)</span>
                </span>
              ) : isSavedInLibrary ? (
                <Link 
                  href="/library" 
                  className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold transition"
                  title="View saved blueprint in Architecture Library"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Saved</span>
                </Link>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Active Canvas</span>
                </span>
              )}
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block shrink-0" />

          {/* Canonical Blueprint Catalog Selector */}
          <button
            onClick={() => setIsCatalogOpen(true)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-100 transition shadow-xs cursor-pointer shrink-0"
            title="Open 52 Canonical Architecture Blueprints Catalog"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="font-mono font-bold text-white">#{selectedBlueprintId}</span>
            <span className="hidden xl:inline text-slate-300 truncate max-w-[100px]">
              {CANONICAL_TEMPLATES.find(t => t.id === selectedBlueprintId)?.name || 'GCP Arch'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          {/* Version Snapshot Dropdown */}
          <div className="relative shrink-0">
            <button 
              onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs text-slate-200 transition font-mono font-bold cursor-pointer"
              title={isEditorMode ? "View Version History Snapshots" : "Showcase Version (Read-Only)"}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{activeVersionTag}{!isEditorMode ? ' (Ref)' : ''}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isVersionDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1.5 animate-in fade-in duration-100">
                {isEditorMode ? (
                  <>
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
                      {versions.map(v => (
                        <button
                          key={v.id}
                          onClick={() => {
                            setActiveVersionTag(v.versionTag);
                            if (v.ast) setAst(v.ast);
                            if (v.xml) setXml(v.xml);
                            setIsVersionDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg transition flex items-start gap-2 ${
                            v.versionTag === activeVersionTag ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30' : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-mono font-bold text-[10px] bg-slate-800 text-slate-200 border border-slate-700 px-1 py-0.2 rounded mt-0.5">{v.versionTag}</span>
                          <div className="flex-1 min-w-0">
                            <div className="truncate text-[11px] text-white font-medium">{v.actionSummary}</div>
                            <div className="text-[9px] text-slate-400 font-mono">{v.timestamp} • {v.author}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="p-3 text-slate-300 space-y-2">
                    <div className="text-xs font-bold text-white">Reference Blueprint (Read-Only)</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      You are viewing the certified ground-truth reference architecture. Version snapshots and AI modifications activate inside a dedicated Canvas.
                    </p>
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsVersionDropdownOpen(false);
                          setIsNewProjectModalOpen(true);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-lg text-center text-xs transition cursor-pointer"
                      >
                        + New Canvas
                      </button>
                      <button
                        onClick={() => {
                          setIsVersionDropdownOpen(false);
                          handleForkBlueprint();
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-1.5 px-2.5 rounded-lg text-xs transition cursor-pointer"
                      >
                        Fork &amp; Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* + New Canvas Button (Prominent Header CTA) */}
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-blue-500/25 hover:scale-[1.02] transition shrink-0 cursor-pointer"
            title="Create brand new architecture canvas with unique ID & AI Co-Pilot"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New</span>
          </button>

          {/* Fork & Edit Button (Shown in Showcase Mode) */}
          {!isEditorMode && (
            <button
              onClick={handleForkBlueprint}
              className="hidden lg:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer"
              title="Clone this reference blueprint into an active editing session"
            >
              <Copy className="w-3 h-3 text-blue-400" />
              <span>Fork &amp; Edit</span>
            </button>
          )}

        </div>

        {/* Center: 2-Way View Switcher (Zero-Wrap) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner shrink-0 mx-2">
          <button
            onClick={() => setActiveView('diagram')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'diagram' ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' : 'text-slate-300 hover:text-white font-medium'
            }`}
          >
            <span>📐</span> <span>Architecture Diagram</span>
          </button>
          
          <button
            onClick={() => setActiveView('specs')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'specs' ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' : 'text-slate-300 hover:text-white font-medium'
            }`}
          >
            <span>📑</span> <span>Living Specs ({livingSpecs.length})</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </button>
        </div>

        {/* Right: Consolidated High-Contrast Actions & Tools */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Secondary Tools: Inline on 2xl+ screens */}
          <div className="hidden 2xl:flex items-center gap-2">
            {isEditorMode && (
              <button
                onClick={() => setIsMajorVersionModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 px-2.5 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer"
                title="Tag and lock a major milestone release"
              >
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save Major {getNextMajorVersion(activeVersionTag)}</span>
              </button>
            )}

            <button
              onClick={() => handleOpenShare('project', 'proj_root', ast.metadata.projectTitle)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer"
              title="Share & Collaborate"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Share</span>
            </button>

            <button
              onClick={() => setIsAudioModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer"
              title="Generate Audio Briefing"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audio</span>
            </button>

            <button
              onClick={() => setIsBrainModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer"
              title="Ground Architecture Brain"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Brain ▾</span>
            </button>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-1 rounded-md font-mono font-bold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>In-Sync</span>
            </div>
          </div>

          {/* Consolidated Tools Dropdown for < 2xl screens */}
          <div className="relative 2xl:hidden">
            <button
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
              title="More Actions & Tools"
            >
              <MoreHorizontal className="w-4 h-4 text-slate-300" />
              <span className="hidden md:inline">Tools</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isToolsDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1 animate-in fade-in duration-100">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold px-2 py-1">Collaborate & Tools</div>
                
                {isEditorMode && (
                  <button
                    onClick={() => {
                      setIsMajorVersionModalOpen(true);
                      setIsToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-emerald-300 font-medium flex items-center gap-2.5 transition cursor-pointer"
                  >
                    <Tag className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tag Major {getNextMajorVersion(activeVersionTag)}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    handleOpenShare('project', 'proj_root', ast.metadata.projectTitle);
                    setIsToolsDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2.5 transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Share & Collaborate</span>
                </button>
                
                <button
                  onClick={() => {
                    setIsAudioModalOpen(true);
                    setIsToolsDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2.5 transition cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Audio Briefing (2-Min)</span>
                </button>
                
                <button
                  onClick={() => {
                    setIsBrainModalOpen(true);
                    setIsToolsDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2.5 transition cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Ground Brain Context</span>
                </button>

                <div className="border-t border-slate-800 my-1"></div>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sessionId);
                    setIsToolsDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 font-mono text-[11px] flex items-center justify-between transition cursor-pointer"
                  title="Click to copy Session ID"
                >
                  <span className="text-slate-400 font-sans">Session:</span>
                  <span className="text-blue-400 font-bold truncate max-w-[120px]">{sessionId}</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary: Save to Library */}
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-sm whitespace-nowrap cursor-pointer ${
              isSavedInLibrary
                ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
            }`}
            title="Save this architecture sandbox state as a permanent blueprint in your Library"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSavedInLibrary ? 'Saved' : 'Save to Library'}</span>
          </button>

          {/* Primary: Export Bundle Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-white/80" />
            </button>

            {isExportDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1 animate-in fade-in duration-100">
                <button
                  onClick={() => {
                    handleOpenDiagramsNet();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2 transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>Open in diagrams.net</span>
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
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download Draw.io XML</span>
                </button>
                <button
                  onClick={() => {
                    handleExportMarkdownBundle();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2 transition cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download 16-Spec Bundle</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 min-h-0 w-full flex overflow-hidden">
        
        {/* LEFT PANEL: CONCIERGE (SHOWCASE) OR CO-PILOT (EDITOR) */}
        {!isEditorMode ? (
          
          // SHOWCASE MODE: ARCASSIST CONCIERGE (Read-Only Guide & Cloud Q&A)
          <section className="w-[350px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full min-h-0 overflow-hidden shadow-sm z-10">
            
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>ArcAssist Concierge</span>
              </div>
              <span className="text-[10px] text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold">
                Platform Guide
              </span>
            </div>

            {/* Showcase Call to Action Card */}
            <div className="p-3 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50/70 flex-shrink-0 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  Ready to Build?
                </span>
                <span className="text-[9px] bg-blue-200/70 text-blue-900 font-bold px-1.5 py-0.5 rounded-full">
                  Interactive AI
                </span>
              </div>
              <p className="text-[11px] text-slate-700 leading-snug">
                This diagram is a read-only showcase. Create your own canvas or fork this blueprint to edit with AI Co-Pilot.
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-2.5 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ New Canvas</span>
                </button>
                <button
                  onClick={handleForkBlueprint}
                  className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold py-1.5 px-2.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                  title="Fork this blueprint into your own sandbox"
                >
                  <Copy className="w-3 h-3 text-slate-600" />
                  <span>Fork</span>
                </button>
              </div>
            </div>

            {/* Quick Architecture Q&A Chips */}
            <div className="p-2.5 border-b border-slate-200 bg-slate-50/60 flex-shrink-0 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Ask Concierge:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { text: 'What can this tool do?', icon: '💡' },
                  { text: 'How do I create and version a diagram?', icon: '🚀' },
                  { text: 'Explain Zero-Trust & CMEK security', icon: '🛡️' },
                  { text: 'What are GCP Multi-Region DR patterns?', icon: '🌐' },
                  { text: 'How do Living Specs stay synchronized?', icon: '📑' }
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleConciergeSubmit(q.text)}
                    className="w-full text-left p-1.5 rounded-md bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-[11px] text-slate-800 hover:text-blue-900 transition flex items-center gap-1.5 font-medium shadow-2xs cursor-pointer"
                  >
                    <span>{q.icon}</span>
                    <span className="truncate">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Concierge Message Stream */}
            <div ref={conciergeScrollRef} className="flex-1 min-h-0 overflow-y-auto p-3.5 space-y-3 text-xs">
              {conciergeMessages.map(msg => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`rounded-xl p-3 space-y-1.5 ${
                      isUser ? 'bg-blue-50/90 border border-blue-300' : 'bg-white border border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`font-bold ${isUser ? 'text-blue-900' : 'text-slate-900'}`}>
                        {isUser ? '👤 You asked:' : '🤖 Concierge Guide:'}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 font-semibold">{msg.timestamp}</span>
                    </div>
                    <div className={`text-[11.5px] leading-relaxed whitespace-pre-line ${isUser ? 'text-slate-900 font-semibold' : 'text-slate-800'}`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Concierge Sticky Composer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50/60 space-y-2 flex-shrink-0">
              <div className="relative">
                <textarea
                  value={conciergeInput}
                  onChange={e => setConciergeInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleConciergeSubmit(conciergeInput);
                    }
                  }}
                  rows={2}
                  placeholder="Ask about capabilities, how to use, or cloud patterns..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none shadow-sm"
                />
                <button
                  onClick={() => handleConciergeSubmit(conciergeInput)}
                  className="absolute bottom-2.5 right-2 px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold shadow transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Ask</span>
                  <Send className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>Mode: <strong className="text-purple-700 font-bold">Platform Guide</strong></span>
                <span>Diagram is Read-Only</span>
              </div>
            </div>

          </section>

        ) : (

          // EDITOR MODE: ARCASSIST CO-PILOT (Interactive AI Evolution & Micro-Versioning)
          <section className="w-[350px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full min-h-0 overflow-hidden shadow-sm z-10">
            
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>ArcAssist Co-Pilot</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-emerald-900 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  Gemini 3.1 Pro • DeepMind
                </span>
                <span className="font-mono text-[10px] text-slate-500 font-bold">
                  {activeVersionTag}
                </span>
              </div>
            </div>

            {/* Stakeholder Personas Simulator */}
            <div className="p-3 border-b border-slate-200 bg-slate-50 space-y-2 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Simulate Stakeholders:</span>
                <span className="text-[9px] bg-purple-100 text-purple-900 font-bold px-1.5 py-0.5 rounded-full border border-purple-200">Micro-Version Diff</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleExecutePrompt('Add real-time patient engagement portal and emergency admission SLA tracking with 99.999% availability.', 'Product Manager')}
                  className="text-left p-1.5 rounded-md bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-400 text-[11px] text-slate-900 hover:text-blue-900 transition flex items-center gap-1.5 font-semibold shadow-2xs cursor-pointer"
                  title="Simulate Product Manager requirements update"
                >
                  <span>👔</span>
                  <span className="truncate">Product Manager</span>
                </button>
                <button
                  onClick={() => handleExecutePrompt('Upgrade Cloud Spanner to multi-region nam3 dual-leader replication across europe-west1 and us-central1 with RPO < 1s.', 'Lead Cloud Architect')}
                  className="text-left p-1.5 rounded-md bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-400 text-[11px] text-slate-900 hover:text-indigo-900 transition flex items-center gap-1.5 font-semibold shadow-2xs cursor-pointer"
                  title="Simulate Lead Architect Multi-Region DR upgrade"
                >
                  <span>🏗️</span>
                  <span className="truncate">Lead Architect</span>
                </button>
                <button
                  onClick={() => handleExecutePrompt('Enforce Cloud KMS HSM CMEK keys, Cloud Armor OWASP rules, and VPC Service Controls perimeter.', 'CISO / Security Architect')}
                  className="text-left p-1.5 rounded-md bg-white hover:bg-purple-50 border border-slate-300 hover:border-purple-400 text-[11px] text-slate-900 hover:text-purple-900 transition flex items-center gap-1.5 font-semibold shadow-2xs cursor-pointer"
                  title="Simulate CISO Security & Zero-Trust hardening"
                >
                  <span>🛡️</span>
                  <span className="truncate">CISO / Security</span>
                </button>
                <button
                  onClick={() => handleExecutePrompt('Implement Cloud Run scale-to-zero during off-peak windows and BigQuery BI Engine 50GB memory reservation.', 'FinOps & SRE Lead')}
                  className="text-left p-1.5 rounded-md bg-white hover:bg-emerald-50 border border-slate-300 hover:border-emerald-400 text-[11px] text-slate-900 hover:text-emerald-900 transition flex items-center gap-1.5 font-semibold shadow-2xs cursor-pointer"
                  title="Simulate FinOps & SRE cost & performance optimization"
                >
                  <span>💰</span>
                  <span className="truncate">FinOps & SRE</span>
                </button>
              </div>
            </div>

            {/* Messages Scroll Stream */}
            <div ref={editorScrollRef} className="flex-1 min-h-0 overflow-y-auto p-3.5 space-y-3.5 text-xs">
              {messages.map(msg => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={msg.id}
                    className={`rounded-xl p-3 space-y-1.5 ${
                      isUser ? 'bg-blue-50/90 border border-blue-300' : 'bg-white border border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`font-bold ${isUser ? 'text-blue-900' : 'text-slate-900'}`}>
                        {isUser ? '👤 You asked:' : '🤖 ArcAssist Synthesis:'}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 font-semibold">{msg.timestamp}</span>
                    </div>
                    
                    <p className={`text-[11.5px] leading-relaxed ${isUser ? 'text-slate-900 font-semibold' : 'text-slate-800'}`}>
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
            </div>

            {/* Sticky Co-Pilot Composer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50/60 space-y-2 flex-shrink-0">
              <div className="relative">
                <textarea
                  value={promptInput}
                  onChange={e => setPromptInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleExecutePrompt(promptInput);
                    }
                  }}
                  rows={2}
                  placeholder="Ask ArcAssist to edit diagram or update specs..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none shadow-sm"
                />
                <button
                  onClick={() => handleExecutePrompt(promptInput)}
                  className="absolute bottom-2.5 right-2 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply</span>
                  <Send className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Target: <strong className="text-blue-600">Both (In-Sync)</strong></span>
                <span>Bumps micro-version ↵</span>
              </div>
            </div>

          </section>

        )}

        {/* RIGHT: TOGGLED VIEW (Diagram Canvas OR Living Specs) */}
        {activeView === 'diagram' ? (
          
          // VIEW 1: FULL 16:9 DIAGRAM CANVAS
          <section className="flex-1 min-h-0 h-full bg-[#F1F5F9] flex flex-col relative overflow-hidden">
            
            {/* Inset Canvas Toolbar */}
            <div className="px-6 py-2 border-b border-slate-200 bg-white flex items-center justify-between text-xs flex-shrink-0">
              
              {!isEditorMode ? (
                // Showcase View Toolbar Notice
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md">
                    <Eye className="w-3.5 h-3.5 text-sky-600" />
                    <span>Reference Topology (Read-Only Showcase)</span>
                  </span>
                  <span className="text-slate-600 text-[11px] hidden xl:inline">
                    Explore Google Cloud reference patterns. Click any node to inspect SLAs &amp; Terraform HCL.
                  </span>
                </div>
              ) : (
                // Editor View Toolbar Controls
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-slate-100 border border-slate-300 px-2 py-1 rounded-md text-slate-800 font-medium">
                    <button onClick={() => handleExecutePrompt('Add a new Cloud Armor WAF security policy layer.')} className="px-1.5 hover:text-blue-600 font-bold cursor-pointer">+ Add Node</button>
                    <span className="text-slate-400">|</span>
                    <button onClick={() => handleExecutePrompt('Connect Cloud Armor to Global Load Balancer with TLS 1.3.')} className="px-1.5 hover:text-blue-600 font-semibold cursor-pointer">Connect</button>
                    <span className="text-slate-400">|</span>
                    <button onClick={() => handleExecutePrompt('Group ingress nodes into a DMZ zone.')} className="px-1.5 hover:text-blue-600 font-semibold cursor-pointer">Group</button>
                  </div>
                  <span className="text-slate-700 font-medium text-[11px]">Click on any node below to inspect Terraform HCL, SLAs & Security Posture</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-slate-700">
                <div className="flex items-center gap-1 bg-slate-100 border border-slate-300 px-1.5 py-1 rounded-md text-[11px] shadow-2xs">
                  <button 
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.5}
                    className="p-1 rounded hover:bg-white text-slate-700 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                    title="Zoom Out (Ctrl -)"
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
                    className="p-1 rounded hover:bg-white text-slate-700 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                    title="Zoom In (Ctrl +)"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  
                  <span className="text-slate-300 mx-0.5">|</span>
                  
                  <button 
                    onClick={handleResetZoom}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                      zoomLevel === 1.0 
                        ? 'text-blue-600 hover:text-blue-700 hover:underline' 
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                    title="Reset to 100% Fit (Ctrl 0)"
                  >
                    Fit (16:9)
                  </button>
                </div>
                
                <button 
                  onClick={handleOpenDiagramsNet}
                  className="px-3 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-[11px] font-bold transition shadow-xs flex items-center gap-1 cursor-pointer"
                  title="Open this diagram in diagrams.net to test or play around"
                >
                  <ExternalLink className="w-3 h-3 text-blue-600" />
                  <span>Open in draw.io</span>
                </button>

                <Link
                  href="/vision"
                  className="px-3 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-800 text-[11px] font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  title="Convert PNG Architecture Diagram into Draw.io XML using DeepMind Gemini Vision"
                >
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>Vision AI (PNG to Diagram)</span>
                </Link>

                {!isEditorMode && (
                  <button
                    onClick={() => setIsNewProjectModalOpen(true)}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ New Canvas</span>
                  </button>
                )}
              </div>
            </div>

            {/* Canvas Viewport */}
            <div 
              onWheel={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                  if (e.deltaY < 0) handleZoomIn();
                  else handleZoomOut();
                }
              }}
              className="flex-1 min-h-0 p-4 md:p-6 flex items-center justify-center overflow-auto bg-slate-50/50"
            >
              <div 
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: zoomLevel > 1 ? 'top center' : 'center center',
                  transition: 'transform 0.15s ease-out'
                }}
                onClick={() => {
                  const spanner = ast.components.find(c => c.service === 'Cloud Spanner') || ast.components[0];
                  setSelectedComponent(spanner);
                }}
                className="w-full max-w-[1440px] h-full max-h-[820px] min-h-[360px] m-auto bg-white rounded-2xl border border-slate-300/80 shadow-2xl relative overflow-hidden cursor-pointer flex-shrink-0"
              >
                <DiagramViewerRenderSafe 
                  xml={xml} 
                  bgTheme="light"
                  useCaseName={ast.metadata.projectTitle}
                />
              </div>
            </div>

          </section>

        ) : (

          // VIEW 2: FULL LIVING SPECIFICATIONS WORKSPACE
          <LivingSpecsViewer
            specs={livingSpecs}
            activeDocId={activeDocId}
            onSelectDoc={id => setActiveDocId(id)}
            onSwitchToDiagramView={() => setActiveView('diagram')}
            onShareDoc={doc => handleOpenShare('doc', doc.id, `${doc.id}: ${doc.title}`)}
            currentXml={xml}
            projectName={ast.metadata.projectTitle}
            useCaseName={ast.metadata.domain}
            versionName={activeVersionTag}
            onSelectBlueprintById={handleSelectBlueprintById}
          />

        )}

      </main>
      </div>

      {/* 3. MODALS & SLIDEOUT DRAWERS */}
      <ComponentInspectorDrawer
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        onAiRefinePrompt={prompt => handleExecutePrompt(prompt)}
        onShareNode={node => handleOpenShare('node', node.id, node.name)}
      />

      <BrainGroundingModal
        isOpen={isBrainModalOpen}
        onClose={() => setIsBrainModalOpen(false)}
        onAutoHeal={handleAutoHeal}
        isHealing={isHealing}
      />

      <AudioBriefingModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        title={ast.metadata.projectTitle}
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
        activeDoc={livingSpecs.find(d => d.id === activeDocId)}
        activeNode={selectedComponent}
      />

      <SaveToLibraryModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSaveSuccess={({ id, name, domain }) => {
          setIsSavedInLibrary(true);
          setSessionId(id);
          setAst(prev => ({
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

      <BlueprintCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectBlueprint={handleSelectBlueprint}
        currentBlueprintId={selectedBlueprintId}
        currentDomainPresetId={selectedDomain}
        theme="light"
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

    </div>
  );
}
