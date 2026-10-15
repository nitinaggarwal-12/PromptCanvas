# PromptCanvas — AI Prompt-to-Draw.io Architecture Diagram & Living Specs Platform (`v3.3.0`)

PromptCanvas translates natural language architecture descriptions, raster architecture images, and domain topics into production-grade, interactive Draw.io (`mxGraph`) diagrams and 16 synchronized Living Specifications.

---

## 🧠 Canonical 5-Tier Google / Gemini / DeepMind Model Stack (`src/lib/geminiConfig.ts`)

1. **Tier 0 — Multimodal Audit & Certification Gate (`google-omni-1.1`)**: Chief Architecture SME Director & Multimodal Visual Collision Auditor.
2. **Tier 1 — Deep Reasoning, Vision Decompilation & 16 Living Specs (`gemini-3.1-pro-preview`)**: 6-Dimension Domain Research (`deepDomainResearcher.ts`), Vision Image-to-Draw.io XML Decompilation (`deepmindVisionDecompiler.ts`), and 16 Living Specifications (`livingSpecsGenerator.ts`).
3. **Tier 2 — High-Speed Interactive Copilot & AST Graph Synthesis (`gemini-3.8-flash`)**: Sub-2.5s Intent Router, 4-Category Conversational Non-Mutation Gate, Prompt Enhancer, and Dynamic Clause-Driven Draw.io XML Synthesis.
4. **Tier 3 — Real-Time Bidirectional Voice & Video Canvas Co-Pilot (`gemini-3.1-flash-live-preview`)**: Sub-second live blueprinting and interactive voice/canvas co-pilot.
5. **Tier 4 — Generative Media & Vector Grounding**:
   - **Video**: `veo-3.1-generate-preview` (Google DeepMind Veo 3.1)
   - **Audio / Music**: `lyria-3.5` (DeepMind Lyria 3.5)
   - **Image**: `gemini-3.1-flash-image-preview` (Google DeepMind Imagen 3 / Flash Image)
   - **Neural TTS**: `gemini-3.1-flash-tts-preview` (Gemini 3.1 Flash TTS)
   - **Embeddings**: `text-embedding-005` (Text Embedding 005)

---

## 🚀 Pipeline V2: Graph-then-Layout Engine

Pipeline V2 replaces legacy LLM coordinate prediction with a deterministic **Graph-then-Layout Pipeline**:

1. **Logical Graph Generation**: Gemini (`gemini-3.8-flash` & `gemini-3.1-pro-preview`) outputs a strict logical architecture JSON graph (WHAT exists and HOW it connects).
2. **Deterministic Layout**: `elkjs` computes layered container and node coordinates (`(x, y, width, height)`) deterministically.
3. **mxGraph XML Renderer**: Renders laid-out graphs into valid Draw.io XML with official cloud vendor logos (GCP, AWS, Azure, PostgreSQL, Redis, Kubernetes).
4. **Pre-Render Validator & Repair Loop**: Automated multi-check validator with an LLM repair safety net audited by `google-omni-1.1`.

---

## 🛠️ Environment Variables & Feature Flags

Add to `.env` or `.env.local`:

```env
# Enable Pipeline V2 Graph-then-Layout Engine (defaults to true)
LAYOUT_ENGINE_V2=true

# Vertex AI / Gemini Model IDs (defaults in src/lib/geminiConfig.ts)
GEMINI_PRO_MODEL=gemini-3.1-pro-preview
GEMINI_FLASH_MODEL=gemini-3.8-flash
GEMINI_LIVE_MODEL=gemini-3.1-flash-live-preview
OMNI_MODEL_ID=google-omni-1.1

# Server-Side Refresh-Token Google Workspace Bridge (src/lib/server/googleWorkspaceBridge.ts)
GOOGLE_OAUTH_CLIENT_ID=<desktop-or-web-oauth-client-id>
GOOGLE_OAUTH_CLIENT_SECRET=<oauth-client-secret>
GOOGLE_OAUTH_REFRESH_TOKEN=<refresh-token-for-nitinagga@google.com>
GOOGLE_DRIVE_QUOTA_PROJECT=nitina-ggarwal-sandbox-647724
```

