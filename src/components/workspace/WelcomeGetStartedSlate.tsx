'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Square,
  ArrowRight,
  Loader2,
  Compass,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface WelcomeGetStartedSlateProps {
  theme?: 'light' | 'dark';
  isGenerating?: boolean;
  onGenerateFromPrompt: (prompt: string, projectName?: string) => void;
  onOpenBlueprintCatalog: () => void;
  onStartBlankCanvas: () => void;
}

export const WelcomeGetStartedSlate: React.FC<WelcomeGetStartedSlateProps> = ({
  theme = 'dark',
  isGenerating = false,
  onGenerateFromPrompt,
  onOpenBlueprintCatalog,
  onStartBlankCanvas
}) => {
  const [promptText, setPromptText] = useState('');
  const isLight = theme === 'light';

  const quickPrompts = [
    "Design an E-Commerce microservices platform on GKE Autopilot with Cloud Armor, Cloud SQL read-replicas, and MemoryStore Redis.",
    "Architect a real-time LLMOps pipeline with Vertex AI Studio, Cloud Build CI/CD, Model Registry, and BigQuery logging.",
    "Build a PCI-DSS FinTech payment gateway with Cloud KMS HSM, Pub/Sub DLQ, and multi-region Spanner ledger."
  ];

  const handleSubmitPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isGenerating) return;
    onGenerateFromPrompt(promptText.trim());
  };

  return (
    <div className={`w-full h-full overflow-y-auto p-6 md:p-12 relative flex items-center justify-center ${
      isLight
        ? 'bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900'
        : 'bg-gradient-to-b from-[#090d16] to-[#05080e] text-slate-100'
    }`}>
      
      {/* Subtle Dot Matrix Background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(15, 23, 42, 0.6) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(20, 184, 166, 0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-5xl w-full z-10 space-y-8 animate-fade-in my-auto py-6">
        
        {/* Header Title & Subtitle */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400">
            <Sparkles className="w-3.5 h-3.5" /> PromptCanvas AI Studio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            How would you like to start your architecture?
          </h2>
          <p className={`text-sm md:text-base max-w-2xl mx-auto font-medium ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Choose how to begin your cloud design. You can describe your system in plain English, select a pre-verified enterprise blueprint, or start with a clean blank canvas.
          </p>
        </div>

        {/* 3 Main Choice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          
          {/* CARD 1: Describe Architecture (AI Studio) */}
          <div className={`rounded-2xl p-5 md:p-6 border flex flex-col justify-between transition-all md:col-span-1 shadow-lg ${
            isLight
              ? 'bg-white border-teal-200 hover:border-teal-400 hover:shadow-teal-100/50'
              : 'bg-slate-900/90 border-teal-500/40 hover:border-teal-400 hover:shadow-teal-900/20'
          }`}>
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base md:text-lg">Describe with AI</h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Type your system requirements in natural language. Gemini 3.7 Flash will compile it into zero-trust Draw.io vector shapes.
                </p>
              </div>

              <form onSubmit={handleSubmitPrompt} className="space-y-2.5 pt-1">
                <textarea
                  rows={3}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. Design a multi-AZ GKE cluster with Cloud Armor WAF, Cloud SQL read-replicas, and MemoryStore Redis..."
                  className={`w-full text-xs rounded-xl p-2.5 border outline-none font-medium resize-none transition-all ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-950 border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!promptText.trim() || isGenerating}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-accent hover:bg-teal-hover disabled:opacity-50 text-bg-dark font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Generate Architecture</span>
                </button>
              </form>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 mt-3">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Try an example:
              </span>
              <div className="space-y-1">
                {quickPrompts.slice(0, 2).map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPromptText(qp)}
                    className={`w-full text-left text-[10px] font-medium p-1.5 rounded-lg truncate transition-colors ${
                      isLight
                        ? 'bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800'
                        : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-teal-300'
                    }`}
                    title={qp}
                  >
                    💡 {qp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 2: Browse 50 Enterprise Blueprints */}
          <div className={`rounded-2xl p-5 md:p-6 border flex flex-col justify-between transition-all md:col-span-1 shadow-lg ${
            isLight
              ? 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-purple-100/50'
              : 'bg-slate-900/90 border-purple-500/40 hover:border-purple-400 hover:shadow-purple-900/20'
          }`}>
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base md:text-lg">50 Enterprise Blueprints</h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Select from 50 verified reference architectures across 7 enterprise lifecycle phases (Business, Security, Data, DevOps, SRE).
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs font-semibold">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Phase 1–7 Enterprise Matrices</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>FinTech, LLMOps, Healthcare &amp; Cloud</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>CIS GCP &amp; Zero-Trust Pre-audited</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onOpenBlueprintCatalog}
                className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] ${
                  isLight
                    ? 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900'
                    : 'bg-purple-950/60 hover:bg-purple-900/80 border-purple-500/40 text-purple-200'
                }`}
              >
                <span>Browse Blueprint Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD 3: Start Blank Canvas */}
          <div className={`rounded-2xl p-5 md:p-6 border flex flex-col justify-between transition-all md:col-span-1 shadow-lg ${
            isLight
              ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-slate-100/50'
              : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-500 hover:shadow-slate-900/20'
          }`}>
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <Square className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base md:text-lg">Start Blank Canvas</h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Open a clean Draw.io canvas with infinite grid and Google Cloud enterprise stencil libraries ready for manual design.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs font-semibold">
                <div className={`flex items-center gap-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                  <span>Full Draw.io Vector Capability</span>
                </div>
                <div className={`flex items-center gap-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                  <span>Loaded with Official GCP Stencils</span>
                </div>
                <div className={`flex items-center gap-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                  <span>Ask Gemini to refine anytime</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onStartBlankCanvas}
                className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white'
                }`}
              >
                <span>Open Blank Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
