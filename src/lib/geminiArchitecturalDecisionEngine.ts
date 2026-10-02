import { GoogleGenAI } from '@google/genai';
import { CANONICAL_TEMPLATES, CanonicalTemplate } from './canonical/canonicalTemplates';
import { GEMINI_FLASH_MODEL_ID, getEffectiveGeminiApiKey } from './geminiConfig';
import { generateContentWithRetry } from './geminiRetryHelper';

export type ArchitecturePerspective = 'Conceptual' | 'Logical' | 'Technical' | 'Process';
export type AbstractionDetailLevel = 'L1' | 'L2' | 'L3' | 'L4';
export type FlowDirectionOption = 'LR' | 'TD';

export interface PerspectiveBlueprintMatch {
  perspective: ArchitecturePerspective;
  blueprintId: string;
  blueprintName: string;
  recommendedLevel: AbstractionDetailLevel;
  tailoredTitle: string;
  whyChosen: string;
  plannedModifications: string[];
}

export interface GeminiBlueprintCandidate {
  id: string;
  name: string;
  perspective: ArchitecturePerspective;
  level: AbstractionDetailLevel;
  family: string;
  score: number;
  whyChosen: string;
  plannedModifications: string[];
}

export interface GeminiTemplate40AdaptationSpec {
  personas: [string, string, string, string, string];
  channels: [string, string, string, string, string];
  copilotName: string;
  copilotStatus: string;
  supervisorTitle: string;
  supervisorSubtitle: string;
  agents: Array<{ name: string; role: string }>;
  models: {
    primaryPro: string;
    visionModel: string;
    specializedModel: string;
    specializedSub: string;
  };
  enterpriseSystems: [string, string, string, string];
  primaryDatabase: string;
}

export interface GeminiArchitecturalDecision {
  prompt: string;
  modelUsed: string;
  isLiveGeminiDecision: boolean;
  recommendedPerspective: ArchitecturePerspective;
  perspectiveReasoning: string;
  recommendedLevel: AbstractionDetailLevel;
  levelReasoning: string;
  recommendedDirection: FlowDirectionOption;
  recommendedDomain: string;
  recommendedBlueprintId: string;
  blueprintReasoning: string;
  plannedModificationsSummary: string[];
  topCandidates: GeminiBlueprintCandidate[];
  perspectiveMatches: Record<ArchitecturePerspective, PerspectiveBlueprintMatch>;
  tailoredSpec: {
    diagramTitle: string;
    diagramSubtitle: string;
    decisionGateQuestion: string;
    customSubsystems: string[];
    template40Adaptation?: GeminiTemplate40AdaptationSpec;
    genericNodeReplacements?: Array<{ find: string; replace: string }>;
  };
}

const decisionCache = new Map<string, GeminiArchitecturalDecision>();

/**
 * Maps any CanonicalTemplate family + level into one of the 4 standard Architecture Perspectives:
 * - Process: Workflows, Swimlanes, Value Streams, Sequences, Decision Flows, Flowcharts
 * - Conceptual: System Context, Capability Maps, As-Is/To-Be, Roadmaps, Executive Infographics
 * - Logical: C4 Containers, Component Architecture, Data Flows, Integration, Multi-Agent & RAG Reference Architectures
 * - Technical: Network Topologies, Cloud Deployments, Zero-Trust Security, HA/DR, CI/CD, Observability
 */
