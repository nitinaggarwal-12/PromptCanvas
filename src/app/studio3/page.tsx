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
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info,
  ArrowRight,
  Zap,
  Sliders,
  CheckCircle2,
  AlertCircle,
  FileCode,
  RotateCcw
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { AbstractionLevel, Studio3Intent } from '@/lib/studio3/intentParser';
import { Studio3SemanticGraph } from '@/lib/studio3/graphExtractor';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  intent?: Studio3Intent;
}

const STARTER_PROMPTS = [
  {
    title: 'Google OKF Overview',
    prompt: 'explain google OKF with the help of a diagram',
    abstraction: 'conceptual' as AbstractionLevel
  },
  {
    title: 'OKF Ecosystem & Workflow',
    prompt: 'compare and contrast this with other similar tools and how they work together',
    abstraction: 'logical' as AbstractionLevel
  },
  {
    title: 'Zero-Trust Financial Ledger',
    prompt: 'Architect a zero-trust multi-region financial ledger on Cloud Spanner, Cloud Armor, and KMS CMEK encryption',
    abstraction: 'technical' as AbstractionLevel
  },
  {
    title: 'Vertex AI Agentic RAG',
    prompt: 'Design a multi-agent RAG knowledge retrieval flow using Vertex AI Vector Search, Gemini Pro, and BigQuery data mesh',
    abstraction: 'logical' as AbstractionLevel
  }
];

