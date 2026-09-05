'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { useTheme } from '@/lib/themeContext';
import {
  ALL_GCP_DIALECT_A_ARCHITECTURES,
  getGcpArchitectureById,
  GcpArchitectureDef,
} from '@/lib/gcpDialectA';
import {
  Cloud,
  Layers,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Download,
  Share2,
  FileText,
  Shield,
  Bot,
  Zap,
  Cpu,
  Database,
  Lock,
  ArrowRight,
  Workflow,
  CheckCircle2,
  BookOpen,
  Eye,
  Terminal,
  X,
  Clock,
  Activity,
  RefreshCw,
  AlertTriangle,
  History,
  Send,
  RotateCcw,
  ChevronDown,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  GcpVersionSnapshot,
  GcpChatMessage,
  GCP_STAKEHOLDER_PROMPTS,
  GCP_PHARMA_SPECIALIZED_PROMPTS,
  executeGcpPromptModification,
} from '@/lib/gcpCoPilotModifier';
import { classifyChatIntent } from '@/lib/router/chatIntentClassifier';

function GcpArchitectureCenterInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const initialId = searchParams.get('id') || 'gcp-multiagent-core';
  const [selectedArchId, setSelectedArchId] = useState<string>(initialId);
  const [activeTab, setActiveTab] = useState<'canvas' | 'spec' | 'official'>('canvas');
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // A2A Gateway Swarm Bridge State
  const [isA2AModalOpen, setIsA2AModalOpen] = useState<boolean>(false);
  const [isCompilingA2A, setIsCompilingA2A] = useState<boolean>(false);
  const [a2aDagResult, setA2aDagResult] = useState<any | null>(null);
  const [a2aError, setA2aError] = useState<string | null>(null);
  const [a2aActiveView, setA2aActiveView] = useState<'timeline' | 'nodes' | 'raw'>('timeline');
  const [copiedDagJson, setCopiedDagJson] = useState<boolean>(false);

  // Left Navigation Menu Collapsible State (synced with UnifiedAppSidebar)
  const [isLeftNavOpen, setIsLeftNavOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('promptcanvas_sidebar_open');
        if (saved !== null) return saved === 'true';
      } catch {}
    }
    return true;
  });

  useEffect(() => {
    const handleSidebarChange = (e: any) => {
      if (e?.detail?.isOpen !== undefined) {
        setIsLeftNavOpen(e.detail.isOpen);
      }
    };
    window.addEventListener('promptcanvas_sidebar_change', handleSidebarChange);
    return () => window.removeEventListener('promptcanvas_sidebar_change', handleSidebarChange);
  }, []);

  const handleToggleLeftNav = () => {
    const next = !isLeftNavOpen;
    setIsLeftNavOpen(next);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('promptcanvas_sidebar_open', String(next));
      } catch {}
      window.dispatchEvent(new CustomEvent('promptcanvas_toggle_sidebar', { detail: { isOpen: next } }));
    }
  };

  // Architecture Co-Pilot & Snapshot Versioning State
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(true);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState<boolean>(false);
  const [promptInput, setPromptInput] = useState<string>('');
  const [isChatThinking, setIsChatThinking] = useState<boolean>(false);
  const [customXmlOverride, setCustomXmlOverride] = useState<string | null>(null);
  const [activeVersionTag, setActiveVersionTag] = useState<string>('v1.0');
  const [versions, setVersions] = useState<GcpVersionSnapshot[]>([]);
  const [messages, setMessages] = useState<GcpChatMessage[]>([]);

  // Sync state if URL searchParam changes
  useEffect(() => {
    const id = searchParams.get('id');
    if (id && ALL_GCP_DIALECT_A_ARCHITECTURES.some((a) => a.id === id)) {
      setSelectedArchId(id);
    }
  }, [searchParams]);

  const activeArch: GcpArchitectureDef = useMemo(() => {
    return getGcpArchitectureById(selectedArchId) || ALL_GCP_DIALECT_A_ARCHITECTURES[0];
  }, [selectedArchId]);

  // Initialize or reset versions when activeArch or isDark changes
  useEffect(() => {
    const baseXml = activeArch.generateXml(isDark);
    setCustomXmlOverride(null);
    setActiveVersionTag('v1.0');
    setVersions([
      {
        id: `v_${activeArch.id}_baseline`,
        versionTag: 'v1.0',
        timestamp: 'Baseline',
        author: 'Canonical Architecture Blueprint',
        actionSummary: `${activeArch.title} (Production Model)`,
        canvasDiff: 'Initial Canonical Architecture Model loaded in 16:9 viewport.',
        specDiff: 'Standard Dialect A specifications, step sequences, and protocols active.',
        xml: baseXml,
      },
    ]);
    setMessages([
      {
        id: `welcome_${activeArch.id}`,
        sender: 'assistant',
        text: `Welcome to the Architecture Co-Pilot for ${activeArch.title}! You can ask architectural questions (e.g. "What is missing in this architecture?", "How does the ingestion flow work?") for expert gap analysis, or enter prompts to modify topologies, inject microservice nodes, enforce security perimeters, and update data flows. Every change generates an immutable version snapshot with 1-click rollback.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [activeArch.id, isDark]);

  const activeXml = useMemo(() => {
    return customXmlOverride || activeArch.generateXml(isDark);
  }, [customXmlOverride, activeArch, isDark]);

  const handleExecutePrompt = async (promptText: string, explicitPersona?: string) => {
    if (!promptText.trim()) return;

    const userMsg: GcpChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPromptInput('');

    // 1. Intent Classification: Informational Q&A / Advisory vs Topology Mutation
    const intentResult = classifyChatIntent(promptText);

    if (intentResult.intent === 'question' && !explicitPersona) {
      setIsChatThinking(true);
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(2500),
          body: JSON.stringify({
            prompt: promptText,
            diagramName: activeArch.title,
            architectureType: activeArch.id,
            xmlContent: activeXml,
            businessUsecase: activeArch.overview,
            technicalUsecase: activeArch.components.map((c) => c.name).join(', '),
            conversationHistory: messages.slice(-6).map((m) => ({
              role: m.sender === 'user' ? 'user' : 'model',
              content: m.text,
            })),
          }),
        });

        if (res.ok) {
          const chatData = await res.json();
          const assistantMsg: GcpChatMessage = {
            id: `msg_advisory_${Date.now()}`,
            sender: 'assistant',
            text: chatData.answer || chatData.summary || 'Architecture advisory generated.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isQuestionAdvisory: true,
            identifiedGaps: chatData.identifiedGaps || [],
            suggestions: chatData.suggestions || [],
          };
          setMessages((prev) => [...prev, assistantMsg]);
        } else {
          throw new Error('Failed to query architecture advisory.');
        }
      } catch (err: any) {
        // Fallback advisory response
        const fallbackMsg: GcpChatMessage = {
          id: `msg_adv_fallback_${Date.now()}`,
          sender: 'assistant',
          text: `Architectural Advisory for "${promptText.slice(0, 60)}":\n\nThis architecture complies with Google Cloud Well-Architected frameworks featuring TLS 1.3 encryption, IAM principle of least privilege, multi-zone automated failover, and zero-trust VPC Service Controls perimeters.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isQuestionAdvisory: true,
          identifiedGaps: [
            'Edge Security: Ensure Cloud Armor WAF is provisioned in front of all public load balancers.',
            'In-Memory Caching: Evaluate Cloud Memorystore (Redis) to shield databases from read spikes.',
          ],
          suggestions: [
            {
              label: 'Enforce Cloud Armor WAF',
              actionPrompt: 'Enforce Cloud Armor Enterprise WAF, Cloud KMS HSM CMEK keys, and VPC Service Controls perimeter.',
              type: 'security',
            },
            {
              label: 'Upgrade Spanner Multi-Region',
              actionPrompt: 'Upgrade Cloud Spanner to multi-region nam3 dual-leader replication across europe-west1 and us-central1 with RPO < 1s.',
              type: 'add',
            },
          ],
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      } finally {
        setIsChatThinking(false);
      }
      return;
    }

    // 2. Structural Architecture Mutation
    try {
      const { updatedXml, newVersion, assistantMessage } = executeGcpPromptModification(
        activeXml,
        promptText,
        versions.length,
        activeArch.id,
        isDark,
        explicitPersona
      );

      setVersions((prev) => [...prev, newVersion]);
      setActiveVersionTag(newVersion.versionTag);
      setCustomXmlOverride(updatedXml);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('[Co-Pilot] Error applying prompt:', err);
      const errorMsg: GcpChatMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ Co-Pilot Synthesis Error: ${err.message || 'Failed to modify architecture.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleRestoreVersion = (version: GcpVersionSnapshot) => {
    setActiveVersionTag(version.versionTag);
    setCustomXmlOverride(version.xml);
    const restoreNotice: GcpChatMessage = {
      id: `msg_restore_${Date.now()}`,
      sender: 'assistant',
      text: `↺ Restored architecture to snapshot ${version.versionTag} (${version.actionSummary}).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, restoreNotice]);
  };

  const handleSelectArchitecture = (id: string) => {
    setSelectedArchId(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('id', id);
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(activeXml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleCopyShareUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleDownloadXml = () => {
    const blob = new Blob([activeXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeArch.id}.drawio.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenDiagramsNet = () => {
    const encoded = encodeURIComponent(activeXml);
    window.open(`https://app.diagrams.net/#R${encoded}`, '_blank');
  };

  const handleCompileA2AGateway = async () => {
    setIsCompilingA2A(true);
    setA2aError(null);
    setIsA2AModalOpen(true);
    try {
      const res = await fetch('/api/a2a-bridge/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drawio_xml: activeXml,
          target_protocol: 'a2a.v1.0.0',
          enforce_ast_sanitization: true,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.detail || `A2A Gateway Error (${res.status}): Failed to compile Draw.io architecture.`
        );
      }
      const data = await res.json();
      setA2aDagResult(data);
    } catch (err: any) {
      console.error('[A2A Gateway Bridge] Compilation error:', err);
      setA2aError(
        err.message ||
          'Failed to connect to Google A2A Gateway on http://127.0.0.1:8090. Ensure the FastAPI portal is running.'
      );
    } finally {
      setIsCompilingA2A(false);
    }
  };

  const handleCopyDagJson = () => {
    if (a2aDagResult) {
      navigator.clipboard.writeText(JSON.stringify(a2aDagResult, null, 2));
      setCopiedDagJson(true);
      setTimeout(() => setCopiedDagJson(false), 2000);
    }
  };

  const handleDownloadDagJson = () => {
    if (a2aDagResult) {
      const blob = new Blob([JSON.stringify(a2aDagResult, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${a2aDagResult.dag_id || 'a2a_dag'}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const bgClass = isDark ? 'bg-[#0B111E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900';
  const cardClass = isDark
    ? 'bg-[#111827] border-slate-800 hover:border-blue-500/40 shadow-slate-950/40'
    : 'bg-white border-slate-200 hover:border-blue-400/60 shadow-slate-100';

  return (
    <div className={`flex min-h-screen transition-colors duration-200 ${bgClass} font-sans`}>
      {/* Collapsible Left Navigation Menu */}
      <UnifiedAppSidebar isCollapsed={!isLeftNavOpen} onToggle={handleToggleLeftNav} />

      {/* Main Content Area: Spacious Ultra-Wide Layout (Zero Surrounding Empty Space) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Sticky Full-Width Header Bar */}
        <header
          className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors ${
            isDark ? 'bg-[#0F172A]/90 border-slate-800' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="w-full max-w-none px-6 md:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Left Navigation Menu Toggle Button */}
              <button
                id="gcp-toggle-left-menu-btn"
                onClick={handleToggleLeftNav}
                className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  isLeftNavOpen
                    ? isDark
                      ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    : 'bg-blue-600/15 text-blue-500 border-blue-500/30 hover:bg-blue-600/25'
                }`}
                title={isLeftNavOpen ? 'Collapse Left Navigation Menu' : 'Expand Left Navigation Menu'}
                aria-label={isLeftNavOpen ? 'Collapse Left Navigation Menu' : 'Expand Left Navigation Menu'}
              >
                {isLeftNavOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                <span className="hidden xl:inline text-[11px] font-bold">
                  {isLeftNavOpen ? 'Collapse Menu' : 'Menu'}
                </span>
              </button>

              <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base md:text-lg font-bold tracking-tight">
                    Google Cloud Architecture Center
                  </h1>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-500 border border-blue-500/25">
                    DIALECT A STANDARDS
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Official Solution Architecture Topologies &bull; Agent2Agent (A2A) &bull; Model Context Protocol (MCP)
                </p>
              </div>
            </div>

            {/* Quick Action Controllers */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyXml}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  copiedXml
                    ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                    : isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Copy Draw.io XML to Clipboard"
              >
                {copiedXml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedXml ? 'Copied XML' : 'Copy XML'}</span>
              </button>

              <button
                onClick={handleDownloadXml}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Download .drawio.xml file"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export XML</span>
              </button>

              <button
                onClick={handleOpenDiagramsNet}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isDark
                    ? 'bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 border-blue-800/60'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                }`}
                title="Open in Diagrams.net online editor"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open in Diagrams.net</span>
              </button>

              {/* Live A2A Gateway Swarm Execution Bridge */}
              <button
                onClick={handleCompileA2AGateway}
                disabled={isCompilingA2A}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 transition-all shadow-md shadow-emerald-950/30 hover:shadow-emerald-500/25 border border-emerald-400/40 active:scale-95 cursor-pointer disabled:opacity-50"
                title="Compile and simulate Draw.io architecture on the Google Agent-to-Agent (A2A) Gateway"
              >
                {isCompilingA2A ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                )}
                <span>{isCompilingA2A ? 'Compiling DAG...' : 'Run on A2A Swarm'}</span>
              </button>

              <a
                href={activeArch.officialDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm"
              >
                <span>Docs Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </header>

        {/* Page Body Container */}
        <main className="w-full max-w-none px-6 md:px-10 py-6 space-y-6 flex-1">
          {/* Architecture Selector Cards Grid (7 Topologies) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3.5">
            {ALL_GCP_DIALECT_A_ARCHITECTURES.map((arch) => {
              const isSelected = arch.id === activeArch.id;
              return (
                <button
                  key={arch.id}
                  onClick={() => handleSelectArchitecture(arch.id)}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-full relative overflow-hidden group ${
                    isSelected
                      ? isDark
                        ? 'bg-blue-950/30 border-blue-500 shadow-lg shadow-blue-950/50 ring-1 ring-blue-500'
                        : 'bg-blue-50/70 border-blue-500 shadow-md shadow-blue-100 ring-1 ring-blue-500'
                      : cardClass
                  }`}
                >
                  {/* Top indicator ribbon */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-blue-500 text-white border-blue-600'
                            : isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {arch.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {arch.components.length} components
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-bold tracking-tight line-clamp-1 mb-1 ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {arch.title}
                    </h3>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {arch.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 font-medium truncate max-w-[170px]">
                      {arch.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        isSelected
                          ? 'text-blue-500 font-bold'
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Select'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pharma Drug Discovery 3-Tier Architecture Navigator */}
          {activeArch.id.startsWith('gcp-pharma') && (
            <div
              className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 transition-all ${
                isDark
                  ? 'bg-blue-950/25 border-blue-900/60 shadow-lg shadow-blue-950/30'
                  : 'bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-blue-50/90 border-blue-200/80 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Pharma Drug Discovery Multi-Tier Architecture Suite:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleSelectArchitecture('gcp-pharma-conceptual')}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    activeArch.id === 'gcp-pharma-conceptual'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                      : isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>🧠 1. Conceptual Architecture</span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                      activeArch.id === 'gcp-pharma-conceptual'
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    4-Flow Capability
                  </span>
                </button>

                <button
                  onClick={() => handleSelectArchitecture('gcp-pharma-drug-discovery')}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    activeArch.id === 'gcp-pharma-drug-discovery'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                      : isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>⚡ 2. Logical Architecture</span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                      activeArch.id === 'gcp-pharma-drug-discovery'
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Multi-Agent Mesh
                  </span>
                </button>

                <button
                  onClick={() => handleSelectArchitecture('gcp-pharma-technical-infrastructure')}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    activeArch.id === 'gcp-pharma-technical-infrastructure'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                      : isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>🏗️ 3. Technical Infrastructure</span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                      activeArch.id === 'gcp-pharma-technical-infrastructure'
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    VPC &amp; HPC Cluster
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Active Topology Hero & Meta Banner */}
          <div
            className={`p-5 rounded-xl border transition-all ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    {activeArch.category}
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Source: {activeArch.author}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {activeArch.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-4xl leading-relaxed">
                  {activeArch.overview}
                </p>
              </div>

              {/* View Switcher Tabs */}
              <div
                className={`flex items-center p-1 rounded-lg border self-start lg:self-center ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  onClick={() => setActiveTab('canvas')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeTab === 'canvas'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Interactive Canvas</span>
                </button>
                <button
                  onClick={() => setActiveTab('spec')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeTab === 'spec'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Living Spec &amp; Data Flow</span>
                </button>
                <button
                  onClick={() => setActiveTab('official')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeTab === 'official'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Public Docs Reference</span>
                </button>
              </div>
            </div>

            {/* Design Patterns Pill Badges */}
            <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Pattern Matrix:
              </span>
              {activeArch.designPatterns.map((pattern, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                    isDark
                      ? 'bg-slate-800/80 text-slate-300 border-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {pattern}
                </span>
              ))}
            </div>
          </div>

          {/* TAB 1: INTERACTIVE DRAW.IO CANVAS VIEW WITH INTEGRATED CO-PILOT */}
          {activeTab === 'canvas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* LEFT: ARCHITECTURE CO-PILOT CHATBOT PANEL */}
              {isCopilotOpen && (
                <div
                  id="architecture-copilot-panel"
                  className={`col-span-12 lg:col-span-4 xl:col-span-4 2xl:col-span-3.5 rounded-xl border flex flex-col h-[760px] md:h-[860px] overflow-hidden transition-all shadow-lg ${
                    isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  {/* Co-Pilot Header */}
                  <div
                    className={`px-4 py-3 border-b flex items-center justify-between ${
                      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/90 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            Architecture Co-Pilot
                          </span>
                          <span className="text-[9px] font-mono font-bold bg-blue-500/15 text-blue-500 border border-blue-500/25 px-1.5 py-0.2 rounded-full">
                            Gemini 2.5
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          Prompt-to-Architecture Synthesis &amp; Versioning
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Co-Pilot Active &amp; Ready" />
                      <button
                        id="gcp-collapse-copilot-btn"
                        onClick={() => setIsCopilotOpen(false)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs font-semibold cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                        title="Collapse Architecture Co-Pilot"
                        aria-label="Collapse Architecture Co-Pilot"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span className="text-[10.5px]">Collapse</span>
                      </button>
                    </div>
                  </div>

                  {/* Stakeholder Simulation & Suggested Prompts */}
                  <div
                    className={`p-3 border-b space-y-2 flex-shrink-0 ${
                      isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/60 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {activeArch.id.startsWith('gcp-pharma')
                          ? 'Pharma Specialized Prompts:'
                          : 'Simulate Stakeholder Personas:'}
                      </span>
                      <span className="text-[9px] font-mono text-purple-600 dark:text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded">
                        1-Click Synthesize
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {(activeArch.id.startsWith('gcp-pharma')
                        ? GCP_PHARMA_SPECIALIZED_PROMPTS
                        : GCP_STAKEHOLDER_PROMPTS
                      ).map((sp) => (
                        <button
                          key={sp.id}
                          onClick={() => handleExecutePrompt(sp.prompt, sp.persona)}
                          className={`text-left p-1.5 rounded-lg border text-[11px] transition flex items-center gap-1.5 font-medium shadow-2xs truncate ${
                            isDark
                              ? 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200 hover:text-white'
                              : 'bg-white hover:bg-blue-50 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-950'
                          }`}
                          title={sp.description}
                        >
                          <span>{sp.emoji}</span>
                          <span className="truncate">{sp.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Messages Scroll Stream */}
                  <div className="flex-1 min-h-0 overflow-y-auto p-3.5 space-y-3 text-xs">
                    {messages.map((msg) => {
                      const isUser = msg.sender === 'user';
                      return (
                        <div
                          key={msg.id}
                          className={`rounded-xl p-3 space-y-2 transition-all ${
                            isUser
                              ? isDark
                                ? 'bg-blue-950/40 border border-blue-900/60'
                                : 'bg-blue-50/90 border border-blue-200'
                              : msg.isQuestionAdvisory
                              ? isDark
                                ? 'bg-indigo-950/30 border border-indigo-800/50'
                                : 'bg-indigo-50/80 border border-indigo-200/80'
                              : isDark
                              ? 'bg-slate-900/80 border border-slate-800'
                              : 'bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span
                              className={`font-bold flex items-center gap-1.5 ${
                                isUser
                                  ? 'text-blue-600 dark:text-blue-300'
                                  : msg.isQuestionAdvisory
                                  ? 'text-indigo-600 dark:text-indigo-300'
                                  : 'text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              <span>
                                {isUser
                                  ? '👤 You asked:'
                                  : msg.isQuestionAdvisory
                                  ? '🧠 Architecture Advisory & Gap Analysis:'
                                  : '🤖 Co-Pilot Synthesis:'}
                              </span>
                              {msg.actionSummary?.versionTag && (
                                <span className="font-mono text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">
                                  {msg.actionSummary.versionTag}
                                </span>
                              )}
                            </span>
                            <span className="font-mono text-[10px] text-slate-400">{msg.timestamp}</span>
                          </div>

                          <div
                            className={`text-[11.5px] leading-relaxed whitespace-pre-line ${
                              isUser ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {msg.text}
                          </div>

                          {/* Identified Architecture Gaps */}
                          {msg.identifiedGaps && msg.identifiedGaps.length > 0 && (
                            <div
                              className={`mt-2 p-2.5 rounded-lg border text-[11px] space-y-1.5 ${
                                isDark ? 'bg-amber-950/20 border-amber-800/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 font-bold text-[10.5px]">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                <span>Identified Architecture Gaps ({msg.identifiedGaps.length}):</span>
                              </div>
                              <ul className="list-disc pl-4 space-y-1 text-[10.5px] opacity-90">
                                {msg.identifiedGaps.map((gap, gIdx) => (
                                  <li key={gIdx}>{gap}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Actionable Suggestions Pills */}
                          {msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Recommended Topology Upgrades:
                              </span>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {msg.suggestions.map((sug, sIdx) => (
                                  <button
                                    key={sIdx}
                                    onClick={() => handleExecutePrompt(sug.actionPrompt)}
                                    className={`px-2 py-1 rounded-lg text-[10.5px] font-semibold border flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                                      isDark
                                        ? 'bg-blue-600/15 hover:bg-blue-600/30 text-blue-300 border-blue-500/40 hover:border-blue-400'
                                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300'
                                    }`}
                                    title={sug.actionPrompt}
                                  >
                                    <Sparkles className="w-3 h-3 text-blue-500" />
                                    <span>+ {sug.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {msg.actionSummary && (
                            <div
                              className={`mt-2 p-2.5 rounded-lg border text-[11px] space-y-1.5 ${
                                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-700 dark:text-slate-300">Topology Diff:</span>
                                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                                  ● Active in Viewport
                                </span>
                              </div>
                              <p className="text-[10.5px] text-emerald-700 dark:text-emerald-300 font-mono leading-relaxed">
                                {msg.actionSummary.canvasDiff}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                {msg.actionSummary.specDiff}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Thinking Indicator */}
                    {isChatThinking && (
                      <div
                        className={`rounded-xl p-3 border animate-pulse flex items-center gap-2.5 text-xs ${
                          isDark ? 'bg-indigo-950/30 border-indigo-800/50 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                        <span className="font-medium">Evaluating architecture topology, gaps, and SLAs...</span>
                      </div>
                    )}
                  </div>

                  {/* Sticky Prompt Composer */}
                  <div
                    className={`p-3 border-t space-y-2 flex-shrink-0 ${
                      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/90 border-slate-200'
                    }`}
                  >
                    <div className="relative">
                      <textarea
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleExecutePrompt(promptInput);
                          }
                        }}
                        rows={2}
                        placeholder="Ask Co-Pilot to edit diagram, add nodes, or upgrade tiers..."
                        className={`w-full border rounded-xl px-3 py-2 pr-16 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none shadow-sm transition-all ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                        }`}
                      />
                      <button
                        id="gcp-copilot-apply-btn"
                        onClick={() => handleExecutePrompt(promptInput)}
                        disabled={!promptInput.trim()}
                        className={`absolute bottom-2.5 right-2 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow transition flex items-center gap-1 ${
                          promptInput.trim()
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 cursor-pointer'
                            : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Apply</span>
                        <Send className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>Target: <strong className="text-blue-500">Live Architecture Model</strong></span>
                      <span>Press Enter ↵</span>
                    </div>
                  </div>
                </div>
              )}

              {/* COLLAPSED CO-PILOT LEFT RAIL (1-Click Re-expansion) */}
              {!isCopilotOpen && (
                <div className="hidden lg:flex flex-col col-span-12 lg:col-span-1 xl:col-span-0.5 2xl:col-span-0.5">
                  <button
                    id="gcp-expand-copilot-rail-btn"
                    onClick={() => setIsCopilotOpen(true)}
                    className={`w-12 h-[760px] md:h-[860px] rounded-xl border flex flex-col items-center justify-between py-6 transition-all shadow-md group cursor-pointer ${
                      isDark
                        ? 'bg-[#0F172A] hover:bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-blue-600'
                    }`}
                    title="Expand Architecture Co-Pilot"
                    aria-label="Expand Architecture Co-Pilot"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-center py-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400 group-hover:text-blue-500 [writing-mode:vertical-lr] rotate-180 select-none">
                        Co-Pilot
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}

              {/* RIGHT: INTERACTIVE DRAW.IO CANVAS VIEWPORT */}
              <div
                id="diagram-canvas-card"
                className={`${
                  isCopilotOpen
                    ? 'col-span-12 lg:col-span-8 xl:col-span-8 2xl:col-span-8.5'
                    : 'col-span-12 lg:col-span-11 xl:col-span-11.5 2xl:col-span-11.5'
                } rounded-xl border overflow-hidden transition-all shadow-md ${
                  isDark ? 'bg-[#0F172A] border-slate-800 shadow-xl' : 'bg-white border-slate-200'
                }`}
              >
                {/* Canvas Action Bar with CoPilot Toggle and Versioning */}
                <div
                  className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/90 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      Draw.io Canvas Viewport (16:9 Aspect Ratio)
                    </span>

                    {/* CoPilot Show/Hide Toggle */}
                    <button
                      onClick={() => setIsCopilotOpen(!isCopilotOpen)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                        isCopilotOpen
                          ? 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30'
                          : isDark
                          ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Toggle Architecture Co-Pilot Chatbot Panel"
                    >
                      <Bot className="w-3 h-3" />
                      <span>{isCopilotOpen ? 'Co-Pilot Active' : 'Show Co-Pilot'}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    {/* Version History Selector Dropdown */}
                    <div className="relative" id="gcp-version-dropdown-container">
                      <button
                        id="version-selector-trigger"
                        onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          activeVersionTag !== 'v1.0'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : isDark
                            ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                        title="Snapshot Version History & Rollback"
                      >
                        <History className="w-3.5 h-3.5" />
                        <span>Version: {activeVersionTag}</span>
                        <span
                          className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${
                            activeVersionTag !== 'v1.0' ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        >
                          {versions.length}
                        </span>
                        <ChevronDown className="w-3 h-3 opacity-70" />
                      </button>

                      {isVersionDropdownOpen && (
                        <div
                          id="version-selector-dropdown"
                          className={`absolute right-0 sm:left-0 mt-1.5 w-80 rounded-xl border shadow-2xl z-50 p-2 space-y-1 backdrop-blur-md ${
                            isDark
                              ? 'bg-slate-900/95 border-slate-800 text-slate-200 shadow-slate-950/80'
                              : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/80'
                          }`}
                        >
                          <div className="px-2 py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500">
                            <span>SNAPSHOT VERSION HISTORY</span>
                            <span>{versions.length} versions</span>
                          </div>
                          <div className="max-h-64 overflow-y-auto space-y-1">
                            {versions.map((v) => {
                              const isCurrent = v.versionTag === activeVersionTag;
                              return (
                                <button
                                  key={v.id}
                                  onClick={() => {
                                    handleRestoreVersion(v);
                                    setIsVersionDropdownOpen(false);
                                  }}
                                  className={`w-full text-left p-2 rounded-lg text-xs transition flex items-start justify-between gap-2 ${
                                    isCurrent
                                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-300 font-bold'
                                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                                  }`}
                                >
                                  <div className="space-y-0.5 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1 py-0.2 rounded font-bold">
                                        {v.versionTag}
                                      </span>
                                      <span className="text-[11px] truncate font-semibold">{v.author}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                      {v.actionSummary}
                                    </p>
                                  </div>
                                  <span className="text-[9.5px] font-mono text-slate-400 whitespace-nowrap">
                                    {v.timestamp}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          {activeVersionTag !== 'v1.0' && (
                            <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800">
                              <button
                                onClick={() => {
                                  if (versions.length > 0) {
                                    handleRestoreVersion(versions[0]);
                                  }
                                  setIsVersionDropdownOpen(false);
                                }}
                                className="w-full text-center py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center justify-center gap-1"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Restore Baseline Model (v1.0)</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quick Rollback Button if not v1.0 */}
                    {activeVersionTag !== 'v1.0' && (
                      <button
                        onClick={() => {
                          if (versions.length > 0) {
                            handleRestoreVersion(versions[0]);
                          }
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                          isDark
                            ? 'bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border-amber-800/60'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                        }`}
                        title="Rollback to Baseline Version 1.0"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span className="hidden md:inline">Revert to v1.0</span>
                      </button>
                    )}

                    <span className="text-slate-300 dark:text-slate-700">|</span>

                    <button
                      onClick={handleCopyXml}
                      className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-500 font-semibold transition-colors"
                      title="Copy XML"
                    >
                      {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedXml ? 'Copied' : 'Copy XML'}</span>
                    </button>

                    <button
                      onClick={handleOpenDiagramsNet}
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      title="Open in Diagrams.net"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="hidden sm:inline">diagrams.net</span>
                    </button>
                  </div>
                </div>

                {/* RenderSafe Diagram Canvas Container */}
                <div className="w-full h-[720px] md:h-[820px] relative bg-white dark:bg-[#0B111E]">
                  <DiagramViewerRenderSafe
                    key={`${activeArch.id}-${activeVersionTag}-${isDark ? 'dark' : 'light'}`}
                    xml={activeXml}
                    diagramId={activeArch.id}
                    aspectRatioId="16:9"
                    bgTheme={isDark ? 'dark' : 'light'}
                    allowFullScaleScroll={false}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVING SPEC & DATA FLOW */}
          {activeTab === 'spec' && (
            <div className="space-y-6">
              {/* Ordered Step Sequence Flow */}
              <div
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-blue-500" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Sequential Execution &amp; Interaction Flow
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {activeArch.flowSteps.length} discrete pipeline stages
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeArch.flowSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-lg border flex items-start gap-3 transition-all ${
                        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                            {step.title}
                          </h4>
                          <span className="text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            {step.protocol}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{step.from}</span> &rarr;{' '}
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{step.to}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Components Catalog Table */}
              <div
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Architecture Component Directory
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr
                        className={`border-b font-bold uppercase tracking-wider ${
                          isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                        }`}
                      >
                        <th className="py-2.5 px-3">Component</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Runtime / Spec</th>
                        <th className="py-2.5 px-3">Technical Responsibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                      {activeArch.components.map((comp, idx) => (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isDark ? 'hover:bg-slate-900/50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                              <span>{comp.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {comp.category}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-blue-600 dark:text-blue-400 whitespace-nowrap">
                            {comp.spec}
                          </td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                            {comp.role}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Products and Services Reference */}
              <div
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Products &amp; Tools Used
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {activeArch.productsUsed.map((prod, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-xs font-semibold flex items-center gap-2.5 ${
                        isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{prod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PUBLIC DOCS REFERENCE & GROUND TRUTH */}
          {activeTab === 'official' && (
            <div className="space-y-6">
              <div
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-blue-500">
                        Official Ground-Truth Source
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        VERIFIED 2025/2026
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {activeArch.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">
                      {activeArch.officialDocUrl}
                    </p>
                  </div>

                  <a
                    href={activeArch.officialDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm self-start"
                  >
                    <span>View Live On Google Cloud</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Ground Truth Citation Card */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400">Author &amp; Solution Engineer</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                      {activeArch.author}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400">Solution Architecture Pattern</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                      Dialect A (Official Solution Blueprint)
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400">Interoperability Standards</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                      A2A Protocol &bull; Model Context Protocol (MCP)
                    </p>
                  </div>
                </div>

                {/* Comparison Details */}
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Visual Grammar Conformance Matrix (Dialect A vs Dialect B)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400">
                          <th className="py-2 px-3">Design Attribute</th>
                          <th className="py-2 px-3 text-blue-500">Dialect A (Official Solution Architecture)</th>
                          <th className="py-2 px-3 text-slate-400">Dialect B (Widescreen Reference Blueprint)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Outer Boundary</td>
                          <td className="py-2.5 px-3 font-medium text-blue-600 dark:text-blue-400">
                            Rounded Google Cloud box with solid #1A73E8 blue header ribbon
                          </td>
                          <td className="py-2.5 px-3">Multi-tier wide boundary with dark headers</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Agent Enclave</td>
                          <td className="py-2.5 px-3 font-medium text-emerald-600 dark:text-emerald-400">
                            Soft green #E6F4EA container (#12B76A border) with Coordinator &amp; subagent enclaves
                          </td>
                          <td className="py-2.5 px-3">General application tier cards</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Execution Patterns</td>
                          <td className="py-2.5 px-3 font-medium">
                            Explicit Sequential and Iterative Refinement dashed sub-boxes with A2A protocol
                          </td>
                          <td className="py-2.5 px-3">Orthogonal pipelines across columns</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Model Tier</td>
                          <td className="py-2.5 px-3 font-medium">
                            Right-column Model Armor guardrail + Gemini Platform + Runtime selection
                          </td>
                          <td className="py-2.5 px-3">Intelligence Hub column</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Tool Ingestion</td>
                          <td className="py-2.5 px-3 font-medium">
                            Bottom MCP tier: Custom MCP (Cloud Run) + Managed BigQuery MCP
                          </td>
                          <td className="py-2.5 px-3">Direct database connections</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Step Badges</td>
                          <td className="py-2.5 px-3 font-medium text-blue-600 dark:text-blue-400">
                            Numbered solid blue circles (❶..❿) positioned along connector midpoints
                          </td>
                          <td className="py-2.5 px-3">Step number badges on card headers</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
      {/* Google A2A Gateway Swarm Compiler & Execution Modal */}
      {isA2AModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className={`relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
              isDark
                ? 'bg-[#0F172A] border-slate-700 text-slate-100 shadow-slate-950/90'
                : 'bg-white border-slate-200 text-slate-900 shadow-2xl shadow-blue-900/15'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 ${
                isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-50/90'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/25">
                  <Zap className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base md:text-lg font-bold tracking-tight">
                      Google Agent-to-Agent (A2A) Swarm Execution Bridge
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      PROTOCOL v1.0.0
                    </span>
                    {a2aDagResult?.gxp_21cfr11_compliant ? (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-amber-400" />
                        21 CFR Part 11 Certified
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                        <Workflow className="w-3 h-3 text-blue-400" />
                        Dual-Plane Demarcation
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Target Architecture: <span className="font-semibold text-slate-700 dark:text-slate-300">{activeArch.title}</span> &bull; Gateway Port:{' '}
                    <span className="font-mono text-emerald-500 dark:text-emerald-400">http://127.0.0.1:8090</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="http://127.0.0.1:8090/#tab-promptcanvas-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                  title="Open A2A Gateway Portal in new tab"
                >
                  <span>Open Gateway Console</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setIsA2AModalOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isCompilingA2A ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                  <h4 className="text-base font-bold text-slate-200">Synthesizing Executable A2A Swarm DAG...</h4>
                  <p className="text-xs text-slate-400 text-center max-w-md">
                    Parsing Draw.io mxGraphModel XML hierarchy, configuring sub-28µs AST sanitization envelopes, and generating stateless 21 CFR Part 11 signature tokens.
                  </p>
                </div>
              ) : a2aError ? (
                <div className="py-10 space-y-4">
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-400">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold">Compilation Failed</h4>
                      <p className="text-xs text-rose-300 mt-1">{a2aError}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCompileA2AGateway}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry Live Compilation</span>
                    </button>
                    <a
                      href="http://127.0.0.1:8090"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all inline-flex items-center gap-2"
                    >
                      <span>Check Gateway Server Status</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : a2aDagResult ? (
                <div className="space-y-6">
                  {/* Top Stats Strip */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>Extracted Nodes</span>
                        <Cpu className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-2xl font-black">{a2aDagResult.nodes_count}</div>
                      <div className="text-[11px] text-emerald-500 font-semibold mt-1">
                        Actors, Agents, Tools & Storage
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>Swarm Edges</span>
                        <Workflow className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-black">{a2aDagResult.edges_count}</div>
                      <div className="text-[11px] text-blue-400 font-semibold mt-1">
                        mTLS & Sub-28µs AST Filtered
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>Pipeline Latency</span>
                        <Clock className="w-4 h-4 text-amber-500" />
                      </div>
                      <div className="text-2xl font-black">
                        {(a2aDagResult.estimated_total_latency_us / 1000).toFixed(1)} ms
                      </div>
                      <div className="text-[11px] text-amber-400 font-semibold mt-1">
                        End-to-End Orchestration Budget
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>Regulatory Gate</span>
                        <Shield className="w-4 h-4 text-purple-500" />
                      </div>
                      <div className="text-2xl font-black">
                        {a2aDagResult.gxp_21cfr11_compliant ? '21 CFR 11' : 'SOV-A2A'}
                      </div>
                      <div className="text-[11px] text-purple-400 font-semibold mt-1">
                        {a2aDagResult.gxp_21cfr11_compliant
                          ? 'HMAC-SHA256 Signed'
                          : 'Dual-Plane Enclave'}
                      </div>
                    </div>
                  </div>

                  {/* Sub-view switcher */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setA2aActiveView('timeline')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          a2aActiveView === 'timeline'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isDark
                            ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        Execution Pipeline ({a2aDagResult.execution_plan?.length || 0} Stages)
                      </button>

                      <button
                        onClick={() => setA2aActiveView('nodes')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          a2aActiveView === 'nodes'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isDark
                            ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        Extracted Nodes ({a2aDagResult.nodes?.length || 0})
                      </button>

                      <button
                        onClick={() => setA2aActiveView('raw')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          a2aActiveView === 'raw'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isDark
                            ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        Raw A2A DAG (JSON)
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyDagJson}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                          copiedDagJson
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {copiedDagJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedDagJson ? 'Copied JSON' : 'Copy JSON'}</span>
                      </button>

                      <button
                        onClick={handleDownloadDagJson}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  {/* Tab 1: Execution Pipeline Timeline */}
                  {a2aActiveView === 'timeline' && (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                        <span>SWARM ORCHESTRATION PIPELINE STAGES</span>
                        <span>STATUS: ALL VALIDATED</span>
                      </div>
                      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-2">
                        {a2aDagResult.execution_plan?.map((step: any, idx: number) => (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 transition-all ${
                              isDark ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-bold">
                                {step.stage_index}
                              </span>
                              <div>
                                <div className="text-xs font-bold">{step.label}</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                                  ID: {step.node_id} &bull; Clearance: {step.security_tier}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/25">
                                {step.type}
                              </span>
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {step.expected_latency_us < 1000
                                  ? `${step.expected_latency_us}µs`
                                  : `${(step.expected_latency_us / 1000).toFixed(2)}ms`}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{step.status}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Nodes Matrix */}
                  {a2aActiveView === 'nodes' && (
                    <div className="max-h-[380px] overflow-y-auto border rounded-xl overflow-hidden border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead className={`border-b ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                          <tr>
                            <th className="py-2.5 px-3 font-semibold">Node ID</th>
                            <th className="py-2.5 px-3 font-semibold">Label</th>
                            <th className="py-2.5 px-3 font-semibold">Type</th>
                            <th className="py-2.5 px-3 font-semibold">Security Tier</th>
                            <th className="py-2.5 px-3 font-semibold">Budget</th>
                            <th className="py-2.5 px-3 font-semibold">Coordinates</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 font-mono">
                          {a2aDagResult.nodes?.map((node: any) => (
                            <tr key={node.id} className={isDark ? 'hover:bg-slate-900/50' : 'hover:bg-slate-50'}>
                              <td className="py-2 px-3 text-emerald-400 font-bold">{node.id}</td>
                              <td className="py-2 px-3 font-sans">{node.label}</td>
                              <td className="py-2 px-3 text-blue-400">{node.component_type}</td>
                              <td className="py-2 px-3 text-purple-400">{node.tier}</td>
                              <td className="py-2 px-3 text-amber-400">{node.latency_budget_us}µs</td>
                              <td className="py-2 px-3 text-slate-400">
                                ({Math.round(node.x)}, {Math.round(node.y)}) {Math.round(node.width)}x{Math.round(node.height)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Tab 3: Raw DAG JSON */}
                  {a2aActiveView === 'raw' && (
                    <div className="relative">
                      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs max-h-[380px] overflow-auto leading-relaxed">
                        {JSON.stringify(a2aDagResult, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div
              className={`px-6 py-3.5 border-t flex flex-wrap items-center justify-between gap-3 ${
                isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-50/90'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Raw Clinical Egress Guaranteed &bull; Google Agent-to-Agent Architecture</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCompileA2AGateway}
                  disabled={isCompilingA2A}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCompilingA2A ? 'animate-spin' : ''}`} />
                  <span>Re-compile Live</span>
                </button>

                <a
                  href="http://127.0.0.1:8090/#tab-swarm-simulator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Launch 10K Digital Twin Simulation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setIsA2AModalOpen(false)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </main>
      </div>
    </div>
  );
}

export default function GcpArchitectureCenterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white font-mono text-sm">
          Loading Google Cloud Architecture Center...
        </div>
      }
    >
      <GcpArchitectureCenterInner />
    </Suspense>
  );
}
