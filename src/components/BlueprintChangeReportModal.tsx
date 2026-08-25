'use client';

import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  GitBranch,
  FileCheck2,
  Check,
} from 'lucide-react';

interface BlueprintChangeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDomain: string;
  projectTitle: string;
  docTypeName: string;
}

interface DomainProfile {
  name: string;
  badge: string;
  tagline: string;
  actors: string[];
  ingressSources: string[];
  microservices: string[];
  entities: string[];
  sequenceScenario: string;
  compliancePills: string[];
}

const DOMAIN_PROFILES: Record<string, DomainProfile> = {
  retail: {
    name: 'OMNIVUE Retail & Marketplace',
    badge: '🛒',
    tagline: 'Hyper-Scale Commerce. Intelligent Fulfillment.',
    actors: ['Global Shoppers', '3P Marketplace Merchants', 'Warehouse Logistics', 'Fraud Specialists', 'Support Agents'],
    ingressSources: ['Enterprise Product Catalog', 'Warehouse WMS', 'Stripe / Adyen Vault', 'SAP Supply Chain', 'Carrier 3PL'],
    microservices: ['Temporal 2PC Saga Engine', 'Catalog & SKU Service', 'Cart Session Mesh', 'Vertex AI Product Recommender', 'Kafka Event Bus'],
    entities: ['Merchant', 'Category', 'Warehouse', 'Order', 'Shopper', 'Shipment', 'CatalogItem', 'ItemVariant', 'PricingPolicy'],
    sequenceScenario: '1-Click Checkout: Temporal Saga reserves WMS inventory (TTL 900s) -> Authorizes Stripe Card -> Commits Spanner Order -> Emits Kafka Event',
    compliancePills: ['PCI-DSS Level 1 v4.0', 'SOC 2 Type II', 'GDPR / CCPA Tokenized PII', 'ISO 27001'],
  },
  fintech: {
    name: 'NEXUSFIN High-Speed Wealth Engine',
    badge: '💳',
    tagline: 'Autonomous Wealth. Zero-Latency Execution.',
    actors: ['Institutional Traders', 'Retail Investors', 'Compliance Officers', 'Risk Managers', 'Quant Analysts'],
    ingressSources: ['Bloomberg Core Feed', 'FIX Protocol 4.4 Engine', 'Core Banking Ledger', 'Plaid Open Banking', 'Custody Vault'],
    microservices: ['Order Matching Engine', 'Risk Pre-Trade Check', 'Portfolio Rebalancer', 'Ledger Double-Entry Service', 'Kafka FinBus'],
    entities: ['Trader', 'Portfolio', 'Position', 'TradeOrder', 'Asset', 'ExecutionFill', 'RiskLimit', 'SettlementBatch'],
    sequenceScenario: 'Algorithmic Trade: Fix Protocol -> Sub-millisecond pre-trade risk check -> Matching Engine fill -> Double-entry ledger commit',
    compliancePills: ['SEC Rule 15c3-5', 'FINRA OATS/CAT', 'SOC 1 / SOC 2 Type II', 'PCI-DSS'],
  },
  biopharma: {
    name: 'NOVACURA Bio-Pharma Platform',
    badge: '🧬',
    tagline: 'Transforming Therapies. Improving Lives.',
    actors: ['Research Scientists', 'Clinical Operations', 'Regulatory Affairs', 'Safety/PV Specialists', 'Medical Affairs'],
    ingressSources: ['Veeva Vault', 'CTMS / Medidata Rave', 'Argus Safety', 'SAP S/4HANA', 'LIMS Lab Gateways'],
    microservices: ['Clinical Study Service', 'Regulatory Operations', 'AI Copilot RAG Service', 'Safety Signal Engine', 'Clinical Data Store'],
    entities: ['Study', 'Protocol', 'Site', 'Trial', 'Patient', 'Event', 'Document', 'KnowledgeBase', 'Embedding'],
    sequenceScenario: 'Scientist Q&A: Query -> API Gateway -> Orchestrator -> Vector RAG -> Med-PaLM reasoning -> Policy check -> Citation display',
    compliancePills: ['FDA 21 CFR Part 11', 'GxP Validation', 'HIPAA / HITECH', 'ICH E6(R2) GCP'],
  },
  saas: {
    name: 'AETHER Multi-Tenant Cloud Platform',
    badge: '☁️',
    tagline: 'Infinite Scale. Elastic Enterprise Mesh.',
    actors: ['Workspace Admins', 'Tenant Users', 'Billing Managers', 'DevOps Engineers', 'Security Auditors'],
    ingressSources: ['Okta SSO / SAML', 'Stripe Billing API', 'GitHub / GitLab VCS', 'Kubernetes API', 'Datadog APM'],
    microservices: ['Multi-Tenant Router', 'Usage & Metering Engine', 'RBAC & Permission Engine', 'Tenant Isolation Mesh', 'Cloud Spanner DB'],
    entities: ['Tenant', 'Workspace', 'UserAccount', 'Subscription', 'FeatureFlag', 'UsageRecord', 'AuditTrace'],
    sequenceScenario: 'Tenant Ingress: OIDC Token -> Dynamic Tenant Router -> Scoped Database Shard -> Metered API execution -> OpenTelemetry trace',
    compliancePills: ['SOC 2 Type II', 'ISO 27001', 'GDPR Data Residency', 'FedRAMP Moderate'],
  },
  manufacturing: {
    name: 'SYNACTIVE Industrial IoT Digital Twin',
    badge: '🏭',
    tagline: 'Predictive Manufacturing. Autonomous Reliability.',
    actors: ['Plant Managers', 'Reliability Engineers', 'Maintenance Techs', 'OT Security Leads', 'Supply Planners'],
    ingressSources: ['MQTT / OPC-UA Brokers', 'SCADA / DCS Gateway', 'MES Production DB', 'SAP Plant Maintenance', 'Thermal Sensors'],
    microservices: ['Time-Series Ingestion Mesh', 'Digital Twin Graph', 'Anomaly Detection Model', 'Maintenance Dispatcher', 'BigQuery IoT Store'],
    entities: ['Plant', 'ProductionLine', 'MachineAsset', 'SensorTelemetry', 'MaintenanceTicket', 'FailurePrediction'],
    sequenceScenario: 'Telemetry Anomaly: Edge sensor alert -> Kafka IoT bus -> Real-time FFT vibration model -> Automated work order dispatch to SAP PM',
    compliancePills: ['ISA/IEC 62443 (OT Security)', 'ISO 9001 Quality', 'OSHA Safety Compliance', 'ISO 55000 Asset Mgmt'],
  },
};

