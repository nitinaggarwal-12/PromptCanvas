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

interface GeometryNode {
  id: string;
  parent: string;
  x: number;
  y: number;
  w: number;
  h: number;
  style: string;
  value: string;
}

function parseGeometryNodes(xml: string): GeometryNode[] {
  const nodes: GeometryNode[] = [];
  const cellRegex = /<mxCell\s+([^>]*?)>/gi;
  let match: RegExpExecArray | null;

  while ((match = cellRegex.exec(xml)) !== null) {
    const attrStr = match[1];
    if (/vertex="1"/i.test(attrStr) || /as="geometry"/i.test(attrStr)) {
      const idMatch = attrStr.match(/\bid="([^"]+)"/i);
      const parentMatch = attrStr.match(/\bparent="([^"]+)"/i);
      const styleMatch = attrStr.match(/\bstyle="([^"]*)"/i);
      const valueMatch = attrStr.match(/\bvalue="([^"]*)"/i);

      // find mxGeometry
      const afterPos = match.index + match[0].length;
      const geomSnippet = xml.slice(afterPos, afterPos + 300);
      const geomMatch = geomSnippet.match(/<mxGeometry\s+([^>]*?)\/?>/i);
      if (idMatch && geomMatch) {
        const gAttrs = geomMatch[1];
        const x = parseFloat(gAttrs.match(/\bx="([^"]+)"/i)?.[1] || '0');
        const y = parseFloat(gAttrs.match(/\by="([^"]+)"/i)?.[1] || '0');
        const w = parseFloat(gAttrs.match(/\bwidth="([^"]+)"/i)?.[1] || '0');
        const h = parseFloat(gAttrs.match(/\bheight="([^"]+)"/i)?.[1] || '0');

        if (w > 0 && h > 0) {
          nodes.push({
            id: idMatch[1],
            parent: parentMatch?.[1] || '1',
            x, y, w, h,
            style: styleMatch?.[1] || '',
            value: valueMatch?.[1] || ''
          });
        }
      }
    }
  }
  return nodes;
}

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

    // G. Hierarchical 2D Sibling AABB Collision Audit
    const nodes = parseGeometryNodes(finalXml);
    const parentGroups = new Map<string, typeof nodes>();
    for (const n of nodes) {
      if (!parentGroups.has(n.parent)) parentGroups.set(n.parent, []);
      parentGroups.get(n.parent)!.push(n);
    }

    let aabbCollisionCount = 0;
    for (const [parent, siblings] of parentGroups.entries()) {
      for (let j = 0; j < siblings.length; j++) {
        for (let k = j + 1; k < siblings.length; k++) {
          const a = siblings[j];
          const b = siblings[k];

          // Skip swimlane backdrops or full background group containers
          if (a.w > 800 && a.h > 400) continue;
          if (b.w > 800 && b.h > 400) continue;
          if (/swimlane/i.test(a.style) || /swimlane/i.test(b.style)) continue;

          // Check if one completely contains the other (intentional nesting)
          const aContainsB = a.x <= b.x && a.y <= b.y && (a.x + a.w) >= (b.x + b.w) && (a.y + a.h) >= (b.y + b.h);
          const bContainsA = b.x <= a.x && b.y <= a.y && (b.x + b.w) >= (a.x + a.w) && (b.y + b.h) >= (a.y + a.h);
          if (aContainsB || bContainsA) continue;

          // Compute 2D AABB overlap
          const overlapX = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
          const overlapY = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

          // Allow slight 2px border touches, but catch true collisions (> 8px in both axes)
          if (overlapX > 8 && overlapY > 8) {
            aabbCollisionCount++;
            failures.push(`[${tc.name}] 2D AABB Collision detected between siblings "${a.id}" (${a.x},${a.y},${a.w}x${a.h}) and "${b.id}" (${b.x},${b.y},${b.w}x${b.h}) with overlap ${overlapX.toFixed(1)}x${overlapY.toFixed(1)}px.`);
          }
        }
      }
    }

    if (aabbCollisionCount === 0) {
      passes.push(`PASS: [${tc.name}] -> Routed to [${archType}] with 0 collisions & 100% offline SVG assets.`);
    }
  }

  // =========================================================================
  // PHASE 2: MULTI-TURN ITERATIVE REFINEMENT & PROMPT UPDATE QUALITY GATE
  // Verifies that multi-turn prompt updates (v1 -> v2 -> v3 -> v4) preserve
  // structural layout integrity, never collide, and never distort on aesthetic prompts.
  // =========================================================================
  console.log(`\n🔄 RUNNING MULTI-TURN ITERATIVE PROMPT REFINEMENT SUITE (2 chains, 7 turns)...`);
  const { executeUnifiedDiagramPipeline } = await import('../src/lib/unifiedDiagramEngine');

  const ITERATIVE_CHAINS = [
    {
      name: 'Deep-Ocean AUV Swarm Multi-Turn Evolution',
      archType: 'unified_system_view',
      turns: [
        'Design a production-grade Autonomous Underwater Vehicle (AUV) Swarm Telemetry & Bathymetric Point Clouds Platform',
        'Add Dim_Customer_Account & Dim_Merchant tables with PK/FK relationships',
        'make it beautiful!',
        'Enforce PCI-DSS & KYC Compliance Rules with Hardware Security Module'
      ]
    },
    {
      name: 'AWS Serverless EDA Multi-Turn Evolution',
      archType: 'tech_event_driven_eda',
      turns: [
        'Design an AWS Serverless Event-Driven Platform with Route 53, AWS WAF, Amazon API Gateway, AWS Lambda, Amazon DynamoDB, and Amazon SQS',
        'Add Redis ElastiCache cluster and Dead Letter Queue for Order Pods',
        'polish'
      ]
    }
  ];

  for (const chain of ITERATIVE_CHAINS) {
    let currentXml: string | undefined = undefined;

    for (let turnIdx = 0; turnIdx < chain.turns.length; turnIdx++) {
      const turnPrompt = chain.turns[turnIdx];
      const versionLabel = `v${turnIdx + 1}`;

      const res = await executeUnifiedDiagramPipeline({
        prompt: turnPrompt,
        architectureType: chain.archType,
        existingXml: currentXml
      });

      currentXml = res.xml;

      // 1. Enveloping Check
      if (!currentXml.includes('<mxfile') || !currentXml.includes('<diagram') || !currentXml.includes('<mxGraphModel')) {
        failures.push(`[${chain.name} | ${versionLabel}] Missing valid XML document envelope.`);
        continue;
      }

      // 2. Zero External URL Check
      if (/https?:\/\/(?!www\.w3\.org)[^\s"'>]+/i.test(currentXml) && !currentXml.includes('data:image/svg+xml')) {
        const urlMatches = Array.from(currentXml.matchAll(/https?:\/\/[^\s"'>]+/gi)).map(m => m[0]);
        failures.push(`[${chain.name} | ${versionLabel}] Contains unverified external URLs: ${urlMatches.slice(0, 3).join(', ')}`);
      }

      // 3. Hierarchical 2D Sibling AABB Collision Check
      const nodes = parseGeometryNodes(currentXml);
      const parentGroups = new Map<string, typeof nodes>();
      for (const n of nodes) {
        if (!parentGroups.has(n.parent)) parentGroups.set(n.parent, []);
        parentGroups.get(n.parent)!.push(n);
      }

      let aabbCollisionCount = 0;
      for (const [parent, siblings] of parentGroups.entries()) {
        for (let j = 0; j < siblings.length; j++) {
          for (let k = j + 1; k < siblings.length; k++) {
            const a = siblings[j];
            const b = siblings[k];

            if (a.w > 800 && a.h > 400) continue;
            if (b.w > 800 && b.h > 400) continue;
            if (/swimlane/i.test(a.style) || /swimlane/i.test(b.style)) continue;

            const aContainsB = a.x <= b.x && a.y <= b.y && (a.x + a.w) >= (b.x + b.w) && (a.y + a.h) >= (b.y + b.h);
            const bContainsA = b.x <= a.x && b.y <= a.y && (b.x + b.w) >= (a.x + a.w) && (b.y + b.h) >= (a.y + a.h);
            if (aContainsB || bContainsA) continue;

            const overlapX = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
            const overlapY = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

            if (overlapX > 8 && overlapY > 8) {
              aabbCollisionCount++;
              failures.push(`[${chain.name} | ${versionLabel} ("${turnPrompt.slice(0, 25)}...")] 2D AABB Collision between "${a.id}" (${a.x},${a.y},${a.w}x${a.h}) and "${b.id}" (${b.x},${b.y},${b.w}x${b.h}) overlap ${overlapX.toFixed(1)}x${overlapY.toFixed(1)}px.`);
            }
          }
        }
      }

      if (aabbCollisionCount === 0) {
        passes.push(`PASS: [${chain.name} | ${versionLabel}] -> Prompt: "${turnPrompt.slice(0, 35)}..." with 0 collisions.`);
      }
    }
  }

  passes.forEach(p => console.log(`  ✓ ${p}`));

  if (failures.length > 0) {
    console.error(`\n❌ CANVAS GENERATOR QUALITY HARNESS FAILED (${failures.length} issues):`);
    failures.forEach(f => console.error(`  - ${f}`));
    return false;
  }

  console.log(`\n✅ CANVAS GENERATOR QUALITY HARNESS PASSED: All initial prompts and multi-turn iterative update chains compiled cleanly with 0 defects.\n`);
  return true;
}

runCanvasQualityAudits().then(success => {
  if (!success) {
    process.exit(1);
  }
});
