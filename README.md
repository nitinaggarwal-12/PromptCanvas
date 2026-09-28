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
```

### Per-Request A/B Feature Flag Override
Pass `layoutEngineV2: true` (or `false`) in the `POST /api/generate` request body, query parameter `?layoutEngineV2=true`, or HTTP header `x-layout-engine-v2: true` to switch between Pipeline V1 and V2 on the fly.

---

## 🧪 Testing & Validation CLI

### Master Omni 1.1 Architecture Quality Gate (11 Gates)
Executes the comprehensive 11-step quality verification gate covering render safety, master catalog quality (75 blueprints), canvas generator self-healing, hooks schema validation, governance doc sync, and 5-tier model stack verification:
```bash
npm run quality-gate
```

### Automated Jetski Lifecycle Governance Hooks
Automated agent safeguards in `.agents/hooks.json` enforce:
- **`PreToolUse` (`scripts/pre_tool_guard.mjs`)**: Intercepts destructive shell commands (`rm -rf`, `DROP TABLE`, `git reset --hard`) and unauthorized root path writes.
- **`PostToolUse` (`scripts/post_tool_verifier.mjs`)**: Post-tool execution verification protocol (TypeScript, Single-Studio route invariant, 5-Tier model stack, Universal Route Guard).
- **`PreInvocation` (`scripts/pre_invocation_memory.mjs`)**: Injects Omni 1.1 layout standards (16:9 widescreen, zero visual collision gate, Dark Shell + Light Workspace law).
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

