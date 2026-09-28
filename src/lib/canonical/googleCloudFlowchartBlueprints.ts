/**
 * Google Cloud Unified 7-Layer Enterprise Agentic AI & Operational Flowchart Blueprints
 * Progressive L1 -> L2 -> L3 -> L4 Templates with Authentic Google Cloud Branding,
 * Inline SVG Product Icons, Rhombus Policy Gates, Cylinder3 Datastores & Open-Air Channel Routing.
 */

function esc(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const GOOGLE_G_LOGO_DATA_URI =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%20width%3D%2236%22%20height%3D%2236%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';

const ICONS = {
  geminiSparkle:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M12%202L9.5%209.5L2%2012L9.5%2014.5L12%2022L14.5%2014.5L22%2012L14.5%209.5L12%202Z%22%2F%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M12%202L10.5%207L12%2012L13.5%207L12%202Z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M22%2012L17%2010.5L12%2012L17%2013.5L22%2012Z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M12%2022L13.5%2017L12%2012L10.5%2017L12%2022Z%22%2F%3E%3C%2Fsvg%3E',
  colabInfinity:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%230284C7%22%20d%3D%22M7%207a5%205%200%200%200-5%205%205%205%200%200%200%205%205c2.1%200%203.9-1.3%204.6-3.2A5.9%205.9%200%200%201%2012%2012a5.9%205.9%200%200%201-.4-1.8A5%205%200%200%200%207%207zm10%200c-2.1%200-3.9%201.3-4.6%203.2.3.6.4%201.2.4%201.8s-.1%201.2-.4%201.8c.7%201.9%202.5%203.2%204.6%203.2a5%205%200%200%200%205-5%205%205%200%200%200-5-5z%22%2F%3E%3C%2Fsvg%3E',
  agentDesigner:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%227%22%20height%3D%227%22%20rx%3D%221.5%22%20fill%3D%22%230284C7%22%2F%3E%3Crect%20x%3D%2214%22%20y%3D%223%22%20width%3D%227%22%20height%3D%227%22%20rx%3D%221.5%22%20fill%3D%22%230284C7%22%2F%3E%3Crect%20x%3D%228.5%22%20y%3D%2214%22%20width%3D%227%22%20height%3D%227%22%20rx%3D%221.5%22%20fill%3D%22%2338BDF8%22%2F%3E%3Cpath%20d%3D%22M6.5%2010v2a2%202%200%200%200%202%202h3.5m5.5-4v2a2%202%200%200%201-2%202h-3.5%22%20stroke%3D%22%230284C7%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E',
  cloudArmorShield:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M12%202L3%206v6c0%205.5%203.8%2010.7%209%2012%205.2-1.3%209-6.5%209-12V6l-9-4z%22%20fill%3D%22%230284C7%22%2F%3E%3Cpath%20d%3D%22M12%204.5v15c3.7-.9%206.5-4.8%206.5-9V7.5L12%204.5z%22%20fill%3D%22%2338BDF8%22%2F%3E%3C%2Fsvg%3E',
  siemAlert:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%23DC2626%22%20d%3D%22M12%202L4%205v6.09c0%205.05%203.41%209.76%208%2010.91%204.59-1.15%208-5.86%208-10.91V5l-8-3zm1%2014h-2v-2h2v2zm0-4h-2V7h2v5z%22%2F%3E%3C%2Fsvg%3E',
  apigeeDiamond:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%23D97706%22%20d%3D%22M12%202L2%2012l10%2010%2010-10L12%202zm0%204l6%206-6%206-6-6%206-6z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%222.5%22%20fill%3D%22%23F59E0B%22%2F%3E%3C%2Fsvg%3E',
  kmsLock:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%23D97706%22%20d%3D%22M18%208h-1V6c0-2.76-2.24-5-5-5S7%203.24%207%206v2H6c-1.1%200-2%20.9-2%202v10c0%201.1.9%202%202%202h12c1.1%200%202-.9%202-2V10c0-1.1-.9-2-2-2zM9%206c0-1.66%201.34-3%203-3s3%201.34%203%203v2H9V6zm3%2011c-1.1%200-2-.9-2-2s.9-2%202-2%202%20.9%202%202-.9%202-2%202z%22%2F%3E%3C%2Fsvg%3E',
  gkeHex:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%239333EA%22%20d%3D%22M12%202l8.66%205v10L12%2022l-8.66-5V7L12%202zm0%203.5L5.5%209.25v5.5L12%2018.5l6.5-3.75v-5.5L12%205.5z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%222.5%22%20fill%3D%22%23C084FC%22%2F%3E%3C%2Fsvg%3E',
  deepResearchSearch:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%227%22%20fill%3D%22none%22%20stroke%3D%22%230284C7%22%20stroke-width%3D%222.5%22%2F%3E%3Cpath%20d%3D%22M16%2016l5%205%22%20stroke%3D%22%230284C7%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M11%207v4l3%202%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E',
  vertexProStar:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%23DB2777%22%20d%3D%22M12%201L9%209L1%2012L9%2015L12%2023L15%2015L23%2012L15%209L12%201Z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%20fill%3D%22%23F472B6%22%2F%3E%3C%2Fsvg%3E',
  vectorCube:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%23059669%22%20d%3D%22M12%202l9%204.5v11l-9%204.5-9-4.5v-11L12%202zm0%202.5L5.5%208%2012%2011.5%2018.5%208%2012%204.5zM4.5%209.7v7.3l6.5%203.3v-7.3L4.5%209.7zm8.5%2010.6l6.5-3.3V9.7l-6.5%203.3v7.3z%22%2F%3E%3C%2Fsvg%3E',
  redisStack:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%23DC2626%22%20d%3D%22M12%202L2%207l10%205%2010-5-10-5zm0%207L4%205.5%2012%203.5l8%202-8%203.5zM2%2012l10%205%2010-5-2.5-1.25L12%2014.5%204.5%2010.75%202%2012zm0%205l10%205%2010-5-2.5-1.25L12%2019.5%204.5%2015.75%202%2017z%22%2F%3E%3C%2Fsvg%3E',
  cloudSqlDb:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cellipse%20cx%3D%2212%22%20cy%3D%225%22%20rx%3D%228%22%20ry%3D%223%22%20fill%3D%22%233B82F6%22%2F%3E%3Cpath%20fill%3D%22%232563EB%22%20d%3D%22M4%205v6c0%201.66%203.58%203%208%203s8-1.34%208-3V5c0%201.66-3.58%203-8%203S4%206.66%204%205z%22%2F%3E%3Cpath%20fill%3D%22%231D4ED8%22%20d%3D%22M4%2011v6c0%201.66%203.58%203%208%203s8-1.34%208-3v-6c0%201.66-3.58%203-8%203s-8-1.34-8-3z%22%2F%3E%3C%2Fsvg%3E',
  pubsubNodes:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Ccircle%20cx%3D%226%22%20cy%3D%2212%22%20r%3D%223.5%22%20fill%3D%22%232563EB%22%2F%3E%3Ccircle%20cx%3D%2218%22%20cy%3D%226%22%20r%3D%223.5%22%20fill%3D%22%232563EB%22%2F%3E%3Ccircle%20cx%3D%2218%22%20cy%3D%2218%22%20r%3D%223.5%22%20fill%3D%22%232563EB%22%2F%3E%3Cpath%20d%3D%22M6%2012l12-6M6%2012l12%206%22%20stroke%3D%22%2360A5FA%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E',
  dlqBox:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%239333EA%22%20d%3D%22M19%203H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2zm-7%2014l-4-4%201.41-1.41L11%2013.17V7h2v6.17l1.59-1.58L16%2013l-4%204z%22%2F%3E%3C%2Fsvg%3E',
  chunkingDoc:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%23E11D48%22%20d%3D%22M14%202H6c-1.1%200-2%20.9-2%202v16c0%201.1.9%202%202%202h12c1.1%200%202-.9%202-2V8l-6-6zm-1%207V3.5L18.5%209H13zM8%2013h8v2H8v-2zm0%204h5v2H8v-2z%22%2F%3E%3C%2Fsvg%3E',
  embeddingGraph:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%222.5%22%20fill%3D%22%23E11D48%22%2F%3E%3Ccircle%20cx%3D%2218%22%20cy%3D%226%22%20r%3D%222.5%22%20fill%3D%22%23E11D48%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223.5%22%20fill%3D%22%23FB7185%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%222.5%22%20fill%3D%22%23E11D48%22%2F%3E%3Ccircle%20cx%3D%2218%22%20cy%3D%2218%22%20r%3D%222.5%22%20fill%3D%22%23E11D48%22%2F%3E%3Cpath%20d%3D%22M6%206l6%206m6-6l-6%206m-6%206l6-6m6%206l-6-6%22%20stroke%3D%22%23FDA4AF%22%20stroke-width%3D%221.5%22%2F%3E%3C%2Fsvg%3E',
  bigqueryLens:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%230891B2%22%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm-1%2014.5v-9l6%204.5-6%204.5z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%227%22%20fill%3D%22none%22%20stroke%3D%22%2322D3EE%22%20stroke-width%3D%221.5%22%2F%3E%3C%2Fsvg%3E',
  telemetryPulse:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M3%2012h4l3-7%204%2014%203-7h4%22%2F%3E%3C%2Fsvg%3E',
  sreBell:
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20fill%3D%22%23475569%22%20d%3D%22M12%2022c1.1%200%202-.9%202-2h-4c0%201.1.9%202%202%202zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5%201.5v.68C7.64%205.36%206%207.92%206%2011v5l-2%202v1h16v-1l-2-2z%22%2F%3E%3C%2Fsvg%3E',
};

/**
 * USER MASTER TEMPLATE 1 (L4 Flowchart):
 * 7-Layer Google Cloud Unified Enterprise Agentic AI & Operational Architecture (With 20 Product Icons)
 */
export function generateGoogleCloudL4AgenticFlowchartXml(customTitle?: string): string {
  const titleText = customTitle?.trim()
    ? esc(customTitle.trim())
    : 'Google Cloud | Unified Enterprise Agentic AI &amp; Operational Architecture';

  return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="gcp_l4_agentic_flowchart" name="L4 • Google Cloud Unified Enterprise Agentic AI Flowchart"><mxGraphModel dx="1460" dy="1420" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1460" pageHeight="1420" background="#FFFFFF">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- ========================================================================= -->
    <!-- CANVAS FRAME & HEADER BANNER (PERFECT EDGE-TO-EDGE SYMMETRY)              -->
    <!-- ========================================================================= -->
    <mxCell id="canvas_outer_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1">
      <mxGeometry x="20" y="15" width="1420" height="1380" as="geometry" />
    </mxCell>

    <mxCell id="header_banner" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1">
      <mxGeometry x="40" y="25" width="1380" height="60" as="geometry" />
    </mxCell>

    <mxCell id="header_logo" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${GOOGLE_G_LOGO_DATA_URI};" vertex="1" parent="1">
      <mxGeometry x="58" y="37" width="36" height="36" as="geometry" />
    </mxCell>

    <mxCell id="header_text" value="&lt;b style='font-size:16px;color:#0F172A;'&gt;${titleText}&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11.5px;color:#475569;'&gt;Full-Lifecycle Agent Mesh (L4 Production): Gemini Apps &amp;bull; Agent Designer &amp;bull; ADK 2.0 &amp;bull; Deep Research &amp;bull; Vertex AI &amp;bull; Pub/Sub &amp;bull; Persistence &amp; SRE Hub&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="110" y="32" width="840" height="46" as="geometry" />
    </mxCell>

    <mxCell id="header_badges" value="&lt;span style='background-color:#E0F2FE;color:#0369A1;border:1px solid #7DD3FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;ADK 2.0 Core&lt;/span&gt; &lt;span style='background-color:#DCFCE7;color:#15803D;border:1px solid #86EFAC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;Deep Research&lt;/span&gt; &lt;span style='background-color:#EEF2FF;color:#4338CA;border:1px solid #A5B4FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;HA 99.99%&lt;/span&gt; &lt;span style='background-color:#F3E8FF;color:#7E22CE;border:1px solid #D8B4FE;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;Zero-Trust&lt;/span&gt;" style="text;html=1;align=right;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="960" y="37" width="440" height="36" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- 7 BALANCED HORIZONTAL LAYER SWIMLANES (1380px WIDTH, PASTEL LIGHT)        -->
    <!-- ========================================================================= -->

    <!-- Tier 1: Agentic Workspace & Developer Studio -->
    <mxCell id="tier_1_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F0F9FF;fillOpacity=40;strokeColor=#BAE6FD;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="100" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_1_tab" value="&lt;b style='font-size:10px;color:#0369A1;'&gt;TIER 1: ENTERPRISE AGENTIC WORKSPACE &amp; DEVELOPER STUDIO&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#E0F2FE;strokeColor=#38BDF8;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="106" width="390" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 2: API Management & Policy Gate -->
    <mxCell id="tier_2_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFFBEB;fillOpacity=40;strokeColor=#FDE68A;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="280" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_2_tab" value="&lt;b style='font-size:10px;color:#B45309;'&gt;TIER 2: API GATEWAY &amp; ZERO-TRUST POLICY GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="850" y="286" width="310" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 3: Multi-Agent Mesh & ADK 2.0 Runtime -->
    <mxCell id="tier_3_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FAF5FF;fillOpacity=40;strokeColor=#E9D5FF;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="470" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_3_tab" value="&lt;b style='font-size:10px;color:#7E22CE;'&gt;TIER 3: COGNITIVE MULTI-AGENT MESH &amp; ADK 2.0 REASONING ENGINE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="476" width="430" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 4: In-Memory Caching & Vector Memory -->
    <mxCell id="tier_4_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#ECFDF5;fillOpacity=40;strokeColor=#A7F3D0;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="665" width="1380" height="150" as="geometry" />
    </mxCell>
    <mxCell id="tier_4_tab" value="&lt;b style='font-size:10px;color:#047857;'&gt;TIER 4: IN-MEMORY CACHE, VECTOR STORE &amp; ACID PERSISTENCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#D1FAE5;strokeColor=#10B981;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="671" width="390" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 5: Distributed Event Bus -->
    <mxCell id="tier_5_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#EFF6FF;fillOpacity=40;strokeColor=#BFDBFE;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="865" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_5_tab" value="&lt;b style='font-size:10px;color:#1D4ED8;'&gt;TIER 5: ASYNCHRONOUS EVENT BUS &amp; RESILIENCE QUEUE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="871" width="370" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 6: Async Background Agents & Lakehouse -->
    <mxCell id="tier_6_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFF1F2;fillOpacity=40;strokeColor=#FECDD3;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="1050" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_6_tab" value="&lt;b style='font-size:10px;color:#BE123C;'&gt;TIER 6: ASYNC INGESTION AGENTS &amp; ANALYTICAL LAKEHOUSE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FFE4E6;strokeColor=#F43F5E;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="1056" width="380" height="20" as="geometry" />
    </mxCell>

    <!-- Tier 7: Observability & Telemetry -->
    <mxCell id="tier_7_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;fillOpacity=40;strokeColor=#CBD5E1;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="1240" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_7_tab" value="&lt;b style='font-size:10px;color:#334155;'&gt;TIER 7: ENTERPRISE SRE OBSERVABILITY &amp; INCIDENT MANAGEMENT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="1246" width="410" height="20" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 1: AGENTIC WORKSPACE & STUDIO (4 EQUAL 220px UNITS WITH ICONS)       -->
    <!-- ========================================================================= -->
    <mxCell id="node_1_client" value="&lt;b style='font-size:12px;color:#92400E;'&gt;[1] Gemini Enterprise App&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#78350F;'&gt;Business Generative Portal&lt;br&gt;Multi-Turn Workspaces &amp;bull; SSO&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.8;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="136" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_1_client" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.geminiSparkle};" vertex="1" parent="1">
      <mxGeometry x="90" y="146" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_1a_dns" value="&lt;b style='font-size:12px;color:#0369A1;'&gt;[1a] Gemini Notebook&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#075985;'&gt;Colab Enterprise Sandbox&lt;br&gt;Prompt Tuning &amp; Model Evals&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="440" y="136" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_1a_dns" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.colabInfinity};" vertex="1" parent="1">
      <mxGeometry x="450" y="146" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_1b_waf" value="&lt;b style='font-size:12px;color:#0369A1;'&gt;[1b] Agent Designer IDE&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#075985;'&gt;Vertex Agent Builder Canvas&lt;br&gt;Visual Tool &amp; Policy Definition&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="800" y="136" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_1b_waf" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.agentDesigner};" vertex="1" parent="1">
      <mxGeometry x="810" y="146" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_1c_gslb" value="&lt;b style='font-size:12px;color:#0369A1;'&gt;[1c] Global External LB &amp; WAF&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#075985;'&gt;Cloud Armor L7 Rate Limit&lt;br&gt;HTTPS Anycast VIP Ingress&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1160" y="136" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_1c_gslb" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.cloudArmorShield};" vertex="1" parent="1">
      <mxGeometry x="1170" y="146" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 2: API GATEWAY & POLICY INSPECTION (WITH PRODUCT ICONS)              -->
    <!-- ========================================================================= -->
    <mxCell id="node_2b_reject" value="&lt;b style='font-size:12.5px;color:#991B1B;'&gt;[2b] SIEM Rejection&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#B91C1C;'&gt;401 / 429 Spike Limit&lt;br&gt;Audit Payload to SecOps Chronicle&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="316" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_2b_reject" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.siemAlert};" vertex="1" parent="1">
      <mxGeometry x="90" y="326" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_2_apigee" value="&lt;b style='font-size:13px;color:#92400E;'&gt;[2] API Gateway (Apigee Enterprise)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;OAuth2 / OIDC JWT Auth &amp;bull; Dynamic PII Masking&lt;br&gt;Spike Arrest &amp; Token Quotas&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=15;spacingRight=15;" vertex="1" parent="1">
      <mxGeometry x="460" y="298" width="520" height="115" as="geometry" />
    </mxCell>
    <mxCell id="icon_2_apigee" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.apigeeDiamond};" vertex="1" parent="1">
      <mxGeometry x="500" y="343" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_2a_kms" value="&lt;b style='font-size:12.5px;color:#92400E;'&gt;[2a] Cloud KMS &amp; HSM Vault&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;FIPS 140-2 L3 Hardware Security&lt;br&gt;Token Cryptographic Sign &amp; Verify&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="316" width="240" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_2a_kms" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.kmsLock};" vertex="1" parent="1">
      <mxGeometry x="1150" y="326" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 3: COGNITIVE MULTI-AGENT MESH & ADK 2.0 (WITH PRODUCT ICONS)         -->
    <!-- ========================================================================= -->
    <mxCell id="node_3_orchestrator" value="&lt;b style='font-size:13px;color:#6B21A8;'&gt;[3] ADK 2.0 / GKE Orchestrator&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#581C87;'&gt;LangGraph State Machine Router&lt;br&gt;Autonomous Subagent Coordinator&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="80" y="506" width="420" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_3_orchestrator" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.gkeHex};" vertex="1" parent="1">
      <mxGeometry x="92" y="518" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_3_research" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;[3a] Deep Research Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Autonomous Multi-Hop Search&lt;br&gt;Citation Grounding &amp; Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="580" y="506" width="360" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_3_research" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.deepResearchSearch};" vertex="1" parent="1">
      <mxGeometry x="592" y="518" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_3a_gemini" value="&lt;b style='font-size:13px;color:#9D174D;'&gt;[3b] Vertex AI Gemini 3.1 Pro&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#831843;'&gt;Multi-Modal Cognitive Engine&lt;br&gt;Chain-of-Thought Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FCE7F3;strokeColor=#DB2777;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="1020" y="506" width="360" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_3a_gemini" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.vertexProStar};" vertex="1" parent="1">
      <mxGeometry x="1032" y="518" width="24" height="24" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 4: CACHE, VECTOR STORE & ACID PERSISTENCE (WITH PRODUCT ICONS)       -->
    <!-- ========================================================================= -->
    <mxCell id="node_4_vector" value="&lt;b style='font-size:12.5px;color:#065F46;'&gt;[4] Vertex Vector Search&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;ScaNN Approx Nearest Neighbor&lt;br&gt;768-dim Embeddings &amp;bull; Sub-5ms Recall&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="706" width="220" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_4_vector" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.vectorCube};" vertex="1" parent="1">
      <mxGeometry x="90" y="726" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_5_redis" value="&lt;b style='font-size:13px;color:#065F46;'&gt;[5] Redis MemoryStore&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;Distributed Session Cache &amp;bull; Sub-ms Idempotency Token Engine&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="460" y="706" width="520" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_5_redis" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.redisStack};" vertex="1" parent="1">
      <mxGeometry x="476" y="726" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_6_cloudsql" value="&lt;b style='font-size:12.5px;color:#1E40AF;'&gt;[6] Cloud SQL (PostgreSQL HA)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Multi-AZ Standby ACID Ledger&lt;br&gt;Financial Immutability&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="706" width="240" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_6_cloudsql" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.cloudSqlDb};" vertex="1" parent="1">
      <mxGeometry x="1150" y="726" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 5: ASYNCHRONOUS EVENT BUS & QUEUING (WITH PRODUCT ICONS)             -->
    <!-- ========================================================================= -->
    <mxCell id="node_7_pubsub" value="&lt;b style='font-size:13px;color:#1E40AF;'&gt;[7] Google Cloud Pub/Sub Distributed Event Mesh&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Topic: agent.events.v1 &amp;bull; Partitioned High-Throughput Event Stream for Agent Coordination&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="460" y="905" width="520" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_7_pubsub" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.pubsubNodes};" vertex="1" parent="1">
      <mxGeometry x="476" y="917" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_7a_dlq" value="&lt;b style='font-size:12px;color:#6B21A8;'&gt;[7a] Dead-Letter Queue (DLQ)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#581C87;'&gt;Poison-Pill Quarantine Bus&lt;br&gt;Exponential Backoff Replay&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="905" width="200" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_7a_dlq" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.dlqBox};" vertex="1" parent="1">
      <mxGeometry x="1150" y="917" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 6: ASYNC AGENTS & LAKEHOUSE (WITH PRODUCT ICONS)                     -->
    <!-- ========================================================================= -->
    <mxCell id="node_8_chunking" value="&lt;b style='font-size:12.5px;color:#9F1239;'&gt;[8] Document Chunking Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#881337;'&gt;OCR Document Parser&lt;br&gt;Token Sliding Window Normalization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="1086" width="220" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_8_chunking" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.chunkingDoc};" vertex="1" parent="1">
      <mxGeometry x="90" y="1098" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_9_embedding" value="&lt;b style='font-size:13px;color:#9F1239;'&gt;[9] Embedding &amp; Grounding Worker&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#881337;'&gt;Vertex AI Text-Embedding-004 &amp;bull; Real-Time Grounding &amp; Verification Scorer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="460" y="1086" width="520" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_9_embedding" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.embeddingGraph};" vertex="1" parent="1">
      <mxGeometry x="476" y="1098" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_10_bigquery" value="&lt;b style='font-size:12.5px;color:#155E75;'&gt;[10] BigQuery Lakehouse &amp; GCS&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#0E7490;'&gt;Partitioned Analytics Lakehouse&lt;br&gt;WORM Immutable Cold Storage&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#CFFAFE;strokeColor=#0891B2;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="1086" width="240" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_10_bigquery" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.bigqueryLens};" vertex="1" parent="1">
      <mxGeometry x="1150" y="1106" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- TIER 7: SRE OBSERVABILITY & INCIDENT HUB (WITH PRODUCT ICONS)             -->
    <!-- ========================================================================= -->
    <mxCell id="node_11_telemetry" value="&lt;b style='font-size:13px;color:#1E293B;'&gt;[11] Cloud Operations Suite (SRE Telemetry Hub)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;OpenTelemetry Collector &amp;bull; Cloud Trace Distributed APM &amp;bull; Cloud Logging Unified Sink&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="80" y="1276" width="640" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_11_telemetry" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.telemetryPulse};" vertex="1" parent="1">
      <mxGeometry x="96" y="1288" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_12_sre" value="&lt;b style='font-size:12.5px;color:#1E293B;'&gt;[12] PagerDuty SRE Hub&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;SLO Error Budget Monitoring&lt;br&gt;Automated Incident Escalation &amp; Pager&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=20;" vertex="1" parent="1">
      <mxGeometry x="960" y="1276" width="420" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_12_sre" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${ICONS.sreBell};" vertex="1" parent="1">
      <mxGeometry x="976" y="1288" width="24" height="24" as="geometry" />
    </mxCell>

    <!-- ========================================================================= -->
    <!-- FLOW ARROWS & LABELS (ZERO-COLLISION IN OPEN AIR CHANNELS)                -->
    <!-- ========================================================================= -->
    <mxCell id="flow_1" value="&lt;b style='color:#0284C7;'&gt;1. Evals &amp; Prompts&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1_client" target="node_1a_dns">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_1a" value="&lt;b style='color:#0284C7;'&gt;1a. Export Blueprint&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1a_dns" target="node_1b_waf">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_1b" value="&lt;b style='color:#0284C7;'&gt;1b. Deploy Endpoint&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1b_waf" target="node_1c_gslb">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_2" value="&lt;b style='color:#B45309;'&gt;2. HTTPS Ingress Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_1c_gslb" target="node_2_apigee">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1270" y="255" />
          <mxPoint x="720" y="255" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_2a" value="&lt;b style='color:#B45309;'&gt;2a. Verify JWT&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2a_kms">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_2b" value="&lt;b style='color:#B91C1C;'&gt;2b. Invalid Token (401/429)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#EF4444;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2b_reject">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_3" value="&lt;b style='color:#6B21A8;'&gt;3. Auth'd &amp; PII-Masked Payload&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_2_apigee" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="720" y="448" />
          <mxPoint x="290" y="448" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_4_fwd" value="&lt;b style='color:#0284C7;'&gt;4. Multi-Hop Search&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=1;exitY=0.35;entryX=0;entryY=0.35;" edge="1" parent="1" source="node_3_orchestrator" target="node_3_research">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_4_back" value="&lt;b style='color:#0284C7;'&gt;4a. Verified Findings&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.65;entryX=1;entryY=0.65;" edge="1" parent="1" source="node_3_research" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_4b_fwd" value="&lt;b style='color:#9D174D;'&gt;4b. CoT Reasoning&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DB2777;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=1;exitY=0.35;entryX=0;entryY=0.35;" edge="1" parent="1" source="node_3_research" target="node_3a_gemini">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_4b_back" value="&lt;b style='color:#9D174D;'&gt;4c. Synthesis&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DB2777;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.65;entryX=1;entryY=0.65;" edge="1" parent="1" source="node_3a_gemini" target="node_3_research">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_5" value="&lt;b style='color:#065F46;'&gt;5. Vector RAG Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.26;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_4_vector">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_6" value="&lt;b style='color:#065F46;'&gt;6. Read/Write State&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.85;exitY=1;entryX=0.12;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_5_redis">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_7" value="&lt;b style='color:#1E40AF;'&gt;7. ACID Commit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.96;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_6_cloudsql">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="483" y="638" />
          <mxPoint x="1260" y="638" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_8" value="&lt;b style='color:#1E40AF;'&gt;8. Publish Tasks for Agents&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_5_redis" target="node_7_pubsub">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_8a" value="&lt;b style='color:#6B21A8;'&gt;8a. DLQ Quarantine&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=9.5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_7_pubsub" target="node_7a_dlq">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_9" value="&lt;b style='color:#9F1239;'&gt;9. Ingest Task&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#E11D48;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#E11D48;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_8_chunking">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="190" y="942" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_10" value="&lt;b style='color:#9F1239;'&gt;10. Embed &amp; Verify&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#E11D48;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#E11D48;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_9_embedding">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_11" value="&lt;b style='color:#155E75;'&gt;11. Datastream CDC Sync&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0891B2;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#0891B2;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_6_cloudsql" target="node_10_bigquery">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="0" y="-85" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_12" value="&lt;b style='color:#065F46;'&gt;12. Upsert 768d Vectors&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_9_embedding" target="node_4_vector">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="380" y="1130" />
          <mxPoint x="380" y="750" />
        </Array>
        <mxPoint x="0" y="-120" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_13" value="&lt;b style='color:#1E293B;'&gt;13. OTel Traces &amp; Metrics&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#475569;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.8;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_3_orchestrator" target="node_11_telemetry">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="55" y="576" />
          <mxPoint x="55" y="1313" />
        </Array>
        <mxPoint x="0" y="340" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_14" value="&lt;b style='color:#1E293B;'&gt;14. SLO Breach Alert&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#475569;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_11_telemetry" target="node_12_sre">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_15_return" value="&lt;b style='color:#15803D;'&gt;15. Signed 200 OK Response&lt;br&gt;(Sub-45ms SLA)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.35;entryX=0.5;entryY=1;" edge="1" parent="1" source="node_3_orchestrator" target="node_1_client">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="65" y="537" />
          <mxPoint x="65" y="248" />
          <mxPoint x="190" y="248" />
        </Array>
        <mxPoint x="67" y="-69" as="offset" />
      </mxGeometry>
    </mxCell>

  </root>
