/**
 * Google Omni 1.1 Architecture & Canvas Master Quality Gate Runner
 * Standard: 16:9 Widescreen | Zero Visual Collisions | Offline SVG Assets | Jetski Hook Lifecycle
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

interface GateStep {
  name: string;
  category: string;
  command?: string;
  fn?: () => void;
}

const steps: GateStep[] = [
  {
    name: 'Blueprint Render Safety & Layout Pitch Gate',
    category: 'RENDER_SAFETY',
    command: 'tsx scripts/check-blueprint-render-safety.ts'
  },
  {
    name: 'Master Blueprint Catalog Quality Certification (60 Blueprints)',
    category: 'CATALOG_INTEGRITY',
    command: 'tsx scripts/check-blueprint-catalog-quality.ts'
  },
  {
    name: 'Canvas Generator Multi-Turn Evolution & Self-Healing Harness',
    category: 'CANVAS_GENERATION',
    command: 'tsx scripts/check-canvas-generator-quality.ts'
  },
  {
    name: 'Omni 1.1 Governance Hooks & Script Manifest Verification',
    category: 'HOOKS_GOVERNANCE',
    fn: () => {
      const hooksPath = path.join(process.cwd(), '.agents/hooks.json');
      if (!existsSync(hooksPath)) throw new Error('.agents/hooks.json missing in PromptCanvas');
      
      const content = readFileSync(hooksPath, 'utf8');
      let parsed: any;
      try {
        parsed = JSON.parse(content);
      } catch (err: any) {
        throw new Error(`Invalid JSON syntax in .agents/hooks.json: ${err.message}`);
      }

      // Verify official Jetski schema (supports v2.0.0 FAIL_CLOSED constitution and legacy omni-governance-guard)
      const guard = parsed['omni-governance-guard'];
      const isV2Constitution =
        parsed.schema_version === '2.0.0' &&
        parsed.default_policy === 'FAIL_CLOSED' &&
        Boolean(parsed.hooks?.PreToolUse && parsed.hooks?.Stop);
      if (!guard && !isV2Constitution) {
        throw new Error('Missing valid hook schema ("omni-governance-guard" or v2.0.0 FAIL_CLOSED hooks) in .agents/hooks.json');
      }
      if (guard) {
        if (!Array.isArray(guard.PreToolUse)) throw new Error('PreToolUse must be an array in omni-governance-guard');
        if (!Array.isArray(guard.Stop)) throw new Error('Stop must be an array in omni-governance-guard');
      }

      // Verify referenced scripts exist
      const requiredScripts = [
        'scripts/pre_invocation_memory.mjs',
        'scripts/pre_tool_guard.mjs',
        'scripts/post_tool_verifier.mjs',
        'scripts/stop_quality_gate.mjs'
      ];
      for (const s of requiredScripts) {
        if (!existsSync(path.join(process.cwd(), s))) {
          throw new Error(`Referenced lifecycle hook script missing: ${s}`);
        }
      }
    }
  },
  {
    name: 'Architecture Documentation & Runbook Integrity Audit',
    category: 'DOC_INTEGRITY',
    fn: () => {
      const requiredDocs = ['README.md', 'ARCHITECTURE.md', 'RUNBOOK.md', 'AGENTS.md'];
      for (const doc of requiredDocs) {
        if (!existsSync(path.join(process.cwd(), doc))) {
          throw new Error(`Mandatory architecture doc missing: ${doc}`);
        }
      }
    }
  },
  {
    name: 'Export & Google Slides Studio Zero-Deformity Gate (1:1 Twin, style.image SVG & Cloud Bridge)',
    category: 'EXPORT_SLIDES_PARITY',
    command: 'tsx scripts/verify_export_slides_quality_gate.ts'
  },
  {
    name: 'Navigation Badge Count & Obsolete Route Drift Gate',
    category: 'NAVIGATION_INTEGRITY',
    command: 'node scripts/verify_nav_badge_counts.mjs'
  },
  {
    name: 'Universal Multi-Project Governance Doc & Skill Lockstep Sync Gate',
    category: 'GOVERNANCE_SYNC',
    command: 'node scripts/guards/gate_governance_doc_sync.mjs'
  },
  {
    name: 'Persisted Library Diagram XML Uniqueness & API Payload Contract Gate',
    category: 'LIBRARY_XML_UNIQUENESS',
    fn: () => {
      // 1. Verify POST /api/diagrams accepts xml, xmlContent, and xml_content without dropping payload
      const routePath = path.join(process.cwd(), 'src/app/api/diagrams/route.ts');
      const routeSrc = readFileSync(routePath, 'utf8');
      if (!routeSrc.includes('body.xmlContent') || !routeSrc.includes('body.xml_content')) {
        throw new Error('POST /api/diagrams in src/app/api/diagrams/route.ts must accept body.xml || body.xmlContent || body.xml_content');
      }
      // 2. Verify persisted user batch diagrams in SQLite have 100% distinct XML topologies (zero identical fallback XMLs)
      const { DatabaseSync } = require('node:sqlite');
      const crypto = require('crypto');
      const dbPath = process.env.DATABASE_PATH || '/Users/nitinagga/.gemini/jetski/dev.db';
      if (existsSync(dbPath)) {
        const db = new DatabaseSync(dbPath);
        const rows = db.prepare(`
          SELECT d.id, d.name, v.prompt, v.xml_content
          FROM diagrams d
          JOIN diagram_versions v ON v.diagram_id = d.id
          WHERE d.name GLOB '[0-9][0-9] •*'
        `).all() as { id: string; name: string; prompt: string; xml_content: string }[];
        const seenByPrefix = new Map<string, { name: string; prompt: string; xml: string; hash: string; len: number }>();
        for (const r of rows) {
          const prefix = r.name.slice(0, 4);
          const hash = crypto.createHash('sha256').update(r.xml_content || '').digest('hex').slice(0, 16);
          seenByPrefix.set(prefix, {
            name: r.name,
            prompt: r.prompt || '',
            xml: r.xml_content || '',
            hash,
            len: (r.xml_content || '').length
          });
        }
        const hashes = new Map<string, string>();
        for (const [prefix, info] of seenByPrefix.entries()) {
          if (hashes.has(info.hash)) {
            throw new Error(`Duplicate XML topology detected in Library between "${info.name}" and "${hashes.get(info.hash)}" (hash=${info.hash}, len=${info.len})`);
          }
          hashes.set(info.hash, info.name);

          // 1. Assert zero static template spoofing (NOVACURA / Veeva / Pharmacovigilance / 17 Identity)
          if (/NOVACURA|Veeva Vault|Pharmacovigilance|17 Identity & Access Flow/i.test(info.xml)) {
            throw new Error(`Spoofed static template detected inside "${info.name}"! XML contains hardcoded NOVACURA/Veeva/17 Identity nodes unrelated to prompt.`);
          }

          // 2. Assert Semantic Prompt-to-Canvas Subject Parity (>= 80% of key technical terms in prompt exist in rendered XML)
          const stopWords = new Set(['design', 'architect', 'build', 'evolve', 'canonical', 'blueprint', 'into', 'with', 'using', 'across', 'featuring', 'integrating', 'and', 'the', 'for', 'from']);
          const promptTokens = (info.prompt.toLowerCase().match(/[a-z0-9-]{4,}/g) || [])
            .filter((tok) => !stopWords.has(tok));
          const uniqueTokens = Array.from(new Set(promptTokens));
          const xmlLower = info.xml.toLowerCase();
          const matchedTokens = uniqueTokens.filter((tok) => xmlLower.includes(tok));
          const coverage = uniqueTokens.length > 0 ? matchedTokens.length / uniqueTokens.length : 1;
          if (coverage < 0.8) {
            throw new Error(`Semantic Prompt-to-Diagram Mismatch in "${info.name}": only ${(coverage * 100).toFixed(0)}% of prompt entities found in XML (required >= 80%).`);
          }
        }
      }
    }
  },
  {
    name: 'Infographic Blueprints (#52–#66) 1:1 Native Canvas, Zero Double-Escape & Side-by-Side Parity Gate (Rule 43)',
    category: 'INFOGRAPHIC_1TO1_PARITY',
    fn: () => {
      const { generateInfographicBlueprintXmlById } = require('../src/lib/canonical/infographicBlueprints52to66');
      const expectedDims: Record<string, [number, number]> = {
        '52': [1075, 1290],
        '53': [1075, 1310],
        '54': [886, 1024],
        '55': [855, 1024],
        '56': [765, 1024],
        '57': [765, 1024],
        '58': [765, 1024],
        '59': [765, 1024],
        '60': [765, 1024],
        '61': [765, 1024],
        '62': [765, 1024],
        '63': [765, 1024],
        '64': [765, 1024],
        '65': [765, 1024],
        '66': [765, 1024]
      };

      for (const [id, [w, h]] of Object.entries(expectedDims)) {
        const xml = generateInfographicBlueprintXmlById(id);
        if (!xml.includes(`pageWidth="${w}"`) || !xml.includes(`pageHeight="${h}"`)) {
          throw new Error(`Infographic #${id} failed Native Pixel Canvas Lock: expected pageWidth="${w}" pageHeight="${h}"`);
        }
        if (!xml.includes('id="poster_bg"')) {
          throw new Error(`Infographic #${id} missing mandatory id="poster_bg" background bounding box cell`);
        }
        if (/&amp;lt;(?:div|svg|span)\b/i.test(xml)) {
          throw new Error(`Double-escaped HTML/SVG regression (&amp;lt;div or &amp;lt;svg) detected in Infographic #${id}`);
        }
      }

      // Verify Side-by-Side zero-inset parity in DiagramViewerRenderSafe.tsx & Vision Decompiler registration
      const viewerSrc = readFileSync(path.join(process.cwd(), 'src/components/DiagramViewerRenderSafe.tsx'), 'utf8');
      if (!viewerSrc.includes('poster_bg')) {
        throw new Error('src/components/DiagramViewerRenderSafe.tsx missing poster_bg zero-padding viewBox lock');
      }
      const visionSrc = readFileSync(path.join(process.cwd(), 'src/lib/deepmindVisionDecompiler.ts'), 'utf8');
      if (!visionSrc.includes('generateInfographicBlueprintXmlById')) {
        throw new Error('src/lib/deepmindVisionDecompiler.ts missing deterministic registration for #52-#66 Infographic Blueprints');
      }
    }
  },
  {
    name: '5-Tier Model Stack, Universal Route Guard & Anti-Spoofing Audit Gate (v2.8.0)',
    category: 'MODEL_STACK_AND_GUARDS',
    fn: () => {
      // 1. Verify 5-Tier model constants in src/lib/geminiConfig.ts
      const cfgSrc = readFileSync(path.join(process.cwd(), 'src/lib/geminiConfig.ts'), 'utf8');
      const requiredModelIds = [
        'google-omni-1.1',
        'gemini-3.1-pro-preview',
        'gemini-3.8-flash',
        'gemini-3.1-flash-live-preview',
        'veo-3.1-generate-preview',
        'lyria-3.5'
      ];
      for (const mId of requiredModelIds) {
        if (!cfgSrc.includes(mId)) {
          throw new Error(`src/lib/geminiConfig.ts missing required 5-Tier model constant: ${mId}`);
        }
      }

      // 2. Verify deepDomainResearcher uses getGeminiModelWithFallbacks('pro') and has zero hardcoded gemini-2.5-flash override
      const researcherSrc = readFileSync(path.join(process.cwd(), 'src/lib/research/deepDomainResearcher.ts'), 'utf8');
      if (/modelName\s*=\s*['"]gemini-2\.5-flash['"]/.test(researcherSrc)) {
        throw new Error('src/lib/research/deepDomainResearcher.ts contains hardcoded gemini-2.5-flash override');
      }
      if (!researcherSrc.includes("getGeminiModelWithFallbacks('pro')")) {
        throw new Error("src/lib/research/deepDomainResearcher.ts must use getGeminiModelWithFallbacks('pro')");
      }

      // 3. Verify all prompt routes enforce enforceGeminiRouteGuard and checkConversationalOrNonMutationIntent
      const conversationalGuardedRoutes = [
        'src/app/api/generate/route.ts',
        'src/app/api/compose/route.ts',
        'src/app/api/diagrams/customize/route.ts',
        'src/app/api/research-infographic/route.ts',
        'src/app/api/infographic-blueprint/route.ts'
      ];
      for (const relRoute of conversationalGuardedRoutes) {
        const src = readFileSync(path.join(process.cwd(), relRoute), 'utf8');
        if (!src.includes('enforceGeminiRouteGuard') || !src.includes('checkConversationalOrNonMutationIntent')) {
          throw new Error(`${relRoute} missing enforceGeminiRouteGuard or checkConversationalOrNonMutationIntent`);
        }
      }

      // 3b. Verify all other Gemini-invoking routes enforce enforceGeminiRouteGuard
      const allGeminiRoutes = [
        'src/app/api/chat/route.ts',
        'src/app/api/studio1/generate/route.ts',
        'src/app/api/docgen/copilot/route.ts',
        'src/app/api/docgen/generate/route.ts',
        'src/app/api/audit/route.ts',
        'src/app/api/audit/remediate/route.ts',
        'src/app/api/generate/usecases/route.ts',
        'src/app/api/export/terraform/route.ts'
      ];
      for (const relRoute of allGeminiRoutes) {
        const src = readFileSync(path.join(process.cwd(), relRoute), 'utf8');
        if (!src.includes('enforceGeminiRouteGuard')) {
          throw new Error(`${relRoute} missing enforceGeminiRouteGuard`);
        }
      }

      // 4. Verify Studio1 gates are enabled, audit/route.ts has zero injectUseCaseFlavor mutation, and dynamicTieredInfographic has zero Policy Harness / Knowledge Graph mad-libs
      const studio1Src = readFileSync(path.join(process.cwd(), 'src/app/api/studio1/generate/route.ts'), 'utf8');
      if (studio1Src.includes('ENFORCE_STUDIO1_GATES = false')) {
        throw new Error('src/app/api/studio1/generate/route.ts has ENFORCE_STUDIO1_GATES = false');
      }
      const auditSrc = readFileSync(path.join(process.cwd(), 'src/app/api/audit/route.ts'), 'utf8');
      if (auditSrc.includes('injectUseCaseFlavor')) {
        throw new Error('src/app/api/audit/route.ts must not mutate audited XML via injectUseCaseFlavor');
      }
      const dynInfoSrc = readFileSync(path.join(process.cwd(), 'src/lib/canonical/dynamicTieredInfographic.ts'), 'utf8');
      if (/\$\{subjectTopic\}\s+Policy Harness|\$\{subjectTopic\}\s+Knowledge Graph/.test(dynInfoSrc)) {
        throw new Error('src/lib/canonical/dynamicTieredInfographic.ts contains banned Policy Harness / Knowledge Graph mad-libs');
      }

      // 5. Verify Single-Studio Consolidation: /workspace, /studio1, and /gcp must be lightweight redirect shims to /studio
      for (const shimRoute of ['src/app/workspace/page.tsx', 'src/app/studio1/page.tsx', 'src/app/gcp/page.tsx']) {
        const shimSrc = readFileSync(path.join(process.cwd(), shimRoute), 'utf8');
        if (!shimSrc.includes('router.replace') || !shimSrc.includes('/studio') || shimSrc.split('\n').length > 40) {
          throw new Error(`${shimRoute} must be a lightweight redirect shim (<40 lines) forwarding to /studio`);
        }
      }
    }
  }
];

async function runQualityGate() {
  console.log(`\n${BOLD}================================================================================${RESET}`);
  console.log(`${BOLD}       GOOGLE OMNI 1.1 ARCHITECTURE & CANVAS MASTER QUALITY GATE (v2.8.0) ${RESET}`);
  console.log(`${BOLD}       Standards: 16:9 Widescreen | 5-Tier AI Stack | Zero Static Spoofing${RESET}`);
  console.log(`${BOLD}================================================================================${RESET}\n`);

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    process.stdout.write(`  [${i + 1}/${steps.length}] ${CYAN}${step.name}${RESET}... `);
    const start = Date.now();
    try {
      if (step.command) {
        execSync(step.command, { stdio: 'pipe', timeout: 45000 });
      } else if (step.fn) {
        step.fn();
      }
      const duration = Date.now() - start;
      console.log(`${GREEN}PASSED${RESET} (${duration}ms)`);
      passed++;
    } catch (err: any) {
      const duration = Date.now() - start;
      console.log(`${RED}FAILED${RESET} (${duration}ms)`);
      console.error(`     Error: ${err.message || err.stderr?.toString()}`);
      failed++;
    }
  }

  console.log(`\n${BOLD}================================================================================${RESET}`);
  console.log(`${BOLD}                        QUALITY GATE VERDICT                                    ${RESET}`);
  console.log(`${BOLD}================================================================================${RESET}`);
  console.log(`Total Verification Gates: ${steps.length}`);
  console.log(`Passed Gates:             ${passed}`);
  console.log(`Failed Gates:             ${failed}`);

  if (failed === 0) {
    console.log(`\n${GREEN}${BOLD}🏆 CERTIFIED: All ${steps.length} Omni 1.1 architecture quality gates passed with 0 defects.${RESET}\n`);
    process.exit(0);
  } else {
    console.error(`\n${RED}${BOLD}🚨 REJECTED: ${failed} quality gate(s) failed.${RESET}\n`);
    process.exit(1);
  }
}

runQualityGate();
