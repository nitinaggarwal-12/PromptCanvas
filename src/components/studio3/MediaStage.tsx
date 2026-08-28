'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Film,
  Image as ImageIcon,
  Sparkles,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Code
} from 'lucide-react';

export interface Studio3MediaAsset {
  id: string;
  type: 'image' | 'animation' | 'gif' | 'video' | 'canvas_sandbox';
  title: string;
  url?: string;
  htmlCode?: string;
  aspectRatio?: '16:9' | '1:1' | '9:16' | '4:3';
  caption?: string;
  createdAt?: string;
}

interface MediaStageProps {
  theme: 'dark' | 'light';
  mediaAssets: Studio3MediaAsset[];
  activeAssetIndex: number;
  onSelectAsset: (index: number) => void;
  onGenerateMedia?: (prompt: string, type: 'image' | 'animation') => void;
  isGenerating?: boolean;
}

export const MediaStage: React.FC<MediaStageProps> = ({
  theme,
  mediaAssets,
  activeAssetIndex,
  onSelectAsset,
  onGenerateMedia,
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
      a.download = `${activeAsset.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_animation.html`;
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

  // If no media asset is present, show the visual media generator state
  if (!activeAsset) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0B111E] to-slate-950">
        <div className="max-w-2xl mx-auto z-10 flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 p-0.5 shadow-xl shadow-purple-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Film className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              STUDIO 3 MEDIA &amp; CINEMA STAGE
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-lg leading-relaxed">
              Synthesize high-fidelity photorealistic graphics, procedural HTML5 physics animations, motion graphics, and video briefings alongside your system diagrams.
            </p>
          </div>

          {/* Quick Preset Visual Prompts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-2">
            {[
              {
                title: 'Gladiators in Rome Arena',
                desc: 'Photorealistic Colosseum arena scene with dust and dramatic lighting',
                icon: '⚔️',
                type: 'image' as const
              },
              {
                title: 'Neural Synapse 3D Animation',
                desc: 'Interactive procedural HTML5 canvas particle network',
                icon: '🧠',
                type: 'animation' as const
              },
              {
                title: 'Global Satellite Mesh Orbit',
                desc: 'Real-time orbital tracking simulation and ray casting',
                icon: '🛰️',
                type: 'animation' as const
              },
              {
                title: 'Financial Ledger Transaction Flow',
                desc: 'Animated high-speed token exchange and validation stream',
                icon: '💳',
                type: 'animation' as const
              }
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onGenerateMedia?.(preset.title, preset.type)}
                disabled={isGenerating}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/90 hover:border-purple-500/50 transition-all text-left group flex items-start gap-3.5 shadow-lg disabled:opacity-50"
              >
                <span className="text-2xl p-2 rounded-lg bg-slate-800/80 group-hover:scale-110 transition-transform">
                  {preset.icon}
                </span>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-purple-300 transition-colors">
                    {preset.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {preset.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Media Prompt Input */}
          <div className="w-full mt-2 flex gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && customPrompt.trim()) {
                  onGenerateMedia?.(customPrompt.trim(), 'animation');
                }
              }}
              placeholder="Describe a scene, animation, physics simulation, or image to generate..."
              className="flex-1 rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            <button
              onClick={() => customPrompt.trim() && onGenerateMedia?.(customPrompt.trim(), 'animation')}
              disabled={!customPrompt.trim() || isGenerating}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-black transition shadow-lg disabled:opacity-40 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="studio3-media-viewport"
      className={`flex-1 flex flex-col relative overflow-hidden ${
        theme === 'dark' ? 'bg-[#050811] text-white' : 'bg-slate-900 text-white'
      }`}
    >
      {/* 1. TOP CONTROL BAR */}
      <div className="px-4 py-2.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-800 text-purple-300 text-[11px] font-black uppercase tracking-wider">
            {activeAsset.type === 'image' && <ImageIcon className="w-3 h-3" />}
            {activeAsset.type === 'animation' && <Sparkles className="w-3 h-3" />}
            {activeAsset.type === 'canvas_sandbox' && <Code className="w-3 h-3" />}
            {activeAsset.type === 'video' && <Film className="w-3 h-3" />}
            <span>{activeAsset.type.replace('_', ' ')}</span>
          </div>

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
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-2.5 py-1 rounded-md transition ${
                  viewMode === 'code'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Source
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

      {/* 2. MAIN MEDIA DISPLAY VIEWPORT */}
      <div className="flex-1 relative flex items-center justify-center p-4 overflow-auto">
        {/* VIEW MODE: SOURCE CODE */}
        {viewMode === 'code' && activeAsset.htmlCode ? (
          <div className="w-full h-full max-w-5xl rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-auto whitespace-pre-wrap">
            {activeAsset.htmlCode}
          </div>
        ) : (
          /* VIEW MODE: VISUAL PREVIEW */
          <div
            className="relative flex items-center justify-center transition-transform duration-150"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              maxWidth: '100%',
              maxHeight: '100%'
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

            {/* 2. HTML5 Procedural Animation / WebGL Sandbox */}
            {(activeAsset.type === 'animation' || activeAsset.type === 'canvas_sandbox') && (
              <div className="w-full max-w-6xl h-[680px] rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-black flex items-center justify-center">
                {activeAsset.htmlCode ? (
                  <iframe
                    ref={iframeRef}
                    srcDoc={activeAsset.htmlCode}
                    title={activeAsset.title}
                    sandbox="allow-scripts allow-same-origin"
                    className="w-full h-full border-0"
                  />
                ) : activeAsset.url ? (
                  <iframe
                    src={activeAsset.url}
                    title={activeAsset.title}
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="text-slate-500 text-xs font-bold">No animation code available.</div>
                )}
              </div>
            )}

            {/* 3. Video Asset */}
            {activeAsset.type === 'video' && activeAsset.url && (
              <video
                src={activeAsset.url}
                controls
                autoPlay
                loop
                className="max-h-[calc(100vh-230px)] max-w-full rounded-xl shadow-2xl border border-slate-800"
              />
            )}
          </div>
        )}
      </div>

      {/* 3. BOTTOM ITERATIVE MODIFICATION & ASSET CAROUSEL BAR */}
      <div className="px-4 py-2.5 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
        {/* Iterative Prompt Modification Input */}
        <div className="flex-1 w-full max-w-xl flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <input
            type="text"
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && customPrompt.trim()) {
                onGenerateMedia?.(customPrompt.trim(), activeAsset.type === 'image' ? 'image' : 'animation');
                setCustomPrompt('');
              }
            }}
            placeholder={`Modify this ${activeAsset.type} with prompt (e.g. "make it night time", "add rain", "faster particles")...`}
            className="flex-1 rounded-lg px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={() => {
              if (customPrompt.trim()) {
                onGenerateMedia?.(customPrompt.trim(), activeAsset.type === 'image' ? 'image' : 'animation');
                setCustomPrompt('');
              }
            }}
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
              Assets ({mediaAssets.length}):
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs">
              {mediaAssets.map((asset, idx) => (
                <button
                  key={asset.id || idx}
                  onClick={() => onSelectAsset(idx)}
                  className={`px-2 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 ${
                    activeAssetIndex === idx
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{idx + 1}.</span>
                  <span className="truncate max-w-[80px]">{asset.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
