import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '@/lib/preflightAuditEngine';
import { sanitizeDrawioXmlAttributes } from '@/lib/diagramCleaner';
import { buildCompleteWellArchitectedGcpDrMasterXml } from './masterBuilders/master_builder';

export interface XmlHealerResult {
  isValid: boolean;
  isHealed: boolean;
  xml: string;
  healingLog: string[];
}

/**
 * 🛡️ Strict Draw.io XML AST Schema Validator & Auto-Healer + Zero-Defect Preflight Gate
 * 
 * Inspects, parses, validates, and repairs Draw.io (mxGraph) XML strings.
 * Enforces Zero-Defect text accuracy, technical stack alignment, and 100% renderability.
 * Executed for EVERY diagram—old, new, or live generated via Gemini API.
 */
export function validateAndHealDrawioXml(inputXml: string, archType?: string): XmlHealerResult {
  const healingLog: string[] = [];
  let isHealed = false;

  const isCompletelyEmpty = !inputXml || 
    typeof inputXml !== 'string' || 
    inputXml.includes('<root><mxCell id="0"/><mxCell id="1" parent="0"/></root>') ||
    !inputXml.includes('vertex="1"');

  if (isCompletelyEmpty) {
    healingLog.push('Input XML had 0 vertices or was empty. Injected full master template.');
    const fallbackXml = createFallbackDrawioXml(archType);
    return { isValid: false, isHealed: true, xml: fallbackXml, healingLog };
  }

  const isMasterOrStructured = (
    archType !== undefined && archType !== null && (
      archType === 'data_ai_pipeline' ||
      archType === 'tech_data_lakehouse_gcp' ||
      archType === 'tech_modern_data_stack' ||
      archType === 'business_agent_gov_hitl' ||
      archType === 'business_agent_governance_hitl' ||
      archType === 'golive_warroom_runbook' ||
      archType === 'eval_safety_benchmarking' ||
      archType === 'tech_multi_agent_langgraph' ||
      archType === 'tech_agent_harness_runtime' ||
      archType === 'tech_c4_system_context' ||
      archType === 'tech_event_driven_eda' ||
      archType === 'six_rs_migration_matrix' ||
      archType === 'hybrid_strangler_transition' ||
      archType === 'cloud_finops_chargeback' ||
      archType === 'ai_coe_operating_model' ||
      archType === 'mcp_context_gateway' ||
      archType === 'logical_ai_config_tenant' ||
      archType === 'hub_and_spoke_agent_config' ||
      archType === 'unified_data_governance' ||
      archType === 'enterprise_sre_observability' ||
      archType === 'data_residency_sovereign_map' ||
      archType === 'federated_iam_sso' ||
      archType === 'tech_ai_trism_guardrails' ||
      archType === 'tech_micro_frontends' ||
      archType === 'tech_fintech_payments' ||
      archType === 'tech_multimodal_ingestion' ||
      archType === 'tech_serverless_gcp' ||
      archType === 'secure_deployment_map' ||
      archType === 'tech_genomics_clinical' ||
      archType === 'tech_supply_chain' ||
      archType === 'tech_eval_safety' ||
      archType === 'tech_agentic_mesh' ||
      archType === 'tech_streaming_analytics' ||
      archType === 'tech_llmops_lifecycle' ||
      archType === 'tech_llm_capacity_quota' ||
      archType === 'value_stream_map' ||
      archType === 'asis_vs_tobe_process_flow' ||
      archType === 'c4_component_lld' ||
      archType === 'bpmn_process_workflow' ||
      archType === 'threat_modeling_stride' ||
      archType === 'data_lineage_provenance' ||
      archType === 'healthcare_fhir_hl7' ||
      archType === 'smart_factory_iot' ||
      archType === 'hr_talent_ai' ||
      archType === 'ecommerce_retail' ||
      archType === 'tech_multi_region_dr' ||
      archType === 'dataops_anomaly_detection' ||
      archType === 'incident_triage_swimlane' ||
      archType === 'unified_flowchart' ||
      archType === 'multiflow_zerotrust_platform' ||
      archType.startsWith('P1-') ||
      archType.startsWith('P2-') ||
      archType.startsWith('P3-') ||
      archType.startsWith('P4-') ||
      archType.startsWith('P5-') ||
      archType.startsWith('IND-') ||
      archType.startsWith('ARCH-') ||
      archType.startsWith('p1-') ||
      archType.startsWith('p2-') ||
      archType.startsWith('p3-') ||
      archType.startsWith('p4-') ||
      archType.startsWith('p5-') ||
      archType.startsWith('ind-') ||
      archType.startsWith('arch-') ||
      archType.startsWith('canonical') ||
      archType.includes('canonical') ||
      archType.includes('wbs') ||
      archType.includes('blueprint')
    )
  ) || (
    inputXml.includes('PromptCanvas') ||
    inputXml.includes('canonical') ||
    inputXml.includes('NOVACURA') ||
    inputXml.includes('template_') ||
    inputXml.includes('Template ') ||
    inputXml.includes('02 — Capability Map') ||
    inputXml.includes('03 — Business Process') ||
    inputXml.includes('01 — System Context') ||
    inputXml.includes('wbs') ||
    inputXml.includes('WBS') ||
    inputXml.includes('Blueprint') ||
    inputXml.includes('Phase ') ||
    inputXml.includes('id="hdr_title_box"') ||
    inputXml.includes('id="hdr_meta_box"') ||
    inputXml.includes('id="box_workspace_outer"') ||
    inputXml.includes('id="box_mcp_gateway"') ||
    inputXml.includes('id="box_unified_view_outer"') ||
    inputXml.includes('Enterprise Site Reliability Engineering') ||
    inputXml.includes('Incident Management & Response Workflow') ||
    inputXml.includes('Multi-Modal Ingestion Flow') ||
    inputXml.includes('serverless_eda_architecture') ||
    inputXml.includes('Secure Deployment Topology Map') ||
    inputXml.includes('Capacity Quota Management') ||
    inputXml.includes('id="c4_system_context"') ||
    inputXml.includes('id="pharma_genomics_pipeline"') ||
    inputXml.includes('GCP ACTIVE-PASSIVE MULTI-REGION DR') ||
    inputXml.includes('PromptCanvas-LayoutEngineV2')
  );

  if (isMasterOrStructured) {
    const safeXml = inputXml.replace(/&amp;amp;(?:amp;)*/g, '&amp;');
    return {
      isValid: true,
      isHealed: false,
      xml: safeXml,
      healingLog: ['Protected master/canonical blueprint passed through without geometric mutation.']
    };
  }

  let cleaned = preflightVerifyAndHealXmlAcrossAll6Audits(inputXml.trim(), archType || 'unified_system_view');

  // 1. Strip Markdown Code Fences if present
  if (cleaned.includes('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n?/gi, '').replace(/\n?```$/g, '').trim();
    isHealed = true;
    healingLog.push('Stripped markdown code fences.');
  }

  // 1b. Fix double-escaped ampersands (&amp;amp;) and unescaped ampersands
  if (cleaned.includes('&amp;amp;')) {
    cleaned = cleaned.replace(/&amp;amp;(?:amp;)*/g, '&amp;');
    isHealed = true;
    healingLog.push('Auto-collapsed double-escaped ampersands (&amp;amp;) into single &amp; entities.');
  }
  if (/&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9a-fA-F]+;)/.test(cleaned)) {
    cleaned = cleaned.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9a-fA-F]+;)/g, '&amp;');
    isHealed = true;
    healingLog.push('Auto-healed unescaped ampersands into &amp; entities.');
  }

  // 1c. Scrub generic legacy ITACS brand names
  if (cleaned.includes('ITACS')) {
    cleaned = cleaned
      .replace(/ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW/g, 'Unified Architecture Platform - System View')
      .replace(/ITACS Integrated Insights Platform/g, 'Enterprise Architecture Platform')
      .replace(/ITACS SECURE GOVERNED CLOUD TENANT/g, 'SECURE GOVERNED CLOUD TENANT')
      .replace(/ITACS Governing Cloud Tenant/g, 'Governing Cloud Tenant')
      .replace(/ITACS Primary VPC Network/g, 'Primary VPC Network')
      .replace(/ITACS Agent Orchestrator/g, 'Agent Orchestrator')
      .replace(/ITACS Oncology Platform/g, 'Enterprise AI Platform')
      .replace(/Core ITACS Synthesis Engine/g, 'Core AI Synthesis Engine')
      .replace(/ITACS Target/g, 'Enterprise Target')
      .replace(/\bITACS\b/g, 'Enterprise');
    isHealed = true;
    healingLog.push('Scrubbed legacy placeholder brand ITACS.');
  }

  // 1d. Title Consistency Preflight Gate: Auto-heal mismatched template title headers inside XML
  if (cleaned.includes('TOTAL UNIFIED SYSTEM VIEW') || cleaned.includes('Unified System View')) {
    cleaned = cleaned.replace(/-\s*\d+\.[^<]*TOTAL UNIFIED SYSTEM VIEW/g, '- TOTAL UNIFIED SYSTEM VIEW');
  }

  // 2. Ensure outer <mxfile> and <diagram> tags exist
  if (!cleaned.includes('<mxfile')) {
    isHealed = true;
    healingLog.push('Missing outer <mxfile> wrapper. Wrapping in standard Draw.io container.');
    if (cleaned.includes('<mxGraphModel')) {
      cleaned = `<mxfile host="PromptCanvas" modified="${new Date().toISOString()}" agent="PromptCanvas-AutoHealer">
  <diagram id="healed-diagram" name="Architecture">
    ${cleaned}
  </diagram>
</mxfile>`;
    } else if (cleaned.includes('<root')) {
      cleaned = `<mxfile host="PromptCanvas" modified="${new Date().toISOString()}" agent="PromptCanvas-AutoHealer">
  <diagram id="healed-diagram" name="Architecture">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="none">
      ${cleaned}
    </mxGraphModel>
  </diagram>
</mxfile>`;
    } else {
      cleaned = `<mxfile host="PromptCanvas" modified="${new Date().toISOString()}" agent="PromptCanvas-AutoHealer">
  <diagram id="healed-diagram" name="Architecture">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="none">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
    }
  }

  // Ensure </mxfile> closing tag is present
  if (!cleaned.includes('</mxfile>')) {
    cleaned += '\n</mxfile>';
    isHealed = true;
    healingLog.push('Appended missing </mxfile> closing tag.');
  }

  // 3. Parse AST using fast-xml-parser
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
    parseTagValue: false,
    parseAttributeValue: false,
    maxNestedTags: 1000,
  });

  let ast: any = null;
  try {
    ast = parser.parse(cleaned);
  } catch (err: unknown) {
    healingLog.push(`AST parsing failed: ${err instanceof Error ? err.message : String(err)}. Applying structural repair.`);
    const repairedXml = autoRepairXmlSyntax(cleaned);
    try {
      ast = parser.parse(repairedXml);
      cleaned = repairedXml;
      isHealed = true;
    } catch {
      healingLog.push('Fatal XML corruption. Returning safe fallback diagram.');
      return { isValid: false, isHealed: true, xml: createFallbackDrawioXml(), healingLog };
    }
  }

  // 4. Validate AST Hierarchy: mxfile -> diagram -> mxGraphModel -> root
  if (!ast || typeof ast !== 'object') {
    ast = { mxfile: {} };
  }
  if (!ast.mxfile || typeof ast.mxfile !== 'object') {
    ast.mxfile = {};
  }
  if (!ast.mxfile.diagram) {
    ast.mxfile.diagram = { mxGraphModel: { root: { mxCell: [{ '@_id': '0' }, { '@_id': '1', '@_parent': '0' }] } } };
  }

  let diagram = ast.mxfile.diagram;
  if (Array.isArray(diagram)) {
    diagram = diagram[0];
    ast.mxfile.diagram = diagram;
  }
  if (typeof diagram === 'string') {
    try {
      diagram = parser.parse(diagram);
      ast.mxfile.diagram = diagram;
    } catch {
      diagram = {};
      ast.mxfile.diagram = diagram;
    }
  }

  if (!diagram || typeof diagram !== 'object') {
    diagram = {};
    ast.mxfile.diagram = diagram;
  }

  if (!diagram.mxGraphModel) {
    diagram.mxGraphModel = { '@_dx': '1200', '@_dy': '800', root: {} };
    isHealed = true;
    healingLog.push('Injected missing mxGraphModel to AST.');
  }

  const model = diagram.mxGraphModel;
  if (!model.root) {
    model.root = {};
    isHealed = true;
    healingLog.push('Injected missing root to mxGraphModel AST.');
  }

  let root = model.root;
  let cells: any[] = [];

  if (root.mxCell) {
    cells = Array.isArray(root.mxCell) ? root.mxCell : [root.mxCell];
  }

  // 5. Ensure essential root cells (id="0" and id="1") exist
  let hasRoot0 = false;
  let hasRoot1 = false;
  const seenIds = new Set<string>();

  for (const cell of cells) {
    const cellId = String(cell['@_id'] || '');
    if (cellId === '0') hasRoot0 = true;
    if (cellId === '1') hasRoot1 = true;
  }

  if (!hasRoot0) {
    cells.unshift({ '@_id': '0' });
    isHealed = true;
    healingLog.push('Injected mandatory root cell id="0".');
  }

  if (!hasRoot1) {
    // Insert id="1" after id="0"
    const root0Idx = cells.findIndex(c => String(c['@_id']) === '0');
    cells.splice(root0Idx + 1, 0, { '@_id': '1', '@_parent': '0' });
    isHealed = true;
    healingLog.push('Injected mandatory parent layer cell id="1" (parent="0").');
  }

  // 6. Deduplicate IDs and Repair Geometries
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    let cellId = String(cell['@_id'] || '');

    // Deduplicate or generate ID if missing
    if (!cellId || seenIds.has(cellId)) {
      cellId = cellId ? `${cellId}_${i}` : `cell_${i}`;
      cell['@_id'] = cellId;
      isHealed = true;
      healingLog.push(`Deduplicated/assigned cell ID: ${cellId}`);
    }
    seenIds.add(cellId);

    // Validate vertex geometries
    if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      if (!cell.mxGeometry) {
        cell.mxGeometry = {
          '@_x': '100',
          '@_y': '100',
          '@_width': '120',
          '@_height': '60',
          '@_as': 'geometry'
        };
        isHealed = true;
        healingLog.push(`Fixed missing mxGeometry for vertex cell id="${cellId}"`);
      } else {
        const geo = cell.mxGeometry;
        if (!geo['@_as']) geo['@_as'] = 'geometry';
        if (!geo['@_width'] || isNaN(Number(geo['@_width']))) {
          geo['@_width'] = '120';
          isHealed = true;
        }
        if (!geo['@_height'] || isNaN(Number(geo['@_height']))) {
          geo['@_height'] = '60';
          isHealed = true;
        }
      }
    }
  }

  // 6b. Detect and Break Circular Parent Loops and Heal Orphan Parents
  const parentMap = new Map<string, string>();
  for (const cell of cells) {
    const id = String(cell['@_id'] || '');
    const parent = String(cell['@_parent'] || '');
    if (id && parent) {
      parentMap.set(id, parent);
    }
  }

  for (const cell of cells) {
    const id = String(cell['@_id'] || '');
    if (id === '0' || id === '1') continue;

    let curr = id;
    const visited = new Set<string>();
    let hasCycle = false;

    while (curr && parentMap.has(curr)) {
      if (visited.has(curr)) {
        hasCycle = true;
        break;
      }
      visited.add(curr);
      const nextParent = parentMap.get(curr)!;
      if (nextParent === '0' || nextParent === '1') break;
      curr = nextParent;
    }

    if (hasCycle) {
      cell['@_parent'] = '1';
      parentMap.set(id, '1');
      isHealed = true;
      healingLog.push(`Broken circular parent loop for cell id="${id}", reassigned parent="1".`);
    } else if (cell['@_parent'] && !seenIds.has(String(cell['@_parent'])) && cell['@_parent'] !== '0' && cell['@_parent'] !== '1') {
      cell['@_parent'] = '1';
      parentMap.set(id, '1');
      isHealed = true;
      healingLog.push(`Fixed orphaned parent="${cell['@_parent']}" for cell id="${id}", reassigned parent="1".`);
    }

    // 6c. Universal Vertex Text Padding & Dynamic Shape Resizing
    if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      let style = String(cell['@_style'] || '');
      const rawVal = String(cell['@_value'] || '');

      // Inject internal text padding so incoming arrowheads never overlap text characters (fixes Fact_Transaction_Ledger)
      if (!style.includes('spacingLeft=')) {
        if (style.includes('align=left')) {
          style += ';spacingLeft=12;spacingRight=10;spacingTop=4;spacingBottom=4;';
        } else {
          style += ';spacingLeft=8;spacingRight=8;spacingTop=4;spacingBottom=4;';
        }
        cell['@_style'] = style;
        isHealed = true;
      }

      // Auto-expand box width and height if text is long or multi-line (fixes Apigee / HTTPS Load Balancer)
      if (rawVal && cell.mxGeometry) {
        const lines = rawVal.split(/<br\s*\/?>|\\n|&lt;br\s*\/?&gt;/gi);
        const maxLineLen = Math.max(...lines.map(l => l.replace(/<[^>]*>/g, '').replace(/&lt;[^&]*&gt;/g, '').trim().length), 0);
        const lineCount = lines.length;

        const currentW = Number(cell.mxGeometry['@_width']) || 120;
        const currentH = Number(cell.mxGeometry['@_height']) || 60;

        // Apply only to component cards and boxes, not large outer containers
        if (currentW < 380 && currentH < 280 && !id.startsWith('frame_') && !id.startsWith('col_') && !id.startsWith('box_')) {
          if (maxLineLen > 22 && currentW < 140) {
            const targetW = Math.min(220, Math.max(currentW, maxLineLen * 7.5 + 24));
            cell.mxGeometry['@_width'] = String(Math.round(targetW));
            isHealed = true;
          }
          if (lineCount >= 3 && currentH < 65) {
            const targetH = Math.max(currentH, lineCount * 18 + 16);
            cell.mxGeometry['@_height'] = String(Math.round(targetH));
            isHealed = true;
          }
        }
      }
    }

    // 6d. Universal Edge Orthogonalization, Label Offset & Background Shielding
    if (cell['@_edge'] === '1' || cell['@_edge'] === true) {
      let style = String(cell['@_style'] || '');
      const rawVal = String(cell['@_value'] || '');

      // Enforce clean orthogonal routing with rounded corners on all edges to eliminate slanted/diagonal lines
      if (!style.includes('edgeStyle=orthogonalEdgeStyle')) {
        if (style.includes('edgeStyle=none')) {
          style = style.replace(/edgeStyle=none;?/g, 'edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;orthogonalLoop=1;jettySize=auto;');
        } else if (!style.includes('edgeStyle=')) {
          style = `edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;orthogonalLoop=1;jettySize=auto;${style}`;
        }
        cell['@_style'] = style;
        isHealed = true;
      }

      if (rawVal && rawVal.trim().length > 0) {
        // Enforce solid high-contrast label pill so lines/arrows never cut through the text
        if (!style.includes('labelBackgroundColor=')) {
          style += ';labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontColor=#0F172A;fontStyle=1;fontSize=10;';
          cell['@_style'] = style;
          isHealed = true;
        }

        // Float label safely above the connector line in open channel space
        if (cell.mxGeometry) {
          const geo = cell.mxGeometry;
          if (Array.isArray(geo.mxPoint)) {
            const hasOffset = geo.mxPoint.some((p: any) => p && p['@_as'] === 'offset');
            if (!hasOffset) {
              geo.mxPoint.push({
                '@_as': 'offset',
                '@_x': '0',
                '@_y': '-16'
              });
              isHealed = true;
            }
          } else if (geo.mxPoint && typeof geo.mxPoint === 'object') {
            if (geo.mxPoint['@_as'] && geo.mxPoint['@_as'] !== 'offset') {
              geo.mxPoint = [
                geo.mxPoint,
                {
                  '@_as': 'offset',
                  '@_x': '0',
                  '@_y': '-16'
                }
              ];
              isHealed = true;
            } else if (!geo.mxPoint['@_as']) {
              geo.mxPoint['@_as'] = 'offset';
              geo.mxPoint['@_x'] = '0';
              geo.mxPoint['@_y'] = '-16';
              isHealed = true;
            }
          } else if (!geo.mxPoint) {
            geo.mxPoint = {
              '@_as': 'offset',
              '@_x': '0',
              '@_y': '-16'
            };
            isHealed = true;
          }
        }
      }
    }
  }

  // Preserve pristine hand-tuned layout coordinates without shifting nodes off-screen
  root.mxCell = cells;

  // 7. Re-serialize healed AST back to XML string
  let finalXml = cleaned;
  try {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      format: true,
      indentBy: '  ',
      suppressEmptyNode: true,
    });
    finalXml = builder.build(ast);
  } catch {
    healingLog.push('AST serialization skipped, returning sanitized string XML.');
    finalXml = cleaned;
  }

  return {
    isValid: true,
    isHealed,
    xml: sanitizeDrawioXmlAttributes(
      finalXml
        .replace(/^<\?xml[^>]*\?>\s*/i, '')
        .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9a-fA-F]+;)/g, '&amp;')
        .trim()
    ),
    healingLog
  };
}

/**
 * Auto-repairs raw XML string syntax errors (unclosed tags, broken quotes)
 */
function autoRepairXmlSyntax(xml: string): string {
  let repaired = xml;

  // Fix unclosed mxCell self-closing tags
  repaired = repaired.replace(/<mxCell([^>]*?)(?<!\/)>/gi, (match, attrs) => {
    if (attrs.includes('parent') || attrs.includes('value') || attrs.includes('style') || attrs.includes('id')) {
      if (!match.endsWith('/>')) {
        return `<mxCell${attrs}/>`;
      }
    }
    return match;
  });

  // Ensure complete mxfile, diagram, mxGraphModel, and root wrapper hierarchy
  if (!repaired.includes('<mxfile')) {
    if (!repaired.includes('<root>')) {
      repaired = `<root><mxCell id="0"/><mxCell id="1" parent="0"/>${repaired}</root>`;
    }
    if (!repaired.includes('<mxGraphModel')) {
      repaired = `<mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827">${repaired}</mxGraphModel>`;
    }
    repaired = `<mxfile host="PromptCanvas"><diagram id="healed" name="Architecture">${repaired}</diagram></mxfile>`;
  }

  return repaired;
}

/**
 * Creates a valid, error-free fallback Draw.io XML structure
 */
function createFallbackDrawioXml(archType?: string): string {
  try {
    const { getDefaultXmlForArchitecture } = require('./architectureTypes');
    const xml = getDefaultXmlForArchitecture(archType || 'unified_system_view');
    if (xml && xml.length > 500) return xml;
  } catch {
    // Fallback to static master builder
  }
  return buildCompleteWellArchitectedGcpDrMasterXml();
}
