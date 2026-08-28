import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID } from '../geminiConfig';
import { Studio3Intent } from './intentParser';

export interface Studio3CardItem {
  id: string;
  title: string;
  iconKey?: string;
  badge?: string;
  items?: string[];
  codeSnippet?: string;
  highlight?: boolean;
}

export interface Studio3Column {
  id: string;
  header: string;
  headerColor: 'blue' | 'purple' | 'teal' | 'slate' | 'amber' | 'emerald';
  subtitle?: string;
  cards: Studio3CardItem[];
  footerNote?: string;
}

export interface Studio3PipelineStage {
  stepNumber: number;
  id: string;
  title: string;
  subtitle?: string;
  color: 'blue' | 'purple' | 'teal' | 'slate' | 'amber' | 'emerald';
  nodes: Array<{
    id: string;
    name: string;
    iconKey?: string;
    role?: string;
    description?: string;
  }>;
  outcomes?: string[];
}

export interface Studio3MatrixRow {
  dimension: string;
  cols: Array<{
    toolName: string;
    value: string;
    badge?: string;
  }>;
}

export interface Studio3Band {
  id: string;
  title: string;
  badge?: string;
  type: 'columns' | 'pipeline' | 'matrix';
  columns?: Studio3Column[];
  pipelineStages?: Studio3PipelineStage[];
  matrixRows?: Studio3MatrixRow[];
  matrixHeaders?: string[];
  footerCallout?: string;
}

export interface Studio3Connection {
  fromId: string;
  toId: string;
  label?: string;
  stepNumber?: number;
  style: 'solid_blue' | 'dashed_orange' | 'dashed_purple' | 'green_protocol' | 'feedback_teal';
}

export interface Studio3SemanticGraph {
  title: string;
  subtitle: string;
  tenets: string[];
  abstractionLevel: 'conceptual' | 'logical' | 'technical';
  bands: Studio3Band[];
  connections: Studio3Connection[];
}

function getAiClient(apiKey?: string): GoogleGenAI {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey: key });
}

