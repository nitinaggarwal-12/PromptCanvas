'use client';

import React, { useState } from 'react';
import { Tag, X, Check, ArrowRight } from 'lucide-react';

interface MajorVersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVersion: string;
  nextMajorVersion: string;
  onConfirmMajorVersion: (releaseName: string, releaseNotes: string) => void;
}

export function MajorVersionModal({
  isOpen,
  onClose,
  currentVersion,
  nextMajorVersion,
  onConfirmMajorVersion
}: MajorVersionModalProps) {
  const [releaseName, setReleaseName] = useState('');
  const [releaseNotes, setReleaseNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmMajorVersion(
      releaseName.trim() || `Production Architecture Baseline ${nextMajorVersion}`,
      releaseNotes.trim()
    );
  };

  return (
    <aside
      data-testid="studio-right-major-version-panel"
      className="h-full shrink-0 w-[390px] sm:w-[420px] bg-white border-l border-slate-200 shadow-xl z-30 overflow-hidden flex flex-col justify-between animate-in slide-in-from-right duration-200 text-slate-900"
      onClick={e => e.stopPropagation()}
    >
      <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Tag className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight truncate">Tag Major Milestone Version</h2>
            <p className="text-[11px] text-slate-500 font-mono truncate">Promote {currentVersion} &rarr; {nextMajorVersion}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          title="Collapse right panel"
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4 flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Current Working Version</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{currentVersion}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-700 block">New Major Release</span>
              <span className="font-mono font-black text-emerald-600 text-sm">{nextMajorVersion}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Milestone Release Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={releaseName}
              onChange={e => setReleaseName(e.target.value)}
              placeholder="e.g. Phase 1 Architecture Review Sign-Off"
              className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Release Notes &amp; Architectural Summary
            </label>
            <textarea
              rows={4}
              value={releaseNotes}
              onChange={e => setReleaseNotes(e.target.value)}
              placeholder="Key architectural decisions, DR SLA sign-off, or components approved in this major release..."
              className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          >
            Collapse
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm Release {nextMajorVersion}</span>
          </button>
        </div>
      </form>
    </aside>
  );
}
