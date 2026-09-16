---
name: universal-document-cloud-hub
description: Universal in-browser document preview, transformation, and 1-click cloud editor bridge across all enterprise formats (Google Slides/PPTX, Google Sheets/XLSX, Google Docs/Word, PDF, Flat CSV, Draw.io/Architecture XML, JSON) with zero-download live editing, Gmail-style preview bars, and multi-sheet data grid viewers.
---

# 📑 Universal Document & Cloud Workspace Hub Skill

This skill provides architectural standards, UI design patterns, and cross-format export pipelines for previewing and editing enterprise deliverables in the browser with 1-click bridges into Google Workspace (Google Slides, Sheets, Docs), Microsoft Office, PDF, and Draw.io.

---

## 🏛️ System Architecture

```
[Assessment Diagnostic Data & Reports]
                     │
                     ▼
  Unified Document Preview & Cloud Hub (Modal Overlay & /viewer Route)
                     │
    ┌────────────────┼────────────────┬────────────────┬────────────────┬────────────────┐
    ▼                ▼                ▼                ▼                ▼                ▼
 1. Google Slides 2. Google Sheets 3. Google Docs   4. PDF Report    5. Draw.io Arch  6. CSV / JSON
  - 16:9 Deck      - Multi-sheet   - Exec Tech Spec - Vector Print   - Vector SVG      - Raw Data
  - PptxGenJS      - SheetJS / XLSX- Word / Docx    - jsPDF Vector   - Diagrams.net    - Flat Matrix
  - slides.new     - sheets.new    - docs.new       - Browser Print  - app.diagrams    - Data Grids
```

---

## 🚀 1. The 1-Click Cloud Launch & Guided Assistant Protocol

All document previews and standalone viewers (`/viewer`, `/vision`, `/studio`) must embed official Google Workspace 1-click cloud launch buttons that open clean cloud authoring workflows without confusion or lost formatting:

| Target Platform | Document Format | Direct Launch URL | Visual Badge Token |
| :--- | :--- | :--- | :--- |
| **Google Slides** | `.pptx` Presentation | `https://slides.new` | `📊 Open with Google Slides` (Amber `#F59E0B`) |
| **Google Sheets** | `.xlsx` Spreadsheet | `https://sheets.new` | `📈 Open with Google Sheets` (Emerald `#10B981`) |
| **Google Docs** | `.docx` Executive Memo | `https://docs.new` | `📝 Open with Google Docs` (Blue `#3B82F6`) |
| **Draw.io** | `.drawio` Architecture | `https://app.diagrams.net` | `📐 Open with Draw.io` (Orange `#F97316`) |
| **Executive PDF** | `.pdf` Formal Report | Browser Native Print / PDF | `📄 Print / Save PDF` (Red `#EF4444`) |

### Mandatory Clipboard & Guided Launch Rules (`docs.new` & `slides.new`)
1. **Never Open Blank Unexplained Tabs**: Because Google Workspace (`docs.new` / `slides.new`) blocks cross-origin URL payload injection for unauthenticated tabs, clicking `Copy & docs.new` or `Copy & slides.new` MUST:
   - Programmatically copy the structured document payload to the system clipboard.
   - Display a **Guided Populated Google Launch Assistant Modal / Banner** (`launchAssistantModal`) showing exact 1-click instructions (`Press ⌘V / Ctrl+V inside the new tab` or `File -> Import slides -> Upload .pptx`) before/while launching the external Google tab.
2. **Strict Ban on `image/png` in Google Docs ClipboardItem (`mode === 'docs'`)**:
   - **CRITICAL CHROME / GOOGLE DOCS QUIRK**: If a `ClipboardItem` contains both `'image/png'` and `'text/html'`, Google Docs (`docs.new`) prioritizes the raw PNG image and **completely drops the 177-row HTML specification table and document headings**.
   - Furthermore, Google Docs' HTML paste sanitizer strips inline `data:image/png;base64,...` URLs inside `text/html`.
   - **Mandatory Solution**: When copying in Google Docs mode (`activeMode === 'docs'`), omit `'image/png'` from `ClipboardItem` and write **only `'text/html'` and `'text/plain'`**, using an **absolute public HTTPS image URL** (`https://promptcanvas.up.railway.app/blueprints/...`) inside the HTML `<img>` tag. This guarantees that pressing `⌘V` in `docs.new` pastes the complete Executive Heading + High-Res Architecture Diagram Image + 177-Row Formatted Specification Table in one operation.

