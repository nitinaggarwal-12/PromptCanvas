<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🎨 Layout & Typography Rules (Desktop Monitors)

* **Reclaim Empty Margins (Wide Widths)**: By default, design portals and landing pages to use spacious desktop widths (`max-w-8xl` (1440px) or `max-w-[1600px]`) instead of standard narrow grids (`max-w-5xl`, `max-w-7xl`). Utilize adequate padding (`px-12 md:px-16` or `px-10 md:px-12`) to optimize viewing on ultra-wide desktop monitors.
* **Proportional Object & Typography Scaling (Always)**: When expanding container widths, you must scale up all layout components, typography, and visual assets proportionally to maintain structural balance:
  - **Typography**: Main headers (`text-4xl` -> `text-5xl` or `text-6xl`), text descriptions (`text-xs`/`text-sm` -> `text-sm`/`text-base`), and data counters (`text-xl` -> `text-3xl` or `text-4xl`).
  - **Gaps & Padding**: Layout vertical/horizontal padding (`py-10 px-8` -> `py-14 px-12 md:px-16`) and grid spacing (`gap-4` -> `gap-6` or `gap-8`).
  - **Controls & Buttons**: Buttons padding (`px-4 py-2 text-xs` -> `px-6 py-2.5 text-sm` / `px-8 py-4 text-base`) and input fields.
  - **Icons & Images**: Vector icons (`w-3.5 h-3.5` -> `w-4 h-4` or `w-5 h-5`) and static media assets (`width={400}` -> `width={500}`).
* **Sticky Full-Width Navbars**: Sticky headers (`sticky top-0`) must be constructed with a full-width background wrapper (`w-full bg-... backdrop-blur-...`) to ensure the blur/fill bleeding is edge-to-edge, centering the actual menu controls within the page alignment constraint (e.g. `max-w-8xl mx-auto px-6 md:px-12`).

---

# 📁 Project Workspace Artifact & File Storage Protocol

* **Workspace-First Storage**: Always create all project-related scratch scripts, test automation tools, data files, and visual screenshots inside the active project workspace (`scratch/` or subdirectories inside the active workspace root), rather than in system app data or temporary system folders.
* **Clickable Project File Links**: When presenting screenshot artifacts or generated files to the user, always provide clickable Markdown file links using the `file://` scheme pointing directly to the project workspace path (e.g. `[01_dashboard.png](file:///path/to/workspace/scratch/screenshots/01_dashboard.png)`).
* **Gitignore Hygiene**: Ensure the workspace `.gitignore` excludes `scratch/` or temporary screenshot directories to avoid cluttering git history while keeping artifacts accessible to the user in their project workspace.

---

# 🎯 Anti-Hallucination, Research-First & Screenshot Quality Protocol

* **Research Before Coding**: When unsure about API signatures, framework updates, or complex features, consult internal documentation (`node_modules/next/dist/docs/`, codebase Knowledge Items) or web search to verify exact patterns before writing code to prevent hallucination.
* **No Duplicate Screenshots & Clean Purging**: 
  - Each distinct UI state transition must produce exactly **one** uniquely named screenshot (e.g. `01_settings_default.png`, `02_search_results.png`).
  - Always programmatically purge the target run subfolder (`rm -rf scratch/screenshots_<task>/`) *before* executing a test suite to eliminate duplicate or stale images.
* **Dedicated Task Directory**: Always store artifacts in a dedicated new subfolder inside the active workspace project directory (`<project_root>/scratch/screenshots_<task_id>/`).
* **Direct DOM Verification**: Never rely solely on CLI exit codes; physically inspect the returned HTML or Puppeteer DOM tree for explicit string literals before declaring a feature complete.

---

# 🛡️ Validation-First & Quality Gate Protocol

* **No Auto-Advancing**: Always pause and present a comprehensive validation step (including screenshot walkthroughs, DOM verification, and code diffs) before moving on to the next implementation phase. Never auto-start writing code for downstream phases without explicit user approval.
* **Seed Verification**: Always verify database or session pre-seeding so test runners execute cleanly in clean browser sessions.
* **Visual Gallery Review**: Offer a walkthrough of captured screenshots and code changes during the validation step so the user can visually confirm design integrity before moving forward.

