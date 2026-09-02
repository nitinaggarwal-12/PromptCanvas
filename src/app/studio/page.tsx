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
  Bookmark
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { generateGcpNativeArchitectureXml } from '@/lib/gcpNativeArchitecture';
import { createDefaultFintechAst, ArchitectureAst, AstComponent } from '@/lib/ast/architectureAst';
import { generateAll10LivingSpecs, LivingSpecDocument } from '@/lib/spec/livingSpecsGenerator';
import { ComponentInspectorDrawer } from '@/components/studio/ComponentInspectorDrawer';
import { BrainGroundingModal } from '@/components/studio/BrainGroundingModal';
import { AudioBriefingModal } from '@/components/studio/AudioBriefingModal';
import { LivingSpecsViewer } from '@/components/studio/LivingSpecsViewer';
import { HierarchicalSyncCard } from '@/components/studio/HierarchicalSyncCard';
import { ObjectShareModal } from '@/components/studio/ObjectShareModal';
import { SaveToLibraryModal } from '@/components/studio/SaveToLibraryModal';

export interface StudioVersionSnapshot {
  id: string;
  versionTag: string;
  timestamp: string;
  author: 'User' | 'AI Assistant';
  actionSummary: string;
  ast: ArchitectureAst;
  xml: string;
}

export interface StudioChatMessage {
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

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-mono text-xs">Loading Architecture Studio...</div>}>
      <StudioMain />
    </Suspense>
  );
}

