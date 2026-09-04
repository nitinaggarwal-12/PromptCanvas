# Custom Rules for Antigravity in PromptCanvas

## 🧠 Master Diagram Generation & Quality Laws (Permanently Encoded in Brain)

### 1. Mandatory `<mxfile><diagram>` Document Envelope
* Every architecture diagram generated or modified by ANY system (Gemini prompt compiler, canonical generator, master builder, AI customizer, or clean variant) MUST be enclosed in a valid XML document envelope:
  ```xml
  <mxfile host="embed.diagrams.net">
    <diagram id="template_id" name="Diagram Title">
      <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF" math="0" shadow="0">
        <root>
          <mxCell id="0"/>
          <mxCell id="1" parent="0"/>
          <!-- Cells go here -->
        </root>
      </mxGraphModel>
    </diagram>
  </mxfile>
  ```
* **Strict Prohibition**: Never return un-enveloped raw `<mxGraphModel>` or loose `<mxCell>` tags, which cause blank canvas rendering in `viewer-static.min.js` and iframe viewports.

---

### 2. Zero External URL & Network Dependencies
* Never use `https://api.iconify.design/...` or unverified external HTTP image URLs inside HTML labels.
* Always use native vector Unicode symbols/emojis (`🧬`, `🔬`, `🩺`, `⚖️`, `🛡️`, `🏭`, `📊`, `📁`, `✨`, `🔒`, `🏢`, `☁️`, `🤝`, `🏛️`, `🏆`, `🚀`, `🗄️`, `🌐`, `🎧`, `⚙️`, `🎯`, `📥`, `📑`, `🔄`, `📦`, `🔗`, `🧠`) or embedded inline SVGs to ensure 100% offline and headless rendering reliability.

---

### 3. Collision-Free 2D Geometric Routing & High-Contrast Pill Badges
* **Channel & Corridor Pitch**: Maintain minimum $140\text{px}$ horizontal column pitch and $80\text{px}$ inter-row channel pitch.
* **Label Pill Badges**: All connector labels that traverse or touch container boundaries MUST have solid white or high-contrast pill backgrounds:
  `labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;fontSize=8;fontStyle=1;`
* **Zero Slicing**: Connecting lines, arrows, and SVG paths must NEVER slice horizontally, vertically, or diagonally across intermediate table boxes, cards, or diamond vertices.
* **Single Crisp Directional Connectors**: Avoid overlapping lines or duplicate arrowheads on bidirectional connectors. Use explicit single orthogonal directional connectors.

---

### 4. 16:9 Ultra-Wide Responsive Viewport Geometry
* **Standard Resolution**: Default canvas dimensions are $1600 \times 960\text{px}$ to $1680 \times 1040\text{px}$ (16:9 aspect ratio).
* **Proportional Scaling**: Headers (`fontSize=24`), Subheaders (`fontSize=13`), Card Titles (`fontSize=9.5 - 10.5`), Card Descriptions (`fontSize=7.5 - 8.5`), and Badges (`fontSize=8`).
* **Void Minimization**: Card heights and vertical gaps must be tightly proportioned so that item pills and text fill cards evenly without large empty spaces or awkward clipping.

---

### 5. Strict Separation of Domain Flavoring vs. Spatial Geometry
* Dynamic use case flavoring (`injectUseCaseFlavor`) mutates text titles, card descriptions, and badges while preserving 100% of spatial coordinates (`<mxGeometry x="..." y="...">`).

---

### 6. Canonical Blueprint Immutability & Zero-Mutation Preflight Passthrough
* **Master Ground-Truth Reference (`images/01.png` – `images/37.png`)**: Every canonical template in `src/lib/canonical/` MUST replicate the visual structure, column pitch, row pitch, color-coded chevrons, role pods, and decision gates of its corresponding master image in `images/` with 100% fidelity.
* **Zero-Mutation Preflight Passthrough**: `validateAndHealDrawioXml` and `preflightVerifyAndHealXmlAcrossAll6Audits` MUST ALWAYS recognize canonical diagrams (`archType.startsWith('canonical')`, `NOVACURA`, `template_0`, etc.) as structured master diagrams and pass them through with **ZERO coordinate or geometric mutation**.

---

