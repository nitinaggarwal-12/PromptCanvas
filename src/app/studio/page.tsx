'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  FileText,
  LayoutGrid,
  BookOpen,
  History,
  ShieldCheck,
  BarChart3,
  Compass,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  Play,
  Copy,
  ExternalLink,
  ChevronRight,
  Boxes,
  Cpu,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import { DOC_ARCHETYPES_META } from '@/lib/compose/archetypes';

interface RecentProject {
  id: string;
  name: string;
  architecture_type?: string;
  updated_at?: string;
  version_count?: number;
  latest_prompt?: string;
}

export default function StudioDashboardPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/diagrams')
      .then(res => res.json())
      .then(data => {
        if (data.diagrams && Array.isArray(data.diagrams)) {
          setRecentProjects(data.diagrams.slice(0, 8));
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-screen flex ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060913] text-slate-100'}`}>
      {/* 1. Collapsible Unified Sidebar */}
      <UnifiedAppSidebar />

      {/* 2. Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* Sticky Top Header */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md px-6 md:px-12 py-3.5 flex items-center justify-between transition-colors ${
          isLight ? 'bg-white/80 border-slate-200 shadow-xs' : 'bg-[#070B16]/80 border-slate-800/80 shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#090D18]'}`}>
                <Sparkles className="w-4 h-4 text-indigo-500" />
              </div>
            </div>
            <div>
              <h1 className={`font-black text-sm md:text-base tracking-tight flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span>Architecture Studio</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  ENTERPRISE
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Unified Autonomous Diagram Compiler &amp; Specification Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/diagen?new=true"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Diagram</span>
            </Link>
            <Link
              href="/docgen"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Specification</span>
            </Link>
            <ThemeToggleBtn />
          </div>
        </header>

        {/* Studio Content Container */}
        <div className="w-full max-w-8xl mx-auto px-6 md:px-12 py-8 space-y-10">
          {/* Hero Banner */}
          <div className={`relative p-8 md:p-10 rounded-3xl border overflow-hidden shadow-xl ${
            isLight
              ? 'bg-gradient-to-r from-indigo-50/80 via-sky-50/50 to-white border-indigo-100'
              : 'bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-[#070B18] border-indigo-500/20'
          }`}>
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Next-Gen Architecture Intelligence</span>
              </div>
              <h2 className={`text-2xl md:text-4xl font-black tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Build Boardroom-Grade Architecture Diagrams &amp; Complete Technical Specifications
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Harness Gemini 3.7 Flash reasoning, 50 canonical master blueprints, 17 document archetypes, and zero-collision layout compilers with instant export to Draw.io, PPTX, and Terraform IaC.
              </p>
            </div>
          </div>

          {/* 🚀 PRIMARY DUAL LAUNCHPADS: DiaGen & DocGen */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg md:text-xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Primary Studio Engines
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Select an engine to generate architecture diagrams or compile comprehensive engineering specifications.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. DiaGen Launchpad */}
              <Link href="/diagen" className="group block">
                <div className={`h-full p-6 md:p-8 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-6 ${
                  isLight
                    ? 'bg-white hover:bg-teal-50/40 border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-xl hover:shadow-teal-500/10'
                    : 'bg-[#090D18] hover:bg-[#0c1222] border-slate-800 hover:border-teal-500/50 shadow-md hover:shadow-xl hover:shadow-teal-500/10'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                        <Layers className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase font-mono px-3 py-1 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                        Visual Canvas Engine
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className={`text-xl font-black group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        DiaGen — AI Architecture Studio
                      </h4>
                      <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        Prompt, refine, and compile multi-tier 16:9 cloud topologies, ERDs, sequence flows, and deployment maps with zero bounding box collisions and real-time domain flavoring.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        ⚡ 100% Vector Rendering
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        📐 50 Ground-Truth Blueprints
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        📦 Draw.io &amp; SVG Export
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/80 text-xs font-extrabold text-teal-600 dark:text-teal-400">
                    <span>Launch DiaGen Studio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* 2. DocGen Launchpad */}
              <Link href="/docgen" className="group block">
                <div className={`h-full p-6 md:p-8 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-6 ${
                  isLight
                    ? 'bg-white hover:bg-indigo-50/40 border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10'
                    : 'bg-[#090D18] hover:bg-[#0c1222] border-slate-800 hover:border-indigo-500/50 shadow-md hover:shadow-xl hover:shadow-indigo-500/10'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase font-mono px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                        Specification Engine
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className={`text-xl font-black group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        DocGen — Architecture Specification
                      </h4>
                      <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        Synthesize structured 6-chapter Software Architecture Documents (SAD), HLDs, Threat Models, and Runbooks with embedded visual diagrams, executive slides, and Terraform IaC.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        📑 17 Master Archetypes
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        📊 16:9 Presentation Slides
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        💻 Terraform &amp; K8s Manifests
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/80 text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                    <span>Launch DocGen Studio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* 🏛️ BLUEPRINT & CATALOG PORTALS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* DiaBluePrint */}
            <Link href="/diablueprint" className="group block">
              <div className={`p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white hover:bg-sky-50/50 border-slate-200 hover:border-sky-300'
                  : 'bg-[#090D18] hover:bg-slate-900 border-slate-800 hover:border-sky-500/40'
              }`}>
                <div className="flex items-center justify-between pb-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                    50 Templates
                  </span>
                </div>
                <h4 className={`text-sm font-extrabold group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  DiaBluePrint Catalog
                </h4>
                <p className={`text-[11px] mt-1 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Explore all 50 ground-truth canonical master diagrams with 1-click domain flavoring.
                </p>
              </div>
            </Link>

            {/* DocBluePrint */}
            <Link href="/docblueprint" className="group block">
              <div className={`p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white hover:bg-emerald-50/50 border-slate-200 hover:border-emerald-300'
                  : 'bg-[#090D18] hover:bg-slate-900 border-slate-800 hover:border-emerald-500/40'
              }`}>
                <div className="flex items-center justify-between pb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    17 Archetypes
                  </span>
                </div>
                <h4 className={`text-sm font-extrabold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  DocBluePrint Archetypes
                </h4>
                <p className={`text-[11px] mt-1 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Industry standard templates for System Architecture, Threat Modeling, Runbooks &amp; ADRs.
                </p>
              </div>
            </Link>

            {/* Security Audit */}
            <Link href="/audit" className="group block">
              <div className={`p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white hover:bg-rose-50/50 border-slate-200 hover:border-rose-300'
                  : 'bg-[#090D18] hover:bg-slate-900 border-slate-800 hover:border-rose-500/40'
              }`}>
                <div className="flex items-center justify-between pb-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                    CIS Benchmarks
                  </span>
                </div>
                <h4 className={`text-sm font-extrabold group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Security &amp; Compliance Audit
                </h4>
                <p className={`text-[11px] mt-1 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Verify Zero-Trust boundaries, VPC Service Controls, SOC2/HIPAA, and SAST rules.
                </p>
              </div>
            </Link>

            {/* User Guides */}
            <Link href="/guide" className="group block">
              <div className={`p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white hover:bg-amber-50/50 border-slate-200 hover:border-amber-300'
                  : 'bg-[#090D18] hover:bg-slate-900 border-slate-800 hover:border-amber-500/40'
              }`}>
                <div className="flex items-center justify-between pb-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    Step Guide
                  </span>
                </div>
                <h4 className={`text-sm font-extrabold group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  User Guides &amp; Playbooks
                </h4>
                <p className={`text-[11px] mt-1 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Interactive walkthroughs, migration runbooks, and prompt engineering playbooks.
                </p>
              </div>
            </Link>
          </div>

          {/* 🕒 RECENT PROJECTS, DIAGRAMS & VERSION HISTORY */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Recent Projects &amp; Prompt History
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Jump straight back into active architectures or review historical prompts and rollbacks.
                </p>
              </div>
              <Link
                href="/history"
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>View Full History</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className={`p-12 rounded-2xl border text-center ${isLight ? 'bg-white border-slate-200' : 'bg-[#090D18] border-slate-800'}`}>
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-500 mb-2" />
                <p className="text-xs text-slate-400 font-bold">Loading recent architecture assets...</p>
              </div>
            ) : recentProjects.length === 0 ? (
              <div className={`p-12 rounded-2xl border text-center space-y-3 ${isLight ? 'bg-white border-slate-200' : 'bg-[#090D18] border-slate-800'}`}>
                <Layers className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold">No saved architectures yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Launch DiaGen or DocGen to create your first production architecture.
                </p>
                <Link
                  href="/diagen?new=true"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Diagram</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                      isLight
                        ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                        : 'bg-[#090D18] hover:bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span className="truncate max-w-[120px]">
                          {proj.architecture_type || 'Architecture'}
                        </span>
                        <span>{proj.version_count ? `v${proj.version_count}` : 'v1'}</span>
                      </div>

                      <h4 className={`text-xs font-black line-clamp-2 leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {proj.name}
                      </h4>

                      {proj.latest_prompt && (
                        <p className={`text-[11px] line-clamp-2 italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          &ldquo;{proj.latest_prompt}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-bold">
                      <Link
                        href={`/diagen?diagram=${proj.id}`}
                        className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Open in DiaGen</span>
                      </Link>
                      <button
                        onClick={() => handleCopyId(proj.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                        title="Copy Diagram ID"
                      >
                        {copiedId === proj.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
