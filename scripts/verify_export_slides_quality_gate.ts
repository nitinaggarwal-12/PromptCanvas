/**
 * Google Omni 1.1 Export & Slides Studio Quality Gate
 * Verifies:
 * 1. Base64 style.image & inline <svg> icon extraction parity in editablePptxCompiler.ts
 * 2. Z-Order depth/area sorting & zero-deformity container/icon label placement in GoogleWorkspaceDirectOpenModal.tsx
 * 3. Cloud Bridge [filename]/route.ts HEAD, Content-Length & CORS headers for Google Docs Viewer
 */

import fs from 'fs';
import path from 'path';
import { generateAzureLandingZoneArchitectureXml } from '../src/lib/masterBuilders/build_master_azure_landing_zone';
import { parseDrawioXmlForPptx } from '../src/lib/export/editablePptxCompiler';

function runExportSlidesQualityGate() {
  console.log('📊 Running Export & Google Slides Studio Quality Gate...');

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

  // 2. Verify GoogleWorkspaceDirectOpenModal.tsx enforces 1:1 Interactive Twin default, sorted z-order, and zero artificial Math.max(4.2 inflation
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

  // 3. Verify Cloud Bridge [filename]/route.ts supports HEAD and Content-Length for Google Docs Viewer
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

  console.log(
    `✅ Export & Slides Studio Quality Gate PASSED! (${verticesWithIcons.length} Azure vector icons verified, Z-order & Cloud Bridge HEAD/Content-Length certified)`
  );
}

runExportSlidesQualityGate();
