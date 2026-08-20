import { describe, expect, it } from 'vitest';
import { applyBlueprintSemanticIcons } from '../blueprintSemanticIcons';
import { applyBlueprintTextContainment } from '../blueprintTextContainment';
import { applyBlueprintVisualSystem } from '../blueprintVisualSystem';

const NOTATION_IDS = [
  'erd',
  'sequence_diagram',
  'tech_c4_system_context',
  'c4_component_lld',
  'bpmn_process_workflow',
  'threat_modeling_stride',
  'data_lineage_provenance',
];

describe('formal notation fidelity', () => {
  it.each(NOTATION_IDS)('does not cardify or inject semantic icons into %s', id => {
    const xml = '<mxGraphModel><root><mxCell id="n" value="👤 Customer" style="rounded=0;shape=customNotation;fontSize=9;" vertex="1" parent="1"><mxGeometry x="10" y="10" width="140" height="48" as="geometry"/></mxCell></root></mxGraphModel>';
    expect(applyBlueprintSemanticIcons(xml, id)).toBe(xml);
    expect(applyBlueprintTextContainment(xml, id)).toBe(xml);
  });

  it.each(NOTATION_IDS)('does not force generic orthogonal routing into %s connectors', id => {
    const xml = '<mxGraphModel><root><mxCell id="e" value="native" style="dashed=1;endArrow=open;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintVisualSystem(xml, id);
    expect(polished).not.toContain('edgeStyle=orthogonalEdgeStyle');
    expect(polished).toContain('endArrow=open');
  });
});
