'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  cleanHtmlToPlainText,
  exportDrawioToEditablePptx,
  parseDrawioXmlForPptx,
} from '@/lib/export/editablePptxCompiler';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';

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
    WS1: {
      googleSlidesId: '1pQ_Hwxm704_Zhay_RR113gBv1IWmYS7JPH8C6FAtk1I',
      googleSlidesEditUrl:
        'https://docs.google.com/presentation/d/1pQ_Hwxm704_Zhay_RR113gBv1IWmYS7JPH8C6FAtk1I/edit?authuser=nitinagga%40google.com',
      googleSlidesPreviewUrl:
        'https://docs.google.com/presentation/d/1pQ_Hwxm704_Zhay_RR113gBv1IWmYS7JPH8C6FAtk1I/preview',
      googleSlidesEmbedUrl:
        'https://docs.google.com/presentation/d/1pQ_Hwxm704_Zhay_RR113gBv1IWmYS7JPH8C6FAtk1I/embed?start=false&loop=false&delayms=5000',
      googleSlidesPdfUrl:
        'https://docs.google.com/presentation/d/1pQ_Hwxm704_Zhay_RR113gBv1IWmYS7JPH8C6FAtk1I/export/pdf',
    },
    WS2: {
      googleSlidesId: '1PoDICHbjiO2MJzNY8gNgWoAmu_kciAbUPSBq2rg9s-8',
      googleSlidesEditUrl:
        'https://docs.google.com/presentation/d/1PoDICHbjiO2MJzNY8gNgWoAmu_kciAbUPSBq2rg9s-8/edit?authuser=nitinagga%40google.com',
      googleSlidesPreviewUrl:
        'https://docs.google.com/presentation/d/1PoDICHbjiO2MJzNY8gNgWoAmu_kciAbUPSBq2rg9s-8/preview',
      googleSlidesEmbedUrl:
        'https://docs.google.com/presentation/d/1PoDICHbjiO2MJzNY8gNgWoAmu_kciAbUPSBq2rg9s-8/embed?start=false&loop=false&delayms=5000',
      googleSlidesPdfUrl:
        'https://docs.google.com/presentation/d/1PoDICHbjiO2MJzNY8gNgWoAmu_kciAbUPSBq2rg9s-8/export/pdf',
    },
    WS3: {
      googleSlidesId: '1ir6PAaR-WiDC5eBguNwyNHvyAjOfomFoDJSfl9kv328',
      googleSlidesEditUrl:
        'https://docs.google.com/presentation/d/1ir6PAaR-WiDC5eBguNwyNHvyAjOfomFoDJSfl9kv328/edit?authuser=nitinagga%40google.com',
      googleSlidesPreviewUrl:
        'https://docs.google.com/presentation/d/1ir6PAaR-WiDC5eBguNwyNHvyAjOfomFoDJSfl9kv328/preview',
      googleSlidesEmbedUrl:
        'https://docs.google.com/presentation/d/1ir6PAaR-WiDC5eBguNwyNHvyAjOfomFoDJSfl9kv328/embed?start=false&loop=false&delayms=5000',
      googleSlidesPdfUrl:
        'https://docs.google.com/presentation/d/1ir6PAaR-WiDC5eBguNwyNHvyAjOfomFoDJSfl9kv328/export/pdf',
    },
    WS4: {
      googleSlidesId: '1SZEbXeCpFXGhnt3t0xEihAqzVURY2ItsLk2y2mfuKpc',
      googleSlidesEditUrl:
        'https://docs.google.com/presentation/d/1SZEbXeCpFXGhnt3t0xEihAqzVURY2ItsLk2y2mfuKpc/edit?authuser=nitinagga%40google.com',
      googleSlidesPreviewUrl:
        'https://docs.google.com/presentation/d/1SZEbXeCpFXGhnt3t0xEihAqzVURY2ItsLk2y2mfuKpc/preview',
      googleSlidesEmbedUrl:
        'https://docs.google.com/presentation/d/1SZEbXeCpFXGhnt3t0xEihAqzVURY2ItsLk2y2mfuKpc/embed?start=false&loop=false&delayms=5000',
      googleSlidesPdfUrl:
        'https://docs.google.com/presentation/d/1SZEbXeCpFXGhnt3t0xEihAqzVURY2ItsLk2y2mfuKpc/export/pdf',
    },
    WS5: {
      googleSlidesId: '1g61mXsIOrNITdCzXpaq6wKZ5sUayHcaQN-JHA1vBLzA',
      googleSlidesEditUrl:
        'https://docs.google.com/presentation/d/1g61mXsIOrNITdCzXpaq6wKZ5sUayHcaQN-JHA1vBLzA/edit?authuser=nitinagga%40google.com',
      googleSlidesPreviewUrl:
        'https://docs.google.com/presentation/d/1g61mXsIOrNITdCzXpaq6wKZ5sUayHcaQN-JHA1vBLzA/preview',
      googleSlidesEmbedUrl:
        'https://docs.google.com/presentation/d/1g61mXsIOrNITdCzXpaq6wKZ5sUayHcaQN-JHA1vBLzA/embed?start=false&loop=false&delayms=5000',
      googleSlidesPdfUrl:
        'https://docs.google.com/presentation/d/1g61mXsIOrNITdCzXpaq6wKZ5sUayHcaQN-JHA1vBLzA/export/pdf',
    },
    ALL: {
      googleSlidesId: '1zOhsBbJoSMqd4weCr8QRXhZbmbSmykjgGEe_Spqq_qs',
      googleSlidesEditUrl:
        'https://docs.google.com/presentation/d/1zOhsBbJoSMqd4weCr8QRXhZbmbSmykjgGEe_Spqq_qs/edit?authuser=nitinagga%40google.com',
      googleSlidesPreviewUrl:
        'https://docs.google.com/presentation/d/1zOhsBbJoSMqd4weCr8QRXhZbmbSmykjgGEe_Spqq_qs/preview',
      googleSlidesEmbedUrl:
        'https://docs.google.com/presentation/d/1zOhsBbJoSMqd4weCr8QRXhZbmbSmykjgGEe_Spqq_qs/embed?start=false&loop=false&delayms=5000',
      googleSlidesPdfUrl:
        'https://docs.google.com/presentation/d/1zOhsBbJoSMqd4weCr8QRXhZbmbSmykjgGEe_Spqq_qs/export/pdf',
    },
    'BP-78': {
      googleSlidesId: '1HHtPqFX33O7VvEj5N63MPoFQsdkxFgEed9U_-0LB_eg',
      googleSlidesEditUrl:
        'https://docs.google.com/presentation/d/1HHtPqFX33O7VvEj5N63MPoFQsdkxFgEed9U_-0LB_eg/edit?authuser=nitinagga%40google.com',
      googleSlidesPreviewUrl:
        'https://docs.google.com/presentation/d/1HHtPqFX33O7VvEj5N63MPoFQsdkxFgEed9U_-0LB_eg/preview',
      googleSlidesEmbedUrl:
        'https://docs.google.com/presentation/d/1HHtPqFX33O7VvEj5N63MPoFQsdkxFgEed9U_-0LB_eg/embed?start=false&loop=false&delayms=5000',
      googleSlidesPdfUrl:
        'https://docs.google.com/presentation/d/1HHtPqFX33O7VvEj5N63MPoFQsdkxFgEed9U_-0LB_eg/export/pdf',
    },
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
  },
  docs: {
    WS1: {
      googleDocsId: '1dX-aziY0-uceuh14g4Q_2XkJhVMrOXDbZFesY9N5aAM',
      googleDocsEditUrl:
        'https://docs.google.com/document/d/1dX-aziY0-uceuh14g4Q_2XkJhVMrOXDbZFesY9N5aAM/edit?authuser=nitinagga%40google.com',
      googleDocsPreviewUrl:
        'https://docs.google.com/document/d/1dX-aziY0-uceuh14g4Q_2XkJhVMrOXDbZFesY9N5aAM/preview',
      googleDocsPdfUrl:
        'https://docs.google.com/document/d/1dX-aziY0-uceuh14g4Q_2XkJhVMrOXDbZFesY9N5aAM/export?format=pdf',
    },
    WS2: {
      googleDocsId: '1zPghg5XB3B09bqNKVBxJGXQFrRBcOe6C1BV9p5oahgo',
      googleDocsEditUrl:
        'https://docs.google.com/document/d/1zPghg5XB3B09bqNKVBxJGXQFrRBcOe6C1BV9p5oahgo/edit?authuser=nitinagga%40google.com',
      googleDocsPreviewUrl:
        'https://docs.google.com/document/d/1zPghg5XB3B09bqNKVBxJGXQFrRBcOe6C1BV9p5oahgo/preview',
      googleDocsPdfUrl:
        'https://docs.google.com/document/d/1zPghg5XB3B09bqNKVBxJGXQFrRBcOe6C1BV9p5oahgo/export?format=pdf',
    },
    WS3: {
      googleDocsId: '1-20-MmeG3yeu7yvpAvXrgvGKT2Acggcv73jp8wAosPE',
      googleDocsEditUrl:
        'https://docs.google.com/document/d/1-20-MmeG3yeu7yvpAvXrgvGKT2Acggcv73jp8wAosPE/edit?authuser=nitinagga%40google.com',
      googleDocsPreviewUrl:
        'https://docs.google.com/document/d/1-20-MmeG3yeu7yvpAvXrgvGKT2Acggcv73jp8wAosPE/preview',
      googleDocsPdfUrl:
        'https://docs.google.com/document/d/1-20-MmeG3yeu7yvpAvXrgvGKT2Acggcv73jp8wAosPE/export?format=pdf',
    },
    WS4: {
      googleDocsId: '1kQeJM9gimaN-jpxiNHEK6FvMmFwpwmCyazlVyHcqtOM',
      googleDocsEditUrl:
        'https://docs.google.com/document/d/1kQeJM9gimaN-jpxiNHEK6FvMmFwpwmCyazlVyHcqtOM/edit?authuser=nitinagga%40google.com',
      googleDocsPreviewUrl:
        'https://docs.google.com/document/d/1kQeJM9gimaN-jpxiNHEK6FvMmFwpwmCyazlVyHcqtOM/preview',
      googleDocsPdfUrl:
        'https://docs.google.com/document/d/1kQeJM9gimaN-jpxiNHEK6FvMmFwpwmCyazlVyHcqtOM/export?format=pdf',
    },
    WS5: {
      googleDocsId: '1akS2yXPHvuhnhH_prjJ6uFk3P67U4e2YzaFZSnQ5thg',
      googleDocsEditUrl:
        'https://docs.google.com/document/d/1akS2yXPHvuhnhH_prjJ6uFk3P67U4e2YzaFZSnQ5thg/edit?authuser=nitinagga%40google.com',
      googleDocsPreviewUrl:
        'https://docs.google.com/document/d/1akS2yXPHvuhnhH_prjJ6uFk3P67U4e2YzaFZSnQ5thg/preview',
      googleDocsPdfUrl:
        'https://docs.google.com/document/d/1akS2yXPHvuhnhH_prjJ6uFk3P67U4e2YzaFZSnQ5thg/export?format=pdf',
    },
    ALL: {
      googleDocsId: '1MHSrKBrphRwgpyi-j5pqnrjiO-Ul5n12674-HAl3oDw',
      googleDocsEditUrl:
        'https://docs.google.com/document/d/1MHSrKBrphRwgpyi-j5pqnrjiO-Ul5n12674-HAl3oDw/edit?authuser=nitinagga%40google.com',
      googleDocsPreviewUrl:
        'https://docs.google.com/document/d/1MHSrKBrphRwgpyi-j5pqnrjiO-Ul5n12674-HAl3oDw/preview',
      googleDocsPdfUrl:
        'https://docs.google.com/document/d/1MHSrKBrphRwgpyi-j5pqnrjiO-Ul5n12674-HAl3oDw/export?format=pdf',
    },
  },
};

