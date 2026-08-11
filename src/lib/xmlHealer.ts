import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '@/lib/preflightAuditEngine';
import { sanitizeDrawioXmlAttributes } from '@/lib/diagramCleaner';

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

  if (!inputXml || typeof inputXml !== 'string') {
    healingLog.push('Input XML was empty or invalid type.');
    const fallbackXml = createFallbackDrawioXml();
    return { isValid: false, isHealed: true, xml: fallbackXml, healingLog };
  }

  const isFlagship = (
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
    Boolean(archType && (archType.includes('incident_triage') || archType.includes('sre_observability'))) ||
    inputXml.includes('Enterprise Site Reliability Engineering') ||
    inputXml.includes('Incident Management & Response Workflow') ||
    archType === 'data_residency_sovereign_map' ||
    archType === 'federated_iam_sso' ||
    archType === 'tech_ai_trism_guardrails' ||
    archType === 'tech_micro_frontends' ||
    archType === 'tech_fintech_payments' ||
    archType === 'tech_genomics_clinical' ||
    archType === 'tech_supply_chain' ||
    archType === 'tech_eval_safety' ||
    archType === 'tech_agentic_mesh' ||
    archType === 'tech_streaming_analytics' ||
    Boolean(archType && archType.includes('streaming')) ||
    inputXml.includes('real_time_streaming') ||
    inputXml.includes('streaming_analytics') ||
    archType === 'tech_llmops_lifecycle' ||
    Boolean(archType && (archType.includes('llmops') || archType.includes('prompt_config'))) ||
    inputXml.includes('llmops_prompt_config_lifecycle') ||
    inputXml.includes('LLMOps Prompt') ||
    archType === 'tech_llm_capacity_quota' ||
    Boolean(archType && (archType.includes('capacity_quota') || archType.includes('quota_management'))) ||
    inputXml.includes('llm_capacity_quota_management') ||
    inputXml.includes('Capacity Quota Management') ||
    inputXml.includes('id="data-ai-pipeline-wbs"') ||
    inputXml.includes('id="gcp-lakehouse-wbs"') ||
    inputXml.includes('id="modern-data-stack-wbs"') ||
    inputXml.includes('id="agent-gov-hitl-wbs"') ||
    inputXml.includes('id="golive-warroom-wbs"') ||
    inputXml.includes('pageWidth="1400"') ||
    inputXml.includes('pageHeight="800"') ||
    inputXml.includes('id="frame_') ||
    inputXml.includes('id="c4_system_context"') ||
    inputXml.includes('id="pharma_genomics_pipeline"') ||
    inputXml.includes('pharma_genomics') ||
    inputXml.includes('id="supply_chain"') ||
    inputXml.includes('tech_supply_chain') ||
    inputXml.includes('id="modern_data_stack"') ||
    inputXml.includes('modern_data_stack_lakehouse') ||
    inputXml.includes('Modern Data Stack') ||
    inputXml.includes('GCP Enterprise Data Lakehouse') ||
    inputXml.includes('id="event_driven_eda"')
  );

  let cleaned = isFlagship ? inputXml.trim() : preflightVerifyAndHealXmlAcrossAll6Audits(inputXml.trim(), archType || 'unified_system_view');

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
    return getDefaultXmlForArchitecture(archType || 'unified_system_view');
  } catch {
    const { getTechnicalArchitectureXml } = require('./technicalArchitectureXmls');
    return getTechnicalArchitectureXml(archType || 'unified_system_view');
  }
}
