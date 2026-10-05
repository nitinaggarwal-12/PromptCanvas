#!/usr/bin/env node
/**
 * Forwarding Shim: scripts/stop_forensic_gate.mjs -> scripts/stop_quality_gate.mjs
 * Ensures cross-project hooks.json guard_scripts.stop_forensic_gate resolves cleanly in PromptCanvas.
 */
import './stop_quality_gate.mjs';
