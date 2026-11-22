import { GoogleGenAI, Type } from '@google/genai';
import {
  ArchitectureGraph,
  CLOUD_VALUES,
  NODE_TYPE_VALUES,
  normalizeRawLlmGraphPayload,
  stripLayoutFromGraph,
  validateGraphJson,
} from './schema';
import { GENERATE_GRAPH_SYSTEM_PROMPT } from '../../prompts/generateGraph';
import { EDIT_GRAPH_SYSTEM_PROMPT, buildEditGraphPrompt } from '../../prompts/editGraph';
import {
  GEMINI_FLASH_MODEL_ID,
  GEMINI_MODEL_ID,
  createGeminiClient,
  getGenConfigForModel,
} from '../geminiConfig';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';

function buildFallbackArchitectureGraph(userPrompt: string): ArchitectureGraph {
  const cleanTitle = (userPrompt || 'Enterprise System Architecture').trim().slice(0, 72);
  const lower = userPrompt.toLowerCase();
  const cloud: ArchitectureGraph['cloud'] = lower.includes('aws')
    ? 'aws'
    : lower.includes('azure')
      ? 'azure'
      : lower.includes('hybrid')
        ? 'hybrid'
        : 'gcp';

  return {
    title: cleanTitle,
    cloud,
    tiers: [
      { id: 'tier_ingress', label: 'Client & Edge Ingress', order: 1 },
      { id: 'tier_compute', label: 'Application & Orchestration Tier', order: 2 },
      { id: 'tier_data', label: 'Transactional State & Analytics Tier', order: 3 },
      { id: 'tier_gov', label: 'Security, Audit & Observability', order: 4 },
    ],
    nodes: [
      {
        id: 'n_client',
        label: 'Client & API Consumers',
        subtitle: 'Authenticated Producers',
        tier: 'tier_ingress',
        type: 'user',
        description: `Initiates requests for ${cleanTitle}`,
      },
      {
        id: 'n_gateway',
        label: 'Global API Gateway & WAF',
        subtitle: 'TLS 1.3 + Rate Limiting',
        tier: 'tier_ingress',
        type: 'gateway',
        description: 'Validates tokens, enforces quotas, and routes ingress traffic.',
      },
      {
        id: 'n_service',
        label: `${cleanTitle.slice(0, 34)} Core Engine`,
        subtitle: 'Stateless Compute Workers',
        tier: 'tier_compute',
        type: 'compute',
        description: 'Executes core domain logic, schema validation, and orchestration.',
      },
      {
        id: 'n_queue',
        label: 'Event Bus & Retry Queue',
        subtitle: 'Async Messaging & DLQ',
        tier: 'tier_compute',
        type: 'queue',
        description: 'Decouples asynchronous workflows with dead-letter recovery.',
      },
      {
        id: 'n_db',
        label: 'Primary Transactional Store',
        subtitle: 'ACID State & Ledger',
        tier: 'tier_data',
        type: 'database',
        description: 'Persists strongly consistent domain records and idempotency keys.',
      },
      {
        id: 'n_obs',
        label: 'Security & Telemetry Sink',
        subtitle: 'IAM + OpenTelemetry + Audit',
        tier: 'tier_gov',
        type: 'security',
        description: 'Captures end-to-end distributed traces, metrics, and audit logs.',
      },
    ],
    edges: [
      { id: 'e1', source: 'n_client', target: 'n_gateway', label: 'HTTPS / OIDC', style: 'solid', protocol: 'HTTPS' },
      { id: 'e2', source: 'n_gateway', target: 'n_service', label: 'gRPC / mTLS', style: 'solid', protocol: 'gRPC' },
      { id: 'e3', source: 'n_service', target: 'n_queue', label: 'Publish Event', style: 'dashed', protocol: 'Async' },
      { id: 'e4', source: 'n_service', target: 'n_db', label: 'Read / Write State', style: 'solid', protocol: 'SQL' },
      { id: 'e5', source: 'n_service', target: 'n_obs', label: 'Audit & Traces', style: 'dashed', protocol: 'OTLP' },
    ],
    narrative: {
      reasoning: `Synthesized deterministic 4-tier architecture graph for "${cleanTitle}" with explicit ingress, orchestration, state persistence, and observability tiers.`,
      businessUsecase: `Provides resilient, auditable end-to-end execution for ${cleanTitle}.`,
      technicalUsecase: 'Enforces API gateway authentication, stateless compute scaling, asynchronous event buffering, and ACID persistence.',
    },
  };
}