---

## 🖥️ 2. Universal Cloud Studio & `/viewer` Parity Standard

1. **Prominent Top-Bar Action Buttons on `/viewer` (`src/app/viewer/page.tsx`)**:
   - Standalone presentation viewer routes (`/viewer`) MUST display high-contrast **`Open with Google Slides`** (`data-testid="viewer-open-with-google-slides-btn"`) and **`Open with Google Docs`** (`data-testid="viewer-open-with-google-docs-btn"`) buttons right in the top header bar.
   - Clicking either button opens `GoogleWorkspaceDirectOpenModal` pre-populated with the full 177-node architecture XML and an inline header mode switcher (`Open with Google Slides` ⇄ `Open with Google Docs`).
   - Default `/viewer` to **Google Cloud Viewer (`engine === 'google'`)** so Slide 1 and Slide 2 render immediately without Microsoft Office Online CDN cache failures (`vis9745_*.pptx`), while appending dynamic cache-busting parameters (`&cb=${iframeKey}`) to Microsoft viewer URLs.

2. **100% Interactive Decomposed Diagram Parity in Google Docs Specification Studio (`activeMode === 'docs'`)**:
   - **Strict Ban on Static-Only Images in Docs Studio**: Google Docs Specification Studio (`activeMode === 'docs'`) MUST NEVER degrade Section 1 into a static `<img>` while Slides Studio has an interactive canvas.
   - **Mandatory Docs Studio Architecture**:
     - **Left Interactive Sidebar (`w-72`)**: Houses the **Live Diagram & Doc Node Editor**, allowing users to click any node on the diagram or any row in the specification table to live-edit its **Component Title** and **Technical Role / Specification**.
     - **Section 1 (Interactive Architecture Blueprint)**: Renders the **100% Editable Decomposed Vector Diagram Canvas (177 Shapes & 89 Azure SVG Icons)** by default (`docsDiagramViewMode === 'decomposed-shapes'`), with a toggle for `1:1 Master Visual Twin`.
     - **Section 2 (Inline-Editable Component Inventory & Specification Matrix)**: Renders all 177 architecture objects in an inline-editable table where typing in any cell updates the diagram node label in real time, and clicking any row highlights the corresponding node on the Section 1 canvas.
     - **Zero Mid-Word Wrapping (`break-normal`)**: Standalone icon labels (`width <= 90 && height <= 75`) must use `break-normal` and centered floating pill labels below the icon so words like `"Management"` or `"Subscription"` never split mid-word across lines.

---

## 📦 3. Deliverable Exporter Specifications

### A. PowerPoint / Google Slides (`editablePptxCompiler.ts`)
- **Layout**: `LAYOUT_16x9` (10" × 5.625").
- **3-Slide Master Deck Architecture**:
  - **Slide 1**: True 1:1 High-Res Master Visual Architecture Twin.
  - **Slide 2**: 100% Widescreen Decomposed Editable Vector Topology (`177 native shapes + 89 inline Azure SVGs`).
  - **Slide 3**: Paginated Component Inventory & Technical Specification Matrix Table.

### B. Word / Google Docs (`editableDocxCompiler.ts`)
- **Dual Node/Browser Buffer Compatibility**: Must support both `window.atob` and Node.js `Buffer.from(base64, 'base64')` fallback in `dataUrlToUint8Array` so server-side Cloud Bridge generation (`/api/export/cloud-bridge/[filename]`) never fails.
- **Live Override Propagation**: Must accept `editableOverrides` (`Record<string, { label?: string; role?: string }>`) so live edits made in the Docs Studio are baked into the downloaded `.docx` file.
