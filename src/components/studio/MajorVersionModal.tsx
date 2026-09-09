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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#0B111E] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Tag Major Milestone Version</h2>
              <p className="text-[11px] text-slate-400 font-mono">Promote {currentVersion} to release milestone {nextMajorVersion}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">Current Working Version</span>
              <span className="font-mono font-bold text-slate-300 text-sm">{currentVersion}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 block">New Major Release</span>
              <span className="font-mono font-black text-emerald-400 text-sm">{nextMajorVersion}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Milestone Release Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={releaseName}
              onChange={e => setReleaseName(e.target.value)}
              placeholder="e.g. Phase 1 Architecture Review Sign-Off"
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Release Notes &amp; Architectural Summary
            </label>
            <textarea
              rows={3}
              value={releaseNotes}
              onChange={e => setReleaseNotes(e.target.value)}
              placeholder="Key architectural decisions, DR SLA sign-off, or components approved in this major release..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm Release {nextMajorVersion}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
