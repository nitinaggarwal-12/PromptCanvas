---
name: slide-design
description: >
  Designs and generates Google-branded presentations and demo decks using 100% native editable
  architectural diagram layouts (architecture-zone-topology / three-zone-architecture,
  payload-transformation-triptych / payload-transformation, uml-sequence-swimlane / swimlane-sequence,
  phased-roadmap-timeline / roadmap-timeline, async-state-flow-pipeline / async-state-machine,
  strategic-operating-model-pillars / operating-model-pillars), executive semantic layouts
  (title-cover, quad-metrics, three-pillar, comparison-grid, section-divider, next-steps), and
  grounded live screenshot callout slides (live-screenshot-callout / grounded-screenshot-proof).
  Use whenever the user asks to create, design, draft, or outline Google Slides, pitch decks,
  or technical demos.
---

# Slide Design & Native Editable Visual Architecture Workflow (`v2.0.0`)

## 1. Non-Negotiable Quality Pillars: Editable, Relevant, Complete, Grounded, Accurate & Cohesive
- **100% Native Editable (`0` Flattened Diagram Screenshots)**: Never paste flat, uneditable raster images of diagrams or text tables when depicting system boundaries, payload transformations, UML sequence lifelines, roadmaps, async state flows, or operating models. Every architectural visual MUST be constructed from native editable Google Slides / PptxGenJS vector shapes (`ROUND_RECTANGLE`, `RECTANGLE`, `ELLIPSE`, `RIGHT_ARROW`, `CAN`, `LINE` connectors, vector icons, and editable `TEXT_BOX` elements).
- **100% Relevant, Domain-Specific & Zero Copy-Pasted Example Text**: Visual archetypes define **visual structure and geometry**, NEVER static copy-pasted text. Never emit generic filler text (`Lorem ipsum`, `TBD`) or copy-paste example strings from reference screenshots (such as `"A2UI Portal"`, `"48-hour dormant review period"`, or `"Pub/Sub Topic"` into unrelated workstreams). Every component card, JSON key, actor name, sequence step, state transition, and roadmap phase must be synthesized directly from the active blog, workstream, or customer architecture.
- **100% Cohesive Narrative Flow (`Zero` Repetitive Slide Loops)**: A slide deck must read as one unified, logical story where each slide sets up the next (`Act I: Thesis, Blueprint & KPIs` $\rightarrow$ `Act II: Boundary, Payload, Sequence & State Mechanics` $\rightarrow$ `Act III: Cloud Stack, Verification Matrix, Live Console Proof, Rollout Roadmap, Operating Model & Next Steps`). Never stitch repetitive 3-slide diagram loops (`[Diagram -> 8-Box Grid -> 8-Row Table]`) back-to-back or dump disconnected slides at the end of a deck.
- **100% Complete**: Every visual archetype must include all required structural zones, step numbers (`1..6` or `1..5`), directional arrows, inline payload pills, actor icons, and `"Proprietary + Confidential"` footers without truncation (`0` `...` or `…` cutoffs).
- **100% Grounded in Live Systems & Authentic Screenshots**: Pair native editable diagrams with **authentic, single-environment live screenshots** (`real_gcp_*.png`, `real_ge_*.png`, `gcp_console_*.png`) inside `grounded-screenshot-proof` / `live-screenshot-callout` slides, accompanied by editable telemetry callout cards citing verified GCP Project IDs/Numbers (`ramp-portal-dev` `#248990048888`, `nitinagga-ge-2` `#638420508320`), Cloud Run revisions, BigQuery RLS policies, KMS HSM keys, and HTTP 200 log traces.
- **100% Accurate & Brand-Compliant**: Enforce the sequential Google Quad-Color rule (`1. Blue #4285F4` → `2. Red #EA4335` → `3. Yellow #FBBC04` → `4. Green #34A853`), `Google Sans` / `Google Sans Display` (`#3C4043`) + `Roboto` (`#5F6368`) + `Roboto Mono` / `Courier New` typography, `#F8F9FA` / `#DADCE0` (`8px` radius) neutral containers, `"Proprietary + Confidential"` on every slide footer, and Widescreen `16:9` (`720pt × 405pt` / `10.0" × 5.625"`).

