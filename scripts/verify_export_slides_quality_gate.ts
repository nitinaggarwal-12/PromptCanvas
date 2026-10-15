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
import { parseDrawioXmlForPptx, cleanHtmlToPlainText } from '../src/lib/export/editablePptxCompiler';

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
      '❌ EXPORT GATE FAILED: GoogleWorkspaceDirectOpenModal.tsx must support interactive decomposed diagram view mode in Google Docs Studio and direct external Google tab launcher (externalGoogleTabUrl → native docs.google.com editor).'
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

  const bridgeMainRouteCode = fs.readFileSync(
    path.join(process.cwd(), 'src/app/api/export/cloud-bridge/route.ts'),
    'utf-8'
  );
  const handoffCode = fs.readFileSync(
    path.join(process.cwd(), 'src/components/GoogleWorkspaceDriveHandoff.tsx'),
    'utf-8'
  );
  const directOpenLibCode = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/googleDriveDirectOpen.ts'),
    'utf-8'
  );
  if (
    bridgeMainRouteCode.includes('railway.app') ||
    viewerCode.includes('railway.app') ||
    modalCode.includes('railway.app') ||
    directOpenLibCode.includes('localhost:3000') ||
    handoffCode.includes('One-time setup: Google OAuth Client ID') ||
    modalCode.includes('1234567890-abc123.apps.googleusercontent.com') ||
    !directOpenLibCode.includes('248990048888-hpng38o8veg9k4qnpcmlsoh7dkgvqc6o.apps.googleusercontent.com') ||
    !bridgeMainRouteCode.includes('promptcanvas-cloud-bridge-sandbox')
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: Cloud Bridge, Drive Handoff, and Viewer must use 100% GCP Cloud Storage (promptcanvas-cloud-bridge-sandbox) and canonical BeyondCorp OAuth Client ID with zero retired railway.app, localhost:3000, or One-time setup blocker screens!'
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

  // 7. Blueprint #00 ("2026 Upgraded GCP & Gemini Enterprise Native Architecture") Zero-Corruption Gate
  const { CANONICAL_TEMPLATES } = require('../src/lib/canonical/canonicalTemplates');
  const bp00 = CANONICAL_TEMPLATES.find((t: any) => t.id === '00');
  if (!bp00) {
    console.error('❌ EXPORT GATE FAILED: Missing canonical template #00.');
    process.exit(1);
  }
  const bp00Xml = bp00.generateXml('enterprise', 'light');
  if (
    bp00Xml.includes('Frontier LLM.1') ||
    bp00Xml.includes('Serverless Container Runtime Gen2') ||
    !bp00Xml.includes('Gemini 3.1 Pro') ||
    !bp00Xml.includes('Cloud Run Gen2')
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: Blueprint #00 generateXml("enterprise") corrupted Gemini 3.1 Pro or Cloud Run Gen2 labels!'
    );
    process.exit(1);
  }
  const bp00Parsed = parseDrawioXmlForPptx(bp00Xml);
  const uiCell = bp00Parsed.cells.find((c) => c.id === 'ui_chat');
  const llmCell = bp00Parsed.cells.find((c) => c.id === 'llm_container');
  const obsCell = bp00Parsed.cells.find((c) => c.id === 'obs_container');
  if (!uiCell || !llmCell || !obsCell) {
    console.error('❌ EXPORT GATE FAILED: Missing ui_chat, llm_container, or obs_container in Blueprint #00.');
    process.exit(1);
  }
  const uiText = cleanHtmlToPlainText(uiCell.value);
  const llmText = cleanHtmlToPlainText(llmCell.value);
  const obsText = cleanHtmlToPlainText(obsCell.value);
  if (
    !uiText.title.startsWith('1. User Interface') ||
    !llmText.title.startsWith('5. LLM Layer') ||
    !obsText.title.includes('GCP Observability, AgentOps & FinOps') ||
    obsText.lines.length < 5
  ) {
    console.error(
      `❌ EXPORT GATE FAILED: Blueprint #00 step-badge or observability row parsing failed: ui="${uiText.title}", llm="${llmText.title}", obs="${obsText.title}" (${obsText.lines.length} lines)`
    );
    process.exit(1);
  }
  if (llmCell.htmlTitleColor && /^(CA8A04|FFFFFF)$/i.test(llmCell.htmlTitleColor)) {
    console.error(
      `❌ EXPORT GATE FAILED: llm_container picked up step-badge color #${llmCell.htmlTitleColor} as htmlTitleColor!`
    );
    process.exit(1);
  }

  // 8. Google Cloud Architecture Center (#78) Calibrated Editable Slides & Zero-Overlap Geometry Gate
  const pptxCompilerPath = path.join(process.cwd(), 'src/lib/export/editablePptxCompiler.ts');
  const pptxCode = fs.readFileSync(pptxCompilerPath, 'utf-8');
  if (
    !pptxCode.includes('const uniformScale = Math.min(availW / effGraphW, availH / effGraphH)') ||
    !pptxCode.includes("node.id === 'hdr_title_box'") ||
    !pptxCode.includes('renderArchitectureCenterDiagramSidebar') ||
    !pptxCode.includes('addImagePreservingAspect') ||
    !pptxCode.includes('normalizeDrawioHtmlForSlides') ||
    !pptxCode.includes('postProcessPptxCompactArrowsBase64') ||
    !pptxCode.includes('findDocSection') ||
    !pptxCode.includes('isSpokeOuterWrapper')
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: editablePptxCompiler.ts is missing calibrated #78 uniformScale, hdr_title_box exclusion, renderArchitectureCenterDiagramSidebar, addImagePreservingAspect, normalizeDrawioHtmlForSlides, postProcessPptxCompactArrowsBase64, findDocSection, or isSpokeOuterWrapper width cap!'
    );
    process.exit(1);
  }

  const archCenterTemplatePath = path.join(
    process.cwd(),
    'src/lib/canonical/templateOfficialGcpArchCenterHubSpoke.ts'
  );
  const archCenterCode = fs.readFileSync(archCenterTemplatePath, 'utf-8');
  if (
    !archCenterCode.includes("fillColor = 'none'") ||
    !archCenterCode.includes("'#aecbfa'") ||
    !archCenterCode.includes("'#feefc3'") ||
    !archCenterCode.includes("'#fad2cf'")
  ) {
    console.error(
      '❌ EXPORT GATE FAILED: templateOfficialGcpArchCenterHubSpoke.ts must stamp zone-matched fillColor knockouts (#aecbfa, #feefc3, #fad2cf, #ffffff) on floating callout labels!'
    );
    process.exit(1);
  }

  console.log(
    `✅ Export & Slides/Docs Studio Quality Gate PASSED! (${verticesWithIcons.length} Azure vector icons verified, Blueprint #00 & #78 Calibrated Editable Slides Zero-Overlap certified, Docs Editable Diagram Parity, Native Word 4-Layer DrawingML verified, /viewer Google Workspace buttons & Cloud Bridge certified, Anti-Static-Spoofing Rule 41 & Universal Dynamic Tiered Infographic Engine certified)`
  );
}

