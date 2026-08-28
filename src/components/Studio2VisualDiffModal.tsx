'use client';

import React, { useState, useMemo } from 'react';
import {
  GitCompare,
  X,
  Sparkles,
  Edit3,
  Layers,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  MinusCircle,
  FileCode,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Check,
  ChevronDown,
  Terminal,
  Shield,
  Activity,
  ArrowLeftRight
} from 'lucide-react';
import DiagramViewerVisual from './DiagramViewerRenderSafe';
import { computeArchitectureDiff, ArchitectureDiffResult } from '@/lib/diffEngine';

export interface StudioDiagramTab {
  id: string;
  title: string;
  templateId: string;
  xml: string;
  source: 'functional_flowchart' | 'generic_architecture' | 'custom';
  lastPrompt?: string;
}

export interface StudioVersionSnapshot {
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
  originType?: 'prompt' | 'manual' | 'system';
  promptDetails?: {
    promptText: string;
    targetTier?: string;
    model?: string;
    summary?: string;
    changedComponents?: string[];
  };
  manualDetails?: {
    action: string;
    summary: string;
    timestamp?: string;
  };
}

interface Studio2VisualDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  versionHistory: StudioVersionSnapshot[];
  currentHistoryIndex: number;
  activeDiagramId: string;
  onRestoreVersion?: (snapshot: StudioVersionSnapshot) => void;
  isLight: boolean;
}

