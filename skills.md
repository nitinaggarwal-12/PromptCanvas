# 🧰 PromptCanvas Workspace Skills & Engineering Protocols (`v2.5.0`)

This document defines the specialized autonomous engineering skills, forensic verification procedures, and quality protocols enforced across the PromptCanvas codebase.

---

## 1. 🛡️ `anti-static-spoofing-and-subject-parity` (Rule 41 Verification Protocol)

### Purpose & Trigger Conditions
Triggered whenever modifying prompt routing (`src/app/api/generate/route.ts`, `src/lib/unifiedDiagramEngine.ts`, `src/app/studio/page.tsx`), adding diagram templates, or handling layout-style keywords (`"infographic"`, `"tiered infographic"`, `"swimlane"`, `"sequence diagram"`).

### Core Invariant (Zero Static Spoofing)
- **Layout Archetype vs. Subject Domain Separation**:
  - Never confuse a **Visual Layout Archetype** (`4-Tier Architectural Infographic`) with a **Static Content Template** (`Template #52: Context + Harness + Loop + Graph — Charlie Hills` or `NOVACURA Biopharma`).
  - When a user prompt requests a layout style for a **new or arbitrary topic** (e.g., `"Open Knowledge format Infographic"`, `"Healthcare FHIR Infographic"`, `"Zero-Trust Security Infographic"`), the system MUST NEVER spoof or return hardcoded text from an unrelated static template.
  - Generic `"infographic"` requests must route to `generateDynamicTieredInfographicXml(prompt)` (`src/lib/canonical/dynamicTieredInfographic.ts`), which dynamically synthesizes the 4-tier infographic structure (`01 Ingestion` • `02 Harness` • `03 Validation` • `04 Graph`) populated 100% with the user's requested subject domain.

### Operational Verification Command
Run the automated Anti-Static-Spoofing & Subject Domain Parity Quality Gate:
```bash
npx tsx scripts/verify_export_slides_quality_gate.ts
```
This gate executes live synthesis against multiple arbitrary prompts (`"Healthcare FHIR Interoperability Infographic"`, `"Zero-Trust Kubernetes Security Infographic"`) and asserts:
1. Valid 4-tier structure (`TIER 01` through `TIER 04`).
2. 100% semantic subject noun parity in the rendered XML header and tier cards.
3. Zero leaked strings (`charlie hills`, `claude.md`, `novacura`).

---

## 2. 🔄 `governance-doc-lockstep-sync` (Universal Multi-Project Lockstep Gate)

### Purpose & Trigger Conditions
Triggered automatically on every `git commit` (`.git/hooks/pre-commit`) and every Jetski `Stop` lifecycle hook (`scripts/runQualityGate.ts`).

### Core Protocol & Verification Command
Execute the SHA-256 lockstep verification script:
```bash
node scripts/guards/gate_governance_doc_sync.mjs
```
Asserts 100% byte-for-byte SHA-256 identity across:
- `AGENTS.md` === `GEMINI.md` === `.agents/AGENTS.md` === `CLAUDE.md` === `~/.gemini/config/AGENTS.md`
- `.agents/skills/universal-document-cloud-hub/SKILL.md` === `~/.gemini/config/skills/universal-document-cloud-hub/SKILL.md`
- `.agents/skills/diagram-generation-engine/SKILL.md` === `~/.gemini/config/skills/diagram-generation-engine/SKILL.md`
- `.agents/hooks.json` === `~/.gemini/config/hooks.json`

---

## 3. 📊 `export-slides-and-docs-vector-parity` (Native OpenXML DrawingML & PPTX Engine)

### Purpose & Trigger Conditions
Triggered whenever modifying `editablePptxCompiler.ts`, `editableDocxCompiler.ts`, or `/api/export/cloud-bridge`.

### Core Protocol
- **PowerPoint / Google Slides (`editablePptxCompiler.ts`)**: 3-slide master deck (Slide 1: 1:1 Master Visual Twin, Slide 2: Decomposed Editable Vector Topology, Slide 3: Component Inventory Matrix).
- **Word / Google Docs (`editableDocxCompiler.ts`)**: 1-page widescreen landscape native OpenXML DrawingML (`<wpg:wgp>`) vector diagram with strict 4-layer back-to-front Z-ordering, `<a:noFill/>` transparent labels, pure vector service badges (`getServiceBadgeInfo`), and neighbor-clamped bottom labels (`minNeighborDist - 4`).
