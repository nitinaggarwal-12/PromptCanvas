#!/usr/bin/env node
/**
 * Forwarding Shim: scripts/pre_tool_lineage_guard.mjs -> scripts/pre_tool_guard.mjs
 * Ensures cross-project hooks.json guard_scripts.pre_tool_use resolves cleanly in PromptCanvas.
 */
import './pre_tool_guard.mjs';
