#!/usr/bin/env node
/**
 * Jetski Lifecycle Hook: PostToolUse (Omni 1.1 Fast Invariant Verifier)
 * Protocol: JSON on stdin -> `{}` on stdout (per g3doc/features/agent/agent-hooks.md)
 * Enforces:
 * 1. Zero external `api.iconify.design` URLs in `src/lib/diagramCleaner.ts` (Rule 53)
 * 2. Zero numeric `thinkingBudget:` in `src/lib/geminiConfig.ts` (Law 16 / Rule 55)
 * 3. Zero hardcoded `modelName = 'gemini-2.5-flash'` in `src/lib/research/deepDomainResearcher.ts`
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();

try {
  const cleanerPath = path.join(root, 'src/lib/diagramCleaner.ts');
  if (fs.existsSync(cleanerPath)) {
    const cleanerSrc = fs.readFileSync(cleanerPath, 'utf8');
    if (cleanerSrc.includes('api.iconify.design')) {
      process.stderr.write('[PostToolUse Warning] External api.iconify.design URL detected in src/lib/diagramCleaner.ts\n');
    }
  }

  const cfgPath = path.join(root, 'src/lib/geminiConfig.ts');
  if (fs.existsSync(cfgPath)) {
    const cfgSrc = fs.readFileSync(cfgPath, 'utf8');
    if (/thinkingBudget\s*:/.test(cfgSrc)) {
      process.stderr.write('[PostToolUse Warning] Numeric thinkingBudget detected in src/lib/geminiConfig.ts (violates Law 16 / Rule 55)\n');
    }
  }

  const resPath = path.join(root, 'src/lib/research/deepDomainResearcher.ts');
  if (fs.existsSync(resPath)) {
    const resSrc = fs.readFileSync(resPath, 'utf8');
    if (resSrc.includes("const modelName = 'gemini-2.5-flash'")) {
      process.stderr.write('[PostToolUse Warning] Hardcoded gemini-2.5-flash detected in deepDomainResearcher.ts\n');
    }
  }
} catch {
  // Ignore transient read errors during partial writes
}

// Official Jetski PostToolUse contract requires `{}` on stdout
console.log(JSON.stringify({}));
process.exit(0);
