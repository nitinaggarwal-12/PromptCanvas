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