export default function Studio3Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'canvas' | 'xml' | 'intent'>('canvas');
  const [copied, setCopied] = useState(false);

  // Active State
  const [currentXml, setCurrentXml] = useState<string>('');
  const [currentIntent, setCurrentIntent] = useState<Studio3Intent | null>(null);
  const [currentGraph, setCurrentGraph] = useState<Studio3SemanticGraph | null>(null);
  const [selectedAbstraction, setSelectedAbstraction] = useState<AbstractionLevel>('logical');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with default starter synthesis
  useEffect(() => {
    handleSynthesize('explain google OKF with the help of a diagram', 'conceptual');
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSynthesize = async (promptText: string, forcedAbstraction?: AbstractionLevel) => {
    if (!promptText.trim() || loading) return;

    setLoading(true);
    const userMsgId = `msg_${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        content: promptText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(newMessages);
    setPromptInput('');

    try {
      // 1. Synthesize via Studio 3 API (Zero-Template Engine)
      const res = await fetch('/api/studio3/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          intent: forcedAbstraction
            ? { abstractionLevel: forcedAbstraction }
            : currentIntent && messages.length > 0
            ? undefined
            : undefined,
          previousContext: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
          theme
        })
      });

      const data = await res.json();

      if (data.success && data.xml) {
        setCurrentXml(data.xml);
        setCurrentIntent(data.intent);
        setCurrentGraph(data.graph);
        setSelectedAbstraction(data.intent.abstractionLevel);

        const botReply =
          data.intent.actionType === 'band_expansion'
            ? `Expanded into a **Multi-Band Composite Architecture**! Added the comparative evaluation matrix at the top and the 4-step sequential knowledge workflow pipeline at the bottom.`
            : `Synthesized **${data.intent.abstractionLevel.toUpperCase()}** architecture from first principles for "${promptText}".`;

        setMessages(prev => [
          ...prev,
          {
            id: `msg_${Date.now() + 1}`,
            role: 'assistant',
            content: botReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            intent: data.intent
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `msg_${Date.now() + 1}`,
            role: 'assistant',
            content: `Failed to synthesize: ${data.error || 'Unknown error occurred.'}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err: any) {
      console.error('Synthesis error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          role: 'assistant',
          content: `Error connecting to Studio 3 generative engine: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOverrideAbstraction = (level: AbstractionLevel) => {
    setSelectedAbstraction(level);
    if (messages.length > 0) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || 'Current Architecture';
      handleSynthesize(lastUserMsg, level);
    }
  };

  const handleCopyXml = () => {
    if (!currentXml) return;
    navigator.clipboard.writeText(currentXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditInDrawio = () => {
    if (!currentXml) return;
    const encoded = encodeURIComponent(currentXml);
    window.open(`https://app.diagrams.net/#R${encoded}`, '_blank');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      {/* 1. TOP FULL-WIDTH STICKY NAVBAR */}
      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md ${theme === 'dark' ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="max-w-[1700px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-blue-600 font-extrabold text-xl tracking-tight">
              <span>PromptCanvas</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                Studio 3
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pl-3 border-l border-slate-200 dark:border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Zero Predefined Blueprints • First-Principles Intent Synthesis</span>
            </div>
          </div>

          {/* Abstraction Level Selector & Controls */}
          <div className="flex items-center gap-3">
            {/* Abstraction Level Chips */}
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              {(['conceptual', 'logical', 'technical'] as AbstractionLevel[]).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => handleOverrideAbstraction(lvl)}
                  className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                    selectedAbstraction === lvl
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {lvl} View
                </button>
              ))}
            </div>

            {/* Navigation to other studios */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <Link href="/" className="px-2.5 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-900">Studio 1</Link>
              <Link href="/studio2" className="px-2.5 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-900">Studio 2</Link>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Export & Edit Buttons */}
            <button
              onClick={handleCopyXml}
              disabled={!currentXml}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied XML' : 'Copy XML'}</span>
            </button>

            <button
              onClick={handleEditInDrawio}
              disabled={!currentXml}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition disabled:opacity-50"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Edit in Draw.io</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN 2-PANE WORKSPACE */}
      <main className="max-w-[1700px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-80px)]">
        {/* LEFT PANE: CONVERSATIONAL CHAT & INTENT CONTROLLER (5 Cols) */}
        <div className={`lg:col-span-5 flex flex-col rounded-2xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'} shadow-sm overflow-hidden`}>
          {/* Intent & Abstraction Status Header */}
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50/70'} flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Intent & Architecture Stream
              </span>
            </div>
            {currentIntent && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 uppercase">
                {currentIntent.abstractionLevel} • {currentIntent.topologyGrammar.replace('_', ' ')}
              </span>
            )}
          </div>

          {/* Quick Starter Chips */}
          <div className={`px-4 py-2.5 border-b ${theme === 'dark' ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-100 bg-slate-50/40'} flex items-center gap-2 overflow-x-auto text-[11px]`}>
            <span className="text-slate-400 dark:text-slate-500 font-semibold whitespace-nowrap">Try Prompts:</span>
            {STARTER_PROMPTS.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleSynthesize(sp.prompt, sp.abstraction)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-200/70 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-300 border border-slate-300/60 dark:border-slate-700/60 transition"
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
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : theme === 'dark'
                      ? 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-bl-none'
                      : 'bg-slate-100 text-slate-900 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p className="font-medium whitespace-pre-wrap">{msg.content}</p>

                  {/* If assistant message has intent details */}
                  {msg.intent && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/20 text-[10.5px] space-y-1 opacity-90">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Validated Goal: {msg.intent.primaryGoal}</span>
                      </div>
                      <div className="text-slate-300 dark:text-slate-400">
                        Grammar: <span className="font-semibold text-white">{msg.intent.topologyGrammar}</span> ({msg.intent.temporalNature})
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200/60 dark:border-blue-900/60">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Classifying intent & synthesizing zero-template visual graph...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Active Intent Confirmation Banner (Proactive Feedback) */}
          {currentIntent && (
            <div className={`p-3 border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-blue-50/40'} text-xs`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Active Abstraction: <span className="text-blue-600 dark:text-blue-400">{currentIntent.abstractionLevel}</span>
                </span>
                <span className="text-[10px] text-slate-400">{currentIntent.bands.length} Bands • {currentGraph?.bands.reduce((acc, b) => acc + (b.columns?.length || b.pipelineStages?.length || 0), 0) || 0} Zones</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOverrideAbstraction('conceptual')}
                  className={`text-[10px] font-semibold px-2 py-1 rounded border transition ${
                    selectedAbstraction === 'conceptual'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  Conceptual
                </button>
                <button
                  onClick={() => handleOverrideAbstraction('logical')}
                  className={`text-[10px] font-semibold px-2 py-1 rounded border transition ${
                    selectedAbstraction === 'logical'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  Logical System
                </button>
                <button
                  onClick={() => handleOverrideAbstraction('technical')}
                  className={`text-[10px] font-semibold px-2 py-1 rounded border transition ${
                    selectedAbstraction === 'technical'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  Technical Infra
                </button>
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
                placeholder="Describe system, add comparison, or expand workflow..."
                disabled={loading}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-medium border outline-none transition ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                }`}
              />
              <button
                type="submit"
                disabled={!promptInput.trim() || loading}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PANE: BRAND NEW DRAW.IO CANVAS & INSPECTOR (7 Cols) */}
        <div className={`lg:col-span-7 flex flex-col rounded-2xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'} shadow-sm overflow-hidden`}>
          {/* Canvas Viewport Header */}
          <div className={`p-3 border-b ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50/70'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'canvas'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Draw.io Canvas</span>
              </button>
              <button
                onClick={() => setActiveTab('xml')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'xml'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>XML Model</span>
              </button>
              <button
                onClick={() => setActiveTab('intent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'intent'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Semantic AST</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">
                16:9 • 1600x1000px
              </span>
            </div>
          </div>

          {/* Canvas Main Display Area */}
          <div className="flex-1 relative overflow-hidden bg-slate-100/50 dark:bg-slate-950/50 flex items-center justify-center p-4">
            {activeTab === 'canvas' && (
              <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-inner">
                {currentXml ? (
                  <DiagramViewerRenderSafe
                    xml={currentXml}
                    aspectRatioId="16:9"
                    bgTheme={theme}
                    allowFullScaleScroll={true}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
                    <Sparkles className="w-8 h-8 text-blue-500 mb-2 opacity-60 animate-pulse" />
                    <span>Enter a prompt to synthesize a first-principles diagram</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'xml' && (
              <div className="w-full h-full p-4 font-mono text-xs overflow-auto bg-slate-900 text-blue-300 rounded-xl border border-slate-800">
                <pre>{currentXml || '<!-- No XML generated yet -->'}</pre>
              </div>
            )}

            {activeTab === 'intent' && (
              <div className="w-full h-full p-4 font-mono text-xs overflow-auto bg-slate-900 text-emerald-300 rounded-xl border border-slate-800">
                <pre>{JSON.stringify({ intent: currentIntent, graph: currentGraph }, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
