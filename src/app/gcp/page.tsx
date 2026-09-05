'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import { useTheme } from '@/lib/themeContext';
import {
  ALL_GCP_DIALECT_A_ARCHITECTURES,
  getGcpArchitectureById,
  GcpArchitectureDef,
} from '@/lib/gcpDialectA';
import {
  Cloud,
  Layers,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Download,
  Share2,
  FileText,
  Shield,
  Bot,
  Zap,
  Cpu,
  Database,
  Lock,
  ArrowRight,
  Workflow,
  CheckCircle2,
  BookOpen,
  Eye,
  Terminal,
} from 'lucide-react';

function GcpArchitectureCenterInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const initialId = searchParams.get('id') || 'gcp-multiagent-core';
  const [selectedArchId, setSelectedArchId] = useState<string>(initialId);
  const [activeTab, setActiveTab] = useState<'canvas' | 'spec' | 'official'>('canvas');
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Sync state if URL searchParam changes
  useEffect(() => {
    const id = searchParams.get('id');
    if (id && ALL_GCP_DIALECT_A_ARCHITECTURES.some((a) => a.id === id)) {
      setSelectedArchId(id);
    }
  }, [searchParams]);

  const activeArch: GcpArchitectureDef = useMemo(() => {
    return getGcpArchitectureById(selectedArchId) || ALL_GCP_DIALECT_A_ARCHITECTURES[0];
  }, [selectedArchId]);

  const activeXml = useMemo(() => {
    return activeArch.generateXml(isDark);
  }, [activeArch, isDark]);

  const handleSelectArchitecture = (id: string) => {
    setSelectedArchId(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('id', id);
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(activeXml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleCopyShareUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleDownloadXml = () => {
    const blob = new Blob([activeXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeArch.id}.drawio.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenDiagramsNet = () => {
    const encoded = encodeURIComponent(activeXml);
    window.open(`https://app.diagrams.net/#R${encoded}`, '_blank');
  };

  const bgClass = isDark ? 'bg-[#0B111E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900';
  const cardClass = isDark
    ? 'bg-[#111827] border-slate-800 hover:border-blue-500/40 shadow-slate-950/40'
    : 'bg-white border-slate-200 hover:border-blue-400/60 shadow-slate-100';

  return (
    <div className={`flex min-h-screen transition-colors duration-200 ${bgClass} font-sans`}>
      {/* Collapsible Left Navigation Menu */}
      <UnifiedAppSidebar />

      {/* Main Content Area: Spacious Ultra-Wide Layout (Zero Surrounding Empty Space) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Sticky Full-Width Header Bar */}
        <header
          className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors ${
            isDark ? 'bg-[#0F172A]/90 border-slate-800' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="w-full max-w-none px-6 md:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base md:text-lg font-bold tracking-tight">
                    Google Cloud Architecture Center
                  </h1>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-500 border border-blue-500/25">
                    DIALECT A STANDARDS
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Official Solution Architecture Topologies &bull; Agent2Agent (A2A) &bull; Model Context Protocol (MCP)
                </p>
              </div>
            </div>

            {/* Quick Action Controllers */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyXml}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  copiedXml
                    ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                    : isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Copy Draw.io XML to Clipboard"
              >
                {copiedXml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedXml ? 'Copied XML' : 'Copy XML'}</span>
              </button>

              <button
                onClick={handleDownloadXml}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Download .drawio.xml file"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export XML</span>
              </button>

              <button
                onClick={handleOpenDiagramsNet}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isDark
                    ? 'bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 border-blue-800/60'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                }`}
                title="Open in Diagrams.net online editor"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open in Diagrams.net</span>
              </button>

              <a
                href={activeArch.officialDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm"
              >
                <span>Docs Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </header>

        {/* Page Body Container */}
        <main className="w-full max-w-none px-6 md:px-10 py-6 space-y-6 flex-1">
          {/* Architecture Selector Cards Grid (6 Topologies) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {ALL_GCP_DIALECT_A_ARCHITECTURES.map((arch) => {
              const isSelected = arch.id === activeArch.id;
              return (
                <button
                  key={arch.id}
                  onClick={() => handleSelectArchitecture(arch.id)}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-full relative overflow-hidden group ${
                    isSelected
                      ? isDark
                        ? 'bg-blue-950/30 border-blue-500 shadow-lg shadow-blue-950/50 ring-1 ring-blue-500'
                        : 'bg-blue-50/70 border-blue-500 shadow-md shadow-blue-100 ring-1 ring-blue-500'
                      : cardClass
                  }`}
                >
                  {/* Top indicator ribbon */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-blue-500 text-white border-blue-600'
                            : isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {arch.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {arch.components.length} components
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-bold tracking-tight line-clamp-1 mb-1 ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {arch.title}
                    </h3>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {arch.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 font-medium truncate max-w-[170px]">
                      {arch.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        isSelected
                          ? 'text-blue-500 font-bold'
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Select'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Topology Hero & Meta Banner */}
          <div
            className={`p-5 rounded-xl border transition-all ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    {activeArch.category}
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Source: {activeArch.author}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {activeArch.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-4xl leading-relaxed">
                  {activeArch.overview}
                </p>
              </div>

              {/* View Switcher Tabs */}
              <div
                className={`flex items-center p-1 rounded-lg border self-start lg:self-center ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  onClick={() => setActiveTab('canvas')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeTab === 'canvas'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Interactive Canvas</span>
                </button>
                <button
                  onClick={() => setActiveTab('spec')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeTab === 'spec'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Living Spec &amp; Data Flow</span>
                </button>
                <button
                  onClick={() => setActiveTab('official')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeTab === 'official'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Public Docs Reference</span>
                </button>
              </div>
            </div>

            {/* Design Patterns Pill Badges */}
            <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Pattern Matrix:
              </span>
              {activeArch.designPatterns.map((pattern, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                    isDark
                      ? 'bg-slate-800/80 text-slate-300 border-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {pattern}
                </span>
              ))}
            </div>
          </div>

          {/* TAB 1: INTERACTIVE DRAW.IO CANVAS VIEW */}
          {activeTab === 'canvas' && (
            <div
              id="diagram-canvas-card"
              className={`rounded-xl border overflow-hidden transition-all ${
                isDark ? 'bg-[#0F172A] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              {/* Canvas Action Bar */}
              <div
                className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/90 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    Draw.io Canvas Viewport (16:9 Aspect Ratio)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    &bull; Zero-Mutation Passthrough &bull; Responsive Auto-Fit
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={handleCopyXml}
                    className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-500 font-semibold transition-colors"
                  >
                    {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedXml ? 'Copied' : 'Copy Raw XML'}</span>
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    onClick={handleOpenDiagramsNet}
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open in diagrams.net</span>
                  </button>
                </div>
              </div>

              {/* RenderSafe Diagram Canvas Container */}
              <div className="w-full h-[720px] md:h-[840px] relative bg-white dark:bg-[#0B111E]">
                <DiagramViewerRenderSafe
                  key={`${activeArch.id}-${isDark ? 'dark' : 'light'}`}
                  xml={activeXml}
                  diagramId={activeArch.id}
                  aspectRatioId="16:9"
                  bgTheme={isDark ? 'dark' : 'light'}
                  allowFullScaleScroll={false}
                />
              </div>
            </div>
          )}

          {/* TAB 2: LIVING SPEC & DATA FLOW */}
          {activeTab === 'spec' && (
            <div className="space-y-6">
              {/* Ordered Step Sequence Flow */}
              <div
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-blue-500" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Sequential Execution &amp; Interaction Flow
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {activeArch.flowSteps.length} discrete pipeline stages
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeArch.flowSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-lg border flex items-start gap-3 transition-all ${
                        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                            {step.title}
                          </h4>
                          <span className="text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            {step.protocol}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{step.from}</span> &rarr;{' '}
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{step.to}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Components Catalog Table */}
              <div
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Architecture Component Directory
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr
                        className={`border-b font-bold uppercase tracking-wider ${
                          isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                        }`}
                      >
                        <th className="py-2.5 px-3">Component</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Runtime / Spec</th>
                        <th className="py-2.5 px-3">Technical Responsibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                      {activeArch.components.map((comp, idx) => (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isDark ? 'hover:bg-slate-900/50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                              <span>{comp.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {comp.category}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-blue-600 dark:text-blue-400 whitespace-nowrap">
                            {comp.spec}
                          </td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                            {comp.role}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Products and Services Reference */}
              <div
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Products &amp; Tools Used
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {activeArch.productsUsed.map((prod, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-xs font-semibold flex items-center gap-2.5 ${
                        isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{prod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PUBLIC DOCS REFERENCE & GROUND TRUTH */}
          {activeTab === 'official' && (
            <div className="space-y-6">
              <div
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-blue-500">
                        Official Ground-Truth Source
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        VERIFIED 2025/2026
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {activeArch.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">
                      {activeArch.officialDocUrl}
                    </p>
                  </div>

                  <a
                    href={activeArch.officialDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm self-start"
                  >
                    <span>View Live On Google Cloud</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Ground Truth Citation Card */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400">Author &amp; Solution Engineer</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                      {activeArch.author}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400">Solution Architecture Pattern</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                      Dialect A (Official Solution Blueprint)
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400">Interoperability Standards</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                      A2A Protocol &bull; Model Context Protocol (MCP)
                    </p>
                  </div>
                </div>

                {/* Comparison Details */}
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Visual Grammar Conformance Matrix (Dialect A vs Dialect B)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400">
                          <th className="py-2 px-3">Design Attribute</th>
                          <th className="py-2 px-3 text-blue-500">Dialect A (Official Solution Architecture)</th>
                          <th className="py-2 px-3 text-slate-400">Dialect B (Widescreen Reference Blueprint)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Outer Boundary</td>
                          <td className="py-2.5 px-3 font-medium text-blue-600 dark:text-blue-400">
                            Rounded Google Cloud box with solid #1A73E8 blue header ribbon
                          </td>
                          <td className="py-2.5 px-3">Multi-tier wide boundary with dark headers</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Agent Enclave</td>
                          <td className="py-2.5 px-3 font-medium text-emerald-600 dark:text-emerald-400">
                            Soft green #E6F4EA container (#12B76A border) with Coordinator &amp; subagent enclaves
                          </td>
                          <td className="py-2.5 px-3">General application tier cards</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Execution Patterns</td>
                          <td className="py-2.5 px-3 font-medium">
                            Explicit Sequential and Iterative Refinement dashed sub-boxes with A2A protocol
                          </td>
                          <td className="py-2.5 px-3">Orthogonal pipelines across columns</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Model Tier</td>
                          <td className="py-2.5 px-3 font-medium">
                            Right-column Model Armor guardrail + Gemini Platform + Runtime selection
                          </td>
                          <td className="py-2.5 px-3">Intelligence Hub column</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Tool Ingestion</td>
                          <td className="py-2.5 px-3 font-medium">
                            Bottom MCP tier: Custom MCP (Cloud Run) + Managed BigQuery MCP
                          </td>
                          <td className="py-2.5 px-3">Direct database connections</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-bold">Step Badges</td>
                          <td className="py-2.5 px-3 font-medium text-blue-600 dark:text-blue-400">
                            Numbered solid blue circles (❶..❿) positioned along connector midpoints
                          </td>
                          <td className="py-2.5 px-3">Step number badges on card headers</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function GcpArchitectureCenterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white font-mono text-sm">
          Loading Google Cloud Architecture Center...
        </div>
      }
    >
      <GcpArchitectureCenterInner />
    </Suspense>
  );
}
