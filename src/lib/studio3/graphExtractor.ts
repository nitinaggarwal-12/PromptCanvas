import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID } from '../geminiConfig';
import { Studio3Intent } from './intentParser';
import { Studio3ExecutionLogger } from './telemetryLogger';
import { enrichAndSanitizeSemanticGraph } from './graphEnricher';
import { parseJsonSafely } from './jsonRepair';

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

export interface Studio3FreeformElement {
  id: string;
  name: string;
  shape: 'circle' | 'rectangle' | 'cylinder' | 'rhombus' | 'matrix' | 'formula' | 'callout';
  x: number;
  y: number;
  w: number;
  h: number;
  color?: 'blue' | 'purple' | 'teal' | 'slate' | 'amber' | 'emerald' | 'cyan' | 'red';
  iconKey?: string;
  formula?: string;
  matrixData?: string[][];
  matrixHeaders?: string[];
  details?: string[];
  subLabel?: string;
  badge?: string;
  codeSnippet?: string;
}

export interface Studio3SemanticGraph {
  title: string;
  subtitle: string;
  tenets: string[];
  abstractionLevel: 'conceptual' | 'logical' | 'technical';
  layoutType?: 'freeform' | 'bands' | 'matrix';
  freeformElements?: Studio3FreeformElement[];
  bands: Studio3Band[];
  connections: Studio3Connection[];
}

function getAiClient(apiKey?: string): GoogleGenAI {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey: key });
}

/**
 * ⚡ Truly Dynamic First-Principles Graph Generator (Fallback Engine)
 */
