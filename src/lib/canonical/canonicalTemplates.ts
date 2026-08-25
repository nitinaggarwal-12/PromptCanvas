import { CANONICAL_CONTRACTS, CanonicalContract } from './canonicalContracts';

export interface CanonicalTemplate {
  id: string; // e.g. "01", "02" ... "39"
  name: string;
  family: 'Understand' | 'Process' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning' | 'Reference Architectures';
  level: 'L1' | 'L2' | 'L3' | 'L1/L2' | 'L2/L3' | 'L1/L2/L3';
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
  'Understand',
  'Process',
  'Structure',
  'Flow',
  'Infrastructure',
  'Security & Governance',
  'Delivery & Operations',
  'Analysis & Planning',
  'Reference Architectures',
] as const;

export const DOMAIN_PRESETS = [
  { id: 'biopharma', name: 'Bio-Pharma Precision Oncology & Regulatory AI', prefix: 'NOVACURA' },
  { id: 'fintech', name: 'FinTech Autonomous Wealth & High-Speed Payments', prefix: 'NEXUSFIN' },
  { id: 'manufacturing', name: 'Smart Manufacturing & Industrial IoT Digital Twin', prefix: 'SYNACTIVE' },
  { id: 'retail', name: 'Omnichannel Retail & Intelligent Supply Chain', prefix: 'OMNIVUE' },
  { id: 'saas', name: 'Enterprise SaaS Multi-Tenant Cloud Platform', prefix: 'AETHER' },
];

export interface ArchitectureDocumentBinding {
  docId: string;
  title: string;
  primaryPurpose: string;
  requiredDiagramViews: string[];
}

export const ARCHITECTURE_DOCUMENT_BINDINGS: ArchitectureDocumentBinding[] = [
  { docId: 'DOC-01', title: 'Product Requirements Document (PRD)', primaryPurpose: 'Business requirements, user personas, functional scope, and success KPIs', requiredDiagramViews: ['01 System Context', '02 Capability Map', '04 Value Stream'] },
  { docId: 'DOC-02', title: 'Functional Design Document (FDD)', primaryPurpose: 'Detailed functional specifications, business rules, and user interaction workflows', requiredDiagramViews: ['03 Business Process', '11 Sequence Diagram', '13 Decision Flow'] },
  { docId: 'DOC-03', title: 'High-Level Architecture Design (HLD)', primaryPurpose: 'End-to-end system architecture, major platform subsystems, integration, and cloud landing zone', requiredDiagramViews: ['06 C4 Context', '07 C4 Container', '10 Integration', '15 Network Topology'] },
  { docId: 'DOC-04', title: 'Low-Level Technical Design (LLD)', primaryPurpose: 'Detailed component design, internal class structures, API schemas, and thread/connection pools', requiredDiagramViews: ['08 Component Architecture', '11 Sequence Diagram', '14 Data Model / ERD'] },
  { docId: 'DOC-05', title: 'Data Architecture & Governance Spec', primaryPurpose: 'Data mesh topology, medallion lakehouse, schema catalog, data quality SLAs, and privacy tags', requiredDiagramViews: ['09 Data Flow Architecture', '14 Data Model / ERD', '34 Geographic Architecture'] },
  { docId: 'DOC-06', title: 'Enterprise Security Architecture & Threat Model', primaryPurpose: 'Zero-trust boundaries, STRIDE threat model, identity federation, and encryption specs', requiredDiagramViews: ['17 Identity & Access Flow', '18 Security / Trust Boundary', '27 Threat Model'] },
  { docId: 'DOC-07', title: 'AI System Card & Cognitive Architecture Spec', primaryPurpose: 'Model specifications, multi-agent orchestration, RAG knowledge graph, and prompt safety guardrails', requiredDiagramViews: ['23 Agent Interaction', '24 RAG / Knowledge Flow', '25 Tool / Protocol', '26 HITL Flow'] },
  { docId: 'DOC-08', title: 'Infrastructure & Cloud Deployment Spec', primaryPurpose: 'Physical cloud resource mapping, GKE cluster topology, multi-zone compute, and subnet CIDRs', requiredDiagramViews: ['15 Network Topology', '16 Deployment Architecture', '34 Geographic'] },
  { docId: 'DOC-09', title: 'High Availability & Disaster Recovery (BCDR) Plan', primaryPurpose: 'RTO/RPO targets, multi-region replication, failover automation, and disaster recovery exercises', requiredDiagramViews: ['19 HA / DR Architecture', '34 Geographic', '28 Failure / Exception Flow'] },
  { docId: 'DOC-10', title: 'Software Delivery & CI/CD Specification', primaryPurpose: 'Automated build/test pipelines, GitOps declarative delivery, progressive canary rollout, and SLSA L3', requiredDiagramViews: ['20 CI/CD Pipeline', '16 Deployment Architecture', '08 Component'] },
  { docId: 'DOC-11', title: 'Site Reliability Engineering (SRE) & Telemetry Spec', primaryPurpose: 'SLO/SLA definitions, error budget policies, OpenTelemetry distributed tracing, and alert matrices', requiredDiagramViews: ['21 Observability / SRE', '28 Failure / Exception Flow', '07 Container'] },
  { docId: 'DOC-12', title: 'Migration & Modernization Strategy (6-Rs)', primaryPurpose: 'Legacy inventory assessment, dependency mapping, migration wave prioritization, and cutover', requiredDiagramViews: ['05 As-Is / To-Be', '22 Migration / Transition', '31 Dependency Map', '32 Roadmap'] },
  { docId: 'DOC-13', title: 'Production Go-Live & Cutover Runbook', primaryPurpose: 'Minute-by-minute execution steps for launch, war room operations, smoke tests, and rollback', requiredDiagramViews: ['29 Cutover / Operational Runbook', '03 Swimlane', '11 Sequence'] },
  { docId: 'DOC-14', title: 'Cloud FinOps & Unit Economics Model', primaryPurpose: 'Cloud spend allocation by business unit, automated idle reclaimer, and AI token cost budgeting', requiredDiagramViews: ['30 FinOps / Cost Flow', '04 Value Stream', '33 Matrix / Heatmap'] },
  { docId: 'DOC-15', title: 'Regulatory Compliance & GxP / HIPAA Validation Pack', primaryPurpose: '21 CFR Part 11 electronic records, HIPAA audit trails, sovereign cloud boundaries, and CSV protocols', requiredDiagramViews: ['18 Security / Trust Boundary', '26 HITL Flow', '34 Geographic Architecture'] },
  { docId: 'DOC-16', title: 'Architecture Decision Record (ADR) Log', primaryPurpose: 'Formal record of architectural trade-offs, technology evaluations, and approved decision rationale', requiredDiagramViews: ['13 Decision Flow / Tree', '33 Matrix / Heatmap', '06 C4 Context'] },
];

export interface BiopharmaReferenceTier {
  tierNumber: number;
  tierName: string;
  subsystem: string;
  gcpTechStack: string;
  visualGrammars: string[];
  complianceControls: string;
}

