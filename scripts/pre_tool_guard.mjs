#!/usr/bin/env node
/**
 * Jetski Lifecycle Hook: PreToolUse
 * Protocol: JSON on stdin -> { "decision": "allow" | "deny", "reason": "..." } on stdout
 * Standards: Google Omni 1.1 Architecture Blueprint Engine | Zero Data Loss Safety Gate
 */

let inputData = '';
let handled = false;

function evaluatePreToolUse() {
  if (handled) return;
  handled = true;

  let payload = {};
  try {
    if (inputData.trim()) payload = JSON.parse(inputData);
  } catch (e) {}

  const toolName = payload?.toolCall?.name || '';
  const args = payload?.toolCall?.args || {};

  let blocked = false;
  let blockReason = '';

  // 1. Guard run_command against destructive terminal commands
  if (toolName === 'run_command') {
    const commandLine = args.CommandLine || '';
    
    const dangerousCommandPatterns = [
      // Recursive file deletion: rm -rf, rm -r, rm --recursive
      /\brm\s+-[a-zA-Z]*r[a-zA-Z]*\b/i,
      /\brm\s+--recursive\b/i,
      /\brm\s+-[a-zA-Z]*f\s+(\*|\.)/i,
      // Database drop & truncate
      /\bDROP\s+(DATABASE|SCHEMA|TABLE|VIEW|EXTENSION|INDEX)\b/i,
      /\bTRUNCATE\s+(TABLE\s+)?\w+/i,
      // Destructive git resets, force pushes, and cleans
      /\bgit\s+reset\s+--hard\b/i,
      /\bgit\s+clean\s+-[a-zA-Z]*f\b/i,
      /\bgit\s+push\s+.*(--force\b|-f\b)/i,
      // Cloud storage bulk deletion
      /\bgsutil\s+rm\s+(-r\b|-[a-zA-Z]*r)/i,
      /\bgcloud\s+storage\s+rm\s+.*(--recursive|-r\b)/i,
      /\bgcloud\s+(projects|spanner|bigquery|dataproc)\s+delete\b/i,
      // Filesystem destruction
      /\bmkfs(\.\w+)?\b/i,
      /\bdd\s+if=.*of=\/dev\//i
    ];

    for (const pattern of dangerousCommandPatterns) {
      if (pattern.test(commandLine)) {
        blocked = true;
        blockReason = `Destructive command blocked by Zero-Data-Loss Safety Gate: matched pattern ${pattern}`;
        break;
      }
    }
  }

  // 2. Guard file write/replace operations against sensitive system files & direct DB corruption
  if (!blocked && (toolName === 'write_to_file' || toolName === 'replace_file_content' || toolName === 'multi_replace_file_content')) {
    const targetFile = args.TargetFile || '';

    const protectedSystemPaths = [
      /^\/(etc|usr|bin|sbin|System|Library|private)\b/i,
      /[\\\/]\.ssh[\\\/]/i,
      /[\\\/]\.aws[\\\/]/i,
      /[\\\/]\.config[\\\/]gcloud[\\\/]/i
    ];

    for (const pathPattern of protectedSystemPaths) {
      if (pathPattern.test(targetFile)) {
        blocked = true;
        blockReason = `Modifying sensitive system path blocked by Security Gate: ${targetFile}`;
        break;
      }
    }

    // Prevent direct raw file overwrite of active SQLite database files
    if (!blocked && /\.(db|sqlite|sqlite3)$/i.test(targetFile)) {
      blocked = true;
      blockReason = `Direct overwrite of SQLite database file (${targetFile}) blocked. Database modifications must use migrations or repository APIs.`;
    }
  }

  // 3. Output decision conforming to Jetski PreToolUse contract
  if (blocked) {
    console.log(JSON.stringify({ decision: 'deny', reason: blockReason }));
  } else {
    console.log(JSON.stringify({ decision: 'allow' }));
  }
  process.exit(0);
}

process.stdin.setEncoding('utf-8');
process.stdin.on('data', chunk => { inputData += chunk; });
process.stdin.on('end', () => evaluatePreToolUse());

const fallbackTimer = setTimeout(() => {
  evaluatePreToolUse();
}, 200);
fallbackTimer.unref?.();
