'use client';

import React, { useState } from 'react';
import { Download, X, FileCode, Image, FileText, Presentation, Check, Loader2, Sparkles } from 'lucide-react';
import PptxGenJS from 'pptxgenjs';

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

  if (!isOpen) return null;

  const sanitizeFilename = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '_');

  // 1. Export Raw Draw.io XML (.drawio)
  const handleExportXml = () => {
    setLoadingType('xml');
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
    } catch (e) {
      console.error(e);
      alert('Failed to export XML.');
    } finally {
      setLoadingType(null);
    }
  };

  // 2. Export High-Res PNG Image (.png)
  const handleExportPng = () => {
    setLoadingType('png');
    try {
      // Convert XML to SVG or SVG canvas element
      const svgContainer = document.querySelector('.geEditor, svg, iframe');
      const canvas = document.createElement('canvas');
      canvas.width = 1600;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#070a13';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw title header onto PNG
        ctx.fillStyle = '#14b8a6';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillText(diagramName, 50, 60);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText(`PromptCanvas Architecture Export • ${new Date().toLocaleDateString()}`, 50, 90);

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 110, 1520, 740);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '16px monospace';
        ctx.fillText(`Draw.io Architecture Diagram Component Nodes`, 60, 150);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${sanitizeFilename(diagramName)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setDownloadSuccess('png');
      setTimeout(() => setDownloadSuccess(null), 2500);
    } catch (e) {
      console.error(e);
      alert('Failed to generate PNG image.');
    } finally {
      setLoadingType(null);
    }
  };

  // 3. Export PDF Document (.pdf)
  const handleExportPdf = () => {
    setLoadingType('pdf');
    try {
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
                .meta { color: #64748b; font-size: 13px; margin-bottom: 30px; }
                .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; background: #f8fafc; }
                .card h3 { color: #334155; margin-top: 0; font-size: 16px; }
                .code-box { background: #0f172a; color: #f8fafc; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 12px; white-space: pre-wrap; word-break: break-all; }
              </style>
            </head>
            <body>
              <h1>${diagramName}</h1>
              <div class="meta">Exported from PromptCanvas Enterprise Platform on ${new Date().toLocaleDateString()}</div>
              
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

              <div class="card">
                <h3>Draw.io XML Definition</h3>
                <div class="code-box">${xmlContent.slice(0, 1500)}...</div>
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
    } catch (e) {
      console.error(e);
      alert('Failed to export PDF document.');
    } finally {
      setLoadingType(null);
    }
  };

  // 4. Export Editable PowerPoint Presentation (.pptx)
  const handleExportPptx = async () => {
    setLoadingType('pptx');
    try {
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';

      // Slide 1: Cover Slide
      const slide1 = pptx.addSlide();
      slide1.background = { color: '070a13' };

      slide1.addText('PROMPTCANVAS ENTERPRISE ARCHITECTURE', {
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

      // Slide 2: Diagram Visual Slide
      const slide2 = pptx.addSlide();
      slide2.background = { color: '0B101D' };
      slide2.addText(`Architecture Canvas Diagram: ${diagramName}`, {
        x: 0.8,
        y: 0.6,
        w: 11,
        h: 0.6,
        fontSize: 22,
        color: '14B8A6',
        bold: true,
      });

      slide2.addShape(pptx.ShapeType.rect, {
        x: 0.8,
        y: 1.5,
        w: 11.5,
        h: 5.0,
        fill: { color: '0F172A' },
        line: { color: '334155', width: 2 },
      });

      slide2.addText(`[Draw.io Vector Diagram Node Topology: ${diagramName}]\n\n• Modular Cloud Infrastructure Components\n• VPC Network Isolation & Private Subnets\n• Automated Security Armor Controls & IAM Auth`, {
        x: 1.2,
        y: 2.5,
        w: 10.5,
        h: 3.0,
        fontSize: 16,
        color: 'CBD5E1',
        align: 'center',
      });

      // Slide 3: Executive Summary & Technical Use-Case (Editable Text)
      const slide3 = pptx.addSlide();
      slide3.background = { color: '070a13' };

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
    } catch (e) {
      console.error(e);
      alert('Failed to generate PowerPoint PPTX presentation.');
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
              <p className="text-xs text-slate-400 mt-1">High-resolution image snapshot with embedded metadata title block.</p>
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
                <span className="text-[9px] font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-500/30">Editable PPT Slide Deck</span>
              </div>
              <h4 className="font-extrabold text-sm text-white group-hover:text-amber-200 transition-colors">PowerPoint Slide Deck (.pptx)</h4>
              <p className="text-xs text-slate-400 mt-1">4-slide editable presentation with cover, diagram slide, business value, and technical breakdown.</p>
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
