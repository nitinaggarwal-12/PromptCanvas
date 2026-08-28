import { Studio3SemanticGraph, Studio3Band, Studio3Column, Studio3CardItem, Studio3PipelineStage } from './graphExtractor';
import { Studio3Intent } from './intentParser';

const SERVICE_ICON_MAP: Record<string, { iconKey: string; defaultItems: string[] }> = {
  transformer: {
    iconKey: 'gemini',
    defaultItems: ['Multi-Head Self-Attention layers', 'Positional Encodings (Sinusoidal / RoPE)', 'Feed-Forward Neural Networks (FFN)']
  },
  attention: {
    iconKey: 'gemini',
    defaultItems: ['Scaled Dot-Product Attention: Softmax(QK^T / √d_k)V', 'Multi-Head Parallel Subspace Projections', 'Residual Connections & LayerNorm']
  },
  encoder: {
    iconKey: 'gemini',
    defaultItems: ['Stack of N identical Transformer Encoder blocks', 'Bidirectional Self-Attention Context Capture', 'Layer Normalization & Residual Add']
  },
  decoder: {
    iconKey: 'gemini',
    defaultItems: ['Masked Multi-Head Self-Attention (Autoregressive)', 'Encoder-Decoder Cross-Attention Conditioning', 'Linear Projection to Vocabulary & Softmax']
  },
  embedding: {
    iconKey: 'vertex_vector_search',
    defaultItems: ['Token Embedding Lookup Matrix', 'Learnable / Sinusoidal Positional Encoding', 'High-Dimensional Vector Representation']
  },
  layer: {
    iconKey: 'gemini',
    defaultItems: ['Pre-Layer Normalization (RMSNorm / LayerNorm)', 'GELU / SwiGLU Activation Function', 'Skip Residual Connection']
  },
  armor: {
    iconKey: 'cloud_armor',
    defaultItems: ['L3/L4/L7 DDoS mitigation & rate-limiting', 'OWASP Top 10 automated threat filtering', 'Custom WAF banking API security policies']
  },
  waf: {
    iconKey: 'cloud_armor',
    defaultItems: ['Edge threat inspection & DDoS protection', 'Adaptive rate limiting for public endpoints']
  },
  spanner: {
    iconKey: 'spanner',
    defaultItems: ['TrueTime multi-region active-active replication', 'Global ACID transactions with 99.999% SLA', 'Strong consistency for financial ledgers']
  },
  ledger: {
    iconKey: 'spanner',
    defaultItems: ['Immutable double-entry transaction journal', 'Synchronous multi-region ledger persistence', 'Cryptographic audit log verification']
  },
  kms: {
    iconKey: 'cloud_armor',
    defaultItems: ['Customer-Managed Encryption Keys (CMEK)', 'FIPS 140-2 Level 3 HSM hardware protection', 'Automated 90-day cryptographic key rotation']
  },
  cmek: {
    iconKey: 'cloud_armor',
    defaultItems: ['Envelope encryption with Cloud KMS', 'Hardware Security Module (HSM) protection', 'Granular IAM key access policies']
  },
  gke: {
    iconKey: 'gke_autopilot',
    defaultItems: ['Auto-scaling stateless ledger microservices', 'Hardened GKE Autopilot node security', 'mTLS service-to-service communication']
  },
  kubernetes: {
    iconKey: 'gke_autopilot',
    defaultItems: ['Containerized microservices orchestration', 'Zero-downtime rolling canary deployments']
  },
  run: {
    iconKey: 'cloud_run',
    defaultItems: ['Serverless container execution', 'Sub-second auto-scaling on demand', 'Direct VPC egress with private connectivity']
  },
  iap: {
    iconKey: 'iap',
    defaultItems: ['Context-aware device & user verification', 'Zero-trust identity boundary enforcement', 'BeyondCorp zero-trust network access']
  },
  iam: {
    iconKey: 'iap',
    defaultItems: ['Least-privilege role-based access control', 'Workload Identity Federation for pods', 'Short-lived OAuth2 access tokens']
  },
  user: {
    iconKey: 'iap',
    defaultItems: ['Multi-Factor Authentication (MFA/FIDO2)', 'Context-aware device certificate verification']
  },
  vpc: {
    iconKey: 'cloud_armor',
    defaultItems: ['Private Service Connect (PSC) endpoints', 'VPC Service Controls (VPC-SC) perimeters', 'Zero public IP exposure for databases']
  },
  pubsub: {
    iconKey: 'cloud_run',
    defaultItems: ['Guaranteed at-least-once message streaming', 'Dead-Letter Queue (DLQ) for poison messages', 'Ordered message delivery by account key']
  },
  redis: {
    iconKey: 'memorystore',
    defaultItems: ['Sub-millisecond in-memory cache cluster', 'High-availability Redis with auto-failover', 'Read-shield for core database clusters']
  },
  memorystore: {
    iconKey: 'memorystore',
    defaultItems: ['Managed in-memory distributed cache', 'Sub-millisecond latency for hot balances', 'In-transit TLS encryption']
  },
  gemini: {
    iconKey: 'gemini',
    defaultItems: ['Multimodal reasoning & intent decomposition', 'Autonomous tool calling & function execution', 'Deterministic safety & guardrail enforcement']
  },
  vertex: {
    iconKey: 'vertex_ai',
    defaultItems: ['Managed AI agent orchestration framework', 'Enterprise RAG grounding & citation synthesis', 'Sub-10ms ScaNN vector search index']
  },
  vector: {
    iconKey: 'vertex_vector_search',
    defaultItems: ['Hierarchical Navigable Small World (HNSW)', 'Hybrid dense-sparse embedding retrieval', 'Real-time streaming vector mutations']
  },
  bigquery: {
    iconKey: 'bigquery',
    defaultItems: ['Petabyte-scale analytical data warehouse', 'Real-time telemetry ingestion via Storage Write API', 'Data governance & column-level encryption']
  },
  storage: {
    iconKey: 'cloud_storage',
    defaultItems: ['Dual-region geo-redundant object bucket', 'Object lifecycle management & immutability locks', 'Customer-Managed Encryption Keys (CMEK)']
  },
  logging: {
    iconKey: 'cloud_logging',
    defaultItems: ['Centralized immutable audit logs', 'Real-time anomaly detection & security alerts', 'SOC2 / HIPAA compliance log retention']
  },
  monitoring: {
    iconKey: 'cloud_monitoring',
    defaultItems: ['Golden signals telemetry (Latency, Errors, Saturation)', 'Automated PagerDuty & Slack alerting policies']
  }
};

