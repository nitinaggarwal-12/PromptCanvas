'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  cleanHtmlToPlainText,
  exportDrawioToEditablePptx,
  parseDrawioXmlForPptx,
  resolveOrSynthesizeDocGuideForDiagram,
} from '@/lib/export/editablePptxCompiler';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import cloudViewerManifestData from '@/data/cloud_viewer_manifest.json';

interface CloudSlidesEntryClient {
  key?: string;
  title?: string;
  googleSlidesId: string;
  googleSlidesEditUrl: string;
  googleSlidesPreviewUrl: string;
  googleSlidesEmbedUrl: string;
  googleSlidesPdfUrl: string;
}

interface CloudDocsEntryClient {
  key?: string;
  title?: string;
  googleDocsId: string;
  googleDocsEditUrl: string;
  googleDocsPreviewUrl: string;
  googleDocsPdfUrl: string;
}

interface CloudViewerManifestClient {
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

const STATIC_BLOG_AND_WS_KEYS = new Set([
  'DOC-MT-01',
  'DOC-MT-02',
  'DOC-MT-03',
  'DOC-MT-04',
  'DOC-MT-05',
  'DOC-MT-06',
  'DOC-REF-07',
  'DOC-REF-08',
  'DOC-REF-09',
  'WS1',
  'WS2',
  'WS3',
  'WS4',
  'WS5',
  'ALL',
]);

export function normalizeClientManifestKey(rawKey: string, titleHint?: string): string {
  const clean = String(rawKey || 'DOC-MT-01').trim();
  const titleClean = String(titleHint || '').trim();
  const combined = `${clean} ${titleClean}`;
  if (/nasa|multiverse|multi-universe|closed-loop\s+mission/i.test(combined)) {
    return 'DRAFT-NASA-MULTIVERSE-V1-0-1';
  }
  if (/oracle|exadata|e-business\s+suite|\bebs\b/i.test(combined)) {
    if (/#78|hub[- ]and[- ]spoke|arch_center_78|78-v1/i.test(combined)) {
      return 'DRAFT-ORACLE-EXADATA-EBS-78-V1-0-1';
    }
    return 'DRAFT-ORACLE-EXADATA-EBS-V1-0-1';
  }
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

  // If rawKey is an ephemeral session fork ID (fork_bp00_technical_sess_...) or #00/#01 with a custom title, derive a clean slug from titleHint
  if (/^(?:fork_bp|sess_|ver_|custom_sess)/i.test(clean) && titleClean) {
    const slug = titleClean
      .replace(/\s*—\s*Blueprint.*$/i, '')
      .replace(/\s*\(#?\d+\)\s*$/i, '')
      .replace(/[^A-Za-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .toUpperCase()
      .slice(0, 42);
    if (slug) {
      return `CUSTOM_${slug}`;
    }
  }

  // If rawKey is #00 / BP-00 or #01 / BP-01, verify that titleHint isn't a custom diagram title
  const numMatch = clean.match(/^#?(\d{1,2})$/);
  const bpMatch = clean.match(/^BP[-_]?(\d{1,2})$/i);
  const bpNum = numMatch ? numMatch[1].padStart(2, '0') : bpMatch ? bpMatch[1].padStart(2, '0') : null;
  if (bpNum) {
    if (
      (bpNum === '00' || bpNum === '01') &&
      titleClean &&
      !/2026\s+upgraded\s+gcp|official\s+google\s+cloud.*#00|^enterprise\s+architecture\s*—\s*blueprint/i.test(
        titleClean
      )
    ) {
      const slug = titleClean
        .replace(/\s*—\s*Blueprint.*$/i, '')
        .replace(/\s*\(#?\d+\)\s*$/i, '')
        .replace(/[^A-Za-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toUpperCase()
        .slice(0, 42);
      if (slug && slug !== 'BP_00' && slug !== 'BP_01') {
        return `CUSTOM_${slug}`;
      }
    }
    return `BP-${bpNum}`;
  }
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

interface InteractiveDrawioInlineEditorProps {
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
interface OpenDiagramWorkspaceParams {
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

  const normKey = normalizeClientManifestKey(params.key, params.title);
  const activeManifest = params.manifest || globalManifestCache;
  const sEntry = activeManifest.slides?.[normKey];
  const dEntry = activeManifest.docs?.[normKey];

  const isStaticPrewarmedKey = STATIC_BLOG_AND_WS_KEYS.has(normKey);
  const entryTitleMatches =
    !params.xmlContent ||
    isStaticPrewarmedKey ||
    (sEntry?.title &&
      params.title &&
      sEntry.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')
        .slice(0, 24) ===
        params.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '')
          .slice(0, 24));

  if (!params.forceSync && entryTitleMatches) {
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

interface DiagramFigureItem {
  id: string;
  label: string;
  xmlContent: string;
  svgContent?: string;
}

interface DiagramInlineSlidesPreviewerProps {
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
  compact = false,
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

  const normKey = useMemo(() => normalizeClientManifestKey(resolvedKeyInput, title), [resolvedKeyInput, title]);
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

  const isOfficial78Guide = useMemo(
    () =>
      STATIC_BLOG_AND_WS_KEYS.has(normKey) ||
      /^BP-78$/i.test(normKey) ||
      xmlContent.includes('arch_center_78') ||
      xmlContent.includes('hub_and_spoke_78'),
    [normKey, xmlContent]
  );

  const shapeCount = isOfficial78Guide
    ? Math.max(parsedGraph.vertices.length, 56)
    : Math.max(parsedGraph.vertices.length, 1);
  const connectorCount = isOfficial78Guide
    ? Math.max(parsedGraph.edges.length, 23)
    : Math.max(parsedGraph.edges.length, 1);

  const activeDocGuide = useMemo(
    () => resolveOrSynthesizeDocGuideForDiagram(xmlContent, title, normKey, markdownContent, normKey),
    [xmlContent, title, normKey, markdownContent]
  );

  const cleanFileSlug = useMemo(() => {
    const base = (activeDocGuide.title || title || normKey)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48);
    return base || normKey.toLowerCase();
  }, [activeDocGuide.title, title, normKey]);

  const slides: SlideDescriptor[] = useMemo(
    () => [
      {
        num: 1,
        label: '1. Overview & Architecture',
        editable: false,
        desc: `Slide 1 of 6 — 1:1 Cloud Architecture Center Document Reader Header, Overview & Architecture Introduction (${activeDocGuide.docId})`,
        kind: 'title',
      },
      {
        num: 2,
        label: '2. ★ Figure 1 (Editable Diagram)',
        editable: true,
        desc: `★ Slide 2 of 6 — Figure 1: 100% Native Editable Architecture Topology${isOfficial78Guide ? ' (#78)' : ''} (${shapeCount} Shapes • ${connectorCount} Connectors)`,
        kind: 'decomposed-split',
      },
      {
        num: 3,
        label: '3. Components & Agentic Flow',
        editable: false,
        desc: `Slide 3 of 6 — Architecture Component Table (Component | Description) & Numbered Agentic Flow (Steps 1–7 & 4a–4d)`,
        kind: 'tldr',
      },
      {
        num: 4,
        label: '4. Products Used & Use Case',
        editable: false,
        desc: `Slide 4 of 6 — Google Cloud Products Used Bulleted List & Enterprise Use Case / Key Benefits`,
        kind: 'master',
      },
      {
        num: 5,
        label: '5. Alternatives & Considerations',
        editable: false,
        desc: `Slide 5 of 6 — Design Alternatives & Google Cloud Well-Architected Design Considerations Table`,
        kind: 'decomposed-full',
      },
      {
        num: 6,
        label: '6. Deployment & Contributors',
        editable: false,
        desc: `Slide 6 of 6 — Deployment Runbook, What's Next & Contributors (Role/Team Labels Only)`,
        kind: 'spec-table',
      },
    ],
    [activeDocGuide.docId, isOfficial78Guide, shapeCount, connectorCount]
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
   * Renders the 16:9 1:1 Single-Column White DevSite <article> UI Slide Canvas (Rule 47 & Rule 54)
   * matching the visible center column of /blogs/[docId] (excluding left and right palettes).
   */
  const renderSlideCanvasContent = (slide: SlideDescriptor) => {
    const findSec = (slug: string, alt?: string) =>
      activeDocGuide.sections.find((s) => s.id === slug || (alt && s.id === alt));
    const archSec = findSec('architecture');
    const prodSec = findSec('products_used', 'products-used');
    const useCaseSec = findSec('use_case', 'use-case');
    const designAltSec = findSec('design_alternatives', 'design-alternatives');
    const designConsSec = findSec('design_considerations', 'design-considerations');
    const deploySec = findSec('deployment');
    const whatsNextSec = findSec('whats_next', 'whats-next');
    const contribSec = findSec('contributors');

    const articleMetadataHeader = (
      <div className="flex items-center justify-between gap-2 pb-1">
        <span className="text-[10px] font-medium text-[#5F6368]">
          Cloud Architecture Center › {activeDocGuide.partBadge}
        </span>
        <div className="flex items-center gap-2 text-[10px] text-[#5F6368]">
          <span className="px-1.5 py-0.5 rounded bg-[#F1F5F9] border border-[#CBD5E1] font-mono font-bold text-[#334155]">
            {activeDocGuide.docId}
          </span>
          <span>· {activeDocGuide.readTimeMinutes} min read · Last reviewed {activeDocGuide.lastVerifiedDate}</span>
        </div>
      </div>
    );

    // Slide 1 / 6: 1:1 Overview & Architecture Introduction (with Tier & Component Matrix for zero dead whitespace)
    if (slide.num === 1) {
      const compGroups = archSec?.componentGroupsTable || [];
      return (
        <div className="w-full aspect-video bg-[#F8FAFC] p-2.5 text-[#202124] flex flex-col overflow-hidden select-none">
          <div className="w-full h-full bg-white rounded-xl border border-[#DADCE0] px-6 py-4 flex flex-col justify-between overflow-hidden shadow-2xs">
            <div>
              {articleMetadataHeader}
              <h1 className="text-lg font-normal text-[#202124] leading-snug mt-1">
                {activeDocGuide.title}
              </h1>
              <div className="w-full h-px bg-[#DADCE0] my-2" />
              <div className="space-y-1.5 text-[9.5px] text-[#3C4043] leading-relaxed">
                {activeDocGuide.overviewParagraphs.slice(0, 3).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {compGroups.length > 0 && (
              <div className="my-1.5">
                <div className="grid grid-cols-3 gap-2">
                  {compGroups.slice(0, 3).map((grp, idx) => {
                    const accentColors = [
                      { border: 'border-[#2563EB]/30', bg: 'bg-[#EFF6FF]/60', header: 'text-[#1D4ED8]' },
                      { border: 'border-[#16A34A]/30', bg: 'bg-[#F0FDF4]/60', header: 'text-[#15803D]' },
                      { border: 'border-[#7C3AED]/30', bg: 'bg-[#FAF5FF]/60', header: 'text-[#6D28D9]' },
                    ][idx % 3];
                    return (
                      <div
                        key={idx}
                        className={`rounded-lg border ${accentColors.border} ${accentColors.bg} px-2.5 py-2 flex flex-col justify-between`}
                      >
                        <div className={`text-[9px] font-bold uppercase tracking-wide ${accentColors.header} truncate`}>
                          {grp.groupTitle}
                        </div>
                        <ul className="mt-1 space-y-0.5 text-[8.5px] text-[#3C4043] leading-tight">
                          {grp.items.slice(0, 5).map((it, j) => (
                            <li key={j} className="truncate">
                              <strong className="text-[#202124]">{it.name}:</strong> {it.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <div className="w-full h-px bg-[#DADCE0] my-2" />
              <h2 className="text-sm font-normal text-[#202124] mb-1">Architecture</h2>
              <div className="space-y-1 text-[9.5px] text-[#3C4043] leading-relaxed">
                {(archSec?.leadParagraphs || []).slice(0, 2).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 2 / 6: Figure 1 (100% Native Editable #78 Diagram inside clean DevSite <figure> frame)
    if (slide.num === 2) {
      return (
        <div className="w-full aspect-video bg-[#F8FAFC] p-2.5 text-[#202124] flex flex-col overflow-hidden select-none">
          <div className="w-full h-full bg-white rounded-xl border border-[#DADCE0] px-6 py-3 flex flex-col justify-between overflow-hidden shadow-2xs">
            {articleMetadataHeader}
            <div className="flex-1 my-1 rounded-lg border border-[#DADCE0] bg-white flex flex-col justify-between overflow-hidden">
              <div className="px-3 py-1.5 bg-[#F8FAFC] border-b border-[#DADCE0] flex items-center justify-between text-[10px]">
                <span className="font-semibold text-[#202124]">Figure 1: {activeDocGuide.title}</span>
                <span className="font-mono text-[9px] text-[#5F6368]">
                  {shapeCount} Native Editable Shapes · {connectorCount} Connectors
                </span>
              </div>
              <div className="flex-1 p-2 flex items-center justify-center overflow-hidden bg-white">
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
              <div className="px-3 py-1.5 bg-[#F8F9FA] border-t border-[#DADCE0] text-[9.5px] text-[#5F6368]">
                <strong className="text-[#202124]">Figure 1.</strong>{' '}
                {archSec?.inlineDiagram?.caption || activeDocGuide.subtitle}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 3 / 6: Architecture Components Table & Numbered Agentic Flow
    if (slide.num === 3) {
      const compGroups = archSec?.componentGroupsTable || [];
      const flowSteps = archSec?.agenticFlowSteps || [];
      return (
        <div className="w-full aspect-video bg-[#F8FAFC] p-2.5 text-[#202124] flex flex-col overflow-hidden select-none">
          <div className="w-full h-full bg-white rounded-xl border border-[#DADCE0] px-6 py-3.5 flex flex-col justify-between overflow-hidden shadow-2xs">
            <div>
              {articleMetadataHeader}
              <p className="text-[10px] text-[#3C4043] mb-1.5">
                The architecture consists of the following components:
              </p>
              <div className="border border-[#DADCE0] rounded overflow-hidden">
                <table className="w-full border-collapse text-left text-[8.5px]">
                  <thead>
                    <tr className="bg-[#F8F9FA] border-b border-[#DADCE0] text-[#202124]">
                      <th className="py-1 px-2.5 font-semibold w-[26%] border-r border-[#DADCE0]">Component</th>
                      <th className="py-1 px-2.5 font-semibold w-[74%]">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                    {compGroups.slice(0, 5).map((grp, i) => (
                      <tr key={i}>
                        <td className="py-1 px-2.5 font-semibold text-[#202124] border-r border-[#DADCE0] align-top">
                          {grp.groupTitle.replace(/\s*\([^)]*\)\s*$/g, '').trim()}
                        </td>
                        <td className="py-1 px-2.5 align-top leading-snug">
                          {grp.items.length > 0
                            ? grp.items.slice(0, 2).map((it) => `${it.name}: ${it.description}`).join(' • ')
                            : grp.groupLead}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="w-full h-px bg-[#DADCE0] my-2" />
              <h3 className="text-xs font-medium text-[#202124] mb-1">Agentic flow</h3>
              <ol className="list-decimal pl-4 space-y-0.5 text-[8.5px] text-[#3C4043] leading-snug">
                {flowSteps.slice(0, 7).map((st, idx) => (
                  <li key={idx}>
                    {st.step}
                    {st.subSteps && st.subSteps.length > 0 && (
                      <span className="text-[#5F6368]">
                        {' '}
                        ({st.subSteps.map((sub, sIdx) => `4${String.fromCharCode(97 + sIdx)}. ${sub}`).join('; ')})
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      );
    }

    // Slide 4 / 6: Products Used & Use Case
    if (slide.num === 4) {
      const products = prodSec?.productsUsedItems || [];
      const benefits = useCaseSec?.useCaseBenefits || [];
      return (
        <div className="w-full aspect-video bg-[#F8FAFC] p-2.5 text-[#202124] flex flex-col overflow-hidden select-none">
          <div className="w-full h-full bg-white rounded-xl border border-[#DADCE0] px-6 py-3.5 flex flex-col justify-between overflow-hidden shadow-2xs">
            <div>
              {articleMetadataHeader}
              <h2 className="text-sm font-normal text-[#202124] mt-0.5 mb-1">Products used</h2>
              <p className="text-[9.5px] text-[#3C4043] mb-1.5">
                This example architecture uses the following Google Cloud products and services:
              </p>
              <ul className="list-disc pl-4 space-y-0.5 text-[8.5px] text-[#3C4043] leading-snug">
                {products.slice(0, 6).map((prod, i) => (
                  <li key={i}>
                    <span className="font-medium text-[#1A73E8]">{prod.name}</span>: {prod.description}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="w-full h-px bg-[#DADCE0] my-2" />
              <h2 className="text-sm font-normal text-[#202124] mb-0.5">Use case</h2>
              {useCaseSec?.useCaseSubHeading && (
                <h3 className="text-[11px] font-medium text-[#202124] mb-1">{useCaseSec.useCaseSubHeading}</h3>
              )}
              <p className="text-[9px] text-[#3C4043] leading-snug mb-1.5">
                {(useCaseSec?.leadParagraphs || [])[0]}
              </p>
              <ul className="list-disc pl-4 space-y-0.5 text-[8.5px] text-[#3C4043] leading-snug">
                {benefits.slice(0, 3).map((b, i) => (
                  <li key={i}>
                    <strong className="text-[#202124]">{b.title}:</strong> {b.detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Slide 5 / 6: Design Alternatives & Design Considerations
    if (slide.num === 5) {
      const altSubs = designAltSec?.designAlternativesSubSections || [];
      const consSubs = designConsSec?.designConsiderationsSubSections || [];
      return (
        <div className="w-full aspect-video bg-[#F8FAFC] p-2.5 text-[#202124] flex flex-col overflow-hidden select-none">
          <div className="w-full h-full bg-white rounded-xl border border-[#DADCE0] px-6 py-3.5 flex flex-col justify-between overflow-hidden shadow-2xs">
            <div>
              {articleMetadataHeader}
              <h2 className="text-sm font-normal text-[#202124] mt-0.5 mb-1">Design alternatives</h2>
              <div className="space-y-1 text-[8.5px] text-[#3C4043] leading-snug">
                {altSubs.slice(0, 3).map((sub, i) => (
                  <div key={i}>
                    <strong className="text-[#202124]">{sub.heading}:</strong> {(sub.leadParagraphs || [])[0]}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="w-full h-px bg-[#DADCE0] my-2" />
              <h2 className="text-sm font-normal text-[#202124] mb-1">Design considerations</h2>
              <p className="text-[9px] text-[#3C4043] mb-1.5">
                {(designConsSec?.leadParagraphs || [])[0]}
              </p>
              <div className="border border-[#DADCE0] rounded overflow-hidden">
                <table className="w-full border-collapse text-left text-[8.5px]">
                  <thead>
                    <tr className="bg-[#F8F9FA] border-b border-[#DADCE0] text-[#202124]">
                      <th className="py-1 px-2.5 font-semibold w-[24%] border-r border-[#DADCE0]">Well-Architected pillar</th>
                      <th className="py-1 px-2.5 font-semibold w-[24%] border-r border-[#DADCE0]">Component</th>
                      <th className="py-1 px-2.5 font-semibold w-[52%]">Design considerations and recommendations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                    {consSubs.slice(0, 4).map((sub, i) => (
                      <tr key={i}>
                        <td className="py-1 px-2.5 font-semibold text-[#202124] border-r border-[#DADCE0] align-top">
                          {sub.heading}
                        </td>
                        <td className="py-1 px-2.5 text-[#202124] border-r border-[#DADCE0] align-top">
                          {sub.rows.map((r) => r.component).join(', ')}
                        </td>
                        <td className="py-1 px-2.5 align-top leading-snug">
                          {sub.rows
                            .slice(0, 2)
                            .map((r) => `${r.component}: ${r.recommendations[0] || ''}`)
                            .join(' ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 6 / 6: Deployment, What's Next & Contributors (Role/Team Labels Only)
    const snippet = deploySec?.codeSnippet;
    const nextLinks = whatsNextSec?.whatsNextLinks || [];
    const otherContribs = contribSec?.contributorsInfo?.otherContributors || [
      'Principal AI Architect & Field Deployment Engineering',
      'Google Cloud Architecture Center Engineering Team',
    ];
    return (
      <div className="w-full aspect-video bg-[#F8FAFC] p-2.5 text-[#202124] flex flex-col overflow-hidden select-none">
        <div className="w-full h-full bg-white rounded-xl border border-[#DADCE0] px-6 py-3.5 flex flex-col justify-between overflow-hidden shadow-2xs">
          <div>
            {articleMetadataHeader}
            <h2 className="text-sm font-normal text-[#202124] mt-0.5 mb-1">Deployment</h2>
            <p className="text-[9px] text-[#3C4043] mb-1.5">
              {(deploySec?.leadParagraphs || [])[0]}
            </p>
            {snippet && (
              <div className="rounded border border-[#DADCE0] bg-[#F8FAFC] overflow-hidden">
                <div className="px-2.5 py-1 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between text-[8px] font-mono font-semibold text-[#334155]">
                  <span>{snippet.filename}</span>
                  <span>{snippet.language.toUpperCase()}</span>
                </div>
                <pre className="p-2 text-[7.5px] font-mono text-[#202124] leading-tight overflow-hidden">
                  {snippet.code.split('\n').slice(0, 6).join('\n')}
                </pre>
              </div>
            )}
          </div>

          <div>
            <div className="w-full h-px bg-[#DADCE0] my-1.5" />
            <h2 className="text-sm font-normal text-[#202124] mb-1">What&apos;s next</h2>
            <ul className="list-disc pl-4 space-y-0.5 text-[8.5px] text-[#3C4043] leading-snug">
              {nextLinks.slice(0, 3).map((lnk, i) => (
                <li key={i}>
                  <span className="font-medium text-[#1A73E8]">{lnk.label}</span> — {lnk.description}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="w-full h-px bg-[#DADCE0] my-1.5" />
            <h2 className="text-sm font-normal text-[#202124] mb-1">Contributors</h2>
            <div className="space-y-0.5 text-[8.5px] text-[#3C4043]">
              <div>
                <strong className="text-[#202124]">Authors:</strong> {activeDocGuide.authors.join(' • ')}
              </div>
              <div>
                <strong className="text-[#202124]">Other contributors:</strong> {otherContribs.join(' • ')}
              </div>
              <div className="text-[8px] italic text-[#5F6368]">
                Last updated {contribSec?.contributorsInfo?.lastUpdatedDate || '2026-10-15 UTC'}.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const headerActionButtons = (
    <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
      {/* Cloud Viewer Button */}
      <button
        type="button"
        data-testid="inline-cloud-viewer-btn"
        onClick={() => handleOpenCloudViewer('slides', activeSlide.num)}
        className={`inline-flex items-center gap-1.5 rounded-lg font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 transition cursor-pointer shadow-2xs whitespace-nowrap ${
          compact ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1 text-xs'
        }`}
        title="Open Same-Screen PromptCanvas Cloud Viewer (Interactive Studio + Live Google Slides Embed)"
      >
        <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>Cloud Viewer</span>
      </button>

      {/* [ S | Google Slides ↗ | ▼ ] Split-Pill Button */}
      <div
        className="relative inline-flex items-stretch rounded-lg border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs"
        ref={topDropdownRef}
      >
        <button
          type="button"
          data-testid="inline-open-with-google-slides-btn"
          onClick={() => handleOpenWorkspace('slides')}
          className={`inline-flex items-center gap-1.5 rounded-l-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-slate-700 dark:text-slate-200 transition cursor-pointer whitespace-nowrap ${
            compact ? 'pl-2 pr-1.5 py-1 text-[11px]' : 'pl-2.5 pr-2 py-1 text-xs'
          }`}
          title="Open directly in Google Slides (nitinagga@google.com) via Server-Side Drive Conversion Bridge"
        >
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-[3px] bg-[#FBBC04] text-[#202124] font-black text-[9px] shrink-0">
            S
          </span>
          <span>{compact ? 'Slides ↗' : 'Open with Google Slides ↗'}</span>
        </button>
        <button
          type="button"
          data-testid="inline-open-with-dropdown-caret"
          onClick={(e) => {
            e.stopPropagation();
            setTopDropdownOpen((prev) => !prev);
          }}
          aria-label="Choose Google Workspace app"
          className="px-1.5 py-1 rounded-r-lg border-l border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-[9px] transition cursor-pointer flex items-center justify-center"
        >
          ▼
        </button>

        {topDropdownOpen && (
          <div
            data-testid="inline-open-with-dropdown-menu"
            className="absolute right-0 top-[calc(100%+6px)] w-72 bg-white dark:bg-[#28292A] border border-slate-200 dark:border-[#444746] rounded-xl shadow-xl py-1.5 z-[120] text-left text-slate-700 dark:text-[#E8EAED]"
          >
            <button
              type="button"
              onClick={() => handleOpenWorkspace('slides')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <span>↗</span>
              <span>Open in new tab (Google Slides — Diagram + Blog)</span>
            </button>
            <div className="h-px bg-slate-100 dark:bg-[#444746] my-1" />
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#9AA0A6]">
              Google Workspace &amp; Export
            </div>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('slides')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#FBBC04] text-[#202124] font-black text-[10px] shrink-0">
                S
              </span>
              <span>Google Slides (Editable Diagram + Blog Content)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('docs')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#4285F4] text-white font-black text-[10px] shrink-0">
                D
              </span>
              <span>Google Docs (Editable Blog Spec + Figures)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('pdf')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
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
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <span>⬇</span>
              <span>
                {isDownloadingPptx
                  ? 'Compiling Editable Diagram + Blog .pptx...'
                  : `Download Editable Diagram + Blog (.pptx)`}
              </span>
            </button>
            <div className="h-px bg-slate-100 dark:bg-[#444746] my-1" />
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#9AA0A6]">
              Same-Screen Cloud Viewer
            </div>
            <button
              type="button"
              onClick={() => handleOpenCloudViewer('slides', activeSlide.num)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <span>✨</span>
              <span>Interactive Slide Studio (Fast Canvas)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenCloudViewer('embed', activeSlide.num)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <span>🌐</span>
              <span>Embedded Live Google Slides Viewer</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenCloudViewer('docs', 1)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <span>📄</span>
              <span>Embedded Live Google Docs Viewer</span>
            </button>
            <div className="h-px bg-slate-100 dark:bg-[#444746] my-1" />
            <button
              type="button"
              onClick={() => handleOpenWorkspace('slides', true)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition cursor-pointer"
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
                    {cleanFileSlug}-editable-slides.pptx
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
