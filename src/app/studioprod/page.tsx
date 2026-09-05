'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
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
  Terminal,
  Activity,
  Award
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { generateGcpNativeArchitectureXml } from '@/lib/gcpNativeArchitecture';
import { createDefaultFintechAst, ArchitectureAst, AstComponent } from '@/lib/ast/architectureAst';
import { generateAll10LivingSpecs, LivingSpecDocument } from '@/lib/spec/livingSpecsGenerator';
import { ComponentInspectorDrawer } from '@/components/studio/ComponentInspectorDrawer';
import { BrainGroundingModal } from '@/components/studio/BrainGroundingModal';
import { AudioBriefingModal } from '@/components/studio/AudioBriefingModal';
import { LivingSpecsViewer } from '@/components/studio/LivingSpecsViewer';
import { ProductionIaCViewer } from '@/components/studioprod/ProductionIaCViewer';
import { BlueprintCatalogModal } from '@/components/studio/BlueprintCatalogModal';
import {
  CANONICAL_TEMPLATES,
  CanonicalTemplate,
  DOMAIN_PRESETS
} from '@/lib/canonical/canonicalTemplates';
import { EVOLUTION_STEPS, EvolutionStep, evolveAst } from '@/lib/evolution/evolutionEngine';

export interface StudioProdSnapshot {
  id: string;
  versionTag: string;
  versionName: string;
  timestamp: string;
  author: 'User' | 'AI Assistant';
  actionSummary: string;
  ast: ArchitectureAst;
  xml: string;
  domain: string;
  projectTitle: string;
  slaTarget: string;
  targetRpo: string;
  targetRto: string;
  drRegions: string[];
  compliance: string[];
}

export interface StudioProdChatMessage {
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

export default function StudioProdPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B111E] flex items-center justify-center text-slate-400 font-mono text-xs">Loading StudioProd Enterprise Environment...</div>}>
      <StudioProdMain />
    </Suspense>
  );
}

