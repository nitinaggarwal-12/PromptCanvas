'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Presentation, FileText, Download, RefreshCw, Sparkles, Globe, Layers } from 'lucide-react';
import GoogleWorkspaceDirectOpenModal from '@/components/GoogleWorkspaceDirectOpenModal';
import { generateAzureLandingZoneArchitectureXml } from '@/lib/masterBuilders/build_master_azure_landing_zone';

function CloudViewerContent() {
  const searchParams = useSearchParams();
  const rawUrl = searchParams.get('url') || '';
  const title = searchParams.get('title') || 'Azure Application Landing Zone';
  const blueprintId = searchParams.get('id') || 'VIS-9745';

  const [engine, setEngine] = useState<'microsoft' | 'google'>('google');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [studioModalMode, setStudioModalMode] = useState<'slides' | 'docs' | null>(null);
  const [xmlContent, setXmlContent] = useState<string>('');

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

  const googleEmbedUrl = rawUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}&embedded=true`
    : '';
  const bustUrl = rawUrl ? (rawUrl.includes('?') ? `${rawUrl}&cb=${iframeKey}` : `${rawUrl}?cb=${iframeKey}`) : '';
  const msOfficeEmbedUrl = bustUrl
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(bustUrl)}`
    : '';

  const activeEmbedUrl = engine === 'google' ? googleEmbedUrl : msOfficeEmbedUrl;

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

        {/* Center Engine Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => {
              setEngine('google');
              setIframeKey((k) => k + 1);
            }}
            data-testid="viewer-google-engine-btn"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              engine === 'google'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Google Cloud Viewer</span>
          </button>
          <button
            onClick={() => {
              setEngine('microsoft');
              setIframeKey((k) => k + 1);
            }}
            data-testid="viewer-microsoft-engine-btn"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              engine === 'microsoft'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>PowerPoint Web Viewer</span>
          </button>
          <button
            onClick={() => setIframeKey((k) => k + 1)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="Reload Cloud Viewer Iframe"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Action Controls: Open with Google Slides & Open with Google Docs */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setStudioModalMode('slides')}
            data-testid="viewer-open-with-google-slides-btn"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md transition-all cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Open with Google Slides</span>
          </button>

          <button
            onClick={() => setStudioModalMode('docs')}
            data-testid="viewer-open-with-google-docs-btn"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open with Google Docs</span>
          </button>

          {rawUrl && (
            <a
              href={rawUrl}
              download
              data-testid="viewer-download-pptx-btn"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .pptx</span>
            </a>
          )}
        </div>
      </header>

      {/* Main Embedded Presentation Viewport */}
      <main className="flex-1 w-full h-[calc(100vh-3.5rem)] relative bg-[#0B111E]">
        {activeEmbedUrl ? (
          <iframe
            key={`${engine}-${iframeKey}`}
            src={activeEmbedUrl}
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

      {/* Interactive Editable Google Slides & Google Docs Studio Modal */}
      {studioModalMode && (
        <GoogleWorkspaceDirectOpenModal
          isOpen={Boolean(studioModalMode)}
          onClose={() => setStudioModalMode(null)}
          mode={studioModalMode}
          xmlContent={xmlContent}
          diagramName={title}
          blueprintId={blueprintId}
          masterImageSrc="/blueprints/azure_application_landing_zone.png"
        />
      )}
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
