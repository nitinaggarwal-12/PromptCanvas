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
  Globe,
  Search,
  CheckCircle2,
  X
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

  // View Mode: 'catalog' (50 Master Blueprint Cards format) vs 'canvas' (Live Interactive Studio)
  const [viewMode, setViewMode] = useState<'catalog' | 'canvas'>(() => {
    if (initialDiagramId) return 'canvas';
    if (forceNew) return 'catalog';
    return 'catalog';
  });

  // Filter & Search State
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('Biopharma');
  const [activePreviewBlueprint, setActivePreviewBlueprint] = useState<CanonicalTemplate | null>(null);

  // Selected Active Architecture
  const [selectedArchType, setSelectedArchType] = useState<string>(initialArch);
  const [projectTitle, setProjectTitle] = useState<string>('Bio-Pharma Clinical Genomics & Regulatory AI Platform');
  const [scopePrompt, setScopePrompt] = useState<string>(
    'An enterprise-grade decentralized clinical genomics analysis and regulatory pharmacovigilance platform with automated FDA electronic signature audits, Spanner knowledge graphs, multi-region active-active disaster recovery, and zero-trust VPC Service Perimeters.'
  );

  // Canvas Studio State
  const [activeDiagram, setActiveDiagram] = useState<DiagramRecord | null>(null);
  const [promptInput, setPromptInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'canvas' | 'xml'>('canvas');
  const [copied, setCopied] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);

  // Filtered 50 Canonical Blueprints
  const filteredBlueprints = useMemo(() => {
    return CANONICAL_TEMPLATES.filter((tmpl) => {
      const matchesFamily = selectedFamily === 'All' || tmpl.family === selectedFamily;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.id.toLowerCase().includes(q) ||
        tmpl.primaryPurpose.toLowerCase().includes(q) ||
        tmpl.family.toLowerCase().includes(q) ||
        tmpl.examples.toLowerCase().includes(q);
      return matchesFamily && matchesSearch;
    });
  }, [selectedFamily, searchQuery]);

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

  // Generate & Launch into Live Canvas Studio
  const handleLaunchStudioWithBlueprint = (tmpl: CanonicalTemplate) => {
    setIsGenerating(true);
    try {
      setSelectedArchType(`canonical_${tmpl.id}`);
      const baseXml = tmpl.generateXml(selectedDomain);
      const title = `${tmpl.name} Platform (${selectedDomain})`;
      setProjectTitle(title);
      const flavored = injectUseCaseFlavor(baseXml, title, tmpl.primaryPurpose);
      setCurrentXml(flavored);

      const nextVer: DiagramVersion = {
        id: `v_${Date.now()}`,
        version_number: 1,
        xml_content: flavored,
        comment: `Initial Blueprint: ${tmpl.name} (#${tmpl.id})`,
        created_by: 'AI Compiler',
        created_at: new Date().toISOString(),
        prompt: tmpl.primaryPurpose,
        architecture_type: `canonical_${tmpl.id}`
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
                  {viewMode === 'catalog' ? '50 BLUEPRINTS INTAKE' : `CANVAS v${activeVersionNumber}`}
                </span>
              </div>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                {viewMode === 'catalog' 
                  ? 'Intelligent Architecture Compiler & 50 Master Canonical Blueprints' 
                  : projectTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {viewMode === 'canvas' && (
              <button
                onClick={() => setViewMode('catalog')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                  isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Blueprints</span>
              </button>
            )}

            <ThemeToggleBtn />
          </div>
        </header>

        {/* ========================================================================= */}
        {/* VIEW MODE A: 50 MASTER ARCHITECTURE BLUEPRINTS CATALOG (REQUESTED CARD FORMAT) */}
        {/* ========================================================================= */}
        {viewMode === 'catalog' && (
          <div className="w-full max-w-8xl mx-auto px-6 md:px-12 py-8 space-y-8">
            {/* Header & Controls Bar */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 50 blueprints (e.g. C4, Data Flow, Sequence, IAM, Network, DR)..."
                    className={`w-full text-xs rounded-xl pl-10 pr-4 py-2.5 border outline-none font-medium transition ${
                      isLight
                        ? 'bg-white border-slate-200 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                        : 'bg-[#090D18] border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                    }`}
                  />
                </div>

                {/* Domain Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap">Domain Flavor:</span>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className={`rounded-xl px-3 py-2 text-xs font-bold border outline-none cursor-pointer ${
                      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#090D18] border-slate-800 text-white'
                    }`}
                  >
                    {DOMAIN_PRESETS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Family Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {CANONICAL_FAMILIES.map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setSelectedFamily(fam)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      selectedFamily === fam
                        ? 'bg-teal-600 text-white shadow-xs'
                        : isLight
                        ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {fam}
                  </button>
                ))}
              </div>
            </div>

            {/* 50 MASTER BLUEPRINT CARDS (REQUESTED USER FORMAT) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlueprints.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className={`border rounded-3xl p-6 flex flex-col justify-between space-y-4 transition-all duration-200 group ${
                    isLight
                      ? 'bg-white hover:bg-slate-50/50 border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-xl hover:shadow-teal-500/10'
                      : 'bg-[#090D18] hover:bg-[#0c1222] border-slate-800 hover:border-teal-500/40 shadow-md hover:shadow-xl hover:shadow-teal-500/10'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Header Strip with Number Circle */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-black text-sm shrink-0 ${
                          isLight
                            ? 'border-teal-200 bg-teal-50 text-teal-700'
                            : 'border-teal-500/30 bg-teal-500/10 text-teal-300'
                        }`}>
                          {tmpl.id}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            ARCH {tmpl.id} • {tmpl.level}
                          </div>
                          <h3 className={`text-base font-black truncate transition-colors ${
                            isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'
                          }`}>
                            {tmpl.name}
                          </h3>
                        </div>
                      </div>

                      <span className={`text-[9.5px] font-mono font-extrabold px-2.5 py-1 rounded-full border uppercase shrink-0 ${
                        isLight
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      }`}>
                        {tmpl.family}
                      </span>
                    </div>

                    {/* Purpose Description */}
                    <p className={`text-xs leading-relaxed line-clamp-3 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {tmpl.primaryPurpose}
                    </p>

                    {/* Target Scope / Examples */}
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <strong className={isLight ? 'text-slate-700' : 'text-slate-300'}>Target Systems:</strong> {tmpl.examples}
                    </div>

                    {/* KEY ARCHITECTURAL TIERS & COMPONENT PODS */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        <span>KEY ARCHITECTURAL TIERS &amp; PODS ({tmpl.keyComponents.length})</span>
                        <span className="text-emerald-500 font-extrabold">100% CERTIFIED</span>
                      </div>

                      <div className="space-y-1.5">
                        {tmpl.keyComponents.slice(0, 4).map((comp, cIdx) => (
                          <div
                            key={cIdx}
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold ${
                              isLight
                                ? 'bg-slate-50/80 border-slate-100 text-slate-700'
                                : 'bg-slate-900/60 border-slate-800 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`w-5 h-5 rounded-md font-mono font-bold text-[10px] flex items-center justify-center shrink-0 ${
                                isLight ? 'bg-teal-100 text-teal-800' : 'bg-teal-500/20 text-teal-300'
                              }`}>
                                0{cIdx + 1}
                              </span>
                              <span className="truncate">{comp}</span>
                            </div>
                            <span className={`text-[9.5px] font-mono shrink-0 px-2 py-0.5 rounded border ${
                              isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}>
                              Tier {cIdx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2.5">
                    <button
                      onClick={() => setActivePreviewBlueprint(tmpl)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-teal-500" />
                      <span>Preview Architecture</span>
                    </button>

                    <button
                      onClick={() => handleLaunchStudioWithBlueprint(tmpl)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-md shadow-teal-500/20 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate in DiaGen</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* INTERACTIVE BLUEPRINT PREVIEW MODAL */}
        {/* ========================================================================= */}
        {activePreviewBlueprint && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#090D18] border border-slate-800 rounded-3xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-black text-white truncate">
                        {activePreviewBlueprint.name}
                      </h2>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                        #{activePreviewBlueprint.id}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {activePreviewBlueprint.family} ({activePreviewBlueprint.level})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {activePreviewBlueprint.primaryPurpose}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLaunchStudioWithBlueprint(activePreviewBlueprint)}
                    className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-teal-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open in DiaGen Studio</span>
                  </button>

                  <button
                    onClick={() => setActivePreviewBlueprint(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer text-lg font-bold"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Vector Canvas Preview */}
              <div className="flex-1 overflow-hidden bg-white relative">
                <DiagramViewerRenderSafe
                  xml={activePreviewBlueprint.generateXml(selectedDomain)}
                  theme={theme as any}
                  zoomLevel={100}
                />
              </div>
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
                        <span>All 50 Canonical Blueprints</span>
                      </span>
                      <button
                        onClick={() => setViewMode('catalog')}
                        className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Full Catalog</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                      {CANONICAL_TEMPLATES.map((tmpl) => (
                        <button
                          key={tmpl.id}
                          onClick={() => {
                            setSelectedArchType(`canonical_${tmpl.id}`);
                            const xml = tmpl.generateXml(selectedDomain);
                            setCurrentXml(xml);
                            setActiveVersionNumber(prev => prev + 1);
                          }}
                          className={`w-full text-left p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            selectedArchType === `canonical_${tmpl.id}` || selectedArchType === tmpl.id
                              ? 'bg-teal-600 text-white font-extrabold shadow-sm'
                              : isLight
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                              : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-200'
                          }`}
                        >
                          <span className="truncate">{tmpl.name}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                            selectedArchType === `canonical_${tmpl.id}` || selectedArchType === tmpl.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
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
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
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
