import { describe, expect, it } from 'vitest';
import { applyBlueprintSemanticIcons } from '../blueprintSemanticIcons';

describe('blueprint semantic icon system', () => {
  it('adds recognizable vendor identity to a sufficiently large service card', () => {
    const xml = '<mxGraphModel><root><mxCell id="sf" value="&lt;b&gt;Salesforce CRM&lt;/b&gt;&lt;br&gt;Commercial workflow" style="rounded=1;fillColor=#FFFFFF;strokeColor=#1A73E8;fontSize=11;" vertex="1" parent="1"><mxGeometry x="10" y="10" width="220" height="80" as="geometry"/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintSemanticIcons(xml, 'conceptual_diagram');
    expect(polished).toContain('cdn.simpleicons.org/salesforce');
    expect(polished).toContain('Salesforce CRM');
    expect(polished).toContain('pc-semantic-icons-v1');
  });

  it('uses the self-contained Google Cloud mark instead of inventing product glyphs', () => {
    const xml = '<mxGraphModel><root><mxCell id="bq" value="BigQuery analytics" style="rounded=1;fillColor=#FFFFFF;strokeColor=#4285F4;fontSize=11;" vertex="1" parent="1"><mxGeometry x="10" y="10" width="220" height="80" as="geometry"/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintSemanticIcons(xml, 'tech_data_lakehouse_gcp');
    expect(polished).toContain('data:image/svg+xml');
    expect(polished).toContain('BigQuery analytics');
  });

  it('removes emoji placeholders from non-notation architecture cards', () => {
    const xml = '<mxGraphModel><root><mxCell id="run" value="🚀 Cloud Run service" style="rounded=1;fillColor=#FFFFFF;strokeColor=#4285F4;fontSize=11;" vertex="1" parent="1"><mxGeometry x="10" y="10" width="220" height="80" as="geometry"/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintSemanticIcons(xml, 'tech_serverless_gcp');
    expect(polished).not.toContain('🚀');
    expect(polished).toContain('Cloud Run service');
  });

  it('preserves notation-sensitive diagrams untouched', () => {
    const xml = '<mxGraphModel><root><mxCell id="participant" value="👤 User" style="fontSize=10;" vertex="1" parent="1"><mxGeometry x="10" y="10" width="100" height="40" as="geometry"/></mxCell></root></mxGraphModel>';
    expect(applyBlueprintSemanticIcons(xml, 'sequence_diagram')).toBe(xml);
  });
});
