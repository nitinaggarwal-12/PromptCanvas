'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Presentation, FileText, Download, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import { generateAzureLandingZoneArchitectureXml } from '@/lib/masterBuilders/build_master_azure_landing_zone';
import { exportDrawioToEditablePptx } from '@/lib/export/editablePptxCompiler';
import { exportDrawioToEditableDocx } from '@/lib/export/editableDocxCompiler';

function CloudViewerContent() {
  const searchParams = useSearchParams();
  const rawUrlParam = searchParams.get('url') || '';
  const title = searchParams.get('title') || 'Azure Application Landing Zone';
  const blueprintId = searchParams.get('id') || 'VIS-9745';

  // Default to the live public Railway Cloud Bridge .pptx if no ?url= parameter is supplied
  const defaultPublicPptxUrl = 'https://promptcanvas.up.railway.app/api/export/cloud-bridge/azure_landing_zone.pptx';
  const rawUrl = rawUrlParam || defaultPublicPptxUrl;

  const [engine] = useState<'microsoft' | 'google'>('google');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [xmlContent, setXmlContent] = useState<string>('');
  const [isLaunchingTab, setIsLaunchingTab] = useState<'slides' | 'docs' | null>(null);

  useEffect(() => {
    let loadedXml = '';
    if (typeof window !== 'undefined') {
      loadedXml = localStorage.getItem('pc_vision_last_xml') || '';
    }
    if (!loadedXml) {
      loadedXml = generateAzureLandingZoneArchitectureXml();
    }
    setXmlContent(loadedXml);
  }, [blueprintId]);

  /**
   * Directly opens a separate external browser tab on docs.google.com (`https://docs.google.com/viewer?url=...`)
   * where Google renders the .pptx or .docx and shows Google's native "Open with Google Slides / Docs" bar.
   */
  const handleLaunchExternalGoogleTab = async (targetFormat: 'slides' | 'docs') => {
    setIsLaunchingTab(targetFormat);
    try {
      const origin =
        typeof window !== 'undefined' && !window.location.origin.includes('localhost')
          ? window.location.origin
          : 'https://promptcanvas.up.railway.app';

      if (targetFormat === 'slides' && rawUrl && rawUrl.endsWith('.pptx') && !rawUrl.includes('localhost')) {
        const googleTabUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}`;
        window.open(googleTabUrl, '_blank');
        return;
      }

      let base64Data = '';
      if (targetFormat === 'slides') {
        base64Data = (await exportDrawioToEditablePptx(xmlContent, title, blueprintId, {
          returnBase64: true,
          masterImageSrc: '/blueprints/azure_application_landing_zone.png',
        })) as string;
      } else {
        base64Data = (await exportDrawioToEditableDocx(xmlContent, title, blueprintId, {
          returnBase64: true,
          masterImageSrc: '/blueprints/azure_application_landing_zone.png',
        })) as string;
      }

      const res = await fetch(`${origin}/api/export/cloud-bridge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blueprintId,
          title,
          format: targetFormat === 'slides' ? 'pptx' : 'docx',
          base64Data,
        }),
      });
      const data = await res.json();
      const publicFileUrl =
        data.publicUrl ||
        `${origin}/api/export/cloud-bridge/${blueprintId.toLowerCase()}_spec.${targetFormat === 'slides' ? 'pptx' : 'docx'}`;

      const externalGoogleTabUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(publicFileUrl)}`;
      window.open(externalGoogleTabUrl, '_blank');
    } catch (err) {
      console.error('Failed to launch separate Google tab:', err);
      const fallbackUrl =
        targetFormat === 'slides'
          ? `https://docs.google.com/viewer?url=${encodeURIComponent(defaultPublicPptxUrl)}`
          : `https://docs.google.com/viewer?url=${encodeURIComponent('https://promptcanvas.up.railway.app/api/export/cloud-bridge/azure_landing_zone.docx')}`;
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsLaunchingTab(null);
    }
  };

  const googleEmbedUrl = rawUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}&embedded=true`
    : '';

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#090D16] text-slate-100 flex flex-col">
      {/* Dark Shell Top Header */}
      <header className="dark h-14 px-4 md:px-6 bg-[#090D16] border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Presentation className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                {blueprintId}
              </span>
              <h1 className="text-sm md:text-base font-bold text-white tracking-tight truncate max-w-xs lg:max-w-md">
                {title}
              </h1>
              <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 text-[10.5px] font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                <Sparkles className="w-3 h-3" /> 1:1 Master &amp; Editable Vector Deck
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Controls: ONLY Direct External Google Slides Tab, Google Docs Tab & Download */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleLaunchExternalGoogleTab('slides')}
            disabled={isLaunchingTab === 'slides'}
            data-testid="viewer-open-with-google-slides-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md transition-all cursor-pointer disabled:opacity-60"
            title="Open populated 3-Slide Deck (.pptx) in a separate external Google tab (docs.google.com)"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>{isLaunchingTab === 'slides' ? 'Opening Google Tab...' : 'Open with Google Slides'}</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </button>

          <button
            onClick={() => handleLaunchExternalGoogleTab('docs')}
            disabled={isLaunchingTab === 'docs'}
            data-testid="viewer-open-with-google-docs-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md transition-all cursor-pointer disabled:opacity-60"
            title="Open populated Architecture Specification (.docx) in a separate external Google tab (docs.google.com)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isLaunchingTab === 'docs' ? 'Opening Google Tab...' : 'Open with Google Docs'}</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </button>

          <button
            onClick={() => setIframeKey((k) => k + 1)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
            title="Reload Cloud Viewer Iframe"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {rawUrl && (
            <a
              href={rawUrl}
              download
              data-testid="viewer-download-pptx-btn"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Download .pptx</span>
            </a>
          )}
        </div>
      </header>

      {/* Main Embedded Presentation Viewport */}
      <main className="flex-1 w-full h-[calc(100vh-3.5rem)] relative bg-[#0B111E]">
        {googleEmbedUrl ? (
          <iframe
            key={`${engine}-${iframeKey}`}
            src={googleEmbedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            title={`${title} - Cloud Presentation Viewer`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            No presentation URL provided.
          </div>
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
          Loading PromptCanvas Cloud Presentation Viewer...
        </div>
      }
    >
      <CloudViewerContent />
    </Suspense>
  );
}
