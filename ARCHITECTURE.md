# PromptCanvas — System Architecture & Technical Topology

Welcome to the **PromptCanvas** Architecture Specification. This document outlines the end-to-end system design, subsystem topology, compilation pipelines, validation engines, and data flow models for AI agents and enterprise developers.

---

## 1. System Overview

**PromptCanvas** is an enterprise-grade AI diagramming platform built on **Next.js 16 (App Router)** and **React 19**. It compiles natural language prompts, domain requirements, and reference models into production-certified **Draw.io XML (`<mxfile>`)** diagrams, high-resolution vector assets, and structured system documentation.

### Core Architectural Responsibilities
1. **Prompt-to-Architecture Compilation**: Ingests unstructured enterprise text or structured intents and synthesizes complete, multi-tiered architectures using Gemini 2.5 / 3.7.
2. **First-Principles XML & Geometric Synthesis**: Generates mathematically sound Draw.io XML graphs with strict 16:9 ultra-wide viewport containment, AABB collision auto-healing, and zero external icon CDN dependencies.
3. **Multi-Vendor Vector Icon Integration**: Inlines authentic Google Cloud and SAP vector SVGs as RFC 2397 `data:image/svg+xml` URIs directly inside diagram nodes.
4. **Autonomous Closed-Loop Quality Certification**: Enforces a 4-Phase Quality Validator (`evaluateStudio3Quality`) ensuring 0 spatial collisions, 100% viewport containment, and full XML schema validity before canvas streaming.
5. **Dual-Engine Persistence**: Local-first development via SQLite (`dev.db`) with seamless PostgreSQL production synchronization.

---

## 2. High-Level Subsystem Topology

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER                                         │
│  Next.js 16 App Router (React 19) · Studio 3 Workspace · Full-Page Deep Links (/studio3) │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ REST / JSON-RPC / SSE
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 API ROUTE CONTROLLERS                                  │
│  /api/generate · /api/diagrams · /api/export · /api/quality · /api/templates           │
└─────────────────────┬─────────────────────┬────────────────────┬───────────────────────┘
                      │                     │                    │
                      ▼                     ▼                    ▼
┌──────────────────────────┐ ┌─────────────────────────┐ ┌───────────────────────────────┐
│     PROMPT COMPILER      │ │  CANONICAL MASTER ENGINE│ │    PERSISTENCE & LINEAGE      │
│  • Gemini 2.5 / 3.7 LLM  │ │  • Blueprints 01 - 37   │ │  • Dual SQLite / PostgreSQL   │
│  • Taxonomy Classification│ │  • Domain Flavoring     │ │  • Deep-link UUID routing    │
│  • Few-Shot Grounding    │ │  • 16:9 Master Geometry │ │  • Version History Lineage    │
└─────────────┬────────────┘ └──────────────┬──────────┘ └───────────────┬───────────────┘
              │                             │                            │
              └──────────────────────┬──────┴────────────────────────────┘
                                     │ Raw XML Model
                                     ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PREFLIGHT AUDIT & SELF-HEALING ENGINE                           │
│  1. Zero-Mutation Canonical Guard  2. 2D AABB Collision Auto-Healing (30px safe margin)│
│  3. 16:9 Viewport Bound Enforcer   4. XML Schema & Entity Escaping Sanitizer           │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ Certified XML
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                           EMBEDDED VIEWER & EXPORT RUNTIME                             │
│  • viewer-static.min.js (Iframe)   • Headless Chrome PNG Renderer   • PPTX / DOCX Exporter│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Subsystem Breakdown & Directory Map

### 3.1 Prompt Compiler (`src/lib/diagramCompiler.ts`, `prompts/`)
- **Intent Extraction**: Dissects user prompts into primary domain entities, cloud tiers, data ingress pipelines, compute microservices, and external systems of record.
- **Architectural Archetype Routing**: Maps prompt intent into one of five standard diagram classes:
  - `conceptual_diagram` (High-level business capability & boundary level)
  - `logical_architecture` (Functional microservices, buses, and orchestration)
  - `technical_infrastructure` (VPC subnets, CIDRs, PSC endpoints, mTLS, HA)
  - `erd` (Dimensional fact/dimension tables, vector stores, cardinality)
  - `sequence_diagram` (Step-ordered lifecycle flows, enclaves, activation loops)

### 3.2 Master Blueprint Catalog (`src/lib/canonical/`, `templates/`)
- Contains ground-truth reference architectures matching production blueprints (`images/01.png` to `images/37.png`).
- **Zero-Mutation Preflight Passthrough**: The engine automatically detects canonical master templates (`archType.startsWith('canonical')`, `NOVACURA`, `template_0`) and passes them through preflight filters with **zero geometric or coordinate mutation**.
- **Domain Flavoring**: Re-flavors titles, descriptions, and metric badges across financial, healthcare, supply chain, and retail domains without altering the master 2D geometry.

