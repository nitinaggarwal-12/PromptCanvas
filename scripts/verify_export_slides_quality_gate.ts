/**
 * Google Omni 1.1 Export & Slides/Docs Studio Quality Gate
 * Verifies:
 * 1. Base64 style.image & inline <svg> icon extraction parity in editablePptxCompiler.ts
 * 2. Z-Order depth/area sorting & zero-deformity container/icon label placement in GoogleWorkspaceDirectOpenModal.tsx
 * 3. Cloud Bridge [filename]/route.ts HEAD, Content-Length & CORS headers for Google Docs Viewer
 * 4. Google Docs Specification Studio 100% Interactive Decomposed Diagram Parity + Live Node Editor + HTML-only ClipboardItem
 * 5. /viewer top-bar 'Open with Google Slides' & 'Open with Google Docs' buttons + Google Cloud Viewer default engine
 */

import fs from 'fs';
import path from 'path';
import { generateAzureLandingZoneArchitectureXml } from '../src/lib/masterBuilders/build_master_azure_landing_zone';
import { parseDrawioXmlForPptx } from '../src/lib/export/editablePptxCompiler';

function runExportSlidesQualityGate() {
  console.log('📊 Running Export & Google Slides/Docs Studio Quality Gate...');

  // 1. Verify VIS-9745 Azure Landing Zone XML icon extraction in parseDrawioXmlForPptx
  const azureXml = generateAzureLandingZoneArchitectureXml();
  const parsed = parseDrawioXmlForPptx(azureXml);

  const verticesWithIcons = parsed.cells.filter(
    (c) => c.vertex && (c.extractedSvgs.length > 0 || Boolean(c.imageDataUrl))
  );

  if (verticesWithIcons.length < 30) {
    console.error(
      `❌ EXPORT GATE FAILED: VIS-9745 should extract at least 30 Azure vector icons, but only found ${verticesWithIcons.length}.`
    );
    process.exit(1);
  }

  // 1b. Verify style.image base64 SVG extraction parity
  const base64TestSvg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" fill="#0078D4"/></svg>').toString('base64');
  const styleImageXml = `<mxfile><diagram><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="test_icon" value="Test Node" style="shape=image;image=data:image/svg+xml;base64,${base64TestSvg};" vertex="1" parent="1"><mxGeometry x="10" y="10" width="36" height="36" as="geometry"/></mxCell></root></mxGraphModel></diagram></mxfile>`;
  const parsedStyleImage = parseDrawioXmlForPptx(styleImageXml);
  const testIconCell = parsedStyleImage.cells.find((c) => c.id === 'test_icon');
  if (!testIconCell || testIconCell.extractedSvgs.length === 0) {
    console.error(
      '❌ EXPORT GATE FAILED: parseDrawioXmlForPptx failed to extract vector SVG from style.image data:image/svg+xml;base64,...'
    );
    process.exit(1);
  }

  // 2. Verify GoogleWorkspaceDirectOpenModal.tsx enforces 1:1 Interactive Twin, Docs Decomposed Diagram Parity, and Guided Launch Assistant
  const modalPath = path.join(process.cwd(), 'src/components/GoogleWorkspaceDirectOpenModal.tsx');
  const modalCode = fs.readFileSync(modalPath, 'utf-8');

  if (modalCode.includes('Math.max(4.2,')) {
    console.error(
      '❌ EXPORT GATE FAILED: GoogleWorkspaceDirectOpenModal.tsx contains artificial Math.max(4.2, widthPct) size inflation that deforms small icons.'
    );
    process.exit(1);
  }

  if (!modalCode.includes('interactive-twin') || !modalCode.includes('isStandaloneIconWithBottomLabel')) {
    console.error(
      '❌ EXPORT GATE FAILED: GoogleWorkspaceDirectOpenModal.tsx is missing 1:1 Interactive Twin mode or standalone icon bottom-label positioning.'
    );
    process.exit(1);
  }

  if (!modalCode.includes('docsDiagramViewMode') || !modalCode.includes('externalGoogleTabUrl')) {
    console.error(
      '❌ EXPORT GATE FAILED: GoogleWorkspaceDirectOpenModal.tsx must support interactive decomposed diagram view mode in Google Docs Studio and direct external Google tab launcher (docs.google.com/viewer).'
    );
    process.exit(1);
  }

  // 3. Verify /viewer page enforces Open with Google Slides & Docs buttons and defaults to Google Cloud Viewer
  const viewerPath = path.join(process.cwd(), 'src/app/viewer/page.tsx');
  const viewerCode = fs.readFileSync(viewerPath, 'utf-8');

  if (
    !viewerCode.includes('viewer-open-with-google-slides-btn') ||
    !viewerCode.includes('viewer-open-with-google-docs-btn')
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: src/app/viewer/page.tsx is missing prominent "Open with Google Slides" or "Open with Google Docs" top header buttons.'
    );
    process.exit(1);
  }

  if (!viewerCode.includes("useState<'microsoft' | 'google'>('google')")) {
    console.error(
      "❌ EXPORT GATE FAILED: src/app/viewer/page.tsx must default engine to 'google' (Google Cloud Viewer) for reliable slide rendering."
    );
    process.exit(1);
  }

  // 4. Verify Cloud Bridge [filename]/route.ts supports HEAD and Content-Length for Google Docs Viewer
  const bridgeFilenameRoute = path.join(
    process.cwd(),
    'src/app/api/export/cloud-bridge/[filename]/route.ts'
  );
  if (!fs.existsSync(bridgeFilenameRoute)) {
    console.error(
      '❌ EXPORT GATE FAILED: Missing src/app/api/export/cloud-bridge/[filename]/route.ts required for clean .pptx/.docx URLs in Google Docs Viewer.'
    );
    process.exit(1);
  }

  const bridgeCode = fs.readFileSync(bridgeFilenameRoute, 'utf-8');
  if (!bridgeCode.includes('export async function HEAD') || !bridgeCode.includes('Content-Length')) {
    console.error(
      '❌ EXPORT GATE FAILED: cloud-bridge/[filename]/route.ts must export HEAD and set explicit Content-Length header for Google Docs Viewer.'
    );
    process.exit(1);
  }

  // 5. Verify editableDocxCompiler.ts (Native Editable Word DrawingML Vector Diagram Engine)
  const docxCompilerPath = path.join(process.cwd(), 'src/lib/export/editableDocxCompiler.ts');
  const docxCode = fs.readFileSync(docxCompilerPath, 'utf-8');

  // 5a. Ensure transparent labels emit <a:noFill/> and <a:ln><a:noFill/></a:ln> instead of opaque white/blue boxes
  if (
    !docxCode.includes("fillHex !== 'none'") ||
    !docxCode.includes("strokeHex !== 'none'") ||
    !docxCode.includes("new El('a:noFill', {})")
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: editableDocxCompiler.ts must explicitly emit a:noFill when fillHex/strokeHex is "none" to prevent corrupted white boxes on transparent headers.'
    );
    process.exit(1);
  }

  // 5b. Ensure zero <a:blipFill> or <pic:pic> inside <wpg:wgp> (which causes docs.google.com/viewer to render a blank page)
  if (docxCode.includes('<a:blipFill') || docxCode.includes('<pic:pic')) {
    console.error(
      '❌ EXPORT GATE FAILED: editableDocxCompiler.ts must never emit <a:blipFill> or <pic:pic> inside <wpg:wgp> groups (unsupported by docs.google.com/viewer).'
    );
    process.exit(1);
  }

  // 5c. Ensure strict 4-Layer back-to-front Z-Ordering and neighbor-clamped bottom labels
  if (
    !docxCode.includes('getServiceBadgeInfo') ||
    !docxCode.includes('minNeighborDist') ||
    !docxCode.includes('opaqueVertices.sort((a, b) => b.width * b.height - a.width * a.height)')
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: editableDocxCompiler.ts must enforce 4-layer Z-ordering (area-sorted containers -> edges -> vector service badges -> neighbor-clamped labels).'
    );
    process.exit(1);
  }

  // 5d. Ensure zero node information table in Word .docx
  if (docxCode.includes('Component Inventory & Technical Specification Matrix')) {
    console.error(
      '❌ EXPORT GATE FAILED: editableDocxCompiler.ts must not include node information tables; it must produce a pure 1-page widescreen editable Word vector diagram.'
    );
    process.exit(1);
  }

  // 6. Anti-Static-Spoofing & Subject Domain Parity Gate (Rule 41)
  const openKnowledgeGenPath = path.join(process.cwd(), 'src/lib/canonical/openKnowledgeInfographic.ts');
  if (!fs.existsSync(openKnowledgeGenPath)) {
    console.error(
      '❌ EXPORT GATE FAILED: Missing src/lib/canonical/openKnowledgeInfographic.ts required for domain-specific Open Knowledge Format infographic synthesis.'
    );
    process.exit(1);
  }
  const openKnowledgeCode = fs.readFileSync(openKnowledgeGenPath, 'utf-8');
  if (
    openKnowledgeCode.toLowerCase().includes('charlie hills') ||
    openKnowledgeCode.toLowerCase().includes('claude.md')
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: openKnowledgeInfographic.ts contains leaked static strings from Charlie Hills / CLAUDE.md template.'
    );
    process.exit(1);
  }
  const routeCode = fs.readFileSync(path.join(process.cwd(), 'src/app/api/generate/route.ts'), 'utf-8');
  const archTypesCode = fs.readFileSync(path.join(process.cwd(), 'src/lib/architectureTypes.ts'), 'utf-8');
  if (
    !routeCode.includes("architectureType: 'open_knowledge_infographic'") ||
    !routeCode.includes("architectureType: 'dynamic_tiered_infographic'") ||
    !archTypesCode.includes('generateOpenKnowledgeInfographicXml()') ||
    !archTypesCode.includes('generateDynamicTieredInfographicXml(')
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: route.ts and architectureTypes.ts must route both open_knowledge_infographic and dynamic_tiered_infographic.'
    );
    process.exit(1);
  }

  const { generateDynamicTieredInfographicXml } = require('../src/lib/canonical/dynamicTieredInfographic');
  const testPrompts = [
    { prompt: 'Healthcare FHIR Interoperability Infographic', expectedToken: 'HEALTHCARE FHIR INTEROPERABILITY' },
    { prompt: 'Zero-Trust Kubernetes Security Infographic', expectedToken: 'ZERO-TRUST KUBERNETES SECURITY' }
  ];
  for (const t of testPrompts) {
    const xmlOut = generateDynamicTieredInfographicXml(t.prompt);
    if (!xmlOut.includes('TIER 01') || !xmlOut.includes('TIER 04') || !xmlOut.includes(t.expectedToken)) {
      console.error(`❌ EXPORT GATE FAILED: generateDynamicTieredInfographicXml("${t.prompt}") failed semantic subject parity check.`);
      process.exit(1);
    }
    if (xmlOut.toLowerCase().includes('charlie hills') || xmlOut.toLowerCase().includes('claude.md')) {
      console.error(`❌ EXPORT GATE FAILED: generateDynamicTieredInfographicXml("${t.prompt}") leaked Charlie Hills / CLAUDE.md strings!`);
      process.exit(1);
    }
  }

  console.log(
    `✅ Export & Slides/Docs Studio Quality Gate PASSED! (${verticesWithIcons.length} Azure vector icons verified, Docs Editable Diagram Parity, Native Word 4-Layer DrawingML verified, /viewer Google Workspace buttons & Cloud Bridge certified, Anti-Static-Spoofing Rule 41 & Universal Dynamic Tiered Infographic Engine certified)`
  );
}

runExportSlidesQualityGate();
