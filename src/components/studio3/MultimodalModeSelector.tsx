'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  ChevronRight,
  Filter,
  Layers,
  Film,
  Zap,
  Play
} from 'lucide-react';
import {
  MULTIMODAL_MODES,
  MULTIMODAL_CATEGORIES,
  MultimodalMode
} from '@/lib/studio3/multimodalCatalog';

interface MultimodalModeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: MultimodalMode, promptText: string, autoGenerate?: boolean) => void;
  theme: 'dark' | 'light';
}

export const MultimodalModeSelector: React.FC<MultimodalModeSelectorProps> = ({
  isOpen,
  onClose,
  onSelectMode,
  theme
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setSearchQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter modes based on search query and category
  const filteredModes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MULTIMODAL_MODES.filter(mode => {
      const matchesCategory = selectedCategory === 'all' || mode.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        mode.name.toLowerCase().includes(q) ||
        mode.description.toLowerCase().includes(q) ||
        mode.category.toLowerCase().includes(q) ||
        mode.tags.some(tag => tag.toLowerCase().includes(q)) ||
        mode.samplePrompt.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#0B111E] border-slate-800 text-white'
            : 'bg-slate-900 border-slate-700 text-white'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* 1. MODAL HEADER & SEARCH BAR */}
        <div className="p-4 sm:p-5 border-b bg-slate-950/90 border-slate-800 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2 text-white">
                  <span>Multimodal Content Studio</span>
                  <span className="text-[10.5px] font-black px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 uppercase tracking-wider">
                    {MULTIMODAL_MODES.length} Formats
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select any content format to generate quizzes, mind maps, slide decks, podcasts, simulations, or visuals.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition shadow-sm"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search 36+ formats (e.g. 'quiz', 'mindmap', 'song', '3d', 'video', 'gantt', 'canvas')..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
            {MULTIMODAL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. MAIN MODES GRID VIEW */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#080D1A]">
          {filteredModes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Filter className="w-8 h-8 mx-auto text-slate-600" />
              <div className="text-xs font-bold text-slate-300">No generation formats match "{searchQuery}"</div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-purple-400 hover:underline font-semibold"
              >
                Clear search filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredModes.map(mode => (
                <div
                  key={mode.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-850 hover:border-purple-500/60 transition-all flex flex-col justify-between gap-3 group shadow-lg"
                >
                  {/* Top: Icon, Title & Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0 shadow-inner">
                          {mode.icon}
                        </span>
                        <div>
                          <div className="text-xs font-black tracking-tight text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                            <span>{mode.name}</span>
                          </div>
                          <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mt-0.5 flex items-center gap-1">
                            <span>{mode.categoryIcon}</span>
                            <span>{mode.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Target Tab Badge */}
                      <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 shrink-0 ${
                        mode.targetTab === 'canvas'
                          ? 'bg-blue-950 text-blue-300 border-blue-800'
                          : 'bg-purple-950 text-purple-300 border-purple-800'
                      }`}>
                        {mode.targetTab === 'canvas' ? <Layers className="w-2.5 h-2.5 text-blue-400" /> : <Film className="w-2.5 h-2.5 text-purple-400" />}
                        <span>{mode.targetTab === 'canvas' ? 'Draw.io' : 'Media Stage'}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[11.5px] text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                      {mode.description}
                    </p>
                  </div>

                  {/* Bottom: Sample Prompt & Action Buttons */}
                  <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectMode(mode, mode.samplePrompt, true)}
                      className="text-[11px] text-slate-400 hover:text-purple-300 truncate max-w-[220px] text-left transition flex items-center gap-1 group/try"
                      title={`Generate immediately with sample: "${mode.samplePrompt}"`}
                    >
                      <Zap className="w-3 h-3 text-amber-400 shrink-0 group-hover/try:scale-110" />
                      <span className="truncate italic">"{mode.samplePrompt}"</span>
                    </button>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onSelectMode(mode, mode.samplePrompt, true)}
                        className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10.5px] font-black transition flex items-center gap-1 shadow-sm active:scale-95"
                        title="Generate immediately with sample prompt"
                      >
                        <Play className="w-2.5 h-2.5 fill-white" />
                        <span>Run</span>
                      </button>

                      <button
                        onClick={() => onSelectMode(mode, mode.promptScaffold, false)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-[10.5px] font-bold transition flex items-center gap-1 active:scale-95"
                        title="Load prompt scaffold into chat input"
                      >
                        <span>Scaffold</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. MODAL FOOTER */}
        <div className="px-5 py-2.5 border-t bg-slate-950 border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong className="text-white">{filteredModes.length}</strong> of {MULTIMODAL_MODES.length} content modes</span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">ESC</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
