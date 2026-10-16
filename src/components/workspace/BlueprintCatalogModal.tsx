import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sparkles, Plus, Check, Shield, Layers, Database, Bot, Cpu, Factory, Briefcase, Activity, Lock, X } from 'lucide-react';

export interface BlueprintCatalogItem {
  id: string;
  number: number;
  name: string;
  category: 'Strategy & C4' | 'Cloud Migration' | 'Data & Lakehouse' | 'AI & Multi-Agent' | 'Security & Zero-Trust' | 'Industry 4.0';
  icon: string;
  strategicScore: string;
  whenToUse: string;
  whereToUse: string;
  personas: {
    creator: string;
    consumer: string;
  };
  bigTechStandpoint: string;
  consultingStandpoint: string;
}

export const BLUEPRINT_CATALOG_ITEMS: BlueprintCatalogItem[] = [
  {
    id: 'official_gcp_arch_center_hub_spoke',
    number: 78,
    name: 'Google Cloud Architecture Center: Official Enterprise Hub-and-Spoke Multi-Tenant & Agentic Reference Topology',
    category: 'AI & Multi-Agent',
    icon: '🏛️',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Multi-tenant enterprise AI platforms, Hub-and-Spoke VPC Service Controls perimeters, Private Service Connect (PSC), and Google ADK / A2A agent orchestration.',
    whereToUse: 'Google Cloud Architecture Center Reference Guides; CISO Zero-Trust Perimeter Review; Multi-Tenant Platform RFC.',
    personas: {
      creator: 'Principal Cloud / AI Platform Architect (Staff L7+ at Google Cloud)',
      consumer: 'CISO, VP of Cloud Platform Engineering, Enterprise AI Leads'
    },
    bigTechStandpoint: 'Official Google Cloud Architecture Center Hub-and-Spoke topology with #aecbfa Routing Hub, #ceead6 Governance Hub, #feefc3/#fad2cf Tenant Spokes, and 23/23 vertex-bound edges.',
    consultingStandpoint: 'Provides deterministic tenant isolation, CMEK cryptographic custody, and zero cross-tenant blast radius across shared and dedicated spokes.'
  },
  {
    id: 'gcp_ge_2026_upgraded_architecture',
    number: 0,
    name: '2026 Upgraded GCP & Gemini Enterprise Native Architecture (Gemini 3.8 Flash, Vector Search 2.0 & Cloud Run v2)',
    category: 'AI & Multi-Agent',
    icon: '✨',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Modernizing enterprise GenAI stacks to Gemini 3.8 Flash, Vertex AI Vector Search 2.0, AlloyDB AI, and Cloud Run v2.',
    whereToUse: 'Enterprise AI Reference Architecture; Solution Architecture Document (SAD); Executive Steering Committee.',
    personas: {
      creator: 'Principal Staff AI / Data Architect',
      consumer: 'CTO, Chief AI Officer, VP Platform Engineering'
    },
    bigTechStandpoint: 'Native Google Cloud 2026 stack combining Gemini 3.8 Flash, Model Armor, Vertex AI Vector Search 2.0, and BigQuery Lakehouse.',
    consultingStandpoint: 'Eliminates legacy third-party glue layers and reduces P99 agentic inference latency with end-to-end Google Cloud telemetry.'
  },
  {
    id: 'dataops_anomaly_detection',
    number: 35,
    name: 'Google Cloud DataOps: Autonomous Data Quality & Real-Time Anomaly Detection Pipeline',
    category: 'Data & Lakehouse',
    icon: '📊',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Real-time streaming ingestion, Dataplex automated data quality gates, BigQuery anomaly detection, and self-healing pipelines.',
    whereToUse: 'Enterprise Data Governance Charter; Lakehouse Reliability RFC; Data Engineering Runbook.',
    personas: {
      creator: 'Principal Data Architect / Staff Data Reliability Engineer',
      consumer: 'Chief Data Officer (CDO), VP Analytics, Data Platform Leads'
    },
    bigTechStandpoint: 'Pub/Sub + Dataflow streaming into BigQuery with Dataplex quality contracts, Vertex AI anomaly detection, and Quarantine DLQ routing.',
    consultingStandpoint: 'Prevents downstream BI & RAG corruption with automated SLA enforcement and zero-data-loss replay.'
  },
  {
    id: 'tech_multi_region_dr',
    number: 36,
    name: 'Google Cloud Resilience: Active-Active Multi-Region High Availability & Disaster Recovery (RPO=0)',
    category: 'Cloud Migration',
    icon: '🌐',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Mission-critical Tier-0 workloads requiring RPO=0 and sub-second RTO across dual Google Cloud regions.',
    whereToUse: 'High-Availability & DR RFC; Operational Resilience Audit; Financial / Regulated Workload Certification.',
    personas: {
      creator: 'Principal Distributed Systems & SRE Architect',
      consumer: 'CIO, Head of SRE, Enterprise Risk & Continuity Officers'
    },
    bigTechStandpoint: 'Global External Application Load Balancer with Cloud Armor, multi-region GKE Enterprise / Cloud Run, and Cloud Spanner synchronous replication.',
    consultingStandpoint: 'Provable regional failover with automated health checks and zero manual DNS intervention.'
  },
  {
    id: 'blueprint_67_cymbal_agentic_Support',
    number: 67,
    name: 'Google Cloud Brand Light 7-Layer Flowchart: Enterprise Customer Support & Order Resolution Agent',
    category: 'AI & Multi-Agent',
    icon: '🤖',
    strategicScore: '5.0 / 5.0',
    whenToUse: '7-layer operational agentic workflows with semantic decision gates, RAG grounding, Model Armor safety, and HITL escalation.',
    whereToUse: 'AI Agent Operational Flowchart; CISO & ARB Governance Review; Production Agent Readiness Dossier.',
    personas: {
      creator: 'Lead Agentic Systems Architect',
      consumer: 'VP Customer Operations, AI Platform Engineering, SecOps'
    },
    bigTechStandpoint: 'Official Google Cloud Brand Light 7-layer operational flowchart with explicit YES/NO rhombus gates, Apigee/MCP tool calls, and Cloud Trace audit.',
    consultingStandpoint: 'End-to-end operational transparency from user ingress to governed tool execution and human-in-the-loop escalation.'
  },
  {
    id: 'blueprint_71_autonomous_sre_incident',
    number: 71,
    name: 'Google Cloud Brand Light 7-Layer Flowchart: Autonomous SRE Incident Triage & Remediation Agent',
    category: 'Strategy & C4',
    icon: '⚡',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Automated production incident triage, log correlation, root-cause synthesis, and policy-gated canary rollback.',
    whereToUse: 'SRE Automation Charter; Incident Response Playbook; Platform Engineering RFC.',
    personas: {
      creator: 'Principal SRE & Autonomous Operations Architect',
      consumer: 'VP Infrastructure, SRE Leads, Platform Security'
    },
    bigTechStandpoint: 'Correlates Cloud Logging, Cloud Monitoring, and Cloud Trace signals via Gemini 3.8 Flash with Binary Authorization and HITL rollback gates.',
    consultingStandpoint: 'Compresses Mean Time to Resolution (MTTR) while enforcing strict blast-radius guardrails on production mutations.'
  },
  {
    id: 'supply_chain',
    number: 39,
    name: 'Google Cloud Industry 4.0: Smart Factory IoT & Predictive Maintenance Architecture',
    category: 'Industry 4.0',
    icon: '🏭',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'GDC Edge sensor aggregation, MQTT/OPC-UA protocols, Cloud Dataflow streaming, Bigtable time series, Vertex AI anomaly fusing, and Looker OEE Cockpit.',
    whereToUse: 'Smart Factory IoT Specification; OT/IT Convergence Blueprint; Plant Reliability & Maintenance RFC.',
    personas: {
      creator: 'Principal Industrial Solutions Architect / OT-IT Convergence Lead',
      consumer: 'VP Manufacturing Operations, Plant Managers, SRE Reliability Engineers'
    },
    bigTechStandpoint: 'GDC Edge Gateway, MQTT/OPC-UA, Cloud Dataflow Streaming, Bigtable Time Series, Vertex AI Multimodal Anomaly & Looker OEE Cockpit.',
    consultingStandpoint: 'Predicts bearing and spindle failure 14 days before breakdown while automating SAP PM work orders.'
  },
  {
    id: 'ecommerce_retail',
    number: 41,
    name: 'Google Cloud Retail Platform: OmniChannel Intelligent Commerce & Retail AI Architecture',
    category: 'Industry 4.0',
    icon: '🛍️',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Vertex AI Search & Recommendations for Retail, AlloyDB AI pgvector product discovery, Gemini 3.8 Flash agentic concierge, and multi-region Cloud Spanner cart.',
    whereToUse: 'Retail Digital Architecture Blueprint; E-Commerce Replatforming RFC; PCI-DSS Audit Package.',
    personas: {
      creator: 'Principal E-Commerce Architect / Lead Retail Systems Engineer',
      consumer: 'Chief Digital Officer, VP E-Commerce Engineering, Head of Merchandising'
    },
    bigTechStandpoint: 'Vertex AI Search & Recommendations, AlloyDB pgvector Discovery, Gemini 3.8 Flash Agentic Concierge, Multimodal Vision, Multi-Region Cloud Spanner Cart, Pub/Sub Event Bus & BigQuery Lakehouse.',
    consultingStandpoint: 'Sub-10ms visual similarity lookup, omnichannel cart sync, and real-time conversion funnel telemetry.'
  },
  {
    id: 'smart_factory_iot',
    number: 42,
    name: 'Google Cloud Industry 4.0: Smart Factory IoT & Predictive Maintenance Platform',
    category: 'Industry 4.0',
    icon: '🏭',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Industrial IoT asset telemetry, GDC Edge compute, AlloyDB Digital Twin (ISA-95), and Looker OEE Cockpit.',
    whereToUse: 'Industry 4.0 Architecture Specification; Plant Modernization Business Case; OT/IT Convergence RFC.',
    personas: {
      creator: 'Principal Industrial IoT Architect / OT-IT Convergence Lead',
      consumer: 'VP Global Manufacturing, Plant Operations Managers, Reliability Engineering Leads'
    },
    bigTechStandpoint: 'Asset Sensor Telemetry, GDC Edge Gateway, Cloud Dataflow Streaming, AlloyDB Digital Twin, Gemini 3.8 Flash Multimodal Anomaly Fuser & Looker OEE Operations Cockpit.',
    consultingStandpoint: 'Overall Equipment Effectiveness (OEE) optimization cockpit reducing scrap rates and automating SAP PM work orders.'
  },
  {
    id: 'hr_talent_ai',
    number: 43,
    name: 'Google Cloud HR & Talent Solution: WorkforceAI People Intelligence Platform',
    category: 'Industry 4.0',
    icon: '👔',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Document AI resume parsing, Cloud DLP PII blind screening, AlloyDB pgvector enterprise skills graph, and Gemini 3.8 Flash match evaluator.',
    whereToUse: 'HR Technology Strategy Roadmap; EEOC & Bias Compliance Dossier; Talent Acquisition Steering Committee.',
    personas: {
      creator: 'Principal People Analytics Architect / HR Tech Lead',
      consumer: 'Chief People Officer (CPO), VP Talent Acquisition, Legal & Compliance Counsel'
    },
    bigTechStandpoint: 'Document AI resume parser, Cloud DLP PII screening shield, AlloyDB pgvector skills graph, Gemini 3.8 Flash match evaluator, and Looker Talent Cockpit.',
    consultingStandpoint: 'Reduces time-to-hire by 65% while providing auditable Four-Fifths compliance logs for regulatory defense.'
  },
  {
    id: 'healthcare_fhir',
    number: 44,
    name: 'Google Cloud Healthcare & Life Sciences FHIR/HL7 Clinical AI Platform',
    category: 'Industry 4.0',
    icon: '🏥',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Hospital EHR interoperability (HL7v2/FHIR R4/DICOM), HIPAA BAA transit, OMOP BigQuery Lakehouse, and Gemini 3.8 Flash clinical reasoner.',
    whereToUse: 'Healthcare Interoperability RFC; HIPAA Security & Privacy Audit Package; Clinical Operations Steering Committee.',
    personas: {
      creator: 'Principal Healthcare Solutions Architect / Health Informatics Lead',
      consumer: 'Chief Medical Information Officer (CMIO), CISO Healthcare, Clinical Research Directors'
    },
    bigTechStandpoint: 'Cloud Healthcare API, BigQuery FHIR & OMOP CDM Lakehouse, Vertex AI Search for Healthcare & Medical Vision, Gemini 3.8 Flash Clinical Reasoner, and Looker Operations Cockpit.',
    consultingStandpoint: 'OMOP CDM BigQuery lakehouse accelerating clinical trial matching and reducing 30-day patient readmissions.'
  },
  {
    id: 'threat_modeling_stride',
    number: 48,
    name: 'Zero-Trust Security Threat Modeling & STRIDE Attack Vector Matrix',
    category: 'Security & Zero-Trust',
    icon: '🛡️',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Mandatory security architecture reviews before production launch; FedRAMP / SOC2 / ISO 27001 zero-trust audits.',
    whereToUse: 'Threat Modeling Document (TMD); Security Architecture Review (SAR); CISO Boardroom Defense Dossier.',
    personas: {
      creator: 'Lead Security Architect / Product Security Lead (AppSec L7+)',
      consumer: 'CISO, VP Security Operations, External Regulatory Auditors'
    },
    bigTechStandpoint: 'End-to-end STRIDE mapping from Cloud Armor WAF and Model Armor prompt filters to GKE gVisor and VPC-SC perimeter walls.',
    consultingStandpoint: 'Defensible cyber-resilience posture exhibit providing provable mitigation against all 6 STRIDE threat categories.'
  }
];

