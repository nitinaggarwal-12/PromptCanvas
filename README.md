# PromptCanvas — AI Prompt-to-Draw.io Architecture Diagram & Document Studio

PromptCanvas translates natural language architecture descriptions, raster architecture images, and domain requirements into interactive Draw.io (`mxGraph`) vector diagrams and Lean 8 enterprise architecture documents.

---

## 🧠 Frontier Multi-Model Generation & Orthogonal Judge Stack (`src/lib/geminiConfig.ts`)

1. **Primary Deep Reasoning & Multimodal Critic (`gemini-3.1-pro-preview`)**: Powers architecture planning (`thinkingLevel: "HIGH"`), 6-dimension domain research (`deepDomainResearcher.ts`), multimodal vision decompilation (`deepmindVisionDecompiler.ts`), closed-loop spatial repair, and Judge 1 of the Orthogonal Multi-Model Judge panel.
2. **Cross-Family Open-Weights Adversarial Critic (`gemma-4-31b-it`)**: Serves as Judge 2 in [`src/lib/orthogonalMultiModelJudge.ts`](src/lib/orthogonalMultiModelJudge.ts), providing independent cross-family architectural critique alongside `gemini-3.1-pro-preview`.
3. **High-Throughput Spatial Mutator & Copilot (`gemini-3-flash-preview`)**: Executes low-latency intent classification, atomic composite-card Draw.io XML spatial mutation (`directDrawioSpatialMutator.ts`), and interactive follow-up edits.
4. **GA Production Fallbacks (`gemini-2.5-pro` & `gemini-2.5-flash`)**: Automatic retry fallbacks via [`src/lib/geminiRetryHelper.ts`](src/lib/geminiRetryHelper.ts), with Cloud Run GCP Metadata Server ADC token resolution (`resolveVertexAccessTokenAsync`).
5. **Reference Image Synthesis (`gemini-3-pro-image-preview` / `gemini-2.5-flash-image`)**: Synthesizes 16:9 visual reference diagrams for Stage 3 of `/prompt-to-diagram`.

---

## 🚀 Composite-Card Spatial Mutator & Zero-Floor AST Validator

1. **Atomic Composite-Card Clustering**: `clusterCompositeCards` in [`src/lib/freeform/directDrawioSpatialMutator.ts`](src/lib/freeform/directDrawioSpatialMutator.ts) groups multi-primitive flat Draw.io cards (drop-shadow + outer shell + icon badge + floating `style="text;..."` cells) into atomic semantic units for rename, move, delete, add, and connector anchoring.
2. **Zero-Floor Deterministic Validator**: [`src/lib/validate/validator.ts`](src/lib/validate/validator.ts) and [`src/lib/diagramAstHealth.ts`](src/lib/diagramAstHealth.ts) enforce cross-parent absolute `OVERLAP` checks, simulated 90° Manhattan routing collision checks, W3C WCAG contrast ratios (`LOW_COLOR_CONTRAST`), and `BROKEN_IMAGE_ASSET` detection with zero artificial score floors.
3. **Closed-Loop Self-Repair**: Whenever `validateDrawioXml` or the Orthogonal Multi-Model Judge flags defects, `directDrawioSpatialMutator.ts` runs up to 2 targeted `gemini-3.1-pro-preview` repair passes before returning.

---

## 🛠️ Environment Variables

Configure in `.env.local` or Cloud Run service environment:

```env
GEMINI_API_KEY=<gemini-api-key>
GOOGLE_CLOUD_PROJECT=ramp-portal-dev
GOOGLE_CLOUD_LOCATION=global

# Server-Side Refresh-Token Google Workspace Bridge (src/lib/server/googleWorkspaceBridge.ts)
GOOGLE_OAUTH_CLIENT_ID=<oauth-client-id>
GOOGLE_OAUTH_CLIENT_SECRET=<oauth-client-secret>
GOOGLE_OAUTH_REFRESH_TOKEN=<oauth-refresh-token>
GOOGLE_DRIVE_QUOTA_PROJECT=ramp-portal-dev
PROMPTCANVAS_GCS_BUCKET=ramp-portal-dev-promptcanvas-state
```

---

## 📚 Catalog & Studio Surfaces

- **Templates (`/templates`)**: **84 Certified Architecture Templates** (`53` Tier 1 Primary + `31` Tier 2 Restyled across `L200`–`L400`, each with 4K PNG, Vector SVG, and editable Draw.io XML).
- **Blueprint Catalog (`/canonical`)**: **35 Certified Blueprints** (`#78`, `#99`, `#81`, `#84`, `#00`, `#67`, `#69`, G-Series `#87`, `#89`–`#95`, `#97`, Restored `#03`, `#12`, `#14`, `#29`, and `#52`–`#66`).
- **Infographics (`/infographics`)**: **15 Executive Infographics** (`#52`–`#66`).
- **Document Studio (`/docgen`)**: **8 Enterprise Document Archetypes** (`BRD`, `PRD`, `SDD`, `TDD`, `AI System Card`, `STRIDE Threat Model`, `GRC Security Package`, `SRE & Resilience Spec`).
- **Technical Blog Studio (`/blogs`)**: **9 Architecture Center Guides** (`DOC-MT-01`..`DOC-REF-09`) with inline Draw.io editing and 6-slide native editable Google Slides export (`DiagramInlineSlidesPreviewer.tsx`).
- **Audit, FinOps & Health (`/audit`)**: Live zero-floor AST geometry/contrast inspector, Orthogonal Multi-Model Judge (`POST /api/audit` & `POST /api/judge`), FinOps run-rate estimator, and live runtime health probes.

---

## 🧪 Testing & Verification Commands

```bash
# 1. TypeScript strict check
npx tsc --noEmit

# 2. Vitest unit, golden pipeline & anti-theatre ratchet suite (39 test files)
npm test

# 3. Nav badge, retired route & full-repo source purity guard
node scripts/verify_nav_badge_counts.mjs

# 4. Canonical blueprint certification gate
npm run test:canonical

# 5. Full production build across all routes
npm run build
```

---

## 💻 Local Development

```bash
npm run dev
```

Open `http://127.0.0.1:3000/dashboard` to launch **Blueprint Studio**.