export function generateDynamicFirstPrinciplesGraph(
  prompt: string,
  intent: Studio3Intent
): Studio3SemanticGraph {
  const p = (prompt || '').toLowerCase();
  const isMultiBand = intent.topologyGrammar === 'composite_multi_band' || intent.actionType === 'band_expansion';

  // 0. GRAPH THEORY & DISCRETE MATHEMATICS (AUTHENTIC FREEFORM GRAPH DRAWING)
  if (p.includes('graph theory') || (p.includes('graph') && !p.includes('knowledge graph') && !p.includes('spanner')) || p.includes('discrete math') || p.includes('dijkstra') || p.includes('bfs') || p.includes('dfs') || p.includes('tree') || p.includes('node') && p.includes('edge')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'FOUNDATIONS OF GRAPH THEORY: NODES, EDGES & TOPOLOGY',
      subtitle: 'Discrete Mathematics & Graph Analytics: G = (V, E), Adjacency Representation, and Pathfinding',
      tenets: ['G = (V, E) TOPOLOGY', 'HANDSHAKING LEMMA Σ deg(v) = 2|E|', 'PATHFINDING & COMPLEXITY'],
      abstractionLevel: 'conceptual',
      layoutType: 'freeform',
      freeformElements: [
        // Vertices & Directed Graph Subnetwork
        {
          id: 'v1',
          name: 'Vertex V₁',
          shape: 'circle',
          x: 80,
          y: 180,
          w: 110,
          h: 110,
          color: 'blue',
          subLabel: 'Source • deg⁺=2, deg⁻=0'
        },
        {
          id: 'v2',
          name: 'Vertex V₂',
          shape: 'circle',
          x: 280,
          y: 110,
          w: 110,
          h: 110,
          color: 'teal',
          subLabel: 'Intermediate • deg⁺=1, deg⁻=1'
        },
        {
          id: 'v3',
          name: 'Vertex V₃',
          shape: 'circle',
          x: 480,
          y: 180,
          w: 110,
          h: 110,
          color: 'purple',
          subLabel: 'Sink • deg⁺=0, deg⁻=2'
        },
        {
          id: 'v4',
          name: 'Vertex V₄',
          shape: 'circle',
          x: 280,
          y: 310,
          w: 110,
          h: 110,
          color: 'amber',
          subLabel: 'Hub • deg⁺=1, deg⁻=1'
        },
        {
          id: 'v5',
          name: 'Vertex V₅',
          shape: 'circle',
          x: 380,
          y: 470,
          w: 110,
          h: 110,
          color: 'emerald',
          subLabel: 'Leaf • deg⁺=1, deg⁻=1'
        },
        // Adjacency Matrix
        {
          id: 'adj_matrix',
          name: 'ADJACENCY MATRIX A = [a_ij]',
          shape: 'matrix',
          x: 640,
          y: 110,
          w: 390,
          h: 240,
          matrixHeaders: ['V₁', 'V₂', 'V₃', 'V₄', 'V₅'],
          matrixData: [
            ['0', '4', '0', '2', '0'],
            ['0', '0', '7', '0', '0'],
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '3'],
            ['0', '0', '1', '0', '0']
          ],
          details: [
            'Weighted Directed Graph representation where a_ij represents edge weight from V_i to V_j',
            'Space Complexity: O(|V|²), ideal for dense graphs'
          ]
        },
        // Mathematical Theorems & Properties
        {
          id: 'math_theorems',
          name: 'MATHEMATICAL FOUNDATIONS & THEOREMS',
          shape: 'formula',
          x: 640,
          y: 380,
          w: 390,
          h: 220,
          formula: 'G = (V, E)  where  |V| = 5, |E| = 5\n\nHandshaking Theorem: ∑_{v ∈ V} deg(v) = 2|E| = 10\nEuler Characteristic (Planar): V - E + F = 2',
          details: [
            'Connectedness: Strong (Directed) vs Weak',
            'Degree Sum: Sum of in-degrees = Sum of out-degrees'
          ]
        },
        // Traversal Algorithms: BFS vs DFS
        {
          id: 'traversal_engine',
          name: 'GRAPH TRAVERSAL ALGORITHMS',
          shape: 'rectangle',
          x: 1070,
          y: 110,
          w: 420,
          h: 240,
          color: 'teal',
          badge: 'O(V + E)',
          details: [
            'BFS (Breadth-First Search): Explores neighbors level by level via FIFO Queue; guarantees shortest unweighted path',
            'DFS (Depth-First Search): Explores branch depth via LIFO Stack / Recursion; detects cycles & topological ordering',
            'Time: O(|V| + |E|)  •  Space: O(|V|) memory footprint'
          ]
        },
        // Shortest Path & Centrality Algorithms
        {
          id: 'path_algorithms',
          name: 'SHORTEST PATH & CENTRALITY METRICS',
          shape: 'rectangle',
          x: 1070,
          y: 380,
          w: 420,
          h: 240,
          color: 'purple',
          badge: 'Network Science',
          details: [
            "Dijkstra's Algorithm: Greedy priority queue finding shortest path in non-negative graphs: O((V+E) log V)",
            'Bellman-Ford: Dynamic programming solving negative weights and detecting negative cycles: O(V · E)',
            'Centrality: Degree, Betweenness, Closeness, and Google PageRank eigenvector centrality'
          ]
        }
      ],
      bands: [],
      connections: [
        { fromId: 'v1', toId: 'v2', label: 'w = 4', style: 'solid_blue' },
        { fromId: 'v2', toId: 'v3', label: 'w = 7', style: 'solid_blue' },
        { fromId: 'v1', toId: 'v4', label: 'w = 2', style: 'dashed_orange' },
        { fromId: 'v4', toId: 'v5', label: 'w = 3', style: 'dashed_orange' },
        { fromId: 'v5', toId: 'v3', label: 'w = 1', style: 'green_protocol' },
        { fromId: 'v3', toId: 'adj_matrix', label: 'Matrix Mapping', style: 'dashed_purple' },
        { fromId: 'adj_matrix', toId: 'traversal_engine', label: 'Input to BFS/DFS', style: 'solid_blue' },
        { fromId: 'traversal_engine', toId: 'path_algorithms', label: 'Dijkstra Relaxation', style: 'feedback_teal' }
      ]
    };
    return rawGraph;
  }

  // 1. FINANCIAL / LEDGER DOMAIN
  if (p.includes('ledger') || p.includes('financial') || p.includes('spanner') || p.includes('payment') || p.includes('transaction')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'ZERO-TRUST MULTI-REGION FINANCIAL LEDGER ARCHITECTURE',
      subtitle: 'Active-Active ACID Ledger with Cloud Spanner TrueTime, Cloud Armor WAF & Cloud KMS CMEK',
      tenets: ['ZERO TRUST SECURITY', 'TRUETIME ACTIVE-ACTIVE', 'CUSTOMER MANAGED ENCRYPTION'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_ledger_core',
          title: 'CORE FINANCIAL LEDGER & ZERO-TRUST BOUNDARIES',
          badge: 'TIER-1 TRANSACTION ENGINE',
          type: 'columns',
          columns: [
            {
              id: 'col_ingress',
              header: 'EDGE SECURITY & ZERO TRUST INGRESS',
              headerColor: 'blue',
              subtitle: 'Multi-region DDoS protection and identity verification',
              cards: [
                {
                  id: 'card_armor',
                  title: 'Google Cloud Armor WAF',
                  iconKey: 'cloud_armor',
                  badge: 'Protected',
                  items: [
                    'L3/L4/L7 DDoS mitigation & rate-limiting',
                    'OWASP Top 10 automated threat filtering',
                    'Custom WAF rules for banking APIs'
                  ]
                },
                {
                  id: 'card_iap',
                  title: 'Identity-Aware Proxy (IAP)',
                  iconKey: 'iap',
                  items: [
                    'Context-aware device & user verification',
                    'Zero-trust mTLS encrypted transport'
                  ]
                }
              ]
            },
            {
              id: 'col_compute',
              header: 'APPLICATION & TRANSACTION PROCESSING',
              headerColor: 'teal',
              subtitle: 'Stateless auto-scaling ledger microservices',
              cards: [
                {
                  id: 'card_gke',
                  title: 'GKE Autopilot Microservices',
                  iconKey: 'gke_autopilot',
                  items: [
                    'Ledger Settlement Service (gRPC)',
                    'Double-entry transaction validator',
                    'High-availability multi-zone deployment'
                  ]
                },
                {
                  id: 'card_pubsub',
                  title: 'Cloud Pub/Sub Event Stream',
                  iconKey: 'cloud_run',
                  items: [
                    'Guaranteed at-least-once message delivery',
                    'Dead-letter queue (DLQ) for failed batches'
                  ]
                }
              ]
            },
            {
              id: 'col_data',
              header: 'PERSISTENCE & ENCRYPTION AT REST',
              headerColor: 'purple',
              subtitle: 'Global ACID consistency and hardware encryption',
              cards: [
                {
                  id: 'card_spanner',
                  title: 'Cloud Spanner Multi-Region',
                  iconKey: 'spanner',
                  badge: '99.999% SLA',
                  highlight: true,
                  codeSnippet: `CREATE TABLE FinancialLedger (\n  AccountID STRING(36),\n  Balance NUMERIC,\n  Timestamp TIMESTAMP OPTIONS (allow_commit_timestamp=true)\n) PRIMARY KEY (AccountID);`
                },
                {
                  id: 'card_kms',
                  title: 'Cloud KMS CMEK Encryption',
                  iconKey: 'cloud_armor',
                  items: [
                    'Hardware Security Module (HSM Level 3)',
                    'Automatic 90-day cryptographic key rotation'
                  ]
                }
              ]
            }
          ]
        }
      ],
      connections: []
    };
    return enrichAndSanitizeSemanticGraph(rawGraph, intent);
  }

  // 2. VERTEX AI / RAG / AGENTIC DOMAIN
  if (p.includes('rag') || p.includes('agent') || p.includes('gemini') || p.includes('vector') || p.includes('embedding')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'VERTEX AI ENTERPRISE AGENTIC RAG KNOWLEDGE MESH',
      subtitle: 'Multi-Agent Autonomous Orchestration, ScaNN Vector Search & BigQuery Grounding',
      tenets: ['GROUNDED CITATIONS', 'ENTERPRISE ZERO-EGRESS', 'VECTOR GRAPH RETRIEVAL'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_rag_core',
          title: 'AGENTIC ORCHESTRATION & VECTOR SEARCH',
          badge: 'GENAI PLATFORM',
          type: 'columns',
          columns: [
            {
              id: 'col_rag_ingress',
              header: 'CLIENT & ORCHESTRATION LAYER',
              headerColor: 'blue',
              subtitle: 'Multimodal input processing and agent coordination',
              cards: [
                {
                  id: 'card_gemini',
                  title: 'Gemini 3.1 Pro Core Agent',
                  iconKey: 'gemini',
                  items: ['Multi-turn intent decomposition', 'Tool invocation and function calling', 'Safety & guardrail policy validation']
                }
              ]
            },
            {
              id: 'col_rag_retrieval',
              header: 'VECTOR SEARCH & EMBEDDINGS',
              headerColor: 'teal',
              subtitle: 'Sub-10ms semantic similarity retrieval',
              cards: [
                {
                  id: 'card_vector',
                  title: 'Vertex AI Vector Search (ScaNN)',
                  iconKey: 'vertex_vector_search',
                  badge: 'Sub-10ms',
                  items: ['Hierarchical Navigable Small World (HNSW)', 'Hybrid dense-sparse retrieval', 'Real-time index streaming mutation']
                }
              ]
            },
            {
              id: 'col_rag_storage',
              header: 'ENTERPRISE DATA LAKEHOUSE',
              headerColor: 'purple',
              subtitle: 'Authoritative data grounding',
              cards: [
                {
                  id: 'card_bq',
                  title: 'Google BigQuery & GCS',
                  iconKey: 'bigquery',
                  items: ['Unstructured PDF/Doc embeddings in GCS', 'Structured transactional telemetry in BigQuery']
                }
              ]
            }
          ]
        }
      ],
      connections: []
    };
    return enrichAndSanitizeSemanticGraph(rawGraph, intent);
  }

  // 3. TRANSFORMER ARCHITECTURE
  if (p.includes('transformer') || p.includes('attention') || p.includes('neural')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'TRANSFORMER NEURAL ARCHITECTURE & ATTENTION FLOW',
      subtitle: 'Multi-Head Self-Attention, Positional Embeddings & Autoregressive Decoding',
      tenets: ['ATTENTION IS ALL YOU NEED', 'AUTOREGRESSIVE DECODING', 'PARALLEL ENCODING'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_transformer_core',
          title: 'TRANSFORMER ENCODER-DECODER MESH',
          badge: 'DEEP LEARNING MODEL',
          type: 'columns',
          columns: [
            {
              id: 'col_embedding',
              header: 'INPUT EMBEDDING & POSITIONAL ENCODING',
              headerColor: 'blue',
              subtitle: 'Tokenization and Vector Space Representation',
              cards: [
                {
                  id: 'card_emb',
                  title: 'Token & Positional Embeddings',
                  iconKey: 'vertex_vector_search',
                  items: ['Learned token embedding projection matrix', 'Sinusoidal / RoPE positional vectors', 'Addition & Dropout layer regularization']
                }
              ]
            },
            {
              id: 'col_encoder',
              header: 'MULTI-HEAD ATTENTION & ENCODER STACK',
              headerColor: 'teal',
              subtitle: 'Bidirectional Contextual Feature Extraction',
              cards: [
                {
                  id: 'card_attn',
                  title: 'Multi-Head Self-Attention Block',
                  iconKey: 'gemini',
                  items: ['Scaled Dot-Product: Softmax(QK^T / √d_k)V', '8-32 parallel subspace projection heads', 'Residual Add & Pre-LayerNorm (RMSNorm)']
                },
                {
                  id: 'card_ffn',
                  title: 'Feed-Forward Network (FFN)',
                  iconKey: 'gemini',
                  items: ['Pointwise two-layer dense transformation', 'SwiGLU / GELU non-linear activations']
                }
              ]
            },
            {
              id: 'col_decoder',
              header: 'DECODER & AUTOREGRESSIVE GENERATION',
              headerColor: 'purple',
              subtitle: 'Cross-Attention and Token Probability Output',
              cards: [
                {
                  id: 'card_dec',
                  title: 'Masked Decoder & Cross-Attention',
                  iconKey: 'gemini',
                  items: ['Causal masking for autoregressive inference', 'Cross-attention over encoder key-values', 'Final linear layer to vocabulary logits']
                }
              ]
            }
          ]
        }
      ],
      connections: [
        {
          fromId: 'card_emb',
          toId: 'card_attn',
          label: '❶ Embeddings & Positional Vectors (Dense)',
          style: 'solid_blue'
        },
        {
          fromId: 'card_attn',
          toId: 'card_ffn',
          label: '❷ Contextual Representation H',
          style: 'solid_blue'
        },
        {
          fromId: 'card_ffn',
          toId: 'card_dec',
          label: '❸ Key/Value Memory Matrix (Cross-Attn)',
          style: 'dashed_purple'
        }
      ]
    };
    return enrichAndSanitizeSemanticGraph(rawGraph, intent);
  }

  // 3. MACHINE LEARNING & STATISTICAL MODELING DOMAIN (e.g. Logistic Regression, Classification, SGD)
  if (p.includes('logistic') || p.includes('regression') || p.includes('classification') || p.includes('machine learning') || p.includes('ml model') || p.includes('gradient descent')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'LOGISTIC REGRESSION & BINARY CLASSIFICATION WORKFLOW',
      subtitle: 'Mathematical Formulation, Sigmoid Mapping, Binary Cross-Entropy Loss & Vertex AI Inference',
      tenets: ['MATHEMATICAL PRECISION', 'PROBABILISTIC CLASSIFICATION', 'CONTINUOUS DRIFT OBSERVABILITY'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_ml_core',
          title: 'END-TO-END MACHINE LEARNING WORKFLOW & MATHEMATICAL ARCHITECTURE',
          badge: 'STATISTICAL LEARNING ENGINE',
          type: 'columns',
          columns: [
            {
              id: 'col_data',
              header: 'DATA ACQUISITION & FEATURE STORE',
              headerColor: 'blue',
              subtitle: 'Labeled ground truth and feature scaling',
              cards: [
                {
                  id: 'card_bq',
                  title: 'BigQuery Feature Warehouse',
                  iconKey: 'bigquery',
                  badge: 'Feature Store',
                  items: [
                    'Binary labeled ground truth (y ∈ {0, 1})',
                    'Stratified 80/20 train/test split',
                    'High-throughput Storage Write API'
                  ]
                },
                {
                  id: 'card_feat',
                  title: 'Vertex AI Feature Processing',
                  iconKey: 'vertex_vector_search',
                  items: [
                    'Z-score normalization: x_norm = (x - μ) / σ',
                    'One-Hot Encoding for categorical features',
                    'Design matrix X ∈ ℝ^(N×D) compilation'
                  ]
                }
              ]
            },
            {
              id: 'col_math',
              header: 'MATHEMATICAL FORMULATION & SIGMOID',
              headerColor: 'teal',
              subtitle: 'Linear logit scoring and non-linear squashing',
              cards: [
                {
                  id: 'card_sigmoid',
                  title: 'Sigmoid Probability Function',
                  iconKey: 'vertex_ai',
                  badge: 'Core Formula',
                  items: [
                    'Linear logit: z = w^T x + b = ∑(w_i x_i) + b',
                    'Sigmoid mapping: σ(z) = 1 / (1 + e^-z)',
                    'Predicted probability P(y=1|x) ∈ [0, 1]'
                  ]
                },
                {
                  id: 'card_loss',
                  title: 'Binary Cross-Entropy Loss',
                  iconKey: 'vertex_ai',
                  items: [
                    'Log-Loss: J(w) = -1/N ∑ [y ln(p) + (1-y) ln(1-p)]',
                    'Convex cost function (guaranteed global minimum)',
                    'L2 Ridge Regularization penalty: + λ ||w||²'
                  ]
                }
              ]
            },
            {
              id: 'col_train',
              header: 'MODEL TRAINING & SGD OPTIMIZATION',
              headerColor: 'purple',
              subtitle: 'Gradient descent and parameter optimization',
              cards: [
                {
                  id: 'card_sgd',
                  title: 'Vertex AI Training Workers',
                  iconKey: 'gke_autopilot',
                  badge: 'Distributed',
                  items: [
                    'Gradient update: w := w - α · ∇J(w)',
                    'Analytical gradient: ∇J(w) = 1/N X^T (σ(z) - y)',
                    'Mini-batch Adam / Momentum optimizer'
                  ]
                },
                {
                  id: 'card_metrics',
                  title: 'Cloud Monitoring & Telemetry',
                  iconKey: 'cloud_monitoring',
                  items: [
                    'Training vs. Validation loss convergence',
                    'Gradient norm & learning rate decay tracking',
                    'Automated early stopping callback'
                  ]
                }
              ]
            },
            {
              id: 'col_inference',
              header: 'INFERENCE & DECISION BOUNDARY',
              headerColor: 'emerald',
              subtitle: 'Online prediction and evaluation metrics',
              cards: [
                {
                  id: 'card_endpoint',
                  title: 'Vertex AI Prediction Endpoint',
                  iconKey: 'cloud_run',
                  badge: 'Sub-10ms SLA',
                  items: [
                    'Decision boundary: ŷ = 1 if σ(z) ≥ 0.5 else 0',
                    'Sub-10ms real-time latency serving',
                    'Serverless auto-scaling endpoint'
                  ]
                },
                {
                  id: 'card_eval',
                  title: 'Evaluation & Confusion Matrix',
                  iconKey: 'cloud_monitoring',
                  items: [
                    'Confusion Matrix: Precision, Recall, F1 Score',
                    'ROC curve & Area Under Curve (ROC-AUC)',
                    'Continuous statistical data drift detection'
                  ]
                }
              ]
            }
          ]
        }
      ],
      connections: [
        {
          fromId: 'card_bq',
          toId: 'card_sigmoid',
          label: '❶ Design Matrix X & Labels y (mTLS)',
          style: 'solid_blue'
        },
        {
          fromId: 'card_sigmoid',
          toId: 'card_sgd',
          label: '❷ Probability Logits σ(z) (gRPC)',
          style: 'solid_blue'
        },
        {
          fromId: 'card_sgd',
          toId: 'card_endpoint',
          label: '❸ Optimal Weights w*, b* (Artifact)',
          style: 'dashed_purple'
        },
        {
          fromId: 'card_eval',
          toId: 'card_feat',
          label: '❹ Continuous Drift Feedback Loop',
          style: 'feedback_teal'
        }
      ]
    };
    return enrichAndSanitizeSemanticGraph(rawGraph, intent);
  }

  // 4. GENERAL DYNAMIC CLOUD TOPOLOGY
  const cleanTitle = (prompt || '').length > 50 ? (prompt || '').slice(0, 48) + '...' : (prompt || 'SYSTEM TOPOLOGY');
  const rawGraph: Studio3SemanticGraph = {
    title: cleanTitle.toUpperCase(),
    subtitle: `Synthesized ${intent.abstractionLevel.toUpperCase()} Architecture with GCP Native Services`,
    tenets: ['HIGH AVAILABILITY', 'SECURITY BY DESIGN', 'OBSERVABILITY FIRST'],
    abstractionLevel: intent.abstractionLevel,
    bands: [
      {
        id: 'band_generic_main',
        title: 'APPLICATION & INFRASTRUCTURE TOPOLOGY',
        badge: `${intent.abstractionLevel.toUpperCase()} VIEW`,
        type: 'columns',
        columns: [
          {
            id: 'col_ingress',
            header: 'INGRESS & SECURITY TIER',
            headerColor: 'blue',
            subtitle: 'Secure API Gateway and Edge Protection',
            cards: [
              {
                id: 'card_sec',
                title: 'Cloud Armor & Load Balancer',
                iconKey: 'cloud_armor',
                items: ['Global external load balancing', 'DDoS protection and SSL termination']
              }
            ]
          },
          {
            id: 'col_app',
            header: 'APPLICATION & PROCESSING TIER',
            headerColor: 'teal',
            subtitle: 'Microservices and Containerized Workloads',
            cards: [
              {
                id: 'card_comp',
                title: 'GKE Autopilot / Cloud Run',
                iconKey: 'gke_autopilot',
                items: ['Auto-scaling stateless container services', 'Managed control plane with zero ops overhead']
              }
            ]
          },
          {
            id: 'col_data',
            header: 'DATA & STORAGE TIER',
            headerColor: 'purple',
            subtitle: 'Managed Database and Object Store',
            cards: [
              {
                id: 'card_db',
                title: 'Cloud Spanner & Memorystore',
                iconKey: 'spanner',
                items: ['High-throughput low-latency persistence', 'In-memory Redis caching layer']
              }
            ]
          }
        ]
      }
    ],
    connections: []
  };
  return enrichAndSanitizeSemanticGraph(rawGraph, intent);
}