</mxGraphModel></diagram></mxfile>`;
}

/**
 * USER MASTER TEMPLATE 3/4 (L3 Flowchart):
 * Google Cloud | Unified 7-Layer Enterprise Operational Flowchart (Sequential End-to-End Execution Flow)
 */
export function generateGoogleCloudL3OperationalFlowchartXml(customTitle?: string): string {
  const titleText = customTitle?.trim()
    ? esc(customTitle.trim())
    : 'Google Cloud | Unified 7-Layer Enterprise Operational Flowchart';

  return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="gcp_l3_operational_flowchart" name="L3 • Google Cloud 7-Layer Operational Flowchart"><mxGraphModel dx="1460" dy="1420" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1460" pageHeight="1420" background="#FFFFFF">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <mxCell id="canvas_outer_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1">
      <mxGeometry x="20" y="15" width="1420" height="1380" as="geometry" />
    </mxCell>

    <mxCell id="header_banner" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1">
      <mxGeometry x="40" y="25" width="1380" height="60" as="geometry" />
    </mxCell>

    <mxCell id="header_logo" value="" style="shape=image;html=1;verticalAlign=top;verticalLabelPosition=bottom;labelBackgroundColor=none;imageAspect=1;aspect=fixed;image=${GOOGLE_G_LOGO_DATA_URI};" vertex="1" parent="1">
      <mxGeometry x="58" y="37" width="36" height="36" as="geometry" />
    </mxCell>

    <mxCell id="header_text" value="&lt;b style='font-size:16px;color:#0F172A;'&gt;${titleText}&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11.5px;color:#475569;'&gt;Sequential End-to-End Execution Flow (L3 Technical): Ingress &amp;rarr; Apigee &amp;rarr; Orchestrator &amp;rarr; Vertex AI &amp;rarr; Pub/Sub &amp;rarr; Persistence &amp; SRE Hub&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="110" y="32" width="840" height="46" as="geometry" />
    </mxCell>

    <mxCell id="header_badges" value="&lt;span style='background-color:#E0F2FE;color:#0369A1;border:1px solid #7DD3FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;SOC2 Type II&lt;/span&gt; &lt;span style='background-color:#DCFCE7;color:#15803D;border:1px solid #86EFAC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;PCI-DSS 4.0&lt;/span&gt; &lt;span style='background-color:#EEF2FF;color:#4338CA;border:1px solid #A5B4FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;HA 99.99%&lt;/span&gt; &lt;span style='background-color:#F3E8FF;color:#7E22CE;border:1px solid #D8B4FE;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;Zero-Trust&lt;/span&gt;" style="text;html=1;align=right;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="960" y="37" width="440" height="36" as="geometry" />
    </mxCell>

    <mxCell id="tier_1_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F0F9FF;fillOpacity=40;strokeColor=#BAE6FD;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="100" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_1_tab" value="&lt;b style='font-size:10px;color:#0369A1;'&gt;TIER 1: USER INTERACTION &amp; GLOBAL EDGE INGRESS LAYER&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#E0F2FE;strokeColor=#38BDF8;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="106" width="370" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_2_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFFBEB;fillOpacity=40;strokeColor=#FDE68A;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="280" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_2_tab" value="&lt;b style='font-size:10px;color:#B45309;'&gt;TIER 2: API GATEWAY &amp; ZERO-TRUST POLICY GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="460" y="286" width="340" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_3_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FAF5FF;fillOpacity=40;strokeColor=#E9D5FF;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="470" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_3_tab" value="&lt;b style='font-size:10px;color:#7E22CE;'&gt;TIER 3: CORE ORCHESTRATOR &amp; AI REASONING ENGINE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="476" width="360" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_4_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#ECFDF5;fillOpacity=40;strokeColor=#A7F3D0;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="665" width="1380" height="150" as="geometry" />
    </mxCell>
    <mxCell id="tier_4_tab" value="&lt;b style='font-size:10px;color:#047857;'&gt;TIER 4: IN-MEMORY CACHE, VECTOR STORE &amp; ACID PERSISTENCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#D1FAE5;strokeColor=#10B981;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="671" width="390" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_5_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#EFF6FF;fillOpacity=40;strokeColor=#BFDBFE;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="865" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_5_tab" value="&lt;b style='font-size:10px;color:#1D4ED8;'&gt;TIER 5: ASYNCHRONOUS EVENT BUS &amp; RESILIENCE QUEUE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="871" width="370" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_6_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFF1F2;fillOpacity=40;strokeColor=#FECDD3;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="1050" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_6_tab" value="&lt;b style='font-size:10px;color:#BE123C;'&gt;TIER 6: ASYNC INGESTION AGENTS &amp; ANALYTICAL LAKEHOUSE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FFE4E6;strokeColor=#F43F5E;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="1056" width="380" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_7_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;fillOpacity=40;strokeColor=#CBD5E1;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="1240" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_7_tab" value="&lt;b style='font-size:10px;color:#334155;'&gt;TIER 7: ENTERPRISE SRE OBSERVABILITY &amp; INCIDENT MANAGEMENT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="1246" width="410" height="20" as="geometry" />
    </mxCell>

    <!-- TIER 1 NODES -->
    <mxCell id="node_1_client" value="&lt;b style='font-size:12.5px;color:#92400E;'&gt;[1] Client Portal&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;React 19 SPA &amp;bull; Mobile SDK&lt;br&gt;mTLS Mutual Auth &amp;bull; FIDO2&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.8;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="136" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_1" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.geminiSparkle};" vertex="1" parent="1">
      <mxGeometry x="90" y="146" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_1a_dns" value="&lt;b style='font-size:12.5px;color:#0369A1;'&gt;[1a] Cloud DNS Anycast&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Global Anycast Edge PoPs&lt;br&gt;DNSSEC &amp; Geo-Latency Routing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="440" y="136" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_1a" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.colabInfinity};" vertex="1" parent="1">
      <mxGeometry x="450" y="146" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_1b_waf" value="&lt;b style='font-size:12.5px;color:#0369A1;'&gt;[1b] Cloud Armor WAF&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;OWASP Top 10 &amp;bull; DDoS Mitigation&lt;br&gt;Adaptive ML Layer 7 Rate Limiting&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="800" y="136" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_1b" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.cloudArmorShield};" vertex="1" parent="1">
      <mxGeometry x="810" y="146" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_1c_gslb" value="&lt;b style='font-size:12.5px;color:#0369A1;'&gt;[1c] Global External LB&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;HTTPS Anycast VIP&lt;br&gt;SSL Offload &amp; HTTP/3 Ingress&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1160" y="136" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_1c" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.agentDesigner};" vertex="1" parent="1">
      <mxGeometry x="1170" y="146" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- TIER 2 NODES -->
    <mxCell id="node_2b_reject" value="&lt;b style='font-size:12.5px;color:#991B1B;'&gt;[2b] SIEM Rejection&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#B91C1C;'&gt;401 / 429 Spike Limit&lt;br&gt;Audit Payload to SecOps Chronicle&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="316" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_2b" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.siemAlert};" vertex="1" parent="1">
      <mxGeometry x="90" y="326" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_2_apigee" value="&lt;b style='font-size:13px;color:#92400E;'&gt;[2] API Gateway (Apigee Enterprise)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;OAuth2 / OIDC JWT Auth &amp;bull; Dynamic PII Masking&lt;br&gt;Spike Arrest &amp; Token Quotas&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=15;spacingRight=15;" vertex="1" parent="1">
      <mxGeometry x="460" y="298" width="520" height="115" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_2" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.apigeeDiamond};" vertex="1" parent="1">
      <mxGeometry x="500" y="343" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_2a_kms" value="&lt;b style='font-size:12.5px;color:#92400E;'&gt;[2a] Cloud KMS &amp; HSM Vault&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;FIPS 140-2 L3 Hardware Security&lt;br&gt;Token Cryptographic Sign &amp; Verify&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="316" width="240" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_2a" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.kmsLock};" vertex="1" parent="1">
      <mxGeometry x="1150" y="326" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- TIER 3 NODES (TWO 500px/520px UNITS) -->
    <mxCell id="node_3_orchestrator" value="&lt;b style='font-size:13.5px;color:#6B21A8;'&gt;[3] Router / GKE Master Orchestrator&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#581C87;'&gt;LangGraph Multi-Agent State Machine &amp;bull; GKE Autopilot Pod Mesh &amp;bull; Execution Controller&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="80" y="506" width="500" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_3" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.gkeHex};" vertex="1" parent="1">
      <mxGeometry x="96" y="518" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_3a_gemini" value="&lt;b style='font-size:13.5px;color:#9D174D;'&gt;[3a] Vertex AI Gemini 3.1 Pro (Reasoning Engine)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#831843;'&gt;Cognitive Multi-Modal Reasoning &amp;bull; Dynamic Context Grounding &amp;bull; Chain-of-Thought Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FCE7F3;strokeColor=#DB2777;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="860" y="506" width="520" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_3a" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.vertexProStar};" vertex="1" parent="1">
      <mxGeometry x="876" y="518" width="24" height="24" as="geometry" />
    </mxCell>

    <!-- TIER 4 NODES -->
    <mxCell id="node_4_vector" value="&lt;b style='font-size:12.5px;color:#065F46;'&gt;[4] Vertex Vector Search&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;ScaNN Approx Nearest Neighbor&lt;br&gt;768-dim Embeddings &amp;bull; Sub-5ms Recall&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="706" width="220" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_4" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.vectorCube};" vertex="1" parent="1">
      <mxGeometry x="90" y="726" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_5_redis" value="&lt;b style='font-size:13px;color:#065F46;'&gt;[5] Redis MemoryStore&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;Distributed Session Cache &amp;bull; Sub-ms Idempotency Token Engine&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="460" y="706" width="520" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_5" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.redisStack};" vertex="1" parent="1">
      <mxGeometry x="476" y="726" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_6_cloudsql" value="&lt;b style='font-size:12.5px;color:#1E40AF;'&gt;[6] Cloud SQL (PostgreSQL HA)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Multi-AZ Standby ACID Ledger&lt;br&gt;Financial Immutability&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="706" width="240" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_6" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.cloudSqlDb};" vertex="1" parent="1">
      <mxGeometry x="1150" y="726" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- TIER 5 NODES -->
    <mxCell id="node_7_pubsub" value="&lt;b style='font-size:13px;color:#1E40AF;'&gt;[7] Google Cloud Pub/Sub Distributed Event Mesh&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Topic: orders.created.v1 &amp;bull; Partitioned High-Throughput Event Stream for Agent Coordination&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="460" y="905" width="520" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_7" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.pubsubNodes};" vertex="1" parent="1">
      <mxGeometry x="476" y="917" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_7a_dlq" value="&lt;b style='font-size:12px;color:#6B21A8;'&gt;[7a] Dead-Letter Queue (DLQ)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#581C87;'&gt;Poison-Pill Quarantine Bus&lt;br&gt;Exponential Backoff Replay&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="905" width="200" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_7a" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.dlqBox};" vertex="1" parent="1">
      <mxGeometry x="1150" y="917" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- TIER 6 NODES -->
    <mxCell id="node_8_chunking" value="&lt;b style='font-size:12.5px;color:#9F1239;'&gt;[8] Document Chunking Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#881337;'&gt;OCR Document Parser&lt;br&gt;Token Sliding Window Normalization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="1086" width="220" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_8" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.chunkingDoc};" vertex="1" parent="1">
      <mxGeometry x="90" y="1098" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_9_embedding" value="&lt;b style='font-size:13px;color:#9F1239;'&gt;[9] Embedding &amp; Fraud Scoring Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#881337;'&gt;Vertex AI Text-Embedding-004 Worker &amp;bull; Real-Time Risk Anomaly &amp; Fraud Scorer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="460" y="1086" width="520" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_9" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.embeddingGraph};" vertex="1" parent="1">
      <mxGeometry x="476" y="1098" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_10_bigquery" value="&lt;b style='font-size:12.5px;color:#155E75;'&gt;[10] BigQuery Lakehouse &amp; GCS&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#0E7490;'&gt;Partitioned Analytics Lakehouse&lt;br&gt;WORM Immutable Cold Storage&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#CFFAFE;strokeColor=#0891B2;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="1086" width="240" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_10" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.bigqueryLens};" vertex="1" parent="1">
      <mxGeometry x="1150" y="1106" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- TIER 7 NODES -->
    <mxCell id="node_11_telemetry" value="&lt;b style='font-size:13px;color:#1E293B;'&gt;[11] Cloud Operations Suite (SRE Telemetry Hub)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;OpenTelemetry Collector &amp;bull; Cloud Trace Distributed APM &amp;bull; Cloud Logging Unified Sink&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="80" y="1276" width="640" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_11" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.telemetryPulse};" vertex="1" parent="1">
      <mxGeometry x="96" y="1288" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_12_sre" value="&lt;b style='font-size:12.5px;color:#1E293B;'&gt;[12] PagerDuty SRE Hub&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;SLO Error Budget Monitoring&lt;br&gt;Automated Incident Escalation &amp; Pager&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=20;" vertex="1" parent="1">
      <mxGeometry x="960" y="1276" width="420" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_l3_12" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.sreBell};" vertex="1" parent="1">
      <mxGeometry x="976" y="1288" width="24" height="24" as="geometry" />
    </mxCell>

    <!-- FLOW ARROWS -->
    <mxCell id="flow_1" value="&lt;b style='color:#0284C7;'&gt;1. Resolve VIP&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1_client" target="node_1a_dns">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_1a" value="&lt;b style='color:#0284C7;'&gt;1a. DDoS Filter&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1a_dns" target="node_1b_waf">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_1b" value="&lt;b style='color:#0284C7;'&gt;1b. Route Ingress&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;" edge="1" parent="1" source="node_1b_waf" target="node_1c_gslb">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_2" value="&lt;b style='color:#B45309;'&gt;2. HTTPS User Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_1c_gslb" target="node_2_apigee">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1270" y="255" />
          <mxPoint x="720" y="255" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_2a" value="&lt;b style='color:#B45309;'&gt;2a. Verify JWT&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2a_kms">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_2b" value="&lt;b style='color:#B91C1C;'&gt;2b. Invalid Token (401/429)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#EF4444;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2b_reject">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_3" value="&lt;b style='color:#6B21A8;'&gt;3. Auth'd &amp; PII-Scrubbed Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.68;entryY=0;" edge="1" parent="1" source="node_2_apigee" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="720" y="448" />
          <mxPoint x="420" y="448" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_4_fwd" value="&lt;b style='color:#9D174D;'&gt;4. Context Prompt&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DB2777;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=1;exitY=0.32;entryX=0;entryY=0.32;" edge="1" parent="1" source="node_3_orchestrator" target="node_3a_gemini">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_4_back" value="&lt;b style='color:#9D174D;'&gt;4a. CoT Synthesis&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DB2777;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0;exitY=0.68;entryX=1;entryY=0.68;" edge="1" parent="1" source="node_3a_gemini" target="node_3_orchestrator">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_5" value="&lt;b style='color:#065F46;'&gt;5. Vector Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.22;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_4_vector">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_6" value="&lt;b style='color:#065F46;'&gt;6. Read/Write State&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.84;exitY=1;entryX=0.12;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_5_redis">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_7" value="&lt;b style='color:#1E40AF;'&gt;7. ACID Commit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.94;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_6_cloudsql">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="550" y="638" />
          <mxPoint x="1260" y="638" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_8" value="&lt;b style='color:#1E40AF;'&gt;8. Publish tasks for Agents&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_5_redis" target="node_7_pubsub">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_8a" value="&lt;b style='color:#6B21A8;'&gt;8a. DLQ Quarantine&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=9.5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_7_pubsub" target="node_7a_dlq">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_9" value="&lt;b style='color:#9F1239;'&gt;9. Ingest Task&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#E11D48;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#E11D48;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_8_chunking">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="190" y="942" />
        </Array>
        <mxPoint x="0" y="45" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_10" value="&lt;b style='color:#9F1239;'&gt;10. Embed Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#E11D48;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#E11D48;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_7_pubsub" target="node_9_embedding">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_11" value="&lt;b style='color:#155E75;'&gt;11. Datastream CDC Sync&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0891B2;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#0891B2;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_6_cloudsql" target="node_10_bigquery">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="0" y="-85" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_12" value="&lt;b style='color:#065F46;'&gt;12. Upsert 768d Vectors&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_9_embedding" target="node_4_vector">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="380" y="1130" />
          <mxPoint x="380" y="750" />
        </Array>
        <mxPoint x="0" y="-120" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_13" value="&lt;b style='color:#1E293B;'&gt;13. OTel Traces &amp; Metrics&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#475569;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.8;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_3_orchestrator" target="node_11_telemetry">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="55" y="576" />
          <mxPoint x="55" y="1313" />
        </Array>
        <mxPoint x="0" y="340" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="flow_14" value="&lt;b style='color:#1E293B;'&gt;14. SLO Breach Alert&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#475569;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_11_telemetry" target="node_12_sre">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="flow_15_return" value="&lt;b style='color:#15803D;'&gt;15. Signed 200 OK Response&lt;br&gt;(Sub-45ms SLA)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;spacingTop=2;spacingBottom=2;spacingLeft=5;spacingRight=5;fontFamily=Arial;fontSize=10;exitX=0;exitY=0.35;entryX=0.5;entryY=1;" edge="1" parent="1" source="node_3_orchestrator" target="node_1_client">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="65" y="537" />
          <mxPoint x="65" y="248" />
          <mxPoint x="190" y="248" />
        </Array>
        <mxPoint x="35" y="-115" as="offset" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel></diagram></mxfile>`;
}