export function Studio2VisualDiffModal({
  isOpen,
  onClose,
  versionHistory,
  currentHistoryIndex,
  activeDiagramId,
  onRestoreVersion,
  isLight
}: Studio2VisualDiffModalProps) {
  const [indexA, setIndexA] = useState<number>(() => {
    return versionHistory.length > 1 ? versionHistory.length - 1 : 0;
  });
  const [indexB, setIndexB] = useState<number>(() => {
    return currentHistoryIndex >= 0 ? currentHistoryIndex : 0;
  });
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(activeDiagramId || 'diag_1');
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'connectors' | 'prompt'>('overview');
  const [zoomA, setZoomA] = useState<number>(1.0);
  const [zoomB, setZoomB] = useState<number>(1.0);
  const [copiedDiff, setCopiedDiff] = useState<boolean>(false);

  if (!isOpen || versionHistory.length === 0) return null;

  const snapA = versionHistory[indexA] || versionHistory[versionHistory.length - 1] || versionHistory[0];
  const snapB = versionHistory[indexB] || versionHistory[0];

  const diagA = snapA?.diagrams?.find((d) => d.id === selectedDiagramId) || snapA?.diagrams?.[0];
  const diagB = snapB?.diagrams?.find((d) => d.id === selectedDiagramId) || snapB?.diagrams?.[0];

  const xmlA = diagA?.xml || '';
  const xmlB = diagB?.xml || '';

  // Deep AST & Geometric Diff Analysis
  const diffResult: ArchitectureDiffResult = useMemo(() => {
    return computeArchitectureDiff(xmlA, xmlB, snapA?.versionTag || 'v1.0', snapB?.versionTag || 'v2.0');
  }, [xmlA, xmlB, snapA?.versionTag, snapB?.versionTag]);

  // Determine Origin & Prompt Details for Snapshot B
  const isPromptB =
    snapB?.originType === 'prompt' ||
    Boolean(snapB?.promptDetails?.promptText) ||
    Boolean(snapB?.projectScopePrompt) ||
    snapB?.author === 'AI Assistant';

  const isManualB =
    snapB?.originType === 'manual' ||
    snapB?.actionSummary?.toLowerCase().includes('draw.io') ||
    snapB?.actionSummary?.toLowerCase().includes('canvas');

  const promptTextB =
    snapB?.promptDetails?.promptText ||
    snapB?.projectScopePrompt ||
    (isPromptB ? snapB?.actionSummary : '');

  const targetTierB =
    snapB?.promptDetails?.targetTier ||
    snapB?.targetTier ||
    'Global Architecture';

  const handleSwap = () => {
    const temp = indexA;
    setIndexA(indexB);
    setIndexB(temp);
  };

  const handleCopyDiff = () => {
    const report = `# Architecture Diff Report: ${snapA?.versionTag} vs ${snapB?.versionTag}
**Diagram:** ${diagB?.title || selectedDiagramId}
**Summary:** ${diffResult.summary}
**Change Source:** ${isPromptB ? 'AI Prompt Refinement' : isManualB ? 'Manual Draw.io Edit' : 'System Baseline'}
${promptTextB ? `**User Prompt:** "${promptTextB}"\n**Target Tier:** ${targetTierB}\n` : ''}
## Statistics
- Added: ${diffResult.stats.addedCount} elements
- Modified: ${diffResult.stats.modifiedCount} elements
- Removed: ${diffResult.stats.removedCount} elements
- Connectors Changed: ${diffResult.stats.edgesChangedCount} routes

## Added Components
${diffResult.addedNodes.map((n) => `- **${n.name}**: ${n.description}`).join('\n') || '- None'}

## Modified Components & Labels
${diffResult.modifiedNodes.map((n) => `- **${n.name}**: ${n.description}`).join('\n') || '- None'}

## Edge & Route Refinements
${diffResult.modifiedEdges.map((e) => `- **${e.name}**: ${e.description}`).join('\n') || '- None'}
`;
    navigator.clipboard.writeText(report);
    setCopiedDiff(true);
    setTimeout(() => setCopiedDiff(false), 3000);
  };

  const availableDiagrams = snapB?.diagrams || snapA?.diagrams || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-[98vw] h-[95vh] rounded-2xl bg-white dark:bg-[#090D16] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* =====================================================================
            1. MODAL HEADER BAR
           ===================================================================== */}
        <div className="p-3.5 px-6 bg-slate-50 dark:bg-[#0D1322] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 p-0.5 shadow-md flex items-center justify-center text-white">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white tracking-tight">
                  Visual Side-by-Side Architecture Diff &amp; AST Change Inspector
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[11px] font-bold border border-teal-500/30 font-mono">
                  {snapA?.versionTag} ⇄ {snapB?.versionTag}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {diffResult.summary}
              </p>
            </div>
          </div>

          {/* Diagram Selector & Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Active Tab switcher */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              {availableDiagrams.map((diag) => (
                <button
                  key={diag.id}
                  type="button"
                  onClick={() => setSelectedDiagramId(diag.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDiagramId === diag.id
                      ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {diag.title.split('•')[0].trim()}
                </button>
              ))}
            </div>

            {/* Quick Metrics Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold">
              <span className="text-emerald-500">+{diffResult.stats.addedCount} Added</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-500">~{diffResult.stats.modifiedCount} Mod</span>
              <span className="text-slate-400">•</span>
              <span className="text-rose-500">-{diffResult.stats.removedCount} Rem</span>
            </div>

            <button
              type="button"
              onClick={handleCopyDiff}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Copy markdown diff report"
            >
              {copiedDiff ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedDiff ? 'Copied Report!' : 'Export Diff'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =====================================================================
            2. MAIN DUAL VIEWPORT & DIFF WORKSPACE (SPLIT 50/50)
           ===================================================================== */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 overflow-hidden bg-slate-100 dark:bg-[#070A12]">
          
          {/* -----------------------------------------------------------------
              LEFT COLUMN: VERSION A (BASELINE / BEFORE)
             ----------------------------------------------------------------- */}
          <div className="flex flex-col h-full rounded-xl bg-white dark:bg-[#0D1322] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Version A Selector Header */}
            <div className="p-3 bg-slate-50 dark:bg-[#0A0F1D] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-black flex items-center justify-center font-mono shrink-0">
                  A
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                      Reference / Baseline
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                      {snapA?.versionTag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dropdown to select Version A */}
              <div className="flex items-center gap-2">
                <select
                  value={indexA}
                  onChange={(e) => setIndexA(Number(e.target.value))}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 cursor-pointer shadow-sm"
                >
                  {versionHistory.map((v, idx) => (
                    <option key={v.id} value={idx}>
                      {v.versionTag} — {v.actionSummary?.slice(0, 32)} ({v.timestamp})
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setZoomA((z) => Math.max(0.6, z - 0.1))}
                    className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-mono font-bold px-1 text-slate-600 dark:text-slate-400">
                    {Math.round(zoomA * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomA((z) => Math.min(1.8, z + 0.1))}
                    className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Version A Meta / Origin Badge */}
            <div className="px-3.5 py-2 bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2 truncate">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {snapA?.actionSummary}
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-mono text-[10.5px]">Author: {snapA?.author}</span>
              </div>
              <span className="text-[10.5px] font-mono text-slate-400 shrink-0">{snapA?.timestamp}</span>
            </div>

            {/* Version A Live Canvas */}
            <div className="flex-1 w-full bg-[#FFFFFF] dark:bg-[#070A12] overflow-auto flex items-center justify-center p-2 relative">
              <div
                style={{
                  transform: `scale(${zoomA})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DiagramViewerVisual
                  key={`diff_view_A_${snapA?.id}_${selectedDiagramId}_${xmlA.length}`}
                  xml={xmlA}
                  diagramId={`diff_A_${snapA?.id}`}
                  bgTheme={isLight ? 'light' : 'dark'}
                  aspectRatioId="16:9"
                />
              </div>
            </div>

            {/* Version A Footer Actions */}
            {onRestoreVersion && (
              <div className="p-2.5 px-3 bg-slate-50 dark:bg-[#0A0F1D] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Reference Snapshot ({snapA?.versionTag})</span>
                <button
                  type="button"
                  onClick={() => onRestoreVersion(snapA)}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span>Restore Version {snapA?.versionTag}</span>
                </button>
              </div>
            )}
          </div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN: VERSION B (TARGET / AFTER)
             ----------------------------------------------------------------- */}
          <div className="flex flex-col h-full rounded-xl bg-white dark:bg-[#0D1322] border border-teal-500/40 dark:border-teal-500/30 shadow-md overflow-hidden ring-1 ring-teal-500/20">
            {/* Version B Selector Header */}
            <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 border-b border-teal-500/20 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 text-xs font-black flex items-center justify-center font-mono shrink-0">
                  B
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                      Target / Comparison
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-teal-500/20 text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 border border-teal-500/30">
                      {snapB?.versionTag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer text-xs flex items-center gap-1 font-bold shadow-sm"
                  title="Swap Version A & B"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="hidden sm:inline">Swap</span>
                </button>

                <select
                  value={indexB}
                  onChange={(e) => setIndexB(Number(e.target.value))}
                  className="px-2.5 py-1 rounded-lg border border-teal-500/40 dark:border-teal-500/30 text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 cursor-pointer shadow-sm"
                >
                  {versionHistory.map((v, idx) => (
                    <option key={v.id} value={idx}>
                      {v.versionTag} — {v.actionSummary?.slice(0, 32)} ({v.timestamp})
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setZoomB((z) => Math.max(0.6, z - 0.1))}
                    className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-mono font-bold px-1 text-slate-600 dark:text-slate-400">
                    {Math.round(zoomB * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomB((z) => Math.min(1.8, z + 0.1))}
                    className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Version B Meta / Origin Attribution */}
            <div className="px-3.5 py-2 bg-teal-50/30 dark:bg-slate-900/40 border-b border-teal-500/20 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2 truncate">
                <span className="font-bold text-teal-700 dark:text-teal-300">
                  {snapB?.actionSummary}
                </span>
                <span className="text-slate-400">•</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold font-mono bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {isPromptB ? '🤖 AI Prompt' : isManualB ? '✏️ Manual Canvas' : '🏛️ Baseline'}
                </span>
              </div>
              <span className="text-[10.5px] font-mono text-slate-400 shrink-0">{snapB?.timestamp}</span>
            </div>

            {/* Version B Live Canvas */}
            <div className="flex-1 w-full bg-[#FFFFFF] dark:bg-[#070A12] overflow-auto flex items-center justify-center p-2 relative">
              <div
                style={{
                  transform: `scale(${zoomB})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DiagramViewerVisual
                  key={`diff_view_B_${snapB?.id}_${selectedDiagramId}_${xmlB.length}`}
                  xml={xmlB}
                  diagramId={`diff_B_${snapB?.id}`}
                  bgTheme={isLight ? 'light' : 'dark'}
                  aspectRatioId="16:9"
                />
              </div>
            </div>

            {/* Version B Footer Actions */}
            {onRestoreVersion && (
              <div className="p-2.5 px-3 bg-teal-50/50 dark:bg-[#0A0F1D] border-t border-teal-500/20 flex items-center justify-between">
                <span className="text-[11px] text-teal-700 dark:text-teal-300 font-medium">Comparison Target ({snapB?.versionTag})</span>
                <button
                  type="button"
                  onClick={() => onRestoreVersion(snapB)}
                  className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                >
                  <Check className="w-3 h-3" />
                  <span>Set Version {snapB?.versionTag} Active</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================================
            3. BOTTOM COMPREHENSIVE DIFF INSPECTOR & CHANGE DETAILS
           ===================================================================== */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0F1D] max-h-56 overflow-y-auto p-3.5 px-6">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
            {/* Inspector Navigation Tabs */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Overview &amp; Origin</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('components')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'components'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Nodes &amp; Text ({diffResult.addedNodes.length + diffResult.modifiedNodes.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('connectors')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'connectors'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Arrows &amp; Routing ({diffResult.stats.edgesChangedCount})</span>
              </button>

              {isPromptB && (
                <button
                  type="button"
                  onClick={() => setActiveTab('prompt')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'prompt'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Prompt Details</span>
                </button>
              )}
            </div>

            <div className="text-xs font-mono font-bold text-slate-500">
              Total Changes Detected: <span className="text-teal-600 dark:text-teal-400 font-extrabold">{diffResult.stats.totalChanges}</span>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & ORIGIN ATTRIBUTION */}
          {activeTab === 'overview' && (
            <div className="py-2.5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Origin Card */}
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1322] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    {isPromptB ? <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> : <Edit3 className="w-3.5 h-3.5 text-teal-500" />}
                    Change Origin: {isPromptB ? 'AI Prompt Refinement' : isManualB ? 'Manual Draw.io Canvas Edit' : 'System Initial Baseline'}
                  </span>
                  <span className="font-mono text-[10.5px] text-slate-400">{snapB?.timestamp}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {snapB?.actionSummary}
                </p>
                {isPromptB && promptTextB && (
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">User Prompt:</span>
                    &ldquo;{promptTextB}&rdquo;
                  </div>
                )}
              </div>

              {/* Structural Delta Summary */}
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1322] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="font-extrabold text-slate-800 dark:text-slate-200 block">
                  Delta Summary
                </span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {diffResult.stats.addedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      +{diffResult.stats.addedCount} Nodes &amp; Routes Added
                    </span>
                  )}
                  {diffResult.stats.modifiedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                      ~{diffResult.stats.modifiedCount} Nodes &amp; Labels Modified
                    </span>
                  )}
                  {diffResult.stats.removedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">
                      -{diffResult.stats.removedCount} Deprecated
                    </span>
                  )}
                  {diffResult.stats.totalChanges === 0 && (
                    <span className="text-slate-500 font-medium">No visual or structural differences between selected versions.</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Target Tier: <span className="font-bold text-slate-700 dark:text-slate-300">{targetTierB}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPONENTS & TEXT BREAKDOWN */}
          {activeTab === 'components' && (
            <div className="py-2 space-y-2">
              {diffResult.addedNodes.length === 0 && diffResult.modifiedNodes.length === 0 && diffResult.removedNodes.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">No component differences detected.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {diffResult.addedNodes.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-2">
                      <PlusCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 truncate">{n.name}</div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400">{n.description}</div>
                      </div>
                    </div>
                  ))}

                  {diffResult.modifiedNodes.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/30 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-amber-800 dark:text-amber-300 truncate">{n.name}</div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400">{n.description}</div>
                        {n.beforeSnippet && n.afterSnippet && n.beforeSnippet !== n.afterSnippet && (
                          <div className="mt-1 text-[10px] font-mono text-slate-500 bg-white/60 dark:bg-slate-900/60 p-1 rounded">
                            <span className="text-rose-500 line-through mr-1.5">{n.beforeSnippet.slice(0, 40)}</span>
                            <span className="text-emerald-500">{n.afterSnippet.slice(0, 40)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {diffResult.removedNodes.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/30 flex items-start gap-2">
                      <MinusCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-rose-800 dark:text-rose-300 truncate">{n.name}</div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400">{n.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONNECTORS & ROUTING */}
          {activeTab === 'connectors' && (
            <div className="py-2 space-y-2">
              {diffResult.addedEdges.length === 0 && diffResult.modifiedEdges.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">All connector routes and waypoints match exactly.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {diffResult.addedEdges.map((e) => (
                    <div key={e.id} className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-2">
                      <PlusCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 truncate">{e.name}</div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400">{e.description}</div>
                      </div>
                    </div>
                  ))}

                  {diffResult.modifiedEdges.map((e) => (
                    <div key={e.id} className="p-2.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-500/30 flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-teal-800 dark:text-teal-300 truncate">{e.name}</div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400">{e.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROMPT DETAILS */}
          {activeTab === 'prompt' && isPromptB && (
            <div className="py-2 space-y-2">
              <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    AI Prompt Refinement Context
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono text-[10.5px] font-bold">
                    Model: Gemini 3.1 Pro Architecture Compiler
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#070A12] border border-indigo-200 dark:border-indigo-900/60 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase mb-1">Raw User Prompt:</span>
                  &ldquo;{promptTextB}&rdquo;
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Target Zone:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{targetTierB}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Synthesized Snapshot:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{snapB?.versionTag} ({snapB?.timestamp})</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
