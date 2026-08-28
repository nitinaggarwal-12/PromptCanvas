import { Studio3SemanticGraph, Studio3Band, Studio3Column, Studio3PipelineStage } from './graphExtractor';
import { renderGcpIconHtml } from '../gcpIcons';

export interface LayoutOptions {
  theme?: 'light' | 'dark';
  canvasWidth?: number;
  canvasHeight?: number;
}

function escapeXml(str: any): string {
  if (!str) return '';
  const s = String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const COLOR_MAP: Record<string, { bg: string; text: string; lightBg: string; border: string }> = {
  blue: { bg: '#1D4ED8', text: '#FFFFFF', lightBg: '#EFF6FF', border: '#3B82F6' },
  teal: { bg: '#0D9488', text: '#FFFFFF', lightBg: '#F0FDFA', border: '#14B8A6' },
  purple: { bg: '#7C3AED', text: '#FFFFFF', lightBg: '#FAF5FF', border: '#8B5CF6' },
  slate: { bg: '#475569', text: '#FFFFFF', lightBg: '#F8FAFC', border: '#64748B' },
  amber: { bg: '#D97706', text: '#FFFFFF', lightBg: '#FFFBEB', border: '#F59E0B' },
  emerald: { bg: '#059669', text: '#FFFFFF', lightBg: '#ECFDF5', border: '#10B981' },
  green: { bg: '#059669', text: '#FFFFFF', lightBg: '#ECFDF5', border: '#10B981' },
  indigo: { bg: '#4338CA', text: '#FFFFFF', lightBg: '#EEF2FF', border: '#6366F1' },
  cyan: { bg: '#0891B2', text: '#FFFFFF', lightBg: '#ECFEFF', border: '#06B6D4' },
  red: { bg: '#DC2626', text: '#FFFFFF', lightBg: '#FEF2F2', border: '#EF4444' }
};

export function solveAndRenderStudio3Xml(
  graph: Studio3SemanticGraph,
  options: LayoutOptions = {}
): string {
  const { theme = 'dark', canvasWidth = 1600, canvasHeight = 1000 } = options;
  const isDark = theme === 'dark';

  const bgCanvas = isDark ? '#0B111E' : '#FFFFFF';
  const containerBg = isDark ? '#0F172A' : '#F8FAFC';
  const containerBorder = isDark ? '#1E293B' : '#E2E8F0';
  const cardBg = isDark ? '#131D31' : '#FFFFFF';
  const cardBorder = isDark ? '#1E2F4D' : '#CBD5E1';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textSecondary = isDark ? '#94A3B8' : '#475569';

  let cellId = 2;
  const cells: string[] = [];
  const cardCoordinates: Record<string, { x: number; y: number; w: number; h: number }> = {};

  const addCell = (cellXml: string): string => {
    cells.push(cellXml);
    return cellXml;
  };

  // Safe strings
  const graphTitle = graph?.title || 'System Architecture';
  const graphSubtitle = graph?.subtitle || 'Synthesized First-Principles Architecture';
  const abstractionLabel = (graph?.abstractionLevel || 'logical').toUpperCase();

  // 1. Header Banner
  const headerX = 40;
  const headerY = 30;
  const headerW = 1520;
  const headerH = 65;

  const headerHtml = `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;box-sizing:border-box;padding:0 24px;border-radius:12px;background:${isDark ? 'linear-gradient(90deg, #1E3A8A 0%, #0F172A 100%)' : 'linear-gradient(90deg, #1E40AF 0%, #2563EB 100%)'};color:#FFFFFF;font-family:system-ui,-apple-system,sans-serif;border:1px solid ${isDark ? '#1E3A8A' : '#93C5FD'};">
    <div style="display:flex;align-items:center;gap:16px;">
      <div style="width:42px;height:42px;border-radius:10px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:24px;">🏛️</div>
      <div>
        <div style="font-size:19px;font-weight:800;letter-spacing:-0.02em;text-transform:uppercase;">${escapeXml(graphTitle)}</div>
        <div style="font-size:11.5px;opacity:0.88;font-weight:400;margin-top:2px;">${escapeXml(graphSubtitle)}</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="background:rgba(255,255,255,0.18);padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.25);">
        ${abstractionLabel} VIEW
      </div>
      <div style="background:#FFFFFF;color:#1E40AF;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:0.03em;">
        STUDIO 3 GENERATIVE
      </div>
    </div>
  </div>`;

  addCell(`
    <mxCell id="${cellId++}" value="${escapeXml(headerHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;rounded=1;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="${headerX}" y="${headerY}" width="${headerW}" height="${headerH}" as="geometry"/>
    </mxCell>
  `);

  // 2. Bands Layout
  const bands = graph?.bands || [];
  const numBands = Math.max(1, bands.length);
  let bandY = 110;
  const totalBandsHeight = 780;
  const calculatedBandH = Math.floor((totalBandsHeight - 20 * (numBands - 1)) / numBands);

  bands.forEach((band, bandIndex) => {
    const bandH = calculatedBandH;
    const bandX = 40;
    const bandW = 1520;

    // Band Container Outer Box
    addCell(`
      <mxCell id="${cellId++}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${containerBg};strokeColor=${containerBorder};strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
        <mxGeometry x="${bandX}" y="${bandY}" width="${bandW}" height="${bandH}" as="geometry"/>
      </mxCell>
    `);

    // A. Columns Band
    if (band.columns && band.columns.length > 0) {
      const numCols = band.columns.length;
      const innerPadding = 16;
      const colGap = 16;

      // Wrap columns into 2 rows if > 4 columns
      const wrapRows = numCols > 4;
      const colsPerRow = wrapRows ? Math.ceil(numCols / 2) : numCols;
      const rowGap = 14;

      const colW = (bandW - innerPadding * 2 - colGap * (colsPerRow - 1)) / colsPerRow;
      const colH = wrapRows
        ? Math.floor((bandH - innerPadding * 2 - rowGap) / 2)
        : (bandH - innerPadding * 2);

      band.columns.forEach((col, colIndex) => {
        const rowIdx = wrapRows ? Math.floor(colIndex / colsPerRow) : 0;
        const colIdxInRow = wrapRows ? (colIndex % colsPerRow) : colIndex;

        const colX = bandX + innerPadding + colIdxInRow * (colW + colGap);
        const colY = bandY + innerPadding + rowIdx * (colH + rowGap);
        const colorKey = String(col.headerColor || 'blue').trim().toLowerCase();
        const colColor = COLOR_MAP[colorKey] || COLOR_MAP.blue;

        // Column Box
        addCell(`
          <mxCell id="${cellId++}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#0C1322' : '#FFFFFF'};strokeColor=${colColor.border};strokeWidth=1.2;" vertex="1" parent="1">
            <mxGeometry x="${colX}" y="${colY}" width="${colW}" height="${colH}" as="geometry"/>
          </mxCell>
        `);

        // Column Header Banner
        const colHeaderHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:${colColor.bg};color:${colColor.text};font-weight:800;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;border-top-left-radius:6px;border-top-right-radius:6px;box-sizing:border-box;padding:0 12px;text-align:center;word-break:break-word;">
          ${escapeXml(col.header || 'TIER')}
        </div>`;

        const headerH = colH < 220 ? 30 : 38;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(colHeaderHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;rounded=0;" vertex="1" parent="1">
            <mxGeometry x="${colX}" y="${colY}" width="${colW}" height="${headerH}" as="geometry"/>
          </mxCell>
        `);

        // Column Cards
        const cards = col.cards || [];
        const availableCardSpace = colH - headerH - 16 - (col.footerNote ? 24 : 0);
        const numCards = Math.max(1, cards.length);
        const cardGap = 12;

        // Proportional card height (fill column evenly without awkward voids)
        const computedH = (availableCardSpace - cardGap * (numCards - 1)) / numCards;
        const maxCardH = numCards === 1 ? Math.min(220, availableCardSpace) : (colH < 220 ? 95 : 280);
        const cardH = Math.min(maxCardH, Math.max(90, computedH));

        // Center card vertically if space is available
        const totalCardsH = numCards * cardH + (numCards - 1) * cardGap;
        let cardY = colY + headerH + 8 + Math.max(0, Math.floor((availableCardSpace - totalCardsH) / 2));

        cards.forEach(card => {
          const cardX = colX + 10;
          const currentCardW = colW - 20;

          cardCoordinates[card.id] = { x: cardX, y: cardY, w: currentCardW, h: cardH };

          let cardContentHtml = `<div style="padding:12px 14px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-start;word-break:break-word;overflow-wrap:break-word;overflow:hidden;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-shrink:0;">
              <div style="width:28px;height:28px;border-radius:7px;background:${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                ${card.iconKey ? renderGcpIconHtml(card.iconKey, 20) : '<div>📦</div>'}
              </div>
              <div style="font-size:12.5px;font-weight:800;color:${textPrimary};line-height:1.2;flex-grow:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeXml(card.title || 'Component')}</div>
              ${card.badge ? `<span style="margin-left:auto;background:#2563EB;color:#FFF;font-size:9px;padding:2px 7px;border-radius:10px;font-weight:800;letter-spacing:0.02em;flex-shrink:0;">${escapeXml(card.badge)}</span>` : ''}
            </div>`;

          if (card.codeSnippet) {
            cardContentHtml += `<pre style="margin:4px 0 0 0;background:#050914;color:#38BDF8;padding:6px 8px;border-radius:5px;font-size:9.5px;font-family:monospace;line-height:1.35;white-space:pre-wrap;word-break:break-all;overflow-wrap:anywhere;max-width:100%;box-sizing:border-box;overflow:hidden;flex-grow:1;border:1px solid #1E293B;">${escapeXml(card.codeSnippet)}</pre>`;
          } else if (card.items && card.items.length > 0) {
            cardContentHtml += `<ul style="margin:4px 0 0 0;padding-left:16px;color:${isDark ? '#CBD5E1' : '#334155'};font-size:11px;line-height:1.45;flex-grow:1;overflow:hidden;">
              ${card.items.slice(0, 4).map(it => `<li style="margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;">${escapeXml(it)}</li>`).join('')}
            </ul>`;
          }

          cardContentHtml += `</div>`;

          const borderStyle = card.highlight ? 'strokeColor=#3B82F6;strokeWidth=1.5;' : `strokeColor=${cardBorder};strokeWidth=1;`;

          addCell(`
            <mxCell id="${cellId++}" value="${escapeXml(cardContentHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};${borderStyle}shadow=0;" vertex="1" parent="1">
              <mxGeometry x="${cardX}" y="${cardY}" width="${currentCardW}" height="${cardH}" as="geometry"/>
            </mxCell>
          `);

          cardY += cardH + cardGap;
        });

        // Column Footer Note
        if (col.footerNote) {
          const footerHtml = `<div style="font-size:9px;color:${textSecondary};font-style:italic;text-align:center;padding:0 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${escapeXml(col.footerNote)}
          </div>`;
          addCell(`
            <mxCell id="${cellId++}" value="${escapeXml(footerHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;" vertex="1" parent="1">
              <mxGeometry x="${colX + 6}" y="${colY + colH - 22}" width="${colW - 12}" height="18" as="geometry"/>
            </mxCell>
          `);
        }
      });
    }
    // B. Horizontal Pipeline Stages Band
    else if (band.pipelineStages && band.pipelineStages.length > 0) {
      const numStages = band.pipelineStages.length;
      const stageGap = 16;
      const innerPadding = 16;
      const stageW = (bandW - innerPadding * 2 - stageGap * (numStages - 1)) / numStages;

      band.pipelineStages.forEach((stage, sIndex) => {
        const stageX = bandX + innerPadding + sIndex * (stageW + stageGap);
        const stageY = bandY + innerPadding;
        const stageH = bandH - innerPadding * 2;
        const colorKey = String(stage.color || 'blue').trim().toLowerCase();
        const stageColor = COLOR_MAP[colorKey] || COLOR_MAP.blue;

        // Stage Box
        addCell(`
          <mxCell id="${cellId++}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#0C1322' : '#FFFFFF'};strokeColor=${stageColor.border};strokeWidth=1.2;" vertex="1" parent="1">
            <mxGeometry x="${stageX}" y="${stageY}" width="${stageW}" height="${stageH}" as="geometry"/>
          </mxCell>
        `);

        // Stage Header with 20 Step Badges ❶..⓴
        const stepIcons = ['❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿', '⓫', '⓬', '⓭', '⓮', '⓯', '⓰', '⓱', '⓲', '⓳', '⓴'];
        const stepBadge = stepIcons[(stage.stepNumber || 1) - 1] || `${stage.stepNumber || 1}.`;

        const stageHeaderHtml = `<div style="display:flex;align-items:center;gap:6px;padding:0 12px;width:100%;height:100%;background:${stageColor.bg};color:${stageColor.text};font-weight:800;font-size:11.5px;letter-spacing:0.03em;border-top-left-radius:6px;border-top-right-radius:6px;box-sizing:border-box;">
          <span style="font-size:14px;">${stepBadge}</span>
          <div style="line-height:1.1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <div>${escapeXml(stage.title || 'Stage')}</div>
            ${stage.subtitle ? `<div style="font-size:8.5px;font-weight:400;opacity:0.9;">${escapeXml(stage.subtitle)}</div>` : ''}
          </div>
        </div>`;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(stageHeaderHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;rounded=0;" vertex="1" parent="1">
            <mxGeometry x="${stageX}" y="${stageY}" width="${stageW}" height="${stageH < 180 ? 28 : 34}" as="geometry"/>
          </mxCell>
        `);

        // Stage Nodes
        const nodes = stage.nodes || [];
        const headerOffset = stageH < 180 ? 32 : 42;
        let nodeY = stageY + headerOffset;
        const availableNodeSpace = stageH - headerOffset - 8;
        const numNodes = Math.max(1, nodes.length);
        const nodeGap = 6;
        const nodeH = Math.max(38, (availableNodeSpace - nodeGap * (numNodes - 1)) / numNodes);

        nodes.forEach(node => {
          const nodeX = stageX + 10;
          const currentStageNodeW = stageW - 20;

          cardCoordinates[node.id] = { x: nodeX, y: nodeY, w: currentStageNodeW, h: nodeH };

          const nodeHtml = `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;height:100%;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;overflow:hidden;">
            ${node.iconKey ? renderGcpIconHtml(node.iconKey, 20) : '<div>⚙️</div>'}
            <div style="line-height:1.2;overflow:hidden;flex-grow:1;">
              <div style="font-size:11px;font-weight:700;color:${textPrimary};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeXml(node.name || 'Service')}</div>
              ${node.role ? `<div style="font-size:9px;color:${textSecondary};margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeXml(node.role)}</div>` : ''}
            </div>
          </div>`;

          addCell(`
            <mxCell id="${cellId++}" value="${escapeXml(nodeHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;" vertex="1" parent="1">
              <mxGeometry x="${nodeX}" y="${nodeY}" width="${currentStageNodeW}" height="${nodeH}" as="geometry"/>
            </mxCell>
          `);

          nodeY += nodeH + nodeGap;
        });
      });
    }
    // C. Matrix Evaluation Band
    else if (band.matrixRows && band.matrixRows.length > 0) {
      const headers = band.matrixHeaders || ['DIMENSION / TOOL', 'CAPABILITY', 'INTEGRATION', 'STANDARD'];
      const numCols = Math.max(1, headers.length);
      const innerPadding = 16;
      const tableW = bandW - innerPadding * 2;
      const colW = tableW / numCols;
      const headerRowH = 32;
      const rows = band.matrixRows;
      const rowH = Math.max(40, (bandH - innerPadding * 2 - headerRowH) / Math.max(1, rows.length));

      // Table Header Row
      headers.forEach((h, hIdx) => {
        const cellX = bandX + innerPadding + hIdx * colW;
        const cellY = bandY + innerPadding;
        const cellHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#1E3A8A;color:#FFFFFF;font-weight:800;font-size:10.5px;letter-spacing:0.04em;text-transform:uppercase;border:1px solid #2563EB;box-sizing:border-box;">
          ${escapeXml(h)}
        </div>`;
        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(cellHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;" vertex="1" parent="1">
            <mxGeometry x="${cellX}" y="${cellY}" width="${colW}" height="${headerRowH}" as="geometry"/>
          </mxCell>
        `);
      });

      // Table Data Rows
      rows.forEach((row, rIdx) => {
        const rowY = bandY + innerPadding + headerRowH + rIdx * rowH;
        cardCoordinates[`matrix_row_${bandIndex}_${rIdx}`] = { x: bandX + innerPadding, y: rowY, w: tableW, h: rowH };

        // Col 0: Dimension Name
        const dimCellHtml = `<div style="display:flex;align-items:center;padding:0 10px;width:100%;height:100%;background:${isDark ? '#0C1322' : '#F8FAFC'};color:${textPrimary};font-weight:700;font-size:10.5px;border:1px solid ${cardBorder};box-sizing:border-box;">
          ${escapeXml(row.dimension || 'Dimension')}
        </div>`;
        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(dimCellHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;" vertex="1" parent="1">
            <mxGeometry x="${bandX + innerPadding}" y="${rowY}" width="${colW}" height="${rowH}" as="geometry"/>
          </mxCell>
        `);

        // Other Cols
        (row.cols || []).forEach((c, cIdx) => {
          const colX = bandX + innerPadding + (cIdx + 1) * colW;
          const colCellHtml = `<div style="display:flex;flex-direction:column;justify-content:center;padding:0 10px;width:100%;height:100%;background:${isDark ? '#131D31' : '#FFFFFF'};color:${textSecondary};font-size:10px;border:1px solid ${cardBorder};box-sizing:border-box;">
            <div style="font-weight:700;color:${textPrimary};">${escapeXml(c?.toolName || '')}</div>
            <div style="margin-top:1px;">${escapeXml(c?.value || '')}</div>
          </div>`;
          addCell(`
            <mxCell id="${cellId++}" value="${escapeXml(colCellHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;" vertex="1" parent="1">
              <mxGeometry x="${colX}" y="${rowY}" width="${colW}" height="${rowH}" as="geometry"/>
            </mxCell>
          `);
        });
      });
    }

    bandY += bandH + 20;
  });

  // 3. Connectors & Edges (With High-Contrast Labeled Pill Badges)
  if (Array.isArray(graph?.connections)) {
    graph.connections.forEach(conn => {
      const fromGeom = cardCoordinates[conn.fromId];
      const toGeom = cardCoordinates[conn.toId];
      if (fromGeom && toGeom) {
        let strokeColor = '#3B82F6';
        let strokeWidth = '1.8';
        let dashed = '0';
        let dashPattern = '';

        if (conn.style === 'dashed_orange') {
          strokeColor = '#F97316';
          strokeWidth = '1.8';
          dashed = '1';
          dashPattern = 'dashPattern=6 4;';
        } else if (conn.style === 'dashed_purple') {
          strokeColor = '#8B5CF6';
          strokeWidth = '1.8';
          dashed = '1';
          dashPattern = 'dashPattern=4 4;';
        } else if (conn.style === 'green_protocol') {
          strokeColor = '#10B981';
          strokeWidth = '2';
          dashed = '0';
        } else if (conn.style === 'feedback_teal') {
          strokeColor = '#14B8A6';
          strokeWidth = '1.8';
          dashed = '1';
          dashPattern = 'dashPattern=5 5;';
        }

        const labelPillStyle = 'labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontSize=9.5;fontStyle=1;fontColor=#0F172A;padding=3.5;';
        const edgeStyle = `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${strokeColor};strokeWidth=${strokeWidth};dashed=${dashed};${dashPattern}${labelPillStyle}`;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(conn.label || '')}" style="${edgeStyle}" edge="1" parent="1">
            <mxGeometry relative="1" as="geometry">
              <mxPoint x="${fromGeom.x + fromGeom.w}" y="${fromGeom.y + fromGeom.h / 2}" as="sourcePoint"/>
              <mxPoint x="${toGeom.x}" y="${toGeom.y + toGeom.h / 2}" as="targetPoint"/>
            </mxGeometry>
          </mxCell>
        `);
      }
    });
  }

  // 4. Footer Bar
  const footerX = 40;
  const footerY = 910;
  const footerW = 1520;
  const footerH = 45;

  const rawTenets = Array.isArray(graph?.tenets)
    ? graph.tenets.filter(t => typeof t === 'string' && t.trim().length > 0)
    : [];

  const defaultTenets = [
    'MATHEMATICAL FORMULATION',
    graph?.abstractionLevel === 'technical' ? 'ZERO TRUST & RESILIENCE' : 'HIGH AVAILABILITY & ISOLATION',
    'CONTINUOUS OBSERVABILITY'
  ];

  const tenetsString = rawTenets.length > 0
    ? rawTenets.join('  |  ')
    : defaultTenets.join('  |  ');

  const footerHtml = `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;box-sizing:border-box;padding:0 24px;border-radius:8px;background:${isDark ? '#0F172A' : '#F1F5F9'};border:1px solid ${containerBorder};color:${textSecondary};font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span>🧬</span>
      <span>${escapeXml(tenetsString)}</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;color:#3B82F6;font-weight:800;">
      <span>Google Cloud Architecture Engine</span>
    </div>
  </div>`;

  addCell(`
    <mxCell id="${cellId++}" value="${escapeXml(footerHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;rounded=1;" vertex="1" parent="1">
      <mxGeometry x="${footerX}" y="${footerY}" width="${footerW}" height="${footerH}" as="geometry"/>
    </mxCell>
  `);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="studio3_diagram" name="${escapeXml(graphTitle)}">
    <mxGraphModel dx="${canvasWidth}" dy="${canvasHeight}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${canvasWidth}" pageHeight="${canvasHeight}" background="${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