function healOrphanNodesInGraph(graph: ArchitectureGraph): ArchitectureGraph {
  const connectedIds = new Set<string>();
  for (const e of graph.edges) {
    connectedIds.add(e.source);
    connectedIds.add(e.target);
  }
  const orphans = graph.nodes.filter((n) => !connectedIds.has(n.id));
  if (orphans.length === 0 || graph.nodes.length < 2) return graph;

  const sortedTiers = [...graph.tiers].sort((a, b) => a.order - b.order);
  const tierOrderMap = new Map(sortedTiers.map((t) => [t.id, t.order]));
  const existingEdgeIds = new Set(graph.edges.map((e) => e.id));
  const extraEdges = [...graph.edges];
  let nextIdx = extraEdges.length + 1;

  for (const orphan of orphans) {
    const oOrder = tierOrderMap.get(orphan.tier) ?? 1;
    // Prefer connecting to a connected node in the closest preceding or same tier
    const candidates = graph.nodes.filter((n) => n.id !== orphan.id && connectedIds.has(n.id));
    const anchor =
      candidates.sort((a, b) => {
        const da = Math.abs((tierOrderMap.get(a.tier) ?? 1) - oOrder);
        const db = Math.abs((tierOrderMap.get(b.tier) ?? 1) - oOrder);
        return da - db;
      })[0] || graph.nodes.find((n) => n.id !== orphan.id);

    if (!anchor) continue;
    let eid = `edge_auto_${nextIdx++}`;
    while (existingEdgeIds.has(eid)) eid = `edge_auto_${nextIdx++}`;
    existingEdgeIds.add(eid);

    const anchorOrder = tierOrderMap.get(anchor.tier) ?? 1;
    const isGovernanceOrObs = orphan.type === 'security' || orphan.type === 'analytics';
    const source = anchorOrder <= oOrder ? anchor.id : orphan.id;
    const target = anchorOrder <= oOrder ? orphan.id : anchor.id;
    extraEdges.push({
      id: eid,
      source,
      target,
      label: isGovernanceOrObs ? `${nextIdx - 1}. Security & Telemetry` : `${nextIdx - 1}. Data Flow`,
      style: isGovernanceOrObs ? 'dashed' : 'solid',
      protocol: isGovernanceOrObs ? 'TLS / Audit' : 'HTTPS',
    });
    connectedIds.add(orphan.id);
  }

  return {
    ...graph,
    edges: extraEdges,
  };
}

function buildArchitectureGraphResponseSchema() {
  const T = Type || {
    OBJECT: 'OBJECT',
    STRING: 'STRING',
    ARRAY: 'ARRAY',
    INTEGER: 'INTEGER',
  };
  return {
    type: T.OBJECT,
    required: ['title', 'cloud', 'tiers', 'nodes', 'edges'],
    properties: {
      title: { type: T.STRING },
      cloud: { type: T.STRING, enum: [...CLOUD_VALUES] },
      tiers: {
        type: T.ARRAY,
        items: {
          type: T.OBJECT,
          required: ['id', 'label', 'order'],
          properties: {
            id: { type: T.STRING },
            label: { type: T.STRING },
            order: { type: T.INTEGER },
          },
        },
      },
      nodes: {
        type: T.ARRAY,
        items: {
          type: T.OBJECT,
          required: ['id', 'label', 'tier', 'type'],
          properties: {
            id: { type: T.STRING },
            label: { type: T.STRING },
            subtitle: { type: T.STRING },
            tier: { type: T.STRING },
            type: { type: T.STRING, enum: [...NODE_TYPE_VALUES] },
            product: { type: T.STRING },
            description: { type: T.STRING },
          },
        },
      },
      edges: {
        type: T.ARRAY,
        items: {
          type: T.OBJECT,
          required: ['id', 'source', 'target', 'label'],
          properties: {
            id: { type: T.STRING },
            source: { type: T.STRING },
            target: { type: T.STRING },
            label: { type: T.STRING },
            style: { type: T.STRING, enum: ['solid', 'dashed'] },
            protocol: { type: T.STRING },
          },
        },
      },
      narrative: {
        type: T.OBJECT,
        required: ['reasoning', 'businessUsecase', 'technicalUsecase'],
        properties: {
          reasoning: { type: T.STRING },
          businessUsecase: { type: T.STRING },
          technicalUsecase: { type: T.STRING },
        },
      },
    },
  };
}

