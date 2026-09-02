'use client';

import React, { useState } from 'react';
import { LivingSpecDocument } from '@/lib/spec/livingSpecsGenerator';
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
  GitBranch, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface LivingSpecsViewerProps {
  specs: LivingSpecDocument[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onSwitchToDiagramView: () => void;
}

export function LivingSpecsViewer({
  specs,
  activeDocId,
  onSelectDoc,
  onSwitchToDiagramView
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

  const getDocIcon = (category: string) => {
    switch (category) {
      case 'product': return <Layers className="w-3.5 h-3.5 text-blue-600" />;
      case 'architecture': return <Server className="w-3.5 h-3.5 text-indigo-600" />;
      case 'engineering': return <Database className="w-3.5 h-3.5 text-emerald-600" />;
      case 'security': return <Shield className="w-3.5 h-3.5 text-purple-600" />;
      case 'operations': return <Activity className="w-3.5 h-3.5 text-amber-600" />;
      default: return <FileText className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <section className="flex-1 bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      
      {/* 10 Spec Tabs Bar */}
      <div className="px-6 py-2.5 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-[80vw]">
          {specs.map(doc => {
            const isActive = doc.id === activeDoc.id;
            return (
              <button
                key={doc.id}
                onClick={() => onSelectDoc(doc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {getDocIcon(doc.category)}
                <span>{doc.shortTitle}</span>
                {doc.isSynced && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-300' : 'bg-emerald-500'}`}></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Preview' : 'Edit'}</span>
          </button>
          
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Spec'}</span>
          </button>
        </div>
      </div>

      {/* Document Content View */}
      <div className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto w-full space-y-6 text-sm text-slate-800 leading-relaxed">
        
        {/* Document Title Banner */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs text-blue-600 font-mono uppercase tracking-wider font-bold">
            <span>{activeDoc.id}</span> • <span>{activeDoc.category.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{activeDoc.title}</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">{activeDoc.description}</p>
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

            {/* Embedded Diagram Graphic Preview */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 relative overflow-hidden text-xs">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="text-[10px] font-mono text-blue-600 font-bold uppercase">Ingress & Security</div>
                  <div className="font-bold text-slate-900 mt-1">Cloud Armor & GCLB</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">TLS 1.3 • Anycast VIP</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="text-[10px] font-mono text-indigo-600 font-bold uppercase">Compute & Mesh</div>
                  <div className="font-bold text-slate-900 mt-1">GKE Autopilot + Vertex AI</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">mTLS • Gemini 2.5 Scoring</div>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-dashed border-emerald-500 shadow-sm bg-emerald-50/20">
                  <div className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Multi-Region Database</div>
                  <div className="font-bold text-emerald-800 mt-1">Cloud Spanner nam3</div>
                  <div className="text-[9px] text-emerald-700 mt-0.5">TrueTime Sync • 99.999% SLA</div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic text-center">
              {activeDoc.embeddedFigure.id}: Authoritative architectural diagram synchronized dynamically with Canvas v1.1.
            </p>
          </div>
        )}

        {/* Formatted Markdown Body */}
        {isEditing ? (
          <textarea
            defaultValue={activeDoc.markdownContent}
            rows={18}
            className="w-full bg-white border border-slate-300 rounded-xl p-4 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 shadow-inner"
          />
        ) : (
          <div className="prose prose-slate max-w-none prose-sm leading-relaxed">
            <div className="whitespace-pre-wrap font-sans text-xs text-slate-700 space-y-4">
              {activeDoc.markdownContent}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
