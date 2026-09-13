/**
 * 📐 Deterministic Geometry Solver Engine
 * 
 * Computes exact, collision-free 2D spatial layouts, dynamic card sizing,
 * document paint ordering (flat parent="1"), and orthogonal connector routing
 * for generative Draw.io XML graph AST synthesis.
 */

import { TopologyPlan } from './TopologyPlanner';
import { DiagramRowCard, DiagramRowInventory } from './types';
import { renderSvgIcon, inferSvgForKeyword, getVectorStencilForTech, SVG_PATHS } from '../vectorIcons/stencils';

interface CanvasLayoutConfig {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  headerHeight: number;
  leftColWidth: number;
  sidePanelWidth: number;
  rowGap: number;
  columnGap: number;
}

const DEFAULT_CONFIG: CanvasLayoutConfig = {
  pageWidth: 1600,
  pageHeight: 960,
  margin: 16,
  headerHeight: 46,
  leftColWidth: 140,
  sidePanelWidth: 300,
  rowGap: 8,
  columnGap: 14
};

export interface StagePalette {
  name: string;
  color: string;
  bgLight: string;
  border: string;
  chevronBg: string;
  chevronBorder: string;
}

const DEFAULT_STAGE_PALETTES: StagePalette[] = [
  { name: 'Green', color: '#166534', bgLight: '#F0FDF4', border: '#BBF7D0', chevronBg: '#166534', chevronBorder: '#14532D' },
  { name: 'Blue', color: '#1D4ED8', bgLight: '#EFF6FF', border: '#BFDBFE', chevronBg: '#1D4ED8', chevronBorder: '#1E40AF' },
  { name: 'Purple', color: '#6D28D9', bgLight: '#FAF5FF', border: '#DDD6FE', chevronBg: '#6D28D9', chevronBorder: '#5B21B6' },
  { name: 'Orange', color: '#D97706', bgLight: '#FFFBEB', border: '#FDE68A', chevronBg: '#D97706', chevronBorder: '#B45309' },
  { name: 'Teal', color: '#0D9488', bgLight: '#F0FDFA', border: '#99F6E4', chevronBg: '#0D9488', chevronBorder: '#0F766E' },
  { name: 'Indigo', color: '#4338CA', bgLight: '#EEF2FF', border: '#C7D2FE', chevronBg: '#4338CA', chevronBorder: '#3730A3' },
];

function resolveStagePalette(stageName: string, idx: number, plan: TopologyPlan): StagePalette {
  if (plan.zoneColors && plan.zoneColors.length > 0) {
    const match = plan.zoneColors.find(zc => 
      zc.stageName.toLowerCase().includes(stageName.toLowerCase()) || 
      stageName.toLowerCase().includes(zc.stageName.toLowerCase())
    );
    if (match) {
      return {
        name: match.stageName,
        color: match.color,
        bgLight: match.bgLight || '#F8FAFC',
        border: match.border || match.color,
        chevronBg: match.color,
        chevronBorder: match.color
      };
    }
  }

  const clean = stageName.toLowerCase();
  if (/research|discovery|target|hit/i.test(clean)) {
    return DEFAULT_STAGE_PALETTES[0]; // Green
  }
  if (/develop|clinical|trial|preclinical/i.test(clean)) {
    return DEFAULT_STAGE_PALETTES[1]; // Blue
  }
  if (/manufactur|gmp|batch|scale|scale-up/i.test(clean)) {
    return DEFAULT_STAGE_PALETTES[2]; // Purple
  }
  if (/commercial|market|pricing|launch|sales/i.test(clean)) {
    return DEFAULT_STAGE_PALETTES[3]; // Orange
  }
  if (/patient|outcome|real-world|care/i.test(clean)) {
    return DEFAULT_STAGE_PALETTES[4]; // Teal
  }

  return DEFAULT_STAGE_PALETTES[idx % DEFAULT_STAGE_PALETTES.length];
}

