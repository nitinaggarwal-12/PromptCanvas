import { Studio3SemanticGraph, Studio3Band, Studio3Column, Studio3CardItem, Studio3PipelineStage } from './graphExtractor';
import { Studio3Intent } from './intentParser';

const SERVICE_ICON_MAP: Record<string, { iconKey: string; defaultItems: string[] }> = {
  logistic: {
    iconKey: 'vertex_ai',
    defaultItems: ['Sigmoid activation: σ(z) = 1 / (1 + e^-z)', 'Log-odds output mapped to probability p ∈ [0, 1]', 'Binary Cross-Entropy (Log-Loss) minimization']
  },
  regression: {
    iconKey: 'vertex_ai',
    defaultItems: ['Linear logit calculation: z = w^T x + b', 'Maximum Likelihood Estimation (MLE) optimization', 'L1 (Lasso) / L2 (Ridge) weight regularization']
  },
  classification: {
    iconKey: 'vertex_ai',
    defaultItems: ['Decision boundary thresholding (p ≥ 0.5)', 'Multi-class Softmax / OvR probability vectors', 'High-accuracy probabilistic classification']
  },
  sigmoid: {
    iconKey: 'vertex_ai',
    defaultItems: ['S-shaped non-linear monotonic curve', 'Asymptotic bounds: lim z→∞ = 1, lim z→-∞ = 0', 'Smooth derivative for gradient calculation']
  },
  gradient: {
    iconKey: 'gke_autopilot',
    defaultItems: ['Stochastic Gradient Descent (SGD / Adam)', 'Weight updates: w := w - α ∇J(w)', 'Loss surface convergence & learning rate tuning']
  },
  feature: {
    iconKey: 'vertex_vector_search',
    defaultItems: ['Design matrix X normalization & z-scoring', 'One-Hot Encoding & categorical imputation', 'Vertex AI Feature Store real-time online serving']
  },
  dataset: {
    iconKey: 'bigquery',
    defaultItems: ['Ground truth labeled dataset (y ∈ {0, 1})', 'Stratified 80/20 train/test evaluation split', 'Petabyte-scale BigQuery feature warehouse']
  },
  training: {
    iconKey: 'gke_autopilot',
    defaultItems: ['Distributed GPU/TPU training worker pool', 'Mini-batch loss computation & backpropagation', 'Automated checkpointing & early stopping']
  },
  evaluation: {
    iconKey: 'cloud_monitoring',
    defaultItems: ['Confusion matrix: Precision, Recall, F1 score', 'ROC curve & Area Under Curve (ROC-AUC)', 'Continuous model performance & data drift tracking']
  },
  inference: {
    iconKey: 'cloud_run',
    defaultItems: ['Sub-10ms serverless prediction endpoint', 'Real-time JSON payload scoring & logging', 'Autoscaling endpoint behind Cloud Armor']
  },
  transformer: {
    iconKey: 'gemini',
    defaultItems: ['Multi-Head Self-Attention layers', 'Positional Encodings (Sinusoidal / RoPE)', 'Feed-Forward Neural Networks (FFN)']
  },
  attention: {
    iconKey: 'gemini',
    defaultItems: ['Scaled Dot-Product: Softmax(QK^T / √d_k)V', 'Multi-Head Parallel Subspace Projections', 'Residual Connections & LayerNorm']
  },
  encoder: {
    iconKey: 'gemini',
    defaultItems: ['Stack of N identical Transformer Encoder blocks', 'Bidirectional Self-Attention Context Capture', 'Layer Normalization & Residual Add']
  },
  decoder: {
    iconKey: 'gemini',
    defaultItems: ['Masked Multi-Head Self-Attention (Autoregressive)', 'Encoder-Decoder Cross-Attention Conditioning', 'Linear Projection to Vocabulary & Softmax']
  },
  diffusion: {
    iconKey: 'gemini',
    defaultItems: ['Forward Diffusion Gaussian noise schedule', 'Latent space score matching & denoising', 'Reverse trajectory sampling (DDPM / DDIM)']
  },
  noise: {
    iconKey: 'vertex_ai',
    defaultItems: ['Forward Markovian noise schedule (β_t)', 'Gaussian noise perturbation q(x_t|x_0)', 'Time-step conditioning embeddings']
  },
  denoise: {
    iconKey: 'gemini',
    defaultItems: ['U-Net / DiT score-based noise predictor', 'Cross-attention text prompt conditioning', 'Iterative noise residual subtraction']
  },
  latent: {
    iconKey: 'vertex_vector_search',
    defaultItems: ['Variational Autoencoder (VAE) encoder/decoder', '8x spatial dimension compression', 'Perceptual and adversarial patch loss']
  },
  armor: {
    iconKey: 'cloud_armor',
    defaultItems: ['L3/L4/L7 DDoS mitigation & rate-limiting', 'OWASP Top 10 automated threat filtering', 'Custom WAF banking API security policies']
  },
  spanner: {
    iconKey: 'spanner',
    defaultItems: ['TrueTime multi-region active-active replication', 'Global ACID transactions with 99.999% SLA', 'Strong consistency for financial ledgers']
  },
  gke: {
    iconKey: 'gke_autopilot',
    defaultItems: ['Auto-scaling stateless ledger microservices', 'Hardened GKE Autopilot node security', 'mTLS service-to-service communication']
  },
  run: {
    iconKey: 'cloud_run',
    defaultItems: ['Serverless container execution', 'Sub-second auto-scaling on demand', 'Direct VPC egress with private connectivity']
  },
  iap: {
    iconKey: 'iap',
    defaultItems: ['Context-aware device & user verification', 'Zero-trust identity boundary enforcement', 'BeyondCorp zero-trust network access']
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
  const rawTenets = Array.isArray(graph?.tenets)
    ? graph.tenets.filter(t => typeof t === 'string' && t.trim().length > 0).map(t => String(t).toUpperCase())
    : [];

  const enrichedTenets = rawTenets.length > 0
    ? rawTenets
    : ['MATHEMATICAL PRECISION', 'HIGH AVAILABILITY & RESILIENCE', 'CONTINUOUS OBSERVABILITY'];

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
    connections: Array.isArray(graph?.connections) ? [...graph.connections] : [],
    bands: []
  };

  // If slide deck is present, preserve it directly
  if (graph?.slides && graph.slides.length > 0) {
    return {
      ...enriched,
      layoutType: 'slide_deck',
      slides: graph.slides,
      bands: [],
      connections: []
    };
  }

  // If conceptual roadmap is present, preserve it directly
  if (graph?.conceptualRoadmap) {
    return {
      ...enriched,
      layoutType: 'conceptual_roadmap',
      conceptualRoadmap: graph.conceptualRoadmap,
      bands: [],
      connections: []
    };
  }

  // If freeform elements are present, preserve them directly
  if (graph?.freeformElements && graph.freeformElements.length > 0) {
    return {
      ...enriched,
      layoutType: 'freeform',
      freeformElements: graph.freeformElements,
      bands: [],
      connections: graph.connections || []
    };
  }

  const rawBands = Array.isArray(graph?.bands) && graph.bands.length > 0 ? graph.bands : [
    {
      id: 'band_main',
      title: 'CORE ARCHITECTURE TOPOLOGY',
      badge: `${(intent?.abstractionLevel || 'logical').toUpperCase()} VIEW`,
      type: 'columns' as const,
      columns: []
    }
  ];

  const stepBadges = ['❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽'];
  const allCardIdsByColumn: string[][] = [];

  enriched.bands = rawBands.map((band, bIdx) => {
    // 1. If it's a column band
    if (band.columns && band.columns.length > 0) {
      const enrichedCols: Studio3Column[] = band.columns.map((col, cIdx) => {
        const headerColors: Array<Studio3Column['headerColor']> = ['blue', 'teal', 'purple', 'emerald', 'amber', 'slate'];
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
            if (titleLower.includes('dataset') || titleLower.includes('data') || titleLower.includes('sql')) matchedIconKey = 'bigquery';
            else if (titleLower.includes('feature') || titleLower.includes('vector') || titleLower.includes('embed')) matchedIconKey = 'vertex_vector_search';
            else if (titleLower.includes('model') || titleLower.includes('sigmoid') || titleLower.includes('regression')) matchedIconKey = 'vertex_ai';
            else if (titleLower.includes('train') || titleLower.includes('job') || titleLower.includes('compute')) matchedIconKey = 'gke_autopilot';
            else if (titleLower.includes('endpoint') || titleLower.includes('inference') || titleLower.includes('serve')) matchedIconKey = 'cloud_run';
            else if (titleLower.includes('eval') || titleLower.includes('metric') || titleLower.includes('log')) matchedIconKey = 'cloud_monitoring';
            else matchedIconKey = 'gemini';
          }

          const rawItems = Array.isArray(card?.items)
            ? card.items.filter(it => typeof it === 'string' && it.trim().length > 0)
            : [];

          const finalItems = rawItems.length > 0
            ? rawItems.slice(0, 4)
            : (defaultItems.length > 0 ? defaultItems : ['Core architectural subsystem', 'High-performance processing block', 'Low-latency communication pathway']);

          let cleanSnippet = card?.codeSnippet;
          if (cleanSnippet && typeof cleanSnippet === 'string') {
            if (!cleanSnippet.includes('\n') && cleanSnippet.length > 40) {
              cleanSnippet = cleanSnippet
                .replace(/\s+(PRIMARY KEY|OPTIONS|FROM|WHERE|GROUP BY|ORDER BY)\b/gi, '\n  $1')
                .replace(/,\s*/g, ',\n  ');
            }
          }

          const cardId = card?.id || `card_${bIdx}_${cIdx}_${cardIdx}`;

          return {
            ...card,
            id: cardId,
            title: card?.title && typeof card.title === 'string' ? card.title : 'Architecture Component',
            iconKey: matchedIconKey,
            items: finalItems,
            codeSnippet: cleanSnippet,
            badge: card?.badge || (titleLower.includes('spanner') ? '99.999% SLA' : titleLower.includes('model') ? 'ML Core' : undefined)
          };
        });

        const colCardIds = enrichedCards.map(c => c.id);
        allCardIdsByColumn.push(colCardIds);

        let rawHeader = col?.header || `STAGE ${cIdx + 1}`;
        const cleanHeader = rawHeader.replace(/^[❶❷❸❹❺❻❼❽\d\.\s\-]+/, '').trim();
        const stepPrefix = stepBadges[cIdx] ? `${stepBadges[cIdx]} ` : '';
        const finalHeader = `${stepPrefix}${cleanHeader}`.toUpperCase();

        return {
          ...col,
          id: col?.id || `col_${bIdx}_${cIdx}`,
          header: finalHeader,
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

    return band;
  });

  // 3. Auto-Synthesize Sequential Connections if Empty (Guarantees Visible Flow & Arrows)
  if (enriched.connections.length === 0 && allCardIdsByColumn.length >= 2) {
    const defaultLabels = [
      '❶ Ingest & Preprocessing (mTLS)',
      '❷ Feature Vector X (gRPC)',
      '❸ Loss Minimization (SGD / Adam)',
      '❹ Model Deployment (REST / JSON)',
      '❺ Telemetry Stream (CDC / PubSub)'
    ];

    for (let i = 0; i < allCardIdsByColumn.length - 1; i++) {
      const fromCardId = allCardIdsByColumn[i][0];
      const toCardId = allCardIdsByColumn[i + 1][0];
      if (fromCardId && toCardId) {
        enriched.connections.push({
          fromId: fromCardId,
          toId: toCardId,
          label: defaultLabels[i] || `Step ${i + 1} Data Flow`,
          style: i === 2 ? 'dashed_purple' : 'solid_blue'
        });
      }
    }

    // Add closed-loop feedback from last column back to feature engineering if available
    if (allCardIdsByColumn.length >= 3 && allCardIdsByColumn[allCardIdsByColumn.length - 1].length > 1 && allCardIdsByColumn[1].length > 1) {
      const fromEvalCard = allCardIdsByColumn[allCardIdsByColumn.length - 1][1];
      const toFeatureCard = allCardIdsByColumn[1][1];
      if (fromEvalCard && toFeatureCard) {
        enriched.connections.push({
          fromId: fromEvalCard,
          toId: toFeatureCard,
          label: 'Continuous Retraining & Drift Feedback',
          style: 'feedback_teal'
        });
      }
    }
  }

  return enriched;
}
