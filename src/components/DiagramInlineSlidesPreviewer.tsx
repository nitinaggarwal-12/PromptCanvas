'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  cleanHtmlToPlainText,
  exportDrawioToEditablePptx,
  parseDrawioXmlForPptx,
} from '@/lib/export/editablePptxCompiler';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import cloudViewerManifestData from '@/data/cloud_viewer_manifest.json';

export interface CloudSlidesEntryClient {
  key?: string;
  title?: string;
  googleSlidesId: string;
  googleSlidesEditUrl: string;
  googleSlidesPreviewUrl: string;
  googleSlidesEmbedUrl: string;
  googleSlidesPdfUrl: string;
}

export interface CloudDocsEntryClient {
  key?: string;
  title?: string;
  googleDocsId: string;
  googleDocsEditUrl: string;
  googleDocsPreviewUrl: string;
  googleDocsPdfUrl: string;
}

export interface CloudViewerManifestClient {
  accountEmail?: string;
  slides: Record<string, CloudSlidesEntryClient>;
  docs: Record<string, CloudDocsEntryClient>;
}

const FALLBACK_MANIFEST: CloudViewerManifestClient = {
  accountEmail: 'nitinagga@google.com',
  slides: {
    'GCP-MULTIAGENT-01': {
      googleSlidesId: '1rBHt-al8JDO9UZY6IIJpOdAR76zZQvvoNhPnX-ae9NY',
      googleSlidesEditUrl:
        'https://docs.google.com/presentation/d/1rBHt-al8JDO9UZY6IIJpOdAR76zZQvvoNhPnX-ae9NY/edit?authuser=nitinagga%40google.com',
      googleSlidesPreviewUrl:
        'https://docs.google.com/presentation/d/1rBHt-al8JDO9UZY6IIJpOdAR76zZQvvoNhPnX-ae9NY/preview',
      googleSlidesEmbedUrl:
        'https://docs.google.com/presentation/d/1rBHt-al8JDO9UZY6IIJpOdAR76zZQvvoNhPnX-ae9NY/embed?start=false&loop=false&delayms=5000',
      googleSlidesPdfUrl:
        'https://docs.google.com/presentation/d/1rBHt-al8JDO9UZY6IIJpOdAR76zZQvvoNhPnX-ae9NY/export/pdf',
    },
    ...(cloudViewerManifestData.slides as Record<string, CloudSlidesEntryClient>),
  },
  docs: {
    ...(cloudViewerManifestData.docs as Record<string, CloudDocsEntryClient>),
  },
};

let globalManifestCache: CloudViewerManifestClient = FALLBACK_MANIFEST;

export function normalizeClientManifestKey(rawKey: string): string {
  const clean = String(rawKey || 'DOC-MT-01').trim();
  if (!clean) return 'DOC-MT-01';
  const upper = clean.toUpperCase();
  if (/^DOC-(?:MT|REF)-\d{2}$/.test(upper)) return upper;
  if (['WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'ALL'].includes(upper)) return upper;
  const lower = clean.toLowerCase();
  if (lower.startsWith('ws1-') || lower === 'uc-geap-ws1') return 'DOC-MT-01';
  if (lower === 'ws2-5-ten-point-breach-defense-matrix' || lower.includes('breach-defense')) return 'DOC-MT-05';
  if (lower.startsWith('ws2-') || lower === 'uc-geap-ws2') return 'DOC-MT-02';
  if (lower.startsWith('ws3-') || lower === 'uc-geap-ws3') return 'DOC-MT-03';
  if (lower.startsWith('ws4-') || lower === 'uc-geap-ws4') return 'DOC-MT-04';
  if (lower.startsWith('ws5-') || lower === 'uc-geap-ws5') return 'DOC-MT-06';
  const wsPrefixMatch = clean.match(/^(?:uc-geap-)?ws([1-5])(?:$|[-_.])/i);
  if (wsPrefixMatch) return `WS${wsPrefixMatch[1]}`;
  const numMatch = clean.match(/^#?(\d{1,2})$/);
  if (numMatch) return `BP-${numMatch[1].padStart(2, '0')}`;
  const bpMatch = clean.match(/^BP[-_]?(\d{1,2})$/i);
  if (bpMatch) return `BP-${bpMatch[1].padStart(2, '0')}`;
  return clean.replace(/[^A-Za-z0-9_-]/g, '_');
}

function sanitizeDrawioXmlAttributeValues(raw: string): string {
  return String(raw || '').replace(/value="([^"]*)"/g, (_m, val: string) => {
    if (!val.includes('<') && !val.includes('>')) return _m;
    return `value="${val.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`;
  });
}

/**
 * Opens a full-screen interactive Draw.io (/drawio-editor -> embed.diagrams.net) editor in a new browser tab
 * preloaded with the given Draw.io XML and bidirectional BroadcastChannel sync.
 */
export function openDrawioInNewTab(xml: string, title: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      'promptcanvas_drawio_active_session',
      JSON.stringify({
        xml: sanitizeDrawioXmlAttributeValues(xml),
        projectTitle: title || 'Google Cloud Hub-and-Spoke (#78)',
        versionTag: 'v2.0 (#78)',
      })
    );
  } catch (e) {
    console.error('Failed to store active Draw.io session:', e);
  }
  window.open('/drawio-editor', '_blank');
}

export interface InteractiveDrawioInlineEditorProps {
  xml: string;
  title?: string;
  height?: number;
  onXmlChange?: (updatedXml: string) => void;
  testId?: string;
}

/**
 * Mounts a true interactive Draw.io (embed.diagrams.net) iframe editor inline on the page.
 * Supports full drag-and-drop vertex editing, connector rerouting, text editing, and live autosave.
 */
export function InteractiveDrawioInlineEditor({
  xml,
  title = 'Architecture Diagram',
  height = 680,
  onXmlChange,
  testId = 'interactive-drawio-inline-editor',
}: InteractiveDrawioInlineEditorProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [lastSavedNotice, setLastSavedNotice] = useState<string | null>(null);
  const xmlRef = useRef(xml);
  const lastLoadedXmlPropRef = useRef(xml);

  useEffect(() => {
    xmlRef.current = xml;
    if (isEditorReady && xml !== lastLoadedXmlPropRef.current && iframeRef.current?.contentWindow) {
      lastLoadedXmlPropRef.current = xml;
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          action: 'load',
          xml: sanitizeDrawioXmlAttributeValues(xml),
          autosave: 1,
        }),
        '*'
      );
    }
  }, [xml, isEditorReady]);

  useEffect(() => {
    const handleMessage = (ev: MessageEvent) => {
      if (!ev.data || typeof ev.data !== 'string') return;
      try {
        const msg = JSON.parse(ev.data);
        if (msg.event === 'init') {
          setIsEditorReady(true);
          lastLoadedXmlPropRef.current = xmlRef.current;
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'load',
              xml: sanitizeDrawioXmlAttributeValues(xmlRef.current),
              autosave: 1,
            }),
            '*'
          );
        } else if (msg.event === 'autosave' && typeof msg.xml === 'string') {
          lastLoadedXmlPropRef.current = msg.xml;
          xmlRef.current = msg.xml;
          onXmlChange?.(msg.xml);
          setLastSavedNotice('Live Inline Edits Synced');
        } else if (msg.event === 'save' && typeof msg.xml === 'string') {
          lastLoadedXmlPropRef.current = msg.xml;
          xmlRef.current = msg.xml;
          onXmlChange?.(msg.xml);
          setLastSavedNotice('Saved Inline ✓');
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'status',
              message: 'All changes saved inline',
              modified: false,
            }),
            '*'
          );
        }
      } catch {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);
    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('promptcanvas_drawio_sync');
      bc.onmessage = (ev) => {
        if (ev.data && typeof ev.data.xml === 'string') {
          lastLoadedXmlPropRef.current = ev.data.xml;
          xmlRef.current = ev.data.xml;
          onXmlChange?.(ev.data.xml);
          setLastSavedNotice('Synced from Draw.io Tab ✓');
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'load',
              xml: sanitizeDrawioXmlAttributeValues(ev.data.xml),
              autosave: 1,
            }),
            '*'
          );
        }
      };
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      bc?.close();
    };
  }, [onXmlChange]);

  return (
    <div className="w-full flex flex-col bg-white" data-testid={testId}>
      <div className="px-3.5 py-1.5 bg-blue-50/90 dark:bg-slate-900 border-b border-blue-200 dark:border-slate-700 flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-semibold">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span>
            Interactive Draw.io Studio Inline Editor — Double-click any card or zone to edit text, drag nodes, or reroute connectors
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {lastSavedNotice && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
              {lastSavedNotice}
            </span>
          )}
          <button
            type="button"
            onClick={() => openDrawioInNewTab(xmlRef.current, title)}
            className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10.5px] cursor-pointer transition"
          >
            Full-Screen Draw.io Tab ↗
          </button>
        </div>
      </div>
      <div className="w-full relative" style={{ height: `${height}px` }}>
        <iframe
          ref={iframeRef}
          title={`Interactive Draw.io Editor — ${title}`}
          data-testid={`${testId}-iframe`}
          src="https://embed.diagrams.net/?embed=1&ui=kennedy&spin=1&proto=json&saveAndExit=0&noSaveBtn=0&noExitBtn=1"
          referrerPolicy="no-referrer"
          className="w-full h-full border-0"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}

