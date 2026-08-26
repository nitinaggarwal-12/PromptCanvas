'use client';

import React, { useState, useEffect } from 'react';
import {
  History,
  FolderTree,
  ExternalLink,
  Trash2,
  Share2,
  Check,
  Calendar,
  Clock,
  Tag,
  Layers,
  FileText,
  Sparkles,
  ArrowRight,
  X,
  Search,
  BookOpen
} from 'lucide-react';
import { DOC_ARCHETYPES_META } from '@/lib/compose/archetypes';
import { DOMAIN_PRESETS } from '@/lib/canonical/canonicalTemplates';

export interface HistoricalProjectItem {
  id: string;
  title: string;
  archetypeId: string;
  domainId: string;
  docVersion: string;
  snapshotCount: number;
  lastUpdated: string;
  scopeSummary: string;
}

interface DocGenHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (proj: HistoricalProjectItem) => void;
  isLight: boolean;
}

export function loadAllHistoricalProjects(): HistoricalProjectItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const items: HistoricalProjectItem[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('promptcanvas_docgen_versions_')) {
        const projId = key.replace('promptcanvas_docgen_versions_', '');
        const raw = window.localStorage.getItem(key);
        if (raw) {
          try {
            const snapshots = JSON.parse(raw);
            if (Array.isArray(snapshots) && snapshots.length > 0) {
              const latest = snapshots[0];
              const docMarkdown = latest.docMarkdown || '';
              // Extract title
              const titleMatch = docMarkdown.match(/##\s+([^\n—]+)/) || docMarkdown.match(/#\s+([^\n]+)/);
              const title = titleMatch ? titleMatch[1].trim() : `Project ${projId.slice(-6)}`;
              
              // Extract summary snippet
              const summaryMatch = docMarkdown.match(/### 1\.1 Business Problem Statement\n([\s\S]*?)(?=###|$)/i);
              const scopeSummary = summaryMatch ? summaryMatch[1].trim().slice(0, 140) + '...' : 'Production specification baseline with multi-blueprint diagram pack.';

              items.push({
                id: projId,
                title,
                archetypeId: 'sdd',
                domainId: 'manufacturing',
                docVersion: latest.docVersion || latest.versionTag || 'v1.0',
                snapshotCount: snapshots.length,
                lastUpdated: latest.timestamp || new Date().toISOString(),
                scopeSummary,
              });
            }
          } catch {}
        }
      }
    }

    // If no local history found, populate demo active historical projects
    if (items.length === 0) {
      items.push(
        {
          id: 'proj_aeronode_981',
          title: 'AeroNode Autonomous Drone Delivery Fleet Mesh',
          archetypeId: 'sdd',
          domainId: 'manufacturing',
          docVersion: 'v1.2',
          snapshotCount: 4,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          scopeSummary: 'Autonomous telemetry, FAA Part 135 UTM airspace routing, and Spanner state mesh.',
        },
        {
          id: 'proj_voltgrid_774',
          title: 'VoltGrid Smart EV & Battery Storage (BESS / V2G)',
          archetypeId: 'tdd',
          domainId: 'energy',
          docVersion: 'v1.0',
          snapshotCount: 2,
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          scopeSummary: 'NERC-CIP high impact BESS substation synchronization and automated frequency regulation.',
        },
        {
          id: 'proj_apexpay_332',
          title: 'ApexPay Ultra-Low Latency FX Settlement Mesh',
          archetypeId: 'fdd',
          domainId: 'fintech',
          docVersion: 'v2.0',
          snapshotCount: 6,
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          scopeSummary: 'Sub-50ms ISO 20022 clearing saga, SEC 15c3-5 risk firewall, and Plaid wire routing.',
        }
      );
    }

    // Sort by lastUpdated descending
    items.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    return items;
  } catch (err) {
    console.warn('Failed to load historical projects:', err);
    return [];
  }
}

export default function DocGenHistoryModal({
  isOpen,
  onClose,
  onSelectProject,
  isLight,
}: DocGenHistoryModalProps) {
  const [projects, setProjects] = useState<HistoricalProjectItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Scan localStorage for all saved promptcanvas_docgen_versions_* keys
  useEffect(() => {
    if (!isOpen) return;
    const items = loadAllHistoricalProjects();
    setProjects(items);
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.docVersion.toLowerCase().includes(q)
    );
  });

  const handleCopyProjectLink = (proj: HistoricalProjectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/docgen?doc=${proj.archetypeId}&proj=${proj.id}&tab=studio`;
      navigator.clipboard.writeText(url);
      setCopiedId(proj.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDeleteProject = (projId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(`promptcanvas_docgen_versions_${projId}`);
        window.localStorage.removeItem(`promptcanvas_docgen_chat_${projId}`);
        setProjects((prev) => prev.filter((p) => p.id !== projId));
      } catch (err) {
        console.warn('Failed to delete project:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#070A13] border-slate-800 text-white'
      }`}>
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black truncate max-w-md">
                  Historical Projects &amp; Document Specifications
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                  {projects.length} Saved Projects
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Browse, restore, or export all historical project workspaces and 10-snapshot ring buffers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 hover:text-rose-500 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search historical projects by title, ID, or version..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs outline-none transition-all ${
                isLight ? 'bg-white border-slate-300 focus:border-sky-500' : 'bg-slate-950 border-slate-700 focus:border-sky-500 text-white'
              }`}
            />
          </div>

          <a
            href="/history"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/15 hover:text-sky-500 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
            title="Open Master Diagram Canvas History Hub"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Master History Hub</span>
          </a>
        </div>

        {/* PROJECTS LIST */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <FolderTree className="w-8 h-8 mx-auto opacity-30" />
              <p className="text-sm font-bold">No matching historical projects found</p>
              <p className="text-xs">Create and customize a document in the Studio to auto-save it to your local ring buffer.</p>
            </div>
          ) : (
            filteredProjects.map((proj) => {
              const meta = DOC_ARCHETYPES_META.find((m) => m.id === proj.archetypeId);
              const domain = DOMAIN_PRESETS.find((d) => d.id === proj.domainId);

              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:scale-[1.008] ${
                    isLight
                      ? 'bg-white border-slate-200/90 hover:border-sky-500 hover:shadow-md'
                      : 'bg-slate-900/80 border-slate-800 hover:border-sky-500 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-black truncate text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                        {proj.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20">
                        {proj.docVersion}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">
                        ID: {proj.id.slice(-8)}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                        {proj.snapshotCount}/10 Snapshots
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {proj.scopeSummary}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-400" />
                        {new Date(proj.lastUpdated).toLocaleDateString()} at {new Date(proj.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>&bull;</span>
                      <span>{domain?.name || 'Enterprise'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleCopyProjectLink(proj, e)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Copy Project Link"
                    >
                      {copiedId === proj.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={(e) => handleDeleteProject(proj.id, e)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 hover:text-rose-500 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Delete from local history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-600 group-hover:bg-sky-500 text-white shadow-sm transition-all"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md text-xs text-slate-400">
          <span>Persisted across session snapshots in browser local storage</span>
          <span className="font-mono text-[11px]">10-Snapshot Ring Buffer &bull; Project State Lock</span>
        </div>
      </div>
    </div>
  );
}
