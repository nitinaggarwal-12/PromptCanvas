import { ArchitectureAst } from '../ast/architectureAst';

export interface LivingSpecDocument {
  id: string;
  title: string;
  shortTitle: string;
  category: 'product' | 'architecture' | 'engineering' | 'security' | 'operations';
  description: string;
  embeddedFigure?: {
    id: string;
    title: string;
    description: string;
    diagramType: 'context' | 'topology' | 'mesh' | 'sequence' | 'security' | 'dr' | 'cicd';
  };
  markdownContent: string;
  lastUpdated: string;
  isSynced: boolean;
}

export function generateAll10LivingSpecs(ast: ArchitectureAst): LivingSpecDocument[] {
  const meta = ast.metadata;
  const drRegion = meta.drRegions[0] || 'europe-west1';

  return [
    {
      id: 'DOC-01',
      title: 'Product Requirements Document (PRD)',
      shortTitle: 'PRD',
      category: 'product',
      description: 'Business requirements, user journeys, functional constraints, and success metrics.',
      embeddedFigure: {
        id: 'Figure 1.1',
        title: 'Global Payment Ingestion & Context Flow',
        description: 'End-to-end customer payment routing from edge devices to settlement core.',
        diagramType: 'context'
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# Product Requirements Document (PRD)',
        '',
        '## 1.0 Executive Summary',
        'The **' + meta.projectTitle + '** is an enterprise-grade cloud native payment orchestrator engineered to process mission-critical financial transactions with strict **' + meta.slaTarget + ' availability** and sub-' + meta.latencyBudgetMs + 'ms end-to-end p99 latency.',
        '',
        '## 2.0 User Personas & Entry Points',
        '* **Merchant Point-of-Sale**: Ingests real-time authorization requests over TLS 1.3 Anycast endpoints.',
        '* **Consumer Mobile SDK**: Secure tokenized biometric payment triggers via REST & gRPC APIs.',
        '* **Banking Operations & Risk Analyst**: Real-time fraud dashboard backed by Vertex AI Gemini reasoning.',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-02',
      title: 'System Architecture Specification',
      shortTitle: 'System Arch',
      category: 'architecture',
      description: 'Master 6-zone Google Cloud Reference Architecture topology and VPC boundaries.',
      embeddedFigure: {
        id: 'Figure 2.1',
        title: '6-Zone GCP Reference Topology',
        description: 'Full multi-region production cloud deployment with Zero-Trust VPC boundaries.',
        diagramType: 'topology'
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# System Architecture Specification',
        '',
        '## 1.0 Architectural Principles',
        '1. **Zero-Trust Network Perimeter**: Ingress filtered via Cloud Armor WAF and IAP with mTLS microservice mesh.',
        '2. **Strict Multi-Region Serializability**: Distributed ACID ledgers powered by Cloud Spanner multi-region leaders.',
        '3. **Sub-20ms Fraud Grounding**: In-line ScaNN vector search and Vertex AI risk evaluation.',
        '',
        '## 2.0 Cloud Infrastructure Inventory',
        '* **Primary Region**: ' + meta.primaryRegion,
        '* **Disaster Recovery Region**: ' + drRegion,
        '* **High Availability SLA Target**: ' + meta.slaTarget,
        '* **Total Components Provisioned**: ' + ast.components.length + ' Nodes',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-03',
      title: 'High-Level Design (HLD)',
      shortTitle: 'HLD',
      category: 'architecture',
      description: 'Microservice interaction topologies, asynchronous Pub/Sub buses, and Vertex AI RAG.',
      embeddedFigure: {
        id: 'Figure 3.1',
        title: 'Microservices Mesh & Ingestion Bus',
        description: 'GKE Autopilot payment mesh communicating with Vertex AI and Spanner.',
        diagramType: 'mesh'
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# High-Level Design (HLD)',
        '',
        '## 1.0 Subsystem Decomposition',
        '### 1.1 Ingress & Edge Subsystem',
        'Anycast Global External HTTPS Load Balancer terminates TLS 1.3 at edge PoPs, passing requests through Cloud Armor DDoS and rate-limiting inspection filters.',
        '',
        '### 1.2 Core Payment Mesh (GKE Autopilot)',
        'Stateless payment routing pods run with non-root containers across 3 availability zones in ' + meta.primaryRegion + '. Pods authenticate via Workload Identity Federation.',
        '',
        '### 1.3 Fraud Reasoning Subsystem (Vertex AI)',
        'Payment metadata is tokenized and embedded into 768-dimensional vectors. ScaNN searches historical fraud patterns in under 12ms, feeding context to Gemini for instant anomaly clearance.',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-04',
      title: 'Low-Level Design (LLD)',
      shortTitle: 'LLD',
      category: 'engineering',
      description: 'Component step sequences, discrete latency budgets, and gRPC protobuf contracts.',
      embeddedFigure: {
        id: 'Figure 4.1',
        title: 'Payment Authorization Sequence Interaction Flow',
        description: 'Discrete step numbering (1..6) with millisecond latency budgets.',
        diagramType: 'sequence'
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# Low-Level Design (LLD)',
        '',
        '## 1.0 Sequential Payment Execution Flow',
        '1. **Client Ingestion (0ms)**: POS initiates POST /v1/payments/authorize with AES-256 payload.',
        '2. **Edge Inspection (4ms)**: Cloud Armor evaluates IP reputation and rate limits.',
        '3. **Mesh Routing (8ms)**: GKE Pod tokenizes PAN via HSM keys.',
        '4. **Fraud Vector Scoring (22ms)**: Vertex AI ScaNN performs parallel vector similarity search.',
        '5. **Spanner Commit (34ms)**: Two-phase commit on Spanner leader in ' + meta.primaryRegion + '.',
        '6. **Audit Streaming (38ms)**: Event published to BigQuery Storage API for regulatory ledger compliance.',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-05',
      title: 'Data Model & Database Schemas',
      shortTitle: 'Data Model',
      category: 'engineering',
      description: 'Cloud Spanner DDL definitions, indexing strategies, and retention policies.',
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# Data Model & Database Schemas',
        '',
        '## 1.0 Cloud Spanner Distributed DDL',
        '```sql',
        'CREATE TABLE PaymentsLedger (',
        '  AccountId STRING(36) NOT NULL,',
        '  TransactionId STRING(64) NOT NULL,',
        '  Amount NUMERIC NOT NULL,',
        '  Currency STRING(3) NOT NULL,',
        '  RiskScore FLOAT64,',
        '  Status STRING(20) NOT NULL,',
        '  CreatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)',
        ') PRIMARY KEY(AccountId, TransactionId);',
        '```',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-06',
      title: 'Threat Model & Security Architecture',
      shortTitle: 'Threat Model',
      category: 'security',
      description: 'STRIDE threat analysis, Zero-Trust perimeter, and cryptographic controls.',
      embeddedFigure: {
        id: 'Figure 6.1',
        title: 'Zero-Trust Security Perimeter & STRIDE Matrix',
        description: 'VPC Service Controls, Cloud KMS (CMEK), and Cloud Armor WAF boundaries.',
        diagramType: 'security'
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# Threat Model & Security Architecture (STRIDE)',
        '',
        '## 1.0 STRIDE Threat Mitigation Matrix',
        '| Threat Category | Potential Attack Vector | Applied Google Cloud Control |',
        '| :--- | :--- | :--- |',
        '| **Spoofing** | Compromised API client | Identity-Aware Proxy (IAP) & OAuth 2.0 mTLS |',
        '| **Tampering** | In-transit packet modification | TLS 1.3 + Dedicated Fiber Backbone Encryption |',
        '| **Repudiation** | Denied ledger transaction | Cryptographic BigQuery ledger audit stream |',
        '| **Information Disclosure** | Database exfiltration | Cloud KMS CMEK + Sensitive Data Protection (DLP) |',
        '| **Denial of Service** | Volumetric Layer 7 DDoS | Cloud Armor Adaptive Protection & Rate Limiting |',
        '| **Elevation of Privilege** | Container escape | GKE Workload Identity + Hardened GKE Autopilot |',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-07',
      title: 'API Specifications (OpenAPI 3.1)',
      shortTitle: 'API Specs',
      category: 'engineering',
      description: 'REST and gRPC endpoint contracts with request/response schemas and status codes.',
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# API Specifications (OpenAPI 3.1)',
        '',
        '```yaml',
        'openapi: 3.1.0',
        'info:',
        '  title: ' + meta.projectTitle,
        '  version: ' + meta.version,
        'paths:',
        '  /v1/payments/authorize:',
        '    post:',
        '      summary: Authorize Real-Time Payment',
        '      responses:',
        '        200:',
        '          description: Authorization Approved',
        '```',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-08',
      title: 'Infrastructure as Code (Terraform HCL)',
      shortTitle: 'Terraform IaC',
      category: 'engineering',
      description: 'Declarative Terraform GCP modules for Spanner, GKE, and Cloud Armor.',
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# Infrastructure as Code (Terraform GCP HCL)',
        '',
        '```hcl',
        'resource "google_spanner_instance" "payments_main" {',
        '  config       = "nam-eur-dual1"',
        '  display_name = "Payments Multi-Region Spanner"',
        '  num_nodes    = 3',
        '}',
        '```',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-09',
      title: 'Business Continuity & Disaster Recovery Plan',
      shortTitle: 'BCDR Plan',
      category: 'operations',
      description: 'Multi-region failover protocols, target RPO/RTO metrics, and automated failover matrix.',
      embeddedFigure: {
        id: 'Figure 9.1',
        title: 'Multi-Region Failover & Replication Topology',
        description: 'Synchronous cross-region Spanner replication between us-central1 and ' + drRegion + '.',
        diagramType: 'dr'
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# Business Continuity & Disaster Recovery Plan',
        '',
        '## 1.0 Executive Recovery Targets',
        '* **System High Availability SLA**: ' + meta.slaTarget + ' (< 5.26 minutes annual downtime)',
        '* **Maximum Allowable RPO**: ' + meta.targetRpo + ' (Zero data loss via synchronous multi-region commit)',
        '* **Target RTO**: ' + meta.targetRto + ' (Automated DNS & Witness failover)',
        '',
        '## 2.0 Multi-Region Dual-Cluster Topology',
        'Primary write leader operates in ' + meta.primaryRegion + ' with an active read-replica and failover node configured in ' + drRegion + '. Cross-region data replication utilizes Google private dedicated fiber backbone with mTLS 1.3 encryption, satisfying PCI-DSS Section 4.1 standards.',
        '',
        '## 3.0 Automated Failover Decision Matrix',
        '| Incident Type | Trigger Condition | Automated Remediation Action | Target RTO |',
        '| :--- | :--- | :--- | :--- |',
        '| **Zone Degradation** | > 3 failed healthchecks in zone | GKE Pod auto-rescheduling to healthy zones | < 10s |',
        '| **Regional Outage** | Complete ' + meta.primaryRegion + ' loss | Promote ' + drRegion + ' Spanner Replica to Leader | < 30s |',
        '| **Fiber Severance** | Inter-region transit partition | Quorum maintained via Witness Node | Zero RPO |',
        '',
        '---'
      ].join('\n')
    },
    {
      id: 'DOC-10',
      title: 'CI/CD & Deployment Runbook',
      shortTitle: 'Runbook',
      category: 'operations',
      description: 'GitOps deployment pipelines, progressive canary rollouts, and rollback playbooks.',
      embeddedFigure: {
        id: 'Figure 10.1',
        title: 'GitOps CI/CD & Canary Rollout Pipeline',
        description: 'Google Cloud Deploy pipeline with automated canary evaluation and rollback.',
        diagramType: 'cicd'
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        '# CI/CD & Deployment Runbook',
        '',
        '## 1.0 Progressive Canary Rollout Workflow',
        '1. **Commit to Main**: Triggers Cloud Build to compile artifacts and run SAST security scanners.',
        '2. **Artifact Registry**: Signed container image stored with Binary Authorization verification.',
        '3. **Canary Stage (5%)**: Cloud Deploy provisions canary pods for 15 minutes of live traffic analysis.',
        '4. **Automated Rollback Trigger**: If error rate exceeds 0.01% or latency increases by >10ms, rollback executes within 3 seconds.',
        '5. **Full Promotion (100%)**: Traffic smoothly shifted across all availability zones.',
        '',
        '---'
      ].join('\n')
    }
  ];
}