### 📊 Universal 1:1 Inline Slides Previewer & `"Open with Google Slides"` Bridge (`Rule 47`)
Every diagram across `/blogs`, `/dashboard`, `/library`, and `/viewer` embeds [`DiagramInlineSlidesPreviewer.tsx`](src/components/DiagramInlineSlidesPreviewer.tsx) backed by [`src/lib/server/googleWorkspaceBridge.ts`](src/lib/server/googleWorkspaceBridge.ts) and [`src/data/cloud_viewer_manifest.json`](src/data/cloud_viewer_manifest.json):
- **Zero Browser GIS OAuth Popups**: Instead of calling browser `google.accounts.oauth2.initTokenClient` (which fails with Desktop OAuth credentials due to missing Authorized JavaScript Origins), the server exchanges `grant_type=refresh_token` at `https://oauth2.googleapis.com/token` and converts `.pptx` / `.html` via Google Drive v3 (`mimeType: "application/vnd.google-apps.presentation"` / `.document`, `x-goog-user-project: "nitina-ggarwal-sandbox-647724"`).
- **Pre-Warmed `0ms` Direct Open**: Pre-warmed Google Slides (`https://docs.google.com/presentation/d/<id>/edit?authuser=nitinagga%40google.com`) and Google Docs URLs in `src/data/cloud_viewer_manifest.json` open in `0ms`, while dynamic diagrams convert on the fly via `POST /api/google-workspace/open`.
- **Header-Only Action Controls + 3-Mode Cloud Viewer Modal**: Renders **only** the compact `👁️ Cloud Viewer` + `[ S | Open with Google Slides ↗ | ▼ ]` split-dropdown menu in the header bar while keeping the architecture diagram at 100% full width (zero on-page `1. EDITABLE SLIDE DECK PREVIEWER` clutter), and opens the Same-Screen Cloud Viewer Modal (`✨ Interactive Slides Studio`, `🌐 Live Google Slides Embed`, `📄 Live Google Docs Spec`) on click.

