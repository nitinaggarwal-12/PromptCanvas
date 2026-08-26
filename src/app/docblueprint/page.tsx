'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Sparkles,
  Search,
  Filter,
  FileText,
  ArrowRight,
  Download,
  Copy,
  Check,
  Eye,
  Shield,
  Zap,
  LayoutGrid,
  Plus,
  X,
  Layers,
  ChevronRight,
  Sliders,
  FileCode,
  Presentation
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { DOC_ARCHETYPES_META, ARCHETYPE_REGISTRY, DocArchetypeMeta } from '@/lib/compose/archetypes';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';

function DocBluePrintContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePreviewArchetype, setActivePreviewArchetype] = useState<DocArchetypeMeta | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'chapters' | 'blueprints' | 'slides' | 'iac'>('chapters');
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  const categories = [
    { id: 'all', name: 'All 17 Specifications' },
    { id: 'Executive', name: 'Executive & Business' },
    { id: 'Architecture', name: 'Core Architecture' },
    { id: 'Engineering', name: 'Engineering & Design' },
    { id: 'Security', name: 'Security & Governance' },
    { id: 'AI', name: 'AI & Safety' },
    { id: 'Operations', name: 'Operations & SRE' },
  ];

  const archetypesList = useMemo(() => {
    return Object.values(DOC_ARCHETYPES_META);
  }, []);

  const filteredArchetypes = useMemo(() => {
    return archetypesList.filter((arch) => {
      let matchesCategory = true;
      if (selectedCategory === 'Executive') {
        matchesCategory = arch.badge.includes('Business') || arch.badge.includes('C-Suite') || arch.badge.includes('Procurement') || arch.badge.includes('FinOps');
      } else if (selectedCategory === 'Architecture') {
        matchesCategory = arch.badge.includes('Architecture') || arch.badge.includes('Product') || arch.badge.includes('Modernization') || arch.badge.includes('Technical Defense');
      } else if (selectedCategory === 'Engineering') {
        matchesCategory = arch.badge.includes('Engineering') || arch.badge.includes('API') || arch.badge.includes('Design');
      } else if (selectedCategory === 'Security') {
        matchesCategory = arch.badge.includes('Security') || arch.badge.includes('Governance') || arch.badge.includes('Cybersecurity');
      } else if (selectedCategory === 'AI') {
        matchesCategory = arch.badge.includes('AI') || arch.name.includes('AI') || arch.name.includes('LLM');
      } else if (selectedCategory === 'Operations') {
        matchesCategory = arch.badge.includes('Operations') || arch.badge.includes('Resilience') || arch.badge.includes('Go-Live');
      }

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        arch.name.toLowerCase().includes(q) ||
        arch.shortName.toLowerCase().includes(q) ||
        arch.primaryPurpose.toLowerCase().includes(q) ||
        arch.badge.toLowerCase().includes(q) ||
        arch.audience.toLowerCase().includes(q) ||
        arch.id.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [archetypesList, searchQuery, selectedCategory]);

  // Full section details for modal
  const fullArchetypeSpec = useMemo(() => {
    if (!activePreviewArchetype) return null;
    return ARCHETYPE_REGISTRY[activePreviewArchetype.id];
  }, [activePreviewArchetype]);

  const handleCopySpecOutline = () => {
    if (!activePreviewArchetype || !fullArchetypeSpec) return;
    const lines = [
      `# ${activePreviewArchetype.name} (${activePreviewArchetype.shortName})`,
      `**Audience**: ${activePreviewArchetype.audience}`,
      `**Purpose**: ${activePreviewArchetype.primaryPurpose}`,
      '',
      '## Document Chapters & Sections',
      ...fullArchetypeSpec.sections.map((s, idx) => `${idx + 1}. **${s.title}** (${s.provenance})`),
      '',
      '## Attached Canonical Blueprint Pack',
      ...activePreviewArchetype.blueprintPack.map(b => `- [Template #${b.recommendedTemplateId}] Chapter ${b.chapterNumber}: ${b.slotTitle} - ${b.description}`)
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <div className={`min-h-screen flex ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060913] text-slate-100'}`}>
      {/* Sidebar */}
      <UnifiedAppSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* Sticky Top Header */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md px-6 md:px-12 py-3.5 flex items-center justify-between transition-colors ${
          isLight ? 'bg-white/90 border-slate-200 shadow-xs' : 'bg-[#070B16]/90 border-slate-800/80 shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-md flex items-center justify-center">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#090D18]'}`}>
                <BookOpen className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
            <div>
              <h1 className={`font-black text-sm md:text-base tracking-tight flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span>DocBluePrint Archetypes</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  17 SPECIFICATIONS
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Comprehensive Engineering Specification Archetypes, Chapter Asts &amp; Diagram Packs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/docgen"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Launch DocGen Studio</span>
            </Link>
            <ThemeToggleBtn />
          </div>
        </header>

        {/* Catalog Body */}
        <div className="w-full max-w-8xl mx-auto px-6 md:px-12 py-8 space-y-8">
          {/* Header Search & Category Filter */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 17 archetypes (e.g. BRD, PRD, SDD, Threat Model, Runbook)..."
                  className={`w-full text-xs rounded-xl pl-10 pr-4 py-2.5 border outline-none font-medium transition ${
                    isLight
                      ? 'bg-white border-slate-200 focus:border-emerald-500 text-slate-900 placeholder-slate-400'
                      : 'bg-[#090D18] border-slate-800 focus:border-emerald-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isLight
                        ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Archetypes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArchetypes.map((arch) => (
              <div
                key={arch.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all duration-200 group ${
                  isLight
                    ? 'bg-white hover:bg-emerald-50/30 border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10'
                    : 'bg-[#090D18] hover:bg-[#0c1222] border-slate-800 hover:border-emerald-500/40 shadow-md hover:shadow-xl hover:shadow-emerald-500/10'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 uppercase">
                        {arch.shortName}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-gradient-to-r ${arch.badgeColor}`}>
                        {arch.badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {arch.sectionsCount || 8} Chapters
                    </span>
                  </div>

                  <h3 className={`text-base font-black group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {arch.name}
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-3 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {arch.primaryPurpose}
                  </p>

                  <div className="pt-2">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1.5 flex items-center justify-between">
                      <span>Attached Blueprints ({arch.blueprintPack.length})</span>
                    </div>
                    <div className="space-y-1">
                      {arch.blueprintPack.slice(0, 3).map((bp, bpIdx) => (
                        <div key={bpIdx} className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                          <span className="text-emerald-500 font-bold font-mono">#{bp.recommendedTemplateId}</span>
                          <span className="truncate">{bp.slotTitle}</span>
                        </div>
                      ))}
                      {arch.blueprintPack.length > 3 && (
                        <div className="text-[10px] text-slate-400 italic">
                          + {arch.blueprintPack.length - 3} more blueprint slots
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      📊 16:9 Slides Included
                    </span>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      💻 Terraform IaC Ready
                    </span>
                  </div>
                </div>

                {/* Card Actions: Preview Spec vs Build Document */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setActivePreviewArchetype(arch);
                      setActiveModalTab('chapters');
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Preview Spec</span>
                  </button>

                  <Link
                    href={`/docgen?archetype=${arch.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Build in DocGen</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE FULL SPECIFICATION PREVIEW MODAL */}
        {/* ========================================================================= */}
        {activePreviewArchetype && fullArchetypeSpec && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#090D18] border border-slate-800 rounded-3xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-black text-white truncate">
                        {activePreviewArchetype.name}
                      </h2>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {activePreviewArchetype.shortName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      Audience: {activePreviewArchetype.audience}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySpecOutline}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copiedMarkdown ? 'Copied Outline!' : 'Copy Outline'}</span>
                  </button>

                  <Link
                    href={`/docgen?archetype=${activePreviewArchetype.id}`}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open in DocGen Studio</span>
                  </Link>

                  <button
                    onClick={() => setActivePreviewArchetype(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer text-lg font-bold"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Tabs Bar */}
              <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalTab('chapters')}
                    className={`px-3 py-1 rounded-lg font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                      activeModalTab === 'chapters' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Chapter Breakdown ({fullArchetypeSpec.sections.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveModalTab('blueprints')}
                    className={`px-3 py-1 rounded-lg font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                      activeModalTab === 'blueprints' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Attached Blueprints ({activePreviewArchetype.blueprintPack.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveModalTab('slides')}
                    className={`px-3 py-1 rounded-lg font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                      activeModalTab === 'slides' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>16:9 Slides Deck (8)</span>
                  </button>

                  <button
                    onClick={() => setActiveModalTab('iac')}
                    className={`px-3 py-1 rounded-lg font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                      activeModalTab === 'iac' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Terraform IaC</span>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeModalTab === 'chapters' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {activePreviewArchetype.primaryPurpose}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {fullArchetypeSpec.sections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/20">
                                {idx + 1}
                              </span>
                              <h4 className="text-xs font-black text-white">
                                {sec.title}
                              </h4>
                              <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
                                {sec.provenance}
                              </span>
                            </div>

                            {sec.guidance && (
                              <p className="text-[11px] text-slate-400 leading-relaxed pl-7">
                                {sec.guidance}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModalTab === 'blueprints' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activePreviewArchetype.blueprintPack.map((bp, bpIdx) => (
                      <div
                        key={bpIdx}
                        className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                              Chapter {bp.chapterNumber} Slot
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              Blueprint #{bp.recommendedTemplateId}
                            </span>
                          </div>

                          <h4 className="text-xs font-black text-white pt-1">
                            {bp.slotTitle}
                          </h4>

                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {bp.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                          <Link
                            href={`/diagen?arch=canonical_${bp.recommendedTemplateId}`}
                            className="text-[10.5px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                          >
                            <span>Open in DiaGen Studio</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeModalTab === 'slides' && (
                  <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <Presentation className="w-4 h-4" />
                      <span>Executive 16:9 Presentation Deck Structure</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      This specification automatically compiles into an 8-slide presentation deck with domain KPI cards, speaker presentation notes, and high-DPI vector slide figures.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-mono text-slate-300">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">Slide 1: Executive Title &amp; Governance Vision</div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">Slide 2: Strategic Pillars &amp; ROI Metrics</div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">Slide 3: High-Level System Architecture</div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">Slide 4: Zero-Trust Security &amp; Network Ingress</div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">Slide 5: Data Mesh &amp; Event Streaming Lake</div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">Slide 6: Cognitive Reasoning &amp; Agent Runtime</div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">Slide 7: High Availability &amp; Multi-Region DR</div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">Slide 8: Roadmap &amp; Phased Execution Gates</div>
                    </div>
                  </div>
                )}

                {activeModalTab === 'iac' && (
                  <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                      <FileCode className="w-4 h-4" />
                      <span>Terraform Infrastructure as Code (IaC) Bundle</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Includes declarative Terraform HCL modules (`main.tf`, `variables.tf`, `outputs.tf`) and Kubernetes manifests certified against CIS security benchmarks.
                    </p>
                    <div className="p-3 rounded-xl bg-slate-900 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                      <pre>{`# Terraform Module Pack for ${activePreviewArchetype.shortName}
module "landing_zone" {
  source  = "./modules/gcp-landing-zone"
  project = var.project_id
  region  = "us-central1"
  vpc_sc  = true
  cmek    = true
}

module "compute_cluster" {
  source       = "./modules/gke-enterprise"
  cluster_name = "${activePreviewArchetype.id}-core-mesh"
  private_gke  = true
  dataplane_v2 = true
}`}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DocBluePrintPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060913]" />}>
      <DocBluePrintContent />
    </Suspense>
  );
}
