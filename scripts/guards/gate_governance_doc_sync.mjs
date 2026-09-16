#!/usr/bin/env node
/**
 * Gate: Mandatory Post-Fix Governance Document & Skill Synchronization
 * Asserts that:
 * 1. AGENTS.md, GEMINI.md, and .agents/AGENTS.md are 100% byte-for-byte identical.
 * 2. .agents/skills/universal-document-cloud-hub/SKILL.md and ~/.gemini/config/skills/universal-document-cloud-hub/SKILL.md are synchronized.
 * 3. .agents/hooks.json contains universal_post_fix_governance_doc_sync.enabled === true.
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

  // 1. Verify AGENTS.md === GEMINI.md === .agents/AGENTS.md
  const agentsPath = path.join(REPO_ROOT, 'AGENTS.md');
  const geminiPath = path.join(REPO_ROOT, 'GEMINI.md');
  const dotAgentsPath = path.join(REPO_ROOT, '.agents/AGENTS.md');

  const hAgents = sha256(agentsPath);
  const hGemini = sha256(geminiPath);
  const hDotAgents = sha256(dotAgentsPath);

  if (!hAgents) mismatches.push('MISSING: AGENTS.md');
  if (!hGemini) mismatches.push('MISSING: GEMINI.md');
  if (!hDotAgents) mismatches.push('MISSING: .agents/AGENTS.md');

  if (hAgents && hGemini && hAgents !== hGemini) {
    mismatches.push('DRIFT: AGENTS.md and GEMINI.md are out of sync (must be byte-for-byte identical)');
  }
  if (hAgents && hDotAgents && hAgents !== hDotAgents) {
    mismatches.push('DRIFT: AGENTS.md and .agents/AGENTS.md are out of sync (must be byte-for-byte identical)');
  }

  // 2. Verify universal-document-cloud-hub SKILL.md synchronization
  const repoSkillPath = path.join(REPO_ROOT, '.agents/skills/universal-document-cloud-hub/SKILL.md');
  const globalSkillPath = path.join(HOME_DIR, '.gemini/config/skills/universal-document-cloud-hub/SKILL.md');

  const hRepoSkill = sha256(repoSkillPath);
  const hGlobalSkill = sha256(globalSkillPath);

  if (!hRepoSkill) mismatches.push('MISSING: .agents/skills/universal-document-cloud-hub/SKILL.md');
  if (hRepoSkill && hGlobalSkill && hRepoSkill !== hGlobalSkill) {
    mismatches.push('DRIFT: .agents/skills/universal-document-cloud-hub/SKILL.md and ~/.gemini/config/skills/universal-document-cloud-hub/SKILL.md differ');
  }

  // 3. Verify .agents/hooks.json has universal_post_fix_governance_doc_sync enabled
  const hooksPath = path.join(REPO_ROOT, '.agents/hooks.json');
  if (!fs.existsSync(hooksPath)) {
    mismatches.push('MISSING: .agents/hooks.json');
  } else {
    try {
      const hooksJson = JSON.parse(fs.readFileSync(hooksPath, 'utf-8'));
      if (!hooksJson.global_governance?.universal_post_fix_governance_doc_sync?.enabled) {
        mismatches.push('DRIFT: .agents/hooks.json missing global_governance.universal_post_fix_governance_doc_sync.enabled = true');
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
    console.error('❌ [FAIL: GOVERNANCE_DOC_OUT_OF_SYNC] Markdown rules, skills, or hooks.json are out of sync:');
    for (const m of report.mismatches) {
      console.error(`   - ${m}`);
    }
    process.exit(1);
  } else {
    console.log('✅ [PASS: GOVERNANCE_DOC_SYNC] All .md files (AGENTS.md, GEMINI.md), SKILL.md, and hooks.json are 100% synchronized in lockstep!');
  }
}
