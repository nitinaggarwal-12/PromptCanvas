import { xmlToGraph } from '../../src/lib/graph/xmlToGraph';

export function runXmlToGraphTests(): boolean {
  console.log('\n🧪 Running xmlToGraph Extractor Unit Tests...');
  let passed = true;

  const sampleXml = `
    <mxfile host="embed.diagrams.net">
      <diagram name="Page-1">
        <mxGraphModel>
          <root>
            <mxCell id="0" />
            <mxCell id="1" parent="0" />
            <mxCell id="tier_1" value="Compute Tier" style="container=1;" vertex="1" parent="1" />
            <mxCell id="node_1" value="Cloud Run — API Service" style="rounded=1;" vertex="1" parent="tier_1" />
            <mxCell id="node_2" value="Cloud SQL — Postgres" style="cylinder3;" vertex="1" parent="tier_1" />
            <mxCell id="edge_1" value="SQL connection" style="orthogonalEdgeStyle;" edge="1" parent="1" source="node_1" target="node_2" />
          </root>
        </mxGraphModel>
      </diagram>
    </mxfile>
  `;

  const graph = xmlToGraph(sampleXml);
  if (!graph) {
    console.error(' ❌ xmlToGraph returned null for valid mxGraph XML');
    passed = false;
  } else if (graph.nodes.length !== 2) {
    console.error(` ❌ Expected 2 nodes, got ${graph.nodes.length}`);
    passed = false;
  } else if (graph.edges.length !== 1) {
    console.error(` ❌ Expected 1 edge, got ${graph.edges.length}`);
    passed = false;
  } else {
    console.log(' ✅ xmlToGraph successfully extracted graph structure from mxGraph XML');
  }

  const invalidResult = xmlToGraph('invalid xml content');
  if (invalidResult !== null) {
    console.error(' ❌ Expected null for invalid XML, got graph');
    passed = false;
  } else {
    console.log(' ✅ xmlToGraph correctly returned null for invalid XML');
  }

  return passed;
}
