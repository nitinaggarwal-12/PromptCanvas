'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Download,
  ArrowLeft,
  Edit3,
  X,
  Loader2,
  Send,
  RotateCcw,
  Undo2,
  Redo2,
  Maximize2,
  ZoomIn,
  CheckCircle2,
  AlertCircle,
  History,
  Image as ImageIcon,
  Columns2,
  Layers,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import AppHeader, { btnClass } from '@/components/AppHeader';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import type {
  CompoundPromptToDiagramResult,
} from '@/lib/freeform/compoundPromptToDiagramEngine';
import {
  MAX_UNDO_REDO_CHANGES,
  createEmptyUndoRedoState,
  pushUndoRedoChange,
  undoDiagramChange,
  redoDiagramChange,
  canUndoChange,
  canRedoChange,
  listOrderedChangesNewestFirst,
  jumpToSavedChangeById,
  saveUndoRedoStateToStorage,
  loadUndoRedoStateFromStorage,
  clearUndoRedoStorage,
  type UndoRedoStackState,
} from '@/lib/undoRedoHistoryStore';

type CanvasViewMode = 'drawio' | 'split' | 'image';

const P2D_UNDO_REDO_STORAGE_KEY = 'promptcanvas_p2d_undo_redo_v1';
const P2D_REF_IMAGE_SESSION_KEY = 'promptcanvas_p2d_ref_image_v1';

function describeCreateStageProgress(elapsedSec: number): string {
  if (elapsedSec < 7) return `Stage 1/4: Live Web Research (${elapsedSec}s)...`;
  if (elapsedSec < 18) return `Stage 2/4: HIGH-Thinking Architecture Plan (${elapsedSec}s)...`;
  if (elapsedSec < 38) return `Stage 3/4: Generating Reference Image (${elapsedSec}s)...`;
  return `Stage 4/4: Decompiling Image 1:1 → Draw.io XML (${elapsedSec}s)...`;
}

