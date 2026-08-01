import { describe, it, expect } from 'vitest';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '../../src/lib/preflightAuditEngine';
import { validateDrawioXml } from '../../src/lib/validate/validator';
import * as fs from 'fs';

/**
 * Regression guard for "fresh diagrams losing structure post generation".
 * The preflight geometric healers (collision auto-healer, waypoint stripper,
 * node resizers) assume Gemini-authored absolute integer coordinates and must
 * never mutate v2 layout-engine output (parent-relative, ELK-computed, already
 * validator-gated). Fixture: a real v2 pipeline output that validates clean.
 */
const V2_FIXTURE = 'diagrams/latest/serverless_web_app__pipeline_v2_graph_layout___unified_system_view__v1.xml';

describe('preflight must not damage v2 layout-engine output', () => {
  const xml = fs.readFileSync(V2_FIXTURE, 'utf8');

  it('fixture is genuine v2 output and validates clean before preflight', () => {
    expect(xml).toContain('PromptCanvas-LayoutEngineV2');
    expect((validateDrawioXml(xml).errors || [])).toHaveLength(0);
  });

  it('preflight preserves geometry: zero validator errors after healing', () => {
    const healed = preflightVerifyAndHealXmlAcrossAll6Audits(xml);
    const r = validateDrawioXml(healed);
    expect(r.errors || []).toHaveLength(0);
  });

  it('preflight preserves all node coordinates and edge waypoints', () => {
    const healed = preflightVerifyAndHealXmlAcrossAll6Audits(xml);
    const coords = (s: string) => [...s.matchAll(/<mxGeometry x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)].map(m => m.slice(1).join(','));
    expect(coords(healed)).toEqual(coords(xml));
    expect((healed.match(/<mxPoint/g) || []).length).toBe((xml.match(/<mxPoint/g) || []).length);
  });

  it('preflight still applies geometric healers to non-v2 (Gemini-authored) XML', () => {
    const geminiStyle = xml.replace('PromptCanvas-LayoutEngineV2', 'GeminiDirect');
    const healed = preflightVerifyAndHealXmlAcrossAll6Audits(geminiStyle);
    // Not asserting improvement, only that the gate is marker-based, not disabled globally:
    expect(healed).not.toBe(geminiStyle);
  });
});
