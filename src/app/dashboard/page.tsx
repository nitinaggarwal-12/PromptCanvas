'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Sparkles,
  Layers,
  FileText,
  History,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Eye,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Clock,
  Database,
  Cpu,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  Calendar,
  X,
  Maximize2,
  GitBranch,
  Terminal,
  Presentation,
  FileCode,
  Zap,
  Activity,
  Award,
  TrendingUp,
  Shield,
  Boxes,
  Compass,
  ArrowUpRight,
  CheckCheck
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  CanonicalTemplate
} from '@/lib/canonical/canonicalTemplates';
import { DOC_ARCHETYPES_META, DocArchetypeMeta, BlueprintSlot } from '@/lib/compose/archetypes';
import { loadAllHistoricalProjects, HistoricalProjectItem } from '@/components/DocGenHistoryModal';
import { AppHeader } from '@/components/AppHeader';
import { synthesizePromptDrivenDiagramXml } from '@/lib/promptDrivenDiagramSynthesizer';
import {
  GeminiArchitecturalDecision,
  ArchitecturePerspective,
  AbstractionDetailLevel,
  FlowDirectionOption,
  getTemplatePerspective,
  getTemplateDetailLevels,
  buildStructuredFallbackDecision,
} from '@/lib/geminiArchitecturalDecisionEngine';

const DEFAULT_DASHBOARD_PROMPT =
  'Design a GCP native technical architecture with Gemini Enterprise, Google ADK, A2A, MCP, Model Armor, Vector Search 2.0, and Cloud Spanner';

// Pre-defined Flowcharts
const FLOWCHART_OPTIONS = [
  {
    id: 'user_journey',
    name: 'User Authentication & Token Flow',
    badge: 'FLOW-01',
    description: 'OAuth2.0 / mTLS BeyondCorp IAP token validation & session exchange',
    prompt: 'Generate a user authentication flowchart with Apigee X token validation, BeyondCorp mTLS, and Identity Platform SSO.',
    blueprintId: '03'
  },
  {
    id: 'data_pipeline',
    name: 'Real-Time Data Ingestion & CDC Pipeline',
    badge: 'FLOW-02',
    description: 'Eventarc triggers & Spanner CDC stream to BigQuery vector storage',
    prompt: 'Create an Eventarc CDC data ingestion pipeline flowchart from Cloud Spanner to BigQuery real-time storage.',
    blueprintId: '09'
  },
  {
    id: 'incident_resp',
    name: 'Incident Triage & Auto-Remediation',
    badge: 'FLOW-03',
    description: 'Cloud Monitoring alert routing to Vertex AI diagnostic agent & auto-fix',
    prompt: 'Design an incident triage auto-remediation flowchart using Cloud Monitoring, Vertex AI, and Cloud Functions.',
    blueprintId: '38'
  },
  {
    id: 'approval_gate',
    name: 'Multi-Stage Governance Approval Loop',
    badge: 'FLOW-04',
    description: 'Terraform CI/CD compliance gate with multi-environment promotions',
    prompt: 'Generate a governance approval workflow with policy-as-code validation and multi-environment promotions.',
    blueprintId: '20'
  }
];

// Pre-defined Infographics
const INFOGRAPHIC_OPTIONS = [
  {
    id: 'info_multi_tier',
    name: 'Multi-Tier Cloud Capability Radar',
    badge: 'INFO-01',
    description: '5-Tier compute, storage, security, and Vertex AI capability matrix',
    prompt: 'Create an enterprise cloud capability radar infographic highlighting GCP Vertex AI, Spanner, and Cloud Armor.',
    blueprintId: '52'
  },
  {
    id: 'info_zero_trust',
    name: 'Zero-Trust Enterprise Defense Infographic',
    badge: 'INFO-02',
    description: 'Perimeterless defense matrix spanning IAM, device compliance, and KMS HSM',
    prompt: 'Generate a zero-trust enterprise security infographic illustrating identity, network, and data protection boundaries.',
    blueprintId: '18'
  },
  {
    id: 'info_finops',
    name: 'FinOps Cloud Cost Optimization Taxonomy',
    badge: 'INFO-03',
    description: 'Autonomous multi-cloud cost intelligence, committed use discounts, and KPIs',
    prompt: 'Synthesize a FinOps cost optimization infographic showcasing BigQuery billing export and budget alerting.',
    blueprintId: '32'
  },
  {
    id: 'info_agent_mesh',
    name: 'Vertex AI Multi-Agent Mesh & Grounding Map',
    badge: 'INFO-04',
    description: 'Autonomous multi-agent protocol topology connecting Gemini 3.1 planners & tools',
    prompt: 'Synthesize a multi-agent AI mesh infographic with Gemini 3.1 Pro planners and vector grounding pipelines.',
    blueprintId: '00'
  }
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  level?: string;
  isProposal?: boolean;
  proposalData?: {
    title: string;
    level: string;
    blueprintId: string;
    plannedMods: string;
  };
}

function DashboardContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = true;

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'workspace' | 'blueprints' | 'documents' | 'overview' | 'prompts'>('workspace');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 4 Searchable Dropdown States
  const [selectedLevel, setSelectedLevel] = useState<AbstractionDetailLevel>('L3');
  const [selectedFlowchart, setSelectedFlowchart] = useState<string>('');
  const [selectedInfographic, setSelectedInfographic] = useState<string>('');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('00');
  
  // Combobox Open/Filter States
  const [openDropdown, setOpenDropdown] = useState<'level' | 'flowchart' | 'infographic' | 'blueprint' | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>('');

  // Prompt Composer & Plan
  const [createPrompt, setCreatePrompt] = useState<string>(DEFAULT_DASHBOARD_PROMPT);
  const [geminiDecision, setGeminiDecision] = useState<GeminiArchitecturalDecision>(() =>
    buildStructuredFallbackDecision(DEFAULT_DASHBOARD_PROMPT)
  );

  // Active Loaded Blueprint State on 70% Canvas
  const [loadedBlueprintId, setLoadedBlueprintId] = useState<string>('00');
  const [canvasTitle, setCanvasTitle] = useState<string>('Google Cloud Enterprise Architecture');
  const [canvasSubtitle, setCanvasSubtitle] = useState<string>('Multi-Tier Google Cloud Topology across 5 Deterministic Zones (L3 Detail)');
  const [canvasVersion, setCanvasVersion] = useState<string>('v1.0 (Live Default)');
  const [canvasPerspective, setCanvasPerspective] = useState<ArchitecturePerspective>('Technical');
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [isSynthesizingLive, setIsSynthesizingLive] = useState<boolean>(false);

  // Copilot Chat Stream State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Architecture Studio Ready. Default Google Cloud Enterprise Architecture (#00) is loaded on the 70% viewport. Select options above and click Propose Blueprint & Plan to update the canvas.'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  // Existing Projects & History
  const [docProjects, setDocProjects] = useState<HistoricalProjectItem[]>([]);
  const [localStudioSessions, setLocalStudioSessions] = useState<any[]>([]);
  const [userArtifacts, setUserArtifacts] = useState<any[]>([]);
  const [inspectBlueprint, setInspectBlueprint] = useState<CanonicalTemplate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.combobox-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Fetch local projects
  useEffect(() => {
    try {
      const docs = loadAllHistoricalProjects();
      setDocProjects(docs);
    } catch (e) {
      console.warn('Doc load failed:', e);
    }

    try {
      const sessions: any[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('promptcanvas_studio_') && !key.includes('prompt_draft')) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && (parsed.projectTitle || parsed.ast?.metadata?.projectTitle)) {
              sessions.push({
                id: parsed.id || key.replace('promptcanvas_studio_', ''),
                title: parsed.projectTitle || parsed.ast?.metadata?.projectTitle || 'Studio Architecture',
                versionTag: parsed.activeVersionTag || 'v1.0',
                prompt: parsed.messages?.[0]?.text || 'Interactive Studio Session',
                href: `/studio?id=${encodeURIComponent(parsed.id || key.replace('promptcanvas_studio_', ''))}`,
              });
            }
          }
        }
      }
      setLocalStudioSessions(sessions);
    } catch {
      // ignore
    }
  }, []);

  // Filtered lists for searchable dropdowns
  const filteredBlueprints = useMemo(() => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return CANONICAL_TEMPLATES;
    return CANONICAL_TEMPLATES.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.family.toLowerCase().includes(q) ||
        t.primaryPurpose.toLowerCase().includes(q)
    );
  }, [filterQuery]);

  const filteredFlowcharts = useMemo(() => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return FLOWCHART_OPTIONS;
    return FLOWCHART_OPTIONS.filter((f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q));
  }, [filterQuery]);

  const filteredInfographics = useMemo(() => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return INFOGRAPHIC_OPTIONS;
    return INFOGRAPHIC_OPTIONS.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }, [filterQuery]);

  // Active Blueprint Template Object
  const activeTemplateObj = useMemo(() => {
    const found = CANONICAL_TEMPLATES.find((t) => t.id === loadedBlueprintId || t.id === loadedBlueprintId.padStart(2, '0'));
    return found || CANONICAL_TEMPLATES[0];
  }, [loadedBlueprintId]);

  // Live Rendered XML for the 70% Canvas
  const activeCanvasXml = useMemo(() => {
    return activeTemplateObj.generateXml('enterprise', isLight ? 'light' : 'dark');
  }, [activeTemplateObj, isLight]);

  // =========================================================================
  // CORE ACTION: Propose Blueprint & Plan (Loads correct blueprint onto 70% canvas)
  // =========================================================================
  const handleProposeBlueprintAndPlan = () => {
    let targetBlueprintId = selectedBlueprintId;
    let targetTitle = activeTemplateObj.name;

    if (selectedFlowchart) {
      const fc = FLOWCHART_OPTIONS.find((f) => f.id === selectedFlowchart);
      if (fc) {
        targetBlueprintId = fc.blueprintId;
        targetTitle = fc.name;
        if (!createPrompt || createPrompt === DEFAULT_DASHBOARD_PROMPT) setCreatePrompt(fc.prompt);
      }
    } else if (selectedInfographic) {
      const info = INFOGRAPHIC_OPTIONS.find((i) => i.id === selectedInfographic);
      if (info) {
        targetBlueprintId = info.blueprintId;
        targetTitle = info.name;
        if (!createPrompt || createPrompt === DEFAULT_DASHBOARD_PROMPT) setCreatePrompt(info.prompt);
      }
    } else {
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === selectedBlueprintId || t.id === selectedBlueprintId.padStart(2, '0'));
      if (bp) {
        targetTitle = bp.name;
      }
    }

    // 1. Immediately replace diagram on the 70% canvas!
    setLoadedBlueprintId(targetBlueprintId);
    setCanvasTitle(targetTitle);
    setCanvasSubtitle(`Multi-Tier Cloud Topology across 5 Deterministic Zones (${selectedLevel} Level)`);
    setCanvasVersion('v1.0 (Loaded Blueprint)');

    // 2. Add user message and proposal card to chat
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: createPrompt,
      level: selectedLevel
    };

    const aiProposal: ChatMessage = {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text: `Proposed Architecture Blueprint loaded on the 70% canvas.`,
      isProposal: true,
      proposalData: {
        title: targetTitle,
        level: selectedLevel,
        blueprintId: targetBlueprintId,
        plannedMods: 'Ingress WAF, Vertex RAG Agent, Omnipanel Mesh, and Cloud Spanner multi-region ACID persistence.'
      }
    };

    setChatMessages((prev) => [...prev, userMsg, aiProposal]);
    showToast(`✓ Loaded #${targetBlueprintId} ${targetTitle} on Canvas`);
  };

  // Live Approve & Generate Action
  const handleApproveAndGenerate = (proposalTitle: string, promptText: string) => {
    setIsSynthesizingLive(true);
    setCanvasVersion('v2.0 (Synthesizing Live...)');

    setTimeout(() => {
      setIsSynthesizingLive(false);
      setCanvasVersion('v2.0 (Customized Live)');
      setCanvasTitle(`Certified: ${proposalTitle}`);
      
      setChatMessages((prev) => [
        ...prev,
        {
          id: `ai_done_${Date.now()}`,
          sender: 'ai',
          text: `Architecture successfully customized and certified! The 70% canvas has been updated with your parameters. You can export to PNG or copy Draw.io XML directly.`
        }
      ]);
      showToast('🎉 Architecture Successfully Customized & Certified!');
    }, 900);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setCreatePrompt(chatInput);
    setChatInput('');
    handleProposeBlueprintAndPlan();
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(activeCanvasXml);
    setCopiedXml(true);
    showToast('📋 Draw.io mxGraph XML copied to clipboard!');
    setTimeout(() => setCopiedXml(false), 2000);
  };

  return (
    <div className="min-h-screen flex bg-[#090D16] text-slate-100 font-sans">
      {/* 1. Left Navigation Sidebar (Dark Shell) */}
      <UnifiedAppSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-slate-50">
        
        {/* Top App Header */}
        <AppHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center bg-[#090D18]">
                <Compass className="w-4 h-4 text-teal-400" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-sm md:text-base tracking-tight flex items-center gap-2 text-white">
                <span>PromptCanvas &mdash; 30/70 Architecture Studio &amp; Launchpad</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  PIPELINE V2
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Searchable Dropdowns &bull; Instant Blueprint Loading &bull; Live Copilot Approval Gate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href={`/studio?blueprint=${loadedBlueprintId}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open in Full Studio &rarr;</span>
            </Link>
            <ThemeToggleBtn />
          </div>
        </AppHeader>

        {/* Workspace Body: 30 / 70 Layout */}
        <div className="flex-1 flex overflow-hidden p-3 lg:p-4 gap-3.5">
          
          {/* ========================================================================= */}
          {/* 2. LEFT 30% INPUT & CHATBAR PANEL                                         */}
          {/* ========================================================================= */}
          <div className="w-full lg:w-[32%] xl:w-[30%] bg-white border border-slate-200 rounded-3xl flex flex-col h-full shrink-0 shadow-sm overflow-hidden">
            
            {/* TOP SECTION: 4 SEARCHABLE DROPDOWNS & PROMPT (55% Height) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 border-b border-slate-200">
              
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Searchable Architecture Config
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">ElkJS V2</span>
              </div>

              {/* 1. SEARCHABLE DROPDOWN: DETAIL LEVEL (L1-L4) */}
              <div className="relative combobox-container">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                  1. Abstraction Detail Level
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setFilterQuery('');
                    setOpenDropdown(openDropdown === 'level' ? null : 'level');
                  }}
                  className="w-full bg-white border border-slate-300 hover:border-teal-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 flex items-center justify-between shadow-xs transition-all text-left"
                >
                  <span className="truncate">
                    {selectedLevel === 'L3' && 'L3 — Component & Microservices / Pods (Default)'}
                    {selectedLevel === 'L1' && 'L1 — Context & Boundary (Enterprise Boundary)'}
                    {selectedLevel === 'L2' && 'L2 — Container & Subsystems (VPC & Clusters)'}
                    {selectedLevel === 'L4' && 'L4 — Physical & Protocols (IPAM, Ports, HSM)'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {openDropdown === 'level' && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1.5">
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {[
                        { id: 'L1', label: 'L1 — Context & Boundary (Enterprise Boundary)' },
                        { id: 'L2', label: 'L2 — Container & Subsystems (VPC & Clusters)' },
                        { id: 'L3', label: 'L3 — Component & Microservices / Pods (Default)' },
                        { id: 'L4', label: 'L4 — Physical & Protocols (IPAM, Ports, HSM)' }
                      ].map((lvl) => (
                        <div
                          key={lvl.id}
                          onClick={() => {
                            setSelectedLevel(lvl.id as AbstractionDetailLevel);
                            setOpenDropdown(null);
                          }}
                          className={`p-2 rounded-xl cursor-pointer text-xs font-semibold transition-colors ${
                            selectedLevel === lvl.id ? 'bg-teal-50 text-teal-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="font-extrabold text-teal-600 mr-1.5">{lvl.id}</span> {lvl.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. SEARCHABLE DROPDOWN: FLOWCHART OPTIONS */}
              <div className="relative combobox-container">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1 flex items-center justify-between">
                  <span>🔄 Searchable Flowchart Options</span>
                  <span className="text-[9px] text-slate-400 font-normal">4 options</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setFilterQuery('');
                    setOpenDropdown(openDropdown === 'flowchart' ? null : 'flowchart');
                  }}
                  className="w-full bg-white border border-slate-200 hover:border-teal-500 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 flex items-center justify-between shadow-xs transition-all text-left"
                >
                  <span className={`truncate ${selectedFlowchart ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                    {selectedFlowchart
                      ? FLOWCHART_OPTIONS.find((f) => f.id === selectedFlowchart)?.name
                      : '-- Search & Select Flowchart --'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {openDropdown === 'flowchart' && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1.5">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Type to filter flowcharts..."
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {filteredFlowcharts.map((fc) => (
                        <div
                          key={fc.id}
                          onClick={() => {
                            setSelectedFlowchart(fc.id);
                            setSelectedInfographic('');
                            setSelectedBlueprintId(fc.blueprintId);
                            setCreatePrompt(fc.prompt);
                            setOpenDropdown(null);
                          }}
                          className="p-2 rounded-xl hover:bg-teal-50 cursor-pointer text-xs transition-colors"
                        >
                          <p className="font-bold text-slate-900">{fc.name}</p>
                          <p className="text-[10px] text-slate-400">{fc.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. SEARCHABLE DROPDOWN: INFOGRAPHIC BLUEPRINTS */}
              <div className="relative combobox-container">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1 flex items-center justify-between">
                  <span>📊 Searchable Infographic Blueprints</span>
                  <span className="text-[9px] text-slate-400 font-normal">4 blueprints</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setFilterQuery('');
                    setOpenDropdown(openDropdown === 'infographic' ? null : 'infographic');
                  }}
                  className="w-full bg-white border border-slate-200 hover:border-teal-500 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 flex items-center justify-between shadow-xs transition-all text-left"
                >
                  <span className={`truncate ${selectedInfographic ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                    {selectedInfographic
                      ? INFOGRAPHIC_OPTIONS.find((i) => i.id === selectedInfographic)?.name
                      : '-- Search & Select Infographic --'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {openDropdown === 'infographic' && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1.5">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Type to filter infographics..."
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {filteredInfographics.map((info) => (
                        <div
                          key={info.id}
                          onClick={() => {
                            setSelectedInfographic(info.id);
                            setSelectedFlowchart('');
                            setSelectedBlueprintId(info.blueprintId);
                            setCreatePrompt(info.prompt);
                            setOpenDropdown(null);
                          }}
                          className="p-2 rounded-xl hover:bg-teal-50 cursor-pointer text-xs transition-colors"
                        >
                          <p className="font-bold text-slate-900">{info.name}</p>
                          <p className="text-[10px] text-slate-400">{info.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. SEARCHABLE DROPDOWN: ARCHITECTURE BLUEPRINTS (75) */}
              <div className="relative combobox-container">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1 flex items-center justify-between">
                  <span>🏛️ Searchable Blueprints (75)</span>
                  <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                    75 Blueprints
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setFilterQuery('');
                    setOpenDropdown(openDropdown === 'blueprint' ? null : 'blueprint');
                  }}
                  className="w-full bg-white border border-slate-300 hover:border-teal-500 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 flex items-center justify-between shadow-xs transition-all text-left"
                >
                  <span className="truncate">
                    #{selectedBlueprintId} &mdash; {CANONICAL_TEMPLATES.find((t) => t.id === selectedBlueprintId)?.name || 'GCP Native Architecture'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {openDropdown === 'blueprint' && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1.5">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search 75 blueprints by ID, cloud, name..."
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="max-h-52 overflow-y-auto space-y-1">
                      {filteredBlueprints.map((bp) => (
                        <div
                          key={bp.id}
                          onClick={() => {
                            setSelectedBlueprintId(bp.id);
                            setSelectedFlowchart('');
                            setSelectedInfographic('');
                            setCreatePrompt(`Design an enterprise architecture based on #${bp.id} ${bp.name} with ${bp.primaryPurpose}`);
                            setOpenDropdown(null);
                          }}
                          className={`p-2 rounded-xl cursor-pointer text-xs transition-colors ${
                            selectedBlueprintId === bp.id ? 'bg-teal-50 text-teal-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <p className="font-bold text-slate-900">#{bp.id} &mdash; {bp.name}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{bp.primaryPurpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Natural Language Prompt Textarea */}
              <div className="space-y-1 pt-0.5">
                <label className="text-[10px] font-extrabold uppercase text-slate-600 flex items-center justify-between">
                  <span>Natural Language Architecture Prompt</span>
                  <span className="text-[9px] font-normal text-slate-400">Custom Clause Synthesis</span>
                </label>
                <textarea
                  rows={2}
                  value={createPrompt}
                  onChange={(e) => setCreatePrompt(e.target.value)}
                  className="w-full p-2.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none shadow-inner leading-relaxed font-medium"
                  placeholder="Describe your target cloud architecture..."
                />
              </div>

              {/* EXACT GRADIENT PILL BUTTON: Propose Blueprint & Plan -> */}
              <button
                type="button"
                onClick={handleProposeBlueprintAndPlan}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-teal-400 via-teal-500 to-indigo-600 hover:from-teal-500 hover:to-indigo-700 text-white font-extrabold text-xs tracking-wide transition-all shadow-lg shadow-teal-500/25 border-2 border-teal-300/40 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-white shrink-0" />
                <span className="text-[13px] font-bold">Propose Blueprint &amp; Plan &rarr;</span>
              </button>

            </div>

            {/* BOTTOM SECTION: AI COPILOT CHATBOX & APPROVAL STREAM (45% Height) */}
            <div className="h-[45%] flex flex-col justify-between bg-slate-50 border-t border-slate-200">
              
              {/* Chat Header */}
              <div className="px-4 py-2 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-800">Architecture Co-Pilot</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Gemini 3.8 Flash</span>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {msg.sender === 'ai' && (
                      <div className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        AI
                      </div>
                    )}
                    
                    {msg.isProposal && msg.proposalData ? (
                      /* Highlighted Proposal Card with Pulse & Live Approval Action */
                      <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border-2 border-teal-500 text-slate-800 leading-relaxed shadow-md pulse-proposal w-full space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-teal-100 text-teal-800 uppercase tracking-wider">
                            Proposed Architecture Blueprint
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold">✓ Active on Canvas</span>
                        </div>

                        <h4 className="font-extrabold text-xs text-slate-900">{msg.proposalData.title}</h4>
                        <p className="text-[11px] text-slate-600">{msg.proposalData.plannedMods}</p>

                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 space-y-0.5 text-[10px] text-slate-600 font-mono">
                          <div>&bull; Detail Level: <strong>{msg.proposalData.level}</strong></div>
                          <div>&bull; Blueprint ID: <strong>#{msg.proposalData.blueprintId}</strong></div>
                          <div>&bull; Layout Engine: <strong>ElkJS Layered (16:9 HD)</strong></div>
                        </div>

                        <div className="pt-1.5 flex items-center gap-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => handleApproveAndGenerate(msg.proposalData!.title, createPrompt)}
                            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-teal-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>✓ Approve &amp; Generate Live</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-teal-600 text-white rounded-tr-sm'
                            : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'
                        }`}
                      >
                        {msg.level && <p className="font-bold text-[9px] text-teal-200 uppercase mb-0.5">Level {msg.level}</p>}
                        <p>{msg.text}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-2.5 bg-white border-t border-slate-200 shrink-0">
                <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl p-1 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500/20">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendChat();
                    }}
                    placeholder="Refine requirement or ask co-pilot..."
                    className="w-full bg-transparent px-2.5 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendChat}
                    className="p-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-all shrink-0 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 3. RIGHT 70% HIGH-FIDELITY INTERACTIVE CANVAS                             */}
          {/* ========================================================================= */}
          <div className="flex-1 bg-[#EAEDF1] rounded-3xl border border-slate-300 p-4 lg:p-6 flex flex-col justify-between overflow-hidden shadow-sm relative">
            
            {/* Canvas Header Control Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-300/80 mb-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-slate-800 tracking-tight">{canvasTitle}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 border border-teal-300 text-[10px] font-mono font-bold">
                  {canvasVersion}
                </span>
              </div>

              {/* Perspective & Zoom Actions */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white p-0.5 rounded-xl border border-slate-300 text-xs shadow-2xs">
                  {(['Technical', 'Logical', 'Process'] as ArchitecturePerspective[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setCanvasPerspective(p)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        canvasPerspective === p ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-slate-300" />

                <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-300 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setZoomScale((z) => Math.min(z + 0.1, 1.8))}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold"
                  >
                    ＋
                  </button>
                  <span className="text-[10px] font-mono font-bold text-slate-600 px-1">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomScale((z) => Math.max(z - 0.1, 0.6))}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold"
                  >
                    －
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomScale(1.0)}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg text-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Canvas Viewport Rendering Draw.io XML */}
            <div className="flex-1 flex items-center justify-center overflow-auto p-2">
              <div
                style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
                className="w-full max-w-[1360px] aspect-[16/9] bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden transition-transform duration-200"
              >
                <DiagramViewerRenderSafe
                  key={`${loadedBlueprintId}_${canvasPerspective}_${isLight ? 'light' : 'dark'}_${canvasVersion}`}
                  xml={activeCanvasXml}
                  aspectRatioId="16:9"
                  bgTheme={isLight ? 'light' : 'dark'}
                />
              </div>
            </div>

            {/* Bottom Action Canvas Strip */}
            <div className="pt-2.5 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-slate-700 uppercase">Action Canvas:</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">GCP Enterprise</span>
                  <span className="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold">Context States</span>
                  <span className="px-2 py-0.5 rounded bg-blue-800 text-white text-[10px] font-bold">Vertex Multi-Agent</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">Cloud Spanner</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyXml}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                >
                  {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                  <span>Copy Draw.io XML</span>
                </button>
                <Link
                  href={`/studio?blueprint=${loadedBlueprintId}`}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition"
                >
                  <span>Launch Studio &rarr;</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </main>

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
