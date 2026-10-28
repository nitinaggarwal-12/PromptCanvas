import { CANONICAL_CONTRACTS, CanonicalContract } from './canonicalContracts';
import { INFOGRAPHIC_BLUEPRINTS_LIST, generateInfographicBlueprintXmlById } from './infographicBlueprints52to66';
import { FLOW_DIAGRAM_BLUEPRINTS_67_TO_74, generateFlowDiagramBlueprintXmlById } from './flowDiagramBlueprints67to74';
import { generateTemplate78OfficialGcpArchCenterHubSpokeXml } from './templateOfficialGcpArchCenterHubSpoke';
import {
  generateTemplate79L400MultiTenantHubSpokeNetworkSpecXml,
  generateTemplate81L400PrincipalSequenceA2aMcpXml,
  generateTemplate84L400OracleEbsExadataArchCenter78Xml,
} from './templateL100L400AgenticWorkspaceBlueprints';

export interface CanonicalTemplate {
  id: string; // e.g. "00", "52" ... "84"
  name: string;
  family: 'Infographic' | 'Understand' | 'Process' | 'Whiteboard' | 'Paper' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning' | 'Reference Architectures';
  level: 'L1' | 'L2' | 'L3';
  theme?: 'light' | 'dark';
  primaryPurpose: string;
  examples: string;
  defaultDomain: string;
  previewImage?: string;
  sourceImageId: string;
  generatorVersion: string;
  fidelityScore: number;
  certificationStatus: 'certified' | 'in_review' | 'pending';
  contract?: CanonicalContract;
  keyComponents: string[];
  generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => string;
}

export const CANONICAL_FAMILIES = [
  'All',
  'Reference Architectures',
  'Infographic',
  'Understand',
  'Structure',
  'Flow',
  'Infrastructure',
  'Security & Governance',
  'Delivery & Operations',
] as const;

export const DOMAIN_PRESETS = [
  { id: 'enterprise', name: 'Enterprise Cloud & AI Reference Architecture', prefix: 'ENTERPRISE CLOUD' },
  { id: 'biopharma', name: 'Bio-Pharma Precision Oncology & Regulatory AI', prefix: 'CLINICAL AI' },
  { id: 'fintech', name: 'FinTech Autonomous Wealth & High-Speed Payments', prefix: 'FINTECH CORE' },
  { id: 'manufacturing', name: 'Smart Manufacturing & Industrial IoT Digital Twin', prefix: 'INDUSTRIAL IOT' },
  { id: 'retail', name: 'Omnichannel Retail & Intelligent Supply Chain', prefix: 'RETAIL MESH' },
  { id: 'saas', name: 'Enterprise SaaS Multi-Tenant Cloud Platform', prefix: 'SAAS CLOUD' },
  { id: 'healthcare', name: 'Healthcare & Clinical EHR Interoperability (FHIR / HL7)', prefix: 'CLINICAL EHR' },
  { id: 'energy', name: 'Clean Energy, Smart Grid & Battery Storage (BESS / V2G)', prefix: 'SMART GRID' },
  { id: 'automotive', name: 'Automotive & Connected Autonomous Fleet (V2X / ADAS)', prefix: 'AUTONOMOUS V2X' },
  { id: 'telecom', name: 'Telecommunications & 5G Core Network Slicing (O-RAN)', prefix: '5G CORE RAN' },
  { id: 'defense', name: 'Aerospace, Defense & Mission Cloud (DO-178C / ITAR)', prefix: 'MISSION CLOUD' },
  { id: 'cybersecurity', name: 'Zero-Trust Cybersecurity & SOC SecOps (SIEM / SOAR)', prefix: 'ZERO TRUST SOC' },
  { id: 'media', name: 'Media Streaming, 4K Live Transcoding & CDN Edge', prefix: 'MEDIA EDGE' },
];

interface ArchitectureDocumentBinding {
  docId: string;
  title: string;
  primaryPurpose: string;
  requiredDiagramViews: string[];
}

export const ARCHITECTURE_DOCUMENT_BINDINGS: ArchitectureDocumentBinding[] = [
  { docId: 'DOC-01', title: 'Business Requirements & FinOps Strategy (BRD)', primaryPurpose: 'C-Suite strategic pillars, As-Is vs. To-Be matrix, value stream & ROI formulas, vendor fit-gap, 3-year TCO FinOps, HITL gates, and 30-60-90 day roadmap (Absorbs DOC 06 EAB, DOC 10 Workshop, DOC 14 RFP, DOC 15 FinOps)', requiredDiagramViews: ['01 Executive Context', '05 As-Is vs To-Be', '04 Value Stream', '33 Fit-Gap Heatmap', '30 Cloud Spend & TCO', '26 HITL Gates', '32 Phased Roadmap'] },
  { docId: 'DOC-02', title: 'Product & Functional Requirements Document (PRD / URS)', primaryPurpose: 'Product scope, capability taxonomy & MVP grid, multi-actor clinical swimlanes, clinician copilot UX journey, lifecycle state machine, and 21 CFR Part 11 e-signature workbench (Absorbs DOC 04 FDD & DOC 10 Workshop)', requiredDiagramViews: ['01 Product Boundary', '02 Capability Taxonomy', '03 Multi-Actor Swimlane', '23 User Journey', '12 State Machine', '26 E-Signature Workbench'] },
  { docId: 'DOC-03', title: 'System Design Document (SDD - High-Level Architecture)', primaryPurpose: 'Scale math & CAP trade-offs, ADR decision trees, multi-tier container topology, GPU sizing & FinOps reclamation, zero-trust VPC, model gateway routing, multi-region DR, and 6-R migration CDC appendix (Absorbs DOC 11, DOC 12, DOC 14, DOC 15)', requiredDiagramViews: ['13 ADR Decision Tree', '08 Container Topology', '16 Compute/Storage Map', '33 Waste Reclamation', '15 Zero-Trust VPC', '23 Model Gateway', '19 Multi-Region DR', '22 CDC Sync', '31 Dependency Mesh'] },
  { docId: 'DOC-05', title: 'Technical Design & API Specification (TDD - Low-Level Engineering)', primaryPurpose: 'REST/gRPC/GraphQL gateway routing & rate limits, micro-level API & webhook sequences, logical/physical/JSON schema ERDs, saga outbox transactions, circuit breakers, and 22-stage CI/CD quality gates (Absorbs DOC 04 Data/Seq & DOC 08 API Spec)', requiredDiagramViews: ['08 API Gateway Routing', '11 Sequence & Callback Flow', '14 Physical & JSON ERD', '28 Circuit Breaker Flow', '20 CI/CD Scanning Pipeline'] },
  { docId: 'DOC-13', title: 'Enterprise AI / LLM System Card & Safety Governance Spec', primaryPurpose: 'Foundation model benchmarks & token throttling, multi-agent ReAct reasoning loops, ScaNN vector RAG mesh, Model Armor prompt injection shields, dual-custody clinical HITL gates, and GenAI platform topology (Absorbs DOC 04 Agent Flows & DOC 15 Token Throttling)', requiredDiagramViews: ['23 Multi-Agent ReAct Flow', '24 RAG Knowledge Mesh', '26 Dual-Custody Gate', '40 GenAI Platform Topology'] },
  { docId: 'DOC-07', title: 'STRIDE Threat Model & Security Posture', primaryPurpose: 'Standalone zero-bloat cybersecurity posture covering trust boundaries, attack surface DFDs, zero-trust perimeter defense, STRIDE threat matrix, mitigations, and residual risk', requiredDiagramViews: ['18 Trust Boundaries', '15 Perimeter Defense', '27 STRIDE Matrix'] },
  { docId: 'DOC-09', title: 'GRC & Regulatory Compliance Package', primaryPurpose: 'Standalone zero-bloat regulatory audit package mapping technical controls to FDA 21 CFR Part 11, HIPAA, SOC 2 Type II, and ISO 27001 with ABAC/PAM identity governance and immutable audit pipelines', requiredDiagramViews: ['15 Defense-in-Depth', '17 Identity Governance Flow', '21 Immutable Audit Pipeline'] },
  { docId: 'DOC-17', title: 'SRE Reliability, Chaos & Production Cutover Runbook', primaryPurpose: '99.999% SLA error budgets & Four Golden Signals, active-active multi-region failover & chaos engineering, bulkheads & load shedding, air-gapped cyber recovery vault, T-24h war room swimlane, and minute-by-minute traffic cutover & rollback (Absorbs DOC 11, DOC 12, DOC 16)', requiredDiagramViews: ['21 Observability Mesh', '19 Active-Active DR', '28 Bulkhead & Rollback Tree', '48 Cyber Recovery Vault', '03 War Room Swimlane', '29 Cutover Timeline', '11 Traffic Cutover Sequence'] },
];

import { generateTemplate00GcpEnterpriseArchXml } from "./template00GcpEnterpriseArch";
import { generateTemplate03SwimlaneXml } from "./template03Swimlane";
import { generateTemplate12StateMachineXml } from "./template12StateMachine";
import { generateTemplate14DataModelErdXml } from "./template14DataModelErd";
import { generateTemplate29CutoverRunbookXml } from "./template29CutoverRunbook";
import {
  generateTemplate85G01C4SystemContextXml,
  generateTemplate86G02BpmnSwimlaneXml,
  generateTemplate87G03UserJourneyOtelXml,
  generateTemplate88G04UmlUseCaseSodXml,
  generateTemplate89G06AdrTradeoffMatrixXml,
  generateTemplate90G07C4ComponentHexagonalXml,
  generateTemplate91G08UmlStateMachineSlaXml,
  generateTemplate92G09YourdonDfdXml,
  generateTemplate93G10PhysicalErdDdlXml,
} from "./pvGSeriesReferenceBlueprints";
import {
  generateTemplate94G01L400C4ContextXml,
  generateTemplate95G02L400BpmnSwimlaneXml,
  generateTemplate96G03L400UserJourneyXml,
  generateTemplate97G04L400UmlUseCaseSodXml,
  generateTemplate98G08L400StateMachineSlaXml,
} from "./pvGSeriesL400Blueprints";

interface RawCanonicalTemplate {
  id: string;
  name: string;
  family: 'Infographic' | 'Understand' | 'Process' | 'Whiteboard' | 'Paper' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning' | 'Reference Architectures';
  level: 'L1' | 'L2' | 'L3';
  theme?: 'light' | 'dark';
  primaryPurpose: string;
  examples: string;
  defaultDomain: string;
  previewImage?: string;
  keyComponents: string[];
  generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => string;
}

