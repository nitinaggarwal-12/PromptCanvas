import { describe, expect, it } from 'vitest';
import { XMLParser } from 'fast-xml-parser';
import { getApprovedMultiAgentSequenceBlueprintXml } from '../../src/lib/approvedBlueprint15Safe';

describe('Blueprint 15 approved exact master', () => {
  const xml = getApprovedMultiAgentSequenceBlueprintXml();

  it('emits valid parseable mxGraph XML at the approved 1536x1024 canvas size', () => {
    expect(() => new XMLParser({ ignoreAttributes: false }).parse(xml)).not.toThrow();
    expect(xml).toContain('pageWidth="1536"');
    expect(xml).toContain('pageHeight="1024"');
    expect(xml).toContain('id="multi_agent_execution_sequence"');
  });

  it('preserves the complete approved 16-step interaction sequence', () => {
    for (let step = 1; step <= 16; step += 1) {
      expect(xml).toContain(`id="m${step}_step"`);
    }
    expect(xml).toContain('Request authorization / delegation policy');
    expect(xml).toContain('Authorize scoped identity and policy constraints');
    expect(xml).toContain('Request permission-aware evidence');
    expect(xml).toContain('Execute approved analytical query');
    expect(xml).toContain('Deliver final cited response');
  });

  it('preserves UML fragments, HITL outcomes, and enterprise governance semantics', () => {
    expect(xml).toContain('ref:  grounded retrieval');
    expect(xml).toContain('ref:  governed analytics');
    expect(xml).toContain('alt:  HITL review');
    expect(xml).toContain('Approve');
    expect(xml).toContain('Reject');
    expect(xml).toContain('Revise');
    expect(xml).toContain('Observability by design');
    expect(xml).toContain('A2A boundary');
    expect(xml).toContain('Tool / data boundary');
    expect(xml).toContain('Security &amp; governance');
    expect(xml).toContain('MCP = Model Context Protocol');
  });

  it('keeps all seven approved participants and self-contained icons', () => {
    for (const participant of ['user', 'gemini', 'coordinator', 'gateway', 'retrieval', 'analytics', 'data']) {
      expect(xml).toContain(`id="${participant}_card"`);
      expect(xml).toContain(`id="life_${participant === 'coordinator' ? 'coord' : participant}"`);
    }
    expect(xml).toContain('data:image/svg+xml,');
    expect(xml).not.toContain('cdn.jsdelivr.net');
    expect(xml).not.toContain('simpleicons.org');
    expect(xml).not.toContain('undefined');
  });
});