let globalManifestCache: CloudViewerManifestClient = FALLBACK_MANIFEST;

export function normalizeClientManifestKey(rawKey: string): string {
  const clean = String(rawKey || 'BP-78').trim();
  if (!clean) return 'BP-78';
  const upper = clean.toUpperCase();
  if (['WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'ALL'].includes(upper)) return upper;
  if (clean.toLowerCase() === 'uc-geap-ws1') return 'WS1';
  if (clean.toLowerCase() === 'uc-geap-ws2') return 'WS2';
  if (clean.toLowerCase() === 'uc-geap-ws3') return 'WS3';
  if (clean.toLowerCase() === 'uc-geap-ws4') return 'WS4';
  if (clean.toLowerCase() === 'uc-geap-ws5') return 'WS5';
  const numMatch = clean.match(/^#?(\d{1,2})$/);
  if (numMatch) return `BP-${numMatch[1].padStart(2, '0')}`;
  const bpMatch = clean.match(/^BP[-_]?(\d{1,2})$/i);
  if (bpMatch) return `BP-${bpMatch[1].padStart(2, '0')}`;
  return clean.replace(/[^A-Za-z0-9_-]/g, '_');
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
    diagramKey || manifestKey || (templateId ? `BP-${String(templateId).padStart(2, '0')}` : 'BP-78');
  const xmlContent = rawXmlContent ?? xml ?? '';
  const svgContent = rawSvgContent ?? svgString;
  const badgeText = rawBadgeText ?? badgeLabel;

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

  const shapeCount = Math.max(parsedGraph.vertices.length, 28);
  const connectorCount = Math.max(parsedGraph.edges.length, 14);

  const slides: SlideDescriptor[] = useMemo(
    () => [
      {
        num: 1,
        label: '1. Title',
        editable: false,
        desc: `Slide 1 of 6 — Executive Keynote Title & Architecture KPI Summary (${title})`,
        kind: 'title',
      },
      {
        num: 2,
        label: '2. Executive TL;DR',
        editable: false,
        desc: 'Slide 2 of 6 — Google Material 3 Bento Card Grid: Production Problem, Architecture Solution & Verified Outcomes',
        kind: 'tldr',
      },
      {
        num: 3,
        label: '3. Fig 1: Master',
        editable: false,
        desc: `Slide 3 of 6 — 1:1 Master High-Resolution Architecture Blueprint (${title})`,
        kind: 'master',
      },
      {
        num: 4,
        label: '4. ★ Fig 1 Editable',
        editable: true,
        desc: `★ Slide 4 of 6 — 100% Decomposed Native Editable Diagram + Talking-Points Sidebar (${shapeCount} Editable Shapes • ${connectorCount} Connectors)`,
        kind: 'decomposed-split',
      },
      {
        num: 5,
        label: '5. ★ Full Editable Vector',
        editable: true,
        desc: `★ Slide 5 of 6 — Full-Bleed 100% Decomposed Native Editable Vector Canvas (${shapeCount} Shapes • ${connectorCount} Orthogonal Connectors)`,
        kind: 'decomposed-full',
      },
      {
        num: 6,
        label: '6. Component Spec Table',
        editable: false,
        desc: `Slide 6 of 6 — Google Cloud Component Inventory & Technical Role Specification Matrix (${parsedGraph.namedVertices.length} Objects)`,
        kind: 'spec-table',
      },
    ],
    [title, shapeCount, connectorCount, parsedGraph.namedVertices.length]
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
   * Renders the 16:9 Google Cloud Next '26 Slide Canvas for any slide (1..6)
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
      <div className="px-4 py-2 bg-[#F8FAFC] border-b border-[#DADCE0] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded bg-[#E8F0FE] text-[#174EA6] font-extrabold text-[10px] uppercase tracking-wider shrink-0">
            {kicker}
          </span>
          <span className="font-extrabold text-xs text-[#202124] truncate">{title}</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#1E8E3E] bg-[#E6F4EA] border border-[#CEEAD6] px-2 py-0.5 rounded-full shrink-0">
          {rightPill}
        </span>
      </div>
    );

    if (slide.kind === 'title') {
      return (
        <div className="w-full aspect-video bg-[#0B1426] text-white flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          <div className="flex-1 p-5 md:p-6 grid grid-cols-12 gap-4 items-center min-h-0">
            <div className="col-span-7 flex flex-col justify-between h-full space-y-3">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-[10px] font-extrabold uppercase tracking-wider text-blue-300">
                  <span>GOOGLE CLOUD ARCHITECTURE DECK • {normKey}</span>
                </div>
                <h4 className="text-lg md:text-xl font-black text-white leading-tight line-clamp-2">
                  {title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {subtitle ||
                    '100% Native Editable Google Slides & PowerPoint Architecture Deck with Decomposed Vector Shapes, Connectors & Component Spec Matrix'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-[#132238] border border-[#233858]">
                  <div className="text-[10px] font-bold uppercase text-amber-400">Decomposed Vector Shapes</div>
                  <div className="text-sm font-black text-white mt-0.5">
                    {shapeCount} Editable Boxes &amp; Icons
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#132238] border border-[#233858]">
                  <div className="text-[10px] font-bold uppercase text-emerald-400">Orthogonal Connectors</div>
                  <div className="text-sm font-black text-white mt-0.5">
                    {connectorCount} Native Arrows
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-5 h-full flex flex-col justify-center">
              <div className="w-full h-full max-h-[210px] rounded-xl bg-white p-2 border-2 border-blue-400/50 shadow-lg overflow-hidden flex items-center justify-center">
                {svgContent ? (
                  <div
                    className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[190px] [&>svg]:object-contain"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : (
                  <div className="w-full h-full pointer-events-none">
                    <DiagramViewerRenderSafe xml={xmlContent} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-5 py-2 bg-[#080F1E] border-t border-[#233858] flex items-center justify-between text-[10px] text-slate-400">
            <span>PromptCanvas Enterprise • Google Cloud Next &apos;26 Branded Slide Deck</span>
            <span className="text-emerald-400 font-bold">Slide 1 / 6 • Click &ldquo;Edit in Slides&rdquo; to open in Google Slides</span>
          </div>
        </div>
      );
    }

    if (slide.kind === 'tldr') {
      const prob =
        tldrStructured?.problem ||
        `Traditional static cloud architectures for ${title} suffer from noisy-neighbor contention, unverified IAM boundaries, and brittle handoffs across distributed services.`;
      const sol =
        tldrStructured?.solution ||
        `Implements a zoned Google Cloud reference architecture (${normKey}) with ${shapeCount} decomposed components, cryptographic identity propagation, and automated telemetry guardrails.`;
      const out =
        tldrStructured?.outcome ||
        `Delivers deterministic security isolation, sub-second P95 orchestration latency, and 100% native editability across Google Slides, Google Docs, and Draw.io.`;

      return (
        <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          {slideHeader('EXECUTIVE TL;DR & BENTO GRID', 'Slide 2 / 6 • Material 3 Bento')}
          <div className="flex-1 p-4 grid grid-cols-3 gap-3 items-stretch min-h-0 bg-[#F8FAFC]">
            <div className="rounded-xl bg-white border border-[#FAD2CF] border-t-4 border-t-[#D93025] p-3 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="px-2 py-0.5 rounded bg-[#FCE8E6] text-[#C5221F] font-extrabold text-[10px] uppercase">
                  1. Production Problem
                </span>
                <p className="text-[11px] text-[#3C4043] mt-2 leading-relaxed line-clamp-5">{prob}</p>
              </div>
              <div className="text-[10px] font-bold text-[#D93025] pt-2 border-t border-slate-100">
                Zero-Trust Boundary Required
              </div>
            </div>

            <div className="rounded-xl bg-white border border-[#AECBFA] border-t-4 border-t-[#1A73E8] p-3 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="px-2 py-0.5 rounded bg-[#E8F0FE] text-[#174EA6] font-extrabold text-[10px] uppercase">
                  2. Architectural Solution
                </span>
                <p className="text-[11px] text-[#3C4043] mt-2 leading-relaxed line-clamp-5">{sol}</p>
              </div>
              <div className="text-[10px] font-bold text-[#1A73E8] pt-2 border-t border-slate-100">
                {shapeCount} Nodes • {connectorCount} Connectors
              </div>
            </div>

            <div className="rounded-xl bg-white border border-[#CEEAD6] border-t-4 border-t-[#1E8E3E] p-3 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="px-2 py-0.5 rounded bg-[#E6F4EA] text-[#0D652D] font-extrabold text-[10px] uppercase">
                  3. Verified Outcome
                </span>
                <p className="text-[11px] text-[#3C4043] mt-2 leading-relaxed line-clamp-5">{out}</p>
              </div>
              <div className="text-[10px] font-bold text-[#1E8E3E] pt-2 border-t border-slate-100">
                100% Google Slides &amp; Docs Synced ✓
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slide.kind === 'master') {
      return (
        <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          {slideHeader('1:1 MASTER ARCHITECTURE BLUEPRINT', `Slide 3 / 6 • High-Res Vector`)}
          <div className="flex-1 p-2.5 bg-[#F8FAFC] flex items-center justify-center min-h-0 overflow-hidden">
            {svgContent ? (
              <div
                className="w-full h-full flex items-center justify-center bg-white rounded-lg border border-[#DADCE0] p-2 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[260px] [&>svg]:object-contain"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            ) : (
              <div className="w-full h-full bg-white rounded-lg border border-[#DADCE0] overflow-hidden">
                <DiagramViewerRenderSafe xml={xmlContent} />
              </div>
            )}
          </div>
        </div>
      );
    }

    if (slide.kind === 'decomposed-split' || slide.kind === 'decomposed-full') {
      const sampleNodes = parsedGraph.namedVertices.slice(0, 12);
      const isSplit = slide.kind === 'decomposed-split';
      return (
        <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
          {topRibbon}
          {slideHeader(
            isSplit
              ? '★ 100% DECOMPOSED NATIVE EDITABLE VECTOR CANVAS + INSIGHTS'
              : '★ FULL-BLEED 100% DECOMPOSED NATIVE EDITABLE VECTOR SHAPES',
            `★ ${shapeCount} Editable Shapes • ${connectorCount} Connectors`
          )}
          <div className="flex-1 p-3 bg-[#F8FAFC] grid grid-cols-12 gap-3 min-h-0 overflow-hidden">
            <div
              className={`${
                isSplit ? 'col-span-8' : 'col-span-12'
              } bg-white rounded-xl border-2 border-dashed border-[#1E8E3E] p-2.5 flex flex-col justify-between overflow-hidden relative`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded bg-[#E6F4EA] text-[#0D652D] font-extrabold text-[9.5px]">
                  NATIVE POWERPOINT / GOOGLE SLIDES VECTOR SHAPES (EVERY BOX &amp; CONNECTOR CLICKABLE)
                </span>
                <span className="text-[9.5px] font-mono text-[#5F6368]">
                  {shapeCount} Shapes • {connectorCount} Connectors
                </span>
              </div>

              <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 gap-1.5 items-center overflow-hidden">
                {sampleNodes.map((item, idx) => (
                  <div
                    key={item.cell.id || idx}
                    className="p-1.5 rounded-lg border border-[#AECBFA] bg-[#F8FAFC] hover:border-[#1A73E8] transition flex flex-col justify-between h-full max-h-[68px] overflow-hidden"
                  >
                    <div className="flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#1A73E8] text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-extrabold text-[9.5px] text-[#202124] truncate">
                        {item.text.title}
                      </span>
                    </div>
                    <div className="text-[8.5px] text-[#5F6368] line-clamp-2 leading-tight mt-0.5">
                      {item.text.subtitle || 'Editable Google Slides Shape'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isSplit && (
              <div className="col-span-4 flex flex-col justify-between gap-2 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-[#E8F0FE] border border-[#AECBFA] flex-1 flex flex-col justify-center">
                  <div className="text-[10px] font-extrabold uppercase text-[#174EA6]">
                    1. Native Shape Decomposition
                  </div>
                  <p className="text-[10px] text-[#202124] mt-1 leading-snug">
                    Every Draw.io <code>&lt;mxCell&gt;</code> container, service card, badge, and arrow compiles into native Google Slides vector geometry.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#E6F4EA] border border-[#CEEAD6] flex-1 flex flex-col justify-center">
                  <div className="text-[10px] font-extrabold uppercase text-[#0D652D]">
                    2. Orthogonal Connector Routing
                  </div>
                  <p className="text-[10px] text-[#202124] mt-1 leading-snug">
                    All {connectorCount} connectors preserve 90-degree orthogonal waypoints and directional arrowheads.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FEF7E0] border border-[#FDE293] flex-1 flex flex-col justify-center">
                  <div className="text-[10px] font-extrabold uppercase text-[#B06000]">
                    3. 1-Click Google Slides Sync
                  </div>
                  <p className="text-[10px] text-[#202124] mt-1 leading-snug">
                    Click <strong>Edit in Slides ↗</strong> to open this deck directly in Google Slides.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Slide 6: Spec Table
    const tableRows = parsedGraph.namedVertices.slice(0, 6);
    return (
      <div className="w-full aspect-video bg-white text-[#202124] flex flex-col justify-between overflow-hidden select-none">
        {topRibbon}
        {slideHeader('COMPONENT & ROLE SPECIFICATION MATRIX', `Slide 6 / 6 • ${parsedGraph.namedVertices.length} Components`)}
        <div className="flex-1 p-3 bg-[#F8FAFC] overflow-hidden">
          <table className="w-full border-collapse text-left text-[10px] bg-white rounded-lg overflow-hidden border border-[#DADCE0]">
            <thead>
              <tr className="bg-[#174EA6] text-white">
                <th className="py-1.5 px-2.5 font-bold w-16">ID</th>
                <th className="py-1.5 px-2.5 font-bold w-48">Component Name</th>
                <th className="py-1.5 px-2.5 font-bold">Architectural Role &amp; Technical Specification</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((item, idx) => (
                <tr key={item.cell.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="py-1.5 px-2.5 border-t border-[#DADCE0] font-mono font-bold text-[#174EA6]">
                    OBJ-{String(idx + 1).padStart(2, '0')}
                  </td>
                  <td className="py-1.5 px-2.5 border-t border-[#DADCE0] font-bold text-[#202124] truncate max-w-[180px]">
                    {item.text.title}
                  </td>
                  <td className="py-1.5 px-2.5 border-t border-[#DADCE0] text-[#3C4043] truncate max-w-[360px]">
                    {item.text.subtitle || 'Core Enterprise Google Cloud Architecture Node'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            className="absolute right-0 top-[calc(100%+6px)] w-72 bg-[#28292A] border border-[#444746] rounded-xl shadow-[0_14px_36px_rgba(0,0,0,0.65)] py-1.5 z-[120] text-left text-[#E8EAED]"
          >
            <button
              type="button"
              onClick={() => handleOpenWorkspace('slides')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span>↗</span>
              <span>Open in new tab (Google Slides)</span>
            </button>
            <div className="h-px bg-[#444746] my-1" />
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9AA0A6]">
              Google apps
            </div>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('slides')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#FBBC04] text-[#202124] font-black text-[10px] shrink-0">
                S
              </span>
              <span>Google Slides (100% Editable Deck)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('docs')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#4285F4] text-white font-black text-[10px] shrink-0">
                D
              </span>
              <span>Google Docs (Editable Spec + Figures)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenWorkspace('pdf')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#EA4335] text-white font-black text-[8.5px] shrink-0">
                PDF
              </span>
              <span>PDF Document (Vector Slide Export)</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPptx}
              disabled={isDownloadingPptx}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium hover:bg-white/10 transition cursor-pointer"
            >
              <span>⬇</span>
              <span>{isDownloadingPptx ? 'Compiling .pptx...' : `Download .pptx (${normKey})`}</span>
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
              <span>Force Re-Sync .pptx → Google Slides</span>
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
            {headerActionButtons}
          </div>

          {/* Full-Width Diagram Canvas (Zero Inline Slide Deck Box on Page UI) */}
          <div className="w-full bg-white overflow-hidden">
            {renderRightDiagramPane ? (
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
      {isCloudViewerOpen && (
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
        </div>
      )}
    </div>
  );
}
