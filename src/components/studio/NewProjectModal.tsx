'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Layers, 
  X, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Database, 
  Cpu, 
  FileCode2,
  Workflow,
  Upload,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  Eye
} from 'lucide-react';
import { DOMAIN_PRESETS } from '@/lib/canonical/canonicalTemplates';

export interface NewProjectConfig {
  title: string;
  domain: string;
  description: string;
  blueprintId: string;
  customXml?: string;
  sourceImage?: string;
}

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (config: NewProjectConfig) => void;
}

const STARTER_BLUEPRINTS = [
  {
    id: '00',
    name: 'Google Cloud Enterprise Reference Architecture',
    tag: 'Production Flagship',
    desc: 'Certified 6-zone enterprise topology with Spanner, Vertex AI, GKE, Cloud Armor & Zero-Trust.',
    icon: ShieldCheck,
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: '01',
    name: 'Real-Time Event Streaming & CDC Pipeline',
    tag: 'Event-Driven',
    desc: 'Pub/Sub, Datastream CDC, Dataflow stream pipeline, and Redis caching tier.',
    icon: Workflow,
    color: 'from-amber-600 to-orange-600'
  },
  {
    id: '02',
    name: 'Multi-Region Lakehouse & Analytical Warehouse',
    tag: 'Data & Analytics',
    desc: 'BigQuery serverless analytics, Cloud Storage data lake, and Cloud Spanner dual-region replication.',
    icon: Database,
    color: 'from-emerald-600 to-teal-600'
  },
  {
    id: '04',
    name: 'GenAI RAG Hub & Foundation Model Engine',
    tag: 'AI & Vertex',
    desc: 'Vertex Vector Search (ScaNN), Gemini 2.5/3.7 Pro engine, Model Armor guardrails, and Document AI.',
    icon: Cpu,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'blank',
    name: 'Blank Architecture Canvas',
    tag: 'Start from Scratch',
    desc: 'Clean slate canvas ready for your custom AI prompt synthesis and component composition.',
    icon: FileCode2,
    color: 'from-slate-700 to-slate-900'
  }
];

const SUGGESTED_USE_CASES = [
  {
    title: 'Global Real-Time Payments Mesh',
    domain: 'fintech',
    desc: 'Low-latency payments authorization with Cloud Spanner nam3, Cloud HSM CMEK, and Gemini fraud detection.'
  },
  {
    title: 'Clinical Data Lakehouse & FHIR Hub',
    domain: 'healthcare',
    desc: 'Healthcare API, Cloud DLP de-identification, and BigQuery analytics for clinical trial registries.'
  },
  {
    title: 'Omnichannel Retail Supply Chain',
    domain: 'retail',
    desc: 'Event-driven order management with Pub/Sub, Cloud Run microservices, and MemoryStore Redis cache.'
  }
];

