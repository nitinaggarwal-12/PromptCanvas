---
name: diagram-decompilation-and-geometry
description: >-
  Decompiles Draw.io XML and SVG diagrams to verify zero bounding-box collisions, 23 edges, and 52px spoke channels.
---

# 📐 Diagram Decompilation & Sharp Geometric Layout Engine

This skill governs the high-fidelity conversion of raster diagram images (PNG, WebP, JPEG, PDF) into interactive Draw.io vector architectures with 100% verbatim textual fidelity and sharp geometric routing.

## 1. The Strict Verbatim Decompilation Law (Zero-Sanitization Mandate)

1. **Zero Text Sanitization or Autocorrect**:
   - When extracting labels, titles, table cells, or text cards from source images, NEVER alter, rephrase, grammar-correct, or sanitize text.
   - Retain all literal typos, spelling idiosyncrasies, repeated words (e.g. `Review Review`, `request request`), OCR tokens (e.g. `Meefow`, `scain`), and technical shorthand.
   - Retain literal stuttered phrasing (e.g. `...for Gantry coordination for Gantry decisions`).

2. **Literal Entity Escaping in Draw.io HTML Labels**:
   - If source text contains `<` or `>` (e.g., `<IMAGE's meetings into a integrated plan`), escaping once as `&lt;` causes browser DOM parsers to treat it as an unclosed custom HTML element, silently hiding all subsequent text.
   - Always double-escape as `&amp;lt;` and `&amp;gt;` (and `&amp;apos;` for `'`) in Draw.io `value` attributes with `html=1` so Draw.io renders the visible literal character `<` on screen.

3. **Container & Box Fidelity**:
   - If a source element is plain text without an enclosure (e.g. `Something is Broken`), render it with `fillColor=none;strokeColor=none;`. Do not invent card borders.
   - If a termination node is an oval / capsule (e.g. `No further action`), style it with `rounded=1;arcSize=50;` rather than a standard rectangle.

---

## 2. Sharp Geometric Connectors Law (Straight & 90° Orthogonal Only)

1. **Zero Diagonal Slants**:
   - Connectors between tiers, swimlanes, or adjacent cards must NEVER travel at arbitrary diagonal angles.
   - Sibling elements connecting horizontally MUST share matching vertical center coordinates:
     $$Y_{\text{source\_center}} = Y_{\text{target\_center}}$$
   - Sibling elements connecting vertically MUST share matching horizontal center coordinates:
     $$X_{\text{source\_center}} = X_{\text{target\_center}}$$

2. **Zero Stepped Doglegs & Jogs**:
   - Eliminate awkward 2px–15px jogs across narrow gaps caused by mismatched coordinate centers.
   - When connecting point-to-point, compute exact matching entry/exit coordinates and enforce `edgeStyle=none;rounded=0;`.

3. **Crisp 90° Orthogonal Multi-Segment Routing**:
   - For multi-segment routes, forks, and brackets, enforce exact $90^\circ$ rectilinear angles (`rounded=0`).
   - Every intermediate waypoint (`<mxPoint>`) must form a pure vertical or horizontal segment with zero diagonal pitch.

4. **Multi-Way Junction Topologies (T-Junction Buses)**:
   - When an ingress line feeds into an ongoing vertical or horizontal pipeline (such as a Helpdesk escalating to a central trunk), route the ingress line horizontally to meet the trunk at an exact $90^\circ$ T-junction.
   - The trunk line must explicitly branch in both designated directions (e.g., upward with $\uparrow$ into an account team, and downward with $\downarrow$ into product engineering).

5. **Closed Return Feedback Loops**:
   - Closed-loop governance, collaboration, or feedback returns must exit the bottom/side of the return node, traverse cleanly along open boundary corridors, turn $90^\circ$, and enter the origin node with an explicit directional arrowhead.

