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
  pendingProjectName?: string | null;
  diagrams: Diagram[];
  selectedArchType: string;
  activeVersionNumber?: number;
  disabled?: boolean;
  theme?: 'light' | 'dark';
  onSelectDiagram: (diagramId: string) => void;
  onCreateNewProject: (name: string) => void;
  onSelectBlueprint: (blueprintId: string) => void;
  onOpenBlueprintCatalog: () => void;
  onOpenPromptDossier?: () => void;
}

export const ProjectHeaderNav: React.FC<ProjectHeaderNavProps> = ({
  activeDiagram,
  pendingProjectName,
  diagrams,
  selectedArchType,
  activeVersionNumber = 1,
  disabled = false,
  theme = 'dark',
  onSelectDiagram,
  onCreateNewProject,
  onSelectBlueprint,
  onOpenBlueprintCatalog,
  onOpenPromptDossier
}) => {
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectNameInput, setNewProjectNameInput] = useState('');

  const projectContainerRef = useRef<HTMLDivElement>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const isLight = theme === 'light';

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
  const currentViewTitle = activeDiagram
    ? (currentCrumbs?.blueprint?.diagramName || archMeta?.name || 'Primary Architecture View')
    : pendingProjectName
    ? 'Get Started'
    : 'Select View';

  // Find all distinct architecture views in the active diagram
  const activeDiagramViews = useMemo(() => {
    if (!activeDiagram && !pendingProjectName) {
      return [];
    }

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
  }, [activeDiagram, pendingProjectName, selectedArchType, activeVersionNumber, currentCrumbs]);

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when creating inline project
  useEffect(() => {
    if (isCreatingProject) {
      inlineInputRef.current?.focus();
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
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all shadow-sm cursor-pointer group border ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-teal-600 text-teal-800'
              : 'bg-[#090D18] hover:bg-slate-900 border-teal-500/50 hover:border-teal-400 text-teal-200'
          }`}
          title="Switch Project, Search Projects, or Create a New Project"
        >
          <Folder className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
          <span className={`text-[10px] uppercase font-mono hidden sm:inline ${isLight ? 'text-teal-700 font-bold' : 'text-teal-400/70'}`}>
            Project:
          </span>
          <span className={`truncate max-w-[140px] sm:max-w-[190px] md:max-w-[240px] font-bold ${
            isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-200'
          }`}>
            {activeDiagram?.name || pendingProjectName || 'Select Project'}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
            isProjectDropdownOpen ? 'rotate-180' : ''
          } ${isLight ? 'text-slate-600' : 'text-teal-400'}`} />
        </button>

        {/* Project Dropdown Menu */}
        {isProjectDropdownOpen && (
          <div className={`header-dropdown-menu absolute left-0 top-full mt-2 w-[380px] max-w-[92vw] rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col max-h-[480px] animate-in fade-in zoom-in-95 duration-150 border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-[#070A13] border-teal-500/40 text-slate-100'
          }`}>
            
            {/* Header / Search & New Project */}
            <div className={`p-3 border-b flex flex-col gap-2 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090D18] border-slate-800'
            }`}>
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <Folder className="w-3.5 h-3.5 text-teal-500" />
                  <span>Projects ({sortedProjects.length})</span>
                </span>
                
                {!isCreatingProject ? (
                  <button
                    type="button"
                    onClick={() => setIsCreatingProject(true)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm border ${
                      isLight
                        ? 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-800'
                        : 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-500/40 text-teal-300'
                    }`}
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
                      className={`border rounded-lg px-2 py-0.5 text-xs outline-none w-32 font-semibold ${
                        isLight
                          ? 'bg-white border-teal-500 text-slate-900 placeholder-slate-400'
                          : 'bg-slate-900 border-teal-400 text-white placeholder-slate-500'
                      }`}
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
                      className="p-0.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Search Bar */}
              <div className={`flex items-center gap-2 border rounded-xl px-2.5 py-1 ${
                isLight ? 'bg-white border-slate-300' : 'bg-slate-900/90 border-slate-700/80'
              }`}>
                <Search className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search saved projects..."
                  value={projectSearchQuery}
                  onChange={(e) => setProjectSearchQuery(e.target.value)}
                  className={`w-full text-xs outline-none font-medium ${
                    isLight ? 'bg-transparent text-slate-900 placeholder-slate-400' : 'bg-transparent text-slate-100 placeholder-slate-400'
                  }`}
                />
                {projectSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setProjectSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Project List */}
            <div className="p-2 space-y-1 overflow-y-auto max-h-[320px]">
              {filteredProjects.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No projects match &ldquo;{projectSearchQuery}&rdquo;
                </div>
              ) : (
                filteredProjects.map((diag, index) => {
                  const isCurrent = diag.id === activeDiagram?.id;
                  const isLatest = index === 0;
                  const verCount = diag.versions?.length || 1;
                  const timeVal = diag.updated_at || diag.created_at;
                  const timeFormatted = formatRelativeTime(timeVal instanceof Date ? timeVal.toISOString() : String(timeVal || ''));

                  return (
                    <button
                      key={diag.id}
                      type="button"
                      onClick={() => {
                        onSelectDiagram(diag.id);
                        setIsProjectDropdownOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1 cursor-pointer ${
                        isCurrent
                          ? isLight
                            ? 'bg-teal-50 border-teal-400 text-teal-950 shadow-sm'
                            : 'bg-teal-950/70 border-teal-400 text-white shadow-md'
                          : isLight
                            ? 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800'
                            : 'bg-slate-900/40 hover:bg-slate-900 border-transparent hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {isLatest && (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 shrink-0">
                              LATEST
                            </span>
                          )}
                          <p className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                            {diag.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono text-slate-400">v{verCount}</span>
                          {isCurrent && (
                            <span className="text-[10px] font-black text-teal-500 flex items-center gap-0.5">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Associated Real Use Case Prompt Snippet */}
                      {diag.versions?.[0]?.prompt && (
                        <p className={`text-[11px] line-clamp-1 italic font-normal ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          💡 &ldquo;{diag.versions[0].prompt}&rdquo;
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                        <span>{diag.architecture_type ? diag.architecture_type.replace(/_/g, ' ') : 'Architecture'}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{timeFormatted}</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

          </div>
        )}
      </div>

      <span className={`font-mono text-xs hidden sm:inline ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>/</span>

      {/* 🏛️ PILL 2: PROJECT VIEW SELECTOR (Only Blueprints Active In THIS Project) */}
      <div ref={viewContainerRef} className="relative">
        <button
          type="button"
          id="workspace-view-selector-btn"
          disabled={disabled}
          onClick={() => {
            setIsViewDropdownOpen(!isViewDropdownOpen);
            setIsProjectDropdownOpen(false);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all shadow-sm cursor-pointer group border ${
            isLight
              ? 'bg-indigo-50/70 hover:bg-indigo-100/70 border-indigo-200 hover:border-indigo-400 text-indigo-900'
              : 'bg-[#090D18] hover:bg-slate-900 border-indigo-500/50 hover:border-indigo-400 text-indigo-200'
          }`}
          title="Switch Active Architecture View inside this project or add from 50 blueprint catalog"
        >
          <Layers className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
          <span className={`text-[10px] uppercase font-mono hidden sm:inline ${isLight ? 'text-indigo-700 font-bold' : 'text-indigo-400/70'}`}>
            View:
          </span>
          <span className={`truncate max-w-[140px] sm:max-w-[180px] md:max-w-[220px] font-bold ${
            isLight ? 'text-slate-900 group-hover:text-indigo-800' : 'text-white group-hover:text-indigo-200'
          }`}>
            {currentViewTitle}
          </span>
          {activeDiagram && (
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              isLight ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
            }`}>
              v{activeVersionNumber}
            </span>
          )}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
            isViewDropdownOpen ? 'rotate-180' : ''
          } ${isLight ? 'text-slate-600' : 'text-indigo-400'}`} />
        </button>

        {/* Views in Project Dropdown */}
        {isViewDropdownOpen && (
          <div className={`header-dropdown-menu absolute left-0 top-full mt-2 w-[340px] max-w-[92vw] rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150 border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-[#070A13] border-indigo-500/40 text-slate-100'
          }`}>
            
            <div className={`p-3 border-b flex items-center justify-between ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090D18] border-slate-800'
            }`}>
              <span className={`text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Views In This Project</span>
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                isLight ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-indigo-950/80 text-indigo-300 border-indigo-800/80'
              }`}>
                {activeDiagramViews.length} View{activeDiagramViews.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* List of views in this project */}
            <div className="p-2 space-y-1 max-h-[260px] overflow-y-auto">
              {activeDiagramViews.length === 0 ? (
                <div className="p-4 text-center space-y-1.5">
                  <p className={`text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    No Active Architecture Open
                  </p>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Generate from a prompt or open a blueprint to start adding architectural views.
                  </p>
                </div>
              ) : (
                activeDiagramViews.map((v) => {
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
                          ? isLight
                            ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-sm'
                            : 'bg-indigo-950/70 border-indigo-400 text-white shadow-md'
                          : isLight
                            ? 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800'
                            : 'bg-slate-900/40 hover:bg-slate-900 border-transparent hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <p className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                          {v.name}
                        </p>
                        <span className="text-[10px] font-mono text-indigo-500">v{v.latestVersion}</span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-black text-indigo-500 flex items-center gap-1 shrink-0">
                          <Check className="w-3 h-3" /> ACTIVE
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Add New Architecture View Action Button */}
            <div className={`p-2 border-t ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090D18] border-slate-800'}`}>
              <button
                type="button"
                onClick={() => {
                  setIsViewDropdownOpen(false);
                  onOpenBlueprintCatalog();
                }}
                className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm ${
                  isLight
                    ? 'bg-white hover:bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-indigo-950/50 hover:bg-indigo-900/60 border-indigo-500/40 text-indigo-300'
                }`}
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
