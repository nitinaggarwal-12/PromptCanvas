export type ArchetypeId =
  | 'brd'
  | 'prd'
  | 'sdd'
  | 'tdd'
  | 'ai_system_card'
  | 'threat_model'
  | 'security_package'
  | 'sre_resilience';

export type ProvenanceClass = 'derived' | 'inferred' | 'human';

export interface BlueprintSlot {
  slotTitle: string;
  chapterNumber: number;
  recommendedTemplateId: string;
  description: string;
}

export interface DocSectionSpec {
  id: string;
  title: string;
  provenance: ProvenanceClass;
  mapper?: string;
  inferPrompt?: string;
  guidance?: string;
}

export interface DocArchetype {
  id: ArchetypeId;
  docCode: string;
  name: string;
  description: string;
  diagramTypes: string[];
  sections: DocSectionSpec[];
}

export interface DocArchetypeMeta {
  id: ArchetypeId;
  docCode: string;
  name: string;
  shortName: string;
  badge: string;
  badgeColor: string;
  audience: string;
  primaryPurpose: string;
  absorbedDocs: string[];
  mergedTopics: string[];
  consolidatedBlueprintIds: string;
  blueprintPack: BlueprintSlot[];
  sectionsCount: number;
}

export const PURGED_ABSORBED_ARCHETYPE_IDS = [
  'fdd',
  'exec_brief',
  'api_spec',
  'workshop',
  'interview_defense',
  'cloud_migration',
  'vendor_rfp',
  'cloud_finops',
  'golive_runbook',
] as const;

export const ABSORBED_TO_SURVIVING_ARCHETYPE_MAP: Record<string, ArchetypeId> = {
  fdd: 'prd',
  exec_brief: 'brd',
  api_spec: 'tdd',
  workshop: 'brd',
  interview_defense: 'sdd',
  cloud_migration: 'sdd',
  vendor_rfp: 'brd',
  cloud_finops: 'brd',
  golive_runbook: 'sre_resilience',
};

/**
 * The "Lean 8" Pharma Regulatory Rigor Master Consolidation & Blueprint Mapping Registry.
 * Consolidates 17 legacy document archetypes into 8 zero-redundancy, GxP/FDA 21 CFR Part 11
 * inspection-ready enterprise documents with 100% deduplicated canonical blueprint coverage.
 */
