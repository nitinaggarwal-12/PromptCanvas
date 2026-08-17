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
  CheckCircle2,
  Zap,
  Boxes,
  Database,
  Cloud
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
    {
      title: "GKE Microservices Platform",
      prompt: "Design an E-Commerce microservices platform on GKE Autopilot with Cloud Armor WAF, Cloud SQL read-replicas, and MemoryStore Redis."
    },
    {
      title: "Real-time LLMOps Pipeline",
      prompt: "Architect a real-time LLMOps pipeline with Vertex AI Studio, Cloud Build CI/CD, Model Registry, and BigQuery logging."
    },
    {
      title: "PCI-DSS FinTech Gateway",
      prompt: "Build a PCI-DSS FinTech payment gateway with Cloud KMS HSM, Pub/Sub DLQ, and multi-region Spanner ledger."
    }
  ];

  const popularBlueprints = [
    { label: "10. Unified System View", phase: "Phase 7" },
    { label: "03. Agentic RAG Cognitive", phase: "Phase 3" },
    { label: "02. Dimensional ERD Schema", phase: "Phase 2" },
    { label: "04. Kafka Event Stream", phase: "Phase 4" },
    { label: "09. Zero-Trust State Machine", phase: "Phase 5" }
  ];

  const handleSubmitPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isGenerating) return;
    onGenerateFromPrompt(promptText.trim());
  };

  return (
    <div className={`w-full h-full overflow-y-auto p-6 sm:p-10 md:p-14 lg:p-16 relative flex flex-col justify-between select-none transition-colors duration-300 ${
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Wide Container (reclaiming empty desktop width) */}
      <div className="max-w-[1600px] w-full mx-auto z-10 space-y-10 lg:space-y-14 animate-fade-in my-auto py-4">
        
        {/* Header Title & Subtitle */}
        <div className="text-center space-y-3.5 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 shadow-sm">
            <Sparkles className="w-4 h-4 text-teal-500 dark:text-teal-400" />
            <span>PromptCanvas AI Studio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            How would you like to start your <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500">architecture?</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Choose how to begin your cloud design. Describe your system in plain English, select a pre-verified enterprise blueprint, or start with a clean blank canvas.
          </p>
        </div>

        {/* 3 Main Choice Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* CARD 1: Describe Architecture (AI Studio) */}
          <div className={`rounded-3xl p-7 sm:p-8 lg:p-10 border flex flex-col justify-between transition-all shadow-xl relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-teal-100/60'
              : 'bg-[#0B101D] border-panel-border/70 hover:border-teal-500/60 hover:shadow-teal-900/30'
          }`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  AI Generator
                </span>
              </div>

              <div>
                <h2 className="font-black text-xl sm:text-2xl">Describe with AI</h2>
                <p className={`text-sm sm:text-base mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Type your system requirements in natural language. Gemini 3.7 Flash will compile it into zero-trust, collision-free Draw.io vector architecture.
                </p>
              </div>

              <form onSubmit={handleSubmitPrompt} className="space-y-3.5 pt-1">
                <div className="relative">
                  <textarea
                    rows={4}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="e.g. Design a multi-AZ GKE cluster with Cloud Armor WAF, Cloud SQL read-replicas, and MemoryStore Redis caching..."
                    className={`w-full text-sm sm:text-base rounded-2xl p-4 sm:p-5 border outline-none font-medium resize-none transition-all leading-relaxed shadow-inner ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 focus:border-teal-500 focus:bg-white text-slate-900 placeholder-slate-400'
                        : 'bg-[#070A13] border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!promptText.trim() || isGenerating}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 disabled:opacity-40 text-[#070A13] font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-teal-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{isGenerating ? 'Compiling Architecture...' : '⚡ Generate Architecture'}</span>
                </button>
              </form>
            </div>

            <div className="pt-5 border-t border-slate-200 dark:border-slate-800/80 mt-6 space-y-2.5">
              <span className={`text-xs font-black uppercase tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                💡 Quick Example Prompts:
              </span>
              <div className="space-y-2">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPromptText(qp.prompt)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer border ${
                      isLight
                        ? 'bg-slate-50 hover:bg-teal-50/70 border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-900'
                        : 'bg-[#070A13] hover:bg-slate-800/90 border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-teal-300'
                    }`}
                    title={qp.prompt}
                  >
                    <div className="text-xs font-bold text-teal-600 dark:text-teal-400 mb-0.5">{qp.title}</div>
                    <div className="text-xs truncate text-slate-500 dark:text-slate-400">{qp.prompt}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 2: Browse 50 Enterprise Blueprints */}
          <div className={`rounded-3xl p-7 sm:p-8 lg:p-10 border flex flex-col justify-between transition-all shadow-xl relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-purple-400 hover:shadow-purple-100/60'
              : 'bg-[#0B101D] border-panel-border/70 hover:border-purple-500/60 hover:shadow-purple-900/30'
          }`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
                  <BookOpen className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Verified Catalog
                </span>
              </div>

              <div>
                <h2 className="font-black text-xl sm:text-2xl">50 Enterprise Blueprints</h2>
                <p className={`text-sm sm:text-base mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Select from 50 verified reference architectures across 7 enterprise lifecycle phases (Business, Security, Data, DevOps, SRE).
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Phase 1–7 Enterprise Matrices</div>
                    <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Covering Conceptual, ERD, Microservices, and Infrastructure</div>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Domain-Specific Golden Examples</div>
                    <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>FinTech, LLMOps, Healthcare, Cybersecurity &amp; Genomics</div>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Zero-Trust &amp; CIS Benchmark Pre-Audited</div>
                    <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Hardened security perimeters with Infracost estimates</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
              <div className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Popular Reference Architectures:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularBlueprints.map((bp, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      isLight
                        ? 'bg-purple-50 border-purple-200 text-purple-800'
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
                className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl border font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.99] mt-2 ${
                  isLight
                    ? 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900 shadow-purple-100'
                    : 'bg-purple-950/60 hover:bg-purple-900/80 border-purple-500/40 text-purple-200 shadow-purple-950/40'
                }`}
              >
                <span>Browse 50 Blueprint Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 3: Start Blank Canvas */}
          <div className={`rounded-3xl p-7 sm:p-8 lg:p-10 border flex flex-col justify-between transition-all shadow-xl relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-slate-100/60'
              : 'bg-[#0B101D] border-panel-border/70 hover:border-slate-500 hover:shadow-slate-900/30'
          }`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
                  <Square className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Vector Workspace
                </span>
              </div>

              <div>
                <h2 className="font-black text-xl sm:text-2xl">Start Blank Canvas</h2>
                <p className={`text-sm sm:text-base mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Open a clean Draw.io canvas with infinite grid and Google Cloud enterprise stencil libraries ready for custom manual design.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Full Draw.io Vector Power</div>
                    <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Connectors, swimlanes, orthogonal routing &amp; custom layers</div>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Official Cloud Stencils Built-in</div>
                    <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Google Cloud, Kubernetes, AI Agents &amp; Networking icons</div>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>AI Co-Pilot On Demand</div>
                    <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Ask Gemini to expand, audit, or refactor your design anytime</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
              <div className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Included Stencil Libraries:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Google Cloud (GCP)", "Kubernetes (K8s)", "AI / LLM Agents", "Networking & VPC", "Databases & Kafka"].map((st, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      isLight
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                        : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
                    }`}
                  >
                    {st}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={onStartBlankCanvas}
                className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl border font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.99] mt-2 ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900 shadow-slate-200'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white shadow-slate-900/50'
                }`}
              >
                <span>Open Blank Canvas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