---

# ☁️ Cloudtop & Installed Browser Mandate for Testing

* **Cloudtop & Installed Chrome Paths for Testing**: Always use Cloudtop (`rw nitinagga.c.googlers.com`) or explicitly set `executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'` in Puppeteer launch configs.
* **Bypass Unverified Binary Blockers**: Never rely on default unverified `Google Chrome for Testing` downloads, which get blocked by workstation Santa security policies.

---

# 🧪 E2E Settling Delays & Animation Synchronization

* **Mandatory 800ms Settling Delays**: Always inject a minimum **800ms synchronization delay** (`await sleep(800)`) immediately after clicking tab switches, drawers, or modal controllers to allow React state updates and CSS transitions to settle before screenshot capture.
* **DOM-Level Clicks**: Prefer direct DOM clicks (`page.$eval(selector, el => el.click())`) over physical mouse coordinate clicks for spotlighted elements to prevent click interception by overlay masks.
* **Node-Level Sleep for Reloads**: When an action triggers a full page reload (`window.location.reload()`), use Node.js timeouts (`await sleep(2000)`) instead of `page.evaluate()`, which crashes when the execution context is destroyed.
* **Dynamic UI Control & Embedded Viewport Verification**: Never assume updating a React state variable automatically re-renders embedded third-party viewports (e.g. `<iframe>`, `canvas`, WebGL, Draw.io SVG viewports). When adding interactive dropdowns or state controls, verify that:
  1. The component is not cached by `React.memo` or static `iframe` DOM element references without a dynamic `key` prop (`key={xml}`).
  2. A background E2E Puppeteer test script executes DOM interaction clicks (`page.select()` / `page.click()`), waits for settling (`await sleep(800)`), and verifies that child element attributes (e.g., node coordinates, SVG elements) physically mutated in the live browser DOM.
* **Aspect Ratio & Viewport Container Resizing**: When adding aspect ratio controls (`16:9`, `4:3`, `1:1`, `9:16`, `21:9`, `Custom`), verify that BOTH the node XML coordinates AND the outer iframe wrapper container frame (`containerDimensions`) dynamically morph shape on screen.
* **2D Bounding Box Visual Collision Auto-Healing**: All diagram XML generators and layout engines MUST perform 2D bounding box intersection checks (with 30px safety padding margin) and push overlapping nodes rightward (for same-tier overlaps) or downward (for vertical overlaps) before rendering.

---

# 🗄️ Dual Database Safeguard Protocol (SQLite vs PostgreSQL)

* **Dual-Engine Type Compatibility**: Ensure SQLite integer booleans (`0` / `1`) cleanly map to PostgreSQL boolean values (`true` / `false`) across API handlers and RLS helpers.
* **Foreign Key Pragmas**: Always execute `PRAGMA foreign_keys = ON;` in SQLite connections to mirror PostgreSQL constraint enforcement.
* **Migration Safety**: Always use `ADD COLUMN IF NOT EXISTS` syntax when adding table columns across environments.

---

# 🚀 Independent Live Deployment Verification Protocol

* **No CLI Exit Code Assumptions**: Never declare a Railway or Vercel deployment "live" based purely on CLI exit codes (`0`) or dashboard green status badges.
* **Live HTTP String Verification**: Perform an HTTP request (`curl -s <live_url>`) to search the delivered HTML/JS asset for a **unique string literal** present only in the newly added code changes to confirm CDN cache invalidation.

---

# 🧰 Registered Workspace Skill Trigger Index

