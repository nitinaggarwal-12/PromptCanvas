'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, Cpu } from 'lucide-react';

interface AIGenerationProgressModalProps {
  isOpen: boolean;
  promptTitle?: string;
  onCancel?: () => void;
}

export function AIGenerationProgressModal({ isOpen, promptTitle, onCancel }: AIGenerationProgressModalProps) {
  const [progress, setProgress] = useState(15);
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const steps = [
    'Parsing domain prompt, actors & compliance guidelines...',
    'Calculating 2D zero-collision spatial layout & routing channels...',
    'Executing pre-flight AST line validation & node contrast check...',
    'Finalizing canvas architecture & rendering high-craft workspace...'
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(15);
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

  // Smoothly sync progress percentage and step index with real elapsed seconds (tuned for 12-25s fast synthesis)
  useEffect(() => {
    if (!isOpen) return;

    if (elapsedSeconds < 4) {
      setStepIndex(0);
      setProgress(Math.min(35, 15 + Math.floor(elapsedSeconds * 5)));
    } else if (elapsedSeconds < 14) {
      setStepIndex(1);
      const p = 35 + Math.floor(((elapsedSeconds - 4) / 10) * 40);
      setProgress(Math.min(75, p));
    } else if (elapsedSeconds < 24) {
      setStepIndex(2);
      const p = 75 + Math.floor(((elapsedSeconds - 14) / 10) * 18);
      setProgress(Math.min(93, p));
    } else {
      setStepIndex(3);
      const p = 93 + Math.floor(((elapsedSeconds - 24) / 20) * 5);
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
          <span>Gemini 3.7 Flash Architecture Engine</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Generating Architecture Canvas
        </h3>

        {promptTitle && (
          <p className="text-sm text-slate-300 max-w-md line-clamp-2 italic mb-6 px-4 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
            &ldquo;{promptTitle}&rdquo;
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
            <span>Est. Duration: ~15–25s (Elapsed: {elapsedSeconds}s)</span>
            <span className="flex items-center gap-1.5 text-teal-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Live Synthesis
            </span>
          </div>
        </div>

        {/* Step-by-Step Status Checklist */}
        <div className="w-full space-y-2.5 text-left text-xs md:text-sm mb-6">
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

        {/* Action Controls: Cancel Button */}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
          >
            Cancel Generation
          </button>
        )}
      </div>
    </div>
  );
}
