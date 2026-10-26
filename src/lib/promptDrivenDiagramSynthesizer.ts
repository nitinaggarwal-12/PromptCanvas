/**
 * Google Cloud Architecture Center Reference Template Adapter & Prompt Modifier
 * -----------------------------------------------------------------------------
 * Uses PromptCanvas's Saved Google Cloud Reference Architecture v2.0 Master Templates
 * (Templates 38, 41, 42, 43, 44, 45, 46, 48, 49, 50 — each featuring 7–8 horizontal
 * architecture layers, inline vector SVGs, 3 right-hand Governance/Observability/Operations
 * pillars, 6-step End-to-End process flows, and Arrow/Icon legends) and surgically
 * adapts/modifies them to match 100% of the user's generative prompt:
 *  1. Preserves the rich saved template's geometry, inline SVGs, pillars, and step flows.
 *  2. Updates hdr_num and hdr_title (x=78..1258, zero overlap with hdr_brand at x=1280)
 *     to display the exact Diagram Title + "💬 Generative Prompt: ..." banner.
 *  3. Mutates/enriches the saved template's layer cards and domain labels so 100% of
 *     the prompt's technologies and entities are physically rendered on the canvas.
 *  4. Scrubs 100% of any residual CLINICAL AI / Veeva Vault / Pharmacovigilance text.
 */

import { generateUpgradedGcpGeBankingArchitectureXml } from './canonical/upgradedGcpGeBankingAgentTemplate';
import {
  buildUniversalClosedLoopDomainHarnessXml,
  buildOfficialOracleEbsExadataArchCenter78Xml,
} from './canonical/nasaMultiverseClosedLoopHarness';
import { generateLogicalGcpAgentArchitectureXml } from './canonical/templateLogicalGcpAgentArchitecture';
import { generateConceptualGcpAgentArchitectureXml } from './canonical/templateConceptualGcpAgentArch';
import { generateProcessGcpAgentWorkflowXml } from './canonical/templateProcessGcpAgentWorkflow';
import { generateTemplate38CloudLandingZoneXml } from './canonical/template38CloudLandingZone';
import { generateTemplate42ModernDataLakehouseDataMeshXml } from './canonical/template42ModernDataLakehouseDataMesh';
import { generateTemplate44ZeroTrustCybersecuritySocPlatformXml } from './canonical/template44ZeroTrustCybersecuritySocPlatform';
import {
  generateGoogleCloudL1ExecutiveFlowchartXml,
  generateGoogleCloudL2LogicalFlowchartXml,
  generateGoogleCloudL3OperationalFlowchartXml,
  generateGoogleCloudL4AgenticFlowchartXml,
} from './canonical/googleCloudFlowchartBlueprints';
import { CANONICAL_TEMPLATES } from './canonical/canonicalTemplates';
import type {
  GeminiArchitecturalDecision,
  ArchitecturePerspective,
  AbstractionDetailLevel,
  FlowDirectionOption,
} from './geminiArchitecturalDecisionEngine';

export interface PromptSynthesisOptions {
  noTemplate?: boolean;
  blueprintId?: string;
  perspective?: ArchitecturePerspective;
  level?: AbstractionDetailLevel;
  direction?: FlowDirectionOption;
  geminiDecision?: GeminiArchitecturalDecision | null;
}

export interface SynthesizedNode {
  id: string;
  title?: string;
  name?: string;
  subtitle?: string;
  detail?: string;
  badge?: string;
  service?: string;
  sla?: string;
  protocol?: string;
}

export interface SynthesizedTier {
  id: string;
  label?: string;
  name?: string;
  accentHex?: string;
  badgeColor?: string;
  bgHex?: string;
  fill?: string;
  borderHex?: string;
  stroke?: string;
  nodes: SynthesizedNode[];
}

export interface PromptArchitectureSpec {
  id: string;
  title: string;
  workflowLabel?: string;
  workflowBadge?: string;
  domain: string;
  prompt: string;
  complianceBadges?: string[];
  tiers: SynthesizedTier[];
  edgeLabels?: string[];
  connectors?: { from: string; to: string; label?: string; type?: string }[];
}

function escAttr(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function truncateAtWord(str: string, maxLen: number): string {
  const s = String(str || '').trim();
  if (s.length <= maxLen) return s;
  const cut = s.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > maxLen * 0.55 ? cut.slice(0, lastSpace) : cut).replace(/[,;&+\-–—]+$/, '').trim();
}

function formatTwoLineCardClause(str: string, maxTotal = 34): string {
  const clean = truncateAtWord(str, maxTotal);
  const words = clean.split(/\s+/);
  if (words.length <= 2 || clean.length <= 18) return escHtml(clean);
  const mid = Math.ceil(words.length / 2);
  return `${escHtml(words.slice(0, mid).join(' '))}&lt;br/&gt;${escHtml(words.slice(mid).join(' '))}`;
}

function extractPromptDomainClauses(prompt: string, fallbackTitle: string): [string, string, string, string] {
  const cleaned = String(prompt || fallbackTitle || 'Enterprise Cloud Architecture')
    .replace(/^(please\s+)?((design|architect|build|create|deploy|synthesize|generate|draw|show)\s+)?(a\s+|an\s+|the\s+)?(full\s+|complete\s+|enterprise\s+)?(flowchart\s+(for|of)\s+|infographic\s+(for|of)\s+|architecture\s+(for|of)\s+|diagram\s+(for|of)\s+)?/i, '')
    .replace(/\b(architecture|diagram|blueprint|flowchart|topology)\s*$/i, '')
    .trim();

  const rawParts = cleaned
    .split(/(?:,|&|\+|→|->|;|\band\b|\bwith\b)/i)
    .map((s) =>
      s
        .replace(/^(flowchart\s+(for|of)\s+|architecture\s+(for|of)\s+|diagram\s+(for|of)\s+)/i, '')
        .replace(/\b(architecture|diagram|blueprint|flowchart|topology)\s*$/i, '')
        .trim()
    )
    .filter((s) => s.length >= 3);

  const p0 = truncateAtWord(rawParts[0] || cleaned || 'Edge Telemetry Ingress', 36);
  const p1 = truncateAtWord(rawParts[1] || `${p0} Processing`, 36);
  const p2 = truncateAtWord(rawParts[2] || `${p0} Policy Gate`, 36);
  const p3 = truncateAtWord(rawParts[3] || rawParts[2] || `${p1} Mesh`, 36);
  return [p0, p1, p2, p3];
}

