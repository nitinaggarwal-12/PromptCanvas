'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Folder,
  Plus,
  Search,
  ChevronDown,
  Sparkles,
  Layers,
  Check,
  Clock,
  X,
  FileCode,
  Edit2
} from 'lucide-react';
import { Diagram } from '@/lib/db';
import { getBlueprintBreadcrumbs } from '@/lib/architectureHierarchy';
import { formatRelativeTime } from '@/lib/graph/xmlNodesParser';
import { getArchitectureTypeById } from '@/lib/architectureTypes';

interface ProjectHeaderNavProps {
  activeDiagram: Diagram | null;
  diagrams: Diagram[];
  selectedArchType: string;
  activeVersionNumber?: number;
  disabled?: boolean;
  onSelectDiagram: (diagramId: string) => void;
  onCreateNewProject: (name: string) => void;
  onSelectBlueprint: (blueprintId: string) => void;
  onOpenBlueprintCatalog: () => void;
}

export const ProjectHeaderNav: React.FC<ProjectHeaderNavProps> = ({
  activeDiagram,
  diagrams,
  selectedArchType,
  activeVersionNumber = 1,
  disabled = false,
  onSelectDiagram,
  onCreateNewProject,
  onSelectBlueprint,
  onOpenBlueprintCatalog
}) => {
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectNameInput, setNewProjectNameInput] = useState('');

  const projectContainerRef = useRef<HTMLDivElement>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  // Sort projects with latest on top
  const sortedProjects = useMemo(() => {
    return [...diagrams].sort((a, b) => {
      const timeA = new Date(a.updated_at || a.created_at || 0).getTime();
      const timeB = new Date(b.updated_at || b.created_at || 0).getTime();
      return timeB - timeA;
    });
  }, [diagrams]);

  // Current active blueprint metadata
  const currentCrumbs = getBlueprintBreadcrumbs(selectedArchType);
  const archMeta = getArchitectureTypeById(selectedArchType);
  const currentViewTitle = currentCrumbs?.blueprint?.diagramName || archMeta?.name || 'Primary Architecture View';

  // Find all distinct architecture views in the active diagram
  const activeDiagramViews = useMemo(() => {
    const viewMap = new Map<string, { archType: string; latestVersion: number; name: string }>();
    
    // Always include current active architecture type
    const curMeta = getArchitectureTypeById(selectedArchType);
    viewMap.set(selectedArchType, {
      archType: selectedArchType,
      latestVersion: activeVersionNumber || 1,
      name: currentCrumbs?.blueprint?.diagramName || curMeta?.name || selectedArchType
    });

    // Extract other views from version history
    if (activeDiagram?.versions) {
      for (const v of activeDiagram.versions) {
        if (v.architecture_type && !viewMap.has(v.architecture_type)) {
          const vCrumbs = getBlueprintBreadcrumbs(v.architecture_type);
          const vMeta = getArchitectureTypeById(v.architecture_type);
          viewMap.set(v.architecture_type, {
            archType: v.architecture_type,
            latestVersion: v.version_number,
            name: vCrumbs?.blueprint?.diagramName || vMeta?.name || v.architecture_type
          });
        }
      }
    }
    return Array.from(viewMap.values());
  }, [activeDiagram, selectedArchType, activeVersionNumber, currentCrumbs]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        projectContainerRef.current &&
        !projectContainerRef.current.contains(event.target as Node)
      ) {
        setIsProjectDropdownOpen(false);
        setIsCreatingProject(false);
      }
      if (
        viewContainerRef.current &&
        !viewContainerRef.current.contains(event.target as Node)
      ) {
        setIsViewDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus inline creation input
  useEffect(() => {
    if (isCreatingProject && inlineInputRef.current) {
      inlineInputRef.current.focus();
    }
  }, [isCreatingProject]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newProjectNameInput.trim();
    if (!name) return;
    onCreateNewProject(name);
    setNewProjectNameInput('');
    setIsCreatingProject(false);
    setIsProjectDropdownOpen(false);
  };

  const filteredProjects = sortedProjects.filter(d =>
    (d.name || '').toLowerCase().includes(projectSearchQuery.toLowerCase().trim())
  );

  return (
    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
      
      {/* 📁 PILL 1: PROJECT CONTAINER SELECTOR */}
      <div ref={projectContainerRef} className="relative">
        <button
          type="button"
          id="workspace-project-selector-btn"
          disabled={disabled}
          onClick={() => {
            setIsProjectDropdownOpen(!isProjectDropdownOpen);
            setIsViewDropdownOpen(false);
            setProjectSearchQuery('');
            setIsCreatingProject(false);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D18] hover:bg-slate-900 border border-teal-500/50 hover:border-teal-400 text-teal-200 font-extrabold text-xs transition-all shadow-md cursor-pointer group"
          title="Switch Project, Search Projects, or Create a New Project"
        >
          <Folder className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="text-[10px] uppercase font-mono text-teal-400/70 hidden sm:inline">Project:</span>
          <span className="truncate max-w-[140px] sm:max-w-[190px] md:max-w-[240px] text-white group-hover:text-teal-200">
            {activeDiagram?.name || 'Select Project'}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-teal-400 transition-transform ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Project Dropdown Menu */}
        {isProjectDropdownOpen && (
          <div className="header-dropdown-menu absolute left-0 top-full mt-2 w-[380px] max-w-[92vw] bg-[#070A13] border border-teal-500/40 rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col max-h-[480px] animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header / Search & New Project */}
            <div className="p-3 border-b border-slate-800 bg-[#090D18] flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-teal-400" />
                  <span>Projects ({sortedProjects.length})</span>
                </span>
                
                {!isCreatingProject ? (
                  <button
                    type="button"
                    onClick={() => setIsCreatingProject(true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3 h-3" />
                    <span>New Project</span>
                  </button>
                ) : (
                  <form onSubmit={handleCreateSubmit} className="flex items-center gap-1.5">
                    <input
                      ref={inlineInputRef}
                      type="text"
                      placeholder="Project Name..."
                      value={newProjectNameInput}
                      onChange={(e) => setNewProjectNameInput(e.target.value)}
                      className="bg-slate-900 border border-teal-400 rounded-lg px-2 py-0.5 text-xs text-white outline-none w-32 font-semibold"
                    />
                    <button
                      type="submit"
                      disabled={!newProjectNameInput.trim()}
                      className="px-2 py-0.5 bg-teal-accent text-bg-dark text-xs font-black rounded-md cursor-pointer disabled:opacity-40"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCreatingProject(false)}
                      className="p-0.5 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-xl px-2.5 py-1">
                <Search className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search saved projects..."
                  value={projectSearchQuery}
                  onChange={(e) => setProjectSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none font-medium"
                />
                {projectSearchQuery && (
                  <button type="button" onClick={() => setProjectSearchQuery('')} className="text-slate-400 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Projects List (Latest on Top) */}
            <div className="p-2 overflow-y-auto max-h-[340px] space-y-1.5 divide-y divide-slate-800/40">
              {filteredProjects.map((d, idx) => {
                const isActive = d.id === activeDiagram?.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      onSelectDiagram(d.id);
                      setIsProjectDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 cursor-pointer group ${
                      isActive
                        ? 'bg-teal-950/70 border-teal-400 text-white shadow-md'
                        : 'bg-slate-900/40 hover:bg-slate-900 border-transparent hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-1">
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
                        <span className="text-[9px] font-mono text-slate-400">
                          v{d.versions?.length || 1}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-100 group-hover:text-teal-200 truncate">
                        {d.name}
                      </p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        Updated {formatRelativeTime(String(d.updated_at || ''))}
                      </p>
                    </div>
                  </button>
                );
              })}

              {filteredProjects.length === 0 && (
                <div className="py-8 text-center text-slate-500 text-xs">
                  No projects match &ldquo;{projectSearchQuery}&rdquo;
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      <span className="text-slate-700 hidden sm:inline">/</span>

      {/* 🏛️ PILL 2: ACTIVE ARCHITECTURE VIEW IN PROJECT */}
      <div ref={viewContainerRef} className="relative">
        <button
          type="button"
          id="workspace-view-selector-btn"
          disabled={disabled}
          onClick={() => {
            setIsViewDropdownOpen(!isViewDropdownOpen);
            setIsProjectDropdownOpen(false);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D18] hover:bg-slate-900 border border-indigo-500/50 hover:border-indigo-400 text-indigo-200 font-extrabold text-xs transition-all shadow-md cursor-pointer group"
          title="Switch Architecture View in this project or Add a New View from Catalog"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-[10px] uppercase font-mono text-indigo-400/70 hidden md:inline">View:</span>
          
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="truncate max-w-[130px] sm:max-w-[180px] md:max-w-[240px] text-white group-hover:text-indigo-200">
              {currentViewTitle}
            </span>
            <span className="text-[10px] font-mono font-black px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/80 shrink-0">
              v{activeVersionNumber}
            </span>
          </div>

          <ChevronDown className={`w-3.5 h-3.5 text-indigo-400 transition-transform ${isViewDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* View Dropdown Menu */}
        {isViewDropdownOpen && (
          <div className="header-dropdown-menu absolute left-0 top-full mt-2 w-[340px] max-w-[92vw] bg-[#070A13] border border-indigo-500/40 rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            <div className="p-3 border-b border-slate-800 bg-[#090D18] flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Views in this Project</span>
              </span>
              <span className="text-[10px] font-mono text-indigo-400">
                {activeDiagramViews.length} View{activeDiagramViews.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* List of views in this project */}
            <div className="p-2 space-y-1 max-h-[260px] overflow-y-auto">
              {activeDiagramViews.map((v) => {
                const isActive = v.archType === selectedArchType;
                return (
                  <button
                    key={v.archType}
                    type="button"
                    onClick={() => {
                      onSelectBlueprint(v.archType);
                      setIsViewDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-950/70 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-900/40 hover:bg-slate-900 border-transparent hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-xs font-bold text-slate-100 truncate">{v.name}</p>
                      <span className="text-[10px] font-mono text-indigo-400/80">v{v.latestVersion}</span>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-black text-indigo-400 flex items-center gap-1 shrink-0">
                        <Check className="w-3 h-3" /> ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Add New Architecture View Action Button */}
            <div className="p-2 border-t border-slate-800 bg-[#090D18]">
              <button
                type="button"
                onClick={() => {
                  setIsViewDropdownOpen(false);
                  onOpenBlueprintCatalog();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add View from 50 Blueprint Catalog</span>
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