export async function extractStudio3SemanticGraph(params: {
  prompt: string;
  intent: Studio3Intent;
  previousContext?: string;
  userApiKey?: string;
  logger?: Studio3ExecutionLogger;
}): Promise<Studio3SemanticGraph> {
  const { prompt, intent, previousContext, userApiKey, logger } = params;
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    logger?.log({
      stage: 'graph_synthesis',
      status: 'warning',
      message: 'GEMINI_API_KEY is not configured. Running first-principles dynamic graph generator.'
    });
    return generateDynamicFirstPrinciplesGraph(prompt, intent);
  }

  const modelName = process.env.GEMINI_FLASH_MODEL_ID || 'gemini-2.5-flash';
  const startTime = Date.now();

  logger?.log({
    stage: 'graph_synthesis',
    status: 'calling',
    model: modelName,
    message: `Calling Gemini API for Semantic Graph Extraction on: "${(prompt || '').slice(0, 60)}..."`,
    payload: { prompt, intent }
  });

  try {
    const ai = getAiClient(apiKey);

    const systemInstruction = `You are Google DeepMind's Premier Architecture & Mathematical Graph Synthesizer for Studio 3.
Your task is to convert the user's prompt and validated intent into an authentic, visually compelling architecture diagram or discrete mathematical drawing.

MANDATORY RULES:
1. For theoretical, mathematical, graph theory, algorithmic, or conceptual topics (such as "teach me graph theory", "dijkstra", "neural network activation", "discrete math", "data structures"), you MUST output "layoutType": "freeform" with "freeformElements" containing circular nodes/vertices (shape: "circle"), 2D grid matrices (shape: "matrix"), and formula theorem boxes (shape: "formula"). DO NOT put mathematical concepts into boring rigid column cards.
2. For cloud topologies and systems, you can use "bands" with structured columns or "freeformElements".
3. Every card or element MUST have concrete, informative technical bullet points, mathematical formulas, and protocols. NEVER output empty elements.
4. Always generate sequential 'connections' connecting entities with explicit labeled pills and step numbers (❶, ❷, ❸, ❹).`;

    const userContent = `Extract the complete architecture graph for:
Prompt: "${prompt}"
Validated Intent: ${JSON.stringify(intent, null, 2)}
Previous History: "${previousContext || 'None'}"

JSON Schema:
{
  "title": "TITLE IN ALL CAPS",
  "subtitle": "Informative Subtitle",
  "tenets": ["TENET 1", "TENET 2", "TENET 3"],
  "abstractionLevel": "conceptual" | "logical" | "technical",
  "layoutType": "freeform" | "bands",
  "freeformElements": [
    {
      "id": "v1",
      "name": "Node / Vertex / Component Name",
      "shape": "circle" | "rectangle" | "matrix" | "formula",
      "x": 80,
      "y": 180,
      "w": 110,
      "h": 110,
      "color": "blue" | "teal" | "purple" | "amber" | "emerald",
      "subLabel": "Optional subtitle / degree / role",
      "formula": "Optional mathematical formula snippet",
      "matrixHeaders": ["V1", "V2", "V3"],
      "matrixData": [["0", "1", "0"], ["0", "0", "1"], ["1", "0", "0"]],
      "details": ["Bullet point 1", "Bullet point 2"]
    }
  ],
  "bands": [
    {
      "id": "band_1",
      "title": "BAND TITLE",
      "type": "columns",
      "columns": [
        {
          "id": "col_1",
          "header": "TIER HEADER",
          "headerColor": "blue" | "teal" | "purple" | "slate" | "amber",
          "cards": [
            {
              "id": "card_1",
              "title": "Service Name",
              "iconKey": "vertex_ai" | "bigquery" | "spanner" | "gke_autopilot" | "cloud_armor",
              "items": ["Item 1", "Item 2"]
            }
          ]
        }
      ]
    }
  ],
  "connections": [
    {
      "fromId": "v1",
      "toId": "v2",
      "label": "❶ Step Protocol / Edge Weight",
      "style": "solid_blue" | "dashed_purple" | "green_protocol" | "feedback_teal"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: userContent }] }],
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const elapsed = Date.now() - startTime;
    const rawText = response.text || '';
    const fallbackGraph = generateDynamicFirstPrinciplesGraph(prompt, intent);
    const parsed = parseJsonSafely<Studio3SemanticGraph>(rawText, fallbackGraph);

    // Run semantic post-processor & auto-enricher to guarantee 100% icon & item completeness
    const enriched = enrichAndSanitizeSemanticGraph(parsed, intent);

    logger?.log({
      stage: 'graph_synthesis',
      status: 'success',
      model: modelName,
      latencyMs: elapsed,
      message: `Gemini synthesized graph: "${enriched.title}" (${enriched.bands?.length || 1} bands, ${enriched.bands?.reduce((acc, b) => acc + (b.columns?.length || b.pipelineStages?.length || 0), 0) || 0} zones) in ${elapsed}ms`,
      payload: enriched
    });

    return enriched;
  } catch (error: any) {
    const elapsed = Date.now() - startTime;
    logger?.log({
      stage: 'graph_synthesis',
      status: 'error',
      model: modelName,
      latencyMs: elapsed,
      message: `Gemini Graph Synthesis failed (${error.message}). Running dynamic first-principles generator.`,
      payload: { error: error.message }
    });
    return generateDynamicFirstPrinciplesGraph(prompt, intent);
  }
}
