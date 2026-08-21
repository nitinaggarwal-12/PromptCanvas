# PromptCanvas — AI Prompt-to-Draw.io Architecture Diagram Platform

PromptCanvas translates natural language architecture descriptions into production-grade, interactive Draw.io (mxGraph) diagrams.

---

## 🚀 Pipeline V2: Graph-then-Layout Engine

Pipeline V2 replaces legacy LLM coordinate prediction with a deterministic **Graph-then-Layout Pipeline**:

1. **Logical Graph Generation**: Gemini (upgraded to `gemini-3.6-flash`) outputs a strict logical architecture JSON graph (WHAT exists and HOW it connects).
2. **Deterministic Layout**: `elkjs` computes layered container and node coordinates (`(x, y, width, height)`) deterministically.
3. **mxGraph XML Renderer**: Renders laid-out graphs into valid Draw.io XML with official cloud vendor logos (GCP, AWS, Azure, PostgreSQL, Redis, Kubernetes).
4. **Pre-Render Validator & Repair Loop**: Automated multi-check validator with an LLM repair safety net.

---

## 🛠️ Environment Variables & Feature Flags

Add to `.env` or `.env.local`:

```env
# Enable Pipeline V2 Graph-then-Layout Engine (defaults to true)
LAYOUT_ENGINE_V2=true

# Vertex AI / Gemini Model ID (defaults to gemini-3.6-flash)
GEMINI_MODEL_ID=gemini-3.6-flash
```

### Per-Request A/B Feature Flag Override
Pass `layoutEngineV2: true` (or `false`) in the `POST /api/generate` request body, query parameter `?layoutEngineV2=true`, or HTTP header `x-layout-engine-v2: true` to switch between Pipeline V1 and V2 on the fly.

---

## 🧪 Testing & Validation CLI

### Run Complete Test Suite
Executes unit tests for schema validation, XML pre-render validator, ELK determinism, golden pipeline tests across 10 blueprint templates, round-trip cell matching, and edit-flow minimal diff:

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

* **[docs/ARCHITECTURE_TAXONOMY_V1.md](docs/ARCHITECTURE_TAXONOMY_V1.md)**: **Canonical Architecture Taxonomy (v1.0)** — Complete 39-Family Architecture Matrix, 34 Visual Grammars, 8 Visual Families, and 16 Document Bindings.
* **[docs/PromptCanvas_Architecture_Taxonomy_v1.0_Consolidated.xlsx](docs/PromptCanvas_Architecture_Taxonomy_v1.0_Consolidated.xlsx)**: Consolidated Excel Workbook.
* **[docs/ARCHITECTURE_BEFORE.md](docs/ARCHITECTURE_BEFORE.md)**: Codebase map of Legacy Pipeline V1.
* **[docs/ARCHITECTURE_AFTER.md](docs/ARCHITECTURE_AFTER.md)**: Pipeline V2 Architecture with Mermaid flow diagram.

---

## 💻 Local Development

```bash
npm run dev
```

Open [http://localhost:3001/workspace](http://localhost:3001/workspace) to open the interactive canvas workspace.