## 2. Produce `slide-outline.md` Using the 3-Act 13-Slide Cohesive Story Arc
Generate a structured `slide-outline.md` assigning **exactly one distinct semantic layout or architectural visual archetype per slide** across the 3-Act narrative arc (`Slide 1: title-cover` $\rightarrow$ `Slide 2: decomposed-drawio-diagram [Figure 1]` $\rightarrow$ `Slide 3: quad-metrics` $\rightarrow$ `Slide 4: architecture-zone-topology` $\rightarrow$ `Slide 5: payload-transformation-triptych` $\rightarrow$ `Slide 6: uml-sequence-swimlane` $\rightarrow$ `Slide 7: async-state-flow-pipeline` $\rightarrow$ `Slide 8: three-pillar [Stack & Use Cases]` $\rightarrow$ `Slide 9: comparison-grid [Trade-Off & Verification Matrix]` $\rightarrow$ `Slide 10: live-screenshot-callout` $\rightarrow$ `Slide 11: phased-roadmap-timeline` $\rightarrow$ `Slide 12: strategic-operating-model-pillars` $\rightarrow$ `Slide 13: next-steps`), weaving together the **6 Native Editable Architectural Visual Archetypes**, **Grounded Live Screenshot Callout Slides**, and **6 Executive Semantic Layouts**:

### A. The 6 Canonical Native Editable Architectural Visual Archetypes
1. `three-zone-architecture` (`architecture-zone-topology` — **3-Zone End-to-End Enterprise Boundary & Gateway Architecture**):
   - **Zone 1 (Left — Client / Caller / AI Plane)**: Light gray `#F8F9FA` container with `#0F2942` border (`1.75pt`), bold centered 2-line `Google Sans` header (e.g., `GEMINI ENTERPRISE & VERTEX AI (Webhooks & User Interface)`), 3 stacked caller components with vector icons (`Gemini Web User Interface`, `Vertex AI Workbench`, `External API Clients`), and orthogonal fan-in collector lines (`Webhooks (HTTPS)`) converging into a single `HTTPS Endpoint` entry arrow.
   - **Zone 2 (Center — Cloud Run / Gateway Control Plane)**: Light `#F8F9FA` outer boundary with `#0D7A75` teal border (`1.75pt`), inner `#EBEEF2` `Google Cloud Run` container with official chevron badge, and 3 vertically chained white rounded cards (`#FFFFFF`, border `#DADCE0`) with vector icons and vertical/branching arrows:
     1. `Payload Sanitizer` (Shield + Broom icon)
     2. `Schema / Case Normalizer` (Server + Gear icon)
     3. `HMAC / DPoP Token Security` (Padlock + Key icon)
   - **Inter-Zone Bridge Connector**: Horizontal arrow from Zone 2 to Zone 3 labeled above (`Validated & Normalized Payload`) and below (`Secure Interconnect / VPC Peering / Private Service Connect`).
   - **Zone 3 (Right — Sovereign Enterprise VPC / Data Plane)**: Outer `#F8F9FA` boundary with `#0D7A75` teal border wrapping an inner Deep Navy (`#0B2545` / `#0F2942`) sovereign VPC container, containing 3 stacked white rounded cards (`#FFFFFF`) with vector icons and bidirectional arrows (`SDK / Runtime Adapter` $\rightarrow$ `Internal Domain Agents (Agent 1, Agent 2)` $\leftrightarrow$ `Enterprise Database / State Store`).

2. `payload-transformation` (`payload-transformation-triptych` — **3-Stage Before/After Wire Payload & Schema Transformation Triptych**):
   - **Left Card (Incoming Unsanitized / Contaminated Request)**: Crisp white `#FFFFFF` rounded card with Semantic Alert Red border (`#EA4335` / `#D93025`, `1.75pt`), centered bold 2-line `Google Sans` header, red horizontal divider rule, and structured monospace JSON (`Roboto Mono` / `Courier New`) with native rounded highlight token pills:
     - Soft blue pill (`#D2E3FC`): metadata/header key (e.g., `"adk_metadata"` or `"$schema": "draft/2020-12"`)
     - Soft coral pill (`#FAD2CF`): stringified/unfiltered block (e.g., `<stringified text blocks>` or `<body: {} unconstrained>`)
     - Solid red pill (`#EA4335` with white text): omitted/spoofed token (e.g., `<omitted tool IDs>` or `<error -32042 elicitation/create>`)
   - **Center Card (Cloud Run Normalization / Policy Engine)**: Deep Teal-Blue (`#1B5E7B`) rounded container (`8px` radius) with bold white 2-line `Google Sans` header (`Cloud Run Normalization Engine`) and an inner translucent panel (`#3B7A96`) displaying 3 stacked processing stage labels (`AST Pruner`, `Text Unwrapper`, `HMAC Sealer`) flanked by coral (`#EA4335` `→`) and teal (`#1B5E7B` `→`) directional arrows.
   - **Right Card (Clean Compliant Canonical Payload)**: Crisp white `#FFFFFF` rounded card with Semantic Success Green border (`#34A853` / `#1E8E3E`, `1.75pt`), centered bold 2-line `Google Sans` header (`Clean GxP Compliant Payload`), green horizontal divider rule, and clean deterministic JSON-RPC 2.0 / canonical schema output.

