import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID } from '../geminiConfig';
import { Studio3ExecutionLogger } from './telemetryLogger';
import { parseJsonSafely } from './jsonRepair';

export type AbstractionLevel = 'conceptual' | 'logical' | 'technical';

export type TopologyGrammar =
  | 'horizontal_pipeline'
  | 'hierarchical_tiers'
  | 'composite_multi_band'
  | 'matrix_grid'
  | 'hub_spoke'
  | 'swimlanes'
  | 'slide_deck'
  | 'freeform_canvas';

export type TemporalNature = 'steady_state_topology' | 'sequential_workflow';

export interface Studio3IntentBand {
  id: string;
  name: string;
  type: 'comparative' | 'workflow' | 'matrix' | 'service_mesh' | 'spec_card';
  description: string;
}

export interface Studio3Intent {
  abstractionLevel: AbstractionLevel;
  primaryGoal: string;
  topologyGrammar: TopologyGrammar;
  temporalNature: TemporalNature;
  scope: 'full_system' | 'subsystem' | 'micro_flow';
  suggestedTitle: string;
  bands: Studio3IntentBand[];
  inferredEntities: string[];
  rationale: string;
  actionType: 'initial_synthesis' | 'in_place_refinement' | 'band_expansion';
  requestedSlideCount?: number;
}

function getAiClient(apiKey?: string): GoogleGenAI {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey: key });
}