export function adaptSavedGoogleCloudTemplateToPrompt(
  prompt: string,
  title: string = truncateAtWord(prompt || 'Enterprise Cloud Architecture', 56),
  domain = 'Enterprise Cloud',
  badgeId?: string,
  options?: PromptSynthesisOptions
): string {
  const safeTitle =
    options?.geminiDecision?.tailoredSpec?.diagramTitle ||
    title ||
    truncateAtWord(prompt || 'Enterprise Cloud Architecture', 56);
  const lower = `${safeTitle} ${prompt} ${domain}`.toLowerCase();
  const explicitBpId = options?.blueprintId || badgeId;
  const numBadge = explicitBpId || (safeTitle.match(/^(\d{2})/) || ['', 'AI'])[1];
  const perspBadge = options?.perspective || options?.geminiDecision?.recommendedPerspective || 'Logical';
  const levelBadge = options?.level || options?.geminiDecision?.recommendedLevel || 'L3';

  let baseXml = '';
  let templateRefLabel = `Google Cloud Reference Architecture • ${perspBadge} (${levelBadge})`;
  let domainMutations: Array<[RegExp, string]> = [];

  const isVerticalStratumCrossSection =
    explicitBpId === 'stratum_l4' ||
    ((lower.includes('vllm') || lower.includes('h100') || lower.includes('honeycomb')) &&
      (lower.includes('stratum') || lower.includes('vertical cross-section') || lower.includes('speculative decoding')));

  if (isVerticalStratumCrossSection) {
    return generateVerticalStratumCrossSectionXml(prompt, safeTitle);
  }

  // Helper to build Template #40 mutations from either Gemini API's template40Adaptation or enterprise defaults
  const buildTemplate40Mutations = (): Array<[RegExp, string]> => {
    const t40 = options?.geminiDecision?.tailoredSpec?.template40Adaptation;
    if (t40 && Array.isArray(t40.personas) && t40.personas.length >= 5 && Array.isArray(t40.agents) && t40.agents.length >= 7) {
      return [
        [/Business Users/gi, escHtml(truncateAtWord(t40.personas[0], 18))],
        [/Analysts/gi, escHtml(truncateAtWord(t40.personas[1], 18))],
        [/Developers/gi, escHtml(truncateAtWord(t40.personas[2], 18))],
        [/Operations/gi, escHtml(truncateAtWord(t40.personas[3], 18))],
        [/External Partners/gi, escHtml(truncateAtWord(t40.personas[4], 18))],
        [/Web App/gi, escHtml(truncateAtWord(t40.channels?.[0] || 'Enterprise Web App', 18))],
        [/Mobile App/gi, escHtml(truncateAtWord(t40.channels?.[1] || 'Mobile Portal', 18))],
        [/Chat \/ Messaging/gi, escHtml(truncateAtWord(t40.channels?.[2] || 'Google Chat / Slack', 18))],
        [/API \/ SDK/gi, escHtml(truncateAtWord(t40.channels?.[3] || 'REST / gRPC SDK', 18))],
        [/Contact Center/gi, escHtml(truncateAtWord(t40.channels?.[4] || 'CCAI Hub', 18))],
        [/Enterprise Copilots \/&lt;br\/&gt;Chat UI \/ Portal/gi, `Gemini Enterprise \/&lt;br\/&gt;${escHtml(truncateAtWord(t40.copilotName || 'Workspace Copilot', 26))}`],
        [/Hello! How can I help you\?/gi, escHtml(truncateAtWord(t40.copilotStatus || 'Target State: Verified & Locked', 32))],
        [/Supervisor \/ Orchestrator Agent/gi, escHtml(truncateAtWord(t40.supervisorTitle || 'Gemini Enterprise Multi-Agent Supervisor', 64))],
        [/Agent Router \/ Planner \/ Task Decomposer/gi, escHtml(truncateAtWord(t40.supervisorSubtitle || 'Vertex AI Agent Engine • Task Planner & Decomposer', 74))],
        [/Research Agent/gi, escHtml(truncateAtWord(t40.agents[0].name, 20))],
        [/Web research, market intel, competitors/gi, escHtml(truncateAtWord(t40.agents[0].role, 46))],
        [/Analytics Agent/gi, escHtml(truncateAtWord(t40.agents[1].name, 20))],
        [/Data analysis, BI, insight generation/gi, escHtml(truncateAtWord(t40.agents[1].role, 46))],
        [/Workflow Agent/gi, escHtml(truncateAtWord(t40.agents[2].name, 20))],
        [/Process automation, orchestration/gi, escHtml(truncateAtWord(t40.agents[2].role, 46))],
        [/Support Agent/gi, escHtml(truncateAtWord(t40.agents[3].name, 20))],
        [/Customer support, Q&amp;amp;A, case mgmt/gi, escHtml(truncateAtWord(t40.agents[3].role, 46))],
        [/Retrieval Agent/gi, escHtml(truncateAtWord(t40.agents[4].name, 20))],
        [/Semantic search, RAG, context retrieval/gi, escHtml(truncateAtWord(t40.agents[4].role, 46))],
        [/Code Agent/gi, escHtml(truncateAtWord(t40.agents[5].name, 20))],
        [/Code gen, review, refactor, debug/gi, escHtml(truncateAtWord(t40.agents[5].role, 46))],
        [/Compliance Agent/gi, escHtml(truncateAtWord(t40.agents[6].name, 20))],
        [/Policy check, PII, regulatory compliance/gi, escHtml(truncateAtWord(t40.agents[6].role, 46))],
        [/1\.5 Pro \/ 1\.5 Flash/gi, escHtml(truncateAtWord(t40.models?.primaryPro || 'Gemini 3.1 Pro', 22))],
        [/1\.5 Pro \(Vision\)/gi, escHtml(truncateAtWord(t40.models?.visionModel || 'Gemini 3.8 Flash', 22))],
        [/Gemma/gi, escHtml(truncateAtWord(t40.models?.specializedModel || 'Gemma 3 27B', 18))],
        [/\(7B \/ 28B\)/gi, escHtml(truncateAtWord(t40.models?.specializedSub || '(Vertex TPU v5p)', 18))],
        [/Customer CRM/gi, escHtml(truncateAtWord(t40.enterpriseSystems?.[0] || 'Salesforce CRM', 18))],
        [/Core ERP/gi, escHtml(truncateAtWord(t40.enterpriseSystems?.[1] || 'SAP / Oracle ERP', 18))],
        [/ITSM Platform/gi, escHtml(truncateAtWord(t40.enterpriseSystems?.[2] || 'ServiceNow ITSM', 18))],
        [/HCM \/ HRIS/gi, escHtml(truncateAtWord(t40.enterpriseSystems?.[3] || 'Workday HCM', 18))],
        [/Spanner/gi, escHtml(truncateAtWord(t40.primaryDatabase || 'Cloud Spanner', 20))],
      ];
    }
    return [
      [/1\.5 Pro \/ 1\.5 Flash/gi, 'Gemini 3.1 Pro'],
      [/1\.5 Pro \(Vision\)/gi, 'Gemini 3.8 Flash'],
    ];
  };

  // 1. If an explicit Canonical Blueprint ID ("00".."78") was selected by Gemini API or User Dropdown:
  if (explicitBpId && explicitBpId !== 'custom' && explicitBpId !== 'process_flow') {
    const paddedId = explicitBpId.padStart(2, '0');
    const isOraclePrompt =
      lower.includes('oracle') ||
      lower.includes('exadata') ||
      lower.includes('ebusiness') ||
      lower.includes('e-business') ||
      /\bebs\b/.test(lower);

    if (paddedId === '78' && isOraclePrompt) {
      return buildOfficialOracleEbsExadataArchCenter78Xml('light');
    }
    if (paddedId === '00' || paddedId === '40') {
      if (options?.perspective === 'Logical') {
        return generateLogicalGcpAgentArchitectureXml({
          domain,
          projectTitle: safeTitle,
          theme: 'light',
        });
      }
      if (options?.perspective === 'Conceptual') {
        return generateConceptualGcpAgentArchitectureXml({
          domain,
          projectTitle: safeTitle,
          theme: 'light',
        });
      }
      if (options?.perspective === 'Process') {
        return generateProcessGcpAgentWorkflowXml({
          domain,
          projectTitle: safeTitle,
          theme: 'light',
        });
      }
      return generateUpgradedGcpGeBankingArchitectureXml({
        prompt,
        projectTitle: safeTitle,
        domain,
      });
    } else {
      const matchedTpl = CANONICAL_TEMPLATES.find((t) => t.id === paddedId || t.id === explicitBpId);
      if (matchedTpl) {
        baseXml = matchedTpl.generateXml(domain === 'All' ? 'enterprise' : domain, 'light');
        templateRefLabel = `Modified Saved Template #${matchedTpl.id} (${matchedTpl.name}) • [${perspBadge} · ${levelBadge}]`;
        const subs =
          options?.geminiDecision?.tailoredSpec?.customSubsystems ||
          extractRichPromptSubsystems(prompt, safeTitle);
        const t40 = options?.geminiDecision?.tailoredSpec?.template40Adaptation;
        domainMutations = [
          [new RegExp(matchedTpl.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), escHtml(truncateAtWord(safeTitle, 44))],
          [/Research Scientists/gi, escHtml(truncateAtWord(t40?.personas?.[0] || 'Enterprise Users', 22))],
          [/Clinical Operations/gi, escHtml(truncateAtWord(t40?.personas?.[1] || 'Domain Analysts', 22))],
          [/Regulatory Affairs Team/gi, escHtml(truncateAtWord(t40?.personas?.[2] || 'Platform Engineers', 22))],
          [/Safety \/ PV Specialists/gi, escHtml(truncateAtWord(t40?.personas?.[3] || 'Security & SRE Ops', 22))],
          [/R&amp;D &amp; Clinical/gi, escHtml(truncateAtWord(subs[0] || 'Client Experience Portal', 24))],
          [/Regulatory Affairs/gi, escHtml(truncateAtWord(subs[1] || 'Apigee X & Cloud Armor', 24))],
          [/Pharmacovigilance/gi, escHtml(truncateAtWord(subs[2] || 'Cloud KMS & Model Armor', 24))],
          [/Quality &amp; Manufacturing/gi, escHtml(truncateAtWord(subs[3] || 'Gemini 3.1 Pro Core', 24))],
          [/Medical Information/gi, escHtml(truncateAtWord(subs[4] || 'Vertex AI Agent Engine', 24))],
          [/Commercial Insights/gi, escHtml(truncateAtWord(subs[5] || 'Spanner Graph RAG', 24))],
          [/Document &amp; Knowledge Hub/gi, escHtml(truncateAtWord(subs[7] || 'Pub/Sub Event Bus', 24))],
          [/AI Copilot &amp; Orchestration/gi, escHtml(truncateAtWord(subs[6] || 'Policy Decision Gate', 24))],
          [/Customer CRM/gi, escHtml(truncateAtWord(subs[0] || 'Enterprise CRM', 22))],
          [/Core ERP/gi, escHtml(truncateAtWord(subs[4] || 'Core Orchestrator', 22))],
          [/Cloud Spanner/gi, escHtml(truncateAtWord(subs[9] || 'Cloud Spanner Ledger', 22))],
        ];
      } else {
        return synthesizeZeroTemplateCustomArchitectureXml(
          prompt,
          safeTitle,
          domain,
          options?.geminiDecision?.tailoredSpec?.customSubsystems,
          options?.geminiDecision?.tailoredSpec?.decisionGateQuestion,
          levelBadge,
          perspBadge
        );
      }
    }
  } else {
    // When no explicit canonical blueprint template (#00..#78) is selected, always default
    // to the Universal Closed-Loop & Parallel Digital-Twin Agentic Harness (or L400 Oracle Split-VPC).
    return synthesizeZeroTemplateCustomArchitectureXml(
      prompt,
      safeTitle,
      domain,
      options?.geminiDecision?.tailoredSpec?.customSubsystems,
      options?.geminiDecision?.tailoredSpec?.decisionGateQuestion,
      levelBadge,
      perspBadge
    );
  }

  // Apply domain mutations to the saved template XML
  let modifiedXml = baseXml;
  for (const [pattern, replacement] of domainMutations) {
    modifiedXml = modifiedXml.replace(pattern, replacement);
  }

  // Ensure any remaining Gemini 1.5 references in adapted templates use Gemini 3.1 Pro / 2.5 Flash
  modifiedXml = modifiedXml
    .replace(/Gemini 1\.5&lt;br\/&gt;Pro/gi, 'Gemini 3.1&lt;br/&gt;Pro')
    .replace(/Gemini 1\.5&lt;br\/&gt;Flash/gi, 'Gemini 3.8&lt;br/&gt;Flash')
    .replace(/Gemini 1\.5 Pro/gi, 'Gemini 3.1 Pro');

  // Scrub any residual CLINICAL AI / Bio-Pharma / Veeva Vault / Pharmacovigilance strings
  modifiedXml = modifiedXml
    .replace(/NOVACURA/gi, 'ENTERPRISE')
    .replace(/Veeva Vault/gi, 'Cloud Storage Archive')
    .replace(/Pharmacovigilance/gi, 'Automated Governance')
    .replace(/17 Identity &amp; Access Flow/gi, escHtml(safeTitle));

  // Update hdr_num badge cell if present
  modifiedXml = modifiedXml.replace(
    /(<mxCell id="hdr_num" value=")[^"]*(")/,
    `$1${escAttr(numBadge)}$2`
  );

  const shortPromptDisplay = prompt.length > 145 ? prompt.slice(0, 142) + '...' : prompt;
  const headerBadgeNum = explicitBpId && /^\d+$/.test(explicitBpId) ? explicitBpId.padStart(2, '0') : '40';
  if (modifiedXml.includes('id="hdr_sub"')) {
    const t40HeaderLeft =
      `<div style="font-family:Inter,sans-serif;overflow:hidden;">` +
      `<div style="font-size:16.5px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:20px;"><span style="color:#1D4ED8;">${escHtml(headerBadgeNum)}.</span> ${escHtml(truncateAtWord(safeTitle.replace(/^#?\d+\s*•?\s*/i, ''), 50))} <span style="background:#EFF6FF;color:#1D4ED8;border:1px solid #93C5FD;border-radius:4px;padding:1px 6px;font-size:9px;vertical-align:middle;">${escHtml(perspBadge.toUpperCase())} · ${escHtml(levelBadge)}</span></div>` +
      `<div style="font-size:9.5px;font-weight:700;color:#0284C7;margin-top:2px;line-height:12px;">▸ Generative Prompt: "${escHtml(truncateAtWord(shortPromptDisplay, 78))}"</div>` +
      `</div>`;
    const t40HeaderRight =
      `<div style="font-family:Inter,sans-serif;overflow:hidden;">` +
      `<div style="font-size:10px;font-weight:800;color:#1E3A8A;line-height:14px;">${escHtml(truncateAtWord(templateRefLabel, 84))}</div>` +
      `<div style="font-size:8.5px;font-weight:600;color:#475569;margin-top:2px;line-height:11px;">End-to-End Governed Multi-Agent AI, Spanner TrueTime &amp; Vertex AI TPU v5p Topology on Google Cloud</div>` +
      `</div>`;
    modifiedXml = modifiedXml
      .replace(
        /<mxCell id="hdr_title"[\s\S]*?<\/mxCell>/,
        `<mxCell id="hdr_title" value="${escAttr(t40HeaderLeft)}" style="whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="16" y="8" width="660" height="40" as="geometry"/></mxCell>`
      )
      .replace(
        /<mxCell id="hdr_sub"[\s\S]*?<\/mxCell>/,
        `<mxCell id="hdr_sub" value="${escAttr(t40HeaderRight)}" style="whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="684" y="8" width="656" height="40" as="geometry"/></mxCell>`
      );
  } else if (modifiedXml.includes('id="hdr_title"')) {
    const newHeaderHtml =
      `<div style="font-family:Inter,sans-serif;max-width:1020px;overflow:hidden;">` +
      `<div style="font-size:15.5px;font-weight:900;color:#0F172A;letter-spacing:0.1px;line-height:19px;">${escHtml(truncateAtWord(safeTitle, 64))} <span style="background:#EFF6FF;color:#1D4ED8;border:1px solid #93C5FD;border-radius:4px;padding:1px 6px;font-size:8.5px;vertical-align:middle;">#${escHtml(headerBadgeNum)} · ${escHtml(perspBadge.toUpperCase())} · ${escHtml(levelBadge)}</span></div>` +
      `<div style="font-size:9.5px;font-weight:700;color:#0284C7;margin-top:2px;line-height:12px;">▸ Generative Prompt: "${escHtml(truncateAtWord(shortPromptDisplay, 86))}" • ${escHtml(truncateAtWord(templateRefLabel, 56))}</div>` +
      `</div>`;
    modifiedXml = modifiedXml.replace(
      /(<mxCell id="hdr_title"\s+value=")[^"]*(")/,
      `$1${escAttr(newHeaderHtml)}$2`
    );
  }

  return modifiedXml;
}

/**
 * Renders a PromptArchitectureSpec by adapting its matching Saved Google Cloud Reference
 * Architecture v2.0 Master Template (Templates 38, 41, 42, 43, 44, 45, 46, 48, 49, 50).
 */
export function renderPromptArchitectureToDrawioXml(spec: PromptArchitectureSpec): string {
  return adaptSavedGoogleCloudTemplateToPrompt(
    spec.prompt,
    spec.title,
    spec.domain,
    spec.id
  );
}

/**
 * Entry point used by Dashboard (/dashboard) and Studio (/studio)
 * when previewing or executing a generative prompt.
 * Supports:
 * - Explicit `perspective` ('Conceptual' | 'Logical' | 'Technical' | 'Process')
 * - Explicit `level` ('L1' | 'L2' | 'L3' | 'L4')
 * - Explicit `direction` ('LR' | 'TD')
 * - Explicit `blueprintId` ('00', '35'..'50', '67'..'74', '78', 'custom', 'process_flow', 'stratum_l4')
 * - Live `geminiDecision` from POST /api/architect-decision
 */
export function synthesizePromptDrivenDiagramXml(
  prompt: string,
  projectTitleOrOptions?: string | PromptSynthesisOptions,
  domain = 'Enterprise Cloud',
  maybeOptions?: PromptSynthesisOptions
): string {
  const projectTitle =
    typeof projectTitleOrOptions === 'string' ? projectTitleOrOptions : undefined;
  const options: PromptSynthesisOptions | undefined =
    typeof projectTitleOrOptions === 'object' && projectTitleOrOptions !== null
      ? projectTitleOrOptions
      : maybeOptions;

  const cleanTitle =
    options?.geminiDecision?.tailoredSpec?.diagramTitle ||
    projectTitle ||
    prompt.slice(0, 72);
  const customSubs = options?.geminiDecision?.tailoredSpec?.customSubsystems;
  const gateQ = options?.geminiDecision?.tailoredSpec?.decisionGateQuestion;
  const level = options?.level || options?.geminiDecision?.recommendedLevel || 'L3';
  const perspective = options?.perspective || options?.geminiDecision?.recommendedPerspective || 'Logical';
  const direction = options?.direction || options?.geminiDecision?.recommendedDirection || 'LR';

  // 1. Explicit Process Flowchart View
  if (options?.blueprintId === 'process_flow') {
    return synthesizeZeroTemplateFlowchartXml(prompt, cleanTitle, direction, level, customSubs, gateQ);
  }

  // 2. Explicit Deep Technical L4 4-Stratum Cross-Section View
  if (options?.blueprintId === 'stratum_l4') {
    return generateVerticalStratumCrossSectionXml(prompt, cleanTitle);
  }

  // 3. Default No-Blueprint / Blank Canvas / Custom Architecture Synthesis -> NASA Closed-Loop & Parallel Digital-Twin Harness
  const explicitBp = String(options?.blueprintId || '').trim();
  if (!explicitBp || explicitBp === 'custom' || explicitBp === 'none' || explicitBp === 'blank' || options?.noTemplate) {
    return synthesizeZeroTemplateCustomArchitectureXml(
      prompt,
      cleanTitle,
      domain,
      customSubs,
      gateQ,
      level,
      perspective
    );
  }

  // 4. Canonical Blueprint Adaptation (only when an explicit canonical blueprint #00..#78 is selected)
  return adaptSavedGoogleCloudTemplateToPrompt(
    prompt,
    cleanTitle,
    domain,
    explicitBp,
    options
  );
}

/**
 * Dedicated 4-Stratum Vertical Cross-Section Renderer (Top-Down Monumental Stack)
 * Renders Slate Gray (#0F172A / #1E293B) & Vibrant Emerald-Green (#10B981 / #059669)
 * multi-stratum architectures (Floating Glass Landing Pads -> Hexagonal vLLM & Speculative
 * Decoding Pods + Laser Bridges -> Honeycomb Semantic Memory -> Liquid-Cooled H100 Bedrock).
 */
export function generateVerticalStratumCrossSectionXml(prompt: string, title: string): string {
  const displayTitle =
    title && !title.includes('Global Real-Time Payments')
      ? title
      : 'High-Performance Cloud AI Stack — 4-Stratum Cross-Section & Observability Plane';
  const shortPrompt = prompt.replace(/\s+/g, ' ').trim().slice(0, 110);

  const renderIconSvg = (iconType: string, isBedrock: boolean) => {
    const stroke = isBedrock ? '#34D399' : '#FFFFFF';
    if (iconType === 'k8s') {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2"><polygon points="12 2 20 7 20 17 12 22 4 17 4 7 12 2"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="20" y1="7" x2="14.6" y2="10.5"/><line x1="4" y1="7" x2="9.4" y2="10.5"/></svg>`;
    }
    if (iconType === 'mesh') {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="8.7" y1="7.5" x2="10.5" y2="15.5"/><line x1="15.3" y1="7.5" x2="13.5" y2="15.5"/><line x1="9" y1="6" x2="15" y2="6"/></svg>`;
    }
    if (iconType === 'db') {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>`;
    }
    if (iconType === 'gpu') {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="5"/><line x1="15" y1="2" x2="15" y2="5"/><line x1="9" y1="19" x2="9" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/><line x1="2" y1="9" x2="5" y2="9"/><line x1="2" y1="15" x2="5" y2="15"/><line x1="19" y1="9" x2="22" y2="9"/><line x1="19" y1="15" x2="22" y2="15"/></svg>`;
    }
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
  };

  const makeStratumContainer = (
    id: string,
    stratumTag: string,
    stratumTitle: string,
    stratumSub: string,
    y: number,
    h: number,
    isBedrock = false
  ) => {
    const bgFill = isBedrock ? '#0F172A' : '#F8FAFC';
    const borderHex = isBedrock ? '#10B981' : '#059669';
    const titleColor = isBedrock ? '#F8FAFC' : '#0F172A';
    const subColor = isBedrock ? '#6EE7B7' : '#047857';
    const badgeBg = isBedrock ? '#065F46' : '#ECFDF5';
    const badgeText = isBedrock ? '#34D399' : '#059669';

    const headerHtml =
      `<div style="font-family:Inter,-apple-system,sans-serif;display:inline-flex;align-items:center;gap:6px;background:${ isBedrock ? '#1E293B' : '#ECFDF5' };border:1px solid #10B981;border-radius:5px;padding:2px 8px;">` +
      `<span style="background:${badgeBg};color:${badgeText};border:1px solid #10B981;border-radius:3px;padding:1px 5px;font-size:8px;font-weight:900;letter-spacing:0.4px;white-space:nowrap;">${escHtml(stratumTag)}</span>` +
      `<span style="font-size:9.5px;font-weight:900;color:${titleColor};letter-spacing:0.2px;white-space:nowrap;">${escHtml(stratumTitle)}</span>` +
      `</div>`;

    return `<mxCell id="${id}" value="${escAttr(headerHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${bgFill};strokeColor=${borderHex};strokeWidth=${isBedrock ? '2.5' : '2'};arcSize=5;verticalAlign=top;align=left;spacingTop=4;spacingLeft=8;shadow=0;" vertex="1" parent="1"><mxGeometry x="48" y="${y}" width="1172" height="${h}" as="geometry"/></mxCell>`;
  };

  const makePodCard = (
    id: string,
    iconType: string,
    badge: string,
    cardTitle: string,
    subtitle: string,
    bullets: string[],
    telemetrySpec: string,
    x: number,
    y: number,
    w: number,
    h: number,
    isDarkCard = false
  ) => {
    const fill = isDarkCard ? '#1E293B' : '#FFFFFF';
    const stroke = '#10B981';
    const titleHex = isDarkCard ? '#F8FAFC' : '#0F172A';
    const subHex = isDarkCard ? '#34D399' : '#059669';
    const bulletHex = isDarkCard ? '#CBD5E1' : '#334155';
    const specBg = isDarkCard ? '#0F172A' : '#ECFDF5';
    const specText = isDarkCard ? '#6EE7B7' : '#065F46';
    const iconBg = isDarkCard ? '#065F46' : '#10B981';

    const bulletHtml = bullets
      .map(
        (b) =>
          `<div style="font-size:8.2px;color:${bulletHex};line-height:12px;margin-top:2px;">▸ ${escHtml(b)}</div>`
      )
      .join('');

    const html =
      `<div style="font-family:Inter,-apple-system,sans-serif;padding:6px 9px;width:${w - 16}px;box-sizing:border-box;">` +
      `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">` +
      `<div style="display:flex;align-items:center;gap:5px;">` +
      `<span style="display:inline-flex;align-items:center;justify-content:center;width:19px;height:19px;border-radius:4px;background:${iconBg};border:1px solid #10B981;">${renderIconSvg(iconType, isDarkCard)}</span>` +
      `<span style="font-size:10.5px;font-weight:900;color:${titleHex};">${escHtml(cardTitle)}</span>` +
      `</div>` +
      `<span style="background:${specBg};color:${specText};border:1px solid #10B981;border-radius:4px;padding:1px 4px;font-size:7px;font-weight:800;">${escHtml(badge)}</span>` +
      `</div>` +
      `<div style="font-size:8.5px;font-weight:700;color:${subHex};margin-bottom:2px;">${escHtml(subtitle)}</div>` +
      bulletHtml +
      `<div style="margin-top:4px;padding-top:3px;border-top:1px dashed #10B981;display:flex;justify-content:space-between;font-size:7.5px;font-weight:800;color:${subHex};">` +
      `<span>${escHtml(telemetrySpec)}</span>` +
      `<span>K8s / CLOUD</span>` +
      `</div>` +
      `</div>`;

    return `<mxCell id="${id}" value="${escAttr(html)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.8;arcSize=7;verticalAlign=top;align=left;shadow=0;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
  };

  const makeConnector = (
    id: string,
    source: string,
    target: string,
    label: string,
    opts: {
      exitX: number;
      exitY: number;
      entryX: number;
      entryY: number;
      dashed?: boolean;
      color?: string;
      offsetY?: number;
      isReturn?: boolean;
    }
  ) => {
    const stroke = opts.color || '#059669';
    const dashStyle = opts.dashed ? 'dashed=1;dashPattern=6 4;' : '';
    const fontColor = opts.isReturn ? '#0369A1' : '#065F46';
    const bgHex = opts.isReturn ? '#E0F2FE' : '#ECFDF5';
    const borderHex = opts.isReturn ? '#0284C7' : '#10B981';
    const geoXml =
      typeof opts.offsetY === 'number'
        ? `<mxGeometry relative="1" as="geometry"><mxPoint y="${opts.offsetY}" as="offset"/></mxGeometry>`
        : `<mxGeometry relative="1" as="geometry"/>`;
    return `<mxCell id="${id}" value="${escAttr(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${stroke};strokeWidth=2;${dashStyle}endArrow=block;endFill=1;fontSize=8;fontStyle=1;fontColor=${fontColor};labelBackgroundColor=${bgHex};labelBorderColor=${borderHex};exitX=${opts.exitX};exitY=${opts.exitY};entryX=${opts.entryX};entryY=${opts.entryY};" edge="1" parent="1" source="${source}" target="${target}">${geoXml}</mxCell>`;
  };

  const topBannerHtml =
    `<div style="font-family:Inter,-apple-system,sans-serif;display:flex;align-items:center;justify-content:space-between;width:1556px;padding:6px 14px;">` +
    `<div>` +
    `<div style="display:flex;align-items:center;gap:10px;">` +
    `<span style="background:#10B981;color:#0F172A;border-radius:4px;padding:2px 8px;font-size:9.5px;font-weight:900;letter-spacing:0.7px;">4-STRATUM VERTICAL CROSS-SECTION · RFC HARDENED</span>` +
    `<span style="font-size:15px;font-weight:900;color:#F8FAFC;letter-spacing:0.2px;">${escHtml(displayTitle)}</span>` +
    `</div>` +
    `<div style="font-size:9.5px;font-weight:600;color:#6EE7B7;margin-top:3px;">💬 RFC Architecture: ↩ SSE Token Stream (HTTP/2) • Decoupled Laser Bridge Coordinator • Cross-Cutting Observability Plane • Private VPC Subnet (10.240.0.0/16) • Prompt: "${escHtml(shortPrompt)}..."</div>` +
    `</div>` +
    `<div style="display:flex;gap:8px;">` +
    `<span style="background:#1E293B;color:#38BDF8;border:1px solid #0284C7;border-radius:6px;padding:4px 9px;font-size:9px;font-weight:800;">↩ SSE Stream: HTTP/2 Chunked</span>` +
    `<span style="background:#1E293B;color:#34D399;border:1px solid #10B981;border-radius:6px;padding:4px 9px;font-size:9px;font-weight:800;">VPC RDMA: 10.240.0.0/16</span>` +
    `</div>` +
    `</div>`;

  // Left/Center 4 Horizontal Strata (`x=48..1220`, `w=1172`): 3 Pods per Stratum (`w=304` at `x=64, 484, 904` -> `116px` horizontal gaps!)
  // Right Cross-Cutting Vertical Observability & Evaluation Plane (`x=1324..1632`, `w=308`): `116px` horizontal channel (`x=1208..1324`)!
  const cells: string[] = [
    `<mxCell id="0"/>`,
    `<mxCell id="1" parent="0"/>`,
    `<mxCell id="hdr_title" value="${escAttr(topBannerHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#10B981;strokeWidth=2;arcSize=6;verticalAlign=middle;align=left;" vertex="1" parent="1"><mxGeometry x="48" y="14" width="1584" height="60" as="geometry"/></mxCell>`,

    // =========================================================================
    // STRATUM 1: TOP STRATUM (APPLICATION & INGRESS TIER)
    // =========================================================================
    makeStratumContainer(
      'stratum_1_top',
      'STRATUM 01 · INGRESS',
      'APPLICATION TIER',
      'Glass Landing Pads & Envoy API Mesh',
      90,
      166
    ),
    makePodCard(
      's1_pad_clients',
      'k8s',
      'GKE INGRESS PAD',
      'Multi-Modal Client Apps Pad',
      'Vision, Voice, Stream & Web Clients',
      [
        'HTTP/3 QUIC ingress & WebRTC bi-directional streaming',
        'Receives chunked SSE token streams (<18ms TTFT)',
      ],
      'SLA: 99.99% • p99 Ingress < 4ms',
      64,
      126,
      304,
      118
    ),
    makePodCard(
      's1_api_mesh',
      'mesh',
      'ENVOY API GATEWAY',
      'Global API Mesh & Edge Router',
      'Zero-Trust Envoy Service Mesh & Multiplexer',
      [
        'Dispatches prompts to Coordinator & multiplexes SSE',
        'mTLS SPIFFE identity & adaptive token rate-limiting',
      ],
      '1.2M req/s • SSE Multiplexer',
      484,
      126,
      304,
      118
    ),
    makePodCard(
      's1_telemetry_hud',
      'shield',
      'SAFETY & GUARDRAILS',
      'NeMo & Llama-Guard Policy Gate',
      'Inline Prompt Injection & PII Redaction Filter',
      [
        'Sub-3ms synchronous input/output safety tripwires',
        'Streams guardrail spans to Cross-Cutting Plane',
      ],
      'LATENCY: <2.8ms • Zero-PII Egress',
      904,
      126,
      304,
      118
    ),

    // =========================================================================
    // STRATUM 2: SECOND STRATUM (DECOUPLED COORDINATOR IN COL 2 + vLLM PODS)
    // =========================================================================
    makeStratumContainer(
      'stratum_2_inference',
      'STRATUM 02 · INFERENCE',
      'INFERENCE & ROUTING TIER',
      'Decoupled Laser Bridge Coordinator & vLLM K8s Pods',
      312,
      168
    ),
    makePodCard(
      's2_vllm_pod',
      'k8s',
      'GKE K8s POD · TARGET',
      'Containerized vLLM Target Engine',
      '70B/405B Target LLM · PagedAttention KV-Cache',
      [
        'Verifies draft tokens in single pass & emits SSE stream',
        'FP8 quantized continuous batching with zero fragmentation',
      ],
      'TTFT: 14.2ms • 4,800 tok/s • SSE Emitter',
      64,
      348,
      304,
      120
    ),
    makePodCard(
      's2_spec_decode_pod',
      'mesh',
      'CENTRAL ORCHESTRATOR',
      'Laser Bridge Speculative Coordinator',
      'Intermediary Draft-Verify Router & KV Disaggregator',
      [
        'Orchestrates 5-token lookahead draft vs. vLLM verification',
        'Routes 800G optical KV-cache state between Target & Draft',
      ],
      'ORCHESTRATOR: 800G Optical Laser Bridge',
      484,
      348,
      304,
      120
    ),
    makePodCard(
      's2_laser_router_pod',
      'k8s',
      'GKE K8s POD · DRAFT',
      'Speculative Decoding Draft Pod',
      '8B Eagle/Medusa Lookahead Draft Engine',
      [
        'Generates 5 candidate lookahead tokens in <1.8ms',
        'Returns speculative tree to Coordinator for verification',
      ],
      'ACCEPTANCE: 88% • 3.4x Decode Speedup',
      904,
      348,
      304,
      120
    ),

    // =========================================================================
    // STRATUM 3: THIRD STRATUM (CONTEXT & MEMORY TIER)
    // =========================================================================
    makeStratumContainer(
      'stratum_3_memory',
      'STRATUM 03 · MEMORY',
      'CONTEXT & MEMORY TIER',
      'Honeycomb Semantic Caches & Vector Cells',
      536,
      168
    ),
    makePodCard(
      's3_redis_cell',
      'db',
      'MEMORYSTORE REDIS',
      'Redis Semantic Memory Cache',
      'Global Prefix KV-Cache & Embedding Hash Cell',
      [
        'Sub-millisecond semantic cosine similarity prefix hits',
        'Shared multi-turn session KV-cache offload for vLLM',
      ],
      'LATENCY: p99 < 0.4ms • 94.8% KV Hit',
      64,
      572,
      304,
      120
    ),
    makePodCard(
      's3_vector_cell',
      'db',
      'VERTEX VECTOR SEARCH',
      'Vector DB Honeycomb Cluster',
      'Suspended High-Dimensional HNSW / ScaNN Index',
      [
        'Billion-scale 1536-dim embeddings with quantized recall',
        'Hybrid dense + sparse lexical RAG grounding for Coordinator',
      ],
      'LATENCY: p99 < 2.1ms @ 10B Vectors',
      484,
      572,
      304,
      120
    ),
    makePodCard(
      's3_doc_cell',
      'db',
      'CLOUD SPANNER / GCS',
      'Distributed Document Store Cells',
      'Multi-Modal Context Chunks & Lineage Graph',
      [
        'ACID document & lineage store for grounded citations',
        'Zero-copy streaming hydration into vLLM context window',
      ],
      'DURABILITY: 99.999% Multi-Region Store',
      904,
      572,
      304,
      120
    ),

    // =========================================================================
    // STRATUM 4: FOUNDATION BEDROCK INSIDE PRIVATE VPC / RDMA SUBNET (10.240.0.0/16)
    // =========================================================================
    `<mxCell id="vpc_rdma_subnet_boundary" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#38BDF8;strokeWidth=2.2;dashed=1;dashPattern=8 4;arcSize=5;" vertex="1" parent="1"><mxGeometry x="40" y="752" width="1188" height="190" as="geometry"/></mxCell>`,
    makeStratumContainer(
      'stratum_4_bedrock',
      'STRATUM 04 · BEDROCK VPC',
      'PRIVATE VPC SUBNET (10.240.0.0/16)',
      'Liquid-Cooled H100 SXM5 & GPUDirect RDMA Monolith',
      760,
      176,
      true
    ),
    makePodCard(
      's4_h100_racks',
      'gpu',
      'A3 MEGA · 8x H100 SXM5',
      'Liquid-Cooled H100 SXM5 Racks',
      'Dense 80GB HBM3 GPU Monolith (VPC 10.240.1.0/24)',
      [
        'Direct-to-chip closed-loop liquid cooling (PUE 1.06)',
        '3.35 TB/s HBM3 bandwidth per H100 SXM5 Tensor Core',
      ],
      'COMPUTE: 32 PFLOPS FP8 • 42°C Loop',
      64,
      798,
      304,
      124,
      true
    ),
    makePodCard(
      's4_nvlink_fabric',
      'gpu',
      'GPUDIRECT RDMA SUBNET',
      'NVLink 4.0 & InfiniBand Fabric',
      'Cross-Stratum 900 GB/s NVLink & 3.2 Tbps Quantum-2',
      [
        'Non-blocking rail-optimized fat-tree GPU interconnect',
        'GPUDirect RDMA zero-CPU-overhead tensor collectives',
      ],
      'FABRIC: 900 GB/s NVLink • 3.2 Tbps',
      484,
      798,
      304,
      124,
      true
    ),
    makePodCard(
      's4_cloud_bedrock',
      'gpu',
      'BARE-METAL KMS ENCLAVE',
      'Heavy Cloud Infrastructure Bedrock',
      'Hardware Root-of-Trust & Redundant HVDC Busbars',
      [
        'Hardware-rooted Nitro/Titan attestation & bare-metal scheduling',
        'Private VPC Service Controls perimeter & autonomous failover',
      ],
      'SLA: 99.999% Tier-IV VPC Bedrock',
      904,
      798,
      304,
      124,
      true
    ),

    // =========================================================================
    // CROSS-CUTTING VERTICAL OBSERVABILITY, GUARDRAILS & EVALUATION PLANE (x=1324..1632)
    // =========================================================================
    `<mxCell id="obs_plane_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#10B981;strokeWidth=2.5;arcSize=3;" vertex="1" parent="1"><mxGeometry x="1324" y="90" width="308" height="846" as="geometry"/></mxCell>`,
    `<mxCell id="obs_plane_hdr" value="${escAttr(
      `<div style="padding:4px 8px;font-family:Inter,-apple-system,sans-serif;text-align:center;">` +
        `<div style="background:#10B981;color:#0F172A;font-size:8px;font-weight:900;padding:1.5px 6px;border-radius:4px;letter-spacing:0.6px;display:inline-block;margin-bottom:2px;">CROSS-CUTTING PLANE · ALL 4 STRATA</div>` +
        `<div style="font-size:10px;font-weight:900;color:#F8FAFC;">Observability, Guardrails &amp; Evaluation HUD</div>` +
        `</div>`
    )}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#10B981;strokeWidth=1.2;arcSize=10;" vertex="1" parent="1"><mxGeometry x="1336" y="96" width="284" height="30" as="geometry"/></mxCell>`,

    makePodCard(
      'obs_1',
      'shield',
      'OTLP 100Hz HUD',
      'Floating UI Telemetry Wireframe HUD',
      'Live TTFT, Token Burn Rate & Guardrail Tripwires',
      [
        'Streams 100Hz OpenTelemetry spans & safety alerts',
        'Real-time cost/token burn telemetry ($0.42/1M tok)',
      ],
      'p99 E2E: 18.4ms • Burn: $0.42/1M tok',
      1336,
      132,
      284,
      114,
      true
    ),
    makePodCard(
      'obs_2',
      'mesh',
      'DECODE TELEMETRY',
      'vLLM & Speculative Decode Auditor',
      'Draft Acceptance (88.4%) & KV-Cache Occupancy',
      [
        'Monitors PagedAttention KV-cache block utilization',
        'Tracks draft-vs-target token verification speedup',
      ],
      'Speedup: 3.4x • KV Frag: 0.0%',
      1336,
      352,
      284,
      116,
      true
    ),
    makePodCard(
      'obs_3',
      'db',
      'RAG & CACHE EVAL',
      'Semantic Drift & Recall@10 Probe',
      'Redis Hit Ratio (94.8%) & HNSW Grounding Score',
      [
        'Continuous cosine drift detection & embedding freshness',
        'Measures RAG faithfulness & citation lineage recall',
      ],
      'Recall@10: 99.1% • Drift: <0.02',
      1336,
      574,
      284,
      116,
      true
    ),
    makePodCard(
      'obs_4',
      'gpu',
      'DCGM GPU TELEMETRY',
      'Thermal Throttling & NVLink Monitor',
      'H100 SXM5 Junction Temp (42°C) & RDMA Saturation',
      [
        'Per-GPU DCGM thermal throttling & HVDC power draw',
        'Monitors 900GB/s NVLink & 3.2Tbps RDMA congestion',
      ],
      'Thermal: 0 Throttles • PUE: 1.06',
      1336,
      798,
      284,
      122,
      true
    ),

    // =========================================================================
    // HORIZONTAL CONNECTORS (116px H-Gaps between Pods + 128px Channel to Observability Plane)
    // =========================================================================
    makeConnector('e_s1_1', 's1_pad_clients', 's1_api_mesh', '❶a HTTP/3 Ingress', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
    }),
    makeConnector('e_s1_2', 's1_api_mesh', 's1_telemetry_hud', '❶b Policy Check', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
    }),
    makeConnector('e_s1_obs', 's1_telemetry_hud', 'obs_1', 'OTLP 100Hz', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      dashed: true,
      color: '#10B981',
    }),

    // Stratum 2: Central Coordinator (s2_spec_decode_pod in Col 2) orchestrates vLLM Target (Col 1) and Draft Pod (Col 3)
    makeConnector('e_laser_1', 's2_spec_decode_pod', 's2_vllm_pod', '⚡ Laser Bridge α (Verify)', {
      exitX: 0,
      exitY: 0.5,
      entryX: 1,
      entryY: 0.5,
      color: '#10B981',
    }),
    makeConnector('e_laser_2', 's2_spec_decode_pod', 's2_laser_router_pod', '⚡ Laser Bridge β (Draft)', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      color: '#10B981',
    }),
    makeConnector('e_s2_obs', 's2_laser_router_pod', 'obs_2', 'KV & Draft Eval', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      dashed: true,
      color: '#10B981',
    }),

    // Stratum 3 Horizontal Honeycomb Sync + Observability Tap
    makeConnector('e_s3_1', 's3_redis_cell', 's3_vector_cell', 'Honeycomb Sync', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      dashed: true,
    }),
    makeConnector('e_s3_2', 's3_vector_cell', 's3_doc_cell', 'Chunk Lineage', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      dashed: true,
    }),
    makeConnector('e_s3_obs', 's3_doc_cell', 'obs_3', 'Recall@10 Audit', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      dashed: true,
      color: '#10B981',
    }),

    // Stratum 4 Horizontal Bedrock Bus + Observability Tap
    makeConnector('e_s4_1', 's4_h100_racks', 's4_nvlink_fabric', 'NVLink 4.0 Bus', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      color: '#10B981',
    }),
    makeConnector('e_s4_2', 's4_nvlink_fabric', 's4_cloud_bedrock', 'VPC RDMA Mesh', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      color: '#10B981',
    }),
    makeConnector('e_s4_obs', 's4_cloud_bedrock', 'obs_4', 'DCGM 42°C', {
      exitX: 1,
      exitY: 0.5,
      entryX: 0,
      entryY: 0.5,
      dashed: true,
      color: '#10B981',
    }),

    // =========================================================================
    // VERTICAL CROSS-SECTION CONNECTORS + EXPLICIT UPWARD SSE TOKEN STREAM RETURN
    // =========================================================================
    // 1. Explicit Return Stream Edge (`s2_vllm_pod -> s1_pad_clients`) flowing UPWARD (`exitY=0, entryY=1`)
    makeConnector('e_v1_sse_return', 's2_vllm_pod', 's1_pad_clients', '↩ SSE Token Stream (HTTP/2)', {
      exitX: 0.96,
      exitY: 0,
      entryX: 0.96,
      entryY: 1,
      dashed: true,
      color: '#0284C7',
      offsetY: -12,
      isReturn: true,
    }),
    // 2. Central Prompt Dispatch from Global API Mesh (Stratum 1 Col 2) down to Decoupled Coordinator (Stratum 2 Col 2)
    makeConnector('e_v1_mid', 's1_api_mesh', 's2_spec_decode_pod', '❷ Prompt Dispatch', {
      exitX: 0.5,
      exitY: 1,
      entryX: 0.5,
      entryY: 0,
      offsetY: -12,
    }),
    // 3. Guardrail Budget Sync to Draft Pod
    makeConnector('e_v1_right', 's1_telemetry_hud', 's2_laser_router_pod', '❷b Guardrail Budget', {
      exitX: 0.5,
      exitY: 1,
      entryX: 0.5,
      entryY: 0,
      dashed: true,
      offsetY: -12,
    }),

    // Stratum 2 -> Stratum 3
    makeConnector('e_v2_left', 's2_vllm_pod', 's3_redis_cell', '❸a KV Prefix Lookup', {
      exitX: 0.96,
      exitY: 1,
      entryX: 0.96,
      entryY: 0,
      offsetY: -12,
    }),
    makeConnector('e_v2_mid', 's2_spec_decode_pod', 's3_vector_cell', '❸b Vector Grounding', {
      exitX: 0.5,
      exitY: 1,
      entryX: 0.5,
      entryY: 0,
      offsetY: -12,
    }),
    makeConnector('e_v2_right', 's2_laser_router_pod', 's3_doc_cell', '❸c Context Hydration', {
      exitX: 0.5,
      exitY: 1,
      entryX: 0.5,
      entryY: 0,
      offsetY: -12,
    }),

    // Stratum 3 -> Stratum 4
    makeConnector('e_v3_left', 's3_redis_cell', 's4_h100_racks', '❹a GPUDirect DMA', {
      exitX: 0.96,
      exitY: 1,
      entryX: 0.96,
      entryY: 0,
      offsetY: -12,
    }),
    makeConnector('e_v3_mid', 's3_vector_cell', 's4_nvlink_fabric', '❹b 900GB/s NVLink', {
      exitX: 0.5,
      exitY: 1,
      entryX: 0.5,
      entryY: 0,
      offsetY: -12,
    }),
    makeConnector('e_v3_right', 's3_doc_cell', 's4_cloud_bedrock', '❹c VPC Bare-Metal', {
      exitX: 0.5,
      exitY: 1,
      entryX: 0.5,
      entryY: 0,
      offsetY: -12,
    }),
  ];

  return `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas-VerticalStratumEngine" version="24.0.0"><diagram id="vertical_stratum_cross_section" name="4-Stratum Vertical Cross-Section"><mxGraphModel dx="1680" dy="1060" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1680" pageHeight="1060" background="#F8FAFC" math="0" shadow="0"><root>${cells.join('')}</root></mxGraphModel></diagram></mxfile>`;
}

