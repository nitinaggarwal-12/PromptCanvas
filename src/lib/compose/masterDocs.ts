import { resolveSurvivingArchetypeId } from './archetypes';

export const MASTER_DOCUMENTS: Record<string, string> = {
  brd: `# DOC 01 • Business Requirements & FinOps Strategy (BRD)

## Enterprise Architecture Platform — Bio-Pharma Autonomous Safety Screener, Commercial AI Hub & Cloud FinOps Strategy

**Document ID:** DOC-01-BRD-BIO-2026-001  
**Document Version:** v2.0 (Lean 8 Consolidated Baseline — Executive Steering Committee & ARB Approved)  
**Absorbed Redundant Docs:** DOC 06 (EAB), DOC 10 (Workshop), DOC 14 (RFP - Business), DOC 15 (FinOps - ROI)  
**Consolidated Blueprints:** #01, #04, #05, #26 (Base) + Absorbed #30, #32, #33  
**Target Audience:** C-Suite, Executive Sponsors, CFO, Procurement Committee, Architecture Review Board (ARB)  
**Regulatory & GxP Mandate:** FDA 21 CFR Part 11, EMA Annex 11, HIPAA, GxP Computer System Validation (CSV)  

---

# 1. Executive Summary & C-Suite Strategic Pillars

### 1.1 Business Problem & Transformation Mandate
Global life-sciences operations require cross-functional scientific review across Medical Affairs, Commercial MLR (Medical, Legal, Regulatory), Clinical Trial Operations, and Pharmacovigilance (PV) safety intake. Legacy fragmented silos result in 14-business-day turnaround delays, manual fair-balance verification friction, and reactive adverse event triage. The **Enterprise Architecture Platform** consolidates C-Suite executive governance, customer co-design discovery, vendor procurement scoring, and 3-year Cloud FinOps unit economics into a single GxP-validated cognitive platform.

### 📐 Visual Diagram 1: Executive Summary & Strategic Pillars (Template 01)
\`\`\`mermaid
graph TD
    USERS["👥 Medical Info Specialists, Clinicians & Regulatory Reviewers"] --> PORTAL["🌐 Executive Digital Workspace Portal"]
    PORTAL --> PERIMETER["🛡️ Cloud Armor WAF & Apigee API Gateway (VPC-SC Perimeter)"]
    PERIMETER --> ORCH["⚙️ Multi-Agent Workflow Orchestrator (Vertex AI Agent Engine)"]
    ORCH <--> KNOWLEDGE["🗄️ Enterprise Scientific Knowledge Lake (Spanner + AlloyDB ScaNN)"]
    ORCH <--> SAFETY["⚖️ 21 CFR Part 11 Dual-Custody HITL Governance Board"]
    ORCH <--> SYSTEMS["☁️ GxP Systems of Record (Veeva Vault / Argus Safety / SAP ERP)"]
\`\`\`

---

# 2. As-Is Clinical Pain Points vs. To-Be Target State

### 📐 Visual Diagram 2: As-Is Clinical Pain Points vs. To-Be Target State (Template 05)

| Transformation Dimension | Current Legacy Baseline (As-Is) | Target Future State (To-Be) | Audited Business Impact & ROI |
|---|---|---|---|
| **Medical Info Response (MIR)** | 14 business days manual literature review | **< 48 hours** with grounded citation spans | **85% cycle-time compression** |
| **MLR Promotional Review** | 3.4 manual revision cycles per asset | **< 1.2 revision cycles** via automated policy rules | **65% reduction in review friction** |
| **Pharmacovigilance (PV) Triage** | Batch ingestion; 24–48h AE identification | **Real-time (< 500ms)** Adverse Event escalation | **100% FDA 15-day expedited compliance** |
| **Audit & Traceability** | Disparate PDF wet-ink/manual logs | **Immutable SHA-256 WORM ledger** | **Zero FDA Form 483 audit observations** |

---

# 3. Value Stream & ROI Realization Formulas

### 📐 Visual Diagram 3: Value Stream & ROI Realization Formulas (Template 04)

**Net Annual Value (NAV) Formula:**  
NAV = Σ (ΔT_i × V_annual,i × C_FTE) + Avoided Regulatory Penalty Risk − Annualized Cloud FinOps TCO

* **Direct Clinical & MLR Productivity Savings:** $14.8M / year across 42,000 annual submissions.
* **Cycle-Time Acceleration Value:** 11.2 days faster time-to-market for global medical communications.
* **Payback Period & IRR:** Full capital payback in **5.4 months** with a 3-year Net Present Value (NPV) of **$34.2M** (IRR = 184%).

---

# 4. Vendor Fit-Gap & Build-vs-Buy Evaluation

### 📐 Visual Diagram 4: Vendor Fit-Gap & Build-vs-Buy Evaluation (Template 33)

| Evaluation Criterion | Weight | Off-the-Shelf SaaS Point Tool | Bespoke DIY Open-Source | **Option B: Governed GCP + Vertex AI Platform (Selected)** |
|---|:---:|:---:|:---:|:---:|
| **FDA 21 CFR Part 11 & GxP Auditability** | 30% | 62% (Opaque black-box logs) | 70% (High custom CSV burden) | **98% (Immutable WORM + Dual-Custody E-Sign)** |
| **VPC-SC Data Sovereignty & Zero Data Egress** | 25% | 55% (Multi-tenant SaaS egress) | 85% (Self-managed VPC) | **100% (CMEK + VPC Service Controls)** |
| **Multi-Agent ReAct & ScaNN Hybrid RAG** | 25% | 68% (Fixed prompt chains) | 80% (High maintenance) | **96% (Vertex AI Agent Engine + AlloyDB)** |
| **3-Year Total Cost of Ownership (TCO)** | 20% | 60% (Per-seat licensing bloat) | 64% (High SRE headcount) | **94% (CUD + Semantic KV-Cache FinOps)** |
| **Weighted Composite Score** | **100%** | **61.4%** | **75.1%** | **97.2% (ARB Winner)** |

---

# 5. 3-Year TCO & Cloud FinOps Unit Economics

### 📐 Visual Diagram 5: 3-Year TCO & Cloud FinOps Unit Economics (Template 30)

| FinOps Cost Bucket | Year 1 (Pilot + Wave 1) | Year 2 (Global Scale) | Year 3 (Steady State) | FinOps Optimization Control |
|---|---|---|---|---|
| **Vertex AI Token Inference & Embeddings** | $420,000 | $680,000 | $790,000 | Semantic KV-Cache (−42% token spend) + Tiered Model Routing |
| **GKE Autopilot & Cloud Run Compute** | $310,000 | $460,000 | $510,000 | 3-Year Committed Use Discounts (CUDs, −55% unit compute cost) |
| **Cloud Spanner, AlloyDB & WORM GCS** | $240,000 | $350,000 | $390,000 | Automated Coldline/Archive lifecycle tiering after 90 days |
| **Unit Cost per GxP Dossier Reviewed** | **$14.20** | **$8.40** | **$6.15** | **89% lower than legacy $58.00 manual review baseline** |

---

# 6. Risk-Based Autonomy & Governance Approval Gates

### 📐 Visual Diagram 6: Risk-Based Autonomy & Governance Approval Gates (Template 26)

| Risk Tier | Autonomy Level | Permitted Agent Operations | Mandatory Human-in-the-Loop (HITL) Gate |
|---|---|---|---|
| **Tier 1 (Low)** | **Autonomous** | Document chunking, embedding generation, telemetry logging | Automated schema & hash verification |
| **Tier 2 (Moderate)** | **Supervised Copilot** | Internal literature synthesis, citation extraction | Single reviewer acknowledgment in Workbench |
| **Tier 3 (High)** | **Dual-Custody GxP** | External MLR promotional approval, regulatory dossier draft | **Two licensed reviewers** + 21 CFR Part 11 e-signatures |
| **Tier 4 (Critical)** | **Human-Only Filing** | Expedited FDA MedWatch / EudraVigilance ICSR submission | Agent pre-populates; **Qualified Person (QPPV) executes filing** |

---

# 7. Phased 30-60-90 Day Pilot & Capital Roadmap

### 📐 Visual Diagram 7: Phased 30-60-90 Day Pilot & Capital Roadmap (Template 32)

* **Days 1–30 (Foundation & VPC-SC Landing Zone):** Provision CMEK-encrypted VPC-SC perimeter, AlloyDB ScaNN vector index, and GxP Installation Qualification (IQ).
* **Days 31–60 (Clinician Copilot & PV Safety Gate):** Launch Multi-Agent ReAct Orchestrator, Model Armor guardrails, and 21 CFR Part 11 Human Review Workbench (OQ).
* **Days 61–90 (Production Cutover & FinOps Telemetry):** Complete Performance Qualification (PQ), enable 3-year CUD FinOps budgets, and transition 100% of Wave 1 Medical Affairs traffic.
`,

  prd: `# DOC 02 • Product & Functional Requirements Document (PRD / URS)

## Enterprise Architecture Platform — GxP User Requirements Specification (URS), Clinical Swimlanes & 21 CFR Part 11 Workbench

**Document ID:** DOC-02-PRD-URS-2026-001  
**Document Version:** v2.0 (Lean 8 Consolidated Baseline — Product, UX & GxP Validation Approved)  
**Absorbed Redundant Docs:** DOC 04 (FDD - Functional), DOC 10 (Workshop - Scope)  
**Consolidated Blueprints:** #01, #02, #12, #23 (Base) + Absorbed #03, #26  
**Target Audience:** Product Managers, Clinical UX Designers, QA / Computer System Validation (CSV) Teams  

---

# 1. Product Scope, Personas & System Boundary

### 📐 Visual Diagram 1: Product Scope, Personas & System Boundary (Template 01)

| Persona ID | Clinical / Enterprise Persona | Primary Responsibilities | GxP Authority Level |
|---|---|---|---|
| **PER-01** | **Medical Information Specialist** | Authors scientific responses and verifies fair-balance citations | Tier 2 Supervised Reviewer |
| **PER-02** | **Pharmacovigilance (PV) Safety Officer** | Triages adverse events (AEs) and escalates ICSR cases to Argus | Tier 3/4 Safety Signatory |
| **PER-03** | **MLR Regulatory Reviewer** | Approves promotional and scientific exchange assets | Tier 3 Dual-Custody Signatory |
| **PER-04** | **QA / CSV Compliance Auditor** | Inspects immutable audit trails, SHA-256 hashes, and e-signatures | Read-Only Inspector |

---

# 2. Core Functional Capability Taxonomy & MVP Grid

### 📐 Visual Diagram 2: Core Functional Capability Taxonomy & MVP Grid (Template 02)

| Requirement ID | GxP Functional Capability | MVP (Release 1.0) Scope | Phase 2 (Release 2.0) Expansion | Traceability ID |
|---|---|---|---|---|
| **URS-FUNC-01** | **Access-Aware Hybrid RAG** | Dense ScaNN + BM25 search with ABAC pre-filtering | Cross-lingual EU/APAC regulatory corpus federation | TST-OQ-101 |
| **URS-FUNC-02** | **Real-Time PV Adverse Event Gate** | Inline < 500ms AE/SAE detection & quarantine | Automated E2B(R3) XML draft generation | TST-OQ-102 |
| **URS-FUNC-03** | **Citation Grounding Verifier** | Sentence-level SHA-256 source span bounding boxes | Automated contradiction detection across clinical trials | TST-OQ-103 |
| **URS-FUNC-04** | **21 CFR Part 11 Workbench** | Dual-factor OIDC re-authentication + reason-for-signing | Biometric hardware key (FIDO2/WebAuthn) attestation | TST-PQ-201 |

---

# 3. Multi-Actor Clinical Workflows & Swimlanes

### 📐 Visual Diagram 3: Multi-Actor Clinical Workflows & Swimlanes (Template 03)

1. **Initiation Lane (Clinician / Medical Affairs):** Submits clinical inquiry or promotional manuscript draft via the Executive Workspace.
2. **Cognitive Orchestration Lane (Supervisor + RAG Agents):** Decomposes query, enforces ABAC entitlements, retrieves grounded clinical trial evidence, and runs inline PV safety screening.
3. **Pharmacovigilance Quarantine Lane (Conditional Branch):** If an Adverse Event (AE) or off-label safety signal is detected, the payload is immediately quarantined and routed to the PV Safety Officer queue.
4. **Dual-Custody Approval Lane (Medical + Regulatory Reviewers):** Two authorized reviewers inspect highlighted source citations and apply cryptographic 21 CFR Part 11 electronic signatures.

---

# 4. UX Interaction & Clinician Copilot Journey

### 📐 Visual Diagram 4: UX Interaction & Clinician Copilot Journey (Template 23)

* **Split-Screen Evidence Verification:** Left pane displays the synthesized clinical response with inline [Source 1, p. 14] badges; right pane renders the exact PDF page with highlighted bounding boxes.
* **Confidence & Hallucination Telemetry Bar:** Displays real-time FactScore grounding score (≥ 99.2%), retrieval latency, and zero-PII Model Armor verification badge.

---

# 5. Domain Object Lifecycle & State Machine Gates

### 📐 Visual Diagram 5: Domain Object Lifecycle & State Machine Gates (Template 12)

\`\`\`mermaid
stateDiagram-v2
    [*] --> DRAFT_INGESTED
    DRAFT_INGESTED --> AI_GROUNDING_IN_PROGRESS : Trigger ReAct Loop
    AI_GROUNDING_IN_PROGRESS --> PV_QUARANTINE_HOLD : Adverse Event Detected
    AI_GROUNDING_IN_PROGRESS --> PENDING_PRIMARY_REVIEW : Grounding >= 0.95 & Zero AE
    PV_QUARANTINE_HOLD --> ESCALATED_TO_ARGUS : PV Officer Confirms ICSR
    PENDING_PRIMARY_REVIEW --> PENDING_SECONDARY_SIGN : Reviewer 1 E-Signs (21 CFR 11)
    PENDING_SECONDARY_SIGN --> GXP_APPROVED_PUBLISHED : Reviewer 2 E-Signs (Dual Custody)
    GXP_APPROVED_PUBLISHED --> WORM_ARCHIVED : Immutable SHA-256 Seal
\`\`\`

---

# 6. Human Review Workbench & 21 CFR Part 11 E-Signature Controls

### 📐 Visual Diagram 6: Human Review Workbench & 21 CFR Part 11 E-Signature Controls (Template 26)

* **21 CFR §11.50 Signature Manifestation:** Every signed record displays the printed name of the signer, the UTC timestamp (NTP-synchronized), and the explicit meaning of the signature (*"Reviewed", "Approved", "Safety Verified"*).
* **21 CFR §11.70 Signature/Record Linking:** Electronic signatures are cryptographically bound to the target document via HMAC-SHA256(doc_sha256 || signer_sub || timestamp || meaning) stored in Cloud KMS HSM.
* **21 CFR §11.200 Re-Authentication:** Every signature action requires live credential re-entry (OIDC step-up challenge) and prohibits cached session auto-signing.

---

# 7. Measurable Acceptance Criteria & Non-Functional Requirements (NFRs)

* **NFR-PERF-01:** End-to-end RAG synthesis P95 latency ≤ 3.8 seconds; PV safety gate P99 latency ≤ 500ms.
* **NFR-QUAL-02:** Zero ungrounded medical claims (Hallucination Rate < 0.5% on 5,000-case golden clinical benchmark).
* **Scope Disclaimer:** Derived diagrams describe what is designed, not what was excluded; absence of a capability here is not a scope decision.
`,

  sdd: `# DOC 03 • System Design Document (SDD - High-Level Architecture)

## Enterprise Architecture Platform — High-Level Cloud Architecture, Scale Math, ADRs & Zero-Trust VPC-SC Topology

**Document ID:** DOC-03-SDD-HLD-2026-001  
**Document Version:** v2.0 (Lean 8 Consolidated Baseline — ARB Approved)  
**Absorbed Redundant Docs:** DOC 11 (Interview Defense), DOC 12 (6-R Migration), DOC 14 (RFP - ADRs), DOC 15 (FinOps - Infra)  
**Consolidated Blueprints:** #08, #15, #16, #19, #23 (Base) + Absorbed #13, #22, #31, #33  
**Target Audience:** Principal Architects, Cloud Engineers, Architecture Review Board (ARB) Panel  

---

# 1. Scale Estimations, Back-of-the-Envelope Math & CAP Trade-Offs

* **Peak Workload & QPS:** 25,000 active global clinicians, 1,200 peak concurrent RAG queries/sec (QPS), 48M tokens/min sustained throughput.
* **Vector & Ledger Storage Math:** 50M scientific chunks × 1,536 dims × 4 bytes ≈ 307 GB HNSW/ScaNN RAM footprint per shard; 18 TB/year WORM audit ledger growth.
* **CAP Theorem Partitioning:** **CP (Strong Consistency via Cloud Spanner TrueTime)** for 21 CFR Part 11 e-signatures, RBAC/ABAC entitlements, and Saga Outbox state; **AP (High Availability with bounded staleness ≤ 5s)** for read-only vector similarity caches.

---

# 2. Architecture Decision Records (ADRs) & Selection Trees

### 📐 Visual Diagram 1: Architecture Decision Records (ADRs) & Selection Trees (Template 13)

| ADR ID | Architectural Decision | Evaluated Alternatives | Justification & GxP Impact |
|---|---|---|---|
| **ADR-001** | **AlloyDB ScaNN + Spanner Hybrid Storage** | Standalone Pinecone vs. Raw Postgres pgvector | Combines < 8ms ScaNN vector recall inside VPC-SC with Spanner external consistency for 21 CFR Part 11 ledgers. |
| **ADR-002** | **Vertex AI Agent Engine + ADK A2A Mesh** | Self-hosted LangChain on raw VMs | Managed session state, native IAM Workload Identity, and built-in OpenTelemetry tracing. |
| **ADR-003** | **Private Service Connect (PSC) + VPC-SC** | Public API endpoints with IP allowlists | Eliminates public internet traversal; enforces hardware-level data exfiltration prevention. |

---

# 3. Multi-Tier Subsystem & Decoupled Container Topology

### 📐 Visual Diagram 2: Multi-Tier Subsystem & Decoupled Container Topology (Template 08)

* **Tier 1 (Edge & Identity):** Global External Application Load Balancer, Cloud Armor WAF, Identity-Aware Proxy (IAP), and Workforce Identity Federation.
* **Tier 2 (Agentic Routing Hub):** Apigee X Gateway, A2A Orchestrator Pod, and MCP Tool Broker running on regional GKE Autopilot clusters.
* **Tier 3 (Cognitive & Data Spokes):** Vertex AI Gemini frontier endpoints, Model Armor inline filter, AlloyDB ScaNN vector store, and Cloud Spanner transactional ledger.

---

# 4. Cloud Compute, GPU Sizing & FinOps Reclamation Policies

### 📐 Visual Diagram 3: Cloud Compute, GPU Sizing & FinOps Allocation (Template 16)

### 📐 Visual Diagram 4: FinOps Waste Reclamation & Spot Optimization Matrix (Template 33)

* **Committed Use Discounts (CUDs) & Spot Mix:** Baseline steady-state GKE pods run on 3-year flexible CUDs (100% coverage); asynchronous bulk document ingestion and embedding pipelines run on **GKE Spot Node Pools** (−72% compute cost) with graceful 30-second SIGTERM checkpointing.
* **Automated Waste Reclamation:** Idle preview namespaces auto-scale to zero after 15 minutes of inactivity; semantic KV-cache deduplicates repeated clinical protocol queries (42% token reduction).

---

# 5. Zero-Trust Network Perimeter & VPC Infrastructure

### 📐 Visual Diagram 5: Zero-Trust Network Perimeter & VPC Infrastructure (Template 15)

* **VPC Service Controls (VPC-SC):** Enforces a dry-run and enforced service perimeter around aiplatform.googleapis.com, spanner.googleapis.com, and storage.googleapis.com with zero internet egress.
* **SPIFFE / Istio Ambient mTLS:** Every pod-to-pod call is authenticated via short-lived (15-minute) X.509 SVID certificates issued by Cloud Certificate Authority Service.

---

# 6. Cognitive Runtime & Model Gateway Routing

### 📐 Visual Diagram 6: Cognitive Runtime & Model Gateway Routing (Template 23)

* **Dynamic Complexity Router:** Routes deterministic classification and metadata extraction to low-latency Flash models while escalating complex multi-study clinical synthesis to deep-thinking Pro/Argon models.

---

# 7. High-Availability & Multi-Region DR Strategy

### 📐 Visual Diagram 7: High-Availability & Multi-Region DR Strategy (Template 19)

* **Active-Active Multi-Region Deployment (us-central1 + us-east4):** Global Anycast DNS with health-checked failover (RTO < 60 seconds, RPO = 0 via synchronous Spanner multi-region quorum).

---

# 8. (Conditional Appendix) Legacy 6-R Cloud Migration & CDC Sync

### 📐 Visual Diagram 8: Legacy 6-R Cloud Migration Wave & CDC Sync (Template 22)

### 📐 Visual Diagram 9: Enterprise Subsystem & Database Dependency Mesh (Template 31)

* **Strangler-Fig & Dual-Write CDC:** Legacy on-premises Oracle/Documentum clinical repositories are replicated in real time via Google Cloud Datastream CDC into Cloud Storage and AlloyDB with automated SHA-256 row-count reconciliation prior to wave cutover.
`,

  tdd: `# DOC 05 • Technical Design & API Specification (TDD - Low-Level Engineering)

## Enterprise Architecture Platform — Low-Level Engineering, REST/gRPC API Contracts, Physical Schemas & Saga Outbox

**Document ID:** DOC-05-TDD-LLD-2026-001  
**Document Version:** v2.0 (Lean 8 Consolidated Baseline — Engineering & API Spec Approved)  
**Absorbed Redundant Docs:** DOC 04 (FDD - Data/Seq), DOC 08 (API Spec)  
**Consolidated Blueprints:** #11, #14, #20, #28 (Base) + Absorbed #08  
**Target Audience:** Backend Engineers, API Developers, Database Administrators (DBAs), DevOps / SecOps  

---

# 1. Enterprise API Gateway, Rate Limits & Traffic Routing

### 📐 Visual Diagram 1: Enterprise API Gateway, Rate Limits & Traffic Routing (Template 08)

| Endpoint Route | Protocol | Auth & Scope | Rate Limit (Token Bucket) | P99 Latency SLA |
|---|---|---|---|---|
| **POST /v1/dossiers:synthesize** | REST / JSON | OIDC Bearer + gxp.dossier.write | 120 req/min per tenant | ≤ 3,800ms |
| **POST /v1/signatures:attest** | gRPC / HTTP2 | Step-Up OIDC + cfr11.sign | 60 req/min per user | ≤ 180ms |
| **POST /v1/pv/events:screen** | gRPC / Protobuf | SPIFFE mTLS + pv.screen | 2,500 req/min burst | ≤ 450ms |

---

# 2. Micro-Level API Sequences, Webhooks & Latency Budgets

### 📐 Visual Diagram 2: Micro-Level API Sequences, Webhooks & Latency Budgets (Template 11)

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Reviewer as 👤 Licensed Reviewer
    participant Gateway as 🚪 Apigee / Envoy Gateway
    participant Orch as ⚙️ ReAct Orchestrator
    participant Armor as 🛡️ Model Armor & DLP
    participant Spanner as 🗄️ Cloud Spanner Ledger
    participant KMS as 🔐 Cloud KMS HSM

    Reviewer->>Gateway: POST /v1/signatures:attest (Idempotency-Key, Step-Up JWT)
    Gateway->>Orch: ValidateJwtAndReason(sub, doc_id, meaning) [< 15ms]
    Orch->>Armor: VerifyZeroUnredactedPII(doc_id) [< 25ms]
    Armor-->>Orch: PASS (clean_hash)
    Orch->>KMS: AsymmetricSign(SHA256(doc_hash || sub || meaning || ts)) [< 35ms]
    KMS-->>Orch: pkcs7_signature_bytes
    Orch->>Spanner: CommitTransaction(signature_record + outbox_event) [< 20ms]
    Spanner-->>Gateway: 201 Created (Immutable Audit Receipt)
\`\`\`

---

# 3. Logical Domain Model, Physical Database Schema & JSON ERDs

### 📐 Visual Diagram 3: Logical Domain Model, Physical Database Schema & JSON ERDs (Template 14)

\`\`\`sql
CREATE TABLE gxp_clinical_dossiers (
    tenant_id STRING(36) NOT NULL,
    dossier_id STRING(36) NOT NULL,
    protocol_number STRING(64) NOT NULL,
    lifecycle_state STRING(32) NOT NULL, -- DRAFT, PV_HOLD, PENDING_SIGN, APPROVED, ARCHIVED
    content_sha256 STRING(64) NOT NULL,
    grounding_score FLOAT64 NOT NULL,
    created_by STRING(128) NOT NULL,
    created_at TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp = true)
) PRIMARY KEY (tenant_id, dossier_id);

CREATE TABLE cfr11_electronic_signatures (
    tenant_id STRING(36) NOT NULL,
    dossier_id STRING(36) NOT NULL,
    signature_id STRING(36) NOT NULL,
    signer_subject STRING(128) NOT NULL,
    signer_printed_name STRING(256) NOT NULL,
    signature_meaning STRING(64) NOT NULL, -- REVIEWED, APPROVED, PV_CLEARED
    kms_key_version STRING(256) NOT NULL,
    cryptographic_digest BYTES(512) NOT NULL,
    signed_at TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp = true)
) PRIMARY KEY (tenant_id, dossier_id, signature_id),
  INTERLEAVE IN PARENT gxp_clinical_dossiers ON DELETE NO ACTION;
\`\`\`

---

# 4. Distributed Saga Outbox Transactions & Idempotency

* **Transactional Outbox Pattern:** Every mutation to gxp_clinical_dossiers atomically inserts an event row into saga_outbox_events within the same Cloud Spanner read-write transaction, guaranteeing zero dual-write drift between Spanner and Pub/Sub.
* **Cryptographic Idempotency:** All write endpoints require an Idempotency-Key header stored in Spanner with a 7-day retention lock to prevent duplicate adverse event filings or double signatures.

---

# 5. Application Fault Tolerance, Circuit Breakers & Retry Policies

### 📐 Visual Diagram 4: Application Fault Tolerance, Circuit Breakers & Retry Policies (Template 28)

* **Adaptive Circuit Breakers:** Envoy outlier detection ejects upstream model endpoints if consecutive 5xx errors exceed 3 within 10 seconds, failing over transparently to the secondary region (us-east4).
* **Bounded Exponential Backoff:** Retries follow T_sleep = min(8000ms, 200ms × 2^attempt) + Uniform(0, 100ms) with dead-letter queue (DLQ) persistence after 4 failed attempts.

---

# 6. Multi-Stage CI/CD & DevSecOps Quality Gates

### 📐 Visual Diagram 5: Multi-Stage CI/CD & DevSecOps Quality Gates (Template 20)

* **22-Stage GxP Automated Pipeline:** Enforces static AST analysis, Trivy container CVE scanning, SLSA Level 3 Cosign attestation, automated IQ/OQ Vitest/Playwright regression suites, and canary rollouts (5% → 25% → 100%).
`,

  ai_system_card: `# DOC 13 • Enterprise AI / LLM System Card & Safety Governance Spec

## Enterprise Architecture Platform — Multi-Agent ReAct Orchestration, ScaNN Vector RAG, Model Armor & Token Governance

**Document ID:** DOC-13-AI-CARD-2026-001  
**Document Version:** v2.0 (Lean 8 Consolidated Baseline — AI Ethics Board & Regulatory Approved)  
**Absorbed Redundant Docs:** DOC 04 (FDD - Agent Flows), DOC 15 (Token Throttling)  
**Consolidated Blueprints:** #23, #24, #26, #40 (Base)  
**Target Audience:** Chief AI Officer, AI Ethics Board, ML Engineers, GxP Regulators  

---

# 1. Foundation Model Selection, Benchmarks & Token Throttling

| Model Tier | Vertex AI Model ID | Assigned Clinical / Operational Role | Token Budget & Throttling Policy |
|---|---|---|---|
| **Tier 1 Reasoning** | gemini-2.5-pro | Complex clinical synthesis, multi-trial contradiction analysis | thinkingLevel: HIGH, max 16,384 output tokens, tenant quota cap |
| **Tier 2 High-Speed** | gemini-2.5-flash | Inline PV adverse event screening, metadata routing | Low-latency streaming, < 450ms SLA, semantic cache first |
| **Tier 3 Embeddings** | text-embedding-005 | 768/1536-dim dense clinical passage indexing | Batch quota throttling + content-SHA256 deduplication |

---

# 2. Multi-Agent Cognitive Reasoning & ReAct Loops

### 📐 Visual Diagram 1: Multi-Agent Cognitive Reasoning & ReAct Loops (Template 23)

* **Bounded ReAct Loop Governor:** Supervisor Agent orchestrates specialized sub-agents (*Clinical Literature Retriever*, *Biostatistics Verifier*, *Pharmacovigilance Screener*, *Citation Auditor*) with a hard ceiling of ≤ 5 reasoning iterations and deterministic loop-cycle detection.

---

# 3. Enterprise RAG Knowledge Mesh & ScaNN Vector Search

### 📐 Visual Diagram 2: Enterprise RAG Knowledge Mesh & ScaNN Vector Search (Template 24)

**Hybrid Retrieval Scoring Formula:**  
HybridScore(q, d) = [ 0.65 × cos(e_q, e_d) + 0.35 × BM25(q, d) ] × I(ABAC(u, d) == ALLOW)

* **Pre-Retrieval ABAC Enforcement:** Document ACL security predicates are evaluated inside the AlloyDB ScaNN query plan *before* vector cosine ranking so unauthorized clinical trial data never enters context memory.

---

# 4. Model Armor Prompt Injection Shields & Guardrails

* **Inline Bi-Directional Filtering:** Google Cloud Model Armor + Cloud DLP inspect 100% of user prompts and retrieved chunks for jailbreak patterns, indirect prompt injection, and unredacted HIPAA PHI before LLM invocation.

---

# 5. Dual-Custody Human-in-the-Loop Clinical Approval Gates

### 📐 Visual Diagram 3: Dual-Custody Human-in-the-Loop Clinical Approval Gates (Template 26)

* **Confidence & Safety Escalation:** Any synthesis with grounding confidence < 0.92 or a positive Pharmacovigilance signal automatically blocks autonomous release and routes to the 21 CFR Part 11 Dual-Custody Workbench.

---

# 6. Enterprise GenAI Platform Infrastructure Topology

### 📐 Visual Diagram 4: Enterprise GenAI Platform Infrastructure Topology (Template 40)

* **Dedicated Provisioned Throughput & Semantic KV Cache:** Provisioned Throughput (PT) reservations guarantee zero noisy-neighbor latency spikes during FDA regulatory submission windows.
`,

  threat_model: `# DOC 07 • STRIDE Threat Model & Security Posture

## Enterprise Architecture Platform — Cross-Zone Data Flow Diagrams (DFD), Trust Boundaries & STRIDE Mitigations

**Document ID:** DOC-07-STRIDE-2026-001  
**Document Version:** v2.0 (Lean 8 Standalone Zero-Bloat Baseline — CISO Approved)  
**Absorbed Redundant Docs:** (Standalone — Zero Bloat)  
**Consolidated Blueprints:** #15, #18, #27 (Base)  
**Target Audience:** Chief Information Security Officer (CISO), Penetration Testers, SecOps  

---

# 1. Security Posture Scope & Threat Modeling Methodology

This standalone **STRIDE Threat Model** evaluates every trust boundary crossing across external clinician clients, the DMZ edge perimeter, the GKE/Vertex AI cognitive plane, and the CMEK-encrypted GxP persistence zone.

---

# 2. Data Flow Diagrams (DFD) & Cross-Zone Trust Boundaries

### 📐 Visual Diagram 1: Security Trust Boundaries & Attack Surface DFD (Template 18)

* **Trust Boundary TB-01 (Internet to Edge DMZ):** Enforced via Cloud Armor WAF (OWASP Top 10 + adaptive DDoS) and Identity-Aware Proxy (IAP).
* **Trust Boundary TB-02 (Edge DMZ to Agentic Runtime):** Enforced via Apigee OAuth2/OIDC JWT validation and Istio Ambient SPIFFE mTLS.
* **Trust Boundary TB-03 (Agentic Runtime to GxP Data Lake & LLM):** Enforced via VPC Service Controls (VPC-SC) and Private Service Connect (PSC) with zero internet egress.

---

# 3. Perimeter Defense & Zero-Trust Access Architecture

### 📐 Visual Diagram 2: Perimeter Defense & Zero-Trust Access Architecture (Template 15)

* **Hardware-Backed Encryption:** All data at rest in Cloud Spanner, AlloyDB, and Cloud Storage is encrypted via Customer-Managed Encryption Keys (CMEK) in Cloud HSM with 90-day automated rotation.

---

# 4. STRIDE Threat Assessment Matrix & Mitigation Flow

### 📐 Visual Diagram 3: STRIDE Threat Assessment Matrix & Mitigation Flow (Template 27)

| STRIDE Category | Target Component | Attack Vector Scenario | Enforced Architectural Control | Residual Risk |
|---|---|---|---|---|
| **S — Spoofing** | 21 CFR Part 11 Signature API | Stolen session cookie used to forge approval | Step-up OIDC re-authentication + FIDO2 challenge per signature | **VERY LOW** |
| **T — Tampering** | WORM Audit Ledger | Malicious insider alters historical AI prompt log | GCS Bucket Lock (WORM retention) + SHA-256 hash chaining | **NEGLIGIBLE** |
| **R — Repudiation** | Clinical Dossier Release | Reviewer denies approving off-label claim | Cloud HSM asymmetric signature over (doc_hash, sub, ts) | **NEGLIGIBLE** |
| **I — Info Disclosure** | Vector RAG Search | Cross-tenant prompt injection extracts rival trial data | AlloyDB pre-filter ABAC + VPC-SC perimeter isolation | **LOW** |
| **D — Denial of Service** | Vertex AI Inference Gateway | Token-exhaustion bomb degrades clinical copilot | Per-tenant token-bucket quotas + semantic KV cache | **LOW** |
| **E — Elevation of Privilege** | MCP Tool Execution Broker | Agent tricked into invoking admin write tool | Scoped IAM Workload Identity + HITL approval token required | **VERY LOW** |
`,

  security_package: `# DOC 09 • GRC & Regulatory Compliance Package

## Enterprise Architecture Platform — FDA 21 CFR Part 11, HIPAA, SOC 2 Type II & ISO 27001 Audit Evidence Package

**Document ID:** DOC-09-GRC-2026-001  
**Document Version:** v2.0 (Lean 8 Standalone Zero-Bloat Baseline — QA & Regulatory Compliance Approved)  
**Absorbed Redundant Docs:** (Standalone — Zero Bloat)  
**Consolidated Blueprints:** #15, #17, #21 (Base)  
**Target Audience:** FDA/EMA Auditors, Quality Assurance (QA), Compliance Officers, Legal Counsel  

---

# 1. Enterprise Security Architecture & Defense-in-Depth

### 📐 Visual Diagram 1: Enterprise Security Architecture & Defense-in-Depth (Template 15)

* **Zero-Trust Regulatory Isolation:** Production GxP workloads operate inside dedicated Google Cloud folders guarded by Organization Policy constraints (constraints/gcp.resourceLocations, constraints/compute.vmExternalIpAccess) and VPC Service Controls.

---

# 2. Identity Governance, ABAC & Privileged Access Flow

### 📐 Visual Diagram 2: Identity Governance, ABAC & Privilege Access Flow (Template 17)

* **Least-Privilege ABAC & JIT PAM:** Clinicians authenticate via SAML 2.0 / OIDC federation; administrative break-glass access requires Privileged Access Manager (PAM) dual approval, is capped at 60 minutes, and streams full keystroke/API telemetry to Chronicle SIEM.

---

# 3. Tamper-Evident Audit Logging & Observability Pipeline

### 📐 Visual Diagram 3: Tamper-Evident Audit Logging & Observability Pipeline (Template 21)

* **7-Year WORM Retention:** Cloud Audit Logs (Admin Activity + Data Access) and 21 CFR Part 11 application events are streamed into retention-locked Cloud Storage buckets (retentionPolicy.isLocked = true, 7-year GxP retention).

---

# 4. Control Mapping: FDA 21 CFR Part 11, HIPAA, SOC 2 & ISO 27001

| Regulatory Framework | Clause / Control ID | Mandate Description | Implemented Technical Control & Evidence Artifact |
|---|---|---|---|
| **FDA 21 CFR Part 11** | §11.10(e) | Time-stamped, computer-generated audit trails | Cloud Spanner commit timestamps + WORM GCS hash chain (EVD-CFR11-01) |
| **FDA 21 CFR Part 11** | §11.50 & §11.70 | Signature manifestation & cryptographic binding | Cloud KMS HSM signature over document SHA-256 digest (EVD-CFR11-02) |
| **HIPAA Security Rule** | 45 CFR §164.312(a)(2)(iv) | Encryption and decryption of ePHI | Cloud DLP de-identification + CMEK HSM AES-256 at rest (EVD-HIPAA-04) |
| **SOC 2 Type II** | CC6.1 & CC7.2 | Logical access controls & anomaly detection | IAP + Workforce Identity + Security Command Center Premium (EVD-SOC2-09) |
| **ISO/IEC 27001:2022** | Annex A.8.15 | Logging and protection of log information | Immutable log sink + BigQuery/Chronicle SIEM alerting (EVD-ISO-15) |
`,

  sre_resilience: `# DOC 17 • SRE Reliability, Chaos & Production Cutover Runbook

## Enterprise Architecture Platform — 99.999% SLA Error Budgets, Chaos Engineering, BCDR Vault & War Room Cutover

**Document ID:** DOC-17-SRE-OPS-2026-001  
**Document Version:** v2.0 (Lean 8 Consolidated Baseline — SRE Director & Release Management Approved)  
**Absorbed Redundant Docs:** DOC 16 (Go-Live Runbook), DOC 12 (Cutover Ch. 6), DOC 11 (Failure Modes)  
**Consolidated Blueprints:** #19, #21, #28, #48 (Base) + Absorbed #03, #11, #29  
**Target Audience:** Site Reliability Engineers (SREs), Incident Commanders, Release Managers, Infrastructure Leads  

---

# 1. 99.999% SLA, Four Golden Signals & Error Budget Policies

### 📐 Visual Diagram 1: 99.999% SLA, Four Golden Signals & Error Budget Policies (Template 21)

| Golden Signal | Service Level Indicator (SLI) | 99.999% SLO Target | Fast-Burn Alert (2% Budget in 1h) |
|---|---|---|---|
| **Latency** | P95 / P99 Dossier Synthesis & PV Triage | P95 ≤ 3.8s, P99 PV ≤ 500ms | Page Primary SRE + Auto-Shift Traffic |
| **Traffic** | Requests/sec & Token Throughput | Up to 1,200 QPS sustained | Trigger GKE HPA + Provisioned Throughput burst |
| **Errors** | HTTP 5xx + Uncaught Agent Exceptions | < 0.001% error rate | Freeze feature releases + Automatic Canary Rollback |
| **Saturation** | GKE Pod CPU/Memory & Spanner CPU | < 65% high-priority Spanner CPU | Scale node pools + Shed Tier-1 background indexing |

---

# 2. Multi-Region Active-Active Failover & Chaos Engineering

### 📐 Visual Diagram 2: Multi-Region Active-Active Failover & Chaos Engineering (Template 19)

* **Automated Regional Evacuation:** Continuous synthetic probes test us-central1 and us-east4 every 10 seconds; regional degradation triggers Cloud Load Balancing evacuation in < 30 seconds with zero lost transactions (RPO = 0).

---

# 3. Bulkheads, Load Shedding & Graceful Degradation

### 📐 Visual Diagram 3: Bulkheads, Load Shedding & Graceful Degradation (Template 28)

* **Priority Load Shedding:** Under extreme surge, Tier-1 background literature indexing is paused first so Tier-3/4 Pharmacovigilance safety screening and 21 CFR Part 11 signature endpoints retain 100% compute capacity.

---

# 4. BCDR Air-Gapped Cyber Recovery & Ransomware Vault

### 📐 Visual Diagram 4: BCDR Air-Gapped Cyber Recovery & Ransomware Vault (Template 48)

* **Isolated Clean-Room Recovery Project:** Point-in-time Spanner backups and WORM GCS ledgers are replicated every 15 minutes into a separate, air-gapped GCP organization project with independent IAM root credentials.

---

# 5. T-Minus 24h Pre-Flight & Cross-Functional War Room Swimlane

### 📐 Visual Diagram 5: T-Minus 24h Pre-Flight & Cross-Functional War Room Swimlane (Template 03)

* **War Room Command Structure:** Incident Commander (SRE Lead), GxP Quality Signatory (QA Lead), Database Lead (DBA), and Security Officer (SecOps) execute the T-24h, T-4h, and T-0 readiness checklists prior to production traffic cutover.

---

# 6. Minute-by-Minute Traffic Cutover & Automated Rollback Tree

### 📐 Visual Diagram 6: Minute-by-Minute Operational Cutover Runbook Matrix (Template 29)

### 📐 Visual Diagram 7: Production Traffic Cutover Sequence & Auto-Rollback Tree (Template 11)

| Cutover Timestamp | Execution Step | Owner | Verification Probe / Rollback Trigger |
|---|---|---|---|
| **T-00:00** | Freeze legacy dual-write queue & verify Datastream CDC lag = 0ms | DBA Lead | spanner_row_count == legacy_row_count |
| **T+00:05** | Shift 5% canary traffic via Cloud Load Balancing weight | SRE Lead | Error rate < 0.01%, P99 < 4.0s |
| **T+00:20** | Ramp traffic 5% → 25% → 50% → 100% | Release Manager | Continuous 21 CFR Part 11 signature smoke test PASS |
| **Abort Trigger** | Any P0 safety regression or error rate > 0.5% for 120s | Incident Commander | Execute gcloud compute url-maps import --rollback (< 15s) |
`,
};