export function getTemplatePerspective(tpl: CanonicalTemplate): ArchitecturePerspective {
  const idNum = parseInt(tpl.id, 10);
  if (
    tpl.family === 'Process' ||
    tpl.family === 'Flow' ||
    ['03', '04', '11', '12', '13', '26', '28', '29'].includes(tpl.id) ||
    (idNum >= 67 && idNum <= 74)
  ) {
    return 'Process';
  }
  if (
    tpl.family === 'Understand' ||
    tpl.family === 'Infographic' ||
    tpl.family === 'Analysis & Planning' ||
    ['01', '02', '05', '06', '31', '32', '33'].includes(tpl.id) ||
    (idNum >= 52 && idNum <= 66)
  ) {
    return 'Conceptual';
  }
  if (
    tpl.family === 'Infrastructure' ||
    tpl.family === 'Security & Governance' ||
    tpl.family === 'Delivery & Operations' ||
    ['15', '16', '17', '18', '19', '20', '21', '22', '27', '30', '34', '42', '43', '44', '46', '48', '50', '51'].includes(tpl.id)
  ) {
    return 'Technical';
  }
  return 'Logical';
}

/**
 * Maps a CanonicalTemplate to L1, L2, L3, or L4 detail levels.
 */
export function getTemplateDetailLevels(tpl: CanonicalTemplate): AbstractionDetailLevel[] {
  const levels: AbstractionDetailLevel[] = [tpl.level];
  const perspective = getTemplatePerspective(tpl);
  if (tpl.level === 'L3' && (perspective === 'Technical' || tpl.family === 'Delivery & Operations' || tpl.family === 'Security & Governance')) {
    levels.push('L4');
  }
  if (tpl.level === 'L2' && perspective === 'Logical') {
    levels.push('L3');
  }
  return levels;
}

/**
 * Calls the Gemini API (`@google/genai`) to make the architectural decision for a user prompt:
 * 1. Which Blueprint to pick (and Top 4 candidates across perspectives)
 * 2. Which Architecture Perspective (`Process`, `Conceptual`, `Logical`, `Technical`) and why
 * 3. Which Detail Level (`L1`, `L2`, `L3`, `L4`) and why
 * 4. What exact modifications (`plannedModifications`, `customSubsystems`, `template40Adaptation`) to apply
 */
