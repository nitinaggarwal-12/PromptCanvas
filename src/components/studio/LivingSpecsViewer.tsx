"use client";

import React, { useState } from "react";
import { LivingSpecDocument } from "@/lib/spec/livingSpecsGenerator";
import { RichSpecRenderer } from "./RichSpecRenderer";
import DiagramViewerRenderSafe from "../DiagramViewerRenderSafe";
import { 
  FileText, 
  Copy, 
  Check, 
  Edit3, 
  Sparkles, 
  Layers, 
  Shield, 
  Database, 
  Server, 
  Activity, 
  ArrowRight,
  Download,
  Share2,
  CheckCircle2,
  BadgeCheck,
  Zap,
  Lock
} from "lucide-react";

import { ARCHITECTURE_DOCUMENT_BINDINGS } from "@/lib/canonical/canonicalTemplates";

interface LivingSpecsViewerProps {
  specs: LivingSpecDocument[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onSwitchToDiagramView: () => void;
  onShareDoc?: (doc: LivingSpecDocument) => void;
  currentXml?: string;
  projectName?: string;
  useCaseName?: string;
  versionName?: string;
  onSelectBlueprintById?: (templateId: string) => void;
}

export function LivingSpecsViewer({
  specs,
  activeDocId,
  onSelectDoc,
  onSwitchToDiagramView,
  onShareDoc,
  currentXml = "",
  projectName = "Google Cloud Enterprise",
  useCaseName = "Multi-Tier Native Reference Architecture",
  versionName = "v1.2",
  onSelectBlueprintById
}: LivingSpecsViewerProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const activeDoc = specs.find(d => d.id === activeDocId) || specs[0];

  const handleCopy = () => {
    if (activeDoc) {
      navigator.clipboard.writeText(activeDoc.markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (activeDoc) {
      const blob = new Blob([activeDoc.markdownContent], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeDoc.id}_${activeDoc.shortTitle.toLowerCase().replace(/\s+/g, "_")}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getDocIcon = (category: string) => {
    switch (category) {
      case "product": return <Layers className="w-3.5 h-3.5 text-blue-600" />;
      case "architecture": return <Server className="w-3.5 h-3.5 text-indigo-600" />;
      case "engineering": return <Database className="w-3.5 h-3.5 text-emerald-600" />;
      case "security": return <Shield className="w-3.5 h-3.5 text-purple-600" />;
      case "operations": return <Activity className="w-3.5 h-3.5 text-amber-600" />;
      default: return <FileText className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <section className="flex-1 bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      
      {/* 10 Spec Tabs Bar */}
      <div className="px-6 py-2.5 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-[75vw]">
          {specs.map(doc => {
            const isActive = doc.id === activeDoc.id;
            return (
              <button
                key={doc.id}
                onClick={() => onSelectDoc(doc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {getDocIcon(doc.category)}
                <span>{doc.shortTitle}</span>
                {doc.isSynced && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-300" : "bg-emerald-500"}`}></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? "Preview" : "Edit"}</span>
          </button>

          {onShareDoc && (
            <button
              onClick={() => onShareDoc(activeDoc)}
              className="px-2.5 py-1 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
              title="Share Document Deep Link"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Share Doc</span>
            </button>
          )}

          <button
            onClick={handleDownload}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
            title="Download Markdown Spec"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
          
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Spec"}</span>
          </button>
        </div>
      </div>

      {/* Document Content View - Reclaiming Full Desktop Width */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full space-y-6">
        
        {/* Document Executive Header Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-700 font-mono text-[11px] font-bold">
                {activeDoc.id}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[11px] font-bold uppercase tracking-wider">
                {activeDoc.category}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-sans text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Synchronized with Canvas</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
              <span>Updated: Just now</span>
              <span>•</span>
              <span>Version: 1.2.4-prod</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{activeDoc.title}</h1>
            <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">{activeDoc.description}</p>
          </div>

          {/* Quick SLA & Compliance Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Target SLA</div>
                <div className="text-xs font-bold text-slate-800">99.999% Multi-Reg</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Security Model</div>
                <div className="text-xs font-bold text-slate-800">Zero Trust / VPC-SC</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Compliance</div>
                <div className="text-xs font-bold text-slate-800">SOC2 Type II / HIPAA</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-400">AI Grounding</div>
                <div className="text-xs font-bold text-slate-800">Vertex AI / Gemini 3.7</div>
              </div>
            </div>
          </div>

          {/* Bound Certified Architectural Diagram Views */}
          {(() => {
            const docBinding = ARCHITECTURE_DOCUMENT_BINDINGS.find(b => b.docId === activeDoc.id);
            const boundViews = docBinding ? docBinding.requiredDiagramViews : [];
            if (boundViews.length === 0) return null;

            return (
              <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 rounded-xl p-3.5 border border-blue-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Bound Certified Diagram Blueprints</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 font-bold">
                        {boundViews.length} Required Views
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Canonical blueprints bound to this specification via Architecture Contract
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {boundViews.map((view, idx) => {
                    const tplId = view.split(' ')[0];
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (onSelectBlueprintById) onSelectBlueprintById(tplId);
                          onSwitchToDiagramView();
                        }}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200/90 shadow-2xs transition flex items-center gap-1.5 cursor-pointer group"
                        title={`Load Blueprint #${tplId} (${view.substring(3)}) into Canvas`}
                      >
                        <span className="font-mono text-[11px] px-1 py-0.2 rounded bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white">
                          #{tplId}
                        </span>
                        <span className="font-sans font-medium">{view.substring(3)}</span>
                        <ArrowRight className="w-3 h-3 text-blue-400 group-hover:text-white" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* IN-SEQUENCE EMBEDDED DIAGRAM FIGURE (If available) */}
        {activeDoc.embeddedFigure && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600">{activeDoc.embeddedFigure.id}:</span>
                <span className="font-bold text-xs text-slate-900">{activeDoc.embeddedFigure.title}</span>
              </div>
              <button
                onClick={onSwitchToDiagramView}
                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs border border-blue-200 flex items-center gap-1 transition"
              >
                <span>📐 Edit in Full Canvas</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Embedded Live Diagram Graphic Preview */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-inner bg-slate-950/5 relative min-h-[360px] flex items-center justify-center">
              {currentXml ? (
                <div className="w-full h-[400px]">
                  <DiagramViewerRenderSafe
                    xml={currentXml}
                    bgTheme="light"
                    aspectRatioId="16:9"
                    allowFullScaleScroll={false}
                  />
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 space-y-2">
                  <div className="font-mono font-bold text-slate-700">Authoritative Reference Topology</div>
                  <p>Synchronized live with current canvas model.</p>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 italic text-center">
              {activeDoc.embeddedFigure.id}: Authoritative architectural diagram synchronized dynamically with Canvas {versionName}.
            </p>
          </div>
        )}

        {/* Formatted Markdown Body with RichSpecRenderer */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-sm">
          {isEditing ? (
            <textarea
              defaultValue={activeDoc.markdownContent}
              rows={24}
              className="w-full bg-white border border-slate-300 rounded-xl p-4 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 shadow-inner leading-relaxed"
            />
          ) : (
            <RichSpecRenderer content={activeDoc.markdownContent} />
          )}
        </div>

      </div>
    </section>
  );
}
