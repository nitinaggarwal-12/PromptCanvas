'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Folder,
  FolderPlus,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Layers,
  Shield,
  Database,
  Bot,
  Cpu,
  Briefcase,
  Rocket,
  Building2,
  Award,
  Check,
  Star,
  Clock,
  FileCode,
  X,
  LayoutGrid,
  ListTree
} from 'lucide-react';
import {
  getArchitectureHierarchy,
  getBlueprintBreadcrumbs,
  getSiblingBlueprints,
  ArchitectureHierarchyPhase,
  ArchitectureHierarchyDomain
} from '@/lib/architectureHierarchy';
import { normalizeArchitectureId } from '@/lib/architectureTypes';
import { BlueprintKnowledgeItem, BLUEPRINT_KNOWLEDGE_MATRIX } from '@/lib/blueprintKnowledgeMatrix';
import { Diagram } from '@/lib/db';
import { formatRelativeTime } from '@/lib/graph/xmlNodesParser';

interface UnifiedProjectSelectorProps {
  activeDiagram: Diagram | null;
  diagrams: Diagram[];
  selectedArchType: string;
  activeVersionNumber?: number;
  disabled?: boolean;
  onSelectDiagram: (diagramId: string) => void;
  onCreateNewDiagram: (name: string, templateArchId?: string) => void;
  onSelectBlueprint: (blueprintId: string) => void;
  onOpenCreateModal?: () => void;
}

