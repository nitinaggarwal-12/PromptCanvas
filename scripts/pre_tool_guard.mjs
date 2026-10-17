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

  const toolName = payload?.toolCall?.name || payload?.tool_name || '';
  const args = payload?.toolCall?.args || payload?.tool_input || {};

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
      /\bdd\s+if=.*of=\/dev\//i,
      // Rule 56: Ban single-project gcloud run deploy --source against ramp-portal-dev
      /\bgcloud\s+run\s+deploy\b.*--source\b.*ramp-portal-dev/i,
      /\bgcloud\s+run\s+deploy\b.*ramp-portal-dev.*--source\b/i,
      // Rule 56: Ban detached fire-and-forget nohup background Cloud Run builds/deploys
      /\bnohup\s+.*\bgcloud\s+(builds\s+submit|run\s+(deploy|services\s+update))\b/i
    ];

    for (const pattern of dangerousCommandPatterns) {
      if (pattern.test(commandLine)) {
        blocked = true;
        blockReason = `Command blocked by PreToolUse Safety & Cloud Run Gate (Law 2 / Rule 56): matched pattern ${pattern}`;
        break;
      }
    }
  }

  // 2. Guard file write/replace operations against sensitive system files, Law 2 protected files, & direct DB corruption
  if (!blocked && (toolName === 'write_to_file' || toolName === 'replace_file_content' || toolName === 'multi_replace_file_content')) {
    const targetFile = args.TargetFile || '';

    const protectedSystemPaths = [
      /^\/(etc|usr|bin|sbin|System|Library|private)\b/i,
      /[\\\/]\.ssh[\\\/]/i,
      /[\\\/]\.aws[\\\/]/i,
      /[\\\/]\.config[\\\/]gcloud[\\\/]/i,
      // Law 2: Strict File & Resource Boundaries (.env, .git/, package-lock.json, poetry.lock)
      /(?:^|[\\\/])\.env(?:\.[a-zA-Z0-9_-]+)?$/i,
      /[\\\/]\.git[\\\/]/i,
      /(?:^|[\\\/])(package-lock\.json|poetry\.lock)$/i
    ];

    for (const pathPattern of protectedSystemPaths) {
      if (pathPattern.test(targetFile)) {
        blocked = true;
        blockReason = `Modifying protected file or system path blocked by Law 2 Security Gate: ${targetFile}`;
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