export const DOC_ARCHETYPES_META: DocArchetypeMeta[] = [
  {
    id: 'brd',
    docCode: 'DOC 01',
    name: 'Business Requirements & FinOps Strategy (BRD)',
    shortName: 'DOC 01 • BRD',
    badge: 'Business Case, Governance & FinOps',
    badgeColor: 'from-amber-500/20 to-orange-500/20 text-amber-700 border-amber-500/30',
    audience: 'C-Suite, Executive Sponsors, CFO, Procurement, ARB',
    primaryPurpose:
      'Unified executive business case combining C-Suite strategic pillars, As-Is vs. To-Be clinical transformation, ROI realization formulas, vendor fit-gap evaluation, 3-year Cloud FinOps unit economics, risk-based autonomy gates, and the 30-60-90 day pilot roadmap.',
    absorbedDocs: [
      'DOC 06 (EAB)',
      'DOC 10 (Workshop)',
      'DOC 14 (RFP - Business)',
      'DOC 15 (FinOps - ROI)',
    ],
    mergedTopics: [
      'C-Suite Strategic Pillars & 30-60-90 Day Roadmap',
      '3-Year TCO, Unit Economics & Cloud Spend Allocation',
      'Vendor Fit-Gap & Capability Prioritization',
    ],
    consolidatedBlueprintIds: '#01, #04, #05, #26 (Base) + Absorbed: #30, #32, #33',
    blueprintPack: [
      {
        slotTitle: 'Executive Summary & Strategic Pillars',
        chapterNumber: 1,
        recommendedTemplateId: '01',
        description: 'Overall clinical & enterprise system boundaries, external partners, and C-Suite strategic pillars.',
      },
      {
        slotTitle: 'As-Is Clinical Pain Points vs. To-Be Target State',
        chapterNumber: 2,
        recommendedTemplateId: '05',
        description: 'Current manual regulatory/clinical silos vs. governed multi-agent cloud target state.',
      },
      {
        slotTitle: 'Value Stream & ROI Realization Formulas',
        chapterNumber: 3,
        recommendedTemplateId: '04',
        description: 'Enterprise capability mapping, cycle-time compression, and audited ROI realization streams.',
      },
      {
        slotTitle: 'Vendor Fit-Gap & Build-vs-Buy Evaluation',
        chapterNumber: 4,
        recommendedTemplateId: '33',
        description: 'Weighted evaluation scorecard across GxP compliance, scale, data sovereignty, and velocity.',
      },
      {
        slotTitle: '3-Year TCO & Cloud FinOps Unit Economics',
        chapterNumber: 5,
        recommendedTemplateId: '30',
        description: '3-year licensing, compute, token cost attribution, and Cloud FinOps spend flow mesh.',
      },
      {
        slotTitle: 'Risk-Based Autonomy & Governance Approval Gates',
        chapterNumber: 6,
        recommendedTemplateId: '26',
        description: 'Pharmacovigilance safety screening, dual-custody HITL gates, andARB stage-gate governance.',
      },
      {
        slotTitle: 'Phased 30-60-90 Day Pilot & Capital Roadmap',
        chapterNumber: 7,
        recommendedTemplateId: '32',
        description: 'Milestone wave timeline, capital allocation tranches, and production go-live gates.',
      },
    ],
    sectionsCount: 7,
  },
  {
    id: 'prd',
    docCode: 'DOC 02',
    name: 'Product & Functional Requirements Document (PRD / URS)',
    shortName: 'DOC 02 • PRD',
    badge: 'Product, UX & GxP User Requirements',
    badgeColor: 'from-sky-500/20 to-blue-500/20 text-sky-700 border-sky-500/30',
    audience: 'Product Managers, Clinical UX, QA Validation Teams',
    primaryPurpose:
      'Unified GxP User & Functional Requirements Specification (PRD / URS) covering product scope, MVP vs. Phase 2 prioritization grid, multi-actor clinical swimlanes, clinician copilot UX journeys, domain lifecycle state machines, and 21 CFR Part 11 e-signature controls.',
    absorbedDocs: [
      'DOC 04 (FDD - Functional)',
      'DOC 10 (Workshop - Scope)',
    ],
    mergedTopics: [
      'Multi-Actor Clinical Swimlanes & UX Journeys',
      'Human Review Workbench & 21 CFR Part 11 E-Signatures',
      'MVP vs. Phase 2 Prioritization Grid',
    ],
    consolidatedBlueprintIds: '#01, #02, #12, #23 (Base) + Absorbed: #03, #26',
    blueprintPack: [
      {
        slotTitle: 'Product Scope, Personas & System Boundary',
        chapterNumber: 1,
        recommendedTemplateId: '01',
        description: 'Product ecosystem, clinical/regulatory personas, and external GxP system touchpoints.',
      },
      {
        slotTitle: 'Core Functional Capability Taxonomy & MVP Grid',
        chapterNumber: 2,
        recommendedTemplateId: '02',
        description: 'Feature hierarchy, functional capability pods, and MVP vs. Phase 2 prioritization grid.',
      },
      {
        slotTitle: 'Multi-Actor Clinical Workflows & Swimlanes',
        chapterNumber: 3,
        recommendedTemplateId: '03',
        description: 'Cross-functional clinical, medical affairs, and QA swimlanes with deterministic hand-offs.',
      },
      {
        slotTitle: 'UX Interaction & Clinician Copilot Journey',
        chapterNumber: 4,
        recommendedTemplateId: '23',
        description: 'End-to-end clinician copilot UX journeys and multi-agent cognitive reasoning loops.',
      },
      {
        slotTitle: 'Domain Object Lifecycle & State Machine Gates',
        chapterNumber: 5,
        recommendedTemplateId: '12',
        description: 'GxP document/record lifecycle states, transition invariants, and quarantine triggers.',
      },
      {
        slotTitle: 'Human Review Workbench & 21 CFR Part 11 E-Signature Controls',
        chapterNumber: 6,
        recommendedTemplateId: '26',
        description: 'Dual-custody human review queues, cryptographic audit stamps, and FDA 21 CFR Part 11 e-signatures.',
      },
    ],
    sectionsCount: 7,
  },
  {
    id: 'sdd',
    docCode: 'DOC 03',
    name: 'System Design Document (SDD - High-Level Architecture)',
    shortName: 'DOC 03 • SDD (HLD)',
    badge: 'High-Level Architecture, ADRs & Scale Math',
    badgeColor: 'from-indigo-500/20 to-purple-500/20 text-indigo-700 border-indigo-500/30',
    audience: 'Principal Architects, Cloud Engineers, ARB Panel',
    primaryPurpose:
      'High-level architecture specification uniting back-of-the-envelope scale math (QPS/Storage), CAP theorem trade-offs, formal ADRs, multi-tier C4 container topology, CUD/Spot compute sizing, zero-trust VPC-SC perimeter, cognitive model routing, multi-region DR, and 6-R CDC migration.',
    absorbedDocs: [
      'DOC 11 (Interview Defense)',
      'DOC 12 (6-R Migration)',
      'DOC 14 (RFP - ADRs)',
      'DOC 15 (FinOps - Infra)',
    ],
    mergedTopics: [
      'Scale Math (QPS/Storage) & CAP Theorem Trade-Offs',
      'Formal Architecture Decision Records (ADRs)',
      'CUD/Spot Compute Sizing & Waste Reclamation',
      'Optional Appendix: 6-R Migration & CDC Sync',
    ],
    consolidatedBlueprintIds: '#08, #15, #16, #19, #23 (Base) + Absorbed: #13, #22, #31, #33',
    blueprintPack: [
      {
        slotTitle: 'Architecture Decision Records (ADRs) & Selection Trees',
        chapterNumber: 2,
        recommendedTemplateId: '13',
        description: 'Formal ADR decision trees, CAP theorem consistency trade-offs, and technology selection rationale.',
      },
      {
        slotTitle: 'Multi-Tier Subsystem & Decoupled Container Topology',
        chapterNumber: 3,
        recommendedTemplateId: '08',
        description: '7-layer C4 container architecture, Hub-and-Spoke routing, and microservice boundaries.',
      },
      {
        slotTitle: 'Cloud Compute, GPU Sizing & FinOps Allocation',
        chapterNumber: 4,
        recommendedTemplateId: '16',
        description: 'GKE Autopilot/Cloud Run compute sizing, GPU node pools, CUD commitments, and tiered storage.',
      },
      {
        slotTitle: 'FinOps Waste Reclamation & Spot Optimization Matrix',
        chapterNumber: 4,
        recommendedTemplateId: '33',
        description: 'Idle cluster reclamation policies, Spot instance mix, and semantic KV-cache cost controls.',
      },
      {
        slotTitle: 'Zero-Trust Network Perimeter & VPC Infrastructure',
        chapterNumber: 5,
        recommendedTemplateId: '15',
        description: 'Cloud Armor WAF, IAP, VPC Service Controls (VPC-SC), and Private Service Connect (PSC).',
      },
      {
        slotTitle: 'Cognitive Runtime & Model Gateway Routing',
        chapterNumber: 6,
        recommendedTemplateId: '23',
        description: 'Multi-agent orchestrator runtime, Vertex AI Model Gateway routing, and fallback policies.',
      },
      {
        slotTitle: 'High-Availability & Multi-Region DR Strategy',
        chapterNumber: 7,
        recommendedTemplateId: '19',
        description: 'Active-Active multi-region failover, RTO < 15m, RPO = 0 synchronous Spanner replication.',
      },
      {
        slotTitle: 'Legacy 6-R Cloud Migration Wave & CDC Sync',
        chapterNumber: 8,
        recommendedTemplateId: '22',
        description: 'Conditional Appendix: Strangler-fig proxy, Datastream dual-write CDC, and 6-R wave cutover.',
      },
      {
        slotTitle: 'Enterprise Subsystem & Database Dependency Mesh',
        chapterNumber: 8,
        recommendedTemplateId: '31',
        description: 'Conditional Appendix: Cross-service coupling, shared legacy schemas, and migration wave order.',
      },
    ],
    sectionsCount: 8,
  },
  {
    id: 'tdd',
    docCode: 'DOC 05',
    name: 'Technical Design & API Specification (TDD - Low-Level Engineering)',
    shortName: 'DOC 05 • TDD (LLD)',
    badge: 'Low-Level Engineering, APIs & Schemas',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-700 border-cyan-500/30',
    audience: 'Backend Engineers, API Developers, DBAs, DevOps',
    primaryPurpose:
      'Low-level engineering and API specification combining enterprise REST/gRPC/GraphQL gateway routing, rate limits, micro-level webhook/service sequences, logical/physical/JSON schema ERDs, distributed saga outbox transactions, circuit breakers, and 22-stage CI/CD quality gates.',
    absorbedDocs: [
      'DOC 04 (FDD - Data/Seq)',
      'DOC 08 (API Spec)',
    ],
    mergedTopics: [
      'REST/gRPC/GraphQL Gateway Routing & Rate Limits',
      'End-to-End Webhook & Multi-Service Sequences',
      'Logical, Physical & JSON Schema ERDs + Saga Outbox',
    ],
    consolidatedBlueprintIds: '#11, #14, #20, #28 (Base) + Absorbed: #08',
    blueprintPack: [
      {
        slotTitle: 'Enterprise API Gateway, Rate Limits & Traffic Routing',
        chapterNumber: 1,
        recommendedTemplateId: '08',
        description: 'Apigee/Envoy ingress routing, OAuth2/SPIFFE mTLS policies, and token-bucket rate limits.',
      },
      {
        slotTitle: 'Micro-Level API Sequences, Webhooks & Latency Budgets',
        chapterNumber: 2,
        recommendedTemplateId: '11',
        description: 'End-to-end synchronous RPC & async webhook sequence flows with p99 latency budgets.',
      },
      {
        slotTitle: 'Logical Domain Model, Physical Database Schema & JSON ERDs',
        chapterNumber: 3,
        recommendedTemplateId: '14',
        description: 'Cloud Spanner / AlloyDB DDL schemas, foreign-key cardinality, B-tree/HNSW indexes, and JSON schemas.',
      },
      {
        slotTitle: 'Application Fault Tolerance, Circuit Breakers & Retry Policies',
        chapterNumber: 5,
        recommendedTemplateId: '28',
        description: 'Exponential backoff with jitter, dead-letter queues (DLQ), and circuit-breaker state transitions.',
      },
      {
        slotTitle: 'Multi-Stage CI/CD & DevSecOps Quality Gates',
        chapterNumber: 6,
        recommendedTemplateId: '20',
        description: '22-stage GxP automated build, SAST/DAST, golden-dataset AI evals, and progressive canary rollout.',
      },
    ],
    sectionsCount: 6,
  },
  {
    id: 'ai_system_card',
    docCode: 'DOC 13',
    name: 'Enterprise AI / LLM System Card & Safety Governance Spec',
    shortName: 'DOC 13 • AI System Card',
    badge: 'Agentic Orchestration, RAG & Safety',
    badgeColor: 'from-fuchsia-500/20 to-pink-500/20 text-fuchsia-700 border-fuchsia-500/30',
    audience: 'Chief AI Officer, AI Ethics Board, ML Engineers, Regulators',
    primaryPurpose:
      'Authoritative AI system card and safety governance specification detailing foundation model benchmarks, AI inference token budget throttling, multi-agent ReAct cognitive loops, ScaNN vector RAG mesh, Model Armor prompt shields, dual-custody clinical HITL gates, and GenAI platform topology.',
    absorbedDocs: [
      'DOC 04 (FDD - Agent Flows)',
      'DOC 15 (Token Throttling)',
    ],
    mergedTopics: [
      'Multi-Agent ReAct Loops & ScaNN Vector RAG Mesh',
      'Model Armor Prompt Shields & Dual-Custody HITL',
      'AI Inference Token Budget Throttling',
    ],
    consolidatedBlueprintIds: '#23, #24, #26, #40 (Base)',
    blueprintPack: [
      {
        slotTitle: 'Multi-Agent Cognitive Reasoning & ReAct Loops',
        chapterNumber: 2,
        recommendedTemplateId: '23',
        description: 'Supervisor, planner, executor, and verifier agent mesh with bounded ReAct loop governors.',
      },
      {
        slotTitle: 'Enterprise RAG Knowledge Mesh & ScaNN Vector Search',
        chapterNumber: 3,
        recommendedTemplateId: '24',
        description: 'Hybrid dense/sparse retrieval, AlloyDB ScaNN vector indexing, ACL pre-filtering, and citation grounding.',
      },
      {
        slotTitle: 'Dual-Custody Human-in-the-Loop Clinical Approval Gates',
        chapterNumber: 5,
        recommendedTemplateId: '26',
        description: 'Confidence thresholding, Pharmacovigilance escalation, and 21 CFR Part 11 dual-custody sign-off.',
      },
      {
        slotTitle: 'Enterprise GenAI Platform Infrastructure Topology',
        chapterNumber: 6,
        recommendedTemplateId: '40',
        description: 'Vertex AI Agent Engine, Model Armor inline inspection, semantic KV caching, and GPU pool topology.',
      },
    ],
    sectionsCount: 6,
  },
  {
    id: 'threat_model',
    docCode: 'DOC 07',
    name: 'STRIDE Threat Model & Security Posture',
    shortName: 'DOC 07 • STRIDE',
    badge: 'Cybersecurity & Attack Surface',
    badgeColor: 'from-rose-500/20 to-red-500/20 text-rose-700 border-rose-500/30',
    audience: 'CISO, Penetration Testers, SecOps',
    primaryPurpose:
      'Standalone cybersecurity threat model covering cross-zone data flow diagrams (DFD), trust boundary crossings, zero-trust perimeter defense, and formal STRIDE attack vectors, mitigations, and residual risk scoring.',
    absorbedDocs: ['(Standalone — Zero Bloat)'],
    mergedTopics: [
      'Data Flow Diagrams (DFD) & Trust Boundaries',
      'STRIDE Attack Vectors, Mitigations & Residual Risk',
    ],
    consolidatedBlueprintIds: '#15, #18, #27 (Base)',
    blueprintPack: [
      {
        slotTitle: 'Security Trust Boundaries & Attack Surface DFD',
        chapterNumber: 2,
        recommendedTemplateId: '18',
        description: 'Cross-zone data flow diagram (DFD), trust boundaries, and external attacker ingress vectors.',
      },
      {
        slotTitle: 'Perimeter Defense & Zero-Trust Access Architecture',
        chapterNumber: 3,
        recommendedTemplateId: '15',
        description: 'Cloud Armor WAF, Identity-Aware Proxy (IAP), SPIFFE mTLS, and VPC Service Controls.',
      },
      {
        slotTitle: 'STRIDE Threat Assessment Matrix & Mitigation Flow',
        chapterNumber: 4,
        recommendedTemplateId: '27',
        description: 'Component-by-component Spoofing, Tampering, Repudiation, Info Disclosure, DoS, and EoP mitigations.',
      },
    ],
    sectionsCount: 4,
  },
  {
    id: 'security_package',
    docCode: 'DOC 09',
    name: 'GRC & Regulatory Compliance Package',
    shortName: 'DOC 09 • GRC Package',
    badge: 'Regulatory & GxP Audit',
    badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-700 border-emerald-500/30',
    audience: 'FDA/EMA Auditors, Compliance Officers, Legal Counsel',
    primaryPurpose:
      'Standalone GxP and regulatory audit evidence package mapping technical controls to FDA 21 CFR Part 11, EU Annex 11, HIPAA, SOC 2 Type II, and ISO 27001 with ABAC/RBAC identity governance and tamper-evident cryptographic logs.',
    absorbedDocs: ['(Standalone — Zero Bloat)'],
    mergedTopics: [
      'Control Mapping: FDA 21 CFR Part 11, HIPAA, SOC 2, ISO 27001',
      'ABAC/RBAC Identity Governance & Tamper-Evident Logs',
    ],
    consolidatedBlueprintIds: '#15, #17, #21 (Base)',
    blueprintPack: [
      {
        slotTitle: 'Enterprise Security Architecture & Defense-in-Depth',
        chapterNumber: 1,
        recommendedTemplateId: '15',
        description: 'Zero-trust perimeter, CMEK HSM encryption at rest/in transit, and tenant data isolation.',
      },
      {
        slotTitle: 'Identity Governance, ABAC & Privilege Access Flow',
        chapterNumber: 2,
        recommendedTemplateId: '17',
        description: 'Workforce Identity Federation, OIDC/SAML 2.0 SSO, ABAC policy enforcement, and JIT PAM.',
      },
      {
        slotTitle: 'Tamper-Evident Audit Logging & Observability Pipeline',
        chapterNumber: 3,
        recommendedTemplateId: '21',
        description: 'WORM retention-locked Cloud Storage audit sinks, SHA-256 hash chaining, and SIEM export.',
      },
    ],
    sectionsCount: 4,
  },
  {
    id: 'sre_resilience',
    docCode: 'DOC 17',
    name: 'SRE Reliability, Chaos & Production Cutover Runbook',
    shortName: 'DOC 17 • SRE & Ops Spec',
    badge: 'Resilience, Chaos & Production Cutover',
    badgeColor: 'from-teal-500/20 to-cyan-500/20 text-teal-700 border-teal-500/30',
    audience: 'SREs, Incident Commanders, Release Managers, Infra Leads',
    primaryPurpose:
      'Unified production reliability and war-room cutover specification combining 99.999% SLA error budgets, Four Golden Signals, active-active multi-region chaos testing, bulkheads, air-gapped ransomware vault recovery, T-24h war-room swimlanes, and minute-by-minute traffic cutover & auto-rollback.',
    absorbedDocs: [
      'DOC 16 (Go-Live Runbook)',
      'DOC 12 (Cutover Ch. 6)',
      'DOC 11 (Failure Modes)',
    ],
    mergedTopics: [
      '99.999% SLA Error Budgets & Four Golden Signals',
      'Air-Gapped Cyber/Ransomware Vault Recovery',
      'T-24h War Room Cutover, Traffic Flip & Auto-Rollback',
    ],
    consolidatedBlueprintIds: '#19, #21, #28, #48 (Base) + Absorbed: #03, #11, #29',
    blueprintPack: [
      {
        slotTitle: '99.999% SLA, Four Golden Signals & Error Budget Policies',
        chapterNumber: 1,
        recommendedTemplateId: '21',
        description: 'OpenTelemetry distributed tracing, Four Golden Signals, and multi-window burn-rate alerts.',
      },
      {
        slotTitle: 'Multi-Region Active-Active Failover & Chaos Engineering',
        chapterNumber: 2,
        recommendedTemplateId: '19',
        description: 'Zero-RPO synchronous cross-region replication, automated GSLB failover, and fault-injection game days.',
      },
      {
        slotTitle: 'Bulkheads, Load Shedding & Graceful Degradation',
        chapterNumber: 3,
        recommendedTemplateId: '28',
        description: 'Tenant isolation bulkheads, priority load shedding, and deterministic fallback routing.',
      },
      {
        slotTitle: 'BCDR Air-Gapped Cyber Recovery & Ransomware Vault',
        chapterNumber: 4,
        recommendedTemplateId: '48',
        description: 'Immutable air-gapped recovery vault, cryptographic integrity verification, and clean-room rebuild.',
      },
      {
        slotTitle: 'T-Minus 24h Pre-Flight & Cross-Functional War Room Swimlane',
        chapterNumber: 5,
        recommendedTemplateId: '03',
        description: 'War room command hierarchy, T-24h readiness gates, and cross-functional escalation handoffs.',
      },
      {
        slotTitle: 'Minute-by-Minute Operational Cutover Runbook Matrix',
        chapterNumber: 6,
        recommendedTemplateId: '29',
        description: 'Sequenced production cutover runbook with explicit owners, CLI commands, and verification probes.',
      },
      {
        slotTitle: 'Production Traffic Cutover Sequence & Auto-Rollback Tree',
        chapterNumber: 6,
        recommendedTemplateId: '11',
        description: 'Canary traffic shift (1% -> 10% -> 50% -> 100%) and automated abort/rollback decision tree.',
      },
    ],
    sectionsCount: 6,
  },
];