interface BlueprintCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBlueprint: (blueprintId: string, blueprintName: string) => void;
  isLight?: boolean;
}

export const BlueprintCatalogModal: React.FC<BlueprintCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectBlueprint,
  isLight = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Strategy & C4', 'Cloud Migration', 'Data & Lakehouse', 'AI & Multi-Agent', 'Security & Zero-Trust', 'Industry 4.0'];

  const filteredItems = useMemo(() => {
    return BLUEPRINT_CATALOG_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(q) ||
        item.whenToUse.toLowerCase().includes(q) ||
        item.bigTechStandpoint.toLowerCase().includes(q) ||
        item.consultingStandpoint.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`rounded-3xl max-w-7xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-5 md:p-8 space-y-6 flex flex-col transition-all cursor-default ${
        isLight
          ? 'bg-white border-2 border-amber-400/80 text-slate-900 shadow-slate-300/60'
          : 'bg-[#0b101d] border-2 border-amber-500/40 text-white'
      }`}>
        
        {/* Header Bar */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 shrink-0 border-b ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border ${
              isLight
                ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-xs'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
              <span>📐 STRATEGIC BLUEPRINT MATRIX &amp; GOVERNANCE CATALOG</span>
            </div>
            <h2 className={`text-2xl md:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Enterprise Architecture Blueprint Matrix</h2>
            <p className={`text-xs font-medium mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Select any standardized blueprint below to instantly generate and add it as a new interactive view in your project.
            </p>
          </div>
          <button
            onClick={onClose}
            className={`self-start md:self-auto px-4 py-2 rounded-xl transition-all font-bold text-xs cursor-pointer flex items-center gap-1.5 border ${
              isLight
                ? 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 border-slate-300'
                : 'bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border-slate-700'
            }`}
          >
            <X className="w-4 h-4" />
            <span>Close Table</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search blueprints by name, technology, or phase..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs focus:outline-none transition-all border ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                  : 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500/60'
              }`}
            />
          </div>
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? isLight
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-black shadow-xs'
                      : 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                    : isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className={`overflow-x-auto rounded-2xl border flex-1 ${
          isLight ? 'border-slate-200 bg-white' : 'border-slate-800 bg-[#070A13]'
        }`}>
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className={`text-xs uppercase tracking-wider border-b ${
                isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}>
                <th className="p-4 font-extrabold w-56">Architecture Blueprint</th>
                <th className="p-4 font-extrabold w-36">Action</th>
                <th className="p-4 font-extrabold w-28">Score</th>
                <th className="p-4 font-extrabold w-52">When to Use</th>
                <th className="p-4 font-extrabold w-48">Where to Use</th>
                <th className="p-4 font-extrabold w-56">Personas</th>
                <th className="p-4 font-extrabold">🚀 Big Tech (Google / Stripe)</th>
                <th className="p-4 font-extrabold">💼 Executive Value &amp; Strategy Readout</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${
              isLight ? 'divide-slate-200 text-slate-700' : 'divide-slate-800/80 text-slate-300'
            }`}>
              {filteredItems.map((item) => (
                <tr key={item.id} className={`transition-colors group ${
                  isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/40'
                }`}>
                  <td className="p-4 align-top">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{item.icon}</span>
                      <span className={`font-mono font-bold text-[11px] ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>#{item.number}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                        isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <div className={`font-bold text-xs leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {item.name}
                    </div>
                  </td>

                  <td className="p-4 align-top">
                    <button
                      onClick={() => onSelectBlueprint(item.id, item.name)}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs transition-all shadow-md hover:scale-[1.03] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>➕ Add View</span>
                    </button>
                  </td>

                  <td className="p-4 align-top">
                    <div className={`font-black text-xs whitespace-nowrap ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
                      ★★★★★
                    </div>
                    <div className={`font-mono text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {item.strategicScore}
                    </div>
                  </td>

                  <td className={`p-4 align-top leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {item.whenToUse}
                  </td>

                  <td className={`p-4 align-top leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {item.whereToUse}
                  </td>

                  <td className={`p-4 align-top leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <div><strong className={isLight ? 'text-slate-900 font-bold' : 'text-white font-bold'}>Creator:</strong> {item.personas.creator}</div>
                    <div className="mt-1.5"><strong className={isLight ? 'text-slate-900 font-bold' : 'text-white font-bold'}>Consumer:</strong> {item.personas.consumer}</div>
                  </td>

                  <td className={`p-4 align-top leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {item.bigTechStandpoint}
                  </td>

                  <td className={`p-4 align-top leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {item.consultingStandpoint}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className={`flex items-center justify-between text-xs border-t pt-3 shrink-0 ${
          isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'
        }`}>
          <span>Showing {filteredItems.length} of {BLUEPRINT_CATALOG_ITEMS.length} standardized blueprints</span>
          <span className={`font-semibold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>⚡ All blueprints pre-engineered with zero 2D line collisions</span>
        </div>

      </div>
    </div>
  );
};
