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
    description: 'Complete technical architecture, tier topology, security posture, and deployment.',
    diagramTypes: ['conceptual_diagram', 'unified_system_view', 'devops_cicd_pipeline'],
    sections: [
      { id: 'exec_summary', title: 'Executive Architecture Summary', provenance: 'inferred', inferPrompt: 'exec_summary' },
      { id: 'arch_overview', title: 'System Architecture Overview', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'tier_detail', title: 'Per-Tier Component Specifications', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'security_posture', title: 'Security Posture & Controls', provenance: 'derived', mapper: 'nfrsFromGovernance' },
      { id: 'deployment', title: 'Deployment & Infrastructure Topology', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'assumptions', title: 'Architectural Assumptions & Boundary Conditions', provenance: 'derived', mapper: 'assumptionsMapper' },
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
    name: 'Business Requirement Document (BRD)',
    description: 'Business drivers, stakeholder stakeholders, operational workflows, and ROI goals.',
    diagramTypes: ['conceptual_diagram', 'governance_state_machine'],
    sections: [
      { id: 'business_context', title: 'Business Context & Strategic Drivers', provenance: 'inferred', inferPrompt: 'business_context' },
      { id: 'stakeholders', title: 'Key Stakeholders & Systems', provenance: 'derived', mapper: 'personasFromActors' },
      { id: 'business_workflows', title: 'Operational Workflows & State Lifecycle', provenance: 'derived', mapper: 'acceptanceCriteria' },
      { id: 'roi_financials', title: 'Business Case & Financial Impact', provenance: 'human', guidance: 'Detail cost savings, efficiency gains, and budget allocation.' },
    ],
  },
  tdd: {
    id: 'tdd',
    name: 'Technical Design Document (TDD)',
    description: 'Engineering implementation specifications, data schema, API contracts, and non-functional bounds.',
    diagramTypes: ['unified_system_view', 'erd', 'devops_cicd_pipeline'],
    sections: [
      { id: 'technical_overview', title: 'Technical Architecture & Service Topology', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'data_schema', title: 'Database Schema & Table Relationships', provenance: 'derived', mapper: 'componentDescriptions' },
      { id: 'service_contracts', title: 'Internal Service Contracts & Message Schemas', provenance: 'derived', mapper: 'interfaceInventory' },
      { id: 'observability', title: 'Monitoring, Telemetry & SRE SLOs', provenance: 'human', guidance: 'Define OpenTelemetry tracing, Prometheus alerts, and error budget SLOs.' },
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
