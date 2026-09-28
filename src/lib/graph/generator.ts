import { GoogleGenAI, Type } from '@google/genai';
import {
  ArchitectureGraph,
  validateGraphJson,
} from './schema';
import { GENERATE_GRAPH_SYSTEM_PROMPT } from '../../prompts/generateGraph';
import { EDIT_GRAPH_SYSTEM_PROMPT, buildEditGraphPrompt } from '../../prompts/editGraph';
import { GEMINI_MODEL_ID, getEffectiveGeminiApiKey } from '../geminiConfig';
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

export async function generateLogicalGraph(
  userPrompt: string,
  modelId: string = GEMINI_MODEL_ID,
  aiClient?: GoogleGenAI
): Promise<ArchitectureGraph> {
  const apiKey = getEffectiveGeminiApiKey();
  if (!aiClient && !apiKey) {
    return buildFallbackArchitectureGraph(userPrompt);
  }
  const ai = aiClient || new GoogleGenAI({ apiKey: apiKey || undefined });

  let attempts = 0;
  let lastErrorText = '';
  let currentContents = `USER REQUEST:\n${userPrompt}`;

  while (attempts < 2) {
    attempts++;
    try {
      const response = await generateContentWithRetry(ai, {
        model: modelId,
        contents: currentContents,
        config: {
          systemInstruction: GENERATE_GRAPH_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          maxOutputTokens: 8192,
          responseSchema: {
            type: Type.OBJECT,
            required: ['title', 'cloud', 'tiers', 'nodes', 'edges'],
            properties: {
              title: { type: Type.STRING },
              cloud: { type: Type.STRING, enum: ['gcp', 'aws', 'azure', 'hybrid', 'generic'] },
              tiers: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ['id', 'label', 'order'],
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING },
                    order: { type: Type.INTEGER },
                  },
                },
              },
              nodes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ['id', 'label', 'tier', 'type'],
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    tier: { type: Type.STRING },
                    type: { type: Type.STRING, enum: ['compute', 'database', 'storage', 'queue', 'cache', 'network', 'security', 'ai', 'analytics', 'user', 'external', 'gateway', 'service'] },
                    product: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                },
              },
              edges: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ['id', 'source', 'target', 'label'],
                  properties: {
                    id: { type: Type.STRING },
                    source: { type: Type.STRING },
                    target: { type: Type.STRING },
                    label: { type: Type.STRING },
                    style: { type: Type.STRING, enum: ['solid', 'dashed'] },
                    protocol: { type: Type.STRING },
                  },
                },
              },
              narrative: {
                type: Type.OBJECT,
                required: ['reasoning', 'businessUsecase', 'technicalUsecase'],
                properties: {
                  reasoning: { type: Type.STRING },
                  businessUsecase: { type: Type.STRING },
                  technicalUsecase: { type: Type.STRING },
                },
              },
            },
          },
        },
      });

      const responseText = response.text || '';
      let parsed: unknown;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        lastErrorText = `Invalid JSON output: ${(jsonErr as Error).message}`;
        currentContents = `USER REQUEST:\n${userPrompt}\n\nPREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastErrorText}\nPLEASE OUTPUT STRICT VALID JSON ONLY.`;
        continue;
      }

      const val = validateGraphJson(parsed);
      if (val.valid && val.graph) {
        return val.graph;
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
  modelId: string = GEMINI_MODEL_ID,
  aiClient?: GoogleGenAI
): Promise<ArchitectureGraph> {
  const apiKey = getEffectiveGeminiApiKey();
  const ai = aiClient || new GoogleGenAI({ apiKey: apiKey || undefined });
  const currentGraphJson = JSON.stringify(currentGraph, null, 2);

  let attempts = 0;
  let lastErrorText = '';
  let currentContents = buildEditGraphPrompt(currentGraphJson, userChangePrompt);

  while (attempts < 2) {
    attempts++;
    try {
      const response = await generateContentWithRetry(ai, {
        model: modelId,
        contents: currentContents,
        config: {
          systemInstruction: EDIT_GRAPH_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      let parsed: unknown;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        lastErrorText = `Invalid JSON output: ${(jsonErr as Error).message}`;
        currentContents = `${buildEditGraphPrompt(currentGraphJson, userChangePrompt)}\n\nPREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastErrorText}\nPLEASE OUTPUT STRICT VALID JSON ONLY.`;
        continue;
      }

      const val = validateGraphJson(parsed);
      if (val.valid && val.graph) {
        return val.graph;
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