3. `swimlane-sequence` (`uml-sequence-swimlane` — **5-Actor Numbered UML Sequence Lifeline & Dormant/Review Window Diagram `1..6`**):
   - **Top Actor Header Bar**: 5 evenly spaced actor columns (`User`, `Gemini Enterprise (AI)`, `API Gateway`, `A2UI Portal (UI)`, `Cloud Run Service`) with top vector icons, bold `Google Sans` titles, horizontal timeline axis, circular lifeline anchor dots (`●`), vertical lifeline stems, and colored vertical activation bars (`#0F2942`, `#0D7A75`, `#54728C`).
   - **Large Bold Numbered Steps (`1`–`6` in `24pt–28pt` `Google Sans Display`)**:
     - `1`: Synchronous prompt dispatch (`User prompts Gemini Enterprise` + `User Query →`).
     - `2`: Gateway data fetch + self-loop (`Gateway fetches clinical/tenant data and seals HMAC/OBO token`).
     - `3`: UI card render arrow (`A2UI card displayed in UI` + `Decision Review Card →` with checklist icon).
     - `4`: Shaded gray horizontal dormancy band (`#E2E8F0`) spanning lifelines (`Scale to 0 (Dormant)` with clock icon and bottom bracket `|-- 48-Hour / Async Review Period --|`).
     - `5`: Human-in-the-loop actor icon + interactive `[ Click 👆 ]` button badge (`Approver clicks Approve in UI` + `Click Approve →`).
     - `6`: Fast wake-up + dual self-verification loops (`Verify HMAC Token (0.084ms)`, `Write Audit Log (21 CFR Part 11)`) + database cylinder (`Audit Log`).

4. `roadmap-timeline` (`phased-roadmap-timeline` — **3-Phase Connected Enterprise Technology Roadmap Timeline**):
   - **3 Large Connected Horizon Cards** (`#F8F9FA` body, `8px` radius, matching bottom accent bar) with solid colored top header banners (`Phase 1: Option 1` in Deep Navy `#0F2942`, `Phase 2: Option 2` in Deep Teal `#0D7A75`, `Phase 3: Option 3` in Slate Blue `#54728C`).
   - **Midline Circular Timeline Connectors (`●  ●`)** bridging Card 1 $\leftrightarrow$ Card 2 and Card 2 $\leftrightarrow$ Card 3.
   - **Card Interior**: Centered bold `Google Sans` architecture title + timeframe subtitle (`(Months 1-3)`, `(Months 4-6)`, `(Months 7-12)`), centered horizontal accent divider rule (`───`), and 2-line bottom executive value outcome (`Fast-Track Pilot / 0 Downstream Changes`, `High-Throughput / HTTP/2 Streaming`, `Sovereign VPC / Clinical Reasoning`).

5. `async-state-machine` (`async-state-flow-pipeline` — **4-Node Horizontal Asynchronous Processing Flow for Long Tasks `>5 min` & Loopback**):
   - **4 Solid Colored Actor Blocks** arranged horizontally across the midline:
     - `Node 1` Deep Navy (`#12355B`, e.g., `Gemini Enterprise`)
     - `Node 2` Amber Gold (`#CA8A04`, e.g., `Cloud Run Gateway`)
     - `Node 3` Teal (`#0D7A75`, e.g., `Google Cloud Pub/Sub Topic`)
     - `Node 4` Deep Green (`#0F766E`, e.g., `Internal Sovereign Worker`)
   - **5 Numbered Directional Transitions (`1..5`)**:
     - `1.` Top forward arrow (`Node 1 → Node 2`): Caller sends request.
     - `2.` Bottom reverse arrow (`Node 2 → Node 1`): Gateway returns immediate `HTTP 202 Accepted / State: WORKING`.
     - `3.` Forward arrow (`Node 2 → Node 3`): Gateway publishes task to `Google Cloud Pub/Sub Topic`.
     - `4.` Forward arrow (`Node 3 → Node 4`): Internal Worker processes deep research / long-running data.
     - `5.` Bottom orthogonal U-shaped loopback connector (`Node 2 ↓ ← ↑ Node 1`): Gateway dispatches out-of-band HTTPS Webhook Push with A2UI card back to caller.