const RETAIL_AMAZON_DOCUMENTS: Record<string, string> = {
  sdd: `# DOC 03 • System Design Document (SDD - High-Level Architecture)

## Amazon-Scale Hyper-Scalable Omnichannel Marketplace & Logistics Platform

**Document ID:** DOC-03-SDD-RETAIL-2026-001  
**Document Version:** v2.4 (Lean 8 Consolidated Baseline — ARB Approved)  
**Target Throughput:** 100,000+ Peak Order QPS (< 15ms P95 Latency)  
**System Availability:** 99.999% Multi-Region Active-Active Uptime  

---

# 1. Scale Estimations, Back-of-the-Envelope Math & CAP Trade-Offs

* **Peak Throughput:** 100,000 Order QPS, 50M+ SKUs, sub-15ms P95 catalog search, RPO=0 synchronous Cloud Spanner order ledger.

---

# 2. Architecture Decision Records (ADRs) & Selection Trees

### 📐 Visual Diagram 1: Architecture Decision Records (ADRs) & Selection Trees (Template 13)

---

# 3. Multi-Tier Subsystem & Decoupled Container Topology

### 📐 Visual Diagram 2: Multi-Tier Subsystem & Decoupled Container Topology (Template 08)

---

# 4. Cloud Compute, GPU Sizing & FinOps Reclamation Policies

### 📐 Visual Diagram 3: Cloud Compute, GPU Sizing & FinOps Allocation (Template 16)

### 📐 Visual Diagram 4: FinOps Waste Reclamation & Spot Optimization Matrix (Template 33)

---

# 5. Zero-Trust Network Perimeter & VPC Infrastructure

### 📐 Visual Diagram 5: Zero-Trust Network Perimeter & VPC Infrastructure (Template 15)

---

# 6. Cognitive Runtime & Model Gateway Routing

### 📐 Visual Diagram 6: Cognitive Runtime & Model Gateway Routing (Template 23)

---

# 7. High-Availability & Multi-Region DR Strategy

### 📐 Visual Diagram 7: High-Availability & Multi-Region DR Strategy (Template 19)

---

# 8. (Conditional Appendix) Legacy 6-R Cloud Migration & CDC Sync

### 📐 Visual Diagram 8: Legacy 6-R Cloud Migration Wave & CDC Sync (Template 22)

### 📐 Visual Diagram 9: Enterprise Subsystem & Database Dependency Mesh (Template 31)
`,
};