### 7. Mandatory Typed Connectors, Step Sequences & Closed Feedback Loops
* **Step Numbers & Flow Sequence**: All process workflows, data pipelines, lifecycle maps, and integration architectures MUST feature explicit sequential step number badges (❶..❻ / 1..6) showing what happens when, with drop-lines or chained orthogonal edges.
* **Typed Connectors Palette**:
  - *Synchronous / Direct API / Data Ingestion*: Solid blue (`#2563EB` / `#1D4ED8`, `strokeWidth=1.5 - 2`).
  - *Asynchronous / Event Stream / CDC*: Dashed orange/amber (`#EA580C` / `#D97706`, `dashed=1;dashPattern=6 4`).
  - *AI Copilot / Vertex RAG / Grounding*: Dashed purple (`#7C3AED` / `#9333EA`, `dashed=1;dashPattern=4 4`).
  - *External Ecosystem / Protocol Exchanges*: Green (`#16A34A` / `#059669`) with high-contrast protocol pill badges (`IDMP`, `FHIR`, `SFTP`, `REST`).
  - *Governance / Policy Oversight*: Dashed slate/purple (`#64748B`, `dashed=1;dashPattern=2 4`).
  - *Closed-Loop Feedback Returns*: Dashed teal/green (`#0D9488` / `#16A34A`, `dashed=1;dashPattern=5 5`) looping back to source systems.

---

### 8. Point-to-Point Connector Straightness & Zero Stepped Jogs
* When connecting between shapes with different heights, widths, or center coordinates, never use default `exitY=0.5;entryY=0.5;` with `edgeStyle=orthogonalEdgeStyle;` across narrow gaps, which forces ugly $90^\circ$ steps along container borders.
* Always compute exact matching entry/exit coordinates ($Y_{\text{exit}} = Y_{\text{entry}}$ or $X_{\text{exit}} = X_{\text{entry}}$) and enforce `edgeStyle=none;` for direct straight point-to-point connectors.

---

### 9. Rounded Container Corner Insetting & Margin Safety ($\ge 20\text{px}$)
* Any child element or card positioned in the 4 corners of a rounded container (`rounded=1`, border radius $\ge 20\text{px}$) MUST maintain a minimum **$20\text{px} - 24\text{px}$ inset margin** from the container's outer bounds.
* Never place rectangular child boxes $< 16\text{px}$ from rounded container corners to prevent sharp border clipping over rounded arcs.

---

### 10. Zero-Void Proportional Card Item Scaling & Brand Header Balance
* Vertical item padding (`itemPadding: 6px 8px` for 4 items, `4px 8px` for 5 items, `2.5px 6px` for 6 items) and item margins must be dynamically adjusted so cards fill their parent container height evenly with zero awkward empty white voids.
* Master architecture templates must include the top-right brand block (`🧬 NOVACURA | Transforming Therapies. Improving Lives.`) to maintain balanced margins against left titles.

---

### 11. Sequence Diagram & Flow Enclave (ALT / OPT / LOOP / PAR) Discrete Channel & Shielding Law
* **Discrete $\ge 26\text{px}$ Channel Pitch**: In alternative (`ALT`), optional (`OPT`), loop (`LOOP`), or parallel (`PAR`) enclaves, never combine multi-line text and connector arrows into a shared HTML block. Every step inside an enclave MUST use discrete mxCells with exact mathematical vertical offsets ($\ge 26\text{px}$ channel between text top and connector line) so connector lines NEVER slice through text letters or descenders.
* **Opaque Background Shielding**: Floating sub-boxes, ALT containers, or overlay cards that sit on top of background lifelines or grid tracks MUST enforce a solid opaque background (`fillColor=#FFFFFF;` or dark mode equivalent `#0B111E`) to prevent background lines from bleeding through and cutting across foreground text and icons.
* **Strict Top Alignment**: Enforce `verticalAlign=top;` on all enclave text cells to lock character baselines against connector arrows.

---

### 12. Self-Referential Activity Loops (Step ⓳ Style)
* Self-referential processing steps on lifeline activation bars (e.g. `Write logs`, `Compute Embeddings`, `Cache Lookup`) MUST use orthogonal rounded loops exiting and entering the same activation bar edge with high-contrast label pills (`labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2.5;`).

---