/**
 * 🛠️ Intelligently Enriches and Cleans Semantic Graphs
 */
export function enrichAndSanitizeSemanticGraph(
  graph: Studio3SemanticGraph,
  intent: Studio3Intent
): Studio3SemanticGraph {
  // Sanitize tenets cleanly
  const rawTenets = Array.isArray(graph?.tenets)
    ? graph.tenets.filter(t => typeof t === 'string' && t.trim().length > 0).map(t => String(t).toUpperCase())
    : [];

  const enrichedTenets = rawTenets.length > 0
    ? rawTenets
    : ['ZERO TRUST SECURITY', 'HIGH AVAILABILITY', 'OBSERVABILITY FIRST'];

  const enriched: Studio3SemanticGraph = {
    ...graph,
    title: graph?.title && typeof graph.title === 'string' && !graph.title.toLowerCase().includes('undefined')
      ? graph.title
      : (intent?.suggestedTitle || 'SYSTEM ARCHITECTURE').toUpperCase(),
    subtitle: graph?.subtitle && typeof graph.subtitle === 'string'
      ? graph.subtitle
      : `Synthesized ${intent?.abstractionLevel?.toUpperCase() || 'LOGICAL'} Architecture`,
    abstractionLevel: intent?.abstractionLevel || graph?.abstractionLevel || 'logical',
    tenets: enrichedTenets,
    connections: Array.isArray(graph?.connections) ? graph.connections : [],
    bands: []
  };

  const rawBands = Array.isArray(graph?.bands) && graph.bands.length > 0 ? graph.bands : [
    {
      id: 'band_main',
      title: 'CORE ARCHITECTURE TOPOLOGY',
      badge: `${(intent?.abstractionLevel || 'logical').toUpperCase()} VIEW`,
      type: 'columns' as const,
      columns: []
    }
  ];

  enriched.bands = rawBands.map((band, bIdx) => {
    // 1. If it's a column band
    if (band.columns && band.columns.length > 0) {
      const enrichedCols: Studio3Column[] = band.columns.map((col, cIdx) => {
        const headerColors: Array<Studio3Column['headerColor']> = ['blue', 'teal', 'purple', 'slate', 'amber', 'emerald'];
        const fallbackColor = headerColors[cIdx % headerColors.length];

        const enrichedCards: Studio3CardItem[] = (col.cards || []).map((card, cardIdx) => {
          const titleLower = (card?.title || '').toLowerCase();

          let matchedIconKey = card?.iconKey;
          let defaultItems: string[] = [];

          for (const [kw, def] of Object.entries(SERVICE_ICON_MAP)) {
            if (titleLower.includes(kw)) {
              if (!matchedIconKey) matchedIconKey = def.iconKey;
              defaultItems = def.defaultItems;
              break;
            }
          }

          if (!matchedIconKey) {
            if (titleLower.includes('attention') || titleLower.includes('model') || titleLower.includes('transformer')) matchedIconKey = 'gemini';
            else if (titleLower.includes('db') || titleLower.includes('data') || titleLower.includes('sql')) matchedIconKey = 'spanner';
            else if (titleLower.includes('auth') || titleLower.includes('user') || titleLower.includes('client')) matchedIconKey = 'iap';
            else if (titleLower.includes('api') || titleLower.includes('ingress') || titleLower.includes('gateway')) matchedIconKey = 'cloud_armor';
            else matchedIconKey = 'gke_autopilot';
          }

          const rawItems = Array.isArray(card?.items)
            ? card.items.filter(it => typeof it === 'string' && it.trim().length > 0)
            : [];

          const finalItems = rawItems.length > 0
            ? rawItems.slice(0, 6) // Cap items at 6 to prevent vertical overflow
            : (defaultItems.length > 0 ? defaultItems : ['Core architectural subsystem', 'High-performance processing block', 'Low-latency communication pathway']);

          return {
            ...card,
            id: card?.id || `card_${bIdx}_${cIdx}_${cardIdx}`,
            title: card?.title && typeof card.title === 'string' ? card.title : 'Architecture Component',
            iconKey: matchedIconKey,
            items: finalItems,
            badge: card?.badge || (titleLower.includes('spanner') ? '99.999% SLA' : titleLower.includes('attention') ? 'Core Block' : undefined)
          };
        });

        let headerTitle = col?.header;
        if (!headerTitle || typeof headerTitle !== 'string' || headerTitle.trim().toUpperCase() === 'TIER' || headerTitle.length < 4) {
          const cardTitles = enrichedCards.map(c => c.title.toLowerCase()).join(' ');
          if (cardTitles.includes('embedding') || cardTitles.includes('input') || cardTitles.includes('token')) {
            headerTitle = 'INPUT EMBEDDING & POSITIONAL ENCODING';
          } else if (cardTitles.includes('encoder') || cardTitles.includes('attention') || cardTitles.includes('self-attention')) {
            headerTitle = 'MULTI-HEAD ATTENTION & ENCODER BLOCK';
          } else if (cardTitles.includes('decoder') || cardTitles.includes('output') || cardTitles.includes('linear') || cardTitles.includes('softmax')) {
            headerTitle = 'DECODER & AUTOREGRESSIVE GENERATION';
          } else if (cardTitles.includes('armor') || cardTitles.includes('iap') || cardTitles.includes('user') || cardTitles.includes('iam')) {
            headerTitle = 'IDENTITY & EDGE SECURITY INGRESS';
          } else if (cardTitles.includes('gke') || cardTitles.includes('run') || cardTitles.includes('microservice')) {
            headerTitle = 'COMPUTE & TRANSACTION PROCESSING';
          } else if (cardTitles.includes('spanner') || cardTitles.includes('kms') || cardTitles.includes('database')) {
            headerTitle = 'DATA PERSISTENCE & KMS ENCRYPTION';
          } else {
            headerTitle = `STAGE ${cIdx + 1}: CORE PROCESSING`;
          }
        }

        return {
          ...col,
          id: col?.id || `col_${bIdx}_${cIdx}`,
          header: String(headerTitle).trim().toUpperCase(),
          headerColor: col?.headerColor || fallbackColor,
          subtitle: col?.subtitle || 'Processing Subsystem',
          cards: enrichedCards
        };
      });

      return {
        ...band,
        columns: enrichedCols
      };
    }

    // 2. If it's a pipeline band
    if (band.pipelineStages && band.pipelineStages.length > 0) {
      const enrichedStages: Studio3PipelineStage[] = band.pipelineStages.map((st, sIdx) => {
        const stageColors: Array<Studio3PipelineStage['color']> = ['blue', 'teal', 'amber', 'purple', 'emerald', 'slate'];
        const fallbackColor = stageColors[sIdx % stageColors.length];

        const enrichedNodes = (st.nodes || []).map((node, nIdx) => {
          const nameLower = (node?.name || '').toLowerCase();
          let iconKey = node?.iconKey;
          if (!iconKey) {
            if (nameLower.includes('token') || nameLower.includes('embed')) iconKey = 'vertex_vector_search';
            else if (nameLower.includes('attention') || nameLower.includes('encoder') || nameLower.includes('decoder')) iconKey = 'gemini';
            else if (nameLower.includes('storage') || nameLower.includes('file')) iconKey = 'cloud_storage';
            else iconKey = 'cloud_run';
          }
          return {
            ...node,
            id: node?.id || `node_${bIdx}_${sIdx}_${nIdx}`,
            name: node?.name && typeof node.name === 'string' ? node.name : 'Stage Node',
            iconKey,
            role: node?.role || 'Sequential Transformation'
          };
        });

        return {
          ...st,
          stepNumber: st?.stepNumber || sIdx + 1,
          id: st?.id || `stage_${bIdx}_${sIdx}`,
          title: String(st?.title || `STAGE ${sIdx + 1}`).toUpperCase(),
          subtitle: st?.subtitle || 'Operational Pipeline Phase',
          color: st?.color || fallbackColor,
          nodes: enrichedNodes
        };
      });

      return {
        ...band,
        pipelineStages: enrichedStages
      };
    }

    return band;
  });

  return enriched;
}
