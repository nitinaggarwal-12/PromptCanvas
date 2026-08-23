---
name: diagram-generation-engine
description: Comprehensive enterprise skill for compiling, generating, styling, and verifying 100% collision-free Draw.io architecture diagrams, canonical master templates, and high-contrast cloud topologies across Light and Dark themes.
---

# 📐 Diagram Generation Engine & Universal Quality Standard (SKILL.md)

This skill is the master blueprint and universal quality standard for generating, compiling, validating, styling, and repairing Draw.io architecture diagrams across **all diagramming projects, AI prompt generators, canonical master templates, and dynamic customizers**.

Every diagram generated across any system MUST strictly follow these core pillars:

---

## 🏛️ Pillar 1: Technical Invariants & Document Envelopes

1. **Mandatory XML Document Envelope**:
   - Every generated diagram string MUST be wrapped in a standard `<mxfile><diagram><mxGraphModel>` structure. Never emit bare `<mxGraphModel>` or unparented `<mxCell>` fragments.
   ```xml
   <mxfile host="embed.diagrams.net">
     <diagram id="<unique_diagram_id>" name="<Diagram Title>">
       <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF" math="0" shadow="0">
         <root>
           <mxCell id="0"/>
           <mxCell id="1" parent="0"/>
           <!-- All diagram vertex and edge cells go here with parent="1" -->
         </root>
       </mxGraphModel>
     </diagram>
   </mxfile>
   ```

2. **16:9 Ultra-Wide Responsive Viewport Geometry**:
   - Default canvas dimensions are $1600 \times 960\text{px}$ to $1680 \times 1040\text{px}$ (16:9 aspect ratio). Never squash templates into narrow 4:3 or 21:9 viewports in embeds.

3. **Zero External URL / Network Dependencies**:
   - Never reference `https://api.iconify.design/...` or external HTTP image URLs.
   - Always use native vector Unicode emojis and symbols (`🧬`, `🔬`, `🩺`, `⚖️`, `🛡️`, `🏭`, `📊`, `📁`, `✨`, `🔒`, `🏢`, `☁️`, `🤝`, `🏛️`, `🏆`, `🚀`, `🗄️`, `🌐`, `🎧`, `⚙️`, `🎯`, `📥`, `📑`, `🔄`, `📦`, `🔗`, `🧠`) or inline SVGs.

4. **Zero-Mutation Preflight Passthrough for Master Blueprints**:
   - Layout engines and repair sanitizers must recognize structured canonical master blueprints and pass them through with **zero coordinate or geometric mutation**.

5. **Top-Right Brand Block Balance**:
   - Master architecture templates must include the top-right brand block (`🧬 NOVACURA | Transforming Therapies. Improving Lives.`) to maintain balanced visual margins against left titles.

---

## 🔀 Pillar 2: Arrows, Connectors & Routing Geometry

1. **Point-to-Point Connector Straightness & Zero Stepped Jogs**:
   - When connecting between shapes with different heights, widths, or center coordinates, never rely on default `exitY=0.5;entryY=0.5;` with `edgeStyle=orthogonalEdgeStyle;` across narrow gaps, which forces ugly $90^\circ$ steps along container borders.
   - Always compute exact matching entry/exit coordinates ($Y_{\text{exit}} = Y_{\text{entry}}$ or $X_{\text{exit}} = X_{\text{entry}}$) and enforce `edgeStyle=none;` for direct straight point-to-point connectors.

2. **High-Contrast Label Pill Badges**:
   - All edge labels crossing container boundaries MUST use solid white or high-contrast pill badges:
     `labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;fontSize=8;fontStyle=1;fontColor=#0F172A;`

3. **Decision Diamond & Rhombus Offset Geometry**:
   - Horizontal lines entering a Rhombus shape: `lblX = -50, lblY = -18` (positions text 50px before the left tip in 100% open space).
   - Horizontal lines exiting a Rhombus shape: `lblX = 50, lblY = -18` (positions text 50px after the right tip in 100% open space).

4. **Vertical Line Side Offsets**:
   - Position vertical edge labels 28px to the right of connector lines with `lblX = 28, lblY = -10; align=left; spacingLeft=8;` so vertical arrow lines never cut through or cross text.

5. **Mandatory Typed 6-Color Connector Palette**:
   - **Synchronous / Direct Ingestion**: Solid blue (`strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;`)
   - **Asynchronous / Event Stream / CDC**: Dashed orange (`strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;`)
   - **AI Copilot / Vertex RAG Grounding**: Dashed purple (`strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;`)
   - **External Ecosystem / Partner Protocols**: Green (`strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endFill=1;`) with protocol labels (`IDMP`, `FHIR`, `SFTP`, `REST`)
   - **Governance & Policy Oversight**: Dashed slate (`strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=2 4;endArrow=open;`)
   - **Closed-Loop Feedback Returns**: Dashed teal/green (`strokeColor=#0D9488;strokeWidth=1.5;dashed=1;dashPattern=5 5;endArrow=block;`) looping back to source systems.

6. **Sequential Step Number Badges (❶..❻ / 1..6)**:
   - All process flows and data pipelines must feature explicit sequential step number badges showing execution sequence with vertical drop-lines into storage/processing tiers.

