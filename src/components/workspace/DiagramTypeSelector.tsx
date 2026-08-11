'use client';

import React from 'react';
import { getArchitectureTypeById } from '@/lib/architectureTypes';

import { getBlueprintLineage } from '@/lib/architectureLineage';

interface DiagramTypeSelectorProps {
  prompt: string;
  suggestedTypes: string[];
  assumptions?: string[];
  reasoning?: string;
  onSelectType: (typeId: string) => void;
  onCancel: () => void;
}

export function DiagramTypeSelector({
  prompt,
  suggestedTypes,
  assumptions = [],
  reasoning,
  onSelectType,
  onCancel
}: DiagramTypeSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-white animate-in fade-in duration-200">
        <div className="flex items-start justify-between">
          <div>
            <span className="px-2.5 py-1 text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-full inline-block mb-2">
              Clarify Intent
            </span>
            <h3 className="text-xl font-bold text-slate-100">Select Blueprint Architecture</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3.5 text-sm text-slate-300">
          <span className="font-semibold text-slate-200">Prompt:</span> &quot;{prompt}&quot;
          {reasoning && (
            <p className="mt-1 text-xs text-slate-400 italic">
              AI Note: {reasoning}
            </p>
          )}
        </div>

        {assumptions.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Stated Assumptions
            </span>
            <div className="flex flex-wrap gap-2">
              {assumptions.map((asm, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs bg-slate-800 text-slate-300 border border-slate-700 rounded-md"
                >
                  ⚡ {asm}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200 block">
            Choose the blueprint that best matches your target architecture:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestedTypes.map(typeId => {
              const opt = getArchitectureTypeById(typeId);
              const lineage = getBlueprintLineage(typeId);
              return (
                <button
                  key={typeId}
                  onClick={() => onSelectType(typeId)}
                  className="flex flex-col items-start p-4 bg-slate-800/80 hover:bg-sky-600/20 border border-slate-700 hover:border-sky-500/50 rounded-xl transition text-left group"
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${
                      lineage.isIndustrySpecialized 
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}>
                      {lineage.uniqueId}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {lineage.isIndustrySpecialized ? `🏭 ${lineage.industryName}` : lineage.phaseTitle.split(':')[0]}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-100 group-hover:text-white mb-1">
                    {opt.name}
                  </span>
                  <span className="text-xs text-slate-400 line-clamp-2">
                    {opt.whenToUse || opt.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
