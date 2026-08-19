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
    expect(generic).toContain('strokeColor=#64748B');
    expect(generic).toContain('labelBackgroundColor=#FFFFFF');
    expect(bpmn).not.toContain('edgeStyle=orthogonalEdgeStyle');
    expect(bpmn).toContain('labelBackgroundColor=#FFFFFF');
  });

  it('standardizes generic architecture cards without flattening their semantic colors', () => {
    const xml = '<mxGraphModel><root><mxCell id="card" value="Cloud Run service" style="rounded=1;fillColor=#E8F0FE;strokeColor=#4285F4;fontSize=11;" vertex="1"><mxGeometry/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintVisualSystem(xml, 'tech_serverless_gcp');
    expect(polished).toContain('fillColor=#E8F0FE');
    expect(polished).toContain('strokeColor=#4285F4');
    expect(polished).toContain('spacing=6');
    expect(polished).toContain('arcSize=8');
    expect(polished).toContain('shadow=0');
    expect(auditBlueprintVisualSystem(polished).polishedCardCount).toBeGreaterThan(0);
  });

  it('preserves notation-sensitive vertex geometry and shape styles', () => {
    const xml = '<mxGraphModel><root><mxCell id="entity" value="Customer" style="rounded=0;fillColor=#FFFFFF;strokeColor=#000000;fontSize=9;" vertex="1"><mxGeometry/></mxCell></root></mxGraphModel>';
    const erd = applyBlueprintVisualSystem(xml, 'erd');
    expect(erd).not.toContain('spacing=6');
    expect(erd).toContain('rounded=0');
  });

  it('removes the duplicate in-canvas blueprint banner and pulls the architecture body up', () => {
    const xml = '<mxGraphModel pageHeight="900"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="bp26" value="26" style="fontSize=30;" vertex="1" parent="1"><mxGeometry x="20" y="18" width="64" height="64" as="geometry"/></mxCell><mxCell id="title" value="GCP SERVERLESS EDA ARCHITECTURE" style="fontSize=27;" vertex="1" parent="1"><mxGeometry x="100" y="12" width="720" height="76" as="geometry"/></mxCell><mxCell id="traits" value="Serverless • Real-time • Google Cloud" style="fontSize=14;" vertex="1" parent="1"><mxGeometry x="845" y="22" width="900" height="54" as="geometry"/></mxCell><mxCell id="sources_bg" value="EVENT SOURCES" style="swimlane;fontSize=14;" vertex="1" parent="1"><mxGeometry x="20" y="105" width="190" height="520" as="geometry"/></mxCell><mxCell id="edge" style="strokeWidth=2;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"/><mxPoint x="200" y="200" as="targetPoint"/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintVisualSystem(xml, 'tech_serverless_gcp');
    expect(polished).not.toContain('id="bp26"');
    expect(polished).not.toContain('id="title"');
    expect(polished).not.toContain('id="traits"');
    expect(polished).toContain('id="sources_bg"');
    expect(polished).toContain('y="12" width="190" height="520"');
    expect(polished).toContain('pc-canvas-header-stripped');
    expect(auditBlueprintVisualSystem(polished).duplicateCanvasHeaderRemoved).toBe(true);
  });

  it('does not remove top content when no duplicate blueprint banner is detected', () => {
    const xml = '<mxGraphModel pageHeight="500"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="content" value="Start" style="fontSize=12;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="160" height="60" as="geometry"/></mxCell></root></mxGraphModel>';
    const polished = applyBlueprintVisualSystem(xml, 'tech_serverless_gcp');
    expect(polished).toContain('id="content"');
    expect(polished).not.toContain('pc-canvas-header-stripped');
  });
});