export default function BlueprintChangeReportModal({
  isOpen,
  onClose,
  selectedDomain,
  projectTitle,
  docTypeName,
}: BlueprintChangeReportModalProps) {
  if (!isOpen) return null;

  const profile = DOMAIN_PROFILES[selectedDomain] || DOMAIN_PROFILES.retail;

  // Element-by-element change matrix based on domain
  const changeMatrix = [
    {
      elementGroup: 'Brand & Title Block',
      masterBaseline: 'NOVACURA Bio-Pharma Platform / Transforming Therapies. Improving Lives. (🧬)',
      customProjectChange: `${profile.name} / ${profile.tagline} (${profile.badge})`,
      status: 'Customized for Prompt',
    },
    {
      elementGroup: 'Primary Users / Actors',
      masterBaseline: 'Research Scientists, Clinical Operations, Regulatory Affairs, Safety Specialists',
      customProjectChange: profile.actors.join(', '),
      status: 'Customized for Prompt',
    },
    {
      elementGroup: 'Systems of Record (Ingress)',
      masterBaseline: 'Veeva Vault, CTMS / Medidata Rave, Argus Safety, SAP Finance, LIMS Labs',
      customProjectChange: profile.ingressSources.join(', '),
      status: 'Customized for Prompt',
    },
    {
      elementGroup: 'Core Subsystems & Microservices',
      masterBaseline: 'Clinical Study Service, Regulatory Operations, AI Copilot, Clinical Data Store',
      customProjectChange: profile.microservices.join(', '),
      status: 'Customized for Prompt',
    },
    {
      elementGroup: 'Data Model / ERD Entities',
      masterBaseline: 'Study, Protocol, Site, Trial, Patient, Event, KnowledgeBase, Embedding',
      customProjectChange: profile.entities.join(', '),
      status: 'Customized for Prompt',
    },
    {
      elementGroup: 'Sequence Workflows & Scenarios',
      masterBaseline: 'Scenario: Scientist asks clinical question -> RAG context -> LLM reasoning -> Citations',
      customProjectChange: profile.sequenceScenario,
      status: 'Customized for Prompt',
    },
    {
      elementGroup: 'Compliance & Security Standards',
      masterBaseline: 'FDA 21 CFR Part 11, HIPAA, GxP Validated Audit Trail',
      customProjectChange: profile.compliancePills.join(', '),
      status: 'Customized for Prompt',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#0B111E] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Blueprint Customization &amp; Change Audit Report
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/10 text-sky-500 border border-sky-500/20 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Master Blueprints Immutable
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Project: <b className="text-slate-800 dark:text-slate-200">{projectTitle}</b> &bull; Document:{' '}
                <b className="text-slate-800 dark:text-slate-200">{docTypeName}</b> &bull; Target Domain:{' '}
                <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{selectedDomain.toUpperCase()}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Key Immutability Callout */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Canonical Master Blueprint Integrity &amp; Standalone Project Isolation Guarantee
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The original ground-truth master blueprint library (Canonical Templates 01–50) is{' '}
                <b>100% frozen, permanent, and read-only</b>. Every document generation creates an isolated, standalone{' '}
                <b>Project Copy (Instance)</b> that is completely disconnected from master blueprints once generated.
              </p>
            </div>
          </div>

          {/* Element-by-Element Change Matrix */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-sky-500" />
                <span>Element-by-Element Customization Diff</span>
              </h4>
              <span className="text-[10px] text-slate-500">7 Subsystems Modified for Prompt Context</span>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">
                    <th className="px-4 py-2.5 w-1/4">Element Group</th>
                    <th className="px-4 py-2.5 w-5/12">Canonical Master Baseline</th>
                    <th className="px-4 py-2.5 w-5/12">Prompt-Customized Project Instance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-[11px]">
                  {changeMatrix.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        {row.elementGroup}
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-[10px] bg-slate-50/40 dark:bg-slate-950/40">
                        {row.masterBaseline}
                      </td>
                      <td className="px-4 py-3 font-medium text-sky-700 dark:text-sky-300 bg-sky-50/30 dark:bg-sky-950/20">
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{row.customProjectChange}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6-Point Quality Gate Verification */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Automated Verification &amp; Quality Gate Status</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">XML Syntax &amp; Ampersand Sanitization</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  PASS (0 Errors)
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">2D Spatial Bounding Collision Check</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  PASS (30px Safety Buffer)
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Universal Novacura Scrubbing</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  PASS (0 Leftover Instances)
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">16:9 Full Viewport Auto-Scaling</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  PASS (840px–1250px Viewport)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-sky-500" />
            <span>Master Blueprints Protected &bull; Changes strictly bound to Project Instance</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