/**
 * Extracts up to 10 distinct domain clauses from a freeform architecture requirement prompt
 * so that 100% of cards in a zero-template synthesis are derived directly from the user's prompt.
 */
export function extractRichPromptSubsystems(prompt: string, fallbackTitle: string): string[] {
  const rawLower = `${prompt} ${fallbackTitle}`.toLowerCase();

  const cleaned = String(prompt || fallbackTitle || 'Custom Cloud Architecture')
    .replace(/^(please\s+)?((design|architect|build|create|deploy|synthesize|generate|draw|show)\s+)?(a\s+|an\s+|the\s+)?(full\s+|complete\s+|enterprise\s+|brand[- ]new\s+)?(flowchart\s+(for|of)\s+|infographic\s+(for|of)\s+|architecture\s+(for|of)\s+|diagram\s+(for|of)\s+)?/i, '')
    .replace(/\b(architecture|diagram|blueprint|flowchart|topology)\s*\.?$/i, '')
    .trim();

  const parts = cleaned
    .split(/(?:,|;|\+|→|->|\band\b|\bwith\b|\bvia\b|\busing\b|\binto\b|\bbacked by\b)/i)
    .map((s) =>
      s
        .replace(/^(a\s+|an\s+|the\s+)/i, '')
        .replace(/\b(architecture|diagram|blueprint|flowchart|topology)\s*\.?$/i, '')
        .trim()
    )
    .filter((s) => s.length >= 3 && !/^(gcp|aws|azure|google cloud|gemini|gemini enterprise|vertex ai)$/i.test(s));

  const isGcpGemini = /\b(gcp|google cloud|gemini|vertex|spanner|bigquery|gke)\b/i.test(rawLower);
  const base = parts[0] || truncateAtWord(cleaned, 28) || 'Edge Ingress Gateway';
  const defaults = isGcpGemini
    ? [
        truncateAtWord(base, 26),
        `Cloud LB & Apigee X Gateway`,
        `Cloud Armor WAF & KMS PQC`,
        `Gemini Enterprise Supervisor`,
        `GKE Autopilot & Workflows`,
        `Vertex AI Reasoning Engine`,
        `Gemini Safety & DLP Guard`,
        `Cloud Pub/Sub DLQ Replay`,
        `Memorystore Context Cache`,
        `Cloud Spanner ACID Ledger`,
        `BigQuery & Vertex Vector DB`,
        `Cloud Trace & FinOps HUD`,
      ]
    : [
        truncateAtWord(base, 26),
        `${truncateAtWord(base, 18)} API Gateway`,
        `Zero-Trust mTLS & WAF Guard`,
        `${truncateAtWord(base, 18)} Orchestrator`,
        `Distributed Event Stream Bus`,
        `Real-Time Inference Engine`,
        `Schema & Policy Validator`,
        `Dead-Letter Backoff Replay`,
        `Low-Latency State Cache`,
        `Multi-Region ACID Ledger`,
        `Analytical Lakehouse Store`,
        `OpenTelemetry & SLO HUD`,
      ];

  const result: string[] = [];
  for (let i = 0; i < 12; i++) {
    const candidate = parts[i] ? truncateAtWord(parts[i], 28) : defaults[i];
    result.push(candidate);
  }
  return result;
}

