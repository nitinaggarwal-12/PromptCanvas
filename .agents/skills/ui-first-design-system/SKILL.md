---
name: ui-first-design-system
description: Executive Light-Theme Web App UI/UX design system (Rule 25, Rule 26, Rule 50, Rule 54), 100% fluid edge-to-edge layouts, 4-band multi-column card grid uniformity, non-blocking drawers, table cell containment, and programmatic DOM bounding-box + visual screenshot verification.
---

# UI-First Design System & Executive Web App UI/UX Architecture (`v2.0.0`)

This skill governs how every web application page, dashboard, questionnaire, data table, and interactive component is designed, built, and verified across all workspaces (`ScoreX`, `GantryPulse`, `AskAIOCE`, `PromptCanvas`, `Demoes-GE`, `ge-blogs`).

---

## 1. Universal Executive Light Theme & 100% Fluid Edge-to-Edge Layout (`Law 15` / `Rule 54`, `Rule 25G` & `Rule 50A`)

1. **Mandatory Executive Light Theme Default (`Law 15` / `Rule 54`)**:
   - Root canvas: `bg-slate-50` (`#f8fafc`).
   - Cards, tables, headers, sub-toolbars, and drawers: `bg-white` (`#ffffff`) with crisp `1px solid #cbd5e1` / `border-slate-200` (`#e2e8f0`) borders and subtle elevation (`0 1px 3px rgba(15, 23, 42, 0.04)`).
   - Typography: `text-slate-900` (`#0f172a`) primary headings/values, `text-slate-700` (`#334155`) body/rationale copy, `text-slate-500` (`#64748b`) metadata labels.
   - **Strict Ban on Unrequested Dark Mode**: Never apply `class="dark"`, `bg-slate-950`, `bg-slate-900`, `#0f172a`, `#1e293b`, or `#020617` container backgrounds unless explicitly requested by the user.

2. **100% Fluid Edge-to-Edge Desktop Layout (`Rule 25G` & `Rule 50A`)**:
   - Every page wrapper and operational workspace container must enforce:
     ```css
     width: 100%;
     max-width: 100%;
     box-sizing: border-box;
     padding: 20px clamp(16px, 1.8vw, 28px);
     ```
   - **Strict Ban on Rigid Desktop Max-Widths**: Never constrain page containers to `max-width: 1200px`, `1400px`, `1440px`, `1560px`, or `max-w-8xl`, which create dead white gutters on wide monitors (`1680px–2560px`).

---

## 2. Multi-Column Card Grid Uniformity & Locked 4-Band Horizontal Alignment (`Rule 50G` & `Rule 50I` / `L60-20`)

Whenever rendering a multi-column card grid (e.g., 2-column assessment questionnaires, KPI bento grids, or blueprint catalogs):

1. **Equal Row Heights (`alignItems: 'stretch'`)**:
   - The CSS Grid container MUST set `alignItems: 'stretch'` (never `alignItems: 'start'`).
   - Every card container MUST set `height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'` with a uniform border (`1px solid #cbd5e1`) so left and right cards in the same row have `0px` height difference.

2. **Locked 4-Band Internal Card Geometry (`0px` Y-Offset Delta Across Columns)**:
   - Divide every card into fixed-height horizontal bands so internal elements align horizontally across every row:
     - **Band 1 — Header Bar (`height: '26px'`, `flexWrap: 'nowrap'`)**:
       - Left cluster: Uniform metadata pills (`[ID]`, `[Module • Input Type]`, `[Confidence% • Tier]`, `[Weight pts / Routing]`) with `whiteSpace: 'nowrap'`.
       - Right cluster: **1 single uniform status control** (e.g., `width: '188px'` `<select>`). Never conditionally render extra action buttons (such as `✓ Confirm`) on only a subset of cards, which makes headers lopsided.
     - **Band 2 — Title & Subtitle (`height: '44px'`)**:
       - Line 1 (`height: '22px'`): Single-line question/card title (`whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'` + full `title` tooltip). When interpolating dynamic entity names (e.g., `legacyPlatformName`), extract the concise primary name (`split(',')[0].trim()`) so titles never wrap onto 2 lines and push Band 3 downward relative to the adjacent card.
       - Line 2 (`height: '18px'`): Single-line `Required Entry:` / subtitle (`whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'`).
     - **Band 3 — Input / Control Row (`height: '56px'`)**:
       - Use the **exact same control type and height (`height: '36px'` `<select>`)** across all cards in the grid (`single_select`, `multi_select`, `multi_select_rank`, `numeric_band`, `matrix`).
       - Never mix multi-row removable chip clouds (`✕`), plain `<input>` boxes, and `<select>` dropdowns in the same card grid, and never leave gray `+ Add Option (N candidate options)...` placeholders when grounded answers exist.
       - Every grounded response value (`resp.value`) MUST match an option in the `<select>` list (`0` cards falling back to `— Evidence Pending —` while badged `✨ Grounded AI`), and option labels must render clean `{opt.optionText}` without duplicating confidence/tier text already shown in Column 2.
     - **Band 4 — Provenance & Citation Footer (`height: '68px'`)**:
       - Line 1 (`height: '38px'`): `✨ Grounded AI` badge + 2-line clamped rationale (`display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4`) so 1-line, 2-line, and 3-line rationales occupy identical vertical height.
       - Line 2 (`height: '24px'`, `flexWrap: 'nowrap'`): Concise role/owner pill (`split('/')[0].trim()`, `maxWidth: '340px'`) on the left + 2 clickable source citation pills on the right (`↺ Reset` shown only when `resp.userModified === true`, never on unmodified default cards).

