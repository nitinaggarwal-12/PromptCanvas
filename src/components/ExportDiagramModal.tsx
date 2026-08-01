'use client';

import React, { useState } from 'react';
import { Download, X, FileCode, Image, FileText, Presentation, Check, Loader2, Sparkles } from 'lucide-react';
import PptxGenJS from 'pptxgenjs';
import { exportDiagramPng } from '../lib/export/diagramRaster';

interface ExportDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagramName?: string;
  xmlContent?: string;
  businessUsecase?: string | null;
  technicalUsecase?: string | null;
  auditScore?: number;
}

export function ExportDiagramModal({
  isOpen,
  onClose,
  diagramName = 'Architecture Diagram',
  xmlContent = '',
  businessUsecase,
  technicalUsecase,
  auditScore = 85,
}: ExportDiagramModalProps) {
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const sanitizeFilename = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '_');

  // 1. Export Raw Draw.io XML (.drawio)
  const handleExportXml = () => {
    setLoadingType('xml');
    setErrorMessage(null);
    try {
      const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${sanitizeFilename(diagramName)}.drawio`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadSuccess('xml');
      setTimeout(() => setDownloadSuccess(null), 2500);
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Failed to export XML.');
    } finally {
      setLoadingType(null);
    }
  };

  // 2. Export High-Res Real Diagram PNG Image (.png)
  const handleExportPng = async () => {
    setLoadingType('png');
    setErrorMessage(null);
    try {
      const pngDataUrl = await exportDiagramPng(xmlContent, { scale: 2, transparent: false });
      const link = document.createElement('a');
      link.href = pngDataUrl;
      link.download = `${sanitizeFilename(diagramName)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess('png');
      setTimeout(() => setDownloadSuccess(null), 2500);
    } catch (e: any) {
      console.error('PNG export failed:', e);
      const msg = e instanceof Error ? e.message : 'Export service unreachable';
      setErrorMessage(`PNG Export Failed: ${msg}`);
    } finally {
      setLoadingType(null);
    }
  };

  // 3. Export PDF Document (.pdf) with real rasterized diagram image
  const handleExportPdf = async () => {
    setLoadingType('pdf');
    setErrorMessage(null);
    try {
      const pngDataUrl = await exportDiagramPng(xmlContent, { scale: 2, transparent: false });

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${diagramName} - Architecture Report</title>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #0f172a; }
                h1 { color: #0d9488; font-size: 28px; margin-bottom: 5px; }
                .meta { color: #64748b; font-size: 13px; margin-bottom: 25px; }
                .diagram-img { width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 25px; display: block; }
                .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; background: #f8fafc; }
                .card h3 { color: #334155; margin-top: 0; font-size: 16px; }
              </style>
            </head>
            <body>
              <h1>${diagramName}</h1>
              <div class="meta">Exported from PromptCanvas Enterprise Platform on ${new Date().toLocaleDateString()}</div>
              
              <img src="${pngDataUrl}" alt="${diagramName}" class="diagram-img" />

              <div class="card">
                <h3>Executive Summary & Business Use-Case</h3>
                <p>${businessUsecase || 'No business description provided.'}</p>
              </div>

              <div class="card">
                <h3>Technical Architecture Overview</h3>
                <p>${technicalUsecase || 'No technical architecture details provided.'}</p>
              </div>

              <div class="card">
                <h3>Security Audit Grade</h3>
                <p>Compliance Score: <strong>${auditScore}%</strong></p>
              </div>

              <script>
                window.onload = function() { window.print(); };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
      setDownloadSuccess('pdf');
      setTimeout(() => setDownloadSuccess(null), 2500);
    } catch (e: any) {
      console.error('PDF export failed:', e);
      const msg = e instanceof Error ? e.message : 'Export service unreachable';
      setErrorMessage(`PDF Export Failed: ${msg}`);
    } finally {
      setLoadingType(null);
    }
  };

  // 4. Export PowerPoint Presentation (.pptx) with real high-res diagram slide
  const handleExportPptx = async () => {
    setLoadingType('pptx');
    setErrorMessage(null);
    try {
      // Rasterize diagram for slide inclusion (structured for multi-diagram support)
      const diagramItems = [
        {
          title: diagramName,
          xml: xmlContent,
        },
      ];

      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';

      // Slide 1: Cover Slide
      const slide1 = pptx.addSlide();
      slide1.background = { color: '070A13' };

      slide1.addText('PROMPTCANVAS ENTERPRISE ARCHITECTURE DECK', {
        x: 0.8,
        y: 1.5,
        w: 10,
        h: 0.5,
        fontSize: 14,
        color: '14B8A6',
        bold: true,
        fontFace: 'Arial',
      });

      slide1.addText(diagramName, {
        x: 0.8,
        y: 2.2,
        w: 11,
        h: 1.2,
        fontSize: 36,
        color: 'FFFFFF',
        bold: true,
        fontFace: 'Arial',
      });

      slide1.addText(`Author: Maestro Cloud Architect  |  Date: ${new Date().toLocaleDateString()}  |  Compliance Score: ${auditScore}%`, {
        x: 0.8,
        y: 4.0,
        w: 10,
        h: 0.5,
        fontSize: 14,
        color: '94A3B8',
        fontFace: 'Arial',
      });

      // Slide 2: Real Diagram Architecture Image Slide
      for (const item of diagramItems) {
        const pngDataUrl = await exportDiagramPng(item.xml, { scale: 2, transparent: false });
        const slide2 = pptx.addSlide();
        slide2.background = { color: '0B101D' };

        slide2.addText(`Architecture Canvas Diagram: ${item.title}`, {
          x: 0.3,
          y: 0.15,
          w: 12.0,
          h: 0.35,
          fontSize: 16,
          color: '14B8A6',
          bold: true,
        });

        slide2.addImage({
          data: pngDataUrl,
          x: 0.3,
          y: 0.55,
          w: 12.7,
          h: 6.6,
          sizing: { type: 'contain', w: 12.7, h: 6.6 },
        });
      }

      // Slide 3: Executive Summary & Technical Use-Case
      const slide3 = pptx.addSlide();
      slide3.background = { color: '070A13' };

      slide3.addText('Executive Summary & Business Value', {
        x: 0.8,
        y: 0.6,
        w: 11,
        h: 0.6,
        fontSize: 22,
        color: '14B8A6',
        bold: true,
      });

      slide3.addText(businessUsecase || 'Provides a resilient, highly available serverless and containerized architecture designed to support high concurrency, automated scaling, and strict enterprise security controls.', {
        x: 0.8,
        y: 1.5,
        w: 11.5,
        h: 2.0,
        fontSize: 15,
        color: 'E2E8F0',
        fontFace: 'Arial',
      });

      slide3.addText('Technical Implementation Strategy', {
        x: 0.8,
        y: 3.8,
        w: 11,
        h: 0.5,
        fontSize: 18,
        color: 'A855F7',
        bold: true,
      });

      slide3.addText(technicalUsecase || 'Utilizes Google Cloud Platform managed services including Cloud Run, Cloud SQL, Cloud Armor WAF, and VPC Service Controls. Automated deployments governed via Terraform HCL modules.', {
        x: 0.8,
        y: 4.5,
        w: 11.5,
        h: 2.0,
        fontSize: 14,
        color: '94A3B8',
        fontFace: 'Arial',
      });

      // Save PPTX presentation
      await pptx.writeFile({ fileName: `${sanitizeFilename(diagramName)}_presentation.pptx` });

      setDownloadSuccess('pptx');
      setTimeout(() => setDownloadSuccess(null), 2500);
    } catch (e: any) {
      console.error('PPTX export failed:', e);
      const msg = e instanceof Error ? e.message : 'Export service unreachable';
      setErrorMessage(`PPTX Export Failed: ${msg}`);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-2xl bg-[#0b101d] border border-panel-border/60 rounded-3xl p-6 md:p-8 shadow-2xl text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-panel-border/40 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-accent flex items-center justify-center font-black">
              <Download className="w-5 h-5 text-teal-accent" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Export Diagram & Presentation Deck</h3>
              <p className="text-xs text-slate-400">Download in vector XML, PNG, PDF, or editable PowerPoint PPTX format</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3.5 bg-red-950/70 border border-red-800/80 rounded-2xl text-red-200 text-xs font-medium flex items-center justify-between">
            <span>❌ {errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="text-red-300 hover:text-white font-bold ml-2">✕</button>
          </div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Option 1: Draw.io XML */}
          <div
            onClick={handleExportXml}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-accent flex items-center justify-center">
                <FileCode className="w-5 h-5" />
              </div>
              {downloadSuccess === 'xml' ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Downloaded
                </span>
              ) : loadingType === 'xml' ? (
                <Loader2 className="w-4 h-4 animate-spin text-teal-accent" />
              ) : (
                <Download className="w-4 h-4 text-slate-500 group-hover:text-teal-accent transition-colors" />
              )}
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors">Draw.io Vector XML (.drawio)</h4>
              <p className="text-xs text-slate-400 mt-1">Raw XML diagram vector format for editing in Draw.io or PromptCanvas.</p>
            </div>
          </div>

          {/* Option 2: High-Res PNG */}
          <div
            onClick={handleExportPng}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <Image className="w-5 h-5" />
              </div>
              {downloadSuccess === 'png' ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Downloaded
                </span>
              ) : loadingType === 'png' ? (
                <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
              ) : (
                <Download className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
              )}
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white group-hover:text-sky-300 transition-colors">PNG Image Document (.png)</h4>
              <p className="text-xs text-slate-400 mt-1">High-resolution vector raster image of the actual diagram canvas.</p>
            </div>
          </div>

          {/* Option 3: PDF Document */}
          <div
            onClick={handleExportPdf}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              {downloadSuccess === 'pdf' ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Exported
                </span>
              ) : loadingType === 'pdf' ? (
                <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
              ) : (
                <Download className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" />
              )}
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white group-hover:text-rose-300 transition-colors">PDF Architecture Document (.pdf)</h4>
              <p className="text-xs text-slate-400 mt-1">Print-ready document containing diagram view, executive summary, and security grade.</p>
            </div>
          </div>

          {/* Option 4: Editable PowerPoint Presentation (.pptx) */}
          <div
            onClick={handleExportPptx}
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/30 hover:border-amber-400 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-lg shadow-amber-500/5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center">
                <Presentation className="w-5 h-5" />
              </div>
              {downloadSuccess === 'pptx' ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Downloaded Deck
                </span>
              ) : loadingType === 'pptx' ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-500/30">PPTX Presentation Deck</span>
              </div>
              <h4 className="font-extrabold text-sm text-white group-hover:text-amber-200 transition-colors">PowerPoint Slide Deck (.pptx)</h4>
              <p className="text-xs text-slate-400 mt-1">Presentation deck featuring full-width diagram slide, business value, and technical breakdown.</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-panel-border/30 pt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Target Architecture: <strong className="text-white">{diagramName}</strong></span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
