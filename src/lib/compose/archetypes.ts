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

export interface DocSectionSpec {
  id: string;
  title: string;
  provenance: ProvenanceClass;
  mapper?: string; // key into Phase 3 mappers, for derived sections
  inferPrompt?: string; // key into src/prompts/compose/, for inferred sections
  guidance?: string; // TODO guidance text for human sections
}

export interface DocArchetype {
  id: ArchetypeId;
  name: string;
  description: string;
  diagramTypes: string[]; // which template types this doc composes
  sections: DocSectionSpec[];
}

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
    name: 'Executive Architectural Brief',
    description: 'High-level business architecture summary combining conceptual, unified, and governance views.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'governance_state_machine'],
    sections: [
      { id: 'conceptual_summary', title: 'Conceptual Platform Capabilities', provenance: 'derived', mapper: 'epicsFromStages' },
      { id: 'unified_topology', title: 'Unified End-to-End System Topology', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'governance_brief', title: 'Governance & Operational Lifecycle', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'strategic_outlook', title: 'Strategic Recommendations & Roadmap', provenance: 'human', guidance: 'Enter executive recommendations and investment roadmap.' },
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
