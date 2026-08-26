'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Layers,
  Network,
  LayoutGrid,
  FileCode,
  Download,
  Copy,
  Check,
  Send,
  Loader2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Clock,
  History,
  Shield,
  ArrowRight,
  Sliders,
  Eye,
  Plus,
  Compass,
  Zap,
  ArrowLeft,
  ChevronRight,
  Database,
  Cpu,
  Lock,
  Globe
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
  BIOPHARMA_REFERENCE_TIERS
} from '@/lib/canonical/canonicalTemplates';
import { getDefaultXmlForArchitecture, getArchitectureTypeById } from '@/lib/architectureTypes';
import { injectUseCaseFlavor } from '@/lib/diagramCleaner';

// Quick Load Architecture Scenarios
const QUICK_SCENARIOS = [
  {
    id: 'biopharma',
    name: 'Bio-Pharma Clinical Genomics & Regulatory AI',
    domain: 'Biopharma',
    title: 'Bio-Pharma Precision Oncology & Pharmacovigilance AI Mesh',
    prompt: 'An enterprise-grade decentralized clinical genomics analysis and regulatory pharmacovigilance platform with automated FDA electronic signature audits, Spanner knowledge graphs, multi-region active-active disaster recovery, and zero-trust VPC Service Perimeters.',
    archType: 'canonical_01'
  },
  {
    id: 'fintech',
    name: 'FinTech Ultra-Low Latency FX Settlement Mesh',
    domain: 'FinTech',
    title: 'ApexPay Ultra-Low Latency FX Trading & Multi-Cloud Settlement',
    prompt: 'Mission-critical cross-border FX execution platform with sub-millisecond Spanner ledgering, HSM envelope encryption, PCI-DSS Level 1 tokenization vault, and Kafka streaming anomaly detection across AWS and GCP.',
    archType: 'canonical_10'
  },
  {
    id: 'manufacturing',
    name: 'AeroNode Autonomous Drone Fleet & Airspace Mesh',
    domain: 'Manufacturing',
    title: 'AeroNode Autonomous UAV Swarm Telemetry & Point Cloud Mesh',
    prompt: 'Real-time telemetry ingestion from 10,000+ autonomous drones with edge LiDAR point cloud processing, Pub/Sub message queues, ScaNN vector navigation index, and DO-178C avionics safety audit trails.',
    archType: 'canonical_09'
  },
  {
    id: 'retail',
    name: 'OmniVue Intelligent E-Commerce Fulfillment',
    domain: 'Retail',
    title: 'OmniVue Multi-Tenant Intelligent WMS & Supply Chain Platform',
    prompt: 'High-throughput omnichannel inventory orchestration system with BigQuery feature stores, Vertex AI demand forecasting, global CDN edge caching, and real-time CDC synchronization with ERPs.',
    archType: 'canonical_04'
  },
  {
    id: 'saas',
    name: 'WorkCloud Multi-Tenant SaaS Workspace Engine',
    domain: 'SaaS AI',
    title: 'WorkCloud Enterprise Multi-Tenant AI Agent Architecture',
    prompt: 'Scalable multi-tenant B2B SaaS platform with isolated schema partitioning, Envoy mTLS service mesh, LangGraph agent orchestrators, and SOC2 Type II compliance audit ledgering.',
    archType: 'canonical_16'
  }
];

