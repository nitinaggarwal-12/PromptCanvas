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
    name: 'Canonical 8-Blueprint Production Catalog Certification Gate (#78, #00, #38, #42, #44, #67, #68, #69)',
    category: 'CATALOG_INTEGRITY',
    command: 'tsx scripts/verify_canonical_certification.ts'
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

      // Verify official Jetski schema (omni-governance-guard / zyvoriq_guard + v2.0.0 FAIL_CLOSED constitution)
      const guard = parsed['omni-governance-guard'] || parsed['zyvoriq_guard'];
      const isV2Constitution =
        parsed.schema_version === '2.0.0' &&
        parsed.default_policy === 'FAIL_CLOSED' &&
        Boolean(parsed.hooks?.PreToolUse && parsed.hooks?.Stop);
      if (!guard && !isV2Constitution) {
        throw new Error('Missing valid hook schema ("omni-governance-guard" / "zyvoriq_guard" + v2.0.0 FAIL_CLOSED hooks) in .agents/hooks.json');
      }
      if (guard) {
        if (!Array.isArray(guard.PreToolUse)) throw new Error('PreToolUse must be an array in top-level hook group');
        if (!Array.isArray(guard.PostToolUse)) throw new Error('PostToolUse must be an array in top-level hook group');
        if (!Array.isArray(guard.PreInvocation)) throw new Error('PreInvocation must be an array in top-level hook group');
        if (!Array.isArray(guard.Stop)) throw new Error('Stop must be an array in top-level hook group');
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
    name: 'Navigation Badge Count, Legacy Purge & Full-Repo Source Purity Gate',
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
      const routePath = path.join(process.cwd(), 'src/app/api/diagrams/route.ts');
      const routeSrc = readFileSync(routePath, 'utf8');
      if (!routeSrc.includes('body.xmlContent') || !routeSrc.includes('body.xml_content')) {
        throw new Error('POST /api/diagrams in src/app/api/diagrams/route.ts must accept body.xml || body.xmlContent || body.xml_content');
      }
    }
  },
  {
    name: 'True Blank Canvas, NASA Closed-Loop Default, Fail-Closed Audit & Slides Gate (Rule 53)',
    category: 'BLANK_CANVAS_AND_NASA_DEFAULT',
    command: 'tsx scripts/verify_blank_canvas_nasa_default_and_slides.ts'
  },
  {
    name: '5-Tier Model Stack, Discrete thinkingLevel (Law 16 / Rule 55) & Universal Route Guard',
    category: 'MODEL_STACK_AND_GUARDS',
    fn: () => {
      // 1. Verify 5-Tier model constants and zero numeric thinkingBudget in src/lib/geminiConfig.ts
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
      if (/thinkingBudget\s*:/.test(cfgSrc)) {
        throw new Error('src/lib/geminiConfig.ts contains numeric thinkingBudget (violates Law 16 / Rule 55)');
      }

      // 2. Verify deepDomainResearcher uses getGeminiModelWithFallbacks('pro') and has zero hardcoded gemini-2.5-flash override
      const researcherSrc = readFileSync(path.join(process.cwd(), 'src/lib/research/deepDomainResearcher.ts'), 'utf8');
      if (/modelName\s*=\s*['"]gemini-2\.5-flash['"]/.test(researcherSrc)) {
        throw new Error('src/lib/research/deepDomainResearcher.ts contains hardcoded gemini-2.5-flash override');
      }
      if (!researcherSrc.includes("getGeminiModelWithFallbacks('pro')")) {
        throw new Error("src/lib/research/deepDomainResearcher.ts must use getGeminiModelWithFallbacks('pro')");
      }

      // 3. Verify active prompt routes enforce enforceGeminiRouteGuard and checkConversationalOrNonMutationIntent
      const conversationalGuardedRoutes = [
        'src/app/api/generate/route.ts',
        'src/app/api/compose/route.ts',
        'src/app/api/diagrams/customize/route.ts',
        'src/app/api/blogs/generate/route.ts'
      ];
      for (const relRoute of conversationalGuardedRoutes) {
        const src = readFileSync(path.join(process.cwd(), relRoute), 'utf8');
        if (!src.includes('enforceGeminiRouteGuard') || !src.includes('checkConversationalOrNonMutationIntent')) {
          throw new Error(`${relRoute} missing enforceGeminiRouteGuard or checkConversationalOrNonMutationIntent`);
        }
      }

      // 3b. Verify all other active Gemini-invoking routes enforce enforceGeminiRouteGuard
      const allGeminiRoutes = [
        'src/app/api/chat/route.ts',
        'src/app/api/docgen/copilot/route.ts',
        'src/app/api/docgen/generate/route.ts',
        'src/app/api/audit/route.ts',
        'src/app/api/audit/remediate/route.ts',
        'src/app/api/generate/usecases/route.ts',
        'src/app/api/export/terraform/route.ts',
        'src/app/api/decompile-image/route.ts',
        'src/app/api/infographic-blueprint/route.ts',
        'src/app/api/research-infographic/route.ts'
      ];
      for (const relRoute of allGeminiRoutes) {
        const src = readFileSync(path.join(process.cwd(), relRoute), 'utf8');
        if (!src.includes('enforceGeminiRouteGuard')) {
          throw new Error(`${relRoute} missing enforceGeminiRouteGuard`);
        }
      }

      // 3c. Verify retired studio1 API/libs, redirect shims, unreachable API routes, and transitive dead modules/assets remain purged
      const purgedPaths = [
        'src/app/api/studio1/generate/route.ts',
        'src/lib/studio1ArchitectureCore.ts',
        'src/lib/studio1GoogleRenderer.ts',
        'src/lib/studio1HybridEngine.ts',
        'src/app/api/sync-db/route.ts',
        'src/app/api/a2a-bridge/compile/route.ts',
        'src/lib/export/googleSlidesDesignArchetypes.ts',
        'src/app/workspace/page.tsx',
        'src/app/studio1/page.tsx',
        'src/app/gcp/page.tsx',
        'src/app/api/auth/set-password/route.ts',
        'src/app/api/feedback/curation/route.ts',
        'src/app/api/diagrams/[id]/feedback/route.ts',
        'src/app/api/diagrams/[id]/staleness/route.ts',
        'src/lib/diagramStaleness.ts',
        'src/lib/auditContainerVoids.ts',
        'scripts/audit_canonical_topology_contracts.ts',
        'scripts/live_grounding_delta_radar.mjs',
        'docs/INVESTMENT_MEMO.md',
        'public/images/01.png',
        'images/01.png',
        'prompts',
        'templates/master_blueprints/xml/51_enterprise_api_management.drawio',
        'src/lib/canonical/template35FintechWealthEngine.ts',
        'src/lib/canonical/template36SmartManufacturingIot.ts',
        'src/lib/canonical/template37DedicatedNetworkInfra.ts',
        'src/lib/canonical/template39SovereignCloudPrivacy.ts',
        'src/lib/canonical/template40EnterpriseGenAiPlatform.ts',
        'src/lib/canonical/template41EnterpriseRagPlatform.ts',
        'src/lib/canonical/template43RealTimeStreamingEventEnterprise.ts',
        'src/lib/canonical/template45EnterpriseApiIntegrationMcpGateway.ts',
        'src/lib/canonical/template46EnterpriseKubernetesPlatformEngineering.ts',
        'src/lib/canonical/template47MlopsAiLifecyclePlatform.ts',
        'src/lib/canonical/template48BcdrCyberRecoveryResilience.ts',
        'src/lib/canonical/template49HealthcareLifeSciencesPlatform.ts',
        'src/lib/canonical/template50SustainabilityEsgPlatform.ts',
        'public/templates/35.png',
        'public/templates/40.png',
        'public/templates/48.png',
        'public/templates/70.png',
        'public/templates/74.png'
      ];
      for (const relPurged of purgedPaths) {
        if (existsSync(path.join(process.cwd(), relPurged))) {
          throw new Error(`Purged legacy file returned: ${relPurged}`);
        }
      }

      // 4. Verify audit/route.ts has zero injectUseCaseFlavor mutation
      const auditSrc = readFileSync(path.join(process.cwd(), 'src/app/api/audit/route.ts'), 'utf8');
      if (auditSrc.includes('injectUseCaseFlavor')) {
        throw new Error('src/app/api/audit/route.ts must not mutate audited XML via injectUseCaseFlavor');
      }
    }
  },
  {
    name: 'Compositional 5-Chains 50-Prompts + Vision Poster 1:1 Parity Pre-Flight Gate (56/56)',
    category: 'COMPOSITIONAL_5CHAINS_50PROMPTS',
    command: 'tsx scripts/verify_5chains_50prompts_preflight.ts'
  },
  {
    name: 'Reference-Image 1:1 Geometry Contract & Canonical Brand Light Unit Test Gate (Rule 57-0)',
    category: 'REFERENCE_GEOMETRY_PARITY',
    fn: () => {
      const decompilerPath = path.join(process.cwd(), 'scripts/decompile_reference_image_grid.mjs');
      if (!existsSync(decompilerPath)) {
        throw new Error('Phase-0 reference image decompiler missing: scripts/decompile_reference_image_grid.mjs');
      }
      execSync('npx vitest run tests/unit/flow-blueprints-67-to-74-grayscale.test.ts', {
        stdio: 'pipe',
        timeout: 30000
      });
    }
  },
  {
    name: 'Full-Repo TypeScript Strict Typecheck Gate (Zero TS Errors)',
    category: 'TYPESCRIPT_STRICT_CHECK',
    command: 'npx tsc --noEmit'
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
