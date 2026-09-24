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

      // Verify official Jetski schema
      const guard = parsed['omni-governance-guard'];
      if (!guard) throw new Error('Missing top-level named hook "omni-governance-guard" in .agents/hooks.json');
      if (!Array.isArray(guard.PreToolUse)) throw new Error('PreToolUse must be an array in omni-governance-guard');
      if (!Array.isArray(guard.Stop)) throw new Error('Stop must be an array in omni-governance-guard');

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
          SELECT d.id, d.name, v.xml_content
          FROM diagrams d
          JOIN diagram_versions v ON v.diagram_id = d.id
          WHERE d.name GLOB '[0-9][0-9] •*'
        `).all() as { id: string; name: string; xml_content: string }[];
        const seenByPrefix = new Map<string, { name: string; hash: string; len: number }>();
        for (const r of rows) {
          const prefix = r.name.slice(0, 4);
          const hash = crypto.createHash('sha256').update(r.xml_content || '').digest('hex').slice(0, 16);
          seenByPrefix.set(prefix, { name: r.name, hash, len: (r.xml_content || '').length });
        }
        const hashes = new Map<string, string>();
        for (const [prefix, info] of seenByPrefix.entries()) {
          if (hashes.has(info.hash)) {
            throw new Error(`Duplicate XML topology detected in Library between "${info.name}" and "${hashes.get(info.hash)}" (hash=${info.hash}, len=${info.len})`);
          }
          hashes.set(info.hash, info.name);
        }
      }
    }
  }
];

async function runQualityGate() {
  console.log(`\n${BOLD}================================================================================${RESET}`);
  console.log(`${BOLD}       GOOGLE OMNI 1.1 ARCHITECTURE & CANVAS MASTER QUALITY GATE          ${RESET}`);
  console.log(`${BOLD}       Standards: 16:9 Widescreen | Zero Collisions | Pure Offline SVGs    ${RESET}`);
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
    console.log(`\n${GREEN}${BOLD}🏆 CERTIFIED: All 5 Omni 1.1 architecture quality gates passed with 0 defects.${RESET}\n`);
    process.exit(0);
  } else {
    console.error(`\n${RED}${BOLD}🚨 REJECTED: ${failed} quality gate(s) failed.${RESET}\n`);
    process.exit(1);
  }
}

runQualityGate();
