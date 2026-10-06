'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Presentation,
  FileText,
  Printer,
  RefreshCw,
  Loader2,
  Cloud
} from 'lucide-react';
import { generateAzureLandingZoneArchitectureXml } from '@/lib/masterBuilders/build_master_azure_landing_zone';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import { exportDrawioToEditablePptx } from '@/lib/export/editablePptxCompiler';
import { exportDrawioToEditableDocx } from '@/lib/export/editableDocxCompiler';
import { exportDiagramPng } from '@/lib/export/diagramRaster';

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      const base64Idx = res.indexOf(';base64,');
      resolve(base64Idx !== -1 ? res.substring(base64Idx + 8) : res);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function CloudViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawBlueprintParam = searchParams.get('blueprint') || searchParams.get('id') || '';
  const rawTitleParam = searchParams.get('title') || '';
  const rawModeParam = searchParams.get('mode');

  const [engine] = useState<'microsoft' | 'google'>('google');
  const [activeMode, setActiveMode] = useState<'slides' | 'docs' | 'pdf'>(
    rawModeParam === 'docs' ? 'docs' : rawModeParam === 'pdf' ? 'pdf' : 'slides'
  );
  const [xmlContent, setXmlContent] = useState<string>('');
  const [resolvedTitle, setResolvedTitle] = useState<string>(rawTitleParam || 'Google Cloud Enterprise Architecture');
  const [resolvedId, setResolvedId] = useState<string>(rawBlueprintParam || '00');
  const [resolvedMasterImage, setResolvedMasterImage] = useState<string | undefined>(undefined);

  // Public URL served to actual docs.google.com/viewer
  const [publicFileUrl, setPublicFileUrl] = useState<string>(
    'https://promptcanvas.up.railway.app/api/export/cloud-bridge/azure_landing_zone.pptx'
  );
  const [isSyncingBridge, setIsSyncingBridge] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    if (rawModeParam === 'docs' || rawModeParam === 'pdf' || rawModeParam === 'slides') {
      setActiveMode(rawModeParam);
    }
  }, [rawModeParam]);

  useEffect(() => {
    const bpId = rawBlueprintParam || '00';

    if (typeof window !== 'undefined') {
      try {
        const rawPayload = localStorage.getItem('pc_cloud_viewer_payload');
        if (rawPayload) {
          const parsed = JSON.parse(rawPayload);
          if (parsed && typeof parsed.xmlContent === 'string' && parsed.xmlContent.trim().length > 0) {
            const payloadBp = String(parsed.blueprintId || '').replace(/^#/, '');
            const cleanReqBp = bpId.replace(/^#/, '');
            if (!rawBlueprintParam || payloadBp === cleanReqBp || Date.now() - (parsed.updatedAt || 0) < 600_000) {
              setResolvedId(parsed.blueprintId || bpId);
              setResolvedTitle(rawTitleParam || parsed.diagramName || 'Enterprise Cloud Architecture');
              setXmlContent(parsed.xmlContent);
              if (typeof parsed.masterImageSrc === 'string' && parsed.masterImageSrc.length > 0) {
                setResolvedMasterImage(parsed.masterImageSrc);
              }
              return;
            }
          }
        }
      } catch {
        // fallback below
      }
    }

    const matchedTemplate = CANONICAL_TEMPLATES.find(
      (t) => t.id === bpId || t.id === bpId.replace(/^#/, '').padStart(2, '0')
    );

    if (matchedTemplate) {
      setResolvedId(`#${matchedTemplate.id}`);
      setResolvedTitle(rawTitleParam || matchedTemplate.name);
      setXmlContent(matchedTemplate.generateXml('enterprise', 'light'));
      return;
    }

    let loadedXml = '';
    if (typeof window !== 'undefined') {
      loadedXml = localStorage.getItem('pc_vision_last_xml') || '';
    }
    if (!loadedXml) {
      loadedXml = generateAzureLandingZoneArchitectureXml();
    }
    setResolvedId(bpId || 'VIS-9745');
    setResolvedTitle(rawTitleParam || 'Azure Application Landing Zone');
    setXmlContent(loadedXml);
  }, [rawBlueprintParam, rawTitleParam]);

  // Compile real .pptx or .docx and mirror to public Cloud Bridge so docs.google.com/viewer renders it authentically
  useEffect(() => {
    if (!xmlContent) return;
    let cancelled = false;

    async function syncPublicBridge() {
      setIsSyncingBridge(true);
      const targetFormat = activeMode === 'docs' ? 'docx' : 'pptx';
      const fallbackUrl = `https://promptcanvas.up.railway.app/api/export/cloud-bridge/azure_landing_zone.${targetFormat}`;

      try {
        let previewImg = resolvedMasterImage;
        if (!previewImg) {
          try {
            previewImg = (await exportDiagramPng(xmlContent, { scale: 2, transparent: false })) || undefined;
          } catch {}
        }

        const cleanBpId = resolvedId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || '00';
        const bridgeId = `bp_${cleanBpId}_${Date.now()}`;

        let blob: Blob | string | void;
        if (targetFormat === 'pptx') {
          blob = await exportDrawioToEditablePptx(xmlContent, resolvedTitle, resolvedId, {
            returnBlob: true,
            masterImageSrc: previewImg
          });
        } else {
          blob = await exportDrawioToEditableDocx(xmlContent, resolvedTitle, resolvedId, {
            returnBlob: true,
            bridgeId,
            masterImageSrc: previewImg
          });
        }

        if (!blob || typeof blob === 'string') {
          if (!cancelled) setPublicFileUrl(fallbackUrl);
          return;
        }

        const base64Data = await blobToBase64(blob);

        // Upload directly to local & public Railway bridge
        const res = await fetch('/api/export/cloud-bridge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: resolvedId,
            title: resolvedTitle,
            format: targetFormat,
            base64Data,
            xmlContent,
            bridgeId
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data?.publicUrl) {
            setPublicFileUrl(data.publicUrl);
            return;
          }
        }
        if (!cancelled) setPublicFileUrl(fallbackUrl);
      } catch {
        if (!cancelled) setPublicFileUrl(fallbackUrl);
      } finally {
        if (!cancelled) setIsSyncingBridge(false);
      }
    }

    syncPublicBridge();
    return () => {
      cancelled = true;
    };
  }, [xmlContent, activeMode, resolvedTitle, resolvedId, resolvedMasterImage]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const suffix =
        activeMode === 'slides'
          ? 'Google Slides'
          : activeMode === 'docs'
          ? 'Google Docs'
          : 'PDF Viewer';
      document.title = `${resolvedTitle} - ${suffix}`;
    }
  }, [resolvedTitle, activeMode]);

  const googleEmbeddedViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(publicFileUrl)}&embedded=true`;
  const googleFullTabViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(publicFileUrl)}`;

  const handleOpenInGoogleTab = (targetMode: 'slides' | 'docs') => {
    setActiveMode(targetMode);
    if (typeof window !== 'undefined') {
      window.open(googleFullTabViewerUrl, '_blank');
    }
  };

  const handleDownloadFile = async () => {
    setIsDownloading(true);
    try {
      let previewImg = resolvedMasterImage;
      if (!previewImg && xmlContent) {
        try {
          previewImg = (await exportDiagramPng(xmlContent, { scale: 2, transparent: false })) || undefined;
        } catch {}
      }
      if (activeMode === 'docs') {
        await exportDrawioToEditableDocx(xmlContent, resolvedTitle, resolvedId, {
          returnBlob: false,
          masterImageSrc: previewImg
        });
      } else {
        await exportDrawioToEditablePptx(xmlContent, resolvedTitle, resolvedId, {
          returnBlob: false,
          masterImageSrc: previewImg
        });
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#1E1F22] text-slate-100 flex flex-col">
      {/* Top Authentic Cloud Viewer Action Bar */}
      <header
        data-engine={engine}
        className="h-14 px-4 bg-[#0F1420] border-b border-slate-800 flex items-center justify-between gap-3 shrink-0 z-20"
      >
        {/* Left: Back & Document Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shrink-0"
            title="Back to Architecture Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                activeMode === 'docs'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {activeMode === 'docs' ? (
                <FileText className="w-4 h-4" />
              ) : (
                <Presentation className="w-4 h-4" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold text-white truncate max-w-[320px] md:max-w-[540px] lg:max-w-[700px]">
                  {resolvedTitle} ({resolvedId})
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                  {activeMode === 'docs' ? '.DOCX' : '.PPTX'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Cloud className="w-3 h-3 text-sky-400" />
                <span>Google Cloud Viewer (docs.google.com/viewer)</span>
                {isSyncingBridge && (
                  <span className="text-sky-400 flex items-center gap-1 font-medium">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Syncing live presentation...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Native Google Viewer Launchers & Download */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Open with Google Slides */}
          <button
            type="button"
            onClick={() => handleOpenInGoogleTab('slides')}
            data-testid="viewer-open-with-google-slides-btn"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'slides'
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Open in full Google Docs Viewer tab with native 'Open with Google Slides' button"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Open with Google Slides</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </button>

          {/* Open with Google Docs */}
          <button
            type="button"
            onClick={() => handleOpenInGoogleTab('docs')}
            data-testid="viewer-open-with-google-docs-btn"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'docs'
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Open in full Google Docs Viewer tab with native 'Open with Google Docs' button"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open with Google Docs</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </button>

          {/* PDF Mode */}
          <button
            type="button"
            onClick={() => {
              setActiveMode('pdf');
              if (typeof window !== 'undefined') window.print();
            }}
            data-testid="viewer-open-with-pdf-btn"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-rose-400" />
            <span>PDF</span>
          </button>

          {/* Direct Download */}
          <button
            type="button"
            onClick={handleDownloadFile}
            disabled={isDownloading}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            title="Download compiled .pptx / .docx file"
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Download {activeMode === 'docs' ? '.docx' : '.pptx'}</span>
          </button>
        </div>
      </header>

      {/* Main Content: Actual Embedded Google Cloud Viewer (docs.google.com/viewer) */}
      <main className="flex-1 w-full h-full relative bg-[#202124] flex flex-col">
        <iframe
          key={googleEmbeddedViewerUrl}
          src={googleEmbeddedViewerUrl}
          className="w-full flex-1 border-0 bg-white"
          title="Google Cloud Document Viewer"
          allowFullScreen
        />
      </main>
    </div>
  );
}

export default function CloudViewerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#090D16] flex items-center justify-center text-slate-300 text-sm">
          Loading Google Cloud Viewer...
        </div>
      }
    >
      <CloudViewerContent />
    </Suspense>
  );
}
