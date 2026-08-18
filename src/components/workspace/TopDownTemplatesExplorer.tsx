'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Eye,
  ArrowRight,
  Search,
  Layers,
  Shield,
  Database,
  Bot,
  Cpu,
  Briefcase,
  Rocket,
  Building2,
  Award,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileCode,
  LayoutGrid,
  ListTree,
  Star,
  Zap
} from 'lucide-react';
import {
  getArchitectureHierarchy,
  ArchitectureHierarchyPhase,
  ArchitectureHierarchyDomain
} from '@/lib/architectureHierarchy';
import { BlueprintKnowledgeItem } from '@/lib/blueprintKnowledgeMatrix';
import { useTheme } from '@/lib/themeContext';

interface TopDownTemplatesExplorerProps {
  onSelectBlueprint: (blueprintId: string) => void;
  onPreviewBlueprint: (blueprintId: string) => void;
  onCustomizeWithPrompt?: (blueprint: BlueprintKnowledgeItem) => void;
  searchQuery?: string;
  activeBlueprintId?: string;
  theme?: 'light' | 'dark';
}

export const TopDownTemplatesExplorer: React.FC<TopDownTemplatesExplorerProps> = ({
  onSelectBlueprint,
  onPreviewBlueprint,
  onCustomizeWithPrompt,
  searchQuery = '',
  activeBlueprintId = '',
  theme
}) => {
  const { isLight: contextIsLight } = useTheme();
  const isLight = theme !== undefined ? theme === 'light' : contextIsLight;
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('ALL');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grouped' | 'tree'>('grouped');
  const [expandedTreeNodes, setExpandedTreeNodes] = useState<Set<string>>(
    new Set(['phase_1', 'phase_2', 'phase_3', 'phase_4', 'phase_5', 'phase_6', 'phase_7'])
  );

  const hierarchy = getArchitectureHierarchy();

  const toggleTreeNode = (nodeId: string) => {
    setExpandedTreeNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  const renderDomainIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Bot': return <Bot className={className} />;
      case 'Database': return <Database className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Rocket': return <Rocket className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Award': return <Award className={className} />;
      default: return <Layers className={className} />;
    }
  };

  // Filter the hierarchy based on selected phase, domain, and search query
  const q = searchQuery.toLowerCase().trim();

  const filteredHierarchy: ArchitectureHierarchyPhase[] = hierarchy
    .map((phase) => {
      if (selectedPhaseFilter !== 'ALL' && phase.id !== selectedPhaseFilter && phase.phaseKey !== selectedPhaseFilter) {
        return null;
      }

      const matchingDomains: ArchitectureHierarchyDomain[] = phase.domains
        .map((domain) => {
          if (selectedDomainFilter !== 'ALL' && domain.name !== selectedDomainFilter && domain.shortName !== selectedDomainFilter) {
            return null;
          }

          const matchingBlueprints = domain.blueprints.filter((bp) => {
            if (!q) return true;
            return (
              bp.diagramName.toLowerCase().includes(q) ||
              bp.combinedId.toLowerCase().includes(q) ||
              bp.uiCardDesc.toLowerCase().includes(q) ||
              bp.domain.toLowerCase().includes(q) ||
              (bp.intentKeywords && bp.intentKeywords.toLowerCase().includes(q)) ||
              (bp.coreGcpServices && bp.coreGcpServices.some((s) => s.toLowerCase().includes(q)))
            );
          });

          if (matchingBlueprints.length === 0) return null;

          return {
            ...domain,
            blueprints: matchingBlueprints
          };
        })
        .filter(Boolean) as ArchitectureHierarchyDomain[];

      if (matchingDomains.length === 0) return null;

      const totalMatching = matchingDomains.reduce((sum, d) => sum + d.blueprints.length, 0);

      return {
        ...phase,
        domains: matchingDomains,
        totalBlueprintsCount: totalMatching
      };
    })
    .filter(Boolean) as ArchitectureHierarchyPhase[];

  const totalMatchingBlueprints = filteredHierarchy.reduce(
    (sum, p) => sum + p.totalBlueprintsCount,
    0
  );

  // Available domain options for the sub-filter
  const activePhaseObject = hierarchy.find(p => p.id === selectedPhaseFilter || p.phaseKey === selectedPhaseFilter);
  const availableDomains = activePhaseObject
    ? Array.from(new Set(activePhaseObject.domains.map(d => d.name)))
    : Array.from(new Set(hierarchy.flatMap(p => p.domains.map(d => d.name))));

  return (
    <div className="space-y-6">
      
      {/* Level 1: Top-Down Phase Navigator Ribbon & View Switcher */}
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-3 border rounded-2xl p-2 md:p-2.5 backdrop-blur-md transition-colors ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0B101D] border-slate-800/90 shadow-lg'
      }`}>
        
        {/* Phase Pill Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
          <button
            type="button"
            onClick={() => {
              setSelectedPhaseFilter('ALL');
              setSelectedDomainFilter('ALL');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              selectedPhaseFilter === 'ALL'
                ? 'bg-teal-accent text-bg-dark font-black shadow-md'
                : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <span>✨ All Phases</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
              selectedPhaseFilter === 'ALL' ? 'bg-black/20 text-bg-dark' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-400'
            }`}>
              50
            </span>
          </button>

          {hierarchy.map((phase) => {
            const isSelected = selectedPhaseFilter === phase.id || selectedPhaseFilter === phase.phaseKey;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => {
                  setSelectedPhaseFilter(phase.id);
                  setSelectedDomainFilter('ALL');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? `${phase.badgeColor.replace('/10', '/30')} text-white shadow-md border ${phase.accentColor}`
                    : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <span>{phase.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800/80 text-slate-400'
                }`}>
                  {phase.totalBlueprintsCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className={`flex items-center gap-1 border p-1 rounded-xl shrink-0 self-end lg:self-auto ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/90 border-slate-800'
        }`}>
          <button
            type="button"
            onClick={() => setViewMode('grouped')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'grouped'
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40 shadow-sm'
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
            title="Domain Grouped Cards View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grouped Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('tree')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'tree'
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40 shadow-sm'
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
            title="Top-Down Hierarchy Tree View"
          >
            <ListTree className="w-3.5 h-3.5" />
            <span>Hierarchy Tree</span>
          </button>
        </div>

      </div>

      {/* Active Phase Mission Header (When a specific phase is selected) */}
      {activePhaseObject && selectedPhaseFilter !== 'ALL' && (
        <div className={`border rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md animate-in fade-in duration-200 ${
          isLight ? 'bg-white border-slate-200' : 'bg-gradient-to-r from-slate-900 via-[#0B101D] to-slate-900 border-teal-500/30'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl ${activePhaseObject.badgeColor} shrink-0`}>
              <span className="text-base">🏛️</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`text-sm md:text-base font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {activePhaseObject.phaseName}
                </h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  isLight ? 'bg-teal-50 text-teal-800 border-teal-200' : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                }`}>
                  {activePhaseObject.totalBlueprintsCount} Leaf Blueprints
                </span>
              </div>
              <p className={`text-xs mt-1 leading-relaxed max-w-3xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {activePhaseObject.description}
              </p>
            </div>
          </div>

          {/* Sub-domain filter chips inside active phase */}
          {availableDomains.length > 1 && (
            <div className="flex items-center gap-1.5 flex-wrap shrink-0">
              <button
                type="button"
                onClick={() => setSelectedDomainFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedDomainFilter === 'ALL'
                    ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All Domains ({availableDomains.length})
              </button>
              {availableDomains.map((dName) => (
                <button
                  key={dName}
                  type="button"
                  onClick={() => setSelectedDomainFilter(dName)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedDomainFilter === dName
                      ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {dName}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Hierarchy Content Area */}
      {filteredHierarchy.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-10 text-center space-y-4 max-w-xl mx-auto my-8 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-bold text-slate-200">
              No blueprints match your filter criteria
            </p>
            <p className="text-xs text-slate-400">
              Try resetting the Phase or Domain filters to view all 50 enterprise blueprints.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedPhaseFilter('ALL');
              setSelectedDomainFilter('ALL');
            }}
            className="px-5 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-black text-xs transition-all shadow-md cursor-pointer"
          >
            Reset to All 50 Blueprints
          </button>
        </div>
      ) : viewMode === 'tree' ? (
        
        /* 📂 VIEW MODE: Top-Down Interactive Hierarchy Tree Explorer */
        <div className={`border rounded-2xl p-4 space-y-3 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#090D18] border-slate-800'
        }`}>
          <div className={`flex items-center justify-between pb-3 border-b ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-teal-700' : 'text-teal-400'
            }`}>
              <ListTree className="w-4 h-4" />
              <span>Architectural Hierarchy Tree (Phase → Domain → Leaf Blueprints)</span>
            </span>
            <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {totalMatchingBlueprints} Leaf Nodes Matching
            </span>
          </div>

          <div className="space-y-2">
            {filteredHierarchy.map((phase) => {
              const isPhaseExpanded = expandedTreeNodes.has(phase.id);

              return (
                <div key={phase.id} className={`border rounded-xl overflow-hidden ${
                  isLight ? 'border-slate-200 bg-white' : 'border-slate-800/80 bg-slate-950/60'
                }`}>
                  {/* Phase Folder Header */}
                  <div
                    onClick={() => toggleTreeNode(phase.id)}
                    className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isLight ? 'bg-slate-50 hover:bg-slate-100' : 'bg-slate-900/80 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isPhaseExpanded ? (
                        <FolderOpen className="w-4 h-4 text-teal-500 dark:text-teal-400 shrink-0" />
                      ) : (
                        <Folder className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{phase.phaseName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-teal-300'
                      }`}>
                        {phase.totalBlueprintsCount} blueprints
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      } ${isPhaseExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Domain Subfolders */}
                  {isPhaseExpanded && (
                    <div className={`p-3 pl-6 space-y-3 border-t ${
                      isLight ? 'bg-slate-50/50 border-slate-200' : 'bg-[#070A13] border-slate-800/60'
                    }`}>
                      {phase.domains.map((domain) => {
                        const isDomainExpanded = expandedTreeNodes.has(domain.id);

                        return (
                          <div key={domain.id} className={`border rounded-xl overflow-hidden ${
                            isLight ? 'border-slate-200 bg-white' : 'border-slate-800/60 bg-slate-900/40'
                          }`}>
                            {/* Domain Subfolder Header */}
                            <div
                              onClick={() => toggleTreeNode(domain.id)}
                              className={`p-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                                isLight ? 'bg-slate-100/70 hover:bg-slate-100' : 'bg-slate-900/60 hover:bg-slate-900/90'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {renderDomainIcon(domain.iconName, `w-3.5 h-3.5 shrink-0 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`)}
                                <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{domain.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                  {domain.blueprints.length} leaf nodes
                                </span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                                  isLight ? 'text-slate-400' : 'text-slate-500'
                                } ${isDomainExpanded ? 'rotate-180' : ''}`} />
                              </div>
                            </div>

                            {/* Leaf Blueprints List */}
                            {isDomainExpanded && (
                              <div className={`p-2 pl-4 space-y-1.5 divide-y ${
                                isLight ? 'divide-slate-200' : 'divide-slate-800/40'
                              }`}>
                                {domain.blueprints.map((bp) => (
                                  <div
                                    key={bp.combinedId}
                                    className={`pt-1.5 first:pt-0 flex items-center justify-between gap-3 p-2 rounded-lg transition-colors group ${
                                      isLight ? 'hover:bg-slate-100' : 'hover:bg-slate-800/40'
                                    }`}
                                  >
                                    <div className="min-w-0 flex-1 space-y-0.5">
                                      <div className="flex items-center gap-2">
                                        <FileCode className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                                        <p className={`text-xs font-bold transition-colors ${
                                          isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-slate-100 group-hover:text-teal-300'
                                        }`}>
                                          {bp.diagramName}
                                        </p>
                                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                                          isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-400'
                                        }`}>
                                          {bp.abstractionLevel}
                                        </span>
                                      </div>
                                      <p className={`text-[10px] truncate pl-5.5 ${
                                        isLight ? 'text-slate-500' : 'text-slate-400'
                                      }`}>
                                        {bp.uiCardDesc}
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => onPreviewBlueprint(bp.combinedId)}
                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                          isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                                        }`}
                                      >
                                        <Eye className="w-3 h-3" />
                                        <span>Preview</span>
                                      </button>
                                      {onCustomizeWithPrompt && (
                                        <button
                                          type="button"
                                          onClick={() => onCustomizeWithPrompt(bp)}
                                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                                            isLight
                                              ? 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-800'
                                              : 'bg-purple-950/40 hover:bg-purple-900/60 border-purple-700/60 text-purple-300'
                                          }`}
                                          title="Customize with AI Prompt"
                                        >
                                          <Sparkles className="w-3 h-3" />
                                          <span>AI Prompt</span>
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => onSelectBlueprint(bp.combinedId)}
                                        className="px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-bg-dark text-[11px] font-black flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                                      >
                                        <Zap className="w-3 h-3" />
                                        <span>Open Canvas</span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      ) : (

        /* 🎴 VIEW MODE: Grouped Domain Sections Grid (Top-Down Categorized) */
        <div className="space-y-10">
          {filteredHierarchy.map((phase) => (
            <div key={phase.id} className="space-y-6">
              
              {/* Phase Header Section Banner */}
              <div className={`flex items-center justify-between gap-4 border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-slate-800'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${phase.badgeColor} shrink-0`}>
                    <span className="text-sm font-bold">🏛️</span>
                  </div>
                  <div>
                    <h3 className={`text-base font-black flex items-center gap-2 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      <span>{phase.phaseName}</span>
                    </h3>
                    <p className={`text-xs mt-0.5 ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {phase.description}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                  isLight ? 'bg-slate-100 border-slate-200 text-teal-800' : 'bg-slate-900 border-slate-800 text-teal-300'
                }`}>
                  {phase.totalBlueprintsCount} Blueprints
                </span>
              </div>

              {/* Nested Domain Sections inside Phase */}
              <div className="space-y-6 pl-0 md:pl-2">
                {phase.domains.map((domain) => (
                  <div key={domain.id} className="space-y-3.5">
                    
                    {/* Domain Category Ribbon */}
                    <div className={`flex items-center justify-between gap-3 border px-3.5 py-2 rounded-xl ${
                      isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/70 border-slate-800/80'
                    }`}>
                      <div className="flex items-center gap-2">
                        {renderDomainIcon(domain.iconName, `w-4 h-4 shrink-0 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`)}
                        <span className={`text-xs font-extrabold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{domain.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {domain.blueprints.length} Leaf Blueprint{domain.blueprints.length === 1 ? '' : 's'}
                      </span>
                    </div>

                    {/* Leaf Blueprints Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {domain.blueprints.map((bp) => {
                        const isActive = bp.combinedId === activeBlueprintId;

                        return (
                          <div
                            key={bp.combinedId}
                            className={`rounded-2xl p-4 flex flex-col justify-between transition-all group hover:scale-[1.01] relative ${
                              isLight
                                ? isActive
                                  ? 'ring-2 ring-teal-500 bg-white border border-teal-500 shadow-md text-slate-800'
                                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 text-slate-800'
                                : isActive
                                  ? 'ring-2 ring-teal-400 bg-slate-900/90 glass-panel border-panel-border/60 text-slate-100'
                                  : 'glass-panel border-panel-border/60 hover:border-teal-500/50 text-slate-100'
                            }`}
                          >
                            <div className="space-y-2.5">
                              {/* Top-Down Breadcrumb Tag */}
                              <div className={`flex items-center gap-1 text-[9px] font-mono truncate ${
                                isLight ? 'text-slate-500' : 'text-slate-400'
                              }`}>
                                <span>{phase.shortName.split(':')[0]}</span>
                                <span>›</span>
                                <span className={isLight ? 'text-indigo-600 font-bold truncate' : 'text-indigo-300 truncate'}>{domain.shortName}</span>
                              </div>

                              {/* Badges Row */}
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded border ${
                                  isLight ? 'bg-cyan-50 text-cyan-800 border-cyan-200' : 'bg-cyan-950 text-cyan-300 border-cyan-800/50'
                                }`}>
                                  {bp.combinedId.split('_')[0]}
                                </span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                                  isLight ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-purple-950 text-purple-300 border-purple-800/50'
                                }`}>
                                  {bp.abstractionLevel}
                                </span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                                  isLight ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-amber-950 text-amber-300 border-amber-800/50'
                                }`}>
                                  {bp.stackLayer}
                                </span>
                              </div>

                              {/* Blueprint Title */}
                              <h4 className={`text-xs md:text-sm font-bold transition-colors leading-snug line-clamp-2 ${
                                isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'
                              }`}>
                                {bp.diagramName}
                              </h4>

                              {/* Blueprint Card Description */}
                              <p className={`text-[11px] leading-relaxed line-clamp-3 ${
                                isLight ? 'text-slate-600' : 'text-slate-400'
                              }`}>
                                {bp.uiCardDesc}
                              </p>

                              {/* Core GCP Services Tag Pills */}
                              {bp.coreGcpServices && bp.coreGcpServices.length > 0 && (
                                <div className="flex items-center gap-1 flex-wrap pt-1">
                                  {bp.coreGcpServices.slice(0, 3).map((srv) => (
                                    <span
                                      key={srv}
                                      className={`text-[9px] font-medium px-1.5 py-0.2 rounded border ${
                                        isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-900 text-slate-400 border-slate-800'
                                      }`}
                                    >
                                      {srv}
                                    </span>
                                  ))}
                                  {bp.coreGcpServices.length > 3 && (
                                    <span className={`text-[9px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                                      +{bp.coreGcpServices.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Card Footer Action Buttons */}
                            <div className={`pt-3 mt-3 border-t flex items-center justify-between gap-1.5 ${
                              isLight ? 'border-slate-200' : 'border-slate-800/80'
                            }`}>
                              <button
                                type="button"
                                onClick={() => onPreviewBlueprint(bp.combinedId)}
                                className={`px-2 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                  isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                                }`}
                                title="Quick 16:9 Master Preview"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Preview</span>
                              </button>

                              {onCustomizeWithPrompt && (
                                <button
                                  type="button"
                                  onClick={() => onCustomizeWithPrompt(bp)}
                                  className={`px-2 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                                    isLight
                                      ? 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-800'
                                      : 'bg-purple-950/40 hover:bg-purple-900/60 border-purple-700/60 text-purple-300'
                                  }`}
                                  title="Customize blueprint with AI prompt"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  <span>Prompt</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => onSelectBlueprint(bp.combinedId)}
                                className="px-2.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-bg-dark text-xs font-black flex items-center gap-1 transition-all shadow-md cursor-pointer hover:scale-105"
                                title="Launch this leaf blueprint into Design Canvas"
                              >
                                <Zap className="w-3 h-3 fill-bg-dark" />
                                <span>Canvas</span>
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      )}

    </div>
  );
};
