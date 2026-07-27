/**
 * 📦 PromptCanvas Structured JSON-to-Draw.io XML Compiler
 * Translates structured diagram specifications into deterministic, high-fidelity Draw.io XML
 * using custom stencils without LLM spatial hallucinations or coordinate overlaps.
 */

import { 
  ColumnTheme, 
  StencilType, 
  getColumnContainerStyle, 
  getNodeStencilStyle, 
  generateStencilHtmlLabel 
} from './stencilLibrary';

export interface CompiledNodeSpec {
  id: string;
  stencil: StencilType;
  title: string;
  subtitle?: string;
  contentHtml?: string;
  icons?: string[];
  height?: number;
  children?: { id: string; title: string; subtitle?: string }[];
}

export interface CompiledColumnSpec {
  id: string;
  title: string;
  subtitle?: string;
  theme: ColumnTheme;
  nodes: CompiledNodeSpec[];
  footerText?: string;
}

export interface CompiledConnectionSpec {
  fromNodeId: string;
  toNodeId: string;
  label?: string;
  style?: 'orthogonal' | 'direct' | 'dashed';
  fontColor?: string;
}

export interface CompiledDiagramSpec {
  diagramId: string;
  title: string;
  columns: CompiledColumnSpec[];
  connections: CompiledConnectionSpec[];
}

/**
 * Compiles a structured diagram specification into pixel-perfect Draw.io XML
 */
