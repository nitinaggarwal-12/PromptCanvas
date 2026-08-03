'use client';

import React, { useState } from 'react';
import { X, ClipboardList, Sparkles, ShieldCheck, Server, ArrowRight, Layers } from 'lucide-react';

interface UseCaseIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitUseCase: (useCaseData: {
    title: string;
    domain: string;
    description: string;
    cloudProvider: string;
    complianceTier: string;
    archType?: string;
  }) => void;
}

export function UseCaseIntakeModal({ isOpen, onClose, onSubmitUseCase }: UseCaseIntakeModalProps) {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('FinTech & Banking');
  const [cloudProvider, setCloudProvider] = useState('Google Cloud Platform (GCP)');
  const [complianceTier, setComplianceTier] = useState('SOC2 Type II + Zero-Trust Network Perimeter');
  const [deploymentTopology, setDeploymentTopology] = useState('Multi-AZ Active-Passive High Availability');
  const [description, setDescription] = useState('');
  const [targetBlueprint, setTargetBlueprint] = useState('auto');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DOMAIN_PRESETS: Record<string, {
    defaultTitle: string;
    cloud: string;
    compliance: string;
    topology: string;
    desc: string;
  }> = {
    'FinTech & Banking': {
      defaultTitle: 'Core Banking Ledger & Real-Time Fraud Synthesis Engine',
      cloud: 'Google Cloud Platform (GCP)',
      compliance: 'PCI-DSS Active-Active Financial Ledger',
      topology: 'Multi-Region Active-Active Distributed Ledger',
      desc: 'High-throughput core banking transaction ingestion -> PCI-DSS isolated Spanner ledger -> Real-time ML fraud detection -> Agentic customer dispute resolver.'
    },
    'Healthcare & Genomics': {
      defaultTitle: 'HIPAA Genomic Variant Pipeline & Clinical Agentic RAG',
      cloud: 'Google Cloud Platform (GCP)',
      compliance: 'HIPAA Compliance + KMS Envelope Encryption',
      topology: 'Multi-AZ Active-Passive High Availability',
      desc: 'HIPAA-compliant raw genomic sequence ingestion -> BigQuery Variant Store -> Cloud KMS envelope encryption -> Vertex AI Agentic RAG clinical trial matching.'
    },
    'Autonomous AI & Robotics': {
      defaultTitle: 'Fleet Telemetry Command Center & Edge Model Lifecycle',
      cloud: 'Google Cloud Platform (GCP)',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Global Edge CDN + Serverless Container Core',
      desc: 'MQTT Edge field gateways on autonomous fleet -> Cloud Pub/Sub stream ingress -> Real-time anomaly detection -> Model fine-tuning & Over-The-Air deployment.'
    },
    'E-Commerce & Retail Scale': {
      defaultTitle: 'Global Omni-Channel Recommendation & Flash-Sale Core',
      cloud: 'Amazon Web Services (AWS)',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Global Edge CDN + Serverless Container Core',
      desc: 'CloudFront Edge WAF -> EKS Microservices Commerce Cluster -> Aurora Serverless multi-region catalog -> Personalization Vector Embedding engine.'
    },
    'Enterprise SaaS & Multi-Tenant Cloud': {
      defaultTitle: 'Multi-Tenant B2B SaaS Isolation & Unified Observability Stack',
      cloud: 'Google Cloud Platform (GCP)',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Multi-AZ Active-Passive High Availability',
      desc: 'Tenant IAM RBAC ingress -> Isolated tenant database schemas -> Centralized Telemetry & Audit Log aggregator -> Master Agentic Admin Assistant.'
    },
    'Defense, Aerospace & Sovereign Cloud': {
      defaultTitle: 'Air-Gapped Sovereign Defense Intelligence & Threat Synthesis Core',
      cloud: 'Hybrid Multi-Cloud Architecture',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Air-Gapped Sovereign Enterprise Cloud',
      desc: 'Air-gapped private sovereign enclave -> Zero-trust hardware enclave verification -> Multi-sensor satellite telemetry aggregation -> Offline LLM tactical advisory.'
    },
    'Energy, Smart Grid & Climate Tech': {
      defaultTitle: 'Grid Telemetry Stream Ingestion & Renewable Load Balancing Stack',
      cloud: 'Google Cloud Platform (GCP)',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Multi-AZ Active-Passive High Availability',
      desc: 'Smart substation SCADA sensors -> Pub/Sub real-time ingress -> Apache Beam grid load balancing ETL -> Predictive battery storage dispatch model.'
    },
    'Automotive, Connected Mobility & Telematics': {
      defaultTitle: 'Connected Vehicle Telematics & V2X Autonomous Command Bus',
      cloud: 'Amazon Web Services (AWS)',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Global Edge CDN + Serverless Container Core',
      desc: 'CAN bus vehicle telematics -> AWS IoT Core ingestion -> Timestream time-series storage -> Real-time driver safety alert & predictive maintenance loop.'
    },
    'Manufacturing, Supply Chain & Logistics 4.0': {
      defaultTitle: 'Industry 4.0 Digital Twin Factory & Supply Chain Control Tower',
      cloud: 'Google Cloud Platform (GCP)',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Multi-AZ Active-Passive High Availability',
      desc: 'PLC factory floor sensors -> Edge IoT gateway -> Digital Twin 3D asset state machine -> Predictive bottleneck optimizer & ERP warehouse sync.'
    },
    'Media, Streaming & High-Throughput Content CDN': {
      defaultTitle: 'Ultra-Low Latency Live Video Processing & Generative Localization CDN',
      cloud: 'Google Cloud Platform (GCP)',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Global Edge CDN + Serverless Container Core',
      desc: 'RTMP live camera stream -> Cloud Video Intelligence transcode -> Global Edge CDN distribution -> Automated LLM multilingual subtitle & caption generation.'
    },
    'EdTech, Research & Academic AI Compute': {
      defaultTitle: 'High-Performance Research Compute Cluster & Personal AI Tutor Stack',
      cloud: 'Google Cloud Platform (GCP)',
      compliance: 'GDPR / PII Dynamic Data Masking',
      topology: 'Multi-AZ Active-Passive High Availability',
      desc: 'Student learning interaction telemetry -> Multi-agent personalized tutoring system -> Academic research knowledge graph -> Anonymized assessment store.'
    },
    'DevSecOps & Multi-Cloud': {
      defaultTitle: 'Polyrepo DevSecOps GitOps CI/CD & Automated Red-Teaming Gateway',
      cloud: 'Hybrid Multi-Cloud Architecture',
      compliance: 'SOC2 Type II + Zero-Trust Network Perimeter',
      topology: 'Multi-AZ Active-Passive High Availability',
      desc: 'GitHub polyrepo PR trigger -> SonarQube SAST & Container CVE scan -> ArgoCD GitOps deployment to GKE/EKS -> Continuous AI security red-teaming.'
    }
  };

  const handleDomainChange = (newDomain: string) => {
    setDomain(newDomain);
    const preset = DOMAIN_PRESETS[newDomain];
    if (preset) {
      if (!title || Object.values(DOMAIN_PRESETS).some(p => p.defaultTitle === title)) {
        setTitle(preset.defaultTitle);
      }
      setCloudProvider(preset.cloud);
      setComplianceTier(preset.compliance);
      setDeploymentTopology(preset.topology);
      if (!description || Object.values(DOMAIN_PRESETS).some(p => p.desc === description)) {
        setDescription(preset.desc);
      }
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitUseCase({
        title,
        domain,
        description,
        cloudProvider,
        complianceTier
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[1100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#0b101d] border border-teal-500/40 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
                <span>📋 NEW USE CASE INTAKE FORM</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">AI Architecture Synthesis</span>
              </h3>
              <p className="text-xs text-slate-400">Describe your architectural requirements to compile a tailored publication-grade Draw.io topology.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-all cursor-pointer"
            aria-label="Close Use Case Intake Form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Use Case Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              1. Architecture / Use Case Name <span className="text-teal-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Real-Time Transaction Fraud Detection Engine with AI Safety Gateway"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Grid: Industry Domain + Cloud Provider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Industry Domain</span>
              </label>
              <select
                value={domain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-100 outline-none cursor-pointer"
              >
                <option value="FinTech & Banking">FinTech &amp; Banking</option>
                <option value="Healthcare & Genomics">Healthcare &amp; Genomics</option>
                <option value="Autonomous AI & Robotics">Autonomous AI &amp; Robotics</option>
                <option value="E-Commerce & Retail Scale">E-Commerce &amp; Retail Scale</option>
                <option value="Enterprise SaaS & Multi-Tenant Cloud">Enterprise SaaS &amp; Multi-Tenant Cloud</option>
                <option value="Defense, Aerospace & Sovereign Cloud">Defense, Aerospace &amp; Sovereign Cloud</option>
                <option value="Energy, Smart Grid & Climate Tech">Energy, Smart Grid &amp; Climate Tech</option>
                <option value="Automotive, Connected Mobility & Telematics">Automotive, Connected Mobility &amp; Telematics</option>
                <option value="Manufacturing, Supply Chain & Logistics 4.0">Manufacturing, Supply Chain &amp; Logistics 4.0</option>
                <option value="Media, Streaming & High-Throughput Content CDN">Media, Streaming &amp; High-Throughput Content CDN</option>
                <option value="EdTech, Research & Academic AI Compute">EdTech, Research &amp; Academic AI Compute</option>
                <option value="DevSecOps & Multi-Cloud">DevSecOps &amp; Multi-Cloud</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>Target Cloud Infrastructure</span>
              </label>
              <select
                value={cloudProvider}
                onChange={(e) => setCloudProvider(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-100 outline-none cursor-pointer"
              >
                <option value="Google Cloud Platform (GCP)">Google Cloud Platform (GCP)</option>
                <option value="Amazon Web Services (AWS)">Amazon Web Services (AWS)</option>
                <option value="Hybrid Multi-Cloud Architecture">Hybrid Multi-Cloud Architecture</option>
              </select>
            </div>
          </div>

          {/* Grid: Deployment Topology + Compliance Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-teal-400" />
                <span>Deployment Topology</span>
              </label>
              <select
                value={deploymentTopology}
                onChange={(e) => setDeploymentTopology(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-100 outline-none cursor-pointer"
              >
                <option value="Multi-AZ Active-Passive High Availability">Multi-AZ Active-Passive High Availability</option>
                <option value="Multi-Region Active-Active Distributed Ledger">Multi-Region Active-Active Distributed Ledger</option>
                <option value="Global Edge CDN + Serverless Container Core">Global Edge CDN + Serverless Container Core</option>
                <option value="Air-Gapped Sovereign Enterprise Cloud">Air-Gapped Sovereign Enterprise Cloud</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compliance &amp; Security Mandate</span>
              </label>
              <select
                value={complianceTier}
                onChange={(e) => setComplianceTier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-100 outline-none cursor-pointer"
              >
                <option value="SOC2 Type II + Zero-Trust Network">SOC2 Type II + Zero-Trust Network Perimeter</option>
                <option value="HIPAA Compliance + KMS Envelope Encryption">HIPAA Compliance + KMS Envelope Encryption</option>
                <option value="PCI-DSS Active-Active Financial Ledger">PCI-DSS Active-Active Financial Ledger</option>
                <option value="GDPR / PII Dynamic Data Masking">GDPR / PII Dynamic Data Masking</option>
              </select>
            </div>
          </div>

          {/* Prompt Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              2. Core Workflow &amp; Components Prompt
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Ingress via Public ALB -> Safety Gateway -> MicroVM Sandbox Exec Engine -> Cloud SQL pgvector database with automated daily backup and Slack alerts."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Target Architecture Blueprint (All 25 Architecture Types) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
              <span>3. Target Publication Architecture Blueprint (25 Blueprints Available)</span>
              <span className="text-[10px] text-teal-400 font-bold">DEFAULT: AUTO-MATCH BY DOMAIN</span>
            </label>
            <select
              value={targetBlueprint}
              onChange={(e) => setTargetBlueprint(e.target.value)}
              className="w-full bg-slate-950 border border-teal-500/50 focus:border-teal-400 rounded-xl px-3 py-2.5 text-xs font-bold text-teal-300 outline-none cursor-pointer"
            >
              <option value="auto">⚡ Auto-Select Optimal Blueprint for Domain ({domain})</option>
              <optgroup label="Business Architecture Blueprints">
                <option value="conceptual_diagram">1. Conceptual Diagram</option>
                <option value="erd">2. Dimensional Data Model (ERD)</option>
                <option value="agentic_rag">3. Cognitive Architecture (Agentic RAG)</option>
                <option value="sequence_diagram">4. Micro Dynamic Sequence Diagram</option>
                <option value="macro_sequence_diagram">5. Macro Dynamic Sequence Diagram</option>
                <option value="data_ai_pipeline">6. Data &amp; AI Pipeline</option>
                <option value="secure_deployment_map">7. Secure Deployment Map</option>
                <option value="devops_cicd_pipeline">8. DevOps &amp; CI/CD Pipeline</option>
                <option value="governance_state_machine">9. Governance &amp; State Machine</option>
                <option value="unified_system_view">10. Unified System View</option>
                <option value="dark_mode_unified_system_view">11. Dark Mode Architecture</option>
                <option value="business_agent_governance_hitl">12. HITL Autonomous AI Agent Governance Lifecycle</option>
              </optgroup>
              <optgroup label="Technical &amp; Cloud Reference Architectures">
                <option value="aws_modern_data_lakehouse">13. AWS Modern Data Lakehouse Architecture</option>
                <option value="gcp_serverless_web_app">14. GCP Serverless Web Application Architecture</option>
                <option value="aws_eks_microservices_mesh">15. AWS EKS Microservices Service Mesh Architecture</option>
                <option value="gcp_realtime_streaming_pipeline">16. GCP Real-Time Streaming Analytics Pipeline</option>
                <option value="gcp_project_itacs_production">17. Google Cloud Project Production Cloud Architecture</option>
                <option value="aws_serverless_event_driven">18. AWS Serverless Event-Driven Microservices</option>
                <option value="gcp_multiregion_disaster_recovery">19. GCP Multi-Region Active-Passive Disaster Recovery</option>
                <option value="gcp_ai_cognitive_rag">20. GCP AI Cognitive Architecture (Agentic RAG)</option>
                <option value="aws_zerotrust_vpc_network">21. AWS Zero-Trust Secure VPC Network Infrastructure</option>
                <option value="gcp_industrial_iot">22. GCP Industrial IoT Telemetry Ingestion &amp; Analytics</option>
                <option value="enterprise_devsecops_polyrepo">23. Enterprise DevSecOps Polyrepo CI/CD Pipeline Architecture</option>
                <option value="eval_safety_benchmarking">24. AI Model Eval, Red-Teaming &amp; Responsible AI Safety Benchmarking</option>
                <option value="multi_agent_autonomous_orchestration">25. Multi-Agent Autonomous Orchestration Platform</option>
              </optgroup>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Cancel (View Existing Workspaces)
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-extrabold text-xs tracking-wide transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Synthesizing Architecture...' : 'Generate Architecture Diagram'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
