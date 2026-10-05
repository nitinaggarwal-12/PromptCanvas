#!/usr/bin/env node
/**
 * Universal Single-Source Trinity Verifier & Synchronizer
 *Referenced by skills.md (Rule 46) to verify byte-for-byte identity across:
 * - AGENTS.md === GEMINI.md === CLAUDE.md === .agents/AGENTS.md === ~/.gemini/config/AGENTS.md
 * - skills.md === .agents/skills.md === ~/.gemini/config/skills.md
 * - skills.json === .agents/skills.json === ~/.gemini/config/skills.json
 * - hooks.json === .agents/hooks.json === ~/.gemini/config/hooks.json
 * - All 13 .agents/skills/<skill>/SKILL.md files
 */
import { auditPromptCanvasGovernanceSync } from './gate_governance_doc_sync.mjs';

const report = auditPromptCanvasGovernanceSync();
if (!report.passed) {
  console.error('❌ [FAIL: UNIVERSAL_SINGLE_SOURCE_TRINITY] Governance synchronization drift detected:');
  for (const m of report.mismatches) {
    console.error(`   - ${m}`);
  }
  process.exit(1);
}

console.log('✅ [PASS: UNIVERSAL_SINGLE_SOURCE_TRINITY] All governance documents, skills.md, skills.json, SKILL.md files, and hooks.json are 100% synchronized.');