export function compileSpecToDrawioXml(spec: CompiledDiagramSpec): string {
  const colWidth = 360;
  const colGap = 140; // 140px pitch per our edge routing protocol
  const startX = 50;
  const startY = 100;
  const colHeight = 620;

  let xmlCells = '';

  // 1. Generate Columns & Nested Nodes
  spec.columns.forEach((col, colIdx) => {
    const colX = startX + colIdx * (colWidth + colGap);
    const colStyle = getColumnContainerStyle(col.theme);
    const colLabel = `${col.title}${col.subtitle ? `<br><i style="font-size:12px;font-weight:normal;">${col.subtitle}</i>` : ''}`;

    // Column Container
    xmlCells += `
        <mxCell id="col_${col.id}" value="${escapeXml(colLabel)}" style="${colStyle}" vertex="1" parent="1">
          <mxGeometry x="${colX}" y="${startY}" width="${colWidth}" height="${colHeight}" as="geometry" />
        </mxCell>`;

    let currentY = startY + 60; // Start stacking cards 60px inside column top

    col.nodes.forEach((node) => {
      const nodeWidth = node.stencil === 'cube_platform' ? colWidth - 20 : colWidth - 60;
      const nodeX = colX + (colWidth - nodeWidth) / 2;
      
      let defaultHeight = 90;
      if (node.stencil === 'cube_platform') defaultHeight = 460;
      else if (node.stencil === 'imac_monitor' || node.stencil === 'ipad_tablet' || node.stencil === 'iphone_alert') defaultHeight = 110;
      else if (node.stencil === 'pill_badge') defaultHeight = 38;
      else if (node.stencil === 'icon_grid') defaultHeight = 220;
      else if (node.subtitle || node.contentHtml) defaultHeight = 110;

      const nodeHeight = node.height || defaultHeight;
      const nodeStyle = getNodeStencilStyle(node.stencil, col.theme);
      const nodeLabel = generateStencilHtmlLabel(node.stencil, node.title, node.subtitle, node.contentHtml, node.icons);

      if (node.stencil === 'imac_monitor') {
        const frameHeight = nodeHeight - 25;
        xmlCells += `
        <mxCell id="${node.id}_foot" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=#475569;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + nodeWidth/2 - 40}" y="${currentY + nodeHeight - 5}" width="80" height="5" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_stand" value="" style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fillColor=#94A3B8;strokeColor=#64748B;direction=south;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + nodeWidth/2 - 15}" y="${currentY + frameHeight}" width="30" height="20" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=2;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="${nodeX}" y="${currentY}" width="${nodeWidth}" height="${frameHeight}" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_chin" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + 2}" y="${currentY + frameHeight - 14}" width="${nodeWidth - 4}" height="12" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}" value="${escapeXml(nodeLabel)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;fontColor=#1E293B;padding=6;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + 6}" y="${currentY + 6}" width="${nodeWidth - 12}" height="${frameHeight - 22}" as="geometry" />
        </mxCell>`;
      } else if (node.stencil === 'ipad_tablet') {
        xmlCells += `
        <mxCell id="${node.id}_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=3;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="${nodeX}" y="${currentY}" width="${nodeWidth}" height="${nodeHeight}" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_cam" value="" style="shape=ellipse;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + nodeWidth/2 - 3}" y="${currentY + 4}" width="6" height="6" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}" value="${escapeXml(nodeLabel)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;fontColor=#1E293B;padding=6;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + 8}" y="${currentY + 14}" width="${nodeWidth - 16}" height="${nodeHeight - 22}" as="geometry" />
        </mxCell>`;
      } else if (node.stencil === 'iphone_alert') {
        xmlCells += `
        <mxCell id="${node.id}_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEFCF7;strokeColor=#DC2231;strokeWidth=4;arcSize=12;" vertex="1" parent="1">
          <mxGeometry x="${nodeX}" y="${currentY}" width="${nodeWidth}" height="${nodeHeight}" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_notch" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F87171;strokeColor=none;arcSize=50;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + nodeWidth/2 - 25}" y="${currentY + 6}" width="50" height="5" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}" value="${escapeXml(nodeLabel)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1;fontColor=#7F1D1D;padding=8;arcSize=8;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + 10}" y="${currentY + 18}" width="${nodeWidth - 20}" height="${nodeHeight - 30}" as="geometry" />
        </mxCell>`;
      } else {
        xmlCells += `
        <mxCell id="${node.id}" value="${escapeXml(nodeLabel)}" style="${nodeStyle}" vertex="1" parent="1">
          <mxGeometry x="${nodeX}" y="${currentY}" width="${nodeWidth}" height="${nodeHeight}" as="geometry" />
        </mxCell>`;
      }

      // If node is a cube_platform with children, stack them inside!
      if (node.stencil === 'cube_platform' && node.children && node.children.length > 0) {
        let childY = currentY + 60;
        const childWidth = nodeWidth - 40;
        const childX = nodeX + 20;

        node.children.forEach((child) => {
          const childStyle = getNodeStencilStyle('standard_card', col.theme);
          const childLabel = generateStencilHtmlLabel('standard_card', child.title, child.subtitle);
          xmlCells += `
        <mxCell id="${child.id}" value="${escapeXml(childLabel)}" style="${childStyle}" vertex="1" parent="1">
          <mxGeometry x="${childX}" y="${childY}" width="${childWidth}" height="55" as="geometry" />
        </mxCell>`;
          childY += 70;
        });
      }

      currentY += nodeHeight + 16;
    });

    // Footer Text if present
    if (col.footerText) {
      const footerY = startY + colHeight - 50;
      xmlCells += `
        <mxCell id="col_${col.id}_footer" value="${escapeXml(col.footerText)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=11;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="${colX + 10}" y="${footerY}" width="${colWidth - 20}" height="40" as="geometry" />
        </mxCell>`;
    }
  });

  // 2. Generate Connectors
  spec.connections.forEach((conn, idx) => {
    const edgeId = `edge_${idx}_${conn.fromNodeId}_${conn.toNodeId}`;
    const fontColor = conn.fontColor || (idx === 0 ? '#1E40AF' : '#065F46');
    const strokeColor = idx === 0 ? '#3B82F6' : '#10B981';
    
    // Enforce Draw.io routing protocol: plain text labels, no html background wrapper
    const edgeStyle = `edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=${strokeColor};fontColor=${fontColor};labelBackgroundColor=none;fontStyle=1;fontSize=12;`;
    const edgeLabel = conn.label ? `<b>${conn.label}</b>` : '';

    xmlCells += `
        <mxCell id="${edgeId}" value="${escapeXml(edgeLabel)}" style="${edgeStyle}" edge="1" parent="1" source="${conn.fromNodeId}" target="${conn.toNodeId}">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>`;
  });

  return `
<mxfile host="embed.diagrams.net">
  <diagram id="${spec.diagramId}" name="${escapeXml(spec.title)}">
    <mxGraphModel dx="1400" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1500" pageHeight="900" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />${xmlCells}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

/**
 * Attempts to parse an AI response string as JSON and compile it to XML.
 * Falls back to raw XML if JSON parsing fails.
 */
export function tryCompileJsonOrFallback(aiResponseText: string, fallbackXml: string): string {
  if (!aiResponseText || typeof aiResponseText !== 'string') return fallbackXml;

  let cleanedText = aiResponseText.trim();
  // Strip markdown code block wrappers if present
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/, '');
  }

  // Try parsing as JSON Spec
  if (cleanedText.startsWith('{') && cleanedText.includes('"columns"')) {
    try {
      const spec = JSON.parse(cleanedText) as CompiledDiagramSpec;
      if (spec && Array.isArray(spec.columns)) {
        return compileSpecToDrawioXml(spec);
      }
    } catch {
      // JSON parse failed, check if it's already XML
    }
  }

  // If it's already an XML string, return it
  if (cleanedText.includes('<mxfile') && cleanedText.includes('</mxfile>')) {
    const start = cleanedText.indexOf('<mxfile');
    const end = cleanedText.lastIndexOf('</mxfile>') + 9;
    return cleanedText.substring(start, end);
  }

  return fallbackXml;
}

/**
 * Returns the benchmark ITACS Oncology Platform specification for instant compilation
 */
export function getBenchmarkItacsSpec(): CompiledDiagramSpec {
  return {
    diagramId: "itacs_conceptual_compiled",
    title: "ITACS Oncology Platform Conceptual Diagram",
    columns: [
      {
        id: "ingestion",
        title: "ONCOLOGY DATA PORTAL",
        subtitle: "The 'Before' and Ingestion Stage",
        theme: "slate",
        nodes: [
          {
            id: "src_card",
            stencil: "standard_card",
            title: "Manual Data Sources Card",
            icons: ["https://api.iconify.design/vscode-icons:file-type-pdf2.svg"],
            contentHtml: `<b>PDFs</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://api.iconify.design/vscode-icons:file-type-powerpoint.svg" width="24" height="24" style="vertical-align:middle;margin-right:4px;"><b>PPTs</b><br><br>📄 <i>Unstructured Documents</i>`
          },
          {
            id: "shift_label",
            stencil: "pill_badge",
            title: "SHIFT: Manual gathering -> Strategic planning.",
            height: 36
          },
          {
            id: "func_areas",
            stencil: "icon_grid",
            title: "5 Functional Areas Card",
            height: 220
          },
          {
            id: "user_node",
            stencil: "standard_card",
            title: "User Node",
            contentHtml: `<table style="width:100%;border:none;text-align:left;margin-top:2px;"><tr><td style="width:45px;font-size:32px;text-align:center;vertical-align:middle;">👩‍💻</td><td style="vertical-align:middle;"><b style="font-size:12px;">Analyst Workspace</b><br><span style="font-size:11px;color:#64748B;">Asset Analysis Profile</span></td></tr></table>`,
            height: 110
          }
        ]
      },
      {
        id: "processing",
        title: "INTEGRATED INSIGHTS HUB",
        subtitle: "The Processing Stage",
        theme: "blue",
        footerText: "PARALLEL PATH:<br><b>No-Code MVP (immediate)</b> -> <b>Custom High-Code Agent</b> (production/approval)",
        nodes: [
          {
            id: "core_platform",
            stencil: "cube_platform",
            title: "Core ITACS Platform",
            subtitle: "Powered by Gemini Enterprise",
            height: 480,
            children: [
              { id: "synth", title: "Multi-Functional Data Synthesis", subtitle: "(Correlation Engine)" },
              { id: "content", title: "Unstructured Content Analysis", subtitle: "(PDF/PPT Processing)" },
              { id: "chatbot", title: "Strategic Chatbot Queries", subtitle: "(Natural Language Interface)" },
              { id: "sim", title: "Competitive Announcement Simulation", subtitle: "(Scenario Planning)" }
            ]
          }
        ]
      },
      {
        id: "delivery",
        title: "STRATEGIC DELIVERY & INSIGHTS",
        subtitle: "The 'After' and Output Stage",
        theme: "green",
        nodes: [
          { id: "out_1", stencil: "pill_badge", title: "OUTMANEUVER COMPETITION", height: 38 },
          { id: "out_2", stencil: "pill_badge", title: "REACH PATIENTS FASTER", height: 38 },
          { id: "out_3", stencil: "pill_badge", title: "STRATEGIC PLANNING & ANALYSIS", height: 38 },
          {
            id: "exec_dash",
            stencil: "imac_monitor",
            title: "Executive Strategy Dashboard",
            subtitle: "Real-time Analytics & KPIs",
            height: 160
          },
          {
            id: "comp_view",
            stencil: "ipad_tablet",
            title: "Competitor Comparison View",
            subtitle: "Target Analysis & Timelines",
            height: 140
          },
          {
            id: "advisory",
            stencil: "iphone_alert",
            title: "Strategic Priority Advisory",
            subtitle: "Review Drug Launch Strategy.<br>Alert ID: #T-731",
            height: 160
          }
        ]
      }
    ],
    connections: [
      { fromNodeId: "col_ingestion", toNodeId: "col_processing", label: "DATA INGESTION" },
      { fromNodeId: "col_processing", toNodeId: "col_delivery", label: "INSIGHTS FEED" }
    ]
  };
}

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
