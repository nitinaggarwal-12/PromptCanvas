'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Layers,
  Bot,
  Send,
  FileText,
  Network,
  CheckCircle2,
  Copy,
  ChevronRight,
  RefreshCw,
  Sliders,
  Zap,
  Undo2,
  Redo2,
  History,
  LayoutGrid,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  ExternalLink,
  Info,
  X,
  Code2,
  Check,
  BookOpen,
  GitCompare,
  ArrowRight,
  Search,
  FolderOpen,
  CopyPlus,
  Link as LinkIcon,
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  ChevronDown,
  FileDown
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  type CanonicalTemplate
} from '@/lib/canonical/canonicalTemplates';
import {
  DOC_ARCHETYPES_META,
  type DocArchetypeMeta,
  type ArchetypeId,
  type BlueprintSlot
} from '@/lib/compose/archetypes';
import { generateGcpNativeArchitectureXml } from '@/lib/gcpNativeArchitecture';
import { injectUseCaseFlavor } from '@/lib/diagramCleaner';
import { injectDomainFlavorXml } from '@/lib/canonical/canonicalTemplates';
import {
  SearchablePromptSuggestionsDropdown,
  SearchableDomainFlavorDropdown,
  SearchableProjectDropdown,
  SearchableUseCaseDropdown,
  EXTENDED_DOMAIN_OPTIONS,
  type PromptOption,
  type DomainOption,
} from '@/components/SearchableSelector';

// ==========================================
// DATA TYPES FOR STUDIO MULTI-DIAGRAM & VCS
// ==========================================

export interface StudioDiagramTab {
  id: string; // e.g. "diag_1", "diag_2"
  title: string;
  templateId: string; // "01", "08", "custom", "scratch"
  xml: string;
  source: 'blueprint' | 'scratch' | 'placeholder';
  lastPrompt?: string;
}

export interface StudioVersionSnapshot {
  id: string;
  versionTag: string; // "v1.0", "v1.1", ...
  timestamp: string; // formatted e.g. "11:42 PM"
  author: 'User' | 'AI Assistant' | 'System';
  actionSummary: string;
  activeDiagramId: string;
  diagrams: StudioDiagramTab[];
  projectName: string;
  useCaseName: string;
  projectTitle: string;
  projectScopePrompt: string;
  selectedDomain: string;
  changedComponents?: string[];
  targetTier?: string;
}

export interface StudioChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionApplied?: {
    type: 'diagram_synthesized' | 'diagram_mutated' | 'diagram_replaced' | 'diagram_added' | 'version_restored' | 'reset_scratch';
    versionTag: string;
    summary: string;
    changedComponents?: string[];
    targetTier?: string;
  };
  recommendation?: {
    projectName: string;
    useCaseName: string;
    domain: string;
    blueprintId: string;
    summary: string;
    rationale: string;
  };
  suggestedPrompts?: string[];
}

export interface EnterprisePreset {
  id: string;
  domainId: string;
  domainName: string;
  projectName: string;
  useCaseName: string;
  projectTitle: string;
  prompt: string;
  icon: string;
  badge: string;
}

export const ENTERPRISE_PRESET_LIBRARY: EnterprisePreset[] = [
  {
    id: 'retail-omnichannel',
    domainId: 'retail',
    domainName: 'Omnichannel Retail & Intelligent Supply Chain',
    projectName: 'Omnichannel Commerce & Order Orchestration',
    useCaseName: 'Real-Time Order Ingestion & Fraud Scoring Mesh',
    projectTitle: 'Google Cloud Multi-Region Microservices & Event-Driven Commerce Engine',
    prompt: 'Architect a multi-region Google Cloud event-driven microservices platform with Apigee API Gateway, GKE Autopilot, Pub/Sub Event Mesh, Dataflow real-time streaming ETL, Vertex AI ScaNN Vector Search for fraud scoring, and Cloud Spanner multi-region database with zero downtime.',
    icon: '🛍️',
    badge: 'Retail & Commerce'
  },
  {
    id: 'biopharma-oncology',
    domainId: 'biopharma',
    domainName: 'Bio-Pharma Precision Oncology & Regulatory AI',
    projectName: 'Precision Oncology Knowledge Graph & Drug Discovery',
    useCaseName: 'FDA 21 CFR Part 11 Adverse Event Triage & Variant Graph',
    projectTitle: 'Bio-Pharma GxP Precision Oncology Knowledge Graph & Adverse Event Triage',
    prompt: 'Design a GxP-compliant precision oncology architecture on Google Cloud featuring Cloud Spanner Property Graph for genomic variant modeling, Vertex AI Gemini 2.5 Flash for FDA 21 CFR Part 11 adverse event triage, and Cloud Healthcare API for FHIR clinical harmonization.',
    icon: '🧬',
    badge: 'Life Sciences'
  },
  {
    id: 'fintech-payments',
    domainId: 'fintech',
    domainName: 'FinTech Autonomous Wealth & High-Speed Payments',
    projectName: 'Tier-1 Real-Time ISO 20022 Payments & Fraud Engine',
    useCaseName: 'Sub-5ms Pre-Trade Fraud Detection & Multi-Region Ledger',
    projectTitle: 'FinTech High-Throughput Real-Time Payments Gateway & Fraud Mesh',
    prompt: 'Architect an ISO 20022 real-time payments platform on Google Cloud with sub-5ms transaction authorization, Cloud Spanner double-entry distributed ledger, Vertex AI Vector Search fraud anomaly detection, and Cloud Armor DDoS zero-trust protection.',
    icon: '💳',
    badge: 'FinTech & Banking'
  },
  {
    id: 'manufacturing-iot',
    domainId: 'manufacturing',
    domainName: 'Smart Manufacturing & Industrial IoT Digital Twin',
    projectName: 'Factory Automation & Industrial IoT Telemetry Mesh',
    useCaseName: 'Sub-10ms PLC Sensor Telemetry & Predictive Maintenance',
    projectTitle: 'Smart Factory Industrial IoT Edge Telemetry & Digital Twin Platform',
    prompt: 'Design an industrial IoT smart manufacturing platform with Google Cloud Distributed Cloud Edge (GDCE) for sub-10ms PLC ingestion, MQTT broker mesh, Dataflow real-time streaming anomaly detection, and BigQuery Medallion Lakehouse for predictive equipment maintenance.',
    icon: '🏭',
    badge: 'Smart Factory'
  },
  {
    id: 'telecom-5g',
    domainId: 'telecom',
    domainName: 'Telecommunications & 5G Core Network Slicing (O-RAN)',
    projectName: '5G Core Network Slicing & Edge Telemetry Mesh',
    useCaseName: 'O-RAN Low-Latency Telemetry & Autonomous MEC Scaling',
    projectTitle: '5G Telco O-RAN Multi-Access Edge Cloud & Network Slicing Engine',
    prompt: 'Architect a 5G Core Network Slicing telemetry and control plane using Anthos Telecom Multi-Cloud, Kafka on GKE Autopilot, Vertex AI automated QoS optimization, and Cloud Bigtable for petabyte-scale cell tower timeseries storage.',
    icon: '📡',
    badge: '5G & Telco'
  },
  {
    id: 'cybersecurity-soc',
    domainId: 'cybersecurity',
    domainName: 'Zero-Trust Cybersecurity & SOC SecOps (SIEM / SOAR)',
    projectName: 'Enterprise Zero-Trust Mesh & Autonomous SIEM / SOAR',
    useCaseName: 'Chronicle Real-Time Threat Hunting & Gemini Remediation',
    projectTitle: 'Enterprise Zero-Trust SOC Cloud Perimeter & Automated Incident Response',
    prompt: 'Design an enterprise Zero-Trust cybersecurity mesh on Google Cloud with Chronicle SIEM log ingestion, Gemini Security AI for automated playbook remediation, BeyondCorp Enterprise Identity-Aware Proxy (IAP), and VPC Service Controls sovereign perimeters.',
    icon: '🔒',
    badge: 'Cybersecurity'
  },
  {
    id: 'saas-multitenant',
    domainId: 'saas',
    domainName: 'Enterprise SaaS Multi-Tenant Cloud Platform',
    projectName: 'Global Multi-Tenant B2B Cloud Platform',
    useCaseName: 'Zero-Trust Tenant Sharding & Distributed Redis Caching',
    projectTitle: 'Global Multi-Tenant SaaS Platform with GKE Autopilot & Spanner Multi-Region',
    prompt: 'Architect a high-scale multi-tenant B2B SaaS platform on Google Cloud with GKE Autopilot microservices, Cloud Memorystore Redis clusters, Cloud Spanner tenant-isolated tables, Apigee API Management rate limiting, and Cloud Armor WAF.',
    icon: '🏢',
    badge: 'Enterprise SaaS'
  },
  {
    id: 'media-genai',
    domainId: 'media',
    domainName: 'Media Streaming, 4K Live Transcoding & CDN Edge',
    projectName: 'Real-Time 4K Video Transcoding & Generative Content Engine',
    useCaseName: 'Low-Latency HLS Streaming & Gemini Multimodal Video RAG',
    projectTitle: 'Next-Gen Media Live 4K Streaming & Veo / Gemini Multimodal Content Studio',
    prompt: 'Design a global live streaming and AI video platform with Live Transcoder API, Cloud CDN Edge low-latency delivery, Google DeepMind Veo / Imagen 3 generative studio pipelines, and BigQuery vector search for video scene retrieval.',
    icon: '🎬',
    badge: 'Media & GenAI'
  },
  {
    id: 'supplychain-logistics',
    domainId: 'supplychain',
    domainName: 'Global Supply Chain & Medallion Cold-Chain Lakehouse',
    projectName: 'Autonomous Logistics & Cold-Chain Telemetry Tracking',
    useCaseName: 'RFID Geofencing & Real-Time Temperature Anomaly Alerting',
    projectTitle: 'Global Cold-Chain Supply Chain Lakehouse & Real-Time Fleet Telematics',
    prompt: 'Architect a global supply chain IoT platform on Google Cloud with real-time GPS and cold-chain temperature telemetry ingestion via Pub/Sub, Dataflow geofencing anomaly alerts, BigQuery Iceberg Lakehouse, and Vertex AI dynamic route optimization.',
    icon: '📦',
    badge: 'Logistics & Supply'
  },
  {
    id: 'healthcare-ehr',
    domainId: 'healthcare',
    domainName: 'Healthcare & Clinical EHR Interoperability (FHIR / HL7)',
    projectName: 'Clinical EHR Interoperability & Medical AI Copilot',
    useCaseName: 'FHIR R4 Streaming Ingestion & HIPAA Clinical Reasoning',
    projectTitle: 'Healthcare FHIR Interoperability Cloud with HIPAA Compliant Vertex AI Copilot',
    prompt: 'Architect a HIPAA-compliant healthcare data platform with Apigee X API Gateway, Cloud Healthcare API for FHIR R4 and DICOM imaging, BigQuery BigLake clinical analytics, and Vertex AI MedLM / Gemini for automated clinical documentation summaries.',
    icon: '🩺',
    badge: 'Healthcare EHR'
  }
];