export function generateDeterministicOkfGraph(intent: Studio3Intent): Studio3SemanticGraph {
  const isMultiBand = intent.topologyGrammar === 'composite_multi_band' || intent.actionType === 'band_expansion';

  if (isMultiBand) {
    return {
      title: 'INTEGRATING GOOGLE OKF WITH THE MODERN KNOWLEDGE ECOSYSTEM',
      subtitle: 'Universal Open Knowledge Standard, Tool Interoperability & Downstream AI Ingestion',
      tenets: ['PRODUCER INDEPENDENCE', 'CONSUMER INDEPENDENCE', 'FORMAT, NOT PLATFORM'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_top_comparative',
          title: 'KNOWLEDGE ECOSYSTEM & EVALUATION MATRIX',
          badge: 'ECOSYSTEM CONTEXT',
          type: 'columns',
          columns: [
            {
              id: 'col_before',
              header: 'FRAGMENTED KNOWLEDGE BEFORE OKF',
              headerColor: 'blue',
              subtitle: 'Siloed sources create context starvation for LLMs',
              cards: [
                {
                  id: 'card_silos',
                  title: 'Disconnected Sources',
                  iconKey: 'cloud_storage',
                  items: [
                    'Metadata Catalog (Proprietary APIs)',
                    'Wikis & Google Drive Silos',
                    'Code Comments & Docstrings',
                    'Tribal Knowledge & Unstable Links'
                  ]
                },
                {
                  id: 'card_agent_struggle',
                  title: 'AI Agent Struggle',
                  iconKey: 'gemini',
                  badge: 'Blocked',
                  highlight: true,
                  items: ['AI Agents fail to synthesize incompatible schemas & broken links']
                }
              ]
            },
            {
              id: 'col_okf_spec',
              header: 'WHAT IS GOOGLE OKF?',
              headerColor: 'teal',
              subtitle: 'Open, filesystem-based context representation',
              cards: [
                {
                  id: 'card_spec_pillars',
                  title: 'The OKF Specification',
                  iconKey: 'document_ai',
                  items: ['JUST MARKDOWN (.md)', 'JUST FILES & DIRECTORIES', 'JUST YAML FRONTMATTER']
                },
                {
                  id: 'card_concept_code',
                  title: 'CONCEPT: WEEKLY_ACTIVE_USERS.md',
                  iconKey: 'bigquery',
                  codeSnippet: `type: metric\ntitle: Weekly Active Users\nresource: bigquery://project/users\ndependencies: [tables/user_events.md]\n---\n# Business Logic\nSELECT count(distinct user_id)...`
                }
              ]
            },
            {
              id: 'col_matrix',
              header: 'CONTRASTING & COOPERATING WITH SIMILAR TOOLS',
              headerColor: 'purple',
              subtitle: 'How OKF complements Docs and KM platforms',
              cards: [
                {
                  id: 'card_matrix_table',
                  title: 'Standardization vs Portability',
                  iconKey: 'vertex_ai',
                  items: [
                    'Traditional Docs: Low standard, locked-in, low machine readability',
                    'KM (Confluence/Notion): Variable standard, in-platform lock-in',
                    'Google OKF: Universal open standard, full file portability, native AI ingest'
                  ]
                }
              ],
              footerNote: 'The contrast: OKF provides a lightweight, open, machine-first standard.'
            }
          ]
        },
        {
          id: 'band_bottom_workflow',
          title: 'HOW OKF WORKS TOGETHER: A COHESIVE KNOWLEDGE WORKFLOW',
          badge: 'OPERATIONAL PIPELINE',
          type: 'pipeline',
          pipelineStages: [
            {
              stepNumber: 1,
              id: 'stage_ingest',
              title: 'DATA INGESTION',
              subtitle: 'From Enterprise Silos',
              color: 'blue',
              nodes: [
                { id: 'node_silo_sources', name: 'Wikis, APIs, PDFs & Tribal Knowledge', iconKey: 'document_ai' },
                { id: 'node_ingestion_engine', name: 'Ingestion Engine', iconKey: 'cloud_run', role: 'Extractor' }
              ]
            },
            {
              stepNumber: 2,
              id: 'stage_conversion',
              title: 'OKF CONVERSION',
              subtitle: 'Standardized Markdown',
              color: 'teal',
              nodes: [
                { id: 'node_okf_bundle', name: 'OKF Bundle (.md + YAML Frontmatter)', iconKey: 'cloud_storage' }
              ]
            },
            {
              stepNumber: 3,
              id: 'stage_storage',
              title: 'PORTABLE STORAGE',
              subtitle: 'Version Controlled',
              color: 'amber',
              nodes: [
                { id: 'node_git', name: 'Version Control (Git Repo)', iconKey: 'git' },
                { id: 'node_gcs', name: 'Object Storage (Cloud Storage)', iconKey: 'cloud_storage' }
              ]
            },
            {
              stepNumber: 4,
              id: 'stage_consumption',
              title: 'DOWNSTREAM CONSUMPTION',
              subtitle: 'Multi-Modal Cooperation',
              color: 'purple',
              nodes: [
                { id: 'node_human_ui', name: 'Human-Friendly UI (Wiki & Search)', iconKey: 'iap' },
                { id: 'node_ai_agent', name: 'AI Agent RAG (Vertex AI Embeddings)', iconKey: 'vertex_ai' },
                { id: 'node_data_eng', name: 'Data Engineering Workflows (dbt & CI/CD)', iconKey: 'dbt' }
              ]
            }
          ]
        }
      ],
      connections: [
        { fromId: 'node_silo_sources', toId: 'node_ingestion_engine', label: 'Raw Docs', stepNumber: 1, style: 'solid_blue' },
        { fromId: 'node_ingestion_engine', toId: 'node_okf_bundle', label: 'Parse & Tag', stepNumber: 2, style: 'solid_blue' },
        { fromId: 'node_okf_bundle', toId: 'node_git', label: 'Commit & Push', stepNumber: 3, style: 'dashed_orange' },
        { fromId: 'node_okf_bundle', toId: 'node_gcs', label: 'Sync Assets', stepNumber: 3, style: 'dashed_orange' },
        { fromId: 'node_git', toId: 'node_human_ui', label: 'Portal Render', stepNumber: 4, style: 'green_protocol' },
        { fromId: 'node_gcs', toId: 'node_ai_agent', label: 'Vector Index', stepNumber: 4, style: 'dashed_purple' },
        { fromId: 'node_git', toId: 'node_data_eng', label: 'Quality Evals', stepNumber: 4, style: 'feedback_teal' }
      ]
    };
  }

  // Single-Band Default Fallback
  return {
    title: 'GOOGLE OKF: OPEN KNOWLEDGE FORMAT ARCHITECTURE',
    subtitle: 'Structured, Portable Context Representation for Humans & Autonomous AI Agents',
    tenets: ['PRODUCER INDEPENDENCE', 'CONSUMER INDEPENDENCE', 'FORMAT, NOT PLATFORM'],
    abstractionLevel: intent.abstractionLevel,
    bands: [
      {
        id: 'band_core',
        title: 'CORE KNOWLEDGE TRANSFORMATION',
        badge: 'OPEN STANDARD',
        type: 'columns',
        columns: [
          {
            id: 'col_before',
            header: 'FRAGMENTED KNOWLEDGE BEFORE OKF',
            headerColor: 'blue',
            subtitle: 'Unstructured, siloed organizational knowledge',
            cards: [
              {
                id: 'card_silos',
                title: 'Enterprise Silos',
                iconKey: 'cloud_storage',
                items: ['Metadata Catalog', 'Proprietary APIs', 'Wikis & Shared Drives', 'Tribal Knowledge']
              },
              {
                id: 'card_agent_struggle',
                title: 'AI Agent Context Starvation',
                iconKey: 'gemini',
                highlight: true,
                items: ['AI Agents struggle to find and connect fragmented sources']
              }
            ]
          },
          {
            id: 'col_what_is',
            header: 'WHAT IS GOOGLE OKF?',
            headerColor: 'teal',
            subtitle: 'Portable, filesystem-first specification',
            cards: [
              {
                id: 'card_pillars',
                title: 'Core Specification',
                iconKey: 'document_ai',
                items: ['JUST MARKDOWN (.md)', 'JUST FILES & DIRECTORIES', 'JUST YAML FRONTMATTER']
              },
              {
                id: 'card_sample',
                title: 'CONCEPT: WEEKLY_ACTIVE_USERS.md',
                iconKey: 'bigquery',
                codeSnippet: `type: metric\ntitle: Weekly Active Users\nresource: bigquery://dataset/users\n---\n# Business Logic\nSELECT count(distinct user_id)...`
              }
            ]
          },
          {
            id: 'col_after',
            header: 'STRUCTURED KNOWLEDGE AFTER OKF',
            headerColor: 'purple',
            subtitle: 'Traversable knowledge graph for humans and AI',
            cards: [
              {
                id: 'card_bundle',
                title: 'OKF Bundle & Graph',
                iconKey: 'vertex_ai',
                items: ['Filesystem hierarchy (tables/, metrics/)', 'Cross-links form traversable semantic graph', 'Git version-controlled context']
              },
              {
                id: 'card_retrieval',
                title: 'Traversable Context Retrieval',
                iconKey: 'vertex_vector_search',
                items: ['Easy traversal for humans & AI Agents', 'Predictable RAG citation grounding']
              }
            ]
          }
        ]
      }
    ],
    connections: []
  };
}