6. **Inked-Pixel (`ctx.getImageData`) Arrow-Label Vertical ("Mid") & Horizontal ("Center") Calibration (`Rule 57C` / `Law 18`)**:
   - Never rely solely on DOM `div` `getBoundingClientRect()` to certify inline arrow labels (`parses`, `enriches`, `verifies types`, `yes`, `no`, `federates`, `uses`, `calls`, `returns results`, `maps`), because browser CSS `line-height` and font ascenders push lowercase `x`-height letters `2px–2.5px` (`4–5` Retina pixels) below the `div` center.
   - Always wrap inline arrow labels in `&lt;span style=&apos;padding:0 2px;&apos;&gt;...&lt;/span&gt;` with `labelBackgroundColor=#ffffff` and apply calibrated `<mxPoint as="offset">` coordinates (`y="-2"` on `11px` labels, `y="-1.5"` on `10px` horizontal labels, `y="-6"` + `line-height:0.9` on vertical `no`, `x="-5"` on rightward arrows, `x="5"` on leftward arrows, `x="0"` on orthogonal return loops) so `|glyph_y_mid - shaft_y_mid| <= 0.5px` and `|left_visible_shaft - right_visible_shaft| <= 1.0px`.

---

## 3. Middle Space Reclamation & Inline Swimlane Component Architecture Law

1. **Zero Detached Ghost Rows**:
   - Bottom summary tables, collaboration cadence matrices, or cross-cutting legends that visually reside within a specific swimlane row MUST NEVER be extruded into detached, floating bottom rows separated by dead vertical voids.

2. **Flanked Horizontal Inline Layout**:
   - Position summary tables inline within the designated swimlane band, horizontally flanked by preceding process steps on the left (e.g. `Step 13: TAR escalation and engage`) and terminal capsules on the right (e.g. `No further action`).

3. **Proportional Pitch Compaction & Overlying Container Flushness**:
   - Reclaim middle vertical whitespace by strictly budgeting swimlane row pitch (e.g. $88\text{px}-95\text{px}$ per standard row) instead of bloated $110\text{px}-130\text{px}$ paddings.
   - Size overlying container enclosures (e.g. Decision Point containers) so their bottom boundary rests flush ($\le 20\text{px}$ clearance) directly above the inline table header, eliminating awkward middle gaps.

4. **Collinear Coordinate Symmetry**:
   - Maintain identical horizontal bounds ($X_{\text{start}}$, $X_{\text{end}}$, and width) between the overlying decision box and the underlying cadence table to preserve clean vertical alignment.

---

## 4. Dynamic Container Shrink-Wrapping & Asymmetric Multi-Column Floor Law

1. **Dynamic Container Height Shrink-Wrap Formula**:
   - Container heights must NEVER be copied or hardcoded to match adjacent taller tiers. Every container height must dynamically wrap its lowest child:
     $$H_{\text{container}} = \max_{i}(Y_{\text{child\_i}} + H_{\text{child\_i}}) - Y_{\text{container}} + \text{Padding}_{\text{bottom}}$$
     where $\text{Padding}_{\text{bottom}} \le 20\text{px}-24\text{px}$. Any unutilized bottom vertical void $> 36\text{px}$ is strictly prohibited and blocked by the Omni Quality Gate.

2. **Asymmetric Multi-Tier Legend & Component Nesting Law**:
   - When architecture columns have asymmetric heights (e.g., Zone 2 compute is taller than Zone 4 managed services), the open space beneath shorter columns MUST be utilized for subordinate blocks (such as the Architecture Protocol Legend or Agentic Loop notes).
   - NEVER push the Legend below the entire canvas into an artificial bottom footer row when an open column floor directly below a shorter container is available.

---

## 5. Pre-Flight Verification & Visual Inspection Protocol

1. Run headless Chrome Puppeteer at $1600 \times 1050$ resolution (`deviceScaleFactor: 2`, opening a fresh `browser.newPage()` per diagram when rendering via `viewer-static.min.js`) to capture:
   - Studio view: `13_studio_editor_verbatim.png`
   - Comparison verification: `18_reclaimed_bottom_alignment_verification.png`
2. Physically assert in the rendered DOM and `2x` Retina canvas (`ctx.getImageData` + `verify_arrow_label_inked_pixel_centering.mjs`):
   - Zero diagonal lines between horizontally adjacent blocks.
   - Zero dead vertical voids between decision containers and inline bottom tables.
   - Zero container bottom voids $> 36\text{px}$.
   - Literal presence of all verbatim string tokens.
   - Exact inked-pixel vertical ("mid", `|glyph_y_mid - shaft_y_mid| <= 0.5px`) and horizontal ("center", `|L_left - L_right| <= 1.0px`) centering of all inline arrow labels with a `2px` white knockout cushion (`padding:0 2px;`).

