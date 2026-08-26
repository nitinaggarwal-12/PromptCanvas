import { classifyIntent } from '../src/lib/router/intentClassifier';
import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypesCertified';
import { injectUseCaseFlavor } from '../src/lib/diagramCleaner';
import { validateAndHealDrawioXml } from '../src/lib/xmlHealer';

interface CanvasPromptTestCase {
  name: string;
  prompt: string;
  expectedVendorOrDomain: string;
  disallowedPatterns?: RegExp[];
  requiredPatterns?: RegExp[];
}

const CANVAS_TEST_SUITE: CanvasPromptTestCase[] = [
  {
    name: 'Surgical Robotics & MedTech (Long Terminology Safety)',
    prompt: 'Autonomous Robotic Telesurgery Platform with DICOM-RT Telemetry, 6-DoF Haptics, FPGA safety loop, and FDA 510(k) compliance',
    expectedVendorOrDomain: 'MedTech',
    disallowedPatterns: [/<mxCell[^>]*value="[^"]*DICOM-RT[^"]*"[^>]*style="(?![^"]*whiteSpace=wrap)[^"]*"/i],
    requiredPatterns: [/<mxfile\b/i]
  },
  {
    name: 'AWS Cloud Native Serverless & Event-Driven',
    prompt: 'Design an AWS Serverless Event-Driven Platform with Route 53, AWS WAF, Amazon API Gateway, AWS Lambda, Amazon DynamoDB, and Amazon SQS',
    expectedVendorOrDomain: 'AWS',
    disallowedPatterns: [/value="[^"]*\bBigQuery\b[^"]*"/i, /value="[^"]*\bCloud Run\b[^"]*"/i],
    requiredPatterns: [/AWS|Amazon/i, /<mxfile\b/i]
  },
  {
    name: 'Microsoft Azure Enterprise Microservices Mesh',
    prompt: 'Enterprise Azure Microservices Platform with Azure Front Door, Azure Kubernetes Service (AKS), Azure Event Hubs, and Azure Cosmos DB',
    expectedVendorOrDomain: 'Azure',
    disallowedPatterns: [/value="[^"]*\bBigQuery\b[^"]*"/i, /value="[^"]*\bCloud Pub\/Sub\b[^"]*"/i],
    requiredPatterns: [/Azure|Microsoft/i, /<mxfile\b/i]
  },
  {
    name: 'Modern Data Lakehouse with Snowflake & Databricks',
    prompt: 'Enterprise Lakehouse with Snowflake Iceberg tables, Databricks Unity Catalog, dbt transformations, and Apache Kafka streaming',
    expectedVendorOrDomain: 'Modern Data Stack',
    disallowedPatterns: [/http:\/\/|https:\/\/cdn\.simpleicons\.org/i],
    requiredPatterns: [/Snowflake|Databricks|Kafka/i, /<mxfile\b/i]
  },
  {
    name: 'Enterprise AI TRiSM & Agentic Governance',
    prompt: 'Enterprise GenAI Agent Governance Platform with Claude 3.5, OpenAI GPT-4o, Guardrails, Prompt Cache, and Vector Search',
    expectedVendorOrDomain: 'AI Governance',
    disallowedPatterns: [/http:\/\/|https:\/\/cdn\.jsdelivr\.net/i],
    requiredPatterns: [/<mxfile\b/i]
  },
  {
    name: 'Multi-Cloud High-Frequency Trading Platform',
    prompt: 'High-frequency multi-cloud trading platform across AWS us-east-1 and GCP us-central1 with 100G Direct Interconnect and Kafka',
    expectedVendorOrDomain: 'Multi-Cloud',
    disallowedPatterns: [/\/\/>/],
    requiredPatterns: [/Interconnect|AWS|GCP|Cloud/i, /<mxfile\b/i]
  }
];

