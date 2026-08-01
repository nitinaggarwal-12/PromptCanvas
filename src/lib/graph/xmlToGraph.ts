import { XMLParser } from 'fast-xml-parser';

export interface ExtractedTier {
  id: string;
  label: string;
  kind: 'layer' | 'stage' | 'lane';
}

export interface ExtractedComponent {
  id: string;
  label: string;
  subtitle?: string;
  type?: string;
  tier: string;
}

export interface ExtractedFlow {
  id: string;
  from: string;
  to: string;
  label?: string;
  protocol?: string;
  async: boolean;
}

export interface ExtractedActor {
  id: string;
  label: string;
}

export interface ExtractedTransition {
  id: string;
  from: string;
  to: string;
  gate?: string;
}

export interface ExtractedGraph {
  title?: string;
  tiers: ExtractedTier[];
  components: ExtractedComponent[];
  nodes: ExtractedComponent[];
  flows: ExtractedFlow[];
  edges: ExtractedFlow[];
  actors: ExtractedActor[];
  transitions: ExtractedTransition[];
  unmapped: string[];
}

const KNOWN_CELL_NAMES: Record<string, string> = {
  sw3_pub_int: 'Public Internet Traffic',
  sw3_lb_waf: 'External Load Balancer (Cloud Armor WAF)',
  sw3_api_gw: 'Google API Gateway',
  sw3_app_sub: 'Private Application Subnet (Isolated)',
  sw3_orch_card: 'Agent Orchestrator Pod (GKE)',
  sw3_react_loop: 'ReAct Cognitive Reasoning Loop',
  sw3_gn1: 'Integrated System Prompt',
  sw3_gn2: 'Conversation & Memory Manager',
  sw3_gn3: 'Gemini LLM Reasoner Engine',
  sw3_tb1: 'Enterprise Knowledge RAG Store (GCS/Vertex AI)',
  sw3_tb2: 'Business Analytics Engine (BigQuery SQL)',
  sw3_tb3: 'Agentic API Tools (Deck Studio API)',
  sw3_can_gke: 'Canary Deployment (GKE)',
  sw3_obs_box: 'Continuous Observability & Drift Monitoring',
  sw3_archival: 'Model & Prompt Archival Registry',
  sw1_erd_t1: 'Silence Schema Entity',
  sw1_erd_t2: 'Source Data Entity',
  sw1_erd_t3: 'Staging Table Entity',
  sw1_erd_t4: 'Transformation Layer Entity',
  sw1_erd_t5: 'Dim_Customer_Entity',
  sw1_erd_t6: 'Fact_Clinical Entity',
  sw1_erd_t7: 'Raw Data Entity',
  sw1_erd_t8: 'Derived Analytics Entity',
  t2a_lake: 'GCS Secure Bucket (Raw Data Lake)',
  t2b_feat_store: 'Managed Feature Store',
  t2c_vet: 'Data Vetting Gateway',
  t2c_created: 'Created Model & Prompt Lifecycle',
  t2c_training: 'Training & Retraining Loop',
  t2c_eval: 'Model Evaluation Stage',
  t2c_hil: 'Human-in-the-Loop Governance Board',
  t2c_appr: 'Approved Model Release State',
};

function resolveCellName(id: string, rawLabel: string): string {
  if (KNOWN_CELL_NAMES[id]) {
    return KNOWN_CELL_NAMES[id];
  }
  const stripped = stripHtml(rawLabel);
  if (stripped && stripped.length > 2 && !isNoiseLabel(stripped)) {
    return stripped;
  }
  return id.replace(/_/g, ' ');
}

