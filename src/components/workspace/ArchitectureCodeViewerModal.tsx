'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, Code2, Terminal, Sparkles, FileCode2 } from 'lucide-react';
import { exportPythonDiagramsScript, exportD2LangScript } from '@/lib/export/architectureAsCodeExporter';

interface ArchitectureCodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  xmlContent: string;
  diagramName: string;
  initialFormat?: 'python' | 'd2';
}

export const ArchitectureCodeViewerModal: React.FC<ArchitectureCodeViewerModalProps> = ({
  isOpen,
  onClose,
  xmlContent,
  diagramName,
  initialFormat = 'python',
}) => {
  const [activeFormat, setActiveFormat] = useState<'python' | 'd2'>(initialFormat);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen && initialFormat) {
      setActiveFormat(initialFormat);
    }
  }, [isOpen, initialFormat]);

  if (!isOpen) return null;

  const pythonCode = exportPythonDiagramsScript(xmlContent, diagramName || 'Cloud Architecture');
  const d2Code = exportD2LangScript(xmlContent, diagramName || 'Cloud Architecture');

  const currentCode = activeFormat === 'python' ? pythonCode : d2Code;
  const currentExtension = activeFormat === 'python' ? 'py' : 'd2';
  const cleanName = (diagramName || 'Cloud_Architecture').replace(/\s+/g, '_');
  const fileName = `${cleanName}_${activeFormat}.${currentExtension}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const mimeType = activeFormat === 'python' ? 'text/x-python' : 'text/plain';
    const blob = new Blob([currentCode], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenPlayground = () => {
    if (activeFormat === 'd2') {
      window.open('https://play.d2lang.com', '_blank');
    } else {
      window.open('https://diagrams.mingrammer.com/docs/getting_started/installation', '_blank');
    }
  };

  const lineCount = currentCode.split('\n').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Architecture-as-Code Studio
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  {diagramName || 'Active Canvas'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Inspect, copy, or export executable infrastructure scripts compiled live from your canvas.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs & Top Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFormat('python')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFormat === 'python'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              <span>🐍</span>
              <span>Python diagrams (.py)</span>
            </button>

            <button
              onClick={() => setActiveFormat('d2')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFormat === 'd2'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              <span>🔤</span>
              <span>D2 Lang Architecture (.d2)</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Code!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            {activeFormat === 'd2' && (
              <button
                onClick={handleOpenPlayground}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-all cursor-pointer"
                title="Open interactive D2 Playground in browser"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in D2 Playground</span>
              </button>
            )}

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {fileName}</span>
            </button>
          </div>
        </div>

        {/* Code Viewer Container */}
        <div className="flex-1 overflow-y-auto bg-[#0B0F19] p-6 font-mono text-xs leading-relaxed text-slate-200 relative">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/60 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold text-slate-300">{fileName}</span>
              <span>({lineCount} lines)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span>Encoding: UTF-8</span>
              <span>•</span>
              <span className="text-emerald-400">Live Auto-Compiled</span>
            </div>
          </div>

          <pre className="overflow-x-auto p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-100 font-mono text-[12.5px] leading-relaxed select-all">
            <code>{currentCode}</code>
          </pre>

          {/* Quick Execution Cheatsheet Footer */}
          <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <Terminal className="w-4 h-4 text-teal-400" />
              <span>
                {activeFormat === 'python'
                  ? 'Quick Execution Commands (Run in Terminal):'
                  : 'Quick D2 Compilation Command:'}
              </span>
            </div>
            {activeFormat === 'python' ? (
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <code className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-teal-300">
                  pip install diagrams
                </code>
                <span className="text-slate-500">&&</span>
                <code className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-emerald-300">
                  python {fileName}
                </code>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <code className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-cyan-300">
                  d2 {fileName} output.svg
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
