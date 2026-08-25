'use client';

import React, { useState, useEffect } from 'react';
import {
  Presentation,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  FileText,
  Layers,
  Shield,
  Zap,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  X,
  Eye,
  MessageSquare
} from 'lucide-react';
import {
  SlideDeck,
  SlideData,
  generateSlideDeck,
  exportSlideDeckToPptx
} from '@/lib/export/slideDeckEngine';

interface SlideDeckPresenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectScope: string;
  domain: string;
  docArchetype: string;
  docMarkdown?: string;
  isLight: boolean;
}

export default function SlideDeckPresenterModal({
  isOpen,
  onClose,
  projectTitle,
  projectScope,
  domain,
  docArchetype,
  docMarkdown,
  isLight,
}: SlideDeckPresenterModalProps) {
  const [deck, setDeck] = useState<SlideDeck | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [isExportingPptx, setIsExportingPptx] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const generated = generateSlideDeck(projectTitle, projectScope, domain, docArchetype, docMarkdown);
      setDeck(generated);
      setActiveSlideIdx(0);
    }
  }, [isOpen, projectTitle, projectScope, domain, docArchetype, docMarkdown]);

  // Keyboard navigation (Arrow keys + F for fullscreen)
  useEffect(() => {
    if (!isOpen || !deck) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setActiveSlideIdx((prev) => Math.min(deck.slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveSlideIdx((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, deck, isFullscreen, onClose]);

  if (!isOpen || !deck) return null;

  const currentSlide = deck.slides[activeSlideIdx];

  const handleDownloadPptx = async () => {
    setIsExportingPptx(true);
    try {
      await exportSlideDeckToPptx(deck);
    } catch (err) {
      console.error('PPTX export error:', err);
    } finally {
      setIsExportingPptx(false);
    }
  };

  const handleOpenGoogleSlides = () => {
    window.open('https://slides.new', '_blank');
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn`}>
      <div className={`relative w-full ${isFullscreen ? 'h-full max-w-none rounded-none' : 'max-w-6xl max-h-[95vh] rounded-3xl'} flex flex-col overflow-hidden border shadow-2xl transition-all ${
        isLight ? 'bg-[#F8FAFC] border-slate-300 text-slate-900' : 'bg-[#070A13] border-slate-800 text-white'
      }`}>
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black truncate max-w-xs sm:max-w-md">{deck.deckTitle}</h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
                  16:9 Presentation
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Slide {activeSlideIdx + 1} of {deck.slides.length} &bull; {currentSlide.category.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpeakerNotes((prev) => !prev)}
              className={`p-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                showSpeakerNotes
                  ? 'bg-sky-500/20 text-sky-500 border border-sky-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title="Toggle Speaker Notes Drawer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Notes</span>
            </button>

            <button
              onClick={handleOpenGoogleSlides}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-colors"
              title="Open Google Slides tab to import presentation"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Slides</span>
            </button>

            <button
              onClick={handleDownloadPptx}
              disabled={isExportingPptx}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-md transition-all cursor-pointer"
              title="Download PowerPoint (.pptx) file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPptx ? 'Generating...' : 'Download .pptx'}</span>
            </button>

            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Fullscreen Mode (F)"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 hover:text-rose-500 text-slate-600 dark:text-slate-300 transition-colors"
              title="Close Presentation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 16:9 SLIDE VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-slate-900/50">
          <div className="w-full max-w-4xl aspect-[16/9] rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-2xl border transition-all relative overflow-hidden bg-gradient-to-br from-[#0B111E] via-[#0E172A] to-[#0A0F1D] border-slate-700/80 text-white">
            {/* Top Slide Header */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[11px] font-mono font-black uppercase tracking-widest text-sky-400">
                  {currentSlide.category.toUpperCase()} &bull; CHAPTER {currentSlide.slideNumber}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  PROMPTCANVAS 16:9 SPEC
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h2>

              {currentSlide.subtitle && (
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                  {currentSlide.subtitle}
                </p>
              )}
            </div>

            {/* Slide Body: Bullets & KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto py-2">
              {/* Left Col: Bullet Points */}
              <div className={`${currentSlide.kpiCards ? 'md:col-span-7' : 'md:col-span-12'} space-y-2.5`}>
                {currentSlide.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-sky-400 shrink-0 shadow-sm shadow-sky-400/50" />
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Col: KPI Cards */}
              {currentSlide.kpiCards && (
                <div className="md:col-span-5 grid grid-cols-1 gap-2.5 self-center">
                  {currentSlide.kpiCards.map((kpi, kIdx) => (
                    <div
                      key={kIdx}
                      className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-md flex items-center justify-between"
                    >
                      <div>
                        <div className="text-base sm:text-lg font-black text-sky-400">{kpi.value}</div>
                        <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">{kpi.label}</div>
                      </div>
                      {kpi.change && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {kpi.change}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Footer: Tech Tags & Slide Counter */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentSlide.techTags?.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="font-mono font-bold text-[11px] text-slate-500">
                {currentSlide.slideNumber} / {deck.slides.length}
              </div>
            </div>
          </div>
        </div>

        {/* SPEAKER NOTES DRAWER (IF TOGGLED) */}
        {showSpeakerNotes && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs space-y-1">
            <div className="flex items-center gap-2 text-sky-500 font-bold uppercase tracking-wider text-[10px]">
              <MessageSquare className="w-3.5 h-3.5" /> Speaker Presentation Script &amp; Notes
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {currentSlide.speakerNotes}
            </p>
          </div>
        )}

        {/* BOTTOM NAVIGATION CAROUSEL */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          {/* Previous Button */}
          <button
            onClick={() => setActiveSlideIdx((prev) => Math.max(0, prev - 1))}
            disabled={activeSlideIdx === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide Thumbnail Dots / Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {deck.slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSlideIdx(idx)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                  activeSlideIdx === idx
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20 scale-105'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setActiveSlideIdx((prev) => Math.min(deck.slides.length - 1, prev + 1))}
            disabled={activeSlideIdx === deck.slides.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
