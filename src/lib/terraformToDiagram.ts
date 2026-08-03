/**
 * 🛠️ Terraform HCL (.tf) to PromptCanvas Widescreen Draw.io Architecture Converter
 * Parses GCP/AWS Terraform resource declarations and compiles them into
 * a structured widescreen architecture diagram.
 */

export interface ParsedTerraformResource {
  type: string;
  name: string;
  displayName: string;
  category: 'ingestion' | 'compute' | 'database' | 'security';
  cloud: 'GCP' | 'AWS';
}

export function parseTerraformHclResources(hclCode: string): ParsedTerraformResource[] {
  const resources: ParsedTerraformResource[] = [];
  const resourceRegex = /resource\s+"([^"]+)"\s+"([^"]+)"\s*\{/g;
  let match;

  while ((match = resourceRegex.exec(hclCode)) !== null) {
    const resType = match[1];
    const resName = match[2];
    const lower = `${resType} ${resName}`.toLowerCase();

    let category: 'ingestion' | 'compute' | 'database' | 'security' = 'compute';
    let cloud: 'GCP' | 'AWS' = 'GCP';

    if (resType.startsWith('aws_')) {
      cloud = 'AWS';
    }

    if (
      lower.includes('armor') ||
      lower.includes('waf') ||
      lower.includes('firewall') ||
      lower.includes('security_policy') ||
      lower.includes('kms')
    ) {
      category = 'security';
    } else if (
      lower.includes('storage') ||
      lower.includes('bucket') ||
      lower.includes('pubsub') ||
      lower.includes('sqs') ||
      lower.includes('sns') ||
      lower.includes('eventbridge')
    ) {
      category = 'ingestion';
    } else if (
      lower.includes('sql') ||
      lower.includes('alloydb') ||
      lower.includes('spanner') ||
      lower.includes('bigquery') ||
      lower.includes('rds') ||
      lower.includes('aurora') ||
      lower.includes('dynamodb')
    ) {
      category = 'database';
    } else {
      category = 'compute';
    }

    // Format human-friendly label
    const formattedType = resType
      .replace(/^(google_|aws_)/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const formattedName = resName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    resources.push({
      type: resType,
      name: resName,
      displayName: `${formattedType}\n(${formattedName})`,
      category,
      cloud,
    });
  }

  return resources;
}

export function compileTerraformToDrawioXml(hclCode: string, diagramTitle: string = 'Terraform Infrastructure'): string {
  const resources = parseTerraformHclResources(hclCode);

  // If no resource blocks parsed, generate a default template populated with the HCL context
  if (resources.length === 0) {
    return `
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="tf-imported" name="${diagramTitle}">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1080" background="#0F172A">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="20" y="20" width="1880" height="1040" as="geometry" />
        </mxCell>
        <mxCell id="header" value="${diagramTitle.toUpperCase()} - REVERSE-ENGINEERED TERRAFORM BLUEPRINT" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=22;fontStyle=1;fontColor=#F8FAFC;" vertex="1" parent="1">
          <mxGeometry x="40" y="35" width="1840" height="35" as="geometry" />
        </mxCell>
        <mxCell id="note" value="&lt;b&gt;Custom Terraform Blueprint&lt;/b&gt;&lt;br/&gt;Parsed from HCL Infrastructure-as-Code definitions" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;spacingTop=8;" vertex="1" parent="1">
          <mxGeometry x="760" y="450" width="400" height="180" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
    `.trim();
  }

  const col1 = resources.filter((r) => r.category === 'ingestion');
  const col2 = resources.filter((r) => r.category === 'compute');
  const col3 = resources.filter((r) => r.category === 'security');
  const col4 = resources.filter((r) => r.category === 'database');

  // Ensure every column has at least one node
  if (col1.length === 0) col1.push({ type: 'google_storage_bucket', name: 'ingestion_gcs', displayName: 'Cloud Storage (GCS)\nIngestion Bucket', category: 'ingestion', cloud: 'GCP' });
  if (col2.length === 0) col2.push({ type: 'google_cloud_run_service', name: 'compute_run', displayName: 'Cloud Run Service\nApp Container', category: 'compute', cloud: 'GCP' });
  if (col3.length === 0) col3.push({ type: 'google_compute_security_policy', name: 'waf_armor', displayName: 'Cloud Armor WAF\nSecurity Perimeter', category: 'security', cloud: 'GCP' });
  if (col4.length === 0) col4.push({ type: 'google_sql_database_instance', name: 'db_sql', displayName: 'Cloud SQL / AlloyDB\nRelational Database', category: 'database', cloud: 'GCP' });

  const renderColumnNodes = (list: ParsedTerraformResource[], startX: number, colWidth: number) => {
    return list
      .map((item, idx) => {
        const y = 210 + idx * 155;
        const cleanLabel = item.displayName.replace(/&/g, '&amp;').replace(/\n/g, '<br/>');
        return `
        <mxCell id="res_${item.type}_${item.name}_${idx}" value="&lt;b&gt;${cleanLabel}&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#94A3B8;'&gt;${item.type}.${item.name}&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="${startX + 20}" y="${y}" width="${colWidth - 40}" height="120" as="geometry" />
        </mxCell>`;
      })
      .join('\n');
  };

  return `
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="tf-imported" name="${diagramTitle}">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1080" background="#0F172A">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <mxCell id="frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="20" y="20" width="1880" height="1040" as="geometry" />
        </mxCell>

        <mxCell id="header_title" value="${diagramTitle.toUpperCase()} - REVERSE-ENGINEERED TERRAFORM ARCHITECTURE" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=22;fontStyle=1;fontColor=#F8FAFC;" vertex="1" parent="1">
          <mxGeometry x="40" y="35" width="1840" height="35" as="geometry" />
        </mxCell>
        <mxCell id="header_sub" value="Auto-compiled architecture topology reverse-engineered directly from Terraform HCL (.tf) resource declarations (${resources.length} resources parsed)." style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=13;fontColor=#94A3B8;" vertex="1" parent="1">
          <mxGeometry x="40" y="70" width="1840" height="25" as="geometry" />
        </mxCell>

        <!-- COL 1: Ingestion & Storage -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="110" width="380" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col1_title" value="1. INGESTION &amp; STORAGE TIER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="80" y="125" width="340" height="45" as="geometry" />
        </mxCell>
        ${renderColumnNodes(col1, 60, 380)}

        <!-- COL 2: Compute & Containers -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="480" y="110" width="420" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col2_title" value="2. COMPUTE &amp; SERVERLESS TIER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="500" y="125" width="380" height="45" as="geometry" />
        </mxCell>
        ${renderColumnNodes(col2, 480, 420)}

        <!-- COL 3: Security & WAF Perimeter -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="940" y="110" width="420" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col3_title" value="3. SECURITY &amp; WAF PERIMETER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="960" y="125" width="380" height="45" as="geometry" />
        </mxCell>
        ${renderColumnNodes(col3, 940, 420)}

        <!-- COL 4: Database & Data Warehouse -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1400" y="110" width="440" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col4_title" value="4. DATABASE &amp; DATA WAREHOUSE TIER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="1420" y="125" width="400" height="45" as="geometry" />
        </mxCell>
        ${renderColumnNodes(col4, 1400, 440)}

        <!-- Horizontal Flow Connectors -->
        <mxCell id="flow1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;" edge="1" parent="1" source="col1_title" target="col2_title">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="flow2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;" edge="1" parent="1" source="col2_title" target="col3_title">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="flow3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;" edge="1" parent="1" source="col3_title" target="col4_title">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}
