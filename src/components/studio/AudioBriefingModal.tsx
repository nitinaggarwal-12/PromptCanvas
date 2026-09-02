'use client';

import React from 'react';
import { X, Volume2, Play, Pause, RotateCcw } from 'lucide-react';

interface AudioBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function AudioBriefingModal({ isOpen, onClose, title }: AudioBriefingModalProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(35);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Executive Audio Overview (2-Min)</h3>
              <p className="text-[10px] text-slate-400 font-mono">NotebookLM-Style Synthetic Architecture Briefing</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Player Card */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">AI Executive Briefing</div>
            <div className="font-bold text-sm text-white">{title}</div>
            <div className="text-xs text-slate-400">Co-Hosts: Alex (Principal Cloud Architect) & Sarah (SRE Lead)</div>
          </div>

          {/* Animated Waveform / Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>0:42</span>
              <span>2:00</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button 
              onClick={() => setProgress(0)}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full flex items-center justify-center font-bold shadow-lg transition"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Transcript Snippet */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1.5">
          <div className="font-bold text-slate-800 text-[11px]">Transcript Excerpt:</div>
          <p className="italic text-[11px]">
            "...In today's walkthrough, we're examining the NexusPay multi-region mesh. Notice how Cloud Spanner nam3 leader in us-central1 maintains continuous synchronous replication over Google's private fiber backbone to the europe-west1 witness replica, guaranteeing zero RPO..."
          </p>
        </div>

      </div>
    </div>
  );
}
