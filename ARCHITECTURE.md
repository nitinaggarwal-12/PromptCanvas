# PromptCanvas — System Architecture & Technical Topology (`v3.3.0`)

Welcome to the **PromptCanvas** Architecture Specification. This document outlines the end-to-end system design, 5-Tier Google/Gemini/DeepMind model stack, subsystem topology, clause-driven compilation pipelines, validation engines, and data flow models for AI agents and enterprise developers.

---

## 1. System Overview

**PromptCanvas** is an enterprise-grade AI diagramming and living specifications platform built on **Next.js 16 (App Router)** and **React 19**. It compiles natural language prompts, raster architecture diagrams, domain requirements, and reference models into production-certified **Draw.io XML (`<mxfile>`)** diagrams, high-resolution vector assets, and **16 synchronized Living Specifications**.

### Core Architectural Responsibilities
1. **Prompt-to-Architecture Compilation (5-Tier Model Stack)**: Ingests unstructured enterprise text or structured intents and synthesizes complete, multi-tiered architectures using the Canonical 5-Tier Google / Gemini / DeepMind Model Stack (`google-omni-1.1`, `gemini-3.1-pro-preview`, `gemini-3.8-flash`, `gemini-3.1-flash-live-preview`, `veo-3.1-generate-preview`, `lyria-3.5`, `gemini-3.1-flash-image-preview`, `gemini-3.1-flash-tts-preview`, `text-embedding-005`) centralized in `src/lib/geminiConfig.ts`.
2. **Dynamic Clause-Driven Synthesis & Word-Safe Wrapping**: Extracts 4+ domain clauses (`extractPromptDomainClauses`) and populates multi-tier Google Cloud architecture cards (`adaptSavedGoogleCloudTemplateToPrompt`) and sequential swimlane flowcharts (`generateLogicalFlowchartDrawioXml`) with word-safe two-line wrapping (`formatTwoLineCardClause`) in `src/lib/promptDrivenDiagramSynthesizer.ts`.
3. **2-Stage Vision Image-to-Draw.io XML Decompilation**: Converts uploaded raster architecture diagrams (PNG/JPG/WebP) into editable Draw.io XML with 100% verbatim text parity (`src/lib/deepmindVisionDecompiler.ts` & `/api/decompile-image`).
4. **16 Synchronized Living Specifications**: Automatically compiles 16 architecture documents (PRD, SRS, HLD, LLD, API Contracts, Security & Threat Model, SRE Runbook, FinOps & TCO, etc.) with dynamic domain entities and protocols (`src/lib/spec/livingSpecsGenerator.ts`).
5. **Autonomous Closed-Loop Quality Certification**: Enforces the 11-Gate Master Omni 1.1 Quality Suite (`scripts/runQualityGate.ts`) and 28-Workflow End-to-End Forensic Audit (`scratch/run_e2e_28_workflows_audit.ts`) ensuring 0 spatial collisions, 100% viewport containment, and full XML schema validity.
6. **Dual-Engine Persistence**: Local-first development via SQLite (`dev.db`) with seamless PostgreSQL production synchronization.

---

## 2. High-Level Subsystem Topology

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER                                         │
│  Next.js 16 App Router (React 19) · Unified Architecture Studio (/studio?id=<uuid>)    │
│  Lightweight Redirect Shims: /workspace, /studio1, /gcp -> /studio                     │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ REST / JSON-RPC / SSE (Guarded via enforceGeminiRouteGuard)
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 API ROUTE CONTROLLERS                                  │
│  /api/generate · /api/decompile-image · /api/diagrams · /api/export · /api/docgen      │
└─────────────────────┬─────────────────────┬────────────────────┬───────────────────────┘
                      │                     │                    │
                      ▼                     ▼                    ▼
┌──────────────────────────┐ ┌─────────────────────────┐ ┌───────────────────────────────┐
│     PROMPT COMPILER      │ │  CANONICAL MASTER ENGINE│ │    PERSISTENCE & LINEAGE      │
│  • 5-Tier Gemini Stack   │ │  • 77 Blueprints (01-77)│ │  • Dual SQLite / PostgreSQL   │
│  • Clause Synthesizer    │ │  • 60 Certified Matrix  │ │  • Deep-link UUID routing     │
│  • 4-Cat Intent Guard    │ │  • 16:9 Master Geometry │ │  • Version History Lineage    │
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
                                            │ Certified XML + 16 Living Specs
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                           EMBEDDED VIEWER & EXPORT RUNTIME                             │
│  • DiagramViewerRenderSafe.tsx   • LivingSpecsViewer.tsx   • SVG / PNG / PPTX / DOCX   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Subsystem Breakdown & Directory Map

