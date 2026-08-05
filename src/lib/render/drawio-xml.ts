import { ArchitectureGraph } from '../graph/schema';
import { TIER_PALETTE, NODE_TYPE_STYLES, getProductIconUrl } from './styles';

export function escapeXmlAttr(str: string): string {
  if (!str) return '';
  return str
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9a-fA-F]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderGraphToDrawioXml(graph: ArchitectureGraph): string {
  const cellXmls: string[] = [];

  // Cell 0 & Cell 1 required root elements
  cellXmls.push('<mxCell id="0" />');
  cellXmls.push('<mxCell id="1" parent="0" />');

  const tierMap = new Map<string, number>();

  // 1. Render Tier Containers
  const sortedTiers = [...graph.tiers].sort((a, b) => a.order - b.order);
  sortedTiers.forEach((tier, idx) => {
    tierMap.set(tier.id, tier.order);
    const fillColor = TIER_PALETTE[tier.order] || TIER_PALETTE[(idx % 8) + 1] || '#F8FAFC';
    const tierX = Math.max(tier.x ?? 40, 40);
    const tierY = Math.max(tier.y ?? 40, 40);
    const tierW = Math.max(tier.width ?? 800, 400);
    const tierH = Math.max(tier.height ?? 160, 100);

    const labelHtml = `<b>${escapeXmlAttr(tier.label)}</b>`;

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(tier.id)}" value="${labelHtml}" style="rounded=0;whiteSpace=wrap;html=1;verticalAlign=top;align=left;spacingLeft=15;spacingTop=10;fontStyle=1;fontSize=14;fillColor=${fillColor};strokeColor=#94A3B8;strokeWidth=2;container=1;collapsible=0;" vertex="1" parent="1">\n` +
      `    <mxGeometry x="${tierX}" y="${tierY}" width="${tierW}" height="${tierH}" as="geometry" />\n` +
      `  </mxCell>`
    );
  });

  // 2. Render Nodes
  graph.nodes.forEach((node) => {
    const styleToken = NODE_TYPE_STYLES[node.type] || NODE_TYPE_STYLES.compute;
    const iconUrl = getProductIconUrl(node.product || node.label, graph.cloud);

    const shapeStyle = styleToken.shape ? `shape=${styleToken.shape};` : 'arcSize=10;';
    const nodeStyle = `rounded=1;whiteSpace=wrap;html=1;${shapeStyle}fillColor=${styleToken.fillColor};strokeColor=${styleToken.strokeColor};fontColor=${styleToken.fontColor};strokeWidth=2;`;

    const rawHtmlValue =
      `<img src="${iconUrl}" width="20" height="20" style="float:left;margin-right:8px;vertical-align:middle;" onerror="this.style.display='none'">` +
      `<b>${node.label}</b>` +
      `<br><i>${node.description || node.product}</i>`;

    const escapedValue = escapeXmlAttr(rawHtmlValue);

    const nx = Math.max(node.x ?? 30, 0);
    const ny = Math.max(node.y ?? 50, 0);
    const nw = Math.max(node.width ?? 180, 120);
    const nh = Math.max(node.height ?? 72, 60);

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(node.id)}" value="${escapedValue}" style="${nodeStyle}" vertex="1" parent="${escapeXmlAttr(node.tier)}">\n` +
      `    <mxGeometry x="${nx}" y="${ny}" width="${nw}" height="${nh}" as="geometry" />\n` +
      `  </mxCell>`
    );
  });

  // 3. Render Edges
  graph.edges.forEach((edge) => {
    const dashStyle = edge.style === 'dashed' ? 'dashed=1;dashPattern=8 8;' : '';

    const labelVal = escapeXmlAttr(edge.label ? `<i>${edge.label}</i>` : '');

    let pointsXml = '';
    if (edge.bendPoints && edge.bendPoints.length > 0) {
      const ptStrings = edge.bendPoints.map((bp) => `<mxPoint x="${bp.x}" y="${bp.y}" />`).join('\n        ');
      pointsXml = `\n      <Array as="points">\n        ${ptStrings}\n      </Array>\n    `;
    }

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(edge.id)}" value="${labelVal}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#64748B;${dashStyle}labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;" edge="1" parent="1" source="${escapeXmlAttr(edge.source)}" target="${escapeXmlAttr(edge.target)}">\n` +
      `    <mxGeometry relative="1" as="geometry">${pointsXml}</mxGeometry>\n` +
      `  </mxCell>`
    );
  });

  const fullXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas-LayoutEngineV2" version="21.0.0" type="embed">\n` +
    `  <diagram id="page-1" name="${escapeXmlAttr(graph.title || 'Architecture Canvas')}">\n` +
    `    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="1400" math="0" shadow="0">\n` +
    `      <root>\n` +
    cellXmls.join('\n') +
    `\n      </root>\n` +
    `    </mxGraphModel>\n` +
    `  </diagram>\n` +
    `</mxfile>`;

  return fullXml;
}