### 13. Semantic Step Badge Palette in Summaries
* Sequence and workflow summary tables MUST use semantic flow coloring for step number badges (❶..⑳) matching the diagram's architecture tiers:
  - **User / Frontend**: Blue (`#1D4ED8`)
  - **Gateway / Network**: Teal (`#0D9488`)
  - **Orchestration / LLM**: Purple (`#7C3AED`)
  - **Policy / Guardrails**: Dark Violet (`#6D28D9`)
  - **Data Services / DB**: Green (`#059669`) / Sky (`#0284C7`)
  - **Audit / Logging**: Cyan / Sky (`#0284C7`)
  - **Returns / Responses**: Slate (`#64748B`)
  - **Error / Policy Block**: Red (`#DC2626`)

---

### 14. Exact Technology Matrix Density Match
* When replicating canonical reference cards (e.g. `TECHNOLOGY STACK`), always match the exact reference icon count and 2-row layout (e.g., 4 on top, 2 centered below) with large vector icons (`20px`) and proportional spacing rather than cramming excessive small icons that leave awkward voids.

---

### 15. Mandatory Git Push Protocol
* Whenever code changes are committed (`git commit`), immediately execute `git push origin main` without exception so that live production environments remain synchronized.

---

### 16. Mandatory Ground-Truth Structural Parity Quality Gate
* Never declare a canonical blueprint complete based solely on compilation (`tsc`) or clean rendering (`svg.length > 0`).
* Every template MUST be audited against an explicit feature checklist derived from its reference image in `images/`, verifying:
  1. Exact element and microservice card count in each tier/zone.
  2. All sub-diagram enclaves (e.g. Deployment Patterns in CI/CD, Failover Flow, Replication Buses).
  3. Decision diamonds, branch outcomes (`Yes` / `No`), and closed feedback return loops.
  4. Complete cross-cutting enablers, security controls, and CIDR/network annotations.
  5. Side-by-side screenshot review against the ground-truth image before marking complete.

---

### 17. Mandatory Official GCP Native Architecture Vector Icons Mandate
* For all Google Cloud architectures and components, **NEVER** use generic emojis (such as `👑`, `⚡`, `🔑`, `🛡️`, `📊`, `🚀`, `🗄️`, `✨`) as service icons.
* Always import and use authentic vector SVGs from `src/lib/gcpIcons.ts` (`GCP_OFFICIAL_ICONS` / `renderGcpIconHtml`):
  - **Gemini / DeepMind Core**: Official 4-point gradient Gemini diamond (`gemini`).
  - **Vertex AI / Vector Search**: Official Vertex AI (`vertex_ai`) and ScaNN Vector Search (`vertex_vector_search`).
  - **Document AI / GCS**: Official Document AI (`document_ai`) and Cloud Storage (`cloud_storage`).
  - **Compute / Orchestration**: Official GKE Autopilot (`gke_autopilot`), Cloud Run (`cloud_run`), and Compute Engine (`compute_engine`).
  - **Databases & Cache**: Official BigQuery (`bigquery`), Cloud Spanner (`spanner`), and Cloud Memorystore (`memorystore`).
  - **Security & Zero Trust**: Official Cloud Armor (`cloud_armor`), Identity-Aware Proxy (`iap`), Sensitive Data Protection / DLP (`cloud_dlp`), VPC Service Controls (`vpc_sc`), and Security Command Center (`scc`).
  - **Operations & CI/CD**: Official Cloud Logging (`cloud_logging`), Cloud Monitoring (`cloud_monitoring`), and Google Cloud Deploy (`cloud_deploy`).

---

# 🏛️ Core Architectural Tenets: Visual Clarity, Technical Accuracy & Logical Flow

1. **Visual Clarity Law**:
   - **Zero Surrounding Empty Space Law (Strict Viewport Breadth)**: When adding or refactoring new pages, document readers, workspaces, or studio panels, **NEVER** constrain main wrappers with narrow centered grids (`max-w-4xl`, `max-w-5xl`, `max-w-6xl` with `mx-auto`) that introduce empty side gutters on desktop monitors. Always enforce full-width utilization (`w-full max-w-none` or spacious `max-w-8xl` / `max-w-[1600px]`) with proportional horizontal padding (`p-6 md:p-8` or `px-10 md:px-12`). Child cards, tables, and document sections must expand edge-to-edge with zero dead voids.
   - **Viewport Auto-Fit Containment**: Diagram viewports must always enforce `allowFullScaleScroll={false}` and `fit=true` to guarantee 100% visual containment without viewport clipping on ultra-wide or high-DPI displays.
   - **Clean Markdown Parsing**: Never dump raw markdown asterisks (`**`) into JSX text nodes. Always parse markdown into styled typography tags.
   - **Collated Telemetry Disclosure**: Encapsulate real-time Gemini API logs in clean, collapsible accordions (`<details>`).
   - **High-Contrast Interactive Actions**: Action controllers (`Copy XML`, `Reset Stage`) must maintain WCAG AA contrast against background containers.