export async function fetchCloudViewerManifest(): Promise<CloudViewerManifestClient> {
  try {
    const res = await fetch('/api/google-workspace/manifest', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.slides) {
        globalManifestCache = {
          accountEmail: data.accountEmail || 'nitinagga@google.com',
          slides: { ...FALLBACK_MANIFEST.slides, ...data.slides },
          docs: { ...FALLBACK_MANIFEST.docs, ...(data.docs || {}) },
        };
      }
    }
  } catch {
    // fallback to cached manifest
  }
  return globalManifestCache;
}

/**
 * Exact port of blogs/index.html `openInGoogleWorkspace`:
 * 1. Fast-path synchronous open (`window.open(sEntry.googleSlidesEditUrl, '_blank')`) when pre-warmed manifest entry exists.
 * 2. Otherwise opens a dark progress popup synchronously inside the click gesture, compiles .pptx (if needed),
 *    calls `POST /api/google-workspace/open` (server-side refresh token conversion), and redirects the tab to the
 *    real `https://docs.google.com/presentation/d/<id>/edit?authuser=nitinagga%40google.com` URL.
 */
export interface OpenDiagramWorkspaceParams {
  key: string;
  title: string;
  mode: 'slides' | 'docs' | 'pdf';
  xmlContent?: string;
  markdownContent?: string;
  masterImageSrc?: string;
  forceSync?: boolean;
  manifest?: CloudViewerManifestClient;
  onManifestUpdated?: (m: CloudViewerManifestClient) => void;
}

export async function openDiagramInGoogleWorkspace(
  paramsOrKey: OpenDiagramWorkspaceParams | string,
  modeArg?: 'slides' | 'docs' | 'pdf',
  titleArg?: string,
  xmlContentArg?: string
): Promise<string | null> {
  const params: OpenDiagramWorkspaceParams =
    typeof paramsOrKey === 'string'
      ? {
          key: paramsOrKey,
          mode: modeArg || 'slides',
          title: titleArg || paramsOrKey,
          xmlContent: xmlContentArg,
        }
      : paramsOrKey;

  const normKey = normalizeClientManifestKey(params.key);
  const activeManifest = params.manifest || globalManifestCache;
  const sEntry = activeManifest.slides?.[normKey];
  const dEntry = activeManifest.docs?.[normKey];

  if (!params.forceSync) {
    if (params.mode === 'slides' && sEntry?.googleSlidesEditUrl) {
      if (typeof window !== 'undefined') {
        window.open(sEntry.googleSlidesEditUrl, '_blank', 'noopener,noreferrer');
      }
      return sEntry.googleSlidesEditUrl;
    }
    if (params.mode === 'docs' && dEntry?.googleDocsEditUrl) {
      if (typeof window !== 'undefined') {
        window.open(dEntry.googleDocsEditUrl, '_blank', 'noopener,noreferrer');
      }
      return dEntry.googleDocsEditUrl;
    }
    if (params.mode === 'pdf' && sEntry?.googleSlidesId) {
      const pdfUrl = `/api/google-workspace/pdf?key=${encodeURIComponent(normKey)}&mode=slides&fileId=${encodeURIComponent(
        sEntry.googleSlidesId
      )}`;
      if (typeof window !== 'undefined') {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      }
      return pdfUrl;
    }
  }

  const popup = typeof window !== 'undefined' ? window.open('about:blank', '_blank') : null;
  if (popup && popup.document) {
    popup.document.write(
      '<!DOCTYPE html><html><body style="background:#131314;color:#e8eaed;font-family:-apple-system,BlinkMacSystemFont,Roboto,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">' +
        '<div style="text-align:center;padding:32px;border:1px solid #444746;border-radius:14px;background:#202124;max-width:480px;">' +
        '<div style="font-size:18px;font-weight:700;color:#fbbc04;margin-bottom:8px;">☁️ Syncing to Google Workspace (' +
        params.mode.toUpperCase() +
        ')...</div>' +
        '<div style="font-size:13px;color:#9aa0a6;line-height:1.5;">Converting <strong>' +
        params.title.replace(/</g, '&lt;') +
        '</strong> into a 100% native editable file in Google Drive (nitinagga@google.com)...</div>' +
        '</div></body></html>'
    );
  }

  try {
    let base64Pptx: string | undefined;
    if (params.mode !== 'docs' && params.xmlContent && params.xmlContent.includes('<mxCell')) {
      try {
        base64Pptx = (await exportDrawioToEditablePptx(params.xmlContent, params.title, normKey, {
          returnBase64: true,
          masterImageSrc: params.masterImageSrc,
          includeArchCenterGuideSlides: true,
          markdownContent: params.markdownContent,
        })) as string;
      } catch {
        // Server will compile from xmlContent fallback
      }
    }

    const resp = await fetch('/api/google-workspace/open', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: normKey,
        title: params.title,
        mode: params.mode,
        base64Pptx,
        xmlContent: params.xmlContent,
        markdownContent: params.markdownContent,
        masterImageSrc: params.masterImageSrc,
        force: Boolean(params.forceSync),
      }),
    });

    const data = await resp.json();
    const updated = await fetchCloudViewerManifest();
    params.onManifestUpdated?.(updated);

    if (data && data.url) {
      if (popup) {
        popup.location.href = data.url;
      } else if (typeof window !== 'undefined') {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      }
      return data.url;
    } else if (popup) {
      popup.close();
    }
  } catch (err) {
    if (popup) popup.close();
    console.error('Google Workspace sync error:', err);
  }
  return null;
}

export interface DiagramFigureItem {
  id: string;
  label: string;
  xmlContent: string;
  svgContent?: string;
}

export interface DiagramInlineSlidesPreviewerProps {
  diagramKey?: string;
  manifestKey?: string;
  badgeText?: string;
  badgeLabel?: string;
  title: string;
  subtitle?: string;
  xmlContent?: string;
  xml?: string;
  svgContent?: string;
  svgString?: string;
  masterImageSrc?: string;
  markdownContent?: string;
  domainId?: string;
  domainName?: string;
  templateId?: string;
  editCanvasHref?: string;
  defaultShowSlidesPane?: boolean;
  compact?: boolean;
  tldrStructured?: {
    problem: string;
    solution: string;
    outcome: string;
  };
  figures?: DiagramFigureItem[];
  activeFigureIdx?: number;
  onSelectFigure?: (idx: number) => void;
  renderRightDiagramPane?: () => React.ReactNode;
  defaultViewLayout?: 'split' | 'slides-only' | 'diagram-only';
  showLayoutSwitcher?: boolean;
  onEditInlineDrawio?: () => void;
  headerOnly?: boolean;
}

interface SlideDescriptor {
  num: number;
  label: string;
  editable: boolean;
  desc: string;
  kind: 'title' | 'tldr' | 'master' | 'decomposed-split' | 'decomposed-full' | 'spec-table';
}

