import { describe, expect, it } from 'vitest';
import { applyBlueprintVisualSystem, auditBlueprintVisualSystem } from '../blueprintVisualSystem';

describe('blueprint visual system v2', () => {
  it('raises tiny typography and keeps notation-safe minimums readable', () => {
    const xml = '<mxGraphModel><root><mxCell id="a" value="x" style="fontSize=8;" vertex="1"><mxGeometry/></mxCell><mxCell id="b" value="&lt;span style=&quot;font-size:8.5px&quot;&gt;x&lt;/span&gt;" style="fontSize=12;" vertex="1"><mxGeometry/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintVisualSystem(xml, 'tech_serverless_gcp');
    expect(polished).toContain('fontSize=10');
    expect(polished).toContain('font-size:10px');
  });

  it('replaces legacy product labels with current human-facing names', () => {
    const xml = '<mxGraphModel><root><mxCell id="a" value="Cloud DLP • Dataplex Universal Catalog • Cloud Source Repositories • Gemini 3.7 Flash" vertex="1"><mxGeometry/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintVisualSystem(xml, 'unified_data_governance');
    expect(polished).toContain('Sensitive Data Protection');
    expect(polished).toContain('Knowledge Catalog');
    expect(polished).toContain('Secure Source Manager');
    expect(polished).toContain('Gemini (approved model)');
  });

  it('converts unreliable gcp2 stencils into self-contained image-backed marks', () => {
    const xml = '<mxGraphModel><root><mxCell id="a" value="Cloud Run" style="shape=mxgraph.gcp2.cloud_run;fontSize=9;strokeWidth=1;" vertex="1"><mxGeometry/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintVisualSystem(xml, 'tech_serverless_gcp');
    expect(polished).not.toContain('shape=mxgraph.gcp2.');
    expect(polished).toContain('shape=image;image=data:image/svg+xml');
    expect(auditBlueprintVisualSystem(polished).unresolvedGcpStencilCount).toBe(0);
  });

  it('adds readable edge-label treatment without changing BPMN routing semantics', () => {
    const xml = '<mxGraphModel><root><mxCell id="e" value="approve" style="dashed=1;" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell></root></mxGraphModel>';
    const generic = applyBlueprintVisualSystem(xml, 'tech_serverless_gcp');
    const bpmn = applyBlueprintVisualSystem(xml, 'bpmn_process_workflow');
    expect(generic).toContain('edgeStyle=orthogonalEdgeStyle');
    expect(generic).toContain('labelBackgroundColor=#FFFFFF');
    expect(bpmn).not.toContain('edgeStyle=orthogonalEdgeStyle');
    expect(bpmn).toContain('labelBackgroundColor=#FFFFFF');
  });
});