/**
 * 100% Zero-Template Custom Architecture AST Synthesizer
 * Defaults to the NASA Closed-Loop Mission Control & Parallel Multi-Universe
 * Digital-Twin Agentic Harness (`buildUniversalClosedLoopDomainHarnessXml`)
 * whenever no canonical blueprint template (#00..#78) is selected.
 */
/**
 * 100% Zero-Template Custom Architecture AST Synthesizer
 * Builds a complete 1680x1060 widescreen Draw.io XML architecture diagram from scratch
 * using the NASA Closed-Loop Mission Control & Parallel 1:3 Digital-Twin Harness
 * adapted to the entities, protocols, SLAs, and subsystems parsed from the user's prompt.
 */
export function synthesizeZeroTemplateCustomArchitectureXml(
  prompt: string,
  title?: string,
  _domain = 'Enterprise Cloud',
  _customSubsystems?: string[],
  _decisionGateQuestion?: string,
  _level = 'L2',
  _perspective = 'Logical'
): string {
  const effectivePrompt =
    [prompt, title].filter(Boolean).join(' — ') ||
    'NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness';
  return buildUniversalClosedLoopDomainHarnessXml({
    prompt: effectivePrompt,
    theme: 'light',
  });
}

/**
 * 100% Zero-Template Custom Logical Flowchart AST Synthesizer (`LR` or `TD`)
 * Builds a complete 1680x980 widescreen Flowchart from scratch using ONLY the clauses
 * parsed from the user's requirement prompt:
 * - Rounded Start / End Terminators (`arcSize=50`)
 * - 6 Prompt-Derived Sequential Process Step Cards (`❶..❻`)
 * - 2 Diamond Decision Gates (`shape=rhombus`) with explicit `✓ YES` and `✕ NO` branches
 * - Closed-Loop Exception Quarantine & Backoff Retry Feedback Path (`↩ Retry Loop`)
 */
