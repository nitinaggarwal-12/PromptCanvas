/**
 * GCP Architecture Center AI Co-Pilot & Versioning Engine
 * 
 * Enables interactive natural language prompt-driven architecture modifications,
 * multi-stakeholder persona simulation, live Draw.io XML mutation, and
 * immutable snapshot versioning on the Google Cloud Architecture Center.
 */

import { validateAndHealDrawioXml } from './xmlHealer';
import { generateUpgradedGcpGeBankingArchitectureXml } from './canonical/upgradedGcpGeBankingAgentTemplate';
import {
  synthesizePromptDrivenDiagramXml,
} from './promptDrivenDiagramSynthesizer';
import type { LiveGeminiCopilotModificationSpec } from './geminiArchitecturalDecisionEngine';
import {
  shouldUseCompositionalChainCompiler,
  compileCompositionalArchitectureChain,
  isStyleOrFormattingPrompt,
} from './compositionalChainCompiler';
import { synthesizeOfficialGcpArchCenter78FromPrompt } from './canonical/templateOfficialGcpArchCenterHubSpoke';

interface GcpVersionSnapshot {
  id: string;
  versionTag: string; // e.g. 'v1.0', 'v1.1'
  timestamp: string;
  author: string; // 'Initial Blueprint' | 'Product Manager' | 'Lead Cloud Architect' | 'CISO' etc.
  actionSummary: string;
  canvasDiff: string;
  specDiff: string;
  xml: string;
}

interface GcpChatSuggestion {
  label: string;
  actionPrompt: string;
  type?: 'add' | 'modify' | 'security' | 'cost' | 'observability';
}

interface GcpChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionSummary?: {
    versionTag: string;
    canvasDiff: string;
    specDiff: string;
    persona?: string;
  };
  isQuestionAdvisory?: boolean;
  identifiedGaps?: string[];
  suggestions?: GcpChatSuggestion[];
}

function escapeXmlText(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Cross-Cloud Vendor Translation mapping to authentic Google Cloud services
 */
interface VendorTranslation {
  detectedEntity: string;
  gcpEquivalent: string;
  gcpDescription: string;
  badge: string;
  categoryColor: string;
  targetTierId: string;
}

function detectVendorTranslation(lowerPrompt: string): VendorTranslation | null {
  if (lowerPrompt.includes('s3') || lowerPrompt.includes('aws storage') || lowerPrompt.includes('azure blob')) {
    return {
      detectedEntity: lowerPrompt.includes('azure') ? 'Azure Blob Storage' : 'AWS S3 Bucket',
      gcpEquivalent: 'Google Cloud Storage (Dual-Region)',
      gcpDescription: 'Multi-region bucket with Turbo Replication & CMEK key protection',
      badge: 'STORAGE ADAPTER: GCS',
      categoryColor: '#0284C7',
      targetTierId: 'col_lake_bg',
    };
  }
  if (lowerPrompt.includes('dynamodb') || lowerPrompt.includes('cosmos')) {
    return {
      detectedEntity: lowerPrompt.includes('cosmos') ? 'Azure Cosmos DB' : 'AWS DynamoDB',
      gcpEquivalent: 'Cloud Spanner (Multi-Region)',
      gcpDescription: '99.999% SLA globally distributed relational & key-value engine with zero maintenance',
      badge: 'DATABASE ADAPTER: SPANNER',
      categoryColor: '#4338CA',
      targetTierId: 'col_lake_bg',
    };
  }
  if (lowerPrompt.includes('lambda') || lowerPrompt.includes('azure function')) {
    return {
      detectedEntity: lowerPrompt.includes('azure') ? 'Azure Functions' : 'AWS Lambda',
      gcpEquivalent: 'Cloud Run (Serverless Microservices)',
      gcpDescription: 'Scale-to-zero container runtime with concurrency up to 1000 requests/instance',
      badge: 'COMPUTE ADAPTER: CLOUD RUN',
      categoryColor: '#2563EB',
      targetTierId: 'col_agent_bg',
    };
  }
  if (lowerPrompt.includes('sqs') || lowerPrompt.includes('sns') || lowerPrompt.includes('eventbridge')) {
    return {
      detectedEntity: 'AWS SQS / EventBridge',
      gcpEquivalent: 'Cloud Pub/Sub & Eventarc Mesh',
      gcpDescription: 'High-throughput enterprise event bus with dead-letter topics and schema registry',
      badge: 'EVENTING ADAPTER: PUB/SUB',
      categoryColor: '#D97706',
      targetTierId: 'col_agent_bg',
    };
  }
  if (lowerPrompt.includes('eks') || lowerPrompt.includes('ecs')) {
    return {
      detectedEntity: 'AWS EKS / ECS',
      gcpEquivalent: 'GKE Autopilot Managed Cluster',
      gcpDescription: 'Fully managed Kubernetes cluster with hardened node OS and automated pod autoscaling',
      badge: 'CONTAINER ADAPTER: GKE',
      categoryColor: '#059669',
      targetTierId: 'col_agent_bg',
    };
  }
  return null;
}

/**
 * Dynamically resolves a valid existing vertex ID in `xml` so injected Co-Pilot edges
 * NEVER point to nonexistent `col_*_bg` IDs on Canonical Blueprints (#00-#74) or Logical/Conceptual/Process views.
 * Preserves `preferredDialectATier` when running on Dialect-A templates (`/gcp`).
 */
function resolveValidTargetNodeId(
  xml: string,
  preferredDialectATier: string,
  candidateNodeIds: string[],
  semanticKeywords: string[],
  targetX: number
): { targetId: string; isDialectA: boolean; targetBounds?: { x: number; y: number; w: number; h: number } } {
  if (preferredDialectATier.startsWith('col_') && xml.includes(`id="${preferredDialectATier}"`)) {
    return { targetId: preferredDialectATier, isDialectA: true };
  }

  // Parse all non-copilot component vertices in the diagram
  const vertexRegex = /<mxCell\s+id="([^"]+)"[^>]*vertex="1"[^>]*>[\s\S]*?<mxGeometry\s+([^/>]+)\/?>/g;
  const allVertices = new Map<string, { id: string; x: number; y: number; w: number; h: number; block: string }>();
  const candidates: Array<{ id: string; x: number; y: number; w: number; h: number; block: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = vertexRegex.exec(xml)) !== null) {
    const id = match[1];
    if (!id || id === '0' || id === '1' || id.startsWith('copilot_mod_')) continue;
    const geomAttr = match[2];
    const xMatch = geomAttr.match(/\bx="(-?\d+(?:\.\d+)?)"/);
    const yMatch = geomAttr.match(/\by="(-?\d+(?:\.\d+)?)"/);
    const wMatch = geomAttr.match(/\bwidth="(\d+(?:\.\d+)?)"/);
    const hMatch = geomAttr.match(/\bheight="(\d+(?:\.\d+)?)"/);
    if (!xMatch || !yMatch || !wMatch || !hMatch) continue;
    const x = parseFloat(xMatch[1]);
    const y = parseFloat(yMatch[1]);
    const w = parseFloat(wMatch[1]);
    const h = parseFloat(hMatch[1]);
    const entry = { id, x, y, w, h, block: match[0].toLowerCase() };
    allVertices.set(id, entry);
    // Skip giant background swimlane containers or tiny decorative icons
    if (w > 650 || h > 360 || w < 75 || h < 34) continue;
    candidates.push(entry);
  }

  for (const cid of candidateNodeIds) {
    if (xml.includes(`id="${cid}"`)) {
      const b = allVertices.get(cid);
      return {
        targetId: cid,
        isDialectA: false,
        targetBounds: b ? { x: b.x, y: b.y, w: b.w, h: b.h } : undefined,
      };
    }
  }

  // 1. Try semantic keyword match inside vertex value/id
  for (const kw of semanticKeywords) {
    const kwLower = kw.toLowerCase();
    const hit = candidates.find((c) => c.id.toLowerCase().includes(kwLower) || c.block.includes(kwLower));
    if (hit) {
      return {
        targetId: hit.id,
        isDialectA: false,
        targetBounds: { x: hit.x, y: hit.y, w: hit.w, h: hit.h },
      };
    }
  }

  // 2. Spatial match: pick component in the lower half of the diagram horizontally closest to targetX + 160
  if (candidates.length > 0) {
    const centerX = targetX + 160;
    const sorted = [...candidates].sort((a, b) => {
      const scoreA = a.y * 1.5 - Math.abs(a.x + a.w / 2 - centerX);
      const scoreB = b.y * 1.5 - Math.abs(b.x + b.w / 2 - centerX);
      return scoreB - scoreA;
    });
    const best = sorted[0];
    return {
      targetId: best.id,
      isDialectA: false,
      targetBounds: { x: best.x, y: best.y, w: best.w, h: best.h },
    };
  }

  return { targetId: preferredDialectATier, isDialectA: true };
}

