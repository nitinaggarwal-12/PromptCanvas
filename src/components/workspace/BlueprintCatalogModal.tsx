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
    id: 'c4_component_lld',
    number: 11,
    name: 'C4 Enterprise System Context & Container Model (L1, L2 & L3 LLD)',
    category: 'Strategy & C4',
    icon: '🧩',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Phase 0–1 Greenfield RFC before writing backend service code; Growth & Scale during Kubernetes/Istio service mesh adoption.',
    whereToUse: 'Technical Design Document (TDD / RFC) Section 2; SOC2 Type II Audit Dossier; C-Suite Boardroom Review Deck Slide 3.',
    personas: {
      creator: 'Principal Staff Cloud / Security Architect (Staff L7+ at Google)',
      consumer: 'CISO, VP of Engineering, External SOC2 Security Auditors'
    },
    bigTechStandpoint: 'Mandatory inside every Architectural RFC before design freeze. Enforces BeyondCorp IAP and GCP Private Service Connect zero-trust boundaries.',
    consultingStandpoint: 'Boardroom Baseline comparing "As-Is Monolith" vs "To-Be Cloud Native". Accelerates Application Portfolio Rationalization (APM) in 60 minutes.'
  },
  {
    id: 'modern_data_stack',
    number: 12,
    name: 'Modern Data Stack Architecture Blueprint (CDC, Medallion & Reverse ETL)',
    category: 'Data & Lakehouse',
    icon: '📊',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Series B+ Data Modernization when SQL analytics databases stall; AI & RAG feature store monetization.',
    whereToUse: 'Enterprise Data Strategy & Governance Charter; Solution Architecture Document (SAD); Steering Committee Deck.',
    personas: {
      creator: 'Principal Staff Data Architect / Analytics Engineer',
      consumer: 'Chief Data Officer (CDO), VP BI, VP Revenue Ops, AI Leads'
    },
    bigTechStandpoint: 'Real-time CDC WAL events feeding BigQuery & Vertex AI Feature Store with Soda.io/Great Expectations data contracts.',
    consultingStandpoint: 'Medallion Lakehouse Zones (Bronze Raw, Silver Cleansed, Gold Boardroom) delivering immediate top-line ROI via Reverse ETL.'
  },
  {
    id: 'event_driven_architecture',
    number: 13,
    name: 'Enterprise Event-Driven Microservices Architecture (EDA Blueprint)',
    category: 'Strategy & C4',
    icon: '⚡',
    strategicScore: '4.9 / 5.0',
    whenToUse: 'High-concurrency scale-out during peak traffic spikes; Multi-region asynchronous resilience and DLQ replay.',
    whereToUse: 'High-Availability & Reliability RFC; Disaster Recovery (DR) & Chaos Runbook; Fintech Payment Whitepaper.',
    personas: {
      creator: 'Principal Distributed Systems Architect / Event-Driven Architect',
      consumer: 'CTO, Head of SRE & Reliability Engineering, Chief Risk Officer'
    },
    bigTechStandpoint: 'Non-blocking concurrency decoupling payment settlement from heavy downstream consumers with Transactional Outbox pattern.',
    consultingStandpoint: 'Digital Core Banking PCI-DSS compliance with sub-12ms Complex Event Processing (CEP) fraud engine.'
  },
  {
    id: 'enterprise_agent_runtime',
    number: 19,
    name: 'Enterprise Multi-Agent Cognitive Runtime Architecture',
    category: 'AI & Multi-Agent',
    icon: '🤖',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Complex multi-step reasoning systems where single LLM prompts hallucinate; Orchestrating specialized sub-agents with MCP tool buses.',
    whereToUse: 'Enterprise GenAI Architecture Roadmap; C-Suite AI Steering Committee; Security Review Board Dossier.',
    personas: {
      creator: 'Principal AI Systems Architect / Chief AI Officer',
      consumer: 'CTO, Head of Enterprise AI, SecOps & Compliance Directors'
    },
    bigTechStandpoint: 'Sub-100ms Gemini inference with Model Armor prompt sanitization, ScaNN vector memory, and Redis session state.',
    consultingStandpoint: 'High-ROI agentic automation engine replacing manual business ops with auditable multi-agent task dispatch.'
  },
  {
    id: 'ai_agent_approval_workflow',
    number: 23,
    name: 'Production AI Agent Enterprise Approval Workflow & ARB Gate',
    category: 'AI & Multi-Agent',
    icon: '⚖️',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Deploying high-stakes autonomous AI agents in regulated enterprises requiring human-in-the-loop (HITL) and CISO governance sign-off.',
    whereToUse: 'AI Safety & Governance RFC; CISO Architecture Review Board (ARB) Protocol; Regulatory Compliance Dossier.',
    personas: {
      creator: 'Lead AI Governance Architect / CISO Staff Engineer',
      consumer: 'Architecture Review Board (ARB), Enterprise Risk Committee, Internal Auditors'
    },
    bigTechStandpoint: 'Automated CI/CD benchmark gates (Score ≥95%, Toxicity <0.01%) with KMS Binary Auth cryptographic provenance.',
    consultingStandpoint: 'Full audit defense dossier with automated quarantine loops and C-Suite executive sign-off trails.'
  },
  {
    id: 'six_rs_migration',
    number: 29,
    name: 'AWS/GCP 6Rs Cloud Migration & Workload Portfolio Rationalization',
    category: 'Cloud Migration',
    icon: '☁️',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Multi-million dollar datacenter exit, cloud migration program, or application portfolio rationalization.',
    whereToUse: 'Executive Cloud Transformation Charter; Migration WBS Plan; CIO Steering Committee Presentation.',
    personas: {
      creator: 'Lead Cloud Migration Architect / Enterprise Transformation Lead',
      consumer: 'CIO, VP Infrastructure, FinOps Director, Application Owners'
    },
    bigTechStandpoint: 'Automated Discovery & Assessment mapping workloads directly to Rehost, Replatform, Refactor, Repurchase, Retain, or Retire tracks.',
    consultingStandpoint: 'Billable Transformation anchor establishing wave-based migration velocity and 3-year TCO cost reduction.'
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
    whenToUse: 'Vertex AI Search & Recommendations for Retail, AlloyDB AI pgvector product discovery, Gemini 3.7 agentic concierge, and multi-region Cloud Spanner cart.',
    whereToUse: 'Retail Digital Architecture Blueprint; E-Commerce Replatforming RFC; PCI-DSS Audit Package.',
    personas: {
      creator: 'Principal E-Commerce Architect / Lead Retail Systems Engineer',
      consumer: 'Chief Digital Officer, VP E-Commerce Engineering, Head of Merchandising'
    },
    bigTechStandpoint: 'Vertex AI Search & Recommendations, AlloyDB pgvector Discovery, Gemini 3.7 Agentic Concierge, Multimodal Vision, Multi-Region Cloud Spanner Cart, Pub/Sub Event Bus & BigQuery Lakehouse.',
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
    bigTechStandpoint: 'Asset Sensor Telemetry, GDC Edge Gateway, Cloud Dataflow Streaming, AlloyDB Digital Twin, Gemini 3.7 Multimodal Anomaly Fuser & Looker OEE Operations Cockpit.',
    consultingStandpoint: 'Overall Equipment Effectiveness (OEE) optimization cockpit reducing scrap rates and automating SAP PM work orders.'
  },
  {
    id: 'hr_talent_ai',
    number: 43,
    name: 'Google Cloud HR & Talent Solution: WorkforceAI People Intelligence Platform',
    category: 'Industry 4.0',
    icon: '👔',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Document AI resume parsing, Cloud DLP PII blind screening, AlloyDB pgvector enterprise skills graph, and Gemini 3.7 match evaluator.',
    whereToUse: 'HR Technology Strategy Roadmap; EEOC & Bias Compliance Dossier; Talent Acquisition Steering Committee.',
    personas: {
      creator: 'Principal People Analytics Architect / HR Tech Lead',
      consumer: 'Chief People Officer (CPO), VP Talent Acquisition, Legal & Compliance Counsel'
    },
    bigTechStandpoint: 'Document AI resume parser, Cloud DLP PII screening shield, AlloyDB pgvector skills graph, Gemini 3.7 match evaluator, and Looker Talent Cockpit.',
    consultingStandpoint: 'Reduces time-to-hire by 65% while providing auditable Four-Fifths compliance logs for regulatory defense.'
  },
  {
    id: 'healthcare_fhir',
    number: 44,
    name: 'Google Cloud Healthcare & Life Sciences FHIR/HL7 Clinical AI Platform',
    category: 'Industry 4.0',
    icon: '🏥',
    strategicScore: '5.0 / 5.0',
    whenToUse: 'Hospital EHR interoperability (HL7v2/FHIR R4/DICOM), HIPAA BAA transit, OMOP BigQuery Lakehouse, and Gemini 3.7 Flash clinical reasoner.',
    whereToUse: 'Healthcare Interoperability RFC; HIPAA Security & Privacy Audit Package; Clinical Operations Steering Committee.',
    personas: {
      creator: 'Principal Healthcare Solutions Architect / Health Informatics Lead',
      consumer: 'Chief Medical Information Officer (CMIO), CISO Healthcare, Clinical Research Directors'
    },
    bigTechStandpoint: 'Cloud Healthcare API, BigQuery FHIR & OMOP CDM Lakehouse, Vertex AI Search for Healthcare & Medical Vision, Gemini 3.7 Clinical Reasoner, and Looker Operations Cockpit.',
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
                <th className="p-4 font-extrabold">💼 Management Consulting (McKinsey)</th>
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