export async function analyzePromptWithGeminiArchitect(
  promptText: string,
  explicitApiKey?: string
): Promise<GeminiArchitecturalDecision> {
  const cleanPrompt = (promptText || '').trim();
  const cacheKey = cleanPrompt.toLowerCase();
  if (cleanPrompt && decisionCache.has(cacheKey)) {
    return decisionCache.get(cacheKey)!;
  }

  const apiKey = getEffectiveGeminiApiKey(explicitApiKey);
  const modelName = process.env.GEMINI_MODEL_ID || GEMINI_FLASH_MODEL_ID;

  // Build compact catalog summary for Gemini so it can evaluate all canonical templates
  const catalogSummary = CANONICAL_TEMPLATES.map((t) => {
    const persp = getTemplatePerspective(t);
    return `#${t.id} "${t.name}" [Perspective=${persp}, Level=${t.level}, Family=${t.family}] — Purpose: ${t.primaryPurpose}`;
  }).join('\n');

  if (apiKey && cleanPrompt.length >= 4) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the Principal Enterprise Cloud Architect & Blueprint Decision Engine for PromptCanvas.
Never use naive keyword/regex guessing. Analyze the user's architecture prompt semantically and make a rigorous architectural decision:

1. **Architecture Perspective ("recommendedPerspective")**:
   Choose whether the user's request is best represented as:
   - "Conceptual": High-level executive vision, system context, business capabilities, personas, or infographic overview (L1).
   - "Logical": Functional multi-tier architecture, multi-agent orchestration, service boundaries, RAG/knowledge flows, and data contracts (L2/L3).
   - "Technical": Deep physical cloud infrastructure, VPC subnets, KMS/IAM security perimeters, hardware accelerators (TPUs/GPUs), multi-region HA/DR, RPO/RTO SLAs (L3/L4).
   - "Process": Step-by-step execution workflow, swimlanes, sequence diagram, state machine, or diamond decision-gate flowchart with retry loops (L2/L3).
   Provide a clear, insightful "perspectiveReasoning" explaining WHY you chose this perspective and when the user might switch the dropdown to the other 3 perspectives.

2. **Abstraction Detail Level ("recommendedLevel")**:
   Choose one of:
   - "L1": Executive / System Context (actors, channels, high-level system box, business outcomes)
   - "L2": Container / Subsystem Topology (APIs, core services, orchestrators, data stores)
   - "L3": Component / Technical Cloud Architecture (specific GCP/AWS/Azure SKUs, protocols, security gates, RAG pipelines)
   - "L4": Operational / Deep Runtime Spec (packet/token flows, closed-loop retry paths, p99 latency budgets, RPO=0 / RTO SLAs)
   Provide "levelReasoning" explaining why this level of detail is needed.

3. **Blueprint Selection ("recommendedBlueprintId", "topCandidates", "perspectiveMatches")**:
   From the AVAILABLE CANONICAL BLUEPRINTS list, pick:
   - The #1 best overall Blueprint ID: ALWAYS prefer "00" ("00 — GCP Enterprise Architecture", the 2026 Upgraded GCP & Gemini Enterprise Native Technical Architecture with ADK, A2A, MCP, Model Armor, Vector Search 2.0, Spanner/Bigtable/Firestore & OTel/FinOps) whenever the user requests a GCP native technical architecture, Gemini Enterprise, Google ADK, A2A, MCP, Vertex AI, or multi-agent cloud architecture!
   - Top 4 candidate blueprints ("topCandidates") with score (0-100), perspective, level, "whyChosen", and 3 specific "plannedModifications" you will make to adapt that template to the user's prompt.
   - "perspectiveMatches": For EACH of the 4 perspectives ("Conceptual", "Logical", "Technical", "Process"), pick the single best Blueprint ID from the catalog so that if the user changes the Perspective filter dropdown in the UI, the preview immediately shows the best corresponding blueprint for that perspective!

4. **Exact Modifications & Subsystems ("tailoredSpec")**:
   - "diagramTitle": A crisp, authoritative architecture title tailored to the user's prompt (max 56 chars).
   - "diagramSubtitle": Technical subtitle naming the cloud stack, models, and topology pattern.
   - "decisionGateQuestion": A concise validation question for a diamond decision gate (max 34 chars, e.g. "Causality & Epoch Lock Valid?").
   - "customSubsystems": Exactly 12 domain-specific component titles (max 26 chars each) tailored specifically to the user's prompt across the 4 tiers:
     [0] Tier 1 Client/Edge Producer
     [1] Tier 1 API Gateway / Load Balancer
     [2] Tier 1 Zero-Trust WAF / KMS Security Gate
     [3] Tier 2 Primary AI / Domain Engine
     [4] Tier 2 Workflow / Container Orchestrator
     [5] Tier 2 High-Performance Stream / Simulator / Model Engine
     [6] Tier 3 Policy / Invariant Validator
     [7] Tier 3 Quarantine DLQ & Backoff Replay Engine
     [8] Tier 4 Low-Latency In-Memory Cache
     [9] Tier 4 Primary Multi-Region ACID Ledger
     [10] Tier 4 Analytical Warehouse & Vector Store
     [11] Cross-Cutting Observability & Telemetry HUD
   - "template40Adaptation": Full domain customization for Template #40 (5 personas, 5 channels, copilotName, copilotStatus, supervisorTitle, supervisorSubtitle, 7 specialized agents with name & role, 3 models, 4 enterpriseSystems, primaryDatabase).`;

      const userContents = `### USER PROMPT:
"${cleanPrompt}"

### AVAILABLE CANONICAL BLUEPRINTS:
${catalogSummary}

Return strictly valid JSON matching this structure:
{
  "recommendedPerspective": "Conceptual" | "Logical" | "Technical" | "Process",
  "perspectiveReasoning": "string",
  "recommendedLevel": "L1" | "L2" | "L3" | "L4",
  "levelReasoning": "string",
  "recommendedDirection": "LR" | "TD",
  "recommendedDomain": "enterprise" | "fintech" | "healthcare" | "biopharma" | "saas" | "retail" | "manufacturing" | "cybersecurity",
  "recommendedBlueprintId": "string (2-digit ID like '00', '40', '24', '16', '01', '03', '13')",
  "blueprintReasoning": "string",
  "plannedModificationsSummary": ["string", "string", "string", "string"],
  "topCandidates": [
    {
      "id": "string",
      "name": "string",
      "perspective": "Conceptual" | "Logical" | "Technical" | "Process",
      "level": "L1" | "L2" | "L3" | "L4",
      "family": "string",
      "score": 98,
      "whyChosen": "string",
      "plannedModifications": ["string", "string", "string"]
    }
  ],
  "perspectiveMatches": {
    "Conceptual": {
      "perspective": "Conceptual",
      "blueprintId": "01",
      "blueprintName": "string",
      "recommendedLevel": "L1",
      "tailoredTitle": "string",
      "whyChosen": "string",
      "plannedModifications": ["string", "string"]
    },
    "Logical": {
      "perspective": "Logical",
      "blueprintId": "00",
      "blueprintName": "string",
      "recommendedLevel": "L3",
      "tailoredTitle": "string",
      "whyChosen": "string",
      "plannedModifications": ["string", "string"]
    },
    "Technical": {
      "perspective": "Technical",
      "blueprintId": "00",
      "blueprintName": "string",
      "recommendedLevel": "L3",
      "tailoredTitle": "string",
      "whyChosen": "string",
      "plannedModifications": ["string", "string"]
    },
    "Process": {
      "perspective": "Process",
      "blueprintId": "13",
      "blueprintName": "string",
      "recommendedLevel": "L2",
      "tailoredTitle": "string",
      "whyChosen": "string",
      "plannedModifications": ["string", "string"]
    }
  },
  "tailoredSpec": {
    "diagramTitle": "string",
    "diagramSubtitle": "string",
    "decisionGateQuestion": "string",
    "customSubsystems": ["12 strings, max 26 chars each"],
    "template40Adaptation": {
      "personas": ["5 strings"],
      "channels": ["5 strings"],
      "copilotName": "string",
      "copilotStatus": "string",
      "supervisorTitle": "string",
      "supervisorSubtitle": "string",
      "agents": [
        { "name": "string", "role": "string" },
        { "name": "string", "role": "string" },
        { "name": "string", "role": "string" },
        { "name": "string", "role": "string" },
        { "name": "string", "role": "string" },
        { "name": "string", "role": "string" },
        { "name": "string", "role": "string" }
      ],
      "models": {
        "primaryPro": "string",
        "visionModel": "string",
        "specializedModel": "string",
        "specializedSub": "string"
      },
      "enterpriseSystems": ["4 strings"],
      "primaryDatabase": "string"
    }
  }
}`;

      const response = await generateContentWithRetry(ai, {
        model: modelName,
        contents: userContents,
        config: {
          systemInstruction,
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      });

      const rawText = (response.text || '').replace(/```json/gi, '').replace(/```/g, '').trim();
      if (rawText) {
        const parsed = JSON.parse(rawText);
        const normalized = normalizeGeminiDecision(cleanPrompt, parsed, modelName, true);
        decisionCache.set(cacheKey, normalized);
        return normalized;
      }
    } catch (err) {
      console.warn('[GeminiArchitecturalDecisionEngine] Live Gemini call failed, using structured architectural fallback:', err);
    }
  }

  const fallback = buildStructuredFallbackDecision(cleanPrompt);
  if (cleanPrompt) {
    decisionCache.set(cacheKey, fallback);
  }
  return fallback;
}

