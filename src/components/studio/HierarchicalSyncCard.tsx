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
  ShieldCheck
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
  onSwitchToDiagram
}: HierarchicalSyncCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const showHierarchy = isOpen || isHovered;

  // Highlight top 6 critical core nodes for horizontal pill tray
  const coreNodes = components.slice(0, 6);

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
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Hierarchy Drill-Down</span>
            </div>
            
            <div className="flex items-center gap-1.5 flex-wrap text-slate-800 font-medium">
              <button
                type="button"
                onClick={() => {
                  onSelectDoc('DOC-01');
                }}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition border border-slate-200 truncate max-w-[130px]"
                title={projectTitle}
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
                title={domain}
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
              <span className="text-[9px] text-slate-400">Click to view doc</span>
            </div>

            <div className="flex flex-wrap gap-1 max-h-[90px] overflow-y-auto p-0.5">
              {livingSpecs.map(doc => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => onSelectDoc(doc.id)}
                  className="px-2 py-0.5 rounded-md bg-indigo-50/60 hover:bg-indigo-100 text-indigo-800 hover:text-indigo-950 border border-indigo-200/80 transition text-[9.5px] font-semibold flex items-center gap-1 shadow-2xs"
                  title={`${doc.id}: ${doc.title}`}
                >
                  <span className="font-mono text-[9px] font-bold text-indigo-600">{doc.id}</span>
                  <span className="truncate max-w-[75px]">{doc.shortTitle || doc.title.split(' ')[0]}</span>
                </button>
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
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => {
                    onSwitchToDiagram();
                    onSelectNode(comp);
                  }}
                  className="px-2 py-0.5 rounded-md bg-emerald-50/60 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-950 border border-emerald-200/80 transition text-[9.5px] font-medium flex items-center gap-1 shadow-2xs truncate max-w-[135px]"
                  title={`Inspect ${comp.name} (${comp.service})`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="truncate">{comp.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Diff Summary Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
            <span className="truncate max-w-[200px] text-emerald-700">📐 {canvasDiff}</span>
            <span className="text-slate-300">|</span>
            <span className="truncate max-w-[100px] text-indigo-700">📑 {specDiff}</span>
          </div>

        </div>
      )}
    </div>
  );
}