2. **Technical Accuracy Law**:
   - **Native GCP Vector SVGs**: Use authentic Google Cloud vector icons (`renderGcpIconHtml`) for all cloud services.
   - **Informative Technical Specifications**: Include protocols, SLAs, and SQL DDL snippets on architecture cards; never output empty cards.
   - **Zero-Mutation Studio 3 Passthrough**: Protect first-principles XML from geometric or coordinate mutation in preflight filters.

3. **Logical Flow Law**:
   - **Sequential Step Sequences**: Use explicit step number badges (❶..⓴) for horizontal pipelines.
   - **Typed Connector Semantics**: Enforce distinct visual styles (Solid Blue = API, Dashed Orange = Stream, Dashed Purple = RAG, Green = Protocol, Dashed Teal = Feedback).
   - **Collision-Free Channel Routing**: Connector lines must never slice through intermediate cards or text labels.

---

# 🔄 Mandatory Closed-Loop Validation & Auto-Healing Law (Prompt-to-Canvas Gate)

1. **Zero-Defect Delivery Mandate**:
   - Every prompt execution (initial synthesis or iterative refinement) MUST run the full 4-Phase Quality Validator (`evaluateStudio3Quality`) immediately following layout solving.
   - If ANY score deduction, AABB spatial collision, unescaped entity, or viewport violation is detected, the engine must execute automated self-healing passes to resolve all issues before emitting the finalized Draw.io XML to the canvas.
2. **Pre-Delivery Certification Gate**:
   - Never stream or return an unverified or failing diagram state to the client canvas. The canvas must only render diagrams with `certified: true` (Overall Score $\ge 75$, 0 collisions, 100% viewport containment).

---

# 🔗 Permanent Deep-Link & Unique ID Addressability Law

1. **Full-Page Deep Links Over Ephemeral Popups**:
   - All diagram viewers, AI generation studios, audit inspectors, and editing workspaces MUST be full-page destinations with distinct, shareable URLs and persistent UUIDs (e.g., `/studio3?id=<uuid>`, `/diagrams/[id]`).
   - NEVER isolate core workflows into transient popup modals that vanish on browser refresh or prevent direct link sharing.
2. **Continuous State & URL Synchronization**:
   - All synthesized diagrams and conversational turns must automatically persist to the database and update the browser address bar with their unique ID.
   - Direct page reloads or deep-link navigation to `/studio3?id=<id>` must seamlessly restore the exact diagram, chat history, and configuration with zero state loss.

---

# 🧪 Autonomous Headless Puppeteer E2E & Visual Screenshot Verification Mandate

* **Mandatory Post-Change E2E Automation**: After making ANY code change (frontend, backend API, layout, or database) in any project, you MUST automatically execute an asynchronous headless Puppeteer E2E test script in the background.
* **Deterministic Execution & Installed Chrome**: Always run headless with the installed Chrome executable (`executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'`) or Cloudtop browser to bypass workstation security blockers.
* **DOM Verification & String Match**: Physically inspect the live browser DOM and assert that modified components, text strings, and layout attributes actually rendered and responded to interactions.
* **Clean Screenshot Storage Protocol**:
  1. Store all captured visual artifacts in a dedicated task folder: `<project_root>/scratch/screenshots_<task_id>/`.
  2. Purge stale images before running tests (`rm -rf scratch/screenshots_<task_id>/`).
  3. Produce uniquely named screenshots capturing each visual state transition (e.g. `01_initial_load.png`, `02_user_interaction.png`).
* **Visual Gallery Delivery**: Include clickable `file://` Markdown links to all captured screenshots in your response so the user can visually inspect and confirm UI integrity.
* **Zero CLI-Only Assumptions**: Never declare a feature or fix complete based purely on exit code `0` or compilation without visual browser DOM verification.

---

# 📸 Local-First Development, Before/After Visual Review & Deferred Git Commit Law

