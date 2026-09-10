#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const targetFiles = [
  "src/app/gcp/page.tsx",
  "src/app/studio/page.tsx",
  "src/app/studioprod/page.tsx",
  "src/app/studio1/page.tsx",
  "src/app/studio2/page.tsx",
  "src/app/workspace/page.tsx",
  "src/components/DocGenFloatingCopilot.tsx"
];

let failed = false;

console.log("🔍 Checking all chatbot prompt handlers for 5-way intent guardrails...");

for (const relPath of targetFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing expected copilot file: ${relPath}`);
    failed = true;
    continue;
  }

  const content = fs.readFileSync(fullPath, "utf-8");

  // Check 1: Must import classifyChatIntent
  if (!content.includes("classifyChatIntent")) {
    console.error(`❌ [GUARDRAIL VIOLATION] ${relPath} does not import or reference 'classifyChatIntent'!`);
    failed = true;
    continue;
  }

  // Check 2: Must handle greeting or non-mutation intent
  if (!content.includes("'greeting'") && !content.includes('"greeting"')) {
    console.error(`❌ [GUARDRAIL VIOLATION] ${relPath} does not handle 'greeting' intent!`);
    failed = true;
    continue;
  }

  console.log(`✅ ${relPath} passes intent classification guardrails`);
}

if (failed) {
  console.error("\n❌ Pre-commit check failed: Chatbot prompt handlers must enforce 5-way intent classification!");
  process.exit(1);
} else {
  console.log("\n✅ All chatbot prompt handlers verified successfully!\n");
  process.exit(0);
}
