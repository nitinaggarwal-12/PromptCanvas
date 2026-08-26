'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Layers,
  Sparkles,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  ExternalLink,
  Eye,
  RefreshCw,
  Sliders,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  ArrowRight,
  BookOpen,
  Share2,
  X,
  FileText,
  History,
  Network,
  ShieldCheck,
  Settings,
  User,
  Compass,
  Menu,
  Plus,
  BarChart3,
  CheckCircle2,
  Code,
  LayoutGrid,
  Send,
  Loader2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  FolderOpen
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
} from '@/lib/canonical/canonicalTemplates';
import { getDefaultXmlForArchitecture, getArchitectureTypeById } from '@/lib/architectureTypes';
import { injectUseCaseFlavor } from '@/lib/diagramCleaner';

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
  const isNew = searchParams.get('new') === 'true';

  const [activeDiagram, setActiveDiagram] = useState<DiagramRecord | null>(null);
  const [selectedArchType, setSelectedArchType] = useState<string>(initialArch);
  const [selectedDomain, setSelectedDomain] = useState<string>('Biopharma');
  const [promptInput, setPromptInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'canvas' | 'xml' | 'nodes' | 'history'>('canvas');
  const [copied, setCopied] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);
  const [diagramsList, setDiagramsList] = useState<DiagramRecord[]>([]);

  // Current XML content
  const [currentXml, setCurrentXml] = useState<string>(() => {
    const raw = getDefaultXmlForArchitecture(initialArch) || CANONICAL_TEMPLATES[0].generateXml('NOVACURA');
    return injectUseCaseFlavor(raw, 'Biopharma Enterprise Platform');
  });

  const [activeVersionNumber, setActiveVersionNumber] = useState<number>(1);
  const [versionHistory, setVersionHistory] = useState<DiagramVersion[]>([]);

  // Load Diagram from DB if diagram query parameter exists
  useEffect(() => {
    if (initialDiagramId && !isNew) {
      fetch(`/api/diagrams/${initialDiagramId}`)
        .then(res => res.json())
        .then(data => {
          if (data.diagram) {
            setActiveDiagram(data.diagram);
            if (data.diagram.architecture_type) {
              setSelectedArchType(data.diagram.architecture_type);
            }
            if (data.diagram.versions && data.diagram.versions.length > 0) {
              const sorted = [...data.diagram.versions].sort((a, b) => b.version_number - a.version_number);
              setVersionHistory(sorted);
              setCurrentXml(sorted[0].xml_content);
              setActiveVersionNumber(sorted[0].version_number);
            }
          }
        })
        .catch(console.error);
    } else {
      // Default pristine template
      const baseXml = getDefaultXmlForArchitecture(selectedArchType) || CANONICAL_TEMPLATES[0].generateXml('NOVACURA');
      const flavored = injectUseCaseFlavor(baseXml, selectedDomain);
      setCurrentXml(flavored);
      setVersionHistory([
        {
          id: 'v1_init',
          version_number: 1,
          xml_content: flavored,
          comment: `Pristine ${getArchitectureTypeById(selectedArchType)?.name || selectedArchType}`,
          created_by: 'System',
          created_at: new Date().toISOString(),
          prompt: 'Initial pristine master blueprint',
          architecture_type: selectedArchType
        }
      ]);
      setActiveVersionNumber(1);
    }
  }, [initialDiagramId, isNew]);

  // Load all diagrams list for project picker
  useEffect(() => {
    fetch('/api/diagrams')
      .then(res => res.json())
      .then(data => {
        if (data.diagrams) setDiagramsList(data.diagrams);
      })
      .catch(console.error);
  }, []);

  // Handle Architecture Blueprint Switch
  const handleSelectBlueprint = (archId: string) => {
    setSelectedArchType(archId);
    const archName = getArchitectureTypeById(archId)?.name || archId;
    const baseXml = getDefaultXmlForArchitecture(archId) || CANONICAL_TEMPLATES.find(t => t.id === archId)?.generateXml('NOVACURA') || CANONICAL_TEMPLATES[0].generateXml('NOVACURA');
    const flavored = injectUseCaseFlavor(baseXml, selectedDomain);
    setCurrentXml(flavored);

    const nextVer: DiagramVersion = {
      id: `v_${Date.now()}`,
      version_number: versionHistory.length + 1,
      xml_content: flavored,
      comment: `Switched to Blueprint: ${archName}`,
      created_by: 'User',
      created_at: new Date().toISOString(),
      prompt: `Switched blueprint to ${archName}`,
      architecture_type: archId
    };

    setVersionHistory(prev => [nextVer, ...prev]);
    setActiveVersionNumber(nextVer.version_number);
  };

  // Handle Domain Preset Re-flavoring
  const handleSelectDomain = (domainName: string) => {
    setSelectedDomain(domainName);
    const reflavored = injectUseCaseFlavor(currentXml, domainName, domainName);
    setCurrentXml(reflavored);

    const nextVer: DiagramVersion = {
      id: `v_${Date.now()}`,
      version_number: versionHistory.length + 1,
      xml_content: reflavored,
      comment: `Domain flavored for: ${domainName}`,
      created_by: 'AI',
      created_at: new Date().toISOString(),
      prompt: `Apply ${domainName} domain terminology`,
      architecture_type: selectedArchType
    };

    setVersionHistory(prev => [nextVer, ...prev]);
    setActiveVersionNumber(nextVer.version_number);
  };

  // Handle AI Prompt Generation & Refinement
  const handleGeneratePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isGenerating) return;

    const userPrompt = promptInput.trim();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          diagramId: activeDiagram?.id,
          architectureType: selectedArchType,
          existingXml: currentXml
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate diagram refinement');
      }

      const data = await res.json();
      const newXml = data.xml || data.diagram?.xml || currentXml;
      setCurrentXml(newXml);

      const nextVer: DiagramVersion = {
        id: `v_${Date.now()}`,
        version_number: versionHistory.length + 1,
        xml_content: newXml,
        comment: `AI Refinement: "${userPrompt.slice(0, 40)}..."`,
        created_by: 'AI',
        created_at: new Date().toISOString(),
        prompt: userPrompt,
        architecture_type: selectedArchType
      };

      setVersionHistory(prev => [nextVer, ...prev]);
      setActiveVersionNumber(nextVer.version_number);
      setPromptInput('');
    } catch (err) {
      console.error(err);
      // Fallback local flavor injection
      const flavored = injectUseCaseFlavor(currentXml, userPrompt, userPrompt);
      setCurrentXml(flavored);
      const nextVer: DiagramVersion = {
        id: `v_${Date.now()}`,
        version_number: versionHistory.length + 1,
        xml_content: flavored,
        comment: `Domain adapted: "${userPrompt.slice(0, 40)}..."`,
        created_by: 'AI',
        created_at: new Date().toISOString(),
        prompt: userPrompt,
        architecture_type: selectedArchType
      };
      setVersionHistory(prev => [nextVer, ...prev]);
      setActiveVersionNumber(nextVer.version_number);
      setPromptInput('');
    } finally {
      setIsGenerating(false);
    }
  };

  // Rollback to previous version
  const handleRollback = (ver: DiagramVersion) => {
    setCurrentXml(ver.xml_content);
    setActiveVersionNumber(ver.version_number);
    if (ver.architecture_type) {
      setSelectedArchType(ver.architecture_type);
    }
  };

  // Copy XML to clipboard
  const handleCopyXml = () => {
    navigator.clipboard.writeText(currentXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download XML file
  const handleDownloadXml = () => {
    const blob = new Blob([currentXml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedArchType}_v${activeVersionNumber}.drawio`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Dynamic Suggestion Chips
  const suggestionChips = useMemo(() => {
    if (/ocean|subsea|auv|sonar|bathymetry/i.test(selectedDomain)) {
      return [
        'Add Acoustic Doppler Velocity Profiler table',
        'Connect Swarm Gateways with PointNet++ Segmenter',
        'Enforce Maritime EEZ Boundary Security Controls',
        'Add Multi-Beam Sonar Ingress Buffer'
      ];
    }
    if (/fintech|banking|payments/i.test(selectedDomain)) {
      return [
        'Add Real-Time ISO 8583 Message Parser',
        'Enforce PCI-DSS Tokenization Boundary',
        'Connect Ledger Stream to Low-Latency Spanner',
        'Add ML Fraud Scoring ReAct Loop'
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
      {/* 1. Sidebar */}
      <UnifiedAppSidebar />

      {/* 2. Main Studio Viewport */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col h-screen">
        {/* Sticky Top Header */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md px-4 md:px-8 py-3 flex items-center justify-between transition-colors shrink-0 ${
          isLight ? 'bg-white/90 border-slate-200 shadow-xs' : 'bg-[#070B16]/90 border-slate-800/80 shadow-md'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#090D18]'}`}>
                <Layers className="w-4 h-4 text-teal-500" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-black text-sm md:text-base tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  DiaGen Studio
                </span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 shrink-0">
                  v{activeVersionNumber}
                </span>
              </div>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate">
                {getArchitectureTypeById(selectedArchType)?.name || selectedArchType}
              </p>
            </div>
          </div>

          {/* Center: Domain Presets */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {['Biopharma', 'FinTech', 'Retail', 'Ocean & AUV', 'Manufacturing', 'SaaS AI'].map((domain) => (
              <button
                key={domain}
                onClick={() => handleSelectDomain(domain)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDomain.toLowerCase().includes(domain.toLowerCase().slice(0, 4))
                    ? 'bg-teal-600 text-white shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsHistoryDrawerOpen(!isHistoryDrawerOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-extrabold transition cursor-pointer ${
                isHistoryDrawerOpen
                  ? 'bg-teal-50 border-teal-300 text-teal-900 dark:bg-teal-950/60 dark:border-teal-500 dark:text-teal-200'
                  : isLight
                  ? 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                  : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
              }`}
              title="Toggle Version History"
            >
              <History className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Versions ({versionHistory.length})</span>
            </button>

            <button
              onClick={handleCopyXml}
              className="p-2 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition border-slate-200 dark:border-slate-800"
              title="Copy Raw Draw.io XML"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleDownloadXml}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
              title="Download Draw.io Diagram File"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Draw.io</span>
            </button>

            <ThemeToggleBtn />
          </div>
        </header>

        {/* Studio Workspace 2-Column Split */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
          {/* Left Studio Refinement Panel (380px) */}
          <div className={`w-full lg:w-[380px] border-r flex flex-col shrink-0 overflow-y-auto ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#080C17] border-slate-800/80'
          }`}>
            <div className="p-4 space-y-4">
              {/* AI Refinement Prompt Form */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isLight ? 'bg-teal-50/40 border-teal-200/80 shadow-xs' : 'bg-slate-900/60 border-teal-500/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-black block">Gemini 3.7 Flash</span>
                      <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400 block -mt-0.5">Architecture Compiler</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
                    Enter ↵
                  </span>
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
                        className={`text-left text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition cursor-pointer truncate ${
                          isLight
                            ? 'bg-white hover:bg-teal-50/80 border-slate-200 hover:border-teal-300 text-slate-700'
                            : 'bg-slate-950 hover:bg-teal-950/40 border-slate-800 hover:border-teal-500/40 text-slate-300'
                        }`}
                      >
                        ⚡ {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Master Blueprint Quick Picker */}
              <div className="space-y-2">
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

                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {CANONICAL_TEMPLATES.slice(0, 8).map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => handleSelectBlueprint(tmpl.id)}
                      className={`w-full text-left p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        selectedArchType === tmpl.id
                          ? 'bg-sky-600 text-white font-extrabold shadow-sm'
                          : isLight
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="truncate">{tmpl.name}</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                        selectedArchType === tmpl.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        #{tmpl.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Canvas Viewport */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#0A0E1A] overflow-hidden relative">
            {/* Viewport Toolbar */}
            <div className={`px-4 py-2 border-b flex items-center justify-between shrink-0 z-10 ${
              isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-[#090D18]/90 border-slate-800/80'
            }`}>
              {/* Tab Selector */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('canvas')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    activeTab === 'canvas'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Visual Canvas
                </button>
                <button
                  onClick={() => setActiveTab('xml')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'xml'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-3 h-3" />
                  <span>Draw.io XML</span>
                </button>
              </div>

              {/* Zoom & Inspection Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs text-white">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                    className="p-1 hover:bg-slate-800 rounded cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono px-1.5 text-[11px] font-bold">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(200, prev + 10))}
                    className="p-1 hover:bg-slate-800 rounded cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(100)}
                    className="px-1.5 py-0.5 text-[10px] font-bold text-slate-400 hover:text-white cursor-pointer"
                    title="Reset Zoom"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Viewport Content */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-radial from-slate-900/50 to-[#060913]">
              {activeTab === 'canvas' ? (
                <div
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                  className="transition-transform duration-150 w-full max-w-[1600px] h-[920px] rounded-2xl shadow-2xl border border-slate-800/80 bg-white dark:bg-[#0B111E] overflow-hidden"
                >
                  <DiagramViewerRenderSafe
                    xml={currentXml}
                    title={getArchitectureTypeById(selectedArchType)?.name || 'Diagram View'}
                    theme={theme}
                    fit={true}
                    allowDownload={true}
                  />
                </div>
              ) : (
                <div className="w-full h-full p-4 font-mono text-xs text-emerald-400 bg-slate-950 rounded-2xl border border-slate-800 overflow-auto leading-relaxed">
                  <pre>{currentXml}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Slideout History Drawer */}
          {isHistoryDrawerOpen && (
            <div className={`w-80 border-l flex flex-col shrink-0 animate-in slide-in-from-right duration-200 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#080C17] border-slate-800/80'
            }`}>
              <div className="p-4 border-b flex items-center justify-between shrink-0">
                <span className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-500" />
                  <span>Version Timeline</span>
                </span>
                <button onClick={() => setIsHistoryDrawerOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {versionHistory.map((ver) => (
                  <div
                    key={ver.id}
                    className={`p-3 rounded-xl border text-xs space-y-2 transition-all ${
                      activeVersionNumber === ver.version_number
                        ? 'bg-teal-500/10 border-teal-500/40 text-white'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="font-bold text-teal-600 dark:text-teal-400">v{ver.version_number}</span>
                      <span>{new Date(ver.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <p className="font-bold line-clamp-2">{ver.comment || 'Version Snapshot'}</p>

                    {ver.prompt && (
                      <p className="text-[11px] text-slate-400 italic line-clamp-2">
                        &ldquo;{ver.prompt}&rdquo;
                      </p>
                    )}

                    {activeVersionNumber !== ver.version_number && (
                      <button
                        onClick={() => handleRollback(ver)}
                        className="w-full py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-[10px] transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Rollback to v{ver.version_number}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DiaGenPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#060913] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    }>
      <DiaGenStudioContent />
    </Suspense>
  );
}