* **Strict 3-Step Execution Sequence**:
  1. **Step 1: Local Implementation & Verification**:
     - Apply code changes strictly on local workspace files.
     - Verify compilation (`npx tsc --noEmit`) and local runtime (`http://localhost:3000`).
  2. **Step 2: Mandatory Before & After Screenshots**:
     - Run headless Puppeteer in the background to capture visual screenshots before (or baseline) and after the changes.
     - Store artifacts in `<project_root>/scratch/screenshots_<task_id>/`.
     - Present both `Before` and `After` screenshots to the user using clickable `file://` markdown links.
  3. **Step 3: Deferred Git Commit & Push**:
     - Only execute `git commit` and `git push origin main` AFTER successful local validation and screenshot presentation.
     - Trigger the 1-minute Railway deployment monitoring loop post-push.

---

# 🚀 Independent Live Deployment Verification & Railway Monitoring Protocol

* **Santa Workstation Blocker Bypass for Railway CLI**:
  - Never execute the raw `railway` CLI binary directly on the local macOS workstation to avoid Santa security policy blocks.
  - Execute `railway` CLI operations via **Cloudtop** (`rw nitinagga.c.googlers.com`) or use Railway REST/GraphQL API & live HTTP endpoint polling.
* **Mandatory Post-Push Deployment Polling**:
  - Immediately following any `git push origin main` (or Railway deployment kickoff), initiate an automated background monitoring loop.
* **1-Minute Cadence Status Updates**:
  - Check Railway deployment status / build progress / live endpoint health at **1-minute intervals** (`every 1 min`).
  - Report concise progress to the user at each interval (e.g. `[Min 1] Building container...`, `[Min 2] Next.js compilation...`, `[Min 3] Container healthy & deployed to https://promptcanvas.up.railway.app`).
* **Independent Live String Verification**:
  - Never declare a Railway or Vercel deployment "live" based purely on CLI exit codes (`0`) or dashboard green status badges.
  - # 🧩 Technical Architecture Diagramming & Vector Icon Embedding Laws

