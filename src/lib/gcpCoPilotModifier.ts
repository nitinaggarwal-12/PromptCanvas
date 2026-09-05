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
  const cleanPrompt = promptText.replace(/^\[.*?\]\s*/, '').trim();
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
    } else if (lower.includes('ciso') || lower.includes('security') || lower.includes('armor') || lower.includes('waf') || lower.includes('cmek') || lower.includes('hsm') || lower.includes('vpc-sc')) {
      detectedPersona = 'CISO / Security Architect';
    } else if (lower.includes('finops') || lower.includes('sre') || lower.includes('cost') || lower.includes('spot') || lower.includes('scale-to-zero')) {
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

  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const textDark = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#64748B';

  // Dynamic 2D Coordinate Layout (Bottom Channel Slot Allocation to avoid colliding with headers at y: 10..120)
  const slotIndex = Math.max(0, currentVersionIndex - 1);
  const colOffset = slotIndex % 3;
  const rowOffset = Math.floor(slotIndex / 3);
  const targetX = 220 + colOffset * 360;
  const targetY = 660 + rowOffset * 85;

  // Cross-Vendor Translation Check
  const vendorMatch = detectVendorTranslation(lower);

  // 2. Intelligent Draw.io XML Mutation according to prompt intent
  if (isNegativeRemoval && (lower.includes('spanner') || lower.includes('armor') || lower.includes('waf') || lower.includes('portal') || lower.includes('tpu'))) {
    // Handled Negative / Removal gracefully without inverted positive upgrades
    const targetComp = lower.includes('spanner')
      ? 'Cloud Spanner'
      : lower.includes('armor') || lower.includes('waf')
      ? 'Cloud Armor WAF'
      : lower.includes('portal')
      ? 'Patient Intake Portal'
      : 'Specialized Hardware';

    canvasDiff = `- Decoupled & isolated ${targetComp}; re-routed traffic to core fallback pipelines.`;
    specDiff = `Reconciled DOC-03 (System Architecture) & DOC-07 (Topology Isolation).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_decouple_${slotIndex}" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#450A0A' : '#FEF2F2'};strokeColor=#EF4444;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_decouple_badge_${slotIndex}" value="✂️ COMPONENT DECOUPLED: ${escapeXmlText(targetComp.toUpperCase())}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#B91C1C;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_decouple_title_${slotIndex}" value="${escapeXmlText(targetComp)} Removed / Decoupled" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_decouple_desc_${slotIndex}" value="Traffic isolated and re-directed to primary gateway fallback path" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_decouple_edge_${slotIndex}" value="Decoupled Route" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EF4444;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#B91C1C;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_decouple_${slotIndex}" target="col_agent_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (isReplacement && lower.includes('spanner') && (lower.includes('postgres') || lower.includes('sql') || lower.includes('cloud sql'))) {
    canvasDiff = `⇄ Replaced Cloud Spanner with Cloud SQL PostgreSQL High-Availability Cluster with cross-zone standby.`;
    specDiff = `Reconciled DOC-03 (System Architecture), DOC-05 (Database DDL), and DOC-08 (HA Standby Protocol).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_cloudsql_${slotIndex}" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#1E293B' : '#F0FDF4'};strokeColor=#10B981;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_cloudsql_badge_${slotIndex}" value="⇄ REPLACED: CLOUD SQL POSTGRESQL HA" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#059669;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_cloudsql_title_${slotIndex}" value="Cloud SQL Enterprise Plus (PostgreSQL 16)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_cloudsql_desc_${slotIndex}" value="Cross-zone HA replication with automated regional SSD storage scaling" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_cloudsql_edge_${slotIndex}" value="Relational Persistence" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#10B981;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#059669;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_cloudsql_${slotIndex}" target="col_lake_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (vendorMatch) {
    canvasDiff = `☁️ Mapped [${vendorMatch.detectedEntity}] $\\to$ [${vendorMatch.gcpEquivalent}] with enterprise zero-trust controls.`;
    specDiff = `Reconciled DOC-04 (Component Catalog), DOC-06 (Vendor Translation Map), and DOC-08 (Cloud Architecture).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_vendor_${slotIndex}" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#1E293B' : '#EFF6FF'};strokeColor=${vendorMatch.categoryColor};strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_vendor_badge_${slotIndex}" value="${escapeXmlText(vendorMatch.badge)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=${vendorMatch.categoryColor};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_vendor_title_${slotIndex}" value="${escapeXmlText(vendorMatch.gcpEquivalent)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_vendor_desc_${slotIndex}" value="${escapeXmlText(vendorMatch.gcpDescription)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_vendor_edge_${slotIndex}" value="Mapped Endpoint" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${vendorMatch.categoryColor};strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=${vendorMatch.categoryColor};labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_vendor_${slotIndex}" target="${vendorMatch.targetTierId}">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (lower.includes('cryo-em') || lower.includes('alphafold')) {
    canvasDiff = `+ Injected Cryo-EM 3D Density Map Reconstruction Engine & AlphaFold 3 Multimer Accelerator on Cloud TPU v5e & NVIDIA A100 Cluster.`;
    specDiff = `Reconciled DOC-03 (System Architecture), DOC-04 (HPC Co-Processor Cluster), and DOC-05 (Cloud TPU Topology).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_cryoem_box" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#1E1B4B' : '#EEF2FF'};strokeColor=#6366F1;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_cryoem_badge" value="🧬 CO-PILOT INJECTED: CRYO-EM &amp; ALPHAFOLD 3 HPC" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#4F46E5;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_cryoem_title" value="Cloud TPU v5e (256 Pods) + 8x A100 GPU" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_cryoem_desc" value="Sub-minute AlphaFold 3 multimer synthesis &amp; 3D Cryo-EM map alignment" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_cryoem_edge" value="HPC Offload" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#4F46E5;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#4F46E5;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_cryoem_box" target="col_agent_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (lower.includes('vector') || lower.includes('chembl') || lower.includes('fingerprint')) {
    canvasDiff = `+ Integrated ScaNN Vector Search Cluster with ChEMBL 33 & BindingDB Molecular Fingerprints (sub-8ms p99 similarity search).`;
    specDiff = `Reconciled DOC-04 (Component Catalog), DOC-05 (Vector Embeddings Schema), and DOC-07 (Latency Budgets).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_vector_box" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#022C22' : '#F0FDF4'};strokeColor=#10B981;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_vector_badge" value="⚡ CO-PILOT INJECTED: SCANN VECTOR SEARCH" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#059669;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_vector_title" value="10M+ Molecular Embeddings Index (ChEMBL 33)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_vector_desc" value="Sub-8ms p99 similarity search across Morgan &amp; Tanimoto fingerprints" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_vector_edge" value="SMILES Lookups" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#10B981;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#059669;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_vector_box" target="col_lake_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (lower.includes('sila') || lower.includes('wet-lab') || lower.includes('robot')) {
    canvasDiff = `⚡ Enforced SiLA 2 (Standard in Lab Automation) Microservice Gateway with bidirectional IoT telemetry streaming.`;
    specDiff = `Reconciled DOC-03 (Wet-Lab Interfaces), DOC-05 (SiLA 2 Robotic Dispatch), and DOC-08 (Telemetry Lineage).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_sila_box" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#431407' : '#FFF7ED'};strokeColor=#F97316;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_sila_badge" value="🤖 CO-PILOT INJECTED: SILA 2 ROBOTICS GATEWAY" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#C2410C;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_sila_title" value="SiLA 2 gRPC Interconnect &amp; Workcell Bus" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_sila_desc" value="Direct mTLS control for Hamilton Starlet &amp; Echo acoustic liquid handlers" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_sila_edge" value="Robotic Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#F97316;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#C2410C;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_sila_box" target="col_gxp_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (lower.includes('21 cfr') || lower.includes('gxp') || lower.includes('audit')) {
    canvasDiff = `🔒 Enforced 21 CFR Part 11 Cryptographic Audit Vault, Cloud HSM keyrings, and SHA-256 electronic batch record ledger.`;
    specDiff = `Reconciled DOC-06 (Regulatory Compliance), DOC-10 (Audit Matrix), and DOC-02 (FDA Electronic Submissions).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_gxp_box" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#450A0A' : '#FEF2F2'};strokeColor=#EF4444;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_gxp_badge" value="⚖️ CO-PILOT INJECTED: 21 CFR PART 11 CRYPTO VAULT" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#B91C1C;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_gxp_title" value="Cloud KMS FIPS 140-2 Level 3 HSM Keyring" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_gxp_desc" value="Immutable e-signatures, WORM storage lock, &amp; IND dossier packaging" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_gxp_edge" value="Compliance Audit" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EF4444;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#B91C1C;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_gxp_box" target="col_gxp_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (lower.includes('patient') || lower.includes('portal') || lower.includes('admission') || lower.includes('product manager')) {
    canvasDiff = `+ Injected Emergency Patient Portal & Telemetry Ingress Gateway (Cloud Run) with 99.999% SLA tracking.`;
    specDiff = `Reconciled DOC-01 (Product Vision), DOC-02 (User Journeys), and DOC-04 (Architecture Overview).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_portal_box" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#1E293B' : '#F0F9FF'};strokeColor=#0284C7;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_portal_badge" value="👔 CO-PILOT INJECTED: PATIENT INGRESS PORTAL" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#0369A1;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_portal_title" value="Emergency Triage &amp; Intake Gateway (Cloud Run)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_portal_desc" value="FHIR R4 compliant ingestion with 99.999% SLA availability guarantee" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_portal_edge" value="Ingress Flow" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#0369A1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_portal_box" target="col_ingress_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (lower.includes('spanner') || lower.includes('multi-region') || lower.includes('dr') || lower.includes('failover') || lower.includes('lead architect')) {
    canvasDiff = `⚡ Upgraded Cloud Spanner to Active-Active Multi-Region (nam3) with europe-west1 DR witness and cross-region interconnect.`;
    specDiff = `Reconciled DOC-03 (System Architecture), DOC-05 (Infrastructure & DDL), and DOC-08 (Disaster Recovery).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_spanner_box" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#312E81' : '#EEF2FF'};strokeColor=#4338CA;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_spanner_badge" value="🏗️ CO-PILOT INJECTED: MULTI-REGION NAM3 DR" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#4338CA;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_spanner_title" value="Cloud Spanner Active-Active nam3 Leader" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_spanner_desc" value="Witness in europe-west1 with RPO &lt; 1s and automated zero-loss failover" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_spanner_edge" value="Dual-Leader Replication" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#4338CA;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#4338CA;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_spanner_box" target="col_lake_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else if (lower.includes('armor') || lower.includes('waf') || lower.includes('security') || lower.includes('ciso') || lower.includes('cmek')) {
    canvasDiff = `🔒 Enforced Cloud Armor Enterprise WAF, Cloud KMS HSM CMEK keys, and VPC Service Controls perimeter shield.`;
    specDiff = `Reconciled DOC-06 (Security & Threat Model) and DOC-10 (Compliance Matrix).`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_security_box" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#4C1D95' : '#FAF5FF'};strokeColor=#7C3AED;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_security_badge" value="🛡️ CO-PILOT INJECTED: ZERO-TRUST PERIMETER" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#6D28D9;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_security_title" value="Cloud Armor Enterprise WAF &amp; VPC-SC Perimeter" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=10;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_security_desc" value="Adaptive DDoS layer 7 filtering, OWASP Top 10 rules &amp; FIPS 140-2 Level 3 CMEK" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_security_edge" value="Zero-Trust Shield" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#6D28D9;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_security_box" target="col_ingress_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  } else {
    // Custom Arbitrary Prompt synthesis with dynamic placement & orthogonal edge connection
    const safeTitle = escapeXmlText(cleanPrompt.slice(0, 42));
    canvasDiff = `+ Applied architectural synthesis: "${cleanPrompt.slice(0, 80)}" incorporating required components and security controls.`;
    specDiff = `Reconciled system specifications, data dictionary, and infrastructure topology for version ${nextVersionTag}.`;
    injectedCellsXml = `
      <mxCell id="copilot_mod_custom_box_${slotIndex}" value="" style="rounded=1;arcSize=6;fillColor=${isDark ? '#1E293B' : '#F8FAFC'};strokeColor=#3B82F6;strokeWidth=1.8;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
        <mxGeometry x="${targetX}" y="${targetY}" width="320" height="74" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_custom_badge_${slotIndex}" value="🤖 CO-PILOT SYNTHESIS: ${nextVersionTag.toUpperCase()}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=8.5;fontStyle=1;fontColor=#2563EB;" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 4}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_custom_title_${slotIndex}" value="${safeTitle}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=9.5;fontStyle=1;fontColor=${textDark};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 20}" width="310" height="16" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_custom_desc_${slotIndex}" value="Synthesized &amp; connected by Google Cloud Architecture Co-Pilot" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Google Sans, sans-serif;fontSize=7.5;fontStyle=0;fontColor=${textMuted};" vertex="1" parent="1">
        <mxGeometry x="${targetX + 5}" y="${targetY + 38}" width="310" height="14" as="geometry" />
      </mxCell>
      <mxCell id="copilot_mod_custom_edge_${slotIndex}" value="Synthesized Link" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;fontSize=8;fontStyle=1;fontColor=#2563EB;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="copilot_mod_custom_box_${slotIndex}" target="col_agent_bg">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `;
  }

  // 3. Inject cells before </root> tag cleanly
  let mutatedXml = currentXml;
  if (mutatedXml.includes('</root>')) {
    mutatedXml = mutatedXml.replace('</root>', `${injectedCellsXml}\n        </root>`);
  }

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
    text: `[${detectedPersona} Persona Refinement]: Successfully synthesized updates for "${cleanPrompt.slice(0, 75)}...". Created immutable snapshot ${nextVersionTag}.`,
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

