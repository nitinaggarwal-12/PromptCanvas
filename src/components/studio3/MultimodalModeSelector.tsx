'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  ChevronRight,
  Filter,
  Check,
  Layers,
  Film,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import {
  MULTIMODAL_MODES,
  MULTIMODAL_CATEGORIES,
  MultimodalMode
} from '@/lib/studio3/multimodalCatalog';

interface MultimodalModeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: MultimodalMode, promptText: string) => void;
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
  const [selectedModeId, setSelectedModeId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
      setSelectedCategory('all');
      setSelectedModeId(null);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#0B111E] border-slate-800 text-white'
            : 'bg-white border-slate-300 text-slate-900'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* 1. MODAL HEADER & SEARCH BAR */}
        <div className={`p-4 sm:p-5 border-b flex flex-col gap-3 ${
          theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                  <span>Multimodal Content Studio</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 uppercase tracking-wider">
                    {MULTIMODAL_MODES.length} Formats
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Select any content format to scaffold and generate images, animations, audio, quizzes, or diagrams.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300 shadow-xs'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by format, keywords (e.g. 'quiz', 'mindmap', 'song', '3d', 'video', 'gantt', 'canvas')..."
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition ${
                theme === 'dark'
                  ? 'bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
                  : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 shadow-inner'
              }`}
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
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : theme === 'dark'
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. MAIN MODES GRID VIEW */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredModes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Filter className="w-8 h-8 mx-auto text-slate-600" />
              <div className="text-xs font-bold">No generation formats match "${searchQuery}"</div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-[11px] text-purple-400 hover:underline font-semibold"
              >
                Clear search filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredModes.map(mode => (
                <div
                  key={mode.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 group hover:border-purple-500/60 shadow-md ${
                    theme === 'dark'
                      ? 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/80'
                      : 'bg-slate-50/80 border-slate-200 hover:bg-white'
                  }`}
                >
                  {/* Top: Icon, Title & Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                          {mode.icon}
                        </span>
                        <div>
                          <div className="text-xs font-black tracking-tight group-hover:text-purple-400 transition-colors flex items-center gap-1.5">
                            <span>{mode.name}</span>
                          </div>
                          <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mt-0.5">
                            {mode.categoryIcon} {mode.category}
                          </div>
                        </div>
                      </div>

                      {/* Target Tab Badge */}
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 shrink-0 ${
                        mode.targetTab === 'canvas'
                          ? 'bg-blue-950 text-blue-300 border-blue-800'
                          : 'bg-purple-950 text-purple-300 border-purple-800'
                      }`}>
                        {mode.targetTab === 'canvas' ? <Layers className="w-2.5 h-2.5" /> : <Film className="w-2.5 h-2.5" />}
                        <span>{mode.targetTab === 'canvas' ? 'Draw.io' : 'Media Stage'}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed line-clamp-2">
                      {mode.description}
                    </p>
                  </div>

                  {/* Bottom: Sample Prompt & Action Buttons */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectMode(mode, mode.samplePrompt)}
                      className="text-[10.5px] text-slate-400 hover:text-purple-300 truncate max-w-[240px] text-left transition flex items-center gap-1"
                      title={`Try sample prompt: ${mode.samplePrompt}`}
                    >
                      <span className="font-bold text-purple-400 shrink-0">Try:</span>
                      <span className="truncate italic">"{mode.samplePrompt}"</span>
                    </button>

                    <button
                      onClick={() => onSelectMode(mode, mode.promptScaffold)}
                      className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[10.5px] font-black transition flex items-center gap-1 shrink-0 shadow-sm active:scale-95"
                    >
                      <span>Select</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. MODAL FOOTER */}
        <div className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] text-slate-400 ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <span>Showing {filteredModes.length} of {MULTIMODAL_MODES.length} content modes</span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[9.5px] font-mono text-slate-300">ESC</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