### 3.1 Prompt Compiler & Clause Synthesizer (`src/lib/diagramCompiler.ts`, `src/lib/promptDrivenDiagramSynthesizer.ts`, `prompts/`)
- **4-Category Conversational Non-Mutation Gate (`src/lib/intentGuard.ts`)**: Intercepts greetings (`"Hi"`), capability queries (`"who are you"`), courtesies (`"thanks"`), and short ambiguous inputs ($\le 2$ words) with zero canvas mutation and zero version increment.
- **Intent Classification & Archetype Routing (`src/lib/router/intentClassifier.ts`)**: Maps architectural prompts into canonical diagram families (`conceptual_diagram`, `logical_architecture`, `technical_infrastructure`, `erd`, `sequence_diagram`, `dynamic_tiered_infographic`, or bespoke clause-driven synthesis).
- **Dynamic Clause-Driven Synthesis (`src/lib/promptDrivenDiagramSynthesizer.ts`)**:
  - `extractPromptDomainClauses(prompt)`: Splits multi-clause enterprise prompts on `->`, `;`, `,`, `with`, `featuring`, `using`, `across` and pairs each clause with authentic Google Cloud / enterprise services.
  - `formatTwoLineCardClause(text, maxLine1, maxLine2)`: Word-boundary line splitter ensuring card subtitles never clip mid-word (`Cloud S...`).

### 3.2 Master Blueprint Catalog (`src/lib/canonical/`, `templates/master_blueprints/`)
- Contains **77 canonical templates (`01` through `77`)** in `src/lib/canonical/canonicalTemplates.ts` (including Infographics `#52–#66`, Flow Diagrams `#67–#75`, Whiteboard `#76`, and Paper `#77`) and **60 certified architecture blueprints** in `src/lib/blueprintKnowledgeMatrixNormalized.ts`.
- **Zero-Mutation Preflight Passthrough**: `validateAndHealDrawioXml` and `preflightVerifyAndHealXmlAcrossAll6Audits` pass canonical templates through with **zero coordinate or geometric mutation**.
- **Domain Flavoring**: Re-flavors titles, descriptions, and metric badges across financial, healthcare, supply chain, and retail domains without altering the master 2D geometry.

### 3.3 Vector Icon Architecture (`src/lib/gcpIcons.ts`, `src/lib/sapIcons.ts`)
- **Strict Prohibition**: Never calls external icon CDNs (e.g. `api.iconify.design`) or uses raw Unicode emojis inside architecture cards.
- **RFC 2397 Data URI Embedding**: Embeds authentic Google Cloud and SAP vector SVGs as URI-encoded strings directly inside Draw.io node styles:
  ```text
  shape=image;image=data:image/svg+xml,...;imageWidth=24;imageHeight=24;imageAlign=left;spacingLeft=40;
  ```

### 3.4 Preflight Audit & Self-Healing Engine (`src/lib/preflightAuditEngine.ts`)
Executes 4 deterministic validation gates on all generated XML:
1. **XML Schema Integrity**: Enforces valid `<mxfile host="embed.diagrams.net"><diagram><mxGraphModel>` document envelopes.
2. **2D Bounding Box Collision Healing**: Calculates Axis-Aligned Bounding Box (AABB) intersections and pushes overlapping nodes rightward or downward with a $30\text{px}$ safety margin.
3. **High-Contrast Pill Badging**: Wraps connector labels touching borders in solid white/contrast pills (`labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;fontSize=8;fontStyle=1;`).
4. **Point-to-Point Orthogonal Routing**: Eliminates diagonal slants and awkward jogs by locking matching entry/exit coordinates.

### 3.5 Persistence & Database Engine (`src/lib/db.ts`)
- **Dual-Engine Architecture**:
  - Local Dev: Embedded SQLite (`dev.db`) with `PRAGMA foreign_keys = ON;`.
  - Production: Managed PostgreSQL via connection pools (`pg`).
