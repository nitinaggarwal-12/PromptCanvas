'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  Code2, 
  DollarSign, 
  Play, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Leaf, 
  Sparkles, 
  ChevronRight, 
  X, 
  Terminal, 
  Copy, 
  Check,
  Maximize2,
  RefreshCw
} from 'lucide-react';

interface WorldClassFlagshipSuiteProps {
  activeDiagramName: string;
  architectureType: string;
  onApplyCodeMutation?: (newCode: string) => void;
  onSimulateNodeFailure?: (nodeId: string) => void;
}

export type ActiveFlagshipTool = 'none' | 'chaos' | 'code_split' | 'opex_heatmap' | 'boardroom';

export function FlagshipToolbarButtons({
  activeTool,
  onSelectTool
}: {
  activeTool: ActiveFlagshipTool;
  onSelectTool: (tool: ActiveFlagshipTool) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-900/90 border border-teal-500/40 p-1 rounded-xl shadow-lg">
      <button
        onClick={() => onSelectTool(activeTool === 'chaos' ? 'none' : 'chaos')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
          activeTool === 'chaos'
            ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
        title="Simulate Outage, Regional Failure Modes & RPO/RTO Stress Testing"
      >
        <Flame className="w-3.5 h-3.5 text-red-400" />
        <span>Chaos Simulator</span>
      </button>

      <button
        onClick={() => onSelectTool(activeTool === 'code_split' ? 'none' : 'code_split')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
          activeTool === 'code_split'
            ? 'bg-teal-accent text-bg-dark shadow-md shadow-teal-500/30'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
        title="Live Bidirectional Terraform HCL / Kubernetes Code Split-Pane"
      >
        <Code2 className="w-3.5 h-3.5" />
        <span>Live Code AST</span>
      </button>

      <button
        onClick={() => onSelectTool(activeTool === 'opex_heatmap' ? 'none' : 'opex_heatmap')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
          activeTool === 'opex_heatmap'
            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
        title="Visual OPEX Cloud Spend & Sustainability Carbon Footprint Heatmap"
      >
        <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
        <span>OPEX &amp; Carbon</span>
      </button>

      <button
        onClick={() => onSelectTool(activeTool === 'boardroom' ? 'none' : 'boardroom')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
          activeTool === 'boardroom'
            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
        title="Autonomous Executive Boardroom Pitch Storytelling Narrator"
      >
        <Play className="w-3.5 h-3.5 text-purple-300 fill-current" />
        <span>Boardroom Pitch</span>
      </button>
    </div>
  );
}

export function WorldClassFlagshipDrawer({
  activeTool,
  onClose,
  activeDiagramName,
  architectureType
}: {
  activeTool: ActiveFlagshipTool;
  onClose: () => void;
  activeDiagramName: string;
  architectureType: string;
}) {
  const [selectedChaosScenario, setSelectedChaosScenario] = useState<'primary_db' | 'waf_ddos' | 'kafka_backpressure' | 'region_outage'>('primary_db');
  const [activeCodeTab, setActiveCodeTab] = useState<'terraform' | 'k8s' | 'pulumi'>('terraform');
  const [copiedCode, setCopiedCode] = useState(false);
  const [boardroomStep, setBoardroomStep] = useState(0);

  if (activeTool === 'none') return null;

  const chaosScenarios = {
    primary_db: {
      name: 'Primary PostgreSQL Database Outage',
      failedNode: '[7] Primary Cloud SQL PostgreSQL',
      failoverNode: '[11] DR Replicated Cloud SQL',
      rpo: '< 2.4 Seconds (Async WAL Sync)',
      rto: '48 Seconds (Automated Health Gate DNS Cutover)',
      status: 'CRITICAL FAILOVER ACTIVE',
      color: 'border-red-500/60 bg-red-950/40'
    },
    waf_ddos: {
      name: 'L7 Cloudflare WAF DDoS Spike (1.4 Tbps)',
      failedNode: '[2] Cloudflare Edge WAF Gateway',
      failoverNode: '[2b] Anycast Auto-Scrubbing Cluster',
      rpo: '0 Data Loss (Stateless Edge)',
      rto: '< 1.2 Seconds (Anycast BGP Route Rerouting)',
      status: 'AUTO-MITIGATING AT EDGE',
      color: 'border-amber-500/60 bg-amber-950/40'
    },
    kafka_backpressure: {
      name: 'Kafka Consumer Partition Backpressure Spike',
      failedNode: '[5] Distributed Kafka Event Stream',
      failoverNode: '[5a] Auto-Tiered S3 Dead-Letter Queue',
      rpo: 'Zero Message Drop (14-Day Partition Retention)',
      rto: 'Autoscales Container Workers 4x -> 16x',
      status: 'BACKPRESSURE QUARANTINED',
      color: 'border-teal-500/60 bg-teal-950/40'
    },
    region_outage: {
      name: 'US-East-1 Regional Data Center Failure',
      failedNode: 'Primary VPC Region us-east-1',
      failoverNode: 'Standby VPC Region us-west-2',
      rpo: '< 5.0 Seconds (Cross-Region Interconnect)',
      rto: '95 Seconds (Global BGP Load Balancer Failover)',
      status: 'MULTI-REGION DR ACTIVATED',
      color: 'border-purple-500/60 bg-purple-950/40'
    }
  };

  const sampleTerraform = `# PromptCanvas Gemini 3.6 Pro Generated Production HCL
resource "google_compute_global_forwarding_rule" "default" {
  name       = "promptcanvas-lb-ingress"
  target     = google_compute_target_https_proxy.default.id
  port_range = "443"
}

resource "google_cloud_run_v2_service" "api_engine" {
  name     = "quantumflow-api-service"
  location = "us-central1"
  
  template {
    containers {
      image = "us-docker.pkg.dev/promptcanvas-prod/core-engine:v3.6"
      resources {
        limits = {
          cpu    = "4000m"
          memory = "8Gi"
        }
      }
    }
    vpc_access {
      connector = google_vpc_access_connector.connector.id
      egress    = "PRIVATE_RANGES_ONLY"
    }
  }
}`;

  const sampleK8s = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: quantumflow-microservice-cluster
  namespace: promptcanvas-prod
spec:
  replicas: 6
  selector:
    matchLabels:
      app: quantumflow-engine
  template:
    metadata:
      labels:
        app: quantumflow-engine
    spec:
      containers:
      - name: api-container
        image: gcr.io/promptcanvas-enterprise/engine:v3.6
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"`;

  const samplePulumi = `import * as gcp from "@pulumi/gcp";

export const cloudRunService = new gcp.cloudrunv2.Service("quantumflow-service", {
    name: "quantumflow-api-service",
    location: "us-central1",
    template: {
        containers: [{
            image: "us-docker.pkg.dev/promptcanvas-prod/core-engine:v3.6",
        }],
    },
});`;

  const boardroomSteps = [
    {
      title: '1. Executive Perimeter & Global Edge Defense',
      subtitle: 'Cloudflare WAF + Anycast HTTPS Load Balancer',
      desc: 'All enterprise client traffic enters through an air-gapped Zero-Trust perimeter featuring automatic DDoS mitigation and PII token filtering.',
      metric: '99.999% SLA • < 12ms Edge Latency'
    },
    {
      title: '2. Multi-Agent Autonomous Orchestration Engine',
      subtitle: 'Gemini 3.6 Pro + Ephemeral System Prompt Context Caching',
      desc: 'Requests are routed into parallel worker pods (Grounding Agent, Code Synthesis Agent, Safety Verification Agent) with 90% OPEX cut via Ephemeral Context Caching.',
      metric: '$1,420/mo Token Savings • 3.2x Throughput Boost'
    },
    {
      title: '3. Immutable Distributed Ledger & Telemetry Pipeline',
      subtitle: 'Kafka Streaming + PostgreSQL + Looker Operational Matrix',
      desc: 'Every state change and audit transaction is appended to a tamper-proof event bus with real-time Looker dashboards and zero-latency failover.',
      metric: 'RPO < 2.4s • Instant Executive Observability'
    }
  ];

  return (
    <div className="bg-slate-900/95 border-b border-teal-500/40 p-4 animate-in fade-in slide-in-from-top-2 duration-200 z-30 shrink-0">
      <div className="max-w-7xl mx-auto">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {activeTool === 'chaos' && <Flame className="w-5 h-5 text-red-400" />}
            {activeTool === 'code_split' && <Code2 className="w-5 h-5 text-teal-400" />}
            {activeTool === 'opex_heatmap' && <DollarSign className="w-5 h-5 text-emerald-400" />}
            {activeTool === 'boardroom' && <Play className="w-5 h-5 text-purple-400 fill-current" />}

            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
              {activeTool === 'chaos' && '🔥 Visual Chaos & Disaster Recovery Stress-Simulator'}
              {activeTool === 'code_split' && '💻 Bidirectional Code-to-Canvas AST Split-Pane'}
              {activeTool === 'opex_heatmap' && '💰 Visual OPEX Cloud Spend & Carbon Footprint Radar'}
              {activeTool === 'boardroom' && '🎬 Executive Boardroom Storytelling Narrator (Gemini 3.6 Pro)'}
            </h3>
            <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/30">
              {activeDiagramName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. CHAOS SIMULATOR TOOL */}
        {activeTool === 'chaos' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Select Chaos Failure Scenario</span>
              {(Object.keys(chaosScenarios) as Array<keyof typeof chaosScenarios>).map((key) => {
                const item = chaosScenarios[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedChaosScenario(key)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedChaosScenario === key
                        ? 'border-red-500 bg-red-500/20 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>{item.name}</div>
                  </button>
                );
              })}
            </div>

            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-red-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Outage Injection Node
                  </span>
                  <span className="text-[10px] font-extrabold bg-red-500/20 text-red-300 px-2 py-0.5 rounded">FAILED</span>
                </div>
                <div className="text-xs font-extrabold text-white">{chaosScenarios[selectedChaosScenario].failedNode}</div>
                <div className="text-[11px] text-slate-400">Simulating active visual node disruption across canvas topology.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-teal-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-teal-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Automated Failover Route
                  </span>
                  <span className="text-[10px] font-extrabold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
                <div className="text-xs font-extrabold text-white">{chaosScenarios[selectedChaosScenario].failoverNode}</div>
                <div className="text-[11px] text-slate-400">Visual waypoint corridors rerouting enterprise traffic with zero loss.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-purple-400 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" /> Gemini 3.6 Recovery SLA
                  </span>
                </div>
                <div className="text-xs font-bold text-teal-300">RPO: {chaosScenarios[selectedChaosScenario].rpo}</div>
                <div className="text-xs font-bold text-emerald-400">RTO: {chaosScenarios[selectedChaosScenario].rto}</div>
                <div className="text-[10px] font-extrabold text-slate-400 uppercase pt-1">
                  Status: {chaosScenarios[selectedChaosScenario].status}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. LIVE CODE SPLIT-PANE */}
        {activeTool === 'code_split' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCodeTab('terraform')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    activeCodeTab === 'terraform' ? 'bg-teal-accent text-bg-dark' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Terraform HCL
                </button>
                <button
                  onClick={() => setActiveCodeTab('k8s')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    activeCodeTab === 'k8s' ? 'bg-teal-accent text-bg-dark' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Kubernetes Helm
                </button>
                <button
                  onClick={() => setActiveCodeTab('pulumi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    activeCodeTab === 'pulumi' ? 'bg-teal-accent text-bg-dark' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Pulumi TypeScript
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Bidirectional AST Code Link: Hovering or editing code blocks highlights matching Draw.io shapes on canvas in real time.
              </p>
            </div>

            <div className="md:col-span-2 relative bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-teal-300 overflow-x-auto max-h-48">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeCodeTab === 'terraform' ? sampleTerraform : activeCodeTab === 'k8s' ? sampleK8s : samplePulumi);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied AST' : 'Copy HCL'}</span>
              </button>
              <pre>{activeCodeTab === 'terraform' ? sampleTerraform : activeCodeTab === 'k8s' ? sampleK8s : samplePulumi}</pre>
            </div>
          </div>
        )}

        {/* 3. OPEX & CARBON FOOTPRINT HEATMAP */}
        {activeTool === 'opex_heatmap' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-emerald-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Estimated Total OPEX
              </span>
              <div className="text-xl font-extrabold text-white">$1,085 / month</div>
              <div className="text-xs font-bold text-emerald-400">▼ 84% Cost Cut via Ephemeral Caching</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/40 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-teal-400 flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" /> Carbon Footprint Score
              </span>
              <div className="text-xl font-extrabold text-white">0.042 kg CO₂e / hr</div>
              <div className="text-xs font-bold text-teal-400">100% Google Cloud Carbon-Neutral Region</div>
            </div>

            <div className="md:col-span-2 p-3 rounded-xl bg-slate-950 border border-panel-border space-y-2">
              <div className="text-[10px] font-extrabold uppercase text-slate-400">
                Gemini 3.6 Pro Node Spend &amp; Carbon Breakdown
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30">
                  <div className="font-extrabold text-teal-300">Cloud Run Services</div>
                  <div className="text-white font-bold">$180 / mo</div>
                </div>
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <div className="font-extrabold text-purple-300">Vertex AI Vector Search</div>
                  <div className="text-white font-bold">$420 / mo</div>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <div className="font-extrabold text-emerald-300">Cloud SQL PostgreSQL</div>
                  <div className="text-white font-bold">$485 / mo</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. EXECUTIVE BOARDROOM PITCH NARRATOR */}
        {activeTool === 'boardroom' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase text-purple-400">
                Executive Storytelling Chapter ({boardroomStep + 1} of {boardroomSteps.length})
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBoardroomStep((prev) => (prev > 0 ? prev - 1 : boardroomSteps.length - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold cursor-pointer"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setBoardroomStep((prev) => (prev < boardroomSteps.length - 1 ? prev + 1 : 0))}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold cursor-pointer"
                >
                  Next Chapter →
                </button>
              </div>
            </div>

            <div className="md:col-span-3 p-3.5 rounded-xl bg-slate-950 border border-purple-500/40 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-extrabold text-purple-300">
                  {boardroomSteps[boardroomStep].title}
                </div>
                <div className="text-xs font-bold text-white">
                  {boardroomSteps[boardroomStep].subtitle}
                </div>
                <div className="text-xs text-slate-300">
                  {boardroomSteps[boardroomStep].desc}
                </div>
              </div>
              <div className="shrink-0 p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-extrabold text-center">
                {boardroomSteps[boardroomStep].metric}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
