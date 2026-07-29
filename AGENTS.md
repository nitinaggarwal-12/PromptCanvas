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

# 🚀 Mandatory Git Push Protocol

* **Always Push Commits**: Whenever code changes are staged and committed (`git commit`), you MUST immediately execute `git push` (or `git push origin main`) without exception. Never leave commits solely on the local machine so that live CI/CD deployments (e.g. Railway, Vercel) remain synchronized with the repository.

---

# 🤖 Autonomous Visual & 2D Geometric Collision Audit Protocol (Mandatory Before Validation)

* **No Blind Validation (Text != Visual)**: Never present a visual artifact (UI layout, Draw.io diagram, canvas, or component) to the user for validation based purely on DOM text string assertions or CLI green exit codes. Text presence does not verify geometric alignment, line routing, or visual clarity.
* **Mandatory 2D Bounding Box & Collision Harness**: Before presenting ANY visual task as complete across ANY project, you must build and execute an automated 2D geometric and visual audit script (via Puppeteer E2E or Node canvas) that programmatically verifies:
  1. **Line-to-Box Collision**: Connecting lines, arrows, and SVG paths must NEVER slice horizontally, vertically, or diagonally across intermediate table boxes, cards, or UI components.
  2. **Border Overlap & Margin Safety**: Floating badges, callouts, and child elements must maintain at least a 30px–60px safety margin from container borders. Never allow callout boxes or text labels to sit on top of container borders or outer frames.
  3. **Corridor & Channel Pitch**: Maintain wide-open routing channels (minimum 130px–140px column pitch and 80px row pitch) so connecting lines have dedicated, collision-free routing tracks.
  4. **Text Contrast & Background Pills**: All floating edge labels or badges crossing lines or borders must enforce solid white (`#FFFFFF`) or high-contrast background pills to guarantee 100% legibility.
* **Closed-Loop Autonomous Self-Correction**: If the programmatic collision harness or visual evaluation detects any line overlap, border slicing, or visual clutter, you must autonomously calculate corrected coordinates, update the codebase, re-run the test harness, and repeat the loop until the geometric collision score is **strictly zero** before asking the user for review.

---

# 📐 Universal 2D Sequence Diagram & Zero-Occlusion Guardrails (Mandatory)

* **Maximum 140px Label Width Rule (Mandatory Line Splitting)**:
  - For ANY horizontal edge or line in a Sequence Diagram, Flowchart, or Architecture layout, an edge label MUST NEVER be written as a long single line of text.
  - **The 140px Formula**: Every text string on a horizontal arrow MUST be split across 2 to 3 compact lines using `<br>` so that no single line exceeds ~25 characters (~135px–140px wide).
  - **Why**: Since Draw.io automatically centers edge text at the exact midpoint between `sourcePoint` and `targetPoint`, enforcing a max width of 140px guarantees a **50px–70px safety buffer** on both sides, ensuring labels never horizontally collide with numbered circle badges (e.g., `c1`, `c9`, `c14`) or vertical lifeline columns.
* **30px Minimum Vertical Clear-Zone Rule (Zero Text Occlusion)**:
  - When placing floating note boxes, callout cards, or ReAct boxes above or below horizontal arrow lines, there must be a **minimum 30px vertical separation** (`gapY >= 30px`) between the outer bounding box of the shape and the centerline of the arrow.
  - **Why**: Since a 2-line or 3-line centered text label extends 16px–24px above and below an arrow line, any gap `<30px` (such as an 11px gap) will cause the box to physically sit on top of and occlude the text label. Enforcing `gapY >= 30px` ensures complete vertical isolation and 100% text legibility.
* **Active Channel Exclusion (No Note Boxes in Flight Paths)**:
  - Static explanatory notes or callout boxes MUST NEVER be placed directly inside an active horizontal routing channel between two communicating lifelines.
  - **Why**: Placing note boxes inside active communication channels creates unavoidable collision traps for arrow lines and centered labels. All note boxes must be placed in dedicated external margin columns (e.g., to the far right of the rightmost lifeline `x >= 1530`) or in dedicated, non-routing vertical tiers.
* **Proportional Container & Lifeline Scaling**:
  - Whenever steps are inserted or vertical spacing is expanded to eliminate overlaps, all outer container frames (`gov_network`), vertical dashed lifelines, and execution activation bars must be proportionally extended in height and width so that child elements never spill over or collide with bottom borders.
* **Universal Theme Synchronization & Active-State UX Clarity**:
  - All outer viewport wrappers, radial dot grids, and canvas backgrounds must dynamically synchronize with the active diagram theme (`#FFFFFF` / `#F1F5F9` for Light Theme, `#0F172A` for Dark Theme) to eliminate jarring background contrasts.
  - UI theme toggle buttons must clearly display the **currently active theme** with an explicit label (e.g., `☀️ Light Theme`), rather than ambiguous target-switch wording, so users and visual test suites can instantly verify the running state.

---

# 🛑 STRICT SINGLE-ITEM VISUAL ITERATION MANDATE (GENERATE → INSPECT → FIX → VERIFY → ADVANCE)

* **Zero Batch-Blind Validation**: Never process multiple visual diagrams, pages, or components in a batch loop without physically opening and visually inspecting each item immediately after it is rendered.
* **Strict Iterative Lifecycle (Item-by-Item)**:
  1. **Generate**: Create or update the code/XML for ONE specific item (diagram, page, component).
  2. **Inspect**: Open and visually evaluate the rendered screenshot or page (`view_file`).
  3. **Fix**: If any overlap, improper template fallback, text collision, or defect exists, fix it immediately in code.
  4. **Verify**: Re-render and visually inspect the image again to confirm 100% resolution.
  5. **Advance**: ONLY AFTER the item passes 100% visual verification may you proceed to the next item.
* **CLI Exit Codes != Visual Truth**: CLI success outputs (e.g., `Exit 0`, `Saved: 01.png`) do NOT prove visual correctness or absence of silent fallbacks. Visual image inspection is mandatory.



