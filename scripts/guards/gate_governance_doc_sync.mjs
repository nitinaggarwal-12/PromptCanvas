#!/usr/bin/env node
/**
 * Gate: Mandatory Post-Fix Governance Document, Rule Files, skills.json, SKILL.md, hooks.md & hooks.json
 * 3-Way Lockstep Synchronization & Anti-Contradiction Gate (v3.5.0)
 *
 * Asserts that across ~/.gemini/config/, /Users/nitinagga/Documents/PromptCanvas, and /Users/nitinagga/Documents/blogs:
 * 1. AGENTS.md, GEMINI.md, .agents/AGENTS.md, and CLAUDE.md are 100% byte-for-byte identical and strictly < 24,000 bytes.
 * 2. hooks.md, hooks.json, and .agents/hooks.json are 100% byte-for-byte identical across all 3 locations.
 * 3. skills.md, skills.json, and .agents/skills.json are 100% byte-for-byte identical across all 3 locations.
 * 4. All 15 rule files in ~/.gemini/config/rules/*.md are 100% byte-for-byte identical with .agents/rules/*.md in PromptCanvas and blogs, and include valid YAML frontmatter.
 * 5. All .agents/skills/<skill>/SKILL.md files match ~/.gemini/config/skills/<skill>/SKILL.md.
 * 6. Zero contradictory, retired, or broken rule strings (e.g. "oracle-at-google-ebs-exadata-2026", "verify_blank_canvas_oracle_exadata_and_fail_closed_audit", "renderArchitectureCenterDiagramSidebar", "486 MP4s", "28 authentic Google Cloud Console", "0 Oracle Exadata", or leftover "gcloud run deploy promptcanvas --source .").
 * 7. Zero stale backup files (hooks.json.bak*, hooks_backups_*, scratch/vibe/skills.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
const HOME_DIR = process.env.HOME || '/Users/nitinagga';
const CONFIG_DIR = path.join(HOME_DIR, '.gemini/config');
const BLOGS_ROOT = '/Users/nitinagga/Documents/blogs';

function sha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

const BANNED_CONTRADICTORY_PATTERNS = [
  { label: 'retired 4-tier oracle-at-google-ebs-exadata-2026 ID', re: /oracle-at-google-ebs-exadata-2026/ },
  { label: 'deleted verify_blank_canvas_oracle_exadata_and_fail_closed_audit script', re: /verify_blank_canvas_oracle_exadata_and_fail_closed_audit/ },
  { label: 'deleted renderArchitectureCenterDiagramSidebar helper', re: /renderArchitectureCenterDiagramSidebar/ },
  { label: 'stale 3-deck 486 MP4s count (must be 5-deck 810 MP4s)', re: /486 MP4s/ },
  { label: 'stale 28 screenshots count (must be 21 pure multi-tenant screenshots)', re: /28 authentic Google Cloud Console|28\/28 real Cloud Console/ },
  { label: 'contradictory "0 Oracle Exadata" claim', re: /0`? Oracle Exadata/ },
  { label: 'leftover broken gcloud run deploy promptcanvas --source . snippet', re: /\nbash\ngcloud run deploy promptcanvas[\s\S]*?--platform managed/ },
  { label: 'banned stalling phrase "Do not touch any files until this plan is stated"', re: /(?<!banning ")(?:Do not touch any files until this plan is stated)(?!")/ },
  { label: 'numeric thinkingBudget: 0 (violates Law 16 / Rule 55 discrete thinkingLevel)', re: /thinkingBudget:\s*0/ },
  { label: 'contradictory AskAIOCE "51/51 Verified" pre-checked claim (violates L50-11 0/51 unchecked on load)', re: /51\/51 Verified/ },
  { label: 'contradictory Custom Twin static portrait frame mux claim (violates L30-19 90/90 native Omni 1.1 bundles)', re: /mux a static portrait frame/ },
  { label: 'contradictory inline Figure 1, Figure 2, Figure 3 rule (violates Rule 53 single Figure 1)', re: /inline figures \(`Figure 1`, `Figure 2`, `Figure 3`\)/ },
  { label: 'stale 26-vertex / 20-edge Split-VPC count (must be 31-vertex / 27-edge)', re: /26`?\s*vertices,\s*`?20`?\s*edges|26-vertex\s*\/\s*20-edge/ },
  { label: 'contradictory 5m / 300,000ms polling interval (violates Rule 30 <2m polling)', re: /every `5m`|every `300,000ms`|Real 60s\/5m Polling/ },
];

export function auditPromptCanvasGovernanceSync() {
  const mismatches = [];

  // 1. Verify AGENTS.md === GEMINI.md === .agents/AGENTS.md === CLAUDE.md across PromptCanvas, ~/.gemini/config, and blogs
  const canonicalAgentsPath = path.join(CONFIG_DIR, 'AGENTS.md');
  const hCanonicalAgents = sha256(canonicalAgentsPath);
  if (!hCanonicalAgents) {
    mismatches.push('MISSING: ~/.gemini/config/AGENTS.md');
  } else {
    const agentsBytes = fs.statSync(canonicalAgentsPath).size;
    if (agentsBytes >= 24000) {
      mismatches.push(`BYTE_BUDGET_EXCEEDED: AGENTS.md is ${agentsBytes} bytes (must be strictly < 24,000 bytes for Jetski <RULE> loader)`);
    }
  }

  const agentsTargets = [
    path.join(REPO_ROOT, 'AGENTS.md'),
    path.join(REPO_ROOT, 'GEMINI.md'),
    path.join(REPO_ROOT, 'CLAUDE.md'),
    path.join(REPO_ROOT, '.agents/AGENTS.md'),
  ];
  // If ~/.gemini/config/GEMINI.md or CLAUDE.md exist, they must also match ~/.gemini/config/AGENTS.md
  for (const optGlobal of [path.join(CONFIG_DIR, 'GEMINI.md'), path.join(CONFIG_DIR, 'CLAUDE.md')]) {
    if (fs.existsSync(optGlobal)) agentsTargets.push(optGlobal);
  }
  if (fs.existsSync(BLOGS_ROOT)) {
    agentsTargets.push(
      path.join(BLOGS_ROOT, 'AGENTS.md'),
      path.join(BLOGS_ROOT, 'GEMINI.md'),
      path.join(BLOGS_ROOT, 'CLAUDE.md'),
      path.join(BLOGS_ROOT, '.agents/AGENTS.md')
    );
  }

  for (const target of agentsTargets) {
    const h = sha256(target);
    if (!h) {
      mismatches.push(`MISSING: ${target}`);
    } else if (hCanonicalAgents && h !== hCanonicalAgents) {
      mismatches.push(`DRIFT: ${target} is out of sync with ~/.gemini/config/AGENTS.md`);
    }
  }

  // 2. Verify hooks.md, hooks.json, and .agents/hooks.json across ~/.gemini/config, PromptCanvas, and blogs
  const canonicalHooksMd = path.join(CONFIG_DIR, 'hooks.md');
  const hHooksMd = sha256(canonicalHooksMd);
  const hooksMdTargets = [path.join(REPO_ROOT, 'hooks.md')];
  if (fs.existsSync(BLOGS_ROOT)) hooksMdTargets.push(path.join(BLOGS_ROOT, 'hooks.md'));
  for (const t of hooksMdTargets) {
    const h = sha256(t);
    if (!h) mismatches.push(`MISSING: ${t}`);
    else if (hHooksMd && h !== hHooksMd) mismatches.push(`DRIFT: ${t} differs from ~/.gemini/config/hooks.md`);
  }

  const canonicalHooksJson = path.join(CONFIG_DIR, 'hooks.json');
  const hHooksJson = sha256(canonicalHooksJson);
  const hooksJsonTargets = [
    path.join(REPO_ROOT, 'hooks.json'),
    path.join(REPO_ROOT, '.agents/hooks.json'),
  ];
  if (fs.existsSync(BLOGS_ROOT)) {
    hooksJsonTargets.push(
      path.join(BLOGS_ROOT, 'hooks.json'),
      path.join(BLOGS_ROOT, '.agents/hooks.json')
    );
  }
  for (const t of hooksJsonTargets) {
    const h = sha256(t);
    if (!h) mismatches.push(`MISSING: ${t}`);
    else if (hHooksJson && h !== hHooksJson) mismatches.push(`DRIFT: ${t} differs from ~/.gemini/config/hooks.json`);
  }

  // 3. Verify skills.md, skills.json, and .agents/skills.json across ~/.gemini/config, PromptCanvas, and blogs
  const canonicalSkillsMd = path.join(CONFIG_DIR, 'skills.md');
  const hSkillsMd = sha256(canonicalSkillsMd);
  const skillsMdTargets = [path.join(REPO_ROOT, 'skills.md')];
  if (fs.existsSync(BLOGS_ROOT)) skillsMdTargets.push(path.join(BLOGS_ROOT, 'skills.md'));
  for (const t of skillsMdTargets) {
    const h = sha256(t);
    if (!h) mismatches.push(`MISSING: ${t}`);
    else if (hSkillsMd && h !== hSkillsMd) mismatches.push(`DRIFT: ${t} differs from ~/.gemini/config/skills.md`);
  }

  const canonicalSkillsJson = path.join(CONFIG_DIR, 'skills.json');
  const hSkillsJson = sha256(canonicalSkillsJson);
  const skillsJsonTargets = [
    path.join(REPO_ROOT, 'skills.json'),
    path.join(REPO_ROOT, '.agents/skills.json'),
  ];
  if (fs.existsSync(BLOGS_ROOT)) {
    skillsJsonTargets.push(
      path.join(BLOGS_ROOT, 'skills.json'),
      path.join(BLOGS_ROOT, '.agents/skills.json')
    );
  }
  for (const t of skillsJsonTargets) {
    const h = sha256(t);
    if (!h) mismatches.push(`MISSING: ${t}`);
    else if (hSkillsJson && h !== hSkillsJson) mismatches.push(`DRIFT: ${t} differs from ~/.gemini/config/skills.json`);
  }

  // 4. Verify all rule files in ~/.gemini/config/rules/*.md match PromptCanvas/.agents/rules/ and blogs/.agents/rules/
  const configRulesDir = path.join(CONFIG_DIR, 'rules');
  if (fs.existsSync(configRulesDir)) {
    const ruleFiles = fs.readdirSync(configRulesDir).filter((f) => f.endsWith('.md')).sort();
    for (const rf of ruleFiles) {
      const srcRule = path.join(configRulesDir, rf);
      const hSrcRule = sha256(srcRule);
      const ruleText = fs.readFileSync(srcRule, 'utf-8');
      if (!ruleText.startsWith('---\ntrigger:')) {
        mismatches.push(`MISSING_FRONTMATTER: ~/.gemini/config/rules/${rf} missing YAML trigger frontmatter`);
      }
      const pcRule = path.join(REPO_ROOT, '.agents/rules', rf);
      if (sha256(pcRule) !== hSrcRule) {
        mismatches.push(`DRIFT: .agents/rules/${rf} differs from ~/.gemini/config/rules/${rf}`);
      }
      if (fs.existsSync(BLOGS_ROOT)) {
        const bgRule = path.join(BLOGS_ROOT, '.agents/rules', rf);
        if (sha256(bgRule) !== hSrcRule) {
          mismatches.push(`DRIFT: blogs/.agents/rules/${rf} differs from ~/.gemini/config/rules/${rf}`);
        }
      }
    }
  }

  // 5. Verify all 13 SKILL.md pairs across .agents/skills/ and ~/.gemini/config/skills/
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
    'visual-regression-testing',
  ];

  for (const dir of skillDirs) {
    const repoSkill = path.join(REPO_ROOT, `.agents/skills/${dir}/SKILL.md`);
    const globalSkill = path.join(CONFIG_DIR, `skills/${dir}/SKILL.md`);
    const hRepo = sha256(repoSkill);
    const hGlobal = sha256(globalSkill);

    if (!hRepo) mismatches.push(`MISSING: .agents/skills/${dir}/SKILL.md`);
    if (hRepo && hGlobal && hRepo !== hGlobal) {
      mismatches.push(`DRIFT: .agents/skills/${dir}/SKILL.md and ~/.gemini/config/skills/${dir}/SKILL.md differ`);
    }
  }

  // 6. Anti-Contradiction Scan across AGENTS.md, hooks.md, skills.md, rules/*.md, skills/*/SKILL.md, and core repo docs
  const filesToScanForContradictions = [
    canonicalAgentsPath,
    canonicalHooksMd,
    canonicalSkillsMd,
    path.join(REPO_ROOT, 'README.md'),
    path.join(REPO_ROOT, 'ARCHITECTURE.md'),
    path.join(REPO_ROOT, 'SECURITY.md'),
    path.join(REPO_ROOT, 'RUNBOOK.md'),
    path.join(REPO_ROOT, 'docs/INTENT_ROUTER.md'),
  ];
  if (fs.existsSync(configRulesDir)) {
    for (const rf of fs.readdirSync(configRulesDir).filter((f) => f.endsWith('.md'))) {
      filesToScanForContradictions.push(path.join(configRulesDir, rf));
    }
  }
  for (const dir of skillDirs) {
    filesToScanForContradictions.push(path.join(CONFIG_DIR, `skills/${dir}/SKILL.md`));
  }

  const DOC_BANNED_PATTERNS = [
    ...BANNED_CONTRADICTORY_PATTERNS,
    { re: /src\/lib\/router\/intentClassifier\.ts/i, label: 'Deleted file reference (src/lib/router/intentClassifier.ts)' },
    { re: /DiagramTypeSelector\.tsx|AssumptionBanner\.tsx/i, label: 'Deleted workspace component reference (DiagramTypeSelector.tsx / AssumptionBanner.tsx)' },
    { re: /npm run test:studio1/i, label: 'Retired npm script reference (npm run test:studio1)' },
    { re: /gcloud run deploy promptcanvas[\s\\]+--source/i, label: 'Rule 56 banned single-project --source deploy in docs' },
    { re: /converts `\.pptx` \/ `\.html` via Google Drive v3|uploads `\.pptx` \/ `\.html` bytes via multipart/i, label: 'Rule 49 banned .html multipart upload in docs' },
  ];

  for (const scanFile of filesToScanForContradictions) {
    if (!fs.existsSync(scanFile)) continue;
    const text = fs.readFileSync(scanFile, 'utf-8');
    for (const pat of DOC_BANNED_PATTERNS) {
      if (pat.re.test(text)) {
        mismatches.push(`CONTRADICTORY_OR_STALE_RULE: ${scanFile} contains ${pat.label}`);
      }
    }
  }

  // 7. Verify core documentation files have zero stale "Gemini 2.5 / 3.7" or "/studio3" references
  for (const docName of ['ARCHITECTURE.md', 'SECURITY.md', 'RUNBOOK.md', 'README.md', 'docs/INTENT_ROUTER.md']) {
    const docPath = path.join(REPO_ROOT, docName);
    if (fs.existsSync(docPath)) {
      const text = fs.readFileSync(docPath, 'utf-8');
      if (/Gemini\s+2\.5\s*\/\s*3\.7|\/studio3\b/i.test(text)) {
        mismatches.push(`STALE_DOC: ${docName} contains legacy "Gemini 2.5 / 3.7" or "/studio3" reference`);
      }
    }
  }

  // 8. Verify stale backup garbage is absent
  const staleFiles = [
    path.join(REPO_ROOT, 'scratch/vibe/skills.json'),
    path.join(CONFIG_DIR, 'hooks.json.bak.v7'),
    path.join(CONFIG_DIR, 'hooks_backups_20260912_034509'),
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
    console.error('❌ [FAIL: GOVERNANCE_DOC_OUT_OF_SYNC] Markdown rules, skills.md, skills.json, SKILL.md, hooks.md, or hooks.json are out of sync or contain contradictions:');
    for (const m of report.mismatches) {
      console.error(`   - ${m}`);
    }
    process.exit(1);
  } else {
    console.log('✅ [PASS: GOVERNANCE_DOC_SYNC] All governance files (AGENTS.md, GEMINI.md, CLAUDE.md, .agents/AGENTS.md < 24,000B, hooks.md, hooks.json, skills.md, skills.json, 15 .agents/rules/*.md files, and all SKILL.md files) across ~/.gemini/config, PromptCanvas, and blogs are 100% synchronized with 0 contradictions!');
  }
}
