'use client';

import React, { useState } from 'react';
import { Upload, X, FileCode, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface ImportDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (diagramId: string) => void;
}

export function ImportDiagramModal({ isOpen, onClose, onImportSuccess }: ImportDiagramModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [diagramName, setDiagramName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);

    // Auto-populate diagram name from file name
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, '');
    setDiagramName(nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1));
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a .xml or .drawio file to import.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fileText = await file.text();
      let xmlContent = fileText.trim();

      // Basic validation for Draw.io XML
      if (!xmlContent.includes('<mxfile') && !xmlContent.includes('<mxGraphModel')) {
        // Wrap if missing header tags
        xmlContent = `<mxfile host="PromptCanvas" modified="${new Date().toISOString()}" agent="Import">
  <diagram id="imported_diagram" name="${diagramName || 'Imported Diagram'}">
    <mxGraphModel dx="1000" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${xmlContent}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
      }

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: diagramName || file.name.replace(/\.[^/.]+$/, ''),
          description: `Imported from ${file.name}`,
          xml_content: xmlContent,
          comment: `Imported file: ${file.name}`,
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
      <div className="relative w-full max-w-lg bg-[#0b101d] border border-panel-border/60 rounded-3xl p-6 md:p-8 shadow-2xl text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-panel-border/40 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-accent flex items-center justify-center font-black">
              <Upload className="w-5 h-5 text-teal-accent" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Import Architecture Diagram</h3>
              <p className="text-xs text-slate-400">Upload existing .drawio or .xml files into PromptCanvas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleImport} className="space-y-5">
          
          {/* File Drag and Drop / Input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Diagram File (.drawio, .xml)
            </label>
            <div className="relative border-2 border-dashed border-slate-700 hover:border-teal-500/60 rounded-2xl p-6 text-center transition-all bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer">
              <input
                type="file"
                accept=".xml,.drawio,.png,.json"
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
                  <p className="text-[11px] text-slate-400">Supports .drawio, .xml, and .png (Draw.io formatted)</p>
                </div>
              )}
            </div>
          </div>

          {/* Diagram Title Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Diagram Title
            </label>
            <input
              type="text"
              value={diagramName}
              onChange={(e) => setDiagramName(e.target.value)}
              placeholder="e.g. Serverless Microservices Pipeline"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-panel-border text-white text-xs font-semibold focus:outline-none focus:border-teal-400 transition-all"
              required
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
              disabled={loading || !file}
              className="px-6 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 text-xs font-black transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Import Diagram</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
