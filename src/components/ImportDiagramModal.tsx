'use client';

import React, { useState } from 'react';
import { Upload, X, FileCode, AlertCircle, Loader2, Sparkles, Code2 } from 'lucide-react';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';
import { compileTerraformToDrawioXml } from '@/lib/terraformToDiagram';

interface ImportDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (diagramId: string) => void;
}

export function ImportDiagramModal({ isOpen, onClose, onImportSuccess }: ImportDiagramModalProps) {
  const [activeTab, setActiveTab] = useState<'file' | 'terraform'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [terraformHcl, setTerraformHcl] = useState(`resource "container_service" "api_gateway" {
  name  = "enterprise-api-gateway"
  port  = 8080
}

resource "relational_database" "primary_db" {
  name    = "enterprise-production-db"
  engine  = "postgresql"
}

resource "web_application_firewall" "waf_policy" {
  name    = "cloud-waf-rules"
}

resource "object_storage_bucket" "ingestion_bucket" {
  name    = "enterprise-data-ingestion"
}`);
  const [diagramName, setDiagramName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);

    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, '');
    setDiagramName(nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1));

    if (selectedFile.name.endsWith('.tf')) {
      const text = await selectedFile.text();
      setTerraformHcl(text);
      setActiveTab('terraform');
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let xmlContent = '';
      let finalTitle = diagramName;

      if (activeTab === 'terraform') {
        finalTitle = diagramName || 'Terraform Infrastructure Blueprint';
        xmlContent = compileTerraformToDrawioXml(terraformHcl, finalTitle);
      } else {
        if (!file) {
          setError('Please select a file to import.');
          setLoading(false);
          return;
        }
        const fileText = await file.text();
        if (file.name.endsWith('.tf')) {
          finalTitle = diagramName || file.name.replace(/\.[^/.]+$/, '');
          xmlContent = compileTerraformToDrawioXml(fileText, finalTitle);
        } else {
          xmlContent = fileText.trim();
        }
      }

      // Strict XML AST Validation & Auto-Healing
      const healResult = validateAndHealDrawioXml(xmlContent);
      xmlContent = healResult.xml;

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: finalTitle || 'Imported Diagram',
          xml: xmlContent,
          comment: activeTab === 'terraform' ? 'Reverse-Engineered from Terraform HCL (.tf)' : `Imported file: ${file?.name}`,
          architectureType: activeTab === 'terraform' ? 'tech_serverless_gcp' : 'tech_cicd_pipeline'
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to import diagram.');
      }

      const data = await res.json();
      setLoading(false);
      onClose();
      onImportSuccess(data.diagram.id);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'An error occurred during import.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0b101d] border border-panel-border/60 rounded-3xl p-6 md:p-8 shadow-2xl text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-panel-border/40 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-accent flex items-center justify-center font-black">
              <Upload className="w-5 h-5 text-teal-accent" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Import & Reverse-Engineer Blueprint</h3>
              <p className="text-xs text-slate-400">Import .drawio XML or reverse-engineer Terraform (.tf) HCL code into a live architecture canvas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('file')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'file'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Upload File (.drawio / .tf)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terraform')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'terraform'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>📦 Paste Terraform Code (.tf)</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleImport} className="space-y-4">
          {activeTab === 'file' ? (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Diagram or Terraform File (.drawio, .xml, .tf)
              </label>
              <div className="relative border-2 border-dashed border-slate-700 hover:border-teal-500/60 rounded-2xl p-6 text-center transition-all bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer">
                <input
                  type="file"
                  accept=".xml,.drawio,.tf,.png,.json"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {file ? (
                  <div className="flex items-center justify-center gap-2 text-teal-300 font-extrabold text-sm">
                    <FileCode className="w-5 h-5 text-teal-accent" />
                    <span>{file.name}</span>
                    <span className="text-xs text-slate-400 font-normal">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-teal-accent mx-auto" />
                    <p className="text-xs font-extrabold text-white">Click or drag & drop file to upload</p>
                    <p className="text-[11px] text-slate-400">Supports .drawio, .xml, and Terraform .tf files</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Paste GCP / AWS Terraform HCL Code (.tf)
              </label>
              <textarea
                rows={8}
                value={terraformHcl}
                onChange={(e) => setTerraformHcl(e.target.value)}
                placeholder="resource &quot;google_cloud_run_service&quot; &quot;my_app&quot; { ... }"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-panel-border font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed"
              />
            </div>
          )}

          {/* Diagram Title Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Diagram Title
            </label>
            <input
              type="text"
              value={diagramName}
              onChange={(e) => setDiagramName(e.target.value)}
              placeholder={activeTab === 'terraform' ? 'e.g. Production GCP Serverless Stack' : 'e.g. Serverless Microservices Pipeline'}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-panel-border text-white text-xs font-semibold focus:outline-none focus:border-teal-400 transition-all"
            />
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-panel-border/30">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (activeTab === 'file' && !file) || (activeTab === 'terraform' && !terraformHcl.trim())}
              className="px-6 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 text-xs font-black transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{activeTab === 'terraform' ? 'Generate Architecture Diagram' : 'Import Diagram'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

