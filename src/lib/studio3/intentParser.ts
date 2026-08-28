import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID } from '../geminiConfig';

export type AbstractionLevel = 'conceptual' | 'logical' | 'technical';

export type TopologyGrammar =
  | 'horizontal_pipeline'
  | 'hierarchical_tiers'
  | 'composite_multi_band'
  | 'matrix_grid'
  | 'hub_spoke'
  | 'swimlanes';

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
}

function getAiClient(apiKey?: string): GoogleGenAI {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey: key });
}

export function parseStudio3IntentHeuristics(
  prompt: string,
  previousContext?: string
): Studio3Intent {
  const p = prompt.toLowerCase();
  const isFollowUp = Boolean(previousContext && previousContext.trim().length > 0);

  // 1. Abstraction Level detection
  let abstractionLevel: AbstractionLevel = 'logical';
  if (
    p.includes('concept') ||
    p.includes('overview') ||
    p.includes('idea') ||
    p.includes('journey') ||
    p.includes('value stream') ||
    p.includes('why') ||
    p.includes('high level') ||
    p.includes('high-level') ||
    p.includes('business') ||
    p.includes('stakeholder')
  ) {
    abstractionLevel = 'conceptual';
  } else if (
    p.includes('kubernetes') ||
    p.includes('gke') ||
    p.includes('subnet') ||
    p.includes('vpc') ||
    p.includes('terraform') ||
    p.includes('docker') ||
    p.includes('cidr') ||
    p.includes('cmek') ||
    p.includes('spanner') ||
    p.includes('memorystore') ||
    p.includes('port 443') ||
    p.includes('mtls') ||
    p.includes('tcp')
  ) {
    abstractionLevel = 'technical';
  }

  // 2. Multi-Band / Composite expansion detection
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

  if (isComparison && isWorkflow) {
    topologyGrammar = 'composite_multi_band';
    bands = [
      {
        id: 'band_comparison',
        name: 'Comparative Architecture & Capability Matrix',
        type: 'comparative',
        description: 'Side-by-side comparison of tools/approaches and feature matrix.'
      },
      {
        id: 'band_workflow',
        name: 'End-to-End Cohesive Workflow Pipeline',
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
        description: 'Dimensional comparison across standardization, portability, and readability.'
      }
    ];
  } else if (isWorkflow || p.includes('pipeline') || p.includes('data flow')) {
    topologyGrammar = 'horizontal_pipeline';
    bands = [
      {
        id: 'band_pipeline',
        name: 'Operational Flow & Data Pipeline',
        type: 'workflow',
        description: 'Step-by-step pipeline from source ingestion to consumption.'
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

  // Extract clean title
  let suggestedTitle = prompt.length > 50 ? prompt.slice(0, 47) + '...' : prompt;
  if (p.includes('okf')) {
    suggestedTitle = isComparison
      ? 'Google OKF: Modern Knowledge Ecosystem Integration'
      : 'Google Open Knowledge Format (OKF) Architecture';
  }

  return {
    abstractionLevel,
    primaryGoal: `Synthesize a ${abstractionLevel} architecture representing "${prompt.trim()}".`,
    topologyGrammar,
    temporalNature: isWorkflow ? 'sequential_workflow' : 'steady_state_topology',
    scope: p.includes('auth') || p.includes('ingest') ? 'subsystem' : 'full_system',
    suggestedTitle,
    bands,
    inferredEntities: extractKeywords(prompt),
    rationale: `Classified as ${abstractionLevel} due to intent signals. Grammar assigned: ${topologyGrammar}.`,
    actionType
  };
}

function extractKeywords(prompt: string): string[] {
  const stopWords = new Set(['the', 'and', 'with', 'for', 'how', 'what', 'this', 'that', 'show', 'explain', 'diagram', 'help', 'from', 'into']);
  const words = prompt
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w.toLowerCase()));
  return Array.from(new Set(words)).slice(0, 8);
}

export async function parseStudio3IntentWithLLM(params: {
  prompt: string;
  previousContext?: string;
  userApiKey?: string;
}): Promise<Studio3Intent> {
  const { prompt, previousContext, userApiKey } = params;
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return parseStudio3IntentHeuristics(prompt, previousContext);
  }

  try {
    const ai = getAiClient(apiKey);
    const model = process.env.GEMINI_MODEL_ID || GEMINI_MODEL_ID || 'gemini-2.5-flash';

    const systemInstruction = `You are Google DeepMind's Premier Intent & Architecture Grammar Classifier for Studio 3.
Your task is to analyze the user's natural language request and classify its architectural abstraction level and visual grammar BEFORE any diagram is drawn.

Rules:
1. Abstraction Level:
   - "conceptual": High-level idea, business outcome, value stream, user journey, "Why/What" for non-technical stakeholders.
   - "logical": Functional components, microservices, API gateways, database roles, technology-agnostic "What".
   - "technical": Infrastructure, concrete cloud services (GCP/AWS), VPCs, subnets, ports, protocols, "How".
2. Topology Grammar:
   - "horizontal_pipeline": Left-to-right stages with sequential step badges.
   - "hierarchical_tiers": Stacked vertical tiers (Client -> Ingress -> App -> Data).
   - "composite_multi_band": Multi-tier canvas (e.g. Comparative Matrix on Top + Workflow Pipeline on Bottom).
   - "matrix_grid": Multi-column evaluation/comparison table.
   - "hub_spoke": Central orchestrator / service mesh.
   - "swimlanes": Cross-functional swimlanes.
3. Temporal Nature:
   - "steady_state_topology": Component connectivity.
   - "sequential_workflow": Numbered steps (❶..❻) showing data flow over time.
4. Action Type:
   - "initial_synthesis": First diagram creation.
   - "in_place_refinement": Modifying/adding nodes to the current diagram.
   - "band_expansion": The prompt requests comparing, contrasting, or adding a new workflow phase that requires a multi-band layout.`;

    const userContent = `Analyze this architecture prompt:
Current Prompt: "${prompt}"
Previous Context / Turn: "${previousContext || 'None (Initial turn)'}"

Return JSON matching this schema:
{
  "abstractionLevel": "conceptual" | "logical" | "technical",
  "primaryGoal": "Single clear sentence describing what the diagram will visualize",
  "topologyGrammar": "horizontal_pipeline" | "hierarchical_tiers" | "composite_multi_band" | "matrix_grid" | "hub_spoke" | "swimlanes",
  "temporalNature": "steady_state_topology" | "sequential_workflow",
  "scope": "full_system" | "subsystem" | "micro_flow",
  "suggestedTitle": "Title for the diagram",
  "bands": [
    {
      "id": "band_1",
      "name": "Band Name",
      "type": "comparative" | "workflow" | "matrix" | "service_mesh" | "spec_card",
      "description": "What this section of the diagram contains"
    }
  ],
  "inferredEntities": ["Entity1", "Entity2", "Entity3"],
  "rationale": "Why this abstraction and grammar were chosen",
  "actionType": "initial_synthesis" | "in_place_refinement" | "band_expansion"
}`;

    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: userContent }] }
      ],
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    const rawText = response.text || '';
    const parsed = JSON.parse(rawText) as Studio3Intent;
    return parsed;
  } catch (error) {
    console.warn('Studio 3 LLM Intent Parsing error, falling back to heuristics:', error);
    return parseStudio3IntentHeuristics(prompt, previousContext);
  }
}
