export type ArchetypeId =
  | 'sdd'
  | 'fdd'
  | 'tdd'
  | 'exec_brief'
  | 'security_package'
  | 'prd'
  | 'brd'
  | 'api_spec'
  | 'threat_model';

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
  name: string;
  description: string;
  diagramTypes: string[];
  sections: DocSectionSpec[];
}

export interface DocArchetypeMeta {
  id: ArchetypeId;
  name: string;
  shortName: string;
  badge: string;
  badgeColor: string;
  audience: string;
  primaryPurpose: string;
  blueprintPack: BlueprintSlot[];
  sectionsCount: number;
}

export const DOC_ARCHETYPES_META: DocArchetypeMeta[] = [
  {
    id: 'brd',
    name: 'Business Requirements Document',
    shortName: 'BRD',
    badge: 'Executive Business',
    badgeColor: 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
    audience: 'Executive Sponsors, Business Unit Leaders, Architecture Review Board (ARB)',
    primaryPurpose: 'Defines enterprise business transformation vision, ROI realization formulas, risk-based autonomy levels, and phased governance approval gates.',
    blueprintPack: [
      { slotTitle: 'Executive System Context & Stakeholder Topology', chapterNumber: 2, recommendedTemplateId: '01', description: 'Overall system boundaries, external partners, and users.' },
      { slotTitle: 'Strategic Business Capability & Value Stream', chapterNumber: 4, recommendedTemplateId: '04', description: 'Enterprise capability mapping and business value streams.' },
      { slotTitle: 'As-Is vs. To-Be Process Modernization Matrix', chapterNumber: 3, recommendedTemplateId: '05', description: 'Current manual baseline vs automated target state.' },
      { slotTitle: 'Human-in-the-Loop Governance & Decision Gates', chapterNumber: 5, recommendedTemplateId: '26', description: 'Safety screening, dual-custody gates, and e-signatures.' },
    ],
    sectionsCount: 9,
  },
  {
    id: 'prd',
    name: 'Product Requirements Document',
    shortName: 'PRD',
    badge: 'Product & UX',
    badgeColor: 'from-sky-500/20 to-blue-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30',
    audience: 'Product Managers, Engineering Leads, UX Designers, QA / Validation Teams',
    primaryPurpose: 'Specifies product scope, target personas, functional epics, measurable acceptance criteria, and non-functional requirements (NFRs).',
    blueprintPack: [
      { slotTitle: 'Product System Context & Boundary', chapterNumber: 1, recommendedTemplateId: '01', description: 'Product ecosystem and external system touchpoints.' },
      { slotTitle: 'Core Functional Capability Taxonomy', chapterNumber: 3, recommendedTemplateId: '02', description: 'Feature hierarchy and functional capability pods.' },
      { slotTitle: 'User Interaction & Workflow Journey', chapterNumber: 4, recommendedTemplateId: '23', description: 'End-to-end user journeys and cognitive reasoning loops.' },
      { slotTitle: 'Lifecycle State Machine & Transition Gates', chapterNumber: 5, recommendedTemplateId: '12', description: 'Entity lifecycle states, approvals, and transition gates.' },
    ],
    sectionsCount: 9,
  },
  {
    id: 'sdd',
    name: 'System Design Document (HLD)',
    shortName: 'SDD',
    badge: 'Core Architecture',
    badgeColor: 'from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    audience: 'Principal Architects, Cloud Engineers, Lead Tech Architects, Security Leads',
    primaryPurpose: 'Complete high-level technical architecture detailing multi-tier cloud deployment, zero-trust network boundaries, cognitive runtime, and disaster recovery.',
    blueprintPack: [
      { slotTitle: 'Multi-Tier Subsystem & Container Topology', chapterNumber: 2, recommendedTemplateId: '08', description: 'C4 Container and microservice topology.' },
      { slotTitle: 'Zero-Trust Network Perimeter & VPC Infrastructure', chapterNumber: 3, recommendedTemplateId: '15', description: 'Cloud Armor ingress, VPC-SC, and private endpoints.' },
      { slotTitle: 'Cloud Infrastructure & Compute Deployment Map', chapterNumber: 2, recommendedTemplateId: '16', description: 'GKE clusters, serverless containers, and managed storage.' },
      { slotTitle: 'Cognitive Runtime & Model Gateway Routing', chapterNumber: 4, recommendedTemplateId: '23', description: 'Agent reasoning engine and LLM gateway dispatch.' },
      { slotTitle: 'High-Availability & Multi-Region DR Strategy', chapterNumber: 7, recommendedTemplateId: '19', description: 'Active-Active failover, RTO < 15m, and cross-region replication.' },
    ],
    sectionsCount: 10,
  },
  {
    id: 'fdd',
    name: 'Functional Design Document',
    shortName: 'FDD',
    badge: 'Functional Engineering',
    badgeColor: 'from-teal-500/20 to-emerald-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30',
    audience: 'Functional Analysts, Microservice Developers, Integration Engineers, QA Testers',
    primaryPurpose: 'Deep functional specifications, multi-agent reasoning sequences, domain data relationships, safety exception gates, and human approval workbenches.',
    blueprintPack: [
      { slotTitle: 'Multi-Actor Swimlane & Workflow Initiation', chapterNumber: 2, recommendedTemplateId: '03', description: 'Cross-functional swimlanes and role hand-offs.' },
      { slotTitle: 'Multi-Service Interaction Sequence Flow', chapterNumber: 5, recommendedTemplateId: '11', description: 'Step-by-step sequential message exchanges and callbacks.' },
      { slotTitle: 'Domain Entity Relationship Diagram (ERD)', chapterNumber: 6, recommendedTemplateId: '14', description: 'Core functional entities and relational cardinality.' },
      { slotTitle: 'Human Review Workbench & E-Signature Controls', chapterNumber: 8, recommendedTemplateId: '26', description: 'Human-in-the-loop review queues and audit stamps.' },
    ],
    sectionsCount: 10,
  },
  {
    id: 'tdd',
    name: 'Technical Design Document (LLD)',
    shortName: 'TDD',
    badge: 'Low-Level Engineering',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    audience: 'Software Engineers, Backend Developers, DevOps/SRE Engineers, SecOps',
    primaryPurpose: 'Low-level code implementation specifications, database indexes, distributed saga outbox transactions, fault tolerance, and CI/CD quality gates.',
    blueprintPack: [
      { slotTitle: 'Micro-Level API Interaction Sequence & Latency Budgets', chapterNumber: 2, recommendedTemplateId: '11', description: 'RPC contracts, timeout budgets, and retry limits.' },
      { slotTitle: 'Physical Database Schema & Foreign Key ERD', chapterNumber: 3, recommendedTemplateId: '14', description: 'Postgres/Spanner DDL, B-tree indexes, and constraints.' },
      { slotTitle: 'Fault Tolerance, Circuit Breakers & Retry Policies', chapterNumber: 5, recommendedTemplateId: '28', description: 'Dead-letter queues, exponential backoff, and fallbacks.' },
      { slotTitle: 'Multi-Stage CI/CD & Security Scanning Pipeline', chapterNumber: 6, recommendedTemplateId: '20', description: '22-stage build, SAST, DAST, and canary deployments.' },
    ],
    sectionsCount: 8,
  },
  {
    id: 'exec_brief',
    name: 'Executive Architecture Brief',
    shortName: 'EAB',
    badge: 'C-Suite Briefing',
    badgeColor: 'from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30',
    audience: 'CIO, CTO, Board of Directors, Enterprise Investment Committee',
    primaryPurpose: 'High-impact 2-page executive summary focusing on strategic pillars, architectural differentiators, risk posture, and capital investment roadmap.',
    blueprintPack: [
      { slotTitle: 'Executive System Context & Strategic Scope', chapterNumber: 1, recommendedTemplateId: '01', description: 'High-level business and technology boundaries.' },
      { slotTitle: 'Strategic Business Capability & Value Stream', chapterNumber: 2, recommendedTemplateId: '04', description: 'Capability maturity and business value drivers.' },
      { slotTitle: 'Architecture Options & Trade-Off Matrix', chapterNumber: 3, recommendedTemplateId: '32', description: 'Buy vs build, SaaS vs self-hosted evaluation.' },
    ],
    sectionsCount: 7,
  },
  {
    id: 'threat_model',
    name: 'STRIDE Threat Model & Security Posture',
    shortName: 'STRIDE',
    badge: 'Cybersecurity',
    badgeColor: 'from-rose-500/20 to-red-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
    audience: 'CISO, Security Engineering, SecOps, Penetration Testers, Compliance Auditors',
    primaryPurpose: 'Comprehensive threat modeling covering STRIDE attack vectors, data flow diagrams (DFD), trust boundaries, mitigation controls, and residual risk.',
    blueprintPack: [
      { slotTitle: 'Security Trust Boundaries & Attack Surface Map', chapterNumber: 2, recommendedTemplateId: '18', description: 'Cross-zone trust boundaries and attacker ingress vectors.' },
      { slotTitle: 'STRIDE Threat Assessment Matrix & Mitigation Flow', chapterNumber: 4, recommendedTemplateId: '27', description: 'Detailed STRIDE mapping per component and mitigation.' },
      { slotTitle: 'Perimeter Defense & Zero-Trust Access Architecture', chapterNumber: 3, recommendedTemplateId: '15', description: 'Cloud Armor, mTLS, and VPC Service Controls.' },
    ],
    sectionsCount: 8,
  },
  {
    id: 'api_spec',
    name: 'Enterprise API & Integration Blueprint',
    shortName: 'API Spec',
    badge: 'API & Microservices',
    badgeColor: 'from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30',
    audience: 'API Architects, Integration Engineers, Partner Developers, Backend Teams',
    primaryPurpose: 'Full specification of public and internal REST/gRPC/GraphQL APIs, rate limits, schema models, authentication methods, and webhook callback topologies.',
    blueprintPack: [
      { slotTitle: 'Enterprise API Gateway & Traffic Routing Map', chapterNumber: 2, recommendedTemplateId: '08', description: 'Apigee / Envoy traffic ingress and microservice routing.' },
      { slotTitle: 'End-to-End API Sequence & Callback Flow', chapterNumber: 3, recommendedTemplateId: '11', description: 'Request lifecycle, rate limiting, and response payloads.' },
      { slotTitle: 'Entity Resource Data Model & JSON Schema ERD', chapterNumber: 4, recommendedTemplateId: '14', description: 'Resource hierarchies, fields, types, and relations.' },
    ],
    sectionsCount: 8,
  },
  {
    id: 'security_package',
    name: 'GRC & Security Compliance Package',
    shortName: 'GRC',
    badge: 'Governance & Risk',
    badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    audience: 'Internal Audit, Compliance Officers, Legal Counsel, External Regulators',
    primaryPurpose: 'Authoritative audit evidence package mapping technical controls to ISO 27001, SOC 2 Type II, HIPAA, GDPR, and 21 CFR Part 11 mandates.',
    blueprintPack: [
      { slotTitle: 'Enterprise Security Architecture & Defense-in-Depth', chapterNumber: 2, recommendedTemplateId: '15', description: 'Zero-trust perimeter, network isolation, and encryption.' },
      { slotTitle: 'Identity Governance, ABAC & Privilege Access Flow', chapterNumber: 3, recommendedTemplateId: '17', description: 'IAM policies, RBAC/ABAC matrices, and SSO federation.' },
      { slotTitle: 'Audit Logging & Continuous Observability Pipeline', chapterNumber: 4, recommendedTemplateId: '21', description: 'Cryptographic log immutability and SIEM integration.' },
    ],
    sectionsCount: 8,
  },
];

