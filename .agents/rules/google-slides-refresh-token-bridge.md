# Server-Side Refresh-Token Google Workspace Bridge & Universal 1:1 Inline Slides Previewer Rule (`Rule 47`)

Whenever implementing, modifying, or debugging `"Open with Google Slides"`, `"Open with Google Docs"`, or Inline Slide Deck Previewers across **PromptCanvas** (`/Users/nitinagga/Documents/PromptCanvas`), **Technical Blogs Studio** (`/Users/nitinagga/Documents/blogs`), or any companion enterprise studio:

## 1. Why `blogs` (`localhost:8095`) Worked 100% vs. Why Legacy Client-Side OAuth Popups Failed

1. **Never Rely on Browser GIS Popups (`google.accounts.oauth2.initTokenClient`) with Desktop OAuth Credentials**:
   - The Google OAuth credential in `.gsheet_oauth_token.json` (`nitinagga@google.com`) is an **Installed-App / Desktop refresh-token client**, not a browser Web GIS client with Authorized JavaScript Origins registered.
   - Calling `google.accounts.oauth2.initTokenClient` in the browser fails with `origin_mismatch`, `popup_closed`, or `"🔑 One-time setup: Google OAuth Client ID"` when `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is unset.
2. **Always Use the Server-Side `refresh_token` Exchange + Drive v3 Multipart Conversion Bridge**:
   - Exchange `grant_type=refresh_token` **server-side** at `https://oauth2.googleapis.com/token` (`getServerDriveAccessToken()` in `src/lib/server/googleWorkspaceBridge.ts` / `get_drive_access_token()` in `blogs/scripts/sync_google_workspace_bridge.py`).
   - Upload `.pptx` or `.html` bytes server-side to `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true` with:
     - `mimeType: "application/vnd.google-apps.presentation"` (for Google Slides) or `"application/vnd.google-apps.document"` (for Google Docs)
     - Header `"x-goog-user-project": "nitina-ggarwal-sandbox-647724"`
   - Append `?authuser=nitinagga%40google.com` to every generated `https://docs.google.com/presentation/d/<id>/edit` and `https://docs.google.com/document/d/<id>/edit` URL.

## 2. Pre-Warmed Google Drive Manifest (`0ms` Direct Open)

1. **Manifest Persistence (`src/data/cloud_viewer_manifest.json` & `blogs/slides/cloud_viewer_manifest.json`)**:
   - Pre-warmed Google Slides (`googleSlidesId`, `googleSlidesEditUrl`, `googleSlidesEmbedUrl`) and Google Docs (`googleDocsId`, `googleDocsEditUrl`, `googleDocsEmbedUrl`) entries must be stored in `cloud_viewer_manifest.json` and served via `GET /api/google-workspace/manifest`.
   - Clicking `[ S | Open with Google Slides | ▼ ]` must open pre-warmed `googleSlidesEditUrl` in a new tab in **`0ms`** without waiting for compilation, and fall back to `POST /api/google-workspace/open` server-side conversion for dynamic/custom diagrams.

## 3. Header-Only Action Controls & 100% Full-Width Diagram Canvas (`DiagramInlineSlidesPreviewer.tsx`)

1. **Zero On-Page Slide Deck Previewer Box**:
   - Never render a 2-pane `1. EDITABLE SLIDE DECK PREVIEWER (.PPTX & GOOGLE SLIDES)` box or duplicate inner summary card on the page UI (`/dashboard`, `/blogs`, `/library`).
   - Instead, render **ONLY the header options** (`👁️ Cloud Viewer` + `[ S | Open with Google Slides ↗ | ▼ ]` split-dropdown menu via `headerOnly={true}` on `/dashboard` `AppHeader`, `/library` preview modal header, and `/blogs` selector header), while displaying the architecture diagram itself cleanly at **100% full width**.
2. **Same-Screen Cloud Viewer Modal (`👁️ Cloud Viewer`)**:
   - Clicking `👁️ Cloud Viewer` in the header opens the 3-mode Same-Screen Cloud Viewer Modal (`✨ Interactive Slides Studio` 6-slide deck, `🌐 Live Google Slides Embed`, `📄 Live Google Docs Spec`) without cluttering the main canvas UI.

## 4. Calibrated Google Cloud Architecture Center (`#78`) Editable Slides & Zero-Overlap Geometry (`editablePptxCompiler.ts`)

1. **Uniform Aspect-Preserving Scaling + Right 4-Zone Architecture Center Sidebar (`renderArchitectureCenterDiagramSidebar`)**:
   - Never stretch `1200x1400` vertical `#78` diagrams across `13.33"x7.5"` widescreen slides with non-uniform `scaleX !== scaleY`.
   - Enforce `uniformScale = Math.min(availW / effGraphW, availH / effGraphH)`, skip `hdr_title_box` inside the diagram canvas (`isArchCenter78`), render the decomposed `56` editable shapes + `23` connectors in the left `7.62"` canvas, and populate the right `5.03"` widescreen column with `renderArchitectureCenterDiagramSidebar`.
2. **Bounded Container Headers, Aspect-Preserved Icons & Compact OpenXML Arrowheads**:
   - Cap top/spoke container headers (`isTopFullWidthContainer` `Math.min(bw * 0.44, 2.45)` & `isSpokeOuterWrapper` `Math.min(bw * 0.65, 1.92)` at `3.85pt`), preserve service icon aspect ratios (`addImagePreservingAspect`), preserve multi-line card breaks (`normalizeDrawioHtmlForSlides`), use `5.0–5.8pt` `fit: 'shrink'` card typography, and post-process OpenXML arrowheads to `<a:tailEnd type="triangle" w="sm" len="sm"/>` (`postProcessPptxCompactArrowsBase64`).
3. **Single-Source Manifest Purity (`FALLBACK_MANIFEST`) & Suite 13 6-Slide PPTX XML Gate**:
   - `FALLBACK_MANIFEST` in `DiagramInlineSlidesPreviewer.tsx` must source `WS1`..`WS5`, `BP-78`, and `DOC-MT-01`..`DOC-REF-09` exclusively from `src/data/cloud_viewer_manifest.json` (`0` stale hardcoded `WS1`..`WS5` IDs overriding `cloudViewerManifestData`), and both `scripts/verify_export_slides_quality_gate.ts` (`verifySixSlideBlogEditableDecks`) and `scripts/master_docgen_audit_harness.ts` (`SUITE 13`) must inspect the compiled `.pptx` ZIP XML (`ppt/slides/slide1.xml`..`slide6.xml`) to verify `w="sm" len="sm"`, `4-ZONE HUB-AND-SPOKE TOPOLOGY KEY`, and non-empty `Products Used` / `Use Case` / `Design Alternatives` / `Deployment Runbook` columns across all 9 canonical guides.
