'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/lib/themeContext';
import {
  Layers,
  Sparkles,
  FileText,
  Copy,
  ExternalLink,
  Edit3,
  RefreshCw,
  GitCompare,
  RotateCcw,
  RotateCw,
  Clock,
  Check,
  Zap,
  Info,
  Maximize2,
  X,
  Plus,
  Play,
  Share2,
  ChevronRight,
  Shield,
  Search,
  Code
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { generateGcpFunctionalFlowchartXml } from '@/lib/gcpFunctionalFlowchart';
import { sanitizeDrawioXmlAttributes, injectUseCaseFlavor } from '@/lib/diagramCleaner';

interface StudioDiagramTab {
  id: string;
  title: string;
  templateId: string;
  xml: string;
  source: 'functional_flowchart' | 'custom';
  lastPrompt?: string;
}

interface StudioVersionSnapshot {
  id: string;
  versionTag: string;
  timestamp: string;
  author: 'User' | 'AI Assistant' | 'System';
  actionSummary: string;
  activeDiagramId: string;
  diagrams: StudioDiagramTab[];
  projectName: string;
  useCaseName: string;
  projectTitle: string;
  projectScopePrompt: string;
  changedComponents?: string[];
  targetTier?: string;
}

interface StudioChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  actionApplied?: {
    summary: string;
    versionTag: string;
    targetTier?: string;
    changedComponents?: string[];
  };
  suggestedPrompts?: string[];
}

const MAX_ROLLING_VERSIONS = 20;