export const UnifiedProjectSelector: React.FC<UnifiedProjectSelectorProps> = ({
  activeDiagram,
  diagrams,
  selectedArchType,
  activeVersionNumber = 1,
  disabled = false,
  onSelectDiagram,
  onCreateNewDiagram,
  onSelectBlueprint,
  onOpenCreateModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'blueprints' | 'custom'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingInline, setIsCreatingInline] = useState(false);
  const [newProjectInput, setNewProjectInput] = useState('');

  // Hierarchy data
  const hierarchy = getArchitectureHierarchy();
  const currentCrumbs = getBlueprintBreadcrumbs(selectedArchType);

  // Active hover states inside the cascading blueprint explorer
  const [activeHoverPhaseId, setActiveHoverPhaseId] = useState<string>(
    currentCrumbs?.phase?.id || 'phase_5'
  );
  const [activeHoverDomainId, setActiveHoverDomainId] = useState<string | null>(
    currentCrumbs?.domain?.id || null
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const activeBlueprintRef = useRef<HTMLButtonElement>(null);
  const activePhaseRef = useRef<HTMLDivElement>(null);
  const activeDomainRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef<HTMLButtonElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  // Sort diagrams with the latest updated on top
  const sortedDiagrams = useMemo(() => {
    return [...diagrams].sort((a, b) => {
      const timeA = new Date(a.updated_at || a.created_at || 0).getTime();
      const timeB = new Date(b.updated_at || b.created_at || 0).getTime();
      return timeB - timeA;
    });
  }, [diagrams]);

  // Sync hovered phase/domain whenever current blueprint or flyout open state changes
  useEffect(() => {
    if (currentCrumbs) {
      setActiveHoverPhaseId(currentCrumbs.phase.id);
      setActiveHoverDomainId(currentCrumbs.domain.id);
    }
  }, [selectedArchType, isOpen]);

  // Focus inline input when creating
  useEffect(() => {
    if (isCreatingInline && inlineInputRef.current) {
      inlineInputRef.current.focus();
    }
  }, [isCreatingInline]);

  // Smooth scroll active elements into view when flyout opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (activeTab === 'blueprints') {
          activeBlueprintRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          activeDomainRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          activePhaseRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else if (activeTab === 'projects') {
          activeProjectRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab, activeHoverPhaseId, activeHoverDomainId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreatingInline(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sibling navigation logic for cycling templates
  const siblings = getSiblingBlueprints(selectedArchType);
  const currentSiblingIdx = siblings.findIndex(
    b => b.combinedId === selectedArchType || b.combinedId === currentCrumbs?.blueprint?.combinedId
  );

  const handlePrevSibling = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (siblings.length === 0) return;
    const prevIdx = currentSiblingIdx <= 0 ? siblings.length - 1 : currentSiblingIdx - 1;
    onSelectBlueprint(siblings[prevIdx].combinedId);
  };

  const handleNextSibling = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (siblings.length === 0) return;
    const nextIdx = currentSiblingIdx >= siblings.length - 1 ? 0 : currentSiblingIdx + 1;
    onSelectBlueprint(siblings[nextIdx].combinedId);
  };

  // Find currently hovered phase and domains with active fallback
  const hoveredPhase = hierarchy.find(p => p.id === activeHoverPhaseId) || 
    (currentCrumbs ? hierarchy.find(p => p.id === currentCrumbs.phase.id) : null) || 
    hierarchy[0];

  const hoveredDomain = 
    hoveredPhase.domains.find(d => d.id === activeHoverDomainId) ||
    (hoveredPhase.id === currentCrumbs?.phase?.id ? hoveredPhase.domains.find(d => d.id === currentCrumbs?.domain?.id) : null) ||
    hoveredPhase.domains[0];

  // Helper for domain icons
  const renderDomainIcon = (iconName: string, className: string = 'w-3.5 h-3.5') => {
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

  // Handle inline project creation
  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newProjectInput.trim();
    if (!name) return;
    onCreateNewDiagram(name, selectedArchType);
    setNewProjectInput('');
    setIsCreatingInline(false);
    setIsOpen(false);
  };

  // Search filtered results across Projects AND Blueprint Knowledge Matrix
  const q = searchQuery.toLowerCase().trim();
  const searchMatchedProjects = sortedDiagrams.filter(d => 
    (d.name || '').toLowerCase().includes(q) ||
    (d.architecture_type || '').toLowerCase().includes(q)
  );

  const searchMatchedBlueprints: { phase: ArchitectureHierarchyPhase; domain: ArchitectureHierarchyDomain; blueprint: BlueprintKnowledgeItem }[] = [];
  if (q) {
    for (const phase of hierarchy) {
      for (const domain of phase.domains) {
        for (const bp of domain.blueprints) {
          if (
            bp.diagramName.toLowerCase().includes(q) ||
            bp.combinedId.toLowerCase().includes(q) ||
            bp.domain.toLowerCase().includes(q) ||
            bp.phaseName.toLowerCase().includes(q) ||
            (bp.intentKeywords && bp.intentKeywords.toLowerCase().includes(q))
          ) {
            searchMatchedBlueprints.push({ phase, domain, blueprint: bp });
          }
        }
      }
    }
  }

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {/* Unified Project & Top-Down Hierarchy Combined Header Bar */}
      <div className="flex items-center gap-1.5 bg-[#070A13] border border-panel-border/80 hover:border-teal-500/60 rounded-xl p-1 shadow-md transition-all">
        
        {/* Project Icon & Label */}
        <div className="flex items-center gap-1.5 pl-1.5 pr-1 text-slate-400 select-none">
          <Folder className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-400 hidden xl:inline">
            Project:
          </span>
        </div>

        {/* Previous Blueprint Quick Switch Arrow */}
        <button
          type="button"
          onClick={handlePrevSibling}
          disabled={disabled}
          className="p-1 bg-slate-900/80 hover:bg-teal-500/20 text-slate-400 hover:text-teal-300 rounded-md transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none shrink-0"
          title={`Previous Blueprint in ${currentCrumbs?.domain?.shortName || 'Domain'} (← ArrowLeft)`}
        >
          <ChevronLeft className="w-3 h-3" />
        </button>

        {/* Main Unified Project Trigger Button */}
        <button
          type="button"
          id="workspace-canvas-project-selector"
          disabled={disabled}
          onClick={() => {
            const nextOpen = !isOpen;
            if (nextOpen && currentCrumbs) {
              setActiveHoverPhaseId(currentCrumbs.phase.id);
              setActiveHoverDomainId(currentCrumbs.domain.id);
            }
            setIsOpen(nextOpen);
            setSearchQuery('');
            setIsCreatingInline(false);
          }}
          className="flex items-center gap-2 px-2 py-1 text-left rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 hover:border-teal-500/40 transition-all cursor-pointer group"
          title="Click to switch projects, search, create new project, or choose from 50 Architectural Blueprints"
        >
          {/* Project Active Name */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-teal-400 font-black text-xs shrink-0">✨</span>
            <span className="text-xs font-black text-teal-200 group-hover:text-white truncate max-w-[130px] sm:max-w-[170px] md:max-w-[210px]">
              {activeDiagram?.name || 'Select Project'}
            </span>
          </div>

          <span className="text-slate-600 hidden sm:inline text-xs">|</span>

          {/* Level 1: Phase Tag */}
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700/60 shrink-0">
            <span>🏛️</span>
            <span>{currentCrumbs?.phase?.shortName?.split(':')[0] || 'Phase 5'}</span>
          </span>

          {/* Level 2: Domain Tag */}
          <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shrink-0">
            {renderDomainIcon(currentCrumbs?.domain?.iconName || 'Layers', 'w-3 h-3')}
            <span className="truncate max-w-[90px]">{currentCrumbs?.domain?.shortName || 'Domain'}</span>
          </span>

          {/* Level 3: Leaf Blueprint Name & Version */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs font-bold text-slate-300 group-hover:text-teal-200 truncate max-w-[120px] sm:max-w-[180px] md:max-w-[240px]">
              {currentCrumbs?.blueprint?.diagramName || 'Select Blueprint'}
            </span>
            <span className="text-[10px] font-mono font-black px-1.5 py-0.2 rounded bg-teal-950 text-teal-400 border border-teal-800/80 shrink-0">
              v{activeVersionNumber}
            </span>
          </div>

          <ChevronDown className={`w-3.5 h-3.5 text-teal-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Next Blueprint Quick Switch Arrow */}
        <button
          type="button"
          onClick={handleNextSibling}
          disabled={disabled}
          className="p-1 bg-slate-900/80 hover:bg-teal-500/20 text-slate-400 hover:text-teal-300 rounded-md transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none shrink-0"
          title={`Next Blueprint in ${currentCrumbs?.domain?.shortName || 'Domain'} (→ ArrowRight)`}
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Unified Hierarchical Flyout Menu */}
      {isOpen && (
        <div className="header-dropdown-menu absolute left-0 top-full mt-2 w-[920px] max-w-[96vw] bg-[#070A13] border border-teal-500/40 rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col max-h-[580px] animate-in fade-in zoom-in-95 duration-150">
          
          {/* 1. Header Toolbar (Search + Tab Switcher + Create Action) */}
          <div className="p-3 border-b border-slate-800 bg-[#090D18] flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3">
              
              {/* Search Bar */}
              <div className="flex items-center gap-2.5 flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5">
                <Search className="w-4 h-4 text-teal-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search projects, custom diagrams, or all 50 blueprints (e.g. ApexPay, Lakehouse, RAG)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-white p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Create New Project / Diagram Action */}
              <div className="flex items-center gap-2 shrink-0">
                {!isCreatingInline ? (
                  <button
                    type="button"
                    onClick={() => setIsCreatingInline(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                    title="Create a new Project or Custom Diagram"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>
                ) : (
                  <form onSubmit={handleCreateProjectSubmit} className="flex items-center gap-1.5">
                    <input
                      ref={inlineInputRef}
                      type="text"
                      placeholder="Project Name..."
                      value={newProjectInput}
                      onChange={(e) => setNewProjectInput(e.target.value)}
                      className="bg-slate-900 border border-teal-400 rounded-lg px-2.5 py-1 text-xs text-white outline-none w-36 font-semibold"
                    />
                    <button
                      type="submit"
                      disabled={!newProjectInput.trim()}
                      className="px-2.5 py-1 bg-teal-accent hover:bg-teal-hover text-bg-dark text-xs font-black rounded-lg cursor-pointer disabled:opacity-40"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCreatingInline(false)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Projects vs. Blueprint Hierarchy Catalog vs. Custom Diagrams) */}
            {!searchQuery.trim() && (
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'projects'
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5" />
                    <span>📁 Saved Projects ({diagrams.length})</span>
                    <span className="text-[10px] font-mono text-teal-400/80 font-normal">Latest on top</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('blueprints')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'blueprints'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>🏛️ Blueprint Catalog (Domain → Phase → Blueprint)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('custom')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'custom'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>✨ Custom Architecture</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono text-slate-500 hidden md:inline">
                  {activeTab === 'projects' ? 'Select or search project to load' : 'Hover over Phase & Domain to explore templates'}
                </span>
              </div>
            )}
          </div>

          {/* 2. Body Section */}
          {searchQuery.trim() ? (
            /* Search Results Mode (Dual Projects + Blueprints) */
            <div className="p-3 overflow-y-auto max-h-[480px] space-y-4 divide-y divide-slate-800/80">
              
              {/* Matched Projects */}
              {searchMatchedProjects.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-black text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5" />
                    <span>Matching Projects & Canvases ({searchMatchedProjects.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchMatchedProjects.map((d) => {
                      const isActive = d.id === activeDiagram?.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            onSelectDiagram(d.id);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                            isActive
                              ? 'bg-teal-950/60 border-teal-400 text-white shadow-md'
                              : 'bg-slate-900/40 hover:bg-slate-900 border-slate-800 text-slate-200'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              {isActive ? (
                                <span className="text-teal-400 font-black text-[10px]">✨ ACTIVE</span>
                              ) : (
                                <span className="text-slate-400 text-xs">📁</span>
                              )}
                              <p className="text-xs font-bold text-slate-100 truncate">{d.name}</p>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">
                              Updated {formatRelativeTime(String(d.updated_at || ''))}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matched Blueprints */}
              {searchMatchedBlueprints.length > 0 && (
                <div className="space-y-1.5 pt-3">
                  <div className="text-[11px] font-black text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Matching Blueprint Templates ({searchMatchedBlueprints.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchMatchedBlueprints.map(({ phase, domain, blueprint }) => {
                      const isActive = blueprint.combinedId === selectedArchType;
                      return (
                        <button
                          key={blueprint.combinedId}
                          type="button"
                          onClick={() => {
                            onSelectBlueprint(blueprint.combinedId);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left p-3 hover:bg-teal-950/40 transition-all flex items-start justify-between gap-3 rounded-xl border ${
                            isActive ? 'bg-teal-900/30 border-teal-400' : 'border-slate-800/80 bg-slate-900/30'
                          }`}
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                                {phase.shortName.split(':')[0]}
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                                {domain.shortName}
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                {blueprint.abstractionLevel}
                              </span>
                              {isActive && (
                                <span className="text-[10px] font-black text-teal-400 flex items-center gap-1">
                                  <Check className="w-3 h-3" /> ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-bold text-slate-100">{blueprint.diagramName}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{blueprint.uiCardDesc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {searchMatchedProjects.length === 0 && searchMatchedBlueprints.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No projects or blueprints match &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          ) : activeTab === 'projects' ? (
            /* Tab 1: Saved Projects (Latest on Top) */
            <div className="p-3 overflow-y-auto max-h-[480px] space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
                  Your Projects (Sorted by Latest Activity)
                </span>
                <span className="text-[11px] text-teal-400 font-mono">
                  {sortedDiagrams.length} Total Project{sortedDiagrams.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sortedDiagrams.map((d, idx) => {
                  const isActive = d.id === activeDiagram?.id;
                  const archBreadcrumb = getBlueprintBreadcrumbs(d.architecture_type || '');

                  return (
                    <button
                      key={d.id}
                      ref={isActive ? activeProjectRef : undefined}
                      type="button"
                      onClick={() => {
                        onSelectDiagram(d.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer group ${
                        isActive
                          ? 'bg-teal-950/70 border-teal-400/90 shadow-lg ring-1 ring-teal-400/40 text-white'
                          : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800/80 hover:border-teal-500/50 text-slate-200'
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {idx === 0 && (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              LATEST
                            </span>
                          )}
                          {isActive && (
                            <span className="text-[9px] font-black text-teal-400 flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-teal-950 border border-teal-800">
                              <Check className="w-2.5 h-2.5" /> ACTIVE
                            </span>
                          )}
                          {archBreadcrumb?.phase && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                              {archBreadcrumb.phase.shortName.split(':')[0]}
                            </span>
                          )}
                          {archBreadcrumb?.domain && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300">
                              {archBreadcrumb.domain.shortName}
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-bold text-slate-100 group-hover:text-teal-200 truncate">
                          {d.name}
                        </p>

                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            Updated {formatRelativeTime(String(d.updated_at || ''))}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-teal-400/80">
                            v{d.versions?.length || 1}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform mt-2 ${isActive ? 'text-teal-400' : 'text-slate-600 group-hover:text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>

              {sortedDiagrams.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No projects saved yet. Click "+ New Project" to get started.
                </div>
              )}
            </div>
          ) : activeTab === 'blueprints' ? (
            /* Tab 2: 3-Tier Cascading Blueprint Catalog (Domain -> Phase -> Blueprint) */
            <div className="grid grid-cols-12 divide-x divide-slate-800/80 flex-1 min-h-[420px] max-h-[480px]">
              
              {/* Level 1: 7 Phases (Col 1-4) */}
              <div className="col-span-4 bg-[#090D18] p-2 overflow-y-auto space-y-1">
                <div className="px-2.5 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>1. Lifecycle Phase</span>
                  <span className="text-teal-400">7 Phases</span>
                </div>

                {hierarchy.map((phase) => {
                  const isHovered = phase.id === activeHoverPhaseId;
                  const isCurrentActivePhase = currentCrumbs?.phase?.id === phase.id;

                  return (
                    <div
                      key={phase.id}
                      ref={isCurrentActivePhase ? activePhaseRef : undefined}
                      onMouseEnter={() => {
                        setActiveHoverPhaseId(phase.id);
                        if (currentCrumbs && phase.id === currentCrumbs.phase.id && currentCrumbs.domain?.id) {
                          setActiveHoverDomainId(currentCrumbs.domain.id);
                        } else if (phase.domains.length > 0) {
                          setActiveHoverDomainId(phase.domains[0].id);
                        }
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-2 border ${
                        isHovered
                          ? 'bg-slate-800/95 border-teal-500/60 text-white shadow-md ring-1 ring-teal-500/30'
                          : isCurrentActivePhase
                          ? 'bg-teal-950/30 border-teal-500/40 text-teal-200'
                          : 'border-transparent text-slate-300 hover:bg-slate-900/80 hover:text-white'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">🏛️</span>
                          <span className="text-xs font-extrabold truncate">{phase.shortName}</span>
                          {isCurrentActivePhase && (
                            <span className="text-[9px] font-mono font-black px-1.5 py-0.2 rounded bg-teal-950 text-teal-400 border border-teal-800/80 shrink-0">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {phase.totalBlueprintsCount} Blueprint{phase.totalBlueprintsCount === 1 ? '' : 's'}
                        </p>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isHovered ? 'text-teal-400 translate-x-0.5' : isCurrentActivePhase ? 'text-teal-400' : 'text-slate-600'}`} />
                    </div>
                  );
                })}
              </div>

              {/* Level 2: Domains in Active Phase (Col 5-7) */}
              <div className="col-span-3 bg-[#0B0F1E] p-2 overflow-y-auto space-y-1">
                <div className="px-2.5 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>2. Domain Track</span>
                  <span className="text-indigo-400">{hoveredPhase.domains.length} Domains</span>
                </div>

                {hoveredPhase.domains.map((domain) => {
                  const isHovered = domain.id === hoveredDomain?.id;
                  const isCurrentActiveDomain = currentCrumbs?.phase?.id === hoveredPhase.id && currentCrumbs?.domain?.id === domain.id;

                  return (
                    <div
                      key={domain.id}
                      ref={isCurrentActiveDomain ? activeDomainRef : undefined}
                      onMouseEnter={() => setActiveHoverDomainId(domain.id)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-2 border ${
                        isHovered
                          ? 'bg-indigo-950/80 border-indigo-500/60 text-white shadow-md ring-1 ring-indigo-500/30'
                          : isCurrentActiveDomain
                          ? 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200'
                          : 'border-transparent text-slate-300 hover:bg-slate-900/60 hover:text-white'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          {renderDomainIcon(domain.iconName, `w-3.5 h-3.5 ${isHovered || isCurrentActiveDomain ? 'text-indigo-300' : 'text-indigo-400'} shrink-0`)}
                          <span className="text-xs font-bold truncate">{domain.shortName}</span>
                          {isCurrentActiveDomain && (
                            <span className="text-[9px] font-mono font-black px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/80 shrink-0">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {domain.blueprints.length} Leaf Blueprint{domain.blueprints.length === 1 ? '' : 's'}
                        </p>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isHovered ? 'text-indigo-400 translate-x-0.5' : isCurrentActiveDomain ? 'text-indigo-400' : 'text-slate-600'}`} />
                    </div>
                  );
                })}
              </div>

              {/* Level 3: Leaf Blueprints in Active Domain (Col 8-12) */}
              <div className="col-span-5 bg-[#070A13] p-2 overflow-y-auto space-y-1.5">
                <div className="px-2.5 py-1.5 text-[10px] font-black text-teal-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <span>3. Leaf Blueprints</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 truncate">{hoveredDomain?.shortName}</span>
                  </div>
                  <span className="text-teal-300 font-mono text-[10px]">
                    {hoveredDomain?.blueprints?.length || 0} Total
                  </span>
                </div>

                {(hoveredDomain?.blueprints || []).map((bp) => {
                  const isActive =
                    bp.combinedId === selectedArchType ||
                    bp.combinedId === currentCrumbs?.blueprint?.combinedId ||
                    normalizeArchitectureId(bp.combinedId) === normalizeArchitectureId(selectedArchType);

                  return (
                    <button
                      key={bp.combinedId}
                      ref={isActive ? activeBlueprintRef : undefined}
                      type="button"
                      onClick={() => {
                        onSelectBlueprint(bp.combinedId);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 border cursor-pointer ${
                        isActive
                          ? 'bg-teal-950/80 border-teal-400/90 shadow-lg ring-1 ring-teal-400/40'
                          : 'bg-slate-900/40 hover:bg-slate-900 border-slate-800/80 hover:border-teal-500/40 text-slate-200'
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                            {bp.combinedId.split('_')[0]}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/50">
                            {bp.abstractionLevel}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-black text-teal-400 flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-slate-100 leading-snug">{bp.diagramName}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                          {bp.uiCardDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          ) : (
            /* Tab 3: Custom Architecture Options */
            <div className="p-4 space-y-3 text-center">
              <div className="max-w-md mx-auto space-y-3 py-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Create Custom Architecture Under Project</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Start with a custom prompt or blank canvas, customize with AI prompts, and save versions under your active project.
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenCreateModal) onOpenCreateModal();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 bg-teal-accent hover:bg-teal-hover text-bg-dark text-xs font-black rounded-xl shadow-md cursor-pointer transition-all hover:scale-105"
                  >
                    Open Prompt Canvas Studio
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Footer Bar */}
          <div className="px-4 py-2.5 bg-[#090D18] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span>💡 <strong className="text-slate-200">Project &amp; Topology Hub:</strong> Choose project, search designs, or pick from 50 canonical blueprints</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-teal-400">
              <span>Use ‹ › to cycle blueprints</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
