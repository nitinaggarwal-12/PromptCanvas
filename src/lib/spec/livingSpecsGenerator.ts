import { ArchitectureAst, createDefaultFintechAst } from "../ast/architectureAst";

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

function inferDomainLabel(projectTitle: string, rawDomain: string): string {
  const lower = `${projectTitle} ${rawDomain}`.toLowerCase();
  if (lower.includes('drone') || lower.includes('lidar') || lower.includes('robotics') || lower.includes('autonomous') || lower.includes('collision') || lower.includes('edge')) {
    return 'AUTONOMOUS ROBOTICS, EDGE TELEMETRY & AI MESH';
  }
  if (lower.includes('hospital') || lower.includes('triage') || lower.includes('patient') || lower.includes('clinical') || lower.includes('hl7') || lower.includes('fhir') || lower.includes('sepsis') || lower.includes('icu')) {
    return 'HEALTHCARE & CLINICAL TRIAGE AI';
  }
  if (lower.includes('sap') || lower.includes('manufacturing') || lower.includes('supply chain') || lower.includes('opc-ua')) {
    return 'INDUSTRIAL MANUFACTURING & SUPPLY CHAIN';
  }
  if (lower.includes('secops') || lower.includes('chronicle') || lower.includes('cyber') || lower.includes('soar') || lower.includes('siem')) {
    return 'ZERO-TRUST CYBERSECURITY & AUTONOMOUS SOC';
  }
  if (lower.includes('rag') || lower.includes('vector') || lower.includes('agentic') || lower.includes('llm') || lower.includes('vllm')) {
    return 'ENTERPRISE AGENTIC AI & KNOWLEDGE PLATFORM';
  }
  if (rawDomain && rawDomain.toLowerCase() !== 'financial services & banking' && rawDomain.toLowerCase() !== 'fintech') {
    return rawDomain.toUpperCase();
  }
  if (lower.includes('payment') || lower.includes('settlement') || lower.includes('bank') || lower.includes('fintech')) {
    return 'FINANCIAL SERVICES & BANKING';
  }
  return 'ENTERPRISE CLOUD & AI ARCHITECTURE';
}

function extractActiveCanvasComponentTitles(ast: ArchitectureAst, activeXml?: string): Array<{ name: string; service: string; tier: string; sla: string }> {
  const DEFAULT_IDS = new Set([
    'c_armor', 'c_apigee', 'c_gke', 'c_redis', 'c_pubsub', 'c_vertex', 'c_spanner', 'c_bq',
    'comp_armor', 'comp_glb', 'comp_gke', 'comp_spanner', 'comp_pubsub', 'comp_bq', 'comp_kms', 'comp_monitoring', 'comp_dr_gke', 'comp_dr_spanner'
  ]);
  const customAstComps = (ast.components || []).filter((c) => !DEFAULT_IDS.has(c.id));

  const priorityNodes: Array<{ name: string; service: string; tier: string; sla: string }> = [];
  const secondaryNodes: Array<{ name: string; service: string; tier: string; sla: string }> = [];

  if (activeXml && typeof activeXml === 'string') {
    const valRegex = /<mxCell[^>]*\bvalue="([^"]+)"[^>]*\bvertex="1"/gi;
    let m: RegExpExecArray | null;
    const seen = new Set<string>();
    while ((m = valRegex.exec(activeXml)) !== null) {
      const cellTag = m[0];
      if (/\bid="(hdr_|tier_|bg_|poster_|legend|footer|swimlane)/i.test(cellTag)) continue;
      const rawHtml = m[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');

      const boldMatch = rawHtml.match(/<b[^>]*>([\s\S]*?)<\/b>/i);
      const primaryText = (boldMatch ? boldMatch[1] : rawHtml)
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const fullDecoded = rawHtml
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const candidate = primaryText.length >= 6 ? primaryText : fullDecoded;
      const titleWords = (ast.metadata?.projectTitle || '')
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 4 && !['design', 'full', 'architecture', 'cloud', 'enterprise', 'system'].includes(w));

      if (
        candidate.length >= 6 &&
        candidate.length <= 240 &&
        !/^(1|2|3|4|5|6|7|8|9|0|\d{2}|AI|LR|TD|L[1-4]|Channels|Legend|Guardrails|RAG PIPELINE)$/i.test(candidate) &&
        !candidate.startsWith('💬') &&
        !candidate.startsWith('TIER ') &&
        !candidate.startsWith('LAYER ') &&
        !candidate.startsWith('CUMULATIVE ') &&
        !candidate.includes('Generative Prompt:') &&
        !candidate.includes('Google Cloud Reference Architecture')
      ) {
        const key = candidate.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          const item = {
            name: candidate.slice(0, 76),
            service: 'Google Cloud Managed Service',
            tier: (priorityNodes.length + secondaryNodes.length) < 2 ? 'ingress' : (priorityNodes.length + secondaryNodes.length) < 6 ? 'compute' : 'data',
            sla: '99.999%',
          };
          const matchesDomainWord = titleWords.some((w) => key.includes(w));
          if (matchesDomainWord || /^\[?\d+[a-z]?\]/.test(candidate) || /\bid="(c\d|n\d|node_|step_|t3_|t4_|t5_)/i.test(cellTag)) {
            priorityNodes.push(item);
          } else {
            secondaryNodes.push(item);
          }
        }
      }
    }
  }

  const combined = [
    ...priorityNodes,
    ...customAstComps.map((c) => ({
      name: c.name,
      service: c.service,
      tier: c.tier,
      sla: c.sla || '99.999%',
    })),
    ...secondaryNodes,
  ];

  if (combined.length > 0) {
    const unique: Array<{ name: string; service: string; tier: string; sla: string }> = [];
    const seenNames = new Set<string>();
    for (const item of combined) {
      const k = item.name.toLowerCase();
      if (!seenNames.has(k)) {
        seenNames.add(k);
        unique.push(item);
      }
      if (unique.length >= 10) break;
    }
    return unique;
  }

  return (ast.components || []).slice(0, 8).map((c) => ({
    name: c.name,
    service: c.service,
    tier: c.tier,
    sla: c.sla || '99.999%',
  }));
}

