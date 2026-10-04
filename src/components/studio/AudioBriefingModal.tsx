'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Volume2, Play, Pause, RotateCcw } from 'lucide-react';
import { ArchitectureAst } from '@/lib/ast/architectureAst';

interface AudioBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  ast?: ArchitectureAst;
  currentXml?: string;
}

function formatSeconds(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
}

export function AudioBriefingModal({
  isOpen,
  onClose,
  title,
  ast,
  currentXml,
}: AudioBriefingModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Dynamically synthesize transcript from active diagram AST / XML
  const transcript = useMemo(() => {
    const compNames: string[] = [];
    if (ast?.components && ast.components.length > 0) {
      for (const c of ast.components) {
        if (c.name && !compNames.includes(c.name)) {
          compNames.push(c.name);
        }
      }
    }
    if (compNames.length === 0 && currentXml) {
      const matches = Array.from(
        currentXml.matchAll(/<mxCell[^>]*\bvalue="([^"]+)"[^>]*\bvertex="1"/gi)
      );
      for (const m of matches) {
        const clean = m[1]
          .replace(/&lt;[^&]+&gt;/g, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/\s+/g, ' ')
          .trim();
        if (clean.length >= 3 && clean.length <= 55 && !compNames.includes(clean)) {
          compNames.push(clean);
        }
        if (compNames.length >= 6) break;
      }
    }

    const domain = ast?.metadata?.domain || 'Enterprise Cloud';
    const primaryRegion = ast?.metadata?.primaryRegion || 'us-central1';
    const sla = ast?.metadata?.slaTarget || '99.99%';
    const topNodes =
      compNames.slice(0, 5).join(', ') ||
      'Ingress Gateway, Core Orchestration Tier, Policy Gate, and Stateful Storage';
    const edgeCount = ast?.connections?.length || 0;

    return `Executive Architecture Briefing for ${title} (${domain}). This topology operates in primary region ${primaryRegion} with a target availability of ${sla}. Core architectural components on the active canvas include ${topNodes}${edgeCount > 0 ? `, interconnected across ${edgeCount} verified data flows` : ''}. End-to-end traffic enters through the perimeter ingress tier, undergoes policy and schema validation, and persists state with automated observability and failover telemetry.`;
  }, [title, ast, currentXml]);

  const totalDurationSec = useMemo(() => {
    const words = transcript.trim().split(/\s+/).length;
    return Math.max(15, Math.round((words / 145) * 60));
  }, [transcript]);

  const stopSpeech = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
      setElapsedSec(0);
    }
    return () => {
      stopSpeech();
    };
  }, [isOpen, transcript]);

  if (!isOpen) return null;

  const progress = Math.min(100, Math.round((elapsedSec / totalDurationSec) * 100));

  const handleTogglePlay = () => {
    if (typeof window === 'undefined') return;

    if (isPlaying) {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    // Start or resume speech synthesis
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.paused && elapsedSec > 0 && elapsedSec < totalDurationSec) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(transcript);
        utterance.rate = 1.02;
        utterance.pitch = 1.0;
        utterance.onend = () => {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsPlaying(false);
          setElapsedSec(totalDurationSec);
        };
        utterance.onerror = () => {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsPlaying(false);
        };
        window.speechSynthesis.speak(utterance);
      }
    }

    if (elapsedSec >= totalDurationSec) {
      setElapsedSec(0);
    }
    setIsPlaying(true);
    timerRef.current = setInterval(() => {
      setElapsedSec((prev) => {
        if (prev + 1 >= totalDurationSec) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsPlaying(false);
          return totalDurationSec;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleRestart = () => {
    stopSpeech();
    setElapsedSec(0);
  };

  return (
    <aside
      data-testid="studio-right-audio-panel"
      className="h-full shrink-0 w-[390px] sm:w-[420px] bg-white border-l border-slate-200 shadow-xl z-30 flex flex-col justify-between animate-in slide-in-from-right duration-200 text-slate-900"
    >
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Volume2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-slate-900 truncate">Executive Audio Briefing</h3>
            <p className="text-[11px] text-slate-500 font-mono truncate">Live Canvas-Grounded TTS Narration</p>
          </div>
        </div>
        <button
          onClick={() => {
            stopSpeech();
            onClose();
          }}
          title="Collapse right panel"
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
        {/* Audio Player Card */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              {isPlaying ? 'Speaking via Browser Speech Synthesis' : 'Ready to Narrate Active Topology'}
            </div>
            <div className="font-bold text-sm text-white">{title}</div>
            <div className="text-xs text-slate-400">
              Domain: {ast?.metadata?.domain || 'Enterprise Cloud'} &bull; {ast?.components?.length || 0} Active Nodes
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>{formatSeconds(elapsedSec)}</span>
              <span>{formatSeconds(totalDurationSec)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              onClick={handleRestart}
              title="Restart narration from beginning"
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleTogglePlay}
              title={isPlaying ? 'Pause narration' : 'Play live TTS narration'}
              className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full flex items-center justify-center font-bold shadow-lg transition cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Live Grounded Transcript */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2">
          <div className="font-bold text-slate-800 text-[11px]">Live Canvas-Derived Transcript:</div>
          <p className="text-[11px] leading-relaxed">{transcript}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
        <span className="text-[11px] text-slate-500 font-mono">Web Speech API • Side-by-Side Mode</span>
        <button
          onClick={() => {
            stopSpeech();
            onClose();
          }}
          className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition cursor-pointer"
        >
          Collapse
        </button>
      </div>
    </aside>
  );
}
