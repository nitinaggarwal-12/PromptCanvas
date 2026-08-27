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
  ArrowRight
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { generateGenericArchitectureXml } from '@/lib/genericArchitecture';
import { generateGcpFunctionalFlowchartXml } from '@/lib/gcpFunctionalFlowchart';
import { generateGCPInfrastructureTopology } from '@/lib/gcpInfrastructureTopology';
import { sanitizeDrawioXmlAttributes, injectUseCaseFlavor } from '@/lib/diagramCleaner';

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
  source: 'functional_flowchart' | 'custom';
  lastPrompt?: string;
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

function Studio2Content() {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // 1. Project & Use Case Scope Inputs & Searchable Dropdowns
  const [projectName, setProjectName] = useState<string>('');
  const [useCaseName, setUseCaseName] = useState<string>('');
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectScopePrompt, setProjectScopePrompt] = useState<string>('');

  // Past Projects & Use Cases State (Pre-seeded with Rich GCP Architectures + LocalStorage)
  const [pastProjects, setPastProjects] = useState<PastProject[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('promptcanvas_studio2_past_projects');
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
        source: 'functional_flowchart'
      },
      {
        id: 'diag_2',
        title: '☁️ Option 2: GCP Native Architecture',
        templateId: 'gcp_native_architecture',
        xml: xmlGcp,
        source: 'custom'
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
        source: 'functional_flowchart'
      },
      {
        id: 'diag_2',
        title: '☁️ Option 2: GCP Native Architecture',
        templateId: 'gcp_native_architecture',
        xml: xmlGcp,
        source: 'custom'
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
        projectName: '',
        useCaseName: '',
        projectTitle: '',
        projectScopePrompt: '',
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
      text: '⚡ Live GCP architecture canvas ready. Enter a prompt or select a suggested step below to update.',
      timestamp: 'Just now'
    }
  ]);

  // Active diagram getter
  const activeDiagram = useMemo(() => {
    return diagrams.find((d) => d.id === activeDiagramId) || diagrams[0];
  }, [diagrams, activeDiagramId]);

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

  // Snapshot Creation Helper (supports explicit version override e.g. v2.0 promotion)
  const pushNewVersion = useCallback(
    (
      actionSummary: string,
      author: 'User' | 'AI Assistant' | 'System',
      updatedDiagrams?: StudioDiagramTab[],
      changedComponents?: string[],
      targetTier?: string,
      overrideVersionTag?: string
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
        targetTier
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
      promotedTag
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
            localStorage.setItem('promptcanvas_studio2_past_projects', JSON.stringify(updated));
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

      const updatedDiagrams: StudioDiagramTab[] = [
        {
          id: 'diag_1',
          title: `Diagram 1 • ${project.name}`,
          templateId: 'gcp_functional_flowchart',
          xml: reloadedXml,
          source: 'functional_flowchart',
          lastPrompt: project.suggestedPrompt
        }
      ];

      setDiagrams(updatedDiagrams);
      setActiveDiagramId('diag_1');

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
      if (projectName) {
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

        showToast(`🎯 Updated use case to "${selectedUseCase}"`);
      }
    },
    [projectName, projectScopePrompt, isLight, diagrams, activeDiagramId, showToast]
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
        showToast(`↺ Restored state: ${snap.versionTag} (${snap.actionSummary})`);
      }
    }
  }, [currentHistoryIndex, versionHistory, showToast]);

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
                source: 'custom'
              };
            }
            return diag;
          });
          setDiagrams(updatedDiagrams);
          const tag = pushNewVersion('Synced edits from Draw.io Editor', 'User', updatedDiagrams, ['User Draw.io Canvas Updates'], 'Canvas Workspace');
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
    const p = prompt.toLowerCase();
    if (p.includes('spanner') || p.includes('database') || p.includes('sql') || p.includes('replica') || p.includes('persist')) {
      return {
        summary: 'Provisioned High-Availability Database Layer & TrueTime Replication',
        targetTier: 'Application & Data (Tier 3)',
        changedComponents: ['Cloud Spanner / Cloud SQL HA', 'BigQuery Analytical Warehouse', 'Data Lifecycle Storage Policies']
      };
    }
    if (p.includes('stream') || p.includes('event') || p.includes('pubsub') || p.includes('kafka') || p.includes('dataflow') || p.includes('queue')) {
      return {
        summary: 'Configured Low-Latency Pub/Sub Messaging & Event Orchestration',
        targetTier: 'Load Balancing & Compute (Tier 2)',
        changedComponents: ['Cloud Pub/Sub Message Bus', 'Async Task Processors', 'Regional Subnet A Queue Workers']
      };
    }
    if (p.includes('rag') || p.includes('vector') || p.includes('vertex') || p.includes('agent') || p.includes('gemini') || p.includes('ai') || p.includes('llm')) {
      return {
        summary: 'Integrated Vertex AI Agent Platform & Knowledge Graph Reasoning',
        targetTier: 'Agentic AI Services (Tier 4)',
        changedComponents: ['Gemini Agent Platform Core', 'Vertex AI Vector Search / ScaNN', 'ADK 2.0 Agent Development Kit', 'Model Management & Serving Loop']
      };
    }
    if (p.includes('armor') || p.includes('security') || p.includes('waf') || p.includes('zero') || p.includes('iap') || p.includes('vpn') || p.includes('ddos')) {
      return {
        summary: 'Enforced Edge Security, Cloud Armor WAF & Identity-Aware Proxy',
        targetTier: 'Ingress & Security (Tier 1)',
        changedComponents: ['Cloud Armor DDoS/WAF Filtering', 'Identity-Aware Proxy (IAP)', 'Global External HTTP(S) Load Balancer']
      };
    }
    if (p.includes('mig') || p.includes('gpu') || p.includes('scale') || p.includes('instance') || p.includes('gce') || p.includes('internal lb')) {
      return {
        summary: 'Configured Auto-Scaling Compute Engine MIGs & Internal Load Balancer',
        targetTier: 'Load Balancing & Compute (Tier 2)',
        changedComponents: ['Compute Engine MIG (Subnet B)', 'Regional Internal Load Balancer', 'Dynamic Capacity Autoscaler']
      };
    }
    if (p.includes('medicine') || p.includes('pharma') || p.includes('cleanroom') || p.includes('gxp') || p.includes('plant')) {
      return {
        summary: 'Configured Pharmaceutical & Cleanroom Manufacturing IT Platform',
        targetTier: 'End-to-End GCP Industrial Topology',
        changedComponents: ['Cleanroom OT Gateway', 'GxP Batch Application (GKE)', 'EBR & MES API', 'Sterile Bioreactor Sync']
      };
    }
    return {
      summary: 'Updated Google Cloud Functional Flowchart Topology',
      targetTier: 'Global Multi-Tier VPC',
      changedComponents: ['Ingress & Perimeter Security', 'Regional Compute Subnets', 'Application State & Analytics Stores', 'Agentic Vertex AI Foundation']
    };
  };

  // Main Prompt Synthesis Handler (with live Gemini Architecture Validation & Auto-Correction)
  const handleSynthesizeArchitecture = useCallback(
    async (customPrompt?: string) => {
      const rawPrompt = (customPrompt || projectScopePrompt).trim();
      const basePrompt = rawPrompt || (projectName && useCaseName ? `${projectName} ${useCaseName}` : '') || 'Enterprise Google Cloud Native Architecture';
      const promptToUse = basePrompt.trim();

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

        try {
          const res = await fetch('/api/studio2/validate-and-synthesize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              projectName: derivedProject,
              useCaseName: derivedUseCase,
              projectTitle: titleToUse,
              prompt: promptToUse,
              theme: isLight ? 'light' : 'dark'
            })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.xml) {
              finalXml = data.xml;
              geminiAudit = data.geminiAudit;
            }
          }
        } catch (err: any) {
          console.warn('[Studio2] Fallback to client synthesis:', err?.message);
        }

        if (!finalXml) {
          const generatedXml = generateGcpFunctionalFlowchartXml({
            projectTitle: titleToUse,
            projectName: derivedProject,
            useCaseName: derivedUseCase,
            prompt: promptToUse,
            theme: isLight ? 'light' : 'dark'
          });
          finalXml = injectUseCaseFlavor(generatedXml, titleToUse, promptToUse);
        }

        // Autosave mutated XML to active diagram in canvas immediately
        const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
          if (diag.id === activeDiagramId) {
            return {
              ...diag,
              title: `${titleToUse} • Functional Flowchart`,
              xml: finalXml,
              source: 'functional_flowchart',
              lastPrompt: promptToUse
            };
          }
          return diag;
        });

        setDiagrams(updatedDiagrams);

        const analysis = analyzePromptChanges(promptToUse);

        // Put changes in pending review / micro-version state
        setPendingVerification({
          isPending: true,
          prompt: promptToUse,
          summary: analysis.summary,
          targetTier: analysis.targetTier,
          changedComponents: analysis.changedComponents,
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
          analysis.changedComponents
        );
        setDynamicSuggestions(nextSuggestions);

        // Crisp, ultra-concise assistant confirmation status (no repetitive regurgitation)
        const assistantMsg: StudioChatMessage = {
          id: `ast_${Date.now()}`,
          sender: 'assistant',
          text: `⚡ Applied to canvas • ${microVersionTag} (Draft)`,
          timestamp: 'Just now'
        };

        setChatMessages((prev) => [...prev, assistantMsg]);
        showToast(`⚡ Canvas updated • ${microVersionTag} (Draft)`);
      } catch (err: any) {
        console.error('[Studio2] Synthesis error:', err);
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
      versionHistory,
      showToast
    ]
  );

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
              <span className="font-bold text-teal-600 dark:text-teal-400">Launch Studio 2</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-tight">
                  AI Architecture &amp; Specification Studio 2
                </h1>
                <p className="text-xs text-slate-500">
                  GCP Cloud Architecture Functional Flowchart • Conversational Gemini 3.7 Engine • Full Versioning
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
          </div>
        </div>

        {/* 2-Column Split Workspace: 25% Left Chat, 75% Right Diagram */}
        <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
          {/* Left Column: Scope & Conversational Requirements (25% Width) */}
          <div className="w-full lg:w-[25%] lg:min-w-[320px] flex-shrink-0 space-y-4">
            <div className={`p-4 md:p-5 rounded-2xl border shadow-sm space-y-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}>
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
                  <span className="text-[9.5px] font-mono text-teal-600 dark:text-teal-400 font-bold shrink-0">Gemini 3.1 Pro Engine</span>
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
                        </div>
                        <span className="text-[8.5px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                      </div>
                    ))}

                    {isAiThinking && (
                      <div className="flex items-center gap-2 text-xs text-teal-600 font-bold p-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Assistant is analyzing context &amp; updating functional flowchart...</span>
                      </div>
                    )}
                    <div ref={chatMessagesEndRef} />
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
                  placeholder="Describe your target cloud services, data flow, throughput requirements, security policies, and integrations... (Press Enter to Synthesize)"
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
                      <span>Synthesize Architecture Now</span>
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
                  <DiagramViewerRenderSafe
                    key={`studio2_viewport_${activeDiagram.id}_${isLight ? 'light' : 'dark'}_${versionHistory[currentHistoryIndex]?.id || currentHistoryIndex}_${activeDiagram.xml.length}`}
                    diagramId="gcp_functional_flowchart"
                    diagramType="functional_flowchart"
                    xml={activeDiagram.xml}
                    aspectRatioId="16:9"
                    bgTheme={isLight ? 'light' : 'dark'}
                    allowFullScaleScroll={false}
                  />
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
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Inline Draw.io Editor</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenDrawioNewTab}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
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
                  Active Target: <span className="font-bold text-teal-600 dark:text-teal-400">GCP Cloud Architecture Functional Flowchart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      {showDiffModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-teal-500" />
                <h3 className="font-bold text-sm">
                  Architecture Version Diff Comparison
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDiffModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-500 mb-1">Current State ({versionHistory[currentHistoryIndex]?.versionTag || 'v1.0'})</div>
                  <div className="font-bold text-sm text-teal-600 dark:text-teal-400">
                    {versionHistory[currentHistoryIndex]?.actionSummary || 'Initial baseline'}
                  </div>
                  <div className="mt-2 text-xs space-y-1">
                    <div className="text-slate-500 font-medium">Target: {versionHistory[currentHistoryIndex]?.targetTier || 'Global VPC'}</div>
                    <div className="text-slate-500 font-medium">Components: {versionHistory[currentHistoryIndex]?.changedComponents?.join(', ') || 'Base architecture'}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-500 mb-1">Baseline Comparison</div>
                  <select
                    value={diffBaseIndex}
                    onChange={(e) => setDiffBaseIndex(Number(e.target.value))}
                    className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900"
                  >
                    {versionHistory.map((v, idx) => (
                      <option key={v.id} value={idx}>
                        {v.versionTag} - {v.actionSummary} ({v.timestamp})
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 text-xs space-y-1">
                    <div className="text-slate-500 font-medium">Target: {versionHistory[diffBaseIndex]?.targetTier || 'Global VPC'}</div>
                    <div className="text-slate-500 font-medium">Components: {versionHistory[diffBaseIndex]?.changedComponents?.join(', ') || 'Base architecture'}</div>
                  </div>
                </div>
              </div>

              {/* Injected Delta Breakdown */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-500" />
                  <span>Added / Enhanced Architecture Nodes in Current Snapshot:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(versionHistory[currentHistoryIndex]?.changedComponents || ['GCP Functional Flowchart Base']).map((node) => (
                    <span key={node} className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold border border-emerald-300 dark:border-emerald-700">
                      + {node}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}

export default function LaunchStudio2Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Launch Studio 2...</div>}>
      <Studio2Content />
    </Suspense>
  );
}
