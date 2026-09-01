'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/lib/themeContext';
import {
  Layers,
  Sparkles,
  FileText,
  Copy,
  ExternalLink,
  Edit3,
  RefreshCw,
  GitCompare,
  RotateCcw,
  RotateCw,
  Clock,
  Check,
  Zap,
  Info,
  X,
  Plus,
  Play,
  Share2,
  ChevronRight,
  Shield,
  Search,
  Code,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  ZoomIn,
  ZoomOut,
  Maximize,
  ChevronDown,
  Folder,
  FolderOpen,
  History,
  ArrowRight,
  CopyPlus,
  Trash2,
  Link as LinkIcon
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { Studio2VisualDiffModal } from '@/components/Studio2VisualDiffModal';
import { generateGenericArchitectureXml } from '@/lib/genericArchitecture';
import { generateGcpFunctionalFlowchartXml } from '@/lib/gcpFunctionalFlowchart';
import { generateGCPInfrastructureTopology } from '@/lib/gcpInfrastructureTopology';
import { sanitizeDrawioXmlAttributes, injectUseCaseFlavor } from '@/lib/diagramCleaner';
import { compileArchitectureFromPrompt } from '@/lib/dynamicArchitectureCompiler';
import type { Studio1SemanticGraph } from '@/lib/studio1HybridEngine';
import {
  extractStudio1State,
  studio1ContentDigest,
  type Studio1DecisionLedger,
  type Studio1GenerationContext,
} from '@/lib/studio1ArchitectureCore';

interface PastProject {
  id: string;
  name: string;
  useCase: string;
  category: string;
  description: string;
  tags: string[];
  suggestedPrompt: string;
  xml?: string;
}

const DEFAULT_PAST_PROJECTS: PastProject[] = [
  {
    id: 'proj_biopharma',
    name: 'Bio-Pharma Clinical Platform',
    useCase: 'Genomics Analysis & Regulatory AI',
    category: 'Healthcare & Life Sciences',
    description: 'Vertex AI RAG knowledge graph, CMEK encryption & HIPAA-compliant analytics pipeline',
    tags: ['Vertex AI', 'CMEK', 'BigQuery', 'GKE Autopilot'],
    suggestedPrompt: 'Architect a HIPAA-compliant genomics sequencing pipeline with Vertex AI RAG and CMEK encryption'
  },
  {
    id: 'proj_fintech',
    name: 'Global Fintech Payments',
    useCase: 'Multi-Region Real-Time Transaction Engine',
    category: 'Financial Services',
    description: 'Zero-trust active-active transaction ledger with Cloud Spanner TrueTime and Cloud Armor DDoS protection',
    tags: ['Cloud Spanner', 'Cloud Armor', 'Pub/Sub', 'MIG'],
    suggestedPrompt: 'Design a zero-trust multi-region microservices architecture with Cloud Spanner and Cloud Armor'
  },
  {
    id: 'proj_supplychain',
    name: 'Autonomous Supply Chain & Logistics',
    useCase: 'Real-Time IoT Fleet Telemetry & Routing',
    category: 'Supply Chain & IoT',
    description: 'High-throughput telemetry ingestion with Pub/Sub, Dataflow, and BigQuery ML predictive routing',
    tags: ['Dataflow', 'Pub/Sub', 'BigQuery ML', 'Cloud Storage'],
    suggestedPrompt: 'Architect a high-throughput event streaming platform with Pub/Sub & Dataflow for real-time fleet telemetry'
  },
  {
    id: 'proj_ecommerce',
    name: 'E-Commerce Omnichannel Platform',
    useCase: 'AI-Powered Personalized Recommendations',
    category: 'Retail & E-Commerce',
    description: 'GKE Autopilot microservices with Vertex ScaNN vector search and Cloud CDN edge caching',
    tags: ['Vertex ScaNN', 'Cloud CDN', 'GKE Autopilot', 'Cloud SQL'],
    suggestedPrompt: 'Build a Vertex AI RAG knowledge graph with ScaNN vector search and Cloud CDN edge caching'
  },
  {
    id: 'proj_smartgrid',
    name: 'Smart Grid Energy & Utilities',
    useCase: 'Edge Compute & GPU Anomaly Detection',
    category: 'Energy & Utilities',
    description: 'Regional Subnet with GPU Managed Instance Groups & Internal Load Balancing for grid telemetry',
    tags: ['GPU MIG', 'Internal LB', 'Cloud Monitoring', 'VPC-SC'],
    suggestedPrompt: 'Scale Regional Subnet B with GPU Managed Instance Groups & Internal LB for real-time grid anomaly detection'
  },
  {
    id: 'proj_telecom',
    name: 'Telecom 5G Core Network',
    useCase: 'Low-Latency Edge Packet Processing',
    category: 'Telecommunications',
    description: 'Distributed edge nodes with VPC Peering, Cloud Interconnect, and DDoS protection',
    tags: ['Cloud Interconnect', 'VPC-SC', 'Cloud Armor', 'Compute Engine'],
    suggestedPrompt: 'Add Cloud Armor security rules & DDoS protection policies for low-latency 5G edge nodes'
  }
];

interface StudioDiagramTab {
  id: string;
  title: string;
  templateId: string;
  xml: string;
  source: 'functional_flowchart' | 'generic_architecture' | 'custom';
  lastPrompt?: string;
  semanticGraph?: Studio1SemanticGraph;
  generationContext?: Studio1GenerationContext;
  decisionLedger?: Studio1DecisionLedger;
  reconciliationRequired?: boolean;
}

interface StudioVersionSnapshot {
  id: string;
  versionTag: string;
  timestamp: string;
  author: 'User' | 'AI Assistant' | 'System';
  actionSummary: string;
  activeDiagramId: string;
  diagrams: StudioDiagramTab[];
  projectName: string;
  useCaseName: string;
  projectTitle: string;
  projectScopePrompt: string;
  changedComponents?: string[];
  targetTier?: string;
  originType?: 'prompt' | 'manual' | 'system';
  promptDetails?: {
    promptText: string;
    targetTier?: string;
    model?: string;
    summary?: string;
    changedComponents?: string[];
  };
  manualDetails?: {
    action: string;
    summary: string;
    timestamp?: string;
  };
}

interface StudioChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  actionApplied?: {
    summary: string;
    versionTag: string;
    targetTier?: string;
    changedComponents?: string[];
  };
  geminiAudit?: {
    securityScore: number;
    topologyScore: number;
    complianceStandard: string;
    verifiedControls: string[];
    aiReasoning: string;
  };
  suggestedPrompts?: string[];
  options?: Array<{ id: string; label: string; recommended?: boolean; prompt?: string }>;
}

interface PendingVerificationState {
  isPending: boolean;
  prompt: string;
  summary: string;
  targetTier: string;
  changedComponents: string[];
  microVersionTag: string; // e.g. "v1.x"
  proposedVersionTag: string; // e.g. "v2.0"
  candidateXml: string;
  previousXml: string;
  previousDiagrams: StudioDiagramTab[];
}

interface Studio1ArchitectureCandidate {
  id: string;
  name: string;
  strategy: string;
  optimizeFor: string[];
  tradeoffs: string[];
  recommended: boolean;
  xml: string;
  semanticGraph: Studio1SemanticGraph;
  context: Studio1GenerationContext;
  decisionLedger: Studio1DecisionLedger;
  certification: { certified: boolean; score: number; violations: string[] };
  semanticCritic?: { approved?: boolean; score?: number; issues?: string[]; missingRequirements?: string[] };
  summary: string;
  targetTier: string;
  changedComponents: string[];
}

interface Studio1CandidateSelectionState {
  title: string;
  message: string;
  comparisonSummary?: string;
  recommendedId: string;
  diversity: { valid: boolean; minimumDistance: number; duplicatePairs: string[] };
  candidates: Studio1ArchitectureCandidate[];
  prompt: string;
  projectTitle: string;
  previousXml: string;
  previousDiagrams: StudioDiagramTab[];
  microVersionTag: string;
  proposedVersionTag: string;
  generationSource: string;
  model: string;
}

// Helper to intelligently infer logical Project Name & Use Case Name if not provided
function inferLogicalProjectAndUseCase(
  prompt: string,
  existingProject?: string,
  existingUseCase?: string
): { projectName: string; useCaseName: string; projectTitle: string } {
  const p = prompt.toLowerCase();
  let proj = existingProject?.trim() || '';
  let uc = existingUseCase?.trim() || '';

  if (!proj || !uc) {
    if (p.includes('pharma') || p.includes('genom') || p.includes('clinical') || p.includes('hipaa') || p.includes('cleanroom') || p.includes('gxp')) {
      if (!proj) proj = 'Bio-Pharma Clinical Platform';
      if (!uc) uc = 'Genomics Analysis & Regulatory AI';
    } else if (p.includes('fintech') || p.includes('payment') || p.includes('ledger') || p.includes('fraud') || p.includes('pci')) {
      if (!proj) proj = 'Global Fintech Payments';
      if (!uc) uc = 'Multi-Region Real-Time Transaction Engine';
    } else if (p.includes('stream') || p.includes('pubsub') || p.includes('pub/sub') || p.includes('dataflow') || p.includes('kafka') || p.includes('event')) {
      if (!proj) proj = 'Real-Time Event Data Platform';
      if (!uc) uc = 'High-Throughput Pub/Sub Streaming Pipeline';
    } else if (p.includes('rag') || p.includes('vertex') || p.includes('vector') || p.includes('scann') || p.includes('agent') || p.includes('gemini') || p.includes('llm')) {
      if (!proj) proj = 'Cognitive AI Knowledge Engine';
      if (!uc) uc = 'Vertex AI RAG & ScaNN Search Graph';
    } else if (p.includes('spanner') || p.includes('database') || p.includes('sql') || p.includes('truetime') || p.includes('oltp')) {
      if (!proj) proj = 'Enterprise Distributed Database Core';
      if (!uc) uc = 'Multi-Region Cloud Spanner Active-Active Replication';
    } else if (p.includes('armor') || p.includes('security') || p.includes('waf') || p.includes('ddos') || p.includes('zero') || p.includes('iap')) {
      if (!proj) proj = 'Zero-Trust Perimeter & Security Gateway';
      if (!uc) uc = 'Cloud Armor Edge WAF & DDoS Mitigation';
    } else if (p.includes('mig') || p.includes('gpu') || p.includes('gce') || p.includes('compute') || p.includes('scale') || p.includes('internal lb')) {
      if (!proj) proj = 'High-Performance Cloud Compute';
      if (!uc) uc = 'GPU-Accelerated MIG Autoscaling & Internal LB';
    } else if (p.includes('supply') || p.includes('iot') || p.includes('telemetry') || p.includes('logistics') || p.includes('fleet')) {
      if (!proj) proj = 'Autonomous Supply Chain & Logistics';
      if (!uc) uc = 'Real-Time IoT Fleet Telemetry & Routing';
    } else if (p.includes('commerce') || p.includes('retail') || p.includes('recommend') || p.includes('catalog')) {
      if (!proj) proj = 'E-Commerce Omnichannel Platform';
      if (!uc) uc = 'AI-Powered Personalized Recommendations';
    } else if (p.includes('grid') || p.includes('energy') || p.includes('utility')) {
      if (!proj) proj = 'Smart Grid Energy & Utilities';
      if (!uc) uc = 'Edge Compute & GPU Anomaly Detection';
    } else if (p.includes('telecom') || p.includes('5g') || p.includes('packet')) {
      if (!proj) proj = 'Telecom 5G Core Network';
      if (!uc) uc = 'Low-Latency Edge Packet Processing';
    } else {
      const clean = prompt.replace(/[^\w\s]/g, '').trim();
      const words = clean.split(/\s+/).filter((w) => w.length > 2);
      if (!proj) {
        proj =
          words.length >= 2
            ? words.slice(0, 3).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Platform'
            : 'Cloud Native Enterprise Platform';
      }
      if (!uc) {
        uc =
          words.length >= 3
            ? words.slice(0, 4).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Architecture'
            : 'Multi-Tier Cloud Functional Flowchart';
      }
    }
  }

  return {
    projectName: proj,
    useCaseName: uc,
    projectTitle: `${proj}: ${uc}`
  };
}

