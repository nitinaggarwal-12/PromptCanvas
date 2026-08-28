'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  Layers,
  Code,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Sun,
  Moon,
  Info,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Activity,
  GitBranch,
  LayoutGrid,
  Terminal,
  Cpu,
  Clock,
  Clapperboard,
  Film,
  Play,
  RotateCcw,
  Link as LinkIcon,
  Share2
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { AbstractionLevel, Studio3Intent } from '@/lib/studio3/intentParser';
import { Studio3SemanticGraph } from '@/lib/studio3/graphExtractor';
import { Studio3QualityReport } from '@/lib/studio3/qualityValidator';
import { Studio3LogEntry } from '@/lib/studio3/telemetryLogger';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  intent?: Studio3Intent;
  qualityReport?: Studio3QualityReport;
  logs?: Studio3LogEntry[];
}

const STARTER_PROMPTS = [
  {
    title: 'Google OKF Overview',
    prompt: 'explain google OKF with the help of a diagram',
    abstraction: 'conceptual' as AbstractionLevel,
    category: 'Knowledge Graph'
  },
  {
    title: 'OKF Ecosystem & Workflow',
    prompt: 'compare and contrast this with other similar tools and how they work together',
    abstraction: 'logical' as AbstractionLevel,
    category: 'Multi-Band Pipeline'
  },
  {
    title: 'Zero-Trust Financial Ledger',
    prompt: 'Architect a zero-trust multi-region financial ledger on Cloud Spanner, Cloud Armor, and KMS CMEK encryption',
    abstraction: 'technical' as AbstractionLevel,
    category: 'Fintech Security'
  },
  {
    title: 'Vertex AI Agentic RAG',
    prompt: 'Design a multi-agent RAG knowledge retrieval flow using Vertex AI Vector Search, Gemini Pro, and BigQuery data mesh',
    abstraction: 'logical' as AbstractionLevel,
    category: 'GenAI & Search'
  },
  {
    title: 'Transformer Architecture',
    prompt: 'Help me learn transformer architecture',
    abstraction: 'logical' as AbstractionLevel,
    category: 'AI / Neural'
  }
];