/**
 * Formats a clean title on word boundaries so titles are never cut mid-word (e.g. "Clou").
 */
function formatCleanCardTitle(rawPrompt: string, maxLen = 48): string {
  const stripped = rawPrompt
    .replace(/^[+⚡🛡️🔒📊🤖✉️]+\s*/, '')
    .replace(/^(add|insert|attach|upgrade|implement|enforce|integrate|configure|enable|deploy)\s+/i, '')
    .trim();
  if (stripped.length <= maxLen) return stripped;
  const sliced = stripped.slice(0, maxLen);
  const lastSpace = sliced.lastIndexOf(' ');
  return (lastSpace > 20 ? sliced.slice(0, lastSpace) : sliced).replace(/[&,+/-]+$/, '').trim();
}

/**
 * Highlights & upgrades an existing node in-place inside `xml` when a prompt enhances
 * an existing component (such as `db_spanner`, `dlp_model_armor`, `edge_layer`, `obs_container`, `vector_memory`).
 */
function applyInPlaceNodeUpgrade(
  xml: string,
  nodeId: string,
  accentStrokeColor: string,
  accentFillColor: string,
  textReplacement?: { find: string; replace: string }
): string {
  if (!xml.includes(`id="${nodeId}"`)) return xml;
  const isPaper =
    xml.includes('paper-gcp-ge-multi-agent-2026') || xml.includes('id="pp_spiral_sheet"');
  const isWhiteboard =
    xml.includes('whiteboard-gcp-ge-multi-agent-2026') || xml.includes('id="wb_frame_board"');

  const effectiveFill = isPaper ? '#FEF08A' : accentFillColor;
  const effectiveStroke = isPaper ? '#CA8A04' : accentStrokeColor;
  const effectiveWidth = isWhiteboard ? '4.2' : isPaper ? '3.8' : '2.8';

  const cellRegex = new RegExp(`(<mxCell\\s+id="${nodeId}"[^>]*>)`, 'i');
  return xml.replace(cellRegex, (fullCellTag) => {
    let updatedTag = fullCellTag
      .replace(/strokeColor=#[0-9A-Fa-f]{3,6}/, `strokeColor=${effectiveStroke}`)
      .replace(/strokeWidth=[0-9.]+/, `strokeWidth=${effectiveWidth}`)
      .replace(/fillColor=#[0-9A-Fa-f]{3,6}/, `fillColor=${effectiveFill}`);
    if (textReplacement && updatedTag.includes(textReplacement.find)) {
      updatedTag = updatedTag.replace(textReplacement.find, textReplacement.replace);
    }
    return updatedTag;
  });
}

/**
 * Executes a prompt against an active GCP architecture, mutating the Draw.io XML
 * and producing an immutable version snapshot with action summaries.
 */
export function executeGcpPromptModification(
  currentXml: string,
  promptText: string,
  currentVersionIndex: number | string = 1,
  archId: string = 'blank',
  isDark: boolean = false,
  explicitPersona?: string,
  liveGeminiSpec?: LiveGeminiCopilotModificationSpec | null
): {
  updatedXml: string;
  newVersion: GcpVersionSnapshot;
  assistantMessage: GcpChatMessage;
} {
  const cleanPrompt = promptText.replace(/^\[.*?\]\s*/, '').replace(/^\+\s*/, '').trim();
  const lower = cleanPrompt.toLowerCase().replace(/\barmour\b/g, 'armor');

  // 0A. Style / Formatting / GCP Standard Upgrade Prompt -> Re-compile cleanly into Official #78 Hub-and-Spoke
  if (isStyleOrFormattingPrompt(cleanPrompt)) {
    const diagNameMatch = currentXml.match(/<diagram[^>]*\bname="([^"]+)"/i);
    const existingContext = diagNameMatch?.[1] || '';
    const upgradedXml = synthesizeOfficialGcpArchCenter78FromPrompt(
      existingContext ? `${existingContext} • ${cleanPrompt}` : cleanPrompt
    );
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const verIdx = typeof currentVersionIndex === 'number' ? currentVersionIndex + 1 : 2;
    const versionTag = `v1.0.${verIdx}`;
    const canvasDiff =
      '✨ Re-formatted architecture into the Official Google Cloud Architecture Center (#78 Hub-and-Spoke) visual standard with 18 Google Cloud service cards, numbered step badges (①–⑦), 52px spoke channels, and zero overlapping connectors.';
    const specDiff =
      'Upgraded Visual & Topological Standard to Official Google Cloud Architecture Center (#78 Hub-and-Spoke Reference Architecture).';
    const newVersion: GcpVersionSnapshot = {
      id: `ver_${Date.now()}`,
      versionTag,
      timestamp: nowTime,
      author: explicitPersona || 'Principal Google Cloud Architect',
      actionSummary: canvasDiff,
      canvasDiff,
      specDiff,
      xml: upgradedXml,
    };
    const assistantMessage: GcpChatMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'assistant',
      text: `${canvasDiff}`,
      timestamp: nowTime,
      actionSummary: {
        versionTag,
        canvasDiff,
        specDiff,
        persona: 'Principal Google Cloud Architect',
      },
    };
    return {
      updatedXml: upgradedXml,
      newVersion,
      assistantMessage,
    };
  }

  // 0B. Pre-Validated Stateful Compositional Multi-Turn Architecture Chain Compiler (Chains 1-6, Steps 1..10+)
  if (shouldUseCompositionalChainCompiler(currentXml, cleanPrompt)) {
    const chainRes = compileCompositionalArchitectureChain(currentXml, cleanPrompt);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newVersion: GcpVersionSnapshot = {
      id: `ver_${Date.now()}`,
      versionTag: chainRes.versionTag,
      timestamp: nowTime,
      author: explicitPersona || chainRes.detectedPersona,
      actionSummary: cleanPrompt,
      canvasDiff: chainRes.canvasDiff,
      specDiff: chainRes.specDiff,
      xml: chainRes.xml,
    };
    const assistantMessage: GcpChatMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'assistant',
      text: `${chainRes.canvasDiff} (${chainRes.specDiff})`,
      timestamp: nowTime,
      actionSummary: {
        versionTag: chainRes.versionTag,
        canvasDiff: chainRes.canvasDiff,
        specDiff: chainRes.specDiff,
      },
    };
    return {
      updatedXml: chainRes.xml,
      newVersion,
      assistantMessage,
    };
  }

  // Negative Intent & Removal Detection (Prevents Prompt Inversion)
  const isNegativeRemoval = /\b(remove|delete|drop|strip|without|no\s+|omit|disable|exclude|take\s+away)\b/i.test(cleanPrompt);
  const isReplacement = /\b(replace|swap|switch\s+from|substitute)\b/i.test(cleanPrompt);

  const isNasaAerospaceDomain =
    lower.includes('nasa') ||
    lower.includes('satellite') ||
    lower.includes('satellight') ||
    lower.includes('universe') ||
    lower.includes('multiverse') ||
    lower.includes('orbital') ||
    lower.includes('rocket') ||
    lower.includes('aerospace') ||
    lower.includes('constellation');

  const isDomainRebuildOnBp00 =
    isNasaAerospaceDomain ||
    ((/\b(build|design|create|architect)\b/i.test(cleanPrompt) || lower.includes('harness')) &&
      (lower.includes('health') ||
        lower.includes('clinical') ||
        lower.includes('fhir') ||
        lower.includes('retail') ||
        lower.includes('commerce') ||
        lower.includes('secops') ||
        lower.includes('cyber') ||
        lower.includes('lakehouse') ||
        lower.includes('dataplex')));

  // 1. Detect Persona
  let detectedPersona = explicitPersona || 'User';
  if (!explicitPersona) {
    if (isNasaAerospaceDomain) {
      detectedPersona = 'Mission Systems & Aerospace AI Lead';
    } else if (lower.includes('gemini') || lower.includes('agentic') || lower.includes('adk') || lower.includes('a2a') || lower.includes('mcp') || lower.includes('vertex')) {
      detectedPersona = 'Principal Agentic AI Architect';
    } else if (lower.includes('datawarehouse') || lower.includes('data warehouse') || lower.includes('datawarehousing') || lower.includes('data warehousing') || lower.includes('databricks') || lower.includes('lakehouse') || lower.includes('iceberg') || lower.includes('edw')) {
      detectedPersona = 'Principal Data & Lakehouse Architect';
    } else if (lower.includes('product manager') || lower.includes('patient') || lower.includes('admission') || lower.includes('portal')) {
      detectedPersona = 'Product Manager';
    } else if (lower.includes('lead architect') || lower.includes('spanner') || lower.includes('multi-region') || lower.includes('dr') || lower.includes('failover')) {
      detectedPersona = 'Lead Cloud Architect';
    } else if (lower.includes('ciso') || lower.includes('security') || lower.includes('armor') || lower.includes('waf') || lower.includes('cmek') || lower.includes('hsm') || lower.includes('vpc-sc') || lower.includes('beyondcorp')) {
      detectedPersona = 'CISO / Security Architect';
    } else if (lower.includes('finops') || lower.includes('sre') || lower.includes('cost') || lower.includes('billing') || lower.includes('bigquery') || lower.includes('monitoring') || lower.includes('telemetry') || lower.includes('spot') || lower.includes('scale-to-zero')) {
      detectedPersona = 'FinOps & SRE Lead';
    } else if (lower.includes('cryo-em') || lower.includes('alphafold') || lower.includes('target')) {
      detectedPersona = 'Target-to-Lead Discovery Lead';
    } else if (lower.includes('vector') || lower.includes('chembl') || lower.includes('fingerprint')) {
      detectedPersona = 'Chemical Foundation Architect';
    } else if (lower.includes('sila') || lower.includes('wet-lab') || lower.includes('robot')) {
      detectedPersona = 'Wet-Lab Automation Lead';
    } else if (lower.includes('21 cfr') || lower.includes('gxp') || lower.includes('audit')) {
      detectedPersona = 'GxP Regulatory Compliance Lead';
    } else {
      detectedPersona = 'AI Architecture Co-Pilot';
    }
  }

  const existingCopilotBoxes = (currentXml.match(/id="copilot_mod_[a-z0-9_]*box(?:_\d+)?"/gi) || []).length;
  const normalizedVersionIdx =
    typeof currentVersionIndex === 'number'
      ? Math.max(currentVersionIndex, existingCopilotBoxes + 1)
      : existingCopilotBoxes + 1;
  const normalizedArchId = typeof currentVersionIndex === 'string' ? currentVersionIndex : archId;
  const nextVersionTag = `v1.0.${normalizedVersionIdx + 1}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Count existing vertices in currentXml to detect Blank Canvas or incomplete 1-box stub
  const existingVertexCount = (currentXml.match(/vertex="1"/g) || []).length;
  const isBlankOrStubCanvas =
    !currentXml ||
    currentXml.includes('data-blank-canvas="true"') ||
    normalizedArchId === 'blank' ||
    normalizedArchId === 'blank_canvas' ||
    existingVertexCount < 6;

  const isIncrementalComponentEdit =
    /^(add|insert|attach|upgrade|implement|enforce|integrate|configure|enable|remove|delete|drop|replace|swap|update|modify|connect|wire|include)\b/i.test(
      cleanPrompt
    );

  const isOracleExadataPrompt =
    /\b(oracle|exadata|e-business|ebusiness|\bebs\b|goldengate|weblogic)\b/i.test(lower);

  const isFullArchitectureCreationPrompt =
    !isNegativeRemoval &&
    !isReplacement &&
    !isIncrementalComponentEdit &&
    (/^(please\s+)?(create|build|design|architect|generate|synthesize|show|draw)\b/i.test(
      cleanPrompt
    ) ||
      isNasaAerospaceDomain ||
      isOracleExadataPrompt ||
      /\b(closed[- ]loop|digital[- ]twin|counterfactual)\b/i.test(lower));

  if (isBlankOrStubCanvas || isFullArchitectureCreationPrompt) {
    const isClosedLoopOrNasa =
      isNasaAerospaceDomain || /\b(closed[- ]loop|digital[- ]twin|counterfactual|monte[- ]carlo)\b/i.test(lower);
    const synthesizedFullXml = synthesizePromptDrivenDiagramXml(cleanPrompt, {
      blueprintId: 'custom',
      noTemplate: true,
    });
    const healedFull = validateAndHealDrawioXml(
      synthesizedFullXml,
      isOracleExadataPrompt
        ? 'oracle_ebs_exadata_gcp_split_vpc_official'
        : isClosedLoopOrNasa
        ? 'nasa_multiverse_closed_loop_harness'
        : '78'
    );
    const fullCanvasDiff = isOracleExadataPrompt
      ? `🏛️ Synthesized Official Google Cloud Oracle E-Business Suite (EBS) & Exadata Database Service Split-VPC Architecture for "${cleanPrompt.slice(0, 90)}" with Customer VPC (Dual Active/Active EBS Application Tier Subnet + Shared Services Subnet), Dedicated Interconnect / Partner Interconnect to Oracle Database@Google Cloud Network (Exadata VM Cluster + Standby Exadata VM Cluster with Data Guard Sync), and Google Cloud Native Analytics & Gemini AI Services.`
      : isClosedLoopOrNasa
      ? `🛰️ Synthesized Closed-Loop Mission Control & Parallel 1:3 Multi-Universe Digital-Twin Agentic Harness for "${cleanPrompt.slice(0, 90)}" with Operator Console, Rhombus GO/NO-GO Commit Gate, Abort Quarantine Sink, Hexagon Google ADK Agents, 1:3 Parallel Counterfactual Simulation Rollout Swimlanes (α, β, γ), Pareto Policy Distiller, and 100Hz Telemetry Return Highway.`
      : `🏛️ Synthesized Official Google Cloud Architecture Center (#78) Hub-and-Spoke Reference Architecture for "${cleanPrompt.slice(0, 90)}" (56 vertices, 23 bidirectional edges, 18 Google Cloud service cards across Ingress/Routing Hub, Central Governance Hub, and Dual Execution Spokes).`;
    const fullSpecDiff = isOracleExadataPrompt
      ? `Synthesized complete 31-vertex, 27-edge Official Google Cloud Oracle EBS & Exadata Split-VPC specification and network topology for v1.0.1.`
      : isClosedLoopOrNasa
      ? `Synthesized complete 31-vertex, 26-edge Closed-Loop & Parallel 1:3 Counterfactual Digital-Twin Harness specification and network topology for v1.0.1.`
      : `Synthesized complete 56-vertex, 23-edge Official Google Cloud Architecture Center (#78) Hub-and-Spoke specification and network topology for v1.0.1.`;

    const newVersion: GcpVersionSnapshot = {
      id: `v_${Date.now()}`,
      versionTag: 'v1.0.1',
      timestamp,
      author: detectedPersona,
      actionSummary: fullCanvasDiff,
      canvasDiff: fullCanvasDiff,
      specDiff: fullSpecDiff,
      xml: healedFull.xml,
    };

    const assistantMessage: GcpChatMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'assistant',
      text: `[${detectedPersona}]: Synthesized complete multi-tier architecture diagram for "${cleanPrompt.slice(0, 85)}". Created snapshot v1.0.1.`,
      timestamp,
      actionSummary: {
        versionTag: 'v1.0.1',
        canvasDiff: fullCanvasDiff,
        specDiff: fullSpecDiff,
        persona: detectedPersona,
      },
    };

    return { updatedXml: healedFull.xml, newVersion, assistantMessage };
  }

  let canvasDiff = '';
  let specDiff = '';
  let injectedCellsXml = '';
  let inPlaceUpgradedXml = currentXml;
  if (
    isDomainRebuildOnBp00 &&
    inPlaceUpgradedXml.includes('upgraded-gcp-ge-multi-agent-banking-2026')
  ) {
    inPlaceUpgradedXml = generateUpgradedGcpGeBankingArchitectureXml({
      prompt: cleanPrompt,
      theme: isDark ? 'dark' : 'light',
    });
  }

  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const textDark = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#64748B';

  // Dynamic 2D Coordinate Layout: Guarantee a unique slotIndex that never collides with prior copilot_mod_* cells
  let slotIndex = Math.max(0, existingCopilotBoxes);
  while (
    inPlaceUpgradedXml.includes(`_box_${slotIndex}"`) ||
    inPlaceUpgradedXml.includes(`_edge_${slotIndex}"`)
  ) {
    slotIndex += 1;
  }
  const colOffset = slotIndex % 4;
  const rowOffset = Math.floor(slotIndex / 4);
  const targetX = 312 + colOffset * 340;

  let maxExistingBottomY = 620;
  const cellBlocks = currentXml.split('<mxCell');
  for (const block of cellBlocks) {
    if (block.includes('id="copilot_mod_')) continue;
    const yMatch = block.match(/\by="(-?\d+(?:\.\d+)?)"/);
    const hMatch = block.match(/\bheight="(\d+(?:\.\d+)?)"/);
    if (yMatch && hMatch) {
      const yVal = parseFloat(yMatch[1]);
      const hVal = parseFloat(hMatch[1]);
      // Consider component cards & group containers (height <= 450) so tall column background swimlanes don't skew standard Dialect-A templates
      if (!isNaN(yVal) && !isNaN(hVal) && hVal <= 450 && yVal + hVal > maxExistingBottomY && yVal + hVal < 2400) {
        maxExistingBottomY = yVal + hVal;
      }
    }
  }
  const baseY = maxExistingBottomY > 645 ? Math.ceil(maxExistingBottomY) + 28 : 660;
  const targetY = baseY + rowOffset * 96;

  const buildEdgeStyle = (
    strokeColor: string,
    fontColor: string,
    isDialectA: boolean,
    portSpec = 'exitX=0.5;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;'
  ) =>
    isDialectA
      ? `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${strokeColor};strokeWidth=2.2;dashed=1;fontSize=8.5;fontStyle=1;fontColor=${fontColor};labelBackgroundColor=${cardBg};`
      : `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${portSpec}strokeColor=${strokeColor};strokeWidth=2.4;dashed=1;dashPattern=5 3;endArrow=block;endFill=1;fontSize=9;fontStyle=1;fontColor=${fontColor};labelBackgroundColor=${cardBg};`;

  const renderSynthesizedCardAndEdge = (params: {
    boxId: string;
    badgeId: string;
    titleId: string;
    descId: string;
    edgeId: string;
    boxFill: string;
    strokeColor: string;
    badgeColor: string;
    badgeText: string;
    titleText: string;
    descText: string;
    edgeLabel: string;
    resolved: {
      targetId: string;
      isDialectA: boolean;
      targetBounds?: { x: number; y: number; w: number; h: number };
    };
    titleFontSize?: number;
  }): { xml: string; maxRight: number; maxBottom: number } => {
    const {
      boxId,
      badgeId,
      titleId,
      descId,
      edgeId,
      boxFill,
      strokeColor,
      badgeColor,
      badgeText,
      titleText,
      descText,
      edgeLabel,
      resolved,
      titleFontSize = 10,
    } = params;

    const isWhiteboardMode =
      inPlaceUpgradedXml.includes('whiteboard-gcp-ge-multi-agent-2026') ||
      inPlaceUpgradedXml.includes('id="wb_frame_board"');
    const isPaperMode =
      inPlaceUpgradedXml.includes('paper-gcp-ge-multi-agent-2026') ||
      inPlaceUpgradedXml.includes('id="pp_spiral_sheet"');
    const isSketchMode = isWhiteboardMode || isPaperMode;

    // -------------------------------------------------------------------------
    // SKETCH MODE RETENTION (WHITEBOARD & PAPER):
    // Keep synthesized cards 100% inside the 1400x840 Whiteboard or Spiral Paper
    // surface and render with authentic handwritten marker / highlighter styles!
    // -------------------------------------------------------------------------
    if (isSketchMode) {
      const sketchSlots = [
        {
          matchIds: ['obs_container', 'iam_auth', 'db_spanner', 'db_bigtable', 'db_firestore'],
          x: 62,
          y: 668,
          w: 200,
          h: 76,
          portSpec:
            resolved.targetId === 'obs_container' || resolved.targetId === 'iam_auth'
              ? 'exitX=0.5;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;'
              : 'exitX=1;exitY=0.25;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;',
        },
        {
          matchIds: ['dlp_model_armor', 'llm_container', 'gemini_models', 'vector_memory'],
          x: 960,
          y: 28,
          w: 290,
          h: 72,
          portSpec:
            resolved.targetId === 'dlp_model_armor'
              ? 'exitX=0.25;exitY=1;exitDx=0;exitDy=0;entryX=0.75;entryY=0;entryDx=0;entryDy=0;'
              : 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;',
        },
        {
          matchIds: ['ui_chat', 'edge_layer', 'identity_auth', 'api_cloud_run', 'coordinator_agent'],
          x: 64,
          y: 28,
          w: 280,
          h: 72,
          portSpec: 'exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;',
        },
        {
          matchIds: [],
          x: 1122,
          y: 128,
          w: 182,
          h: 74,
          portSpec: 'exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;',
        },
      ];

      let chosenSlot =
        sketchSlots.find(
          (s) =>
            s.matchIds.includes(resolved.targetId) &&
            !inPlaceUpgradedXml.includes(`x="${s.x}" y="${s.y}"`)
        ) ||
        sketchSlots.find((s) => !inPlaceUpgradedXml.includes(`x="${s.x}" y="${s.y}"`)) ||
        sketchSlots[slotIndex % sketchSlots.length];

      const sx = chosenSlot.x;
      const sy = chosenSlot.y;
      const sw = chosenSlot.w;
      const sh = chosenSlot.h;
      const sketchFont = 'fontFamily=Architects Daughter,Caveat,Comic Sans MS,cursive;';

      const hlCellXml = isPaperMode
        ? `<mxCell id="${boxId}_hl" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FEF08A;strokeColor=#FACC15;strokeWidth=6;" vertex="1" parent="1"><mxGeometry x="${sx - 3}" y="${sy - 3}" width="${sw + 6}" height="${sh + 6}" as="geometry" /></mxCell>`
        : '';

      const sketchBoxFill = isPaperMode ? '#FAF8F2' : '#FFFFFF';
      const sketchStroke = isPaperMode ? '#1E293B' : strokeColor;
      const sketchWidth = isWhiteboardMode ? '3.2' : '2.4';

      const sketchXml = `
      ${hlCellXml}
      <mxCell id="${boxId}" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${sketchBoxFill};strokeColor=${sketchStroke};strokeWidth=${sketchWidth};dashed=1;dashPattern=6 4;" vertex="1" parent="1">
        <mxGeometry x="${sx}" y="${sy}" width="${sw}" height="${sh}" as="geometry" />
      </mxCell>
      <mxCell id="${badgeId}" value="${badgeText}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${sketchFont}fontSize=8;fontStyle=1;fontColor=${badgeColor};" vertex="1" parent="1">
        <mxGeometry x="${sx + 4}" y="${sy + 3}" width="${sw - 8}" height="14" as="geometry" />
      </mxCell>
      <mxCell id="${titleId}" value="${titleText}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${sketchFont}fontSize=9;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
        <mxGeometry x="${sx + 4}" y="${sy + 17}" width="${sw - 8}" height="18" as="geometry" />
      </mxCell>
      <mxCell id="${descId}" value="${descText}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;align=center;verticalAlign=top;${sketchFont}fontSize=7.5;fontStyle=1;fontColor=#334155;" vertex="1" parent="1">
        <mxGeometry x="${sx + 5}" y="${sy + 36}" width="${sw - 10}" height="${sh - 40}" as="geometry" />
      </mxCell>
      <mxCell id="${edgeId}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;${chosenSlot.portSpec}strokeColor=${sketchStroke};strokeWidth=2.4;dashed=1;dashPattern=5 4;endArrow=classic;endFill=1;" edge="1" parent="1" source="${boxId}" target="${resolved.targetId}">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
      `;

      return {
        xml: sketchXml,
        maxRight: 1400,
        maxBottom: 840,
      };
    }

    let boxX = targetX;
    let boxY = targetY;
    let boxW = 304;
    const boxH = 78;
    let portSpec = 'exitX=0.5;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;';
    let waypoints: Array<{ x: number; y: number }> = [];
    const isBlueprint00 = inPlaceUpgradedXml.includes('upgraded-gcp-ge-multi-agent-banking-2026');
    const effectiveEdgeLabel = isBlueprint00 ? '' : edgeLabel;

    // Align horizontally beneath resolved.targetBounds on non-Blueprint-00 diagrams (e.g. Oracle Exadata Split-VPC, NASA, #78)
    if (resolved.targetBounds && !isBlueprint00) {
      boxW = Math.max(286, Math.min(340, Math.round(resolved.targetBounds.w)));
      const alignedX = Math.round(resolved.targetBounds.x + (resolved.targetBounds.w - boxW) / 2);
      boxX = Math.max(40, Math.min(1340, alignedX));
      boxY = baseY;
    }

    if (!resolved.isDialectA && isBlueprint00) {
      if (resolved.targetId === 'obs_container') {
        boxX = 16;
        boxY = 668;
        boxW = 250;
        portSpec = 'exitX=0.40;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;';
      } else if (resolved.targetId === 'dlp_model_armor') {
        boxX = 1185;
        boxY = 211;
        boxW = 265;
        portSpec = 'exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;';
      } else if (resolved.targetId === 'db_spanner') {
        boxX = 304;
        boxY = 828;
        boxW = 280;
        portSpec = 'exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;';
        waypoints = [
          { x: 284, y: 865 },
          { x: 284, y: 642 },
        ];
      } else if (resolved.targetId === 'edge_layer' || resolved.targetId === 'identity_auth') {
        boxX = 110;
        boxY = 107;
        boxW = 275;
        portSpec = 'exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;';
      } else if (resolved.targetId === 'ui_chat') {
        boxX = 150;
        boxY = 14;
        boxW = 275;
        portSpec = 'exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;';
      } else if (resolved.targetId === 'vector_memory') {
        boxX = 1185;
        boxY = 668;
        boxW = 265;
        portSpec = 'exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=0.85;entryY=1;entryDx=0;entryDy=0;';
        waypoints = [{ x: 1100, y: 705 }];
      } else if (
        resolved.targetId === 'llm_container' ||
        resolved.targetId === 'open_models' ||
        resolved.targetId === 'gemini_models'
      ) {
        boxX = 1235;
        boxY = 381;
        boxW = 255;
        portSpec = 'exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;';
      } else if (
        resolved.targetId === 'coordinator_agent' ||
        resolved.targetId === 'transaction_agent' ||
        resolved.targetId === 'api_cloud_run'
      ) {
        boxX = 80;
        boxY = 206;
        boxW = 265;
        portSpec = 'exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;';
      }
    }

    // Prevent horizontal/vertical collision if a previous Co-Pilot prompt already placed a card at (boxX, boxY)
    const candidateCols = [boxX, 992, 652, 312, 1332];
    let placedWithoutCollision = false;
    for (const candX of candidateCols) {
      const hasOverlap =
        inPlaceUpgradedXml.includes(`x="${candX}" y="${boxY}"`) ||
        inPlaceUpgradedXml.includes(`x="${candX + 5}" y="${boxY + 4}"`);
      if (!hasOverlap) {
        boxX = candX;
        placedWithoutCollision = true;
        break;
      }
    }
    while (
      !placedWithoutCollision &&
      (inPlaceUpgradedXml.includes(`x="${boxX}" y="${boxY}"`) ||
        inPlaceUpgradedXml.includes(`x="${boxX + 5}" y="${boxY + 4}"`))
    ) {
      boxY += 96;
      if (waypoints.length > 0) {
        waypoints[0] = { x: waypoints[0].x, y: boxY + 37 };
      }
    }

    const ptsXml =
      waypoints.length > 0
        ? `<Array as="points">${waypoints.map((pt) => `<mxPoint x="${pt.x}" y="${pt.y}"/>`).join('')}</Array>`
        : '';

    const xml = `
      <mxCell id="${boxId}" value="" style="rounded=1;arcSize=6;fillColor=${boxFill};strokeColor=${strokeColor};strokeWidth=2.2;dashed=1;dashPattern=5 3;" vertex="1" parent="1">
        <mxGeometry x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" as="geometry" />
      </mxCell>
      <mxCell id="${badgeId}" value="${badgeText}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=${badgeColor};" vertex="1" parent="1">
        <mxGeometry x="${boxX + 5}" y="${boxY + 4}" width="${boxW - 10}" height="15" as="geometry" />
      </mxCell>
      <mxCell id="${titleId}" value="${titleText}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=${titleFontSize};fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${boxX + 5}" y="${boxY + 21}" width="${boxW - 10}" height="18" as="geometry" />
      </mxCell>
      <mxCell id="${descId}" value="${descText}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${boxX + 5}" y="${boxY + 41}" width="${boxW - 10}" height="30" as="geometry" />
      </mxCell>
      <mxCell id="${edgeId}" value="${effectiveEdgeLabel}" style="${buildEdgeStyle(strokeColor, badgeColor, resolved.isDialectA, portSpec)}" edge="1" parent="1" source="${boxId}" target="${resolved.targetId}">
        <mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>
      </mxCell>
    `;

    return {
      xml,
      maxRight: boxX + boxW + 28,
      maxBottom: boxY + boxH + 28,
    };
  };

  let renderedPlacement = { xml: '', maxRight: 1280, maxBottom: targetY + 100 };

  // Cross-Vendor Translation Check
  const vendorMatch = detectVendorTranslation(lower);

  const isGeminiEnterpriseOrAgenticPrompt =
    (lower.includes('gemini') && (lower.includes('enterprise') || lower.includes('app') || lower.includes('agent'))) ||
    lower.includes('agentic ai') ||
    lower.includes('agentic app') ||
    lower.includes('google adk') ||
    lower.includes('agent engine') ||
    lower.includes('a2a') ||
    lower.includes('mcp server');

  const isDataWarehouseOrLakehousePrompt =
    lower.includes('datawarehouse') ||
    lower.includes('datawarehousing') ||
    lower.includes('data warehouse') ||
    lower.includes('data warehousing') ||
    lower.includes('databricks') ||
    lower.includes('lakehouse') ||
    lower.includes('biglake') ||
    lower.includes('iceberg') ||
    lower.includes('edw');

  // 2. Intelligent Draw.io XML Mutation according to prompt intent + Live Gemini API Spec
  if (isNegativeRemoval && (lower.includes('spanner') || lower.includes('armor') || lower.includes('waf') || lower.includes('portal') || lower.includes('tpu'))) {
    const targetComp = lower.includes('spanner')
      ? 'Cloud Spanner'
      : lower.includes('armor') || lower.includes('waf')
      ? 'Cloud Armor WAF'
      : lower.includes('portal')
      ? 'Patient Intake Portal'
      : 'Specialized Hardware';

    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_agent_bg',
      ['db_spanner', 'edge_layer', 'api_cloud_run', 'coordinator_agent'],
      ['spanner', 'armor', 'gateway', 'agent'],
      targetX
    );

    canvasDiff = `- Decoupled & isolated ${targetComp}; re-routed traffic to core fallback pipelines.`;
    specDiff = `Reconciled DOC-03 (System Architecture) & DOC-07 (Topology Isolation).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_decouple_box_${slotIndex}`,
      badgeId: `copilot_mod_decouple_badge_${slotIndex}`,
      titleId: `copilot_mod_decouple_title_${slotIndex}`,
      descId: `copilot_mod_decouple_desc_${slotIndex}`,
      edgeId: `copilot_mod_decouple_edge_${slotIndex}`,
      boxFill: isDark ? '#450A0A' : '#FEF2F2',
      strokeColor: '#EF4444',
      badgeColor: '#B91C1C',
      badgeText: `✂️ COMPONENT DECOUPLED: ${escapeXmlText(targetComp.toUpperCase())}`,
      titleText: `${escapeXmlText(targetComp)} Removed / Decoupled`,
      descText: 'Traffic isolated and re-directed to primary gateway fallback path',
      edgeLabel: 'Decoupled Route',
      resolved,
    });
  } else if (isReplacement && lower.includes('spanner') && (lower.includes('postgres') || lower.includes('sql') || lower.includes('cloud sql'))) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'db_spanner', '#059669', '#ECFDF5', {
      find: 'Cloud Spanner',
      replace: 'Cloud SQL PG16 HA',
    });
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_lake_bg',
      ['db_spanner', 'db_bigtable', 'grp_accounts'],
      ['spanner', 'database', 'sql', 'storage'],
      targetX
    );

    canvasDiff = `⇄ Replaced Cloud Spanner with Cloud SQL PostgreSQL High-Availability Cluster with cross-zone standby.`;
    specDiff = `Reconciled DOC-03 (System Architecture), DOC-05 (Database DDL), and DOC-08 (HA Standby Protocol).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_cloudsql_box_${slotIndex}`,
      badgeId: `copilot_mod_cloudsql_badge_${slotIndex}`,
      titleId: `copilot_mod_cloudsql_title_${slotIndex}`,
      descId: `copilot_mod_cloudsql_desc_${slotIndex}`,
      edgeId: `copilot_mod_cloudsql_edge_${slotIndex}`,
      boxFill: isDark ? '#1E293B' : '#F0FDF4',
      strokeColor: '#10B981',
      badgeColor: '#059669',
      badgeText: '⇄ REPLACED: CLOUD SQL POSTGRESQL HA',
      titleText: 'Cloud SQL Enterprise Plus (PostgreSQL 16)',
      descText: 'Cross-zone HA replication with automated regional SSD storage scaling',
      edgeLabel: 'Relational Persistence',
      resolved,
    });
  } else if (isGeminiEnterpriseOrAgenticPrompt) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'cortex_vertex_agents', '#1A73E8', '#E8F0FE');
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'coordinator_agent', '#1A73E8', '#E8F0FE');
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'cortex_vertex_agents',
      [
        'cortex_vertex_agents',
        'coordinator_agent',
        'coord_agent',
        'gemini_models',
        'llm_container',
        'ebs_wls_zone_a',
        'api_cloud_run',
      ],
      liveGeminiSpec?.targetKeywords?.length
        ? [...liveGeminiSpec.targetKeywords, 'vertex', 'gemini', 'agent', 'adk', 'cortex']
        : ['vertex', 'gemini', 'agent', 'adk', 'cortex', 'weblogic'],
      992
    );

    const gemBadge = liveGeminiSpec?.badgeText
      ? escapeXmlText(liveGeminiSpec.badgeText)
      : `🤖 LIVE GEMINI CO-PILOT (${nextVersionTag.toUpperCase()}): AGENTIC AI PLANE`;
    const gemTitle = liveGeminiSpec?.titleText
      ? escapeXmlText(liveGeminiSpec.titleText)
      : 'Gemini Enterprise App (Vertex AI Agent Engine + ADK)';
    const gemDesc = liveGeminiSpec?.descText
      ? escapeXmlText(liveGeminiSpec.descText)
      : 'A2A &amp; MCP Tool Orchestration • EBS ISG REST &amp; BigQuery Cortex RAG Grounding';
    const gemEdge = liveGeminiSpec?.edgeLabel
      ? escapeXmlText(liveGeminiSpec.edgeLabel)
      : 'A2A / MCP Agentic Bus';

    canvasDiff =
      liveGeminiSpec?.canvasDiff ||
      `🤖 Live Gemini Synthesis (${nextVersionTag}): Added ${gemTitle} connected to ${resolved.targetId} via ${gemEdge} with Vertex AI Agent Engine, Google ADK, and Model Armor guardrails.`;
    specDiff =
      liveGeminiSpec?.specDiff ||
      `Reconciled Agentic AI Plane, A2A/MCP Tool Contracts, and Vertex AI Agent Engine topology for ${nextVersionTag}.`;

    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_gemini_agent_box_${slotIndex}`,
      badgeId: `copilot_mod_gemini_agent_badge_${slotIndex}`,
      titleId: `copilot_mod_gemini_agent_title_${slotIndex}`,
      descId: `copilot_mod_gemini_agent_desc_${slotIndex}`,
      edgeId: `copilot_mod_gemini_agent_edge_${slotIndex}`,
      boxFill: isDark ? '#1E3A8A' : '#E8F0FE',
      strokeColor: '#1A73E8',
      badgeColor: '#174EA6',
      badgeText: gemBadge,
      titleText: gemTitle,
      descText: gemDesc,
      edgeLabel: gemEdge,
      resolved,
      titleFontSize: 9.8,
    });
  } else if (isDataWarehouseOrLakehousePrompt) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'cortex_bigquery', '#0284C7', '#E0F2FE');
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'cortex_goldengate', '#0284C7', '#E0F2FE');
    const extractedSubjectRaw = cleanPrompt
      .replace(/^(?:please\s+)?(?:add|insert|include|integrate|connect)\s+/i, '')
      .split(/\s+(?:for|to|with|in|on|as)\s+/i)[0]
      ?.trim();
    const extractedBrand =
      extractedSubjectRaw &&
      extractedSubjectRaw.length >= 2 &&
      extractedSubjectRaw.length <= 24 &&
      !/data\s*warehous/i.test(extractedSubjectRaw)
        ? extractedSubjectRaw.charAt(0).toUpperCase() + extractedSubjectRaw.slice(1)
        : '';
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'cortex_bigquery',
      [
        'cortex_bigquery',
        'cortex_goldengate',
        'db_spanner',
        'db_bigtable',
        'vector_search_db',
        'exa_dataguard_dr',
      ],
      liveGeminiSpec?.targetKeywords?.length
        ? [...liveGeminiSpec.targetKeywords, 'bigquery', 'cortex', 'goldengate', 'warehouse', 'spanner']
        : ['bigquery', 'cortex', 'goldengate', 'warehouse', 'iceberg', 'spanner'],
      652
    );

    const dwBadge = liveGeminiSpec?.badgeText
      ? escapeXmlText(liveGeminiSpec.badgeText)
      : extractedBrand
      ? `❄️ LIVE GEMINI CO-PILOT (${nextVersionTag.toUpperCase()}): ${escapeXmlText(extractedBrand.toUpperCase())} EDW`
      : `🏛️ LIVE GEMINI CO-PILOT (${nextVersionTag.toUpperCase()}): ENTERPRISE DATA WAREHOUSE`;
    const dwTitle = liveGeminiSpec?.titleText
      ? escapeXmlText(liveGeminiSpec.titleText)
      : extractedBrand
      ? `${escapeXmlText(extractedBrand)} Enterprise Data Warehouse (on GCP)`
      : 'BigQuery &amp; BigLake Iceberg Enterprise Data Warehouse';
    const dwDesc = liveGeminiSpec?.descText
      ? escapeXmlText(liveGeminiSpec.descText)
      : extractedBrand
      ? 'Streaming Ingestion &amp; BigLake Apache Iceberg Federation • GoldenGate 23ai CDC Sync'
      : 'Cross-Cloud Apache Iceberg Open Lakehouse • Zero-Copy Analytics &amp; BI Marts';
    const dwEdge = liveGeminiSpec?.edgeLabel
      ? escapeXmlText(liveGeminiSpec.edgeLabel)
      : 'BigLake Iceberg / CDC Sync';

    canvasDiff =
      liveGeminiSpec?.canvasDiff ||
      `❄️ Live Gemini Synthesis (${nextVersionTag}): Integrated ${dwTitle} connected to ${resolved.targetId} via ${dwEdge} for real-time ERP & analytical data warehousing.`;
    specDiff =
      liveGeminiSpec?.specDiff ||
      `Reconciled Enterprise Data Warehouse Schema, Apache Iceberg Catalog Federation, and GoldenGate CDC Pipeline for ${nextVersionTag}.`;

    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_edw_box_${slotIndex}`,
      badgeId: `copilot_mod_edw_badge_${slotIndex}`,
      titleId: `copilot_mod_edw_title_${slotIndex}`,
      descId: `copilot_mod_edw_desc_${slotIndex}`,
      edgeId: `copilot_mod_edw_edge_${slotIndex}`,
      boxFill: isDark ? '#0C4A6E' : '#E0F2FE',
      strokeColor: '#0284C7',
      badgeColor: '#0369A1',
      badgeText: dwBadge,
      titleText: dwTitle,
      descText: dwDesc,
      edgeLabel: dwEdge,
      resolved,
      titleFontSize: 9.8,
    });
  } else if (vendorMatch) {
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      vendorMatch.targetTierId,
      ['db_spanner', 'api_cloud_run', 'coordinator_agent', 'vector_memory', 'cortex_bigquery', 'cortex_vertex_agents'],
      ['spanner', 'cloud_run', 'agent', 'storage', 'bigquery', 'vertex'],
      targetX
    );
    canvasDiff = `☁️ Mapped [${vendorMatch.detectedEntity}] $\\to$ [${vendorMatch.gcpEquivalent}] with enterprise zero-trust controls.`;
    specDiff = `Reconciled DOC-04 (Component Catalog), DOC-06 (Vendor Translation Map), and DOC-08 (Cloud Architecture).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_vendor_box_${slotIndex}`,
      badgeId: `copilot_mod_vendor_badge_${slotIndex}`,
      titleId: `copilot_mod_vendor_title_${slotIndex}`,
      descId: `copilot_mod_vendor_desc_${slotIndex}`,
      edgeId: `copilot_mod_vendor_edge_${slotIndex}`,
      boxFill: isDark ? '#1E293B' : '#EFF6FF',
      strokeColor: vendorMatch.categoryColor,
      badgeColor: vendorMatch.categoryColor,
      badgeText: escapeXmlText(vendorMatch.badge),
      titleText: escapeXmlText(vendorMatch.gcpEquivalent),
      descText: escapeXmlText(vendorMatch.gcpDescription),
      edgeLabel: 'Mapped Endpoint',
      resolved,
    });
  } else if (lower.includes('spanner') || lower.includes('multi-region') || lower.includes('dr') || lower.includes('failover') || lower.includes('lead architect')) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'db_spanner', '#4338CA', '#EEF2FF', {
      find: '(TrueTime &amp; Graph)',
      replace: '(Multi-Region nam3 HA • RPO &lt; 1s)',
    });
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_lake_bg',
      ['db_spanner', 'grp_accounts', 'db_bigtable', 'exa_dataguard_dr'],
      ['spanner', 'database', 'persistence', 'ledger', 'dataguard'],
      targetX
    );
    canvasDiff = `⚡ Upgraded Cloud Spanner to Active-Active Multi-Region (nam3) with europe-west1 DR witness and cross-region interconnect.`;
    specDiff = `Reconciled DOC-03 (System Architecture), DOC-05 (Infrastructure & DDL), and DOC-08 (Disaster Recovery).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_spanner_box_${slotIndex}`,
      badgeId: `copilot_mod_spanner_badge_${slotIndex}`,
      titleId: `copilot_mod_spanner_title_${slotIndex}`,
      descId: `copilot_mod_spanner_desc_${slotIndex}`,
      edgeId: `copilot_mod_spanner_edge_${slotIndex}`,
      boxFill: isDark ? '#312E81' : '#EEF2FF',
      strokeColor: '#4338CA',
      badgeColor: '#4338CA',
      badgeText: '🏗️ CO-PILOT INJECTED: MULTI-REGION NAM3 DR',
      titleText: 'Cloud Spanner Active-Active nam3 Leader',
      descText: 'Witness in europe-west1 with RPO &lt; 1s and automated zero-loss failover',
      edgeLabel: 'Dual-Leader Replication',
      resolved,
    });
  } else if (lower.includes('model armor') || lower.includes('prompt-injection') || lower.includes('prompt injection') || lower.includes('guardrail')) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'dlp_model_armor', '#7C3AED', '#FAF5FF', {
      find: '(DLP PII Redaction &amp; Guardrails)',
      replace: '(Prompt-Injection Firewall &amp; DLP)',
    });
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'node_model_armor', '#7C3AED', '#FAF5FF');
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_ingress_bg',
      ['dlp_model_armor', 'node_model_armor', 'edge_layer', 'api_cloud_run', 'cortex_vertex_agents'],
      ['model_armor', 'armor', 'guardrail', 'security', 'gateway', 'vertex'],
      targetX
    );
    canvasDiff = `🛡️ Upgraded Model Armor & SDP in-place + inserted Vertex AI Model Armor Prompt-Injection Firewall & inline DLP token redaction.`;
    specDiff = `Reconciled DOC-06 (Security & Threat Model), DOC-07 (AI Safety Guardrails), and DOC-10 (Compliance Matrix).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_modelarmor_box_${slotIndex}`,
      badgeId: `copilot_mod_modelarmor_badge_${slotIndex}`,
      titleId: `copilot_mod_modelarmor_title_${slotIndex}`,
      descId: `copilot_mod_modelarmor_desc_${slotIndex}`,
      edgeId: `copilot_mod_modelarmor_edge_${slotIndex}`,
      boxFill: isDark ? '#4C1D95' : '#FAF5FF',
      strokeColor: '#7C3AED',
      badgeColor: '#6D28D9',
      badgeText: '🛡️ CO-PILOT UPGRADE: VERTEX AI MODEL ARMOR',
      titleText: 'Vertex AI Model Armor Prompt-Injection Firewall',
      descText: 'Inline jailbreak detection, PII/PCI token redaction &amp; adversarial filter',
      edgeLabel: 'Inline Prompt Shield',
      resolved,
    });
  } else if (lower.includes('beyondcorp') || lower.includes('identity-aware proxy') || lower.includes('iap')) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'edge_layer', '#6D28D9', '#F5F3FF');
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'identity_auth', '#6D28D9', '#F5F3FF');
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_ingress_bg',
      ['gcp_iap_bastion', 'edge_layer', 'identity_auth', 'iam_auth', 'api_cloud_run'],
      ['iap', 'bastion', 'edge', 'identity', 'iam', 'ingress'],
      targetX
    );
    canvasDiff = `🔐 Upgraded Edge Layer in-place + inserted BeyondCorp Zero-Trust Identity-Aware Proxy (IAP) & Context-Aware Access.`;
    specDiff = `Reconciled DOC-06 (Zero-Trust Perimeter), DOC-17 (IAM Federation), and DOC-10 (Compliance Matrix).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_beyondcorp_box_${slotIndex}`,
      badgeId: `copilot_mod_beyondcorp_badge_${slotIndex}`,
      titleId: `copilot_mod_beyondcorp_title_${slotIndex}`,
      descId: `copilot_mod_beyondcorp_desc_${slotIndex}`,
      edgeId: `copilot_mod_beyondcorp_edge_${slotIndex}`,
      boxFill: isDark ? '#4C1D95' : '#F5F3FF',
      strokeColor: '#7C3AED',
      badgeColor: '#6D28D9',
      badgeText: '🔐 CO-PILOT UPGRADE: BEYONDCORP ZERO-TRUST IAP',
      titleText: 'BeyondCorp Enterprise IAP &amp; Context-Aware Access',
      descText: 'Device posture verification, mTLS identity proxy &amp; Cloud Armor WAF',
      edgeLabel: 'Zero-Trust IAP',
      resolved,
    });
  } else if (lower.includes('armor') || lower.includes('waf') || lower.includes('security') || lower.includes('ciso') || lower.includes('cmek')) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'edge_layer', '#7C3AED', '#FAF5FF');
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_ingress_bg',
      ['gcp_alb_armor', 'cortex_kms_ops', 'edge_layer', 'dlp_model_armor', 'iam_auth'],
      ['edge', 'armor', 'security', 'waf', 'ingress', 'kms'],
      targetX
    );
    canvasDiff = `🔒 Enforced Cloud Armor Enterprise WAF, Cloud KMS HSM CMEK keys, and VPC Service Controls perimeter shield.`;
    specDiff = `Reconciled DOC-06 (Security & Threat Model) and DOC-10 (Compliance Matrix).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_security_box_${slotIndex}`,
      badgeId: `copilot_mod_security_badge_${slotIndex}`,
      titleId: `copilot_mod_security_title_${slotIndex}`,
      descId: `copilot_mod_security_desc_${slotIndex}`,
      edgeId: `copilot_mod_security_edge_${slotIndex}`,
      boxFill: isDark ? '#4C1D95' : '#FAF5FF',
      strokeColor: '#7C3AED',
      badgeColor: '#6D28D9',
      badgeText: '🛡️ CO-PILOT INJECTED: ZERO-TRUST PERIMETER',
      titleText: 'Cloud Armor Enterprise WAF &amp; VPC-SC Perimeter',
      descText: 'Adaptive DDoS layer 7 filtering, OWASP Top 10 rules &amp; FIPS 140-2 Level 3 CMEK',
      edgeLabel: 'Zero-Trust Shield',
      resolved,
    });
  } else if (
    lower.includes('finops') ||
    lower.includes('bigquery') ||
    lower.includes('billing') ||
    lower.includes('cost') ||
    lower.includes('monitoring') ||
    lower.includes('telemetry') ||
    lower.includes('trace') ||
    lower.includes('scale-to-zero')
  ) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'obs_container', '#0D9488', '#F0FDFA', {
      find: 'GCP FinOps Hub',
      replace: 'BigQuery FinOps &amp; Cost AI',
    });
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_agent_bg',
      ['cortex_bigquery', 'cortex_kms_ops', 'obs_container', 'db_bigtable', 'coordinator_agent'],
      ['bigquery', 'obs', 'finops', 'monitoring', 'logging', 'telemetry'],
      targetX
    );
    canvasDiff = `📊 Upgraded GCP Observability & FinOps Hub in-place + attached BigQuery Cost Intelligence & Cloud Billing Anomaly Pipeline.`;
    specDiff = `Reconciled DOC-11 (SRE & OpenTelemetry Spec) and DOC-14 (Cloud FinOps & Unit Economics Model).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_finops_box_${slotIndex}`,
      badgeId: `copilot_mod_finops_badge_${slotIndex}`,
      titleId: `copilot_mod_finops_title_${slotIndex}`,
      descId: `copilot_mod_finops_desc_${slotIndex}`,
      edgeId: `copilot_mod_finops_edge_${slotIndex}`,
      boxFill: isDark ? '#042F2E' : '#F0FDFA',
      strokeColor: '#0D9488',
      badgeColor: '#0F766E',
      badgeText: '📊 CO-PILOT UPGRADE: FINOPS &amp; COST INTELLIGENCE',
      titleText: 'BigQuery Cost Intelligence &amp; Billing Anomaly AI',
      descText: 'Real-time token spend attribution, Cloud Billing export &amp; OTel Collector',
      edgeLabel: 'FinOps &amp; OTel Stream',
      resolved,
    });
  } else {
    // Custom Arbitrary Prompt synthesis driven by Live Gemini API Spec (or fallback semantic rules)
    const fallbackTitle = escapeXmlText(formatCleanCardTitle(cleanPrompt, 48));
    const customTitle = liveGeminiSpec?.titleText
      ? escapeXmlText(liveGeminiSpec.titleText)
      : fallbackTitle;
    const customBadge = liveGeminiSpec?.badgeText
      ? escapeXmlText(liveGeminiSpec.badgeText)
      : `🤖 LIVE GEMINI CO-PILOT (${nextVersionTag.toUpperCase()})`;
    const customDesc = liveGeminiSpec?.descText
      ? escapeXmlText(liveGeminiSpec.descText)
      : 'Synthesized &amp; connected by Google Cloud Architecture Co-Pilot';
    const customEdge = liveGeminiSpec?.edgeLabel
      ? escapeXmlText(liveGeminiSpec.edgeLabel)
      : 'Synthesized Link';
    const customStroke = liveGeminiSpec?.accentColor || '#2563EB';
    const customFill = isDark ? '#1E293B' : liveGeminiSpec?.fillColor || '#EFF6FF';

    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_agent_bg',
      [
        'cortex_vertex_agents',
        'cortex_bigquery',
        'cortex_goldengate',
        'coordinator_agent',
        'transaction_agent',
        'api_cloud_run',
        'db_spanner',
      ],
      liveGeminiSpec?.targetKeywords?.length
        ? liveGeminiSpec.targetKeywords
        : ['vertex', 'bigquery', 'goldengate', 'coordinator', 'agent', 'gateway', 'spanner'],
      targetX
    );
    canvasDiff =
      liveGeminiSpec?.canvasDiff ||
      `+ Live Gemini Synthesis (${nextVersionTag}): Added "${customTitle}" connected to ${resolved.targetId} via ${customEdge}.`;
    specDiff =
      liveGeminiSpec?.specDiff ||
      `Reconciled system specifications, data dictionary, and infrastructure topology for version ${nextVersionTag}.`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_custom_box_${slotIndex}`,
      badgeId: `copilot_mod_custom_badge_${slotIndex}`,
      titleId: `copilot_mod_custom_title_${slotIndex}`,
      descId: `copilot_mod_custom_desc_${slotIndex}`,
      edgeId: `copilot_mod_custom_edge_${slotIndex}`,
      boxFill: customFill,
      strokeColor: customStroke,
      badgeColor: customStroke,
      badgeText: customBadge,
      titleText: customTitle,
      descText: customDesc,
      edgeLabel: customEdge,
      resolved,
      titleFontSize: 9.5,
    });
  }

  injectedCellsXml = renderedPlacement.xml;

  // 3. Inject cells before </root> tag cleanly and expand pageWidth/pageHeight if needed
  let mutatedXml = inPlaceUpgradedXml;
  if (mutatedXml.includes('</root>')) {
    mutatedXml = mutatedXml.replace('</root>', `${injectedCellsXml}\n        </root>`);
  }
  const requiredWidth = renderedPlacement.maxRight;
  const requiredHeight = renderedPlacement.maxBottom;
  mutatedXml = mutatedXml.replace(/pageWidth="(\d+)"/, (full, wStr) => {
    const curW = parseInt(wStr, 10);
    return !isNaN(curW) && curW < requiredWidth ? `pageWidth="${requiredWidth}"` : full;
  });
  mutatedXml = mutatedXml.replace(/\bdx="(\d+)"/, (full, dxStr) => {
    const curDx = parseInt(dxStr, 10);
    return !isNaN(curDx) && curDx < requiredWidth ? `dx="${requiredWidth}"` : full;
  });
  mutatedXml = mutatedXml.replace(/pageHeight="(\d+)"/, (full, hStr) => {
    const curH = parseInt(hStr, 10);
    return !isNaN(curH) && curH < requiredHeight ? `pageHeight="${requiredHeight}"` : full;
  });
  mutatedXml = mutatedXml.replace(/\bdy="(\d+)"/, (full, dyStr) => {
    const curDy = parseInt(dyStr, 10);
    return !isNaN(curDy) && curDy < requiredHeight ? `dy="${requiredHeight}"` : full;
  });

  // 4. Validate & Heal Draw.io XML
  const healingResult = validateAndHealDrawioXml(mutatedXml, archId);
  const updatedXml = healingResult.xml;

  // 5. Create immutable version snapshot
  const newVersion: GcpVersionSnapshot = {
    id: `v_${Date.now()}`,
    versionTag: nextVersionTag,
    timestamp,
    author: detectedPersona,
    actionSummary: canvasDiff,
    canvasDiff,
    specDiff,
    xml: updatedXml,
  };

  // 6. Create assistant response message
  const assistantMessage: GcpChatMessage = {
    id: `msg_${Date.now() + 1}`,
    sender: 'assistant',
    text: `[${detectedPersona} Persona Refinement]: Successfully synthesized updates for "${cleanPrompt.slice(0, 75)}". Created immutable snapshot ${nextVersionTag}.`,
    timestamp,
    actionSummary: {
      versionTag: nextVersionTag,
      canvasDiff,
      specDiff,
      persona: detectedPersona,
    },
  };

  return { updatedXml, newVersion, assistantMessage };
}