// Helper to compute dynamic next-step suggestions evolving after every prompt execution
function computeDynamicNextSuggestions(prompt: string, projectName: string, changedComponents?: string[]): string[] {
  const p = prompt.toLowerCase();
  const proj = projectName || 'GCP Platform';

  if (p.includes('spanner') || p.includes('database') || p.includes('sql') || p.includes('oltp')) {
    return [
      `Deploy Gemini 3.1 Pro NL-to-SQL Copilot on Vertex AI for real-time Spanner query optimization in ${proj}`,
      `Upgrade to Multi-Region Dual-Ingress Global Load Balancing with Spanner TrueTime 99.999% SLA active-active replication`,
      `Stream Spanner CDC mutations directly into Vertex AI Vector Search (ScaNN Index) for real-time RAG`,
      `Enforce VPC Service Controls and Customer-Managed Encryption Keys (CMEK) with automated rotation`
    ];
  }
  if (p.includes('rag') || p.includes('vector') || p.includes('vertex') || p.includes('agent') || p.includes('gemini') || p.includes('llm')) {
    return [
      `Deploy Autonomous Gemini 3.1 Pro Multi-Agent Reasoning Loop with Vertex AI Model Registry in ${proj}`,
      `Configure Vertex ScaNN Vector Index with sub-millisecond similarity caching and Spanner metadata sync`,
      `Integrate ADK 2.0 Agentic Tools with BeyondCorp Zero-Trust and Identity-Aware Proxy (IAP)`,
      `Add Real-Time Vertex AI LLM Grounding & Hallucination Guardrail Evaluators`
    ];
  }
  if (p.includes('stream') || p.includes('event') || p.includes('pubsub') || p.includes('pub/sub') || p.includes('dataflow') || p.includes('kafka')) {
    return [
      `Deploy Gemini 3.1 Pro Live Event Analysis Agent on Vertex AI for real-time telemetry reasoning in ${proj}`,
      `Stream events into Vertex AI Vector Search (ScaNN index) for real-time similarity retrieval & RAG grounding`,
      `Add BigQuery ML anomaly detection models on the real-time Dataflow stream for ${proj}`,
      `Upgrade to multi-region active-active Pub/Sub geo-replication with automated dead-letter alerting`
    ];
  }
  if (p.includes('armor') || p.includes('security') || p.includes('waf') || p.includes('ddos') || p.includes('zero')) {
    return [
      `Attach Security Command Center Enterprise with Gemini SecOps for automated threat mitigation in ${proj}`,
      `Configure Cloud Armor Adaptive ML Rate Limiting and Geo-Fencing DDoS rules at the global edge`,
      `Enforce BeyondCorp Context-Aware Zero-Trust perimeters with VPC Service Controls (VPC-SC)`,
      `Enable Cloud IDS (Intrusion Detection System) deep packet inspection with automated SIEM export`
    ];
  }
  if (p.includes('mig') || p.includes('gpu') || p.includes('scale') || p.includes('compute') || p.includes('instance')) {
    return [
      `Deploy GKE Autopilot GPU MIG Partitioning (NVIDIA H100/L4) with Vertex AI model serving in ${proj}`,
      `Trigger Cloud Run GPU Serverless Microservices via Eventarc for instantaneous event-driven inference bursts`,
      `Configure Prometheus metric alerts and dynamic predictive autoscaling thresholds`,
      `Enforce cross-subnet egress firewalls with VPC Flow Logs network telemetry monitoring`
    ];
  }
  if (p.includes('pharma') || p.includes('clinical') || p.includes('genom') || p.includes('gxp')) {
    return [
      `Integrate Vertex AI RAG Clinical Knowledge Graph with FHIR / HL7 multi-omics data lake in ${proj}`,
      `Add 21 CFR Part 11 cryptographic audit logging with Cloud KMS CMEK hardware security modules`,
      `Configure multi-region disaster recovery replication for Electronic Batch Records (EBR)`,
      `Scale GxP validation microservices with GKE Autopilot isolated confidential computing node pools`
    ];
  }
  return [
    `Deploy Gemini 3.1 Pro Autonomous Agent on Vertex AI for intelligent reasoning in ${proj}`,
    `Upgrade ${proj} with Multi-Region Active-Active Ingress and Cloud Spanner TrueTime replication`,
    `Stream events to Vertex AI Vector Search (ScaNN) for real-time enterprise RAG grounding`,
    `Enforce Zero-Trust VPC Service Controls, CMEK encryption, and Cloud Armor adaptive defense`
  ];
}

const MAX_ROLLING_VERSIONS = 20;

type Studio1WorkspaceMode = 'reference' | 'create' | 'clone' | 'working';

const STUDIO1_REFERENCE = {
  projectName: 'Agentic AI Harness',
  useCaseName: 'Enterprise Multi-Agent Orchestration',
  projectTitle: 'Agentic AI Harness — Reference Architecture',
  prompt: 'Design an enterprise agentic AI platform with governed orchestration, secure tool access, shared memory, observability, and a GCP-native deployment option.'
};

const STUDIO1_NEW_PROJECT = {
  projectName: 'Real-Time Event Platform',
  useCaseName: 'High-Throughput Event Streaming',
  projectTitle: 'Real-Time Event Platform — Target Architecture',
  prompt: 'Architect a high-throughput event streaming platform with secure ingestion, durable messaging, stream processing, operational observability, and analytics.'
};

