'use client';

import React from 'react';
import { getArchitectureTypeById } from '@/lib/architectureTypes';

interface AssumptionBannerProps {
  assumptions?: string[];
  alternativeTypes?: string[];
  onSwitchType?: (typeId: string) => void;
  onDismiss?: () => void;
}

export function AssumptionBanner({
  assumptions = [],
  alternativeTypes = [],
  onSwitchType,
  onDismiss
}: AssumptionBannerProps) {
  if (assumptions.length === 0 && alternativeTypes.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-slate-900/90 border-b border-sky-500/30 px-6 py-3 text-white backdrop-blur-md transition-all flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
      <div className="flex flex-wrap items-center gap-3">
        {assumptions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-sky-400 flex items-center gap-1">
              ⚡ Stated Assumptions:
            </span>
            {assumptions.map((asm, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-sky-950/60 text-sky-200 border border-sky-800/50 rounded-md font-mono text-xs"
              >
                {asm}
              </span>
            ))}
          </div>
        )}

        {alternativeTypes.length > 0 && onSwitchType && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-slate-400">Switch to template:</span>
            {alternativeTypes.map(typeId => {
              const opt = getArchitectureTypeById(typeId);
              return (
                <button
                  key={typeId}
                  onClick={() => onSwitchType(typeId)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-sky-600/30 text-sky-300 hover:text-sky-200 border border-slate-700 hover:border-sky-500/50 rounded-md transition font-medium text-xs flex items-center gap-1"
                >
                  🔁 {opt.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded hover:bg-slate-800 transition"
          title="Dismiss assumptions"
        >
          ✕
        </button>
      )}
    </div>
  );
}
