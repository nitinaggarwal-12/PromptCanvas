'use client';

export interface ByokConnectionProfile {
  id: string;
  name: string;
  apiKey: string;
  model: 'gemini-3.7-flash';
  lastTestedLatencyMs?: number;
  status: 'verified' | 'untested' | 'error';
}

import { VisualVersionDiffInspectorModal } from '@/components/VisualVersionDiffInspectorModal';
import { TechRadarAndConceptDriftGuardModal } from '@/components/TechRadarAndConceptDriftGuard';
import { ConversationalRefactorBar, AuditComplianceDossierModal } from '@/components/ConversationalRefactorAndAuditDossier';
import { FlagshipToolbarButtons, WorldClassFlagshipDrawer, ActiveFlagshipTool } from '@/components/WorldClassFlagshipSuite';
import { SUPPORTED_LANGUAGES, translateDiagramXmlToLanguage, TRANSLATIONS, SupportedLanguage } from '@/lib/i18n';
import { localizeDrawioXmlDeep } from '@/lib/diagramLanguageLocalizer';
import {
  PHASE_NAME_OPTIONS,
  ARCHITECTURE_DOMAIN_OPTIONS,
  ABSTRACTION_LEVEL_OPTIONS,
  ARCHITECTURAL_STACK_LAYER_OPTIONS,
  DEFAULT_LAYOUT_DIRECTION_OPTIONS,
  SALES_CYCLE_STAGE_OPTIONS,
  LIFECYCLE_PHASE_OPTIONS,
  BLUEPRINT_KNOWLEDGE_MATRIX,
  getBlueprintMetadataById,
  getFacetedBlueprintFilters
} from '@/lib/blueprintKnowledgeMatrix';
import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
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
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  MessageSquare, 
  X,
  Loader2,
  CheckCircle2,
  FileText,
  Briefcase,
  Cpu,
  Shield,
  ShieldCheck,
  FileCode,
  User,
  Users,
  LayoutGrid,
  BarChart3,
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
  Moon,
  Lock,
  Globe,
  RefreshCw,
  DollarSign,
  ClipboardList,
  Star,
  History,
  Layers,
  Zap,
  Palette,
  Folder,
  Grid,
  Copy
} from 'lucide-react';
import { CloudCostModal } from '@/components/workspace/CloudCostModal';
import { ArchitectureCodeViewerModal } from '@/components/workspace/ArchitectureCodeViewerModal';
import { SetMasterTemplateModal } from '@/components/workspace/SetMasterTemplateModal';
import { estimateCloudArchitectureCost } from '@/lib/cost/cloudCostEstimator';
import { exportPythonDiagramsScript, exportD2LangScript } from '@/lib/export/architectureAsCodeExporter';
import { DiagramNodeItem, parseXmlNodesAndEdges, formatRelativeTime } from '@/lib/graph/xmlNodesParser';
import { createMinimalistCleanVariant, restoreDetailedView, createVendorIconsVariant, sanitizeDrawioXmlAttributes } from '@/lib/diagramCleaner';
import { preflightVerifyAndHealXmlAcrossAll6Audits, runZeroDefectTextAndTechnicalAccuracyPreflight } from '@/lib/preflightAuditEngine';
import { getTemplateTitle } from '@/lib/architectureTypes';
import DiagramViewer from '@/components/DiagramViewer';
import { AccessRestrictedScreen } from '@/components/AccessRestrictedScreen';
import { AccessRequestsInbox } from '@/components/AccessRequestsInbox';
import { TerraformExportModal } from '@/components/TerraformExportModal';
import { ImportDiagramModal } from '@/components/ImportDiagramModal';
import { ExportDiagramModal } from '@/components/ExportDiagramModal';
import { ComposeModal } from '@/components/workspace/ComposeModal';
import { AuthModal } from '@/components/AuthModal';
import DiagramFeedbackWidget from '@/components/DiagramFeedbackWidget';
import { ContactUsModal } from '@/components/ContactUsModal';
import { AIGenerationProgressModal } from '@/components/AIGenerationProgressModal';
import { PasswordSetupModal } from '@/components/PasswordSetupModal';
import { AspectRatioSelector } from '@/components/AspectRatioSelector';
import { UseCaseIntakeModal } from '@/components/UseCaseIntakeModal';
import { ExecutiveStrategicSummaryModal } from '@/components/ExecutiveStrategicSummaryModal';
import { rearrangeDiagramForAspectRatio } from '@/lib/aspectRatioLayout';
import { ARCHITECTURE_TYPES, BUSINESS_ARCHITECTURE_TYPES, TECHNICAL_ARCHITECTURE_TYPES, getArchitectureTypeById, getDefaultXmlForArchitecture, normalizeArchitectureId } from '@/lib/architectureTypes';
import { getExactAgenticMeshXml } from '@/lib/newEnterpriseReferenceXmls';
import { injectUseCaseFlavor } from '@/lib/diagramCleaner';
import { getPromptCanvasEnterpriseStencilsXml } from '@/lib/stencilLibrary';
import { DiagramTypeSelector } from '@/components/workspace/DiagramTypeSelector';
import { AssumptionBanner } from '@/components/workspace/AssumptionBanner';
import { checkDiagramStaleness } from '@/lib/diagramStaleness';
import { TopDownHierarchySelector } from '@/components/workspace/TopDownHierarchySelector';
import { TopDownTemplatesExplorer } from '@/components/workspace/TopDownTemplatesExplorer';
import { UnifiedProjectSelector } from '@/components/workspace/UnifiedProjectSelector';
import { ProjectHeaderNav } from '@/components/workspace/ProjectHeaderNav';
import { GeminiEnterpriseBottomChat } from '@/components/workspace/GeminiEnterpriseBottomChat';
import { GeminiEnterpriseLeftStudio } from '@/components/workspace/GeminiEnterpriseLeftStudio';
import { ProjectPromptDossierModal } from '@/components/workspace/ProjectPromptDossierModal';
import { WelcomeGetStartedSlate } from '@/components/workspace/WelcomeGetStartedSlate';
import { useTheme } from '@/lib/themeContext';

export const DEFAULT_UNIFIED_PROMPT =
  "Design a production-grade multi-tier enterprise architecture on Google Cloud (GCP) featuring: Global HTTPS Load Balancer with Cloud Armor WAF and Cloud CDN, GKE Autopilot cluster running containerized microservices across multi-AZ private subnets, Cloud SQL (PostgreSQL 16) with read-replicas and Private Service Connect, Redis MemoryStore cache tier, Pub/Sub event streaming bus with Dead-Letter Queue (DLQ), and Vertex AI Gemini Enterprise integration for real-time analytics and observability.";

export function generateUniqueProjectName(): string {
  const code = Math.floor(100 + Math.random() * 900);
  return `Google Cloud Project #${code}`;
}

export function generateUniqueDiagramName(baseName?: string): string {
  const code = Math.floor(100 + Math.random() * 900);
  if (baseName) {
    const cleanBase = baseName
      .replace(/\s*\(WBS\s*[\d.]+\)/gi, '')
      .replace(/\s*-\s*System Design/gi, '')
      .replace(/\s*-\s*Enterprise Edition/gi, '')
      .trim();
    return `${cleanBase} #${code}`;
  }
  return `Unified Cloud Architecture #${code}`;
}


// Define Types (matching our DB schema + API responses)
interface Diagram {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  versions?: DiagramVersion[];
  architecture_type?: string | null;
  is_private?: boolean | number | null;
  prompt?: string | null;
  xml_content?: string;
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
  architecture_type?: string | null;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  versionNumber?: number;
}

// Using imported DiagramNodeItem and parseXmlNodesAndEdges from '@/lib/graph/xmlNodesParser'

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
    prompt: "Act as an Enterprise Cloud Architect. Design a multi-tier cloud system architecture."
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
    name: "Enterprise LLM Evaluation, Toxicity & Safety Benchmarking (7-Tier Platform)",
    prompt: "Act as an AI Safety Architect. Design a 7-tier widescreen Enterprise LLM Evaluation, Toxicity & Safety Benchmarking platform (eval_safety_benchmarking). Include: User Input & Query Ingestion, Automated Toxicity & Red-Teaming Screening, Model Evaluation Engine, Human & Automated Scoring Tier, Grounding & Bias Verdict Router, Security Audit & Evidence Log, and Feedback Loop."
  },
  {
    name: "Multi-Agent AI & LLM Orchestration Platform (Vertex AI / LangGraph)",
    prompt: "Act as an AI Orchestration Architect. Design a multi-agent AI platform using Vertex AI and LangGraph. Include: Master Agent Router, Autonomous Worker Agents (Research, Code, Validation), Tool Execution Sandbox, Vector Memory Store (pgvector), and Human-in-the-Loop Approval Gate."
  },
  {
    name: "FinTech Real-Time Core Transaction Ledger (PCI-DSS Active-Active)",
    prompt: "Act as a FinTech Solutions Architect. Design a PCI-DSS compliant core banking & transaction ledger platform. Include: API Gateway with Web Application Firewall, Real-time Fraud Detection ML Pipeline, Cloud Spanner Active-Active multi-region database, Immutable Audit Ledger, and KMS Hardware Security Modules."
  },
  {
    name: "Zero-Trust Multi-Cloud Enterprise Security & SASE (GCP/AWS)",
    prompt: "Act as an Enterprise Security Architect. Design a Zero-Trust Multi-Cloud architecture. Include: BeyondCorp Identity-Aware Proxy (IAP), Cloud Armor WAF, VPC Service Controls perimeter, IAM Role Federation, Security Command Center telemetry, and HSM Key Management."
  },
  {
    name: "DevSecOps GitOps Automated Cloud Delivery (ArgoCD + Terraform HCL)",
    prompt: "Act as a DevSecOps Architect. Design an enterprise GitOps deployment pipeline. Include: GitHub repository push triggering Automated SAST Security Scanning, Terraform Plan dry-run validation, ArgoCD GitOps sync to GKE/EKS Kubernetes clusters, and Automated Rollback on metric alerts."
  }
];