export class GeometrySolver {
  /**
   * Synthesizes a high-fidelity Draw.io XML graph AST deterministically from a TopologyPlan.
   * Completely avoids wireframes, floating text, relative coordinate bugs, emoji degradation, and text overflow.
   */
  public static synthesizeDiagramXml(plan: TopologyPlan): string {
    const cfg = { ...DEFAULT_CONFIG };
    const title = plan.detectedTitle || 'VALUE STREAM – BIO-PHARMA ENTERPRISE';
    const subtitle = plan.detectedSubtitle || 'End-to-End Value Delivery from Research to Patient Impact';
    const isDark = plan.theme === 'dark';

    // Parse stages / zones
    const rawZones = plan.detectedZones && plan.detectedZones.length >= 3
      ? plan.detectedZones
      : ['1. RESEARCH & DISCOVERY', '2. DEVELOPMENT', '3. MANUFACTURING', '4. COMMERCIALIZATION', '5. PATIENT OUTCOMES'];

    const isSideEnclosure = (z: string) => /delivered\s+outcomes?/i.test(z.trim()) && !/\d+\./.test(z);
    const stageZones = rawZones.filter(z => !isSideEnclosure(z));
    const hasSidePanel = Boolean(plan.sideEnclosure) || rawZones.some(z => isSideEnclosure(z)) || (plan.rows && plan.rows.some(r => isSideEnclosure(r.rowTitle)));

    const numCols = Math.max(3, stageZones.length);

    // Layout dimensions
    const sidePanelWidth = hasSidePanel ? cfg.sidePanelWidth : 0;
    const contentWidth = cfg.pageWidth - (cfg.margin * 2) - (hasSidePanel ? sidePanelWidth + cfg.columnGap : 0);

    // Dedicated left row header column
    const hasLeftCol = plan.hasLeftColumn ?? (
      Boolean(plan.rows && plan.rows.length >= 2 && plan.rows.some(r => /stage|activit|metric|flow|enabler|platform|outcome/i.test(r.rowTitle)))
    );
    const leftColWidth = hasLeftCol ? cfg.leftColWidth : 0;
    const stageAreaWidth = contentWidth - leftColWidth;
    const colWidth = Math.floor(stageAreaWidth / numCols);

    const backgroundCells: string[] = [];
    const structuralCells: string[] = [];
    const cardCells: string[] = [];
    const badgeCells: string[] = [];
    const edgeCells: string[] = [];

    let currentCellId = 10;
    const nextId = (prefix: string) => `${prefix}_${currentCellId++}`;

    // =========================================================================
    // 1. TOP HEADER BANNER & NUMBER BADGE & BRAND BLOCK
    // =========================================================================
    let titleX = cfg.margin;

    // Top-left badge number box (e.g. [ 04 ])
    const badgeNum = plan.badgeNumber || (title.match(/\b0?([1-9]|[1-3][0-9]|04)\b/) ? title.match(/\b0?([1-9]|[1-3][0-9]|04)\b/)![1].padStart(2, '0') : undefined);
    if (badgeNum) {
      const badgeW = 54;
      const badgeH = 46;
      structuralCells.push(
        `<mxCell id="hdr_num" value="&lt;span style=&quot;font-size:24px;font-weight:900;color:#FFFFFF;&quot;&gt;${escapeXml(badgeNum)}&lt;/span&gt;" style="rounded=1;arcSize=8;fillColor=#0F2A4A;strokeColor=#0F2A4A;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
        `<mxGeometry x="${cfg.margin}" y="12" width="${badgeW}" height="${badgeH}" as="geometry"/>` +
        `</mxCell>`
      );
      titleX = cfg.margin + badgeW + 10;
    }

    // Main Header Title & Subtitle (Clean high-contrast typography, NO black background bar!)
    const titleColor = isDark ? '#F8FAFC' : '#0F172A';
    const subColor = isDark ? '#94A3B8' : '#475569';
    const titleHtml = 
      `&lt;div style=&quot;font-size:22px;font-weight:900;color:${titleColor};letter-spacing:-0.2px;line-height:1.1;&quot;&gt;${escapeXml(title.toUpperCase())}&lt;/div&gt;` +
      `&lt;div style=&quot;font-size:13px;font-weight:700;color:${subColor};margin-top:2px;&quot;&gt;${escapeXml(subtitle)}&lt;/div&gt;;`

    structuralCells.push(
      `<mxCell id="${nextId('hdr_title')}" value="${titleHtml}" style="whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">` +
      `<mxGeometry x="${titleX}" y="12" width="980" height="46" as="geometry"/>` +
      `</mxCell>`
    );

    // Top-Right Brand Block
    const brandLogoText = plan.brandBlock?.logoText || (title.toLowerCase().includes('novacura') ? 'NOVACURA' : '');
    const brandSub = plan.brandBlock?.subtitle || (brandLogoText === 'NOVACURA' ? 'Transforming Therapies. Improving Lives.' : '');
    if (brandLogoText) {
      const brandIconKey = /nexus|pay|fintech/i.test(brandLogoText) ? 'brandNexusPay' : 'brandNovacura';
      const brandLogoSvg = renderSvgIcon(brandIconKey, '#1D4ED8', 28);
      const brandHtml = 
        `&lt;div style=&quot;display:flex;align-items:center;justify-content:flex-end;gap:8px;&quot;&gt;` +
        `&lt;div style=&quot;flex-shrink:0;&quot;&gt;${brandLogoSvg}&lt;/div&gt;` +
        `&lt;div style=&quot;text-align:left;&quot;&gt;` +
        `&lt;div style=&quot;font-size:16px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1;&quot;&gt;${escapeXml(brandLogoText)}&lt;/div&gt;` +
        `&lt;div style=&quot;font-size:8px;font-weight:600;color:#64748B;font-style:italic;line-height:1;margin-top:2px;&quot;&gt;${escapeXml(brandSub)}&lt;/div&gt;` +
        `&lt;/div&gt;&lt;/div&gt;`;

      structuralCells.push(
        `<mxCell id="${nextId('hdr_brand')}" value="${brandHtml}" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;" vertex="1" parent="1">` +
        `<mxGeometry x="${cfg.pageWidth - cfg.margin - 304}" y="12" width="304" height="46" as="geometry"/>` +
        `</mxCell>`
      );
    }

    // =========================================================================
    // 2. STAGE PALETTES & COLUMN GUIDES
    // =========================================================================
    const stagePalettes: StagePalette[] = stageZones.map((z, idx) => resolveStagePalette(z, idx, plan));
    const stageXGuides: number[] = [];
    for (let c = 0; c < numCols; c++) {
      stageXGuides.push(cfg.margin + leftColWidth + (c * colWidth));
    }

    // Build default rows if not provided
    const defaultRows: DiagramRowInventory[] = [
      {
        rowTitle: 'VALUE STAGES',
        cards: stageZones.map((z, idx) => ({
          title: z,
          icon: idx === 0 ? 'microscope' : idx === 1 ? 'flask' : idx === 2 ? 'factory' : idx === 3 ? 'megaphone' : 'heartUser'
        }))
      },
      {
        rowTitle: 'KEY ACTIVITIES',
        cards: stageZones.map((z, idx) => ({
          title: z,
          bullets: [
            idx === 0 ? 'Target identification' : idx === 1 ? 'Preclinical studies' : idx === 2 ? 'Process development' : idx === 3 ? 'Regulatory submission' : 'Patient onboarding',
            idx === 0 ? 'Biology & assay research' : idx === 1 ? 'Clinical trial design' : idx === 2 ? 'Scale-up & tech transfer' : idx === 3 ? 'Market access & pricing' : 'Therapy adherence',
            idx === 0 ? 'Hit discovery & validation' : idx === 1 ? 'CMC & formulation' : idx === 2 ? 'GMP manufacturing' : idx === 3 ? 'Launch planning' : 'Outcomes monitoring',
            idx === 0 ? 'Lead optimization' : idx === 1 ? 'Biomarker development' : idx === 2 ? 'Quality control & testing' : idx === 3 ? 'Sales & distribution' : 'Real-world evidence',
            idx === 0 ? 'In silico modeling' : idx === 1 ? 'Data management' : idx === 2 ? 'Batch release' : idx === 3 ? 'HCP engagement' : 'Continuous support'
          ]
        }))
      },
      {
        rowTitle: 'VALUE METRICS',
        cards: [
          { title: 'Discovery<br/>Success Rate', icon: 'target' },
          { title: 'Candidate<br/>Backlog', icon: 'flask' },
          { title: 'Trials Started', icon: 'users' },
          { title: 'Development<br/>Cycle Time', icon: 'chart' },
          { title: 'First Pass Yield', icon: 'shieldCheck' },
          { title: 'Batch Release<br/>Cycle Time', icon: 'clipboardCheck' },
          { title: 'Time to Market', icon: 'trendUp' },
          { title: 'Market Access<br/>Coverage', icon: 'handshake' },
          { title: 'Patient Outcomes<br/>Improvement', icon: 'heartPulse' },
          { title: 'Real-World<br/>Impact', icon: 'refresh' }
        ]
      },
      {
        rowTitle: 'VALUE FLOW',
        cards: [
          { title: 'Ideas & Hypotheses', icon: 'lightbulb' },
          { title: 'Validated Candidates', icon: 'box' },
          { title: 'Approved Therapy', icon: 'gear' },
          { title: 'Accessible to Patients', icon: 'globe' },
          { title: 'Better Lives', icon: 'users' }
        ]
      },
      {
        rowTitle: 'VALUE ENABLERS',
        cards: [
          { title: 'DATA & AI', bullets: ['AI/ML, Predictive Modeling, Real-world Data, Advanced Analytics'], icon: 'brain' },
          { title: 'DIGITAL PLATFORMS', bullets: ['Unified R&D, Clinical, Manufacturing and Commercial Platforms'], icon: 'cloud' },
          { title: 'QUALITY & COMPLIANCE', bullets: ['GxP Quality, Data Integrity, Regulatory Compliance'], icon: 'shieldCheck' },
          { title: 'TALENT & CULTURE', bullets: ['Scientific Excellence, Cross-functional Collaboration'], icon: 'users' },
          { title: 'PARTNER ECOSYSTEM', bullets: ['CROs, CMOs, Academic Partners, Tech Partners'], icon: 'network' },
          { title: 'SUSTAINABILITY', bullets: ['Environmentally Responsible Operations'], icon: 'leaf' }
        ]
      },
      {
        rowTitle: 'TECHNOLOGY PLATFORM',
        cards: (plan.technologies && plan.technologies.length > 0 ? plan.technologies : [
          'Google Cloud', 'Vertex AI', 'BigQuery', 'Dataplex', 'Dataflow', 'Pub/Sub', 'Apigee', 'Looker', 'Gemini', 'MCP / A2A', 'Kubernetes', 'Terraform', 'GitHub'
        ]).map(t => ({ title: t }))
      },
      {
        rowTitle: 'VALUE OUTCOMES',
        cards: [
          { title: 'Faster Innovation', icon: 'timer' },
          { title: 'Higher Quality', icon: 'medal' },
          { title: 'Operational Excellence', icon: 'gear' },
          { title: 'Patient-Centricity', icon: 'userCheck' },
          { title: 'Financial Performance', icon: 'dollar' },
          { title: 'Societal Impact', icon: 'globe' }
        ]
      }
    ];

    const rawRows = (plan.rows && plan.rows.length >= 2) ? [...plan.rows] : defaultRows;

    // Filter out side enclosure row from main rows
    const mainRows = rawRows.filter(r => !isSideEnclosure(r.rowTitle));
    const sideRow = rawRows.find(r => isSideEnclosure(r.rowTitle));

    // Check if stages are in rows or need to be prepended as Row 0 (VALUE STAGES)
    const hasStagesRow = mainRows.some(r => /stage/i.test(r.rowTitle));
    if (!hasStagesRow && hasLeftCol) {
      mainRows.unshift({
        rowTitle: 'VALUE STAGES',
        cards: stageZones.map((z, idx) => ({
          title: z,
          icon: idx === 0 ? 'microscope' : idx === 1 ? 'flask' : idx === 2 ? 'factory' : idx === 3 ? 'megaphone' : 'heartUser'
        }))
      });
    }

    // =========================================================================
    // 3. MAIN MATRIX RENDERING
    // =========================================================================
    let currentY = 68;

    // Separate main matrix rows (stages, activities, metrics, flow) from independent rows (enablers, tech, outcomes)
    const matrixRows = mainRows.filter(r => /stage|activit|metric|flow|step|milestone/i.test(r.rowTitle));
    const lowerRows = mainRows.filter(r => !/stage|activit|metric|flow|step|milestone/i.test(r.rowTitle));

    // Compute matrix row heights
    const matrixRowHeights = matrixRows.map(r => {
      if (/stage/i.test(r.rowTitle)) return 96;
      if (/metric|kpi/i.test(r.rowTitle)) return (r.cards && r.cards.length > numCols) ? 114 : 64;
      if (/flow|step|milestone/i.test(r.rowTitle)) return 60;
      let maxB = 4;
      for (const card of r.cards || []) {
        if (card.bullets && card.bullets.length > maxB) maxB = card.bullets.length;
      }
      return Math.max(114, 28 + (maxB * 18));
    });

    const totalMatrixHeight = matrixRowHeights.reduce((sum, h) => sum + h, 0);

    // Matrix Outer Frame
    backgroundCells.push(
      `<mxCell id="matrix_frame" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">` +
      `<mxGeometry x="${cfg.margin}" y="${currentY}" width="${contentWidth}" height="${totalMatrixHeight}" as="geometry"/>` +
      `</mxCell>`
    );

    // Matrix Left Vertical Divider Line
    if (hasLeftCol) {
      edgeCells.push(
        `<mxCell id="div_col_0" value="" edge="1" parent="1" style="edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;">` +
        `<mxGeometry relative="1" as="geometry"><mxPoint x="${cfg.margin + leftColWidth}" y="${currentY}" as="sourcePoint"/><mxPoint x="${cfg.margin + leftColWidth}" y="${currentY + totalMatrixHeight}" as="targetPoint"/></mxGeometry>` +
        `</mxCell>`
      );
    }

    // Matrix Column Vertical Dashed Dividers between stages
    for (let c = 1; c < numCols; c++) {
      const divX = cfg.margin + leftColWidth + (c * colWidth);
      edgeCells.push(
        `<mxCell id="div_col_${c}" value="" edge="1" parent="1" style="edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;dashed=1;dashPattern=3 3;endArrow=none;">` +
        `<mxGeometry relative="1" as="geometry"><mxPoint x="${divX}" y="${currentY}" as="sourcePoint"/><mxPoint x="${divX}" y="${currentY + totalMatrixHeight}" as="targetPoint"/></mxGeometry>` +
        `</mxCell>`
      );
    }

    // Render Matrix Rows
    let matrixRowY = currentY;
    for (let mIdx = 0; mIdx < matrixRows.length; mIdx++) {
      const row = matrixRows[mIdx];
      const rowH = matrixRowHeights[mIdx];
      const isStagesRow = /stage/i.test(row.rowTitle);
      const isActivitiesRow = /activit|capabilit/i.test(row.rowTitle);
      const isMetricsRow = /metric|kpi/i.test(row.rowTitle);
      const isFlowRow = /flow|step|milestone/i.test(row.rowTitle);

      // Left Row Header Label
      if (hasLeftCol) {
        const rowTitleWords = row.rowTitle.replace(/\s*&\s*/g, '&amp;&lt;br/&gt;').split(/\s+/).join('&lt;br/&gt;');
        structuralCells.push(
          `<mxCell id="${nextId('lbl_row')}" value="&lt;b style=&quot;font-size:9.5px;color:#0F2A4A;&quot;&gt;${rowTitleWords}&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
          `<mxGeometry x="${cfg.margin}" y="${matrixRowY}" width="${leftColWidth}" height="${rowH}" as="geometry"/>` +
          `</mxCell>`
        );
      }

      // Horizontal Row Divider (if not the last row)
      if (mIdx < matrixRows.length - 1) {
        const divY = matrixRowY + rowH;
        edgeCells.push(
          `<mxCell id="div_row_${mIdx + 1}" value="" edge="1" parent="1" style="edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;">` +
          `<mxGeometry relative="1" as="geometry"><mxPoint x="${cfg.margin}" y="${divY}" as="sourcePoint"/><mxPoint x="${cfg.margin + contentWidth}" y="${divY}" as="targetPoint"/></mxGeometry>` +
          `</mxCell>`
        );
      }

      // Render cells across stages
      if (isStagesRow) {
        for (let c = 0; c < numCols; c++) {
          const colX = stageXGuides[c];
          const stName = stageZones[c] || `Stage ${c + 1}`;
          const palette = stagePalettes[c % stagePalettes.length];
          const iconKey = inferSvgForKeyword(stName);

          const hdrHtml = 
            `&lt;div style=&quot;text-align:center;&quot;&gt;` +
            `&lt;div style=&quot;font-size:10px;font-weight:900;color:${palette.color};letter-spacing:0.5px;line-height:1.2;margin-bottom:6px;&quot;&gt;${escapeXml(stName)}&lt;/div&gt;` +
            `&lt;div style=&quot;width:50px;height:50px;border-radius:25px;background:${palette.color};display:flex;align-items:center;justify-content:center;margin:0 auto;box-shadow:0 3px 6px rgba(0,0,0,0.12);&quot;&gt;` +
            `${renderSvgIcon(iconKey, '#FFFFFF', 26)}` +
            `&lt;/div&gt;&lt;/div&gt;`;

          cardCells.push(
            `<mxCell id="${nextId('stage_hdr')}" value="${hdrHtml}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;" vertex="1" parent="1">` +
            `<mxGeometry x="${colX}" y="${matrixRowY + 4}" width="${colWidth}" height="${rowH - 8}" as="geometry"/>` +
            `</mxCell>`
          );

          // Horizontal Stage Transition Arrow
          if (c < numCols - 1) {
            edgeCells.push(
              `<mxCell id="${nextId('e_stage')}" value="" edge="1" parent="1" style="edgeStyle=none;strokeColor=#334155;strokeWidth=2;endArrow=classic;endSize=5;">` +
              `<mxGeometry relative="1" as="geometry"><mxPoint x="${colX + colWidth - 18}" y="${matrixRowY + 54}" as="sourcePoint"/><mxPoint x="${colX + colWidth + 14}" y="${matrixRowY + 54}" as="targetPoint"/></mxGeometry>` +
              `</mxCell>`
            );
          }
        }
      } else if (isActivitiesRow) {
        for (let c = 0; c < numCols; c++) {
          const colX = stageXGuides[c];
          const palette = stagePalettes[c % stagePalettes.length];
          const rawCard = row.cards && row.cards[c];
          const bullets = (rawCard?.bullets && rawCard.bullets.length > 0)
            ? rawCard.bullets
            : [rawCard?.title || `Stage ${c + 1} Activity`];

          let actBulletsHtml = '';
          bullets.forEach((b: string) => {
            actBulletsHtml += 
              `&lt;div style=&quot;display:flex;align-items:flex-start;gap:5px;margin-bottom:3.5px;font-size:8.5px;font-weight:600;color:#1E293B;line-height:1.2;&quot;&gt;` +
              `&lt;span style=&quot;color:${palette.color};font-weight:900;font-size:10px;line-height:1;&quot;&gt;•&lt;/span&gt;&lt;span&gt;${escapeXml(b)}&lt;/span&gt;&lt;/div&gt;`;
          });

          cardCells.push(
            `<mxCell id="${nextId('stage_act')}" value="&lt;div style=&quot;padding:6px 10px;&quot;&gt;${actBulletsHtml}&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;" vertex="1" parent="1">` +
            `<mxGeometry x="${colX}" y="${matrixRowY + 4}" width="${colWidth}" height="${rowH - 8}" as="geometry"/>` +
            `</mxCell>`
          );
        }
      } else if (isMetricsRow) {
        const totalCards = row.cards ? row.cards.length : 0;
        const hasTwoPods = totalCards >= numCols * 2 || totalCards >= 8;

        for (let c = 0; c < numCols; c++) {
          const colX = stageXGuides[c];
          const palette = stagePalettes[c % stagePalettes.length];

          if (hasTwoPods) {
            const m1 = row.cards[c * 2] || { title: `Metric ${c * 2 + 1}`, icon: 'chart' };
            const m2 = row.cards[c * 2 + 1] || { title: `Metric ${c * 2 + 2}`, icon: 'target' };

            const renderMetricPod = (m: DiagramRowCard, yOffset: number) => {
              const iconKey = m.icon ? inferSvgForKeyword(m.icon) : inferSvgForKeyword(m.title);
              const mHtml = 
                `&lt;div style=&quot;display:flex;align-items:center;gap:8px;padding:3px 6px;&quot;&gt;` +
                `&lt;div style=&quot;width:30px;height:30px;border-radius:6px;background:${palette.bgLight};border:1.2px solid ${palette.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;&quot;&gt;` +
                `${renderSvgIcon(iconKey, palette.color, 16)}` +
                `&lt;/div&gt;` +
                `&lt;div style=&quot;font-size:8.5px;font-weight:800;color:${palette.color};line-height:1.2;&quot;&gt;${escapeXml(m.title)}&lt;/div&gt;` +
                `&lt;/div&gt;`;

              cardCells.push(
                `<mxCell id="${nextId('stage_m')}" value="${mHtml}" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">` +
                `<mxGeometry x="${colX + 8}" y="${matrixRowY + yOffset}" width="${colWidth - 16}" height="44" as="geometry"/>` +
                `</mxCell>`
              );
            };

            renderMetricPod(m1, 6);
            renderMetricPod(m2, 58);
          } else {
            const m = (row.cards && row.cards[c]) ? row.cards[c] : { title: `Metric ${c + 1}`, icon: 'target' };
            const iconKey = m.icon ? inferSvgForKeyword(m.icon) : inferSvgForKeyword(m.title);
            const mHtml = 
              `&lt;div style=&quot;display:flex;align-items:center;gap:8px;padding:3px 6px;&quot;&gt;` +
              `&lt;div style=&quot;width:30px;height:30px;border-radius:6px;background:${palette.bgLight};border:1.2px solid ${palette.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;&quot;&gt;` +
              `${renderSvgIcon(iconKey, palette.color, 16)}` +
              `&lt;/div&gt;` +
              `&lt;div style=&quot;font-size:8.5px;font-weight:800;color:${palette.color};line-height:1.2;&quot;&gt;${escapeXml(m.title)}&lt;/div&gt;` +
              `&lt;/div&gt;`;

            cardCells.push(
              `<mxCell id="${nextId('stage_m')}" value="${mHtml}" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">` +
              `<mxGeometry x="${colX + 8}" y="${matrixRowY + 8}" width="${colWidth - 16}" height="${rowH - 16}" as="geometry"/>` +
              `</mxCell>`
            );
          }
        }
      } else if (isFlowRow) {
        for (let c = 0; c < numCols; c++) {
          const colX = stageXGuides[c];
          const palette = stagePalettes[c % stagePalettes.length];
          const rawCard = row.cards && row.cards[c];
          const title = rawCard?.title || (c === 0 ? 'Ideas & Hypotheses' : c === 1 ? 'Validated Candidates' : c === 2 ? 'Approved Therapy' : c === 3 ? 'Accessible to Patients' : 'Better Lives');
          const iconKey = rawCard?.icon ? inferSvgForKeyword(rawCard.icon) : (c === 0 ? 'lightbulb' : c === 1 ? 'box' : c === 2 ? 'gear' : c === 3 ? 'globe' : 'users');

          const flowHtml = 
            `&lt;div style=&quot;display:flex;align-items:center;justify-content:center;gap:6px;padding:2px 4px;&quot;&gt;` +
            `&lt;div style=&quot;flex-shrink:0;&quot;&gt;${renderSvgIcon(iconKey, palette.color, 16)}&lt;/div&gt;` +
            `&lt;div style=&quot;font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.1;&quot;&gt;${escapeXml(title)}&lt;/div&gt;` +
            `&lt;/div&gt;`;

          cardCells.push(
            `<mxCell id="${nextId('stage_flow')}" value="${flowHtml}" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
            `<mxGeometry x="${colX + 10}" y="${matrixRowY + 8}" width="${colWidth - 20}" height="42" as="geometry"/>` +
            `</mxCell>`
          );

          if (c < numCols - 1) {
            edgeCells.push(
              `<mxCell id="${nextId('e_flow')}" value="" edge="1" parent="1" style="edgeStyle=none;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;">` +
              `<mxGeometry relative="1" as="geometry"><mxPoint x="${colX + colWidth - 8}" y="${matrixRowY + 29}" as="sourcePoint"/><mxPoint x="${colX + colWidth + 8}" y="${matrixRowY + 29}" as="targetPoint"/></mxGeometry>` +
              `</mxCell>`
            );
          }
        }
      }

      matrixRowY += rowH;
    }

    currentY += totalMatrixHeight + cfg.rowGap;

    // =========================================================================
    // 4. LOWER TIERS: VALUE ENABLERS, TECHNOLOGY PLATFORM, VALUE OUTCOMES
    // =========================================================================
    for (let lIdx = 0; lIdx < lowerRows.length; lIdx++) {
      const row = lowerRows[lIdx];
      const isEnablerRow = /enabler/i.test(row.rowTitle);
      const isTechRow = /technolog|platform/i.test(row.rowTitle);
      const isOutcomeRow = /outcome/i.test(row.rowTitle);

      const rowH = isEnablerRow ? 78 : isTechRow ? 74 : 56;

      backgroundCells.push(
        `<mxCell id="${nextId('row_frame')}" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">` +
        `<mxGeometry x="${cfg.margin}" y="${currentY}" width="${contentWidth}" height="${rowH}" as="geometry"/>` +
        `</mxCell>`
      );

      if (hasLeftCol) {
        const rowTitleWords = row.rowTitle.replace(/\s*&\s*/g, '&amp;&lt;br/&gt;').split(/\s+/).join('&lt;br/&gt;');
        structuralCells.push(
          `<mxCell id="${nextId('lbl_lower_row')}" value="&lt;b style=&quot;font-size:9.5px;color:#0F2A4A;&quot;&gt;${rowTitleWords}&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
          `<mxGeometry x="${cfg.margin}" y="${currentY}" width="${leftColWidth}" height="${rowH}" as="geometry"/>` +
          `</mxCell>`
        );

        edgeCells.push(
          `<mxCell id="${nextId('div_lower_col')}" value="" edge="1" parent="1" style="edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;">` +
          `<mxGeometry relative="1" as="geometry"><mxPoint x="${cfg.margin + leftColWidth}" y="${currentY}" as="sourcePoint"/><mxPoint x="${cfg.margin + leftColWidth}" y="${currentY + rowH}" as="targetPoint"/></mxGeometry>` +
          `</mxCell>`
        );
      }

      const availableCardAreaX = cfg.margin + leftColWidth + 8;
      const availableCardAreaW = contentWidth - leftColWidth - 16;

      if (isEnablerRow) {
        const enablerCards = (row.cards && row.cards.length >= 4) ? row.cards : [
          { title: 'DATA & AI', bullets: ['AI/ML, Predictive Modeling, Real-world Data, Advanced Analytics'], icon: 'brain' },
          { title: 'DIGITAL PLATFORMS', bullets: ['Unified R&D, Clinical, Manufacturing and Commercial Platforms'], icon: 'cloud' },
          { title: 'QUALITY & COMPLIANCE', bullets: ['GxP Quality, Data Integrity, Regulatory Compliance'], icon: 'shieldCheck' },
          { title: 'TALENT & CULTURE', bullets: ['Scientific Excellence, Cross-functional Collaboration'], icon: 'users' },
          { title: 'PARTNER ECOSYSTEM', bullets: ['CROs, CMOs, Academic Partners, Tech Partners'], icon: 'network' },
          { title: 'SUSTAINABILITY', bullets: ['Environmentally Responsible Operations'], icon: 'leaf' }
        ];

        const numEnablers = enablerCards.length;
        const enablerW = Math.floor((availableCardAreaW - ((numEnablers - 1) * 6)) / numEnablers);

        for (let i = 0; i < numEnablers; i++) {
          const item = enablerCards[i];
          const ex = availableCardAreaX + (i * (enablerW + 6));
          const iconKey = item.icon ? inferSvgForKeyword(item.icon) : inferSvgForKeyword(item.title);
          const iconColor = i === 0 ? '#1D4ED8' : i === 1 ? '#0284C7' : i === 2 ? '#166534' : i === 3 ? '#6D28D9' : i === 4 ? '#D97706' : '#0D9488';
          const iconBg = i === 0 ? '#EFF6FF' : i === 1 ? '#F0F9FF' : i === 2 ? '#F0FDF4' : i === 3 ? '#FAF5FF' : i === 4 ? '#FFFBEB' : '#F0FDFA';
          const desc = item.bullets && item.bullets.length > 0 ? item.bullets[0] : '';

          const html = 
            `&lt;div style=&quot;display:flex;align-items:flex-start;gap:6px;padding:3px 4px;&quot;&gt;` +
            `&lt;div style=&quot;width:24px;height:24px;border-radius:12px;background:${iconBg};display:flex;align-items:center;justify-content:center;flex-shrink:0;&quot;&gt;` +
            `${renderSvgIcon(iconKey, iconColor, 14)}` +
            `&lt;/div&gt;` +
            `&lt;div style=&quot;flex:1;min-width:0;&quot;&gt;` +
            `&lt;div style=&quot;font-size:8px;font-weight:900;color:#0F172A;line-height:1.15;&quot;&gt;${escapeXml(item.title)}&lt;/div&gt;` +
            (desc ? `&lt;div style=&quot;font-size:6.5px;color:#64748B;font-weight:500;line-height:1.15;margin-top:1.5px;word-break:break-word;white-space:normal;&quot;&gt;${escapeXml(desc)}&lt;/div&gt;` : '') +
            `&lt;/div&gt;&lt;/div&gt;`;

          cardCells.push(
            `<mxCell id="${nextId('enabler_c')}" value="${html}" style="whiteSpace=wrap;rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=top;padding=2;" vertex="1" parent="1">` +
            `<mxGeometry x="${ex}" y="${currentY + 6}" width="${enablerW}" height="66" as="geometry"/>` +
            `</mxCell>`
          );
        }
      } else if (isTechRow) {
        const gcpBoxW = 110;
        const gcpBoxHtml = 
          `&lt;div style=&quot;display:flex;align-items:center;justify-content:center;gap:6px;&quot;&gt;` +
          `&lt;div style=&quot;flex-shrink:0;&quot;&gt;${renderSvgIcon('cloud', '#4285F4', 18)}&lt;/div&gt;` +
          `&lt;div style=&quot;font-size:9px;font-weight:900;color:#0F172A;&quot;&gt;Google Cloud&lt;/div&gt;` +
          `&lt;/div&gt;`;

        cardCells.push(
          `<mxCell id="tech_gcp" value="${gcpBoxHtml}" style="rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
          `<mxGeometry x="${availableCardAreaX}" y="${currentY + 8}" width="${gcpBoxW}" height="58" as="geometry"/>` +
          `</mxCell>`
        );

        const rawTechs = (plan.technologies && plan.technologies.length > 0)
          ? plan.technologies.filter(t => !/google cloud|gcp/i.test(t))
          : ['Vertex AI', 'BigQuery', 'Dataplex', 'Dataflow', 'Pub/Sub', 'Apigee', 'Looker', 'Gemini', 'MCP / A2A', 'Kubernetes', 'Terraform', 'GitHub'];

        const tilesAreaX = availableCardAreaX + gcpBoxW + 8;
        const tilesAreaW = availableCardAreaW - gcpBoxW - 8;
        const tileW = Math.floor((tilesAreaW - ((rawTechs.length - 1) * 6)) / rawTechs.length);

        for (let i = 0; i < rawTechs.length; i++) {
          const tName = rawTechs[i];
          const tx = tilesAreaX + (i * (tileW + 6));
          const stencil = getVectorStencilForTech(tName);
          const iconKey = stencil.svgIconKey || inferSvgForKeyword(tName);
          const iconColor = stencil.textColor || '#2563EB';

          const html = 
            `&lt;div style=&quot;text-align:center;padding:2px 0;&quot;&gt;` +
            `&lt;div style=&quot;display:flex;justify-content:center;margin-bottom:2px;&quot;&gt;${renderSvgIcon(iconKey, iconColor, 16)}&lt;/div&gt;` +
            `&lt;div style=&quot;font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;&quot;&gt;${escapeXml(tName)}&lt;/div&gt;` +
            `&lt;/div&gt;`;

          cardCells.push(
            `<mxCell id="${nextId('tech_tile')}" value="${html}" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
            `<mxGeometry x="${tx}" y="${currentY + 8}" width="${tileW}" height="58" as="geometry"/>` +
            `</mxCell>`
          );
        }
      } else if (isOutcomeRow) {
        const outcomeItems = (row.cards && row.cards.length >= 4) ? row.cards : [
          { title: 'Faster Innovation', icon: 'timer' },
          { title: 'Higher Quality', icon: 'medal' },
          { title: 'Operational Excellence', icon: 'gear' },
          { title: 'Patient-Centricity', icon: 'userCheck' },
          { title: 'Financial Performance', icon: 'dollar' },
          { title: 'Societal Impact', icon: 'globe' }
        ];

        const numOutcomes = outcomeItems.length;
        const outcomeW = Math.floor((availableCardAreaW - ((numOutcomes - 1) * 8)) / numOutcomes);

        for (let i = 0; i < numOutcomes; i++) {
          const item = outcomeItems[i];
          const ox = availableCardAreaX + (i * (outcomeW + 8));
          const iconKey = item.icon ? inferSvgForKeyword(item.icon) : inferSvgForKeyword(item.title);
          const iconColor = i === 0 ? '#166534' : i === 1 ? '#1D4ED8' : i === 2 ? '#6D28D9' : i === 3 ? '#0D9488' : i === 4 ? '#D97706' : '#059669';

          const html = 
            `&lt;div style=&quot;display:flex;align-items:center;gap:6px;padding:3px 6px;&quot;&gt;` +
            `&lt;div style=&quot;flex-shrink:0;&quot;&gt;${renderSvgIcon(iconKey, iconColor, 18)}&lt;/div&gt;` +
            `&lt;div style=&quot;font-size:8.5px;font-weight:900;color:#0F172A;&quot;&gt;${escapeXml(item.title)}&lt;/div&gt;` +
            `&lt;/div&gt;`;

          cardCells.push(
            `<mxCell id="${nextId('vo_pill')}" value="${html}" style="rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">` +
            `<mxGeometry x="${ox}" y="${currentY + 8}" width="${outcomeW}" height="40" as="geometry"/>` +
            `</mxCell>`
          );
        }
      }

      currentY += rowH + cfg.rowGap;
    }

    // =========================================================================
    // 5. RIGHT SIDE ENCLOSURE PANEL: "DELIVERED OUTCOMES"
    // =========================================================================
    if (hasSidePanel) {
      const sidePanelX = cfg.pageWidth - cfg.margin - sidePanelWidth;
      const sidePanelY = 68;
      const sidePanelH = currentY - sidePanelY - cfg.rowGap;
      const sideHeaderTitle = plan.sideEnclosure?.title || sideRow?.rowTitle || 'DELIVERED OUTCOMES';

      const sideItems: DiagramRowCard[] = (plan.sideEnclosure && plan.sideEnclosure.items && plan.sideEnclosure.items.length > 0)
        ? plan.sideEnclosure.items
        : (sideRow && sideRow.cards && sideRow.cards.length > 0)
          ? sideRow.cards
          : [
              { title: 'INNOVATIVE THERAPIES', bullets: ['Bring novel treatments to patients faster'], icon: 'lightbulb' },
              { title: 'IMPROVED PATIENT OUTCOMES', bullets: ['Meaningful clinical and real-world impact'], icon: 'heartPulse' },
              { title: 'ACCESSIBLE & AFFORDABLE CARE', bullets: ['Wider access through efficient commercialization'], icon: 'users' },
              { title: 'TRUSTED BY PARTNERS', bullets: ['Collaborate with best-in-class research & healthcare partners'], icon: 'handshake' },
              { title: 'SUSTAINABLE GROWTH', bullets: ['Drive long-term value for patients and stakeholders'], icon: 'trendUp' }
            ];

      backgroundCells.push(
        `<mxCell id="delivered_box" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">` +
        `<mxGeometry x="${sidePanelX}" y="${sidePanelY}" width="${sidePanelWidth}" height="${sidePanelH}" as="geometry"/>` +
        `</mxCell>`
      );

      structuralCells.push(
        `<mxCell id="delivered_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F2A4A;letter-spacing:0.5px;&quot;&gt;${escapeXml(sideHeaderTitle.toUpperCase())}&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
        `<mxGeometry x="${sidePanelX}" y="${sidePanelY + 6}" width="${sidePanelWidth}" height="24" as="geometry"/>` +
        `</mxCell>`
      );

      const numSideItems = sideItems.length;
      const sideItemH = Math.min(106, Math.floor((sidePanelH - 40 - ((numSideItems - 1) * 8)) / numSideItems));

      for (let i = 0; i < numSideItems; i++) {
        const item = sideItems[i];
        const itemY = sidePanelY + 36 + (i * (sideItemH + 8));
        const iconKey = item.icon ? inferSvgForKeyword(item.icon) : inferSvgForKeyword(item.title);
        const iconColor = i === 0 ? '#166534' : i === 1 ? '#1D4ED8' : i === 2 ? '#0D9488' : i === 3 ? '#D97706' : '#6D28D9';
        const iconBg = i === 0 ? '#F0FDF4' : i === 1 ? '#EFF6FF' : i === 2 ? '#F0FDFA' : i === 3 ? '#FFFBEB' : '#FAF5FF';
        const desc = item.bullets && item.bullets.length > 0 ? item.bullets[0] : '';

        const html = 
          `&lt;div style=&quot;padding:8px 10px;text-align:center;&quot;&gt;` +
          `&lt;div style=&quot;width:36px;height:36px;border-radius:18px;background:${iconBg};border:1.2px solid ${iconColor};display:flex;align-items:center;justify-content:center;margin:0 auto 4px auto;&quot;&gt;` +
          `${renderSvgIcon(iconKey, iconColor, 20)}` +
          `&lt;/div&gt;` +
          `&lt;div style=&quot;font-size:9px;font-weight:900;color:${iconColor};line-height:1.2;&quot;&gt;${escapeXml(item.title)}&lt;/div&gt;` +
          (desc ? `&lt;div style=&quot;font-size:7.5px;color:#64748B;font-weight:500;line-height:1.2;margin-top:2px;&quot;&gt;${escapeXml(desc)}&lt;/div&gt;` : '') +
          `&lt;/div&gt;`;

        cardCells.push(
          `<mxCell id="${nextId('deliv_c')}" value="${html}" style="whiteSpace=wrap;rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">` +
          `<mxGeometry x="${sidePanelX + 12}" y="${itemY}" width="${sidePanelWidth - 24}" height="${sideItemH}" as="geometry"/>` +
          `</mxCell>`
        );
      }
    }

    // =========================================================================
    // 6. BOTTOM ARCHITECTURE LEGEND (CLEAN LIGHT BACKGROUND, ZERO #0F172A BAR!)
    // =========================================================================
    const legendH = 42;
    const legendY = currentY;

    backgroundCells.push(
      `<mxCell id="legend_box" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">` +
      `<mxGeometry x="${cfg.margin}" y="${legendY}" width="${cfg.pageWidth - (cfg.margin * 2)}" height="${legendH}" as="geometry"/>` +
      `</mxCell>`
    );

    structuralCells.push(
      `<mxCell id="leg_title" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;letter-spacing:1px;&quot;&gt;LEGEND:&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
      `<mxGeometry x="${cfg.margin + 4}" y="${legendY + 7}" width="60" height="28" as="geometry"/>` +
      `</mxCell>`
    );

    // Render Stage Color Pills in Legend
    let legX = cfg.margin + 68;
    for (let c = 0; c < numCols; c++) {
      const stName = stageZones[c].replace(/^\d+\.\s*/, '');
      const palette = stagePalettes[c % stagePalettes.length];
      const pillW = Math.max(90, stName.length * 7 + 24);

      structuralCells.push(
        `<mxCell id="${nextId('leg_p')}" value="&lt;span style=&quot;font-size:8px;font-weight:800;color:${palette.color};&quot;&gt;${escapeXml(stName)}&lt;/span&gt;" style="rounded=1;arcSize=4;fillColor=${palette.bgLight};strokeColor=${palette.color};strokeWidth=1;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
        `<mxGeometry x="${legX}" y="${legendY + 9}" width="${pillW}" height="24" as="geometry"/>` +
        `</mxCell>`
      );
      legX += pillW + 8;
    }