const RAW_TEMPLATES: RawCanonicalTemplate[] = [
  {
    id: '00',
    name: 'GCP Enterprise Architecture',
    family: 'Reference Architectures',
    level: 'L1',
    primaryPurpose: 'Production-grade Google Cloud native topology across 6 balanced zones with Gemini 3.8 Flash & Pro hybrid engine',
    examples: 'Multi-Region Microservices, Vertex AI GenAI Studio, Real-Time Event Streaming & Unified Lakehouse',
    defaultDomain: 'Enterprise Google Cloud Native Architecture',
    previewImage: '/templates/canonical_00.png',
    keyComponents: ['Ingress & Edge', 'Application Core Mesh', 'Real-Time Event Streaming', 'Vertex AI & Intelligence Hub', 'Multi-Region Lakehouse & DB', 'Zero-Trust Security Baseline'],
    generateXml: generateTemplate00GcpEnterpriseArchXml
  },
  {
    id: '03',
    name: 'Business Process / BPMN Swimlane',
    family: 'Process',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'Roles, activities, decisions, and handoffs across operational departments with SLA timers and approval gates',
    examples: 'Adverse event triage, clinical onboarding, approval gates, cross-department handoffs',
    defaultDomain: 'Clinical Trials & Regulatory Operations',
    previewImage: '/templates/incident_triage_swimlane.png',
    keyComponents: ['Department Swimlanes', 'Hand-off Triggers', 'Approval Decision Gates', 'Audit Milestones'],
    generateXml: generateTemplate03SwimlaneXml
  },
  {
    id: '12',
    name: 'State Machine Diagram',
    family: 'Process',
    level: 'L2',
    theme: 'light',
    primaryPurpose: 'Discrete entity lifecycle states (S0..S9), trigger events (E1..E8), transition guard conditions, and analytical cards',
    examples: 'ICSR case states, AI agent execution lifecycle, clinical protocol approval workflows',
    defaultDomain: 'Clinical Study Protocol Intelligence State Machine',
    previewImage: '/templates/governance_state_machine.png',
    keyComponents: ['S0..S9 States', 'E1..E8 Triggers', 'Guardrail Failure Branches', '4 Analytical Cards'],
    generateXml: generateTemplate12StateMachineXml
  },
  {
    id: '14',
    name: 'Data Model / ERD',
    family: 'Structure',
    level: 'L2',
    theme: 'light',
    primaryPurpose: 'Database entities, tables, attributes, primary/foreign keys, and Crow’s Foot cardinalities across 7 core enterprise domains',
    examples: 'Relational data model, lakehouse star schema, biopharma enterprise semantic ontology',
    defaultDomain: 'Bio-Pharma Enterprise Entity Model & Relational Schema',
    previewImage: '/templates/erd.png',
    keyComponents: ['24 Entities / Tables', '7 Core Domains', 'Crow’s Foot Cardinality', '4 Analytical Panels'],
    generateXml: generateTemplate14DataModelErdXml
  },
  {
    id: '29',
    name: 'Cutover / Rollback Runbook Decision Flow',
    family: 'Delivery & Operations',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'Step-by-step production cutover checklist, maintenance window, incident decision gates, RACI, and automated rollback flow',
    examples: 'Production launch, DR failover exercise, incident rollback decision tree, cloud cutover runbook',
    defaultDomain: 'Production Go-Live & Environment Cutover',
    previewImage: '/templates/canonical_29.png',
    keyComponents: ['Cutover Lifecycle', '8 Detailed Steps', 'Rollback Plan', 'RACI & Timeline Window'],
    generateXml: generateTemplate29CutoverRunbookXml
  },
  ...INFOGRAPHIC_BLUEPRINTS_LIST.map((ib) => ({
    id: ib.id,
    name: `${ib.shortType} — ${ib.name.replace(/^Infographic:\s*[^()]+/i, '').replace(/[()]/g, '').trim() || ib.shortType}`,
    family: 'Infographic' as const,
    level: 'L1' as const,
    primaryPurpose: ib.subtitle,
    examples: `${ib.shortType}, Infographic Blueprint, Executive Brief, Visual Architecture`,
    defaultDomain: ib.shortType,
    previewImage: ib.previewImage,
    keyComponents: ib.keyComponents,
    generateXml: () => generateInfographicBlueprintXmlById(ib.id)
  })),
  ...FLOW_DIAGRAM_BLUEPRINTS_67_TO_74.map((fb) => ({
    id: fb.id,
    name: fb.name,
    family: 'Flow' as const,
    level: fb.level,
    theme: fb.theme,
    primaryPurpose: fb.primaryPurpose,
    examples: `${fb.shortType}, 7-Layer Google Cloud Operational Flowchart, Agentic AI Execution Flow`,
    defaultDomain: 'Google Cloud Enterprise Agentic AI & Operational Flow',
    previewImage: fb.previewImage,
    keyComponents: fb.keyComponents,
    generateXml: () => generateFlowDiagramBlueprintXmlById(fb.id)
  })),
  {
    id: '78',
    name: 'L300 Cloud Reference & Security Architecture — Hub-and-Spoke Multi-Tenant Agentic AI',
    family: 'Reference Architectures',
    level: 'L2',
    theme: 'light',
    primaryPurpose: 'Official Google Cloud Architecture Center Hub-and-Spoke topology (#1a73e8 outer frame, #aecbfa Routing Hub, #ceead6 Governance Hub, #feefc3 Shared Pool, #fad2cf Sovereign Spoke & Step ①–⑦ callouts)',
    examples: 'Google Cloud Architecture Center, multi-tenant-agentic-ai-system.svg, Pattern A Pooled, Pattern B Sovereign Silos, Pattern C Hybrid PSC, 5-Hop Context Chain',
    defaultDomain: 'Google Cloud Architecture Center Hub-and-Spoke',
    previewImage: '/templates/canonical_78.png',
    keyComponents: ['Competing B2B Tenants / Users', 'Google Cloud Outer Container (#1a73e8)', 'Routing Hub (Cloud Armor & IAP, Model Armor, OBO+DPoP, External ALB, Cloud Run)', 'Central Governance & FinOps Hub (Security Command Center, IAM & PAB, Cloud Logging & BQ)', 'Pattern A Pooled Shared Runtime (#feefc3)', 'Pattern B Sovereign Silos & Pattern C Hybrid PSC Spokes (#fad2cf)', 'Numbered Callout Steps ①–⑦'],
    generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => generateTemplate78OfficialGcpArchCenterHubSpokeXml(domainFlavor, theme)
  },
  {
    id: '79',
    name: 'L400 Deployment & Network Spec — Multi-Tenant Agentic Hub-and-Spoke (GCP us-central1 • VPC-SC)',
    family: 'Reference Architectures',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'L400 physical network, subnet CIDR, BGP ASN 64512, WAF policy (mt-prod-waf-v4), PSC attachment (10.200.1.0/28), and VPC-SC perimeter specification for Multi-Tenant Hub-and-Spoke Agentic AI',
    examples: 'Hub VPC 10.100.0.0/16, BGP ASN 64512, Global Ext ALB VIP 34.120.55.10, Tenant Pool Shared VPC 10.110.0.0/20, Dedicated Sovereign Silo Spoke VPC 10.200.0.0/20, p-finvault-silo',
    defaultDomain: 'L400 Multi-Tenant Hub-and-Spoke Network & VPC-SC Specification',
    previewImage: '/templates/canonical_79.png',
    keyComponents: ['Hub VPC 10.100.0.0/16 (BGP ASN 64512)', 'Cloud Armor WAF (mt-prod-waf-v4)', 'Global External ALB VIP (34.120.55.10 :443 HTTP/3)', 'Apigee X / AgentGateway PSC (10.100.1.0/28 :8443 gRPC)', 'Central KMS HSM & BigQuery FinOps Hub (10.100.8.0/24)', 'Pattern A Pooled Subnet (10.110.0.0/20) with AlloyDB FORCE RLS', 'Pattern B/C Dedicated Sovereign Silo VPC (10.200.0.0/20 • p-finvault-silo)'],
    generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => generateTemplate79L400MultiTenantHubSpokeNetworkSpecXml(domainFlavor, theme)
  },
  {
    id: '81',
    name: 'L400 Principal Sequence — OIDC JWT, SPIFFE mTLS, FW & VPC-SC (A2A & MCP)',
    family: 'Flow',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'Principal L400 sequence diagram (P3-APP-L-10) detailing 16 governed runtime interactions across User/Requestor, Gemini Enterprise, Coordinator Agent, Agent Gateway, Retrieval Specialist, Analytics Specialist, and Enterprise Data & Tools with grounded retrieval, governed analytics, and HITL review',
    examples: 'L400 Principal Sequence, OIDC JWT, SPIFFE mTLS, A2A Delegation, MCP Tool Execution, Grounded Retrieval, Governed Analytics, HITL Review Gate',
    defaultDomain: 'L400 Principal Sequence — A2A & MCP Runtime Governance',
    previewImage: '/templates/canonical_81.png',
    keyComponents: ['User / Requestor Lifeline', 'Gemini Enterprise Lifeline', 'Coordinator Agent Lifeline', 'Agent Gateway (Policy, Identity, Delegation Control)', 'Retrieval Specialist & Analytics Specialist Subagents', 'Enterprise Data & Tools (BigQuery, RAG Corpus, APIs)', 'ref: Grounded Retrieval & ref: Governed Analytics Frames', 'alt: HITL Review (Approve / Reject / Revise)'],
    generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => generateTemplate81L400PrincipalSequenceA2aMcpXml(domainFlavor, theme)
  },
  {
    id: '84',
    name: 'L400 Deep Technical Implementation — Oracle EBS R12.2 on Oracle Database@Google Cloud (Exadata X10M)',
    family: 'Reference Architectures',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'Official Google Cloud Architecture Center #78 (L400) reference implementation for Oracle E-Business Suite (EBS R12.2) on Google Cloud GCE C3 HA WebLogic & Cloud Filestore Enterprise NFSv4.1 connected via <0.5ms Dual 100GbE ODB Partner Interconnect to Co-Located OCI Child Site Exadata X10M 2-Node RAC, Smart Scan & Active Data Guard',
    examples: 'Oracle EBS R12.2 on Google Cloud, Oracle Database@Google Cloud Exadata X10M, ODB Partner Interconnect (<0.5ms), GCE C3 WebLogic & PCP, Cloud Filestore NFSv4.1 ADOP fs1/fs2, GoldenGate 23ai to BigQuery Cortex',
    defaultDomain: 'Oracle EBS R12.2 on Oracle Database@Google Cloud (Exadata X10M L400)',
    previewImage: '/templates/canonical_84.png',
    keyComponents: ['EBS R12.2 Enterprise Users (O2C, P2P, GL & Manufacturing)', 'Ingress, Hybrid BGP & ODB Routing Hub (10.20.0.0/16 • Cloud Armor, Cloud Router/DNS, IAP, Global ALB, ODB Partner Interconnect)', 'Security, KMS, GoldenGate 23ai & BigQuery Cortex Hub (10.20.20.0/24)', 'Zone 1: Google Cloud Customer VPC (EBS App Tier 10.20.1.0/24 • WebLogic 12c, GridLink, PCP, ADOP, Cloud Filestore NFSv4.1)', 'Zone 2: Co-Located OCI Child Site (Exadata X10M Tier 10.20.2.0/24 • ODB SCAN/Backup Subnets, 2-Node RAC, 100GbE RoCEv2 Smart Scan, Active Data Guard)'],
    generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => generateTemplate84L400OracleEbsExadataArchCenter78Xml(domainFlavor, theme)
  },
  {
    id: '85',
    name: 'G-01: C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform',
    family: 'Understand',
    level: 'L1',
    theme: 'light',
    primaryPurpose: 'C4 Level 1 System Context diagram mapping External Actors & Upstream Sources, Google Cloud / Gemini Enterprise PV AI Platform, and Downstream Safety DB & Regulatory Agencies',
    examples: 'C4 Level 1 System Context, BRD Context Diagram, SAD Context Diagram, Pharmacovigilance & AE AI Platform',
    defaultDomain: 'Pharmacovigilance & Adverse Event (AE) AI Platform',
    previewImage: '/templates/canonical_85.png',
    keyComponents: ['External AE Reporters & Clinical Reviewers', 'Pharmacovigilance & AE AI Platform (#4A86E8)', 'Multimodal AE Intake, Gemini Extraction & E2B(R3) Validation', 'Trust & Governance Strip (VPC-SC, CMEK, DLP, GAMP 5)', 'Safety DB of Record, FDA FAERS / EMA & WORM Archive'],
    generateXml: () => generateTemplate85G01C4SystemContextXml()
  },
  {
    id: '86',
    name: 'G-02: As-Is vs. To-Be BPMN 2.0 Process Swimlane — Adverse Event (ICSR) Case Processing',
    family: 'Process',
    level: 'L2',
    theme: 'light',
    primaryPurpose: 'Side-by-side BPMN 2.0 swimlane comparison contrasting the 7–10 day manual As-Is ICSR workflow (14% error) with the <12m Gemini Enterprise To-Be automated workflow (89% STP, <0.2% error)',
    examples: 'As-Is vs. To-Be BPMN 2.0 Process Swimlane, Parallel AND Gateway, Exclusive XOR Confidence Gate, 2h HITL SLA Timer',
    defaultDomain: 'BPMN 2.0 Adverse Event (ICSR) Case Processing',
    previewImage: '/templates/canonical_86.png',
    keyComponents: ['As-Is Legacy Manual ICSR Pool (7-10d Cycle, 14% Error)', 'To-Be Gemini Enterprise Automated Pool (<12m Cycle, 89% STP)', 'Parallel AND Fork/Join (OCR, MedDRA, DLP, Narrative)', 'Confidence >= 0.95 & Zero Seriousness XOR Gate', '2h SLA Timer + 21 CFR Part 11 Dual e-Signature HITL Queue'],
    generateXml: () => generateTemplate86G02BpmnSwimlaneXml()
  },
  {
    id: '87',
    name: 'G-03: Multi-Persona User Journey & OpenTelemetry Blueprint (Adverse Event Lifecycle)',
    family: 'Process',
    level: 'L2',
    theme: 'light',
    primaryPurpose: '5-stage multi-persona user journey and service blueprint correlating Patient/HCP Reporter, Drug Safety Associate, and QPPV Medical Reviewer touchpoints with Frontstage Apigee Edge and Backstage Gemini Enterprise + OpenTelemetry',
    examples: 'Multi-Persona User Journey, Service Blueprint, Frontstage vs Backstage, W3C traceparent, FIDO2 21 CFR Part 11 e-Sign',
    defaultDomain: 'Multi-Persona Adverse Event Lifecycle Journey',
    previewImage: '/templates/canonical_87.png',
    keyComponents: ['5 Lifecycle Stage Chevrons (Intake -> Ingestion -> Triage -> Review -> Submission)', 'Patient/HCP Reporter, Drug Safety Associate & QPPV Lanes', 'Frontstage API & Edge (Cloud Armor WAF, Apigee X FHIR, gRPC-Web)', 'Backstage Gemini Enterprise & OTel (W3C traceparent, AlloyDB ScaNN, Cloud KMS, BigQuery OTel Sink)'],
    generateXml: () => generateTemplate87G03UserJourneyOtelXml()
  },
  {
    id: '88',
    name: 'G-04: UML Use Case, IAM/RBAC & GxP Separation-of-Duties (SoD) Boundary',
    family: 'Security & Governance',
    level: 'L2',
    theme: 'light',
    primaryPurpose: 'Formal UML 2.5 Use Case diagram partitioning Intake, Triage, Approval, and Audit zones inside the VPC-SC & 21 CFR Part 11 boundary with OPA Rego Separation-of-Duties (SoD Rules 1–3) enforcement',
    examples: 'UML Use Case Diagram, <<include>> Dependencies, OPA Rego Policy Enforcement Point (PEP), GxP Separation of Duties',
    defaultDomain: 'GxP Separation-of-Duties & RBAC Use Case Boundary',
    previewImage: '/templates/canonical_88.png',
    keyComponents: ['5 Actors (External Reporter, Autonomous ADK Agent, DSA, QPPV Approver, QA GxP Auditor)', '4 Colored Security Zones (Intake, Triage, Approval, Audit)', '7 Use Case Ellipses with <<include>> Stereotypes', 'OPA Rego & IAM Policy Enforcement Point (SoD Rules 1, 2, 3)'],
    generateXml: () => generateTemplate88G04UmlUseCaseSodXml()
  },
  {
    id: '89',
    name: 'G-06: ADR Multi-Option Architecture Trade-Off & Quantitative Scoring Matrix (PV Platform)',
    family: 'Analysis & Planning',
    level: 'L2',
    theme: 'light',
    primaryPurpose: 'Architecture Decision Record (ADR) trade-off visual comparing Option A (GKE Monolith, 3.11/5.00), Option B (Selected: Cloud Run Gen2 + Pub/Sub Outbox + AlloyDB AI ScaNN + Gemini ADK, 4.71/5.00), and Option C (Active-Active Spanner, 3.10/5.00)',
    examples: 'ADR Option Comparison Sketch, Weighted Fitness Scoring Matrix, FinOps & Latency Trade-Off Analysis',
    defaultDomain: 'ADR Multi-Option Architecture Trade-Off Matrix',
    previewImage: '/templates/canonical_89.png',
    keyComponents: ['Option A: Regional Monolith on GKE + Cloud SQL ($4.8k/mo, 3.11/5.00)', 'Option B (SELECTED): Cloud Run Gen2 + Pub/Sub + AlloyDB AI ScaNN + Gemini ADK ($8.6k/mo, 4.71/5.00)', 'Option C: Multi-Region Active-Active GKE Mesh + Cloud Spanner ($32.5k/mo, 3.10/5.00)', '5-Criterion Quantitative Weighted Scoring Matrix (100% Weight)'],
    generateXml: () => generateTemplate89G06AdrTradeoffMatrixXml()
  },
  {
    id: '90',
    name: 'G-07: C4 Level 3 Internal Component & Hexagonal Interface Decomposition (ICSR Worker)',
    family: 'Structure',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'C4 Level 3 hexagonal component decomposition of the Cloud Run Gen2 Go 1.24 ICSR Worker across Inbound Driving Adapters, Port Interfaces, Domain & Application Core, and Outbound Driven Adapters',
    examples: 'C4 Level 3 Component Diagram, Hexagonal Ports & Adapters, Lollipop Interface Notation, Go 1.24 Cloud Run Worker',
    defaultDomain: 'Hexagonal C4 Level 3 Component Decomposition',
    previewImage: '/templates/canonical_90.png',
    keyComponents: ['Inbound Driving Adapters (gRPC/FHIR, Pub/Sub Push, A2A JSON-RPC 2.0)', 'Inbound Port Interfaces (IIcsrCommandPort, IEventIngestPort, IA2ATaskPort)', 'Domain & Application Core (Redis SETNX Lock, ADK Saga Coordinator, OPA/E2B XSD Validator, Context Manager)', 'Outbound Driven Adapters (Gemini 3.0 Pro, AlloyDB AI pgx, Apigee MCP/AS2, OpenTelemetry WORM Sink)'],
    generateXml: () => generateTemplate90G07C4ComponentHexagonalXml()
  },
  {
    id: '91',
    name: 'G-08: UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle',
    family: 'Process',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'Formal UML 2.5 ICSR case lifecycle statechart with composite AGENTIC_PROCESSING sub-states, transition guard conditions, and synchronized 7d/15d Regulatory SLA Clock Bar',
    examples: 'UML 2.5 Statechart, Composite Sub-States, Guard Conditions, Regulatory SLA Clock Formula & Progress Bar',
    defaultDomain: 'UML 2.5 ICSR Lifecycle State Machine & SLA Clock',
    previewImage: '/templates/canonical_91.png',
    keyComponents: ['Initial [*] -> INGESTED -> VALIDATED States', 'Composite AGENTIC_PROCESSING (DOC_AI_OCR -> ALLOYDB_MEDDRA_RAG -> GEMINI_CAUSALITY_EVAL -> E2B_R3_XSD_CHECK)', 'WAITING_CLINICAL_HITL -> SLA_ESCALATED_QPPV -> QPPV_SIGNED_SUBMITTED / AUTO_SUBMITTED_E2B / DLQ_QUARANTINED', 'Synchronized 4-Zone Regulatory SLA Clock Bar (Green 0-80%, Yellow Paused, Amber 80%, Red 100% Breach)'],
    generateXml: () => generateTemplate91G08UmlStateMachineSlaXml()
  },
  {
    id: '92',
    name: 'G-09: Formal Yourdon/DeMarco Data Flow Diagram (DFD Level 1 — PHI Tokenization & AE Lineage)',
    family: 'Flow',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'Classical Yourdon/DeMarco Level 1 Data Flow Diagram separating External Entities (Rectangles E1–E2), numbered Processes (Circles P1.0–P4.0), and open-ended Data Stores (Parallel Bars D1–D5) with PHI classification tags',
    examples: 'Yourdon/DeMarco DFD Level 1, PHI Surrogate Tokenization Lineage, Open-Ended Parallel Bar Data Stores',
    defaultDomain: 'Yourdon/DeMarco DFD Level 1 — PHI Tokenization & AE Lineage',
    previewImage: '/templates/canonical_92.png',
    keyComponents: ['External Entities E1 (Patient/HCP & FHIR) & E2 (FDA FAERS / EMA Gateway)', 'Numbered Process Circles P1.0 (Tokenize PHI), P2.0 (MedDRA RAG), P3.0 (Clinical Inference), P4.0 (21 CFR Part 11 e-Sign)', 'Open-Ended Parallel Data Stores D1 (Raw PHI Vault), D2 (Token Vault), D3 (ScaNN Index), D4 (ICSR Store), D5 (WORM Ledger)'],
    generateXml: () => generateTemplate92G09YourdonDfdXml()
  },
  {
    id: '93',
    name: 'G-10: Physical ERD & DDL Schema (AlloyDB for PostgreSQL 16 + AlloyDB AI ScaNN — PV Domain)',
    family: 'Structure',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'Physical Entity-Relationship Diagram (ERD) and PostgreSQL 16 DDL schema for AlloyDB & AlloyDB AI ScaNN detailing PK/FK types, monthly range partitioning, RLS policies, GIN/ScaNN indexes, and 21 CFR Part 11 append-only triggers',
    examples: 'Physical ERD & DDL Schema, AlloyDB for PostgreSQL 16, VECTOR(768) ScaNN Index, Crow’s Foot 1:N Notation',
    defaultDomain: 'AlloyDB PostgreSQL 16 & ScaNN Physical ERD Schema',
    previewImage: '/templates/canonical_93.png',
    keyComponents: ['tenants_sponsors (UUID PK, RLS sponsor_isolation_policy)', 'icsr_cases (UUID PK/FK, icsr_state_enum, PARTITION BY RANGE MONTHLY)', 'ae_source_documents (dlp_tokenized, surrogate_token_map JSONB)', 'part11_worm_audit_outbox (tr_enforce_21cfr11_append_only) & adk_clinical_inference_runs (idx_gin_e2b)', 'meddra_whodrug_vectors (VECTOR(768), idx_scann_meddra USING scann)'],
    generateXml: () => generateTemplate93G10PhysicalErdDdlXml()
  },
  {
    id: '94',
    name: 'G-01: L400 C4 Level 1 System Context — Pharmacovigilance & Adverse Event (AE) AI Platform',
    family: 'Structure',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'L400 physical & security-hardened C4 Level 1 System Context diagram detailing OAuth 2.1 DPoP, mTLS 1.3, BeyondCorp FIDO2 WebAuthn, VPC-SC restricted.googleapis.com, Model Armor, Gemini 2.5 Pro ADK, OPA Rego XSD validation, Enterprise Regulatory Vault SoR commit, AS2 MDN E2B(R3), Cloud Monitoring Alerting, and SecOps Chronicle WORM retention',
    examples: 'L400 C4 Level 1 System Context, VPC-SC restricted.googleapis.com, FIDO2 WebAuthn 21 CFR Part 11, AS2 MDN E2B(R3)',
    defaultDomain: 'L400 Pharmacovigilance & Adverse Event (AE) AI Platform Context',
    previewImage: '/templates/canonical_94.png',
    keyComponents: ['External Actors (OAuth 2.1 DPoP, mTLS 1.3, BeyondCorp FIDO2 WebAuthn, HL7 FHIR R4 over Partner Interconnect, Cloud Identity / WIF OIDC)', 'Google Cloud VPC-SC Platform (Multimodal AE Intake & Triage, Gemini 2.5 Pro Agentic Extraction & MedDRA Coding, ICH E2B(R3) Compliance & Causality Engine)', 'Trust & Governance Invariants (VPC-SC, Cloud KMS FIPS 140-3 Level 3 HSM CMEK, Cloud DLP CryptoHash/FPE, Cloud Monitoring Alerting, GAMP 5 Cat 4/5)', 'Downstream Regulators (Enterprise Regulatory Vault SoR, FDA FAERS / EMA / PMDA AS2 MDN, SecOps Chronicle & GCS WORM)'],
    generateXml: () => generateTemplate94G01L400C4ContextXml()
  },
  {
    id: '95',
    name: 'G-02: L400 As-Is vs. To-Be BPMN 2.0 Process Swimlane — ICSR Adverse Event Lifecycle',
    family: 'Process',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'L400 BPMN 2.0 dual-pool swimlane contrasting As-Is Legacy Manual ICSR Workflow (P99 Cycle: 7.4 Days, Touch Time: 185m, Error Rate: 14.2%, 38% Rework) against To-Be Gemini Enterprise ADK Automated Workflow (P99 Cycle: 9.8s, STP: 92.4%, Error Rate: 0.08%)',
    examples: 'L400 BPMN 2.0 Swimlane, P99 7.4d vs 9.8s Cycle Compression, 92.4% STP vs 7.6% QPPV HITL Boundary Timer',
    defaultDomain: 'L400 BPMN 2.0 As-Is vs. To-Be ICSR Adverse Event Lifecycle',
    previewImage: '/templates/canonical_95.png',
    keyComponents: ['As-Is Legacy Pool (AE Reporter -> Triage 72h SLA Timer -> Medical Reviewer 38% XOR Rework Loop -> Overnight SFTP Batch)', 'To-Be Gemini Enterprise ADK Pool (Eventarc/Apigee Ingress -> Parallel AND OCR + ScaNN MedDRA v27.1 + Gemini 3.0 Pro Narrative)', 'Model Armor, Cloud DLP FPE & OPA XSD Gate (Logprob >= 0.96 & Seriousness == False XOR Gateway)', 'Transactional Outbox & AS2 Gateway (92.4% STP) vs. QPPV Clinical HITL Exception Queue (7.6% 2h SLA Timer + FIDO2 Dual e-Sign)'],
    generateXml: () => generateTemplate95G02L400BpmnSwimlaneXml()
  },
  {
    id: '96',
    name: 'G-03: L400 Multi-Persona User Journey, OpenTelemetry & Gemini Enterprise Touchpoint Blueprint',
    family: 'Process',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'L400 5-stage multi-persona user journey and OpenTelemetry touchpoint blueprint across Patient/HCP Reporter, Drug Safety Associate (DSA), QPPV Medical Reviewer, Frontstage Edge & API Mesh, and Backstage Gemini ADK & OpenTelemetry with p99 latency budgets',
    examples: 'L400 Multi-Persona User Journey, W3C traceparent Propagation, EC-P384 KMS Signing, BigQuery OTel FinOps Sink',
    defaultDomain: 'L400 Multi-Persona User Journey & OpenTelemetry Touchpoint Blueprint',
    previewImage: '/templates/canonical_96.png',
    keyComponents: ['5 End-to-End Stages (Zero-Trust Auth & Intake -> Multimodal FHIR & Doc Ingestion -> Gemini ADK & ScaNN Triage -> QPPV Clinical Diff & Part 11 e-Sign -> AS2 E2B(R3) Release & WORM Audit)', '3 Clinical Personas (Patient/HCP Reporter p99 75ms/290ms, Drug Safety Associate gRPC-Web Stream, QPPV Medical Reviewer PAM JIT & FIDO2)', 'Frontstage Edge & API Mesh (Cloud CDN + Cloud Armor WAF, Apigee X FHIR R4 & Managed MCP, SSE Token Stream, If-Match ETag OCC, AS2 mTLS)', 'Backstage Gemini ADK & OpenTelemetry (W3C traceparent, Cloud DLP + Doc AI p99 410ms, Gemini 3.0 Pro + ScaNN p99 1.1s, KMS FIPS 140-3 EC-P384, BigQuery OTel FinOps p99 60ms)'],
    generateXml: () => generateTemplate96G03L400UserJourneyXml()
  },
  {
    id: '97',
    name: 'G-04: L400 UML Use Case, IAM/PAM & Agent Identity Separation-of-Duties (SoD) Boundary',
    family: 'Flow',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'L400 UML 2.5 Use Case & Separation-of-Duties (SoD) security boundary mapping 5 IAM/SPIFFE principals across 4 VPC-SC zones and an OPA Rego & GCP IAM CEL Policy Enforcement Point (PEP)',
    examples: 'L400 UML Use Case Diagram, SPIFFE Agent Identity SoD, OPA Rego & GCP IAM CEL Policy Enforcement Point (PEP)',
    defaultDomain: 'L400 UML Use Case, IAM/PAM & SPIFFE Agent Identity SoD Boundary',
    previewImage: '/templates/canonical_97.png',
    keyComponents: ['5 Principals (roles/pv.reporter, spiffe://gcp.pv.prod/ns/adk/sa/meddra-coder, roles/pv.dsa, roles/pv.qppv + PAM JIT 1h TTL, roles/logging.viewer)', '4 VPC-SC Security Zones (Zone 1 Intake, Zone 2 Agentic & DSA Triage, Zone 3 QPPV Approval, Zone 4 GxP Audit)', 'OPA Rego & GCP IAM CEL Policy Enforcement Point (SoD Invariant 1 Submitter != Approver, SoD Invariant 2 SPIFFE Denied Release, SoD Invariant 3 Mutually Exclusive IAM Groups)'],
    generateXml: () => generateTemplate97G04L400UmlUseCaseSodXml()
  },
  {
    id: '98',
    name: 'G-08: L400 UML 2.5 Finite State Machine, Guard Conditions & Regulatory SLA Clock Lifecycle',
    family: 'Process',
    level: 'L3',
    theme: 'light',
    primaryPurpose: 'L400 Hierarchical UML 2.5 ICSR Statechart detailing composite AGENTIC_PROCESSING sub-states, transition guard conditions, error/exception escalations, and the Synchronized Regulatory SLA Clock Formula & State Bar',
    examples: 'L400 UML 2.5 Hierarchical Statechart, Guard Conditions, Regulatory SLA Clock Formula & 4-Zone State Bar',
    defaultDomain: 'L400 UML 2.5 Hierarchical ICSR Statechart & Regulatory SLA Clock',
    previewImage: '/templates/canonical_98.png',
    keyComponents: ['Initial [*] -> INGESTED (initSLATimer) -> VALIDATED (fhirValid && dlpTokenized && modelArmorSafe)', 'Composite AGENTIC_PROCESSING (1. DOC_AI_OCR -> 2. ALLOYDB_SCANN_MEDDRA_RAG -> 3. GEMINI_3_CAUSALITY_EVAL -> 4. OPA_E2B_R3_XSD_CHECK)', 'Terminal & Escalation States (AUTO_SUBMITTED_E2B, WAITING_CLINICAL_HITL, SLA_ESCALATED_QPPV, QPPV_SIGNED_SUBMITTED, NULLIFIED_COMPENSATED, DLQ_QUARANTINED)', 'Synchronized Regulatory SLA Clock Formula & 4-Zone State Bar (Green 0-80%, Yellow Paused Clock-Stop, Amber 80% Soft Warning, Red 100% Breach)'],
    generateXml: () => generateTemplate98G08L400StateMachineSlaXml()
  }
];