export default function PurePromptToDiagramPage() {
  const [userPrompt, setUserPrompt] = useState('');
  const [followUpPrompt, setFollowUpPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeAction, setActiveAction] = useState<'create' | 'modify'>('create');
  const [elapsedSec, setElapsedSec] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [historyState, setHistoryState] = useState<UndoRedoStackState<CompoundPromptToDiagramResult>>(
    () => createEmptyUndoRedoState<CompoundPromptToDiagramResult>()
  );
  const [sessionRefImageUrl, setSessionRefImageUrl] = useState<string | null>(null);
  const [zoomMode, setZoomMode] = useState<'fit' | '100'>('fit');
  const [canvasViewMode, setCanvasViewMode] = useState<CanvasViewMode>('drawio');
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  const [isDrawioEditorOpen, setIsDrawioEditorOpen] = useState(false);
  const drawioIframeRef = useRef<HTMLIFrameElement | null>(null);
  const startRef = useRef<number | null>(null);
  const autoTriggeredRef = useRef(false);
  const hydratedStorageRef = useRef(false);

  const activeResult = historyState.present?.payload || null;

  // Hydrate last 15 saved Undo/Redo changes from localStorage on mount (unless ?prompt=... overrides)
  useEffect(() => {
    if (hydratedStorageRef.current || typeof window === 'undefined') return;
    hydratedStorageRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const incomingPrompt = params.get('prompt')?.trim();
    if (incomingPrompt) {
      autoTriggeredRef.current = true;
      setUserPrompt(incomingPrompt);
      void executeSynthesis('create', incomingPrompt);
      return;
    }

    const restored = loadUndoRedoStateFromStorage<CompoundPromptToDiagramResult>(P2D_UNDO_REDO_STORAGE_KEY);
    if (restored.present) {
      setHistoryState(restored);
      if (restored.present.payload?.userPrompt) {
        setUserPrompt(restored.present.payload.userPrompt);
      }
    }
    try {
      const savedImg = sessionStorage.getItem(P2D_REF_IMAGE_SESSION_KEY);
      if (savedImg) setSessionRefImageUrl(savedImg);
    } catch {}
  }, []);

  // Persist Undo/Redo stack (last 15 changes) whenever historyState updates
  useEffect(() => {
    if (!hydratedStorageRef.current || typeof window === 'undefined') return;
    if (!historyState.present && historyState.past.length === 0 && historyState.future.length === 0) {
      return;
    }
    saveUndoRedoStateToStorage(P2D_UNDO_REDO_STORAGE_KEY, historyState);
  }, [historyState]);

  const handleUndo = useCallback(() => {
    setHistoryState((prev) => (canUndoChange(prev) ? undoDiagramChange(prev) : prev));
  }, []);

  const handleRedo = useCallback(() => {
    setHistoryState((prev) => (canRedoChange(prev) ? redoDiagramChange(prev) : prev));
  }, []);

  // Keyboard shortcuts: Cmd/Ctrl+Z (Undo) & Cmd/Ctrl+Shift+Z or Ctrl+Y (Redo)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'TEXTAREA' ||
          target.tagName === 'INPUT' ||
          target.isContentEditable)
      ) {
        return;
      }
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      if (e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.key.toLowerCase() === 'z' && e.shiftKey) || e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleUndo, handleRedo]);

  // Elapsed timer during generation
  useEffect(() => {
    if (!isGenerating) return;
    const timer = setInterval(() => {
      if (startRef.current) {
        setElapsedSec(Number(((Date.now() - startRef.current) / 1000).toFixed(1)));
      }
    }, 100);
    return () => clearInterval(timer);
  }, [isGenerating]);

  // Embedded Draw.io postMessage bridge — sync manual XML edits into the 15-change Undo/Redo buffer
  useEffect(() => {
    if (!isDrawioEditorOpen) return;
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'string') return;
      try {
        const msg = JSON.parse(event.data);
        if (msg.event === 'init' && drawioIframeRef.current?.contentWindow && activeResult?.xml) {
          drawioIframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              action: 'load',
              xml: activeResult.xml,
              autosave: 1,
            }),
            '*'
          );
        } else if (msg.event === 'save' && typeof msg.xml === 'string') {
          const updatedXml = msg.xml;
          setHistoryState((prev) => {
            if (!prev.present || !prev.present.payload) return prev;
            if (prev.present.xml === updatedXml) return prev;
            const nextPayload: CompoundPromptToDiagramResult = {
              ...prev.present.payload,
              xml: updatedXml,
              mutationMode: 'direct_drawio_xml_update',
              summaryOfChanges: 'Manual edit in Draw.io Vector Editor',
            };
            return pushUndoRedoChange(prev, {
              label: 'Manual Draw.io Edit',
              xml: updatedXml,
              payload: nextPayload,
            });
          });
          setIsDrawioEditorOpen(false);
        } else if (msg.event === 'exit') {
          setIsDrawioEditorOpen(false);
        }
      } catch {
        // Ignore non-JSON messages
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isDrawioEditorOpen, activeResult?.xml]);

  async function executeSynthesis(action: 'create' | 'modify', explicitPrompt?: string) {
    setErrorMsg(null);
    const basePrompt = (explicitPrompt !== undefined ? explicitPrompt : userPrompt).trim();
    const modInstruction = followUpPrompt.trim();

    if (action === 'create' && !basePrompt) {
      setErrorMsg('Enter an architecture prompt to generate a diagram.');
      return;
    }
    if (action === 'modify' && !modInstruction) {
      setErrorMsg('Enter a follow-up change instruction.');
      return;
    }

    startRef.current = Date.now();
    setElapsedSec(0);
    setActiveAction(action);
    setIsGenerating(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 175_000);
      const res = await fetch('/api/prompt-to-diagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          action,
          userPrompt: basePrompt || activeResult?.userPrompt || '',
          modificationPrompt: action === 'modify' ? modInstruction : undefined,
          modificationHistory: activeResult?.modificationHistory || [],
          currentGraph: action === 'modify' ? activeResult?.graph || null : null,
          currentXml: action === 'modify' ? activeResult?.xml : undefined,
        }),
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to generate diagram.');
      }

      const typedResult = data as CompoundPromptToDiagramResult;
      if (typedResult.referenceImageDataUrl) {
        setSessionRefImageUrl(typedResult.referenceImageDataUrl);
        try {
          sessionStorage.setItem(P2D_REF_IMAGE_SESSION_KEY, typedResult.referenceImageDataUrl);
        } catch {}
      } else if (action === 'create') {
        setSessionRefImageUrl(null);
        try {
          sessionStorage.removeItem(P2D_REF_IMAGE_SESSION_KEY);
        } catch {}
      }

      if (action === 'modify') {
        setFollowUpPrompt('');
        if (canvasViewMode === 'image') {
          setCanvasViewMode('drawio');
        }
      }

      const changeLabel =
        action === 'create' ? typedResult.graph.title : modInstruction;

      setHistoryState((prev) =>
        pushUndoRedoChange(prev, {
          label: changeLabel,
          xml: typedResult.xml,
          payload: typedResult,
        })
      );
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setErrorMsg('Synthesis timed out after 175s. Please try again.');
      } else {
        setErrorMsg(err?.message || 'Failed to synthesize diagram.');
      }
    } finally {
      setIsGenerating(false);
    }
  }

  function handleDownloadDrawio() {
    if (!activeResult?.xml) return;
    const blob = new Blob([activeResult.xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeTitle = (activeResult.graph?.title || 'architecture_diagram')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    a.href = url;
    a.download = `${safeTitle || 'diagram'}.drawio`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleResetNewPrompt() {
    setHistoryState(createEmptyUndoRedoState<CompoundPromptToDiagramResult>());
    clearUndoRedoStorage(P2D_UNDO_REDO_STORAGE_KEY);
    setSessionRefImageUrl(null);
    try {
      sessionStorage.removeItem(P2D_REF_IMAGE_SESSION_KEY);
    } catch {}
    setFollowUpPrompt('');
    setErrorMsg(null);
    setCanvasViewMode('drawio');
    setShowPlanDetails(false);
  }

  const effectiveRefImage = activeResult?.referenceImageDataUrl || sessionRefImageUrl;
  const groundingSources = activeResult?.pipelineStages?.groundingSources || [];
  const webSearchQueries = activeResult?.pipelineStages?.webSearchQueries || [];
  const orderedSavedChanges = listOrderedChangesNewestFirst(historyState);
  const undoAvailable = canUndoChange(historyState);
  const redoAvailable = canRedoChange(historyState);

  return (
    <div
      data-testid="pure-prompt-to-diagram-studio"
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col"
    >
      <AppHeader
        icon={Sparkles}
        tone="blue"
        title="Prompt to Diagram"
        badge="Independent AI Synthesis • Research → Plan → Image → 1:1 Draw.io XML"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className={btnClass('neutral')}
              data-testid="back-to-blueprint-studio-link"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Blueprint Studio (40 Templates)</span>
            </Link>
            {(undoAvailable || redoAvailable || activeResult?.xml) && (
              <div
                className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5"
                data-testid="undo-redo-toolbar-group"
              >
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={!undoAvailable || isGenerating}
                  data-testid="btn-undo-change"
                  title={`Undo (⌘Z) • ${historyState.past.length} saved behind`}
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold inline-flex items-center gap-1 text-slate-700 hover:bg-slate-100 disabled:text-slate-300 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>Undo</span>
                </button>
                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={!redoAvailable || isGenerating}
                  data-testid="btn-redo-change"
                  title={`Redo (⌘⇧Z) • ${historyState.future.length} ahead`}
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold inline-flex items-center gap-1 text-slate-700 hover:bg-slate-100 disabled:text-slate-300 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                >
                  <Redo2 className="w-3.5 h-3.5" />
                  <span>Redo</span>
                </button>
              </div>
            )}
            {activeResult?.xml && (
              <>
                <button
                  type="button"
                  onClick={() => setIsDrawioEditorOpen(true)}
                  className={btnClass('primary')}
                  data-testid="btn-open-drawio-editor"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit in Draw.io</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadDrawio}
                  className={btnClass('neutral')}
                  data-testid="btn-download-drawio"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .drawio</span>
                </button>
              </>
            )}
          </div>
        }
      />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] min-h-[calc(100vh-58px)]">
        {/* LEFT RAIL: PURE PROMPT INPUT + IN-PLACE UPDATE + LAST 15 CHANGES UNDO/REDO */}
        <aside className="bg-white border-r border-slate-200 p-4 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="pure-prompt-textarea"
                  className="text-xs font-extrabold text-slate-900 tracking-tight"
                >
                  Architecture Prompt
                </label>
                {activeResult && (
                  <button
                    type="button"
                    onClick={handleResetNewPrompt}
                    data-testid="btn-reset-new-prompt"
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              <textarea
                id="pure-prompt-textarea"
                data-testid="input-freeform-user-prompt"
                rows={5}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    void executeSynthesis('create');
                  }
                }}
                placeholder="Describe any system, protocol, multi-cloud platform, hardware topology, or workflow..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 outline-none resize-y leading-relaxed font-medium"
              />

              <button
                type="button"
                data-testid="btn-generate-prompt-diagram"
                disabled={isGenerating || !userPrompt.trim()}
                onClick={() => void executeSynthesis('create')}
                className="mt-2.5 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-500 text-white text-xs font-extrabold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isGenerating && activeAction === 'create' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                    <span className="truncate">{describeCreateStageProgress(elapsedSec)}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Diagram</span>
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <div
                data-testid="prompt-error-banner"
                className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* DIRECT DRAW.IO XML UPDATE BOX (SUBSEQUENT PROMPTS) */}
            {activeResult && (
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="followup-prompt-textarea"
                    className="text-xs font-extrabold text-slate-900"
                  >
                    Update Draw.io Directly
                  </label>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                    In-Place Spatial XML
                  </span>
                </div>
                <textarea
                  id="followup-prompt-textarea"
                  data-testid="input-followup-prompt"
                  rows={3}
                  value={followUpPrompt}
                  onChange={(e) => setFollowUpPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void executeSynthesis('modify');
                    }
                  }}
                  placeholder="Add, move, connect, or remove components directly in the current Draw.io diagram..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 outline-none resize-none leading-relaxed font-medium"
                />
                <button
                  type="button"
                  data-testid="btn-apply-followup-prompt"
                  disabled={isGenerating || !followUpPrompt.trim()}
                  onClick={() => void executeSynthesis('modify')}
                  className="w-full py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isGenerating && activeAction === 'modify' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Mutating Draw.io XML ({elapsedSec}s)...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Update Draw.io Diagram</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* PIPELINE PROVENANCE, GROUNDING SOURCES & LAST 15 SAVED CHANGES (UNDO/REDO) */}
            {activeResult && (
              <div className="pt-3 border-t border-slate-200 space-y-2.5">
                <div
                  data-testid="pipeline-provenance-card"
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span
                      data-testid="pipeline-mutation-mode-badge"
                      className="font-bold text-slate-800 flex items-center gap-1 truncate"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {activeResult.mutationMode === 'direct_drawio_xml_update'
                        ? 'Direct Draw.io Spatial Update'
                        : '4-Stage Research → Image → 1:1 XML'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 shrink-0">
                      {(activeResult.latencyMs / 1000).toFixed(1)}s
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">
                    {activeResult.summaryOfChanges || activeResult.graph.reasoning}
                  </p>

                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                      {activeResult.audit.groupCount} Zones (Depth {activeResult.audit.maxNestingDepth})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                      {activeResult.audit.nodeCount} Nodes
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                      {activeResult.audit.edgeCount} Flows
                    </span>
                  </div>

                  {(activeResult.pipelineStages || groundingSources.length > 0 || webSearchQueries.length > 0) && (
                    <div className="pt-1 border-t border-slate-200/80">
                      <button
                        type="button"
                        data-testid="btn-toggle-plan-details"
                        onClick={() => setShowPlanDetails((v) => !v)}
                        className="w-full flex items-center justify-between text-[10.5px] font-bold text-blue-700 hover:text-blue-900 cursor-pointer py-0.5"
                      >
                        <span>
                          Research &amp; Plan Provenance
                          {groundingSources.length > 0
                            ? ` (${groundingSources.length} Web Sources)`
                            : webSearchQueries.length > 0
                              ? ` (${webSearchQueries.length} Live Searches)`
                              : ''}
                        </span>
                        {showPlanDetails ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {showPlanDetails && (
                        <div className="mt-2 space-y-2 text-[10.5px] text-slate-600">
                          {activeResult.pipelineStages && (
                            <div className="p-2 rounded-lg bg-white border border-slate-200 font-mono text-[10px] space-y-0.5 text-slate-600">
                              <div>Research: {activeResult.pipelineStages.researchModel}</div>
                              <div>Plan: {activeResult.pipelineStages.planModel}</div>
                              {activeResult.pipelineStages.imageModel && (
                                <div>Image: {activeResult.pipelineStages.imageModel}</div>
                              )}
                              {activeResult.pipelineStages.visionToXmlModel && (
                                <div>Vision→XML: {activeResult.pipelineStages.visionToXmlModel}</div>
                              )}
                            </div>
                          )}

                          {webSearchQueries.length > 0 && (
                            <div className="space-y-1">
                              <div className="font-bold text-slate-800">Google Search Queries</div>
                              <div className="flex flex-wrap gap-1">
                                {webSearchQueries.slice(0, 6).map((q, idx) => (
                                  <span
                                    key={`${q}-${idx}`}
                                    className="px-2 py-0.5 rounded bg-blue-50/70 border border-blue-200 text-blue-800 text-[10px] font-medium truncate max-w-full"
                                  >
                                    {q}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeResult.pipelineStages?.architecturalPlan && (
                            <div className="p-2 rounded-lg bg-white border border-slate-200 leading-relaxed max-h-28 overflow-y-auto">
                              <div className="font-bold text-slate-800 mb-0.5">Architectural Plan</div>
                              {activeResult.pipelineStages.architecturalPlan}
                            </div>
                          )}

                          {groundingSources.length > 0 && (
                            <div className="space-y-1">
                              <div className="font-bold text-slate-800">Grounded Web Sources</div>
                              <div className="max-h-28 overflow-y-auto space-y-1">
                                {groundingSources.slice(0, 6).map((src, idx) => (
                                  <a
                                    key={`${src.uri}-${idx}`}
                                    href={src.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between gap-1.5 px-2 py-1 rounded bg-white border border-slate-200 hover:border-blue-300 text-blue-700 truncate"
                                  >
                                    <span className="truncate">{src.title || src.uri}</span>
                                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* SAVED CHANGES BUFFER (LAST 15 FOR UNDO / REDO — ZERO MICROVERSIONING) */}
                {orderedSavedChanges.items.length > 0 && (
                  <div className="space-y-1.5" data-testid="saved-changes-history-panel">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <History className="w-3 h-3" />
                        <span>
                          Saved Changes ({Math.min(orderedSavedChanges.items.length, MAX_UNDO_REDO_CHANGES)}/{MAX_UNDO_REDO_CHANGES})
                        </span>
                      </span>
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handleUndo}
                          disabled={!undoAvailable || isGenerating}
                          className="px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-700 hover:bg-slate-50 disabled:text-slate-300 cursor-pointer disabled:cursor-not-allowed inline-flex items-center gap-0.5"
                          title="Undo (⌘Z)"
                        >
                          <Undo2 className="w-2.5 h-2.5" />
                          <span>Undo</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleRedo}
                          disabled={!redoAvailable || isGenerating}
                          className="px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-700 hover:bg-slate-50 disabled:text-slate-300 cursor-pointer disabled:cursor-not-allowed inline-flex items-center gap-0.5"
                          title="Redo (⌘⇧Z)"
                        >
                          <Redo2 className="w-2.5 h-2.5" />
                          <span>Redo</span>
                        </button>
                      </div>
                    </div>

                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {orderedSavedChanges.items.map((entry, idx) => {
                        const position =
                          idx === orderedSavedChanges.activeIndex
                            ? 'present'
                            : idx < orderedSavedChanges.activeIndex
                              ? 'future'
                              : 'past';
                        const isCurrent = position === 'present';
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            onClick={() =>
                              setHistoryState((prev) => jumpToSavedChangeById(prev, entry.id))
                            }
                            data-testid={`saved-change-item-${position}`}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg border text-[11px] flex items-center justify-between gap-2 cursor-pointer ${
                              isCurrent
                                ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold'
                                : position === 'future'
                                  ? 'bg-slate-50/70 border-dashed border-slate-200 text-slate-500 hover:bg-slate-50'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="truncate">{entry.label}</span>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                              {isCurrent ? 'Active' : entry.timestamp}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-[10.5px] text-slate-400 border-t border-slate-100 pt-2.5">
            Independent Prompt-to-Diagram • Last {MAX_UNDO_REDO_CHANGES} Changes Saved for Undo/Redo
          </div>
        </aside>

        {/* RIGHT FULL-HEIGHT VECTOR DRAW.IO CANVAS (+ REFERENCE IMAGE / SPLIT COMPARE) */}
        <section className="p-4 flex flex-col min-w-0 bg-slate-50">
          {activeResult?.xml ? (
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden min-h-[640px]">
              <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <h2
                    data-testid="generated-diagram-title"
                    className="text-xs font-extrabold text-slate-900 truncate"
                  >
                    {activeResult.graph.title}
                  </h2>
                  {activeResult.graph.subtitle && (
                    <p className="text-[10.5px] text-slate-500 truncate">
                      {activeResult.graph.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {effectiveRefImage && (
                    <div
                      data-testid="canvas-view-mode-switcher"
                      className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5"
                    >
                      <button
                        type="button"
                        data-testid="btn-view-drawio-vector"
                        onClick={() => setCanvasViewMode('drawio')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                          canvasViewMode === 'drawio'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Layers className="w-3 h-3" />
                        <span>Draw.io Vector</span>
                      </button>
                      <button
                        type="button"
                        data-testid="btn-view-split-compare"
                        onClick={() => setCanvasViewMode('split')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                          canvasViewMode === 'split'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Columns2 className="w-3 h-3" />
                        <span>Split Compare</span>
                      </button>
                      <button
                        type="button"
                        data-testid="btn-view-reference-image"
                        onClick={() => setCanvasViewMode('image')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                          canvasViewMode === 'image'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Reference Image</span>
                      </button>
                    </div>
                  )}

                  {canvasViewMode !== 'image' && (
                    <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
                      <button
                        type="button"
                        data-testid="btn-zoom-fit"
                        onClick={() => setZoomMode('fit')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                          zoomMode === 'fit'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Fit</span>
                      </button>
                      <button
                        type="button"
                        data-testid="btn-zoom-100"
                        onClick={() => setZoomMode('100')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                          zoomMode === '100'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <ZoomIn className="w-3 h-3" />
                        <span>100%</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {canvasViewMode === 'image' && effectiveRefImage ? (
                <div
                  data-testid="reference-image-only-container"
                  className="flex-1 overflow-auto bg-slate-50 p-4 flex items-center justify-center"
                >
                  <img
                    src={effectiveRefImage}
                    alt={`Generated Reference Architecture — ${activeResult.graph.title}`}
                    className="max-w-full max-h-[78vh] rounded-xl border border-slate-200 shadow-sm bg-white object-contain"
                  />
                </div>
              ) : canvasViewMode === 'split' && effectiveRefImage ? (
                <div
                  data-testid="split-compare-canvas-container"
                  className="flex-1 grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-slate-200 overflow-hidden"
                >
                  <div className="flex flex-col min-w-0 bg-slate-50/50 overflow-auto p-3">
                    <div className="text-[11px] font-bold text-slate-700 mb-2 flex items-center justify-between">
                      <span>Stage 3: Generated Reference Architecture Image</span>
                      {activeResult.mutationMode === 'direct_drawio_xml_update' && (
                        <span className="text-[10px] font-normal text-slate-500">
                          Initial Reference Image
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img
                        src={effectiveRefImage}
                        alt="Generated Reference Architecture"
                        className="max-w-full max-h-[70vh] rounded-lg border border-slate-200 bg-white object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0 bg-white overflow-auto p-3">
                    <div className="text-[11px] font-bold text-slate-700 mb-2 flex items-center justify-between">
                      <span>
                        {activeResult.mutationMode === 'direct_drawio_xml_update'
                          ? 'Directly Updated Editable Draw.io XML'
                          : 'Stage 4: Converted Editable Draw.io Vector XML (1:1 Decompiled)'}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700">100% Editable</span>
                    </div>
                    <div className="flex-1 min-h-[540px]">
                      <DiagramViewerRenderSafe
                        xml={activeResult.xml}
                        diagramType="compound_freeform"
                        bgTheme="light"
                        allowFullScaleScroll={zoomMode === '100'}
                        minHeight={540}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  data-testid="compound-drawio-canvas-container"
                  className="flex-1 overflow-auto bg-white p-2"
                >
                  <div
                    style={
                      zoomMode === '100'
                        ? { minWidth: '1320px', minHeight: '760px' }
                        : { width: '100%', height: '100%', minHeight: '620px' }
                    }
                  >
                    <DiagramViewerRenderSafe
                      xml={activeResult.xml}
                      diagramType="compound_freeform"
                      bgTheme="light"
                      allowFullScaleScroll={zoomMode === '100'}
                      minHeight={620}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              data-testid="prompt-empty-canvas-state"
              className="flex-1 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-8 min-h-[600px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-extrabold text-slate-900 mb-1">
                Independent Prompt-to-Diagram Studio
              </h2>
              <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                Enter any prompt on the left. On initial synthesis, the studio executes live web
                research, plans the topology, generates a 16:9 reference architecture image, and
                decompiles it 1:1 into editable Draw.io XML. Subsequent prompts surgically update
                Draw.io XML in-place, keeping the last 15 changes saved for Undo and Redo.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* EMBEDDED INTERACTIVE DRAW.IO VECTOR EDITOR MODAL */}
      {isDrawioEditorOpen && activeResult?.xml && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          data-testid="modal-embedded-drawio-editor"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-[1520px] h-[90vh] flex flex-col overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <span className="text-xs font-extrabold text-slate-900">
                Interactive Vector Draw.io Editor — {activeResult.graph.title}
              </span>
              <button
                type="button"
                onClick={() => setIsDrawioEditorOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <iframe
              ref={drawioIframeRef}
              title="Draw.io Vector Editor"
              src="https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json&configure=0"
              className="flex-1 w-full border-0 bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
