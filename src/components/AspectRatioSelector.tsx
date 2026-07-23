'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ASPECT_RATIO_PRESETS } from '@/lib/aspectRatioLayout';

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
}: AspectRatioSelectorProps) {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [custW, setCustW] = useState<number>(customWidth);
  const [custH, setCustH] = useState<number>(customHeight);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'custom') {
      setIsCustomModalOpen(true);
    } else {
      onChangeRatio(val);
    }
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (custW > 0 && custH > 0) {
      onChangeRatio('custom', custW, custH);
      setIsCustomModalOpen(false);
    }
  };

  return (
    <div className="relative inline-flex items-center shrink-0 w-[145px]">
      <select
        value={selectedRatio}
        onChange={handleSelectChange}
        title="Change Diagram Aspect Ratio & Auto-Organize Layout"
        className="appearance-none bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-sky-500/50 text-sky-300 font-bold text-xs rounded-lg pl-2.5 pr-6 py-1.5 outline-none cursor-pointer transition-all shadow-sm focus:ring-2 focus:ring-sky-400/30 w-[145px] truncate"
      >
        <option value="" disabled className="bg-[#0b101d] text-slate-400 py-1 font-bold">
          📐 Aspect Ratio ▾
        </option>
        {ASPECT_RATIO_PRESETS.map((preset) => (
          <option
            key={preset.id}
            value={preset.id}
            className="bg-[#0b101d] text-slate-200 py-1 font-semibold"
          >
            {preset.id === 'custom'
              ? `📐 Custom (${custW}:${custH})`
              : `📐 ${preset.label}`}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-sky-400 absolute right-2 pointer-events-none" />

      {/* Custom Aspect Ratio Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Custom Aspect Ratio (W : H)</h3>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplyCustom} className="space-y-4">
              <p className="text-xs text-slate-400">
                Enter your target width and height ratio bounds (e.g. 16:10, 3:2, 5:4, 21:9):
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Width Ratio</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={custW}
                    onChange={(e) => setCustW(parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center text-sm font-bold text-sky-300 focus:border-sky-500 focus:outline-none"
                    placeholder="Width"
                    required
                  />
                </div>

                <span className="text-slate-400 font-extrabold text-lg mt-4">:</span>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Height Ratio</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={custH}
                    onChange={(e) => setCustH(parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center text-sm font-bold text-sky-300 focus:border-sky-500 focus:outline-none"
                    placeholder="Height"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-lg shadow-sky-500/20"
                >
                  Apply & Auto-Organize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