export const BIOPHARMA_REFERENCE_TIERS: BiopharmaReferenceTier[] = [
  { tierNumber: 1, tierName: 'Tier 1: Clinical Ingress & Sequencer Edge', subsystem: 'Next-Gen Sequencing (NGS) Edge Gateways & Hospital EHRs', gcpTechStack: 'Google Cloud Life Sciences API, FastQ / BAM Ingestion, Apigee X FHIR Gateway', visualGrammars: ['01 Context', '10 Integration', '15 Network'], complianceControls: 'HIPAA Encryption in-transit, TLS 1.3, Mutual mTLS, 21 CFR Part 11 Audit' },
  { tierNumber: 2, tierName: 'Tier 2: Ingestion, Streaming & Raw Lake', subsystem: 'Bronze Raw Genomic Data Lake & Real-Time Sample Streams', gcpTechStack: 'Cloud Storage Immutable Buckets (CMEK), Cloud Pub/Sub, Datastream CDC', visualGrammars: ['09 Data Flow', '16 Deployment', '18 Trust Boundary'], complianceControls: 'Customer-Managed KMS Keys (HSM), Write-Once-Read-Many (WORM) Object Retention' },
  { tierNumber: 3, tierName: 'Tier 3: Distributed Genomic Processing & Variant Calling', subsystem: 'Silver Conformed Genomic Variants & Bioinformatic Pipelines', gcpTechStack: 'Cloud Dataflow (Apache Beam), Dataproc Serverless (Spark/GATK), BigQuery Silver Variant Store', visualGrammars: ['08 Component', '09 Data Flow', '20 CI/CD Pipeline'], complianceControls: 'Reproducible Pipeline Execution, Automated Quality Gate SLAs, Lineage Tracking' },
  { tierNumber: 4, tierName: 'Tier 4: Biomedical Knowledge Graph & Hybrid RAG', subsystem: 'Multi-Hop Precision Oncology Knowledge Graph & Vector Search', gcpTechStack: 'Cloud Spanner Graph (ISO GQL Multi-Hop), Vertex AI Vector Search (ScaNN 768-dim), Document AI Clinical Parser', visualGrammars: ['14 Data Model / ERD', '24 RAG / Knowledge Flow', '31 Dependency Map'], complianceControls: 'RAG Triad Verification (Faithfulness > 0.98), Model Armor Clinical Prompt Shield' },
  { tierNumber: 5, tierName: 'Tier 5: Multi-Agent Clinical Reasoning & HITL Gate', subsystem: 'Precision Oncology Clinical Decision Support Agents & FDA Regulatory Assistant', gcpTechStack: 'Gemini 2.5 Pro ReAct Orchestrator, Vertex AI Agent Engine, Oncologist Review Cockpit', visualGrammars: ['23 Agent Interaction', '25 Tool/Protocol (MCP)', '26 HITL Governance Flow'], complianceControls: 'FDA 21 CFR Part 11 Dual-Electronic Signatures, Human-in-the-Loop Mandatory Signoff' },
  { tierNumber: 6, tierName: 'Tier 6: Cross-Cutting Sovereign Security & GxP Observability', subsystem: 'Sovereign Cloud Residency, Workload Identity & Immutable Audit Ledger', gcpTechStack: 'Assured Workloads (EU/US Sovereignty), IAM Workload Identity Federation, Cloud Audit Logs, Security Command Center', visualGrammars: ['17 IAM Flow', '18 Security / Trust Boundary', '21 SRE Observability', '34 Geographic'], complianceControls: 'EU GDPR Patient Data Residency, HIPAA BAA Compliance, Tamper-Proof Audit Trails' },
];

import { generateTemplate01ExactV3Xml } from "./template01ExactV3";
import { generateTemplate02CapabilityMapXml } from "./template02CapabilityMap";
import { generateTemplate03SwimlaneXml } from "./template03Swimlane";
import { generateTemplate04ValueStreamXml } from "./template04ValueStream";
import { generateTemplate05AsIsToBeXml } from "./template05AsIsToBe";
import { generateTemplate06C4ContextXml } from "./template06C4Context";
import { generateTemplate07C4ContainerXml } from "./template07C4Container";
import { generateTemplate08ComponentArchXml } from "./template08ComponentArch";
import { generateTemplate09DataFlowXml } from "./template09DataFlow";
import { generateTemplate10IntegrationArchXml } from "./template10IntegrationArch";
import { generateTemplate11SequenceDiagramXml } from "./template11SequenceDiagram";
import { generateTemplate12StateMachineXml } from "./template12StateMachine";
import { generateTemplate13DecisionFlowXml } from "./template13DecisionFlow";
import { generateTemplate14DataModelErdXml } from "./template14DataModelErd";
import { generateTemplate15NetworkTopologyXml } from "./template15NetworkTopology";
import { generateTemplate16DeploymentMeshXml } from "./template16DeploymentMesh";
import { generateTemplate17IdentityAccessFlowXml } from "./template17IdentityAccessFlow";
import { generateTemplate18SecurityTrustBoundaryXml } from "./template18SecurityTrustBoundary";
import { generateTemplate19HaDrArchitectureXml } from "./template19HaDrArchitecture";
import { generateTemplate20CiCdPipelineXml } from "./template20CiCdPipeline";
import { generateTemplate21ObservabilityArchitectureXml } from "./template21ObservabilityArchitecture";
import { generateTemplate22MigrationTransitionXml } from "./template22MigrationTransition";
import { generateTemplate23AgentInteractionXml } from "./template23AgentInteraction";
import { generateTemplate24RagKnowledgeFlowXml } from "./template24RagKnowledgeFlow";
import { generateTemplate25ToolProtocolInteractionXml } from "./template25ToolProtocolInteraction";
import { generateTemplate26HitlGovernanceFlowXml } from "./template26HitlGovernanceFlow";
import { generateTemplate27ThreatModelXml } from "./template27ThreatModel";
import { generateTemplate28FailureExceptionFlowXml } from "./template28FailureExceptionFlow";
import { generateTemplate29CutoverRunbookXml } from "./template29CutoverRunbook";
import { generateTemplate30FinopsCostFlowXml } from "./template30FinopsCostFlow";
import { generateTemplate31DependencyMapXml } from "./template31DependencyMap";
import { generateTemplate32RoadmapEvolutionXml } from "./template32RoadmapEvolution";
import { generateTemplate33MatrixHeatmapXml } from "./template33MatrixHeatmap";
import { generateTemplate34GeographicArchitectureXml } from "./template34GeographicArchitecture";
import { generateTemplate35FintechWealthEngineXml } from "./template35FintechWealthEngine";
import { generateTemplate36SmartManufacturingIotXml } from "./template36SmartManufacturingIot";
import { generateTemplate37DedicatedNetworkInfraXml } from "./template37DedicatedNetworkInfra";
import { generateTemplate38CloudLandingZoneXml } from "./template38CloudLandingZone";
import { generateTemplate39SovereignCloudPrivacyXml } from "./template39SovereignCloudPrivacy";
import { generateTemplate40EnterpriseGenAiPlatformXml } from "./template40EnterpriseGenAiPlatform";
import { generateTemplate41EnterpriseRagPlatformXml } from "./template41EnterpriseRagPlatform";
import { generateTemplate42ModernDataLakehouseDataMeshXml } from "./template42ModernDataLakehouseDataMesh";
import { generateTemplate43RealTimeStreamingEventEnterpriseXml } from "./template43RealTimeStreamingEventEnterprise";
import { generateTemplate44ZeroTrustCybersecuritySocPlatformXml } from "./template44ZeroTrustCybersecuritySocPlatform";
import { generateTemplate45EnterpriseApiIntegrationMcpGatewayXml } from "./template45EnterpriseApiIntegrationMcpGateway";
import { generateTemplate46EnterpriseKubernetesPlatformEngineeringXml } from "./template46EnterpriseKubernetesPlatformEngineering";
import { generateTemplate47MlopsAiLifecyclePlatformXml } from "./template47MlopsAiLifecyclePlatform";
import { generateTemplate48BcdrCyberRecoveryResilienceXml } from "./template48BcdrCyberRecoveryResilience";
import { generateTemplate49HealthcareLifeSciencesPlatformXml } from "./template49HealthcareLifeSciencesPlatform";
import { generateTemplate50SustainabilityEsgPlatformXml } from "./template50SustainabilityEsgPlatform";

interface RawCanonicalTemplate {
  id: string;
  name: string;
  family: 'Understand' | 'Process' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning' | 'Reference Architectures';
  level: 'L1' | 'L2' | 'L3' | 'L1/L2' | 'L2/L3' | 'L1/L2/L3';
  primaryPurpose: string;
  examples: string;
  defaultDomain: string;
  previewImage?: string;
  keyComponents: string[];
  generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => string;
}

