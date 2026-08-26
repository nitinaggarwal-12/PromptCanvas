'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FileText,
  Sparkles,
  Download,
  Printer,
  Copy,
  Check,
  Share2,
  Layers,
  Shield,
  Zap,
  BookOpen,
  Sliders,
  Sun,
  Moon,
  RefreshCw,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Eye,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Network,
  LayoutGrid,
  BarChart3,
  ExternalLink,
  Code,
  FileCode,
  Lock,
  Boxes,
  HelpCircle,
  FileCheck,
  Building2,
  ChevronDown,
  Tag,
  Edit3,
  Save,
  CopyPlus,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  CornerDownRight,
  FolderTree,
  X,
  Presentation,
  Terminal,
  Send,
  History,
  Menu,
  ShieldCheck,
  Settings,
  User,
  Compass
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { UserProfileModal } from '@/components/UserProfileModal';
import { AuthModal } from '@/components/AuthModal';
import {
  CANONICAL_TEMPLATES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
  CANONICAL_FAMILIES,
  injectDomainFlavorXml
} from '@/lib/canonical/canonicalTemplates';
import {
  ARCHETYPE_REGISTRY,
  ArchetypeId,
  DocArchetype,
  DOC_ARCHETYPES_META,
  DocArchetypeMeta,
  BlueprintSlot
} from '@/lib/compose/archetypes';
import { MASTER_DOCUMENTS, getDomainMasterDocument } from '@/lib/compose/masterDocs';
import { injectUseCaseFlavor } from '@/lib/diagramCleaner';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import BlueprintChangeReportModal from '@/components/BlueprintChangeReportModal';
import DocGenFloatingCopilot from '@/components/DocGenFloatingCopilot';
import SlideDeckPresenterModal from '@/components/SlideDeckPresenterModal';
import TerraformIaCModal from '@/components/TerraformIaCModal';
import EnterpriseSyncModal from '@/components/EnterpriseSyncModal';
import CollaborativeTeamPresence from '@/components/CollaborativeTeamPresence';
import DocGenHistoryModal, { HistoricalProjectItem } from '@/components/DocGenHistoryModal';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import {
  VersionSnapshot,
  ChatMessage,
  DiagramSlotVersionData,
  createInitialSnapshot,
  pushVersionSnapshot,
  bumpVersionTag,
  saveVersionHistory,
  loadVersionHistory,
  formatRelativeTime,
} from '@/lib/versioning/docVersionEngine';
import {
  DocumentSection,
  parseDocumentIntoSections,
  reconstructDocumentFromSections,
  updateSection,
  deleteSection,
  cloneSection,
  insertNewSectionAfter,
  moveSectionUp,
  moveSectionDown,
  changeSectionHierarchy,
} from '@/lib/versioning/docSectionEngine';

export const DIAGRAM_FAMILY_PRESETS = [
  { id: 'all', label: 'All 50 Blueprints', icon: '⚡' },
  { id: 'structure', label: 'Structure & Containers', icon: '🏛️' },
  { id: 'flow', label: 'Flow & Sequences', icon: '🔄' },
  { id: 'infrastructure', label: 'Cloud & Network', icon: '☁️' },
  { id: 'data', label: 'Data Mesh & ETL', icon: '🗄️' },
  { id: 'ai', label: 'Vertex & Agentic AI', icon: '🧠' },
  { id: 'security', label: 'Security & Zero-Trust', icon: '🛡️' },
  { id: 'business', label: 'Value Stream & Capability', icon: '📊' },
];

export function detectDomainFromPrompt(title: string, prompt: string, fallbackDomain: string = 'general'): string {
  const combined = `${title} ${prompt}`.toLowerCase();
  
  if (/\b(healthcare|hospital|ehr|emr|fhir|hl7|dicom|pacs|clinical care|physician|nurse|doctor|patient record|hipaa security|cpoe|joint commission)\b/i.test(combined)) {
    return 'healthcare';
  }
  if (/\b(energy|grid|microgrid|solar|wind|bess|battery storage|v2g|nerc-cip|ferc|substation|inverter|megapack|power dispatcher|synchrophasor|power plant|kilowatt|megawatt)\b/i.test(combined)) {
    return 'energy';
  }
  if (/\b(automotive|vehicle|car|adas|v2x|connected fleet|autosar|can bus|lidar|telematics|vin|nhtsa|unece|iso 26262|asil-d|autonomous drive)\b/i.test(combined)) {
    return 'automotive';
  }
  if (/\b(telecom|telecommunications|5g|o-ran|ran|gnodeb|network slice|urllc|embb|3gpp|fronthaul|ecpri|upf|nrf|fcc|core network)\b/i.test(combined)) {
    return 'telecom';
  }
  if (/\b(defense|military|mission|tactical|c2|joint operations|radar|electronic warfare|disa|stig|itar|fedramp high|do-178c|air-gapped|synthetic aperture|sortie)\b/i.test(combined)) {
    return 'defense';
  }
  if (/\b(cybersecurity|soc|siem|soar|threat|secops|zero-trust|beyondcorp|stix|taxii|cve|incident response|threat hunter|red team|chronicle|nist 800-53|pcap)\b/i.test(combined)) {
    return 'cybersecurity';
  }
  if (/\b(media|streaming|video|broadcast|playout|transcoding|hls|dash|rtmp|srt|4k|drm|widevine|fairplay|smpte|encoder|content delivery)\b/i.test(combined)) {
    return 'media';
  }
  if (/\b(drone|aeronode|aviation|aircraft|flight|airspace|utm|faa|ads-b|avionics|payload|telemetry|sensor|iot|plc|scada|robotics|conveyor|assembly|manufacturing)\b/i.test(combined)) {
    return 'manufacturing';
  }
  if (/\b(payment|fraud|trading|trader|wealth|fintech|bank|banking|ledger|spanner double-entry|clearing|settlement|swift|iso 20022|fiat|crypto|securities|aml|ofac|sec 15c3-5|acquirer)\b/i.test(combined)) {
    return 'fintech';
  }
  if (/\b(ecommerce|e-commerce|retail|shopper|cart|checkout|catalog|sku|wms|warehouse|cross-dock|fulfillment|3pl|carrier|fedex|ups|dhl|parcel|amazon|merchant|marketplace|supply chain|logistics)\b/i.test(combined)) {
    return 'retail';
  }
  if (/\b(saas|multi-tenant|tenant|workspace|subscription|billing|seat|crm|org|rbac|oauth|idp|cloud)\b/i.test(combined)) {
    return 'saas';
  }
  if (/\b(clinical|genomics|biopharma|pharma|oncology|fda|gxp|hipaa|veeva|drug|patient|ctms|edc|medidata|adverse event|pharmacovigilance)\b/i.test(combined)) {
    return 'biopharma';
  }
  return fallbackDomain === 'biopharma' ? 'general' : fallbackDomain;
}

interface InlineDiagramFigureProps {
  templateId: string;
  figureTitle: string;
  isLight: boolean;
  selectedDomain: string;
  projectTitle?: string;
  projectScopePrompt?: string;
  codeLines: string[];
  parsedNodes: { id: string; label: string; tier: string }[];
  parsedFlows: { from: string; to: string; label?: string }[];
}

