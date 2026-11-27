# PromptCanvas — System Architecture & Technical Topology (`v3.3.0`)

Welcome to the **PromptCanvas** Architecture Specification. This document outlines the end-to-end system design, 5-Tier Google/Gemini/DeepMind model stack, subsystem topology, clause-driven compilation pipelines, validation engines, and data flow models for AI agents and enterprise developers.

---

## 1. System Overview

**PromptCanvas** is an enterprise-grade AI diagramming and living specifications platform built on **Next.js 16 (App Router)** and **React 19**. It compiles natural language prompts, raster architecture diagrams, domain requirements, and reference models into production-certified **Draw.io XML (`<mxfile>`)** diagrams, high-resolution vector assets, and **16 synchronized Living Specifications**.

### Core Architectural Responsibilities
1. **Prompt-to-Architecture Compilation & Composite-Card Spatial Mutation**: Ingests natural language prompts and mutates or synthesizes multi-tiered Draw.io XML architectures using `gemini-3.1-pro-preview` and `gemini-3-flash-preview` centralized in `src/lib/geminiConfig.ts`, with atomic multi-primitive composite-card clustering (`src/lib/freeform/directDrawioSpatialMutator.ts`).
2. **Orthogonal Cross-Family Multi-Model LLM-as-a-Judge**: Evaluates every generated or mutated diagram via a server-side panel (`gemini-3.1-pro-preview` primary reasoning/multimodal critic + `gemma-4-31b-it` open-weights cross-family critic) paired with deterministic zero-floor AST geometry & WCAG contrast checks (`src/lib/orthogonalMultiModelJudge.ts`, `src/lib/diagramAstHealth.ts`, `src/lib/validate/validator.ts`).
3. **2-Stage Vision Image-to-Draw.io XML Decompilation**: Converts uploaded raster architecture diagrams (PNG/JPG/WebP) into editable Draw.io XML (`src/lib/deepmindVisionDecompiler.ts` & `/api/decompile-image`).
4. **Lean 8 Document Studio & Living Specifications**: Synthesizes architecture specifications (BRD, PRD, SDD, TDD, AI System Card, STRIDE Threat Model, Security Package, SRE Resilience) audited by an orthogonal Pro + Gemma 4 judge panel.
5. **Closed-Loop Quality Verification**: Enforces zero-floor AST validation (`validateDrawioXml`), Canonical Blueprint Certification (`scripts/verify_canonical_certification.ts`), and Nav/Source Purity Guards (`scripts/verify_nav_badge_counts.mjs`).
6. **Dual-Engine Persistence**: Local development via SQLite (`dev.db`) with Cloud Run GCS / PostgreSQL synchronization.

---

## 2. High-Level Subsystem Topology

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER                                         │
│  Next.js 16 App Router (React 19) · Unified Architecture Studio (/dashboard & /studio) │
│  Enterprise Catalog & Docs: /library, /blogs, /blogs/[docId], /vision, /docgen         │
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
│  • 5-Tier Gemini Stack   │ │  • 26 Prod Blueprints   │ │  • Dual SQLite / PostgreSQL   │
│  • Clause Synthesizer    │ │  • 26/26 Certified      │ │  • Deep-link UUID routing     │
│  • 4-Cat Intent Guard    │ │  • 16:9 Master Geometry │ │  • Micro-Version Lineage      │
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
- **Architectural Decision & Archetype Routing (`src/lib/geminiArchitecturalDecisionEngine.ts`)**: Maps architectural prompts into canonical diagram families (`#78` Hub-and-Spoke, `#00` 2026 GCP Native, `#35`–`#50` Reference Architectures, `#67`–`#74` Brand Light 7-Layer Flowcharts, or `buildUniversalClosedLoopDomainHarnessXml` NASA Closed-Loop Default).
- **Dynamic Clause-Driven Synthesis (`src/lib/promptDrivenDiagramSynthesizer.ts`)**:
  - `extractPromptDomainClauses(prompt)`: Splits multi-clause enterprise prompts on `->`, `;`, `,`, `with`, `featuring`, `using`, `across` and pairs each clause with authentic Google Cloud / enterprise services.
  - `formatTwoLineCardClause(text, maxLine1, maxLine2)`: Word-boundary line splitter ensuring card subtitles never clip mid-word (`Cloud S...`).