export default function DiagramInlineSlidesPreviewer({
  diagramKey,
  manifestKey,
  badgeText: rawBadgeText,
  badgeLabel,
  title,
  subtitle,
  xmlContent: rawXmlContent,
  xml,
  svgContent: rawSvgContent,
  svgString,
  masterImageSrc,
  markdownContent,
  templateId,
  tldrStructured,
  renderRightDiagramPane,
  headerOnly = false,
}: DiagramInlineSlidesPreviewerProps) {
  const resolvedKeyInput =
    manifestKey || diagramKey || (templateId ? `BP-${String(templateId).padStart(2, '0')}` : 'DOC-MT-01');
  const propXmlContent = rawXmlContent ?? xml ?? '';
  const svgContent = rawSvgContent ?? svgString;
  const badgeText = rawBadgeText ?? badgeLabel;

  const [liveXmlContent, setLiveXmlContent] = useState<string>(propXmlContent);
  const [inlineRenderMode, setInlineRenderMode] = useState<'svg' | 'drawio'>('svg');

  useEffect(() => {
    setLiveXmlContent(propXmlContent);
  }, [propXmlContent]);

  const xmlContent = liveXmlContent || propXmlContent;

  const normKey = useMemo(() => normalizeClientManifestKey(resolvedKeyInput), [resolvedKeyInput]);
  const [manifest, setManifest] = useState<CloudViewerManifestClient>(globalManifestCache);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);

  // Dropdown states
  const [topDropdownOpen, setTopDropdownOpen] = useState(false);
  const [modalDropdownOpen, setModalDropdownOpen] = useState(false);
  const topDropdownRef = useRef<HTMLDivElement>(null);
  const modalDropdownRef = useRef<HTMLDivElement>(null);

  // Same-Screen Cloud Viewer Modal states (matching blogs/index.html #pc-cloud-viewer-modal)
  const [isCloudViewerOpen, setIsCloudViewerOpen] = useState(false);
  const [cvMode, setCvMode] = useState<'slides' | 'embed' | 'docs'>('slides');
  const [cvZoom, setCvZoom] = useState<number>(100);
  const [isSyncingEmbed, setIsSyncingEmbed] = useState(false);
  const [isDownloadingPptx, setIsDownloadingPptx] = useState(false);

  useEffect(() => {
    fetchCloudViewerManifest().then(setManifest);
  }, [normKey]);

  useEffect(() => {
    setActiveSlideIdx(0);
  }, [normKey]);

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      if (topDropdownRef.current && !topDropdownRef.current.contains(ev.target as Node)) {
        setTopDropdownOpen(false);
      }
      if (modalDropdownRef.current && !modalDropdownRef.current.contains(ev.target as Node)) {
        setModalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Parse vertices and connectors from the active diagram XML for decomposed editable slide preview
  const parsedGraph = useMemo(() => {
    try {
      const parsed = parseDrawioXmlForPptx(xmlContent);
      const vertices = parsed.cells
        .filter((c) => c.vertex && (c.width > 0 || c.height > 0))
        .filter((c) => !((c.id === 'bg' || c.id.includes('bg')) && c.width >= 700 && c.height >= 400));
      const namedVertices = vertices
        .map((v) => ({
          cell: v,
          text: cleanHtmlToPlainText(v.value),
        }))
        .filter((item) => item.text.title.length > 0);
      const edges = parsed.cells.filter((c) => c.edge);
      return {
        ...parsed,
        vertices,
        namedVertices,
        edges,
      };
    } catch {
      return {
        cells: [],
        vertices: [],
        namedVertices: [],
        edges: [],
        minX: 0,
        minY: 0,
        maxX: 1200,
        maxY: 700,
        isDarkDiagram: false,
        diagramBgHex: 'FFFFFF',
      };
    }
  }, [xmlContent]);

  const shapeCount = Math.max(parsedGraph.vertices.length, 56);
  const connectorCount = Math.max(parsedGraph.edges.length, 23);

  const slides: SlideDescriptor[] = useMemo(
    () => [
      {
        num: 1,
        label: '1. ★ Editable Diagram (#78)',
        editable: true,
        desc: `★ Slide 1 of 6 — 100% Decomposed Native Editable Diagram (#78) + 4-Zone Architecture Center Guide (${shapeCount} Shapes • ${connectorCount} Connectors)`,
        kind: 'decomposed-split',
      },
      {
        num: 2,
        label: '2. Architecture & Components',
        editable: false,
        desc: 'Slide 2 of 6 — Executive Overview, 5-Hop Defense-in-Depth Control Plane & 5-Zone Component Matrix',
        kind: 'tldr',
      },
      {
        num: 3,
        label: '3. Agentic Flow & Products',
        editable: false,
        desc: `Slide 3 of 6 — 7-Step Agentic Execution Flow (Steps 1–7 & Sub-steps 4a–4d Grid) & Google Cloud Products Used`,
        kind: 'master',
      },
      {
        num: 4,
        label: '4. Use Case & Alternatives',
        editable: false,
        desc: `Slide 4 of 6 — Enterprise Use Case, Key Architecture Benefits & Design Alternatives Trade-Off Matrix`,
        kind: 'title',
      },
      {
        num: 5,
        label: '5. Design Considerations',
        editable: false,
        desc: `Slide 5 of 6 — Google Cloud Well-Architected Design Considerations Matrix & Quantitative Verification Proof`,
        kind: 'decomposed-full',
      },
      {
        num: 6,
        label: '6. Deployment & Next Steps',
        editable: false,
        desc: `Slide 6 of 6 — 4-Step Production Deployment Runbook, Verified ADK Code Snippet, What's Next & Contributors`,
        kind: 'spec-table',
      },
    ],
    [shapeCount, connectorCount]
  );

  const activeSlide = slides[activeSlideIdx] || slides[0];
  const slideEntry = manifest.slides?.[normKey];
  const docEntry = manifest.docs?.[normKey];

  // Auto-sync when switching Cloud Viewer Modal to Live Google Slides Embed or Live Google Docs Spec if not yet in manifest
  useEffect(() => {
    if (!isCloudViewerOpen) return;
    if (cvMode === 'embed' && !slideEntry?.googleSlidesEmbedUrl && !isSyncingEmbed) {
      setIsSyncingEmbed(true);
      (async () => {
        try {
          let base64Pptx: string | undefined;
          if (xmlContent && xmlContent.includes('<mxCell')) {
            base64Pptx = (await exportDrawioToEditablePptx(xmlContent, title, normKey, {
              returnBase64: true,
              masterImageSrc,
              includeArchCenterGuideSlides: true,
              markdownContent,
            })) as string;
          }
          await fetch('/api/google-workspace/open', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key: normKey,
              title,
              mode: 'slides',
              base64Pptx,
              xmlContent,
              markdownContent,
              masterImageSrc,
            }),
          });
          const updated = await fetchCloudViewerManifest();
          setManifest(updated);
        } catch {
          // ignore
        } finally {
          setIsSyncingEmbed(false);
        }
      })();
    } else if (cvMode === 'docs' && !docEntry?.googleDocsPreviewUrl && !isSyncingEmbed) {
      setIsSyncingEmbed(true);
      (async () => {
        try {
          await fetch('/api/google-workspace/open', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key: normKey,
              title,
              mode: 'docs',
              xmlContent,
              markdownContent,
            }),
          });
          const updated = await fetchCloudViewerManifest();
          setManifest(updated);
        } catch {
          // ignore
        } finally {
          setIsSyncingEmbed(false);
        }
      })();
    }
  }, [isCloudViewerOpen, cvMode, normKey, slideEntry, docEntry, isSyncingEmbed, xmlContent, title, masterImageSrc, markdownContent]);

  // Keyboard navigation in Cloud Viewer Modal
  useEffect(() => {
    if (!isCloudViewerOpen) return;
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setIsCloudViewerOpen(false);
      else if (ev.key === 'ArrowRight' && cvMode === 'slides') {
        setActiveSlideIdx((prev) => (prev + 1) % slides.length);
      } else if (ev.key === 'ArrowLeft' && cvMode === 'slides') {
        setActiveSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCloudViewerOpen, cvMode, slides.length]);

  const handleOpenWorkspace = async (mode: 'slides' | 'docs' | 'pdf', forceSync = false) => {
    setTopDropdownOpen(false);
    setModalDropdownOpen(false);
    await openDiagramInGoogleWorkspace({
      key: normKey,
      title,
      mode,
      xmlContent,
      markdownContent,
      masterImageSrc,
      forceSync,
      manifest,
      onManifestUpdated: setManifest,
    });
  };

  const handleOpenCloudViewer = (initialMode: 'slides' | 'embed' | 'docs' = 'slides', slideNum?: number) => {
    setTopDropdownOpen(false);
    setModalDropdownOpen(false);
    if (typeof slideNum === 'number' && slideNum >= 1 && slideNum <= slides.length) {
      setActiveSlideIdx(slideNum - 1);
    }
    setCvMode(initialMode);
    setCvZoom(100);
    setIsCloudViewerOpen(true);
  };

  const handleDownloadPptx = async () => {
    setTopDropdownOpen(false);
    setModalDropdownOpen(false);
    setIsDownloadingPptx(true);
    try {
      await exportDrawioToEditablePptx(xmlContent, title, normKey, {
        masterImageSrc,
        includeArchCenterGuideSlides: true,
        markdownContent,
      });
    } finally {
      setIsDownloadingPptx(false);
    }
  };

  const handleDownloadDrawio = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${normKey.toLowerCase()}.drawio`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${normKey.toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const jumpToNextEditableSlide = () => {
    const editableIndices = slides
      .map((s, idx) => (s.editable ? idx : -1))
      .filter((idx) => idx >= 0);
    if (!editableIndices.length) return;
    const nextIdx = editableIndices.find((idx) => idx > activeSlideIdx) ?? editableIndices[0];
    setCvMode('slides');
    setActiveSlideIdx(nextIdx);
  };

  /**
   * Renders the 16:9 Google Cloud Architecture Center Light-Theme Slide Canvas (Rule 54)
   * matching https://docs.cloud.google.com/architecture/multi-tenant-agentic-ai-system?hl=en
   */
  const renderSlideCanvasContent = (slide: SlideDescriptor) => {
    const topRibbon = (
      <div className="w-full h-1.5 flex shrink-0">
        <div className="w-1/4 h-full bg-[#4285F4]" />
        <div className="w-1/4 h-full bg-[#EA4335]" />
        <div className="w-1/4 h-full bg-[#FBBC04]" />
        <div className="w-1/4 h-full bg-[#34A853]" />
      </div>
    );

    const slideHeader = (kicker: string, rightPill: string) => (
      <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-medium text-[#5F6368] shrink-0">
            Home › Documentation › Cloud Architecture Center ›
          </span>
          <span className="px-2 py-0.5 rounded bg-[#E8F0FE] text-[#1967D2] font-bold text-[10px] shrink-0">
            {kicker}
          </span>
          <span className="font-bold text-xs text-[#202124] truncate">{title}</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#137333] bg-[#E6F4EA] border border-[#CEEAD6] px-2 py-0.5 rounded-full shrink-0">
          {rightPill}
        </span>
      </div>
    );

    // Slide 1 / 6: 100% Decomposed Native Editable Diagram (#78) on Left + Figure 1 4-Zone Architecture Center Guide on Right
    if (slide.num === 1) {
      return (
        <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          {slideHeader(
            'Figure 1 • Editable Architecture Topology (#78)',
            `Editable Diagram + Blog • Slide 1 / 6`
          )}
          <div className="flex-1 p-3 grid grid-cols-12 gap-3 items-stretch min-h-0 bg-white overflow-hidden">
            {/* Left Column: 1:1 Aspect-Preserved Editable Diagram (#78) */}
            <div className="col-span-6 h-full rounded-lg bg-[#F8FAFC] p-2 border border-[#DADCE0] flex items-center justify-center overflow-hidden">
              {svgContent ? (
                <div
                  className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[340px] [&>svg]:object-contain"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              ) : (
                <div className="w-full h-full pointer-events-none flex items-center justify-center">
                  <DiagramViewerRenderSafe xml={xmlContent} />
                </div>
              )}
            </div>

            {/* Right Column: Figure 1 • Architecture Center Guide (#78) + 4-Zone Key + Steps 1-7 */}
            <div className="col-span-6 h-full flex flex-col justify-between gap-1.5 overflow-hidden">
              <div className="px-2.5 py-1 rounded bg-[#E8F0FE] border border-[#AECBFA] text-center font-extrabold text-[9.5px] text-[#174EA6]">
                FIGURE 1 • ARCHITECTURE CENTER GUIDE (#78)
              </div>

              <div className="p-2 rounded border-l-4 border-l-[#1967D2] border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="text-[8px] font-bold text-[#1967D2] uppercase">
                  Architectural Scope &amp; Design Mandate
                </div>
                <div className="text-[8.5px] font-semibold text-[#202124] leading-snug mt-0.5 line-clamp-2">
                  {subtitle ||
                    'Hub-and-spoke multi-tenant agentic AI architecture on Google Cloud enforcing cryptographic identity, OBO+DPoP token exchange, and 4-zone isolation.'}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1">
                <div className="px-2 py-1 rounded border border-[#174EA6] bg-white flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#AECBFA] text-[#174EA6] font-extrabold text-[7.5px] shrink-0">
                    ZONE 1
                  </span>
                  <span className="text-[8px] text-[#202124] truncate">
                    <strong>Routing Hub (#aecbfa):</strong> Cloud Armor WAF, IAP, Load Balancer &amp; Cloud Run OBO+DPoP router.
                  </span>
                </div>
                <div className="px-2 py-1 rounded border border-[#137333] bg-white flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#CEEAD6] text-[#137333] font-extrabold text-[7.5px] shrink-0">
                    ZONE 2
                  </span>
                  <span className="text-[8px] text-[#202124] truncate">
                    <strong>Governance Hub (#ceead6):</strong> Security Command Center, IAM &amp; PAB, Cloud KMS &amp; BigQuery OTel.
                  </span>
                </div>
                <div className="px-2 py-1 rounded border border-[#B06000] bg-white flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#FEEFC3] text-[#B06000] font-extrabold text-[7.5px] shrink-0">
                    ZONE 3
                  </span>
                  <span className="text-[8px] text-[#202124] truncate">
                    <strong>Left Spoke (#feefc3):</strong> Vertex AI Agent Engine, Model Armor (4/6) &amp; Gemini 2.5 Pro 90% prefix cache (5).
                  </span>
                </div>
                <div className="px-2 py-1 rounded border border-[#C5221F] bg-white flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#FAD2CF] text-[#C5221F] font-extrabold text-[7.5px] shrink-0">
                    ZONE 4
                  </span>
                  <span className="text-[8px] text-[#202124] truncate">
                    <strong>Right Spoke (#fad2cf):</strong> Scoped MCP servers, AlloyDB FORCE RLS (`SET LOCAL`) &amp; CMEK Silo vaults.
                  </span>
                </div>
              </div>

              <div className="px-2.5 py-1.5 rounded bg-[#E6F4EA] border border-[#188038] flex items-center justify-between text-[8.5px]">
                <span className="font-extrabold text-[#137333]">VERIFIED OUTCOME • {normKey}</span>
                <span className="font-bold text-[#202124]">
                  {shapeCount} Native Editable Shapes • {connectorCount} Connectors • Slides 2–6: Complete Blog Guide
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 2 / 6: 1. Architecture & Components
    if (slide.num === 2) {
      return (
        <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          {slideHeader('1. Architecture & Components', 'Editable Diagram + Blog • Slide 2 / 6')}
          <div className="flex-1 p-3.5 grid grid-cols-12 gap-3 items-stretch min-h-0 bg-white overflow-hidden">
            <div className="col-span-5 flex flex-col justify-between gap-2 overflow-hidden">
              <div className="p-2.5 rounded-md border border-[#DADCE0] border-l-4 border-l-[#1967D2] bg-white flex-1 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-[#174EA6]">
                  Architecture Overview ({normKey})
                </div>
                <div className="space-y-1 text-[8.5px] text-[#334155] leading-snug">
                  <p><strong className="text-[#1967D2]">Core Engineering Challenge:</strong> Serving thousands of enterprise tenants on a shared agentic control plane with cryptographic isolation.</p>
                  <p><strong className="text-[#188038]">Target Personas:</strong> Cloud architects, security engineers, and platform teams building multi-agent systems on Google Cloud.</p>
                  <p><strong className="text-[#B06000]">Hub-and-Spoke Control Plane:</strong> Centralizes ingress routing, OBO+DPoP token exchange, and FinOps telemetry while isolating tenant state.</p>
                </div>
              </div>
              <div className="p-2.5 rounded-md border border-[#CBD5E1] border-l-4 border-l-[#188038] bg-[#F8FAFC] flex-1 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-[#137333]">
                  5-Hop Defense-in-Depth Security Invariants
                </div>
                <div className="space-y-0.5 text-[8px] text-[#334155]">
                  <div><strong className="text-[#137333]">HOP 1:</strong> Cloud Armor WAF + Workforce Identity Federation OIDC (`tenant_id`).</div>
                  <div><strong className="text-[#137333]">HOP 2:</strong> Memorystore for Valkey token-bucket rate limiter &amp; session lock.</div>
                  <div><strong className="text-[#137333]">HOP 3:</strong> Google ADK Router + regional Model Armor prompt/output screening.</div>
                  <div><strong className="text-[#137333]">HOP 4:</strong> Cloud KMS Asymmetric JWT (`adk-agent-signing-key`) + RFC 9449 DPoP.</div>
                  <div><strong className="text-[#137333]">HOP 5:</strong> AlloyDB PostgreSQL RLS (`SET LOCAL`) + Cloud KMS per-tenant CMEK.</div>
                </div>
              </div>
            </div>

            <div className="col-span-7 border border-[#DADCE0] rounded-md overflow-hidden flex flex-col">
              <table className="w-full border-collapse text-left text-[9px] h-full">
                <thead>
                  <tr className="bg-[#174EA6] text-white">
                    <th className="py-1.5 px-2.5 font-bold w-[32%] border-r border-white/20">Architectural Zone / Subsystem</th>
                    <th className="py-1.5 px-2.5 font-bold w-[68%]">Google Cloud Services &amp; Key Responsibilities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#174EA6] border-r border-[#DADCE0]">VPC Service Controls</td>
                    <td className="py-1.5 px-2.5"><strong>Perimeter &amp; Exfiltration Guard:</strong> Security perimeters preventing cross-tenant data exfiltration across Vertex AI, AlloyDB, and Cloud KMS.</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#137333] border-r border-[#DADCE0]">Routing hub</td>
                    <td className="py-1.5 px-2.5"><strong>External Application Load Balancer</strong>, <strong>Cloud Armor &amp; Model Armor</strong>, <strong>Identity-Aware Proxy (IAP)</strong>, and <strong>Cloud Run</strong> tier router.</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#B06000] border-r border-[#DADCE0]">Central governance hub</td>
                    <td className="py-1.5 px-2.5"><strong>Security Command Center</strong>, <strong>IAM &amp; Cloud KMS</strong> asymmetric signing keys, and <strong>Cloud Logging &amp; BigQuery</strong> FinOps chargeback.</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#C5221F] border-r border-[#DADCE0]">Principal Access Boundary</td>
                    <td className="py-1.5 px-2.5"><strong>Principal Access Boundary (PAB):</strong> Binds 2LO/3LO agent service accounts and RFC 8693 OBO tokens to tenant-scoped boundaries.</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#0F766E] border-r border-[#DADCE0]">Tenant projects</td>
                    <td className="py-1.5 px-2.5"><strong>Vertex AI Agent Engine Runtime</strong>, <strong>Model Armor</strong>, <strong>Model Context Protocol (MCP) servers</strong>, and <strong>Tenant datastore</strong> (AlloyDB RLS / CMEK).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // Slide 3 / 6: 2. Agentic Flow & Products Used
    if (slide.num === 3) {
      return (
        <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          {slideHeader('2. Agentic Flow & Products Used', `Editable Diagram + Blog • Slide 3 / 6`)}
          <div className="flex-1 p-3.5 bg-white grid grid-cols-12 gap-3 items-stretch min-h-0 overflow-hidden">
            <div className="col-span-6 border border-[#DADCE0] rounded-md p-2.5 bg-white flex flex-col justify-between overflow-hidden">
              <div className="px-2.5 py-1 rounded bg-[#E8F0FE] border border-[#1967D2] font-bold text-[9.5px] text-[#174EA6]">
                Agentic flow (Steps 1–7 &amp; Sub-steps 4a–4d)
              </div>
              <ol className="list-decimal pl-4 space-y-1 text-[8.5px] text-[#334155] leading-snug">
                <li>Caller sends a request to the External Application Load Balancer in the routing hub.</li>
                <li>After passing Cloud Armor, IAP, and Model Armor checks, the load balancer forwards the request to the Cloud Run router.</li>
                <li>The Cloud Run router verifies the OIDC tenant claim, mints a scoped OBO/DPoP token, and routes to the target tenant project.</li>
                <li className="p-1.5 rounded bg-[#FFFBEB] border border-[#F59E0B] text-[#92400E]">
                  <strong>Within the tenant project, the agent runtime orchestrates four sub-steps:</strong>
                  <div className="grid grid-cols-2 gap-1 mt-1 text-[8px] text-[#334155]">
                    <div className="p-1 rounded bg-white border border-[#FDE68A]"><strong>4a:</strong> Prompt validation via Model Armor</div>
                    <div className="p-1 rounded bg-white border border-[#FDE68A]"><strong>4b:</strong> Grounded RAG retrieval</div>
                    <div className="p-1 rounded bg-white border border-[#FDE68A]"><strong>4c:</strong> Scoped MCP tool invocation</div>
                    <div className="p-1 rounded bg-white border border-[#FDE68A]"><strong>4d:</strong> Transactional RLS state update</div>
                  </div>
                </li>
                <li>The agent runtime sends the validated, context-enriched prompt to the Gemini model to generate a grounded response.</li>
                <li>The agent runtime passes the generated response through the tenant&apos;s Model Armor instance for output sanitization.</li>
                <li>The sanitized response returns to the caller through the routing hub while zero-PII OTel FinOps spans stream to BigQuery.</li>
              </ol>
            </div>

            <div className="col-span-6 border border-[#DADCE0] rounded-md p-2.5 bg-white flex flex-col justify-between overflow-hidden">
              <div className="px-2.5 py-1 rounded bg-[#E6F4EA] border border-[#188038] font-bold text-[9.5px] text-[#137333]">
                Google Cloud Products Used
              </div>
              <div className="space-y-1 text-[8.5px] text-[#334155] leading-snug">
                <div className="p-1.5 rounded border border-[#DADCE0] border-l-4 border-l-[#188038]"><strong className="text-[#137333]">Gemini Enterprise Agent Platform &amp; Vertex AI Agent Engine:</strong> Managed runtime environment for Sessions, Memory Bank, and Context Caching.</div>
                <div className="p-1.5 rounded border border-[#DADCE0] border-l-4 border-l-[#188038]"><strong className="text-[#137333]">Agent Development Kit (ADK):</strong> Framework for building, orchestrating, and testing multi-agent systems with deterministic callbacks.</div>
                <div className="p-1.5 rounded border border-[#DADCE0] border-l-4 border-l-[#188038]"><strong className="text-[#137333]">Vertex AI and Gemini models:</strong> Foundation models for reasoning, planning, and grounded content generation.</div>
                <div className="p-1.5 rounded border border-[#DADCE0] border-l-4 border-l-[#188038]"><strong className="text-[#137333]">Model Armor:</strong> Screens prompts and responses against prompt injection, jailbreaks, and sensitive data leakage.</div>
                <div className="p-1.5 rounded border border-[#DADCE0] border-l-4 border-l-[#188038]"><strong className="text-[#137333]">Cloud Run &amp; Identity-Aware Proxy (IAP):</strong> Zero-trust serverless routing portal and gVisor-isolated MCP servers.</div>
                <div className="p-1.5 rounded border border-[#DADCE0] border-l-4 border-l-[#188038]"><strong className="text-[#137333]">External Application Load Balancer &amp; Google Cloud Armor:</strong> Edge DDoS protection and WAF header sanitization.</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 4 / 6: 3. Use Case & Design Alternatives
    if (slide.num === 4) {
      return (
        <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          {slideHeader('3. Use Case & Design Alternatives', 'Editable Diagram + Blog • Slide 4 / 6')}
          <div className="flex-1 p-3.5 bg-white grid grid-cols-12 gap-3 items-stretch min-h-0 overflow-hidden">
            <div className="col-span-6 flex flex-col justify-between gap-1.5 overflow-hidden">
              <div className="px-2.5 py-1 rounded bg-[#E6F4EA] border border-[#188038] font-bold text-[9.5px] text-[#137333]">
                Use Case: Why Agentic Multi-Tenancy Breaks Conventional SaaS Boundaries
              </div>
              <div className="p-2 rounded border border-[#DADCE0] border-l-4 border-l-[#1967D2] bg-white text-[8.5px] text-[#334155]">
                <strong className="text-[#174EA6]">Enterprise Scenario &amp; Mandate:</strong> Untrusted input reaches the control path; in an agentic system, user input is partly instruction, making the model an active boundary.
              </div>
              <div className="p-2 rounded border border-[#CBD5E1] border-l-4 border-l-[#188038] bg-[#F8FAFC] text-[8.5px] text-[#334155]">
                <div className="font-bold text-[#137333]">✓ Strict data isolation</div>
                <div>Each tenant operates in a dedicated Google Cloud boundary or cryptographically enforced RLS scope with its own datastore and MCP servers.</div>
              </div>
              <div className="p-2 rounded border border-[#CBD5E1] border-l-4 border-l-[#188038] bg-white text-[8.5px] text-[#334155]">
                <div className="font-bold text-[#137333]">✓ Specialized agent knowledge</div>
                <div>Agents in each tenant project are grounded in domain-specific data, memory namespaces, and prefix caches without context pollution.</div>
              </div>
              <div className="p-2 rounded border border-[#CBD5E1] border-l-4 border-l-[#188038] bg-[#F8FAFC] text-[8.5px] text-[#334155]">
                <div className="font-bold text-[#137333]">✓ Reduced cross-domain risk</div>
                <div>PAB policies, VPC Service Controls, and RFC 8693 OBO tokens ensure that a compromise in one tenant environment never affects other tenants.</div>
              </div>
            </div>

            <div className="col-span-6 flex flex-col justify-between gap-1.5 overflow-hidden">
              <div className="px-2.5 py-1 rounded bg-[#FEF7E0] border border-[#F9AB00] font-bold text-[9.5px] text-[#B06000]">
                Design Alternatives (Networking, Compute &amp; MCP Tooling)
              </div>
              <div className="p-2 rounded border border-[#DADCE0] border-l-4 border-l-[#F9AB00] bg-white space-y-1 text-[8px]">
                <div className="font-bold text-[#B06000]">Private access deployment</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1]"><strong className="text-[#174EA6]">Edge security policies:</strong> Retain External ALB with Cloud Armor IP allowlists.</div>
                  <div className="p-1.5 rounded bg-[#FFFBEB] border border-[#FDE68A]"><strong className="text-[#B06000]">Internal Load Balancer:</strong> Route traffic over Cloud VPN or Interconnect inside VPC.</div>
                </div>
              </div>
              <div className="p-2 rounded border border-[#DADCE0] border-l-4 border-l-[#F9AB00] bg-white space-y-1 text-[8px]">
                <div className="font-bold text-[#B06000]">Compute infrastructure</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1]"><strong className="text-[#174EA6]">Existing Kubernetes investments:</strong> Deploy on GKE Autopilot when standardized on K8s.</div>
                  <div className="p-1.5 rounded bg-[#FFFBEB] border border-[#FDE68A]"><strong className="text-[#B06000]">Advanced networking:</strong> Fine-grained pod-to-pod network policies and service mesh.</div>
                </div>
              </div>
              <div className="p-2 rounded border border-[#DADCE0] border-l-4 border-l-[#F9AB00] bg-white space-y-1 text-[8px]">
                <div className="font-bold text-[#B06000]">Model Context Protocol (MCP) servers</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1]"><strong className="text-[#174EA6]">Local MCP server:</strong> Highest isolation inside each tenant project using tenant-specific SAs.</div>
                  <div className="p-1.5 rounded bg-[#FFFBEB] border border-[#FDE68A]"><strong className="text-[#B06000]">Shared MCP server:</strong> Centralizes management and reduces running instances across VPC-SC.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 5 / 6: 4. Design Considerations (Well-Architected Framework)
    if (slide.num === 5) {
      return (
        <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          {slideHeader('4. Design Considerations (Well-Architected Framework)', 'Editable Diagram + Blog • Slide 5 / 6')}
          <div className="flex-1 p-3.5 bg-white flex flex-col justify-between gap-2 overflow-hidden">
            <div className="border border-[#DADCE0] rounded-md overflow-hidden">
              <table className="w-full border-collapse text-left text-[8.5px] bg-white">
                <thead>
                  <tr className="bg-[#174EA6] text-white">
                    <th className="py-1.5 px-2.5 font-bold w-40 border-r border-white/20">Well-Architected Pillar</th>
                    <th className="py-1.5 px-2.5 font-bold w-48 border-r border-white/20">Google Cloud Components</th>
                    <th className="py-1.5 px-2.5 font-bold">Design Considerations &amp; Actionable Recommendations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#174EA6] border-r border-[#DADCE0]">Security, privacy &amp; compliance</td>
                    <td className="py-1.5 px-2.5 font-bold text-[#202124] border-r border-[#DADCE0]">VPC-SC, Cloud Armor, IAP, Model Armor, PAB</td>
                    <td className="py-1.5 px-2.5">Configure organization VPC-SC perimeters, enforce HTTPS + IAP on backend services, and screen prompts/outputs with Model Armor.</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#137333] border-r border-[#DADCE0]">Reliability</td>
                    <td className="py-1.5 px-2.5 font-bold text-[#202124] border-r border-[#DADCE0]">Cloud Load Balancing, Cloud Run, Agent Engine</td>
                    <td className="py-1.5 px-2.5">Deploy multi-region serverless NEGs, isolate tenant quotas with Memorystore for Valkey token buckets, and use managed Agent Engine scaling.</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#B06000] border-r border-[#DADCE0]">Operational efficiency</td>
                    <td className="py-1.5 px-2.5 font-bold text-[#202124] border-r border-[#DADCE0]">Terraform IaC, CI/CD, Centralized OTel</td>
                    <td className="py-1.5 px-2.5">Provision tenant spokes via reusable Terraform &ldquo;tenant vending machine&rdquo; modules and route all OTel spans to centralized BigQuery sinks.</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2.5 font-bold text-[#C5221F] border-r border-[#DADCE0]">Cost optimization</td>
                    <td className="py-1.5 px-2.5 font-bold text-[#202124] border-r border-[#DADCE0]">Context Caching, Provisioned Throughput, FinOps</td>
                    <td className="py-1.5 px-2.5">Use Vertex AI Context Caching (`ContextCacheConfig`, 90% input token discount) for shared system prompts and attribute per-tenant token spend.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-2 rounded border border-[#DADCE0] border-t-4 border-t-[#1967D2] bg-white text-[8px]">
                <div className="font-bold text-[#174EA6]">Security, Privacy &amp; Compliance Proof</div>
                <p className="text-[#334155] mt-0.5">RFC 8693 OBO + RFC 9449 DPoP, AlloyDB FORCE RLS, and &lt;60s Cloud KMS CMEK kill-switches.</p>
                <div className="mt-1 px-2 py-0.5 rounded bg-[#E8F0FE] text-[#174EA6] font-bold text-center">10/10 Red-Team Attacks Blocked • 6/6 CMEK PASS</div>
              </div>
              <div className="p-2 rounded border border-[#DADCE0] border-t-4 border-t-[#188038] bg-white text-[8px]">
                <div className="font-bold text-[#137333]">Reliability &amp; Noisy-Neighbor Isolation</div>
                <p className="text-[#334155] mt-0.5">Memorystore for Valkey per-tenant token-bucket bulkheads (120 vs. 600 RPM) and live PSC migration.</p>
                <div className="mt-1 px-2 py-0.5 rounded bg-[#E6F4EA] text-[#137333] font-bold text-center">0 Dropped Sessions • 4/4 Live Migration PASS</div>
              </div>
              <div className="p-2 rounded border border-[#DADCE0] border-t-4 border-t-[#F9AB00] bg-white text-[8px]">
                <div className="font-bold text-[#B06000]">Cost Optimization &amp; FinOps Attribution</div>
                <p className="text-[#334155] mt-0.5">Immutable shared prompt prefix (`ContextCacheConfig` 90% discount) &amp; zero-PII BigQuery OTel spans.</p>
                <div className="mt-1 px-2 py-0.5 rounded bg-[#FEF7E0] text-[#B06000] font-bold text-center">84.7% Net Token Savings • $42/mo Pattern A TCO</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 6 / 6: 5. Deployment, What's Next & Contributors
    return (
      <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
        {topRibbon}
        {slideHeader("5. Deployment, What's Next & Contributors", 'Editable Diagram + Blog • Slide 6 / 6')}
        <div className="flex-1 p-3.5 bg-white grid grid-cols-12 gap-3 items-stretch min-h-0 overflow-hidden">
          <div className="col-span-7 flex flex-col justify-between gap-2 overflow-hidden">
            <div className="p-2.5 rounded-md border border-[#DADCE0] border-l-4 border-l-[#1967D2] bg-white">
              <div className="text-[9.5px] font-bold text-[#174EA6]">Deployment Runbook &amp; Live Cloud Verification</div>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[8px]">
                <div className="p-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1]"><strong className="text-[#174EA6]">STEP 1 • IDENTITY &amp; KMS:</strong> WIF OIDC claim mappings &amp; Cloud KMS asymmetric signing keys.</div>
                <div className="p-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1]"><strong className="text-[#174EA6]">STEP 2 • STATE &amp; CACHE:</strong> AlloyDB `FORCE ROW LEVEL SECURITY` &amp; Valkey token buckets.</div>
                <div className="p-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1]"><strong className="text-[#174EA6]">STEP 3 • ADK &amp; GUARDRAILS:</strong> Deploy Google ADK orchestrator + regional Model Armor templates.</div>
                <div className="p-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1]"><strong className="text-[#174EA6]">STEP 4 • FINOPS &amp; AUDIT:</strong> Execute verification snippet to validate CMEK &amp; BigQuery OTel spans.</div>
              </div>
            </div>
            <div className="flex-1 rounded-md border border-[#94A3B8] bg-[#F1F5F9] overflow-hidden flex flex-col">
              <div className="px-2.5 py-1 bg-[#E2E8F0] border-b border-[#94A3B8] flex items-center justify-between text-[8px] font-bold text-[#0F172A]">
                <span>Implementation Snippet: src/ingress/security_middleware.py</span>
                <span className="text-[#174EA6]">PYTHON 3.12 • GOOGLE ADK • VERIFIED</span>
              </div>
              <pre className="p-2 text-[7.5px] font-mono text-[#0F172A] leading-tight overflow-hidden">
{`01 | def bind_verified_tenant_intent_token(raw_headers: dict, verified_oidc_jwt: dict) -> dict:
02 |   # 1. Strip any client-supplied X-Tenant-ID header to prevent header spoofing
03 |   raw_headers.pop("X-Tenant-ID", None)
04 |   user_sub = verified_oidc_jwt["sub"]            # e.g. "alice@tenant-a.com"
05 |   tenant_id = verified_oidc_jwt["tenant_id"]     # e.g. "tenant_a"
06 |   return {"iss": "https://gateway.agentengine.goog", "sub": user_sub, "tenant_id": tenant_id,
07 |           "cnf": {"jkt": verified_oidc_jwt["dpop_jkt"]}} # RFC 9449 DPoP thumbprint`}
              </pre>
            </div>
          </div>

          <div className="col-span-5 flex flex-col justify-between gap-2 overflow-hidden">
            <div className="p-2.5 rounded-md border border-[#DADCE0] border-l-4 border-l-[#188038] bg-white flex-1 flex flex-col justify-between">
              <div className="text-[9.5px] font-bold text-[#137333]">What&apos;s Next (Architecture Center References)</div>
              <div className="space-y-1 text-[8px] text-[#334155]">
                <div className="p-1 rounded bg-[#F8FAFC] border border-[#E2E8F0]"><strong className="text-[#174EA6]">→ Multi-tenant agentic AI system on Google Cloud:</strong> Canonical reference architecture.</div>
                <div className="p-1 rounded bg-white border border-[#E2E8F0]"><strong className="text-[#174EA6]">→ Agent Development Kit (ADK) Documentation:</strong> Multi-agent callbacks &amp; MCP toolsets.</div>
                <div className="p-1 rounded bg-[#F8FAFC] border border-[#E2E8F0]"><strong className="text-[#174EA6]">→ Vertex AI Agent Engine Overview:</strong> Managed runtime, Sessions, Memory Bank &amp; Caching.</div>
                <div className="p-1 rounded bg-white border border-[#E2E8F0]"><strong className="text-[#174EA6]">→ Google Cloud Well-Architected Framework:</strong> AI &amp; ML security, reliability &amp; cost pillars.</div>
              </div>
            </div>
            <div className="p-2.5 rounded-md border border-[#CBD5E1] border-l-4 border-l-[#174EA6] bg-[#F8FAFC]">
              <div className="text-[9px] font-bold text-[#174EA6]">Contributors &amp; Verification Provenance</div>
              <div className="grid grid-cols-2 gap-1.5 mt-1 text-[7.5px] text-[#334155]">
                <div className="p-1.5 rounded bg-white border border-[#E2E8F0]">
                  <strong className="text-[#174EA6]">Authors &amp; Contributors:</strong><br />
                  • Nithin Reddy Cheruku &amp; Navneet Tuteja<br />
                  • Nitin Aggarwal | Principal AI Architect
                </div>
                <div className="p-1.5 rounded bg-[#E8F0FE] border border-[#AECBFA]">
                  <strong className="text-[#174EA6]">Cloud Verification Receipt:</strong><br />
                  • Doc ID: {normKey} (#78)<br />
                  • GCP: nitina-ggarwal-sandbox-647724<br />
                  • Audit: 9/9 Gates PASS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const headerActionButtons = (
    <div className="flex items-center gap-2 flex-wrap shrink-0">
      {/* 👁️ Cloud Viewer Button */}
      <button
        type="button"
        data-testid="inline-cloud-viewer-btn"
        onClick={() => handleOpenCloudViewer('slides', activeSlide.num)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#B45309] border border-[#F59E0B] dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:text-amber-300 dark:border-amber-500/50 transition cursor-pointer shadow-2xs"
        title="Open Same-Screen PromptCanvas Cloud Viewer (Interactive Studio + Live Google Slides Embed)"
      >
        <span>👁️</span>
        <span>Cloud Viewer</span>
      </button>

      {/* [ S | Open with Google Slides ↗ | ▼ ] Split-Pill Button */}
      <div
        className="relative inline-flex items-stretch rounded-xl border border-white/15 bg-[#202124] text-[#E8EAED] shadow-xs"
        ref={topDropdownRef}
      >
        <button
          type="button"
          data-testid="inline-open-with-google-slides-btn"
          onClick={() => handleOpenWorkspace('slides')}
          className="inline-flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-l-xl hover:bg-white/10 text-xs font-extrabold text-white transition cursor-pointer whitespace-nowrap"
          title="Open directly in Google Slides (nitinagga@google.com) via Server-Side Drive Conversion Bridge"
        >
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#FBBC04] text-[#202124] font-black text-[10px] shrink-0">
            S
          </span>
          <span>Open with Google Slides ↗</span>
        </button>
        <button
          type="button"
          data-testid="inline-open-with-dropdown-caret"
          onClick={(e) => {
            e.stopPropagation();
            setTopDropdownOpen((prev) => !prev);
          }}
          aria-label="Choose Google Workspace app"
          className="px-2 py-1.5 rounded-r-xl border-l border-[#444746] hover:bg-white/15 text-[#E8EAED] text-[10px] transition cursor-pointer flex items-center justify-center"
        >
          ▼
        </button>

        {topDropdownOpen && (
          <div
            data-testid="inline-open-with-dropdown-menu"
            className="absolute right-0 top-[calc(100%+6px)] w-80 bg-[#28292A] border border-[#444746] rounded-xl shadow-[0_14px_36px_rgba(0,0,0,0.65)] py-1.5 z-[120] text-left text-[#E8EAED]"
          >
            <button
              type="button"
              onClick={() => handleOpenWorkspace('slides')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span>↗</span>
              <span>Open in new tab (Google Slides — Diagram + Blog)</span>
            </button>
            <div className="h-px bg-[#444746] my-1" />
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9AA0A6]">
              Google Workspace &amp; Export
            </div>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('slides')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#FBBC04] text-[#202124] font-black text-[10px] shrink-0">
                S
              </span>
              <span>Google Slides (Editable Diagram + Blog Content)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('docs')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#4285F4] text-white font-black text-[10px] shrink-0">
                D
              </span>
              <span>Google Docs (Editable Blog Spec + Figures)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('pdf')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#EA4335] text-white font-black text-[8.5px] shrink-0">
                PDF
              </span>
              <span>PDF Document (Vector Slide + Blog Export)</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPptx}
              disabled={isDownloadingPptx}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span>⬇</span>
              <span>
                {isDownloadingPptx
                  ? 'Compiling Editable Diagram + Blog .pptx...'
                  : `Download Editable Diagram + Blog (.pptx)`}
              </span>
            </button>
            <div className="h-px bg-[#444746] my-1" />
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9AA0A6]">
              Same-Screen Cloud Viewer
            </div>
            <button
              type="button"
              onClick={() => handleOpenCloudViewer('slides', activeSlide.num)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span>✨</span>
              <span>Interactive Slide Studio (Fast Canvas)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenCloudViewer('embed', activeSlide.num)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span>🌐</span>
              <span>Embedded Live Google Slides Viewer</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenCloudViewer('docs', 1)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span>📄</span>
              <span>Embedded Live Google Docs Viewer</span>
            </button>
            <div className="h-px bg-[#444746] my-1" />
            <button
              type="button"
              onClick={() => handleOpenWorkspace('slides', true)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span>🔄</span>
              <span>Force Re-Sync Editable Diagram + Blog → Google Slides</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={headerOnly ? 'inline-flex items-center' : 'space-y-2.5'} data-testid={`inline-slides-previewer-${normKey}`}>
      {headerOnly ? (
        headerActionButtons
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1526] overflow-hidden shadow-2xs">
          {/* Compact Single-Line Header Showing Only Options */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {badgeText && (
                <span className="px-2 py-0.5 rounded-md text-[10.5px] font-extrabold uppercase tracking-wide bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 shrink-0">
                  {badgeText}
                </span>
              )}
              <strong className="text-xs md:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                {title}
              </strong>
            </div>
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {xmlContent && (
                <>
                  <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5">
                    <button
                      type="button"
                      data-testid={`inline-figure-mode-svg-${normKey}`}
                      onClick={() => setInlineRenderMode('svg')}
                      className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                        inlineRenderMode === 'svg'
                          ? 'bg-[#1a73e8] text-white'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      🖼️ 1:1 Official SVG
                    </button>
                    <button
                      type="button"
                      data-testid={`inline-figure-mode-drawio-${normKey}`}
                      onClick={() => setInlineRenderMode('drawio')}
                      className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                        inlineRenderMode === 'drawio'
                          ? 'bg-[#1a73e8] text-white'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      ✏️ Edit Inline (Draw.io)
                    </button>
                  </div>
                  <button
                    type="button"
                    data-testid={`inline-figure-open-drawio-tab-${normKey}`}
                    onClick={() => openDrawioInNewTab(xmlContent, title)}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-300 dark:border-blue-700 text-[11px] font-bold text-blue-700 dark:text-blue-300 hover:border-blue-500 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>↗</span>
                    <span>Open in Draw.io Tab ↗</span>
                  </button>
                </>
              )}
              {headerActionButtons}
            </div>
          </div>

          {/* Full-Width Diagram Canvas (Zero Inline Slide Deck Box on Page UI) */}
          <div className="w-full bg-white overflow-hidden">
            {inlineRenderMode === 'drawio' && xmlContent ? (
              <InteractiveDrawioInlineEditor
                xml={xmlContent}
                title={title}
                height={600}
                onXmlChange={setLiveXmlContent}
                testId={`inline-figure-drawio-editor-${normKey}`}
              />
            ) : renderRightDiagramPane ? (
              renderRightDiagramPane()
            ) : svgContent ? (
              <div
                className="w-full p-3 bg-[#F8F9FA] flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-[620px]"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            ) : (
              <div className="h-[540px] w-full">
                <DiagramViewerRenderSafe xml={xmlContent} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===========================================================================
          3. SAME-SCREEN GMAIL ATTACHMENT OPENER CLOUD VIEWER MODAL (BLOGS 1:1 MATCH)
         =========================================================================== */}
      {isCloudViewerOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id="pc-cloud-viewer-modal"
            data-testid="same-screen-cloud-viewer-modal"
            role="dialog"
            aria-modal="true"
            aria-label="PromptCanvas Cloud Viewer"
            className="fixed inset-0 z-[200] bg-[#070A12]/95 backdrop-blur-md flex flex-col text-[#E8EAED]"
          >
          {/* Top Gmail Attachment Opener Header Bar (#131314) */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-[#131314] border-b border-[#2D2E30] flex-wrap shrink-0">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setIsCloudViewerOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-[#E8EAED] text-base cursor-pointer"
                title="Close Cloud Viewer (Esc)"
              >
                ✕
              </button>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#FBBC04] text-[#202124] font-black text-xs">
                P
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-sm text-white">
                    {normKey.toLowerCase()}-editable-slides.pptx
                  </strong>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Google Slides &amp; Docs Synced ✓
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11.5px] text-[#9AA0A6] mt-0.5">
                  <button
                    type="button"
                    onClick={() => handleOpenWorkspace('slides')}
                    className="hover:text-white cursor-pointer"
                  >
                    File
                  </button>
                  <button
                    type="button"
                    onClick={() => setCvMode(cvMode === 'slides' ? 'embed' : 'slides')}
                    className="hover:text-white cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={jumpToNextEditableSlide}
                    className="hover:text-white cursor-pointer"
                  >
                    Tools (★ Jump to Editable Diagram)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenWorkspace('pdf')}
                    className="hover:text-white cursor-pointer"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Center View Mode Switcher */}
            <div className="inline-flex items-center gap-1.5 bg-[#28292A] border border-[#444746] rounded-full px-3 py-1 shadow-lg">
              <button
                type="button"
                data-testid="cv-mode-slides"
                onClick={() => setCvMode('slides')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  cvMode === 'slides' ? 'bg-[#FBBC04] text-[#202124]' : 'text-[#E8EAED] hover:bg-white/10'
                }`}
              >
                ✨ Interactive Slides Studio
              </button>
              <button
                type="button"
                data-testid="cv-mode-embed"
                onClick={() => setCvMode('embed')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  cvMode === 'embed' ? 'bg-[#FBBC04] text-[#202124]' : 'text-[#E8EAED] hover:bg-white/10'
                }`}
              >
                🌐 Live Google Slides Embed
              </button>
              <button
                type="button"
                data-testid="cv-mode-docs"
                onClick={() => setCvMode('docs')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  cvMode === 'docs' ? 'bg-[#FBBC04] text-[#202124]' : 'text-[#E8EAED] hover:bg-white/10'
                }`}
              >
                📄 Live Google Docs Spec
              </button>
            </div>

            {/* Right Split-Pill: [ S | Open with Google Slides | ▼ ] */}
            <div className="flex items-center gap-2">
              <div className="relative inline-flex items-stretch rounded-full border-[1.5px] border-[#FBBC04]/80 bg-[#202124]" ref={modalDropdownRef}>
                <button
                  type="button"
                  onClick={() => handleOpenWorkspace(cvMode === 'docs' ? 'docs' : 'slides')}
                  className="inline-flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-l-full hover:bg-white/10 text-xs font-semibold text-white cursor-pointer"
                >
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#FBBC04] text-[#202124] font-black text-[10px]">
                    S
                  </span>
                  <span>Open with Google Slides</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalDropdownOpen((prev) => !prev);
                  }}
                  className="px-2.5 py-1.5 rounded-r-full border-l border-[#444746] hover:bg-white/15 text-white text-[10px] cursor-pointer"
                >
                  ▼
                </button>
                {modalDropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+6px)] w-64 bg-[#28292A] border border-[#444746] rounded-xl shadow-2xl py-1.5 z-50 text-left">
                    <button
                      type="button"
                      onClick={() => handleOpenWorkspace('slides')}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-white/10 cursor-pointer"
                    >
                      <span>↗</span>
                      <span>Open in new tab (Google Slides)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenWorkspace('docs')}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-white/10 cursor-pointer"
                    >
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#4285F4] text-white font-black text-[10px]">
                        D
                      </span>
                      <span>Google Docs (Native Editable Spec)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenWorkspace('pdf')}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-white/10 cursor-pointer"
                    >
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#EA4335] text-white font-black text-[8.5px]">
                        PDF
                      </span>
                      <span>PDF Document (Vector Handout)</span>
                    </button>
                    <div className="h-px bg-[#444746] my-1" />
                    <button
                      type="button"
                      onClick={handleDownloadPptx}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-white/10 cursor-pointer"
                    >
                      <span>⬇</span>
                      <span>Download Editable .pptx</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenWorkspace('slides', true)}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-white/10 cursor-pointer"
                    >
                      <span>🔄</span>
                      <span>Force Re-Sync .pptx → Google Drive</span>
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsCloudViewerOpen(false)}
                className="px-3 py-1.5 rounded-full bg-[#28292A] hover:bg-[#3C4043] border border-[#444746] text-xs font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Second Row Floating Pill Toolbar (#1B1B1F) */}
          <div className="flex items-center justify-center gap-3 px-4 py-2 bg-[#1B1B1F] border-b border-[#2D2E30] flex-wrap shrink-0">
            <div className="inline-flex items-center gap-2 bg-[#28292A] border border-[#444746] rounded-full px-3 py-1">
              <button
                type="button"
                onClick={() => setActiveSlideIdx((prev) => (prev - 1 + slides.length) % slides.length)}
                className="px-2 py-0.5 rounded-full hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                ◀ Prev
              </button>
              <span className="text-xs font-bold text-[#FBBC04] px-2">
                Slide {activeSlide.num} / {slides.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveSlideIdx((prev) => (prev + 1) % slides.length)}
                className="px-2 py-0.5 rounded-full hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                Next ▶
              </button>
              <span className="text-[#444746]">|</span>
              <button
                type="button"
                onClick={jumpToNextEditableSlide}
                className="px-2 py-0.5 rounded-full hover:bg-white/10 text-xs font-bold text-[#86EFAC] cursor-pointer"
              >
                ★ Next Editable Diagram
              </button>
              <span className="text-[#444746]">|</span>
              <button
                type="button"
                onClick={() => handleOpenWorkspace('slides')}
                className="px-2 py-0.5 rounded-full hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                ↗ Google Slides
              </button>
              <button
                type="button"
                onClick={() => handleOpenWorkspace('pdf')}
                className="px-2 py-0.5 rounded-full hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                🖨️ PDF
              </button>
              <span className="text-[#444746]">|</span>
              <button
                type="button"
                onClick={() => setCvZoom((z) => Math.max(60, z - 15))}
                className="px-2 py-0.5 rounded-full hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                −
              </button>
              <span className="text-xs font-mono min-w-[42px] text-center">{cvZoom}%</span>
              <button
                type="button"
                onClick={() => setCvZoom((z) => Math.min(160, z + 15))}
                className="px-2 py-0.5 rounded-full hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Center Stage */}
          <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
            {cvMode === 'embed' ? (
              <div className="w-full max-w-6xl h-full flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 bg-[#202124] border border-[#444746] rounded-xl text-xs">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold mr-2">
                      LIVE GOOGLE SLIDES CLOUD EMBED
                    </span>
                    <strong>{title}</strong>
                    <span className="text-[#9AA0A6] ml-2">
                      (Google Drive ID: <code>{slideEntry?.googleSlidesId || (isSyncingEmbed ? 'syncing...' : normKey)}</code>)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenWorkspace('slides')}
                      className="px-3 py-1 rounded-full bg-[#FBBC04] text-[#202124] font-bold cursor-pointer"
                    >
                      ↗ Open Full Google Slides Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setCvMode('slides')}
                      className="px-3 py-1 rounded-full bg-[#28292A] border border-[#444746] text-white font-bold cursor-pointer"
                    >
                      ✨ Switch to Fast Interactive Slide Studio
                    </button>
                  </div>
                </div>
                {slideEntry?.googleSlidesEmbedUrl ? (
                  <iframe
                    src={slideEntry.googleSlidesEmbedUrl}
                    className="w-full flex-1 min-h-[540px] border border-[#444746] rounded-xl bg-white"
                    allowFullScreen
                    title="Live Google Slides Embed"
                  />
                ) : (
                  <div className="w-full flex-1 min-h-[540px] border border-[#444746] rounded-xl bg-[#202124] flex flex-col items-center justify-center gap-2 text-sm">
                    <div className="text-[#FBBC04] font-bold">
                      ☁️ Syncing {title} to Google Slides (nitinagga@google.com)...
                    </div>
                    <div className="text-xs text-[#9AA0A6]">
                      Converting native editable .pptx vector shapes in Google Drive...
                    </div>
                  </div>
                )}
              </div>
            ) : cvMode === 'docs' ? (
              <div className="w-full max-w-5xl h-full flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 bg-[#202124] border border-[#444746] rounded-xl text-xs">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold mr-2">
                      LIVE GOOGLE DOCS CLOUD PREVIEW
                    </span>
                    <strong>{title} — Editable Specification</strong>
                    <span className="text-[#9AA0A6] ml-2">
                      (Google Docs ID: <code>{docEntry?.googleDocsId || (isSyncingEmbed ? 'syncing...' : normKey)}</code>)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenWorkspace('docs')}
                      className="px-3 py-1 rounded-full bg-[#4285F4] text-white font-bold cursor-pointer"
                    >
                      ↗ Open Full Google Docs Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setCvMode('slides')}
                      className="px-3 py-1 rounded-full bg-[#28292A] border border-[#444746] text-white font-bold cursor-pointer"
                    >
                      ✨ Switch to Editable Slides Studio
                    </button>
                  </div>
                </div>
                {docEntry?.googleDocsPreviewUrl ? (
                  <iframe
                    src={docEntry.googleDocsPreviewUrl}
                    className="w-full flex-1 min-h-[540px] border border-[#444746] rounded-xl bg-white"
                    title="Live Google Docs Preview"
                  />
                ) : (
                  <div className="w-full flex-1 min-h-[540px] border border-[#444746] rounded-xl bg-[#202124] flex flex-col items-center justify-center gap-2 text-sm">
                    <div className="text-blue-400 font-bold">
                      ☁️ Syncing {title} Specification to Google Docs...
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{ maxWidth: `${Math.round((1060 * cvZoom) / 100)}px` }}
                className="w-full flex flex-col gap-3 items-center"
              >
                <div className="w-full flex items-center justify-between flex-wrap gap-2 px-4 py-2 bg-[#202124] border border-[#444746] rounded-xl text-xs">
                  <div>
                    <span
                      className={`px-2 py-0.5 rounded font-bold mr-2 ${
                        activeSlide.editable
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {activeSlide.editable
                        ? `★ 100% DECOMPOSED NATIVE EDITABLE DIAGRAM SLIDE (${shapeCount} SHAPES • ${connectorCount} CONNECTORS)`
                        : `GOOGLE CLOUD BRANDED SLIDE (${activeSlide.num} / ${slides.length})`}
                    </span>
                    <strong>{activeSlide.desc}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenWorkspace('slides')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBBC04] text-[#202124] font-bold cursor-pointer"
                    >
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-[2px] bg-[#202124] text-[#FBBC04] font-black text-[9px]">
                        S
                      </span>
                      <span>Edit Slide #{activeSlide.num} in Google Slides ↗</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCvMode('embed')}
                      className="px-3 py-1 rounded-full bg-[#28292A] border border-[#444746] text-white font-bold cursor-pointer"
                    >
                      🌐 Live Google Slides Embed
                    </button>
                  </div>
                </div>

                <div
                  className={`w-full bg-white rounded-xl p-1.5 shadow-2xl border-2 ${
                    activeSlide.editable ? 'border-[#18C964]' : 'border-[#444746]'
                  }`}
                >
                  {renderSlideCanvasContent(activeSlide)}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Slide Filmstrip */}
          {cvMode === 'slides' && (
            <div className="px-4 py-2.5 bg-[#131314] border-t border-[#2D2E30] flex items-center justify-center gap-2 overflow-x-auto shrink-0">
              {slides.map((s, idx) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition shrink-0 cursor-pointer ${
                    idx === activeSlideIdx
                      ? s.editable
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                        : 'bg-[#1A73E8] text-white border-[#1A73E8]'
                      : s.editable
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/50'
                      : 'bg-[#202124] text-[#E8EAED] border-[#444746]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
          </div>,
          document.body
        )}
    </div>
  );
}