// Architecture Blueprint Categories / Types
const BLUEPRINT_TYPE_PILLS = [
  { id: 'canonical_01', name: 'System Context', label: '01 System Context', number: '01' },
  { id: 'canonical_02', name: 'Capability Map', label: '02 Capability Map', number: '02' },
  { id: 'canonical_03', name: 'Business Process', label: '03 Business Process', number: '03' },
  { id: 'canonical_04', name: 'Value Stream', label: '04 Value Stream', number: '04' },
  { id: 'canonical_05', name: 'As-Is / To-Be', label: '05 As-Is / To-Be', number: '05' },
  { id: 'canonical_06', name: 'C4 Context', label: '06 C4 Context', number: '06' },
  { id: 'canonical_07', name: 'C4 Container', label: '07 C4 Container', number: '07' },
  { id: 'canonical_08', name: 'Component Arch', label: '08 Component Arch', number: '08' },
  { id: 'canonical_09', name: 'Data Flow', label: '09 Data Flow', number: '09' },
  { id: 'canonical_10', name: 'Integration Arch', label: '10 Integration Arch', number: '10' },
  { id: 'canonical_11', name: 'Sequence Diagram', label: '11 Sequence Diagram', number: '11' },
  { id: 'canonical_12', name: 'State Machine', label: '12 State Machine', number: '12' },
  { id: 'canonical_13', name: 'Decision Flow', label: '13 Decision Flow', number: '13' },
  { id: 'canonical_14', name: 'Data Model / ERD', label: '14 Data Model / ERD', number: '14' },
  { id: 'canonical_15', name: 'Network Topology', label: '15 Network Topology', number: '15' },
  { id: 'canonical_16', name: 'Deployment Mesh', label: '16 Deployment Mesh', number: '16' },
  { id: 'canonical_17', name: 'Identity & Access', label: '17 IAM Zero-Trust', number: '17' },
  { id: 'canonical_18', name: 'Security Boundary', label: '18 Trust Boundary', number: '18' },
  { id: 'canonical_19', name: 'HA / DR Architecture', label: '19 HA / DR Failover', number: '19' },
  { id: 'canonical_20', name: 'CI/CD Pipeline', label: '20 CI/CD GitOps', number: '20' },
  { id: 'canonical_21', name: 'Observability / SRE', label: '21 SRE Telemetry', number: '21' },
  { id: 'canonical_23', name: 'Multi-Agent RAG', label: '23 Agent Interaction', number: '23' },
  { id: 'canonical_24', name: 'Knowledge Graph', label: '24 RAG Flow', number: '24' },
  { id: 'canonical_30', name: 'Cloud FinOps', label: '30 FinOps Chargeback', number: '30' }
];

interface DiagramVersion {
  id: string;
  version_number: number;
  xml_content: string;
  comment?: string;
  created_by?: string;
  created_at: string;
  prompt?: string;
  architecture_type?: string;
}

interface DiagramRecord {
  id: string;
  name: string;
  architecture_type?: string;
  prompt?: string;
  versions?: DiagramVersion[];
}

function DiaGenStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const initialDiagramId = searchParams.get('diagram');
  const initialArch = searchParams.get('arch') || 'canonical_01';
  const forceNew = searchParams.get('new') === 'true';

  // Mode: 'intake' (Configuration & Assembly Studio) vs 'canvas' (Live Interactive Studio)
  const [viewMode, setViewMode] = useState<'intake' | 'canvas'>(() => {
    if (initialDiagramId) return 'canvas';
    if (forceNew) return 'intake';
    return 'intake';
  });

  // Intake Form State
  const [selectedArchType, setSelectedArchType] = useState<string>(initialArch);
  const [projectTitle, setProjectTitle] = useState<string>('Bio-Pharma Clinical Genomics & Regulatory AI Platform');
  const [scopePrompt, setScopePrompt] = useState<string>(
    'An enterprise-grade decentralized clinical genomics analysis and regulatory pharmacovigilance platform with automated FDA electronic signature audits, Spanner knowledge graphs, multi-region active-active disaster recovery, and zero-trust VPC Service Perimeters.'
  );
  const [selectedDomain, setSelectedDomain] = useState<string>('Biopharma');

  // Canvas Studio State
  const [activeDiagram, setActiveDiagram] = useState<DiagramRecord | null>(null);
  const [promptInput, setPromptInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'canvas' | 'xml'>('canvas');
  const [copied, setCopied] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);

  // Current XML content
  const [currentXml, setCurrentXml] = useState<string>(() => {
    const raw = getDefaultXmlForArchitecture(initialArch) || CANONICAL_TEMPLATES[0].generateXml('NOVACURA');
    return injectUseCaseFlavor(raw, 'Bio-Pharma Clinical Genomics & Regulatory AI Platform');
  });

  const [activeVersionNumber, setActiveVersionNumber] = useState<number>(1);
  const [versionHistory, setVersionHistory] = useState<DiagramVersion[]>([]);

  // Load Diagram from DB if diagram query parameter exists
  useEffect(() => {
    if (initialDiagramId && !forceNew) {
      fetch(`/api/diagrams/${initialDiagramId}`)
        .then(res => res.json())
        .then(data => {
          if (data.diagram) {
            setActiveDiagram(data.diagram);
            setProjectTitle(data.diagram.name);
            if (data.diagram.prompt) setScopePrompt(data.diagram.prompt);
            if (data.diagram.architecture_type) {
              setSelectedArchType(data.diagram.architecture_type);
            }
            if (data.diagram.versions && data.diagram.versions.length > 0) {
              const sorted = [...data.diagram.versions].sort((a, b) => b.version_number - a.version_number);
              setVersionHistory(sorted);
              setCurrentXml(sorted[0].xml_content);
              setActiveVersionNumber(sorted[0].version_number);
            }
            setViewMode('canvas');
          }
        })
        .catch(console.error);
    }
  }, [initialDiagramId, forceNew]);

  // Load Quick Scenario
  const handleLoadScenario = (sc: typeof QUICK_SCENARIOS[0]) => {
    setSelectedDomain(sc.domain);
    setProjectTitle(sc.title);
    setScopePrompt(sc.prompt);
    setSelectedArchType(sc.archType);
  };

  // Compile & Launch Canvas Studio
  const handleLaunchStudio = async () => {
    setIsGenerating(true);
    try {
      const baseXml = getDefaultXmlForArchitecture(selectedArchType) || CANONICAL_TEMPLATES.find(t => t.id === selectedArchType)?.generateXml('NOVACURA') || CANONICAL_TEMPLATES[0].generateXml('NOVACURA');
      const flavored = injectUseCaseFlavor(baseXml, projectTitle, scopePrompt);
      setCurrentXml(flavored);

      const nextVer: DiagramVersion = {
        id: `v_${Date.now()}`,
        version_number: 1,
        xml_content: flavored,
        comment: `Initial Blueprint: ${getArchitectureTypeById(selectedArchType)?.name || selectedArchType}`,
        created_by: 'AI Compiler',
        created_at: new Date().toISOString(),
        prompt: scopePrompt,
        architecture_type: selectedArchType
      };

      setVersionHistory([nextVer]);
      setActiveVersionNumber(1);
      setViewMode('canvas');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Iterative Prompt Refinement inside Canvas Studio
  const handleGeneratePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isGenerating) return;

    setIsGenerating(true);
    const userPrompt = promptInput.trim();
    setPromptInput('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          architectureType: selectedArchType,
          existingXml: currentXml,
          diagramId: activeDiagram?.id
        })
      });

      if (!res.ok) throw new Error('Generation failed');
      const data = await res.json();

      if (data.xml) {
        const nextVerNum = activeVersionNumber + 1;
        const newVersion: DiagramVersion = {
          id: `v_${Date.now()}`,
          version_number: nextVerNum,
          xml_content: data.xml,
          comment: userPrompt.slice(0, 60),
          created_by: 'Gemini 3.7 Flash',
          created_at: new Date().toISOString(),
          prompt: userPrompt,
          architecture_type: selectedArchType
        };

        setCurrentXml(data.xml);
        setActiveVersionNumber(nextVerNum);
        setVersionHistory(prev => [newVersion, ...prev]);
      }
    } catch (err) {
      console.error(err);
      // Fallback: local flavor injection
      const fallbackXml = injectUseCaseFlavor(currentXml, userPrompt);
      const nextVerNum = activeVersionNumber + 1;
      const newVersion: DiagramVersion = {
        id: `v_${Date.now()}`,
        version_number: nextVerNum,
        xml_content: fallbackXml,
        comment: userPrompt.slice(0, 60),
        created_by: 'Local AST Compiler',
        created_at: new Date().toISOString(),
        prompt: userPrompt,
        architecture_type: selectedArchType
      };

      setCurrentXml(fallbackXml);
      setActiveVersionNumber(nextVerNum);
      setVersionHistory(prev => [newVersion, ...prev]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Rollback to specific version
  const handleRollbackVersion = (ver: DiagramVersion) => {
    setCurrentXml(ver.xml_content);
    setActiveVersionNumber(ver.version_number);
  };

  // Copy Raw XML
  const handleCopyXml = () => {
    navigator.clipboard.writeText(currentXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download XML file
  const handleDownloadXml = () => {
    const blob = new Blob([currentXml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.replace(/\s+/g, '_').toLowerCase()}_v${activeVersionNumber}.drawio.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Selected Blueprint metadata
  const selectedBlueprintMeta = useMemo(() => {
    return CANONICAL_TEMPLATES.find(t => t.id === selectedArchType.replace('canonical_', '')) || CANONICAL_TEMPLATES[0];
  }, [selectedArchType]);

  // Contextual chips for canvas refinements
  const suggestionChips = useMemo(() => {
    if (selectedDomain.toLowerCase().includes('fin')) {
      return [
        'Enforce PCI-DSS HSM Tokenization Vault',
        'Add Real-time Anomaly Detection to Ledger Stream',
        'Deploy Spanner Multi-Region Active-Active Replication',
        'Add Sub-Millisecond Envoy Ingress Gateways'
      ];
    }
    if (selectedDomain.toLowerCase().includes('bio') || selectedDomain.toLowerCase().includes('health')) {
      return [
        'Enforce FDA 21 CFR Part 11 Electronic Signatures',
        'Add ScaNN Vector SearchScorer for Oncology Pathways',
        'Attach VPC Service Controls Sovereign Cloud Boundary',
        'Add HL7 / FHIR Ingress Translation Gateway'
      ];
    }
    return [
      'Add Zero-Trust Ingress Perimeter',
      'Optimize inter-service column spacing',
      'Connect Real-Time Stream to Feature Store',
      'Add Multi-Region High Availability Failover'
    ];
  }, [selectedDomain]);

  return (
    <div className={`min-h-screen flex ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060913] text-slate-100'}`}>
      {/* Universal Sidebar */}
      <UnifiedAppSidebar />

      {/* Main Container */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* ========================================================================= */}
        {/* TOP STICKY HEADER */}
        {/* ========================================================================= */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md px-6 md:px-12 py-3.5 flex items-center justify-between transition-colors ${
          isLight ? 'bg-white/90 border-slate-200 shadow-xs' : 'bg-[#070B16]/90 border-slate-800/80 shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-500 p-0.5 shadow-md flex items-center justify-center">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#090D18]'}`}>
                <Layers className="w-4 h-4 text-teal-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-sm md:text-base tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  DiaGen Architecture Studio
                </span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                  {viewMode === 'intake' ? 'BLUEPRINT INTAKE' : `CANVAS v${activeVersionNumber}`}
                </span>
              </div>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                {viewMode === 'intake' 
                  ? 'Intelligent Architecture Compiler & 50 Master Canonical Blueprints' 
                  : projectTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {viewMode === 'canvas' && (
              <button
                onClick={() => setViewMode('intake')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                  isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Configure New</span>
              </button>
            )}

            <Link
              href="/diablueprint"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                isLight ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-sky-500" />
              <span>50 Blueprints</span>
            </Link>

            <ThemeToggleBtn />
          </div>
        </header>

        {/* ========================================================================= */}
        {/* VIEW MODE A: ARCHITECTURE BLUEPRINT INTAKE & ASSEMBLY STUDIO */}
        {/* ========================================================================= */}
        {viewMode === 'intake' && (
          <div className="w-full max-w-8xl mx-auto px-6 md:px-12 py-8 space-y-10">
            {/* Header Banner */}
            <div className="space-y-2 border-b pb-6 border-slate-200 dark:border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero-Collision Architecture Compiler</span>
              </div>
              <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Architectural Grammar for <span className="bg-gradient-to-r from-teal-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Enterprise Cloud Systems</span>
              </h2>
              <p className={`text-xs md:text-sm max-w-3xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Select your target architectural blueprint, define your domain boundaries and system requirements, and instantly compile collision-free vector topology.
              </p>
            </div>

            {/* STEP 1: CONFIGURATION */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    STEP 1 OF 2 · ARCHITECTURE BLUEPRINT TYPE
                  </span>
                  <span className="text-xs text-slate-400 font-medium">50 Certified Master Layouts</span>
                </div>

                {/* Blueprint Type Pills */}
                <div className="flex flex-wrap gap-2">
                  {BLUEPRINT_TYPE_PILLS.map((pill) => {
                    const isSelected = selectedArchType === pill.id;
                    return (
                      <button
                        key={pill.id}
                        onClick={() => setSelectedArchType(pill.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-500/20 scale-[1.02]'
                            : isLight
                            ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-[#090D18] hover:bg-slate-800/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span>{pill.label}</span>
                        <span className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}>
                          #{pill.number}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Fields: Grid 2 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                {/* Left Form: Title & Scope */}
                <div className="lg:col-span-7 space-y-6">
                  {/* 1. Project Title */}
                  <div className="space-y-2">
                    <label className={`text-xs font-extrabold uppercase tracking-wider flex items-center justify-between ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      <span>1. System / Architecture Title</span>
                      <span className="text-[10px] font-mono text-slate-400">Required</span>
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g. Autonomous Robotic Telesurgery Platform..."
                      className={`w-full rounded-2xl p-3.5 text-xs font-bold border outline-none transition ${
                        isLight
                          ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                          : 'bg-[#090D18] border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                      }`}
                    />
                  </div>

                  {/* 2. Business Context & Scope Prompt */}
                  <div className="space-y-2">
                    <label className={`text-xs font-extrabold uppercase tracking-wider flex items-center justify-between ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      <span>2. Business Context &amp; Architectural Scope Prompt</span>
                      <span className="text-[10px] font-mono text-slate-400">AI Prompt Tailoring</span>
                    </label>
                    <textarea
                      rows={5}
                      value={scopePrompt}
                      onChange={(e) => setScopePrompt(e.target.value)}
                      placeholder="Describe architectural requirements, data stores, API gateways, security perimeters, AI models, pipelines..."
                      className={`w-full rounded-2xl p-3.5 text-xs font-medium border outline-none resize-none leading-relaxed transition ${
                        isLight
                          ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                          : 'bg-[#090D18] border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Right Form: Domain Flavor & Scenarios */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Domain Selector */}
                  <div className="space-y-2">
                    <label className={`text-xs font-extrabold uppercase tracking-wider flex items-center justify-between ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      <span>3. Enterprise Domain Flavor</span>
                      <span className="text-[10px] font-mono text-teal-500">Live Auto-Sync</span>
                    </label>
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className={`w-full rounded-2xl p-3.5 text-xs font-bold border outline-none transition cursor-pointer ${
                        isLight
                          ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900'
                          : 'bg-[#090D18] border-slate-800 focus:border-teal-400 text-white'
                      }`}
                    >
                      {DOMAIN_PRESETS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Load Architecture Scenarios */}
                  <div className={`p-4 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-[#090D18] border-slate-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Quick Load Architecture Scenarios:
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {QUICK_SCENARIOS.map((sc) => (
                        <button
                          key={sc.id}
                          onClick={() => handleLoadScenario(sc)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer border ${
                            projectTitle === sc.title
                              ? 'bg-teal-500/15 border-teal-500/40 text-teal-600 dark:text-teal-300'
                              : isLight
                              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                              : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800/80 text-slate-300'
                          }`}
                        >
                          <span className="truncate">{sc.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: ATTACHED ARCHITECTURE TIERS & BLUEPRINT PREVIEW */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  STEP 2 OF 2 · ATTACHED BLUEPRINT ARCHITECTURE PACK
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {selectedBlueprintMeta?.name || 'Canonical Blueprint'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BIOPHARMA_REFERENCE_TIERS.map((tier) => (
                  <div
                    key={tier.tierNumber}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#090D18] border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/20">
                        TIER {tier.tierNumber}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">100% Calibrated</span>
                    </div>

                    <h4 className={`text-xs font-black line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {tier.subsystem}
                    </h4>

                    <p className={`text-[11px] leading-relaxed line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {tier.gcpTechStack}
                    </p>

                    <div className="text-[10px] font-semibold text-indigo-500 dark:text-indigo-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      🔒 {tier.complianceControls}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRIMARY COMPILE & LAUNCH BUTTON */}
            <div className="pt-4 flex items-center justify-end">
              <button
                onClick={handleLaunchStudio}
                disabled={isGenerating}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-black text-sm transition-all shadow-xl shadow-teal-500/20 flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Compiling Architecture AST...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate &amp; Open Architecture Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE B: LIVE INTERACTIVE VECTOR CANVAS STUDIO */}
        {/* ========================================================================= */}
        {viewMode === 'canvas' && (
          <div className="flex-1 flex flex-col min-h-0 relative">
            {/* Viewport Workspace Split */}
            <div className="flex-1 flex min-h-0 overflow-hidden">
              {/* Left Control Panel: Gemini 3.7 Flash & Suggestions */}
              <div className={`w-80 md:w-96 border-r flex flex-col shrink-0 overflow-y-auto transition-colors z-20 ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#090D18] border-slate-800'
              }`}>
                <div className="p-4 space-y-6">
                  {/* Gemini Prompt Box */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                        <span>Gemini 3.7 Flash</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Architecture Compiler</span>
                    </div>

                    <form onSubmit={handleGeneratePrompt} className="space-y-2">
                      <div className="relative">
                        <textarea
                          rows={3}
                          value={promptInput}
                          onChange={(e) => setPromptInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleGeneratePrompt(e);
                            }
                          }}
                          placeholder="e.g. Add Dim_Sonar_Payload table, connect acoustic telemetry stream to PointNet++ model..."
                          disabled={isGenerating}
                          className={`w-full text-xs rounded-xl p-3 pr-10 border outline-none font-medium resize-none leading-relaxed transition ${
                            isLight
                              ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                              : 'bg-slate-950 border-slate-700 focus:border-teal-400 text-white placeholder-slate-500'
                          }`}
                        />
                        <button
                          type="submit"
                          disabled={!promptInput.trim() || isGenerating}
                          className="absolute right-2.5 bottom-3 p-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-40 transition cursor-pointer"
                        >
                          {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </form>

                    {/* Contextual Chips */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Suggested Refinements:
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {suggestionChips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => setPromptInput(chip)}
                            className={`w-full text-left p-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                              isLight
                                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800/80 text-slate-300'
                            }`}
                          >
                            ⚡ {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Blueprint Quick Switcher */}
                  <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-tight flex items-center gap-1.5">
                        <LayoutGrid className="w-3.5 h-3.5 text-sky-500" />
                        <span>Canonical Blueprints</span>
                      </span>
                      <Link
                        href="/diablueprint"
                        className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>View All 50</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>

                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {CANONICAL_TEMPLATES.slice(0, 8).map((tmpl) => (
                        <button
                          key={tmpl.id}
                          onClick={() => {
                            setSelectedArchType(`canonical_${tmpl.id}`);
                            const xml = tmpl.generateXml(selectedDomain);
                            setCurrentXml(xml);
                            setActiveVersionNumber(prev => prev + 1);
                          }}
                          className={`w-full text-left p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            selectedArchType === `canonical_${tmpl.id}`
                              ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                              : isLight
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                              : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-200'
                          }`}
                        >
                          <span className="truncate">{tmpl.name}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                            selectedArchType === `canonical_${tmpl.id}` ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                          }`}>
                            #{tmpl.id}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Main Canvas Viewport */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#0A0E1A] overflow-hidden relative">
                {/* Viewport Toolbar */}
                <div className={`px-4 py-2 border-b flex items-center justify-between shrink-0 z-10 ${
                  isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-[#090D18]/90 border-slate-800/80'
                }`}>
                  {/* Left: Tab Switchers */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveTab('canvas')}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'canvas'
                          ? 'bg-teal-600 text-white shadow-xs'
                          : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Visual Canvas</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('xml')}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'xml'
                          ? 'bg-teal-600 text-white shadow-xs'
                          : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>Draw.io XML</span>
                    </button>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsHistoryDrawerOpen(!isHistoryDrawerOpen)}
                      className="px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Timeline ({versionHistory.length})</span>
                    </button>

                    <button
                      onClick={handleCopyXml}
                      className="px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white"
                      title="Copy Draw.io XML"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={handleDownloadXml}
                      className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Draw.io</span>
                    </button>
                  </div>
                </div>

                {/* Viewport Body */}
                <div className="flex-1 relative overflow-hidden bg-white">
                  {activeTab === 'canvas' ? (
                    <div className="w-full h-full relative overflow-auto">
                      <div className="w-full h-full min-w-[1200px] min-h-[700px] flex items-center justify-center p-4">
                        <DiagramViewerRenderSafe
                          xml={currentXml}
                          theme={theme as any}
                          zoomLevel={zoomLevel}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full p-4 overflow-auto font-mono text-xs bg-slate-950 text-emerald-400">
                      <pre className="whitespace-pre-wrap leading-relaxed">{currentXml}</pre>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Version History Drawer */}
            {isHistoryDrawerOpen && (
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#090D18]/98 border-l border-slate-800 shadow-2xl z-30 flex flex-col">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-amber-500" />
                    <span className="font-black text-xs text-white">Version Timeline</span>
                  </div>
                  <button
                    onClick={() => setIsHistoryDrawerOpen(false)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {versionHistory.map((ver) => (
                    <div
                      key={ver.id}
                      onClick={() => handleRollbackVersion(ver)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                        activeVersionNumber === ver.version_number
                          ? 'bg-teal-500/20 border-teal-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>Version {ver.version_number}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(ver.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {ver.comment || ver.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function DiaGenPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060913]" />}>
      <DiaGenStudioContent />
    </Suspense>
  );
}