### 3.2 Master Blueprint Catalog (`src/lib/canonical/canonicalTemplates.ts`, `src/lib/canonical/canonicalContracts.ts`)
- Contains **26 production Google Cloud reference blueprints (`#78`, `#00`, `#35`–`#50`, `#67`–`#74`)** across 6 families (`26/26` `100%` certified in `src/lib/canonical/canonicalContracts.ts`).
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

### 3.6 Server-Side Refresh-Token Google Workspace Bridge & Universal Inline Slides Previewer (`src/lib/server/googleWorkspaceBridge.ts`, `src/data/cloud_viewer_manifest.json`, `src/components/DiagramInlineSlidesPreviewer.tsx`)
- **Why Legacy Browser GIS Popup Failed vs. Server-Side Refresh-Token Bridge Succeeded**:
  - Desktop/Installed-App OAuth credentials in `.gsheet_oauth_token.json` (`nitinagga@google.com`) cannot be used inside browser Google Identity Services (`google.accounts.oauth2.initTokenClient`) popups due to missing browser Authorized JavaScript Origins (`origin_mismatch` / `popup_closed`).
  - `src/lib/server/googleWorkspaceBridge.ts` exchanges `grant_type=refresh_token` **server-side** at `https://oauth2.googleapis.com/token` (using `.gsheet_oauth_token.json` locally or `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET` / `GOOGLE_OAUTH_REFRESH_TOKEN` on Cloud Run), uploads `.pptx` bytes via multipart `POST https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true` with `mimeType: "application/vnd.google-apps.presentation"` and header `x-goog-user-project: "nitina-ggarwal-sandbox-647724"`, clones/updates Google Docs natively via `drive.files.copy` + `documents.batchUpdate` (`Rule 49`), and caches the resulting URLs in `src/data/cloud_viewer_manifest.json`.
- **Pre-Warmed Google Drive Manifest (`0ms` Direct Open)**:
  - `src/data/cloud_viewer_manifest.json` (`GET /api/google-workspace/manifest` & `POST /api/google-workspace/open`) stores verified `https://docs.google.com/presentation/d/<id>/edit?authuser=nitinagga%40google.com` and `https://docs.google.com/document/d/<id>/edit?authuser=nitinagga%40google.com` links for `WS1`–`WS5`, `ALL`, `BP-00`..`BP-78`, `GCP-MULTIAGENT-01`, and all 7 Official Google Cloud Architecture Center variants.
- **Header-Only Action Controls & 100% Full-Width Diagram Canvas (`src/components/DiagramInlineSlidesPreviewer.tsx`)**:
  - Embedded with `headerOnly={true}` in the top header of `/dashboard` (`src/app/dashboard/page.tsx`), the preview modal header of `/library` (`src/app/library/page.tsx`), and the selector header of `/blogs` (`src/app/blogs/page.tsx`) to provide the `👁️ Cloud Viewer` button, the Google Drive-style split button (`[ S | Open with Google Slides ↗ | ▼ ]`), and the 3-mode Same-Screen Cloud Viewer Modal (`✨ Interactive Slides Studio`, `🌐 Live Google Slides Embed`, `📄 Live Google Docs Spec`) while keeping the architecture diagram at 100% full width with zero on-page `1. EDITABLE SLIDE DECK PREVIEWER` clutter.


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
│   ├── app/                   # Next.js 16 App Router pages (/dashboard, /templates, /infographics, /library, /docgen, /vision, /audit, /blogs, /changelog) & API routes
│   └── lib/                   # Core engine, geminiConfig, orthogonalMultiModelJudge, validators, DB, icons, templates
│       ├── templates/         # 84 Certified Architecture Templates (53 Tier 1 + 31 Tier 2, L200–L400)
│       ├── canonical/         # Canonical Draw.io generators + 15 Infographics (#52–#66)
│       ├── geminiConfig.ts    # Frontier Gemini 3.1 Pro / Gemini 3 Flash / Gemma 4 31B model registry + Cloud Run Metadata ADC
│       ├── orthogonalMultiModelJudge.ts      # Parallel Pro + Gemma 4 cross-family LLM-as-a-Judge panel
│       ├── diagramAstHealth.ts               # Zero-floor deterministic 6-dimension AST & domain health evaluator
│       ├── freeform/directDrawioSpatialMutator.ts # Composite-card Draw.io spatial mutator + closed-loop repair
│       └── deepmindVisionDecompiler.ts       # Vision image-to-Draw.io XML decompiler
├── scripts/                   # Zero-orphan, nav-badge, canonical certification & docgen quality gates
└── tests/                     # Vitest unit, security, and anti-theatre mechanical ratchet suites
```