function InlineDiagramFigure({
  templateId,
  figureTitle,
  isLight,
  selectedDomain,
  projectTitle,
  projectScopePrompt,
  codeLines,
  parsedNodes,
  parsedFlows,
}: InlineDiagramFigureProps) {
  const [viewMode, setViewMode] = useState<'canvas' | 'image'>('canvas');
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedXml, setCopiedXml] = useState(false);

  const canonicalTpl =
    CANONICAL_TEMPLATES.find((t) => t.id === templateId) ||
    CANONICAL_TEMPLATES.find((t) => t.id === '01');

  const effectiveDomain = useMemo(() => {
    if (selectedDomain && selectedDomain !== 'biopharma') return selectedDomain;
    return detectDomainFromPrompt(projectTitle || '', projectScopePrompt || '', selectedDomain);
  }, [selectedDomain, projectTitle, projectScopePrompt]);

  const diagramXml = useMemo(() => {
    if (!canonicalTpl) return '';
    try {
      const rawXml = canonicalTpl.generateXml(effectiveDomain, isLight ? 'light' : 'dark');
      const domainCleaned = injectDomainFlavorXml(rawXml, effectiveDomain);
      if (projectTitle || projectScopePrompt) {
        return injectUseCaseFlavor(domainCleaned, projectTitle || canonicalTpl.name, projectScopePrompt);
      }
      return domainCleaned;
    } catch {
      return '';
    }
  }, [canonicalTpl, effectiveDomain, isLight, projectTitle, projectScopePrompt]);

  const handleCopyXml = () => {
    if (!diagramXml) return;
    navigator.clipboard.writeText(diagramXml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const imageSrc = canonicalTpl?.previewImage || `/images/${templateId}.png`;

  return (
    <div
      className={`my-8 rounded-3xl border shadow-xl overflow-hidden transition-all ${
        isLight
          ? 'border-sky-300/80 bg-white shadow-slate-300/40'
          : 'border-sky-500/40 bg-[#0B111E] shadow-2xl'
      }`}
    >
      {/* Figure Header Bar */}
      <div
        className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight
            ? 'bg-gradient-to-r from-slate-100 via-sky-50 to-slate-100 border-slate-200'
            : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 font-mono font-black text-xs flex items-center justify-center border border-sky-500/20">
            {templateId || '01'}
          </span>
          <div>
            <span className="text-[10px] font-mono uppercase text-sky-500 font-bold tracking-wider">
              Embedded Architecture Blueprint {templateId ? `(Canonical Template ${templateId})` : ''}
            </span>
            <h4
              className={`text-sm font-bold leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {figureTitle || canonicalTpl?.name || 'Architecture Diagram Figure'}
            </h4>
          </div>
        </div>

        {/* View Mode Toggle & Canvas Link */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setViewMode('canvas')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'canvas'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Live Vector Canvas</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('image')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'image'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Blueprint Image</span>
            </button>
          </div>

          {viewMode === 'canvas' && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isExpanded
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title={isExpanded ? 'Fit View' : 'Expand Full Blueprint View'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isExpanded ? 'Fit View' : 'Expand View'}</span>
            </button>
          )}

          {canonicalTpl && (
            <Link
              href={`/canonical/${canonicalTpl.id}`}
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 border border-sky-500/30 text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Canonical Blueprint</span>
            </Link>
          )}

          <button
            type="button"
            onClick={handleCopyXml}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 transition-all"
            title="Copy Raw Draw.io XML"
          >
            {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedXml ? 'Copied XML!' : 'XML'}</span>
          </button>
        </div>
      </div>

      {/* Figure Body */}
      <div className="p-6 space-y-6">
        {/* VIEW 1: LIVE INTERACTIVE VECTOR DRAW.IO CANVAS */}
        {viewMode === 'canvas' && diagramXml && (
          <div
            className={`rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 shadow-inner transition-all duration-300 ${
              isExpanded
                ? 'h-[1100px] md:h-[1250px]'
                : 'h-[740px] md:h-[840px] lg:h-[920px]'
            }`}
          >
            <DiagramViewerRenderSafe
              xml={diagramXml}
              bgTheme={isLight ? 'light' : 'dark'}
              aspectRatioId="16:9"
            />
          </div>
        )}

        {/* VIEW 2: BLUEPRINT MASTER IMAGE */}
        {viewMode === 'image' && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 relative group">
            <img
              src={imageSrc}
              alt={canonicalTpl?.name || 'Architecture Diagram'}
              className="w-full max-h-[700px] object-contain rounded-xl mx-auto"
              onError={(e) => {
                if (canonicalTpl) {
                  (e.target as HTMLImageElement).src = `/images/${canonicalTpl.id}.png`;
                }
              }}
            />
          </div>
        )}

        {/* Component Topology Pods Grid (if nodes parsed) */}
        {parsedNodes.length >= 2 && (
          <div className="space-y-2">
            <div
              className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              <span>Architecture Subsystems &amp; Component Topology ({parsedNodes.length} Nodes)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {parsedNodes.map((node, nIdx) => (
                <div
                  key={node.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isLight
                      ? 'bg-slate-50/80 border-slate-200 hover:border-sky-300 hover:bg-white'
                      : 'bg-slate-900/80 border-slate-800 hover:border-sky-500/50 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        isLight
                          ? 'bg-sky-100 text-sky-800 border-sky-300'
                          : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                      }`}
                    >
                      Node 0{nIdx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isLight
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {node.tier}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-bold leading-snug ${
                      isLight ? 'text-slate-900' : 'text-slate-100'
                    }`}
                  >
                    {node.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Integration Pathways (if flows parsed) */}
        {parsedFlows.length >= 2 && (
          <div
            className={`p-4 rounded-2xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800/80'
            }`}
          >
            <div
              className={`text-[11px] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              <span>⚡ Primary Integration Pathways &amp; Event Channels ({parsedFlows.length} Routes)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {parsedFlows.map((flow, fIdx) => {
                const sourceNode = parsedNodes.find((n) => n.id === flow.from);
                const targetNode = parsedNodes.find((n) => n.id === flow.to);
                return (
                  <div
                    key={fIdx}
                    className={`px-3 py-2 rounded-xl border flex items-center justify-between ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span
                      className={`font-semibold truncate max-w-[42%] ${
                        isLight ? 'text-sky-800' : 'text-sky-300'
                      }`}
                    >
                      {sourceNode?.label.replace(/^[^\s]+\s+/, '') || flow.from}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1 ${
                        isLight ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {flow.label ? `➔ [${flow.label}] ➔` : '──────►'}
                    </span>
                    <span
                      className={`font-semibold truncate max-w-[42%] ${
                        isLight ? 'text-emerald-800' : 'text-emerald-300'
                      }`}
                    >
                      {targetNode?.label.replace(/^[^\s]+\s+/, '') || flow.to}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DocGenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Navigation and active tabs
  const tabParam = searchParams.get('tab');
  const archParam = searchParams.get('archetype') || searchParams.get('arch');
  const [activeTab, setActiveTab] = useState<'catalog' | 'studio'>(() => {
    if (tabParam === 'catalog') return 'catalog';
    return 'studio';
  });

  useEffect(() => {
    const currentTab = searchParams.get('tab');
    const currentArch = searchParams.get('archetype') || searchParams.get('arch');
    if (currentTab === 'catalog') {
      setActiveTab('catalog');
    } else if (currentTab === 'studio' || currentArch) {
      setActiveTab('studio');
    }
  }, [searchParams]);

  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId>('sdd');
  const [selectedDomain, setSelectedDomain] = useState<string>('biopharma');
  const [projectTitle, setProjectTitle] = useState<string>('Bio-Pharma Clinical Genomics & Regulatory AI Platform');
  const [projectScopePrompt, setProjectScopePrompt] = useState<string>(
    'An enterprise-grade decentralized clinical genomics analysis and regulatory pharmacovigilance platform with automated FDA electronic signature audits, Spanner knowledge graphs, multi-region active-active disaster recovery, and zero-trust VPC Service Perimeters.'
  );

  // Studio Scope Mode: 'both' | 'diagrams' | 'documents' (Defaults to 'diagrams')
  const modeParam = searchParams.get('mode');
  const [studioMode, setStudioMode] = useState<'both' | 'diagrams' | 'documents'>(() => {
    if (modeParam === 'diagrams' || modeParam === 'documents' || modeParam === 'both') {
      return modeParam;
    }
    return 'diagrams';
  });
  const [activeDiagramSlotIndex, setActiveDiagramSlotIndex] = useState<number>(0);
  const [selectedDiagramFamily, setSelectedDiagramFamily] = useState<string>('all');
  const [selectedDiagramTemplateId, setSelectedDiagramTemplateId] = useState<string>('01');
  const [diagramSlotsCount, setDiagramSlotsCount] = useState<number>(1);
  const [diagramSlotsList, setDiagramSlotsList] = useState<Array<{ id: number; title: string; templateId: string; description: string }>>([
    { id: 1, title: 'Primary Architecture Topology', templateId: '01', description: 'System boundaries, external actors, and high-level core services.' },
  ]);

  const handleSetDiagramSlotsCount = (count: number) => {
    setDiagramSlotsCount(count);
    if (count === 1) {
      setDiagramSlotsList([
        { id: 1, title: 'Primary Architecture Topology', templateId: selectedDiagramTemplateId || '01', description: 'System boundaries, external actors, and core topology.' },
      ]);
    } else if (count === 2) {
      setDiagramSlotsList([
        { id: 1, title: 'System Context & Boundary', templateId: '01', description: 'Executive system context and external ecosystem integrations.' },
        { id: 2, title: 'Component & Container Architecture', templateId: '08', description: 'Microservices containers, APIs, and data storage subsystems.' },
      ]);
    } else if (count === 3) {
      setDiagramSlotsList([
        { id: 1, title: 'System Context & Ingestion', templateId: '01', description: 'Client gateways, telemetry ingestion, and external APIs.' },
        { id: 2, title: 'Microservices & Event Mesh', templateId: '12', description: 'Asynchronous event mesh, saga orchestration, and service mesh.' },
        { id: 3, title: 'Compute & Cloud Deployment', templateId: '16', description: 'GKE clusters, Spanner multi-region databases, and VPC networks.' },
      ]);
    } else if (count === 4) {
      setDiagramSlotsList([
        { id: 1, title: 'System Context & Actors', templateId: '01', description: 'Overall system boundary and partner ecosystem.' },
        { id: 2, title: 'Component & Subsystem Topology', templateId: '08', description: 'Container microservices and application runtime.' },
        { id: 3, title: 'Real-Time Data Pipelines & CDC', templateId: '03', description: 'Kafka/PubSub streaming, Dataproc, and BigQuery analytics.' },
        { id: 4, title: 'Zero-Trust Security & Network', templateId: '15', description: 'VPC Service Perimeters, Cloud Armor, and IAM roles.' },
      ]);
    }
  };

  // Blueprint Slot customization state
  const [slotCustomizations, setSlotCustomizations] = useState<Record<number, { templateId: string; isCustom: boolean; customPrompt?: string }>>({});
  const [activePreviewChapterIndex, setActivePreviewChapterIndex] = useState<number>(0);

  // Preview & Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [generatedDocContent, setGeneratedDocContent] = useState<string | null>(null);
  const [previewModalDoc, setPreviewModalDoc] = useState<DocArchetypeMeta | null>(null);
  const [modalTab, setModalTab] = useState<'doc' | 'blueprints' | 'hierarchy'>('doc');
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [sampleCopiedSuccess, setSampleCopiedSuccess] = useState<boolean>(false);
  const [shareCopiedSuccess, setShareCopiedSuccess] = useState<boolean>(false);
  const [projectShareCopied, setProjectShareCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [isChangeReportOpen, setIsChangeReportOpen] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>('');

  // 10-Version History & Chatbot Copilot State
  const [docVersion, setDocVersion] = useState<string>('v1.0');
  const [versionHistory, setVersionHistory] = useState<VersionSnapshot[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Granular Section-Level Hierarchy & Editing State
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editTitleDraft, setEditTitleDraft] = useState<string>('');
  const [editContentDraft, setEditContentDraft] = useState<string>('');
  const [addingSectionBelowId, setAddingSectionBelowId] = useState<string | null>(null);
  const [newSectionTitleDraft, setNewSectionTitleDraft] = useState<string>('');
  const [newSectionContentDraft, setNewSectionContentDraft] = useState<string>('');
  const [newSectionLevelDraft, setNewSectionLevelDraft] = useState<1 | 2 | 3>(2);

  // Navigation & Sidebar Layout State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null; is_guest?: boolean } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Check Auth State on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  // Slide Deck, Terraform IaC & Enterprise Sync Modal States
  const [isSlideDeckOpen, setIsSlideDeckOpen] = useState<boolean>(false);
  const [isTerraformOpen, setIsTerraformOpen] = useState<boolean>(false);
  const [isEnterpriseSyncOpen, setIsEnterpriseSyncOpen] = useState<boolean>(false);
  const [isDocHistoryModalOpen, setIsDocHistoryModalOpen] = useState<boolean>(false);

  const handleSelectHistoricalProject = (proj: HistoricalProjectItem) => {
    setProjectId(proj.id);
    setSelectedArchetypeId(proj.archetypeId as ArchetypeId);
    setSelectedDomain(proj.domainId);
    setProjectTitle(proj.title);
    setDocVersion(proj.docVersion);
    setActiveTab('studio');

    // Load snapshots from localStorage
    const saved = loadVersionHistory(proj.id);
    if (saved && saved.snapshots.length > 0) {
      setVersionHistory(saved.snapshots);
      setGeneratedDocContent(saved.snapshots[0].docMarkdown);
    } else {
      handleStartGeneration();
    }
  };

  // Load version history and chat from localStorage when projectId is active
  useEffect(() => {
    if (!projectId) return;
    const saved = loadVersionHistory(projectId);
    if (saved) {
      if (saved.snapshots.length > 0) {
        setVersionHistory(saved.snapshots);
        setDocVersion(saved.snapshots[0].docVersion || 'v1.0');
      }
      if (saved.chatHistory.length > 0) {
        setChatHistory(saved.chatHistory);
      }
    }
  }, [projectId]);

  // URL query parameter synchronization (e.g. ?doc=brd, ?proj=proj_xxx, ?domain=fintech, ?title=..., ?prompt=..., ?scope=..., ?tab=studio)
  useEffect(() => {
    const docParam = searchParams.get('doc') as ArchetypeId | null;
    const tabParam = searchParams.get('tab');
    const domainParam = searchParams.get('domain');
    const titleParam = searchParams.get('title');
    const scopeParam = searchParams.get('scope') || searchParams.get('prompt');
    const projParam = searchParams.get('proj') || searchParams.get('project');

    let effectiveTitle = projectTitle;
    let effectiveDomain = selectedDomain;
    let effectiveScope = projectScopePrompt;

    if (domainParam) {
      effectiveDomain = domainParam;
      setSelectedDomain(domainParam);
    }
    if (titleParam) {
      effectiveTitle = decodeURIComponent(titleParam);
      setProjectTitle(effectiveTitle);
      // If domain wasn't explicitly passed, detect it from title
      if (!domainParam) {
        effectiveDomain = detectDomainFromPrompt(effectiveTitle, '', effectiveDomain);
        setSelectedDomain(effectiveDomain);
      }
    }
    if (scopeParam) {
      effectiveScope = decodeURIComponent(scopeParam);
      setProjectScopePrompt(effectiveScope);
    } else if (titleParam || domainParam) {
      // If scope was not provided but title or domain was provided, auto-generate domain-aligned prompt
      if (effectiveDomain === 'manufacturing') {
        effectiveScope = `Mission-critical autonomous telemetry, SCADA/PLC edge ingestion, sub-20ms real-time control loops, Spanner state store, and automated safety interlocks for ${effectiveTitle}.`;
      } else if (effectiveDomain === 'fintech') {
        effectiveScope = `High-throughput transaction orchestration, sub-5ms pre-trade risk evaluation, ISO 20022 messaging, Spanner double-entry ledger, and real-time fraud anomaly detection for ${effectiveTitle}.`;
      } else if (effectiveDomain === 'retail') {
        effectiveScope = `Omnichannel marketplace catalog, real-time inventory allocation, event-driven order orchestration, and dynamic pricing with sub-50ms latency for ${effectiveTitle}.`;
      } else if (effectiveDomain === 'saas') {
        effectiveScope = `Enterprise multi-tenant workflow orchestration, isolated workspace sharding, distributed Redis rate limiting, and immutable SOC 2 audit telemetry for ${effectiveTitle}.`;
      }
      setProjectScopePrompt(effectiveScope);
    }

    if (projParam) setProjectId(projParam);

    const tplParam = searchParams.get('tpl') || searchParams.get('blueprint') || searchParams.get('template');
    if (tplParam) {
      setSelectedDiagramTemplateId(tplParam);
      setDiagramSlotsList((prev) =>
        prev.map((slot, idx) => (idx === 0 ? { ...slot, templateId: tplParam } : slot))
      );
    }

    if (docParam) {
      const matched = DOC_ARCHETYPES_META.find((m) => m.id === docParam);
      if (matched) {
        setSelectedArchetypeId(docParam);
        if (tabParam === 'studio' || projParam || domainParam || titleParam) {
          setActiveTab('studio');
          // Auto-generate if custom project link
          const synthesized = synthesizeCustomExecutiveDocument(
            docParam,
            matched,
            effectiveTitle,
            effectiveDomain,
            effectiveScope,
            {}
          );
          setGeneratedDocContent(synthesized);
        } else {
          setPreviewModalDoc(matched);
          setModalTab('doc');
        }
      }
    }

    // Explicit studio mode parameter precedence
    if (modeParam === 'diagrams' || modeParam === 'documents' || modeParam === 'both') {
      setStudioMode(modeParam);
    } else if (tplParam && !docParam) {
      setStudioMode('diagrams');
    } else if (docParam && !tplParam) {
      setStudioMode('both');
    } else if (tabParam === 'studio') {
      setActiveTab('studio');
    }
  }, [searchParams]);

  // Find active archetype metadata
  const activeMeta = useMemo(() => {
    return DOC_ARCHETYPES_META.find((m) => m.id === selectedArchetypeId) || DOC_ARCHETYPES_META[2];
  }, [selectedArchetypeId]);

  // Current active template ID for the live vector preview
  const currentPreviewTemplateId = useMemo(() => {
    if (studioMode === 'both') {
      const activeSlot = activeMeta.blueprintPack[activePreviewChapterIndex] || activeMeta.blueprintPack[0];
      return slotCustomizations[activePreviewChapterIndex + 1]?.templateId || activeSlot?.recommendedTemplateId || '01';
    }
    return selectedDiagramTemplateId || '01';
  }, [studioMode, activeMeta, activePreviewChapterIndex, slotCustomizations, selectedDiagramTemplateId]);

  // Live Studio Real-Time 16:9 Vector Diagram Preview XML
  const liveStudioDiagramXml = useMemo(() => {
    const targetId = currentPreviewTemplateId;
    const tpl = CANONICAL_TEMPLATES.find((t) => t.id === targetId) || CANONICAL_TEMPLATES[0];
    try {
      const rawXml = tpl.generateXml(selectedDomain, isLight ? 'light' : 'dark');
      const domainCleaned = injectDomainFlavorXml(rawXml, selectedDomain);
      if (projectTitle || projectScopePrompt) {
        return injectUseCaseFlavor(domainCleaned, projectTitle || tpl.name, projectScopePrompt);
      }
      return domainCleaned;
    } catch {
      return tpl.generateXml(selectedDomain, isLight ? 'light' : 'dark');
    }
  }, [currentPreviewTemplateId, selectedDomain, isLight, projectTitle, projectScopePrompt]);

  const handleOpenPreview = (meta: DocArchetypeMeta) => {
    setPreviewModalDoc(meta);
    setModalTab('doc');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/docgen?doc=${meta.id}`);
    }
  };

  const handleClosePreview = () => {
    setPreviewModalDoc(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/docgen');
    }
  };

  const handleCopyShareLink = (docId: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/docgen?doc=${docId}`;
      navigator.clipboard.writeText(url);
      setShareCopiedSuccess(true);
      setTimeout(() => setShareCopiedSuccess(false), 2000);
    }
  };

  const handleCopyProjectShareLink = () => {
    if (typeof window !== 'undefined') {
      const activeProjId = projectId || `proj_${Date.now().toString(36)}`;
      if (!projectId) setProjectId(activeProjId);
      const url = `${window.location.origin}/docgen?tab=studio&doc=${selectedArchetypeId}&proj=${activeProjId}&domain=${selectedDomain}&title=${encodeURIComponent(projectTitle)}&scope=${encodeURIComponent(projectScopePrompt)}`;
      navigator.clipboard.writeText(url);
      setProjectShareCopied(true);
      window.history.pushState(null, '', url);
      setTimeout(() => setProjectShareCopied(false), 2500);
    }
  };

  // Handle slot template swap
  const handleSwapSlotTemplate = (slotIdx: number, newTemplateId: string) => {
    setSlotCustomizations((prev) => ({
      ...prev,
      [slotIdx]: {
        templateId: newTemplateId,
        isCustom: false,
      },
    }));
  };

  // Run full generation
  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationStep(1);
    setGeneratedDocContent(null);

    const generatedProjId = projectId || `proj_${Math.random().toString(36).substring(2, 9)}`;
    setProjectId(generatedProjId);

    // Auto-detect domain if prompt does not match biopharma
    const effectiveDomain = detectDomainFromPrompt(projectTitle, projectScopePrompt, selectedDomain);
    if (effectiveDomain !== selectedDomain && selectedDomain === 'biopharma') {
      setSelectedDomain(effectiveDomain);
    }

    // If studioMode is 'diagrams', synthesize diagrams directly without calling docgen text endpoint
    if (studioMode === 'diagrams') {
      try {
        setGenerationStep(1);
        await new Promise((r) => setTimeout(r, 250));
        setGenerationStep(2);
        await new Promise((r) => setTimeout(r, 250));

        setGeneratedDocContent('DIAGRAMS_MODE_ACTIVE');
        setActiveTab('studio');
        setActiveDiagramSlotIndex(0);

        if (typeof window !== 'undefined') {
          const uniqueUrl = `/docgen?tab=studio&mode=diagrams&doc=${selectedArchetypeId}&proj=${generatedProjId}&domain=${effectiveDomain}&title=${encodeURIComponent(projectTitle)}`;
          window.history.pushState(null, '', uniqueUrl);
        }
      } finally {
        setIsGenerating(false);
        setGenerationStep(0);
      }
      return;
    }

    try {
      // Step 1: Synthesizing Multi-Blueprint System Graph
      setGenerationStep(1);
      await new Promise((r) => setTimeout(r, 300));
      
      // Step 2: Mapping AST Component Inventories & Slot Attachments
      setGenerationStep(2);
      await new Promise((r) => setTimeout(r, 300));

      // Step 3: Invoking Gemini AI Model to synthesize custom architectural specification
      setGenerationStep(3);
      const res = await fetch('/api/docgen/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: selectedArchetypeId,
          projectTitle,
          projectScopePrompt,
          selectedDomain: effectiveDomain,
          slotCustomizations,
        }),
      });

      let finalDoc = '';
      if (res.ok) {
        const data = await res.json();
        if (data.markdown) {
          finalDoc = data.markdown;
        }
      }

      // If Gemini returned empty or failed, use curated synthesized master document
      if (!finalDoc) {
        finalDoc = synthesizeCustomExecutiveDocument(
          selectedArchetypeId,
          activeMeta,
          projectTitle,
          effectiveDomain,
          projectScopePrompt,
          slotCustomizations
        );
      }

      setGenerationStep(4);
      await new Promise((r) => setTimeout(r, 200));

      setGeneratedDocContent(finalDoc);
      setActiveTab('studio');

      // Initialize v1.0 snapshot on full generation
      const initialSlots: Record<number, DiagramSlotVersionData> = {};
      activeMeta.blueprintPack.forEach((slot, idx) => {
        const slotKey = idx + 1;
        const custom = slotCustomizations[slotKey];
        initialSlots[slotKey] = {
          templateId: custom?.templateId || slot.recommendedTemplateId,
          xml: '',
          version: 'v1.0',
          customizationPrompt: custom?.customPrompt,
        };
      });
      const initSnap = createInitialSnapshot(finalDoc, initialSlots, `Initial ${activeMeta.name} Generated Baseline`);
      setVersionHistory([initSnap]);
      setDocVersion('v1.0');
      saveVersionHistory(generatedProjId, [initSnap], chatHistory);

      // Update browser URL with unique project ID and parameters
      if (typeof window !== 'undefined') {
        const uniqueUrl = `/docgen?tab=studio&doc=${selectedArchetypeId}&proj=${generatedProjId}&domain=${effectiveDomain}&title=${encodeURIComponent(projectTitle)}`;
        window.history.pushState(null, '', uniqueUrl);
      }
    } catch (err: any) {
      console.error('DocGen generation error:', err);
      const fallbackContent = synthesizeCustomExecutiveDocument(
        selectedArchetypeId,
        activeMeta,
        projectTitle,
        effectiveDomain,
        projectScopePrompt,
        slotCustomizations
      ) || MASTER_DOCUMENTS[selectedArchetypeId];
      setGeneratedDocContent(fallbackContent);
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  // Auto-initialize v1.0 snapshot if document exists but history is empty
  useEffect(() => {
    if (!generatedDocContent || generatedDocContent === 'DIAGRAMS_MODE_ACTIVE') return;
    if (versionHistory.length === 0) {
      const initialSlots: Record<number, DiagramSlotVersionData> = {};
      activeMeta.blueprintPack.forEach((slot, idx) => {
        const slotKey = idx + 1;
        const custom = slotCustomizations[slotKey];
        initialSlots[slotKey] = {
          templateId: custom?.templateId || slot.recommendedTemplateId,
          xml: '',
          version: 'v1.0',
          customizationPrompt: custom?.customPrompt,
        };
      });
      const initSnap = createInitialSnapshot(generatedDocContent, initialSlots, `Initial ${activeMeta.name} Baseline`);
      setVersionHistory([initSnap]);
      setDocVersion('v1.0');
      saveVersionHistory(projectId || 'default', [initSnap], chatHistory);
    }
  }, [generatedDocContent, activeMeta, projectId]);

  // Handle AI Assist Document Text Update (bumps doc version, preserves diagram slots)
  const handleApplyDocUpdate = (newMarkdown: string, summary: string, author: 'AI Assist' | 'User' = 'AI Assist') => {
    const nextVer = bumpVersionTag(docVersion);
    const currentSlots: Record<number, DiagramSlotVersionData> = {};
    activeMeta.blueprintPack.forEach((slot, idx) => {
      const slotKey = idx + 1;
      const custom = slotCustomizations[slotKey];
      currentSlots[slotKey] = {
        templateId: custom?.templateId || slot.recommendedTemplateId,
        xml: '',
        version: versionHistory[0]?.diagramSlots[slotKey]?.version || 'v1.0',
        customizationPrompt: custom?.customPrompt,
      };
    });

    const newSnapshot: VersionSnapshot = {
      id: `snap_${Date.now()}_doc`,
      versionTag: nextVer,
      timestamp: new Date().toISOString(),
      author,
      changeSummary: summary,
      targetType: 'doc',
      docMarkdown: newMarkdown,
      docVersion: nextVer,
      diagramSlots: currentSlots,
    };

    const updatedHistory = pushVersionSnapshot(versionHistory, newSnapshot);
    setDocVersion(nextVer);
    setGeneratedDocContent(newMarkdown);
    setVersionHistory(updatedHistory);
    saveVersionHistory(projectId || 'default', updatedHistory, chatHistory);
  };

  // Handle AI Assist Diagram Slot Update (bumps specific slot version, preserves doc markdown)
  const handleApplyDiagramUpdate = (slotIndex: number, newPrompt: string, summary: string) => {
    const slotKey = slotIndex;
    const currentSlotVersion = versionHistory[0]?.diagramSlots[slotKey]?.version || 'v1.0';
    const nextSlotVersion = bumpVersionTag(currentSlotVersion);

    const updatedSlots: Record<number, DiagramSlotVersionData> = { ...(versionHistory[0]?.diagramSlots || {}) };
    const activeSlotMeta = activeMeta.blueprintPack[slotIndex - 1];
    const custom = slotCustomizations[slotKey];
    updatedSlots[slotKey] = {
      templateId: custom?.templateId || activeSlotMeta?.recommendedTemplateId || '01',
      xml: '',
      version: nextSlotVersion,
      customizationPrompt: newPrompt,
    };

    setSlotCustomizations((prev) => ({
      ...prev,
      [slotKey]: {
        templateId: prev[slotKey]?.templateId || activeSlotMeta?.recommendedTemplateId || '01',
        isCustom: true,
        customPrompt: newPrompt,
      },
    }));

    const newSnapshot: VersionSnapshot = {
      id: `snap_${Date.now()}_diag`,
      versionTag: docVersion,
      timestamp: new Date().toISOString(),
      author: 'AI Assist',
      changeSummary: summary,
      targetType: 'diagram',
      targetSlotIndex: slotIndex,
      docMarkdown: generatedDocContent || '',
      docVersion,
      diagramSlots: updatedSlots,
    };

    const updatedHistory = pushVersionSnapshot(versionHistory, newSnapshot);
    setVersionHistory(updatedHistory);
    saveVersionHistory(projectId || 'default', updatedHistory, chatHistory);
  };

  // Handle 1-Click Snapshot Rollback & Replay
  const handleRestoreSnapshot = (snapshot: VersionSnapshot) => {
    setGeneratedDocContent(snapshot.docMarkdown);
    setDocVersion(snapshot.docVersion);

    const restoredCustoms: Record<number, { templateId: string; isCustom: boolean; customPrompt?: string }> = {};
    Object.keys(snapshot.diagramSlots || {}).forEach((k) => {
      const numKey = parseInt(k, 10);
      const data = snapshot.diagramSlots[numKey];
      if (data) {
        restoredCustoms[numKey] = {
          templateId: data.templateId,
          isCustom: !!data.customizationPrompt,
          customPrompt: data.customizationPrompt,
        };
      }
    });
    setSlotCustomizations(restoredCustoms);

    const rollbackSnap: VersionSnapshot = {
      id: `snap_${Date.now()}_rollback`,
      versionTag: bumpVersionTag(docVersion),
      timestamp: new Date().toISOString(),
      author: 'User',
      changeSummary: `Rollback to ${snapshot.versionTag} (${snapshot.changeSummary})`,
      targetType: 'full',
      docMarkdown: snapshot.docMarkdown,
      docVersion: snapshot.docVersion,
      diagramSlots: snapshot.diagramSlots,
    };

    const updatedHistory = pushVersionSnapshot(versionHistory, rollbackSnap);
    setVersionHistory(updatedHistory);

    const rollbackMsg: ChatMessage = {
      id: `msg_${Date.now()}_sys`,
      sender: 'system',
      text: `⏪ Restored snapshot ${snapshot.versionTag} (authored ${formatRelativeTime(snapshot.timestamp)} by ${snapshot.author}). All document text and diagram slot configurations were restored.`,
      timestamp: new Date().toISOString(),
    };
    const updatedChat = [...chatHistory, rollbackMsg];
    setChatHistory(updatedChat);
    saveVersionHistory(projectId || 'default', updatedHistory, updatedChat);
  };

  // Append Chat Message helper
  const handleAddChatMessage = (msg: ChatMessage) => {
    setChatHistory((prev) => {
      const updated = [...prev, msg];
      saveVersionHistory(projectId || 'default', versionHistory, updated);
      return updated;
    });
  };

  // Section Action Handlers
  const handleStartEditSection = (sec: DocumentSection) => {
    setEditingSectionId(sec.id);
    setEditTitleDraft(sec.title);
    setEditContentDraft(sec.content);
    setAddingSectionBelowId(null);
  };

  const handleCancelEditSection = () => {
    setEditingSectionId(null);
  };

  const handleSaveSection = (sec: DocumentSection) => {
    if (!generatedDocContent) return;
    const sections = parseDocumentIntoSections(generatedDocContent);
    const updated = updateSection(sections, sec.id, editTitleDraft, editContentDraft);
    const newMarkdown = reconstructDocumentFromSections(updated);
    handleApplyDocUpdate(newMarkdown, `Edited Section "${editTitleDraft || sec.title}"`, 'User');
    setEditingSectionId(null);
  };

  const handleDeleteSection = (sec: DocumentSection) => {
    if (!generatedDocContent) return;
    if (typeof window !== 'undefined' && !window.confirm(`Are you sure you want to delete section "${sec.title}"?`)) {
      return;
    }
    const sections = parseDocumentIntoSections(generatedDocContent);
    const updated = deleteSection(sections, sec.id);
    const newMarkdown = reconstructDocumentFromSections(updated);
    handleApplyDocUpdate(newMarkdown, `Deleted Section "${sec.title}"`, 'User');
    if (editingSectionId === sec.id) setEditingSectionId(null);
  };

  const handleCloneSection = (sec: DocumentSection) => {
    if (!generatedDocContent) return;
    const sections = parseDocumentIntoSections(generatedDocContent);
    const updated = cloneSection(sections, sec.id);
    const newMarkdown = reconstructDocumentFromSections(updated);
    handleApplyDocUpdate(newMarkdown, `Cloned Section "${sec.title}"`, 'User');
  };

  const handleStartAddSectionBelow = (sec: DocumentSection) => {
    setAddingSectionBelowId(sec.id);
    setNewSectionTitleDraft('New Architectural Chapter');
    setNewSectionContentDraft('* Add technical specifications, SLA tables, and requirements here.');
    setNewSectionLevelDraft(sec.level);
    setEditingSectionId(null);
  };

  const handleCancelAddSectionBelow = () => {
    setAddingSectionBelowId(null);
  };

  const handleConfirmAddSectionBelow = (targetSec: DocumentSection) => {
    if (!generatedDocContent) return;
    const sections = parseDocumentIntoSections(generatedDocContent);
    const updated = insertNewSectionAfter(
      sections,
      targetSec.id,
      newSectionLevelDraft,
      newSectionTitleDraft,
      newSectionContentDraft
    );
    const newMarkdown = reconstructDocumentFromSections(updated);
    handleApplyDocUpdate(newMarkdown, `Added New Section "${newSectionTitleDraft}"`, 'User');
    setAddingSectionBelowId(null);
  };

  const handleMoveSectionUp = (sec: DocumentSection) => {
    if (!generatedDocContent) return;
    const sections = parseDocumentIntoSections(generatedDocContent);
    const updated = moveSectionUp(sections, sec.id);
    const newMarkdown = reconstructDocumentFromSections(updated);
    handleApplyDocUpdate(newMarkdown, `Moved Up Section "${sec.title}"`, 'User');
  };

  const handleMoveSectionDown = (sec: DocumentSection) => {
    if (!generatedDocContent) return;
    const sections = parseDocumentIntoSections(generatedDocContent);
    const updated = moveSectionDown(sections, sec.id);
    const newMarkdown = reconstructDocumentFromSections(updated);
    handleApplyDocUpdate(newMarkdown, `Moved Down Section "${sec.title}"`, 'User');
  };

  const handlePromoteSection = (sec: DocumentSection) => {
    if (!generatedDocContent || sec.level <= 1) return;
    const sections = parseDocumentIntoSections(generatedDocContent);
    const updated = changeSectionHierarchy(sections, sec.id, 'promote');
    const newMarkdown = reconstructDocumentFromSections(updated);
    handleApplyDocUpdate(newMarkdown, `Promoted "${sec.title}" to Higher Parent Level (H${sec.level - 1})`, 'User');
  };

  const handleDemoteSection = (sec: DocumentSection) => {
    if (!generatedDocContent || sec.level >= 3) return;
    const sections = parseDocumentIntoSections(generatedDocContent);
    const updated = changeSectionHierarchy(sections, sec.id, 'demote');
    const newMarkdown = reconstructDocumentFromSections(updated);
    handleApplyDocUpdate(newMarkdown, `Demoted "${sec.title}" to Leaf Sub-Section Level (H${sec.level + 1})`, 'User');
  };

  // Download Word docx
  const handleDownloadDocx = async () => {
    try {
      const primarySlot = activeMeta.blueprintPack[0];
      const selectedTplId = slotCustomizations[0]?.templateId || primarySlot.recommendedTemplateId;
      const primaryTpl = CANONICAL_TEMPLATES.find((t) => t.id === selectedTplId) || CANONICAL_TEMPLATES[0];
      const primaryXml = primaryTpl.generateXml(selectedDomain, isLight ? 'light' : 'dark');

      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: selectedArchetypeId,
          format: 'docx',
          xml: primaryXml,
          title: projectTitle,
          domain: DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name || selectedDomain,
          userPrompt: projectScopePrompt,
        }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${selectedArchetypeId.toUpperCase()}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('DOCX download error:', err);
    }
  };

  // Download sample docx from preview modal
  const handleDownloadSampleDocx = async (archetypeId: ArchetypeId, docName: string) => {
    try {
      const primaryTpl = CANONICAL_TEMPLATES[0];
      const primaryXml = primaryTpl.generateXml('biopharma', isLight ? 'light' : 'dark');

      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: archetypeId,
          format: 'docx',
          xml: primaryXml,
          title: `Enterprise Platform ${docName}`,
          domain: 'Enterprise Cloud Architecture & Distributed Systems',
          userPrompt: 'Master architectural baseline for high-throughput production scale.',
        }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Enterprise_${archetypeId.toUpperCase()}_Master_Specification.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Sample DOCX download error:', err);
    }
  };

  // Download Markdown
  const handleDownloadMarkdown = () => {
    if (!generatedDocContent) return;
    const blob = new Blob([generatedDocContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${selectedArchetypeId.toUpperCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy Markdown
  const handleCopyMarkdown = () => {
    if (!generatedDocContent) return;
    navigator.clipboard.writeText(generatedDocContent);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  // Copy Sample Markdown
  const handleCopySampleMarkdown = (content: string) => {
    navigator.clipboard.writeText(content);
    setSampleCopiedSuccess(true);
    setTimeout(() => setSampleCopiedSuccess(false), 2000);
  };

  // Print to PDF
  const handlePrintToPdf = () => {
    window.print();
  };

  // Helper to render markdown content inside a section (tables, bullets, code blocks, diagrams, paragraphs)
  const renderMarkdownBlocks = (content: string, secKey: string) => {
    if (!content.trim()) return null;
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Nested Sub-headers inside section
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`subh3-${secKey}-${i}`} className={`text-sm md:text-base font-bold uppercase tracking-wider mt-4 mb-2 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            {line.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }
      if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={`subh4-${secKey}-${i}`} className={`text-xs md:text-sm font-semibold tracking-wide mt-3 mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            {line.replace('#### ', '')}
          </h4>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${secKey}-${i}`} className={`my-4 ${isLight ? 'border-slate-300' : 'border-slate-800'}`} />);
        i++;
        continue;
      }

      // Table parsing
      if (line.trim().startsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        const parseTableRow = (rowStr: string) => {
          const trimmed = rowStr.trim();
          const content = trimmed.replace(/^\|/, '').replace(/\|$/, '');
          return content.split('|').map((cell) => cell.trim());
        };

        const headers = parseTableRow(tableLines[0]);
        const dataRows = tableLines
          .slice(1)
          .filter((rowLine) => !rowLine.includes('---'))
          .map((rowLine) => {
            const cells = parseTableRow(rowLine);
            while (cells.length < headers.length) {
              cells.push('');
            }
            return cells.slice(0, headers.length);
          });

        elements.push(
          <div key={`table-${secKey}-${i}`} className={`my-4 overflow-x-auto rounded-2xl border shadow-md ${
            isLight ? 'border-slate-300 bg-white' : 'border-slate-700/80 bg-slate-950/60'
          }`}>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b ${
                  isLight ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-slate-800/90 text-slate-200 border-slate-700'
                }`}>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className={`px-4 py-3 font-bold uppercase tracking-wider text-[11px] ${
                      isLight ? 'text-slate-800' : 'text-slate-300'
                    }`}>
                      {h.replace(/\*\*/g, '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/80'}`}>
                {dataRows.map((r, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`transition-colors ${
                      isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    {r.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 leading-relaxed">
                        {cell.replace(/\*\*(.*?)\*\*/g, '$1')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Bullet points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().replace(/^[\*\-]\s+/, '');
        elements.push(
          <div key={`bullet-${secKey}-${i}`} className={`flex items-start gap-2.5 text-xs ml-3 my-1.5 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            <span className={`mt-1 font-bold text-base ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>•</span>
            <span className="leading-relaxed">{bulletText.replace(/\*\*(.*?)\*\*/g, '$1')}</span>
          </div>
        );
        i++;
        continue;
      }

      // Code blocks / diagrams
      if (line.trim().startsWith('```')) {
        const lang = line.trim().replace(/^```/, '').trim().toLowerCase();
        const codeLines: string[] = [];
        const codeBlockStartIndex = i;
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```

        const isDiagram =
          lang === 'mermaid' ||
          lang === 'diagram' ||
          codeLines.some(
            (l) =>
              l.includes('graph TD') ||
              l.includes('graph LR') ||
              l.includes('flowchart') ||
              l.includes('sequenceDiagram') ||
              l.includes('erDiagram')
          );

        if (!isDiagram) {
          elements.push(
            <div
              key={`code-block-${secKey}-${i}`}
              className={`my-4 rounded-2xl border overflow-hidden shadow-sm ${
                isLight ? 'bg-[#0F172A] border-slate-700 text-slate-100' : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}
            >
              <div className="px-4 py-2 border-b border-slate-800 bg-[#0B111E] flex items-center justify-between text-xs font-mono">
                <span className="uppercase font-bold text-[11px] text-sky-400">
                  {lang || 'code'} Specification
                </span>
                <span className="text-[10px] text-slate-500 font-sans">
                  {codeLines.length} lines
                </span>
              </div>
              <pre className="p-4 font-mono text-xs overflow-x-auto leading-relaxed text-teal-300">
                {codeLines.join('\n')}
              </pre>
            </div>
          );
          continue;
        }

        // Extract preceding heading for title / template matching
        let precedingHeading = '';
        for (let back = codeBlockStartIndex - 1; back >= Math.max(0, codeBlockStartIndex - 8); back--) {
          const backLine = lines[back] ? lines[back].trim() : '';
          if (backLine.length > 0) {
            if (backLine.startsWith('#')) {
              precedingHeading = backLine.replace(/^#+\s*/, '');
              break;
            }
            if (backLine.includes('Template') || backLine.includes('TEMPLATE') || backLine.includes('Visual Diagram')) {
              precedingHeading = backLine;
              break;
            }
          }
        }

        const tplMatch = precedingHeading.match(/Template\s*([0-9]{1,2})/i);
        const matchedTemplateId = tplMatch ? tplMatch[1].padStart(2, '0') : null;

        const parsedNodes: { id: string; label: string; tier: string }[] = [];
        const parsedFlows: { from: string; to: string; label?: string }[] = [];

        for (const rawLine of codeLines) {
          const l = rawLine.trim();
          const nodeMatch = l.match(/^([A-Za-z0-9_]+)\["([^"]+)"\]/);
          if (nodeMatch) {
            const [, id, label] = nodeMatch;
            let tier = 'Architecture Subsystem';
            if (label.includes('🌐') || label.includes('Client') || label.includes('Portal') || label.includes('USERS')) tier = 'Client & Ingress Tier';
            else if (label.includes('🛡️') || label.includes('WAF') || label.includes('Gateway') || label.includes('VPC')) tier = 'Security & Perimeter Tier';
            else if (label.includes('⚙️') || label.includes('Orchestrator') || label.includes('Compute') || label.includes('Pod')) tier = 'Compute & Runtime Tier';
            else if (label.includes('🤖') || label.includes('Model') || label.includes('LLM') || label.includes('AI') || label.includes('Gemini')) tier = 'AI & Cognitive Model Tier';
            else if (label.includes('🗄️') || label.includes('Spanner') || label.includes('Lake') || label.includes('DB') || label.includes('Data')) tier = 'Enterprise Data & Knowledge Tier';
            else if (label.includes('⚖️') || label.includes('Audit') || label.includes('Governance') || label.includes('SAFETY') || label.includes('HITL')) tier = 'Governance & Audit Tier';
            else if (label.includes('☁️') || label.includes('Systems') || label.includes('External') || label.includes('API')) tier = 'External Ecosystem Tier';

            if (!parsedNodes.some((n) => n.id === id)) {
              parsedNodes.push({ id, label, tier });
            }
          }

          const flowMatch = l.match(/([A-Za-z0-9_]+)\s*(?:-->|<-->)\s*(?:\|"([^"]+)"\|\s*)?([A-Za-z0-9_]+)/);
          if (flowMatch) {
            parsedFlows.push({ from: flowMatch[1], to: flowMatch[3], label: flowMatch[2] });
          }
        }

        if (studioMode !== 'documents') {
          elements.push(
            <InlineDiagramFigure
              key={`diagram-fig-${secKey}-${i}`}
              templateId={matchedTemplateId || '01'}
              figureTitle={precedingHeading}
              isLight={isLight}
              selectedDomain={selectedDomain}
              projectTitle={projectTitle}
              projectScopePrompt={projectScopePrompt}
              codeLines={codeLines}
              parsedNodes={parsedNodes}
              parsedFlows={parsedFlows}
            />
          );
        } else {
          // Document-Only Mode: Render clean technical architecture callout box
          elements.push(
            <div key={`doc-arch-box-${secKey}-${i}`} className="my-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2.5">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {precedingHeading || 'Technical Architecture Definition & Topology Specification'}
                </span>
              </div>
              <div className="text-[11px] font-mono p-3 rounded-xl bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800/80 overflow-x-auto whitespace-pre max-h-48 custom-scrollbar">
                {codeLines.slice(0, 12).join('\n')}
              </div>
            </div>
          );
        }
        continue;
      }

      // Empty line
      if (!line.trim()) {
        i++;
        continue;
      }

      // Standard paragraph
      elements.push(
        <p key={`p-${secKey}-${i}`} className={`text-xs md:text-sm leading-relaxed my-2 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
          {line.replace(/\*\*(.*?)\*\*/g, '$1')}
        </p>
      );
      i++;
    }

    return elements;
  };

  // Parse markdown for executive publication rendering with granular section controls
  const renderExecutiveDocument = (text: string, isInteractive: boolean = true) => {
    const sections = parseDocumentIntoSections(text);

    return (
      <div className="space-y-6">
        {sections.map((sec, secIdx) => {
          const isEditing = editingSectionId === sec.id;
          const isAddingBelow = addingSectionBelowId === sec.id;

          return (
            <div
              key={sec.id}
              className={`group relative rounded-2xl p-4 md:p-6 transition-all border ${
                isEditing
                  ? 'bg-sky-500/5 border-sky-500/40 shadow-lg ring-2 ring-sky-500/20'
                  : isLight
                  ? 'bg-white hover:bg-slate-50/70 border-slate-200/80 shadow-2xs hover:border-slate-300'
                  : 'bg-[#0B132B]/40 hover:bg-[#0F172A]/70 border-slate-800/80 shadow-2xs hover:border-slate-700'
              }`}
            >
              {/* SECTION HEADER WITH INTERACTIVE ACTION BAR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  {/* Hierarchy Level Badge */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                    sec.level === 1
                      ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                      : sec.level === 2
                      ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {sec.level === 1 ? 'H1 Title' : sec.level === 2 ? `Chapter ${secIdx}` : `Sub-Sec ${secIdx}`}
                  </span>

                  {/* Section Title */}
                  {sec.level === 1 ? (
                    <h1 className={`text-xl md:text-2xl font-black tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {sec.title}
                    </h1>
                  ) : sec.level === 2 ? (
                    <h2 className={`text-base md:text-lg font-bold truncate flex items-center gap-2 ${isLight ? 'text-sky-900' : 'text-sky-400'}`}>
                      <span className={`h-2 w-2 rounded-full shrink-0 ${isLight ? 'bg-sky-600' : 'bg-sky-400'}`}></span>
                      <span className="truncate">{sec.title}</span>
                    </h2>
                  ) : (
                    <h3 className={`text-sm md:text-base font-bold uppercase tracking-wider truncate ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                      {sec.title}
                    </h3>
                  )}
                </div>

                {/* ACTION ICONS BAR: Edit, Save, Delete, Clone, Add, Move Up/Down, Promote/Demote */}
                {isInteractive && (
                  <div className="flex items-center gap-1 shrink-0 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 no-print">
                    {/* EDIT / SAVE TOGGLE */}
                    {isEditing ? (
                      <button
                        onClick={() => handleSaveSection(sec)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer"
                        title="Save changes to this section"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartEditSection(sec)}
                        className="p-1.5 rounded-lg hover:bg-sky-500/10 hover:text-sky-500 transition-colors cursor-pointer"
                        title="Edit Section"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* CLONE / DUPLICATE */}
                    <button
                      onClick={() => handleCloneSection(sec)}
                      className="p-1.5 rounded-lg hover:bg-sky-500/10 hover:text-sky-500 transition-colors cursor-pointer"
                      title="Clone / Duplicate Section"
                    >
                      <CopyPlus className="w-3.5 h-3.5" />
                    </button>

                    {/* ADD BELOW */}
                    <button
                      onClick={() => handleStartAddSectionBelow(sec)}
                      className="p-1.5 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors cursor-pointer"
                      title="Add New Section Below"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDeleteSection(sec)}
                      className="p-1.5 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Delete Section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-slate-700 mx-0.5"></div>

                    {/* MOVE UP */}
                    <button
                      onClick={() => handleMoveSectionUp(sec)}
                      disabled={secIdx === 0}
                      className="p-1.5 rounded-lg hover:bg-sky-500/10 hover:text-sky-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move Section Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    {/* MOVE DOWN */}
                    <button
                      onClick={() => handleMoveSectionDown(sec)}
                      disabled={secIdx === sections.length - 1}
                      className="p-1.5 rounded-lg hover:bg-sky-500/10 hover:text-sky-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move Section Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-slate-700 mx-0.5"></div>

                    {/* PROMOTE (HIGHER PARENT LEVEL) */}
                    <button
                      onClick={() => handlePromoteSection(sec)}
                      disabled={sec.level <= 1}
                      className="p-1.5 rounded-lg hover:bg-purple-500/10 hover:text-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Promote to Higher Parent Level (e.g. Sub-section to Chapter)"
                    >
                      <FolderTree className="w-3.5 h-3.5" />
                    </button>

                    {/* DEMOTE (LEAF LEVEL) */}
                    <button
                      onClick={() => handleDemoteSection(sec)}
                      disabled={sec.level >= 3}
                      className="p-1.5 rounded-lg hover:bg-purple-500/10 hover:text-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Demote to Leaf Level (e.g. Chapter to Sub-section)"
                    >
                      <CornerDownRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* INLINE EDIT MODE */}
              {isEditing ? (
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Title:</span>
                    <input
                      type="text"
                      value={editTitleDraft}
                      onChange={(e) => setEditTitleDraft(e.target.value)}
                      className={`flex-1 w-full text-xs font-bold px-3 py-1.5 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <textarea
                    rows={8}
                    value={editContentDraft}
                    onChange={(e) => setEditContentDraft(e.target.value)}
                    className={`w-full text-xs font-mono p-3.5 rounded-xl border outline-none resize-y leading-relaxed ${
                      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-teal-300'
                    }`}
                  />
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={handleCancelEditSection}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveSection(sec)}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Section Changes</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* RENDERED SECTION CONTENT */
                <div className="pt-1">
                  {renderMarkdownBlocks(sec.content, sec.id)}
                </div>
              )}

              {/* INLINE ADD NEW SECTION FORM BELOW */}
              {isAddingBelow && (
                <div className="mt-4 pt-4 border-t-2 border-dashed border-emerald-500/40 space-y-3 bg-emerald-500/5 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <PlusCircle className="w-4 h-4" /> Add New Architectural Section
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[10px] text-slate-400">Level:</span>
                      <button
                        onClick={() => setNewSectionLevelDraft(2)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          newSectionLevelDraft === 2 ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        Chapter (H2)
                      </button>
                      <button
                        onClick={() => setNewSectionLevelDraft(3)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          newSectionLevelDraft === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        Sub-section (H3)
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Section Title (e.g. 4. Security Architecture & Threat Model)"
                    value={newSectionTitleDraft}
                    onChange={(e) => setNewSectionTitleDraft(e.target.value)}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border outline-none ${
                      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                    }`}
                  />
                  <textarea
                    rows={4}
                    placeholder="Section content in markdown..."
                    value={newSectionContentDraft}
                    onChange={(e) => setNewSectionContentDraft(e.target.value)}
                    className={`w-full text-xs font-mono p-3 rounded-xl border outline-none resize-y ${
                      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-slate-200'
                    }`}
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={handleCancelAddSectionBelow}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleConfirmAddSectionBelow(sec)}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Insert Section</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex min-h-screen font-sans selection:bg-sky-500/30 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#070A13] text-slate-100'
    }`}>
      {/* PRINT-SPECIFIC CSS RULES FOR 100% CLEAN PDF EXPORT */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          header, nav, .no-print {
            display: none !important;
          }
          .print-container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          h1, h2, h3 {
            page-break-after: avoid;
            color: black !important;
          }
          table, pre, .print-box {
            page-break-inside: avoid;
            border: 1px solid #ccc !important;
          }
        }
      `,
        }}
      />

      {/* Collapsible Left Navigation Menu */}
      <UnifiedAppSidebar />

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* TOP STICKY NAVBAR */}
        <header className={`sticky top-0 w-full z-30 border-b backdrop-blur-md transition-colors no-print ${
          isLight ? 'border-slate-200 bg-white/95 text-slate-900 shadow-sm' : 'border-slate-800/80 bg-[#070A13]/90 text-white'
        }`}>
          <div className="max-w-[1600px] mx-auto h-16 md:h-18 px-4 md:px-8 flex items-center justify-between gap-4">
            {/* Left Title & Sidebar Toggle */}
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="hidden lg:flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Expand Left Navigation Menu"
                >
                  <Menu className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Toggle Menu"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold">
                <Link href="/" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" title="Home">
                  PromptCanvas
                </Link>
                <span className="text-slate-400">/</span>
                <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5 truncate">
                  <FileText className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>DocGen Studio &amp; Specifications</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                  {DOC_ARCHETYPES_META.length} Archetypes
                </span>
              </div>
            </div>

            {/* Center View Selector Tabs */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'catalog'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                    : isLight
                    ? 'hover:bg-slate-200 text-slate-600'
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Document Standards Catalog</span>
              </button>

              <button
                onClick={() => setActiveTab('studio')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'studio'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                    : isLight
                    ? 'hover:bg-slate-200 text-slate-600'
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Multi-Blueprint Studio</span>
              </button>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsDocHistoryModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
                title="Open Historical Projects & Document Specifications"
              >
                <History className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Project History</span>
              </button>

              <ThemeToggleBtn id="docgen-theme-toggle-btn" />
            </div>
          </div>
        </header>

        {/* COMPACT HERO SECTION (Catalog Tab Only) */}
        <main className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">
        {activeTab === 'catalog' && (
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-3.5 border-b border-slate-200 dark:border-slate-800 no-print min-w-0">
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  <FileText className="w-3 h-3 text-sky-500" />
                  <span>Enterprise Specification &amp; Document Engine</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                Architectural Grammar for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400">
                  Production-Ready Enterprise Docs
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal max-w-2xl line-clamp-1">
                Synthesize 17 production document specifications (BRD, PRD, SDD, TDD, STRIDE, GRC) with attached canonical blueprint packs and Word export.
              </p>
            </div>

            {/* Compact Stats Pill Strip */}
            <div className="flex items-center gap-3 sm:gap-4 p-2 px-3.5 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
              <div className="text-center px-1.5">
                <div className="text-base sm:text-lg font-black text-sky-500">17</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Archetypes</div>
              </div>
              <div className="h-6 w-[1px] bg-slate-200 dark:border-slate-800" />
              <div className="text-center px-1.5">
                <div className="text-base sm:text-lg font-black text-indigo-500">50</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Blueprints</div>
              </div>
              <div className="h-6 w-[1px] bg-slate-200 dark:border-slate-800" />
              <div className="text-center px-1.5">
                <div className="text-base sm:text-lg font-black text-emerald-500">100%</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Word Ready</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: CATALOG VIEW (PREVIEW ALL 17 DOCUMENT BLUEPRINTS) */}
        {activeTab === 'catalog' && (
          <div className="py-3 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Enterprise Document Archetypes Catalog
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  Preview full specifications, inspect attached blueprints, or launch the generation studio.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('studio')}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sm hover:scale-[1.02] transition-transform"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Studio</span>
                </button>
              </div>
            </div>

            {/* 17 DOCUMENT ARCHETYPE CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-[1600px]:grid-cols-3 gap-5">
              {DOC_ARCHETYPES_META.map((meta, idx) => {
                const docNumber = String(idx + 1).padStart(2, '0');
                return (
                  <div
                    key={meta.id}
                    className={`rounded-3xl border p-6 flex flex-col justify-between transition-all hover:shadow-xl ${
                      isLight
                        ? 'bg-white border-slate-200/90 shadow-slate-200/50 hover:border-sky-400'
                        : 'bg-[#0B111E] border-slate-800/80 shadow-2xl hover:border-sky-500/50'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top Row: Doc Number, Short Tag & Category Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-black text-sm flex items-center justify-center shrink-0">
                            {docNumber}
                          </span>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
                              DOC {docNumber} &bull; <span className="text-sky-600 dark:text-sky-400 font-extrabold">{meta.shortName}</span>
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                              {meta.name}
                            </h3>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0 ${meta.badgeColor}`}>
                          {meta.badge}
                        </span>
                      </div>

                      {/* Purpose */}
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {meta.primaryPurpose}
                        </p>
                      </div>

                      {/* Target Audience */}
                      <div className="text-[11px] text-slate-400 pt-1">
                        <span className="font-bold text-slate-500 dark:text-slate-400">Audience: </span>
                        {meta.audience}
                      </div>

                      {/* Attached Blueprint Pack Slots */}
                      <div className="space-y-2 pt-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Attached Blueprint Pack ({meta.blueprintPack.length} Diagrams)</span>
                          <span className="text-sky-500 font-mono">{meta.sectionsCount} Sections</span>
                        </div>
                        <div className="space-y-1.5">
                          {meta.blueprintPack.map((slot, sIdx) => {
                            return (
                              <div
                                key={sIdx}
                                className="flex items-center justify-between p-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="w-5 h-5 rounded-md bg-sky-500/10 text-sky-500 font-black text-[10px] flex items-center justify-center shrink-0">
                                    {slot.recommendedTemplateId}
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300 font-medium truncate text-[11px]">
                                    {slot.slotTitle}
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                                  Ch. {slot.chapterNumber}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenPreview(meta)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-sky-500" />
                        <span>Preview Full Spec</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedArchetypeId(meta.id);
                          setStudioMode('both');
                          setActiveTab('studio');
                        }}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02]"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Build Document</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE DOCUMENT STUDIO & GENERATOR */}
        {activeTab === 'studio' && (
          <div className="py-4 space-y-6 max-w-[1600px] mx-auto">
            {/* Top Studio Generation Mode Command Bar */}
            <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-3xl border shadow-sm ${
              isLight ? 'bg-white border-slate-200 shadow-slate-200/40' : 'bg-[#0B111E] border-slate-800 shadow-2xl'
            }`}>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    Studio Generation Mode:
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800">
                    {studioMode === 'diagrams' && '50 Canonical 16:9 Master Blueprints'}
                    {studioMode === 'documents' && '17 Production-Ready Archetypes'}
                    {studioMode === 'both' && 'Unified Multi-Blueprint Specifications'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {studioMode === 'diagrams' && 'Synthesize standalone 16:9 architecture diagrams with domain flavoring, component matrices & Canonical Blueprints suite.'}
                  {studioMode === 'documents' && 'Synthesize 17 production-ready enterprise specifications (BRD, PRD, SDD, TDD, STRIDE) with full section controls.'}
                  {studioMode === 'both' && 'Generate multi-chapter enterprise specifications with live 16:9 interactive diagrams embedded in each chapter.'}
                </p>
              </div>

              {/* 3 Mode Switcher Buttons */}
              <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => {
                    setStudioMode('diagrams');
                    setGeneratedDocContent(null);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    studioMode === 'diagrams'
                      ? 'bg-teal-600 text-white shadow-sm font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Diagrams</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStudioMode('documents');
                    setGeneratedDocContent(null);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    studioMode === 'documents'
                      ? 'bg-sky-600 text-white shadow-sm font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Documents</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStudioMode('both');
                    setGeneratedDocContent(null);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    studioMode === 'both'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Both (Unified)</span>
                </button>
              </div>
            </div>

            {/* MAIN SPLIT-SCREEN COCKPIT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN (6 COLS): AI ARCHITECTURE CONFIGURATION & PIPELINE */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Step 1 Card: Core Configuration */}
                <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                  isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-xl'
                }`}>
                  {/* Header & Categories */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800">
                        Step 1 &bull; Configuration
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {studioMode === 'diagrams' ? '50 Blueprints Available' : '17 Archetypes Available'}
                      </span>
                    </div>

                    {/* Category Filter Pills / Archetype Selector */}
                    {studioMode === 'diagrams' ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {DIAGRAM_FAMILY_PRESETS.map((fam) => (
                          <button
                            key={fam.id}
                            type="button"
                            onClick={() => {
                              setSelectedDiagramFamily(fam.id);
                              const matchingTpls = CANONICAL_TEMPLATES.filter((t) => fam.id === 'all' || (t.family && t.family.toLowerCase().includes(fam.id.toLowerCase())));
                              if (matchingTpls.length > 0 && !matchingTpls.some(t => t.id === selectedDiagramTemplateId)) {
                                const newId = matchingTpls[0].id;
                                setSelectedDiagramTemplateId(newId);
                                setDiagramSlotsList((prev) =>
                                  prev.map((slot, idx) => (idx === 0 ? { ...slot, templateId: newId } : slot))
                                );
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              selectedDiagramFamily === fam.id
                                ? 'bg-teal-600 text-white shadow-sm font-black'
                                : isLight
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                            }`}
                          >
                            <span>{fam.icon}</span>
                            <span>{fam.label}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {DOC_ARCHETYPES_META.map((meta) => (
                          <button
                            key={meta.id}
                            type="button"
                            onClick={() => {
                              setSelectedArchetypeId(meta.id);
                              setActivePreviewChapterIndex(0);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              selectedArchetypeId === meta.id
                                ? 'bg-sky-600 text-white shadow-sm font-black'
                                : isLight
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                            }`}
                          >
                            {meta.shortName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Blueprint Selector (Diagrams Mode) */}
                  {studioMode === 'diagrams' && (
                    <div className="p-3.5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/40 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Network className="w-4 h-4 text-teal-600" />
                          <span className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-300">
                            Primary Canonical Blueprint:
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-400">
                          #{selectedDiagramTemplateId || '01'}
                        </span>
                      </div>

                      {/* Popular Blueprint Quick Pills */}
                      <div className="flex flex-wrap items-center gap-1">
                        {[
                          { id: '01', label: '#01 System Context' },
                          { id: '08', label: '#08 Component Arch' },
                          { id: '17', label: '#17 Landing Zone' },
                          { id: '23', label: '#23 Zero-Trust' },
                          { id: '29', label: '#29 Lakehouse' },
                          { id: '34', label: '#34 Vertex RAG' },
                          { id: '41', label: '#41 Multi-Agent' },
                        ].map((bp) => (
                          <button
                            key={bp.id}
                            type="button"
                            onClick={() => {
                              setSelectedDiagramTemplateId(bp.id);
                              setDiagramSlotsList((prev) =>
                                prev.map((slot, idx) => (idx === 0 ? { ...slot, templateId: bp.id } : slot))
                              );
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              selectedDiagramTemplateId === bp.id
                                ? 'bg-teal-600 text-white shadow-sm'
                                : isLight
                                ? 'bg-white text-slate-700 hover:bg-teal-100 border border-slate-200'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                            }`}
                          >
                            {bp.label}
                          </button>
                        ))}
                      </div>

                      <select
                        value={selectedDiagramTemplateId}
                        onChange={(e) => {
                          const newTplId = e.target.value;
                          setSelectedDiagramTemplateId(newTplId);
                          setDiagramSlotsList((prev) =>
                            prev.map((slot, idx) => (idx === 0 ? { ...slot, templateId: newTplId } : slot))
                          );
                        }}
                        className={`w-full p-2 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer ${
                          isLight
                            ? 'bg-white border-teal-300 text-slate-900'
                            : 'bg-slate-900 border-teal-500/40 text-white'
                        }`}
                      >
                        {CANONICAL_TEMPLATES
                          .filter((t) => selectedDiagramFamily === 'all' || (t.family && t.family.toLowerCase().includes(selectedDiagramFamily.toLowerCase())))
                          .map((t) => (
                            <option key={t.id} value={t.id} className="py-1">
                              {t.id} - {t.name} [{t.family || 'Canonical'}]
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {/* System Title */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">
                      1. System / Architecture Title
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setProjectTitle(newTitle);
                        const autoDomain = detectDomainFromPrompt(newTitle, projectScopePrompt, selectedDomain);
                        if (autoDomain && autoDomain !== selectedDomain) {
                          setSelectedDomain(autoDomain);
                        }
                      }}
                      placeholder="e.g. AeroNode Autonomous Last-Mile Drone Delivery & Micro-Hub Fleet Mesh"
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    />
                  </div>

                  {/* AI Scope Prompt Terminal */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                        2. Architectural Scope &amp; Topology Requirements Prompt
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">
                        Gemini 3.7 &bull; Real-Time AST
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={projectScopePrompt}
                      onChange={(e) => {
                        const newScope = e.target.value;
                        setProjectScopePrompt(newScope);
                        const autoDomain = detectDomainFromPrompt(projectTitle, newScope, selectedDomain);
                        if (autoDomain && autoDomain !== selectedDomain) {
                          setSelectedDomain(autoDomain);
                        }
                      }}
                      placeholder="Describe key Google Cloud services, data sources, security mandates, and integration endpoints..."
                      className={`w-full p-3 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    />
                  </div>

                  {/* Enterprise Domain Flavor Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                        3. Enterprise Domain Flavor
                      </label>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Prompt Sync
                      </span>
                    </div>
                    <select
                      value={selectedDomain}
                      onChange={(e) => {
                        const newDom = e.target.value;
                        setSelectedDomain(newDom);
                        if (newDom === 'manufacturing') {
                          setProjectScopePrompt(`Mission-critical autonomous telemetry, SCADA/PLC edge ingestion, sub-20ms real-time control loops, Spanner state store, and automated safety interlocks for ${projectTitle}.`);
                        } else if (newDom === 'fintech') {
                          setProjectScopePrompt(`High-throughput transaction orchestration, sub-5ms pre-trade risk evaluation, ISO 20022 messaging, Spanner double-entry ledger, and real-time fraud anomaly detection for ${projectTitle}.`);
                        } else if (newDom === 'retail') {
                          setProjectScopePrompt(`Omnichannel marketplace catalog, real-time inventory allocation, event-driven order orchestration, and dynamic pricing with sub-50ms latency for ${projectTitle}.`);
                        } else if (newDom === 'saas') {
                          setProjectScopePrompt(`Enterprise multi-tenant workflow orchestration, isolated workspace sharding, distributed Redis rate limiting, and immutable SOC 2 audit telemetry for ${projectTitle}.`);
                        } else if (newDom === 'biopharma') {
                          setProjectScopePrompt(`An enterprise-grade decentralized clinical genomics analysis and regulatory pharmacovigilance platform with automated FDA electronic signature audits, Spanner knowledge graphs, multi-region active-active disaster recovery, and zero-trust VPC Service Perimeters.`);
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-bold text-teal-700 dark:text-teal-400 focus:outline-none cursor-pointer ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      {DOMAIN_PRESETS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Load Industry Presets (Glass Tiles) */}
                  <div className="space-y-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      ⚡ Quick Load Architecture Scenarios:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDomain('manufacturing');
                          setProjectTitle('AeroNode Autonomous Last-Mile Drone Delivery & Micro-Hub Fleet Mesh');
                          setProjectScopePrompt('I want to architect a nationwide autonomous drone delivery and automated micro-hub fulfillment network called AeroNode. The system coordinates real-time collision-avoidance telemetry across 25,000+ autonomous delivery drones via 5G Ultra-Wideband and ADS-B mesh networks. It requires sub-20ms UTM (Unmanned Traffic Management) airspace routing, automated robotic payload swapping at local battery swap stations, dynamic weather radar ingestion via NOAA APIs, and FAA Part 135 continuous flight certification logging.');
                        }}
                        className={`p-2 rounded-xl border text-left transition-all hover:border-teal-400 flex items-center gap-2 cursor-pointer group ${
                          isLight ? 'bg-slate-50 hover:bg-teal-50 border-slate-200' : 'bg-slate-900 hover:bg-teal-950/30 border-slate-800'
                        }`}
                      >
                        <span className="text-sm">🚁</span>
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 truncate">AeroNode Drone</div>
                          <div className="text-[9px] text-slate-400 truncate">5G UTM Airspace</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDomain('manufacturing');
                          setProjectTitle('VoltGrid Autonomous EV Fleet Charging & Microgrid Energy Exchange');
                          setProjectScopePrompt('I want to architect a nationwide decentralized smart EV fast-charging network and dynamic microgrid energy trading platform called VoltGrid. The system must ingest high-frequency telemetry from 50,000+ DC fast chargers via OCPP 2.0.1 and ISO 15118 (Plug & Charge). It requires sub-50ms dynamic load balancing across local Battery Energy Storage Systems (BESS), solar microgrids, and the utility distribution grid.');
                        }}
                        className={`p-2 rounded-xl border text-left transition-all hover:border-teal-400 flex items-center gap-2 cursor-pointer group ${
                          isLight ? 'bg-slate-50 hover:bg-teal-50 border-slate-200' : 'bg-slate-900 hover:bg-teal-950/30 border-slate-800'
                        }`}
                      >
                        <span className="text-sm">⚡</span>
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 truncate">VoltGrid Smart EV</div>
                          <div className="text-[9px] text-slate-400 truncate">BESS Microgrid</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDomain('biopharma');
                          setProjectTitle('Bio-Pharma FDA 21 CFR Part 11 PV Platform');
                          setProjectScopePrompt('Automated pharmacovigilance adverse event triage with Gemini 2.5 flash reasoning, GxP audit ledgers, and human-in-the-loop safety board review.');
                        }}
                        className={`p-2 rounded-xl border text-left transition-all hover:border-teal-400 flex items-center gap-2 cursor-pointer group ${
                          isLight ? 'bg-slate-50 hover:bg-teal-50 border-slate-200' : 'bg-slate-900 hover:bg-teal-950/30 border-slate-800'
                        }`}
                      >
                        <span className="text-sm">🧬</span>
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 truncate">Bio-Pharma GxP</div>
                          <div className="text-[9px] text-slate-400 truncate">FDA 21 CFR Part 11</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDomain('fintech');
                          setProjectTitle('Autonomous Payments & Real-Time Fraud Hub');
                          setProjectScopePrompt('Real-time payment transaction monitoring, Flink stream clustering, ISO 20022 messaging, and automated SAR filing.');
                        }}
                        className={`p-2 rounded-xl border text-left transition-all hover:border-teal-400 flex items-center gap-2 cursor-pointer group ${
                          isLight ? 'bg-slate-50 hover:bg-teal-50 border-slate-200' : 'bg-slate-900 hover:bg-teal-950/30 border-slate-800'
                        }`}
                      >
                        <span className="text-sm">💳</span>
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 truncate">FinTech Fraud Hub</div>
                          <div className="text-[9px] text-slate-400 truncate">ISO 20022 &amp; Spanner</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2: Diagram Slots / Multi-Chapter Pipeline */}
                {studioMode === 'diagrams' && (
                  <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                    isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-xl'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 block">
                          Step 2 &bull; Multi-Tier Suite
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Diagram Slots ({diagramSlotsList.length} Tier{diagramSlotsList.length > 1 ? 's' : ''})
                        </h3>
                      </div>

                      {/* Slot Count Selector */}
                      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        {[
                          { count: 1, label: 'Single (1)' },
                          { count: 2, label: 'Dual (2)' },
                          { count: 3, label: '3-Tier' },
                          { count: 4, label: '4-Tier' },
                        ].map((comp) => (
                          <button
                            key={comp.count}
                            type="button"
                            onClick={() => handleSetDiagramSlotsCount(comp.count)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              diagramSlotsCount === comp.count
                                ? 'bg-teal-600 text-white shadow-sm font-black'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {comp.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slots Grid */}
                    <div className="space-y-3">
                      {diagramSlotsList.map((slot, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-3.5 rounded-2xl border space-y-2 ${
                            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-teal-600 text-white font-black text-[10px] flex items-center justify-center">
                                #{sIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={slot.title}
                                onChange={(e) => {
                                  const newTitle = e.target.value;
                                  setDiagramSlotsList((prev) =>
                                    prev.map((s, i) => (i === sIdx ? { ...s, title: newTitle } : s))
                                  );
                                }}
                                className="text-xs font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-teal-500 focus:outline-none"
                              />
                            </div>
                            <span className="text-[10px] font-bold text-teal-600">Slot #{sIdx + 1}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">Blueprint:</span>
                            <select
                              value={slot.templateId}
                              onChange={(e) => {
                                const newTpl = e.target.value;
                                setDiagramSlotsList((prev) =>
                                  prev.map((s, i) => (i === sIdx ? { ...s, templateId: newTpl } : s))
                                );
                              }}
                              className={`w-full text-xs font-semibold p-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                                isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                              }`}
                            >
                              {CANONICAL_TEMPLATES.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.id} - {t.name} ({t.family})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Multi-Blueprint Architecture Pipeline (Both Mode) */}
                {studioMode === 'both' && (
                  <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                    isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-xl'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 block">
                          Step 2 &bull; Multi-Chapter Blueprint Pipeline
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Attached Chapters ({activeMeta.blueprintPack.length} Slots)
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-sky-600">
                        {activeMeta.shortName} Spec
                      </span>
                    </div>

                    <div className="space-y-3 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-sky-400 before:via-indigo-500 before:to-purple-500">
                      {activeMeta.blueprintPack.map((slot, sIdx) => {
                        const currentTplId = slotCustomizations[sIdx + 1]?.templateId || slot.recommendedTemplateId;

                        return (
                          <div
                            key={sIdx}
                            className={`p-3.5 rounded-2xl border space-y-2 relative ml-3 ${
                              isLight ? 'bg-slate-50 border-slate-200 hover:border-sky-300' : 'bg-slate-900 border-slate-800 hover:border-sky-600'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                                  Ch.{slot.chapterNumber}
                                </span>
                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                  {slot.slotTitle}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-sky-600">Slot #{sIdx + 1}</span>
                            </div>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-8">
                              {slot.description}
                            </p>

                            <div className="flex items-center gap-2 pl-8">
                              <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">Assigned:</span>
                              <select
                                value={currentTplId}
                                onChange={(e) => handleSwapSlotTemplate(sIdx, e.target.value)}
                                className={`w-full text-xs font-semibold p-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                                  isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                                }`}
                              >
                                {CANONICAL_TEMPLATES.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.id} - {t.name} ({t.family})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN (6 COLS): LIVE 16:9 INTERACTIVE PREVIEW & SPEC VIEWER */}
              <div className="lg:col-span-6 sticky top-20 space-y-4">
                <div className={`rounded-3xl border shadow-xl overflow-hidden ${
                  isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-2xl'
                }`}>
                  {/* Viewport Window Bar */}
                  <div className={`px-5 py-3.5 border-b flex items-center justify-between ${
                    isLight ? 'bg-slate-50/80 border-slate-100' : 'bg-slate-900 border-slate-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 ml-2 font-mono truncate">
                        {studioMode === 'diagrams' && `Live GCP Vector Preview • Blueprint #${selectedDiagramTemplateId || '01'}`}
                        {studioMode === 'documents' && `Live Spec Preview • ${activeMeta.shortName}`}
                        {studioMode === 'both' && `Live Multi-Blueprint Spec • ${activeMeta.shortName} (#${currentPreviewTemplateId})`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800">
                        16:9 GCP
                      </span>
                      <Link
                        href={`/canonical/${currentPreviewTemplateId}?domain=${selectedDomain}&title=${encodeURIComponent(projectTitle)}`}
                        className="text-[10px] font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                        title="Open in Canonical Blueprint Viewer"
                      >
                        <span>Canonical #{currentPreviewTemplateId}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Interactive Live Diagram Viewport */}
                  <div className="p-3 bg-white dark:bg-[#070A13] flex items-center justify-center min-h-[480px] h-[520px] max-h-[580px] overflow-hidden">
                    {studioMode === 'diagrams' ? (
                      <div className="w-full h-full flex items-center justify-center aspect-[16/9] min-h-[460px]">
                        <DiagramViewerRenderSafe
                          diagramId={selectedDiagramTemplateId}
                          diagramType={`canonical_${selectedDiagramTemplateId || '01'}`}
                          xml={liveStudioDiagramXml}
                          aspectRatioId="16:9"
                          bgTheme={isLight ? 'light' : 'dark'}
                        />
                      </div>
                    ) : studioMode === 'both' ? (
                      <div className="w-full p-5 text-left space-y-4 max-h-[540px] overflow-y-auto">
                        <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider">{activeMeta.name}</span>
                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              ARB Sign-Off Ready &bull; {activeMeta.sectionsCount} Sections
                            </span>
                          </div>
                          <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">{projectTitle || activeMeta.name}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                            <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-bold border border-sky-200 dark:bg-sky-950 dark:text-sky-400 dark:border-sky-800">
                              Audience: {activeMeta.audience}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold border border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800">
                              {activeMeta.blueprintPack.length} Attached Blueprints
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                          {/* Chapter 1 */}
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Ch. 1 &bull; Executive Mandate &amp; {activeMeta.shortName} Scope</h4>
                            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                              {projectScopePrompt || activeMeta.primaryPurpose}
                            </p>
                          </div>

                          {/* Chapter Blueprint Interactive Tabs */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="font-bold text-slate-900 dark:text-white">
                                Attached Architecture Blueprint Pack ({activeMeta.blueprintPack.length} Chapters):
                              </h4>
                              <span className="text-[10px] text-teal-600 font-mono font-bold">16:9 Vector Live</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                              {activeMeta.blueprintPack.map((slot, sIdx) => {
                                const isSelected = activePreviewChapterIndex === sIdx;
                                const slotTplId = slotCustomizations[sIdx + 1]?.templateId || slot.recommendedTemplateId;
                                return (
                                  <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => setActivePreviewChapterIndex(sIdx)}
                                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                      isSelected
                                        ? 'bg-sky-600 text-white shadow-xs'
                                        : isLight
                                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                                    }`}
                                  >
                                    <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-black/10">Ch.{slot.chapterNumber}</span>
                                    <span className="truncate max-w-[130px]">{slot.slotTitle}</span>
                                    <span className="text-[9px] font-mono opacity-80">#{slotTplId}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Selected Chapter Viewport */}
                            {(() => {
                              const activeSlot = activeMeta.blueprintPack[activePreviewChapterIndex] || activeMeta.blueprintPack[0];
                              const slotTplId = slotCustomizations[activePreviewChapterIndex + 1]?.templateId || activeSlot?.recommendedTemplateId || '01';
                              const chapterTpl = CANONICAL_TEMPLATES.find((t) => t.id === slotTplId) || CANONICAL_TEMPLATES[0];
                              const chapterXml = chapterTpl.generateXml(selectedDomain, isLight ? 'light' : 'dark');
                              const flavoredChapterXml = injectDomainFlavorXml(chapterXml, selectedDomain);
                              return (
                                <div className="space-y-2">
                                  <div className="p-2.5 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-[11px] text-sky-900 dark:text-sky-300 flex items-center justify-between">
                                    <div className="truncate pr-2">
                                      <span className="font-bold">Ch. {activeSlot.chapterNumber} &bull; {activeSlot.slotTitle}:</span>{' '}
                                      <span className="text-slate-500 dark:text-slate-400">{activeSlot.description}</span>
                                    </div>
                                    <Link
                                      href={`/canonical/${chapterTpl.id}?domain=${selectedDomain}&title=${encodeURIComponent(projectTitle || chapterTpl.name)}`}
                                      target="_blank"
                                      className="px-2 py-0.5 rounded-md bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 font-mono font-bold text-[10px] flex items-center gap-1 shrink-0 cursor-pointer"
                                      title="Open standalone Canonical Blueprint in new tab"
                                    >
                                      <span>#{chapterTpl.id} [↗]</span>
                                    </Link>
                                  </div>
                                  <div className="w-full h-[360px] md:h-[420px] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950 flex items-center justify-center p-1">
                                    <DiagramViewerRenderSafe
                                      diagramId={chapterTpl.id}
                                      diagramType={`canonical_${chapterTpl.id}`}
                                      xml={flavoredChapterXml}
                                      aspectRatioId="16:9"
                                      bgTheme={isLight ? 'light' : 'dark'}
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Dynamic Chapter Component & SLA Demarcation Matrix */}
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-between">
                              <span>Ch. 3 &bull; Component Demarcation &amp; SLA Matrix</span>
                              <span className="text-[10px] font-mono text-slate-400">{activeMeta.shortName} Governance</span>
                            </h4>
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10.5px]">
                              {activeMeta.id === 'stride' ? (
                                <div className="space-y-1 font-mono text-[10px]">
                                  <div className="flex justify-between border-b pb-1 text-slate-400 font-bold">
                                    <span>THREAT VECTOR</span>
                                    <span>MITIGATION ARCHITECTURE</span>
                                    <span>STATUS / SLA</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Spoofing &amp; Ingress Hijack</span>
                                    <span>BeyondCorp mTLS &amp; Zero-Trust</span>
                                    <span className="text-emerald-600 font-bold">SOC 2 Type II</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Data Tampering &amp; In-Flight</span>
                                    <span>Cloud Armor WAF &amp; Schema Guard</span>
                                    <span className="text-emerald-600 font-bold">PCI-DSS 4.0</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Information Disclosure</span>
                                    <span>Cloud KMS Envelope Encryption</span>
                                    <span className="text-emerald-600 font-bold">FIPS 140-3</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Denial of Service (DoS)</span>
                                    <span>Autopilot HPA &amp; Edge Rate Limits</span>
                                    <span className="text-emerald-600 font-bold">99.99% Up</span>
                                  </div>
                                </div>
                              ) : activeMeta.id === 'vendor_rfp' ? (
                                <div className="space-y-1 font-mono text-[10px]">
                                  <div className="flex justify-between border-b pb-1 text-slate-400 font-bold">
                                    <span>RFP EVALUATION PILLAR</span>
                                    <span>WEIGHT</span>
                                    <span>TARGET REQUIREMENT &amp; SCORE</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Architectural Parity &amp; APIs</span>
                                    <span>35%</span>
                                    <span className="text-sky-600 font-bold">9.4/10.0 (Native GCP)</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Security &amp; ISO Certifications</span>
                                    <span>25%</span>
                                    <span className="text-emerald-600 font-bold">100% (FedRAMP High)</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Disaster Recovery &amp; Multi-Region</span>
                                    <span>20%</span>
                                    <span className="text-teal-600 font-bold">RTO &lt; 5m, RPO &lt; 1m</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Unit Economics &amp; 3-Yr TCO</span>
                                    <span>20%</span>
                                    <span className="text-indigo-600 font-bold">42% Projected Savings</span>
                                  </div>
                                </div>
                              ) : activeMeta.id === 'tdd' ? (
                                <div className="space-y-1 font-mono text-[10px]">
                                  <div className="flex justify-between border-b pb-1 text-slate-400 font-bold">
                                    <span>SUBSYSTEM COMPONENT</span>
                                    <span>PROTOCOL / CONTRACT</span>
                                    <span>TIMEOUT / P99 SLA</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Ingress Edge Proxy</span>
                                    <span>HTTP/3 &amp; gRPC Ingress</span>
                                    <span className="text-sky-600 font-bold">&lt; 15ms P99</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Core Domain Orchestrator</span>
                                    <span>Protobuf RPC &amp; Circuit Breaker</span>
                                    <span className="text-sky-600 font-bold">&lt; 45ms P99</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>State Ledger (Spanner)</span>
                                    <span>Multi-Region Strong Consistency</span>
                                    <span className="text-emerald-600 font-bold">99.999% SLA</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Event Stream Bus (Pub/Sub)</span>
                                    <span>Exactly-Once Event Routing</span>
                                    <span className="text-teal-600 font-bold">100k msg/sec</span>
                                  </div>
                                </div>
                              ) : activeMeta.id === 'cloud_migration' ? (
                                <div className="space-y-1 font-mono text-[10px]">
                                  <div className="flex justify-between border-b pb-1 text-slate-400 font-bold">
                                    <span>MIGRATION WAVE</span>
                                    <span>SOURCE WORKLOAD</span>
                                    <span>TARGET GCP DESTINATION</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Wave 1: Edge &amp; Ingress</span>
                                    <span>F5 BIG-IP / On-Prem WAF</span>
                                    <span className="text-teal-600 font-bold">Cloud Armor + Cloud CDN</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Wave 2: Microservices</span>
                                    <span>Legacy WebSphere / VMs</span>
                                    <span className="text-sky-600 font-bold">GKE Autopilot / Cloud Run</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Wave 3: Relational DBs</span>
                                    <span>Oracle Exadata / SQL Server</span>
                                    <span className="text-indigo-600 font-bold">Cloud Spanner / Cloud SQL</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Wave 4: Lakehouse &amp; CDC</span>
                                    <span>Hadoop / Teradata Warehouse</span>
                                    <span className="text-purple-600 font-bold">BigQuery + Dataproc</span>
                                  </div>
                                </div>
                              ) : activeMeta.id === 'ai_system_card' ? (
                                <div className="space-y-1 font-mono text-[10px]">
                                  <div className="flex justify-between border-b pb-1 text-slate-400 font-bold">
                                    <span>AI PIPELINE STAGE</span>
                                    <span>MODEL / FOUNDATION TIER</span>
                                    <span>SAFETY GUARDRAIL &amp; SLA</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Ingestion &amp; Chunking</span>
                                    <span>Document AI Optical Parser</span>
                                    <span className="text-emerald-600 font-bold">100% PII Redacted</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Vector Indexing</span>
                                    <span>Vertex text-embedding-004</span>
                                    <span className="text-sky-600 font-bold">768-dim &lt; 20ms</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Vector RAG Retrieval</span>
                                    <span>Vertex Vector Search (HNSW)</span>
                                    <span className="text-teal-600 font-bold">&lt; 15ms ANN Query</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Inference &amp; Grounding</span>
                                    <span>Gemini 2.5 Flash / Pro</span>
                                    <span className="text-purple-600 font-bold">Toxicity &lt; 0.01</span>
                                  </div>
                                </div>
                              ) : activeMeta.id === 'cloud_finops' ? (
                                <div className="space-y-1 font-mono text-[10px]">
                                  <div className="flex justify-between border-b pb-1 text-slate-400 font-bold">
                                    <span>RESOURCE ALLOCATION</span>
                                    <span>UNIT COST DRIVER</span>
                                    <span>OPTIMIZATION LEVER</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>GKE Autopilot Clusters</span>
                                    <span>vCPU / GiB Allocated-Hour</span>
                                    <span className="text-emerald-600 font-bold">CUDs &amp; Spot VM Pools</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Cloud Spanner Database</span>
                                    <span>Provisioned Compute Units</span>
                                    <span className="text-sky-600 font-bold">Auto-Scale Min/Max Nodes</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>BigQuery Analytics</span>
                                    <span>TB Scanned / On-Demand</span>
                                    <span className="text-teal-600 font-bold">Slot Reservations &amp; Partitioning</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Ingress / Egress Network</span>
                                    <span>Cross-Region Transfer GiB</span>
                                    <span className="text-indigo-600 font-bold">Cloud CDN Cache Shield</span>
                                  </div>
                                </div>
                              ) : activeMeta.id === 'grc' ? (
                                <div className="space-y-1 font-mono text-[10px]">
                                  <div className="flex justify-between border-b pb-1 text-slate-400 font-bold">
                                    <span>COMPLIANCE STANDARD</span>
                                    <span>CONTROL ID</span>
                                    <span>AUTOMATED VERIFICATION GATE</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>HIPAA &amp; HITECH</span>
                                    <span>§ 164.312 Technical Safeguards</span>
                                    <span className="text-emerald-600 font-bold">Continuous VPC SC Perimeter</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>SOC 2 Type II</span>
                                    <span>CC6.1 Logical Access Controls</span>
                                    <span className="text-sky-600 font-bold">Cloud IAM Least-Privilege</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>FDA 21 CFR Part 11</span>
                                    <span>11.10(e) Audit Trail Ledger</span>
                                    <span className="text-teal-600 font-bold">Immutable Cloud Audit Logs</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>ISO 27001:2022</span>
                                    <span>A.12.1.2 Change Management</span>
                                    <span className="text-purple-600 font-bold">Binary Authorization Sign-Off</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-1 font-mono text-[10px]">
                                  <div className="flex justify-between border-b pb-1 text-slate-400 font-bold">
                                    <span>COMPONENT</span>
                                    <span>TIER / SERVICE</span>
                                    <span>SLA / COMPLIANCE</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Ingress Perimeter</span>
                                    <span>Cloud Armor WAF &amp; CDN</span>
                                    <span className="text-emerald-600 font-bold">99.99% Availability</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Compute Engine</span>
                                    <span>GKE Autopilot / Cloud Run</span>
                                    <span className="text-sky-600 font-bold">&lt; 50ms P99 Latency</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Data Storage Tier</span>
                                    <span>Cloud Spanner Multi-Region</span>
                                    <span className="text-teal-600 font-bold">99.999% Durability</span>
                                  </div>
                                  <div className="flex justify-between py-1 text-slate-700 dark:text-slate-300">
                                    <span>Observability &amp; Audit</span>
                                    <span>Cloud Monitoring &amp; SIEM</span>
                                    <span className="text-purple-600 font-bold">Immutable Audit Logs</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full p-6 text-left space-y-4 max-h-[540px] overflow-y-auto">
                        <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
                          <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">{activeMeta.name}</div>
                          <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">{projectTitle || activeMeta.name}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                            <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-bold border border-sky-200 dark:bg-sky-950 dark:text-sky-400 dark:border-sky-800">
                              Audience: {activeMeta.audience}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
                              {activeMeta.sectionsCount} Target Sections
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          <div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-1">1. Strategic Mandate &amp; Executive Objectives</h4>
                            <p className="text-slate-500 dark:text-slate-400">{projectScopePrompt || activeMeta.primaryPurpose}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-1">2. Architecture Demarcation &amp; Service Boundaries</h4>
                            <p className="text-slate-500 dark:text-slate-400">
                              Encapsulates {activeMeta.blueprintPack.length} attached architectural chapters ({activeMeta.blueprintPack.map(b => b.slotTitle).join(', ')}).
                            </p>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-1">3. Non-Functional Requirements &amp; SLA Compliance</h4>
                            <p className="text-slate-500 dark:text-slate-400">RTO &lt; 5 minutes, RPO &lt; 1 minute, active-active multi-region failover, 99.999% data durability.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Viewport Footer Bar */}
                  <div className={`px-5 py-3 border-t flex items-center justify-between text-[11px] text-slate-500 font-medium ${
                    isLight ? 'bg-slate-50/50 border-slate-100' : 'bg-slate-900/50 border-slate-800'
                  }`}>
                    <span className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                      100% Collision-Free Google Cloud Architecture
                    </span>
                    <span>Aspect Ratio: 16:9 (1600x960)</span>
                  </div>
                </div>

                {/* Floating Sticky Action Synthesizer Dock */}
                <div className={`p-4 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
                }`}>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-800 dark:text-white">Ready to synthesize:</span> {
                      studioMode === 'diagrams'
                        ? `${diagramSlotsList.length} 16:9 Architecture Diagram(s)`
                        : studioMode === 'documents'
                        ? `${activeMeta.shortName} Specification`
                        : `${activeMeta.shortName} Document + ${activeMeta.blueprintPack.length} Diagrams`
                    }
                  </div>

                  <button
                    onClick={handleStartGeneration}
                    disabled={isGenerating}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-black bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50 cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>
                          {generationStep === 1 && (studioMode === 'diagrams' ? 'Synthesizing Diagrams...' : 'Extracting AST Graphs...')}
                          {generationStep === 2 && (studioMode === 'diagrams' ? 'Applying 16:9 Flavoring...' : 'Mapping Component Inventories...')}
                          {generationStep === 3 && 'Synthesizing Specification...'}
                          {generationStep === 4 && 'Rendering Word & Print Engine...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>
                          {studioMode === 'diagrams' && `Synthesize ${diagramSlotsList.length} Architecture Diagram(s) Now`}
                          {studioMode === 'documents' && `Synthesize ${activeMeta.shortName} Document Now`}
                          {studioMode === 'both' && `Generate ${activeMeta.shortName} Document & Diagrams Now`}
                        </span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

            {/* VIEW A: DEDICATED ARCHITECTURE DIAGRAM STUDIO (Diagrams Only Mode) */}
            {generatedDocContent && studioMode === 'diagrams' && (
              <div className={`p-6 md:p-10 rounded-3xl border shadow-2xl space-y-6 ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
              }`}>
                {/* Header & Action Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-500 border border-teal-500/20 flex items-center justify-center">
                      <Network className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                          {projectTitle} &bull; Architecture Diagram Studio
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-500/10 text-teal-500 border border-teal-500/20">
                          16:9 Widescreen &bull; Preflight Passed
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/30">
                          <Tag className="w-2.5 h-2.5" />
                          ID: {projectId || 'proj_diagram'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Synthesized {diagramSlotsList.length} architectural diagram{diagramSlotsList.length > 1 ? 's' : ''} with domain flavoring and 100% collision-free geometry.
                      </p>
                    </div>
                  </div>

                  {/* Standalone Diagram Action Toolbar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/canonical/${(diagramSlotsList[activeDiagramSlotIndex]?.templateId || selectedDiagramTemplateId || '01')}?domain=${selectedDomain}&title=${encodeURIComponent(projectTitle)}`}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-accent text-bg-dark hover:brightness-110 transition shadow-sm font-extrabold cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Open in Canonical Blueprints</span>
                    </Link>
                    <button
                      onClick={() => setIsSlideDeckOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 transition cursor-pointer"
                    >
                      <Presentation className="w-3.5 h-3.5" />
                      <span>Slide Deck (16:9)</span>
                    </button>
                    <button
                      onClick={() => setIsTerraformOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 transition cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Terraform IaC</span>
                    </button>
                    <button
                      onClick={handleCopyProjectShareLink}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                    >
                      {projectShareCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{projectShareCopied ? 'Link Copied!' : 'Share Diagram'}</span>
                    </button>
                  </div>
                </div>

                {/* Diagram Slot Switcher Tabs */}
                {diagramSlotsList.length > 1 && (
                  <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    {diagramSlotsList.map((slot, sIdx) => {
                      const isSlotActive = activeDiagramSlotIndex === sIdx;
                      const tpl = CANONICAL_TEMPLATES.find((t) => t.id === slot.templateId) || CANONICAL_TEMPLATES[0];

                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setActiveDiagramSlotIndex(sIdx)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSlotActive
                              ? 'bg-teal-600 text-white shadow-md'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-md bg-white/20 text-white flex items-center justify-center text-[10px] font-black">
                            #{sIdx + 1}
                          </span>
                          <span>{slot.title}</span>
                          <span className="text-[9.5px] font-mono opacity-80">({tpl.id})</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Active Diagram Inline Figure Rendering */}
                <div className="pt-2">
                  <InlineDiagramFigure
                    templateId={diagramSlotsList[activeDiagramSlotIndex]?.templateId || selectedDiagramTemplateId || '01'}
                    figureTitle={diagramSlotsList[activeDiagramSlotIndex]?.title || 'Architecture System Topology'}
                    isLight={isLight}
                    selectedDomain={selectedDomain}
                    projectTitle={projectTitle}
                    projectScopePrompt={projectScopePrompt}
                    codeLines={[]}
                    parsedNodes={[]}
                    parsedFlows={[]}
                  />
                </div>
              </div>
            )}

            {/* VIEW B & C: GENERATED DOCUMENT EXECUTIVE PUBLICATION STUDIO (Documents Only & Both Modes) */}
            {generatedDocContent && studioMode !== 'diagrams' && (
              <div className={`p-6 md:p-10 rounded-3xl border shadow-2xl space-y-6 print-container ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
              }`}>
                {/* Publication Toolbar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 no-print">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                          {projectTitle} &bull; {activeMeta.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          Production-Ready
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/30">
                          <Tag className="w-2.5 h-2.5" />
                          ID: {projectId || 'proj_active'}
                        </span>
                        <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/10 text-sky-500 border border-sky-500/20">
                          <Lock className="w-2.5 h-2.5" />
                          Project Copy (Decoupled)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Generated specification with multi-blueprint diagram figures, component matrices, and ARB review gates.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: Project Link, Change Report, Word, PDF/Print, Markdown, Raw/Formatted Toggle */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Live Version Tag & Ring Buffer Counter */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs font-mono font-bold text-sky-400">
                      <span>DOC:</span>
                      <span className="text-white px-1.5 py-0.2 rounded bg-sky-600">{docVersion}</span>
                      <span className="text-[10px] text-slate-400 font-sans border-l pl-1.5 border-slate-700">
                        {versionHistory.length}/10 Snapshots
                      </span>
                    </div>

                    {/* Share Unique Project Link */}
                    <button
                      onClick={handleCopyProjectShareLink}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                      title="Copy permanent shareable link with unique Project ID and parameters"
                    >
                      {projectShareCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copy Project Link</span>
                        </>
                      )}
                    </button>

                    {/* Slide Deck (16:9) Modal Trigger */}
                    <button
                      onClick={() => setIsSlideDeckOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                      title="Open interactive 16:9 executive presentation slide deck & export to PowerPoint (.pptx)"
                    >
                      <Presentation className="w-3.5 h-3.5 text-amber-500" />
                      <span>Slide Deck (16:9)</span>
                    </button>

                    {/* Terraform IaC Generator Trigger */}
                    <button
                      onClick={() => setIsTerraformOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                      title="Generate and inspect deployable HashiCorp Terraform modules and simulate terraform plan"
                    >
                      <Terminal className="w-3.5 h-3.5 text-purple-500" />
                      <span>Terraform IaC</span>
                    </button>

                    {/* Jira & Confluence Toolchain Sync Trigger */}
                    <button
                      onClick={() => setIsEnterpriseSyncOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-sky-500/10 hover:from-sky-500/20 hover:to-cyan-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                      title="Export Epics/Stories to Jira, Confluence Space, and GitHub PRD templates"
                    >
                      <Send className="w-3.5 h-3.5 text-sky-500" />
                      <span>Jira &amp; Confluence Sync</span>
                    </button>

                    {/* Change Report Modal Trigger */}
                    <button
                      onClick={() => setIsChangeReportOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-sky-500/10 hover:from-sky-500/20 hover:to-indigo-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                      title="View element-by-element changes made to the blueprint copies for this project"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-sky-500" />
                      <span>Blueprint Change Report</span>
                    </button>

                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
                      <button
                        onClick={() => setViewMode('formatted')}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${
                          viewMode === 'formatted'
                            ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Formatted Executive
                      </button>
                      <button
                        onClick={() => setViewMode('raw')}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${
                          viewMode === 'raw'
                            ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Raw Markdown
                      </button>
                    </div>

                    {/* Print / PDF */}
                    <button
                      onClick={handlePrintToPdf}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                      title="Print or Save as PDF"
                    >
                      <Printer className="w-3.5 h-3.5 text-sky-500" />
                      <span>Print / PDF</span>
                    </button>

                    {/* Download Word DOCX */}
                    <button
                      onClick={handleDownloadDocx}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm transition-all"
                      title="Download Microsoft Word .docx"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .docx</span>
                    </button>

                    {/* Copy Markdown */}
                    <button
                      onClick={handleCopyMarkdown}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSuccess ? 'Copied!' : 'Copy .md'}</span>
                    </button>

                    {/* Download Markdown */}
                    <button
                      onClick={handleDownloadMarkdown}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .md</span>
                    </button>
                  </div>
                </div>

                {/* REAL-TIME COLLABORATIVE PRESENCE BAR */}
                <CollaborativeTeamPresence projectId={projectId} isLight={isLight} />

                {/* Rendered Document Body */}
                <div className="pt-2">
                  {viewMode === 'formatted' ? (
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-2">
                      {renderExecutiveDocument(generatedDocContent)}
                    </div>
                  ) : (
                    <pre className={`p-6 rounded-2xl border font-mono text-xs overflow-x-auto leading-relaxed ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}>
                      {generatedDocContent}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FLOATING AI COPILOT CHATBOT & 10-VERSION HISTORY DRAWER */}
        {generatedDocContent && (
          <DocGenFloatingCopilot
            projectId={projectId || 'default'}
            projectTitle={projectTitle}
            selectedDomain={selectedDomain}
            archetypeId={selectedArchetypeId}
            isLight={isLight}
            docMarkdown={generatedDocContent}
            docVersion={docVersion}
            diagramSlots={
              versionHistory[0]?.diagramSlots ||
              activeMeta.blueprintPack.reduce((acc, slot, idx) => {
                acc[idx + 1] = {
                  templateId: slotCustomizations[idx + 1]?.templateId || slot.recommendedTemplateId,
                  xml: '',
                  version: 'v1.0',
                  customizationPrompt: slotCustomizations[idx + 1]?.customPrompt,
                };
                return acc;
              }, {} as Record<number, DiagramSlotVersionData>)
            }
            versionHistory={versionHistory}
            chatHistory={chatHistory}
            onApplyDocUpdate={handleApplyDocUpdate}
            onApplyDiagramUpdate={handleApplyDiagramUpdate}
            onRestoreSnapshot={handleRestoreSnapshot}
            onAddChatMessage={handleAddChatMessage}
          />
        )}
      </main>

      {/* FULL-FEATURED MASTER SPECIFICATION PREVIEW MODAL */}
      {previewModalDoc && (
        <div
          onClick={() => setPreviewModalDoc(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-[1400px] h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden cursor-default ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0F172A] border-slate-800'
            }`}
          >
            {/* Modal Header with Navigation Tabs & Action Buttons */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-sky-500 text-white font-black text-sm flex items-center justify-center shadow-sm shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
                      {previewModalDoc.name} <span className="text-sky-600 dark:text-sky-400 font-extrabold">({previewModalDoc.shortName})</span> &bull; Master Specification Preview
                    </h3>
                    <span className="hidden sm:inline-flex text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      GxP Validated
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{previewModalDoc.audience}</p>
                </div>
              </div>

              {/* Center Modal Tabs */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
                <button
                  onClick={() => setModalTab('doc')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    modalTab === 'doc'
                      ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Full Master Specification</span>
                </button>

                <button
                  onClick={() => setModalTab('blueprints')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    modalTab === 'blueprints'
                      ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Multi-Blueprint Pack ({previewModalDoc.blueprintPack.length})</span>
                </button>

                <button
                  onClick={() => setModalTab('hierarchy')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    modalTab === 'hierarchy'
                      ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-teal-400" />
                  <span>Section Hierarchy</span>
                </button>
              </div>

              {/* Action Buttons: Word, Copy, Share, Full Page, Use */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/docgen/${previewModalDoc.id}`}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                  title="Open dedicated full page"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Full Page</span>
                </Link>

                <button
                  onClick={() => handleCopyShareLink(previewModalDoc.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                  title="Copy direct shareable link"
                >
                  {shareCopiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-sky-500" />}
                  <span className="hidden md:inline">{shareCopiedSuccess ? 'Copied Link!' : 'Share'}</span>
                </button>

                <button
                  onClick={() => handleDownloadSampleDocx(previewModalDoc.id, previewModalDoc.name)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
                  title="Download Microsoft Word .docx"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download .docx</span>
                </button>

                <button
                  onClick={() => handleCopySampleMarkdown(MASTER_DOCUMENTS[previewModalDoc.id] || '')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  {sampleCopiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{sampleCopiedSuccess ? 'Copied!' : 'Copy .md'}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedArchetypeId(previewModalDoc.id);
                    setStudioMode('both');
                    setPreviewModalDoc(null);
                    setActiveTab('studio');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Customize &amp; Generate</span>
                  <span className="sm:hidden">Build</span>
                </button>

                <button
                  onClick={() => handleClosePreview()}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6">
              {/* TAB A: FULL MASTER DOCUMENT RENDERING */}
              {modalTab === 'doc' && (
                <div className="max-w-5xl mx-auto space-y-4">
                  <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-semibold">
                      <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>This is the complete, certified {previewModalDoc.name} master architecture specification. You can read, print, or download this template directly as .docx.</span>
                    </div>
                  </div>

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    {renderExecutiveDocument(MASTER_DOCUMENTS[previewModalDoc.id] || generateProductionFallbackDoc(previewModalDoc, previewModalDoc.name, 'Bio-Pharma Precision Oncology & Regulatory AI', previewModalDoc.primaryPurpose), false)}
                  </div>
                </div>
              )}

              {/* TAB B: MULTI-BLUEPRINT PACK ARCHITECTURE */}
              {modalTab === 'blueprints' && (
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Attached Blueprint Architecture Pack ({previewModalDoc.blueprintPack.length} Diagrams)
                    </h4>
                    <p className="text-xs text-slate-400">
                      The {previewModalDoc.name} composes the following architectural blueprints across its chapters:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previewModalDoc.blueprintPack.map((slot, sIdx) => {
                      const tpl = CANONICAL_TEMPLATES.find((t) => t.id === slot.recommendedTemplateId);
                      return (
                        <div
                          key={sIdx}
                          className="p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 font-black text-xs flex items-center justify-center border border-sky-500/20">
                                {slot.recommendedTemplateId}
                              </span>
                              <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase">Chapter {slot.chapterNumber}</span>
                                <h5 className="text-xs font-bold text-slate-900 dark:text-white">{slot.slotTitle}</h5>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                              Canonical Master
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {slot.description}
                          </p>

                          {tpl?.previewImage && (
                            <div className="relative w-full h-32 rounded-xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                              <img
                                src={tpl.previewImage}
                                alt={tpl.name}
                                className="w-full h-full object-contain p-2"
                                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB C: SECTION HIERARCHY */}
              {modalTab === 'hierarchy' && (
                <div className="max-w-5xl mx-auto space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Chapter &amp; Section Hierarchy ({previewModalDoc.sectionsCount} Sections)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Standard section breakdown showing AST mapping provenance:
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    {ARCHETYPE_REGISTRY[previewModalDoc.id]?.sections.map((sec, secIdx) => (
                      <div
                        key={secIdx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sky-500 font-bold w-6">{secIdx + 1}.</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{sec.title}</span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          sec.provenance === 'derived'
                            ? 'bg-sky-500/10 text-sky-500 border-sky-500/20'
                            : sec.provenance === 'inferred'
                            ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        }`}>
                          {sec.provenance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Blueprint Change Report Modal */}
      <BlueprintChangeReportModal
        isOpen={isChangeReportOpen}
        onClose={() => setIsChangeReportOpen(false)}
        selectedDomain={selectedDomain}
        projectTitle={projectTitle}
        docTypeName={DOC_ARCHETYPES_META.find((m) => m.id === selectedArchetypeId)?.name || 'Architecture Specification'}
      />

      {/* 16:9 Executive Slide Deck Presenter Modal */}
      <SlideDeckPresenterModal
        isOpen={isSlideDeckOpen}
        onClose={() => setIsSlideDeckOpen(false)}
        projectTitle={projectTitle}
        projectScope={projectScopePrompt}
        domain={selectedDomain}
        docArchetype={selectedArchetypeId}
        docMarkdown={generatedDocContent || ''}
        isLight={isLight}
      />

      {/* Terraform & Kubernetes Infrastructure as Code (IaC) Modal */}
      <TerraformIaCModal
        isOpen={isTerraformOpen}
        onClose={() => setIsTerraformOpen(false)}
        projectTitle={projectTitle}
        projectScope={projectScopePrompt}
        domain={selectedDomain}
        isLight={isLight}
      />

      {/* Enterprise Toolchain Sync Modal (Jira, Confluence, GitHub, Webhook) */}
      <EnterpriseSyncModal
        isOpen={isEnterpriseSyncOpen}
        onClose={() => setIsEnterpriseSyncOpen(false)}
        projectTitle={projectTitle}
        docArchetype={selectedArchetypeId}
        docMarkdown={generatedDocContent || ''}
        isLight={isLight}
      />

      {/* Historical Projects & Document Specifications Modal */}
      <DocGenHistoryModal
        isOpen={isDocHistoryModalOpen}
        onClose={() => setIsDocHistoryModalOpen(false)}
        onSelectProject={handleSelectHistoricalProject}
        isLight={isLight}
      />
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={(updated) => {
          if (user) setUser({ ...user, ...updated });
        }}
        onLogout={async () => {
          try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            setIsProfileModalOpen(false);
          } catch {}
        }}
      />

      {/* Auth / Sign In Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          fetch('/api/auth/me')
            .then((res) => res.json())
            .then((data) => {
              if (data.authenticated && data.user) setUser(data.user);
            })
            .catch(() => {});
          setIsAuthOpen(false);
        }}
      />
    </div>
  );
}

// Synthesis Helper Function
function synthesizeCustomExecutiveDocument(
  archetypeId: ArchetypeId,
  meta: DocArchetypeMeta,
  title: string,
  domainId: string,
  scope: string,
  slotCustomizations: Record<number, { templateId: string }>
): string {
  const effectiveDomain = detectDomainFromPrompt(title, scope, domainId);
  const baseTemplate = getDomainMasterDocument(archetypeId, effectiveDomain, scope) || MASTER_DOCUMENTS[archetypeId] || '';
  if (!baseTemplate) {
    return generateProductionFallbackDoc(meta, title, effectiveDomain, scope);
  }

  const domainObj = DOMAIN_PRESETS.find((d) => d.id === effectiveDomain);
  const domainName = domainObj ? domainObj.name : effectiveDomain;
  const titleSlug = (title || 'SYSTEM').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10);

  let doc = baseTemplate;

  // Replace Title & Domain metadata
  doc = doc.replace(/^#\s+[^\n]+/m, `# ${meta.name}\n\n## ${title} — Comprehensive Specification Baseline`);
  doc = doc.replace(/\*\*Executive Sponsor:\*\*[^\n]+/g, `**Executive Sponsor:** Enterprise Executive Committee (${domainName})`);
  doc = doc.replace(/\*\*Document ID:\*\*[^\n]+/g, `**Document ID:** ${archetypeId.toUpperCase()}-${titleSlug}-2026-001`);
  doc = doc.replace(/Document ID:\s*FDD-BIOPHARM-2026-001/gi, `Document ID: ${archetypeId.toUpperCase()}-${titleSlug}-2026-001`);
  doc = doc.replace(/Document ID:\s*FDD-BIO-2026-001/gi, `Document ID: ${archetypeId.toUpperCase()}-${titleSlug}-2026-001`);
  doc = doc.replace(/Quality & Compliance Lead:\s*Sarah Chen, JD/gi, `Principal Architecture & ARB Lead: Enterprise Engineering`);
  doc = doc.replace(/Approved\s*—\s*GxP & Functional Architecture Sign-Off/gi, `Approved — Production Architecture & ARB Sign-Off`);
  doc = doc.replace(/Target Release:\s*Release 1 Controlled Production Pilot \(Q3 2026\)/gi, `Target Release: ${title} Production Pilot (Q3 2026)`);
  doc = doc.replace(/Enterprise Architecture Platform\s*—\s*Functional Specifications & Workflow Sequence/gi, `${title} — Functional Specifications & Architecture`);

  // If effectiveDomain is not biopharma, scrub biopharma phrases from FDD
  if (effectiveDomain !== 'biopharma') {
    doc = doc
      .replace(/Submit Medical Inquiry/gi, 'Ingest Telemetry / Request Event')
      .replace(/Adverse Event Screening/gi, 'Real-Time Policy & Anomaly Screening')
      .replace(/Evidence Dossier Drafting/gi, 'Autonomous Decision / Transaction Execution')
      .replace(/Dual-Custody HITL Review/gi, 'ARB & Operator Policy Verification')
      .replace(/Medical \/ Regulatory Synthesis/gi, 'Domain Business Logic & Compute')
      .replace(/Safety & PV Detector Agent/gi, 'Real-Time Fraud & Anomaly Detector')
      .replace(/FDA Label & Fair Balance/gi, 'System Governance & Policy Guardrails')
      .replace(/FDA 21 CFR Part 11/gi, 'ISO / SOC-2 Audit Immutability')
      .replace(/GxP/gi, 'Enterprise ARB')
      .replace(/Veeva Vault/gi, 'Cloud Spanner Ledger')
      .replace(/Medidata Rave/gi, 'Kafka Stream Broker')
      .replace(/IQVIA/gi, 'Data Cloud Mesh');
  }

  // If user provided a custom scope, inject it into Chapter 1 Executive Summary / Problem Statement
  if (scope && scope.trim().length > 10) {
    doc = doc.replace(
      /### 1\.1 Business Problem Statement\n[\s\S]*?(?=### 1\.2|$)/,
      `### 1.1 Business Problem Statement\n${scope.trim()}\n\n`
    );
  }

  // Update Slot Diagram Chapter References based on slotCustomizations
  meta.blueprintPack.forEach((slot, sIdx) => {
    const assignedTplId = slotCustomizations[sIdx]?.templateId || slot.recommendedTemplateId;
    const tpl = CANONICAL_TEMPLATES.find((t) => t.id === assignedTplId);
    if (tpl) {
      const pattern = new RegExp(`### 📐 Visual Diagram ${sIdx + 1}:[^\n]+`, 'g');
      doc = doc.replace(pattern, `### 📐 Visual Diagram ${sIdx + 1}: ${slot.slotTitle} (Template ${tpl.id})`);
    }
  });

  return doc;
}

// Fallback Document Generator Helper
function generateProductionFallbackDoc(meta: DocArchetypeMeta, title: string, domain: string, scope: string): string {
  return `# ${title} — ${meta.name}

> **Document Classification:** Enterprise Architecture Specification (GxP & GRC Certified)  
> **Target Audience:** ${meta.audience}  
> **Domain Context:** ${domain}  
> **Generation Engine:** PromptCanvas Multi-Blueprint Synthesis v1.0  
> **Document Status:** ARB Approved (Production Ready)  

---

## 1. Executive Summary & Transformation Scope

${scope}

### Key Transformation Metrics & KPIs
* **Latency Budget:** Sub-millisecond synchronous API mediation (< 25ms p99).
* **High Availability Target:** 99.999% uptime across active-active regional compute clusters.
* **Security Compliance:** Zero-Trust VPC Service Perimeters, CMEK cryptographic key hierarchy, and automated 21 CFR Part 11 / SEC audit trails.

---

## 2. Multi-Blueprint System Context & Architecture Decomposition

The system is decomposed into decoupled functional tiers with deterministic boundaries:

| Tier Identifier | Architectural Role | Security Classification | High Availability Strategy |
|---|---|---|---|
| **Tier 1: Edge Perimeter** | Cloud Armor, TLS 1.3 Termination, WAF | Public DMZ | Global Anycast DNS Multi-Region |
| **Tier 2: Ingress & Gateway** | Envoy Proxy, OAuth2 / OIDC Token Verification | Protected Ingress | Auto-scaling Envoy Service Mesh |
| **Tier 3: Runtime Compute** | Microservices & Reasoning Agents | Isolated VPC | Multi-Zone Kubernetes (GKE) Cluster |
| **Tier 4: Enterprise Data** | Spanner Ledger, BigQuery Analytics, Vector Store | Confidential Zone | Multi-Region Synchronous Replication |
| **Tier 5: Audit & Governance** | Immutable Audit Trail & HITL Safety Gates | Strict Compliance | WORM Storage & HSM Hardware Vault |

\`\`\`mermaid
graph TD
    Client["🌐 Enterprise Client Portal"] --> WAF["🛡️ Cloud Armor WAF & Ingress"]
    WAF --> Gateway["⚙️ API Gateway & Auth Envoy"]
    Gateway --> Orchestrator["🧠 Multi-Agent Reasoning Engine"]
    Orchestrator --> VectorDB["🗄️ Spanner & Vector Knowledge Base"]
    Orchestrator --> HITL["⚖️ Human-in-the-Loop Review Queue"]
    HITL --> Audit["🔒 Immutable Audit Ledger"]
\`\`\`

---

## 3. Core Component & Subsystem Inventory

| Subsystem Module | Technology Stack | Primary Function | Fault Tolerance / DR |
|---|---|---|---|
| **Cognitive Orchestrator** | Python / Go / FastAPI | Multi-agent reasoning and prompt compilation | Stateless Pod Auto-Scaling |
| **Knowledge Retrieval (RAG)** | Vertex AI Vector Search | Context assembly and semantic grounding | Multi-replica indexed embeddings |
| **Transaction Outbox** | Distributed Spanner | Cryptographic idempotency and saga dispatch | Two-phase commit multi-region |
| **Safety Screener Gate** | Dedicated Policy Engine | Real-time adverse event / violation detection | Redundant active-active policy pods |

---

## 4. Non-Functional Requirements & Governance Traceability

* **Recovery Point Objective (RPO):** 0 seconds (Synchronous Spanner replication).
* **Recovery Time Objective (RTO):** < 15 minutes automated active-active traffic failover.
* **Auditability:** Complete SHA-256 cryptographic chaining on all state transitions.

---

## 5. Architecture Review Board (ARB) Sign-Off Matrix

| Reviewer Role | Name & Title | Approval Status | Signature Stamp | Date |
|---|---|---|---|---|
| **Chief Architect** | Lead Enterprise Architect | ✅ APPROVED | \`SIG_ARB_98412_VERIFIED\` | 2026-08-24 |
| **Lead Security Architect** | Head of Cyber Risk | ✅ APPROVED | \`SIG_SEC_48102_VERIFIED\` | 2026-08-24 |
| **Principal Data Officer** | VP of Enterprise Data | ✅ APPROVED | \`SIG_DATA_21904_VERIFIED\` | 2026-08-24 |
`;
}

export default function DocGenPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070A13] flex items-center justify-center text-white">
          <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Loading DocGen Hub...</span>
          </div>
        </div>
      }
    >
      <DocGenContent />
    </Suspense>
  );
}
