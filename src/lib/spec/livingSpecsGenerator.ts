import { ArchitectureAst } from "../ast/architectureAst";

export interface LivingSpecDocument {
  id: string;
  title: string;
  shortTitle: string;
  category: "product" | "architecture" | "engineering" | "security" | "operations" | "governance";
  description: string;
  embeddedFigure?: {
    id: string;
    title: string;
    description: string;
    diagramType: "context" | "topology" | "mesh" | "sequence" | "security" | "dr" | "cicd" | "dataflow" | "iam" | "finops";
  };
  markdownContent: string;
  lastUpdated: string;
  isSynced: boolean;
}

export function generateAll16LivingSpecs(ast: ArchitectureAst): LivingSpecDocument[] {
  const meta = ast.metadata;
  const drRegion = meta.drRegions[0] || "europe-west1";

  return [
    // DOC-01: PRD
    {
      id: "DOC-01",
      title: "Product Requirements Document (PRD)",
      shortTitle: "PRD",
      category: "product",
      description: "Business requirements, user journeys, functional constraints, and success metrics.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Product Requirements Document (PRD)",
        "",
        "> [!NOTE]",
        "> This document serves as the authoritative product specification for **" + meta.projectTitle + "** (" + meta.domain.toUpperCase() + "), defining business objectives, latency boundaries, regulatory compliance, and functional requirements.",
        "",
        "## 1.0 Executive Problem Statement & Market Opportunity",
        "Enterprise mission-critical financial and transactional workloads require continuous high-throughput processing across distributed global regions with strict **" + meta.slaTarget + " availability** and zero data loss (**RPO = " + meta.targetRpo + "**). The platform consolidates multi-tenant API ingestion, real-time event streaming, and AI-grounded inference into an integrated, compliant ecosystem.",
        "",
        "## 2.0 Key Performance Indicators (KPIs) & SLA Targets",
        "| Metric Category | Target KPI | Verification Mechanism | Incident Severity |",
        "| :--- | :--- | :--- | :--- |",
        "| **System Availability** | **" + meta.slaTarget + "** (< 5.26 mins/yr downtime) | Multi-Region Active-Active Dual-Hub (" + drRegion + ") | P1 Executive Escalation |",
        "| **Transaction Latency** | **p95 < 25ms • p99 < 50ms** | Redis 7.2 In-Memory + ScaNN Vector Index | P2 SRE Alert Threshold |",
        "| **Data Recovery Point** | **" + meta.targetRpo + " (Zero Data Loss)** | Cloud Spanner TrueTime Multi-Region Commit | P1 Regulatory Breach |",
        "| **Failover Recovery** | **" + meta.targetRto + "** | Automated Cloud DNS Healthcheck & Witness Quorum | P1 SLA Violation |",
        "| **AI Inference Precision**| **> 99.8% Precision @ < 20ms** | Vertex AI Gemini 3.7 Flash + ScaNN RAG | Automated Fallback |",
        "",
        "## 3.0 Functional Requirements (FR)",
        "* **FR-101 (Idempotent Execution)**: Every incoming transaction payload must supply an idempotent UUIDv4 token cached in Redis 7.2 for 86,400s to eliminate duplicate processing under high concurrency.",
        "* **FR-102 (Zero-Cleartext Ingress)**: Sensitive customer credentials, PII, and cardholder data must be tokenized at edge ingress via Cloud KMS HSM; cleartext PII must never touch application memory or unencrypted storage.",
        "* **FR-103 (Sub-20ms AI Grounding)**: Transaction payloads must be vectorized into 768-dimensional embeddings and matched against historical baselines in under 20ms using Vertex ScaNN.",
        "* **FR-104 (Distributed ACID Consistency)**: State changes must execute as two-phase ACID commits in Cloud Spanner, with continuous Change-Data-Capture (CDC) streamed to BigQuery Lakehouse for real-time auditability.",
        "* **FR-105 (Multi-Region Disaster Recovery)**: System state must continuously replicate between primary region and standby region (" + drRegion + ") with automated health-check failover.",
        "* **FR-106 (Zero-Trust Identity Federation)**: All inter-service communications must enforce short-lived (3600s) SPIFFE/OIDC tokens via Workload Identity Federation without static API keys.",
        "",
        "## 4.0 Non-Functional Requirements (NFR)",
        "* **NFR-201 (Throughput Scale)**: The architecture must scale elastically to sustain up to 50,000 transactions per second (TPS) without performance degradation.",
        "* **NFR-202 (Regulatory Compliance)**: Full adherence to SOC2 Type II, PCI-DSS Level 1, ISO 27001, and HIPAA compliance baselines with hardware-isolated KMS CMEK encryption.",
        "* **NFR-203 (Auditability & Lineage)**: 100% of transaction events and schema mutations must be cataloged in Dataplex with immutable WORM retention in Cloud Storage.",
        "",
        "## 5.0 Target User Personas",
        "1. **Enterprise Customer / End User**: Submits high-velocity payment transactions and expects instantaneous sub-second settlement confirmation.",
        "2. **Risk & Fraud Analyst**: Inspects automated AI inference reasoning traces and reviews model confidence scoring in real time.",
        "3. **Lead SRE & Security Operations**: Monitors distributed telemetry, SLO burn rates, Cloud Armor WAF mitigations, and VPC Service Controls perimeters.",
        "",
        "---"
      ].join("\n")
    },

    // DOC-02: FDD
    {
      id: "DOC-02",
      title: "Functional Design Document (FDD) & User Workflows",
      shortTitle: "FDD",
      category: "product",
      description: "Business logic rules, state machine transitions, and interactive user journeys.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Functional Design Document (FDD)",
        "",
        "## 1.0 End-to-End User Journey & State Transitions",
        "The system coordinates user interactions across five operational phases:",
        "1. **Client Submission**: Client authenticates via OIDC / mTLS and submits payload with idempotency key.",
        "2. **Edge Validation**: Cloud Armor inspects for OWASP Top 10 vulnerabilities and enforces rate limits.",
        "3. **Synchronous Validation**: GKE Autopilot verifies account status and checks Redis cache for duplicate submission.",
        "4. **AI-Assisted Evaluation**: Vertex AI ScaNN performs similarity search; Gemini 3.7 Flash evaluates business rules.",
        "5. **Commit & Acknowledgement**: Cloud Spanner records immutable ledger entry and emits CDC event to Pub/Sub.",
        "",
        "## 2.0 Business Logic Exception Matrix",
        "| Exception Scenario | Detection Layer | System Action | Status Code |",
        "| :--- | :--- | :--- | :--- |",
        "| Duplicate Idempotency Key | Redis 7.2 Layer | Return cached original response | 200 OK (Cached) |",
        "| WAF Rate-Limit Exceeded | Cloud Armor | Drop connection with 429 Too Many Requests | 429 Too Many Requests |",
        "| AI Model Scoring Timeout | Vertex AI Engine | Fallback to heuristic rule engine | 200 OK (Heuristic Fallback) |",
        "| Database Deadlock / Abort | Spanner Driver | Automated exponential backoff retry (max 3) | 503 Unavailable (Retryable) |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-03: HLD
    {
      id: "DOC-03",
      title: "High-Level Architecture Design (HLD)",
      shortTitle: "HLD",
      category: "architecture",
      description: "Master 6-zone Google Cloud Reference Architecture topology and subsystem boundaries.",
      embeddedFigure: {
        id: "Figure 3.1",
        title: "6-Zone GCP Reference Topology",
        description: "Full multi-region production cloud deployment with Zero-Trust VPC boundaries.",
        diagramType: "topology"
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# High-Level Architecture Design (HLD)",
        "",
        "> [!NOTE]",
        "> Designed for high-scale enterprise operations spanning **" + meta.primaryRegion + "** and **" + drRegion + "** with Zero-Trust VPC boundaries.",
        "",
        "## 1.0 Architectural Tenets & Trade-Off Analysis",
        "1. **External Consistency Over Eventual Reconciliation**: Cloud Spanner TrueTime GPS/atomic clocks provide strict serializability without replication lag.",
        "2. **Defense-in-Depth Layering**: Ingress scrubbing (Cloud Armor) -> API Gateway (Apigee X) -> Private Subnet Mesh (GKE Autopilot) -> Encrypted DB (Cloud Spanner).",
        "3. **Zero-Trust Network Perimeter**: No public IPs on compute or database instances; all communication traverses Private Service Connect (PSC) and VPC-SC.",
        "",
        "## 2.0 Subsystem Decomposition",
        "* **Zone 1: Ingress & Edge**: Anycast External HTTPS GCLB + Cloud Armor L7 WAF + Apigee X API Gateway.",
        "* **Zone 2: Application Core Mesh**: GKE Autopilot c3-standard-8 cluster + Cloud Run Gen2 + Memorystore Redis 7.2.",
        "* **Zone 3: Real-Time Event Streaming**: Cloud Pub/Sub + Datastream CDC + Cloud Dataflow Apache Beam ETL.",
        "* **Zone 4: Vertex AI Intelligence Hub**: ScaNN Vector Search + Model Armor Shield + Gemini 3.7 Flash & Pro Hybrid Engine.",
        "* **Zone 5: Multi-Region Lakehouse & DB**: Cloud Spanner nam3 + BigQuery BigLake + Dual-Region Cloud Storage.",
        "* **Zone 6: Zero-Trust Governance**: VPC Service Controls + Keyless Workload Identity + Cloud KMS HSM + Dataplex.",
        "",
        "---"
      ].join("\n")
    },

    // DOC-04: LLD
    {
      id: "DOC-04",
      title: "Low-Level Technical Design (LLD)",
      shortTitle: "LLD",
      category: "engineering",
      description: "Component step sequences, discrete latency budgets, and gRPC protobuf contracts.",
      embeddedFigure: {
        id: "Figure 4.1",
        title: "Step Sequence Interaction Flow",
        description: "Discrete step numbering (1..6) with sub-millisecond latency budgets.",
        diagramType: "sequence"
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Low-Level Technical Design (LLD)",
        "",
        "## 1.0 Latency Budget Allocation (p99 Target < 50ms)",
        "| Step | Operation Description | Protocol / Transport | Source -> Destination | Target Latency |",
        "| :--- | :--- | :--- | :--- | :--- |",
        "| **Step 1** | Edge TLS Termination & WAF Scrub | HTTPS (TLS 1.3) | Client -> Cloud Armor | < 4.0ms |",
        "| **Step 2** | Token Authentication & Routing | HTTPS Anycast | GCLB -> Apigee X Gateway | < 3.5ms |",
        "| **Step 3** | HSM Tokenization & Idempotency Lock | gRPC mTLS | Apigee X -> GKE / Redis 7.2 | < 2.0ms |",
        "| **Step 4** | ScaNN Vector Embeddings Match | gRPC Internal | GKE -> Vertex Vector Search | < 12.0ms |",
        "| **Step 5** | Gemini 3.7 Flash Inference | gRPC Internal | Vertex Search -> Gemini Core | < 18.0ms |",
        "| **Step 6** | Spanner TrueTime 2PC ACID Commit | gRPC Private | GKE -> Cloud Spanner Leader | < 6.5ms |",
        "| **Step 7** | Asynchronous Audit Event Stream | Pub/Sub Stream | GKE -> Pub/Sub / BigQuery | Async (< 2ms) |",
        "| **TOTAL** | **End-to-End Execution Latency** | | **Client to Confirmed Response** | **46.0ms (p99 < 50ms)** |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-05: Data Model
    {
      id: "DOC-05",
      title: "Data Architecture & Spanner SQL DDL Spec",
      shortTitle: "Data Model",
      category: "engineering",
      description: "Cloud Spanner DDL definitions, indexing strategies, and retention policies.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Data Architecture & Database Schemas",
        "",
        "## 1.0 Production Cloud Spanner Distributed DDL",
        String.fromCharCode(96, 96, 96) + "sql",
        "-- Master Account Balances Table",
        "CREATE TABLE Accounts (",
        "  AccountId STRING(36) NOT NULL,",
        "  CustomerId STRING(36) NOT NULL,",
        "  AccountType STRING(20) NOT NULL,",
        "  Currency STRING(3) NOT NULL,",
        "  CurrentBalance NUMERIC NOT NULL,",
        "  AvailableBalance NUMERIC NOT NULL,",
        "  Status STRING(16) NOT NULL,",
        "  CreatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true),",
        "  UpdatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)",
        ") PRIMARY KEY(AccountId);",
        "",
        "-- High-Throughput Interleaved Payment Transactions Ledger Table",
        "CREATE TABLE PaymentTransactions (",
        "  AccountId STRING(36) NOT NULL,",
        "  TransactionId STRING(64) NOT NULL,",
        "  MerchantId STRING(36) NOT NULL,",
        "  Amount NUMERIC NOT NULL,",
        "  Currency STRING(3) NOT NULL,",
        "  RiskScore FLOAT64,",
        "  FraudDecision STRING(16) NOT NULL,",
        "  Status STRING(20) NOT NULL,",
        "  SettlementCorridor STRING(12) NOT NULL,",
        "  IdempotencyKey STRING(64) NOT NULL,",
        "  CreatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)",
        ") PRIMARY KEY(AccountId, TransactionId),",
        "  INTERLEAVE IN PARENT Accounts ON DELETE CASCADE;",
        "",
        "-- Secondary Indexes for Low-Latency Querying",
        "CREATE INDEX Idx_Payments_Created ON PaymentTransactions(AccountId, CreatedAt DESC);",
        "CREATE UNIQUE INDEX Idx_Payments_Idempotency ON PaymentTransactions(IdempotencyKey);",
        String.fromCharCode(96, 96, 96),
        "",
        "---"
      ].join("\n")
    },

    // DOC-06: Threat Model
    {
      id: "DOC-06",
      title: "Enterprise Security Architecture & STRIDE Threat Model",
      shortTitle: "Threat Model",
      category: "security",
      description: "STRIDE threat analysis, Zero-Trust perimeter, and cryptographic controls.",
      embeddedFigure: {
        id: "Figure 6.1",
        title: "Zero-Trust Security Perimeter & STRIDE Matrix",
        description: "VPC Service Controls, Cloud KMS (CMEK), and Cloud Armor WAF boundaries.",
        diagramType: "security"
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Threat Model & Security Architecture (STRIDE)",
        "",
        "> [!SECURITY]",
        "> Enforces strict Zero-Trust boundaries: FIPS 140-3 Level 3 Cloud KMS HSM, keyless Workload Identity, and VPC Service Controls perimeter.",
        "",
        "## 1.0 Comprehensive STRIDE Threat Mitigation Matrix",
        "| Threat ID | STRIDE Category | Threat Vector | Vulnerable Asset | Google Cloud Security Control | Residual Risk |",
        "| :--- | :--- | :--- | :--- | :--- | :--- |",
        "| **TR-01** | **Spoofing** | Forged client identity or bearer token hijacking | Apigee Ingress | Mutual TLS (mTLS) + OAuth 2.0 PKCE + Identity-Aware Proxy (IAP) | Low |",
        "| **TR-02** | **Tampering** | Man-in-the-middle transaction packet alteration | In-transit traffic | Enforced TLS 1.3 with AES-256-GCM + Dedicated Private Google Fiber | Very Low |",
        "| **TR-03** | **Repudiation** | Client or user denies initiating transaction | Ledger Postings | Cryptographic audit streaming into WORM-compliant BigQuery storage | Very Low |",
        "| **TR-04** | **Information Disclosure** | Data exfiltration via compromised database credentials | Spanner / GCS | VPC Service Controls (VPC-SC) + Cloud KMS HSM (CMEK AES-256) | Very Low |",
        "| **TR-05** | **Denial of Service** | Volumetric Layer 7 HTTP flood attacking gateway | GCLB / GKE | Cloud Armor Adaptive Protection (30Gbps rate-limiting per IP) | Low |",
        "| **TR-06** | **Elevation of Privilege** | Container escape leading to cluster compromise | GKE Pods | Non-root Pod Security Standards + Workload Identity (No service keys) | Low |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-07: AI System Card
    {
      id: "DOC-07",
      title: "AI System Card & Cognitive Architecture Spec",
      shortTitle: "AI System Card",
      category: "architecture",
      description: "Model provenance, RAG Triad benchmark metrics, and prompt safety guardrails.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# AI System Card & Cognitive Architecture Spec",
        "",
        "## 1.0 Foundation Model Provenance & Routing",
        "* **Primary Reasoning Engine**: **Gemini 3.7 Flash** (Native Hybrid Reasoning with Dynamic Thinking budget).",
        "* **Complex Orchestration Engine**: **Gemini 2.5 Pro** (Deep ReAct Planning, Tool Calling AST, 2M context window).",
        "* **Embedding Model**: **text-embedding-005** (768-dimensional normalized dense vectors).",
        "",
        "## 2.0 RAG Triad Evaluation Benchmarks",
        "| Evaluation Metric | Target Benchmark | Measured Production Score | Enforcement Mechanism |",
        "| :--- | :--- | :--- | :--- |",
        "| **Context Relevance** | **> 0.95** | 0.978 | ScaNN Top-k Similarity Filtering |",
        "| **Grounded Faithfulness** | **> 0.98** | 0.994 | Model Armor Strict JSON Schema Validation |",
        "| **Answer Relevance** | **> 0.95** | 0.982 | Automated Multi-Turn LLM Evals |",
        "| **Prompt Injection Defense** | **100% Block Rate**| 100.0% (Zero Bypass) | Model Armor Jailbreak Filter |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-08: Terraform IaC
    {
      id: "DOC-08",
      title: "Infrastructure as Code (Terraform GCP HCL)",
      shortTitle: "Terraform IaC",
      category: "engineering",
      description: "Declarative Terraform GCP modules for Spanner, GKE, and Cloud Armor.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Infrastructure as Code (Terraform GCP HCL)",
        "",
        String.fromCharCode(96, 96, 96) + "hcl",
        "# Master Multi-Region Cloud Spanner Instance",
        "resource \"google_spanner_instance\" \"payments_main\" {",
        "  name         = \"spanner-payments-prod\"",
        "  config       = \"nam-eur-dual1\"",
        "  display_name = \"Payments Multi-Region Spanner Cluster\"",
        "  num_nodes    = 3",
        "",
        "  labels = {",
        "    environment = \"production\"",
        "    compliance  = \"pci-dss-4.0\"",
        "    sla_tier    = \"99-999\"",
        "  }",
        "}",
        "",
        "# Cloud Armor Enterprise Security Policy (L7 DDoS & OWASP Top 10)",
        "resource \"google_compute_security_policy\" \"armor_waf\" {",
        "  name        = \"sp-payments-armor-waf\"",
        "  description = \"Enterprise WAF Rule Set for Financial Ingress\"",
        "",
        "  rule {",
        "    action   = \"rate_based_ban\"",
        "    priority = 1000",
        "    match {",
        "      versioned_expr = \"SRC_IPS_V1\"",
        "      config { src_ip_ranges = [\"*\"] }",
        "    }",
        "    rate_limit_options {",
        "      conform_action = \"allow\"",
        "      exceed_action  = \"deny(429)\"",
        "      rate_limit_threshold {",
        "        count        = 1000",
        "        interval_sec = 60",
        "      }",
        "    }",
        "  }",
        "}",
        String.fromCharCode(96, 96, 96),
        "",
        "---"
      ].join("\n")
    },

    // DOC-09: BCDR Plan
    {
      id: "DOC-09",
      title: "Business Continuity & Disaster Recovery (BCDR) Plan",
      shortTitle: "BCDR Plan",
      category: "operations",
      description: "Multi-region failover protocols, target RPO/RTO metrics, and automated failover matrix.",
      embeddedFigure: {
        id: "Figure 9.1",
        title: "Multi-Region Failover & Replication Topology",
        description: "Synchronous cross-region Spanner replication between " + meta.primaryRegion + " and " + drRegion + ".",
        diagramType: "dr"
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Business Continuity & Disaster Recovery Plan",
        "",
        "> [!NOTE]",
        "> Authoritative disaster recovery playbook defining multi-region quorum failover, split-brain mitigation, and automated DNS switching.",
        "",
        "## 1.0 Executive Recovery Targets",
        "* **System High Availability SLA**: **" + meta.slaTarget + "** (< 5.26 minutes annual downtime)",
        "* **Target Recovery Point Objective (RPO)**: **" + meta.targetRpo + "** (Synchronous multi-region TrueTime ACID transactions guarantee zero data loss)",
        "* **Target Recovery Time Objective (RTO)**: **" + meta.targetRto + "** (Automated DNS healthchecks & witness quorum promotion)",
        "",
        "## 2.0 Automated Failover Decision Matrix",
        "| Disaster Scenario | Detection Trigger | Automated Remediation Action | Target RTO | Verification Gate |",
        "| :--- | :--- | :--- | :--- | :--- |",
        "| **Zone Degradation** | > 3 healthcheck failures in single zone | GKE Pod auto-rescheduling to healthy zones | < 10s | Validate pod readiness probes |",
        "| **Regional Outage** | Complete " + meta.primaryRegion + " loss detected by edge probes | Promote " + drRegion + " Replica to Leader & Shift Anycast DNS | < 30s | Verify transaction write ACK rate |",
        "| **Fiber Partition** | Inter-region network split (>100ms jitter) | Quorum maintained via Witness Node; secondary serves reads | Zero RPO | Audit Spanner TrueTime bounds |",
        "| **Data Corruption** | Accidental mass ledger deletion | Restore point-in-time snapshot from Dual-Region GCS WORM | < 15m | Execute checksum reconciliation |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-10: CI/CD
    {
      id: "DOC-10",
      title: "Software Delivery & GitOps CI/CD Specification",
      shortTitle: "CI/CD Spec",
      category: "operations",
      description: "GitOps deployment pipelines, progressive canary rollouts, and rollback playbooks.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Software Delivery & GitOps CI/CD Specification",
        "",
        "## 1.0 Progressive Canary Rollout Workflow",
        "1. **Git Commit to Main**: Triggers Cloud Build to compile artifacts, execute unit tests, and run SAST security scanners.",
        "2. **Artifact Registry Attestation**: Signed container image stored with Binary Authorization verification.",
        "3. **Canary Stage (5% Traffic)**: Cloud Deploy provisions canary pods in " + meta.primaryRegion + " for 15 minutes of live traffic analysis.",
        "4. **Automated Rollback Trigger**: If error rate exceeds 0.01% or latency increases by >10ms, automated rollback executes within 3 seconds.",
        "5. **Full Promotion (100% Traffic)**: Traffic smoothly shifted across all availability zones.",
        "",
        "---"
      ].join("\n")
    },

    // DOC-11: SRE & Telemetry
    {
      id: "DOC-11",
      title: "Site Reliability Engineering (SRE) & Telemetry Spec",
      shortTitle: "SRE & Telemetry",
      category: "operations",
      description: "SLOs/SLIs, error budget policies, OpenTelemetry distributed tracing, and PromQL rules.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# SRE & Telemetry Specification",
        "",
        "## 1.0 Service Level Objectives (SLOs) & Error Budgets",
        "| Service Tier | SLI Definition | Target SLO | Monthly Error Budget | Fast Burn Alert Trigger |",
        "| :--- | :--- | :--- | :--- | :--- |",
        "| **Edge Ingress** | Successful HTTP 2xx/3xx requests / Total | **99.999%** | 26 seconds | > 2% budget in 1 hour |",
        "| **Transaction Mesh** | gRPC transactions completed in < 50ms | **99.95%** | 21.6 minutes | > 5% budget in 6 hours |",
        "| **Vertex AI Scoring** | Prompt evaluation latency < 35ms | **99.90%** | 43.2 minutes | > 10% budget in 12 hours |",
        "| **Spanner Commit** | 2PC commit ACK completed in < 10ms | **99.99%** | 4.3 minutes | > 2% budget in 1 hour |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-12: Migration Strategy
    {
      id: "DOC-12",
      title: "Cloud Migration & Modernization Strategy (6-Rs)",
      shortTitle: "Migration (6-Rs)",
      category: "architecture",
      description: "Legacy workload assessment, 6-Rs modernization matrix, and wave cutover planning.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Cloud Migration & Modernization Strategy (6-Rs)",
        "",
        "## 1.0 Workload Rationalization Framework (6-Rs)",
        "| Workload Name | Legacy Hosting | 6-Rs Strategy | Target Google Cloud Service | Migration Wave |",
        "| :--- | :--- | :--- | :--- | :--- |",
        "| **Legacy Monolith Core** | On-Prem Bare Metal | **Refactor** | GKE Autopilot (Go Microservices) | Wave 2 |",
        "| **Oracle RAC Database** | Exadata On-Prem | **Replatform** | Cloud Spanner Multi-Region | Wave 3 |",
        "| **Batch Reporting Engine** | Teradata Warehouse | **Replatform** | BigQuery Lakehouse + Dataflow | Wave 1 |",
        "| **Session Token Store** | Self-hosted Memcached | **Replatform** | Memorystore Redis 7.2 | Wave 2 |",
        "| **Perimeter Firewall** | Hardware Appliance | **Repurchase** | Cloud Armor L7 WAF | Wave 1 |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-13: Cutover Runbook
    {
      id: "DOC-13",
      title: "Production Go-Live & Cutover War Runbook",
      shortTitle: "Cutover Runbook",
      category: "operations",
      description: "Minute-by-minute execution steps for launch, war room operations, and rollback gates.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Production Go-Live & Cutover War Runbook",
        "",
        "## 1.0 Minute-by-Minute Execution Timeline (T-Minus Schedule)",
        "| Timeline | Task Owner | Action Item | Success Criteria | Abort / Rollback Gate |",
        "| :--- | :--- | :--- | :--- | :--- |",
        "| **T - 120m** | Lead SRE | Verify Datastream CDC replication lag | < 500ms replication lag | If > 5s, pause migration |",
        "| **T - 60m** | Security Lead | Validate Cloud KMS CMEK key status | HSM FIPS 140-3 active | Abort if key not reachable |",
        "| **T - 30m** | Network Eng | Reduce Cloud DNS TTL to 60 seconds | Global DNS TTL = 60s | Block if TTL propagation fails |",
        "| **T - 0m** | War Room Lead | Shift 10% Anycast GCLB traffic to new cluster | 0% HTTP 5xx errors | Rollback immediately if > 0.1% errors |",
        "| **T + 30m** | Performance SRE| Ramp to 100% traffic across all regions | p99 latency < 50ms | Scale GKE replicas if CPU > 60% |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-14: FinOps Cost Model
    {
      id: "DOC-14",
      title: "Cloud FinOps & Unit Economics Cost Model",
      shortTitle: "FinOps Model",
      category: "governance",
      description: "Monthly bill of materials (BOM), committed use discounts, and cost per transaction.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Cloud FinOps & Unit Economics Cost Model",
        "",
        "## 1.0 Monthly Bill of Materials (BOM) Breakdown",
        "| Service Component | Sizing / Allocation | Monthly List Cost | 3-Year CUD Cost | Cost per 10k Transactions |",
        "| :--- | :--- | :--- | :--- | :--- |",
        "| **Cloud Spanner (nam3)** | 3 Multi-Region Nodes | $2,980.00 | $1,788.00 (40% discount) | $0.035 |",
        "| **GKE Autopilot Compute** | 48 vCPU, 192GB RAM | $1,650.00 | $1,072.50 (35% discount) | $0.021 |",
        "| **Vertex AI (Gemini 3.7)**| 50M Reasoning Tokens | $1,250.00 | $1,250.00 (On-Demand) | $0.025 |",
        "| **Cloud Armor & GCLB** | 1 Global VIP + WAF Rules | $450.00 | $450.00 | $0.009 |",
        "| **Cloud Pub/Sub & Dataflow**| 5TB Stream Processing | $380.00 | $247.00 (35% discount) | $0.005 |",
        "| **TOTAL MONTHLY SPEND** | | **$6,710.00** | **$4,807.50 (28.3% savings)** | **$0.095 / 10k Tx** |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-15: Compliance Validation Pack
    {
      id: "DOC-15",
      title: "Regulatory Compliance & GxP / HIPAA Validation Pack",
      shortTitle: "Compliance Pack",
      category: "governance",
      description: "21 CFR Part 11 electronic records, HIPAA audit trails, and sovereign cloud controls.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Regulatory Compliance & GxP / HIPAA Validation Pack",
        "",
        "> [!SECURITY]",
        "> Certified compliance mapping against **" + meta.compliance.join(", ") + "** with immutable audit evidence trails.",
        "",
        "## 1.0 Regulatory Trust Criteria Mapping Matrix",
        "| Regulation / Standard | Mandatory Control Requirement | Google Cloud Architectural Implementation | Evidence Artifact |",
        "| :--- | :--- | :--- | :--- |",
        "| **SOC2 Type II (CC6.1)** | Logical access controls & IAM governance | IAM Workload Identity Federation (Keyless) | Cloud Audit Logs (Admin Activity) |",
        "| **HIPAA Security Rule** | End-to-end data encryption at rest & in transit | TLS 1.3 mTLS + Cloud KMS HSM CMEK AES-256 | KMS Key Audit Trail |",
        "| **PCI-DSS 4.0 (Req 3)** | Protection of cardholder data / tokenization | Edge Apigee Tokenization; zero PAN in DB | DLP Inspection Reports |",
        "| **FDA 21 CFR Part 11** | Tamper-proof electronic audit trails | BigQuery WORM storage + Cloud Spanner TrueTime | BigLake Immutable Ledger Logs |",
        "",
        "---"
      ].join("\n")
    },

    // DOC-16: ADR Log
    {
      id: "DOC-16",
      title: "Architecture Decision Record (ADR) Log",
      shortTitle: "ADR Log",
      category: "governance",
      description: "Formal record of architectural trade-offs, technology evaluations, and approved decision rationale.",
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Architecture Decision Record (ADR) Log",
        "",
        "## ADR-001: Selection of Google Cloud Spanner (nam3) Over CockroachDB",
        "* **Status**: APPROVED (2026-08-15)",
        "* **Context**: The platform requires multi-region active-active external consistency across North America and Europe with sub-10ms transactional ACID latency.",
        "* **Decision**: Adopt Google Cloud Spanner multi-region nam3 configuration with TrueTime hardware synchronization.",
        "* **Consequences**: Zero replication lag, 99.999% SLA availability, native BigQuery BigLake zero-ETL integration; higher baseline node cost offset by zero operational maintenance.",
        "",
        "## ADR-002: Native Vector Indexing with Vertex Vector Search (ScaNN)",
        "* **Status**: APPROVED (2026-08-20)",
        "* **Context**: High-speed similarity matching required for real-time anomaly detection at 50,000 queries per second.",
        "* **Decision**: Deploy Vertex AI ScaNN with Tree-AH quantization.",
        "* **Consequences**: p99 latency < 2.5ms; seamless integration with Gemini 3.7 Flash reasoning pipelines.",
        "",
        "---"
      ].join("\n")
    }
  ];
}

// Backward-compatibility alias
export const generateAll10LivingSpecs = generateAll16LivingSpecs;