### 🏛️ Multi-Tenant Agentic AI Official Google Cloud Architecture Center Template (`#78`), Inline/New-Tab Draw.io Studio, 56-Shape Editable Slides & Live 20/20 GCP E2E Pattern Workbench (`Rule 53`)
All 9 Canonical Use-Case Blog presets (`1:1` with `DOC-MT-01`..`DOC-REF-09`) and all 8 Multi-Tenant Workstream (`WS1`–`WS5`) blueprints across all 3 interactive workflow tabs (`1️⃣ High-Level Topology (#78)`, `2️⃣ Data Ingestion / MCP Flow (#78)`, `3️⃣ Hybrid GraphRAG & Action Flow (#78)`) and inline figures on `/blogs` (`src/lib/canonical/templateOfficialGcpArchCenterHubSpoke.ts` & `src/lib/blogs/useCaseBlogEngine.ts`) render the **Official Google Cloud Architecture Center Hub-and-Spoke Template (`#78`)** (`#1a73e8` outer Google Cloud frame, `#aecbfa` Routing Hub, `#ceead6` Governance Hub, `#feefc3` Left Spoke, `#fad2cf` Right Spoke), with:
- **100% Inline & New-Tab Draw.io Editability**: Toggle `[ 🖼️ 1:1 Official SVG | ✏️ Edit Inline (Draw.io) ]` (`InteractiveDrawioInlineEditor` with `referrerPolicy="no-referrer"` + `BroadcastChannel('promptcanvas_drawio_sync')`) or click `Open in Draw.io Tab ↗` (`/drawio-editor`) to edit all `56` vertices and `23` vertex-bound connectors live with zone-matched `addCalloutText` background knockouts.
- **Calibrated 6-Slide Editable Diagram (`56` Shapes + `23` Connectors) + Blog Content Google Slides**: Click `👁️ Cloud Viewer` or `[ S | Open with Google Slides ↗ | ▼ ]` (`src/data/cloud_viewer_manifest.json` & `src/lib/export/editablePptxCompiler.ts`) to open pre-warmed 6-slide Google Slides decks (`DOC-MT-01`..`DOC-REF-09`, `WS1`–`WS5`, `BP-78`) with Slide 1 decomposed into `56` editable shapes + `23` connectors in the left `7.62"` canvas (`uniformScale`, **3-Pass Z-Index Layering** `backgroundContainers -> edges -> foregroundVertices`, centered circular step badges `step_1..7`, borderless floating callouts, 2-column `actor_top_user`, skipping `hdr_title_box`, `addImagePreservingAspect`, `normalizeDrawioHtmlForSlides`, `isTopFullWidthContainer`, `isSpokeOuterWrapper`, `postProcessPptxCompactArrowsBase64`) + right `5.03"` 4-Zone Architecture Center Sidebar (`renderArchitectureCenterDiagramSidebar`), and Slides 2–6 rendering full-height Architecture, Agentic Flow, Use Case, Well-Architected Design Considerations, and Deployment Runbook content (`findDocSection` resolving both underscore and hyphen section IDs).
- **9-Guide Tile Catalog Hub (`DOC-MT-01`..`DOC-REF-09`), Strict 1:1 Preset Deduplication (`0` 4x Format Multiplication), 1:1 Google Cloud Whitepaper PDF Reader, Consulting Brand Ban (`Rule 50B`) & First-Principles Value Pruning (`Rule 25`)**: Default `/blogs` view presents the 9-Guide Tile Catalog Hub (`DOC-MT-01`..`DOC-MT-06` 6-part Multi-Tenant Series + `DOC-REF-07`..`DOC-REF-09` Reference Architectures) with a 2-Column PDF-Style Documentation Reader (`100/100` LLM-as-a-Judge Pass 2), `0` third-party consulting brands across all 9 Canonical Blogs (`1:1` with `DOC-MT-01`..`DOC-REF-09`, `0` legacy 52-blog format multiplication), and `0` duplicate OKF synthesis cards, static asset tables, series-pill strips, or `#doc-takeaways` blocks.
- **Executive Light-Theme 4-Tab End-to-End GCP Pattern Workbench, Full-Width Use-Case Top Bar & 28 Real Cloud Console Proof Screenshots Only (`#blog-e2e-pattern-execution-and-codebase-workbench`)**: Full-width layout (`use-case-catalog-top-bar` + horizontal 8-pill `official-arch-center-variant-bar` with zero empty left gutter) backed by `12` live Google Cloud resources across `ramp-portal-dev` (`#248990048888`), `nitinagga-ge-2` (`#638420508320`, `https://cymbal-multi-tenant-patterns-638420508320.us-central1.run.app`), and `nitina-ggarwal-sandbox-647724` (`#887605034827`) (`pattern_a_pooled_rls_entities` + `ROW ACCESS POLICY tenant_pooled_rls_policy`, `pattern_b_silo_finvault_usw1.pattern_b_silo_finvault_cmek_vault` encrypted with Cloud KMS `finvault-silo-cmek` + ECDSA P-256 signature via `adk-agent-signing-key`, `cymbal-pattern-c-hub-vpc`, `/28` `PRIVATE_SERVICE_CONNECT` NAT subnet `cymbal-psc-nat-us-west1`, `cymbal-pattern-c-finvault-spoke-vpc`, and `pattern_c_psc_endpoints_registry`), `4` live E2E test suites (`20/20 PASS`), `24` production Python + Terraform source files (`src/data/gcpPatternCodebaseAndExecutionBundle.json`), and **exclusively 28 real Google Cloud Console & Gemini Enterprise screenshots** (`gcp_console_01`..`09` [9], `pantheon_live_user_capture_ssh_verify.png` [1], `real_gcp_*` [13], `real_ge_*` [5]; `0` custom screenshots):
```bash
npx tsx scripts/verify_export_slides_quality_gate.ts && npx tsx scripts/verify_blogs_and_gcp_workstreams.ts && npx tsx scripts/evaluate_blogs_llm_judge.ts --pass=2
```

### Per-Request A/B Feature Flag Override
Pass `layoutEngineV2: true` (or `false`) in the `POST /api/generate` request body, query parameter `?layoutEngineV2=true`, or HTTP header `x-layout-engine-v2: true` to switch between Pipeline V1 and V2 on the fly.

---

## 🧪 Testing & Validation CLI

### Master Omni 1.1 Architecture Quality Gate (11 Gates)
Executes the comprehensive 11-step quality verification gate covering render safety, master catalog quality (77 blueprints), canvas generator self-healing, hooks schema validation, governance doc sync, and 5-tier model stack verification:
```bash
npm run quality-gate
```

