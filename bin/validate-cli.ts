#!/usr/bin/env npx tsx
import fs from 'fs';
import path from 'path';
import { validateDrawioXml } from '../src/lib/validate/validator';

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: npm run validate <file.xml>');
    process.exit(1);
  }

  const filePath = path.resolve(args[0]);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const xmlContent = fs.readFileSync(filePath, 'utf-8');
  const result = validateDrawioXml(xmlContent);

  console.log(`\n🔍 Draw.io XML Pre-Render Validation Report`);
  console.log(`File: ${filePath}`);
  console.log(`Status: ${result.valid ? '✅ PASSED' : '❌ FAILED'}\n`);

  if (result.errors.length > 0) {
    console.log(`ERRORS (${result.errors.length}):`);
    for (const err of result.errors) {
      console.log(` - [${err.code}] ${err.detail} (cells: ${err.cells.join(', ') || 'N/A'})`);
    }
  }

  if (result.warnings.length > 0) {
    console.log(`\nWARNINGS (${result.warnings.length}):`);
    for (const warn of result.warnings) {
      console.log(` - [${warn.code}] ${warn.detail} (cells: ${warn.cells.join(', ') || 'N/A'})`);
    }
  }

  if (!result.valid) {
    process.exit(1);
  }
}

main();