export const NON_GOALS_DISCLAIMER =
  'Derived diagrams describe what is designed, not what was excluded; absence of a capability here is not a scope decision.';

export const ARCHETYPE_REGISTRY: Record<ArchetypeId, DocArchetype> = {
  brd: {
    id: 'brd',
    docCode: 'DOC 01',
    name: 'Business Requirements & FinOps Strategy (BRD)',
    description:
      'Consolidated executive business case, C-Suite strategic pillars, As-Is vs. To-Be clinical process transformation, ROI formulas, Vendor Fit-Gap scorecard, 3-Year Cloud FinOps TCO, risk-based autonomy gates, and 30-60-90 day roadmap.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'governance_state_machine'],
    sections: [
      {
        id: 'exec_summary_pillars',
        title: 'Executive Summary & C-Suite Strategic Pillars',
        provenance: 'inferred',
        inferPrompt: 'exec_summary',
      },
      {
        id: 'asis_vs_tobe_clinical',
        title: 'As-Is Clinical Pain Points vs. To-Be Target State',
        provenance: 'derived',
        mapper: 'userStories',
      },
      {
        id: 'value_stream_roi',
        title: 'Value Stream & ROI Realization Formulas',
        provenance: 'derived',
        mapper: 'nfrsFromGovernance',
      },
      {
        id: 'vendor_fit_gap_eval',
        title: 'Vendor Fit-Gap & Build-vs-Buy Evaluation',
        provenance: 'derived',
        mapper: 'componentDescriptions',
      },
      {
        id: 'tco_cloud_finops',
        title: '3-Year TCO & Cloud FinOps Unit Economics',
        provenance: 'derived',
        mapper: 'interfaceInventory',
      },
      {
        id: 'autonomy_governance_gates',
        title: 'Risk-Based Autonomy & Governance Approval Gates',
        provenance: 'derived',
        mapper: 'acceptanceCriteria',
      },
      {
        id: 'roadmap_30_60_90',
        title: 'Phased 30-60-90 Day Pilot & Capital Roadmap',
        provenance: 'human',
        guidance:
          'Maintain bidirectional traceability across BRD, PRD/URS, SDD, TDD, and GxP validation acceptance criteria with CFO and ARB sign-off.',
      },
    ],
  },
  prd: {
    id: 'prd',
    docCode: 'DOC 02',
    name: 'Product & Functional Requirements Document (PRD / URS)',
    description:
      'Consolidated Product, UX, and GxP User/Functional Requirements Specification (PRD / URS) covering personas, MVP prioritization grid, multi-actor clinical swimlanes, clinician copilot journeys, lifecycle state machines, and 21 CFR Part 11 e-signatures.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'sequence_diagram', 'governance_state_machine'],
    sections: [
      {
        id: 'product_scope_personas',
        title: 'Product Scope, Personas & System Boundary',
        provenance: 'inferred',
        inferPrompt: 'problem_statement',
      },
      {
        id: 'capability_taxonomy_mvp',
        title: 'Core Functional Capability Taxonomy & MVP Grid',
        provenance: 'derived',
        mapper: 'epicsFromStages',
      },
      {
        id: 'clinical_workflows_swimlanes',
        title: 'Multi-Actor Clinical Workflows & Swimlanes',
        provenance: 'derived',
        mapper: 'personasFromActors',
      },
      {
        id: 'ux_clinician_copilot',
        title: 'UX Interaction & Clinician Copilot Journey',
        provenance: 'derived',
        mapper: 'componentDescriptions',
      },
      {
        id: 'domain_lifecycle_gates',
        title: 'Domain Object Lifecycle & State Machine Gates',
        provenance: 'derived',
        mapper: 'acceptanceCriteria',
      },
      {
        id: 'hitl_21cfr11_esignatures',
        title: 'Human Review Workbench & 21 CFR Part 11 E-Signature Controls',
        provenance: 'derived',
        mapper: 'nfrsFromGovernance',
      },
      {
        id: 'scope_non_goals',
        title: 'Measurable Acceptance Criteria, NFRs & Non-Goals',
        provenance: 'human',
        guidance: `Specify measurable GxP validation acceptance criteria, clinical safety NFRs, and explicit out-of-scope boundaries. NOTE: ${NON_GOALS_DISCLAIMER}`,
      },
    ],
  },
  sdd: {
    id: 'sdd',
    docCode: 'DOC 03',
    name: 'System Design Document (SDD - High-Level Architecture)',
    description:
      'High-level system design uniting back-of-the-envelope scale math, CAP theorem trade-offs, formal ADRs, multi-tier container topology, GPU/CUD FinOps sizing, zero-trust VPC-SC security, cognitive model routing, multi-region DR, and 6-R CDC migration.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'devops_cicd_pipeline', 'secure_deployment_map'],
    sections: [
      {
        id: 'scale_math_cap_tradeoffs',
        title: 'Scale Estimations, Back-of-the-Envelope Math & CAP Trade-Offs',
        provenance: 'inferred',
        inferPrompt: 'exec_summary',
      },
      {
        id: 'adrs_selection_trees',
        title: 'Architecture Decision Records (ADRs) & Selection Trees',
        provenance: 'derived',
        mapper: 'assumptionsMapper',
      },
      {
        id: 'multi_tier_container_topology',
        title: 'Multi-Tier Subsystem & Decoupled Container Topology',
        provenance: 'derived',
        mapper: 'componentDescriptions',
      },
      {
        id: 'compute_gpu_finops_reclamation',
        title: 'Cloud Compute, GPU Sizing & FinOps Reclamation Policies',
        provenance: 'derived',
        mapper: 'interfaceInventory',
      },
      {
        id: 'zero_trust_vpc_perimeter',
        title: 'Zero-Trust Network Perimeter & VPC Infrastructure',
        provenance: 'derived',
        mapper: 'nfrsFromGovernance',
      },
      {
        id: 'cognitive_runtime_gateway',
        title: 'Cognitive Runtime & Model Gateway Routing',
        provenance: 'derived',
        mapper: 'acceptanceCriteria',
      },
      {
        id: 'ha_multi_region_dr',
        title: 'High-Availability & Multi-Region DR Strategy',
        provenance: 'derived',
        mapper: 'userStories',
      },
      {
        id: 'appendix_6r_migration_cdc',
        title: '(Conditional Appendix) Legacy 6-R Cloud Migration & CDC Sync',
        provenance: 'human',
        guidance:
          'Maintain technical traceability across PRD/URS, SDD ADRs, and GxP IQ/OQ validation protocols; include 6-R CDC migration waves when modernizing legacy clinical systems.',
      },
    ],
  },
  tdd: {
    id: 'tdd',
    docCode: 'DOC 05',
    name: 'Technical Design & API Specification (TDD - Low-Level Engineering)',
    description:
      'Low-level engineering and API specification combining REST/gRPC/GraphQL gateway routing, rate limits, micro-level sequence flows, logical/physical/JSON schema ERDs, distributed saga outbox transactions, circuit breakers, and 22-stage CI/CD quality gates.',
    diagramTypes: ['unified_system_view', 'sequence_diagram', 'erd', 'devops_cicd_pipeline'],
    sections: [
      {
        id: 'api_gateway_rate_limits',
        title: 'Enterprise API Gateway, Rate Limits & Traffic Routing',
        provenance: 'inferred',
        inferPrompt: 'exec_summary',
      },
      {
        id: 'micro_sequences_webhooks',
        title: 'Micro-Level API Sequences, Webhooks & Latency Budgets',
        provenance: 'derived',
        mapper: 'interfaceInventory',
      },
      {
        id: 'domain_physical_json_erds',
        title: 'Logical Domain Model, Physical Database Schema & JSON ERDs',
        provenance: 'derived',
        mapper: 'componentDescriptions',
      },
      {
        id: 'saga_outbox_idempotency',
        title: 'Distributed Saga Outbox Transactions & Idempotency',
        provenance: 'derived',
        mapper: 'userStories',
      },
      {
        id: 'fault_tolerance_circuit_breakers',
        title: 'Application Fault Tolerance, Circuit Breakers & Retry Policies',
        provenance: 'derived',
        mapper: 'nfrsFromGovernance',
      },
      {
        id: 'cicd_devsecops_gates',
        title: 'Multi-Stage CI/CD & DevSecOps Quality Gates',
        provenance: 'human',
        guidance:
          'Maintain bidirectional engineering traceability across API contracts, database migrations, and 22-stage GxP automated qualification tests.',
      },
    ],
  },
  ai_system_card: {
    id: 'ai_system_card',
    docCode: 'DOC 13',
    name: 'Enterprise AI / LLM System Card & Safety Governance Spec',
    description:
      'Authoritative AI system card covering foundation model benchmarks, token budget throttling, multi-agent ReAct cognitive loops, ScaNN vector RAG mesh, Model Armor prompt shields, dual-custody clinical HITL gates, and GenAI platform topology.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'governance_state_machine'],
    sections: [
      {
        id: 'model_selection_token_throttling',
        title: 'Foundation Model Selection, Benchmarks & Token Throttling',
        provenance: 'inferred',
        inferPrompt: 'exec_summary',
      },
      {
        id: 'multi_agent_react_loops',
        title: 'Multi-Agent Cognitive Reasoning & ReAct Loops',
        provenance: 'derived',
        mapper: 'componentDescriptions',
      },
      {
        id: 'rag_mesh_scann_vector',
        title: 'Enterprise RAG Knowledge Mesh & ScaNN Vector Search',
        provenance: 'derived',
        mapper: 'interfaceInventory',
      },
      {
        id: 'model_armor_prompt_shields',
        title: 'Model Armor Prompt Injection Shields & Guardrails',
        provenance: 'derived',
        mapper: 'nfrsFromGovernance',
      },
      {
        id: 'dual_custody_hitl_gates',
        title: 'Dual-Custody Human-in-the-Loop Clinical Approval Gates',
        provenance: 'derived',
        mapper: 'acceptanceCriteria',
      },
      {
        id: 'genai_platform_topology',
        title: 'Enterprise GenAI Platform Infrastructure Topology',
        provenance: 'human',
        guidance:
          'Record formal sign-off from the Chief AI Officer, AI Ethics Board, and GxP Quality Assurance under EU AI Act, FDA PCCP, and NIST AI RMF.',
      },
    ],
  },
  threat_model: {
    id: 'threat_model',
    docCode: 'DOC 07',
    name: 'STRIDE Threat Model & Security Posture',
    description:
      'Standalone cybersecurity threat model covering cross-zone data flow diagrams (DFD), trust boundaries, zero-trust perimeter defense, and STRIDE attack vector mitigations.',
    diagramTypes: ['unified_system_view', 'secure_deployment_map'],
    sections: [
      {
        id: 'threat_model_scope',
        title: 'Security Posture Scope & Threat Modeling Methodology',
        provenance: 'inferred',
        inferPrompt: 'exec_summary',
      },
      {
        id: 'trust_boundaries_dfd',
        title: 'Data Flow Diagrams (DFD) & Cross-Zone Trust Boundaries',
        provenance: 'derived',
        mapper: 'trustBoundaryCrossings',
      },
      {
        id: 'perimeter_zero_trust',
        title: 'Perimeter Defense, SPIFFE mTLS & VPC-SC Isolation',
        provenance: 'derived',
        mapper: 'nfrsFromGovernance',
      },
      {
        id: 'stride_matrix_remediation',
        title: 'STRIDE Attack Vectors, Mitigations & Residual Risk Sign-Off',
        provenance: 'human',
        guidance:
          'Document CISO and Penetration Testing sign-offs on residual risk ratings and mandatory pre-launch security remediations.',
      },
    ],
  },
  security_package: {
    id: 'security_package',
    docCode: 'DOC 09',
    name: 'GRC & Regulatory Compliance Package',
    description:
      'Standalone GxP and regulatory compliance evidence package mapping technical controls to FDA 21 CFR Part 11, HIPAA, SOC 2 Type II, and ISO 27001 with ABAC/RBAC identity governance and tamper-evident logs.',
    diagramTypes: ['secure_deployment_map', 'governance_state_machine'],
    sections: [
      {
        id: 'defense_in_depth_encryption',
        title: 'Enterprise Security Architecture & CMEK Defense-in-Depth',
        provenance: 'inferred',
        inferPrompt: 'exec_summary',
      },
      {
        id: 'abac_rbac_identity_flow',
        title: 'ABAC/RBAC Identity Governance & Privileged Access Flow',
        provenance: 'derived',
        mapper: 'personasFromActors',
      },
      {
        id: 'tamper_evident_audit_logs',
        title: 'Tamper-Evident Cryptographic Audit Logs & SIEM Pipeline',
        provenance: 'derived',
        mapper: 'trustBoundaryCrossings',
      },
      {
        id: 'regulatory_control_matrix',
        title: 'Control Mapping: FDA 21 CFR Part 11, HIPAA, SOC 2 & ISO 27001',
        provenance: 'human',
        guidance:
          'Attach verified GxP IQ/OQ/PQ, FDA 21 CFR Part 11, HIPAA, and SOC 2 Type II evidentiary attestations for external regulatory inspection.',
      },
    ],
  },
  sre_resilience: {
    id: 'sre_resilience',
    docCode: 'DOC 17',
    name: 'SRE Reliability, Chaos & Production Cutover Runbook',
    description:
      'Consolidated SRE reliability, chaos engineering, BCDR ransomware vault recovery, and T-24h war-room production cutover and auto-rollback runbook.',
    diagramTypes: ['unified_system_view', 'sequence_diagram', 'devops_cicd_pipeline', 'secure_deployment_map'],
    sections: [
      {
        id: 'sla_golden_signals_error_budget',
        title: '99.999% SLA, Four Golden Signals & Error Budget Policies',
        provenance: 'inferred',
        inferPrompt: 'exec_summary',
      },
      {
        id: 'multi_region_failover_chaos',
        title: 'Multi-Region Active-Active Failover & Chaos Engineering',
        provenance: 'derived',
        mapper: 'componentDescriptions',
      },
      {
        id: 'bulkheads_load_shedding',
        title: 'Bulkheads, Load Shedding & Graceful Degradation',
        provenance: 'derived',
        mapper: 'nfrsFromGovernance',
      },
      {
        id: 'bcdr_cyber_ransomware_vault',
        title: 'BCDR Air-Gapped Cyber Recovery & Ransomware Vault',
        provenance: 'derived',
        mapper: 'acceptanceCriteria',
      },
      {
        id: 'war_room_t24h_swimlane',
        title: 'T-Minus 24h Pre-Flight & Cross-Functional War Room Swimlane',
        provenance: 'derived',
        mapper: 'userStories',
      },
      {
        id: 'cutover_traffic_flip_rollback',
        title: 'Minute-by-Minute Traffic Cutover & Automated Rollback Tree',
        provenance: 'human',
        guidance:
          'Authorize live production traffic cutover, canary progression gates, and instant rollback triggers with Incident Commander and SRE Director sign-off.',
      },
    ],
  },
};