export async function generateLogicalGraph(
  userPrompt: string,
  modelId: string = GEMINI_FLASH_MODEL_ID,
  aiClient?: GoogleGenAI
): Promise<ArchitectureGraph> {
  const ai = aiClient || createGeminiClient();
  if (!ai) {
    return buildFallbackArchitectureGraph(userPrompt);
  }

  let attempts = 0;
  let lastErrorText = '';
  let currentContents = `USER REQUEST:\n${userPrompt}`;
  const effectiveModel = modelId || GEMINI_FLASH_MODEL_ID;
  const genCfg = getGenConfigForModel('generate', effectiveModel);

  while (attempts < 2) {
    attempts++;
    try {
      const response = await generateContentWithRetry(
        ai,
        {
          model: effectiveModel,
          contents: currentContents,
          config: {
            systemInstruction: GENERATE_GRAPH_SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            temperature: 0.2,
            maxOutputTokens: 8192,
            thinkingConfig: genCfg.thinkingConfig,
            responseSchema: buildArchitectureGraphResponseSchema(),
          },
        },
        { maxRetries: 2, perAttemptTimeoutMs: 40_000, totalBudgetMs: 75_000, label: 'V2 Graph Generate' }
      );

      const responseText = (response.text || '').replace(/```json\s*|```/gi, '').trim();
      let parsed: unknown;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        lastErrorText = `Invalid JSON output: ${(jsonErr as Error).message}`;
        currentContents = `USER REQUEST:\n${userPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastErrorText}\nPLEASE OUTPUT STRICT VALID JSON ONLY.`;
        continue;
      }

      const normalized = normalizeRawLlmGraphPayload(parsed);
      const val = validateGraphJson(normalized);
      if (val.valid && val.graph) {
        return healOrphanNodesInGraph(val.graph);
      } else {
        lastErrorText = val.errors.join('; ');
        currentContents = `USER REQUEST:\n${userPrompt}\n\nPREVIOUS ATTEMPT FAILED SCHEMA VALIDATION:\n${lastErrorText}\nPLEASE FIX THE ERRORS AND RETURN VALID JSON MATCHING THE SCHEMA.`;
      }
    } catch (apiErr: any) {
      lastErrorText = `API Call Error: ${apiErr?.message || String(apiErr)}`;
      currentContents = `USER REQUEST:\n${userPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH API ERROR:\n${lastErrorText}\nPLEASE RETRY.`;
    }
  }

  console.warn(`[generateLogicalGraph] Falling back to deterministic graph after 2 attempts: ${lastErrorText}`);
  return buildFallbackArchitectureGraph(userPrompt);
}

export async function editLogicalGraph(
  currentGraph: ArchitectureGraph,
  userChangePrompt: string,
  modelId: string = GEMINI_FLASH_MODEL_ID,
  aiClient?: GoogleGenAI
): Promise<ArchitectureGraph> {
  const ai = aiClient || createGeminiClient();
  if (!ai) {
    throw new Error('No Gemini API key or Vertex AI credentials available for graph editing.');
  }
  const compactGraph = stripLayoutFromGraph(currentGraph);
  const currentGraphJson = JSON.stringify(compactGraph, null, 2);
  const effectiveModel = modelId || GEMINI_MODEL_ID;
  const editCfg = getGenConfigForModel('edit', effectiveModel);

  let attempts = 0;
  let lastErrorText = '';
  let currentContents = buildEditGraphPrompt(currentGraphJson, userChangePrompt);

  while (attempts < 2) {
    attempts++;
    try {
      const response = await generateContentWithRetry(
        ai,
        {
          model: effectiveModel,
          contents: currentContents,
          config: {
            systemInstruction: EDIT_GRAPH_SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            temperature: 0.2,
            maxOutputTokens: 16384,
            thinkingConfig: editCfg.thinkingConfig,
            responseSchema: buildArchitectureGraphResponseSchema(),
          },
        },
        { maxRetries: 2, perAttemptTimeoutMs: 65_000, totalBudgetMs: 115_000, label: 'V2 Graph Edit' }
      );

      const responseText = (response.text || '').replace(/```json\s*|```/gi, '').trim();
      let parsed: unknown;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        lastErrorText = `Invalid JSON output: ${(jsonErr as Error).message}`;
        currentContents = `${buildEditGraphPrompt(currentGraphJson, userChangePrompt)}\n\nPREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastErrorText}\nPLEASE OUTPUT STRICT VALID JSON ONLY.`;
        continue;
      }

      const normalized = normalizeRawLlmGraphPayload(parsed);
      const val = validateGraphJson(normalized);
      if (val.valid && val.graph) {
        return healOrphanNodesInGraph(val.graph);
      } else {
        lastErrorText = val.errors.join('; ');
        currentContents = `${buildEditGraphPrompt(currentGraphJson, userChangePrompt)}\n\nPREVIOUS ATTEMPT FAILED SCHEMA VALIDATION:\n${lastErrorText}\nPLEASE FIX THE ERRORS AND RETURN VALID JSON MATCHING THE SCHEMA.`;
      }
    } catch (apiErr: any) {
      lastErrorText = `API Call Error: ${apiErr?.message || String(apiErr)}`;
      currentContents = `${buildEditGraphPrompt(currentGraphJson, userChangePrompt)}\n\nPREVIOUS ATTEMPT FAILED WITH API ERROR:\n${lastErrorText}\nPLEASE RETRY.`;
    }
  }

  throw new Error(`Failed to update architecture graph JSON after 2 attempts: ${lastErrorText}`);
}
