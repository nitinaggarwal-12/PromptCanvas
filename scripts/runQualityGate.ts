#!/usr/bin/env npx tsx
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const FORBIDDEN_SLUGS = new RegExp(
  [
    'gemini-4' + '-argon',
    'gemini-3\\.8' + '-flash',
    'gemini-3\\.1' + '-pro',
    'gemini-3\\.1' + '-flash',
    'gemini-3\\.5' + '-transcribe',
    'gemini-omni' + '-1\\.1',
    'google-omni' + '-1\\.1',
    'gemini-embedding' + '-2',
    'veo-3\\.1' + '-fast',
    'veo-3\\.1' + '-generate',
    'lyria-3' + '-pro',
    'chirp-3' + '-hd',
  ].join('|'),
  'i'
);

const DELETED_HIJACKERS = [
  'src/lib/compositionalChainCompiler.ts',
  'src/lib/canonical/nasaMultiverseClosedLoopHarness.ts',
  'src/lib/draftMicroVersionStore.ts',
];

function walkTsFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTsFiles(full, acc);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function main() {
  const root = process.cwd();
  console.log('1. Checking for zero fictional model slugs in src/...');
  const srcFiles = walkTsFiles(path.join(root, 'src'));
  const badFiles: string[] = [];
  for (const file of srcFiles) {
    const txt = fs.readFileSync(file, 'utf8');
    if (FORBIDDEN_SLUGS.test(txt)) {
      badFiles.push(path.relative(root, file));
    }
  }
  if (badFiles.length > 0) {
    console.error('Fictional model slugs detected in:', badFiles);
    process.exit(1);
  }
  console.log('   PASS: 0 fictional model slugs in src/.');

  console.log('2. Checking deleted hijacker modules remain absent...');
  for (const rel of DELETED_HIJACKERS) {
    if (fs.existsSync(path.join(root, rel))) {
      console.error('Hijacker module still exists:', rel);
      process.exit(1);
    }
  }
  console.log('   PASS: 0 hijacker modules present.');

  console.log('3. Running TypeScript compiler check (tsc --noEmit)...');
  execSync('npx tsc --noEmit', { stdio: 'inherit', cwd: root });
  console.log('   PASS: TypeScript compilation clean.');
}

main();
