'use client';

import React from 'react';
import { Eye, RotateCcw, Clock, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';

interface DiagramVersion {
  id: string;
  diagram_id: string;
  version_number: number;
  xml_content: string;
  comment: string | null;
  created_by: string;
  created_at: string;
  prompt?: string | null;
  ai_reasoning?: string | null;
  business_usecase?: string | null;
  technical_usecase?: string | null;
}

interface VersionHistoryPanelProps {
  versions: DiagramVersion[];
  activeVersion: DiagramVersion | null;
  previewVersion: DiagramVersion | null;
  onSelectVersion: (version: DiagramVersion) => void;
  onPreviewVersion: (version: DiagramVersion | null) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const VersionHistoryPanel: React.FC<VersionHistoryPanelProps> = ({
  versions,
  activeVersion,
  previewVersion,
  onSelectVersion,
  onPreviewVersion,
  isOpen,
  onToggleOpen,
}) => {
  const sortedVersions = [...versions].sort((a, b) => b.version_number - a.version_number);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm">
      <button
        onClick={onToggleOpen}
        className="w-full px-4 py-3 bg-slate-900 hover:bg-slate-850 flex items-center justify-between border-b border-slate-800 text-left transition-colors"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Version Timeline ({versions.length})
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-2 space-y-1.5 max-h-[350px] overflow-y-auto custom-scrollbar">
          {sortedVersions.map((version) => {
            const isActive = activeVersion?.id === version.id;
            const isPreviewing = previewVersion?.id === version.id;

            return (
              <div
                key={version.id}
                onMouseEnter={() => onPreviewVersion(version)}
                onMouseLeave={() => onPreviewVersion(null)}
                onClick={() => onSelectVersion(version)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-500/10 border-teal-500/40 text-white shadow-sm'
                    : isPreviewing
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-400">
                      v{version.version_number}
                    </span>
                    {isActive && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-teal-400 text-slate-950 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {new Date(version.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs line-clamp-2 text-slate-300 font-medium">
                  {version.comment || version.prompt || `Version ${version.version_number}`}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
