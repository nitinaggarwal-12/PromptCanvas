import { Studio3SemanticGraph, Studio3Band, Studio3Column, Studio3CardItem } from './graphExtractor';
import { Studio3Intent } from './intentParser';

const SERVICE_ICON_MAP: Record<string, { iconKey: string; defaultItems: string[] }> = {
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
  network: {
    iconKey: 'cloud_armor',
    defaultItems: ['Isolated private subnets (us-central1 / us-east4)', 'Cloud NAT & internal load balancing']
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
 * Guarantees that every card has authentic GCP icons, meaningful titles, and rich technical bullet points.
 */
export function enrichAndSanitizeSemanticGraph(
  graph: Studio3SemanticGraph,
  intent: Studio3Intent
): Studio3SemanticGraph {
  const enriched: Studio3SemanticGraph = {
    ...graph,
    title: graph.title && !graph.title.toLowerCase().includes('undefined') ? graph.title : intent.suggestedTitle.toUpperCase(),
    subtitle: graph.subtitle || `Synthesized ${intent.abstractionLevel.toUpperCase()} Architecture with GCP Native Services`,
    abstractionLevel: intent.abstractionLevel,
    tenets: graph.tenets && graph.tenets.length > 0 ? graph.tenets : ['ZERO TRUST SECURITY', 'HIGH AVAILABILITY', 'COMPLIANCE FIRST'],
    bands: []
  };

  // If graph has no bands or empty bands, construct from intent
  const bands = graph.bands && graph.bands.length > 0 ? graph.bands : [
    {
      id: 'band_main',
      title: 'CORE ARCHITECTURE TOPOLOGY',
      badge: `${intent.abstractionLevel.toUpperCase()} VIEW`,
      type: 'columns' as const,
      columns: []
    }
  ];

  enriched.bands = bands.map((band, bIdx) => {
    // If it's a column band
    if (band.columns && band.columns.length > 0) {
      const enrichedCols: Studio3Column[] = band.columns.map((col, cIdx) => {
        const headerColors: Array<Studio3Column['headerColor']> = ['blue', 'teal', 'purple', 'slate', 'amber', 'emerald'];
        const fallbackColor = headerColors[cIdx % headerColors.length];

        // Enrich cards
        const enrichedCards: Studio3CardItem[] = (col.cards || []).map((card, cardIdx) => {
          const titleLower = (card.title || '').toLowerCase();

          // Match icon and default items
          let matchedIconKey = card.iconKey;
          let defaultItems: string[] = [];

          for (const [kw, def] of Object.entries(SERVICE_ICON_MAP)) {
            if (titleLower.includes(kw)) {
              if (!matchedIconKey) matchedIconKey = def.iconKey;
              defaultItems = def.defaultItems;
              break;
            }
          }

          if (!matchedIconKey) {
            if (titleLower.includes('db') || titleLower.includes('data') || titleLower.includes('sql')) matchedIconKey = 'spanner';
            else if (titleLower.includes('auth') || titleLower.includes('user') || titleLower.includes('client')) matchedIconKey = 'iap';
            else if (titleLower.includes('api') || titleLower.includes('ingress') || titleLower.includes('gateway')) matchedIconKey = 'cloud_armor';
            else if (titleLower.includes('service') || titleLower.includes('app') || titleLower.includes('compute')) matchedIconKey = 'gke_autopilot';
            else matchedIconKey = 'gke_autopilot';
          }

          const finalItems = (card.items && card.items.length > 0)
            ? card.items
            : (defaultItems.length > 0 ? defaultItems : ['Managed cloud service component', 'High-availability configuration', 'Zero-trust network integration']);

          return {
            ...card,
            id: card.id || `card_${bIdx}_${cIdx}_${cardIdx}`,
            title: card.title || 'Managed Component',
            iconKey: matchedIconKey,
            items: finalItems,
            badge: card.badge || (titleLower.includes('spanner') ? '99.999% SLA' : titleLower.includes('armor') ? 'Protected' : undefined),
            codeSnippet: card.codeSnippet || (titleLower.includes('spanner') && !card.items ? `CREATE TABLE FinancialLedger (\n  AccountID STRING(36),\n  Balance NUMERIC\n) PRIMARY KEY (AccountID);` : undefined)
          };
        });

        // Infer Header if it is "TIER" or missing
        let headerTitle = col.header;
        if (!headerTitle || headerTitle.trim().toUpperCase() === 'TIER' || headerTitle.length < 5) {
          const cardTitles = enrichedCards.map(c => c.title.toLowerCase()).join(' ');
          if (cardTitles.includes('armor') || cardTitles.includes('iap') || cardTitles.includes('user') || cardTitles.includes('iam') || cardTitles.includes('vpc')) {
            headerTitle = 'IDENTITY & EDGE SECURITY INGRESS';
          } else if (cardTitles.includes('gke') || cardTitles.includes('run') || cardTitles.includes('microservice') || cardTitles.includes('service')) {
            headerTitle = 'COMPUTE & TRANSACTION PROCESSING';
          } else if (cardTitles.includes('spanner') || cardTitles.includes('kms') || cardTitles.includes('database') || cardTitles.includes('storage')) {
            headerTitle = 'DATA PERSISTENCE & KMS ENCRYPTION';
          } else {
            headerTitle = `TIER ${cIdx + 1}: FUNCTIONAL SERVICES`;
          }
        }

        return {
          ...col,
          id: col.id || `col_${bIdx}_${cIdx}`,
          header: headerTitle.toUpperCase(),
          headerColor: col.headerColor || fallbackColor,
          subtitle: col.subtitle || 'Managed Architectural Subsystem',
          cards: enrichedCards
        };
      });

      return {
        ...band,
        columns: enrichedCols
      };
    }

    return band;
  });

  return enriched;
}