### 3.3 Vector Icon Architecture (`src/lib/gcpIcons.ts`, `src/lib/sapIcons.ts`)
- **Strict Prohibition**: Never calls external icon CDNs (e.g. `api.iconify.design`), which fail in air-gapped or sandboxed environments.
- **RFC 2397 Data URI Embedding**: Embeds authentic Google Cloud and SAP vector SVGs as base64 or URI-encoded strings directly inside the Draw.io node style:
  ```text
  shape=image;image=data:image/svg+xml,...;imageWidth=24;imageHeight=24;imageAlign=left;spacingLeft=40;
  ```

### 3.4 Preflight Audit & Self-Healing Engine (`src/lib/preflightAuditEngine.ts`)
Executes 4 deterministic validation gates on all generated XML:
1. **XML Schema Integrity**: Enforces valid `<mxfile host="embed.diagrams.net"><diagram><mxGraphModel>` document envelopes.
2. **2D Bounding Box Collision Healing**: Calculates Axis-Aligned Bounding Box (AABB) intersections. Intersecting nodes are automatically pushed rightward (for same-tier elements) or downward (for vertical flows) with a $30\text{px}$ safety margin.
3. **High-Contrast Pill Badging**: Wraps connector labels touching borders in solid white/contrast pills (`labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;fontSize=8;fontStyle=1;`).
4. **Point-to-Point Straightness**: Eliminates awkward $90^\circ$ stepped connector jogs across narrow channels by locking matching entry/exit coordinates ($Y_{\text{exit}} = Y_{\text{entry}}$).

### 3.5 Persistence & Database Engine (`src/lib/db.ts`)
- **Dual-Engine Architecture**:
  - Local Dev: Embedded SQLite (`dev.db`).
  - Production: Managed PostgreSQL via connection pools (`pg`).
- **Schema Lineage**: Persists diagram versions, chat conversation turns, and architectural taxonomy tags with immutable UUIDs (`/studio3?id=<uuid>`).

---

## 4. The 3-Tier Architectural Hierarchy & Conceptual 4-Flow Taxonomy

PromptCanvas strictly enforces the separation of architectural abstractions:

### 1. Conceptual Tier (Rule 22: Capability & Boundary Level)
- Operates strictly at the capability and boundary level, stripping away infrastructure mechanics (no VPCs, CIDRs, session cookies, web servers, or code packages) to highlight business value, intent, and domain relationships.
- Structured around the **4 Canonical Conceptual Flows**:
  1. **User Journey Flow (Experience Flow)**: High-level persona interaction and primary ingress entry points.
  2. **Business Process Flow (Value Stream)**: End-to-end business capability coordination, domain events, and milestones.
  3. **Domain Data Flow**: Macroscopic information movement across bounded contexts (e.g., Raw ERP Data ➔ Semantic Layer ➔ Analytical Lakehouse ➔ Real-Time Context).
  4. **Enterprise Integration Flow**: Coarse-grained boundary handoffs to external third parties, legacy ERPs, or partner ecosystems (A2A, MCP, REST).

### 2. Logical Tier
- Functional microservice decomposition, component contracts, event streams, orchestration engines, and operational state transitions.

### 3. Technical & Infrastructure Tier (Rule 19)
- Physical and cloud infrastructure: explicit VPC subnets, CIDR allocations (`10.128.0.0/16`), security perimeters (VPC-SC), private transit endpoints (PSC, Direct Egress), transport protocols (`gRPC over mTLS`, `JSON-RPC`), exact container runtimes (Cloud Run, GKE Autopilot), and Multi-AZ High Availability System Replication (HSR).

---

## 5. Directory Organization

```text
PromptCanvas/
├── AGENTS.md                  # Layer 1: Inviolable rules & architectural laws (Turn 0)
├── ARCHITECTURE.md            # Layer 2: System topology, compiler pipelines, data flows
├── SECURITY.md                # Layer 2: Threat model, SVG XSS, auth, workstation safety
├── RUNBOOK.md                 # Layer 2: Operational commands, ports, E2E headless testing
├── .agents/skills/            # Layer 3: Executable project skills (11 registered suites)
│   ├── ai-prompt-evals/       # LLM prompt compiler accuracy benchmarks
│   ├── visual-regression-testing/ # Headless Puppeteer pixel diff tests
│   ├── cross-viewport-auditor/# Multi-breakpoint scaling verification
│   ├── database-schema-guard/ # SQLite <-> Postgres type compatibility
│   └── security-code-scanner/ # Static SVG XSS & secret leak scanning
├── src/
│   ├── app/                   # Next.js 16 App Router pages & API routes
│   └── lib/                   # Core engine, validators, DB, icons, canonical blueprints
│       ├── canonical/         # Canonical blueprint implementations (01 - 37)
│       ├── gcpIcons.ts        # Official Google Cloud vector SVG catalog
│       ├── sapIcons.ts        # Official SAP Ecosystem vector SVG catalog
│       ├── db.ts              # SQLite / PostgreSQL dual-engine database layer
│       ├── diagramCompiler.ts # Draw.io XML generator & compiler
│       └── preflightAuditEngine.ts # 4-Phase Quality Validator & AABB auto-healer
├── diagrams/                  # Version-controlled production XML & PNG deliverables
├── scripts/                   # Headless E2E runners, catalog QA suites, generator scripts
└── scratch/                   # Ephemeral screenshots & diagnostic logs (gitignored)
```