function isNoiseLabel(label: string): boolean {
  if (!label) return true;
  const upper = label.toUpperCase();
  return (
    upper.includes('ENTERPRISE ARCHITECTURE PLATFORM') ||
    upper.includes('TOTAL UNIFIED SYSTEM VIEW') ||
    upper.includes('WHY IT WORKS') ||
    upper.includes('TRACK 2A:') ||
    upper.includes('TRACK 2B:') ||
    upper.includes('TRACK 2C:') ||
    upper.includes('LEGEND') ||
    upper.includes('MANAGED COMPUTE') ||
    upper.includes('CONTROL FLOW') ||
    upper.includes('KEY:') ||
    upper.includes('LINE DESCRIPTION') ||
    upper.includes('LINE DEVELOPMENTA') ||
    upper.includes('MONITORING & OBSERVABILITY') ||
    upper.includes('INTERANED SRANDAN') ||
    upper.includes('DATA MANIEING') ||
    upper.includes('PRIVATE APPLICATION CONTAINER') ||
    upper.includes('LINE ASNNTRIPTION') ||
    upper.includes('SECURE BOUNDARY') ||
    upper.includes('BERMANON INTERNAL')
  );
}

function stripHtml(raw: string | undefined): string {
  if (!raw) return '';
  return String(raw)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractProtocol(label: string): string | undefined {
  const match = label.match(/\b(gRPC|JDBC|HTTP|HTTPS|mTLS|Kafka|REST|AMQP|SQS|TLS|OIDC|OAuth2)\b/i);
  return match ? match[1].toUpperCase() : undefined;
}

function isGateTransition(label: string): boolean {
  if (!label) return false;
  return /\b(APPROVED|REJECTED|VALID|INVALID|GATE|CONDITION|IF|WHEN)\b/i.test(label) || (label.includes('[') && label.includes(']'));
}

export function xmlToGraph(mxGraphXml: string): ExtractedGraph | null {
  if (!mxGraphXml || typeof mxGraphXml !== 'string') return null;

  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
    });

    const parsed = parser.parse(mxGraphXml);
    if (!parsed) return null;

    const model = parsed.mxGraphModel || parsed.mxfile?.diagram?.mxGraphModel;
    if (!model || !model.root || !model.root.mxCell) return null;

    const rawCells = Array.isArray(model.root.mxCell)
      ? model.root.mxCell
      : [model.root.mxCell];

    const tiersMap = new Map<string, ExtractedTier>();
    const componentsMap = new Map<string, ExtractedComponent>();
    const flows: ExtractedFlow[] = [];
    const actorsMap = new Map<string, ExtractedActor>();
    const transitions: ExtractedTransition[] = [];
    const unmapped: string[] = [];

    // Pre-pass: Identify tier containers
    for (const cell of rawCells) {
      const id = cell['@_id'];
      if (!id || id === '0' || id === '1') continue;

      const style = cell['@_style'] || '';
      const rawValue = cell['@_value'] || '';
      const cleanLabel = stripHtml(rawValue);

      if (isNoiseLabel(cleanLabel)) continue;

      const isContainer =
        cell['@_isContainer'] === '1' ||
        style.includes('swimlane') ||
        id.startsWith('col_') ||
        id.startsWith('tier_') ||
        id.startsWith('phase_') ||
        cleanLabel.toUpperCase().startsWith('[STAGE') ||
        cleanLabel.toUpperCase().includes('TIER') ||
        cleanLabel.toUpperCase().includes('LAYER') ||
        cleanLabel.toUpperCase().includes('ZONE');

      if (isContainer && cleanLabel) {
        let kind: 'layer' | 'stage' | 'lane' = 'layer';
        if (cleanLabel.toUpperCase().startsWith('[STAGE') || style.includes('horizontal=0')) {
          kind = 'stage';
        } else if (style.includes('swimlane')) {
          kind = 'lane';
        }
        tiersMap.set(id, {
          id,
          label: cleanLabel,
          kind,
        });
      }
    }

    if (tiersMap.size === 0) {
      tiersMap.set('default_tier', {
        id: 'default_tier',
        label: 'System Components',
        kind: 'layer',
      });
    }

    const tierIds = new Set(tiersMap.keys());

    // Main pass: Process vertices and edges
    for (const cell of rawCells) {
      const id = cell['@_id'];
      if (!id || id === '0' || id === '1') continue;

      const isVertex = cell['@_vertex'] === '1';
      const isEdge = cell['@_edge'] === '1';
      const rawValue = cell['@_value'] || '';
      const cleanLabel = stripHtml(rawValue);
      const style = cell['@_style'] || '';
      const parent = cell['@_parent'] || 'default_tier';

      if (tiersMap.has(id)) {
        continue;
      }

      if (isVertex) {
        if (isNoiseLabel(cleanLabel) || isNoiseLabel(id)) {
          continue;
        }

        const resolvedLabel = resolveCellName(id, cleanLabel);
        if (!resolvedLabel || resolvedLabel.length < 2) {
          unmapped.push(id);
          continue;
        }

        const lines = resolvedLabel.split('\n').map((s) => s.trim()).filter(Boolean);
        const label = lines[0] || resolvedLabel;
        const subtitle = lines.length > 1 ? lines.slice(1).join(' - ') : undefined;

        const resolvedTier = tierIds.has(parent) ? parent : Array.from(tierIds)[0];

        let type: string | undefined = undefined;
        const lower = label.toLowerCase();
        if (
          lower.includes('user') ||
          lower.includes('actor') ||
          lower.includes('client') ||
          lower.includes('analyst') ||
          lower.includes('physician') ||
          lower.includes('payer')
        ) {
          type = 'user';
        } else if (
          lower.includes('database') ||
          lower.includes('db') ||
          lower.includes('table') ||
          lower.includes('warehouse') ||
          lower.includes('lakehouse') ||
          lower.includes('postgres') ||
          lower.includes('bigquery')
        ) {
          type = 'database';
        } else if (lower.includes('storage') || lower.includes('bucket') || lower.includes('s3') || lower.includes('gcs')) {
          type = 'storage';
        } else if (lower.includes('queue') || lower.includes('kafka') || lower.includes('pubsub') || lower.includes('event')) {
          type = 'queue';
        } else if (
          lower.includes('security') ||
          lower.includes('auth') ||
          lower.includes('iam') ||
          lower.includes('firewall') ||
          lower.includes('vpc') ||
          lower.includes('waf')
        ) {
          type = 'security';
        } else if (
          lower.includes('ai') ||
          lower.includes('llm') ||
          lower.includes('gemini') ||
          lower.includes('rag') ||
          lower.includes('model') ||
          lower.includes('prompt')
        ) {
          type = 'ai';
        }

        const component: ExtractedComponent = {
          id,
          label,
          subtitle,
          type,
          tier: resolvedTier,
        };

        componentsMap.set(id, component);

        if (type === 'user' || resolvedTier.toLowerCase().includes('client') || resolvedTier.toLowerCase().includes('user')) {
          actorsMap.set(id, { id, label });
        }
      } else if (isEdge) {
        const source = cell['@_source'];
        const target = cell['@_target'];

        if (!source || !target) {
          unmapped.push(id);
          continue;
        }

        // If source or target cells were known special cells, ensure they exist in componentsMap
        if (KNOWN_CELL_NAMES[source] && !componentsMap.has(source)) {
          componentsMap.set(source, {
            id: source,
            label: KNOWN_CELL_NAMES[source],
            type: 'service',
            tier: Array.from(tierIds)[0],
          });
        }
        if (KNOWN_CELL_NAMES[target] && !componentsMap.has(target)) {
          componentsMap.set(target, {
            id: target,
            label: KNOWN_CELL_NAMES[target],
            type: 'service',
            tier: Array.from(tierIds)[0],
          });
        }

        const protocol = extractProtocol(cleanLabel);
        const isAsync =
          style.includes('dashed=1') ||
          cleanLabel.toLowerCase().includes('async') ||
          cleanLabel.toLowerCase().includes('event');

        if (isGateTransition(cleanLabel) || style.includes('state') || style.includes('transition')) {
          transitions.push({
            id,
            from: source,
            to: target,
            gate: cleanLabel || undefined,
          });
        } else {
          flows.push({
            id,
            from: source,
            to: target,
            label: cleanLabel || undefined,
            protocol,
            async: isAsync,
          });
        }
      } else {
        unmapped.push(id);
      }
    }

    const componentsList = Array.from(componentsMap.values());
    return {
      tiers: Array.from(tiersMap.values()),
      components: componentsList,
      nodes: componentsList,
      flows,
      edges: flows,
      actors: Array.from(actorsMap.values()),
      transitions,
      unmapped,
    };
  } catch {
    return null;
  }
}
