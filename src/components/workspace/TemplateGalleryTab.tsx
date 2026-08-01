'use client';

import React from 'react';
import { LayoutGrid, Sparkles, ArrowRight } from 'lucide-react';
import { ARCHITECTURE_TYPES } from '@/lib/architectureTypes';

interface TemplateGalleryTabProps {
  onSelectTemplate: (prompt: string, title: string, archType: string) => void;
}

export const TemplateGalleryTab: React.FC<TemplateGalleryTabProps> = ({ onSelectTemplate }) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#0B0F17] custom-scrollbar">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <LayoutGrid className="w-4 h-4" />
            <span>Architecture Templates Gallery</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Bootstrap Systems With Production-Grade Blueprints
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Select a enterprise architecture preset below to launch an instantly editable, fully formatted Draw.io workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHITECTURE_TYPES.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template.prompt, template.name, template.id)}
              className="group p-6 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-full">
                    {template.category || 'Architecture'}
                  </span>
                  <Sparkles className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors mb-2">
                  {template.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {template.prompt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-teal-400 group-hover:text-teal-300">
                <span>Launch Workspace Preset</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