export function NewProjectModal({ isOpen, onClose, onCreateProject }: NewProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'template' | 'vision'>('template');
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('fintech');
  const [description, setDescription] = useState('');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState('00');

  // Vision Decompiler State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [isDecompiling, setIsDecompiling] = useState<boolean>(false);
  const [decompileStatus, setDecompileStatus] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmitTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || 'Custom Architecture Canvas';
    onCreateProject({
      title: finalTitle,
      domain,
      description: description.trim(),
      blueprintId: selectedBlueprintId
    });
  };

  const handleApplySuggestion = (sug: typeof SUGGESTED_USE_CASES[0]) => {
    setTitle(sug.title);
    setDomain(sug.domain);
    setDescription(sug.desc);
  };

  const handleFileSelect = (file: File) => {
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setUploadedImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDecompileAndCreate = async () => {
    if (!uploadedImageBase64) return;
    setIsDecompiling(true);
    setDecompileStatus('DeepMind Gemini Vision is analyzing spatial tiers & components...');

    try {
      const res = await fetch('/api/decompile-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedImageBase64,
          projectName: title.trim() || uploadedFileName.replace(/\.[^/.]+$/, '') || 'Decompiled Architecture',
          useCaseName: description.trim() || 'DeepMind Vision Blueprint Extraction'
        })
      });

      const data = await res.json();
      if (data.success && data.xml) {
        setDecompileStatus('Success! Launching canvas...');
        onCreateProject({
          title: title.trim() || uploadedFileName.replace(/\.[^/.]+$/, '') || 'Decompiled Architecture',
          domain,
          description: description.trim() || 'Extracted via DeepMind Vision',
          blueprintId: 'custom',
          customXml: data.xml,
          sourceImage: uploadedImageBase64
        });
      } else {
        throw new Error(data.error || 'Decompilation failed.');
      }
    } catch (err: any) {
      console.error(err);
      setDecompileStatus(`Error: ${err.message || 'Failed to decompile image'}`);
    } finally {
      setIsDecompiling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#0B111E] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Create Architecture Canvas</h2>
              <p className="text-xs text-slate-400 font-mono">Launch a dedicated canvas with unique Session ID &amp; AI Co-Pilot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Template vs Vision Image Upload */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-800/80 bg-slate-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('template')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'template'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Starter Blueprint</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('vision')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'vision'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
              <span>2. Upload Architecture PNG</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 font-mono border border-teal-500/30">
                VISION AI
              </span>
            </button>
          </div>

          <Link
            href="/vision"
            onClick={onClose}
            className="text-[11px] text-teal-400 hover:text-teal-300 transition flex items-center gap-1 font-medium hover:underline"
          >
            <span>Side-by-Side Studio</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Tab 1: Template Selection Mode */}
        {activeTab === 'template' ? (
          <form onSubmit={handleSubmitTemplate} className="p-6 space-y-5 overflow-y-auto flex-1">
            
            {/* Quick Suggestions */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Quick Starter Templates:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_USE_CASES.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplySuggestion(sug)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-blue-300 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>{sug.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Title & Domain */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Project Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Omnichannel Real-Time Payments Mesh"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Industry Domain
                </label>
                <select
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white outline-none font-medium cursor-pointer"
                >
                  {DOMAIN_PRESETS.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.prefix} ({d.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Use Case Description */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Architecture Goals &amp; Requirements
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your availability goals (e.g. 99.999%), preferred cloud components (Spanner, GKE, BigQuery), compliance standards (SOC2, PCI-DSS), and multi-region needs..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition resize-none leading-relaxed"
              />
            </div>

            {/* Starter Blueprint Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-2">
                Choose Starter Blueprint Template
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STARTER_BLUEPRINTS.map(bp => {
                  const Icon = bp.icon;
                  const isSelected = selectedBlueprintId === bp.id;
                  return (
                    <button
                      key={bp.id}
                      type="button"
                      onClick={() => setSelectedBlueprintId(bp.id)}
                      className={`text-left p-3 rounded-xl border transition-all relative flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/10' 
                          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${bp.color} flex items-center justify-center text-white shrink-0`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-xs text-white leading-tight">
                              {bp.name}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                          {bp.desc}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {bp.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
              >
                <span>Create Architecture Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        ) : (
          /* Tab 2: Vision Image Upload Mode */
          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileSelect(f);
              }}
            />

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Upload Architectural Blueprint / PNG
              </label>
              <p className="text-[11px] text-slate-400 mb-3">
                DeepMind Gemini Vision analyzes spatial enclaves, microservices, decision gates, and arrow flows, converting your image into vector Draw.io XML.
              </p>

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleFileSelect(f);
                }}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2.5 ${
                  uploadedImageBase64
                    ? 'border-teal-500/80 bg-teal-950/20'
                    : 'border-slate-700 hover:border-teal-500 bg-slate-950/40 hover:bg-teal-950/10'
                }`}
              >
                {uploadedImageBase64 ? (
                  <div className="flex flex-col items-center gap-2">
                    <img 
                      src={uploadedImageBase64} 
                      alt="Uploaded Blueprint Preview" 
                      className="max-h-36 object-contain rounded-lg border border-teal-500/40 shadow-md"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-teal-300">{uploadedFileName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">(Click to change)</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Drop PNG or JPEG architecture diagram here</span>
                      <span className="text-[11px] text-slate-400">or click to browse files from your computer</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Optional Project Name & Domain */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Project Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={uploadedFileName ? uploadedFileName.replace(/\.[^/.]+$/, '') : "e.g. Migrated Cloud Infrastructure"}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Domain
                </label>
                <select
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 rounded-xl px-3 py-2 text-xs text-white outline-none font-medium cursor-pointer"
                >
                  {DOMAIN_PRESETS.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.prefix} ({d.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {decompileStatus && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2">
                {isDecompiling && <Loader2 className="w-4 h-4 animate-spin text-teal-400" />}
                <span className={decompileStatus.startsWith('Error') ? 'text-red-400' : 'text-teal-300 font-medium'}>
                  {decompileStatus}
                </span>
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/vision"
                onClick={onClose}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition hover:underline"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Full Side-by-Side Studio</span>
              </Link>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!uploadedImageBase64 || isDecompiling}
                  onClick={handleDecompileAndCreate}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-teal-500/25 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
                >
                  {isDecompiling ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Decompiling Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <span>Decompile &amp; Open Canvas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
