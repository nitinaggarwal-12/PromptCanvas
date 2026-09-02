'use client';

import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Sparkles,
  Check,
  Layers,
  FileText,
  Network,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  FolderPlus,
  Tag,
  Building2,
  Lock,
  Globe
} from 'lucide-react';
import { ArchitectureAst } from '@/lib/ast/architectureAst';
import { StudioVersionSnapshot, StudioChatMessage } from '@/app/studio/page';

export interface SaveToLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: (savedProject: { id: string; name: string; domain: string }) => void;
  initialProjectTitle: string;
  initialDomain: string;
  ast: ArchitectureAst;
  xml: string;
  versions: StudioVersionSnapshot[];
  messages: StudioChatMessage[];
  activeVersionTag: string;
}

export function SaveToLibraryModal({
  isOpen,
  onClose,
  onSaveSuccess,
  initialProjectTitle,
  initialDomain,
  ast,
  xml,
  versions,
  messages,
  activeVersionTag
}: SaveToLibraryModalProps) {
  const [title, setTitle] = useState(initialProjectTitle || 'My Cloud Architecture Blueprint');
  const [domain, setDomain] = useState(initialDomain || 'Life Sciences & Pharma');
  const [description, setDescription] = useState(
    'Production-grade Google Cloud Enterprise Reference Architecture featuring multi-region resiliency, zero-trust perimeter, and synchronized 10-document Living Specifications suite.'
  );
  const [tags, setTags] = useState<string>('GCP, Spanner, Vertex AI, GxP, 99.999% SLA');
  const [visibility, setVisibility] = useState<'team' | 'private'>('team');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedId, setSavedId] = useState<string>('');

  if (!isOpen) return null;

  const handleSave = async (goToLibraryAfter = false) => {
    if (!title.trim()) return;
    setIsSaving(true);

    const newProjId = 'proj_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

    const blueprintPayload = {
      id: newProjId,
      name: title,
      domain: domain,
      description: description,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      visibility: visibility,
      activeVersionTag: activeVersionTag,
      ast: {
        ...ast,
        metadata: {
          ...ast.metadata,
          projectTitle: title,
          domain: domain
        }
      },
      xml: xml,
      versions: versions,
      messages: messages,
      nodeCount: ast.components.length,
      specCount: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 1. Save to Database API
    try {
      await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: title,
          xml: xml,
          comment: `Saved from Studio Sandbox (${activeVersionTag})`,
          prompt: messages[0]?.text || title,
          businessUsecase: domain,
          technicalUsecase: description,
          architectureType: 'gcp_enterprise_reference',
          createdStudio: 'studio'
        })
      });
    } catch (e) {
      console.warn('Database save warning (falling back to LocalStorage):', e);
    }

    // 2. Save to LocalStorage Library Inventory
    try {
      // Individual session key
      localStorage.setItem(`promptcanvas_studio_${newProjId}`, JSON.stringify(blueprintPayload));

      // Global library items catalog
      const existingCatalog = JSON.parse(localStorage.getItem('promptcanvas_saved_blueprints') || '[]');
      const updatedCatalog = [
        {
          id: newProjId,
          name: title,
          domain: domain,
          description: description,
          tags: blueprintPayload.tags,
          nodeCount: ast.components.length,
          specCount: 10,
          activeVersionTag: activeVersionTag,
          updatedAt: new Date().toISOString()
        },
        ...existingCatalog.filter((item: any) => item.id !== newProjId)
      ];
      localStorage.setItem('promptcanvas_saved_blueprints', JSON.stringify(updatedCatalog));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }

    setSavedId(newProjId);
    setIsSaving(false);
    setIsSuccess(true);

    onSaveSuccess({
      id: newProjId,
      name: title,
      domain: domain
    });

    if (goToLibraryAfter) {
      window.location.href = '/library';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 text-slate-900">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">Save Sandbox to Architecture Library</h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Promote live sandbox into a permanent, versioned enterprise blueprint
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-in zoom-in">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Successfully Saved to Your Library!</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Your sandbox blueprint has been permanently minted with Unique ID <span className="font-mono font-bold text-emerald-700">{savedId}</span>.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-w-md mx-auto text-left text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Blueprint Title:</span>
                <span className="font-bold text-slate-900">{title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Industry Track:</span>
                <span className="font-medium text-blue-700">{domain}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Version & Specs:</span>
                <span className="font-mono text-emerald-700">{activeVersionTag} • 10 Living Specs</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition shadow-2xs"
              >
                Keep Working in Studio
              </button>
              <a
                href="/library"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
              >
                <span>View in Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          
          /* Save Form */
          <div className="p-6 space-y-4 text-xs">
            
            {/* Title Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>Blueprint / Project Name: *</span>
                <span className="text-[10px] text-slate-400 font-normal">Displayed across Studio & Library</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. PharmaTrial GenOS - Merck Global R&D"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:bg-white shadow-2xs"
              />
            </div>

            {/* Domain & Category Track */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Domain / Industry Track:</label>
              <select
                value={domain}
                onChange={e => setDomain(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:bg-white shadow-2xs"
              >
                <option value="Life Sciences & Pharma">🧬 Life Sciences & Pharma (GxP / 21 CFR Part 11 / EU AI Act)</option>
                <option value="Financial Services & Banking">💳 Financial Services & Banking (PCI-DSS 4.0 / SOC2 / Spanner)</option>
                <option value="Healthcare & Clinical AI">🩺 Healthcare & Clinical AI (HIPAA / FHIR / Vertex ScaNN)</option>
                <option value="Retail & Omnichannel Event Lakehouse">🛒 Retail & E-Commerce (Datastream CDC / BigQuery Lakehouse)</option>
                <option value="Telecommunications & 5G Edge">📡 Telecommunications & 5G Edge (Cloud Armor / VPC-SC)</option>
                <option value="Energy & Smart Utilities">⚡ Energy & Utilities (GPU Anomaly Detection / Cloud Monitoring)</option>
                <option value="Custom Enterprise Architecture">🏢 Custom Enterprise Reference Architecture</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Strategic Scope & Architecture Notes:</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white resize-none shadow-2xs leading-relaxed"
              />
            </div>

            {/* Tags & Visibility Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-slate-500" />
                  <span>Tags (Comma-Separated):</span>
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="GCP, Spanner, Vertex AI"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-500" />
                  <span>Workspace Access:</span>
                </label>
                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setVisibility('team')}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition ${
                      visibility === 'team'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Team Shared
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibility('private')}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition ${
                      visibility === 'private'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Private Draft
                  </button>
                </div>
              </div>
            </div>

            {/* Asset Metrics Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-around text-center text-xs">
              <div>
                <div className="font-bold text-slate-900 text-sm">{ast.components.length}</div>
                <div className="text-[10px] text-slate-500 font-mono">Cloud Nodes</div>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <div className="font-bold text-indigo-600 text-sm">10 Docs</div>
                <div className="text-[10px] text-slate-500 font-mono">Living Specs</div>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <div className="font-bold text-emerald-600 text-sm">{activeVersionTag}</div>
                <div className="text-[10px] text-slate-500 font-mono">Timeline Tag</div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-bold transition text-xs"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSave(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save to Library'}</span>
                </button>
                
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSave(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition text-xs shadow-sm flex items-center gap-1.5"
                >
                  <span>Save & Go to Library</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
