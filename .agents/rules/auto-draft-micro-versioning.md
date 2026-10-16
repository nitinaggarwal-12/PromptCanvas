---
trigger: always_on
description: Any generated or modified diagram must be automatically saved with a semantic micro-version number (e.g., v1.0.1, v1.0.2) and immediately available under Drafts in the Architecture Library (/library).
---

# Mandatory Auto-Draft Micro-Versioning & Library Persistence Rule

Whenever any architecture diagram is generated, synthesized, decompiled, or modified via prompt across PromptCanvas (`/dashboard`, `/studio`, `/vision`, or API synthesis):

1. **Semantic Micro-Version Numbering (`v<major>.<minor>.<micro>`)**:
   - Every generated diagram or iterative prompt modification from a baseline (`v1.0`) or active version must automatically increment and stamp a **micro-version number** (e.g., `v1.0.1`, `v1.0.2`, `v1.0.3`, or `v<major>.<minor>.<micro>`).
   - Promoting a draft to an official saved project increments the minor or major version (`v1.1`, `v2.0`), while in-progress prompt generations always track granular micro-versions.

2. **Immediate Automatic Draft Persistence**:
   - Generated diagrams must **never** remain trapped exclusively in ephemeral tab `sessionStorage`.
   - Immediately upon generation, every diagram must be auto-persisted as a Draft (`created_studio: 'draft'`, `status: 'draft'`) to persistent client storage (`localStorage` under `promptcanvas_draft_blueprints` and `promptcanvas_saved_blueprints`) and the backend database (`/api/diagrams`).

3. **First-Class "Drafts" Tab (`?studio=drafts`), Canonical `DRAFT-ORACLE-EXADATA-EBS-V1-0-1` Seed & Automatic Stale-Stub Self-Healing in Architecture Library (`/library`)**:
   - The Saved Architectures & Enterprise Library (`/library`) must expose a dedicated **`📝 Drafts`** tab (`?studio=drafts`) and KPI counter.
   - All auto-saved micro-versioned diagrams—including **Oracle Database@Google Cloud — E-Business Suite (EBS R12.2) on Exadata X10M (`v1.0.1`)** (`id: 'DRAFT-ORACLE-EXADATA-EBS-V1-0-1'`, `23` vertices, `17` edges, `2` versions: `v1.0.1` full architecture + `v1.0.0` blank canvas baseline) and **NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness (`v1.0.1`)** (`id: 'DRAFT-NASA-MULTIVERSE-V1-0-1'`)—must be seeded in `getAutoSavedDraftBlueprints()`, rendered with live `<DiagramViewer>` tile previews in `/library`, and immediately reopenable in the Full-Page Template View (Executive Light Theme) and Dashboard (`/dashboard?draft=DRAFT-ORACLE-EXADATA-EBS-V1-0-1`).
   - Any pre-fix 1-box stub (`copilot_mod_custom_box_0` / `CO-PILOT SYNTHESIS V1.1`) or truncated `Oracle@googl...` entry cached in browser `localStorage`, `sessionStorage`, or `/api/diagrams` must be automatically self-healed and deduplicated on read via `healStubOrOracleDiagramXml` across `draftMicroVersionStore.ts`, `library/page.tsx`, `DiagramViewer.tsx`, `DiagramViewerRenderSafe.tsx`, `api/diagrams/route.ts`, and `api/diagrams/[id]/route.ts`.

