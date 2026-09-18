#!/usr/bin/env node
/**
 * Gate: Mandatory Post-Fix Governance Document & Skill Synchronization (v2.5.0)
 * Asserts that:
 * 1. AGENTS.md, GEMINI.md, .agents/AGENTS.md, CLAUDE.md, and ~/.gemini/config/AGENTS.md are 100% byte-for-byte identical.
 * 2. skills.md exists in the workspace root and documents Rule 41 & v2.5.0.
 * 3. .agents/skills/universal-document-cloud-hub/SKILL.md === ~/.gemini/config/skills/universal-document-cloud-hub/SKILL.md.
 * 4. .agents/skills/diagram-generation-engine/SKILL.md === ~/.gemini/config/skills/diagram-generation-engine/SKILL.md.
 * 5. .agents/skills/ai-prompt-evals/SKILL.md === ~/.gemini/config/skills/ai-prompt-evals/SKILL.md.
 * 6. .agents/hooks.json === ~/.gemini/config/hooks.json and contains version "2.5.0" + universal_post_fix_governance_doc_sync.enabled === true.
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

  // 2. Verify workspace skills.md exists and contains Rule 41 & v2.5.0
  const rootSkillsMdPath = path.join(REPO_ROOT, 'skills.md');
  if (!fs.existsSync(rootSkillsMdPath)) {
    mismatches.push('MISSING: skills.md in workspace root');
  } else {
    const skillsMdContent = fs.readFileSync(rootSkillsMdPath, 'utf-8');
    if (!skillsMdContent.includes('Rule 41') || !skillsMdContent.includes('v2.5.0')) {
      mismatches.push('DRIFT: skills.md missing Rule 41 or v2.5.0 version badge');
    }
  }

  // 3. Verify SKILL.md pairs across .agents/skills/ and ~/.gemini/config/skills/
  const skillDirs = [
    'universal-document-cloud-hub',
    'diagram-generation-engine',
    'ai-prompt-evals'
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

  // 4. Verify .agents/hooks.json and ~/.gemini/config/hooks.json synchronization & version badge
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
      if (!Array.isArray(hooksJson.amendment_log) || hooksJson.amendment_log.length === 0) {
        mismatches.push('DRIFT: .agents/hooks.json missing amendment_log array');
      }
    } catch (err) {
      mismatches.push(`ERROR parsing .agents/hooks.json: ${err.message}`);
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
    console.error('❌ [FAIL: GOVERNANCE_DOC_OUT_OF_SYNC] Markdown rules, skills.md, SKILL.md, or hooks.json are out of sync:');
    for (const m of report.mismatches) {
      console.error(`   - ${m}`);
    }
    process.exit(1);
  } else {
    console.log('✅ [PASS: GOVERNANCE_DOC_SYNC] All 5 .md files (AGENTS.md, GEMINI.md, .agents/AGENTS.md, CLAUDE.md, ~/.gemini/config/AGENTS.md), skills.md, SKILL.md files, and hooks.json (v2.5.0) are 100% synchronized in lockstep!');
  }
}
