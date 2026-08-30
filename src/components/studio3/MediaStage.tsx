'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Film,
  Sparkles,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

export interface Studio3MediaAsset {
  id: string;
  type: string;
  title: string;
  url?: string | null;
  htmlCode?: string | null;
  aspectRatio?: string;
  caption?: string | null;
  category?: string | null;
  createdAt?: string | Date;
}

interface MediaStageProps {
  theme: 'dark' | 'light';
  mediaAssets: Studio3MediaAsset[];
  activeAssetIndex: number;
  onSelectAsset: (index: number) => void;
  onApplyEdit?: (prompt: string, asset: Studio3MediaAsset) => Promise<boolean>;
  onOpenModeSelector?: () => void;
  isGenerating?: boolean;
}

export const MediaStage: React.FC<MediaStageProps> = ({
  theme,
  mediaAssets,
  activeAssetIndex,
  onSelectAsset,
  onApplyEdit,
  onOpenModeSelector,
  isGenerating = false
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeAsset = mediaAssets[activeAssetIndex] || mediaAssets[0] || null;

  // Reset zoom on asset change
  useEffect(() => {
    setZoomLevel(1);
    setViewMode('preview');
  }, [activeAssetIndex]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  const applyEdit = async () => {
    const editPrompt = customPrompt.trim();
    if (!editPrompt || !activeAsset || isGenerating) return;
    const saved = await onApplyEdit?.(editPrompt, activeAsset);
    if (saved) setCustomPrompt('');
  };

  const handleDownload = () => {
    if (!activeAsset) return;
    if (activeAsset.url) {
      const a = document.createElement('a');
      a.href = activeAsset.url;
      a.download = `${activeAsset.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${activeAsset.type === 'video' ? 'mp4' : 'png'}`;
      a.click();
    } else if (activeAsset.htmlCode) {
      const blob = new Blob([activeAsset.htmlCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeAsset.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_multimodal.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleFullscreen = () => {
    const stageEl = document.getElementById('studio3-media-viewport');
    if (stageEl) {
      if (!document.fullscreenElement) {
        stageEl.requestFullscreen().catch(err => console.error(err));
      } else {
        document.exitFullscreen().catch(err => console.error(err));
      }
    }
  };

  // If no media asset is present, show empty generator state
  if (!activeAsset) {
    return (
      <div className="w-full h-full min-h-[600px] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0B111E] to-slate-950 rounded-xl">
        <div className="max-w-2xl mx-auto z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 p-0.5 shadow-xl shadow-purple-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Film className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              STUDIO 3 MULTIMODAL MEDIA STAGE
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg leading-relaxed">
              Create and save interactive Mind Maps, 16:9 Slide Decks, AI Podcasts, Gamified Quizzes, Physics Simulations, 3D Molecular Models, and Photorealistic Visuals.
            </p>
          </div>

          {/* Quick Trigger Button to Explore All 36+ Modes */}
          <button
            onClick={onOpenModeSelector}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black transition shadow-lg flex items-center gap-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Browse All 36+ Multimodal Formats</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="studio3-media-viewport"
      className={`w-full h-full min-h-[620px] flex flex-col relative overflow-hidden rounded-xl border border-slate-800 ${
        theme === 'dark' ? 'bg-[#050811] text-white' : 'bg-slate-900 text-white'
      }`}
    >
      {/* 1. TOP CONTROL BAR */}
      <div className="px-4 py-2.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenModeSelector}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/70 hover:bg-purple-900/80 border border-purple-800 text-purple-300 text-[11px] font-black uppercase tracking-wider transition"
            title="Browse All Content Modes"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>{activeAsset.category ? `${activeAsset.category.toUpperCase()} • ${activeAsset.type}` : activeAsset.type.replace('_', ' ')}</span>
          </button>

          <div className="text-xs font-extrabold text-slate-200 truncate max-w-md">
            {activeAsset.title}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {activeAsset.htmlCode && (
            <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold mr-2">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-2.5 py-1 rounded-md transition ${
                  viewMode === 'preview'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-2.5 py-1 rounded-md transition ${
                  viewMode === 'code'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Code
              </button>
            </div>
          )}

          {/* Zoom Controls (Images) */}
          {activeAsset.type === 'image' && (
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-slate-300 mr-2">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-bold px-1.5 min-w-[36px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="text-[10px] font-bold px-1.5 py-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                title="Reset Zoom"
              >
                100%
              </button>
            </div>
          )}

          {/* Download */}
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            title="Download Media"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            title="Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. MAIN MEDIA DISPLAY VIEWPORT - ENFORCES FULL CONTAINER EXPANSION */}
      <div className="flex-1 w-full h-full min-h-[460px] relative flex items-center justify-center p-3 overflow-hidden bg-[#050811]">
        {/* VIEW MODE: SOURCE CODE */}
        {viewMode === 'code' && activeAsset.htmlCode ? (
          <div className="w-full h-full max-w-5xl rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-auto whitespace-pre-wrap">
            {activeAsset.htmlCode}
          </div>
        ) : (
          /* VIEW MODE: VISUAL PREVIEW */
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: activeAsset.type === 'image' ? `scale(${zoomLevel})` : 'none',
              transformOrigin: 'center center',
              width: '100%',
              height: '100%'
            }}
          >
            {/* 1. Image / GIF Asset */}
            {(activeAsset.type === 'image' || activeAsset.type === 'gif') && activeAsset.url && (
              <img
                src={activeAsset.url}
                alt={activeAsset.title}
                className="max-h-[calc(100vh-230px)] max-w-full rounded-xl object-contain shadow-2xl border border-slate-800"
              />
            )}

            {/* 2. Interactive HTML5 / Canvas / Quiz / Mindmap / Deck Sandbox */}
            {activeAsset.type !== 'image' && activeAsset.type !== 'gif' && activeAsset.type !== 'video' && (
              <div className="w-full h-full min-h-[440px] rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-[#050811] flex items-center justify-center">
                {activeAsset.htmlCode ? (
                  <iframe
                    key={activeAsset.id}
                    ref={iframeRef}
                    srcDoc={activeAsset.htmlCode}
                    title={activeAsset.title}
                    sandbox="allow-scripts allow-forms allow-modals"
                    className="w-full h-full min-h-[440px] border-0"
                    style={{ width: '100%', height: '100%', minHeight: '440px' }}
                  />
                ) : activeAsset.url ? (
                  <iframe
                    key={activeAsset.id}
                    src={activeAsset.url}
                    title={activeAsset.title}
                    className="w-full h-full min-h-[440px] border-0"
                    style={{ width: '100%', height: '100%', minHeight: '440px' }}
                  />
                ) : (
                  <div className="text-slate-500 text-xs font-bold">No application code available.</div>
                )}
              </div>
            )}

            {/* 3. Video Asset with Ambient Blur Glow */}
            {activeAsset.type === 'video' && activeAsset.url && (
              <div className="relative flex items-center justify-center max-h-[calc(100vh-230px)] max-w-full">
                {/* Ambient Glow for 9:16 Reels */}
                {activeAsset.aspectRatio === '9:16' && (
                  <video
                    src={activeAsset.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none rounded-2xl"
                  />
                )}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-black flex flex-col items-center">
                  <video
                    src={activeAsset.url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="max-h-[calc(100vh-240px)] rounded-xl object-contain"
                  />
                  {activeAsset.caption && (
                    <div className="w-full bg-slate-950/80 backdrop-blur-md px-3 py-1.5 text-center text-[11px] font-semibold text-slate-300 border-t border-slate-800 truncate">
                      {activeAsset.caption}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. BOTTOM ITERATIVE MODIFICATION & ASSET CAROUSEL BAR */}
      <div className="px-4 py-2.5 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 z-20 shrink-0">
        {/* Iterative Prompt Modification Input */}
        <div className="flex-1 w-full max-w-xl flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <input
            type="text"
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && customPrompt.trim()) {
                e.preventDefault();
                void applyEdit();
              }
            }}
            placeholder={`Modify this ${activeAsset.type} with prompt (e.g. "add timer", "make questions harder", "add night sky")...`}
            className="flex-1 rounded-lg px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={() => void applyEdit()}
            disabled={!customPrompt.trim() || isGenerating}
            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold transition disabled:opacity-40 shrink-0 flex items-center gap-1 shadow-sm"
          >
            <span>Apply</span>
          </button>
        </div>

        {/* Thumbnail Selector (if multiple assets) */}
        {mediaAssets.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Saved Assets ({mediaAssets.length}):
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-sm md:max-w-md">
              {mediaAssets.map((asset, idx) => (
                <button
                  key={asset.id || idx}
                  onClick={() => onSelectAsset(idx)}
                  className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold transition flex items-center gap-1 shrink-0 ${
                    activeAssetIndex === idx
                      ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span className="opacity-70">{idx + 1}.</span>
                  <span className="truncate max-w-[140px] md:max-w-[180px]">{asset.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