export const QUICK_REQUIREMENT_CHIPS = [
  { label: '+ Spanner Multi-Region', snippet: ', with Cloud Spanner multi-region dual-entry replication' },
  { label: '+ Vertex AI ScaNN RAG', snippet: ', incorporating Vertex AI ScaNN vector embeddings and Gemini 2.5 Flash RAG' },
  { label: '+ Pub/Sub Event Mesh', snippet: ', decoupled via Pub/Sub event mesh with dead-letter queue routing' },
  { label: '+ Zero-Trust IAP & VPC-SC', snippet: ', protected by BeyondCorp Identity-Aware Proxy (IAP) and VPC Service Controls' },
  { label: '+ GKE Autopilot Pods', snippet: ', orchestrated across GKE Autopilot clusters with autoscaling' },
  { label: '+ BigLake Medallion Lakehouse', snippet: ', backed by BigQuery BigLake medallion streaming lakehouse (Bronze/Silver/Gold)' },
];

const MAX_ROLLING_VERSIONS = 10;

// Helper to extract changed components and affected layer from prompt
export function analyzePromptChanges(prompt: string, templateName: string): { changedComponents: string[]; targetTier: string; summary: string } {
  const lower = prompt.toLowerCase();
  const changed: string[] = [];
  let targetTier = 'Core Architecture Layer';
  let summary = `Updated with requirements: ${prompt.slice(0, 50)}...`;

  if (/medicine|pharma.*(?:plant|manufactur|design)|drug.*(?:plant|manufactur|design)|cleanroom|gxp|batch recipe|ebr/i.test(lower)) {
    changed.push('Shop Floor Cleanroom OT Channels & IoT Sensors');
    changed.push('MES / MOM GxP Batch Recipe & Electronic Records (EBR)');
    changed.push('Industrial Edge Gateway & SCADA Historians');
    changed.push('AI Quality Inspection & Cleanroom Compliance');
    targetTier = 'Layer 1 & 3: Shop Floor OT, Cleanroom Ingress & GxP MES';
    summary = 'Synthesized Pharmaceutical & Medicine Manufacturing IT Architecture';
  } else if (/manufactur|factory|plant|scada|plc|opc|industrial/i.test(lower)) {
    changed.push('Shop Floor OT Channels & Industrial CNC/PLCs');
    changed.push('MES / MOM Production Scheduling & OEE Monitoring');
    changed.push('Industrial Edge Gateway & MQTT Collectors');
    changed.push('Predictive Maintenance & Digital Twin Sync');
    targetTier = 'Shop Floor OT, MES & Cloud Industrial Intelligence';
    summary = 'Synthesized Smart Manufacturing & Industrial IoT Architecture';
  } else if (/notebook|workbench|colab|jupyter/i.test(lower)) {
    changed.push('Vertex AI Gemini Enterprise Notebooks (Workbench)');
    changed.push('MLOps Model Garden & Agent Tooling');
    targetTier = 'Layer 3: AI Core, Agent Reasoning & Developer Workbenches';
    summary = 'Added Gemini Enterprise Notebooks (Vertex AI Workbench)';
  } else if (/spanner|truetime|active-active/i.test(lower)) {
    changed.push('Cloud Spanner Global TrueTime Active-Active');
    changed.push('Multi-Region Distributed State Store');
    targetTier = 'Layer 5: Database & Lakehouse Storage';
    summary = 'Added Cloud Spanner TrueTime Multi-Region Ledger';
  } else if (/pubsub|kafka|stream|event/i.test(lower)) {
    changed.push('Cloud Pub/Sub & Kafka High-Throughput Event Mesh');
    changed.push('Dataflow Real-Time Stream Processor');
    targetTier = 'Layer 4: Event Mesh & Ingestion Pipelines';
    summary = 'Added Pub/Sub & Kafka Real-Time Event Streaming Mesh';
  } else if (/vector|rag|scann|embedding/i.test(lower)) {
    changed.push('Vertex AI Vector Search (ScaNN 768-dim Embeddings)');
    changed.push('Document Retrieval & Grounding Service');
    targetTier = 'Layer 3: AI Reasoning & Vector Store';
    summary = 'Configured Vertex AI Vector Search & ScaNN Grounding';
  } else if (/armor|perimeter|vpc|zero trust|beyondcorp/i.test(lower)) {
    changed.push('BeyondCorp Zero-Trust Ingress & Cloud Armor WAF');
    changed.push('VPC Service Perimeters & CMEK Key Protection');
    targetTier = 'Layer 1 & 6: Ingress Security & Sovereign Governance';
    summary = 'Enforced Zero-Trust Security Perimeters & Cloud Armor';
  } else if (/lakehouse|bigquery|dataplex/i.test(lower)) {
    changed.push('BigQuery Studio Analytics Engine');
    changed.push('Dataplex Universal Data Governance & Catalog');
    targetTier = 'Layer 5: Lakehouse & Multi-Region Data Mesh';
    summary = 'Configured BigQuery Studio & Dataplex Lakehouse';
  } else {
    changed.push(`Customized ${templateName} components with project scope`);
    targetTier = 'Domain Architecture Systems';
    summary = `Synthesized architecture for ${templateName}`;
  }

  return { changedComponents: changed, targetTier, summary };
}

// Generic Blank Architecture Canvas XML for "Design from Scratch"
function generateBlankScratchXml(title: string = 'Custom Google Cloud Architecture', theme: 'light' | 'dark' = 'light', domain: string = 'enterprise'): string {
  return generateGcpNativeArchitectureXml({
    projectTitle: title,
    domain,
    theme
  });
}

