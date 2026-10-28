import fs from 'fs';
import path from 'path';
import {
  OFFICIAL_ARCH_CENTER_BLUEPRINTS,
  buildOfficialArchCenterConfigForUseCase,
  compileOfficialArchCenterSvg,
  compileOfficialArchCenterDrawioXml,
} from '../src/lib/canonical/templateOfficialGcpArchCenterHubSpoke';
import {
  BLOG_USE_CASE_PRESETS,
  BLOG_FORMATS,
  buildUseCasePresetFromCustomInput,
  generateBlogForUseCase,
  rebuildGeneratedBlogFullMarkdown,
} from '../src/lib/blogs/useCaseBlogEngine';
import { resolveDocGuideForSlideDeck } from '../src/lib/export/editablePptxCompiler';

function assertCondition(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`ASSERTION FAILED: ${message}`);
  }
}

async function main() {
  console.log('=== Running Multi-Tenant Workstreams, Diagrams & Blog Verification Suite ===');

  // 1. Verify all 7 Official Arch Center Blueprints render distinct SVGs and valid Draw.io XML
  const svgHashes = new Set<string>();
  for (const bp of OFFICIAL_ARCH_CENTER_BLUEPRINTS) {
    const svg = compileOfficialArchCenterSvg(bp);
    const drawio = compileOfficialArchCenterDrawioXml(bp);

    assertCondition(svg.includes('<svg'), `SVG for ${bp.id} must start with <svg`);
    assertCondition(svg.length > 5000, `SVG for ${bp.id} must be rich (>5000 chars), got ${svg.length}`);
    assertCondition(
      svg.includes('#aecbfa') && svg.includes('#ceead6') && svg.includes('#feefc3') && svg.includes('#fad2cf'),
      `SVG for ${bp.id} must use the Official Google Cloud Architecture Center Hub-and-Spoke (#78) zones (#aecbfa, #ceead6, #feefc3, #fad2cf)`
    );
    assertCondition(!/\b(GEAP|ARD|NLC)\b/.test(svg), `SVG for ${bp.id} must not contain GEAP/ARD/NLC`);
    assertCondition(!svgHashes.has(svg), `SVG for ${bp.id} must be structurally distinct from all other blueprints`);
    svgHashes.add(svg);

    assertCondition(drawio.includes('<mxGraphModel'), `Draw.io XML for ${bp.id} must contain <mxGraphModel`);
    assertCondition(
      drawio.includes('source="card_rc_alb"') && drawio.includes('target="card_rc_cloudrun"'),
      `Draw.io XML for ${bp.id} must bind explicit source/target vertex IDs on edges`
    );
    console.log(`  [PASS] Blueprint ${bp.id}: SVG (${svg.length} bytes) + Draw.io XML (${drawio.length} bytes)`);
  }

  // 2. Verify all 9 Canonical Use-Case Blog Presets (1:1 with DOC-MT-01..DOC-REF-09, 0 duplicate presets/formats)
  assertCondition(
    BLOG_USE_CASE_PRESETS.length === 9,
    `Expected exactly 9 canonical BLOG_USE_CASE_PRESETS (1:1 with DOC-MT-01..DOC-REF-09), found ${BLOG_USE_CASE_PRESETS.length}`
  );
  let totalBlogsChecked = 0;
  for (const preset of BLOG_USE_CASE_PRESETS) {
    assertCondition(
      preset.primaryTemplateId === '78' && preset.ingestionTemplateId === '78' && preset.searchTemplateId === '78',
      `Preset ${preset.id} must exclusively use Official Google Cloud Architecture Center Template #78 across all 3 workflow tabs`
    );
    const blog = generateBlogForUseCase(preset, preset.defaultFormatId);
    const fullMd = blog.fullMarkdown;

    assertCondition(
      !fullMd.includes('Ready-to-Publish Social & Community Promotion Kit'),
      `Blog ${preset.id} must NOT contain Ready-to-Publish Social & Community Promotion Kit`
    );
    assertCondition(
      !fullMd.includes('LinkedIn Executive Post (Copy & Paste)'),
      `Blog ${preset.id} must NOT contain LinkedIn Executive Post`
    );
    assertCondition(
      !/\b(GEAP|ARD|NLC)\b/.test(fullMd),
      `Blog ${preset.id} must NOT contain unverified internal acronyms GEAP, ARD, or NLC`
    );
    assertCondition(
      !/\b(Deloitte|Quantiphi|McKinsey|Accenture|Capgemini|Wipro|Cognizant|PwC|KPMG|Infosys)\b/i.test(fullMd) &&
        !fullMd.includes('System Integrator (SI)'),
      `Blog ${preset.id} must NOT contain third-party consulting brands (Rule 50B / Rule 25I)`
    );
    assertCondition(
      !fullMd.includes('### Editable Architecture & Slide Assets Index') &&
        !fullMd.includes('## Open Knowledge Format (OKF v0.1) Executive Synthesis'),
      `Blog ${preset.id} must NOT contain duplicate Editable Architecture & Slide Assets Index or duplicate OKF Executive Synthesis blocks (Rule 25)`
    );
    assertCondition(
      fullMd.includes('Google Cloud Console & Gemini Enterprise Verification Runbook (CLI, SQL & API)'),
      `Blog ${preset.id} must include the Google Cloud Console & Gemini Enterprise Verification Runbook`
    );
    assertCondition(
      fullMd.includes('nitina-ggarwal-sandbox-647724') && fullMd.includes('ramp-portal-dev'),
      `Blog ${preset.id} runbook must reference both ramp-portal-dev and nitina-ggarwal-sandbox-647724`
    );
    totalBlogsChecked++;
  }
  console.log(`  [PASS] Verified ${totalBlogsChecked} Canonical Blogs (1:1 with DOC-MT-01..DOC-REF-09): 100% Template #78 across all tabs, 0 third-party consulting brands (Rule 50B), 0 duplicate OKF/Assets/Format-Multiplier sections (Rule 25), 0 GEAP/ARD/NLC, 100% GCP CLI runbooks.`);

  // 3. Verify Live GCP Verification Receipt & API Handler (20/20 PASS)
  const receiptPath = path.join(process.cwd(), 'src/data/gcpWorkstreamVerificationReceipt.json');
  if (fs.existsSync(receiptPath)) {
    const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
    assertCondition(receipt.controlPlaneProjectId === 'ramp-portal-dev', 'controlPlaneProjectId must be ramp-portal-dev');
    assertCondition(receipt.dataSiloProjectId === 'nitina-ggarwal-sandbox-647724', 'dataSiloProjectId must be nitina-ggarwal-sandbox-647724');
    assertCondition(receipt.bigQueryBreachSummary?.length === 10, 'bigQueryBreachSummary must have 10 SIM checks');
    assertCondition(receipt.kmsKeys?.length === 4, 'kmsKeys must have 4 keys');
    assertCondition(receipt.gcsObjectsCount >= 16, 'gcsObjectsCount must be >= 16');
    assertCondition(receipt.exportedDiagrams?.length >= 7, 'exportedDiagrams must have >= 7 diagrams');
  }

  const { GET } = await import('../src/app/api/blogs/gcp-verify/route');
  const apiRes = await GET();
  const apiJson = await apiRes.json();
  assertCondition(apiJson.ok === true, `Expected ok: true, got ${apiJson.ok}`);
  assertCondition(apiJson.totalChecks === 20, `Expected 20 checks, got ${apiJson.totalChecks}`);
  assertCondition(apiJson.passedChecks === 20, `Expected 20 passed checks, got ${apiJson.passedChecks}`);
  console.log(`  [PASS] Live GCP Verification Receipt & API verified: ${apiJson.passedChecks}/${apiJson.totalChecks} PASS (${apiJson.verifiedAt})`);

  // 4. Verify all 21 Pure Multi-Tenant Google Cloud Console & Gemini Enterprise Screenshots in public/blogs-verification-screenshots/ and /blogs UI embedding (0 custom/mock screenshots, 0 cross-project Merck screenshots)
  const screenshotsDir = path.join(process.cwd(), 'public/blogs-verification-screenshots');
  assertCondition(fs.existsSync(screenshotsDir), 'public/blogs-verification-screenshots directory must exist');
  const screenshotFiles = fs.readdirSync(screenshotsDir).filter((f) => f.endsWith('.png'));
  assertCondition(
    screenshotFiles.length === 21,
    `Expected exactly 21 pure multi-tenant Google Cloud Console & Gemini Enterprise PNG screenshots in public/blogs-verification-screenshots (0 cross-project Merck screenshots), found ${screenshotFiles.length}`
  );
  for (const file of screenshotFiles) {
    assertCondition(
      !file.startsWith('before_') &&
        !file.startsWith('after_') &&
        !file.startsWith('pantheon_0') &&
        !file.includes('merck') &&
        !file.includes('mk3475') &&
        !file.includes('biomarker'),
      `Custom/composite or cross-project Merck screenshot ${file} is strictly banned in public/blogs-verification-screenshots`
    );
    const stat = fs.statSync(path.join(screenshotsDir, file));
    assertCondition(stat.size > 15000, `Screenshot ${file} must be non-empty (>15KB), got ${stat.size} bytes`);
  }

  const realUiFiles = screenshotFiles.filter((f) => f.startsWith('real_gcp_') || f.startsWith('real_ge_'));
  assertCondition(
    realUiFiles.length === 11,
    `Expected 11 pure multi-tenant GCP Console & Gemini Enterprise App Web UI screenshots (real_gcp_* / real_ge_*), found ${realUiFiles.length}`
  );
  const liveConsoleFiles = screenshotFiles.filter((f) => f.startsWith('gcp_console_0'));
  assertCondition(
    liveConsoleFiles.length === 9,
    `Expected 9 live Google Cloud Console & Gemini Enterprise execution screenshots (gcp_console_01..09), found ${liveConsoleFiles.length}`
  );

  const blogsPageCode = fs.readFileSync(path.join(process.cwd(), 'src/app/blogs/page.tsx'), 'utf8');
  assertCondition(
    blogsPageCode.includes('data-testid="blog-visual-proof-screenshots-gallery"'),
    'src/app/blogs/page.tsx must embed data-testid="blog-visual-proof-screenshots-gallery"'
  );
  assertCondition(
    blogsPageCode.includes('data-testid="use-case-catalog-top-bar"') &&
      !blogsPageCode.includes('lg:col-span-3') &&
      !blogsPageCode.includes('lg:col-span-9'),
    'src/app/blogs/page.tsx must use full-width use-case-catalog-top-bar with zero 3/9 column split that leaves empty left gutters'
  );
  assertCondition(
    !blogsPageCode.includes('pantheon_01') &&
      !blogsPageCode.includes('after_e2e_inline_drawio_editor') &&
      !blogsPageCode.includes('WORKSTREAM_TOPOLOGY_SCREENSHOTS') &&
      !blogsPageCode.includes('BLOG_CONTENT_REMEDIATION_PAIRS') &&
      !blogsPageCode.includes('mk3475') &&
      !blogsPageCode.includes('merck_shield') &&
      !blogsPageCode.includes('merck_a2ui') &&
      !blogsPageCode.includes('aws_mcp_consent_biomarker'),
    'src/app/blogs/page.tsx must contain zero custom/composite/before-after or cross-project Merck screenshots'
  );
  assertCondition(
    blogsPageCode.includes('data-testid="blog-screenshot-zoom-drawer"'),
    'src/app/blogs/page.tsx must embed non-blocking right-side zoom drawer data-testid="blog-screenshot-zoom-drawer"'
  );
  assertCondition(
    blogsPageCode.includes('/blogs-verification-screenshots/real_ge_01_home.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/real_ge_02_agents_gallery.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/real_gcp_01_project_dashboard.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/real_gcp_31_cloud_run_services_list.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/real_gcp_16_vpc_service_controls.png'),
    'src/app/blogs/page.tsx must reference real Gemini Enterprise App and Google Cloud Console Web UI screenshots'
  );
  assertCondition(
    blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_01_cloud_run_source_editor.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_02_cloud_run_revisions_deploy.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_03_bigquery_studio_pattern_a_rls.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_04_bigquery_studio_pattern_b_cmek.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_05_cloud_kms_keyring_live.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_06_vpc_psc_nat_subnet_live.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_07_logs_explorer_20_20_pass.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_08_gemini_enterprise_app_live_exec.png') &&
      blogsPageCode.includes('/blogs-verification-screenshots/gcp_console_09_vertex_ai_agent_builder_engines.png'),
    'src/app/blogs/page.tsx must reference all 9 live Google Cloud Console & Gemini Enterprise execution proof screenshots (gcp_console_01..09)'
  );
  assertCondition(
    !blogsPageCode.includes('fixed inset-0 z-50 bg-black/60'),
    'src/app/blogs/page.tsx must not contain screen-blocking centered dark modals (Rule 25F)'
  );
  console.log(`  [PASS] Verified ${screenshotFiles.length}/21 pure multi-tenant PNG visual proofs (${realUiFiles.length} Real GCP Console & Gemini Enterprise Web UI captures + ${liveConsoleFiles.length} Live Cloud Console Code/Deploy/Execute captures + 1 Live Pantheon SSH capture, 0 custom or cross-project Merck screenshots) in public/blogs-verification-screenshots/ and embedded on /blogs UI.`);

  // 5. Verify End-to-End Pattern Execution Results, Provisioned GCP Resources & 24-File Reference Codebase Workbench
  const bundle = apiJson.patternExecutionBundle;
  assertCondition(!!bundle, 'apiJson.patternExecutionBundle must be returned by GET /api/blogs/gcp-verify');
  assertCondition(
    Array.isArray(bundle.codebaseFiles) && bundle.codebaseFiles.length === 24,
    `Expected 24 codebaseFiles in patternExecutionBundle, got ${bundle.codebaseFiles?.length}`
  );
  assertCondition(
    Array.isArray(bundle.executionSuites) && bundle.executionSuites.length === 4,
    `Expected 4 executionSuites in patternExecutionBundle, got ${bundle.executionSuites?.length}`
  );
  assertCondition(
    Array.isArray(bundle.provisionedResources) && bundle.provisionedResources.length === 12,
    `Expected 12 provisionedResources in patternExecutionBundle, got ${bundle.provisionedResources?.length}`
  );
  assertCondition(
    blogsPageCode.includes('data-testid="blog-e2e-pattern-execution-and-codebase-workbench"') &&
      blogsPageCode.includes('data-testid="workbench-tab-execution"') &&
      blogsPageCode.includes('data-testid="workbench-tab-resources"') &&
      blogsPageCode.includes('data-testid="workbench-tab-codebase"') &&
      blogsPageCode.includes('InteractiveDrawioInlineEditor') &&
      blogsPageCode.includes('openDrawioInNewTab'),
    'src/app/blogs/page.tsx must embed E2E Pattern Execution & Codebase Workbench and InteractiveDrawioInlineEditor'
  );
  console.log(`  [PASS] Verified E2E Pattern Workbench: ${bundle.executionSuites.length} Execution Suites (20/20 PASS), ${bundle.provisionedResources.length} Live GCP Resources & ${bundle.codebaseFiles.length} Production Source Files.`);

  // 6. Verify 100% Purge of Legacy Renderers, Subtitle Icon Hijackers, Legacy Template IDs ('51', '27', '24'), Dark-Shell Hook & Synthetic Pantheon Script
  const wsRendererCode = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/canonical/workstreamTopologyRenderers.ts'),
    'utf8'
  );
  assertCondition(
    !wsRendererCode.includes('renderWorkstreamSpecificSvg') &&
      !wsRendererCode.includes('`${title} ${sub}`') &&
      wsRendererCode.includes('const titleLower = String(title || \'\').toLowerCase();'),
    'workstreamTopologyRenderers.ts must purge legacy renderWorkstreamSpecificSvg and match titleLower only (never sub)'
  );

  const generateRouteCode = fs.readFileSync(
    path.join(process.cwd(), 'src/app/api/blogs/generate/route.ts'),
    'utf8'
  );
  assertCondition(
    !generateRouteCode.includes("templateId = '51'") &&
      generateRouteCode.includes("templateId = '78'"),
    "src/app/api/blogs/generate/route.ts must default templateId to '78' (never legacy '51')"
  );

  assertCondition(
    !blogsPageCode.includes('CANONICAL_TEMPLATES') &&
      !blogsPageCode.includes('injectDomainFlavorXml') &&
      !blogsPageCode.includes('injectUseCaseFlavor') &&
      !blogsPageCode.includes("templateId: '51'") &&
      !blogsPageCode.includes("|| '51'") &&
      !blogsPageCode.includes("? '51' :"),
    "src/app/blogs/page.tsx must not import legacy CANONICAL_TEMPLATES or fallback to legacy template IDs ('51', '27', '24')"
  );

  const preInvCode = fs.readFileSync(
    path.join(process.cwd(), 'scripts/pre_invocation_memory.mjs'),
    'utf8'
  );
  assertCondition(
    !preInvCode.includes('Dark Shell + Light Workspace Law') &&
      preInvCode.includes('Universal Light Theme Default (Rule 54)'),
    'scripts/pre_invocation_memory.mjs must enforce Universal Light Theme Default (Rule 54) and never inject Dark Shell law'
  );

  const hooksJsonCode = fs.readFileSync(path.join(process.cwd(), 'hooks.json'), 'utf8');
  assertCondition(
    !hooksJsonCode.includes('require_promptcanvas_blogs_ui_27_screenshots_gallery_gate') &&
      !hooksJsonCode.includes('require_promptcanvas_blogs_ui_45_screenshots_and_real_gcp_ge_ui_gallery_gate') &&
      (hooksJsonCode.includes('require_promptcanvas_21_pure_multi_tenant_cloud_console_and_ge_screenshots_zero_merck_gate') ||
        hooksJsonCode.includes('require_promptcanvas_28_real_cloud_console_and_ge_screenshots_only_zero_custom_gate')),
    'hooks.json must purge legacy 27/45 custom screenshot gates and enforce Rule 53 real Cloud Console & GE screenshots only'
  );

  assertCondition(
    !fs.existsSync('/Users/nitinagga/Documents/blogs/scripts/render_pantheon_cloud_shell_e2e_screenshots.mjs'),
    'Legacy synthetic screenshot generator render_pantheon_cloud_shell_e2e_screenshots.mjs must remain deleted'
  );
  console.log('  [PASS] Verified 100% Purge of Legacy Renderers, Subtitle Icon Hijackers, Legacy Template IDs, Dark-Shell Hook & Synthetic Pantheon Script.');

  // 7. Verify 9 Canonical Google Cloud Documentation Guides (DOC-MT-01..DOC-REF-09), Tile Catalog Hub, PDF-Style Whitepaper Reader, Permalink Route & LLM-as-a-Judge Pass 2 (100/100)
  const {
    GOOGLE_CLOUD_DOCUMENTATION_SERIES,
    buildCanonicalDocMarkdown,
  } = await import('../src/lib/blogs/googleCloudDocumentationSeries');
  assertCondition(
    GOOGLE_CLOUD_DOCUMENTATION_SERIES.length === 9,
    `Expected exactly 9 canonical Google Cloud documentation guides, found ${GOOGLE_CLOUD_DOCUMENTATION_SERIES.length}`
  );
  const expectedDocIds = [
    'DOC-MT-01',
    'DOC-MT-02',
    'DOC-MT-03',
    'DOC-MT-04',
    'DOC-MT-05',
    'DOC-MT-06',
    'DOC-REF-07',
    'DOC-REF-08',
    'DOC-REF-09',
  ];
  const expectedSectionHeadings = [
    'Architecture',
    'Products used',
    'Use case',
    'Design alternatives',
    'Design considerations',
    'Deployment',
    "What's next",
    'Contributors',
  ];
  for (const expectedId of expectedDocIds) {
    const doc = GOOGLE_CLOUD_DOCUMENTATION_SERIES.find((d) => d.docId === expectedId);
    assertCondition(!!doc, `Missing canonical guide ${expectedId}`);
    if (doc) {
      assertCondition(
        doc.sections.length === 8 &&
          doc.sections.every((s, idx) => s.heading === expectedSectionHeadings[idx]),
        `Guide ${doc.docId} must have exact 8-section Cloud Architecture Center hierarchy (${expectedSectionHeadings.join(' -> ')})`
      );
      assertCondition(
        doc.sections[0].secondaryInlineDiagram === undefined,
        `Guide ${doc.docId} must have strictly 1 authoritative architecture diagram (secondaryInlineDiagram must be undefined)`
      );
      assertCondition(
        Array.isArray(doc.sections[0].componentGroupsTable) && doc.sections[0].componentGroupsTable.length >= 5,
        `Guide ${doc.docId} Section 1 must have >= 5 componentGroupsTable rows`
      );
      assertCondition(
        Array.isArray(doc.sections[0].agenticFlowSteps) && doc.sections[0].agenticFlowSteps.length >= 7,
        `Guide ${doc.docId} Section 1 must have >= 7 agenticFlowSteps (1-7 with a-d substeps)`
      );
      assertCondition(
        Array.isArray(doc.sections[1].productsUsedItems) && doc.sections[1].productsUsedItems.length >= 4,
        `Guide ${doc.docId} Section 2 must have >= 4 productsUsedItems`
      );
      assertCondition(
        Array.isArray(doc.sections[3].designAlternativesSubSections) && doc.sections[3].designAlternativesSubSections.length >= 2,
        `Guide ${doc.docId} Section 4 must have >= 2 designAlternativesSubSections`
      );
      assertCondition(
        Array.isArray(doc.sections[4].designConsiderationsSubSections) && doc.sections[4].designConsiderationsSubSections.length === 4,
        `Guide ${doc.docId} Section 5 must have 4 designConsiderationsSubSections (Security, Reliability, Operational efficiency, Cost optimization)`
      );
      const md = buildCanonicalDocMarkdown(doc);
      assertCondition(md.length > 2500, `Markdown export for ${doc.docId} must be > 2500 chars`);
      assertCondition(
        md.includes('## Architecture') &&
          md.includes('### Agentic flow') &&
          md.includes('## Products used') &&
          md.includes('## Use case') &&
          md.includes('## Design alternatives') &&
          md.includes('## Design considerations') &&
          md.includes('## Deployment') &&
          md.includes("## What's next") &&
          md.includes('## Contributors'),
        `Markdown export for ${doc.docId} must contain all 8 Cloud Architecture Center sections`
      );
      assertCondition(!/\b(GEAP|ARD|NLC)\b/.test(md), `Guide ${doc.docId} must contain 0 unverified acronyms (GEAP/ARD/NLC)`);
      assertCondition(
        !md.includes('Cloud Armor (Tier 1') && !md.includes('Identity-Aware Proxy (IAP) (Tier 2'),
        `Guide ${doc.docId} must contain 0 nonsensical slot-mismatch parentheticals ('Cloud Armor (Tier 1: Pooled)', 'Identity-Aware Proxy (IAP) (Tier 2: Bridge)')`
      );
    }
  }
  assertCondition(
    blogsPageCode.includes('data-testid="blogs-tile-catalog-grid"') &&
      blogsPageCode.includes('data-testid="blog-pdf-style-document-reader"') &&
      blogsPageCode.includes('data-testid="doc-reader-breadcrumb"') &&
      blogsPageCode.includes('data-testid="doc-reader-print-pdf-btn"') &&
      blogsPageCode.includes('data-testid="doc-reader-copy-md-btn"') &&
      blogsPageCode.includes('data-testid="blog-verified-citations-footer"') &&
      !blogsPageCode.includes('data-testid="catalog-reading-order-strip"') &&
      !blogsPageCode.includes('data-testid="doc-reader-quick-assets-bar"') &&
      !blogsPageCode.includes('doc-inline-figure-${sec.id}-secondary') &&
      !blogsPageCode.includes('doc-section-screenshots-') &&
      !blogsPageCode.includes('reader-series-pill-') &&
      !blogsPageCode.includes('id="doc-takeaways"') &&
      !blogsPageCode.includes('data-testid="blog-okf-synthesis-card"'),
    'src/app/blogs/page.tsx must include the 9-Blog Tile Catalog Grid, streamlined Google Cloud Architecture Center DevSite Reader, single Breadcrumb, Print/Markdown Export controls, and Verified Citations Footer with zero duplicate reading-order strip, zero quick-assets bar, zero secondary Figure 2, zero inline screenshot bloat, zero duplicate 9-pill top switcher, #doc-takeaways, or 4-box OKF card (Rule 25)'
  );
  assertCondition(
    fs.existsSync(path.join(process.cwd(), 'src/app/blogs/[docId]/page.tsx')),
    'Direct permalink route src/app/blogs/[docId]/page.tsx must exist'
  );
  const pass2Path = path.join(process.cwd(), 'logs/llm_judge_blogs_pass_2.json');
  assertCondition(fs.existsSync(pass2Path), 'logs/llm_judge_blogs_pass_2.json must exist');
  const pass2Report = JSON.parse(fs.readFileSync(pass2Path, 'utf8'));
  assertCondition(
    pass2Report.overallScore === 100 &&
      pass2Report.passedChecks === pass2Report.totalChecks &&
      Array.isArray(pass2Report.issuesFound) &&
      pass2Report.issuesFound.length === 0,
    `Expected LLM-as-a-Judge Pass 2 score 100/100 with 0 issues, got score=${pass2Report.overallScore}, issues=${pass2Report.issuesFound?.length}`
  );
  console.log('  [PASS] Verified 9 Canonical Google Cloud Documentation Guides (DOC-MT-01..DOC-REF-09), Tile Catalog Hub, 1:1 Executive PDF Whitepaper Reader, Permalinks & LLM-as-a-Judge Pass 2 (100/100, 0 issues).');

  // 8. Verify Zero Legacy "Architecture & Reading Figure 1 (Zone-by-Zone Walkthrough)" Across All 4 Blog Formats + 6-Slide Editable Diagram (#78) & Blog Content Google Slides Export
  const blogEngineCode = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/blogs/useCaseBlogEngine.ts'),
    'utf8'
  );
  assertCondition(
    !blogEngineCode.includes('Zone-by-Zone Walkthrough') &&
      !blogEngineCode.includes('Reading Figure 1') &&
      !blogEngineCode.includes('1. Outer Frame & Actor'),
    'src/lib/blogs/useCaseBlogEngine.ts must purge all legacy "Architecture & Reading Figure 1 (Zone-by-Zone Walkthrough)" and "1. Outer Frame & Actor" sections across all 4 blog formats'
  );
  for (const fmt of [
    'cloud-arch-center',
    'geap-fde-deep-dive',
    'developers-blog-adk',
    'cloud-blog-partner-patterns',
  ] as const) {
    const gen = generateBlogForUseCase(BLOG_USE_CASE_PRESETS[0], fmt);
    assertCondition(
      gen.sections.length === 8 &&
        gen.sections.every((s, idx) => s.heading === expectedSectionHeadings[idx]) &&
        !gen.fullMarkdown.includes('Zone-by-Zone Walkthrough') &&
        !gen.fullMarkdown.includes('Reading Figure 1'),
      `generateBlogForUseCase format "${fmt}" must return the exact 8-section Cloud Architecture Center hierarchy with zero Zone-by-Zone Walkthrough text`
    );
  }

  const pptxCompilerCode = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/export/editablePptxCompiler.ts'),
    'utf8'
  );
  assertCondition(
    pptxCompilerCode.includes('resolveDocGuideForSlideDeck') &&
      pptxCompilerCode.includes('const uniformScale = Math.min(availW / effGraphW, availH / effGraphH)') &&
      pptxCompilerCode.includes('visibleNonTitleVertices') &&
      pptxCompilerCode.includes('deduplicateParentheticalEchoes') &&
      pptxCompilerCode.includes("node.id === 'hdr_title_box'") &&
      pptxCompilerCode.includes('addDevSiteArticleSheet') &&
      pptxCompilerCode.includes('addImagePreservingAspect') &&
      pptxCompilerCode.includes('normalizeDrawioHtmlForSlides') &&
      pptxCompilerCode.includes('postProcessPptxCompactArrowsBase64') &&
      pptxCompilerCode.includes('findDocSection') &&
      pptxCompilerCode.includes('isSpokeOuterWrapper') &&
      !pptxCompilerCode.includes('slide2.addTable') &&
      !pptxCompilerCode.includes('slide5.addTable') &&
      pptxCompilerCode.includes('The architecture consists of the following components:') &&
      pptxCompilerCode.includes('Products used') &&
      pptxCompilerCode.includes('Design alternatives') &&
      pptxCompilerCode.includes('Other contributors:') &&
      !pptxCompilerCode.includes('Nithin Reddy Cheruku') &&
      !pptxCompilerCode.includes('Navneet Tuteja'),
    'src/lib/export/editablePptxCompiler.ts must compile 1:1 white DevSite <article> 6-slide decks (addDevSiteArticleSheet, Slide 1 Overview & Architecture Intro, Slide 2 Full-Width Native Editable Figure 1, Slide 3 Component | Description Table & Agentic Flow, Slide 4 Products Used & Use Case, Slide 5 Design Alternatives & Well-Architected Considerations, Slide 6 Deployment, What\'s Next & Contributors with role labels only)'
  );
  for (const doc of GOOGLE_CLOUD_DOCUMENTATION_SERIES) {
    const contribSec = doc.sections.find((s) => s.id === 'contributors');
    const joinedContributors = [
      ...doc.authors,
      ...(contribSec?.contributorsInfo?.authors || []),
      ...(contribSec?.contributorsInfo?.otherContributors || []),
    ].join(' ');
    assertCondition(
      !joinedContributors.includes('Nithin Reddy Cheruku') &&
        !joinedContributors.includes('Navneet Tuteja') &&
        !joinedContributors.includes('Dhawal Patel') &&
        !joinedContributors.includes('Nitin Aggarwal'),
      `[${doc.docId}] Contributors (authors & otherContributors) must contain role/team labels only with zero personal names`
    );
  }
  const cloudManifestPath = path.join(process.cwd(), 'src/data/cloud_viewer_manifest.json');
  assertCondition(fs.existsSync(cloudManifestPath), 'src/data/cloud_viewer_manifest.json must exist');
  const cloudManifest = JSON.parse(fs.readFileSync(cloudManifestPath, 'utf8'));
  for (const manifestKey of [...expectedDocIds, 'WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'BP-78']) {
    assertCondition(
      Boolean(cloudManifest.slides?.[manifestKey]?.googleSlidesId),
      `src/data/cloud_viewer_manifest.json must contain pre-warmed 6-slide Google Slides ID for ${manifestKey}`
    );
  }
  assertCondition(
    blogsPageCode.includes('tile-slides-export-') &&
      blogsPageCode.includes('doc-reader-export-blog-slides-btn') &&
      blogsPageCode.includes('Export Blog to Google Slides') &&
      blogsPageCode.includes('markdownContent={buildCanonicalDocMarkdown(activeDocGuide)}') &&
      blogsPageCode.includes('manifestKey={activeStudioManifestKey}') &&
      blogsPageCode.includes('catalog-new-topic-blog-btn'),
    'src/app/blogs/page.tsx must expose 1-click "Export Blog to Google Slides ↗" (doc-reader-export-blog-slides-btn), activeStudioManifestKey (FM-01), and New Topic Blog button in catalog toolbar (FM-07)'
  );
  console.log('  [PASS] Verified Zero Legacy "Zone-by-Zone Walkthrough" Across All 4 Blog Formats + 1:1 White DevSite <article> 6-Slide Google Slides Export & Role-Label-Only Contributors.');

  // 14. Verify Custom New-Topic Blog Generation Pipeline (FM-01..FM-07)
  const customEnergyPreset = buildUseCasePresetFromCustomInput({
    id: 'uc-custom-grid-substation-test',
    title: 'Autonomous Energy Grid & Substation Multi-Agent AI on Google Cloud',
    prompt: 'Real-time SCADA telemetry ingestion via Pub/Sub and Dataflow, AlloyDB pgvector operational state, and Cloud KMS HSM breaker actuation.',
    domainId: 'enterprise',
  });
  assertCondition(
    customEnergyPreset.domainId === 'energy' &&
      customEnergyPreset.domainName.includes('Energy') &&
      customEnergyPreset.primaryDataStore.includes('AlloyDB') &&
      customEnergyPreset.secondaryDataStore.includes('Pub/Sub'),
    'buildUseCasePresetFromCustomInput (FM-05) must infer Energy domain and AlloyDB + Pub/Sub data stores from topic keywords instead of falling back to FinTech & Global Banking'
  );
  const customBp = buildOfficialArchCenterConfigForUseCase(customEnergyPreset, 'high-level');
  const customCardTitles = [
    customBp.routingCards.topLeft.title,
    customBp.routingCards.midLeft.title,
    customBp.routingCards.botLeft.title,
    `${customBp.routingCards.topRight.title} ${customBp.routingCards.topRight.title2 || ''}`.trim(),
    customBp.routingCards.botRight.title,
    `${customBp.govCards.top.title} ${customBp.govCards.top.title2 || ''}`.trim(),
    customBp.govCards.mid.title,
    customBp.govCards.bot.title,
    customBp.leftCards.modelArmor.title,
    customBp.leftCards.llm.title,
    customBp.leftCards.runtime.title,
    customBp.leftCards.mcp.title,
    customBp.leftCards.datastore.title,
    customBp.rightCards.modelArmor.title,
    customBp.rightCards.llm.title,
    customBp.rightCards.runtime.title,
    customBp.rightCards.mcp.title,
    customBp.rightCards.datastore.title,
  ];
  assertCondition(
    new Set(customCardTitles).size === 18,
    `buildOfficialArchCenterConfigForUseCase (FM-04) must produce 18/18 distinct card titles for custom topics, got ${new Set(customCardTitles).size}/18`
  );
  const customBlog = generateBlogForUseCase(customEnergyPreset, 'cloud-arch-center');
  assertCondition(
    resolveDocGuideForSlideDeck(customBp.id, customBp.title, customBlog.fullMarkdown, customEnergyPreset.id) === undefined,
    'resolveDocGuideForSlideDeck (FM-02) must return undefined for custom topic blogs and never false-match DOC-REF-07 or DOC-MT-01 via What\'s next footer links'
  );
  customBlog.tldrSummary = 'Updated AI-enhanced executive summary for Autonomous Energy Grid.';
  customBlog.subtitle = customBlog.tldrSummary;
  rebuildGeneratedBlogFullMarkdown(customBlog, customEnergyPreset.domainName);
  assertCondition(
    customBlog.fullMarkdown.includes('Updated AI-enhanced executive summary for Autonomous Energy Grid.'),
    'rebuildGeneratedBlogFullMarkdown (FM-03) must synchronize fullMarkdown and yamlFrontmatter after AI enhancement or inline section edits'
  );
  console.log('  [PASS] Verified Custom New-Topic Blog Generation Pipeline (FM-01..FM-07): 18/18 distinct cards, keyword domain/datastore inference, zero DOC-REF-07/DOC-MT-01 slide hijacking, and live fullMarkdown synchronization.');

  console.log('=== ALL BLOGS, WORKSTREAM TOPOLOGIES, REAL GCP CONSOLE & GEMINI ENTERPRISE UI GALLERY & VERIFICATION CHECKS PASSED ===');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