export function getDomainMasterDocument(docId: string, domainId: string = 'biopharma', userPrompt?: string): string {
  let resolvedId = 'sdd';
  try {
    resolvedId = resolveSurvivingArchetypeId(docId);
  } catch {
    resolvedId = 'sdd';
  }
  const isAmazonOrRetail =
    domainId === 'retail' || (userPrompt && /amazon|retail|ecommerce|cart|store|shop|marketplace/i.test(userPrompt));

  let rawDoc =
    isAmazonOrRetail && RETAIL_AMAZON_DOCUMENTS[resolvedId]
      ? RETAIL_AMAZON_DOCUMENTS[resolvedId]
      : MASTER_DOCUMENTS[resolvedId] || MASTER_DOCUMENTS.sdd;

  if (domainId && domainId !== 'biopharma') {
    const domainMeta: Record<string, { label: string; sor: string; reg: string }> = {
      fintech: {
        label: 'FinTech Autonomous Payments & Risk',
        sor: 'Core Banking Ledger / ISO 20022 Gateway / SAP ERP',
        reg: 'PCI-DSS v4.0, SOX 404, SEC Rule 17a-4',
      },
      retail: {
        label: 'Omnichannel Retail & Supply Chain',
        sor: 'Order Management / WMS Inventory / SAP ERP',
        reg: 'PCI-DSS v4.0, SOC 2 Type II, GDPR/CCPA',
      },
      manufacturing: {
        label: 'Smart Manufacturing & Industrial IoT',
        sor: 'SCADA Telemetry / MES Historian / SAP ERP',
        reg: 'IEC 62443, ISO 9001, FAA Part 135',
      },
      saas: {
        label: 'Multi-Tenant Enterprise SaaS Mesh',
        sor: 'Tenant Control Plane / Subscription Ledger / CRM',
        reg: 'SOC 2 Type II, ISO 27001, FedRAMP High',
      },
    };
    const meta = domainMeta[domainId] || {
      label: `${domainId.toUpperCase()} Enterprise Cloud`,
      sor: 'Cloud Spanner System of Record / SAP ERP',
      reg: 'SOC 2 Type II, ISO 27001',
    };
    rawDoc = rawDoc
      .replace(/Veeva Vault\s*\/\s*Argus Safety\s*\/\s*SAP ERP/gi, meta.sor)
      .replace(/Veeva Vault/gi, meta.sor.split(' / ')[0])
      .replace(/Argus Safety/gi, meta.sor.split(' / ')[1] || 'Cloud Spanner Ledger')
      .replace(/Medidata Rave/gi, 'Enterprise Telemetry Hub')
      .replace(/IND Submission/gi, 'Production Release Gate')
      .replace(/GxP & Functional/gi, 'Zero-Trust & Functional')
      .replace(/GxP Systems of Record/gi, 'Enterprise Systems of Record')
      .replace(/Bio-Pharma/gi, meta.label)
      .replace(/FDA 21 CFR Part 11, EMA Annex 11, HIPAA, GxP Computer System Validation \(CSV\)/gi, meta.reg);
  }

  return rawDoc;
}