const RAW_TEMPLATES: RawCanonicalTemplate[] = [
  {
    id: '01',
    name: 'System Context',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'System boundary + external users + external enterprise systems',
    examples: 'Enterprise App, SaaS Platform, AI Copilot, Life Sciences, Payments',
    defaultDomain: 'Bio-Pharma Precision Oncology & Regulatory AI',
    previewImage: '/templates/tech_c4_system_context.png',
    keyComponents: ['Platform Boundary', 'Internal Actors', 'External Partners', 'Connected Systems', 'Governance'],
    generateXml: generateTemplate01ExactV3Xml
  },
  {
    id: '02',
    name: 'Capability Map',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'Business, technical, and operational capability taxonomy',
    examples: 'Enterprise capabilities, AI capabilities, platform capabilities',
    defaultDomain: 'Enterprise AI & Platform Engineering',
    previewImage: '/templates/total_unified_system_view.png',
    keyComponents: ['Business Capabilities', 'AI Foundation', 'Shared Core Services', 'Governance Matrix'],
    generateXml: generateTemplate02CapabilityMapXml
  },
  {
    id: '03',
    name: 'Business Process / Swimlane',
    family: 'Process',
    level: 'L1/L2',
    primaryPurpose: 'Roles, activities, decisions, and handoffs across operational departments',
    examples: 'Claims triage, onboarding, approval gates, DevOps release',
    defaultDomain: 'Clinical Trials & Regulatory Operations',
    previewImage: '/templates/incident_triage_swimlane.png',
    keyComponents: ['Department Swimlanes', 'Hand-off Triggers', 'Approval Decision Gates', 'Audit Milestones'],
    generateXml: generateTemplate03SwimlaneXml
  },
  {
    id: '04',
    name: 'Value Stream',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'End-to-end value delivery stages, process times, and lead times',
    examples: 'Migration VSM, software delivery, patient journey',
    defaultDomain: 'Research-to-Commercial Patient Journey',
    previewImage: '/templates/value_stream_map_vsm.png',
    keyComponents: ['Value Stages', 'Key Activities', 'Process & Lead Time Metrics', 'Delivered Outcomes'],
    generateXml: generateTemplate04ValueStreamXml
  },
  {
    id: '05',
    name: 'As-Is / To-Be',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'High-contrast architectural transformation comparison (Current vs Target)',
    examples: 'Cloud migration, modernization, AI transformation',
    defaultDomain: 'Enterprise Cloud Transformation',
    previewImage: '/templates/as_is_vs_to_be_process_flow.png',
    keyComponents: ['As-Is Legacy Silos', 'Transformation Drivers', 'To-Be Cloud Target', 'Business ROI'],
    generateXml: generateTemplate05AsIsToBeXml
  },
  {
    id: '06',
    name: 'C4 Context',
    family: 'Structure',
    level: 'L1',
    primaryPurpose: 'C4 model Level-1 zoom: software system in scope surrounded by people and systems',
    examples: 'Enterprise application ecosystem, SaaS boundary',
    defaultDomain: 'Enterprise Product Architecture',
    previewImage: '/templates/tech_c4_system_context.png',
    keyComponents: ['System in Scope', 'User Personas', 'External Software Systems', 'Data Contracts'],
    generateXml: generateTemplate06C4ContextXml
  },
  {
    id: '07',
    name: 'C4 Container',
    family: 'Structure',
    level: 'L2',
    primaryPurpose: 'C4 model Level-2 zoom: applications, services, databases, and file stores',
    examples: 'Microservices, web applications, serverless clusters',
    defaultDomain: 'Cloud Native Microservices Platform',
    previewImage: '/templates/saas_multi_tenant.png',
    keyComponents: ['Web/Mobile Apps', 'API Gateway', 'Microservices Pods', 'Databases & Caches'],
    generateXml: generateTemplate07C4ContainerXml
  },
  {
    id: '08',
    name: 'Component Architecture',
    family: 'Structure',
    level: 'L2/L3',
    primaryPurpose: 'C4 model Level-3 zoom: internal structural components, controllers, and services',
    examples: 'Services, modules, internal pipelines, class libraries',
    defaultDomain: 'Microservice Internal Component Structure',
    previewImage: '/templates/micro_frontend_architecture.png',
    keyComponents: ['Controllers', 'Service Adapters', 'Repository Layer', 'Domain Logic Entities'],
    generateXml: generateTemplate08ComponentArchXml
  },
  {
    id: '09',
    name: 'Data Flow Architecture',
    family: 'Flow',
    level: 'L1/L2/L3',
    primaryPurpose: 'Movement, processing, transformation, and storage of data',
    examples: 'ETL/ELT, streaming lakehouse, payments pipeline',
    defaultDomain: 'Medallion Data Lakehouse & Stream Processing',
    previewImage: '/templates/etl_elt_cdc_pipeline.png',
    keyComponents: ['Raw Bronze Storage', 'Dataflow Cleaning', 'Silver/Gold Marts', 'Serving APIs'],
    generateXml: generateTemplate09DataFlowXml
  },
  {
    id: '10',
    name: 'Integration Architecture',
    family: 'Flow',
    level: 'L2',
    primaryPurpose: 'System-to-system connectivity, middleware, event brokers, and API gateways',
    examples: 'APIs, Pub/Sub, SaaS connectors, B2B integration',
    defaultDomain: 'Enterprise API Management & Integration Hub',
    previewImage: '/templates/enterprise_api_management.png',
    keyComponents: ['Apigee Gateway', 'Event Backbone', 'Data Integration Connectors', 'External Sinks'],
    generateXml: generateTemplate10IntegrationArchXml
  },
  {
    id: '11',
    name: 'Sequence Diagram',
    family: 'Process',
    level: 'L2/L3',
    primaryPurpose: 'Time-ordered chronological message exchanges between objects or services',
    examples: 'API call sequences, agent task workflow, login SSO, payments',
    defaultDomain: 'Bio-Pharma Enterprise AI Platform (Scientist Copilot Q&A)',
    previewImage: '/templates/multi_agent_sequence_flow.png',
    keyComponents: ['12 Lifelines', '20 Sequence Steps (❶..⑳)', 'Alternative Flows (ALT)', 'Summary Cards'],
    generateXml: generateTemplate11SequenceDiagramXml
  },
  {
    id: '12',
    name: 'State Machine',
    family: 'Process',
    level: 'L2/L3',
    primaryPurpose: 'Discrete entity lifecycle states, trigger events, and transition conditions',
    examples: 'Order states, AI agent execution lifecycle, approval workflows',
    defaultDomain: 'Clinical Study Protocol Intelligence State Machine',
    previewImage: '/templates/governance_state_machine.png',
    keyComponents: ['S0..S9 States', 'E1..E8 Triggers', 'Guardrail Failure Branches', '4 Analytical Cards'],
    generateXml: generateTemplate12StateMachineXml
  },
  {
    id: '13',
    name: 'Decision Flow / Decision Tree',
    family: 'Process',
    level: 'L1/L2',
    primaryPurpose: 'Business rules, conditional logic branching, and AI policy gates',
    examples: 'Clinical trial eligibility, fraud detection rules, automated approval routing',
    defaultDomain: 'Autonomous Clinical Trial Eligibility & Safety Policy Gate',
    previewImage: '/templates/governance_state_machine.png',
    keyComponents: ['Multi-Stage Decision Gates', 'Genomic & DDI Filters', 'AI Confidence Routing', '21 CFR Part 11 Audit Trail'],
    generateXml: generateTemplate13DecisionFlowXml
  },
  {
    id: '14',
    name: 'Data Model / ERD',
    family: 'Structure',
    level: 'L2/L3',
    primaryPurpose: 'Database entities, tables, attributes, primary/foreign keys, and cardinalities',
    examples: 'Relational data model, lakehouse star schema, biopharma enterprise semantic ontology',
    defaultDomain: 'Bio-Pharma Enterprise Entity Model & Relational Schema',
    previewImage: '/templates/erd.png',
    keyComponents: ['24 Entities / Tables', '7 Core Domains', 'Crow’s Foot Cardinality', '4 Analytical Panels'],
    generateXml: generateTemplate14DataModelErdXml
  },
  {
    id: '15',
    name: 'Network Topology',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Network boundaries, VPCs, subnets, routers, firewalls, and gateways',
    examples: 'VPC hub-and-spoke, hybrid cloud, zero-trust perimeter, Private Service Connect',
    defaultDomain: 'GCP Enterprise Landing Zone & Shared VPC',
    previewImage: '/templates/gcp_landing_zone_vpc_map.png',
    keyComponents: ['Public Subnet DMZ', '3 Multi-AZ Subnets', 'Data Subnet Tier', 'Managed Services Bus'],
    generateXml: generateTemplate15NetworkTopologyXml
  },
  {
    id: '16',
    name: 'Deployment Architecture',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Physical/logical mapping of application workloads onto cloud infrastructure',
    examples: 'GKE multi-zone, Cloud Run Jobs, regional data tier, warm DR standby in us-east1',
    defaultDomain: 'Multi-Zone Application & Background Worker Mesh',
    previewImage: '/templates/ha_multi_region_application.png',
    keyComponents: ['Zone A/B/C GKE Autopilot', 'Cloud Run Background Jobs', 'Regional Data Tier', 'Environment Strategy'],
    generateXml: generateTemplate16DeploymentMeshXml
  },
  {
    id: '17',
    name: 'Identity & Access Flow',
    family: 'Security & Governance',
    level: 'L2/L3',
    primaryPurpose: 'Authentication, authorization, token exchange, SSO federation, and IAM',
    examples: 'Google Cloud Identity, IAM least privilege pyramid, Cloud Audit Logs, Access Transparency',
    defaultDomain: 'Zero-Trust Enterprise IAM & Token Exchange',
    previewImage: '/templates/federated_iam_sso.png',
    keyComponents: ['Identity Providers (IdP)', 'IAM Least Privilege Pyramid', 'Resource Access Tier', 'Audit & Retention'],
    generateXml: generateTemplate17IdentityAccessFlowXml
  },
  {
    id: '18',
    name: 'Security / Trust Boundary',
    family: 'Security & Governance',
    level: 'L1/L2/L3',
    primaryPurpose: 'Security zones, encryption perimeters, trust levels, and defense controls',
    examples: 'Zero Trust perimeter, Data Classification pillar (Restricted, Confidential, Internal, Public)',
    defaultDomain: 'Sovereign Zero-Trust Data Protection Enclave',
    previewImage: '/templates/zero_trust_mesh.png',
    keyComponents: ['Edge / Perimeter Zone', 'Application & Data Zones', 'Data Classification Pillar', 'Cross-Cutting Security Controls'],
    generateXml: generateTemplate18SecurityTrustBoundaryXml
  },
  {
    id: '19',
    name: 'HA / DR Architecture',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Resilience engineering, multi-region replication, and failover routing',
    examples: 'Multi-region async replication, RTO <= 1 hr, RPO <= 15 min, Cloud DNS health checks',
    defaultDomain: 'Active-Active Multi-Region Resiliency (Cloud Spanner TrueTime)',
    previewImage: '/templates/tech_multi_region_dr.png',
    keyComponents: ['Active Primary Region', 'Standby DR Region', 'Cross-Region Data Replication', '6-Step Failover Sequence'],
    generateXml: generateTemplate19HaDrArchitectureXml
  },
  {
    id: '20',
    name: 'CI/CD Pipeline',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Automated software delivery lifecycle, GitOps synchronization, and rollout',
    examples: 'Cloud Build CI, Artifact Registry security scan, Cloud Deploy, Canary / Blue-Green rollout',
    defaultDomain: 'SLSA Level 3 GitOps Continuous Delivery Pipeline',
    previewImage: '/templates/secure_deployment_topology_map.png',
    keyComponents: ['9-Stage GitOps Delivery', '4 Quality Gates', '3 Deployment Patterns', 'Automated Rollback Strategy'],
    generateXml: generateTemplate20CiCdPipelineXml
  },
  {
    id: '21',
    name: 'Observability Architecture',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Telemetry collection, distributed tracing, metric aggregation, and SLO alerts',
    examples: 'Logs, metrics, traces, SLO error budget burn rates',
    defaultDomain: 'NovaCura – Full-Stack Observability',
    previewImage: '/templates/enterprise_sre_observability.png',
    keyComponents: ['Telemetry Sources', 'Observability Pillars', 'Google Cloud Pipeline', 'Foundation & Outcomes'],
    generateXml: generateTemplate21ObservabilityArchitectureXml
  },
  {
    id: '22',
    name: 'Migration / Transition Architecture',
    family: 'Delivery & Operations',
    level: 'L1/L2/L3',
    primaryPurpose: 'Step-by-step movement of legacy workloads to cloud target state',
    examples: 'Datacenter to GCP, database CDC migration, Strangler Fig pattern',
    defaultDomain: 'NovaCura – Platform Modernization & Migration',
    previewImage: '/templates/six_rs_migration_matrix.png',
    keyComponents: ['Current State', '5 Migration Phases', 'Target State', '6-Rs Patterns & Deliverables'],
    generateXml: generateTemplate22MigrationTransitionXml
  },
  {
    id: '23',
    name: 'Agent Interaction Architecture',
    family: 'Flow',
    level: 'L1/L2/L3',
    primaryPurpose: 'Multi-agent collaboration, supervisor delegation, and task synthesis',
    examples: 'Supervisor-subagents, swarm mesh, planner/executor',
    defaultDomain: 'NovaCura – Multi-Agent Collaboration for Regulatory Intelligence',
    previewImage: '/templates/tech_agentic_mesh.png',
    keyComponents: ['7-Step Flow', 'Agent Ecosystem (Core/Specialized)', '6 Collaboration Patterns', 'Shared Memory'],
    generateXml: generateTemplate23AgentInteractionXml
  },
  {
    id: '24',
    name: 'RAG / Knowledge Flow Architecture',
    family: 'Flow',
    level: 'L2/L3',
    primaryPurpose: 'Document chunking, vector embeddings, hybrid graph retrieval, and grounding',
    examples: 'Vector RAG, GraphRAG, multimodal clinical RAG',
    defaultDomain: 'NovaCura – Regulatory Q&A with Internal & External Knowledge',
    previewImage: '/templates/graphrag_knowledge_graph.png',
    keyComponents: ['Knowledge Sources', '8-Step RAG Pipeline', 'Knowledge Stores', '6 RAG Flow Patterns'],
    generateXml: generateTemplate24RagKnowledgeFlowXml
  },
  {
    id: '25',
    name: 'Tool / Protocol Interaction Architecture',
    family: 'Flow',
    level: 'L2/L3',
    primaryPurpose: 'Standardized communication between AI models and tools via MCP, A2A, JSON-RPC',
    examples: 'Model Context Protocol (MCP), Agent-to-Agent (A2A), OpenAPI tool bridges',
    defaultDomain: 'NovaCura – Agentic Platform Integrations & Protocol Interactions',
    previewImage: '/templates/mcp_context_gateway.png',
    keyComponents: ['Tool Categories', '5 Protocol Layers', 'Interaction Flow', 'Protocol Mappings'],
    generateXml: generateTemplate25ToolProtocolInteractionXml
  },
  {
    id: '26',
    name: 'HITL / Governance Architecture',
    family: 'Security & Governance',
    level: 'L1/L2',
    primaryPurpose: 'Human-in-the-Loop approval gates, confidence thresholds, and risk review',
    examples: 'AI approval gates, escalation workflows, risk triage',
    defaultDomain: 'NovaCura – Responsible AI with Human-in-the-Loop & Governance',
    previewImage: '/templates/tech_eval_safety.png',
    keyComponents: ['Inputs & Triggers', '6-Step Workflow', 'RACI Matrix', 'HITL Checkpoints & Audit'],
    generateXml: generateTemplate26HitlGovernanceFlowXml
  },
  {
    id: '27',
    name: 'Threat Model Architecture',
    family: 'Security & Governance',
    level: 'L2/L3',
    primaryPurpose: 'STRIDE threat modeling, attack surfaces, malicious vectors, and mitigations',
    examples: 'STRIDE model, prompt injection defense, API attack vectors',
    defaultDomain: 'NovaCura – AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/zero_trust_mesh.png',
    keyComponents: ['Trust Zones', 'Shared Security Services', 'Attack Surface Map', 'STRIDE Catalog & Scenarios'],
    generateXml: generateTemplate27ThreatModelXml
  },
  {
    id: '28',
    name: 'Failure / Exception Flow Architecture',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Failure modes, retry policies, exponential backoff, DLQs, and circuit breakers',
    examples: 'DLQ, retries, circuit breakers, agent timeouts',
    defaultDomain: 'NovaCura – AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/serverless_eda_architecture.png',
    keyComponents: ['Failure Sources', '6-Step End-to-End Flow', '6 Failure Scenarios', 'Severity & Escalation'],
    generateXml: generateTemplate28FailureExceptionFlowXml
  },
  {
    id: '29',
    name: 'Cutover / Runbook Architecture',
    family: 'Delivery & Operations',
    level: 'L3',
    primaryPurpose: 'Step-by-step production cutover checklist, maintenance window, and rollback',
    examples: 'Production launch, DR exercise, cloud cutover runbook',
    defaultDomain: 'NovaCura – Production Go-Live & Environment Cutover',
    previewImage: '/templates/golive_warroom_runbook.png',
    keyComponents: ['Cutover Lifecycle', '8 Detailed Steps', 'Rollback Plan', 'RACI & Timeline Window'],
    generateXml: generateTemplate29CutoverRunbookXml
  },
  {
    id: '30',
    name: 'FinOps / Cost Flow Architecture',
    family: 'Delivery & Operations',
    level: 'L1/L2',
    primaryPurpose: 'Cloud spend ingestion, shared resource allocation, and cost optimization',
    examples: 'Cloud spend, AI token cost attribution, tenant unit economics',
    defaultDomain: 'NovaCura – AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/cloud_finops_chargeback_model.png',
    keyComponents: ['6-Step Cost Flow', 'Data & Tooling Layer', 'Allocation Models', 'FinOps Governance'],
    generateXml: generateTemplate30FinopsCostFlowXml
  },
  {
    id: '31',
    name: 'Dependency / Relationship Map',
    family: 'Analysis & Planning',
    level: 'L2',
    primaryPurpose: 'Arbitrary many-to-many dependencies across systems, services, and datasets',
    examples: 'Microservice dependency graph, blast-radius impact analysis',
    defaultDomain: 'NovaCura – AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/legacy_data_dependency_map.png',
    keyComponents: ['Users', 'Applications', 'Data Layer', 'Integrations', 'Platform & Teams'],
    generateXml: generateTemplate31DependencyMapXml
  },
  {
    id: '32',
    name: 'Architecture Evolution & Roadmap',
    family: 'Analysis & Planning',
    level: 'L1/L2',
    primaryPurpose: 'Multi-year architecture roadmap, maturity milestones, and migration waves',
    examples: 'Target state evolution, 3-year AI transformation roadmap',
    defaultDomain: 'NovaCura – AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/tech_ai_coe.png',
    keyComponents: ['Phase 0 Foundation', 'Phase 1 Scale', 'Phase 2 Intelligent', 'Phase 3 Autonomous'],
    generateXml: generateTemplate32RoadmapEvolutionXml
  },
  {
    id: '33',
    name: 'Architecture Matrix Heatmap',
    family: 'Analysis & Planning',
    level: 'L1/L2',
    primaryPurpose: '2-dimensional evaluation matrix: capabilities vs systems, controls vs workloads',
    examples: 'Vendor evaluation matrix, security control compliance heatmap',
    defaultDomain: 'NovaCura – AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/tech_ai_trism_guardrails.png',
    keyComponents: ['9 Evaluation Criteria', '5 Options (A-E)', 'Weighted Scores & Ranks', 'Strategic Recommendation'],
    generateXml: generateTemplate33MatrixHeatmapXml
  },
  {
    id: '34',
    name: 'Geographic / Regional Architecture',
    family: 'Infrastructure',
    level: 'L1/L2/L3',
    primaryPurpose: 'Geographic layout, sovereign cloud boundaries, and multi-region replication',
    examples: 'Global user base, multi-region sovereign cloud, edge CDN',
    defaultDomain: 'NovaCura – AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/tech_data_residency.png',
    keyComponents: ['Global User Base', 'Regional Overview', '6 Regional Enclave Pods', 'Global Multi-Region Services'],
    generateXml: generateTemplate34GeographicArchitectureXml
  },
  {
    id: '35',
    name: 'FinTech & Autonomous Wealth Engine',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Intelligent, autonomous, and compliant wealth management engine on Google Cloud',
    examples: 'Robo-advisor, wealth tech, algorithmic trading, portfolio rebalancing',
    defaultDomain: 'FinTech Autonomous Wealth & High-Speed Payments',
    previewImage: '/templates/tech_fintech_payments.png',
    keyComponents: ['Channels / Experience', 'Identity & Onboarding', 'Core Wealth Platform', 'Autonomous AI Layer', 'Trading & Market Ecosystem', 'Data & Intelligence', 'Risk & Compliance', 'Platform / MLOps', 'Security Foundation'],
    generateXml: generateTemplate35FintechWealthEngineXml
  },
  {
    id: '36',
    name: 'Smart Manufacturing & Industrial IoT',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Plant floor OT integration, edge control, MES/MOM, and cloud AI digital twin',
    examples: 'Connected factory, predictive maintenance, edge analytics, OEE optimization',
    defaultDomain: 'Smart Manufacturing & Industrial IoT Digital Twin',
    previewImage: '/templates/smart_factory_iot.png',
    keyComponents: ['Shop Floor / OT Channels', 'Edge Control & Site Ops', 'MES / MOM Platform', 'AI / Optimization Layer', 'Enterprise Ecosystem', 'Industrial Intelligence Layer', 'Safety & Governance', 'Platform / DevOps', 'Security Foundation'],
    generateXml: generateTemplate36SmartManufacturingIotXml
  },
  {
    id: '37',
    name: 'Dedicated Network & Infrastructure Blueprint',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Private ingress/egress, PSC connectivity, and secure hybrid cloud networking',
    examples: 'Shared VPC hub-and-spoke, Cloud Interconnect, Private Service Connect, Secure Web Proxy',
    defaultDomain: 'Enterprise Multi-Region Hybrid Cloud Infrastructure',
    previewImage: '/templates/tech_multi_region_dr.png',
    keyComponents: ['Users & External Sources', 'Hybrid Connectivity Edge', 'Private Ingress Layer', 'Shared VPC Hub-and-Spoke', 'Private Workloads Layer', 'Private Service Connect', 'Private Egress Controls', 'Data & Platform Shared Controls', 'Security & Reliability'],
    generateXml: generateTemplate37DedicatedNetworkInfraXml
  },
  {
    id: '38',
    name: 'Cloud Landing Zone & Enterprise Shared Services',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Organization hierarchy, shared services platform, governance, and FinOps guardrails',
    examples: 'Multi-tenant landing zone, organizational units, Golden IaC templates, central logging',
    defaultDomain: 'Enterprise SaaS Multi-Tenant Cloud Platform',
    previewImage: '/templates/secure_deployment_map.png',
    keyComponents: ['Enterprise & Business Units', 'Organization Structure & Hierarchy', 'Identity & Access Admin', 'Core Network Foundation', 'Enterprise Shared Services', 'Security & Compliance', 'Data & AI Shared Services', 'Reliability & SRE', 'FinOps & Billing'],
    generateXml: generateTemplate38CloudLandingZoneXml
  },
  {
    id: '39',
    name: 'Sovereign Cloud & Data Privacy Blueprint',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'National/regional data residency, privacy by design, and sovereign cloud operations',
    examples: 'EU GDPR compliance, sovereign cloud enclaves, automated data classification, local KMS/HSM',
    defaultDomain: 'Sovereign Healthcare & Public Sector Cloud Platform',
    previewImage: '/templates/data_residency_sovereign_map.png',
    keyComponents: ['Governance & Sovereign Oversight', 'Stakeholders & Access Gate', 'Sovereign Cloud Environment', 'Data Classification & Residency', 'Privacy & Security Controls', 'Infrastructure Sovereignty', 'Data Exchange & Controls', 'Monitoring & Audit', 'Compliance Frameworks'],
    generateXml: generateTemplate39SovereignCloudPrivacyXml
  },
  {
    id: '40',
    name: 'Enterprise GenAI & Multi-Agent Platform',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'End-to-end, secure, governed, and observable multi-agent AI platform on Google Cloud',
    examples: 'Multi-agent system, LLM gateway, enterprise RAG pipeline, MCP tool integration, AI governance & HITL',
    defaultDomain: 'Enterprise Multi-Agent GenAI Platform',
    previewImage: '/templates/tech_multi_agent_rag.png',
    keyComponents: ['User & Channels Layer', 'Experience & Access Layer', 'Agent Orchestration Layer', 'Model & Reasoning Layer', 'Memory & RAG Pipeline', 'Tool / MCP Integration', 'Enterprise Systems & Data Sources', 'Zero-Trust Security Foundation', 'Governance / HITL', 'Observability & FinOps', 'Platform Operations'],
    generateXml: generateTemplate40EnterpriseGenAiPlatformXml
  },
  {
    id: '41',
    name: 'Enterprise RAG & Knowledge Intelligence Platform',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Trusted enterprise knowledge retrieval, grounding, citations, governance, and observability',
    examples: 'Enterprise RAG, semantic vector search, knowledge graph, document parsing, grounding & citations, AI safety & compliance',
    defaultDomain: 'Enterprise Knowledge Intelligence Platform',
    previewImage: '/templates/rag_knowledge_flow.png',
    keyComponents: ['User & Channels Layer', 'Access, Identity & Experience Layer', 'Knowledge Experience & Orchestration Layer', 'RAG / Reasoning Layer', 'Memory, Index & Knowledge Layer', '10-Step RAG Pipeline', 'Ingestion, Parsing & Connectors Layer', 'Enterprise Knowledge Sources Layer', 'Security / Privacy Foundation', 'Governance / Compliance', 'Observability & FinOps', 'Platform Operations'],
    generateXml: generateTemplate41EnterpriseRagPlatformXml
  },
  {
    id: '42',
    name: 'Modern Data Lakehouse & Data Mesh',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Unified, governed, scalable, secure, and AI-ready modern data lakehouse and decentralized data mesh architecture',
    examples: 'Enterprise data lakehouse, BigLake, Dataplex mesh governance, domain data products, real-time ingestion, BigQuery analytics',
    defaultDomain: 'Modern Data Lakehouse & Data Mesh Platform',
    previewImage: '/templates/data_flow_architecture.png',
    keyComponents: ['Data Sources Layer', 'Data Ingestion Layer (Steps 1..7)', 'Data Processing & Compute Layer', 'Lakehouse Storage Layer', 'Data Mesh Governance Layer', 'Data Product Layer', 'Consumption Layer', 'Governance & Data Management', 'Observability & Operations', 'Platform Operations'],
    generateXml: generateTemplate42ModernDataLakehouseDataMeshXml
  },
  {
    id: '43',
    name: 'Real-Time Streaming & Event-Driven Enterprise',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Scalable, event-driven, low-latency, resilient, and governed enterprise real-time streaming platform',
    examples: 'Real-time streaming, Pub/Sub, Dataflow Beam, Eventarc, Kafka/Confluent compatibility, event mesh, Spanner/Bigtable stores',
    defaultDomain: 'Real-Time Streaming & Event-Driven Enterprise Platform',
    previewImage: '/templates/event_driven_pipeline.png',
    keyComponents: ['Event Sources Layer', 'Event Ingestion Layer', 'Event Routing & Mesh Layer', 'Stream Processing & Enrichment Layer', 'State, Storage & Analytics Layer', 'Event Consumer & Application Layer', 'Enterprise Business Domains Layer', 'Security & Network Foundation', 'Governance & Event Management', 'Observability & Reliability', 'Platform Operations'],
    generateXml: generateTemplate43RealTimeStreamingEventEnterpriseXml
  },
  {
    id: '44',
    name: 'Zero-Trust Cybersecurity & SOC Platform',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Comprehensive enterprise zero-trust cybersecurity and SecOps platform across continuous identity verification, threat detection, security controls, and 24x7 SOC operations',
    examples: 'Zero-trust architecture, BeyondCorp, Cloud Identity, IAM PDP, Chronicle SIEM, SOAR automation, Cloud Armor, SCC, Mandiant threat intelligence',
    defaultDomain: 'Zero-Trust Cybersecurity & SOC Operations Platform',
    previewImage: '/templates/security_threat_matrix.png',
    keyComponents: ['Consumption Layer', 'Zero-Trust Access Layer', 'Threat Detection & Response Layer', 'Security Controls Layer', 'Visibility & Telemetry Layer', 'Secure Connectivity Layer', 'Asset & Infrastructure Layer', 'Google Cloud Security Foundation', 'Governance, Risk & Compliance', 'Security Operations (SOC)', 'Platform Operations'],
    generateXml: generateTemplate44ZeroTrustCybersecuritySocPlatformXml
  },
  {
    id: '45',
    name: 'Enterprise API, Integration & MCP Gateway',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Unified enterprise API management, event integration, SaaS connectivity, Model Context Protocol (MCP) tool exposure, and end-to-end policy enforcement',
    examples: 'API Gateway, Ingress/Mesh, ESB/iPaaS, MCP Gateway & Tool Discovery, Kafka/PubSub event backbone, SaaS connectors, Zero Trust & PEP, Observability',
    defaultDomain: 'Enterprise API, Integration & MCP Gateway Platform',
    previewImage: '/templates/api_gateway_architecture.png',
    keyComponents: ['Consumer & Channel Layer', 'API Experience & Access Layer', 'Gateway & Traffic Management Layer', 'Integration & Mediation Layer', 'MCP & Tool Exposure Layer', 'Messaging & Event Backbone Layer', 'Enterprise Systems & SaaS Layer', 'Security & Governance Layer', 'Foundational Platform Layer', 'Observability & Operations', 'Operations & Delivery'],
    generateXml: generateTemplate45EnterpriseApiIntegrationMcpGatewayXml
  },
  {
    id: '46',
    name: 'Enterprise Kubernetes & Platform Engineering',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Standardized enterprise Kubernetes platform engineering, multi-cluster management, Golden Paths, GKE runtime, infrastructure, governance, and platform operations',
    examples: 'GKE Fleet, Backstage IDP, Port, ArgoCD GitOps, Kyverno/OPA, Helm/KubeVela, Kubeflow/KServe, Istio Mesh, VPC-native GKE, Cloud Armor, Prometheus/Grafana',
    defaultDomain: 'Enterprise Kubernetes & Platform Engineering Ecosystem',
    previewImage: '/templates/enterprise_k8s_platform.png',
    keyComponents: ['Consumer Layer', 'Platform Services Layer', 'Platform Engineering Layer', 'Cluster Management Layer', 'Kubernetes Runtime Layer', 'Infrastructure Layer', 'Google Cloud Foundation', 'Governance & Compliance', 'Observability & Operations', 'Platform Operations', 'Platform Principles'],
    generateXml: generateTemplate46EnterpriseKubernetesPlatformEngineeringXml
  },
  {
    id: '47',
    name: 'MLOps & AI Model Lifecycle Platform',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Governed, scalable, reproducible, secure, and responsible MLOps & AI model lifecycle platform on Google Cloud',
    examples: 'Model serving & inference, training & tuning, feature store, Vertex AI pipelines, model registry & cards, AI governance & compliance, model observability & drift',
    defaultDomain: 'MLOps & AI Model Lifecycle Platform',
    previewImage: '/templates/mlops_lifecycle_platform.png',
    keyComponents: ['Consumption & Business Value Layer', 'Model Serving & Inference Layer', 'Model Training & Tuning Layer', 'Data & Feature Engineering Layer', 'ML Pipeline Orchestration Layer', 'Model Registry & Lifecycle Layer', 'Infrastructure & ML Foundation Layer', 'Governance, Risk & Compliance', 'Observability & Reliability', 'Platform Operations', 'ML Lifecycle Flow', 'Serving Patterns', 'Model Types'],
    generateXml: generateTemplate47MlopsAiLifecyclePlatformXml
  },
  {
    id: '48',
    name: 'BCDR, Cyber Recovery & Operational Resilience',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Resilient by design, recover with confidence, and continuity assured enterprise disaster recovery and cyber resilience architecture on Google Cloud',
    examples: 'BCDR orchestration & runbooks, recovery workflows & automated failover, BIA, data protection & immutable storage, multi-region infrastructure, cyber incident recovery',
    defaultDomain: 'BCDR & Cyber Recovery Resilience Ecosystem',
    previewImage: '/templates/bcdr_resilience_platform.png',
    keyComponents: ['Resilience Consumers & Business Value', 'Resilience Orchestration & Automation Layer', 'Business Continuity & Disaster Recovery Layer', 'Data Protection Layer', 'Infrastructure Resilience Layer', 'Foundation Services Layer', 'Foundation Infrastructure Layer', 'Resilience Foundation', 'Governance, Risk & Compliance', 'Observability & Assurance', 'Platform Operations', 'Resilience Outcomes', 'Resilience Principles', 'Recovery Strategies', 'Disaster Types'],
    generateXml: generateTemplate48BcdrCyberRecoveryResilienceXml
  },
  {
    id: '49',
    name: 'Healthcare & Life Sciences Digital Platform',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Patient-centric, data-driven, interoperable, secure, and AI-enabled healthcare and life sciences digital platform on Google Cloud',
    examples: 'FHIR APIs, DICOM, OMOP, SNOMED CT, clinical operations, patient 360, population health, life sciences R&D, commercial & market access, imaging AI, healthcare compliance',
    defaultDomain: 'Healthcare & Life Sciences Digital Platform',
    previewImage: '/templates/healthcare_digital_platform.png',
    keyComponents: ['Consumer Experience Layer', 'Application & Solution Layer', 'Data & Intelligence Layer', 'Integration & Interoperability Layer', 'Platform & Services Layer', 'Data Sources Layer', 'Infrastructure Layer', 'Governance, Risk & Compliance', 'Observability & Assurance', 'Platform Operations', 'Key Standards', 'Healthcare Use Cases', 'Life Sciences Use Cases', 'Outcomes'],
    generateXml: generateTemplate49HealthcareLifeSciencesPlatformXml
  },
  {
    id: '50',
    name: 'Sustainability & ESG Intelligence Platform',
    family: 'Reference Architectures',
    level: 'L1/L2/L3',
    primaryPurpose: 'Measure, report, reduce, comply, and innovate enterprise sustainability and ESG intelligence platform on Google Cloud',
    examples: 'Stakeholder ESG portals, carbon intelligence & emissions analytics, GHG Scope 1/2/3 calculations, ESG data models (GRI, SASB, TCFD, CDP, ISSB, EU Taxonomy), double materiality, net zero planning',
    defaultDomain: 'Sustainability & ESG Intelligence Platform',
    previewImage: '/templates/sustainability_esg_platform.png',
    keyComponents: ['Engagement & Impact Layer', 'Analytics & Intelligence Layer', 'Data Integration & Processing Layer', 'ESG Data Model & Governance Layer', 'Sustainability Domain Layer', 'Data Sources & Connectivity Layer', 'Infrastructure Layer', 'Google Cloud Foundation', 'Governance, Risk & Compliance', 'Observability & Assurance', 'Platform Operations', 'Business Outcomes', 'ESG Domains', 'Frameworks & Standards', 'Sustainability by Design'],
    generateXml: generateTemplate50SustainabilityEsgPlatformXml
  }
];






