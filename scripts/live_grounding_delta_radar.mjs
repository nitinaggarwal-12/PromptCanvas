#!/usr/bin/env node
/**
 * Forwarding Shim: scripts/live_grounding_delta_radar.mjs
 * Ensures cross-project hooks.json guard_scripts.grounding_radar resolves cleanly in PromptCanvas
 * by verifying governance doc sync and single-source trinity lockstep.
 */
import './guards/gate_governance_doc_sync.mjs';
