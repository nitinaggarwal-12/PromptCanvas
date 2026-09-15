#!/usr/bin/env node
/**
 * Jetski Lifecycle Hook: Stop
 * Protocol: JSON on stdin -> { "decision": "stop" } | { "decision": "continue", "reason": "..." } on stdout
 * Standards: Google Omni 1.1 Architecture Blueprint Engine | Zombie Stall Defense
 */
import { execSync } from 'child_process';

let inputData = '';
let handled = false;

function executeQualityGate() {
  if (handled) return;
  handled = true;

  let payload = {};
  try {
    if (inputData.trim()) payload = JSON.parse(inputData);
  } catch (e) {}

  // If stopped due to an error, permit stop without running gates
  if (payload.terminationReason && payload.terminationReason !== 'model_stop') {
    console.log(JSON.stringify({ decision: 'stop' }));
    process.exit(0);
  }

  try {
    // Execute the Omni 1.1 Master Quality Gate
    execSync('npm run quality-gate', {
      stdio: 'pipe',
      timeout: 45000,
      killSignal: 'SIGKILL'
    });
    
    // All quality gates passed -> permit stop
    console.log(JSON.stringify({ decision: 'stop' }));
    process.exit(0);
  } catch (err) {
    const errMsg = err.stderr ? err.stderr.toString() : err.message;
    // Quality gate failed -> block stop and mandate autonomous remediation
    console.log(JSON.stringify({
      decision: 'continue',
      reason: `🚨 Google Omni 1.1 Architecture Quality Gate failed. You must autonomously remediate all failures before concluding: ${errMsg.slice(0, 300)}`
    }));
    process.exit(0);
  }
}

process.stdin.setEncoding('utf-8');
process.stdin.on('data', chunk => { inputData += chunk; });
process.stdin.on('end', () => executeQualityGate());

// Fallback: If stdin does not send EOF within 400ms (unclosed pipe or TTY), execute gate anyway
const fallbackTimer = setTimeout(() => {
  executeQualityGate();
}, 400);
fallbackTimer.unref?.();
