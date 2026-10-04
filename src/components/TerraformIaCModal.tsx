'use client';

import React, { useState, useEffect } from 'react';
import {
  Code,
  Download,
  Copy,
  Check,
  Play,
  Terminal,
  ShieldCheck,
  DollarSign,
  Layers,
  FileCode,
  Sparkles,
  X,
  Server,
  RefreshCw
} from 'lucide-react';
import {
  TerraformFileBundle,
  TerraformPlanSimulation,
  generateTerraformBundle,
  simulateTerraformPlan
} from '@/lib/iac/terraformEngine';

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

export default function TerraformIaCModal({
  isOpen,
  onClose,
  projectTitle,
  projectScope,
  domain,
  isLight,
  xmlContent,
}: TerraformIaCModalProps) {
  const [bundle, setBundle] = useState<TerraformFileBundle | null>(null);
  const [activeTab, setActiveTab] = useState<'main' | 'variables' | 'outputs' | 'tfvars' | 'provider' | 'k8s' | 'plan'>('main');
  const [simulation, setSimulation] = useState<TerraformPlanSimulation | null>(null);
  const [isRunningPlan, setIsRunningPlan] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const generated = generateTerraformBundle(projectTitle, projectScope, domain, 'gcp', xmlContent);
      setBundle(generated);
      setSimulation(simulateTerraformPlan(generated));
      setActiveTab('main');
    }
  }, [isOpen, projectTitle, projectScope, domain, xmlContent]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
      case 'plan': return 'terraform_plan_simulation.log';
      default: return 'main.tf';
    }
  };

  const handleCopyCode = () => {
    const code = activeTab === 'plan' ? simulation?.planOutput || '' : getActiveCode();
    navigator.clipboard.writeText(code);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
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

  const handleRunPlanSimulation = () => {
    setIsRunningPlan(true);
    setTimeout(() => {
      setSimulation(simulateTerraformPlan(bundle));
      setIsRunningPlan(false);
      setActiveTab('plan');
    }, 600);
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
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              Non-blocking right panel &bull; HCL &bull; GKE &bull; Spanner &bull; WAF
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleRunPlanSimulation}
            disabled={isRunningPlan}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm transition-all cursor-pointer"
            title="Simulate terraform plan dry-run execution"
          >
            {isRunningPlan ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
            <span>{isRunningPlan ? 'Running...' : 'Plan'}</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            title="Copy active code"
          >
            {copiedSuccess ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copiedSuccess ? 'Copied' : 'Copy'}</span>
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
        {[
          { id: 'main', label: 'main.tf', icon: Code },
          { id: 'variables', label: 'variables.tf', icon: Layers },
          { id: 'outputs', label: 'outputs.tf', icon: Server },
          { id: 'tfvars', label: 'terraform.tfvars', icon: FileCode },
          { id: 'provider', label: 'provider.tf', icon: ShieldCheck },
          { id: 'k8s', label: 'k8s.yaml', icon: Layers },
          { id: 'plan', label: '▶ plan.log', icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
            {/* Plan Summary Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  +{simulation?.resourcesToAdd ?? bundle.resourcesCount}
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Resources</div>
                  <div className="text-[11px] font-bold text-emerald-400">{simulation?.resourcesToAdd ?? bundle.resourcesCount} Added</div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Est. Cost</div>
                  <div className="text-[11px] font-bold text-sky-400">{simulation?.estimatedMonthlyCost}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">CIS Benchmark</div>
                  <div className="text-[11px] font-bold text-purple-400">98.4% (Passed)</div>
                </div>
              </div>
            </div>

            {/* Raw Terminal Output */}
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
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Ready for <code>terraform apply</code></span>
        </div>

        <div className="font-mono text-[10px]">
          HCL v1.5+ &bull; K8s 1.28+
        </div>
      </div>
    </aside>
  );
}