* **`diagram-generation-engine`**: Triggered when compiling, generating, styling, or repairing Draw.io architecture diagrams, canonical master templates, and high-contrast cloud topologies.
* **`ui-first-design-system`**: Triggered when designing or refactoring UI components, cards, layouts, micro-interactions, or dark glassmorphic panels.
* **`visual-regression-testing`**: Triggered when running automated pixel-by-pixel image diffing (`pixelmatch`) to verify CSS & visual layout integrity.
* **`cross-viewport-auditor`**: Triggered when auditing responsive UI breakpoints across Mobile (390px), Tablet (834px), and Ultra-Wide Desktop (1600px+).
* **`ai-prompt-evals`**: Triggered when modifying Gemini LLM prompt templates, Draw.io XML graph generators, or prompt-to-architecture compilers.
* **`security-code-scanner`**: Triggered when conducting SAST static security analysis, SVG XSS audit checks, or dependency CVE scanning.
* **`performance-and-telemetry`**: Triggered when profiling client Core Web Vitals (LCP, CLS, TTFB) or Railway server container health logs.
* **`database-schema-guard`**: Triggered when editing database tables, SQL schemas, migrations, or SQLite/Postgres RLS rules.
* **`load-and-stress-testing`**: Triggered when running concurrent multi-user load tests on API route handlers or rate-limiting middleware.

---

# 🔁 Harness & Autonomous Loop Engineering Protocol

* **Automated Test Harness Scaffolding**: Every feature modification must run inside an automated test harness (Puppeteer E2E, TypeScript compiler `npx tsc --noEmit`, SAST scanner, or DB schema drift guard) executing asynchronously in the background.
* **Closed-Loop Self-Correction**: When an error, failing test, or visual regression is detected by the harness:
  1. Capture diagnostic logs and visual screenshot deltas into `<project_root>/scratch/screenshots_<task_id>/`.
  2. Analyze the root cause autonomously without asking the user to debug or write fix code.
  3. Implement targeted code corrections in the codebase.
  4. Re-run the test harness to independently verify resolution before presenting final validation to the user.
* **Deterministic Environment Scaffolding**: Never rely on unseeded, mutable browser state. The harness must pre-seed database auth sessions (`dev.db`), warm up dev server routes, and programmatically purge target screenshot directories prior to test execution.

---

# 🦉 Recursive Multi-Agent Orchestration (`/owl` & `/goal`)

* **Master Orchestration (`owl`)**: For complex, multi-phase coding projects, trigger the `owl` subagent or `/owl` slash command to recursively decompose goals into sub-tasks, spawn specialized child subagents (`define_subagent` + `invoke_subagent`), and evaluate completion recursively.
* **Goal Execution (`/goal`)**: Use `/goal` for long-running, autonomous missions where the agent loops continuously through testing, self-correction, and verification until 100% complete.

---

# 📐 Draw.io Edge Routing & Label Offset Protocol

* **Plain Text Edge Labels & Transparent Backgrounds**: Never wrap edge `value` attributes in `<font color="#ffffff">` or `<div>` HTML tags. Always set `labelBackgroundColor=none;` and enforce `fontColor=#38BDF8;fontStyle=1;fontSize=11;` for dark mode or `fontColor=#0F172A` for light mode.
* **Rhombus Tip Offset Rule**:
  - Horizontal lines entering a Rhombus shape: `lblX = -50, lblY = -18` (positions text 50px before the left tip in 100% open space).
  - Horizontal lines exiting a Rhombus shape: `lblX = 50, lblY = -18` (positions text 50px after the right tip in 100% open space).
* **Vertical Line Side Offsets (`lblX = 28, lblY = -10`)**: Position edge labels 28px to the right of vertical connector lines with `align=left;spacingLeft=8;` so vertical arrow lines never cut through or cross text.
* **140px Column Pitch & Open Inter-Row Channel Routing**: Maintain a minimum $140\text{px}$ horizontal gap between columns (`gapX = 140px`) and route cross-tier/cross-column lines through open inter-row channel waypoints (`gapY = 80px`). Labels float $16\text{px}$ above horizontal channel segments in open space.
* **Canvas Dark/Light Theme Synchronization**: Sync container backgrounds, iframe document bodies, and edge text contrast colors across Dark (`#0F172A`) and Light (`#FFFFFF`) themes.

---

# 🏛️ Canonical Blueprint Immutability & Master Architecture Rules

1. **Master Ground-Truth Reference (`images/01.png` – `images/37.png`)**:
   - Every canonical template in `src/lib/canonical/` MUST replicate the visual structure, column pitch, row pitch, color-coded chevrons, role pods, and decision gates of its corresponding master image in `images/` with 100% fidelity.
