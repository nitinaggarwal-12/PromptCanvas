export interface CanonicalTemplate {
  id: string; // e.g. "01", "02" ... "34"
  name: string;
  family: 'Understand' | 'Process' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning';
  level: 'L1' | 'L2' | 'L3' | 'L1/L2' | 'L2/L3' | 'L1/L2/L3';
  primaryPurpose: string;
  examples: string;
  defaultDomain: string;
  previewImage?: string;
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
] as const;

export const DOMAIN_PRESETS = [
  { id: 'biopharma', name: 'Bio-Pharma Precision Oncology & Regulatory AI', prefix: 'NOVACURA' },
  { id: 'fintech', name: 'FinTech Autonomous Wealth & High-Speed Payments', prefix: 'NEXUSFIN' },
  { id: 'manufacturing', name: 'Smart Manufacturing & Industrial IoT Digital Twin', prefix: 'SYNACTIVE' },
  { id: 'retail', name: 'Omnichannel Retail & Intelligent Supply Chain', prefix: 'OMNIVUE' },
  { id: 'saas', name: 'Enterprise SaaS Multi-Tenant Cloud Platform', prefix: 'AETHER' },
];

import { generateTemplate01ExactV3Xml } from "./template01ExactV3";

/**
 * High-Fidelity 1:1 XML Generator for Template 01: System Context
 * Matches the NOVACURA Bio-Pharma Platform Architecture from Canonical PDF Page 1 / images/01.png
 */
export function generateSystemContextXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  return generateTemplate01ExactV3Xml(domainFlavor, theme);
}