function StudioContent() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const searchParams = useSearchParams();
  const router = useRouter();

  // Studio Mode: 'diagrams' | 'documents' | 'both'
  const initialMode = (searchParams.get('mode') as 'diagrams' | 'documents' | 'both') || 'diagrams';
  const [studioMode, setStudioMode] = useState<'diagrams' | 'documents' | 'both'>(initialMode);

  // Preview tab on right pane: 'diagram' | 'spec'
  const [previewTab, setPreviewTab] = useState<'diagram' | 'spec'>('diagram');

  // Initial State: Blank inputs by default
  const [projectName, setProjectName] = useState<string>('');
  const [useCaseName, setUseCaseName] = useState<string>('');
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>(searchParams.get('domain') || 'biopharma');
  const [projectScopePrompt, setProjectScopePrompt] = useState<string>('');

  // Track whether the user has performed initial synthesis
  const [hasSynthesized, setHasSynthesized] = useState<boolean>(false);

  // Multi-Diagram Management
  const [activeDiagramId, setActiveDiagramId] = useState<string>('diag_1');
  const [diagrams, setDiagrams] = useState<StudioDiagramTab[]>(() => {
    // Initial placeholder diagram: Brand-New Pure GCP Native Reference Architecture
    const initialXml = generateGcpNativeArchitectureXml({
      projectTitle: 'Enterprise Google Cloud Native Architecture',
      domain: 'enterprise',
      theme: isLight ? 'light' : 'dark'
    });
    return [
      {
        id: 'diag_1',
        title: 'Diagram 1 • GCP Native Topology',
        templateId: 'gcp_native',
        xml: initialXml,
        source: 'placeholder'
      }
    ];
  });

  // Active Document Archetype (for documents view)
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId>('sdd');

  // UI Modals & Menus
  const [showReplaceModal, setShowReplaceModal] = useState<boolean>(false);
  const [blueprintModalMode, setBlueprintModalMode] = useState<'replace' | 'add_tab'>('replace');
  const [replaceModalTab, setReplaceModalTab] = useState<'diagrams' | 'documents'>('diagrams');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showDiffModal, setShowDiffModal] = useState<boolean>(false);
  const [diffBaseIndex, setDiffBaseIndex] = useState<number>(1);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Prefill Presets Menu State
  const [presetCycleIndex, setPresetCycleIndex] = useState<number>(0);
  const [showPrefillMenu, setShowPrefillMenu] = useState<boolean>(false);
  const prefillMenuRef = useRef<HTMLDivElement>(null);

  // Diagrams Dropdown & Actions State
  const [showDiagramsMenu, setShowDiagramsMenu] = useState<boolean>(false);
  const [isRenamingDiagram, setIsRenamingDiagram] = useState<boolean>(false);
  const [renameTitleInput, setRenameTitleInput] = useState<string>('');
  const diagramsMenuRef = useRef<HTMLDivElement>(null);

  // Draw.io Child Window Ref for live Bidirectional postMessage Sync
  const drawioChildWindowRef = useRef<Window | null>(null);

  // Helper to show transient toast message
  const showToast = useCallback((msg: string) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification(null);
    }, 3500);
  }, []);

  // Hydrate Diagram from URL query parameter (?diagram=<id> or ?id=<id>)
  useEffect(() => {
    const diagId = searchParams.get('diagram') || searchParams.get('id');
    if (!diagId) return;

    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/diagrams/${diagId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted || !data) return;

        if (data.name) setProjectTitle(data.name);
        if (data.project_title) setProjectTitle(data.project_title);
        if (data.project_name) setProjectName(data.project_name);
        if (data.use_case) setUseCaseName(data.use_case);
        if (data.prompt) setProjectScopePrompt(data.prompt);

        const latestXml = data.xml_content || (data.versions && data.versions[0]?.xml_content);
        if (latestXml) {
          const loadedTab: StudioDiagramTab = {
            id: data.id || 'diag_loaded',
            title: data.name || 'Imported Architecture',
            templateId: data.architecture_type || 'custom',
            xml: latestXml,
            source: 'blueprint'
          };
          setDiagrams([loadedTab]);
          setActiveDiagramId(loadedTab.id);
          setHasSynthesized(true);
          showToast(`✨ Loaded architecture "${data.name || 'Diagram'}" into Studio`);
        }
      } catch (err) {
        console.error('Failed to hydrate diagram in Studio Pro:', err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [searchParams, showToast]);

  // Rolling 10-Version History Buffer
  const [versionHistory, setVersionHistory] = useState<StudioVersionSnapshot[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);

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
          !d.created_studio ||
          (d.architecture_type && (d.architecture_type.startsWith('canonical') || d.architecture_type.includes('unified'))) ||
          (d.name && d.name.toLowerCase().includes('studio 1'))
        );
        setSavedHistoryList(studio1Items);
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
          architecture_type: d.architecture_type || 'canonical_diagram',
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

  // Chat State
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<StudioChatMessage[]>([]);

  // Find active diagram object
  const activeDiagram = useMemo(() => {
    return diagrams.find((d) => d.id === activeDiagramId) || diagrams[0];
  }, [diagrams, activeDiagramId]);

  // Active diagram 0-based index
  const activeDiagramIndex = useMemo(() => {
    return Math.max(0, diagrams.findIndex((d) => d.id === activeDiagramId));
  }, [diagrams, activeDiagramId]);

  // Active Archetype Metadata
  const activeArchetypeMeta: DocArchetypeMeta = useMemo(() => {
    const found = DOC_ARCHETYPES_META.find((a) => a.id === selectedArchetypeId);
    return found || DOC_ARCHETYPES_META[2];
  }, [selectedArchetypeId]);

  // Current active version tag
  const currentVersionTag = useMemo(() => {
    if (versionHistory.length === 0) return 'v0.1 (Draft)';
    const snap = versionHistory[currentHistoryIndex];
    return snap ? snap.versionTag : 'v1.0';
  }, [versionHistory, currentHistoryIndex]);

  // Sync Project Name & Use Case Name
  const handleUpdateProjectName = (val: string) => {
    setProjectName(val);
    const combined = val ? (useCaseName ? `${val} — ${useCaseName}` : val) : useCaseName;
    setProjectTitle(combined);
  };

  const handleUpdateUseCaseName = (val: string) => {
    setUseCaseName(val);
    const combined = projectName ? (val ? `${projectName} — ${val}` : projectName) : val;
    setProjectTitle(combined);
  };

  const handleUpdateProjectTitle = (val: string) => {
    setProjectTitle(val);
    if (val.includes(' — ')) {
      const [p, u] = val.split(' — ');
      setProjectName(p.trim());
      setUseCaseName(u.trim());
    } else if (val.includes(' - ')) {
      const [p, u] = val.split(' - ');
      setProjectName(p.trim());
      setUseCaseName(u.trim());
    }
  };

  // Canvas Viewport & Export Controls
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [canvasTheme, setCanvasTheme] = useState<'light' | 'dark'>(isLight ? 'light' : 'dark');
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Sync canvas theme with global theme by default
  useEffect(() => {
    setCanvasTheme(isLight ? 'light' : 'dark');
  }, [isLight]);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (diagramsMenuRef.current && !diagramsMenuRef.current.contains(event.target as Node)) {
        setShowDiagramsMenu(false);
      }
      if (prefillMenuRef.current && !prefillMenuRef.current.contains(event.target as Node)) {
        setShowPrefillMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportDrawioXml = () => {
    try {
      const blob = new Blob([activeDiagram.xml], { type: 'application/xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(projectName || 'architecture').toLowerCase().replace(/[^a-z0-9]/g, '_')}_${activeDiagram.templateId || 'diagram'}.drawio`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setShowExportMenu(false);
      showToast('📥 Exported Draw.io XML file!');
    } catch (err) {
      showToast('⚠️ Could not export XML file');
    }
  };

  const handleExportSvg = () => {
    try {
      const blob = new Blob([activeDiagram.xml], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(projectName || 'architecture').toLowerCase().replace(/[^a-z0-9]/g, '_')}_${activeDiagram.templateId || 'diagram'}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setShowExportMenu(false);
      showToast('📥 Exported SVG file!');
    } catch (err) {
      showToast('⚠️ Could not export SVG file');
    }
  };

  // Helper to push a new version snapshot into the rolling 10-item buffer
  const pushNewVersion = useCallback(
    (
      actionSummary: string,
      author: 'User' | 'AI Assistant' | 'System',
      updatedDiagrams?: StudioDiagramTab[],
      changedComponents?: string[],
      targetTier?: string
    ) => {
      const currentDiagramsState = updatedDiagrams || diagrams;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      let nextTag = 'v1.0';
      if (versionHistory.length > 0) {
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
        selectedDomain,
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
    [diagrams, activeDiagramId, projectName, useCaseName, projectTitle, projectScopePrompt, selectedDomain, versionHistory]
  );

  // Undo Functionality
  const handleUndo = useCallback(() => {
    if (currentHistoryIndex < versionHistory.length - 1) {
      const targetIndex = currentHistoryIndex + 1;
      const snap = versionHistory[targetIndex];
      if (snap) {
        setCurrentHistoryIndex(targetIndex);
        setDiagrams(snap.diagrams);
        setActiveDiagramId(snap.activeDiagramId);
        setProjectName(snap.projectName);
        setUseCaseName(snap.useCaseName);
        setProjectTitle(snap.projectTitle);
        setProjectScopePrompt(snap.projectScopePrompt);
        setSelectedDomain(snap.selectedDomain);
      }
    }
  }, [currentHistoryIndex, versionHistory]);

  // Redo Functionality
  const handleRedo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const targetIndex = currentHistoryIndex - 1;
      const snap = versionHistory[targetIndex];
      if (snap) {
        setCurrentHistoryIndex(targetIndex);
        setDiagrams(snap.diagrams);
        setActiveDiagramId(snap.activeDiagramId);
        setProjectName(snap.projectName);
        setUseCaseName(snap.useCaseName);
        setProjectTitle(snap.projectTitle);
        setProjectScopePrompt(snap.projectScopePrompt);
        setSelectedDomain(snap.selectedDomain);
      }
    }
  }, [currentHistoryIndex, versionHistory]);

  // Open in Draw.io with Live Bidirectional Sync
  const handleOpenInDrawio = useCallback(() => {
    const url = 'https://app.diagrams.net/?embed=1&ui=min&spin=1&modified=unsaved&proto=json';
    const child = window.open(url, '_blank');
    if (child) {
      drawioChildWindowRef.current = child;
      showToast('🚀 Opened in Draw.io Editor with live bidirectional sync!');
    }
  }, [showToast]);

  // Bidirectional Draw.io PostMessage Integration
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
        const target = drawioChildWindowRef.current || (evt.source as Window);
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
                source: 'blueprint'
              };
            }
            return diag;
          });
          setDiagrams(updatedDiagrams);
          const tag = pushNewVersion(`Synced edits from Draw.io Editor`, 'User', updatedDiagrams);
          showToast(`✅ Saved changes from Draw.io Editor as version ${tag}!`);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeDiagram.xml, activeDiagramId, diagrams, pushNewVersion, showToast]);

  // Keyboard Shortcuts for Undo (Cmd+Z / Ctrl+Z) and Redo (Cmd+Shift+Z / Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Ref for chat auto-scroll
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length, isSynthesizing]);

  // ==========================================
  // 1. PRIMARY SYNTHESIZE ACTION
  // ==========================================
  const handleSynthesizeArchitecture = (customPrompt?: string, domainOverride?: string, forceTemplateId?: string) => {
    const domainToUse = domainOverride || selectedDomain;
    const domainObj = EXTENDED_DOMAIN_OPTIONS.find((d) => d.id === domainToUse) || EXTENDED_DOMAIN_OPTIONS[0];
    const rawPrompt = (customPrompt || projectScopePrompt).trim();
    const promptToUse = (rawPrompt || (projectName && useCaseName ? `${projectName} ${useCaseName}` : '') || domainObj.description || domainObj.name).trim();

    // 1. Immediately push user message to chat feed and clear textarea
    if (rawPrompt) {
      const userMsg: StudioChatMessage = {
        id: String(Date.now()),
        sender: 'user',
        text: rawPrompt,
        timestamp: 'Just now'
      };
      setChatMessages((prev) => [...prev, userMsg]);
      setProjectScopePrompt('');
    }

    setIsSynthesizing(true);

    setTimeout(() => {
      // 2. Intelligent Blueprint Matcher from prompt content
      let targetTemplateId = forceTemplateId;
      const lower = (promptToUse + ' ' + domainToUse).toLowerCase();

      if (!targetTemplateId) {
        if (lower.includes('manufactur') || lower.includes('plant') || lower.includes('factory') || lower.includes('medicine') || lower.includes('iot') || lower.includes('scada') || lower.includes('plc') || lower.includes('mes')) {
          targetTemplateId = lower.includes('event') || lower.includes('stream') || lower.includes('kafka') || lower.includes('pubsub') ? '43' : '36';
        } else if (lower.includes('event') || lower.includes('stream') || lower.includes('kafka') || lower.includes('pubsub') || lower.includes('dataflow')) {
          targetTemplateId = '43'; // Real-Time Streaming Event Enterprise
        } else if (lower.includes('mesh') || lower.includes('lakehouse') || lower.includes('bigquery') || lower.includes('dataplex')) {
          targetTemplateId = '42'; // Modern Data Lakehouse Data Mesh
        } else if (lower.includes('agent') || lower.includes('rag') || lower.includes('vertex') || lower.includes('genai') || lower.includes('llm') || lower.includes('assistant')) {
          targetTemplateId = '40'; // Enterprise GenAI Platform
        } else if (lower.includes('zero') || lower.includes('trust') || lower.includes('soc') || lower.includes('security') || lower.includes('threat') || lower.includes('armor')) {
          targetTemplateId = '44'; // Zero Trust Cybersecurity SOC Platform
        } else if (lower.includes('k8s') || lower.includes('kubernetes') || lower.includes('gke') || lower.includes('container') || lower.includes('cluster')) {
          targetTemplateId = '46'; // Enterprise Kubernetes Platform Engineering
        } else if (lower.includes('dr') || lower.includes('bcdr') || lower.includes('disaster') || lower.includes('multi-region') || lower.includes('failover')) {
          targetTemplateId = '48'; // BCDR Cyber Recovery Resilience
        } else if (lower.includes('pharma') || lower.includes('clinical') || lower.includes('genom') || lower.includes('fda') || lower.includes('gxp')) {
          targetTemplateId = '01'; // System Context / Clinical AI
        } else {
          targetTemplateId = activeDiagram.templateId && activeDiagram.templateId !== 'custom' && activeDiagram.templateId !== 'scratch' ? activeDiagram.templateId : '01';
        }
      }

      const template = CANONICAL_TEMPLATES.find((t) => t.id === targetTemplateId) || CANONICAL_TEMPLATES[0];
      const baseXml = template.generateXml(domainToUse, isLight ? 'light' : 'dark');

      let titleToUse = projectTitle;
      if (!titleToUse) {
        if (/medicine.*(?:plant|manufactur|design)|pharma.*(?:plant|manufactur|design)/i.test(lower)) {
          titleToUse = 'Pharmaceutical & Medicine Manufacturing IT Platform';
        } else if (/manufactur|plant|factory|scada|plc/i.test(lower)) {
          titleToUse = 'Smart Manufacturing & Industrial IoT Digital Twin';
        } else if (projectName && useCaseName) {
          titleToUse = `${projectName} — ${useCaseName}`;
        } else if (projectName) {
          titleToUse = `${projectName} • ${domainObj.name}`;
        } else {
          titleToUse = domainObj.name;
        }
      }

      const flavoredXml = injectUseCaseFlavor(baseXml, titleToUse, promptToUse);
      const changeAnalysis = analyzePromptChanges(promptToUse, template.name);

      const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
        if (diag.id === activeDiagramId) {
          return {
            ...diag,
            title: `${titleToUse} • ${template.name}`,
            templateId: targetTemplateId!,
            xml: flavoredXml,
            source: 'blueprint',
            lastPrompt: promptToUse
          };
        }
        return diag;
      });

      setDiagrams(updatedDiagrams);
      setHasSynthesized(true);
      setIsSynthesizing(false);

      const tag = pushNewVersion(
        changeAnalysis.summary,
        'System',
        updatedDiagrams,
        changeAnalysis.changedComponents,
        changeAnalysis.targetTier
      );

      const assistantMsg: StudioChatMessage = {
        id: String(Date.now()),
        sender: 'assistant',
        text: `✨ Successfully synthesized **${template.name} (#${template.id})** for **${titleToUse}** with: **"${promptToUse}"**! Committed as version **${tag}**.`,
        timestamp: 'Just now',
        actionApplied: {
          type: 'diagram_synthesized',
          versionTag: tag,
          summary: changeAnalysis.summary,
          changedComponents: changeAnalysis.changedComponents,
          targetTier: changeAnalysis.targetTier
        },
        suggestedPrompts: [
          'Add Cloud Spanner with multi-region active-active replication',
          'Add Vertex AI RAG knowledge retrieval pipeline',
          'Enforce VPC Service Perimeters and Customer-Managed Encryption (CMEK)',
          'Add another diagram for deployment & network topology'
        ]
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  // ==========================================
  // 2. CONVERSATIONAL CHATBOT HANDLER
  // ==========================================
  const handleSendChatMessage = async (overrideText?: string) => {
    const text = (overrideText || chatInput).trim();
    if (!text) return;

    const userMsg: StudioChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!overrideText) setChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let updatedXml = activeDiagram.xml;
      let actionSummary = '';
      let changeType: NonNullable<StudioChatMessage['actionApplied']>['type'] = 'diagram_mutated';
      let changedComps: string[] = [];
      let targetTierStr: string | undefined = undefined;

      // 1. Check if user wants to create a new diagram tab
      if (lower.includes('add another diagram') || lower.includes('create another diagram') || lower.includes('new diagram tab')) {
        const newId = `diag_${diagrams.length + 1}`;
        const template = CANONICAL_TEMPLATES.find((t) => t.id === '15') || CANONICAL_TEMPLATES[14];
        const newTab: StudioDiagramTab = {
          id: newId,
          title: `Diagram ${diagrams.length + 1} • Network Topology`,
          templateId: '15',
          xml: template.generateXml(selectedDomain, isLight ? 'light' : 'dark'),
          source: 'blueprint'
        };
        const nextDiagrams = [...diagrams, newTab];
        setDiagrams(nextDiagrams);
        setActiveDiagramId(newId);
        const tag = pushNewVersion(`Added Diagram ${diagrams.length + 1} (Network Topology)`, 'AI Assistant', nextDiagrams, ['New Tab: Network Topology (#15)'], 'Layer 1: Network Ingress & Topology');

        const assistantMsg: StudioChatMessage = {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: `Added a new diagram tab **Diagram ${diagrams.length + 1} • Network Topology** to your workspace. Current active diagram is now updated to this tab.`,
          timestamp: 'Just now',
          actionApplied: {
            type: 'diagram_added',
            versionTag: tag,
            summary: `Created Diagram ${diagrams.length + 1}`,
            changedComponents: ['Network Topology (#15) Tab Added'],
            targetTier: 'Layer 1: Network & Ingress Subsystem'
          }
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
        setIsAiThinking(false);
        return;
      }

      // 2. Check if user wants to design from scratch or delete
      if (lower.includes('scratch') || lower.includes('blank canvas') || lower.includes('reset to scratch') || lower.includes('delete diagram')) {
        updatedXml = generateBlankScratchXml(projectTitle || 'Custom Google Cloud Architecture', isLight ? 'light' : 'dark', selectedDomain);
        actionSummary = 'Reset to Pure Google Cloud Native Topology Canvas';
        changeType = 'reset_scratch';
        changedComps = ['Clean GCP Blank Canvas'];
        targetTierStr = 'All Architectural Layers';
      }
      // 3. User wants to switch or replace blueprint explicitly
      else if (lower.includes('blueprint') || lower.includes('switch to') || lower.includes('replace with')) {
        let bpId = '08';
        if (lower.includes('c4') || lower.includes('container')) bpId = '07';
        else if (lower.includes('sequence') || lower.includes('flow')) bpId = '11';
        else if (lower.includes('security') || lower.includes('zero trust')) bpId = '44';
        else if (lower.includes('rag') || lower.includes('vertex')) bpId = '41';
        else if (lower.includes('data') || lower.includes('lakehouse')) bpId = '42';

        const template = CANONICAL_TEMPLATES.find((t) => t.id === bpId) || CANONICAL_TEMPLATES[0];
        const baseXml = template.generateXml(selectedDomain, isLight ? 'light' : 'dark');
        updatedXml = injectUseCaseFlavor(baseXml, projectTitle || template.name, text);
        actionSummary = `Replaced with Blueprint #${bpId} (${template.name})`;
        changeType = 'diagram_replaced';
        changedComps = [`Replaced Blueprint with #${bpId} (${template.name})`];
        targetTierStr = 'Full Diagram Architecture Model';
      }
      // 4. Diagram mutation / enhancement of the active diagram
      else {
        const currentTplId = activeDiagram.templateId;
        const template = CANONICAL_TEMPLATES.find((t) => t.id === currentTplId) || CANONICAL_TEMPLATES[0];
        const base = activeDiagram.xml || template.generateXml(selectedDomain, isLight ? 'light' : 'dark');
        updatedXml = injectUseCaseFlavor(base, projectTitle || `${projectName} — ${useCaseName}` || template.name, text);

        const changeAnalysis = analyzePromptChanges(text, template.name);
        actionSummary = changeAnalysis.summary;
        changedComps = changeAnalysis.changedComponents;
        targetTierStr = changeAnalysis.targetTier;
      }

      const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
        if (diag.id === activeDiagramId) {
          return {
            ...diag,
            xml: updatedXml,
            lastPrompt: text
          };
        }
        return diag;
      });

      setDiagrams(updatedDiagrams);
      setHasSynthesized(true);
      const tag = pushNewVersion(actionSummary, 'AI Assistant', updatedDiagrams, changedComps, targetTierStr);

      const assistantMsg: StudioChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: `✅ ${actionSummary}. The modifications have been applied specifically to **${activeDiagram.title}** and saved as **${tag}** in your rolling version history.`,
        timestamp: 'Just now',
        actionApplied: {
          type: changeType,
          versionTag: tag,
          summary: actionSummary,
          changedComponents: changedComps,
          targetTier: targetTierStr
        },
        suggestedPrompts: [
          'Enforce strict RTO=0 multi-region failover rules',
          'Add OpenTelemetry distributed tracing & Cloud Monitoring',
          'Export as Draw.io XML for enterprise documentation'
        ]
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
      setIsAiThinking(false);
    }, 800);
  };

  // ==========================================
  // 3. DIAGRAM ACTION BUTTONS (ADD, REPLACE, CLONE, RENAME, RESET, DELETE)
  // ==========================================
  const handleAddBlankDiagramTab = () => {
    const newId = `diag_${Date.now()}`;
    const newIndex = diagrams.length + 1;
    const scratchXml = generateBlankScratchXml(`Diagram ${newIndex} (Blank Canvas)`, isLight ? 'light' : 'dark', selectedDomain);

    const newTab: StudioDiagramTab = {
      id: newId,
      title: `Diagram ${newIndex} (Blank Canvas)`,
      templateId: 'scratch',
      xml: scratchXml,
      source: 'scratch'
    };

    const nextDiagrams = [...diagrams, newTab];
    setDiagrams(nextDiagrams);
    setActiveDiagramId(newId);
    pushNewVersion(`Added Diagram ${newIndex} (Blank Canvas)`, 'User', nextDiagrams);
    showToast(`➕ Added Diagram ${newIndex} (Blank Canvas)`);
  };

  const handleAddFromBlueprint = (templateId: string) => {
    const template = CANONICAL_TEMPLATES.find((t) => t.id === templateId) || CANONICAL_TEMPLATES[0];
    const domainObj = EXTENDED_DOMAIN_OPTIONS.find((d) => d.id === selectedDomain) || EXTENDED_DOMAIN_OPTIONS[0];
    const titleToUse = projectTitle || (projectName && useCaseName ? `${projectName} — ${useCaseName}` : projectName ? `${projectName} • ${domainObj.name}` : domainObj.name);
    const baseXml = template.generateXml(selectedDomain, isLight ? 'light' : 'dark');
    const newXml = injectUseCaseFlavor(baseXml, titleToUse, projectScopePrompt);

    const newId = `diag_${Date.now()}`;
    const newIndex = diagrams.length + 1;
    const newTab: StudioDiagramTab = {
      id: newId,
      title: `Diagram ${newIndex} • ${template.name}`,
      templateId: template.id,
      xml: newXml,
      source: 'blueprint'
    };

    const nextDiagrams = [...diagrams, newTab];
    setDiagrams(nextDiagrams);
    setActiveDiagramId(newId);
    setShowReplaceModal(false);
    pushNewVersion(
      `Added Diagram ${newIndex} from Blueprint #${template.id} (${template.name})`,
      'User',
      nextDiagrams,
      [`Instantiated Diagram ${newIndex}: Blueprint #${template.id} (${template.name})`],
      'Architecture Blueprint Tab'
    );
    showToast(`➕ Added Diagram ${newIndex} from Blueprint #${template.id} (${template.name})`);
  };

  // Backwards-compatible alias
  const handleAddDiagramTab = () => handleAddBlankDiagramTab();

  const handleCloneDiagramTab = (idToClone?: string) => {
    const sourceId = idToClone || activeDiagramId;
    const sourceDiagram = diagrams.find((d) => d.id === sourceId) || activeDiagram;
    const newId = `diag_${Date.now()}`;
    const newTab: StudioDiagramTab = {
      id: newId,
      title: `${sourceDiagram.title} (Clone)`,
      templateId: sourceDiagram.templateId,
      xml: sourceDiagram.xml,
      source: sourceDiagram.source
    };

    const nextDiagrams = [...diagrams, newTab];
    setDiagrams(nextDiagrams);
    setActiveDiagramId(newId);
    setShowDiagramsMenu(false);
    pushNewVersion(`Cloned "${sourceDiagram.title}"`, 'User', nextDiagrams);
    showToast(`📑 Duplicated "${sourceDiagram.title}" as new diagram tab`);
  };

  const handleRenameDiagramTab = (idToRename: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    const updated = diagrams.map((d) => (d.id === idToRename ? { ...d, title: newTitle.trim() } : d));
    setDiagrams(updated);
    setIsRenamingDiagram(false);
    pushNewVersion(`Renamed diagram to "${newTitle.trim()}"`, 'User', updated);
    showToast(`✏️ Renamed diagram to "${newTitle.trim()}"`);
  };

  const handleSelectBlueprintToReplace = (templateId: string) => {
    const template = CANONICAL_TEMPLATES.find((t) => t.id === templateId) || CANONICAL_TEMPLATES[0];
    const domainObj = EXTENDED_DOMAIN_OPTIONS.find((d) => d.id === selectedDomain) || EXTENDED_DOMAIN_OPTIONS[0];
    const titleToUse = projectTitle || (projectName && useCaseName ? `${projectName} — ${useCaseName}` : projectName ? `${projectName} • ${domainObj.name}` : domainObj.name);
    const baseXml = template.generateXml(selectedDomain, isLight ? 'light' : 'dark');
    const newXml = injectUseCaseFlavor(baseXml, titleToUse, projectScopePrompt);

    const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
      if (diag.id === activeDiagramId) {
        return {
          ...diag,
          title: `${titleToUse} • ${template.name}`,
          templateId,
          xml: newXml,
          source: 'blueprint'
        };
      }
      return diag;
    });

    setDiagrams(updatedDiagrams);
    setShowReplaceModal(false);
    const newTag = pushNewVersion(
      `Replaced with Blueprint #${template.id} (${template.name})`,
      'User',
      updatedDiagrams,
      [`Applied Architecture Blueprint #${template.id}: ${template.name}`],
      'Full Diagram Architecture Model'
    );
    setDiffBaseIndex(1);
    showToast(`🔄 Replaced active diagram with #${template.id} (${template.name}) [${newTag}]`);
  };

  const handleNewProject = () => {
    setProjectName('');
    setUseCaseName('');
    setProjectTitle('');
    setProjectScopePrompt('');
    setSelectedDomain('biopharma');
    setHasSynthesized(false);

    const scratchXml = generateBlankScratchXml('New Architecture Project', isLight ? 'light' : 'dark', 'biopharma');
    const blankDiagramTab: StudioDiagramTab = {
      id: 'diag_1',
      title: 'Diagram 1 • Blank Canvas',
      templateId: 'gcp_native',
      xml: scratchXml,
      source: 'scratch'
    };

    setDiagrams([blankDiagramTab]);
    setActiveDiagramId('diag_1');
    setChatMessages([]);
    showToast('✨ Initialized blank canvas. Fill in requirements or click Prefill Sample, then hit Send!');
  };

  const applyEnterprisePreset = (preset: EnterprisePreset) => {
    setProjectName(preset.projectName);
    setUseCaseName(preset.useCaseName);
    setProjectTitle(preset.projectTitle);
    setSelectedDomain(preset.domainId);
    setProjectScopePrompt(preset.prompt);
    setShowPrefillMenu(false);
    showToast(`✨ Loaded [${preset.badge}] ${preset.projectName}`);
  };

  const handlePrefillSample = (presetId?: string) => {
    if (presetId) {
      const found = ENTERPRISE_PRESET_LIBRARY.find((p) => p.id === presetId);
      if (found) {
        applyEnterprisePreset(found);
        return;
      }
    }

    // Determine candidate preset pool: prioritize matching domain if specific, else full library
    const matchingPresets = ENTERPRISE_PRESET_LIBRARY.filter((p) => p.domainId === selectedDomain);
    const pool = matchingPresets.length > 0 && selectedDomain !== 'biopharma' ? matchingPresets : ENTERPRISE_PRESET_LIBRARY;
    
    const nextIdx = presetCycleIndex % pool.length;
    const chosenPreset = pool[nextIdx];
    setPresetCycleIndex((prev) => prev + 1);

    setProjectName(chosenPreset.projectName);
    setUseCaseName(chosenPreset.useCaseName);
    setProjectTitle(chosenPreset.projectTitle);
    setSelectedDomain(chosenPreset.domainId);
    setProjectScopePrompt(chosenPreset.prompt);

    showToast(`✨ Loaded Preset (${nextIdx + 1}/${pool.length}): [${chosenPreset.badge}] ${chosenPreset.projectName} (Click again to cycle)`);
  };

  const handleResetToScratch = () => {
    handleNewProject();
  };

  const handleDeleteDiagramTab = (idToDelete: string) => {
    if (diagrams.length <= 1) {
      handleResetToScratch();
      return;
    }
    const filtered = diagrams.filter((d) => d.id !== idToDelete);
    setDiagrams(filtered);
    if (activeDiagramId === idToDelete) {
      setActiveDiagramId(filtered[0].id);
    }
    pushNewVersion(`Deleted Diagram Tab`, 'User', filtered);
    showToast('🗑️ Deleted diagram tab');
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060911] text-slate-100'}`}>
      <UnifiedAppSidebar />

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* SLEEK SINGLE-ROW TOP HEADER */}
        <header className="h-14 shrink-0 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-white/90 dark:bg-[#080D1A]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
              <Link href="/" className="hover:text-teal-500 transition-colors">PromptCanvas</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400">
                <Layers className="w-4 h-4" />
              </div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white truncate">
                Launch Studio
              </h1>
              <span className="hidden md:inline text-xs text-slate-400 font-medium">| AI Architecture &amp; Specification Studio</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                PRO
              </span>
            </div>
          </div>

          {/* TOP CONTROLS: VCS, MODE SWITCHER & QUICK ACCESS */}
          <div className="flex items-center gap-2 shrink-0">
            {/* VCS Controls: Undo / Redo / History Dropdown */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-800">
              <button
                type="button"
                onClick={handleUndo}
                disabled={currentHistoryIndex >= versionHistory.length - 1 || versionHistory.length === 0}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer"
                title="Undo (Ctrl+Z / Cmd+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleRedo}
                disabled={currentHistoryIndex <= 0}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer"
                title="Redo (Ctrl+Y / Cmd+Shift+Z)"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
              <div className="h-3.5 w-px bg-slate-300 dark:bg-slate-700 mx-0.5" />
              <button
                type="button"
                onClick={() => setShowHistoryModal(true)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-bold text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-all cursor-pointer"
                title="View Rolling 10-Snapshot Version History & Restores"
              >
                <History className="w-3 h-3" />
                <span>{currentVersionTag}</span>
                <span className="text-[9px] px-1 py-0.2 rounded-full bg-teal-500/20 font-mono font-bold">
                  {versionHistory.length}/10
                </span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </button>
            </div>

            {/* View Mode Switcher: Clean 2-Way Segmented Control */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStudioMode('diagrams')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  studioMode === 'diagrams'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Diagrams</span>
              </button>
              <button
                type="button"
                onClick={() => setStudioMode('documents')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  studioMode === 'documents'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Specifications</span>
              </button>
            </div>

            {/* Quick Link to Architecture Library */}
            <Link
              href="/library"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-teal-500/20 transition-all cursor-pointer"
              title="Open Architecture Library"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Library</span>
            </Link>
          </div>
        </header>

        {/* MAIN SPLIT-SCREEN WORKSPACE: EXACT FULL HEIGHT MATCH */}
        <div className="flex-1 min-h-0 w-full max-w-[1760px] mx-auto p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3.5 overflow-hidden">
          
          {/* LEFT COLUMN (3 COLS / 25%): SPECIFICATION & PROMPT BRIEF */}
          <div className={`lg:col-span-3 h-full flex flex-col min-h-0 rounded-2xl border shadow-sm overflow-hidden ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
          }`}>
            
            {/* Left Card Header - Synchronized Height & Styling */}
            <div className={`h-12 px-4 border-b flex items-center justify-between shrink-0 ${
              isLight ? 'bg-slate-50/90 border-slate-200/80' : 'bg-[#0E1526] border-slate-800'
            }`}>
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 truncate">
                  Specification Brief
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 relative" ref={prefillMenuRef}>
                <button
                  type="button"
                  onClick={handleNewProject}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 shadow-xs transition-all cursor-pointer"
                  title="Create New Blank Architecture (Clears inputs & opens clean blank canvas)"
                >
                  <Plus className="w-3.5 h-3.5 text-teal-500" />
                  <span>+ New</span>
                </button>

                {/* Prefill Button with Popover Toggle */}
                <div className="flex items-center rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 shadow-xs">
                  <button
                    type="button"
                    onClick={() => handlePrefillSample()}
                    className="flex items-center gap-1 px-2 py-1 text-xs font-bold hover:bg-teal-500/20 rounded-l-lg transition-colors cursor-pointer"
                    title="Click to cycle through 10+ Enterprise Architecture Presets"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                    <span>Prefill</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPrefillMenu(!showPrefillMenu)}
                    className="px-1.5 py-1 text-xs font-bold hover:bg-teal-500/25 border-l border-teal-500/30 rounded-r-lg transition-colors cursor-pointer"
                    title="Pick specific enterprise industry preset"
                  >
                    <ChevronDown className="w-3 h-3 text-teal-500" />
                  </button>
                </div>

                {/* Enterprise Presets Dropdown Menu */}
                {showPrefillMenu && (
                  <div className={`absolute right-0 top-full mt-1.5 w-80 max-h-96 overflow-y-auto rounded-2xl border shadow-2xl z-50 p-2 text-xs flex flex-col gap-1 ${
                    isLight ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/60' : 'bg-[#0E1526] border-slate-800 text-slate-200 shadow-black/90'
                  }`}>
                    <div className="flex items-center justify-between px-2 py-1 border-b border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                        10+ Enterprise Presets
                      </span>
                      <span className="text-[9.5px] font-bold text-teal-600 dark:text-teal-400">
                        1-Click Load
                      </span>
                    </div>
                    {ENTERPRISE_PRESET_LIBRARY.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyEnterprisePreset(preset)}
                        className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                          selectedDomain === preset.domainId
                            ? 'bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-base shrink-0 pt-0.5">{preset.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold truncate text-slate-900 dark:text-white">
                              {preset.projectName}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 shrink-0 font-medium">
                              {preset.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {preset.useCaseName}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Left Card Scrollable Body */}
            <div className="flex-1 min-h-0 flex flex-col p-3.5 space-y-3 overflow-y-auto">
              {/* 1. DOMAIN & INDUSTRY FLAVOR (Full Width) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 block">
                    Domain / Industry Vertical
                  </label>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold">
                    16 Domain Flavors
                  </span>
                </div>
                <SearchableDomainFlavorDropdown
                  selectedDomainId={selectedDomain}
                  isLight={isLight}
                  onSelectDomain={(domain: DomainOption) => {
                    setSelectedDomain(domain.id);
                    showToast(`🏢 Switched domain: "${domain.name}"`);
                    handleSynthesizeArchitecture(undefined, domain.id);
                  }}
                />
              </div>

              {/* 2. PROJECT & USE CASE (Clean Stacked with Full Visibility) */}
              <div className="space-y-2.5 pt-0.5">
                <div className="space-y-1">
                  <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 block">
                    Project / Solution Scope
                  </label>
                  <SearchableProjectDropdown
                    value={projectName}
                    selectedDomainId={selectedDomain}
                    onChange={(newProj, domainId) => {
                      handleUpdateProjectName(newProj);
                      if (domainId && domainId !== selectedDomain) {
                        setSelectedDomain(domainId);
                      }
                    }}
                    isLight={isLight}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 block">
                    Architectural Use Case
                  </label>
                  <SearchableUseCaseDropdown
                    value={useCaseName}
                    projectName={projectName}
                    selectedDomainId={selectedDomain}
                    onChange={(newUseCase) => handleUpdateUseCaseName(newUseCase)}
                    isLight={isLight}
                  />
                </div>
              </div>

              {/* 3. ARCHITECTURE BLUEPRINT PATTERNS (Full Width) */}
              <div className="space-y-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 block">
                    Architecture Blueprint Pattern
                  </label>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                    50+ Blueprints
                  </span>
                </div>
                <SearchablePromptSuggestionsDropdown
                  isLight={isLight}
                  selectedDomainId={selectedDomain}
                  onSelectPrompt={(selectedPrompt: PromptOption) => {
                    setProjectScopePrompt(selectedPrompt.prompt);
                    if (selectedPrompt.domainId && selectedPrompt.domainId !== selectedDomain) {
                      setSelectedDomain(selectedPrompt.domainId);
                    }
                    showToast(`💡 Loaded blueprint prompt: "${selectedPrompt.label}"`);
                  }}
                />
              </div>

              {/* 4. PROMPT TEXTAREA & 1-CLICK QUICK REQUIREMENT CHIPS */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 block">
                    Requirements &amp; Technical Scope Brief
                  </label>
                  <span className="text-[9.5px] text-slate-400 font-sans">
                    Press ⏎ to Send
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={projectScopePrompt}
                  onChange={(e) => setProjectScopePrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSynthesizeArchitecture();
                    }
                  }}
                  placeholder="Describe target cloud services, data pipelines, throughput SLAs, security guardrails, and third-party integrations... (Press Enter to Send)"
                  className={`w-full p-3 min-h-[95px] max-h-[160px] rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans resize-y ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400' : 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500'
                  }`}
                />

                {/* 1-Click Requirement Pills */}
                <div className="space-y-1">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    + Quick Architecture Pills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_REQUIREMENT_CHIPS.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => {
                          setProjectScopePrompt((prev) => (prev ? `${prev.trim()}${chip.snippet}` : chip.snippet.slice(2)));
                          showToast(`Added requirement: ${chip.label}`);
                        }}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-teal-50 dark:bg-slate-800/80 dark:hover:bg-teal-950/50 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-200 dark:border-slate-700/80 transition-colors cursor-pointer"
                        title="Append to prompt"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSynthesizeArchitecture()}
                  disabled={isSynthesizing}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-black bg-gradient-to-r from-teal-500 via-sky-600 to-indigo-600 hover:opacity-95 text-white shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSynthesizing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing Architecture...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 fill-current" />
                      <span>Send &amp; Synthesize Architecture</span>
                    </>
                  )}
                </button>
              </div>

              {/* 4. Chat & Change Feed (Expands dynamically into remaining vertical space) */}
              {chatMessages.length > 0 && (
                <div className={`flex-1 min-h-[140px] p-3 rounded-xl border overflow-y-auto space-y-2.5 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`p-2.5 rounded-xl text-xs max-w-[94%] leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-teal-600 text-white font-medium rounded-tr-xs shadow-xs'
                            : isLight
                            ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-xs'
                            : 'bg-slate-950 text-slate-200 rounded-tl-xs border border-slate-800'
                        }`}
                      >
                        <p className="text-[11.5px]">{msg.text}</p>

                        {/* Action Badge & Change Verification Breakdown */}
                        {msg.actionApplied && (
                          <div className="mt-2 p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-1 text-xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1 text-[11px]">
                                <Check className="w-3 h-3 text-teal-500" />
                                {msg.actionApplied.summary}
                              </span>
                              <span className="font-mono font-bold text-teal-700 dark:text-teal-300 px-1.5 py-0.2 rounded bg-teal-500/20 text-[9.5px]">
                                {msg.actionApplied.versionTag}
                              </span>
                            </div>

                            {msg.actionApplied.targetTier && (
                              <div className="text-[10px] text-slate-600 dark:text-slate-300 flex items-center gap-1 font-semibold">
                                <span className="text-slate-400 font-bold uppercase tracking-wider text-[8.5px]">📍 Tier:</span>
                                <span>{msg.actionApplied.targetTier}</span>
                              </div>
                            )}

                            {msg.actionApplied.changedComponents && msg.actionApplied.changedComponents.length > 0 && (
                              <div className="space-y-0.5 pt-1 border-t border-teal-500/20">
                                <div className="flex flex-wrap gap-1">
                                  {msg.actionApplied.changedComponents.map((comp) => (
                                    <span key={comp} className="inline-flex items-center gap-1 text-[9px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
                                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                      {comp.replace(/&amp;/g, '&')}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="pt-0.5 flex items-center justify-end">
                              <button
                                type="button"
                                onClick={() => setShowDiffModal(true)}
                                className="text-[9.5px] font-bold text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded bg-teal-500/20 hover:bg-teal-500/30 transition-all cursor-pointer"
                              >
                                <GitCompare className="w-2.5 h-2.5 text-teal-500" />
                                <span>Verify Diff</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Suggested Prompts */}
                        {msg.suggestedPrompts && (
                          <div className="mt-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-800 space-y-0.5">
                            <span className="text-[8.5px] font-black uppercase tracking-wider text-slate-400 block">
                              Suggested Iterations:
                            </span>
                            <div className="flex flex-col gap-0.5">
                              {msg.suggestedPrompts.map((p) => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => {
                                    setProjectScopePrompt(p);
                                    showToast(`🚀 Executing: "${p}"`);
                                    handleSynthesizeArchitecture(p);
                                  }}
                                  className="text-left text-[10px] font-semibold text-teal-600 dark:text-teal-400 hover:underline hover:text-teal-500 transition-colors cursor-pointer"
                                >
                                  &rarr; {p}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[8px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="flex items-center gap-2 text-xs text-teal-600 font-bold p-1.5">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Synthesizing changes into architecture...</span>
                    </div>
                  )}
                  <div ref={chatMessagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (9 COLS / 75%): FULL-HEIGHT LIVE CANVAS VIEWPORT */}
          <div className={`lg:col-span-9 h-full flex flex-col min-h-0 rounded-2xl border shadow-xl overflow-hidden ${
            isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-2xl'
          }`}>
            
            {/* SINGLE CONSOLIDATED RIGHT PANE TOOLBAR HEADER - Synchronized Height & Styling */}
            <div className={`h-12 px-3.5 border-b flex items-center justify-between gap-2 shrink-0 ${
              isLight ? 'bg-slate-50/90 border-slate-200/80' : 'bg-[#0E1526] border-slate-800'
            }`}>
              
              {/* Left Side: Window dots + Diagram Tabs */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 mr-1 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>

                {/* Diagrams Dropdown Menu (Select, Edit/Rename, Clone, Delete, Add) */}
                <div className="relative" ref={diagramsMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowDiagramsMenu(!showDiagramsMenu)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      showDiagramsMenu
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : isLight
                        ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300/80 shadow-2xs'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 shadow-2xs'
                    }`}
                    title="Diagram switcher & management options"
                  >
                    <Network className="w-3.5 h-3.5 text-teal-500" />
                    <span>Diagram {activeDiagramIndex + 1}</span>
                    <span className="text-[10.5px] opacity-75 max-w-[130px] truncate hidden md:inline font-medium">
                      • {activeDiagram.title.replace(/^Diagram \d+\s*•\s*/, '')}
                    </span>
                    <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
                  </button>

                  {/* Diagrams Dropdown Menu Popover */}
                  {showDiagramsMenu && (
                    <div className={`absolute left-0 top-full mt-1.5 w-80 rounded-2xl border shadow-2xl z-50 p-2 text-xs flex flex-col gap-1.5 ${
                      isLight ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/60' : 'bg-[#0E1526] border-slate-800 text-slate-200 shadow-black/90'
                    }`}>
                      {/* Clean Header */}
                      <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-200/80 dark:border-slate-800">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                          Open Diagrams ({diagrams.length})
                        </span>
                        <span className="text-[9.5px] font-mono font-bold text-teal-600 dark:text-teal-400 px-1.5 py-0.2 rounded bg-teal-500/10 border border-teal-500/20">
                          Active: #{activeDiagramIndex + 1}
                        </span>
                      </div>

                      {/* Diagrams List / Switcher */}
                      <div className="max-h-52 overflow-y-auto space-y-1 py-1">
                        {diagrams.map((d, index) => {
                          const isActive = d.id === activeDiagramId;
                          return (
                            <div
                              key={d.id}
                              className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
                                isActive
                                  ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-900 dark:text-teal-200 border border-teal-500/30 font-bold shadow-2xs'
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                              }`}
                              onClick={() => {
                                setActiveDiagramId(d.id);
                                setShowDiagramsMenu(false);
                              }}
                            >
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono shrink-0 ${
                                  isActive ? 'bg-teal-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}>
                                  {index + 1}
                                </span>
                                <span className="truncate text-xs">
                                  {d.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0 ml-2">
                                {isActive && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
                                {diagrams.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteDiagramTab(d.id);
                                    }}
                                    className="p-1 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
                                    title="Delete Diagram"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Actions Divider */}
                      <div className="border-t border-slate-200/80 dark:border-slate-800 pt-1.5 space-y-1">
                        {/* Rename Action */}
                        <button
                          type="button"
                          onClick={() => {
                            setRenameTitleInput(activeDiagram.title);
                            setIsRenamingDiagram(true);
                            setShowDiagramsMenu(false);
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 transition-colors text-left cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                          <span>Rename Current Diagram...</span>
                        </button>

                        {/* Clone Action */}
                        <button
                          type="button"
                          onClick={() => handleCloneDiagramTab()}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 transition-colors text-left cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Duplicate / Clone Diagram</span>
                        </button>

                        {/* Delete Action */}
                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteDiagramTab(activeDiagramId);
                            setShowDiagramsMenu(false);
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-colors text-left cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          <span>Delete Current Diagram</span>
                        </button>

                        {/* Add New Section with 2 Explicit Choices */}
                        <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-850 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono px-1 block">
                            + Add New Diagram Tab:
                          </span>
                          
                          {/* Option A: Blank Diagram */}
                          <button
                            type="button"
                            onClick={() => {
                              handleAddBlankDiagramTab();
                              setShowDiagramsMenu(false);
                            }}
                            className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 hover:bg-teal-100/90 dark:hover:bg-teal-900/60 font-semibold transition-colors text-left cursor-pointer border border-teal-500/20"
                          >
                            <div className="flex items-center gap-2">
                              <Plus className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                              <div>
                                <div className="text-xs font-bold text-teal-900 dark:text-teal-100">Blank Diagram</div>
                                <div className="text-[10px] text-teal-600/80 dark:text-teal-400/80 font-normal">Start from empty canvas</div>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">&rarr;</span>
                          </button>

                          {/* Option B: Choose from Blueprint */}
                          <button
                            type="button"
                            onClick={() => {
                              setBlueprintModalMode('add_tab');
                              setShowDiagramsMenu(false);
                              setShowReplaceModal(true);
                            }}
                            className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-100/90 dark:hover:bg-indigo-900/60 font-semibold transition-colors text-left cursor-pointer border border-indigo-500/20"
                          >
                            <div className="flex items-center gap-2">
                              <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                              <div>
                                <div className="text-xs font-bold text-indigo-900 dark:text-indigo-100">Choose from Blueprint</div>
                                <div className="text-[10px] text-indigo-600/80 dark:text-indigo-400/80 font-normal">Pick from 50+ Canonical Templates</div>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">&rarr;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Actions: Edit in Canvas, Export, Diff, Replace, Zoom & Viewport */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Primary Action: Edit in Canvas */}
                <Link
                  href={`/workspace?blueprint=${activeDiagram.templateId || '01'}&domain=${selectedDomain}&title=${encodeURIComponent(projectTitle || activeDiagram.title)}&prompt=${encodeURIComponent(projectScopePrompt || '')}`}
                  className="px-2.5 py-1 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-500 text-white shadow-xs transition-all flex items-center gap-1"
                  title="Open in Design Canvas Workspace"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit in Canvas</span>
                </Link>

                {/* Export Dropdown */}
                <div className="relative" ref={exportMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="px-2 py-1 rounded-xl font-bold text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-teal-500 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    title="Export formats"
                  >
                    <Download className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                    <span>Export</span>
                    <ChevronDown className={`w-2.5 h-2.5 text-slate-400 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showExportMenu && (
                    <div className={`absolute right-0 top-full mt-1.5 w-52 z-50 rounded-2xl border shadow-2xl p-1.5 space-y-1 ${
                      isLight ? 'bg-white border-slate-200 shadow-slate-400/30' : 'bg-[#0F172A] border-slate-800 shadow-2xl'
                    }`}>
                      <button
                        type="button"
                        onClick={handleExportSvg}
                        className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                          isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <FileDown className="w-3.5 h-3.5 text-teal-500" />
                        <span>Download SVG (.svg)</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleExportDrawioXml}
                        className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                          isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5 text-sky-500" />
                        <span>Download Draw.io XML</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(activeDiagram.xml);
                          setCopiedXml(true);
                          setShowExportMenu(false);
                          showToast('📋 Copied Draw.io XML to clipboard!');
                          setTimeout(() => setCopiedXml(false), 2000);
                        }}
                        className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                          isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <Copy className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copy Draw.io XML</span>
                      </button>
                      <div className="h-px bg-slate-200 dark:bg-slate-800 my-1" />
                      <button
                        type="button"
                        onClick={() => {
                          handleOpenInDrawio();
                          setShowExportMenu(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                          isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Open in diagrams.net</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Diff */}
                <button
                  type="button"
                  onClick={() => {
                    setDiffBaseIndex(versionHistory.length > 1 ? 1 : 0);
                    setShowDiffModal(true);
                  }}
                  className="px-2 py-1 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-200 hover:text-teal-600 transition-all flex items-center gap-1 cursor-pointer"
                  title="Compare Diff"
                >
                  <GitCompare className="w-3 h-3 text-teal-500" />
                  <span className="hidden sm:inline">Diff</span>
                </button>

                {/* Replace */}
                <button
                  type="button"
                  onClick={() => {
                    setBlueprintModalMode('replace');
                    setShowReplaceModal(true);
                  }}
                  className="px-2 py-1 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-200 hover:text-teal-600 transition-all flex items-center gap-1 cursor-pointer"
                  title="Replace Blueprint"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden sm:inline">Replace</span>
                </button>

                {/* Canvas Theme Toggle */}
                <button
                  type="button"
                  onClick={() => setCanvasTheme(canvasTheme === 'light' ? 'dark' : 'light')}
                  className={`p-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    canvasTheme === 'dark'
                      ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={`Canvas Theme (${canvasTheme})`}
                >
                  {canvasTheme === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3 text-amber-500" />}
                </button>

                {/* Zoom */}
                <div className="flex items-center rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setCanvasZoom(z => Math.max(0.6, Number((z - 0.1).toFixed(1))))}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-2.5 h-2.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCanvasZoom(1)}
                    className="px-1 py-0.5 text-[9.5px] font-mono font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 cursor-pointer"
                    title="Reset Zoom"
                  >
                    {Math.round(canvasZoom * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setCanvasZoom(z => Math.min(1.8, Number((z + 0.1).toFixed(1))))}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-2.5 h-2.5" />
                  </button>
                </div>

                {/* Fullscreen Expand */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`p-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    isFullscreen
                      ? 'bg-teal-600 text-white border-teal-500'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:text-teal-500'
                  }`}
                  title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                </button>

                {studioMode === 'both' && (
                  <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('diagram')}
                      className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                        previewTab === 'diagram' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      Blueprint
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('spec')}
                      className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                        previewTab === 'spec' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      Spec
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* FULL-HEIGHT VIEWPORT CONTENT (FILLS 100% OF REMAINING HEIGHT) */}
            <div className={`flex-1 min-h-0 w-full relative flex items-center justify-center overflow-hidden transition-colors ${
              canvasTheme === 'light' ? 'bg-white' : 'bg-[#070A13]'
            }`}>
              {(studioMode === 'diagrams' || (studioMode === 'both' && previewTab === 'diagram')) ? (
                (!hasSynthesized && activeDiagram.source === 'scratch') ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-500 shadow-xl shadow-teal-500/10">
                      <Sparkles className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="max-w-md space-y-1.5">
                      <h3 className="text-base font-black text-slate-900 dark:text-white">
                        Blank Architecture Canvas
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Enter your project scope, cloud services, and security requirements on the left, then click <b>Send &amp; Synthesize</b> (or press Enter).
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handlePrefillSample()}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Prefill Sample &amp; Test</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-150"
                    style={{
                      transform: `scale(${canvasZoom})`,
                      transformOrigin: 'center center',
                    }}
                  >
                    <DiagramViewerRenderSafe
                      key={`studio_viewport_${activeDiagram.id}_${activeDiagram.templateId}_${selectedDomain}_${canvasTheme}_${versionHistory[currentHistoryIndex]?.id || currentHistoryIndex}_${activeDiagram.xml.length}`}
                      diagramId={activeDiagram.templateId}
                      diagramType={activeDiagram.source === 'scratch' ? 'custom' : `canonical_${activeDiagram.templateId}`}
                      xml={activeDiagram.xml}
                      aspectRatioId="16:9"
                      bgTheme={canvasTheme}
                      useCaseName={useCaseName || projectTitle || 'Generic GCP Architecture'}
                    />
                  </div>
                )
              ) : (
                <div className="w-full h-full p-5 text-left space-y-4 overflow-y-auto">
                  <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider">{activeArchetypeMeta.name}</span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">{projectTitle || 'Enterprise Architecture Specification'}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      <span>Audience: {activeArchetypeMeta.audience}</span>
                      <span>&bull;</span>
                      <span>{diagrams.length} Attached Blueprint Views</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">1. Executive Summary &amp; Scope</h4>
                      <p className="leading-relaxed">
                        {projectScopePrompt || 'Enterprise Google Cloud reference architecture with automated workload orchestration and zero-trust controls.'}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">2. Architecture Blueprint Pack</h4>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {diagrams.map((diag, i) => (
                          <div key={diag.id} className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                            <span className="font-bold text-teal-600">Diagram {i + 1}:</span> {diag.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* FLOATING TOAST NOTIFICATION */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 border border-teal-500/40 text-white text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* ==========================================
          FULLSCREEN DIAGRAM VIEWPORT MODAL
      ========================================== */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h3 className="text-base font-black text-white">
                {projectName || activeDiagram.title} {useCaseName ? `— ${useCaseName}` : ''}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                16:9 Fullscreen
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCanvasTheme(canvasTheme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-xl bg-slate-800 text-amber-300 hover:bg-slate-700 transition cursor-pointer"
                title="Toggle Canvas Theme"
              >
                {canvasTheme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition cursor-pointer shadow-lg"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0 flex items-center justify-center p-4 overflow-hidden">
            <div className="w-full h-full max-w-[1600px] flex items-center justify-center">
              <DiagramViewerRenderSafe
                key={`studio_fullscreen_${activeDiagram.id}_${activeDiagram.templateId}_${selectedDomain}_${canvasTheme}`}
                diagramId={activeDiagram.templateId}
                diagramType={activeDiagram.source === 'scratch' ? 'custom' : `canonical_${activeDiagram.templateId}`}
                xml={activeDiagram.xml}
                aspectRatioId="16:9"
                bgTheme={canvasTheme}
                useCaseName={useCaseName || projectTitle || 'Generic GCP Architecture'}
              />
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 1: REPLACE BLUEPRINT OR ARCHETYPE PICKER
      ========================================== */}
      {showReplaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-3xl rounded-3xl border shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {blueprintModalMode === 'add_tab' ? (
                  <Plus className="w-5 h-5 text-teal-500" />
                ) : (
                  <RefreshCw className="w-5 h-5 text-teal-500" />
                )}
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {blueprintModalMode === 'add_tab'
                    ? 'Add New Diagram from Blueprint or Archetype'
                    : 'Replace Diagram with Blueprint or Document Archetype'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReplaceModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB SELECTOR: DIAGRAMS VS DOCUMENTS */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setReplaceModalTab('diagrams')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  replaceModalTab === 'diagrams'
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Architecture Diagrams ({CANONICAL_TEMPLATES.length + 1})</span>
              </button>
              <button
                type="button"
                onClick={() => setReplaceModalTab('documents')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  replaceModalTab === 'documents'
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Specification Archetypes ({DOC_ARCHETYPES_META.length})</span>
              </button>
            </div>

            {replaceModalTab === 'diagrams' ? (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {blueprintModalMode === 'add_tab'
                    ? 'Select a canonical architecture blueprint (#01–#50) to instantiate as a new diagram tab, or start from a blank canvas.'
                    : `Select a canonical blueprint template to replace the diagram shown in ${activeDiagram.title}, or choose generic design from scratch.`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 overflow-y-auto p-1 flex-1">
                  {/* Option 0: Generic Design from Scratch */}
                  <button
                    type="button"
                    onClick={() => {
                      if (blueprintModalMode === 'add_tab') {
                        handleAddBlankDiagramTab();
                      } else {
                        handleResetToScratch();
                      }
                      setShowReplaceModal(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isLight
                        ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-400'
                        : 'bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-800 hover:border-indigo-500'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                        ✨ Blank Canvas
                      </span>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        Design from Scratch
                      </h4>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        Generic Google Cloud architecture canvas ready for direct AI modifications.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                      {blueprintModalMode === 'add_tab' ? '+ Add Blank Tab →' : 'Select Scratch →'}
                    </span>
                  </button>

                  {/* All 50 Canonical Blueprints */}
                  {CANONICAL_TEMPLATES.map((tpl: CanonicalTemplate) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => {
                        if (blueprintModalMode === 'add_tab') {
                          handleAddFromBlueprint(tpl.id);
                        } else {
                          handleSelectBlueprintToReplace(tpl.id);
                        }
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        activeDiagram.templateId === tpl.id && blueprintModalMode === 'replace'
                          ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30'
                          : isLight
                          ? 'bg-slate-50 hover:bg-teal-50/50 border-slate-200'
                          : 'bg-slate-900/60 hover:bg-teal-950/30 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold text-teal-600">
                            #{tpl.id}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">
                            {tpl.family}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {tpl.name}
                        </h4>
                        <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {tpl.primaryPurpose}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 mt-2">
                        {blueprintModalMode === 'add_tab' ? '+ Add as New Tab →' : 'Apply Blueprint →'}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select an enterprise architecture document archetype to view structured design specs, ADRs, or deployment runbooks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto p-1 flex-1">
                  {DOC_ARCHETYPES_META.map((meta: DocArchetypeMeta) => (
                    <button
                      key={meta.id}
                      type="button"
                      onClick={() => {
                        setSelectedArchetypeId(meta.id);
                        setPreviewTab('spec');
                        setShowReplaceModal(false);
                        pushNewVersion(`Switched specification archetype to ${meta.name}`, 'User');
                        showToast(`📑 Switched to ${meta.name} Archetype!`);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        selectedArchetypeId === meta.id
                          ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30'
                          : isLight
                          ? 'bg-slate-50 hover:bg-teal-50/50 border-slate-200'
                          : 'bg-slate-900/60 hover:bg-teal-950/30 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400">
                            {meta.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {meta.blueprintPack.length} Blueprint Slots
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {meta.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {meta.primaryPurpose}
                        </p>
                        <div className="mt-2 text-[10.5px] text-slate-400">
                          <b>Target Audience:</b> {meta.audience}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-3 flex items-center gap-1">
                        Select Archetype &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: 10-SNAPSHOT ROLLING VERSION HISTORY
      ========================================== */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-xl rounded-3xl border shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-teal-500" />
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Rolling 10-Snapshot Version History
                  </h3>
                  <span className="text-[10.5px] text-slate-400">
                    Autosaved snapshots &bull; 1-Click Rollback
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto p-1 flex-1">
              {versionHistory.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No snapshots recorded yet. Synthesize an architecture or interact with the chatbot to create versions.
                </div>
              ) : (
                versionHistory.map((snap, index) => (
                  <div
                    key={snap.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      currentHistoryIndex === index
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20'
                        : isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-600 dark:text-teal-400">
                          {snap.versionTag}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {snap.timestamp} &bull; by {snap.author}
                        </span>
                        {currentHistoryIndex === index && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-bold">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                        {snap.actionSummary}
                      </p>
                      {snap.targetTier && (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                          <span>📍 Tier:</span> {snap.targetTier}
                        </div>
                      )}
                      {snap.changedComponents && snap.changedComponents.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {snap.changedComponents.map((c) => (
                            <span key={c} className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              +{c.replace(/&amp;/g, '&')}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-[10px] text-slate-400 block">
                        {snap.diagrams.length} Diagram(s) &bull; {snap.selectedDomain.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {currentHistoryIndex !== index && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setDiffBaseIndex(index);
                              setShowHistoryModal(false);
                              setShowDiffModal(true);
                            }}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-600 transition-all flex items-center gap-1 cursor-pointer"
                            title="Compare this snapshot with current version"
                          >
                            <GitCompare className="w-3 h-3 text-teal-500" />
                            <span>Diff</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentHistoryIndex(index);
                              setDiagrams(snap.diagrams);
                              setActiveDiagramId(snap.activeDiagramId);
                              setProjectName(snap.projectName);
                              setUseCaseName(snap.useCaseName);
                              setProjectTitle(snap.projectTitle);
                              setProjectScopePrompt(snap.projectScopePrompt);
                              setSelectedDomain(snap.selectedDomain);
                              setShowHistoryModal(false);
                              showToast(`⏪ Restored snapshot ${snap.versionTag}!`);
                            }}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 transition-all cursor-pointer"
                          >
                            Restore
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 3: VISUAL VERSION DIFF & CHANGE VERIFICATION
      ========================================== */}
      {showDiffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md">
          <div className={`w-full max-w-7xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
          }`}>
            {/* Modal Header */}
            <div className="px-6 py-4 border-b flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <GitCompare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Visual Architecture Version Diff</span>
                    <span className="text-xs px-2 py-0.5 rounded-md font-mono bg-teal-500/20 text-teal-600 dark:text-teal-400">
                      {versionHistory[diffBaseIndex]?.versionTag || 'Base'} &harr; {currentVersionTag}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Side-by-side visual inspection of injected components, routing, and tier changes
                  </p>
                </div>
              </div>

              {/* Version Comparison Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Compare with:</span>
                <select
                  value={diffBaseIndex}
                  onChange={(e) => setDiffBaseIndex(Number(e.target.value))}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  {versionHistory.map((snap, idx) => (
                    <option key={snap.id} value={idx} disabled={idx === currentHistoryIndex}>
                      {snap.versionTag} &bull; {snap.actionSummary.slice(0, 35)} ({snap.timestamp})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setShowDiffModal(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Changed Components Summary Box */}
            <div className="px-6 py-3 border-b bg-teal-500/5 dark:bg-teal-950/20 border-teal-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Action Applied:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {versionHistory[0]?.actionSummary || 'Initial Blueprint Synthesis'}
                  </span>
                </div>
                {versionHistory[0]?.targetTier && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Target Architecture Tier:</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">
                      {versionHistory[0].targetTier}
                    </span>
                  </div>
                )}
              </div>

              {/* Badges of Modified Components */}
              {versionHistory[0]?.changedComponents && versionHistory[0].changedComponents.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mr-1">Injected Nodes:</span>
                  <div className="flex flex-wrap gap-1">
                    {versionHistory[0].changedComponents.map((comp) => (
                      <span key={comp} className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {comp.replace(/&amp;/g, '&')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Side-by-Side Dual Viewport Grid */}
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-y-auto">
              
              {/* LEFT VIEWPORT: BASE / PREVIOUS VERSION */}
              <div className="flex flex-col space-y-2 border rounded-2xl p-3 bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {versionHistory[diffBaseIndex]?.versionTag || 'Base Version'}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[240px]">
                      {versionHistory[diffBaseIndex]?.actionSummary || 'Previous Snapshot'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {versionHistory[diffBaseIndex]?.timestamp || ''}
                  </span>
                </div>

                <div className="h-[360px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070A13] flex items-center justify-center relative">
                  {(() => {
                    const baseSnap = versionHistory[diffBaseIndex];
                    const baseDiagram = baseSnap?.diagrams?.find((d) => d.id === activeDiagramId) || baseSnap?.diagrams?.[0];
                    return baseDiagram?.xml ? (
                      <DiagramViewerRenderSafe
                        key={`diff_base_${diffBaseIndex}_${baseSnap.versionTag}_${baseDiagram.id}`}
                        diagramId={baseDiagram.templateId}
                        diagramType="custom"
                        xml={baseDiagram.xml}
                        aspectRatioId="16:9"
                        bgTheme={isLight ? 'light' : 'dark'}
                        useCaseName={baseSnap.projectTitle || 'Base Version'}
                      />
                    ) : (
                      <div className="text-xs text-slate-400">No baseline diagram XML in this snapshot</div>
                    );
                  })()}
                </div>

                {/* Rollback / Revert to baseline action */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10.5px] text-slate-400">
                    Discard replacement &amp; revert active diagram
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const snap = versionHistory[diffBaseIndex];
                      if (snap) {
                        setCurrentHistoryIndex(diffBaseIndex);
                        setDiagrams(snap.diagrams);
                        setActiveDiagramId(snap.activeDiagramId);
                        setProjectName(snap.projectName);
                        setUseCaseName(snap.useCaseName);
                        setProjectTitle(snap.projectTitle);
                        setProjectScopePrompt(snap.projectScopePrompt);
                        setSelectedDomain(snap.selectedDomain);
                        setShowDiffModal(false);
                        showToast(`⏪ Reverted to baseline ${snap.versionTag}!`);
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                    <span>Revert to {versionHistory[diffBaseIndex]?.versionTag || 'Base'}</span>
                  </button>
                </div>
              </div>

              {/* RIGHT VIEWPORT: CURRENT MODIFIED VERSION */}
              <div className="flex flex-col space-y-2 border rounded-2xl p-3 bg-teal-500/5 dark:bg-teal-950/20 border-teal-500/30 ring-2 ring-teal-500/20">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-black text-xs bg-teal-500 text-white shadow-xs">
                      {currentVersionTag} (ACTIVE)
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-[240px]">
                      {versionHistory[currentHistoryIndex]?.actionSummary || activeDiagram.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold">
                    ✨ Modified / Replaced
                  </span>
                </div>

                <div className="h-[360px] rounded-xl overflow-hidden border border-teal-500/30 bg-white dark:bg-[#070A13] flex items-center justify-center relative">
                  <DiagramViewerRenderSafe
                    key={`diff_current_${currentVersionTag}_${activeDiagram.xml.length}`}
                    diagramId={activeDiagram.templateId}
                    diagramType="custom"
                    xml={activeDiagram.xml}
                    aspectRatioId="16:9"
                    bgTheme={isLight ? 'light' : 'dark'}
                    useCaseName={projectTitle || 'Current Version'}
                  />
                </div>

                {/* Confirm and accept replacement */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10.5px] text-teal-600 dark:text-teal-400 font-semibold">
                    Accept replacement &amp; keep as active diagram
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDiffModal(false);
                      showToast(`✅ Accepted ${currentVersionTag} changes!`);
                    }}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept &amp; Keep {currentVersionTag}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 4: RENAME DIAGRAM MODAL
      ========================================== */}
      {isRenamingDiagram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border shadow-2xl p-5 flex flex-col gap-4 ${
            isLight ? 'bg-white border-slate-200 shadow-slate-300/50' : 'bg-[#0E1526] border-slate-800 shadow-black/80'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-teal-500" />
                <span>Rename Diagram</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsRenamingDiagram(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                Diagram Title (Tab {activeDiagramIndex + 1})
              </label>
              <input
                type="text"
                value={renameTitleInput}
                onChange={(e) => setRenameTitleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenameDiagramTab(activeDiagramId, renameTitleInput);
                  if (e.key === 'Escape') setIsRenamingDiagram(false);
                }}
                placeholder="e.g. Logical Process Flow, Data Lakehouse"
                autoFocus
                className={`w-full px-3 py-2 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsRenamingDiagram(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRenameDiagramTab(activeDiagramId, renameTitleInput)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Title</span>
              </button>
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
                <History className="w-5 h-5 text-teal-600" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider">Studio 1 Architecture History</h3>
                  <p className="text-[10px] text-slate-400">Saved canonical blueprints &amp; prompt canvases</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/history?studio=studio1"
                  className="px-2.5 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black rounded-lg shadow-xs transition flex items-center gap-1"
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
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600'
                      : 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-teal-500'
                  }`}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {loadingSavedHistory ? (
                <div className="flex items-center justify-center py-12 text-xs font-mono text-teal-600 gap-2">
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
                          ? 'bg-white hover:bg-teal-50/50 border-slate-200 hover:border-teal-400 shadow-xs'
                          : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-teal-500/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-xs font-black truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {d.name || 'Untitled Blueprint'}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase font-bold bg-teal-600/10 text-teal-600 dark:text-teal-400">
                              {d.architecture_type || 'canonical'}
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
                              setDiagrams(prev => [{
                                id: 'diag_restored_' + Date.now(),
                                title: d.name,
                                templateId: d.architecture_type || 'custom',
                                xml: d.xml_content,
                                source: 'blueprint'
                              }]);
                              setShowSavedDrawer(false);
                              showToast(`Loaded "${d.name}" into Studio 1!`);
                            } else {
                              window.location.href = `/studio?diagram=${d.id}`;
                            }
                          }}
                          className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-black bg-teal-600 hover:bg-teal-500 text-white shadow-xs transition active:scale-95 text-center flex items-center justify-center gap-1 cursor-pointer"
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
                            navigator.clipboard.writeText(`${window.location.origin}/studio?diagram=${d.id}`);
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
              <Link href="/history?studio=studio1" className="text-teal-500 hover:underline font-black flex items-center gap-1">
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

export default function LaunchStudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Launch Studio...</div>}>
      <StudioContent />
    </Suspense>
  );
}