---

## 6. 2-Stage Hybrid Reference Poster (`gemini-nano-banana-2.1`) $\rightarrow$ Editable Draw.io & Google Slides Decompilation (`src/lib/visionPosterToDrawioDecompiler.ts`)

1. **Mandatory 2-Stage Pipeline**:
   - **Stage 1**: Synthesize the initial reference poster image via `generate_image` (`gemini-nano-banana-2.1`) from the refined prompt and embed it directly in the user-facing artifact.
   - **Stage 2**: Decompile normalized `[ymin, xmin, ymax, xmax]` (`0..1000`) bounding boxes (`NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC`, `NANO_BANANA_ECOMMERCE_MICROSERVICES_VISION_DECOMPILED_SPEC`) via `normalizedBoxToCanvasRect()` into `src/lib/compositionalChainCompiler.ts` and `src/lib/export/editablePptxCompiler.ts`.
   - **Waypoint Coordinate Order (`[nx, ny]`)**: `waypointsNormalized` entries always use `[nx, ny]` (`0..1000` horizontal X first, vertical Y second) so L-shaped orthogonal fan-outs (`/catalog/*` from top of `API Gateway`, `/checkout/*` from bottom of `API Gateway`) route without loopbacks.
   - **Tall Component Card Preservation in `editablePptxCompiler.ts`**: `containerZones` requires `(c.width >= 300 && c.height >= 320)` (never `c.height >= 220`) and `componentCards` allows `c.height <= 280` so tall parent cards (`Next.js 15 Storefront`, `React 19 Single-Page Application`, `API Gateway`) are never misclassified as swimlane containers.

---

## 🛡️ Strict Architectural & Cloud Run Deployment Constraints (All Current & New Projects)

You are configured to work on this repository with strict architectural and deployment constraints. Follow these instructions exactly:

1. **Planning & Immediate Same-Turn Execution (`Rule 28A`):** Formulate a concise 3 to 5 bullet execution plan and **immediately execute all file edits, backend syncs, and quality gates in the exact same turn**. NEVER output a plan or diagnostic gap list and stop to ask *"Shall I apply these fixes?"* or *"Would you like me to proceed?"*.
2. **Strict File Boundaries:**
* Only edit files directly required to complete the assigned task.
* Do not reformat, refactor, or delete unrelated files, functions, or utilities.
* Never edit or commit `.env` files, `.git` internals, or package lockfiles (`package-lock.json`, `poetry.lock`).
3. **No Hallucinations:** Use only verified, actively maintained libraries and standard APIs. Do not invent non-existent parameters, SDK methods, or placeholder mocks.
4. **Cloud Run Runtime Compliance:**
* Web services must listen on host `0.0.0.0`.
* Read the port dynamically from the `PORT` environment variable, defaulting to `8080` if not set. Never hardcode port numbers.
* Handle termination signals cleanly so existing connections finish before shutdown:
* In Node.js: `process.on('SIGTERM', ...)`
* In Python: `signal.signal(signal.SIGTERM, ...)`
5. **Quality and Test Gates:**
* Run local linting, type-checking, and unit tests immediately after modifying code.
* Fix all errors before presenting the task as complete.
6. **Deployment Target (Rule 56 Mandatory Synchronous 2-Project Pipeline):**
* Never run `gcloud run deploy <service> --source . --project=ramp-portal-dev` (corporate IAM blocks `storage.buckets.create`).
* Always build in `nitina-ggarwal-sandbox-647724` and update the service in `ramp-portal-dev` (`us-west1`) synchronously:
```bash
gcloud builds submit --project=nitina-ggarwal-sandbox-647724 \
  --tag us-central1-docker.pkg.dev/nitina-ggarwal-sandbox-647724/cloud-run-source-deploy/<service>:<TAG> .
gcloud run services update <service> \
  --project=ramp-portal-dev \
  --region=us-west1 \
  --image=us-central1-docker.pkg.dev/nitina-ggarwal-sandbox-647724/cloud-run-source-deploy/<service>:<TAG>
```

