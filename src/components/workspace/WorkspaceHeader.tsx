'use client';

import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/i18n';
import React, { useState } from 'react';
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
  Users,
  RefreshCw,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { ARCHITECTURE_TYPES, getArchitectureTypeById } from '@/lib/architectureTypes';

import { getBlueprintLineage } from '@/lib/architectureLineage';

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
  onOpenCompose?: () => void;
  onArchitectureTypeChange: (typeId: string) => void;
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onForceRefresh?: () => void;
  isForceRefreshing?: boolean;
  staleness?: {
    isStale: boolean;
    reason: string;
    templateName?: string;
    lastTemplateUpdate?: string;
  };
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
  onOpenCompose,
  onArchitectureTypeChange,
  currentLanguage = 'en',
  onLanguageChange,
  onForceRefresh,
  isForceRefreshing = false,
  staleness,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const filteredLangs = SUPPORTED_LANGUAGES.filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase()) || l.nativeName.toLowerCase().includes(langSearch.toLowerCase()));
  const activeLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  const currentVersion = previewVersion || activeVersion;
  const currentTypeObj = getArchitectureTypeById(activeDiagram?.architecture_type || 'conceptual_diagram');
  const lineage = getBlueprintLineage(activeDiagram?.architecture_type);

  return (
    <header className="w-full bg-[#0B0F17]/95 border-b border-[#1E293B] backdrop-blur-md sticky top-0 z-40 px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs, Unique ID & Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
            title="Return to Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            {/* Top Lineage Bar */}
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
              {/* Unique ID Badge */}
              <span className={`px-2 py-0.5 text-[10px] font-mono font-black rounded-md border tracking-wider ${
                lineage.isIndustrySpecialized 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              }`}>
                {lineage.uniqueId}
              </span>

              {/* Layer Badge */}
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 rounded-md">
                {lineage.layerCode} {lineage.layer}
              </span>

              {/* Phase or Industry Tag */}
              <span className="text-[11px] font-semibold text-teal-400">
                {lineage.isIndustrySpecialized ? `🏭 ${lineage.industryName}` : lineage.phaseTitle}
              </span>

              {currentVersion?.version_number && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-full">
                  v{currentVersion.version_number}
                </span>
              )}
              {onForceRefresh && (
                <button
                  id="workspace-force-refresh-btn"
                  onClick={onForceRefresh}
                  disabled={isForceRefreshing}
                  className={`p-1 rounded-md border transition-all cursor-pointer ${
                    staleness?.isStale
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30 animate-pulse'
                      : 'bg-slate-800/80 text-slate-400 hover:text-teal-300 hover:bg-slate-700 border-slate-700'
                  }`}
                  title={
                    staleness?.isStale
                      ? `⚠️ Master Template Update Available: ${staleness.reason}. Click to Force Refresh via Live API!`
                      : `⚡ Force Refresh from Master Template via Live API (Bypasses all shortcuts & caches)`
                  }
                >
                  <RefreshCw className={`w-3 h-3 ${isForceRefreshing ? 'animate-spin text-teal-400' : ''}`} />
                </button>
              )}
            </div>
            <h1 className="text-base md:text-lg font-extrabold text-white tracking-tight truncate max-w-[450px]">
              {activeDiagram?.name || currentTypeObj?.name || 'Enterprise Architecture'}
            </h1>
          </div>
        </div>

        {/* Center: Architecture Type Selector with Grouped Master Blueprints vs Industry Solutions */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <select
            value={activeDiagram?.architecture_type || 'tech_multimodal_ingestion'}
            onChange={(e) => onArchitectureTypeChange(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-200 px-3 py-1.5 outline-none cursor-pointer hover:text-white max-w-[320px] truncate"
          >
            <optgroup label="🏛️ 32 Master WBS Enterprise Architecture Hierarchy" className="bg-slate-950 text-cyan-400 font-bold">
              {ARCHITECTURE_TYPES.filter(t => t.category !== 'Industry Specialized Solutions').map((type) => (
                <option key={type.id} value={type.id} className="bg-slate-900 text-slate-200 font-normal">
                  {type.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="🏭 Industry Specialized Solutions (Pharma, Supply Chain, FinTech, Retail, Mfg, HR)" className="bg-slate-950 text-purple-400 font-bold">
              {ARCHITECTURE_TYPES.filter(t => t.category === 'Industry Specialized Solutions').map((type) => (
                <option key={type.id} value={type.id} className="bg-slate-900 text-purple-200 font-normal">
                  {type.name}
                </option>
              ))}
            </optgroup>
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

          {/* Searchable Globe Language Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsLangOpen(true)}
            onMouseLeave={() => setIsLangOpen(false)}
          >
            <button
              type="button"
              title="Select Enterprise Workspace Language Pack"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-teal-400 text-slate-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <Globe className="w-4 h-4 text-teal-400" />
              <span>{activeLang.flag} {activeLang.code.toUpperCase()}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2.5 z-50 animate-fade-in">
                <input
                  type="text"
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  placeholder="🔍 Search 10+ languages..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 mb-2"
                  autoFocus
                />
                <div className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin">
                  {filteredLangs.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        onLanguageChange?.(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        lang.code === currentLanguage ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold" : "hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400">({lang.name})</span>
                      </span>
                      {lang.code === currentLanguage && <span className="text-teal-400 font-black">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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

          {/* Compose Doc */}
          {onOpenCompose && (
            <button
              onClick={onOpenCompose}
              className="px-3 py-1.5 text-xs font-semibold text-sky-200 bg-sky-600/20 hover:bg-sky-600/30 rounded-lg border border-sky-500/40 transition-colors flex items-center gap-1.5"
              title="Compose Deliverable Document (PRD, SDD, FDD, Threat Model)"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Compose Doc</span>
            </button>
          )}

          {/* Export Terraform */}
          <button
            onClick={onOpenTerraform}
            className="px-3 py-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/30 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terraform</span>
          </button>

          {/* Force Refresh Master Template Live API */}
          {onForceRefresh && (
            <button
              id="header-force-refresh-btn"
              onClick={onForceRefresh}
              disabled={isForceRefreshing}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                staleness?.isStale
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25 shadow-sm shadow-amber-500/10'
                  : 'bg-teal-500/10 text-teal-300 border-teal-500/30 hover:bg-teal-500/20'
              }`}
              title={
                staleness?.isStale
                  ? `⚠️ Diagram Stale: ${staleness.reason}. Click to Force Refresh via Live API!`
                  : `⚡ Force Refresh from Master Template via Live API (Bypasses all shortcuts & caches)`
              }
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isForceRefreshing ? 'animate-spin text-teal-400' : staleness?.isStale ? 'text-amber-400' : 'text-teal-400'}`} />
              <span className="hidden sm:inline">{isForceRefreshing ? 'Live API...' : staleness?.isStale ? 'Update Template' : 'Live Refresh'}</span>
              {staleness?.isStale && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>
          )}

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