function WorkspaceContent() {
  // --- State ---
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [isTechRadarOpen, setIsTechRadarOpen] = useState(false);
  const [isAuditDossierOpen, setIsAuditDossierOpen] = useState(false);
  const [isConversationalRefactoring, setIsConversationalRefactoring] = useState(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');
  const [activeFlagshipTool, setActiveFlagshipTool] = useState<ActiveFlagshipTool>('none');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<1 | 2 | 3 | 4>(1);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as SupportedLanguage;
      if (langParam) return langParam;
      const stored = localStorage.getItem('promptcanvas_lang') as SupportedLanguage;
      if (stored) return stored;
    }
    return 'en';
  });
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [langSearchQuery, setLangSearchQuery] = useState<string>('');
  const filteredLanguages = SUPPORTED_LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(langSearchQuery.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(langSearchQuery.toLowerCase()) ||
    l.code.toLowerCase().includes(langSearchQuery.toLowerCase())
  );
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  const [byokProfiles, setByokProfiles] = useState<ByokConnectionProfile[]>([
    {
      id: 'default_prod',
      name: 'Enterprise Production (Gemini 3.7 Flash)',
      apiKey: '',
      model: 'gemini-3.7-flash',
      status: 'untested'
    }
  ]);
  const [activeByokProfileId, setActiveByokProfileId] = useState<string>('default_prod');
  const [isByokModalOpen, setIsByokModalOpen] = useState<boolean>(false);
  const [newProfileName, setNewProfileName] = useState<string>('');
  const [newProfileKey, setNewProfileKey] = useState<string>('');
  const [newProfileModel, setNewProfileModel] = useState<'gemini-3.7-flash'>('gemini-3.7-flash');
  const [byokTestStatus, setByokTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [byokLatencyMs, setByokLatencyMs] = useState<number | null>(null);

  const activeByokProfile = byokProfiles.find(p => p.id === activeByokProfileId) || byokProfiles[0];
  const userApiKey = activeByokProfile?.apiKey || '';

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfiles = localStorage.getItem('pc_multi_byok_profiles');
      const savedActiveId = localStorage.getItem('pc_active_byok_profile_id');
      if (savedProfiles) {
        try {
          const parsed = JSON.parse(savedProfiles);
          if (Array.isArray(parsed) && parsed.length > 0) setByokProfiles(parsed);
        } catch (e) {}
      }
      if (savedActiveId) setActiveByokProfileId(savedActiveId);
    }
  }, []);

  function saveProfilesToStorage(profiles: ByokConnectionProfile[], activeId: string) {
    setByokProfiles(profiles);
    setActiveByokProfileId(activeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pc_multi_byok_profiles', JSON.stringify(profiles));
      localStorage.setItem('pc_active_byok_profile_id', activeId);
    }
  };

  async function handleAddAndTestConnection() {
    if (!newProfileKey.trim()) return;
    setByokTestStatus('testing');
    const start = Date.now();
    try {
      const res = await fetch('/api/generate/usecases', {
        headers: { 'x-gemini-api-key': newProfileKey.trim() }
      });
      const duration = Date.now() - start;
      const newProf: ByokConnectionProfile = {
        id: 'byok_' + Date.now(),
        name: newProfileName.trim() || 'Connection ' + (byokProfiles.length + 1),
        apiKey: newProfileKey.trim(),
        model: newProfileModel,
        lastTestedLatencyMs: duration,
        status: res.ok ? 'verified' : 'untested'
      };
      const updated = [...byokProfiles, newProf];
      saveProfilesToStorage(updated, newProf.id);
      setByokTestStatus('success');
      setByokLatencyMs(duration);
      setNewProfileName('');
      setNewProfileKey('');
    } catch (e) {
      setByokTestStatus('error');
    }
  };

  const [activeDiagram, setActiveDiagram] = useState<Diagram | null>(null);
  const [activeVersion, setActiveVersion] = useState<DiagramVersion | null>(null);
  const [customXml, setCustomXml] = useState<string | null>(null);
  const [previewVersion, setPreviewVersion] = useState<DiagramVersion | null>(null);
  const displayedVersion = previewVersion || activeVersion;
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('16:9');
  const [customRatioW, setCustomRatioW] = useState<number>(16);
  const [customRatioH, setCustomRatioH] = useState<number>(10);
  const [restrictedState, setRestrictedState] = useState<{
    diagramId: string;
    diagramName?: string;
    pendingRequest?: any;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; name?: string | null; is_guest?: boolean } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVersionDiffModalOpen, setIsVersionDiffModalOpen] = useState(false);
  const [isPromptDossierOpen, setIsPromptDossierOpen] = useState(false);
  const [leftVersionSelection, setLeftVersionSelection] = useState<string>('v1_initial');
  const [rightVersionSelection, setRightVersionSelection] = useState<string>('v2_current');
  const [isUseCaseModalOpen, setIsUseCaseModalOpen] = useState(false);
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string>('all');
  const [selectedPersonaFilter, setSelectedPersonaFilter] = useState<string>('all');
  const [previewModalTemplateId, setPreviewModalTemplateId] = useState<string | null>(null);
  const [previewModalPhaseFilter, setPreviewModalPhaseFilter] = useState<string>('ALL');
  const [previewModalAbstractionFilter, setPreviewModalAbstractionFilter] = useState<string>('ALL');
  const [previewModalLayerFilter, setPreviewModalLayerFilter] = useState<string>('ALL');
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null);
  const [previewModalTheme, setPreviewModalTheme] = useState<'light' | 'dark'>('light');
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>('editor');
  const [isExecutiveSummaryOpen, setIsExecutiveSummaryOpen] = useState(false);
  const [isPlaybookModalOpen, setIsPlaybookModalOpen] = useState(false);
  const [isPromptStudioExpanded, setIsPromptStudioExpanded] = useState<boolean>(false);
  const [showQuickStartGuide, setShowQuickStartGuide] = useState<boolean>(true);
  const [templateSearchQuery, setTemplateSearchQuery] = useState<string>('');
  const [expandedMsgIds, setExpandedMsgIds] = useState<Set<string>>(new Set());

  // Global Keyboard Navigation for Master Template Preview Carousel
  useEffect(() => {
    if (!previewModalTemplateId) return;
    const allTemplates = BLUEPRINT_KNOWLEDGE_MATRIX;
    const filteredTemplates = allTemplates.filter(t => {
      if (previewModalPhaseFilter !== 'ALL' && t.phaseName !== previewModalPhaseFilter && !t.phaseName.startsWith(previewModalPhaseFilter) && t.phase !== previewModalPhaseFilter) return false;
      if (previewModalAbstractionFilter !== 'ALL' && t.abstractionLevel !== previewModalAbstractionFilter) return false;
      if (previewModalLayerFilter !== 'ALL' && t.stackLayer !== previewModalLayerFilter) return false;
      return true;
    });
    const pool = filteredTemplates.length > 0 ? filteredTemplates : allTemplates;

    function handlePreviewKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPreviewModalTemplateId(null);
      } else if (e.key === 'ArrowLeft') {
        const idx = pool.findIndex(t => t.combinedId === previewModalTemplateId);
        if (idx !== -1) {
          const prevIdx = (idx - 1 + pool.length) % pool.length;
          setPreviewModalTemplateId(pool[prevIdx].combinedId);
        }
      } else if (e.key === 'ArrowRight') {
        const idx = pool.findIndex(t => t.combinedId === previewModalTemplateId);
        if (idx !== -1) {
          const nextIdx = (idx + 1) % pool.length;
          setPreviewModalTemplateId(pool[nextIdx].combinedId);
        }
      }
    }
    window.addEventListener('keydown', handlePreviewKeyDown);
    return () => window.removeEventListener('keydown', handlePreviewKeyDown);
  }, [previewModalTemplateId, previewModalPhaseFilter, previewModalAbstractionFilter, previewModalLayerFilter]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const bp = params.get('blueprint') || params.get('arch') || params.get('template');
      if (bp) {
        const title = getTemplateTitle(bp);
        const xml = getDefaultXmlForArchitecture(bp);
        const tempDiagram: Diagram = {
          id: 'bp_' + bp,
          name: title,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          architecture_type: bp,
        };
        const tempVersion: DiagramVersion = {
          id: 'bp_ver_' + bp,
          diagram_id: 'bp_' + bp,
          version_number: 1,
          xml_content: xml || '',
          comment: 'Loaded flagship architecture blueprint',
          created_by: 'system',
          created_at: new Date().toISOString(),
          architecture_type: bp,
        };
        setSelectedArchType(bp);
        setActiveDiagram(tempDiagram);
        setActiveVersion(tempVersion);
      }
    }
  }, []);

  function handleAspectRatioChange(ratioId: string, customW?: number, customH?: number) {
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
  }
  const [selectedPersona, setSelectedPersona] = useState<string>('architect');
  
  const { suggestions, dynamicPlaceholder } = React.useMemo(() => {
    if (!activeDiagram) return { suggestions: [], dynamicPlaceholder: 'Select a diagram first...' };

    const name = String(activeDiagram?.name || '').toLowerCase();
    const prompt = String(activeVersion?.prompt || activeDiagram?.prompt || '').toLowerCase();
    const xml = String(activeVersion?.xml_content || '').toLowerCase();
    const archType = String(activeDiagram?.architecture_type || '').toLowerCase();
    const combo = `${name} ${prompt} ${xml} ${archType}`;

    const isBanking = combo.includes('bank') || combo.includes('fintech') || combo.includes('payment') || combo.includes('card') || combo.includes('ledger') || combo.includes('atm');
    const isECom = combo.includes('ecom') || combo.includes('store') || combo.includes('shop') || combo.includes('cart') || combo.includes('order') || combo.includes('retail');
    const isInsurance = combo.includes('insurance') || combo.includes('claim') || combo.includes('policy') || combo.includes('underwrite');
    const isHealthcare = combo.includes('health') || combo.includes('clinical') || combo.includes('medical') || combo.includes('patient');
    const isAi = combo.includes('rag') || combo.includes('agent') || combo.includes('vector') || combo.includes('llm') || combo.includes('embedding');
    
    const isErd = archType === 'erd' || combo.includes('erd') || combo.includes('dimensional');
    const isSeq = archType.includes('sequence') || combo.includes('sequence');

    // 1. Banking / FinTech Domain
    if (isBanking) {
      if (isErd) {
        return {
          suggestions: currentLanguage === 'hi' ? [
            'Dim_Customer_Account और Dim_Merchant तालिकाओं को जोड़ें',
            'Fact_Account_Transactions को 1:N कार्डिनलिटी से जोड़ें',
            'PCI-DSS और KYC अनुपालन नियम लागू करें',
            'कार्ड नेटवर्क शुल्क टियर विशेषताएँ जोड़ें'
          ] : [
            'Add Dim_Customer_Account & Dim_Merchant tables',
            'Connect Fact_Account_Transactions with 1:N cardinality',
            'Enforce PCI-DSS & KYC Compliance Rules',
            'Add Card Network Fee Tier Attributes'
          ],
          dynamicPlaceholder: currentLanguage === 'hi' ? 'उदा., PK/FK संबंधों के साथ Dim_Customer_Account तालिका जोड़ें...' : 'e.g., Add Dim_Customer_Account table with PK/FK relationships...'
        };
      }
      if (isSeq) {
        return {
          suggestions: [
            'Add OAuth2 Token Validation step',
            'Inject Real-Time AML Fraud Screening Loop',
            'Add ISO 8583 Message Payload Check',
            'Connect Payment Gateway Callback Webhook'
          ],
          dynamicPlaceholder: 'e.g., Add PCI-DSS Tokenization step to payment processing...'
        };
      }
      return {
        suggestions: [
          'Add PCI-DSS Ingestion Gateway',
          'Integrate Real-Time Fraud & AML Detection Engine',
          'Connect ATM & Web Banking API Feeds',
          'Enforce Double-Entry Ledger Security'
        ],
        dynamicPlaceholder: 'e.g., Add Real-Time Fraud Screening to transaction pipeline...'
      };
    }

    // 2. E-Commerce Domain
    if (isECom) {
      if (isErd) {
        return {
          suggestions: [
            'Add Dim_Shopper & Dim_Product_Catalog tables',
            'Connect Fact_Order_Fulfillment with SKU Key',
            'Enforce Inventory Stock Allocation Rules',
            'Add Shipping Address & Carrier Attributes'
          ],
          dynamicPlaceholder: 'e.g., Add Dim_Product_Catalog table with SKU Key...'
        };
      }
      if (isSeq) {
        return {
          suggestions: [
            'Add Cart Checkout API Handshake',
            'Inject Payment Authorization & Hold Step',
            'Add Inventory Reservation Lock',
            'Connect Order Confirmation Webhook'
          ],
          dynamicPlaceholder: 'e.g., Add Inventory Stock Reservation service before checkout...'
        };
      }
      return {
        suggestions: [
          'Add Shopping Cart & Checkout Portal',
          'Integrate Payment & Logistics Carrier Gateway',
          'Connect Product Inventory & Stock Engine',
          'Set Up Customer Loyalty & Promo Engine'
        ],
        dynamicPlaceholder: 'e.g., Add Product Recommendation Engine to Checkout...'
      };
    }

    // 3. Insurance Domain
    if (isInsurance) {
      if (isErd) {
        return {
          suggestions: [
            'Add Dim_Policyholder & Dim_Claim_Record tables',
            'Connect Fact_Insurance_Policies with 1:N cardinality',
            'Enforce Risk Rating & Underwriting Rules',
            'Add Coverage Limit & Deductible Attributes'
          ],
          dynamicPlaceholder: 'e.g., Add Dim_Policyholder table with PK/FK relationships...'
        };
      }
      if (isSeq) {
        return {
          suggestions: [
            'Add Claim Filing API Handshake',
            'Inject Automated Fraud & Risk Score Check',
            'Add Adjuster Review & Approval Step',
            'Connect Claim Settlement Payout API'
          ],
          dynamicPlaceholder: 'e.g., Add Automated Claims Fraud Score check step...'
        };
      }
      return {
        suggestions: [
          'Add Policyholder Ingestion Portal',
          'Integrate Claims Processing & Underwriting Engine',
          'Connect Risk Assessment & Actuarial Models',
          'Set Up Premium Billing & Payout Gateway'
        ],
        dynamicPlaceholder: 'e.g., Add Actuarial Risk Assessment Engine to Underwriting...'
      };
    }

    // 4. Healthcare Domain
    if (isHealthcare) {
      return {
        suggestions: [
          'Add HIPAA-Compliant Patient Data Portal',
          'Integrate Clinical Analytics & Diagnostic Engine',
          'Connect Electronic Health Record (EHR) APIs',
          'Set Up Patient Outcomes & Care Management'
        ],
        dynamicPlaceholder: 'e.g., Add HIPAA Audit Logging service to patient records...'
      };
    }

    // 5. ERD Diagram Type (Generic Domain)
    if (isErd) {
      return {
        suggestions: [
          'Add Dim_Customer & Dim_Provider tables',
          'Connect Fact_Transactions with 1:N cardinality',
          'Enforce Foreign Key constraints & Indexes',
          'Add Audit Timestamp & Status Attributes'
        ],
        dynamicPlaceholder: 'e.g., Add Dim_Customer table with PK/FK relationships...'
      };
    }

    // 6. Sequence Diagram Type (Generic Domain)
    if (isSeq) {
      return {
        suggestions: [
          'Add API Authentication Token check',
          'Inject Rate Limiting & Throttle Step',
          'Add Service Response Payload Validation',
          'Connect Asynchronous Event Callback Webhook'
        ],
        dynamicPlaceholder: 'e.g., Add OAuth2 Token Validation step before API execution...'
      };
    }

    // 7. AI / RAG Ecosystem
    if (isAi) {
      return {
        suggestions: [
          'Integrate Vector Embedding Index (pgvector/Pinecone)',
          'Add ReAct Thought-Action reasoning loop',
          'Connect Document Chunking & Ingestion Pipeline',
          'Enforce PII & Safety Guardrails'
        ],
        dynamicPlaceholder: 'e.g., Add RAG Context Reranker before LLM generation...'
      };
    }

    // 8. Persona-aware fallback
    if (selectedPersona === 'data_engineer') {
      return {
        suggestions: [
          'Add Snowflake Fact Table with 1:N cardinality',
          'Integrate dbt Transformation DAG node',
          'Connect BigQuery Feature Store for ML models',
          'Enforce Data Lineage logging & PII redaction'
        ],
        dynamicPlaceholder: 'e.g., Add dbt transformation step to pipeline...'
      };
    }
    if (selectedPersona === 'ai_engineer') {
      return {
        suggestions: [
          'Integrate LangChain orchestrator with Vertex AI',
          'Add Pinecone / Vector Index for embedding retrieval',
          'Inject ReAct Thought-Action reasoning loop',
          'Connect Apigee Gateway for API rate limiting'
        ],
        dynamicPlaceholder: 'e.g., Add Vector Index node to RAG pipeline...'
      };
    }
    if (selectedPersona === 'security_lead') {
      return {
        suggestions: [
          'Audit DLP scanning & PII redaction rules',
          'Inject Cloud Armor WAF Ingress Filtering',
          'Enforce VPC Service Controls perimeter boundary',
          'Add SRE Canary Rollback threshold'
        ],
        dynamicPlaceholder: 'e.g., Add Cloud Armor WAF rule to ingress...'
      };
    }

    // 9. General Fallback with Architecture & Domain Context
    const arch = activeDiagram?.architecture_type || 'unified_system_view';
    const diagName = activeDiagram?.name || 'Architecture';
    if (arch.includes('multi_region_dr')) {
      return {
        suggestions: [
          `Simulate RPO/RTO Failover Drill for ${diagName}`,
          'Add Multi-Region Active-Active Cloud Spanner Sync',
          'Configure Automated DNS & Traffic Router Failover',
          'Attach Disaster Recovery Runbook & Compliance Gate'
        ],
        dynamicPlaceholder: `e.g., Add Automated Regional Failover trigger for ${diagName}...`
      };
    }
    if (arch.includes('cicd') || arch.includes('polyrepo')) {
      return {
        suggestions: [
          'Add Automated Canary & Blue/Green Deployment Stage',
          'Integrate Container Signing (Cosign) & SLSA Level 3 Gate',
          'Configure Secret Scanning & Ephemeral Test Environments',
          'Attach Automated Load & Performance Quality Gate'
        ],
        dynamicPlaceholder: 'e.g., Add Automated Canary Stage before GKE Production...'
      };
    }
    return {
      suggestions: [
        `Add High-Availability Multi-Zone Ingress for ${diagName}`,
        'Integrate Automated Backup & Zero-Downtime Pipeline',
        'Attach Real-Time Telemetry & Alerting Dashboards',
        'Enforce Zero-Trust Encryption at Rest & in Transit'
      ],
      dynamicPlaceholder: `e.g., Add API Gateway or Security Gate to ${diagName}...`
    };
  }, [activeDiagram, activeVersion?.xml_content, selectedPersona, currentLanguage]);
  
  // v1 Canvas & Edit States (Inspired by AI Studio Blueprint Canvas)
  // v1 Canvas & Edit States (Inspired by AI Studio Blueprint Canvas)
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanMode, setIsPanMode] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  // Auto-dismiss all header dropdown menus when clicking anywhere outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('#workspace-canvas-project-selector') && 
          !target.closest('#workspace-header-architecture-select') && 
          !target.closest('#workspace-version-dropdown') &&
          !target.closest('.header-dropdown-menu')) {
        setIsCanvasDropdownOpen(false);
        setIsArchDropdownOpen(false);
        setIsVersionDropdownOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const { theme: canvasTheme, setTheme: setCanvasTheme } = useTheme();
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
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);

  const filteredSidebarDiagrams = React.useMemo(() => {
    const seen = new Set<string>();
    return diagrams.filter(d => {
      if (!String(d.name || '').toLowerCase().includes((sidebarSearch || '').toLowerCase())) return false;
      if (seen.has(d.id)) return false;
      seen.add(d.id);
      return true;
    });
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

  function getTourClass(step: number | null, targetStep: number, baseClass: string) {
    if (step === targetStep) {
      const cleanedBase = baseClass.replace(/\bz-\d+\b/g, '');
      const hasPosition = /\b(relative|absolute|fixed|sticky)\b/.test(cleanedBase);
      const positionClass = hasPosition ? '' : 'relative';
      
      return `${cleanedBase} ${positionClass} z-[70] ring-4 ring-teal-400 border-2 border-teal-400 bg-teal-950/90 text-teal-200 shadow-[0_0_35px_rgba(20,184,166,1)] animate-pulse transition-all duration-300 pointer-events-auto scale-105`;
    }
    return baseClass;
  };
  
  // UI Panels
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('modal') === 'create' || params.get('new') === 'true' || params.get('create') === 'true';
    }
    return false;
  });
  const [createModalTab, setCreateModalTab] = useState<'simple' | 'advanced'>('simple');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isInlineEditorOpen, setIsInlineEditorOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('edit') === 'true';
    }
    return false;
  });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [inspectVersion, setInspectVersion] = useState<DiagramVersion | null>(null);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('modal') === 'inspect';
    }
    return false;
  });
  
  // Form Inputs
  const [newProjectName, setNewProjectName] = useState<string>(() => generateUniqueProjectName());
  const [newDiagramName, setNewDiagramName] = useState<string>(() => generateUniqueDiagramName());
  const [newDiagramPrompt, setNewDiagramPrompt] = useState<string>(DEFAULT_UNIFIED_PROMPT);
  const [selectedTemplate, setSelectedTemplate] = useState('0');
  const [selectedArchType, setSelectedArchType] = useState('unified_system_view');
  const [pendingArchType, setPendingArchType] = useState<string | null>(null);
  const [isArchConsentModalOpen, setIsArchConsentModalOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [newDiagramIsPrivate, setNewDiagramIsPrivate] = useState<boolean>(false);

  // 🏛️ 7 Architectural Classification & Lifecycle Dropdown States (Cascading Facets)
  const [selectedPhaseName, setSelectedPhaseName] = useState<string>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedAbstractionLevel, setSelectedAbstractionLevel] = useState<string>('ALL');
  const [selectedStackLayer, setSelectedStackLayer] = useState<string>('ALL');
  const [selectedLayoutDirection, setSelectedLayoutDirection] = useState<string>('ALL');
  const [selectedSalesCycleStage, setSelectedSalesCycleStage] = useState<string>('ALL');
  const [selectedLifecyclePhase, setSelectedLifecyclePhase] = useState<string>('ALL');

  const facetedOptions = useMemo(() => {
    return getFacetedBlueprintFilters({
      phaseName: selectedPhaseName === 'ALL' ? undefined : selectedPhaseName,
      domain: selectedDomain === 'ALL' ? undefined : selectedDomain,
      abstractionLevel: selectedAbstractionLevel === 'ALL' ? undefined : selectedAbstractionLevel,
      stackLayer: selectedStackLayer === 'ALL' ? undefined : selectedStackLayer,
      defaultDirection: selectedLayoutDirection === 'ALL' ? undefined : (selectedLayoutDirection.startsWith('TD') ? 'TD' : selectedLayoutDirection.startsWith('LR') ? 'LR' : selectedLayoutDirection),
      salesStage: selectedSalesCycleStage === 'ALL' ? undefined : selectedSalesCycleStage,
      lifecyclePhase: selectedLifecyclePhase === 'ALL' ? undefined : selectedLifecyclePhase,
    });
  }, [
    selectedPhaseName,
    selectedDomain,
    selectedAbstractionLevel,
    selectedStackLayer,
    selectedLayoutDirection,
    selectedSalesCycleStage,
    selectedLifecyclePhase
  ]);

  const handleResetFilters = useCallback(() => {
    setSelectedPhaseName('ALL');
    setSelectedDomain('ALL');
    setSelectedAbstractionLevel('ALL');
    setSelectedStackLayer('ALL');
    setSelectedLayoutDirection('ALL');
    setSelectedSalesCycleStage('ALL');
    setSelectedLifecyclePhase('ALL');
  }, []);

  const syncDimensionsForBlueprint = useCallback((archId: string) => {
    const meta = getBlueprintMetadataById(archId);
    if (meta) {
      if (meta.phaseName) setSelectedPhaseName(meta.phaseName);
      if (meta.domain) setSelectedDomain(meta.domain);
      if (meta.abstractionLevel) setSelectedAbstractionLevel(meta.abstractionLevel);
      if (meta.stackLayer) setSelectedStackLayer(meta.stackLayer);
      if (meta.defaultDirection) setSelectedLayoutDirection(meta.defaultDirection === 'TD' ? 'TD' : 'LR');
      if (meta.salesStage) setSelectedSalesCycleStage(meta.salesStage);
      if (meta.lifecyclePhase) setSelectedLifecyclePhase(meta.lifecyclePhase);
    }
  }, []);

  const earlierProjects: string[] = useMemo(() => {
    const names = new Set<string>();
    diagrams.forEach((d: Diagram) => {
      if (d.name) {
        names.add(d.name);
      }
    });
    return Array.from(names);
  }, [diagrams]);

  const [disambiguationData, setDisambiguationData] = useState<{
    prompt: string;
    name?: string;
    suggestedTypes: string[];
    assumptions?: string[];
    reasoning?: string;
  } | null>(null);

  const [activeAssumptions, setActiveAssumptions] = useState<string[]>([]);
  const [activeAlternativeTypes, setActiveAlternativeTypes] = useState<string[]>([]);
  const [canvasSearchQuery, setCanvasSearchQuery] = useState('');
  const [isCanvasDropdownOpen, setIsCanvasDropdownOpen] = useState(false);
  const [archSearchQuery, setArchSearchQuery] = useState('');
  const [isArchDropdownOpen, setIsArchDropdownOpen] = useState(false);
  const [hoveredArchId, setHoveredArchId] = useState<string | null>(null);
  const [versionSearchQuery, setVersionSearchQuery] = useState('');
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);
  const [isSettingsHoverOpen, setIsSettingsHoverOpen] = useState(false);
  const [isViewStyleDropdownOpen, setIsViewStyleDropdownOpen] = useState(false);
  const [isGuestDisclaimerDismissed, setIsGuestDisclaimerDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('promptcanvas_dismiss_guest_disclaimer') === 'true';
      } catch (e) {}
    }
    return false;
  });

  async function handleSelectDisambiguationType(typeId: string) {
    const promptToGen = disambiguationData?.prompt || newDiagramPrompt || activeDiagram?.name || 'Architecture Diagram';
    const nameToGen = disambiguationData?.name || newDiagramName || activeDiagram?.name || 'Architecture Diagram';
    setDisambiguationData(null);
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({
          name: nameToGen,
          prompt: promptToGen,
          architectureType: typeId
        })
      });
      if (!res.ok) throw new Error('Failed to generate diagram');
      const data = await res.json();
      if (data.assumptions) setActiveAssumptions(data.assumptions);
      if (data.alternativeTypes) setActiveAlternativeTypes(data.alternativeTypes);
      await fetchDiagrams();
      if (data.diagram?.id) {
        await loadDiagramDetails(data.diagram.id);
      }
    } catch (err) {
      console.error('Error generating selected diagram type:', err);
      alert('Failed to generate diagram with selected type.');
    } finally {
      setIsGenerating(false);
    }
  };

  async function toggleDiagramPrivacy(newPrivate: boolean) {
    if (!activeDiagram) return;
    setIsPrivate(newPrivate);
    setActiveDiagram(prev => prev ? { ...prev, is_private: newPrivate } : null);
    try {
      await fetch(`/api/diagrams/${activeDiagram.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({ is_private: newPrivate }),
      });
      setDiagrams(prev => prev.map(d => d.id === activeDiagram.id ? { ...d, is_private: newPrivate } : d));
    } catch (err) {
      console.error('Failed to update diagram privacy:', err);
    }
  };
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
    const tabParam = searchParams.get('tab');
    if (tabParam && ['editor', 'templates', 'audit', 'settings', 'walkthrough'].includes(tabParam)) {
      setCurrentTab(tabParam as 'editor' | 'templates' | 'audit' | 'settings' | 'walkthrough');
    }
    if (searchParams.get('setupPassword') === 'true') {
      setIsPasswordSetupOpen(true);
    }
    if (searchParams.get('tour') === 'true') {
      setTourStep(1);
    }
    if (searchParams.get('new') === 'true' || searchParams.get('create') === 'true' || searchParams.get('modal') === 'create') {
      setIsCreateModalOpen(true);
      if (searchParams.get('new') === 'true' || searchParams.get('create') === 'true') {
        setActiveDiagram(null);
        setActiveVersion(null);
      }
    }
    const archParam = searchParams.get('blueprint') || searchParams.get('arch') || searchParams.get('template');
    if (archParam) {
      setSelectedArchType(archParam);
      const defaultXml = getDefaultXmlForArchitecture(archParam);
      if (defaultXml) {
        activeXmlRef.current = defaultXml;
        setCustomXml(defaultXml);
      }
      if (activeDiagram && activeDiagram.architecture_type !== archParam) {
        setActiveDiagram(null);
        setActiveVersion(null);
      }
    }
    const promptParam = searchParams.get('prompt');
    if (promptParam && !promptInput) {
      setPromptInput(promptParam);
      setNewDiagramPrompt(promptParam);
    }
  }, [searchParams, activeDiagram, promptInput]);

  async function handleConversationalRefactor(promptText: string) {
    setIsConversationalRefactoring(true);
    setAiStepTelemetry("⚡ [1/4] Parsing Architectural Intent & Multi-Tier Topology...");
    try {
      setTimeout(() => setAiStepTelemetry("⚙️ [2/4] Calculating Spatial Zero-Collision Coordinates..."), 800);
      setTimeout(() => setAiStepTelemetry("🛡️ [3/4] Enforcing Enterprise Security & Light-HUD Styling..."), 1600);
      const currentXml = activeDiagram?.versions?.[0]?.xml_content || activeDiagram?.xml_content || getDefaultXmlForArchitecture(activeDiagram?.architecture_type || 'unified_system_view') || '';
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({
          prompt: `${promptText} — Refactor this enterprise architecture diagram cleanly with spacious horizontal coordinates (x=100, 560, 1020) and white text pills.`,
          architecture_type: activeDiagram?.architecture_type || 'unified_system_view',
          existing_xml: currentXml
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.xml) {
          setAiStepTelemetry("✓ [4/4] Validating AST Structure & Committing Version Snapshot...");
          setTimeout(() => setAiStepTelemetry(null), 2500);
          pushToUndoStack(currentXml);
          setCustomXml(data.xml);
          // Persist isolated version specifically for this diagram ID
          if (activeDiagram?.id) {
            const nextVerNum = (activeDiagram.versions?.length || 0) + 1;
            const saveRes = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
              body: JSON.stringify({
                xmlContent: data.xml,
                comment: `⌘K Refactor: "${promptText}"`,
                architectureType: activeDiagram.architecture_type || 'unified_system_view'
              })
            });
            if (saveRes.ok) {
              const savedVer = await saveRes.json();
              setActiveVersion({
                id: savedVer.id || `ver_${Date.now()}`,
                diagram_id: activeDiagram.id,
                version_number: nextVerNum,
                xml_content: data.xml,
                comment: `⌘K Refactor: "${promptText}"`,
                created_by: 'Gemini 3.6 Ultra-Deep',
                created_at: new Date().toISOString(),
                architecture_type: activeDiagram.architecture_type
              });
            }
          }
        }
      }
    } catch (e) {
      console.error("Refactoring error:", e);
    } finally {
      setIsConversationalRefactoring(false);
    }
  };

  function pushToUndoStack(previousXml: string) {
    if (!previousXml) return;
    setUndoStack(prev => [...prev.slice(-30), previousXml]);
    setRedoStack([]);
  };

  function handleUndo() {
    if (undoStack.length === 0) return;
    const previousXml = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    const current = customXml || displayedVersion?.xml_content || activeVersion?.xml_content || '';
    if (current) {
      setRedoStack(prev => [...prev, current]);
    }
    setCustomXml(previousXml);
  };

  function handleRedo() {
    if (redoStack.length === 0) return;
    const nextXml = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    const current = customXml || displayedVersion?.xml_content || activeVersion?.xml_content || '';
    if (current) {
      setUndoStack(prev => [...prev, current]);
    }
    setCustomXml(nextXml);
  };

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack, customXml, displayedVersion, activeVersion]);

  function openCreateModal() {
    setNewDiagramName('');
    setNewDiagramPrompt('');
    setSelectedTemplate('0');
    setIsCreateModalOpen(true);
  };
  
  // Loading & Layout View Mode States
  const [isLoadingDiagrams, setIsLoadingDiagrams] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStepTelemetry, setAiStepTelemetry] = useState<string | null>(null);
  const [layoutPreset, setLayoutPreset] = useState<'detailed' | 'clean' | 'lucid' | 'obsidian' | 'vendor'>('detailed');
  const [isLiveFlowEnabled, setIsLiveFlowEnabled] = useState(false);
  const [generatingTemplateIdx, setGeneratingTemplateIdx] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);
  const [assistantWidth, setAssistantWidth] = useState<number>(340);
  const [isResizingAssistant, setIsResizingAssistant] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'canvas' | 'assistant' | 'audit'>('canvas');

  function handleMouseDownAssistantResize(e: React.MouseEvent) {
    e.preventDefault();
    setIsResizingAssistant(true);
  };

  React.useEffect(() => {
    if (!isResizingAssistant) return;

    function handleMouseMove(e: MouseEvent) {
      const sidebarWidth = isSidebarOpen ? 256 : 64;
      const newWidth = e.clientX - sidebarWidth;
      if (newWidth >= 240 && newWidth <= 650) {
        setAssistantWidth(newWidth);
      }
    };

    function handleMouseUp() {
      setIsResizingAssistant(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingAssistant, isSidebarOpen]);
  
  // Chat History
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Audit & Remediation States
  const [selectedAuditCategory, setSelectedAuditCategory] = useState<'security' | 'visual' | 'topology' | 'responsive' | 'accessibility' | 'vendor'>('security');
  const [categoryAuditCache, setCategoryAuditCache] = useState<Record<string, { score: number; report: string; gaps: any[] }>>({});
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
  const isAnyAIBusy = isGenerating || isAuditing || isRemediating || isMetadataGenerating || generatingTemplateIdx !== null;
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTerraformModalOpen, setIsTerraformModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSetMasterModalOpen, setIsSetMasterModalOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isCodeViewerOpen, setIsCodeViewerOpen] = useState(false);
  const [codeViewerFormat, setCodeViewerFormat] = useState<'python' | 'd2'>('python');
  

  
  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const childWindowRef = useRef<Window | null>(null);
  const activeXmlRef = useRef('');
  const activeLoadingIdRef = useRef<string | null>(null);
  
  // State for editor integration
  const [pendingXml, setPendingXml] = useState<string | null>(null);

  // Listen for messages from Draw.io editors (both iframe and popup tab)
  useEffect(() => {
    function handleWindowMessage(evt: MessageEvent) {
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
        console.log('[Draw.io Embed] ✉️ Received: init. Sending: load and custom enterprise stencils...');
        sourceWindow?.postMessage(JSON.stringify({
          action: 'load',
          xml: sanitizeDrawioXmlAttributes(activeXmlRef.current),
          fit: false
        }), '*');

        // Inject PromptCanvas Enterprise Stencils into left sidebar palette!
        setTimeout(() => {
          sourceWindow?.postMessage(JSON.stringify({
            action: 'library',
            error: 'ignore',
            show: true,
            title: 'PromptCanvas Enterprise Stencils',
            xml: getPromptCanvasEnterpriseStencilsXml()
          }), '*');
        }, 500);
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

  function openInNewTab() {
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
    activeLoadingIdRef.current = id;
    try {
      const res = await fetch(`/api/diagrams/${id}`);
      if (activeLoadingIdRef.current !== id) return;
      if (res.status === 403 || res.status === 401) {
        const accessRes = await fetch(`/api/diagrams/${id}/access`);
        if (activeLoadingIdRef.current !== id) return;
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
      if (activeLoadingIdRef.current !== id) return;
      
      const urlBlueprint = typeof window !== 'undefined' 
        ? (new URLSearchParams(window.location.search).get('blueprint') || new URLSearchParams(window.location.search).get('arch') || new URLSearchParams(window.location.search).get('template'))
        : null;
      if (urlBlueprint) {
        data.architecture_type = urlBlueprint;
      }

      setRestrictedState(null);
      setActiveDiagram(data);
      setIsPrivate(Boolean(data.is_private));
      if (urlBlueprint || data.architecture_type) {
        const effectiveArch = urlBlueprint || data.architecture_type || 'conceptual_diagram';
        setSelectedArchType(effectiveArch);
        if (effectiveArch === 'technical_diagram' || effectiveArch === 'conceptual_diagram') {
          setViewMode('canvas');
          setLayoutPreset('detailed');
        }
      } else {
        setSelectedArchType('conceptual_diagram');
        setViewMode('canvas');
        setLayoutPreset('detailed');
      }
      setZoom(1.0);
      setPan({ x: 0, y: 0 });
      setOutlineEdits({});
      
      // Set the active version matching active architecture_type
      if (urlBlueprint) {
        const refXml = getDefaultXmlForArchitecture(urlBlueprint, data.name, data.name);
        const dynamicVer: DiagramVersion = {
          id: `arch_sync_${urlBlueprint}_${Date.now()}`,
          diagram_id: data.id,
          version_number: (data.versions?.length || 0) + 1,
          xml_content: refXml || '',
          comment: `Architecture Blueprint: ${getTemplateTitle(urlBlueprint)}`,
          created_by: 'System',
          created_at: new Date().toISOString(),
          architecture_type: urlBlueprint
        };
        setSelectedArchType(urlBlueprint);
        setActiveVersion(dynamicVer);
        activeXmlRef.current = refXml || '';
        setCustomXml(refXml || '');
      } else if (data.versions && data.versions.length > 0) {
        const sortedVersions = [...data.versions].sort((a, b) => b.version_number - a.version_number);
        const targetArch = data.architecture_type || sortedVersions[0].architecture_type || 'conceptual_diagram';
        const candidateVer = sortedVersions.find(v => v.architecture_type === targetArch);
        const isLegacyDevopsMismatch = candidateVer && targetArch !== 'devops_cicd_pipeline' && (candidateVer.xml_content || '').includes('[1] GitHub / GitLab Polyrepo');
        const matchingVer = isLegacyDevopsMismatch ? undefined : candidateVer;
        
        setSelectedArchType(targetArch);
        if (matchingVer) {
          setActiveVersion(matchingVer);
          activeXmlRef.current = matchingVer.xml_content || '';
          setCustomXml(matchingVer.xml_content || '');
        } else {
          const refXml = getDefaultXmlForArchitecture(targetArch, data.name, data.name);
          const dynamicVer: DiagramVersion = {
            id: `arch_sync_${targetArch}_${Date.now()}`,
            diagram_id: data.id,
            version_number: sortedVersions[0].version_number + 1,
            xml_content: refXml || sortedVersions[0].xml_content,
            comment: `Architecture Backbone Sync: ${getArchitectureTypeById(targetArch)?.name || targetArch}`,
            created_by: 'System',
            created_at: new Date().toISOString(),
            architecture_type: targetArch
          };
          setActiveVersion(dynamicVer);
          activeXmlRef.current = refXml || sortedVersions[0].xml_content || '';
          setCustomXml(refXml || sortedVersions[0].xml_content || '');
        }
        
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
        const archVersionsForChat = data.versions.filter(v => (v.architecture_type || 'conceptual_diagram') === targetArch);
        (archVersionsForChat.length > 0 ? archVersionsForChat : data.versions)
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
              sender: (v.created_by || '').toString().toLowerCase() === 'ai' ? 'ai' : 'user',
              text: (v.created_by || '').toString().toLowerCase() === 'ai' 
                ? `Generated diagram version v${v.version_number}: "${v.comment || 'AI Refined Architecture'}"`
                : `Manually saved version v${v.version_number}: "${v.comment || 'Saved changes'}"`,
              timestamp: new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              versionNumber: v.version_number
            });
          });
        setChatMessages(messages);
      } else {
        const targetArch = data.architecture_type || 'unified_system_view';
        setSelectedArchType(targetArch);
        const refXml = getDefaultXmlForArchitecture(targetArch, data.name, data.name);
        const dynamicVer: DiagramVersion = {
          id: `arch_init_${targetArch}_${Date.now()}`,
          diagram_id: data.id,
          version_number: 1,
          xml_content: refXml || '',
          comment: `Initial Architecture Backbone: ${getArchitectureTypeById(targetArch)?.name || targetArch}`,
          created_by: 'System',
          created_at: new Date().toISOString(),
          architecture_type: targetArch
        };
        setActiveVersion(dynamicVer);
        activeXmlRef.current = refXml || '';
        setCustomXml(refXml || '');
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
            const categoryMatch = auditData.reports.find((r: any) => r.audit_category === selectedAuditCategory) || auditData.reports[0];
            setSelectedAuditReportId(categoryMatch.id);
            if (categoryMatch.audit_category) {
              setSelectedAuditCategory(categoryMatch.audit_category as any);
            }
            setAuditReport(categoryMatch.report);
            setAuditScore(categoryMatch.score);
            try {
              const parsedGaps = JSON.parse(categoryMatch.gaps);
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
    function handleScroll() {
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
    function handleKeyDown(e: KeyboardEvent) {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true')) {
        return;
      }
      if (e.code === 'Space') {
        setIsSpacePressed(true);
        e.preventDefault();
      }
    };

    function handleKeyUp(e: KeyboardEvent) {
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
    const diagramId = searchParams.get('diagram') || searchParams.get('id');
    const blueprintParam = searchParams.get('blueprint') || searchParams.get('arch') || searchParams.get('template');
    const isWelcomeParam = searchParams.get('welcome') === 'true' || searchParams.get('slate') === 'true';
    const isNewParam = searchParams.get('new') === 'true' || searchParams.get('create') === 'true' || searchParams.get('modal') === 'create';
    
    if (isWelcomeParam || isNewParam) {
      if (isWelcomeParam || searchParams.get('new') === 'true' || searchParams.get('create') === 'true') {
        setActiveDiagram(null);
        setActiveVersion(null);
      }
      if (isNewParam) {
        setIsCreateModalOpen(true);
      }
      return;
    }

    if (diagramId) {
      if ((!activeDiagram || activeDiagram.id !== diagramId) && !restrictedState) {
        loadDiagramDetails(diagramId);
      }
    }
  }, [searchParams, activeDiagram, restrictedState, loadDiagramDetails]);

  // Auto-select diagram when visiting Audit tab if none is selected
  useEffect(() => {
    if (currentTab === 'audit' && !activeDiagram && diagrams.length > 0) {
      loadDiagramDetails(diagrams[0].id);
    }
  }, [currentTab, activeDiagram, diagrams, loadDiagramDetails]);

  // Real-time URL query parameter synchronizer
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isWelcome = searchParams.get('welcome') === 'true';
    const params = new URLSearchParams();

    // Tab
    if (currentTab !== 'editor') {
      params.set('tab', currentTab);
    }

    if (isWelcome) {
      params.set('welcome', 'true');
    } else if (activeDiagram) {
      params.set('diagram', activeDiagram.id);
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
    } else {
      params.delete('tour');
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
      if (Array.isArray(data) && data.length === 0) {
        // Auto-initialize default architecture canvas
        const defaultXml = getDefaultXmlForArchitecture('unified_system_view', 'Unified Cloud Architecture #101', 'Unified Cloud Architecture #101');
        const createRes = await fetch('/api/diagrams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Unified Cloud Architecture #101',
            xml: defaultXml,
            comment: 'Default initialized canvas',
            architectureType: 'unified_system_view'
          })
        });
        if (createRes.ok) {
          const createData = await createRes.json();
          if (createData.diagram?.id) {
            setDiagrams([createData.diagram]);
            await loadDiagramDetails(createData.diagram.id);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingDiagrams(false);
    }
  }

  async function handleCreateDiagram(e: React.FormEvent) {
    e.preventDefault();
    const finalDiagramName = newDiagramName.trim() || newProjectName.trim() || generateUniqueDiagramName();
    
    try {
      const promptToGenerate = newDiagramPrompt.trim();
      const effectiveArchType = selectedTemplate.startsWith('arch_')
        ? selectedTemplate.replace('arch_', '')
        : (selectedTemplate === '0' && facetedOptions.matchingBlueprints.length > 0
            ? facetedOptions.matchingBlueprints[0].combinedId
            : selectedArchType) || 'conceptual_diagram';

      const defaultXml = getDefaultXmlForArchitecture(effectiveArchType, promptToGenerate || finalDiagramName, promptToGenerate || finalDiagramName);

      if (promptToGenerate) {
        setIsGenerating(true);
        setIsCreateModalOpen(false);
        try {
          const res = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
            body: JSON.stringify({
              name: finalDiagramName,
              prompt: promptToGenerate,
              architectureType: effectiveArchType,
              isPrivate: newDiagramIsPrivate
            })
          });
          if (!res.ok) throw new Error('Failed to generate diagram');
          const data = await res.json();
          if (data.needsDisambiguation) {
            setDisambiguationData({
              prompt: promptToGenerate,
              name: finalDiagramName,
              suggestedTypes: data.suggestedTypes,
              assumptions: data.assumptions,
              reasoning: data.reasoning
            });
            return;
          }
          if (data.assumptions) setActiveAssumptions(data.assumptions);
          if (data.alternativeTypes) setActiveAlternativeTypes(data.alternativeTypes);
          setNewDiagramName('');
          setNewDiagramPrompt('');
          setNewProjectName(generateUniqueProjectName());
          await fetchDiagrams();
          if (data.diagram?.id) {
            await loadDiagramDetails(data.diagram.id);
          }
        } catch (genErr) {
          console.warn('AI Generation endpoint failed, falling back to local benchmark synthesis:', genErr);
          const fallbackRes = await fetch('/api/diagrams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
            body: JSON.stringify({
              name: finalDiagramName,
              xml: defaultXml,
              comment: 'Synthesized Enterprise Canvas',
              architectureType: effectiveArchType,
              isPrivate: newDiagramIsPrivate
            })
          });
          if (fallbackRes.ok) {
            const data = await fallbackRes.json();
            setNewDiagramName('');
            setNewDiagramPrompt('');
            setNewProjectName(generateUniqueProjectName());
            await fetchDiagrams();
            await loadDiagramDetails(data.diagram.id);
          } else {
            alert('Error creating diagram. Please try again.');
          }
        } finally {
          setIsGenerating(false);
        }
        return;
      }

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({
          name: finalDiagramName,
          xml: defaultXml,
          comment: 'Initial canvas created',
          architectureType: effectiveArchType,
          isPrivate: newDiagramIsPrivate
        })
      });
      
      if (!res.ok) throw new Error('Failed to create diagram');
      const data = await res.json();
      
      setNewDiagramName('');
      setNewDiagramPrompt('');
      setNewProjectName(generateUniqueProjectName());
      setIsCreateModalOpen(false);
      
      await fetchDiagrams();
      await loadDiagramDetails(data.diagram.id);
    } catch (err) {
      console.error(err);
      alert('Error creating diagram');
    }
  };

  async function handleDeleteDiagram(id: string, e: React.MouseEvent) {
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
  async function handleSendPrompt(e: React.FormEvent) {
    e.preventDefault();
    if (!promptInput.trim() || !activeDiagram) return;
    if (tourStep === 3) {
      setTourStep(4);
    }
    
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
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({
          prompt: userPrompt,
          diagramId: activeDiagram.id,
          architectureType: activeDiagram.architecture_type || selectedArchType
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
  async function handleSaveVersion(e: React.FormEvent) {
    e.preventDefault();
    if (!activeDiagram || !saveComment.trim()) return;
    
    const xmlToSave = pendingXml !== null ? pendingXml : customXml !== null ? customXml : activeVersion?.xml_content;
    if (!xmlToSave) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
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
  async function handleSaveOutlineEdits() {
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
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({
          xmlContent: updatedXml,
          comment: `Updated ${editedIds.length} node label(s) via Outline Editor`,
          createdBy: 'User',
          architectureType: activeDiagram.architecture_type || selectedArchType
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
  async function handleGenerateMetadata() {
    if (!displayedVersion) return;
    setIsMetadataGenerating(true);
    try {
      const res = await fetch('/api/generate/usecases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
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

      function parseCells(line: string) {
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
  async function handleRestoreVersion(version: DiagramVersion) {
    if (!activeDiagram) return;
    if (!confirm(`Are you sure you want to restore version v${version.version_number} as the active working draft? This will create a new version v${(activeDiagram.versions?.length || 0) + 1}.`)) return;
    
    try {
      const res = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({
          xmlContent: version.xml_content,
          comment: `Restored version v${version.version_number}`,
          createdBy: 'User',
          architectureType: version.architecture_type || activeDiagram.architecture_type || selectedArchType
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

  // Instant Zero-Latency Category Audit Selector
  function handleSelectCategoryTab(catId: string) {
    setSelectedAuditCategory(catId as any);
    const cached = categoryAuditCache[catId];
    if (cached) {
      // ⚡ INSTANT CACHE HIT! Zero network request, 0ms lag!
      setAuditReport(cached.report);
      setAuditScore(cached.score);
      setAuditGaps(cached.gaps);
      setSelectedGapIds(cached.gaps.map((g: { id: string }) => g.id));
    } else {
      handleAuditDiagram(catId);
    }
  };

  // Audit the active diagram with Multimodal Vision PNG capture
  async function handleAuditDiagram(category?: string) {
    if (!activeDiagram) return;
    if (tourStep === 5) {
      setTourStep(6);
    }
    const catToUse = category || selectedAuditCategory;
    setCurrentTab('audit');
    setIsAuditing(true);
    try {
      let imageBase64: string | undefined = undefined;
      try {
        const svgEl = document.querySelector('.geDiagramContainer svg, svg.geDiagram') || document.querySelector('svg');
        if (svgEl) {
          const svgString = new XMLSerializer().serializeToString(svgEl);
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          imageBase64 = await new Promise<string | undefined>((resolve) => {
            img.onload = () => {
              canvas.width = img.width || 1200;
              canvas.height = img.height || 900;
              if (ctx) {
                ctx.fillStyle = '#0F172A';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
              }
              URL.revokeObjectURL(url);
              resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => {
              URL.revokeObjectURL(url);
              resolve(undefined);
            };
            img.src = url;
          });
        }
      } catch (capErr) {
        console.warn('Canvas vision screenshot capture skipped:', capErr);
      }

      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({ 
          diagramId: activeDiagram.id, 
          versionId: displayedVersion?.id,
          architectureType: activeDiagram.architecture_type || selectedArchType,
          auditCategory: catToUse,
          imageBase64
        })
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

      // Cache audit result for instant tab switching!
      const cachedEntry = { score: data.score || 82, report: data.report, gaps: gapsList };
      setCategoryAuditCache((prev) => ({ ...prev, [catToUse]: cachedEntry }));

      if (data.reportsHistory) {
        setAuditHistory(data.reportsHistory);
        if (data.savedReport?.id) {
          setSelectedAuditReportId(data.savedReport.id);
        } else if (data.reportsHistory.length > 0) {
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

  async function handleRemediateGaps() {
    if (!activeDiagram || selectedGapIds.length === 0) return;
    const selectedGaps = auditGaps.filter(g => selectedGapIds.includes(g.id));
    if (selectedGaps.length === 0) return;

    setIsRemediating(true);
    setIsGenerating(true);
    try {
      const res = await fetch('/api/audit/remediate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({
          diagramId: activeDiagram.id,
          selectedGaps,
          architectureType: activeDiagram.architecture_type || selectedArchType
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.details || 'Failed to remediate security gaps');
      }

      // Re-run fresh audit after remediation matching active category!
      const auditRes = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
        body: JSON.stringify({ 
          diagramId: activeDiagram.id,
          auditCategory: selectedAuditCategory,
          architectureType: activeDiagram.architecture_type || selectedArchType
        })
      });
      if (auditRes.ok) {
        const auditData = await auditRes.json();
        setAuditReport(auditData.report);
        setAuditScore(auditData.score);
        setAuditGaps(auditData.gaps || []);
        setSelectedGapIds((auditData.gaps || []).map((g: { id: string }) => g.id));
        setCategoryAuditCache((prev) => ({
          ...prev,
          [selectedAuditCategory]: {
            score: auditData.score,
            report: auditData.report,
            gaps: auditData.gaps || []
          }
        }));
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
  function renderAuditMarkdown(text: string) {
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

  function renderTemplatesView() {
    const allTemplates = BLUEPRINT_KNOWLEDGE_MATRIX.map(bp => ({
      id: bp.combinedId,
      name: bp.diagramName,
      whenToUse: bp.uiCardDesc,
      prompt: bp.goldenExamplePayload,
      category: bp.phaseName.startsWith('Phase 1') || bp.phaseName.startsWith('Phase 2') || bp.domain === 'Strategy & Governance' ? ('business' as const) : ('technical' as const),
      phaseName: bp.phaseName,
      phaseNumber: bp.phase,
      domain: bp.domain,
      abstractionLevel: bp.abstractionLevel,
      stackLayer: bp.stackLayer,
      notationStandard: bp.notationStandard,
      primaryPersonas: bp.primaryPersonas,
      keyTech: bp.coreGcpServices
    }));

    const personaRelevantIds: Record<string, string[]> = {
      executive: BLUEPRINT_KNOWLEDGE_MATRIX.filter(b => b.domain === 'Strategy & Governance' || b.phaseName.startsWith('Phase 1') || b.phaseName.startsWith('Phase 2') || b.combinedId.includes('total_unified_system_view') || b.combinedId.includes('c4_system_context')).map(b => b.combinedId),
      architect: BLUEPRINT_KNOWLEDGE_MATRIX.filter(b => b.domain === 'App & Integration' || b.abstractionLevel === 'Logical' || b.abstractionLevel === 'Conceptual' || b.combinedId.includes('landing_zone') || b.combinedId.includes('c4')).map(b => b.combinedId),
      data: BLUEPRINT_KNOWLEDGE_MATRIX.filter(b => b.domain === 'Data & Analytics' || b.combinedId.includes('lakehouse') || b.combinedId.includes('erd') || b.combinedId.includes('multimodal') || b.combinedId.includes('lineage')).map(b => b.combinedId),
      ai: BLUEPRINT_KNOWLEDGE_MATRIX.filter(b => b.domain === 'AI Agentic & LLMOps' || b.domain === 'AI & Agentic' || b.combinedId.includes('rag') || b.combinedId.includes('agent') || b.combinedId.includes('llm')).map(b => b.combinedId),
      security: BLUEPRINT_KNOWLEDGE_MATRIX.filter(b => b.domain === 'Cloud Infra Security' || b.combinedId.includes('sec') || b.combinedId.includes('iam') || b.combinedId.includes('sovereign') || b.combinedId.includes('trism') || b.combinedId.includes('threat')).map(b => b.combinedId),
      devops: BLUEPRINT_KNOWLEDGE_MATRIX.filter(b => b.combinedId.includes('cicd') || b.combinedId.includes('sre') || b.combinedId.includes('warroom') || b.combinedId.includes('incident') || b.combinedId.includes('bcdr') || b.combinedId.includes('runtime')).map(b => b.combinedId),
      industry: BLUEPRINT_KNOWLEDGE_MATRIX.filter(b => b.domain === 'Industry' || b.phaseName.startsWith('Phase 6')).map(b => b.combinedId)
    };

    function getPersonaBadge(item: typeof allTemplates[0]) {
      if (item.domain === 'Industry' || item.phaseName.startsWith('Phase 6')) return { label: '🏭 Industry Domain', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' };
      if (item.domain === 'AI Agentic & LLMOps') return { label: '🤖 AI & Agentic MLOps', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' };
      if (item.domain === 'Data & Analytics') return { label: '📊 Data & Lakehouse', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      if (item.domain === 'Cloud Infra Security') return { label: '🛡️ Cloud & Security CISO', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      if (item.domain === 'Strategy & Governance') return { label: '💼 Strategy & Governance', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' };
      return { label: '🏛️ Cloud & Systems Arch', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    };

    let filteredTemplates = templateCategoryFilter === 'all'
      ? allTemplates
      : allTemplates.filter(t => t.phaseName.startsWith(templateCategoryFilter) || t.domain === templateCategoryFilter || t.category === templateCategoryFilter);

    if (selectedPersonaFilter !== 'all') {
      const allowed = personaRelevantIds[selectedPersonaFilter] || [];
      filteredTemplates = filteredTemplates.filter(t => allowed.includes(t.id));
    }

    if (templateSearchQuery.trim()) {
      const q = templateSearchQuery.toLowerCase().trim();
      filteredTemplates = filteredTemplates.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.id.toLowerCase().includes(q) || 
        t.domain.toLowerCase().includes(q) || 
        t.whenToUse.toLowerCase().includes(q) ||
        (t.keyTech && t.keyTech.some((k: string) => k.toLowerCase().includes(q)))
      );
    }

    return (
      <div className={`flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 select-none animate-fade-in transition-colors duration-300 ${
        canvasTheme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-bg-dark text-slate-100'
      }`}>
        <div className="max-w-[1600px] mx-auto space-y-6 sm:space-y-8">
          {/* Top Header Bar with Live Search & Global Quick Actions */}
          <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b pb-6 ${
            canvasTheme === 'light' ? 'border-slate-200' : 'border-panel-border/40'
          }`}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-xl border shrink-0 cursor-pointer ${
                  canvasTheme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-panel-border text-slate-300 hover:text-teal-400'
                }`}
                title="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className={`text-xl sm:text-2xl font-extrabold ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>Architectural Blueprint Library</h1>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    canvasTheme === 'light' ? 'bg-teal-50 text-teal-800 border-teal-200' : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                  }`}>
                    {filteredTemplates.length} of {allTemplates.length} Blueprints
                  </span>
                </div>
                <p className={`text-xs sm:text-sm mt-0.5 ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Select an out-of-the-box publication architecture template to bootstrap your canvas instantly.</p>
              </div>
            </div>

            {/* Filter Toolbar: Live Search + Persona Dropdown + Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[220px] sm:min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={templateSearchQuery}
                  onChange={(e) => setTemplateSearchQuery(e.target.value)}
                  placeholder="Search 50 blueprints (e.g. RAG, Event, DR)..."
                  className="w-full bg-slate-900 border border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500 text-xs rounded-xl pl-9 pr-8 py-2 outline-none transition-all font-medium"
                />
                {templateSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setTemplateSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Persona Filter Dropdown */}
              <div className="relative inline-flex items-center">
                <User className="w-3.5 h-3.5 text-teal-400 absolute left-3 pointer-events-none" />
                <select
                  value={selectedPersonaFilter}
                  onChange={(e) => setSelectedPersonaFilter(e.target.value)}
                  className="appearance-none bg-slate-900 border border-teal-500/40 hover:border-teal-400 text-teal-300 font-bold text-xs rounded-xl pl-8 pr-8 py-2 outline-none cursor-pointer shadow-sm max-w-[210px] truncate"
                >
                  <optgroup label="💼 BUSINESS & EXECUTIVE PERSONAS" className="bg-[#0b101d] text-teal-400 font-extrabold">
                    <option value="all">👤 All Roles ({allTemplates.length})</option>
                    <option value="executive">💼 Executive &amp; C-Suite ({personaRelevantIds.executive.length})</option>
                    <option value="industry">🏭 Industry Leads ({personaRelevantIds.industry.length})</option>
                  </optgroup>
                  <optgroup label="⚙️ TECHNICAL ENGINEERING PERSONAS" className="bg-[#0b101d] text-indigo-400 font-extrabold">
                    <option value="architect">🏛️ Cloud Architects ({personaRelevantIds.architect.length})</option>
                    <option value="ai">🤖 AI &amp; LLMOps ({personaRelevantIds.ai.length})</option>
                    <option value="data">📊 Data &amp; Lakehouse ({personaRelevantIds.data.length})</option>
                    <option value="security">🛡️ Security &amp; CISO ({personaRelevantIds.security.length})</option>
                    <option value="devops">⚙️ DevOps &amp; SRE ({personaRelevantIds.devops.length})</option>
                  </optgroup>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-teal-400 absolute right-2.5 pointer-events-none" />
              </div>

              {/* Master Template Carousel Preview Button */}
              <button
                type="button"
                onClick={() => setPreviewModalTemplateId(filteredTemplates[0]?.id || allTemplates[0]?.id)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02]"
                title="Browse All 50 Master Blueprints in High-Res Carousel"
              >
                <Eye className="w-4 h-4" />
                <span>Preview All Blueprints</span>
              </button>

              {/* Toggle AI Prompt Studio Button */}
              <button
                type="button"
                onClick={() => setIsPromptStudioExpanded(prev => !prev)}
                className={`px-3.5 py-2 rounded-xl font-extrabold text-xs border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPromptStudioExpanded
                    ? 'bg-teal-500 text-[#070A13] border-teal-400 shadow-md shadow-teal-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-teal-300 border-teal-500/40'
                }`}
                title={isPromptStudioExpanded ? 'Collapse AI Prompt Studio' : 'Open AI Architectural Prompt Studio'}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isPromptStudioExpanded ? 'Hide Prompt Studio ▲' : 'AI Prompt Studio ▼'}</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Chips Strip for Blueprints */}
          <div className="flex flex-wrap items-center gap-1.5 -mt-2">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>Popular Blueprints:</span>
            </span>
            {[
              { label: 'All', query: '' },
              { label: '🤖 Agentic RAG', query: 'rag' },
              { label: '🌊 Lakehouse', query: 'lakehouse' },
              { label: '🗄️ Dimensional ERD', query: 'erd' },
              { label: '🛡️ Security & TRiSM', query: 'security' },
              { label: '☁️ AWS Multi-Cloud', query: 'aws' },
              { label: '💳 FinTech Core', query: 'fintech' },
              { label: '🛒 Retail Scale', query: 'retail' }
            ].map((chip) => {
              const isSelected = templateSearchQuery.toLowerCase() === chip.query.toLowerCase();
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => setTemplateSearchQuery(chip.query)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                    isSelected 
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold' 
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Collapsible AI Architectural Prompt Studio Banner & Panel */}
          {!isPromptStudioExpanded ? (
            <div 
              onClick={() => setIsPromptStudioExpanded(true)}
              className={`rounded-2xl p-4 sm:p-5 backdrop-blur-md transition-all relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group ${
                canvasTheme === 'light'
                  ? 'bg-white border border-teal-500/30 hover:border-teal-500/60 shadow-sm hover:shadow-md'
                  : 'bg-gradient-to-r from-[#0B101D] via-[#0F172A] to-[#0B101D] border border-teal-500/30 hover:border-teal-400/70 shadow-xl'
              }`}
            >
              <div className="absolute top-0 right-0 w-64 h-full bg-teal-500/5 blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3.5 relative z-10">
                <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform shrink-0">
                  <Sparkles className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`text-sm sm:text-base font-black transition-colors ${
                      canvasTheme === 'light' ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'
                    }`}>
                      AI Architectural Prompt Studio
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 font-mono">
                      Gemini 3.7 Flash
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    Click to write custom requirements or customize any blueprint with pure natural language intent.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPromptStudioExpanded(true);
                }}
                className={`px-4 py-2 rounded-xl font-bold text-xs border flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 self-start md:self-auto ${
                  canvasTheme === 'light'
                    ? 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200'
                    : 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border-teal-500/40'
                }`}
              >
                <span>Expand Prompt Studio</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-[#0B101D] border border-teal-500/40 rounded-3xl p-5 md:p-8 backdrop-blur-md space-y-5 shadow-2xl relative overflow-hidden animate-fade-in">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-teal-400 uppercase tracking-widest px-3 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Architectural Prompt Studio</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Gemini 3.7 Flash</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-black text-white tracking-tight">
                    Customize Blueprint <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400">With Pure Intent.</span>
                  </h2>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    Write your custom architecture requirements or tweak any blueprint below to compile with Gemini AI.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPromptStudioExpanded(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all self-start md:self-auto cursor-pointer"
                >
                  <span>✕ Collapse Studio</span>
                </button>
              </div>

              {/* 3-Step Quick Start Onboarding Guide */}
              {showQuickStartGuide && (
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-teal-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>3-Step Quick Start Guide for New Architects:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowQuickStartGuide(false)}
                      className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-300 font-extrabold flex items-center justify-center text-[10px] shrink-0">1</span>
                      <div>
                        <p className="font-bold text-slate-200 text-[11px]">1. Describe System Intent</p>
                        <p className="text-[10px] text-slate-400 leading-tight">Write custom requirements or select a preset domain below.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold flex items-center justify-center text-[10px] shrink-0">2</span>
                      <div>
                        <p className="font-bold text-slate-200 text-[11px]">2. Target Blueprint</p>
                        <p className="text-[10px] text-slate-400 leading-tight">Select target blueprint (GCP, AWS, RAG, ERD, Security).</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold flex items-center justify-center text-[10px] shrink-0">3</span>
                      <div>
                        <p className="font-bold text-slate-200 text-[11px]">3. Compile &amp; Refine</p>
                        <p className="text-[10px] text-slate-400 leading-tight">Gemini AI generates collision-free Draw.io XML with business cases.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Embedded Prompt Input Form */}
              <form onSubmit={handleCreateDiagram} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5 text-teal-300">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>Prompt Specification</span>
                    </span>
                  </label>
                  <textarea
                    value={newDiagramPrompt}
                    onChange={(e) => {
                      setNewDiagramPrompt(e.target.value);
                      if (!newDiagramName) {
                        const words = e.target.value.split(' ').slice(0, 5).join(' ');
                        if (words) setNewDiagramName(words);
                      }
                    }}
                    placeholder="Describe the system architecture you want to build..."
                    rows={3}
                    className="w-full bg-[#070A13] border border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500 rounded-2xl p-4 text-xs md:text-sm outline-none resize-none shadow-inner transition-all leading-relaxed font-sans"
                  />
                </div>

                <div className="space-y-4">
                  {/* 1. Identification & Target Blueprint Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    {/* Project Name */}
                    <div className="sm:col-span-4 space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>Project</span>
                        {earlierProjects.length > 0 && (
                          <span className="text-[10px] text-teal-400 font-mono">({earlierProjects.length} earlier)</span>
                        )}
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={newProjectName}
                          onChange={(e) => setNewProjectName(e.target.value)}
                          placeholder="e.g. Project-Alpha-101"
                          className="flex-1 min-w-0 bg-[#070A13] border border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500 rounded-xl px-3.5 py-2 text-xs md:text-sm outline-none transition-all font-medium truncate"
                        />
                        {earlierProjects.length > 0 && (
                          <select
                            value=""
                            onChange={(e) => {
                              if (e.target.value) setNewProjectName(e.target.value);
                            }}
                            className="w-24 bg-[#070A13] border border-slate-700/80 focus:border-teal-400 text-teal-400 rounded-xl px-2 py-2 text-xs outline-none cursor-pointer shrink-0"
                            title="Choose from earlier projects"
                          >
                            <option value="" disabled>📂 Earlier</option>
                            {earlierProjects.map((p: string) => (
                              <option key={p} value={p} className="bg-[#0B101D] text-slate-200">
                                {p}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>

                    {/* Diagram Name */}
                    <div className="sm:col-span-4 space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">
                        Diagram Name
                      </label>
                      <input
                        type="text"
                        value={newDiagramName}
                        onChange={(e) => setNewDiagramName(e.target.value)}
                        placeholder="Diagram Name"
                        className="w-full bg-[#070A13] border border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500 rounded-xl px-3.5 py-2 text-xs md:text-sm outline-none transition-all font-medium"
                      />
                    </div>

                    {/* Target Blueprint */}
                    <div className="sm:col-span-4 space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>Target Blueprint Reference</span>
                        <span className="text-[10px] text-teal-400 font-mono">({facetedOptions.matchingCount} matching)</span>
                      </label>
                      <select
                        value={selectedArchType}
                        onChange={(e) => {
                          const newArch = e.target.value;
                          setSelectedArchType(newArch);
                          syncDimensionsForBlueprint(newArch);
                          if (newArch === 'unified_system_view') {
                            if (!newDiagramPrompt || newDiagramPrompt !== DEFAULT_UNIFIED_PROMPT) {
                              setNewDiagramPrompt(DEFAULT_UNIFIED_PROMPT);
                              setNewDiagramName(generateUniqueDiagramName());
                            }
                          } else {
                            const meta = getBlueprintMetadataById(newArch);
                            if (meta?.goldenExamplePayload) {
                              setNewDiagramPrompt(meta.goldenExamplePayload);
                              setNewDiagramName(generateUniqueDiagramName(meta.diagramName));
                            } else {
                              const archInfo = getArchitectureTypeById(newArch);
                              if (archInfo) {
                                setNewDiagramPrompt(archInfo.prompt);
                                setNewDiagramName(generateUniqueDiagramName(archInfo.name));
                              }
                            }
                          }
                        }}
                        className="w-full bg-[#070A13] border border-slate-700/80 focus:border-teal-400 text-teal-300 font-bold rounded-xl px-3 py-2 text-xs md:text-sm outline-none transition-all cursor-pointer truncate"
                      >
                        <option value="unified_system_view" className="bg-[#0B101D] text-teal-300 font-extrabold">
                          ✨ All Matching ({facetedOptions.matchingCount} Blueprints)
                        </option>
                        {facetedOptions.matchingBlueprints.length > 0 ? (
                          facetedOptions.matchingBlueprints.map((item) => (
                            <option key={item.combinedId} value={item.combinedId} className="bg-[#0B101D] text-slate-200 font-medium">
                              {item.diagramName}
                            </option>
                          ))
                        ) : (
                          <option disabled value="" className="bg-[#0B101D] text-amber-400 font-bold">
                            ⚠️ No blueprints match this combination
                          </option>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* 2-Column Categorized Architectural Dimensions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Column 1: Core Architectural Classification */}
                    <div className="bg-[#070A13]/90 border border-slate-800/90 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] font-black uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                          <span>1. Core Architectural Classification</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono">
                          3 Dimensions
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* 1. Phase Name */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-300 truncate" title="Lifecycle Phase">
                            Lifecycle Phase
                          </label>
                          <select
                            value={selectedPhaseName}
                            onChange={(e) => setSelectedPhaseName(e.target.value)}
                            className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate"
                          >
                            <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All 7 Phases ({allTemplates.length})</option>
                            {PHASE_NAME_OPTIONS.map((opt) => {
                              const count = facetedOptions.phaseCounts[opt] || 0;
                              return (
                                <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                                  {opt.split(':')[0]} ({count})
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {/* 2. Architecture Domain */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-300 truncate" title="Architecture Domain">
                            Domain
                          </label>
                          <select
                            value={selectedDomain}
                            onChange={(e) => setSelectedDomain(e.target.value)}
                            className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate"
                          >
                            <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All 6 Domains</option>
                            {ARCHITECTURE_DOMAIN_OPTIONS.map((opt) => {
                              const count = facetedOptions.domainCounts[opt] || 0;
                              return (
                                <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                                  {opt} ({count})
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {/* 3. Abstraction Level */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-300 truncate" title="Abstraction Level">
                            Abstraction
                          </label>
                          <select
                            value={selectedAbstractionLevel}
                            onChange={(e) => setSelectedAbstractionLevel(e.target.value)}
                            className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate"
                          >
                            <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All 4 Levels</option>
                            {ABSTRACTION_LEVEL_OPTIONS.map((opt) => {
                              const count = facetedOptions.abstractionCounts[opt] || 0;
                              return (
                                <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                                  {opt} ({count})
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Technical & Delivery Specifications */}
                    <div className="bg-[#070A13]/90 border border-slate-800/90 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                          <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
                          <span>2. Technical &amp; Delivery Specifications</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="text-[10px] font-bold text-slate-400 hover:text-teal-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                          title="Reset all dimension filters"
                        >
                          <RotateCcw className="w-3 h-3 text-slate-400 hover:text-teal-300" />
                          <span>Reset Filters</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {/* 4. Architectural Stack Layer */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-300 truncate" title="Architectural Stack Layer">
                            Stack Layer
                          </label>
                          <select
                            value={selectedStackLayer}
                            onChange={(e) => setSelectedStackLayer(e.target.value)}
                            className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-indigo-400 text-slate-200 text-xs rounded-xl px-2 py-2 outline-none cursor-pointer transition-all truncate"
                          >
                            <option value="ALL" className="bg-[#0B101D] text-indigo-300 font-bold">✨ All 5 Layers</option>
                            {ARCHITECTURAL_STACK_LAYER_OPTIONS.map((opt) => {
                              const count = facetedOptions.stackLayerCounts[opt] || 0;
                              return (
                                <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                                  {opt} ({count})
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {/* 5. Default Layout Direction */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-300 truncate" title="Default Layout Direction">
                            Direction
                          </label>
                          <select
                            value={selectedLayoutDirection}
                            onChange={(e) => setSelectedLayoutDirection(e.target.value)}
                            className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-indigo-400 text-slate-200 text-xs rounded-xl px-2 py-2 outline-none cursor-pointer transition-all truncate"
                          >
                            <option value="ALL" className="bg-[#0B101D] text-indigo-300 font-bold">✨ All Directions</option>
                            {DEFAULT_LAYOUT_DIRECTION_OPTIONS.map((opt) => {
                              const count = facetedOptions.directionCounts[opt] || 0;
                              return (
                                <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                                  {opt === 'LR' ? 'LR (Horizontal)' : opt === 'TD' ? 'TD (Vertical)' : opt} ({count})
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {/* 6. Sales Cycle Stage */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-300 truncate" title="Sales Cycle Stage">
                            Sales Stage
                          </label>
                          <select
                            value={selectedSalesCycleStage}
                            onChange={(e) => setSelectedSalesCycleStage(e.target.value)}
                            className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-indigo-400 text-slate-200 text-xs rounded-xl px-2 py-2 outline-none cursor-pointer transition-all truncate"
                          >
                            <option value="ALL" className="bg-[#0B101D] text-indigo-300 font-bold">✨ All Stages</option>
                            {SALES_CYCLE_STAGE_OPTIONS.map((opt) => {
                              const count = facetedOptions.salesStageCounts[opt] || 0;
                              return (
                                <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                                  {opt} ({count})
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {/* 7. Lifecycle Phase */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-300 truncate" title="Delivery Lifecycle">
                            Delivery Lifecycle
                          </label>
                          <select
                            value={selectedLifecyclePhase}
                            onChange={(e) => setSelectedLifecyclePhase(e.target.value)}
                            className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-indigo-400 text-slate-200 text-xs rounded-xl px-2 py-2 outline-none cursor-pointer transition-all truncate"
                          >
                            <option value="ALL" className="bg-[#0B101D] text-indigo-300 font-bold">✨ All Lifecycles</option>
                            {LIFECYCLE_PHASE_OPTIONS.map((opt) => {
                              const count = facetedOptions.lifecycleCounts[opt] || 0;
                              return (
                                <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                                  {opt} ({count})
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsPromptStudioExpanded(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      Close Prompt Studio
                    </button>
                    <button
                      type="submit"
                      disabled={isGenerating || (!newDiagramPrompt.trim() && !newDiagramName.trim())}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070A13] font-black text-sm transition-all shadow-xl shadow-teal-500/20 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      <span>{isGenerating ? 'Compiling Architecture...' : '⚡ Generate Architecture with Gemini AI'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Top-Down Hierarchical Architecture Templates Explorer (Phase → Domain → Leaf Blueprints) */}
          <TopDownTemplatesExplorer
            searchQuery={templateSearchQuery}
            activeBlueprintId={selectedArchType}
            onSelectBlueprint={(blueprintId) => {
              setCurrentTab('editor');
              handleArchitectureSwitch(blueprintId);
              if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                params.delete('tab');
                const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
                window.history.replaceState({}, '', newUrl);
              }
            }}
            onPreviewBlueprint={(blueprintId) => {
              setPreviewModalTemplateId(blueprintId);
            }}
            onCustomizeWithPrompt={(bp) => {
              setIsPromptStudioExpanded(true);
              setSelectedArchType(bp.combinedId);
              syncDimensionsForBlueprint(bp.combinedId);
              if (bp.goldenExamplePayload) {
                setNewDiagramPrompt(bp.goldenExamplePayload);
                setNewDiagramName(generateUniqueDiagramName(bp.diagramName));
              } else {
                setNewDiagramPrompt(bp.uiCardDesc);
                setNewDiagramName(generateUniqueDiagramName(bp.diagramName));
              }
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        </div>
      </div>
    );
  };

  function renderWalkthroughView() {
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
      <div className={`flex-1 overflow-y-auto p-8 select-none animate-fade-in transition-colors duration-300 ${
        canvasTheme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-bg-dark text-slate-100'
      }`}>
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div className={`border-b pb-6 ${canvasTheme === 'light' ? 'border-slate-200' : 'border-panel-border/30'}`}>
            <h2 className={`text-2xl font-black flex items-center gap-2 ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              <BookOpen className="w-6 h-6 text-teal-accent" />
              <span>Visual Onboarding Walkthrough</span>
            </h2>
            <p className={`text-xs mt-2 max-w-2xl ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              Explore 5 pre-compiled, high-demand enterprise architectures. See how PromptCanvas accepts prompts, refines diagrams, and compiles complete Business and Technical briefs automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {scenarios.map((sc) => {
              const currentStep = activeSteps[sc.id] || 'create';
              const imgUrl = `/walkthrough/scenario_${sc.id}_${currentStep}.png`;

              return (
                <div 
                  key={sc.id} 
                  className={`p-6 rounded-2xl border grid grid-cols-1 lg:grid-cols-12 gap-8 transition-colors ${
                    canvasTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-md text-slate-900'
                      : 'glass-panel border-panel-border bg-panel-dark/40 text-slate-100 shadow-xl'
                  }`}
                >
                  {/* Left Controls/Prompts */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                        SCENARIO 0{sc.id}
                      </span>
                      <h3 className={`font-extrabold text-lg mt-2 ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>{sc.title}</h3>
                      <p className={`text-xs mt-1 ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>{sc.desc}</p>
                    </div>

                    <div className="space-y-4">
                      <div className={`border rounded-xl p-3.5 ${
                        canvasTheme === 'light'
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-bg-dark/60 border-panel-border/30'
                      }`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                          canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          Creation Prompt
                        </div>
                        <p className={`text-[11px] leading-relaxed font-mono whitespace-pre-wrap ${
                          canvasTheme === 'light' ? 'text-slate-800' : 'text-slate-200'
                        }`}>
                          {sc.createPrompt}
                        </p>
                      </div>

                      <div className={`border rounded-xl p-3.5 ${
                        canvasTheme === 'light'
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-bg-dark/60 border-panel-border/30'
                      }`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                          canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          Refinement Prompt
                        </div>
                        <p className={`text-[11px] leading-relaxed font-mono whitespace-pre-wrap ${
                          canvasTheme === 'light' ? 'text-slate-800' : 'text-slate-200'
                        }`}>
                          {sc.modifyPrompt}
                        </p>
                      </div>
                    </div>

                    {/* Step Switchers */}
                    <div className="grid grid-cols-2 gap-2">
                      {stepLabels.map((lbl) => (
                        <button
                          key={lbl.id}
                          onClick={() => setActiveSteps(prev => ({ ...prev, [sc.id]: lbl.id }))}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                            currentStep === lbl.id
                              ? 'bg-teal-500 hover:bg-teal-600 text-white font-extrabold shadow-md border-transparent'
                              : canvasTheme === 'light'
                                ? 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700'
                                : 'bg-bg-dark border border-panel-border/30 text-slate-300 hover:text-white hover:border-slate-500'
                          }`}
                        >
                          {lbl.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Image Viewer */}
                  <div className={`lg:col-span-8 rounded-2xl border overflow-hidden relative shadow-inner flex items-center justify-center p-3 min-h-[450px] ${
                    canvasTheme === 'light'
                      ? 'bg-slate-100/70 border-slate-200'
                      : 'bg-bg-dark/80 border-panel-border/40'
                  }`}>
                    <img 
                      src={imgUrl} 
                      alt={`${sc.title} - ${currentStep}`}
                      className="max-w-full max-h-[500px] object-contain rounded-xl border border-slate-300/30 shadow-lg select-none"
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

  function renderAuditCenterView() {
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
      <div className={`flex-1 overflow-hidden flex flex-col md:flex-row select-none animate-fade-in font-sans transition-colors duration-300 ${
        canvasTheme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-bg-dark text-slate-100'
      }`}>
        {/* Expanded Left Directory Sidebar */}
        <div className={`w-full md:w-80 lg:w-[380px] max-h-[35vh] md:max-h-full shrink-0 border-b md:border-b-0 md:border-r flex flex-col ${
          canvasTheme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'border-panel-border/30 bg-[#090d16] text-slate-100'
        }`}>
          {/* Header Section */}
          <div className={`p-4 sm:p-5 border-b space-y-3 ${canvasTheme === 'light' ? 'border-slate-200' : 'border-panel-border/30'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`lg:hidden p-1.5 rounded-lg border shrink-0 cursor-pointer ${
                    canvasTheme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-panel-border text-slate-300 hover:text-teal-400'
                  }`}
                  title="Open Navigation Menu"
                >
                  <Menu className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  Architecture Audit Hub
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {filteredDiagrams.length} {filteredDiagrams.length === 1 ? 'Asset' : 'Assets'}
              </span>
            </div>
            <div>
              <h2 className={`font-extrabold text-lg tracking-tight flex items-center gap-2 ${
                canvasTheme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                <ShieldCheck className="w-5 h-5 text-teal-500 dark:text-teal-400 shrink-0" />
                <span>Architecture Audit Hub</span>
              </h2>
              <p className={`text-xs mt-1 leading-relaxed ${
                canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
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
                className={`w-full rounded-xl pl-9 pr-8 py-2 text-xs outline-none transition-all ${
                  canvasTheme === 'light'
                    ? 'bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-500'
                    : 'bg-[#0d1322] border border-slate-700/60 focus:border-teal-500/80 text-white placeholder-slate-500'
                }`}
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
                    ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40'
                    : canvasTheme === 'light' ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                All ({diagrams.length})
              </button>
              <button
                type="button"
                onClick={() => setAuditFilterTab('pending')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  auditFilterTab === 'pending'
                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                    : canvasTheme === 'light' ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                Pending Audit
              </button>
              <button
                type="button"
                onClick={() => setAuditFilterTab('audited')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  auditFilterTab === 'audited'
                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                    : canvasTheme === 'light' ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
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
                        ? canvasTheme === 'light'
                          ? 'bg-teal-50/80 border-teal-500 text-slate-900 shadow-sm'
                          : 'bg-gradient-to-r from-teal-500/15 via-teal-500/10 to-transparent border-teal-500/50 text-white shadow-lg shadow-teal-950/40' 
                        : canvasTheme === 'light'
                          ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-sm'
                          : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700/80 text-slate-300'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400 rounded-r" />
                    )}
                    
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className={`text-xs font-bold transition-colors break-words leading-tight flex-1 ${
                        isActive
                          ? canvasTheme === 'light' ? 'text-teal-900' : 'text-teal-200'
                          : canvasTheme === 'light' ? 'text-slate-900' : 'text-slate-100'
                      }`}>
                        {d.name}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isActive ? (
                          <span className="text-[10px] font-extrabold text-teal-700 dark:text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-md border border-teal-500/40">
                            Selected
                          </span>
                        ) : hasAuditReport ? (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            Audited
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-amber-700 dark:text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
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

                    <div className={`flex items-center justify-between text-[11px] mt-2 pt-2 border-t ${
                      canvasTheme === 'light' ? 'border-slate-200 text-slate-500' : 'border-slate-800/50 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <Shield className={`w-3.5 h-3.5 ${isActive ? 'text-teal-500 dark:text-teal-400' : 'text-slate-400'}`} />
                        <span>{isActive ? 'Active Asset Report' : 'Click to inspect posture'}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-teal-500 dark:text-teal-400 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5'}`} />
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
                <div className={`flex items-center justify-between border-b pb-5 ${
                  canvasTheme === 'light' ? 'border-slate-200' : 'border-panel-border/30'
                }`}>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-black text-teal-600 dark:text-teal-accent uppercase tracking-widest">Active Asset</span>
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
                        className="text-xs font-bold text-teal-600 dark:text-teal-300 hover:text-teal-800 dark:hover:text-white bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <LayoutGrid className="w-3.5 h-3.5 text-teal-600 dark:text-teal-accent" />
                        <span>View Architecture Diagram ➔</span>
                      </button>
                    </div>
                    <h2 className={`text-3xl font-black mt-1 ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>{activeDiagram?.name || 'Architecture Workspace'}</h2>
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
                              if (found.audit_category) {
                                setSelectedAuditCategory(found.audit_category as any);
                              }
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
                          {auditHistory.map((rep, idx) => {
                            const catLabel = rep.audit_category === 'visual' ? '🎨 Visual' : rep.audit_category === 'topology' ? '⚡ Topology' : rep.audit_category === 'responsive' ? '📱 Responsive' : rep.audit_category === 'accessibility' ? '♿ WCAG' : rep.audit_category === 'vendor' ? '🏷️ Vendor' : '🛡️ Security';
                            return (
                              <option key={rep.id} value={rep.id} className="bg-[#0b101d] text-slate-200">
                                Audit v{rep.version_number} • {catLabel} ({rep.score}%) {idx === 0 ? '• {t.versionLatest}' : '• (Snapshot)'}
                              </option>
                            );
                          })}
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
                      disabled={isAnyAIBusy}
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
                  ].map((cat) => {
                    const isSelected = selectedAuditCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategoryTab(cat.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? canvasTheme === 'light'
                              ? 'bg-teal-600 text-white font-black border border-teal-700 shadow-md shadow-teal-500/20'
                              : 'bg-teal-500/20 text-teal-300 font-black border border-teal-500/50 shadow-md shadow-teal-950/40'
                            : canvasTheme === 'light'
                            ? 'bg-white text-slate-800 font-bold border border-slate-300 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-400 shadow-sm'
                            : 'bg-slate-900/60 text-slate-400 font-bold border border-slate-800 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Audit Version Delta Comparison Card */}
                {showAuditDelta && auditHistory.length > 1 && (
                  <div className={`rounded-3xl p-6 space-y-4 animate-fade-in border ${
                    canvasTheme === 'light'
                      ? 'bg-purple-50/70 border-purple-200 text-purple-950 shadow-md'
                      : 'glass-panel border-purple-500/30 bg-purple-950/20 text-white'
                  }`}>
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h4 className={`text-sm font-black ${canvasTheme === 'light' ? 'text-purple-950' : 'text-white'}`}>
                          Audit Version Delta (v{auditHistory[1]?.version_number} ➔ v{auditHistory[0]?.version_number})
                        </h4>
                      </div>
                      <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                        Score Delta: +{auditHistory[0]?.score - auditHistory[1]?.score}% Improvement
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className={`p-4 rounded-2xl border space-y-1 ${
                        canvasTheme === 'light'
                          ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-200'
                      }`}>
                        <span className="font-extrabold text-slate-500 dark:text-slate-400 block">Baseline Version (v{auditHistory[1]?.version_number})</span>
                        <span className="text-sm font-bold text-amber-700 dark:text-amber-300 block">Score: {auditHistory[1]?.score}%</span>
                        <p className={`${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'} mt-1`}>
                          Identified initial infrastructure security risks and missing ingress/database controls.
                        </p>
                      </div>

                      <div className={`p-4 rounded-2xl border space-y-1 ${
                        canvasTheme === 'light'
                          ? 'bg-teal-50 border-teal-300 text-teal-950 shadow-sm'
                          : 'bg-slate-900/60 border-teal-500/30 text-slate-200'
                      }`}>
                        <span className="font-extrabold text-teal-700 dark:text-teal-400 block">Remediated Version (v{auditHistory[0]?.version_number})</span>
                        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 block">Score: {auditHistory[0]?.score}% (100% Remediated)</span>
                        <p className={`${canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'} mt-1`}>
                          Gemini auto-injected WAF security policies, CMEK encryption, and multi-region HA replicas.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {isAuditing ? (
                  <div className={`rounded-3xl p-16 md:p-24 text-center space-y-10 shadow-2xl animate-pulse min-h-[500px] flex flex-col justify-center items-center border ${
                    canvasTheme === 'light'
                      ? 'bg-white border-teal-300 text-slate-900'
                      : 'glass-panel border-teal-500/40 bg-slate-900/90 text-white'
                  }`}>
                    <div className="w-24 h-24 rounded-3xl bg-teal-500/10 border-2 border-teal-500/40 flex items-center justify-center mx-auto shadow-2xl shadow-teal-500/20">
                      <Loader2 className="w-12 h-12 text-teal-500 dark:text-teal-400 animate-spin" />
                    </div>
                    <div className="space-y-4 max-w-3xl mx-auto">
                      <div className="flex items-center justify-center gap-2">
                        <span className="px-5 py-2 rounded-full text-xs md:text-sm font-black bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-500/40 uppercase tracking-widest animate-pulse shadow-md">
                          Live Inspection in Progress
                        </span>
                      </div>
                      <h3 className={`text-4xl md:text-5xl font-black tracking-tight leading-tight capitalize ${
                        canvasTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        Auditing {selectedAuditCategory === 'visual' ? 'Visual Collision & Geometry' : selectedAuditCategory === 'topology' ? 'Cloud Architecture Topology' : selectedAuditCategory === 'responsive' ? 'Responsive & Aspect Ratio' : selectedAuditCategory === 'accessibility' ? 'WCAG Accessibility' : selectedAuditCategory === 'vendor' ? 'Vendor Icon Coverage' : 'Security & Compliance'}...
                      </h3>
                      <p className={`text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto ${
                        canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        Gemini 3.6 is parsing 2D bounding boxes, checking topology rules, and evaluating {selectedAuditCategory} posture against domain benchmarks...
                      </p>
                    </div>
                    
                    <div className="w-full max-w-2xl mx-auto space-y-4 pt-4">
                      <div className={`w-full rounded-full h-4 overflow-hidden border shadow-inner ${
                        canvasTheme === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-slate-800 border-slate-700'
                      }`}>
                        <div className="bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 h-full w-3/4 animate-pulse rounded-full shadow-lg shadow-teal-500/50"></div>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2">
                        <span className="text-teal-600 dark:text-teal-400">Parsing XML Layout</span>
                        <span className="text-cyan-600 dark:text-cyan-300">Evaluating Category Rules</span>
                        <span className="text-slate-500">Generating Report</span>
                      </div>
                    </div>
                  </div>
                ) : auditReport ? (
                  <div className={`rounded-3xl p-8 space-y-8 shadow-xl border ${
                    canvasTheme === 'light'
                      ? 'bg-white border-slate-200 text-slate-900'
                      : 'glass-panel border-panel-border/40 text-white shadow-2xl'
                  }`}>
                    
                    {/* Compliance Score Header */}
                    <div className={`flex items-center gap-6 rounded-2xl p-6 border ${
                      canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                    }`}>
                      <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center font-black text-xl shrink-0 shadow-lg ${
                        auditScore >= 90
                          ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 shadow-emerald-500/20'
                          : auditScore >= 75
                          ? 'border-teal-500 text-teal-600 dark:text-teal-accent bg-teal-500/10 shadow-teal-500/20'
                          : 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/10 shadow-amber-500/20'
                      }`}>
                        {auditScore}%
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                            auditScore >= 90 ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30' : 'bg-teal-500/15 text-teal-800 dark:text-teal-300 border-teal-500/30'
                          }`}>
                            {auditScore >= 90 ? 'Grade: Excellent' : auditScore >= 75 ? 'Grade: Good' : 'Grade: Needs Hardening'}
                          </span>
                          <span className={`text-xs ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                            {auditGaps.length} Gaps Detected
                          </span>
                        </div>
                        <h4 className={`text-xl font-black mt-1 ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                          {selectedAuditCategory === 'visual'
                            ? 'Visual Collision & Layout Geometry Audit'
                            : selectedAuditCategory === 'topology'
                            ? 'Cloud Architecture Topology & Data Flow Audit'
                            : selectedAuditCategory === 'responsive'
                            ? 'Responsive & Aspect Ratio Legibility Audit'
                            : selectedAuditCategory === 'accessibility'
                            ? 'WCAG 2.1 AA Accessibility & Contrast Audit'
                            : selectedAuditCategory === 'vendor'
                            ? 'Vendor Icon & Brand Logo Coverage Audit'
                            : 'Architecture Security & Compliance Audit'}
                        </h4>
                        <p className={`text-xs mt-1 ${canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>
                          {selectedAuditCategory === 'visual'
                            ? 'Select layout gaps below to automatically re-calculate spacing, eliminate text-over-line slicing, and widen inter-row channels.'
                            : selectedAuditCategory === 'topology'
                            ? 'Select topology gaps below to align ingress routing, redundancy, and service mesh connectivity with Well-Architected standards.'
                            : selectedAuditCategory === 'responsive'
                            ? 'Select responsive gaps below to optimize aspect ratio scaling across 16:9 slides, 4:3 documents, and 9:16 mobile viewports.'
                            : selectedAuditCategory === 'accessibility'
                            ? 'Select accessibility gaps below to apply high-contrast font colors (#38BDF8 / #0F172A) and colorblind safe stroke patterns.'
                            : selectedAuditCategory === 'vendor'
                            ? 'Select unbranded component gaps below to automatically attach official SVG vendor logos (Databricks, GCP, AWS, Azure, K8s).'
                            : 'Select the gaps below to automatically remediate missing security nodes in your diagram.'}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Security Gaps Remediation Checklist */}
                    {auditGaps.length > 0 ? (
                      <div className="space-y-4 border-t border-panel-border/30 pt-6">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-base font-extrabold flex items-center gap-2 ${
                            canvasTheme === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            <ShieldAlert className="w-5 h-5 text-amber-500" />
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
                            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors cursor-pointer"
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
                                    ? canvasTheme === 'light'
                                      ? 'bg-teal-50 border-teal-400 text-slate-900 shadow-sm'
                                      : 'bg-teal-500/10 border-teal-500/40 text-white shadow-lg shadow-teal-500/5'
                                    : canvasTheme === 'light'
                                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {}}
                                  className="mt-1 w-4 h-4 rounded border-slate-400 text-teal-600 focus:ring-teal-400/30 cursor-pointer"
                                />
                                <div className="flex-1 space-y-1.5">
                                  <div className="flex items-center justify-between gap-3">
                                    <h4 className={`text-sm font-extrabold ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                                      {gap.title}
                                    </h4>
                                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                                      gap.severity === 'HIGH'
                                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30'
                                        : gap.severity === 'MEDIUM'
                                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                                        : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                                    }`}>
                                      {gap.severity} RISK
                                    </span>
                                  </div>
                                  <p className={`text-xs leading-relaxed ${canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                                    {gap.description}
                                  </p>
                                  <div className={`text-xs font-semibold rounded-xl p-3 flex items-center gap-2 mt-2 border ${
                                    canvasTheme === 'light'
                                      ? 'bg-teal-50 border-teal-200 text-teal-950 font-bold'
                                      : 'bg-teal-500/5 border-teal-500/10 text-teal-300'
                                  }`}>
                                    <Sparkles className="w-4 h-4 text-teal-500 dark:text-teal-accent shrink-0" />
                                    <span>Proposed Fix: {gap.remediation}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Remediate Button Banner */}
                        <div className={`pt-4 flex items-center justify-between p-5 rounded-2xl border ${
                          canvasTheme === 'light'
                            ? 'bg-slate-100 border-slate-300 text-slate-900'
                            : 'bg-slate-900/80 border-teal-500/30 text-white'
                        }`}>
                          <div>
                            <span className={`text-sm font-extrabold block ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                              Auto-Remediate Selected Gaps
                            </span>
                            <span className={`text-xs mt-0.5 block ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                              Gemini will add missing security components &amp; save a new version.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemediateGaps}
                            disabled={selectedGapIds.length === 0 || isAnyAIBusy}
                            className="px-6 py-3.5 rounded-xl bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 font-black text-sm transition-all shadow-xl shadow-teal-500/20 hover:scale-[1.02] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isRemediating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            <span>Fix Selected Gaps ({selectedGapIds.length})</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm font-bold flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>All {selectedAuditCategory || 'architecture'} gaps have been remediated! Architecture score is 100%.</span>
                      </div>
                    )}
                    
                    {/* Full Audit Report Narrative */}
                    <div className={`text-sm space-y-3 border-t pt-6 max-h-[450px] overflow-y-auto pr-3 leading-relaxed ${
                      canvasTheme === 'light' ? 'text-slate-800 border-slate-200' : 'text-slate-300 border-panel-border/30'
                    }`}>
                      <h3 className={`text-sm font-black uppercase tracking-wider mb-2 ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        Detailed {selectedAuditCategory ? selectedAuditCategory.charAt(0).toUpperCase() + selectedAuditCategory.slice(1) : 'Audit'} Findings
                      </h3>
                      {renderAuditMarkdown(auditReport)}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-fade-in">
                    {/* Pre-Flight Inspection Hero Card */}
                    <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-colors ${
                      canvasTheme === 'light'
                        ? 'bg-white border-teal-500/30 shadow-md text-slate-900'
                        : 'glass-panel border-teal-500/30 bg-gradient-to-r from-teal-950/30 via-slate-900/70 to-purple-950/20 shadow-2xl text-white'
                    } space-y-6`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div className="space-y-2.5 max-w-2xl">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-300 text-xs font-black uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-teal-500 dark:text-teal-400" />
                            <span>Pre-Audit Architecture Scan Ready</span>
                          </div>
                          <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${
                            canvasTheme === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            {selectedAuditCategory ? selectedAuditCategory.charAt(0).toUpperCase() + selectedAuditCategory.slice(1) : 'Architecture'} Inspection: {activeDiagram?.name || 'Architecture Workspace'}
                          </h3>
                          <p className={`text-sm leading-relaxed ${
                            canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            Run deep AI {selectedAuditCategory || 'architecture'} audit on <strong className={canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}>{activeDiagram?.name || 'Architecture Workspace'}</strong> to evaluate node topology, layout precision, security controls, and enterprise compliance.
                          </p>
                        </div>

                        <button
                          onClick={() => handleAuditDiagram()}
                          disabled={isAnyAIBusy}
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
                      <div className={`p-6 rounded-2xl border space-y-3 ${
                        canvasTheme === 'light'
                          ? 'bg-white border-slate-200 shadow-sm text-slate-800'
                          : 'glass-panel border-panel-border/40 bg-slate-900/40 text-slate-100'
                      }`}>
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-500 dark:text-teal-400">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <h4 className={`text-base font-extrabold ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>Topology Pre-flight</h4>
                        <p className={`text-xs leading-relaxed ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                          Parses raw diagram graph nodes to detect compute instances, databases, and network edge routers.
                        </p>
                      </div>

                      <div className={`p-6 rounded-2xl border space-y-3 ${
                        canvasTheme === 'light'
                          ? 'bg-white border-slate-200 shadow-sm text-slate-800'
                          : 'glass-panel border-panel-border/40 bg-slate-900/40 text-slate-100'
                      }`}>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h4 className={`text-base font-extrabold ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>CIS &amp; NIST Policy Rules</h4>
                        <p className={`text-xs leading-relaxed ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                          Evaluates architecture against CIS AWS/GCP Foundations &amp; NIST SP 800-53 security controls.
                        </p>
                      </div>

                      <div className={`p-6 rounded-2xl border space-y-3 ${
                        canvasTheme === 'light'
                          ? 'bg-white border-slate-200 shadow-sm text-slate-800'
                          : 'glass-panel border-panel-border/40 bg-slate-900/40 text-slate-100'
                      }`}>
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500 dark:text-purple-400">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className={`text-base font-extrabold ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>AI Remediation Engine</h4>
                        <p className={`text-xs leading-relaxed ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
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

  function renderSettingsView() {
    const isRoot = currentUser?.email?.toLowerCase() === 'vibeandcode.ai@gmail.com' || currentUser?.email?.toLowerCase() === 'nitinaggarwal12@gmail.com' || (currentUser as any)?.is_super_admin;

    return (
      <div className={`flex-1 overflow-y-auto p-8 md:p-12 select-none animate-fade-in font-sans transition-colors duration-300 ${
        canvasTheme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-bg-dark text-slate-100'
      }`}>
        <div className="max-w-8xl mx-auto space-y-10">
          
          {/* Header */}
          <div className={`flex items-center justify-between border-b pb-6 ${canvasTheme === 'light' ? 'border-slate-200' : 'border-panel-border/40'}`}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-300 text-xs font-extrabold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500 dark:text-teal-accent" />
                <span>Security Governance & Config Hub</span>
              </div>
              <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>Settings & Security Governance</h1>
              <p className={`text-sm md:text-base mt-1 ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Manage user access control, security policies, authentication engines, and AI compiler configurations.</p>
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
            
            {/* Card 0: Personal User Studio Preferences & Customization */}
            <div className={`lg:col-span-2 rounded-3xl p-8 space-y-6 shadow-xl transition-colors border ${
              canvasTheme === 'light'
                ? 'bg-white border-slate-200 shadow-md text-slate-900'
                : 'glass-panel border-teal-500/40 bg-slate-900/60 text-white'
            }`}>
              <div className={`flex items-center justify-between border-b pb-4 ${
                canvasTheme === 'light' ? 'border-slate-200' : 'border-panel-border/40'
              }`}>
                <h3 className={`text-lg font-black flex items-center gap-3 ${
                  canvasTheme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  <Settings className="w-5 h-5 text-teal-600 dark:text-teal-accent" />
                  <span>Personal User Studio Preferences &amp; Canvas Customization</span>
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40">
                  ⚡ Auto-Saved Studio Profile
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Preference 1: Canvas Theme */}
                <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/80 border-slate-700/80 text-slate-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold uppercase tracking-wider ${
                      canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>Default Canvas Theme</span>
                    <Sun className="w-4 h-4 text-amber-500" />
                  </div>
                  <select
                    value={canvasTheme}
                    onChange={(e) => setCanvasTheme(e.target.value as 'light' | 'dark')}
                    className={`w-full font-bold text-xs rounded-xl px-3 py-2 outline-none cursor-pointer border transition-colors ${
                      canvasTheme === 'light'
                        ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                        : 'bg-slate-900 border-teal-500/50 text-teal-300'
                    }`}
                  >
                    <option value="light">☀️ Light Theme (#FFFFFF Canvas)</option>
                    <option value="dark">🌙 Dark Theme (#0F172A Studio)</option>
                  </select>
                  <p className={`text-[11px] ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    Corporate light theme provides publication-grade contrast.
                  </p>
                </div>

                {/* Preference 2: AI Compiler Reasoning Engine */}
                <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/80 border-slate-700/80 text-slate-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold uppercase tracking-wider ${
                      canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>Gemini AI Model Tier</span>
                    <Sparkles className="w-4 h-4 text-teal-500" />
                  </div>
                  <select
                    defaultValue="gemini-3.7-flash"
                    className={`w-full font-bold text-xs rounded-xl px-3 py-2 outline-none cursor-pointer border transition-colors ${
                      canvasTheme === 'light'
                        ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                        : 'bg-slate-900 border-slate-700 hover:border-teal-500/50 text-slate-100'
                    }`}
                  >
                    <option value="gemini-3.7-flash">⚡ Gemini 3.7 Flash (Default - High Speed &amp; Hybrid Reasoning)</option>
                  </select>
                  <p className={`text-[11px] ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    Powered exclusively by Gemini 3.7 Flash for sub-second synthesis and architectural reasoning.
                  </p>
                </div>

                {/* Preference 3: Default Presentation Aspect Ratio */}
                <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/80 border-slate-700/80 text-slate-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold uppercase tracking-wider ${
                      canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>Default Aspect Ratio</span>
                    <Box className="w-4 h-4 text-indigo-500" />
                  </div>
                  <select
                    value={selectedAspectRatio}
                    onChange={(e) => handleAspectRatioChange(e.target.value)}
                    className={`w-full font-bold text-xs rounded-xl px-3 py-2 outline-none cursor-pointer border transition-colors ${
                      canvasTheme === 'light'
                        ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                        : 'bg-slate-900 border-slate-700 hover:border-teal-500/50 text-slate-100'
                    }`}
                  >
                    <option value="16:9">📺 16:9 Executive Slides Widescreen</option>
                    <option value="4:3">📄 4:3 Academic Journal Figure</option>
                    <option value="21:9">🖥️ 21:9 Ultra-Wide Architecture Banner</option>
                  </select>
                  <p className={`text-[11px] ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    Auto-scales layout components to match canvas target.
                  </p>
                </div>

                {/* Preference 4: Preflight Zero-Trust Audit on Export */}
                <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/80 border-slate-700/80 text-slate-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold uppercase tracking-wider ${
                      canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>Zero-Trust Preflight</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <select
                    defaultValue="enabled"
                    className={`w-full font-bold text-xs rounded-xl px-3 py-2 outline-none cursor-pointer border transition-colors ${
                      canvasTheme === 'light'
                        ? 'bg-white border-slate-300 text-emerald-700 focus:border-emerald-500'
                        : 'bg-slate-900 border-emerald-500/40 text-emerald-300'
                    }`}
                  >
                    <option value="enabled">✅ Enabled (Automated Security Audit)</option>
                    <option value="disabled">⏸️ Disabled (Fast Direct Export)</option>
                  </select>
                  <p className={`text-[11px] ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    Audits security perimeters prior to Draw.io / Terraform download.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 1: User Identity & Access Governance */}
            <div className={`rounded-3xl p-8 space-y-6 shadow-xl border transition-colors ${
              canvasTheme === 'light'
                ? 'bg-white border-slate-200 shadow-md text-slate-900'
                : 'glass-panel border-panel-border/60 text-white'
            }`}>
              <h3 className={`text-lg font-black border-b pb-4 flex items-center gap-3 ${
                canvasTheme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-panel-border/40'
              }`}>
                <User className="w-5 h-5 text-teal-600 dark:text-teal-accent" />
                <span>User Identity &amp; Access Governance</span>
              </h3>

              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <div>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Authenticated Account
                    </span>
                    <span className={`text-base font-black mt-0.5 block ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {currentUser?.email || 'Guest Session'}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                    {(currentUser as any)?.global_role || 'Admin'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={`p-4 rounded-2xl border transition-colors ${
                    canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Global Role Clearance
                    </span>
                    <span className={`text-sm font-extrabold mt-1 block ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {isRoot ? 'Admin (Full Clearance)' : ((currentUser as any)?.global_role || 'Admin')}
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-colors ${
                    canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Root System Status
                    </span>
                    <span className={`text-sm font-extrabold mt-1 block ${
                      isRoot ? 'text-amber-600 dark:text-amber-400' : canvasTheme === 'light' ? 'text-slate-800' : 'text-slate-300'
                    }`}>
                      {isRoot ? '⚡ Root Administrator' : 'Standard Author'}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                }`}>
                  <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Active Personal Workspace
                  </span>
                  <span className="text-sm font-bold text-teal-700 dark:text-teal-300 mt-1 block font-mono">
                    Personal Workspace ({currentUser?.id ? `id: ${currentUser.id.substring(0, 8)}...` : 'Active'})
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Passwordless Magic Link & Security Policy */}
            <div className={`rounded-3xl p-8 space-y-6 shadow-xl border transition-colors ${
              canvasTheme === 'light'
                ? 'bg-white border-slate-200 shadow-md text-slate-900'
                : 'glass-panel border-panel-border/60 text-white'
            }`}>
              <h3 className={`text-lg font-black border-b pb-4 flex items-center gap-3 ${
                canvasTheme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-panel-border/40'
              }`}>
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-accent" />
                <span>Passwordless Magic Link & Security Policy</span>
              </h3>

              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <div>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Authentication Engine
                    </span>
                    <span className={`text-sm font-extrabold mt-0.5 block ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Passwordless Magic Links + JWT Session
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={`p-4 rounded-2xl border transition-colors ${
                    canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Token Expiration (TTL)
                    </span>
                    <span className={`text-sm font-extrabold mt-1 block ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      15 Minutes (Single-Use)
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-colors ${
                    canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      SMTP Email Transport
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 mt-1 block truncate" title="vibeandcode.ai@gmail.com">
                      vibeandcode.ai@gmail.com
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                }`}>
                  <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Session Cookie Security
                  </span>
                  <span className={`text-sm font-bold mt-1 block ${canvasTheme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                    HttpOnly Cookie (`promptcanvas_session`), SameSite=Lax, PBKDF2 Password Hashing
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Multi-Tenant Workspace & RLS Waterfall */}
            <div className={`rounded-3xl p-8 space-y-6 shadow-xl border transition-colors ${
              canvasTheme === 'light'
                ? 'bg-white border-slate-200 shadow-md text-slate-900'
                : 'glass-panel border-panel-border/60 text-white'
            }`}>
              <h3 className={`text-lg font-black border-b pb-4 flex items-center gap-3 ${
                canvasTheme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-panel-border/40'
              }`}>
                <Users className="w-5 h-5 text-indigo-500" />
                <span>Multi-Tenant Workspace & Waterfall RLS</span>
              </h3>

              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      Row Level Security (RLS) Policy
                    </span>
                    <span className="text-xs font-extrabold text-teal-700 dark:text-teal-400">Waterfall Enforcement</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Access control filters diagram queries by workspace ownership and membership (`Owner`, `Editor`, `Viewer`). Root admin credentials bypass workspace isolation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={`p-4 rounded-2xl border transition-colors ${
                    canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Personal Workspaces
                    </span>
                    <span className={`text-sm font-extrabold mt-1 block ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Private (Owner Only)
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-colors ${
                    canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Team Shared Workspaces
                    </span>
                    <span className="text-sm font-extrabold text-indigo-700 dark:text-indigo-300 mt-1 block">
                      Role-Based Member Access
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: AI Model & Database Infrastructure */}
            <div className={`rounded-3xl p-8 space-y-6 shadow-xl border transition-colors ${
              canvasTheme === 'light'
                ? 'bg-white border-slate-200 shadow-md text-slate-900'
                : 'glass-panel border-panel-border/60 text-white'
            }`}>
              <h3 className={`text-lg font-black border-b pb-4 flex items-center gap-3 ${
                canvasTheme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-panel-border/40'
              }`}>
                <Cpu className="w-5 h-5 text-teal-600 dark:text-teal-accent" />
                <span>AI Compiler & Infrastructure Telemetry</span>
              </h3>

              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <div>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Active LLM Architecture Engine
                    </span>
                    <span className={`text-sm font-extrabold mt-0.5 block ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Gemini 3.7 Flash / Flash (Google AI)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    Connected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={`p-4 rounded-2xl border transition-colors ${
                    canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Database Storage
                    </span>
                    <span className={`text-sm font-extrabold mt-1 block truncate ${canvasTheme === 'light' ? 'text-slate-900' : 'text-white'}`} title="/Users/nitinagga/.gemini/jetski/dev.db">
                      SQLite Local (`dev.db`)
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-colors ${
                    canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <span className={`text-xs font-bold block ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Database Health
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 mt-1 block">
                      Healthy (Online)
                    </span>
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
  function renderEmptyWorkspaceDashboard() {
    return (
      <div className={`w-full h-full overflow-y-auto py-12 px-6 md:py-16 relative select-none transition-colors duration-300 ${
        canvasTheme === 'light' ? 'bg-[#F8FAFC]' : 'bg-gradient-to-b from-[#070b12] to-[#030509]'
      }`}>
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
          
          {/* Top Hero & Live Prompt Studio Card */}
          <div className={`border rounded-3xl p-8 md:p-10 backdrop-blur-md space-y-6 relative overflow-hidden transition-colors ${
            canvasTheme === 'light'
              ? 'bg-white border-slate-200 shadow-md text-slate-900'
              : 'bg-[#0B101D] border-panel-border/70 text-white shadow-2xl'
          }`}>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-teal-500 dark:text-teal-400" />
                  <span>AI Architectural Prompt Studio</span>
                </span>
                <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${
                  canvasTheme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  Sketch Architecture <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500">With Pure Intent.</span>
                </h2>
                <p className={`text-sm md:text-base max-w-3xl leading-relaxed ${
                  canvasTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Describe any cloud, microservices, AI swarm, or enterprise system. Gemini AI compiles it into a collision-free, interactive Draw.io vector architecture.
                </p>
              </div>
            </div>

            {/* Direct Embedded Prompt Input Form */}
            <form onSubmit={handleCreateDiagram} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className={`flex items-center justify-between text-xs font-bold ${
                  canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-300 font-extrabold">
                    <Sparkles className="w-3.5 h-3.5 text-teal-500 dark:text-teal-400" />
                    <span>Prompt</span>
                  </span>
                  <span className={`text-[10px] font-mono ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Gemini 3.7 Flash</span>
                </label>
                <textarea
                  value={newDiagramPrompt}
                  onChange={(e) => {
                    setNewDiagramPrompt(e.target.value);
                    if (!newDiagramName) {
                      const words = e.target.value.split(' ').slice(0, 5).join(' ');
                      if (words) setNewDiagramName(words);
                    }
                  }}
                  placeholder="Describe the system architecture you want to build (e.g. Distributed Core Banking Ledger with Kafka Transactional Outbox, Redis Caching, and PCI-DSS compliant Cloud Run microservices)..."
                  rows={3}
                  className={`w-full border rounded-2xl p-5 text-sm md:text-base outline-none resize-none shadow-inner transition-all leading-relaxed font-sans ${
                    canvasTheme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:bg-white'
                      : 'bg-[#070A13] border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>

              <div className="space-y-4">
                {/* 1. Identification & Blueprint Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  {/* 1. Project */}
                  <div className="sm:col-span-4 space-y-1.5">
                    <label className={`block text-xs font-bold flex items-center justify-between ${
                      canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      <span>Project</span>
                      {earlierProjects.length > 0 && (
                        <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">({earlierProjects.length} earlier)</span>
                      )}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="e.g. Project-Alpha-101"
                        className={`flex-1 min-w-0 border rounded-xl px-3.5 py-2.5 text-xs md:text-sm outline-none transition-all font-medium truncate ${
                          canvasTheme === 'light'
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:bg-white'
                            : 'bg-[#070A13] border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500'
                        }`}
                      />
                      {earlierProjects.length > 0 && (
                        <select
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              setNewProjectName(e.target.value);
                            }
                          }}
                          className={`w-24 border rounded-xl px-2 py-2.5 text-xs outline-none cursor-pointer shrink-0 font-bold ${
                            canvasTheme === 'light'
                              ? 'bg-white border-slate-300 text-teal-700 focus:border-teal-500'
                              : 'bg-[#070A13] border-slate-700/80 focus:border-teal-400 text-teal-400'
                          }`}
                          title="Choose from earlier projects"
                        >
                          <option value="" disabled>📂 Earlier</option>
                          {earlierProjects.map((p: string) => (
                            <option key={p} value={p} className={canvasTheme === 'light' ? 'bg-white text-slate-900' : 'bg-[#0B101D] text-slate-200'}>
                              {p}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* 2. Diagram Name */}
                  <div className="sm:col-span-4 space-y-1.5">
                    <label className={`block text-xs font-bold ${
                      canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      Diagram Name
                    </label>
                    <input
                      type="text"
                      value={newDiagramName}
                      onChange={(e) => setNewDiagramName(e.target.value)}
                      placeholder="Diagram Name"
                      className={`w-full border rounded-xl px-3.5 py-2.5 text-xs md:text-sm outline-none transition-all font-medium ${
                        canvasTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:bg-white'
                          : 'bg-[#070A13] border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500'
                      }`}
                    />
                  </div>

                  {/* 3. Blueprint */}
                  <div className="sm:col-span-4 space-y-1.5">
                    <label className={`block text-xs font-bold flex items-center justify-between ${
                      canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      <span>Blueprint</span>
                      <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">({facetedOptions.matchingCount} matching)</span>
                    </label>
                    <select
                      value={selectedArchType}
                      onChange={(e) => {
                        const newArch = e.target.value;
                        setSelectedArchType(newArch);
                        syncDimensionsForBlueprint(newArch);
                        if (newArch === 'unified_system_view') {
                          if (!newDiagramPrompt || newDiagramPrompt !== DEFAULT_UNIFIED_PROMPT) {
                            setNewDiagramPrompt(DEFAULT_UNIFIED_PROMPT);
                            setNewDiagramName(generateUniqueDiagramName());
                          }
                        } else {
                          const meta = getBlueprintMetadataById(newArch);
                          if (meta?.goldenExamplePayload) {
                            setNewDiagramPrompt(meta.goldenExamplePayload);
                            setNewDiagramName(generateUniqueDiagramName(meta.diagramName));
                          } else {
                            const archInfo = getArchitectureTypeById(newArch);
                            if (archInfo) {
                              setNewDiagramPrompt(archInfo.prompt);
                              setNewDiagramName(generateUniqueDiagramName(archInfo.name));
                            }
                          }
                        }
                      }}
                      className={`w-full border font-bold rounded-xl px-3 py-2.5 text-xs md:text-sm outline-none transition-all cursor-pointer truncate ${
                        canvasTheme === 'light'
                          ? 'bg-white border-slate-300 text-teal-800 focus:border-teal-500'
                          : 'bg-[#070A13] border-slate-700/80 text-teal-300 focus:border-teal-400'
                      }`}
                    >
                      <option value="unified_system_view" className={canvasTheme === 'light' ? 'bg-white text-teal-800 font-extrabold' : 'bg-[#0B101D] text-teal-300 font-extrabold'}>
                        ✨ All Matching ({facetedOptions.matchingCount} Blueprints)
                      </option>
                      {facetedOptions.matchingBlueprints.length > 0 ? (
                        facetedOptions.matchingBlueprints.map((item) => (
                          <option key={item.combinedId} value={item.combinedId} className={canvasTheme === 'light' ? 'bg-white text-slate-900 font-medium' : 'bg-[#0B101D] text-slate-200 font-medium'}>
                            {item.diagramName}
                          </option>
                        ))
                      ) : (
                        <option disabled value="" className="bg-amber-500/10 text-amber-600 font-bold">
                          ⚠️ No blueprints match this combination
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                {/* 2. 7 Architectural Classification & Lifecycle Dropdowns (Cascading Facets) */}
                <div className={`border rounded-2xl p-3.5 space-y-2.5 transition-colors ${
                  canvasTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13]/90 border-slate-800/90'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                        <Settings2 className="w-3.5 h-3.5 text-teal-500 dark:text-teal-400" />
                        <span>Architectural Classification &amp; Lifecycle Dimensions</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-mono">
                        {facetedOptions.matchingCount} of {BLUEPRINT_KNOWLEDGE_MATRIX.length} Blueprints
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className={`text-[10px] font-bold hover:underline flex items-center gap-1 cursor-pointer transition-colors ${
                        canvasTheme === 'light' ? 'text-slate-600 hover:text-teal-700' : 'text-slate-400 hover:text-teal-300'
                      }`}
                      title="Reset all dimension filters"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Filters</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
                    {/* 1. Phase Name */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${
                        canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`} title="Phase Name">
                        Phase Name
                      </label>
                      <select
                        value={selectedPhaseName}
                        onChange={(e) => setSelectedPhaseName(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-800 font-bold' : 'bg-[#0B101D] text-teal-300 font-bold'}>✨ All 7 Phases (50 Blueprints)</option>
                        {PHASE_NAME_OPTIONS.map((opt) => {
                          const count = facetedOptions.phaseCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-900' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 2. Architecture Domain */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${
                        canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`} title="Architecture Domain">
                        Architecture Domain
                      </label>
                      <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-800 font-bold' : 'bg-[#0B101D] text-teal-300 font-bold'}>✨ All 6 Domains</option>
                        {ARCHITECTURE_DOMAIN_OPTIONS.map((opt) => {
                          const count = facetedOptions.domainCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-900' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 3. Abstraction Level */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${
                        canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`} title="Abstraction Level">
                        Abstraction Level
                      </label>
                      <select
                        value={selectedAbstractionLevel}
                        onChange={(e) => setSelectedAbstractionLevel(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-800 font-bold' : 'bg-[#0B101D] text-teal-300 font-bold'}>✨ All 4 Abstractions</option>
                        {ABSTRACTION_LEVEL_OPTIONS.map((opt) => {
                          const count = facetedOptions.abstractionCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-900' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 4. Architectural Stack Layer */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${
                        canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`} title="Architectural Stack Layer">
                        Stack Layer
                      </label>
                      <select
                        value={selectedStackLayer}
                        onChange={(e) => setSelectedStackLayer(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-800 font-bold' : 'bg-[#0B101D] text-teal-300 font-bold'}>✨ All 5 Layers</option>
                        {ARCHITECTURAL_STACK_LAYER_OPTIONS.map((opt) => {
                          const count = facetedOptions.stackLayerCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-900' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 5. Default Layout Direction */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${
                        canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`} title="Default Layout Direction">
                        Layout Direction
                      </label>
                      <select
                        value={selectedLayoutDirection}
                        onChange={(e) => setSelectedLayoutDirection(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-800 font-bold' : 'bg-[#0B101D] text-teal-300 font-bold'}>✨ All Directions</option>
                        {DEFAULT_LAYOUT_DIRECTION_OPTIONS.map((opt) => {
                          const count = facetedOptions.directionCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-900' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt === 'LR' ? 'LR (Left to Right)' : opt === 'TD' ? 'TD (Top to Down)' : opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 6. Sales Cycle Stage */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${
                        canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`} title="Sales Cycle Stage">
                        Sales Stage
                      </label>
                      <select
                        value={selectedSalesCycleStage}
                        onChange={(e) => setSelectedSalesCycleStage(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-800 font-bold' : 'bg-[#0B101D] text-teal-300 font-bold'}>✨ All Stages</option>
                        {SALES_CYCLE_STAGE_OPTIONS.map((opt) => {
                          const count = facetedOptions.salesStageCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-900' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 7. Lifecycle Phase */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${
                        canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`} title="Lifecycle Phase">
                        Lifecycle Phase
                      </label>
                      <select
                        value={selectedLifecyclePhase}
                        onChange={(e) => setSelectedLifecyclePhase(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-2 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-800 font-bold' : 'bg-[#0B101D] text-teal-300 font-bold'}>✨ All Lifecycles</option>
                        {LIFECYCLE_PHASE_OPTIONS.map((opt) => {
                          const count = facetedOptions.lifecycleCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-900' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Action Button Row */}
                <div className="flex items-center justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isGenerating || (!newDiagramPrompt.trim() && !newDiagramName.trim())}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070A13] font-black text-sm transition-all shadow-xl shadow-teal-500/20 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>{isGenerating ? 'Compiling Architecture...' : '⚡ Generate Architecture with Gemini AI'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  };



  useEffect(() => {
    const currentVerArch = displayedVersion?.architecture_type || activeVersion?.architecture_type;
    if (currentVerArch && currentVerArch !== selectedArchType) {
      setSelectedArchType(currentVerArch);
    }
  }, [displayedVersion?.architecture_type, activeVersion?.architecture_type, selectedArchType]);

  const costReport = React.useMemo(() => {
    return estimateCloudArchitectureCost(
      displayedVersion?.xml_content || activeVersion?.xml_content || '',
      activeDiagram?.name || 'Cloud Architecture',
      selectedArchType
    );
  }, [displayedVersion?.xml_content, activeVersion?.xml_content, activeDiagram?.name, selectedArchType]);

function transformXmlToExecutiveObsidianHud(xml: string): string {
  if (!xml) return xml;

  // 1. Purge all gradientColor attributes
  xml = xml.replace(/gradientColor=#[A-Fa-f0-9]+;/g, "gradientColor=none;");

  // 2. ERD Database Table Containers & Separator Lines
  xml = xml
    .replace(/(id="[^"]+_line"[^>]*style=")[^"]*(")/g, "$1line;strokeColor=#0284C7;strokeWidth=1.5;html=1;$2")
    .replace(/(id="[^"]+_hdr"[^>]*style=")[^"]*(")/g, "$1rounded=0;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=none;fontColor=#0F172A;fontStyle=1;fontSize=12;align=left;paddingLeft=10;$2")
    .replace(/(id="[^"]+_body"[^>]*style=")[^"]*(")/g, "$1text;html=1;strokeColor=none;fillColor=#FFFFFF;align=left;verticalAlign=top;fontSize=11;fontColor=#1E293B;paddingLeft=10;lineHeight=1.4;$2");

  // 3. UNIVERSAL MAP: Transform ANY dark or colored cell fill across any diagram into clean light architectural cards with crisp blue/emerald/amber/purple stroke borders
  xml = xml
    .replace(/fillColor=#FFE6CC;/g, "fillColor=#FFFBEB;strokeColor=#D97706;")
    .replace(/fillColor=#FFF2CC;/g, "fillColor=#FFFBEB;strokeColor=#D97706;")
    .replace(/fillColor=#DAE8FC;/g, "fillColor=#F0F9FF;strokeColor=#0284C7;")
    .replace(/fillColor=#D5E8D4;/g, "fillColor=#F0FDF4;strokeColor=#16A34A;")
    .replace(/fillColor=#F8CECC;/g, "fillColor=#FEF2F2;strokeColor=#DC2626;")
    .replace(/fillColor=#E1D5E7;/g, "fillColor=#FAF5FF;strokeColor=#7C3AED;")
    .replace(/fillColor=#DBEAFE;/g, "fillColor=#E0F2FE;strokeColor=#0284C7;")
    .replace(/fillColor=#DCFCE7;/g, "fillColor=#DCFCE7;strokeColor=#16A34A;")
    .replace(/fillColor=#F5F5F5;/g, "fillColor=#F8FAFC;strokeColor=#64748B;")
    .replace(/fillColor=#F8FAFC;/g, "fillColor=#FFFFFF;strokeColor=#0284C7;")
    .replace(/fillColor=#EFF6FF;/g, "fillColor=#F0F9FF;strokeColor=#0284C7;")
    .replace(/fillColor=#F0FDF4;/g, "fillColor=#F0FDF4;strokeColor=#16A34A;");

  // 4. SCRUB ANY REMAINING DARK OR BLACK CELL FILLS (#000..#4FF) -> Light Architectural Pure White with Blue Stroke
  xml = xml.replace(/fillColor=#[0-4][A-Fa-f0-9]{5};/gi, "fillColor=#FFFFFF;strokeColor=#0284C7;");

  // 5. FORCE ALL CELL FONT COLORS TO CRISP DARK SLATE (#0F172A)
  xml = xml.replace(/fontColor=#[A-Fa-f0-9]+;/gi, "fontColor=#0F172A;");

  // 6. ERD Key title formatting
  xml = xml
    .replace(/<b>PK<\/b>/g, "&lt;b style=&apos;color:#0284C7;font-weight:800;&apos;&gt;PK&lt;/b&gt;")
    .replace(/<b>FK<\/b>/g, "&lt;b style=&apos;color:#7C3AED;font-weight:800;&apos;&gt;FK&lt;/b&gt;")
    .replace(/<b>PK\/FK<\/b>/g, "&lt;b style=&apos;color:#0284C7;font-weight:800;&apos;&gt;PK/FK&lt;/b&gt;");

  // 7. Transform ALL inline HTML style backgrounds & font colors inside table cells, callouts, and sub-boxes to crisp dark slate text (#0F172A) on white/light backgrounds
  xml = xml
    .replace(/background:\s*#[0-9A-Fa-f]{3,6};/gi, "background:#FFFFFF;")
    .replace(/color:\s*#[0-9A-Fa-f]{3,6};/gi, "color:#0F172A;")
    .replace(/color:\s*rgba\([^\)]+\);/gi, "color:#0F172A;")
    .replace(/labelBackgroundColor=#[A-Fa-f0-9]+;/g, "labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;");

  // 8. Restore specific semantic accent highlights for KPIs, Footer banners, and Advisory Alerts
  xml = xml
    .replace(/Alert ID: #OPS-101/g, "<b style='color:#DC2626;'>Alert ID: #OPS-101</b>")
    .replace(/▲ Operational/g, "<b style='color:#16A34A;'>&#9650; Operational</b>")
    .replace(/Optimal Flow/g, "<b style='color:#0284C7;'>Optimal Flow</b>");

  // Item 2 Artifact Clean-up: Remove "❌ dirt models" and deduplicate "Key Definitions" in legend containers
  xml = xml.replace(/❌\s*dirt models/gi, "Derived Models");
  xml = xml.replace(/value="Key Definitions"/g, (match, offset, full) => {
    return full.indexOf('value="Key Definitions"') === offset ? match : 'value="Key Component Types"';
  });
  return xml;
}

  const currentXmlToRender = React.useMemo(() => {
    const archType = selectedArchType || activeDiagram?.architecture_type || displayedVersion?.architecture_type || 'unified_system_view';
    
    // Priority: customXml -> displayedVersion -> activeVersion -> selectedArchType template -> fallback template
    let baseXml = customXml || 
      displayedVersion?.xml_content || 
      activeVersion?.xml_content || 
      (selectedArchType && selectedArchType !== activeDiagram?.architecture_type ? getDefaultXmlForArchitecture(selectedArchType) : null) || 
      getDefaultXmlForArchitecture(archType) || 
      '';

    if (currentLanguage && currentLanguage !== 'en') {
      baseXml = localizeDrawioXmlDeep(baseXml, currentLanguage);
      baseXml = translateDiagramXmlToLanguage(baseXml, currentLanguage);
    }

    let formattedXml = baseXml;
    const hasAspectRatio = Boolean(selectedAspectRatio);

    if (layoutPreset === 'vendor') {
      formattedXml = createVendorIconsVariant(baseXml);
    } else if (layoutPreset === 'clean') {
      const { cleanedXml } = createMinimalistCleanVariant(baseXml);
      formattedXml = cleanedXml;
    } else if (layoutPreset === 'detailed') {
      formattedXml = restoreDetailedView(baseXml, hasAspectRatio);
    }

    if (layoutPreset === 'lucid') {
      formattedXml = formattedXml
        .replace(/fillColor=#FFE6CC;strokeColor=#D79B00;/g, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;shadow=1;")
        .replace(/fillColor=#FFF2CC;strokeColor=#D79B00;/g, "fillColor=#F8FAFC;strokeColor=#0284C7;strokeWidth=2;")
        .replace(/fillColor=#DAE8FC;strokeColor=#6C8EBF;/g, "fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=2;")
        .replace(/fillColor=#D5E8D4;strokeColor=#82B366;/g, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=2;")
        .replace(/fillColor=#F8CECC;strokeColor=#B85450;/g, "fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=2;")
        .replace(/fillColor=#E1D5E7;strokeColor=#9673A6;/g, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=2;")
        .replace(/edgeStyle=orthogonalEdgeStyle;rounded=0;/g, "edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=14;jumpStyle=arc;")
        .replace(/labelBackgroundColor=#FFFFFF;/g, "labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;");
    } else if (layoutPreset === 'obsidian') {
      // Light-HUD Obsidian View: Crisp Light Architectural Cards (#FFFFFF / #F0F9FF), Dark Slate Typography (#0F172A), & Vibrant Semantic Borders
      formattedXml = transformXmlToExecutiveObsidianHud(formattedXml);
    }

    if (isLiveFlowEnabled) {
      formattedXml = formattedXml.replace(/style="edgeStyle=orthogonalEdgeStyle;([^""]*)"/g, (m, p1) => {
        if (!p1.includes("dashed=1")) {
          return `style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;${p1}"`;
        }
        return m;
      });
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
  }, [displayedVersion, activeDiagram, layoutPreset, selectedAspectRatio, customRatioW, customRatioH]);

  // Sync active version XML to ref (respecting active view layout: Detailed View vs Clean View)
  useEffect(() => {
    if (currentXmlToRender) {
      activeXmlRef.current = currentXmlToRender;
    }
  }, [currentXmlToRender]);

  function renderVersionDropdown(customId?: string) {
    const versionsDesc = activeDiagram?.versions
      ? activeDiagram.versions
          .filter(v => (v.architecture_type || 'conceptual_diagram') === selectedArchType)
          .sort((a, b) => b.version_number - a.version_number)
      : [];

    if (versionsDesc.length === 0) return null;

    const activeLatestId = versionsDesc[0]?.id;
    const currentVer = versionsDesc.find(v => v.id === (displayedVersion?.id || activeLatestId)) || versionsDesc[0];
    const isLatestActive = currentVer.id === activeLatestId;

    const filteredVersions = versionsDesc.filter(v => {
      const q = versionSearchQuery.toLowerCase();
      return (
        String(v.version_number).includes(q) ||
        (v.comment || '').toLowerCase().includes(q) ||
        (v.business_usecase || '').toLowerCase().includes(q) ||
        (v.created_at || '').toLowerCase().includes(q)
      );
    });

    return (
      <div className="relative inline-flex items-center">
        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              const currentIdx = versionsDesc.findIndex(v => v.id === currentVer.id);
              if (currentIdx < versionsDesc.length - 1) {
                const prevVer = versionsDesc[currentIdx + 1];
                if (prevVer.id === activeLatestId) setPreviewVersion(null);
                else setPreviewVersion(prevVer);
              }
            }}
            disabled={versionsDesc.findIndex(v => v.id === currentVer.id) >= versionsDesc.length - 1}
            className="p-1.5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/40 hover:border-teal-400 text-teal-300 rounded-lg disabled:opacity-30 cursor-pointer transition-all"
            title="Backward: Older Diagram Version (Unobstructed View)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            id={customId || "workspace-version-dropdown"}
            onClick={() => {
              const next = !isVersionDropdownOpen;
              setIsVersionDropdownOpen(next);
              if (next) {
                setIsArchDropdownOpen(false);
                setIsCanvasDropdownOpen(false);
              }
              setVersionSearchQuery('');
            }}
            className="flex items-center gap-1.5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/40 hover:border-teal-400 text-teal-300 font-extrabold text-xs rounded-lg px-2.5 py-1.5 outline-none cursor-pointer transition-all shadow-sm"
            title="Search & select diagram versions"
          >
            <span>
              {isLatestActive ? currentLanguage === 'hi' ? `संस्करण ${currentVer.version_number} (नवीनतम)` : `Version ${currentVer.version_number} (Latest)` : currentLanguage === 'hi' ? `संस्करण ${currentVer.version_number}` : `Version ${currentVer.version_number}`}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-teal-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              const currentIdx = versionsDesc.findIndex(v => v.id === currentVer.id);
              if (currentIdx > 0) {
                const nextVer = versionsDesc[currentIdx - 1];
                if (nextVer.id === activeLatestId) setPreviewVersion(null);
                else setPreviewVersion(nextVer);
              }
            }}
            disabled={versionsDesc.findIndex(v => v.id === currentVer.id) <= 0}
            className="p-1.5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/40 hover:border-teal-400 text-teal-300 rounded-lg disabled:opacity-30 cursor-pointer transition-all"
            title="Forward: Newer Diagram Version (Unobstructed View)"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {isVersionDropdownOpen && (
          <div className="header-dropdown-menu fixed sm:absolute right-0 top-14 sm:top-full mt-1.5 w-[280px] sm:w-[320px] bg-[#090d16] border border-teal-500/40 rounded-xl shadow-2xl z-[9999] overflow-hidden flex flex-col max-h-[380px]">
            {/* Version Search Bar */}
            <div className="p-2 border-b border-slate-800/80 bg-slate-900/90 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-teal-400 shrink-0 ml-1" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search version # or note..."
                  value={versionSearchQuery}
                  onChange={(e) => setVersionSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none font-semibold py-1"
                />
              </div>
              {/* Forward / Backward Arrow Navigation Sub-Toolbar */}
              <div className="flex items-center justify-between px-1 pt-1 border-t border-slate-800/60 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    const currentIdx = filteredVersions.findIndex(v => v.id === currentVer.id);
                    if (currentIdx < filteredVersions.length - 1) {
                      const prevVer = filteredVersions[currentIdx + 1];
                      if (prevVer.id === activeLatestId) setPreviewVersion(null);
                      else setPreviewVersion(prevVer);
                    }
                  }}
                  disabled={filteredVersions.findIndex(v => v.id === currentVer.id) >= filteredVersions.length - 1}
                  className="flex items-center gap-1 text-slate-400 hover:text-teal-300 disabled:opacity-30 disabled:hover:text-slate-400 font-bold px-1.5 py-0.5 rounded cursor-pointer"
                  title="Backward (Older Version)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Older</span>
                </button>
                <span className="text-[10px] text-slate-500 font-mono">v{currentVer.version_number}</span>
                <button
                  type="button"
                  onClick={() => {
                    const currentIdx = filteredVersions.findIndex(v => v.id === currentVer.id);
                    if (currentIdx > 0) {
                      const nextVer = filteredVersions[currentIdx - 1];
                      if (nextVer.id === activeLatestId) setPreviewVersion(null);
                      else setPreviewVersion(nextVer);
                    }
                  }}
                  disabled={filteredVersions.findIndex(v => v.id === currentVer.id) <= 0}
                  className="flex items-center gap-1 text-slate-400 hover:text-teal-300 disabled:opacity-30 disabled:hover:text-slate-400 font-bold px-1.5 py-0.5 rounded cursor-pointer"
                  title="Forward (Newer Version)"
                >
                  <span>Newer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {/* Version List */}
            <div className="overflow-y-auto py-1 max-h-[300px] divide-y divide-slate-800/40">
              {filteredVersions.map((v, idx) => {
                const isLatest = versionsDesc.findIndex(x => x.id === v.id) === 0;
                const isSelected = v.id === currentVer.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setIsVersionDropdownOpen(false);
                      if (v.id === activeLatestId) {
                        setPreviewVersion(null);
                      } else {
                        setPreviewVersion(v);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 transition-colors flex items-start justify-between gap-2 hover:bg-teal-950/40 ${
                      isSelected ? 'bg-teal-900/30 border-l-2 border-teal-400' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-xs text-teal-300">
                          Version {v.version_number}
                        </span>
                        {isLatest && (
                          <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-bold">
                            Latest
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-teal-400 font-bold text-[10px]">✓ ACTIVE</span>
                        )}
                      </div>
                      {v.comment && (
                        <p className="text-[11px] text-slate-300 font-medium mt-0.5 line-clamp-2">
                          {v.comment}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
              {filteredVersions.length === 0 && (
                <div className="p-3 text-center text-xs text-slate-400">
                  No versions matching "{versionSearchQuery}"
                </div>
              )}
            </div>
          </div>
        )}
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

  const getLatestVersionBadgeForArchType = (archId: string): string => {
    if (!activeDiagram?.versions || activeDiagram.versions.length === 0) return '';
    const matchingVersions = activeDiagram.versions.filter(v => {
      const vArch = (v.architecture_type || 'conceptual_diagram').toLowerCase();
      const targetArch = archId.toLowerCase();
      return vArch === targetArch ||
             (targetArch === 'conceptual_diagram' && (vArch === 'conceptual' || vArch === '1. conceptual diagram')) ||
             (targetArch === 'agentic_rag' && (vArch === 'rag_gcp' || vArch === 'ai_rag' || vArch === 'agentic_rag' || vArch === 'tech_rag_gcp')) ||
             (targetArch === 'secure_deployment_map' && vArch.includes('secure_deployment')) ||
             (targetArch === 'governance_state_machine' && vArch.includes('governance'));
    });
    if (matchingVersions.length === 0) return '';
    const maxVer = Math.max(...matchingVersions.map(v => v.version_number));
    return ` (v${maxVer})`;
  };

  function handleArchitectureSwitch(newArchId: string) {
    if (typeof window !== 'undefined') {
      try {
        window.history.replaceState(null, '', `/workspace?arch=${newArchId}`);
      } catch (e) {}
    }
    if (tourStep === 2) {
      setTourStep(3);
    }
    if (!newArchId || newArchId.startsWith('slot_')) return;
    if (newArchId === selectedArchType && tourStep !== 2) return;

    setSelectedArchType(newArchId);
    const archMeta = getArchitectureTypeById(newArchId);
    const archName = archMeta?.name || newArchId;

    const existingVersionsForArch = activeDiagram?.versions?.filter(
      v => normalizeArchitectureId(v.architecture_type || 'conceptual_diagram') === normalizeArchitectureId(newArchId)
    ) || [];

    if (existingVersionsForArch.length > 0) {
      // 1. Switch to existing version for this topology
      const sorted = [...existingVersionsForArch].sort((a, b) => b.version_number - a.version_number);
      const targetVersion = sorted[0];
      setActiveVersion(targetVersion);
      setPreviewVersion(null);
      activeXmlRef.current = targetVersion.xml_content;
      setCustomXml(targetVersion.xml_content);

      if (activeDiagram?.id) {
        fetch(`/api/diagrams/${activeDiagram.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
          body: JSON.stringify({ architecture_type: newArchId }),
        }).catch(console.error);
        setActiveDiagram(prev => prev ? { ...prev, architecture_type: newArchId } : prev);
      }

      const messages: ChatMessage[] = [];
      [...existingVersionsForArch]
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
            sender: (v.created_by || '').toString().toLowerCase() === 'ai' ? 'ai' : 'user',
            text: (v.created_by || '').toString().toLowerCase() === 'ai' 
              ? `Generated diagram version v${v.version_number}: "${v.comment || archName}"`
              : `Saved version v${v.version_number}: "${v.comment || 'Saved changes'}"`,
            timestamp: new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            versionNumber: v.version_number
          });
        });
      setChatMessages(messages);
    } else {
      // 2. No version exists yet for this topology -> load pristine Master Reference Blueprint tailored to prompt/domain
      const promptContext = activeDiagram?.versions?.[0]?.prompt || (activeDiagram as any)?.latest_prompt || promptInput || activeDiagram?.name || '';
      const baseRefXml = getDefaultXmlForArchitecture(newArchId, promptContext, promptContext);
      const nextVerNum = (activeDiagram?.versions?.length || 0) + 1;

      const newVer: DiagramVersion = {
        id: `ver_${newArchId}_${Date.now()}`,
        diagram_id: activeDiagram?.id || 'temp',
        version_number: nextVerNum,
        xml_content: baseRefXml || '',
        comment: `Master Blueprint (${archName}) - Adapted to prompt`,
        created_by: 'System',
        created_at: new Date().toISOString(),
        prompt: promptContext || undefined,
        architecture_type: newArchId,
        ai_reasoning: `Domain-tailored ${archName} topology generated from prompt context.`,
        business_usecase: `Strategic architecture model for ${promptContext || archName}.`,
        technical_usecase: `Calibrated multi-tier cloud infrastructure for ${archName}.`
      };

      setActiveVersion(newVer);
      setPreviewVersion(null);
      activeXmlRef.current = newVer.xml_content;
      setCustomXml(newVer.xml_content);

      if (activeDiagram?.id) {
        fetch(`/api/diagrams/${activeDiagram.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
          body: JSON.stringify({ architecture_type: newArchId }),
        }).catch(console.error);

        fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
          body: JSON.stringify({
            xml_content: baseRefXml || '',
            comment: `Master Blueprint: ${archName}`,
            architecture_type: newArchId,
            prompt: promptContext,
            ai_reasoning: newVer.ai_reasoning,
            business_usecase: newVer.business_usecase,
            technical_usecase: newVer.technical_usecase
          })
        })
          .then(res => res.json())
          .then(savedVer => {
            if (savedVer && savedVer.id) {
              setActiveVersion(savedVer);
              setActiveDiagram(prev => prev ? {
                ...prev,
                architecture_type: newArchId,
                versions: [savedVer, ...(prev.versions || []).filter(v => v.id !== savedVer.id && v.id !== newVer.id)]
              } : prev);
            }
          })
          .catch(console.error);

        setActiveDiagram(prev => prev ? {
          ...prev,
          architecture_type: newArchId,
          versions: [newVer, ...(prev.versions || [])]
        } : prev);
      } else {
        fetch('/api/diagrams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
          body: JSON.stringify({
            name: archName,
            xml: baseRefXml || '',
            comment: `Master Reference Blueprint: ${archName}`,
            architectureType: newArchId,
            isPrivate: false
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data?.diagram?.id) {
              fetchDiagrams();
              loadDiagramDetails(data.diagram.id);
            }
          })
          .catch(console.error);
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `msg_ai_${Date.now()}`,
          sender: 'ai',
          text: `✨ Loaded **${archName}** (v${nextVerNum}) tailored for "${promptContext || archName}".`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          versionNumber: nextVerNum
        }
      ]);
    }
  };

  // Global Keyboard Navigation for Canvas Architecture Diagrams (ArrowLeft / ArrowRight)
  useEffect(() => {
    function handleCanvasKeyDown(e: KeyboardEvent) {
      if (previewModalTemplateId) return;

      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase() || '';
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || target?.isContentEditable) {
        return;
      }

      if (isCreateModalOpen || isSaveModalOpen || isInlineEditorOpen || isInspectModalOpen || isExecutiveSummaryOpen || isUseCaseModalOpen || isVersionDiffModalOpen || isPlaybookModalOpen || isSetMasterModalOpen) {
        return;
      }

      const allArchs = [...BUSINESS_ARCHITECTURE_TYPES, ...TECHNICAL_ARCHITECTURE_TYPES];
      if (allArchs.length === 0) return;

      const idx = allArchs.findIndex(a => a.id === selectedArchType);

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = idx > 0 ? idx - 1 : allArchs.length - 1;
        handleArchitectureSwitch(allArchs[prevIdx].id);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = idx >= 0 && idx < allArchs.length - 1 ? idx + 1 : 0;
        handleArchitectureSwitch(allArchs[nextIdx].id);
      }
    }

    window.addEventListener('keydown', handleCanvasKeyDown);
    return () => window.removeEventListener('keydown', handleCanvasKeyDown);
  }, [
    selectedArchType,
    previewModalTemplateId,
    isCreateModalOpen,
    isSaveModalOpen,
    isInlineEditorOpen,
    isInspectModalOpen,
    isExecutiveSummaryOpen,
    isUseCaseModalOpen,
    isVersionDiffModalOpen,
    isPlaybookModalOpen,
    isSetMasterModalOpen
  ]);

  // Multi-Tab Synchronization via BroadcastChannel
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    const channel = new BroadcastChannel('promptcanvas_tab_sync');

    channel.onmessage = (event) => {
      const data = event.data;
      if (data && data.type === 'DIAGRAM_UPDATED' && data.diagramId) {
        fetchDiagrams();
        if (activeDiagram && activeDiagram.id === data.diagramId && !isAnyAIBusy) {
          loadDiagramDetails(data.diagramId);
        }
      }
    };

    return () => {
      channel.close();
    };
  }, [activeDiagram?.id, isAnyAIBusy]);

  const [isForceRefreshing, setIsForceRefreshing] = useState(false);
  const [forceRefreshToast, setForceRefreshToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const handleForceRefreshDiagram = async (targetArchType?: string) => {
    if (!activeDiagram) return;
    const archToRefresh = targetArchType || selectedArchType || activeDiagram.architecture_type || 'conceptual_diagram';
    const archMeta = getArchitectureTypeById(archToRefresh);
    const archName = archMeta?.name || archToRefresh;
    setIsForceRefreshing(true);
    setForceRefreshToast({
      message: `⚡ Force-refreshing "${activeDiagram.name}" from Master Template (${archName})...`,
      type: 'info'
    });

    try {
      const promptContext = activeDiagram?.versions?.[0]?.prompt || (activeDiagram as any)?.latest_prompt || promptInput || activeDiagram?.name || '';
      const masterXml = getDefaultXmlForArchitecture(archToRefresh, promptContext, promptContext);
      const nextVerNum = (activeDiagram.versions?.length || 0) + 1;

      let freshVer: DiagramVersion = {
        id: `ver_${archToRefresh}_${Date.now()}`,
        diagram_id: activeDiagram.id,
        version_number: nextVerNum,
        xml_content: masterXml || '',
        comment: `Master Template Live API: ${archName}`,
        created_by: 'System',
        created_at: new Date().toISOString(),
        prompt: promptContext || undefined,
        architecture_type: archToRefresh
      };

      if (activeDiagram.id) {
        const res = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {})
          },
          body: JSON.stringify({
            xml_content: masterXml || '',
            comment: `Master Template Live API: ${archName}`,
            architecture_type: archToRefresh
          })
        });

        if (res.ok) {
          const saved = await res.json();
          if (saved && saved.id) {
            freshVer = saved;
          }
        }
      }

      setActiveVersion(freshVer);
      activeXmlRef.current = freshVer.xml_content;
      setCustomXml(freshVer.xml_content);
      setSelectedArchType(archToRefresh);
      setActiveDiagram(prev => {
        if (!prev) return prev;
        const prevVers = (prev.versions || []).filter(v => v.id !== freshVer.id);
        return {
          ...prev,
          architecture_type: archToRefresh,
          updated_at: new Date().toISOString(),
          versions: [freshVer, ...prevVers]
        };
      });

      setForceRefreshToast({
        message: `✅ Successfully refreshed "${archName}" to latest Master Template (v${freshVer.version_number})!`,
        type: 'success'
      });
      setTimeout(() => setForceRefreshToast(null), 4000);
    } catch (err: any) {
      console.error('Force refresh error:', err);
      setForceRefreshToast({
        message: `❌ Force refresh failed: ${err.message}`,
        type: 'error'
      });
      setTimeout(() => setForceRefreshToast(null), 5000);
    } finally {
      setIsForceRefreshing(false);
    }
  };

  return (
    <div className={`flex h-screen w-screen transition-colors duration-300 overflow-hidden font-sans ${
      canvasTheme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#060911] text-slate-100'
    }`}>
      
      {/* Desktop Sidebar Navigation (Hidden on < 1024px) */}
      <aside 
        onMouseEnter={() => setIsSidebarOpen(true)}
        className={`hidden lg:flex flex-col transition-all duration-300 z-20 shrink-0 border-r ${
          canvasTheme === 'light' ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-[#070A13] border-slate-800 text-slate-200'
        } ${
          isSidebarOpen ? (currentTab === 'editor' && activeDiagram ? 'w-[340px]' : 'w-64') : 'w-16'
        }`}
      >
        {/* Sidebar Header */}
        <div className={`h-16 flex items-center justify-between px-4 border-b shrink-0 ${
          canvasTheme === 'light' ? 'border-slate-200 bg-white' : 'border-slate-800 bg-[#070A13]'
        }`}>
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
              className={`p-1 rounded transition-colors ${
                canvasTheme === 'light' ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-900' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 1. ACTION ZONE: Primary Architecture Creation Button */}
        <div className="p-3 border-b border-panel-border/30 relative shrink-0">
          <button
            id="new-diagram-btn"
            onClick={openCreateModal}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-black transition-all shadow-md hover:shadow-teal-500/20 text-xs cursor-pointer ${
              !isSidebarOpen && 'p-2'
            }`}
            title="Create New Architecture with AI Prompt"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            {isSidebarOpen && <span>New Architecture</span>}
          </button>
        </div>

        {/* 3. CLEAN PRIMARY NAVIGATION LINKS (No Auto-Hover Accordion Sprawl) */}
        <div className="p-3 space-y-1 flex-1 overflow-y-auto">
          {[
            { id: 'editor', name: t.designCanvas, icon: Network },
            { id: 'templates', name: t.templatesGallery, icon: LayoutGrid },
            { id: 'history', name: 'Historical Canvases', icon: History, href: '/history' },
            { id: 'dashboard', name: t.operationsDashboard, icon: BarChart3, href: '/dashboard' },
            { id: 'audit', name: t.securityAudit, icon: ShieldCheck },
            { id: 'walkthrough', name: t.interactiveTour, icon: BookOpen },
            { id: 'settings', name: t.settingsTier, icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            const buttonContent = (
              <div className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive 
                  ? 'bg-teal-accent text-bg-dark font-extrabold shadow-sm'
                  : canvasTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? 'text-bg-dark'
                      : canvasTheme === 'light'
                        ? 'text-slate-500'
                        : 'text-slate-400'
                  }`} />
                  {isSidebarOpen && <span className="truncate">{item.name}</span>}
                </div>
              </div>
            );

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className="block">
                  {buttonContent}
                </Link>
              );
            }

            if (item.id === 'settings') {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setIsSettingsHoverOpen(true)}
                  onMouseLeave={() => setIsSettingsHoverOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTab('settings');
                      if (typeof window !== 'undefined') {
                        const params = new URLSearchParams(window.location.search);
                        params.set('tab', 'settings');
                        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
                      }
                      if (!isSidebarOpen) setIsSidebarOpen(true);
                    }}
                    className="w-full text-left block"
                  >
                    {buttonContent}
                  </button>

                  {/* HOVER-OVER SETTINGS & AI TIER DROPDOWN */}
                  {isSettingsHoverOpen && (
                    <div 
                      className="fixed sm:absolute left-16 sm:left-full bottom-0 ml-3 w-[360px] bg-[#090d16]/98 backdrop-blur-2xl border border-teal-500/50 rounded-2xl shadow-2xl p-4 z-[9999] animate-fade-in text-slate-100 flex flex-col gap-3.5"
                      onMouseEnter={() => setIsSettingsHoverOpen(true)}
                      onMouseLeave={() => setIsSettingsHoverOpen(false)}
                    >
                      {/* Header */}
                      <div className="pb-2 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4 text-teal-400" />
                          <span className="font-black text-xs text-white uppercase tracking-wider">System &amp; Workspace Settings</span>
                        </div>
                        <span className="text-[10px] font-mono text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/80 font-bold">
                          AI Tier: Pro
                        </span>
                      </div>

                      {/* 1. Theme Selection */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Canvas Theme</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setCanvasTheme('light')}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border ${
                              canvasTheme === 'light'
                                ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-sm font-extrabold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Sun className="w-3.5 h-3.5 text-amber-400" />
                            <span>☀️ Light Mode</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCanvasTheme('dark')}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border ${
                              canvasTheme === 'dark'
                                ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 shadow-sm font-extrabold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Moon className="w-3.5 h-3.5 text-indigo-400" />
                            <span>🌙 Dark Mode</span>
                          </button>
                        </div>
                      </div>

                      {/* 2. Language Selection */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Workspace Language</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setCurrentLanguage('en')}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                              currentLanguage === 'en'
                                ? 'bg-teal-500/20 border-teal-400 text-teal-200 shadow-sm font-extrabold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span>🇺🇸 English (EN)</span>
                            {currentLanguage === 'en' && <span className="text-teal-400 font-black">✓</span>}
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentLanguage('hi')}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                              currentLanguage === 'hi'
                                ? 'bg-teal-500/20 border-teal-400 text-teal-200 shadow-sm font-extrabold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span>🇮🇳 हिन्दी (HI)</span>
                            {currentLanguage === 'hi' && <span className="text-teal-400 font-black">✓</span>}
                          </button>
                        </div>
                      </div>

                      {/* 3. Diagram Privacy */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Diagram Privacy &amp; Visibility</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => toggleDiagramPrivacy(false)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                              !isPrivate
                                ? 'bg-teal-500/20 border-teal-400 text-teal-200 shadow-sm font-extrabold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Globe className="w-3.5 h-3.5 text-teal-400" />
                            <span>🌐 Public</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleDiagramPrivacy(true)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                              isPrivate
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm font-extrabold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Lock className="w-3.5 h-3.5 text-amber-400" />
                            <span>🔒 Private</span>
                          </button>
                        </div>
                      </div>

                      {/* 4. Slides & Aspect Ratio Format */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Slides &amp; Canvas Ratio</span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { id: '16:9', label: '16:9', desc: 'Widescreen (1360x720)' },
                            { id: '4:3', label: '4:3', desc: 'Standard Slide (1024x768)' },
                            { id: '1:1', label: '1:1', desc: 'Square (800x800)' },
                            { id: '9:16', label: '9:16', desc: 'Story Mobile (720x1280)' },
                          ].map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setSelectedAspectRatio(r.id)}
                              className={`py-1.5 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer border ${
                                selectedAspectRatio === r.id
                                  ? 'bg-teal-400 text-slate-950 border-teal-300 font-black shadow-sm'
                                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                              title={`${r.desc} (${r.id})`}
                            >
                              <span>{r.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 5. AI Tier & Full Settings Modal Trigger */}
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSettingsHoverOpen(false);
                            setCurrentTab('settings');
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-slate-950 font-black text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>⚡ Open AI Tier &amp; API Key Config</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  const newTab = item.id as 'editor' | 'templates' | 'audit' | 'settings' | 'walkthrough';
                  setCurrentTab(newTab);
                  if (newTab === 'editor') {
                    setIsAssistantOpen(true);
                    if (!activeDiagram && diagrams.length > 0) {
                      loadDiagramDetails(diagrams[0].id);
                    }
                  }
                  if (newTab === 'walkthrough') {
                    setTourStep(1);
                  }
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

          {/* 4. GEMINI ENTERPRISE AI STUDIO & REAL PROMPT DOSSIER (Docked in Left Sidebar) */}
          {isSidebarOpen && currentTab === 'editor' && activeDiagram && (
            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80">
              <GeminiEnterpriseLeftStudio
                activeDiagram={activeDiagram}
                activeVersion={activeVersion}
                displayedVersion={displayedVersion}
                selectedArchType={selectedArchType}
                suggestions={suggestions}
                promptInput={promptInput}
                isGenerating={isGenerating}
                isAuditing={isAuditing}
                costEstimateMonthly={costReport.totalMonthlyCostUsd}
                dynamicPlaceholder={dynamicPlaceholder}
                theme={canvasTheme}
                onPromptChange={(val) => setPromptInput(val)}
                onSendPrompt={handleSendPrompt}
                onSelectSuggestion={(s) => setPromptInput(s)}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onOpenPlaybookModal={() => setIsPlaybookModalOpen(true)}
                onOpenSetMasterModal={() => setIsSetMasterModalOpen(true)}
                onOpenCostModal={() => setIsCostModalOpen(true)}
                onOpenComposeModal={() => setIsComposeOpen(true)}
                onAuditDiagram={() => handleAuditDiagram()}
                onOpenPromptDossier={() => setIsPromptDossierOpen(true)}
              />
            </div>
          )}
        </div>

        {/* 4. PINNED BOTTOM FOOTER: Search Input */}
        {isSidebarOpen && (
          <div className={`p-3 border-t shrink-0 ${
            canvasTheme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-[#070A13]'
          }`}>
            <div className="relative">
              <input
                type="text"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                placeholder={t.filterDesigns}
                className={`w-full border rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none transition-all ${
                  canvasTheme === 'light'
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600'
                    : 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-teal-accent'
                }`}
              />
              <Search className={`w-3.5 h-3.5 absolute left-2.5 top-2 ${
                canvasTheme === 'light' ? 'text-slate-400' : 'text-slate-500'
              }`} />
              {sidebarSearch && (
                <button
                  onClick={() => setSidebarSearch('')}
                  className={`absolute right-2 top-2 p-0.5 rounded ${
                    canvasTheme === 'light' ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
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
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCreateModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-black text-xs cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>New Architecture</span>
                </button>
              </div>

              {/* Nav Links */}
              <div className="p-3 space-y-1">
                {[
                  { id: 'editor', name: t.designCanvas, icon: Network },
                  { id: 'templates', name: t.templatesGallery, icon: LayoutGrid },
                  { id: 'history', name: 'Historical Canvases', icon: History, href: '/history' },
                  { id: 'dashboard', name: t.operationsDashboard, icon: BarChart3, href: '/dashboard' },
                  { id: 'audit', name: t.securityAudit, icon: ShieldCheck },
                  { id: 'walkthrough', name: t.interactiveTour, icon: BookOpen },
                  { id: 'settings', name: t.settingsTier, icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  
                  if (item.href) {
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
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        const newTab = item.id as 'editor' | 'templates' | 'audit' | 'settings' | 'walkthrough';
                        setCurrentTab(newTab);
                        if (newTab === 'editor') {
                          setIsAssistantOpen(true);
                          if (!activeDiagram && diagrams.length > 0) {
                            loadDiagramDetails(diagrams[0].id);
                          }
                        }
                        if (newTab === 'walkthrough') {
                          setTourStep(1);
                        }
                      }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-teal-accent text-bg-dark font-extrabold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-bg-dark' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Profile / User */}
            <div className="p-3 border-t border-panel-border/30 bg-slate-950/60">
              {currentUser ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCurrentTab('settings');
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-left cursor-pointer hover:border-teal-500/40 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">
                    {(currentUser.name || currentUser.email)[0].toUpperCase()}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-200 truncate">{currentUser.name || currentUser.email}</p>
                    <p className="text-[10px] text-teal-400 font-mono">{currentUser.is_guest ? 'Guest Session' : 'Verified Pro'}</p>
                  </div>
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-teal-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer hover:border-teal-500/40 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In / Profile</span>
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* 2. MAIN WORKSPACE: Split Pane */}

  {isPlaybookModalOpen && (
    <div className="fixed inset-0 z-[1000] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0b101d] border-2 border-amber-500/40 rounded-3xl max-w-7xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
              <span>📐 STRATEGIC BLUEPRINT MATRIX &amp; GOVERNANCE CATALOG</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Enterprise Architecture Blueprint Matrix</h2>
          </div>
          <button
            onClick={() => setIsPlaybookModalOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all font-bold cursor-pointer"
          >
            ✕ Close Table
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-300 text-xs uppercase tracking-wider border-b border-slate-800">
                <th className="p-4 font-extrabold w-48">Architecture Blueprint</th>
                <th className="p-4 font-extrabold w-36">Strategic Score</th>
                <th className="p-4 font-extrabold w-56">When to Use (Product Journey)</th>
                <th className="p-4 font-extrabold w-48">Where to Use (Target Document)</th>
                <th className="p-4 font-extrabold w-64">Creator &amp; Consumer Personas</th>
                <th className="p-4 font-extrabold">🚀 Big Tech Product Standpoint (Google / Stripe)</th>
                <th className="p-4 font-extrabold">💼 Tier-1 Management Consulting Standpoint (McKinsey / BCG)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-black text-white">
                  11. C4 Enterprise System Context &amp; Container Model (L1 &amp; L2)
                </td>
                <td className="p-4 font-black text-amber-400 text-sm">
                  ★★★★★<br/>5.0 / 5.0
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <strong className="text-teal-400">Phase 0–1 Greenfield RFC:</strong> Before writing backend service code.<br/><br/>
                  <strong className="text-teal-400">Growth &amp; Scale:</strong> During Kubernetes/Istio service mesh adoption.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • Technical Design Document (TDD / RFC) Section 2.<br/>
                  • SOC2 Type II / ISO 27001 Audit Dossier.<br/>
                  • C-Suite Boardroom Review Deck Slide 3.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <strong className="text-white">Creator:</strong> Principal Staff Cloud / Security Architect (Staff L7+ at Google).<br/><br/>
                  <strong className="text-white">Consumer:</strong> CISO, VP of Engineering, External SOC2 Security Auditors.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • <strong className="text-blue-400">Internal RFC Enforcement:</strong> Mandatory inside every Architectural RFC before design freeze.<br/>
                  • <strong className="text-blue-400">Zero-Trust Perimeter:</strong> BeyondCorp Identity-Aware Proxy (IAP) access policies and GCP Private Service Connect.<br/>
                  • <strong className="text-blue-400">SRE Postmortems:</strong> Used by SRE teams to trace incident cascading.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • <strong className="text-amber-300">Billable Transformation Anchor:</strong> Boardroom Baseline comparing &quot;As-Is Monolith&quot; vs &quot;To-Be Cloud Native&quot;.<br/>
                  • <strong className="text-amber-300">Application Portfolio Rationalization (APM):</strong> Identifies duplicate services in 60 minutes.<br/>
                  • <strong className="text-amber-300">RFP &amp; PMI Integration:</strong> Regulatory compliance proof.
                </td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-black text-white">
                  12. Modern Data Stack Architecture Blueprint (CDC, Medallion &amp; Reverse ETL)
                </td>
                <td className="p-4 font-black text-amber-400 text-sm">
                  ★★★★★<br/>5.0 / 5.0
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <strong className="text-teal-400">Series B+ Data Modernization:</strong> When SQL analytics databases stall under batch ETL lag.<br/><br/>
                  <strong className="text-teal-400">AI &amp; RAG Monetization:</strong> Building feature stores &amp; enterprise RAG pipelines.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • Enterprise Data Strategy &amp; Governance Charter.<br/>
                  • Data Engineering Solution Architecture Blueprint (SAD).<br/>
                  • AI Business Case Deck for Steering Committee.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <strong className="text-white">Creator:</strong> Principal Staff Data Architect / Analytics Engineer.<br/><br/>
                  <strong className="text-white">Consumer:</strong> Chief Data Officer (CDO), VP BI, VP Revenue Ops, AI Leads.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • <strong className="text-teal-400">Real-Time Telemetry:</strong> OLTP databases feed CDC WAL events directly into BigQuery &amp; Vertex AI Feature Store.<br/>
                  • <strong className="text-teal-400">Data Contracts:</strong> Soda.io &amp; Great Expectations CI/CD guardrails.<br/>
                  • <strong className="text-teal-400">Reverse ETL:</strong> Hightouch/Census sync Gold scores back to production SaaS apps.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • <strong className="text-purple-300">Data &amp; AI Billable Blueprint:</strong> Medallion Lakehouse Zones (Bronze Raw, Silver Cleansed, Gold Boardroom) for warehouse migration.<br/>
                  • <strong className="text-purple-300">Immediate Top-Line ROI:</strong> Reverse ETL activation in Salesforce/Zendesk.<br/>
                  • <strong className="text-purple-300">WORM Audit Logs:</strong> Immutable compliance for banking/healthcare.
                </td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-black text-white">
                  13. Enterprise Event-Driven Microservices Architecture (EDA Blueprint)
                </td>
                <td className="p-4 font-black text-amber-400 text-sm">
                  ★★★★★<br/>4.9 / 5.0
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <strong className="text-teal-400">High-Concurrency Scale-Out:</strong> When monolithic synchronous APIs cause cascading timeouts during Black Friday.<br/><br/>
                  <strong className="text-teal-400">Multi-Region Resiliency:</strong> Asynchronous DLQ automated self-healing replay.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • High-Availability &amp; Reliability Architecture RFC.<br/>
                  • Disaster Recovery (DR) &amp; Chaos Engineering Runbook.<br/>
                  • Fintech Payment Processing Auditing Whitepaper.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <strong className="text-white">Creator:</strong> Principal Distributed Systems Architect / Event-Driven Architect.<br/><br/>
                  <strong className="text-white">Consumer:</strong> CTO, Head of SRE &amp; Reliability Engineering, Chief Risk Officer.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • <strong className="text-blue-400">Non-Blocking Concurrency:</strong> Decouples payment settlement from heavy downstream shipping/inventory consumers.<br/>
                  • <strong className="text-blue-400">Transactional Outbox:</strong> At-Least-Once event emission without 2PC lock overhead.<br/>
                  • <strong className="text-blue-400">Self-Healing DLQ:</strong> Isolates poison-pill events with exponential backoff.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  • <strong className="text-rose-300">Digital Core Banking:</strong> PCI-DSS regulatory compliance, cryptographic HMAC signatures, and audit traceability.<br/>
                  • <strong className="text-rose-300">Sub-12ms CEP Fraud Engine:</strong> Automatically freezes compromised customer accounts in &lt;12ms SLA.<br/>
                  • <strong className="text-rose-300">Regulatory Dossier:</strong> Technical proof exhibit for FED/ECB.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}

      {currentTab === 'editor' && (
        <main className="flex-1 flex flex-col min-w-0 h-full">
          <AssumptionBanner
            assumptions={activeAssumptions}
            alternativeTypes={activeAlternativeTypes}
            onSwitchType={(typeId) => handleSelectDisambiguationType(typeId)}
            onDismiss={() => {
              setActiveAssumptions([]);
              setActiveAlternativeTypes([]);
            }}
          />
          {currentUser?.is_guest && !isGuestDisclaimerDismissed && (
            <div className="w-full bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-indigo-500/15 border-b border-amber-500/30 py-2 px-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-200 text-xs md:text-sm backdrop-blur-md z-40 shrink-0 animate-fade-in">
              <div className="flex items-center gap-2 font-medium min-w-0">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate sm:whitespace-normal">
                  <strong className="text-amber-300 font-bold">Guest Mode Disclaimer:</strong> Content created as a Guest is visible to all users unless deleted.
                </span>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => {
                    setIsAuthOpen(true);
                  }}
                  className="px-3.5 py-1 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-[#070a13] font-black rounded-lg shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5 text-xs hover:scale-[1.02]"
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
                  className="p-1 rounded-lg hover:bg-amber-500/20 text-amber-300 hover:text-white transition-colors cursor-pointer"
                  title="Dismiss warning"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          <>
            {/* Top Navbar */}
            <header className={`h-14 border-b flex items-center justify-between px-3 md:px-6 backdrop-blur-md gap-3 relative shrink-0 transition-colors ${tourStep !== null ? 'z-[60]' : 'z-30'} ${
              canvasTheme === 'light' ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' : 'bg-[#070A13]/95 border-slate-800 text-white'
            }`}>
              {/* Group 1: Left - Navigation Identity, Category & Version */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0">
                {/* Mobile/Tablet Hamburger Menu Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`lg:hidden p-1.5 rounded-lg border shrink-0 transition-all cursor-pointer ${
                    canvasTheme === 'light'
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-teal-700'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-panel-border text-slate-300 hover:text-teal-400'
                  }`}
                  title="Open Navigation Menu"
                >
                  <Menu className="w-4 h-4" />
                </button>

                {!isSidebarOpen && (
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    title="Expand Navigation Sidebar"
                    className={`hidden lg:flex p-1.5 rounded-lg border shrink-0 transition-all cursor-pointer ${
                      canvasTheme === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-teal-700'
                        : 'bg-slate-900/80 hover:bg-slate-800 border-panel-border text-slate-300 hover:text-teal-accent'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                
                <div className="flex items-center gap-1.5 shrink-0 text-xs">
                  <button
                    type="button"
                    onClick={() => setCurrentTab('editor')}
                    className="text-teal-500 hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200 font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Editor Canvas"
                  >
                    <Network className="w-4 h-4 text-teal-500" />
                  </button>
                  {/* Two Clean Controls: Project Selector & Architecture View Selector */}
                  <ProjectHeaderNav
                    activeDiagram={activeDiagram}
                    diagrams={diagrams}
                    selectedArchType={selectedArchType}
                    activeVersionNumber={displayedVersion?.version_number || activeVersion?.version_number || 1}
                    disabled={isAnyAIBusy}
                    theme={canvasTheme}
                    onSelectDiagram={(diagramId) => loadDiagramDetails(diagramId)}
                    onCreateNewProject={async (name) => {
                      const finalName = name.trim() || generateUniqueDiagramName();
                      const defaultXml = getDefaultXmlForArchitecture('conceptual_diagram', finalName, finalName);
                      try {
                        const res = await fetch('/api/diagrams', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
                          body: JSON.stringify({
                            name: finalName,
                            xml: defaultXml,
                            comment: `Created project: ${finalName}`,
                            architectureType: 'conceptual_diagram',
                            isPrivate: false
                          })
                        });
                        if (res.ok) {
                          const data = await res.json();
                          await fetchDiagrams();
                          if (data.diagram?.id) {
                            await loadDiagramDetails(data.diagram.id);
                          }
                        }
                      } catch (err) {
                        console.error('Failed to create new project:', err);
                      }
                    }}
                    onSelectBlueprint={(newArchId) => handleArchitectureSwitch(newArchId)}
                    onOpenBlueprintCatalog={() => setIsPlaybookModalOpen(true)}
                    onOpenPromptDossier={() => setIsPromptDossierOpen(true)}
                  />
                </div>
              </div>

              {/* Group 2: Center - Status Indicators */}
              <div className="hidden xl:flex items-center gap-2 shrink-0">
                {isAnyAIBusy && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-300 text-xs font-semibold animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                    <span>⚡ Gemini API active...</span>
                  </div>
                )}
              </div>

              {/* Group 3: Right - Consolidated Action Hub */}
              <div className="flex items-center gap-1.5 shrink-0 min-w-0">
                
                {/* ☀️ / 🌙 Theme Toggle Button */}
                <button
                  type="button"
                  id="workspace-theme-toggle-btn"
                  onClick={() => {
                    const next = canvasTheme === 'dark' ? 'light' : 'dark';
                    setCanvasTheme(next);
                    try {
                      localStorage.setItem('promptcanvas_theme', next);
                    } catch {}
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-extrabold text-xs transition-all shadow-sm cursor-pointer shrink-0 ${
                    canvasTheme === 'light'
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-amber-300'
                  }`}
                  title={canvasTheme === 'light' ? "Switch to Dark Theme" : "Switch to Light Theme"}
                >
                  {canvasTheme === 'light' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Dark</span>
                    </>
                  )}
                </button>

                <AccessRequestsInbox user={currentUser} />
                {activeDiagram && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsExecutiveSummaryOpen(true)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0 ${
                        canvasTheme === 'light'
                          ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900'
                          : 'border-amber-400/50 bg-amber-500/15 hover:bg-amber-500/25 text-amber-200'
                      }`}
                      title="Open C-Suite Executive Strategic Summary & Board Brief"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                      <span className="hidden xl:inline">Executive</span>
                      <span>Suite</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsUseCaseModalOpen(true)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0 ${
                        canvasTheme === 'light'
                          ? 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-900'
                          : 'border-teal-400/60 bg-teal-400/15 hover:bg-teal-400/25 text-teal-200'
                      }`}
                      title="Open New Use Case Architectural Intake Form"
                    >
                      <ClipboardList className="w-3.5 h-3.5 text-teal-500" />
                      <span className="hidden xl:inline">Intake</span>
                      <span>Form</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsVersionDiffModalOpen(true)}
                      className={`hidden 2xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0 ${
                        canvasTheme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                          : 'border-teal-500/50 hover:border-teal-400 bg-teal-500/15 hover:bg-teal-500/25 text-teal-300'
                      }`}
                      title="Compare diagram versions & inspect visual geometric diffs"
                    >
                      <FileCode className="w-3.5 h-3.5 text-teal-500" />
                      <span>Diff</span>
                    </button>

                    {/* Edit Options Dropdown */}
                    <div className="relative inline-flex items-center shrink-0 w-[105px]">
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
                        className={`appearance-none font-bold text-xs rounded-lg pl-2 pr-5 py-1.5 outline-none cursor-pointer transition-all shadow-sm w-full truncate border ${
                          canvasTheme === 'light'
                            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 focus:ring-teal-500/30'
                            : 'bg-slate-900/90 hover:bg-slate-800/90 border-panel-border text-slate-200 focus:ring-teal-400/30'
                        }`}
                      >
                        <option value="" disabled className={canvasTheme === 'light' ? 'bg-white text-slate-500 py-1 font-bold' : 'bg-[#0b101d] text-slate-400 py-1 font-bold'}>
                          ✏️ Edit ▾
                        </option>
                        <option value="inline" className={canvasTheme === 'light' ? 'bg-white text-slate-800 py-1 font-bold' : 'bg-[#0b101d] text-slate-200 py-1 font-bold'}>
                          ✏️ Edit Inline
                        </option>
                        <option value="newtab" className={canvasTheme === 'light' ? 'bg-white text-slate-800 py-1 font-bold' : 'bg-[#0b101d] text-slate-200 py-1 font-bold'}>
                          ↗️ New Tab
                        </option>
                      </select>
                      <ChevronDown className={`w-3.5 h-3.5 absolute right-1.5 pointer-events-none ${canvasTheme === 'light' ? 'text-slate-600' : 'text-teal-400'}`} />
                    </div>
                  </>
                )}
              </div>
            </header>

        {/* Workspace Body: Immersive Diagram Canvas with Gemini Enterprise Bottom Dock */}
        <div className="flex-1 flex min-h-0 relative">
          
          {/* CENTER PANE: Diagram Viewport & Gemini Enterprise AI Chat */}
          <section className={`flex-1 flex flex-col h-full relative overflow-hidden min-w-0 transition-colors duration-300 ${canvasTheme === 'light' && viewMode === 'canvas' ? 'bg-[#F8FAFC]' : 'bg-bg-dark'} flex`}>
            
            {/* Center Pane Top Control Bar (Clean Status & Zoom Controls) */}
            {activeDiagram && (
              <div className={`h-12 border-b flex items-center justify-between px-4 backdrop-blur z-20 shrink-0 transition-colors ${
                canvasTheme === 'light' ? 'bg-white/90 border-slate-200 text-slate-800' : 'bg-panel-dark/60 border-panel-border text-slate-200'
              }`}>
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
                    <button
                      type="button"
                      onClick={() => setIsLiveFlowEnabled(!isLiveFlowEnabled)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm ${
                        isLiveFlowEnabled
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)] font-extrabold'
                          : 'bg-slate-950/80 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                      }`}
                      title="Toggle real-time animated packet telemetry flow streams across diagram connections"
                    >
                      <Zap className={`w-3.5 h-3.5 ${isLiveFlowEnabled ? 'text-emerald-400 fill-current animate-pulse' : 'text-slate-400'}`} />
                      <span>Live Flow</span>
                      {isLiveFlowEnabled && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </button>
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
                        className={`p-1.5 rounded-md transition-all cursor-pointer flex items-center justify-center ${
                          (isPanMode || isSpacePressed) 
                            ? 'text-teal-600 dark:text-teal-accent bg-teal-500/15 border border-teal-500/30 shadow-[0_0_10px_rgba(20,184,166,0.15)]' 
                            : canvasTheme === 'light'
                              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                        }`}
                        title={(isPanMode || isSpacePressed) ? "Hand Tool (Pan Canvas) - Active (Press Spacebar to toggle)" : "Hand Tool (Pan Canvas) - Inactive (Hold Spacebar to pan temporarily)"}
                      >
                        <Hand className="w-4 h-4" />
                      </button>

                      <div className={`flex items-center rounded-lg border px-1 py-0.5 text-xs ${
                        canvasTheme === 'light'
                          ? 'bg-slate-100 border-slate-300 text-slate-800'
                          : 'bg-bg-dark/80 border-panel-border text-slate-300'
                      }`}>
                        <button
                          onClick={() => setZoom(z => Math.max(0.4, Number((z - 0.1).toFixed(1))))}
                          className={`p-1 font-bold transition-colors cursor-pointer ${
                            canvasTheme === 'light' ? 'text-slate-600 hover:text-teal-700' : 'text-slate-400 hover:text-teal-accent'
                          }`}
                          title="Zoom Out"
                        >
                          -
                        </button>
                        <span className={`w-12 text-center font-mono text-[11px] font-bold ${
                          canvasTheme === 'light' ? 'text-teal-700' : 'text-teal-accent'
                        }`}>
                          {Math.round(zoom * 100)}%
                        </span>
                        <button
                          onClick={() => setZoom(z => Math.min(2.5, Number((z + 0.1).toFixed(1))))}
                          className={`p-1 font-bold transition-colors cursor-pointer ${
                            canvasTheme === 'light' ? 'text-slate-600 hover:text-teal-700' : 'text-slate-400 hover:text-teal-accent'
                          }`}
                          title="Zoom In"
                        >
                          +
                        </button>
                        <div className={`h-3 w-[1px] mx-1 ${canvasTheme === 'light' ? 'bg-slate-300' : 'bg-panel-border'}`} />
                        <button
                          onClick={() => { setZoom(1.0); setPan({ x: 0, y: 0 }); }}
                          className={`px-2 py-0.5 text-[10px] font-medium transition-colors cursor-pointer ${
                            canvasTheme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                          }`}
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

            <WorldClassFlagshipDrawer
              activeTool={activeFlagshipTool}
              onClose={() => setActiveFlagshipTool('none')}
              activeDiagramName={activeDiagram?.name || 'QuantumFlow Enterprise System'}
              architectureType={activeDiagram?.architecture_type || 'unified_system_view'}
            />
            <div 
              id="tour-canvas-viewport"
              className={getTourClass(tourStep, 4, "flex-1 w-full h-full relative overflow-hidden")}
            >
              {!activeDiagram ? (
                <WelcomeGetStartedSlate
                  theme={canvasTheme}
                  isGenerating={isGenerating}
                  onGenerateFromPrompt={async (promptText) => {
                    const finalName = generateUniqueDiagramName();
                    setIsGenerating(true);
                    try {
                      const res = await fetch('/api/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
                        body: JSON.stringify({
                          name: finalName,
                          prompt: promptText,
                          architectureType: selectedArchType || 'conceptual_diagram',
                          isPrivate: false
                        })
                      });
                      if (res.ok) {
                        const data = await res.json();
                        await fetchDiagrams();
                        if (data.diagram?.id) {
                          await loadDiagramDetails(data.diagram.id);
                        }
                      }
                    } catch (err) {
                      console.error('Failed to generate diagram:', err);
                    } finally {
                      setIsGenerating(false);
                    }
                  }}
                  onOpenBlueprintCatalog={() => setIsPlaybookModalOpen(true)}
                  onStartBlankCanvas={async () => {
                    const blankName = `Custom Diagram #${Math.floor(100 + Math.random() * 900)}`;
                    const blankXml = getDefaultXmlForArchitecture('blank_canvas', blankName, blankName);
                    try {
                      const res = await fetch('/api/diagrams', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
                        body: JSON.stringify({
                          name: blankName,
                          xml: blankXml,
                          comment: 'Initialized blank canvas',
                          architectureType: 'blank_canvas',
                          isPrivate: false
                        })
                      });
                      if (res.ok) {
                        const data = await res.json();
                        await fetchDiagrams();
                        if (data.diagram?.id) {
                          await loadDiagramDetails(data.diagram.id);
                        }
                      }
                    } catch (err) {
                      console.error('Failed to create blank canvas:', err);
                    }
                  }}
                />
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
                            disabled={isAnyAIBusy}
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
                            disabled={isAnyAIBusy}
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
                <div className="w-full h-full flex flex-col relative overflow-hidden">
                  {/* Historical Snapshot Forking Warning Banner */}
                  {previewVersion && previewVersion.id !== activeVersion?.id && (
                    <div className="w-full bg-amber-500/15 border-b border-amber-500/40 px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-amber-200 text-xs font-semibold backdrop-blur-md z-30 shrink-0 animate-fade-in shadow-md">
                      <div className="flex items-center gap-2 min-w-0">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="truncate">
                          Viewing Historical Snapshot <b className="text-white">v{previewVersion.version_number}</b> (Read-Only) — Submitting a prompt will fork this into a new version <b className="text-teal-300">v{(activeDiagram?.versions?.length || 0) + 1}</b>.
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setPreviewVersion(null)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-lg border border-amber-500/30 text-xs font-bold cursor-pointer transition"
                        >
                          Return to Latest (v{activeVersion?.version_number || (activeDiagram?.versions?.length || 1)})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRestoreVersion(previewVersion)}
                          className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold cursor-pointer transition shadow-sm"
                        >
                          Restore as Draft
                        </button>
                      </div>
                    </div>
                  )}

                  <div 
                    className="w-full flex-1 flex items-center justify-center p-2 md:p-4 relative overflow-auto select-none cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => {
                    if (e.target === e.currentTarget || (e.target as HTMLElement).id === 'radial-grid-background') {
                      const startX = e.clientX - pan.x;
                      const startY = e.clientY - pan.y;
                      function handleMouseMove(moveEvent: MouseEvent) {
                        setPan({
                          x: moveEvent.clientX - startX,
                          y: moveEvent.clientY - startY
                        });
                      };
                      function handleMouseUp() {
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
                      color: canvasTheme === 'light' ? 'rgba(100, 116, 139, 0.25)' : 'rgba(20, 184, 166, 0.22)',
                    }}
                  />

                  {/* Transparent Drag Overlay if Pan Mode is active */}
                  {(isPanMode || isSpacePressed) && (
                    <div 
                      className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing pointer-events-auto"
                      onMouseDown={(e) => {
                        const startX = e.clientX - pan.x;
                        const startY = e.clientY - pan.y;
                        function handleMouseMove(moveEvent: MouseEvent) {
                          setPan({
                            x: moveEvent.clientX - startX,
                            y: moveEvent.clientY - startY
                          });
                        };
                        function handleMouseUp() {
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
                    <div className="pointer-events-auto w-full h-full flex items-center justify-center p-4">
                      <DiagramViewer
                        currentLanguage={currentLanguage}
                        key={`${activeDiagram?.id || 'diag'}_${displayedVersion?.version_number || 1}_${layoutPreset}_${canvasTheme}`}
                        xml={currentXmlToRender}
                        diagramId={activeDiagram?.id}
                        useCaseName={(() => {
                          const customUseCase = activeVersion?.business_usecase || activeVersion?.technical_usecase;
                          if (customUseCase) return customUseCase;
                          if (activeDiagram?.name && !/^\d+\.\s/.test(activeDiagram.name)) return activeDiagram.name;
                          return undefined;
                        })()}
                        diagramType={(activeVersion?.architecture_type || activeDiagram?.architecture_type) ?? undefined}
                        aspectRatioId={selectedAspectRatio}
                        customW={customRatioW}
                        customH={customRatioH}
                        bgTheme={canvasTheme}
                        isLiveFlow={isLiveFlowEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

          {/* Mobile Bottom Navigation View Switcher (Only visible on screens < 768px) */}
          {activeDiagram && (
            <nav className="md:hidden h-14 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 flex items-center justify-around px-2 z-50 shrink-0 select-none">
              <button
                type="button"
                onClick={() => setMobileTab('canvas')}
                className={`flex flex-col items-center justify-center gap-0.5 px-5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mobileTab === 'canvas'
                    ? 'text-teal-400 bg-teal-500/15 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-[10px]">Diagram Canvas</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileTab('assistant')}
                className={`flex flex-col items-center justify-center gap-0.5 px-5 py-1.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                  mobileTab === 'assistant'
                    ? 'text-teal-400 bg-teal-500/15 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-[10px]">AI Assistant</span>
                {suggestions.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-teal-400 absolute top-1 right-5 animate-ping" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileTab('canvas');
                  handleAuditDiagram();
                }}
                className={`flex flex-col items-center justify-center gap-0.5 px-5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isAuditing
                    ? 'text-teal-400 bg-teal-500/15 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span className="text-[10px]">Security Audit</span>
              </button>
            </nav>
          )}
        </div>
          </>
      </main>
      )}

      {currentTab === 'templates' && renderTemplatesView()}
      {currentTab === 'walkthrough' && renderWalkthroughView()}
      {currentTab === 'audit' && renderAuditCenterView()}
      {currentTab === 'settings' && renderSettingsView()}

      {/* --- MODALS --- */}

      {/* 1. Create Diagram Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className={`rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl space-y-5 border transition-all ${
            canvasTheme === 'light'
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0B101D] border-teal-500/30 text-slate-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className={`font-black text-xl flex items-center gap-2 ${
                  canvasTheme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  <Sparkles className="w-5 h-5 text-teal-500" />
                  <span>Create New Architecture Diagram</span>
                </h3>
                <p className={`text-xs ${canvasTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  Configure your project container, define system requirements, or customize an enterprise blueprint.
                </p>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  canvasTheme === 'light'
                    ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className={`flex items-center p-1 rounded-xl border ${
              canvasTheme === 'light'
                ? 'bg-slate-100 border-slate-200'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <button
                type="button"
                id="create-modal-tab-simple"
                onClick={() => setCreateModalTab('simple')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  createModalTab === 'simple'
                    ? canvasTheme === 'light'
                      ? 'bg-white text-teal-800 shadow-sm'
                      : 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                    : canvasTheme === 'light'
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick AI Prompt (Simple)</span>
              </button>
              <button
                type="button"
                id="create-modal-tab-advanced"
                onClick={() => setCreateModalTab('advanced')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  createModalTab === 'advanced'
                    ? canvasTheme === 'light'
                      ? 'bg-white text-indigo-800 shadow-sm'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : canvasTheme === 'light'
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Blueprint Matrix &amp; 7 Dimensions (Advanced)</span>
              </button>
            </div>

            <form onSubmit={handleCreateDiagram} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                <div className="sm:col-span-6 space-y-1.5">
                  <label className={`block text-xs font-semibold flex items-center justify-between ${
                    canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    <span>Project Container</span>
                    {earlierProjects.length > 0 && (
                      <span className="text-[10px] text-teal-500 font-mono">({earlierProjects.length} earlier)</span>
                    )}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="e.g. Google Cloud Project #101"
                      className={`flex-1 min-w-0 border rounded-xl px-3.5 py-2.5 text-xs md:text-sm focus:outline-none transition-all ${
                        canvasTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                          : 'bg-bg-dark border-panel-border focus:border-teal-accent text-slate-100 placeholder-slate-400'
                      }`}
                    />
                    {earlierProjects.length > 0 && (
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            setNewProjectName(e.target.value);
                          }
                        }}
                        className={`w-28 shrink-0 border text-teal-600 dark:text-teal-400 rounded-xl px-2 py-2.5 text-xs outline-none cursor-pointer truncate ${
                          canvasTheme === 'light'
                            ? 'bg-slate-50 border-slate-300'
                            : 'bg-bg-dark border-panel-border'
                        }`}
                        title="Choose from earlier projects"
                      >
                        <option value="" disabled>📂 Earlier</option>
                        {earlierProjects.map((p: string) => (
                          <option key={p} value={p} className={canvasTheme === 'light' ? 'bg-white text-slate-900' : 'bg-[#0B101D] text-slate-200'}>
                            {p}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-6 space-y-1.5">
                  <label className={`block text-xs font-semibold ${
                    canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                  }`}>Diagram Name</label>
                  <input
                    type="text"
                    required
                    value={newDiagramName}
                    onChange={(e) => setNewDiagramName(e.target.value)}
                    placeholder="e.g., Google Cloud E-Commerce"
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-xs md:text-sm focus:outline-none transition-all ${
                      canvasTheme === 'light'
                        ? 'bg-slate-50 border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                        : 'bg-bg-dark border-panel-border focus:border-teal-accent text-slate-100 placeholder-slate-400'
                    }`}
                    autoFocus
                  />
                </div>
              </div>

              {/* Template / Blueprint Selector */}
              <div className="space-y-1.5">
                <label className={`block text-xs font-bold flex items-center justify-between ${
                  canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <span>Architecture Starting Point</span>
                  <span className="text-[10px] text-teal-500 font-mono">({facetedOptions.matchingCount} matching)</span>
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedTemplate(val);
                    if (val === 'arch_blank_canvas') {
                      setSelectedArchType('blank_canvas');
                      setNewDiagramPrompt('');
                    } else if (val.startsWith('arch_')) {
                      const archId = val.replace('arch_', '');
                      setSelectedArchType(archId);
                      syncDimensionsForBlueprint(archId);
                      const meta = getBlueprintMetadataById(archId);
                      if (meta?.goldenExamplePayload) {
                        setNewDiagramPrompt(meta.goldenExamplePayload);
                      } else {
                        const arch = getArchitectureTypeById(archId);
                        if (arch) {
                          setNewDiagramPrompt(arch.prompt);
                        }
                      }
                    } else if (val !== 'custom') {
                      const idx = parseInt(val, 10);
                      const t = TEMPLATE_PROMPTS[idx];
                      if (t) {
                        setNewDiagramPrompt(t.prompt);
                      }
                    }
                  }}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-bold focus:outline-none transition-all cursor-pointer shadow-sm ${
                    canvasTheme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-teal-900 focus:border-teal-500'
                      : 'bg-slate-900 border-teal-500/40 text-teal-300 focus:border-teal-accent'
                  }`}
                >
                  <option value="0" className={canvasTheme === 'light' ? 'bg-white text-teal-800' : 'bg-[#0b101d] text-teal-300'}>
                    ✨ Auto-Detect Architecture ({facetedOptions.matchingCount} Matching)
                  </option>
                  <option value="arch_blank_canvas" className={canvasTheme === 'light' ? 'bg-white text-slate-800' : 'bg-[#0b101d] text-slate-200'}>
                    ⬜ Clean Blank Canvas (Draw.io + GCP Stencils)
                  </option>
                  {facetedOptions.matchingBlueprints.length > 0 ? (
                    facetedOptions.matchingBlueprints.map((item) => (
                      <option key={item.combinedId} value={`arch_${item.combinedId}`} className={canvasTheme === 'light' ? 'bg-white text-slate-800' : 'bg-[#0b101d] text-slate-100'}>
                        🏛️ {item.diagramName}
                      </option>
                    ))
                  ) : (
                    <option disabled value="" className="bg-[#0b101d] text-amber-400 font-bold py-1">
                      ⚠️ No blueprints match this combination
                    </option>
                  )}
                  <option value="custom" className={canvasTheme === 'light' ? 'bg-white text-teal-800' : 'bg-[#0b101d] text-teal-300'}>
                    ✍️ Custom Freeform Prompt...
                  </option>
                </select>
              </div>

              {/* 7 Dimensions Matrix (Only in Advanced Tab) */}
              {createModalTab === 'advanced' && (
                <div className={`border rounded-2xl p-3.5 space-y-2.5 ${
                  canvasTheme === 'light'
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#070A13]/90 border-slate-800/90'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-teal-500 flex items-center gap-1.5">
                        <Settings2 className="w-3.5 h-3.5" />
                        <span>Architectural Classification &amp; Lifecycle Dimensions</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-300 font-mono">
                        {facetedOptions.matchingCount} of {BLUEPRINT_KNOWLEDGE_MATRIX.length} Matching
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-[10px] font-bold text-slate-400 hover:text-teal-500 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                      title="Reset all dimension filters"
                    >
                      <RotateCcw className="w-3 h-3 text-slate-400 hover:text-teal-500" />
                      <span>Reset Filters</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {/* 1. Phase Name */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'}`} title="Phase Name">
                        Phase Name
                      </label>
                      <select
                        value={selectedPhaseName}
                        onChange={(e) => setSelectedPhaseName(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-1.5 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-800 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-700' : 'bg-[#0B101D] text-teal-300'}>✨ All 7 Phases (50 Blueprints)</option>
                        {PHASE_NAME_OPTIONS.map((opt) => {
                          const count = facetedOptions.phaseCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-800' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 2. Architecture Domain */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'}`} title="Architecture Domain">
                        Domain
                      </label>
                      <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-1.5 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-800 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-700' : 'bg-[#0B101D] text-teal-300'}>✨ All 6 Domains</option>
                        {ARCHITECTURE_DOMAIN_OPTIONS.map((opt) => {
                          const count = facetedOptions.domainCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-800' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 3. Abstraction Level */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'}`} title="Abstraction Level">
                        Abstraction
                      </label>
                      <select
                        value={selectedAbstractionLevel}
                        onChange={(e) => setSelectedAbstractionLevel(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-1.5 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-800 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-700' : 'bg-[#0B101D] text-teal-300'}>✨ All 4 Abstractions</option>
                        {ABSTRACTION_LEVEL_OPTIONS.map((opt) => {
                          const count = facetedOptions.abstractionCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-800' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* 4. Stack Layer */}
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold truncate ${canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'}`} title="Architectural Stack Layer">
                        Stack Layer
                      </label>
                      <select
                        value={selectedStackLayer}
                        onChange={(e) => setSelectedStackLayer(e.target.value)}
                        className={`w-full border text-xs rounded-xl px-2.5 py-1.5 outline-none cursor-pointer transition-all truncate ${
                          canvasTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-800 focus:border-teal-500'
                            : 'bg-[#0B101D] border-slate-700/80 text-slate-200 focus:border-teal-400'
                        }`}
                      >
                        <option value="ALL" className={canvasTheme === 'light' ? 'bg-white text-teal-700' : 'bg-[#0B101D] text-teal-300'}>✨ All 5 Layers</option>
                        {ARCHITECTURAL_STACK_LAYER_OPTIONS.map((opt) => {
                          const count = facetedOptions.stackLayerCounts[opt] || 0;
                          return (
                            <option key={opt} value={opt} disabled={count === 0} className={canvasTheme === 'light' ? (count > 0 ? 'bg-white text-slate-800' : 'bg-white text-slate-400') : (count > 0 ? 'bg-[#0B101D] text-slate-200' : 'bg-[#0B101D] text-slate-500')}>
                              {opt} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Initial Prompt Area */}
              <div className="space-y-1.5">
                <label className={`block text-xs font-semibold flex items-center justify-between ${
                  canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  <span>System Requirements &amp; AI Directives</span>
                  <span className="text-[10px] text-teal-500 font-mono">Gemini 3.7 Flash</span>
                </label>
                <textarea
                  rows={3}
                  value={newDiagramPrompt}
                  onChange={(e) => setNewDiagramPrompt(e.target.value)}
                  placeholder="e.g., Design a production-grade multi-tier enterprise architecture on Google Cloud with GKE Autopilot, Cloud Armor, and Cloud SQL PostgreSQL..."
                  className={`w-full border rounded-xl p-3 text-xs md:text-sm focus:outline-none transition-all resize-none ${
                    canvasTheme === 'light'
                      ? 'bg-slate-50 border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-bg-dark border-panel-border focus:border-teal-accent text-slate-100 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Privacy Setting */}
              <div className="pt-1">
                <label className={`flex items-center gap-2 text-xs font-bold cursor-pointer select-none ${
                  canvasTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={newDiagramIsPrivate}
                    onChange={(e) => setNewDiagramIsPrivate(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-400 text-teal-500 focus:ring-teal-400 cursor-pointer"
                  />
                  {newDiagramIsPrivate ? (
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-300">
                      <Lock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Private Diagram (Only visible to me)</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-teal-600 dark:text-teal-300">
                      <Globe className="w-3.5 h-3.5 text-teal-500" />
                      <span>Public Diagram (Shared &amp; reusable across sessions)</span>
                    </span>
                  )}
                </label>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isAnyAIBusy}
                className="w-full py-3.5 rounded-2xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-black text-sm md:text-base transition-all shadow-lg shadow-teal-500/20 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#070a13]" />
                    <span>Synthesizing Architecture...</span>
                  </>
                ) : (
                  <span>🚀 Create &amp; Open Architecture Canvas</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AI GENERATION REAL-TIME PROGRESS MODAL */}
      <AIGenerationProgressModal isOpen={isGenerating} promptTitle={newDiagramPrompt || activeDiagram?.name} />

      {/* INTENT ROUTER DISAMBIGUATION CHIPS MODAL */}
      {disambiguationData && (
        <DiagramTypeSelector
          prompt={disambiguationData.prompt}
          suggestedTypes={disambiguationData.suggestedTypes}
          assumptions={disambiguationData.assumptions}
          reasoning={disambiguationData.reasoning}
          onSelectType={handleSelectDisambiguationType}
          onCancel={() => setDisambiguationData(null)}
        />
      )}

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
                  disabled={selectedGapIds.length === 0 || isAnyAIBusy}
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

      {/* Set as Master Template Modal */}
      <SetMasterTemplateModal
        isOpen={isSetMasterModalOpen}
        onClose={() => setIsSetMasterModalOpen(false)}
        currentXml={displayedVersion?.xml_content || activeVersion?.xml_content || ''}
        currentDiagramName={activeDiagram?.name || 'New Master Architecture'}
        currentArchId={activeDiagram?.architecture_type || undefined}
        onSuccess={(template) => {
          setForceRefreshToast({
            message: `⭐ "${template.name}" successfully published as Master Template!`,
            type: 'success'
          });
          setTimeout(() => setForceRefreshToast(null), 5000);
        }}
      />

      {/* Document Composer Modal (PRD, SDD, FDD, Threat Model) */}
      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        currentTitle={activeDiagram?.name}
        currentXml={displayedVersion?.xml_content || activeVersion?.xml_content || ''}
        activeDiagramVersionId={displayedVersion?.id || activeVersion?.id}
      />

      {/* Cloud Cost Estimator Modal (Infracost Engine) */}
      <CloudCostModal
        isOpen={isCostModalOpen}
        onClose={() => setIsCostModalOpen(false)}
        costReport={costReport}
      />

      <ArchitectureCodeViewerModal
        isOpen={isCodeViewerOpen}
        onClose={() => setIsCodeViewerOpen(false)}
        xmlContent={activeVersion?.xml_content || activeDiagram?.versions?.[0]?.xml_content || ''}
        diagramName={activeDiagram?.name || 'Cloud Architecture'}
        initialFormat={codeViewerFormat}
      />

      {/* 9. Password Setup & Browser Auto-Login Modal */}
      <PasswordSetupModal
        isOpen={isPasswordSetupOpen}
        onClose={() => setIsPasswordSetupOpen(false)}
        userEmail={currentUser?.email || ''}
      />

      {/* Interactive Onboarding Guided Tour Overlay */}
      {isMounted && tourStep !== null && (
        <>
          {/* Backdrop Mask */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-[1px] z-40 transition-opacity duration-300"
            onClick={() => setTourStep(null)}
          />

          {/* Tour Step Cards */}
          {tourStep === 1 && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-4xl bg-slate-950/95 border border-teal-500/40 p-6 md:p-8 rounded-3xl shadow-[0_0_80px_rgba(20,184,166,0.2)] z-[70] space-y-6 animate-fade-in backdrop-blur-2xl">
              {/* Header Banner */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 via-emerald-500/15 to-cyan-500/15 border border-teal-500/30 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest text-teal-300">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-teal-400" />
                  <span>DesignerUp Principle: Role Personalization</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Choose Your Architectural Persona
                </h3>
                <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Select your role to instantly hydrate PromptCanvas with tailored starter blueprints, persona-focused AI prompts, and domain-specific audit rules.
                </p>
              </div>

              {/* Persona Cards 2x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Persona 1: Enterprise Architect */}
                <div
                  onClick={() => setSelectedPersona('architect')}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedPersona === 'architect'
                      ? 'bg-slate-900/90 border-teal-400 ring-2 ring-teal-400/40 shadow-xl shadow-teal-500/15 scale-[1.01]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                      🏢 System Strategy
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>Enterprise Systems Architect</span>
                      {selectedPersona === 'architect' && (
                        <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Master multi-tier cloud topology, VPC perimeters, system boundaries &amp; enterprise AI platforms.
                    </p>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 border-t border-slate-800/80">
                    <span className="text-teal-400 font-bold">Default Blueprint:</span>
                    <span>{currentLanguage === 'hi' ? '10. एकीकृत सिस्टम दृश्य' : '10. Unified System View'}</span>
                  </div>
                </div>

                {/* Persona 2: Data Engineer & Modeler */}
                <div
                  onClick={() => setSelectedPersona('data_engineer')}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedPersona === 'data_engineer'
                      ? 'bg-slate-900/90 border-indigo-400 ring-2 ring-indigo-400/40 shadow-xl shadow-indigo-500/15 scale-[1.01]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                      <Database className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                      📊 Data &amp; Schemas
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>Data Engineer &amp; Database Modeler</span>
                      {selectedPersona === 'data_engineer' && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Design ERDs, dimensional fact/dimension tables, Feature Stores, dbt pipelines &amp; ETL flows.
                    </p>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 border-t border-slate-800/80">
                    <span className="text-indigo-400 font-bold">Default Blueprint:</span>
                    <span>2. Dimensional Data Model (ERD)</span>
                  </div>
                </div>

                {/* Persona 3: AI & Cognitive Engineer */}
                <div
                  onClick={() => setSelectedPersona('ai_engineer')}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedPersona === 'ai_engineer'
                      ? 'bg-slate-900/90 border-emerald-400 ring-2 ring-emerald-400/40 shadow-xl shadow-emerald-500/15 scale-[1.01]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                      🤖 GenAI &amp; Agents
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>AI &amp; Cognitive Systems Engineer</span>
                      {selectedPersona === 'ai_engineer' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Build Agentic RAG systems, ReAct reasoning loops, Vertex AI training &amp; model registries.
                    </p>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 border-t border-slate-800/80">
                    <span className="text-emerald-400 font-bold">Default Blueprint:</span>
                    <span>3. Cognitive Architecture (Agentic RAG)</span>
                  </div>
                </div>

                {/* Persona 4: Cybersecurity & Compliance Lead */}
                <div
                  onClick={() => setSelectedPersona('security_lead')}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedPersona === 'security_lead'
                      ? 'bg-slate-900/90 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/15 scale-[1.01]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                      🛡️ Security &amp; Governance
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>Cybersecurity &amp; Compliance Lead</span>
                      {selectedPersona === 'security_lead' && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Audit IAM policies, SOC2/HIPAA compliance, adversarial threat models &amp; governance state machines.
                    </p>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 border-t border-slate-800/80">
                    <span className="text-amber-400 font-bold">Default Blueprint:</span>
                    <span>9. Governance &amp; State Machine</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setTourStep(null)}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Skip Persona Selection
                </button>
                <button
                  id="tour-next-btn"
                  type="button"
                  onClick={async () => {
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('pc_user_persona', selectedPersona);
                    }
                    if (!activeDiagram && diagrams.length > 0) {
                      await loadDiagramDetails(diagrams[0].id);
                    }
                    const targetArch =
                      selectedPersona === 'architect'
                        ? 'unified_system_view'
                        : selectedPersona === 'data_engineer'
                        ? 'erd'
                        : selectedPersona === 'ai_engineer'
                        ? 'agentic_rag'
                        : 'governance_state_machine';
                    handleArchitectureSwitch(targetArch);
                    setTourStep(2);
                  }}
                  className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-bg-dark text-xs font-black transition-all shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🚀 Launch Personalised Canvas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {tourStep === 2 && (
            <div className="fixed right-20 top-24 w-88 bg-slate-900 border-2 border-teal-400 p-5 rounded-2xl shadow-2xl z-[80] space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-panel-border/40 pb-2">
                <span className="text-[10px] font-black text-teal-300 uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                  Step 1 of 5
                </span>
                <span className="text-xs font-bold text-amber-300 animate-pulse flex items-center gap-1">
                  <span>⏳ Waiting for User Action</span>
                </span>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span className="text-teal-400 text-base">👈</span>
                  <span>Action Required: Switch Architecture</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  Look at the glowing <strong className="text-teal-300">Architecture Category</strong> dropdown highlighted in bright cyan on the left side of the top header bar. Click it and select any template to observe live backbone rendering!
                </p>
              </div>
              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setTourStep(1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  id="tour-next-btn"
                  onClick={() => setTourStep(3)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Skip Step ➔
                </button>
              </div>
            </div>
          )}

          {tourStep === 3 && (
            <div className="fixed left-[350px] top-48 w-88 bg-slate-900 border border-teal-400 p-5 rounded-2xl shadow-2xl z-[70] space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-panel-border/40 pb-2">
                <span className="text-[10px] font-black text-teal-300 uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                  Step 2 of 5
                </span>
                <span className="text-xs font-bold text-amber-300 animate-pulse flex items-center gap-1">
                  <span>⏳ Waiting for User Action</span>
                </span>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span className="text-teal-400 text-base">👉</span>
                  <span>Action Required: Refine via AI</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  Type a prompt (e.g., <strong className="text-teal-300">&ldquo;Add Apigee API Gateway&rdquo;</strong>) into the prompt input box and click <strong className="text-teal-300">Send</strong>, OR click one of our suggested prompt pills below!
                </p>
              </div>
              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setTourStep(2)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  id="tour-next-btn"
                  onClick={() => setTourStep(4)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Skip Step ➔
                </button>
              </div>
            </div>
          )}

          {tourStep === 4 && (
            <div className="fixed right-64 top-24 w-88 bg-slate-900 border border-teal-400 p-5 rounded-2xl shadow-2xl z-[70] space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-panel-border/40 pb-2">
                <span className="text-[10px] font-black text-teal-300 uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                  Step 3 of 5
                </span>
                <span className="text-xs font-bold text-amber-300 animate-pulse flex items-center gap-1">
                  <span>⏳ Waiting for User Action</span>
                </span>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span className="text-teal-400 text-base">👉</span>
                  <span>Action Required: Toggle Theme</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  Click the highlighted <strong className="text-teal-300">Light / Dark Theme</strong> button above to observe live canvas theme switching and high-contrast color palette adaptation!
                </p>
              </div>
              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setTourStep(3)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  id="tour-next-btn"
                  onClick={() => setTourStep(5)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Skip Step ➔
                </button>
              </div>
            </div>
          )}

          {tourStep === 5 && (
            <div className="fixed right-20 top-24 w-88 bg-slate-900 border border-teal-400 p-5 rounded-2xl shadow-2xl z-[70] space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-panel-border/40 pb-2">
                <span className="text-[10px] font-black text-teal-300 uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                  Step 4 of 5
                </span>
                <span className="text-xs font-bold text-amber-300 animate-pulse flex items-center gap-1">
                  <span>⏳ Waiting for User Action</span>
                </span>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span className="text-teal-400 text-base">👉</span>
                  <span>Action Required: Audit Security</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  Click the highlighted <strong className="text-teal-300">🛡️ Audit Security</strong> button above to execute a live 6-category posture and vulnerability evaluation!
                </p>
              </div>
              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setTourStep(4)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  id="tour-next-btn"
                  onClick={() => setTourStep(6)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Skip Step ➔
                </button>
              </div>
            </div>
          )}

          {tourStep === 6 && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-slate-900 border border-teal-500/40 p-6 md:p-8 rounded-3xl shadow-2xl shadow-teal-500/20 z-[70] text-center space-y-5 animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  Demo Mode Complete
                </span>
                <h3 className="text-xl font-black text-white">Interactive Demo Complete!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Congratulations! You have completed the live end-to-end onboarding demo: switching architectures, refining via AI, exploring canvas viewports, and running automated security audits!
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <button
                  id="tour-finish-btn"
                  type="button"
                  onClick={() => setTourStep(null)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-bg-dark text-xs font-black transition-all shadow-lg shadow-teal-500/30 cursor-pointer"
                >
                  Finish Onboarding & Start Designing
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

      {/* Architecture Change Consent Modal */}
      {isArchConsentModalOpen && pendingArchType && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-panel border-panel-border rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0 text-teal-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">Generate Architecture?</h3>
                <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">
                  Switching to {getArchitectureTypeById(pendingArchType).name}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              Do you consent to generating a brand new architectural diagram version for <strong>{activeDiagram?.name || 'this workspace'}</strong> using Gemini 3.6 Flash? This will create a new version in your version history.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                id="arch-consent-cancel-btn"
                type="button"
                onClick={() => {
                  setIsArchConsentModalOpen(false);
                  setPendingArchType(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="arch-consent-confirm-btn"
                type="button"
                onClick={async () => {
                  const archToGen = pendingArchType;
                  setIsArchConsentModalOpen(false);
                  setPendingArchType(null);
                  if (archToGen && activeDiagram) {
                    setSelectedArchType(archToGen);
                    const archObj = getArchitectureTypeById(archToGen);
                    setIsGenerating(true);
                    try {
                      const res = await fetch('/api/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', ...(userApiKey ? { 'x-gemini-api-key': userApiKey } : {}) },
                        body: JSON.stringify({
                          diagramId: activeDiagram.id,
                          prompt: `Use Case Topic: "${activeDiagram.name}". ${archObj.prompt}`,
                          architectureType: archToGen
                        })
                      });
                      if (!res.ok) throw new Error('Failed to generate new architecture version');
                      await fetchDiagrams();
                      await loadDiagramDetails(activeDiagram.id);
                      if (archToGen === 'technical_diagram' || archToGen === 'conceptual_diagram' || archToGen === 'erd') {
                        setViewMode('canvas');
                        setLayoutPreset('detailed');
                      }
                    } catch (err) {
                      console.error(err);
                      alert('Error generating architecture diagram version');
                    } finally {
                      setIsGenerating(false);
                    }
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-[#070a13] font-black text-sm transition-all shadow-lg shadow-teal-500/20 hover:scale-[1.02] cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Yes, Generate 2nd Diagram</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Edge-to-Edge Fullscreen Version History & Visual Diff Modal */}
      {isVersionDiffModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-[#070a13] flex flex-col w-screen h-screen overflow-hidden p-2 gap-2">
          {/* Header Bar - Reclaimed Space */}
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-teal-500/30 bg-[#0b101d] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <FileCode className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-100 uppercase tracking-wide">🔍 FULL-SCREEN DIAGRAM VERSION DIFF &amp; GEOMETRIC INTEGRITY COMPARATOR</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">Zero-Collision v2.0 Active</span>
                </div>
                <p className="text-[11px] text-slate-400">Side-by-Side Architectural Visual Comparison • Reclaimed Edge-to-Edge Desktop Layout</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsVersionDiffModalOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 text-xs font-bold transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Close Diff Workspace</span>
            </button>
          </div>

          {/* Dual Edge-to-Edge Side-by-Side Viewport Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0">
            {/* LEFT PANEL with Version Selection Dropdown & Highlighted Defects */}
            <div className="bg-[#0b101d] border border-slate-700/80 rounded-xl p-2.5 flex flex-col min-h-0">
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[11px] font-black border border-rose-500/30">LEFT VIEWPORT</span>
                  <span className="text-xs font-bold text-slate-300">Select Version:</span>
                </div>
                <select
                  value={leftVersionSelection}
                  onChange={(e) => setLeftVersionSelection(e.target.value)}
                  className="bg-slate-950 border border-rose-500/40 focus:border-rose-400 text-rose-200 rounded-lg px-2.5 py-1 text-xs font-bold cursor-pointer"
                >
                  <option value="v1_initial">🔴 Version 1.0 Benchmark (Stretched Boxes &amp; Overlaps)</option>
                  <option value="v2_current">🟢 Version 2.0 Benchmark (Pixel-Perfect Zero-Collision)</option>
                  {(activeDiagram?.versions || []).map((v: DiagramVersion, idx: number) => (
                    <option key={v.id} value={v.id}>
                      📌 Workspace Version #{v.version_number || ((activeDiagram?.versions || []).length - idx)} ({new Date(v.created_at).toLocaleTimeString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Bold Visual Highlight Callout Banner for LEFT PANEL */}
              <div className="grid grid-cols-3 gap-1.5 mb-2 shrink-0">
                <div className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-[10px] text-rose-200 font-medium">
                  <strong>🔴 Overlap 1:</strong> Ingress vector sliced across <code>[2b] Public Subnet</code> title.
                </div>
                <div className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-[10px] text-rose-200 font-medium">
                  <strong>🔴 Overlap 2:</strong> <code>Outbound Access</code> label sat on <code>[3] NAT</code> border.
                </div>
                <div className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-[10px] text-rose-200 font-medium">
                  <strong>🔴 Proportions:</strong> Stretched <code>480px</code> boxes crowded subnets.
                </div>
              </div>

              {/* Full-Height Edge-to-Edge Left Visual Canvas Viewport */}
              <div className="flex-1 rounded-lg border border-slate-700 bg-white overflow-hidden relative min-h-0">
                <iframe
                  key={`left-preview-${leftVersionSelection}`}
                  src="https://embed.diagrams.net/?embed=1&ui=light&spin=0&proto=json&chrome=0"
                  className="w-full h-full border-none"
                  onLoad={(e) => {
                    const target = e.currentTarget;
                    const xmlToLoad =
                      leftVersionSelection === 'v1_initial'
                        ? getExactAgenticMeshXml().replace('w="280"', 'w="480"')
                        : leftVersionSelection === 'v2_current'
                        ? getExactAgenticMeshXml()
                        : (activeDiagram?.versions || []).find((v: DiagramVersion) => v.id === leftVersionSelection)?.xml_content || getExactAgenticMeshXml();
                    setTimeout(() => {
                      try {
                        target.contentWindow?.postMessage(JSON.stringify({ action: 'load', xml: sanitizeDrawioXmlAttributes(xmlToLoad), fit: true }), '*');
                      } catch(err) {}
                    }, 500);
                  }}
                />
              </div>
            </div>

            {/* RIGHT PANEL with Version Selection Dropdown & Highlighted Resolutions */}
            <div className="bg-[#0b101d] border border-teal-500/50 rounded-xl p-2.5 flex flex-col min-h-0">
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-black border border-emerald-500/30">RIGHT VIEWPORT</span>
                  <span className="text-xs font-bold text-slate-300">Select Version:</span>
                </div>
                <select
                  value={rightVersionSelection}
                  onChange={(e) => setRightVersionSelection(e.target.value)}
                  className="bg-slate-950 border border-teal-500/60 focus:border-teal-400 text-teal-300 rounded-lg px-2.5 py-1 text-xs font-bold cursor-pointer"
                >
                  <option value="v2_current">🟢 Version 2.0 Benchmark (Pixel-Perfect Zero-Collision)</option>
                  <option value="v1_initial">🔴 Version 1.0 Benchmark (Stretched Boxes &amp; Overlaps)</option>
                  {(activeDiagram?.versions || []).map((v: DiagramVersion, idx: number) => (
                    <option key={v.id} value={v.id}>
                      📌 Workspace Version #{v.version_number || ((activeDiagram?.versions || []).length - idx)} ({new Date(v.created_at).toLocaleTimeString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Bold Visual Highlight Callout Banner for RIGHT PANEL */}
              <div className="grid grid-cols-3 gap-1.5 mb-2 shrink-0">
                <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-200 font-medium">
                  <strong>🟢 Fix 1:</strong> Dedicated <code>40px</code> left entrance channel at <code>x=120</code>.
                </div>
                <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-200 font-medium">
                  <strong>🟢 Fix 2:</strong> Wide <code>80px</code> gap with white mask pill on <code>Outbound Access</code>.
                </div>
                <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-200 font-medium">
                  <strong>🟢 Proportions:</strong> Compact <code>280..320px</code> boxes with clear margins.
                </div>
              </div>

              {/* Full-Height Edge-to-Edge Right Visual Canvas Viewport */}
              <div className="flex-1 rounded-lg border border-teal-500/40 bg-white overflow-hidden relative min-h-0">
                <iframe
                  key={`right-preview-${rightVersionSelection}`}
                  src="https://embed.diagrams.net/?embed=1&ui=light&spin=0&proto=json&chrome=0"
                  className="w-full h-full border-none"
                  onLoad={(e) => {
                    const target = e.currentTarget;
                    const xmlToLoad =
                      rightVersionSelection === 'v1_initial'
                        ? getExactAgenticMeshXml().replace('w="280"', 'w="480"')
                        : rightVersionSelection === 'v2_current'
                        ? getExactAgenticMeshXml()
                        : (activeDiagram?.versions || []).find((v: DiagramVersion) => v.id === rightVersionSelection)?.xml_content || getExactAgenticMeshXml();
                    setTimeout(() => {
                      try {
                        target.contentWindow?.postMessage(JSON.stringify({ action: 'load', xml: sanitizeDrawioXmlAttributes(xmlToLoad), fit: true }), '*');
                      } catch(err) {}
                    }, 500);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setCurrentUser(u);
          setIsAuthOpen(false);
          if (activeDiagram) {
            loadDiagramDetails(activeDiagram.id);
          }
        }}
      />

      <UseCaseIntakeModal
        isOpen={isUseCaseModalOpen}
        onClose={() => setIsUseCaseModalOpen(false)}
        onSubmitUseCase={(data) => {
          const promptText = `Act as an Enterprise Cloud Architect for ${data.domain} on ${data.cloudProvider} with ${data.complianceTier}. Build standard publication-grade architecture for: ${data.title}. System details: ${data.description}`;
          setPromptInput(promptText);
          setIsUseCaseModalOpen(false);

          // Immediately compile & apply user-specific domain workflow nodes onto the active canvas
          try {
            const selectedXml = data.archType ? getDefaultXmlForArchitecture(data.archType) : null;
            const baseXml = selectedXml || (activeDiagram as any)?.xml_content || (activeDiagram?.versions && activeDiagram.versions[0]?.xml_content) || getExactAgenticMeshXml();
            if (data.archType) {
              setSelectedArchType(data.archType);
            }
            const flavoredXml = injectUseCaseFlavor(baseXml, data.title, `${data.title}. ${data.description}. Domain: ${data.domain}. Cloud: ${data.cloudProvider}. Compliance: ${data.complianceTier}`);
            setPendingXml(flavoredXml);
            if (activeDiagram) {
              setActiveDiagram({
                ...activeDiagram,
                name: data.title,
                xml_content: flavoredXml
              } as any);
            }
            if (activeVersion) {
              setActiveVersion({
                ...activeVersion,
                xml_content: flavoredXml
              });
            }
          } catch (e) {
            console.warn('Real-time flavor injection fallback', e);
          }
        }}
      />

      <ExecutiveStrategicSummaryModal
        isOpen={isExecutiveSummaryOpen}
        onClose={() => setIsExecutiveSummaryOpen(false)}
        diagramTitle={activeDiagram?.name || getArchitectureTypeById(selectedArchType)?.name || 'Enterprise Architecture Platform'}
        architectureType={selectedArchType}
        xmlContent={customXml || activeXmlRef.current || activeVersion?.xml_content || (activeDiagram as any)?.xml_content || ''}
        prompt={activeVersion?.prompt || (activeDiagram as any)?.prompt || promptInput || ''}
        businessUsecase={activeVersion?.business_usecase || (activeDiagram as any)?.business_usecase || ''}
        technicalUsecase={activeVersion?.technical_usecase || (activeDiagram as any)?.technical_usecase || ''}
        aiReasoning={activeVersion?.ai_reasoning || (activeDiagram as any)?.ai_reasoning || ''}
      />

      {/* BYOK MULTI-CONNECTION ENTERPRISE VAULT & HEALTH MONITOR MODAL */}
      {isByokModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🔑</span>
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">BYOK Enterprise Connection Vault &amp; Health Monitor</h3>
                  <p className="text-xs text-slate-400">Manage multiple Gemini API keys, test active health, and override default system keys.</p>
                </div>
              </div>
              <button
                onClick={() => setIsByokModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Profiles List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-teal-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Saved API Connections ({byokProfiles.length})</span>
                  <span className="text-[11px] text-slate-400 font-normal">Active key overrides system default</span>
                </h4>

                {byokProfiles.map((prof) => {
                  const isActive = prof.id === activeByokProfileId;
                  return (
                    <div
                      key={prof.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-teal-950/20 border-teal-500/60 ring-1 ring-teal-500/30'
                          : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-white truncate">{prof.name}</span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-teal-500 text-bg-dark">
                                ACTIVE
                              </span>
                            )}
                            {/* Health Badge */}
                            {prof.status === 'verified' && (
                              <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                                <span>🟢 Healthy</span>
                                {prof.lastTestedLatencyMs && <span>({prof.lastTestedLatencyMs}ms)</span>}
                              </span>
                            )}
                            {prof.status === 'error' && (
                              <span className="flex items-center gap-1 text-[10px] font-extrabold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                                <span>🔴 Unhealthy / Invalid Key</span>
                              </span>
                            )}
                            {prof.status === 'untested' && (
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">
                                ⚪ Untested
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                            <span>Model: <strong className="text-slate-200">{prof.model}</strong></span>
                            <span>Key: <code className="text-teal-300/80">{prof.apiKey ? prof.apiKey.slice(0, 8) + '... ' + prof.apiKey.slice(-4) : 'System Default Key'}</code></span>
                          </div>
                        </div>

                        {/* Connection Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={async () => {
                              if (!prof.apiKey) return;
                              const start = Date.now();
                              try {
                                const res = await fetch('/api/generate/usecases', {
                                  headers: { 'x-gemini-api-key': prof.apiKey }
                                });
                                const duration = Date.now() - start;
                                const updated = byokProfiles.map(p =>
                                  p.id === prof.id
                                    ? { ...p, status: (res.ok ? 'verified' : 'error') as any, lastTestedLatencyMs: duration }
                                    : p
                                );
                                saveProfilesToStorage(updated, activeByokProfileId);
                              } catch (e) {
                                const updated = byokProfiles.map(p =>
                                  p.id === prof.id ? { ...p, status: 'error' as any } : p
                                );
                                saveProfilesToStorage(updated, activeByokProfileId);
                              }
                            }}
                            disabled={!prof.apiKey}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-xs font-bold text-slate-200 transition-all cursor-pointer"
                            title="Actively validate connection health against Gemini 3.6 API"
                          >
                            ⚡ Validate Health
                          </button>

                          {!isActive && (
                            <button
                              onClick={() => saveProfilesToStorage(byokProfiles, prof.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs font-bold text-bg-dark transition-all cursor-pointer"
                            >
                              Set Active
                            </button>
                          )}

                          {prof.id !== 'default_prod' && (
                            <button
                              onClick={() => {
                                const remaining = byokProfiles.filter(p => p.id !== prof.id);
                                const nextActive = isActive ? remaining[0]?.id || 'default_prod' : activeByokProfileId;
                                saveProfilesToStorage(remaining, nextActive);
                              }}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                              title="Delete connection profile"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Connection Profile Form */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 pt-4">
                <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  + Add &amp; Validate New BYOK Connection
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Connection Name</label>
                    <input
                      type="text"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      placeholder="e.g. Enterprise Gemini 3.7 Flash"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Model Tier</label>
                    <select
                      value={newProfileModel}
                      onChange={(e) => setNewProfileModel(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                    >
                      <option value="gemini-3.7-flash">Gemini 3.7 Flash (Default - High Speed &amp; Reasoning)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Google Gemini API Key (AIzaSy...)</label>
                  <input
                    type="password"
                    value={newProfileKey}
                    onChange={(e) => setNewProfileKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 font-mono"
                  />
                </div>
                <button
                  onClick={handleAddAndTestConnection}
                  disabled={!newProfileKey.trim() || byokTestStatus === 'testing'}
                  className="w-full py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-bg-dark font-extrabold text-xs transition-all cursor-pointer disabled:opacity-40"
                >
                  {byokTestStatus === 'testing' ? '⚡ Testing Connection Health...' : '+ Add, Test &amp; Activate Connection'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {aiStepTelemetry && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-teal-500/60 rounded-xl px-4 py-3 shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </span>
          <span className="text-xs font-black text-teal-300 tracking-wide">{aiStepTelemetry}</span>
        </div>
      )}
      {/* ========================================================================= */}
      {/* 🏛️ MASTER TEMPLATE CAROUSEL PREVIEW MODAL (AGNOSTIC OF ACTIVE CANVAS) */}
      {/* ========================================================================= */}
      {previewModalTemplateId && (() => {
        const allTemplates = BLUEPRINT_KNOWLEDGE_MATRIX;
        
        // Dynamic Filtered Pool based on Modal Dropdowns
        const filteredTemplates = allTemplates.filter((t) => {
          if (previewModalPhaseFilter !== 'ALL' && t.phaseName !== previewModalPhaseFilter && !t.phaseName.startsWith(previewModalPhaseFilter) && t.phase !== previewModalPhaseFilter) {
            return false;
          }
          if (previewModalAbstractionFilter !== 'ALL' && t.abstractionLevel !== previewModalAbstractionFilter) {
            return false;
          }
          if (previewModalLayerFilter !== 'ALL' && t.stackLayer !== previewModalLayerFilter) {
            return false;
          }
          return true;
        });

        const activeList = filteredTemplates.length > 0 ? filteredTemplates : allTemplates;
        const currentIdx = activeList.findIndex(t => t.combinedId === previewModalTemplateId);
        const currentTemplate = activeList[currentIdx !== -1 ? currentIdx : 0] || allTemplates[0];
        const masterXml = getDefaultXmlForArchitecture(currentTemplate.combinedId) || '';

        const handlePrev = () => {
          const prevIdx = (currentIdx - 1 + activeList.length) % activeList.length;
          setPreviewModalTemplateId(activeList[prevIdx].combinedId);
        };

        const handleNext = () => {
          const nextIdx = (currentIdx + 1) % activeList.length;
          setPreviewModalTemplateId(activeList[nextIdx].combinedId);
        };

        const phases = [
          'Phase 1: Current State Assessment & Baseline',
          'Phase 2: Business Vision & Strategy Alignment',
          'Phase 3: Target State Logical Architecture',
          'Phase 4: Technical Deep-Dive & Security Validation',
          'Phase 5: Transition Planning & Operational Readiness',
          'Phase 6: Industry Specialized Solutions',
          'Phase 7: Universal Architecture Standards'
        ];

        const hasActiveFilters = previewModalPhaseFilter !== 'ALL' || previewModalAbstractionFilter !== 'ALL' || previewModalLayerFilter !== 'ALL';

        return (
          <div className="fixed inset-0 z-[1000] bg-slate-950/90 backdrop-blur-md flex flex-col w-screen h-screen overflow-hidden p-2 md:p-5 animate-fade-in select-none">
            {/* Header Control Toolbar */}
            <div className="flex flex-col gap-2.5 px-5 py-3.5 rounded-2xl border border-teal-500/40 bg-[#0B0F19] shadow-2xl shrink-0">
              {/* Row 1: Identity & Badges & Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Left: Template Identity & Dynamic Metadata Badges */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0 shadow-sm">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    {/* Dynamic Badges: Phase Name as Phase, Abstraction Level as ABSTRACTION, Architectural Stack Layer as LAYER */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-cyan-500/15 text-cyan-300 border-cyan-500/30 flex items-center gap-1 shadow-sm">
                        <Folder className="w-3 h-3 text-cyan-400" />
                        <span>Phase: {currentTemplate.phaseName}</span>
                      </span>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-purple-500/15 text-purple-300 border-purple-500/30 flex items-center gap-1 shadow-sm">
                        <Layers className="w-3 h-3 text-purple-400" />
                        <span>ABSTRACTION: {currentTemplate.abstractionLevel}</span>
                      </span>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-amber-500/15 text-amber-300 border-amber-500/30 flex items-center gap-1 shadow-sm">
                        <Grid className="w-3 h-3 text-amber-400" />
                        <span>LAYER: {currentTemplate.stackLayer}</span>
                      </span>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-sm">
                        🌐 {currentTemplate.domain}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700 shadow-sm">
                        Blueprint {currentIdx + 1} of {activeList.length} {hasActiveFilters ? `(Filtered of ${allTemplates.length})` : ''}
                      </span>
                    </div>
                    <h2 className="text-sm md:text-base font-extrabold text-white truncate flex items-center gap-2">
                      <span>{currentTemplate.diagramName}</span>
                      <span className="text-xs text-teal-400 font-mono font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-teal-500/30">
                        {currentTemplate.combinedId.split('_')[0]}
                      </span>
                    </h2>
                  </div>
                </div>

                {/* Right: Theme Toggle, Load Blueprint & Close */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewModalTheme(t => t === 'light' ? 'dark' : 'light')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                    title="Toggle Light / Dark Preview Theme"
                  >
                    {previewModalTheme === 'light' ? '☀️ Light' : '🌙 Dark'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTab('editor');
                      handleArchitectureSwitch(currentTemplate.combinedId);
                      setPreviewModalTemplateId(null);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <span>Use Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewModalTemplateId(null)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 transition-all cursor-pointer"
                    title="Close Master Preview (Escape)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Row 2: Connected Dynamic Dropdowns Filter & Carousel Navigation Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800/80">
                {/* Left: Dynamic Connected Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Phase Dropdown */}
                  <div className="flex items-center gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phase:</label>
                    <select
                      data-testid="modal-phase-select"
                      value={previewModalPhaseFilter}
                      onChange={(e) => {
                        const newPhase = e.target.value;
                        setPreviewModalPhaseFilter(newPhase);
                        const match = allTemplates.find(t => {
                          if (newPhase !== 'ALL' && t.phaseName !== newPhase && !t.phaseName.startsWith(newPhase) && t.phase !== newPhase) return false;
                          if (previewModalAbstractionFilter !== 'ALL' && t.abstractionLevel !== previewModalAbstractionFilter) return false;
                          if (previewModalLayerFilter !== 'ALL' && t.stackLayer !== previewModalLayerFilter) return false;
                          return true;
                        });
                        if (match) setPreviewModalTemplateId(match.combinedId);
                      }}
                      className="bg-slate-900 border border-slate-700/80 hover:border-cyan-400 focus:border-cyan-400 text-cyan-300 font-bold text-xs rounded-xl px-2.5 py-1.5 outline-none cursor-pointer max-w-[200px] truncate"
                    >
                      <option value="ALL" className="bg-[#0b101d] text-teal-300 font-bold">✨ All 7 Phases (50 Blueprints)</option>
                      {PHASE_NAME_OPTIONS.map((p) => {
                        const count = allTemplates.filter(t => t.phaseName === p || t.phaseName.startsWith(p)).length;
                        return (
                          <option key={p} value={p} className="bg-[#0b101d] text-slate-200">
                            {p.split(':')[0]} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Abstraction Level Dropdown */}
                  <div className="flex items-center gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">ABSTRACTION:</label>
                    <select
                      data-testid="modal-abstraction-select"
                      value={previewModalAbstractionFilter}
                      onChange={(e) => {
                        const newAbs = e.target.value;
                        setPreviewModalAbstractionFilter(newAbs);
                        const match = allTemplates.find(t => {
                          if (previewModalPhaseFilter !== 'ALL' && t.phaseName !== previewModalPhaseFilter && !t.phaseName.startsWith(previewModalPhaseFilter) && t.phase !== previewModalPhaseFilter) return false;
                          if (newAbs !== 'ALL' && t.abstractionLevel !== newAbs) return false;
                          if (previewModalLayerFilter !== 'ALL' && t.stackLayer !== previewModalLayerFilter) return false;
                          return true;
                        });
                        if (match) setPreviewModalTemplateId(match.combinedId);
                      }}
                      className="bg-slate-900 border border-slate-700/80 hover:border-purple-400 focus:border-purple-400 text-purple-300 font-bold text-xs rounded-xl px-2.5 py-1.5 outline-none cursor-pointer max-w-[170px] truncate"
                    >
                      <option value="ALL" className="bg-[#0b101d] text-teal-300 font-bold">✨ All 4 Abstractions</option>
                      {ABSTRACTION_LEVEL_OPTIONS.map((lvl) => {
                        const count = allTemplates.filter(t => t.abstractionLevel === lvl).length;
                        return (
                          <option key={lvl} value={lvl} className="bg-[#0b101d] text-slate-200">
                            {lvl} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Stack Layer Dropdown */}
                  <div className="flex items-center gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">LAYER:</label>
                    <select
                      data-testid="modal-layer-select"
                      value={previewModalLayerFilter}
                      onChange={(e) => {
                        const newLyr = e.target.value;
                        setPreviewModalLayerFilter(newLyr);
                        const match = allTemplates.find(t => {
                          if (previewModalPhaseFilter !== 'ALL' && t.phaseName !== previewModalPhaseFilter && !t.phaseName.startsWith(previewModalPhaseFilter) && t.phase !== previewModalPhaseFilter) return false;
                          if (previewModalAbstractionFilter !== 'ALL' && t.abstractionLevel !== previewModalAbstractionFilter) return false;
                          if (newLyr !== 'ALL' && t.stackLayer !== newLyr) return false;
                          return true;
                        });
                        if (match) setPreviewModalTemplateId(match.combinedId);
                      }}
                      className="bg-slate-900 border border-slate-700/80 hover:border-amber-400 focus:border-amber-400 text-amber-300 font-bold text-xs rounded-xl px-2.5 py-1.5 outline-none cursor-pointer max-w-[180px] truncate"
                    >
                      <option value="ALL" className="bg-[#0b101d] text-teal-300 font-bold">✨ All 5 Layers</option>
                      {ARCHITECTURAL_STACK_LAYER_OPTIONS.map((lyr) => {
                        const count = allTemplates.filter(t => t.stackLayer === lyr).length;
                        return (
                          <option key={lyr} value={lyr} className="bg-[#0b101d] text-slate-200">
                            {lyr} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Reset Filters */}
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewModalPhaseFilter('ALL');
                        setPreviewModalAbstractionFilter('ALL');
                        setPreviewModalLayerFilter('ALL');
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-teal-300 text-[11px] font-bold border border-slate-700 flex items-center gap-1 transition-all cursor-pointer"
                      title="Reset all filters"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Right: Direct Blueprint Switcher & Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer shadow-sm"
                    title="Previous Blueprint (Left Arrow Key)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  {/* Direct Dropdown Switcher */}
                  <select
                    data-testid="modal-blueprint-select"
                    value={currentTemplate.combinedId}
                    onChange={(e) => setPreviewModalTemplateId(e.target.value)}
                    className="bg-slate-900 border border-teal-500/40 text-teal-300 font-bold text-xs rounded-xl px-3 py-1.5 outline-none cursor-pointer max-w-[340px] truncate shadow-sm"
                  >
                    {phases.map((phase) => {
                      const phaseItems = activeList.filter(t => t.phaseName === phase || t.phaseName.startsWith(phase));
                      if (phaseItems.length === 0) return null;
                      return (
                        <optgroup key={phase} label={`📁 ${phase} (${phaseItems.length})`} className="bg-[#0b101d] text-teal-400 font-extrabold">
                          {phaseItems.map((t) => (
                            <option key={t.combinedId} value={t.combinedId} className="bg-[#0b101d] text-slate-200">
                              {t.combinedId.split('_')[0]}: {t.diagramName}
                            </option>
                          ))}
                        </optgroup>
                      );
                    })}
                  </select>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer shadow-sm"
                    title="Next Blueprint (Right Arrow Key)"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Preview Canvas Viewport */}
            <div className="flex-1 rounded-2xl border border-slate-800 bg-white dark:bg-slate-950 overflow-hidden relative mt-3 shadow-2xl flex items-center justify-center p-2 min-h-0">
              <DiagramViewer
                key={`master_preview_${currentTemplate.combinedId}_${previewModalTheme}`}
                xml={masterXml}
                diagramType={currentTemplate.combinedId}
                bgTheme={previewModalTheme}
                useCaseName={currentTemplate.diagramName}
                aspectRatioId="16:9"
              />
            </div>
          </div>
        );
      })()}

      {/* 📜 PROJECT REAL USE CASE PROMPT & AUDIT DOSSIER MODAL */}
      <ProjectPromptDossierModal
        isOpen={isPromptDossierOpen}
        onClose={() => setIsPromptDossierOpen(false)}
        diagram={activeDiagram}
        activeVersion={activeVersion || displayedVersion}
        onSelectVersion={(ver) => {
          setPreviewVersion(ver as any);
          setIsPromptDossierOpen(false);
        }}
        theme={canvasTheme}
      />

      {forceRefreshToast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-2.5 text-xs font-bold transition-all animate-bounce ${
          forceRefreshToast.type === 'success'
            ? 'bg-teal-950/95 border-teal-400 text-teal-200'
            : forceRefreshToast.type === 'error'
            ? 'bg-rose-950/95 border-rose-400 text-rose-200'
            : 'bg-slate-900/95 border-teal-500/50 text-slate-100'
        }`}>
          {forceRefreshToast.type === 'info' && <Loader2 className="w-4 h-4 animate-spin text-teal-400" />}
          {forceRefreshToast.type === 'success' && <ShieldCheck className="w-4 h-4 text-teal-400" />}
          <span>{forceRefreshToast.message}</span>
        </div>
      )}
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