export const CANONICAL_TEMPLATES: CanonicalTemplate[] = [
  {
    id: '01',
    name: 'System Context',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'System boundary + internal/external actors + connected ecosystem',
    examples: 'Enterprise App, SaaS Platform, AI Copilot, Life Sciences, Payments',
    defaultDomain: 'Bio-Pharma Precision Oncology & Regulatory AI',
    keyComponents: ['Platform Boundary', 'Internal Actors', 'External Partners', 'Connected Systems', 'Governance'],
    generateXml: generateSystemContextXml
  },
  {
    id: '02',
    name: 'Capability Map',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'Business, technical, and operational capability taxonomy',
    examples: 'Enterprise capabilities, AI capabilities, platform capabilities',
    defaultDomain: 'Enterprise AI & Platform Engineering',
    keyComponents: ['Business Capabilities', 'AI Foundation', 'Shared Core Services', 'Governance Matrix'],
    generateXml: generateSystemContextXml
  },
  {
    id: '03',
    name: 'Business Process / Swimlane',
    family: 'Process',
    level: 'L1/L2',
    primaryPurpose: 'Roles, activities, handoffs, and decisions across departments',
    examples: 'Claims triage, onboarding, approval gates, DevOps release',
    defaultDomain: 'Clinical Trials & Regulatory Operations',
    keyComponents: ['Department Swimlanes', 'Hand-off Triggers', 'Approval Decision Gates', 'Audit Milestones'],
    generateXml: generateSystemContextXml
  },
  {
    id: '04',
    name: 'Value Stream',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'End-to-end value delivery stages, cycle times, and outcomes',
    examples: 'Migration VSM, software delivery, patient journey',
    defaultDomain: 'Research-to-Commercial Patient Journey',
    keyComponents: ['Value Stages', 'Key Activities', 'Process & Lead Time Metrics', 'Delivered Outcomes'],
    generateXml: generateSystemContextXml
  },
  {
    id: '05',
    name: 'As-Is / To-Be',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'Transformation comparison between legacy silos and cloud target state',
    examples: 'Cloud migration, modernization, AI transformation',
    defaultDomain: 'Enterprise Cloud Transformation',
    keyComponents: ['As-Is Legacy Silos', 'Transformation Drivers', 'To-Be Cloud Target', 'Business ROI'],
    generateXml: generateSystemContextXml
  },
  {
    id: '06',
    name: 'C4 Context',
    family: 'Structure',
    level: 'L1',
    primaryPurpose: 'C4 Level 1 zoom: System in scope surrounded by people and enterprise systems',
    examples: 'Enterprise application ecosystem, SaaS boundary',
    defaultDomain: 'Enterprise Product Architecture',
    keyComponents: ['System in Scope', 'User Personas', 'External Software Systems', 'Data Contracts'],
    generateXml: generateSystemContextXml
  },
  {
    id: '07',
    name: 'C4 Container',
    family: 'Structure',
    level: 'L2',
    primaryPurpose: 'C4 Level 2 zoom: Applications, microservices, databases, and message queues',
    examples: 'Microservices, web applications, serverless clusters',
    defaultDomain: 'Cloud Native Microservices Platform',
    keyComponents: ['Web/Mobile Apps', 'API Gateway', 'Microservices Pods', 'Databases & Caches'],
    generateXml: generateSystemContextXml
  },
  {
    id: '08',
    name: 'Component Architecture',
    family: 'Structure',
    level: 'L2/L3',
    primaryPurpose: 'C4 Level 3 zoom: Internal software components, controllers, and service layers',
    examples: 'Services, modules, internal pipelines, class libraries',
    defaultDomain: 'Microservice Internal Component Structure',
    keyComponents: ['Controllers', 'Service Adapters', 'Repository Layer', 'Domain Logic Entities'],
    generateXml: generateSystemContextXml
  },
  {
    id: '09',
    name: 'Data Flow Architecture',
    family: 'Flow',
    level: 'L1/L2/L3',
    primaryPurpose: 'Movement, processing, transformation, and storage of data across tiers',
    examples: 'ETL/ELT, streaming lakehouse, payments pipeline',
    defaultDomain: 'Medallion Data Lakehouse & Stream Processing',
    keyComponents: ['Raw Bronze Storage', 'Dataflow Cleaning', 'Silver/Gold Marts', 'Serving APIs'],
    generateXml: generateSystemContextXml
  },
  {
    id: '10',
    name: 'Integration Architecture',
    family: 'Flow',
    level: 'L2',
    primaryPurpose: 'System-to-system connectivity, middleware, event brokers, and API gateways',
    examples: 'APIs, Pub/Sub, SaaS connectors, B2B integration',
    defaultDomain: 'Enterprise API Management & Integration Hub',
    keyComponents: ['Apigee Gateway', 'Event Backbone', 'Data Integration Connectors', 'External Sinks'],
    generateXml: generateSystemContextXml
  },
  {
    id: '11',
    name: 'Sequence Diagram',
    family: 'Process',
    level: 'L2/L3',
    primaryPurpose: 'Time-ordered chronological message exchanges between systems and services',
    examples: 'API call sequences, agent task workflow, login SSO, payments',
    defaultDomain: 'Multi-Agent LLM Retrieval & Grounding Flow',
    keyComponents: ['Lifelines', 'Synchronous Messages', 'Async Events', 'Activation Bars'],
    generateXml: generateSystemContextXml
  },
  {
    id: '12',
    name: 'State Machine',
    family: 'Process',
    level: 'L2/L3',
    primaryPurpose: 'Discrete entity lifecycle states, trigger events, and transition guard conditions',
    examples: 'Order states, AI agent execution lifecycle, approval workflows',
    defaultDomain: 'Clinical Study Protocol Intelligence State Machine',
    keyComponents: ['Initial/Final States', 'Transition Triggers', 'Guardrail Rules', 'State Handlers'],
    generateXml: generateSystemContextXml
  },
  {
    id: '13',
    name: 'Decision Flow / Decision Tree',
    family: 'Process',
    level: 'L1/L2',
    primaryPurpose: 'Business rules, conditional logic branching, and AI policy evaluation gates',
    examples: 'Routing trees, approvals, AI confidence thresholds, risk scoring',
    defaultDomain: 'AI Regulatory Triage & Multi-Tier Escalation Decision Tree',
    keyComponents: ['Inbound Event', 'Decision Diamonds', 'Confidence Gates', 'Action Sinks'],
    generateXml: generateSystemContextXml
  },
  {
    id: '14',
    name: 'Data Model / ERD',
    family: 'Structure',
    level: 'L2/L3',
    primaryPurpose: 'Database entities, tables, attributes, primary/foreign keys, and cardinalities',
    examples: 'Relational databases, lakehouse star schema, semantic model',
    defaultDomain: 'Clinical Trial Genomics & EHR Star Schema',
    keyComponents: ['Entities/Tables', 'Primary/Foreign Keys', 'Crow\'s Foot Cardinality', 'Data Types'],
    generateXml: generateSystemContextXml
  },
  {
    id: '15',
    name: 'Network Topology',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Network boundaries, VPCs, subnets, routers, firewalls, and gateways',
    examples: 'VPC hub-and-spoke, hybrid cloud, zero-trust perimeter',
    defaultDomain: 'GCP Enterprise Landing Zone & Shared VPC',
    keyComponents: ['Public Subnet DMZ', 'Private App Subnet', 'Database Subnet', 'Cloud Interconnect'],
    generateXml: generateSystemContextXml
  },
  {
    id: '16',
    name: 'Deployment Architecture',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Physical/logical mapping of application workloads onto cloud infrastructure',
    examples: 'GKE multi-cluster, Cloud Run, multi-region failover',
    defaultDomain: 'Multi-Region High-Availability Cloud Deployment',
    keyComponents: ['Primary Region', 'Secondary Region', 'Global Load Balancer', 'Data Replication'],
    generateXml: generateSystemContextXml
  },
  {
    id: '17',
    name: 'Identity & Access Flow',
    family: 'Security & Governance',
    level: 'L2/L3',
    primaryPurpose: 'Authentication, authorization, token exchange, SSO federation, and IAM',
    examples: 'Workload Identity Federation, OAuth 2.1 / OIDC, BeyondCorp',
    defaultDomain: 'Zero-Trust Enterprise IAM & Token Exchange',
    keyComponents: ['External IdP', 'Security Token Service (STS)', 'IAM Workload Pools', 'Audit Ledger'],
    generateXml: generateSystemContextXml
  },
  {
    id: '18',
    name: 'Security / Trust Boundary',
    family: 'Security & Governance',
    level: 'L1/L2/L3',
    primaryPurpose: 'Security zones, encryption perimeters, trust levels, and defense-in-depth',
    examples: 'Zero Trust, PCI-DSS enclaves, PHI protection, Assured Workloads',
    defaultDomain: 'Sovereign Zero-Trust Data Protection Enclave',
    keyComponents: ['Internet Untrusted Zone', 'Edge WAF DMZ', 'Trusted App Enclave', 'Hardware Key Vault'],
    generateXml: generateSystemContextXml
  },
  {
    id: '19',
    name: 'HA / DR Architecture',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Resilience engineering, multi-region replication, and failover routing',
    examples: 'Active-active multi-region, hot standby, backup/restore',
    defaultDomain: 'Active-Active Multi-Region Resiliency (Cloud Spanner TrueTime)',
    keyComponents: ['Active Region (Iowa)', 'Standby Region (Virginia)', 'DNS Health Checks', 'RTO/RPO Metrics'],
    generateXml: generateSystemContextXml
  },
  {
    id: '20',
    name: 'CI/CD Pipeline',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Automated software delivery lifecycle, GitOps synchronization, and rollout',
    examples: 'GitOps declarative delivery, progressive canary rollout, SLSA L3',
    defaultDomain: 'SLSA Level 3 GitOps Continuous Delivery Pipeline',
    keyComponents: ['Source Repo', 'Cloud Build CI', 'Artifact Registry & Scan', 'Canary Rollout Target'],
    generateXml: generateSystemContextXml
  },
  {
    id: '21',
    name: 'Observability / SRE',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Telemetry collection, distributed tracing, metric aggregation, and SLO alerts',
    examples: 'Logs, metrics, traces, SLO error budget burn rates',
    defaultDomain: 'Enterprise SRE Observability & OpenTelemetry Mesh',
    keyComponents: ['OpenTelemetry Sidecars', 'Cloud Logging / Monitoring', 'Prometheus', 'SLO Alert Engine'],
    generateXml: generateSystemContextXml
  },
  {
    id: '22',
    name: 'Migration / Transition',
    family: 'Delivery & Operations',
    level: 'L1/L2/L3',
    primaryPurpose: 'Step-by-step movement of legacy workloads to cloud target state (6-Rs)',
    examples: 'Datacenter to GCP, database CDC migration, Strangler Fig pattern',
    defaultDomain: '6-Rs Wave Migration & Cloud Factory',
    keyComponents: ['Assess & Discover', 'Target Landing Zone', 'Live CDC Replication', 'Cutover & Decommission'],
    generateXml: generateSystemContextXml
  },
  {
    id: '23',
    name: 'Agent Interaction',
    family: 'Flow',
    level: 'L1/L2/L3',
    primaryPurpose: 'Multi-agent collaboration, supervisor delegation, and task synthesis',
    examples: 'Supervisor-subagents, swarm mesh, planner/executor',
    defaultDomain: 'Hierarchical Multi-Agent Clinical Reasoning Swarm',
    keyComponents: ['Supervisor Agent', 'Domain Subagents', 'Shared Redis Memory', 'Safety Gate'],
    generateXml: generateSystemContextXml
  },
  {
    id: '24',
    name: 'RAG / Knowledge Flow',
    family: 'Flow',
    level: 'L2/L3',
    primaryPurpose: 'Document chunking, vector embeddings, hybrid graph retrieval, and grounding',
    examples: 'Vector RAG, GraphRAG, multimodal clinical RAG',
    defaultDomain: 'Multi-Hop GraphRAG Knowledge Engine',
    keyComponents: ['Document Parser', 'Vector Embeddings', 'Spanner Graph (ISO GQL)', 'Gemini Model Armor'],
    generateXml: generateSystemContextXml
  },
  {
    id: '25',
    name: 'Tool / Protocol Interaction',
    family: 'Flow',
    level: 'L2/L3',
    primaryPurpose: 'Standardized communication between AI models and tools via MCP, A2A, JSON-RPC',
    examples: 'Model Context Protocol (MCP), Agent-to-Agent (A2A), OpenAPI tool bridges',
    defaultDomain: 'Model Context Protocol (MCP) Enterprise Gateway',
    keyComponents: ['Agent Client', 'MCP JSON-RPC Bridge', 'MicroVM Sandboxes', 'Enterprise Tool Registry'],
    generateXml: generateSystemContextXml
  },
  {
    id: '26',
    name: 'HITL / Governance Flow',
    family: 'Security & Governance',
    level: 'L1/L2',
    primaryPurpose: 'Human-in-the-Loop approval gates, confidence thresholds, and risk review',
    examples: 'AI approval gates, escalation workflows, risk triage',
    defaultDomain: 'FDA 21 CFR Part 11 Electronic Signature HITL Gate',
    keyComponents: ['AI Recommendation', 'Confidence Scorer', 'Medical Review Cockpit', 'Immutable Audit Signoff'],
    generateXml: generateSystemContextXml
  },
  {
    id: '27',
    name: 'Threat Model',
    family: 'Security & Governance',
    level: 'L2/L3',
    primaryPurpose: 'STRIDE threat modeling, attack surfaces, malicious vectors, and mitigations',
    examples: 'STRIDE model, prompt injection defense, API attack vectors',
    defaultDomain: 'STRIDE Threat Modeling & AI Defense Architecture',
    keyComponents: ['Threat Actors', 'Attack Surface Map', 'STRIDE Matrix', 'Mitigating Controls'],
    generateXml: generateSystemContextXml
  },
  {
    id: '28',
    name: 'Failure / Exception Flow',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Failure modes, retry policies, exponential backoff, DLQs, and circuit breakers',
    examples: 'DLQ, retries, circuit breakers, agent timeouts',
    defaultDomain: 'Distributed Saga Failure Compensation & DLQ Quarantine',
    keyComponents: ['Failure Detection', 'Circuit Breaker', 'Compensating Rollback', 'Quarantine DLQ'],
    generateXml: generateSystemContextXml
  },
  {
    id: '29',
    name: 'Cutover / Operational Runbook',
    family: 'Delivery & Operations',
    level: 'L3',
    primaryPurpose: 'Step-by-step production cutover checklist, maintenance window, and rollback',
    examples: 'Production launch, DR exercise, cloud cutover runbook',
    defaultDomain: 'Production Go-Live War Room & Cutover Checklist',
    keyComponents: ['Pre-Cutover (T-120)', 'Cutover Window', 'Smoke Verification', 'Rollback Trigger Matrix'],
    generateXml: generateSystemContextXml
  },
  {
    id: '30',
    name: 'FinOps / Cost Flow',
    family: 'Delivery & Operations',
    level: 'L1/L2',
    primaryPurpose: 'Cloud spend ingestion, shared resource allocation, and cost optimization',
    examples: 'Cloud spend, AI token cost attribution, tenant unit economics',
    defaultDomain: 'Enterprise Cloud FinOps & AI Token Cost Attribution',
    keyComponents: ['Billing Export', 'Cost Attribution Marts', 'Idle Resource Reclaimer', 'Executive Cockpit'],
    generateXml: generateSystemContextXml
  },
  {
    id: '31',
    name: 'Dependency / Relationship Map',
    family: 'Analysis & Planning',
    level: 'L2',
    primaryPurpose: 'Arbitrary many-to-many dependencies across systems, services, datasets, and teams',
    examples: 'Microservice dependency graph, blast-radius impact analysis',
    defaultDomain: 'Multi-Tier System & Database Dependency Matrix',
    keyComponents: ['Applications', 'Data Stores', 'Integrations', 'Criticality Risk Heatmap'],
    generateXml: generateSystemContextXml
  },
  {
    id: '32',
    name: 'Timeline / Roadmap / Architecture Evolution',
    family: 'Analysis & Planning',
    level: 'L1/L2',
    primaryPurpose: 'Multi-year architecture roadmap, maturity milestones, and migration waves',
    examples: 'Target state evolution, 3-year AI transformation roadmap',
    defaultDomain: 'Enterprise Cloud & AI Maturity Evolution Roadmap',
    keyComponents: ['Phase 0 Foundation', 'Phase 1 Scale', 'Phase 2 Autonomous AI', 'Strategic Drivers'],
    generateXml: generateSystemContextXml
  },
  {
    id: '33',
    name: 'Matrix / Heatmap',
    family: 'Analysis & Planning',
    level: 'L1/L2',
    primaryPurpose: '2-dimensional evaluation matrix: capability vs system, control vs workload',
    examples: 'Vendor evaluation matrix, security control compliance heatmap',
    defaultDomain: 'Architecture Evaluation Matrix & Capability Heatmap',
    keyComponents: ['Evaluation Criteria', 'Option Scoring (1-5)', 'Weighted Rank', 'Strategic Recommendation'],
    generateXml: generateSystemContextXml
  },
  {
    id: '34',
    name: 'Geographic / Regional Architecture',
    family: 'Infrastructure',
    level: 'L1/L2/L3',
    primaryPurpose: 'Geographic layout, sovereign cloud boundaries, and global traffic routing',
    examples: 'Global user base, multi-region sovereign cloud, edge CDN',
    defaultDomain: 'Global Sovereign Cloud & Data Residency Architecture',
    keyComponents: ['North America (US-East)', 'Europe (EU-Central)', 'APAC (Tokyo)', 'Global Edge Anycast'],
    generateXml: generateSystemContextXml
  }
];
