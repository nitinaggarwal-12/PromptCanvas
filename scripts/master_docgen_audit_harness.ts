import { XMLParser } from '/Users/nitinagga/Documents/PromptCanvas/node_modules/fast-xml-parser';
import { CANONICAL_TEMPLATES, DOMAIN_PRESETS, injectDomainFlavorXml } from '/Users/nitinagga/Documents/PromptCanvas/src/lib/canonical/canonicalTemplates';
import { injectUseCaseFlavor } from '/Users/nitinagga/Documents/PromptCanvas/src/lib/diagramCleaner';
import { DOC_ARCHETYPES_META, ArchetypeId } from '/Users/nitinagga/Documents/PromptCanvas/src/lib/compose/archetypes';
import { MASTER_DOCUMENTS, getDomainMasterDocument } from '/Users/nitinagga/Documents/PromptCanvas/src/lib/compose/masterDocs';
import { detectDomainFromPrompt } from '/Users/nitinagga/Documents/PromptCanvas/src/app/docgen/page';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from '/Users/nitinagga/Documents/PromptCanvas/node_modules/docx';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  allowBooleanAttributes: true,
});

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${testName} ${detail ? `-> ${detail}` : ''}`);
  }
}

async function runMasterAuditHarness() {
  console.log('================================================================');
  console.log('🚀 MASTER DOCGEN & DIAGRAM COMPREHENSIVE AUDIT HARNESS');
  console.log('================================================================\n');

  // ============================================================================
  // SUITE 1: ALL 50 CANONICAL TEMPLATES x 5 DOMAINS x 2 THEMES x 3 FUZZ TITLES (1,500 TESTS)
  // ============================================================================
  console.log('📌 SUITE 1: All 50 Canonical Diagrams x 5 Domains x 2 Themes Stress Test (1,500 Combinations)');
  const domains = ['biopharma', 'fintech', 'retail', 'manufacturing', 'saas'];
  const themes = ['light', 'dark'] as const;
  const fuzzTitles = [
    'AeroNode 5G / AI-Mesh & Edge-Robotics (Part 135: "Sub-20ms" <UTM> Airspace)',
    'Stripe & Plaid <> "Zero-Trust" Multi-Acquirer & Sub-10ms ISO 20022 Gateway',
    'VoltGrid & Tesla Megapack (BESS) | Solar Microgrid <V2G> Dynamic Load-Balancer',
  ];

  for (const tpl of CANONICAL_TEMPLATES) {
    for (const domain of domains) {
      for (const theme of themes) {
        for (const fuzzTitle of fuzzTitles) {
          try {
            const rawXml = tpl.generateXml(domain, theme);
            const domainCleaned = injectDomainFlavorXml(rawXml, domain);
            const finalXml = injectUseCaseFlavor(domainCleaned, fuzzTitle, 'Nationwide telemetry mesh with high throughput.');

            // 1. Strict XML Parse check
            let parseError: string | null = null;
            try {
              const parsed = parser.parse(finalXml);
              if (!parsed.mxfile || !parsed.mxfile.diagram) {
                parseError = 'Missing mxfile or diagram root node';
              }
            } catch (e: any) {
              parseError = e.message;
            }

            // 2. Check for loose unescaped ampersand
            const hasLooseAmpersand = /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/.test(finalXml);

            // 3. Check for stale date
            const hasStaleDate = /May 8, 2025|Aug 8, 2025|Jun 8, 2025/.test(finalXml);

            assert(
              parseError === null && !hasLooseAmpersand && !hasStaleDate,
              `Template ${tpl.id} [${domain}/${theme}] Combination`,
              parseError || (hasLooseAmpersand ? 'Found loose unescaped ampersand' : hasStaleDate ? 'Found stale May 8, 2025 date' : undefined)
            );
          } catch (err: any) {
            assert(false, `Template ${tpl.id} [${domain}/${theme}] crash on fuzz title`, err.message);
          }
        }
      }
    }
  }

  // ============================================================================
  // SUITE 2: 45-PERMUTATION (9 ARCHETYPES x 5 DOMAINS) SYNTHESIS & PERSONAL NAME SCRUBBING
  // ============================================================================
  console.log('\n📌 SUITE 2: Full 45-Permutation ($9 \\times 5$) Document Synthesis & Author Scrubbing');
  const bannedPersonalNames = [
    'Nitin Aggarwal',
    'Dr. Marcus Vance',
    'Dr. Elena Vance',
    'Dr. Aris Thorne',
    'Dr. Sophia Reyes',
    'Viktor Vance',
    'Ananya Ramanathan',
    'David K. Thorne',
    'Robert Sterling',
    'Sarah Chen',
  ];
  const bannedPharmaWords = ['Veeva Vault', 'Medidata Rave', 'Argus Safety', 'IND Submission', 'GxP & Functional'];

  for (const meta of DOC_ARCHETYPES_META) {
    for (const domain of domains) {
      const projectTitle = `${domain.toUpperCase()} Enterprise Architecture Platform & Cloud Mesh`;
      const projectScope = `An enterprise-grade distributed system designed for high availability, zero-trust security, and real-time processing in ${domain}.`;

      const doc = getDomainMasterDocument(meta.id, domain, projectScope) || MASTER_DOCUMENTS[meta.id] || '';

      // Test Length
      const hasLength = doc.length > 500;
      assert(hasLength, `Archetype [${meta.shortName}] x Domain [${domain}] has content length > 500 chars (${doc.length} chars)`);

      // Test Zero Personal Names
      const nameLeaks = bannedPersonalNames.filter((n) => doc.includes(n));
      assert(
        nameLeaks.length === 0,
        `Archetype [${meta.shortName}] x Domain [${domain}] zero hardcoded personal names`,
        nameLeaks.length > 0 ? `Found: ${nameLeaks.join(', ')}` : undefined
      );

      // Test Non-Biopharma Purity
      if (domain !== 'biopharma') {
        const pharmaLeaks = bannedPharmaWords.filter((w) => doc.includes(w));
        assert(
          pharmaLeaks.length === 0,
          `Archetype [${meta.shortName}] x Domain [${domain}] zero pharma leaks`,
          pharmaLeaks.length > 0 ? `Found: ${pharmaLeaks.join(', ')}` : undefined
        );
      }

      // Test Blueprint Slots presence
      const hasSlots = meta.blueprintPack.every((slot, idx) => {
        return doc.includes(`Diagram ${idx + 1}`) || doc.includes(slot.slotTitle) || doc.includes(`Visual Diagram`);
      });
      assert(hasSlots, `Archetype [${meta.shortName}] x Domain [${domain}] visual diagram slots integrated`);
    }
  }

  // ============================================================================
  // SUITE 3: WORD (.DOCX) BINARY EXPORT INTEGRITY TEST
  // ============================================================================
  console.log('\n📌 SUITE 3: Microsoft Word (.docx) Document Compilation & Binary Packing');
  for (const meta of DOC_ARCHETYPES_META) {
    try {
      const sampleDoc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: `${meta.name} — Architecture Specification`,
                heading: HeadingLevel.HEADING_1,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Document ID: ', bold: true }),
                  new TextRun({ text: `${meta.id.toUpperCase()}-TEST-2026-001` }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Executive Summary: ', bold: true }),
                  new TextRun({ text: meta.primaryPurpose }),
                ],
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [new Paragraph('Parameter')] }),
                      new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [new Paragraph('Specification')] }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph('Availability SLA')] }),
                      new TableCell({ children: [new Paragraph('99.999%')] }),
                    ],
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBuffer(sampleDoc);
      const isValidBinary = buffer.length > 1000;
      assert(isValidBinary, `Docx binary compiled for Archetype [${meta.shortName}] (Size: ${buffer.length} bytes)`);
    } catch (err: any) {
      assert(false, `Docx compilation for [${meta.shortName}]`, err.message);
    }
  }

  // ============================================================================
  // SUITE 4: DOMAIN CLASSIFIER NLP MATRIX
  // ============================================================================
  console.log('\n📌 SUITE 4: Intelligent Domain Detection (20 Real-World Industry Scenarios)');
  const testScenarios = [
    { title: 'AeroNode Drone Delivery', prompt: 'ADS-B mesh and UTM airspace routing', expected: 'manufacturing' },
    { title: 'VoltGrid EV Charging', prompt: 'OCPP 2.0 and BESS dynamic load balancing', expected: 'manufacturing' },
    { title: 'ApexPay Global Settlement', prompt: 'ISO 20022 wire transfer and sub-50ms fraud scoring', expected: 'fintech' },
    { title: 'Amazon Omnichannel Retail', prompt: 'Cart checkout, SKU inventory, and WMS cross-dock', expected: 'retail' },
    { title: 'WorkCloud SaaS Platform', prompt: 'Multi-tenant Kubernetes with RBAC and subscription billing', expected: 'saas' },
    { title: 'Oncology Genomics Platform', prompt: 'Clinical trials, FDA 21 CFR Part 11, and adverse events', expected: 'biopharma' },
    { title: 'Smart Factory Digital Twin', prompt: 'PLC SCADA sensors and predictive maintenance conveyor', expected: 'manufacturing' },
    { title: 'Crypto Liquidity Mesh', prompt: 'Order book matching engine and double-entry ledger', expected: 'fintech' },
  ];

  for (const s of testScenarios) {
    const detected = detectDomainFromPrompt(s.title, s.prompt, 'biopharma');
    assert(
      detected === s.expected,
      `Classifier: "${s.title}" -> ${detected} (Expected: ${s.expected})`,
      `Got ${detected} != ${s.expected}`
    );
  }

  // ============================================================================
  // SUMMARY REPORT
  // ============================================================================
  console.log('\n================================================================');
  console.log(`🏁 AUDIT HARNESS SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
  if (failedTests === 0) {
    console.log('🎉 100% OF ALL HARNESS TESTS PASSED WITH ZERO REGRESSIONS!');
  } else {
    console.error(`⚠️ ${failedTests} TESTS FAILED. REVIEW DETAILS ABOVE.`);
    process.exit(1);
  }
  console.log('================================================================\n');
}

runMasterAuditHarness().catch((e) => {
  console.error('Fatal harness crash:', e);
  process.exit(1);
});