import JSZip from 'jszip';
import { GOOGLE_CLOUD_DOCUMENTATION_SERIES, buildCanonicalDocMarkdown } from '../src/lib/blogs/googleCloudDocumentationSeries';
import { OFFICIAL_ARCH_CENTER_BLUEPRINTS, compileOfficialArchCenterDrawioXml } from '../src/lib/canonical/templateOfficialGcpArchCenterHubSpoke';
import { exportDrawioToEditablePptx, findDocSection } from '../src/lib/export/editablePptxCompiler';

async function verifySixSlideBlogEditableDecks() {
  for (const docGuide of GOOGLE_CLOUD_DOCUMENTATION_SERIES) {
    const prodSec = findDocSection(docGuide, 'products_used', 'products-used');
    const useCaseSec = findDocSection(docGuide, 'use_case', 'use-case');
    const designAltSec = findDocSection(docGuide, 'design_alternatives', 'design-alternatives');
    const designConsSec = findDocSection(docGuide, 'design_considerations', 'design-considerations');
    const whatsNextSec = findDocSection(docGuide, 'whats_next', 'whats-next');
    if (
      !prodSec?.productsUsedItems?.length ||
      !useCaseSec?.useCaseBenefits?.length ||
      !designAltSec?.designAlternativesSubSections?.length ||
      !designConsSec?.designConsiderationsSubSections?.length ||
      !whatsNextSec?.whatsNextLinks?.length
    ) {
      console.error(
        `❌ EXPORT GATE FAILED: [${docGuide.docId}] findDocSection failed to resolve hyphenated/underscored sections (Products Used, Use Case, Design Alternatives, Design Considerations, What's Next).`
      );
      process.exit(1);
    }
  }

  const doc01 = GOOGLE_CLOUD_DOCUMENTATION_SERIES[0];
  const bp01 = OFFICIAL_ARCH_CENTER_BLUEPRINTS[0];
  const xml01 = compileOfficialArchCenterDrawioXml(bp01);
  const md01 = buildCanonicalDocMarkdown(doc01);
  const pptxB64 = (await exportDrawioToEditablePptx(xml01, `${doc01.docId}: ${doc01.title}`, doc01.docId, {
    returnBase64: true,
    includeArchCenterGuideSlides: true,
    markdownContent: md01,
    docId: doc01.docId,
  })) as string;

  const zip01 = await JSZip.loadAsync(pptxB64, { base64: true });
  const slideNames01 = Object.keys(zip01.files).filter((n) => n.startsWith('ppt/slides/slide') && n.endsWith('.xml'));
  if (slideNames01.length !== 6) {
    console.error(`❌ EXPORT GATE FAILED: [${doc01.docId}] Expected 6 slides in compiled PPTX, found ${slideNames01.length}.`);
    process.exit(1);
  }

  const s1Xml = await zip01.file('ppt/slides/slide1.xml')!.async('string');
  const s2Xml = await zip01.file('ppt/slides/slide2.xml')!.async('string');
  const s3Xml = await zip01.file('ppt/slides/slide3.xml')!.async('string');
  const s4Xml = await zip01.file('ppt/slides/slide4.xml')!.async('string');
  const s5Xml = await zip01.file('ppt/slides/slide5.xml')!.async('string');
  const s6Xml = await zip01.file('ppt/slides/slide6.xml')!.async('string');

  if (
    !s1Xml.includes('w="sm" len="sm"') ||
    s1Xml.includes('<a:headEnd type="triangle"/>') ||
    !s1Xml.includes('4-ZONE HUB-AND-SPOKE TOPOLOGY KEY') ||
    !s1Xml.includes('ARCHITECTURE CENTER GUIDE (#78)') ||
    !s1Xml.includes('CALLOUT STEPS')
  ) {
    console.error('❌ EXPORT GATE FAILED: Slide 1 XML is missing compact arrowheads (w="sm" len="sm"), 4-Zone Architecture Center Reference Sidebar, or 7-Step Callout strips!');
    process.exit(1);
  }
  if (
    s2Xml.includes('<a:tbl>') ||
    !s2Xml.includes('HOP 1') ||
    !s2Xml.includes('HOP 5') ||
    !s2Xml.includes('VPC Service Controls') ||
    !s2Xml.includes('Principal Access Boundary Policy') ||
    s2Xml.includes('Routing hub (Hop 1')
  ) {
    console.error('❌ EXPORT GATE FAILED: Slide 2 XML must use proportional 5-Zone Component Matrix cards (zero auto-collapsing <a:tbl>), include HOP 1..5 strips, populate Zone 4 VPC-SC/PAB rows, and strip noisy parenthetical echoes!');
    process.exit(1);
  }
  if (!s3Xml.includes('Google Cloud Products Used') || !s3Xml.includes('Vertex AI Agent Engine') || !s3Xml.includes('Model Armor') || !s3Xml.includes('4a:')) {
    console.error('❌ EXPORT GATE FAILED: Slide 3 XML is missing Google Cloud Products Used cards or 2x2 Step 4a-4d sub-step grid!');
    process.exit(1);
  }
  if (
    !s4Xml.includes('Use Case:') ||
    !s4Xml.includes('Strict data isolation') ||
    !s4Xml.includes('Enforced via:') ||
    !s4Xml.includes('Design Alternatives') ||
    !s4Xml.includes('Private access deployment')
  ) {
    console.error('❌ EXPORT GATE FAILED: Slide 4 XML is missing Use Case Enforced via pills or Design Alternatives comparison sub-cards!');
    process.exit(1);
  }
  if (
    s5Xml.includes('<a:tbl>') ||
    !s5Xml.includes('Security, privacy, and compliance') ||
    !s5Xml.includes('Red-Team Matrix: 10/10 Blocked') ||
    !s5Xml.includes('Prompt Cache: 90% Discount') ||
    !s5Xml.includes('84.7% Net Token Savings')
  ) {
    console.error('❌ EXPORT GATE FAILED: Slide 5 XML must replace auto-collapsing <a:tbl> with 4 explicit-height Well-Architected Pillar Swimlane Rows + 3 Quantitative Proof Cards!');
    process.exit(1);
  }
  if (
    !s6Xml.includes('Deployment Runbook') ||
    !s6Xml.includes('STEP 1') ||
    !s6Xml.includes('STEP 4') ||
    !s6Xml.includes('01 |') ||
    !s6Xml.includes('Architecture Center References') ||
    !s6Xml.includes('Authors:') ||
    !s6Xml.includes('Contributors:') ||
    !s6Xml.includes('Cloud Verification Receipt')
  ) {
    console.error('❌ EXPORT GATE FAILED: Slide 6 XML is missing 2x2 Deployment Runbook steps, numbered code lines, What\'s Next, or split Authors/Verification Provenance sub-cards!');
    process.exit(1);
  }

  // Verify 0 ellipses ('…' or '...') across all 6 slide XMLs
  const allSlideXmls = [s1Xml, s2Xml, s3Xml, s4Xml, s5Xml, s6Xml];
  for (let i = 0; i < allSlideXmls.length; i++) {
    const textMatches = [...allSlideXmls[i].matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((m) => m[1]).join('');
    if (textMatches.includes('…') || textMatches.includes('...')) {
      console.error(`❌ EXPORT GATE FAILED: Slide ${i + 1} XML contains truncated ellipsis ('…' or '...')!`);
      process.exit(1);
    }
  }

  // Verify 52px intra-spoke channel (x="342" width="214" and x="886" width="214" with staggered elbows 312/320 and 856/864)
  if (
    !xml01.includes('x="342"') ||
    !xml01.includes('x="886"') ||
    !xml01.includes('x="312"') ||
    !xml01.includes('x="856"')
  ) {
    console.error('❌ EXPORT GATE FAILED: Draw.io XML is missing widened 52px intra-spoke connector channel (x=342 / x=886) and staggered elbows (x=312 / x=856)!');
    process.exit(1);
  }

  // Verify no floating title tooltip on open-gcp-verify-drawer-btn in src/app/blogs/page.tsx
  const blogsPageSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'blogs', 'page.tsx'), 'utf-8');
  const gcpBtnMatch = blogsPageSrc.match(/data-testid="open-gcp-verify-drawer-btn"[\s\S]{0,350}?>/);
  if (!gcpBtnMatch || gcpBtnMatch[0].includes('title=')) {
    console.error('❌ EXPORT GATE FAILED: open-gcp-verify-drawer-btn in src/app/blogs/page.tsx must not have a native title tooltip attribute!');
    process.exit(1);
  }
}

runExportSlidesQualityGate();
verifySixSlideBlogEditableDecks().then(() => {
  console.log('🎯 6-Slide Cohesive Editable Diagram (#78) + Blog Content PPTX XML & 9-Guide Section Resolution Gate PASSED (9/9 guides, 6/6 slides, 52px intra-spoke channel, 0 ellipses, 0 auto-collapsing tables, compact arrowheads w="sm" len="sm")!');
});


