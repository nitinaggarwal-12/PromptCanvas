# Architecture Before Rebuild (Pipeline V1)

## 1. Overview
PromptCanvas converts natural language architecture prompts into interactive, production-grade Draw.io (mxGraph) diagrams. In Pipeline V1, Gemini (specifically `gemini-3.7-flash`) is responsible for directly generating raw Draw.io XML containing absolute node coordinates `(x, y, width, height)` and edge routing points.

---

## 2. Component Mapping

| Area | File Path | Responsibilities |
| :--- | :--- | :--- |
| **Frontend Page** | `src/app/workspace/page.tsx` | Workspace UI, prompt input box, persona switcher, version history navigation, and active diagram state. |
| **Canvas / Renderer** | `src/components/DiagramViewer.tsx` | Embeds Draw.io static viewer (`viewer-static.min.js`) inside an iframe to render mxGraph XML into SVG/HTML canvas. |
| **Generation Backend ("Compiler")** | `src/app/api/generate/route.ts` | Handles `POST /api/generate`. Prompts Gemini 3.7 Flash with raw XML system prompt to directly emit Draw.io XML blocks. |
| **AI LLM Client** | `@google/genai` (in `src/app/api/generate/route.ts` & `src/app/api/audit/route.ts`) | Google GenAI SDK initialized via `new GoogleGenAI({})`. Calls `gemini-3.7-flash`. |
| **Diagram Templates & Compiler Helpers** | `src/lib/diagramCompiler.ts` & `src/lib/architectureTypes.ts` | Static reference XML templates and AST helper functions. |
| **XML Validation & Preflight Audit** | `src/lib/xmlHealer.ts` & `src/lib/preflightAuditEngine.ts` | Regex/AST healing for mxGraph XML tags, ampersand escaping, and baseline heuristic checks. |
| **Database & Version History** | `src/lib/db.ts` | Manages SQLite (`dev.db`) and PostgreSQL tables (`diagrams`, `diagram_versions`, `audit_reports`). |
| **Security Audit Flow** | `src/app/api/audit/route.ts` | `POST /api/audit` - Uses Gemini with structured JSON output to evaluate diagram security, compliance, topology, and visual posture. |

---

## 3. Request / Response Shapes & Workflows

### A. Initial Diagram Generation (`POST /api/generate`)
* **Request**: `{ prompt: string, architectureType?: string, name?: string }`
* **Workflow**:
  1. Acquires lock (`acquireGeminiLock`).
  2. Passes prompt + inline system instruction to `gemini-3.7-flash`.
  3. Gemini generates raw XML directly (with `(x, y)` coordinates).
  4. Parses XML, runs `validateAndHealDrawioXml` and `preflightVerifyAndHealXmlAcrossAll6Audits`.
  5. Saves new record in `diagrams` and `diagram_versions` (v1) in `src/lib/db.ts`.
* **Response**: `{ diagram, version }`

### B. Iterative Chat / Refinement Flow ("Add an ALB")
* **Request**: `{ prompt: string, diagramId: string, architectureType?: string }`
* **Workflow**:
  1. Fetches latest XML (`getLatestDiagramVersion(diagramId)`).
  2. Sends `Existing XML` + `Refinement Prompt` to `gemini-3.7-flash`.
  3. Gemini emits updated Draw.io XML.
  4. Saves new version (`version_number + 1`) to `diagram_versions`.
* **Response**: `{ version }`

### C. Security Audit Flow (`POST /api/audit`)
* **Request**: `{ diagramId: string, versionId?: string, auditCategory: string, imageBase64?: string }`
* **Workflow**:
  1. Fetches target diagram XML from `diagram_versions`.
  2. Passes XML to `gemini-3.7-flash` with structured JSON schema (`score`, `report`, `gaps`).
  3. Saves report in `audit_reports` table.
* **Response**: `{ report: { score, report, gaps } }`

---

## 4. Current Limitations of V1
1. **Coordinate Hallucination**: Model directly predicts 2D coordinates `(x, y)`, resulting in overlapping nodes and text collisions.
2. **Container Escapes**: Child nodes escape parent swimlanes and bounding boxes.
3. **Crossing Edge Clutter**: Orthogonal connectors slice across intermediate nodes due to lack of a deterministic graph layout engine.