6. `operating-model-pillars` (`strategic-operating-model-pillars` — **3-Pillar Strategic Operating Model Cards with Top/Bottom Accent Bars & Vector Icons**):
   - **3 Tall White/Light-Gray (`#FFFFFF` / `#F8F9FA`) Rounded Cards** (`#DADCE0` border) with matching 6pt top and bottom colored accent bars (`#0F2942` Navy, `#0D7A75` Teal, `#54728C` Slate), centered top vector icon badge (`Shield` for Stability/Security, `Handshake` for Engineering Sync & SLA, `Code </>` for Protocol Co-Design), centered 2-line bold `Google Sans` title with timeframe (`(Weeks 1-2)`, `30-Day SLA`, `(Q1-Q2)`), and 3 left-aligned bullet points with colored circular bullets (`•`).

### B. Grounded Live Screenshot Callout Layout
7. `grounded-screenshot-proof` (`live-screenshot-callout` — **Authentic Product & Cloud Console Screenshot Proof Slide**):
   - Embeds real, verified Google Cloud Console, Gemini Enterprise, or AWS screenshots (`createImage` / `slide.addImage`) inside a clean browser/console frame alongside native editable `#F8F9FA` callout cards, numbered verification badges (`01`..`04` in Google Quad-Color order), live GCP project/resource IDs, and HTTP 200 / CLI proof metrics.

### C. The 6 Executive Semantic Layouts
8. `title-cover`: Title (`Google Sans Display #3C4043`), subtitle (`Roboto #5F6368`), author/team metadata, date, 4 Quad-Color summary pills (`#4285F4`, `#EA4335`, `#FBBC04`, `#34A853`), and `"Proprietary + Confidential"` footer.
9. `quad-metrics`: 2–4 KPI tiles (`#F8F9FA`, border `#DADCE0`) with prominent `44pt–48pt` `Google Sans Display` (`#3C4043`) numbers and 1-line `Roboto` (`#5F6368`) captions in strict Quad-Color order.
10. `three-pillar`: 3 structured neutral container cards (`#F8F9FA`, border `#DADCE0`) with Quad-Color top bars and badges.
11. `comparison-grid`: 2-column comparative layout or multi-row trade-off matrix (`#F8F9FA` cards, zero raw markdown backticks) with a bottom takeaway bar.
12. `section-divider`: Dark charcoal background (`#202124`) with white `Google Sans Display` typography and Quad-Color top bar.
13. `next-steps`: Sequenced action items (`STEP 01..04`) with explicit owners in strict Quad-Color order.

## 3. Execution & Mandatory 8-Dimension Forensic Verification (`100/100` PASS)
- Invoke the Google Slides API (`presentations.create` + `presentations.batchUpdate`), server-side Google Workspace refresh-token bridge (`sync_google_workspace_bridge.py` / `scripts/generate_ws1_google_slides_design_plugin_deck.ts`), or `gslides` workspace tool to render all architectural diagrams as **100% native editable shapes, connectors, and text boxes** alongside embedded high-resolution `16:9` product screenshots (`5.35" × 3.01"`, `0` vertical stretching) and role-label-only attribution (`0` personal names).
- Route all standalone Draw.io edge-label vertices (`lbl_*`) through `pendingEdgeLabels` with opaque white `roundRect` pill fills (`fill: { color: 'FFFFFF' }`, `line: { color: 'DADCE0', width: 0.4 }`) and 7-way AABB candidate offsets so connector lines never cut through text.
- Always run `npx tsx scripts/evaluate_google_slides_deck_all_dimensions.ts` (`100/100` across `D1` 2D AABB Non-Overlap, `D2` 1:1 Visual Archetype Completeness & `0` Unicode cartoon emojis, `D3` Domain Grounding Purity, `D4` Screenshot-to-Callout Factual Consistency & `16:9` Aspect Ratio, `D5` 100% Native Vector Editability, `D6` Google Brand & Typography Compliance, `D7` Pill/Chrome Containment, and `D8` Role-Label-Only Attribution) and visually inspect rendered PNG slide previews before completion.