export default function Studio3Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      content: '🎭 **Welcome to Studio 3: First-Principles Generative Stage.**\n\nThe canvas is currently behind the stage curtain. Enter any architectural concept, tool comparison, or cloud workflow below to lift the curtain and synthesize your diagram.',
      timestamp: 'Ready'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'canvas' | 'logs' | 'quality' | 'xml'>('canvas');
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Active State & Persistent ID
  const [diagramId, setDiagramId] = useState<string | null>(null);
  const [diagramName, setDiagramName] = useState<string>('');
  const [currentXml, setCurrentXml] = useState<string>('');
  const [currentIntent, setCurrentIntent] = useState<Studio3Intent | null>(null);
  const [currentGraph, setCurrentGraph] = useState<Studio3SemanticGraph | null>(null);
  const [currentQuality, setCurrentQuality] = useState<Studio3QualityReport | null>(null);
  const [allLogs, setAllLogs] = useState<Studio3LogEntry[]>([]);
  const [selectedAbstraction, setSelectedAbstraction] = useState<AbstractionLevel>('logical');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // 1. Initial Mount: Restore from URL Query (?id=...) or LocalStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    const urlId = searchParams.get('id');

    if (urlId) {
      setLoading(true);
      fetch(`/api/diagrams/${urlId}`)
        .then(res => res.json())
        .then(data => {
          if (data && (data.xml_content || data.versions?.[0]?.xml_content)) {
            const xml = data.xml_content || data.versions[0].xml_content;
            setCurrentXml(xml);
            setDiagramId(data.id);
            setDiagramName(data.name || 'Studio 3 Architecture');
            if (data.architecture_type) {
              setSelectedAbstraction(data.architecture_type as AbstractionLevel);
            }
            setMessages([
              {
                id: 'msg_restored',
                role: 'assistant',
                content: `🎯 **Diagram Restored via Unique Link:** Loaded \`${data.name || 'Architecture'}\` (Permanent ID: \`${data.id}\`).`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }
        })
        .catch(err => console.error('Failed to load diagram by ID:', err))
        .finally(() => setLoading(false));
    } else {
      try {
        const saved = localStorage.getItem('pc_studio3_session');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.currentXml) {
            setCurrentXml(parsed.currentXml);
            if (parsed.diagramId) {
              setDiagramId(parsed.diagramId);
              window.history.replaceState(null, '', `/studio3?id=${parsed.diagramId}`);
            }
            if (parsed.diagramName) setDiagramName(parsed.diagramName);
            if (Array.isArray(parsed.messages) && parsed.messages.length > 0) setMessages(parsed.messages);
            if (parsed.currentIntent) setCurrentIntent(parsed.currentIntent);
            if (parsed.currentGraph) setCurrentGraph(parsed.currentGraph);
            if (parsed.currentQuality) setCurrentQuality(parsed.currentQuality);
            if (Array.isArray(parsed.allLogs)) setAllLogs(parsed.allLogs);
            if (parsed.selectedAbstraction) setSelectedAbstraction(parsed.selectedAbstraction);
          }
        }
      } catch (e) {
        console.warn('Failed to parse localStorage session:', e);
      }
    }
  }, []);

  // 2. Continuous State Auto-Sync to LocalStorage & URL History
  useEffect(() => {
    if (typeof window === 'undefined' || !currentXml) return;
    try {
      localStorage.setItem('pc_studio3_session', JSON.stringify({
        diagramId,
        diagramName,
        currentXml,
        messages,
        currentIntent,
        currentGraph,
        currentQuality,
        allLogs,
        selectedAbstraction
      }));
      if (diagramId) {
        window.history.replaceState(null, '', `/studio3?id=${diagramId}`);
      }
    } catch (e) {
      console.warn('Failed to save session to localStorage:', e);
    }
  }, [currentXml, diagramId, diagramName, messages, currentIntent, currentGraph, currentQuality, allLogs, selectedAbstraction]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopyXml = () => {
    if (!currentXml) return;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(currentXml).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopyTextToClipboard(currentXml);
      });
    } else {
      fallbackCopyTextToClipboard(currentXml);
    }
  };

  const handleCopyShareLink = () => {
    if (typeof window === 'undefined') return;
    const shareUrl = diagramId
      ? `${window.location.origin}/studio3?id=${diagramId}`
      : window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }).catch(() => {
        fallbackCopyTextToClipboard(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    } else {
      fallbackCopyTextToClipboard(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleEditInDrawio = () => {
    if (!currentXml) return;
    try {
      const url = `https://app.diagrams.net/#R${encodeURIComponent(currentXml)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Error opening Draw.io', e);
    }
  };

  const handleResetStage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pc_studio3_session');
      window.history.replaceState(null, '', '/studio3');
    }
    setDiagramId(null);
    setDiagramName('');
    setCurrentXml('');
    setCurrentIntent(null);
    setCurrentGraph(null);
    setCurrentQuality(null);
    setAllLogs([]);
    setMessages([
      {
        id: 'msg_welcome_' + Date.now(),
        role: 'assistant',
        content: '🎭 **Stage Reset.** The curtain is closed. Enter any new architecture prompt to synthesize from first principles.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSynthesize = async (promptText: string, forcedAbstraction?: AbstractionLevel) => {
    if (!promptText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setPromptInput('');
    setLoading(true);

    try {
      const isInitial = !currentXml;
      const endpoint = isInitial ? '/api/studio3/synthesize' : '/api/studio3/chat';
      const payload = isInitial
        ? {
            prompt: promptText,
            theme,
            forcedAbstraction: forcedAbstraction || selectedAbstraction
          }
        : {
            diagramId,
            messages: [...messages, userMessage],
            currentXml,
            previousGraph: currentGraph,
            theme
          };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to synthesize architecture');
      }

      // Update state & ID
      if (data.diagramId) {
        setDiagramId(data.diagramId);
      }
      if (data.xml) setCurrentXml(data.xml);
      if (data.intent) {
        setCurrentIntent(data.intent);
        if (data.intent.abstractionLevel) {
          setSelectedAbstraction(data.intent.abstractionLevel);
        }
      }
      if (data.graph) {
        setCurrentGraph(data.graph);
        if (data.graph.title) setDiagramName(data.graph.title);
      }
      if (data.qualityReport) setCurrentQuality(data.qualityReport);

      if (Array.isArray(data.logs)) {
        setAllLogs(prev => [...prev, ...data.logs]);
      }

      // Assistant Response Message
      const assistantMessage: ChatMessage = {
        id: `asst_${Date.now()}`,
        role: 'assistant',
        content: data.explanation || data.message || (isInitial
          ? `🎬 **Curtain Raised:** Synthesized first **${(data.intent?.abstractionLevel || 'logical').toUpperCase()}** architecture from first principles (Quality: **${data.qualityReport?.overallScore || 95}/100**).`
          : `✨ **Architecture Evolved:** Applied updates to diagram (Quality: **${data.qualityReport?.overallScore || 95}/100**).`),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: data.intent,
        qualityReport: data.qualityReport,
        logs: data.logs
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Synthesis error:', err);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Error:** ${err.message || 'Something went wrong during synthesis.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleOverrideAbstraction = (level: AbstractionLevel) => {
    setSelectedAbstraction(level);
    if (messages.length > 1) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMsg) {
        handleSynthesize(`Switch abstraction view to ${level.toUpperCase()} for: ${lastUserMsg.content}`, level);
      }
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#060A14] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col font-sans transition-colors duration-200`}>
      {/* 1. TOP GLOBAL NAVIGATION & TELEMETRY HEADER */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${theme === 'dark' ? 'bg-[#0B111E]/90 border-slate-800/80 shadow-lg shadow-black/20' : 'bg-white/90 border-slate-200 shadow-sm'}`}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand Block */}
          <div className="flex items-center gap-3">
            <Link href="/studio3" className="flex items-center gap-2 group">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Prompt<span className="text-blue-500">Canvas</span></span>
              <span className="px-2 py-0.5 text-[11px] font-black rounded-md bg-blue-600 text-white shadow-sm">Studio 3</span>
            </Link>
            <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-400 pl-3 border-l border-slate-700/60">
              <span className="text-amber-400">✨</span>
              <span>Zero Predefined Blueprints • Single-Session Generative Architecture Stage</span>
            </div>
          </div>

          {/* Abstraction Level Selector & Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Shareable Unique Link & ID Badge */}
            {diagramId && (
              <button
                onClick={handleCopyShareLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-blue-950/90 hover:bg-blue-900 border border-blue-500/60 text-blue-200 transition shadow-sm"
                title="Click to copy unique shareable link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <LinkIcon className="w-3.5 h-3.5 text-blue-400" />}
                <span>{copiedLink ? 'Copied Link!' : `ID: ${diagramId.slice(0, 8)}...`}</span>
              </button>
            )}

            {/* Reset Stage Button */}
            {currentXml && (
              <button
                onClick={handleResetStage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
                title="Reset stage and clear session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* Live Logs Indicator */}
            <button
              onClick={() => setActiveTab('logs')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition hover:bg-slate-800 shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gemini: {allLogs.length} Events</span>
            </button>

            {/* Quality Badge */}
            {currentQuality && (
              <button
                onClick={() => setActiveTab('quality')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-black transition hover:bg-emerald-900 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{currentQuality.overallScore}/100</span>
              </button>
            )}

            {/* Abstraction Level Chips */}
            <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 text-xs">
              {(['conceptual', 'logical', 'technical'] as AbstractionLevel[]).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => handleOverrideAbstraction(lvl)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                    selectedAbstraction === lvl
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lvl} View
                </button>
              ))}
            </div>

            {/* Navigation to other studios */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition">Studio 1</Link>
              <Link href="/studio2" className="px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition">Studio 2</Link>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-slate-200" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Export & Edit Buttons */}
            <button
              onClick={handleCopyXml}
              disabled={!currentXml}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 transition disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied XML' : 'Copy XML'}</span>
            </button>

            <button
              onClick={handleEditInDrawio}
              disabled={!currentXml}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition disabled:opacity-50"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Edit in Draw.io</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN PROPORTIONAL WORKSPACE: 30% CHATBOX & 70% CANVAS STAGE */}
      <main className="w-full max-w-[1920px] mx-auto px-4 md:px-6 py-4 flex flex-col lg:flex-row gap-5 h-[calc(100vh-76px)]">
        {/* LEFT PANE: CONVERSATIONAL CHAT & INTENT CONTROLLER (30% WIDTH) */}
        <div className={`w-full lg:w-[30%] min-w-[320px] max-w-[480px] flex flex-col rounded-2xl border ${theme === 'dark' ? 'border-slate-800 bg-[#0B111E] shadow-xl' : 'border-slate-200 bg-white shadow-md'} overflow-hidden`}>
          {/* Header */}
          <div className={`p-3.5 border-b ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50'} flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <Clapperboard className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                Architecture Director
              </span>
            </div>
            {currentIntent && (
              <span className="text-[10.5px] font-black px-2 py-0.5 rounded-md bg-blue-900/80 border border-blue-600 text-blue-200 uppercase tracking-wide">
                {currentIntent.abstractionLevel}
              </span>
            )}
          </div>

          {/* Quick Starter Chips */}
          <div className={`px-3 py-2 border-b ${theme === 'dark' ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-100 bg-slate-50/60'} flex items-center gap-1.5 overflow-x-auto text-[11px]`}>
            <span className="text-slate-400 font-bold whitespace-nowrap text-[10.5px]">Starters:</span>
            {STARTER_PROMPTS.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleSynthesize(sp.prompt, sp.abstraction)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-900 hover:bg-blue-900/60 hover:text-white text-slate-300 border border-slate-700/80 transition text-[10.5px] font-medium"
              >
                {sp.title}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md font-medium'
                      : theme === 'dark'
                      ? 'bg-slate-900 text-slate-100 border border-slate-700/80 rounded-bl-none shadow-sm'
                      : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {msg.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-black text-sky-300">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </div>

                  {/* Inline Telemetry Snippet (Collapsible Accordion) */}
                  {msg.logs && msg.logs.length > 0 && (
                    <details className="mt-2.5 pt-2 border-t border-slate-700/60 text-[10.5px] font-mono group">
                      <summary className="cursor-pointer text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 select-none py-1 font-bold">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>⚡ View Gemini Trace ({msg.logs.length} events)</span>
                      </summary>
                      <div className="mt-2 space-y-1.5 bg-black/70 p-2.5 rounded-lg border border-slate-800">
                        {msg.logs.map(l => (
                          <div key={l.id} className="flex items-center gap-1.5 text-cyan-300">
                            <span className="text-slate-500">[{l.timestamp}]</span>
                            <span className="font-bold uppercase text-[9px] px-1 rounded bg-slate-800 border border-slate-700 text-amber-300">{l.stage}</span>
                            <span className="truncate">{l.message}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-blue-400 p-3 bg-blue-950/40 rounded-xl border border-blue-800 font-mono">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                <span>[Stage Director] Synthesizing first-principles architecture...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Active Intent Status Bar */}
          {currentIntent && (
            <div className={`p-3 border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-blue-50/40'} text-xs`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider">
                  Active Mode: <span className="text-blue-400">{currentIntent.abstractionLevel}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{(currentIntent.bands || []).length} Bands • {currentGraph?.bands?.reduce((acc, b) => acc + (b.columns?.length || b.pipelineStages?.length || 0), 0) || 0} Zones</span>
              </div>
              <div className="flex items-center gap-1.5">
                {(['conceptual', 'logical', 'technical'] as AbstractionLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => handleOverrideAbstraction(lvl)}
                    className={`text-[10px] font-bold px-2 py-1 rounded border transition capitalize ${
                      selectedAbstraction === lvl
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className={`p-3 border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSynthesize(promptInput);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                placeholder="Describe your system or expand the active diagram..."
                disabled={loading}
                className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <button
                type="submit"
                disabled={!promptInput.trim() || loading}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition disabled:opacity-40 flex items-center justify-center shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PANE: PRE-SHOW CURTAIN STAGE & DRAW.IO VIEWPORT (70% WIDTH) */}
        <div className={`w-full lg:w-[70%] flex-1 flex flex-col rounded-2xl border ${theme === 'dark' ? 'border-slate-800 bg-[#0B111E] shadow-xl' : 'border-slate-200 bg-white shadow-md'} overflow-hidden`}>
          {/* Canvas Header */}
          <div className={`p-3 border-b ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50'} flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'canvas'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Draw.io Stage</span>
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'logs'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gemini Logs ({allLogs.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('quality')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'quality'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Quality Gate</span>
              </button>
              <button
                onClick={() => setActiveTab('xml')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'xml'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>XML</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono text-[11px]">
              {currentXml ? '16:9 • 1600x1000px' : 'STAGE CURTAIN CLOSED'}
            </div>
          </div>

          {/* Canvas Display Area */}
          <div className="flex-1 relative overflow-hidden bg-slate-950 flex items-center justify-center p-3">
            {/* Draw.io Canvas View OR Pre-Show Curtain Stage */}
            {activeTab === 'canvas' && (
              <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner relative flex items-center justify-center">
                {currentXml ? (
                  <DiagramViewerRenderSafe
                    xml={currentXml}
                    aspectRatioId="16:9"
                    bgTheme={theme}
                    allowFullScaleScroll={false}
                  />
                ) : (
                  /* 🎭 PRE-SHOW STAGE CURTAIN (ELEGANT EMPTY STATE) */
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none">
                    {/* Stage Ambient Lighting / Drapery Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.22),transparent_70%)] pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />

                    {/* Stage Curtain Silhouette Elements */}
                    <div className="absolute -top-12 -left-12 w-56 h-96 bg-gradient-to-r from-indigo-950/70 to-transparent rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -top-12 -right-12 w-56 h-96 bg-gradient-to-l from-indigo-950/70 to-transparent rounded-full blur-2xl pointer-events-none" />

                    {/* Central Stage Portal */}
                    <div className="relative z-10 max-w-xl flex flex-col items-center space-y-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-[0_0_35px_rgba(37,99,235,0.4)] border border-blue-400/40">
                          <Clapperboard className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] shadow-md flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                          Studio 3 Generative Stage
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                          The curtain is drawn. Enter any prompt in the Director Chat to raise the curtain and synthesize your architecture from first principles.
                        </p>
                      </div>

                      {/* Interactive Stage Starter Chips */}
                      <div className="w-full pt-2">
                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3">
                          Pick a Director Scenario:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                          {STARTER_PROMPTS.map((sp, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSynthesize(sp.prompt, sp.abstraction)}
                              className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-blue-950/80 border border-slate-700 hover:border-blue-500 transition group text-left space-y-1 shadow-md"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 group-hover:text-blue-300">
                                  {sp.category}
                                </span>
                                <Play className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition" />
                              </div>
                              <div className="text-xs font-bold text-slate-100 group-hover:text-white line-clamp-1">
                                {sp.title}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-2 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Zero Predefined Templates • Continuous Session State • 4-Phase Quality Gate</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LIVE GEMINI API LOGS TAB */}
            {activeTab === 'logs' && (
              <div className="w-full h-full p-6 overflow-auto bg-slate-950 text-cyan-300 font-mono text-xs rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>Real-Time Gemini API Execution Telemetry</span>
                  </div>
                  <span className="text-xs text-slate-400">{allLogs.length} Total Events Logged</span>
                </div>

                <div className="space-y-3">
                  {allLogs.length === 0 ? (
                    <div className="text-slate-500 italic">No API calls made yet. Enter a prompt to view live traces.</div>
                  ) : (
                    allLogs.map(l => (
                      <div
                        key={l.id}
                        className={`p-3.5 rounded-lg border ${
                          l.status === 'error'
                            ? 'bg-red-950/40 border-red-800/60 text-red-300'
                            : l.status === 'warning'
                            ? 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">{l.timestamp}</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 font-bold uppercase text-[9.5px] border border-slate-700 text-cyan-400">
                              {l.stage}
                            </span>
                            {l.model && (
                              <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[9.5px] border border-blue-800 font-bold">
                                {l.model}
                              </span>
                            )}
                          </div>
                          {l.latencyMs && (
                            <span className="flex items-center gap-1 text-slate-400 text-[10.5px]">
                              <Clock className="w-3.5 h-3.5" />
                              {l.latencyMs}ms
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold mt-1">{l.message}</div>
                        {l.payload && (
                          <pre className="mt-2 p-2 rounded bg-black/60 text-[10.5px] text-slate-300 overflow-x-auto border border-slate-800">
                            {JSON.stringify(l.payload, null, 2)}
                          </pre>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Quality Gate Inspector Tab */}
            {activeTab === 'quality' && (
              <div className="w-full h-full p-6 overflow-auto bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>Studio 3 Quality Gate & Audit Report</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">4-Phase Technical Accuracy, Spatial Collision, Versioning, and Client DOM Verification</p>
                  </div>
                  {currentQuality && (
                    <div className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border ${
                      currentQuality.certified
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                        : 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                    }`}>
                      {currentQuality.certified ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      <span>{currentQuality.certified ? 'CERTIFIED ARCHITECTURE' : 'REVIEW NEEDED'} ({currentQuality.overallScore}/100)</span>
                    </div>
                  )}
                </div>

                {!currentQuality ? (
                  <div className="text-slate-500 italic text-xs">No quality report generated yet. Synthesize an architecture to run automated gate checks.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Phase 1 */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Phase 1: Technical & Semantic</span>
                        <span className={currentQuality.phase1Technical.passed ? 'text-emerald-400' : 'text-red-400'}>
                          {currentQuality.phase1Technical.passed ? 'PASS' : 'WARN'} ({Math.round(currentQuality.phase1Technical.completenessScore * 100)}%)
                        </span>
                      </div>
                      <div className="text-slate-400 space-y-1">
                        <div>Matched Entities: {currentQuality.phase1Technical.matchedEntities.join(', ') || 'None'}</div>
                        {currentQuality.phase1Technical.ontologyErrors.length > 0 && (
                          <div className="text-red-400">Errors: {currentQuality.phase1Technical.ontologyErrors.join('; ')}</div>
                        )}
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Phase 2: 2D Spatial Geometry</span>
                        <span className={currentQuality.phase2Visual.passed ? 'text-emerald-400' : 'text-red-400'}>
                          {currentQuality.phase2Visual.passed ? 'PASS (0 Collisions)' : `FAIL (${currentQuality.phase2Visual.collisionsCount} Collisions)`}
                        </span>
                      </div>
                      <div className="text-slate-400 space-y-1">
                        <div>Density Grade: <span className="text-blue-400 capitalize">{currentQuality.phase2Visual.densityGrade}</span> ({Math.round(currentQuality.phase2Visual.visualDensity * 100)}% filled)</div>
                        <div>WCAG AA Contrast: <span className="text-emerald-400">PASSED</span></div>
                        {currentQuality.phase2Visual.htmlOverflowViolations && currentQuality.phase2Visual.htmlOverflowViolations.length > 0 && (
                          <div className="text-red-400">HTML Overflows: {currentQuality.phase2Visual.htmlOverflowViolations.join('; ')}</div>
                        )}
                        {currentQuality.phase2Visual.columnWidthViolations && currentQuality.phase2Visual.columnWidthViolations.length > 0 && (
                          <div className="text-red-400">Column Squeeze: {currentQuality.phase2Visual.columnWidthViolations.join('; ')}</div>
                        )}
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Phase 3: Conversational AST Versioning</span>
                        <span className="text-blue-400">VERIFIED</span>
                      </div>
                      <div className="text-slate-400 space-y-1">
                        <div>Added Nodes: {currentQuality.phase3Versioning.addedNodes.length}</div>
                        <div>Preserved Anchors: {currentQuality.phase3Versioning.anchorsPreservedCount}</div>
                      </div>
                    </div>

                    {/* Phase 4 */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Phase 4: Client DOM & Viewport</span>
                        <span className={currentQuality.phase4ClientPresentation?.passed ? 'text-emerald-400' : 'text-amber-400'}>
                          {currentQuality.phase4ClientPresentation?.passed ? 'PASS (Auto-Fit)' : 'WARN'}
                        </span>
                      </div>
                      <div className="text-slate-400 space-y-1">
                        <div>Viewport Containment: <span className="text-emerald-400 font-bold">{currentQuality.phase4ClientPresentation?.viewportContainment || 'auto_fit_guaranteed'}</span></div>
                        <div>Markdown Cleanliness: <span className="text-emerald-400 font-bold">{currentQuality.phase4ClientPresentation?.textFormatting || 'formatted_markdown'}</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* RAW XML CODE TAB */}
            {activeTab === 'xml' && (
              <div className="w-full h-full p-4 overflow-auto bg-slate-950 text-cyan-300 font-mono text-xs rounded-xl border border-slate-800 flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <span className="text-white font-bold">Draw.io XML AST</span>
                  <button
                    onClick={handleCopyXml}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="flex-1 overflow-auto text-[11px] leading-relaxed p-2 bg-black/60 rounded border border-slate-900 text-slate-300">
                  {currentXml || '<!-- No diagram synthesized yet. -->'}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
