'use client';

import React, { useState } from 'react';
import { LayoutGrid, ChevronDown, Monitor, Smartphone, Square, Presentation, Maximize2 } from 'lucide-react';
import { ASPECT_RATIO_PRESETS, AspectRatioOption } from '@/lib/aspectRatioLayout';

interface AspectRatioSelectorProps {
  selectedRatio: string;
  customWidth?: number;
  customHeight?: number;
  onChangeRatio: (ratioId: string, customW?: number, customH?: number) => void;
  compact?: boolean;
}

export function AspectRatioSelector({
  selectedRatio,
  customWidth = 16,
  customHeight = 10,
  onChangeRatio,
  compact = false,
}: AspectRatioSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [custW, setCustW] = useState<number>(customWidth);
  const [custH, setCustH] = useState<number>(customHeight);

  const activePreset = ASPECT_RATIO_PRESETS.find(p => p.id === selectedRatio) || ASPECT_RATIO_PRESETS[0];

  const getIcon = (id: string) => {
    switch (id) {
      case '16:9':
        return <Monitor className="w-4 h-4 text-sky-400" />;
      case '4:3':
        return <Presentation className="w-4 h-4 text-emerald-400" />;
      case '1:1':
        return <Square className="w-4 h-4 text-amber-400" />;
      case '9:16':
        return <Smartphone className="w-4 h-4 text-purple-400" />;
      case '21:9':
        return <Maximize2 className="w-4 h-4 text-indigo-400" />;
      default:
        return <LayoutGrid className="w-4 h-4 text-pink-400" />;
    }
  };

  const handleSelectPreset = (preset: AspectRatioOption) => {
    if (preset.id === 'custom') {
      onChangeRatio('custom', custW, custH);
    } else {
      onChangeRatio(preset.id);
    }
    setIsOpen(false);
  };

  const handleApplyCustom = () => {
    if (custW > 0 && custH > 0) {
      onChangeRatio('custom', custW, custH);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800 text-slate-200 transition-colors text-xs font-semibold shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500`}
        title="Change Diagram Aspect Ratio & Auto-Organize Layout"
      >
        {getIcon(selectedRatio)}
        <span>
          {selectedRatio === 'custom' ? `Custom (${custW}:${custH})` : activePreset.label}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl z-50 p-2 space-y-1">
          <div className="px-2.5 py-1.5 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Aspect Ratio & Layout</span>
            <span className="text-[10px] text-sky-400 font-normal">Auto-Fit</span>
          </div>

          <div className="space-y-0.5 max-h-60 overflow-y-auto pt-1">
            {ASPECT_RATIO_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  selectedRatio === preset.id
                    ? 'bg-sky-500/15 border border-sky-500/30 text-sky-300'
                    : 'hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="mt-0.5">{getIcon(preset.id)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold flex items-center justify-between">
                    <span>{preset.label}</span>
                    <span className="text-[10px] text-slate-500">{preset.id}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{preset.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Aspect Ratio Inputs */}
          {selectedRatio === 'custom' && (
            <div className="p-2 border-t border-slate-800 mt-2 space-y-2 bg-slate-950/60 rounded-lg">
              <div className="text-[11px] font-semibold text-slate-300">Custom Ratio (W : H)</div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={custW}
                  onChange={e => setCustW(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-center text-xs text-white focus:border-sky-500 focus:outline-none"
                  placeholder="W"
                />
                <span className="text-slate-400 font-bold">:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={custH}
                  onChange={e => setCustH(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-center text-xs text-white focus:border-sky-500 focus:outline-none"
                  placeholder="H"
                />
                <button
                  onClick={handleApplyCustom}
                  className="flex-1 px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