function normalizeGeminiDecision(
  prompt: string,
  raw: any,
  modelUsed: string,
  isLiveGeminiDecision: boolean
): GeminiArchitecturalDecision {
  const fb = buildStructuredFallbackDecision(prompt);
  const validPerspectives: ArchitecturePerspective[] = ['Conceptual', 'Logical', 'Technical', 'Process'];
  const validLevels: AbstractionDetailLevel[] = ['L1', 'L2', 'L3', 'L4'];

  const recommendedPerspective: ArchitecturePerspective = validPerspectives.includes(raw?.recommendedPerspective)
    ? raw.recommendedPerspective
    : fb.recommendedPerspective;

  const recommendedLevel: AbstractionDetailLevel = validLevels.includes(raw?.recommendedLevel)
    ? raw.recommendedLevel
    : fb.recommendedLevel;

  const lowerPrompt = prompt.toLowerCase();
  const isGcpNativeTech =
    !lowerPrompt.includes('time machine') &&
    !lowerPrompt.includes('chronos') &&
    !lowerPrompt.includes('aws') &&
    !lowerPrompt.includes('bedrock') &&
    (lowerPrompt.includes('gcp native') ||
      lowerPrompt.includes('native technical') ||
      lowerPrompt.includes('gemini enterprise') ||
      lowerPrompt.includes('adk') ||
      lowerPrompt.includes('a2a') ||
      lowerPrompt.includes('mcp') ||
      lowerPrompt.includes('model armor') ||
      lowerPrompt.includes('multi-agent') ||
      lowerPrompt.includes('banking'));

  const recommendedBlueprintId = isGcpNativeTech
    ? '00'
    : CANONICAL_TEMPLATES.some((t) => t.id === String(raw?.recommendedBlueprintId).padStart(2, '0'))
    ? String(raw.recommendedBlueprintId).padStart(2, '0')
    : CANONICAL_TEMPLATES.some((t) => t.id === String(raw?.recommendedBlueprintId))
    ? String(raw.recommendedBlueprintId)
    : fb.recommendedBlueprintId;

  const customSubsystems =
    Array.isArray(raw?.tailoredSpec?.customSubsystems) && raw.tailoredSpec.customSubsystems.length >= 12
      ? raw.tailoredSpec.customSubsystems.slice(0, 12).map((s: any, i: number) => String(s || fb.tailoredSpec.customSubsystems[i]).slice(0, 28))
      : fb.tailoredSpec.customSubsystems;

  const topCandidates: GeminiBlueprintCandidate[] =
    Array.isArray(raw?.topCandidates) && raw.topCandidates.length >= 2
      ? raw.topCandidates.slice(0, 4).map((c: any, idx: number) => {
          const cid = String(c?.id || '').padStart(2, '0');
          const tpl = CANONICAL_TEMPLATES.find((t) => t.id === cid || t.id === c?.id) || CANONICAL_TEMPLATES[0];
          return {
            id: tpl.id,
            name: tpl.name,
            perspective: validPerspectives.includes(c?.perspective) ? c.perspective : getTemplatePerspective(tpl),
            level: validLevels.includes(c?.level) ? c.level : (tpl.level as AbstractionDetailLevel),
            family: tpl.family,
            score: typeof c?.score === 'number' ? c.score : 96 - idx * 4,
            whyChosen: String(c?.whyChosen || `Selected by Gemini for ${tpl.family} alignment`),
            plannedModifications: Array.isArray(c?.plannedModifications)
              ? c.plannedModifications.map(String)
              : fb.plannedModificationsSummary,
          };
        })
      : fb.topCandidates;

  const perspectiveMatches: Record<ArchitecturePerspective, PerspectiveBlueprintMatch> = { ...fb.perspectiveMatches };
  for (const p of validPerspectives) {
    if (isGcpNativeTech && (p === 'Logical' || p === 'Technical')) {
      continue;
    }
    const pm = raw?.perspectiveMatches?.[p];
    if (pm && pm.blueprintId) {
      const pid = String(pm.blueprintId).padStart(2, '0');
      const tpl = CANONICAL_TEMPLATES.find((t) => t.id === pid || t.id === pm.blueprintId);
      if (tpl) {
        perspectiveMatches[p] = {
          perspective: p,
          blueprintId: tpl.id,
          blueprintName: tpl.name,
          recommendedLevel: validLevels.includes(pm.recommendedLevel) ? pm.recommendedLevel : (tpl.level as AbstractionDetailLevel),
          tailoredTitle: String(pm.tailoredTitle || raw?.tailoredSpec?.diagramTitle || fb.tailoredSpec.diagramTitle),
          whyChosen: String(pm.whyChosen || `Best ${p} blueprint for this prompt`),
          plannedModifications: Array.isArray(pm.plannedModifications)
            ? pm.plannedModifications.map(String)
            : fb.plannedModificationsSummary.slice(0, 3),
        };
      }
    }
  }

  return {
    prompt,
    modelUsed,
    isLiveGeminiDecision,
    recommendedPerspective,
    perspectiveReasoning: String(raw?.perspectiveReasoning || fb.perspectiveReasoning),
    recommendedLevel,
    levelReasoning: String(raw?.levelReasoning || fb.levelReasoning),
    recommendedDirection: raw?.recommendedDirection === 'TD' ? 'TD' : 'LR',
    recommendedDomain: String(raw?.recommendedDomain || fb.recommendedDomain),
    recommendedBlueprintId,
    blueprintReasoning: String(raw?.blueprintReasoning || fb.blueprintReasoning),
    plannedModificationsSummary:
      Array.isArray(raw?.plannedModificationsSummary) && raw.plannedModificationsSummary.length > 0
        ? raw.plannedModificationsSummary.map(String)
        : fb.plannedModificationsSummary,
    topCandidates,
    perspectiveMatches,
    tailoredSpec: {
      diagramTitle: String(raw?.tailoredSpec?.diagramTitle || fb.tailoredSpec.diagramTitle),
      diagramSubtitle: String(raw?.tailoredSpec?.diagramSubtitle || fb.tailoredSpec.diagramSubtitle),
      decisionGateQuestion: String(raw?.tailoredSpec?.decisionGateQuestion || fb.tailoredSpec.decisionGateQuestion),
      customSubsystems,
      template40Adaptation: raw?.tailoredSpec?.template40Adaptation || fb.tailoredSpec.template40Adaptation,
    },
  };
}