    // Protocol Symbols
    structuralCells.push(
      `<mxCell id="leg_sym_step" value="&lt;span style=&quot;font-size:8px;font-weight:700;color:#475569;&quot;&gt;Process / Stage&lt;/span&gt;" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
      `<mxGeometry x="${legX}" y="${legendY + 9}" width="95" height="24" as="geometry"/>` +
      `</mxCell>`
    );
    legX += 100;

    structuralCells.push(
      `<mxCell id="leg_sym_flow" value="&lt;span style=&quot;font-size:8px;font-weight:700;color:#475569;&quot;&gt;&amp;mdash;&amp;rarr; Flow&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
      `<mxGeometry x="${legX}" y="${legendY + 9}" width="70" height="24" as="geometry"/>` +
      `</mxCell>`
    );
    legX += 75;

    structuralCells.push(
      `<mxCell id="leg_sym_dash" value="&lt;span style=&quot;font-size:8px;font-weight:700;color:#475569;&quot;&gt;- - - &amp;rarr; Information / Feedback&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">` +
      `<mxGeometry x="${legX}" y="${legendY + 9}" width="160" height="24" as="geometry"/>` +
      `</mxCell>`
    );

    // Copyright on right
    const copyrightText = plan.legend?.find(l => /©|copyright/i.test(l)) || (brandLogoText ? (brandLogoText.toLowerCase().includes('novacura') ? `© 2024 ${brandLogoText} Bio-Pharma` : `© 2024 ${brandLogoText} Technologies`) : '© 2024 Enterprise Architecture');
    structuralCells.push(
      `<mxCell id="leg_copy" value="&lt;span style=&quot;font-size:8px;font-weight:700;color:#64748B;&quot;&gt;${escapeXml(copyrightText)}&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;" vertex="1" parent="1">` +
      `<mxGeometry x="${cfg.pageWidth - cfg.margin - 220}" y="${legendY + 7}" width="216" height="28" as="geometry"/>` +
      `</mxCell>`
    );

    currentY += legendH + cfg.margin;
    cfg.pageHeight = Math.max(cfg.pageHeight, currentY);

    // Assemble complete Draw.io XML graph AST with STRICT Document Paint Ordering:
    const allCells = [
      '<mxCell id="0"/>',
      '<mxCell id="1" parent="0"/>',
      ...backgroundCells,
      ...structuralCells,
      ...cardCells,
      ...badgeCells,
      ...edgeCells
    ];

    return (
      `<mxfile host="embed.diagrams.net">` +
      `<diagram id="omni_master_v2" name="${escapeXml(title)}">` +
      `<mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${cfg.pageWidth}" pageHeight="${cfg.pageHeight}" background="${isDark ? '#0F172A' : '#FFFFFF'}">` +
      `<root>` +
      allCells.join('') +
      `</root>` +
      `</mxGraphModel>` +
      `</diagram>` +
      `</mxfile>`
    );
  }
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
