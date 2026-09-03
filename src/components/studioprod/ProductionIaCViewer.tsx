'use client';

import React, { useState } from 'react';
import { generateProductionIaC, ProductionIaCManifest } from '@/lib/spec/iacGenerator';
import { Copy, Check, Download, Terminal, Server, Shield, Database, Cpu } from 'lucide-react';

interface ProductionIaCViewerProps {
  projectName: string;
  versionTag: string;
  domain: string;
}

export function ProductionIaCViewer({ projectName, versionTag, domain }: ProductionIaCViewerProps) {
  const [activeTab, setActiveTab] = useState<'mainTf' | 'variablesTf' | 'spannerDdl' | 'k8sYaml'>('mainTf');
  const [copied, setCopied] = useState(false);

  const iacData: ProductionIaCManifest = generateProductionIaC(projectName, versionTag, domain);

  const tabs = [
    { id: 'mainTf', label: 'main.tf (GCP Infrastructure)', icon: Server, content: iacData.terraformMainTf, lang: 'hcl' },
    { id: 'variablesTf', label: 'variables.tf (Sovereignty & Region)', icon: Shield, content: iacData.terraformVariablesTf, lang: 'hcl' },
    { id: 'spannerDdl', label: 'spanner_schema.sql (ACID DDL)', icon: Database, content: iacData.spannerDdlSql, lang: 'sql' },
    { id: 'k8sYaml', label: 'deployment.yaml (GKE Microservices)', icon: Cpu, content: iacData.k8sDeploymentYaml, lang: 'yaml' },
  ];

  const currentContent = tabs.find(t => t.id === activeTab)?.content || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const activeObj = tabs.find(t => t.id === activeTab);
    const filename = activeTab === 'mainTf' ? 'main.tf' : activeTab === 'variablesTf' ? 'variables.tf' : activeTab === 'spannerDdl' ? 'schema.sql' : 'deployment.yaml';
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${versionTag}_${filename}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PROD-READY IAC
              </span>
              <span className="text-xs text-slate-400">Blueprint: {versionTag} • {domain}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Infrastructure as Code & Deployment Manifests</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Production Terraform scripts, Cloud Spanner TrueTime DDL, and GKE Kubernetes rolling deployment definitions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              Download File
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono text-slate-300">
              {activeTab === 'mainTf' ? 'terraform/main.tf' : activeTab === 'variablesTf' ? 'terraform/variables.tf' : activeTab === 'spannerDdl' ? 'sql/spanner_schema.sql' : 'k8s/deployment.yaml'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 uppercase font-mono">
            {tabs.find(t => t.id === activeTab)?.lang}
          </span>
        </div>
        <pre className="p-6 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed selection:bg-blue-500/30">
          <code>{currentContent}</code>
        </pre>
      </div>
    </div>
  );
}
