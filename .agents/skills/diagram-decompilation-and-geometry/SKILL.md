---
name: diagram-decompilation-and-geometry
description: High-precision multimodal diagram decompilation, 100% literal verbatim text extraction, sharp geometric arrow routing (straight & 90-degree orthogonal only), and zero-slant/zero-dogleg layout laws.
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

1. Run headless Chrome Puppeteer at $1600 \times 1050$ resolution to capture:
   - Studio view: `13_studio_editor_verbatim.png`
   - Comparison verification: `18_reclaimed_bottom_alignment_verification.png`
2. Physically assert in the rendered DOM:
   - Zero diagonal lines between horizontally adjacent blocks.
   - Zero dead vertical voids between decision containers and inline bottom tables.
   - Zero container bottom voids $> 36\text{px}$.
   - Literal presence of all verbatim string tokens.