export function parseStudio3IntentHeuristics(
  prompt: string,
  previousContext?: string
): Studio3Intent {
  // Strip zero-width spaces, non-breaking spaces, and normalize Unicode
  const safePrompt = String(prompt || '')
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, ' ')
    .trim();
  const p = safePrompt.toLowerCase();
  const isFollowUp = Boolean(previousContext && String(previousContext).trim().length > 0);

  // 1. Slide Deck / Carousel Detection
  const isSlideDeck =
    p.includes('slide') ||
    p.includes('carousel') ||
    p.includes('carousal') ||
    p.includes('presentation') ||
    p.includes('deck') ||
    p.includes('storyboard') ||
    p.includes('pitch');

  let requestedSlideCount = 6;
  const slideMatch = p.match(/(\d+)\s*(slide|page|card|part)/);
  if (slideMatch) {
    requestedSlideCount = Math.min(Math.max(parseInt(slideMatch[1], 10), 3), 15);
  } else if (p.includes('10')) {
    requestedSlideCount = 10;
  }

  // 2. Abstraction Level detection: Default to technical/logical for engineering/cloud/protocol systems
  let abstractionLevel: AbstractionLevel = 'technical';
  if (
    p.includes('analogy') ||
    p.includes('simple terms') ||
    p.includes('kid') ||
    p.includes('5th grade') ||
    p.includes('high-level concept') ||
    p.includes('for executives') ||
    p.includes('business outcome')
  ) {
    abstractionLevel = 'conceptual';
  } else if (
    p.includes('logical') ||
    p.includes('microservice') ||
    p.includes('service mesh') ||
    p.includes('api gateway') ||
    p.includes('component model') ||
    p.includes('domain model')
  ) {
    abstractionLevel = 'logical';
  } else {
    abstractionLevel = 'technical';
  }

  // 3. Multi-Band / Composite expansion detection
  const isComparison =
    p.includes('compare') ||
    p.includes('contrast') ||
    p.includes('vs') ||
    p.includes('versus') ||
    p.includes('difference') ||
    p.includes('matrix');

  const isWorkflow =
    p.includes('how they work') ||
    p.includes('workflow') ||
    p.includes('pipeline') ||
    p.includes('step') ||
    p.includes('ingest') ||
    p.includes('lifecycle') ||
    p.includes('flow');

  let topologyGrammar: TopologyGrammar = 'hierarchical_tiers';
  let bands: Studio3IntentBand[] = [];

  if (isSlideDeck) {
    topologyGrammar = 'slide_deck';
    bands = [
      {
        id: 'band_slides',
        name: `${requestedSlideCount}-Slide Presentation Deck`,
        type: 'workflow',
        description: `Multi-page sequential slide deck containing ${requestedSlideCount} discrete slides.`
      }
    ];
  } else if (isComparison && isWorkflow) {
    topologyGrammar = 'composite_multi_band';
    bands = [
      {
        id: 'band_comparison',
        name: 'Comparative Architecture & Evaluation Matrix',
        type: 'comparative',
        description: 'Side-by-side comparison of tools/approaches and feature matrix.'
      },
      {
        id: 'band_workflow',
        name: 'End-to-End Operational Workflow Pipeline',
        type: 'workflow',
        description: 'Sequential 4-stage ingestion, conversion, storage, and consumption flow.'
      }
    ];
  } else if (isComparison) {
    topologyGrammar = 'matrix_grid';
    bands = [
      {
        id: 'band_matrix',
        name: 'Comparative Evaluation & Matrix',
        type: 'matrix',
        description: 'Dimensional comparison across key technical and operational vectors.'
      }
    ];
  } else if (isWorkflow || p.includes('pipeline') || p.includes('data flow') || p.includes('stream')) {
    topologyGrammar = 'horizontal_pipeline';
    bands = [
      {
        id: 'band_pipeline',
        name: 'End-to-End Data & Processing Pipeline',
        type: 'workflow',
        description: 'Step-by-step pipeline from ingress to storage and consumption.'
      }
    ];
  } else {
    bands = [
      {
        id: 'band_main',
        name: 'Core System Topology',
        type: 'service_mesh',
        description: 'Primary component relationships and functional boundaries.'
      }
    ];
  }

  // Action type for conversational turns
  let actionType: Studio3Intent['actionType'] = 'initial_synthesis';
  if (isFollowUp) {
    if (topologyGrammar === 'composite_multi_band' || isComparison) {
      actionType = 'band_expansion';
    } else {
      actionType = 'in_place_refinement';
    }
  }

  // Extract clean title dynamically from prompt
  let suggestedTitle = safePrompt.length > 55 ? safePrompt.slice(0, 52) + '...' : (safePrompt || 'SYSTEM ARCHITECTURE');
  if (p.includes('ledger') || p.includes('financial')) {
    suggestedTitle = 'Zero-Trust Multi-Region Financial Ledger Architecture';
  } else if (p.includes('rag') || p.includes('vector')) {
    suggestedTitle = 'Vertex AI Multi-Agent RAG Knowledge Mesh';
  } else if (p.includes('okf')) {
    suggestedTitle = isComparison
      ? 'Google OKF: Modern Knowledge Ecosystem Integration'
      : 'Google Open Knowledge Format (OKF) Architecture';
  } else if (p.includes('transformer')) {
    suggestedTitle = 'Transformer Neural Architecture & Attention Flow';
  }

  return {
    abstractionLevel,
    primaryGoal: `Synthesize a ${abstractionLevel} architecture representing "${safePrompt || 'System'}".`,
    topologyGrammar,
    temporalNature: isWorkflow ? 'sequential_workflow' : 'steady_state_topology',
    scope: p.includes('auth') || p.includes('ingest') ? 'subsystem' : 'full_system',
    suggestedTitle,
    bands,
    inferredEntities: extractKeywords(safePrompt),
    rationale: `Classified as ${abstractionLevel} based on detected keywords and intent vectors. Grammar: ${topologyGrammar}.`,
    actionType,
    requestedSlideCount: isSlideDeck ? requestedSlideCount : undefined
  };
}

function extractKeywords(prompt: string): string[] {
  const stopWords = new Set(['the', 'and', 'with', 'for', 'how', 'what', 'this', 'that', 'show', 'explain', 'diagram', 'help', 'from', 'into', 'architect', 'design', 'build']);
  const clean = (prompt || '')
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ');
  const words = clean
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w.toLowerCase()));
  return Array.from(new Set(words.map(w => w.toLowerCase()))).slice(0, 10);
}

