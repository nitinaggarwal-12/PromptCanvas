'use client';

import React, { useState, useMemo, Suspense } from 'react';
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
  Zap
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

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendation?: {
    projectName: string;
    useCaseName: string;
    domain: string;
    blueprintId: string;
    archetypeId: ArchetypeId;
    summary: string;
    rationale: string;
  };
}

function StudioContent() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const searchParams = useSearchParams();
  const router = useRouter();

  // Studio Mode: 'diagrams' | 'documents' | 'both'
  const initialMode = (searchParams.get('mode') as 'diagrams' | 'documents' | 'both') || 'both';
  const [studioMode, setStudioMode] = useState<'diagrams' | 'documents' | 'both'>(initialMode);

  // Interaction Mode: 'chat' (AI Co-pilot) | 'manual' (Direct Form Cockpit)
  const [interactionMode, setInteractionMode] = useState<'chat' | 'manual'>('chat');

  // Preview tab on right pane: 'diagram' | 'spec'
  const [previewTab, setPreviewTab] = useState<'diagram' | 'spec'>('diagram');

  // Project & Use Case State
  const [projectName, setProjectName] = useState<string>('Bio-Pharma Clinical Platform');
  const [useCaseName, setUseCaseName] = useState<string>('Genomics Analysis & Regulatory AI');
  const [projectTitle, setProjectTitle] = useState<string>('Bio-Pharma Clinical Platform — Genomics Analysis & Regulatory AI');
  const [selectedDomain, setSelectedDomain] = useState<string>(searchParams.get('domain') || 'biopharma');
  const [projectScopePrompt, setProjectScopePrompt] = useState<string>(
    'An enterprise-grade decentralized clinical genomics analysis and regulatory pharmacovigilance platform with automated FDA electronic signature audits, Spanner knowledge graphs, multi-region active-active disaster recovery, and zero-trust VPC Service Perimeters.'
  );

  // Blueprint & Archetype selection
  const initialBp = searchParams.get('blueprint') || '01';
  const [selectedDiagramFamily, setSelectedDiagramFamily] = useState<string>('All');
  const [selectedDiagramTemplateId, setSelectedDiagramTemplateId] = useState<string>(initialBp);
  const initialDoc = (searchParams.get('doc') as ArchetypeId) || 'sdd';
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId>(initialDoc);

  // Generation & Status State
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [generationSuccess, setGenerationSuccess] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  // Chat State
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '👋 Welcome to PromptCanvas Launch Studio! Describe your system or use case in natural language. I will analyze your requirements, recommend the optimal 16:9 architecture blueprint and document archetype, and draft the complete specification for you.',
      timestamp: 'Just now'
    }
  ]);

  // Filter templates based on family
  const filteredTemplates = useMemo(() => {
    if (selectedDiagramFamily === 'All' || selectedDiagramFamily === 'all') {
      return CANONICAL_TEMPLATES;
    }
    return CANONICAL_TEMPLATES.filter((t) => t.family.toLowerCase() === selectedDiagramFamily.toLowerCase());
  }, [selectedDiagramFamily]);

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

  // Active Archetype Metadata
  const activeArchetypeMeta: DocArchetypeMeta = useMemo(() => {
    const found = DOC_ARCHETYPES_META.find((a) => a.id === selectedArchetypeId);
    return found || DOC_ARCHETYPES_META[2];
  }, [selectedArchetypeId]);

  // Live Diagram XML for Selected Blueprint
  const liveStudioDiagramXml = useMemo(() => {
    const tpl = CANONICAL_TEMPLATES.find((t) => t.id === selectedDiagramTemplateId);
    if (tpl) {
      return tpl.generateXml(selectedDomain, isLight ? 'light' : 'dark');
    }
    return CANONICAL_TEMPLATES[0].generateXml(selectedDomain, isLight ? 'light' : 'dark');
  }, [selectedDiagramTemplateId, selectedDomain, isLight]);

  // AI Chatbot Intent Analysis & Recommendation
  const handleSendChatMessage = async (overrideText?: string) => {
    const messageText = (overrideText || chatInput).trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: messageText,
      timestamp: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!overrideText) setChatInput('');
    setIsAiThinking(true);

    // Heuristic & Semantic Intelligence Engine
    setTimeout(() => {
      const textLower = messageText.toLowerCase();
      let detectedDom = 'saas';
      let recBp = '01';
      let recDoc: ArchetypeId = 'sdd';
      let pName = 'Enterprise System';
      let uName = 'Cloud Architecture Platform';
      let summary = '';
      let rationale = '';

      if (textLower.includes('drone') || textLower.includes('aviation') || textLower.includes('telemetry') || textLower.includes('utm') || textLower.includes('flight')) {
        detectedDom = 'manufacturing';
        recBp = '15';
        recDoc = 'sdd';
        pName = 'AeroNode Aviation Mesh';
        uName = 'Autonomous Drone Delivery & Airspace UTM';
        summary = 'Real-time 5G UTM airspace collision avoidance and automated micro-hub robotic payload dispatch.';
        rationale = 'Selected Blueprint #15 (Network Topology & Edge Mesh) with SDD (System Design Document) for sub-20ms distributed telemetry.';
      } else if (textLower.includes('ev') || textLower.includes('grid') || textLower.includes('energy') || textLower.includes('battery') || textLower.includes('charging')) {
        detectedDom = 'energy';
        recBp = '29';
        recDoc = 'fdd';
        pName = 'VoltGrid Energy Hub';
        uName = 'Smart EV Microgrid & Battery Storage BESS';
        summary = 'OCPP 2.0.1 and ISO 15118 EV fast-charging dynamic load balancing across local BESS and solar microgrids.';
        rationale = 'Selected Blueprint #29 (Decentralized Lakehouse & SCADA Telemetry) with FDD for real-time electrical grid dispatching.';
      } else if (textLower.includes('pharma') || textLower.includes('fda') || textLower.includes('clinical') || textLower.includes('genom') || textLower.includes('bio')) {
        detectedDom = 'biopharma';
        recBp = '01';
        recDoc = 'brd';
        pName = 'Bio-Pharma Clinical Platform';
        uName = 'FDA 21 CFR Part 11 PV Platform';
        summary = 'Decentralized clinical genomics and regulatory pharmacovigilance with automated GxP audit ledgers.';
        rationale = 'Selected Blueprint #01 (System Context & Stakeholder Topology) with BRD for FDA 21 CFR Part 11 compliance approval.';
      } else if (textLower.includes('fraud') || textLower.includes('payment') || textLower.includes('iso') || textLower.includes('bank') || textLower.includes('fintech')) {
        detectedDom = 'fintech';
        recBp = '23';
        recDoc = 'threat_model';
        pName = 'NexusFin Global Wealth';
        uName = 'Autonomous Payments & Real-Time Fraud Hub';
        summary = 'Sub-5ms pre-trade risk evaluation, ISO 20022 messaging, Spanner double-entry ledger, and real-time fraud clustering.';
        rationale = 'Selected Blueprint #23 (Zero-Trust VPC Perimeter & Payment Ingress) with STRIDE Threat Model for banking audit sign-off.';
      } else if (textLower.includes('rag') || textLower.includes('agent') || textLower.includes('llm') || textLower.includes('vertex') || textLower.includes('ai')) {
        detectedDom = 'saas';
        recBp = '41';
        recDoc = 'tdd';
        pName = 'CortexAI Enterprise Studio';
        uName = 'Vertex Multi-Agent Orchestration & RAG';
        summary = 'Multi-agent cognitive orchestration with Vertex AI Search grounding, Redis semantic cache, and vector embeddings.';
        rationale = 'Selected Blueprint #41 (Multi-Agent Swarm Orchestrator) with TDD (Technical Design Document) for cognitive latency optimization.';
      } else {
        detectedDom = 'saas';
        recBp = '08';
        recDoc = 'sdd';
        pName = 'Enterprise Cloud System';
        uName = 'Microservices & Event Mesh';
        summary = messageText.slice(0, 120);
        rationale = 'Recommended Blueprint #08 (Component Architecture) and SDD (System Design Document) to provide end-to-end multi-tier clarity.';
      }

      const assistantMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: `I have analyzed your request. Based on system intelligence, here is the optimal architectural blueprint and specification framework for **${pName}**:`,
        timestamp: 'Just now',
        recommendation: {
          projectName: pName,
          useCaseName: uName,
          domain: detectedDom,
          blueprintId: recBp,
          archetypeId: recDoc,
          summary,
          rationale
        }
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
      setIsAiThinking(false);
    }, 900);
  };

  // Apply AI Recommendation
  const applyRecommendation = (rec: NonNullable<ChatMessage['recommendation']>) => {
    setProjectName(rec.projectName);
    setUseCaseName(rec.useCaseName);
    setProjectTitle(`${rec.projectName} — ${rec.useCaseName}`);
    setSelectedDomain(rec.domain);
    setSelectedDiagramTemplateId(rec.blueprintId);
    setSelectedArchetypeId(rec.archetypeId);
    setProjectScopePrompt(rec.summary);
    setGenerationSuccess(true);
    setTimeout(() => setGenerationSuccess(false), 4000);
  };

  return (
    <div className={`flex min-h-screen ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060911] text-slate-100'}`}>
      <UnifiedAppSidebar />

      <main className="flex-1 min-w-0 flex flex-col pt-4 pb-16">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          
          {/* TOP HEADER: BREADCRUMB & SCENARIO SELECTOR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Link href="/" className="hover:text-teal-500 transition-colors">PromptCanvas</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="font-bold text-teal-600 dark:text-teal-400">Launch Studio (PRO)</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Layers className="w-7 h-7 text-teal-500" />
                  AI Architecture &amp; Specification Studio
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                  Conversational &bull; Gemini 3.7
                </span>
              </div>
            </div>

            {/* 3 SCENARIO MODE SELECTOR */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/50 dark:border-slate-800 shadow-inner">
              <button
                type="button"
                onClick={() => setStudioMode('diagrams')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  studioMode === 'diagrams'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>1. Diagrams</span>
              </button>
              <button
                type="button"
                onClick={() => setStudioMode('documents')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  studioMode === 'documents'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Documents</span>
              </button>
              <button
                type="button"
                onClick={() => setStudioMode('both')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  studioMode === 'both'
                    ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>3. Both (Unified)</span>
              </button>
            </div>
          </div>

          {/* MAIN SPLIT-SCREEN COCKPIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN (6 COLS): AI CHATBOT CO-PILOT & CONFIGURATION COCKPIT */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Interaction Mode Toggle: Chat vs Manual Cockpit */}
              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInteractionMode('chat')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      interactionMode === 'chat'
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>🤖 Conversational AI Co-Pilot</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInteractionMode('manual')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      interactionMode === 'manual'
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>🎛️ Manual Studio Cockpit</span>
                  </button>
                </div>
                <span className="text-[10px] font-mono text-slate-400 pr-2">
                  {interactionMode === 'chat' ? 'System Intelligence Active' : 'Direct Parameter Control'}
                </span>
              </div>

              {/* CONVERSATIONAL AI CHATBOT PANEL */}
              {interactionMode === 'chat' && (
                <div className={`p-5 rounded-3xl border shadow-sm space-y-4 flex flex-col ${
                  isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-xl'
                }`}>
                  <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-teal-500" />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                        Architectural Chatbot &bull; Conversational Assistant
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Gemini 3.7 Online
                    </span>
                  </div>

                  {/* Chat Messages Container */}
                  <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`p-3.5 rounded-2xl text-xs max-w-[90%] leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-teal-600 text-white font-medium rounded-tr-xs'
                              : isLight
                              ? 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80'
                              : 'bg-slate-900 text-slate-200 rounded-tl-xs border border-slate-800'
                          }`}
                        >
                          <p>{msg.text}</p>

                          {/* Recommendation Card */}
                          {msg.recommendation && (
                            <div className="mt-3 p-3 rounded-xl bg-white dark:bg-[#070A13] border border-teal-500/40 space-y-2 text-left">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider text-teal-600">
                                  ⚡ AI System Blueprint Recommendation
                                </span>
                                <span className="text-[10px] font-mono font-bold text-slate-400">
                                  #{msg.recommendation.blueprintId} &bull; {msg.recommendation.archetypeId.toUpperCase()}
                                </span>
                              </div>
                              <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                                {msg.recommendation.projectName} — {msg.recommendation.useCaseName}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                {msg.recommendation.rationale}
                              </div>
                              <button
                                type="button"
                                onClick={() => applyRecommendation(msg.recommendation!)}
                                className="w-full mt-1.5 py-1.5 px-3 rounded-lg text-xs font-black bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-sm hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Zap className="w-3 h-3 fill-current" />
                                <span>Apply to Cockpit &amp; Preview Architecture</span>
                              </button>
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                      </div>
                    ))}

                    {isAiThinking && (
                      <div className="flex items-center gap-2 text-xs text-teal-600 font-bold p-3">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Architect is analyzing topology &amp; recommending blueprints...</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Starter Pills */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      ⚡ Quick Scenario Prompts:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: '🚁 Drone Delivery UTM', prompt: 'Architect a nationwide drone delivery network with real-time 5G UTM airspace telemetry and FAA audit logging.' },
                        { label: '⚡ Smart EV Microgrid', prompt: 'Architect a decentralized smart EV fast-charging network with OCPP 2.0.1 and BESS battery storage load balancing.' },
                        { label: '🧬 Bio-Pharma Clinical', prompt: 'Architect an FDA 21 CFR Part 11 pharmacovigilance platform with automated adverse event triage and GxP audit ledgers.' },
                        { label: '💳 Real-Time Fraud Hub', prompt: 'Architect a high-throughput ISO 20022 banking payment gateway with sub-5ms pre-trade risk and real-time fraud clustering.' },
                        { label: '🧠 Vertex AI RAG Swarm', prompt: 'Architect an enterprise Vertex AI multi-agent orchestration platform with Redis semantic caching and vector grounding.' },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => handleSendChatMessage(item.prompt)}
                          className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                            isLight
                              ? 'bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-200'
                              : 'bg-slate-900 hover:bg-teal-950/40 hover:text-teal-400 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chat Input Box */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendChatMessage();
                      }}
                      placeholder="Describe your system requirements or ask for architectural guidance..."
                      className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => handleSendChatMessage()}
                      disabled={!chatInput.trim() || isAiThinking}
                      className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              )}

              {/* MANUAL CONFIGURATION COCKPIT CARD */}
              <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-xl'
              }`}>
                {/* Header & Categories */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800">
                      Step 1 &bull; Architecture Specification
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {studioMode === 'diagrams' 
                        ? `${filteredTemplates.length} Blueprints in Category (${CANONICAL_TEMPLATES.length} Total)` 
                        : '17 Archetypes Available'}
                    </span>
                  </div>

                  {/* Category Filter Pills / Archetype Selector */}
                  {studioMode === 'diagrams' ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {CANONICAL_FAMILIES.map((fam) => (
                        <button
                          key={fam}
                          type="button"
                          onClick={() => {
                            setSelectedDiagramFamily(fam);
                            const matching = fam === 'All' 
                              ? CANONICAL_TEMPLATES 
                              : CANONICAL_TEMPLATES.filter((t) => t.family.toLowerCase() === fam.toLowerCase());
                            if (matching.length > 0 && !matching.some((t) => t.id === selectedDiagramTemplateId)) {
                              setSelectedDiagramTemplateId(matching[0].id);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            selectedDiagramFamily === fam
                              ? 'bg-teal-600 text-white shadow-sm font-black ring-2 ring-teal-400/30'
                              : isLight
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                          }`}
                        >
                          <span>{fam}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {DOC_ARCHETYPES_META.map((meta: DocArchetypeMeta) => (
                        <button
                          key={meta.id}
                          type="button"
                          onClick={() => setSelectedArchetypeId(meta.id)}
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

                {/* Primary Blueprint Selector (Diagrams Mode) */}
                {studioMode === 'diagrams' && (
                  <div className="p-3.5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-teal-600" />
                        <span className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-300">
                          Selected Blueprint:
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-400">
                        #{selectedDiagramTemplateId || '01'} &bull; {CANONICAL_TEMPLATES.find((t) => t.id === selectedDiagramTemplateId)?.name || 'System Context'}
                      </span>
                    </div>

                    {/* Dynamic Blueprint Quick Pills for Selected Category */}
                    <div className="flex flex-wrap items-center gap-1">
                      {filteredTemplates.slice(0, 8).map((bp: CanonicalTemplate) => (
                        <button
                          key={bp.id}
                          type="button"
                          onClick={() => setSelectedDiagramTemplateId(bp.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            selectedDiagramTemplateId === bp.id
                              ? 'bg-teal-600 text-white shadow-sm font-black'
                              : isLight
                              ? 'bg-white text-slate-700 hover:bg-teal-100 border border-slate-200'
                              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                          }`}
                        >
                          #{bp.id} {bp.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>

                    <select
                      value={selectedDiagramTemplateId}
                      onChange={(e) => setSelectedDiagramTemplateId(e.target.value)}
                      className={`w-full p-2 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer ${
                        isLight
                          ? 'bg-white border-teal-300 text-slate-900'
                          : 'bg-slate-900 border-teal-500/40 text-white'
                      }`}
                    >
                      {filteredTemplates.map((t: CanonicalTemplate) => (
                        <option key={t.id} value={t.id} className="py-1">
                          {t.id} - {t.name} [{t.family || 'Canonical'}]
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Connected Project Name & Use Case Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">
                      1. Project / Program Name
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => handleUpdateProjectName(e.target.value)}
                      placeholder="e.g. Bio-Pharma Clinical Platform"
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">
                      2. Architectural Use Case Name
                    </label>
                    <input
                      type="text"
                      value={useCaseName}
                      onChange={(e) => handleUpdateUseCaseName(e.target.value)}
                      placeholder="e.g. Genomics Analysis & Regulatory AI"
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Combined Architecture Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                      3. Combined Architecture Title
                    </label>
                    <span className="text-[10px] font-mono text-teal-600 font-bold">
                      Auto-Synced &bull; Diagram Brand Header
                    </span>
                  </div>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => handleUpdateProjectTitle(e.target.value)}
                    placeholder="e.g. Bio-Pharma Clinical Platform — Genomics Analysis & Regulatory AI"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                  />
                </div>

                {/* Scope Prompt */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                      4. Architectural Scope &amp; Topology Requirements
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      Gemini 3.7 &bull; Real-Time AST
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={projectScopePrompt}
                    onChange={(e) => setProjectScopePrompt(e.target.value)}
                    placeholder="Describe key Google Cloud services, data sources, security mandates, and integration endpoints..."
                    className={`w-full p-3 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                  />
                </div>

                {/* Domain Flavor */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">
                    5. Enterprise Domain Flavor
                  </label>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold text-teal-700 dark:text-teal-400 focus:outline-none cursor-pointer ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    {DOMAIN_PRESETS.map((d: { id: string; name: string }) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (6 COLS): LIVE 16:9 INTERACTIVE PREVIEW & SPEC VIEWER */}
            <div className="lg:col-span-6 sticky top-16 space-y-4">
              <div className={`rounded-3xl border shadow-xl overflow-hidden ${
                isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-2xl'
              }`}>
                
                {/* Preview Window Header Bar */}
                <div className={`px-5 py-3.5 border-b flex items-center justify-between ${
                  isLight ? 'bg-slate-50/80 border-slate-100' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 ml-2 font-mono truncate">
                      {studioMode === 'diagrams' && `Live Architecture Preview • Blueprint #${selectedDiagramTemplateId || '01'}`}
                      {studioMode === 'documents' && `Live Specification Document • ${activeArchetypeMeta.name}`}
                      {studioMode === 'both' && `Unified Architecture & Spec • ${projectTitle}`}
                    </span>
                  </div>

                  {/* Preview Tabs Switcher (when in Both mode) */}
                  {studioMode === 'both' && (
                    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={() => setPreviewTab('diagram')}
                        className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                          previewTab === 'diagram' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        📐 16:9 Blueprint
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab('spec')}
                        className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                          previewTab === 'spec' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        📑 Spec Document
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800">
                    16:9 Vector GCP
                  </span>
                </div>

                {/* Viewport Content */}
                <div className="p-3 bg-white dark:bg-[#070A13] flex items-center justify-center min-h-[480px] h-[520px] max-h-[580px] overflow-hidden">
                  {(studioMode === 'diagrams' || (studioMode === 'both' && previewTab === 'diagram')) ? (
                    <div className="w-full h-full min-h-[460px] flex items-center justify-center">
                      <DiagramViewerRenderSafe
                        key={`studio_viewport_${selectedDiagramTemplateId}_${selectedDomain}_${isLight ? 'light' : 'dark'}_${projectTitle.length}_${projectName.length}_${useCaseName.length}`}
                        diagramId={selectedDiagramTemplateId}
                        diagramType={`canonical_${selectedDiagramTemplateId || '01'}`}
                        xml={liveStudioDiagramXml}
                        aspectRatioId="16:9"
                        bgTheme={isLight ? 'light' : 'dark'}
                        useCaseName={useCaseName || projectTitle}
                      />
                    </div>
                  ) : (
                    <div className="w-full p-5 text-left space-y-4 max-h-[500px] overflow-y-auto">
                      <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider">{activeArchetypeMeta.name}</span>
                        <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">{projectTitle}</h3>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span>Audience: {activeArchetypeMeta.audience}</span>
                          <span>&bull;</span>
                          <span>{activeArchetypeMeta.blueprintPack.length} Attached Blueprints</span>
                        </div>
                      </div>
                      <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">1. Executive Summary &amp; Scope</h4>
                          <p className="leading-relaxed">{projectScopePrompt}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">2. Architecture Blueprint Pack</h4>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {activeArchetypeMeta.blueprintPack.map((bp: BlueprintSlot) => (
                              <div key={bp.slotTitle} className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                                <span className="font-bold text-teal-600">#{bp.recommendedTemplateId}</span> {bp.slotTitle}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Viewport Action Bar */}
                <div className={`px-5 py-3.5 border-t flex flex-wrap items-center justify-between gap-3 ${
                  isLight ? 'bg-slate-50/80 border-slate-100' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(liveStudioDiagramXml);
                        setCopiedXml(true);
                        setTimeout(() => setCopiedXml(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedXml ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedXml ? 'Copied XML!' : 'Copy XML'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSynthesizing(true);
                        setTimeout(() => {
                          setIsSynthesizing(false);
                          setGenerationSuccess(true);
                          setTimeout(() => setGenerationSuccess(false), 3000);
                        }, 1200);
                      }}
                      disabled={isSynthesizing}
                      className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-teal-500 via-sky-600 to-indigo-600 hover:opacity-90 text-white shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {isSynthesizing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Synthesizing Architecture...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>Synthesize Architecture Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
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
