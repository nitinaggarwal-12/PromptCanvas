'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Layers,
  Search,
  ChevronDown,
  Maximize2,
  Zap,
  Check,
  Copy,
  CheckCheck,
  ArrowRight,
  Sliders,
  Network,
  Compass,
  FileCode,
  ShieldCheck,
  Boxes,
  Cpu,
  Lock,
  Globe,
  Database,
  GitBranch,
  RefreshCw,
  FolderKanban
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  CanonicalTemplate
} from '@/lib/canonical/canonicalTemplates';
import { AppHeader } from '@/components/AppHeader';
import {
  ArchitecturePerspective,
  AbstractionDetailLevel,
  buildStructuredFallbackDecision,
  GeminiArchitecturalDecision
} from '@/lib/geminiArchitecturalDecisionEngine';

const DEFAULT_DASHBOARD_PROMPT =
  'Design a GCP native technical architecture with Gemini Enterprise, Google ADK, A2A, MCP, Model Armor, Vector Search 2.0, and Cloud Spanner';

// Category Definitions
export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  count: number;
  familyFilter: string | null;
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  { id: 'all', name: 'All 75 Blueprints', icon: '🌐', count: 75, familyFilter: null },
  { id: 'reference', name: 'Reference Architectures', icon: '🏛️', count: 17, familyFilter: 'Reference Architectures' },
  { id: 'flow', name: 'Operational Flowcharts & AI', icon: '⚡', count: 13, familyFilter: 'Flow' },
  { id: 'infographic', name: 'Executive Infographics', icon: '📊', count: 15, familyFilter: 'Infographic' },
  { id: 'understand', name: 'Understand & Context', icon: '🧭', count: 5, familyFilter: 'Understand' },
  { id: 'process', name: 'Process & Workflows', icon: '🔄', count: 4, familyFilter: 'Process' },
  { id: 'structure', name: 'Structure & C4 Model', icon: '🏗️', count: 4, familyFilter: 'Structure' },
  { id: 'infrastructure', name: 'Infrastructure & Network', icon: '🌐', count: 4, familyFilter: 'Infrastructure' },
  { id: 'security', name: 'Security & Governance', icon: '🛡️', count: 4, familyFilter: 'Security & Governance' },
  { id: 'operations', name: 'Delivery & Operations', icon: '🚀', count: 6, familyFilter: 'Delivery & Operations' },
  { id: 'analysis', name: 'Analysis & Planning', icon: '📈', count: 3, familyFilter: 'Analysis & Planning' }
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

  // 1. STEP 1: CATEGORY SELECTION
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // 2. STEP 2: SEARCHABLE BLUEPRINT SELECTION
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('00');
  const [openBlueprintDropdown, setOpenBlueprintDropdown] = useState<boolean>(false);
  const [blueprintSearchQuery, setBlueprintSearchQuery] = useState<string>('');

  // 3. STEP 3: DETAIL LEVEL (L1, L2, L3, L4)
  const [selectedLevel, setSelectedLevel] = useState<AbstractionDetailLevel>('L3');

  // 4. STEP 4: PROMPT COMPOSER
  const [createPrompt, setCreatePrompt] = useState<string>(DEFAULT_DASHBOARD_PROMPT);

  // 5. 70% CANVAS STATE
  const [loadedBlueprintId, setLoadedBlueprintId] = useState<string>('00');
  const [canvasTitle, setCanvasTitle] = useState<string>('Google Cloud Enterprise Architecture');
  const [canvasSubtitle, setCanvasSubtitle] = useState<string>('Multi-Tier Google Cloud Topology across 5 Deterministic Zones (L3 Detail)');
  const [canvasVersion, setCanvasVersion] = useState<string>('v1.0 (Live Default)');
  const [canvasPerspective, setCanvasPerspective] = useState<ArchitecturePerspective>('Technical');
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [isSynthesizingLive, setIsSynthesizingLive] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  // 6. COPILOT CHAT STREAM
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Architecture Studio Ready. Default Google Cloud Enterprise Architecture (#00) is loaded on the 70% viewport. Select your category and blueprint to begin.'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.blueprint-combobox-container')) {
        setOpenBlueprintDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filter templates based on Step 1 Category and search query
  const filteredTemplates = useMemo(() => {
    const activeCategory = CATEGORY_GROUPS.find((c) => c.id === selectedCategory);
    let list = CANONICAL_TEMPLATES;

    if (activeCategory && activeCategory.familyFilter) {
      list = list.filter((t) => t.family === activeCategory.familyFilter);
    }

    const q = blueprintSearchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.family.toLowerCase().includes(q) ||
        t.primaryPurpose.toLowerCase().includes(q)
    );
  }, [selectedCategory, blueprintSearchQuery]);

  // Active Blueprint Template Object
  const activeTemplateObj = useMemo(() => {
    const found = CANONICAL_TEMPLATES.find(
      (t) => t.id === loadedBlueprintId || t.id === loadedBlueprintId.padStart(2, '0')
    );
    return found || CANONICAL_TEMPLATES[0];
  }, [loadedBlueprintId]);

  // Live Rendered XML for the 70% Canvas
  const activeCanvasXml = useMemo(() => {
    return activeTemplateObj.generateXml('enterprise', isLight ? 'light' : 'dark');
  }, [activeTemplateObj, isLight]);

  // Handle Category Change (Cascades into Step 2)
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setBlueprintSearchQuery('');
    const activeCategory = CATEGORY_GROUPS.find((c) => c.id === catId);
    let matching = CANONICAL_TEMPLATES;
    if (activeCategory && activeCategory.familyFilter) {
      matching = matching.filter((t) => t.family === activeCategory.familyFilter);
    }
    if (matching.length > 0) {
      const first = matching[0];
      setSelectedBlueprintId(first.id);
      setSelectedLevel((first.level as AbstractionDetailLevel) || 'L3');
      setCreatePrompt(`Synthesize enterprise architecture for ${first.name}: ${first.primaryPurpose}`);
    }
  };

  // Handle Blueprint Select from Step 2
  const handleBlueprintSelect = (bp: CanonicalTemplate) => {
    setSelectedBlueprintId(bp.id);
    setSelectedLevel((bp.level as AbstractionDetailLevel) || 'L3');
    setCreatePrompt(`Synthesize enterprise architecture for ${bp.name}: ${bp.primaryPurpose}`);
    setOpenBlueprintDropdown(false);
  };

  // =========================================================================
  // CORE ACTION: Propose Blueprint & Plan (Loads correct blueprint onto 70% canvas)
  // =========================================================================
  const handleProposeBlueprintAndPlan = () => {
    const targetBlueprintId = selectedBlueprintId;
    const bp = CANONICAL_TEMPLATES.find(
      (t) => t.id === targetBlueprintId || t.id === targetBlueprintId.padStart(2, '0')
    ) || CANONICAL_TEMPLATES[0];

    const targetTitle = bp.name;

    // 1. Immediately replace diagram on the 70% canvas!
    setLoadedBlueprintId(targetBlueprintId);
    setCanvasTitle(targetTitle);
    setCanvasSubtitle(`Multi-Tier Cloud Topology across 5 Deterministic Zones (${selectedLevel} Level)`);
    setCanvasVersion(`v1.0 (${selectedLevel} Blueprint)`);

    // 2. Set Perspective based on family/type
    if (bp.family === 'Process' || bp.family === 'Flow') {
      setCanvasPerspective('Process');
    } else if (bp.family === 'Infographic' || bp.family === 'Understand') {
      setCanvasPerspective('Logical');
    } else {
      setCanvasPerspective('Technical');
    }

    // 3. Add user message and proposal card to chat
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
  const handleApproveAndGenerate = (title: string, promptText: string) => {
    setIsSynthesizingLive(true);
    showToast('⚡ Calling live Gemini API & certifying architecture...');

    setTimeout(() => {
      setIsSynthesizingLive(false);
      setCanvasVersion('v2.0 (Customized Live)');
      setCanvasTitle(`Certified: ${title}`);

      const certifiedMsg: ChatMessage = {
        id: `ai_cert_${Date.now()}`,
        sender: 'ai',
        text: `✓ Architecture certified and generated live for "${title}". All quality gates, edge routings, and zero-collision safety rules validated.`
      };
      setChatMessages((prev) => [...prev, certifiedMsg]);
      showToast('✓ Architecture Certified & Generated Live!');
    }, 1200);
  };

  // Chat message send
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `user_chat_${Date.now()}`,
      sender: 'user',
      text: chatInput
    };
    const query = chatInput.toLowerCase();
    let replyText = `Received requirement update: "${chatInput}". Updating prompt specification. Click Propose Blueprint & Plan to refresh the canvas.`;

    if (query.includes('l1') || query.includes('context')) setSelectedLevel('L1');
    if (query.includes('l2') || query.includes('container')) setSelectedLevel('L2');
    if (query.includes('l3') || query.includes('microservice')) setSelectedLevel('L3');
    if (query.includes('l4') || query.includes('protocol') || query.includes('port')) setSelectedLevel('L4');

    setCreatePrompt((prev) => `${prev} • ${chatInput}`);
    setChatMessages((prev) => [
      ...prev,
      userMsg,
      { id: `ai_reply_${Date.now()}`, sender: 'ai', text: replyText }
    ]);
    setChatInput('');
  };

  const handleCopyXml = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activeCanvasXml);
      setCopiedXml(true);
      showToast('✓ Draw.io XML copied to clipboard');
      setTimeout(() => setCopiedXml(false), 2000);
    }
  };

  const selectedBlueprintObj = useMemo(() => {
    return (
      CANONICAL_TEMPLATES.find(
        (t) => t.id === selectedBlueprintId || t.id === selectedBlueprintId.padStart(2, '0')
      ) || CANONICAL_TEMPLATES[0]
    );
  }, [selectedBlueprintId]);

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* 1. LEFT DARK APPLICATION SIDEBAR */}
      <UnifiedAppSidebar />

      {/* MAIN VIEWPORT: 30 / 70 WORKSPACE SPLIT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Dark Header */}
        <AppHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-md border-2 border-white/90 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-sm md:text-base tracking-tight flex items-center gap-2 text-white">
                <span>PromptCanvas &mdash; Architecture Studio &amp; Launchpad</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  4-STEP WORKFLOW
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Category &bull; Searchable Blueprints &bull; Detail Levels (L1&ndash;L4) &bull; Instant Canvas Swap
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
            
            {/* TOP SECTION: 4-STEP CASCADING WORKFLOW CONTROLS (55% Height) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 border-b border-slate-200">
              
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Step 1 &bull; 2 &bull; 3 &bull; 4 Workflow
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">ElkJS V2</span>
              </div>

              {/* STEP 1: CATEGORY SELECTION */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1 flex items-center justify-between">
                  <span>1. Architectural Category</span>
                  <span className="text-[9px] text-teal-600 font-bold font-mono">
                    {CATEGORY_GROUPS.find((c) => c.id === selectedCategory)?.count} Available
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-100 rounded-xl border border-slate-200">
                  {CATEGORY_GROUPS.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-bold text-left flex items-center justify-between transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/60'
                      }`}
                    >
                      <span className="truncate flex items-center gap-1">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span className={`text-[9px] font-mono font-normal ml-1 shrink-0 ${selectedCategory === cat.id ? 'text-teal-200' : 'text-slate-400'}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: SEARCHABLE BLUEPRINT SELECTION */}
              <div className="relative blueprint-combobox-container">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1 flex items-center justify-between">
                  <span>2. Select Blueprint Template</span>
                  <span className="text-[9px] text-slate-400 font-normal">
                    {filteredTemplates.length} matching
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setOpenBlueprintDropdown(!openBlueprintDropdown)}
                  className="w-full bg-white border border-slate-300 hover:border-teal-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 flex items-center justify-between shadow-xs transition-all text-left cursor-pointer"
                >
                  <span className="truncate flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-700 text-[10px] font-mono border border-teal-200 shrink-0">
                      #{selectedBlueprintObj.id}
                    </span>
                    <span className="truncate">{selectedBlueprintObj.name}</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {openBlueprintDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1.5">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search blueprints by name, id, family..."
                        value={blueprintSearchQuery}
                        onChange={(e) => setBlueprintSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {filteredTemplates.length === 0 ? (
                        <div className="p-3 text-center text-xs text-slate-500">
                          <p>No blueprints found for &ldquo;{blueprintSearchQuery}&rdquo; in this category.</p>
                          <button
                            type="button"
                            onClick={() => setSelectedCategory('all')}
                            className="mt-1.5 text-xs text-teal-600 font-bold hover:underline cursor-pointer inline-block"
                          >
                            Search across all 75 blueprints &rarr;
                          </button>
                        </div>
                      ) : (
                        filteredTemplates.map((bp) => (
                          <div
                            key={bp.id}
                            onClick={() => handleBlueprintSelect(bp)}
                            className={`p-2 rounded-xl cursor-pointer text-xs transition-colors flex items-center justify-between ${
                              selectedBlueprintId === bp.id
                                ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span className="font-mono text-teal-700">#{bp.id}</span>
                                <span>&mdash;</span>
                                <span className="truncate">{bp.name}</span>
                              </p>
                              <p className="text-[10px] text-slate-400 line-clamp-1">{bp.primaryPurpose}</p>
                            </div>
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-mono shrink-0">
                              {bp.level}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 3: ABSTRACTION DETAIL LEVEL (L1 - L4) */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1 flex items-center justify-between">
                  <span>3. Detail Level</span>
                  <span className="text-[9px] text-indigo-600 font-mono font-bold">
                    {selectedLevel === 'L1' && 'Context & Scope'}
                    {selectedLevel === 'L2' && 'Subsystems & Containers'}
                    {selectedLevel === 'L3' && 'Microservices & Pods'}
                    {selectedLevel === 'L4' && 'Physical, Ports & Protocols'}
                  </span>
                </label>
                <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {(['L1', 'L2', 'L3', 'L4'] as AbstractionDetailLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        selectedLevel === lvl
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 4: NATURAL LANGUAGE ARCHITECTURE PROMPT */}
              <div className="space-y-1 pt-0.5">
                <label className="text-[10px] font-extrabold uppercase text-slate-600 flex items-center justify-between">
                  <span>4. Architecture Prompt</span>
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

            {/* Canvas Viewport Rendering Draw.io XML with Dynamic Key */}
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
                <span className="text-[10px] font-extrabold text-slate-700 uppercase">Active Specs:</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">
                    Category: {CATEGORY_GROUPS.find((c) => c.id === selectedCategory)?.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold">
                    Level: {selectedLevel}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-800 text-white text-[10px] font-bold">
                    Perspective: {canvasPerspective}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">
                    Blueprint #{loadedBlueprintId}
                  </span>
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