export function resolveSurvivingArchetypeId(rawId?: string | null): ArchetypeId {
  const key = String(rawId || '').trim().toLowerCase();
  if (key in ARCHETYPE_REGISTRY) {
    return key as ArchetypeId;
  }
  if (key in ABSORBED_TO_SURVIVING_ARCHETYPE_MAP) {
    return ABSORBED_TO_SURVIVING_ARCHETYPE_MAP[key];
  }
  throw new Error(`Unknown document archetype ID: "${rawId}"`);
}

export function getArchetype(id: ArchetypeId | string): DocArchetype {
  const resolvedId = resolveSurvivingArchetypeId(id);
  return ARCHETYPE_REGISTRY[resolvedId];
}

export function validateArchetypeInvariants(archetype: DocArchetype): void {
  for (const section of archetype.sections) {
    if (section.provenance === 'derived') {
      if (!section.mapper) {
        throw new Error(
          `Archetype invariant violation: derived section "${section.id}" in "${archetype.id}" missing mapper`
        );
      }
      if (section.inferPrompt) {
        throw new Error(
          `Archetype invariant violation: derived section "${section.id}" in "${archetype.id}" must not have inferPrompt`
        );
      }
    } else if (section.provenance === 'inferred') {
      if (!section.inferPrompt) {
        throw new Error(
          `Archetype invariant violation: inferred section "${section.id}" in "${archetype.id}" missing inferPrompt`
        );
      }
      if (section.mapper) {
        throw new Error(
          `Archetype invariant violation: inferred section "${section.id}" in "${archetype.id}" must not have mapper`
        );
      }
    } else if (section.provenance === 'human') {
      if (section.mapper || section.inferPrompt) {
        throw new Error(
          `Archetype invariant violation: human section "${section.id}" in "${archetype.id}" must have neither mapper nor inferPrompt`
        );
      }
    }
  }
}

// Validate all 8 surviving archetypes on load
Object.values(ARCHETYPE_REGISTRY).forEach(validateArchetypeInvariants);