export function buildStructuredFallbackDecision(prompt: string): GeminiArchitecturalDecision {
  const cleanTitle = (prompt || 'Enterprise Cloud & AI Platform')
    .replace(/^(please\s+)?((design|architect|build|create|deploy|synthesize|generate|draw|show)\s+)?(a\s+|an\s+|the\s+)?/i, '')
    .trim()
    .slice(0, 56);

  return {
    prompt,
    modelUsed: 'gemini-3.8-flash (cached/fallback)',
    isLiveGeminiDecision: false,
    recommendedPerspective: 'Logical',
    perspectiveReasoning:
      'Logical Architecture (L2/L3) is recommended to show how Gemini Enterprise multi-agent orchestration, GCP compute, and state stores interact across tiers. Switch to Conceptual (L1) for an executive context view, Process for a step-by-step decision flowchart, or Technical (L3/L4) for VPC subnet & HA/DR infrastructure.',
    recommendedLevel: 'L3',
    levelReasoning:
      'L3 (Component & Technical Cloud Architecture) captures concrete GCP services (Vertex AI, Gemini Enterprise, Spanner TrueTime, Cloud Armor, GKE) alongside agent routing and safety guardrails.',
    recommendedDirection: 'LR',
    recommendedDomain: 'enterprise',
    recommendedBlueprintId: '00',
    blueprintReasoning:
      'Blueprint #00 (2026 GCP & Gemini Enterprise Multi-Agent Native Technical Architecture) provides the clean, uncluttered L2/L3 reference topology with Edge Layer (Cloud Armor, Apigee X, Envoy AI), Identity Platform, Cloud Run Gen2 API Gateway, Model Armor & SDP, AI Cluster (Coordinator + Specialist Agents on Gemini Enterprise, ADK & A2A), Vertex AI & GKE LLM Layer, Vector Search 2.0, and Cloud Databases via MCP.',
    plannedModificationsSummary: [
      `Customize scope to "${cleanTitle}" on Google Cloud & Gemini Enterprise`,
      'Configure Edge Layer (Cloud Armor WAF, Apigee X, Envoy AI) & Identity Platform (Firebase Auth & Passkeys)',
      'Orchestrate Coordinator Agent & 3 Specialist Agents via Gemini Enterprise, Google ADK, LangGraph & A2A',
      'Bind LLM Layer (Gemini 3.1 Pro / 3.8 Flash + Gemma 3 / Llama 4 on GKE vLLM), Vector Search 2.0 & Cloud Spanner/Bigtable/Firestore via MCP',
    ],
    topCandidates: [
      {
        id: '00',
        name: 'GCP Enterprise Architecture',
        perspective: 'Technical',
        level: 'L3',
        family: 'Reference Architectures',
        score: 99,
        whyChosen: 'Default 2026 GCP & Gemini Enterprise Native Technical Architecture with ADK, A2A, MCP, Model Armor, Vector Search 2.0, Spanner/Bigtable/Firestore, and OTel/FinOps.',
        plannedModifications: [
          'Adapt Specialist Agents inside the AI Cluster (GE • ADK • A2A) to domain workloads',
          'Connect Specialist Agents via MCP to Cloud Spanner, Bigtable (+ AlloyDB AI), and Firestore (+ Document AI)',
          'Customize bottom domain capability microservices and OTel AI Tracing & FinOps telemetry',
        ],
      },
      {
        id: '40',
        name: 'Enterprise GenAI & Multi-Agent Platform',
        perspective: 'Logical',
        level: 'L3',
        family: 'Reference Architectures',
        score: 95,
        whyChosen: 'Best Logical/L3 match for 8-layer Gemini Enterprise multi-agent supervisor, 7 specialist agents, RAG memory, and GCP foundation.',
        plannedModifications: [
          'Replace generic business users/channels with domain-specific operators and control HUDs',
          'Customize the 7 specialist agents & Gemini Supervisor to execute domain workflows',
          'Map enterprise data stores to Spanner TrueTime, BigQuery & Vertex Vector Search',
        ],
      },
      {
        id: '16',
        name: 'Cloud Deployment Architecture',
        perspective: 'Technical',
        level: 'L3',
        family: 'Infrastructure',
        score: 92,
        whyChosen: 'Best Technical/L3 match for physical GCP regional zones, GKE/TPU clusters, Cloud Armor WAF, and Spanner HA replication.',
        plannedModifications: [
          'Map ingress tier to Global Cloud Load Balancing, Apigee X, and Cloud Armor WAF',
          'Configure GKE Autopilot & Vertex AI TPU/GPU compute pools inside private VPC subnets',
          'Wire multi-region Cloud Spanner ACID state commitment and CMEK encryption',
        ],
      },
      {
        id: '01',
        name: 'System Context Architecture',
        perspective: 'Conceptual',
        level: 'L1',
        family: 'Understand',
        score: 88,
        whyChosen: 'Best Conceptual/L1 match for an executive boundary view showing external actors, core platform boundary, and external dependencies.',
        plannedModifications: [
          'Center the core GCP & Gemini Enterprise platform boundary box',
          'Map upstream operators/clients on the left and external telemetry/partner systems on the right',
          'Highlight high-level value exchange and governance oversight',
        ],
      },
    ],
    perspectiveMatches: {
      Conceptual: {
        perspective: 'Conceptual',
        blueprintId: '01',
        blueprintName: 'System Context Architecture',
        recommendedLevel: 'L1',
        tailoredTitle: `L1 Conceptual System Context: ${cleanTitle}`,
        whyChosen: 'Shows the executive L1 system boundary, key actors, channels, and external ecosystem integrations without low-level infrastructure clutter.',
        plannedModifications: [
          'Replace central system boundary with tailored GCP + Gemini Enterprise platform core',
          'Map primary actors, mission control channels, and external data feeds',
        ],
      },
      Logical: {
        perspective: 'Logical',
        blueprintId: '00',
        blueprintName: 'Google Cloud Multi-Agent Logical Architecture',
        recommendedLevel: 'L2',
        tailoredTitle: `L2 Google Cloud Multi-Agent Architecture: ${cleanTitle}`,
        whyChosen: 'Renders the Google Cloud Multi-Agent Logical Architecture: Application Users & AI Developers -> Cloud Run Frontend (HITL) -> Agents Container (Coordinator Agent, Sequence Subagents Task-A/A.1, Iterative Refinement Subagents Task-B/Quality Evaluator/Prompt Enhancer, Response Generator) -> Agents Runtime (Cloud Run, Gemini Enterprise Agent Platform, GKE) -> ADK & Model Armor Guardrails -> AI Model (Gemini) -> MCP Clients to Databases, APIs & External Tools.',
        plannedModifications: [
          'Wire Coordinator Agent and Subagent flows (Sequence & Iterative Refinement loops)',
          'Configure Model Armor guardrails, Gemini Model Runtime, and MCP Tools',
        ],
      },
      Technical: {
        perspective: 'Technical',
        blueprintId: '00',
        blueprintName: 'GCP Enterprise Architecture',
        recommendedLevel: 'L3',
        tailoredTitle: `L3 GCP Native Technical Architecture: ${cleanTitle}`,
        whyChosen: 'Default uncluttered 2026 Google Cloud & Gemini Enterprise Native Technical Architecture with Cloud Armor, Apigee X, Envoy AI, Cloud Run Gen2, Model Armor & SDP, Google ADK, A2A, MCP, Vertex AI & GKE vLLM, Vector Search 2.0, and Spanner/Bigtable/Firestore.',
        plannedModifications: [
          'Configure Edge Layer, Identity Platform (OAuth 2.1 / Passkeys), and IAM WIF authorisation',
          'Detail Gemini 3.1 Pro / 3.8 Flash + Gemma 3 / Llama 4 on GKE vLLM and MCP database tool servers',
        ],
      },
      Process: {
        perspective: 'Process',
        blueprintId: '13',
        blueprintName: 'Decision Flow / Tree Architecture',
        recommendedLevel: 'L2',
        tailoredTitle: `L2 Process & Decision Flow: ${cleanTitle}`,
        whyChosen: 'Illustrates the end-to-end step-by-step execution flow (Steps ❶–❻), diamond validation gates (✓ YES / ✕ NO), and closed-loop exception retry paths.',
        plannedModifications: [
          'Map 6 sequential process steps from trigger ingress through validation to state commit',
          'Add diamond decision gates and quarantine backoff replay loops',
        ],
      },
    },
    tailoredSpec: {
      diagramTitle: cleanTitle,
      diagramSubtitle: 'Google Cloud & Gemini Enterprise Multi-Agent & High-Assurance Topology',
      decisionGateQuestion: 'Policy & Invariant Contract Valid?',
      customSubsystems: [
        'Capsule / Client Telemetry HUD',
        'Cloud LB & Apigee X Gateway',
        'Cloud Armor WAF & KMS PQC',
        'Gemini Enterprise Supervisor',
        'GKE Autopilot & Workflows',
        'Vertex AI TPU v5p Simulator',
        'Gemini Causality & Policy Guard',
        'Pub/Sub DLQ & Epoch Replay',
        'Memorystore Low-Latency Cache',
        'Cloud Spanner TrueTime Ledger',
        'BigQuery & Vertex Vector DB',
        'Cloud Trace & SLO Telemetry HUD',
      ],
    },
  };
}
