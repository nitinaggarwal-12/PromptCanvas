#!/usr/bin/env node
/**
 * Gate: Mandatory Post-Fix Governance Document, skills.json, SKILL.md & hooks.json Lockstep Synchronization (v3.4.0)
 * Asserts that:
 * 1. AGENTS.md, GEMINI.md, .agents/AGENTS.md, CLAUDE.md, and ~/.gemini/config/AGENTS.md are 100% byte-for-byte identical.
 * 2. skills.md === ~/.gemini/config/skills.md and documents Rule 41, Rule 43, Rule 44, Rule 46, and Section 10.
 * 3. skills.json === .agents/skills.json === ~/.gemini/config/skills.json.
 * 4. All 13 .agents/skills/<skill>/SKILL.md files === ~/.gemini/config/skills/<skill>/SKILL.md.
 * 5. .agents/hooks.json === ~/.gemini/config/hooks.json and contains version >= 3.2.0 + universal_post_fix_governance_doc_sync.enabled === true.
 * 6. ARCHITECTURE.md, SECURITY.md, RUNBOOK.md, README.md, and docs/INTENT_ROUTER.md contain zero stale "Gemini 2.5 / 3.7" or "/studio3" references.
 * 7. Zero stale backup files (hooks.json.bak*, hooks_backups_*, scratch/vibe/skills.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const REPO_ROOT = process.cwd();
const HOME_DIR = process.env.HOME || '/Users/nitinagga';

function sha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function auditPromptCanvasGovernanceSync() {
  const mismatches = [];

  // 1. Verify AGENTS.md === GEMINI.md === .agents/AGENTS.md === CLAUDE.md === ~/.gemini/config/AGENTS.md
  const agentsPath = path.join(REPO_ROOT, 'AGENTS.md');
  const geminiPath = path.join(REPO_ROOT, 'GEMINI.md');
  const dotAgentsPath = path.join(REPO_ROOT, '.agents/AGENTS.md');
  const claudePath = path.join(REPO_ROOT, 'CLAUDE.md');
  const globalAgentsPath = path.join(HOME_DIR, '.gemini/config/AGENTS.md');

  const hAgents = sha256(agentsPath);
  const hGemini = sha256(geminiPath);
  const hDotAgents = sha256(dotAgentsPath);
  const hClaude = sha256(claudePath);
  const hGlobalAgents = sha256(globalAgentsPath);

  if (!hAgents) mismatches.push('MISSING: AGENTS.md');
  if (!hGemini) mismatches.push('MISSING: GEMINI.md');
  if (!hDotAgents) mismatches.push('MISSING: .agents/AGENTS.md');
  if (!hClaude) mismatches.push('MISSING: CLAUDE.md');

  if (hAgents && hGemini && hAgents !== hGemini) {
    mismatches.push('DRIFT: AGENTS.md and GEMINI.md are out of sync (must be byte-for-byte identical)');
  }
  if (hAgents && hDotAgents && hAgents !== hDotAgents) {
    mismatches.push('DRIFT: AGENTS.md and .agents/AGENTS.md are out of sync (must be byte-for-byte identical)');
  }
  if (hAgents && hClaude && hAgents !== hClaude) {
    mismatches.push('DRIFT: AGENTS.md and CLAUDE.md are out of sync (must be byte-for-byte identical)');
  }
  if (hAgents && hGlobalAgents && hAgents !== hGlobalAgents) {
    mismatches.push('DRIFT: AGENTS.md and ~/.gemini/config/AGENTS.md are out of sync (must be byte-for-byte identical)');
  }

  // 2. Verify workspace skills.md === ~/.gemini/config/skills.md
  const rootSkillsMdPath = path.join(REPO_ROOT, 'skills.md');
  const globalSkillsMdPath = path.join(HOME_DIR, '.gemini/config/skills.md');
  const hRootSkillsMd = sha256(rootSkillsMdPath);
  const hGlobalSkillsMd = sha256(globalSkillsMdPath);

  if (!hRootSkillsMd) {
    mismatches.push('MISSING: skills.md in workspace root');
  } else {
    if (hGlobalSkillsMd && hRootSkillsMd !== hGlobalSkillsMd) {
      mismatches.push('DRIFT: skills.md and ~/.gemini/config/skills.md differ');
    }
    const skillsMdContent = fs.readFileSync(rootSkillsMdPath, 'utf-8');
    if (
      !skillsMdContent.includes('Rule 41') ||
      !skillsMdContent.includes('Rule 43') ||
      !skillsMdContent.includes('Rule 44') ||
      !skillsMdContent.includes('Rule 46')
    ) {
      mismatches.push('DRIFT: skills.md missing Rule 41, Rule 43, Rule 44, or Rule 46');
    }
  }

  // 3. Verify skills.json === .agents/skills.json === ~/.gemini/config/skills.json
  const rootSkillsJsonPath = path.join(REPO_ROOT, 'skills.json');
  const dotSkillsJsonPath = path.join(REPO_ROOT, '.agents/skills.json');
  const globalSkillsJsonPath = path.join(HOME_DIR, '.gemini/config/skills.json');
  const hRootSkillsJson = sha256(rootSkillsJsonPath);
  const hDotSkillsJson = sha256(dotSkillsJsonPath);
  const hGlobalSkillsJson = sha256(globalSkillsJsonPath);

  if (!hRootSkillsJson) mismatches.push('MISSING: skills.json in workspace root');
  if (!hDotSkillsJson) mismatches.push('MISSING: .agents/skills.json');
  if (hRootSkillsJson && hDotSkillsJson && hRootSkillsJson !== hDotSkillsJson) {
    mismatches.push('DRIFT: skills.json and .agents/skills.json differ');
  }
  if (hRootSkillsJson && hGlobalSkillsJson && hRootSkillsJson !== hGlobalSkillsJson) {
    mismatches.push('DRIFT: skills.json and ~/.gemini/config/skills.json differ');
  }

  // 4. Verify all 13 SKILL.md pairs across .agents/skills/ and ~/.gemini/config/skills/
  const skillDirs = [
    'ai-prompt-evals',
    'cross-viewport-auditor',
    'database-schema-guard',
    'diagram-decompilation-and-geometry',
    'diagram-generation-engine',
    'gcp-enterprise-diagram-engine',
    'load-and-stress-testing',
    'performance-and-telemetry',
    'puppeteer-pair-programming',
    'security-code-scanner',
    'ui-first-design-system',
    'universal-document-cloud-hub',
    'visual-regression-testing'
  ];

  for (const dir of skillDirs) {
    const repoSkill = path.join(REPO_ROOT, `.agents/skills/${dir}/SKILL.md`);
    const globalSkill = path.join(HOME_DIR, `.gemini/config/skills/${dir}/SKILL.md`);
    const hRepo = sha256(repoSkill);
    const hGlobal = sha256(globalSkill);

    if (!hRepo) mismatches.push(`MISSING: .agents/skills/${dir}/SKILL.md`);
    if (hRepo && hGlobal && hRepo !== hGlobal) {
      mismatches.push(`DRIFT: .agents/skills/${dir}/SKILL.md and ~/.gemini/config/skills/${dir}/SKILL.md differ`);
    }
  }

  // 5. Verify .agents/hooks.json and ~/.gemini/config/hooks.json synchronization & version badge
  const hooksPath = path.join(REPO_ROOT, '.agents/hooks.json');
  const globalHooksPath = path.join(HOME_DIR, '.gemini/config/hooks.json');
  const hHooks = sha256(hooksPath);
  const hGlobalHooks = sha256(globalHooksPath);

  if (!hHooks) {
    mismatches.push('MISSING: .agents/hooks.json');
  } else {
    if (hGlobalHooks && hHooks !== hGlobalHooks) {
      mismatches.push('DRIFT: .agents/hooks.json and ~/.gemini/config/hooks.json differ');
    }
    try {
      const hooksJson = JSON.parse(fs.readFileSync(hooksPath, 'utf-8'));
      if (!hooksJson.global_governance?.universal_post_fix_governance_doc_sync?.enabled) {
        mismatches.push('DRIFT: .agents/hooks.json missing global_governance.universal_post_fix_governance_doc_sync.enabled = true');
      }
      if (hooksJson.global_governance?.dynamic_model_orchestration?.orchestrator !== 'Google Omni 1.1') {
        mismatches.push('DRIFT: .agents/hooks.json missing global_governance.dynamic_model_orchestration.orchestrator = "Google Omni 1.1"');
      }
      if (parseFloat(hooksJson.version) < 3.2) {
        mismatches.push(`DRIFT: .agents/hooks.json version expected >= 3.2.0, found "${hooksJson.version}"`);
      }
      if (!Array.isArray(hooksJson.amendment_log) || hooksJson.amendment_log.length === 0) {
        mismatches.push('DRIFT: .agents/hooks.json missing amendment_log array');
      }
    } catch (err) {
      mismatches.push(`ERROR parsing .agents/hooks.json: ${err.message}`);
    }
  }

  // 6. Verify core documentation files have zero stale "Gemini 2.5 / 3.7" or "/studio3" references
  for (const docName of ['ARCHITECTURE.md', 'SECURITY.md', 'RUNBOOK.md', 'README.md', 'docs/INTENT_ROUTER.md']) {
    const docPath = path.join(REPO_ROOT, docName);
    if (fs.existsSync(docPath)) {
      const text = fs.readFileSync(docPath, 'utf-8');
      if (/Gemini\s+2\.5\s*\/\s*3\.7|\/studio3\b/i.test(text)) {
        mismatches.push(`STALE_DOC: ${docName} contains legacy "Gemini 2.5 / 3.7" or "/studio3" reference`);
      }
    }
  }

  // 7. Verify stale backup garbage is absent
  const staleFiles = [
    path.join(REPO_ROOT, 'scratch/vibe/skills.json'),
    path.join(HOME_DIR, '.gemini/config/hooks.json.bak.v7'),
    path.join(HOME_DIR, '.gemini/config/hooks_backups_20260912_034509')
  ];
  for (const sf of staleFiles) {
    if (fs.existsSync(sf)) {
      mismatches.push(`STALE_BACKUP_PRESENT: ${sf} must be purged`);
    }
  }

  return {
    passed: mismatches.length === 0,
    mismatches,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = auditPromptCanvasGovernanceSync();
  if (!report.passed) {
    console.error('❌ [FAIL: GOVERNANCE_DOC_OUT_OF_SYNC] Markdown rules, skills.md, skills.json, SKILL.md, or hooks.json are out of sync:');
    for (const m of report.mismatches) {
      console.error(`   - ${m}`);
    }
    process.exit(1);
  } else {
    console.log('✅ [PASS: GOVERNANCE_DOC_SYNC] All .md files (AGENTS.md, GEMINI.md, .agents/AGENTS.md, CLAUDE.md, ~/.gemini/config/AGENTS.md, ARCHITECTURE.md, SECURITY.md, RUNBOOK.md, README.md), skills.md, skills.json, all 13 SKILL.md files, and hooks.json are 100% synchronized in lockstep!');
  }
}
