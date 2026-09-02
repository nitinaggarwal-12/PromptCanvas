'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Building2,
  Target,
  FileText,
  Network,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { LivingSpecDocument } from '@/lib/spec/livingSpecsGenerator';
import { AstComponent } from '@/lib/ast/architectureAst';

export interface HierarchicalSyncCardProps {
  versionTag: string;
  canvasDiff: string;
  specDiff: string;
  projectTitle: string;
  domain: string;
  livingSpecs: LivingSpecDocument[];
  components: AstComponent[];
  onSelectDoc: (docId: string) => void;
  onSelectNode: (component: AstComponent) => void;
  onSwitchToDiagram: () => void;
  onShareObject?: (targetType: 'project' | 'doc' | 'node', id: string, title: string) => void;
}

export function HierarchicalSyncCard({
  versionTag,
  canvasDiff,
  specDiff,
  projectTitle,
  domain,
  livingSpecs,
  components,
  onSelectDoc,
  onSelectNode,
  onSwitchToDiagram,
  onShareObject
}: HierarchicalSyncCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const showHierarchy = isOpen || isHovered;

  // Highlight top 6 critical core nodes for horizontal pill tray
  const coreNodes = components.slice(0, 6);

  const handleCopyQuickLink = (e: React.MouseEvent, type: 'project' | 'doc' | 'node', id: string, title: string) => {
    e.stopPropagation();
    if (onShareObject) {
      onShareObject(type, id, title);
    } else {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      let url = `${origin}/studio?project=${encodeURIComponent(projectTitle)}&v=${versionTag}`;
      if (type === 'doc') url += `&view=specs&doc=${id}`;
      if (type === 'node') url += `&view=diagram&node=${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div 
      className="mt-2 text-[10.5px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. COLLAPSED PILL HEADER (Closed by default to save 70% space) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left rounded-lg p-2 transition-all flex items-center justify-between border cursor-pointer ${
          isOpen
            ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-1.5 font-bold truncate">
          <span className="text-amber-500">⚡</span>
          <span className="text-slate-900 font-semibold">Synced in {versionTag}:</span>
          <span className="text-slate-500 font-normal truncate">
            {components.length} Nodes · {livingSpecs.length} Specs
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-1 text-slate-400">
          <span className="text-[9px] font-mono font-medium">{isOpen ? 'Pin' : 'Explore'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* 2. EXPANDED / HOVER HIERARCHY TREE */}
      {showHierarchy && (
        <div className="mt-1.5 bg-white border border-slate-200 rounded-xl p-3 space-y-2.5 shadow-xl ring-1 ring-slate-900/5 animate-in fade-in duration-150 z-20">
          
          {/* Level 1 & 2: Project & Use Case Breadcrumb */}
          <div className="space-y-1 pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Hierarchy Drill-Down & Unique IDs</span>
              <button
                type="button"
                onClick={(e) => handleCopyQuickLink(e, 'project', 'proj_root', projectTitle)}
                className="text-blue-600 hover:underline flex items-center gap-0.5 normal-case font-semibold text-[9px]"
              >
                <Share2 className="w-2.5 h-2.5" />
                <span>Share Project</span>
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 flex-wrap text-slate-800 font-medium">
              <button
                type="button"
                onClick={() => {
                  onSelectDoc('DOC-01');
                }}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition border border-slate-200 truncate max-w-[130px]"
                title={`Project ID: proj_${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}`}
              >
                <Building2 className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                <span className="truncate">{projectTitle}</span>
              </button>

              <span className="text-slate-300">➔</span>

              <button
                type="button"
                onClick={() => {
                  onSelectDoc('DOC-01');
                }}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition border border-slate-200 truncate max-w-[120px]"
                title={`Use Case ID: uc_${domain.toLowerCase().replace(/[^a-z0-9]/g, '_')}`}
              >
                <Target className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                <span className="truncate">{domain}</span>
              </button>
            </div>
          </div>

          {/* Level 3: Living Specifications Horizontal Pills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3 text-indigo-500" />
                <span>Synchronized Living Specs ({livingSpecs.length})</span>
              </span>
              <span className="text-[9px] text-slate-400">Click pill or share icon</span>
            </div>

            <div className="flex flex-wrap gap-1 max-h-[90px] overflow-y-auto p-0.5">
              {livingSpecs.map(doc => (
                <div
                  key={doc.id}
                  className="group relative flex items-center bg-indigo-50/60 hover:bg-indigo-100 text-indigo-800 hover:text-indigo-950 border border-indigo-200/80 rounded-md transition shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => onSelectDoc(doc.id)}
                    className="px-2 py-0.5 text-[9.5px] font-semibold flex items-center gap-1"
                    title={`Unique ID: ${doc.id} - ${doc.title}`}
                  >
                    <span className="font-mono text-[9px] font-bold text-indigo-600">{doc.id}</span>
                    <span className="truncate max-w-[70px]">{doc.shortTitle || doc.title.split(' ')[0]}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleCopyQuickLink(e, 'doc', doc.id, `${doc.id}: ${doc.title}`)}
                    className="p-1 hover:bg-indigo-200/80 text-indigo-600 rounded-r-md transition"
                    title={`Share ${doc.id} deep link`}
                  >
                    {copiedId === doc.id ? (
                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Level 4: Architecture Diagram Core Nodes */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <Network className="w-3 h-3 text-emerald-600" />
                <span>Active Cloud Nodes ({components.length})</span>
              </span>
              <button 
                type="button"
                onClick={onSwitchToDiagram}
                className="text-[9px] text-blue-600 hover:underline flex items-center gap-0.5"
              >
                <span>Full Canvas</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1 max-h-[85px] overflow-y-auto p-0.5">
              {coreNodes.map(comp => (
                <div
                  key={comp.id}
                  className="group relative flex items-center bg-emerald-50/60 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-950 border border-emerald-200/80 rounded-md transition shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSwitchToDiagram();
                      onSelectNode(comp);
                    }}
                    className="px-2 py-0.5 text-[9.5px] font-medium flex items-center gap-1 truncate max-w-[125px]"
                    title={`Unique ID: ${comp.id} • Service: ${comp.service}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="truncate">{comp.name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleCopyQuickLink(e, 'node', comp.id, comp.name)}
                    className="p-1 hover:bg-emerald-200/80 text-emerald-600 rounded-r-md transition"
                    title={`Share ${comp.name} deep link`}
                  >
                    {copiedId === comp.id ? (
                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Diff Summary Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
            <span className="truncate max-w-[180px] text-emerald-700">📐 {canvasDiff}</span>
            <span className="text-slate-300">|</span>
            <span className="truncate max-w-[110px] text-indigo-700">📑 {specDiff}</span>
          </div>

        </div>
      )}
    </div>
  );
}
