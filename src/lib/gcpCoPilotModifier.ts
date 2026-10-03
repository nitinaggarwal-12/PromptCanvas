/**
 * GCP Architecture Center AI Co-Pilot & Versioning Engine
 * 
 * Enables interactive natural language prompt-driven architecture modifications,
 * multi-stakeholder persona simulation, live Draw.io XML mutation, and
 * immutable snapshot versioning on the Google Cloud Architecture Center.
 */

import { validateAndHealDrawioXml } from './xmlHealer';

export interface GcpVersionSnapshot {
  id: string;
  versionTag: string; // e.g. 'v1.0', 'v1.1'
  timestamp: string;
  author: string; // 'Initial Blueprint' | 'Product Manager' | 'Lead Cloud Architect' | 'CISO' etc.
  actionSummary: string;
  canvasDiff: string;
  specDiff: string;
  xml: string;
}

export interface GcpChatSuggestion {
  label: string;
  actionPrompt: string;
  type?: 'add' | 'modify' | 'security' | 'cost' | 'observability';
}

export interface GcpChatMessage {
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

export interface StakeholderPersonaPrompt {
  id: string;
  label: string;
  emoji: string;
  persona: string;
  prompt: string;
  category: 'persona' | 'domain';
  description: string;
}

export const GCP_STAKEHOLDER_PROMPTS: StakeholderPersonaPrompt[] = [
  {
    id: 'pm_patient_portal',
    label: 'Product Manager',
    emoji: '👔',
    persona: 'Product Manager',
    prompt: 'Add real-time patient engagement portal and emergency admission SLA tracking with 99.999% availability.',
    category: 'persona',
    description: 'Simulate Product Manager requirements update',
  },
  {
    id: 'arch_multiregion_dr',
    label: 'Lead Architect',
    emoji: '🏗️',
    persona: 'Lead Cloud Architect',
    prompt: 'Upgrade Cloud Spanner to multi-region nam3 dual-leader replication across europe-west1 and us-central1 with RPO < 1s.',
    category: 'persona',
    description: 'Simulate Lead Architect Multi-Region DR upgrade',
  },
  {
    id: 'ciso_security_waf',
    label: 'CISO / Security',
    emoji: '🛡️',
    persona: 'CISO / Security Architect',
    prompt: 'Enforce Cloud KMS HSM CMEK keys, Cloud Armor Enterprise WAF, and VPC Service Controls perimeter.',
    category: 'persona',
    description: 'Simulate CISO Security & Zero-Trust hardening',
  },
  {
    id: 'finops_sre_scale',
    label: 'FinOps & SRE',
    emoji: '💰',
    persona: 'FinOps & SRE Lead',
    prompt: 'Implement Cloud Run scale-to-zero during off-peak windows and BigQuery BI Engine 50GB memory reservation.',
    category: 'persona',
    description: 'Simulate FinOps & SRE cost & performance optimization',
  },
];

export const GCP_PHARMA_SPECIALIZED_PROMPTS: StakeholderPersonaPrompt[] = [
  {
    id: 'pharma_cryo_em',
    label: 'Cryo-EM & AlphaFold 3',
    emoji: '🧬',
    persona: 'Target-to-Lead Discovery Lead',
    prompt: 'Add Cryo-EM 3D density reconstruction engine and AlphaFold 3 multimer accelerator cluster on Cloud TPU v5e & NVIDIA A100.',
    category: 'domain',
    description: 'Offload molecular density reconstruction to TPU/GPU HPC cluster',
  },
  {
    id: 'pharma_vector_chembl',
    label: 'ChEMBL Vector Search',
    emoji: '💊',
    persona: 'Chemical Foundation Architect',
    prompt: 'Integrate Vertex Vector Search (ScaNN) for sub-second similarity search over 10M+ ChEMBL 33 and BindingDB molecular fingerprints.',
    category: 'domain',
    description: 'Sub-8ms p99 chemical fingerprint vector search',
  },
  {
    id: 'pharma_sila2_robotics',
    label: 'SiLA 2 Wet-Lab IoT',
    emoji: '🧪',
    persona: 'Wet-Lab Automation Lead',
    prompt: 'Enforce SiLA 2 robotic liquid handler microservice gateway with bidirectional IoT telemetry return loop.',
    category: 'domain',
    description: 'Standard in Lab Automation robotics IoT stream',
  },
  {
    id: 'pharma_gxp_audit_vault',
    label: '21 CFR Part 11 Vault',
    emoji: '🔒',
    persona: 'GxP Regulatory Compliance Lead',
    prompt: 'Enforce 21 CFR Part 11 cryptographic key signing, SHA-256 electronic batch records, and immutable audit ledger.',
    category: 'domain',
    description: 'Cryptographic compliance audit and e-signatures',
  },
];

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
): { targetId: string; isDialectA: boolean } {
  if (xml.includes(`id="${preferredDialectATier}"`)) {
    return { targetId: preferredDialectATier, isDialectA: true };
  }

  for (const cid of candidateNodeIds) {
    if (xml.includes(`id="${cid}"`)) {
      return { targetId: cid, isDialectA: false };
    }
  }

  // Parse all non-copilot component vertices in the diagram
  const vertexRegex = /<mxCell\s+id="([^"]+)"[^>]*vertex="1"[^>]*>[\s\S]*?<mxGeometry\s+([^/>]+)\/?>/g;
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
    // Skip giant background swimlane containers or tiny decorative icons
    if (w > 650 || h > 360 || w < 75 || h < 34) continue;
    candidates.push({ id, x, y, w, h, block: match[0].toLowerCase() });
  }

  // 1. Try semantic keyword match inside vertex value/id
  for (const kw of semanticKeywords) {
    const kwLower = kw.toLowerCase();
    const hit = candidates.find((c) => c.id.toLowerCase().includes(kwLower) || c.block.includes(kwLower));
    if (hit) {
      return { targetId: hit.id, isDialectA: false };
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
    return { targetId: sorted[0].id, isDialectA: false };
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
  currentVersionIndex: number,
  archId: string,
  isDark: boolean,
  explicitPersona?: string
): {
  updatedXml: string;
  newVersion: GcpVersionSnapshot;
  assistantMessage: GcpChatMessage;
} {
  const cleanPrompt = promptText.replace(/^\[.*?\]\s*/, '').replace(/^\+\s*/, '').trim();
  const lower = cleanPrompt.toLowerCase();

  // Negative Intent & Removal Detection (Prevents Prompt Inversion)
  const isNegativeRemoval = /\b(remove|delete|drop|strip|without|no\s+|omit|disable|exclude|take\s+away)\b/i.test(cleanPrompt);
  const isReplacement = /\b(replace|swap|switch\s+from|substitute)\b/i.test(cleanPrompt);

  // 1. Detect Persona
  let detectedPersona = explicitPersona || 'User';
  if (!explicitPersona) {
    if (lower.includes('product manager') || lower.includes('patient') || lower.includes('admission') || lower.includes('portal')) {
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

  const nextVersionTag = `v1.${currentVersionIndex}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let canvasDiff = '';
  let specDiff = '';
  let injectedCellsXml = '';
  let inPlaceUpgradedXml = currentXml;

  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const textDark = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#64748B';

  // Dynamic 2D Coordinate Layout (Bottom Channel Slot Allocation to avoid colliding with headers or bottom-tier cards)
  const slotIndex = Math.max(0, currentVersionIndex - 1);
  const colOffset = slotIndex % 3;
  const rowOffset = Math.floor(slotIndex / 3);
  const targetX = 220 + colOffset * 360;

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
  const targetY = baseY + rowOffset * 92;

  const buildEdgeStyle = (
    strokeColor: string,
    fontColor: string,
    isDialectA: boolean,
    portSpec = 'exitX=0.5;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;'
  ) =>
    isDialectA
      ? `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${strokeColor};strokeWidth=1.8;dashed=1;fontSize=8;fontStyle=1;fontColor=${fontColor};labelBackgroundColor=${cardBg};`
      : `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${portSpec}strokeColor=${strokeColor};strokeWidth=2.2;dashed=1;dashPattern=5 3;endArrow=block;endFill=1;fontSize=9;fontStyle=1;fontColor=${fontColor};labelBackgroundColor=${cardBg};`;

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
    resolved: { targetId: string; isDialectA: boolean };
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
    let boxW = 320;
    const boxH = 74;
    let portSpec = 'exitX=0.5;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;';
    let waypoints: Array<{ x: number; y: number }> = [];
    const isBlueprint00 = inPlaceUpgradedXml.includes('upgraded-gcp-ge-multi-agent-banking-2026');
    const effectiveEdgeLabel = isBlueprint00 ? '' : edgeLabel;

    if (!resolved.isDialectA) {
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
      }

      // Prevent stacking collision if a previous prompt already placed a card at (boxX, boxY)
      while (
        inPlaceUpgradedXml.includes(`x="${boxX}" y="${boxY}"`) ||
        inPlaceUpgradedXml.includes(`x="${boxX + 5}" y="${boxY + 4}"`)
      ) {
        boxY += 90;
        if (waypoints.length > 0) {
          waypoints[0] = { x: waypoints[0].x, y: boxY + 37 };
        }
      }
    }

    const ptsXml =
      waypoints.length > 0
        ? `<Array as="points">${waypoints.map((pt) => `<mxPoint x="${pt.x}" y="${pt.y}"/>`).join('')}</Array>`
        : '';

    const xml = `
      <mxCell id="${boxId}" value="" style="rounded=1;arcSize=6;fillColor=${boxFill};strokeColor=${strokeColor};strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" as="geometry" />
      </mxCell>
      <mxCell id="${badgeId}" value="${badgeText}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=${badgeColor};" vertex="1" parent="1">
        <mxGeometry x="${boxX + 5}" y="${boxY + 4}" width="${boxW - 10}" height="14" as="geometry" />
      </mxCell>
      <mxCell id="${titleId}" value="${titleText}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=${titleFontSize};fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${boxX + 5}" y="${boxY + 20}" width="${boxW - 10}" height="16" as="geometry" />
      </mxCell>
      <mxCell id="${descId}" value="${descText}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${boxX + 5}" y="${boxY + 38}" width="${boxW - 10}" height="14" as="geometry" />
      </mxCell>
      <mxCell id="${edgeId}" value="${effectiveEdgeLabel}" style="${buildEdgeStyle(strokeColor, badgeColor, resolved.isDialectA, portSpec)}" edge="1" parent="1" source="${boxId}" target="${resolved.targetId}">
        <mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>
      </mxCell>
    `;

    return {
      xml,
      maxRight: boxX + boxW + 28,
      maxBottom: boxY + boxH + 24,
    };
  };

  let renderedPlacement = { xml: '', maxRight: 1280, maxBottom: targetY + 95 };

  // Cross-Vendor Translation Check
  const vendorMatch = detectVendorTranslation(lower);

  // 2. Intelligent Draw.io XML Mutation according to prompt intent
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
      boxId: `copilot_mod_decouple_${slotIndex}`,
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
      boxId: `copilot_mod_cloudsql_${slotIndex}`,
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
  } else if (vendorMatch) {
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      vendorMatch.targetTierId,
      ['db_spanner', 'api_cloud_run', 'coordinator_agent', 'vector_memory'],
      ['spanner', 'cloud_run', 'agent', 'storage'],
      targetX
    );
    canvasDiff = `☁️ Mapped [${vendorMatch.detectedEntity}] $\\to$ [${vendorMatch.gcpEquivalent}] with enterprise zero-trust controls.`;
    specDiff = `Reconciled DOC-04 (Component Catalog), DOC-06 (Vendor Translation Map), and DOC-08 (Cloud Architecture).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_vendor_${slotIndex}`,
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
  } else if (lower.includes('cryo-em') || lower.includes('alphafold')) {
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_agent_bg',
      ['open_models', 'gemini_models', 'llm_container', 'coordinator_agent'],
      ['llm', 'gemini', 'model', 'agent'],
      targetX
    );
    canvasDiff = `+ Injected Cryo-EM 3D Density Map Reconstruction Engine & AlphaFold 3 Multimer Accelerator on Cloud TPU v5e & NVIDIA A100 Cluster.`;
    specDiff = `Reconciled DOC-03 (System Architecture), DOC-04 (HPC Co-Processor Cluster), and DOC-05 (Cloud TPU Topology).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: 'copilot_mod_cryoem_box',
      badgeId: 'copilot_mod_cryoem_badge',
      titleId: 'copilot_mod_cryoem_title',
      descId: 'copilot_mod_cryoem_desc',
      edgeId: 'copilot_mod_cryoem_edge',
      boxFill: isDark ? '#1E1B4B' : '#EEF2FF',
      strokeColor: '#6366F1',
      badgeColor: '#4F46E5',
      badgeText: '🧬 CO-PILOT INJECTED: CRYO-EM &amp; ALPHAFOLD 3 HPC',
      titleText: 'Cloud TPU v5e (256 Pods) + 8x A100 GPU',
      descText: 'Sub-minute AlphaFold 3 multimer synthesis &amp; 3D Cryo-EM map alignment',
      edgeLabel: 'HPC Offload',
      resolved,
    });
  } else if (lower.includes('vector') || lower.includes('chembl') || lower.includes('fingerprint')) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'vector_memory', '#059669', '#ECFDF5');
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_lake_bg',
      ['vector_memory', 'db_spanner', 'db_firestore'],
      ['vector', 'search', 'memory', 'database'],
      targetX
    );
    canvasDiff = `+ Integrated ScaNN Vector Search Cluster with ChEMBL 33 & BindingDB Molecular Fingerprints (sub-8ms p99 similarity search).`;
    specDiff = `Reconciled DOC-04 (Component Catalog), DOC-05 (Vector Embeddings Schema), and DOC-07 (Latency Budgets).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: 'copilot_mod_vector_box',
      badgeId: 'copilot_mod_vector_badge',
      titleId: 'copilot_mod_vector_title',
      descId: 'copilot_mod_vector_desc',
      edgeId: 'copilot_mod_vector_edge',
      boxFill: isDark ? '#022C22' : '#F0FDF4',
      strokeColor: '#10B981',
      badgeColor: '#059669',
      badgeText: '⚡ CO-PILOT INJECTED: SCANN VECTOR SEARCH',
      titleText: '10M+ Molecular Embeddings Index (ChEMBL 33)',
      descText: 'Sub-8ms p99 similarity search across Morgan &amp; Tanimoto fingerprints',
      edgeLabel: 'SMILES Lookups',
      resolved,
    });
  } else if (lower.includes('sila') || lower.includes('wet-lab') || lower.includes('robot')) {
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_gxp_bg',
      ['service_agent', 'api_cloud_run', 'coordinator_agent'],
      ['service', 'gateway', 'agent'],
      targetX
    );
    canvasDiff = `⚡ Enforced SiLA 2 (Standard in Lab Automation) Microservice Gateway with bidirectional IoT telemetry streaming.`;
    specDiff = `Reconciled DOC-03 (Wet-Lab Interfaces), DOC-05 (SiLA 2 Robotic Dispatch), and DOC-08 (Telemetry Lineage).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: 'copilot_mod_sila_box',
      badgeId: 'copilot_mod_sila_badge',
      titleId: 'copilot_mod_sila_title',
      descId: 'copilot_mod_sila_desc',
      edgeId: 'copilot_mod_sila_edge',
      boxFill: isDark ? '#431407' : '#FFF7ED',
      strokeColor: '#F97316',
      badgeColor: '#C2410C',
      badgeText: '🤖 CO-PILOT INJECTED: SILA 2 ROBOTICS GATEWAY',
      titleText: 'SiLA 2 gRPC Interconnect &amp; Workcell Bus',
      descText: 'Direct mTLS control for Hamilton Starlet &amp; Echo acoustic liquid handlers',
      edgeLabel: 'Robotic Dispatch',
      resolved,
    });
  } else if (lower.includes('21 cfr') || lower.includes('gxp') || lower.includes('audit')) {
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_gxp_bg',
      ['iam_auth', 'dlp_model_armor', 'obs_container'],
      ['iam', 'armor', 'audit', 'security'],
      targetX
    );
    canvasDiff = `🔒 Enforced 21 CFR Part 11 Cryptographic Audit Vault, Cloud HSM keyrings, and SHA-256 electronic batch record ledger.`;
    specDiff = `Reconciled DOC-06 (Regulatory Compliance), DOC-10 (Audit Matrix), and DOC-02 (FDA Electronic Submissions).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: 'copilot_mod_gxp_box',
      badgeId: 'copilot_mod_gxp_badge',
      titleId: 'copilot_mod_gxp_title',
      descId: 'copilot_mod_gxp_desc',
      edgeId: 'copilot_mod_gxp_edge',
      boxFill: isDark ? '#450A0A' : '#FEF2F2',
      strokeColor: '#EF4444',
      badgeColor: '#B91C1C',
      badgeText: '⚖️ CO-PILOT INJECTED: 21 CFR PART 11 CRYPTO VAULT',
      titleText: 'Cloud KMS FIPS 140-2 Level 3 HSM Keyring',
      descText: 'Immutable e-signatures, WORM storage lock, &amp; IND dossier packaging',
      edgeLabel: 'Compliance Audit',
      resolved,
    });
  } else if (lower.includes('patient') || lower.includes('portal') || lower.includes('admission') || lower.includes('product manager')) {
    inPlaceUpgradedXml = applyInPlaceNodeUpgrade(inPlaceUpgradedXml, 'ui_chat', '#0284C7', '#E0F2FE');
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_ingress_bg',
      ['ui_chat', 'edge_layer', 'api_cloud_run'],
      ['ui', 'chat', 'portal', 'edge', 'ingress'],
      targetX
    );
    canvasDiff = `+ Injected Emergency Patient Portal & Telemetry Ingress Gateway (Cloud Run) with 99.999% SLA tracking.`;
    specDiff = `Reconciled DOC-01 (Product Vision), DOC-02 (User Journeys), and DOC-04 (Architecture Overview).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: 'copilot_mod_portal_box',
      badgeId: 'copilot_mod_portal_badge',
      titleId: 'copilot_mod_portal_title',
      descId: 'copilot_mod_portal_desc',
      edgeId: 'copilot_mod_portal_edge',
      boxFill: isDark ? '#1E293B' : '#F0F9FF',
      strokeColor: '#0284C7',
      badgeColor: '#0369A1',
      badgeText: '👔 CO-PILOT INJECTED: PATIENT INGRESS PORTAL',
      titleText: 'Emergency Triage &amp; Intake Gateway (Cloud Run)',
      descText: 'FHIR R4 compliant ingestion with 99.999% SLA availability guarantee',
      edgeLabel: 'Ingress Flow',
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
      ['db_spanner', 'grp_accounts', 'db_bigtable'],
      ['spanner', 'database', 'persistence', 'ledger'],
      targetX
    );
    canvasDiff = `⚡ Upgraded Cloud Spanner to Active-Active Multi-Region (nam3) with europe-west1 DR witness and cross-region interconnect.`;
    specDiff = `Reconciled DOC-03 (System Architecture), DOC-05 (Infrastructure & DDL), and DOC-08 (Disaster Recovery).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: 'copilot_mod_spanner_box',
      badgeId: 'copilot_mod_spanner_badge',
      titleId: 'copilot_mod_spanner_title',
      descId: 'copilot_mod_spanner_desc',
      edgeId: 'copilot_mod_spanner_edge',
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
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_ingress_bg',
      ['dlp_model_armor', 'edge_layer', 'api_cloud_run'],
      ['model_armor', 'armor', 'guardrail', 'security', 'gateway'],
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
      ['edge_layer', 'identity_auth', 'iam_auth', 'api_cloud_run'],
      ['edge', 'identity', 'iam', 'ingress'],
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
      ['edge_layer', 'dlp_model_armor', 'iam_auth'],
      ['edge', 'armor', 'security', 'waf', 'ingress'],
      targetX
    );
    canvasDiff = `🔒 Enforced Cloud Armor Enterprise WAF, Cloud KMS HSM CMEK keys, and VPC Service Controls perimeter shield.`;
    specDiff = `Reconciled DOC-06 (Security & Threat Model) and DOC-10 (Compliance Matrix).`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: 'copilot_mod_security_box',
      badgeId: 'copilot_mod_security_badge',
      titleId: 'copilot_mod_security_title',
      descId: 'copilot_mod_security_desc',
      edgeId: 'copilot_mod_security_edge',
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
      ['obs_container', 'db_bigtable', 'coordinator_agent'],
      ['obs', 'finops', 'monitoring', 'logging', 'telemetry'],
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
    // Custom Arbitrary Prompt synthesis with dynamic placement & orthogonal edge connection
    const safeTitle = escapeXmlText(formatCleanCardTitle(cleanPrompt, 48));
    const resolved = resolveValidTargetNodeId(
      inPlaceUpgradedXml,
      'col_agent_bg',
      ['coordinator_agent', 'transaction_agent', 'api_cloud_run', 'db_spanner'],
      ['coordinator', 'agent', 'gateway', 'spanner'],
      targetX
    );
    canvasDiff = `+ Applied architectural synthesis: "${cleanPrompt.slice(0, 80)}" incorporating required components and security controls.`;
    specDiff = `Reconciled system specifications, data dictionary, and infrastructure topology for version ${nextVersionTag}.`;
    renderedPlacement = renderSynthesizedCardAndEdge({
      boxId: `copilot_mod_custom_box_${slotIndex}`,
      badgeId: `copilot_mod_custom_badge_${slotIndex}`,
      titleId: `copilot_mod_custom_title_${slotIndex}`,
      descId: `copilot_mod_custom_desc_${slotIndex}`,
      edgeId: `copilot_mod_custom_edge_${slotIndex}`,
      boxFill: isDark ? '#1E293B' : '#F8FAFC',
      strokeColor: '#3B82F6',
      badgeColor: '#2563EB',
      badgeText: `🤖 CO-PILOT SYNTHESIS: ${nextVersionTag.toUpperCase()}`,
      titleText: safeTitle,
      descText: 'Synthesized &amp; connected by Google Cloud Architecture Co-Pilot',
      edgeLabel: 'Synthesized Link',
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


