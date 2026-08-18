'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Square,
  ArrowRight,
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface WelcomeGetStartedSlateProps {
  projectName?: string;
  theme?: 'light' | 'dark';
  isGenerating?: boolean;
  onGenerateFromPrompt: (prompt: string, projectName?: string) => void;
  onOpenBlueprintCatalog: () => void;
  onStartBlankCanvas: (projectName?: string) => void;
}

export const WelcomeGetStartedSlate: React.FC<WelcomeGetStartedSlateProps> = ({
  projectName,
  theme = 'dark',
  isGenerating = false,
  onGenerateFromPrompt,
  onOpenBlueprintCatalog,
  onStartBlankCanvas
}) => {
  const [promptText, setPromptText] = useState('');
  const isLight = theme === 'light';

  const quickPrompts = [
    {
      title: "GKE Microservices",
      prompt: "Design an E-Commerce microservices platform on GKE Autopilot with Cloud Armor WAF and MemoryStore Redis."
    },
    {
      title: "Real-time LLMOps",
      prompt: "Architect a real-time LLMOps pipeline with Vertex AI Studio, Cloud Build CI/CD, and BigQuery logging."
    },
    {
      title: "FinTech Gateway",
      prompt: "Build a PCI-DSS FinTech payment gateway with Cloud KMS HSM, Pub/Sub DLQ, and multi-region Spanner."
    }
  ];

  const popularBlueprints = [
    { label: "10. Unified System", phase: "Phase 7" },
    { label: "03. Agentic RAG", phase: "Phase 3" },
    { label: "02. ERD Schema", phase: "Phase 2" },
    { label: "04. Kafka Stream", phase: "Phase 4" },
    { label: "09. Zero-Trust", phase: "Phase 5" }
  ];

  const handleSubmitPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isGenerating) return;
    onGenerateFromPrompt(promptText.trim(), projectName);
  };

  return (
    <div className={`w-full h-full overflow-y-auto px-4 py-4 md:px-8 md:py-6 relative flex flex-col justify-start select-none transition-colors duration-300 ${
      isLight
        ? 'bg-[#F8FAFC] text-slate-900'
        : 'bg-gradient-to-b from-[#090d16] via-[#070a12] to-[#04060a] text-slate-100'
    }`}>
      
      {/* Subtle Grid / Dot Matrix Background */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(15, 23, 42, 0.7) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(20, 184, 166, 0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Glowing Ambient Radial Backdrop Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Wide Container (reclaiming empty desktop width while vertically compact) */}
      <div className="max-w-[1550px] w-full mx-auto z-10 space-y-4 md:space-y-5 animate-fade-in my-auto">
        
        {/* Header Title & Subtitle - Vertically Compressed */}
        <div className="text-center space-y-1.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 shadow-sm">
            <Sparkles className="w-3 h-3 text-teal-500 dark:text-teal-400" />
            <span>{projectName ? `Project: ${projectName}` : 'PromptCanvas AI Studio'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
            {projectName ? (
              <>
                How would you like to build{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500">
                  {projectName}
                </span>
                ?
              </>
            ) : (
              <>
                How would you like to start your{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500">
                  architecture?
                </span>
              </>
            )}
          </h1>
          <p className={`text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {projectName
              ? `Describe your system requirements for ${projectName}, select a pre-verified enterprise blueprint, or start with a blank canvas.`
              : 'Describe your system in natural language, select a pre-verified enterprise blueprint, or start with a blank canvas.'}
          </p>
        </div>

        {/* 3 Main Choice Cards Grid - Vertically Compressed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          
          {/* CARD 1: Describe Architecture (AI Studio) */}
          <div className={`rounded-2xl p-5 sm:p-6 border flex flex-col justify-between transition-all shadow-md relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-teal-100/60'
              : 'bg-[#0B101D] border-panel-border/70 hover:border-teal-500/60 hover:shadow-teal-900/30'
          }`}>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  AI Generator
                </span>
              </div>

              <div>
                <h2 className="font-black text-lg sm:text-xl">Describe with AI</h2>
                <p className={`text-xs sm:text-sm mt-1 leading-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Type system requirements. Gemini 3.7 Flash will compile it into collision-free vector architecture.
                </p>
              </div>

              <form onSubmit={handleSubmitPrompt} className="space-y-2.5 pt-0.5">
                <div className="relative">
                  <textarea
                    rows={2}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="e.g. Multi-AZ GKE cluster with Cloud Armor WAF, Cloud SQL and Redis caching..."
                    className={`w-full text-xs sm:text-sm rounded-xl p-3 border outline-none font-medium resize-none transition-all leading-normal shadow-inner ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 focus:border-teal-500 focus:bg-white text-slate-900 placeholder-slate-400'
                        : 'bg-[#070A13] border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!promptText.trim() || isGenerating}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 disabled:opacity-40 text-[#070A13] font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{isGenerating ? 'Compiling Architecture...' : '⚡ Generate Architecture'}</span>
                </button>
              </form>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 mt-3 space-y-1.5">
              <span className={`text-[10px] font-black uppercase tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                💡 Quick Example Prompts:
              </span>
              <div className="space-y-1">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPromptText(qp.prompt)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer border ${
                      isLight
                        ? 'bg-slate-50 hover:bg-teal-50/70 border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-900'
                        : 'bg-[#070A13] hover:bg-slate-800/90 border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-teal-300'
                    }`}
                    title={qp.prompt}
                  >
                    <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400">{qp.title}</div>
                    <div className="text-[10px] truncate text-slate-500 dark:text-slate-400">{qp.prompt}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 2: Browse 50 Enterprise Blueprints */}
          <div className={`rounded-2xl p-5 sm:p-6 border flex flex-col justify-between transition-all shadow-md relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-purple-400 hover:shadow-purple-100/60'
              : 'bg-[#0B101D] border-panel-border/70 hover:border-purple-500/60 hover:shadow-purple-900/30'
          }`}>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Verified Catalog
                </span>
              </div>

              <div>
                <h2 className="font-black text-lg sm:text-xl">50 Enterprise Blueprints</h2>
                <p className={`text-xs sm:text-sm mt-1 leading-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  50 verified reference architectures across 7 lifecycle phases (Business, Security, Data, DevOps, SRE).
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Phase 1–7 Enterprise Matrices</div>
                    <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Conceptual, ERD, Microservices, Infrastructure</div>
                  </div>
                </div>

                <div className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Domain-Specific Golden Templates</div>
                    <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>FinTech, LLMOps, Healthcare, Cybersecurity, IoT</div>
                  </div>
                </div>

                <div className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Zero-Trust &amp; CIS Hardened</div>
                    <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Pre-audited boundaries &amp; Infracost estimates</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
              <div className={`text-[10px] font-black uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Popular Blueprints:
              </div>
              <div className="flex flex-wrap gap-1">
                {popularBlueprints.map((bp, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                      isLight
                        ? 'bg-purple-50 border-purple-200 text-purple-900'
                        : 'bg-purple-950/40 border-purple-500/30 text-purple-300'
                    }`}
                  >
                    {bp.label}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={onOpenBlueprintCatalog}
                className={`w-full py-2.5 px-4 rounded-xl border font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-1 ${
                  isLight
                    ? 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900 shadow-purple-100'
                    : 'bg-purple-950/60 hover:bg-purple-900/80 border-purple-500/40 text-purple-200 shadow-purple-950/40'
                }`}
              >
                <span>Browse 50 Blueprint Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD 3: Start Blank Canvas */}
          <div className={`rounded-2xl p-5 sm:p-6 border flex flex-col justify-between transition-all shadow-md relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-slate-100/60'
              : 'bg-[#0B101D] border-panel-border/70 hover:border-slate-500 hover:shadow-slate-900/30'
          }`}>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
                  <Square className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Vector Workspace
                </span>
              </div>

              <div>
                <h2 className="font-black text-lg sm:text-xl">Start Blank Canvas</h2>
                <p className={`text-xs sm:text-sm mt-1 leading-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Open a clean canvas with infinite grid and Google Cloud enterprise stencil libraries.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Full Draw.io Vector Power</div>
                    <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Connectors, swimlanes, orthogonal routing &amp; custom layers</div>
                  </div>
                </div>

                <div className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Official Cloud Stencils Built-in</div>
                    <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Google Cloud, Kubernetes, AI Agents &amp; Network icons</div>
                  </div>
                </div>

                <div className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>AI Co-Pilot On Demand</div>
                    <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Ask Gemini to expand, audit, or refactor anytime</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
              <div className={`text-[10px] font-black uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Included Stencils:
              </div>
              <div className="flex flex-wrap gap-1">
                {["Google Cloud", "Kubernetes", "AI Agents", "Networking", "Databases"].map((st, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                      isLight
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                        : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
                    }`}
                  >
                    {st}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onStartBlankCanvas(projectName)}
                className={`w-full py-2.5 px-4 rounded-xl border font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-1 ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900 shadow-slate-200'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white shadow-slate-900/50'
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