7. **Open Routing Corridors & Zero Slicing**:
   - Maintain minimum $140\text{px}$ horizontal column pitch ($gapX$) and $80\text{px}$ inter-row channel pitch ($gapY$). Connector paths must NEVER slice through intermediate cards or table vertices.

---

## 🛡️ Pillar 3: Shapes, Containers & 2D Collision Safety

1. **Rounded Container Corner Insetting ($\ge 20\text{px}$ Margin)**:
   - Any child element or card positioned in the 4 corners of a rounded container (`rounded=1`, border radius $\ge 20\text{px}$) MUST maintain a minimum **$20\text{px} - 24\text{px}$ inset margin** from the container's outer bounds.
   - Never place rectangular child boxes $< 16\text{px}$ from rounded container corners to prevent sharp border clipping over rounded arcs.

2. **2D Bounding Box Collision Auto-Healing**:
   - Layout engines must perform 2D bounding box intersection checks (with 30px safety padding margin) and push overlapping nodes rightward (for same-tier overlaps) or downward (for vertical overlaps).

3. **Container Padding Standards**:
   - Maintain a minimum of $24\text{px} - 32\text{px}$ top padding in outer containers to provide clearance for container headers and icons.

---

## ⏱️ Pillar 4: Sequence Diagrams, Interaction Enclaves & Activity Loops

1. **Discrete $\ge 26\text{px}$ Channel Pitch in Flow Enclaves (`ALT`, `OPT`, `LOOP`, `PAR`)**:
   - In alternative, optional, or loop flow boxes, never combine multi-line text and connector arrows into an ambiguous shared block.
   - Every step inside an enclave MUST use discrete mxCells with exact mathematical vertical offsets ($\ge 26\text{px}$ channel between text top and connector line) so connector lines NEVER slice through text letters or descenders.

2. **Opaque Background Shielding for Enclaves / Floating Containers**:
   - Any floating sub-box, ALT container, or overlay card that sits on top of background lifelines or grid tracks MUST enforce a solid opaque background (`fillColor=#FFFFFF;` or dark mode equivalent `#0B111E`) to prevent background dashed lines from bleeding through and cutting across foreground text and icons.
   - Enforce `verticalAlign=top;` on all enclave text cells to lock character baselines.

3. **Self-Referential Activity Loops (Step ⓳ Style)**:
   - Self-referential processing steps on lifeline activation bars (e.g. `Write logs`, `Compute Embeddings`, `Cache Lookup`) MUST use orthogonal rounded loops exiting and entering the same activation bar edge with high-contrast label pills (`labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2.5;`).

---

## 📊 Pillar 5: Analytical Summary Cards, Semantic Step Badges & Tech Matrix

1. **Zero-Void Proportional Card Item Scaling**:
   - Vertical item padding and bottom margins must be dynamically adjusted according to item count:
     - 4 items: `itemPadding: 6px 8px; itemMargin: 5.5px; fontSize: 9px;`
     - 5 items: `itemPadding: 4px 8px; itemMargin: 4px; fontSize: 8.5px;`
     - 6 items: `itemPadding: 2.5px 6px; itemMargin: 2.5px; fontSize: 8px;`
   - Cards fill their parent container height evenly with zero awkward empty white voids at the bottom.

2. **Semantic Step Badge Palette in Summaries**:
   - Sequence and workflow summary tables MUST use semantic flow coloring for step number badges (❶..⑳) matching the diagram's architecture tiers:
     - **User / Frontend**: Blue (`#1D4ED8`)
     - **Gateway / Network**: Teal (`#0D9488`)
     - **Orchestration / LLM**: Purple (`#7C3AED`)
     - **Policy / Guardrails**: Dark Violet (`#6D28D9`)
     - **Data Services / DB**: Green (`#059669`) / Sky (`#0284C7`)
     - **Audit / Logging**: Cyan / Sky (`#0284C7`)
     - **Returns / Responses**: Slate (`#64748B`)
     - **Error / Policy Block**: Red (`#DC2626`)

3. **Exact Technology Matrix Density Match**:
   - When replicating canonical reference cards (e.g. `TECHNOLOGY STACK`), match the exact reference icon count and 2-row layout (e.g., 4 on top, 2 centered below) with large vector icons (`20px`) and proportional spacing rather than cramming excessive small icons that leave awkward voids.

4. **HTML Entity Encoding & Plain Text Values**:
   - Always escape dynamic text strings: `&` $\to$ `&amp;`, `<` $\to$ `&lt;`, `>` $\to$ `&gt;`, `"` $\to$ `&quot;`.
   - Never wrap edge `value` attributes in unescaped HTML tags.

---

## 🔁 Pillar 6: Automated E2E Headless Chrome Visual Audit Protocol

Before declaring any diagram complete across any project, execute the automated headless Chrome test harness:
```bash
npx tsx scratch/test_canonical_11_20.ts
```
Verify the generated 2x Retina PNG screenshot:
1. Canvas is 100% visible with valid SVG elements.
2. All labels are collision-free, legible, and use high-contrast pill badges.
3. Zero jagged connector jogs along container borders.
4. Zero corner clipping over rounded container boundaries.
5. No cards or text truncated at container boundaries.
6. Zero empty white voids at the bottom of cards.
7. Opaque background shielding on all flow enclaves (`ALT`, `OPT`, `LOOP`).
