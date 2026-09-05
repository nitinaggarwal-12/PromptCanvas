<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🎨 Layout & Typography Rules (Desktop Monitors)

* **Zero Surrounding Empty Space Law (Strict Viewport Breadth)**:
  - When creating new pages, views, document readers, or studio panels, **NEVER** restrict main containers to narrow centered grids (`max-w-4xl`, `max-w-5xl`, `max-w-6xl` with `mx-auto`) that introduce empty white/slate side gutters on desktop screens.
  - Always enforce full-width utilization (`w-full max-w-none` or spacious `max-w-8xl` / `max-w-[1600px]`) with responsive horizontal padding (`p-6 md:p-8` or `px-10 md:px-12`).
  - Child elements, cards, and tables must expand edge-to-edge within their parent layout, utilizing the entire monitor screen without awkward dead voids.
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

* **Autonomous Issue Remediation (Zero Approval Pauses for Fixes)**: To fix an issue, defect, or missing requirement, NEVER ask for user approval. Immediately fix it, evaluate it, and if the same or other issues are found, continue fixing and iterating in an autonomous loop until the goal is 100% achieved.
* **No Auto-Advancing on New Phases**: Always pause and present a comprehensive validation step before moving on to unrelated downstream phases.
* **Seed Verification**: Always verify database or session pre-seeding so test runners execute cleanly in clean browser sessions.
* **Visual Gallery Review**: Offer a walkthrough of captured screenshots and code changes during the validation step so the user can visually confirm design integrity before moving forward.

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
  - Perform an HTTP request (`curl -s <live_url>`) to search the delivered HTML/JS asset for a **unique string literal** present only in the newly added code changes to confirm CDN cache invalidation before reporting completion.

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
18. **Mandatory GCP Prompt-to-Architecture Anti-Drift & Semantic Guardrail Gate**:
    - **Intent Classification Separation**: All user prompts targeting Google Cloud diagrams must pass through `classifyChatIntent`. Informational queries (e.g., questions regarding missing components, data flows, security posture) MUST be routed to Architecture Advisory & Gap Analysis, returning identified gaps and 1-click upgrade pills without mutating the diagram or creating spurious versions.
    - **Cross-Cloud Vendor Entity Normalization**: When prompts reference third-party cloud primitives (e.g., AWS S3, DynamoDB, Lambda, SQS, EKS, Azure Blob), they MUST automatically normalize to native Google Cloud components (`Cloud Storage`, `Cloud Spanner`, `Cloud Run`, `Pub/Sub`, `GKE Autopilot`) and render using official GCP vector SVGs from `src/lib/gcpIcons.ts`.
    - **Negative Intent & Decoupling Protection**: When prompts specify removals, replacements, or exclusions (e.g., "remove X", "decouple Y", "without database"), the engine MUST NEVER match positive keywords to add duplicate services. It must decouple, isolate, or annotate nodes with red-dashed boundaries (`fillColor=#FEF2F2;strokeColor=#DC2626;dashed=1;`).
    - **Collision-Free Lower-Channel Allocation**: All newly synthesized components must be assigned open coordinates in the lower canvas channel ($y \ge 660, x = 220 + \text{slot} \times 360$) and linked to parent tiers via orthogonal directional connectors (`edgeStyle=orthogonalEdgeStyle;edge="1"`).
    - **XML Sanitization & Immutable Version Snapshotting**: Raw prompt text must be escaped via `escapeXmlText()` before insertion into mxCell attributes to prevent syntax breakage or XSS. Every structural mutation MUST increment the version tree with full 1-click rollback capability.
19. **Mandatory URI Addressability, Deep Linking & Idempotent State Quality Gate**:
    - **Uniform Resource Addressability (Fielding REST Law)**: Every architecture blueprint (`?id=<archId>`), synthesized version snapshot (`?v=<versionTag>`), and diagram variant MUST be uniquely identifiable and addressable via a distinct, stable URI. Users and automated agents must be able to copy, bookmark, or share the URL and land on the exact state.
    - **Component Deep Linking**: Subsystems and microservice cards MUST expose unique identifier hash fragments (`#<element_id>`) for spotlighting, targeted inspection, and cross-team permalinking.
    - **State Persistence & Hydration (Anti-Volatile Session Law)**: Version snapshot trees, synthesized Draw.io XML, and user dialogue history MUST be persisted in client storage (`localStorage` / session cache) keyed by architecture ID and version tag. Page reloads (`window.location.reload()`) MUST hydrate the exact snapshot state rather than collapsing back to baseline v1.0.
    - **Mandatory Idempotent Reload Quality Gate in E2E Suites**: Every automated E2E test suite (Puppeteer) MUST enforce an idempotent reload check:
      1. Assert `page.url()` contains the active version query parameter (`?v=v1.x`).
      2. Execute `await page.reload({ waitUntil: 'networkidle2' })`.
      3. Assert the active version trigger (`#version-selector-trigger`) and canvas DOM elements remain on `v1.x` without resetting to `v1.0`.
      4. Open a clean secondary incognito page with the shared URL and verify exact visual and state parity.

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