export function injectDomainFlavorXml(xml: string, domainFlavor: string = 'general'): string {
  if (!xml) return '';

  let out = xml;

  if (domainFlavor === 'retail') {
    out = out
      // 1. Branding & Header Subtitles
      .replace(/NOVACURA\s+Bio-Pharma\s+Platform/gi, 'OMNIVUE Retail &amp; Marketplace Platform')
      .replace(/NOVACURA\s+Enterprise\s+AI\s+Platform\s+for\s+Biopharma/gi, 'OMNIVUE Hyper-Scale Omnichannel E-Commerce &amp; Logistics Platform')
      .replace(/NOVACURA\s+Enterprise\s+AI\s+Platform/gi, 'OMNIVUE Retail &amp; E-Commerce Platform')
      .replace(/Enterprise\s+AI\s+Platform\s+for\s+Biopharma/gi, 'Omnichannel Retail &amp; Logistics Platform')
      .replace(/for\s+Biopharma/gi, 'for Omnichannel Retail')
      .replace(/Bio-Pharma\s+Product/gi, 'Omnichannel E-Commerce')
      .replace(/NOVACURA\s+BIO-PHARMA\s+PLATFORM/gi, 'OMNIVUE RETAIL &amp; MARKETPLACE PLATFORM')
      .replace(/NOVACURA/g, 'OMNIVUE')
      .replace(/NovaCura/g, 'OmniVue')
      .replace(/Bio-Pharma\s+Precision\s+Oncology\s+&amp;\s+Regulatory\s+AI/gi, 'Omnichannel Retail &amp; Intelligent Supply Chain')
      .replace(/Bio-Pharma\s+Precision\s+Oncology\s+&\s+Regulatory\s+AI/gi, 'Omnichannel Retail &amp; Intelligent Supply Chain')
      .replace(/Bio-Pharma/gi, 'Omnichannel Retail')
      .replace(/Biopharma/gi, 'Omnichannel Retail')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Hyper-Scale Commerce. Intelligent Fulfillment.')
      .replace(/🧬/g, '🛒')

      // 2. Personas & Actors
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

      // 3. Systems of Record & Gateways
      .replace(/Veeva Vault/gi, 'Enterprise Product Catalog')
      .replace(/CTMS \/ Medidata Rave/gi, 'Warehouse Management (WMS)')
      .replace(/Argus Safety/gi, 'Stripe / Adyen Payment Vault')
      .replace(/Salesforce Health Cloud/gi, 'Salesforce Commerce Cloud')
      .replace(/Laboratory \/ LIMS/gi, 'Carrier Fleet &amp; 3PL Routing')
      .replace(/Regulatory Gateways/gi, 'Customs &amp; Tax Gateways')
      .replace(/FDA 21 CFR Part 11/gi, 'PCI-DSS Level 1 v4.0')
      .replace(/HIPAA/gi, 'SOC 2 Type II')

      // 4. Template 11: Sequence Diagram (Pharma Scenario -> Amazon 1-Click Checkout)
      .replace(/Scientist<br><span style='color:#64748B;font-weight:500;'>\(User\)<\/span>/gi, "Shopper<br><span style='color:#64748B;font-weight:500;'>(Mobile/Web)</span>")
      .replace(/Scientist/g, 'Shopper')
      .replace(/AI Copilot<br><span style='color:#64748B;font-weight:500;'>\(Web App\)<\/span>/gi, "Storefront App<br><span style='color:#64748B;font-weight:500;'>(Next.js / iOS)</span>")
      .replace(/AI Copilot/g, 'Storefront App')
      .replace(/RAG Service<br><span style='color:#64748B;font-weight:500;'>\(Vertex AI\)<\/span>/gi, "Pricing Engine<br><span style='color:#64748B;font-weight:500;'>(Redis Mesh)</span>")
      .replace(/Vector DB<br><span style='color:#64748B;font-weight:500;'>\(BigQuery Vector\)<\/span>/gi, "Inventory Hold<br><span style='color:#64748B;font-weight:500;'>(WMS Engine)</span>")
      .replace(/Data Services<br><span style='color:#64748B;font-weight:500;'>\(Clinical Data APIs\)<\/span>/gi, "Payment Vault<br><span style='color:#64748B;font-weight:500;'>(Stripe / PCI CDE)</span>")
      .replace(/LLM Service<br><span style='color:#64748B;font-weight:500;'>\(Vertex AI\)<\/span>/gi, "Order Ledger<br><span style='color:#64748B;font-weight:500;'>(Cloud Spanner)</span>")
      .replace(/Response &amp; Policy<br><span style='color:#64748B;font-weight:500;'>Service<\/span>/gi, "Fraud &amp; Tax<br><span style='color:#64748B;font-weight:500;'>Service</span>")
      .replace(/Scenario:\s*Scientist asks a clinical question in AI Copilot[\s\S]*?(?=<\/div>|"|&quot;)/i, "Scenario: Shopper initiates 1-Click Checkout in Storefront &rarr; Order Saga reserves WMS inventory (TTL 900s), tokenizes payment via PCI CDE &rarr; Confirms order and dispatches warehouse event.")
      .replace(/POST \/api\/v1\/query[^\<"]*/gi, "POST /api/v1/checkout/1-click (Idempotency-Key)")
      .replace(/Validate user token &amp; clinical entitlements/gi, "Validate session token &amp; shopper profile")
      .replace(/Generate vector embeddings for question/gi, "Acquire distributed lock &amp; verify cart items")
      .replace(/Query vector index for top-k study chunks/gi, "Acquire WMS inventory hold (TTL 900s)")
      .replace(/Fetch raw clinical protocol records/gi, "Authorize tokenized card with payment gateway")
      .replace(/Construct prompt with clinical context/gi, "Commit atomic order transaction to Spanner")
      .replace(/Call Vertex AI Gemini 1\.5 Pro/gi, "Publish OrderCreated event to Kafka event bus")
      .replace(/Validate medical policy &amp; citations/gi, "Execute post-purchase fraud &amp; tax reconciliation")
      .replace(/Log interaction with hash chaining/gi, "Log order audit trail &amp; notify logistics 3PL")
      .replace(/200 OK: Cited clinical answer/gi, "200 OK: Order Confirmed &amp; Delivery ETA")

      // 5. Template 14: Data Model / ERD Entities (Clinical Trials -> E-Commerce Retail)
      .replace(/>Clinical Research</g, ">Merchandising &amp; Catalog<")
      .replace(/>Study<\/div>/g, ">Merchant</div>")
      .replace(/PK study_id/g, "PK merchant_id")
      .replace(/study_id \(FK\)/g, "merchant_id (FK)")
      .replace(/>Protocol<\/div>/g, ">Category</div>")
      .replace(/PK protocol_id/g, "PK category_id")
      .replace(/protocol_id \(FK\)/g, "category_id (FK)")
      .replace(/>Site<\/div>/g, ">Warehouse</div>")
      .replace(/PK site_id/g, "PK warehouse_id")
      .replace(/site_id \(FK\)/g, "warehouse_id (FK)")
      .replace(/>Trial<\/div>/g, ">Order</div>")
      .replace(/PK trial_id/g, "PK order_id")
      .replace(/trial_id \(FK\)/g, "order_id (FK)")
      .replace(/>Patient<\/div>/g, ">Shopper</div>")
      .replace(/PK patient_id/g, "PK shopper_id")
      .replace(/patient_id \(FK\)/g, "shopper_id (FK)")
      .replace(/>Event<\/div>/g, ">Shipment</div>")
      .replace(/PK event_id/g, "PK shipment_id")
      .replace(/event_id \(FK\)/g, "shipment_id (FK)")
      .replace(/>KnowledgeBase<\/div>/g, ">ProductCatalog</div>")
      .replace(/PK kb_id/g, "PK catalog_id")
      .replace(/kb_id \(FK\)/g, "catalog_id (FK)")
      .replace(/>Embedding<\/div>/g, ">SkuEmbedding</div>")
      .replace(/PK embed_id/g, "PK embedding_id")
      .replace(/embed_id \(FK\)/g, "embedding_id (FK)")
      .replace(/>AI Model<\/div>/g, ">RecommendationEngine</div>")
      .replace(/PK model_id/g, "PK rec_model_id")
      .replace(/model_id \(FK\)/g, "rec_model_id (FK)")
      .replace(/>Prompt<\/div>/g, ">Cart</div>")
      .replace(/PK prompt_id/g, "PK cart_id")
      .replace(/prompt_id \(FK\)/g, "cart_id (FK)")
      .replace(/>Response<\/div>/g, ">CartItem</div>")
      .replace(/PK response_id/g, "PK cart_item_id")
      .replace(/response_id \(FK\)/g, "cart_item_id (FK)")
      .replace(/>Policy<\/div>/g, ">PricingPolicy</div>")
      .replace(/PK policy_id/g, "PK pricing_policy_id")
      .replace(/policy_id \(FK\)/g, "pricing_policy_id (FK)")
      .replace(/>Regulation<\/div>/g, ">TaxJurisdiction</div>")
      .replace(/PK regulation_id/g, "PK tax_jurisdiction_id")
      .replace(/regulation_id \(FK\)/g, "tax_jurisdiction_id (FK)")
      .replace(/>Control<\/div>/g, ">FraudRule</div>")
      .replace(/PK control_id/g, "PK fraud_rule_id")
      .replace(/control_id \(FK\)/g, "fraud_rule_id (FK)")
      .replace(/>Risk<\/div>/g, ">ChargebackRisk</div>")
      .replace(/PK risk_id/g, "PK chargeback_id")
      .replace(/risk_id \(FK\)/g, "chargeback_id (FK)")
      .replace(/>DataSource<\/div>/g, ">ERPConnector</div>")
      .replace(/PK source_id/g, "PK erp_source_id")
      .replace(/source_id \(FK\)/g, "erp_source_id (FK)")
      .replace(/>Connector<\/div>/g, ">PaymentGateway</div>")
      .replace(/PK connector_id/g, "PK gateway_id")
      .replace(/connector_id \(FK\)/g, "gateway_id (FK)")
      .replace(/>IngestionJob<\/div>/g, ">InventorySyncJob</div>")
      .replace(/PK job_id/g, "PK sync_job_id")
      .replace(/job_id \(FK\)/g, "sync_job_id (FK)")
      .replace(/>DataAsset<\/div>/g, ">CatalogFeed</div>")
      .replace(/PK asset_id/g, "PK feed_id")
      .replace(/asset_id \(FK\)/g, "feed_id (FK)")
      .replace(/Trial must belong to a Study/gi, "Order must belong to a Shopper")
      .replace(/Event must belong to an enrolled Patient/gi, "Shipment must belong to an Order")
      .replace(/Risk must be mapped to a Control/gi, "Chargeback risk must be screened by a Fraud Rule")
      .replace(/Policy links to one or more Regulations/gi, "Pricing policy links to Tax Jurisdictions")
      .replace(/Response must cite source Documents/gi, "Order total must reconcile with Cart Items");
  } else if (domainFlavor === 'fintech') {
    out = out
      .replace(/NOVACURA\s+Bio-Pharma\s+Platform/gi, 'NEXUSFIN High-Speed Wealth Engine')
      .replace(/NOVACURA/gi, 'NEXUSFIN')
      .replace(/NovaCura/g, 'NexusFin')
      .replace(/Bio-Pharma\s+Precision\s+Oncology/gi, 'FinTech Autonomous Wealth &amp; Payments')
      .replace(/Bio-Pharma/gi, 'FinTech Payments')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Autonomous Wealth. Zero-Latency Execution.')
      .replace(/🧬/g, '💳')
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
      .replace(/Veeva(\s+Vault)?/gi, 'Bloomberg / Refinitiv Feed')
      .replace(/CTMS \/ Medidata Rave/gi, 'FIX Protocol 4.4 Engine')
      .replace(/Argus(\s+Safety)?/gi, 'Plaid / ACH Settlement Mesh')
      .replace(/Medidata(\s+Rave)?/gi, 'FIX Protocol 4.4 Engine')
      .replace(/veeva/gi, 'bloomberg')
      .replace(/argus/gi, 'plaid')
      .replace(/medidata/gi, 'fix_engine')
      .replace(/FDA 21 CFR Part 11/gi, 'SEC Rule 17a-4 / FINRA')
      .replace(/GxP Validated/gi, 'SOC 2 / SEC 15c3-5')
      .replace(/GxP/gi, 'SEC 15c3-5')
      .replace(/HIPAA/gi, 'PCI-DSS Level 1');
  } else if (domainFlavor === 'saas') {
    out = out
      .replace(/NOVACURA\s+Bio-Pharma\s+Platform/gi, 'AETHER Multi-Tenant Cloud Platform')
      .replace(/NOVACURA/gi, 'AETHER')
      .replace(/NovaCura/g, 'Aether')
      .replace(/Bio-Pharma/gi, 'Enterprise SaaS')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Autonomous Multi-Tenant Cloud Scale.')
      .replace(/🧬/g, '☁️');
  } else if (domainFlavor === 'manufacturing') {
    out = out
      .replace(/NOVACURA\s+Bio-Pharma\s+Platform/gi, 'SYNACTIVE Smart Manufacturing IoT')
      .replace(/NOVACURA/gi, 'SYNACTIVE')
      .replace(/NovaCura/g, 'Synactive')
      .replace(/Bio-Pharma/gi, 'Smart Manufacturing')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Industrial IoT. Real-Time Telemetry.')
      .replace(/🧬/g, '🏭');
  } else if (domainFlavor === 'biopharma') {
    out = out
      .replace(/NOVACURA\s+Bio-Pharma\s+Platform/gi, 'Precision Clinical AI &amp; Genomics Platform')
      .replace(/NOVACURA/gi, 'CLINICAL AI')
      .replace(/NovaCura/g, 'Clinical AI Platform')
      .replace(/novacura-prod-vpc/gi, 'clinical-ai-prod-vpc')
      .replace(/novacura-prod/gi, 'clinical-ai-prod');
  } else {
    // Universal domain fallback: Clean enterprise naming
    out = out
      .replace(/NOVACURA\s+Bio-Pharma\s+Platform/gi, 'Enterprise Architecture Platform')
      .replace(/NOVACURA\s+BIO-PHARMA\s+PLATFORM/gi, 'ENTERPRISE ARCHITECTURE PLATFORM')
      .replace(/NOVACURA/gi, 'ENTERPRISE PLATFORM')
      .replace(/NovaCura/g, 'Enterprise Platform')
      .replace(/novacura-prod-vpc/gi, 'enterprise-prod-vpc')
      .replace(/novacura-prod/gi, 'enterprise-prod')
      .replace(/Transforming Therapies\.\s*Improving Lives\./gi, 'Scalable. Resilient. Secure.')
      .replace(/AI-Powered Regulatory Intelligence Platform/gi, 'High-Throughput Distributed Cloud Architecture');
  }

  // Universal Scrub: ensure zero residual Novacura / Novacure occurrences remain
  out = out
    .replace(/NOVACURA/g, 'ENTERPRISE')
    .replace(/NovaCura/g, 'Enterprise')
    .replace(/novacura/g, 'enterprise')
    .replace(/Novacure/g, 'Enterprise')
    .replace(/novacure/g, 'enterprise');

  // Universal XML Ampersand Safety Sanitizer: convert any loose & into &amp;
  out = out.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;');

  return out;
}

export const CANONICAL_TEMPLATES: CanonicalTemplate[] = RAW_TEMPLATES.map(t => {
  const contract = CANONICAL_CONTRACTS[t.id];
  return {
    ...t,
    sourceImageId: `images/${t.id}.png`,
    generatorVersion: contract ? contract.generatorVersion : "1.0",
    fidelityScore: contract && contract.certificationStatus === "certified" ? 0.98 : 0.90,
    certificationStatus: contract ? contract.certificationStatus : "in_review",
    contract,
    generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => {
      const baseXml = t.generateXml(domainFlavor, theme);
      return injectDomainFlavorXml(baseXml, domainFlavor);
    }
  };
});