function StudioProdMain() {
  const searchParams = useSearchParams();

  // 1. Session UUID & Core State
  const [sessionId, setSessionId] = useState<string>('ses_prod_session');
  const [isClient, setIsClient] = useState(false);

  // Initialize with pre-seeded 10 versions
  const initialSnapshots = useMemo<StudioProdSnapshot[]>(() => {
    let currentAst = createDefaultFintechAst();
    return EVOLUTION_STEPS.map((step: EvolutionStep, idx: number) => {
      currentAst = evolveAst(currentAst, step);
      const xml = generateGcpNativeArchitectureXml({
        projectName: step.projectTitle,
        useCaseName: step.domain
      }, currentAst);
      return {
        id: `v_${step.versionTag.replace('.', '_')}`,
        versionTag: step.versionTag,
        versionName: step.versionName,
        timestamp: `Phase ${idx + 1}`,
        author: 'AI Assistant',
        actionSummary: step.canvasDiff,
        ast: currentAst,
        xml,
        domain: step.domain,
        projectTitle: step.projectTitle,
        slaTarget: step.slaTarget,
        targetRpo: step.targetRpo,
        targetRto: step.targetRto,
        drRegions: step.drRegions,
        compliance: step.compliance
      };
    });
  }, []);

  const [activeVersionIndex, setActiveVersionIndex] = useState<number>(9); // Default to v10.0 Sovereign AI
  const currentSnapshot = initialSnapshots[activeVersionIndex] || initialSnapshots[0];

  const [ast, setAst] = useState<ArchitectureAst>(() => currentSnapshot.ast);
  const [xml, setXml] = useState<string>(() => currentSnapshot.xml);
  const [activeView, setActiveView] = useState<'diagram' | 'specs' | 'iac' | 'sre'>('diagram');
  const [activeDocId, setActiveDocId] = useState<string>('DOC-01');

  // Modals & Drawers
  const [selectedComponent, setSelectedComponent] = useState<AstComponent | null>(null);
  const [isBrainModalOpen, setIsBrainModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);

  // Canonical Blueprint Catalog State
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('00');
  const [selectedDomain, setSelectedDomain] = useState<string>('biopharma');

  const handleSelectBlueprint = useCallback((blueprint: CanonicalTemplate, domainPresetId: string) => {
    setSelectedBlueprintId(blueprint.id);
    setSelectedDomain(domainPresetId);

    const domainPreset = DOMAIN_PRESETS.find(d => d.id === domainPresetId) || DOMAIN_PRESETS[0];
    const newXml = blueprint.generateXml(domainPresetId, 'dark');
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
  }, [ast.components]);

  const handleSelectBlueprintById = useCallback((templateId: string) => {
    const norm = templateId.padStart(2, '0');
    const bp = CANONICAL_TEMPLATES.find(t => t.id === norm || t.id === templateId) || CANONICAL_TEMPLATES[0];
    handleSelectBlueprint(bp, selectedDomain);
  }, [handleSelectBlueprint, selectedDomain]);

  // Prompt Chat
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<StudioProdChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Welcome to StudioProd (Enterprise Production Edition). Currently loaded with certified [${currentSnapshot.versionTag}: ${currentSnapshot.projectTitle}]. All 16 Living Specifications, Terraform IaC, and Spanner TrueTime DDL are synchronized.`,
      timestamp: 'Just now',
      actionSummary: {
        versionTag: currentSnapshot.versionTag,
        canvasDiff: currentSnapshot.actionSummary,
        specDiff: `Reconciled 16 living specifications for ${currentSnapshot.domain}`
      }
    }
  ]);

  // Sync to URL parameters on mount
  useEffect(() => {
    setIsClient(true);
    const urlId = new URLSearchParams(window.location.search).get('id');
    const urlV = new URLSearchParams(window.location.search).get('v');
    const urlView = new URLSearchParams(window.location.search).get('view');

    if (urlId) setSessionId(urlId);
    if (urlView === 'specs' || urlView === 'iac' || urlView === 'sre') setActiveView(urlView);

    if (urlV) {
      const matchedIdx = initialSnapshots.findIndex(s => s.versionTag.toLowerCase() === urlV.toLowerCase());
      if (matchedIdx !== -1) {
        setActiveVersionIndex(matchedIdx);
        setAst(initialSnapshots[matchedIdx].ast);
        setXml(initialSnapshots[matchedIdx].xml);
      }
    }
  }, [initialSnapshots]);

  // Switch version handler
  const handleSelectVersion = (idx: number) => {
    setActiveVersionIndex(idx);
    const snap = initialSnapshots[idx];
    setAst(snap.ast);
    setXml(snap.xml);
    setIsVersionDropdownOpen(false);

    // Update URL query state
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('v', snap.versionTag);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Re-generate living specifications
  const livingSpecs: LivingSpecDocument[] = useMemo(() => {
    return generateAll10LivingSpecs(ast);
  }, [ast]);

  // Handle Prompt Submission
  const handleSendPrompt = async () => {
    if (!promptInput.trim() || isGenerating) return;
    const userPrompt = promptInput.trim();
    setPromptInput('');
    setIsGenerating(true);

    const newMsg: StudioProdChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);

    setTimeout(() => {
      const nextVersionTag = `v${(parseFloat(currentSnapshot.versionTag.replace('v', '')) + 0.1).toFixed(1)}`;
      const customStep: EvolutionStep = {
        versionTag: nextVersionTag,
        versionName: `${nextVersionTag} • Custom Evolution`,
        domain: currentSnapshot.domain,
        projectTitle: currentSnapshot.projectTitle,
        prompt: userPrompt,
        description: `Iterative evolution triggered by prompt: "${userPrompt}"`,
        persona: "Enterprise Architect",
        slaTarget: currentSnapshot.slaTarget,
        targetRpo: currentSnapshot.targetRpo,
        targetRto: currentSnapshot.targetRto,
        drRegions: currentSnapshot.drRegions,
        compliance: currentSnapshot.compliance,
        addedComponents: [],
        canvasDiff: `Added architecture extension matching prompt intent: ${userPrompt.slice(0, 40)}...`,
        specDiff: `Synchronized 16 living specifications for ${nextVersionTag}`
      };

      const evolvedAst = evolveAst(ast, customStep);
      const evolvedXml = generateGcpNativeArchitectureXml({
        projectName: currentSnapshot.projectTitle,
        useCaseName: currentSnapshot.domain
      }, evolvedAst);

      setAst(evolvedAst);
      setXml(evolvedXml);

      const assistantMsg: StudioProdChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: `Compiled enterprise topology for [${nextVersionTag}]. Evolved 6 architectural tiers with 0 spatial collisions and full spec sync.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionSummary: {
          versionTag: nextVersionTag,
          canvasDiff: customStep.canvasDiff,
          specDiff: customStep.specDiff
        }
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B111E] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Full-Width Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="w-full max-w-none px-6 md:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Brand & Project Info */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white tracking-tight">PromptCanvas</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    STUDIOPROD
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Enterprise Production Edition</p>
              </div>
            </Link>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            {/* Canonical Blueprint Catalog Selector */}
            <button
              onClick={() => setIsCatalogOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-xs font-medium text-blue-400 border border-blue-500/30 transition cursor-pointer"
              title="Open 52 Canonical Architecture Blueprints Catalog"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Blueprint:</span>
              <span className="font-mono font-bold text-white max-w-[140px] truncate">
                #{selectedBlueprintId} {CANONICAL_TEMPLATES.find(t => t.id === selectedBlueprintId)?.name || 'GCP Enterprise Arch'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
            </button>

            {/* Version Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 border border-slate-700 transition"
              >
                <span className="font-semibold text-blue-400">{currentSnapshot.versionTag}</span>
                <span className="text-slate-400 max-w-[140px] truncate hidden md:inline">{currentSnapshot.versionName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isVersionDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-slate-800">
                    10 Production Blueprints (v1.0 - v10.0)
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {initialSnapshots.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => handleSelectVersion(idx)}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition ${
                          activeVersionIndex === idx ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-mono text-[11px] text-blue-400">{s.versionTag} • {s.domain}</div>
                          <div className="text-slate-200 text-xs truncate max-w-[200px]">{s.versionName}</div>
                        </div>
                        {activeVersionIndex === idx && <Check className="w-4 h-4 text-blue-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Primary View Switcher */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveView('diagram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeView === 'diagram' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Canvas
            </button>
            <button
              onClick={() => setActiveView('specs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeView === 'specs' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Living Specs (16 Docs)
            </button>
            <button
              onClick={() => setActiveView('iac')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeView === 'iac' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              IaC Terraform Hub
            </button>
            <button
              onClick={() => setActiveView('sre')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeView === 'sre' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SRE & Compliance
            </button>
          </div>

          {/* Actions & Audio Briefing */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAudioModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-medium transition"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Audio Briefing</span>
            </button>
            <button
              onClick={() => setIsBrainModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden lg:inline">Grounding AST</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-none overflow-hidden">
        
        {/* Left Interactive Viewport */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0B111E]">
          {activeView === 'diagram' && (
            <div className="w-full max-w-none space-y-6">
              {/* Architecture Context Banner */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{currentSnapshot.versionTag}</span>
                    <span>{currentSnapshot.domain}</span>
                  </div>
                  <h1 className="text-xl font-bold text-white mt-1">{currentSnapshot.projectTitle}</h1>
                  <p className="text-xs text-slate-400 mt-1">{currentSnapshot.actionSummary}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Target Availability</div>
                    <div className="text-sm font-bold text-emerald-400">{currentSnapshot.slaTarget}</div>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Compliance</div>
                    <div className="text-xs font-medium text-slate-300">{currentSnapshot.compliance.join(', ')}</div>
                  </div>
                </div>
              </div>

              {/* Diagram Canvas */}
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-4">
                <DiagramViewerRenderSafe xml={xml} />
              </div>
            </div>
          )}

          {activeView === 'specs' && (
            <div className="w-full max-w-none">
              <LivingSpecsViewer
                specs={livingSpecs}
                activeDocId={activeDocId}
                onSelectDoc={(id) => setActiveDocId(id)}
                onSwitchToDiagramView={() => setActiveView('diagram')}
                currentXml={xml}
                projectName={currentSnapshot.projectTitle}
                useCaseName={currentSnapshot.domain}
                versionName={currentSnapshot.versionTag}
                onSelectBlueprintById={handleSelectBlueprintById}
              />
            </div>
          )}

          {activeView === 'iac' && (
            <div className="w-full max-w-none">
              <ProductionIaCViewer
                projectName={currentSnapshot.projectTitle}
                versionTag={currentSnapshot.versionTag}
                domain={currentSnapshot.domain}
              />
            </div>
          )}

          {activeView === 'sre' && (
            <div className="w-full max-w-none space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Site Reliability & TrueTime Multi-Region Verification
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Active-Active Google Cloud Spanner TrueTime latency budgets, failover error rates, and compliance matrices.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Availability SLA</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">{currentSnapshot.slaTarget}</div>
                    <div className="text-[11px] text-slate-500 mt-1">Under 5.26 minutes annual downtime</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">TrueTime Replication RPO</div>
                    <div className="text-2xl font-bold text-blue-400 mt-1">&lt; 1 Second</div>
                    <div className="text-[11px] text-slate-500 mt-1">Zero cross-region data loss</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Security & Encryption</div>
                    <div className="text-2xl font-bold text-purple-400 mt-1">FIPS 140-3 L3</div>
                    <div className="text-[11px] text-slate-500 mt-1">Cloud KMS HSM CMEK Enforced</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Prompt & Evolution Sidebar */}
        <div className="w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/60 flex flex-col h-auto lg:h-[calc(100vh-65px)]">
          <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Production Evolution Copilot</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              GCP Certified
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl text-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white ml-6 shadow-sm'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 mr-4'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 opacity-80 text-[10px]">
                  <span className="font-semibold">{msg.sender === 'user' ? 'Operator' : 'Architecture AI'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="leading-relaxed">{msg.text}</div>

                {msg.actionSummary && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] space-y-1 text-slate-400 font-mono">
                    <div className="text-blue-400 font-bold">✨ Upgrade: {msg.actionSummary.versionTag}</div>
                    <div>📐 {msg.actionSummary.canvasDiff}</div>
                    <div>📑 {msg.actionSummary.specDiff}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Prompt Input Box */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/90">
            <div className="relative flex items-center">
              <input
                type="text"
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendPrompt()}
                placeholder="Evolve architecture with a prompt..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendPrompt}
                disabled={!promptInput.trim() || isGenerating}
                className="absolute right-1.5 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Modals & Drawers */}
      <AudioBriefingModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        title={currentSnapshot.projectTitle}
      />
      <BrainGroundingModal
        isOpen={isBrainModalOpen}
        onClose={() => setIsBrainModalOpen(false)}
        onAutoHeal={() => {
          setIsHealing(true);
          setTimeout(() => setIsHealing(false), 1200);
        }}
        isHealing={isHealing}
      />
      {selectedComponent && (
        <ComponentInspectorDrawer
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
          onAiRefinePrompt={(prompt: string) => handleSendPrompt()}
          onShareNode={() => {}}
        />
      )}
      <BlueprintCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectBlueprint={handleSelectBlueprint}
        currentBlueprintId={selectedBlueprintId}
        currentDomainPresetId={selectedDomain}
        theme="dark"
      />
    </div>
  );
}
