'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  Send, 
  RotateCcw, 
  Eye, 
  Edit3, 
  ExternalLink, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  X,
  Loader2,
  CheckCircle2,
  FileText,
  Briefcase,
  Cpu,
  Shield,
  ShieldCheck,
  User,
  Users,
  LayoutGrid,
  Settings,
  ShieldAlert,
  Network,
  ArrowRight,
  Settings2,
  Database,
  Info,
  Search,
  ChevronDown,
  ChevronUp,
  Hand,
  BookOpen,
  Mail,
  Box,
  Upload,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { createMinimalistCleanVariant, restoreDetailedView, createVendorIconsVariant } from '@/lib/diagramCleaner';
import DiagramViewer from '@/components/DiagramViewer';
import { AccessRestrictedScreen } from '@/components/AccessRestrictedScreen';
import { AccessRequestsInbox } from '@/components/AccessRequestsInbox';
import { TerraformExportModal } from '@/components/TerraformExportModal';
import { ImportDiagramModal } from '@/components/ImportDiagramModal';
import { ExportDiagramModal } from '@/components/ExportDiagramModal';
import { AuthModal } from '@/components/AuthModal';
import DiagramFeedbackWidget from '@/components/DiagramFeedbackWidget';
import { ContactUsModal } from '@/components/ContactUsModal';
import { AIGenerationProgressModal } from '@/components/AIGenerationProgressModal';
import { PasswordSetupModal } from '@/components/PasswordSetupModal';
import { AspectRatioSelector } from '@/components/AspectRatioSelector';
import { rearrangeDiagramForAspectRatio } from '@/lib/aspectRatioLayout';


// Define Types (matching our DB schema + API responses)
interface Diagram {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  versions?: DiagramVersion[];
}

interface DiagramVersion {
  id: string;
  diagram_id: string;
  version_number: number;
  xml_content: string;
  comment: string | null;
  created_by: string;
  created_at: string;
  prompt?: string | null;
  ai_reasoning?: string | null;
  business_usecase?: string | null;
  technical_usecase?: string | null;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  versionNumber?: number;
}

interface DiagramNodeItem {
  id: string;
  label: string;
  isEdge: boolean;
  source?: string;
  target?: string;
  style?: string;
}

function cleanHtmlLabel(label: string): string {
  if (!label) return '';
  
  // 1. Decode standard HTML entities
  let decoded = label
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&#xa;/g, ' ');

  // 2. Replace <br> variants with visual separators
  decoded = decoded.replace(/<br\s*\/?>/gi, ' — ');

  // 3. Strip all other HTML tags
  const stripped = decoded.replace(/<[^>]+>/g, '');

  // 4. Normalize spacing
  return stripped.trim().replace(/\s+/g, ' ');
}

function formatRelativeTime(dateStr: string): string {
  if (!dateStr) return '';
  const normalized = dateStr.replace(' ', 'T');
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function parseXmlNodesAndEdges(xml: string): DiagramNodeItem[] {
  if (!xml) return [];
  const items: DiagramNodeItem[] = [];
  
  // Match all mxCell elements
  const regex = /<mxCell\s+([^>]+)>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const attrsStr = match[1];
    const getId = attrsStr.match(/id="([^"]*)"/)?.[1];
    const getValue = attrsStr.match(/value="([^"]*)"/)?.[1];
    const isEdge = attrsStr.includes('edge="1"');
    const getSource = attrsStr.match(/source="([^"]*)"/)?.[1];
    const getTarget = attrsStr.match(/target="([^"]*)"/)?.[1];
    const getStyle = attrsStr.match(/style="([^"]*)"/)?.[1];
    
    if (getId && getId !== '0' && getId !== '1') {
      const rawValue = getValue || (isEdge ? 'Connection' : 'Unnamed Component');
      items.push({
        id: getId,
        label: isEdge ? rawValue : cleanHtmlLabel(rawValue),
        isEdge,
        source: getSource,
        target: getTarget,
        style: getStyle
      });
    }
  }
  return items;
}

interface VersionChanges {
  added: string[];
  removed: string[];
  modified: string[];
}

function computeVersionDiff(currentXml: string, parentXml: string): VersionChanges {
  const currentItems = parseXmlNodesAndEdges(currentXml);
  const parentItems = parseXmlNodesAndEdges(parentXml);

  const currentMap = new Map(currentItems.map(item => [item.id, item]));
  const parentMap = new Map(parentItems.map(item => [item.id, item]));

  const added: string[] = [];
  const removed: string[] = [];
  const modified: string[] = [];

  // Find added or modified items
  currentMap.forEach((curr, id) => {
    const parent = parentMap.get(id);
    if (!parent) {
      if (curr.isEdge) {
        // Resolve source/target labels if possible
        const srcLabel = currentMap.get(curr.source || '')?.label || 'Component';
        const tgtLabel = currentMap.get(curr.target || '')?.label || 'Component';
        added.push(`Connection: ${srcLabel} ➔ ${tgtLabel}`);
      } else {
        added.push(curr.label);
      }
    } else if (parent.label !== curr.label) {
      if (curr.isEdge) {
        modified.push(`Connection: "${parent.label}" renamed to "${curr.label}"`);
      } else {
        modified.push(`Component: "${parent.label}" renamed to "${curr.label}"`);
      }
    }
  });

  // Find removed items
  parentMap.forEach((parent, id) => {
    if (!currentMap.has(id)) {
      if (parent.isEdge) {
        const srcLabel = parentMap.get(parent.source || '')?.label || 'Component';
        const tgtLabel = parentMap.get(parent.target || '')?.label || 'Component';
        removed.push(`Connection: ${srcLabel} ➔ ${tgtLabel}`);
      } else {
        removed.push(parent.label);
      }
    }
  });

  return { added, removed, modified };
}

function htmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const TEMPLATE_PROMPTS = [
  {
    name: "Clean Slate (Empty Workspace)",
    prompt: ""
  },
  {
    name: "Serverless Web Application (GCP)",
    prompt: "Act as a GCP Cloud Architect. Design a serverless web application architecture. It should include: a Global HTTPS Load Balancer, Cloud CDN, Cloud Run for the frontend/backend services, Cloud SQL (PostgreSQL) for relational data, and Cloud Storage for static media assets."
  },
  {
    name: "Real-time Streaming Analytics (GCP)",
    prompt: "Act as a GCP Data Architect. Design a real-time streaming data analytics pipeline. It should ingest streaming data via Pub/Sub, process it with Cloud Dataflow, store the structured results in BigQuery, and visualize it with Looker."
  },
  {
    name: "Microservices Kubernetes Cluster (AWS)",
    prompt: "Act as an AWS Solutions Architect. Design a microservices architecture hosted on EKS (Elastic Kubernetes Service). It should include: an Application Load Balancer, Amazon API Gateway, EKS worker nodes running services, RDS PostgreSQL for main DB, DynamoDB for session state, and ElastiCache Redis for caching."
  },
  {
    name: "Data Lakehouse (AWS)",
    prompt: "Act as an AWS Data Architect. Design a modern Data Lakehouse architecture. It should include: raw/processed data landing zones in Amazon S3, AWS Glue Catalog for schema registry, AWS Athena for ad-hoc querying, Amazon Redshift for data warehousing, and Amazon QuickSight for business intelligence."
  },
  {
    name: "AI Retrieval-Augmented Generation / RAG (GCP)",
    prompt: "Act as an AI Cloud Architect. Design a Retrieval-Augmented Generation (RAG) system on GCP. It should include: a Cloud Run API service, Cloud SQL with pgvector extension for storing vector embeddings, Vertex AI Search for document retrieval, Vertex AI Gemini API for LLM reasoning, and Cloud Storage for source documents."
  },
  {
    name: "Event-Driven Microservices (AWS)",
    prompt: "Act as an AWS Architect. Design an event-driven microservices architecture. It should use: Amazon EventBridge for event routing, AWS Lambda for processing events, Amazon SQS/SNS for messaging/decoupling, and DynamoDB as the fast key-value store for each microservice."
  },
  {
    name: "Multi-Region Disaster Recovery (GCP)",
    prompt: "Act as a GCP Resilience Engineer. Design a multi-region highly-available architecture. It should have: a Global Load Balancer, active-active services in us-east1 and us-west1 using Cloud Run, Cloud Spanner as a multi-region distributed database, and Cloud Storage with multi-region replication."
  },
  {
    name: "Secure VPC Network Infrastructure (AWS)",
    prompt: "Act as an AWS Network Security Engineer. Design a secure VPC network. It should include: a VPC with Public and Private Subnets across two Availability Zones, an Internet Gateway, NAT Gateways for private subnet outbound traffic, Bastion Host for secure SSH access, and an Application Load Balancer routing to an Autoscaling Group of EC2 instances in private subnets."
  },
  {
    name: "IoT Telemetry Ingestion (GCP)",
    prompt: "Act as an IoT Architect. Design a telemetry ingestion pipeline on GCP. It should ingest data from IoT devices via Pub/Sub, trigger Cloud Functions for validation and normalization, store raw time-series data in Cloud Bigtable, and connect to Grafana for live monitoring."
  },
  {
    name: "CI/CD Pipeline Architecture",
    prompt: "Act as a DevOps Architect. Design a secure CI/CD build and deploy pipeline. It should include: GitHub repository triggering a GitHub Actions Runner, compilation/testing step, containerizing with Docker, pushing images to Artifact Registry, deploying using Terraform Cloud to a target Kubernetes cluster, and monitoring with Prometheus/Grafana."
  }
];

