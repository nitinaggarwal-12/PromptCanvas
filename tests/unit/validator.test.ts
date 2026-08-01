import { validateDrawioXml } from '../../src/lib/validate/validator';

export function runValidatorTests(): boolean {
  console.log('\n🧪 Running XML Pre-Render Validator Unit Tests...');
  let passed = true;

  // 1. Clean Fixture (Passed)
  const cleanXml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="page-1" name="Clean Test">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="tier_1" value="Tier 1" style="rounded=0;container=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="800" height="200" as="geometry"/>
        </mxCell>
        <mxCell id="n1" value="Node 1" style="rounded=1;" vertex="1" parent="tier_1">
          <mxGeometry x="50" y="50" width="180" height="72" as="geometry"/>
        </mxCell>
        <mxCell id="n2" value="Node 2" style="rounded=1;" vertex="1" parent="tier_1">
          <mxGeometry x="300" y="50" width="180" height="72" as="geometry"/>
        </mxCell>
        <mxCell id="e1" value="Flow" style="edgeStyle=orthogonalEdgeStyle;" edge="1" parent="1" source="n1" target="n2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  const cleanRes = validateDrawioXml(cleanXml);
  if (!cleanRes.valid) {
    console.error(' ❌ Clean fixture failed validation:', cleanRes.errors);
    passed = false;
  } else {
    console.log(' ✅ Clean fixture passed validation');
  }

  // 2. XML_INVALID
  const invalidXml = `<mxfile><diagram><invalid xml tag`;
  const invalidRes = validateDrawioXml(invalidXml);
  if (invalidRes.valid || !invalidRes.errors.some((e) => e.code === 'XML_INVALID')) {
    console.error(' ❌ XML_INVALID fixture not detected');
    passed = false;
  } else {
    console.log(' ✅ XML_INVALID fixture detected');
  }

  // 3. EDGE_DANGLING
  const danglingEdgeXml = cleanXml.replace('source="n1"', 'source="non_existent_n1"');
  const danglingRes = validateDrawioXml(danglingEdgeXml);
  if (danglingRes.valid || !danglingRes.errors.some((e) => e.code === 'EDGE_DANGLING')) {
    console.error(' ❌ EDGE_DANGLING fixture not detected');
    passed = false;
  } else {
    console.log(' ✅ EDGE_DANGLING fixture detected');
  }

  // 4. GEOMETRY_MISSING / TOO SMALL
  const smallGeomXml = cleanXml.replace('width="180" height="72"', 'width="50" height="30"');
  const smallRes = validateDrawioXml(smallGeomXml);
  if (smallRes.valid || !smallRes.errors.some((e) => e.code === 'GEOMETRY_MISSING')) {
    console.error(' ❌ GEOMETRY_MISSING (too small) fixture not detected');
    passed = false;
  } else {
    console.log(' ✅ GEOMETRY_MISSING fixture detected');
  }

  // 5. OVERLAP
  const overlapXml = cleanXml.replace('x="300" y="50"', 'x="60" y="50"');
  const overlapRes = validateDrawioXml(overlapXml);
  if (overlapRes.valid || !overlapRes.errors.some((e) => e.code === 'OVERLAP')) {
    console.error(' ❌ OVERLAP fixture not detected');
    passed = false;
  } else {
    console.log(' ✅ OVERLAP fixture detected');
  }

  // 6. OUT_OF_CONTAINER (top band overlap y=10)
  const topBandXml = cleanXml.replace('x="50" y="50"', 'x="50" y="10"');
  const topBandRes = validateDrawioXml(topBandXml);
  if (topBandRes.valid || !topBandRes.errors.some((e) => e.code === 'OUT_OF_CONTAINER')) {
    console.error(' ❌ OUT_OF_CONTAINER (top band) fixture not detected');
    passed = false;
  } else {
    console.log(' ✅ OUT_OF_CONTAINER fixture detected');
  }

  // 7. OUT_OF_BOUNDS (negative relative coords)
  const negCoordsXml = cleanXml.replace('x="50" y="50"', 'x="-20" y="50"');
  const negRes = validateDrawioXml(negCoordsXml);
  if (negRes.valid || !negRes.errors.some((e) => e.code === 'OUT_OF_BOUNDS')) {
    console.error(' ❌ OUT_OF_BOUNDS fixture not detected');
    passed = false;
  } else {
    console.log(' ✅ OUT_OF_BOUNDS fixture detected');
  }

  // 8. ORPHAN_NODE (warning check)
  const orphanXml = cleanXml.replace(/<mxCell id="e1"[\s\S]*?<\/mxCell>/, '');
  const orphanRes = validateDrawioXml(orphanXml);
  if (!orphanRes.warnings.some((w) => w.code === 'ORPHAN_NODE')) {
    console.error(' ❌ ORPHAN_NODE warning fixture not detected');
    passed = false;
  } else {
    console.log(' ✅ ORPHAN_NODE warning fixture detected');
  }

  return passed;
}