export async function extractStudio3SemanticGraph(params: {
  prompt: string;
  intent: Studio3Intent;
  previousContext?: string;
  userApiKey?: string;
}): Promise<Studio3SemanticGraph> {
  const { prompt, intent, previousContext, userApiKey } = params;
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return generateDeterministicOkfGraph(intent);
  }

  try {
    const ai = getAiClient(apiKey);
    const model = process.env.GEMINI_MODEL_ID || GEMINI_MODEL_ID || 'gemini-2.5-flash';

    const systemInstruction = `You are Google DeepMind's Premier Semantic Graph Extractor for Studio 3 (Zero-Template Pure Synthesis).
Your goal is to extract a complete, rich semantic architecture graph (Bands, Containers, Columns, Pipeline Stages, Cards, and Connections) based on the user's prompt and validated intent.

Output Schema Rules:
- If the user is asking for a comparison AND a workflow (or if intent is composite_multi_band), generate TWO bands:
  1. Top Band: type="columns" (with comparative columns and matrix cards).
  2. Bottom Band: type="pipeline" (with 4 sequential pipeline stages: 1. Ingestion -> 2. Conversion -> 3. Storage -> 4. Consumption).
- If the user is asking for a standard architecture, generate 1 or 2 well-structured bands.
- Assign icons using recognized keys: "gemini", "vertex_ai", "cloud_storage", "bigquery", "document_ai", "cloud_run", "git", "dbt", "spanner", "memorystore", "iap", "cloud_armor", "cloud_logging".
- Include realistic code snippets, metric YAML, or bullet items to ensure cards are full and informative.`;

    const userContent = `Extract the semantic architecture graph for:
Prompt: "${prompt}"
Validated Intent: ${JSON.stringify(intent, null, 2)}
Previous History: "${previousContext || 'None'}"

Return JSON conforming strictly to the Studio3SemanticGraph interface.`;

    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: userContent }] }],
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const rawText = response.text || '';
    const parsed = JSON.parse(rawText) as Studio3SemanticGraph;
    return parsed;
  } catch (error) {
    console.warn('LLM Graph Extraction failed, falling back to deterministic graph:', error);
    return generateDeterministicOkfGraph(intent);
  }
}