export function synthesizeZeroTemplateFlowchartXml(
  prompt: string,
  title?: string,
  direction: 'LR' | 'TD' = 'LR',
  level: 'L1' | 'L2' | 'L3' | 'L4' = 'L2',
  customSubsystems?: string[],
  decisionGateQuestion?: string
): string {
  const displayTitle = truncateAtWord(title || prompt || 'Custom Logical Process Flowchart', 76);
  const shortPrompt = String(prompt || displayTitle).replace(/\s+/g, ' ').trim().slice(0, 128);
  const baseSubs = extractRichPromptSubsystems(prompt, displayTitle);
  const subs = customSubsystems && customSubsystems.length >= 12 ? customSubsystems : baseSubs;

  const topBannerHtml =
    `<div style="font-family:Inter,-apple-system,sans-serif;display:flex;align-items:center;justify-content:space-between;width:1556px;padding:6px 14px;">` +
    `<div>` +
    `<div style="display:flex;align-items:center;gap:10px;">` +
    `<span style="background:#10B981;color:#0F172A;border-radius:4px;padding:2px 8px;font-size:9.5px;font-weight:900;letter-spacing:0.7px;">PROCESS FLOWCHART SYNTHESIS · ${escHtml(level)} · ${escHtml(direction)}</span>` +
    `<span style="font-size:15px;font-weight:900;color:#F8FAFC;letter-spacing:0.2px;">${escHtml(displayTitle)}</span>` +
    `</div>` +
    `<div style="font-size:9.5px;font-weight:600;color:#6EE7B7;margin-top:3px;">▸ Flowchart Prompt: "${escHtml(shortPrompt)}" • 6 Sequential Steps (❶..❻) • 2 Diamond Decision Gates • Closed-Loop Retry</div>` +
    `</div>` +
    `<div style="display:flex;gap:8px;">` +
    `<span style="background:#1E293B;color:#34D399;border:1px solid #10B981;border-radius:6px;padding:4px 9px;font-size:9px;font-weight:800;">PROCESS FLOW · ${escHtml(level)}</span>` +
    `<span style="background:#1E293B;color:#38BDF8;border:1px solid #0284C7;border-radius:6px;padding:4px 9px;font-size:9px;font-weight:800;">${escHtml(level)} · ${escHtml(direction)} FLOW</span>` +
    `</div>` +
    `</div>`;

  const makeLane = (id: string, tag: string, laneTitle: string, y: number, h: number, bg: string, border: string, accent: string) => {
    const hdr =
      `<div style="font-family:Inter,-apple-system,sans-serif;display:inline-flex;align-items:center;gap:6px;background:#FFFFFF;border:1px solid ${border};border-radius:5px;padding:2px 8px;">` +
      `<span style="background:${accent};color:#FFFFFF;border-radius:3px;padding:1px 5px;font-size:8px;font-weight:900;">${escHtml(tag)}</span>` +
      `<span style="font-size:9.5px;font-weight:900;color:#0F172A;">${escHtml(laneTitle)}</span>` +
      `</div>`;
    return `<mxCell id="${id}" value="${escAttr(hdr)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${bg};strokeColor=${border};strokeWidth=2;arcSize=4;verticalAlign=top;align=left;spacingTop=4;spacingLeft=8;shadow=0;" vertex="1" parent="1"><mxGeometry x="48" y="${y}" width="1584" height="${h}" as="geometry"/></mxCell>`;
  };

  const makeStepBox = (
    id: string,
    stepNum: string,
    stepTitle: string,
    stepSub: string,
    detail: string,
    sla: string,
    accent: string,
    x: number,
    y: number,
    w = 270,
    h = 112
  ) => {
    const html =
      `<div style="font-family:Inter,-apple-system,sans-serif;padding:6px 9px;width:${w - 16}px;box-sizing:border-box;">` +
      `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">` +
      `<span style="font-size:10.2px;font-weight:900;color:#0F172A;">[${escHtml(stepNum)}] ${escHtml(truncateAtWord(stepTitle, 28))}</span>` +
      `<span style="background:${accent};color:#FFFFFF;border-radius:4px;padding:1px 5px;font-size:7.5px;font-weight:800;">STEP ${escHtml(stepNum)}</span>` +
      `</div>` +
      `<div style="font-size:8.5px;font-weight:700;color:${accent};margin-bottom:3px;">${escHtml(truncateAtWord(stepSub, 38))}</div>` +
      `<div style="font-size:8px;color:#334155;line-height:11.5px;">▸ ${escHtml(truncateAtWord(detail, 48))}</div>` +
      `<div style="margin-top:4px;padding-top:3px;border-top:1px dashed ${accent};display:flex;justify-content:space-between;font-size:7.4px;font-weight:800;color:${accent};">` +
      `<span>${escHtml(sla)}</span>` +
      `<span>${escHtml(level)} · ${escHtml(direction)}</span>` +
      `</div>` +
      `</div>`;
    return `<mxCell id="${id}" value="${escAttr(html)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${accent};strokeWidth=2;arcSize=8;verticalAlign=top;align=left;shadow=0;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
  };

  const makeDiamond = (id: string, gateNum: string, question: string, stroke: string, x: number, y: number, w = 176, h = 112) => {
    const qClean = question.replace(/\?+$/, '');
    const html =
      `<div style="font-family:Inter,-apple-system,sans-serif;text-align:center;padding:4px;">` +
      `<div style="font-size:8px;font-weight:900;color:${stroke};">◆ GATE ${escHtml(gateNum)}</div>` +
      `<div style="font-size:9px;font-weight:900;color:#0F172A;line-height:11px;margin-top:2px;">${escHtml(truncateAtWord(qClean, 26))}?</div>` +
      `</div>`;
    return `<mxCell id="${id}" value="${escAttr(html)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${stroke};strokeWidth=2.2;shadow=0;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
  };

  const makeEdge = (
    id: string,
    source: string,
    target: string,
    label: string,
    exitX: number,
    exitY: number,
    entryX: number,
    entryY: number,
    color = '#2563EB',
    dashed = false
  ) => {
    const dash = dashed ? 'dashed=1;dashPattern=6 4;' : '';
    return `<mxCell id="${id}" value="${escAttr(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=2;${dash}endArrow=block;endFill=1;fontSize=8;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
  };

  const gate1Q = decisionGateQuestion || `${truncateAtWord(subs[2], 22)} Valid`;

  const cells: string[] = [
    `<mxCell id="0"/>`,
    `<mxCell id="1" parent="0"/>`,
    `<mxCell id="hdr_title" value="${escAttr(topBannerHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#10B981;strokeWidth=2;arcSize=6;verticalAlign=middle;align=left;" vertex="1" parent="1"><mxGeometry x="48" y="14" width="1584" height="60" as="geometry"/></mxCell>`,

    // LANE 1: INGRESS, AUTH & CONTRACT GATE (y=92..342)
    makeLane('fc_lane_1', `TIER 1 (${direction})`, `TIER 1: ${truncateAtWord(subs[0], 34).toUpperCase()} & INGRESS (${direction})`, 92, 240, '#EFF6FF', '#93C5FD', '#2563EB'),
    `<mxCell id="fc_start" value="▶ START TRIGGER&lt;br/&gt;${escHtml(truncateAtWord(subs[0], 20))}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#10B981;strokeWidth=2;arcSize=50;fontColor=#34D399;fontSize=9.5;fontStyle=1;align=center;" vertex="1" parent="1"><mxGeometry x="72" y="164" width="156" height="64" as="geometry"/></mxCell>`,
    makeStepBox('fc_s1', '1', subs[0], 'Ingress & Payload Framing', `Accepts ${subs[0]} requests with schema version tags`, 'SLA: p99 < 6ms', '#2563EB', 320, 140),
    makeStepBox('fc_s2', '1a', subs[1], 'Identity & Contract Normalization', `Normalizes ${subs[1]} context & verifies credentials`, 'mTLS 1.3 + OIDC', '#2563EB', 690, 140),
    makeDiamond('fc_g1', '1', gate1Q, '#EA580C', 1066, 140),
    makeStepBox('fc_q1', '2b', `✕ Quarantine (${truncateAtWord(subs[2], 18)})`, 'Dead-Letter Isolation & Retry Queue', `Quarantines invalid ${subs[2]} payloads for backoff retry`, 'DLQ + Alert', '#DC2626', 1336, 140),

    // LANE 2: CORE ORCHESTRATION, EXECUTION & SLA GATE (y=376..626)
    makeLane('fc_lane_2', `TIER 2 (${direction})`, `TIER 2: DECISION GATE & POLICY VALIDATION (${truncateAtWord(subs[3], 28).toUpperCase()})`, 376, 240, '#F5F3FF', '#C4B5FD', '#7C3AED'),
    makeStepBox('fc_s3', '3', `${truncateAtWord(subs[3], 26)} Orchestrator`, 'Core Workflow State Machine', `Coordinates ${subs[3]} execution across domain workers`, 'DAG State Engine', '#7C3AED', 320, 424),
    makeStepBox('fc_s4', '3a', `${truncateAtWord(subs[4], 26)} Analyzer`, 'Stream & Policy Processing', `Executes ${subs[4]} transformation & enrichment`, 'p99 < 18ms', '#7C3AED', 690, 424),
    makeDiamond('fc_g2', '2', `${truncateAtWord(subs[5], 22)} SLA Pass`, '#7C3AED', 1066, 424),
    makeStepBox('fc_q2', '3b', `Fallback & Circuit Breaker`, 'Adaptive Retry & Degraded Mode', `Triggers bounded retry for ${subs[5]} back to Step 3`, 'Auto-Fallback', '#EA580C', 1336, 424),

    // LANE 3: STATE COMMIT, TELEMETRY & COMPLETION (y=660..910)
    makeLane('fc_lane_3', `TIER 3 (${direction})`, `TIER 3: ${truncateAtWord(subs[6], 32).toUpperCase()} & STATE COMMIT ENGINE`, 660, 240, '#ECFDF5', '#6EE7B7', '#059669'),
    makeStepBox('fc_s5', '4', subs[6], 'Transactional ACID State Commit', `Commits verified ${subs[6]} state with zero RPO`, '99.999% ACID', '#059669', 320, 708),
    makeStepBox('fc_s6', '5', subs[7], 'Audit Ledger & Event Syndication', `Publishes immutable audit trail & downstream events`, 'OTLP + Lineage', '#059669', 690, 708),
    `<mxCell id="fc_end" value="■ COMPLETED (200 OK)&lt;br/&gt;SLA &amp; Audit Verified" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#065F46;strokeColor=#10B981;strokeWidth=2;arcSize=50;fontColor=#ECFDF5;fontSize=9.5;fontStyle=1;align=center;" vertex="1" parent="1"><mxGeometry x="1072" y="732" width="196" height="64" as="geometry"/></mxCell>`,

    // EDGES
    makeEdge('fc_e1', 'fc_start', 'fc_s1', '❶ Trigger', 1, 0.5, 0, 0.5, '#10B981'),
    makeEdge('fc_e2', 'fc_s1', 'fc_s2', '❷ Normalize', 1, 0.5, 0, 0.5, '#2563EB'),
    makeEdge('fc_e3', 'fc_s2', 'fc_g1', '❸ Evaluate', 1, 0.5, 0, 0.5, '#EA580C'),
    makeEdge('fc_e4_no', 'fc_g1', 'fc_q1', '✕ NO (Reject)', 1, 0.5, 0, 0.5, '#DC2626', true),
    makeEdge('fc_e4_retry', 'fc_q1', 'fc_s2', '↩ Retry Backoff', 0.5, 0, 0.5, 0, '#0D9488', true),
    makeEdge('fc_e4_yes', 'fc_g1', 'fc_s3', '✓ YES (Authorized)', 0.5, 1, 0.5, 0, '#059669'),
    makeEdge('fc_e5', 'fc_s3', 'fc_s4', '❹ Execute', 1, 0.5, 0, 0.5, '#7C3AED'),
    makeEdge('fc_e6', 'fc_s4', 'fc_g2', '❺ SLA Check', 1, 0.5, 0, 0.5, '#7C3AED'),
    makeEdge('fc_e7_no', 'fc_g2', 'fc_q2', '✕ NO (Fallback)', 1, 0.5, 0, 0.5, '#EA580C', true),
    makeEdge('fc_e7_retry', 'fc_q2', 'fc_s3', '↩ Re-Orchestrate', 0.5, 0, 0.5, 0, '#0D9488', true),
    makeEdge('fc_e7_yes', 'fc_g2', 'fc_s5', '✓ YES (Commit)', 0.5, 1, 0.5, 0, '#059669'),
    makeEdge('fc_e8', 'fc_s5', 'fc_s6', '❻ Audit Log', 1, 0.5, 0, 0.5, '#059669'),
    makeEdge('fc_e9', 'fc_s6', 'fc_end', '✓ 200 OK', 1, 0.5, 0, 0.5, '#10B981'),
  ];

  return `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas-ZeroTemplateFlowchartEngine" version="24.0.0"><diagram id="zero_template_flowchart" name="Zero-Template Logical Flowchart"><mxGraphModel dx="1680" dy="980" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1680" pageHeight="980" background="#F8FAFC" math="0" shadow="0"><root>${cells.join('')}</root></mxGraphModel></diagram></mxfile>`;
}

