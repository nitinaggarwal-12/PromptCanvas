"use client";

import React, { useEffect, useState } from "react";
import { LivingSpecDocument, SpecGroundingSummary } from "@/lib/spec/livingSpecsGenerator";
import { RichSpecRenderer } from "./RichSpecRenderer";
import DiagramViewerRenderSafe from "../DiagramViewerRenderSafe";
import { copyTextToClipboard } from "@/lib/clipboard";
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
  Lock,
  AlertTriangle,
  CircleDashed
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
  /** Optional grounding summary so badges reflect what the documents were really built from. */
  grounding?: SpecGroundingSummary;
}

function editsStorageKey(projectName: string, versionName: string): string {
  const safe = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 64);
  return `promptcanvas_spec_edits_${safe(projectName)}_${safe(versionName)}`;
}

function loadStoredEdits(key: string): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
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
  onSelectBlueprintById,
  grounding
}: LivingSpecsViewerProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [isEditing, setIsEditing] = useState(false);
  const storageKey = editsStorageKey(projectName, versionName);
  const [editedContentById, setEditedContentById] = useState<Record<string, string>>(() => loadStoredEdits(storageKey));

  // Re-hydrate when the project/version changes (render-time reset on key change).
  const [editsLoadedFor, setEditsLoadedFor] = useState(storageKey);
  if (editsLoadedFor !== storageKey) {
    setEditsLoadedFor(storageKey);
    setEditedContentById(loadStoredEdits(storageKey));
  }

  // Persist local edits so they survive view switches and page reloads. Edits are
  // browser-local; they are NOT pushed back to the canvas or any server.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (Object.keys(editedContentById).length === 0) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(storageKey, JSON.stringify(editedContentById));
      }
    } catch {
      // Quota or privacy-mode failures are non-fatal: the in-memory copy still works.
    }
  }, [editedContentById, storageKey]);

  const activeDoc = specs.find(d => d.id === activeDocId) || specs[0];
  const effectiveMarkdown = activeDoc
    ? (editedContentById[activeDoc.id] ?? activeDoc.markdownContent)
    : "";
  const docHasLocalEdits = (doc: LivingSpecDocument) =>
    editedContentById[doc.id] !== undefined && editedContentById[doc.id] !== doc.markdownContent;
  const hasUnsavedEdits = Boolean(activeDoc && docHasLocalEdits(activeDoc));

  // Truthful sync status: local edits always win, then the generator's own flag, then grounding.
  const syncBadge = (() => {
    if (hasUnsavedEdits) {
      return { tone: "amber", Icon: AlertTriangle, label: "Local edits — diverged from canvas" } as const;
    }
    if (activeDoc?.isSynced) {
      return {
        tone: "emerald",
        Icon: CheckCircle2,
        label: `Synchronized with canvas${grounding ? ` (${grounding.componentCount} nodes)` : ""}`,
      } as const;
    }
    if (grounding?.source === "ast") {
      return { tone: "sky", Icon: CircleDashed, label: `Derived from architecture AST (${grounding.componentCount}) — canvas XML not loaded` } as const;
    }
    return { tone: "slate", Icon: CircleDashed, label: "Template content — not grounded on canvas" } as const;
  })();
  const syncToneClasses: Record<typeof syncBadge.tone, string> = {
    amber: "bg-amber-50 text-amber-800 border border-amber-200",
    emerald: "bg-emerald-50 text-emerald-700",
    sky: "bg-sky-50 text-sky-800 border border-sky-200",
    slate: "bg-slate-100 text-slate-600 border border-slate-200",
  };

  const handleCopy = async () => {
    if (!activeDoc) return;
    const ok = await copyTextToClipboard(effectiveMarkdown);
    setCopyState(ok ? "copied" : "failed");
    setTimeout(() => setCopyState("idle"), 2000);
  };

  const handleDownload = () => {
    if (activeDoc) {
      const blob = new Blob([effectiveMarkdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeDoc.id}_${activeDoc.shortTitle.toLowerCase().replace(/\s+/g, "_")}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadAllBundle = () => {
    if (!specs || specs.length === 0) return;
    const combined = specs
      .map(doc => {
        const body = editedContentById[doc.id] ?? doc.markdownContent;
        return `# ==============================================================================\n# ${doc.id}: ${doc.title} (${projectName})\n# Category: ${doc.category.toUpperCase()} | Version: ${versionName}\n# ==============================================================================\n\n${body}`;
      })
      .join("\n\n---\n\n");
    const blob = new Blob([combined], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeProj = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    a.download = `${safeProj}_${specs.length}_living_specs_bundle.md`;
    a.click();
    URL.revokeObjectURL(url);
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
      
      {/* 16 Spec Tabs Bar */}
      <div className="px-6 py-2.5 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-[70vw]">
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
                {docHasLocalEdits(doc) ? (
                  <span title="Local edits" className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-amber-300" : "bg-amber-500"}`}></span>
                ) : doc.isSynced ? (
                  <span title="Synchronized with canvas" className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-300" : "bg-emerald-500"}`}></span>
                ) : null}
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
              onClick={() => onShareDoc(hasUnsavedEdits ? { ...activeDoc, markdownContent: effectiveMarkdown, isSynced: false } : activeDoc)}
              className="px-2.5 py-1 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
              title={hasUnsavedEdits ? "Share Document Deep Link (includes your local edits)" : "Share Document Deep Link"}
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Share Doc</span>
            </button>
          )}

          <button
            onClick={handleDownload}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
            title="Download Current Markdown Spec (.md)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download (.md)</span>
          </button>

          <button
            onClick={handleDownloadAllBundle}
            className="px-2.5 py-1 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
            title={`Download All ${specs.length} Living Specs Bundle (.md)`}
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>All {specs.length} (.md)</span>
          </button>
          
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
            title={copyState === "failed" ? "Clipboard blocked by the browser — use Download (.md) instead" : "Copy current spec markdown"}
          >
            {copyState === "copied" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copyState === "copied" ? "Copied!" : copyState === "failed" ? "Copy blocked" : "Copy Spec"}</span>
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
              <span
                data-testid="spec-sync-badge"
                data-sync-tone={syncBadge.tone}
                className={`px-2 py-0.5 rounded-md font-sans text-[11px] font-bold flex items-center gap-1 ${syncToneClasses[syncBadge.tone]}`}
                title={
                  hasUnsavedEdits
                    ? "You edited this document in this browser. Edits are kept locally and are not written back to the canvas."
                    : grounding
                      ? `Grounding source: ${grounding.source}`
                      : undefined
                }
              >
                <syncBadge.Icon className="w-3 h-3" />
                <span>{syncBadge.label}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
              <span>Updated: {activeDoc.lastUpdated || "Just now"}</span>
              <span>•</span>
              <span>Version: {versionName}</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{activeDoc.title} — {projectName}</h1>
            <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">{activeDoc.description}</p>
          </div>

          {/* Quick SLA & Compliance Badges */}
          {(() => {
            const combinedContext = `${projectName} ${useCaseName} ${effectiveMarkdown} ${specs[0]?.markdownContent || ""}`;
            const slaMatch = combinedContext.match(/\b(99\.\d{1,3}%)\b/);
            const declaredSla = grounding?.declaredSlaTarget || (slaMatch ? slaMatch[1] : null);
            const compositePct = grounding?.compositeAvailabilityPct ?? null;
            const declaredPct = declaredSla ? Number((declaredSla.match(/(\d{2,3}(?:\.\d+)?)/) || [])[1]) : NaN;
            const compositeShortfall = compositePct !== null && Number.isFinite(declaredPct) && compositePct < declaredPct;
            const lowerCtx = combinedContext.toLowerCase();
            const resolvedCompliance =
              lowerCtx.includes("hipaa") || lowerCtx.includes("clinical") || lowerCtx.includes("hospital") || lowerCtx.includes("patient")
                ? "HIPAA / HITRUST CSF"
                : lowerCtx.includes("pci-dss") || lowerCtx.includes("payment") || lowerCtx.includes("fintech") || lowerCtx.includes("settlement")
                ? "PCI-DSS 4.0 / SOC2"
                : lowerCtx.includes("fedramp") || lowerCtx.includes("nist") || lowerCtx.includes("sovereign")
                ? "FedRAMP / NIST 800-53"
                : "SOC2 Type II / ISO 27001";
            const resolvedSecurity =
              lowerCtx.includes("aws") && !lowerCtx.includes("vpc-sc")
                ? "Zero Trust / AWS KMS"
                : lowerCtx.includes("azure") && !lowerCtx.includes("vpc-sc")
                ? "Zero Trust / Entra ID"
                : "Zero Trust / VPC-SC";

            return (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div
                  data-testid="spec-sla-tile"
                  className={`rounded-lg p-2.5 border flex items-center gap-2 ${compositeShortfall ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-100"}`}
                  title={
                    compositePct !== null
                      ? `Serial composite of ${grounding?.compositeSampleSize ?? 0} in-path component SLAs = ${compositePct.toFixed(4)}%${compositeShortfall ? " — below the declared target" : ""}`
                      : "Declared target from architecture metadata"
                  }
                >
                  <Zap className={`w-4 h-4 shrink-0 ${compositeShortfall ? "text-amber-600" : "text-amber-500"}`} />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Declared SLA</div>
                    <div className="text-xs font-bold text-slate-800">{declaredSla || "Not declared"}</div>
                    {compositePct !== null && (
                      <div className={`text-[10px] font-mono ${compositeShortfall ? "text-amber-700" : "text-slate-500"}`}>
                        composite {compositePct.toFixed(3)}%{compositeShortfall ? " ⚠" : ""}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Security Model</div>
                    <div className="text-xs font-bold text-slate-800">{resolvedSecurity}</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Compliance</div>
                    <div className="text-xs font-bold text-slate-800">{resolvedCompliance}</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-400">AI Grounding</div>
                    <div className="text-xs font-bold text-slate-800">Gemini 3.1 Pro + 2.5 Flash</div>
                  </div>
                </div>
              </div>
            );
          })()}

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
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-sm space-y-3">
          {hasUnsavedEdits && (
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <span className="font-semibold">Local edits active for {activeDoc.id} ({activeDoc.shortTitle}) — saved in this browser only, not written back to the canvas</span>
              <button
                onClick={() => {
                  if (!activeDoc) return;
                  setEditedContentById(prev => {
                    const next = { ...prev };
                    delete next[activeDoc.id];
                    return next;
                  });
                }}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold transition cursor-pointer"
              >
                Reset to Generated Spec
              </button>
            </div>
          )}
          {isEditing ? (
            <textarea
              value={effectiveMarkdown}
              onChange={(e) => {
                if (!activeDoc) return;
                const val = e.target.value;
                setEditedContentById(prev => ({
                  ...prev,
                  [activeDoc.id]: val
                }));
              }}
              rows={24}
              aria-label={`Edit ${activeDoc.title} Markdown`}
              className="w-full bg-white border border-slate-300 rounded-xl p-4 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 shadow-inner leading-relaxed"
            />
          ) : (
            <RichSpecRenderer content={effectiveMarkdown} />
          )}
        </div>

      </div>
    </section>
  );
}
