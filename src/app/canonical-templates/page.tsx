'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Clipboard,
  Download,
  ExternalLink,
  FileCode2,
  ImageIcon,
  Maximize2,
  Minimize2,
  RefreshCw,
  ScanSearch,
  Sparkles,
  Edit3,
  Eye,
  ZoomIn,
  ZoomOut,
  Layers,
  Sliders,
  Share2,
} from 'lucide-react';
import { generateTemplate01ExactV3Xml } from '@/lib/canonical/template01ExactV3';

const DRAWIO_EMBED_URL =
  'https://embed.diagrams.net/?embed=1&proto=json&spin=1&ui=kennedy&libraries=1&saveAndExit=0&noSaveBtn=0';

const DRAWIO_VIEWER_URL =
  'https://viewer.diagrams.net/?highlight=none&nav=1&layers=1&edit=_blank&border=10';

const SOURCE_IMAGE_URL =
  'https://raw.githubusercontent.com/nitinaggarwal-12/PromptCanvas/main/images/01.png';

export default function CanonicalTemplatesPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const viewerIframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const canonicalXml = useMemo(() => generateTemplate01ExactV3Xml(), []);
  const [xml, setXml] = useState(canonicalXml);
  const [viewMode, setViewMode] = useState<'svg' | 'edit'>('svg');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copied, setCopied] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [exportedPreview, setExportedPreview] = useState<string>('');
  const [overlayOpacity, setOverlayOpacity] = useState(50);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showQaSection, setShowQaSection] = useState(false);

  const postToEditor = (payload: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(payload), '*');
  };

  const loadXmlIntoEditor = (nextXml: string) => {
    postToEditor({
      action: 'load',
      xml: nextXml,
      autosave: 1,
      title: '01 - System Context Diagram - NovaCura',
    });
  };

  const requestPreview = () => {
    postToEditor({
      action: 'export',
      format: 'svg',
      xml,
      spinKey: 'canonical-01-export',
      border: 0,
      scale: 2,
    });
  };

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;

      let message: { event?: string; xml?: string; data?: string };
      try {
        message = JSON.parse(event.data);
      } catch {
        return;
      }

      if (message.event === 'init') {
        setEditorReady(true);
        loadXmlIntoEditor(xml);
        // Automatically request HD SVG export for instant vector viewing
        postToEditor({
          action: 'export',
          format: 'svg',
          xml,
          spinKey: 'canonical-01-export',
          border: 0,
          scale: 2,
        });
      }

      if ((message.event === 'save' || message.event === 'autosave' || message.event === 'exit') && message.xml) {
        setXml(message.xml);
      }

      if (message.event === 'export' && message.data) {
        setExportedPreview(message.data);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [xml]);

  // Handle ESC key for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const resetReplica = () => {
    setXml(canonicalXml);
    setExportedPreview('');
    loadXmlIntoEditor(canonicalXml);
  };

  const copyXml = async () => {
    await navigator.clipboard.writeText(xml);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadXml = () => {
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '01-system-context-novacura-canonical.drawio.xml';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const downloadSvg = () => {
    if (!exportedPreview) {
      requestPreview();
      return;
    }
    const anchor = document.createElement('a');
    anchor.href = exportedPreview;
    anchor.download = '01-system-context-novacura-canonical-hd.svg';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const openInNewTab = () => {
    // Opens diagrams.net editor directly in a new tab with the diagram XML pre-loaded via #R hash
    const encodedXml = encodeURIComponent(xml);
    window.open(`https://app.diagrams.net/#R${encodedXml}`, '_blank');
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-950 font-sans ${isFullscreen ? 'overflow-hidden' : ''}`}>
      {/* Hidden background editor worker for live SVG generation */}
      <div className="hidden">
        <iframe
          ref={iframeRef}
          title="Background Draw.io Worker"
          src={DRAWIO_EMBED_URL}
          allow="clipboard-read; clipboard-write"
        />
      </div>

      {/* TOP HEADER NAVIGATION (Hidden in Fullscreen mode) */}
      {!isFullscreen && (
        <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1900px] items-center justify-between gap-4 px-5 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href="/"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
                aria-label="Back to PromptCanvas"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-600" />
                  <h1 className="truncate text-lg font-black tracking-tight text-slate-900">Canonical Architecture Templates</h1>
                  <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-sky-700">
                    Template 01 · HD Vector SVG
                  </span>
                </div>
                <p className="truncate text-xs text-slate-500">
                  01 · System Context Diagram · Super Fine 1536×1024 Vector Definition · NovaCura Bio-Pharma Platform
                </p>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              {viewMode === 'edit' ? (
                <button
                  onClick={() => setViewMode('svg')}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-xs font-bold text-sky-700 shadow-sm transition hover:bg-sky-100"
                >
                  <Eye className="h-4 w-4" /> View HD SVG
                </button>
              ) : (
                <button
                  onClick={() => setViewMode('edit')}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-100"
                  title="Enable interactive editing controls inline"
                >
                  <Edit3 className="h-4 w-4" /> Edit Inline
                </button>
              )}

              <button
                onClick={openInNewTab}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-indigo-600"
                title="Open diagram in diagrams.net in a new browser tab"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Edit on a New Tab
              </button>

              <button
                onClick={() => setIsFullscreen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                title="View in Fullscreen Mode"
              >
                <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
              </button>

              <button
                onClick={copyXml}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Clipboard className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy XML'}
              </button>

              <button
                onClick={downloadSvg}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                title="Download pristine high-definition SVG vector"
              >
                <Download className="h-3.5 w-3.5" /> Download SVG
              </button>

              <button
                onClick={downloadXml}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-black text-white shadow-sm transition hover:bg-slate-800"
              >
                <Download className="h-3.5 w-3.5" /> Download XML
              </button>
            </div>
          </div>
        </header>
      )}

      {/* MAIN CONTENT AREA */}
      <main className={isFullscreen ? 'fixed inset-0 z-50 bg-[#0B111E] flex flex-col' : 'mx-auto max-w-[1900px] px-5 py-6 lg:px-8'}>
        {/* FULLSCREEN / HERO VIEWER CONTAINER */}
        <div
          ref={containerRef}
          className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
            isFullscreen
              ? 'h-full w-full rounded-none border-none bg-[#0B111E]'
              : 'border-slate-200 bg-white shadow-lg shadow-slate-200/50'
          }`}
        >
          {/* FLOATING ACTION & VIEWPORT CONTROLS BAR */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3 ${
            isFullscreen ? 'border-slate-800 bg-[#0F172A]/90 text-white backdrop-blur' : 'border-slate-100 bg-slate-50/80 text-slate-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${viewMode === 'edit' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                <span className="text-xs font-black tracking-wide uppercase">
                  {viewMode === 'edit' ? 'Interactive Draw.io Editor' : 'Super Fine High Definition SVG'}
                </span>
              </div>
              <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                isFullscreen ? 'bg-slate-800 text-slate-300' : 'bg-slate-200/70 text-slate-600'
              }`}>
                1536 × 1024 native
              </span>
            </div>

            {/* Center: Zoom Controls for SVG View */}
            {viewMode === 'svg' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(50, prev - 15))}
                  className={`rounded-lg p-1.5 transition ${
                    isFullscreen ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-200 text-slate-600'
                  }`}
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="min-w-[45px] text-center font-mono text-xs font-bold">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(250, prev + 15))}
                  className={`rounded-lg p-1.5 transition ${
                    isFullscreen ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-200 text-slate-600'
                  }`}
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(100)}
                  className={`rounded-md px-2 py-1 text-[11px] font-bold transition ${
                    isFullscreen ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                  }`}
                  title="Reset Zoom to 100%"
                >
                  Reset
                </button>
              </div>
            )}

            {/* Right: Mode Toggle Buttons */}
            <div className="flex items-center gap-2">
              {viewMode === 'svg' ? (
                <button
                  onClick={() => setViewMode('edit')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Edit Inline
                </button>
              ) : (
                <button
                  onClick={() => setViewMode('svg')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" /> View HD SVG
                </button>
              )}

              <button
                onClick={openInNewTab}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  isFullscreen
                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                }`}
              >
                <ExternalLink className="h-3.5 w-3.5" /> Edit in New Tab
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`inline-flex items-center gap-1.5 rounded-lg border p-1.5 transition cursor-pointer ${
                  isFullscreen
                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                }`}
                title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen Mode'}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* VIEWPORT CONTENT */}
          <div className={`relative flex-1 overflow-auto flex items-center justify-center p-4 ${
            isFullscreen ? 'bg-[#060A12]' : 'bg-slate-100/60 min-h-[780px]'
          }`}>
            {viewMode === 'svg' ? (
              /* SUPER FINE HIGH-DEFINITION SVG VECTOR VIEWER */
              <div className="flex w-full h-full items-center justify-center overflow-auto p-2">
                {exportedPreview ? (
                  <div
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.15s ease-out',
                    }}
                    className="max-w-full max-h-full flex items-center justify-center drop-shadow-2xl rounded-xl bg-white p-3 border border-slate-200/80"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={exportedPreview}
                      alt="Super Fine High Definition SVG Architecture Diagram"
                      className="h-auto w-full max-w-[1536px] object-contain select-none"
                    />
                  </div>
                ) : (
                  /* Fallback clean diagrams.net vector viewer iframe while SVG exports */
                  <div
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.15s ease-out',
                    }}
                    className="w-full h-[780px] max-w-[1536px] rounded-xl bg-white shadow-xl overflow-hidden"
                  >
                    <iframe
                      ref={viewerIframeRef}
                      title="Canonical Template 01 Vector SVG Viewer"
                      src={`${DRAWIO_VIEWER_URL}#R${encodeURIComponent(xml)}`}
                      className="h-full w-full bg-white border-0"
                    />
                  </div>
                )}
              </div>
            ) : (
              /* INTERACTIVE DRAW.IO EDITOR (Shown only when 'Edit Inline' is clicked) */
              <div className="h-[820px] w-full overflow-hidden rounded-xl bg-white shadow-xl border border-slate-200">
                <iframe
                  title="Canonical Template 01 Interactive Editor"
                  src={DRAWIO_EMBED_URL}
                  className="h-full w-full bg-white border-0"
                  allow="clipboard-read; clipboard-write"
                />
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM METADATA & FIDELITY AUDIT COLLAPSIBLE DRAWER */}
        {!isFullscreen && (
          <div className="mt-6 space-y-4">
            {/* Toggle bar */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowQaSection(!showQaSection)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                <ScanSearch className="h-4 w-4 text-sky-600" />
                <span>{showQaSection ? 'Hide' : 'Show'} Visual Fidelity QA & Source PNG Comparison</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span>{xml.length.toLocaleString()} characters XML</span>
                <span>•</span>
                <span>1536×1024</span>
              </div>
            </div>

            {/* Collapsible QA Comparison Section */}
            {showQaSection && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-5 animate-fade-in">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-black text-slate-900">Visual Fidelity QA & Overlay Audit</h2>
                    <p className="text-xs text-slate-500">Compare the editable vector diagram directly against the authoritative source image 01.</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showOverlay}
                        onChange={(e) => setShowOverlay(e.target.checked)}
                        className="rounded text-sky-600 focus:ring-sky-500"
                      />
                      Enable Overlay
                    </label>
                    <label className="flex items-center gap-2 font-semibold text-slate-700">
                      Opacity:
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={overlayOpacity}
                        onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                        className="w-28 accent-sky-600"
                      />
                      <span className="w-8 font-mono text-[10px] text-slate-600">{overlayOpacity}%</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 2xl:grid-cols-2">
                  {/* Source PNG */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-2 flex items-center justify-between px-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Source PNG (01.png)</span>
                      <a href={SOURCE_IMAGE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 hover:text-sky-800">
                        Open Full-Res <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={SOURCE_IMAGE_URL} alt="Source 01 reference" width={1536} height={1024} className="h-auto w-full rounded-lg border border-slate-200 bg-white object-contain" />
                  </div>

                  {/* SVG Vector / Overlay */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-2 flex items-center justify-between px-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Super Fine Vector Render</span>
                      <button onClick={requestPreview} disabled={!editorReady} className="text-[11px] font-bold text-sky-600 hover:text-sky-800 disabled:opacity-50 cursor-pointer">
                        Re-export SVG
                      </button>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={SOURCE_IMAGE_URL} alt="Overlay background" width={1536} height={1024} className="h-auto w-full object-contain" />
                      {exportedPreview && showOverlay && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={exportedPreview} alt="SVG export overlay" className="absolute inset-0 h-full w-full object-contain" style={{ opacity: overlayOpacity / 100 }} />
                      )}
                      {exportedPreview && !showOverlay && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={exportedPreview} alt="SVG export standalone" className="absolute inset-0 h-full w-full bg-white object-contain" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