function WorkspaceContent() {
  // --- State ---
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [activeDiagram, setActiveDiagram] = useState<Diagram | null>(null);
  const [activeVersion, setActiveVersion] = useState<DiagramVersion | null>(null);
  const [previewVersion, setPreviewVersion] = useState<DiagramVersion | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('16:9');
  const [customRatioW, setCustomRatioW] = useState<number>(16);
  const [customRatioH, setCustomRatioH] = useState<number>(10);
  const [restrictedState, setRestrictedState] = useState<{
    diagramId: string;
    diagramName?: string;
    pendingRequest?: any;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; name?: string | null } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAspectRatioChange = useCallback((ratioId: string, customW?: number, customH?: number) => {
    setSelectedAspectRatio(ratioId);
    if (customW) setCustomRatioW(customW);
    if (customH) setCustomRatioH(customH);

    const targetVersion = previewVersion || activeVersion;
    if (targetVersion && targetVersion.xml_content) {
      const reOrganizedXml = rearrangeDiagramForAspectRatio(targetVersion.xml_content, ratioId, customW, customH);
      
      if (previewVersion) {
        setPreviewVersion(prev => prev ? { ...prev, xml_content: reOrganizedXml } : null);
      }
      if (activeVersion) {
        setActiveVersion(prev => prev ? { ...prev, xml_content: reOrganizedXml } : null);
      }
    }
  }, [previewVersion, activeVersion]);
  
  const suggestions = React.useMemo(() => {
    if (!activeDiagram) return [];
    
    const name = (activeDiagram.name || '').toLowerCase();
    const xml = (activeVersion?.xml_content || '').toLowerCase();

    // 1. AWS/Kubernetes
    if (name.includes('aws') || name.includes('eks') || name.includes('kubernetes') || xml.includes('eks') || xml.includes('aws.svg') || xml.includes('logos:aws')) {
      return [
        'Add an Application Load Balancer (ALB)',
        'Secure database with RDS Multi-AZ replication',
        'Integrate AWS WAF to block web exploits',
        'Add CloudWatch monitoring & alert dashboards'
      ];
    }

    // 2. GCP / Serverless
    if (name.includes('gcp') || name.includes('serverless') || xml.includes('cloud-run') || xml.includes('google-cloud') || xml.includes('apigee') || xml.includes('gcs')) {
      return [
        'Add Cloud Armor for WAF security',
        'Set up Cloud Memorystore for Redis caching',
        'Integrate Pub/Sub for event-driven flows',
        'Attach Cloud Monitoring alert policies'
      ];
    }

    // 3. AI / RAG / Big Data
    if (name.includes('rag') || name.includes('pipeline') || name.includes('bigquery') || xml.includes('bigquery') || xml.includes('vector') || xml.includes('vertex') || xml.includes('llm')) {
      return [
        'Add Cloud Storage bucket for raw data ingestion',
        'Integrate LangChain orchestrator with Vertex AI',
        'Enforce DLP API to redact PII data',
        'Set up BigQuery cache with BI Engine'
      ];
    }

    // 4. CI/CD / DevOps
    if (name.includes('ci/cd') || name.includes('build') || name.includes('devops') || xml.includes('github') || xml.includes('jenkins') || xml.includes('sonar')) {
      return [
        'Add SonarQube for static code analysis',
        'Integrate Slack notifications for build alerts',
        'Enforce artifact signing with Cosign',
        'Set up staging deploy step in pipeline'
      ];
    }

    // 5. General Fallback
    return [
      'Add an HTTPS Load Balancer at ingress',
      'Integrate Redis Cache for fast query response',
      'Enforce IAM roles & service network isolation',
      'Attach Prometheus & Grafana dashboard metrics'
    ];
  }, [activeDiagram, activeVersion?.xml_content]);
  
  // v1 Canvas & Edit States (Inspired by AI Studio Blueprint Canvas)
  // v1 Canvas & Edit States (Inspired by AI Studio Blueprint Canvas)
  const [zoom, setZoom] = useState(0.7);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanMode, setIsPanMode] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [canvasTheme, setCanvasTheme] = useState<'dark' | 'light'>('dark');
  const [viewMode, setViewMode] = useState<'canvas' | 'outline' | 'business' | 'technical'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      if (viewParam === 'outline') return 'outline';
      if (viewParam === 'business') return 'business';
      if (viewParam === 'technical') return 'technical';
    }
    return 'canvas';
  });
  const [outlineEdits, setOutlineEdits] = useState<Record<string, string>>({});
  const [isMetadataGenerating, setIsMetadataGenerating] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const filteredSidebarDiagrams = React.useMemo(() => {
    return diagrams.filter(d => d.name.toLowerCase().includes(sidebarSearch.toLowerCase()));
  }, [diagrams, sidebarSearch]);

  const recentDiagrams = React.useMemo(() => {
    return filteredSidebarDiagrams.slice(0, 7); // Cap at 7 recent diagrams
  }, [filteredSidebarDiagrams]);

  const archiveDiagrams = React.useMemo(() => {
    return filteredSidebarDiagrams.slice(7);
  }, [filteredSidebarDiagrams]);
  
  // Tour States
  const [tourStep, setTourStep] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tour') === 'true') {
        return 1;
      }
    }
    return null;
  });

  const getTourClass = (step: number | null, targetStep: number, baseClass: string) => {
    if (step === targetStep) {
      // Strip any conflicting z-index utilities (e.g. z-20, z-30) from base class
      const cleanedBase = baseClass.replace(/\bz-\d+\b/g, '');
      // Ensure positioning context exists so z-index functions correctly
      const hasPosition = /\b(relative|absolute|fixed|sticky)\b/.test(cleanedBase);
      const positionClass = hasPosition ? '' : 'relative';
      
      return `${cleanedBase} ${positionClass} z-50 ring-4 ring-teal-500/40 shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300`;
    }
    return baseClass;
  };
  
  // UI Panels
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('modal') === 'create';
    }
    return false;
  });
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isInlineEditorOpen, setIsInlineEditorOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('edit') === 'true';
    }
    return false;
  });
  const [inspectVersion, setInspectVersion] = useState<DiagramVersion | null>(null);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('modal') === 'inspect';
    }
    return false;
  });
  
  // Form Inputs
  const [newDiagramName, setNewDiagramName] = useState('');
  const [newDiagramPrompt, setNewDiagramPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('0');
  const [promptInput, setPromptInput] = useState('');
  const [saveComment, setSaveComment] = useState('');
  const [activeSteps, setActiveSteps] = useState<{ [key: number]: 'create' | 'modify' | 'business' | 'technical' }>({
    1: 'create',
    2: 'create',
    3: 'create',
    4: 'create',
    5: 'create'
  });
  const [currentTab, setCurrentTab] = useState<'editor' | 'templates' | 'audit' | 'settings' | 'walkthrough'>('editor');
  const searchParams = useSearchParams();
  const isInitialTabLoadedRef = useRef(false);

  const [isPasswordSetupOpen, setIsPasswordSetupOpen] = useState(false);

  useEffect(() => {
    if (!isInitialTabLoadedRef.current) {
      isInitialTabLoadedRef.current = true;
      const tabParam = searchParams.get('tab');
      if (tabParam && ['editor', 'templates', 'audit', 'settings', 'walkthrough'].includes(tabParam)) {
        setCurrentTab(tabParam as 'editor' | 'templates' | 'audit' | 'settings' | 'walkthrough');
      }
    }
    if (searchParams.get('setupPassword') === 'true') {
      setIsPasswordSetupOpen(true);
    }
  }, [searchParams]);

  const openCreateModal = () => {
    setNewDiagramName('');
    setNewDiagramPrompt('');
    setSelectedTemplate('0');
    setIsCreateModalOpen(true);
  };
  
  // Loading & Layout View Mode States
  const [isLoadingDiagrams, setIsLoadingDiagrams] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [layoutPreset, setLayoutPreset] = useState<'detailed' | 'clean' | 'vendor'>('detailed');
  const [generatingTemplateIdx, setGeneratingTemplateIdx] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Chat History
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Audit & Remediation States
  const [selectedAuditCategory, setSelectedAuditCategory] = useState<'security' | 'visual' | 'topology' | 'responsive' | 'accessibility' | 'vendor'>('security');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<string | null>(null);
  const [auditScore, setAuditScore] = useState<number>(82);
  const [auditGaps, setAuditGaps] = useState<{ id: string; title: string; severity: 'HIGH' | 'MEDIUM' | 'LOW'; component: string; description: string; remediation: string }[]>([]);
  const [selectedGapIds, setSelectedGapIds] = useState<string[]>([]);
  const [auditHistory, setAuditHistory] = useState<any[]>([]);
  const [selectedAuditReportId, setSelectedAuditReportId] = useState<string | null>(null);
  const [showAuditDelta, setShowAuditDelta] = useState(false);
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditFilterTab, setAuditFilterTab] = useState<'all' | 'audited' | 'pending'>('all');
  const [isRemediating, setIsRemediating] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTerraformModalOpen, setIsTerraformModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  

  
  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const childWindowRef = useRef<Window | null>(null);
  const activeXmlRef = useRef('');
  
  // State for editor integration
  const [pendingXml, setPendingXml] = useState<string | null>(null);

  // Listen for messages from Draw.io editors (both iframe and popup tab)
  useEffect(() => {
    const handleWindowMessage = (evt: MessageEvent) => {
      const iframe = iframeRef.current;
      const childWindow = childWindowRef.current;
      
      const isFromIframe = iframe && evt.source === iframe.contentWindow;
      const isFromChild = childWindow && evt.source === childWindow;
      
      if (!isFromIframe && !isFromChild) return;
      
      interface DrawIoEvent {
        event?: string;
        xml?: string;
        data?: string;
        action?: string;
      }
      let msg: DrawIoEvent = {};
      try {
        msg = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data;
      } catch {
        return; // Not JSON
      }
      
      const sourceWindow = isFromIframe ? iframe.contentWindow : childWindow;
      
      if (msg.event === 'init') {
        console.log('[Draw.io Embed] ✉️ Received: init. Sending: load...');
        sourceWindow?.postMessage(JSON.stringify({
          action: 'load',
          xml: activeXmlRef.current,
          fit: false
        }), '*');
      }
      
      if (msg.event === 'save') {
        console.log('[Draw.io Embed] ✉️ Received: save. Opening Save Version modal...');
        if (msg.xml) {
          setPendingXml(msg.xml);
          setIsSaveModalOpen(true);
        }
      }
      
      if (msg.event === 'export') {
        console.log('[Draw.io Embed] ✉️ Received: export. Opening Save Version modal...');
        const xmlContent = msg.data || msg.xml;
        if (xmlContent) {
          setPendingXml(xmlContent);
          setIsSaveModalOpen(true);
        }
      }
      
      if (msg.event === 'exit') {
        console.log('[Draw.io Embed] ✉️ Received: exit. Closing editor...');
        if (isFromIframe) {
          setIsInlineEditorOpen(false);
        } else if (isFromChild) {
          childWindow?.close();
          childWindowRef.current = null;
        }
      }
    };
    
    window.addEventListener('message', handleWindowMessage);
    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, []);

  const openInNewTab = () => {
    if (!activeDiagram || !activeVersion) return;
    
    if (childWindowRef.current && !childWindowRef.current.closed) {
      childWindowRef.current.focus();
      return;
    }
    
    const child = window.open(
      'https://embed.diagrams.net/?embed=1&proto=json&ui=dark&pv=0',
      '_blank'
    );
    
    childWindowRef.current = child;
  };

  // Fetch active diagram details when ID changes
  const loadDiagramDetails = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/diagrams/${id}`);
      if (res.status === 403 || res.status === 401) {
        const accessRes = await fetch(`/api/diagrams/${id}/access`);
        const accessData = await accessRes.json();
        setRestrictedState({
          diagramId: id,
          diagramName: 'Restricted Architecture Diagram',
          pendingRequest: accessData.pendingRequest,
        });
        setActiveDiagram(null);
        return;
      }
      if (res.status === 404) {
        setActiveDiagram(null);
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          params.delete('diagram');
          window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        }
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch diagram details');
      const data: Diagram = await res.json();
      
      setRestrictedState(null);
      setActiveDiagram(data);
      setZoom(0.7);
      setPan({ x: 0, y: 0 });
      setOutlineEdits({});
      
      // Set the latest version as active
      if (data.versions && data.versions.length > 0) {
        const sortedVersions = [...data.versions].sort((a, b) => b.version_number - a.version_number);
        setActiveVersion(sortedVersions[0]);
        
        // Restore previewVersion if specified in URL query
        const params = new URLSearchParams(window.location.search);
        const previewId = params.get('preview');
        const matchVer = data.versions.find(v => v.id === previewId);
        if (matchVer && matchVer.id !== sortedVersions[0].id) {
          setPreviewVersion(matchVer);
        } else {
          setPreviewVersion(null);
        }

        // Restore inspectVersion if specified in URL query
        const inspectVerId = params.get('inspect_ver');
        const matchInspect = data.versions.find(v => v.id === inspectVerId);
        if (matchInspect) {
          setInspectVersion(matchInspect);
        }
        
        // Reconstruct complete chat history from all version prompts and comments
        const messages: ChatMessage[] = [];
        data.versions
          .sort((a, b) => a.version_number - b.version_number)
          .forEach((v) => {
            if (v.prompt) {
              messages.push({
                id: `${v.id}_user_prompt`,
                sender: 'user',
                text: v.prompt,
                timestamp: new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                versionNumber: v.version_number
              });
            }
            messages.push({
              id: v.id,
              sender: v.created_by.toLowerCase() === 'ai' ? 'ai' : 'user',
              text: v.created_by.toLowerCase() === 'ai' 
                ? `Generated diagram version v${v.version_number}: "${v.comment || 'AI Refined Architecture'}"`
                : `Manually saved version v${v.version_number}: "${v.comment || 'Saved changes'}"`,
              timestamp: new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              versionNumber: v.version_number
            });
          });
        setChatMessages(messages);
      } else {
        setActiveVersion(null);
        setPreviewVersion(null);
        setChatMessages([]);
      }

      // Fetch persistent audit report history
      try {
        const auditRes = await fetch(`/api/audit?diagramId=${id}`);
        if (auditRes.ok) {
          const auditData = await auditRes.json();
          if (auditData.reports && auditData.reports.length > 0) {
            setAuditHistory(auditData.reports);
            const latest = auditData.reports[0];
            setSelectedAuditReportId(latest.id);
            setAuditReport(latest.report);
            setAuditScore(latest.score);
            try {
              const parsedGaps = JSON.parse(latest.gaps);
              setAuditGaps(parsedGaps);
              setSelectedGapIds(parsedGaps.map((g: { id: string }) => g.id));
            } catch {
              setAuditGaps([]);
            }
          } else {
            setAuditHistory([]);
            setAuditReport(null);
            setAuditGaps([]);
          }
        }
      } catch {
        setAuditHistory([]);
      }
    } catch (err) {
      console.error(err);
      alert('Error loading diagram details');
      setActiveDiagram(null);
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        params.delete('diagram');
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      }
    }
  }, []);

  useEffect(() => {
    let rootDiv: HTMLElement | null = null;
    const handleScroll = () => {
      if (rootDiv) {
        if (rootDiv.scrollTop !== 0 || rootDiv.scrollLeft !== 0) {
          rootDiv.scrollTop = 0;
          rootDiv.scrollLeft = 0;
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      rootDiv = document.querySelector('.flex.h-screen.w-screen') as HTMLElement;
      if (rootDiv) {
        rootDiv.scrollTop = 0;
        rootDiv.scrollLeft = 0;
        rootDiv.addEventListener('scroll', handleScroll);
      }
    }

    return () => {
      if (rootDiv) {
        rootDiv.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true')) {
        return;
      }
      if (e.code === 'Space') {
        setIsSpacePressed(true);
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // --- Effects ---
  // Synchronize initial diagram selection once page loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const diagramId = params.get('diagram');
    if (diagramId && !activeDiagram && !restrictedState) {
      loadDiagramDetails(diagramId);
    }
  }, [activeDiagram, restrictedState, loadDiagramDetails]);

  // Auto-select diagram when visiting Audit tab if none is selected
  useEffect(() => {
    if (currentTab === 'audit' && !activeDiagram && diagrams.length > 0) {
      loadDiagramDetails(diagrams[0].id);
    }
  }, [currentTab, activeDiagram, diagrams, loadDiagramDetails]);

  // Real-time URL query parameter synchronizer
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();

    // Tab
    if (currentTab !== 'editor') {
      params.set('tab', currentTab);
    }

    // Active Diagram
    if (activeDiagram) {
      params.set('diagram', activeDiagram.id);
    } else {
      const currentParams = new URLSearchParams(window.location.search);
      const urlDiagram = currentParams.get('diagram');
      if (urlDiagram) {
        params.set('diagram', urlDiagram);
      }
    }

    // View Mode
    if (viewMode !== 'canvas') {
      params.set('view', viewMode);
    }

    // Inline Editor
    if (isInlineEditorOpen) {
      params.set('edit', 'true');
    }

    // Preview snapshot version
    if (previewVersion) {
      params.set('preview', previewVersion.id);
    }

    // Create Modal
    if (isCreateModalOpen) {
      params.set('modal', 'create');
    }

    // Inspect modal
    if (isInspectModalOpen) {
      params.set('modal', 'inspect');
      if (inspectVersion) {
        params.set('inspect_ver', inspectVersion.id);
      }
    }

    // Tour Step
    if (tourStep !== null) {
      params.set('tour', 'true');
    }

    const currentSearch = window.location.search;
    const currentPath = window.location.pathname;
    const computedSearch = params.toString() ? `?${params.toString()}` : '';
    const newSearch = computedSearch ? `${currentPath}${computedSearch}` : currentPath;

    if (currentSearch !== computedSearch) {
      window.history.replaceState(null, '', newSearch);
    }
  }, [
    currentTab,
    activeDiagram,
    viewMode,
    isInlineEditorOpen,
    previewVersion,
    isCreateModalOpen,
    isInspectModalOpen,
    inspectVersion,
    tourStep
  ]);

  // Fetch all diagrams on mount
  useEffect(() => {
    fetchDiagrams();
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setCurrentUser(data.user);
      })
      .catch(() => {});
  }, []);



  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isGenerating]);

  // --- API Handlers ---
  async function fetchDiagrams() {
    setIsLoadingDiagrams(true);
    try {
      const res = await fetch('/api/diagrams');
      if (!res.ok) throw new Error('Failed to fetch diagrams');
      const data = await res.json();
      setDiagrams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingDiagrams(false);
    }
  }

  const handleCreateDiagram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiagramName.trim()) return;
    
    try {
      // Phase 7: Clean Minimal Starter Slate for Version v1 (No 15-node RAG/ERP clutter!)
      const defaultXml = `
        <mxfile host="embed.diagrams.net">
          <diagram id="clean_workspace" name="Clean Architecture Workspace">
            <mxGraphModel dx="1193" dy="853" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1000" pageHeight="950" math="0" shadow="0">
              <root>
                <mxCell id="0" />
                <mxCell id="1" parent="0" />
                <mxCell id="welcome_node" value="&lt;b&gt;[1] New Architecture Workspace&lt;/b&gt;&lt;br&gt;&lt;i&gt;Type a prompt in the AI box below to design your system with Gemini!&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;fontFamily=Helvetica;fontSize=14;" vertex="1" parent="1">
                  <mxGeometry x="350" y="250" width="300" height="80" as="geometry" />
                </mxCell>
              </root>
            </mxGraphModel>
          </diagram>
        </mxfile>
      `.trim();

      const promptToGenerate = newDiagramPrompt.trim();

      if (promptToGenerate) {
        setIsGenerating(true);
        setIsCreateModalOpen(false);
        try {
          const res = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: newDiagramName.trim(),
              prompt: promptToGenerate
            })
          });
          if (!res.ok) throw new Error('Failed to generate diagram');
          const data = await res.json();
          setNewDiagramName('');
          setNewDiagramPrompt('');
          await fetchDiagrams();
          await loadDiagramDetails(data.diagram.id);
        } catch (genErr) {
          console.error(genErr);
          alert('Error generating template diagram.');
        } finally {
          setIsGenerating(false);
        }
        return;
      }

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDiagramName,
          xml: defaultXml,
          comment: 'Initial canvas created'
        })
      });
      
      if (!res.ok) throw new Error('Failed to create diagram');
      const data = await res.json();
      
      setNewDiagramName('');
      setNewDiagramPrompt('');
      setIsCreateModalOpen(false);
      
      await fetchDiagrams();
      await loadDiagramDetails(data.diagram.id);
    } catch (err) {
      console.error(err);
      alert('Error creating diagram');
    }
  };

  const handleDeleteDiagram = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the diagram
    if (!confirm('Are you sure you want to delete this diagram and all its version history?')) return;
    
    try {
      const res = await fetch(`/api/diagrams/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete diagram');
      
      if (activeDiagram?.id === id) {
        if (typeof window !== 'undefined') {
          const newParams = new URLSearchParams(window.location.search);
          newParams.delete('diagram');
          window.history.replaceState({}, '', `${window.location.pathname}?${newParams.toString()}`);
        }
        setActiveDiagram(null);
        setActiveVersion(null);
        setPreviewVersion(null);
        setChatMessages([]);
      }
      
      fetchDiagrams();
    } catch (err) {
      console.error(err);
      alert('Error deleting diagram');
    }
  };

  // Mock AI Generation Loop (Phase 2 Mock, to be replaced by Gemini in Phase 5)
  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || !activeDiagram) return;
    
    const userPrompt = promptInput.trim();
    setPromptInput('');
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMessage]);
    
    setIsGenerating(true);
    
    try {
      // Call the AI generate API (refinement mode)
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          diagramId: activeDiagram.id
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.details || 'Failed to generate diagram refinement');
      }
      
      // Reload diagram details to get the new version and update the chat/timeline
      await loadDiagramDetails(activeDiagram.id);
    } catch (err: unknown) {
      console.error('AI generation error:', err);
      const errMsg = err instanceof Error ? err.message : 'An unexpected error occurred during diagram generation.';
      // Add an error message from the AI to the chat
      const errorMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: 'ai',
        text: `❌ Error: ${errMsg}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Version Handler (for manual edits)
  const handleSaveVersion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDiagram || !saveComment.trim()) return;
    
    const xmlToSave = pendingXml !== null ? pendingXml : activeVersion?.xml_content;
    if (!xmlToSave) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xmlContent: xmlToSave,
          comment: saveComment,
          createdBy: 'User'
        }
      )});
      
      if (!res.ok) throw new Error('Failed to save version');
      
      setSaveComment('');
      setPendingXml(null);
      setIsSaveModalOpen(false);
      
      // If inline editor was open, close it
      if (isInlineEditorOpen) {
        setIsInlineEditorOpen(false);
      }
      
      // Reload details
      await loadDiagramDetails(activeDiagram.id);
    } catch (err) {
      console.error(err);
      alert('Failed to save version');
    } finally {
      setIsSaving(false);
    }
  };

  // Save Version Handler for Outline Editor quick edits
  const handleSaveOutlineEdits = async () => {
    if (!activeDiagram || !activeVersion) return;
    const editedIds = Object.keys(outlineEdits);
    if (editedIds.length === 0) return;

    setIsSaving(true);
    try {
      let updatedXml = activeVersion.xml_content;
      for (const id of editedIds) {
        const newLabel = outlineEdits[id];
        const cellRegex = new RegExp(`(<mxCell[^>]*id="${id}"[^>]*)value="[^"]*"`, 'g');
        if (cellRegex.test(updatedXml)) {
          updatedXml = updatedXml.replace(cellRegex, `$1value="${htmlEscape(newLabel)}"`);
        } else {
          const insertRegex = new RegExp(`(<mxCell[^>]*id="${id}"[^>]*?)(/?>)`, 'g');
          updatedXml = updatedXml.replace(insertRegex, `$1 value="${htmlEscape(newLabel)}"$2`);
        }
      }

      const res = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xmlContent: updatedXml,
          comment: `Updated ${editedIds.length} node label(s) via Outline Editor`,
          createdBy: 'User'
        })
      });
      
      if (!res.ok) throw new Error('Failed to save outline edits');
      
      setOutlineEdits({});
      await loadDiagramDetails(activeDiagram.id);
    } catch (err) {
      console.error(err);
      alert('Failed to save outline edits');
    } finally {
      setIsSaving(false);
    }
  };

  // Generate in-place Business and Technical Use Case details with AI
  const handleGenerateMetadata = async () => {
    if (!displayedVersion) return;
    setIsMetadataGenerating(true);
    try {
      const res = await fetch('/api/generate/usecases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ versionId: displayedVersion.id })
      });
      if (!res.ok) throw new Error('Failed to generate use cases');
      const data = await res.json();
      
      // Update local state by reloading details
      if (activeDiagram) {
        await loadDiagramDetails(activeDiagram.id);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate use cases. Please try again.');
    } finally {
      setIsMetadataGenerating(false);
    }
  };

  // Basic HTML Markdown parsing helper
  const parseMarkdown = (md: string): string => {
    if (!md) return '';

    const renderHtmlTable = (rows: string[]): string => {
      if (rows.length < 2) return rows.join('\n');
      const headerLine = rows[0];
      const separatorLine = rows[1];
      const contentLines = rows.slice(2);
      if (!separatorLine.includes('-')) return rows.join('\n');

      const parseCells = (line: string) => {
        const parts = line.split('|');
        return parts.slice(1, parts.length - 1).map(c => c.trim());
      };

      const headers = parseCells(headerLine);
      const ths = headers.map(h => `<th class="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider border-b border-panel-border/40 text-slate-200 bg-slate-800/40">${h}</th>`).join('');

      const trs = contentLines.map(line => {
        const cells = parseCells(line);
        const tds = cells.map(c => `<td class="px-4 py-3 border-b border-panel-border/20 text-slate-300">${c}</td>`).join('');
        return `<tr class="hover:bg-slate-800/10 transition-colors">${tds}</tr>`;
      }).join('');

      return `
        <div class="my-6 overflow-x-auto rounded-lg border border-panel-border/30 bg-panel-bg/20">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr>${ths}</tr>
            </thead>
            <tbody class="divide-y divide-panel-border/10">
              ${trs}
            </tbody>
          </table>
        </div>
      `.trim();
    };

    const parseTables = (text: string): string => {
      const lines = text.split('\n');
      let inTable = false;
      let tableRows: string[] = [];
      let result: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const isTableRow = line.startsWith('|') && line.endsWith('|');

        if (isTableRow) {
          if (!inTable) {
            inTable = true;
            tableRows = [line];
          } else {
            tableRows.push(line);
          }
        } else {
          if (inTable) {
            result.push(renderHtmlTable(tableRows));
            inTable = false;
            tableRows = [];
          }
          result.push(lines[i]);
        }
      }

      if (inTable && tableRows.length > 0) {
        result.push(renderHtmlTable(tableRows));
      }

      return result.join('\n');
    };

    // Replace HTML entities first to prevent rendering issues in custom markup
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Parse tables
    html = parseTables(html);
    
    // Headers (Note: we match escaped &lt;h etc if they were parsed, but here we generate valid HTML)
    html = html.replace(/^#### (.*$)/gim, '<h4 class="text-base font-extrabold text-white mt-5 mb-2 pb-0.5 flex items-center gap-1">$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-extrabold text-teal-accent mt-6 mb-2 border-b border-panel-border/30 pb-1 flex items-center gap-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-black text-white mt-8 mb-3 border-b border-panel-border pb-1.5">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-teal-accent mt-10 mb-4">$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-extrabold">$1</strong>');
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="text-slate-400 italic">$1</em>');

    // Inline code blocks (backticks)
    // Note: since we escaped HTML entities first, we match escaped characters correctly inside code blocks.
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-800 text-teal-accent px-1.5 py-0.5 rounded font-mono text-xs border border-panel-border/30">$1</code>');

    // Numbered list items
    html = html.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="text-slate-300 text-sm ml-5 list-decimal my-2 leading-relaxed">$2</li>');
    
    // Bullet points
    html = html.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li class="text-slate-300 text-sm ml-5 list-disc my-2 leading-relaxed">$1</li>');
    
    // Paragraphs (split by double lines, wrap non-html elements)
    const lines = html.split('\n\n');
    const parsedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h') || 
        trimmed.startsWith('<li') || 
        trimmed.startsWith('<ul') || 
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('<table') ||
        trimmed.startsWith('<t')
      ) {
        return trimmed;
      }
      return `<p class="text-slate-300 text-sm leading-relaxed my-3">${trimmed}</p>`;
    });
    
    return parsedLines.join('\n');
  };

  // Restore a past version
  const handleRestoreVersion = async (version: DiagramVersion) => {
    if (!activeDiagram) return;
    if (!confirm(`Are you sure you want to restore version v${version.version_number} as the active working draft? This will create a new version v${(activeDiagram.versions?.length || 0) + 1}.`)) return;
    
    try {
      const res = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xmlContent: version.xml_content,
          comment: `Restored version v${version.version_number}`,
          createdBy: 'User'
        })
      });
      
      if (!res.ok) throw new Error('Failed to restore version');
      
      // Reload details
      await loadDiagramDetails(activeDiagram.id);
    } catch (err) {
      console.error(err);
      alert('Failed to restore version');
    }
  };

  // Audit the active diagram
  const handleAuditDiagram = async (category?: string) => {
    if (!activeDiagram) return;
    const catToUse = category || selectedAuditCategory;
    setCurrentTab('audit');
    setIsAuditing(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagramId: activeDiagram.id, auditCategory: catToUse })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.details || 'Failed to audit diagram');
      }
      const data = await res.json();
      setAuditReport(data.report);
      setAuditScore(data.score || 82);
      const gapsList = data.gaps || [];
      setAuditGaps(gapsList);
      setSelectedGapIds(gapsList.map((g: { id: string }) => g.id));
      if (data.reportsHistory) {
        setAuditHistory(data.reportsHistory);
        if (data.reportsHistory.length > 0) {
          setSelectedAuditReportId(data.reportsHistory[0].id);
        }
      }
    } catch (err: unknown) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Failed to generate architecture audit.';
      alert(errMsg);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleRemediateGaps = async () => {
    if (!activeDiagram || selectedGapIds.length === 0) return;
    const selectedGaps = auditGaps.filter(g => selectedGapIds.includes(g.id));
    if (selectedGaps.length === 0) return;

    setIsRemediating(true);
    setIsGenerating(true);
    try {
      const res = await fetch('/api/audit/remediate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagramId: activeDiagram.id,
          selectedGaps
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.details || 'Failed to remediate security gaps');
      }

      // Re-run fresh audit after remediation!
      const auditRes = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagramId: activeDiagram.id })
      });
      if (auditRes.ok) {
        const auditData = await auditRes.json();
        setAuditReport(auditData.report);
        setAuditScore(auditData.score);
        setAuditGaps(auditData.gaps || []);
        setSelectedGapIds((auditData.gaps || []).map((g: { id: string }) => g.id));
        if (auditData.reportsHistory) {
          setAuditHistory(auditData.reportsHistory);
          if (auditData.reportsHistory.length > 0) {
            setSelectedAuditReportId(auditData.reportsHistory[0].id);
          }
        }
      }
      await loadDiagramDetails(activeDiagram.id);
    } catch (err: unknown) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Failed to remediate security gaps.';
      alert(errMsg);
    } finally {
      setIsRemediating(false);
      setIsGenerating(false);
    }
  };

  // Helper to render basic markdown safely in modal
  const renderAuditMarkdown = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      let rendered = line;
      // Bold: **text** -> <strong>text</strong>
      rendered = rendered.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Headers
      if (rendered.trim().startsWith('### ')) {
        return <h4 key={i} className="font-bold text-sm text-teal-accent mt-3 mb-1.5">{rendered.trim().slice(4)}</h4>;
      }
      if (rendered.trim().startsWith('## ')) {
        return <h3 key={i} className="font-bold text-base text-white mt-4 mb-2 border-b border-panel-border/30 pb-1">{rendered.trim().slice(3)}</h3>;
      }
      if (rendered.trim().startsWith('# ')) {
        return <h2 key={i} className="font-bold text-lg text-white mt-4 mb-2">{rendered.trim().slice(2)}</h2>;
      }
      // Bullet points
      if (rendered.trim().startsWith('* ')) {
        return <div key={i} className="pl-4 text-xs text-slate-300 min-h-[1.4em]">• {rendered.trim().slice(2)}</div>;
      }
      if (rendered.trim().startsWith('- ')) {
        return <div key={i} className="pl-4 text-xs text-slate-300 min-h-[1.4em]">• {rendered.trim().slice(2)}</div>;
      }
      return (
        <div 
          key={i} 
          className="text-xs text-slate-300 min-h-[1.2em] leading-relaxed my-0.5" 
          dangerouslySetInnerHTML={{ __html: rendered }} 
        />
      );
    });
  };

  const renderTemplatesView = () => {
    return (
      <div className="flex-1 overflow-y-auto p-8 bg-bg-dark select-none animate-fade-in">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Architectural Blueprint Library</h1>
            <p className="text-sm text-slate-400 mt-1">Select an out-of-the-box cloud architecture template to bootstrap your canvas instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEMPLATE_PROMPTS.slice(1).map((t, idx) => {
              const isAws = t.name.includes('AWS');
              const isGcp = t.name.includes('GCP');
              const provider = isAws ? 'AWS' : isGcp ? 'GCP' : 'DevOps';
              const providerColor = isAws 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                : isGcp 
                  ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' 
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';

              return (
                <div key={idx} className="glass-panel border-panel-border/50 hover:border-teal-500/30 rounded-xl p-5 flex flex-col justify-between transition-all group hover:scale-[1.01]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${providerColor}`}>
                        {provider}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-teal-accent/30 group-hover:text-teal-accent transition-colors" />
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-teal-accent transition-colors mb-2">
                      {t.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed mb-4">
                      {t.prompt}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setNewDiagramName(t.name);
                      setNewDiagramPrompt(t.prompt);
                      setSelectedTemplate((idx + 1).toString());
                      setIsCreateModalOpen(true);
                    }}
                    className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-teal-accent text-slate-300 hover:text-bg-dark text-xs font-semibold transition-all border border-slate-700 hover:border-transparent flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderWalkthroughView = () => {
    const scenarios = [
      {
        id: 1,
        title: 'Multi-Agent RAG with Advanced Grounding',
        desc: 'Enterprise RAG pipeline with router orchestrator, chunking/embedding sub-agents, Vertex Vector Search, Redis grounding store, and semantic cache.',
        createPrompt: 'Design an enterprise Multi-Agent RAG system. It should include: a secure Client Web portal, an API Gateway with JWT Auth and PII filters, a Router/Orchestrator Agent, specialized Document Chunking and Embedding Agents, a Vector Database (Vertex AI Vector Search), a grounding store (Redis), a compliance/QC feedback loops, and a connection to external Enterprise Knowledge base.',
        modifyPrompt: 'Add a Redis Semantic Cache layer between the API Gateway and the Router Orchestrator Agent to speed up response times.'
      },
      {
        id: 2,
        title: 'Event-Driven E-Commerce Order Fulfillment Pipeline',
        desc: 'Decoupled asynchronous processing pipeline using Saga Pattern Orchestration, Kafka Event Broker, microservices, and Dead-Letter Queues (DLQ).',
        createPrompt: 'Design an event-driven E-Commerce Order Fulfillment Pipeline. It should include: Web/Mobile Clients, API Gateway, Saga Pattern Orchestrator, Kafka Event Broker, Order Service, Payment Service with secure compliance, Inventory Service, Dead-Letter Queues (DLQ), and a fraud checking compliance loop pointing back to the Orchestrator.',
        modifyPrompt: 'Add an auto-scaling container orchestration layer to host the order and payment microservices.'
      },
      {
        id: 3,
        title: 'High-Availability Hybrid Multi-Cloud System',
        desc: 'Global active-active cross-cloud load balancing and data replication across AWS and GCP, with real-time failover routing and security rules.',
        createPrompt: 'Design a high-availability Hybrid Multi-Cloud Web Application. It should include: DNS routing (Route 53) distributing traffic between AWS and GCP, Global HTTPS Load Balancers on both clouds, frontend container apps, distributed SQL Database (Cloud Spanner/Aurora) with cross-cloud replication, and a centralized monitoring/observability agent.',
        modifyPrompt: 'Add Cloud Armor WAF security rules in front of the GCP Load Balancer.'
      },
      {
        id: 4,
        title: 'Decentralized Data Mesh Analytics Platform',
        desc: 'Distributed domain architectures with central data governance, data lineage (Dataplex), automated Airflow orchestration, and modeling pipelines (dbt).',
        createPrompt: 'Design a decentralized Data Mesh Analytics Platform. It should include: Multiple domain data ingestion systems, a central Data Governance and Lineage orchestrator (GCP Dataplex), distributed dbt modeling pipelines, separate domain warehouses (BigQuery/Snowflake), Apache Airflow workflow manager, and automated IAM access control compliance loops.',
        modifyPrompt: 'Add a central data catalog service to allow users to search and discover data assets across domains.'
      },
      {
        id: 5,
        title: 'Zero-Trust HIPAA & PCI-DSS Compliant Payment Gateway',
        desc: 'Auditable transaction system utilizing VPC isolation, tokenization, AWS KMS envelope encryption, dedicated logging vaults, and risk guardrails.',
        createPrompt: 'Design a zero-trust, HIPAA & PCI-DSS compliant Payment Gateway. It should include: Client payment interfaces, AWS API Gateway with Shield DDoS protection, isolated VPC compute instances for tokenization, AWS KMS for envelope encryption, a dedicated auditing and logging vault (CloudTrail/CloudWatch), and automated risk compliance self-healing loops.',
        modifyPrompt: 'Add an isolated hardware security module (HSM) instance inside a private subnet to store root keys.'
      }
    ];

    const stepLabels = [
      { id: 'create', name: '1. Diagram (v1)' },
      { id: 'modify', name: '2. Diagram (v2)' },
      { id: 'business', name: '3. Business Brief' },
      { id: 'technical', name: '4. Technical Brief' }
    ] as const;

    return (
      <div className="flex-1 overflow-y-auto p-8 bg-bg-dark select-none animate-fade-in">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div className="border-b border-panel-border/30 pb-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-accent" />
              <span>Visual Onboarding Walkthrough</span>
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-2xl">
              Explore 5 pre-compiled, high-demand enterprise architectures. See how PromptCanvas accepts prompts, refines diagrams, and compiles complete Business and Technical briefs automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {scenarios.map((sc) => {
              const currentStep = activeSteps[sc.id] || 'create';
              const imgUrl = `/walkthrough/scenario_${sc.id}_${currentStep}.png`;

              return (
                <div key={sc.id} className="glass-panel border-panel-border p-6 rounded-xl bg-panel-dark/40 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Controls/Prompts */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        SCENARIO 0{sc.id}
                      </span>
                      <h3 className="font-extrabold text-white text-lg mt-2">{sc.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{sc.desc}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-bg-dark/60 border border-panel-border/30 rounded-lg p-3">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Creation Prompt</div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">{sc.createPrompt}</p>
                      </div>

                      <div className="bg-bg-dark/60 border border-panel-border/30 rounded-lg p-3">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Refinement Prompt</div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">{sc.modifyPrompt}</p>
                      </div>
                    </div>

                    {/* Step Switchers */}
                    <div className="grid grid-cols-2 gap-2">
                      {stepLabels.map((lbl) => (
                        <button
                          key={lbl.id}
                          onClick={() => setActiveSteps(prev => ({ ...prev, [sc.id]: lbl.id }))}
                          className={`px-3 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                            currentStep === lbl.id
                              ? 'bg-teal-accent text-bg-dark font-extrabold shadow-md border-transparent'
                              : 'bg-bg-dark border border-panel-border/30 text-slate-400 hover:text-white hover:border-slate-500'
                          }`}
                        >
                          {lbl.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Image Viewer */}
                  <div className="lg:col-span-8 bg-bg-dark/80 rounded-xl border border-panel-border/40 overflow-hidden relative shadow-inner flex items-center justify-center p-2 min-h-[450px]">
                    <img 
                      src={imgUrl} 
                      alt={`${sc.title} - ${currentStep}`}
                      className="max-w-full max-h-[500px] object-contain rounded-lg border border-panel-border/20 shadow-lg select-none"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 500'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23475569'%3EPuppeteer generating walkthrough screenshot...%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    );
  };

  const renderAuditCenterView = () => {
    const filteredDiagrams = diagrams.filter(d => {
      const matchesQuery = d.name.toLowerCase().includes(auditSearchQuery.toLowerCase());
      if (!matchesQuery) return false;
      const isSelected = activeDiagram?.id === d.id;
      const hasReport = isSelected && (auditReport || auditHistory.length > 0);
      if (auditFilterTab === 'audited') return hasReport;
      if (auditFilterTab === 'pending') return !hasReport;
      return true;
    });

    return (
      <div className="flex-1 overflow-hidden flex bg-bg-dark select-none animate-fade-in font-sans">
        {/* Expanded Left Directory Sidebar */}
        <div className="w-80 md:w-96 lg:w-[380px] shrink-0 border-r border-panel-border/30 flex flex-col bg-[#090d16]">
          {/* Header Section */}
          <div className="p-5 border-b border-panel-border/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                Security Control Center
              </span>
              <span className="text-xs font-bold text-slate-400">
                {filteredDiagrams.length} {filteredDiagrams.length === 1 ? 'Asset' : 'Assets'}
              </span>
            </div>
            <div>
              <h2 className="font-extrabold text-white text-lg tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Security & Compliance</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Audit node connections against safety benchmarks and cloud compliance frameworks.
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative mt-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search architecture diagrams..."
                value={auditSearchQuery}
                onChange={(e) => setAuditSearchQuery(e.target.value)}
                className="w-full bg-[#0d1322] border border-slate-700/60 focus:border-teal-500/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
              />
              {auditSearchQuery && (
                <button
                  type="button"
                  onClick={() => setAuditSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Status Filter Pills */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setAuditFilterTab('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  auditFilterTab === 'all'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                All ({diagrams.length})
              </button>
              <button
                type="button"
                onClick={() => setAuditFilterTab('pending')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  auditFilterTab === 'pending'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                Pending Audit
              </button>
              <button
                type="button"
                onClick={() => setAuditFilterTab('audited')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  auditFilterTab === 'audited'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                Audited
              </button>
            </div>
          </div>
          
          {/* Directory Item List */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-230px)] p-4 space-y-2.5 custom-scrollbar">
            {filteredDiagrams.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-2">
                <ShieldAlert className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-400">
                  {auditSearchQuery ? 'No matching diagrams found' : 'No diagrams available'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {auditSearchQuery ? 'Try adjusting your search query.' : 'Create a diagram in the editor first.'}
                </p>
              </div>
            ) : (
              filteredDiagrams.map((d) => {
                const isActive = activeDiagram?.id === d.id;
                const hasAuditReport = activeDiagram?.id === d.id && (auditReport || auditHistory.length > 0);

                return (
                  <div
                    key={d.id}
                    onClick={() => loadDiagramDetails(d.id)}
                    className={`group p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      isActive 
                        ? 'bg-gradient-to-r from-teal-500/15 via-teal-500/10 to-transparent border-teal-500/50 text-white shadow-lg shadow-teal-950/40' 
                        : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700/80 text-slate-300'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400 rounded-r" />
                    )}
                    
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-slate-100 group-hover:text-teal-200 transition-colors break-words leading-tight flex-1">
                        {d.name}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isActive ? (
                          <span className="text-[10px] font-extrabold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-md border border-teal-500/40">
                            Selected
                          </span>
                        ) : hasAuditReport ? (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            Audited
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                            Pending Audit
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteDiagram(d.id, e)}
                          title="Delete Asset"
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/50">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Shield className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                        <span>{isActive ? 'Active Asset Report' : 'Click to inspect posture'}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-teal-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5'}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col">
          <div className="max-w-8xl w-full mx-auto space-y-8">
            {activeDiagram ? (
              <>
                <div className="flex items-center justify-between border-b border-panel-border/30 pb-5">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-black text-teal-accent uppercase tracking-widest">Active Asset</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('editor');
                          if (typeof window !== 'undefined') {
                            const params = new URLSearchParams(window.location.search);
                            params.delete('tab');
                            const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
                            window.history.replaceState({}, '', newUrl);
                          }
                        }}
                        className="text-xs font-bold text-teal-300 hover:text-white bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <LayoutGrid className="w-3.5 h-3.5 text-teal-accent" />
                        <span>View Architecture Diagram ➔</span>
                      </button>
                    </div>
                    <h2 className="text-3xl font-black text-white mt-1">{activeDiagram.name}</h2>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Audit Report Version History Dropdown */}
                    {auditHistory.length > 0 && (
                      <div className="relative flex items-center">
                        <select
                          value={selectedAuditReportId || ''}
                          onChange={(e) => {
                            const found = auditHistory.find(r => r.id === e.target.value);
                            if (found) {
                              setSelectedAuditReportId(found.id);
                              setAuditReport(found.report);
                              setAuditScore(found.score);
                              try {
                                const parsed = JSON.parse(found.gaps);
                                setAuditGaps(parsed);
                                setSelectedGapIds(parsed.map((g: { id: string }) => g.id));
                              } catch { setAuditGaps([]); }
                            }
                          }}
                          className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-black bg-[#0b101d] text-teal-300 border border-teal-500/40 hover:border-teal-400 focus:outline-none cursor-pointer shadow-md transition-all"
                        >
                          {auditHistory.map((rep, idx) => (
                            <option key={rep.id} value={rep.id} className="bg-[#0b101d] text-slate-200">
                              Audit Report v{rep.version_number} ({rep.score}%) {idx === 0 ? '- (Latest)' : '- (Historical Snapshot)'}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-teal-400 absolute right-2.5 pointer-events-none" />
                      </div>
                    )}

                    {/* Compare Version Delta Button */}
                    {auditHistory.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setShowAuditDelta(!showAuditDelta)}
                        className={`px-4 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center gap-1.5 ${
                          showAuditDelta
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>{showAuditDelta ? 'Hide Delta' : 'Compare Version Delta'}</span>
                      </button>
                    )}

                    {/* Single Primary Action Button */}
                    <button
                      onClick={() => handleAuditDiagram()}
                      disabled={isAuditing}
                      className="px-5 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20"
                    >
                      {isAuditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
                      <span>{isAuditing ? 'Auditing...' : 'Run Selected Audit'}</span>
                    </button>
                  </div>
                </div>

                {/* 6 Audit Dimension Tabs */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1 border-b border-panel-border/30 pb-4">
                  {[
                    { id: 'security', label: '🛡️ Security & Compliance', desc: 'GxP, HIPAA, SOC 2' },
                    { id: 'visual', label: '🎨 Visual & Collision', desc: 'Overlaps & Text Slicing' },
                    { id: 'topology', label: '⚡ Cloud Topology', desc: 'Well-Architected & Ingress' },
                    { id: 'responsive', label: '📱 Responsive & Aspect Ratio', desc: '16:9, 4:3, 9:16 Fit' },
                    { id: 'accessibility', label: '♿ WCAG Accessibility', desc: 'Contrast Ratio & Colorblind' },
                    { id: 'vendor', label: '🏷️ Vendor Icon Coverage', desc: 'Official Brand Logos' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedAuditCategory(cat.id as any);
                        handleAuditDiagram(cat.id);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedAuditCategory === cat.id
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50 shadow-md shadow-teal-950/40'
                          : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* Audit Version Delta Comparison Card */}
                {showAuditDelta && auditHistory.length > 1 && (
                  <div className="glass-panel border-purple-500/30 rounded-3xl p-6 bg-purple-950/20 space-y-4 animate-fade-in border">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <h4 className="text-sm font-black text-white">Audit Version Delta (v{auditHistory[1]?.version_number} ➔ v{auditHistory[0]?.version_number})</h4>
                      </div>
                      <span className="text-xs font-black text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                        Score Delta: +{auditHistory[0]?.score - auditHistory[1]?.score}% Improvement
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                        <span className="font-extrabold text-slate-400 block">Baseline Version (v{auditHistory[1]?.version_number})</span>
                        <span className="text-sm font-bold text-amber-300 block">Score: {auditHistory[1]?.score}%</span>
                        <p className="text-slate-400 mt-1">Identified initial infrastructure security risks and missing ingress/database controls.</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900/60 border border-teal-500/30 space-y-1">
                        <span className="font-extrabold text-teal-400 block">Remediated Version (v{auditHistory[0]?.version_number})</span>
                        <span className="text-sm font-bold text-emerald-400 block">Score: {auditHistory[0]?.score}% (100% Remediated)</span>
                        <p className="text-slate-300 mt-1">Gemini auto-injected WAF security policies, CMEK encryption, and multi-region HA replicas.</p>
                      </div>
                    </div>
                  </div>
                )}

                {auditReport ? (
                  <div className="glass-panel border-panel-border/40 rounded-3xl p-8 space-y-8 shadow-2xl">
                    
                    {/* Compliance Score Header */}
                    <div className="flex items-center gap-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                      <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center font-black text-xl shrink-0 shadow-lg ${
                        auditScore >= 90
                          ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 shadow-emerald-500/20'
                          : auditScore >= 75
                          ? 'border-teal-accent text-teal-accent bg-teal-500/10 shadow-teal-500/20'
                          : 'border-amber-400 text-amber-400 bg-amber-500/10 shadow-amber-500/20'
                      }`}>
                        {auditScore}%
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                            auditScore >= 90 ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                          }`}>
                            {auditScore >= 90 ? 'Grade: Excellent' : auditScore >= 75 ? 'Grade: Good' : 'Grade: Needs Hardening'}
                          </span>
                          <span className="text-xs text-slate-400">{auditGaps.length} Gaps Detected</span>
                        </div>
                        <h4 className="text-xl font-black text-white mt-1">Architecture Security & Compliance Audit</h4>
                        <p className="text-xs text-slate-400 mt-1">Select the gaps below to automatically remediate missing security nodes in your diagram.</p>
                      </div>
                    </div>

                    {/* Interactive Security Gaps Remediation Checklist */}
                    {auditGaps.length > 0 ? (
                      <div className="space-y-4 border-t border-panel-border/30 pt-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-amber-400" />
                            <span>Actionable Remediation Checklist ({auditGaps.length})</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              if (selectedGapIds.length === auditGaps.length) {
                                setSelectedGapIds([]);
                              } else {
                                setSelectedGapIds(auditGaps.map(g => g.id));
                              }
                            }}
                            className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                          >
                            {selectedGapIds.length === auditGaps.length ? 'Deselect All' : 'Select All Gaps'}
                          </button>
                        </div>

                        <div className="space-y-3">
                          {auditGaps.map((gap) => {
                            const isChecked = selectedGapIds.includes(gap.id);
                            return (
                              <div
                                key={gap.id}
                                onClick={() => {
                                  if (isChecked) {
                                    setSelectedGapIds(selectedGapIds.filter(id => id !== gap.id));
                                  } else {
                                    setSelectedGapIds([...selectedGapIds, gap.id]);
                                  }
                                }}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                                  isChecked
                                    ? 'bg-teal-500/10 border-teal-500/40 text-white shadow-lg shadow-teal-500/5'
                                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {}}
                                  className="mt-1 w-4 h-4 rounded border-slate-700 text-teal-400 focus:ring-teal-400/30 bg-slate-950 cursor-pointer"
                                />
                                <div className="flex-1 space-y-1.5">
                                  <div className="flex items-center justify-between gap-3">
                                    <h4 className="text-sm font-extrabold text-white">{gap.title}</h4>
                                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                                      gap.severity === 'HIGH'
                                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                        : gap.severity === 'MEDIUM'
                                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                    }`}>
                                      {gap.severity} RISK
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-300 leading-relaxed">{gap.description}</p>
                                  <div className="text-xs font-semibold text-teal-300 bg-teal-500/5 border border-teal-500/10 rounded-xl p-3 flex items-center gap-2 mt-2">
                                    <Sparkles className="w-4 h-4 text-teal-accent shrink-0" />
                                    <span>Proposed Fix: {gap.remediation}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Remediate Button Banner */}
                        <div className="pt-4 flex items-center justify-between bg-slate-900/80 p-5 rounded-2xl border border-teal-500/30">
                          <div>
                            <span className="text-sm font-extrabold text-white block">Auto-Remediate Selected Gaps</span>
                            <span className="text-xs text-slate-400 mt-0.5 block">Gemini will add missing security components & save a new version.</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemediateGaps}
                            disabled={selectedGapIds.length === 0 || isRemediating}
                            className="px-6 py-3.5 rounded-xl bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 font-black text-sm transition-all shadow-xl shadow-teal-500/20 hover:scale-[1.02] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isRemediating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            <span>Fix Selected Gaps ({selectedGapIds.length})</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-bold flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                        <span>All security & reliability gaps have been remediated! Architecture score is 100%.</span>
                      </div>
                    )}
                    
                    {/* Full Audit Report Narrative */}
                    <div className="text-sm text-slate-300 space-y-3 border-t border-panel-border/30 pt-6 max-h-[450px] overflow-y-auto pr-3 leading-relaxed">
                      <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">Detailed Security Findings</h3>
                      {renderAuditMarkdown(auditReport)}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-fade-in">
                    {/* Pre-Flight Inspection Hero Card */}
                    <div className="glass-panel p-8 md:p-10 rounded-3xl border border-teal-500/30 bg-gradient-to-r from-teal-950/30 via-slate-900/70 to-purple-950/20 relative overflow-hidden shadow-2xl space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div className="space-y-2.5 max-w-2xl">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-black uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                            <span>Pre-Audit Architecture Scan Ready</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                            Security Inspection: {activeDiagram.name}
                          </h3>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            Run deep AI security audit on <strong className="text-white">{activeDiagram.name}</strong> to evaluate node topology, public ingress points, encryption protocols, and CIS / NIST policy compliance.
                          </p>
                        </div>

                        <button
                          onClick={() => handleAuditDiagram()}
                          disabled={isAuditing}
                          className="px-7 py-3.5 rounded-2xl text-xs md:text-sm font-black bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 hover:from-teal-300 hover:to-emerald-300 text-slate-950 shadow-xl shadow-teal-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer shrink-0 disabled:opacity-50 hover:scale-[1.02]"
                        >
                          {isAuditing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                              <span>Analyzing Architecture Topology...</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-5 h-5 text-slate-950" />
                              <span>Run AI Security Audit Now</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Pre-Audit Readiness Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="glass-panel p-6 rounded-2xl border border-panel-border/40 bg-slate-900/40 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-extrabold text-white">Topology Pre-flight</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Parses raw diagram graph nodes to detect compute instances, databases, and network edge routers.
                        </p>
                      </div>

                      <div className="glass-panel p-6 rounded-2xl border border-panel-border/40 bg-slate-900/40 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-extrabold text-white">CIS & NIST Policy Rules</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Evaluates architecture against CIS AWS/GCP Foundations & NIST SP 800-53 security controls.
                        </p>
                      </div>

                      <div className="glass-panel p-6 rounded-2xl border border-panel-border/40 bg-slate-900/40 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-extrabold text-white">AI Remediation Engine</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Generates interactive fix checklists with one-click node injection back into the architecture editor.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 px-6 max-w-xl mx-auto glass-panel border border-slate-800/80 rounded-3xl p-10 space-y-6 shadow-2xl bg-gradient-to-b from-[#0e1628] to-[#090d16]">
                <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto shadow-inner">
                  <ShieldCheck className="w-10 h-10 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">Select Architecture Diagram</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                    Choose a diagram from the left panel directory to run automated security vulnerability audits and policy compliance reports.
                  </p>
                </div>
                {diagrams.length > 0 && (
                  <button
                    onClick={() => loadDiagramDetails(diagrams[0].id)}
                    className="px-6 py-3 rounded-xl text-xs font-black bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-lg shadow-teal-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-slate-950" />
                    <span>Audit Most Recent Diagram ({diagrams[0].name})</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsView = () => {
    const isRoot = currentUser?.email?.toLowerCase() === 'vibeandcode.ai@gmail.com' || currentUser?.email?.toLowerCase() === 'nitinaggarwal12@gmail.com' || (currentUser as any)?.is_super_admin;

    return (
      <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-bg-dark select-none animate-fade-in font-sans">
        <div className="max-w-8xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-panel-border/40 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-extrabold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-accent" />
                <span>Security Governance & Config Hub</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Settings & Security Governance</h1>
              <p className="text-sm md:text-base text-slate-400 mt-1">Manage user access control, security policies, authentication engines, and AI compiler configurations.</p>
            </div>
            {isRoot && (
              <Link
                href="/admin"
                className="px-6 py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Open System Admin Directory</span>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card 1: User Identity & Access Governance */}
            <div className="glass-panel border-panel-border/60 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-black text-white border-b border-panel-border/40 pb-4 flex items-center gap-3">
                <User className="w-5 h-5 text-teal-accent" />
                <span>User Identity & Access Governance</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Authenticated Account</span>
                    <span className="text-base font-black text-white mt-0.5 block">{currentUser?.email || 'Guest Session'}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                    {(currentUser as any)?.global_role || 'Admin'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 block">Global Role Clearance</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">
                      {isRoot ? 'Admin (Full Clearance)' : ((currentUser as any)?.global_role || 'Admin')}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 block">Root System Status</span>
                    <span className={`text-sm font-extrabold mt-1 block ${isRoot ? 'text-amber-400' : 'text-slate-300'}`}>
                      {isRoot ? '⚡ Root Administrator' : 'Standard Author'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                  <span className="text-xs font-bold text-slate-400 block">Active Personal Workspace</span>
                  <span className="text-sm font-bold text-teal-300 mt-1 block font-mono">
                    Personal Workspace ({currentUser?.id ? `id: ${currentUser.id.substring(0, 8)}...` : 'Active'})
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Passwordless Magic Link & Security Policy */}
            <div className="glass-panel border-panel-border/60 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-black text-white border-b border-panel-border/40 pb-4 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-accent" />
                <span>Passwordless Magic Link & Security Policy</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Authentication Engine</span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">Passwordless Magic Links + JWT Session</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 block">Token Expiration (TTL)</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">15 Minutes (Single-Use)</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 block">SMTP Email Transport</span>
                    <span className="text-sm font-extrabold text-emerald-400 mt-1 block truncate" title="vibeandcode.ai@gmail.com">
                      vibeandcode.ai@gmail.com
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                  <span className="text-xs font-bold text-slate-400 block">Session Cookie Security</span>
                  <span className="text-sm font-bold text-slate-200 mt-1 block">
                    HttpOnly Cookie (`promptcanvas_session`), SameSite=Lax, PBKDF2 Password Hashing
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Multi-Tenant Workspace & RLS Waterfall */}
            <div className="glass-panel border-panel-border/60 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-black text-white border-b border-panel-border/40 pb-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>Multi-Tenant Workspace & Waterfall RLS</span>
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Row Level Security (RLS) Policy</span>
                    <span className="text-xs font-extrabold text-teal-400">Waterfall Enforcement</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Access control filters diagram queries by workspace ownership and membership (`Owner`, `Editor`, `Viewer`). Root admin credentials bypass workspace isolation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 block">Personal Workspaces</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">Private (Owner Only)</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 block">Team Shared Workspaces</span>
                    <span className="text-sm font-extrabold text-indigo-300 mt-1 block">Role-Based Member Access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: AI Model & Database Infrastructure */}
            <div className="glass-panel border-panel-border/60 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-black text-white border-b border-panel-border/40 pb-4 flex items-center gap-3">
                <Cpu className="w-5 h-5 text-teal-accent" />
                <span>AI Compiler & Infrastructure Telemetry</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Active LLM Architecture Engine</span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">Gemini 2.5 Flash (Google AI)</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    Connected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 block">Database Storage</span>
                    <span className="text-sm font-extrabold text-white mt-1 block truncate" title="/Users/nitinagga/.gemini/jetski/dev.db">
                      SQLite Local (`dev.db`)
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 block">Database Health</span>
                    <span className="text-sm font-extrabold text-emerald-400 mt-1 block">Healthy (Online)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  // --- UI Helpers ---
  const renderEmptyWorkspaceDashboard = () => {
    return (
      <div className="w-full h-full overflow-y-auto py-12 px-6 md:py-16 relative bg-gradient-to-b from-[#070b12] to-[#030509] select-none">
        {/* Subtle Tech Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(20, 184, 166, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(20, 184, 166, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Glowing Radial Background lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1600px] mx-auto space-y-12 z-10 relative">
          
          {/* Top Row: Welcome Header & Start from Scratch Card (Horizontal) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-slate-900/30 border border-panel-border/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="lg:col-span-2 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-teal-accent uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Architecture Compiler</span>
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                Design Systems <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-accent via-cyan-400 to-indigo-400">
                  With Pure Intent.
                </span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl pt-1">
                Translate complex system descriptions into production-grade interactive architecture diagrams. Formatted for compliance, version-controlled, and instantly editable.
              </p>
            </div>

            {/* Launch Card (Horizontal on right side of hero) */}
            <div className="glass-panel border-panel-border/60 hover:border-teal-500/40 rounded-xl p-5 flex flex-col justify-between h-full hover:scale-[1.01] transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-accent border border-teal-500/20 shrink-0">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Start from Scratch</h4>
                  <p className="text-[10px] text-slate-400 leading-tight">Initialize a clean slate workspace.</p>
                </div>
              </div>
              <button
                onClick={openCreateModal}
                className="w-full mt-4 py-2.5 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                Create New Canvas
              </button>
            </div>
          </div>

          {/* Bottom Row: Quick Start Presets (Horizontal Grid) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <LayoutGrid className="w-3.5 h-3.5 text-teal-accent" />
                <span>Bootstrap with a Quick Start Template</span>
              </h4>
              <button
                type="button"
                onClick={() => setCurrentTab('templates')}
                className="text-xs font-bold text-teal-300 hover:text-white bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEMPLATE_PROMPTS.slice(1).map((t, idx) => {
                const isAws = t.name.includes('AWS');
                const isGcp = t.name.includes('GCP');
                const provider = isAws ? 'AWS' : isGcp ? 'GCP' : 'DevOps';
                const providerColor = isAws 
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                  : isGcp 
                    ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' 
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';

                return (
                  <div 
                    key={idx} 
                    className="glass-panel border-panel-border/60 hover:border-teal-500/30 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:scale-[1.01] hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${providerColor}`}>
                          {provider}
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-teal-accent/30 group-hover:text-teal-accent transition-colors" />
                      </div>
                      <h3 className="font-bold text-xs text-white group-hover:text-teal-accent transition-colors mb-2 leading-snug">
                        {t.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {t.prompt}
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        setNewDiagramName(t.name);
                        setNewDiagramPrompt(t.prompt);
                        setSelectedTemplate((idx + 1).toString());
                        setGeneratingTemplateIdx(idx);
                        try {
                          const res = await fetch('/api/generate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              name: t.name,
                              prompt: t.prompt
                            })
                          });
                          if (!res.ok) throw new Error('Failed to generate template');
                          const data = await res.json();
                          await fetchDiagrams();
                          await loadDiagramDetails(data.diagram.id);
                        } catch (err) {
                          console.error(err);
                          alert('Error launching preset');
                        } finally {
                          setGeneratingTemplateIdx(null);
                        }
                      }}
                      disabled={generatingTemplateIdx !== null}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-teal-accent text-slate-300 hover:text-bg-dark text-[10px] uppercase tracking-wider font-bold transition-all border border-slate-700/60 hover:border-transparent flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {generatingTemplateIdx === idx ? <Loader2 className="w-3 h-3 animate-spin" /> : (
                        <>
                          <span>Launch Preset</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  };

  const displayedVersion = previewVersion || activeVersion;

  const currentXmlToRender = React.useMemo(() => {
    const baseXml = displayedVersion?.xml_content || '';
    if (!baseXml) return '';

    let formattedXml = baseXml;
    const hasAspectRatio = Boolean(selectedAspectRatio);

    if (layoutPreset === 'vendor') {
      formattedXml = createVendorIconsVariant(baseXml);
    } else if (layoutPreset === 'clean') {
      const { cleanedXml } = createMinimalistCleanVariant(baseXml);
      formattedXml = cleanedXml;
    } else {
      formattedXml = restoreDetailedView(baseXml, hasAspectRatio);
    }

    // Apply Aspect Ratio Node Re-organization ON TOP of active view format!
    if (selectedAspectRatio) {
      formattedXml = rearrangeDiagramForAspectRatio(
        formattedXml,
        selectedAspectRatio,
        customRatioW,
        customRatioH
      );
    }

    return formattedXml;
  }, [displayedVersion, layoutPreset, selectedAspectRatio, customRatioW, customRatioH]);

  // Sync active version XML to ref (respecting active view layout: Detailed View vs Clean View)
  useEffect(() => {
    if (currentXmlToRender) {
      activeXmlRef.current = currentXmlToRender;
    }
  }, [currentXmlToRender]);

  const renderVersionDropdown = (customId?: string) => {
    const versionsDesc = activeDiagram?.versions
      ? [...activeDiagram.versions].sort((a, b) => b.version_number - a.version_number)
      : [];

    if (versionsDesc.length === 0) return null;

    const activeLatestId = versionsDesc[0]?.id;

    return (
      <div className="relative inline-flex items-center">
        <select
          id={customId || "workspace-version-dropdown"}
          value={displayedVersion?.id || activeLatestId}
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId === activeLatestId) {
              setPreviewVersion(null);
            } else {
              const match = versionsDesc.find((v) => v.id === selectedId);
              if (match) setPreviewVersion(match);
            }
          }}
          className="appearance-none bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/40 hover:border-teal-400 text-teal-300 font-extrabold text-xs rounded-lg pl-3 pr-7 py-1 outline-none cursor-pointer transition-all shadow-sm focus:ring-2 focus:ring-teal-400/30"
        >
          {versionsDesc.map((v, idx) => {
            const isLatest = idx === 0;
            const label = isLatest ? `Version ${v.version_number} (Latest)` : `Version ${v.version_number}`;
            return (
              <option key={v.id} value={v.id} className="bg-[#0b101d] text-white py-1 font-semibold">
                {label}
              </option>
            );
          })}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-teal-400 absolute right-2 pointer-events-none" />
      </div>
    );
  };

  if (restrictedState) {
    return (
      <>
        <AccessRestrictedScreen
          diagramId={restrictedState.diagramId}
          diagramName={restrictedState.diagramName}
          pendingRequest={restrictedState.pendingRequest}
          onAccessRequested={(req) => {
            setRestrictedState((prev) => (prev ? { ...prev, pendingRequest: req } : null));
          }}
          onOpenAuth={() => setIsAuthOpen(true)}
          isAuthenticated={!!currentUser}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(u) => {
            setCurrentUser(u);
            setIsAuthOpen(false);
            loadDiagramDetails(restrictedState.diagramId);
          }}
        />
      </>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-bg-dark text-slate-100 overflow-hidden font-sans">
      
      {/* Unified Sidebar Navigation & Library */}
      <aside 
        className={`glass-panel border-r border-panel-border flex flex-col transition-all duration-300 z-20 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-panel-border shrink-0">
          {isSidebarOpen ? (
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Sparkles className="w-5 h-5 text-teal-accent" />
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-teal-accent to-cyan-400 bg-clip-text text-transparent">
                PROMPT CANVAS
              </span>
            </Link>
          ) : (
            <Link href="/">
              <Sparkles className="w-5 h-5 text-teal-accent mx-auto hover:opacity-90 transition-opacity" />
            </Link>
          )}
          {isSidebarOpen && (
            <button 
              id="collapse-sidebar-btn"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tab Navigation Menu */}
        <div className="p-3 space-y-1 shrink-0">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
            { id: 'editor', name: 'Design Canvas', icon: Network },
            { id: 'templates', name: 'Templates Gallery', icon: LayoutGrid },
            { id: 'walkthrough', name: 'Visual Walkthrough', icon: BookOpen },
            { id: 'audit', name: 'Security Audit Hub', icon: ShieldAlert },
            { id: 'settings', name: 'Settings & Config', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            const buttonContent = (
              <div className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                isActive 
                  ? 'bg-teal-accent text-bg-dark font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-hover/40'
              }`}>
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {isSidebarOpen && <span className="truncate">{item.name}</span>}
              </div>
            );

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className="block">
                  {buttonContent}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  const newTab = item.id as 'editor' | 'templates' | 'audit' | 'settings' | 'walkthrough';
                  setCurrentTab(newTab);
                  if (typeof window !== 'undefined') {
                    const params = new URLSearchParams(window.location.search);
                    if (newTab === 'editor') {
                      params.delete('tab');
                    } else {
                      params.set('tab', newTab);
                    }
                    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
                    window.history.replaceState({}, '', newUrl);
                  }
                  if (!isSidebarOpen) setIsSidebarOpen(true);
                }}
                className="w-full text-left block"
              >
                {buttonContent}
              </button>
            );
          })}
        </div>

        <div className="border-t border-panel-border/30 my-1 shrink-0" />

        {currentTab === 'editor' && (
          <>
            {/* New Diagram Button */}
            <div className="p-3 shrink-0 flex gap-2">
              <button
                id="new-diagram-btn"
                onClick={openCreateModal}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold transition-all glow-teal-hover text-xs cursor-pointer ${
                  !isSidebarOpen && 'p-2'
                }`}
              >
                <Plus className="w-4 h-4" />
                {isSidebarOpen && <span>New</span>}
              </button>

              {isSidebarOpen && (
                <button
                  id="import-diagram-btn"
                  onClick={() => setIsImportModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-teal-300 font-bold transition-all text-xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-teal-accent" />
                  <span>Import</span>
                </button>
              )}
            </div>

        {/* Search Bar */}
        {isSidebarOpen && (
          <div className="px-3 mb-2">
            <div className="relative">
              <input
                type="text"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                placeholder="Search diagrams..."
                className="w-full bg-bg-dark border border-panel-border/80 focus:border-teal-accent rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
              {sidebarSearch && (
                <button
                  onClick={() => setSidebarSearch('')}
                  className="absolute right-2 top-2 p-0.5 rounded text-slate-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Diagram List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-4">
          {isLoadingDiagrams ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-teal-accent" />
            </div>
          ) : filteredSidebarDiagrams.length === 0 ? (
            isSidebarOpen && (
              <p className="text-xs text-slate-500 text-center py-8">No matching diagrams found.</p>
            )
          ) : (
            <div className="space-y-4">
              {/* Recent Designs */}
              <div className="space-y-1">
                {isSidebarOpen && (
                  <h4 className="px-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Recent Designs
                  </h4>
                )}
                {recentDiagrams.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => loadDiagramDetails(d.id)}
                    className={`group flex flex-col p-2 rounded-lg cursor-pointer transition-all border ${
                      activeDiagram?.id === d.id 
                        ? 'bg-teal-glow/10 text-teal-accent border-teal-accent/30 shadow-sm' 
                        : 'hover:bg-slate-hover/40 text-slate-300 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className={`w-3.5 h-3.5 shrink-0 ${
                          activeDiagram?.id === d.id 
                            ? 'text-teal-accent' 
                            : d.name.toLowerCase().includes('aws')
                              ? 'text-amber-400'
                              : d.name.toLowerCase().includes('gcp')
                                ? 'text-teal-400'
                                : 'text-slate-400'
                        }`} />
                        {isSidebarOpen && (
                          <span className="text-xs font-semibold truncate leading-tight">{d.name}</span>
                        )}
                      </div>
                      {isSidebarOpen && (
                        <button
                          onClick={(e) => handleDeleteDiagram(d.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    {isSidebarOpen && (
                      <div className="flex items-center gap-1.5 pl-[22px] mt-0.5 text-[10px] text-slate-500">
                        <span suppressHydrationWarning>{formatRelativeTime(d.updated_at)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Archive Section */}
              {isSidebarOpen && archiveDiagrams.length > 0 && (
                <div className="border-t border-panel-border/30 pt-2">
                  <button
                    onClick={() => setIsArchiveOpen(!isArchiveOpen)}
                    className="w-full flex items-center justify-between px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider hover:text-white transition-colors"
                  >
                    <span>Older Designs ({archiveDiagrams.length})</span>
                    {isArchiveOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  {isArchiveOpen && (
                    <div className="space-y-1 mt-1.5">
                      {archiveDiagrams.map((d) => (
                        <div
                          key={d.id}
                          onClick={() => loadDiagramDetails(d.id)}
                          className={`group flex flex-col p-2 rounded-lg cursor-pointer transition-all border ${
                            activeDiagram?.id === d.id 
                              ? 'bg-teal-glow/10 text-teal-accent border-teal-accent/30 shadow-sm' 
                              : 'hover:bg-slate-hover/40 text-slate-300 border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText className={`w-3.5 h-3.5 shrink-0 ${
                                activeDiagram?.id === d.id 
                                  ? 'text-teal-accent' 
                                  : d.name.toLowerCase().includes('aws')
                                    ? 'text-amber-400'
                                    : d.name.toLowerCase().includes('gcp')
                                      ? 'text-teal-400'
                                      : 'text-slate-400'
                              }`} />
                              <span className="text-xs font-semibold truncate leading-tight">{d.name}</span>
                            </div>
                            <button
                              onClick={(e) => handleDeleteDiagram(d.id, e)}
                              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1.5 pl-[22px] mt-0.5 text-[10px] text-slate-500">
                            <span suppressHydrationWarning>{formatRelativeTime(d.updated_at)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
          </>
        )}
        
        {/* Toggle Expand Sidebar */}
        {!isSidebarOpen && (
          <div className="p-3 border-t border-panel-border flex justify-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 rounded hover:bg-slate-hover text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* 2. MAIN WORKSPACE: Split Pane */}
      {currentTab === 'editor' && (
        <main className="flex-1 flex flex-col min-w-0 h-full">
          {!activeDiagram ? (
          renderEmptyWorkspaceDashboard()
        ) : (
          <>
            {/* Top Navbar */}
            <header className="h-16 border-b border-panel-border flex items-center justify-between px-6 bg-panel-dark/50 backdrop-blur">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle if collapsed */}
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 rounded hover:bg-slate-hover text-slate-400"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-3 shrink-0 max-w-[420px]">
              <h2 className="font-bold text-base text-white whitespace-nowrap truncate max-w-[220px]" title={activeDiagram ? activeDiagram.name : ''}>
                {activeDiagram ? activeDiagram.name : 'Select or Create a Diagram'}
              </h2>
              {activeDiagram && activeVersion && (
                <div className="flex items-center gap-2 shrink-0">
                  {renderVersionDropdown("top-header-version-dropdown")}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions (only if diagram active) */}
          <div className="flex items-center gap-2 shrink-0">
            <AccessRequestsInbox user={currentUser} />
            {activeDiagram && (
              <>
                <DiagramFeedbackWidget diagramId={activeDiagram.id} versionId={displayedVersion?.id} />
                
                {/* ☀️/🌙 Dark vs Light Canvas Theme Toggle */}
                <button
                  id="canvas-theme-toggle"
                  onClick={() => setCanvasTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                  title={`Switch to ${canvasTheme === 'dark' ? 'Light' : 'Dark'} Canvas Theme`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-panel-border hover:border-teal-500/40 bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
                >
                  {canvasTheme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Dark Theme</span>
                    </>
                  )}
                </button>

                {/* 1. View & Perspective Dropdown */}
                <div className="relative inline-flex items-center shrink-0 w-[185px]">
                  <select
                    id="view-mode-selector"
                    value={`${viewMode}:${layoutPreset}`}
                    onChange={(e) => {
                      const [vMode, lPreset] = e.target.value.split(':');
                      if (vMode && lPreset) {
                        setViewMode(vMode as 'canvas' | 'outline' | 'business' | 'technical');
                        setLayoutPreset(lPreset as 'detailed' | 'clean' | 'vendor');
                        if (isInlineEditorOpen) setIsInlineEditorOpen(false);
                      }
                    }}
                    className="appearance-none bg-slate-900/90 hover:bg-slate-800/90 border border-panel-border hover:border-teal-500/40 text-slate-200 font-bold text-xs rounded-lg pl-2.5 pr-6 py-1.5 outline-none cursor-pointer transition-all shadow-sm focus:ring-2 focus:ring-teal-400/30 w-[185px] truncate"
                  >
                    <option value="canvas:detailed" className="bg-[#0b101d] text-slate-200 py-1 font-bold">
                      📐 2D Canvas — Detailed View
                    </option>
                    <option value="canvas:clean" className="bg-[#0b101d] text-teal-300 py-1 font-bold">
                      ✨ 2D Canvas — Option 2: Clean View
                    </option>
                    <option value="canvas:vendor" className="bg-[#0b101d] text-cyan-300 py-1 font-bold">
                      🏷️ 2D Canvas — Option 3: Vendor Icons
                    </option>
                    <option value="outline:detailed" className="bg-[#0b101d] text-slate-200 py-1 font-bold">
                      🌳 Structural Tree & Node Outline
                    </option>
                    <option value="business:detailed" className="bg-[#0b101d] text-slate-200 py-1 font-bold">
                      💼 Business Use Case Brief
                    </option>
                    <option value="technical:detailed" className="bg-[#0b101d] text-slate-200 py-1 font-bold">
                      ⚙️ Technical Integration Walkthrough
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-teal-400 absolute right-2 pointer-events-none" />
                </div>

                {/* 2. Edit Options Dropdown */}
                <div className="relative inline-flex items-center shrink-0 w-[135px]">
                  <select
                    value=""
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'inline') {
                        setIsInlineEditorOpen(true);
                      } else if (val === 'newtab') {
                        openInNewTab();
                      }
                    }}
                    className="appearance-none bg-slate-900/90 hover:bg-slate-800/90 border border-panel-border hover:border-teal-500/40 text-slate-200 font-bold text-xs rounded-lg pl-2.5 pr-6 py-1.5 outline-none cursor-pointer transition-all shadow-sm focus:ring-2 focus:ring-teal-400/30 w-[135px] truncate"
                  >
                    <option value="" disabled className="bg-[#0b101d] text-slate-400 py-1 font-bold">
                      ✏️ Edit Options ▾
                    </option>
                    <option value="inline" className="bg-[#0b101d] text-slate-200 py-1 font-bold">
                      ✏️ Edit Diagram Inline
                    </option>
                    <option value="newtab" className="bg-[#0b101d] text-slate-200 py-1 font-bold">
                      ↗️ Open Editor in New Tab
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-teal-400 absolute right-2 pointer-events-none" />
                </div>

                {/* 2b. Aspect Ratio & Auto-Organization Selector */}
                <div className="relative inline-flex items-center shrink-0">
                  <AspectRatioSelector
                    selectedRatio={selectedAspectRatio}
                    customWidth={customRatioW}
                    customHeight={customRatioH}
                    onChangeRatio={handleAspectRatioChange}
                  />
                </div>

                {/* 3. Exporters Dropdown */}
                <div className="relative inline-flex items-center shrink-0 w-[130px]">
                  <select
                    value=""
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'terraform') {
                        setIsTerraformModalOpen(true);
                      } else if (val === 'slides') {
                        setIsExportModalOpen(true);
                      }
                    }}
                    className="appearance-none bg-slate-900/90 hover:bg-slate-800/90 border border-panel-border hover:border-teal-500/40 text-teal-300 font-bold text-xs rounded-lg pl-2.5 pr-6 py-1.5 outline-none cursor-pointer transition-all shadow-sm focus:ring-2 focus:ring-teal-400/30 w-[130px] truncate"
                  >
                    <option value="" disabled className="bg-[#0b101d] text-slate-400 py-1 font-bold">
                      📥 Export ▾
                    </option>
                    <option value="terraform" className="bg-[#0b101d] text-teal-300 py-1 font-bold">
                      📦 Export GCP Terraform Code (.tf)
                    </option>
                    <option value="slides" className="bg-[#0b101d] text-purple-300 py-1 font-bold">
                      📊 Export Presentation Deck & Files (PPTX, PDF, PNG, XML)
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-teal-400 absolute right-2 pointer-events-none" />
                </div>

                {/* 4. Audit Security Primary CTA */}
                <button
                  id="audit-diagram-btn"
                  onClick={() => handleAuditDiagram()}
                  disabled={isAuditing}
                  className={getTourClass(tourStep, 6, "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-500/50 bg-teal-500/15 hover:bg-teal-500/25 text-xs font-black transition-all text-teal-accent cursor-pointer shadow-sm disabled:opacity-50 shrink-0")}
                >
                  {isAuditing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Shield className="w-3.5 h-3.5" />
                  )}
                  <span>{isAuditing ? 'Auditing...' : 'Audit Security'}</span>
                </button>
                <button
                  id="header-contact-us-btn"
                  onClick={() => setIsContactOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-panel-border hover:bg-slate-hover text-xs font-medium transition-all text-slate-300 hover:text-white cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-accent" />
                  <span>Contact Us</span>
                </button>
              </>
            )}
          </div>
        </header>

        {/* Workspace Body: Split Pane */}
        <div className="flex-1 flex min-h-0 relative">
          
          {/* A. LEFT PANE: Chat & Prompt Panel */}
          <section 
            id="tour-ai-panel"
            className={getTourClass(tourStep, 3, "w-80 border-r border-panel-border flex flex-col bg-panel-dark/30 h-full max-h-full shrink-0 overflow-hidden")}
          >
            {/* Panel Title */}
            <div className="p-3 border-b border-panel-border flex items-center justify-between bg-panel-dark/20 shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">AI Architect Assistant</span>
              </div>
            </div>

            {/* Scrollable Upper Section: Version Details, Prompt Applied, Audit Trail & Chat History */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
              {/* Selected Version Details & Prompt Card */}
              {activeDiagram && displayedVersion && (
                <div className="p-4 border-b border-panel-border bg-slate-900/40 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-teal-accent">Version {displayedVersion.version_number}</span>
                    <span className="text-[10px] text-slate-500 shrink-0">
                      {new Date(displayedVersion.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} at {new Date(displayedVersion.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Change Description</span>
                    <p className="text-xs text-slate-300 leading-normal bg-bg-dark/40 px-2 py-1.5 rounded border border-panel-border/30">
                      {displayedVersion.comment || 'Initial version'}
                    </p>
                  </div>

                  {displayedVersion.prompt && (
                    <div className="space-y-1">
                      <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Prompt Applied</span>
                      <p className="text-xs text-slate-300 bg-[#090d16] border border-panel-border/30 rounded p-2 italic leading-relaxed max-h-24 overflow-y-auto select-text font-sans scrollbar-thin">
                        &ldquo;{displayedVersion.prompt}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Audit Trail of Changes */}
                  {(() => {
                    const sorted = activeDiagram?.versions
                      ?.slice()
                      .sort((a, b) => a.version_number - b.version_number) || [];
                    const curIdx = sorted.findIndex(v => v.id === displayedVersion.id);
                    const parent = curIdx > 0 ? sorted[curIdx - 1] : null;

                    const diff = parent 
                      ? computeVersionDiff(displayedVersion.xml_content, parent.xml_content)
                      : { added: parseXmlNodesAndEdges(displayedVersion.xml_content).map(i => i.isEdge ? `Connection` : i.label), removed: [], modified: [] };

                    const hasChanges = diff.added.length > 0 || diff.removed.length > 0 || diff.modified.length > 0;

                    return (
                      <div className="space-y-1.5 pt-2 border-t border-panel-border/30">
                        <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Audit Trail (Components Changes)</span>
                        {!hasChanges ? (
                          <p className="text-[10px] text-slate-500 italic">No structural changes detected.</p>
                        ) : (
                          <div className="space-y-1 max-h-28 overflow-y-auto pr-1 bg-bg-dark/40 p-2 rounded border border-panel-border/30 font-mono text-[9px]">
                            {diff.added.map((item, i) => (
                              <div key={`add-${i}`} className="flex items-start gap-1.5 text-emerald-400 font-medium">
                                <span className="text-emerald-500 font-extrabold shrink-0">+</span>
                                <span>Added {item}</span>
                              </div>
                            ))}
                            {diff.modified.map((item, i) => (
                              <div key={`mod-${i}`} className="flex items-start gap-1.5 text-amber-400 font-medium">
                                <span className="text-amber-500 font-extrabold shrink-0">~</span>
                                <span>{item}</span>
                              </div>
                            ))}
                            {diff.removed.map((item, i) => (
                              <div key={`rem-${i}`} className="flex items-start gap-1.5 text-rose-400 font-medium">
                                <span className="text-rose-500 font-extrabold shrink-0">-</span>
                                <span className="line-through opacity-70">Removed {item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <div className="pt-2 flex gap-1.5">
                    {displayedVersion.ai_reasoning && (
                      <button
                        onClick={() => {
                          setInspectVersion(displayedVersion);
                          setIsInspectModalOpen(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-[9px] font-bold transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Inspect Plan</span>
                      </button>
                    )}
                    
                    {previewVersion && (
                      <button
                        onClick={() => handleRestoreVersion(previewVersion)}
                        className="flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded bg-teal-accent hover:bg-teal-hover text-bg-dark text-[9px] font-bold transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restore version</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="p-4 space-y-4">
                {!activeDiagram ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center p-4">
                    <Sparkles className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-sm text-slate-500">Select a diagram from the sidebar to start designing with AI.</p>
                  </div>
                ) : chatMessages.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center p-4">
                    <MessageSquare className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-sm text-slate-500">Ask the AI to generate your first architecture diagram!</p>
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      <div className={`p-3 rounded-lg text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-teal-accent text-bg-dark font-medium rounded-tr-none'
                          : 'bg-slate-hover text-slate-100 rounded-tl-none border border-panel-border'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 px-1">
                        {msg.timestamp} {msg.versionNumber && `• v${msg.versionNumber}`}
                      </span>
                    </div>
                  ))
                )}
                {isGenerating && (
                  <div className="flex items-center gap-2 mr-auto bg-slate-hover/50 border border-panel-border p-3 rounded-lg rounded-tl-none max-w-[85%]">
                    <Loader2 className="w-4 h-4 animate-spin text-teal-accent" />
                    <span className="text-xs text-slate-400 animate-pulse">PromptCanvas-Graph is sketching...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Always-Pinned Sticky Bottom Prompt Input Form */}
            <div className="p-3 border-t border-panel-border bg-panel-dark/95 backdrop-blur shrink-0 mt-auto shadow-lg z-10">
              {activeDiagram && suggestions.length > 0 && (
                <div className="mb-2">
                  <h5 className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3-h-3 text-teal-accent" />
                    <span>Suggested Next Actions</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5 max-h-[70px] overflow-y-auto pr-1">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPromptInput(suggestion)}
                        className="text-[9px] bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 hover:text-teal-accent border border-slate-700/60 hover:border-teal-500/30 px-2 py-1 rounded transition-all truncate text-left cursor-pointer max-w-full"
                        title={suggestion}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <form onSubmit={handleSendPrompt} className="relative">
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder={activeDiagram ? "e.g., Add an Apigee Gateway in front of Cloud Run..." : "Select a diagram first..."}
                  disabled={!activeDiagram || isGenerating}
                  rows={2}
                  className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded-lg pl-3 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none resize-none transition-all disabled:opacity-50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendPrompt(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!activeDiagram || isGenerating || !promptInput.trim()}
                  className="absolute right-2.5 bottom-3.5 p-1.5 rounded-md bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="text-[10px] text-slate-500 mt-1.5 text-center">
                Press Enter to send. Gemini 2.0 Flash will refine your active diagram.
              </p>
            </div>
          </section>

          {/* B. CENTER PANE: Diagram Viewport & In-Place Editor */}
          <section className="flex-1 flex flex-col bg-bg-dark h-full relative overflow-hidden min-w-0">
            
            {/* Center Pane Top Control Bar (Clean Status & Zoom Controls) */}
            {activeDiagram && (
              <div className="h-12 border-b border-panel-border flex items-center justify-between px-4 bg-panel-dark/60 backdrop-blur z-20 shrink-0">
                <div className="flex items-center gap-3">
                  {/* Mode Indicator Badge */}
                  {isInlineEditorOpen ? (
                    <span className="px-2.5 py-1 rounded text-[10px] font-extrabold bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                      IN-PLACE INLINE EDITOR ACTIVE
                    </span>
                  ) : viewMode === 'outline' ? (
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-blue-400" />
                      STRUCTURAL TREE INSPECTOR
                    </span>
                  ) : viewMode === 'business' ? (
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-emerald-400" />
                      BUSINESS USE CASE METADATA
                    </span>
                  ) : viewMode === 'technical' ? (
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-indigo-400" />
                      TECHNICAL INTEGRATION WALKTHROUGH
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-teal-500/15 text-teal-accent border border-teal-500/30 flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-teal-accent" />
                      {layoutPreset === 'clean' ? '✨ 2D CANVAS (OPTION 2: CLEAN VIEW)' : '📐 2D CANVAS (DETAILED VIEW)'}
                    </span>
                  )}
                </div>

                {/* Right Controls: Zoom/Pan in Canvas mode, Save/Exit in Edit mode */}
                <div className="flex items-center gap-2">
                  {isInlineEditorOpen ? (
                    <div className="flex items-center gap-2">
                      <button
                        id="inline-save-exit-btn"
                        onClick={() => {
                          console.log('[Dashboard] 🚀 "Save & Exit" button clicked! Sending export action to iframe...');
                          const msg = { action: 'export', format: 'xml' };
                          iframeRef.current?.contentWindow?.postMessage(JSON.stringify(msg), '*');
                          iframeRef.current?.contentWindow?.postMessage(msg, '*');
                        }}
                        className="px-3.5 py-1.5 rounded-md bg-teal-accent hover:bg-teal-hover text-bg-dark text-xs font-bold transition-all cursor-pointer shadow-lg glow-teal-hover flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Save & Exit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to exit inline editing? Any unsaved changes will be lost.')) {
                            setIsInlineEditorOpen(false);
                          }
                        }}
                        className="p-1.5 rounded-md hover:bg-slate-hover text-slate-400 hover:text-white transition-all cursor-pointer"
                        title="Exit Editor"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : viewMode === 'canvas' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPanMode(!isPanMode)}
                        className={`p-1.5 rounded-md hover:bg-slate-hover transition-all cursor-pointer flex items-center justify-center ${
                          (isPanMode || isSpacePressed) ? 'text-teal-accent bg-teal-500/10 border border-teal-500/20 shadow-[0_0_10px_rgba(20,184,166,0.15)]' : 'text-slate-400 border border-transparent'
                        }`}
                        title={(isPanMode || isSpacePressed) ? "Hand Tool (Pan Canvas) - Active (Press Spacebar to toggle)" : "Hand Tool (Pan Canvas) - Inactive (Hold Spacebar to pan temporarily)"}
                      >
                        <Hand className="w-4 h-4" />
                      </button>

                      <div className="flex items-center bg-bg-dark/80 rounded-lg border border-panel-border px-1 py-0.5 text-xs text-slate-300">
                        <button
                          onClick={() => setZoom(z => Math.max(0.4, Number((z - 0.1).toFixed(1))))}
                          className="p-1 hover:text-teal-accent transition-colors cursor-pointer font-bold"
                          title="Zoom Out"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-mono text-[11px] text-teal-accent font-bold">
                          {Math.round(zoom * 100)}%
                        </span>
                        <button
                          onClick={() => setZoom(z => Math.min(2.5, Number((z + 0.1).toFixed(1))))}
                          className="p-1 hover:text-teal-accent transition-colors cursor-pointer font-bold"
                          title="Zoom In"
                        >
                          +
                        </button>
                        <div className="h-3 w-[1px] bg-panel-border mx-1" />
                        <button
                          onClick={() => { setZoom(0.7); setPan({ x: 0, y: 0 }); }}
                          className="px-2 py-0.5 text-[10px] hover:text-white transition-colors cursor-pointer font-medium"
                          title="Reset Zoom & Pan"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Outline Mode Action Button */
                    <button
                      onClick={() => setIsInlineEditorOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-teal-accent/10 border border-teal-accent/30 hover:bg-teal-accent/20 text-teal-accent text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Inline</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            <div 
              id="tour-canvas-viewport"
              className={getTourClass(tourStep, 4, "flex-1 w-full h-full relative overflow-hidden")}
            >
              
              {!activeDiagram ? (
                <div className="w-full h-full overflow-y-auto p-8 md:p-12 relative flex items-center justify-center bg-gradient-to-b from-[#090d16] to-[#05080e]">
                  {/* Subtle Grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(20, 184, 166, 0.5) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(20, 184, 166, 0.5) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px'
                    }}
                  />

                  <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-5 gap-8 items-start z-10">
                    {/* Welcome & Scratch Onboarding (Left Column) */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-teal-accent uppercase tracking-wider px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20">
                          Active Workspace
                        </span>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight pt-2">
                          Welcome to <br />
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-accent to-cyan-400">
                            PromptCanvas
                          </span>
                        </h2>
                        <p className="text-xs text-slate-400 leading-relaxed pt-1">
                          Translate raw system descriptions into professional Draw.io cloud architectures instantly. Audited for compliance, version-controlled, and editable.
                        </p>
                      </div>

                      {/* Launch Card */}
                      <div className="glass-panel border-panel-border/80 hover:border-teal-500/40 rounded-xl p-5 space-y-4 hover:scale-[1.01] transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-accent">
                          <Plus className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">Start from scratch</h4>
                          <p className="text-[11px] text-slate-400 mt-1">Initialize a clean slate diagram canvas with your custom prompt inputs.</p>
                        </div>
                        <button
                          onClick={openCreateModal}
                          className="w-full py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-semibold text-xs transition-all glow-teal-hover cursor-pointer"
                        >
                          Create New Diagram
                        </button>
                      </div>
                    </div>

                    {/* Presets Onboarding (Right Column) */}
                    <div className="md:col-span-3 space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Start Presets</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          {
                            name: "GCP Serverless App",
                            prompt: "Act as a GCP Cloud Architect. Design a serverless web application architecture. It should include: a Global HTTPS Load Balancer, Cloud CDN, Cloud Run for the frontend/backend services, Cloud SQL (PostgreSQL) for relational data, and Cloud Storage for static media assets.",
                            provider: "GCP",
                            color: "bg-teal-500/10 text-teal-400 border-teal-500/20"
                          },
                          {
                            name: "AWS Kubernetes Cluster",
                            prompt: "Act as an AWS Solutions Architect. Design a microservices architecture hosted on EKS (Elastic Kubernetes Service). It should include: an Application Load Balancer, Amazon API Gateway, EKS worker nodes running services, RDS PostgreSQL for main DB, DynamoDB for session state, and ElastiCache Redis for caching.",
                            provider: "AWS",
                            color: "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          },
                          {
                            name: "AI RAG GCP Pipeline",
                            prompt: "Act as an AI Cloud Architect. Design a Retrieval-Augmented Generation (RAG) system on GCP. It should include: a Cloud Run API service, Cloud SQL with pgvector extension for storing vector embeddings, Vertex AI Search for document retrieval, Vertex AI Gemini API for LLM reasoning, and Cloud Storage for source documents.",
                            provider: "AI / GCP",
                            color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          },
                          {
                            name: "CI/CD Build Pipeline",
                            prompt: "Act as a DevOps Architect. Design a secure CI/CD build and deploy pipeline. It should include: GitHub repository triggering a GitHub Actions Runner, compilation/testing step, containerizing with Docker, pushing images to Artifact Registry, deploying using Terraform Cloud to a target Kubernetes cluster, and monitoring with Prometheus/Grafana.",
                            provider: "DevOps",
                            color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          }
                        ].map((preset, idx) => (
                          <div 
                            key={idx}
                            className="glass-panel border-panel-border/40 hover:border-teal-500/30 rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all group"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${preset.color}`}>
                                  {preset.provider}
                                </span>
                              </div>
                              <h5 className="font-bold text-xs text-white group-hover:text-teal-accent transition-colors mb-1">{preset.name}</h5>
                              <p className="text-[10px] text-slate-500 line-clamp-3 leading-relaxed mb-4">{preset.prompt}</p>
                            </div>
                            <button
                              onClick={() => {
                                setNewDiagramName(preset.name);
                                setNewDiagramPrompt(preset.prompt);
                                setSelectedTemplate((idx + 1).toString());
                                setIsCreateModalOpen(true);
                              }}
                              className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-teal-accent text-slate-300 hover:text-bg-dark text-[10px] font-bold transition-all border border-slate-700 hover:border-transparent flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Launch Preset</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : isInlineEditorOpen ? (
                /* Phase 2: In-Place Inline Editor */
                <div className="w-full h-full relative z-10 flex flex-col bg-bg-dark animate-fade-in">
                  <iframe
                    ref={iframeRef}
                    src="https://embed.diagrams.net/?embed=1&ui=dark&spin=1&proto=json&pv=0"
                    className="w-full h-full border-0 bg-transparent"
                    title="In-Place Draw.io Editor"
                  />
                </div>
              ) : viewMode === 'outline' ? (
                /* Phase 3: Outline & Nodes Tree Inspector */
                <div className="w-full h-full relative z-10 overflow-y-auto p-6 bg-panel-dark/20 animate-fade-in">
                  {(() => {
                    const items = parseXmlNodesAndEdges(displayedVersion?.xml_content || '');
                    const nodes = items.filter(i => !i.isEdge);
                    const edges = items.filter(i => i.isEdge);
                    const editedCount = Object.keys(outlineEdits).length;

                    return (
                      <div className="max-w-4xl mx-auto space-y-6">
                        {/* Outline Header & Stats */}
                        <div className="glass-panel border-panel-border p-4 rounded-xl flex items-center justify-between bg-panel-dark/40">
                          <div className="flex items-center gap-6">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Components</span>
                              <span className="text-lg font-extrabold text-white">{nodes.length} <span className="text-xs font-normal text-slate-400">Nodes</span></span>
                            </div>
                            <div className="h-8 w-[1px] bg-panel-border" />
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Routing</span>
                              <span className="text-lg font-extrabold text-teal-accent">{edges.length} <span className="text-xs font-normal text-slate-400">Connections</span></span>
                            </div>
                            <div className="h-8 w-[1px] bg-panel-border" />
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Snapshot</span>
                              <span className="text-sm font-bold text-slate-200">v{displayedVersion?.version_number} <span className="text-xs text-slate-500">({displayedVersion?.created_by})</span></span>
                            </div>
                          </div>

                          {/* Quick Save Outline Edits Button */}
                          {editedCount > 0 && !previewVersion && (
                            <button
                              onClick={handleSaveOutlineEdits}
                              disabled={isSaving}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs transition-all shadow-lg glow-teal-hover cursor-pointer"
                            >
                              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                              <span>Save {editedCount} Label Edit(s)</span>
                            </button>
                          )}
                        </div>

                        {/* Nodes List */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-teal-accent" />
                            <span>Architecture Nodes ({nodes.length})</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {nodes.map(node => {
                              const currentLabel = outlineEdits[node.id] !== undefined ? outlineEdits[node.id] : node.label;
                              const isEdited = outlineEdits[node.id] !== undefined && outlineEdits[node.id] !== node.label;

                              return (
                                <div key={node.id} className={`p-3 rounded-lg border transition-all ${
                                  isEdited ? 'bg-teal-glow/20 border-teal-accent/50' : 'bg-panel-dark/40 border-panel-border hover:border-slate-700'
                                }`}>
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                      {node.id}
                                    </span>
                                    {isEdited && (
                                      <span className="text-[9px] font-bold text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/30">
                                        Modified
                                      </span>
                                    )}
                                  </div>
                                  
                                  {previewVersion ? (
                                    <div className="text-sm font-semibold text-white truncate py-1">{currentLabel}</div>
                                  ) : (
                                    <input
                                      type="text"
                                      value={currentLabel}
                                      onChange={(e) => setOutlineEdits(prev => ({ ...prev, [node.id]: e.target.value }))}
                                      placeholder="Node label..."
                                      className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded px-2.5 py-1.5 text-sm font-medium text-white focus:outline-none transition-all"
                                    />
                                  )}
                                  <div className="text-[10px] text-slate-500 mt-1.5 truncate">
                                    Style: {node.style?.split(';')[0] || 'Default'}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Connections / Edges List */}
                        {edges.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                              <span>Flow Connections ({edges.length})</span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {edges.map(edge => (
                                <div key={edge.id} className="p-3 rounded-lg bg-panel-dark/30 border border-panel-border flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2 min-w-0 font-mono text-slate-300">
                                    <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-400">{edge.source || 'root'}</span>
                                    <span className="text-teal-accent">➔</span>
                                    <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-400">{edge.target || 'root'}</span>
                                  </div>
                                  {edge.label && edge.label !== 'Connection' && (
                                    <span className="text-[11px] font-medium text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                                      {edge.label}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : viewMode === 'business' ? (
                /* Phase 4: Business Use Case Metadata Viewer */
                <div className="w-full h-full relative z-10 overflow-y-auto p-8 bg-panel-dark/20 animate-fade-in">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="glass-panel border-panel-border p-6 rounded-xl bg-panel-dark/40">
                      <div className="flex items-center gap-3 border-b border-panel-border pb-4 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-white text-lg">Business Use Case Analysis</h3>
                          <p className="text-xs text-slate-400">Strategic goals, target stakeholders, value propositions, and success KPIs</p>
                        </div>
                      </div>
                      
                      {displayedVersion?.business_usecase ? (
                        <div 
                          className="prose prose-invert max-w-none text-slate-300 text-sm space-y-4"
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(displayedVersion.business_usecase) }}
                        />
                      ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                          <Sparkles className="w-8 h-8 text-slate-500 animate-pulse" />
                          <div>
                            <h4 className="font-bold text-sm text-white">No Business Use Case Generated</h4>
                            <p className="text-xs text-slate-400 mt-1 max-w-md">This version does not contain business metadata yet. Generate it now with Gemini.</p>
                          </div>
                          <button
                            onClick={handleGenerateMetadata}
                            disabled={isMetadataGenerating}
                            className="px-4 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isMetadataGenerating ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Generating use cases...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>Generate Use Cases with AI</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : viewMode === 'technical' ? (
                /* Phase 5: Technical Use Case Integrations Viewer */
                <div className="w-full h-full relative z-10 overflow-y-auto p-8 bg-panel-dark/20 animate-fade-in">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="glass-panel border-panel-border p-6 rounded-xl bg-panel-dark/40">
                      <div className="flex items-center gap-3 border-b border-panel-border pb-4 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-white text-lg">Technical Integration Walkthrough</h3>
                          <p className="text-xs text-slate-400">Sequential messaging flow, technical APIs, configurations, and fault tolerance</p>
                        </div>
                      </div>
                      
                      {displayedVersion?.technical_usecase ? (
                        <div 
                          className="prose prose-invert max-w-none text-slate-300 text-sm space-y-4"
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(displayedVersion.technical_usecase) }}
                        />
                      ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                          <Sparkles className="w-8 h-8 text-slate-500 animate-pulse" />
                          <div>
                            <h4 className="font-bold text-sm text-white">No Technical Walkthrough Generated</h4>
                            <p className="text-xs text-slate-400 mt-1 max-w-md">This version does not contain technical walkthrough metadata yet. Generate it now with Gemini.</p>
                          </div>
                          <button
                            onClick={handleGenerateMetadata}
                            disabled={isMetadataGenerating}
                            className="px-4 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isMetadataGenerating ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Generating use cases...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>Generate Use Cases with AI</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Phase 1: 2D Interactive Canvas with AI Studio Radial Grid */
                <div 
                  className="w-full h-full flex items-center justify-center p-8 relative overflow-auto select-none cursor-grab active:cursor-grabbing"
                  onMouseDown={(e) => {
                    if (e.target === e.currentTarget || (e.target as HTMLElement).id === 'radial-grid-background') {
                      const startX = e.clientX - pan.x;
                      const startY = e.clientY - pan.y;
                      const handleMouseMove = (moveEvent: MouseEvent) => {
                        setPan({
                          x: moveEvent.clientX - startX,
                          y: moveEvent.clientY - startY
                        });
                      };
                      const handleMouseUp = () => {
                        window.removeEventListener('mousemove', handleMouseMove);
                        window.removeEventListener('mouseup', handleMouseUp);
                      };
                      window.addEventListener('mousemove', handleMouseMove);
                      window.addEventListener('mouseup', handleMouseUp);
                    }
                  }}
                >
                  {/* AI Studio Inspired Infinite Radial Dot Grid */}
                  <div 
                    id="radial-grid-background"
                    className="absolute inset-0 pointer-events-auto transition-opacity duration-300"
                    style={{
                      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                      backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                      backgroundPosition: `${pan.x}px ${pan.y}px`,
                      color: 'rgba(20, 184, 166, 0.22)',
                    }}
                  />

                  {/* Transparent Drag Overlay if Pan Mode is active */}
                  {(isPanMode || isSpacePressed) && (
                    <div 
                      className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing pointer-events-auto"
                      onMouseDown={(e) => {
                        const startX = e.clientX - pan.x;
                        const startY = e.clientY - pan.y;
                        const handleMouseMove = (moveEvent: MouseEvent) => {
                          setPan({
                            x: moveEvent.clientX - startX,
                            y: moveEvent.clientY - startY
                          });
                        };
                        const handleMouseUp = () => {
                          window.removeEventListener('mousemove', handleMouseMove);
                          window.removeEventListener('mouseup', handleMouseUp);
                        };
                        window.addEventListener('mousemove', handleMouseMove);
                        window.addEventListener('mouseup', handleMouseUp);
                      }}
                    />
                  )}

                  <div 
                    className="w-full h-full flex items-center justify-center relative z-10 transition-transform duration-150 ease-out pointer-events-none"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                      transformOrigin: 'center center'
                    }}
                  >
                    <div className="w-full h-full pointer-events-auto flex items-center justify-center">
                      <DiagramViewer
                        xml={currentXmlToRender}
                        aspectRatioId={selectedAspectRatio}
                        customW={customRatioW}
                        customH={customRatioH}
                        bgTheme={canvasTheme}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Reset preview banner if active */}
            {previewVersion && (
              <div className="bg-amber-500/15 border-t border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-300 z-10 animate-fade-in shrink-0">
                <span>You are previewing a historical snapshot (v{previewVersion.version_number}).</span>
                <button 
                  onClick={() => setPreviewVersion(null)}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-bg-dark font-semibold transition-all cursor-pointer"
                >
                  Back to Active Draft
                </button>
              </div>
            )}
          </section>
        </div>
          </>
        )}
      </main>
      )}

      {currentTab === 'templates' && renderTemplatesView()}
      {currentTab === 'walkthrough' && renderWalkthroughView()}
      {currentTab === 'audit' && renderAuditCenterView()}
      {currentTab === 'settings' && renderSettingsView()}

      {/* --- MODALS --- */}

      {/* 1. Create Diagram Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-panel border-panel-border rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">Create New Diagram</h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateDiagram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Diagram Name</label>
                <input
                  type="text"
                  required
                  value={newDiagramName}
                  onChange={(e) => setNewDiagramName(e.target.value)}
                  placeholder="e.g., Google Cloud E-Commerce"
                  className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Choose a Template Prompt</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedTemplate(val);
                    if (val !== 'custom') {
                      const idx = parseInt(val, 10);
                      setNewDiagramPrompt(TEMPLATE_PROMPTS[idx].prompt);
                    }
                  }}
                  className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none transition-all mb-3 cursor-pointer"
                >
                  {TEMPLATE_PROMPTS.map((t, idx) => (
                    <option key={idx} value={idx.toString()}>{t.name}</option>
                  ))}
                  <option value="custom">Custom Prompt (Type below...)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Initial AI Prompt <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={newDiagramPrompt}
                  onChange={(e) => {
                    const promptVal = e.target.value;
                    setNewDiagramPrompt(promptVal);
                    // Match with predefined template or set to custom
                    const matchedIdx = TEMPLATE_PROMPTS.findIndex(t => t.prompt === promptVal);
                    if (matchedIdx !== -1) {
                      setSelectedTemplate(matchedIdx.toString());
                    } else {
                      setSelectedTemplate('custom');
                    }
                  }}
                  placeholder="e.g., Act as a GCP Data Architect. Design a simple 5-node streaming data pipeline with Cloud Storage, Pub/Sub, Dataflow, BigQuery, and Looker..."
                  className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded-lg p-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all resize-none"
                />
                <p className="text-xs text-slate-400 mt-1.5">Leave empty to start with a clean minimal slate.</p>
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 rounded-2xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-black text-base transition-all shadow-lg shadow-teal-500/20 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#070a13]" />
                    <span>Synthesizing Architecture...</span>
                  </>
                ) : (
                  <span>Create Canvas</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AI GENERATION REAL-TIME PROGRESS MODAL */}
      <AIGenerationProgressModal isOpen={isGenerating} promptTitle={newDiagramPrompt || activeDiagram?.name} />

      {/* 2. Save Version Modal (Mock) */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-panel border-panel-border rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">Save New Version</h3>
              <button 
                onClick={() => setIsSaveModalOpen(false)}
                className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveVersion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">What changes did you make?</label>
                <textarea
                  required
                  value={saveComment}
                  onChange={(e) => setSaveComment(e.target.value)}
                  placeholder="e.g., Connected Apigee Gateway to Cloud Run"
                  rows={3}
                  className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none resize-none transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2 rounded-lg bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{isSaving ? 'Saving...' : 'Save Version'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Audit Report Modal */}
      {isAuditModalOpen && auditReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4 md:p-6">
          <div className="glass-panel border-panel-border/60 rounded-3xl p-6 md:p-8 w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-panel-border/40 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-accent flex items-center justify-center font-black">
                  <ShieldAlert className="w-5 h-5 text-teal-accent" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-white">Maestro Security Audit Report</h3>
                  <p className="text-xs text-slate-400">Automated architecture risk analysis & auto-remediation checklist</p>
                </div>
              </div>
              <button 
                id="close-audit-modal-btn"
                onClick={() => setIsAuditModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto pr-2 select-text space-y-6 scrollbar-thin">
              
              {/* Compliance Score Card */}
              <div className="flex items-center gap-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-black text-lg shrink-0 shadow-lg ${
                  auditScore >= 90
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 shadow-emerald-500/20'
                    : auditScore >= 75
                    ? 'border-teal-accent text-teal-accent bg-teal-500/10 shadow-teal-500/20'
                    : 'border-amber-400 text-amber-400 bg-amber-500/10 shadow-amber-500/20'
                }`}>
                  {auditScore}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                      auditScore >= 90 ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                    }`}>
                      {auditScore >= 90 ? 'Grade: Excellent' : auditScore >= 75 ? 'Grade: Good' : 'Grade: Needs Hardening'}
                    </span>
                    <span className="text-xs text-slate-400">{auditGaps.length} Gaps Detected</span>
                  </div>
                  <h4 className="text-base font-black text-white mt-1">Architecture Compliance Rating</h4>
                </div>
              </div>

              {/* Actionable Security Gaps Remediation Checklist */}
              {auditGaps.length > 0 ? (
                <div className="space-y-3 border-t border-panel-border/30 pt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      <span>Select Gaps to Fix ({auditGaps.length})</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedGapIds.length === auditGaps.length) {
                          setSelectedGapIds([]);
                        } else {
                          setSelectedGapIds(auditGaps.map(g => g.id));
                        }
                      }}
                      className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                    >
                      {selectedGapIds.length === auditGaps.length ? 'Deselect All' : 'Select All Gaps'}
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {auditGaps.map((gap) => {
                      const isChecked = selectedGapIds.includes(gap.id);
                      return (
                        <div
                          key={gap.id}
                          onClick={() => {
                            if (isChecked) {
                              setSelectedGapIds(selectedGapIds.filter(id => id !== gap.id));
                            } else {
                              setSelectedGapIds([...selectedGapIds, gap.id]);
                            }
                          }}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                            isChecked
                              ? 'bg-teal-500/10 border-teal-500/40 text-white shadow-md shadow-teal-500/5'
                              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 w-4 h-4 rounded border-slate-700 text-teal-400 focus:ring-teal-400/30 bg-slate-950 cursor-pointer shrink-0"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className="font-extrabold text-white">{gap.title}</h5>
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                                gap.severity === 'HIGH'
                                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                  : gap.severity === 'MEDIUM'
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              }`}>
                                {gap.severity}
                              </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{gap.description}</p>
                            <p className="text-teal-300 font-semibold pt-1">💡 Proposed Fix: {gap.remediation}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>All security gaps resolved! Architecture score is 100%.</span>
                </div>
              )}

              {/* Full Report Markdown */}
              <div className="border-t border-panel-border/30 pt-4 text-xs text-slate-300 space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">Audit Narrative & Benchmarks</h4>
                {renderAuditMarkdown(auditReport)}
              </div>
            </div>
            
            {/* Modal Action Footer */}
            <div className="pt-4 border-t border-panel-border/40 flex items-center justify-between shrink-0">
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Dismiss
              </button>
              {auditGaps.length > 0 && (
                <button
                  onClick={async () => {
                    setIsAuditModalOpen(false);
                    await handleRemediateGaps();
                  }}
                  disabled={selectedGapIds.length === 0 || isRemediating}
                  className="px-6 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 font-black text-xs transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isRemediating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>Fix Selected Gaps ({selectedGapIds.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Inspect AI Action Modal */}
      {isInspectModalOpen && inspectVersion && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-panel border-panel-border rounded-xl p-6 w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-panel-border/40 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-lg text-white">AI Action Inspection — Version v{inspectVersion.version_number}</h3>
              </div>
              <button 
                onClick={() => setIsInspectModalOpen(false)}
                className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 select-text space-y-6 scrollbar-thin">
              {/* Prompt Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-teal-accent uppercase tracking-wider">Natural Language Prompt</h4>
                <div className="bg-[#0b0f19] border border-panel-border/40 rounded-lg p-4 text-xs text-slate-200 leading-relaxed italic">
                  &ldquo;{inspectVersion.prompt || 'No original prompt stored.'}&rdquo;
                </div>
              </div>

              {/* Reasoning Plan Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">AI Planning & Reasoning Plan</h4>
                <div className="bg-[#0b0f19] border border-panel-border/40 rounded-lg p-4 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                  {inspectVersion.ai_reasoning || 'No step-by-step reasoning plan stored for this revision.'}
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-panel-border/30 pt-3 flex justify-end shrink-0">
              <button
                onClick={() => setIsInspectModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. HCL GCP Terraform Export Modal */}
      <TerraformExportModal
        isOpen={isTerraformModalOpen}
        onClose={() => setIsTerraformModalOpen(false)}
        diagramName={activeDiagram?.name}
        diagramId={activeDiagram?.id}
        xmlContent={displayedVersion?.xml_content || activeVersion?.xml_content}
      />

      {/* 7. Import Diagram Modal */}
      <ImportDiagramModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={async (newId) => {
          await fetchDiagrams();
          await loadDiagramDetails(newId);
        }}
      />

      {/* 8. Export Multi-Format & PPTX Presentation Modal */}
      <ExportDiagramModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        diagramName={activeDiagram?.name}
        xmlContent={displayedVersion?.xml_content || activeVersion?.xml_content || ''}
        businessUsecase={displayedVersion?.business_usecase || activeVersion?.business_usecase}
        technicalUsecase={displayedVersion?.technical_usecase || activeVersion?.technical_usecase}
        auditScore={auditScore}
      />

      {/* 9. Password Setup & Browser Auto-Login Modal */}
      <PasswordSetupModal
        isOpen={isPasswordSetupOpen}
        onClose={() => setIsPasswordSetupOpen(false)}
        userEmail={currentUser?.email || ''}
      />

      {/* Interactive Onboarding Guided Tour Overlay */}
      {tourStep !== null && (
        <>
          {/* Backdrop Mask */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-[1px] z-40 transition-opacity duration-300"
            onClick={() => setTourStep(null)}
          />

          {/* Tour Step Cards */}
          {tourStep === 1 && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] bg-slate-900 border border-panel-border p-6 rounded-2xl shadow-2xl shadow-teal-500/10 z-50 text-center space-y-4 animate-fade-in animate-duration-200">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto text-teal-accent">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white">Welcome to Maestro Sketch!</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Let&apos;s take a quick 1-minute guided tour to learn how to generate, edit, and audit production-ready cloud architecture diagrams.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setTourStep(null)}
                  className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                >
                  Skip Tour
                </button>
                <button
                  id="tour-next-btn"
                  onClick={() => setTourStep(2)}
                  className="flex-1 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark text-xs font-bold transition-all glow-teal-hover cursor-pointer"
                >
                  Start Guided Tour
                </button>
              </div>
            </div>
          )}

          {tourStep === 2 && (
            <div className="fixed left-20 top-24 w-80 bg-slate-900 border border-panel-border p-5 rounded-xl shadow-2xl z-50 space-y-3 animate-fade-in animate-duration-200">
              <div className="flex items-center justify-between border-b border-panel-border/30 pb-2">
                <h4 className="font-bold text-xs text-teal-accent uppercase tracking-wider">1. Navigation Dock</h4>
                <span className="text-[10px] text-slate-500">Step 2 of 6</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Use this thin sidebar to toggle between different workspaces: the main interactive canvas, the template preset blueprints, the safety audit reports center, and your settings.
              </p>
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => setTourStep(1)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                >
                  Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTourStep(null)}
                    className="px-3 py-1.5 rounded bg-transparent hover:bg-slate-800 text-slate-500 hover:text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    id="tour-next-btn"
                    onClick={() => setTourStep(3)}
                    className="px-3 py-1.5 rounded bg-teal-accent hover:bg-teal-hover text-bg-dark text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          )}

          {tourStep === 3 && (
            <div className="fixed left-[340px] top-40 w-80 bg-slate-900 border border-panel-border p-5 rounded-xl shadow-2xl z-50 space-y-3 animate-fade-in animate-duration-200">
              <div className="flex items-center justify-between border-b border-panel-border/30 pb-2">
                <h4 className="font-bold text-xs text-teal-accent uppercase tracking-wider">2. AI Assistant Panel</h4>
                <span className="text-[10px] text-slate-500">Step 3 of 6</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Chat with Gemini here to modify your layout, inspect the prompt details, and see an automated audit trail listing every component created, renamed, or deleted.
              </p>
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => setTourStep(2)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                >
                  Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTourStep(null)}
                    className="px-3 py-1.5 rounded bg-transparent hover:bg-slate-800 text-slate-500 hover:text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    id="tour-next-btn"
                    onClick={() => setTourStep(4)}
                    className="px-3 py-1.5 rounded bg-teal-accent hover:bg-teal-hover text-bg-dark text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          )}

          {tourStep === 4 && (
            <div className="fixed left-1/2 bottom-12 -translate-x-1/2 w-[420px] bg-slate-900 border border-panel-border p-5 rounded-xl shadow-2xl z-50 space-y-3 animate-fade-in animate-duration-200 text-center">
              <div className="flex items-center justify-between border-b border-panel-border/30 pb-2">
                <h4 className="font-bold text-xs text-teal-accent uppercase tracking-wider">3. Infinite Design Canvas</h4>
                <span className="text-[10px] text-slate-500">Step 4 of 6</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Drag to pan and scroll to zoom. You can view components as a canvas or structure tree, or click <b className="text-teal-400">Edit Inline</b> to make manual visual modifications directly inside Draw.io.
              </p>
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => setTourStep(3)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                >
                  Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTourStep(null)}
                    className="px-3 py-1.5 rounded bg-transparent hover:bg-slate-800 text-slate-500 hover:text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    id="tour-next-btn"
                    onClick={() => setTourStep(5)}
                    className="px-3 py-1.5 rounded bg-teal-accent hover:bg-teal-hover text-bg-dark text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          )}

          {tourStep === 5 && (
            <div className="fixed right-80 top-48 w-80 bg-slate-900 border border-panel-border p-5 rounded-xl shadow-2xl z-50 space-y-3 animate-fade-in animate-duration-200">
              <div className="flex items-center justify-between border-b border-panel-border/30 pb-2">
                <h4 className="font-bold text-xs text-teal-accent uppercase tracking-wider">4. Version Control</h4>
                <span className="text-[10px] text-slate-500">Step 5 of 6</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Every prompt and edit generates a new version snapshot. Click any version to preview past drafts, view the changes audit trail, or roll back instantly.
              </p>
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => setTourStep(4)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                >
                  Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTourStep(null)}
                    className="px-3 py-1.5 rounded bg-transparent hover:bg-slate-800 text-slate-500 hover:text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    id="tour-next-btn"
                    onClick={() => setTourStep(6)}
                    className="px-3 py-1.5 rounded bg-teal-accent hover:bg-teal-hover text-bg-dark text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          )}

          {tourStep === 6 && (
            <div className="fixed right-20 top-24 w-80 bg-slate-900 border border-panel-border p-5 rounded-xl shadow-2xl z-50 space-y-3 animate-fade-in animate-duration-200">
              <div className="flex items-center justify-between border-b border-panel-border/30 pb-2">
                <h4 className="font-bold text-xs text-teal-accent uppercase tracking-wider">5. Automated Audits</h4>
                <span className="text-[10px] text-slate-500">Step 6 of 6</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Run security and vulnerability audits at any time. The system will audit your architecture layout for common compliance risks and compile safety ratings.
              </p>
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => setTourStep(5)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  id="tour-next-btn"
                  onClick={() => setTourStep(null)}
                  className="px-5 py-1.5 rounded bg-teal-accent hover:bg-teal-hover text-bg-dark text-[10px] font-bold transition-all glow-teal-hover cursor-pointer"
                >
                  Finish Tour
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ContactUsModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        currentUser={currentUser}
      />

    </div>
  );
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070a13] flex items-center justify-center text-teal-accent font-extrabold text-sm">
        <Loader2 className="w-6 h-6 animate-spin text-teal-accent mr-2" />
        <span>Loading Maestro Workspace...</span>
      </div>
    }>
      <WorkspaceContent />
    </Suspense>
  );
}