18. **Production Platform & Tool Vector Icon Embedding Standard**:
    - For all cloud, multi-agent, enterprise SaaS, and database architectures, every service node MUST feature its official vector SVG icon embedded as an inline RFC 2397 `data:image/svg+xml` data URI (`image=data:image/svg+xml,...;imageWidth=24-26;imageHeight=24-26;imageAlign=left;spacingLeft=38-44;`).
    - Reference [`src/lib/gcpIcons.ts`](file:///Users/nitinagga/Documents/PromptCanvas/src/lib/gcpIcons.ts) for Google Cloud and [`src/lib/sapIcons.ts`](file:///Users/nitinagga/Documents/PromptCanvas/src/lib/sapIcons.ts) for SAP Ecosystem (Joule, BTP, APIM, Datasphere, HANA, S/4HANA, SuccessFactors, Concur, Ariba, SAC, Fiori, Cloud Connector).
    - **Zero External HTTP/HTTPS Icon URLs**: Never use unverified external icon CDNs (e.g. `https://api.iconify.design/...`) which break in air-gapped, offline, headless, or security-sandboxed environments.
    - **Zero Generic Emojis & Zero Plain Boxes**: Never substitute enterprise platforms with toy emojis or render them as plain unbranded boxes.

19. **True Technical Depth & Production Specificity Law**:
    - Architecture diagrams must depict concrete production infrastructure: explicit VPC subnets, CIDR blocks (`10.128.0.0/16`), security perimeters (VPC-SC), private ingress/egress endpoints (PSC, Direct VPC Egress), transport protocols (`JSON-RPC over mTLS`, `gRPC :443`, `Delta Sharing`, `SNC Encryption`), exact container runtimes (Cloud Run, Kyma K8s), and hardware/DB deployment modes (Multi-AZ HSR, High-Availability Clusters).
    - Avoid superficial generic box-and-arrow diagrams that omit production network boundaries, encryption layers, or concrete data transfer mechanisms.

20. **Strict Container Vertical Fill Ratio & Void Elimination Law ($\ge 85\%$ Fill Ratio)**:
    - Every container column (e.g. Ingress, VPC Subnets, On-Prem Core) must calculate:
      $$\text{Fill Ratio} = \frac{\sum \text{Child Heights} + \sum \text{Gaps}}{\text{Container Inner Height}} \ge 85\%$$
    - Never leave $>40\text{px}$ of dead void at the bottom of any container column.
    - If child elements stop short, either scale card heights/gaps proportionally to fill the parent container smoothly, or populate the complete production infrastructure baseline (such as HA System Replication, Dedicated Interconnect, Certificate Manager, Security Command Center, and Web Dispatcher).

21. **Geometric Waypoint Highway Planning & Zero Text Intersection**:
    - Cross-tier connector lines spanning across columns MUST route through designated open inter-row channels (e.g. gaps between cards) with explicit intermediate waypoints (`<mxPoint x="..." y="...">`).
    - Line paths must maintain a minimum **$12\text{px}$ safety margin** from all card boundaries, container headers, subheaders, and character descenders. Never route lines through the text bounding box of a card or container title.

22. **Conceptual Architecture Abstraction & The 4-Flow Taxonomy Law**:
    - **Capability & Boundary Level Abstraction**: Conceptual diagrams MUST operate strictly at the capability and boundary level. They strip away infrastructure mechanics (no VPCs, CIDRs, session cookies, web servers, low-level SDK package paths, or code blocks) to highlight intent, business value, and domain relationships.
    - **Four Canonical Conceptual Flows**: Conceptual value streams and interaction models MUST be structured around the four canonical flows:
      1. **User Journey Flow (Experience Flow)**: Focuses on high-level persona interaction, primary objectives, and ingress entry points without detailing session cookies or web servers.
      2. **Business Process Flow (Value Stream)**: Maps business capability coordination, domain events, and milestones (e.g., Order Submission → Payment Authorization → Inventory Allocation).
      3. **Domain Data Flow**: Shows macroscopic information movement across bounded contexts (e.g., Raw Research Data → Feature Store → Analytical Model → Reporting Dashboard).
      4. **Enterprise Integration Flow**: Defines coarse-grained boundary handoffs to external third parties, legacy ERPs, or partner ecosystems.
    - **Strict Abstraction Guardrail**: Technical details (CIDRs, TLS handshakes, SDK method calls) must be strictly reserved for Technical / Infrastructure diagrams and must NEVER pollute Conceptual diagrams.

23. **Autonomous Closed-Loop E2E Verification & Ground-Truth Data Validation Law (Zero-Assumption & Blindspot-Free Mandate)**:
    - **Repeated Autonomous Loop Execution (Until Zero Defects)**:
      - E2E testing and quality validation must NEVER be a single-pass check. Test suites and browser automation journeys MUST execute in an automated closed loop:
        $$\text{Execute Harness} \longrightarrow \text{Detect Exact Failures/Blindspots} \longrightarrow \text{Auto-Patch Code} \longrightarrow \text{Re-verify Harness}$$
      - The loop MUST run repeatedly until **all issues of any kind are fully eliminated** and 100% of assertions pass with zero failures, zero spatial collisions, and zero visual or functional defects.
    - **Zero-Assumption Law (Metadata Is Not Reality)**:
      - **NEVER** assume a feature works, a diagram renders, or an API succeeds based on metadata, proxy signals, or exit codes:
        - ❌ Do NOT rely on CLI exit code `0`.
        - ❌ Do NOT rely on HTTP `200 OK` responses.
        - ❌ Do NOT rely on metadata flags (`certified: true`, `status: "ok"`).
        - ❌ Do NOT rely on coarse length checks (`svg.length > 0` or `file.size > 0`).
      - **Mandatory Actual Data Validation**: Actual delivered data must be rigorously validated against criteria and guidelines:
        - Physically inspect live DOM trees for exact text string literals, child element counts, and expected attributes.
        - Verify exact mathematical geometry: bounding box coordinates, channel pitch ($\ge 80\text{px}$), label offsets, and zero AABB visual intersections.
        - Validate actual pixel rendering through pixel-by-pixel visual diffs against ground-truth master templates.
    - **Exhaustive Blindspot Coverage**:
      - The test harness must deliberately probe and cover all blindspots:
        1. *Boundary States*: Empty payloads, max-width string wraps, unescaped XML/HTML entities, and edge-case failure modes.
        2. *Responsive & Aspect Ratios*: Verification across Mobile (390px), Tablet (834px), Desktop (1440px), and Ultra-Wide (1600px+), plus dynamic aspect ratio morphing (`16:9`, `9:16`, `1:1`, `21:9`).
        3. *Dynamic State & Theme Shifts*: Full dark/light theme switching, 800ms settled DOM transitions, and post-reload URL state restoration (`/studio3?id=<uuid>`).
        4. *Embedded Viewport Verification*: Physically assert that child elements inside third-party viewports (`<iframe>`, canvas, SVG) actually re-rendered with mutated attributes.