export async function parseStudio3IntentWithLLM(params: {
  prompt: string;
  previousContext?: string;
  userApiKey?: string;
  logger?: Studio3ExecutionLogger;
}): Promise<Studio3Intent> {
  const { prompt, previousContext, userApiKey, logger } = params;
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    logger?.log({
      stage: 'intent_parsing',
      status: 'warning',
      message: 'GEMINI_API_KEY is not set in environment. Using first-principles heuristic classifier.'
    });
    return parseStudio3IntentHeuristics(prompt, previousContext);
  }

  const modelName = process.env.GEMINI_FLASH_MODEL_ID || 'gemini-2.5-flash';
  const startTime = Date.now();

  logger?.log({
    stage: 'intent_parsing',
    status: 'calling',
    model: modelName,
    message: `Calling Gemini API for Intent & Abstraction Classification on: "${(prompt || '').slice(0, 60)}..."`,
    payload: { prompt, model: modelName }
  });

  try {
    const ai = getAiClient(apiKey);

    const systemInstruction = `You are Google DeepMind's Premier Intent & Architecture Grammar Classifier for Studio 3.
Your task is to analyze the user's natural language request and classify its architectural abstraction level and visual grammar BEFORE any diagram is drawn.

MANDATORY RULES:
1. Abstraction Level:
   - For all networking protocols (ping, icmp, tcp, dns, http, tls, socket), cloud architectures, pipelines, and engineering systems, classify as "technical" or "logical" with realistic step flows, network channels, and data packets.
   - "technical": Concrete protocols, cloud services, packet headers, subnets, ports, sequence numbers, "How it works internally".
   - "logical": Functional component boundaries, microservices, database interfaces, message buses.
   - "conceptual": High-level educational analogies, foundational philosophy, user journey, "Why/What" for non-technical stakeholders.
2. Topology Grammar:
   - "horizontal_pipeline": Left-to-right stages with sequential step badges.
   - "hierarchical_tiers": Stacked vertical tiers (Ingress -> Compute -> Data -> Governance).
   - "composite_multi_band": Multi-tier canvas (e.g. Comparative Matrix on Top + Workflow Pipeline on Bottom).
   - "matrix_grid": Multi-column evaluation/comparison table.
   - "hub_spoke": Central orchestrator / service mesh.
3. Temporal Nature:
   - "steady_state_topology": Component connectivity.
   - "sequential_workflow": Numbered steps (❶..❻) showing data flow over time.`;

    const userContent = `Analyze this architecture prompt:
Current Prompt: "${prompt}"
Previous Context: "${previousContext || 'None'}"

Return valid JSON with keys: abstractionLevel, primaryGoal, topologyGrammar, temporalNature, scope, suggestedTitle, bands, inferredEntities, rationale, actionType.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: userContent }] }],
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    const elapsed = Date.now() - startTime;
    const rawText = response.text || '';
    const fallbackIntent = parseStudio3IntentHeuristics(prompt, previousContext);
    const parsed = parseJsonSafely<Studio3Intent>(rawText, fallbackIntent);

    logger?.log({
      stage: 'intent_parsing',
      status: 'success',
      model: modelName,
      latencyMs: elapsed,
      message: `Gemini parsed intent: [${(parsed.abstractionLevel || 'logical').toUpperCase()}] • [${parsed.topologyGrammar || 'hierarchical_tiers'}] in ${elapsed}ms`,
      payload: parsed
    });

    return parsed;
  } catch (error: any) {
    const elapsed = Date.now() - startTime;
    logger?.log({
      stage: 'intent_parsing',
      status: 'error',
      model: modelName,
      latencyMs: elapsed,
      message: `Gemini Intent API call failed: ${error.message}. Falling back to dynamic heuristics.`,
      payload: { error: error.message }
    });
    return parseStudio3IntentHeuristics(prompt, previousContext);
  }
}