function StudioMain() {
  const searchParams = useSearchParams();

  // 1. Session UUID & Core Architecture State (AST & Living Specs)
  const [sessionId, setSessionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const urlId = new URLSearchParams(window.location.search).get('id');
      if (urlId) return urlId;
    }
    return 'ses_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  });

  const [ast, setAst] = useState<ArchitectureAst>(() => createDefaultFintechAst());
  const [activeView, setActiveView] = useState<'diagram' | 'specs'>('diagram');
  const [activeDocId, setActiveDocId] = useState<string>('DOC-01');
  const [xml, setXml] = useState<string>(() => generateGcpNativeArchitectureXml());
  
  // 2. Modals & Micro-Drawers
  const [selectedComponent, setSelectedComponent] = useState<AstComponent | null>(null);
  const [isBrainModalOpen, setIsBrainModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);

  // 3. Version History Snapshots
  const [versions, setVersions] = useState<StudioVersionSnapshot[]>([
    {
      id: 'v_1_0',
      versionTag: 'v1.0',
      timestamp: '10:14 AM',
      author: 'AI Assistant',
      actionSummary: 'Initial 6-Zone Synthesis with Cloud Spanner & Vertex AI',
      ast: createDefaultFintechAst(),
      xml: generateGcpNativeArchitectureXml()
    },
    {
      id: 'v_1_1',
      versionTag: 'v1.1',
      timestamp: '10:18 AM',
      author: 'User',
      actionSummary: 'Added europe-west1 Multi-Region DR & 99.999% SLA Sync',
      ast: createDefaultFintechAst(),
      xml: generateGcpNativeArchitectureXml()
    }
  ]);
  const [activeVersionTag, setActiveVersionTag] = useState('v1.1');

  // Object-Level Granular Sharing & Collaboration State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareTargetType, setShareTargetType] = useState<'project' | 'doc' | 'node' | 'version'>('project');
  const [shareTargetId, setShareTargetId] = useState('proj_root');
  const [shareTargetTitle, setShareTargetTitle] = useState(ast.metadata.projectTitle);

  // Save to Library Promotion State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSavedInLibrary, setIsSavedInLibrary] = useState(() => sessionId.startsWith('proj_'));

  const handleOpenShare = useCallback((type: 'project' | 'doc' | 'node' | 'version', id: string, title: string) => {
    setShareTargetType(type);
    setShareTargetId(id);
    setShareTargetTitle(title);
    setIsShareModalOpen(true);
  }, []);

  // 4. Conversational Turn Stream
  const [messages, setMessages] = useState<StudioChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'user',
      text: 'Design an ultra-low latency transaction mesh with Cloud Spanner nam3, Cloud HSM CMEK, and Gemini 2.5 Flash fraud reasoning.',
      timestamp: '10:14 AM'
    },
    {
      id: 'msg_2',
      sender: 'assistant',
      text: 'Compiled 6-Zone GCP Native Reference Architecture and generated 10 synchronized Living Specifications (PRD, HLD, STRIDE Threat Model, Spanner DDL, and BCDR Plan).',
      timestamp: '10:14 AM',
      actionSummary: {
        versionTag: 'v1.0',
        canvasDiff: 'Synthesized 18 Google Cloud nodes across 6 architectural tiers.',
        specDiff: 'Generated 10 living specification documents (DOC-01 through DOC-10).'
      }
    },
    {
      id: 'msg_3',
      sender: 'user',
      text: 'Add a secondary DR failover region in europe-west1, and update our SLA in the HLD and BCDR specs to 99.999%.',
      timestamp: '10:18 AM'
    },
    {
      id: 'msg_4',
      sender: 'assistant',
      text: 'Executed bidirectional synchronization pass across visual topology and living specifications.',
      timestamp: '10:18 AM',
      actionSummary: {
        versionTag: 'v1.1',
        canvasDiff: 'Added europe-west1 Cloud Spanner DR witness replica node & replication bus.',
        specDiff: 'Updated Chapter 5 in DOC-03 (HLD) & DOC-09 (BCDR Plan) to 99.999% SLA.'
      }
    }
  ]);

  const [promptInput, setPromptInput] = useState('');

  // Hydrate State from URL Deep-Link parameters and localStorage on initial mount
  useEffect(() => {
    if (!searchParams) return;
    const urlId = searchParams.get('id');
    const viewParam = searchParams.get('view');
    const docParam = searchParams.get('doc');
    const nodeParam = searchParams.get('node');
    const vParam = searchParams.get('v');

    if (urlId) {
      setSessionId(urlId);
      // Restore from localStorage if available
      try {
        const saved = localStorage.getItem(`promptcanvas_studio_${urlId}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.ast) setAst(parsed.ast);
          if (parsed.xml) setXml(parsed.xml);
          if (parsed.versions) setVersions(parsed.versions);
          if (parsed.messages) setMessages(parsed.messages);
          if (parsed.activeVersionTag) setActiveVersionTag(parsed.activeVersionTag);
        }
      } catch {
        // storage fallback
      }
    }

    if (viewParam === 'specs' || viewParam === 'diagram') {
      setActiveView(viewParam);
    }
    if (docParam) {
      setActiveDocId(docParam);
      setActiveView('specs');
    }
    if (nodeParam) {
      const paramLower = nodeParam.toLowerCase();
      const matched = ast.components.find(
        c => c.id.toLowerCase() === paramLower ||
             c.name.toLowerCase().includes(paramLower) ||
             c.service.toLowerCase().includes(paramLower) ||
             paramLower.includes(c.id.toLowerCase())
      );
      if (matched) {
        setSelectedComponent(matched);
        setActiveView('diagram');
      }
    }
    if (vParam) {
      setActiveVersionTag(vParam);
    }
  }, [searchParams]);

  // Continuously synchronize browser URL & LocalStorage with active session hierarchy
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    params.set('id', sessionId);
    if (ast.metadata.projectTitle) params.set('project', ast.metadata.projectTitle);
    params.set('v', activeVersionTag);
    params.set('view', activeView);
    if (activeView === 'specs' && activeDocId) {
      params.set('doc', activeDocId);
    } else if (activeView === 'diagram' && selectedComponent) {
      params.set('node', selectedComponent.id);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

    // Auto-save session state
    try {
      localStorage.setItem(`promptcanvas_studio_${sessionId}`, JSON.stringify({
        id: sessionId,
        projectTitle: ast.metadata.projectTitle,
        activeVersionTag,
        activeView,
        activeDocId,
        ast,
        xml,
        versions,
        messages,
        lastSaved: new Date().toISOString()
      }));
    } catch {
      // storage safeguard
    }
  }, [sessionId, activeView, activeDocId, selectedComponent, activeVersionTag, ast, xml, versions, messages]);

  // 5. Living Specs derived from AST
  const livingSpecs = useMemo(() => generateAll10LivingSpecs(ast), [ast]);

  // Handle Co-Pilot Prompt Execution
  const handleExecutePrompt = useCallback((promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: StudioChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setPromptInput('');

    // Simulate AI synthesis & AST update
    setTimeout(() => {
      const newVersionTag = `v1.${versions.length}`;
      const aiMsg: StudioChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: `Applied architecture refinement: "${promptText.slice(0, 60)}..."`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionSummary: {
          versionTag: newVersionTag,
          canvasDiff: `Updated component topology and connector routing in Draw.io XML.`,
          specDiff: `Reconciled DOC-01 through DOC-10 with updated parameters.`
        }
      };

      setMessages(prev => [...prev, aiMsg]);
      setActiveVersionTag(newVersionTag);

      const newSnapshot: StudioVersionSnapshot = {
        id: `v_${Date.now()}`,
        versionTag: newVersionTag,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        author: 'AI Assistant',
        actionSummary: promptText,
        ast: ast,
        xml: xml
      };

      setVersions(prev => [...prev, newSnapshot]);
    }, 600);
  }, [ast, xml, versions.length]);

  // 1-Click Starter Chips
  const handleStarterChip = (prompt: string, title: string) => {
    setAst(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        projectTitle: title,
        lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    }));
    handleExecutePrompt(prompt);
  };

  // Re-Ground Architecture Brain
  const handleAutoHeal = () => {
    setIsHealing(true);
    setTimeout(() => {
      setXml(generateGcpNativeArchitectureXml());
      setIsHealing(false);
      setIsBrainModalOpen(false);
    }, 1000);
  };

  // Open in diagrams.net Web Editor
  const handleOpenDiagramsNet = () => {
    const encoded = encodeURIComponent(xml);
    window.open(`https://app.diagrams.net/#R${encoded}`, '_blank');
  };

  // Export 10-Spec Markdown Bundle
  const handleExportMarkdownBundle = () => {
    const fullText = livingSpecs.map(doc => `=== ${doc.id}: ${doc.title} ===\n\n${doc.markdownContent}`).join('\n\n' + '='.repeat(80) + '\n\n');
    const blob = new Blob([fullText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ast.metadata.projectId}-living-specifications.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Start New Studio Architecture Session with Fresh UUID
  const handleNewSession = () => {
    const newId = 'ses_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    setSessionId(newId);
    setAst(createDefaultFintechAst());
    setXml(generateGcpNativeArchitectureXml());
    setActiveVersionTag('v1.0');
    setMessages([
      {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        text: 'Started a new Google Cloud Enterprise Architecture session. Tell me your project requirements or select a starter scenario below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="h-screen max-h-screen w-screen bg-[#F8FAFC] text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* 1. SINGLE SLIM HEADER (48px) */}
      <header className="w-full h-12 flex-shrink-0 bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between z-40 shadow-sm">
        
        {/* Left: Brand & Title with Version Dropdown */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/20 hover:opacity-90 transition">
              PC
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm text-slate-900 tracking-tight leading-none">{ast.metadata.projectTitle}</h1>
                {isSavedInLibrary ? (
                  <Link 
                    href="/library" 
                    className="hidden xl:flex items-center gap-1 text-[9.5px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-1.5 py-0.2 rounded-full font-semibold transition"
                    title="View saved blueprint in Architecture Library"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Saved in Library ↗</span>
                  </Link>
                ) : (
                  <span className="hidden xl:flex items-center gap-1 text-[9.5px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-full font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>Sandbox (Unsaved)</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Google Cloud Enterprise Reference Architecture • 6-Zone Certified</p>
            </div>
          </div>

          {/* Unique Session ID Badge */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(sessionId);
            }}
            className="hidden md:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2 py-1 rounded-md text-[10.5px] font-mono text-slate-600 transition"
            title="Click to copy Persistent Unique Session ID"
          >
            <span className="text-slate-400 font-sans">Session:</span>
            <span className="font-bold text-blue-600">{sessionId}</span>
          </button>

          {/* New Session Button */}
          <button
            onClick={handleNewSession}
            className="hidden md:flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 transition shadow-2xs"
            title="Create a new architecture canvas session"
          >
            <Plus className="w-3 h-3 text-slate-500" />
            <span>New</span>
          </button>

          {/* Version Snapshot Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] text-slate-700 transition font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-mono font-bold text-slate-900">{activeVersionTag}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isVersionDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in duration-100">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold px-2 py-1">Version History Snapshots</div>
                {versions.map(v => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setActiveVersionTag(v.versionTag);
                      setIsVersionDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg transition flex items-start gap-2 ${
                      v.versionTag === activeVersionTag ? 'bg-blue-50 text-blue-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="font-mono font-bold text-[10px] bg-slate-200 px-1 py-0.2 rounded mt-0.5">{v.versionTag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-[11px]">{v.actionSummary}</div>
                      <div className="text-[9px] text-slate-400 font-mono">{v.timestamp} • {v.author}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: 2-Way View Switcher */}
        <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-lg p-0.5 shadow-inner">
          <button
            onClick={() => setActiveView('diagram')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'diagram' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📐</span> <span>Architecture Diagram</span>
          </button>
          
          <button
            onClick={() => setActiveView('specs')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition flex items-center gap-1.5 ${
              activeView === 'specs' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📑</span> <span>Living Specs ({livingSpecs.length} Docs)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </button>
        </div>

        {/* Right: Audio Briefing, Brain Grounding & Export */}
        <div className="flex items-center gap-2.5">
          
          {/* Save to Library Action Button */}
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-xs ${
              isSavedInLibrary
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
            }`}
            title="Save this architecture sandbox state as a permanent blueprint in your Library"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSavedInLibrary ? 'Saved Blueprint ▾' : 'Save to Library'}</span>
          </button>

          {/* Share & Collaborate Granular Object Button */}
          <button
            onClick={() => handleOpenShare('project', 'proj_root', ast.metadata.projectTitle)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition shadow-2xs"
            title="Share & Collaborate at Object Hierarchy Level"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Share & Collaborate</span>
          </button>

          {/* Audio Overview Pill */}
          <button
            onClick={() => setIsAudioModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Audio Briefing (2-Min)</span>
          </button>

          {/* Brain Grounding Controller */}
          <button
            onClick={() => setIsBrainModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2.5 py-1.5 rounded-lg transition"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>Ground Brain ▾</span>
          </button>

          {/* Sync Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-md font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>100% In-Sync</span>
          </div>

          {/* Single Unified Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
            >
              <span>Export Bundle</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isExportDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in duration-100">
                <button
                  onClick={() => {
                    handleOpenDiagramsNet();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 font-medium flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>Open in diagrams.net</span>
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([xml], { type: 'application/xml' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${ast.metadata.projectId}-architecture.drawio`;
                    a.click();
                    URL.revokeObjectURL(url);
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 font-medium flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Draw.io XML</span>
                </button>
                <button
                  onClick={() => {
                    handleExportMarkdownBundle();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 font-medium flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Download 16-Spec Bundle</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 min-h-0 w-full flex overflow-hidden">
        
        {/* LEFT: INTERACTIVE ARCHITECTURE ARCASSIST (340px) */}
        <section className="w-[340px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full min-h-0 overflow-hidden shadow-sm z-10">
          
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>ArcAssist</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-semibold">Gemini 2.5 Pro</span>
          </div>

          {/* Starter Chips (FTUX Pillar 1) */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/50 space-y-1.5 flex-shrink-0">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instant 1-Click Starter Scenarios:</div>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleStarterChip('Design an ultra-low latency transaction mesh with Spanner nam3, Cloud HSM CMEK, and Gemini 2.5 Flash fraud reasoning.', 'NexusPay Multi-Region Settlement')}
                className="text-left p-2 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs text-slate-700 hover:text-blue-900 transition shadow-2xs font-medium"
              >
                ⚡ FinTech Real-Time Payment Mesh
              </button>
              <button
                onClick={() => handleStarterChip('Design a HIPAA-compliant multi-agent clinical oncology RAG pipeline with Vertex Vector Search and BigQuery.', 'OncoIntelligence Multi-Agent RAG')}
                className="text-left p-2 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs text-slate-700 hover:text-blue-900 transition shadow-2xs font-medium"
              >
                🧬 Precision Oncology Multi-Agent RAG
              </button>
              <button
                onClick={() => handleStarterChip('Design a global omnichannel event mesh with Datastream CDC, Cloud Dataflow streaming ETL, and Cloud Bigtable.', 'OmniStream Retail CDC Lakehouse')}
                className="text-left p-2 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs text-slate-700 hover:text-blue-900 transition shadow-2xs font-medium"
              >
                🛒 Global Retail Event Lakehouse
              </button>
            </div>
          </div>

          {/* Messages Scroll Stream */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id}
                  className={`rounded-xl p-3 space-y-1.5 ${
                    isUser ? 'bg-blue-50/80 border border-blue-200' : 'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className={`font-bold ${isUser ? 'text-blue-900' : 'text-slate-700'}`}>
                      {isUser ? '👤 You asked:' : '🤖 ArcAssist Synthesis:'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                  
                  <p className={`text-[11.5px] leading-relaxed ${isUser ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                    {msg.text}
                  </p>

                  {msg.actionSummary && (
                    <HierarchicalSyncCard
                      versionTag={msg.actionSummary.versionTag}
                      canvasDiff={msg.actionSummary.canvasDiff}
                      specDiff={msg.actionSummary.specDiff}
                      projectTitle={ast.metadata.projectTitle}
                      domain={ast.metadata.domain}
                      livingSpecs={livingSpecs}
                      components={ast.components}
                      onSelectDoc={(docId) => {
                        setActiveView('specs');
                        setActiveDocId(docId);
                      }}
                      onSelectNode={(comp) => {
                        setActiveView('diagram');
                        setSelectedComponent(comp);
                      }}
                      onSwitchToDiagram={() => setActiveView('diagram')}
                      onShareObject={(type, id, title) => handleOpenShare(type, id, title)}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Sticky Prompt Composer */}
          <div className="p-3 border-t border-slate-200 bg-slate-50/60 space-y-2 flex-shrink-0">
            <div className="relative">
              <textarea
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleExecutePrompt(promptInput);
                  }
                }}
                rows={2}
                placeholder="Ask ArcAssist to edit diagram or update specs..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none shadow-sm"
              />
              <button
                onClick={() => handleExecutePrompt(promptInput)}
                className="absolute bottom-2.5 right-2 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow transition flex items-center gap-1"
              >
                <span>Apply</span>
                <Send className="w-2.5 h-2.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>Target: <strong className="text-blue-600">Both (In-Sync)</strong></span>
              <span>Press Enter ↵</span>
            </div>
          </div>

        </section>

        {/* RIGHT: TOGGLED VIEW (Diagram Canvas OR Living Specs) */}
        {activeView === 'diagram' ? (
          
          // VIEW 1: FULL 16:9 DIAGRAM CANVAS
          <section className="flex-1 min-h-0 h-full bg-[#F1F5F9] flex flex-col relative overflow-hidden">
            
            {/* Inset Canvas Toolbar */}
            <div className="px-6 py-2 border-b border-slate-200 bg-white/90 flex items-center justify-between text-xs flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-slate-700 font-medium">
                  <button onClick={() => handleExecutePrompt('Add a new Cloud Armor WAF security policy layer.')} className="px-1.5 hover:text-blue-600 font-bold">+ Add Node</button>
                  <span className="text-slate-300">|</span>
                  <button className="px-1.5 hover:text-blue-600">Connect</button>
                  <span className="text-slate-300">|</span>
                  <button className="px-1.5 hover:text-blue-600">Group</button>
                </div>
                <span className="text-slate-400 text-[11px]">Click on any node below to inspect Terraform HCL, SLAs & Security Posture</span>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md text-[11px]">
                  <span className="text-slate-500 font-medium">Zoom:</span>
                  <span className="font-mono font-bold text-slate-900">100%</span>
                  <button className="ml-1 text-blue-600 hover:underline font-semibold">Fit (16:9)</button>
                </div>
                
                <button 
                  onClick={handleOpenDiagramsNet}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-semibold transition shadow-sm flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3 text-blue-600" />
                  <span>Full Draw.io Editor</span>
                </button>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="flex-1 min-h-0 p-6 flex items-center justify-center overflow-auto">
              <div 
                onClick={() => {
                  // Default sample click inspector for Cloud Spanner
                  const spanner = ast.components.find(c => c.service === 'Cloud Spanner') || ast.components[0];
                  setSelectedComponent(spanner);
                }}
                className="w-full max-w-[1440px] h-[720px] bg-white rounded-2xl border border-slate-300/80 shadow-2xl relative overflow-hidden cursor-pointer"
              >
                <DiagramViewerRenderSafe 
                  xml={xml} 
                  bgTheme="light"
                  useCaseName={ast.metadata.projectTitle}
                />
              </div>
            </div>

          </section>

        ) : (

          // VIEW 2: FULL LIVING SPECIFICATIONS WORKSPACE
          <LivingSpecsViewer
            specs={livingSpecs}
            activeDocId={activeDocId}
            onSelectDoc={id => setActiveDocId(id)}
            onSwitchToDiagramView={() => setActiveView('diagram')}
            onShareDoc={doc => handleOpenShare('doc', doc.id, `${doc.id}: ${doc.title}`)}
            currentXml={xml}
            projectName={ast.metadata.projectTitle}
            useCaseName={ast.metadata.domain}
          />

        )}

      </main>

      {/* 3. MODALS & SLIDEOUT DRAWERS */}
      <ComponentInspectorDrawer
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        onAiRefinePrompt={prompt => handleExecutePrompt(prompt)}
        onShareNode={node => handleOpenShare('node', node.id, node.name)}
      />

      <BrainGroundingModal
        isOpen={isBrainModalOpen}
        onClose={() => setIsBrainModalOpen(false)}
        onAutoHeal={handleAutoHeal}
        isHealing={isHealing}
      />

      <AudioBriefingModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        title={ast.metadata.projectTitle}
      />

      <ObjectShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        targetType={shareTargetType}
        targetId={shareTargetId}
        targetTitle={shareTargetTitle}
        projectTitle={ast.metadata.projectTitle}
        domain={ast.metadata.domain}
        activeVersionTag={activeVersionTag}
        activeDoc={livingSpecs.find(d => d.id === activeDocId)}
        activeNode={selectedComponent}
      />

      <SaveToLibraryModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSaveSuccess={({ id, name, domain }) => {
          setIsSavedInLibrary(true);
          setSessionId(id);
          setAst(prev => ({
            ...prev,
            metadata: {
              ...prev.metadata,
              projectTitle: name,
              domain: domain
            }
          }));
        }}
        initialProjectTitle={ast.metadata.projectTitle}
        initialDomain={ast.metadata.domain}
        ast={ast}
        xml={xml}
        versions={versions}
        messages={messages}
        activeVersionTag={activeVersionTag}
      />

    </div>
  );
}