- **Schema Lineage**: Persists diagram versions, chat conversation turns, and architectural taxonomy tags with immutable UUIDs (`/studio?id=<uuid>`).

---

## 4. The 3-Tier Architectural Hierarchy & Conceptual 4-Flow Taxonomy

PromptCanvas strictly enforces the separation of architectural abstractions:

### 1. Conceptual Tier (Rule 22: Capability & Boundary Level)
- Operates strictly at the capability and boundary level, stripping away infrastructure mechanics to highlight business value, intent, and domain relationships.
- Structured around the **4 Canonical Conceptual Flows**:
  1. **User Journey Flow (Experience Flow)**: High-level persona interaction and primary ingress entry points.
  2. **Business Process Flow (Value Stream)**: End-to-end business capability coordination, domain events, and milestones.
  3. **Domain Data Flow**: Macroscopic information movement across bounded contexts.
  4. **Enterprise Integration Flow**: Coarse-grained boundary handoffs to external third parties, legacy ERPs, or partner ecosystems (A2A, MCP, REST).

### 2. Logical Tier
- Functional microservice decomposition, component contracts, event streams, orchestration engines, and operational state transitions.

### 3. Technical & Infrastructure Tier (Rule 19)
- Physical and cloud infrastructure: explicit VPC subnets, CIDR allocations (`10.128.0.0/16`), security perimeters (VPC-SC), private transit endpoints (PSC, Direct Egress), transport protocols (`gRPC over mTLS`, `JSON-RPC`), exact container runtimes (Cloud Run, GKE Autopilot), and Multi-AZ High Availability.

---

## 5. Directory Organization

```text
PromptCanvas/
├── AGENTS.md                  # Layer 1: Unified global/project architectural laws (symlinked to ~/.gemini/config/AGENTS.md)
├── skills.md                  # Layer 1: Unified global/project skill trigger registry (symlinked to ~/.gemini/config/skills.md)
├── skills.json                # Layer 1: Machine-readable skill manifest (symlinked to ~/.gemini/config/skills.json)
├── ARCHITECTURE.md            # Layer 2: System topology, 5-Tier model stack, compiler pipelines
├── SECURITY.md                # Layer 2: Threat model, route guards, SVG XSS, workstation safety
├── RUNBOOK.md                 # Layer 2: Operational commands, 28-workflow E2E audit, Cloud Run deploy
├── .agents/
│   ├── hooks.json             # Jetski lifecycle governance hooks (symlinked to ~/.gemini/config/hooks.json)
│   └── skills/                # Layer 3: Executable project skills (13 registered skill suites)
│       ├── ai-prompt-evals/
│       ├── cross-viewport-auditor/
│       ├── database-schema-guard/
│       ├── diagram-decompilation-and-geometry/
│       ├── diagram-generation-engine/
│       ├── gcp-enterprise-diagram-engine/
│       ├── load-and-stress-testing/
│       ├── performance-and-telemetry/
│       ├── puppeteer-pair-programming/
│       ├── security-code-scanner/
│       ├── ui-first-design-system/
│       ├── universal-document-cloud-hub/
│       └── visual-regression-testing/
├── src/
│   ├── app/                   # Next.js 16 App Router pages (/studio, /canonical, /library, /docgen, /vision, etc.) & API routes
│   └── lib/                   # Core engine, 5-tier geminiConfig, validators, DB, icons, canonical blueprints
│       ├── canonical/         # 77 Canonical blueprint implementations (01 - 77)
│       ├── geminiConfig.ts    # Authoritative 5-Tier Google/Gemini/DeepMind model registry
│       ├── promptDrivenDiagramSynthesizer.ts # Clause-driven architecture & flowchart synthesizer
│       ├── deepmindVisionDecompiler.ts       # 2-Stage Vision image-to-Draw.io XML decompiler
│       ├── spec/livingSpecsGenerator.ts      # 16 synchronized Living Specifications compiler
│       └── preflightAuditEngine.ts           # Quality Validator & AABB auto-healer
├── templates/master_blueprints/ # 60 certified standalone .drawio.xml blueprints + all_master_templates.json
├── scripts/                   # Quality gate runners, lifecycle hook guards, catalog validators
└── scratch/                   # Ephemeral screenshots, E2E harnesses & diagnostic logs (gitignored)
```
