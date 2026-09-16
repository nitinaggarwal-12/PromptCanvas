'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Presentation, Download, ExternalLink, RefreshCw, Sparkles, Globe, Layers } from 'lucide-react';

function CloudViewerContent() {
  const searchParams = useSearchParams();
  const rawUrl = searchParams.get('url') || '';
  const title = searchParams.get('title') || 'Architecture Blueprint Presentation';
  const blueprintId = searchParams.get('id') || 'VIS-MASTER';

  const [engine, setEngine] = useState<'microsoft' | 'google'>('microsoft');
  const [iframeKey, setIframeKey] = useState<number>(0);

  const googleEmbedUrl = rawUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}&embedded=true`
    : '';
  const msOfficeEmbedUrl = rawUrl
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(rawUrl)}`
    : '';

  const activeEmbedUrl = engine === 'google' ? googleEmbedUrl : msOfficeEmbedUrl;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#090D16] text-slate-100 flex flex-col">
      {/* Dark Shell Top Header */}
      <header className="dark h-14 px-6 bg-[#090D16] border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {blueprintId}
              </span>
              <h1 className="text-sm md:text-base font-bold text-white tracking-tight truncate max-w-md">
                {title}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10.5px] font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3 h-3" /> 1:1 Master &amp; Editable Vector Deck (.pptx)
              </span>
            </div>
          </div>
        </div>

        {/* Center Engine Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setEngine('google');
              setIframeKey((k) => k + 1);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {rawUrl && (
            <a
              href={rawUrl}
              download
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .pptx</span>
            </a>
          )}
          <a
            href="https://slides.new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-all"
          >
            <span>Open slides.new</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
          </a>
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
