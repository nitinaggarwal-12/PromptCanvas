import { CANONICAL_CONTRACTS, CanonicalContract } from './canonicalContracts';
import { INFOGRAPHIC_BLUEPRINTS_LIST, generateInfographicBlueprintXmlById } from './infographicBlueprints52to66';
import { FLOW_DIAGRAM_BLUEPRINTS_67_TO_74, generateFlowDiagramBlueprintXmlById } from './flowDiagramBlueprints67to74';

export interface CanonicalTemplate {
  id: string; // e.g. "01", "02" ... "66"
  name: string;
  family: 'Infographic' | 'Understand' | 'Process' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning' | 'Reference Architectures';
  level: 'L1' | 'L2' | 'L3';
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
  'Infographic',
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

import { generateTemplate00GcpEnterpriseArchXml } from "./template00GcpEnterpriseArch";
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
import { generateTemplate51GraphTheoryLearningRoadmapXml } from "./template51GraphTheoryLearningRoadmap";
import { generateTemplate52ContextHarnessLoopGraphXml } from "./template52ContextHarnessLoopGraph";

interface RawCanonicalTemplate {
  id: string;
  name: string;
  family: 'Infographic' | 'Understand' | 'Process' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning' | 'Reference Architectures';
  level: 'L1' | 'L2' | 'L3';
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
    previewImage: '/templates/gcp_enterprise_architecture.png',
    keyComponents: ['Ingress & Edge', 'Application Core Mesh', 'Real-Time Event Streaming', 'Vertex AI & Intelligence Hub', 'Multi-Region Lakehouse & DB', 'Zero-Trust Security Baseline'],
    generateXml: generateTemplate00GcpEnterpriseArchXml
  },
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
    level: 'L1',
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
    level: 'L2',
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
    level: 'L2',
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
    level: 'L2',
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
    level: 'L2',
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
    level: 'L1',
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
    level: 'L2',
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
    level: 'L3',
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
    level: 'L3',
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
    level: 'L2',
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
    level: 'L2',
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
    level: 'L3',
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
    level: 'L3',
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
    level: 'L2',
    primaryPurpose: 'Telemetry collection, distributed tracing, metric aggregation, and SLO alerts',
    examples: 'Logs, metrics, traces, SLO error budget burn rates',
    defaultDomain: 'Full-Stack Enterprise Observability',
    previewImage: '/templates/enterprise_sre_observability.png',
    keyComponents: ['Telemetry Sources', 'Observability Pillars', 'Google Cloud Pipeline', 'Foundation & Outcomes'],
    generateXml: generateTemplate21ObservabilityArchitectureXml
  },
  {
    id: '22',
    name: 'Migration / Transition Architecture',
    family: 'Delivery & Operations',
    level: 'L1',
    primaryPurpose: 'Step-by-step movement of legacy workloads to cloud target state',
    examples: 'Datacenter to GCP, database CDC migration, Strangler Fig pattern',
    defaultDomain: 'Enterprise Platform Modernization & Migration',
    previewImage: '/templates/six_rs_migration_matrix.png',
    keyComponents: ['Current State', '5 Migration Phases', 'Target State', '6-Rs Patterns & Deliverables'],
    generateXml: generateTemplate22MigrationTransitionXml
  },
  {
    id: '23',
    name: 'Agent Interaction Architecture',
    family: 'Flow',
    level: 'L2',
    primaryPurpose: 'Multi-agent collaboration, supervisor delegation, and task synthesis',
    examples: 'Supervisor-subagents, swarm mesh, planner/executor',
    defaultDomain: 'Multi-Agent Collaboration for Regulatory Intelligence',
    previewImage: '/templates/tech_agentic_mesh.png',
    keyComponents: ['7-Step Flow', 'Agent Ecosystem (Core/Specialized)', '6 Collaboration Patterns', 'Shared Memory'],
    generateXml: generateTemplate23AgentInteractionXml
  },
  {
    id: '24',
    name: 'RAG / Knowledge Flow Architecture',
    family: 'Flow',
    level: 'L2',
    primaryPurpose: 'Document chunking, vector embeddings, hybrid graph retrieval, and grounding',
    examples: 'Vector RAG, GraphRAG, multimodal clinical RAG',
    defaultDomain: 'Regulatory Q&A with Internal & External Knowledge',
    previewImage: '/templates/graphrag_knowledge_graph.png',
    keyComponents: ['Knowledge Sources', '8-Step RAG Pipeline', 'Knowledge Stores', '6 RAG Flow Patterns'],
    generateXml: generateTemplate24RagKnowledgeFlowXml
  },
  {
    id: '25',
    name: 'Tool / Protocol Interaction Architecture',
    family: 'Flow',
    level: 'L2',
    primaryPurpose: 'Standardized communication between AI models and tools via MCP, A2A, JSON-RPC',
    examples: 'Model Context Protocol (MCP), Agent-to-Agent (A2A), OpenAPI tool bridges',
    defaultDomain: 'Agentic Platform Integrations & Protocol Interactions',
    previewImage: '/templates/mcp_context_gateway.png',
    keyComponents: ['Tool Categories', '5 Protocol Layers', 'Interaction Flow', 'Protocol Mappings'],
    generateXml: generateTemplate25ToolProtocolInteractionXml
  },
  {
    id: '26',
    name: 'HITL / Governance Architecture',
    family: 'Security & Governance',
    level: 'L1',
    primaryPurpose: 'Human-in-the-Loop approval gates, confidence thresholds, and risk review',
    examples: 'AI approval gates, escalation workflows, risk triage',
    defaultDomain: 'Responsible AI with Human-in-the-Loop & Governance',
    previewImage: '/templates/tech_eval_safety.png',
    keyComponents: ['Inputs & Triggers', '6-Step Workflow', 'RACI Matrix', 'HITL Checkpoints & Audit'],
    generateXml: generateTemplate26HitlGovernanceFlowXml
  },
  {
    id: '27',
    name: 'Threat Model Architecture',
    family: 'Security & Governance',
    level: 'L3',
    primaryPurpose: 'STRIDE threat modeling, attack surfaces, malicious vectors, and mitigations',
    examples: 'STRIDE model, prompt injection defense, API attack vectors',
    defaultDomain: 'AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/zero_trust_mesh.png',
    keyComponents: ['Trust Zones', 'Shared Security Services', 'Attack Surface Map', 'STRIDE Catalog & Scenarios'],
    generateXml: generateTemplate27ThreatModelXml
  },
  {
    id: '28',
    name: 'Failure / Exception Flow Architecture',
    family: 'Delivery & Operations',
    level: 'L3',
    primaryPurpose: 'Failure modes, retry policies, exponential backoff, DLQs, and circuit breakers',
    examples: 'DLQ, retries, circuit breakers, agent timeouts',
    defaultDomain: 'AI-Powered Regulatory Intelligence Platform',
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
    defaultDomain: 'Production Go-Live & Environment Cutover',
    previewImage: '/templates/golive_warroom_runbook.png',
    keyComponents: ['Cutover Lifecycle', '8 Detailed Steps', 'Rollback Plan', 'RACI & Timeline Window'],
    generateXml: generateTemplate29CutoverRunbookXml
  },
  {
    id: '30',
    name: 'FinOps / Cost Flow Architecture',
    family: 'Delivery & Operations',
    level: 'L1',
    primaryPurpose: 'Cloud spend ingestion, shared resource allocation, and cost optimization',
    examples: 'Cloud spend, AI token cost attribution, tenant unit economics',
    defaultDomain: 'AI-Powered Regulatory Intelligence Platform',
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
    defaultDomain: 'AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/legacy_data_dependency_map.png',
    keyComponents: ['Users', 'Applications', 'Data Layer', 'Integrations', 'Platform & Teams'],
    generateXml: generateTemplate31DependencyMapXml
  },
  {
    id: '32',
    name: 'Architecture Evolution & Roadmap',
    family: 'Analysis & Planning',
    level: 'L1',
    primaryPurpose: 'Multi-year architecture roadmap, maturity milestones, and migration waves',
    examples: 'Target state evolution, 3-year AI transformation roadmap',
    defaultDomain: 'AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/tech_ai_coe.png',
    keyComponents: ['Phase 0 Foundation', 'Phase 1 Scale', 'Phase 2 Intelligent', 'Phase 3 Autonomous'],
    generateXml: generateTemplate32RoadmapEvolutionXml
  },
  {
    id: '33',
    name: 'Architecture Matrix Heatmap',
    family: 'Analysis & Planning',
    level: 'L1',
    primaryPurpose: '2-dimensional evaluation matrix: capabilities vs systems, controls vs workloads',
    examples: 'Vendor evaluation matrix, security control compliance heatmap',
    defaultDomain: 'AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/tech_ai_trism_guardrails.png',
    keyComponents: ['9 Evaluation Criteria', '5 Options (A-E)', 'Weighted Scores & Ranks', 'Strategic Recommendation'],
    generateXml: generateTemplate33MatrixHeatmapXml
  },
  {
    id: '34',
    name: 'Geographic / Regional Architecture',
    family: 'Infrastructure',
    level: 'L3',
    primaryPurpose: 'Geographic layout, sovereign cloud boundaries, and multi-region replication',
    examples: 'Global user base, multi-region sovereign cloud, edge CDN',
    defaultDomain: 'AI-Powered Regulatory Intelligence Platform',
    previewImage: '/templates/tech_data_residency.png',
    keyComponents: ['Global User Base', 'Regional Overview', '6 Regional Enclave Pods', 'Global Multi-Region Services'],
    generateXml: generateTemplate34GeographicArchitectureXml
  },
  {
    id: '35',
    name: 'FinTech & Autonomous Wealth Engine',
    family: 'Reference Architectures',
    level: 'L2',
    primaryPurpose: 'Intelligent, autonomous, and compliant wealth management engine on Google Cloud',
    examples: 'Robo-advisor, wealth tech, algorithmic trading, portfolio rebalancing',
    defaultDomain: 'FinTech Autonomous Wealth & High-Speed Payments',
    previewImage: '/templates/35.png',
    keyComponents: ['Channels / Experience', 'Identity & Onboarding', 'Core Wealth Platform', 'Autonomous AI Layer', 'Trading & Market Ecosystem', 'Data & Intelligence', 'Risk & Compliance', 'Platform / MLOps', 'Security Foundation'],
    generateXml: generateTemplate35FintechWealthEngineXml
  },
  {
    id: '36',
    name: 'Smart Manufacturing & Industrial IoT',
    family: 'Reference Architectures',
    level: 'L2',
    primaryPurpose: 'Plant floor OT integration, edge control, MES/MOM, and cloud AI digital twin',
    examples: 'Connected factory, predictive maintenance, edge analytics, OEE optimization',
    defaultDomain: 'Smart Manufacturing & Industrial IoT Digital Twin',
    previewImage: '/templates/36.png',
    keyComponents: ['Shop Floor / OT Channels', 'Edge Control & Site Ops', 'MES / MOM Platform', 'AI / Optimization Layer', 'Enterprise Ecosystem', 'Industrial Intelligence Layer', 'Safety & Governance', 'Platform / DevOps', 'Security Foundation'],
    generateXml: generateTemplate36SmartManufacturingIotXml
  },
  {
    id: '37',
    name: 'Dedicated Network & Infrastructure Blueprint',
    family: 'Reference Architectures',
    level: 'L3',
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
    level: 'L3',
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
    level: 'L2',
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
    level: 'L2',
    primaryPurpose: 'End-to-end, secure, governed, and observable multi-agent AI platform on Google Cloud',
    examples: 'Multi-agent system, LLM gateway, enterprise RAG pipeline, MCP tool integration, AI governance & HITL',
    defaultDomain: 'Enterprise Multi-Agent GenAI Platform',
    previewImage: '/templates/40.png',
    keyComponents: ['User & Channels Layer', 'Experience & Access Layer', 'Agent Orchestration Layer', 'Model & Reasoning Layer', 'Memory & RAG Pipeline', 'Tool / MCP Integration', 'Enterprise Systems & Data Sources', 'Zero-Trust Security Foundation', 'Governance / HITL', 'Observability & FinOps', 'Platform Operations'],
    generateXml: generateTemplate40EnterpriseGenAiPlatformXml
  },
  {
    id: '41',
    name: 'Enterprise RAG & Knowledge Intelligence Platform',
    family: 'Reference Architectures',
    level: 'L2',
    primaryPurpose: 'Trusted enterprise knowledge retrieval, grounding, citations, governance, and observability',
    examples: 'Enterprise RAG, semantic vector search, knowledge graph, document parsing, grounding & citations, AI safety & compliance',
    defaultDomain: 'Enterprise Knowledge Intelligence Platform',
    previewImage: '/templates/41.png',
    keyComponents: ['User & Channels Layer', 'Access, Identity & Experience Layer', 'Knowledge Experience & Orchestration Layer', 'RAG / Reasoning Layer', 'Memory, Index & Knowledge Layer', '10-Step RAG Pipeline', 'Ingestion, Parsing & Connectors Layer', 'Enterprise Knowledge Sources Layer', 'Security / Privacy Foundation', 'Governance / Compliance', 'Observability & FinOps', 'Platform Operations'],
    generateXml: generateTemplate41EnterpriseRagPlatformXml
  },
  {
    id: '42',
    name: 'Modern Data Lakehouse & Data Mesh',
    family: 'Reference Architectures',
    level: 'L2',
    primaryPurpose: 'Unified, governed, scalable, secure, and AI-ready modern data lakehouse and decentralized data mesh architecture',
    examples: 'Enterprise data lakehouse, BigLake, Dataplex mesh governance, domain data products, real-time ingestion, BigQuery analytics',
    defaultDomain: 'Modern Data Lakehouse & Data Mesh Platform',
    previewImage: '/templates/42.png',
    keyComponents: ['Data Sources Layer', 'Data Ingestion Layer (Steps 1..7)', 'Data Processing & Compute Layer', 'Lakehouse Storage Layer', 'Data Mesh Governance Layer', 'Data Product Layer', 'Consumption Layer', 'Governance & Data Management', 'Observability & Operations', 'Platform Operations'],
    generateXml: generateTemplate42ModernDataLakehouseDataMeshXml
  },
  {
    id: '43',
    name: 'Real-Time Streaming & Event-Driven Enterprise',
    family: 'Reference Architectures',
    level: 'L2',
    primaryPurpose: 'Scalable, event-driven, low-latency, resilient, and governed enterprise real-time streaming platform',
    examples: 'Real-time streaming, Pub/Sub, Dataflow Beam, Eventarc, Kafka/Confluent compatibility, event mesh, Spanner/Bigtable stores',
    defaultDomain: 'Real-Time Streaming & Event-Driven Enterprise Platform',
    previewImage: '/templates/43.png',
    keyComponents: ['Event Sources Layer', 'Event Ingestion Layer', 'Event Routing & Mesh Layer', 'Stream Processing & Enrichment Layer', 'State, Storage & Analytics Layer', 'Event Consumer & Application Layer', 'Enterprise Business Domains Layer', 'Security & Network Foundation', 'Governance & Event Management', 'Observability & Reliability', 'Platform Operations'],
    generateXml: generateTemplate43RealTimeStreamingEventEnterpriseXml
  },
  {
    id: '44',
    name: 'Zero-Trust Cybersecurity & SOC Platform',
    family: 'Reference Architectures',
    level: 'L3',
    primaryPurpose: 'Comprehensive enterprise zero-trust cybersecurity and SecOps platform across continuous identity verification, threat detection, security controls, and 24x7 SOC operations',
    examples: 'Zero-trust architecture, BeyondCorp, Cloud Identity, IAM PDP, Chronicle SIEM, SOAR automation, Cloud Armor, SCC, Mandiant threat intelligence',
    defaultDomain: 'Zero-Trust Cybersecurity & SOC Operations Platform',
    previewImage: '/templates/44.png',
    keyComponents: ['Consumption Layer', 'Zero-Trust Access Layer', 'Threat Detection & Response Layer', 'Security Controls Layer', 'Visibility & Telemetry Layer', 'Secure Connectivity Layer', 'Asset & Infrastructure Layer', 'Google Cloud Security Foundation', 'Governance, Risk & Compliance', 'Security Operations (SOC)', 'Platform Operations'],
    generateXml: generateTemplate44ZeroTrustCybersecuritySocPlatformXml
  },
  {
    id: '45',
    name: 'Enterprise API, Integration & MCP Gateway',
    family: 'Reference Architectures',
    level: 'L2',
    primaryPurpose: 'Unified enterprise API management, event integration, SaaS connectivity, Model Context Protocol (MCP) tool exposure, and end-to-end policy enforcement',
    examples: 'API Gateway, Ingress/Mesh, ESB/iPaaS, MCP Gateway & Tool Discovery, Kafka/PubSub event backbone, SaaS connectors, Zero Trust & PEP, Observability',
    defaultDomain: 'Enterprise API, Integration & MCP Gateway Platform',
    previewImage: '/templates/45.png',
    keyComponents: ['Consumer & Channel Layer', 'API Experience & Access Layer', 'Gateway & Traffic Management Layer', 'Integration & Mediation Layer', 'MCP & Tool Exposure Layer', 'Messaging & Event Backbone Layer', 'Enterprise Systems & SaaS Layer', 'Security & Governance Layer', 'Foundational Platform Layer', 'Observability & Operations', 'Operations & Delivery'],
    generateXml: generateTemplate45EnterpriseApiIntegrationMcpGatewayXml
  },
  {
    id: '46',
    name: 'Enterprise Kubernetes & Platform Engineering',
    family: 'Reference Architectures',
    level: 'L3',
    primaryPurpose: 'Standardized enterprise Kubernetes platform engineering, multi-cluster management, Golden Paths, GKE runtime, infrastructure, governance, and platform operations',
    examples: 'GKE Fleet, Backstage IDP, Port, ArgoCD GitOps, Kyverno/OPA, Helm/KubeVela, Kubeflow/KServe, Istio Mesh, VPC-native GKE, Cloud Armor, Prometheus/Grafana',
    defaultDomain: 'Enterprise Kubernetes & Platform Engineering Ecosystem',
    previewImage: '/templates/46.png',
    keyComponents: ['Consumer Layer', 'Platform Services Layer', 'Platform Engineering Layer', 'Cluster Management Layer', 'Kubernetes Runtime Layer', 'Infrastructure Layer', 'Google Cloud Foundation', 'Governance & Compliance', 'Observability & Operations', 'Platform Operations', 'Platform Principles'],
    generateXml: generateTemplate46EnterpriseKubernetesPlatformEngineeringXml
  },
  {
    id: '47',
    name: 'MLOps & AI Model Lifecycle Platform',
    family: 'Reference Architectures',
    level: 'L2',
    primaryPurpose: 'Governed, scalable, reproducible, secure, and responsible MLOps & AI model lifecycle platform on Google Cloud',
    examples: 'Model serving & inference, training & tuning, feature store, Vertex AI pipelines, model registry & cards, AI governance & compliance, model observability & drift',
    defaultDomain: 'MLOps & AI Model Lifecycle Platform',
    previewImage: '/templates/47.png',
    keyComponents: ['Consumption & Business Value Layer', 'Model Serving & Inference Layer', 'Model Training & Tuning Layer', 'Data & Feature Engineering Layer', 'ML Pipeline Orchestration Layer', 'Model Registry & Lifecycle Layer', 'Infrastructure & ML Foundation Layer', 'Governance, Risk & Compliance', 'Observability & Reliability', 'Platform Operations', 'ML Lifecycle Flow', 'Serving Patterns', 'Model Types'],
    generateXml: generateTemplate47MlopsAiLifecyclePlatformXml
  },
  {
    id: '48',
    name: 'BCDR, Cyber Recovery & Operational Resilience',
    family: 'Reference Architectures',
    level: 'L3',
    primaryPurpose: 'Resilient by design, recover with confidence, and continuity assured enterprise disaster recovery and cyber resilience architecture on Google Cloud',
    examples: 'BCDR orchestration & runbooks, recovery workflows & automated failover, BIA, data protection & immutable storage, multi-region infrastructure, cyber incident recovery',
    defaultDomain: 'BCDR & Cyber Recovery Resilience Ecosystem',
    previewImage: '/templates/48.png',
    keyComponents: ['Resilience Consumers & Business Value', 'Resilience Orchestration & Automation Layer', 'Business Continuity & Disaster Recovery Layer', 'Data Protection Layer', 'Infrastructure Resilience Layer', 'Foundation Services Layer', 'Foundation Infrastructure Layer', 'Resilience Foundation', 'Governance, Risk & Compliance', 'Observability & Assurance', 'Platform Operations', 'Resilience Outcomes', 'Resilience Principles', 'Recovery Strategies', 'Disaster Types'],
    generateXml: generateTemplate48BcdrCyberRecoveryResilienceXml
  },
  {
    id: '49',
    name: 'Healthcare & Life Sciences Digital Platform',
    family: 'Reference Architectures',
    level: 'L2',
    primaryPurpose: 'Patient-centric, data-driven, interoperable, secure, and AI-enabled healthcare and life sciences digital platform on Google Cloud',
    examples: 'FHIR APIs, DICOM, OMOP, SNOMED CT, clinical operations, patient 360, population health, life sciences R&D, commercial & market access, imaging AI, healthcare compliance',
    defaultDomain: 'Healthcare & Life Sciences Digital Platform',
    previewImage: '/templates/49.png',
    keyComponents: ['Consumer Experience Layer', 'Application & Solution Layer', 'Data & Intelligence Layer', 'Integration & Interoperability Layer', 'Platform & Services Layer', 'Data Sources Layer', 'Infrastructure Layer', 'Governance, Risk & Compliance', 'Observability & Assurance', 'Platform Operations', 'Key Standards', 'Healthcare Use Cases', 'Life Sciences Use Cases', 'Outcomes'],
    generateXml: generateTemplate49HealthcareLifeSciencesPlatformXml
  },
  {
    id: '50',
    name: 'Sustainability & ESG Intelligence Platform',
    family: 'Reference Architectures',
    level: 'L1',
    primaryPurpose: 'Measure, report, reduce, comply, and innovate enterprise sustainability and ESG intelligence platform on Google Cloud',
    examples: 'Stakeholder ESG portals, carbon intelligence & emissions analytics, GHG Scope 1/2/3 calculations, ESG data models (GRI, SASB, TCFD, CDP, ISSB, EU Taxonomy), double materiality, net zero planning',
    defaultDomain: 'Sustainability & ESG Intelligence Platform',
    previewImage: '/templates/50.png',
    keyComponents: ['Engagement & Impact Layer', 'Analytics & Intelligence Layer', 'Data Integration & Processing Layer', 'ESG Data Model & Governance Layer', 'Sustainability Domain Layer', 'Data Sources & Connectivity Layer', 'Infrastructure Layer', 'Google Cloud Foundation', 'Governance, Risk & Compliance', 'Observability & Assurance', 'Platform Operations', 'Business Outcomes', 'ESG Domains', 'Frameworks & Standards', 'Sustainability by Design'],
    generateXml: generateTemplate50SustainabilityEsgPlatformXml
  },
  {
    id: '51',
    name: 'Graph Theory & Algorithm Learning Roadmap',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'Comprehensive visual learning roadmap for graph theory, from intuition and avatar analogies to Dijkstra algorithm workflow',
    examples: 'Graph Theory, Network Topology, Knowledge Graph, Dijkstra, BFS/DFS, Algorithm Roadmap',
    defaultDomain: 'Graph Theory & Discrete Mathematics',
    previewImage: '/templates/51_enterprise_api_management.png',
    keyComponents: ['Graph Intuition & Social Analogy', 'Essential Prerequisites', 'Visual Taxonomy', 'Modern Graph Science & Knowledge Graph', 'Key Graph Algorithms Workflow'],
    generateXml: generateTemplate51GraphTheoryLearningRoadmapXml
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
    primaryPurpose: fb.primaryPurpose,
    examples: `${fb.shortType}, 7-Layer Google Cloud Operational Flowchart, Agentic AI Execution Flow`,
    defaultDomain: 'Google Cloud Enterprise Agentic AI & Operational Flow',
    previewImage: fb.previewImage,
    keyComponents: fb.keyComponents,
    generateXml: () => generateFlowDiagramBlueprintXmlById(fb.id)
  }))
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
  [/\bPagerDuty\b/gi, 'On-Call Incident Routing'],
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
  [/\bApigee(?:\s+X)?\s+Gateway\b/gi, 'Cloud API Gateway'],
  [/\bApigee\s+X\b/gi, 'Cloud API Gateway'],
  [/\bApigee\b/gi, 'Cloud API Gateway'],
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
  [/Approved\s+LLM\s+Service(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)*\((?:Google|GCP)\s+Vertex\s+AI\)/gi, 'Enterprise LLM &amp; Agent Runtime'],
  [/Google(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Vertex\s+AI/gi, 'Governed LLM Runtime'],
  [/\bGoogle\s+Cloud\s+Platform\s*\(GCP\)/gi, 'Enterprise Cloud Infrastructure'],
  [/\bGoogle\s+Kubernetes\s+Engine\s*\(GKE\)/gi, 'Managed Kubernetes (K8s)'],
  [/Private(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Google(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Access/gi, 'Private Service Access'],
  [/\bGoogle\s+Groups\b/gi, 'Directory Groups'],
  [/\bGoogle\s+AT\s+Logs\b/gi, 'Access Transparency Logs'],
  [/\bGoogle\s+Identity\s+Platform\b/gi, 'Enterprise Identity Platform'],
  [/\bGoogle\s+Search\s+API\b/gi, 'Web Search Grounding API'],
  [/\bGoogle\s+Search\b/gi, 'Web Search Grounding'],
  [/\bGOOGLE\s+NATIVE\b/gi, 'CLOUD NATIVE'],
  [/\bGoogle\s+(Blue|Red|Yellow|Green)\b/gi, 'Tier $1'],
  [/\bGoogle\s+Gemini\b/gi, 'Frontier Multimodal'],
  [/\bRaw\s+Gemini\s+API\b/gi, 'Stateless Foundation Model API'],
  [/\bGemini\s+Apps\b/gi, 'Enterprise Copilot Apps'],
  [/\bGemini\s+3\b/gi, 'Frontier LLM'],
  [/\bGem\s*ini\b/gi, 'Frontier LLM'],
  [/Vertex(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Matching(?:\s|&lt;br\s*\/?&gt;|<br\s*\/?>)+Engine/gi, 'Vector Similarity Index'],
  [/\bVertex\s+Embeddings\b/gi, 'Dense Vector Embeddings'],
  [/\bVertex\s+Vector\s+Search\b/gi, 'Vector Similarity Search'],
  [/\bVertex\s+Agent\s+Builder\b/gi, 'Visual Agent Studio'],
  [/\bGoogle\s+Cloud\b/gi, 'Enterprise Cloud'],
  [/\bVertex\s+AI\b/gi, 'Governed AI Runtime'],
  [/\bVertex\b(?!=|\s*\(Node\)|&lt;\/strong&gt;\s*\(Node\)|<\/strong>\s*\(Node\))/g, 'AI Runtime'],
  [/\bBigQuery\b/gi, 'Cloud Data Warehouse'],
  [/\bAlloyDB\b/gi, 'Transactional PostgreSQL'],
  [/\bCloud\s+SQL\b/gi, 'Managed PostgreSQL HA'],
  [/\bCloud\s+Run\b/gi, 'Serverless Container Runtime'],
  [/\bGoogle\b/gi, 'Enterprise'],
  [/\bGCP\b/g, 'Cloud'],

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
  'header_logo',
  'brand_block',
  'logo_box',
  'plat_brand',
  'hdr_gcp',
  'hdr_gcp_logo',
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
  if (/ingestion|stream|event|pubsub/.test(t)) return 'CDC / Kafka / PubSub • Schema Registry • DLQ';
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

export function sanitizeAndHealCanonicalBlueprintXml(xml: string, templateId?: string): string {
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

        // Auto-enrich sparse functional cards (w>=115, h>=58, area>=9000, <32 chars of plain text)
        const geom = vertexGeomMap.get(id);
        const isBorderedCard =
          geom &&
          geom.w >= 115 &&
          geom.h >= 58 &&
          geom.w * geom.h >= 9000 &&
          !/fillColor=none/i.test(style) &&
          !/strokeColor=none/i.test(style) &&
          !/shape=(?:ellipse|rhombus|cylinder|step|hexagon|cloud|triangle)/i.test(style) &&
          !/^(?:hdr|title|lbl|leg|ftr|band_num|chev|gate|phase|step|pil|tiers)/i.test(id);

        if (isBorderedCard && plainText.length >= 4 && plainText.length < 32) {
          const subCap = getContextualTechnicalSubcaption(plainText);
          const subColor = isDarkXml ? '#94A3B8' : '#475569';
          const subTag = `&lt;div style=&quot;font-size:8px;color:${subColor};font-weight:600;margin-top:2px;line-height:1.15;&quot;&gt;${subCap}&lt;/div&gt;`;
          if (!val.includes(subCap)) {
            if (/&lt;\/td&gt;\s*&lt;\/tr&gt;\s*&lt;\/table&gt;\s*$/i.test(val)) {
              val = val.replace(/(&lt;\/td&gt;\s*&lt;\/tr&gt;\s*&lt;\/table&gt;\s*)$/i, `${subTag}$1`);
            } else if (/&lt;\/div&gt;\s*$/i.test(val)) {
              val = val.replace(/(&lt;\/div&gt;\s*)$/i, `${subTag}$1`);
            } else {
              val = `${val}${subTag}`;
            }
          }
        }

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

  return sanitizeAndHealCanonicalBlueprintXml(out);
}

export const CANONICAL_TEMPLATES: CanonicalTemplate[] = RAW_TEMPLATES.map(t => {
  const contract = CANONICAL_CONTRACTS[t.id];
  const paddedId = t.id.padStart(2, '0');
  const cleanName = t.id === '00'
    ? '2026 Upgraded GCP & Gemini Enterprise Native Architecture'
    : t.name
        .replace(/\bCLAUDE\.md\b/gi, 'AGENTS.md')
        .replace(/\bGPT-6\s+Astra\b/gi, 'Frontier Agent')
        .replace(/\bGCP\s+Enterprise\s+Architecture\b/gi, 'Cloud-Native Enterprise Architecture')
        .replace(/\bRaw\s+Gemini\s+API\b/gi, 'Stateless Foundation API')
        .replace(/\bVertex\s+AI\s+Agent\s+Engine\b/gi, 'Governed Agent Engine')
        .replace(/^Google\s+Cloud\s+/i, 'Enterprise Cloud ');
  return {
    ...t,
    name: cleanName,
    previewImage: `/templates/canonical_${paddedId}.png`,
    sourceImageId: `/templates/canonical_${paddedId}.png`,
    generatorVersion: contract ? contract.generatorVersion : "1.0",
    fidelityScore: contract && contract.certificationStatus === "certified" ? 0.98 : 0.90,
    certificationStatus: contract ? contract.certificationStatus : "in_review",
    contract,
    generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => {
      const baseXml = t.generateXml(domainFlavor, theme);
      if (t.id === '00' && (!domainFlavor || domainFlavor === 'general')) {
        return baseXml;
      }
      return sanitizeAndHealCanonicalBlueprintXml(injectDomainFlavorXml(baseXml, domainFlavor), t.id);
    }
  };
});
