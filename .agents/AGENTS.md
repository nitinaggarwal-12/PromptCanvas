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