function Studio2Content() {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // 1. Project / Program Scope Inputs
  const [projectName, setProjectName] = useState<string>('');
  const [useCaseName, setUseCaseName] = useState<string>('');
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectScopePrompt, setProjectScopePrompt] = useState<string>('');

  // Multi-Diagram Management
  const [activeDiagramId, setActiveDiagramId] = useState<string>('diag_1');
  const [diagrams, setDiagrams] = useState<StudioDiagramTab[]>(() => {
    const initialXml = generateGcpFunctionalFlowchartXml({
      projectTitle: 'GCP Cloud Architecture: Functional Flowchart Diagram',
      theme: isLight ? 'light' : 'dark'
    });
    return [
      {
        id: 'diag_1',
        title: 'Diagram 1 • GCP Functional Flowchart',
        templateId: 'gcp_functional_flowchart',
        xml: initialXml,
        source: 'functional_flowchart'
      }
    ];
  });

  // UI Modals & Menus
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showDiffModal, setShowDiffModal] = useState<boolean>(false);
  const [diffBaseIndex, setDiffBaseIndex] = useState<number>(1);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Draw.io Inline Modal & Window Refs
  const [showInlineDrawioModal, setShowInlineDrawioModal] = useState<boolean>(false);
  const inlineDrawioIframeRef = useRef<HTMLIFrameElement | null>(null);
  const drawioChildWindowRef = useRef<Window | null>(null);

  // Auto-scroll ref for chat messages
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // Version History State
  const [versionHistory, setVersionHistory] = useState<StudioVersionSnapshot[]>(() => {
    const initialXml = generateGcpFunctionalFlowchartXml({
      projectTitle: 'GCP Cloud Architecture: Functional Flowchart Diagram',
      theme: isLight ? 'light' : 'dark'
    });
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return [
      {
        id: 'snap_init',
        versionTag: 'v1.0',
        timestamp: timeStr,
        author: 'System',
        actionSummary: 'Default Baseline: GCP Functional Flowchart Topology',
        activeDiagramId: 'diag_1',
        diagrams: [
          {
            id: 'diag_1',
            title: 'Diagram 1 • GCP Functional Flowchart',
            templateId: 'gcp_functional_flowchart',
            xml: initialXml,
            source: 'functional_flowchart'
          }
        ],
        projectName: '',
        useCaseName: '',
        projectTitle: '',
        projectScopePrompt: '',
        changedComponents: ['Ingress & Security', 'Load Balancing & Compute', 'Application & Data', 'Agentic AI Services (Vertex AI)'],
        targetTier: 'Enterprise Global VPC'
      }
    ];
  });
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);

  // Chat message history
  const [chatMessages, setChatMessages] = useState<StudioChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: '👋 Welcome to Launch Studio 2! Fill out your project name and use case above, then describe what to build or modify directly in chat. The right pane shows the live GCP Cloud Architecture functional flowchart model.',
      timestamp: 'Just now',
      suggestedPrompts: [
        'Architect a high-throughput event streaming platform with Pub/Sub & Dataflow',
        'Design a zero-trust multi-region microservices architecture with Cloud Spanner',
        'Build a Vertex AI RAG knowledge graph with ScaNN vector search',
        'Scale Regional Subnet B with GPU Managed Instance Groups & Internal LB',
        'Add Cloud Armor security rules & DDoS protection policies'
      ]
    }
  ]);

  // Active diagram getter
  const activeDiagram = useMemo(() => {
    return diagrams.find((d) => d.id === activeDiagramId) || diagrams[0];
  }, [diagrams, activeDiagramId]);

  // Auto-scroll chat feed
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length, isSynthesizing]);

  // Helper for toasts
  const showToast = useCallback((msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 3500);
  }, []);

  // Snapshot Creation Helper
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
    [diagrams, activeDiagramId, projectName, useCaseName, projectTitle, projectScopePrompt, versionHistory]
  );

  // Undo Functionality
  const handleUndo = useCallback(() => {
    if (currentHistoryIndex < versionHistory.length - 1) {
      const nextIdx = currentHistoryIndex + 1;
      setCurrentHistoryIndex(nextIdx);
      const snap = versionHistory[nextIdx];
      if (snap) {
        setDiagrams(JSON.parse(JSON.stringify(snap.diagrams)));
        setActiveDiagramId(snap.activeDiagramId);
        setProjectName(snap.projectName);
        setUseCaseName(snap.useCaseName);
        setProjectTitle(snap.projectTitle);
        showToast(`↺ Restored state: ${snap.versionTag} (${snap.actionSummary})`);
      }
    }
  }, [currentHistoryIndex, versionHistory, showToast]);

  // Escape key handler for all modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDiffModal(false);
        setShowHistoryModal(false);
        setShowInlineDrawioModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Redo Functionality
  const handleRedo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const prevIdx = currentHistoryIndex - 1;
      setCurrentHistoryIndex(prevIdx);
      const snap = versionHistory[prevIdx];
      if (snap) {
        setDiagrams(JSON.parse(JSON.stringify(snap.diagrams)));
        setActiveDiagramId(snap.activeDiagramId);
        setProjectName(snap.projectName);
        setUseCaseName(snap.useCaseName);
        setProjectTitle(snap.projectTitle);
        showToast(`↻ Redone to state: ${snap.versionTag} (${snap.actionSummary})`);
      }
    }
  }, [currentHistoryIndex, versionHistory, showToast]);

  // Open in Draw.io New Tab
  const handleOpenDrawioNewTab = useCallback(() => {
    const url = 'https://app.diagrams.net/?embed=1&ui=min&spin=1&modified=unsaved&proto=json';
    const child = window.open(url, '_blank');
    if (child) {
      drawioChildWindowRef.current = child;
      showToast('🚀 Opened in Draw.io Editor (New Tab) with live bidirectional sync!');
    }
  }, [showToast]);

  // Open in Draw.io Inline Modal
  const handleOpenDrawioInline = useCallback(() => {
    setShowInlineDrawioModal(true);
    showToast('✏️ Opened Inline Draw.io Editor! Edit and click Save to update your architecture.');
  }, [showToast]);

  // Bidirectional PostMessage Integration (both for child window and iframe)
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
        const target =
          (inlineDrawioIframeRef.current && inlineDrawioIframeRef.current.contentWindow) ||
          drawioChildWindowRef.current ||
          (evt.source as Window);

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
                source: 'custom'
              };
            }
            return diag;
          });
          setDiagrams(updatedDiagrams);
          const tag = pushNewVersion('Synced edits from Draw.io Editor', 'User', updatedDiagrams, ['User Draw.io Canvas Updates'], 'Canvas Workspace');
          showToast(`✅ Saved changes from Draw.io Editor as version ${tag}!`);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeDiagram.xml, diagrams, activeDiagramId, pushNewVersion, showToast]);

  // Prompt Intelligence & Change Detection
  const analyzePromptChanges = (prompt: string): { summary: string; targetTier: string; changedComponents: string[] } => {
    const p = prompt.toLowerCase();
    if (p.includes('spanner') || p.includes('database') || p.includes('sql') || p.includes('replica') || p.includes('persist')) {
      return {
        summary: 'Provisioned High-Availability Database Layer & TrueTime Replication',
        targetTier: 'Application & Data (Tier 3)',
        changedComponents: ['Cloud Spanner / Cloud SQL HA', 'BigQuery Analytical Warehouse', 'Data Lifecycle Storage Policies']
      };
    }
    if (p.includes('stream') || p.includes('event') || p.includes('pubsub') || p.includes('kafka') || p.includes('dataflow') || p.includes('queue')) {
      return {
        summary: 'Configured Low-Latency Pub/Sub Messaging & Event Orchestration',
        targetTier: 'Load Balancing & Compute (Tier 2)',
        changedComponents: ['Cloud Pub/Sub Message Bus', 'Async Task Processors', 'Regional Subnet A Queue Workers']
      };
    }
    if (p.includes('rag') || p.includes('vector') || p.includes('vertex') || p.includes('agent') || p.includes('gemini') || p.includes('ai') || p.includes('llm')) {
      return {
        summary: 'Integrated Vertex AI Agent Platform & Knowledge Graph Reasoning',
        targetTier: 'Agentic AI Services (Tier 4)',
        changedComponents: ['Gemini Agent Platform Core', 'Vertex AI Vector Search / ScaNN', 'ADK 2.0 Agent Development Kit', 'Model Management & Serving Loop']
      };
    }
    if (p.includes('armor') || p.includes('security') || p.includes('waf') || p.includes('zero') || p.includes('iap') || p.includes('vpn') || p.includes('ddos')) {
      return {
        summary: 'Enforced Edge Security, Cloud Armor WAF & Identity-Aware Proxy',
        targetTier: 'Ingress & Security (Tier 1)',
        changedComponents: ['Cloud Armor DDoS/WAF Filtering', 'Identity-Aware Proxy (IAP)', 'Global External HTTP(S) Load Balancer']
      };
    }
    if (p.includes('mig') || p.includes('gpu') || p.includes('scale') || p.includes('instance') || p.includes('gce') || p.includes('internal lb')) {
      return {
        summary: 'Configured Auto-Scaling Compute Engine MIGs & Internal Load Balancer',
        targetTier: 'Load Balancing & Compute (Tier 2)',
        changedComponents: ['Compute Engine MIG (Subnet B)', 'Regional Internal Load Balancer', 'Dynamic Capacity Autoscaler']
      };
    }
    if (p.includes('medicine') || p.includes('pharma') || p.includes('cleanroom') || p.includes('gxp') || p.includes('plant')) {
      return {
        summary: 'Configured Pharmaceutical & Cleanroom Manufacturing IT Platform',
        targetTier: 'End-to-End GCP Industrial Topology',
        changedComponents: ['Cleanroom OT Gateway', 'GxP Batch Application (GKE)', 'EBR & MES API', 'Sterile Bioreactor Sync']
      };
    }
    return {
      summary: 'Updated Google Cloud Functional Flowchart Topology',
      targetTier: 'Global Multi-Tier VPC',
      changedComponents: ['Ingress & Perimeter Security', 'Regional Compute Subnets', 'Application State & Analytics Stores', 'Agentic Vertex AI Foundation']
    };
  };

  // Main Prompt Synthesis Handler
  const handleSynthesizeArchitecture = useCallback(
    (customPrompt?: string) => {
      const rawPrompt = (customPrompt || projectScopePrompt).trim();
      const promptToUse = (rawPrompt || (projectName && useCaseName ? `${projectName} ${useCaseName}` : '') || 'Enterprise Google Cloud Native Architecture').trim();

      // Immediately post user prompt to chat thread and clear input
      if (rawPrompt) {
        const userMsg: StudioChatMessage = {
          id: `usr_${Date.now()}`,
          sender: 'user',
          text: rawPrompt,
          timestamp: 'Just now'
        };
        setChatMessages((prev) => [...prev, userMsg]);
        setProjectScopePrompt('');
      }

      setIsSynthesizing(true);
      setIsAiThinking(true);

      setTimeout(() => {
        let titleToUse = projectTitle;
        if (!titleToUse) {
          if (projectName && useCaseName) {
            titleToUse = `${projectName}: ${useCaseName}`;
          } else if (projectName) {
            titleToUse = `${projectName} — GCP Architecture`;
          } else {
            titleToUse = 'GCP Cloud Architecture: Functional Flowchart Diagram';
          }
        }

        const generatedXml = generateGcpFunctionalFlowchartXml({
          projectTitle: titleToUse,
          projectName,
          useCaseName,
          prompt: promptToUse,
          theme: isLight ? 'light' : 'dark'
        });

        const flavoredXml = injectUseCaseFlavor(generatedXml, titleToUse, promptToUse);

        const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
          if (diag.id === activeDiagramId) {
            return {
              ...diag,
              title: `${titleToUse} • Functional Flowchart`,
              xml: flavoredXml,
              source: 'functional_flowchart',
              lastPrompt: promptToUse
            };
          }
          return diag;
        });

        setDiagrams(updatedDiagrams);

        const analysis = analyzePromptChanges(promptToUse);
        const tag = pushNewVersion(
          `Synthesized: ${analysis.summary}`,
          'AI Assistant',
          updatedDiagrams,
          analysis.changedComponents,
          analysis.targetTier
        );

        // Assistant response message
        const assistantMsg: StudioChatMessage = {
          id: `ast_${Date.now()}`,
          sender: 'assistant',
          text: `✨ Successfully updated your architecture based on: "${promptToUse}"`,
          timestamp: 'Just now',
          actionApplied: {
            summary: analysis.summary,
            versionTag: tag,
            targetTier: analysis.targetTier,
            changedComponents: analysis.changedComponents
          },
          suggestedPrompts: [
            'Add Cloud Spanner with multi-region active-active replication',
            'Add Vertex AI RAG knowledge retrieval pipeline',
            'Enforce VPC Service Perimeters and Customer-Managed Encryption (CMEK)',
            'Scale Regional Subnet B with GPU Managed Instance Groups'
          ]
        };

        setChatMessages((prev) => [...prev, assistantMsg]);
        setIsSynthesizing(false);
        setIsAiThinking(false);
        showToast(`⚡ Architecture updated to ${tag}: ${analysis.summary}`);
      }, 600);
    },
    [projectScopePrompt, projectName, useCaseName, projectTitle, isLight, diagrams, activeDiagramId, pushNewVersion, showToast]
  );

  return (
    <div className={`min-h-screen ${isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 font-semibold text-xs rounded-xl shadow-2xl border border-teal-500/40 backdrop-blur-md animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-teal-400 dark:text-teal-600 animate-pulse" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Main Studio Viewport */}
      <div className="max-w-[1920px] w-full mx-auto p-3 md:p-5 space-y-3">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <Link href="/" className="hover:text-teal-500 transition-colors">
                PromptCanvas
              </Link>
              <span>&rsaquo;</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">Launch Studio 2</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-tight">
                  AI Architecture &amp; Specification Studio 2
                </h1>
                <p className="text-xs text-slate-500">
                  GCP Cloud Architecture Functional Flowchart • Conversational Gemini 3.7 Engine • Full Versioning
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Tools: Undo, Redo, Version Tag */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={currentHistoryIndex >= versionHistory.length - 1}
              className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                currentHistoryIndex >= versionHistory.length - 1
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-500 text-slate-700 dark:text-slate-200 shadow-xs'
              }`}
              title="Undo last change"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleRedo}
              disabled={currentHistoryIndex <= 0}
              className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                currentHistoryIndex <= 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-500 text-slate-700 dark:text-slate-200 shadow-xs'
              }`}
              title="Redo change"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Version Snapshot Pill */}
            <button
              type="button"
              onClick={() => setShowHistoryModal(true)}
              className="px-3 py-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300 font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-teal-500/20 transition-all cursor-pointer shadow-xs"
            >
              <Clock className="w-3.5 h-3.5 text-teal-500" />
              <span>{versionHistory[currentHistoryIndex]?.versionTag || 'v1.0'}</span>
              <span className="text-[10px] opacity-70">({currentHistoryIndex + 1}/{versionHistory.length})</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Workspace: 25% Left Chat, 75% Right Diagram */}
        <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
          {/* Left Column: Scope & Conversational Requirements (25% Width) */}
          <div className="w-full lg:w-[25%] lg:min-w-[320px] flex-shrink-0 space-y-4">
            <div className={`p-4 md:p-5 rounded-2xl border shadow-sm space-y-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}>
              {/* Scope & User Information Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Architecture Scope &amp; User Information
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">System Intelligence Autonomy</span>
              </div>

              {/* 1. Project / Program Name & 2. Architectural Use Case Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                    1. Project / Program Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Bio-Pharma Clinical Platform"
                    className={`w-full px-3 py-2 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                    2. Architectural Use Case Name
                  </label>
                  <input
                    type="text"
                    value={useCaseName}
                    onChange={(e) => setUseCaseName(e.target.value)}
                    placeholder="e.g. Genomics Analysis &amp; Regulatory AI"
                    className={`w-full px-3 py-2 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* 5. Architectural Scope & Topology Requirements (Chatbox Area) */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                    5. Architectural Scope &amp; Topology Requirements
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Gemini 3.7 &bull; Real-Time AST</span>
                </div>

                {/* Scrollable Prompt & Enhancement History Feed */}
                {chatMessages.length > 0 && (
                  <div className={`p-3 rounded-2xl border max-h-[260px] overflow-y-auto space-y-2.5 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}>
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`p-2.5 rounded-xl text-xs max-w-[92%] leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-teal-600 text-white font-medium rounded-tr-xs shadow-xs'
                              : isLight
                              ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-xs'
                              : 'bg-slate-900 text-slate-200 rounded-tl-xs border border-slate-800'
                          }`}
                        >
                          <p className="text-[11.5px]">{msg.text}</p>

                          {/* Action Badge & Change Verification Breakdown */}
                          {msg.actionApplied && (
                            <div className="mt-2.5 p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-1.5 text-xs">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1 text-[11px]">
                                  <Check className="w-3.5 h-3.5 text-teal-500" />
                                  {msg.actionApplied.summary}
                                </span>
                                <span className="font-mono font-bold text-teal-700 dark:text-teal-300 px-1.5 py-0.5 rounded bg-teal-500/20 text-[10px]">
                                  {msg.actionApplied.versionTag}
                                </span>
                              </div>

                              {msg.actionApplied.targetTier && (
                                <div className="text-[10px] text-slate-600 dark:text-slate-300 flex items-center gap-1 font-semibold">
                                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">📍 Target Tier:</span>
                                  <span>{msg.actionApplied.targetTier}</span>
                                </div>
                              )}

                              {msg.actionApplied.changedComponents && msg.actionApplied.changedComponents.length > 0 && (
                                <div className="space-y-0.5 pt-1 border-t border-teal-500/20">
                                  <span className="text-[9px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                                    ✨ Injected / Updated Nodes:
                                  </span>
                                  <div className="flex flex-wrap gap-1">
                                    {msg.actionApplied.changedComponents.map((comp) => (
                                      <span key={comp} className="inline-flex items-center gap-1 text-[9.5px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        {comp.replace(/&amp;/g, '&')}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="pt-1 flex items-center justify-end">
                                <button
                                  type="button"
                                  onClick={() => setShowDiffModal(true)}
                                  className="text-[10px] font-bold text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 transition-all cursor-pointer"
                                >
                                  <GitCompare className="w-3 h-3 text-teal-500" />
                                  <span>🔍 Verify &amp; Compare Changes (Diff)</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Suggested Next Iterations */}
                          {msg.suggestedPrompts && (
                            <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-800 space-y-1">
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                                Suggested Next Iterations (Click to Load):
                              </span>
                              <div className="flex flex-col gap-0.5">
                                {msg.suggestedPrompts.map((p) => (
                                  <button
                                    key={p}
                                    type="button"
                                    onClick={() => {
                                      setProjectScopePrompt(p);
                                      showToast('💡 Loaded prompt into scope editor. Press "⚡ Synthesize Architecture Now" to apply.');
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
                        <span className="text-[8.5px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                      </div>
                    ))}

                    {isAiThinking && (
                      <div className="flex items-center gap-2 text-xs text-teal-600 font-bold p-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Assistant is analyzing context &amp; updating functional flowchart...</span>
                      </div>
                    )}
                    <div ref={chatMessagesEndRef} />
                  </div>
                )}

                {/* Prompt Textarea */}
                <textarea
                  rows={3}
                  value={projectScopePrompt}
                  onChange={(e) => setProjectScopePrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSynthesizeArchitecture();
                    }
                  }}
                  placeholder="Describe your target cloud services, data flow, throughput requirements, security policies, and integrations... (Press Enter to Synthesize)"
                  className={`w-full p-3 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                />

                {/* Synthesize Button */}
                <button
                  type="button"
                  onClick={() => handleSynthesizeArchitecture()}
                  disabled={isSynthesizing}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSynthesizing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Architecture AST...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>⚡ Synthesize Architecture Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Diagram Canvas & Actions (75% Width) */}
          <div className="w-full lg:w-[75%] flex-1 min-w-0 space-y-3">
            <div className={`rounded-2xl border shadow-sm overflow-hidden flex flex-col ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              {/* Diagram Card Header */}
              <div className="p-3 md:px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-teal-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Diagram 1</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px] font-bold">
                    16:9 VECTOR GCP • FULL SCALE SCROLL
                  </span>
                </div>
              </div>

              {/* Sub-Header: Diagram Title & Action Buttons */}
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                <div className="font-bold text-xs truncate max-w-[340px] text-slate-800 dark:text-slate-200">
                  {activeDiagram.title}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowDiffModal(true)}
                    className="px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <GitCompare className="w-3 h-3 text-teal-500" />
                    <span>Compare Diff ({versionHistory[currentHistoryIndex]?.versionTag || 'v1.0'})</span>
                  </button>

                  <div className="relative group">
                    <button
                      type="button"
                      onClick={handleOpenDrawioInline}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3 text-teal-500" />
                      <span>Edit in Draw.io</span>
                    </button>
                  </div>

                  <Link
                    href="/workspace"
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Maximize2 className="w-3 h-3 text-indigo-500" />
                    <span>Edit in Canvas</span>
                  </Link>
                </div>
              </div>

              {/* Viewport Canvas Frame */}
              <div className="p-2 md:p-3 flex-1 h-[calc(100vh-210px)] min-h-[780px] flex items-center justify-center bg-slate-100 dark:bg-slate-950/80">
                <div className="w-full h-full min-h-[760px] rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative">
                  <DiagramViewerRenderSafe
                    key={`studio2_viewport_${activeDiagram.id}_${isLight ? 'light' : 'dark'}_${versionHistory[currentHistoryIndex]?.id || currentHistoryIndex}_${activeDiagram.xml.length}`}
                    diagramId="gcp_functional_flowchart"
                    diagramType="functional_flowchart"
                    xml={activeDiagram.xml}
                    aspectRatioId="16:9"
                    bgTheme={isLight ? 'light' : 'dark'}
                    allowFullScaleScroll={true}
                  />
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenDrawioInline}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Inline Draw.io Editor</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenDrawioNewTab}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>Open in New Tab</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(activeDiagram.xml);
                      setCopiedXml(true);
                      showToast('📋 Draw.io XML copied to clipboard!');
                      setTimeout(() => setCopiedXml(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedXml ? 'Copied!' : 'Copy XML'}</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-500">
                  Active Target: <span className="font-bold text-teal-600 dark:text-teal-400">GCP Cloud Architecture Functional Flowchart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Draw.io Modal */}
      {showInlineDrawioModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-[96vw] h-[92vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-3.5 px-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-4 h-4 text-teal-500" />
                <span className="font-black text-sm text-slate-800 dark:text-slate-200">
                  Inline Draw.io Architecture Editor
                </span>
                <span className="text-xs font-mono text-slate-500">
                  (Live Bidirectional Sync)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowInlineDrawioModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Done &amp; Close</span>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-full bg-slate-100 dark:bg-slate-950 relative">
              <iframe
                ref={inlineDrawioIframeRef}
                src="https://embed.diagrams.net/?embed=1&ui=min&spin=1&modified=unsavedChanges&proto=json"
                className="w-full h-full border-0"
                title="Inline Draw.io Editor"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </div>
        </div>
      )}

      {/* Visual Version Diff Modal */}
      {showDiffModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-teal-500" />
                <h3 className="font-bold text-sm">
                  Architecture Version Diff Comparison
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDiffModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-500 mb-1">Current State ({versionHistory[currentHistoryIndex]?.versionTag || 'v1.0'})</div>
                  <div className="font-bold text-sm text-teal-600 dark:text-teal-400">
                    {versionHistory[currentHistoryIndex]?.actionSummary || 'Initial baseline'}
                  </div>
                  <div className="mt-2 text-xs space-y-1">
                    <div className="text-slate-500 font-medium">Target: {versionHistory[currentHistoryIndex]?.targetTier || 'Global VPC'}</div>
                    <div className="text-slate-500 font-medium">Components: {versionHistory[currentHistoryIndex]?.changedComponents?.join(', ') || 'Base architecture'}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-500 mb-1">Baseline Comparison</div>
                  <select
                    value={diffBaseIndex}
                    onChange={(e) => setDiffBaseIndex(Number(e.target.value))}
                    className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900"
                  >
                    {versionHistory.map((v, idx) => (
                      <option key={v.id} value={idx}>
                        {v.versionTag} - {v.actionSummary} ({v.timestamp})
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 text-xs space-y-1">
                    <div className="text-slate-500 font-medium">Target: {versionHistory[diffBaseIndex]?.targetTier || 'Global VPC'}</div>
                    <div className="text-slate-500 font-medium">Components: {versionHistory[diffBaseIndex]?.changedComponents?.join(', ') || 'Base architecture'}</div>
                  </div>
                </div>
              </div>

              {/* Injected Delta Breakdown */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-500" />
                  <span>Added / Enhanced Architecture Nodes in Current Snapshot:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(versionHistory[currentHistoryIndex]?.changedComponents || ['GCP Functional Flowchart Base']).map((node) => (
                    <span key={node} className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold border border-emerald-300 dark:border-emerald-700">
                      + {node}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Snapshots Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-500" />
                <h3 className="font-bold text-sm">
                  Full Version Snapshot Timeline
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2">
              {versionHistory.map((snap, idx) => (
                <button
                  key={snap.id}
                  type="button"
                  onClick={() => {
                    setCurrentHistoryIndex(idx);
                    setDiagrams(JSON.parse(JSON.stringify(snap.diagrams)));
                    setActiveDiagramId(snap.activeDiagramId);
                    setProjectName(snap.projectName);
                    setUseCaseName(snap.useCaseName);
                    setProjectTitle(snap.projectTitle);
                    setShowHistoryModal(false);
                    showToast(`Restored snapshot ${snap.versionTag}`);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    currentHistoryIndex === idx
                      ? 'border-teal-500 bg-teal-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-950'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-teal-600 dark:text-teal-400">
                        {snap.versionTag}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {snap.actionSummary}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Author: {snap.author} &bull; {snap.timestamp}
                    </div>
                  </div>
                  {currentHistoryIndex === idx && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500 text-white">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LaunchStudio2Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Launch Studio 2...</div>}>
      <Studio2Content />
    </Suspense>
  );
}