---

## 3. Executive Information Architecture (IA), Non-Blocking Drawers & Table Containment (`Rule 25` & `Rule 26`)

1. **5-Stage First-Principles Value Pruning Hierarchy (`Rule 25A`–`25E`)**:
   - **(1) Delete** duplicate navigation rails/bars when a persistent top or side nav exists.
   - **(2) Delete** redundant form execution buttons (`Search`, `Submit`) next to inputs that live-filter or handle `Enter`.
   - **(3) Delete** static self-congratulatory marketing copy in operational headers (`firstRowTopPx <= 380px`).
   - **(4) Collapse** raw debug hashes/UUIDs.
   - **(5) Consolidate** into `<select>` / dropdowns ONLY unique, high-value secondary utility actions (`⚡ More Actions & Export ▾`).
   - Strip duplicate parentheticals from dropdown labels and subtitles (e.g., never render `(All 82 Qs) (All 82 Qs)` or `(301,354 Contracted Seats) (301,354 Seats)`).

2. **Zero Screen-Blocking Popups & Zero Browser Dialogs (`Rule 25F` & `Rule 25J`)**:
   - Never use centered screen-blocking modals (`fixed inset-0 ... bg-black/60`) or `window.prompt()` / `window.alert()` / `window.confirm()`.
   - Always use docked right-side drawers (`w-[580px] lg:w-[680px]`), bottom sheets, or inline input bars (`#ge-custom-sfdc-inline-input`).

3. **Rigid Table Cell Containment & Safe Truncation (`Rule 26A`–`26E`)**:
   - Never apply `truncate` to naked inline `<span>` elements (`span.truncate { display: inline-block; max-width: 100%; }`).
   - Enforce `min-w-0` on flex children and `overflow: hidden; max-width: 0;` on fixed-grid table cells (`table.table-fixed tbody td`).

---

## 4. Mandatory Two-Stage Verification Protocol (Programmatic DOM Geometry + Visual `view_file` Inspection)

Never rely solely on a data-string test or CLI exit code `0` to declare a UI task complete. Always execute both verification stages:

1. **Stage 1 — Programmatic DOM Bounding-Box & Option-Match Audit**:
   - Verify that every `<select>` value matches a rendered `<option>` across all records/dossiers.
   - Measure `getBoundingClientRect()` across multi-column card rows (`C01`–`C11`) to confirm:
     - `leftCard.height === rightCard.height` (`0px` row height delta).
     - `leftSelect.top === rightSelect.top` (`0px` input band Y-offset delta).
     - `0` horizontal overflow (`scrollWidth <= clientWidth`).

2. **Stage 2 — Headless Chrome Before & After Screenshot Capture + `view_file` Inspection (`before-and-after-screenshots.md`)**:
   - Capture high-resolution screenshots (`before_<feature>.png` and `after_<feature>.png`) using headless Google Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new`).
   - Physically open and inspect every screenshot with `view_file` to verify visual symmetry, card uniformity, typography hierarchy, and zero text collisions.
   - Embed both `before_*.png` and `after_*.png` in the conversation walkthrough artifact using a `carousel` block.

---

## 5. Synchronous 2-Project Cloud Run Deployment (`Rule 56`)

- Never run `gcloud run deploy <service> --source . --project=ramp-portal-dev` (corporate IAM in `ramp-portal-dev` blocks `storage.buckets.create`).
- Always execute the synchronous 2-project pipeline (e.g., `bash scripts/deploy_scorex_cloudrun.sh`):
  1. **Build Image in Sandbox**: `gcloud builds submit --project=nitina-ggarwal-sandbox-647724` pushing `us-central1-docker.pkg.dev/nitina-ggarwal-sandbox-647724/cloud-run-source-deploy/<service>:<TAG>`.
  2. **Update Cloud Run Service in `ramp-portal-dev` (`us-west1`)**: `gcloud run services update <service> --project=ramp-portal-dev --region=us-west1 --image=us-central1-docker.pkg.dev/nitina-ggarwal-sandbox-647724/cloud-run-source-deploy/<service>:<TAG>`.
  3. **Verify 4 Readiness Gates**: `latestReadyRevisionName === latestCreatedRevisionName`, `Ready === True`, `traffic === 100%`, and `data/cloudrun_deploy_receipt.json` updated.