export function generateAll16LivingSpecs(rawAst: ArchitectureAst, activeXml?: string): LivingSpecDocument[] {
  const defaultAst = createDefaultFintechAst();
  const ast: ArchitectureAst = {
    metadata: {
      ...defaultAst.metadata,
      ...(rawAst?.metadata || {}),
      drRegions:
        Array.isArray(rawAst?.metadata?.drRegions) && rawAst.metadata.drRegions.length > 0
          ? rawAst.metadata.drRegions
          : defaultAst.metadata.drRegions,
      compliance:
        Array.isArray(rawAst?.metadata?.compliance) && rawAst.metadata.compliance.length > 0
          ? rawAst.metadata.compliance
          : defaultAst.metadata.compliance,
    },
    components:
      Array.isArray(rawAst?.components) && rawAst.components.length > 0
        ? rawAst.components
        : defaultAst.components,
    connections:
      Array.isArray(rawAst?.connections) && rawAst.connections.length > 0
        ? rawAst.connections
        : defaultAst.connections,
  };
  const meta = ast.metadata;
  const drRegion = meta.drRegions[0] || "europe-west1";
  const resolvedDomain = inferDomainLabel(meta.projectTitle, meta.domain);
  const liveComps = extractActiveCanvasComponentTitles(ast, activeXml);
  const c0 = liveComps[0]?.name || "Edge Telemetry & API Ingress";
  const c1 = liveComps[1]?.name || "Core Stream Orchestrator";
  const c2 = liveComps[2]?.name || "Real-Time Decision & Policy Gate";
  const c3 = liveComps[3]?.name || "Gemini 3.1 Pro + 3.8 Flash Reasoning Mesh";
  const c4 = liveComps[4]?.name || "Distributed State & Vector Store";

  const liveInventoryRows = liveComps
    .map(
      (c, idx) =>
        `| **C-0${idx + 1}** | **${c.name}** | ${c.service} | ${c.tier.toUpperCase()} | ${c.sla} |`
    )
    .join("\n");

  return [
    // DOC-01: PRD
    {
      id: "DOC-01",
      title: "Product Requirements Document (PRD)",
      shortTitle: "PRD",
      category: "product",
      description: `Business requirements, synchronized canvas components, functional constraints, and KPIs for ${meta.projectTitle}.`,
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Product Requirements Document (PRD)",
        "",
        "> [!NOTE]",
        "> This document serves as the authoritative product specification for **" + meta.projectTitle + "** (**" + resolvedDomain + "**), dynamically synchronized with the active architecture canvas and defining business objectives, latency boundaries, regulatory compliance, and functional requirements.",
        "",
        "## 1.0 Executive Problem Statement & Architecture Scope",
        "Mission-critical **" + resolvedDomain + "** workloads for **" + meta.projectTitle + "** require continuous high-throughput orchestration across **" + c0 + "**, **" + c1 + "**, and **" + c2 + "** with strict **" + meta.slaTarget + " availability** and zero data loss (**RPO = " + meta.targetRpo + "**). The platform unifies edge ingestion, real-time event streaming, and **Gemini 3.1 Pro + Gemini 3.8 Flash** grounded inference into an integrated, Zero-Trust ecosystem.",
        "",
        "## 1.5 Live Synchronized Canvas Component Inventory",
        "| Component ID | Active Canvas Node / Subsystem | Cloud Backing Service | Architectural Tier | Target SLA |",
        "| :--- | :--- | :--- | :--- | :--- |",
        liveInventoryRows,
        "",
        "## 2.0 Key Performance Indicators (KPIs) & SLA Targets",
        "| Metric Category | Target KPI | Verification Mechanism | Incident Severity |",
        "| :--- | :--- | :--- | :--- |",
        "| **System Availability** | **" + meta.slaTarget + "** (< 5.26 mins/yr downtime) | Multi-Region Active-Active Dual-Hub (" + drRegion + ") | P1 Executive Escalation |",
        "| **End-to-End Latency** | **p95 < 25ms • p99 < 50ms** | " + c0 + " + Memorystore Redis 7.2 + ScaNN Index | P2 SRE Alert Threshold |",
        "| **Data Recovery Point** | **" + meta.targetRpo + " (Zero Data Loss)** | Cloud Spanner TrueTime Multi-Region Commit | P1 Regulatory Breach |",
        "| **Failover Recovery** | **" + meta.targetRto + "** | Automated Cloud DNS Healthcheck & Witness Quorum | P1 SLA Violation |",
        "| **AI Inference Precision**| **> 99.8% Precision @ < 20ms** | Vertex AI Gemini 3.8 Flash + Gemini 3.1 Pro + Omni 1.1 Audit | Automated Fallback |",
        "",
        "## 3.0 Functional Requirements (FR)",
        "* **FR-101 (Deterministic Ingress & Telemetry)**: Every incoming payload across **" + c0 + "** must supply an idempotent UUIDv4 token cached in Redis 7.2 for 86,400s to guarantee exactly-once processing under high concurrency.",
        "* **FR-102 (Zero-Cleartext Perimeter)**: Sensitive credentials, telemetry secrets, and regulated payloads traversing **" + c1 + "** must be tokenized at edge ingress via Cloud KMS HSM; cleartext secrets must never touch unencrypted storage.",
        "* **FR-103 (Sub-20ms AI Grounding)**: Domain payloads in **" + c2 + "** must be vectorized into 768-dimensional `text-embedding-005` embeddings and evaluated by **Gemini 3.8 Flash** (`gemini-3.8-flash`) and **Gemini 3.1 Pro** (`gemini-3.1-pro-preview`) in under 20ms.",
        "* **FR-104 (Distributed ACID Consistency)**: State transitions across **" + c4 + "** must execute as two-phase ACID commits in Cloud Spanner, with continuous Change-Data-Capture (CDC) streamed to BigQuery Lakehouse for real-time auditability.",
        "* **FR-105 (Multi-Region Disaster Recovery)**: System state must continuously replicate between primary region (" + meta.primaryRegion + ") and standby region (" + drRegion + ") with automated health-check failover.",
        "* **FR-106 (Zero-Trust Identity Federation)**: All inter-service communications must enforce short-lived (3600s) SPIFFE/OIDC tokens via Workload Identity Federation without static API keys.",
        "",
        "## 4.0 Non-Functional Requirements (NFR)",
        "* **NFR-201 (Throughput Scale)**: The architecture must scale elastically to sustain up to 50,000 events/transactions per second (TPS) without performance degradation.",
        "* **NFR-202 (Regulatory Compliance)**: Full adherence to SOC2 Type II, ISO 27001, PCI-DSS Level 1, and HIPAA compliance baselines with hardware-isolated KMS CMEK encryption.",
        "* **NFR-203 (Auditability & Lineage)**: 100% of domain events and schema mutations must be cataloged in Dataplex with immutable WORM retention in Cloud Storage.",
        "",
        "## 5.0 Target User Personas",
        "1. **Domain Operator / Edge Client**: Interacts with **" + c0 + "** and expects deterministic sub-second execution confirmation.",
        "2. **AI & Systems Architect**: Inspects **" + c2 + "** and **Gemini 3.1 Pro** reasoning traces and confidence scores in real time.",
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
      description: `Business logic rules, state machine transitions, and interactive workflows for ${meta.projectTitle}.`,
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# Functional Design Document (FDD)",
        "",
        "## 1.0 End-to-End Execution Journey & State Transitions (" + meta.projectTitle + ")",
        "The system coordinates domain execution across five operational phases synchronized with the canvas:",
        "1. **Phase 1 — Ingress & Telemetry (" + c0 + ")**: Client/edge node authenticates via OIDC / mTLS and submits structured payload with idempotency key.",
        "2. **Phase 2 — Edge & Policy Validation (" + c1 + ")**: Cloud Armor & Apigee X inspect payloads and enforce rate limits and schema contracts.",
        "3. **Phase 3 — Core Orchestration (" + c2 + ")**: GKE Autopilot / Cloud Run verifies state and checks Memorystore Redis 7.2 for duplicate execution.",
        "4. **Phase 4 — AI-Grounded Reasoning (" + c3 + ")**: Vertex AI ScaNN performs vector similarity search; **Gemini 3.8 Flash** and **Gemini 3.1 Pro** evaluate domain policies.",
        "5. **Phase 5 — State Commit & Event Broadcast (" + c4 + ")**: Cloud Spanner records immutable state entry and emits CDC event to Cloud Pub/Sub.",
        "",
        "## 2.0 Business Logic Exception Matrix",
        "| Exception Scenario | Detection Layer | System Action | Status Code |",
        "| :--- | :--- | :--- | :--- |",
        "| Duplicate Idempotency Key | Redis 7.2 Layer (" + c0 + ") | Return cached original response | 200 OK (Cached) |",
        "| WAF Rate-Limit Exceeded | Cloud Armor Edge | Drop connection with 429 Too Many Requests | 429 Too Many Requests |",
        "| AI Model Scoring Timeout | Vertex AI (" + c3 + ") | Fallback to deterministic rule engine | 200 OK (Deterministic Fallback) |",
        "| Database Deadlock / Abort | Spanner Driver (" + c4 + ") | Automated exponential backoff retry (max 3) | 503 Unavailable (Retryable) |",
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
      description: `Master reference architecture topology and subsystem boundaries for ${meta.projectTitle}.`,
      embeddedFigure: {
        id: "Figure 3.1",
        title: `${meta.projectTitle} — Synchronized Canvas Topology`,
        description: `Full multi-region production cloud deployment (${resolvedDomain}) with Zero-Trust VPC boundaries.`,
        diagramType: "topology"
      },
      lastUpdated: meta.lastSyncTimestamp,
      isSynced: true,
      markdownContent: [
        "# High-Level Architecture Design (HLD)",
        "",
        "> [!NOTE]",
        "> Designed for **" + meta.projectTitle + "** (**" + resolvedDomain + "**) spanning **" + meta.primaryRegion + "** and **" + drRegion + "** with Zero-Trust VPC boundaries.",
        "",
        "## 1.0 Architectural Tenets & Trade-Off Analysis",
        "1. **External Consistency Over Eventual Reconciliation**: Cloud Spanner TrueTime GPS/atomic clocks provide strict serializability without replication lag.",
        "2. **Defense-in-Depth Layering**: Ingress scrubbing (**" + c0 + "**) -> Orchestration (**" + c1 + "**) -> Policy & AI Mesh (**" + c2 + "**) -> Encrypted State (**" + c4 + "**).",
        "3. **Zero-Trust Network Perimeter**: No public IPs on compute or database instances; all communication traverses Private Service Connect (PSC) and VPC-SC.",
        "",
        "## 2.0 Synchronized Subsystem Decomposition",
        "* **Zone 1 (Ingress & Edge)**: **" + c0 + "** backed by Anycast External HTTPS GCLB + Cloud Armor L7 WAF + Apigee X.",
        "* **Zone 2 (Core Orchestration)**: **" + c1 + "** running on GKE Autopilot c3-standard-8 + Cloud Run Gen2 + Memorystore Redis 7.2.",
        "* **Zone 3 (Real-Time Event Mesh)**: **" + c2 + "** powered by Cloud Pub/Sub + Datastream CDC + Cloud Dataflow Apache Beam.",
        "* **Zone 4 (Vertex AI Intelligence Hub)**: **" + c3 + "** with ScaNN Vector Search + Model Armor Shield + **Gemini 3.1 Pro** & **Gemini 3.8 Flash**.",
        "* **Zone 5 (Multi-Region Persistence)**: **" + c4 + "** on Cloud Spanner nam3 + BigQuery BigLake + Dual-Region Cloud Storage.",
        "* **Zone 6 (Zero-Trust Governance)**: VPC Service Controls + Keyless Workload Identity + Cloud KMS HSM + **Omni 1.1** Certification.",
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
        "| **Step 1** | Edge TLS Termination & WAF Scrub | HTTPS (TLS 1.3) | Client -> " + c0 + " | < 4.0ms |",
        "| **Step 2** | Token Authentication & Routing | HTTPS Anycast | " + c0 + " -> " + c1 + " | < 3.5ms |",
        "| **Step 3** | HSM Tokenization & Idempotency Lock | gRPC mTLS | " + c1 + " -> " + c2 + " / Redis 7.2 | < 2.0ms |",
        "| **Step 4** | ScaNN Vector Embeddings Match | gRPC Internal | " + c2 + " -> Vertex Vector Search | < 12.0ms |",
        "| **Step 5** | Gemini 3.8 Flash + 3.1 Pro Inference | gRPC Internal | Vertex Search -> Gemini 3.8 Flash | < 18.0ms |",
        "| **Step 6** | Spanner TrueTime 2PC ACID Commit | gRPC Private | " + c3 + " -> " + c4 + " | < 6.5ms |",
        "| **Step 7** | Asynchronous Audit Event Stream | Pub/Sub Stream | " + c4 + " -> Pub/Sub / BigQuery | Async (< 2ms) |",
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
        "| **TR-01** | **Spoofing** | Forged client identity or bearer token hijacking | " + c0 + " | Mutual TLS (mTLS) + OAuth 2.0 PKCE + Identity-Aware Proxy (IAP) | Low |",
        "| **TR-02** | **Tampering** | Man-in-the-middle packet alteration | In-transit traffic | Enforced TLS 1.3 with AES-256-GCM + Dedicated Private Google Fiber | Very Low |",
        "| **TR-03** | **Repudiation** | Client or service denies initiating state change | " + c4 + " | Cryptographic audit streaming into WORM-compliant BigQuery storage | Very Low |",
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
        "## 1.0 Foundation Model Provenance & 5-Tier Routing",
        "* **Tier 0 Multimodal Certification Gate**: **Omni 1.1** (`google-omni-1.1` — 6-Audit Visual & Structural Judge).",
        "* **Tier 1 Deep Reasoning & Architecture Synthesis**: **Gemini 3.1 Pro** (`gemini-3.1-pro-preview` — Deep ReAct Planning, Tool Calling AST, 2M context window).",
        "* **Tier 2 High-Speed Interactive Copilot**: **Gemini 3.8 Flash** (`gemini-3.8-flash` — Sub-second Hybrid Reasoning & Intent Routing).",
        "* **Tier 3 Real-Time Bidirectional Voice/Video**: **Gemini 3.1 Flash Live** (`gemini-3.1-flash-live-preview`).",
        "* **Tier 4 Multimodal Media Synthesis**: **Veo 3.1** (`veo-3.1-generate-preview`), **Lyria 3.5** (`lyria-3.5`), **Gemini 3.1 Flash Image** (`gemini-3.1-flash-image-preview`), **Gemini 3.1 Flash TTS** (`gemini-3.1-flash-tts-preview`).",
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
        "| **Vertex AI (Gemini 3.8 / 3.1)**| 50M Reasoning Tokens | $1,250.00 | $1,250.00 (On-Demand) | $0.025 |",
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
        "* **Consequences**: p99 latency < 2.5ms; seamless integration with Gemini 3.8 Flash and Gemini 3.1 Pro reasoning pipelines.",
        "",
        "---"
      ].join("\n")
    }
  ];
}

// Backward-compatibility alias
export const generateAll10LivingSpecs = generateAll16LivingSpecs;