/**
 * L2 Flowchart (5-Layer Logical Policy Gate, ADK 2.0 Mesh, Persistence & Event Bus with Product Icons)
 */
export function generateGoogleCloudL2LogicalFlowchartXml(customTitle?: string): string {
  const titleText = customTitle?.trim()
    ? esc(customTitle.trim())
    : 'Google Cloud | L2 Logical Policy Gate, Agentic Mesh &amp; Persistence Flowchart';

  return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="gcp_l2_logical_flowchart" name="L2 • Google Cloud 5-Layer Logical Policy &amp; Agent Mesh"><mxGraphModel dx="1460" dy="1040" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1460" pageHeight="1040" background="#FFFFFF">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <mxCell id="canvas_outer_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1">
      <mxGeometry x="20" y="15" width="1420" height="1005" as="geometry" />
    </mxCell>

    <mxCell id="header_banner" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1">
      <mxGeometry x="40" y="25" width="1380" height="60" as="geometry" />
    </mxCell>

    <mxCell id="header_logo" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${GOOGLE_G_LOGO_DATA_URI};" vertex="1" parent="1">
      <mxGeometry x="58" y="37" width="36" height="36" as="geometry" />
    </mxCell>

    <mxCell id="header_text" value="&lt;b style='font-size:16px;color:#0F172A;'&gt;${titleText}&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11.5px;color:#475569;'&gt;5-Layer Logical Architecture (L2): Workspace Ingress &amp;rarr; Apigee Policy Rhombus Gate &amp;rarr; ADK 2.0 Reasoning &amp;rarr; Persistence &amp; Pub/Sub DLQ&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="110" y="32" width="840" height="46" as="geometry" />
    </mxCell>

    <mxCell id="header_badges" value="&lt;span style='background-color:#E0F2FE;color:#0369A1;border:1px solid #7DD3FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;L2 Logical Flow&lt;/span&gt; &lt;span style='background-color:#FEF3C7;color:#B45309;border:1px solid #FDE68A;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;Apigee Policy Gate&lt;/span&gt; &lt;span style='background-color:#DCFCE7;color:#15803D;border:1px solid #86EFAC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;ADK 2.0 Mesh&lt;/span&gt; &lt;span style='background-color:#F3E8FF;color:#7E22CE;border:1px solid #D8B4FE;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;DLQ Retry&lt;/span&gt;" style="text;html=1;align=right;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="960" y="37" width="440" height="36" as="geometry" />
    </mxCell>

    <!-- 5 SWIMLANES -->
    <mxCell id="tier_1_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F0F9FF;fillOpacity=40;strokeColor=#BAE6FD;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="100" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_1_tab" value="&lt;b style='font-size:10px;color:#0369A1;'&gt;TIER 1: ENTERPRISE AGENTIC WORKSPACE &amp; EDGE INGRESS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#E0F2FE;strokeColor=#38BDF8;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="106" width="380" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_2_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFFBEB;fillOpacity=40;strokeColor=#FDE68A;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="280" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_2_tab" value="&lt;b style='font-size:10px;color:#B45309;'&gt;TIER 2: API GATEWAY &amp; ZERO-TRUST POLICY GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="850" y="286" width="310" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_3_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FAF5FF;fillOpacity=40;strokeColor=#E9D5FF;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="470" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_3_tab" value="&lt;b style='font-size:10px;color:#7E22CE;'&gt;TIER 3: COGNITIVE MULTI-AGENT MESH &amp; ADK 2.0 REASONING ENGINE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="476" width="430" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_4_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#ECFDF5;fillOpacity=40;strokeColor=#A7F3D0;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="665" width="1380" height="150" as="geometry" />
    </mxCell>
    <mxCell id="tier_4_tab" value="&lt;b style='font-size:10px;color:#047857;'&gt;TIER 4: IN-MEMORY CACHE, VECTOR STORE &amp; ACID PERSISTENCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#D1FAE5;strokeColor=#10B981;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="671" width="390" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_5_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#EFF6FF;fillOpacity=40;strokeColor=#BFDBFE;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="865" width="1380" height="135" as="geometry" />
    </mxCell>
    <mxCell id="tier_5_tab" value="&lt;b style='font-size:10px;color:#1D4ED8;'&gt;TIER 5: ASYNCHRONOUS EVENT BUS &amp; RESILIENCE QUEUE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="871" width="370" height="20" as="geometry" />
    </mxCell>

    <!-- TIER 1 NODES (3 BALANCED UNITS) -->
    <mxCell id="node_1_client" value="&lt;b style='font-size:12.5px;color:#92400E;'&gt;[1] Gemini Enterprise App&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;Business Generative Portal&lt;br&gt;Multi-Turn Workspaces &amp;bull; SSO&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.8;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="136" width="300" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_1" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.geminiSparkle};" vertex="1" parent="1">
      <mxGeometry x="94" y="148" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_1b_waf" value="&lt;b style='font-size:12.5px;color:#0369A1;'&gt;[1a] Agent Designer Studio&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Vertex Agent Builder Canvas&lt;br&gt;Visual Tool &amp; Policy Definition&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="570" y="136" width="300" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_1b" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.agentDesigner};" vertex="1" parent="1">
      <mxGeometry x="584" y="148" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_1c_gslb" value="&lt;b style='font-size:12.5px;color:#0369A1;'&gt;[1b] Global External LB &amp; WAF&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Cloud Armor L7 Rate Limit&lt;br&gt;HTTPS Anycast VIP Ingress&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1080" y="136" width="300" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_1c" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.cloudArmorShield};" vertex="1" parent="1">
      <mxGeometry x="1094" y="148" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- TIER 2 NODES -->
    <mxCell id="node_2b_reject" value="&lt;b style='font-size:12.5px;color:#991B1B;'&gt;[2b] SIEM Rejection&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#B91C1C;'&gt;401 / 429 Spike Limit&lt;br&gt;Audit Payload to SecOps Chronicle&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="316" width="220" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_2b" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.siemAlert};" vertex="1" parent="1">
      <mxGeometry x="90" y="326" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_2_apigee" value="&lt;b style='font-size:13px;color:#92400E;'&gt;[2] API Gateway (Apigee Enterprise)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;OAuth2 / OIDC JWT Auth &amp;bull; Dynamic PII Masking&lt;br&gt;Spike Arrest &amp; Token Quotas&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=15;spacingRight=15;" vertex="1" parent="1">
      <mxGeometry x="460" y="298" width="520" height="115" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_2" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.apigeeDiamond};" vertex="1" parent="1">
      <mxGeometry x="500" y="343" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_2a_kms" value="&lt;b style='font-size:12.5px;color:#92400E;'&gt;[2a] Cloud KMS &amp; HSM Vault&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;FIPS 140-2 L3 Hardware Security&lt;br&gt;Token Cryptographic Sign &amp; Verify&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="316" width="240" height="80" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_2a" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.kmsLock};" vertex="1" parent="1">
      <mxGeometry x="1150" y="326" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- TIER 3 NODES -->
    <mxCell id="node_3_orchestrator" value="&lt;b style='font-size:13px;color:#6B21A8;'&gt;[3] ADK 2.0 / GKE Orchestrator&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#581C87;'&gt;LangGraph State Machine Router&lt;br&gt;Autonomous Subagent Coordinator&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="80" y="506" width="420" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_3" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.gkeHex};" vertex="1" parent="1">
      <mxGeometry x="92" y="518" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_3_research" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;[3a] Deep Research Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Autonomous Multi-Hop Search&lt;br&gt;Citation Grounding &amp; Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="580" y="506" width="360" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_3r" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.deepResearchSearch};" vertex="1" parent="1">
      <mxGeometry x="592" y="518" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_3a_gemini" value="&lt;b style='font-size:13px;color:#9D174D;'&gt;[3b] Vertex AI Gemini 3.1 Pro&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#831843;'&gt;Multi-Modal Cognitive Engine&lt;br&gt;Chain-of-Thought Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FCE7F3;strokeColor=#DB2777;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="1020" y="506" width="360" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_3g" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.vertexProStar};" vertex="1" parent="1">
      <mxGeometry x="1032" y="518" width="24" height="24" as="geometry" />
    </mxCell>

    <!-- TIER 4 NODES -->
    <mxCell id="node_4_vector" value="&lt;b style='font-size:12.5px;color:#065F46;'&gt;[4] Vertex Vector Search&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;ScaNN Approx Nearest Neighbor&lt;br&gt;768-dim Embeddings &amp;bull; Sub-5ms Recall&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="80" y="706" width="220" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_4" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.vectorCube};" vertex="1" parent="1">
      <mxGeometry x="90" y="726" width="22" height="22" as="geometry" />
    </mxCell>

    <mxCell id="node_5_redis" value="&lt;b style='font-size:13px;color:#065F46;'&gt;[5] Redis MemoryStore&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;Distributed Session Cache &amp;bull; Sub-ms Idempotency Token Engine&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="460" y="706" width="520" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_5" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.redisStack};" vertex="1" parent="1">
      <mxGeometry x="476" y="726" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_6_cloudsql" value="&lt;b style='font-size:12.5px;color:#1E40AF;'&gt;[6] Cloud SQL (PostgreSQL HA)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Multi-AZ Standby ACID Ledger&lt;br&gt;Financial Immutability&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="706" width="240" height="88" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_6" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.cloudSqlDb};" vertex="1" parent="1">
      <mxGeometry x="1150" y="726" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- TIER 5 NODES -->
    <mxCell id="node_7_pubsub" value="&lt;b style='font-size:13px;color:#1E40AF;'&gt;[7] Google Cloud Pub/Sub Distributed Event Mesh&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Topic: agent.events.v1 &amp;bull; Partitioned High-Throughput Event Stream for Agent Coordination&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=24;" vertex="1" parent="1">
      <mxGeometry x="460" y="905" width="520" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_7" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.pubsubNodes};" vertex="1" parent="1">
      <mxGeometry x="476" y="917" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="node_7a_dlq" value="&lt;b style='font-size:12px;color:#6B21A8;'&gt;[7a] Dead-Letter Queue (DLQ)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10px;color:#581C87;'&gt;Poison-Pill Quarantine Bus&lt;br&gt;Exponential Backoff Replay&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=18;" vertex="1" parent="1">
      <mxGeometry x="1140" y="905" width="240" height="75" as="geometry" />
    </mxCell>
    <mxCell id="icon_l2_7a" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.dlqBox};" vertex="1" parent="1">
      <mxGeometry x="1150" y="917" width="22" height="22" as="geometry" />
    </mxCell>

    <!-- FLOW ARROWS -->
    <mxCell id="f1" value="&lt;b style='color:#0284C7;'&gt;1. Author Blueprint&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontSize=10;" edge="1" parent="1" source="node_1_client" target="node_1b_waf"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f1b" value="&lt;b style='color:#0284C7;'&gt;1a. Deploy Ingress&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontSize=10;" edge="1" parent="1" source="node_1b_waf" target="node_1c_gslb"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f2" value="&lt;b style='color:#B45309;'&gt;2. HTTPS Ingress Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_1c_gslb" target="node_2_apigee"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="1230" y="255"/><mxPoint x="720" y="255"/></Array></mxGeometry></mxCell>
    <mxCell id="f2a" value="&lt;b style='color:#B45309;'&gt;2a. Verify JWT&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2a_kms"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f2b" value="&lt;b style='color:#B91C1C;'&gt;2b. Invalid Token (401/429)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#EF4444;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#EF4444;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_2_apigee" target="node_2b_reject"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f3" value="&lt;b style='color:#6B21A8;'&gt;3. Auth'd &amp; PII-Masked Payload&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#9333EA;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_2_apigee" target="node_3_orchestrator"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="720" y="448"/><mxPoint x="290" y="448"/></Array></mxGeometry></mxCell>
    <mxCell id="f4" value="&lt;b style='color:#0284C7;'&gt;4. Multi-Hop Search&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontSize=10;exitX=1;exitY=0.35;entryX=0;entryY=0.35;" edge="1" parent="1" source="node_3_orchestrator" target="node_3_research"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f4b" value="&lt;b style='color:#9D174D;'&gt;4b. CoT Reasoning&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#DB2777;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_3_research" target="node_3a_gemini"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f5" value="&lt;b style='color:#065F46;'&gt;5. Vector RAG Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontSize=10;exitX=0.26;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_4_vector"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f6" value="&lt;b style='color:#065F46;'&gt;6. Read/Write State&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontSize=10;exitX=0.85;exitY=1;entryX=0.12;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_5_redis"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f7" value="&lt;b style='color:#1E40AF;'&gt;7. ACID Commit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;fontSize=10;exitX=0.96;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_3_orchestrator" target="node_6_cloudsql"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="483" y="638"/><mxPoint x="1260" y="638"/></Array></mxGeometry></mxCell>
    <mxCell id="f8" value="&lt;b style='color:#1E40AF;'&gt;8. Publish Domain Events&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_5_redis" target="node_7_pubsub"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f8a" value="&lt;b style='color:#6B21A8;'&gt;8a. DLQ Quarantine&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#9333EA;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;fontSize=9.5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_7_pubsub" target="node_7a_dlq"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="f9_ret" value="&lt;b style='color:#15803D;'&gt;9. Signed 200 OK Response&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontSize=10;exitX=0;exitY=0.35;entryX=0.5;entryY=1;" edge="1" parent="1" source="node_3_orchestrator" target="node_1_client"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="62" y="537"/><mxPoint x="62" y="248"/><mxPoint x="230" y="248"/></Array></mxGeometry></mxCell>
  </root>
