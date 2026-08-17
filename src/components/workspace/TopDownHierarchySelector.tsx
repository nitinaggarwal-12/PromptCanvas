'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
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
  X
} from 'lucide-react';
import {
  getArchitectureHierarchy,
  getBlueprintBreadcrumbs,
  getSiblingBlueprints,
  ArchitectureHierarchyPhase,
  ArchitectureHierarchyDomain
} from '@/lib/architectureHierarchy';
import { normalizeArchitectureId } from '@/lib/architectureTypes';
import { BlueprintKnowledgeItem } from '@/lib/blueprintKnowledgeMatrix';

interface TopDownHierarchySelectorProps {
  selectedArchType: string;
  onSelectBlueprint: (blueprintId: string) => void;
  activeVersionNumber?: number;
  disabled?: boolean;
}

export const TopDownHierarchySelector: React.FC<TopDownHierarchySelectorProps> = ({
  selectedArchType,
  onSelectBlueprint,
  activeVersionNumber = 1,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Hierarchy data
  const hierarchy = getArchitectureHierarchy();
  const currentCrumbs = getBlueprintBreadcrumbs(selectedArchType);

  // Active navigation states inside the cascading flyout
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

  // Sync hovered phase/domain whenever current blueprint or flyout open state changes
  useEffect(() => {
    if (currentCrumbs) {
      setActiveHoverPhaseId(currentCrumbs.phase.id);
      setActiveHoverDomainId(currentCrumbs.domain.id);
    }
  }, [selectedArchType, isOpen]);

  // Smooth scroll active elements into view when flyout opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        activeBlueprintRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        activeDomainRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        activePhaseRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeHoverPhaseId, activeHoverDomainId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sibling navigation logic
  const siblings = getSiblingBlueprints(selectedArchType);
  const currentSiblingIdx = siblings.findIndex(
    b => b.combinedId === selectedArchType || b.combinedId === currentCrumbs?.blueprint?.combinedId
  );

  const handlePrevSibling = () => {
    if (siblings.length === 0) return;
    const prevIdx = currentSiblingIdx <= 0 ? siblings.length - 1 : currentSiblingIdx - 1;
    onSelectBlueprint(siblings[prevIdx].combinedId);
  };

  const handleNextSibling = () => {
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

  // Search filtered leaf blueprints across the entire matrix
  const searchResults: { phase: ArchitectureHierarchyPhase; domain: ArchitectureHierarchyDomain; blueprint: BlueprintKnowledgeItem }[] = [];
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
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
            searchResults.push({ phase, domain, blueprint: bp });
          }
        }
      }
    }
  }

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {/* Top-Down Breadcrumb Bar Header Control */}
      <div className="flex items-center gap-1 bg-[#070A13] border border-panel-border/80 hover:border-teal-500/50 rounded-xl p-1 shadow-md transition-all">
        
        {/* Previous Leaf Blueprint Button */}
        <button
          type="button"
          onClick={handlePrevSibling}
          disabled={disabled}
          className="p-1.5 bg-slate-900/80 hover:bg-teal-500/20 text-slate-400 hover:text-teal-300 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          title={`Previous Blueprint in ${currentCrumbs?.domain?.shortName || 'Domain'} (← ArrowLeft)`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* The Main Top-Down Trigger Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            const nextOpen = !isOpen;
            if (nextOpen && currentCrumbs) {
              setActiveHoverPhaseId(currentCrumbs.phase.id);
              setActiveHoverDomainId(currentCrumbs.domain.id);
            }
            setIsOpen(nextOpen);
            setSearchQuery('');
          }}
          className="flex items-center gap-2 px-2.5 py-1 text-left rounded-lg hover:bg-slate-900/90 transition-all cursor-pointer group"
          title="Click to explore Top-Down Hierarchy (Phase → Domain → Leaf Blueprint)"
        >
          {/* Level 1: Phase Tag */}
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700/60 shrink-0">
            <span>🏛️</span>
            <span>{currentCrumbs?.phase?.shortName?.split(':')[0] || 'Phase 5'}</span>
          </span>

          <span className="text-slate-600 hidden md:inline text-xs">›</span>

          {/* Level 2: Domain Tag */}
          <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shrink-0">
            {renderDomainIcon(currentCrumbs?.domain?.iconName || 'Layers', 'w-3 h-3')}
            <span className="truncate max-w-[110px]">{currentCrumbs?.domain?.shortName || 'Domain'}</span>
          </span>

          <span className="text-slate-600 hidden lg:inline text-xs">›</span>

          {/* Level 3: Leaf Blueprint Name & Version */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs font-black text-teal-300 group-hover:text-teal-200 truncate max-w-[150px] sm:max-w-[200px] md:max-w-[260px]">
              {currentCrumbs?.blueprint?.diagramName || 'Select Blueprint'}
            </span>
            <span className="text-[10px] font-mono font-black px-1.5 py-0.2 rounded bg-teal-950 text-teal-400 border border-teal-800/80 shrink-0">
              v{activeVersionNumber}
            </span>
          </div>

          <ChevronDown className={`w-3.5 h-3.5 text-teal-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Next Leaf Blueprint Button */}
        <button
          type="button"
          onClick={handleNextSibling}
          disabled={disabled}
          className="p-1.5 bg-slate-900/80 hover:bg-teal-500/20 text-slate-400 hover:text-teal-300 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          title={`Next Blueprint in ${currentCrumbs?.domain?.shortName || 'Domain'} (→ ArrowRight)`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3-Tier Top-Down Cascading Flyout Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[860px] max-w-[95vw] bg-[#070A13] border border-teal-500/40 rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col max-h-[560px] animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header Search Bar */}
          <div className="p-3 border-b border-slate-800 bg-[#090D18] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5">
              <Search className="w-4 h-4 text-teal-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search across all 50 blueprints (e.g. Lakehouse, RAG, Zero-Trust, EDA, FinOps)..."
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

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                Top-Down Hierarchy (50 Blueprints)
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {searchQuery.trim() ? (
            /* Search Results Mode */
            <div className="p-3 overflow-y-auto max-h-[460px] divide-y divide-slate-800/60">
              <div className="text-xs text-slate-400 font-bold mb-2">
                Found {searchResults.length} matching blueprint{searchResults.length === 1 ? '' : 's'}:
              </div>
              {searchResults.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No blueprints match &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                searchResults.map(({ phase, domain, blueprint }) => {
                  const isActive =
                    blueprint.combinedId === selectedArchType ||
                    blueprint.combinedId === currentCrumbs?.blueprint?.combinedId;
                  return (
                    <button
                      key={blueprint.combinedId}
                      type="button"
                      onClick={() => {
                        onSelectBlueprint(blueprint.combinedId);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 hover:bg-teal-950/40 transition-all flex items-start justify-between gap-3 rounded-xl ${
                        isActive ? 'bg-teal-900/30 border-l-2 border-teal-400' : ''
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
                })
              )}
            </div>
          ) : (
            /* 3-Tier Cascading Layout */
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
          )}

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-[#090D18] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span>💡 <strong className="text-slate-200">Top-Down Hierarchy:</strong> Phase → Domain Track → Leaf Blueprint</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-teal-400">
              <span>Use ‹ › arrows to cycle blueprints</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
