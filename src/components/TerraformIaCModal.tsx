'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Code,
  Download,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  DollarSign,
  Layers,
  FileCode,
  X,
  Server,
  AlertTriangle,
  OctagonAlert,
  Info,
  ScanSearch,
} from 'lucide-react';
import {
  TerraformFileBundle,
  TerraformPlanSimulation,
  TERRAFORM_PINS,
  generateTerraformBundle,
  simulateTerraformPlan
} from '@/lib/iac/terraformEngine';
import { copyTextToClipboard } from '@/lib/clipboard';

interface TerraformIaCModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectScope: string;
  domain: string;
  isLight: boolean;
  xmlContent?: string;
  diagramId?: string;
}

type TerraformTab = 'main' | 'variables' | 'outputs' | 'tfvars' | 'provider' | 'k8s' | 'plan';

export default function TerraformIaCModal({
  isOpen,
  onClose,
  projectTitle,
  projectScope,
  domain,
  isLight,
  xmlContent,
}: TerraformIaCModalProps) {
  const [activeTab, setActiveTab] = useState<TerraformTab>('main');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  // Bumped by the "Static Analysis" button so the memo re-runs on demand.
  const [analysisRun, setAnalysisRun] = useState(0);

  // The bundle is a pure function of its inputs — derive it, don't sync it into state.
  // The engine auto-detects AWS vs GCP from the canvas vocabulary; 'gcp' is only the
  // fallback when no canvas XML is present.
  const bundle = useMemo<TerraformFileBundle | null>(
    () => (isOpen ? generateTerraformBundle(projectTitle, projectScope, domain, 'gcp', xmlContent) : null),
    [isOpen, projectTitle, projectScope, domain, xmlContent]
  );
  const simulation = useMemo<TerraformPlanSimulation | null>(
    () => (bundle ? simulateTerraformPlan(bundle) : null),
    // analysisRun is an intentional dependency: it lets the user re-run on demand.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bundle, analysisRun]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const groundingLabel = useMemo(() => {
    if (!bundle) return '';
    if (bundle.groundingSource === 'canvas-xml') {
      return `Grounded on canvas XML • ${bundle.mappedNodeCount}/${bundle.canvasNodeCount} nodes mapped • ${bundle.cloudProvider.toUpperCase()}`;
    }
    return `Baseline template (no canvas XML supplied) • ${bundle.cloudProvider.toUpperCase()}`;
  }, [bundle]);

  if (!isOpen || !bundle) return null;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'main': return bundle.mainTf;
      case 'variables': return bundle.variablesTf;
      case 'outputs': return bundle.outputsTf;
      case 'tfvars': return bundle.terraformTfvars;
      case 'provider': return bundle.providerTf;
      case 'k8s': return bundle.k8sManifestYaml;
      case 'plan': return simulation?.planOutput || '';
      default: return bundle.mainTf;
    }
  };

  const getActiveFilename = () => {
    switch (activeTab) {
      case 'main': return 'main.tf';
      case 'variables': return 'variables.tf';
      case 'outputs': return 'outputs.tf';
      case 'tfvars': return 'terraform.tfvars';
      case 'provider': return 'provider.tf';
      case 'k8s': return 'k8s_manifest.yaml';
      case 'plan': return 'terraform_static_analysis.log';
      default: return 'main.tf';
    }
  };

  const handleCopyCode = async () => {
    const ok = await copyTextToClipboard(getActiveCode());
    setCopyState(ok ? 'copied' : 'failed');
    setTimeout(() => setCopyState('idle'), 2000);
  };

  const handleDownloadSingleFile = () => {
    const code = getActiveCode();
    const filename = getActiveFilename();
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Static analysis is a pure, synchronous function of the bundle. No fake
  // latency: the previous implementation used a 600 ms setTimeout to imitate a
  // CLI run that never happened.
  const handleRunStaticAnalysis = () => {
    setAnalysisRun((n) => n + 1);
    setActiveTab('plan');
  };

  const errorCount = simulation?.errors.length ?? 0;
  const warningCount = simulation?.securityWarnings.length ?? 0;
  const checksRun = simulation?.securityChecksRun ?? 0;
  const checksPassed = simulation?.securityChecksPassed ?? 0;
  const checksTone =
    errorCount > 0 ? 'rose' : warningCount > 0 ? 'amber' : 'emerald';
  const toneClasses: Record<string, { box: string; text: string }> = {
    rose: { box: 'bg-rose-500/20 text-rose-400', text: 'text-rose-400' },
    amber: { box: 'bg-amber-500/20 text-amber-400', text: 'text-amber-400' },
    emerald: { box: 'bg-emerald-500/20 text-emerald-400', text: 'text-emerald-400' },
  };

  return (
    <aside
      data-testid="right-terraform-panel"
      aria-label="Terraform Infrastructure as Code Panel"
      className={`fixed top-12 bottom-0 right-0 z-40 w-[480px] sm:w-[560px] flex flex-col border-l shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200 ${
        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#070A13] border-slate-800 text-white'
      }`}
    >
      {/* TOP HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
            <FileCode className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black truncate">
                Terraform IaC Inspector
              </h3>
              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 shrink-0">
                {bundle.resourcesCount} Resources
              </span>
              <span
                data-testid="terraform-grounding-badge"
                className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full border shrink-0 ${
                  bundle.groundingSource === 'canvas-xml'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}
              >
                {bundle.groundingSource === 'canvas-xml' ? 'Canvas-grounded' : 'Baseline'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate" title={groundingLabel}>
              {groundingLabel}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleRunStaticAnalysis}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm transition-all cursor-pointer"
            title="Offline static HCL analysis — no terraform binary is executed in the browser"
          >
            <ScanSearch className="w-3 h-3" />
            <span>Static Analysis</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            title="Copy active file"
          >
            {copyState === 'copied' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy blocked' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadSingleFile}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            title="Download active file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 hover:text-rose-500 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Collapse Right Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FILE TABS BAR */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto text-[11px] font-mono font-bold">
        {([
          { id: 'main', label: 'main.tf', icon: Code },
          { id: 'variables', label: 'variables.tf', icon: Layers },
          { id: 'outputs', label: 'outputs.tf', icon: Server },
          { id: 'tfvars', label: 'terraform.tfvars', icon: FileCode },
          { id: 'provider', label: 'provider.tf', icon: ShieldCheck },
          { id: 'k8s', label: 'k8s.yaml', icon: Layers },
          { id: 'plan', label: 'analysis.log', icon: Terminal },
        ] as Array<{ id: TerraformTab; label: string; icon: React.ComponentType<{ className?: string }> }>).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CODE VIEWPORT / TERMINAL */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#0B111E] text-slate-100 font-mono text-xs leading-relaxed">
        {activeTab === 'plan' ? (
          <div className="space-y-4">
            {/* Analysis Summary Badges */}
            <div
              data-testid="terraform-analysis-summary"
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  +{simulation?.resourcesToAdd ?? bundle.resourcesCount}
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Resources</div>
                  <div className="text-[11px] font-bold text-emerald-400">{simulation?.resourcesToAdd ?? bundle.resourcesCount} to add</div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Est. Cost (list price)</div>
                  <div className="text-[11px] font-bold text-sky-400">{simulation?.estimatedMonthlyCost}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${toneClasses[checksTone].box}`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Static checks</div>
                  <div className={`text-[11px] font-bold ${toneClasses[checksTone].text}`}>
                    {checksPassed}/{checksRun} passed
                    {errorCount > 0 ? ` • ${errorCount} error${errorCount === 1 ? '' : 's'}` : ''}
                    {warningCount > 0 ? ` • ${warningCount} warning${warningCount === 1 ? '' : 's'}` : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Findings */}
            {errorCount > 0 && (
              <ul data-testid="terraform-analysis-errors" className="space-y-1.5 p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-200 text-[11px] font-sans">
                {simulation!.errors.map((err, idx) => (
                  <li key={`err-${idx}`} className="flex items-start gap-2">
                    <OctagonAlert className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-400" />
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            )}
            {warningCount > 0 && (
              <ul data-testid="terraform-analysis-warnings" className="space-y-1.5 p-3 rounded-xl bg-amber-950/30 border border-amber-900/50 text-amber-100 text-[11px] font-sans">
                {simulation!.securityWarnings.map((warn, idx) => (
                  <li key={`warn-${idx}`} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            )}
            {(simulation?.infoNotes.length ?? 0) > 0 && (
              <ul className="space-y-1.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300 text-[11px] font-sans">
                {simulation!.infoNotes.map((note, idx) => (
                  <li key={`info-${idx}`} className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sky-400" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Raw Analysis Output */}
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-teal-300 text-[11px]">
              {simulation?.planOutput}
            </pre>
          </div>
        ) : (
          <pre className="overflow-x-auto text-sky-300 text-[11px]">
            {getActiveCode()}
          </pre>
        )}
      </div>

      {/* BOTTOM STATUS BAR */}
      <div
        data-testid="terraform-panel-footer"
        className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md text-[11px] text-slate-400"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full shrink-0 ${errorCount > 0 ? 'bg-rose-500' : warningCount > 0 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          <span className="truncate">
            Offline static analysis only — run <code>terraform validate</code> and <code>terraform plan</code> in CI before <code>apply</code>
          </span>
        </div>

        <div className="font-mono text-[10px] shrink-0">
          Terraform {TERRAFORM_PINS.requiredVersion} &bull; google {TERRAFORM_PINS.google}
        </div>
      </div>
    </aside>
  );
}
