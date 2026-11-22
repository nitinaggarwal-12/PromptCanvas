import { ArchitectureGraph } from '../graph/schema';
import {
  TIER_PALETTE_LIGHT,
  TIER_PALETTE_DARK,
  NODE_TYPE_STYLES_LIGHT,
  NODE_TYPE_STYLES_DARK,
  getProductIconUrl,
} from './styles';

export function escapeXmlAttr(str: string): string {
  if (!str) return '';
  return str
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9a-fA-F]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtmlText(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderGraphToDrawioXml(graph: ArchitectureGraph, theme: 'light' | 'dark' = 'light'): string {
  const isDark = theme === 'dark';
  const tierPalette = isDark ? TIER_PALETTE_DARK : TIER_PALETTE_LIGHT;
  const nodeStyles = isDark ? NODE_TYPE_STYLES_DARK : NODE_TYPE_STYLES_LIGHT;
  const canvasBg = isDark ? '#0B111E' : '#F8FAFC';
  const tierBorderColor = isDark ? '#334155' : '#CBD5E1';
  const tierTitleColor = isDark ? '#93C5FD' : '#1E3A8A';
  const edgeStrokeColor = isDark ? '#60A5FA' : '#475569';
  const edgeLabelBg = isDark ? '#0F172A' : '#FFFFFF';
  const edgeLabelBorder = isDark ? '#334155' : '#CBD5E1';
  const edgeFontColor = isDark ? '#93C5FD' : '#1E293B';

  const cellXmls: string[] = [];

  // Cell 0 & Cell 1 required root elements
  cellXmls.push('<mxCell id="0" />');
  cellXmls.push('<mxCell id="1" parent="0" />');

  const sortedTiers = [...graph.tiers].sort((a, b) => a.order - b.order);
  const firstTierX = sortedTiers.length > 0 ? Math.max(sortedTiers[0].x ?? 40, 24) : 40;
  const maxTierWidth = sortedTiers.reduce((mx, t) => Math.max(mx, t.width ?? 920), 920);

  // 0. Render Clean Architecture Title Banner (marked as label/header so topology checks skip it)
  const cloudLabelMap: Record<ArchitectureGraph['cloud'], string> = {
    aws: 'AWS Cloud Architecture',
    azure: 'Microsoft Azure Architecture',
    gcp: 'Google Cloud Architecture',
    hybrid: 'Hybrid & Multi-Cloud Architecture',
    generic: 'System Architecture Blueprint',
  };
  const titleBg = isDark ? '#0F172A' : '#FFFFFF';
  const titleStroke = isDark ? '#334155' : '#CBD5E1';
  const titleFg = isDark ? '#F8FAFC' : '#0F172A';
  const subFg = isDark ? '#94A3B8' : '#475569';
  const titleBannerHtml = escapeXmlAttr(
    `<div style="text-align:left;padding:2px 8px;">` +
      `<div style="font-size:14px;font-weight:700;color:${titleFg};line-height:1.25;">${escapeHtmlText(graph.title || 'Architecture Canvas')}</div>` +
      `<div style="font-size:10px;color:${subFg};margin-top:2px;">${escapeHtmlText(cloudLabelMap[graph.cloud] || 'System Architecture')} • ${graph.nodes.length} Components • ${graph.edges.length} Flows</div>` +
    `</div>`
  );
  cellXmls.push(
    `  <mxCell id="v2_canvas_title" value="${titleBannerHtml}" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;align=left;verticalAlign=middle;spacingLeft=12;fillColor=${titleBg};strokeColor=${titleStroke};strokeWidth=1.5;" vertex="1" parent="1">\n` +
    `    <mxGeometry x="${firstTierX}" y="24" width="${maxTierWidth}" height="54" as="geometry" />\n` +
    `  </mxCell>`
  );

  // 1. Render Tier Containers
  let maxCanvasX = firstTierX + maxTierWidth + 60;
  let maxCanvasY = 200;

  sortedTiers.forEach((tier, idx) => {
    const fillColor = tierPalette[tier.order] || tierPalette[(idx % 8) + 1] || (isDark ? '#0F172A' : '#FFFFFF');
    const tierX = Math.max(tier.x ?? 40, 24);
    const tierY = Math.max(tier.y ?? 106, 24);
    const tierW = Math.max(tier.width ?? maxTierWidth, 400);
    const tierH = Math.max(tier.height ?? 160, 110);

    maxCanvasX = Math.max(maxCanvasX, tierX + tierW + 80);
    maxCanvasY = Math.max(maxCanvasY, tierY + tierH + 90);

    const labelHtml = escapeXmlAttr(
      `<b style="color:${tierTitleColor};font-size:11.5px;letter-spacing:0.6px;">${escapeHtmlText(tier.label.toUpperCase())}</b>`
    );

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(tier.id)}" value="${labelHtml}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;verticalAlign=top;align=left;spacingLeft=16;spacingTop=10;fontStyle=1;fontSize=12;fillColor=${fillColor};strokeColor=${tierBorderColor};strokeWidth=1.5;container=1;collapsible=0;" vertex="1" parent="1">\n` +
      `    <mxGeometry x="${tierX}" y="${tierY}" width="${tierW}" height="${tierH}" as="geometry" />\n` +
      `  </mxCell>`
    );
  });

  // 2. Render Nodes (Zero inline JS onerror, per-service official SVGs, cylinder top headroom)
  graph.nodes.forEach((node) => {
    const styleToken = nodeStyles[node.type] || nodeStyles.service || nodeStyles.compute;
    const iconUrl = getProductIconUrl(node.product || node.label, graph.cloud, node.type);

    const isCylinder = styleToken.shape === 'cylinder3';
    const shapeStyle = isCylinder
      ? 'shape=cylinder3;whiteSpace=wrap;boundedLbl=1;backgroundOutline=1;size=12;spacingTop=12;'
      : 'arcSize=10;';
    const nodeStyle = `rounded=1;whiteSpace=wrap;html=1;${shapeStyle}fillColor=${styleToken.fillColor};strokeColor=${styleToken.strokeColor};fontColor=${styleToken.fontColor};strokeWidth=1.5;shadow=0;`;

    const iconBoxBg = isDark ? '#0F172A' : (styleToken.badgeBg || '#EFF6FF');
    const iconBoxBorder = isDark ? '#334155' : styleToken.strokeColor;
    const titleColor = isDark ? '#F8FAFC' : '#0F172A';
    const subtitleColor = isDark ? '#94A3B8' : '#475569';

    const subtitleText = (node.subtitle || node.description || node.product || '').trim().slice(0, 105);
    const padTop = isCylinder ? 'padding-top:10px;' : '';

    const rawHtmlValue =
      `<table style="width:100%;height:100%;border-collapse:collapse;${padTop}">` +
      `<tr>` +
        `<td style="width:38px;vertical-align:middle;padding:2px 2px 2px 6px;text-align:center;">` +
          `<div style="width:30px;height:30px;border-radius:6px;background:${iconBoxBg};border:1px solid ${iconBoxBorder};display:flex;align-items:center;justify-content:center;margin:0 auto;">` +
            `<img src="${iconUrl}" width="18" height="18" style="display:block;margin:auto;"/>` +
          `</div>` +
        `</td>` +
        `<td style="vertical-align:middle;padding:4px 8px 4px 6px;text-align:left;">` +
          `<div style="font-size:10.5px;font-weight:700;color:${titleColor};line-height:1.22;">${escapeHtmlText(node.label)}</div>` +
          (subtitleText
            ? `<div style="font-size:8.5px;color:${subtitleColor};margin-top:2px;line-height:1.2;">${escapeHtmlText(subtitleText)}</div>`
            : '') +
        `</td>` +
      `</tr>` +
      `</table>`;

    const escapedValue = escapeXmlAttr(rawHtmlValue);

    const nx = Math.max(node.x ?? 36, 0);
    const ny = Math.max(node.y ?? 48, 0);
    const nw = Math.max(node.width ?? 220, 160);
    const nh = Math.max(node.height ?? (isCylinder ? 96 : 74), isCylinder ? 88 : 64);

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(node.id)}" value="${escapedValue}" style="${nodeStyle}" vertex="1" parent="${escapeXmlAttr(node.tier)}">\n` +
      `    <mxGeometry x="${nx}" y="${ny}" width="${nw}" height="${nh}" as="geometry" />\n` +
      `  </mxCell>`
    );
  });

  // 3. Render Edges (Draw.io Pillar 9: edgeStyle=none;rounded=1 when explicit orthogonal waypoints are present)
  graph.edges.forEach((edge) => {
    const dashStyle = edge.style === 'dashed' ? 'dashed=1;dashPattern=6 4;' : '';
    const cleanEdgeLabel = (edge.label || '').trim().slice(0, 44);
    const labelVal = cleanEdgeLabel
      ? escapeXmlAttr(`<span style="font-size:8.5px;font-weight:600;color:${edgeFontColor};">${escapeHtmlText(cleanEdgeLabel)}</span>`)
      : '';

    const hasWaypoints = Array.isArray(edge.bendPoints) && edge.bendPoints.length > 0;
    let pointsXml = '';
    if (hasWaypoints) {
      for (const bp of edge.bendPoints!) {
        maxCanvasX = Math.max(maxCanvasX, bp.x + 60);
        maxCanvasY = Math.max(maxCanvasY, bp.y + 60);
      }
      const ptStrings = edge.bendPoints!.map((bp) => `<mxPoint x="${bp.x}" y="${bp.y}" />`).join('\n        ');
      pointsXml = `\n      <Array as="points">\n        ${ptStrings}\n      </Array>\n    `;
    }

    const routingStyle = hasWaypoints
      ? 'edgeStyle=none;rounded=1;'
      : 'edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;';

    const anchorParts: string[] = [];
    if (typeof edge.exitX === 'number' && typeof edge.exitY === 'number') {
      anchorParts.push(`exitX=${edge.exitX};exitY=${edge.exitY};exitDx=0;exitDy=0;`);
    }
    if (typeof edge.entryX === 'number' && typeof edge.entryY === 'number') {
      anchorParts.push(`entryX=${edge.entryX};entryY=${edge.entryY};entryDx=0;entryDy=0;`);
    }

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(edge.id)}" value="${labelVal}" style="${routingStyle}${anchorParts.join('')}html=1;strokeWidth=1.7;strokeColor=${edgeStrokeColor};${dashStyle}endArrow=blockThin;endFill=1;labelBackgroundColor=${edgeLabelBg};labelBorderColor=${edgeLabelBorder};fontSize=8.5;fontColor=${edgeFontColor};fontStyle=1;" edge="1" parent="1" source="${escapeXmlAttr(edge.source)}" target="${escapeXmlAttr(edge.target)}">\n` +
      `    <mxGeometry relative="1" as="geometry">${pointsXml}</mxGeometry>\n` +
      `  </mxCell>`
    );
  });

  const pageWidth = Math.max(1200, Math.ceil(maxCanvasX / 20) * 20);
  const pageHeight = Math.max(840, Math.ceil(maxCanvasY / 20) * 20);

  const fullXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas-LayoutEngineV2" version="21.0.0" type="embed">\n` +
    `  <diagram id="page-1" name="${escapeXmlAttr(graph.title || 'Architecture Canvas')}">\n` +
    `    <mxGraphModel dx="${pageWidth}" dy="${pageHeight}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${pageWidth}" pageHeight="${pageHeight}" background="${canvasBg}" math="0" shadow="0">\n` +
    `      <root>\n` +
    cellXmls.join('\n') +
    `\n      </root>\n` +
    `    </mxGraphModel>\n` +
    `  </diagram>\n` +
    `</mxfile>`;

  return fullXml;
}
