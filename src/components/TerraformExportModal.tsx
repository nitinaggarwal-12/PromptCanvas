'use client';

import React, { useState, useEffect } from 'react';
import { Box, Copy, Download, Check, X, Loader2, Sparkles, Terminal, Code2, FileCode } from 'lucide-react';

interface TerraformExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagramName?: string;
  diagramId?: string;
  xmlContent?: string;
}

interface TerraformFiles {
  mainTf?: string;
  variablesTf?: string;
  outputsTf?: string;
  providerTf?: string;
  readme?: string;
}

export function TerraformExportModal({
  isOpen,
  onClose,
  diagramName,
  diagramId,
  xmlContent,
}: TerraformExportModalProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'variables' | 'outputs' | 'provider' | 'readme'>('main');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<TerraformFiles | null>(null);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const fetchTerraformCode = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/export/terraform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagramId, xmlContent }),
      });
      if (!res.ok) throw new Error('Failed to generate Terraform code');
      const data = await res.json();
      if (data.terraform) {
        setFiles(data.terraform);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate GCP Terraform HCL code.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !files) {
      fetchTerraformCode();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCode = (() => {
    if (!files) return '';
    switch (activeTab) {
      case 'main':
        return files.mainTf || '';
      case 'variables':
        return files.variablesTf || '';
      case 'outputs':
        return files.outputsTf || '';
      case 'provider':
        return files.providerTf || '';
      case 'readme':
        return files.readme || '';
      default:
        return files.mainTf || '';
    }
  })();

  const currentFilename = (() => {
    switch (activeTab) {
      case 'main': return 'main.tf';
      case 'variables': return 'variables.tf';
      case 'outputs': return 'outputs.tf';
      case 'provider': return 'provider.tf';
      case 'readme': return 'README.md';
    }
  })();

  const handleCopyCode = async () => {
    if (!currentCode) return;
    await navigator.clipboard.writeText(currentCode);
    setCopiedTab(activeTab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownloadFile = () => {
    if (!currentCode) return;
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-5xl bg-[#0b101d] border border-teal-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-teal-500/15 text-white flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-panel-border/40 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-400 to-indigo-500 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center text-bg-dark font-black">
              <Box className="w-5 h-5 text-bg-dark" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[10px] font-extrabold mb-0.5">
                <Sparkles className="w-3 h-3 text-teal-accent" />
                <span>Google Cloud Platform (GCP) HCL Compiler</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Terraform Code Export</span>
                {diagramName && <span className="text-slate-400 font-normal text-base">— &quot;{diagramName}&quot;</span>}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchTerraformCode}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-teal-300 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-teal-accent" />}
              <span>Re-compile HCL</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-panel-border/30 pt-4 pb-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2">
            {[
              { id: 'main', label: 'main.tf', icon: FileCode },
              { id: 'variables', label: 'variables.tf', icon: Code2 },
              { id: 'outputs', label: 'outputs.tf', icon: Code2 },
              { id: 'provider', label: 'provider.tf', icon: FileCode },
              { id: 'readme', label: 'README.md', icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-teal-500/15 border-teal-500/40 text-teal-300 shadow-md shadow-teal-500/10'
                      : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedTab === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-teal-accent" />
                  <span>Copy {currentFilename}</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadFile}
              className="px-4 py-2 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-teal-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {currentFilename}</span>
            </button>
          </div>
        </div>

        {/* Code Content Container */}
        <div className="flex-1 overflow-y-auto mt-4 rounded-2xl bg-[#060912] border border-panel-border/60 p-4 font-mono text-xs text-slate-200 select-text leading-relaxed scrollbar-thin">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-teal-accent" />
              <p className="text-xs font-bold text-slate-300">Synthesizing GCP Terraform HCL code via Gemini 2.5 Flash...</p>
              <p className="text-[11px] text-slate-500">Mapping visual architecture nodes into executable GCP infrastructure modules</p>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap break-all leading-relaxed">
              <code>{currentCode || '# Generating Terraform code...'}</code>
            </pre>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 border-t border-panel-border/30 pt-3 flex items-center justify-between text-[11px] text-slate-400 shrink-0 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Target Provider: <strong className="text-teal-300">hashicorp/google (~&gt; 5.0)</strong></span>
          </div>
          <span>Ready to execute with <code className="bg-slate-900 px-2 py-0.5 rounded text-teal-300 font-bold">terraform apply</code></span>
        </div>

      </div>
    </div>
  );
}