# 🧩 Technical Architecture Diagramming & Vector Icon Embedding Laws

18. **Production Platform & Multi-Vendor Vector Icon Embedding Standard**:
    - For all cloud, multi-agent, enterprise SaaS, and database architectures, every service node MUST feature its official vector SVG icon embedded as an inline RFC 2397 `data:image/svg+xml` data URI (`image=data:image/svg+xml,...;imageWidth=24-26;imageHeight=24-26;imageAlign=left;spacingLeft=38-44;`).
    - Reference [`src/lib/gcpIcons.ts`](file:///Users/nitinagga/Documents/PromptCanvas/src/lib/gcpIcons.ts) for Google Cloud and [`src/lib/sapIcons.ts`](file:///Users/nitinagga/Documents/PromptCanvas/src/lib/sapIcons.ts) for SAP Ecosystem (Joule, BTP, APIM, Datasphere, HANA, S/4HANA, SuccessFactors, Concur, Ariba, SAC, Fiori, Cloud Connector).
    - **Zero External HTTP/HTTPS Icon URLs**: Never use unverified external icon CDNs (e.g. `https://api.iconify.design/...`) which break in air-gapped, offline, headless, or security-sandboxed environments.
    - **Zero Generic Emojis & Zero Plain Boxes**: Never substitute enterprise platforms with toy emojis or render recognized vendor services as plain unbranded boxes.

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

24. **Client-Side Edge Router Override & Deterministic Waypoint Law**:
    - **Prohibition of `orthogonalEdgeStyle` with Manual Waypoints**: When manual intermediate waypoints (`<Array as="points">`) are defined on an edge, **NEVER** use `edgeStyle=orthogonalEdgeStyle;`. Draw.io's client-side JavaScript engine (`mxGraph` / `viewer-static.min.js`) treats `orthogonalEdgeStyle` as a dynamic Manhattan auto-router that will discard explicit waypoints if it detects obstacles, auto-routing straight through child nodes or intermediate containers.
    - **Mandatory `edgeStyle=none;rounded=1;` for Deterministic Waypoints**: Always enforce `edgeStyle=none;rounded=1;` whenever intermediate waypoints are specified. This locks the path to strict point-to-point rectilinear segments with smooth rounded corners and prevents client-side algorithmic path deviation.

25. **Edge Label AABB Safety Margins & Container Header Collision Prevention**:
    - **Header Clearance ($\ge 20\text{px}$)**: All connector edge label pills (`<mxPoint as="offset"/>` or relative labels) MUST maintain a minimum vertical clearance of **$20\text{px}$** from all container headers (e.g., VPC networks, subnets, swimlanes, and edge ingress boxes). Connector labels must NEVER hover directly over, intersect, or obscure container title text or CIDR annotations.
    - **Dedicated Corridor Waypoint Routing**: Cross-container ingress lines (e.g. Ingress → Private VPC) must route through dedicated external corridors (e.g., a $25\text{px}$ open gap between the ingress box and VPC border) so that horizontal segments and label badges float in 100% open white space outside container title bars.

26. **Inter-Card Clearance & Badge Channel Pitch Law ($\ge \text{Badge Width} + 20\text{px}$)**:
    - **Zero-Collision Channel Pitch**: Sibling node spacing cannot be validated solely by bounding box non-overlap ($A_x + A_w \le B_x$). If a connector between two adjacent cards carries a label badge, the horizontal or vertical gap between them MUST strictly accommodate the badge:
      $$\text{Channel Gap} = X_{\text{target}} - (X_{\text{source}} + W_{\text{source}}) \ge \text{Badge Width} + 20\text{px}$$
    - Never place a $70\text{px}-100\text{px}$ wide label badge (such as `GPUDirect RDMA 3.2 Tbps` or `TLS 1.3 Handshake`) in a narrow $20\text{px}-25\text{px}$ gap. Expand card gaps to at least $40\text{px}-75\text{px}$ to guarantee collision-free visual margins.

27. **SVG DOM Coordinate & Bounding Box Inspection Mandate (Beyond Text Presence)**:
    - **Prohibition of Text-Only DOM Assertions**: E2E tests (Puppeteer / Playwright) MUST NOT declare a diagram or UI state verified based solely on `innerText.includes(...)` or screenshot generation.
    - **Physical SVG Inspection**: Automated test scripts must inspect the rendered SVG DOM elements inside `#diagram-canvas-card iframe`:
      1. Query rendered `<text>` and `<rect>` elements via `page.evaluate()` or `page.$$()`.
      2. Call `getBoundingClientRect()` on edge label text elements and verify zero mathematical intersection with adjacent container headers or node cards.
      3. Assert that line paths (`<path d="...">`) do not penetrate the inner bounding boxes of non-target child components.