2. **Zero-Mutation Preflight Passthrough**:
   - `validateAndHealDrawioXml` and `preflightVerifyAndHealXmlAcrossAll6Audits` MUST ALWAYS recognize canonical diagrams (`archType.startsWith('canonical')`, `NOVACURA`, `template_0`, etc.) as structured master diagrams and pass them through with **ZERO coordinate or geometric mutation**.
3. **16:9 Aspect Ratio Preservation**:
   - Canonical and master templates are engineered for `16:9` (1440x800 / 1485x800 / 1600x960) aspect ratio. Never squash them into `21:9` viewports in modals or embeds.
4. **Mandatory `<mxfile><diagram>` Envelope**:
   - Every diagram generator MUST emit a complete `<mxfile host="embed.diagrams.net"><diagram id="..." name="..."><mxGraphModel ...>...</mxGraphModel></diagram></mxfile>` document structure.
5. **Zero External URL Dependencies**:
   - Never use `https://api.iconify.design/...` or unverified external HTTP image URLs inside HTML labels. Always use native vector Unicode symbols/emojis or inline SVGs.
6. **High-Contrast Pill Badges for Connectors**:
   - All connector labels that traverse or touch container boundaries MUST have solid white or high-contrast pill backgrounds (`labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;fontSize=8;fontStyle=1;`) to guarantee 100% collision-free legibility.
7. **Mandatory Typed Connectors, Step Sequences & Closed Feedback Loops**:
   - **Step Numbers & Flow Sequence**: All process workflows, data pipelines, lifecycle maps, and integration architectures MUST feature explicit sequential step number badges (❶..❻ / 1..6) showing what happens when, with drop-lines or chained orthogonal edges.
   - **Typed Connectors Palette**:
     - *Synchronous / Direct API / Data Ingestion*: Solid blue (`#2563EB` / `#1D4ED8`, `strokeWidth=1.5 - 2`).
     - *Asynchronous / Event Stream / CDC*: Dashed orange/amber (`#EA580C` / `#D97706`, `dashed=1;dashPattern=6 4`).
     - *AI Copilot / Vertex RAG / Grounding*: Dashed purple (`#7C3AED` / `#9333EA`, `dashed=1;dashPattern=4 4`).
     - *External Ecosystem / Protocol Exchanges*: Green (`#16A34A` / `#059669`) with high-contrast protocol pill badges (`IDMP`, `FHIR`, `SFTP`, `REST`).
     - *Governance / Policy Oversight*: Dashed slate/purple (`#64748B`, `dashed=1;dashPattern=2 4`).
     - *Closed-Loop Feedback Returns*: Dashed teal/green (`#0D9488` / `#16A34A`, `dashed=1;dashPattern=5 5`) looping back to source systems.
8. **Point-to-Point Connector Straightness & Zero Stepped Jogs**:
   - When connecting between shapes with different heights, widths, or center coordinates, never use default `exitY=0.5;entryY=0.5;` with `edgeStyle=orthogonalEdgeStyle;` across narrow gaps, which forces ugly $90^\circ$ steps along container borders.
   - Always compute exact matching entry/exit coordinates ($Y_{\text{exit}} = Y_{\text{entry}}$ or $X_{\text{exit}} = X_{\text{entry}}$) and enforce `edgeStyle=none;` for direct straight point-to-point connectors.
9. **Rounded Container Corner Insetting & Margin Safety ($\ge 20\text{px}$)**:
   - Any child element or card positioned in the 4 corners of a rounded container (`rounded=1`, border radius $\ge 20\text{px}$) MUST maintain a minimum **$20\text{px} - 24\text{px}$ inset margin** from the container's outer bounds.
   - Never place rectangular child boxes $< 16\text{px}$ from rounded container corners to prevent sharp border clipping over rounded arcs.