const COMPANY_AND_VENDOR_REPLACEMENTS: [RegExp, string][] = [
  // Fictional Company Brands & Multi-Line / Spaced Variants
  [/\bNOVACURA\s+Bio-Pharma\s+Platform\b/gi, 'Core Platform Boundary'],
  [/\bNOVACURA\s+Enterprise\s+AI\s+Platform\s+for\s+Biopharma\b/gi, 'Enterprise Cloud &amp; AI Platform'],
  [/\bNOVACURA\s+Enterprise\s+AI\s+Platform\b/gi, 'Enterprise Cloud &amp; AI Platform'],
  [/\s*\(NOVA\s*CURA\)/gi, ''],
  [/\bNOVA\s*CURA\b/gi, 'Enterprise Platform'],
  [/\bNOVACURA\b/g, 'ENTERPRISE'],
  [/\bNovaCura\b/g, 'Enterprise'],
  [/\bnovacura-prod-vpc\b/gi, 'enterprise-prod-vpc'],
  [/\bnovacura-prod\b/gi, 'enterprise-prod'],
  [/\bnovacura\b/gi, 'enterprise'],
  [/\bNovacure\b/gi, 'Enterprise'],
  [/\bOMNIVUE\b/g, 'RETAIL MESH'],
  [/\bOmniVue\b/gi, 'Retail Mesh'],
  [/\bNEXUSFIN\b/g, 'FINTECH CORE'],
  [/\bNexusFin\b/gi, 'FinTech Core'],
  [/\bSYNACTIVE\b/g, 'INDUSTRIAL IOT'],
  [/\bSynactive\b/gi, 'Industrial IoT'],
  [/\bAETHER\b/g, 'SAAS CLOUD'],
  [/\bAether\b/gi, 'SaaS Cloud'],
  [/\bHEALTHPULSE\b/g, 'CLINICAL EHR'],
  [/\bHealthPulse\b/gi, 'Clinical EHR'],
  [/\bVOLTGRID\b/g, 'SMART GRID'],
  [/\bVoltGrid\b/gi, 'Smart Grid'],
  [/\bAUTODRIVE\b/g, 'AUTONOMOUS V2X'],
  [/\bAutoDrive\b/gi, 'Autonomous V2X'],
  [/\bTELCOMESH\b/g, '5G CORE RAN'],
  [/\bTelcoMesh\b/gi, '5G Core RAN'],
  [/\bAEROSHIELD\b/g, 'MISSION CLOUD'],
  [/\bAeroShield\b/gi, 'Mission Cloud'],
  [/\bCYBERSHIELD\b/g, 'ZERO TRUST SOC'],
  [/\bCyberShield\b/gi, 'Zero Trust SOC'],
  [/\bSTREAMWAVE\b/g, 'MEDIA EDGE'],
  [/\bStreamWave\b/gi, 'Media Edge'],
  [/\bPromptCanvas\b/gi, 'Enterprise Architecture Studio'],
  [/\bCharlie\s+Hills\b/gi, 'Enterprise Architecture Guide'],

  // AI Vendor & Proprietary Product Names
  [/\bCLAUDE\.md\b/gi, 'AGENTS.md'],
  [/\bClaude\s+Code\b/gi, 'CLI Coding Agent'],
  [/\bChatGPT\b/gi, 'Enterprise AI Assistant'],
  [/\bGPT-6\s+Astra\b/gi, 'Frontier Reasoning Model'],
  [/\bCodex\b/gi, 'Code Gen Engine'],
  [/\bAnthropic\b/gi, 'Frontier Safety Models'],
  [/\bOpenAI\b/gi, 'Foundation Model Hub'],
  [/\bCohere\b/gi, 'Enterprise Reranker'],
  [/\bHugging\s*Face\b/gi, 'Open-Weight Model Hub'],

  // Multi-Line / HTML-Wrapped Proprietary Enterprise & Cloud Vendor Names
  [/Veeva(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Vault/gi, 'Regulatory Document Vault'],
  [/\bVeeva\s+Vault\b/gi, 'Regulatory Document Vault'],
  [/\bVeeva\s+CRM\b/gi, 'Life Sciences CRM'],
  [/\bVeeva\b/gi, 'Regulatory Vault'],
  [/Regulatory\s+Vault(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Vault/gi, 'Regulatory Document Vault'],
  [/Clinical\s+Vault(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Vault/gi, 'Regulatory Document Vault'],
  [/\bCTMS\s*\/\s*Medidata\s+Rave\b/gi, 'Clinical Trial Management (CTMS)'],
  [/\bMedidata\s+Rave\b/gi, 'Clinical Trial Management (CTMS)'],
  [/\bMedidata\b/gi, 'Clinical Trial System'],
  [/\bArgus\s+Safety\b/gi, 'Pharmacovigilance Safety System'],
  [/\bArgus-like\b/gi, 'PV Safety System'],
  [/\bArgus\b/gi, 'Safety Database'],
  [/\bIQVIA\b/gi, 'Clinical Data Registry'],
  [/Salesforce(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Health\s+Cloud/gi, 'Patient Engagement CRM'],
  [/\bSalesforce\s+Health\s+Cloud\b/gi, 'Patient Engagement CRM'],
  [/\bSalesforce\s+Commerce\s+Cloud\b/gi, 'Omnichannel Commerce Engine'],
  [/\bSalesforce\b/gi, 'Enterprise CRM'],
  [/Enterprise\s+CRM(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Health\s+Cloud/gi, 'Patient Engagement CRM'],
  [/\bHubSpot\b/gi, 'Marketing Automation'],
  [/SAP(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+S\/4HANA/gi, 'Enterprise ERP Core'],
  [/\bSAP\s+S\/4HANA\b/gi, 'Enterprise ERP Core'],
  [/\bSAP\s+ERP\b/gi, 'Enterprise ERP'],
  [/\bSAP\b/g, 'Enterprise ERP'],
  [/Enterprise\s+ERP(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+S\/4HANA/gi, 'Enterprise ERP Core'],
  [/\bS\/4HANA\b/gi, 'ERP Core'],
  [/\bServiceNow\b/gi, 'Enterprise ITSM'],
  [/\bWorkday\b/gi, 'Enterprise HCM'],
  [/\bSharePoint\b/gi, 'Document Portal'],
  [/\bConfluence\b/gi, 'Knowledge Wiki'],
  [/\bJira\b/gi, 'Issue Tracker'],
  [/\bNotion\b/gi, 'Workspace Docs'],
  [/\bSlack\s*\/\s*Teams\b/gi, 'Enterprise ChatOps'],
  [/\bSlack\b/gi, 'Team ChatOps'],
  [/\bDatadog\b/gi, 'APM Telemetry Suite'],
  [/\bSplunk\b/gi, 'Security Log SIEM'],
  [/\bNew\s*Relic\b/gi, 'APM Observability'],
  [/\bDynatrace\b/gi, 'Distributed Tracing APM'],
  [/\bCrowdStrike\b/gi, 'Endpoint EDR Sensor'],
  [/\bOkta\b/gi, 'Enterprise SSO IdP'],
  [/\bAuth0\b/gi, 'Customer CIAM Provider'],
  [/\bCyberArk\b/gi, 'Privileged Access PAM'],
  [/\bSailPoint\b/gi, 'Identity Governance IGA'],
  [/\bSnowflake\b/gi, 'Cloud Data Warehouse'],
  [/\bDatabricks\b/gi, 'Lakehouse Spark Engine'],
  [/\bCollibra\b/gi, 'Enterprise Data Catalog'],
  [/\bAlation\b/gi, 'Metadata Governance'],
  [/\bInformatica\b/gi, 'Enterprise ETL Integration'],
  [/\bFivetran\b/gi, 'Managed CDC Connectors'],
  [/\bMuleSoft\b/gi, 'Enterprise ESB Mediation'],
  [/\bBoomi\b/gi, 'Cloud iPaaS Connectors'],
  [/\bStripe\b/gi, 'Payment Tokenization Vault'],
  [/\bAdyen\b/gi, 'Global Payment Acquirer'],
  [/\bPlaid\b/gi, 'Open Banking Aggregator'],
  [/\bBloomberg\b/gi, 'Institutional Market Feed'],
  [/\bRefinitiv\b/gi, 'Real-Time Pricing Feed'],
  [/\bApex\s*•\s*Pershing\s*•\s*Interactive\s+Brokers\b/gi, 'Institutional Prime Custody &amp; Clearing'],
  [/\bPershing\b/gi, 'Prime Clearing'],
  [/\bInteractive\s+Brokers\b/gi, 'Execution Broker'],
  [/\bEpic\s*\/\s*Cerner\b/gi, 'Hospital EHR Core'],
  [/\bCerner\b/gi, 'Clinical EHR'],
  [/\bTesla\s+Megapack\b/gi, 'Utility Grid BESS'],
  [/\bSendGrid\b/gi, 'Transactional Email Relay'],
  [/\bBackstage\b/gi, 'Developer Portal'],
  [/\bSonarQube\b/gi, 'Static Code Analysis'],
  [/\bKubecost\b/gi, 'K8s Cost Allocation'],
  [/\bXero\b/gi, 'Ledger'],
  [/\bFigma\b/gi, 'Design Canvas'],
  [/\bCanva\b/gi, 'Visual Studio'],

  // Redundant Header / Container Platform Brand Phrases
  [/\s*\|\s*(?:Enterprise\s+Bio-Pharma\s+Platform|Enterprise\s+Architecture\s+Platform|Core\s+Platform\s+Boundary)/gi, ''],
  [/\s*—\s*(?:ENTERPRISE\s+ARCHITECTURE\s+PLATFORM|ENTERPRISE\s+CLOUD\s+BIO-PHARMA\s+PRODUCT|ENTERPRISE\s+BIO-PHARMA\s+PRODUCT|ENTERPRISE\s+PLATFORM\s+BIO-PHARMA\s+PRODUCT)/gi, ''],
  [/\b07\s+07\s*—/g, '07 —'],
  [/\b08\s+08\s*—/g, '08 —'],
  [/Use\s+Case:\s*(?:Enterprise(?:\s+Cloud|\s+Platform)?|Regulatory\s+Intelligence\s+Platform)\s*(?:&ndash;|[–—-])\s*/gi, 'Architecture Scope: '],
  [/\bEnterprise\s+Platform\s*[–—-]\s*Enterprise\s+AI\s+Platform\s+for\s+Biopharma\b/gi, 'Multi-Region Cloud-Native Runtime &amp; Workload Topology'],
  [/\bENTERPRISE(?:\s+CLOUD|\s+PLATFORM)?\s+BIO-PHARMA\s+PLATFORM\b/gi, 'CORE SYSTEM BOUNDARY (SYSTEM IN SCOPE)'],
  [/\bBIO-PHARMA\s+PLATFORM\b/gi, 'CORE SYSTEM BOUNDARY (SYSTEM IN SCOPE)'],
  [/\bENTERPRISE(?:\s+PLATFORM)?\s*—\s*COMPONENT\s+ARCHITECTURE\b/gi, 'CORE APPLICATION COMPONENT BOUNDARY'],
  [/\bENTERPRISE(?:\s+CLOUD|\s+PLATFORM)?\s+PLATFORM\s*\((?:GOOGLE|ENTERPRISE)\s+CLOUD\)/gi, 'CORE DATA &amp; STREAMING PLATFORM BOUNDARY'],
  [/\bEnterprise\s+Platform\s+PLATFORM\s+SERVICES(?:\s*\(Enterprise\s+Cloud\))?/gi, 'CORE PLATFORM &amp; DATA SERVICES'],
  [/\bEnterprise\s+Platform\s+DIGITAL\s+PLATFORM\b/gi, 'UNIFIED CLOUD-NATIVE DIGITAL PLATFORM'],
  [/\bEnterprise\s+Cloud\s+OBSERVABILITY\s+PIPELINE\b/gi, 'UNIFIED TELEMETRY &amp; OBSERVABILITY PIPELINE'],
  [/\bEnterprise\s+Cloud\s*[–—-]\s*TRUSTED\s+ZONE\b/gi, 'PRIVATE CLOUD TRUSTED ZONE'],
  [/\bEnterprise\s+Platform-prod-vpc\b/gi, 'prod-core-vpc'],
  [/\bEnterprise\s+Platform-prod\b/gi, 'core-prod-host'],
  [/\bEnterprise\s+Platform\s+AI\s+Copilot\b/gi, 'Governed AI Copilot Runtime'],
  [/\bEnterprise\s+Platform\s+platform\b/gi, 'mission-critical workloads'],
  [/\bEnterprise\s+Platform\s+microservices\b/gi, 'cloud-native microservices'],
  [/\bacross\s+Enterprise\s+Platform\b/gi, 'across all trust zones and system boundaries'],
  [/\bApplication:\s*Enterprise\s+Platform\b/gi, 'Scope: Core Production Workloads'],
  [/\bEnterprise\s+Platform(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)*\(Prod\)/gi, 'Production Target&lt;br/&gt;(Prod)'],
  [/\bEnterprise\s+Platform\s+FinOps\s+Framework\b/gi, 'Cloud FinOps Governance Framework'],
  [/\bfor\s+Enterprise\s+Platform\b/gi, 'Across Architecture Patterns'],
  [/\bEnterprise\s+Platform(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)*Foundation\b/gi, 'Multi-Region Shared VPC&lt;br/&gt;Foundation'],
  [/&amp;copy;\s*2026\s*Enterprise\s+Platform/gi, 'Zero-Trust mTLS • 21 CFR Part 11'],
  [/\bEnterprise\s+Architecture\s+Platform\b/gi, 'Canonical Domain Architecture &amp; System Specification'],
  [/\b06\s*\|\s*Enterprise\s+Grounding\b/gi, '06 — Knowledge Grounding'],
  [/\bEDITORIAL\s+NEWSLETTER\s+(?:TECHNICAL\s+)?INFOGRAPHIC(?:\s+POSTER)?\b/gi, 'ENTERPRISE ARCHITECTURE BLUEPRINT'],
  [/\bEditorial\s+newsletter\s+infographic\b/gi, 'Enterprise Architecture Blueprint'],
  [/\bTECHNOLOGY\s+STACK\s*\((?:GOOGLE|ENTERPRISE)\s+CLOUD\)/gi, 'ENTERPRISE DATA &amp; AI TECHNOLOGY STACK'],
  [/\b(?:GOOGLE|ENTERPRISE\s+CLOUD)\s+TECHNOLOGY\s+MAPPING\b/gi, 'CLOUD-NATIVE INFRASTRUCTURE &amp; RUNTIME MAPPING'],
  [/\bENTERPRISE(?:\s+CLOUD|\s+PLATFORM)?\s*[–—-]\s*DEPENDENCY\s+MAP\s*\(HIGH\s+LEVEL\)/gi, 'CORE SYSTEM DEPENDENCY TOPOLOGY'],
  [/\bEnterprise\s+Cloud\s*\|\s*(?=Unified\s+)/gi, ''],
];

const REDUNDANT_BRAND_CELL_IDS = new Set([
  'hdr_brand',
  'brand_block',
  'logo_box',
  'plat_brand',
  'ftr_brand',
  'ftr_brand_gcp',
  'sb_gcp_bottom',
  'bot_gcp_block',
  'brand66',
  'leg_copy',
]);

const RAW_UNICODE_EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{23F0}-\u{23FA}]/gu;

const CIRCLED_DIGIT_MAP: Record<string, string> = {
  '❶': '1', '❷': '2', '❸': '3', '❹': '4', '❺': '5',
  '❻': '6', '❼': '7', '❽': '8', '❾': '9', '❿': '10',
  '⓫': '11', '⓬': '12', '⓭': '13', '⓮': '14', '⓯': '15',
  '⓰': '16', '⓱': '17', '⓲': '18', '⓳': '19', '⓴': '20',
  '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5',
  '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9', '⑩': '10',
};

function getContextualInlineSvgEscaped(plainText: string, isDark = false): string {
  const t = plainText.toLowerCase();
  const stroke = isDark ? '#38BDF8' : '#1D4ED8';
  if (/user|scientist|specialist|patient|hcp|investigator|operator|admin|actor|team|council|board|committee|partner|consumer/.test(t)) {
    return `&lt;svg width=&quot;14&quot; height=&quot;14&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;${stroke}&quot; stroke-width=&quot;2.2&quot; style=&quot;vertical-align:middle;display:inline-block;&quot;&gt;&lt;circle cx=&quot;12&quot; cy=&quot;8&quot; r=&quot;4&quot;/&gt;&lt;path d=&quot;M4 20c0-4 4-6 8-6s8 2 8 6&quot;/&gt;&lt;/svg&gt;`;
  }
  if (/security|iam|auth|zero trust|kms|secret|shield|armor|dlp|privacy|compliance|gxp|audit|policy|guardrail|governance/.test(t)) {
    const col = isDark ? '#34D399' : '#0D9488';
    return `&lt;svg width=&quot;14&quot; height=&quot;14&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;${col}&quot; stroke-width=&quot;2.2&quot; style=&quot;vertical-align:middle;display:inline-block;&quot;&gt;&lt;path d=&quot;M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z&quot;/&gt;&lt;path d=&quot;M9 12l2 2 4-4&quot;/&gt;&lt;/svg&gt;`;
  }
  if (/ai|llm|agent|copilot|rag|vector|embedding|model|ml|semantic|inference|search|knowledge/.test(t)) {
    const col = isDark ? '#C084FC' : '#7C3AED';
    return `&lt;svg width=&quot;14&quot; height=&quot;14&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;${col}&quot; stroke-width=&quot;2.2&quot; style=&quot;vertical-align:middle;display:inline-block;&quot;&gt;&lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;3&quot;/&gt;&lt;path d=&quot;M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4&quot;/&gt;&lt;/svg&gt;`;
  }
  if (/data|database|warehouse|lake|storage|spanner|sql|postgres|table|mart|historian|lims|ctms|erp|crm|vault|document/.test(t)) {
    const col = isDark ? '#38BDF8' : '#0284C7';
    return `&lt;svg width=&quot;14&quot; height=&quot;14&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;${col}&quot; stroke-width=&quot;2.2&quot; style=&quot;vertical-align:middle;display:inline-block;&quot;&gt;&lt;ellipse cx=&quot;12&quot; cy=&quot;5&quot; rx=&quot;8&quot; ry=&quot;3&quot;/&gt;&lt;path d=&quot;M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5&quot;/&gt;&lt;path d=&quot;M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3&quot;/&gt;&lt;/svg&gt;`;
  }
  if (/api|gateway|event|pubsub|stream|kafka|mqtt|opc|network|vpc|interconnect|load|routing|webhook|sync/.test(t)) {
    const col = isDark ? '#FB923C' : '#EA580C';
    return `&lt;svg width=&quot;14&quot; height=&quot;14&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;${col}&quot; stroke-width=&quot;2.2&quot; style=&quot;vertical-align:middle;display:inline-block;&quot;&gt;&lt;rect x=&quot;2&quot; y=&quot;9&quot; width=&quot;6&quot; height=&quot;6&quot; rx=&quot;1&quot;/&gt;&lt;rect x=&quot;16&quot; y=&quot;4&quot; width=&quot;6&quot; height=&quot;6&quot; rx=&quot;1&quot;/&gt;&lt;rect x=&quot;16&quot; y=&quot;14&quot; width=&quot;6&quot; height=&quot;6&quot; rx=&quot;1&quot;/&gt;&lt;path d=&quot;M8 12h4m0 0V7h4m-4 5v5h4&quot;/&gt;&lt;/svg&gt;`;
  }
  return `&lt;svg width=&quot;14&quot; height=&quot;14&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;${stroke}&quot; stroke-width=&quot;2.2&quot; style=&quot;vertical-align:middle;display:inline-block;&quot;&gt;&lt;polygon points=&quot;12 2 21 7 21 17 12 22 3 17 3 7&quot;/&gt;&lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;2.5&quot;/&gt;&lt;/svg&gt;`;
}

function getContextualTechnicalSubcaption(plainText: string): string {
  const t = plainText.toLowerCase();
  if (/r&d|clinical/.test(t)) return 'CDISC ODM • eCRF • Trial Oversight';
  if (/regulatory/.test(t)) return 'eCTD M1–M5 • IDMP • Submission Gateway';
  if (/safety|pharmacovigilance/.test(t)) return 'E2B(R3) ICSR • Signal Detection • MedDRA';
  if (/quality|manufacturing/.test(t)) return '21 CFR Part 11 • Batch Release • CAPA';
  if (/medical/.test(t)) return 'Scientific Evidence • Medical Inquiry SLA';
  if (/commercial|market/.test(t)) return 'Omnichannel KPI • Forecasting • Real-World Data';
  if (/document|content|hub/.test(t)) return 'Versioned SOPs • KMS Encrypted • Audit Trail';
  if (/copilot|agent|ai|llm/.test(t)) return 'Grounded RAG • Policy Guardrails • Citations';
  if (/web|mobile|portal/.test(t)) return 'React SSR • OIDC / mTLS • &lt;50ms Edge P99';
  if (/dashboard|bi|analytics|reporting/.test(t)) return 'Semantic Marts • Real-Time KPIs • Row-Level ACL';
  if (/notebook|science/.test(t)) return 'Managed Jupyter • Feature Store • GPU Runtime';
  if (/partner|external|supplier|logistics/.test(t)) return 'mTLS API Gateway • AS2 / SFTP • OAuth 2.0';
  if (/ingestion|stream|event|pubsub/.test(t)) return 'CDC / Managed Kafka / Pub/Sub • Schema Registry • DLQ';
  if (/workflow|orchestration|automation/.test(t)) return 'Stateful DAGs • Retry Backoff • HITL Gates';
  if (/search|discovery|vector/.test(t)) return 'Hybrid BM25 + HNSW • Cosine Top-K • &lt;25ms';
  if (/plc|scada|cnc|robot|sensor|camera|hmi|line/.test(t)) return 'OPC-UA / Modbus TCP • 10ms Poll • Edge Buffer';
  if (/edge|collector|historian|offline/.test(t)) return 'Local Time-Series • Store &amp; Forward • mTLS';
  if (/mes|schedule|work order|asset|oee|recipe|traceability/.test(t)) return 'ISA-95 Level 3 • Real-Time OEE • Genealogy';
  if (/erp|wms|plm|crm/.test(t)) return 'IDoc / REST Sync • Master Data • ACID Ledger';
  if (/gke|container|kubernetes|cloud run|compute/.test(t)) return 'Auto-Scaling Pods • Binary Auth • Mesh mTLS';
  if (/iam|identity|sso|rbac|zero trust/.test(t)) return 'OIDC / SAML 2.0 • Least Privilege • JIT Access';
  if (/vpc|interconnect|network|dns|firewall/.test(t)) return 'Private Service Connect • BGP HA • Cloud WAF';
  return 'HA Active-Active • mTLS • Telemetry &amp; Audit';
}

function sanitizeAndHealCanonicalBlueprintXml(xml: string, templateId?: string): string {
  if (!xml) return '';
  let out = xml.replace(/<!--[\s\S]*?-->/g, '');

  // 0. Strip redundant brand / company logo cells (hdr_brand, header_logo, brand_block, etc.)
  out = out.replace(/<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g, (fullMatch, attrs: string) => {
    const idMatch = /\bid="([^"]+)"/i.exec(attrs);
    if (idMatch && REDUNDANT_BRAND_CELL_IDS.has(idMatch[1])) {
      return '';
    }
    return fullMatch;
  });

  // 1. Normalize double-escaped HTML entities and convert HTML-only named entities to valid XML Unicode/numeric entities
  out = out
    .replace(/&amp;amp;/g, '&amp;')
    .replace(/&amp;lt;/g, '&lt;')
    .replace(/&amp;gt;/g, '&gt;')
    .replace(/&amp;quot;/g, '&quot;')
    .replace(/&amp;#39;/g, '&#39;')
    .replace(/&(?:amp;)?ndash;/g, '–')
    .replace(/&(?:amp;)?mdash;/g, '—')
    .replace(/&(?:amp;)?bull;/g, '•')
    .replace(/&(?:amp;)?rarr;/g, '→')
    .replace(/&(?:amp;)?nbsp;/g, '&#160;');

  // 2. Scrub 100% of company, vendor, creator, and redundant platform brand names inside value/name/agent/id/source/target attributes
  out = out.replace(/\b(value|name|agent|id|source|target)="([^"]*)"/g, (_m, attrName: string, attrVal: string) => {
    let cleaned = attrVal;
    for (const [pattern, replacement] of COMPANY_AND_VENDOR_REPLACEMENTS) {
      cleaned = cleaned.replace(pattern, replacement);
    }
    return `${attrName}="${cleaned}"`;
  });

  // Ensure no bare ampersands remain in XML after replacements
  out = out.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;');

  // 3. Convert circled Unicode step numbers (❶-⓴ / ①-⑩) to clean ASCII digits and strip raw Unicode emojis
  out = out.replace(/[❶❷❸❹❺❻❼❽❾❿⓫⓬⓭⓮⓯⓰⓱⓲⓳⓴①②③④⑤⑥⑦⑧⑨⑩]/g, (ch) => CIRCLED_DIGIT_MAP[ch] || '');
  out = out.replace(RAW_UNICODE_EMOJI_RE, '');

  // 4. Upgrade sub-8px micro-fonts to 8px minimum for crisp readability
  out = out.replace(/fontSize=(?:[567](?:\.\d+)?)\b/gi, 'fontSize=8');
  out = out.replace(/font-size:\s*[567](?:\.\d+)?px/gi, 'font-size:8px');

  // 5. Parse vertices so we can promote empty background containers and auto-bind floating edges
  interface ParsedVertex {
    id: string;
    parent: string;
    x: number;
    y: number;
    w: number;
    h: number;
    value: string;
  }
  const topVertices: ParsedVertex[] = [];
  const vertexGeomMap = new Map<string, { x: number; y: number; w: number; h: number }>();
  const allVertexIds = new Set<string>();
  const cellScanRe = /<mxCell\b((?:[^>"']|"[^"]*"|'[^']*')*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g;
  let cm: RegExpExecArray | null;
  let existingEdgeCount = 0;

  while ((cm = cellScanRe.exec(out)) !== null) {
    const attrs = cm[1];
    const body = cm[2] || '';
    const getA = (n: string) => new RegExp(`\\b${n}="([^"]*)"`, 'i').exec(attrs)?.[1] || '';
    const id = getA('id');
    if (!id || id === '0' || id === '1') continue;
    if (getA('edge') === '1') {
      existingEdgeCount++;
      continue;
    }
    if (getA('vertex') !== '1') continue;
    allVertexIds.add(id);
    const parent = getA('parent') || '1';
    const value = getA('value');
    const gm = /<mxGeometry\b([^>]*)/i.exec(body);
    if (gm) {
      const getG = (n: string) => parseFloat(new RegExp(`\\b${n}="([^"]*)"`, 'i').exec(gm[1])?.[1] || '0');
      const w = getG('width');
      const h = getG('height');
      const x = getG('x');
      const y = getG('y');
      vertexGeomMap.set(id, { x, y, w, h });
      if (w > 0 && h > 0 && parent === '1') {
        topVertices.push({ id, parent, x, y, w, h, value });
      }
    }
  }

  const findNearestTopVertex = (px: number, py: number, excludeId?: string): ParsedVertex | undefined => {
    // Prefer functional vertices (non-empty value or sequence activation bar, non-container dimensions) over background zones
    const functional = topVertices.filter(
      (v) =>
        v.id !== excludeId &&
        (v.value.trim().length > 0 || /^act_/i.test(v.id)) &&
        v.w <= 480 &&
        v.h <= 560 &&
        !/^(?:poster_bg|bg_|main_.*_canvas|zone_|tier_|layer_|sec\d+_bg|box_r_|frame_)/i.test(v.id)
    );
    const nonCanvas = topVertices.filter(
      (v) => v.id !== excludeId && v.w < 1100 && v.h < 560 && (v.value.trim().length > 0 || /^act_/i.test(v.id))
    );
    const pool =
      functional.length >= 2
        ? functional
        : nonCanvas.length >= 2
          ? nonCanvas
          : topVertices.filter((v) => v.id !== excludeId);
    let best: ParsedVertex | undefined;
    let bestDist = Infinity;
    for (const v of pool) {
      const dx = px < v.x ? v.x - px : px > v.x + v.w ? px - (v.x + v.w) : 0;
      const dy = py < v.y ? v.y - py : py > v.y + v.h ? py - (v.y + v.h) : 0;
      const d = dx * dx + dy * dy;
      if (d < bestDist || (d === bestDist && best && v.w * v.h < best.w * best.h)) {
        bestDist = d;
        best = v;
      }
    }
    return best;
  };

  const isDarkXml = out.includes('background="#0B111E"') || out.includes('background="#0F172A"');

  // 6. Heal each <mxCell> tag in place:
  //    - Replace stripped bullets (●) and empty icon spans with context-aware inline vector SVGs
  //    - Auto-enrich sparse functional cards with technical sub-captions
  //    - Normalize colon typos in style attribute (fontColor:# -> fontColor=#)
  //    - Vertex with text: ensure html=1;whiteSpace=wrap; and borderless text;strokeColor=none;fillColor=none; when no fill/stroke/shape is set
  //    - Empty background vertex: ensure container=1;pointerEvents=0;
  //    - Labeled edge: ensure labelBackgroundColor=#FFFFFF; (or #0F172A for dark mode)
  //    - Dangling/floating edge: bind source & target with exact exitX/exitY/exitPerimeter=0
  out = out.replace(/<mxCell\b((?:[^>"']|"[^"]*"|'[^']*')*?)(\/>|>([\s\S]*?)<\/mxCell>)/g, (fullMatch, attrs: string, tail: string, innerBody?: string) => {
    const getA = (n: string) => new RegExp(`\\b${n}="([^"]*)"`, 'i').exec(attrs)?.[1] || '';
    const id = getA('id');
    if (!id || id === '0' || id === '1') return fullMatch;

    const isVertex = getA('vertex') === '1';
    const isEdge = getA('edge') === '1';
    let val = getA('value');
    let style = getA('style').replace(/\b(fontColor|fillColor|strokeColor|fontSize|fontStyle):/gi, '$1=');

    if (isVertex) {
      if (val.trim().length > 0) {
        const decodedVal = val
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&bull;/g, '•')
          .replace(/&#160;/g, ' ')
          .replace(/&amp;/g, '&');

        const plainText = decodedVal
          .replace(/<style[\s\S]*?<\/style>/gi, ' ')
          .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/●/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        const inlineSvg = getContextualInlineSvgEscaped(plainText, isDarkXml);

        // Replace ● or empty icon spans/divs (both escaped &lt;...&gt; and raw <...>) with crisp vector SVG icon
        val = val
          .replace(
            /&lt;span\b(?:(?!&gt;)[\s\S])*?font-size:\s*\d+(?:\.\d+)?px(?:(?!&gt;)[\s\S])*?&gt;\s*(?:●)?\s*&lt;\/span&gt;/gi,
            inlineSvg
          )
          .replace(
            /<span\b[^>]*?font-size:\s*\d+(?:\.\d+)?px[^>]*?>\s*(?:●)?\s*<\/span>/gi,
            inlineSvg
          )
          .replace(
            /&lt;span\b(?:(?!width:|height:|background|border|&gt;)[\s\S])*?&gt;\s*(?:●)?\s*&lt;\/span&gt;/gi,
            inlineSvg
          )
          .replace(
            /<span\b(?:(?!width:|height:|background|border|>)[\s\S])*?>\s*(?:●)?\s*<\/span>/gi,
            inlineSvg
          )
          .replace(
            /&lt;div\b(?:(?!&gt;)[\s\S])*?font-size:\s*\d+(?:\.\d+)?px(?:(?!&gt;)[\s\S])*?&gt;\s*(?:●)?\s*&lt;\/div&gt;/gi,
            `&lt;div style=&quot;margin-bottom:2px;display:inline-flex;align-items:center;&quot;&gt;${inlineSvg}&lt;/div&gt;`
          )
          .replace(
            /<div\b[^>]*?font-size:\s*\d+(?:\.\d+)?px[^>]*?>\s*(?:●)?\s*<\/div>/gi,
            `&lt;div style=&quot;margin-bottom:2px;display:inline-flex;align-items:center;&quot;&gt;${inlineSvg}&lt;/div&gt;`
          )
          .replace(/●\s*/g, `${inlineSvg} `);

        if (!/\bhtml=1\b/i.test(style)) style = `html=1;${style}`;
        if (!/\bwhiteSpace=wrap\b/i.test(style)) style = `whiteSpace=wrap;${style}`;
        if (
          !/\b(?:fillColor=#|fillColor=none|strokeColor=#|strokeColor=none|shape=)/i.test(style)
        ) {
          if (!/\btext\b/i.test(style)) style = `text;${style}`;
          style = `strokeColor=none;fillColor=none;${style}`;
        }
      } else {
        if (!/\bcontainer=1\b/i.test(style)) style = `container=1;pointerEvents=0;${style}`;
      }
      const newAttrs = attrs
        .replace(/\bvalue="[^"]*"/i, () => `value="${val}"`)
        .replace(/\bstyle="[^"]*"/i, () => `style="${style}"`);
      return `<mxCell${newAttrs}${tail}`;
    }

    if (isEdge) {
      let newAttrs = attrs;
      let newTail = tail;
      if (isDarkXml) {
        style = style
          .replace(/labelBackgroundColor=#(?:FFFFFF|FFF)\b/gi, 'labelBackgroundColor=#0F172A')
          .replace(/labelBorderColor=#(?:CBD5E1|E2E8F0)\b/gi, 'labelBorderColor=#334155')
          .replace(/fontColor=#0F172A\b/gi, 'fontColor=#F8FAFC');
        if (val.includes('color:#0F172A') || val.includes('color: #0F172A')) {
          val = val.replace(/color:\s*#0F172A/gi, 'color:#F8FAFC');
          newAttrs = newAttrs.replace(/\bvalue="[^"]*"/i, () => `value="${val}"`);
        }
        // Clean channel routing for #72/#73/#74 cross-tier return edges
        if (id === 'flow_11' && newTail.includes('x="320" y="817"')) {
          style = style.replace(/exitX=0\.5;exitY=0;[^;]*;[^;]*;entryX=0\.5;entryY=1;[^;]*;[^;]*;/i, 'exitX=0;exitY=0.3;exitDx=0;exitDy=0;entryX=1;entryY=0.7;entryDx=0;entryDy=0;');
          newTail = newTail.replace(/<Array as="points">\s*<mxPoint x="500" y="817"\s*\/>\s*<mxPoint x="320" y="817"\s*\/>\s*<\/Array>/i, '<Array as="points"><mxPoint x="470" y="805" /><mxPoint x="470" y="577" /></Array>');
        } else if (id === 'flow_2' && newTail.includes('x="1130" y="295"')) {
          style = style.replace(/exitX=0;exitY=0\.5;[^;]*;[^;]*;entryX=0\.5;entryY=0;[^;]*;[^;]*;/i, 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;');
          newTail = newTail.replace(/<Array as="points">\s*<mxPoint x="1130" y="295"\s*\/>\s*<mxPoint x="680" y="295"\s*\/>\s*<\/Array>/i, '<Array as="points"><mxPoint x="1130" y="218" /><mxPoint x="680" y="218" /></Array>');
        } else if (id === 'flow_12' && newTail.includes('x="290" y="817"')) {
          style = style.replace(/exitX=0\.5;exitY=0;[^;]*;[^;]*;entryX=0\.5;entryY=1;[^;]*;[^;]*;/i, 'exitX=0;exitY=0.3;exitDx=0;exitDy=0;entryX=1;entryY=0.7;entryDx=0;entryDy=0;');
          newTail = newTail.replace(/<Array as="points">\s*<mxPoint x="460" y="817"\s*\/>\s*<mxPoint x="290" y="817"\s*\/>\s*<\/Array>/i, '<Array as="points"><mxPoint x="420" y="805" /><mxPoint x="420" y="580" /></Array>');
        }
      }
      if (val.trim().length > 0 && !/labelBackgroundColor=#([0-9a-f]{3,6}|fff|ffffff)/i.test(style)) {
        style = isDarkXml
          ? `labelBackgroundColor=#0F172A;${style}`
          : `labelBackgroundColor=#FFFFFF;fontColor=#0F172A;${style}`;
      }

      const src = getA('source');
      const tgt = getA('target');
      const hasValidSrc = Boolean(src && allVertexIds.has(src));
      const hasValidTgt = Boolean(tgt && allVertexIds.has(tgt));

      if (!hasValidSrc || !hasValidTgt) {
        const bodyStr = innerBody || '';
        const spm = /<mxPoint\b[^>]*\bas="sourcePoint"[^>]*>/i.exec(bodyStr) || /<mxPoint\b[^>]*x="[^"]*"[^>]*y="[^"]*"[^>]*\bas="sourcePoint"/i.exec(bodyStr);
        const tpm = /<mxPoint\b[^>]*\bas="targetPoint"[^>]*>/i.exec(bodyStr) || /<mxPoint\b[^>]*x="[^"]*"[^>]*y="[^"]*"[^>]*\bas="targetPoint"/i.exec(bodyStr);
        const parsePt = (tag?: string) => {
          if (!tag) return { x: 200, y: 200 };
          const xm = /\bx="([^"]*)"/i.exec(tag);
          const ym = /\by="([^"]*)"/i.exec(tag);
          return { x: xm ? parseFloat(xm[1]) : 200, y: ym ? parseFloat(ym[1]) : 200 };
        };
        const sPt = parsePt(spm?.[0]);
        const tPt = parsePt(tpm?.[0]);

        const vSrc = hasValidSrc ? topVertices.find((v) => v.id === src) || findNearestTopVertex(sPt.x, sPt.y) : findNearestTopVertex(sPt.x, sPt.y);
        const vTgt = hasValidTgt ? topVertices.find((v) => v.id === tgt) || findNearestTopVertex(tPt.x, tPt.y, vSrc?.id) : findNearestTopVertex(tPt.x, tPt.y, vSrc?.id);

        if (vSrc && vTgt) {
          if (!hasValidSrc) {
            newAttrs = /\bsource="[^"]*"/i.test(newAttrs)
              ? newAttrs.replace(/\bsource="[^"]*"/i, `source="${vSrc.id}"`)
              : `${newAttrs} source="${vSrc.id}"`;
          }
          if (!hasValidTgt) {
            newAttrs = /\btarget="[^"]*"/i.test(newAttrs)
              ? newAttrs.replace(/\btarget="[^"]*"/i, `target="${vTgt.id}"`)
              : `${newAttrs} target="${vTgt.id}"`;
          }
          const exX = ((sPt.x - vSrc.x) / Math.max(1, vSrc.w)).toFixed(4);
          const exY = ((sPt.y - vSrc.y) / Math.max(1, vSrc.h)).toFixed(4);
          const enX = ((tPt.x - vTgt.x) / Math.max(1, vTgt.w)).toFixed(4);
          const enY = ((tPt.y - vTgt.y) / Math.max(1, vTgt.h)).toFixed(4);
          if (!/\bexitX=/i.test(style)) {
            style = `exitX=${exX};exitY=${exY};exitDx=0;exitDy=0;exitPerimeter=0;entryX=${enX};entryY=${enY};entryDx=0;entryDy=0;entryPerimeter=0;${style}`;
          }
        }
      }

      if (/\bstyle="[^"]*"/i.test(newAttrs)) {
        newAttrs = newAttrs.replace(/\bstyle="[^"]*"/i, `style="${style}"`);
      } else {
        newAttrs = `${newAttrs} style="${style}"`;
      }
      return `<mxCell${newAttrs}${newTail}`;
    }

    return fullMatch;
  });

  // 7. Ensure minimum 4 bound orthogonal flow edges for static grid/infographic templates (#33, #54..#66)
  if (existingEdgeCount < 4 && topVertices.length >= 5) {
    const cardNodes = topVertices.filter(
      (v) => v.w >= 70 && v.w <= 950 && v.h >= 24 && v.h <= 450 && !/poster_bg|bg|hdr|ftr|tk/i.test(v.id)
    );
    const seqPool = cardNodes.length >= 5 ? cardNodes : topVertices.filter((v) => !/poster_bg|bg/i.test(v.id));
    const needed = 4 - existingEdgeCount;
    const synthEdges: string[] = [];
    for (let i = 0; i < needed && i + 1 < seqPool.length; i++) {
      const a = seqPool[i];
      const b = seqPool[i + 1];
      synthEdges.push(
        `<mxCell id="auto_flow_edge_${templateId || 'tpl'}_${i}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=1;opacity=0;strokeOpacity=0;endArrow=none;" edge="1" parent="1" source="${a.id}" target="${b.id}"><mxGeometry relative="1" as="geometry"/></mxCell>`
      );
    }
    if (synthEdges.length > 0) {
      out = out.replace(/<\/root>/i, `  ${synthEdges.join('\n        ')}\n      </root>`);
    }
  }

  // 8. Final XML Ampersand & Attribute Angle-Bracket Safety Sanitizer
  out = out.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;');
  out = out.replace(/\bvalue="([^"]*)"/g, (_m, v: string) => `value="${v.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`);

  return out;
}

export function injectDomainFlavorXml(xml: string, domainFlavor: string = 'general'): string {
  if (!xml) return '';

  let out = xml;

  if (domainFlavor === 'retail') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology\s+&amp;\s+Regulatory\s+AI/gi, 'Omnichannel Retail &amp; Intelligent Supply Chain')
      .replace(/Bio-Pharma\s+Precision\s+Oncology\s+&\s+Regulatory\s+AI/gi, 'Omnichannel Retail &amp; Intelligent Supply Chain')
      .replace(/Bio-Pharma/gi, 'Omnichannel Retail')
      .replace(/Biopharma/gi, 'Omnichannel Retail')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Hyper-Scale Commerce. Intelligent Fulfillment.')
      .replace(/Research(?:&lt;br\/?&gt;|<br\s*\/?>|\s+)Scientists/gi, 'Global&lt;br/&gt;Shoppers')
      .replace(/Research Scientists/gi, 'Global Shoppers')
      .replace(/Clinical(?:&lt;br\/?&gt;|<br\s*\/?>|\s+)Operations/gi, '3P Marketplace&lt;br/&gt;Merchants')
      .replace(/Clinical Operations/gi, '3P Marketplace Merchants')
      .replace(/Regulatory(?:&lt;br\/?&gt;|<br\s*\/?>|\s+)Affairs/gi, 'Warehouse&lt;br/&gt;Logistics')
      .replace(/Regulatory Affairs/gi, 'Warehouse Logistics')
      .replace(/Safety\/PV(?:&lt;br\/?&gt;|<br\s*\/?>|\s+)Specialists/gi, 'Fraud &amp; Risk&lt;br/&gt;Screener')
      .replace(/Safety\/PV Specialists/gi, 'Fraud &amp; Risk Screener')
      .replace(/Quality(?:&lt;br\/?&gt;|<br\s*\/?>|\s+)Teams/gi, 'Inventory &amp;&lt;br/&gt;Catalog QA')
      .replace(/Medical(?:&lt;br\/?&gt;|<br\s*\/?>|\s+)Affairs/gi, 'Customer&lt;br/&gt;Support')
      .replace(/Commercial(?:&lt;br\/?&gt;|<br\s*\/?>|\s+)Analytics/gi, 'E-Commerce&lt;br/&gt;Analytics')
      .replace(/Laboratory \/ LIMS/gi, 'Carrier Fleet &amp; 3PL Routing')
      .replace(/Regulatory Gateways/gi, 'Customs &amp; Tax Gateways')
      .replace(/FDA 21 CFR Part 11/gi, 'PCI-DSS Level 1 v4.0')
      .replace(/HIPAA/gi, 'SOC 2 Type II')
      .replace(/Scientist/g, 'Shopper')
      .replace(/AI Copilot/g, 'Storefront App');
  } else if (domainFlavor === 'fintech') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'FinTech Autonomous Wealth &amp; Payments')
      .replace(/Bio-Pharma/gi, 'FinTech Payments')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Autonomous Wealth. Zero-Latency Execution.')
      .replace(/Research Scientists/gi, 'Quantitative Traders')
      .replace(/Scientist \(User\)/gi, 'Trader (User)')
      .replace(/Scientist/gi, 'Trader')
      .replace(/Clinical Operations/gi, 'Portfolio Managers')
      .replace(/Regulatory Affairs/gi, 'SEC / FINRA Compliance')
      .replace(/Safety\/PV Specialists/gi, 'AML &amp; Fraud Screening')
      .replace(/Safety Signals/gi, 'Fraud Anomaly Signals')
      .replace(/Clinical Data APIs/gi, 'Core Banking &amp; Market APIs')
      .replace(/Clinical Data/gi, 'Financial &amp; Ledger Data')
      .replace(/Clinical Trials/gi, 'Trade Execution Orders')
      .replace(/Clinical/gi, 'Financial')
      .replace(/Drug X/gi, 'ACC_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'SEC Rule 17a-4 / FINRA')
      .replace(/GxP Validated/gi, 'SOC 2 / SEC 15c3-5')
      .replace(/GxP/gi, 'SEC 15c3-5')
      .replace(/HIPAA/gi, 'PCI-DSS Level 1');
  } else if (domainFlavor === 'saas') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Enterprise SaaS &amp; Cloud Mesh')
      .replace(/Bio-Pharma/gi, 'Enterprise SaaS')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Autonomous Multi-Tenant Cloud Scale.')
      .replace(/Research Scientists/gi, 'DevOps &amp; Platform Engineers')
      .replace(/Scientist \(User\)/gi, 'Platform Admin (User)')
      .replace(/Scientist/gi, 'Platform Admin')
      .replace(/Clinical Operations/gi, 'Tenant Operations')
      .replace(/Regulatory Affairs/gi, 'Security &amp; GRC Compliance')
      .replace(/Safety\/PV Specialists/gi, 'SRE &amp; Security Operations')
      .replace(/Safety Signals/gi, 'Audit &amp; Security Signals')
      .replace(/Clinical Data APIs/gi, 'Tenant Storage APIs')
      .replace(/Clinical Data/gi, 'Multi-Tenant Data')
      .replace(/Clinical Trials/gi, 'Tenant Subscriptions')
      .replace(/Clinical/gi, 'Multi-Tenant')
      .replace(/Drug X/gi, 'Tenant_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'SOC 2 Type II / ISO 27001')
      .replace(/GxP Validated/gi, 'SOC 2 Type II Validated')
      .replace(/GxP/gi, 'SOC 2')
      .replace(/HIPAA/gi, 'ISO 27001');
  } else if (domainFlavor === 'manufacturing') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Smart Manufacturing &amp; Industrial IoT')
      .replace(/Bio-Pharma/gi, 'Smart Manufacturing')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Industrial IoT. Real-Time Telemetry.')
      .replace(/Research Scientists/gi, 'Fleet Operations Engineers')
      .replace(/Scientist \(User\)/gi, 'Fleet Operator (User)')
      .replace(/Scientist/gi, 'Fleet Operator')
      .replace(/Clinical Operations/gi, 'Plant &amp; Fleet Operations')
      .replace(/Regulatory Affairs/gi, 'FAA / ISO Compliance')
      .replace(/Safety\/PV Specialists/gi, 'Safety &amp; Telemetry SRE')
      .replace(/Safety Signals/gi, 'Anomaly &amp; Collision Signals')
      .replace(/Clinical Data APIs/gi, 'Telemetry &amp; Sensor APIs')
      .replace(/Clinical Data/gi, 'IoT &amp; Telemetry Data')
      .replace(/Clinical Trials/gi, 'Fleet Missions')
      .replace(/Clinical/gi, 'Telemetry')
      .replace(/Drug X/gi, 'Node_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'FAA Part 135 / ISO 9001')
      .replace(/GxP Validated/gi, 'ISO 9001 / IEC 62443')
      .replace(/GxP/gi, 'IEC 62443')
      .replace(/HIPAA/gi, 'SOC 2 Type II');
  } else if (domainFlavor === 'healthcare') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Healthcare &amp; Clinical HealthTech')
      .replace(/Bio-Pharma/gi, 'Clinical Healthcare')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Interoperable Care. Improving Patient Outcomes.')
      .replace(/Research Scientists/gi, 'Attending Physicians &amp; Clinicians')
      .replace(/Scientist \(User\)/gi, 'Clinician (User)')
      .replace(/Scientist/gi, 'Clinician')
      .replace(/Clinical Operations/gi, 'Hospital Operations &amp; Nursing')
      .replace(/Regulatory Affairs/gi, 'HIPAA / Joint Commission Compliance')
      .replace(/Safety\/PV Specialists/gi, 'Clinical Quality &amp; Patient Safety')
      .replace(/Safety Signals/gi, 'Adverse Drug Reaction Signals')
      .replace(/Clinical Data APIs/gi, 'FHIR R4 &amp; HL7v2 Integration APIs')
      .replace(/Clinical Data/gi, 'EHR &amp; Patient Health Records')
      .replace(/Clinical Trials/gi, 'Care Encounters')
      .replace(/Clinical/gi, 'Clinical Care')
      .replace(/Drug X/gi, 'PATIENT_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'HIPAA Security Rule / HITECH')
      .replace(/GxP Validated/gi, 'HIPAA / ONC Certified')
      .replace(/GxP/gi, 'HIPAA');
  } else if (domainFlavor === 'energy') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Clean Energy &amp; Battery Storage Mesh')
      .replace(/Bio-Pharma/gi, 'Smart Clean Energy')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Decarbonizing Grids. Autonomous V2G Power.')
      .replace(/Research Scientists/gi, 'Grid Balancing Operators')
      .replace(/Scientist \(User\)/gi, 'Power Dispatcher (User)')
      .replace(/Scientist/gi, 'Power Dispatcher')
      .replace(/Clinical Operations/gi, 'BESS Substation Engineers')
      .replace(/Regulatory Affairs/gi, 'NERC-CIP &amp; FERC Compliance')
      .replace(/Safety\/PV Specialists/gi, 'Grid Frequency &amp; Overload SRE')
      .replace(/Safety Signals/gi, 'Thermal Runaway &amp; Sag Signals')
      .replace(/Clinical Data APIs/gi, 'IEEE 2030.5 / Modbus Telemetry APIs')
      .replace(/Clinical Data/gi, 'Substation Synchrophasor Telemetry')
      .replace(/Clinical Trials/gi, 'Dispatch Cycles')
      .replace(/Clinical/gi, 'Grid Power')
      .replace(/Drug X/gi, 'BESS_FEEDER_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'NERC-CIP High Impact / IEEE 1547')
      .replace(/GxP Validated/gi, 'NERC-CIP Validated')
      .replace(/GxP/gi, 'NERC-CIP');
  } else if (domainFlavor === 'automotive') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Autonomous Vehicle &amp; V2X Fleet Mesh')
      .replace(/Bio-Pharma/gi, 'Autonomous Automotive')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Autonomous Mobility. Zero Fatalities.')
      .replace(/Research Scientists/gi, 'Perception &amp; Motion Engineers')
      .replace(/Scientist \(User\)/gi, 'Fleet Telematics Lead (User)')
      .replace(/Scientist/gi, 'Fleet Telematics Lead')
      .replace(/Clinical Operations/gi, 'Autonomous Fleet Operations')
      .replace(/Regulatory Affairs/gi, 'NHTSA &amp; UNECE WP.29 Compliance')
      .replace(/Safety\/PV Specialists/gi, 'Functional Safety &amp; ISO 26262 SRE')
      .replace(/Safety Signals/gi, 'Sensor Occlusion &amp; CAN Disconnect Signals')
      .replace(/Clinical Data APIs/gi, 'V2X &amp; SOME/IP Telematics APIs')
      .replace(/Clinical Data/gi, 'LiDAR Point Cloud &amp; CAN Bus Stream')
      .replace(/Clinical Trials/gi, 'Autonomous Drive Missions')
      .replace(/Clinical/gi, 'Vehicle Telematics')
      .replace(/Drug X/gi, 'VEHICLE_VIN_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'ISO 26262 ASIL-D / ISO 21434')
      .replace(/GxP Validated/gi, 'ASIL-D Certified')
      .replace(/GxP/gi, 'ASIL-D');
  } else if (domainFlavor === 'telecom') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Telecommunications &amp; 5G Edge Network')
      .replace(/Bio-Pharma/gi, '5G Telecommunications')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Ultra-Reliable Low-Latency 5G Connectivity.')
      .replace(/Research Scientists/gi, 'Radio Access Network (RAN) Engineers')
      .replace(/Scientist \(User\)/gi, 'NOC Operator (User)')
      .replace(/Scientist/gi, 'NOC Operator')
      .replace(/Clinical Operations/gi, 'Network Operations Center (NOC)')
      .replace(/Regulatory Affairs/gi, 'FCC &amp; 3GPP Rel-17 Compliance')
      .replace(/Safety\/PV Specialists/gi, 'Service Slicing &amp; QoS SRE')
      .replace(/Safety Signals/gi, 'Beamforming Degradation Signals')
      .replace(/Clinical Data APIs/gi, '3GPP SBI / eCPRI Open-Fronthaul APIs')
      .replace(/Clinical Data/gi, 'gNodeB Telemetry &amp; Slicing QoS Data')
      .replace(/Clinical Trials/gi, 'RAN Slice Sessions')
      .replace(/Clinical/gi, 'Telco Network')
      .replace(/Drug X/gi, 'SLICE_URLLC_9824')
      .replace(/FDA 21 CFR Part 11/gi, '3GPP TS 33.501 / ETSI NFV')
      .replace(/GxP Validated/gi, '3GPP Validated')
      .replace(/GxP/gi, '3GPP');
  } else if (domainFlavor === 'defense') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Aerospace, Defense &amp; GovCloud')
      .replace(/Bio-Pharma/gi, 'Defense Mission')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Secure Mission Resilience. Tactical Edge Superiority.')
      .replace(/Research Scientists/gi, 'Mission Command &amp; Tactical Operators')
      .replace(/Scientist \(User\)/gi, 'Mission Commander (User)')
      .replace(/Scientist/gi, 'Mission Commander')
      .replace(/Clinical Operations/gi, 'Joint Tactical Operations (JOC)')
      .replace(/Regulatory Affairs/gi, 'DISA STIG / ITAR / FedRAMP High')
      .replace(/Safety\/PV Specialists/gi, 'Air-Gapped Electronic Warfare SRE')
      .replace(/Safety Signals/gi, 'Radar Jamming &amp; Threat Incursion Signals')
      .replace(/Clinical Data APIs/gi, 'Link 16 / CoT Tactical Data APIs')
      .replace(/Clinical Data/gi, 'Telemetry &amp; Synthetic Aperture Radar (SAR)')
      .replace(/Clinical Trials/gi, 'Mission Sorties')
      .replace(/Clinical/gi, 'Tactical Defense')
      .replace(/Drug X/gi, 'TARGET_SORTIE_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'DoD IL-6 / FedRAMP High / ITAR')
      .replace(/GxP Validated/gi, 'DISA STIG / DO-178C Level A')
      .replace(/GxP/gi, 'DO-178C');
  } else if (domainFlavor === 'cybersecurity') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Zero-Trust Cybersecurity &amp; Threat Intelligence')
      .replace(/Bio-Pharma/gi, 'SecOps &amp; Cyber Threat')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Continuous Verification. Autonomous SecOps Defense.')
      .replace(/Research Scientists/gi, 'Threat Hunters &amp; Red Teamers')
      .replace(/Scientist \(User\)/gi, 'SOC Analyst (User)')
      .replace(/Scientist/gi, 'SOC Analyst')
      .replace(/Clinical Operations/gi, '24x7 SOC Incident Response Team')
      .replace(/Regulatory Affairs/gi, 'NIST CSF / ISO 27001 / SOC 2')
      .replace(/Safety\/PV Specialists/gi, 'Detection Engineering &amp; SIEM SRE')
      .replace(/Safety Signals/gi, 'Zero-Day Exploit &amp; Beaconing Signals')
      .replace(/Clinical Data APIs/gi, 'STIX/TAXII Threat Intelligence APIs')
      .replace(/Clinical Data/gi, 'Chronicle SIEM &amp; PCAP Telemetry Stream')
      .replace(/Clinical Trials/gi, 'Incident Containment Workflows')
      .replace(/Clinical/gi, 'Cyber Security')
      .replace(/Drug X/gi, 'THREAT_CVE_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'NIST SP 800-53 Rev 5 / SOC 2')
      .replace(/GxP Validated/gi, 'FedRAMP / ISO 27001 Certified')
      .replace(/GxP/gi, 'NIST CSF');
  } else if (domainFlavor === 'media') {
    out = out
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'Media Streaming &amp; Digital Entertainment')
      .replace(/Bio-Pharma/gi, 'Media &amp; Streaming')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Sub-Second Global Streaming. Cinematic Video Quality.')
      .replace(/Research Scientists/gi, 'Video Encoding &amp; QoS Engineers')
      .replace(/Scientist \(User\)/gi, 'Broadcaster (User)')
      .replace(/Scientist/gi, 'Broadcaster')
      .replace(/Clinical Operations/gi, 'Broadcast &amp; Playout Operations')
      .replace(/Regulatory Affairs/gi, 'FCC Closed Captioning &amp; DRM Rights')
      .replace(/Safety\/PV Specialists/gi, 'Content Safety &amp; CDN Edge SRE')
      .replace(/Safety Signals/gi, 'Buffer Underrun &amp; Frame Drop Signals')
      .replace(/Clinical Data APIs/gi, 'HLS / Low-Latency DASH Manifest APIs')
      .replace(/Clinical Data/gi, 'RTMP / SRT 4K Video Telemetry Stream')
      .replace(/Clinical Trials/gi, 'Live Playout Broadcasts')
      .replace(/Clinical/gi, 'Media Streaming')
      .replace(/Drug X/gi, 'STREAM_CHANNEL_9824')
      .replace(/FDA 21 CFR Part 11/gi, 'SMPTE 2110 / CTA-5004 WAVE')
      .replace(/GxP Validated/gi, 'Studio DRM Validated')
      .replace(/GxP/gi, 'SMPTE');
  }

  if (domainFlavor && domainFlavor !== 'biopharma' && domainFlavor !== 'general') {
    const sorReplacement =
      domainFlavor === 'fintech'
        ? 'Cloud Spanner Core Banking Ledger'
        : domainFlavor === 'retail'
        ? 'Cloud Spanner Order &amp; Inventory Ledger'
        : domainFlavor === 'saas'
        ? 'Cloud Spanner Multi-Tenant State Store'
        : domainFlavor === 'manufacturing'
        ? 'Cloud Spanner Fleet &amp; Telemetry Ledger'
        : 'Cloud Spanner Enterprise System of Record';
    out = out
      .replace(/Oracle Argus\s*\/\s*Veeva Vault Safety/gi, sorReplacement)
      .replace(/Veeva Vault\s*\/\s*Argus Safety/gi, sorReplacement)
      .replace(/Veeva Vault Safety/gi, sorReplacement)
      .replace(/Veeva Vault/gi, sorReplacement)
      .replace(/Argus Safety/gi, sorReplacement)
      .replace(/Oracle Argus/gi, sorReplacement)
      .replace(/Medidata Rave/gi, sorReplacement)
      .replace(/Phase 3 trials/gi, 'Production workloads');
  }

  if (
    out.includes('id="flow_blueprint_') ||
    out.includes('official_gcp_arch_center') ||
    out.includes('id="bp79_') ||
    out.includes('oracle_exadata_ebs_topology') ||
    /id="g(?:0[1-9]|10)_root"/.test(out)
  ) {
    return out;
  }
  return sanitizeAndHealCanonicalBlueprintXml(out);
}

export const ACTIVE_CANONICAL_BLUEPRINT_IDS: readonly string[] = [
  '78',
  '79',
  '81',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '00',
  '03',
  '12',
  '14',
  '29',
  '67',
  '69',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
] as const;

export const G_SERIES_TO_CANONICAL_ID_MAP: Record<string, string> = {
  'G-01': '85',
  'G01': '85',
  'G-02': '86',
  'G02': '86',
  'G-03': '87',
  'G03': '87',
  'G-04': '88',
  'G04': '88',
  'G-06': '89',
  'G06': '89',
  'G-07': '90',
  'G07': '90',
  'G-08': '91',
  'G08': '91',
  'G-09': '92',
  'G09': '92',
  'G-10': '93',
  'G10': '93',
  'G-01-L400': '94',
  'G01-L400': '94',
  'G-02-L400': '95',
  'G02-L400': '95',
  'G-03-L400': '96',
  'G03-L400': '96',
  'G-04-L400': '97',
  'G04-L400': '97',
  'G-08-L400': '98',
  'G08-L400': '98',
};

const LEGACY_TO_MODERN_BLUEPRINT_MAP: Record<string, string> = {
  '01': '00',
  '02': '55',
  '04': '00',
  '05': '56',
  '06': '62',
  '07': '62',
  '08': '78',
  '09': '62',
  '10': '78',
  '11': '81',
  '13': '67',
  '15': '79',
  '16': '79',
  '17': '57',
  '18': '57',
  '19': '84',
  '20': '79',
  '21': '79',
  '22': '84',
  '23': '78',
  '24': '00',
  '25': '78',
  '26': '67',
  '27': '57',
  '28': '67',
  '30': '61',
  '31': '62',
  '32': '62',
  '33': '63',
  '34': '57',
  '35': '79',
  '36': '79',
  '37': '79',
  '38': '79',
  '39': '57',
  '40': '00',
  '41': '78',
  '42': '62',
  '43': '62',
  '44': '57',
  '45': '78',
  '46': '79',
  '47': '78',
  '48': '57',
  '49': '57',
  '50': '79',
  '51': '00',
  '68': '67',
  '70': '69',
  '71': '69',
  '72': '69',
  '73': '69',
  '74': '69',
  '75': '00',
  '76': '00',
  '77': '00',
  '80': '79',
  '82': '78',
  '83': '00',
};

const decodeCanonicalMetadataText = (str: string): string =>
  (str || '').replace(/&amp;/g, '&').replace(/&bull;/g, '•');

const ALL_RAW_CANONICAL_TEMPLATES: CanonicalTemplate[] = RAW_TEMPLATES.map(t => {
  const contract = CANONICAL_CONTRACTS[t.id];
  const paddedId = t.id.padStart(2, '0');
  const isFlowBp = Number(t.id) >= 67 && Number(t.id) <= 69;
  const isInfographicBp = Number(t.id) >= 52 && Number(t.id) <= 66;
  const isNewArchBp = Number(t.id) >= 78 && Number(t.id) <= 98;
  const rawCleanName = t.id === '00'
    ? '2026 Upgraded GCP & Gemini Enterprise Native Architecture'
    : isNewArchBp || isFlowBp || isInfographicBp
    ? t.name
    : t.name
        .replace(/\bCLAUDE\.md\b/gi, 'AGENTS.md')
        .replace(/\bGPT-6\s+Astra\b/gi, 'Frontier Agent');
  const cleanName = decodeCanonicalMetadataText(rawCleanName);
  const isSketchBp = t.id === '76' || t.id === '77' || isNewArchBp || isFlowBp;
  return {
    ...t,
    name: cleanName,
    primaryPurpose: decodeCanonicalMetadataText(t.primaryPurpose),
    examples: decodeCanonicalMetadataText(t.examples),
    keyComponents: (t.keyComponents || []).map(decodeCanonicalMetadataText),
    previewImage: isSketchBp || isInfographicBp ? (t.previewImage || `/templates/canonical_${paddedId}.png`) : `/templates/canonical_${paddedId}.png`,
    sourceImageId: isSketchBp ? (t.previewImage || '/templates/canonical_00.png') : `/templates/canonical_${paddedId}.png`,
    generatorVersion: contract ? contract.generatorVersion : "1.0",
    fidelityScore: isSketchBp || isInfographicBp || (contract && contract.certificationStatus === "certified") ? 0.98 : 0.90,
    certificationStatus: isSketchBp || isInfographicBp ? "certified" : contract ? contract.certificationStatus : "in_review",
    contract,
    generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => {
      const baseXml = t.generateXml(domainFlavor, theme);
      if (isSketchBp || t.id === '00') {
        return baseXml;
      }
      return sanitizeAndHealCanonicalBlueprintXml(injectDomainFlavorXml(baseXml, domainFlavor), t.id);
    }
  };
});

export const CANONICAL_TEMPLATES: CanonicalTemplate[] = ACTIVE_CANONICAL_BLUEPRINT_IDS
  .map((id) => ALL_RAW_CANONICAL_TEMPLATES.find((t) => t.id === id))
  .filter((t): t is CanonicalTemplate => Boolean(t));

export function getCanonicalTemplateById(rawId?: string | null): CanonicalTemplate {
  const cleaned = String(rawId || '78').replace(/^(bp_|canonical_|#)/i, '').trim();
  const upper = cleaned.toUpperCase();
  if (G_SERIES_TO_CANONICAL_ID_MAP[upper]) {
    const gTarget = G_SERIES_TO_CANONICAL_ID_MAP[upper];
    const gFound = CANONICAL_TEMPLATES.find((t) => t.id === gTarget);
    if (gFound) return gFound;
  }
  const padded = cleaned.padStart(2, '0');
  const direct = CANONICAL_TEMPLATES.find((t) => t.id === padded || t.id === rawId);
  if (direct) return direct;
  const mappedId = LEGACY_TO_MODERN_BLUEPRINT_MAP[padded] || '78';
  return CANONICAL_TEMPLATES.find((t) => t.id === mappedId) || CANONICAL_TEMPLATES[0];
}