</mxGraphModel></diagram></mxfile>`;
}

/**
 * L1 Flowchart (3-Layer Executive Conceptual Google Cloud Architecture with Product Icons & Cylinder3 Datastores)
 */
export function generateGoogleCloudL1ExecutiveFlowchartXml(customTitle?: string): string {
  const titleText = customTitle?.trim()
    ? esc(customTitle.trim())
    : 'Google Cloud | L1 Executive Enterprise Agentic AI Architecture';

  return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="gcp_l1_executive_flowchart" name="L1 • Google Cloud 3-Layer Executive Agentic Architecture"><mxGraphModel dx="1460" dy="740" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1460" pageHeight="740" background="#FFFFFF">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <mxCell id="canvas_outer_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1">
      <mxGeometry x="20" y="15" width="1420" height="705" as="geometry" />
    </mxCell>

    <mxCell id="header_banner" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1">
      <mxGeometry x="40" y="25" width="1380" height="60" as="geometry" />
    </mxCell>

    <mxCell id="header_logo" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${GOOGLE_G_LOGO_DATA_URI};" vertex="1" parent="1">
      <mxGeometry x="58" y="37" width="36" height="36" as="geometry" />
    </mxCell>

    <mxCell id="header_text" value="&lt;b style='font-size:16px;color:#0F172A;'&gt;${titleText}&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11.5px;color:#475569;'&gt;Executive 3-Layer Value Stream (L1): Enterprise Agentic Workspace &amp;rarr; Cognitive Multi-Agent Mesh &amp;rarr; Enterprise Grounding &amp; Lakehouse&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="110" y="32" width="840" height="46" as="geometry" />
    </mxCell>

    <mxCell id="header_badges" value="&lt;span style='background-color:#E0F2FE;color:#0369A1;border:1px solid #7DD3FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;L1 Executive View&lt;/span&gt; &lt;span style='background-color:#DCFCE7;color:#15803D;border:1px solid #86EFAC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;3.4x Target ROI&lt;/span&gt; &lt;span style='background-color:#EEF2FF;color:#4338CA;border:1px solid #A5B4FC;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;HA 99.99%&lt;/span&gt; &lt;span style='background-color:#F3E8FF;color:#7E22CE;border:1px solid #D8B4FE;padding:3px 8px;border-radius:5px;font-weight:bold;font-size:10px;'&gt;Google Cloud AI&lt;/span&gt;" style="text;html=1;align=right;verticalAlign=middle;whiteSpace=wrap;labelBackgroundColor=none;" vertex="1" parent="1">
      <mxGeometry x="960" y="37" width="440" height="36" as="geometry" />
    </mxCell>

    <!-- 3 EXECUTIVE SWIMLANES -->
    <mxCell id="tier_1_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#F0F9FF;fillOpacity=40;strokeColor=#BAE6FD;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="105" width="1380" height="145" as="geometry" />
    </mxCell>
    <mxCell id="tier_1_tab" value="&lt;b style='font-size:10px;color:#0369A1;'&gt;TIER 1: ENTERPRISE AGENTIC WORKSPACE &amp; GLOBAL INGRESS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#E0F2FE;strokeColor=#38BDF8;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="111" width="390" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_2_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FAF5FF;fillOpacity=40;strokeColor=#E9D5FF;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="310" width="1380" height="150" as="geometry" />
    </mxCell>
    <mxCell id="tier_2_tab" value="&lt;b style='font-size:10px;color:#7E22CE;'&gt;TIER 2: COGNITIVE MULTI-AGENT MESH &amp; ADK 2.0 REASONING ENGINE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="316" width="430" height="20" as="geometry" />
    </mxCell>

    <mxCell id="tier_3_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#ECFDF5;fillOpacity=40;strokeColor=#A7F3D0;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="520" width="1380" height="165" as="geometry" />
    </mxCell>
    <mxCell id="tier_3_tab" value="&lt;b style='font-size:10px;color:#047857;'&gt;TIER 3: ENTERPRISE VECTOR KNOWLEDGE, ACID LEDGER &amp; BIGQUERY LAKEHOUSE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#D1FAE5;strokeColor=#10B981;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
      <mxGeometry x="55" y="526" width="460" height="20" as="geometry" />
    </mxCell>

    <!-- TIER 1 NODES -->
    <mxCell id="n1" value="&lt;b style='font-size:13px;color:#92400E;'&gt;[1] Gemini Enterprise App&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#78350F;'&gt;Business Generative Portal&lt;br&gt;Multi-Turn Workspaces &amp;bull; SSO&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.8;align=center;verticalAlign=middle;shadow=1;spacingLeft=20;" vertex="1" parent="1">
      <mxGeometry x="80" y="146" width="340" height="84" as="geometry" />
    </mxCell>
    <mxCell id="ic1" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.geminiSparkle};" vertex="1" parent="1">
      <mxGeometry x="96" y="158" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="n1b" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;[1a] Agent Designer Studio&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Vertex Agent Builder Canvas&lt;br&gt;Visual Tool &amp; Policy Definition&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=20;" vertex="1" parent="1">
      <mxGeometry x="560" y="146" width="340" height="84" as="geometry" />
    </mxCell>
    <mxCell id="ic1b" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.agentDesigner};" vertex="1" parent="1">
      <mxGeometry x="576" y="158" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="n1c" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;[1b] Global External LB &amp; WAF&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Cloud Armor L7 Protection&lt;br&gt;HTTPS Anycast VIP Ingress&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;spacingLeft=20;" vertex="1" parent="1">
      <mxGeometry x="1040" y="146" width="340" height="84" as="geometry" />
    </mxCell>
    <mxCell id="ic1c" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.cloudArmorShield};" vertex="1" parent="1">
      <mxGeometry x="1056" y="158" width="24" height="24" as="geometry" />
    </mxCell>

    <!-- TIER 2 NODES -->
    <mxCell id="n3" value="&lt;b style='font-size:13px;color:#6B21A8;'&gt;[2] ADK 2.0 / GKE Orchestrator&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#581C87;'&gt;LangGraph State Machine Router&lt;br&gt;Autonomous Subagent Coordinator&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="80" y="350" width="380" height="88" as="geometry" />
    </mxCell>
    <mxCell id="ic3" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.gkeHex};" vertex="1" parent="1">
      <mxGeometry x="96" y="362" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="n3r" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;[2a] Deep Research Agent&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#075985;'&gt;Autonomous Multi-Hop Search&lt;br&gt;Citation Grounding &amp; Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="560" y="350" width="360" height="88" as="geometry" />
    </mxCell>
    <mxCell id="ic3r" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.deepResearchSearch};" vertex="1" parent="1">
      <mxGeometry x="576" y="362" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="n3g" value="&lt;b style='font-size:13px;color:#9D174D;'&gt;[2b] Vertex AI Gemini 3.1 Pro&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#831843;'&gt;Multi-Modal Cognitive Engine&lt;br&gt;Chain-of-Thought Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FCE7F3;strokeColor=#DB2777;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=22;" vertex="1" parent="1">
      <mxGeometry x="1020" y="350" width="360" height="88" as="geometry" />
    </mxCell>
    <mxCell id="ic3g" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.vertexProStar};" vertex="1" parent="1">
      <mxGeometry x="1036" y="362" width="24" height="24" as="geometry" />
    </mxCell>

    <!-- TIER 3 NODES (CYLINDER DATASTORES) -->
    <mxCell id="n4" value="&lt;b style='font-size:13px;color:#065F46;'&gt;[3] Vertex Vector Search&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#047857;'&gt;ScaNN Approx Nearest Neighbor&lt;br&gt;768-dim Embeddings &amp;bull; Sub-5ms Recall&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=20;" vertex="1" parent="1">
      <mxGeometry x="80" y="566" width="340" height="92" as="geometry" />
    </mxCell>
    <mxCell id="ic4" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.vectorCube};" vertex="1" parent="1">
      <mxGeometry x="96" y="586" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="n5" value="&lt;b style='font-size:13px;color:#1E40AF;'&gt;[4] Cloud SQL (PostgreSQL HA)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#1D4ED8;'&gt;Multi-AZ Standby ACID Ledger&lt;br&gt;Enterprise State &amp; Audit Persistence&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=20;" vertex="1" parent="1">
      <mxGeometry x="560" y="566" width="360" height="92" as="geometry" />
    </mxCell>
    <mxCell id="ic5" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.cloudSqlDb};" vertex="1" parent="1">
      <mxGeometry x="576" y="586" width="24" height="24" as="geometry" />
    </mxCell>

    <mxCell id="n6" value="&lt;b style='font-size:13px;color:#155E75;'&gt;[5] BigQuery Lakehouse &amp; GCS&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:10.5px;color:#0E7490;'&gt;Partitioned Analytics Lakehouse&lt;br&gt;Executive BI &amp; WORM Cold Storage&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#CFFAFE;strokeColor=#0891B2;strokeWidth=2;align=center;verticalAlign=middle;shadow=1;spacingLeft=20;" vertex="1" parent="1">
      <mxGeometry x="1020" y="566" width="360" height="92" as="geometry" />
    </mxCell>
    <mxCell id="ic6" value="" style="shape=image;html=1;imageAspect=1;aspect=fixed;image=${ICONS.bigqueryLens};" vertex="1" parent="1">
      <mxGeometry x="1036" y="586" width="24" height="24" as="geometry" />
    </mxCell>

    <!-- FLOWS -->
    <mxCell id="e1" value="&lt;b style='color:#0284C7;'&gt;1. Author Blueprint&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontSize=10;" edge="1" parent="1" source="n1" target="n1b"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e1b" value="&lt;b style='color:#0284C7;'&gt;1a. Publish Endpoint&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontSize=10;" edge="1" parent="1" source="n1b" target="n1c"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e2" value="&lt;b style='color:#6B21A8;'&gt;2. Route Enterprise Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#9333EA;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#9333EA;fontSize=10.5;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="n1c" target="n3"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="1210" y="280"/><mxPoint x="270" y="280"/></Array></mxGeometry></mxCell>
    <mxCell id="e3" value="&lt;b style='color:#0284C7;'&gt;3. Multi-Hop Research&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontSize=10;" edge="1" parent="1" source="n3" target="n3r"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e3b" value="&lt;b style='color:#9D174D;'&gt;3a. Gemini Synthesis&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#DB2777;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#DB2777;fontSize=10;" edge="1" parent="1" source="n3r" target="n3g"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e4" value="&lt;b style='color:#065F46;'&gt;4. Semantic Recall&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#059669;fontSize=10;" edge="1" parent="1" source="n3" target="n4"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e5" value="&lt;b style='color:#1E40AF;'&gt;5. ACID State Commit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#2563EB;fontSize=10;" edge="1" parent="1" source="n3r" target="n5"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e6" value="&lt;b style='color:#155E75;'&gt;6. Lakehouse Sync&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0891B2;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#0891B2;fontSize=10;" edge="1" parent="1" source="n5" target="n6"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e7" value="&lt;b style='color:#15803D;'&gt;7. Executive 200 OK Outcome&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontSize=10;exitX=0;exitY=0.5;entryX=0.25;entryY=1;" edge="1" parent="1" source="n3" target="n1"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="58" y="394"/><mxPoint x="58" y="275"/><mxPoint x="165" y="275"/></Array></mxGeometry></mxCell>
  </root>
</mxGraphModel></diagram></mxfile>`;
}