10. **Zero-Void Proportional Card Item Scaling & Brand Header Balance**:
    - Vertical item padding (`itemPadding: 6px 8px` for 4 items, `4px 8px` for 5 items, `2.5px 6px` for 6 items) and item margins must be dynamically adjusted so cards fill their parent container height evenly with zero awkward empty white voids.
    - Master architecture templates must include the top-right brand block (`🧬 NOVACURA | Transforming Therapies. Improving Lives.`) to maintain balanced margins against left titles.
11. **Sequence Diagram & Flow Enclave (ALT / OPT / LOOP / PAR) Discrete Channel & Shielding Law**:
    - **Discrete $\ge 26\text{px}$ Channel Pitch**: In alternative (`ALT`), optional (`OPT`), loop (`LOOP`), or parallel (`PAR`) enclaves, never combine multi-line text and connector arrows into a shared HTML block. Every step inside an enclave MUST use discrete mxCells with exact mathematical vertical offsets ($\ge 26\text{px}$ channel between text top and connector line) so connector lines NEVER slice through text letters or descenders.
    - **Opaque Background Shielding**: Floating sub-boxes, ALT containers, or overlay cards that sit on top of background lifelines or grid tracks MUST enforce a solid opaque background (`fillColor=#FFFFFF;` or dark mode equivalent `#0B111E`) to prevent background lines from bleeding through and cutting across foreground text and icons.
    - **Strict Top Alignment**: Enforce `verticalAlign=top;` on all enclave text cells to lock character baselines against connector arrows.
12. **Self-Referential Activity Loops (Step ⓳ Style)**:
    - Self-referential processing steps on lifeline activation bars (e.g. `Write logs`, `Compute Embeddings`, `Cache Lookup`) MUST use orthogonal rounded loops exiting and entering the same activation bar edge with high-contrast label pills (`labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2.5;`).
13. **Semantic Step Badge Palette in Summaries**:
    - Sequence and workflow summary tables MUST use semantic flow coloring for step number badges (❶..⑳) matching the diagram's architecture tiers:
      - **User / Frontend**: Blue (`#1D4ED8`)
      - **Gateway / Network**: Teal (`#0D9488`)
      - **Orchestration / LLM**: Purple (`#7C3AED`)
      - **Policy / Guardrails**: Dark Violet (`#6D28D9`)
      - **Data Services / DB**: Green (`#059669`) / Sky (`#0284C7`)
      - **Audit / Logging**: Cyan / Sky (`#0284C7`)
      - **Returns / Responses**: Slate (`#64748B`)
      - **Error / Policy Block**: Red (`#DC2626`)
14. **Exact Technology Matrix Density Match**:
    - When replicating canonical reference cards (e.g. `TECHNOLOGY STACK`), always match the exact reference icon count and 2-row layout (e.g., 4 on top, 2 centered below) with large vector icons (`20px`) and proportional spacing rather than cramming excessive small icons that leave awkward voids.
15. **Mandatory Git Push Protocol**:
    - Whenever code changes are committed (`git commit`), immediately execute `git push origin main` without exception so that live production environments remain synchronized.
16. **Mandatory Ground-Truth Structural Parity Quality Gate**:
    - Never declare a canonical blueprint complete based solely on compilation (`tsc`) or clean rendering (`svg.length > 0`).
    - Every template MUST be audited against an explicit feature checklist derived from its reference image in `images/`, verifying:
      1. Exact element and microservice card count in each tier/zone.
      2. All sub-diagram enclaves (e.g. Deployment Patterns in CI/CD, Failover Flow, Replication Buses).
      3. Decision diamonds, branch outcomes (`Yes` / `No`), and closed feedback return loops.
      4. Complete cross-cutting enablers, security controls, and CIDR/network annotations.
      5. Side-by-side screenshot review against the ground-truth image before marking complete.
17. **Mandatory Official GCP Native Architecture Vector Icons Mandate**:
    - For all Google Cloud architectures and components, **NEVER** use generic emojis (such as `👑`, `⚡`, `🔑`, `🛡️`, `📊`, `🚀`, `🗄️`, `✨`) as service icons.
    - Always import and use authentic vector SVGs from `src/lib/gcpIcons.ts` (`GCP_OFFICIAL_ICONS` / `renderGcpIconHtml`):
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

