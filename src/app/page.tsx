'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Zap, 
  History, 
  FileText, 
  CheckCircle2, 
  Play,
  Network,
  X
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200 overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Header/Navigation */}
      <header className="sticky top-0 w-full z-50 border-b border-panel-border/30 bg-[#070a13]/80 backdrop-blur-md">
        <div className="w-full max-w-8xl mx-auto h-20 px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#070a13] rounded-[10px] flex items-center justify-center">
                <Network className="w-5 h-5 text-teal-accent" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wider text-white bg-clip-text bg-gradient-to-r from-white to-slate-300">
                MAESTRO
              </span>
              <span className="font-light text-lg tracking-wider text-teal-400">
                SKETCH
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-400 transition-colors">How It Works</a>
            <a href="#templates" className="hover:text-teal-400 transition-colors">Templates</a>
            <a href="#value" className="hover:text-teal-400 transition-colors">Why Maestro</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-5 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-[#070a13] font-bold text-sm tracking-wide transition-all shadow-lg shadow-teal-500/20 hover:scale-[1.03]"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full max-w-8xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini 2.5 Flash & Draw.io
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Sketch Cloud <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400">
              Architecture with AI
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Translate complex natural language prompts into professional, multi-tier Draw.io architecture diagrams. Audited for security, version-controlled, and instantly editable.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-bold tracking-wide text-center transition-all shadow-xl shadow-teal-500/15 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Build First Diagram</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard?tour=true"
              className="px-8 py-4 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-teal-500/40 text-slate-300 font-semibold text-center transition-all flex items-center justify-center gap-2 hover:bg-slate-800"
            >
              <Play className="w-4 h-4 text-teal-400" />
              <span>Watch Tour</span>
            </Link>
          </div>

          {/* Quick highlights */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-panel-border/30 w-full">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-white">100%</p>
              <p className="text-xs text-slate-500 mt-1">Interactive Vector SVG</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-white">&lt; 60s</p>
              <p className="text-xs text-slate-500 mt-1">From Text to Diagram</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-white">Built-in</p>
              <p className="text-xs text-slate-500 mt-1">Gemini Security Auditor</p>
            </div>
          </div>
        </div>

        {/* Pixar Graphics Container */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
          {/* Neon Glow Frame behind the picture */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-2xl blur-[20px] opacity-30 transform scale-95" />
          
          <div className="relative glass-panel-teal rounded-2xl p-2.5 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] max-w-md w-full">
            <img 
              src="/pixar_robot_architect.jpg" 
              alt="AI Robot Cloud Architect Sketching"
              className="w-full h-auto rounded-[10px] object-cover border border-teal-500/20"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-2.5 rounded-[10px] bg-gradient-to-t from-[#070a13]/70 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-4">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-widest">Sketch Assistant</span>
              <p className="text-sm font-semibold text-white mt-0.5">Meet Maestro, your automated 3D cloud design helper</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section id="value" className="relative py-24 bg-slate-950/40 border-y border-panel-border/30">
        <div className="w-full max-w-8xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">The Problem & The Cure</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Diagramming is critical, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">but building them by hand is a bottleneck.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* The Hard Way */}
            <div className="glass-panel border-red-500/10 rounded-2xl p-8 flex flex-col justify-between hover:border-red-500/20 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
                  <X className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-4">The Manual Bottleneck</h3>
                <ul className="space-y-3.5 text-slate-400 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>Dragging, connecting, and formatting 20+ nodes manually in Draw.io takes hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>Keeping static PDF/PNG images synchronized with production system changes is almost impossible.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>Verifying design compliance, network segmentation, and safety requires manual architectural reviews.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-red-400/70 mt-8 font-medium italic">Result: Out-of-date, misaligned diagrams that slow down teams.</p>
            </div>

            {/* The Maestro Way */}
            <div className="glass-panel border-teal-500/20 rounded-2xl p-8 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-xl shadow-teal-500/5">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-accent mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-4">Maestro Sketch Automation</h3>
                <ul className="space-y-3.5 text-slate-300 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-accent font-bold shrink-0 mt-0.5">✓</span>
                    <span>Describe your stack in natural text. Maestro creates valid, fully-spaced XML layouts in seconds.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-accent font-bold shrink-0 mt-0.5">✓</span>
                    <span>Iterate seamlessly. Ask the AI to &quot;add an ALB,&quot; &quot;connect DB to Redis,&quot; or &quot;redesign for GCP.&quot;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-accent font-bold shrink-0 mt-0.5">✓</span>
                    <span>Audits are built-in. Let the Gemini security auditor analyze node connections for security risks automatically.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-teal-400 mt-8 font-semibold tracking-wide">Result: High-fidelity, live architecture maps created at the speed of thought.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative py-24 max-w-8xl mx-auto px-6 md:px-12 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">Product Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Designed for Architects, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400">Built with Industrial Safety.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-panel border-panel-border/40 hover:border-teal-500/30 rounded-2xl p-6 transition-all group hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-accent mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-2">Prompt-to-Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Feed raw text prompts detailing databases, runtimes, security layers, or ingress. Maestro renders standard, color-coded diagrams aligned to logical enterprise tiers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel border-panel-border/40 hover:border-teal-500/30 rounded-2xl p-6 transition-all group hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-2">Ready-To-Go Templates</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Launch with 10 production-grade blueprints (Data Lakehouse, AWS EKS Microservices, RAG/Gemini AI pipelines, VPC networks) to instantly experiment and validate stacks.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel border-panel-border/40 hover:border-teal-500/30 rounded-2xl p-6 transition-all group hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <History className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-2">Infinite Version History</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every AI generation or manual update creates a historical snapshot. Compare versions, trace comments, and revert to previous states in one click.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel border-panel-border/40 hover:border-teal-500/30 rounded-2xl p-6 transition-all group hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-accent mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-2">Gemini Compliance Audit</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Run security compliance reports directly in the app. Gemini audits your drawing&apos;s nodes and edges for single points of failure, unencrypted links, or exposed ports.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-panel border-panel-border/40 hover:border-teal-500/30 rounded-2xl p-6 transition-all group hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Network className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-2">Interactive 2D Canvas</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smooth vector-based renderer with panning, scroll-to-zoom, infinite grids, and an interactive side-tree nodes inspector that displays node connections clearly.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-panel border-panel-border/40 hover:border-teal-500/30 rounded-2xl p-6 transition-all group hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-2">Pure Open XML Output</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export designs as fully valid Draw.io XML schemas. Copy, modify, share, or open them in your standard desktop Draw.io client with absolutely no vendor lock-in.
            </p>
          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative py-24 bg-slate-950/40 border-y border-panel-border/30">
        <div className="w-full max-w-8xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">The Workflow</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Create and Refine in Three Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-[#070a13] font-bold text-lg shadow-lg shadow-teal-500/10">
                1
              </div>
              <h4 className="font-bold text-white text-base">Select or Input Prompt</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Choose a pre-defined architecture template or enter a custom prompt describing your microservices, compute instances, database types, and connectors.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-[#070a13] font-bold text-lg shadow-lg shadow-teal-500/10">
                2
              </div>
              <h4 className="font-bold text-white text-base">Gemini Generates XML</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Our backend compiler calls Gemini 2.5 Flash, generating a valid XML diagram with sequential node numbering, structured tiers, and descriptive connections.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-[#070a13] font-bold text-lg shadow-lg shadow-teal-500/10">
                3
              </div>
              <h4 className="font-bold text-white text-base">Audit, Tweak, and Iterate</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Audit the security of your diagram instantly. Add new nodes using the chat prompt interface, edit components, or click &quot;Open in New Tab&quot; to edit visually in Draw.io.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="relative py-24 z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="glass-panel-teal rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle Glows inside CTA */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-teal-500/5 via-indigo-500/5 to-transparent pointer-events-none" />
          
          <Sparkles className="w-12 h-12 text-teal-accent mx-auto mb-6 animate-pulse" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Design Compliant Cloud Stacks at the Speed of Thought
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Stop drawing connectors manually. Leverage Gemini AI to build, audit, and version Draw.io architecture diagrams automatically.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl bg-teal-accent hover:bg-teal-hover text-[#070a13] font-bold tracking-wide transition-all shadow-xl shadow-teal-500/25 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Free Workspace</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-panel-border/30 bg-slate-950/60 py-12">
        <div className="max-w-8xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-teal-accent" />
            <span className="font-extrabold tracking-wider text-xs text-white">MAESTRO SKETCH</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; 2026 Maestro Sketch. Designed with high-fidelity cloud blueprints. Open-source Draw.io XML compatible.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
