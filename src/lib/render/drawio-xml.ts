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
  const edgeFontColor = isDark ? '#93C5FD' : '#334155';

  const cellXmls: string[] = [];

  // Cell 0 & Cell 1 required root elements
  cellXmls.push('<mxCell id="0" />');
  cellXmls.push('<mxCell id="1" parent="0" />');

  // 1. Render Tier Containers
  const sortedTiers = [...graph.tiers].sort((a, b) => a.order - b.order);
  sortedTiers.forEach((tier, idx) => {
    const fillColor = tierPalette[tier.order] || tierPalette[(idx % 8) + 1] || (isDark ? '#0F172A' : '#FFFFFF');
    const tierX = Math.max(tier.x ?? 40, 40);
    const tierY = Math.max(tier.y ?? 40, 40);
    const tierW = Math.max(tier.width ?? 800, 400);
    const tierH = Math.max(tier.height ?? 160, 100);

    const labelHtml = `<b style="color:${tierTitleColor};font-size:12px;letter-spacing:0.5px;">${escapeXmlAttr(tier.label.toUpperCase())}</b>`;

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(tier.id)}" value="${labelHtml}" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;verticalAlign=top;align=left;spacingLeft=16;spacingTop=10;fontStyle=1;fontSize=12;fillColor=${fillColor};strokeColor=${tierBorderColor};strokeWidth=1.5;container=1;collapsible=0;" vertex="1" parent="1">\n` +
      `    <mxGeometry x="${tierX}" y="${tierY}" width="${tierW}" height="${tierH}" as="geometry" />\n` +
      `  </mxCell>`
    );
  });

  // 2. Render Nodes
  graph.nodes.forEach((node) => {
    const styleToken = nodeStyles[node.type] || nodeStyles.compute;
    const iconUrl = getProductIconUrl(node.product || node.label, graph.cloud);

    const shapeStyle = styleToken.shape ? `shape=${styleToken.shape};` : 'arcSize=10;';
    const nodeStyle = `rounded=1;whiteSpace=wrap;html=1;${shapeStyle}fillColor=${styleToken.fillColor};strokeColor=${styleToken.strokeColor};fontColor=${styleToken.fontColor};strokeWidth=1.5;shadow=0;`;

    const iconBoxBg = isDark ? '#0F172A' : (styleToken.badgeBg || '#EFF6FF');
    const iconBoxBorder = isDark ? '#334155' : styleToken.strokeColor;
    const titleColor = isDark ? '#F8FAFC' : '#0F172A';
    const subtitleColor = isDark ? '#94A3B8' : '#64748B';

    const rawHtmlValue =
      `<table style="width:100%;height:100%;border-collapse:collapse;">` +
      `<tr>` +
        `<td style="width:36px;vertical-align:middle;padding:2px;text-align:center;">` +
          `<div style="width:30px;height:30px;border-radius:6px;background:${iconBoxBg};border:1px solid ${iconBoxBorder};display:flex;align-items:center;justify-content:center;margin:0 auto;">` +
            `<img src="${iconUrl}" width="18" height="18" style="display:block;margin:auto;" onerror="this.style.display='none'"/>` +
          `</div>` +
        `</td>` +
        `<td style="vertical-align:middle;padding-left:6px;text-align:left;">` +
          `<div style="font-size:10.5px;font-weight:700;color:${titleColor};line-height:1.2;">${escapeXmlAttr(node.label)}</div>` +
          (node.description || node.product || node.subtitle ? `<div style="font-size:8px;color:${subtitleColor};margin-top:2px;line-height:1.15;">${escapeXmlAttr(node.description || node.product || node.subtitle || '')}</div>` : '') +
        `</td>` +
      `</tr>` +
      `</table>`;

    const escapedValue = escapeXmlAttr(rawHtmlValue);

    const nx = Math.max(node.x ?? 30, 0);
    const ny = Math.max(node.y ?? 50, 0);
    const nw = Math.max(node.width ?? 190, 140);
    const nh = Math.max(node.height ?? 64, 56);

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(node.id)}" value="${escapedValue}" style="${nodeStyle}" vertex="1" parent="${escapeXmlAttr(node.tier)}">\n` +
      `    <mxGeometry x="${nx}" y="${ny}" width="${nw}" height="${nh}" as="geometry" />\n` +
      `  </mxCell>`
    );
  });

  // 3. Render Edges
  graph.edges.forEach((edge) => {
    const dashStyle = edge.style === 'dashed' ? 'dashed=1;dashPattern=6 4;' : '';
    const labelVal = escapeXmlAttr(edge.label ? `<span style="font-size:8.5px;font-weight:600;color:${edgeFontColor};">${edge.label}</span>` : '');

    let pointsXml = '';
    if (edge.bendPoints && edge.bendPoints.length > 0) {
      const ptStrings = edge.bendPoints.map((bp) => `<mxPoint x="${bp.x}" y="${bp.y}" />`).join('\n        ');
      pointsXml = `\n      <Array as="points">\n        ${ptStrings}\n      </Array>\n    `;
    }

    cellXmls.push(
      `  <mxCell id="${escapeXmlAttr(edge.id)}" value="${labelVal}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1.8;strokeColor=${edgeStrokeColor};${dashStyle}labelBackgroundColor=${edgeLabelBg};labelBorderColor=${edgeLabelBorder};fontSize=9;fontColor=${edgeFontColor};fontStyle=1;" edge="1" parent="1" source="${escapeXmlAttr(edge.source)}" target="${escapeXmlAttr(edge.target)}">\n` +
      `    <mxGeometry relative="1" as="geometry">${pointsXml}</mxGeometry>\n` +
      `  </mxCell>`
    );
  });

  const fullXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas-LayoutEngineV2" version="21.0.0" type="embed">\n` +
    `  <diagram id="page-1" name="${escapeXmlAttr(graph.title || 'Architecture Canvas')}">\n` +
    `    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="1400" background="${canvasBg}" math="0" shadow="0">\n` +
    `      <root>\n` +
    cellXmls.join('\n') +
    `\n      </root>\n` +
    `    </mxGraphModel>\n` +
    `  </diagram>\n` +
    `</mxfile>`;

  return fullXml;
}