### Automated Jetski Lifecycle Governance Hooks
Automated agent safeguards in `.agents/hooks.json` enforce:
- **`PreToolUse` (`scripts/pre_tool_guard.mjs`)**: Intercepts destructive shell commands (`rm -rf`, `DROP TABLE`, `git reset --hard`) and unauthorized root path writes.
- **`PostToolUse` (`scripts/post_tool_verifier.mjs`)**: Post-tool execution verification protocol (TypeScript, Single-Studio route invariant, 5-Tier model stack, Universal Route Guard).
- **`PreInvocation` (`scripts/pre_invocation_memory.mjs`)**: Injects Omni 1.1 layout standards (16:9 widescreen, zero visual collision gate, Universal Light Theme Default [Rule 54], Official Google Cloud Arch Center Template `#78` Only [Rule 53]).
- **`Stop` (`scripts/stop_quality_gate.mjs`)**: Blocks agent shutdown if any architecture quality gate fails.

### Run Complete Vitest Suite
```bash
npm test
```

### Run Pre-Render XML Validator CLI
Validate any Draw.io mxGraph XML file against geometric bounds, container rules, and line overlap constraints:

```bash
npm run validate path/to/diagram.xml
```

---

## 📚 Architecture Documentation

* **[docs/INTENT_ROUTER.md](docs/INTENT_ROUTER.md)**: **Authoritative 5-Tier Model Selection & Intent Router Specification (`v3.3.0`)**.
* **[docs/ARCHITECTURE_TAXONOMY_V1.md](docs/ARCHITECTURE_TAXONOMY_V1.md)**: **Canonical Architecture Taxonomy (v1.0)** — Complete 39-Family Architecture Matrix, 34 Visual Grammars, 8 Visual Families, and 16 Document Bindings.
* **[docs/PromptCanvas_Architecture_Taxonomy_v1.0_Consolidated.xlsx](docs/PromptCanvas_Architecture_Taxonomy_v1.0_Consolidated.xlsx)**: Consolidated Excel Workbook.
* **[docs/ARCHITECTURE_BEFORE.md](docs/ARCHITECTURE_BEFORE.md)**: Codebase map of Legacy Pipeline V1.
* **[docs/ARCHITECTURE_AFTER.md](docs/ARCHITECTURE_AFTER.md)**: Pipeline V2 Architecture with Mermaid flow diagram.

---

## 💻 Local Development

```bash
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio) to launch the unified **Architecture Studio**.

---

## 🛡️ Strict Architectural & Cloud Run Deployment Constraints

You are configured to work on this repository with strict architectural and deployment constraints. Follow these instructions exactly:

1. **Planning First:** Before editing or generating code across multiple files, provide a concise 3 to 5 bullet execution plan. Do not touch any files until this plan is stated.
2. **Strict File Boundaries:**
* Only edit files directly required to complete the assigned task.
* Do not reformat, refactor, or delete unrelated files, functions, or utilities.
* Never edit or commit `.env` files, `.git` internals, or package lockfiles (`package-lock.json`, `poetry.lock`).
3. **No Hallucinations:** Use only verified, actively maintained libraries and standard APIs. Do not invent non-existent parameters, SDK methods, or placeholder mocks.
4. **Cloud Run Runtime Compliance:**
* Web services must listen on host `0.0.0.0`.
* Read the port dynamically from the `PORT` environment variable, defaulting to `8080` if not set. Never hardcode port numbers.
* Handle termination signals cleanly so existing connections finish before shutdown:
* In Node.js: `process.on('SIGTERM', ...)`
* In Python: `signal.signal(signal.SIGTERM, ...)`
5. **Quality and Test Gates:**
* Run local linting, type-checking, and unit tests (`npx tsx scripts/verify_export_slides_quality_gate.ts && npx tsx scripts/verify_blogs_and_gcp_workstreams.ts`) immediately after modifying code.
* Fix all errors before presenting the task as complete.
6. **Deployment Target:**
* When running deployment commands, strictly target:
* Platform: Google Cloud Run
* Project ID: `ramp-portal-dev` (Project Number `248990048888`)
* Region: `us-west1`
* Canonical BeyondCorp URL: `https://promptcanvas-248990048888.cr.gclb.goog`
* Command pattern:
```bash
gcloud run deploy promptcanvas \
  --source . \
  --project ramp-portal-dev \
  --region us-west1 \
  --platform managed
```