export const NON_GOALS_DISCLAIMER =
  'Derived diagrams describe what is designed, not what was excluded; absence of a capability here is not a scope decision.';

export const ARCHETYPE_REGISTRY: Record<ArchetypeId, DocArchetype> = {
  fdd: {
    id: 'fdd',
    name: 'Functional Design Document (FDD)',
    description: 'Detailed functional specifications, multi-agent orchestration flows, PV safety gates, and HITL approval matrices.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'sequence_diagram', 'erd', 'governance_state_machine'],
    sections: [
      { id: 'purpose_scope', title: 'Document Purpose, Objectives & Scope', provenance: 'inferred', inferPrompt: 'exec_summary' },
      { id: 'functional_overview', title: 'Functional System Overview & Architecture Flow', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'roles_permissions', title: 'User Roles & Permission Matrix', provenance: 'derived', mapper: 'personasFromActors' },
      { id: 'auth_workflow', title: 'Authentication & Workflow Initiation Design', provenance: 'derived', mapper: 'userStories' },
      { id: 'planning_orchestration', title: 'Planning Agent & ReAct Workflow Orchestration', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'retrieval_evidence', title: 'Knowledge Retrieval & Claim Citation Architecture', provenance: 'derived', mapper: 'interfaceInventory' },
      { id: 'safety_pv_detection', title: 'Pharmacovigilance (PV) & Safety Event Detection Gate', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'compliance_qc', title: 'Compliance Engine & Quality Control Verification', provenance: 'derived', mapper: 'nfrsFromGovernance' },
      { id: 'hitl_approval', title: 'Human Review Workbench & E-Signature Controls', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'tool_execution', title: 'Tool Execution Gateway & Action Previews', provenance: 'derived', mapper: 'interfaceInventory' },
      { id: 'exception_catalog', title: 'Exception Catalog & Error Handling Strategy', provenance: 'inferred', inferPrompt: 'error_handling' },
      { id: 'traceability_matrix', title: 'Requirements Traceability Matrix (PRD ➔ FDD ➔ Test)', provenance: 'human', guidance: 'Maintain bidirectional traceability between PRD requirements, FDD modules, and validation test cases.' },
    ],
  },
  prd: {
    id: 'prd',
    name: 'Product Requirement Document (PRD)',
    description: 'Product goals, user personas, epics, acceptance criteria, and measurable KPIs.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'governance_state_machine'],
    sections: [
      { id: 'problem_statement', title: 'Problem Statement & Opportunity', provenance: 'inferred', inferPrompt: 'problem_statement' },
      { id: 'personas', title: 'Target Users & Personas', provenance: 'derived', mapper: 'personasFromActors' },
      { id: 'epics', title: 'Functional Epics & Capabilities', provenance: 'derived', mapper: 'epicsFromStages' },
      { id: 'functional_reqs', title: 'Functional System Requirements', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'acceptance_criteria', title: 'Acceptance Criteria & State Transitions', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'nfrs', title: 'Non-Functional & Governance Requirements', provenance: 'derived', mapper: 'nfrsFromGovernance' },
      { id: 'success_metrics', title: 'Success Metrics & KPI Targets', provenance: 'human', guidance: 'Define measurable product outcome targets, SLA metrics, and adoption goals.' },
      { id: 'prioritization', title: 'Release Phasing & Prioritization', provenance: 'human', guidance: 'Specify Phase 1 MVP vs Phase 2 enhancement priorities.' },
      { id: 'scope_non_goals', title: 'Scope & Non-Goals', provenance: 'human', guidance: `List explicit out-of-scope boundaries. NOTE: ${NON_GOALS_DISCLAIMER}` },
    ],
  },
  sdd: {
    id: 'sdd',
    name: 'System Design Document (SDD)',
    description: 'Complete technical architecture, GCP deployment topology, VPC-SC network security, ReAct runtime, and model gateway routing.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'devops_cicd_pipeline', 'secure_deployment_map'],
    sections: [
      { id: 'purpose_principles', title: 'Document Purpose, Objectives & Architectural Principles', provenance: 'inferred', inferPrompt: 'exec_summary' },
      { id: 'deployment_topology', title: 'Multi-Tier Cloud Deployment Architecture & Container Compute', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'network_security', title: 'Zero-Trust Network Architecture & VPC-SC Security Perimeter', provenance: 'derived', mapper: 'nfrsFromGovernance' },
      { id: 'react_runtime', title: 'ReAct Agent Cognitive Runtime & Context Assembly Design', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'model_gateway', title: 'Model Gateway Routing, Token Budgeting & Canary Deployment', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'data_retrieval', title: 'Access-Aware Hybrid RAG & Feature Store Architecture', provenance: 'derived', mapper: 'interfaceInventory' },
      { id: 'tool_gateway_audit', title: 'Tool Gateway Execution, Idempotency & 21 CFR Part 11 Audit Trail', provenance: 'derived', mapper: 'interfaceInventory' },
      { id: 'observability_reliability', title: 'Observability, Reliability SLOs & Disaster Recovery Targets', provenance: 'derived', mapper: 'nfrsFromGovernance' },
      { id: 'traceability_signoff', title: 'Requirements Traceability Matrix & Architecture Sign-Off', provenance: 'human', guidance: 'Maintain technical traceability between PRD, FDD, SDD components, and validation test cases.' },
    ],
  },
  exec_brief: {
    id: 'exec_brief',
    name: 'Executive Architecture Brief (EAB)',
    description: 'Executive-level architecture brief covering the 8-layer governed platform blueprint, strategic ROI dashboard, multi-agent delegation topology, autonomy ladder, and decision gates.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'governance_state_machine'],
    sections: [
      { id: 'proposal_decision', title: 'Executive Summary, Proposal & Business Decisions Requested', provenance: 'inferred', inferPrompt: 'exec_summary' },
      { id: 'strategic_outcomes', title: 'Business Context, Strategic Opportunity & Target Outcome Dashboard', provenance: 'derived', mapper: 'personasFromActors' },
      { id: 'eight_layer_blueprint', title: 'Eight-Layer Governed Agentic AI Architecture Blueprint', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'specialized_agent_delegation', title: 'Specialized Multi-Agent Delegation Topology & ReAct Cognitive Loop', provenance: 'derived', mapper: 'userStories' },
      { id: 'autonomy_ladder_oversight', title: 'Executive Risk-Based Autonomy Ladder & Mandatory Human Review Gates', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'architecture_options', title: 'Architecture Options Evaluation Matrix (Option B Centralized Platform)', provenance: 'derived', mapper: 'nfrsFromGovernance' },
      { id: 'roadmap_investment_gates', title: 'Phased Implementation Roadmap, Investment Milestones & Decision Gates', provenance: 'derived', mapper: 'assumptionsMapper' },
      { id: 'executive_signoff', title: 'Executive Steering Committee & Architecture Review Board Sign-Off', provenance: 'human', guidance: 'Capture formal approval sign-offs from Executive Sponsor, Business Owner, Chief Architect, and Security Lead.' },
    ],
  },
  api_spec: {
    id: 'api_spec',
    name: 'API & Service Interface Specification',
    description: 'Interface inventory, inter-service communication contracts, and protocols.',
    diagramTypes: ['unified_system_view', 'sequence_diagram'],
    sections: [
      { id: 'interface_inventory', title: 'Per-Service Interface Inventory', provenance: 'derived', mapper: 'interfaceInventory' },
      { id: 'sequence_contracts', title: 'Actor & Service Interaction Flows', provenance: 'derived', mapper: 'userStories' },
      { id: 'rate_limiting_auth', title: 'Authentication, Authorization & Rate Limiting Policy', provenance: 'human', guidance: 'Document OAuth2/mTLS policies and rate limit thresholds.' },
    ],
  },
  threat_model: {
    id: 'threat_model',
    name: 'STRIDE Threat Model & Security Assessment',
    description: 'Trust-boundary analysis, data flow crossings, and STRIDE risk mitigations.',
    diagramTypes: ['unified_system_view', 'secure_deployment_map'],
    sections: [
      { id: 'trust_boundaries', title: 'Trust-Boundary Crossings & Entry Points', provenance: 'derived', mapper: 'trustBoundaryCrossings' },
      { id: 'stride_table', title: 'STRIDE Threat Analysis Matrix', provenance: 'inferred', inferPrompt: 'stride_table' },
      { id: 'remediation_plan', title: 'Security Sign-Off & Remediation Plan', provenance: 'human', guidance: 'Document required security sign-offs and target fix dates.' },
    ],
  },
  brd: {
    id: 'brd',
    name: 'Business Requirements Document (BRD)',
    description: 'Executive business requirements, strategic alignment, ROI value realization formulas, risk-based autonomy matrix, and governance approval gates.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'governance_state_machine'],
    sections: [
      { id: 'exec_problem_solution', title: 'Executive Summary, Business Problem & Transformation Vision', provenance: 'inferred', inferPrompt: 'exec_summary' },
      { id: 'business_context', title: 'Business Context, Strategic Alignment & Drivers', provenance: 'derived', mapper: 'personasFromActors' },
      { id: 'process_comparison', title: 'Current-State vs. Future-State Process Comparison', provenance: 'derived', mapper: 'userStories' },
      { id: 'business_capabilities', title: 'Business Capability Inventory & Phased Priorities', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'autonomy_matrix', title: 'Risk-Based Autonomy Matrix & Mandatory Human Triggers', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'pv_safety_mandate', title: 'Pharmacovigilance & Product Quality Safety Mandates', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'value_realization', title: 'Business Value Realization Formulas & ROI Methodology', provenance: 'derived', mapper: 'nfrsFromGovernance' },
      { id: 'governance_gates', title: 'Executive Governance Approval Gates (Gates 1–5)', provenance: 'derived', mapper: 'assumptionsMapper' },
      { id: 'traceability_signoff', title: 'Requirements Traceability & Executive Charter Sign-Off', provenance: 'human', guidance: 'Maintain bidirectional traceability across BRD, PRD, FDD, SDD, and validation acceptance criteria.' },
    ],
  },
  tdd: {
    id: 'tdd',
    name: 'Technical Design Document (TDD)',
    description: 'Detailed code-level engineering specifications, ReAct runtime pseudocode, hybrid RAG scoring, saga outbox patterns, and 22-stage CI/CD quality gates.',
    diagramTypes: ['unified_system_view', 'sequence_diagram', 'erd', 'devops_cicd_pipeline'],
    sections: [
      { id: 'tech_overview_repo', title: 'Technical Stack Summary & Monorepo Source Layout', provenance: 'inferred', inferPrompt: 'exec_summary' },
      { id: 'react_runtime_sequence', title: 'ReAct Agent Orchestrator Pseudocode & Runtime Lifecycle', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'retrieval_scoring', title: 'Hybrid RAG Scoring Formulas & Access Entitlement Filters', provenance: 'derived', mapper: 'interfaceInventory' },
      { id: 'tool_gateway_idempotency', title: 'Tool Gateway Write-Action Sequence & Cryptographic Idempotency', provenance: 'derived', mapper: 'interfaceInventory' },
      { id: 'saga_outbox_pattern', title: 'Distributed Saga Transactions & Event-Driven Outbox Consistency', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'cicd_quality_gates', title: '22-Stage CI/CD Pipeline, Automated AI Evaluation & Canary Rollout', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'traceability_signoff', title: 'Technical Requirements Traceability & Engineering Sign-Off', provenance: 'human', guidance: 'Maintain technical traceability across BRD, PRD, FDD, SDD, TDD components, and validation test cases.' },
    ],
  },
  security_package: {
    id: 'security_package',
    name: 'Enterprise Security Compliance Package',
    description: 'Compliance posture, access control, audit logging, and data protection controls.',
    diagramTypes: ['secure_deployment_map', 'governance_state_machine'],
    sections: [
      { id: 'security_controls', title: 'Security & Governance Controls Inventory', provenance: 'derived', mapper: 'nfrsFromGovernance' },
      { id: 'trust_boundary_audit', title: 'Perimeter & Cross-Zone Data Flow Control', provenance: 'derived', mapper: 'trustBoundaryCrossings' },
      { id: 'audit_policy', title: 'Compliance & Regulatory Audit Evidentiary Trail', provenance: 'human', guidance: 'Attach SOC2 / HIPAA / FedRAMP evidentiary attestations.' },
    ],
  },
};

export function getArchetype(id: ArchetypeId): DocArchetype {
  const archetype = ARCHETYPE_REGISTRY[id];
  if (!archetype) {
    throw new Error(`Unknown document archetype ID: "${id}"`);
  }
  return archetype;
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

// Validate all archetypes on load
Object.values(ARCHETYPE_REGISTRY).forEach(validateArchetypeInvariants);
