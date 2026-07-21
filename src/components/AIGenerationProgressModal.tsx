'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, Cpu } from 'lucide-react';

interface AIGenerationProgressModalProps {
  isOpen: boolean;
  promptTitle?: string;
}

export function AIGenerationProgressModal({ isOpen, promptTitle }: AIGenerationProgressModalProps) {
  const [progress, setProgress] = useState(10);
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const steps = [
    'Parsing system prompt & compliance requirements...',
    'Synthesizing multi-tier cloud infrastructure via Gemini 2.5 Flash...',
    'Validating node positions & compiling Draw.io XML schema...',
    'Finalizing canvas architecture & rendering workspace...'
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(10);
      setStepIndex(0);
      setElapsedSeconds(0);
      return;
    }

    // Live elapsed timer in seconds
    const timerInterval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [isOpen]);

  // Smoothly sync progress percentage and step index with real elapsed seconds
  useEffect(() => {
    if (!isOpen) return;

    if (elapsedSeconds < 8) {
      setStepIndex(0);
      setProgress(Math.min(30, 10 + Math.floor(elapsedSeconds * 2.5)));
    } else if (elapsedSeconds < 35) {
      setStepIndex(1);
      // Smoothly advance from 30% to 70% over 27 seconds
      const p = 30 + Math.floor(((elapsedSeconds - 8) / 27) * 40);
      setProgress(Math.min(70, p));
    } else if (elapsedSeconds < 75) {
      setStepIndex(2);
      // Smoothly advance from 70% to 92% over 40 seconds
      const p = 70 + Math.floor(((elapsedSeconds - 35) / 40) * 22);
      setProgress(Math.min(92, p));
    } else {
      setStepIndex(3);
      // Slowly advance past 92% up to 98% for extended 2-minute synthesis runs
      const p = 92 + Math.floor(((elapsedSeconds - 75) / 45) * 6);
      setProgress(Math.min(98, p));
    }
  }, [elapsedSeconds, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0b101d] border border-teal-500/30 rounded-3xl p-8 md:p-10 shadow-2xl shadow-teal-500/20 text-white flex flex-col items-center text-center">
        
        {/* Glow backdrop behind icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 blur-xl opacity-50 animate-pulse" />
          <div className="relative w-20 h-20 rounded-3xl bg-[#070a13] border border-teal-400/40 flex items-center justify-center shadow-inner">
            <Cpu className="w-10 h-10 text-teal-accent animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs md:text-sm font-extrabold mb-3">
          <Sparkles className="w-4 h-4 text-teal-accent animate-spin" />
          <span>Gemini 2.5 Flash Architecture Compiler</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Generating Architecture Canvas
        </h3>

        {promptTitle && (
          <p className="text-sm text-slate-400 max-w-md truncate italic mb-6">
            &quot;{promptTitle}&quot;
          </p>
        )}

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 text-left space-y-3">
          <div className="flex items-center justify-between text-xs md:text-sm font-extrabold">
            <span className="text-slate-200">Compilation Progress</span>
            <span className="text-teal-400 font-mono">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-teal-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] md:text-xs text-slate-400 font-mono">
            <span>Est. Duration: ~45–90s (Elapsed: {elapsedSeconds}s)</span>
            <span className="flex items-center gap-1.5 text-teal-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Live Synthesis
            </span>
          </div>
        </div>

        {/* Step-by-Step Status Checklist */}
        <div className="w-full space-y-2.5 text-left text-xs md:text-sm">
          {steps.map((stepText, idx) => {
            const isCompleted = idx < stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all border ${
                  isCompleted
                    ? 'bg-teal-500/10 border-teal-500/30 text-teal-200'
                    : isCurrent
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-white font-bold'
                    : 'bg-slate-900/40 border-slate-800/60 text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-400 shrink-0 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className="truncate">{stepText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
