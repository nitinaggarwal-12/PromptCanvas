/**
 * Machine-Readable Canonical Architecture Contracts for the 22 Production Blueprints
 * (7 Core Google Cloud Architecture/Flow Blueprints #78, #79, #81, #84, #00, #67, #69 + 15 Infographic Blueprints #52–#66)
 * Enforces strict semantic boundaries, required elements, forbidden antipatterns,
 * exact reference geometry, PNG aspect-ratio locks, and fail-closed QA certification.
 */
import { INFOGRAPHIC_BLUEPRINTS_LIST } from './infographicBlueprints52to66';

export interface ReferenceGeometryContract {
  pageWidth: number;
  pageHeight: number;
  aspectRatio: number; // pageWidth / pageHeight
  exactIconCount?: number;
  minIconCount?: number;
  requiredCellIds: string[];
  forbiddenCellIds: string[];
  requiredSubstrings: string[];
  forbiddenSubstrings: string[];
  /** Pairs of [earlierCellId, laterCellId] enforcing XML DOM painting order */
  domOrderPairs?: [string, string][];
}

export interface CanonicalContract {
  id: string;
  grammar: string;
  family: 'Infographic' | 'Understand' | 'Process' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning' | 'Reference Architectures';
  level: ('L1' | 'L2' | 'L3')[];
  semanticQuestion: string; // What core architecture question does this grammar answer?
  requiredElements: string[];
  forbiddenElements: string[];
  edgeTypes: string[];
  iconPolicy: 'semantic-vector' | 'authentic-brand' | 'hybrid';
  sourceImage: string;
  generatorVersion: string;
  certificationStatus: 'certified' | 'in_review' | 'pending';
  referenceGeometry?: ReferenceGeometryContract;
}

