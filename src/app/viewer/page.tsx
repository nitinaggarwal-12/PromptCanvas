'use client';

import React, { useState, Suspense, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Presentation,
  FileText,
  Printer,
  Loader2,
  Cloud,
  Edit3
} from 'lucide-react';
import { generateAzureLandingZoneArchitectureXml } from '@/lib/masterBuilders/build_master_azure_landing_zone';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import { exportDrawioToEditablePptx } from '@/lib/export/editablePptxCompiler';
import { exportDrawioToEditableDocx } from '@/lib/export/editableDocxCompiler';
import { exportDiagramPng } from '@/lib/export/diagramRaster';
import { useTheme } from '@/lib/themeContext';
import GoogleWorkspaceDirectOpenModal from '@/components/GoogleWorkspaceDirectOpenModal';
import GoogleWorkspaceDriveHandoff from '@/components/GoogleWorkspaceDriveHandoff';

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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const rawBlueprintParam = searchParams.get('blueprint') || searchParams.get('id') || '';
  const rawTitleParam = searchParams.get('title') || '';
  const rawModeParam = searchParams.get('mode');
  // `view=workspace` / `view=cloud-viewer` opt out of the Google Drive handoff (in-app previews only)
  const rawViewParam = searchParams.get('view');

  const [engine] = useState<'microsoft' | 'google'>('google');
  const [viewerSubMode, setViewerSubMode] = useState<'cloud-viewer' | 'interactive-editor'>(
    rawViewParam === 'cloud-viewer' ? 'cloud-viewer' : 'interactive-editor'
  );
  const [activeMode, setActiveMode] = useState<'slides' | 'docs' | 'pdf'>(
    rawModeParam === 'docs' ? 'docs' : rawModeParam === 'pdf' ? 'pdf' : 'slides'
  );
  // Default: "Open with Google Slides/Docs" creates a NATIVE Google file in the user's own Drive
  // (docs.google.com/presentation/d/<id>/edit) instead of the read-only viewerng preview.
  const [isDriveHandoffActive, setIsDriveHandoffActive] = useState<boolean>(
    rawModeParam !== 'pdf' && rawViewParam !== 'workspace' && rawViewParam !== 'cloud-viewer'
  );
  const [xmlContent, setXmlContent] = useState<string>('');
  const [resolvedTitle, setResolvedTitle] = useState<string>(rawTitleParam || 'Google Cloud Enterprise Architecture');
  const [resolvedId, setResolvedId] = useState<string>(rawBlueprintParam || '00');
  const [resolvedMasterImage, setResolvedMasterImage] = useState<string | undefined>(undefined);

  // Public GCP Cloud Storage V4 Signed URL served to docs.google.com/viewerng/viewer
  const DEFAULT_GCS_PPTX_URL =
    'https://storage.googleapis.com/promptcanvas-cloud-bridge-sandbox/bp_00_live.pptx?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=merck-sheets-sync%40nitina-ggarwal-sandbox-647724.iam.gserviceaccount.com%2F20261006%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20261006T162914Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=08a6e6c90a06a5a4076fb3c7925f3a8fd1a51d7e8e5a9f9d041ffee6fdb337a3bc3e94d56e0ca9483eea425afe1a3d45541439c701a830d5eb650703f2a7dde4ce2db76eff6fc55fd1f92ef892f62fc7f9e66c76cde1650ee0dff03ae6039f35d7be6e881cf18c1dc361d59c9b228a9491e939314221b64c8984b766264de11fc59e0b583f6491dc7d4cc79cd8aa8136492eaadf98f2c8346b27de2d16c25a8cbeef8d9b3f4c0735d22d47931052851949306080ea157fed62b61f8b19f91d510fa8d6e91c12678167b39289bfeef9a43cd279a9bfaf8c015102d088b6e4d864b3c6bfde776c5f9b7c88028601e73634769f5cc9682aa8f4818ca9cd4775a316';
  const DEFAULT_GCS_DOCX_URL =
    'https://storage.googleapis.com/promptcanvas-cloud-bridge-sandbox/bp_00_live.docx?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=merck-sheets-sync%40nitina-ggarwal-sandbox-647724.iam.gserviceaccount.com%2F20261006%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20261006T162914Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=4431f5f25a2d7d7919b34de0eceb38f733dd4cd3a651829b58ed091908bd76fe96682f71168c4747f31947cec21e6d79f08df78086940d34b4991646b69860cc7cd752d3ec51c81d88f431b52f482224fb57ef5b694f50501a24a787ea2dbcc26130d5d395774fbc553dd87028ebdbf0308f0ec05b315ceefc52be357e69d591d77e2abc35958c7259ecfc0dc651611d96941a0ba57de3e4f2e981cee0bef4dbab5fa4989071e76e84b0083a0b75beb4aa9949fbd8e02d262ba269c44c4f0188f158285da562eb85352636a315fc13b51e5d2f4a16137e09fc5ec659997f7ea370f7cab92514e82955c31e8321df8156af9fbb638f51cf608d551c3a2a0a7c2b';

  const [publicFileUrl, setPublicFileUrl] = useState<string>(DEFAULT_GCS_PPTX_URL);
  const [isSyncingBridge, setIsSyncingBridge] = useState<boolean>(true);

  useEffect(() => {
    if (rawModeParam === 'docs' || rawModeParam === 'pdf' || rawModeParam === 'slides') {
      setActiveMode(rawModeParam);
    }
  }, [rawModeParam]);

  useEffect(() => {
    const bpId = rawBlueprintParam || '00';
    const matchedTemplate = CANONICAL_TEMPLATES.find(
      (t) => t.id === bpId || t.id === bpId.replace(/^#/, '').padStart(2, '0')
    );
    const defaultCanonicalPng =
      matchedTemplate && Number(matchedTemplate.id) <= 74
        ? `/templates/canonical_${matchedTemplate.id.padStart(2, '0')}.png`
        : undefined;

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
              const isStaleCorrupted =
                matchedTemplate &&
                (parsed.xmlContent.includes('Frontier LLM.1') ||
                  parsed.xmlContent.includes('Serverless Container Runtime Gen2'));
              setXmlContent(
                isStaleCorrupted
                  ? matchedTemplate.generateXml('enterprise', isLight ? 'light' : 'dark')
                  : parsed.xmlContent
              );
              if (
                typeof parsed.masterImageSrc === 'string' &&
                parsed.masterImageSrc.length > 0 &&
                !parsed.masterImageSrc.startsWith('data:image/svg+xml')
              ) {
                setResolvedMasterImage(parsed.masterImageSrc);
              } else if (defaultCanonicalPng) {
                setResolvedMasterImage(defaultCanonicalPng);
              }
              return;
            }
          }
        }
      } catch {
        // fallback below
      }
    }

    if (matchedTemplate) {
      setResolvedId(`#${matchedTemplate.id}`);
      setResolvedTitle(rawTitleParam || matchedTemplate.name);
      setXmlContent(matchedTemplate.generateXml('enterprise', isLight ? 'light' : 'dark'));
      if (defaultCanonicalPng) {
        setResolvedMasterImage(defaultCanonicalPng);
      }
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
  }, [rawBlueprintParam, rawTitleParam, isLight]);

  // Compile real .pptx or .docx and upload to GCP Cloud Storage Bridge so docs.google.com/viewerng/viewer renders it authentically
  // (only needed for the in-app fallbacks — the Google Drive handoff uploads straight into the user's Drive instead)
  useEffect(() => {
    if (!xmlContent || isDriveHandoffActive) return;
    let cancelled = false;

    async function syncPublicBridge() {
      setIsSyncingBridge(true);
      const targetFormat = activeMode === 'docs' ? 'docx' : 'pptx';
      const fallbackUrl = targetFormat === 'docx' ? DEFAULT_GCS_DOCX_URL : DEFAULT_GCS_PPTX_URL;

      try {
        let previewImg = resolvedMasterImage;
        if (!previewImg) {
          try {
            previewImg = await Promise.race([
              exportDiagramPng(xmlContent, { scale: 2, transparent: false }),
              new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))
            ]);
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

        // Upload directly to GCP Cloud Bridge (gs://promptcanvas-cloud-bridge-sandbox)
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
  }, [xmlContent, activeMode, resolvedTitle, resolvedId, resolvedMasterImage, isDriveHandoffActive]);

  // In-memory compile used by the Google Drive handoff (never triggers a browser download)
  const compileWorkspaceBlob = useCallback(async (): Promise<Blob> => {
    if (!xmlContent) {
      throw new Error('The architecture diagram is still loading. Please try again in a moment.');
    }
    let previewImg = resolvedMasterImage;
    if (!previewImg) {
      try {
        previewImg = await Promise.race([
          exportDiagramPng(xmlContent, { scale: 2, transparent: false }),
          new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 1500))
        ]);
      } catch {}
    }
    const blob =
      activeMode === 'docs'
        ? await exportDrawioToEditableDocx(xmlContent, resolvedTitle, resolvedId, {
            returnBlob: true,
            masterImageSrc: previewImg
          })
        : await exportDrawioToEditablePptx(xmlContent, resolvedTitle, resolvedId, {
            returnBlob: true,
            masterImageSrc: previewImg
          });
    if (!blob || typeof blob === 'string') {
      throw new Error('Could not compile the document in memory.');
    }
    return blob;
  }, [xmlContent, resolvedMasterImage, activeMode, resolvedTitle, resolvedId]);

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

  // Use Google's active standalone viewer engine (viewerng/viewer) which returns HTTP 200 text/html
  // instead of legacy /viewer which returns HTTP 204 application/binary and triggers 'Save As: viewer'
  const googleEmbeddedViewerUrl = `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(publicFileUrl)}&embedded=true`;

  // "Open with Google Slides / Docs" → native Google file in the signed-in user's own Drive
  // (real https://docs.google.com/presentation/d/<id>/edit URL, never the read-only viewer)
  const handleOpenInGoogleTab = (targetMode: 'slides' | 'docs') => {
    setActiveMode(targetMode);
    setIsDriveHandoffActive(true);
  };

  // Native Google Slides / Docs handoff (signed-in user's Drive) — the in-app UI below is only a fallback
  if (isDriveHandoffActive && (activeMode === 'slides' || activeMode === 'docs')) {
    return (
      <GoogleWorkspaceDriveHandoff
        key={activeMode}
        kind={activeMode}
        title={resolvedTitle}
        blueprintId={resolvedId}
        isReady={Boolean(xmlContent)}
        compileBlob={compileWorkspaceBlob}
        onFallback={(target) => {
          setIsDriveHandoffActive(false);
          setViewerSubMode(target === 'workspace' ? 'interactive-editor' : 'cloud-viewer');
        }}
      />
    );
  }

  return (
    <div
      className={`w-screen h-screen overflow-hidden flex flex-col ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#1E1F22] text-slate-100'
      }`}
    >
      {/* Top Authentic Cloud Viewer Action Bar */}
      <header
        data-engine={engine}
        className={`h-14 px-4 border-b flex items-center justify-between gap-3 shrink-0 z-20 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-xs'
            : 'bg-[#0F1420] border-slate-800 text-slate-100'
        }`}
      >
        {/* Left: Back & Document Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className={`p-2 rounded-xl transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shrink-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'
            }`}
            title="Back to Architecture Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                activeMode === 'docs'
                  ? isLight
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : isLight
                  ? 'bg-amber-50 text-amber-600 border border-amber-200'
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
                <h1
                  className={`text-sm font-extrabold truncate max-w-[320px] md:max-w-[540px] lg:max-w-[700px] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {resolvedTitle} ({resolvedId})
                </h1>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                    isLight
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {activeMode === 'docs' ? '.DOCX' : '.PPTX'}
                </span>
              </div>
              <div className={`flex items-center gap-2 text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <Cloud className="w-3 h-3 text-sky-500" />
                <span>
                  {viewerSubMode === 'interactive-editor'
                    ? `Interactive preview · "Open with ${activeMode === 'docs' ? 'Google Docs' : 'Google Slides'}" creates the real file in your Google Drive`
                    : 'Read-only Google Cloud Viewer (docs.google.com/viewerng)'}
                </span>
                {isSyncingBridge && (
                  <span className="text-sky-500 flex items-center gap-1 font-medium">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Syncing live presentation...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Native Google Viewer Launchers, Interactive Studio Toggle & Download */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Toggle between Embedded Google Cloud Viewer and Interactive Slides/Docs Editor */}
          <button
            type="button"
            onClick={() =>
              setViewerSubMode((m) => (m === 'cloud-viewer' ? 'interactive-editor' : 'cloud-viewer'))
            }
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
              viewerSubMode === 'interactive-editor'
                ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                : isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="Switch between Google Cloud Viewer and Interactive Editable Shapes Studio"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {viewerSubMode === 'cloud-viewer' ? 'Interactive Editor' : 'Google Cloud Viewer'}
            </span>
          </button>

          {/* Open with Google Slides */}
          <button
            type="button"
            onClick={() => handleOpenInGoogleTab('slides')}
            data-testid="viewer-open-with-google-slides-btn"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'slides'
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Create an editable copy in your Google Drive and open it in Google Slides (docs.google.com/presentation)"
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
                : isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Create an editable copy in your Google Drive and open it in Google Docs (docs.google.com/document)"
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
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-rose-500" />
            <span>PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content: Actual Embedded Google Cloud Viewer (docs.google.com/viewerng/viewer) or Interactive Editor */}
      <main className={`flex-1 w-full h-full relative flex flex-col ${isLight ? 'bg-slate-100' : 'bg-[#202124]'}`}>
        {viewerSubMode === 'interactive-editor' ? (
          <div className="flex-1 w-full h-full relative overflow-hidden">
            <GoogleWorkspaceDirectOpenModal
              isOpen={true}
              onClose={() => setViewerSubMode('cloud-viewer')}
              mode={activeMode}
              xmlContent={xmlContent}
              diagramName={resolvedTitle}
              blueprintId={resolvedId}
              masterImageSrc={resolvedMasterImage}
              isFullPage={true}
            />
          </div>
        ) : isSyncingBridge ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <div className="space-y-1">
              <p className={`text-sm font-extrabold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                Preparing {resolvedTitle} ({resolvedId}) for Google Cloud Viewer...
              </p>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Compiling 3-slide widescreen {activeMode === 'docs' ? 'Word specification (.docx)' : 'PowerPoint presentation (.pptx)'} &amp; syncing to public cloud bridge
              </p>
            </div>
          </div>
        ) : (
          <iframe
            key={googleEmbeddedViewerUrl}
            src={googleEmbeddedViewerUrl}
            className="w-full flex-1 border-0 bg-white"
            title="Google Cloud Document Viewer"
            allowFullScreen
          />
        )}
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
