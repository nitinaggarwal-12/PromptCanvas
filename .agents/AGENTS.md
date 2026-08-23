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

### 7. Automated Headless Chrome Visual Audit Verification
* Before presenting ANY visual task or diagram as complete, run the automated Puppeteer test harness to render the SVG, capture high-resolution screenshots into `scratch/screenshots_<task_id>/`, and physically verify that:
  1. The diagram renders completely without blank canvas errors.
  2. All text strings, titles (using clean pipe `|` separators), and icons are visible and un-truncated.
  3. No line collisions, overlapping knots, or unstyled empty boxes exist.

---

### 8. Mandatory Git Push Protocol
* Whenever code changes are committed (`git commit`), immediately execute `git push origin main` without exception so that live production environments remain synchronized.