export const CANONICAL_CONTRACTS: Record<string, CanonicalContract> = {
  '00': {
    id: '00',
    grammar: 'GCP Enterprise Architecture',
    family: 'Reference Architectures',
    level: ['L1', 'L2'],
    semanticQuestion: 'What is the end-to-end multi-tier Google Cloud enterprise topology spanning edge ingress, application mesh, event streaming, Vertex AI, multi-region lakehouse, and zero-trust security?',
    requiredElements: ['edge-ingress', 'cloud-run', 'vertex-ai', 'gemini', 'spanner', 'model-armor'],
    forbiddenElements: ['untyped-connectors', 'crossing-lines-over-text', 'unverified-external-urls'],
    edgeTypes: ['direct-straight-sync', 'cdc-event-stream', 'vertex-rag', 'react-tool-loop', 'lakehouse-sync'],
    iconPolicy: 'authentic-brand',
    sourceImage: '00.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified'
  },
  '67': {
    id: '67',
    grammar: '7-Stage Synchronous & Asynchronous Agentic Request-Response Flow',
    family: 'Flow',
    level: ['L2', 'L3'],
    semanticQuestion: 'How do synchronous and asynchronous agentic requests flow across 7 operational layers with Google Cloud Brand Light styling?',
    requiredElements: ['tier_1_tab', 'tier_2_tab', 'tier_3_tab', 'tier_4_tab', 'tier_5_tab', 'tier_6_tab', 'tier_7_tab', 'google cloud', 'gemini'],
    forbiddenElements: ['funky-neon-colors', 'unconnected-nodes'],
    edgeTypes: ['sync-request', 'async-callback', 'policy-gate'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_67.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1640,
      pageHeight: 1285,
      aspectRatio: 1640 / 1285,
      minIconCount: 17,
      requiredCellIds: ['header_logo', 'tier_1_tab', 'tier_2_tab', 'tier_3_tab', 'tier_4_tab', 'tier_5_tab', 'tier_6_tab', 'tier_7_tab'],
      forbiddenCellIds: [],
      requiredSubstrings: ['Google Cloud', 'Vertex AI', 'Gemini 3.1 Pro', 'Cloud Operations Suite (SRE Hub)'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '69': {
    id: '69',
    grammar: 'Unified 7-Layer Enterprise Operational Flowchart (WBS 1.1.0)',
    family: 'Flow',
    level: ['L2', 'L3'],
    semanticQuestion: 'How does the Central Execution Spine route requests from Ingress and Apigee Gateway through GKE Orchestrator, Vertex AI Gemini 3.1 Pro, Redis Cache, Pub/Sub Mesh, Async Agents, Persistence, and the Enterprise SRE Observability Hub?',
    requiredElements: ['tier_2_tab', 'tier_3_tab', 'tier_4_tab', 'tier_5_tab', 'tier_7_tab', 'google cloud', 'gemini'],
    forbiddenElements: ['tier_1_tab', 'tier_6_tab', 'icon_node_7a_dlq', 'Cloud Operations Suite (SRE Hub)'],
    edgeTypes: ['sync-request', 'state-persistence', 'async-event-mesh', 'sre-observability'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_69.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 864,
      aspectRatio: 1536 / 864, // 1.7778 (16:9 exact match to 1024x576 reference)
      exactIconCount: 16,
      requiredCellIds: [
        'header_logo',
        'tier_1_frame',
        'tier_2_frame',
        'tier_3_frame',
        'tier_4_frame',
        'tier_5_frame',
        'tier_7_frame',
        'tier_2_tab',
        'tier_3_tab',
        'tier_4_tab',
        'tier_5_tab',
        'tier_7_tab',
        'node_7a_dlq',
        'flow_8_ingest_task',
        'flow_9_embed_request'
      ],
      forbiddenCellIds: ['tier_1_tab', 'tier_6_tab', 'icon_node_7a_dlq'],
      requiredSubstrings: [
        'Unified 7-Layer Enterprise Operational Flowchart (WBS 1.1.0)',
        'ASYNC EVENT BUS &amp;',
        'Dead-Letter Queue (DLQ)',
        'Cloud Operations Suite'
      ],
      forbiddenSubstrings: [
        'Cloud Operations Suite (SRE Hub)',
        'image=data:image/svg+xml;utf8,'
      ],
      domOrderPairs: [['flow_9_embed_request', 'flow_8_ingest_task']]
    }
  },
  ...Object.fromEntries(
    INFOGRAPHIC_BLUEPRINTS_LIST.map((ib) => [
      ib.id,
      {
        id: ib.id,
        grammar: `${ib.shortType} Infographic Blueprint (${ib.name})`,
        family: 'Infographic' as const,
        level: ['L1', 'L2'] as ('L1' | 'L2' | 'L3')[],
        semanticQuestion: ib.subtitle,
        requiredElements: [`infographic_${ib.id}`, 'mxGraphModel'],
        forbiddenElements: ['untyped-connectors', 'crossing-lines-over-text'],
        edgeTypes: ['visual-flow', 'semantic-hierarchy', 'comparison-link'],
        iconPolicy: 'hybrid' as const,
        sourceImage: `canonical_${ib.id}.png`,
        generatorVersion: '3.0',
        certificationStatus: 'certified' as const,
      },
    ])
  ),
  '78': {
    id: '78',
    grammar: 'Official Google Cloud Architecture Center Hub-and-Spoke Blueprint',
    family: 'Reference Architectures',
    level: ['L1', 'L2', 'L3'],
    semanticQuestion: 'How does the official Google Cloud Architecture Center Hub-and-Spoke topology orchestrate routing, central governance, and isolated tenant spokes across 7 numbered causal steps?',
    requiredElements: ['routing', 'security', 'tenant', 'google', 'gemini'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['ingress-request', 'hub-routing', 'spoke-delegation', 'governance-telemetry'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_78.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified'
  },
  '79': {
    id: '79',
    grammar: 'L400 Deployment & Network Spec — Multi-Tenant Agentic Hub-and-Spoke (GCP us-central1 • VPC-SC)',
    family: 'Reference Architectures',
    level: ['L3'],
    semanticQuestion: 'How are subnet CIDRs, BGP ASN 64512 routing, Cloud Armor WAF policies, PSC endpoints, and VPC-SC perimeters configured across the shared control hub and isolated tenant spokes?',
    requiredElements: ['10.100.0.0/16', '64512', 'p-finvault-silo', '10.110.0.0/20', '10.200.0.0/20'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['tls-ingress', 'mtls-grpc', 'psc-attachment', 'force-rls'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_79.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified'
  },
  '81': {
    id: '81',
    grammar: '[L400 PRINCIPAL SEQUENCE] OIDC JWT, SPIFFE mTLS, FW & VPC-SC (P3-APP-L-10)',
    family: 'Flow',
    level: ['L3'],
    semanticQuestion: 'How do User/Requestor, Gemini Enterprise, Coordinator Agent, Agent Gateway, Retrieval Specialist, Analytics Specialist, and Enterprise Data & Tools execute 16 governed sequence interactions across A2A and MCP boundaries?',
    requiredElements: ['p3-app-l-10', 'coordinator agent', 'agent gateway', 'retrieval specialist', 'analytics specialist'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['a2a-delegation', 'mcp-tool-call', 'hitl-approval', 'audit-telemetry'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_81.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified'
  },
  '03': {
    id: '03',
    grammar: 'Business Process / BPMN Swimlane',
    family: 'Process',
    level: ['L2', 'L3'],
    semanticQuestion: 'How do distinct operational roles and departments hand off activities, SLA timers, and approval decisions over time?',
    requiredElements: ['swimlane', 'mxGraphModel'],
    forbiddenElements: ['untyped-connectors', 'crossing-lines-over-text'],
    edgeTypes: ['process-flow', 'handoff', 'exception-branch'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_03.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified'
  },
  '12': {
    id: '12',
    grammar: 'State Machine Diagram',
    family: 'Process',
    level: ['L2', 'L3'],
    semanticQuestion: 'What discrete lifecycle states exist for an entity and what events and guard conditions trigger transitions?',
    requiredElements: ['state', 'mxGraphModel'],
    forbiddenElements: ['unbounded-infinite-loops', 'unlabeled-transitions'],
    edgeTypes: ['state-transition', 'error-fallback-transition'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_12.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified'
  },
  '14': {
    id: '14',
    grammar: 'Data Model / ERD',
    family: 'Structure',
    level: ['L2', 'L3'],
    semanticQuestion: 'What are the database entities, tables, attributes, primary/foreign keys, and relational cardinalities?',
    requiredElements: ['pk', 'fk', 'mxGraphModel'],
    forbiddenElements: ['untyped-connectors'],
    edgeTypes: ['one-to-many', 'many-to-many', 'one-to-one'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_14.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified'
  },
  '29': {
    id: '29',
    grammar: 'Cutover / Rollback Runbook Decision Flow',
    family: 'Delivery & Operations',
    level: ['L3'],
    semanticQuestion: 'What is the step-by-step execution timeline, owner RACI, verification checks, and rollback decision procedure for production cutover and incidents?',
    requiredElements: ['rollback', 'cutover', 'mxGraphModel'],
    forbiddenElements: ['unverified-untested-cutover'],
    edgeTypes: ['sequential-step-dependency', 'gate-approval', 'rollback-trigger'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_29.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified'
  },
  '84': {
    id: '84',
    grammar: 'Google Cloud Architecture Center #78 (L400) — Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud (Exadata X10M)',
    family: 'Reference Architectures',
    level: ['L3'],
    semanticQuestion: 'How does Oracle E-Business Suite R12.2 run on Google Cloud C3 HA WebLogic & Cloud Filestore Enterprise NFSv4.1 (Zone 1) connected over <0.5ms Dual 100GbE ODB Partner Interconnect to Co-Located OCI Child Site Exadata X10M 2-Node RAC & Smart Scan (Zone 2)?',
    requiredElements: ['ebs r12.2', 'exadata x10M', 'weblogic', 'filestore', 'goldengate'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['https-ingress', 'odb-interconnect', 'sqlnet-1521', 'rocev2-rdma'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_84.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified'
  },
  '85': {
    id: '85',
    grammar: 'G-01: C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform',
    family: 'Understand',
    level: ['L1', 'L2'],
    semanticQuestion: 'How do external AE reporters, clinical safety reviewers, EDC/EHR feeds, and corporate IdP interact with the Google Cloud Pharmacovigilance AI Platform, Safety DB of Record, and FDA/EMA gateways?',
    requiredElements: ['pharmacovigilance', 'meddra', 'e2b', 'mxGraphModel'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['ae-case-reports', 'review-esign', 'e2b-as2-gateway'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_85.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 10,
      requiredCellIds: ['g01_left_col', 'g01_center_col', 'g01_right_col', 'g01_sys_frame', 'g01_legend'],
      forbiddenCellIds: [],
      requiredSubstrings: ['Pharmacovigilance', 'Multimodal AE Intake', 'E2B(R3) Compliance Validation'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '86': {
    id: '86',
    grammar: 'G-02: As-Is vs. To-Be BPMN 2.0 Process Swimlane — Adverse Event (ICSR) Case Processing',
    family: 'Process',
    level: ['L2'],
    semanticQuestion: 'How does the To-Be Gemini Enterprise Automated ICSR BPMN 2.0 workflow (<12m cycle, 89% STP, <0.2% error) compare against the As-Is Legacy Manual ICSR workflow (7-10d cycle, 14% error)?',
    requiredElements: ['as-is', 'to-be', 'meddra', 'mxGraphModel'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['bpmn-sequence-flow', 'parallel-and-gateway', 'exclusive-xor-gateway'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_86.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 2,
      requiredCellIds: ['g02_asis_frame', 'g02_tobe_frame', 'tobe_fork', 'tobe_join', 'tobe_xor'],
      forbiddenCellIds: [],
      requiredSubstrings: ['AS-IS LEGACY MANUAL ICSR WORKFLOW', 'TO-BE GEMINI ENTERPRISE AUTOMATED ICSR WORKFLOW'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '87': {
    id: '87',
    grammar: 'G-03: Multi-Persona User Journey & OpenTelemetry Blueprint (Adverse Event Lifecycle)',
    family: 'Process',
    level: ['L2'],
    semanticQuestion: 'How do Patient/HCP Reporter, Drug Safety Associate, QPPV Medical Reviewer, Frontstage API Edge, and Backstage Gemini Enterprise + OpenTelemetry interact across the 5 lifecycle stages?',
    requiredElements: ['reporter', 'meddra', 'traceparent', 'mxGraphModel'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['journey-step', 'frontstage-api', 'backstage-otel'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_87.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 15,
      requiredCellIds: ['g03_ch1', 'g03_ch5', 'g03_grid_frame', 'j_l1_n1', 'j_l5_n4'],
      forbiddenCellIds: [],
      requiredSubstrings: ['1. Reporter Intake', '5. E2B(R3) Submission', 'traceparent'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '88': {
    id: '88',
    grammar: 'G-04: UML Use Case, IAM/RBAC & GxP Separation-of-Duties (SoD) Boundary',
    family: 'Security & Governance',
    level: ['L2'],
    semanticQuestion: 'Which actors can invoke Intake, Triage, Approval, and Audit use cases inside the VPC-SC & 21 CFR Part 11 boundary, and how does the OPA Rego PEP enforce Separation-of-Duties (SoD Rules 1–3)?',
    requiredElements: ['intake zone', 'triage zone', 'approval zone', 'audit zone', 'sod rule'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['actor-association', 'uml-include', 'sod-constraint'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_88.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 6,
      requiredCellIds: ['g04_sys_bound', 'g04_z1', 'g04_z2', 'g04_z3', 'g04_z4', 'g04_pep'],
      forbiddenCellIds: [],
      requiredSubstrings: ['INTAKE ZONE', 'APPROVAL ZONE', 'SoD Rule 1', 'SoD Rule 2', 'SoD Rule 3'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '89': {
    id: '89',
    grammar: 'G-06: ADR Multi-Option Architecture Trade-Off & Quantitative Scoring Matrix (PV Platform)',
    family: 'Analysis & Planning',
    level: ['L2', 'L3'],
    semanticQuestion: 'Why was Option B (Cloud Run Gen2 + Pub/Sub Outbox + AlloyDB AI ScaNN + Gemini Enterprise ADK, score 4.71/5.00) selected over Option A (GKE Monolith, 3.11/5.00) and Option C (Active-Active Spanner, 3.10/5.00)?',
    requiredElements: ['option a', 'option b', 'option c', '4.71'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['architecture-option-flow', 'weighted-evaluation'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_89.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 7,
      requiredCellIds: ['g06_optA_card', 'g06_optB_card', 'g06_optC_card', 'g06_score_matrix'],
      forbiddenCellIds: [],
      requiredSubstrings: ['Option B (SELECTED)', 'Weighted Total (100%)', '4.71 / 5.00'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '90': {
    id: '90',
    grammar: 'G-07: C4 Level 3 Internal Component & Hexagonal Interface Decomposition (ICSR Worker)',
    family: 'Structure',
    level: ['L3'],
    semanticQuestion: 'How is the Cloud Run Gen2 Go 1.24 ICSR Worker decomposed into Inbound Driving Adapters, Hexagonal Port Interfaces, Domain & Application Core, and Outbound Driven Adapters?',
    requiredElements: ['inbound driving', 'domain', 'outbound driven', 'iicsrcommandport'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['inbound-port-binding', 'domain-orchestration', 'outbound-port-adapter'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_90.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 1,
      requiredCellIds: ['g07_outer_container', 'g07_zone_in', 'g07_zone_core', 'g07_zone_out'],
      forbiddenCellIds: [],
      requiredSubstrings: ['INBOUND DRIVING', 'APPLICATION CORE', 'IIcsrCommandPort', 'ILLMInferencePort'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '91': {
    id: '91',
    grammar: 'G-08: UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle',
    family: 'Process',
    level: ['L3'],
    semanticQuestion: 'How do ICSR cases transition across INGESTED, VALIDATED, AGENTIC_PROCESSING, WAITING_CLINICAL_HITL, SLA_ESCALATED_QPPV, AUTO_SUBMITTED_E2B, QPPV_SIGNED_SUBMITTED, NULLIFIED_COMPENSATED, and DLQ_QUARANTINED alongside the 7d/15d Regulatory SLA Clock?',
    requiredElements: ['ingested', 'validated', 'agentic_processing', 'dlq_quarantined', 't_regulatory_sla'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['uml-state-transition', 'guard-condition', 'sla-escalation'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_91.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      requiredCellIds: ['g08_top_frame', 'g08_ingested', 'g08_validated', 'g08_comp', 'g08_sla_frame', 'g08_bar_green', 'g08_bar_red'],
      forbiddenCellIds: [],
      requiredSubstrings: ['Formal UML 2.5 ICSR Case Lifecycle Statechart', 'Synchronized Regulatory SLA Clock Bar', 'T_regulatory_sla'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '92': {
    id: '92',
    grammar: 'G-09: Formal Yourdon/DeMarco Data Flow Diagram (DFD Level 1 — PHI Tokenization & AE Lineage)',
    family: 'Flow',
    level: ['L3'],
    semanticQuestion: 'How does RESTRICTED-PHI adverse event data flow from External Entities (E1, E2) through numbered Processes (P1.0–P4.0) and open-ended Data Stores (D1–D5) with Cloud DLP surrogate tokenization?',
    requiredElements: ['p1.0', 'p2.0', 'p3.0', 'p4.0', 'd1:', 'd5:'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['restricted-phi-flow', 'pseudonymized-event-flow', 'signed-e2b-flow'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_92.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      requiredCellIds: ['dfd_e1', 'dfd_e2', 'dfd_p1', 'dfd_p2', 'dfd_p3', 'dfd_p4', 'dfd_d1', 'dfd_d5'],
      forbiddenCellIds: [],
      requiredSubstrings: ['EXTERNAL ENTITIES', 'PROCESSES', 'DATA STORES', 'P1.0:', 'P4.0:'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '93': {
    id: '93',
    grammar: 'G-10: Physical ERD & DDL Schema (AlloyDB for PostgreSQL 16 + AlloyDB AI ScaNN — PV Domain)',
    family: 'Structure',
    level: ['L3'],
    semanticQuestion: 'How are the 6 physical AlloyDB PostgreSQL 16 tables (tenants_sponsors, icsr_cases, ae_source_documents, part11_worm_audit_outbox, adk_clinical_inference_runs, meddra_whodrug_vectors) keyed, partitioned, indexed with ScaNN/GIN, and protected by RLS and 21 CFR Part 11 append-only triggers?',
    requiredElements: ['tenants_sponsors', 'icsr_cases', 'ae_source_documents', 'part11_worm_audit_outbox', 'adk_clinical_inference_runs', 'meddra_whodrug_vectors'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['crows-foot-1-to-n'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_93.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      requiredCellIds: ['erd_tenants', 'erd_cases', 'erd_docs', 'erd_audit', 'erd_runs', 'erd_vectors'],
      forbiddenCellIds: [],
      requiredSubstrings: ['tenants_sponsors', 'icsr_cases', 'meddra_whodrug_vectors', 'idx_scann_meddra'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '94': {
    id: '94',
    grammar: 'G-01: L400 C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform',
    family: 'Structure',
    level: ['L3'],
    semanticQuestion: 'How does the L400 Pharmacovigilance & AE AI Platform enforce OAuth 2.1 DPoP, mTLS 1.3, BeyondCorp FIDO2 WebAuthn, VPC-SC restricted.googleapis.com, Model Armor, Gemini 3.0 Pro ADK, OPA Rego XSD validation, Oracle Argus/Veeva Vault commit, AS2 MDN E2B(R3), and SecOps Chronicle WORM retention?',
    requiredElements: ['oauth 2.1 dpop', 'fido2 webauthn', 'restricted.googleapis.com', 'oracle argus', 'secops chronicle'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['ae-case-ingestion', 'identity-vocab-sync', 'regulatory-e2b'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_94.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 4,
      requiredCellIds: ['g01_l400_left_col', 'g01_l400_sys', 'g01_l400_c1', 'g01_l400_c2', 'g01_l400_c3', 'g01_l400_gov', 'g01_l400_right_col'],
      forbiddenCellIds: [],
      requiredSubstrings: ['G-01: L400 C4 Level 1 System Context', 'Multimodal AE Intake', 'restricted.googleapis.com'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '95': {
    id: '95',
    grammar: 'G-02: L400 As-Is vs. To-Be BPMN 2.0 Process Swimlane — ICSR Adverse Event Lifecycle',
    family: 'Process',
    level: ['L3'],
    semanticQuestion: 'How does the L400 To-Be Gemini Enterprise ADK BPMN 2.0 workflow compress ICSR cycle time from P99 7.4 Days (14.2% error, 38% rework) to P99 9.8s (92.4% STP, 0.08% error) with AlloyDB Outbox Commit, Pub/Sub Emit, and 2h SLA HITL boundaries?',
    requiredElements: ['7.4 days', '9.8s', '92.4%', 'alloydb outbox commit', 'case closed stp'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['bpmn-sequence-flow', 'parallel-split-join', 'xor-rework-loop'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_95.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      requiredCellIds: ['g02_l400_asis_pool', 'g02_l400_tobe_pool', 'l400_asis_book', 'l400_tb_deid', 'l400_tb_stp1', 'l400_tb_hitl'],
      forbiddenCellIds: [],
      requiredSubstrings: ['G-02: L400 As-Is vs. To-Be BPMN 2.0 Process Swimlane', 'P99 Cycle: 7.4 Days', 'P99 Cycle: 9.8s'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '96': {
    id: '96',
    grammar: 'G-03: L400 Multi-Persona User Journey, OpenTelemetry & Gemini Enterprise Touchpoint Blueprint',
    family: 'Process',
    level: ['L3'],
    semanticQuestion: 'How do Patient/HCP Reporter, Drug Safety Associate (DSA), QPPV Medical Reviewer, Frontstage Edge & API Mesh, and Backstage Gemini ADK & OpenTelemetry interact across the 5 L400 touchpoint stages with p99 latency budgets and W3C traceparent lineage?',
    requiredElements: ['oidc/passkey', 'beyondcorp', 'pam jit', 'traceparent', 'ec-p384'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['persona-stage-progression', 'frontstage-backstage-touchpoint'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_96.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 14,
      requiredCellIds: ['g03_l400_s1', 'g03_l400_s5', 'g03_l400_r1_bg', 'g03_l400_r5_bg'],
      forbiddenCellIds: [],
      requiredSubstrings: ['G-03: L400 Multi-Persona User Journey', 'OIDC/Passkey', 'traceparent', 'EC-P384'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '97': {
    id: '97',
    grammar: 'G-04: L400 UML Use Case, IAM/PAM & Agent Identity Separation-of-Duties (SoD) Boundary',
    family: 'Flow',
    level: ['L3'],
    semanticQuestion: 'How do the 4 L400 VPC-SC Security Zones and OPA Rego / GCP IAM CEL Policy Enforcement Point (PEP) enforce SoD Invariant 1 (Submitter != Approver), SoD Invariant 2 (spiffe://*/sa/* != roles/pv.qppv), and SoD Invariant 3 (DSA Operator != QA GxP Auditor)?',
    requiredElements: ['roles/pv.reporter', 'spiffe://gcp.pv.prod', 'sod invariant 1', 'sod invariant 2', 'sod invariant 3'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['uml-actor-association', 'uml-include-extend', 'pep-validation'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_97.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      minIconCount: 2,
      requiredCellIds: ['g04_l400_sys', 'g04_l400_z1', 'g04_l400_z2', 'g04_l400_z3', 'g04_l400_z4', 'g04_l400_pep'],
      forbiddenCellIds: [],
      requiredSubstrings: ['G-04: L400 UML Use Case', 'SoD Invariant 1', 'SoD Invariant 2', 'SoD Invariant 3'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '98': {
    id: '98',
    grammar: 'G-08: L400 UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle',
    family: 'Process',
    level: ['L3'],
    semanticQuestion: 'How does the L400 Hierarchical ICSR Statechart transition across INGESTED, VALIDATED, AGENTIC_PROCESSING (4 substates), WAITING_CLINICAL_HITL, SLA_ESCALATED_QPPV, AUTO_SUBMITTED_E2B, QPPV_SIGNED_SUBMITTED, NULLIFIED_COMPENSATED, and DLQ_QUARANTINED with the Synchronized Regulatory SLA Clock Formula?',
    requiredElements: ['ingested', 'validated', 'agentic_processing', 'qppv_signed_submitted', 't_regulatory_sla'],
    forbiddenElements: ['unconnected-edges'],
    edgeTypes: ['uml-state-transition', 'guard-condition', 'sla-escalation'],
    iconPolicy: 'semantic-vector',
    sourceImage: 'canonical_98.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 858,
      aspectRatio: 1536 / 858,
      requiredCellIds: ['g08_l400_top_bg', 'g08_l400_ingested', 'g08_l400_validated', 'g08_l400_comp', 'g08_l400_sla_bg', 'g08_l400_b1', 'g08_l400_b4'],
      forbiddenCellIds: [],
      requiredSubstrings: ['G-08: L400 UML 2.5 Finite State Machine', 'Formal UML 2.5 Hierarchical ICSR Statechart', 'T_regulatory_sla'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  }
};



