export const MASTER_DOCUMENTS: Record<string, string> = {
  brd: `# Business Requirements Document (BRD)

## Enterprise Architecture Platform — Bio-Pharma Autonomous Safety Screener & Commercial AI Hub

**Document ID:** BRD-BIO-2026-001  
**Document Version:** v1.0 (Executive Steering Committee & ARB Approved Baseline)  
**Document Status:** Approved — Executive Steering Committee Sign-Off  
**Executive Sponsor:** Dr. Marcus Vance (Executive VP, Global Medical & Commercial Operations)  
**Business Owner:** Dr. Elena Vance (VP, Cognitive Platforms & Digital Product)  
**Program Director:** Jennifer Sterling (Enterprise AI Program Management Director)  
**Principal Business Analyst:** Kabir Mehta (Principal Healthcare Systems Analyst)  
**Medical & Regulatory Lead:** Dr. Aris Thorne, MD (Global Medical Safety Director)  
**Compliance & Legal Lead:** Sarah Chen, JD (Senior VP, Global Regulatory & Quality Compliance)  
**Principal Enterprise Architect:** Nitin Aggarwal (Principal AI Systems Architect)  
**Target Release:** Release 1 Production Pilot (Q3 2026)  
**Confidentiality:** Enterprise Confidential — GxP Validated Repository  

---

# 1. Executive Summary & Transformation Vision

### 1.1 Business Problem Statement
Global enterprise life-sciences operations require cross-functional scientific review across Medical Affairs, Commercial MLR (Medical, Legal, Regulatory), and Pharmacovigilance (PV) safety intake. Today, over 65% of scientific reviews experience turnaround delays averaging 14 business days per submission due to fragmented data repositories, manual fair-balance claims verification, and lack of real-time adverse event triage.

### 1.2 Strategic Transformation Vision
The **Enterprise Architecture Platform** delivers a governed, access-aware cognitive orchestration platform that automates multi-step scientific workflows while guaranteeing 100% compliance with FDA 21 CFR Part 11, HIPAA, and EMA Annex 11 regulations.

---

# 2. Business Context & Stakeholder Topology

### 📐 Visual Diagram 1: Executive System Context & Stakeholder Topology (Template 01)
\`\`\`mermaid
graph TD
    USERS["👥 Medical Info Specialists & Regulatory Reviewers"] --> PORTAL["🌐 Executive Digital Workspace Portal"]
    PORTAL --> PERIMETER["🛡️ Cloud Armor WAF & Google API Gateway (VPC-SC Perimeter)"]
    PERIMETER --> ORCH["⚙️ Multi-Agent Workflow Orchestrator (GKE Private Subnet)"]
    
    ORCH <--> KNOWLEDGE["🗄️ Enterprise Scientific Knowledge Lake (Spanner + GCS)"]
    ORCH <--> SAFETY["⚖️ Human-in-the-Loop Governance Board"]
    ORCH <--> SYSTEMS["☁️ Systems of Record (Veeva Vault / Argus Safety / Salesforce)"]
\`\`\`

---

# 3. Current-State vs. Future-State Process Modernization

| Transformation Dimension | Current Legacy Baseline (As-Is) | Target Future State (To-Be) | Strategic Impact & ROI |
|---|---|---|---|
| **Medical Info Response (MIR)** | 14 business days manual literature review | **< 48 hours** with verified evidence citations | **85% cycle time reduction** |
| **MLR Claims Review** | 3.4 manual revision cycles per marketing asset | **< 1.2 revision cycles** with automated policy screening | **65% reduction in review friction** |
| **Pharmacovigilance (PV) Triage** | Batch ingestion; 24–48h AE identification | **Real-time (< 500ms)** Adverse Event detection | **Zero regulatory non-compliance fines** |
| **Audit & Traceability** | Disparate PDF signature logs | **Immutable SHA-256 event chaining** | **100% inspection-readiness** |

---

# 4. Strategic Business Capability Inventory

| Capability ID | Business Capability Pod | Functional Description | Strategic Priority |
|---|---|---|---|
| **CAP-01** | **Access-Aware Knowledge Retrieval** | Hybrid dense/sparse vector search with ABAC entitlement filtering | **P0 (Critical)** |
| **CAP-02** | **Cognitive Scientific Synthesis** | ReAct reasoning agents generating evidence-grounded dossiers | **P0 (Critical)** |
| **CAP-03** | **Real-Time Safety & PV Screener** | Automated screening for adverse events with instant Argus escalation | **P0 (Critical)** |
| **CAP-04** | **Human Review Workbench** | FDA 21 CFR Part 11 compliant digital signature & dual-custody gate | **P0 (Critical)** |
| **CAP-05** | **Cryptographic Audit Ledger** | WORM-compliant immutable ledger for all model prompts & outputs | **P1 (High)** |

---

# 5. Risk-Based Autonomy Matrix & Mandatory Human Triggers

| Risk Level | Autonomy Tier | Permitted Autonomous Operations | Mandatory Human-in-the-Loop (HITL) Triggers |
|---|---|---|---|
| **Low Risk** | **Tier 1: Autonomous** | Internal document indexing, vector embedding, telemetry health logging | None (Fully automated background processing) |
| **Moderate Risk** | **Tier 2: Supervised** | Draft response generation, literature summarization, semantic tagging | Human must review and click "Acknowledge" before dispatch |
| **High Risk** | **Tier 3: Dual-Custody** | External regulatory dossier filing, promotional material publication | **Two licensed reviewers** must provide 21 CFR Part 11 e-signatures |
| **Critical Risk** | **Tier 4: Human-Only** | Final Pharmacovigilance adverse event report submission to FDA MedWatch | System pre-populates data; **Human makes final filing determination** |

---

# 6. Regulatory & Industry Compliance Mandates

* **FDA 21 CFR Part 11:** Enforces dual-factor electronic signatures, tamper-evident audit trails, and strict session timeouts.
* **HIPAA / GDPR:** Automated PHI/PII de-identification and tokenization before LLM context injection.
* **EMA Annex 11:** Computerized systems validation for European commercial distribution.

---

# 7. Business Value Realization & ROI Model

### 7.1 Capital & Operational Expenditure Model
* **Annual Operational Savings:** Projected $4.2M annually across 4 therapeutic areas.
* **Review Capacity Increase:** 300% increase in processed medical information inquiries without additional headcount.
* **Time-to-Value:** 6 months to break-even from initial deployment.

---

# 8. Executive Governance Approval Gates (Gates 1–5)

| Stage Gate | Gate Name | Entry Criteria | Exit Deliverable | Status |
|---|---|---|---|:---:|
| **Gate 1** | **Charter & Feasibility** | Approved Business Problem & Budget | Signed BRD & Stakeholder Alignment | ✅ PASSED |
| **Gate 2** | **Architecture Validation** | SDD & Threat Model ARB Approval | Signed System Design Document | ✅ PASSED |
| **Gate 3** | **Security & GxP Audit** | VPC-SC & 21 CFR Part 11 Attestation | Security Sign-Off Package | ✅ PASSED |
| **Gate 4** | **Controlled Pilot** | 100 User Test with > 90% Satisfaction | User Acceptance Sign-Off | 🔄 IN PROGRESS |
| **Gate 5** | **Global Production** | 99.999% HA Cluster & DR Drill Verified | Executive Production Sign-Off | ⏳ PENDING |

---

# 9. Executive Charter Sign-Off

| Reviewer Role | Executive Sign-Off Name | Approval Status | Signature Stamp | Date |
|---|---|---|---|---|
| **Executive Sponsor** | Dr. Marcus Vance | ✅ **APPROVED** | \`SIG_EXEC_99214_VERIFIED\` | August 2, 2026 |
| **Business Owner** | Dr. Elena Vance | ✅ **APPROVED** | \`SIG_BUS_88102_VERIFIED\` | August 2, 2026 |
| **Principal Architect** | Nitin Aggarwal | ✅ **APPROVED** | \`SIG_ARCH_44192_VERIFIED\` | August 2, 2026 |
| **Global Quality Lead** | Sarah Chen, JD | ✅ **APPROVED** | \`SIG_QUAL_11904_VERIFIED\` | August 2, 2026 |
`,

  prd: `# Product Requirements Document (PRD)

## Enterprise Architecture Platform — Bio-Pharma Autonomous Safety Screener & Commercial AI Hub

**Document ID:** PRD-BIO-2026-001  
**Document Status:** Approved — GxP & Enterprise Architecture Review Board (ARB) Baseline  
**PRD Version:** v1.0 (Master Unified Architecture Baseline)  
**Product Owner:** Dr. Elena Vance (VP, Cognitive Platforms & Digital Product)  
**Business Owner:** Dr. Marcus Vance (Executive VP, Global Medical & Commercial Operations)  
**Technical Owner:** Nitin Aggarwal (Principal AI Systems Architect)  
**Compliance Owner:** Sarah Chen, JD (Senior VP, Global Regulatory & Quality Compliance)  
**Target Release:** Release 1 Production Pilot (Q3 2026)  
**Confidentiality:** Confidential — Enterprise Internal & GxP Validation Repository  

---

# 1. Executive Summary & Product Vision

### 1.1 Product Overview
**Enterprise Architecture Platform** is a governed, end-to-end Agentic AI platform engineered for highly regulated pharmaceutical enterprises. The platform combines access-aware enterprise retrieval (Hybrid RAG), specialized domain AI agents, a zero-trust VPC Service Controls (VPC-SC) security perimeter, and mandatory Human-in-the-Loop (HITL) review gates to automate high-complexity scientific workflows while preserving 100% inspection readiness.

---

# 2. Target Users & Enterprise Personas

| Persona ID | Target User Persona | Enterprise Role & Primary Responsibilities | Core System Interaction Mode |
|---|---|---|---|
| **PERS-01** | **Medical Information Specialist** | Formulates evidence-grounded responses to complex Medical Information Requests (MIR). | Initiates MIR agent workflow; reviews evidence citations; signs off on final output. |
| **PERS-02** | **Commercial MLR Reviewer** | Conducts Medical, Legal, and Regulatory review of promotional materials and sales assets. | Reviews AI claims-check analysis; validates mandatory fair balance language; approves releases. |
| **PERS-03** | **Pharmacovigilance (PV) Safety Officer** | Screens incoming communications for Adverse Events (AEs) and Product Quality Complaints (PQCs). | Receives automated safety triage escalations; verifies Argus safety case intake packages. |
| **PERS-04** | **Regulatory Affairs Specialist** | Prepares country-specific labeling briefs, IND updates, and global dossier responses. | Executes multi-agent scientific synthesis against approved Core Data Sheets (CDS). |

---

# 3. High-Level Functional Capabilities & System Epics

### 📐 Visual Diagram 1: High-Level End-to-End Functional Architecture Flow (Template 02)
\`\`\`mermaid
graph TD
    USER["👤 Accountable Human User (Medical / Regulatory / PV)"] --> INGRESS["🛡️ Cloud Armor WAF + Google API Gateway (VPC-SC Perimeter)"]
    INGRESS --> ORCH["⚙️ Agent Orchestrator & ReAct Reasoning Engine (GKE Pod)"]
    
    ORCH <--> PLANNER["📋 Planner Agent (Task Graph Decomposition)"]
    ORCH <--> RETRIEVAL["🔍 Hybrid RAG Engine (GCS Data Lake + Vertex Vector Search)"]
    ORCH <--> SAFETY["🛡️ Pharmacovigilance AE Real-Time Screener"]
    
    RETRIEVAL --> CITATION["📌 Claim-Level Evidence Citation & Fair Balance Audit"]
    CITATION --> HITL["👤 Mandatory Human-in-the-Loop (HITL) Governance Board Gate"]
    
    HITL --> TOOL["🔌 Governed Tool Gateway (Idempotency Key & Action Preview)"]
    TOOL --> SYSTEMS["☁️ Systems of Record (Veeva Vault / Salesforce CRM / Argus Safety)"]
    
    ALL["All System Events"] --> AUDIT["🗄️ Immutable Audit Service (SHA-256 Chain + OpenTelemetry)"]
\`\`\`

---

# 4. Functional System Requirements

### 4.1 Enterprise Knowledge & Access-Aware Hybrid RAG
* **REQ-RAG-001:** The system MUST enforce access-aware document retrieval where users and agents only retrieve content matching the user's explicit Entitlement Groups and Attribute-Based Access Control (ABAC) claims.
* **REQ-RAG-002:** Every material factual statement generated by an agent MUST include a clickable citation resolving to an approved, version-controlled source document (Core Data Sheet, Approved PI, or Final CSR).
* **REQ-RAG-003:** The platform MUST score document relevance using a hybrid dense-sparse vector scoring formula combining semantic cosine similarity with BM25 keyword matching.

### 4.2 ReAct Agent Cognitive Reasoning Engine
* **REQ-AGENT-001:** Specialized domain agents MUST execute within a deterministic ReAct (\`Thought\` ➔ \`Action\` ➔ \`Observation\` ➔ \`Synthesis\`) cognitive reasoning loop with strict loop budgets (\`max_iterations = 6\`).
* **REQ-AGENT-002:** All agent model invocations MUST pass through a centralized Model Gateway that enforces token quotas, processing region compliance, and cost-aware fallback routing.

### 4.3 Human-in-the-Loop Governance & Segregation of Duties
* **REQ-HITL-001:** Any workflow affecting external communications, patient safety assessments, or regulatory commitments MUST halt at a mandatory HITL Governance Board Gate.
* **REQ-HITL-002:** High-risk write actions dispatched to external enterprise systems MUST display an explicit **Action Preview** payload and require electronic signature sign-off compliant with FDA 21 CFR Part 11.

---

# 5. Non-Functional, Security & Governance Requirements

| Category | Requirement ID | Executive Requirement Specification | Verification Target |
|---|---|---|---|
| **Security** | **NFR-SEC-001** | Zero-trust Google Cloud VPC Service Controls (VPC-SC) perimeter isolating compute and storage. | Zero unauthorized ingress/egress. |
| **Privacy** | **NFR-PRIV-001** | Automated PII/PHI detection and token masking prior to LLM context assembly. | 100% compliance with HIPAA/GDPR. |
| **Reliability** | **NFR-REL-001** | Multi-zone GKE deployment with persistent state recovery and idempotent tool transactions. | 99.95% System Availability. |
| **Audit** | **NFR-AUD-001** | Complete cryptographic SHA-256 immutable event trail of user requests, LLM prompts, tool calls, and human approvals. | Inspection-ready audit export. |

---

# 6. Approved Document Sign-Off

| Reviewer Role | Executive Sign-Off Name | Approval Status | Timestamp |
|---|---|---|---|
| **Product Owner** | Dr. Elena Vance | ✅ **APPROVED** | August 2, 2026 |
| **Business Sponsor** | Dr. Marcus Vance | ✅ **APPROVED** | August 2, 2026 |
| **Technical Owner** | Nitin Aggarwal | ✅ **APPROVED** | August 2, 2026 |
| **Quality & Regulatory Lead** | Sarah Chen, JD | ✅ **APPROVED** | August 2, 2026 |
`,

  sdd: `# System Design Document (SDD / HLD)

## Enterprise Architecture Platform — Bio-Pharma Cognitive Hub & High-Availability Infrastructure

**Document ID:** SDD-BIO-2026-001  
**Document Version:** v1.0 (Technical & Infrastructure Architecture Review Ready)  
**Document Status:** Approved — Engineering, DevSecOps & Regulatory Sign-Off  
**Principal AI Systems Architect:** Nitin Aggarwal  
**Cloud Infrastructure & SRE Lead:** David K. Thorne  
**Cybersecurity & VPC-SC Lead:** Robert Sterling, CISSP  
**Principal Data Architect:** Ananya Ramanathan  
**Validation & Quality Director:** Dr. Aris Thorne, MD  
**Target Release:** Release 1 Production Pilot (Q3 2026)  
**Confidentiality:** Confidential — Enterprise Architecture Review Board Repository  

---

# 1. Document Purpose & Architectural Principles

This System Design Document (SDD) defines the technical and infrastructure architecture of the **Enterprise Architecture Platform**. The architecture adheres to five core engineering tenets:
1. **Zero-Trust VPC Perimeter:** All compute and data services reside within strict VPC Service Controls with no public internet ingress.
2. **Access-Aware Retrieval (ABAC):** Context retrieval strictly bounds document chunks to user entitlement claims.
3. **Cryptographic Idempotency:** Every tool invocation requires unique UUIDv4 tokens and pre-commit state snapshots.
4. **Deterministic Cognitive Loop:** ReAct agent iterations enforce hard timeout budgets (< 30s) and token limits (< 128k).
5. **Multi-Region Disaster Recovery:** Active-active multi-zone GKE clusters with automated cross-region Spanner replication.

---

# 2. Multi-Tier Cloud Deployment Architecture

### 📐 Visual Diagram 1: Multi-Tier Cloud Physical Deployment & Container Compute Topology (Template 08 & 16)
\`\`\`mermaid
graph TD
    subgraph ZONE_PUBLIC["🌐 Public Ingress & Edge Protection Zone"]
        CLIENT["💻 Web Workspace Client / Mobile / Portal"]
        WAF["🛡️ External HTTPS Load Balancer + Cloud Armor WAF"]
        GW["🔐 Google API Gateway (OAuth2 / OIDC & Rate Limiting)"]
        CLIENT -->|"HTTPS / TLS 1.3"| WAF
        WAF -->|"WAF Filtered Egress"| GW
    end

    subgraph ZONE_VPCSC["🔒 Protected VPC Service Control (VPC-SC) Perimeter"]
        subgraph TIER_COMPUTE["⚡ Compute & Cognitive Reasoning Tier (Private Subnet)"]
            GW -->|"Internal mTLS"| GKE["⚙️ Agent Orchestrator Pods (GKE Cluster)"]
            GKE <--> PROMPT["📜 Integrated System Prompt Registry"]
            GKE <--> MEMORY["🧠 Conversation & Workflow Memory Manager"]
            GKE <--> GEMINI["🤖 Gemini LLM Reasoner Engine (ReAct Loop)"]
        end

        subgraph TIER_DATA["🛢️ Enterprise Data & Feature Engineering Tier"]
            GKE -->|"IAM Scoped Access"| GCS["🪣 GCS Secure Bucket (Raw Data Lake)"]
            GKE -->|"Analytical Query"| BQ["📊 BigQuery Data Warehouse"]
            GCS -->|"Transformation"| DBT["🛢️ dbt Pipeline"]
            DBT --> STORE["🗃️ Managed Feature Store"]
            STORE --> GKE
        end

        subgraph TIER_GOVERNANCE["🛡️ AI Lifecycle, Evaluation & Governance Tier"]
            GKE --> VETTING["🔍 Data Vetting Gateway"]
            VETTING --> HIL["🛡️👤 Unified Governance Board (HITL Gate)"]
            HIL -->|"APPROVED"| CANARY["🐤 Canary Deployment Stage (5% Traffic)"]
            CANARY --> PROMOTE["🚀 Production Promotion (100% Traffic)"]
            GKE --> DRIFT["📈 Continuous Observability & Drift Monitoring"]
            DRIFT --> ARCHIVE["🗄️ Model & Prompt Archival Registry"]
        end
    end
\`\`\`

---

# 3. Zero-Trust Network Architecture & Security Perimeter

### 📐 Visual Diagram 2: Dedicated Network Topology & Perimeter Security (Template 15)
\`\`\`mermaid
graph LR
    subgraph EXTERNAL["🌐 External Users"]
        USER["👤 Authorized Medical Specialist"]
    end

    subgraph EDGE["🛡️ Google Cloud Edge Ingress"]
        LB["External HTTPS Load Balancer"]
        WAF["Cloud Armor WAF (OWASP Top 10 + DDoS)"]
        APIGW["Google API Gateway"]
        USER -->|"TLS 1.3 / mTLS"| LB
        LB --> WAF
        WAF --> APIGW
    end

    subgraph PERIMETER["🔒 Cryptographic VPC Service Control (VPC-SC) Perimeter"]
        GKE_POD["⚙️ GKE Private Application Subnet"]
        KMS["🗝️ Google Cloud KMS (Customer-Managed Keys)"]
        GCS_DATA["🪣 GCS Raw Data Lake (CMEK Encrypted)"]
        BQ_DATA["📊 BigQuery Data Warehouse (CMEK Encrypted)"]

        APIGW -->|"Private Service Connect (PSC)"| GKE_POD
        GKE_POD <-->|"mTLS Istio Mesh"| KMS
        GKE_POD -->|"VPC Egress Restricted"| GCS_DATA
        GKE_POD -->|"VPC Egress Restricted"| BQ_DATA
    end
\`\`\`

---

# 4. Agent Cognitive Runtime & Context Assembly

| Stage | Cognitive Module | Technical Execution Specification | Boundary Constraints |
|---|---|---|---|
| **1. Ingest** | Prompt Normalizer | Tokenizes user prompt, scrubs PII/PHI via Google DLP API | Max 4k input tokens |
| **2. Retrieve** | Vertex Vector Search | Performs ScaNN approximate nearest neighbor hybrid search | Top-k = 15 chunks |
| **3. Rank** | Re-Ranking Engine | Cross-encoder cross-attention scoring against approved CDS | Score threshold > 0.82 |
| **4. Assemble** | Context Window Assembler | Synthesizes bounded system prompt, citations, tool schemas | Max 128k context |
| **5. Reason** | Gemini Reasoner | Executes step-by-step ReAct loop with citation binding | Max iterations = 6 |

---

# 5. High-Availability & Multi-Region DR Strategy

* **Active-Active Deployment:** Primary Region \`us-central1\` (Iowa), Secondary Region \`us-east4\` (Virginia).
* **Recovery Point Objective (RPO):** 0 seconds (Synchronous Spanner cross-region Paxos consensus).
* **Recovery Time Objective (RTO):** < 15 minutes automated DNS Anycast health probe failover.

---

# 6. Architecture Review Board (ARB) Sign-Off

| Reviewer Role | Name & Title | Approval Status | Signature Stamp | Date |
|---|---|---|---|---|
| **Chief Systems Architect** | Nitin Aggarwal | ✅ **APPROVED** | \`SIG_ARB_99014_VERIFIED\` | August 2, 2026 |
| **Lead Cloud SRE** | David K. Thorne | ✅ **APPROVED** | \`SIG_SRE_88192_VERIFIED\` | August 2, 2026 |
| **Enterprise Security Lead** | Robert Sterling, CISSP | ✅ **APPROVED** | \`SIG_SEC_77012_VERIFIED\` | August 2, 2026 |
`,

  fdd: `# Functional Design Document (FDD)

## Enterprise Architecture Platform — Functional Specifications & Workflow Sequence

**Document ID:** FDD-BIO-2026-001  
**Document Status:** Approved — GxP & Functional Architecture Sign-Off  
**Functional Systems Architect:** Nitin Aggarwal  
**Quality & Compliance Lead:** Sarah Chen, JD  
**Target Release:** Release 1 Controlled Production Pilot (Q3 2026)  

---

# 1. End-to-End Functional Interaction Flow

### 📐 Visual Diagram 1: Multi-Service Interaction Sequence Flow (Template 11)
\`\`\`mermaid
graph TD
    INTAKE["📥 User Objective Intake"] --> PLANNER["📋 Planner Agent (Task Graph Decomposition)"]
    
    PLANNER --> RETRIEVAL["🔍 Retrieval Agent (Access-Aware Search)"]
    PLANNER --> DOMAIN["🧬 Domain Specialist Agents (Medical / Regulatory Synthesis)"]
    PLANNER --> SAFETY["🛡️ Safety & PV Detector Agent (Real-Time AE Screening)"]
    PLANNER --> COMPLIANCE["📋 Compliance & Policy Agent (FDA Label & Fair Balance)"]

    RETRIEVAL --> EVAL["📌 Evidence-Assessment Agent (Claim-Level Citations)"]
    DOMAIN --> QC["🎯 Quality-Control Agent (NLI Claim Verification)"]

    QC --> HITL["🛡️👤 Human-Review Coordinator (Unified Governance Board Gate)"]
    HITL --> ACTION["🔌 Action Agent (Idempotent System Commit)"]
\`\`\`

---

# 2. User Roles & Permission Matrix

| Role Identifier | Functional Role | Access Entitlements | Approval Authority |
|---|---|---|---|
| **ROLE-MED-01** | Medical Information Specialist | Read CDS, Approved CSRs; Create Draft MIR | Single-Signer MIR Response |
| **ROLE-MLR-02** | Commercial Legal Reviewer | Read Promotional Claims; Annotate Assets | Dual-Signer MLR Release |
| **ROLE-PV-03** | Safety & Pharmacovigilance Officer | Read AE Intake; Access Argus Safety Hub | FDA MedWatch Filing |
| **ROLE-ADMIN-04** | System Administrator | Manage Prompt Registry; Audit Log Review | Configuration Changes |

---

# 3. Domain Entity Relationship Diagram (ERD)

### 📐 Visual Diagram 2: Domain Entity Model (Template 14)
\`\`\`mermaid
erDiagram
    TENANT ||--o{ USER_ACCOUNT : contains
    USER_ACCOUNT ||--o{ WORKFLOW_SESSION : initiates
    WORKFLOW_SESSION ||--o{ AGENT_STEP : executes
    AGENT_STEP ||--o{ CITATION_RECORD : binds
    WORKFLOW_SESSION ||--o{ HITL_APPROVAL : requires
    HITL_APPROVAL ||--|| AUDIT_RECORD : commits
\`\`\`

---

# 4. Functional Traceability & Sign-Off

| Requirement ID | Module Mapping | Validation Test Case | Status |
|---|---|---|:---:|
| **REQ-RAG-001** | \`retrieval_agent.py\` | \`test_access_aware_abac_filter()\` | ✅ VERIFIED |
| **REQ-AGENT-001** | \`react_orchestrator.go\` | \`test_max_iterations_budget()\` | ✅ VERIFIED |
| **REQ-HITL-001** | \`governance_gate.ts\` | \`test_dual_custody_signature()\` | ✅ VERIFIED |
`,

  tdd: `# Technical Design Document (TDD / LLD)

## Enterprise Architecture Platform — Low-Level Engineering & Database Specifications

**Document ID:** TDD-BIO-2026-001  
**Document Status:** Approved — Engineering Lead Sign-Off  
**Principal AI Systems Architect:** Nitin Aggarwal  
**Target Release:** Release 1 Production Pilot (Q3 2026)  

---

# 1. Monorepo Service Topology & Microservices

### 📐 Visual Diagram 1: Micro-Level API Interaction Sequence & Latency Budgets (Template 11 & 20)
\`\`\`mermaid
graph TD
    GATEWAY["🚪 Google API Gateway (< 5ms)"] --> ORCHESTRATOR["⚙️ Agent Orchestrator Pod (< 20ms)"]
    ORCHESTRATOR --> REACT["🧠 ReAct Cognitive Loop Engine (< 1.2s)"]
    REACT --> TOOL_GW["🔌 Governed Tool Gateway (< 15ms)"]
    TOOL_GW --> AUDIT_DB["🗄️ Immutable Audit Store (Spanner / SHA-256)"]
\`\`\`

---

# 2. Database Schema & Index Specifications

\`\`\`sql
CREATE TABLE workflow_sessions (
    session_id STRING(36) NOT NULL,
    tenant_id STRING(36) NOT NULL,
    user_id STRING(64) NOT NULL,
    session_state STRING(32) NOT NULL,
    created_at TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp = true),
    updated_at TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp = true),
    state_payload JSON,
    sha256_hash BYTES(32) NOT NULL
) PRIMARY KEY (tenant_id, session_id);

CREATE INDEX idx_sessions_user ON workflow_sessions(user_id, created_at DESC);
\`\`\`

---

# 3. CI/CD Pipeline & Automated SAST/DAST Gates

* **Stage 1 (Lint & Typecheck):** \`npx tsc --noEmit && golangci-lint run\` (Zero tolerance).
* **Stage 2 (Unit & Contract Tests):** Jest & Go unit suite (> 90% code coverage).
* **Stage 3 (Security Scan):** Semgrep SAST, Snyk container vulnerability scan, Trivy SBOM check.
* **Stage 4 (Canary Promotion):** Automatic 5% canary deployment in GKE; 24h error budget monitoring before 100% promotion.
`,

  exec_brief: `# Executive Architecture Brief (EAB)

## Enterprise Architecture Platform — Executive C-Suite Strategic Architecture Brief

**Document ID:** EAB-BIO-2026-001  
**Document Status:** Approved — Executive Steering Committee Sign-Off  
**Executive Sponsor:** Dr. Marcus Vance  
**Target Audience:** CIO, CTO, Board of Directors, Enterprise Investment Committee  

---

# 1. Strategic Pillars & Competitive Differentiation

### 📐 Visual Diagram 1: Eight-Layer Enterprise Governed Agentic AI Architecture Blueprint (Template 01 & 04)
\`\`\`mermaid
graph TD
    L1["1. Executive Portal Experience"] --> L2["2. Zero-Trust Identity & ABAC"]
    L2 --> L3["3. Agentic Workflow Orchestration (GKE)"]
    L3 --> L4["4. Access-Aware Hybrid Vector RAG"]
    L4 --> L5["5. Model Gateway & Governance (Gemini 3.7 Flash)"]
    L5 --> L6["6. Human-in-the-Loop Governance Board"]
    L6 --> L7["7. Governed Tool Execution Gateway"]
    L7 --> L8["8. Immutable Cryptographic Audit Ledger"]
\`\`\`

---

# 2. Executive Capital Allocation & ROI Milestones

* **Phase 1 (Months 1–3):** Foundation Setup — VPC-SC perimeter, Spanner data lake, core Model Gateway.
* **Phase 2 (Months 4–6):** Pilot Deployment — 100 Medical Affairs specialists; target 85% cycle time reduction.
* **Phase 3 (Months 7–12):** Global Scaling — Enterprise rollout across 4 therapeutic areas; $4.2M net annual ROI.
`,

  threat_model: `# STRIDE Threat Model & Security Assessment

## Enterprise Architecture Platform — Zero-Trust Security Threat Model

**Document ID:** SEC-BIO-2026-001  
**Document Status:** Approved — Chief Information Security Officer (CISO) Sign-Off  
**Security Architect:** Robert Sterling, CISSP  
**Target Release:** Release 1 Production Pilot (Q3 2026)  

---

# 1. Trust Boundaries & Attack Vector Topology

### 📐 Visual Diagram 1: Threat Attack Vectors & Security Boundaries (Template 18 & 27)
\`\`\`mermaid
graph LR
    subgraph PUBLIC["Untrusted Zone"]
        ATTACKER["🦹 External Threat Actor"]
    end
    
    subgraph DMZ["DMZ Perimeter"]
        WAF["🛡️ Cloud Armor WAF"]
        APIGW["Google API Gateway"]
    end
    
    subgraph PRIVATE["Isolated VPC-SC Core"]
        COMPUTE["⚙️ GKE Reasoner Pods"]
        VAULT["🗝️ Cloud KMS & HSM"]
        DATA["🗄️ Spanner & GCS Data Lake"]
    end
    
    ATTACKER -.->|"DDoS / SQLi Blocked"| WAF
    WAF --> APIGW
    APIGW -->|"mTLS + IAM Validated"| COMPUTE
    COMPUTE <-->|"Encrypted CMEK"| DATA
    COMPUTE <-->|"Hardware Attested"| VAULT
\`\`\`

---

# 2. STRIDE Threat Vector Assessment & Mitigations

| STRIDE Category | Identified Threat Vector | Impact Severity | Compensating Security Control |
|---|---|:---:|---|
| **Spoofing** | Compromised user credentials attempting unauthorized API access | **Critical** | Phishing-resistant FIDO2 MFA & OAuth2 OIDC claims verification |
| **Tampering** | Prompt injection attacks manipulating agent decision logic | **High** | Dual-pass NeMo Guardrails & input schema sanitizer |
| **Repudiation** | User denies authorizing a high-risk external tool dispatch | **High** | Cryptographic SHA-256 digital signature stored in WORM audit store |
| **Information Disclosure** | Unauthorized retrieval of clinical trial records across tenants | **Critical** | Access-Aware ABAC vector filtering inside VPC-SC perimeter |
| **Denial of Service** | Resource starvation via high-frequency API flood | **Medium** | Cloud Armor adaptive rate-limiting & Cloudflare DDoS mitigation |
| **Elevation of Privilege** | Agent attempting unauthorized database write escalation | **Critical** | Governed Tool Gateway with read-only default IAM service accounts |
`,

  api_spec: `# API & Service Interface Specification

## Enterprise Architecture Platform — Enterprise API Contracts & OpenAPI Specifications

**Document ID:** API-BIO-2026-001  
**Document Status:** Approved — Integration Architecture Sign-Off  
**Lead Integration Architect:** Nitin Aggarwal  

---

# 1. API Protocol & Architecture Topology

### 📐 Visual Diagram 1: API Gateway & Service Mesh Interaction (Template 08 & 45)
\`\`\`mermaid
graph TD
    CLIENT["🌐 Enterprise Consumer Client"] -->|"HTTPS / REST (OpenAPI 3.1)"| GW["🚪 Google Cloud API Gateway"]
    GW -->|"gRPC / Protobuf v3"| ORCH["⚙️ Agent Orchestrator Service"]
    ORCH -->|"gRPC / mTLS"| VECTOR["🔍 Vector Search Service"]
    ORCH -->|"REST / Webhook"| EXTERNAL["☁️ Veeva Vault / Salesforce API"]
\`\`\`

---

# 2. Core Endpoint Specifications

### \`POST /api/v1/workflows/reason\`
* **Description:** Initiates asynchronous ReAct cognitive reasoning loop for a complex scientific inquiry.
* **Headers:** \`Authorization: Bearer <jwt>\`, \`X-Idempotency-Key: <uuidv4>\`, \`X-Tenant-ID: <string>\`.
* **Request Payload:**
\`\`\`json
{
  "objective": "Generate evidence-grounded MIR response for drug efficacy in Phase 3 clinical trial.",
  "domain": "biopharma",
  "entitlementGroups": ["MED_AFFAIRS_TIER2", "ONCOLOGY_SPECIALIST"],
  "maxIterations": 6
}
\`\`\`
* **Response Payload (200 OK):**
\`\`\`json
{
  "sessionId": "sess_882910_a1b2",
  "status": "COMPLETED",
  "resultText": "Based on the approved Phase 3 CSR (Doc ID: CSR-ONC-2024)...",
  "citations": [
    { "docId": "CSR-ONC-2024", "chunkId": "chk_812", "confidenceScore": 0.94 }
  ],
  "auditHash": "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
}
\`\`\`
`,

  security_package: `# Enterprise Security & Compliance Package (GRC)

## Enterprise Architecture Platform — Regulatory & Compliance Attestation Package

**Document ID:** GRC-BIO-2026-001  
**Document Status:** Approved — Global Compliance & Quality Assurance Sign-Off  
**Compliance Officer:** Sarah Chen, JD  

---

# 1. Regulatory Framework & Certification Matrix

| Regulatory Standard | Governing Body | Verification Scope | Audit Status |
|---|---|---|:---:|
| **FDA 21 CFR Part 11** | US FDA | Electronic records, digital signatures, immutable audit logs | ✅ **CERTIFIED** |
| **HIPAA Security Rule** | US HHS | Protected Health Information (PHI) encryption at rest & in transit | ✅ **CERTIFIED** |
| **GDPR / EU Data Act** | European Union | Data residency, right to explanation, sovereign encryption keys | ✅ **CERTIFIED** |
| **SOC 2 Type II** | AICPA | Security, Availability, and Confidentiality trust service criteria | ✅ **CERTIFIED** |
| **GxP / CSV Standards** | Global Health Authorities | Computer System Validation (IQ/OQ/PQ testing protocols) | ✅ **CERTIFIED** |

---

# 2. Immutable Cryptographic Audit & Compliance Architecture

\`\`\`mermaid
graph LR
    EVENT["⚡ System Event Trigger"] --> DLP["🛡️ Cloud DLP Sensitive Data Scrubber"]
    DLP --> CANONICAL["📄 Canonical Audit Log Envelope"]
    CANONICAL --> SIGNER["🗝️ Cloud KMS Hardware Security Signer (HSM)"]
    SIGNER --> SPANNER["🗄️ Google Cloud Spanner (WORM Immutable Storage)"]
    SPANNER --> DASHBOARD["📊 Continuous Compliance Auditor Dashboard"]
\`\`\`
`,
};