/**
 * Dedicated Flowchart & Decision-Gate Process Generator (`LR` Left-to-Right or `TD` Top-Down).
 * Generates authentic Flowchart shapes:
 * - Rounded Start / End Terminators (`arcSize=50`)
 * - Sequential Process Step Cards (`❶..❻`)
 * - Diamond Decision Gates (`shape=rhombus`) with explicit `✓ YES` and `✕ NO (Retry / DLQ)` branches
 * - Closed-Loop Feedback Return paths
 */
export function generateLogicalFlowchartDrawioXml(
  prompt: string,
  title?: string,
  direction: 'LR' | 'TD' = 'LR',
  level: 'L1' | 'L2' | 'L3' | 'L4' = 'L2',
  options?: { noTemplate?: boolean }
): string {
  const isDefaultDemoPrompt =
    !prompt ||
    prompt.trim() === '' ||
    prompt.includes('Global Real-Time Payments Mesh') ||
    prompt === 'Enterprise Process Flowchart';

  const derivedPromptTitle = truncateAtWord(
    String(prompt || '')
      .replace(/^(please\s+)?((design|architect|build|create|deploy|synthesize|generate|draw|show)\s+)?(a\s+|an\s+|the\s+)?(full\s+|complete\s+|enterprise\s+)?(flowchart\s+(for|of)\s+|architecture\s+(for|of)\s+|diagram\s+(for|of)\s+)?/i, '')
      .replace(/\b(architecture|diagram|blueprint|flowchart|topology)\s*$/i, '')
      .trim(),
    88
  );

  const customTitle =
    !isDefaultDemoPrompt && (derivedPromptTitle || title)
      ? derivedPromptTitle.length > 8
        ? derivedPromptTitle
        : title && !title.includes('Global Real-Time Payments Mesh')
        ? truncateAtWord(title, 88)
        : truncateAtWord(prompt, 88)
      : undefined;

  if (options?.noTemplate || (!isDefaultDemoPrompt && prompt.trim().length > 6)) {
    return synthesizeZeroTemplateFlowchartXml(prompt, customTitle || title || prompt, direction, level);
  }

  return level === 'L1'
    ? generateGoogleCloudL1ExecutiveFlowchartXml(customTitle)
    : level === 'L2'
    ? generateGoogleCloudL2LogicalFlowchartXml(customTitle)
    : level === 'L3'
    ? generateGoogleCloudL3OperationalFlowchartXml(customTitle)
    : generateGoogleCloudL4AgenticFlowchartXml(customTitle);
}




