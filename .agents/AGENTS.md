# Custom Rules for Antigravity in PromptCanvas

## 🧠 Mandatory Gemini Prompt-to-Architecture Generation Protocol
* **Core Mandate**:
  1. Whenever designing, redesigning, enhancing, or generating architecture diagrams, topologies, or blueprint PNG images in PromptCanvas, **ALWAYS** call the Gemini model (`gemini-3.1-pro-preview` / `gemini-2.5-flash`) with complete prompts, domain instructions, component topologies, and numbered data flow sequence rules.
  2. Synthesize, validate, and enrich the full architecture graph and Draw.io XML using the complete prompt context before rendering the final high-resolution PNG images.
  3. Adhere strictly to the requested visual theme (Light Executive `#F8FAFC` or Deep Slate-Midnight `#0B111E`) with numbered data flow step labels on every connector.

---

## 🎨 Enterprise Architecture Design Standards
* **Light Executive Theme**: Pristine off-white `#F8FAFC` background, white container cards (`#FFFFFF` with `#CBD5E1` borders and drop shadows), dark navy left header pods (`#1E293B` / `#1E3A8A` with bold white lettering), and high-contrast dark text with official Google Cloud SVG product icons.
* **Deep Slate-Midnight Theme**: Pure `#0B111E` background, dark frosted container rows (`#0F172A` with `#1E293B` borders), dark left header pods (`#182338` with `#3B82F6` borders and bold white lettering), and glowing `#60A5FA` orthogonal arrows.
* **Data Flow Numbering**: Every edge must convey explicit, numbered data flow steps (`1. Ingestion` $\rightarrow$ `2. CDC Sync` $\rightarrow$ `3. Transformation` $\rightarrow$ `4. Validation` $\rightarrow$ `5. Consumption`).

---

## 🏛️ Canonical Blueprint Immutability & Preflight Passthrough Protocol
* **Master Ground-Truth Reference (`images/01.png` – `images/37.png`)**:
  Every canonical template in `src/lib/canonical/` MUST replicate the visual structure, column pitch, row pitch, color-coded chevrons, role pods, and decision gates of its corresponding master image in `images/` with 100% fidelity.
* **Zero-Mutation Preflight Passthrough**:
  `validateAndHealDrawioXml` and `preflightVerifyAndHealXmlAcrossAll6Audits` MUST ALWAYS recognize canonical diagrams (`archType.startsWith('canonical')`, `NOVACURA`, `template_0`, etc.) as structured master diagrams and pass them through with **ZERO coordinate or geometric mutation**.
* **16:9 Aspect Ratio Preservation**:
  Canonical and master templates are engineered for `16:9` (1440x800 / 1485x800) aspect ratio. Never squash them into `21:9` viewports in modals or embeds.
* **Valid `<mxfile><diagram>` Envelope**:
  Every canonical template generator MUST emit a complete `<mxfile host="embed.diagrams.net"><diagram id="..." name="..."><mxGraphModel ...>...</mxGraphModel></diagram></mxfile>` document structure to prevent Draw.io viewer wrapping artifacts.