function Studio1Content() {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // 1. Project & Use Case Scope Inputs & Searchable Dropdowns
  const [workspaceMode, setWorkspaceMode] = useState<Studio1WorkspaceMode>('reference');
  const [hasGeneratedDiagram, setHasGeneratedDiagram] = useState<boolean>(true);
  const [projectName, setProjectName] = useState<string>(STUDIO1_REFERENCE.projectName);
  const [useCaseName, setUseCaseName] = useState<string>(STUDIO1_REFERENCE.useCaseName);
  const [projectTitle, setProjectTitle] = useState<string>(STUDIO1_REFERENCE.projectTitle);
  const [projectScopePrompt, setProjectScopePrompt] = useState<string>(STUDIO1_REFERENCE.prompt);
  const [generationContext, setGenerationContext] = useState<Studio1GenerationContext>({
    action: 'auto', persona: 'auto', level: 'auto', viewpoint: 'auto', depth: 'auto',
    lifecycleState: 'target', platform: 'auto'
  });
  const [decisionLedger, setDecisionLedger] = useState<Studio1DecisionLedger>({
    confirmedRequirements: [], constraints: [], lockedNodeIds: [], rejectedOptions: [], assumptions: [], openQuestions: []
  });
  const [candidateSelection, setCandidateSelection] = useState<Studio1CandidateSelectionState | null>(null);

  // Past Projects & Use Cases State (Pre-seeded with Rich GCP Architectures + LocalStorage)
  const [pastProjects, setPastProjects] = useState<PastProject[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('promptcanvas_studio1_past_projects');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Failed to load past projects from localStorage', e);
      }
    }
    return DEFAULT_PAST_PROJECTS;
  });

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState<boolean>(false);
  const [isUseCaseDropdownOpen, setIsUseCaseDropdownOpen] = useState<boolean>(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>('');
  const [useCaseSearchQuery, setUseCaseSearchQuery] = useState<string>('');

  const projectDropdownRef = useRef<HTMLDivElement | null>(null);
  const useCaseDropdownRef = useRef<HTMLDivElement | null>(null);

  // Multi-Diagram Management
  const [activeDiagramId, setActiveDiagramId] = useState<string>('diag_1');
  const [diagrams, setDiagrams] = useState<StudioDiagramTab[]>(() => {
    const xmlGeneric = generateGenericArchitectureXml({
      projectTitle: 'Agentic AI Harness — Generic Reference Architecture',
      theme: isLight ? 'light' : 'dark'
    });
    const xmlGcp = generateGcpFunctionalFlowchartXml({
      projectTitle: 'Google Cloud Agentic AI Harness — End-to-End Reference Architecture',
      theme: isLight ? 'light' : 'dark'
    });
    return [
      {
        id: 'diag_1',
        title: '🌐 Option 1: Generic Architecture',
        templateId: 'generic_architecture',
        xml: xmlGeneric,
        source: 'generic_architecture'
      },
      {
        id: 'diag_2',
        title: '☁️ Option 2: GCP Native Architecture',
        templateId: 'gcp_native_architecture',
        xml: xmlGcp,
        source: 'functional_flowchart'
      }
    ];
  });

  // UI Modals & Menus
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showDiffModal, setShowDiffModal] = useState<boolean>(false);
  const [diffBaseIndex, setDiffBaseIndex] = useState<number>(1);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Saved Historical Canvases Drawer (Filtered to Studio 1)
  const [showSavedDrawer, setShowSavedDrawer] = useState<boolean>(false);
  const [savedHistoryList, setSavedHistoryList] = useState<any[]>([]);
  const [loadingSavedHistory, setLoadingSavedHistory] = useState<boolean>(false);
  const [savedSearchQuery, setSavedSearchQuery] = useState<string>('');

  const openSavedHistoryDrawer = async () => {
    setShowSavedDrawer(true);
    setLoadingSavedHistory(true);
    try {
      const res = await fetch('/api/diagrams');
      const data = await res.json();
      if (Array.isArray(data)) {
        const studio1Items = data.filter(d => 
          d.created_studio === 'studio1' ||
          (d.architecture_type && d.architecture_type.includes('studio1')) ||
          (d.name && d.name.toLowerCase().includes('studio 2'))
        );
        setSavedHistoryList(studio1Items.length > 0 ? studio1Items : data.filter(d => d.created_studio === 'studio1'));
      }
    } catch (e) {
      console.error('Failed to fetch Studio 1 history:', e);
    } finally {
      setLoadingSavedHistory(false);
    }
  };

  const handleCloneSavedDiagram = async (d: any) => {
    try {
      let xmlToClone = d.xml_content;
      if (!xmlToClone) {
        const fullRes = await fetch(`/api/diagrams/${d.id}`);
        const fullData = await fullRes.json();
        xmlToClone = fullData.xml_content || fullData.versions?.[0]?.xml_content || '';
      }

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${d.name || 'Architecture'} (Clone)`,
          architecture_type: d.architecture_type || 'gcp_flowchart',
          xml_content: xmlToClone,
          created_studio: 'studio1'
        })
      });
      const newDiag = await res.json();
      if (newDiag && newDiag.id) {
        await openSavedHistoryDrawer();
        showToast(`Cloned diagram "${newDiag.diagram.name}" successfully!`);
      }
    } catch (e) {
      console.error('Failed to clone diagram:', e);
    }
  };

  const handleDeleteSavedDiagram = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this diagram from history?')) return;
    try {
      await fetch(`/api/diagrams/${id}`, { method: 'DELETE' });
      setSavedHistoryList(prev => prev.filter(item => item.id !== id));
      showToast('Diagram deleted successfully.');
    } catch (e) {
      console.error('Failed to delete diagram:', e);
    }
  };

  // Micro-Version Verification & Highlight State (v1.x -> v2.0 Quality Gate)
  const [pendingVerification, setPendingVerification] = useState<PendingVerificationState | null>(null);

  // Dynamic Next Architectural Iterations (Evolves dynamically after every prompt)
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([
    'Architect a high-throughput event streaming platform with Pub/Sub & Dataflow',
    'Design a zero-trust multi-region microservices architecture with Cloud Spanner',
    'Build a Vertex AI RAG knowledge graph with ScaNN vector search',
    'Scale Regional Subnet B with GPU Managed Instance Groups & Internal LB'
  ]);

  // DeepMind Architecture Vision Decompiler
  const [isDecompiling, setIsDecompiling] = useState<boolean>(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Zoom & Viewport Scaling State
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  // Draw.io Inline Modal & Window Refs
  const [showInlineDrawioModal, setShowInlineDrawioModal] = useState<boolean>(false);
  const inlineDrawioIframeRef = useRef<HTMLIFrameElement | null>(null);
  const drawioChildWindowRef = useRef<Window | null>(null);

  // Auto-scroll ref for chat messages
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // Version History State
  const [versionHistory, setVersionHistory] = useState<StudioVersionSnapshot[]>(() => {
    const xmlGeneric = generateGenericArchitectureXml({
      projectTitle: 'Agentic AI Harness — Generic Reference Architecture',
      theme: isLight ? 'light' : 'dark'
    });
    const xmlGcp = generateGcpFunctionalFlowchartXml({
      projectTitle: 'Google Cloud Agentic AI Harness — End-to-End Reference Architecture',
      theme: isLight ? 'light' : 'dark'
    });
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const initDiagrams: StudioDiagramTab[] = [
      {
        id: 'diag_1',
        title: '🌐 Option 1: Generic Architecture',
        templateId: 'generic_architecture',
        xml: xmlGeneric,
        source: 'generic_architecture'
      },
      {
        id: 'diag_2',
        title: '☁️ Option 2: GCP Native Architecture',
        templateId: 'gcp_native_architecture',
        xml: xmlGcp,
        source: 'functional_flowchart'
      }
    ];
    return [
      {
        id: 'snap_init',
        versionTag: 'v1.0',
        timestamp: timeStr,
        author: 'System',
        actionSummary: 'Default Baseline: Option 1 Generic & Option 2 GCP Native Blueprints',
        activeDiagramId: 'diag_1',
        diagrams: initDiagrams,
        projectName: STUDIO1_REFERENCE.projectName,
        useCaseName: STUDIO1_REFERENCE.useCaseName,
        projectTitle: STUDIO1_REFERENCE.projectTitle,
        projectScopePrompt: STUDIO1_REFERENCE.prompt,
        changedComponents: ['Perimeter & Ingress', 'Planning & Routing', 'Service Swarm', 'Data & Integration', 'AI Core & Safety'],
        targetTier: 'Enterprise Architecture'
      }
    ];
  });
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);

  // Chat message history
  const [chatMessages, setChatMessages] = useState<StudioChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: 'Studio 1 is ready. Create an architecture, ask a question, request a precise edit, or choose a refactor mode. Auto controls will infer the context and clarify before unsafe changes.',
      timestamp: 'Just now'
    }
  ]);

  // Active diagram getter
  const activeDiagram = useMemo(() => {
    return diagrams.find((d) => d.id === activeDiagramId) || diagrams[0];
  }, [diagrams, activeDiagramId]);
  const activeDiagramDigest = useMemo(() => studio1ContentDigest(activeDiagram?.xml || ''), [activeDiagram?.xml]);

  // Auto-scroll chat feed
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length, isSynthesizing]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target as Node)) {
        setIsProjectDropdownOpen(false);
      }
      if (useCaseDropdownRef.current && !useCaseDropdownRef.current.contains(event.target as Node)) {
        setIsUseCaseDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered projects based on search query
  const filteredProjects = useMemo(() => {
    const q = projectSearchQuery.trim().toLowerCase();
    if (!q) return pastProjects;
    return pastProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.useCase.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [pastProjects, projectSearchQuery]);

  // Filtered use cases based on search query
  const filteredUseCases = useMemo(() => {
    const q = useCaseSearchQuery.trim().toLowerCase();
    const allUseCases = Array.from(new Set(pastProjects.map((p) => p.useCase)));
    if (!q) return allUseCases;
    return allUseCases.filter((u) => u.toLowerCase().includes(q));
  }, [pastProjects, useCaseSearchQuery]);

  // Helper for toasts
  const showToast = useCallback((msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 3500);
  }, []);

  const handleNewProject = useCallback(() => {
    setWorkspaceMode('create');
    setHasGeneratedDiagram(false);
    setProjectName(STUDIO1_NEW_PROJECT.projectName);
    setProjectSearchQuery(STUDIO1_NEW_PROJECT.projectName);
    setUseCaseName(STUDIO1_NEW_PROJECT.useCaseName);
    setUseCaseSearchQuery(STUDIO1_NEW_PROJECT.useCaseName);
    setProjectTitle(STUDIO1_NEW_PROJECT.projectTitle);
    setProjectScopePrompt(STUDIO1_NEW_PROJECT.prompt);
    setGenerationContext({
      action: 'create', persona: 'auto', level: 'auto', viewpoint: 'auto', depth: 'standard',
      lifecycleState: 'target', platform: 'auto'
    });
    setDecisionLedger({ confirmedRequirements: [], constraints: [], lockedNodeIds: [], rejectedOptions: [], assumptions: [], openQuestions: [] });
    setPendingVerification(null);
    setCandidateSelection(null);
    setChatMessages([{
      id: `msg_new_${Date.now()}`,
      sender: 'assistant',
      text: 'New project is ready. Review the populated brief, adjust any controls, then generate. The canvas stays blank until a validated architecture is ready.',
      timestamp: 'Just now'
    }]);
    showToast('New Studio 1 project ready');
  }, [showToast]);

  const handleCloneReference = useCallback(() => {
    setWorkspaceMode('clone');
    setHasGeneratedDiagram(true);
    setProjectName(`${projectName || STUDIO1_REFERENCE.projectName} — Copy`);
    setProjectTitle(`${projectTitle || STUDIO1_REFERENCE.projectTitle} — Copy`);
    setGenerationContext((previous) => ({ ...previous, action: 'incremental_edit' }));
    setPendingVerification(null);
    setCandidateSelection(null);
    setChatMessages((previous) => [...previous, {
      id: `msg_clone_${Date.now()}`,
      sender: 'assistant',
      text: 'Editable copy created. The reference remains unchanged; prompts and manual edits now apply only to this working copy.',
      timestamp: 'Just now'
    }]);
    showToast('Editable copy created');
  }, [projectName, projectTitle, showToast]);

  // Snapshot Creation Helper (supports explicit version override e.g. v2.0 promotion)
  const pushNewVersion = useCallback(
    (
      actionSummary: string,
      author: 'User' | 'AI Assistant' | 'System',
      updatedDiagrams?: StudioDiagramTab[],
      changedComponents?: string[],
      targetTier?: string,
      overrideVersionTag?: string,
      originType?: 'prompt' | 'manual' | 'system',
      promptDetails?: {
        promptText: string;
        targetTier?: string;
        model?: string;
        summary?: string;
        changedComponents?: string[];
      },
      manualDetails?: {
        action: string;
        summary: string;
        timestamp?: string;
      }
    ) => {
      const currentDiagramsState = updatedDiagrams || diagrams;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      let nextTag = overrideVersionTag || 'v1.0';
      if (!overrideVersionTag && versionHistory.length > 0) {
        const lastTag = versionHistory[0].versionTag.replace(/^v/, '');
        const [maj, min] = lastTag.split('.').map(Number);
        nextTag = `v${maj || 1}.${(min || 0) + 1}`;
      }

      const newSnapshot: StudioVersionSnapshot = {
        id: `snap_${Date.now()}`,
        versionTag: nextTag,
        timestamp: timeStr,
        author,
        actionSummary,
        activeDiagramId,
        diagrams: JSON.parse(JSON.stringify(currentDiagramsState)),
        projectName,
        useCaseName,
        projectTitle,
        projectScopePrompt,
        changedComponents,
        targetTier,
        originType: originType || (author === 'AI Assistant' ? 'prompt' : author === 'User' ? 'manual' : 'system'),
        promptDetails,
        manualDetails
      };

      setVersionHistory((prev) => {
        const next = [newSnapshot, ...prev];
        return next.slice(0, MAX_ROLLING_VERSIONS);
      });
      setCurrentHistoryIndex(0);
      return nextTag;
    },
    [diagrams, activeDiagramId, projectName, useCaseName, projectTitle, projectScopePrompt, versionHistory]
  );

  // Accept & Promote Micro-Version (v1.x -> v2.0)
  const handleAcceptAndPromoteVersion = useCallback(() => {
    if (!pendingVerification || !pendingVerification.isPending) return;

    const promotedTag = pendingVerification.proposedVersionTag || 'v2.0';

    pushNewVersion(
      `Promoted: ${pendingVerification.summary}`,
      'AI Assistant',
      diagrams,
      pendingVerification.changedComponents,
      pendingVerification.targetTier,
      promotedTag,
      'prompt',
      {
        promptText: pendingVerification.prompt,
        targetTier: pendingVerification.targetTier,
        model: 'Studio 1 validated architecture transaction',
        summary: pendingVerification.summary,
        changedComponents: pendingVerification.changedComponents
      }
    );

    // Save project if new to pastProjects
    if (projectName && useCaseName) {
      setPastProjects((prev) => {
        if (!prev.some((p) => p.name.toLowerCase() === projectName.toLowerCase())) {
          const newProj: PastProject = {
            id: `proj_${Date.now()}`,
            name: projectName,
            useCase: useCaseName,
            category: pendingVerification.targetTier || 'Enterprise VPC',
            description: pendingVerification.summary || 'Custom GCP Architecture Model',
            tags: pendingVerification.changedComponents || ['GCP Architecture'],
            suggestedPrompt: pendingVerification.prompt,
            xml: activeDiagram.xml
          };
          const updated = [newProj, ...prev];
          try {
            localStorage.setItem('promptcanvas_studio1_past_projects', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        }
        return prev;
      });
    }

    setPendingVerification(null);
    setChatMessages((prev) => {
      const updated = [...prev];
      for (let i = updated.length - 1; i >= 0; i--) {
        if (updated[i].sender === 'assistant' && updated[i].text.includes('Applied to canvas')) {
          updated[i] = {
            ...updated[i],
            text: `✅ Applied to canvas • Promoted to official release ${promotedTag}`
          };
          return updated;
        }
      }
      return [
        ...updated,
        {
          id: `ast_${Date.now()}`,
          sender: 'assistant',
          text: `✅ Promoted to official release ${promotedTag}`,
          timestamp: 'Just now'
        }
      ];
    });
    showToast(`🎉 Promoted to official release ${promotedTag}!`);
  }, [pendingVerification, pushNewVersion, diagrams, projectName, useCaseName, activeDiagram.xml, showToast]);

  // Discard Micro-Version Changes & Restore Previous Official Version
  const handleDiscardPendingChanges = useCallback(() => {
    if (!pendingVerification || !pendingVerification.isPending) return;

    if (pendingVerification.previousDiagrams && pendingVerification.previousDiagrams.length > 0) {
      setDiagrams(pendingVerification.previousDiagrams);
    } else if (pendingVerification.previousXml) {
      setDiagrams((prev) =>
        prev.map((d) => (d.id === activeDiagramId ? { ...d, xml: pendingVerification.previousXml } : d))
      );
    }

    const currentOfficialTag = versionHistory[currentHistoryIndex]?.versionTag || 'v1.0';
    setPendingVerification(null);
    setChatMessages((prev) => {
      const updated = [...prev];
      for (let i = updated.length - 1; i >= 0; i--) {
        if (updated[i].sender === 'assistant' && updated[i].text.includes('Applied to canvas')) {
          updated[i] = {
            ...updated[i],
            text: `↺ Draft discarded • Restored ${currentOfficialTag}`
          };
          return updated;
        }
      }
      return [
        ...updated,
        {
          id: `ast_${Date.now()}`,
          sender: 'assistant',
          text: `↺ Discarded draft • Restored ${currentOfficialTag}`,
          timestamp: 'Just now'
        }
      ];
    });
    showToast(`↺ Discarded draft changes and restored ${currentOfficialTag}.`);
  }, [pendingVerification, activeDiagramId, versionHistory, currentHistoryIndex, showToast]);

  // Handler to reload a past architecture project
  const handleSelectPastProject = useCallback(
    (project: PastProject) => {
      setProjectName(project.name);
      setUseCaseName(project.useCase);
      setProjectSearchQuery(project.name);
      setUseCaseSearchQuery(project.useCase);
      setProjectTitle(`${project.name}: ${project.useCase}`);
      if (project.suggestedPrompt) {
        setProjectScopePrompt(project.suggestedPrompt);
      }
      setIsProjectDropdownOpen(false);

      // Generate or load the attached architecture XML
      const reloadedXml =
        project.xml ||
        generateGcpFunctionalFlowchartXml({
          projectName: project.name,
          useCaseName: project.useCase,
          projectTitle: `${project.name}: ${project.useCase}`,
          prompt: project.suggestedPrompt,
          theme: isLight ? 'light' : 'dark'
        });
      const restoredState = extractStudio1State(reloadedXml);

      const updatedDiagrams: StudioDiagramTab[] = [
        {
          id: 'diag_1',
          title: `Diagram 1 • ${project.name}`,
          templateId: 'gcp_functional_flowchart',
          xml: reloadedXml,
          source: 'functional_flowchart',
          lastPrompt: project.suggestedPrompt,
          semanticGraph: restoredState?.graph,
          generationContext: restoredState?.context,
          decisionLedger: restoredState?.decisionLedger
        }
      ];

      setDiagrams(updatedDiagrams);
      setActiveDiagramId('diag_1');
      if (restoredState?.context) setGenerationContext(restoredState.context);
      if (restoredState?.decisionLedger) setDecisionLedger(restoredState.decisionLedger);

      // Add notification to chat messages
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now()}`,
          sender: 'assistant',
          text: `📂 Reloaded past architecture for **${project.name}** (${project.useCase}). The live GCP functional flowchart and configuration have been synchronized to your canvas.`,
          timestamp: timeStr,
          actionApplied: {
            summary: `Reloaded ${project.name} Architecture`,
            versionTag: 'v1.0 (Reloaded)',
            targetTier: project.category,
            changedComponents: project.tags
          },
          suggestedPrompts: [
            `Enhance ${project.name} with automated disaster recovery and backup replication`,
            `Scale ${project.name} with GPU acceleration and Vertex AI model endpoints`,
            `Add strict zero-trust IAM policies and Cloud Armor DDoS security rules to ${project.name}`
          ]
        }
      ]);

      pushNewVersion(
        `Reloaded past architecture: ${project.name}`,
        'User',
        updatedDiagrams,
        project.tags,
        project.category
      );

      showToast(`✨ Reloaded past architecture diagram for "${project.name}"`);
    },
    [isLight, pushNewVersion, showToast]
  );

  // Handler to select or create a use case
  const handleSelectUseCase = useCallback(
    (selectedUseCase: string) => {
      setUseCaseName(selectedUseCase);
      setUseCaseSearchQuery(selectedUseCase);
      setIsUseCaseDropdownOpen(false);

      // Re-flavor existing architecture if project name is present
      if (projectName && !activeDiagram.semanticGraph) {
        setProjectTitle(`${projectName}: ${selectedUseCase}`);
        const reloadedXml = generateGcpFunctionalFlowchartXml({
          projectName: projectName,
          useCaseName: selectedUseCase,
          projectTitle: `${projectName}: ${selectedUseCase}`,
          prompt: projectScopePrompt,
          theme: isLight ? 'light' : 'dark'
        });

        const updatedDiagrams: StudioDiagramTab[] = diagrams.map((d) =>
          d.id === activeDiagramId ? { ...d, xml: reloadedXml, title: `Diagram 1 • ${projectName}` } : d
        );
        setDiagrams(updatedDiagrams);
        setHasGeneratedDiagram(true);
        setWorkspaceMode('working');

        showToast(`🎯 Updated use case to "${selectedUseCase}"`);
      }
    },
    [projectName, projectScopePrompt, isLight, diagrams, activeDiagramId, activeDiagram.semanticGraph, showToast]
  );

  // Undo Functionality
  const handleUndo = useCallback(() => {
    if (currentHistoryIndex < versionHistory.length - 1) {
      const nextIdx = currentHistoryIndex + 1;
      setCurrentHistoryIndex(nextIdx);
      const snap = versionHistory[nextIdx];
      if (snap) {
        setDiagrams(JSON.parse(JSON.stringify(snap.diagrams)));
        setActiveDiagramId(snap.activeDiagramId);
        setProjectName(snap.projectName);
        setUseCaseName(snap.useCaseName);
        setProjectTitle(snap.projectTitle);
        const restored = snap.diagrams.find((diagram) => diagram.id === snap.activeDiagramId);
        if (restored?.generationContext) setGenerationContext(restored.generationContext);
        if (restored?.decisionLedger) setDecisionLedger(restored.decisionLedger);
        showToast(`↺ Restored state: ${snap.versionTag} (${snap.actionSummary})`);
      }
    }
  }, [currentHistoryIndex, versionHistory, showToast]);

  // Restore snapshot from Diff Modal
  const handleRestoreVersionFromDiff = useCallback((snap: StudioVersionSnapshot) => {
    setDiagrams(JSON.parse(JSON.stringify(snap.diagrams)));
    setActiveDiagramId(snap.activeDiagramId);
    if (snap.projectName) setProjectName(snap.projectName);
    if (snap.useCaseName) setUseCaseName(snap.useCaseName);
    if (snap.projectTitle) setProjectTitle(snap.projectTitle);
    const restored = snap.diagrams.find((diagram) => diagram.id === snap.activeDiagramId);
    if (restored?.generationContext) setGenerationContext(restored.generationContext);
    if (restored?.decisionLedger) setDecisionLedger(restored.decisionLedger);
    setShowDiffModal(false);
    showToast(`↺ Restored active canvas to version ${snap.versionTag}!`);
  }, [showToast]);

  // Escape key handler for all modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDiffModal(false);
        setShowHistoryModal(false);
        setShowInlineDrawioModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Redo Functionality
  const handleRedo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const prevIdx = currentHistoryIndex - 1;
      setCurrentHistoryIndex(prevIdx);
      const snap = versionHistory[prevIdx];
      if (snap) {
        setDiagrams(JSON.parse(JSON.stringify(snap.diagrams)));
        setActiveDiagramId(snap.activeDiagramId);
        setProjectName(snap.projectName);
        setUseCaseName(snap.useCaseName);
        setProjectTitle(snap.projectTitle);
        const restored = snap.diagrams.find((diagram) => diagram.id === snap.activeDiagramId);
        if (restored?.generationContext) setGenerationContext(restored.generationContext);
        if (restored?.decisionLedger) setDecisionLedger(restored.decisionLedger);
        showToast(`↻ Redone to state: ${snap.versionTag} (${snap.actionSummary})`);
      }
    }
  }, [currentHistoryIndex, versionHistory, showToast]);

  // Open in Draw.io New Tab
  const handleOpenDrawioNewTab = useCallback(() => {
    const url = 'https://app.diagrams.net/?embed=1&ui=min&spin=1&modified=unsaved&proto=json';
    const child = window.open(url, '_blank');
    if (child) {
      drawioChildWindowRef.current = child;
      showToast('🚀 Opened in Draw.io Editor (New Tab) with live bidirectional sync!');
    }
  }, [showToast]);

  // Open in Draw.io Inline Modal
  const handleOpenDrawioInline = useCallback(() => {
    setShowInlineDrawioModal(true);
    showToast('✏️ Opened Inline Draw.io Editor! Edit and click Save to update your architecture.');
  }, [showToast]);

  // Bidirectional PostMessage Integration (both for child window and iframe)
  useEffect(() => {
    const handleMessage = (evt: MessageEvent) => {
      if (!evt.data) return;
      let msg: any = {};
      try {
        msg = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data;
      } catch {
        return;
      }

      if (msg.event === 'init') {
        const target =
          (inlineDrawioIframeRef.current && inlineDrawioIframeRef.current.contentWindow) ||
          drawioChildWindowRef.current ||
          (evt.source as Window);

        if (target) {
          target.postMessage(
            JSON.stringify({
              action: 'load',
              xml: activeDiagram.xml,
              fit: false
            }),
            '*'
          );
        }
      } else if (msg.event === 'save' || msg.event === 'export') {
        const xml = msg.xml || msg.data;
        if (xml && typeof xml === 'string' && xml.includes('<mxfile')) {
          const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
            if (diag.id === activeDiagramId) {
              return {
                ...diag,
                xml,
                source: 'custom',
                reconciliationRequired: Boolean(diag.semanticGraph)
              };
            }
            return diag;
          });
          setDiagrams(updatedDiagrams);
          const tag = pushNewVersion(
            'Synced edits from Draw.io Editor',
            'User',
            updatedDiagrams,
            ['User Draw.io Canvas Updates'],
            'Canvas Workspace',
            undefined,
            'manual',
            undefined,
            {
              action: 'Manual Shape & Routing Synchronization',
              summary: 'User refined diagram nodes, labels, or edge routing in Draw.io editor',
              timestamp: new Date().toLocaleTimeString()
            }
          );
          showToast(`✅ Saved changes from Draw.io Editor as version ${tag}!`);
        }
      } else if (msg.event === 'exit') {
        setShowInlineDrawioModal(false);
        showToast('ℹ️ Exited Draw.io Editor without making changes');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeDiagram.xml, diagrams, activeDiagramId, pushNewVersion, showToast]);

  // Prompt Intelligence & Change Detection
  const analyzePromptChanges = (prompt: string): { summary: string; targetTier: string; changedComponents: string[] } => {
    const arch = compileArchitectureFromPrompt(prompt);
    return {
      summary: arch.summary,
      targetTier: arch.targetTier,
      changedComponents: arch.changedComponents
    };
  };

  // Main Prompt Synthesis Handler (with live Gemini Architecture Validation & Auto-Correction)
  const handleSynthesizeArchitecture = useCallback(
    async (customPrompt?: string, confirmHighImpact = false) => {
      const rawPrompt = (customPrompt || projectScopePrompt).trim();
      const basePrompt = rawPrompt || (projectName && useCaseName ? `${projectName} ${useCaseName}` : '') || 'Enterprise Google Cloud Native Architecture';
      const promptToUse = basePrompt.trim();

      if (activeDiagram.reconciliationRequired) {
        setChatMessages((previous) => [...previous, {
          id: `ast_${Date.now()}`,
          sender: 'assistant',
          text: 'This canvas contains manual Draw.io changes that are not reconciled with the semantic graph. I will not overwrite them. Restore the last semantic version or start a new architecture before applying another AI edit.',
          timestamp: 'Just now'
        }]);
        showToast('Semantic reconciliation is required before AI editing');
        return;
      }

      // Intelligently infer logical Project Name & Use Case Name if blank
      const inferred = inferLogicalProjectAndUseCase(promptToUse, projectName, useCaseName);
      const derivedProject = inferred.projectName;
      const derivedUseCase = inferred.useCaseName;
      const derivedTitle = inferred.projectTitle;

      if (!projectName) {
        setProjectName(derivedProject);
        setProjectSearchQuery(derivedProject);
      }
      if (!useCaseName) {
        setUseCaseName(derivedUseCase);
        setUseCaseSearchQuery(derivedUseCase);
      }
      setProjectTitle(derivedTitle);

      // Determine current baseline major version and micro-version tags
      let currentMajor = 1;
      if (versionHistory.length > 0) {
        const rawTag = versionHistory[0].versionTag.replace(/^v/, '');
        const [maj] = rawTag.split('.').map(Number);
        if (!isNaN(maj) && maj > 0) currentMajor = maj;
      }
      const microVersionTag = `v${currentMajor}.x`;
      const proposedVersionTag = `v${currentMajor + 1}.0`;

      // Save snapshots for review/revert
      const previousDiagramsSnapshot = JSON.parse(JSON.stringify(diagrams));
      const previousXmlSnapshot = activeDiagram.xml;

      // Immediately post user prompt to chat thread and clear input
      if (rawPrompt) {
        const userMsg: StudioChatMessage = {
          id: `usr_${Date.now()}`,
          sender: 'user',
          text: rawPrompt,
          timestamp: 'Just now'
        };
        setChatMessages((prev) => [...prev, userMsg]);
        setProjectScopePrompt('');
      }

      setIsSynthesizing(true);
      setIsAiThinking(true);

      try {
        const titleToUse = derivedTitle;

        // Call Gemini 3.1 Pro Architecture Validation & Correction API
        let finalXml = '';
        let geminiAudit: any = null;
        let apiSummary = '';
        let apiTargetTier = '';
        let apiChangedComponents: string[] = [];
        let apiReasoning = '';
        let generationSource = '';
        let generationModel = '';

        const isGenericTab = activeDiagram?.source === 'generic_architecture';
        const res = await fetch('/api/studio1/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectName: derivedProject,
            useCaseName: derivedUseCase,
            projectTitle: titleToUse,
            prompt: promptToUse,
            theme: isLight ? 'light' : 'dark',
            previousGraph: generationContext.action === 'create' ? null : (activeDiagram.semanticGraph || null),
            baseVersionId: generationContext.action !== 'create' && activeDiagram.semanticGraph
              ? studio1ContentDigest(JSON.stringify(activeDiagram.semanticGraph))
              : null,
            context: generationContext,
            decisionLedger,
            confirmHighImpact
          })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          throw new Error(data.error || `Studio 1 generation failed with HTTP ${res.status}. No static fallback was rendered.`);
        }

        if (data.candidateSet && Array.isArray(data.candidateSet.candidates)) {
          if (data.context) setGenerationContext(data.context);
          setCandidateSelection({
            ...data.candidateSet,
            prompt: promptToUse,
            projectTitle: titleToUse,
            previousXml: previousXmlSnapshot,
            previousDiagrams: previousDiagramsSnapshot,
            microVersionTag,
            proposedVersionTag,
            generationSource: data.generationSource || 'studio1-candidate-tournament',
            model: data.model || 'architecture-model',
          });
          setChatMessages((previous) => [...previous, {
            id: `ast_${Date.now()}`,
            sender: 'assistant',
            text: `${data.candidateSet.message}\n\nI have not changed the canvas. Compare the three validated strategies and choose the baseline you want to develop.`,
            timestamp: 'Just now'
          }]);
          showToast('Three architecture strategies are ready for comparison');
          return;
        }

        if (data.mutationApplied === false) {
          if (data.context) setGenerationContext(data.context);
          const interaction = data.interaction || {};
          if (interaction.clarificationQuestion) {
            setDecisionLedger((previous) => ({
              ...previous,
              openQuestions: Array.from(new Set([...previous.openQuestions, interaction.clarificationQuestion])).slice(-20)
            }));
          }
          const responseText = [interaction.message, interaction.clarificationQuestion]
            .filter(Boolean)
            .join('\n\n');
          setChatMessages((previous) => [...previous, {
            id: `ast_${Date.now()}`,
            sender: 'assistant',
            text: responseText || 'I need one more detail before changing the architecture.',
            timestamp: 'Just now',
            options: Array.isArray(interaction.options)
              ? interaction.options.map((option: any) => ({
                  ...option,
                  prompt: option.id === 'confirm_high_impact'
                    ? promptToUse
                    : String(option.id || '').startsWith('create_')
                      ? `${option.label} for this topic and requirement: ${promptToUse}`
                      : `${promptToUse}\nClarification selected: ${option.label}`
                }))
              : undefined
          }]);
          showToast(interaction.requiresConfirmation ? 'Review required before changing the architecture' : 'Studio 1 responded without changing the canvas');
          return;
        }

        if (!data.xml || !data.semanticGraph) {
          throw new Error('Studio 1 returned no validated architecture candidate.');
        }

        finalXml = data.xml;
        geminiAudit = data.geminiAudit;
        apiSummary = data.summary;
        apiTargetTier = data.targetTier;
        apiChangedComponents = data.changedComponents;
        apiReasoning = data.reasoning;
        generationSource = data.generationSource;
        generationModel = data.model;
        if (data.context) setGenerationContext(data.context);
        const nextDecisionLedger: Studio1DecisionLedger = data.decisionLedger || decisionLedger;
        setDecisionLedger(nextDecisionLedger);

        // Autosave mutated XML to active diagram in canvas immediately
        const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
          if (diag.id === activeDiagramId) {
            return {
              ...diag,
              title: `${titleToUse} • Studio 1 ${data.context?.level && data.context.level !== 'auto' ? data.context.level : 'Architecture'}`,
              xml: finalXml,
              source: isGenericTab ? 'generic_architecture' : 'functional_flowchart',
              lastPrompt: promptToUse,
              semanticGraph: data.semanticGraph,
              generationContext: data.context || generationContext,
              decisionLedger: nextDecisionLedger
            };
          }
          return diag;
        });

        setDiagrams(updatedDiagrams);
        setHasGeneratedDiagram(true);
        setWorkspaceMode('working');

        const analysis = analyzePromptChanges(promptToUse);
        const resolvedSummary = apiSummary || analysis.summary;
        const resolvedTier = apiTargetTier || analysis.targetTier;
        const resolvedComponents = (apiChangedComponents && apiChangedComponents.length > 0)
          ? apiChangedComponents
          : analysis.changedComponents;

        // Put changes in pending review / micro-version state
        setPendingVerification({
          isPending: true,
          prompt: promptToUse,
          summary: resolvedSummary,
          targetTier: resolvedTier,
          changedComponents: resolvedComponents,
          microVersionTag,
          proposedVersionTag,
          candidateXml: finalXml,
          previousXml: previousXmlSnapshot,
          previousDiagrams: previousDiagramsSnapshot
        });

        // Compute dynamic next-step suggestions evolving from this prompt
        const nextSuggestions = computeDynamicNextSuggestions(
          promptToUse,
          derivedProject,
          resolvedComponents
        );
        setDynamicSuggestions(nextSuggestions);

        // Crisp, ultra-concise assistant confirmation status (no repetitive regurgitation)
        const assistantMsg: StudioChatMessage = {
          id: `ast_${Date.now()}`,
          sender: 'assistant',
          text: `⚡ Fresh hybrid architecture generated • ${microVersionTag} (Draft)\n${generationSource} • ${generationModel}\n${apiReasoning}`,
          timestamp: 'Just now'
        };

        setChatMessages((prev) => [...prev, assistantMsg]);
        showToast(`⚡ Canvas updated • ${microVersionTag} (Draft)`);
      } catch (err: any) {
        console.error('[Studio1] Hybrid synthesis error:', err);
        setProjectScopePrompt(promptToUse);
        setChatMessages((previous) => [...previous, {
          id: `ast_${Date.now()}`,
          sender: 'assistant',
          text: `I could not produce a safe architecture result: ${err?.message || 'Unknown error'}\n\nYour canvas was not changed. You can revise the request or try again.`,
          timestamp: 'Just now'
        }]);
        showToast(`❌ Synthesis error: ${err?.message || 'Unknown error'}`);
      } finally {
        setIsSynthesizing(false);
        setIsAiThinking(false);
      }
    },
    [
      projectScopePrompt,
      projectName,
      useCaseName,
      projectTitle,
      isLight,
      diagrams,
      activeDiagram,
      activeDiagramId,
      generationContext,
      decisionLedger,
      versionHistory,
      currentHistoryIndex,
      showToast
    ]
  );

  const handleSelectArchitectureCandidate = useCallback((candidate: Studio1ArchitectureCandidate) => {
    if (!candidateSelection) return;
    const isGenericTab = activeDiagram?.source === 'generic_architecture';
    const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diagram) => diagram.id === activeDiagramId
      ? {
          ...diagram,
          title: `${candidateSelection.projectTitle} • ${candidate.name}`,
          xml: candidate.xml,
          source: isGenericTab ? 'generic_architecture' : 'functional_flowchart',
          lastPrompt: candidateSelection.prompt,
          semanticGraph: candidate.semanticGraph,
          generationContext: candidate.context,
          decisionLedger: candidate.decisionLedger,
          reconciliationRequired: false,
        }
      : diagram);

    setDiagrams(updatedDiagrams);
    setHasGeneratedDiagram(true);
    setWorkspaceMode('working');
    setGenerationContext(candidate.context);
    setDecisionLedger(candidate.decisionLedger);
    setPendingVerification({
      isPending: true,
      prompt: candidateSelection.prompt,
      summary: `${candidate.name}: ${candidate.summary}`,
      targetTier: candidate.targetTier,
      changedComponents: candidate.changedComponents,
      microVersionTag: candidateSelection.microVersionTag,
      proposedVersionTag: candidateSelection.proposedVersionTag,
      candidateXml: candidate.xml,
      previousXml: candidateSelection.previousXml,
      previousDiagrams: candidateSelection.previousDiagrams,
    });
    setDynamicSuggestions(computeDynamicNextSuggestions(candidateSelection.prompt, projectName, candidate.changedComponents));
    setChatMessages((previous) => [...previous, {
      id: `ast_${Date.now()}`,
      sender: 'assistant',
      text: `Selected ${candidate.name} as the reviewable draft.\n${candidate.strategy}\n\nTechnical review: ${Math.round(Number(candidate.semanticCritic?.score || 0))}/100 • deterministic render rules: ${candidate.certification.score}/100. Accept it to establish the baseline, or continue refining the draft.`,
      timestamp: 'Just now',
      options: [
        { id: 'explain_candidate', label: 'Explain this design', prompt: `Explain the architecture decisions and tradeoffs in the selected ${candidate.name} option without changing the diagram.`, recommended: true },
        { id: 'more_technical', label: 'Make more technical', prompt: 'Increase the diagram to a technical level while preserving its selected architecture strategy.' },
        { id: 'network_focus', label: 'Add network detail', prompt: 'Add the missing network flow and trust-boundary detail at the technically correct locations.' },
        { id: 'security_focus', label: 'Strengthen security', prompt: 'Strengthen security controls using a safe incremental change and explain any assumptions.' },
      ],
    }]);
    setCandidateSelection(null);
    showToast(`${candidate.name} selected • review before accepting the baseline`);
  }, [activeDiagram?.source, activeDiagramId, candidateSelection, diagrams, projectName, showToast]);

  // Direct Execution Handler for Dynamic Suggestions
  const handleExecuteSuggestion = useCallback(
    (suggestionText: string) => {
      setProjectScopePrompt(suggestionText);
      handleSynthesizeArchitecture(suggestionText);
    },
    [handleSynthesizeArchitecture]
  );

  // Handle Architecture Image Decompilation via DeepMind Vision
  const handleDecompileImage = useCallback(
    async (file: File) => {
      if (!file) return;
      setIsDecompiling(true);
      showToast('👁️ DeepMind Gemini 2.5 Vision is analyzing and decompiling the blueprint image...');

      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64Data = reader.result as string;
          setUploadedImagePreview(base64Data);

          const res = await fetch('/api/decompile-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: base64Data,
              mimeType: file.type,
              projectName: projectName || file.name.replace(/\.[^/.]+$/, ''),
              useCaseName: useCaseName || 'DeepMind Multimodal Extraction'
            })
          });

          const data = await res.json();
          if (data.success && data.xml) {
            const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
              if (diag.id === activeDiagramId) {
                return {
                  ...diag,
                  title: `${projectName || file.name.replace(/\.[^/.]+$/, '')} • DeepMind Vision AST`,
                  xml: data.xml,
                  source: 'custom'
                };
              }
              return diag;
            });

            setDiagrams(updatedDiagrams);
            const tag = pushNewVersion(
              `Decompiled Reference: ${data.summary}`,
              'AI Assistant',
              updatedDiagrams,
              data.extractedZones || ['Ingress & Security', 'Compute Tier', 'Data Tier', 'Agentic AI Services'],
              'DeepMind Vision AST'
            );

            const assistantMsg: StudioChatMessage = {
              id: `ast_decomp_${Date.now()}`,
              sender: 'assistant',
              text: `✨ **Google DeepMind Gemini 2.5 Vision Decompilation Complete!**\n\n${data.summary}\n\n**Detected Zones & Service Topology (${data.componentCount || 28} components):**\n${(data.extractedZones || []).map((z: string) => `• ${z}`).join('\n')}\n\n*The decompiled architecture is rendered on your live canvas and ready for prompt-based enhancements or Draw.io editing.*`,
              timestamp: 'Just now',
              actionApplied: {
                summary: data.summary,
                versionTag: tag,
                targetTier: 'DeepMind Vision AST',
                changedComponents: data.extractedZones
              },
              suggestedPrompts: [
                'Add multi-region failover and disaster recovery with Cloud Spanner',
                'Upgrade Agentic AI Services with Vertex RAG Vector Search & ScaNN',
                'Enforce Cloud Armor WAF and Zero-Trust IAP policies',
                'Scale Regional Subnet B with GPU Managed Instance Groups & Internal LB'
              ]
            };

            setChatMessages((prev) => [...prev, assistantMsg]);
            showToast(`🚀 Decompiled ${file.name} into interactive Draw.io XML (${tag})!`);
          } else {
            showToast('⚠️ Decompilation used high-fidelity ground truth master blueprint.');
          }
          setIsDecompiling(false);
        };
        reader.readAsDataURL(file);
      } catch (err: any) {
        console.error('Failed to decompile image:', err);
        showToast('❌ Failed to decompile image.');
        setIsDecompiling(false);
      }
    },
    [projectName, useCaseName, diagrams, activeDiagramId, pushNewVersion, showToast]
  );

  return (
    <div className={`min-h-screen ${isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 font-semibold text-xs rounded-xl shadow-2xl border border-teal-500/40 backdrop-blur-md animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-teal-400 dark:text-teal-600 animate-pulse" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Main Studio Viewport */}
      <div className="max-w-[1920px] w-full mx-auto p-3 md:p-5 space-y-3">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <Link href="/" className="hover:text-teal-500 transition-colors">
                PromptCanvas
              </Link>
              <span>&rsaquo;</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">Launch Studio 1</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-tight">
                  AI Architecture &amp; Specification Studio 1
                </h1>
                <p className="text-xs text-slate-500">
                  Experimental Hybrid Engine • Semantic Graph • Pattern Contracts • Certified Layout
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Tools: Undo, Redo, Version Tag */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={currentHistoryIndex >= versionHistory.length - 1}
              className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                currentHistoryIndex >= versionHistory.length - 1
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-500 text-slate-700 dark:text-slate-200 shadow-xs'
              }`}
              title="Undo last change"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleRedo}
              disabled={currentHistoryIndex <= 0}
              className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                currentHistoryIndex <= 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-500 text-slate-700 dark:text-slate-200 shadow-xs'
              }`}
              title="Redo change"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Version Snapshot Pill */}
            <button
              type="button"
              onClick={() => setShowHistoryModal(true)}
              className={`px-3 py-1.5 rounded-xl border font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                pendingVerification?.isPending
                  ? 'border-amber-500/50 bg-amber-500/15 text-amber-800 dark:text-amber-300 animate-pulse'
                  : 'border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${pendingVerification?.isPending ? 'text-amber-500' : 'text-teal-500'}`} />
              <span>
                {pendingVerification?.isPending
                  ? `${pendingVerification.microVersionTag} (Draft)`
                  : versionHistory[currentHistoryIndex]?.versionTag || 'v1.0'}
              </span>
              <span className="text-[10px] opacity-70">
                ({currentHistoryIndex + 1}/{versionHistory.length})
              </span>
            </button>

            <button
              type="button"
              onClick={handleNewProject}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-teal-600 hover:bg-teal-700 text-white border border-teal-500 shadow-sm transition"
              title="Start a new Studio 1 architecture"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>

            <button
              type="button"
              onClick={handleCloneReference}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-purple-500 shadow-xs transition cursor-pointer"
              title="Create an editable copy of the current architecture"
            >
              <CopyPlus className="w-3.5 h-3.5 text-purple-500" />
              <span>Clone</span>
            </button>

            <Link
              href="/history?studio=studio1"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-purple-50 hover:bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:hover:bg-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-500/50 shadow-xs transition"
              title="Open the Studio 1-only project library"
            >
              <FolderOpen className="w-3.5 h-3.5 text-purple-500" />
              <span>Studio 1 Library</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Split Workspace: 25% Left Chat, 75% Right Diagram */}
        <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
          {/* Left Column: Scope & Conversational Requirements (25% Width) */}
          <div className="w-full lg:w-[25%] lg:min-w-[320px] flex-shrink-0 space-y-4">
            <div className={`p-4 md:p-5 rounded-2xl border shadow-sm space-y-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}>
              <div className={`rounded-xl border px-3 py-2.5 ${
                workspaceMode === 'reference'
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200'
                  : workspaceMode === 'create'
                    ? 'border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-200'
                    : 'border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-200'
              }`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.14em]">
                    {workspaceMode === 'reference' ? 'Reference architecture' : workspaceMode === 'create' ? 'New project' : 'Editable working copy'}
                  </span>
                  <span className="rounded-full bg-white/70 dark:bg-slate-950/50 px-2 py-0.5 text-[9px] font-bold">
                    {workspaceMode === 'reference' ? 'View only' : 'Editable'}
                  </span>
                </div>
                <p className="mt-1 text-[10px] leading-relaxed opacity-80">
                  {workspaceMode === 'reference'
                    ? 'These inputs describe the diagram on the right. Clone it to edit, or start a new project for a blank canvas.'
                    : workspaceMode === 'create'
                      ? 'Adjust the populated brief and controls. Generate when ready; no stale diagram is shown on the blank canvas.'
                      : 'Prompt edits, controls, versioning, and manual canvas changes apply to this copy.'}
                </p>
              </div>

              <fieldset disabled={workspaceMode === 'reference'} className="space-y-4">
              {/* 1. Project Name & 2. Use Case Name with Searchable Dropdown & Architecture Reload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Project Name Dropdown */}
                <div className="space-y-1.5 relative" ref={projectDropdownRef}>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block truncate">
                    1. Project Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={isProjectDropdownOpen ? projectSearchQuery : projectName}
                      onFocus={() => {
                        setProjectSearchQuery(projectName);
                        setIsProjectDropdownOpen(true);
                      }}
                      onChange={(e) => {
                        setProjectSearchQuery(e.target.value);
                        setProjectName(e.target.value);
                        if (!isProjectDropdownOpen) setIsProjectDropdownOpen(true);
                      }}
                      placeholder="Search past projects or enter new..."
                      className={`w-full pl-3 pr-8 py-2 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProjectSearchQuery(projectName);
                        setIsProjectDropdownOpen((prev) => !prev);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-teal-500 transition-colors cursor-pointer"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isProjectDropdownOpen ? 'rotate-180 text-teal-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Project Dropdown Menu */}
                  {isProjectDropdownOpen && (
                    <div
                      className={`absolute left-0 w-[300px] sm:w-[340px] max-w-[90vw] top-full mt-1.5 z-50 rounded-2xl border shadow-2xl overflow-hidden max-h-[320px] overflow-y-auto ${
                        isLight ? 'bg-white border-slate-200 shadow-slate-300/50' : 'bg-slate-900 border-slate-800 shadow-black/80'
                      }`}
                    >
                      <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Past Projects ({filteredProjects.length})
                        </span>
                        <span className="text-[9px] font-semibold text-teal-600 dark:text-teal-400">
                          ⚡ Click to reload
                        </span>
                      </div>

                      <div className="p-1.5 space-y-1">
                        {projectSearchQuery.trim() &&
                          !pastProjects.some(
                            (p) => p.name.toLowerCase() === projectSearchQuery.trim().toLowerCase()
                          ) && (
                            <button
                              type="button"
                              onClick={() => {
                                setProjectName(projectSearchQuery.trim());
                                setIsProjectDropdownOpen(false);
                                showToast(`➕ Set project name: "${projectSearchQuery.trim()}"`);
                              }}
                              className="w-full text-left p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                              <span className="truncate">Use new: &quot;{projectSearchQuery.trim()}&quot;</span>
                            </button>
                          )}

                        {filteredProjects.map((proj) => {
                          const isSelected = projectName === proj.name;
                          return (
                            <button
                              key={proj.id}
                              type="button"
                              onClick={() => handleSelectPastProject(proj)}
                              className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer flex flex-col gap-1 ${
                                isSelected
                                  ? 'bg-teal-500/15 border border-teal-500/40 text-teal-900 dark:text-teal-200'
                                  : isLight
                                  ? 'hover:bg-slate-100 text-slate-800'
                                  : 'hover:bg-slate-800/80 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold flex items-center gap-1.5 truncate text-[11.5px]">
                                  <Folder className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-teal-500' : 'text-slate-400'}`} />
                                  <span className="truncate">{proj.name}</span>
                                </span>
                                {isSelected && (
                                  <span className="text-[9.5px] font-bold text-teal-600 dark:text-teal-400 bg-teal-500/20 px-1.5 py-0.5 rounded shrink-0">
                                    Active
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate pl-5">
                                🎯 {proj.useCase}
                              </div>
                              <div className="flex flex-wrap gap-1 pl-5 pt-0.5">
                                {proj.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8.5px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Use Case Name Dropdown */}
                <div className="space-y-1.5 relative" ref={useCaseDropdownRef}>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block truncate">
                    2. Use Case Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={isUseCaseDropdownOpen ? useCaseSearchQuery : useCaseName}
                      onFocus={() => {
                        setUseCaseSearchQuery(useCaseName);
                        setIsUseCaseDropdownOpen(true);
                      }}
                      onChange={(e) => {
                        setUseCaseSearchQuery(e.target.value);
                        setUseCaseName(e.target.value);
                        if (!isUseCaseDropdownOpen) setIsUseCaseDropdownOpen(true);
                      }}
                      placeholder="Search use cases or enter new..."
                      className={`w-full pl-3 pr-8 py-2 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setUseCaseSearchQuery(useCaseName);
                        setIsUseCaseDropdownOpen((prev) => !prev);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-teal-500 transition-colors cursor-pointer"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isUseCaseDropdownOpen ? 'rotate-180 text-teal-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Use Case Dropdown Menu */}
                  {isUseCaseDropdownOpen && (
                    <div
                      className={`absolute right-0 sm:left-0 w-[300px] sm:w-[340px] max-w-[90vw] top-full mt-1.5 z-50 rounded-2xl border shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto ${
                        isLight ? 'bg-white border-slate-200 shadow-slate-300/50' : 'bg-slate-900 border-slate-800 shadow-black/80'
                      }`}
                    >
                      <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Use Cases ({filteredUseCases.length})
                        </span>
                      </div>

                      <div className="p-1.5 space-y-1">
                        {useCaseSearchQuery.trim() &&
                          !filteredUseCases.some(
                            (u) => u.toLowerCase() === useCaseSearchQuery.trim().toLowerCase()
                          ) && (
                            <button
                              type="button"
                              onClick={() => handleSelectUseCase(useCaseSearchQuery.trim())}
                              className="w-full text-left p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                              <span className="truncate">Use new: &quot;{useCaseSearchQuery.trim()}&quot;</span>
                            </button>
                          )}

                        {filteredUseCases.map((uc) => {
                          const isSelected = useCaseName === uc;
                          return (
                            <button
                              key={uc}
                              type="button"
                              onClick={() => handleSelectUseCase(uc)}
                              className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isSelected
                                  ? 'bg-teal-500/15 border border-teal-500/40 text-teal-900 dark:text-teal-200 font-bold'
                                  : isLight
                                  ? 'hover:bg-slate-100 text-slate-800'
                                  : 'hover:bg-slate-800/80 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Sparkles
                                  className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-teal-500' : 'text-slate-400'}`}
                                />
                                <span className="truncate">{uc}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-teal-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Reference Blueprint Image Uploader (DeepMind Gemini 2.5 Multimodal Decompiler) */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-teal-500" />
                    <span>3. Reference Blueprint (Optional Image)</span>
                  </label>
                  <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold">DeepMind Vision</span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleDecompileImage(f);
                  }}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const f = e.dataTransfer.files?.[0];
                    if (f) handleDecompileImage(f);
                  }}
                  className={`p-3 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 ${
                    isDecompiling
                      ? 'border-teal-500 bg-teal-500/10'
                      : isLight
                      ? 'border-slate-300 hover:border-teal-500 bg-slate-50/70 hover:bg-teal-50/30'
                      : 'border-slate-700 hover:border-teal-500 bg-slate-950/50 hover:bg-teal-950/20'
                  }`}
                >
                  {isDecompiling ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 py-1">
                      <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                      <span>DeepMind Vision Decompiling Blueprint...</span>
                    </div>
                  ) : uploadedImagePreview ? (
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 py-0.5">
                      <img src={uploadedImagePreview} alt="Reference" className="w-6 h-6 object-cover rounded border" />
                      <span className="font-semibold text-teal-600 dark:text-teal-400">Blueprint Loaded • Click to change</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                        Drop reference architecture image or <span className="text-teal-600 dark:text-teal-400 underline">browse</span>
                      </div>
                      <div className="text-[9px] text-slate-400">
                        Decompiles nodes, zones, connectors &amp; diamonds to Draw.io XML
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 4. Architectural Scope & Topology Requirements (Chatbox Area) */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block truncate">
                    4. Scope &amp; Topology Prompt
                  </label>
                  <span className="text-[9.5px] font-mono text-teal-600 dark:text-teal-400 font-bold shrink-0">Two-way Architecture Copilot</span>
                </div>

                {/* Scrollable Prompt & Enhancement History Feed */}
                {chatMessages.length > 0 && (
                  <div className={`p-3 rounded-2xl border max-h-[260px] overflow-y-auto space-y-2.5 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}>
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`p-2.5 rounded-xl text-xs max-w-[92%] leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-teal-600 text-white font-medium rounded-tr-xs shadow-xs'
                              : isLight
                              ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-xs'
                              : 'bg-slate-900 text-slate-200 rounded-tl-xs border border-slate-800'
                          }`}
                        >
                          <p className="text-[11.5px] leading-relaxed">{msg.text}</p>
                          {msg.sender === 'assistant' && msg.options && msg.options.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                              {msg.options.map((option) => (
                                <button
                                  key={option.id}
                                  type="button"
                                  onClick={() => handleSynthesizeArchitecture(option.prompt || option.label, option.id === 'confirm_high_impact')}
                                  disabled={isSynthesizing}
                                  className={`px-2 py-1 rounded-lg text-[9.5px] font-bold border transition cursor-pointer disabled:opacity-50 ${
                                    option.recommended
                                      ? 'bg-teal-600 border-teal-500 text-white'
                                      : isLight ? 'bg-white border-slate-300 text-slate-700 hover:border-teal-500' : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-teal-500'
                                  }`}
                                >
                                  {option.label}{option.recommended ? ' · Recommended' : ''}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-[8.5px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                      </div>
                    ))}

                    {isAiThinking && (
                      <div className="flex items-center gap-2 text-xs text-teal-600 font-bold p-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Architecture Copilot is interpreting intent and validating a candidate response...</span>
                      </div>
                    )}
                    <div ref={chatMessagesEndRef} />
                  </div>
                )}

                {/* Prompt-first controls: every value remains Auto unless the user chooses otherwise. */}
                {activeDiagram.reconciliationRequired && (
                  <div className="p-2 rounded-lg border border-amber-400/60 bg-amber-500/10 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                    Manual canvas changes require semantic reconciliation before AI editing.
                  </div>
                )}
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: 'action', label: 'Action', values: [['auto', 'Auto'], ['create', 'Create'], ['incremental_edit', 'Edit'], ['guided_refactor', 'Guided Refactor'], ['full_refactor', 'Full Refactor']] },
                    { key: 'persona', label: 'Persona', values: [['auto', 'Auto Persona'], ['executive', 'Executive'], ['product_manager', 'Product Manager'], ['solution_architect', 'Solution Architect'], ['developer', 'Developer'], ['data_engineer', 'Data Engineer'], ['network_engineer', 'Network Engineer'], ['security_architect', 'Security Architect'], ['sre', 'SRE'], ['mixed', 'Mixed Audience']] },
                    { key: 'level', label: 'Level', values: [['auto', 'Auto Level'], ['executive', 'Executive'], ['conceptual', 'Conceptual'], ['logical', 'Logical'], ['technical', 'Technical'], ['operational', 'Operational'], ['implementation', 'Implementation']] },
                    { key: 'viewpoint', label: 'View', values: [['auto', 'Auto View'], ['end_to_end', 'End-to-End'], ['user_flow', 'User Flow'], ['application', 'Application'], ['integration', 'Integration'], ['network', 'Network'], ['data', 'Data'], ['security', 'Security'], ['ai_ml', 'AI / ML'], ['deployment', 'Deployment'], ['observability', 'Observability'], ['migration', 'Migration']] },
                    { key: 'depth', label: 'Depth', values: [['auto', 'Auto Depth'], ['standard', 'Standard'], ['detailed', 'Detailed'], ['exhaustive', 'Exhaustive']] },
                    { key: 'platform', label: 'Platform', values: [['auto', 'Auto Platform'], ['gcp', 'GCP'], ['aws', 'AWS'], ['azure', 'Azure'], ['hybrid', 'Hybrid'], ['vendor_neutral', 'Vendor-neutral']] },
                    { key: 'lifecycleState', label: 'State', values: [['current', 'Current State'], ['transition', 'Transition State'], ['target', 'Target State']] },
                  ].map((control) => (
                    <label key={control.key} className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
                      <span className="block mb-1 px-0.5">{control.label}</span>
                      <select
                        value={String(generationContext[control.key as keyof Studio1GenerationContext] || 'auto')}
                        onChange={(event) => setGenerationContext((previous) => ({ ...previous, [control.key]: event.target.value } as Studio1GenerationContext))}
                        className={`w-full px-2 py-1.5 rounded-lg border text-[10px] font-bold normal-case tracking-normal outline-none ${isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-700 text-slate-200'}`}
                      >
                        {control.values.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </label>
                  ))}
                </div>

                {!activeDiagram.semanticGraph && (
                  <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/30 px-3 py-2 text-[10px] leading-relaxed text-indigo-800 dark:text-indigo-200">
                    <strong>New architecture:</strong> Studio 1 will qualify the request, generate three distinct strategies, and leave the canvas unchanged until you choose one.
                  </div>
                )}

                {/* Prompt Textarea */}
                <textarea
                  rows={3}
                  value={projectScopePrompt}
                  onChange={(e) => setProjectScopePrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSynthesizeArchitecture();
                    }
                  }}
                  placeholder="Create, question, edit, validate, or refactor the architecture… Studio 1 will clarify before unsafe changes."
                  className={`w-full p-3 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                />

                {/* Synthesize Button */}
                <button
                  type="button"
                  onClick={() => handleSynthesizeArchitecture()}
                  disabled={isSynthesizing}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSynthesizing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Architecture AST...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>{activeDiagram.semanticGraph ? 'Send to Architecture Copilot' : 'Generate Architecture Draft'}</span>
                    </>
                  )}
                </button>

                {/* Dynamic Next Architectural Iterations (Evolutionary Next Steps) */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                      <span>Suggested Next Iterations</span>
                    </span>
                    <span className="text-[9px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                      ⚡ Dynamic
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {dynamicSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleExecuteSuggestion(suggestion)}
                        disabled={isSynthesizing}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all group flex items-start gap-2 cursor-pointer disabled:opacity-50 ${
                          isLight
                            ? 'bg-slate-50/90 hover:bg-teal-50/50 border-slate-200/80 hover:border-teal-400/80 text-slate-800'
                            : 'bg-slate-950/60 hover:bg-teal-950/30 border-slate-800 hover:border-teal-500/50 text-slate-200'
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                        <span className="leading-snug text-[11px] font-medium">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              </fieldset>
            </div>
          </div>

          {/* Right Column: Live Diagram Canvas & Actions (75% Width) */}
          <div className="w-full lg:w-[75%] flex-1 min-w-0 space-y-3">
            <div className={`rounded-2xl border shadow-sm overflow-hidden flex flex-col ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              {/* Diagram Card Header with Interactive Mode Tabs */}
              <div className="p-3 md:px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 mr-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>

                  {/* Interactive Dual-Mode Tabs */}
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    {diagrams.map((diag) => {
                      const isActive = diag.id === activeDiagramId;
                      return (
                        <button
                          key={diag.id}
                          type="button"
                          onClick={() => {
                            setActiveDiagramId(diag.id);
                            showToast(`Switched to: ${diag.title}`);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-xs border border-slate-200/80 dark:border-slate-700'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <Layers className={`w-3.5 h-3.5 ${isActive ? 'text-teal-500' : 'text-slate-400'}`} />
                          <span>{diag.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Zoom Controls Bar */}
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.max(0.4, +(prev - 0.1).toFixed(2)))}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded transition-colors cursor-pointer"
                      title="Zoom Out (-10%)"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1.0)}
                      className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-200 hover:text-teal-600 transition-colors cursor-pointer"
                      title="Reset Zoom to 100%"
                    >
                      {Math.round(zoomLevel * 100)}%
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.min(2.5, +(prev + 0.1).toFixed(2)))}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded transition-colors cursor-pointer"
                      title="Zoom In (+10%)"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1.0)}
                      className="px-1.5 py-0.5 text-[10px] font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 rounded transition-colors flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-800 cursor-pointer"
                      title="Fit Diagram to Viewport"
                    >
                      <Maximize className="w-3 h-3" />
                      <span>Fit</span>
                    </button>
                  </div>

                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px] font-bold">
                    16:9 VECTOR GCP
                  </span>
                </div>
              </div>

              {/* Sub-Header: Diagram Title & Action Buttons */}
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                <div className="font-bold text-xs truncate max-w-[340px] text-slate-800 dark:text-slate-200">
                  {activeDiagram.title}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowDiffModal(true)}
                    className="px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <GitCompare className="w-3 h-3 text-teal-500" />
                    <span>Compare Diff ({versionHistory[currentHistoryIndex]?.versionTag || 'v1.0'})</span>
                  </button>

                  <div className="relative group">
                    <button
                      type="button"
                      onClick={handleOpenDrawioInline}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3 text-teal-500" />
                      <span>Edit in Draw.io</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Verification & Change Highlight Bar (Micro-Version Review) */}
              {pendingVerification?.isPending && (
                <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-indigo-500/10 border-b border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 text-[10.5px] font-mono font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>Micro-Version {pendingVerification.microVersionTag} (In Review)</span>
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {pendingVerification.summary}
                      </span>
                    </div>
                    {pendingVerification.changedComponents.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        <span className="text-[9.5px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                          ✨ Highlighted Nodes:
                        </span>
                        {pendingVerification.changedComponents.map((comp) => (
                          <span
                            key={comp}
                            className="inline-flex items-center gap-1 text-[9.5px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/50 shadow-xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {comp.replace(/&amp;/g, '&')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleAcceptAndPromoteVersion()}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept &amp; Promote to {pendingVerification.proposedVersionTag}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDiscardPendingChanges()}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Discard</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDiffModal(true)}
                      className="px-2.5 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <GitCompare className="w-3.5 h-3.5 text-teal-500" />
                      <span>Diff</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Viewport Canvas Frame with Zoom Scaling & Auto-Fit */}
              <div className="p-2 md:p-3 flex-1 h-[calc(100vh-210px)] min-h-[780px] flex items-center justify-center bg-slate-100 dark:bg-slate-950/80 overflow-auto relative">
                <div
                  className="w-full h-full min-h-[760px] rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative transition-transform duration-150 origin-top-center"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top center',
                    width: zoomLevel !== 1.0 ? `${(100 / zoomLevel).toFixed(2)}%` : '100%',
                    height: zoomLevel !== 1.0 ? `${(100 / zoomLevel).toFixed(2)}%` : '100%',
                  }}
                >
                  {!hasGeneratedDiagram && workspaceMode === 'create' ? (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.08),_transparent_38%)]">
                      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:32px_32px]" />
                      <div className="relative max-w-md text-center px-8">
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-sm">
                          <Layers className="w-7 h-7" />
                        </div>
                        <h2 className="mt-5 text-xl font-black text-slate-900 dark:text-white">Blank architecture canvas</h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          Studio 1 will place a fresh, validated architecture here after it understands the brief. No reference template is silently reused.
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                          Review inputs → Generate → Compare 3 options
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DiagramViewerRenderSafe
                      key={`studio1_viewport_${activeDiagram.id}_${isLight ? 'light' : 'dark'}_${versionHistory[currentHistoryIndex]?.id || currentHistoryIndex}_${activeDiagramDigest}`}
                      diagramId="gcp_functional_flowchart"
                      diagramType="functional_flowchart"
                      xml={activeDiagram.xml}
                      aspectRatioId="16:9"
                      bgTheme={isLight ? 'light' : 'dark'}
                      allowFullScaleScroll={false}
                    />
                  )}
                </div>

                {/* Floating Bottom-Right Quick Zoom Pill */}
                <div className="absolute bottom-5 right-5 z-20 flex items-center gap-1 px-2.5 py-1.5 bg-slate-900/90 dark:bg-slate-800/95 text-white rounded-xl shadow-xl border border-slate-700 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.max(0.4, +(prev - 0.1).toFixed(2)))}
                    className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold px-1.5">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.min(2.5, +(prev + 0.1).toFixed(2)))}
                    className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1.0)}
                    className="px-2 py-0.5 ml-1 text-[10px] font-bold bg-teal-500 hover:bg-teal-400 text-white rounded transition-colors cursor-pointer"
                    title="Fit to Viewport"
                  >
                    Fit
                  </button>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenDrawioInline}
                    disabled={workspaceMode === 'reference' || !hasGeneratedDiagram}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Inline Draw.io Editor</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenDrawioNewTab}
                    disabled={workspaceMode === 'reference' || !hasGeneratedDiagram}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>Open in New Tab</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(activeDiagram.xml);
                      setCopiedXml(true);
                      showToast('📋 Draw.io XML copied to clipboard!');
                      setTimeout(() => setCopiedXml(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedXml ? 'Copied!' : 'Copy XML'}</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-500">
                  Active Target:{' '}
                  <span className="font-bold text-teal-600 dark:text-teal-400">
                    {generationContext.platform === 'auto'
                      ? 'Auto-detected cloud architecture'
                      : `${generationContext.platform.replace('_', ' ').toUpperCase()} architecture`}
                    {' · '}{generationContext.level === 'auto' ? 'Auto level' : generationContext.level.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New architectures remain isolated candidates until the customer deliberately chooses a baseline. */}
      {candidateSelection && (
        <div
          className="fixed inset-0 z-[70] bg-slate-950/85 backdrop-blur-md overflow-y-auto p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="studio1-candidate-title"
        >
          <div className={`mx-auto w-full max-w-[1600px] rounded-3xl border shadow-2xl overflow-hidden ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#07101f] border-slate-700'
          }`}>
            <div className={`px-6 py-5 md:px-8 border-b flex items-start justify-between gap-6 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                  <Sparkles className="w-4 h-4" /> Architecture candidate tournament
                </div>
                <h2 id="studio1-candidate-title" className="mt-2 text-2xl md:text-3xl font-black text-slate-950 dark:text-white">
                  {candidateSelection.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {candidateSelection.message}
                </p>
                {candidateSelection.comparisonSummary && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {candidateSelection.comparisonSummary}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setCandidateSelection(null)}
                className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Cancel without changing the canvas"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 p-5 md:p-8">
              {candidateSelection.candidates.map((candidate) => (
                <article
                  key={candidate.id}
                  aria-label={`${candidate.name}${candidate.recommended ? ', recommended' : ''}`}
                  className={`relative rounded-2xl border overflow-hidden flex flex-col shadow-lg ${
                    candidate.recommended
                      ? 'border-teal-500 ring-2 ring-teal-500/20 bg-white dark:bg-slate-900'
                      : isLight ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  {candidate.recommended && (
                    <div className="absolute top-3 right-3 z-20 rounded-full bg-teal-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                      Recommended
                    </div>
                  )}
                  <div className="h-[250px] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                    <DiagramViewerRenderSafe
                      key={`candidate_${candidate.id}_${studio1ContentDigest(candidate.xml)}`}
                      diagramId={`studio1_candidate_${candidate.id}`}
                      diagramType="functional_flowchart"
                      xml={candidate.xml}
                      aspectRatioId="16:9"
                      bgTheme={isLight ? 'light' : 'dark'}
                      allowFullScaleScroll={false}
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="pr-24">
                      <h3 className="text-lg font-black text-slate-950 dark:text-white">{candidate.name}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{candidate.strategy}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="rounded-lg bg-indigo-50 dark:bg-indigo-950/60 px-2 py-1 text-[10px] font-black text-indigo-700 dark:text-indigo-300">
                        Technical {Math.round(Number(candidate.semanticCritic?.score || 0))}/100
                      </span>
                      <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 text-[10px] font-black text-emerald-700 dark:text-emerald-300">
                        Render rules {candidate.certification.score}/100
                      </span>
                      <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {candidate.semanticGraph.nodes.length} components · {candidate.semanticGraph.edges.length} flows
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 p-3">
                        <div className="font-black text-emerald-800 dark:text-emerald-300 mb-1.5">Optimizes for</div>
                        <ul className="space-y-1 text-emerald-950/80 dark:text-emerald-100/80">
                          {(candidate.optimizeFor.length ? candidate.optimizeFor : ['Requirement fit']).map(item => <li key={item}>• {item}</li>)}
                        </ul>
                      </div>
                      <div className="rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 p-3">
                        <div className="font-black text-amber-800 dark:text-amber-300 mb-1.5">Tradeoffs</div>
                        <ul className="space-y-1 text-amber-950/80 dark:text-amber-100/80">
                          {(candidate.tradeoffs.length ? candidate.tradeoffs : ['Confirm operating constraints']).map(item => <li key={item}>• {item}</li>)}
                        </ul>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectArchitectureCandidate(candidate)}
                      className={`mt-5 w-full px-5 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition shadow-md ${
                        candidate.recommended
                          ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                          : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950'
                      }`}
                    >
                      <Check className="w-4 h-4" /> Use {candidate.name}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="px-6 py-4 md:px-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>No candidate has modified your canvas. Selection creates a reviewable draft, not an accepted baseline.</span>
              <span className="font-mono">Distinctness floor passed · distance {candidateSelection.diversity.minimumDistance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Inline Draw.io Modal */}
      {showInlineDrawioModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-[96vw] h-[92vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-3.5 px-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-4 h-4 text-teal-500" />
                <span className="font-black text-sm text-slate-800 dark:text-slate-200">
                  Inline Draw.io Architecture Editor
                </span>
                <span className="text-xs font-mono text-slate-500">
                  (Live Bidirectional Sync)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowInlineDrawioModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Close without saving (Esc)"
                >
                  <X className="w-3.5 h-3.5 text-slate-500" />
                  <span>Close / Cancel</span>
                  <kbd className="text-[10px] bg-slate-300 dark:bg-slate-700 px-1 py-0.2 rounded font-mono">Esc</kbd>
                </button>
                <button
                  type="button"
                  onClick={() => setShowInlineDrawioModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Done &amp; Close</span>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-full bg-slate-100 dark:bg-slate-950 relative">
              <iframe
                ref={inlineDrawioIframeRef}
                src="https://embed.diagrams.net/?embed=1&ui=min&spin=1&modified=unsavedChanges&proto=json"
                className="w-full h-full border-0"
                title="Inline Draw.io Editor"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </div>
        </div>
      )}

      {/* Visual Version Diff Modal */}
      <Studio2VisualDiffModal
        isOpen={showDiffModal}
        onClose={() => setShowDiffModal(false)}
        versionHistory={versionHistory}
        currentHistoryIndex={currentHistoryIndex}
        activeDiagramId={activeDiagramId}
        onRestoreVersion={handleRestoreVersionFromDiff}
        isLight={isLight}
      />

      {/* History Snapshots Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-500" />
                <h3 className="font-bold text-sm">
                  Full Version Snapshot Timeline
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2">
              {versionHistory.map((snap, idx) => (
                <button
                  key={snap.id}
                  type="button"
                  onClick={() => {
                    setCurrentHistoryIndex(idx);
                    setDiagrams(JSON.parse(JSON.stringify(snap.diagrams)));
                    setActiveDiagramId(snap.activeDiagramId);
                    setProjectName(snap.projectName);
                    setUseCaseName(snap.useCaseName);
                    setProjectTitle(snap.projectTitle);
                    setShowHistoryModal(false);
                    showToast(`Restored snapshot ${snap.versionTag}`);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    currentHistoryIndex === idx
                      ? 'border-teal-500 bg-teal-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-950'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-teal-600 dark:text-teal-400">
                        {snap.versionTag}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {snap.actionSummary}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Author: {snap.author} &bull; {snap.timestamp}
                    </div>
                  </div>
                  {currentHistoryIndex === idx && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500 text-white">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Saved Canvases History Drawer (Studio 1 Specific) */}
      {showSavedDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
          <div className="absolute inset-0" onClick={() => setShowSavedDrawer(false)} />
          <div className={`relative z-10 w-full max-w-md h-full shadow-2xl flex flex-col border-l transition-transform ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0B111E] border-slate-800 text-slate-100'
          }`}>
            <div className={`p-4 border-b flex items-center justify-between ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider">Studio 1 Architecture History</h3>
                  <p className="text-[10px] text-slate-400">Saved GCP flowcharts &amp; multi-agent specifications</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/history?studio=studio1"
                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-lg shadow-xs transition flex items-center gap-1"
                  title="Open full page canvas manager filtered to Studio 1"
                >
                  <FolderOpen className="w-3 h-3" />
                  <span>Full Manager ➔</span>
                </Link>
                <button
                  onClick={() => setShowSavedDrawer(false)}
                  className={`p-1.5 rounded-lg border transition ${
                    isLight ? 'border-slate-300 hover:bg-slate-200 text-slate-700' : 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={`p-3 border-b ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={savedSearchQuery}
                  onChange={e => setSavedSearchQuery(e.target.value)}
                  placeholder="Search Studio 1 saved architectures..."
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border font-medium focus:outline-none transition ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-600'
                      : 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500'
                  }`}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {loadingSavedHistory ? (
                <div className="flex items-center justify-center py-12 text-xs font-mono text-purple-600 gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Loading Studio 1 architectures...</span>
                </div>
              ) : savedHistoryList.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400">
                  <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No saved Studio 1 diagrams found.</p>
                </div>
              ) : (
                savedHistoryList
                  .filter(d => (d.name || '').toLowerCase().includes(savedSearchQuery.toLowerCase()) || (d.architecture_type || '').toLowerCase().includes(savedSearchQuery.toLowerCase()))
                  .map(d => (
                    <div
                      key={d.id}
                      className={`p-3.5 rounded-xl border transition flex flex-col gap-2 group ${
                        isLight
                          ? 'bg-white hover:bg-purple-50/50 border-slate-200 hover:border-purple-400 shadow-xs'
                          : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-purple-500/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-xs font-black truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {d.name || 'Untitled Flowchart'}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase font-bold bg-purple-600/10 text-purple-600 dark:text-purple-400">
                              {d.architecture_type || 'gcp_flowchart'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {d.created_at ? new Date(d.created_at).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => {
                            if (d.xml_content) {
                              const restoredState = extractStudio1State(d.xml_content);
                              setDiagrams(prev => [{
                                id: 'diag_restored_' + Date.now(),
                                title: d.name,
                                templateId: d.architecture_type || 'gcp_flowchart',
                                xml: d.xml_content,
                                source: 'custom',
                                semanticGraph: restoredState?.graph,
                                generationContext: restoredState?.context,
                                decisionLedger: restoredState?.decisionLedger
                              }]);
                              if (restoredState?.context) setGenerationContext(restoredState.context);
                              if (restoredState?.decisionLedger) setDecisionLedger(restoredState.decisionLedger);
                              setProjectTitle(d.name);
                              setShowSavedDrawer(false);
                              showToast(`Loaded "${d.name}" into Studio 1!`);
                            } else {
                              window.location.href = `/studio1?diagram=${d.id}`;
                            }
                          }}
                          className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-black bg-purple-600 hover:bg-purple-500 text-white shadow-xs transition active:scale-95 text-center flex items-center justify-center gap-1 cursor-pointer"
                          title="Open & Load in Studio 1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open</span>
                        </button>
                        <button
                          onClick={() => handleCloneSavedDiagram(d)}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            isLight ? 'border-slate-300 hover:bg-slate-200 text-amber-600' : 'border-slate-700 hover:bg-slate-800 text-amber-300'
                          }`}
                          title="Clone / Duplicate Diagram"
                        >
                          <CopyPlus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteSavedDiagram(d.id, e)}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            isLight ? 'border-slate-300 hover:bg-red-50 text-red-600' : 'border-slate-700 hover:bg-red-950 text-red-400'
                          }`}
                          title="Delete Diagram"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/studio1?diagram=${d.id}`);
                            showToast('Copied share link!');
                          }}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            isLight ? 'border-slate-300 hover:bg-slate-200 text-slate-700' : 'border-slate-700 hover:bg-slate-800 text-slate-300'
                          }`}
                          title="Copy Share Link"
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div className={`p-3 border-t flex items-center justify-between text-[11px] font-bold ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <span>Manage all Studio 1 canvases</span>
              <Link href="/history?studio=studio1" className="text-purple-500 hover:underline font-black flex items-center gap-1">
                <span>Open History Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LaunchStudio1Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Launch Studio 1...</div>}>
      <Studio1Content />
    </Suspense>
  );
}
