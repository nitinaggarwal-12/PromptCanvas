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
  Save,
  Presentation,
  RefreshCw,
  Link2,
  Lock,
  Eye,
  Brain,
  Tag,
  Check,
} from 'lucide-react';
import AppHeader, { btnClass } from '@/components/AppHeader';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_DEPTH_LEVELS,
  DEPTH_LEVEL_META,
  getCanonicalTemplateById,
} from '@/lib/canonical/canonicalTemplates';
import type {
  NlpBlueprintRecommendation,
  NlpRecommendationResponse,
  PreferredDepthFilter,
} from '@/lib/nlpBlueprintRecommender';
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

const P2D_LEGACY_STORAGE_KEY = 'promptcanvas_p2d_undo_redo_v1';
const P2D_UNDO_REDO_STORAGE_KEY = 'promptcanvas_p2d_undo_redo_v2';
const P2D_SAVED_ID_STORAGE_KEY = 'promptcanvas_p2d_diagram_id_v2';
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
  const [savedDiagramId, setSavedDiagramId] = useState<string | null>(null);
  const [isSavingDb, setIsSavingDb] = useState(false);
  const [isExportingSlides, setIsExportingSlides] = useState(false);
  const [isSyncingFromSlides, setIsSyncingFromSlides] = useState(false);
  const [isSlidesSyncModalOpen, setIsSlidesSyncModalOpen] = useState(false);
  const [slidesSyncInput, setSlidesSyncInput] = useState('');
  const [linkedSlidesId, setLinkedSlidesId] = useState<string | null>(null);
  const [linkedSlidesUrl, setLinkedSlidesUrl] = useState<string | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [synthesisEngine, setSynthesisEngine] = useState<'v2_fast' | 'visual_4stage'>('v2_fast');

  // NLP Blueprint Recommendation & Deferred-ID Selection State
  const [preferredLevel, setPreferredLevel] = useState<PreferredDepthFilter>('All');
  const [isEvaluatingNlp, setIsEvaluatingNlp] = useState(false);
  const [nlpResult, setNlpResult] = useState<NlpRecommendationResponse | null>(null);
  const [previewedRecId, setPreviewedRecId] = useState<string | null>(null);
  const [selectedRecMeta, setSelectedRecMeta] = useState<NlpBlueprintRecommendation | null>(null);
  const [isChoosingTemplateId, setIsChoosingTemplateId] = useState<string | null>(null);
  const [resumableStoredId, setResumableStoredId] = useState<string | null>(null);

  const syncDiagramIdToUrl = useCallback((id: string | null) => {
    setSavedDiagramId(id);
    if (typeof window === 'undefined') return;
    try {
      if (id) {
        localStorage.setItem(P2D_SAVED_ID_STORAGE_KEY, id);
      } else {
        localStorage.removeItem(P2D_SAVED_ID_STORAGE_KEY);
      }
      const url = new URL(window.location.href);
      if (id) {
        url.searchParams.set('id', id);
      } else {
        url.searchParams.delete('id');
      }
      window.history.replaceState({}, '', url.toString());
    } catch {}
  }, []);
  const drawioIframeRef = useRef<HTMLIFrameElement | null>(null);
  const startRef = useRef<number | null>(null);
  const autoTriggeredRef = useRef(false);
  const hydratedStorageRef = useRef(false);

  const activeResult = historyState.present?.payload || null;

  const countXmlInventory = (rawXml: string) => {
    const vertexMatches = rawXml.match(/<mxCell\b[^>]*\bvertex="1"[^>]*>/g) || [];
    const edgeMatches = rawXml.match(/<mxCell\b[^>]*\bedge="1"[^>]*>/g) || [];
    const containerCount = vertexMatches.filter((m) => m.includes('container=1') || m.includes('swimlane')).length;
    return {
      groupCount: containerCount,
      nodeCount: Math.max(0, vertexMatches.length - containerCount),
      edgeCount: edgeMatches.length,
    };
  };

  // Hydrate by ?id= from DB, or ?prompt=, or last 15 saved Undo/Redo changes from localStorage
  useEffect(() => {
    if (hydratedStorageRef.current || typeof window === 'undefined') return;
    hydratedStorageRef.current = true;

    // Purge legacy pre-fix localStorage cache so stale broken diagrams are never resurrected
    try {
      localStorage.removeItem(P2D_LEGACY_STORAGE_KEY);
    } catch {}

    const params = new URLSearchParams(window.location.search);
    const incomingId = params.get('id')?.trim();
    if (incomingId) {
      syncDiagramIdToUrl(incomingId);
      fetch(`/api/diagrams/${encodeURIComponent(incomingId)}`, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data?.xml_content && String(data.xml_content).includes('<mxCell')) {
            const inv = countXmlInventory(data.xml_content);
            const loadedPayload: CompoundPromptToDiagramResult = {
              success: true,
              action: 'create',
              mutationMode: 'direct_drawio_xml_update',
              userPrompt: data.latest_prompt || data.name || 'Saved Architecture',
              modificationHistory: [],
              summaryOfChanges: data.ai_reasoning || `Loaded saved diagram "${data.name || incomingId}" from Library`,
              xml: data.xml_content,
              graph: {
                title: data.name || 'Saved Architecture',
                reasoning: data.ai_reasoning || 'Loaded persisted Draw.io XML from database.',
                groups: [],
                nodes: [],
                edges: [],
              },
              audit: {
                ...inv,
                maxNestingDepth: inv.groupCount > 0 ? 1 : 0,
                siblingOverlaps: 0,
                childContainmentViolations: 0,
              },
              modelUsed: 'Persisted Library DB',
              latencyMs: 0,
            };
            setUserPrompt(loadedPayload.userPrompt);
            setHistoryState((prev) =>
              pushUndoRedoChange(prev, {
                label: loadedPayload.graph.title,
                xml: loadedPayload.xml,
                payload: loadedPayload,
              })
            );
          } else {
            setErrorMsg(`Saved diagram "${incomingId}" was not found. Enter a prompt and click Generate Diagram to create a fresh persistent diagram.`);
            syncDiagramIdToUrl(null);
          }
        })
        .catch(() => {
          setErrorMsg(`Could not load diagram "${incomingId}". Enter a prompt to generate a new diagram.`);
        });
      return;
    }

    const incomingPrompt = params.get('prompt')?.trim();
    if (incomingPrompt) {
      autoTriggeredRef.current = true;
      setUserPrompt(incomingPrompt);
      void evaluatePromptWithNlp(incomingPrompt, 'All');
      return;
    }

    // Do NOT auto-assign an old diagram ID on a fresh visit without ?id=;
    // surface an optional "Resume previous diagram" shortcut instead so IDs are only assigned when chosen.
    try {
      const storedId = localStorage.getItem(P2D_SAVED_ID_STORAGE_KEY)?.trim();
      if (storedId) {
        setResumableStoredId(storedId);
      }
    } catch {}
    try {
      const savedImg = sessionStorage.getItem(P2D_REF_IMAGE_SESSION_KEY);
      if (savedImg) setSessionRefImageUrl(savedImg);
    } catch {}
  }, [syncDiagramIdToUrl]);

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

  // Embedded Draw.io postMessage bridge — strict origin validation + live inventory refresh + DB persistence
  useEffect(() => {
    if (!isDrawioEditorOpen) return;
    const DRAWIO_ORIGIN = 'https://embed.diagrams.net';
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== DRAWIO_ORIGIN) return;
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
            DRAWIO_ORIGIN
          );
        } else if ((msg.event === 'save' || msg.event === 'autosave') && typeof msg.xml === 'string') {
          const taggedXml = msg.xml.includes('data-user-drawio="true"')
            ? msg.xml
            : msg.xml.replace('<mxfile ', '<mxfile data-user-drawio="true" ');
          const inv = countXmlInventory(taggedXml);
          setHistoryState((prev) => {
            if (!prev.present || !prev.present.payload) return prev;
            if (prev.present.xml === taggedXml) return prev;
            const nextPayload: CompoundPromptToDiagramResult = {
              ...prev.present.payload,
              xml: taggedXml,
              mutationMode: 'direct_drawio_xml_update',
              summaryOfChanges:
                msg.event === 'autosave'
                  ? '2-Way Auto-Synced edit from Draw.io Vector Editor'
                  : 'Manual edit in Draw.io Vector Editor (2-Way Synced)',
              audit: {
                ...prev.present.payload.audit,
                groupCount: inv.groupCount,
                nodeCount: inv.nodeCount,
                edgeCount: inv.edgeCount,
              },
            };
            return pushUndoRedoChange(prev, {
              label: msg.event === 'autosave' ? 'Draw.io Auto-Sync' : 'Manual Draw.io Edit',
              xml: taggedXml,
              payload: nextPayload,
            });
          });
          if (savedDiagramId) {
            fetch(`/api/diagrams/${encodeURIComponent(savedDiagramId)}/versions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                xmlContent: taggedXml,
                comment:
                  msg.event === 'autosave'
                    ? '2-Way Auto-Sync edit from Draw.io Editor'
                    : 'Manual edit in Draw.io Vector Editor',
                createdBy: 'Draw.io Editor (2-Way Sync)',
              }),
            }).catch(() => {});
          }
          if (msg.event === 'save') {
            setStatusNotice('2-Way Synced Draw.io edit to history' + (savedDiagramId ? ` & Instance ${savedDiagramId.slice(0, 8)}….` : '.'));
            setIsDrawioEditorOpen(false);
          }
        } else if (msg.event === 'exit') {
          setIsDrawioEditorOpen(false);
        }
      } catch {
        // Ignore non-JSON messages
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isDrawioEditorOpen, activeResult?.xml, savedDiagramId]);

  async function handleSaveToLibraryDb(xmlOverride?: string, commentOverride?: string): Promise<string | null> {
    const xmlToSave = xmlOverride || activeResult?.xml;
    if (!xmlToSave) return null;
    setIsSavingDb(true);
    setErrorMsg(null);
    try {
      const title = activeResult?.graph?.title || userPrompt.slice(0, 60) || 'PromptCanvas Architecture';
      if (savedDiagramId) {
        const res = await fetch(`/api/diagrams/${encodeURIComponent(savedDiagramId)}/versions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            xmlContent: xmlToSave,
            comment: commentOverride || activeResult?.summaryOfChanges || 'Saved snapshot from Prompt-to-Diagram',
            createdBy: 'User',
          }),
        });
        if (!res.ok) throw new Error('Failed to save new version to Database.');
        setStatusNotice(`Saved new version to Library (${savedDiagramId.slice(0, 8)}…).`);
        return savedDiagramId;
      } else {
        const res = await fetch('/api/diagrams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: title,
            xml: xmlToSave,
            comment: commentOverride || 'Saved from Prompt-to-Diagram',
            prompt: userPrompt || activeResult?.userPrompt || title,
            aiReasoning: activeResult?.graph?.reasoning || activeResult?.summaryOfChanges || '',
            architectureType: 'v2_freeform',
            createdStudio: 'prompt_to_diagram',
          }),
        });
        const data = await res.json();
        const newId = data?.diagram?.id || data?.id;
        if (!res.ok || !newId) throw new Error(data?.error || 'Failed to save diagram to Database.');
        syncDiagramIdToUrl(newId);
        setStatusNotice(`Saved to Library Database (ID: ${newId.slice(0, 8)}…).`);
        return newId;
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Database save failed.');
      return null;
    } finally {
      setIsSavingDb(false);
    }
  }

  async function handleExportToGoogleSlides() {
    if (!activeResult?.xml) return;
    setIsExportingSlides(true);
    setErrorMsg(null);
    try {
      const title = activeResult.graph?.title || userPrompt.slice(0, 60) || 'Architecture Diagram';
      const cacheKey = savedDiagramId ? `CUSTOM_${savedDiagramId.replace(/[^A-Za-z0-9]/g, '').slice(0, 24)}` : `CUSTOM_${title.replace(/[^A-Za-z0-9]+/g, '_').toUpperCase().slice(0, 32)}`;
      const res = await fetch('/api/google-workspace/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: cacheKey,
          title,
          mode: 'slides',
          xmlContent: activeResult.xml,
          targetFileId: linkedSlidesId || undefined,
          force: true,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Google Slides export failed.');
      }
      const slidesId = data?.entry?.googleSlidesId || null;
      const editUrl = data?.editUrl || data?.url || null;
      if (slidesId) setLinkedSlidesId(slidesId);
      if (editUrl) {
        setLinkedSlidesUrl(editUrl);
        window.open(editUrl, '_blank', 'noopener,noreferrer');
      }
      setStatusNotice(
        linkedSlidesId
          ? 'Updated linked Google Slides deck in-place with latest Draw.io edits.'
          : 'Exported editable vector deck to Google Slides. Edit in Slides and click "Sync from Slides" to pull changes back!'
      );
    } catch (err: any) {
      setErrorMsg(err?.message || 'Google Slides export failed.');
    } finally {
      setIsExportingSlides(false);
    }
  }

  async function handleSyncFromGoogleSlides(explicitRef?: string) {
    if (!activeResult?.xml) return;
    const targetRef = (explicitRef ?? linkedSlidesId ?? linkedSlidesUrl ?? '').trim();
    if (!targetRef) {
      setSlidesSyncInput('');
      setIsSlidesSyncModalOpen(true);
      return;
    }
    setIsSlidesSyncModalOpen(false);

    setIsSyncingFromSlides(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/google-workspace/sync-from-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presentationId: targetRef.trim(),
          diagramId: savedDiagramId || undefined,
          baseXml: activeResult.xml,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to pull edits from Google Slides.');
      }
      if (data.presentationId) setLinkedSlidesId(data.presentationId);
      if (data.totalChanges > 0 && typeof data.xml === 'string') {
        const inv = countXmlInventory(data.xml);
        const nextPayload: CompoundPromptToDiagramResult = {
          ...activeResult,
          xml: data.xml,
          mutationMode: 'direct_drawio_xml_update',
          summaryOfChanges: data.summary,
          audit: {
            ...activeResult.audit,
            groupCount: inv.groupCount,
            nodeCount: inv.nodeCount,
            edgeCount: inv.edgeCount,
          },
        };
        setHistoryState((prev) =>
          pushUndoRedoChange(prev, {
            label: `Google Slides Sync (${data.totalChanges} edit${data.totalChanges === 1 ? '' : 's'})`,
            xml: data.xml,
            payload: nextPayload,
          })
        );
      }
      setStatusNotice(data.summary || 'Synced from Google Slides.');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Google Slides sync-back failed.');
    } finally {
      setIsSyncingFromSlides(false);
    }
  }

  // =========================================================================
  // STAGE 1: NLP PROMPT EVALUATION -> TOP 1..3 BLUEPRINTS (ZERO ID ASSIGNED!)
  // =========================================================================
  async function evaluatePromptWithNlp(
    explicitPrompt?: string,
    explicitLevel?: PreferredDepthFilter
  ) {
    const promptToEval = (explicitPrompt !== undefined ? explicitPrompt : userPrompt).trim();
    const levelToUse = explicitLevel !== undefined ? explicitLevel : preferredLevel;
    if (!promptToEval || promptToEval.length < 3) {
      setErrorMsg('Enter an architecture prompt (at least 3 characters) for NLP blueprint evaluation.');
      return;
    }

    setErrorMsg(null);
    setStatusNotice(null);
    setIsEvaluatingNlp(true);
    setPreviewedRecId(null);
    // Clear active instance selection when re-evaluating a prompt so NO ID is assigned & mutation stays LOCKED until chosen!
    setSelectedRecMeta(null);
    setHistoryState(createEmptyUndoRedoState<CompoundPromptToDiagramResult>());
    syncDiagramIdToUrl(null);

    try {
      const res = await fetch('/api/blueprints/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToEval,
          preferredLevel: levelToUse,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok || !Array.isArray(data?.recommendations)) {
        throw new Error(data?.error || 'Failed to evaluate prompt recommendations.');
      }
      setNlpResult(data as NlpRecommendationResponse);
      setStatusNotice(
        `NLP evaluated prompt (${data.isLiveNlp ? data.modelUsed : 'semantic fallback'}) — choose one of Top 1–3 blueprints to mint an Instance ID & unlock mutations.`
      );
    } catch (err: any) {
      setErrorMsg(err?.message || 'NLP prompt evaluation failed.');
    } finally {
      setIsEvaluatingNlp(false);
    }
  }

  // =========================================================================
  // STAGE 2: USER CHOOSES BLUEPRINT -> MINT UNIQUE ID & UNLOCK 2-WAY MUTATION
  // =========================================================================
  async function handleChooseRecommendedBlueprint(rec: NlpBlueprintRecommendation) {
    if (isChoosingTemplateId) return;
    setIsChoosingTemplateId(rec.templateId);
    setErrorMsg(null);

    try {
      const tpl = getCanonicalTemplateById(rec.templateId);
      const baseXml = tpl.generateXml('enterprise', 'light');
      const instanceTitle = `${tpl.name}`;
      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: instanceTitle,
          xml: baseXml,
          comment: `Instantiated Blueprint #${tpl.id} (${tpl.depthLevel}) — NLP Rank #${rec.rank}`,
          prompt: userPrompt.trim() || tpl.primaryPurpose,
          aiReasoning: `NLP Rank #${rec.rank} (${rec.matchScore}% match): ${rec.reasoning}`,
          architectureType: `canonical_${tpl.id}`,
          createdStudio: 'prompt_to_diagram',
        }),
      });
      const data = await res.json();
      const newId = data?.diagram?.id || data?.id;
      if (!res.ok || !newId) {
        throw new Error(data?.error || 'Failed to create unique instance ID for selected blueprint.');
      }

      const inv = countXmlInventory(baseXml);
      const chosenPayload: CompoundPromptToDiagramResult = {
        success: true,
        action: 'create',
        mutationMode: 'direct_drawio_xml_update',
        userPrompt: userPrompt.trim() || tpl.primaryPurpose,
        modificationHistory: [],
        summaryOfChanges: `Selected Blueprint #${tpl.id} (${tpl.depthLevel}) • NLP Rank #${rec.rank} (${rec.matchScore}%): ${rec.reasoning}`,
        xml: baseXml,
        graph: {
          title: instanceTitle,
          subtitle: `Blueprint #${tpl.id} • ${tpl.depthLevel} • 2-Way Sync (Prompt ↔ Draw.io)`,
          reasoning: rec.reasoning,
          groups: [],
          nodes: [],
          edges: [],
        },
        audit: {
          ...inv,
          maxNestingDepth: inv.groupCount > 0 ? 1 : 0,
          siblingOverlaps: 0,
          childContainmentViolations: 0,
        },
        modelUsed: nlpResult?.modelUsed || 'gemini-nlp',
        latencyMs: nlpResult?.latencyMs || 0,
      };

      setSelectedRecMeta(rec);
      setPreviewedRecId(null);
      syncDiagramIdToUrl(newId);
      setHistoryState(
        pushUndoRedoChange(createEmptyUndoRedoState<CompoundPromptToDiagramResult>(), {
          label: `Blueprint #${tpl.id} (${tpl.depthLevel})`,
          xml: baseXml,
          payload: chosenPayload,
        })
      );
      setStatusNotice(
        `Assigned Unique ID (${newId.slice(0, 8)}…) to Blueprint #${tpl.id} (${tpl.depthLevel}). Subsequent Prompt & Draw.io 2-way mutation is now UNLOCKED.`
      );
    } catch (err: any) {
      setErrorMsg(err?.message || 'Could not instantiate selected blueprint.');
    } finally {
      setIsChoosingTemplateId(null);
    }
  }

  async function executeSynthesis(action: 'create' | 'modify', explicitPrompt?: string) {
    setErrorMsg(null);
    const basePrompt = (explicitPrompt !== undefined ? explicitPrompt : userPrompt).trim();
    const modInstruction = (action === 'modify' && explicitPrompt !== undefined ? explicitPrompt : followUpPrompt).trim();

    if (action === 'create' && !basePrompt) {
      setErrorMsg('Enter an architecture prompt to generate a diagram.');
      return;
    }
    if (action === 'modify') {
      if (!savedDiagramId || !activeResult?.xml) {
        setErrorMsg('Choose a blueprint template first to assign an Instance ID and unlock mutations.');
        return;
      }
      if (!modInstruction) {
        setErrorMsg('Enter a follow-up change instruction.');
        return;
      }
    }

    startRef.current = Date.now();
    setElapsedSec(0);
    setActiveAction(action);
    setIsGenerating(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 175_000);

      // Fast Structured Graph V2 Create Mode (direct JSON IR -> deterministic layout -> Draw.io XML + DB save)
      // Strictly independent of preset templates per AGENTS.md (forceV2Freeform: true).
      if (action === 'create' && synthesisEngine === 'v2_fast') {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            prompt: basePrompt,
            layoutEngineV2: true,
            forceV2Freeform: true,
          }),
        });
        clearTimeout(timeoutId);
        const data = await res.json();
        if (!res.ok || !data?.xml) {
          throw new Error(data?.error || data?.replyMessage || 'Failed to synthesize diagram.');
        }
        const inv = countXmlInventory(data.xml);
        const newDiagramId = data?.diagram?.id || null;
        if (newDiagramId) {
          syncDiagramIdToUrl(newDiagramId);
        }
        const v2Payload: CompoundPromptToDiagramResult = {
          success: true,
          action: 'create',
          mutationMode: 'direct_drawio_xml_update',
          userPrompt: basePrompt,
          modificationHistory: [],
          summaryOfChanges: data.reasoning || 'Synthesized structured multi-tier architecture via V2 Graph Engine.',
          xml: data.xml,
          graph: {
            title: data.graph?.title || data.diagram?.name || basePrompt.slice(0, 60),
            reasoning: data.reasoning || '',
            groups: (data.graph?.tiers || []).map((t: any) => ({
              id: t.id,
              label: t.label,
              parentId: null,
              fillHex: '#F8FAFC',
              strokeHex: '#CBD5E1',
            })),
            nodes: (data.graph?.nodes || []).map((n: any) => ({
              id: n.id,
              label: n.label,
              subtitle: n.subtitle || n.description,
              parentId: n.tier || null,
              shape: n.type === 'database' ? 'cylinder' : 'rounded',
              fillHex: '#FFFFFF',
              strokeHex: '#CBD5E1',
            })),
            edges: (data.graph?.edges || []).map((e: any) => ({
              id: e.id,
              source: e.source,
              target: e.target,
              label: e.label,
              dashed: e.style === 'dashed',
            })),
          },
          audit: {
            ...inv,
            maxNestingDepth: inv.groupCount > 0 ? 1 : 0,
            siblingOverlaps: Array.isArray(data?.validationReport?.errors)
              ? data.validationReport.errors.filter((e: any) => e?.code === 'OVERLAP_NODE').length
              : 0,
            childContainmentViolations: Array.isArray(data?.validationReport?.errors)
              ? data.validationReport.errors.filter(
                  (e: any) =>
                    e?.code === 'TEXT_OVERFLOW_HEIGHT' ||
                    e?.code === 'HTML_FOSTER_PARENTING_IN_TABLE'
                ).length
              : 0,
          },
          modelUsed: data.telemetry?.modelId || 'gemini-2.5-flash',
          latencyMs: data.telemetry?.latencyMs || Date.now() - (startRef.current || Date.now()),
        };
        setSessionRefImageUrl(null);
        setLinkedSlidesId(null);
        setLinkedSlidesUrl(null);
        setStatusNotice(newDiagramId ? `Generated & auto-saved to Library (${newDiagramId.slice(0, 8)}…).` : 'Generated diagram.');
        setHistoryState((prev) =>
          pushUndoRedoChange(prev, {
            label: v2Payload.graph.title,
            xml: v2Payload.xml,
            payload: v2Payload,
          })
        );
        return;
      }

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

      // Guarantee EVERY generated/modified diagram gets a unique persistent UUID and ?id=<uuid> URL
      try {
        if (action === 'create') {
          const saveRes = await fetch('/api/diagrams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: typedResult.graph?.title || basePrompt.slice(0, 60) || 'PromptCanvas Architecture',
              xml: typedResult.xml,
              comment: '4-Stage Vision Render Synthesis',
              prompt: basePrompt,
              aiReasoning: typedResult.summaryOfChanges || typedResult.graph?.reasoning || '',
              architectureType: 'compound_freeform',
              createdStudio: 'prompt_to_diagram',
            }),
          });
          if (saveRes.ok) {
            const savedData = await saveRes.json();
            const createdId = savedData?.diagram?.id || savedData?.id || null;
            if (createdId) {
              syncDiagramIdToUrl(createdId);
              setStatusNotice(`Generated & auto-saved with permanent URL (?id=${createdId.slice(0, 8)}…).`);
            }
          }
        } else if (action === 'modify' && savedDiagramId) {
          await fetch(`/api/diagrams/${encodeURIComponent(savedDiagramId)}/versions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              xmlContent: typedResult.xml,
              comment: modInstruction.slice(0, 120),
              createdBy: 'AI-Spatial',
            }),
          });
          setStatusNotice(`Updated diagram (${savedDiagramId.slice(0, 8)}…) & persisted new version.`);
        }
      } catch {
        // Non-blocking: diagram is still rendered locally and user can click Save to Library
      }
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
    syncDiagramIdToUrl(null);
    setSessionRefImageUrl(null);
    try {
      sessionStorage.removeItem(P2D_REF_IMAGE_SESSION_KEY);
    } catch {}
    setFollowUpPrompt('');
    setNlpResult(null);
    setPreviewedRecId(null);
    setSelectedRecMeta(null);
    setErrorMsg(null);
    setStatusNotice(null);
    setCanvasViewMode('drawio');
    setShowPlanDetails(false);
  }

  function handleCopyPermanentUrl() {
    if (typeof window === 'undefined' || !savedDiagramId) return;
    const shareUrl = `${window.location.origin}/prompt-to-diagram?id=${encodeURIComponent(savedDiagramId)}`;
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1800);
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
        badge="NLP Top 1–3 Blueprint Ranking • Deferred Instance ID • 2-Way Prompt ↔ Draw.io Sync"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className={btnClass('neutral')}
              data-testid="back-to-blueprint-studio-link"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Blueprint Studio</span>
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
            {activeResult?.xml && savedDiagramId && (
              <>
                <button
                  type="button"
                  onClick={handleCopyPermanentUrl}
                  className="px-2.5 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] font-mono font-bold inline-flex items-center gap-1.5 cursor-pointer transition"
                  data-testid="btn-copy-diagram-url"
                  title={`Permanent Diagram ID: ${savedDiagramId} — Click to copy shareable URL`}
                >
                  <Link2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{copiedLink ? 'Copied URL!' : `ID: ${savedDiagramId.slice(0, 8)}`}</span>
                </button>
                <button
                  type="button"
                  onClick={() => void handleSaveToLibraryDb()}
                  disabled={isSavingDb}
                  className={btnClass('neutral')}
                  data-testid="btn-save-library-db"
                >
                  {isSavingDb ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Version</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsDrawioEditorOpen(true)}
                  className={btnClass('primary')}
                  data-testid="btn-open-drawio-editor"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit in Draw.io (2-Way)</span>
                </button>
                <button
                  type="button"
                  onClick={() => void handleExportToGoogleSlides()}
                  disabled={isExportingSlides}
                  className={btnClass('neutral')}
                  data-testid="btn-export-google-slides"
                >
                  {isExportingSlides ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Presentation className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{linkedSlidesId ? 'Update Slides' : 'Google Slides'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => void handleSyncFromGoogleSlides()}
                  disabled={isSyncingFromSlides}
                  className={btnClass('neutral')}
                  data-testid="btn-sync-from-google-slides"
                  title="Pull edits made in Google Slides back into Draw.io XML & version history"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isSyncingFromSlides ? 'animate-spin' : ''}`} />
                  <span>Sync from Slides</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadDrawio}
                  className={btnClass('neutral')}
                  data-testid="btn-download-drawio"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.drawio</span>
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
                {(activeResult || nlpResult) && (
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
                rows={4}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    void evaluatePromptWithNlp();
                  }
                }}
                placeholder="Describe your architecture, security posture, multi-tenancy, workflows, or GCP topology (modify anytime to re-rank Top 1–3 templates)..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 outline-none resize-y leading-relaxed font-medium"
              />

              {/* ARCHITECTURE DEPTH LEVEL FILTER (All | L100 | L200 | L300 | L400) */}
              <div className="mt-2 p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-extrabold uppercase tracking-wider text-slate-600">
                    Target Level (Optional)
                  </span>
                  <span className="font-semibold text-indigo-600">L400 = Most Detailed</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {CANONICAL_DEPTH_LEVELS.map((lvl) => {
                    const isActive = preferredLevel === lvl;
                    const meta = lvl === 'All' ? null : DEPTH_LEVEL_META[lvl];
                    return (
                      <button
                        key={lvl}
                        type="button"
                        data-testid={`p2d-level-filter-${lvl.toLowerCase()}`}
                        onClick={() => {
                          setPreferredLevel(lvl);
                          if (userPrompt.trim().length >= 3 && !savedDiagramId) {
                            void evaluatePromptWithNlp(userPrompt, lvl);
                          }
                        }}
                        title={meta ? `${meta.label}: ${meta.description}` : 'Let Gemini NLP infer the best level (L100–L400)'}
                        className={`py-1 px-1 rounded-lg text-[10px] font-extrabold border transition cursor-pointer ${
                          isActive
                            ? lvl === 'L400'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                data-testid="btn-evaluate-nlp-blueprints"
                disabled={isEvaluatingNlp || isGenerating || !userPrompt.trim()}
                onClick={() => void evaluatePromptWithNlp()}
                className="mt-2.5 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-500 text-white text-xs font-extrabold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isEvaluatingNlp ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                    <span className="truncate">Running Gemini NLP Evaluation (Top 1–3)...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-3.5 h-3.5" />
                    <span>{nlpResult || savedDiagramId ? 'Re-Evaluate Prompt (Top 1–3 NLP)' : 'Evaluate Prompt → Top 3 Blueprints (NLP)'}</span>
                  </>
                )}
              </button>

              {resumableStoredId && !savedDiagramId && !nlpResult && (
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `/prompt-to-diagram?id=${encodeURIComponent(resumableStoredId)}`;
                  }}
                  className="mt-2 w-full py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-semibold text-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span>Resume last saved diagram</span>
                  <span className="font-mono text-[10px] text-blue-700">{resumableStoredId.slice(0, 8)} →</span>
                </button>
              )}
            </div>

            {statusNotice && (
              <div
                data-testid="prompt-status-banner"
                className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{statusNotice}</span>
              </div>
            )}

            {errorMsg && (
              <div
                data-testid="prompt-error-banner"
                className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* DIRECT DRAW.IO XML UPDATE BOX — LOCKED UNTIL USER CHOOSES A TEMPLATE & ID IS ASSIGNED */}
            {activeResult && savedDiagramId ? (
              <div className="pt-3 border-t border-slate-200 space-y-2" data-testid="p2d-mutation-unlocked-panel">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="followup-prompt-textarea"
                    className="text-xs font-extrabold text-slate-900"
                  >
                    Mutate Instance (2-Way Sync)
                  </label>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                    Prompt ↔ Draw.io
                  </span>
                </div>
                {selectedRecMeta && selectedRecMeta.suggestedMutations.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {selectedRecMeta.suggestedMutations.map((mut, idx) => (
                      <button
                        key={idx}
                        type="button"
                        disabled={isGenerating}
                        onClick={() => {
                          setFollowUpPrompt(mut);
                        }}
                        className="w-full text-left px-2.5 py-1 rounded-lg bg-blue-50/80 hover:bg-blue-100 border border-blue-200 text-[10px] font-semibold text-blue-800 cursor-pointer truncate block"
                        title={mut}
                      >
                        + {mut}
                      </button>
                    ))}
                  </div>
                )}
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
                  placeholder="Add, move, connect, or remove components directly in your diagram instance..."
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
            ) : (
              <div
                data-testid="p2d-mutation-locked-panel"
                className="pt-3 border-t border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Mutation &amp; Draw.io Locked</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                    No ID Yet
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  Evaluate your prompt and <strong>choose one of the Top 1–3 NLP Blueprints</strong> on the right. Only after you pick a template will a unique Diagram ID be assigned and 2-way Prompt + Draw.io mutation be enabled.
                </p>
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
                        ? activeResult.action === 'create'
                          ? selectedRecMeta
                            ? `NLP Blueprint #${selectedRecMeta.templateId} (2-Way Sync)`
                            : 'Persisted Diagram (2-Way Sync)'
                          : 'Direct Draw.io Spatial Update'
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

        {/* RIGHT FULL-HEIGHT VECTOR DRAW.IO CANVAS OR NLP TOP 1–3 BLUEPRINT SELECTION STAGE */}
        <section className="p-4 flex flex-col min-w-0 bg-slate-50">
          {activeResult?.xml && savedDiagramId ? (
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
          ) : nlpResult ? (
            <div
              data-testid="nlp-blueprint-selection-stage"
              className="flex-1 flex flex-col gap-4 min-h-[600px]"
            >
              {/* NLP Semantic Analysis Summary Header */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-sm font-black text-slate-900">
                          Top 1–3 NLP-Ranked Blueprint Recommendations
                        </h2>
                        <span
                          data-testid="nlp-engine-badge"
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            nlpResult.isLiveNlp
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {nlpResult.isLiveNlp ? `Gemini NLP • ${nlpResult.modelUsed}` : 'Semantic Vector Fallback'}
                        </span>
                        <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                          Inferred Level: {nlpResult.inferredLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{nlpResult.promptSummary}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>No ID Assigned Yet — Pick a Template Below</span>
                  </span>
                </div>

                {nlpResult.detectedConcepts.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Detected Intent:
                    </span>
                    {nlpResult.detectedConcepts.map((concept, idx) => (
                      <span
                        key={`${concept}-${idx}`}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* TOP 1, #2, #3 RANKED BLUEPRINT CARDS */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {nlpResult.recommendations.map((rec) => {
                  const isPreviewOpen = previewedRecId === rec.templateId;
                  const isChoosing = isChoosingTemplateId === rec.templateId;
                  const rankColors =
                    rec.rank === 1
                      ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white'
                      : rec.rank === 2
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-white';

                  return (
                    <div
                      key={rec.templateId}
                      data-testid={`nlp-rec-card-${rec.rank}`}
                      className={`bg-white rounded-2xl border p-4 flex flex-col justify-between gap-3 transition shadow-xs ${
                        rec.rank === 1
                          ? 'border-indigo-400 ring-2 ring-indigo-500/15 shadow-md'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Rank + Confidence + Depth Level */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-black uppercase tracking-wider ${rankColors}`}>
                            #{rec.rank} {rec.rank === 1 ? 'Best Match' : rec.rank === 2 ? 'Strong Match' : 'Alternative'}
                          </span>
                          <div className="flex items-center gap-1">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                                rec.depthLevel === 'L400'
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-sky-50 text-sky-800 border border-sky-200'
                              }`}
                            >
                              {rec.depthLevel}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {rec.matchScore}% match
                            </span>
                          </div>
                        </div>

                        {/* Blueprint Title & Tags */}
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap mb-1">
                            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
                              Blueprint #{rec.templateId}
                            </span>
                            <span className="text-[10px] font-bold uppercase text-slate-500">
                              {rec.family}
                            </span>
                            {rec.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-indigo-50 text-indigo-700 border border-indigo-200"
                              >
                                <Tag className="w-2.5 h-2.5" />
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-xs font-extrabold text-slate-900 leading-snug">
                            {rec.name}
                          </h3>
                        </div>

                        {/* Real Certified Preview Thumbnail */}
                        <div className="w-full h-40 rounded-xl border border-slate-200 bg-slate-50/70 overflow-hidden flex items-center justify-center p-1.5">
                          <img
                            src={rec.previewImage}
                            alt={rec.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* NLP Reasoning Callout */}
                        <div
                          data-testid={`nlp-rec-reasoning-${rec.rank}`}
                          className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-1"
                        >
                          <div className="text-[10px] font-black uppercase tracking-wider text-indigo-800 flex items-center gap-1">
                            <Brain className="w-3 h-3 text-indigo-600" />
                            <span>Why Chosen (NLP Reasoning)</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                            {rec.reasoning}
                          </p>
                        </div>

                        {/* Suggested Follow-Up Mutations */}
                        {rec.suggestedMutations.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                              Next Mutations After Selection
                            </div>
                            <ul className="space-y-0.5 text-[10.5px] text-slate-600">
                              {rec.suggestedMutations.slice(0, 2).map((mut, mIdx) => (
                                <li key={mIdx} className="truncate" title={mut}>
                                  • {mut}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Actions: Read-Only Preview vs. Choose & Assign ID */}
                      <div className="pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                        <button
                          type="button"
                          data-testid={`btn-choose-recommended-${rec.templateId}`}
                          disabled={Boolean(isChoosingTemplateId)}
                          onClick={() => void handleChooseRecommendedBlueprint(rec)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 ${
                            rec.rank === 1
                              ? 'bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white shadow-sm'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          {isChoosing ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Minting New ID…</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Choose Blueprint #{rec.templateId} (Assign ID)</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          data-testid={`btn-preview-recommended-${rec.templateId}`}
                          onClick={() => setPreviewedRecId(isPreviewOpen ? null : rec.templateId)}
                          className="w-full py-1.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>{isPreviewOpen ? 'Hide Read-Only Preview' : 'Inspect Vector Preview (No ID)'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional Read-Only Interactive Preview of a Recommended Template (Still NO ID Assigned) */}
              {previewedRecId && (() => {
                const previewRec = nlpResult.recommendations.find((r) => r.templateId === previewedRecId);
                if (!previewRec) return null;
                const previewXml = getCanonicalTemplateById(previewRec.templateId).generateXml('enterprise', 'light');
                return (
                  <div
                    data-testid="nlp-readonly-preview-panel"
                    className="bg-white rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden flex flex-col"
                  >
                    <div className="px-4 py-2.5 bg-indigo-50 border-b border-indigo-200 flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-950">
                        <Eye className="w-4 h-4 text-indigo-600" />
                        <span>
                          Read-Only Preview: Blueprint #{previewRec.templateId} — {previewRec.name} ({previewRec.depthLevel})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void handleChooseRecommendedBlueprint(previewRec)}
                          disabled={Boolean(isChoosingTemplateId)}
                          className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-extrabold cursor-pointer"
                        >
                          Use This Blueprint (Assign New ID)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewedRecId(null)}
                          className="p-1 rounded-lg hover:bg-indigo-100 text-indigo-700 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="h-[520px] p-2 bg-white">
                      <DiagramViewerRenderSafe
                        xml={previewXml}
                        diagramType={`canonical_${previewRec.templateId}`}
                        bgTheme="light"
                        minHeight={500}
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div
              data-testid="prompt-empty-canvas-state"
              className="flex-1 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-8 min-h-[600px] space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-xl">
                <h2 className="text-base font-black text-slate-900">
                  NLP-Guided Prompt-to-Diagram Studio
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter any architecture prompt on the left. Gemini NLP evaluates your intent,
                  depth (<strong className="text-indigo-700">L100–L400</strong>), and technical
                  requirements to rank the <strong>Top 1–3 relevant certified blueprints</strong>{' '}
                  with clear reasoning. Refine your prompt as many times as you like — a unique
                  Diagram ID and 2-way Prompt ↔ Draw.io mutation unlock{' '}
                  <strong>only when you choose a blueprint</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl w-full pt-2 text-left">
                {[
                  {
                    label: 'L400 Multi-Tenant 5-Hop GCP Agent Platform',
                    prompt:
                      'Design an L400 GCP multi-tenant agentic AI platform with Pool, Hybrid /28 PSC spokes, and Sovereign HSM CMEK Silos behind an 80% shared 5-Hop control plane with STS DPoP and Model Armor',
                  },
                  {
                    label: 'L400 Principal Sequence (OIDC + SPIFFE + MCP)',
                    prompt:
                      'Create a detailed L400 runtime sequence diagram showing OIDC JWT, SPIFFE mTLS, Agent Gateway delegation, A2A subagent calls, MCP tools, and HITL review gates',
                  },
                  {
                    label: 'L300 Physical AlloyDB + ScaNN ERD Schema',
                    prompt:
                      'Show a physical PostgreSQL AlloyDB database schema and ERD with row-level security, monthly partitioning, and ScaNN vector indexes for an AI platform',
                  },
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setUserPrompt(sample.prompt);
                      void evaluatePromptWithNlp(sample.prompt, preferredLevel);
                    }}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-indigo-50/50 hover:border-indigo-300 transition text-left space-y-1 cursor-pointer"
                  >
                    <div className="text-[11px] font-extrabold text-slate-900">{sample.label}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-2 leading-snug">
                      {sample.prompt}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* INLINE REACT MODAL FOR GOOGLE SLIDES SYNC (ZERO window.prompt) */}
      {isSlidesSyncModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          data-testid="modal-sync-from-slides"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Sync Edits from Google Slides</h3>
              <button
                type="button"
                onClick={() => setIsSlidesSyncModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paste a Google Slides URL or Presentation ID to pull text and layout edits back into your Draw.io XML.
            </p>
            <input
              type="text"
              value={slidesSyncInput}
              onChange={(e) => setSlidesSyncInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && slidesSyncInput.trim()) {
                  void handleSyncFromGoogleSlides(slidesSyncInput.trim());
                }
              }}
              placeholder="https://docs.google.com/presentation/d/..."
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 outline-none"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsSlidesSyncModalOpen(false)}
                className={btnClass('neutral')}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!slidesSyncInput.trim() || isSyncingFromSlides}
                onClick={() => void handleSyncFromGoogleSlides(slidesSyncInput.trim())}
                className={btnClass('primary')}
              >
                Sync from Slides
              </button>
            </div>
          </div>
        </div>
      )}

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
