import React, { useState } from 'react';
import { LayoutGrid, Sparkles, ArrowRight, Server, Cpu, Database, ShieldCheck, Search, CheckCircle2, Globe, Building2, Factory, Briefcase, Stethoscope, ShoppingBag, Truck, DollarSign } from 'lucide-react';
import { ARCHITECTURE_TYPES } from '@/lib/architectureTypes';
import { GOOGLE_OPEN_KNOWLEDGE_CATALOG, OKFEntity } from '@/lib/openKnowledgeFormatCatalog';
import { getBlueprintLineage } from '@/lib/architectureLineage';

interface TemplateGalleryTabProps {
  onSelectTemplate: (prompt: string, title: string, archType: string) => void;
}

export const TemplateGalleryTab: React.FC<TemplateGalleryTabProps> = ({ onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState<'wbs_master' | 'industry' | 'ai_engines' | 'clouds'>('wbs_master');
  const [activePhase, setActivePhase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const okfAiEngines = GOOGLE_OPEN_KNOWLEDGE_CATALOG.filter(e => e.category === 'NativeAIEngine');
  const okfCloudProviders = GOOGLE_OPEN_KNOWLEDGE_CATALOG.filter(e => e.category === 'CloudProvider');

  const wbsMasterTemplates = ARCHITECTURE_TYPES.filter(t => t.category !== 'Industry Specialized Solutions');
  const industryTemplates = ARCHITECTURE_TYPES.filter(t => t.category === 'Industry Specialized Solutions');

  const filteredMaster = wbsMasterTemplates.filter(t => {
    const lineage = getBlueprintLineage(t.id);
    const matchesPhase = activePhase === 'all' || lineage.phaseId === activePhase;
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.whenToUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lineage.uniqueId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lineage.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  const filteredIndustry = industryTemplates.filter(t => {
    const lineage = getBlueprintLineage(t.id);
    return (
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.whenToUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lineage.uniqueId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lineage.industryName && lineage.industryName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0B0F17] custom-scrollbar">
      <div className="max-w-[1500px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-1">
              <LayoutGrid className="w-4 h-4" />
              <span>Universal Enterprise Architecture &amp; Industry Catalog</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Enterprise Blueprints, Industry Platforms &amp; Native AI
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Explore the 32 Master Enterprise Architecture Hierarchy across 5 phases and dedicated Industry Specialized Blueprints.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, domain, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Primary Catalog Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory('wbs_master')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeCategory === 'wbs_master'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>🏛️ 32 Master Architecture Hierarchy ({wbsMasterTemplates.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('industry')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeCategory === 'industry'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>🏭 Industry Specialized Solutions ({industryTemplates.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('ai_engines')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeCategory === 'ai_engines'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>🤖 Native AI &amp; LLM Engines ({okfAiEngines.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('clouds')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeCategory === 'clouds'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>☁️ Multi-Cloud &amp; Sovereign ({okfCloudProviders.length})</span>
          </button>
        </div>

        {/* WBS MASTER CATEGORY: PHASE FILTER PILLS */}
        {activeCategory === 'wbs_master' && (
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">Lineage Phase:</span>
            {[
              { id: 'all', label: 'All 5 Phases' },
              { id: 'P1', label: 'Phase 1: Foundation & Discovery' },
              { id: 'P2', label: 'Phase 2: Strategy & Economics' },
              { id: 'P3', label: 'Phase 3: Core AI, Data & Integration' },
              { id: 'P4', label: 'Phase 4: Platform Engineering & Mesh' },
              { id: 'P5', label: 'Phase 5: Operations & SRE Reliability' }
            ].map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePhase(p.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activePhase === p.id
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* CATEGORY 1: 32 MASTER WBS ARCHITECTURE HIERARCHY */}
        {activeCategory === 'wbs_master' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaster.map((template) => {
              const lineage = getBlueprintLineage(template.id);
              return (
                <div
                  key={template.id}
                  onClick={() => onSelectTemplate(template.prompt, template.name, template.id)}
                  className="group p-6 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-0.5"
                >
                  <div>
                    {/* Top Lineage Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-black bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-md">
                          {lineage.uniqueId}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 rounded-md">
                          {lineage.layerCode}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {lineage.phaseTitle.split(':')[0]}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {template.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-3">
                      {template.whenToUse}
                    </p>

                    {/* Domain Tag */}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-800/80 text-slate-300 rounded border border-slate-700">
                        📁 {lineage.domain}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                    <span>Launch Blueprint Workspace</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CATEGORY 2: INDUSTRY SPECIALIZED SOLUTIONS */}
        {activeCategory === 'industry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndustry.map((template) => {
              const lineage = getBlueprintLineage(template.id);
              return (
                <div
                  key={template.id}
                  onClick={() => onSelectTemplate(template.prompt, template.name, template.id)}
                  className="group p-6 bg-slate-900/60 hover:bg-slate-900 border border-purple-900/40 hover:border-purple-500/60 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-0.5"
                >
                  <div>
                    {/* Top Industry Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 text-xs font-mono font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-md">
                        {lineage.uniqueId}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-purple-950 text-purple-300 border border-purple-800 rounded-md">
                        🏭 {lineage.industryName}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                      {template.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-3">
                      {template.whenToUse}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-800/80 text-slate-300 rounded border border-slate-700">
                        🎯 {lineage.domain}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300">
                    <span>Launch Industry Blueprint</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* CATEGORY 3: NATIVE AI & LLM ENGINE CATALOG (GOOGLE OPEN KNOWLEDGE FORMAT) */}
        {activeCategory === 'ai_engines' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {okfAiEngines.map((ai: OKFEntity) => (
              <div
                key={ai['@id']}
                onClick={() => onSelectTemplate(`Architecture utilizing ${ai.name} (${ai.vendor})`, ai.name, ai.blueprintId || 'agentic_rag')}
                className="group p-6 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img src={ai.officialIconUrl} alt={ai.name} className="w-8 h-8 object-contain" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-white group-hover:text-teal-300 transition-colors">{ai.name}</h3>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">{ai['@type']}</span>
                        </div>
                        <span className="text-[11px] font-bold text-teal-400">{ai.vendor}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {ai.description}
                  </p>

                  {/* OKF Structured Technical Specifications */}
                  <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">OKF TECHNICAL SPECIFICATIONS:</span>
                    {Object.entries(ai.technicalSpecifications).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">{key}:</span>
                        <span className="text-teal-300 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-teal-400">
                  <span>Generate OKF Native {ai.name} Topology</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CATEGORY 3: MULTI-CLOUD & SOVEREIGN CATALOG (GOOGLE OPEN KNOWLEDGE FORMAT) */}
        {activeCategory === 'clouds' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {okfCloudProviders.map((cloud: OKFEntity) => (
              <div
                key={cloud['@id']}
                onClick={() => onSelectTemplate(`Enterprise ${cloud.name} publication architecture`, cloud.name, cloud.blueprintId || 'unified_system_view')}
                className="group p-6 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img src={cloud.officialIconUrl} alt={cloud.name} className="w-9 h-9 object-contain" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-white group-hover:text-teal-300">{cloud.name}</h3>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{cloud['@type']}</span>
                        </div>
                        <p className="text-xs text-slate-400">{cloud.alternateName}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {cloud.description}
                  </p>

                  <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">OKF INFRASTRUCTURE SPECIFICATIONS:</span>
                    {Object.entries(cloud.technicalSpecifications).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">{key}:</span>
                        <span className="text-cyan-300 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-teal-400">
                  <span>Compile OKF {cloud.name} Blueprint</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
