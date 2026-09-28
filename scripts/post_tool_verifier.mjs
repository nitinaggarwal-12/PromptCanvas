#!/usr/bin/env node
/**
 * Jetski Lifecycle Hook: PostToolUse (Omni 1.1 Fast Invariant Verifier)
 * Protocol: JSON on stdin -> JSON on stdout
 * Enforces:
 * 1. Zero double-escaped `esc(cleanSvg(` in src/lib/canonical/infographicBlueprints52to66.ts (Rule 43)
 * 2. Zero banned generic `${subjectTopic} Policy Harness` interpolation in dynamicTieredInfographic.ts (Rule 42)
 * 3. Zero hardcoded `modelName = 'gemini-2.5-flash'` in deepDomainResearcher.ts (5-Tier Model Law)
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const warnings = [];

try {
  const bpPath = path.join(root, 'src/lib/canonical/infographicBlueprints52to66.ts');
  if (fs.existsSync(bpPath)) {
    const bpSrc = fs.readFileSync(bpPath, 'utf8');
    if (bpSrc.includes('esc(cleanSvg(')) {
      warnings.push('Rule 43 violation: Double-escaped esc(cleanSvg(...)) detected in infographicBlueprints52to66.ts');
    }
  }

  const dynPath = path.join(root, 'src/lib/canonical/dynamicTieredInfographic.ts');
  if (fs.existsSync(dynPath)) {
    const dynSrc = fs.readFileSync(dynPath, 'utf8');
    if (dynSrc.includes('${subjectTopic} Policy Harness') || dynSrc.includes('${subjectTopic} Knowledge Graph')) {
      warnings.push('Rule 42 violation: Banned generic ${subjectTopic} Policy Harness / Knowledge Graph string interpolation detected in dynamicTieredInfographic.ts');
    }
  }

  const resPath = path.join(root, 'src/lib/research/deepDomainResearcher.ts');
  if (fs.existsSync(resPath)) {
    const resSrc = fs.readFileSync(resPath, 'utf8');
    if (resSrc.includes("const modelName = 'gemini-2.5-flash'")) {
      warnings.push('Model Stack violation: Hardcoded gemini-2.5-flash detected in deepDomainResearcher.ts instead of geminiConfig.ts');
    }
  }
} catch {
  // Ignore transient read errors during partial writes
}

if (warnings.length > 0) {
  console.log(JSON.stringify({ warnings }));
} else {
  console.log(JSON.stringify({}));
}
process.exit(0);
