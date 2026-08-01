'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ChevronLeft, 
  Sun, 
  Moon, 
  Lock, 
  Globe, 
  FileText, 
  Download, 
  Upload, 
  MessageSquare,
  Users
} from 'lucide-react';
import { ARCHITECTURE_TYPES, getArchitectureTypeById } from '@/lib/architectureTypes';

interface WorkspaceHeaderProps {
  activeDiagram: any;
  activeVersion: any;
  previewVersion: any;
  bgTheme: 'dark' | 'light';
  setBgTheme: (theme: 'dark' | 'light') => void;
  isPrivate: boolean;
  onTogglePrivacy: () => void;
  onOpenExport: () => void;
  onOpenTerraform: () => void;
  onOpenImport: () => void;
  onOpenFeedback: () => void;
  onOpenPersonaModal: () => void;
  onArchitectureTypeChange: (typeId: string) => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  activeDiagram,
  activeVersion,
  previewVersion,
  bgTheme,
  setBgTheme,
  isPrivate,
  onTogglePrivacy,
  onOpenExport,
  onOpenTerraform,
  onOpenImport,
  onOpenFeedback,
  onOpenPersonaModal,
  onArchitectureTypeChange,
}) => {
  const currentVersion = previewVersion || activeVersion;
  const currentTypeObj = getArchitectureTypeById(activeDiagram?.architecture_type || 'conceptual_diagram');

  return (
    <header className="w-full bg-[#0B0F17]/95 border-b border-[#1E293B] backdrop-blur-md sticky top-0 z-40 px-6 py-3.5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs & Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
            title="Return to Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">
                {currentTypeObj?.name || 'Architecture'}
              </span>
              {currentVersion?.version_number && (
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-full">
                  v{currentVersion.version_number}
                </span>
              )}
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight truncate max-w-[400px]">
              {activeDiagram?.name || 'Untitled Architecture Diagram'}
            </h1>
          </div>
        </div>

        {/* Center: Architecture Type Selector */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <select
            value={activeDiagram?.architecture_type || 'conceptual_diagram'}
            onChange={(e) => onArchitectureTypeChange(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-300 px-3 py-1.5 outline-none cursor-pointer hover:text-white"
          >
            {ARCHITECTURE_TYPES.map((type) => (
              <option key={type.id} value={type.id} className="bg-slate-900 text-slate-200">
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Actions & Theme Toggles */}
        <div className="flex items-center gap-2">
          {/* Privacy Toggle */}
          <button
            onClick={onTogglePrivacy}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              isPrivate
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            {isPrivate ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
            <span>{isPrivate ? 'Private' : 'Public'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setBgTheme(bgTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
            title={`Switch to ${bgTheme === 'dark' ? 'Light' : 'Dark'} Theme`}
          >
            {bgTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Persona Modal Trigger */}
          <button
            onClick={onOpenPersonaModal}
            className="p-2 text-teal-400 hover:text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 rounded-lg border border-teal-500/30 transition-colors"
            title="Switch Architect Persona"
          >
            <Users className="w-4 h-4" />
          </button>

          {/* Import */}
          <button
            onClick={onOpenImport}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Import</span>
          </button>

          {/* Export Terraform */}
          <button
            onClick={onOpenTerraform}
            className="px-3 py-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/30 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terraform</span>
          </button>

          {/* Export Diagram */}
          <button
            onClick={onOpenExport}
            className="px-4 py-1.5 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-teal-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
