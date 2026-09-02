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
    // DOC-01: PRD
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
        '## 1.0 Business Context & Executive Problem Statement',
        'Modern financial institutions require continuous, sub-50ms transaction clearing across distributed global geographies without risking data anomalies, reconciliation drift, or multi-million dollar regulatory penalties. The **' + meta.projectTitle + '** serves as the core orchestration backbone, handling up to **50,000 peak transactions per second (TPS)** with strict **' + meta.slaTarget + ' availability** and zero data loss (RPO = 0).',
        '',
        '## 2.0 High-Level Key Performance Indicators (KPIs)',
        '| Metric Category | Target KPI | Enforcement Mechanism | Failure Threshold |',
        '| :--- | :--- | :--- | :--- |',
        '| **System Availability** | **' + meta.slaTarget + '** (< 5.26 mins/year) | Multi-Region Active-Active Dual-Hub | < 99.99% (P1 Incident) |',
        '| **End-to-End Latency** | **p95 < 25ms • p99 < 50ms** | Memorystore Redis 7.2 + ScaNN Vector Search | > 80ms p99 (Alert) |',
        '| **Data Recovery Point** | **RPO = 0 (Zero Data Loss)** | Cloud Spanner TrueTime Multi-Region Commit | > 0s (Non-compliance) |',
        '| **Failover Recovery** | **RTO < 30 Seconds** | Automated Cloud DNS Healthchecks & Witness Promotion | > 60s (SLA Breach) |',
        '| **Fraud Precision** | **> 99.8% Precision @ <20ms** | Vertex AI Gemini 2.5 Flash ScaNN Embeddings | < 99.0% (Review) |',
        '',
        '## 3.0 Functional Requirements Matrix (FR)',
        '* **FR-101 (Idempotent Authorization)**: Every transaction must provide a unique UUIDv4 idempotency key cached in Memorystore Redis for 86,400s to prevent double-charging.',
        '* **FR-102 (Zero-PAN Ingestion)**: Primary Account Numbers (PAN) must be tokenized at edge ingress via HSM-backed vaults; cleartext PANs must never touch application memory.',
        '* **FR-103 (Real-Time Fraud Grounding)**: Transaction payloads must be embedded in 768-dimensional vectors and evaluated against historical anomaly baselines in under 20ms.',
        '* **FR-104 (Distributed Ledger Immutability)**: Balance transfers must execute as two-phase ACID commits in Cloud Spanner, with continuous change-data-capture streamed to BigQuery.',
        '* **FR-105 (Multi-Currency ISO 20022 Clearing)**: Real-time FX conversion and SWIFT ISO 20022 message formatting across USD, EUR, GBP, and JPY settlement corridors.',
        '',
        '## 4.0 Non-Functional Requirements & Governance (NFR)',
        '* **NFR-201 (Regulatory Compliance)**: Full compliance with **' + meta.compliance.join(', ') + '**, enforcing FIPS 140-3 Level 3 Hardware Security Modules.',
        '* **NFR-202 (Zero-Trust Perimeter)**: All inter-service communications must enforce mutual TLS (mTLS 1.3) and SPIFFE/OIDC Workload Identity with zero static API keys.',
        '* **NFR-203 (Audit Immutability)**: Write-Once-Read-Many (WORM) compliant storage retaining 7 years of raw and aggregated ledger events for central bank auditing.',
        '',
        '---'
      ].join('\n')
    },

    // DOC-02: System Architecture Spec
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
        '## 1.0 Architectural Tenets & Trade-Off Analysis',
        '1. **Consistency Over Eventual Reconciliation (CAP Theorem)**: Utilizing Google Cloud Spanner TrueTime GPS/atomic clocks to achieve strict external consistency across multi-region clusters without asynchronous replication lag.',
        '2. **Defense-in-Depth Layering**: Ingress scrubbing at Google Edge PoPs (Cloud Armor) -> API Policy Enforcement (Apigee X) -> Private Subnet Mesh (GKE Autopilot) -> Encrypted Database Enclave (Cloud Spanner).',
        '3. **Sub-20ms AI Grounding**: Embedding ScaNN vector indexes alongside the processing mesh to perform near-zero latency similarity search.',
        '',
        '## 2.0 Comprehensive Network CIDR & Subnet Topology Table',
        '| VPC Network | Subnet Name | CIDR Block | Region | Purpose & Attached Services |',
        '| :--- | :--- | :--- | :--- | :--- |',
        '| **vpc-hub-prod** | `sb-ingress-global` | `10.100.10.0/24` | Global | External HTTPS GCLB Proxies & Cloud Armor WAF |',
        '| **vpc-hub-prod** | `sb-gke-pods` | `10.100.20.0/22` | ' + meta.primaryRegion + ' | GKE Autopilot Microservices Mesh (Payment Services) |',
        '| **vpc-hub-prod** | `sb-gke-services` | `10.100.24.0/24` | ' + meta.primaryRegion + ' | Kubernetes Internal ClusterIP & mTLS Endpoints |',
        '| **vpc-hub-prod** | `sb-streaming-data` | `10.100.30.0/24` | ' + meta.primaryRegion + ' | Cloud Dataflow Workers & Pub/Sub Connectors |',
        '| **vpc-hub-prod** | `sb-data-primary` | `10.100.40.0/24` | ' + meta.primaryRegion + ' | Cloud Spanner Leader VPC Endpoints & Redis 7.2 |',
        '| **vpc-dr-prod** | `sb-dr-failover` | `10.200.40.0/24` | ' + drRegion + ' | Cloud Spanner Read-Replica & Witness Standby Node |',
        '',
        '## 3.0 Cross-Zone & Disaster Recovery Topology',
        '* **Primary Zone Deployment**: Provisioned across 3 availability zones (`' + meta.primaryRegion + '-a`, `' + meta.primaryRegion + '-b`, `' + meta.primaryRegion + '-c`) with GKE Autopilot node auto-repair.',
        '* **Multi-Region Failover**: Synchronous replication across Google Cloud private fiber backbone to `' + drRegion + '`. If primary region suffers full failure, the witness node promotes the secondary replica to leader in < 30 seconds.',
        '',
        '---'
      ].join('\n')
    },

    // DOC-03: HLD
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
        '## 1.0 Subsystem Decomposition & Component Responsibilities',
        '',
        '### 1.1 Ingress & Edge Protection Subsystem',
        '* **Cloud Armor L7 WAF**: Enforces OWASP Top 10 mitigation, geographic rate-limiting, and adaptive DDoS inspection with a 30Gbps edge mitigation capacity.',
        '* **Global External HTTPS Load Balancer**: Single Anycast VIP terminating TLS 1.3 with automated Google-managed SSL certificates and HTTP/3 support.',
        '* **Apigee X Enterprise API Gateway**: Validates OAuth2.0 / MTLS bearer tokens, executes payload schema validation, and routes traffic into the private GKE subnet.',
        '',
        '### 1.2 Application Core Mesh Subsystem (GKE Autopilot)',
        '* **Payment Ingestion Router**: Stateless Go-based microservices managing request deduplication and HSM tokenization.',
        '* **Ledger Posting Engine**: Java Quarkus reactive service managing distributed transactional state with Cloud Spanner.',
        '* **Memorystore Redis 7.2 Cluster**: High-availability in-memory cache providing sub-millisecond idempotency locks and session token lookups.',
        '',
        '### 1.3 Real-Time Fraud & Vertex AI Hub',
        '* **Vertex Vector Search (ScaNN)**: Performs similarity searches against 50M+ vectorized fraud profiles with p99 latency < 12ms.',
        '* **Gemini 2.5 Flash Risk Reasoner**: Real-time multimodal LLM assessing transaction anomalies, geopolitical sanctions lists, and velocity patterns in under 30ms.',
        '* **Model Armor Shield**: Sensitive Data Protection (DLP) layer that scrubs PII and prevents prompt injection attacks.',
        '',
        '### 1.4 Event Streaming & Analytics Lakehouse',
        '* **Cloud Pub/Sub**: Ingests up to 10M events/second with exactly-once delivery guarantees.',
        '* **Datastream CDC**: Zero-footprint Change Data Capture streaming database mutations into the analytics tier.',
        '* **Cloud Dataflow Engine**: Apache Beam stream processing executing sliding 5-minute aggregation windows and dead-letter queue exception handling.',
        '* **BigQuery Lakehouse**: Analytical store handling real-time regulatory audits and business intelligence queries.',
        '',
        '---'
      ].join('\n')
    },

    // DOC-04: LLD
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
        '## 1.0 Discrete Latency Budget & Sequence Execution Flow',
        '| Step Number | Phase & Operation | Protocol / Transport | Source -> Target | Latency Target |',
        '| :--- | :--- | :--- | :--- | :--- |',
        '| **Step 1** | Edge TLS Termination & WAF Scrub | HTTPS (TLS 1.3) | Client -> Cloud Armor | < 4.0ms |',
        '| **Step 2** | Token Authentication & Routing | HTTPS Anycast | GCLB -> Apigee X Gateway | < 3.5ms |',
        '| **Step 3** | HSM Tokenization & Idempotency Lock | gRPC mTLS | Apigee X -> GKE / Redis 7.2 | < 2.0ms |',
        '| **Step 4** | ScaNN Vector Embeddings Search | gRPC Internal | GKE -> Vertex Vector Search | < 12.0ms |',
        '| **Step 5** | Gemini 2.5 Flash Risk Inference | gRPC Internal | Vertex Search -> Gemini Core | < 18.0ms |',
        '| **Step 6** | Spanner TrueTime 2PC ACID Commit | gRPC Private | GKE -> Cloud Spanner Leader | < 6.5ms |',
        '| **Step 7** | Asynchronous Audit Event Stream | Pub/Sub Streaming | GKE -> Pub/Sub / BigQuery | Asynchronous (<2ms) |',
        '| **TOTAL** | **End-to-End Execution Latency** | | **Client to Settlement Response** | **46.0ms (p99 < 50ms)** |',
        '',
        '---'
      ].join('\n')
    },

    // DOC-05: Data Model
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
        '## 1.0 Production Cloud Spanner Distributed DDL',
        '```sql',
        '-- Master Account Balances Table',
        'CREATE TABLE Accounts (',
        '  AccountId STRING(36) NOT NULL,',
        '  CustomerId STRING(36) NOT NULL,',
        '  AccountType STRING(20) NOT NULL,',
        '  Currency STRING(3) NOT NULL,',
        '  CurrentBalance NUMERIC NOT NULL,',
        '  AvailableBalance NUMERIC NOT NULL,',
        '  Status STRING(16) NOT NULL,',
        '  CreatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true),',
        '  UpdatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)',
        ') PRIMARY KEY(AccountId);',
        '',
        '-- High-Throughput Interleaved Payment Transactions Ledger Table',
        'CREATE TABLE PaymentTransactions (',
        '  AccountId STRING(36) NOT NULL,',
        '  TransactionId STRING(64) NOT NULL,',
        '  MerchantId STRING(36) NOT NULL,',
        '  Amount NUMERIC NOT NULL,',
        '  Currency STRING(3) NOT NULL,',
        '  RiskScore FLOAT64,',
        '  FraudDecision STRING(16) NOT NULL,',
        '  Status STRING(20) NOT NULL,',
        '  SettlementCorridor STRING(12) NOT NULL,',
        '  IdempotencyKey STRING(64) NOT NULL,',
        '  CreatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)',
        ') PRIMARY KEY(AccountId, TransactionId),',
        '  INTERLEAVE IN PARENT Accounts ON DELETE CASCADE;',
        '',
        '-- Indexes for Low-Latency Query Execution',
        'CREATE INDEX Idx_Payments_Created ON PaymentTransactions(AccountId, CreatedAt DESC);',
        'CREATE UNIQUE INDEX Idx_Payments_Idempotency ON PaymentTransactions(IdempotencyKey);',
        '```',
        '',
        '## 2.0 Compliance & Data Retention Lifecycle',
        '* **PCI-DSS Storage Requirement**: Card data tokenized at edge; zero raw PANs stored in database.',
        '* **Audit Immutability**: Read-only replicas mirrored to BigQuery with 7-year retention.',
        '',
        '---'
      ].join('\n')
    },

    // DOC-06: Threat Model
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
        '## 1.0 Comprehensive STRIDE Threat Mitigation Matrix',
        '| Threat ID | STRIDE Category | Potential Threat Vector | Vulnerable Asset | Applied Google Cloud Security Control | Residual Risk |',
        '| :--- | :--- | :--- | :--- | :--- | :--- |',
        '| **TR-01** | **Spoofing** | Forged merchant client identity or token hijacking | Apigee Ingress | Mutual TLS (mTLS) + OAuth 2.0 PKCE + Identity-Aware Proxy (IAP) | Low |',
        '| **TR-02** | **Tampering** | Man-in-the-middle transaction packet alteration | In-transit traffic | Enforced TLS 1.3 with AES-256-GCM + Dedicated Private Google Fiber | Very Low |',
        '| **TR-03** | **Repudiation** | Merchant or user denies initiating balance transfer | Ledger Postings | Cryptographic audit streaming into WORM-compliant BigQuery storage | Very Low |',
        '| **TR-04** | **Information Disclosure**| Data exfiltration via compromised database credentials | Spanner / GCS | VPC Service Controls (VPC-SC) + Cloud KMS HSM (CMEK AES-256) | Very Low |',
        '| **TR-05** | **Denial of Service** | Volumetric Layer 7 HTTP flood attacking gateway | GCLB / GKE | Cloud Armor Adaptive Protection (30Gbps rate-limiting per IP) | Low |',
        '| **TR-06** | **Elevation of Privilege**| Container escape leading to cluster compromise | GKE Pods | Non-root Pod Security Standards + Workload Identity (No service account keys) | Low |',
        '',
        '---'
      ].join('\n')
    },

    // DOC-07: API Specs
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
        '  description: Authoritative REST and gRPC API contract for enterprise transaction clearing.',
        'paths:',
        '  /v1/payments/authorize:',
        '    post:',
        '      summary: Authorize & Settle Real-Time Payment',
        '      operationId: authorizePayment',
        '      parameters:',
        '        - in: header',
        '          name: X-Idempotency-Key',
        '          required: true',
        '          schema:',
        '            type: string',
        '            format: uuid',
        '      requestBody:',
        '        required: true',
        '        content:',
        '          application/json:',
        '            schema:',
        '              type: object',
        '              required: [accountId, merchantId, amount, currency]',
        '              properties:',
        '                accountId: { type: string, format: uuid }',
        '                merchantId: { type: string, format: uuid }',
        '                amount: { type: number, minimum: 0.01 }',
        '                currency: { type: string, enum: [USD, EUR, GBP, JPY] }',
        '      responses:',
        '        200:',
        '          description: Transaction Successfully Settled',
        '          content:',
        '            application/json:',
        '              schema:',
        '                type: object',
        '                properties:',
        '                  transactionId: { type: string }',
        '                  status: { type: string, example: SETTLED }',
        '                  riskScore: { type: number, example: 0.02 }',
        '                  latencyMs: { type: number, example: 34 }',
        '        403:',
        '          description: Fraud Risk Exceeded Threshold (Blocked by Gemini Reasoner)',
        '```',
        '',
        '---'
      ].join('\n')
    },

    // DOC-08: Terraform IaC
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
        '# Master Multi-Region Cloud Spanner Instance',
        'resource "google_spanner_instance" "payments_main" {',
        '  name         = "spanner-payments-prod"',
        '  config       = "nam-eur-dual1"',
        '  display_name = "Payments Multi-Region Spanner Cluster"',
        '  num_nodes    = 3',
        '',
        '  labels = {',
        '    environment = "production"',
        '    compliance  = "pci-dss-4.0"',
        '    sla_tier    = "99-999"',
        '  }',
        '}',
        '',
        '# Cloud Armor Enterprise Security Policy (L7 DDoS & OWASP Top 10)',
        'resource "google_compute_security_policy" "armor_waf" {',
        '  name        = "sp-payments-armor-waf"',
        '  description = "Enterprise WAF Rule Set for Financial Ingress"',
        '',
        '  rule {',
        '    action   = "rate_based_ban"',
        '    priority = 1000',
        '    match {',
        '      versioned_expr = "SRC_IPS_V1"',
        '      config { src_ip_ranges = ["*"] }',
        '    }',
        '    rate_limit_options {',
        '      conform_action = "allow"',
        '      exceed_action  = "deny(429)"',
        '      rate_limit_threshold {',
        '        count        = 1000',
        '        interval_sec = 60',
        '      }',
        '    }',
        '  }',
        '}',
        '```',
        '',
        '---'
      ].join('\n')
    },

    // DOC-09: BCDR Plan
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
        '* **System High Availability SLA**: **' + meta.slaTarget + '** (< 5.26 minutes annual downtime)',
        '* **Target Recovery Point Objective (RPO)**: **' + meta.targetRpo + '** (Synchronous multi-region TrueTime ACID transactions guarantee zero data loss)',
        '* **Target Recovery Time Objective (RTO)**: **' + meta.targetRto + '** (Automated DNS healthchecks & witness quorum promotion)',
        '',
        '## 2.0 Multi-Region Dual-Cluster Topology Configuration',
        'The primary write leader resides in **`' + meta.primaryRegion + '`** with a fully synchronized read-replica and standby witness node provisioned in **`' + drRegion + '`**. Cross-region transactional replication operates over Google private dedicated fiber backbone with mTLS 1.3 encryption, ensuring compliance with PCI-DSS Section 4.1 in-transit encryption mandates.',
        '',
        '## 3.0 Automated Failover Decision Matrix',
        '| Disaster Scenario | Detection & Trigger Condition | Automated Remediation Action | Target RTO | Verification Step |',
        '| :--- | :--- | :--- | :--- | :--- |',
        '| **Zone Degradation** | > 3 consecutive healthcheck failures in single zone | GKE Pod auto-rescheduling to healthy zones (`' + meta.primaryRegion + '-b/c`) | < 10s | Validate pod readiness endpoints |',
        '| **Full Regional Outage** | Complete `' + meta.primaryRegion + '` loss detected by 5 global edge probes | Promote `' + drRegion + '` Spanner Replica to Leader & Shift Anycast DNS | < 30s | Verify transaction write ACK rate |',
        '| **Fiber Backbone Partition** | Inter-region network split (>100ms transit jitter) | Quorum maintained via Witness Node; secondary serves cached reads | Zero RPO | Audit Spanner TrueTime bounds |',
        '| **Data Corruption / Ransomware** | Accidental mass ledger deletion or corruption | Restore point-in-time snapshot from Dual-Region GCS CMEK WORM vault | < 15m | Execute checksum reconciliation |',
        '',
        '---'
      ].join('\n')
    },

    // DOC-10: Runbook
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
        '1. **Git Commit to Main**: Triggers Cloud Build to compile artifacts, execute unit tests, and run SAST security scanners.',
        '2. **Artifact Registry Attestation**: Signed container image stored with Binary Authorization verification.',
        '3. **Canary Stage (5% Traffic)**: Cloud Deploy provisions canary pods in `' + meta.primaryRegion + '` for 15 minutes of live traffic analysis.',
        '4. **Automated Rollback Trigger**: If error rate exceeds 0.01% or latency increases by >10ms, automated rollback executes within 3 seconds.',
        '5. **Full Promotion (100% Traffic)**: Traffic smoothly shifted across all availability zones.',
        '',
        '## 2.0 Emergency Rollback Playbook (Incident Protocol)',
        '* **Step 1**: SRE invokes `gcloud deploy targets rollback --target=' + meta.primaryRegion + '-prod` to restore previous immutable digest.',
        '* **Step 2**: Flush Redis 7.2 routing cache to invalidate stale session tokens.',
        '* **Step 3**: Re-verify Cloud Armor WAF rate-limiting counters and Spanner commit latency.',
        '',
        '---'
      ].join('\n')
    }
  ];
}