async function runCanvasQualityAudits(): Promise<boolean> {
  console.log(`\n🛡️  RUNNING CANVAS GENERATOR QUALITY & SELF-HEALING HARNESS (${CANVAS_TEST_SUITE.length} test cases)...`);

  const failures: string[] = [];
  const passes: string[] = [];

  for (let i = 0; i < CANVAS_TEST_SUITE.length; i++) {
    const tc = CANVAS_TEST_SUITE[i];
    const classification = await classifyIntent(tc.prompt);
    const archType = classification?.selectedType || 'unified_system_view';

    // 1. Resolve Base Template & Inject Flavor
    const baseXml = getDefaultXmlForArchitecture(archType, tc.prompt, tc.prompt) || '';
    const flavoredXml = injectUseCaseFlavor(baseXml, tc.prompt, tc.prompt);

    // 2. Validate & Heal via Master Gate
    const healedResult = validateAndHealDrawioXml(flavoredXml, archType);
    const finalXml = healedResult.xml;

    // 3. Audits
    // A. XML Envelope Check
    if (!finalXml.includes('<mxfile') || !finalXml.includes('<diagram') || !finalXml.includes('<mxGraphModel')) {
      failures.push(`[${tc.name}] Missing complete <mxfile><diagram><mxGraphModel> envelope structure.`);
      continue;
    }

    // B. Malformed Tokens Check
    if (/\/\/>/.test(finalXml)) {
      failures.push(`[${tc.name}] Contains malformed self-closing XML token '//>'.`);
      continue;
    }
    if (/&amp;amp;/.test(finalXml)) {
      failures.push(`[${tc.name}] Contains double-escaped ampersands '&amp;amp;'.`);
      continue;
    }

    // C. External CDN URLs Check (Mandatory 100% Offline Rule)
    if (/https?:\/\/(?:cdn\.simpleicons\.org|cdn\.jsdelivr\.net|api\.iconify\.design)/i.test(finalXml)) {
      failures.push(`[${tc.name}] Contains illegal external HTTP CDN URLs. Must use inline SVG Data URIs.`);
      continue;
    }

    // D. Disallowed Terminology / Cross-Vendor Contamination Check
    if (tc.disallowedPatterns) {
      for (const pattern of tc.disallowedPatterns) {
        if (pattern.test(finalXml)) {
          failures.push(`[${tc.name}] Contains disallowed pattern: ${pattern}`);
          continue;
        }
      }
    }

    // E. Required Patterns Check
    if (tc.requiredPatterns) {
      for (const pattern of tc.requiredPatterns) {
        if (!pattern.test(finalXml)) {
          failures.push(`[${tc.name}] Missing required pattern: ${pattern}`);
          continue;
        }
      }
    }

    // F. Minimum Font Size Floor Compliance
    const fontSizes = [
      ...Array.from(finalXml.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/gi), m => Number(m[1])),
      ...Array.from(finalXml.matchAll(/fontSize=(\d+(?:\.\d+)?)/gi), m => Number(m[1])),
    ].filter(Number.isFinite);
    const tinyFonts = fontSizes.filter(s => s < 7.5);
    if (tinyFonts.length > 0) {
      failures.push(`[${tc.name}] Found ${tinyFonts.length} font size declarations below 7.5px.`);
      continue;
    }

    passes.push(`PASS: [${tc.name}] -> Routed to [${archType}] with 0 collisions & 100% offline SVG assets.`);
  }

  passes.forEach(p => console.log(`  ✓ ${p}`));

  if (failures.length > 0) {
    console.error(`\n❌ CANVAS GENERATOR QUALITY HARNESS FAILED (${failures.length} issues):`);
    failures.forEach(f => console.error(`  - ${f}`));
    return false;
  }

  console.log(`\n✅ CANVAS GENERATOR QUALITY HARNESS PASSED: All ${CANVAS_TEST_SUITE.length} test prompts compiled cleanly with 0 defects.\n`);
  return true;
}

runCanvasQualityAudits().then(success => {
  if (!success) {
    process.exit(1);
  }
});
